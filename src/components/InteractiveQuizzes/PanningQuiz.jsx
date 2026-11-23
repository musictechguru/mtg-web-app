import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

const formatZoneLabel = (label = '') => label.replace(/\bCenter\b/gi, 'Centre');

function PoolElement({ id, content, isSelected, onClick }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        padding: '8px 12px',
        backgroundColor: isSelected ? '#2563eb' : '#1e293b',
        color: '#f8fafc',
        border: isSelected ? '2px solid #38bdf8' : '1px solid #475569',
        borderRadius: '8px',
        cursor: 'grab',
        zIndex: isDragging ? 100 : 10,
        fontWeight: '600',
        fontSize: '0.85rem',
        boxShadow: isSelected ? '0 0 0 3px rgba(56, 189, 248, 0.25)' : '0 2px 6px rgba(0,0,0,0.3)',
        userSelect: 'none',
        touchAction: 'none',
        transition: 'border-color 0.15s ease, background-color 0.15s ease',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={onClick}
            {...listeners}
            {...attributes}
        >
            {content}
        </div>
    );
}

function PlacedElement({ id, content, leftPct, topPct, stackOffsetPx, isCorrect, onRemove, disabled }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled });
    const bg = isCorrect === true
        ? '#166534'
        : isCorrect === false
            ? '#991b1b'
            : '#2563eb';
    const border = isCorrect === true
        ? '1.5px solid #22c55e'
        : isCorrect === false
            ? '1.5px solid #ef4444'
            : '1.5px solid #60a5fa';

    const style = {
        position: 'absolute',
        left: `${leftPct}%`,
        top: `calc(${topPct}% - ${stackOffsetPx}px)`,
        transform: transform
            ? `translate3d(calc(-50% + ${transform.x}px), calc(-50% + ${transform.y}px), 0)`
            : 'translate(-50%, -50%)',
        padding: '6px 10px',
        backgroundColor: bg,
        border,
        color: '#ffffff',
        borderRadius: '8px',
        cursor: disabled ? 'default' : 'pointer',
        zIndex: isDragging ? 100 : 20,
        fontWeight: '700',
        fontSize: '0.8rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.45)',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        userSelect: 'none',
        touchAction: 'none',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            title={disabled ? content : 'Click to return to list or drag to another zone'}
            onClick={(e) => {
                e.stopPropagation();
                if (!disabled && onRemove) onRemove(id);
            }}
            {...listeners}
            {...attributes}
        >
            <span>{content}</span>
            {isCorrect === true && <Check size={14} color="#86efac" strokeWidth={3} />}
            {isCorrect === false && <X size={14} color="#fca5a5" strokeWidth={3} />}
        </div>
    );
}

function DroppableZone({ id, label, leftPct, topPct, showHint, hasSelected, onZoneClick }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    const style = {
        position: 'absolute',
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: 'translate(-50%, -50%)',
        minWidth: '78px',
        height: '44px',
        padding: '0 10px',
        borderRadius: '999px',
        backgroundColor: isOver
            ? 'rgba(34, 197, 94, 0.28)'
            : hasSelected
                ? 'rgba(56, 189, 248, 0.16)'
                : showHint
                    ? 'rgba(255, 255, 255, 0.06)'
                    : 'transparent',
        border: isOver
            ? '2px solid #22c55e'
            : hasSelected
                ? '1.5px dashed #38bdf8'
                : showHint
                    ? '1.5px dashed #475569'
                    : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hasSelected ? '#bae6fd' : '#94a3b8',
        fontSize: '0.72rem',
        fontWeight: '600',
        letterSpacing: '0.02em',
        cursor: hasSelected ? 'pointer' : 'default',
        zIndex: 5,
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
    };

    return (
        <div ref={setNodeRef} style={style} onClick={() => onZoneClick(id)}>
            {label}
        </div>
    );
}

