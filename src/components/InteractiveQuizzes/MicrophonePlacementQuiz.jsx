import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import './MicrophonePlacementQuiz.css';

const MIC_TYPES = [
    { id: 'dynamic', name: 'Dynamic', pattern: 'Cardioid', icon: '🎤' },
    { id: 'condenser', name: 'Condenser', pattern: 'Cardioid/Omni', icon: '🎙️' },
    { id: 'ribbon', name: 'Ribbon', pattern: 'Figure-8', icon: '📻' },
];

const START_POS = { x: 85, y: 84 };

const wrapAngle = (deg) => ((Math.round(deg) % 360) + 360) % 360;

const formatTargetAngleHint = (angle) => {
    const norm = wrapAngle(angle);
    if (norm === 280) return '280° (← Horizontal Left towards the bridge & f-hole)';
    if (norm === 270) return '270° (← Horizontal Left)';
    if (norm === 235) return '235° (↙ Angled Down-Left from the rim)';
    if (norm === 225) return '225° (↙ Angled Down-Left into the strings)';
    if (norm === 90) return '90° (→ Horizontal Right)';
    if (norm === 180) return '180° (↓ Pointed Down)';
    if (norm === 135) return '135° (↘ Angled Down)';
    if (norm === 0) return '0° (↑ Vertical)';
    return `${norm}°`;
};

