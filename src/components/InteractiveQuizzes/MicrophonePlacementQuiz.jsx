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
    const [micPos, setMicPos] = useState({ x: 50, y: 80 }); // Percentages

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
        setFeedback(null);
        setSelectedMicType('condenser');
    }, [currentScenarioIndex]);

    if (!currentScenario) {
        return <div className="mic-placement-container"><p style={{ padding: '20px' }}>No scenarios found for this quiz.</p></div>;
    }

    // Handle Dragging
    const handlePointerDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setFeedback(null);
    };

    const handlePointerMove = (e) => {
        if (!isDragging || !stageRef.current) return;

        // Calculate position relative to stage
        const rect = stageRef.current.getBoundingClientRect();
        let x = ((e.clientX - rect.left) / rect.width) * 100;
        let y = ((e.clientY - rect.top) / rect.height) * 100;

        // Clamp to bounds
        x = Math.max(5, Math.min(95, x));
        y = Math.max(5, Math.min(95, y));

        setMicPos({ x, y });
    };

    const handlePointerUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        evaluatePlacement();
    };

    const evaluatePlacement = () => {
        // Check if micPos is within any hotspot of the current scenario
        const h = currentScenario.hotspots.find(spot => {
            // Simple distance check (circular hotspots)
            // Since CSS percentages aren't perfectly square, we adjust for aspect ratio roughly if needed, 
            // but a simple 2D distance usually works okay for teaching tools.
            const dx = spot.x - micPos.x;
            const dy = spot.y - micPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // spot.radius is in percentage 
            return distance <= spot.radius;
        });

        if (h) {
            // Evaluate Mic Type for this hotspot
            const isCorrectType = h.bestMicTypes.includes(selectedMicType);

            if (h.isCorrectSpot && isCorrectType) {
                setFeedback({
                    type: 'success',
                    text: `Perfect! ${h.feedback[selectedMicType] || "You found the sweet spot with the right microphone."}`
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
                    className={`draggable-mic ${selectedMicType}`}
                    style={{
                        left: `${micPos.x}%`,
                        top: `${micPos.y}%`,
                    }}
                    onPointerDown={handlePointerDown}
                >
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
