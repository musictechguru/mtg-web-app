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
import { CheckCircle2, XCircle } from 'lucide-react';
import './TimelineQuiz.css';

// --- Draggable Item Component ---
function DraggableItem({ item, isDragging, isSubmitted, isCorrect }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
    });

    const style = transform && !isDragging
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    let className = "timeline-item";
    if (isDragging) className += " dragging";
    if (isSubmitted) {
        className += isCorrect ? " correct" : " incorrect";
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={className}
            title={item.text}
        >
            {item.img && (
                <img
                    src={`/${item.img}`}
                    alt={item.text}
                    className="timeline-item-img"
                    draggable="false"
                />
            )}
            <div className="timeline-item-text">{item.text}</div>

            {isSubmitted && (
                <div className="timeline-item-icon">
                    {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                </div>
            )}
        </div>
    );
}

// --- Droppable Decade Component ---
function DroppableDecade({ decade, items, isSubmitted, checkItemCorrectness, activeId }) {
    const { isOver, setNodeRef } = useDroppable({
        id: decade,
    });

    return (
        <div
            ref={setNodeRef}
            className={`decade-box ${isOver && !isSubmitted ? "is-over" : ""}`}
        >
            <div className="decade-label">{decade}</div>
            <div className="decade-items">
                {items.map((item) => (
                    <DraggableItem
                        key={item.id}
                        item={item}
                        isDragging={activeId === item.id}
                        isSubmitted={isSubmitted}
                        isCorrect={checkItemCorrectness(item.id)}
                    />
                ))}
                {items.length === 0 && (
                    <div style={{ color: "#64748b", fontStyle: "italic", fontSize: "0.9rem", marginTop: "10px" }}>
                        Drop here
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Main Timeline Quiz Component ---
export default function TimelineQuiz({ question, onResult, examMode = false, showAnswers = false, initialAnswers = {}, onValuesChange = null }) {
    const [placedItems, setPlacedItems] = useState(examMode ? initialAnswers : {}); // { itemId: decadeId }
    const [shuffledItems, setShuffledItems] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(examMode ? showAnswers : false);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        if (!examMode) {
            setPlacedItems({});
            setIsSubmitted(false);
        } else {
            setPlacedItems(prev => {
                // Only update if the answers stringified are different, avoiding infinite re-renders
                if (JSON.stringify(prev) !== JSON.stringify(initialAnswers)) {
                    return initialAnswers || {};
                }
                return prev;
            });
            setIsSubmitted(showAnswers);
        }

        // Fisher-Yates Shuffle for the items
        if (question && question.items) {
            const itemsCopy = [...question.items];
            for (let i = itemsCopy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [itemsCopy[i], itemsCopy[j]] = [itemsCopy[j], itemsCopy[i]];
            }
            // Only shuffle if we don't already have exactly these items
            setShuffledItems(prev => {
                if (prev.length === itemsCopy.length && prev.every(item => itemsCopy.find(i => i.id === item.id))) {
                    return prev;
                }
                return itemsCopy;
            });
        }
    }, [question, examMode, showAnswers, JSON.stringify(initialAnswers)]);

    // Adjust distance constraint so clicks still work easily
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor)
    );

    const handleDragStart = (event) => {
        if (isSubmitted && !examMode) return;
        if (examMode && showAnswers) return; // Cannot drag if showAnswers in exam mode
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        setActiveId(null);
        const { active, over } = event;
        if (!over) return;
        if (isSubmitted && !examMode) return;
        if (examMode && showAnswers) return;

        setPlacedItems(prev => {
            const newPlaced = { ...prev };
            if (over.id === 'bank') {
                delete newPlaced[active.id];
            } else {
                newPlaced[active.id] = over.id;
            }
            if (examMode && onValuesChange) {
                onValuesChange(newPlaced);
            }
            return newPlaced;
        });
    };

    const handleCheck = () => {
        setIsSubmitted(true);
        const allCorrect = question.items.every(item => placedItems[item.id] === item.targetDecade);
        if (onResult) {
            onResult(allCorrect);
        }
    };

    const handleReset = () => {
        setPlacedItems({});
        setIsSubmitted({});
    };

    const checkItemCorrectness = (itemId) => {
        const item = question.items.find(i => i.id === itemId);
        if (!item) return false;
        return placedItems[itemId] === item.targetDecade;
    };

    const unplacedItems = shuffledItems.filter(item =>
        !placedItems[item.id] || (activeId === item.id && !placedItems[item.id])
    );
    const activeItem = question.items.find(i => i.id === activeId);

    // Set up the Bank as a droppable area to return items
    const { setNodeRef: setBankNodeRef, isOver: isBankOver } = useDroppable({ id: 'bank' });

    const allItemsPlaced = Object.keys(placedItems).length === question.items.length;
    const allCorrect = isSubmitted && question.items.every(i => placedItems[i.id] === i.targetDecade);

    return (
        <div className="timeline-quiz-container">
            {!examMode && (question.content || question.question) && (
                <p style={{ margin: 0, color: '#94a3b8' }}>
                    {question.content || question.question}
                </p>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div
                    ref={setBankNodeRef}
                    className={`timeline-bank ${isBankOver && !isSubmitted ? "is-over" : ""}`}
                >
                    {unplacedItems.map(item => (
                        <DraggableItem
                            key={item.id}
                            item={item}
                            isDragging={activeId === item.id}
                            isSubmitted={false}
                            isCorrect={false}
                        />
                    ))}
                    {unplacedItems.length === 0 && (
                        <div style={{ color: "#64748b", fontStyle: "italic", fontSize: "0.9rem", paddingLeft: "5px" }}>
                            All items placed
                        </div>
                    )}
                </div>

                <div className="timeline-decades">
                    {question.decades.map(decade => (
                        <DroppableDecade
                            key={decade}
                            decade={decade}
                            items={question.items.filter(i =>
                                placedItems[i.id] === decade || (activeId === i.id && placedItems[i.id] === decade)
                            )}
                            isSubmitted={isSubmitted}
                            checkItemCorrectness={checkItemCorrectness}
                            activeId={activeId}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeItem ? (
                        <div className="drag-overlay-item" style={{ width: '140px', boxSizing: 'border-box' }}>
                            {activeItem.img && (
                                <img
                                    src={`/${activeItem.img}`}
                                    alt={activeItem.text}
                                    className="timeline-item-img"
                                    style={{ maxWidth: '90px', maxHeight: '90px', minHeight: '90px', pointerEvents: 'none', objectFit: 'contain' }}
                                />
                            )}
                            <div className="timeline-item-text">{activeItem.text}</div>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            {!examMode && (
                <div className="timeline-controls">
                    {!isSubmitted ? (
                        <button
                            className="btn-primary"
                            style={{ flex: 1 }}
                            onClick={handleCheck}
                            disabled={!allItemsPlaced}
                        >
                            Check Answers
                        </button>
                    ) : (
                        <button className="btn-secondary" style={{ flex: 1 }} onClick={handleReset}>
                            Try Again
                        </button>
                    )}
                </div>
            )}

            {!examMode && isSubmitted && (
                <div style={{
                    padding: '15px',
                    borderRadius: '8px',
                    background: allCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    border: allCorrect ? '1px solid #22c55e' : '1px solid #ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    {allCorrect ? (
                        <><CheckCircle2 color="#22c55e" /><span style={{ fontWeight: 'bold' }}>Perfect! All items are in the correct decade.</span></>
                    ) : (
                        <><XCircle color="#ef4444" /><span style={{ fontWeight: 'bold' }}>Not quite right. Check the highlighted items and try again.</span></>
                    )}
                </div>
            )}

            {((isSubmitted && allCorrect) || (examMode && showAnswers)) && (
                <div className="timeline-explanations">
                    <h3 style={{ color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginTop: '10px' }}>
                        Timeline Explanations
                    </h3>
                    {question.items.map(item => (
                        item.explanation ? (
                            <div key={item.id} className="timeline-explanation-card" style={{
                                background: 'rgba(30, 41, 59, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                padding: '15px',
                                marginTop: '15px'
                            }}>
                                <h4 style={{ color: '#3b82f6', marginTop: 0, marginBottom: '10px' }}>{item.targetDecade}: {item.text}</h4>
                                <div dangerouslySetInnerHTML={{ __html: item.explanation }} style={{ color: '#cbd5e1', lineHeight: '1.6' }} />
                                {item.expert_quote && (
                                    <blockquote style={{
                                        borderLeft: '4px solid #8b5cf6',
                                        background: 'rgba(139, 92, 246, 0.1)',
                                        padding: '10px 15px',
                                        margin: '15px 0 0 0',
                                        borderRadius: '0 8px 8px 0',
                                        fontSize: '0.95rem',
                                        fontStyle: 'italic',
                                        color: '#e2e8f0'
                                    }}>
                                        "{item.expert_quote.text}"
                                    </blockquote>
                                )}
                            </div>
                        ) : null
                    ))}
                </div>
            )}
        </div>
    );
}
