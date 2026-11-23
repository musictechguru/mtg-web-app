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
import { CheckCircle2, XCircle, ArrowDown } from 'lucide-react';

// --- Draggable Term Component ---
function DraggableTerm({ id, term, isDragging, onClick }) {
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
            onClick={onClick}
            className="draggable-term"
        >
            <div
                style={{
                    padding: '10px 16px',
                    background: isDragging ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    borderRadius: '6px',
                    cursor: 'pointer',
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
function DroppableBox({ id, label, droppedTerm, isCorrect, isIncorrect, isSubmitted, onRemove }) {
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
                width: '100%',
                minHeight: '56px',
                padding: '12px 16px',
                background: bg,
                border: `2px dashed ${borderColor}`,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap',
                position: 'relative',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease',
            }}
        >
            {label && (
                <div
                    style={{
                        fontSize: '0.85rem',
                        color: '#cbd5e1',
                        fontWeight: '600',
                    }}
                >
                    {label}
                </div>
            )}
            {droppedTerm ? (
                <div
                    onClick={() => { if (!isSubmitted && onRemove) onRemove(id); }}
                    title={!isSubmitted ? 'Click to return to term bank' : undefined}
                    style={{
                        padding: '7px 14px',
                        background: 'rgba(59, 130, 246, 0.22)',
                        border: '1px solid rgba(59, 130, 246, 0.55)',
                        borderRadius: '6px',
                        fontWeight: '600',
                        fontSize: '0.88rem',
                        color: '#fff',
                        cursor: !isSubmitted ? 'pointer' : 'default',
                    }}
                >
                    {droppedTerm}
                </div>
            ) : (
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                    Drop or click term
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

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

// --- Main Quiz Component ---
export default function SignalFlowLabelQuiz({
    flowSteps = EMPTY_ARRAY,
    terms = EMPTY_ARRAY,
    correctAnswers = EMPTY_OBJECT,
    initialAnswer = EMPTY_OBJECT,
    hideArrows = false,
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

    const termsKey = terms.join('|');
    const initialAnswerKey = JSON.stringify(initialAnswer);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDroppedTerms(initialAnswer);
        const placedTerms = Object.values(initialAnswer);
        setAvailableTerms(terms.filter(term => !placedTerms.includes(term)));
        setIsSubmitted(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [termsKey, initialAnswerKey]);

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

            // Place new term
            newDroppedTerms[targetBox] = draggedTerm;
            setDroppedTerms(newDroppedTerms);

            // Sync with parent component
            if (onAnswerChange) {
                onAnswerChange(newDroppedTerms);
            }

            // Recompute available terms directly so displaced terms never vanish
            const placed = Object.values(newDroppedTerms);
            setAvailableTerms(terms.filter((t) => !placed.includes(t)));
        }
    };

    const handleTermClick = (term) => {
        if (isSubmitted) return;
        const firstEmptyStep = flowSteps.find((step) => !droppedTerms[step.id]);
        if (!firstEmptyStep) return;

        const newDroppedTerms = { ...droppedTerms, [firstEmptyStep.id]: term };
        setDroppedTerms(newDroppedTerms);
        setAvailableTerms(availableTerms.filter((t) => t !== term));
        if (onAnswerChange) {
            onAnswerChange(newDroppedTerms);
        }
    };

    const handleRemoveFromBox = (boxId) => {
        if (isSubmitted || !droppedTerms[boxId]) return;
        const removedTerm = droppedTerms[boxId];
        const newDroppedTerms = { ...droppedTerms };
        delete newDroppedTerms[boxId];
        setDroppedTerms(newDroppedTerms);
        setAvailableTerms([...availableTerms, removedTerm]);
        if (onAnswerChange) {
            onAnswerChange(newDroppedTerms);
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
                {hideArrows ? (
                    <>Drag (or click) each term into its matching box below.</>
                ) : (
                    <>Drag (or click) each term into the matching numbered box in the <strong>Signal Flow</strong>.</>
                )}
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
                                onClick={() => handleTermClick(term)}
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
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
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
                                onRemove={handleRemoveFromBox}
                            />
                            {!hideArrows && index < flowSteps.length - 1 && (
                                <ArrowDown size={20} color="#64748b" style={{ flexShrink: 0 }} />
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
                        style={{
                            flex: 1,
                            opacity: Object.keys(droppedTerms).length !== flowSteps.length ? 0.45 : 1,
                            cursor: Object.keys(droppedTerms).length !== flowSteps.length ? 'not-allowed' : 'pointer',
                        }}
                        disabled={Object.keys(droppedTerms).length !== flowSteps.length}
                    >
                        {hideArrows ? 'Check Matches' : 'Check Signal Flow'}
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
                            ? (hideArrows ? 'Perfect! All items are matched correctly.' : 'Perfect! The signal is flowing correctly.')
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
