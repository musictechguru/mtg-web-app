import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Square, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CombFilteringAudioQuiz({ onResult }) {
    const MIC_ARRIVAL_MS = 4.5;
    const [diDelayMs, setDiDelayMs] = useState(0.0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isUnsure, setIsUnsure] = useState(false);

    const audioCtxRef = useRef(null);
    const diDelayNodeRef = useRef(null);
    const oscRef = useRef(null);
    const oscSubRef = useRef(null);
    const masterGainRef = useRef(null);

    // Update live Web Audio delay node smoothly when slider moves
    useEffect(() => {
        if (diDelayNodeRef.current && audioCtxRef.current) {
            diDelayNodeRef.current.delayTime.setTargetAtTime(
                diDelayMs / 1000,
                audioCtxRef.current.currentTime,
                0.015
            );
        }
    }, [diDelayMs]);

    const stopAudio = () => {
        try {
            if (masterGainRef.current && audioCtxRef.current) {
                masterGainRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.02);
            }
            setTimeout(() => {
                try { oscRef.current?.stop(); } catch (_) {}
                try { oscSubRef.current?.stop(); } catch (_) {}
                oscRef.current = null;
                oscSubRef.current = null;
            }, 60);
        } catch (_) {}
        setIsPlaying(false);
    };

    useEffect(() => {
        return () => {
            try { oscRef.current?.stop(); } catch (_) {}
            try { oscSubRef.current?.stop(); } catch (_) {}
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                audioCtxRef.current.close().catch(() => {});
            }
        };
    }, []);

    const toggleAudio = async () => {
        if (isPlaying) {
            stopAudio();
            return;
        }
        try {
            if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
                const Ctx = window.AudioContext || window.webkitAudioContext;
                audioCtxRef.current = new Ctx();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') {
                await ctx.resume().catch(() => {});
            }
            const now = ctx.currentTime;

            // Harmonic-rich bass/guitar tone so comb filtering notches are unmistakably audible
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, now); // A2

            const oscSub = ctx.createOscillator();
            oscSub.type = 'triangle';
            oscSub.frequency.setValueAtTime(220, now); // A3 harmonic

            const toneFilter = ctx.createBiquadFilter();
            toneFilter.type = 'lowpass';
            toneFilter.frequency.setValueAtTime(2200, now);

            const diDelay = ctx.createDelay(0.05);
            diDelay.delayTime.setValueAtTime(diDelayMs / 1000, now);
            diDelayNodeRef.current = diDelay;

            const micDelay = ctx.createDelay(0.05);
            micDelay.delayTime.setValueAtTime(MIC_ARRIVAL_MS / 1000, now);

            const sumGain = ctx.createGain();
            sumGain.gain.setValueAtTime(0.001, now);
            sumGain.gain.linearRampToValueAtTime(0.18, now + 0.05);
            masterGainRef.current = sumGain;

            osc.connect(toneFilter);
            oscSub.connect(toneFilter);
            toneFilter.connect(diDelay);
            toneFilter.connect(micDelay);
            diDelay.connect(sumGain);
            micDelay.connect(sumGain);
            sumGain.connect(ctx.destination);

            osc.start(now);
            oscSub.start(now);
            oscRef.current = osc;
            oscSubRef.current = oscSub;
            setIsPlaying(true);
        } catch (e) {
            console.warn('Web Audio comb-filter demo failed:', e);
        }
    };

    const deltaMs = Math.abs(diDelayMs - MIC_ARRIVAL_MS);
    const isAligned = deltaMs <= 0.5;

    // Correlation approximation for display (+1 at 0 ms offset, dips toward negative/zero when offset > 0)
    const correlation = deltaMs === 0 ? 1.0 : Math.max(-0.85, Math.cos(Math.min(Math.PI, deltaMs * 0.72)));

    // Build live Comb Filter Frequency Response SVG curve (100 Hz to 3000 Hz)
    const buildCombPath = () => {
        const pts = [];
        const dtSec = deltaMs / 1000;
        for (let i = 0; i <= 100; i++) {
            const x = 35 + (i / 100) * 385;
            const freq = 100 + (i / 100) * 2900;
            // |1 + e^(-j 2 pi f dt)| / 2 = |cos(pi f dt)|
            const mag = dtSec === 0 ? 1 : Math.abs(Math.cos(Math.PI * freq * dtSec));
            const y = 115 - mag * 75; // 40 = 0 dB flat, 115 = deep comb notch
            pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
        }
        return pts.join(' ');
    };

    const handleCheck = () => {
        if (submitted) return;
        const pass = isAligned;
        setIsCorrect(pass);
        setIsUnsure(false);
        setSubmitted(true);
        if (isPlaying) stopAudio();
        if (onResult) onResult(pass);
    };

    const handleUnsure = () => {
        if (submitted) return;
        setIsCorrect(false);
        setIsUnsure(true);
        setSubmitted(true);
        if (isPlaying) stopAudio();
        if (onResult) onResult(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Live Audio Test Bar */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#e2e8f0' }}>
                    <Volume2 size={17} color="#38bdf8" />
                    <span><strong>Audio Test:</strong> Listen to the hollow comb filtering vanish at <strong>4.5 ms</strong>.</span>
                </div>
                <button
                    type="button"
                    onClick={toggleAudio}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        background: isPlaying ? '#ef4444' : '#0284c7',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                    }}
                >
                    {isPlaying ? <Square size={14} /> : <Play size={14} />}
                    {isPlaying ? 'Stop Tone' : 'Play Bass DI + Mic'}
                </button>
            </div>

            {/* Live Frequency Response (Comb Filtering) SVG */}
            <div style={{
                background: '#0b1120',
                borderRadius: '12px',
                border: '1px solid #1e293b',
                padding: '12px'
            }}>
                <svg viewBox="0 0 440 155" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    <text x="35" y="20" fill="#94a3b8" fontSize="10" fontWeight="700">
                        FREQUENCY RESPONSE ({deltaMs === 0 ? 'FLAT — NO COMB FILTERING' : `${deltaMs.toFixed(1)} ms OFFSET — COMB NOTCHES`})
                    </text>
                    <line x1="35" y1="40" x2="420" y2="40" stroke="#1e293b" strokeDasharray="4 4" />
                    <line x1="35" y1="115" x2="420" y2="115" stroke="#1e293b" />
                    <text x="6" y="44" fill="#64748b" fontSize="9">0 dB</text>
                    <text x="4" y="117" fill="#64748b" fontSize="9">-∞</text>
                    <text x="35" y="133" fill="#64748b" fontSize="9">100 Hz</text>
                    <text x="220" y="133" fill="#64748b" fontSize="9">1.5 kHz</text>
                    <text x="392" y="133" fill="#64748b" fontSize="9">3 kHz</text>

                    <path
                        d={buildCombPath()}
                        fill="none"
                        stroke={isAligned ? '#22c55e' : '#f59e0b'}
                        strokeWidth="2.6"
                    />
                </svg>

                {/* Phase Correlation Meter */}
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <span>Phase Correlation: <strong style={{ color: isAligned ? '#4ade80' : '#fbbf24' }}>{correlation >= 0 ? `+${correlation.toFixed(2)}` : correlation.toFixed(2)}</strong></span>
                    <span>Mic Arrival: <strong>4.5 ms</strong> | Time Offset: <strong>{deltaMs.toFixed(1)} ms</strong></span>
                </div>
            </div>

            {/* Delay Slider & Quick Presets */}
            <div style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(148, 163, 184, 0.25)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.92rem' }}>
                    <span style={{ fontWeight: '700', color: '#f8fafc' }}>DI Track Delay Compensation:</span>
                    <span style={{ fontWeight: '800', color: '#fbbf24' }}>{diDelayMs.toFixed(1)} ms</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.5"
                    disabled={submitted}
                    value={diDelayMs}
                    onChange={(e) => setDiDelayMs(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#38bdf8', cursor: submitted ? 'not-allowed' : 'pointer' }}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {[0.0, 2.0, 4.5, 7.0].map(val => (
                        <button
                            key={val}
                            type="button"
                            disabled={submitted}
                            onClick={() => setDiDelayMs(val)}
                            style={{
                                padding: '5px 12px',
                                borderRadius: '6px',
                                border: diDelayMs === val ? '1px solid #fbbf24' : '1px solid #475569',
                                background: diDelayMs === val ? 'rgba(251, 191, 36, 0.18)' : '#0f172a',
                                color: diDelayMs === val ? '#fbbf24' : '#cbd5e1',
                                fontWeight: '600',
                                fontSize: '0.82rem',
                                cursor: submitted ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {val.toFixed(1)} ms
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            {!submitted ? (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                        type="button"
                        onClick={handleUnsure}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '11px 16px',
                            borderRadius: '10px',
                            border: '1px dashed rgba(168, 85, 247, 0.5)',
                            background: 'rgba(168, 85, 247, 0.1)',
                            color: '#d8b4fe',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        <HelpCircle size={16} />
                        I'm Not Sure
                    </button>
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={handleCheck}
                        style={{ flex: 1 }}
                    >
                        Check Time Alignment
                    </button>
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: isCorrect ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                    border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
                    color: isCorrect ? '#86efac' : '#fca5a5',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                }}>
                    {isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>
                        {isCorrect
                            ? 'Spot on! Delaying the DI track by 4.5 ms aligns it with the amp mic, removing the comb-filter notches.'
                            : isUnsure
                                ? 'Review the graph: aligning the DI delay to 4.5 ms eliminates the time offset and flattens the comb-filter notches.'
                                : 'Not quite — any mismatch from 4.5 ms leaves a time offset between DI and Mic, creating comb-filter notches. Match 4.5 ms!'}
                    </span>
                </div>
            )}
        </div>
    );
}
