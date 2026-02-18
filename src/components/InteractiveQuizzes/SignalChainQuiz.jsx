import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, CheckCircle2, XCircle, ArrowDown } from 'lucide-react';

// --- Sortable Item Component ---
function SortableItem({ id, item, disabled, isCorrect, isIncorrect }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: '10px',
    };

    // Dynamic styling based on state
    let borderColor = 'rgba(255,255,255,0.1)';
    let bg = 'rgba(30, 41, 59, 0.7)';

    if (isCorrect) {
        borderColor = 'var(--accent-success, #22c55e)';
        bg = 'rgba(34, 197, 94, 0.1)';
    } else if (isIncorrect) {
        borderColor = 'var(--accent-error, #991b1b)';
    }

    return (
        <div ref={setNodeRef} style={style} className="sortable-item-wrapper">
            <div
                className="sortable-item"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    background: bg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    cursor: disabled ? 'default' : 'grab',
                    touchAction: 'none' // For mobile capability
                }}
            >
                <div {...attributes} {...listeners} style={{ marginRight: '12px', cursor: disabled ? 'default' : 'grab', opacity: 0.5 }}>
                    <GripVertical size={20} />
                </div>
                <span style={{ fontSize: '1rem', fontWeight: '500' }}>{item}</span>
            </div>
            {/* Visual connector line between items */}
            <div className="connector-line" style={{ display: 'flex', justifyContent: 'center', height: '10px', opacity: 0.3 }}>
                {!disabled && <ArrowDown size={14} />}
            </div>
        </div>
    );
}

// --- Main Quiz Component ---
export default function SignalChainQuiz({ items = [], correctOrder = [], onResult }) {
    // Local state for the list items
    const [listItems, setListItems] = useState(items);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Reset when inputs change
    useEffect(() => {
        setListItems(items);
        setIsSubmitted(false);
        setIsCorrect(false);
    }, [items]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // minimum drag distance before activating
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (isSubmitted) return;

        if (active.id !== over.id) {
            setListItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleCheck = () => {
        setIsSubmitted(true);
        // Compare arrays
        const isOrderCorrect = JSON.stringify(listItems) === JSON.stringify(correctOrder);
        setIsCorrect(isOrderCorrect);

        if (onResult) {
            onResult(isOrderCorrect);
        }
    };

    return (
        <div className="signal-chain-quiz" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            <p style={{ marginTop: 0, marginBottom: '20px', color: '#94a3b8' }}>
                Drag the items into the correct <strong>Signal Flow</strong> order (Top to Bottom).
            </p>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={listItems}
                    strategy={verticalListSortingStrategy}
                >
                    {listItems.map((item, index) => (
                        <SortableItem
                            key={item}
                            id={item}
                            item={item}
                            disabled={isSubmitted}
                            isCorrect={isSubmitted && isCorrect}
                            isIncorrect={isSubmitted && !isCorrect && listItems[index] !== correctOrder[index]}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            {!isSubmitted ? (
                <button
                    onClick={handleCheck}
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    Check Signal Chain
                </button>
            ) : (
                <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', background: isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: isCorrect ? '1px solid #22c55e' : '1px solid #ef4444', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isCorrect ? <CheckCircle2 color="#22c55e" /> : <XCircle color="#ef4444" />}
                    <span style={{ fontWeight: 'bold' }}>
                        {isCorrect ? "Perfect! The Audio Signal is flowing." : "Silence. The signal is broken."}
                    </span>
                </div>
            )}

            {isSubmitted && !isCorrect && (
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '10px' }}>
                    <p><strong>Correct Order:</strong> {correctOrder.join(' → ')}</p>
                </div>
            )}
        </div>
    );
}
