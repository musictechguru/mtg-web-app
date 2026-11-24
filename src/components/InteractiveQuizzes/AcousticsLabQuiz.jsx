import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Radio, Waves, CheckCircle2, AlertCircle, Hand, Play, Square } from 'lucide-react';

/**
 * Simple, engaging Web Audio + visual Acoustics Lab for Edexcel 9MT0 A-Level:
 *  - "inverse-square": Move mic 1m -> 2m -> 4m and hear/see the -6 dB drop per doubling
 *  - "flutter-echo": Clap hands in an untreated parallel-wall room vs treated room
 *  - "absorption-diffusion": Compare Untreated vs Thin Foam vs Bass Trap + Diffuser
 */
export default function AcousticsLabQuiz({ question, onResult }) {
    const mode = question?.mode || 'inverse-square';
    const options = question?.options || [];
    const correctIndex = typeof question?.correctIndex === 'number' ? question.correctIndex : 0;

    const [distance, setDistance] = useState(1); // 1 | 2 | 4 metres
    const [treated, setTreated] = useState(false); // flutter-echo toggle
    const [roomType, setRoomType] = useState('untreated'); // 'untreated' | 'foam' | 'diffuser'
    const [isPlaying, setIsPlaying] = useState(false);

    const [selectedIdx, setSelectedIdx] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const ctxRef = useRef(null);
    const timerRef = useRef(null);
    const roomTypeRef = useRef(roomType);

    useEffect(() => {
        roomTypeRef.current = roomType;
    }, [roomType]);

    const stopAudio = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
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

    const getCtx = async () => {
        if (!ctxRef.current || ctxRef.current.state === 'closed') {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            ctxRef.current = new AudioCtx();
        }
        if (ctxRef.current.state === 'suspended') {
            await ctxRef.current.resume();
        }
        return ctxRef.current;
    };

    // Play a short snare/tone test at the selected mic distance (1m = 0 dB, 2m = -6 dB, 4m = -12 dB)
    const playDistancePing = async (dist) => {
        setDistance(dist);
        const ctx = await getCtx();
        const now = ctx.currentTime;
        const gainVal = dist === 1 ? 0.65 : dist === 2 ? 0.325 : 0.162;

        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);

        const g = ctx.createGain();
        g.gain.setValueAtTime(gainVal, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(g).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.37);
    };

    // Trigger a handclap with or without rapid 32 ms parallel-wall flutter echo
    const triggerClap = async (isTreated) => {
        const ctx = await getCtx();
        const echoes = isTreated ? 1 : 9;

        for (let i = 0; i < echoes; i++) {
            const t = ctx.currentTime + i * 0.032; // 32ms bounce between ~5.5m walls
            const amp = i === 0 ? 0.7 : 0.45 * Math.pow(0.76, i);
            const bufSize = Math.floor(ctx.sampleRate * 0.025);
            const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
            const data = buf.getChannelData(0);
            for (let j = 0; j < bufSize; j++) data[j] = Math.random() * 2 - 1;

            const src = ctx.createBufferSource();
            src.buffer = buf;

            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = isTreated ? 1200 : 2400;
            bp.Q.value = isTreated ? 0.7 : 2.2;

            const g = ctx.createGain();
            g.gain.setValueAtTime(amp, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

            src.connect(bp).connect(g).connect(ctx.destination);
            src.start(t);
        }
    };

    // Loop acoustic guitar/drum pluck comparing Untreated vs Thin Foam vs Bass Trap + Diffuser
    const toggleRoomLoop = async () => {
        if (isPlaying) {
            stopAudio();
            return;
        }
        const ctx = await getCtx();
        setIsPlaying(true);

        const playHit = () => {
            if (!ctxRef.current || ctxRef.current.state === 'closed') return;
            const rt = roomTypeRef.current;
            const t = ctxRef.current.currentTime + 0.02;

            // Body / Bass resonance (boomy in untreated & thin foam; tight with bass traps)
            const bass = ctxRef.current.createOscillator();
            bass.type = 'sine';
            bass.frequency.setValueAtTime(110, t);
            const bg = ctxRef.current.createGain();
            const bassDecay = rt === 'diffuser' ? 0.22 : 0.65;
            bg.gain.setValueAtTime(rt === 'diffuser' ? 0.35 : 0.65, t);
            bg.gain.exponentialRampToValueAtTime(0.001, t + bassDecay);
            bass.connect(bg).connect(ctxRef.current.destination);
            bass.start(t);
            bass.stop(t + bassDecay + 0.02);

            // Top transient + reflections (dry/dull in thin foam; spacious & even in diffuser; harsh slap in untreated)
            const reps = rt === 'foam' ? 1 : rt === 'untreated' ? 5 : 4;
            for (let i = 0; i < reps; i++) {
                const rtTime = t + i * (rt === 'diffuser' ? 0.045 : 0.06);
                const osc = ctxRef.current.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(i === 0 ? 440 : 440 + i * 12, rtTime);
                const g = ctxRef.current.createGain();
                const level = i === 0 ? 0.28 : (rt === 'untreated' ? 0.16 : 0.09) * Math.pow(0.7, i);
                g.gain.setValueAtTime(level, rtTime);
                g.gain.exponentialRampToValueAtTime(0.001, rtTime + 0.12);
                osc.connect(g).connect(ctxRef.current.destination);
                osc.start(rtTime);
                osc.stop(rtTime + 0.14);
            }
        };

        playHit();
        timerRef.current = setInterval(playHit, 750);
    };

    const handleSubmit = () => {
        if (selectedIdx === null || submitted) return;
        stopAudio();
        const ok = selectedIdx === correctIndex;
        setIsCorrect(ok);
        setSubmitted(true);
        if (onResult) onResult(ok, { selectedIdx, mode });
    };

    const spl = distance === 1 ? 80 : distance === 2 ? 74 : 68;

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
                        {mode === 'inverse-square' && <Radio size={17} />}
                        {mode === 'flutter-echo' && <Hand size={17} />}
                        {mode === 'absorption-diffusion' && <Waves size={17} />}
                        <span>
                            {mode === 'inverse-square' && 'ACOUSTICS LAB: INVERSE SQUARE LAW (MIC DISTANCE)'}
                            {mode === 'flutter-echo' && 'ACOUSTICS LAB: ROOM CLAP & FLUTTER ECHO'}
                            {mode === 'absorption-diffusion' && 'ACOUSTICS LAB: ABSORPTION VS DIFFUSION'}
                        </span>
                    </div>

                    {mode === 'absorption-diffusion' && (
                        <button
                            type="button"
                            onClick={toggleRoomLoop}
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
                            {isPlaying ? 'Stop Room Test' : 'Play Room Test'}
                        </button>
                    )}
                </div>

                {mode === 'inverse-square' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {[
                                { d: 1, label: '1m (Close)' },
                                { d: 2, label: '2m (Double)' },
                                { d: 4, label: '4m (Far)' }
                            ].map((item) => (
                                <button
                                    key={item.d}
                                    type="button"
                                    onClick={() => playDistancePing(item.d)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        border: `2px solid ${distance === item.d ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`,
                                        background: distance === item.d ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.03)',
                                        color: '#f8fafc',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                    }}
                                >
                                    🔊 {item.label}
                                </button>
                            ))}
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.28)', padding: '12px 14px', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                                <span>Mic Distance: <strong>{distance}m</strong></span>
                                <span style={{ color: '#38bdf8', fontWeight: 700 }}>SPL Meter: {spl} dB SPL</span>
                            </div>
                            <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${distance === 1 ? 95 : distance === 2 ? 60 : 32}%`,
                                    height: '100%',
                                    background: '#38bdf8',
                                    transition: 'width 180ms ease'
                                }} />
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'flutter-echo' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => { setTreated(false); triggerClap(false); }}
                                style={{
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: `2px solid ${!treated ? '#f59e0b' : 'rgba(255,255,255,0.12)'}`,
                                    background: !treated ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                👏 Clap: Bare Parallel Walls
                            </button>
                            <button
                                type="button"
                                onClick={() => { setTreated(true); triggerClap(true); }}
                                style={{
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: `2px solid ${treated ? '#10b981' : 'rgba(255,255,255,0.12)'}`,
                                    background: treated ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                👏 Clap: Absorbers on Walls
                            </button>
                        </div>
                    </div>
                )}

                {mode === 'absorption-diffusion' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
                        {[
                            { id: 'untreated', label: '1. Untreated (Boomy + Slap)' },
                            { id: 'foam', label: '2. Thin Foam (Dead Top, Boomy)' },
                            { id: 'diffuser', label: '3. Bass Traps + Diffusers' }
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                type="button"
                                onClick={() => setRoomType(btn.id)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: `2px solid ${roomType === btn.id ? '#38bdf8' : 'rgba(255,255,255,0.12)'}`,
                                    background: roomType === btn.id ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.03)',
                                    color: '#f8fafc',
                                    fontWeight: 600,
                                    fontSize: '0.84rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <Volume2 size={14} />
                    <span>
                        {mode === 'inverse-square' && 'Click 1m, 2m, and 4m to hear the sound drop and watch the SPL meter.'}
                        {mode === 'flutter-echo' && 'Click both Clap buttons to compare bare parallel walls vs wall absorption.'}
                        {mode === 'absorption-diffusion' && 'Press Play and compare Thin Foam (absorbs highs only) vs Bass Traps + Diffusers.'}
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
