import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

const WorksheetPlayer = ({ activity, onFinish }) => {
    const { saveQuizResult } = useUser();

    // State
    const [step, setStep] = useState('selection'); // selection, input, report
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showVideos, setShowVideos] = useState(true);

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

    /**
     * Handles Two-Tier (AO3 Fact + AO4 Evaluation) selections.
     */
    const handleTierChange = (questionId, tier, value, option = null) => {
        setAnswers(prev => {
            const currentQ = prev[questionId] || {};
            const updatedTier = {
                value: value,
                score: option ? option.score : 0,
                summary: option ? option.summary : value
            };
            const nextQ = {
                ...currentQ,
                [tier]: updatedTier
            };
            const ao3Score = nextQ.ao3?.score || 0;
            const ao4Score = nextQ.ao4?.score || 0;
            nextQ.score = ao3Score + ao4Score;
            return {
                ...prev,
                [questionId]: nextQ
            };
        });
    };

    const calculateScore = () => {
        if (!selectedTrack) return 0;
        const questionsToRender = selectedTrack.questions || activity.questions || [];
        let total = 0;

        questionsToRender.forEach(q => {
            if (answers[q.id]) {
                if (q.ao3 && q.ao4) {
                    total += (answers[q.id].ao3?.score || 0) + (answers[q.id].ao4?.score || 0);
                } else if (typeof answers[q.id].score === 'number') {
                    total += answers[q.id].score;
                }
            }
        });
        return total;
    };

    const calculateMaxScore = () => {
        if (!selectedTrack) return 15;
        const questionsToRender = selectedTrack.questions || activity.questions || [];
        const computed = questionsToRender.reduce((acc, q) => {
            if (q.ao3 && q.ao4) {
                const maxAo3 = Math.max(...(q.ao3.options || []).map(o => o.score || 0), q.ao3.points || 1);
                const maxAo4 = Math.max(...(q.ao4.options || []).map(o => o.score || 0), q.ao4.points || 2);
                return acc + maxAo3 + maxAo4;
            }
            if (q.type === 'mcq' && Array.isArray(q.options)) {
                const maxOpt = Math.max(...q.options.map(o => o.score || 0));
                return acc + (maxOpt > 0 ? maxOpt : 0);
            }
            return acc + (q.maxScore || 3);
        }, 0);
        return computed > 0 ? computed : 15;
    };

    const handleSubmit = () => {
        const score = calculateScore();
        const maxScore = calculateMaxScore();
        const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
        const grade = pct >= 80 ? 'A*' : pct >= 70 ? 'A' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : 'D';
        
        if (typeof saveQuizResult === 'function' && selectedTrack) {
            saveQuizResult(`${activity.title}: ${selectedTrack.title}`, score, maxScore, grade);
        }

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

        const vid1 = selectedTrack.videoId || selectedTrack.youtube_id;
        const vid2 = selectedTrack.videoId2 || selectedTrack.youtube_id_2;
        const title1 = selectedTrack.videoTitle1 || (vid2 ? 'Version A (Original)' : selectedTrack.title);
        const title2 = selectedTrack.videoTitle2 || 'Version B (Cover)';
        const hasVideos = Boolean(vid1 || vid2);

        return (
            <div className="worksheet-input" style={{ maxWidth: '840px', margin: '0 auto' }}>
                {/* Track Information Card */}
                <div style={{
                    marginBottom: '20px',
                    background: 'var(--bg-panel)',
                    padding: '20px 24px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '15px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                    <div>
                        <h2 style={{ margin: '0 0 5px 0', fontSize: '1.4rem' }}>{selectedTrack.title}</h2>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{selectedTrack.artist}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {hasVideos && (
                            <button
                                type="button"
                                onClick={() => setShowVideos(prev => !prev)}
                                className="btn-secondary"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.85rem',
                                    padding: '8px 14px',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.06)'
                                }}
                            >
                                <span>📺</span> {showVideos ? 'Hide Videos' : 'Show Videos'}
                            </button>
                        )}
                        {vid1 && (
                            <a
                                href={`https://www.youtube.com/watch?v=${vid1}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-secondary"
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.85rem',
                                    padding: '8px 14px',
                                    borderRadius: '8px'
                                }}
                                title="Open in new YouTube tab"
                            >
                                <span>▶</span> YouTube
                            </a>
                        )}
                    </div>
                </div>

                {/* Embedded YouTube Video Players */}
                {hasVideos && showVideos && (
                    <div style={{ marginBottom: '35px' }}>
                        {vid2 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '16px',
                                marginBottom: '10px'
                            }} className="worksheet-video-grid">
                                {/* Version A Video Embed */}
                                <div style={{
                                    background: 'rgba(15, 23, 42, 0.85)',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1.5px solid rgba(56, 189, 248, 0.4)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.35)'
                                }}>
                                    <div style={{
                                        background: 'linear-gradient(90deg, #0284c7, #0369a1)',
                                        color: '#ffffff',
                                        padding: '9px 14px',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title1}</span>
                                        <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.28)', padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>🎧 VERSION A</span>
                                    </div>
                                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                        <iframe
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                            src={`https://www.youtube.com/embed/${vid1}`}
                                            title={title1}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>

                                {/* Version B Video Embed */}
                                <div style={{
                                    background: 'rgba(15, 23, 42, 0.85)',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1.5px solid rgba(244, 63, 94, 0.4)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.35)'
                                }}>
                                    <div style={{
                                        background: 'linear-gradient(90deg, #e11d48, #be123c)',
                                        color: '#ffffff',
                                        padding: '9px 14px',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title2}</span>
                                        <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.28)', padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>🎧 VERSION B</span>
                                    </div>
                                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                        <iframe
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                            src={`https://www.youtube.com/embed/${vid2}`}
                                            title={title2}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Single Documentary / Exemplar Video Embed */
                            <div style={{
                                background: 'rgba(15, 23, 42, 0.85)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '1.5px solid rgba(168, 85, 247, 0.4)',
                                boxShadow: '0 6px 16px rgba(0,0,0,0.35)'
                            }}>
                                <div style={{
                                    background: 'linear-gradient(90deg, #7c3aed, #6d28d9)',
                                    color: '#ffffff',
                                    padding: '9px 14px',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span>{title1}</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(0,0,0,0.28)', padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>📹 AUDIO ENGINEERING DOCUMENTARY</span>
                                </div>
                                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                    <iframe
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                        src={`https://www.youtube.com/embed/${vid1}`}
                                        title={title1}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                💡 Listen closely to evaluate differences in Capture, EQ, Dynamics, Effects, and Stereo Width.
                            </span>
                        </div>
                    </div>
                )}

                {questionsToRender.map((q, idx) => (
                    <div key={q.id || idx} style={{ marginBottom: '40px', background: 'var(--bg-panel)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h3 style={{ color: 'var(--accent-blue)', margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>
                                {idx + 1}. {q.label}
                            </h3>
                            {q.ao3 && q.ao4 && (
                                <span style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    background: 'rgba(99, 102, 241, 0.2)',
                                    color: '#818cf8',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(99, 102, 241, 0.4)'
                                }}>
                                    {(q.ao3.points || 1) + (q.ao4.points || 2)} Marks
                                </span>
                            )}
                        </div>

                        {q.helperText && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.5' }}>
                                {q.helperText}
                            </p>
                        )}

                        {q.ao3 && q.ao4 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                {/* TIER 1: AO3 TECHNICAL IDENTIFICATION */}
                                <div style={{
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    padding: '18px 20px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(56, 189, 248, 0.25)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '0.78rem', background: '#0284c7', color: 'white', padding: '3px 8px', borderRadius: '4px', fontWeight: '800' }}>
                                                AO3
                                            </span>
                                            <span style={{ color: '#38bdf8', fontWeight: '700', fontSize: '0.92rem' }}>
                                                {q.ao3.label || 'Part A: Technical Identification'}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                                            {answers[q.id]?.ao3 ? '✓ Selected' : `${q.ao3.points || 1} Mark`}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {q.ao3.options.map((opt, optIdx) => {
                                            const isSelected = answers[q.id]?.ao3?.value === opt.text;
                                            return (
                                                <label key={optIdx} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '14px 16px',
                                                    background: isSelected ? 'rgba(56, 189, 248, 0.16)' : 'rgba(0,0,0,0.22)',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    border: isSelected ? '1.5px solid #38bdf8' : '1px solid rgba(255,255,255,0.06)',
                                                    transition: 'all 0.15s ease'
                                                }}>
                                                    <input
                                                        type="radio"
                                                        name={`${q.id}_ao3`}
                                                        value={opt.text}
                                                        checked={isSelected}
                                                        onChange={() => handleTierChange(q.id, 'ao3', opt.text, opt)}
                                                        style={{ marginRight: '14px', accentColor: '#38bdf8', flexShrink: 0 }}
                                                    />
                                                    <span style={{ color: isSelected ? '#ffffff' : '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.4' }}>
                                                        {opt.text}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* TIER 2: AO4 CONTEXTUAL & SONIC EVALUATION */}
                                <div style={{
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    padding: '18px 20px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(244, 63, 94, 0.25)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '0.78rem', background: '#e11d48', color: 'white', padding: '3px 8px', borderRadius: '4px', fontWeight: '800' }}>
                                                AO4
                                            </span>
                                            <span style={{ color: '#fb7185', fontWeight: '700', fontSize: '0.92rem' }}>
                                                {q.ao4.label || 'Part B: Contextual & Sonic Evaluation'}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                                            {answers[q.id]?.ao4 ? '✓ Selected' : `${q.ao4.points || 2} Marks`}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {q.ao4.options.map((opt, optIdx) => {
                                            const isSelected = answers[q.id]?.ao4?.value === opt.text;
                                            return (
                                                <label key={optIdx} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '14px 16px',
                                                    background: isSelected ? 'rgba(244, 63, 94, 0.16)' : 'rgba(0,0,0,0.22)',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    border: isSelected ? '1.5px solid #fb7185' : '1px solid rgba(255,255,255,0.06)',
                                                    transition: 'all 0.15s ease'
                                                }}>
                                                    <input
                                                        type="radio"
                                                        name={`${q.id}_ao4`}
                                                        value={opt.text}
                                                        checked={isSelected}
                                                        onChange={() => handleTierChange(q.id, 'ao4', opt.text, opt)}
                                                        style={{ marginRight: '14px', accentColor: '#fb7185', flexShrink: 0 }}
                                                    />
                                                    <span style={{ color: isSelected ? '#ffffff' : '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.4' }}>
                                                        {opt.text}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* COMBINED ESSAY SYNTHESIS PREVIEW */}
                                {(answers[q.id]?.ao3 || answers[q.id]?.ao4) && (
                                    <div style={{
                                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12))',
                                        padding: '14px 18px',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(168, 85, 247, 0.35)',
                                        fontSize: '0.88rem',
                                        color: '#e2e8f0',
                                        lineHeight: '1.5'
                                    }}>
                                        <div style={{ fontWeight: '700', color: '#c084fc', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>✨ Your Constructed Essay Sentence:</span>
                                            <span>Score: {(answers[q.id]?.ao3?.score || 0) + (answers[q.id]?.ao4?.score || 0)} / {(q.ao3.points || 1) + (q.ao4.points || 2)} Marks</span>
                                        </div>
                                        <p style={{ margin: 0, fontStyle: 'italic' }}>
                                            "{answers[q.id]?.ao3?.summary || '...'} {answers[q.id]?.ao4?.summary || '...'}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : q.type === 'mcq' ? (
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
                                value={answers[q.id]?.value || ''}
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
        const maxScore = calculateMaxScore();
        const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
        const grade = pct >= 80 ? 'A*' : pct >= 70 ? 'A' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : 'D';
        const questionsToRender = selectedTrack.questions || activity.questions || [];

        // Generate the student's "essay" from their summaries (MCQ / Two-Tier) or raw text
        const studentSummary = questionsToRender.map(q => {
            const ans = answers[q.id];
            if (!ans) return null;
            if (q.ao3 && q.ao4) {
                const ao3Text = ans.ao3?.summary || ans.ao3?.value || '(No technical identification chosen)';
                const ao4Text = ans.ao4?.summary || ans.ao4?.value || '(No contextual evaluation chosen)';
                return `### ${q.label}\n• **AO3 Technical Identification:** ${ao3Text}\n• **AO4 Contextual Evaluation:** ${ao4Text}`;
            }
            return `• ${ans.summary || ans.value}`;
        }).filter(Boolean).join('\n\n');

        return (
            <div className="worksheet-report">
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ marginBottom: '15px' }}>{activity.title}</h1>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        color: pct >= 75 ? 'var(--accent-success)' : pct >= 50 ? '#facc15' : 'var(--accent-error)',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        {score} / {maxScore} Marks
                    </div>
                    <div style={{ fontSize: '1.25rem', color: 'var(--accent-purple)', fontWeight: 'bold', marginTop: '6px' }}>
                        Grade: {grade} ({pct}%)
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>Based on Edexcel AO3 technical identification and AO4 comparative evaluation.</p>
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
