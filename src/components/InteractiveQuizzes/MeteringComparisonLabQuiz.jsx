import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, CheckCircle2, AlertCircle, Activity } from 'lucide-react';

const SOURCES = [
    {
        id: 'snare',
        label: 'Snare Transient Hit',
        desc: 'Short, sharp 10 ms drum crack — huge peak level, low average loudness.',
        peakTargetDb: -1,
        vuTargetDb: -13,
    },
    {
        id: 'pad',
        label: 'Sustained Organ Pad',
        desc: 'Smooth, continuous chord — steady average loudness close to peak.',
        peakTargetDb: -6,
        vuTargetDb: -2,
    },
];

const CHOICES = [
    'Peak Meter (dBFS) — catches instant transients',
    'VU Meter — moves slowly at 300 ms average',
    'Both meters spike identically on every hit',
    'Neither meter detects digital clipping risk',
];

export default function MeteringComparisonLabQuiz({ question, onResult }) {
    const [sourceId, setSourceId] = useState('snare');
    const [isPlaying, setIsPlaying] = useState(false);
    const [peakDb, setPeakDb] = useState(-36);
    const [peakHoldDb, setPeakHoldDb] = useState(-36);
    const [vuDb, setVuDb] = useState(-20);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const ctxRef = useRef(null);
    const intervalRef = useRef(null);
    const animRef = useRef(null);
    const targetPeakRef = useRef(-36);
    const targetVuRef = useRef(-20);

    const stopAudio = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (ctxRef.current && ctxRef.current.state !== 'closed') {
            ctxRef.current.close().catch(() => {});
            ctxRef.current = null;
        }
        setIsPlaying(false);
    };

    useEffect(() => {
        // Smooth 60fps meter ballistics animation loop:
        // Peak meter: instant attack, medium decay. VU meter: slow 300ms averaging rise & fall.
        let lastTime = performance.now();
        const tick = (now) => {
            const dt = Math.min(0.05, (now - lastTime) / 1000);
            lastTime = now;

            setPeakDb(prev => {
                const target = targetPeakRef.current;
                if (target > prev) return target; // instant peak attack
                return Math.max(-36, prev - 32 * dt); // fast LED decay
            });

            setVuDb(prev => {
                const target = targetVuRef.current;
                // 300ms ballistic integration
                return prev + (target - prev) * Math.min(1, dt * 4.5);
            });

            animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
            stopAudio();
        };
    }, []);

    const fireSnare = (ctx) => {
        const now = ctx.currentTime;
        // Crisp snare transient burst
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(190, now);
        osc.frequency.exponentialRampToValueAtTime(95, now + 0.08);
        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);

        // White noise snap
        const len = Math.floor(ctx.sampleRate * 0.12);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.25));
        const noise = ctx.createBufferSource();
        noise.buffer = buf;
        const nGain = ctx.createGain();
        nGain.gain.value = 0.28;
        noise.connect(nGain);
        nGain.connect(ctx.destination);
        noise.start(now);

        // Meter impulse: Peak jumps to -1 dBFS, VU only nudges toward -13 VU
        targetPeakRef.current = -1;
        setPeakHoldDb(-1);
        targetVuRef.current = -13;
        setTimeout(() => {
            targetPeakRef.current = -36;
            targetVuRef.current = -20;
        }, 90);
    };

    const firePad = (ctx) => {
        const now = ctx.currentTime;
        [220, 277.18, 329.63].forEach(freq => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            g.gain.setValueAtTime(0.001, now);
            g.gain.linearRampToValueAtTime(0.09, now + 0.12);
            g.gain.linearRampToValueAtTime(0.07, now + 0.85);
            g.gain.exponentialRampToValueAtTime(0.001, now + 1.05);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 1.08);
        });
        targetPeakRef.current = -6;
        setPeakHoldDb(-6);
        targetVuRef.current = -2;
    };

    const triggerSignal = (id, withAudio = true) => {
        setSourceId(id);
        if (withAudio) {
            try {
                if (!ctxRef.current || ctxRef.current.state === 'closed') {
                    const Ctx = window.AudioContext || window.webkitAudioContext;
                    ctxRef.current = new Ctx();
                }
                if (ctxRef.current.state === 'suspended') {
                    ctxRef.current.resume().catch(() => {});
                }
                if (id === 'snare') fireSnare(ctxRef.current);
                else firePad(ctxRef.current);
            } catch {
                // Visual meter simulation still works even if audio is muted
            }
        } else {
            if (id === 'snare') {
                targetPeakRef.current = -1;
                setPeakHoldDb(-1);
                targetVuRef.current = -13;
                setTimeout(() => {
                    targetPeakRef.current = -36;
                    targetVuRef.current = -20;
                }, 120);
            } else {
                targetPeakRef.current = -6;
                setPeakHoldDb(-6);
                targetVuRef.current = -2;
            }
        }
    };

    const toggleLoop = () => {
        if (isPlaying) {
            stopAudio();
            targetPeakRef.current = -36;
            targetVuRef.current = -20;
            return;
        }
        setIsPlaying(true);
        triggerSignal(sourceId, true);
        intervalRef.current = setInterval(() => {
            triggerSignal(sourceId, true);
        }, 1000);
    };

    const handleSourceSwitch = (id) => {
        setSourceId(id);
        setPeakHoldDb(-36);
        if (isPlaying) {
            clearInterval(intervalRef.current);
            triggerSignal(id, true);
            intervalRef.current = setInterval(() => triggerSignal(id, true), 1000);
        } else {
            triggerSignal(id, true);
        }
    };

    const handleCheck = () => {
        const correctIdx = question?.correctIndex ?? 0;
        const ok = selectedIdx === correctIdx;
        setIsCorrect(ok);
        setSubmitted(true);
        if (onResult) onResult(ok);
    };

    // Map peakDb (-36..0) to 0..100% bar height
    const peakPct = Math.max(0, Math.min(100, ((peakDb + 36) / 36) * 100));
    const peakHoldPct = Math.max(0, Math.min(100, ((peakHoldDb + 36) / 36) * 100));

    // Map vuDb (-20..+3) to needle angle (-45deg..+45deg)
    const vuAngle = Math.max(-45, Math.min(45, ((vuDb + 20) / 23) * 90 - 45));

    const activeSource = SOURCES.find(s => s.id === sourceId) || SOURCES[0];

    return (
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155', color: '#f8fafc' }}>
            {/* Signal Source Switcher + Play Loop */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {SOURCES.map(src => {
                        const active = sourceId === src.id;
                        return (
                            <button
                                key={src.id}
                                type="button"
                                onClick={() => handleSourceSwitch(src.id)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: active ? '1.5px solid #38bdf8' : '1px solid #475569',
                                    backgroundColor: active ? '#1d4ed8' : '#0f172a',
                                    color: '#f8fafc',
                                    fontSize: '0.82rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                }}
                            >
                                {src.label}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={toggleLoop}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: isPlaying ? '#ef4444' : '#059669',
                        color: '#ffffff',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                    }}
                >
                    {isPlaying ? <Square size={14} /> : <Play size={14} />}
                    {isPlaying ? 'Stop Loop' : 'Play Loop'}
                </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 12px 0' }}>
                <Activity size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }} />
                {activeSource.desc}
            </p>

            {/* Side-by-Side Live Peak Meter vs VU Meter */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                {/* Digital Peak Meter */}
                <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Digital Peak (dBFS)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '124px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', fontSize: '0.68rem', color: '#64748b', fontFamily: 'monospace', textAlign: 'right' }}>
                            <span style={{ color: '#ef4444', fontWeight: '700' }}>0</span>
                            <span>-6</span>
                            <span>-12</span>
                            <span>-24</span>
                            <span>-36</span>
                        </div>
                        <div style={{ position: 'relative', width: '28px', height: '100%', backgroundColor: '#1e293b', borderRadius: '6px', overflow: 'hidden', border: '1px solid #334155' }}>
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: `${peakPct}%`,
                                    background: 'linear-gradient(to top, #22c55e 0%, #eab308 72%, #ef4444 92%)',
                                    transition: 'height 0.03s linear',
                                }}
                            />
                            {/* Peak Hold Line */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: `${peakHoldPct}%`,
                                    height: '2px',
                                    backgroundColor: peakHoldDb >= -3 ? '#ef4444' : '#f8fafc',
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '0.84rem', fontWeight: '700', color: peakHoldDb >= -3 ? '#f87171' : '#e2e8f0' }}>
                        Peak Hold: {peakHoldDb.toFixed(0)} dBFS
                    </div>
                </div>

                {/* Analogue VU Meter */}
                <div style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: '800', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        Analogue VU (Average)
                    </div>
                    <div style={{
                        width: '100%',
                        maxWidth: '170px',
                        height: '112px',
                        background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)',
                        borderRadius: '8px',
                        border: '2px solid #475569',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <svg viewBox="0 0 180 110" style={{ width: '100%', height: '100%' }}>
                            <path d="M 28 84 A 72 72 0 0 1 124 38" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                            <path d="M 124 38 A 72 72 0 0 1 152 84" fill="none" stroke="#dc2626" strokeWidth="3.5" />
                            <text x="24" y="72" fontSize="9" fontWeight="700" fill="#1e293b">-20</text>
                            <text x="86" y="34" fontSize="9" fontWeight="700" fill="#1e293b" textAnchor="middle">-3</text>
                            <text x="124" y="34" fontSize="9" fontWeight="800" fill="#dc2626">0</text>
                            <text x="150" y="72" fontSize="9" fontWeight="800" fill="#dc2626">+3</text>
                            <text x="90" y="62" fontSize="11" fontWeight="800" fill="#78350f" textAnchor="middle">VU</text>
                            <g transform={`translate(90, 98) rotate(${vuAngle})`}>
                                <line x1="0" y1="0" x2="0" y2="-66" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="0" cy="0" r="5" fill="#334155" />
                            </g>
                        </svg>
                    </div>
                    <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '0.84rem', fontWeight: '700', color: '#fde68a' }}>
                        Reading: {vuDb.toFixed(0)} VU
                    </div>
                </div>
            </div>

            {/* Question Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                {(question?.choices || CHOICES).map((choice, idx) => {
                    const selected = selectedIdx === idx;
                    const correctIdx = question?.correctIndex ?? 0;
                    let border = selected ? '#38bdf8' : '#334155';
                    let bg = selected ? 'rgba(37, 99, 235, 0.25)' : '#0f172a';
                    if (submitted) {
                        if (idx === correctIdx) {
                            border = '#22c55e';
                            bg = 'rgba(34, 197, 94, 0.16)';
                        } else if (selected) {
                            border = '#ef4444';
                            bg = 'rgba(239, 68, 68, 0.16)';
                        }
                    }
                    return (
                        <button
                            key={idx}
                            type="button"
                            disabled={submitted}
                            onClick={() => setSelectedIdx(idx)}
                            style={{
                                textAlign: 'left',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: `1.5px solid ${border}`,
                                backgroundColor: bg,
                                color: '#f1f5f9',
                                fontSize: '0.88rem',
                                fontWeight: '600',
                                cursor: submitted ? 'default' : 'pointer',
                            }}
                        >
                            {choice}
                        </button>
                    );
                })}
            </div>

            {!submitted ? (
                <button
                    type="button"
                    disabled={selectedIdx === null}
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
                        cursor: selectedIdx === null ? 'not-allowed' : 'pointer',
                        opacity: selectedIdx === null ? 0.5 : 1,
                    }}
                >
                    Check Metering Answer
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
                            ? 'Correct! Peak meters catch fast -1 dBFS snare spikes instantly, while VU meters average loudness.'
                            : 'Not quite — watch how the Peak meter snaps immediately to -1 dBFS on the Snare Hit while the VU needle barely moves.'}
                    </span>
                </div>
            )}
        </div>
    );
}