const MicrophonePlacementQuiz = ({ quiz, onExit }) => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [selectedMicType, setSelectedMicType] = useState('condenser');
    const [selectedSpotId, setSelectedSpotId] = useState(null);
    const [hasPlaced, setHasPlaced] = useState(false);

    const userContext = useUser();
    const saveQuizResult = userContext ? userContext.saveQuizResult : null;
    const completeCampaignNode = userContext ? userContext.completeCampaignNode : null;
    const resultsSavedRef = useRef(false);

    // Dragging & rotation state
    const [isDragging, setIsDragging] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [micPos, setMicPos] = useState(START_POS);
    const [micAngle, setMicAngle] = useState(0);
    const latestPosRef = useRef(START_POS);
    const latestAngleRef = useRef(0);
    const hasPlacedRef = useRef(false);
    const suppressNextStageClickRef = useRef(false);

    // Interaction state
    const [feedback, setFeedback] = useState(null); // { type: 'success'|'error'|'warning', text: '' }
    const [isComplete, setIsComplete] = useState(false);

    const stageRef = useRef(null);

    const scenarios = quiz?.scenarios || [];
    const currentScenario = scenarios[currentScenarioIndex];

    // Reset mic position, angle, and active spot when scenario changes
    useEffect(() => {
        latestPosRef.current = START_POS;
        latestAngleRef.current = 0;
        hasPlacedRef.current = false;
        suppressNextStageClickRef.current = false;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMicPos(START_POS);
        setMicAngle(0);
        setFeedback(null);
        setSelectedSpotId(null);
        setHasPlaced(false);
        setSelectedMicType('condenser');
    }, [currentScenarioIndex]);

    useEffect(() => {
        if (isComplete && !resultsSavedRef.current) {
            resultsSavedRef.current = true;
            const score = scenarios.length;
            const total = scenarios.length;
            if (saveQuizResult) {
                saveQuizResult(quiz?.title || 'Practical Quiz 14: Advanced Microphone Placement', score, total, 'A');
            }
            if (quiz?.campaignNodeId && completeCampaignNode) {
                completeCampaignNode(quiz.campaignNodeId);
            }
        }
    }, [isComplete, saveQuizResult, completeCampaignNode, quiz?.title, quiz?.campaignNodeId, scenarios.length]);

    if (!currentScenario) {
        return (
            <div className="mic-placement-container">
                <p style={{ padding: '20px' }}>No scenarios found for this quiz.</p>
            </div>
        );
    }

    const evaluatePosition = (
        pos,
        micTypeOverride = selectedMicType,
        evalAngle = latestAngleRef.current
    ) => {
        const hotspots = currentScenario.hotspots || [];
        let matchedSpot = null;
        let closestDist = Infinity;

        hotspots.forEach((spot) => {
            // .stage-container is 16:10, so divide vertical % delta by 1.6 to match horizontal % units
            const dist = Math.hypot(spot.x - pos.x, (spot.y - pos.y) / 1.6);
            if (dist <= spot.radius && dist < closestDist) {
                closestDist = dist;
                matchedSpot = spot;
            }
        });

        if (!matchedSpot) {
            setSelectedSpotId(null);
            setFeedback({
                type: 'error',
                text: 'Off-target placement! Move the microphone capsule into one of the dashed target zones on the instrument.',
            });
            return;
        }

        setSelectedSpotId(matchedSpot.id);

        const isRightMic = (matchedSpot.bestMicTypes || []).includes(micTypeOverride);
        const spotFeedback = matchedSpot.feedback || {};

        let isRightAngle = true;
        if (matchedSpot.targetAngle !== undefined) {
            const normTarget = wrapAngle(matchedSpot.targetAngle);
            const normCurrent = wrapAngle(evalAngle);
            let diff = Math.abs(normTarget - normCurrent);
            if (diff > 180) diff = 360 - diff;
            const tol = matchedSpot.angleTolerance || 60;
            isRightAngle = diff <= tol;
        }

        if (matchedSpot.isCorrectSpot && isRightMic && isRightAngle) {
            const msg = spotFeedback[micTypeOverride] || 'You found the sweet spot with the right microphone.';
            setFeedback({
                type: 'success',
                text: /^(perfect|spot on|excellent)\b/i.test(msg) ? msg : `Perfect! ${msg}`,
            });
        } else if (matchedSpot.isCorrectSpot && isRightMic && !isRightAngle) {
            setFeedback({
                type: 'warning',
                text: `Right spot and right mic, but wrong angle! Rotate the microphone to point at the source — try around ${formatTargetAngleHint(matchedSpot.targetAngle)}.`,
            });
        } else if (matchedSpot.isCorrectSpot && !isRightMic) {
            setFeedback({
                type: 'warning',
                text: `Right position, but wrong mic! ${spotFeedback[micTypeOverride] || 'Try selecting a different microphone type above.'}`,
            });
        } else {
            setFeedback({
                type: 'error',
                text: spotFeedback[micTypeOverride] || spotFeedback.default || "This placement doesn't give the desired tone. Try another position.",
            });
        }
    };

    const getStagePercentCoords = (clientX, clientY) => {
        if (!stageRef.current) return latestPosRef.current;
        const rect = stageRef.current.getBoundingClientRect();
        let x = ((clientX - rect.left) / rect.width) * 100;
        let y = ((clientY - rect.top) / rect.height) * 100;
        x = Math.max(4, Math.min(96, x));
        y = Math.max(4, Math.min(96, y));
        return { x, y };
    };

    const handleAngleChange = (newAngle, { allow360 = false } = {}) => {
        const nextAngle = allow360 && Math.round(newAngle) === 360 ? 360 : wrapAngle(newAngle);
        latestAngleRef.current = nextAngle;
        setMicAngle(nextAngle);
        if (hasPlacedRef.current) {
            evaluatePosition(latestPosRef.current, selectedMicType, nextAngle);
        }
    };

    const handleMicSelect = (micId) => {
        setSelectedMicType(micId);
        if (hasPlacedRef.current) {
            evaluatePosition(latestPosRef.current, micId, latestAngleRef.current);
        }
    };

    const handlePointerDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        suppressNextStageClickRef.current = true;
    };

    const handleRotatePointerDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsRotating(true);
        suppressNextStageClickRef.current = true;
    };

    const handlePointerMove = (e) => {
        if (isRotating && stageRef.current) {
            const rect = stageRef.current.getBoundingClientRect();
            const pivotX = rect.left + (latestPosRef.current.x / 100) * rect.width;
            const pivotY = rect.top + (latestPosRef.current.y / 100) * rect.height;
            const rawAngle = Math.atan2(e.clientY - pivotY, e.clientX - pivotX) * (180 / Math.PI) + 90;
            const nextAngle = wrapAngle(rawAngle);
            latestAngleRef.current = nextAngle;
            setMicAngle(nextAngle);
            return;
        }

        if (!isDragging) return;
        const nextPos = getStagePercentCoords(e.clientX, e.clientY);
        latestPosRef.current = nextPos;
        setMicPos(nextPos);
    };

    const handlePointerUp = (e) => {
        if (isRotating) {
            setIsRotating(false);
            if (hasPlacedRef.current) {
                evaluatePosition(latestPosRef.current, selectedMicType, latestAngleRef.current);
            }
            return;
        }

        if (!isDragging) return;
        setIsDragging(false);
        const finalPos = getStagePercentCoords(e.clientX, e.clientY);
        latestPosRef.current = finalPos;
        hasPlacedRef.current = true;
        setHasPlaced(true);
        setMicPos(finalPos);
        evaluatePosition(finalPos, selectedMicType, latestAngleRef.current);
    };

    const handleStageClick = (e) => {
        if (suppressNextStageClickRef.current) {
            suppressNextStageClickRef.current = false;
            return;
        }
        const clickedPos = getStagePercentCoords(e.clientX, e.clientY);
        latestPosRef.current = clickedPos;
        hasPlacedRef.current = true;
        setHasPlaced(true);
        setMicPos(clickedPos);
        evaluatePosition(clickedPos, selectedMicType, latestAngleRef.current);
    };

    const handleDontKnow = () => {
        const correctSpot = (currentScenario.hotspots || []).find((h) => h.isCorrectSpot);
        if (!correctSpot) return;

        const bestMic = (correctSpot.bestMicTypes && correctSpot.bestMicTypes[0]) || 'dynamic';
        const targetAngle = correctSpot.targetAngle !== undefined ? wrapAngle(correctSpot.targetAngle) : 0;
        const targetPos = { x: correctSpot.x, y: correctSpot.y };

        latestPosRef.current = targetPos;
        latestAngleRef.current = targetAngle;
        hasPlacedRef.current = true;
        setSelectedMicType(bestMic);
        setMicPos(targetPos);
        setMicAngle(targetAngle);
        setSelectedSpotId(correctSpot.id);
        setHasPlaced(true);

        const rawMsg =
            (correctSpot.feedback && correctSpot.feedback[bestMic]) ||
            'This is the optimal microphone, position, and angle for this source.';
        const cleanMsg = rawMsg.replace(/^(perfect!|spot on!|excellent!)\s*/i, '');
        setFeedback({
            type: 'success',
            text: `Answer Revealed: ${cleanMsg}`,
        });
    };

    const handleNext = () => {
        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex((prev) => prev + 1);
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
                    You&apos;ve successfully tracked the instruments using professional microphone placements.
                </p>
                <button className="action-btn btn-primary" onClick={onExit}>
                    Return to Dashboard
                </button>
            </div>
        );
    }

    const isSuccessFeedback = feedback?.type === 'success';
    const activeMicName = MIC_TYPES.find((m) => m.id === selectedMicType)?.name || 'selected';
    const displayAngle = wrapAngle(micAngle);

    return (
        <div className="mic-placement-container">
            <div className="mic-placement-header">
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
            </div>

            <div className="scenario-progress-bar">
                <span className="scenario-step-count">
                    Scenario {currentScenarioIndex + 1} of {scenarios.length}
                </span>
                <div className="scenario-pills">
                    {scenarios.map((sc, idx) => (
                        <button
                            key={sc.id || idx}
                            type="button"
                            className={`scenario-pill ${idx === currentScenarioIndex ? 'active' : ''}`}
                            onClick={() => setCurrentScenarioIndex(idx)}
                            title={sc.title}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="scenario-info">
                <h3>Scenario {currentScenarioIndex + 1}: {currentScenario.title}</h3>
                <p>{currentScenario.instruction}</p>
            </div>

            <div className="controls-panel">
                <div className="step-hint">
                    1. Pick a Mic Type &rarr; 2. Rotate it (0°–360°) &rarr; 3. Click or drag into a dashed target zone
                </div>
                <div className="controls-row">
                    <div className="mic-selectors-group">
                        {MIC_TYPES.map((mic) => (
                            <button
                                key={mic.id}
                                type="button"
                                className={`mic-selector ${selectedMicType === mic.id ? 'active' : ''}`}
                                onClick={() => handleMicSelect(mic.id)}
                            >
                                <div className="icon">{mic.icon}</div>
                                <div className="name">{mic.name}</div>
                                <div className="pattern">{mic.pattern}</div>
                            </button>
                        ))}
                    </div>

                    <div className="rotation-controls-group">
                        <div className="rotation-header">
                            <span>Rotate Mic: <strong>{micAngle}°</strong></span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            step="5"
                            value={micAngle}
                            onChange={(e) => handleAngleChange(Number(e.target.value), { allow360: true })}
                            className="rotate-slider"
                            aria-label="Rotate microphone 0 to 360 degrees"
                        />
                        <div className="angle-presets">
                            <button
                                type="button"
                                className={`angle-btn ${displayAngle === 0 ? 'active' : ''}`}
                                onClick={() => handleAngleChange(0)}
                                title="Vertical upright (0°)"
                            >
                                &uarr; 0°
                            </button>
                            <button
                                type="button"
                                className={`angle-btn ${displayAngle === 90 ? 'active' : ''}`}
                                onClick={() => handleAngleChange(90)}
                                title="Horizontal right (90°)"
                            >
                                &rarr; 90°
                            </button>
                            <button
                                type="button"
                                className={`angle-btn ${displayAngle === 180 ? 'active' : ''}`}
                                onClick={() => handleAngleChange(180)}
                                title="Pointed down (180°)"
                            >
                                &darr; 180°
                            </button>
                            <button
                                type="button"
                                className={`angle-btn ${displayAngle === 270 ? 'active' : ''}`}
                                onClick={() => handleAngleChange(270)}
                                title="Horizontal left (270°)"
                            >
                                &larr; 270°
                            </button>
                            <button
                                type="button"
                                className="angle-btn step"
                                onClick={() => handleAngleChange(displayAngle - 15)}
                                title="Rotate counter-clockwise 15°"
                            >
                                &#8634; -15°
                            </button>
                            <button
                                type="button"
                                className="angle-btn step"
                                onClick={() => handleAngleChange(displayAngle + 15)}
                                title="Rotate clockwise 15°"
                            >
                                &#8635; +15°
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="stage-container"
                ref={stageRef}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onClick={handleStageClick}
            >
                <img
                    src={currentScenario.background_image}
                    alt="Studio Stage"
                    className="stage-background loaded"
                />

                {/* Clean Dashed Candidate Target Zones (No Spoiler Labels) */}
                {currentScenario.hotspots.map((spot) => {
                    const isSelected = selectedSpotId === spot.id;
                    const stateClass = isSelected && feedback ? feedback.type : '';

                    return (
                        <div
                            key={spot.id}
                            className={`hotspot-area ${stateClass}`}
                            style={{
                                left: `${spot.x}%`,
                                top: `${spot.y}%`,
                                width: `${spot.radius * 2}%`,
                            }}
                        />
                    );
                })}

                {/* Draggable Mic Anchored at Capsule Centre */}
                <div
                    className={`draggable-mic ${selectedMicType} ${isDragging ? 'dragging' : ''} ${isRotating ? 'rotating' : ''}`}
                    style={{
                        left: `${micPos.x}%`,
                        top: `${micPos.y}%`,
                        '--mic-rotation': `${micAngle}deg`,
                    }}
                    onPointerDown={handlePointerDown}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className="rotate-handle"
                        onPointerDown={handleRotatePointerDown}
                        onClick={(e) => e.stopPropagation()}
                        title="Drag to rotate microphone (0°–360°)"
                        aria-label="Drag to rotate microphone"
                    />
                    <div className="mic-head"></div>
                    <div className="mic-body"></div>
                </div>
            </div>

            <div className="feedback-panel">
                {hasPlaced && feedback ? (
                    <div className={`feedback-message ${feedback.type}`}>
                        {feedback.type === 'success' && <CheckCircle size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />}
                        {feedback.type === 'warning' && <AlertCircle size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />}
                        {feedback.type === 'error' && <RefreshCw size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />}
                        {feedback.text}
                    </div>
                ) : (
                    <div style={{ color: 'var(--text-secondary, #94a3b8)' }}>
                        Rotate the mic above if needed, then click on the stage — or drag the {activeMicName} mic — to place its capsule in a target zone.
                    </div>
                )}
            </div>

            <div className="action-buttons">
                <button type="button" className="action-btn btn-secondary" onClick={onExit}>
                    Exit
                </button>
                {!isSuccessFeedback && (
                    <button
                        type="button"
                        className="action-btn btn-unsure"
                        onClick={handleDontKnow}
                        title="Not sure yet? Reveal the correct microphone, position, and angle"
                    >
                        <HelpCircle size={18} style={{ color: '#c084fc' }} />
                        I&apos;m Not Sure
                    </button>
                )}
                <button
                    type="button"
                    className="action-btn btn-primary"
                    disabled={!isSuccessFeedback}
                    onClick={handleNext}
                >
                    {currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario \u2192' : 'Finish Studio Session \u2192'}
                </button>
            </div>
        </div>
    );
};

export default MicrophonePlacementQuiz;
