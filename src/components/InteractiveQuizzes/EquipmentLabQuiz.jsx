import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Cable, Sliders, CheckCircle2, AlertCircle, Play, Square } from 'lucide-react';

/**
 * Simple, engaging Web Audio & Visual Equipment Lab for Edexcel 9MT0 A-Level:
 *  - "balanced-cable": Unbalanced TS (50 Hz hum) vs Balanced XLR (phase-cancelled noise)
 *  - "lpf-synth": Sawtooth waveform through a 24 dB/oct Low-Pass Filter (Full vs 100 Hz Sub-Bass)
 *  - "humbucker-hum": Single-Coil vs Dual-Coil Humbucker with UK (50 Hz) & US (60 Hz) mains hum
 *  - "polar-pattern": 2x2 SVG Polar Pattern Diagram selector (Cardioid, Omni, Hypercardioid, Figure-8)
 */
const POLAR_SHAPES = {
    cardioid: 'M 60 22 C 88 22 98 52 84 74 C 74 88 64 76 60 66 C 56 76 46 88 36 74 C 22 52 32 22 60 22 Z',
    omni: 'M 60 22 A 38 38 0 1 1 59.9 22 Z',
    hypercardioid: 'M 60 20 C 82 20 88 46 74 62 C 66 70 68 88 60 88 C 52 88 54 70 46 62 C 32 46 38 20 60 20 Z',
    figure8: 'M 60 18 C 78 18 82 42 60 60 C 82 78 78 102 60 102 C 42 102 38 78 60 60 C 38 42 42 18 60 18 Z'
};

