import React, { useState, useRef, useEffect } from 'react';
import { Mic, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import './MicrophonePlacementQuiz.css';

const MIC_TYPES = [
    { id: 'dynamic', name: 'Dynamic', pattern: 'Cardioid', icon: '🎤' },
    { id: 'condenser', name: 'Condenser', pattern: 'Cardioid/Omni', icon: '🎙️' },
    { id: 'ribbon', name: 'Ribbon', pattern: 'Figure-8', icon: '📻' },
];

const MicrophonePlacementQuiz = ({ quiz, onExit }) => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [selectedMicType, setSelectedMicType] = useState('condenser');

    // Dragging state
    const [isDragging, setIsDragging] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [micPos, setMicPos] = useState({ x: 50, y: 80 }); // Percentages
    const [micAngle, setMicAngle] = useState(0); // Degrees

    // Interaction state
    const [feedback, setFeedback] = useState(null); // { type: 'success'|'error'|'warning', text: '' }
    const [isComplete, setIsComplete] = useState(false);

    const stageRef = useRef(null);

    // If scenarios aren't in the quiz object yet (during dev fallback), use empty array
    const scenarios = quiz?.scenarios || [];
    const currentScenario = scenarios[currentScenarioIndex];

    // Reset mic position when scenario changes
    useEffect(() => {
        setMicPos({ x: 50, y: 80 });
        setMicAngle(0);
        setFeedback(null);
        setSelectedMicType('condenser');
    }, [currentScenarioIndex]);

    if (!currentScenario) {
        return <div className="mic-placement-container"><p style={{ padding: '20px' }}>No scenarios found for this quiz.</p></div>;
    }

    // Handle Dragging
    const handlePointerDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        setFeedback(null);
    };

    const handleRotatePointerDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsRotating(true);
        setFeedback(null);
    };

    const handlePointerMove = (e) => {
        if (!stageRef.current) return;

        const rect = stageRef.current.getBoundingClientRect();

        if (isRotating) {
            // Calculate angle based on mouse position relative to mic center
            // The mic's center in pixel coordinates on the stage:
            const micCenterX = rect.left + (micPos.x / 100) * rect.width;
            const micCenterY = rect.top + (micPos.y / 100) * rect.height;

            // Calculate angle in degrees
            const dx = e.clientX - micCenterX;
            const dy = e.clientY - micCenterY;
            // atan2 gives angle from X axis. We want angle from Y axis (up is 0, right is 90)
            let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

            setMicAngle(angle);
            return;
        }

        if (isDragging) {
            // Calculate position relative to stage
            let x = ((e.clientX - rect.left) / rect.width) * 100;
            let y = ((e.clientY - rect.top) / rect.height) * 100;

            // Clamp to bounds
            x = Math.max(5, Math.min(95, x));
            y = Math.max(5, Math.min(95, y));

            setMicPos({ x, y });
        }
    };

    const handlePointerUp = () => {
        if (isDragging || isRotating) {
            setIsDragging(false);
            setIsRotating(false);
            evaluatePlacement();
        }
    };

    const evaluatePlacement = (evalAngle = micAngle, evalPos = micPos) => {
        // Check if evalPos is within any hotspot of the current scenario
        const h = currentScenario.hotspots.find(spot => {
            const dx = spot.x - evalPos.x;
            const dy = spot.y - evalPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= spot.radius;
        });

        if (h) {
            // Evaluate Mic Type for this hotspot
            const isCorrectType = h.bestMicTypes.includes(selectedMicType);

            // Evaluate Angle if the hotspot specifies one
            let isCorrectAngle = true;
            let angleFeedback = "";
            let distanceToTargetAngle = 0;

            if (h.targetAngle !== undefined && h.angleTolerance !== undefined) {
                // Normalize angles to 0-360 for comparison
                let normTarget = ((h.targetAngle % 360) + 360) % 360;
                let normCurrent = ((evalAngle % 360) + 360) % 360;

                // Calculate shortest angular distance
                distanceToTargetAngle = Math.abs(normTarget - normCurrent);
                if (distanceToTargetAngle > 180) {
                    distanceToTargetAngle = 360 - distanceToTargetAngle;
                }

                if (distanceToTargetAngle > h.angleTolerance) {
                    isCorrectAngle = false;
                    angleFeedback = " You're in the right spot, but the mic is pointed the wrong way! Rotate it to face the source properly.";
                }
            }

            if (h.isCorrectSpot && isCorrectType && isCorrectAngle) {
                setFeedback({
                    type: 'success',
                    text: `Perfect! ${h.feedback[selectedMicType] || "You found the sweet spot with the right microphone."}`
                });
            } else if (h.isCorrectSpot && isCorrectType && !isCorrectAngle) {
                setFeedback({
                    type: 'warning',
                    text: angleFeedback
                });
            } else if (h.isCorrectSpot && !isCorrectType) {
                setFeedback({
                    type: 'warning',
                    text: `Right position, but wrong mic. ${h.feedback[selectedMicType] || "Try a different microphone type for this specific task."}`
                });
            } else {
                // Wrong spot
                setFeedback({
                    type: 'error',
                    text: h.feedback[selectedMicType] || h.feedback['default'] || "This placement doesn't give the desired result. Try moving it."
                });
            }
        } else {
            setFeedback({
                type: 'warning',
                text: "You placed the microphone in an indeterminate area. Try getting closer to the source."
            });
        }
    };

    // Keyboard controls for rotation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isDragging || isRotating) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setMicAngle(prev => {
                    const newAngle = prev - 15;
                    evaluatePlacement(newAngle, micPos);
                    return newAngle;
                });
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                setMicAngle(prev => {
                    const newAngle = prev + 15;
                    evaluatePlacement(newAngle, micPos);
                    return newAngle;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDragging, isRotating, micPos, currentScenario, selectedMicType]); // Re-bind if dependencies of evaluatePlacement change

    const handleRotateButton = (delta) => {
        setMicAngle(prev => {
            const newAngle = prev + delta;
            evaluatePlacement(newAngle, micPos);
            return newAngle;
        });
    };

    const handleNext = () => {
        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
        } else {
            setIsComplete(true);
        }
    };

    if (isComplete) {
        return (
            <div className="mic-placement-container" style={{ padding: '40px', textAlign: 'center' }}>
                <CheckCircle size={64} color="var(--accent-success)" style={{ marginBottom: '20px' }} />
                <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Studio Session Complete!</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '30px' }}>
                    You've successfully tracked the instruments using professional microphone placements.
                </p>
                <button className="action-btn btn-primary" onClick={onExit}>
                    Return to Dashboard
                </button>
            </div>
        );
    }

    const isSuccessFeedback = feedback?.type === 'success';

    return (
        <div className="mic-placement-container">
            <div className="mic-placement-header">
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
            </div>

            <div className="scenario-info">
                <h3>Scenario {currentScenarioIndex + 1}: {currentScenario.title}</h3>
                <p>{currentScenario.instruction}</p>
            </div>

            <div className="controls-panel">
                <div className="mic-selectors-group" style={{ display: 'flex', gap: '15px' }}>
                    {MIC_TYPES.map(mic => (
                        <div
                            key={mic.id}
                            className={`mic-selector ${selectedMicType === mic.id ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedMicType(mic.id);
                                setFeedback(null); // Clear feedback when switching mic
                            }}
                        >
                            <div className="icon">{mic.icon}</div>
                            <div className="name">{mic.name}</div>
                            <div className="pattern">{mic.pattern}</div>
                        </div>
                    ))}
                </div>

                <div className="rotation-controls-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-card)', padding: '10px 20px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--text-muted)' }}>Rotate Mic</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="action-btn btn-secondary" style={{ padding: '8px 12px', fontSize: '1rem' }} onClick={() => handleRotateButton(-15)}>↺ Left</button>
                        <button className="action-btn btn-secondary" style={{ padding: '8px 12px', fontSize: '1rem' }} onClick={() => handleRotateButton(15)}>Right ↻</button>
                    </div>
                </div>
            </div>

            <div
                className="stage-container"
                ref={stageRef}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                <img
                    src={currentScenario.background_image}
                    alt="Studio Stage"
                    className="stage-background loaded"
                />

                {/* Render visible/invisible hotspots for visual debugging or hints */}
                {currentScenario.hotspots.map((spot, idx) => {
                    // We might want them slightly visible as hints, or completely invisible.
                    // For learning, showing dashed circles helps a lot.
                    return (
                        <div
                            key={idx}
                            className={`hotspot-area ${feedback && spot.isCorrectSpot && isSuccessFeedback ? 'success' : ''}`}
                            style={{
                                left: `${spot.x}%`,
                                top: `${spot.y}%`,
                                width: `${spot.radius * 2}%`,
                                height: `${spot.radius * 2}%`,
                            }}
                        />
                    )
                })}

                {/* Draggable Mic */}
                <div
                    className={`draggable-mic ${selectedMicType} ${isRotating ? 'rotating' : ''}`}
                    style={{
                        left: `${micPos.x}%`,
                        top: `${micPos.y}%`,
                        '--mic-rotation': `${micAngle}deg`
                    }}
                    onPointerDown={handlePointerDown}
                >
                    <div
                        className="rotate-handle"
                        onPointerDown={handleRotatePointerDown}
                        title="Drag to rotate"
                    ></div>
                    <div className="mic-head"></div>
                    <div className="mic-body"></div>
                </div>
            </div>

            <div className="feedback-panel">
                {feedback ? (
                    <div className={`feedback-message ${feedback.type}`}>
                        {feedback.type === 'success' && <CheckCircle size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />}
                        {feedback.type === 'warning' && <AlertCircle size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />}
                        {feedback.type === 'error' && <RefreshCw size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />}
                        {feedback.text}
                    </div>
                ) : (
                    <div style={{ color: 'var(--text-muted)' }}>
                        Drag the {MIC_TYPES.find(m => m.id === selectedMicType)?.name} mic onto the stage to test its position.
                    </div>
                )}
            </div>

            <div className="action-buttons">
                <button className="action-btn btn-secondary" onClick={onExit}>
                    Exit
                </button>
                <button
                    className="action-btn btn-primary"
                    disabled={!isSuccessFeedback}
                    onClick={handleNext}
                >
                    {currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario \u2192' : 'Finish Studio Session \u2192'}
                </button>
            </div>
        </div >
    );
};

export default MicrophonePlacementQuiz;
