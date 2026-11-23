import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, CheckCircle2, AlertCircle, Sliders } from 'lucide-react';

const ZONES = [
    { id: 'phaser', label: 'Phaser (No Delay Line)', range: '0 ms', min: 0, max: 0, color: '#a78bfa', desc: 'Sweeps phase notches using all-pass filters with zero delay time.' },
    { id: 'flanger', label: 'Flanger', range: '1–10 ms', min: 1, max: 10, color: '#38bdf8', desc: 'Very short modulated delay + feedback creates metallic jet-plane comb filtering.' },
    { id: 'chorus', label: 'Chorus', range: '15–35 ms', min: 15, max: 35, color: '#34d399', desc: 'Medium modulated delay detunes pitch slightly for rich vocal/guitar doubling.' },
    { id: 'delay', label: 'Slapback Delay', range: '50–80 ms', min: 50, max: 80, color: '#fbbf24', desc: 'Longer delay time separates into a distinct audible echo repeat.' },
];

function getZoneForMs(ms) {
    if (ms === 0) return ZONES[0];
    if (ms >= 1 && ms <= 10) return ZONES[1];
    if (ms >= 15 && ms <= 35) return ZONES[2];
    if (ms >= 50) return ZONES[3];
    return {
        id: 'transition',
        label: ms < 15 ? 'Flanger → Chorus Transition' : 'Chorus → Slapback Transition',
        range: `${ms} ms`,
        color: '#94a3b8',
        desc: 'Transition region between modulation effects.',
    };
}

