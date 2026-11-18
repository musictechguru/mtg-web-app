import React, { useState } from 'react';
import { Mic, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

/**
 * Interactive Classical Grand Piano Miking Lab (Edexcel 9MT0).
 * Students choose the grand piano lid height and stereo pair distance
 * to achieve a natural, balanced classical blend.
 */
export default function GrandPianoMikingQuiz({ onResult }) {
    const [lidState, setLidState] = useState('closed'); // 'closed' | 'half' | 'full'
    const [distanceM, setDistanceM] = useState(0.2);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [wasRevealed, setWasRevealed] = useState(false);

    const isLidOpen = lidState === 'full';
    const isGoodDistance = distanceM >= 1.0 && distanceM <= 2.5;
    const isCorrect = isLidOpen && isGoodDistance;

    const handleCheck = () => {
        setIsSubmitted(true);
        setWasRevealed(false);
        if (onResult) {
            onResult(isCorrect);
        }
    };

    const handleDontKnow = () => {
        setLidState('full');
        setDistanceM(1.5);
        setIsSubmitted(true);
        setWasRevealed(true);
        if (onResult) {
            onResult(false);
        }
    };

    // SVG layout: piano body on left (x=45..220), stereo pair moves x=238..470
    const micX = 238 + ((distanceM - 0.2) / 2.8) * 222;
    const lidAngle = lidState === 'closed' ? 0 : lidState === 'half' ? -18 : -36;

    const getFeedbackText = () => {
        if (wasRevealed) {
            return 'Answer Revealed: Open the lid on Full Stick and place a stereo condenser pair 1.0–2.5 m away so the strings, soundboard, and room reverb blend naturally.';
        }
        if (isCorrect) {
            return `Spot on! With the lid on Full Stick and the stereo pair ${distanceM.toFixed(1)} m away, the strings, soundboard, and concert hall ambience blend cleanly.`;
        }
        if (!isLidOpen && !isGoodDistance) {
            return `The lid is ${lidState === 'closed' ? 'closed' : 'half-open'} and the mics are ${distanceM.toFixed(1)} m away. Prop the lid on Full Stick and place the stereo pair 1.0–2.5 m back.`;
        }
        if (!isLidOpen) {
            return `Good distance (${distanceM.toFixed(1)} m), but the lid is ${lidState === 'closed' ? 'closed' : 'only on Half Stick'}! Open it on Full Stick so the soundboard projects freely.`;
        }
        if (distanceM < 1.0) {
            return `Great Full Stick lid, but ${distanceM.toFixed(1)} m is too close to the hammers! Pull the stereo pair back to 1.0–2.5 m for a natural classical blend.`;
        }
        return `Great Full Stick lid, but ${distanceM.toFixed(1)} m picks up too much distant room echo. Bring the stereo pair closer (1.0–2.5 m).`;
    };

    return (
        <div
            style={{
                background: 'rgba(15, 23, 42, 0.72)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '20px',
            }}
        >
            {/* Side-View Grand Piano & Stereo Pair SVG */}
            <div
                style={{
                    background: 'rgba(2, 6, 23, 0.75)',
                    borderRadius: '10px',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    padding: '14px',
                    marginBottom: '18px',
                }}
            >
                <svg viewBox="0 0 540 220" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    {/* Studio floor */}
                    <line x1="25" y1="184" x2="515" y2="184" stroke="rgba(148,163,184,0.28)" strokeWidth="2" />

                    {/* Grand Piano Legs */}
                    <rect x="64" y="136" width="8" height="48" fill="#475569" />
                    <rect x="192" y="136" width="8" height="48" fill="#475569" />

                    {/* Grand Piano Rim / Body */}
                    <rect x="52" y="114" width="160" height="26" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                    <text x="132" y="131" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="700">
                        Grand Piano
                    </text>

                    {/* Animated Piano Lid hinged on left (x=54, y=114) */}
                    <g transform={`translate(54, 114) rotate(${lidAngle})`}>
                        <rect x="0" y="-7" width="158" height="7" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                    </g>

                    {/* Prop Stick when half or full */}
                    {lidState !== 'closed' && (
                        <line
                            x1="196"
                            y1="114"
                            x2={lidState === 'full' ? '182' : '194'}
                            y2={lidState === 'full' ? '32' : '68'}
                            stroke="#fbbf24"
                            strokeWidth="2.5"
                        />
                    )}

                    {/* Sound projection waves when lid is open */}
                    {lidState === 'full' && (
                        <g opacity="0.55">
                            <path d="M 212 96 Q 230 78 216 56" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
                            <path d="M 224 102 Q 246 78 228 48" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" />
                        </g>
                    )}

                    {/* Distance Bracket from Piano Rim (212) to Mic Stand */}
                    <line
                        x1="215"
                        y1="154"
                        x2={micX - 10}
                        y2="154"
                        stroke={isSubmitted ? (isCorrect ? '#10b981' : '#ef4444') : '#38bdf8'}
                        strokeWidth="2"
                        strokeDasharray="4 3"
                    />
                    <rect
                        x={(215 + micX) / 2 - 28}
                        y="160"
                        width="56"
                        height="20"
                        rx="6"
                        fill="rgba(15, 23, 42, 0.9)"
                        stroke="rgba(56, 189, 248, 0.5)"
                    />
                    <text x={(215 + micX) / 2} y="174" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="700">
                        {distanceM.toFixed(1)} m
                    </text>

                    {/* Stereo Condenser Pair on Stand */}
                    <g transform={`translate(${micX}, 100)`}>
                        <line x1="0" y1="0" x2="0" y2="84" stroke="#94a3b8" strokeWidth="3" />
                        <line x1="-14" y1="84" x2="14" y2="84" stroke="#94a3b8" strokeWidth="3" />
                        {/* Dual Stereo Bar capsules */}
                        <circle cx="-5" cy="-6" r="7" fill="#0ea5e9" stroke="#e0f2fe" strokeWidth="1.8" />
                        <circle cx="5" cy="4" r="7" fill="#a855f7" stroke="#f3e8ff" strokeWidth="1.8" />
                        <text x="0" y="-20" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="700">
                            Stereo Pair
                        </text>
                    </g>

                    {/* Live Badges */}
                    <rect x="20" y="16" width="142" height="24" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.16)" />
                    <text x="91" y="32" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">
                        Lid: {lidState === 'closed' ? 'Closed' : lidState === 'half' ? 'Half Stick' : 'Full Stick'}
                    </text>

                    <rect x="386" y="16" width="134" height="24" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.16)" />
                    <text x="453" y="32" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">
                        Distance: {distanceM.toFixed(1)} m
                    </text>
                </svg>
            </div>

            {/* Control 1: Piano Lid Position */}
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.85)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <div style={{ fontWeight: '700', color: '#e2e8f0', marginBottom: '10px' }}>
                    1. Piano Lid Position
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                        { id: 'closed', label: 'Closed' },
                        { id: 'half', label: 'Half Stick' },
                        { id: 'full', label: 'Full Stick (Open)' },
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => setLidState(opt.id)}
                            style={{
                                flex: 1,
                                minWidth: '110px',
                                padding: '9px 12px',
                                borderRadius: '8px',
                                border: `1px solid ${lidState === opt.id ? '#fbbf24' : 'rgba(255,255,255,0.16)'}`,
                                background: lidState === opt.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(15, 23, 42, 0.8)',
                                color: lidState === opt.id ? '#fde68a' : '#cbd5e1',
                                fontWeight: '700',
                                fontSize: '0.9rem',
                                cursor: isSubmitted ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Control 2: Stereo Pair Distance */}
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.85)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontWeight: '700', color: '#e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Mic size={16} color="#38bdf8" />
                        2. Stereo Pair Distance: <strong style={{ color: '#38bdf8' }}>{distanceM.toFixed(1)} m</strong>
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {[0.2, 0.8, 1.5, 2.8].map((val) => (
                            <button
                                key={val}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() => setDistanceM(val)}
                                style={{
                                    padding: '4px 9px',
                                    borderRadius: '6px',
                                    border: `1px solid ${Math.abs(distanceM - val) < 0.05 ? '#38bdf8' : 'rgba(255,255,255,0.16)'}`,
                                    background: Math.abs(distanceM - val) < 0.05 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.8)',
                                    color: Math.abs(distanceM - val) < 0.05 ? '#bae6fd' : '#cbd5e1',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    cursor: isSubmitted ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {val} m
                            </button>
                        ))}
                    </div>
                </div>
                <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.2"
                    value={distanceM}
                    disabled={isSubmitted}
                    onChange={(e) => setDistanceM(Number(e.target.value))}
                    aria-label="Stereo pair distance from grand piano in metres"
                    style={{ width: '100%', accentColor: '#38bdf8', cursor: isSubmitted ? 'not-allowed' : 'pointer' }}
                />
            </div>

            {/* Action Buttons */}
            {!isSubmitted && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={handleDontKnow}
                        style={{
                            padding: '12px 18px',
                            borderRadius: '8px',
                            border: '1px dashed rgba(168, 85, 247, 0.65)',
                            background: 'rgba(168, 85, 247, 0.1)',
                            color: '#e2e8f0',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <HelpCircle size={17} style={{ color: '#c084fc' }} />
                        I&apos;m Not Sure
                    </button>
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={handleCheck}
                        style={{ flex: 1 }}
                    >
                        Check Piano Setup
                    </button>
                </div>
            )}

            {/* Feedback Banner */}
            {isSubmitted && (
                <div
                    style={{
                        marginTop: '12px',
                        padding: '14px 16px',
                        borderRadius: '8px',
                        background: isCorrect && !wasRevealed ? 'rgba(16, 185, 129, 0.16)' : 'rgba(239, 68, 68, 0.16)',
                        border: `1px solid ${isCorrect && !wasRevealed ? '#10b981' : '#ef4444'}`,
                        color: isCorrect && !wasRevealed ? '#6ee7b7' : '#fca5a5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: '600',
                    }}
                >
                    {isCorrect && !wasRevealed ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    <span>{getFeedbackText()}</span>
                </div>
            )}
        </div>
    );
}
