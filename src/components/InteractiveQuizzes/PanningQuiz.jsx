import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

const formatZoneLabel = (label = '') =>
    label
        .replace(/\bCenter\b/gi, 'Centre')
        .replace(/Hard Left/i, 'Hard L')
        .replace(/Mid Left/i, 'Mid L')
        .replace(/Hard Right/i, 'Hard R')
        .replace(/Mid Right/i, 'Mid R');

const NODE_COLORS = ['#38bdf8', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'];

export default function PanningQuiz({ question, initialAnswers, onAnswersChange, examMode, showAnswers, onResult }) {
    const [elementPositions, setElementPositions] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState({ isCorrect: false, details: {} });

    useEffect(() => {
        setElementPositions(initialAnswers || {});
        setSubmitted(false);
        setFeedback({ isCorrect: false, details: {} });
    }, [initialAnswers, question]);

    const zones = [...(question.zones || [])].sort((a, b) => a.angle - b.angle);
    const elements = question.elements || [];

    const handleSelectZone = (elId, zoneId) => {
        if (examMode && submitted) return;
        const next = { ...elementPositions, [elId]: zoneId };
        setElementPositions(next);
        if (submitted) setSubmitted(false);
        if (onAnswersChange) onAnswersChange(next);
    };

    const checkAnswer = () => {
        let allCorrect = true;
        const details = {};

        elements.forEach(el => {
            const isCorrect = elementPositions[el.id] === el.targetZone;
            if (!isCorrect) allCorrect = false;
            details[el.id] = isCorrect;
        });

        setFeedback({ isCorrect: allCorrect, details });
        setSubmitted(true);
        if (onResult) onResult(allCorrect);
    };

    const allPlaced = elements.length > 0 && elements.every(el => Boolean(elementPositions[el.id]));

    // Map angle (0=Left, 90=Centre, 180=Right) onto SVG viewBox (0..400, 0..130)
    const getSvgPoint = (angle, distance = 0.8) => {
        const mathAngle = (180 - angle) * (Math.PI / 180);
        const r = 135 * distance;
        return {
            x: 200 + Math.cos(mathAngle) * r,
            y: 112 - Math.sin(mathAngle) * r * 0.72,
        };
    };

    // Group placed elements by zone so live SVG dots never sit directly on top of each other
    const zoneBuckets = {};
    elements.forEach((el, idx) => {
        const zId = elementPositions[el.id];
        if (!zId) return;
        if (!zoneBuckets[zId]) zoneBuckets[zId] = [];
        zoneBuckets[zId].push({ el, num: idx + 1, color: NODE_COLORS[idx % NODE_COLORS.length] });
    });

    return (
        <div style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '4px' }}>{question.question}</h3>
                {question.hint && (
                    <p style={{ color: '#94a3b8', fontSize: '0.84rem', margin: 0 }}>
                        {question.hint.replace(/\bCenter\b/gi, 'Centre')}
                    </p>
                )}
            </div>

            {/* Live Compact Stereo Soundstage Preview */}
            <div style={{
                backgroundColor: '#0f172a',
                borderRadius: '10px',
                border: '1px solid #334155',
                padding: '8px 10px 4px',
                marginBottom: '14px',
            }}>
                <svg viewBox="0 0 400 132" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    {/* Semicircle arc */}
                    <path
                        d="M 55 112 A 145 104 0 0 1 345 112"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                    />
                    <line x1="40" y1="112" x2="360" y2="112" stroke="#475569" strokeWidth="1.5" />

                    {/* Zone markers */}
                    {zones.map(z => {
                        const pt = getSvgPoint(z.angle, 0.85);
                        return (
                            <g key={z.id}>
                                <circle cx={pt.x} cy={pt.y} r="4" fill="#334155" />
                            </g>
                        );
                    })}

                    {/* Placed numbered instrument markers */}
                    {Object.entries(zoneBuckets).map(([zoneId, items]) => {
                        const zone = zones.find(z => z.id === zoneId);
                        if (!zone) return null;
                        const base = getSvgPoint(zone.angle, 0.82);

                        return items.map((item, stackIdx) => {
                            const offsetX = (stackIdx - (items.length - 1) / 2) * 20;
                            const cy = base.y - (items.length > 1 ? 10 : 0);
                            return (
                                <g key={item.el.id}>
                                    <circle
                                        cx={base.x + offsetX}
                                        cy={cy}
                                        r="10"
                                        fill={item.color}
                                        stroke="#0f172a"
                                        strokeWidth="2"
                                    />
                                    <text
                                        x={base.x + offsetX}
                                        y={cy + 3.5}
                                        textAnchor="middle"
                                        fill="#0f172a"
                                        fontSize="10"
                                        fontWeight="800"
                                    >
                                        {item.num}
                                    </text>
                                </g>
                            );
                        });
                    })}

                    {/* Axis labels */}
                    <text x="48" y="126" textAnchor="start" fill="#64748b" fontSize="9.5" fontWeight="700">HARD LEFT</text>
                    <text x="200" y="126" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="700">CENTRE</text>
                    <text x="352" y="126" textAnchor="end" fill="#64748b" fontSize="9.5" fontWeight="700">HARD RIGHT</text>
                </svg>
            </div>

            {/* Channel Strip Pan Selectors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {elements.map((el, idx) => {
                    const selectedZone = elementPositions[el.id];
                    let isCorrect = null;
                    if (showAnswers) {
                        isCorrect = selectedZone === el.targetZone;
                    } else if (submitted && !examMode) {
                        isCorrect = feedback.details[el.id];
                    }

                    const borderColor = isCorrect === true
                        ? '#22c55e'
                        : isCorrect === false
                            ? '#ef4444'
                            : '#334155';

                    return (
                        <div
                            key={el.id}
                            style={{
                                backgroundColor: '#0f172a',
                                border: `1.5px solid ${borderColor}`,
                                borderRadius: '10px',
                                padding: '10px 12px',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: NODE_COLORS[idx % NODE_COLORS.length],
                                        color: '#0f172a',
                                        fontSize: '0.75rem',
                                        fontWeight: '800',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        {idx + 1}
                                    </span>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#f1f5f9' }}>
                                        {el.content}
                                    </span>
                                </div>
                                {isCorrect === true && <Check size={16} color="#4ade80" strokeWidth={3} />}
                                {isCorrect === false && <X size={16} color="#f87171" strokeWidth={3} />}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${zones.length}, minmax(0, 1fr))`, gap: '5px' }}>
                                {zones.map(zone => {
                                    const active = selectedZone === zone.id;
                                    const disabled = examMode && submitted;
                                    return (
                                        <button
                                            key={zone.id}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => handleSelectZone(el.id, zone.id)}
                                            style={{
                                                padding: '7px 4px',
                                                borderRadius: '6px',
                                                border: active ? '1.5px solid #38bdf8' : '1px solid #334155',
                                                backgroundColor: active ? '#1d4ed8' : '#1e293b',
                                                color: active ? '#ffffff' : '#cbd5e1',
                                                fontSize: '0.75rem',
                                                fontWeight: active ? '700' : '600',
                                                cursor: disabled ? 'default' : 'pointer',
                                                whiteSpace: 'nowrap',
                                                transition: 'all 0.12s ease',
                                            }}
                                        >
                                            {formatZoneLabel(zone.label || zone.id)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Check Positions Button */}
            {!examMode && !submitted && (
                <div style={{ marginTop: '14px', textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={checkAnswer}
                        disabled={!allPlaced}
                        style={{
                            width: '100%',
                            padding: '11px 20px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: '700',
                            fontSize: '0.92rem',
                            cursor: allPlaced ? 'pointer' : 'not-allowed',
                            opacity: allPlaced ? 1 : 0.5,
                        }}
                    >
                        Check Positions
                    </button>
                </div>
            )}

            {/* Feedback Banner */}
            {!examMode && submitted && (
                <div style={{
                    marginTop: '14px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: feedback.isCorrect ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                    border: `1px solid ${feedback.isCorrect ? '#22c55e' : '#ef4444'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: feedback.isCorrect ? '#4ade80' : '#f87171',
                }}>
                    {feedback.isCorrect ? <Check size={20} /> : <X size={20} />}
                    <span style={{ fontWeight: '700', fontSize: '0.88rem' }}>
                        {feedback.isCorrect
                            ? 'Perfect! All elements are panned correctly.'
                            : 'Some elements are in the wrong pan position. Adjust the red rows and check again.'}
                    </span>
                </div>
            )}
        </div>
    );
}
