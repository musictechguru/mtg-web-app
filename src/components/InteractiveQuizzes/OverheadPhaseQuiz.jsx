import React, { useState, useRef, useEffect } from 'react';
import { Volume2, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OverheadPhaseQuiz({ onResult }) {
    const LEFT_DIST_M = 1.20;
    const [rightDistM, setRightDistM] = useState(0.90);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isUnsure, setIsUnsure] = useState(false);

    const audioCtxRef = useRef(null);

    useEffect(() => {
        return () => {
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                audioCtxRef.current.close().catch(() => {});
            }
        };
    }, []);

    const diffM = Math.abs(rightDistM - LEFT_DIST_M);
    const diffMs = (diffM / 343) * 1000;
    const isEquidistant = diffM <= 0.05;

    const playStereoSnareTest = async () => {
        try {
            if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
                const Ctx = window.AudioContext || window.webkitAudioContext;
                audioCtxRef.current = new Ctx();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') await ctx.resume().catch(() => {});
            const now = ctx.currentTime;

            // Synthesize crisp snare transient
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(195, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

            const env = ctx.createGain();
            env.gain.setValueAtTime(0.001, now);
            env.gain.linearRampToValueAtTime(0.6, now + 0.003);
            env.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
            osc.connect(env);

            // Stereo merger: Left = OH L (1.20m), Right = OH R (rightDistM)
            const merger = ctx.createChannelMerger(2);
            const leftDelay = ctx.createDelay(0.05);
            leftDelay.delayTime.setValueAtTime(LEFT_DIST_M / 343, now);

            const rightDelay = ctx.createDelay(0.05);
            rightDelay.delayTime.setValueAtTime(rightDistM / 343, now);

            env.connect(leftDelay);
            env.connect(rightDelay);
            leftDelay.connect(merger, 0, 0);
            rightDelay.connect(merger, 0, 1);
            merger.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.16);
        } catch (e) {
            console.warn('Web Audio stereo snare test failed:', e);
        }
    };

    const handleCheck = () => {
        if (submitted) return;
        const pass = isEquidistant;
        setIsCorrect(pass);
        setIsUnsure(false);
        setSubmitted(true);
        if (onResult) onResult(pass);
    };

    const handleUnsure = () => {
        if (submitted) return;
        setIsCorrect(false);
        setIsUnsure(true);
        setSubmitted(true);
        if (onResult) onResult(false);
    };

    // Map rightDistM (0.80..1.60) to SVG X coordinate for OH R
    const snareX = 185;
    const snareY = 148;
    const leftMicX = 110;
    const leftMicY = 58;
    const rightMicX = snareX + (rightDistM / 1.2) * 75;
    const rightMicY = 148 - (rightDistM / 1.2) * 90;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Audio Test Bar */}
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
                    <span><strong>Stereo Audio Check:</strong> Listen for the snare locking dead centre.</span>
                </div>
                <button
                    type="button"
                    onClick={playStereoSnareTest}
                    style={{
                        padding: '7px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#0284c7',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.84rem',
                        cursor: 'pointer'
                    }}
                >
                    Play Stereo Snare Hit
                </button>
            </div>

            {/* Drum Kit Overhead Diagram SVG */}
            <div style={{
                background: '#0b1120',
                borderRadius: '12px',
                border: '1px solid #1e293b',
                padding: '12px'
            }}>
                <svg viewBox="0 0 420 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    {/* Kick / Toms context */}
                    <ellipse cx="220" cy="118" rx="42" ry="26" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                    <text x="220" y="122" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">KICK</text>

                    {/* Snare Drum */}
                    <circle cx={snareX} cy={snareY} r="24" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                    <text x={snareX} y={snareY + 4} textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="700">SNARE</text>

                    {/* Distance lines */}
                    <line x1={snareX} y1={snareY} x2={leftMicX} y2={leftMicY} stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 4" />
                    <line x1={snareX} y1={snareY} x2={rightMicX} y2={rightMicY} stroke={isEquidistant ? '#22c55e' : '#ef4444'} strokeWidth="2" strokeDasharray="5 4" />

                    {/* OH Left (Fixed 1.20 m) */}
                    <circle cx={leftMicX} cy={leftMicY} r="14" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                    <text x={leftMicX} y={leftMicY + 4} textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="800">OH L</text>
                    <text x={leftMicX} y={leftMicY - 20} textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="700">1.20 m (Fixed)</text>

                    {/* OH Right (Movable) */}
                    <circle cx={rightMicX} cy={rightMicY} r="14" fill={isEquidistant ? '#14532d' : '#7f1d1d'} stroke={isEquidistant ? '#22c55e' : '#ef4444'} strokeWidth="2" />
                    <text x={rightMicX} y={rightMicY + 4} textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="800">OH R</text>
                    <text x={rightMicX} y={rightMicY - 20} textAnchor="middle" fill={isEquidistant ? '#4ade80' : '#fca5a5'} fontSize="10" fontWeight="700">
                        {rightDistM.toFixed(2)} m
                    </text>

                    {/* Status Banner */}
                    <rect
                        x="110"
                        y="178"
                        width="200"
                        height="18"
                        rx="5"
                        fill={isEquidistant ? 'rgba(34, 197, 94, 0.16)' : 'rgba(239, 68, 68, 0.16)'}
                    />
                    <text
                        x="210"
                        y="190"
                        textAnchor="middle"
                        fill={isEquidistant ? '#4ade80' : '#fca5a5'}
                        fontSize="9.5"
                        fontWeight="700"
                    >
                        {isEquidistant ? '0.00 ms OFFSET — IN PHASE & CENTRED' : `${diffMs.toFixed(2)} ms OFFSET — OFF-CENTRE`}
                    </text>
                </svg>
            </div>

            {/* Distance Slider & Presets */}
            <div style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(148, 163, 184, 0.25)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.92rem' }}>
                    <span style={{ fontWeight: '700', color: '#f8fafc' }}>Right Overhead (OH R) Distance to Snare:</span>
                    <span style={{ fontWeight: '800', color: '#fbbf24' }}>{rightDistM.toFixed(2)} m</span>
                </div>
                <input
                    type="range"
                    min="0.80"
                    max="1.60"
                    step="0.05"
                    disabled={submitted}
                    value={rightDistM}
                    onChange={(e) => setRightDistM(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#38bdf8', cursor: submitted ? 'not-allowed' : 'pointer' }}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {[0.85, 1.00, 1.20, 1.50].map(val => (
                        <button
                            key={val}
                            type="button"
                            disabled={submitted}
                            onClick={() => setRightDistM(val)}
                            style={{
                                padding: '5px 12px',
                                borderRadius: '6px',
                                border: Math.abs(rightDistM - val) < 0.01 ? '1px solid #fbbf24' : '1px solid #475569',
                                background: Math.abs(rightDistM - val) < 0.01 ? 'rgba(251, 191, 36, 0.18)' : '#0f172a',
                                color: Math.abs(rightDistM - val) < 0.01 ? '#fbbf24' : '#cbd5e1',
                                fontWeight: '600',
                                fontSize: '0.82rem',
                                cursor: submitted ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {val.toFixed(2)} m
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
                        Check Overhead Setup
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
                            ? 'Spot on! Measuring both overheads to 1.20 m locks the snare transient in phase and dead centre.'
                            : isUnsure
                                ? 'Review the setup: both overhead mics must sit the exact same distance (1.20 m) from the snare centre.'
                                : 'Not quite — unequal distances cause the snare to arrive at one overhead first, pulling it off-centre and smearing phase.'}
                    </span>
                </div>
            )}
        </div>
    );
}