export default function PanningQuiz({ question, initialAnswers, onAnswersChange, examMode, showAnswers, onResult }) {
    const [elementPositions, setElementPositions] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState({ isCorrect: false, details: {} });

    useEffect(() => {
        setElementPositions(initialAnswers || {});
        setSelectedId(null);
        setSubmitted(false);
        setFeedback({ isCorrect: false, details: {} });
    }, [initialAnswers, question]);

    const updatePositions = (next) => {
        setElementPositions(next);
        if (onAnswersChange) onAnswersChange(next);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (examMode && submitted) return;

        if (over) {
            updatePositions({ ...elementPositions, [active.id]: over.id });
        } else {
            const next = { ...elementPositions };
            delete next[active.id];
            updatePositions(next);
        }
        setSelectedId(null);
    };

    const handleZoneClick = (zoneId) => {
        if ((examMode && submitted) || !selectedId) return;
        updatePositions({ ...elementPositions, [selectedId]: zoneId });
        setSelectedId(null);
    };

    const handleRemovePlaced = (elId) => {
        if (examMode && submitted) return;
        const next = { ...elementPositions };
        delete next[elId];
        updatePositions(next);
        if (submitted) setSubmitted(false);
    };

    const checkAnswer = () => {
        let allCorrect = true;
        const details = {};

        question.elements.forEach(el => {
            const isCorrect = elementPositions[el.id] === el.targetZone;
            if (!isCorrect) allCorrect = false;
            details[el.id] = isCorrect;
        });

        setFeedback({ isCorrect: allCorrect, details });
        setSubmitted(true);
        setSelectedId(null);
        if (onResult) onResult(allCorrect);
    };

    // Convert angle (0=Left, 90=Centre, 180=Right) & distanceRatio (0..1) into stage percentages
    // Baseline at 76% leaves room below for axis labels and keeps Hard Left/Right pills unclipped.
    const getZonePercent = (angle, distanceRatio) => {
        const mathAngle = (180 - angle) * (Math.PI / 180);
        const r = distanceRatio;
        return {
            leftPct: 50 + Math.cos(mathAngle) * r * 41,
            topPct: 76 - Math.sin(mathAngle) * r * 62,
        };
    };

    const unplacedElements = question.elements.filter(el => !elementPositions[el.id]);

    // Group placed elements by zone so multiple items in the same zone stack cleanly without overlapping
    const zoneBuckets = {};
    question.elements.forEach(el => {
        const zId = elementPositions[el.id];
        if (!zId) return;
        if (!zoneBuckets[zId]) zoneBuckets[zId] = [];
        zoneBuckets[zId].push(el);
    });

    return (
        <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>{question.question}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                    {question.hint ? `${formatZoneLabel(question.hint)} ` : ''}
                    Click an element then click a pan position (or drag and drop).
                </p>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                {/* Elements Pool */}
                <div style={{ marginBottom: '14px', padding: '12px', backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Elements to Place ({unplacedElements.length} remaining):
                    </div>
                    {unplacedElements.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {unplacedElements.map(el => (
                                <PoolElement
                                    key={el.id}
                                    id={el.id}
                                    content={el.content}
                                    isSelected={selectedId === el.id}
                                    onClick={() => setSelectedId(prev => prev === el.id ? null : el.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ color: '#64748b', fontStyle: 'italic', fontSize: '0.85rem' }}>
                            All elements placed — click any placed pill to move it back.
                        </div>
                    )}
                </div>

                {/* Responsive Semi-Circle Soundstage */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '290px',
                    backgroundColor: '#0f172a',
                    borderRadius: '240px 240px 10px 10px',
                    border: '1px solid #334155',
                    borderBottom: '3px solid #475569',
                    overflow: 'visible',
                }}>
                    {/* Semicircle guide arc */}
                    <div style={{
                        position: 'absolute',
                        left: '10%',
                        right: '10%',
                        top: '14%',
                        bottom: '24%',
                        borderTopLeftRadius: '999px',
                        borderTopRightRadius: '999px',
                        border: '1px dashed #334155',
                        borderBottom: 'none',
                        pointerEvents: 'none',
                    }} />

                    {/* Axis Labels */}
                    <div style={{ position: 'absolute', bottom: '10px', left: '16px', color: '#64748b', fontSize: '0.75rem', fontWeight: '700' }}>HARD LEFT</div>
                    <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', color: '#94a3b8', fontWeight: '700', fontSize: '0.9rem' }}>MIX CENTRE</div>
                    <div style={{ position: 'absolute', bottom: '10px', right: '16px', color: '#64748b', fontSize: '0.75rem', fontWeight: '700' }}>HARD RIGHT</div>

                    {/* Drop Zones */}
                    {question.zones.map(zone => {
                        const { leftPct, topPct } = getZonePercent(zone.angle, zone.distance);
                        return (
                            <DroppableZone
                                key={zone.id}
                                id={zone.id}
                                label={formatZoneLabel(zone.label || zone.id)}
                                leftPct={leftPct}
                                topPct={topPct}
                                showHint={!examMode && !submitted}
                                hasSelected={Boolean(selectedId)}
                                onZoneClick={handleZoneClick}
                            />
                        );
                    })}

                    {/* Placed Elements (stacked cleanly per zone so none overlap) */}
                    {Object.entries(zoneBuckets).map(([zoneId, items]) => {
                        const zone = question.zones.find(z => z.id === zoneId);
                        if (!zone) return null;
                        const { leftPct, topPct } = getZonePercent(zone.angle, zone.distance);

                        return items.map((el, idx) => {
                            let isCorrect = null;
                            if (showAnswers) {
                                isCorrect = zoneId === el.targetZone;
                            } else if (submitted && !examMode) {
                                isCorrect = feedback.details[el.id];
                            }

                            return (
                                <PlacedElement
                                    key={`placed-${el.id}`}
                                    id={el.id}
                                    content={el.content}
                                    leftPct={leftPct}
                                    topPct={topPct}
                                    stackOffsetPx={idx * 34}
                                    isCorrect={isCorrect}
                                    disabled={examMode && submitted}
                                    onRemove={handleRemovePlaced}
                                />
                            );
                        });
                    })}
                </div>
            </DndContext>

            {/* Controls */}
            {!examMode && !submitted && (
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <button
                        onClick={checkAnswer}
                        disabled={Object.keys(elementPositions).length < question.elements.length}
                        style={{
                            padding: '10px 22px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: '700',
                            cursor: Object.keys(elementPositions).length < question.elements.length ? 'not-allowed' : 'pointer',
                            opacity: Object.keys(elementPositions).length < question.elements.length ? 0.5 : 1,
                        }}
                    >
                        Check Positions
                    </button>
                </div>
            )}

            {/* Feedback */}
            {!examMode && submitted && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    backgroundColor: feedback.isCorrect ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                    border: `1px solid ${feedback.isCorrect ? '#22c55e' : '#ef4444'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: feedback.isCorrect ? '#4ade80' : '#f87171',
                }}>
                    {feedback.isCorrect ? <Check size={20} /> : <X size={20} />}
                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>
                        {feedback.isCorrect
                            ? 'Perfect! All elements are panned correctly.'
                            : 'Some elements are in the wrong position. Click a red pill to move it, or retry.'}
                    </span>
                    {!feedback.isCorrect && (
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setFeedback({ isCorrect: false, details: {} });
                                if (onResult) onResult(false);
                            }}
                            style={{
                                marginLeft: 'auto',
                                padding: '5px 12px',
                                backgroundColor: 'transparent',
                                border: '1px solid currentColor',
                                color: 'inherit',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600',
                            }}
                        >
                            Retry
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
