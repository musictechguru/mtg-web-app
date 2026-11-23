import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, CheckCircle2, AlertCircle, Sliders } from 'lucide-react';

const ZONES = [
    { id: 'phaser', label: 'Phaser', range: '0 ms (No Delay)', presetMs: 0, min: 0, max: 0, color: '#a78bfa', desc: 'Uses all-pass phase shifting (no delay line) for deep sweeping frequency notches.' },
    { id: 'flanger', label: 'Flanger', range: '1–10 ms', presetMs: 5, min: 1, max: 10, color: '#38bdf8', desc: 'Very short modulated delay + high feedback creates metallic jet-plane comb filtering.' },
    { id: 'chorus', label: 'Chorus', range: '15–35 ms', presetMs: 25, min: 15, max: 35, color: '#34d399', desc: 'Medium modulated delay detunes pitch smoothly for thick vocal/guitar doubling.' },
    { id: 'delay', label: 'Slapback Delay', range: '50–80 ms', presetMs: 65, min: 50, max: 80, color: '#fbbf24', desc: 'Longer delay separates cleanly into a distinct rhythmic echo repeat.' },
];

function getZoneForMs(ms) {
    if (ms === 0) return ZONES[0];
    if (ms >= 1 && ms <= 10) return ZONES[1];
    if (ms >= 15 && ms <= 35) return ZONES[2];
    if (ms >= 50) return ZONES[3];
    return {
        id: 'transition',
        label: ms < 15 ? 'Flanger → Chorus' : 'Chorus → Slapback',
        range: `${ms} ms`,
        color: '#94a3b8',
        desc: 'Transition zone between modulation effects.',
    };
}

