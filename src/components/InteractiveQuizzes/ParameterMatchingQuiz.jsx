import React, { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { Maximize2, X } from 'lucide-react';

export default function ParameterMatchingQuiz({
    label,
    min = 20,
    max = 20000,
    step = 10,
    correctValue,
    tolerance = 100, // +/- tolerance
    imageSrc, // Spectrum or context image
    audioBeforeSrc, // "Before" state (Problem)
    audioAfterSrc, // "After" state (Fixed)
    onResult,
    onExpandImage,
    unit = 'Hz'
}) {
    // State
    const initialVal = (label && label.toLowerCase().includes('gate attack'))
        ? (correctValue >= 15 ? 2 : Math.round((min + max) / 2))
        : min;
    const [values, setValues] = useState([initialVal]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleExpandImage = () => {
        if (!imageSrc) return;
        if (onExpandImage) {
            onExpandImage({
                src: imageSrc,
                alt: label ? `${label} - Spectrum Analysis` : 'Spectrum Analysis Reference'
            });
        } else {
            setIsLocalModalOpen(true);
        }
    };

    useEffect(() => {
        if (!isLocalModalOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsLocalModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLocalModalOpen]);

    // Stop audio on question change or unmount
    useEffect(() => {
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(a => {
            if (!a.paused) {
                a.pause();
                a.currentTime = 0;
            }
        });
        return () => {
            allAudios.forEach(a => {
                if (!a.paused) {
                    a.pause();
                }
            });
        };
    }, [audioBeforeSrc, audioAfterSrc]);

    const handleAudioPlay = (e) => {
        const allAudios = document.querySelectorAll('audio');
        allAudios.forEach(a => {
            if (a !== e.target && !a.paused) {
                a.pause();
            }
        });
    };

    // Check if the user's value is within tolerance
    const checkAnswer = () => {
        setIsSubmitted(true);
        const userValue = values[0];
        const diff = Math.abs(userValue - correctValue);
        const correct = diff <= tolerance;

        setIsCorrect(correct);
        if (onResult) {
            onResult(correct);
        }
    };

    const isGateThreshold = label && label.toLowerCase().includes('gate threshold');
    const isGateAttack = label && label.toLowerCase().includes('gate attack');
    const isGateHold = label && label.toLowerCase().includes('gate hold');
    const isGateRelease = label && label.toLowerCase().includes('gate release');
    const isCompressorThreshold = label && label.toLowerCase().includes('compressor threshold');

    const dbToY = (db) => 20 + ((0 - db) / 60) * 165;
    const threshY = dbToY(values[0]);

    return (
        <div className="parameter-matching-quiz" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            <p style={{ marginTop: 0, marginBottom: '20px', color: '#94a3b8' }}>
                Adjust the fader to match the target parameter.
            </p>

            {/* Interactive Noise Gate Threshold SVG */}
            {isGateThreshold ? (
                <div style={{
                    marginBottom: '20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    background: '#090d16',
                    padding: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Live Noise Gate Threshold Visualizer
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isSubmitted ? (values[0] > -6 ? '#f87171' : values[0] < -32 ? '#fbbf24' : '#4ade80') : '#94a3b8'
                        }}>
                            {isSubmitted
                                ? (values[0] > -6 ? 'Threshold too high! Cutting off snare' : values[0] < -32 ? 'Threshold too low! Hi-hat bleed passes' : 'Clean: Bleed muted, snare passes')
                                : `Threshold: ${values[0]} dB`}
                        </span>
                    </div>
                    <svg viewBox="0 0 600 210" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        {/* Grid Lines */}
                        {[0, -10, -20, -30, -40, -50, -60].map((db) => {
                            const y = dbToY(db);
                            return (
                                <g key={db}>
                                    <line x1="48" y1={y} x2="585" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                    <text x="42" y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">{db}dB</text>
                                </g>
                            );
                        })}

                        {/* Audio Waveform Bars (Snare hits at -6 dB, Hi-hat bleed at -32 dB) */}
                        {[
                            { x: 65, db: -34, type: 'bleed' }, { x: 85, db: -32, type: 'bleed' },
                            { x: 105, db: -35, type: 'bleed' }, { x: 125, db: -6, type: 'snare' },
                            { x: 145, db: -14, type: 'snare' }, { x: 165, db: -24, type: 'snare' },
                            { x: 185, db: -33, type: 'bleed' }, { x: 205, db: -32, type: 'bleed' },
                            { x: 225, db: -36, type: 'bleed' }, { x: 245, db: -32, type: 'bleed' },
                            { x: 265, db: -34, type: 'bleed' }, { x: 285, db: -33, type: 'bleed' },
                            { x: 305, db: -32, type: 'bleed' }, { x: 325, db: -6, type: 'snare' },
                            { x: 345, db: -12, type: 'snare' }, { x: 365, db: -22, type: 'snare' },
                            { x: 385, db: -32, type: 'bleed' }, { x: 405, db: -35, type: 'bleed' },
                            { x: 425, db: -32, type: 'bleed' }, { x: 445, db: -34, type: 'bleed' },
                            { x: 465, db: -33, type: 'bleed' }, { x: 485, db: -6, type: 'snare' },
                            { x: 505, db: -15, type: 'snare' }, { x: 525, db: -26, type: 'snare' },
                            { x: 545, db: -32, type: 'bleed' }, { x: 565, db: -34, type: 'bleed' }
                        ].map((bar, idx) => {
                            const barY = dbToY(bar.db);
                            const barHeight = 185 - barY;
                            const isMuted = bar.db < values[0];
                            const color = isMuted ? '#334155' : (bar.type === 'snare' ? '#38bdf8' : '#fbbf24');
                            return (
                                <rect
                                    key={idx}
                                    x={bar.x}
                                    y={barY}
                                    width="12"
                                    height={barHeight}
                                    rx="2"
                                    fill={color}
                                    opacity={isMuted ? 0.45 : 0.95}
                                />
                            );
                        })}

                        {/* Labels for Snare Peak & Hi-Hat Bleed */}
                        <text x="131" y={dbToY(-6) - 6} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Snare (-6 dB)</text>
                        <text x="245" y={dbToY(-32) - 6} fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Hi-Hat Bleed (-32 dB)</text>

                        {/* Shaded Gated-Out Region below Threshold */}
                        <rect
                            x="48"
                            y={threshY}
                            width="537"
                            height={Math.max(0, 185 - threshY)}
                            fill="rgba(239, 68, 68, 0.14)"
                        />

                        {/* Live Moving Threshold Line */}
                        <line
                            x1="48"
                            y1={threshY}
                            x2="585"
                            y2={threshY}
                            stroke="#f43f5e"
                            strokeWidth="2.5"
                            strokeDasharray="6,4"
                        />
                        <rect x="470" y={Math.max(4, threshY - 18)} width="110" height="16" rx="4" fill="#f43f5e" />
                        <text x="525" y={Math.max(15, threshY - 7)} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                            THRESH: {values[0]} dB
                        </text>

                        <text x="315" y="203" fill="#64748b" fontSize="10" textAnchor="middle">Time (Audio Track Playback)</text>
                    </svg>
                </div>
            ) : isGateAttack ? (
                <div style={{
                    marginBottom: '20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    background: '#090d16',
                    padding: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Live Noise Gate Attack Visualizer
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isSubmitted ? (values[0] === 0 ? '#f87171' : Math.abs(values[0] - correctValue) <= tolerance ? '#4ade80' : '#f87171') : '#94a3b8'
                        }}>
                            {isSubmitted
                                ? (values[0] === 0
                                    ? '0 ms is too fast and causes an audible click!'
                                    : Math.abs(values[0] - correctValue) <= tolerance
                                        ? (correctValue >= 15 ? 'Smooth Attack: Opens gently without clicking' : 'Fast Attack: Preserves transient without clicking')
                                        : (values[0] < correctValue - tolerance ? 'Too fast! Causes clicking or abrupt entrance' : 'Too slow! Front of transient is clipped'))
                                : `Attack: ${values[0]} ms`}
                        </span>
                    </div>
                    <svg viewBox="0 0 600 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        <line x1="40" y1="165" x2="570" y2="165" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        {/* Horizontal Threshold Line */}
                        <line x1="40" y1="115" x2="570" y2="115" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="5,4" />
                        <text x="565" y="109" fill="#f43f5e" fontSize="10" textAnchor="end" fontWeight="bold">Threshold</text>

                        {/* Original Transient Outline */}
                        <polyline
                            points="80,165 110,30 180,95 300,145 480,165"
                            fill="rgba(56, 189, 248, 0.1)"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                        />

                        {/* Attack Ramp Triangle & Resulting Output */}
                        {(() => {
                            const rampX = 110 + (values[0] / max) * 180;
                            const peakY = 30 + (values[0] / max) * 90;
                            return (
                                <>
                                    {/* Angled Attack Triangle */}
                                    <polygon
                                        points={`80,165 ${rampX},30 ${rampX},165`}
                                        fill="rgba(244, 63, 94, 0.16)"
                                        stroke="#f43f5e"
                                        strokeWidth="2"
                                    />
                                    {/* Resulting Gated Output */}
                                    <polyline
                                        points={`80,165 ${rampX},${peakY} 240,${Math.max(peakY, 115)} 300,145 480,165`}
                                        fill="rgba(56, 189, 248, 0.2)"
                                        stroke="#38bdf8"
                                        strokeWidth="3"
                                    />
                                    <line x1="110" y1="20" x2="110" y2="165" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <text x="110" y="15" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Transient Peak</text>
                                    <text x={rampX + 8} y="34" fill="#f43f5e" fontSize="10" fontWeight="bold">Attack ({values[0]} ms)</text>
                                </>
                            );
                        })()}
                        <text x="300" y="188" fill="#64748b" fontSize="10" textAnchor="middle">Time (ms) — Fast attack (steep ramp) preserves the front transient</text>
                    </svg>
                </div>
            ) : isGateHold ? (
                <div style={{
                    marginBottom: '20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    background: '#090d16',
                    padding: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Live Noise Gate Hold Visualizer
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isSubmitted ? (Math.abs(values[0] - correctValue) <= tolerance ? '#4ade80' : '#f87171') : '#94a3b8'
                        }}>
                            {isSubmitted
                                ? (Math.abs(values[0] - correctValue) <= tolerance ? 'Ideal Hold: Note sustains cleanly before closing' : 'Try a hold time that keeps the gate open through the tail')
                                : `Hold: ${values[0]} ms`}
                        </span>
                    </div>
                    <svg viewBox="0 0 600 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        <line x1="40" y1="165" x2="570" y2="165" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        {/* Threshold Line */}
                        <line x1="40" y1="95" x2="570" y2="95" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="5,4" />
                        <text x="565" y="89" fill="#f43f5e" fontSize="10" textAnchor="end" fontWeight="bold">Threshold</text>

                        {/* Decaying Note Envelope */}
                        <path
                            d="M 60,165 L 90,35 Q 170,70 250,95 T 470,155 L 550,165"
                            fill="rgba(56, 189, 248, 0.14)"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                        />

                        {/* Hold Window (starts at x=90 at the peak) */}
                        {(() => {
                            const holdWidth = (values[0] / max) * 340;
                            const holdEndX = 90 + holdWidth;
                            return (
                                <>
                                    <rect
                                        x="90"
                                        y="30"
                                        width={holdWidth}
                                        height="135"
                                        fill="rgba(34, 197, 94, 0.16)"
                                        stroke="#22c55e"
                                        strokeWidth="1.5"
                                        strokeDasharray="4,3"
                                    />
                                    <line x1="90" y1="25" x2="90" y2="165" stroke="#fbbf24" strokeWidth="1.5" />
                                    <text x="90" y="18" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Peak</text>
                                    {holdWidth > 45 && (
                                        <text x={90 + holdWidth / 2} y="60" fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold">
                                            HOLD ({values[0]} ms)
                                        </text>
                                    )}
                                    <line x1={holdEndX} y1="30" x2={holdEndX} y2="165" stroke="#22c55e" strokeWidth="2" />
                                    <text x={holdEndX + 6} y="145" fill="#4ade80" fontSize="10" fontWeight="bold">Release Starts</text>
                                </>
                            );
                        })()}
                        <text x="300" y="188" fill="#64748b" fontSize="10" textAnchor="middle">Time (ms) — Hold keeps the gate open before release begins</text>
                    </svg>
                </div>
            ) : isGateRelease ? (
                <div style={{
                    marginBottom: '20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    background: '#090d16',
                    padding: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Live Noise Gate Release Visualizer
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isSubmitted ? (Math.abs(values[0] - correctValue) <= tolerance ? '#4ade80' : '#f87171') : '#94a3b8'
                        }}>
                            {isSubmitted
                                ? (Math.abs(values[0] - correctValue) <= tolerance ? 'Smooth Release: Chord fades out naturally' : 'Adjust release so the gate fades cleanly with the chord tail')
                                : `Release: ${values[0]} ms`}
                        </span>
                    </div>
                    <svg viewBox="0 0 600 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        <line x1="40" y1="165" x2="570" y2="165" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        {/* Threshold Line */}
                        <line x1="40" y1="95" x2="570" y2="95" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="5,4" />
                        <text x="565" y="89" fill="#f43f5e" fontSize="10" textAnchor="end" fontWeight="bold">Threshold</text>

                        {/* Natural Guitar Chord Decay Reference */}
                        <path
                            d="M 60,165 L 90,35 Q 200,80 460,165"
                            fill="none"
                            stroke="rgba(148, 163, 184, 0.35)"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                        />

                        {/* Live Gate Release Triangle starting at Hold End (x=220, y=95) */}
                        {(() => {
                            const releaseWidth = (values[0] / max) * 320;
                            const endX = 220 + releaseWidth;
                            return (
                                <>
                                    <polygon
                                        points={`220,95 ${endX},165 220,165`}
                                        fill="rgba(34, 197, 94, 0.16)"
                                        stroke="#22c55e"
                                        strokeWidth="2"
                                        strokeDasharray="4,3"
                                    />
                                    <line x1="220" y1="25" x2="220" y2="165" stroke="#fbbf24" strokeWidth="1.5" />
                                    <text x="220" y="18" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Release Starts</text>
                                    <circle cx={endX} cy="165" r="4" fill="#22c55e" />
                                    <text x={Math.min(endX, 520)} y="152" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="middle">
                                        RELEASE ({values[0]} ms)
                                    </text>
                                </>
                            );
                        })()}
                        <text x="300" y="188" fill="#64748b" fontSize="10" textAnchor="middle">Time (ms) — Release controls how smoothly the gate fades out to silence</text>
                    </svg>
                </div>
            ) : isCompressorThreshold ? (
                <div style={{
                    marginBottom: '20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    background: '#090d16',
                    padding: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            Live Compressor Threshold Visualizer
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: isSubmitted ? (Math.abs(values[0] - correctValue) <= tolerance ? '#4ade80' : '#f87171') : '#94a3b8'
                        }}>
                            {isSubmitted
                                ? (values[0] > -6 ? 'Too high! Missing chorus peaks' : values[0] < -24 ? 'Too low! Compressing quiet verses too' : 'Clean: Only loud chorus peaks compressed')
                                : `Threshold: ${values[0]} dB`}
                        </span>
                    </div>
                    <svg viewBox="0 0 600 210" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        {[0, -10, -20, -30, -40].map((db) => {
                            const y = 20 + ((0 - db) / 40) * 165;
                            return (
                                <g key={db}>
                                    <line x1="48" y1={y} x2="585" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                    <text x="42" y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">{db}dB</text>
                                </g>
                            );
                        })}

                        {/* Verse bars (-24 dB) on left, Chorus peaks (-6 dB) on right */}
                        {[
                            { x: 65, db: -26 }, { x: 85, db: -24 }, { x: 105, db: -25 }, { x: 125, db: -24 },
                            { x: 145, db: -27 }, { x: 165, db: -24 }, { x: 185, db: -25 }, { x: 205, db: -26 },
                            { x: 225, db: -24 }, { x: 245, db: -25 },
                            { x: 325, db: -10 }, { x: 345, db: -6 }, { x: 365, db: -8 }, { x: 385, db: -12 },
                            { x: 405, db: -6 }, { x: 425, db: -7 }, { x: 445, db: -11 }, { x: 465, db: -6 },
                            { x: 485, db: -9 }, { x: 505, db: -6 }, { x: 525, db: -12 }
                        ].map((bar, idx) => {
                            const barY = 20 + ((0 - bar.db) / 40) * 165;
                            const barHeight = 185 - barY;
                            const isCompressed = bar.db > values[0];
                            return (
                                <rect
                                    key={idx}
                                    x={bar.x}
                                    y={barY}
                                    width="12"
                                    height={barHeight}
                                    rx="2"
                                    fill={isCompressed ? '#a855f7' : '#38bdf8'}
                                    opacity={isCompressed ? 0.95 : 0.7}
                                />
                            );
                        })}

                        <text x="155" y={20 + ((0 - (-24)) / 40) * 165 - 8} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Quiet Verse (-24 dB)</text>
                        <text x="425" y={20 + ((0 - (-6)) / 40) * 165 - 6} fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">Loud Chorus (-6 dB)</text>

                        {(() => {
                            const cThreshY = 20 + ((0 - values[0]) / 40) * 165;
                            return (
                                <>
                                    <rect
                                        x="48"
                                        y="20"
                                        width="537"
                                        height={Math.max(0, cThreshY - 20)}
                                        fill="rgba(168, 85, 247, 0.14)"
                                    />
                                    <line
                                        x1="48"
                                        y1={cThreshY}
                                        x2="585"
                                        y2={cThreshY}
                                        stroke="#f43f5e"
                                        strokeWidth="2.5"
                                        strokeDasharray="6,4"
                                    />
                                    <rect x="470" y={Math.max(4, cThreshY - 18)} width="110" height="16" rx="4" fill="#f43f5e" />
                                    <text x="525" y={Math.max(15, cThreshY - 7)} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                        THRESH: {values[0]} dB
                                    </text>
                                </>
                            );
                        })()}
                        <text x="315" y="203" fill="#64748b" fontSize="10" textAnchor="middle">Peaks rising above the red line get compressed</text>
                    </svg>
                </div>
            ) : imageSrc && (
                <div
                    onClick={handleExpandImage}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleExpandImage();
                        }
                    }}
                    style={{
                        marginBottom: '20px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: isHovered ? '1px solid rgba(56, 189, 248, 0.55)' : '1px solid rgba(255, 255, 255, 0.12)',
                        background: 'rgba(15, 23, 42, 0.7)',
                        padding: '12px',
                        cursor: 'zoom-in',
                        position: 'relative',
                        boxShadow: isHovered ? '0 8px 24px rgba(56, 189, 248, 0.18)' : '0 4px 12px rgba(0, 0, 0, 0.35)',
                        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    title="Click to enlarge diagram in high-resolution view"
                    aria-label="Enlarge Spectrum Analysis Diagram"
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        paddingBottom: '6px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            {label ? `${label} Reference Diagram` : 'Spectrum Analysis Reference'}
                        </span>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: isHovered ? '#38bdf8' : '#94a3b8',
                            background: isHovered ? 'rgba(56, 189, 248, 0.16)' : 'rgba(255, 255, 255, 0.06)',
                            border: isHovered ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
                            padding: '3px 9px',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                        }}>
                            <Maximize2 size={12} />
                            <span>Click to expand</span>
                        </div>
                    </div>
                    <img
                        src={imageSrc}
                        alt="Spectrum Analysis"
                        style={{
                            width: '100%',
                            maxHeight: '260px',
                            objectFit: 'contain',
                            display: 'block',
                            transform: isHovered ? 'scale(1.015)' : 'scale(1)',
                            transition: 'transform 0.22s ease'
                        }}
                    />
                </div>
            )}

            {/* Standalone Fallback Modal */}
            {isLocalModalOpen && imageSrc && (
                <div
                    onClick={() => setIsLocalModalOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(5, 11, 20, 0.94)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99999,
                        padding: '16px',
                        cursor: 'default'
                    }}
                >
                    <button
                        onClick={() => setIsLocalModalOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '20px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: '#fff',
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 100000
                        }}
                        title="Close (Esc)"
                        aria-label="Close enlarged diagram"
                    >
                        <X size={22} />
                    </button>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: 'min(94vw, 1100px)',
                            maxHeight: 'min(86vh, 800px)',
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '14px',
                            padding: '18px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 25px 65px rgba(0, 0, 0, 0.85)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '12px',
                            paddingBottom: '8px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {label ? `${label} Reference Diagram` : 'Spectrum Analysis Reference'}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                Press Esc or click outside to close
                            </span>
                        </div>
                        <img
                            src={imageSrc}
                            alt="Spectrum Analysis"
                            style={{
                                maxWidth: '100%',
                                maxHeight: 'calc(min(86vh, 800px) - 60px)',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Audio Context */}
            {(audioBeforeSrc || audioAfterSrc) && (
                <div style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    {audioBeforeSrc && (
                        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <p style={{ fontSize: '0.85rem', color: '#fca5a5', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                                1. Listen to the Problem (Before)
                            </p>
                            <audio controls onPlay={handleAudioPlay} src={audioBeforeSrc} style={{ width: '100%', height: '32px' }} />
                        </div>
                    )}

                    {audioAfterSrc && (
                        <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                            <p style={{ fontSize: '0.85rem', color: '#86efac', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                                2. Listen to the Goal (After)
                            </p>
                            <audio controls onPlay={handleAudioPlay} src={audioAfterSrc} style={{ width: '100%', height: '32px' }} />
                        </div>
                    )}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
                <div style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {label}: <span style={{ color: '#38bdf8' }}>{values[0]} {unit}</span>
                </div>

                {/* Slider Container */}
                <div style={{ width: '100%', padding: '0 10px 30px 10px' }}>
                    <Range
                        values={values}
                        step={step}
                        min={min}
                        max={max}
                        disabled={isSubmitted}
                        onChange={(values) => setValues(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: '36px',
                                    display: 'flex',
                                    width: '100%'
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: '8px',
                                        width: '100%',
                                        borderRadius: '4px',
                                        background: getTrackBackground({
                                            values,
                                            colors: ['#38bdf8', '#475569'],
                                            min,
                                            max
                                        }),
                                        alignSelf: 'center'
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged }) => {
                            const { key, ...restProps } = props;
                            return (
                                <div
                                    key={key}
                                    {...restProps}
                                    style={{
                                        ...props.style,
                                        height: '24px',
                                        width: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: '#FFF',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '0px 2px 6px #AAA'
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '10px',
                                            width: '5px', // Fader look
                                            backgroundColor: isDragged ? '#38bdf8' : '#CCC'
                                        }}
                                    />
                                </div>
                            )
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
                        <span>{min}{unit}</span>
                        <span>{max}{unit}</span>
                    </div>
                </div>
            </div>

            {!isSubmitted ? (
                <button
                    onClick={checkAnswer}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    Check Setting
                </button>
            ) : (
                <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: isCorrect ? '1px solid #22c55e' : '1px solid #ef4444', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', margin: 0, color: isCorrect ? '#22c55e' : '#ef4444' }}>
                        {isCorrect ? "Spot on! Frequency Identified." : `Incorrect. The target was ${correctValue} ${unit}.`}
                    </p>
                </div>
            )}
        </div>
    );
}
