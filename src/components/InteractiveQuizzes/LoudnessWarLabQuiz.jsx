import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, CheckCircle2, AlertCircle, Volume2 } from 'lucide-react';

export default function LoudnessWarLabQuiz({ question, onResult }) {
    const overCompressedKey = question?.overCompressed === 'A' ? 'A' : 'B';

    const [activeMix, setActiveMix] = useState(null); // 'A' | 'B' | null
    const [selectedMix, setSelectedMix] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const ctxRef = useRef(null);
    const timerRef = useRef(null);
    const activeMixRef = useRef(null);
    const stepRef = useRef(0);
    const busRef = useRef(null);

    const stopAudio = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (ctxRef.current && ctxRef.current.state !== 'closed') {
            ctxRef.current.close().catch(() => {});
            ctxRef.current = null;
        }
        busRef.current = null;
        activeMixRef.current = null;
        setActiveMix(null);
    };

    useEffect(() => {
        return () => stopAudio();
    }, []);

    // Soft-clip saturation curve for crushed Loudness War limiting
    const makeClipCurve = (amount = 18) => {
        const n = 512;
        const curve = new Float32Array(n);
        for (let i = 0; i < n; i++) {
            const x = (i * 2) / n - 1;
            curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
        }
        return curve;
    };

    const scheduleStep = () => {
        const ctx = ctxRef.current;
        const bus = busRef.current;
        if (!ctx || !bus) return;
        const now = ctx.currentTime;
        const step = stepRef.current % 8; // 8th-note bar at ~95 BPM (step ~315ms)
        stepRef.current += 1;

        const isOverCompressed = activeMixRef.current === overCompressedKey;
        const targetBus = isOverCompressed ? bus.crushedIn : bus.cleanIn;

        // 1. Subby Kick on steps 0, 3, 5
        if (step === 0 || step === 3 || step === 5) {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(115, now);
            osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);
            g.gain.setValueAtTime(0.95, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
            osc.connect(g);
            g.connect(targetBus);
            osc.start(now);
            osc.stop(now + 0.3);
        }

        // 2. Crisp Snare on beats 2 & 4 (steps 2, 6)
        if (step === 2 || step === 6) {
            const len = Math.floor(ctx.sampleRate * 0.13);
            const buf = ctx.createBuffer(1, len, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.28));
            const noise = ctx.createBufferSource();
            noise.buffer = buf;
            const g = ctx.createGain();
            g.gain.value = 0.55;
            noise.connect(g);
            g.connect(targetBus);
            noise.start(now);
        }

        // 3. Steady Hi-Hat ticks on every step
        {
            const len = Math.floor(ctx.sampleRate * 0.04);
            const buf = ctx.createBuffer(1, len, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.25));
            const hat = ctx.createBufferSource();
            hat.buffer = buf;
            const hp = ctx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.value = 6500;
            const g = ctx.createGain();
            g.gain.value = step % 2 === 0 ? 0.16 : 0.09;
            hat.connect(hp);
            hp.connect(g);
            g.connect(targetBus);
            hat.start(now);
        }

        // 4. Sustained G-Funk Bass & Whistle Lead (shows pumping/ducking clearly in crushed mix!)
        if (step === 0 || step === 4) {
            const bassOsc = ctx.createOscillator();
            const bassGain = ctx.createGain();
            bassOsc.type = 'triangle';
            bassOsc.frequency.setValueAtTime(step === 0 ? 65.41 : 73.42, now);
            bassGain.gain.setValueAtTime(0.32, now);
            bassGain.gain.exponentialRampToValueAtTime(0.18, now + 1.15);
            bassOsc.connect(bassGain);
            bassGain.connect(targetBus);
            bassOsc.start(now);
            bassOsc.stop(now + 1.2);

            const leadOsc = ctx.createOscillator();
            const leadGain = ctx.createGain();
            leadOsc.type = 'sine';
            leadOsc.frequency.setValueAtTime(step === 0 ? 1046.5 : 1174.66, now);
            leadGain.gain.setValueAtTime(0.11, now);
            leadGain.gain.exponentialRampToValueAtTime(0.06, now + 1.15);
            leadOsc.connect(leadGain);
            leadGain.connect(targetBus);
            leadOsc.start(now);
            leadOsc.stop(now + 1.2);
        }
    };

    const startOrSwitchMix = async (mixKey) => {
        if (activeMix === mixKey) {
            stopAudio();
            return;
        }

        activeMixRef.current = mixKey;
        setActiveMix(mixKey);

        if (ctxRef.current) return; // Seamlessly flip Mix A / Mix B in real time!

        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            const ctx = new Ctx();
            if (ctx.state === 'suspended') await ctx.resume();
            ctxRef.current = ctx;

            // Clean dynamic bus
            const cleanIn = ctx.createGain();
            cleanIn.gain.value = 0.55;
            cleanIn.connect(ctx.destination);

            // Over-compressed Loudness War bus: heavy 20:1 compressor + brickwall clipper + make-up matched
            const crushedIn = ctx.createGain();
            crushedIn.gain.value = 1.65;

            const comp = ctx.createDynamicsCompressor();
            comp.threshold.value = -32;
            comp.knee.value = 0;
            comp.ratio.value = 20;
            comp.attack.value = 0.001;
            comp.release.value = 0.09;

            const clipper = ctx.createWaveShaper();
            clipper.curve = makeClipCurve(5.5);
            clipper.oversample = '2x';

            const crushedOut = ctx.createGain();
            crushedOut.gain.value = 0.48; // Level-matched so Mix B isn't just louder, it sounds audibly squashed & pumping!

            crushedIn.connect(comp);
            comp.connect(clipper);
            clipper.connect(crushedOut);
            crushedOut.connect(ctx.destination);

            busRef.current = { cleanIn, crushedIn };
            stepRef.current = 0;
            scheduleStep();
            timerRef.current = setInterval(scheduleStep, 315);
        } catch {
            stopAudio();
        }
    };

    const handleCheck = () => {
        stopAudio();
        const ok = selectedMix === overCompressedKey;
        setIsCorrect(ok);
        setSubmitted(true);
        if (onResult) onResult(ok);
    };

    return (
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155', color: '#f8fafc' }}>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={15} color="#38bdf8" />
                <span>Compare both level-matched mixes. Listen for squashed drum transients and pumping bass.</span>
            </div>

            {/* Mix A / Mix B Live Player */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                {['A', 'B'].map(key => {
                    const playingThis = activeMix === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => startOrSwitchMix(key)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px',
                                borderRadius: '10px',
                                border: playingThis ? '2px solid #38bdf8' : '1px solid #475569',
                                backgroundColor: playingThis ? '#1d4ed8' : '#0f172a',
                                color: '#ffffff',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                            }}
                        >
                            {playingThis ? <Square size={15} /> : <Play size={15} />}
                            {playingThis ? `Stop Mix ${key}` : `Play Mix ${key}`}
                        </button>
                    );
                })}
            </div>

            {/* Answer Selection */}
            <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                Which mix is the over-compressed &ldquo;Loudness War&rdquo; master?
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                {['A', 'B'].map(key => {
                    const selected = selectedMix === key;
                    let border = selected ? '#38bdf8' : '#334155';
                    let bg = selected ? 'rgba(37, 99, 235, 0.25)' : '#0f172a';
                    if (submitted) {
                        if (key === overCompressedKey) {
                            border = '#22c55e';
                            bg = 'rgba(34, 197, 94, 0.16)';
                        } else if (selected) {
                            border = '#ef4444';
                            bg = 'rgba(239, 68, 68, 0.16)';
                        }
                    }
                    return (
                        <button
                            key={`ans-${key}`}
                            type="button"
                            disabled={submitted}
                            onClick={() => setSelectedMix(key)}
                            style={{
                                padding: '10px 12px',
                                borderRadius: '8px',
                                border: `1.5px solid ${border}`,
                                backgroundColor: bg,
                                color: '#f1f5f9',
                                fontWeight: '700',
                                fontSize: '0.88rem',
                                cursor: submitted ? 'default' : 'pointer',
                            }}
                        >
                            Mix {key} (Over-Compressed)
                        </button>
                    );
                })}
            </div>

            {!submitted ? (
                <button
                    type="button"
                    disabled={!selectedMix}
                    onClick={handleCheck}
                    style={{
                        width: '100%',
                        padding: '11px 18px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        cursor: !selectedMix ? 'not-allowed' : 'pointer',
                        opacity: !selectedMix ? 0.5 : 1,
                    }}
                >
                    Check Answer
                </button>
            ) : (
                <div style={{
                    padding: '11px 14px',
                    borderRadius: '8px',
                    backgroundColor: isCorrect ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                    border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: isCorrect ? '#4ade80' : '#f87171',
                    fontWeight: '700',
                    fontSize: '0.86rem',
                }}>
                    {isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>
                        {isCorrect
                            ? `Correct! Mix ${overCompressedKey} is heavily limited — crushing kick punch and making the synth bass pump.`
                            : `Not quite — Mix ${overCompressedKey} is the over-compressed master with squashed transients and pumping bass.`}
                    </span>
                </div>
            )}
        </div>
    );
}
