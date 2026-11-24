import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, Radio, Sliders, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Interactive Web Audio Mastering Lab supporting 4 9MT0 A-Level experiments:
 *  - "mono-phase": Mono Bass & Phase Cancellation Check
 *  - "eq-mud": Broad Mastering EQ (clearing 200-400 Hz low-mid mud)
 *  - "sub-headroom": Sub-Bass Headroom & Limiter Pumping
 *  - "multiband": Single-Band Pumping vs 3-Band Multiband Compression
 */
export default function MasteringLabQuiz({ question, onResult }) {
    const mode = question?.mode || 'mono-phase';
    const options = question?.options || [];
    const correctIndex = typeof question?.correctIndex === 'number' ? question.correctIndex : 0;

    const [isPlaying, setIsPlaying] = useState(false);
    const [monoSum, setMonoSum] = useState(false);
    const [bassMode, setBassMode] = useState('wide'); // 'wide' | 'mono'
    const [eqPreset, setEqPreset] = useState('bypass'); // 'bypass' | 'cut250' | 'boost250' | 'cut8k'
    const [hpfOn, setHpfOn] = useState(false);
    const [mbMode, setMbMode] = useState('bypass'); // 'bypass' | 'single' | 'multiband'
    const [grDb, setGrDb] = useState(0);
    const [bandGr, setBandGr] = useState({ low: 0, mid: 0, high: 0 });

    const [selectedIdx, setSelectedIdx] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const ctxRef = useRef(null);
    const timerRef = useRef(null);
    const stepRef = useRef(0);
    const nodesRef = useRef({});
    const modeStateRef = useRef({ monoSum: false, bassMode: 'wide', eqPreset: 'bypass', hpfOn: false, mbMode: 'bypass' });

    useEffect(() => {
        modeStateRef.current = { monoSum, bassMode, eqPreset, hpfOn, mbMode };
        applyLiveParams();
    }, [monoSum, bassMode, eqPreset, hpfOn, mbMode]);

    const stopAudio = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (ctxRef.current && ctxRef.current.state !== 'closed') {
            ctxRef.current.close().catch(() => {});
            ctxRef.current = null;
        }
        nodesRef.current = {};
        setIsPlaying(false);
        setGrDb(0);
    };

    useEffect(() => {
        return () => stopAudio();
    }, []);

    const applyLiveParams = () => {
        const ctx = ctxRef.current;
        const n = nodesRef.current;
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;

        if (mode === 'mono-phase' && n.bassLeftGain && n.bassRightGain && n.monoMerger) {
            // In 'wide' mode, R channel is inverted (-1) to simulate out-of-phase stereo bass.
            const rPolarity = bassMode === 'wide' ? -1 : 1;
            n.bassLeftGain.gain.setTargetAtTime(0.45, now, 0.02);
            n.bassRightGain.gain.setTargetAtTime(0.45 * rPolarity, now, 0.02);
            // Mono sum blends L and R together (0.5 L + 0.5 R) -> cancels out when R is inverted!
            n.monoSumMix.gain.setTargetAtTime(monoSum ? 1 : 0, now, 0.02);
            n.stereoOutMix.gain.setTargetAtTime(monoSum ? 0 : 1, now, 0.02);
        }

        if (mode === 'eq-mud' && n.eqLowMid && n.eqHigh) {
            let lowMidGain = 0;
            let highGain = 0;
            if (eqPreset === 'cut250') lowMidGain = -5.5;
            if (eqPreset === 'boost250') lowMidGain = 5.5;
            if (eqPreset === 'cut8k') highGain = -7;
            n.eqLowMid.gain.setTargetAtTime(lowMidGain, now, 0.03);
            n.eqHigh.gain.setTargetAtTime(highGain, now, 0.03);
        }

        if (mode === 'sub-headroom' && n.subGain && n.hpf) {
            n.hpf.frequency.setTargetAtTime(hpfOn ? 90 : 18, now, 0.03);
            n.subGain.gain.setTargetAtTime(hpfOn ? 0.06 : 0.55, now, 0.03);
        }

        if (mode === 'multiband' && n.bypassBus && n.singleBus && n.mbBus) {
            n.bypassBus.gain.setTargetAtTime(mbMode === 'bypass' ? 1 : 0, now, 0.02);
            n.singleBus.gain.setTargetAtTime(mbMode === 'single' ? 1 : 0, now, 0.02);
            n.mbBus.gain.setTargetAtTime(mbMode === 'multiband' ? 1 : 0, now, 0.02);
        }
    };

    const startAudio = async () => {
        if (isPlaying) {
            stopAudio();
            return;
        }
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        ctxRef.current = ctx;
        if (ctx.state === 'suspended') await ctx.resume();

        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.55;
        masterGain.connect(ctx.destination);

        if (mode === 'mono-phase') {
            // Stereo L/R split for bass so 'wide' inverts polarity on Right channel
            const bassBus = ctx.createGain();
            const bassLeftGain = ctx.createGain();
            const bassRightGain = ctx.createGain();
            const splitter = ctx.createChannelSplitter(2);
            const merger = ctx.createChannelMerger(2);

            bassBus.connect(bassLeftGain);
            bassBus.connect(bassRightGain);

            // Stereo path
            const stereoMerger = ctx.createChannelMerger(2);
            bassLeftGain.connect(stereoMerger, 0, 0);
            bassRightGain.connect(stereoMerger, 0, 1);

            const stereoOutMix = ctx.createGain();
            stereoMerger.connect(stereoOutMix);
            stereoOutMix.connect(masterGain);

            // Mono sum path (L + R summed into both speakers)
            const monoSumNode = ctx.createGain();
            monoSumNode.gain.value = 0.5;
            bassLeftGain.connect(monoSumNode);
            bassRightGain.connect(monoSumNode);

            const monoSumMix = ctx.createGain();
            monoSumNode.connect(monoSumMix);
            monoSumMix.connect(masterGain);

            const drumBus = ctx.createGain();
            drumBus.connect(masterGain);

            nodesRef.current = { bassBus, bassLeftGain, bassRightGain, splitter, merger, stereoOutMix, monoSumMix, drumBus };
        } else if (mode === 'eq-mud') {
            const mixBus = ctx.createGain();
            // Built-in low-mid mud hump at 250 Hz so the mix genuinely sounds boxy before correction
            const mudHump = ctx.createBiquadFilter();
            mudHump.type = 'peaking';
            mudHump.frequency.value = 250;
            mudHump.Q.value = 1.1;
            mudHump.gain.value = 5.0;

            const eqLowMid = ctx.createBiquadFilter();
            eqLowMid.type = 'peaking';
            eqLowMid.frequency.value = 250;
            eqLowMid.Q.value = 1.0;
            eqLowMid.gain.value = 0;

            const eqHigh = ctx.createBiquadFilter();
            eqHigh.type = 'highshelf';
            eqHigh.frequency.value = 8000;
            eqHigh.gain.value = 0;

            mixBus.connect(mudHump);
            mudHump.connect(eqLowMid);
            eqLowMid.connect(eqHigh);
            eqHigh.connect(masterGain);

            nodesRef.current = { mixBus, eqLowMid, eqHigh };
        } else if (mode === 'multiband') {
            const mixBus = ctx.createGain();

            // Path 1: Bypass
            const bypassBus = ctx.createGain();
            mixBus.connect(bypassBus);
            bypassBus.connect(masterGain);

            // Path 2: Single-Band Bus Compressor (heavy bass spikes pump the whole mix)
            const singleComp = ctx.createDynamicsCompressor();
            singleComp.threshold.value = -26;
            singleComp.knee.value = 3;
            singleComp.ratio.value = 10;
            singleComp.attack.value = 0.004;
            singleComp.release.value = 0.25;
            const singleBus = ctx.createGain();
            mixBus.connect(singleComp);
            singleComp.connect(singleBus);
            singleBus.connect(masterGain);

            // Path 3: 3-Band Multiband Compressor (only Low <180 Hz is compressed!)
            const lowLP = ctx.createBiquadFilter();
            lowLP.type = 'lowpass';
            lowLP.frequency.value = 180;
            const lowComp = ctx.createDynamicsCompressor();
            lowComp.threshold.value = -24;
            lowComp.ratio.value = 8;
            lowComp.attack.value = 0.005;
            lowComp.release.value = 0.16;

            const midBP = ctx.createBiquadFilter();
            midBP.type = 'bandpass';
            midBP.frequency.value = 850;
            midBP.Q.value = 0.6;

            const highHP = ctx.createBiquadFilter();
            highHP.type = 'highpass';
            highHP.frequency.value = 2800;

            const mbBus = ctx.createGain();
            mixBus.connect(lowLP).connect(lowComp).connect(mbBus);
            mixBus.connect(midBP).connect(mbBus);
            mixBus.connect(highHP).connect(mbBus);
            mbBus.connect(masterGain);

            nodesRef.current = { mixBus, bypassBus, singleBus, singleComp, mbBus, lowComp };
        } else {
            // sub-headroom mode: excessive 32 Hz sub-bass hitting a master compressor/limiter
            const mixBus = ctx.createGain();
            const subGain = ctx.createGain();
            const hpf = ctx.createBiquadFilter();
            hpf.type = 'highpass';
            hpf.frequency.value = 12;
            hpf.Q.value = 0.7;

            const limiter = ctx.createDynamicsCompressor();
            limiter.threshold.value = -15;
            limiter.knee.value = 6;
            limiter.ratio.value = 8;
            limiter.attack.value = 0.005;
            limiter.release.value = 0.22;

            mixBus.connect(hpf);
            subGain.connect(hpf);
            hpf.connect(limiter);
            limiter.connect(masterGain);

            nodesRef.current = { mixBus, subGain, hpf, limiter };
        }

        applyLiveParams();
        setIsPlaying(true);
        stepRef.current = 0;

        const playStep = () => {
            if (!ctxRef.current || ctxRef.current.state === 'closed') return;
            const t = ctxRef.current.currentTime + 0.02;
            const s = stepRef.current % 8;
            const n = nodesRef.current;

            // Update live GR meter for sub-headroom or multiband mode
            if (mode === 'sub-headroom' && n.limiter) {
                setGrDb(Math.abs(Math.round(n.limiter.reduction * 10) / 10));
            }
            if (mode === 'multiband') {
                const st = modeStateRef.current.mbMode;
                if (st === 'bypass') {
                    setBandGr({ low: 0, mid: 0, high: 0 });
                } else if (st === 'single' && n.singleComp) {
                    const gr = Math.abs(Math.round(n.singleComp.reduction * 10) / 10);
                    setBandGr({ low: gr, mid: gr, high: gr });
                } else if (st === 'multiband' && n.lowComp) {
                    const lgr = Math.abs(Math.round(n.lowComp.reduction * 10) / 10);
                    setBandGr({ low: lgr, mid: 0, high: 0 });
                }
            }

            const drumTarget = mode === 'mono-phase' ? n.drumBus : n.mixBus;

            // Kick on 0, 4
            if (s === 0 || s === 4) {
                const osc = ctxRef.current.createOscillator();
                const g = ctxRef.current.createGain();
                osc.frequency.setValueAtTime(115, t);
                osc.frequency.exponentialRampToValueAtTime(48, t + 0.11);
                g.gain.setValueAtTime(0.42, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
                osc.connect(g).connect(drumTarget);
                osc.start(t);
                osc.stop(t + 0.18);
            }

            // Snare on 2, 6
            if (s === 2 || s === 6) {
                const bufSize = Math.floor(ctxRef.current.sampleRate * 0.12);
                const buf = ctxRef.current.createBuffer(1, bufSize, ctxRef.current.sampleRate);
                const data = buf.getChannelData(0);
                for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
                const noise = ctxRef.current.createBufferSource();
                noise.buffer = buf;
                const bp = ctxRef.current.createBiquadFilter();
                bp.type = 'bandpass';
                bp.frequency.value = 1800;
                const g = ctxRef.current.createGain();
                g.gain.setValueAtTime(0.28, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
                noise.connect(bp).connect(g).connect(drumTarget);
                noise.start(t);
            }

            // Closed hat on all 8th notes
            {
                const bufSize = Math.floor(ctxRef.current.sampleRate * 0.04);
                const buf = ctxRef.current.createBuffer(1, bufSize, ctxRef.current.sampleRate);
                const data = buf.getChannelData(0);
                for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
                const hat = ctxRef.current.createBufferSource();
                hat.buffer = buf;
                const hp = ctxRef.current.createBiquadFilter();
                hp.type = 'highpass';
                hp.frequency.value = 7500;
                const g = ctxRef.current.createGain();
                g.gain.setValueAtTime(s % 2 === 0 ? 0.14 : 0.08, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
                hat.connect(hp).connect(g).connect(drumTarget);
                hat.start(t);
            }

            // Bass / Pad / Sub-rumble per mode
            if (mode === 'mono-phase') {
                const notes = [55, 55, 65.4, 55, 73.4, 65.4, 55, 49];
                const osc = ctxRef.current.createOscillator();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(notes[s], t);
                const lp = ctxRef.current.createBiquadFilter();
                lp.type = 'lowpass';
                lp.frequency.value = 220;
                const g = ctxRef.current.createGain();
                g.gain.setValueAtTime(0.55, t);
                g.gain.exponentialRampToValueAtTime(0.05, t + 0.24);
                osc.connect(lp).connect(g).connect(n.bassBus);
                osc.start(t);
                osc.stop(t + 0.25);
            } else if (mode === 'eq-mud') {
                // Warm synth chord with heavy 250 Hz content
                [130.81, 196.0, 246.94].forEach((freq) => {
                    const osc = ctxRef.current.createOscillator();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, t);
                    const g = ctxRef.current.createGain();
                    g.gain.setValueAtTime(0.14, t);
                    g.gain.exponentialRampToValueAtTime(0.01, t + 0.24);
                    osc.connect(g).connect(n.mixBus);
                    osc.start(t);
                    osc.stop(t + 0.25);
                });
            } else if (mode === 'sub-headroom') {
                // Clean, non-clipping sub-bass energy (48 Hz + 96 Hz) so GR bounces cleanly around -6 dB
                if (s === 0 || s === 4) {
                    [48, 96].forEach((freq, idx) => {
                        const sub = ctxRef.current.createOscillator();
                        sub.type = 'sine';
                        sub.frequency.setValueAtTime(freq, t);
                        const sg = ctxRef.current.createGain();
                        sg.gain.setValueAtTime(idx === 0 ? 0.62 : 0.24, t);
                        sg.gain.exponentialRampToValueAtTime(0.08, t + 0.75);
                        sub.connect(sg).connect(n.subGain);
                        sub.start(t);
                        sub.stop(t + 0.78);
                    });
                }
                const pad = ctxRef.current.createOscillator();
                pad.type = 'triangle';
                pad.frequency.setValueAtTime(s % 4 === 0 ? 220 : 261.6, t);
                const pg = ctxRef.current.createGain();
                pg.gain.setValueAtTime(0.18, t);
                pg.gain.exponentialRampToValueAtTime(0.03, t + 0.22);
                pad.connect(pg).connect(n.mixBus);
                pad.start(t);
                pad.stop(t + 0.24);
            } else if (mode === 'multiband') {
                // Big booming bass spike on beats 0 & 4 + crisp mid chord & high-end shimmer
                if (s === 0 || s === 4) {
                    const sub = ctxRef.current.createOscillator();
                    sub.type = 'sine';
                    sub.frequency.setValueAtTime(55, t);
                    const sg = ctxRef.current.createGain();
                    sg.gain.setValueAtTime(1.05, t);
                    sg.gain.exponentialRampToValueAtTime(0.12, t + 0.45);
                    sub.connect(sg).connect(n.mixBus);
                    sub.start(t);
                    sub.stop(t + 0.48);
                }
                [261.63, 329.63, 392.0].forEach((freq) => {
                    const pad = ctxRef.current.createOscillator();
                    pad.type = 'triangle';
                    pad.frequency.setValueAtTime(freq, t);
                    const pg = ctxRef.current.createGain();
                    pg.gain.setValueAtTime(0.14, t);
                    pg.gain.exponentialRampToValueAtTime(0.03, t + 0.23);
                    pad.connect(pg).connect(n.mixBus);
                    pad.start(t);
                    pad.stop(t + 0.25);
                });
            }

            stepRef.current += 1;
        };

        playStep();
        timerRef.current = setInterval(playStep, 260);
    };

    const handleSubmit = () => {
        if (selectedIdx === null || submitted) return;
        stopAudio();
        const ok = selectedIdx === correctIndex;
        setIsCorrect(ok);
        setSubmitted(true);
        if (onResult) {
            onResult(ok, { selectedIdx, mode });
        }
    };

    const phaseCorr = bassMode === 'wide' ? (monoSum ? '-1.0 (CANCELLED!)' : '-0.85 (Out of Phase)') : '+1.00 (Mono Safe)';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            {/* Studio Console Panel */}
            <div style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(56, 189, 248, 0.28)',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem' }}>
                        {mode === 'mono-phase' && <Radio size={17} />}
                        {mode === 'eq-mud' && <Sliders size={17} />}
                        {(mode === 'sub-headroom' || mode === 'multiband') && <Activity size={17} />}
                        <span>
                            {mode === 'mono-phase' && 'MASTERING CONSOLE: MONO BASS & PHASE CHECK'}
                            {mode === 'eq-mud' && 'MASTERING EQ: LOW-MID CLARITY TEST'}
                            {mode === 'sub-headroom' && 'MASTER LIMITER: SUB-BASS HEADROOM TEST'}
                            {mode === 'multiband' && 'MULTIBAND COMPRESSOR: 3-BAND CONTROL'}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={startAudio}
                        disabled={submitted}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isPlaying ? '#ef4444' : '#38bdf8',
                            color: isPlaying ? '#fff' : '#0f172a',
                            fontWeight: 700,
                            cursor: submitted ? 'not-allowed' : 'pointer',
                            opacity: submitted ? 0.6 : 1
                        }}
                    >
                        {isPlaying ? <Square size={15} /> : <Play size={15} />}
                        {isPlaying ? 'Stop Loop' : 'Play Master Loop'}
                    </button>
                </div>

                {/* Mode-Specific Interactive Controls */}
                {mode === 'mono-phase' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setBassMode('wide')}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    border: `2px solid ${bassMode === 'wide' ? '#f59e0b' : 'rgba(255,255,255,0.12)'}`,
                                    background: bassMode === 'wide' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                1. Stereo Wide Bass (Out of Phase)
                            </button>
                            <button
                                type="button"
                                onClick={() => setBassMode('mono')}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    border: `2px solid ${bassMode === 'mono' ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
                                    background: bassMode === 'mono' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                2. Mono Centred Bass (&lt;100 Hz)
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', background: 'rgba(0,0,0,0.28)', padding: '10px 14px', borderRadius: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setMonoSum((v) => !v)}
                                style={{
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    border: `1.5px solid ${monoSum ? '#38bdf8' : 'rgba(255,255,255,0.2)'}`,
                                    background: monoSum ? 'rgba(56,189,248,0.22)' : 'transparent',
                                    color: monoSum ? '#38bdf8' : '#e2e8f0',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                {monoSum ? 'MONO SUM CHECK: ON' : 'MONO SUM CHECK: OFF'}
                            </button>
                            <div style={{ fontSize: '0.85rem', color: bassMode === 'wide' ? '#fbbf24' : '#34d399', fontWeight: 700 }}>
                                Correlation Meter: {phaseCorr}
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'eq-mud' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: '8px' }}>
                        {[
                            { id: 'bypass', label: 'Bypass (Muddy Mix)' },
                            { id: 'cut250', label: 'A: Cut 250 Hz (-5 dB)' },
                            { id: 'boost250', label: 'B: Boost 250 Hz (+5 dB)' },
                            { id: 'cut8k', label: 'C: Cut 8 kHz (-7 dB)' }
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                type="button"
                                onClick={() => setEqPreset(btn.id)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: `2px solid ${eqPreset === btn.id ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`,
                                    background: eqPreset === btn.id ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                )}

                {mode === 'sub-headroom' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setHpfOn(false)}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    border: `2px solid ${!hpfOn ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
                                    background: !hpfOn ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                1. Sub Rumble ON (No Filter)
                            </button>
                            <button
                                type="button"
                                onClick={() => setHpfOn(true)}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    border: `2px solid ${hpfOn ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
                                    background: hpfOn ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                2. High-Pass Filter ON (Clean)
                            </button>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.28)', padding: '12px 14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem', color: '#cbd5e1' }}>
                                <span>Limiter Gain Reduction (Squash)</span>
                                <span style={{ color: grDb > 4 ? '#f87171' : '#34d399', fontWeight: 700 }}>
                                    -{grDb} dB {isPlaying ? (grDb > 4 ? '— Limiter Overloaded!' : '— Clean Headroom') : ''}
                                </span>
                            </div>
                            <div style={{ height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${Math.min(100, (grDb / 12) * 100)}%`,
                                    height: '100%',
                                    background: grDb > 4 ? '#ef4444' : '#10b981',
                                    transition: 'width 80ms linear'
                                }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                                <span>0 dB (Open)</span>
                                <span>-6 dB</span>
                                <span>-12 dB (Squashed)</span>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'multiband' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
                            {[
                                { id: 'bypass', label: 'Bypass (Boomy Bass)' },
                                { id: 'single', label: 'Single-Band Comp (Pumps!)' },
                                { id: 'multiband', label: 'Multiband (Low Band Only)' }
                            ].map((btn) => (
                                <button
                                    key={btn.id}
                                    type="button"
                                    onClick={() => setMbMode(btn.id)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        border: `2px solid ${mbMode === btn.id ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`,
                                        background: mbMode === btn.id ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.03)',
                                        color: '#f8fafc',
                                        fontWeight: 600,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: 'rgba(0,0,0,0.28)', padding: '10px 12px', borderRadius: '10px' }}>
                            {[
                                { label: 'Low (<180 Hz)', val: bandGr.low, color: '#38bdf8' },
                                { label: 'Mid (180–3k Hz)', val: bandGr.mid, color: bandGr.mid > 0 ? '#ef4444' : '#10b981' },
                                { label: 'High (>3 kHz)', val: bandGr.high, color: bandGr.high > 0 ? '#ef4444' : '#10b981' }
                            ].map((b) => (
                                <div key={b.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '4px' }}>
                                        <span>{b.label}</span>
                                        <span style={{ color: b.color, fontWeight: 700 }}>-{b.val} dB</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                        <div style={{ width: `${Math.min(100, b.val * 9)}%`, height: '100%', background: b.color, transition: 'width 80ms linear' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <Volume2 size={14} />
                    <span>
                        {mode === 'mono-phase' && 'Press Play, switch between Wide vs Mono Bass, and click MONO SUM CHECK to hear out-of-phase bass cancel.'}
                        {mode === 'eq-mud' && 'Press Play and compare the EQ buttons to hear which frequency cut clears the boxy mud.'}
                        {mode === 'sub-headroom' && 'Press Play and toggle the High-Pass Filter to watch the limiter Gain Reduction meter.'}
                        {mode === 'multiband' && 'Press Play and switch between Single-Band Comp vs Multiband (Low Band Only) while watching the 3 band meters.'}
                    </span>
                </div>
            </div>

            {/* Answer Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {options.map((opt, idx) => {
                    const isSel = selectedIdx === idx;
                    const isAns = idx === correctIndex;
                    let border = 'rgba(255,255,255,0.12)';
                    let bg = 'rgba(255,255,255,0.03)';
                    if (submitted) {
                        if (isAns) {
                            border = '#10b981';
                            bg = 'rgba(16,185,129,0.15)';
                        } else if (isSel) {
                            border = '#ef4444';
                            bg = 'rgba(239,68,68,0.15)';
                        }
                    } else if (isSel) {
                        border = '#38bdf8';
                        bg = 'rgba(56,189,248,0.14)';
                    }

                    return (
                        <button
                            key={idx}
                            type="button"
                            disabled={submitted}
                            onClick={() => setSelectedIdx(idx)}
                            style={{
                                textAlign: 'left',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: `1.5px solid ${border}`,
                                background: bg,
                                color: '#f8fafc',
                                fontWeight: 500,
                                cursor: submitted ? 'default' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '10px'
                            }}
                        >
                            <span>{opt}</span>
                            {submitted && isAns && <CheckCircle2 size={18} color="#10b981" />}
                            {submitted && !isAns && isSel && <AlertCircle size={18} color="#ef4444" />}
                        </button>
                    );
                })}
            </div>

            {!submitted && (
                <button
                    type="button"
                    disabled={selectedIdx === null}
                    onClick={handleSubmit}
                    style={{
                        padding: '12px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#3b82f6',
                        color: '#fff',
                        fontWeight: 700,
                        cursor: selectedIdx === null ? 'not-allowed' : 'pointer',
                        opacity: selectedIdx === null ? 0.5 : 1
                    }}
                >
                    Submit Answer
                </button>
            )}

            {submitted && (
                <div style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: isCorrect ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.35)'}`,
                    color: '#e2e8f0',
                    fontSize: '0.9rem'
                }}>
                    {isCorrect ? 'Correct! ' : 'Not quite. '}
                    {question?.expert_explanation}
                </div>
            )}
        </div>
    );
}
