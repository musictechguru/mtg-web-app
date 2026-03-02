import React, { useState, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

// Internal Draggable Component
function DraggableElement({ id, content, cx, cy }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = {
        position: 'absolute',
        left: `calc(50% + ${cx}px)`,
        top: `calc(100% - ${cy}px)`,
        transform: transform ? `translate3d(calc(-50% + ${transform.x}px), calc(-50% + ${transform.y}px), 0)` : 'translate(-50%, -50%)',
        padding: '8px 12px',
        backgroundColor: '#3b82f6',
        color: 'white',
        borderRadius: '6px',
        cursor: 'grab',
        zIndex: transform ? 100 : 10,
        fontWeight: 'bold',
        fontSize: '0.85rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
        whiteSpace: 'nowrap'
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {content}
        </div>
    );
}

// Internal Droppable Zone (Hotspot)
function DroppableZone({ id, cx, cy, radius, showHint }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const style = {
        position: 'absolute',
        left: `calc(50% + ${cx}px)`,
        top: `calc(100% - ${cy}px)`,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: isOver ? 'rgba(34, 197, 94, 0.4)' : showHint ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        border: isOver ? '2px solid #22c55e' : showHint ? '1px dashed #666' : 'none',
        zIndex: 1,
        transition: 'all 0.2s ease'
    };

    return <div ref={setNodeRef} style={style} />;
}

export default function PanningQuiz({ question, initialAnswers, onAnswersChange, examMode, showAnswers }) {
    // Determine dimensions
    const containerWidth = 600;
    const radius = 250;

    // elements array: [{ id, content, targetZone }]
    // zones array: [{ id, angle (0 = hard left, 90 = center, 180 = hard right), distance (0-1) }]

    // State: mapped elements -> elementId: currentZoneId | null
    const [elementPositions, setElementPositions] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState({ isCorrect: false, details: {} });

    useEffect(() => {
        if (initialAnswers) {
            setElementPositions(initialAnswers);
        } else {
            setElementPositions({});
        }
    }, [initialAnswers]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (examMode && submitted) return;

        if (over) {
            const newPositions = {
                ...elementPositions,
                [active.id]: over.id
            };
            setElementPositions(newPositions);
            if (onAnswersChange) onAnswersChange(newPositions);
        } else {
            // Drop outside -> reset to pool
            const newPositions = { ...elementPositions };
            delete newPositions[active.id];
            setElementPositions(newPositions);
            if (onAnswersChange) onAnswersChange(newPositions);
        }
    };

    const checkAnswer = () => {
        let allCorrect = true;
        const details = {};

        question.elements.forEach(el => {
            const userZone = elementPositions[el.id];
            const isCorrect = userZone === el.targetZone;
            if (!isCorrect) allCorrect = false;
            details[el.id] = isCorrect;
        });

        setFeedback({ isCorrect: allCorrect, details });
        setSubmitted(true);
    };

    const getCoordinates = (angle, distanceRatio) => {
        // angle: 0 = hard left, 90 = center (front), 180 = hard right
        // distanceRatio: 0 = center point (listener), 1 = edge of semi-circle
        const r = radius * distanceRatio;
        // Convert to standard math angle where 0 is right (x positive) and 90 is up (y positive)
        // So angle 0 (hard left) -> math angle 180
        // angle 90 (center) -> math angle 90
        // angle 180 (hard right) -> math angle 0
        const mathAngle = (180 - angle) * (Math.PI / 180);

        return {
            cx: r * Math.cos(mathAngle),
            cy: r * Math.sin(mathAngle)
        };
    };

    return (
        <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '20px', borderRadius: '12px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>{question.question}</h3>
                {question.hint && <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{question.hint}</p>}
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-end' }}>
                    {/* Unplaced Elements Pool */}
                    <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h4 style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '10px' }}>Elements to Place:</h4>
                        <div style={{ minHeight: '300px', backgroundColor: '#111827', padding: '15px', borderRadius: '8px', position: 'relative' }}>
                            {question.elements.map((el, i) => {
                                if (elementPositions[el.id]) return null;
                                return (
                                    <div key={el.id} style={{ position: 'relative', height: '40px', marginBottom: '10px' }}>
                                        <DraggableElement id={el.id} content={el.content} cx={0} cy={20} />
                                    </div>
                                );
                            })}
                            {question.elements.every(el => elementPositions[el.id]) && (
                                <div style={{ color: '#4b5563', fontStyle: 'italic', textAlign: 'center', marginTop: '20px' }}>All elements placed!</div>
                            )}
                        </div>
                    </div>

                    {/* Semi-Circle Stage */}
                    <div style={{
                        position: 'relative',
                        width: `${containerWidth}px`,
                        height: `${radius + 40}px`,
                        backgroundColor: '#111827',
                        borderRadius: `${radius}px ${radius}px 0 0`,
                        border: '1px solid #374151',
                        borderBottom: '4px solid #4b5563',
                        overflow: 'hidden'
                    }}>
                        {/* Background Grids / Labels */}
                        <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', color: '#9ca3af', fontWeight: 'bold', fontSize: '1.2rem', zIndex: 5 }}>MIX CENTER</div>
                        <div style={{ position: 'absolute', bottom: '10px', left: '20px', color: '#6b7280', fontSize: '0.9rem' }}>HARD LEFT</div>
                        <div style={{ position: 'absolute', bottom: '10px', right: '20px', color: '#6b7280', fontSize: '0.9rem' }}>HARD RIGHT</div>

                        {/* Semi-circle lines */}
                        <div style={{ position: 'absolute', left: '50%', bottom: '0', width: `${radius}px`, height: `${radius}px`, borderTopLeftRadius: '100%', border: '1px dashed #374151', borderRight: 'none', borderBottom: 'none', transformOrigin: 'bottom right', transform: 'translateX(-100%)' }} />
                        <div style={{ position: 'absolute', left: '50%', bottom: '0', width: `${radius}px`, height: `${radius}px`, borderTopRightRadius: '100%', border: '1px dashed #374151', borderLeft: 'none', borderBottom: 'none', transformOrigin: 'bottom left' }} />

                        {/* Drop Zones */}
                        {question.zones.map(zone => {
                            const { cx, cy } = getCoordinates(zone.angle, zone.distance);
                            return (
                                <DroppableZone
                                    key={zone.id}
                                    id={zone.id}
                                    cx={cx}
                                    cy={cy}
                                    radius={40}
                                    showHint={!examMode && !submitted}
                                />
                            );
                        })}

                        {/* Placed Elements */}
                        {question.elements.map(el => {
                            const placedZoneId = elementPositions[el.id];
                            if (!placedZoneId) return null;
                            const zone = question.zones.find(z => z.id === placedZoneId);
                            if (!zone) return null;

                            const { cx, cy } = getCoordinates(zone.angle, zone.distance);

                            // Calculate local isCorrect if showAnswers is passed (for Exam Player wrapper) or fallback to internal submission
                            let isCorrect = null;
                            if (showAnswers) {
                                isCorrect = placedZoneId === el.targetZone;
                            } else if (submitted && !examMode) {
                                isCorrect = feedback.details[el.id];
                            }

                            return (
                                <div key={`placed-${el.id}`}>
                                    <DraggableElement id={el.id} content={el.content} cx={cx} cy={cy} />
                                    {isCorrect !== null && (
                                        <div style={{ position: 'absolute', left: `calc(50% + ${cx}px + 40px)`, top: `calc(100% - ${cy}px - 20px)`, zIndex: 10 }}>
                                            {isCorrect ? <Check color="#22c55e" size={20} /> : <X color="#ef4444" size={20} />}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </DndContext>

            {/* Controls */}
            {!examMode && !submitted && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        onClick={checkAnswer}
                        disabled={Object.keys(elementPositions).length < question.elements.length}
                        style={{
                            padding: '10px 20px', backgroundColor: '#9333ea', color: 'white', borderRadius: '6px',
                            border: 'none', fontWeight: 'bold', cursor: Object.keys(elementPositions).length < question.elements.length ? 'not-allowed' : 'pointer',
                            opacity: Object.keys(elementPositions).length < question.elements.length ? 0.5 : 1
                        }}
                    >
                        Check Positions
                    </button>
                </div>
            )}

            {/* Feedback */}
            {!examMode && submitted && (
                <div style={{
                    marginTop: '20px', padding: '15px', borderRadius: '8px',
                    backgroundColor: feedback.isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${feedback.isCorrect ? '#22c55e' : '#ef4444'}`,
                    display: 'flex', alignItems: 'center', gap: '10px', color: feedback.isCorrect ? '#4ade80' : '#f87171'
                }}>
                    {feedback.isCorrect ? <Check size={24} /> : <X size={24} />}
                    <span style={{ fontWeight: 'bold' }}>
                        {feedback.isCorrect ? "Perfect! All elements are panned correctly." : "Some elements are in the wrong position. Check the markers and try again."}
                    </span>
                    {!feedback.isCorrect && (
                        <button
                            onClick={() => { setSubmitted(false); setFeedback({ isCorrect: false, details: {} }); }}
                            style={{ marginLeft: 'auto', padding: '5px 10px', backgroundColor: 'transparent', border: '1px solid currentColor', color: 'inherit', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Retry
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
