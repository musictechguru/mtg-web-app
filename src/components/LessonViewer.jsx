import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

const LessonViewer = ({ lesson, onBack }) => {
    const { userProgress, completeCampaignNode } = useUser();
    const isAlreadyCompleted = Boolean(
        lesson?.campaignNodeId && userProgress?.campaignCompleted?.includes(lesson.campaignNodeId)
    );
    const [complete, setComplete] = useState(isAlreadyCompleted);

    useEffect(() => {
        if (isAlreadyCompleted) {
            setComplete(true);
        }
    }, [isAlreadyCompleted]);

    const handleToggleComplete = () => {
        const nextState = !complete;
        setComplete(nextState);
        if (nextState && lesson?.campaignNodeId && completeCampaignNode) {
            completeCampaignNode(lesson.campaignNodeId);
        }
    };

    return (
        <div className="quiz-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            {onBack && (
                <button
                    onClick={onBack}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#94a3b8',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                >
                    ← Back to Dashboard / Campaign Map
                </button>
            )}

            <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                LEARNING MODULE • {lesson?.title}
            </div>

            <div className="question-card" style={{ background: 'var(--bg-panel)', borderRadius: '16px', padding: '30px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h1 className="question-text" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginTop: 0, fontSize: '1.8rem', color: 'var(--accent-blue)' }}>
                    {lesson?.title}
                </h1>

                <div
                    className="lesson-content"
                    style={{ lineHeight: '1.7', fontSize: '1.05rem', color: 'var(--text-primary)' }}
                    dangerouslySetInnerHTML={{ __html: lesson?.content || '' }}
                />

                <div className="controls" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <button
                        className="btn-primary"
                        style={{
                            background: complete ? 'var(--accent-success)' : 'var(--accent-blue)',
                            width: '100%',
                            padding: '16px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onClick={handleToggleComplete}
                    >
                        {complete ? '✓ Completed & Progress Saved' : 'Mark as Complete & Unlock Next Node'}
                    </button>

                    {complete && onBack && (
                        <button
                            onClick={onBack}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--accent-success)',
                                color: 'var(--accent-success)',
                                width: '100%',
                                padding: '14px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            Continue Campaign Journey →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonViewer;
