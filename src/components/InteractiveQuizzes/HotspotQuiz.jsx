import React, { useState, useRef, useEffect } from 'react';

export default function HotspotQuiz({
    imageSrc,
    hotspots = [], // Array of { id, x (%), y (%), radius (%), label }
    questionText,
    onResult
}) {
    const [clickedSpot, setClickedSpot] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showHint, setShowHint] = useState(false);

    // x and y are percentages (0-100)
    // radius is percentage of width (0-100)

    const handleHotspotClick = (spot) => {
        if (isSubmitted) return;

        setClickedSpot(spot);
        setIsSubmitted(true);

        // Assume the quiz passes a prop "targetHotspotId" or we just check if the clicked spot has "isAnswer: true"
        // For simplicity, let's assume the data structure includes 'isAnswer' in each hotspot
        const correct = spot.isAnswer === true;
        setIsCorrect(correct);

        if (onResult) {
            onResult(correct);
        }
    };

    const handleBackgroundClick = (e) => {
        if (isSubmitted) return;

        // Calculate percentage coordinates
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // User missed the target
        setClickedSpot({ id: 'miss', label: 'Missed', debugX: x, debugY: y });
        setIsSubmitted(true);
        setIsCorrect(false);
        if (onResult) {
            onResult(false);
        }
    };

    return (
        <div className="hotspot-quiz" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Hardware Anatomy</h3>
            <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>{questionText}</p>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    lineHeight: 0, // Remove gap under image
                    cursor: isSubmitted ? 'default' : 'crosshair'
                }}
            >
                <img
                    src={imageSrc}
                    alt="Hardware Panel"
                    style={{ width: '100%', display: 'block' }}
                    onClick={handleBackgroundClick}
                />

                {/* Render Hotspots */}
                {hotspots.map((spot) => (
                    <div
                        key={spot.id}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent background click
                            handleHotspotClick(spot);
                        }}
                        style={{
                            position: 'absolute',
                            left: `${spot.x}%`,
                            top: `${spot.y}%`,
                            width: `${spot.width || 10}%`, // Default to 10% width if not specified
                            height: `${spot.height || 10}%`,
                            transform: 'translate(-50%, -50%)', // Center on coords
                            borderRadius: '50%',
                            border: isSubmitted && clickedSpot && clickedSpot.id === spot.id
                                ? (spot.isAnswer ? '3px solid #22c55e' : '3px solid #ef4444')
                                : '2px solid transparent', // Invisible until clicked
                            backgroundColor: isSubmitted && clickedSpot && clickedSpot.id === spot.id
                                ? (spot.isAnswer ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)')
                                : 'rgba(255, 255, 255, 0.0)', // Transparent touch target
                            transition: 'all 0.2s',
                            zIndex: 10
                        }}
                        title={isSubmitted ? spot.label : ''} // Show label on hover after submit
                    />
                ))}

                {/* Show Correct Indicator on Submit (if they missed it) */}
                {isSubmitted && !isCorrect && (
                    hotspots.filter(h => h.isAnswer).map(spot => (
                        <div
                            key={`reveal-${spot.id}`}
                            style={{
                                position: 'absolute',
                                left: `${spot.x}%`,
                                top: `${spot.y}%`,
                                width: `${spot.width || 10}%`,
                                height: `${spot.height || 10}%`,
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                border: '2px dashed #22c55e',
                                animation: 'pulse 2s infinite',
                                pointerEvents: 'none'
                            }}
                        />
                    ))
                )}
            </div>

            {/* Results Feedback */}
            {isSubmitted && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    borderRadius: '8px',
                    background: isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    border: isCorrect ? '1px solid #22c55e' : '1px solid #ef4444',
                    textAlign: 'center'
                }}>
                    <p style={{ fontWeight: 'bold', margin: '0 0 5px 0', color: isCorrect ? '#22c55e' : '#ef4444' }}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>
                        {isCorrect
                            ? `That is indeed the ${clickedSpot.label}.`
                            : clickedSpot.id === 'miss'
                                ? "You missed the target controls completely."
                                : `You selected the ${clickedSpot.label}.`
                        }
                    </p>
                    <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '5px' }}>
                        Clicked Location: <strong>x: {Math.round(clickedSpot.debugX)}%, y: {Math.round(clickedSpot.debugY)}%</strong>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
                }
            `}</style>
        </div>
    );
}
