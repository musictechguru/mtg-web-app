import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Square, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PhasePolarityAudioQuiz({ onResult }) {
    const [bottomInverted, setBottomInverted] = useState(false); // false = out of phase (default problem), true = Ø engaged (fixed)
    const [isPlaying, setIsPlaying] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isUnsure, setIsUnsure] = useState(false);

    const audioCtxRef = useRef(null);
    const loopTimerRef = useRef(null);
    const invertedRef = useRef(bottomInverted);

    useEffect(() => {
        invertedRef.current = bottomInverted;
    }, [bottomInverted]);

    useEffect(() => {
        return () => {
            if (loopTimerRef.current) clearInterval(loopTimerRef.current);
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                audioCtxRef.current.close().catch(() => {});
            }
        };
    }, []);

    const getAudioCtx = async () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new Ctx();
        }
        if (audioCtxRef.current.state === 'suspended') {
            await audioCtxRef.current.resume().catch(() => {});
        }
        return audioCtxRef.current;
    };

    const triggerSnareHit = async () => {
        try {
            const ctx = await getAudioCtx();
            const now = ctx.currentTime;

            // 1. Snare body (185 Hz -> 115 Hz)
            const bodyOsc = ctx.createOscillator();
            bodyOsc.type = 'triangle';
            bodyOsc.frequency.setValueAtTime(185, now);
            bodyOsc.frequency.exponentialRampToValueAtTime(115, now + 0.09);

            const bodyEnv = ctx.createGain();
            bodyEnv.gain.setValueAtTime(0.001, now);
            bodyEnv.gain.linearRampToValueAtTime(0.7, now + 0.003);
            bodyEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
            bodyOsc.connect(bodyEnv);

            // Top mic path (+1 polarity)
            const topGain = ctx.createGain();
            topGain.gain.setValueAtTime(0.65, now);
            bodyEnv.connect(topGain);
            topGain.connect(ctx.destination);

            // Bottom mic path (physically 180 deg inverted relative to top head -> -0.62 when switch OFF, +0.62 when Ø ON)
            const bottomDelay = ctx.createDelay();
            bottomDelay.delayTime.setValueAtTime(0.0004, now);
            const bottomPolarityGain = ctx.createGain();
            bottomPolarityGain.gain.setValueAtTime(invertedRef.current ? 0.62 : -0.62, now);
            bodyEnv.connect(bottomDelay);
            bottomDelay.connect(bottomPolarityGain);
            bottomPolarityGain.connect(ctx.destination);

            // 2. Snare wires noise burst (less affected by polarity, adds realism)
            const bufferSize = Math.floor(ctx.sampleRate * 0.18);
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = noiseBuffer;

            const hpf = ctx.createBiquadFilter();
            hpf.type = 'highpass';
            hpf.frequency.setValueAtTime(1800, now);

            const noiseEnv = ctx.createGain();
            noiseEnv.gain.setValueAtTime(0.28, now);
            noiseEnv.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

            noise.connect(hpf);
            hpf.connect(noiseEnv);
            noiseEnv.connect(ctx.destination);

            bodyOsc.start(now);
            bodyOsc.stop(now + 0.18);
            noise.start(now);
            noise.stop(now + 0.18);
        } catch (e) {
            console.warn('Web Audio snare hit failed:', e);
        }
    };

    const togglePlayLoop = () => {
        if (isPlaying) {
            if (loopTimerRef.current) clearInterval(loopTimerRef.current);
            loopTimerRef.current = null;
            setIsPlaying(false);
        } else {
            triggerSnareHit();
            loopTimerRef.current = setInterval(triggerSnareHit, 950);
            setIsPlaying(true);
        }
    };

    const handleCheck = () => {
        if (submitted) return;
        const pass = bottomInverted === true;
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

    // Build SVG sine-decay snare waveform paths
    const buildWavePath = (yOffset, amplitude, phaseSign) => {
        const pts = [];
        for (let i = 0; i <= 80; i++) {
            const x = 40 + (i / 80) * 380;
            const env = Math.exp(-i / 22);
            const y = yOffset - Math.sin((i / 80) * Math.PI * 6) * amplitude * env * phaseSign;
            pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
        }
        return pts.join(' ');
    };

    const topWave = buildWavePath(45, 24, 1);
    const bottomWave = buildWavePath(105, 22, bottomInverted ? 1 : -1);
    const sumAmp = bottomInverted ? 32 : 4;
    const sumWave = buildWavePath(168, sumAmp, 1);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Audio Test Controls */}
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
                    <span><strong>Audio Test:</strong> Listen to the snare sum as you toggle Polarity (Ø).</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        type="button"
                        onClick={togglePlayLoop}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '7px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isPlaying ? '#ef4444' : '#0284c7',
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: '0.84rem',
                            cursor: 'pointer'
                        }}
                    >
                        {isPlaying ? <Square size={14} /> : <Play size={14} />}
                        {isPlaying ? 'Stop Loop' : 'Play Snare Loop'}
                    </button>
                    <button
                        type="button"
                        onClick={triggerSnareHit}
                        style={{
                            padding: '7px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(148, 163, 184, 0.35)',
                            background: 'rgba(255,255,255,0.06)',
                            color: '#f8fafc',
                            fontWeight: '600',
                            fontSize: '0.84rem',
                            cursor: 'pointer'
                        }}
                    >
                        Hit Once
                    </button>
                </div>
            </div>

            {/* Waveform Visualizer SVG */}
            <div style={{
                background: '#0b1120',
                borderRadius: '12px',
                border: '1px solid #1e293b',
                padding: '12px'
            }}>
                <svg viewBox="0 0 440 205" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    {/* Zero lines */}
                    <line x1="40" y1="45" x2="420" y2="45" stroke="#1e293b" strokeWidth="1" />
                    <line x1="40" y1="105" x2="420" y2="105" stroke="#1e293b" strokeWidth="1" />
                    <line x1="40" y1="168" x2="420" y2="168" stroke="#1e293b" strokeWidth="1" />

                    {/* Labels */}
                    <text x="8" y="49" fill="#38bdf8" fontSize="10" fontWeight="700">TOP</text>
                    <text x="8" y="109" fill="#f59e0b" fontSize="10" fontWeight="700">BTM</text>
                    <text x="8" y="172" fill={bottomInverted ? '#22c55e' : '#ef4444'} fontSize="10" fontWeight="700">SUM</text>

                    {/* Waveforms */}
                    <path d={topWave} fill="none" stroke="#38bdf8" strokeWidth="2.2" />
                    <path d={bottomWave} fill="none" stroke="#f59e0b" strokeWidth="2.2" />
                    <path d={sumWave} fill="none" stroke={bottomInverted ? '#22c55e' : '#ef4444'} strokeWidth="2.8" />

                    {/* Status pill */}
                    <rect
                        x="265"
                        y="138"
                        width="155"
                        height="22"
                        rx="6"
                        fill={bottomInverted ? 'rgba(34, 197, 94, 0.16)' : 'rgba(239, 68, 68, 0.16)'}
                        stroke={bottomInverted ? '#22c55e' : '#ef4444'}
                        strokeWidth="1"
                    />
                    <text
                        x="342"
                        y="153"
                        textAnchor="middle"
                        fill={bottomInverted ? '#4ade80' : '#fca5a5'}
                        fontSize="10"
                        fontWeight="700"
                    >
                        {bottomInverted ? 'IN PHASE (PUNCHY SUM)' : '180° CANCELLED (THIN)'}
                    </text>
                </svg>
            </div>

            {/* Polarity Switch Control */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(148, 163, 184, 0.25)'
            }}>
                <div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#f8fafc' }}>
                        Snare Bottom Mic — Polarity Invert (Ø)
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                        {bottomInverted ? 'Polarity Inverted (180° flipped back in phase)' : 'Normal Polarity (180° out of phase with Top Mic)'}
                    </div>
                </div>
                <button
                    type="button"
                    disabled={submitted}
                    onClick={() => setBottomInverted(prev => !prev)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: bottomInverted ? '1px solid #f59e0b' : '1px solid #475569',
                        background: bottomInverted ? '#f59e0b' : '#1e293b',
                        color: bottomInverted ? '#0f172a' : '#e2e8f0',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        cursor: submitted ? 'not-allowed' : 'pointer',
                        minWidth: '88px'
                    }}
                >
                    Ø {bottomInverted ? 'ON' : 'OFF'}
                </button>
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
                        Check Phase Alignment
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
                            ? 'Spot on! Engaging Ø on the bottom snare mic aligns both waveforms so the punchy low-end sums cleanly.'
                            : isUnsure
                                ? 'Review the diagram: engaging Ø on the bottom snare mic flips its 180° inverted waveform back in phase.'
                                : 'Not quite — with Ø OFF, the top and bottom mics are 180° out of phase and cancel each other out. Engage Ø on the bottom mic!'}
                    </span>
                </div>
            )}
        </div>
    );
}
