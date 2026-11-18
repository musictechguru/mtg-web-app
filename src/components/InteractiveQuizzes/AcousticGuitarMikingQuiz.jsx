import React, { useState } from 'react';
import { Mic, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

const POSITIONS = [
    { id: 'headstock', label: 'Headstock', x: 96 },
    { id: '12th_fret', label: '12th Fret', x: 245 },
    { id: 'soundhole', label: 'Sound Hole', x: 356 },
    { id: 'bridge', label: 'Bridge', x: 438 },
];

/**
 * Interactive Acoustic Guitar Miking Lab (Edexcel 9MT0).
 * Students position a condenser microphone along an acoustic guitar
 * and set distance (cm) to find the balanced 12th-fret sweet spot.
 */
export default function AcousticGuitarMikingQuiz({ onResult }) {
    const [positionId, setPositionId] = useState('soundhole');
    const [distanceCm, setDistanceCm] = useState(10);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [wasRevealed, setWasRevealed] = useState(false);

    const isSweetSpot = positionId === '12th_fret';
    const isGoodDistance = distanceCm >= 15 && distanceCm <= 30;
    const isCorrect = isSweetSpot && isGoodDistance;

    const handleCheck = () => {
        setIsSubmitted(true);
        setWasRevealed(false);
        if (onResult) {
            onResult(isCorrect);
        }
    };

    const handleDontKnow = () => {
        setPositionId('12th_fret');
        setDistanceCm(20);
        setIsSubmitted(true);
        setWasRevealed(true);
        if (onResult) {
            onResult(false);
        }
    };

    const activePos = POSITIONS.find((p) => p.id === positionId) || POSITIONS[2];
    // Vertical mic distance above guitar (closer = lower y closer to strings y=110)
    const micY = 148 + ((distanceCm - 5) / 45) * 46;

    const getFeedbackText = () => {
        if (wasRevealed) {
            return 'Answer Revealed: Aim a condenser mic at the 12th fret (neck/body join) from 15–30 cm away for a balanced acoustic tone.';
        }
        if (isCorrect) {
            return `Spot on! Aiming a condenser mic at the 12th fret from ${distanceCm} cm captures crisp string detail and warm body without boomy bass.`;
        }
        if (positionId === 'soundhole') {
            return 'Over the sound hole picks up too much boomy, muddy bass! Move the microphone to the 12th fret.';
        }
        if (positionId === 'bridge') {
            return 'Right over the bridge sounds overly bright and sharp with less body warmth — try the 12th fret starting spot.';
        }
        if (positionId === 'headstock') {
            return 'Up by the headstock only picks up faint string clicks and lacks body resonance — move down to the 12th fret.';
        }
        if (distanceCm < 15) {
            return `Great 12th fret position, but at ${distanceCm} cm it is too close (heavy proximity bass)! Pull back to 15–30 cm.`;
        }
        return `Great 12th fret position, but at ${distanceCm} cm it picks up too much room echo — bring it into 15–30 cm.`;
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
            {/* Acoustic Guitar + Movable Condenser Mic SVG */}
            <div
                style={{
                    background: 'rgba(2, 6, 23, 0.75)',
                    borderRadius: '10px',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    padding: '14px',
                    marginBottom: '18px',
                }}
            >
                <svg viewBox="0 0 540 230" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    {/* Acoustic Guitar Silhouette (Horizontal) */}
                    {/* Body */}
                    <path
                        d="M 275 68 C 300 44, 345 48, 365 68 C 382 82, 412 50, 455 56 C 492 62, 505 90, 505 110 C 505 130, 492 158, 455 164 C 412 170, 382 138, 365 152 C 345 172, 300 176, 275 152 Z"
                        fill="#78350f"
                        stroke="#d97706"
                        strokeWidth="2"
                    />
                    {/* Neck */}
                    <rect x="118" y="96" width="164" height="28" rx="3" fill="#451a03" stroke="#92400e" strokeWidth="1.5" />
                    {/* Headstock */}
                    <rect x="64" y="91" width="54" height="38" rx="6" fill="#292524" stroke="#78716c" strokeWidth="1.5" />
                    {/* Sound Hole */}
                    <circle cx="356" cy="110" r="24" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                    {/* 12th Fret Marker (Double Dots) */}
                    <line x1="245" y1="96" x2="245" y2="124" stroke="#cbd5e1" strokeWidth="1.5" />
                    <circle cx="245" cy="105" r="2" fill="#e2e8f0" />
                    <circle cx="245" cy="115" r="2" fill="#e2e8f0" />
                    {/* Bridge */}
                    <rect x="430" y="90" width="14" height="40" rx="3" fill="#1c1917" stroke="#a8a29e" strokeWidth="1.2" />
                    {/* Strings */}
                    {[99, 103, 108, 112, 117, 121].map((sy) => (
                        <line key={sy} x1="88" y1={sy} x2="437" y2={sy} stroke="rgba(226, 232, 240, 0.55)" strokeWidth="0.9" />
                    ))}

                    {/* Subtle Zone Markers */}
                    {POSITIONS.map((p) => (
                        <g key={p.id}>
                            <circle
                                cx={p.x}
                                cy="110"
                                r="12"
                                fill={positionId === p.id ? 'rgba(56, 189, 248, 0.22)' : 'transparent'}
                                stroke={
                                    positionId === p.id
                                        ? isSubmitted
                                            ? isCorrect
                                                ? '#10b981'
                                                : '#ef4444'
                                            : '#38bdf8'
                                        : 'rgba(255,255,255,0.28)'
                                }
                                strokeWidth="1.8"
                                strokeDasharray={positionId === p.id ? 'none' : '3 3'}
                            />
                            <text x={p.x} y="34" textAnchor="middle" fill={positionId === p.id ? '#7dd3fc' : '#94a3b8'} fontSize="10" fontWeight="700">
                                {p.label}
                            </text>
                        </g>
                    ))}

                    {/* Movable Condenser Mic pointing UP at selected guitar spot */}
                    <g transform={`translate(${activePos.x}, ${micY})`}>
                        <line
                            x1="0"
                            y1="-14"
                            x2="0"
                            y2={122 - micY}
                            stroke={isSubmitted ? (isCorrect ? '#10b981' : '#ef4444') : '#38bdf8'}
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                        />
                        <rect x="-5" y="0" width="10" height="24" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.2" />
                        <circle
                            cx="0"
                            cy="-4"
                            r="8"
                            fill={isSubmitted ? (isCorrect ? '#10b981' : '#ef4444') : '#0ea5e9'}
                            stroke="#f8fafc"
                            strokeWidth="1.8"
                        />
                        <rect x="-22" y="28" width="44" height="17" rx="6" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.45)" />
                        <text x="0" y="40" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="700">
                            {distanceCm} cm
                        </text>
                    </g>
                </svg>
            </div>

            {/* Control 1: Mic Target Along Guitar */}
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
                    1. Where do you aim the condenser mic?
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {POSITIONS.map((pos) => (
                        <button
                            key={pos.id}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => setPositionId(pos.id)}
                            style={{
                                flex: 1,
                                minWidth: '100px',
                                padding: '9px 10px',
                                borderRadius: '8px',
                                border: `1px solid ${positionId === pos.id ? '#fbbf24' : 'rgba(255,255,255,0.16)'}`,
                                background: positionId === pos.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(15, 23, 42, 0.8)',
                                color: positionId === pos.id ? '#fde68a' : '#cbd5e1',
                                fontWeight: '700',
                                fontSize: '0.88rem',
                                cursor: isSubmitted ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {pos.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Control 2: Distance */}
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
                        2. Mic Distance: <strong style={{ color: '#38bdf8' }}>{distanceCm} cm</strong>
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {[5, 20, 45].map((val) => (
                            <button
                                key={val}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() => setDistanceCm(val)}
                                style={{
                                    padding: '4px 9px',
                                    borderRadius: '6px',
                                    border: `1px solid ${distanceCm === val ? '#38bdf8' : 'rgba(255,255,255,0.16)'}`,
                                    background: distanceCm === val ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.8)',
                                    color: distanceCm === val ? '#bae6fd' : '#cbd5e1',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    cursor: isSubmitted ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {val} cm
                            </button>
                        ))}
                    </div>
                </div>
                <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={distanceCm}
                    disabled={isSubmitted}
                    onChange={(e) => setDistanceCm(Number(e.target.value))}
                    aria-label="Microphone distance from acoustic guitar in centimetres"
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
                        Check Guitar Miking
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