export default function ModulationDelayLabQuiz({ question, onResult }) {
    const minMs = question?.min ?? 0;
    const maxMs = question?.max ?? 80;
    const targetMin = question?.targetMin ?? 1;
    const targetMax = question?.targetMax ?? 10;

    const [delayMs, setDelayMs] = useState(question?.initMs ?? 65);
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
            // Dramatic 6-stage Phaser sweep (0 ms delay line)
            n.phaserWet.gain.setTargetAtTime(0.95, now, 0.02);
            n.delayWet.gain.setTargetAtTime(0, now, 0.02);
            n.feedback.gain.setTargetAtTime(0, now, 0.02);
            n.lfoDepth.gain.setTargetAtTime(0, now, 0.02);
        } else {
            n.phaserWet.gain.setTargetAtTime(0, now, 0.02);
            n.delayWet.gain.setTargetAtTime(0.85, now, 0.02);
            n.delayNode.delayTime.setTargetAtTime(ms / 1000, now, 0.02);

            if (ms <= 10) {
                // Dramatic metallic jet-plane Flanger
                n.feedback.gain.setTargetAtTime(0.84, now, 0.02);
                n.lfoDepth.gain.setTargetAtTime(0.0018, now, 0.02);
                n.lfo.frequency.setTargetAtTime(0.55, now, 0.02);
            } else if (ms <= 35) {
                // Lush wide detuned Chorus
                n.feedback.gain.setTargetAtTime(0.05, now, 0.02);
                n.lfoDepth.gain.setTargetAtTime(0.0045, now, 0.02);
                n.lfo.frequency.setTargetAtTime(1.35, now, 0.02);
            } else {
                // Crisp rhythmic Slapback Delay
                n.feedback.gain.setTargetAtTime(0.35, now, 0.02);
                n.lfoDepth.gain.setTargetAtTime(0, now, 0.02);
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
        // Bright staccato + sustained electric chord stabs so Phaser/Flanger harmonics & Slapback echoes pop
        const freqs = [220, 329.63, 440, 554.37];
        freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const env = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(f, now);
            env.gain.setValueAtTime(0.0001, now);
            env.gain.linearRampToValueAtTime(idx === 0 ? 0.09 : 0.065, now + 0.01);
            env.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
            osc.connect(env);
            env.connect(n.inputFilter);
            osc.start(now);
            osc.stop(now + 0.7);
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
            inputFilter.frequency.value = 7500;

            const master = ctx.createGain();
            master.gain.value = 0.75;
            master.connect(ctx.destination);

            const dryGain = ctx.createGain();
            dryGain.gain.value = 0.65;
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

            // 6-stage cascaded all-pass Phaser path
            const stages = Array.from({ length: 6 }, () => {
                const ap = ctx.createBiquadFilter();
                ap.type = 'allpass';
                ap.frequency.value = 1400;
                ap.Q.value = 3.2;
                return ap;
            });
            for (let i = 0; i < stages.length - 1; i++) {
                stages[i].connect(stages[i + 1]);
            }
            const phaserLfo = ctx.createOscillator();
            const phaserDepth = ctx.createGain();
            phaserLfo.frequency.value = 0.8;
            phaserDepth.gain.value = 1150;
            phaserLfo.connect(phaserDepth);
            stages.forEach(ap => phaserDepth.connect(ap.frequency));
            phaserLfo.start();

            const phaserWet = ctx.createGain();
            inputFilter.connect(stages[0]);
            stages[stages.length - 1].connect(phaserWet);
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
            timerRef.current = setInterval(triggerChord, 950);
        } catch {
            stopAudio();
        }
    };

    const selectMs = (ms) => {
        setDelayMs(ms);
        if (submitted) setSubmitted(false);
    };

    const handleCheck = () => {
        const ok = delayMs >= targetMin && delayMs <= targetMax;
        setIsCorrect(ok);
        setSubmitted(true);
        if (onResult) onResult(ok);
    };

    const zone = getZoneForMs(delayMs);

    return (
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155', color: '#f8fafc' }}>
            {/* Top Controls: Play + Active Readout */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                <button
                    type="button"
                    onClick={togglePlay}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 15px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: isPlaying ? '#ef4444' : '#2563eb',
                        color: '#ffffff',
                        fontWeight: '700',
                        fontSize: '0.86rem',
                        cursor: 'pointer',
                    }}
                >
                    {isPlaying ? <Square size={15} /> : <Play size={15} />}
                    {isPlaying ? 'Stop Audio' : 'Play Live Audio'}
                </button>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#0f172a',
                    border: `1.5px solid ${zone.color}`,
                }}>
                    <Sliders size={14} color={zone.color} />
                    <span style={{ fontWeight: '800', fontSize: '0.9rem', color: zone.color, whiteSpace: 'nowrap' }}>
                        {delayMs} ms — {zone.label}
                    </span>
                </div>
            </div>

            {/* Clickable Effect Zone Cards + Continuous Slider */}
            <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '12px', border: '1px solid #334155', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>
                    Click an effect preset below (or drag the slider) while listening:
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '6px', marginBottom: '12px' }}>
                    {ZONES.map(z => {
                        const active = zone.id === z.id;
                        return (
                            <button
                                key={z.id}
                                type="button"
                                onClick={() => selectMs(z.presetMs)}
                                style={{
                                    padding: '8px 4px',
                                    borderRadius: '7px',
                                    backgroundColor: active ? 'rgba(56, 189, 248, 0.16)' : '#1e293b',
                                    border: `1.5px solid ${active ? z.color : '#334155'}`,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.12s ease',
                                }}
                            >
                                <div style={{ fontSize: '0.72rem', fontWeight: '800', color: z.color }}>{z.range}</div>
                                <div style={{ fontSize: '0.74rem', color: '#f1f5f9', fontWeight: '700', marginTop: '2px' }}>{z.label}</div>
                            </button>
                        );
                    })}
                </div>

                <input
                    type="range"
                    min={minMs}
                    max={maxMs}
                    step={1}
                    value={delayMs}
                    onChange={(e) => selectMs(Number(e.target.value))}
                    style={{ width: '100%', accentColor: zone.color, cursor: 'pointer' }}
                />

                <p style={{ margin: '8px 0 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                    <strong style={{ color: zone.color }}>{zone.label}:</strong> {zone.desc}
                </p>
            </div>

            {/* Check Button / Feedback */}
            {!submitted ? (
                <button
                    type="button"
                    onClick={handleCheck}
                    style={{
                        width: '100%',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                    }}
                >
                    Check Delay Time ({delayMs} ms)
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
                            ? `Correct! ${delayMs} ms sits in the ${targetMin}–${targetMax} ms Flanger range.`
                            : `Not quite — ${delayMs} ms is outside the ${targetMin}–${targetMax} ms Flanger range. Adjust and try again.`}
                    </span>
                </div>
            )}
        </div>
    );
}
