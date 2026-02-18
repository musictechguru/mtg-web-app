import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

// --- Draggable Term Component ---
function DraggableTerm({ id, term, isDragging }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="draggable-term"
        >
            <div
                style={{
                    padding: '10px 16px',
                    background: isDragging ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    borderRadius: '6px',
                    cursor: 'grab',
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    opacity: isDragging ? 0.5 : 1,
                }}
            >
                {term}
            </div>
        </div>
    );
}

// --- Droppable Box Component ---
function DroppableBox({ id, label, droppedTerm, isCorrect, isIncorrect, isSubmitted }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    let borderColor = 'rgba(255,255,255,0.2)';
    let bg = 'rgba(30, 41, 59, 0.5)';

    if (isOver && !isSubmitted) {
        borderColor = 'rgba(59, 130, 246, 0.8)';
        bg = 'rgba(59, 130, 246, 0.1)';
    }

    if (isSubmitted) {
        if (isCorrect) {
            borderColor = '#22c55e';
            bg = 'rgba(34, 197, 94, 0.1)';
        } else if (isIncorrect) {
            borderColor = '#ef4444';
            bg = 'rgba(239, 68, 68, 0.1)';
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={{
                minWidth: '140px',
                minHeight: '60px',
                padding: '12px',
                background: bg,
                border: `2px dashed ${borderColor}`,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.2s ease',
            }}
        >
            {label && (
                <div
                    style={{
                        fontSize: '0.75rem',
                        color: '#94a3b8',
                        marginBottom: '4px',
                        fontWeight: '600',
                    }}
                >
                    {label}
                </div>
            )}
            {droppedTerm ? (
                <div
                    style={{
                        padding: '8px 12px',
                        background: 'rgba(59, 130, 246, 0.2)',
                        border: '1px solid rgba(59, 130, 246, 0.5)',
                        borderRadius: '6px',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                    }}
                >
                    {droppedTerm}
                </div>
            ) : (
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                    Drop here
                </div>
            )}
            {isSubmitted && isCorrect && (
                <CheckCircle2
                    size={16}
                    color="#22c55e"
                    style={{ position: 'absolute', top: '4px', right: '4px' }}
                />
            )}
            {isSubmitted && isIncorrect && (
                <XCircle
                    size={16}
                    color="#ef4444"
                    style={{ position: 'absolute', top: '4px', right: '4px' }}
                />
            )}
        </div>
    );
}

// --- Main Quiz Component ---
export default function SignalFlowLabelQuiz({
    flowSteps = [],
    terms = [],
    correctAnswers = {},
    initialAnswer = {},
    onAnswerChange,
    onResult,
}) {
    const [droppedTerms, setDroppedTerms] = useState(initialAnswer);
    const [availableTerms, setAvailableTerms] = useState(() => {
        // Filter out terms that are already placed
        const placedTerms = Object.values(initialAnswer);
        return terms.filter(term => !placedTerms.includes(term));
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDroppedTerms(initialAnswer);
        const placedTerms = Object.values(initialAnswer);
        setAvailableTerms(terms.filter(term => !placedTerms.includes(term)));
        setIsSubmitted(false);
    }, [terms, initialAnswer]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over || isSubmitted) return;

        const draggedTerm = active.id;
        const targetBox = over.id;

        // If dropping on a box
        if (flowSteps.some((step) => step.id === targetBox)) {
            // Remove term from previous box if it was already placed
            const newDroppedTerms = { ...droppedTerms };
            Object.keys(newDroppedTerms).forEach((key) => {
                if (newDroppedTerms[key] === draggedTerm) {
                    delete newDroppedTerms[key];
                }
            });

            // If box already has a term, return it to available
            if (newDroppedTerms[targetBox]) {
                setAvailableTerms([...availableTerms, newDroppedTerms[targetBox]]);
            }

            // Place new term
            newDroppedTerms[targetBox] = draggedTerm;
            setDroppedTerms(newDroppedTerms);

            // Sync with parent component
            if (onAnswerChange) {
                onAnswerChange(newDroppedTerms);
            }

            // Remove from available
            setAvailableTerms(availableTerms.filter((t) => t !== draggedTerm));
        }
    };

    const handleCheck = () => {
        setIsSubmitted(true);
        const isCorrect = Object.keys(correctAnswers).every(
            (key) => droppedTerms[key] === correctAnswers[key]
        );

        if (onResult) {
            onResult(isCorrect);
        }
    };

    const handleReset = () => {
        setDroppedTerms({});
        setAvailableTerms(terms);
        setIsSubmitted(false);
    };

    const isCorrect = (boxId) => {
        return isSubmitted && droppedTerms[boxId] === correctAnswers[boxId];
    };

    const isIncorrect = (boxId) => {
        return isSubmitted && droppedTerms[boxId] && droppedTerms[boxId] !== correctAnswers[boxId];
    };

    const allCorrect =
        isSubmitted &&
        Object.keys(correctAnswers).every((key) => droppedTerms[key] === correctAnswers[key]);

    return (
        <div
            className="signal-flow-label-quiz"
            style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '20px',
                borderRadius: '12px',
            }}
        >
            <p style={{ marginTop: 0, marginBottom: '20px', color: '#94a3b8' }}>
                Drag the terms into the correct boxes to complete the <strong>Signal Flow</strong>.
            </p>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                {/* Available Terms Bank */}
                <div
                    style={{
                        marginBottom: '24px',
                        padding: '16px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        borderRadius: '8px',
                    }}
                >
                    <div
                        style={{
                            fontSize: '0.85rem',
                            color: '#94a3b8',
                            marginBottom: '12px',
                            fontWeight: '600',
                        }}
                    >
                        Available Terms:
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {availableTerms.map((term) => (
                            <DraggableTerm
                                key={term}
                                id={term}
                                term={term}
                                isDragging={activeId === term}
                            />
                        ))}
                        {availableTerms.length === 0 && (
                            <div style={{ color: '#64748b', fontStyle: 'italic', fontSize: '0.9rem' }}>
                                All terms placed
                            </div>
                        )}
                    </div>
                </div>

                {/* Signal Flow Diagram */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    {flowSteps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <DroppableBox
                                id={step.id}
                                label={step.label}
                                droppedTerm={droppedTerms[step.id]}
                                isCorrect={isCorrect(step.id)}
                                isIncorrect={isIncorrect(step.id)}
                                isSubmitted={isSubmitted}
                            />
                            {index < flowSteps.length - 1 && (
                                <ArrowRight size={24} color="#64748b" style={{ flexShrink: 0 }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <DragOverlay>
                    {activeId ? (
                        <div
                            style={{
                                padding: '10px 16px',
                                background: 'rgba(59, 130, 246, 0.3)',
                                border: '1px solid rgba(59, 130, 246, 0.5)',
                                borderRadius: '6px',
                                fontWeight: '500',
                                fontSize: '0.9rem',
                                cursor: 'grabbing',
                            }}
                        >
                            {activeId}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            {/* Action Buttons */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {!isSubmitted ? (
                    <button
                        onClick={handleCheck}
                        className="btn-primary"
                        style={{ flex: 1 }}
                        disabled={Object.keys(droppedTerms).length !== flowSteps.length}
                    >
                        Check Signal Flow
                    </button>
                ) : (
                    <button onClick={handleReset} className="btn-secondary" style={{ flex: 1 }}>
                        Try Again
                    </button>
                )}
            </div>

            {/* Result Feedback */}
            {isSubmitted && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '15px',
                        borderRadius: '8px',
                        background: allCorrect
                            ? 'rgba(34, 197, 94, 0.2)'
                            : 'rgba(239, 68, 68, 0.2)',
                        border: allCorrect ? '1px solid #22c55e' : '1px solid #ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    {allCorrect ? (
                        <CheckCircle2 color="#22c55e" />
                    ) : (
                        <XCircle color="#ef4444" />
                    )}
                    <span style={{ fontWeight: 'bold' }}>
                        {allCorrect
                            ? 'Perfect! The signal is flowing correctly.'
                            : 'Not quite right. Check the highlighted boxes.'}
                    </span>
                </div>
            )}

            {isSubmitted && !allCorrect && (
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '10px' }}>
                    <p>
                        <strong>Hint:</strong> Check the boxes marked with red X icons.
                    </p>
                </div>
            )}
        </div>
    );
}