export default function EquipmentLabQuiz({ question, onResult }) {
    const mode = question?.mode || 'balanced-cable';
    const options = question?.options || [];
    const correctIndex = typeof question?.correctIndex === 'number' ? question.correctIndex : 0;

    const [isPlaying, setIsPlaying] = useState(false);
    const [cableType, setCableType] = useState('unbalanced'); // 'unbalanced' | 'balanced'
    const [cutoff, setCutoff] = useState(2400); // 2400 Hz | 100 Hz
    const [pickupType, setPickupType] = useState('single'); // 'single' | 'humbucker'
    const [mainsHz, setMainsHz] = useState(50); // 50 (UK) | 60 (US)

    const [selectedIdx, setSelectedIdx] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const ctxRef = useRef(null);
    const timerRef = useRef(null);
    const nodesRef = useRef({});

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
    };

    useEffect(() => {
        return () => stopAudio();
    }, []);

    useEffect(() => {
        const ctx = ctxRef.current;
        const n = nodesRef.current;
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;

        if (mode === 'balanced-cable' && n.humGain) {
            n.humGain.gain.setTargetAtTime(cableType === 'balanced' ? 0.0 : 0.28, now, 0.03);
        }
        if (mode === 'lpf-synth' && n.lpf1 && n.lpf2) {
            n.lpf1.frequency.setTargetAtTime(cutoff, now, 0.04);
            n.lpf2.frequency.setTargetAtTime(cutoff, now, 0.04);
        }
        if (mode === 'humbucker-hum' && n.humGain && n.humOscs) {
            n.humGain.gain.setTargetAtTime(pickupType === 'humbucker' ? 0.0 : 0.28, now, 0.03);
            n.humOscs.forEach((osc, i) => {
                osc.frequency.setTargetAtTime(mainsHz * (i + 1), now, 0.02);
            });
        }
    }, [cableType, cutoff, pickupType, mainsHz, mode]);

    const togglePlay = async () => {
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

        if (mode === 'balanced-cable') {
            const sigGain = ctx.createGain();
            sigGain.connect(masterGain);

            // 50 Hz mains hum + 100 Hz & 150 Hz harmonics so it is audible on laptop speakers
            const humGain = ctx.createGain();
            humGain.gain.value = cableType === 'balanced' ? 0.0 : 0.28;
            humGain.connect(masterGain);

            [50, 100, 150].forEach((freq, i) => {
                const hum = ctx.createOscillator();
                hum.type = 'sawtooth';
                hum.frequency.value = freq;
                const g = ctx.createGain();
                g.gain.value = i === 0 ? 0.5 : i === 1 ? 0.35 : 0.2;
                hum.connect(g).connect(humGain);
                hum.start();
            });

            nodesRef.current = { sigGain, humGain };

            const playNote = () => {
                if (!ctxRef.current || ctxRef.current.state === 'closed') return;
                const t = ctxRef.current.currentTime + 0.02;
                const osc = ctxRef.current.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(220, t);
                const g = ctxRef.current.createGain();
                g.gain.setValueAtTime(0.4, t);
                g.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
                osc.connect(g).connect(sigGain);
                osc.start(t);
                osc.stop(t + 0.38);
            };
            playNote();
            timerRef.current = setInterval(playNote, 600);
        } else if (mode === 'humbucker-hum') {
            const sigGain = ctx.createGain();
            sigGain.connect(masterGain);

            const humGain = ctx.createGain();
            humGain.gain.value = pickupType === 'humbucker' ? 0.0 : 0.28;
            humGain.connect(masterGain);

            const humOscs = [1, 2, 3].map((mult, i) => {
                const hum = ctx.createOscillator();
                hum.type = 'sawtooth';
                hum.frequency.value = mainsHz * mult;
                const g = ctx.createGain();
                g.gain.value = i === 0 ? 0.5 : i === 1 ? 0.35 : 0.2;
                hum.connect(g).connect(humGain);
                hum.start();
                return hum;
            });

            nodesRef.current = { sigGain, humGain, humOscs };

            const playGuitar = () => {
                if (!ctxRef.current || ctxRef.current.state === 'closed') return;
                const t = ctxRef.current.currentTime + 0.02;
                [196.0, 246.94, 293.66].forEach((freq) => {
                    const osc = ctxRef.current.createOscillator();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, t);
                    const g = ctxRef.current.createGain();
                    g.gain.setValueAtTime(0.18, t);
                    g.gain.exponentialRampToValueAtTime(0.005, t + 0.48);
                    osc.connect(g).connect(sigGain);
                    osc.start(t);
                    osc.stop(t + 0.5);
                });
            };
            playGuitar();
            timerRef.current = setInterval(playGuitar, 700);
        } else {
            // Two cascaded 12 dB/oct filters = 24 dB/oct Low-Pass Filter
            const lpf1 = ctx.createBiquadFilter();
            lpf1.type = 'lowpass';
            lpf1.frequency.value = cutoff;
            lpf1.Q.value = 1.2;

            const lpf2 = ctx.createBiquadFilter();
            lpf2.type = 'lowpass';
            lpf2.frequency.value = cutoff;
            lpf2.Q.value = 1.2;

            lpf1.connect(lpf2).connect(masterGain);
            nodesRef.current = { lpf1, lpf2 };

            let step = 0;
            const notes = [55, 55, 65.4, 73.4];
            const playBass = () => {
                if (!ctxRef.current || ctxRef.current.state === 'closed') return;
                const t = ctxRef.current.currentTime + 0.02;
                const osc = ctxRef.current.createOscillator();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(notes[step % notes.length], t);
                const g = ctxRef.current.createGain();
                g.gain.setValueAtTime(0.55, t);
                g.gain.exponentialRampToValueAtTime(0.05, t + 0.28);
                osc.connect(g).connect(lpf1);
                osc.start(t);
                osc.stop(t + 0.3);
                step += 1;
            };
            playBass();
            timerRef.current = setInterval(playBass, 320);
        }

        setIsPlaying(true);
    };

    const handleSubmit = () => {
        if (selectedIdx === null || submitted) return;
        stopAudio();
        const ok = selectedIdx === correctIndex;
        setIsCorrect(ok);
        setSubmitted(true);
        if (onResult) onResult(ok, { selectedIdx, mode });
    };

    if (mode === 'polar-pattern') {
        const diagrams = question?.diagrams || [
            { id: 'cardioid', label: 'Diagram A', name: 'Cardioid' },
            { id: 'omni', label: 'Diagram B', name: 'Omnidirectional' },
            { id: 'hypercardioid', label: 'Diagram C', name: 'Hypercardioid' },
            { id: 'figure8', label: 'Diagram D', name: 'Figure-8 (Bidirectional)' }
        ];
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                    {diagrams.map((d, idx) => {
                        const isSel = selectedIdx === idx;
                        const isAns = idx === correctIndex;
                        let border = 'rgba(255,255,255,0.14)';
                        let bg = 'rgba(15, 23, 42, 0.75)';
                        if (submitted) {
                            if (isAns) {
                                border = '#10b981';
                                bg = 'rgba(16,185,129,0.14)';
                            } else if (isSel) {
                                border = '#ef4444';
                                bg = 'rgba(239,68,68,0.14)';
                            }
                        } else if (isSel) {
                            border = '#38bdf8';
                            bg = 'rgba(56,189,248,0.14)';
                        }

                        return (
                            <button
                                key={d.id}
                                type="button"
                                disabled={submitted}
                                onClick={() => setSelectedIdx(idx)}
                                style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: `2px solid ${border}`,
                                    background: bg,
                                    color: '#f8fafc',
                                    cursor: submitted ? 'default' : 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <svg viewBox="0 0 120 120" style={{ width: '110px', height: '110px' }}>
                                    <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth="1" />
                                    <circle cx="60" cy="60" r="24" fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="1" />
                                    <line x1="60" y1="10" x2="60" y2="110" stroke="rgba(148,163,184,0.22)" strokeWidth="1" />
                                    <line x1="10" y1="60" x2="110" y2="60" stroke="rgba(148,163,184,0.22)" strokeWidth="1" />
                                    <text x="60" y="9" textAnchor="middle" fill="#94a3b8" fontSize="8">0°</text>
                                    <text x="112" y="63" textAnchor="start" fill="#94a3b8" fontSize="8">90°</text>
                                    <text x="60" y="118" textAnchor="middle" fill="#94a3b8" fontSize="8">180°</text>
                                    <text x="8" y="63" textAnchor="end" fill="#94a3b8" fontSize="8">270°</text>
                                    <path
                                        d={POLAR_SHAPES[d.id] || POLAR_SHAPES.cardioid}
                                        fill="rgba(56, 189, 248, 0.22)"
                                        stroke="#38bdf8"
                                        strokeWidth="2.5"
                                    />
                                    <circle cx="60" cy="60" r="3" fill="#f8fafc" />
                                </svg>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>{submitted ? d.name : d.label}</span>
                                    {submitted && isAns && <CheckCircle2 size={16} color="#10b981" />}
                                    {submitted && !isAns && isSel && <AlertCircle size={16} color="#ef4444" />}
                                </div>
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
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
                        {mode === 'balanced-cable' ? <Cable size={17} /> : <Sliders size={17} />}
                        <span>
                            {mode === 'balanced-cable' && 'EQUIPMENT LAB: UNBALANCED VS BALANCED XLR'}
                            {mode === 'lpf-synth' && 'SYNTH LAB: 24 dB/OCT LOW-PASS FILTER'}
                            {mode === 'humbucker-hum' && 'GUITAR LAB: 50 Hz (UK) / 60 Hz (US) HUM REJECTION'}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={togglePlay}
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
                            cursor: submitted ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isPlaying ? <Square size={15} /> : <Play size={15} />}
                        {isPlaying ? 'Stop Audio' : 'Play Test Signal'}
                    </button>
                </div>

                {mode === 'humbucker-hum' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setPickupType('single')}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    border: `2px solid ${pickupType === 'single' ? '#f59e0b' : 'rgba(255,255,255,0.12)'}`,
                                    background: pickupType === 'single' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                1. Single-Coil (Hum Audible)
                            </button>
                            <button
                                type="button"
                                onClick={() => setPickupType('humbucker')}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    border: `2px solid ${pickupType === 'humbucker' ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
                                    background: pickupType === 'humbucker' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                2. Humbucker (Hum Cancelled)
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setMainsHz(50)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: `1.5px solid ${mainsHz === 50 ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`,
                                    background: mainsHz === 50 ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.03)',
                                    color: '#e2e8f0',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                UK Mains Hum (50 Hz)
                            </button>
                            <button
                                type="button"
                                onClick={() => setMainsHz(60)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: `1.5px solid ${mainsHz === 60 ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`,
                                    background: mainsHz === 60 ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.03)',
                                    color: '#e2e8f0',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                US Mains Hum (60 Hz)
                            </button>
                        </div>
                    </div>
                )}

                {mode === 'balanced-cable' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={() => setCableType('unbalanced')}
                            style={{
                                padding: '10px 12px',
                                borderRadius: '10px',
                                border: `2px solid ${cableType === 'unbalanced' ? '#f59e0b' : 'rgba(255,255,255,0.12)'}`,
                                background: cableType === 'unbalanced' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)',
                                color: '#f8fafc',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            1. Unbalanced Cable (50 Hz Hum!)
                        </button>
                        <button
                            type="button"
                            onClick={() => setCableType('balanced')}
                            style={{
                                padding: '10px 12px',
                                borderRadius: '10px',
                                border: `2px solid ${cableType === 'balanced' ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
                                background: cableType === 'balanced' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                                color: '#f8fafc',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            2. Balanced XLR (Phase Cancelled)
                        </button>
                    </div>
                )}

                {mode === 'lpf-synth' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={() => setCutoff(2400)}
                            style={{
                                padding: '10px 12px',
                                borderRadius: '10px',
                                border: `2px solid ${cutoff === 2400 ? '#f59e0b' : 'rgba(255,255,255,0.12)'}`,
                                background: cutoff === 2400 ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)',
                                color: '#f8fafc',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            1. Filter Open (2,400 Hz Bright Saw)
                        </button>
                        <button
                            type="button"
                            onClick={() => setCutoff(100)}
                            style={{
                                padding: '10px 12px',
                                borderRadius: '10px',
                                border: `2px solid ${cutoff === 100 ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
                                background: cutoff === 100 ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                                color: '#f8fafc',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            2. Low-Pass @ 100 Hz (Sub-Bass)
                        </button>
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <Volume2 size={14} />
                    <span>
                        {mode === 'balanced-cable' && 'Press Play and switch between Unbalanced and Balanced XLR to hear the mains hum vanish.'}
                        {mode === 'lpf-synth' && 'Press Play and toggle the Low-Pass Filter to 100 Hz to hear upper harmonics disappear.'}
                        {mode === 'humbucker-hum' && 'Press Play, switch between UK (50 Hz) and US (60 Hz) hum, and toggle Single-Coil vs Humbucker.'}
                    </span>
                </div>
            </div>

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
