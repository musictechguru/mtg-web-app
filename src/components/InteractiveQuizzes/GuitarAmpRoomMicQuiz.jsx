import React, { useState } from 'react';
import { Mic, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

/**
 * Interactive Guitar Amp Two-Mic (Close + Room, 3:1 Rule) Practical Lab (Edexcel 9MT0).
 * Students set the distance between a Close Mic (30 cm from the amp) and a Room Mic
 * to obey the 3:1 Distance Rule (>= 90 cm apart) and avoid phase cancellation.
 */
export default function GuitarAmpRoomMicQuiz({ question, onResult }) {
    const closeMicDistCm = question?.closeMicDistCm || 30;
    const minRequiredCm = closeMicDistCm * 3; // 90 cm
    const minSliderCm = 40;
    const maxSliderCm = 150;

    const [roomSpacingCm, setRoomSpacingCm] = useState(50);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [wasRevealed, setWasRevealed] = useState(false);

    const isRuleMet = roomSpacingCm >= minRequiredCm;
    const ratio = (roomSpacingCm / closeMicDistCm).toFixed(1).replace(/\.0$/, '');

    const handleCheck = () => {
        setIsSubmitted(true);
        setWasRevealed(false);
        if (onResult) {
            onResult(isRuleMet);
        }
    };

    const handleDontKnow = () => {
        setRoomSpacingCm(minRequiredCm);
        setIsSubmitted(true);
        setWasRevealed(true);
        if (onResult) {
            onResult(false);
        }
    };

    // SVG layout: amp x=44..122, Close Mic x=176, Room Mic x=228..488
    const closeMicX = 176;
    const roomMicX = 228 + ((roomSpacingCm - minSliderCm) / (maxSliderCm - minSliderCm)) * 260;
    const thresholdX = 228 + ((minRequiredCm - minSliderCm) / (maxSliderCm - minSliderCm)) * 260;

    return (
        <div
            style={{
                background: 'rgba(15, 23, 42, 0.72)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '20px',
            }}
        >
            {/* Studio Guitar Amp + Close Mic + Room Mic SVG */}
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

                    {/* Safe zone revealed only after submission */}
                    {isSubmitted && (
                        <>
                            <rect
                                x={thresholdX}
                                y="28"
                                width={508 - thresholdX}
                                height="156"
                                rx="8"
                                fill="rgba(16, 185, 129, 0.12)"
                                stroke="rgba(16, 185, 129, 0.45)"
                                strokeDasharray="5 4"
                            />
                            <text
                                x={thresholdX + (508 - thresholdX) / 2}
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

                    {/* Guitar Combo Amp */}
                    <rect x="40" y="92" width="84" height="92" rx="6" fill="#451a03" stroke="#d97706" strokeWidth="2" />
                    <rect x="48" y="102" width="68" height="62" rx="4" fill="#1c1917" stroke="#78716c" strokeWidth="1.2" />
                    <circle cx="82" cy="133" r="22" fill="#292524" stroke="#57534e" strokeWidth="1.5" />
                    <circle cx="82" cy="133" r="7" fill="#0f172a" />
                    <text x="82" y="84" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="700">
                        Guitar Amp
                    </text>

                    {/* Close Mic distance bracket (30 cm) */}
                    <line x1="126" y1="133" x2={closeMicX - 10} y2="133" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                    <rect x="122" y="86" width="52" height="20" rx="6" fill="rgba(14,165,233,0.2)" stroke="#38bdf8" />
                    <text x="148" y="100" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="700">
                        {closeMicDistCm} cm
                    </text>

                    {/* Close Mic (M1 - Dynamic) */}
                    <g transform={`translate(${closeMicX}, 133)`}>
                        <line x1="0" y1="10" x2="0" y2="51" stroke="#94a3b8" strokeWidth="3" />
                        <line x1="-12" y1="51" x2="12" y2="51" stroke="#94a3b8" strokeWidth="3" />
                        <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.2" />
                        <text x="0" y="4" textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="800">
                            M1
                        </text>
                        <text x="0" y="68" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600">
                            Close Mic
                        </text>
                    </g>

                    {/* Spacing bracket between Close Mic & Room Mic */}
                    <line
                        x1={closeMicX + 14}
                        y1="133"
                        x2={roomMicX - 14}
                        y2="133"
                        stroke={isSubmitted ? (isRuleMet ? '#10b981' : '#ef4444') : '#fbbf24'}
                        strokeWidth="2.5"
                    />
                    <rect
                        x={(closeMicX + roomMicX) / 2 - 44}
                        y="102"
                        width="88"
                        height="22"
                        rx="11"
                        fill={isSubmitted ? (isRuleMet ? 'rgba(16,185,129,0.22)' : 'rgba(239,68,68,0.22)') : 'rgba(245,158,11,0.2)'}
                        stroke={isSubmitted ? (isRuleMet ? '#10b981' : '#ef4444') : '#fbbf24'}
                    />
                    <text
                        x={(closeMicX + roomMicX) / 2}
                        y="117"
                        textAnchor="middle"
                        fill={isSubmitted ? (isRuleMet ? '#6ee7b7' : '#fca5a5') : '#fde68a'}
                        fontSize="11"
                        fontWeight="800"
                    >
                        {roomSpacingCm} cm
                    </text>

                    {/* Room Mic (M2 - Condenser) */}
                    <g transform={`translate(${roomMicX}, 133)`}>
                        <line x1="0" y1="10" x2="0" y2="51" stroke="#94a3b8" strokeWidth="3" />
                        <line x1="-12" y1="51" x2="12" y2="51" stroke="#94a3b8" strokeWidth="3" />
                        <circle
                            cx="0"
                            cy="0"
                            r="13"
                            fill="#1e293b"
                            stroke={isSubmitted ? (isRuleMet ? '#10b981' : '#ef4444') : '#fbbf24'}
                            strokeWidth="2.5"
                        />
                        <text x="0" y="4" textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="800">
                            M2
                        </text>
                        <text x="0" y="68" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="700">
                            Room Mic
                        </text>
                    </g>
                </svg>
            </div>

            {/* Spacing Slider & Presets */}
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.85)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontWeight: '700', color: '#e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Mic size={16} color="#fbbf24" />
                        Close Mic to Room Mic Spacing: <strong style={{ color: '#fbbf24' }}>{roomSpacingCm} cm</strong>
                    </span>
                    <span style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                        Ratio: <strong style={{ color: '#cbd5e1' }}>{ratio}&times;</strong> (Close mic distance: {closeMicDistCm} cm)
                    </span>
                </div>

                <input
                    type="range"
                    min={minSliderCm}
                    max={maxSliderCm}
                    step="10"
                    value={roomSpacingCm}
                    disabled={isSubmitted}
                    onChange={(e) => setRoomSpacingCm(Number(e.target.value))}
                    aria-label="Distance between guitar amp close mic and room mic in centimetres"
                    style={{ width: '100%', accentColor: '#fbbf24', cursor: isSubmitted ? 'not-allowed' : 'pointer', marginBottom: '10px' }}
                />

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[40, 60, 90, 120].map((val) => (
                        <button
                            key={val}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => setRoomSpacingCm(val)}
                            style={{
                                padding: '5px 10px',
                                borderRadius: '6px',
                                border: `1px solid ${roomSpacingCm === val ? '#fbbf24' : 'rgba(255,255,255,0.16)'}`,
                                background: roomSpacingCm === val ? 'rgba(251, 191, 36, 0.2)' : 'rgba(15, 23, 42, 0.8)',
                                color: roomSpacingCm === val ? '#fde68a' : '#cbd5e1',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                cursor: isSubmitted ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {val} cm
                        </button>
                    ))}
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
                        Check 3:1 Setup
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
                            ? `Answer Revealed: ${closeMicDistCm} cm × 3 = ${minRequiredCm} cm minimum between the Close Mic and Room Mic.`
                            : isRuleMet
                                ? `Spot on! ${roomSpacingCm} cm is at least 3× ${closeMicDistCm} cm (${minRequiredCm} cm+), keeping the close and room mics in phase.`
                                : `Too close (${roomSpacingCm} cm)! At ${closeMicDistCm} cm from the amp, the Room Mic needs at least ${minRequiredCm} cm spacing (3 × ${closeMicDistCm} cm).`}
                    </span>
                </div>
            )}
        </div>
    );
}
