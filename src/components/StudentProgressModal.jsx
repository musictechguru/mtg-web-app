import React, { useEffect } from 'react';

// Edexcel standard grade boundary helper
const getGradeFromPercentage = (percentage) => {
    if (percentage >= 90) return { grade: 'A*', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' };
    if (percentage >= 80) return { grade: 'A', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' };
    if (percentage >= 70) return { grade: 'B', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
    if (percentage >= 60) return { grade: 'C', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' };
    if (percentage >= 50) return { grade: 'D', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' };
    if (percentage >= 40) return { grade: 'E', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' };
    return { grade: 'U', color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.15)' };
};

const formatTopicName = (key) => {
    if (!key) return 'General';
    // If it's just a number like "1" or "2"
    if (/^\d+$/.test(key)) {
        return `Topic ${key}`;
    }
    return key;
};

const StudentProgressModal = ({ student, onClose }) => {
    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!student) return null;

    const progress = student.progress || {};
    const history = progress.history || [];
    const mastery = progress.mastery || {};
    const totalScore = progress.totalScore || 0;
    const quizzesCompleted = progress.quizzesCompleted || history.length || 0;

    // Calculate Overall Proposed Grade
    let proposedGradeInfo = null;
    let overallPercentage = null;

    if (history.length > 0) {
        const totalEarned = history.reduce((sum, item) => sum + (Number(item.score) || 0), 0);
        const totalPossible = history.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
        
        if (totalPossible > 0) {
            overallPercentage = Math.round((totalEarned / totalPossible) * 100);
            proposedGradeInfo = getGradeFromPercentage(overallPercentage);
        }
    }

    const masteryKeys = Object.keys(mastery);

    return (
        <div 
            className="modal-overlay" 
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '20px',
                boxSizing: 'border-box'
            }}
        >
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'var(--bg-panel, #1e293b)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxWidth: '850px',
                    width: '100%',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    color: 'var(--text-primary, #f8fafc)',
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '24px 30px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '1.4rem' }}>👤</span>
                            <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '700' }}>
                                {student.full_name || 'Anonymous Student'}
                            </h2>
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-secondary, #94a3b8)', fontSize: '0.9rem' }}>
                            Comprehensive Student Performance & Assessment Dossier
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-secondary, #94a3b8)',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                            e.currentTarget.style.color = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                            e.currentTarget.style.color = 'var(--text-secondary, #94a3b8)';
                        }}
                        title="Close (Esc)"
                    >
                        ✕
                    </button>
                </div>

                {/* Body Content - Scrollable */}
                <div style={{
                    padding: '30px',
                    overflowY: 'auto',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '28px'
                }}>
                    {/* Top Stats Banner */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '16px'
                    }}>
                        {/* Proposed Grade Card */}
                        <div style={{
                            background: proposedGradeInfo ? proposedGradeInfo.bg : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${proposedGradeInfo ? proposedGradeInfo.color : 'rgba(255, 255, 255, 0.08)'}`,
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            gridColumn: 'span 1'
                        }}>
                            <span style={{ 
                                fontSize: '0.85rem', 
                                textTransform: 'uppercase', 
                                letterSpacing: '1px', 
                                color: 'var(--text-secondary, #94a3b8)',
                                marginBottom: '6px'
                            }}>
                                Proposed Predicted Grade
                            </span>
                            {proposedGradeInfo ? (
                                <>
                                    <div style={{ 
                                        fontSize: '3.2rem', 
                                        fontWeight: '800', 
                                        color: proposedGradeInfo.color,
                                        lineHeight: '1.1'
                                    }}>
                                        {proposedGradeInfo.grade}
                                    </div>
                                    <span style={{ 
                                        fontSize: '0.95rem', 
                                        color: proposedGradeInfo.color, 
                                        fontWeight: '600',
                                        marginTop: '4px'
                                    }}>
                                        {overallPercentage}% Overall Average
                                    </span>
                                </>
                            ) : (
                                <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary, #94a3b8)', marginTop: '8px' }}>
                                    Pending Quizzes
                                </div>
                            )}
                        </div>

                        {/* Quizzes Taken Stat */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            <span style={{ 
                                fontSize: '0.85rem', 
                                textTransform: 'uppercase', 
                                letterSpacing: '1px', 
                                color: 'var(--text-secondary, #94a3b8)',
                                marginBottom: '6px'
                            }}>
                                Quizzes Completed
                            </span>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary, #f8fafc)' }}>
                                {quizzesCompleted}
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)' }}>
                                Tracked assessments
                            </span>
                        </div>

                        {/* Total Score Stat */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            <span style={{ 
                                fontSize: '0.85rem', 
                                textTransform: 'uppercase', 
                                letterSpacing: '1px', 
                                color: 'var(--text-secondary, #94a3b8)',
                                marginBottom: '6px'
                            }}>
                                Questions Correct
                            </span>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10b981' }}>
                                {totalScore}
                            </div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94a3b8)' }}>
                                Total cumulative score
                            </span>
                        </div>
                    </div>

                    {/* Subject / Topic Performance Section */}
                    <div>
                        <h3 style={{ 
                            fontSize: '1.15rem', 
                            fontWeight: '600', 
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span>📚</span> Grades by Subject / Topic
                        </h3>

                        {masteryKeys.length > 0 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                                gap: '14px'
                            }}>
                                {masteryKeys.map((topicKey) => {
                                    const percent = mastery[topicKey];
                                    const topicGrade = getGradeFromPercentage(percent);
                                    const topicTitle = formatTopicName(topicKey);

                                    return (
                                        <div 
                                            key={topicKey}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                                borderRadius: '12px',
                                                padding: '16px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                                                    {topicTitle}
                                                </div>
                                                <span style={{
                                                    background: topicGrade.bg,
                                                    color: topicGrade.color,
                                                    border: `1px solid ${topicGrade.color}40`,
                                                    borderRadius: '6px',
                                                    padding: '3px 8px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '700'
                                                }}>
                                                    {topicGrade.grade}
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div style={{
                                                width: '100%',
                                                height: '7px',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '999px',
                                                overflow: 'hidden',
                                                marginBottom: '6px'
                                            }}>
                                                <div style={{
                                                    width: `${Math.min(100, Math.max(0, percent))}%`,
                                                    height: '100%',
                                                    background: topicGrade.color,
                                                    borderRadius: '999px'
                                                }} />
                                            </div>

                                            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {percent}% Mastery
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{
                                padding: '24px',
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '12px',
                                border: '1px dashed rgba(255, 255, 255, 0.1)',
                                color: 'var(--text-secondary)',
                                textAlign: 'center',
                                fontSize: '0.9rem'
                            }}>
                                No subject mastery data recorded yet.
                            </div>
                        )}
                    </div>

                    {/* Quiz Breakdown Section */}
                    <div>
                        <h3 style={{ 
                            fontSize: '1.15rem', 
                            fontWeight: '600', 
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span>📝</span> Quiz Results History
                        </h3>

                        {history.length > 0 ? (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                overflowX: 'auto'
                            }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                                    <thead>
                                        <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                            <th style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Quiz Title</th>
                                            <th style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Score</th>
                                            <th style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Accuracy</th>
                                            <th style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Grade</th>
                                            <th style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Date Taken</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((item, idx) => {
                                            const itemPercent = item.total > 0 ? Math.round((item.score / item.total) * 100) : 0;
                                            const itemGrade = getGradeFromPercentage(itemPercent);

                                            return (
                                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                                                    <td style={{ padding: '14px 18px', fontWeight: '600' }}>
                                                        {item.quizTitle}
                                                    </td>
                                                    <td style={{ padding: '14px 18px' }}>
                                                        {item.score} / {item.total}
                                                    </td>
                                                    <td style={{ padding: '14px 18px', color: itemGrade.color, fontWeight: '600' }}>
                                                        {itemPercent}%
                                                    </td>
                                                    <td style={{ padding: '14px 18px' }}>
                                                        <span style={{
                                                            background: itemGrade.bg,
                                                            color: itemGrade.color,
                                                            border: `1px solid ${itemGrade.color}40`,
                                                            borderRadius: '6px',
                                                            padding: '3px 10px',
                                                            fontSize: '0.85rem',
                                                            fontWeight: '700',
                                                            display: 'inline-block'
                                                        }}>
                                                            {item.grade || itemGrade.grade}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                        {item.date || '-'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{
                                padding: '36px 20px',
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '12px',
                                border: '1px dashed rgba(255, 255, 255, 0.1)',
                                color: 'var(--text-secondary)',
                                textAlign: 'center',
                                lineHeight: '1.6'
                            }}>
                                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>⏳</span>
                                <strong>No quiz assessments taken yet.</strong>
                                <br />
                                This student has not yet completed any quizzes. Individual scores and proposed grades will automatically compute here as soon as they complete their first assessment.
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 30px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        className="btn-primary"
                        style={{
                            padding: '10px 24px',
                            background: 'var(--accent-blue, #3b82f6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            cursor: 'pointer'
                        }}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentProgressModal;
