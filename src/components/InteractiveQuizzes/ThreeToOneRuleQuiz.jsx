import React, { useState } from 'react';
import { Mic, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

/**
 * Interactive 3:1 Microphone Distance Rule Practical.
 * Students adjust the spacing between Mic 1 and Mic 2 on a studio floor
 * to avoid phase cancellation and comb filtering.
 */
export default function ThreeToOneRuleQuiz({ question, onResult }) {
    const sourceDistanceCm = question?.sourceDistanceCm || 20;
    const minRequiredCm = sourceDistanceCm * 3; // 60 cm
    const minSliderCm = question?.minCm || 10;
    const maxSliderCm = question?.maxCm || 100;
    const initialDistanceCm = question?.initialCm || 25;

    const [micSpacingCm, setMicSpacingCm] = useState(initialDistanceCm);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [wasRevealed, setWasRevealed] = useState(false);

    const isRuleMet = micSpacingCm >= minRequiredCm;
    const ratio = (micSpacingCm / sourceDistanceCm).toFixed(2).replace(/\.00$/, '');

    const handleCheck = () => {
        setIsSubmitted(true);
        setWasRevealed(false);
        if (onResult) {
            onResult(isRuleMet);
        }
    };

    const handleDontKnow = () => {
        setMicSpacingCm(minRequiredCm);
        setIsSubmitted(true);
        setWasRevealed(true);
        if (onResult) {
            onResult(false);
        }
    };

    // Position percentages across the SVG stage (x=18% is Mic 1, Mic 2 scales from 28% to 88%)
    const mic1X = 110;
    const mic2X = 155 + ((micSpacingCm - minSliderCm) / (maxSliderCm - minSliderCm)) * 315;
    const thresholdX = 155 + ((minRequiredCm - minSliderCm) / (maxSliderCm - minSliderCm)) * 315;

    return (
        <div
            style={{
                background: 'rgba(15, 23, 42, 0.72)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '20px',
            }}
        >
            {/* Visual Studio Floor Diagram */}
            <div
                style={{
                    background: 'rgba(2, 6, 23, 0.7)',
                    borderRadius: '10px',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    padding: '14px',
                    marginBottom: '18px',
                }}
            >
                <svg viewBox="0 0 540 210" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    {/* Studio floor grid */}
                    <line x1="30" y1="168" x2="510" y2="168" stroke="rgba(148,163,184,0.28)" strokeWidth="2" />

                    {/* Safe zone shading ONLY revealed after submission */}
                    {isSubmitted && (
                        <>
                            <rect
                                x={thresholdX}
                                y="28"
                                width={500 - thresholdX}
                                height="140"
                                rx="8"
                                fill="rgba(16, 185, 129, 0.12)"
                                stroke="rgba(16, 185, 129, 0.45)"
                                strokeDasharray="5 4"
                            />
                            <text
                                x={thresholdX + (500 - thresholdX) / 2}
                                y="46"
                                textAnchor="middle"
                                fill="#6ee7b7"
                                fontSize="11"
                                fontWeight="700"
                            >
                                SAFE ZONE (&ge; {minRequiredCm} cm)
                            </text>
                        </>
                    )}

                    {/* Source 1: Singer */}
                    <circle cx="52" cy="110" r="22" fill="rgba(59, 130, 246, 0.18)" stroke="#60a5fa" strokeWidth="2" />
                    <text x="52" y="108" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="700">
                        Singer
                    </text>
                    <text x="52" y="122" textAnchor="middle" fill="#93c5fd" fontSize="10">
                        Source 1
                    </text>

                    {/* d1 Bracket: Source 1 -> Mic 1 */}
                    <line x1="74" y1="110" x2={mic1X - 10} y2="110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                    <rect x="64" y="64" width="54" height="22" rx="6" fill="rgba(14, 165, 233, 0.2)" stroke="#38bdf8" />
                    <text x="91" y="79" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="700">
                        {sourceDistanceCm} cm
                    </text>

                    {/* Mic 1 */}
                    <g transform={`translate(${mic1X}, 110)`}>
                        <line x1="0" y1="12" x2="0" y2="58" stroke="#94a3b8" strokeWidth="3" />
                        <circle cx="0" cy="0" r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                        <text x="0" y="4" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="800">
                            M1
                        </text>
                        <text x="0" y="74" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">
                            Mic 1
                        </text>
                    </g>

                    {/* Dynamic Distance Bracket between Mic 1 & Mic 2 */}
                    <line
                        x1={mic1X + 16}
                        y1="110"
                        x2={mic2X - 16}
                        y2="110"
                        stroke={isSubmitted ? (isRuleMet ? '#10b981' : '#ef4444') : '#fbbf24'}
                        strokeWidth="2.5"
                    />
                    <rect
                        x={(mic1X + mic2X) / 2 - 48}
                        y="82"
                        width="96"
                        height="24"
                        rx="12"
                        fill={isSubmitted ? (isRuleMet ? 'rgba(16,185,129,0.22)' : 'rgba(239,68,68,0.22)') : 'rgba(245,158,11,0.2)'}
                        stroke={isSubmitted ? (isRuleMet ? '#10b981' : '#ef4444') : '#fbbf24'}
                    />
                    <text
                        x={(mic1X + mic2X) / 2}
                        y="98"
                        textAnchor="middle"
                        fill={isSubmitted ? (isRuleMet ? '#6ee7b7' : '#fca5a5') : '#fde68a'}
                        fontSize="12"
                        fontWeight="800"
                    >
                        {micSpacingCm} cm
                    </text>

                    {/* Mic 2 + Source 2 */}
                    <g transform={`translate(${mic2X}, 110)`}>
                        <line x1="0" y1="12" x2="0" y2="58" stroke="#94a3b8" strokeWidth="3" />
                        <circle
                            cx="0"
                            cy="0"
                            r="15"
                            fill="#1e293b"
                            stroke={isSubmitted ? (isRuleMet ? '#10b981' : '#ef4444') : '#fbbf24'}
                            strokeWidth="2.5"
                        />
                        <text x="0" y="4" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="800">
                            M2
                        </text>
                        <text x="0" y="74" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="700">
                            Mic 2
                        </text>
                    </g>
                </svg>
            </div>

            {/* Live Distance Readout + Controls */}
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.85)',
                    borderRadius: '10px',
                    padding: '16px',
                    marginBottom: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '12px',
                    }}
                >
                    <span style={{ fontWeight: '700', color: '#e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Mic size={16} color="#60a5fa" />
                        Mic 1 to Mic 2 Spacing: <strong style={{ color: '#fbbf24' }}>{micSpacingCm} cm</strong>
                    </span>
                    <span style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                        Current ratio: <strong style={{ color: '#cbd5e1' }}>{ratio}&times;</strong> (Mic 1 distance: {sourceDistanceCm} cm)
                    </span>
                </div>

                <input
                    type="range"
                    min={minSliderCm}
                    max={maxSliderCm}
                    step="5"
                    value={micSpacingCm}
                    disabled={isSubmitted}
                    onChange={(e) => setMicSpacingCm(Number(e.target.value))}
                    aria-label="Distance between Mic 1 and Mic 2 in centimetres"
                    style={{ width: '100%', accentColor: '#3b82f6', cursor: isSubmitted ? 'not-allowed' : 'pointer', marginBottom: '12px' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            type="button"
                            disabled={isSubmitted || micSpacingCm <= minSliderCm}
                            onClick={() => setMicSpacingCm((prev) => Math.max(minSliderCm, prev - 5))}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.16)',
                                background: 'rgba(15, 23, 42, 0.8)',
                                color: '#e2e8f0',
                                cursor: isSubmitted ? 'not-allowed' : 'pointer',
                                fontWeight: '600',
                            }}
                        >
                            &minus;5 cm
                        </button>
                        <button
                            type="button"
                            disabled={isSubmitted || micSpacingCm >= maxSliderCm}
                            onClick={() => setMicSpacingCm((prev) => Math.min(maxSliderCm, prev + 5))}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.16)',
                                background: 'rgba(15, 23, 42, 0.8)',
                                color: '#e2e8f0',
                                cursor: isSubmitted ? 'not-allowed' : 'pointer',
                                fontWeight: '600',
                            }}
                        >
                            +5 cm
                        </button>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                        Range: {minSliderCm} cm – {maxSliderCm} cm
                    </span>
                </div>
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
                        Check 3:1 Placement
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
                        background: isRuleMet && !wasRevealed ? 'rgba(16, 185, 129, 0.16)' : 'rgba(239, 68, 68, 0.16)',
                        border: `1px solid ${isRuleMet && !wasRevealed ? '#10b981' : '#ef4444'}`,
                        color: isRuleMet && !wasRevealed ? '#6ee7b7' : '#fca5a5',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: '600',
                    }}
                >
                    {isRuleMet && !wasRevealed ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    <span>
                        {wasRevealed
                            ? `Answer Revealed: ${sourceDistanceCm} cm × 3 = ${minRequiredCm} cm minimum between Mic 1 and Mic 2.`
                            : isRuleMet
                                ? `Spot on! ${micSpacingCm} cm is at least 3× ${sourceDistanceCm} cm (${minRequiredCm} cm+), preventing phase cancellation.`
                                : `Too close (${micSpacingCm} cm)! At ${sourceDistanceCm} cm from Source 1, Mic 2 must be at least ${minRequiredCm} cm away (3 × ${sourceDistanceCm} cm).`}
                    </span>
                </div>
            )}
        </div>
    );
}
