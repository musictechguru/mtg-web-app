import React, { useEffect, useMemo } from 'react';
import { getGradeFromPercentage } from './teacherComponentMetrics';
import { buildPathToLegendSummary } from './teacherProgressReport.js';

const formatTopicName = (key) => {
    if (!key) return 'General';
    if (/^\d+$/.test(key)) {
        return `Topic ${key}`;
    }
    return key;
};

const StudentProgressModal = ({ student, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const progress = student?.progress || {};
    const history = Array.isArray(progress.history) ? progress.history : [];
    const mastery = progress.mastery && typeof progress.mastery === 'object' ? progress.mastery : {};
    const totalScore = progress.totalScore || 0;
    const quizzesCompleted = progress.quizzesCompleted || history.length || 0;

    const pathToLegend = useMemo(() => buildPathToLegendSummary(progress), [progress]);

    if (!student) return null;

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
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
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
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    maxWidth: '940px',
                    width: '100%',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.7)',
                    color: 'var(--text-primary, #f8fafc)',
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '20px 26px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    flexShrink: 0
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1.4rem' }}>{student.isTeacherPreview ? '🎓' : '👤'}</span>
                            <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: '800' }}>
                                {student.full_name || 'Anonymous Student'}
                            </h2>
                            <span style={{
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                background: student.isTeacherPreview ? 'rgba(244, 114, 182, 0.2)' : 'rgba(56, 189, 248, 0.15)',
                                color: student.isTeacherPreview ? '#f472b6' : '#38bdf8',
                                border: `1px solid ${student.isTeacherPreview ? 'rgba(244, 114, 182, 0.4)' : 'rgba(56, 189, 248, 0.35)'}`,
                                padding: '2px 8px',
                                borderRadius: '6px'
                            }}>
                                {student.isTeacherPreview ? 'Live Teacher Workspace' : 'Enrolled Student'}
                            </span>
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-secondary, #94a3b8)', fontSize: '0.85rem' }}>
                            App Activity, Path to Legend Checkpoints &amp; Quiz Mastery
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
                            flexShrink: 0
                        }}
                        title="Close (Esc)"
                    >
                        ✕
                    </button>
                </div>

                {/* Body Content - Scrollable */}
                <div style={{
                    padding: '22px 26px',
                    overflowY: 'auto',
                    flex: '1 1 auto',
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '22px'
                }}>
                    {/* Top Stats Banner */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '12px'
                    }}>
                        {/* Path to Legend */}
                        <div style={{
                            background: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '14px',
                            padding: '14px',
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                                Path to Legend
                            </span>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', margin: '4px 0' }}>
                                {pathToLegend.percent}%
                            </div>
                            <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                                {pathToLegend.completedCount} / {pathToLegend.totalNodes} nodes
                            </span>
                        </div>

                        {/* Quiz Average */}
                        <div style={{
                            background: proposedGradeInfo ? proposedGradeInfo.bg : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${proposedGradeInfo ? proposedGradeInfo.color : 'rgba(255, 255, 255, 0.08)'}`,
                            borderRadius: '14px',
                            padding: '14px',
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                                App Quiz Average
                            </span>
                            {proposedGradeInfo ? (
                                <>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: proposedGradeInfo.color, margin: '4px 0' }}>
                                        {proposedGradeInfo.grade}
                                    </div>
                                    <span style={{ fontSize: '0.78rem', color: proposedGradeInfo.color, fontWeight: 700 }}>
                                        {overallPercentage}% accuracy
                                    </span>
                                </>
                            ) : (
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                                    No quizzes yet
                                </div>
                            )}
                        </div>

                        {/* Quizzes Completed */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '14px',
                            padding: '14px',
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                                Quizzes Completed
                            </span>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '4px 0' }}>
                                {quizzesCompleted}
                            </div>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                Tracked assessments
                            </span>
                        </div>

                        {/* Questions Correct */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '14px',
                            padding: '14px',
                            textAlign: 'center'
                        }}>
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                                Questions Correct
                            </span>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>
                                {totalScore}
                            </div>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                Cumulative score
                            </span>
                        </div>
                    </div>

                    {/* Path to Legend Checkpoints */}
                    <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: '0 0 12px 0', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>🗺️</span> Path to Legend Checkpoints
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
                            {pathToLegend.checkpoints.map((cp) => (
                                <div
                                    key={cp.id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.025)',
                                        border: `1px solid ${cp.isReached ? `${cp.accent}66` : 'rgba(255, 255, 255, 0.08)'}`,
                                        borderRadius: '12px',
                                        padding: '12px 14px'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff' }}>
                                            {cp.badge} {cp.title}
                                        </span>
                                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: cp.accent }}>
                                            {cp.completedCount}/{cp.totalCount}
                                        </span>
                                    </div>
                                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '6px' }}>
                                        <div style={{ width: `${cp.progressPct}%`, height: '100%', background: cp.accent }} />
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: cp.accent, fontWeight: 700 }}>
                                        {cp.averageScore !== null ? `Avg Score: ${cp.averageScore}% • ${cp.subheadline}` : cp.subheadline}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quiz Results History */}
                    <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>📝</span> Quiz Results History ({history.length} Taken)
                        </h3>

                        {history.length > 0 ? (
                            <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)', overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                                    <thead>
                                        <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                            <th style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quiz Title</th>
                                            <th style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Score</th>
                                            <th style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Accuracy</th>
                                            <th style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Grade</th>
                                            <th style={{ padding: '12px 16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((item, idx) => {
                                            const itemPercent = item.total > 0 ? Math.round((item.score / item.total) * 100) : 0;
                                            const itemGrade = getGradeFromPercentage(itemPercent);
                                            return (
                                                <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                                                    <td style={{ padding: '12px 16px', fontWeight: '600', fontSize: '0.88rem' }}>{item.quizTitle}</td>
                                                    <td style={{ padding: '12px 16px', fontSize: '0.88rem' }}>{item.score} / {item.total}</td>
                                                    <td style={{ padding: '12px 16px', color: itemGrade.color, fontWeight: '700', fontSize: '0.88rem' }}>{itemPercent}%</td>
                                                    <td style={{ padding: '12px 16px' }}>
                                                        <span style={{
                                                            background: itemGrade.bg,
                                                            color: itemGrade.color,
                                                            border: `1px solid ${itemGrade.color}40`,
                                                            borderRadius: '6px',
                                                            padding: '2px 8px',
                                                            fontSize: '0.8rem',
                                                            fontWeight: '700',
                                                            display: 'inline-block'
                                                        }}>
                                                            {item.grade || itemGrade.grade}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.date || '-'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div style={{ padding: '24px 20px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px dashed rgba(255, 255, 255, 0.1)', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                No quiz assessments taken yet.
                            </div>
                        )}
                    </div>

                    {/* Topic Mastery */}
                    {masteryKeys.length > 0 && (
                        <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px 0' }}>Grades by Topic Area</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '10px' }}>
                                {masteryKeys.map((topicKey) => {
                                    const percent = mastery[topicKey];
                                    const topicGrade = getGradeFromPercentage(percent);
                                    const topicTitle = formatTopicName(topicKey);
                                    return (
                                        <div key={topicKey} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '12px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{topicTitle}</span>
                                                <span style={{ color: topicGrade.color, fontWeight: 700, fontSize: '0.8rem' }}>{percent}% ({topicGrade.grade})</span>
                                            </div>
                                            <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                                                <div style={{ width: `${percent}%`, height: '100%', background: topicGrade.color }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '14px 26px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Music Tech Guru • App &amp; Path to Legend Progress
                    </span>
                    <button
                        onClick={onClose}
                        className="btn-primary"
                        style={{
                            padding: '8px 20px',
                            background: 'var(--accent-blue, #3b82f6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '0.88rem',
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
