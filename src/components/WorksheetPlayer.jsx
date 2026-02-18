import React, { useState } from 'react';


const WorksheetPlayer = ({ activity, onFinish }) => {
    // State
    const [step, setStep] = useState('selection'); // selection, input, report
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [answers, setAnswers] = useState({});

    // If activity data is missing or malformed, fallback
    if (!activity || !activity.tracks) {
        return <div style={{ padding: 20 }}>Error: Invalid activity data.</div>;
    }

    const handleTrackSelect = (track) => {
        setSelectedTrack(track);
        setStep('input');
        window.scrollTo(0, 0);
    };

    /**
     * Handles both text input and MCQ selection.
     * @param {string} questionId 
     * @param {string} value - The text value or selected option text
     * @param {object} option - (Optional) The full option object for MCQs/Scoring
     */
    const handleInputChange = (questionId, value, option = null) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                value: value,
                score: option ? option.score : 0,
                summary: option ? option.summary : value
            }
        }));
    };

    const calculateScore = () => {
        if (!selectedTrack) return 0;
        const questionsToRender = selectedTrack.questions || activity.questions || [];
        let total = 0;

        questionsToRender.forEach(q => {
            if (answers[q.id] && answers[q.id].score) {
                total += answers[q.id].score;
            }
        });
        return total;
    };

    const handleSubmit = () => {
        // Here we could save progress to UserContext if needed
        setStep('report');
        window.scrollTo(0, 0);
    };

    // --- RENDERERS ---

    const renderSelection = () => (
        <div className="worksheet-selection">
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ marginBottom: '10px' }}>{activity.title}</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    {activity.description || "Select a scenario to begin your analysis."}
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                {activity.tracks.map((track, idx) => (
                    <div key={idx} style={{
                        background: 'var(--bg-panel)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        padding: '25px',
                        transition: 'transform 0.2s',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                        onClick={() => handleTrackSelect(track)}
                        className="track-card"
                    >
                        <div style={{ marginBottom: '15px' }}>
                            <span style={{
                                background: 'var(--accent-purple)',
                                color: 'white',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                letterSpacing: '0.5px'
                            }}>
                                {track.era}
                            </span>
                        </div>

                        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', lineHeight: '1.3' }}>{track.title}</h3>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>{track.artist}</div>

                        <div style={{ marginTop: 'auto' }}>
                            <button
                                className="btn-primary"
                                style={{ width: '100%', fontSize: '0.9rem', padding: '12px' }}
                            >
                                Start Comparison
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderInput = () => {
        if (!selectedTrack) return <div>Please select a track first.</div>;

        // Support both track-specific questions (Q5) and global activity questions (Activity 1 Legacy)
        const questionsToRender = selectedTrack.questions || activity.questions;

        if (!questionsToRender || questionsToRender.length === 0) {
            return <div style={{ color: 'var(--accent-error)', padding: 20, textAlign: 'center' }}>Error: No questions defined for this activity.</div>;
        }

        return (
            <div className="worksheet-input" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                    marginBottom: '40px',
                    background: 'var(--bg-panel)',
                    padding: '20px',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div>
                        <h2 style={{ margin: '0 0 5px 0' }}>{selectedTrack.title}</h2>
                        <span style={{ color: 'var(--text-secondary)' }}>{selectedTrack.artist}</span>
                    </div>
                    {selectedTrack.videoId && (
                        <a
                            href={`https://www.youtube.com/watch?v=${selectedTrack.videoId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary"
                            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <span>▶</span> Listen on YouTube
                        </a>
                    )}
                </div>

                {questionsToRender.map((q, idx) => (
                    <div key={q.id || idx} style={{ marginBottom: '40px', background: 'var(--bg-panel)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ color: 'var(--accent-blue)', marginBottom: '15px', fontSize: '1.1rem' }}>
                            {idx + 1}. {q.label}
                        </h3>
                        {q.helperText && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', fontStyle: 'italic' }}>
                                {q.helperText}
                            </p>
                        )}

                        {q.type === 'mcq' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {q.options.map((opt, optIdx) => {
                                    const isSelected = answers[q.id]?.value === opt.text;
                                    return (
                                        <label key={optIdx} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '16px',
                                            background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(0,0,0,0.2)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            border: isSelected ? '1px solid var(--accent-purple)' : '1px solid transparent',
                                            transition: 'all 0.2s ease'
                                        }}>
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={opt.text}
                                                checked={isSelected}
                                                onChange={() => handleInputChange(q.id, opt.text, opt)}
                                                style={{ marginRight: '15px', accentColor: 'var(--accent-purple)' }}
                                            />
                                            <span style={{ color: isSelected ? 'white' : '#ccc' }}>{opt.text}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        ) : (
                            <textarea
                                value={answers[q.id]?.value || ''} // Handle object structure
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                placeholder={q.placeholder || 'Type your analysis here...'}
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid #444',
                                    borderRadius: '8px',
                                    color: 'white',
                                    padding: '16px',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    resize: 'vertical'
                                }}
                            />
                        )}
                    </div>
                ))}

                <button
                    className="btn-primary"
                    style={{ width: '100%', padding: '20px', fontSize: '1.1rem', background: 'var(--accent-success)', borderRadius: '12px' }}
                    onClick={handleSubmit}
                >
                    Generate Analysis Report
                </button>
            </div>
        );
    };

    const renderReport = () => {
        if (!selectedTrack) return null;

        const score = calculateScore();
        const questionsToRender = selectedTrack.questions || activity.questions || [];

        // Generate the student's "essay" from their summaries (MCQ) or raw text
        const studentSummary = questionsToRender.map(q => {
            const ans = answers[q.id];
            if (!ans) return null;
            // Use specific summary if available, otherwise just the value
            return `• ${ans.summary || ans.value}`;
        }).filter(Boolean).join('\n\n');

        return (
            <div className="worksheet-report">
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ marginBottom: '15px' }}>Comparison Evaluation</h1>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        color: score >= 12 ? 'var(--accent-success)' : score >= 8 ? '#facc15' : 'var(--accent-error)',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        {score}/15
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>Based on technical accuracy and comparative depth.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Student Generated Answer */}
                    <div style={{ background: 'var(--bg-panel)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ color: 'var(--accent-purple)', borderBottom: '1px solid #444', paddingBottom: '20px', marginTop: 0, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                            📝 Your Final Answer (Generated)
                        </h3>
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#e0e0e0', fontSize: '0.95rem' }}>
                            {studentSummary || <span style={{ fontStyle: 'italic', color: '#666' }}>No analysis generated.</span>}
                        </div>
                    </div>

                    {/* Exemplar Answer */}
                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <h3 style={{ color: '#10b981', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', paddingBottom: '20px', marginTop: 0, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                            🏆 Mark Scheme Exemplar
                        </h3>
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#d1fae5', fontSize: '0.95rem' }}>
                            {selectedTrack.exemplar ? selectedTrack.exemplar : selectedTrack.critique ?
                                // Fallback for old activity format if 'critique' is an object
                                Object.entries(selectedTrack.critique).map(([k, v]) => `[${k.toUpperCase()}] ${v}`).join('\n\n')
                                : "No exemplar available."}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center' }}>
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            setStep('selection');
                            setSelectedTrack(null);
                            setAnswers({});
                            window.scrollTo(0, 0);
                        }}
                        style={{ padding: '12px 25px' }}
                    >
                        Choose Another Scenario
                    </button>
                    &nbsp;&nbsp;
                    <button
                        className="btn-primary"
                        onClick={onFinish}
                        style={{ padding: '12px 25px' }}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="worksheet-player-container" style={{ padding: '30px 20px', maxWidth: '1400px', margin: '0 auto' }}>
            <div
                style={{ marginBottom: '30px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}
                onClick={onFinish}
            >
                <span>←</span> Back
            </div>

            {step === 'selection' && renderSelection()}
            {step === 'input' && renderInput()}
            {step === 'report' && renderReport()}
        </div>
    );
};

export default WorksheetPlayer;