export default function ModulationDelayLabQuiz({ question, onResult }) {
    const minMs = question?.min ?? 0;
    const maxMs = question?.max ?? 80;
    const targetMin = question?.targetMin ?? 1;
    const targetMax = question?.targetMax ?? 10;

    const [delayMs, setDelayMs] = useState(question?.initMs ?? 25);
    const [isPlaying, setIsPlaying] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const ctxRef = useRef(null);
    const nodesRef = useRef(null);
    const timerRef = useRef(null);

    const applyDspParams = (ms) => {
        const n = nodesRef.current;
        const ctx = ctxRef.current;
        if (!n || !ctx) return;
        const now = ctx.currentTime;

        if (ms === 0) {
            // Phaser mode: all-pass wet on, delay wet off
            n.phaserWet.gain.setTargetAtTime(0.75, now, 0.03);
            n.delayWet.gain.setTargetAtTime(0, now, 0.03);
            n.feedback.gain.setTargetAtTime(0, now, 0.03);
            n.lfoDepth.gain.setTargetAtTime(0, now, 0.03);
        } else {
            n.phaserWet.gain.setTargetAtTime(0, now, 0.03);
            n.delayWet.gain.setTargetAtTime(0.7, now, 0.03);
            n.delayNode.delayTime.setTargetAtTime(ms / 1000, now, 0.03);

            if (ms <= 10) {
                // Flanger: tight LFO + high feedback
                n.feedback.gain.setTargetAtTime(0.65, now, 0.03);
                n.lfoDepth.gain.setTargetAtTime(0.0012, now, 0.03);
                n.lfo.frequency.setTargetAtTime(0.45, now, 0.03);
            } else if (ms <= 35) {
                // Chorus: wider pitch-detune LFO, low feedback
                n.feedback.gain.setTargetAtTime(0.1, now, 0.03);
                n.lfoDepth.gain.setTargetAtTime(0.0028, now, 0.03);
                n.lfo.frequency.setTargetAtTime(0.85, now, 0.03);
            } else {
                // Slapback delay: minimal LFO, audible echo feedback
                n.feedback.gain.setTargetAtTime(0.28, now, 0.03);
                n.lfoDepth.gain.setTargetAtTime(0.0002, now, 0.03);
            }
        }
    };

    const stopAudio = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        if (nodesRef.current) {
            try { nodesRef.current.lfo.stop(); } catch {}
            try { nodesRef.current.phaserLfo.stop(); } catch {}
            nodesRef.current = null;
        }
        if (ctxRef.current && ctxRef.current.state !== 'closed') {
            ctxRef.current.close().catch(() => {});
            ctxRef.current = null;
        }
        setIsPlaying(false);
    };

    useEffect(() => {
        return () => stopAudio();
    }, []);

    useEffect(() => {
        if (isPlaying) applyDspParams(delayMs);
    }, [delayMs, isPlaying]);

    const triggerChord = () => {
        const ctx = ctxRef.current;
        const n = nodesRef.current;
        if (!ctx || !n) return;
        const now = ctx.currentTime;
        // Rich strummed A minor triad (A3, C4, E4, A4) so modulation & echo are crystal clear
        const freqs = [220, 261.63, 329.63, 440];
        freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const env = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(f, now + idx * 0.025);
            env.gain.setValueAtTime(0.0001, now + idx * 0.025);
            env.gain.linearRampToValueAtTime(0.085, now + idx * 0.025 + 0.02);
            env.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.025 + 0.85);
            osc.connect(env);
            env.connect(n.inputFilter);
            osc.start(now + idx * 0.025);
            osc.stop(now + idx * 0.025 + 0.9);
        });
    };

    const togglePlay = async () => {
        if (isPlaying) {
            stopAudio();
            return;
        }
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            const ctx = new Ctx();
            if (ctx.state === 'suspended') await ctx.resume();
            ctxRef.current = ctx;

            const inputFilter = ctx.createBiquadFilter();
            inputFilter.type = 'lowpass';
            inputFilter.frequency.value = 3200;

            const master = ctx.createGain();
            master.gain.value = 0.85;
            master.connect(ctx.destination);

            const dryGain = ctx.createGain();
            dryGain.gain.value = 0.7;
            inputFilter.connect(dryGain);
            dryGain.connect(master);

            // Delay path (Flanger / Chorus / Slapback)
            const delayNode = ctx.createDelay(0.5);
            const feedback = ctx.createGain();
            const delayWet = ctx.createGain();
            inputFilter.connect(delayNode);
            delayNode.connect(feedback);
            feedback.connect(delayNode);
            delayNode.connect(delayWet);
            delayWet.connect(master);

            const lfo = ctx.createOscillator();
            const lfoDepth = ctx.createGain();
            lfo.connect(lfoDepth);
            lfoDepth.connect(delayNode.delayTime);
            lfo.start();

            // Phaser path (4 cascaded allpass filters swept by LFO)
            const ap1 = ctx.createBiquadFilter();
            const ap2 = ctx.createBiquadFilter();
            const ap3 = ctx.createBiquadFilter();
            const ap4 = ctx.createBiquadFilter();
            [ap1, ap2, ap3, ap4].forEach(ap => {
                ap.type = 'allpass';
                ap.frequency.value = 900;
            });
            const phaserLfo = ctx.createOscillator();
            const phaserDepth = ctx.createGain();
            phaserLfo.frequency.value = 0.6;
            phaserDepth.gain.value = 650;
            phaserLfo.connect(phaserDepth);
            [ap1, ap2, ap3, ap4].forEach(ap => phaserDepth.connect(ap.frequency));
            phaserLfo.start();

            const phaserWet = ctx.createGain();
            inputFilter.connect(ap1);
            ap1.connect(ap2);
            ap2.connect(ap3);
            ap3.connect(ap4);
            ap4.connect(phaserWet);
            phaserWet.connect(master);

            nodesRef.current = {
                inputFilter,
                delayNode,
                feedback,
                delayWet,
                lfo,
                lfoDepth,
                phaserLfo,
                phaserWet,
            };

            applyDspParams(delayMs);
            setIsPlaying(true);
            triggerChord();
            timerRef.current = setInterval(triggerChord, 1250);
        } catch {
            stopAudio();
        }
    };

    const handleCheck = () => {
        const ok = delayMs >= targetMin && delayMs <= targetMax;
        setIsCorrect(ok);
        setSubmitted(true);
        if (onResult) onResult(ok);
    };

    const zone = getZoneForMs(delayMs);

    return (
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '18px', border: '1px solid #334155', color: '#f8fafc' }}>
            {/* Play / Listen Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                <button
                    type="button"
                    onClick={togglePlay}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: isPlaying ? '#ef4444' : '#2563eb',
                        color: '#ffffff',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                    }}
                >
                    {isPlaying ? <Square size={16} /> : <Play size={16} />}
                    {isPlaying ? 'Stop Live Audio' : 'Play Live Chord Loop'}
                </button>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#0f172a',
                    border: `1.5px solid ${zone.color}`,
                }}>
                    <Sliders size={15} color={zone.color} />
                    <span style={{ fontWeight: '800', fontSize: '0.95rem', color: zone.color, whiteSpace: 'nowrap' }}>
                        {delayMs} ms — {zone.label}
                    </span>
                </div>
            </div>

            {/* Delay Time Slider */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '14px', border: '1px solid #334155', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>
                    <span>Delay Time: <strong style={{ color: '#f8fafc' }}>{delayMs} ms</strong></span>
                    <span>Sweep 0 ms → 80 ms to hear each effect</span>
                </div>
                <input
                    type="range"
                    min={minMs}
                    max={maxMs}
                    step={1}
                    value={delayMs}
                    onChange={(e) => {
                        setDelayMs(Number(e.target.value));
                        if (submitted) setSubmitted(false);
                    }}
                    style={{ width: '100%', accentColor: zone.color, cursor: 'pointer' }}
                />

                {/* Quick Zone Presets / Scale */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '6px', marginTop: '12px' }}>
                    {ZONES.map(z => {
                        const active = zone.id === z.id;
                        return (
                            <div
                                key={z.id}
                                style={{
                                    padding: '7px 6px',
                                    borderRadius: '6px',
                                    backgroundColor: active ? 'rgba(56, 189, 248, 0.14)' : '#1e293b',
                                    border: `1px solid ${active ? z.color : '#334155'}`,
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: '0.74rem', fontWeight: '700', color: z.color }}>{z.range}</div>
                                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: '600' }}>{z.id === 'phaser' ? 'Phaser' : z.label}</div>
                            </div>
                        );
                    })}
                </div>

                <p style={{ margin: '10px 0 0', fontSize: '0.83rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    <strong style={{ color: zone.color }}>{zone.label}:</strong> {zone.desc}
                </p>
            </div>

            {/* Check Button */}
            {!submitted ? (
                <button
                    type="button"
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
                        cursor: 'pointer',
                    }}
                >
                    Check Delay Time ({delayMs} ms)
                </button>
            ) : (
                <div style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: isCorrect ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                    border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: isCorrect ? '#4ade80' : '#f87171',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                }}>
                    {isCorrect ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <span>
                        {isCorrect
                            ? `Spot on! ${delayMs} ms sits in the ${targetMin}–${targetMax} ms target zone.`
                            : `Not quite — ${delayMs} ms is outside the ${targetMin}–${targetMax} ms target zone. Adjust the slider and try again.`}
                    </span>
                </div>
            )}
        </div>
    );
}
