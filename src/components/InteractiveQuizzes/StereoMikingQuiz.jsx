import React, { useState } from 'react';
import { Mic, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

/**
 * Interactive Stereo Miking Practical Lab (Edexcel 9MT0).
 * Students adjust capsule spacing (cm) and crossing angle (degrees)
 * on a top-down stereo bar to build a Coincident Pair (X-Y).
 */
export default function StereoMikingQuiz({ onResult }) {
    const [spacingCm, setSpacingCm] = useState(60);
    const [angleDeg, setAngleDeg] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [wasRevealed, setWasRevealed] = useState(false);

    const isCoincident = spacingCm === 0;
    const isCrossed90 = angleDeg === 90;
    const isCorrect = isCoincident && isCrossed90;

    const handleCheck = () => {
        setIsSubmitted(true);
        setWasRevealed(false);
        if (onResult) {
            onResult(isCorrect);
        }
    };

    const handleDontKnow = () => {
        setSpacingCm(0);
        setAngleDeg(90);
        setIsSubmitted(true);
        setWasRevealed(true);
        if (onResult) {
            onResult(false);
        }
    };

    // SVG layout: centre x=270, stereo bar y=160
    const centerX = 270;
    const micY = 148;
    const halfSpreadPx = (spacingCm / 150) * 140;
    const leftMicX = centerX - halfSpreadPx;
    const rightMicX = centerX + halfSpreadPx;
    const halfAngle = angleDeg / 2;

    const getFeedbackText = () => {
        if (wasRevealed) {
            return 'Answer Revealed: A Coincident Pair (X-Y) places two cardioid capsules together (0 cm spacing) crossed at 90°.';
        }
        if (isCorrect) {
            return 'Spot on! Both cardioid capsules sit together (0 cm) crossed at 90°, giving a clean X-Y stereo image with zero phase cancellation in mono.';
        }
        if (!isCoincident && isCrossed90) {
            return `Nice 90° angle, but your capsules are ${spacingCm} cm apart. Slide Capsule Spacing to 0 cm so they sit coincident!`;
        }
        if (isCoincident && !isCrossed90) {
            return `Great 0 cm coincident spacing, but the angle is ${angleDeg}°. Cross the two cardioid mics at 90° for X-Y!`;
        }
        return `Currently ${spacingCm} cm apart at ${angleDeg}°. For a Coincident Pair (X-Y), set Spacing to 0 cm and Angle to 90°.`;
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
            {/* Top-Down SVG Stereo Bar Stage */}
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
                    {/* Acoustic Source at Top */}
                    <ellipse
                        cx={centerX}
                        cy="36"
                        rx="96"
                        ry="18"
                        fill="rgba(59, 130, 246, 0.14)"
                        stroke="#60a5fa"
                        strokeWidth="1.5"
                    />
                    <text x={centerX} y="40" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="700">
                        Acoustic Guitar / Ensemble
                    </text>

                    {/* Stereo Bar */}
                    <rect x="95" y={micY + 26} width="350" height="8" rx="4" fill="#334155" stroke="#475569" />
                    <text x={centerX} y={micY + 52} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">
                        Top-Down Stereo Bar View
                    </text>

                    {/* Left Cardioid Mic + Pickup Cone */}
                    <g transform={`translate(${leftMicX}, ${micY}) rotate(${-halfAngle})`}>
                        <path
                            d="M 0,0 L -34,-76 A 42,42 0 0,1 34,-76 Z"
                            fill="rgba(56, 189, 248, 0.18)"
                            stroke="rgba(56, 189, 248, 0.55)"
                            strokeDasharray="4 3"
                        />
                        <rect x="-5" y="0" width="10" height="28" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.2" />
                        <circle cx="0" cy="-2" r="8" fill="#0ea5e9" stroke="#e0f2fe" strokeWidth="1.8" />
                        <text x="0" y="18" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">
                            L
                        </text>
                    </g>

                    {/* Right Cardioid Mic + Pickup Cone */}
                    <g transform={`translate(${rightMicX}, ${micY}) rotate(${halfAngle})`}>
                        <path
                            d="M 0,0 L -34,-76 A 42,42 0 0,1 34,-76 Z"
                            fill="rgba(168, 85, 247, 0.18)"
                            stroke="rgba(192, 132, 252, 0.55)"
                            strokeDasharray="4 3"
                        />
                        <rect x="-5" y="0" width="10" height="28" rx="3" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.2" />
                        <circle cx="0" cy="-2" r="8" fill="#a855f7" stroke="#f3e8ff" strokeWidth="1.8" />
                        <text x="0" y="18" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">
                            R
                        </text>
                    </g>

                    {/* Live Readout Badges */}
                    <rect x="20" y="18" width="112" height="26" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.16)" />
                    <text x="76" y="35" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">
                        Spacing: {spacingCm} cm
                    </text>

                    <rect x="408" y="18" width="112" height="26" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.16)" />
                    <text x="464" y="35" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">
                        Angle: {angleDeg}°
                    </text>
                </svg>
            </div>

            {/* Control 1: Capsule Spacing */}
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.85)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontWeight: '700', color: '#e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Mic size={16} color="#fbbf24" />
                        1. Capsule Spacing: <strong style={{ color: '#fbbf24' }}>{spacingCm} cm</strong>
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {[0, 30, 60, 120].map((val) => (
                            <button
                                key={val}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() => setSpacingCm(val)}
                                style={{
                                    padding: '4px 9px',
                                    borderRadius: '6px',
                                    border: `1px solid ${spacingCm === val ? '#fbbf24' : 'rgba(255,255,255,0.16)'}`,
                                    background: spacingCm === val ? 'rgba(251, 191, 36, 0.2)' : 'rgba(15, 23, 42, 0.8)',
                                    color: spacingCm === val ? '#fde68a' : '#cbd5e1',
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
                    min="0"
                    max="150"
                    step="10"
                    value={spacingCm}
                    disabled={isSubmitted}
                    onChange={(e) => setSpacingCm(Number(e.target.value))}
                    aria-label="Capsule spacing in centimetres"
                    style={{ width: '100%', accentColor: '#fbbf24', cursor: isSubmitted ? 'not-allowed' : 'pointer' }}
                />
            </div>

            {/* Control 2: Crossing Angle */}
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
                    <span style={{ fontWeight: '700', color: '#e2e8f0' }}>
                        2. Angle Between Mics: <strong style={{ color: '#38bdf8' }}>{angleDeg}°</strong>
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {[0, 45, 90, 120].map((val) => (
                            <button
                                key={val}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() => setAngleDeg(val)}
                                style={{
                                    padding: '4px 9px',
                                    borderRadius: '6px',
                                    border: `1px solid ${angleDeg === val ? '#38bdf8' : 'rgba(255,255,255,0.16)'}`,
                                    background: angleDeg === val ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.8)',
                                    color: angleDeg === val ? '#bae6fd' : '#cbd5e1',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    cursor: isSubmitted ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {val}°
                            </button>
                        ))}
                    </div>
                </div>
                <input
                    type="range"
                    min="0"
                    max="180"
                    step="15"
                    value={angleDeg}
                    disabled={isSubmitted}
                    onChange={(e) => setAngleDeg(Number(e.target.value))}
                    aria-label="Angle between microphones in degrees"
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
                        Check Stereo Setup
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
