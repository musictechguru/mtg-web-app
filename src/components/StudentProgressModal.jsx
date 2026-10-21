import React, { useState, useEffect } from 'react';
import {
    computeC1DetailedMetrics,
    computeC2DetailedMetrics,
    computeC3DetailedMetrics,
    computeC4DetailedMetrics,
    analyzeStudentStrengthsAndWeaknesses,
    getGradeFromPercentage
} from './teacherComponentMetrics';

const formatTopicName = (key) => {
    if (!key) return 'General';
    if (/^\d+$/.test(key)) {
        return `Topic ${key}`;
    }
    return key;
};

const StudentProgressModal = ({ student, onClose, defaultComponent = 'all' }) => {
    const [activeSection, setActiveSection] = useState(defaultComponent); // 'all' | 'c1' | 'c2' | 'c3' | 'c4' | 'quizzes'

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

    // Detailed metrics across all 4 components
    const c1 = computeC1DetailedMetrics(progress.component1Guide);
    const c2 = computeC2DetailedMetrics(progress.component2Guide);
    const c3 = computeC3DetailedMetrics(student);
    const c4 = computeC4DetailedMetrics(student);
    const diagnostics = analyzeStudentStrengthsAndWeaknesses(student);

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
                    maxWidth: '1000px',
                    width: '100%',
                    maxHeight: '92vh',
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
                    padding: '22px 28px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    flexShrink: 0
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1.4rem' }}>{student.isTeacherPreview ? '🎓' : '👤'}</span>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800' }}>
                                {student.full_name || 'Anonymous Student'}
                            </h2>
                            {student.isTeacherPreview ? (
                                <span style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    background: 'rgba(244, 114, 182, 0.2)',
                                    color: '#f472b6',
                                    border: '1px solid rgba(244, 114, 182, 0.4)',
                                    padding: '2px 8px',
                                    borderRadius: '6px'
                                }}>
                                    Live Teacher Workspace
                                </span>
                            ) : (
                                <span style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 800,
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    color: '#38bdf8',
                                    border: '1px solid rgba(56, 189, 248, 0.35)',
                                    padding: '2px 8px',
                                    borderRadius: '6px'
                                }}>
                                    Enrolled Student
                                </span>
                            )}
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-secondary, #94a3b8)', fontSize: '0.86rem' }}>
                            4-Component Progress, Tick Lists, Strengths & Weakness Diagnostic Dossier
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
                            transition: 'all 0.2s ease',
                            flexShrink: 0
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

                {/* Sub-Navigation Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    padding: '12px 28px',
                    background: 'rgba(15, 23, 42, 0.65)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    overflowX: 'auto',
                    flexShrink: 0,
                    alignItems: 'center',
                    scrollbarWidth: 'thin'
                }}>
                    {[
                        { id: 'all', label: '📊 4-Component Overview' },
                        { id: 'c1', label: `🎙️ C1: Recording (${c1.overallPercent}%)`, color: '#38bdf8' },
                        { id: 'c2', label: `🎹 C2: Composition (${c2.overallPercent}%)`, color: '#f472b6' },
                        { id: 'c3', label: `🎧 C3: Listening (${c3.overallPercent}%)`, color: '#a855f7' },
                        { id: 'c4', label: `🎛️ C4: Producing (${c4.overallPercent}%)`, color: '#10b981' },
                        { id: 'quizzes', label: `📝 Quizzes & Mastery (${quizzesCompleted})` }
                    ].map(tab => {
                        const active = activeSection === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSection(tab.id)}
                                style={{
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    border: active ? `1px solid ${tab.color || 'var(--accent-blue)'}` : '1px solid rgba(255, 255, 255, 0.05)',
                                    background: active ? (tab.color ? `${tab.color}22` : 'rgba(56, 189, 248, 0.15)') : 'rgba(255, 255, 255, 0.03)',
                                    color: active ? (tab.color || '#38bdf8') : 'var(--text-secondary)',
                                    fontWeight: active ? 800 : 600,
                                    fontSize: '0.82rem',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    flexShrink: 0
                                }}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Body Content - Scrollable */}
                <div style={{
                    padding: '24px 28px',
                    overflowY: 'auto',
                    flex: '1 1 auto',
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    {/* Top Stats Banner */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '14px'
                    }}>
                        {/* Predicted Grade */}
                        <div style={{
                            background: proposedGradeInfo ? proposedGradeInfo.bg : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${proposedGradeInfo ? proposedGradeInfo.color : 'rgba(255, 255, 255, 0.08)'}`,
                            borderRadius: '14px',
                            padding: '16px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                                Proposed Predicted Grade
                            </span>
                            {proposedGradeInfo ? (
                                <>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: proposedGradeInfo.color, lineHeight: 1.1, margin: '4px 0' }}>
                                        {proposedGradeInfo.grade}
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: proposedGradeInfo.color, fontWeight: 700 }}>
                                        {overallPercentage}% Quiz Average
                                    </span>
                                </>
                            ) : (
                                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                                    Pending Assessments
                                </div>
                            )}
                        </div>

                        {/* Quizzes Completed */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '14px',
                            padding: '16px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                                Quizzes Completed
                            </span>
                            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', margin: '4px 0' }}>
                                {quizzesCompleted}
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                Tracked assessments
                            </span>
                        </div>

                        {/* Questions Correct */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '14px',
                            padding: '16px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                                Questions Correct
                            </span>
                            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>
                                {totalScore}
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                Cumulative score
                            </span>
                        </div>
                    </div>

                    {/* Top 4-Component Progress Summary Cards (Shown on 'all' tab) */}
                    {(activeSection === 'all') && (
                        <>
                            {/* 4-Component Progress Bar Cards */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                                gap: '14px'
                            }}>
                                {/* C1 Card */}
                                <div 
                                    onClick={() => setActiveSection('c1')}
                                    style={{
                                        background: 'rgba(56, 189, 248, 0.05)',
                                        border: '1px solid rgba(56, 189, 248, 0.25)',
                                        borderRadius: '14px',
                                        padding: '16px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8' }}>🎙️ COMPONENT 1</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8' }}>{c1.overallPercent}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
                                        <div style={{ width: `${c1.overallPercent}%`, height: '100%', background: '#38bdf8', borderRadius: '999px' }} />
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {c1.prescribedTrack !== 'Not chosen yet' ? `🎵 ${c1.prescribedTrack}` : 'Track pending'}
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                                        {c1.techDone}/24 Tech • {c1.masterDone}/16 Checks
                                    </div>
                                </div>

                                {/* C2 Card */}
                                <div 
                                    onClick={() => setActiveSection('c2')}
                                    style={{
                                        background: 'rgba(244, 114, 182, 0.05)',
                                        border: '1px solid rgba(244, 114, 182, 0.25)',
                                        borderRadius: '14px',
                                        padding: '16px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f472b6' }}>🎹 COMPONENT 2</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f472b6' }}>{c2.overallPercent}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
                                        <div style={{ width: `${c2.overallPercent}%`, height: '100%', background: '#f472b6', borderRadius: '999px' }} />
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                                        {c2.briefLabel}
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                                        {c2.techDone}/24 Tech (Syn: {c2.synDone} Smp: {c2.smpDone})
                                    </div>
                                </div>

                                {/* C3 Card */}
                                <div 
                                    onClick={() => setActiveSection('c3')}
                                    style={{
                                        background: 'rgba(168, 85, 247, 0.05)',
                                        border: '1px solid rgba(168, 85, 247, 0.25)',
                                        borderRadius: '14px',
                                        padding: '16px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#c084fc' }}>🎧 COMPONENT 3</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#c084fc' }}>{c3.overallPercent}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
                                        <div style={{ width: `${c3.overallPercent}%`, height: '100%', background: '#c084fc', borderRadius: '999px' }} />
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                                        {c3.completedGenreCount}/5 Genres Practiced
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                                        {c3.mocksTaken > 0 ? `${c3.averagePercent}% Mock Average` : 'No mock taken yet'}
                                    </div>
                                </div>

                                {/* C4 Card */}
                                <div 
                                    onClick={() => setActiveSection('c4')}
                                    style={{
                                        background: 'rgba(16, 185, 129, 0.05)',
                                        border: '1px solid rgba(16, 185, 129, 0.25)',
                                        borderRadius: '14px',
                                        padding: '16px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399' }}>🎛️ COMPONENT 4</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399' }}>{c4.overallPercent}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
                                        <div style={{ width: `${c4.overallPercent}%`, height: '100%', background: '#34d399', borderRadius: '999px' }} />
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                                        {c4.completedPaperCount}/4 Practical Papers
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                                        {c4.mocksTaken > 0 ? `${c4.averagePercent}% DAW Avg` : 'DAW exam pending'}
                                    </div>
                                </div>
                            </div>

                            {/* Strengths Overview Box */}
                            <div style={{ marginBottom: '6px' }}>
                                {/* Strong Points Card */}
                                <div style={{
                                    background: 'rgba(16, 185, 129, 0.06)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    borderRadius: '14px',
                                    padding: '18px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '1.1rem' }}>🟢</span>
                                        <h3 style={{ margin: 0, fontSize: '1rem', color: '#34d399', fontWeight: 800 }}>
                                            Demonstrated Competencies & Strengths ({diagnostics.strengths.length})
                                        </h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {diagnostics.strengths.map((st, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem' }}>
                                                <span style={{
                                                    background: 'rgba(16, 185, 129, 0.2)',
                                                    color: '#34d399',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    fontWeight: 800,
                                                    fontSize: '0.7rem',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {st.component}
                                                </span>
                                                <span style={{ color: '#e2e8f0', lineHeight: 1.4 }}>
                                                    <strong>[{st.tag}]</strong> {st.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* COMPONENT 1 SECTION */}
                    {(activeSection === 'all' || activeSection === 'c1') && (
                        <div style={{
                            background: 'rgba(56, 189, 248, 0.04)',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🎙️</span>
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#38bdf8', fontWeight: 800 }}>
                                        Component 1: Recording Coursework (9MT0/01)
                                    </h3>
                                </div>
                                <span style={{
                                    background: 'rgba(56, 189, 248, 0.18)',
                                    color: '#38bdf8',
                                    border: '1px solid rgba(56, 189, 248, 0.4)',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    fontWeight: 800,
                                    fontSize: '0.84rem'
                                }}>
                                    {c1.overallPercent}% Overall ({c1.totalDone}/{c1.totalItems} Checkpoints)
                                </span>
                            </div>

                            {/* Session Info Bar */}
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', background: 'rgba(15, 23, 42, 0.6)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem' }}>
                                <div><strong style={{ color: '#94a3b8' }}>Song:</strong> <span style={{ color: '#fff', fontWeight: 700 }}>{c1.prescribedTrack}</span></div>
                                {c1.artist && <div><strong style={{ color: '#94a3b8' }}>Artist:</strong> <span style={{ color: '#fff' }}>{c1.artist}</span></div>}
                                <div><strong style={{ color: '#94a3b8' }}>DAW:</strong> <span style={{ color: '#fff' }}>{c1.daw}</span></div>
                                <div><strong style={{ color: '#94a3b8' }}>Mic Logs:</strong> <span style={{ color: '#38bdf8', fontWeight: 700 }}>{c1.micLogCount} Channels</span></div>
                                <div><strong style={{ color: '#94a3b8' }}>Logbook Notes:</strong> <span style={{ color: '#34d399', fontWeight: 700 }}>{c1.notesCount} Written</span></div>
                            </div>

                            {/* 5-Phase Workflow Markers */}
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '8px' }}>
                                    5-Phase Production Workflow ({c1.workflowDone}/{c1.workflowTotal} Tasks Complete)
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                                    {c1.phaseMarkers.map(pm => (
                                        <div key={pm.id} style={{
                                            background: pm.complete ? 'rgba(16, 185, 129, 0.15)' : pm.done > 0 ? 'rgba(56, 189, 248, 0.12)' : 'rgba(15, 23, 42, 0.65)',
                                            border: `1px solid ${pm.complete ? '#10b981' : pm.done > 0 ? '#38bdf8' : 'rgba(255,255,255,0.08)'}`,
                                            borderRadius: '8px', padding: '8px'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: pm.complete ? '#34d399' : '#fff' }}>
                                                <span>{pm.shortLabel}: {pm.title.split(' ')[0]}</span>
                                                <span>{pm.done}/{pm.total}</span>
                                            </div>
                                            <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginTop: '4px' }}>
                                                <div style={{ width: `${pm.percent}%`, height: '100%', background: pm.complete ? '#10b981' : '#38bdf8' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Techniques & Master Checklist Breakdown */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px' }}>
                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>🥁 Drums & Bass Capture</div>
                                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#38bdf8', marginTop: '3px' }}>
                                        {c1.drumsBassDone} / {c1.drumsBassTotal} Techniques
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>🎸 Guitars & Vocals Capture</div>
                                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#c084fc', marginTop: '3px' }}>
                                        {c1.guitarsVocalsDone} / {c1.guitarsVocalsTotal} Techniques
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>🎚️ Mixing & Mastering</div>
                                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#f472b6', marginTop: '3px' }}>
                                        {c1.mixDone} / {c1.mixTotal} Techniques
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>✅ 16-Pt Master Checklist</div>
                                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#34d399', marginTop: '3px' }}>
                                        {c1.masterDone} / {c1.masterTotal} Verified
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* COMPONENT 2 SECTION */}
                    {(activeSection === 'all' || activeSection === 'c2') && (
                        <div style={{
                            background: 'rgba(244, 114, 182, 0.04)',
                            border: '1px solid rgba(244, 114, 182, 0.25)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🎹</span>
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f472b6', fontWeight: 800 }}>
                                        Component 2: Technology-Based Composition (9MT0/02)
                                    </h3>
                                </div>
                                <span style={{
                                    background: 'rgba(244, 114, 182, 0.18)',
                                    color: '#f472b6',
                                    border: '1px solid rgba(244, 114, 182, 0.4)',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    fontWeight: 800,
                                    fontSize: '0.84rem'
                                }}>
                                    {c2.overallPercent}% Overall ({c2.totalDone}/{c2.totalItems} Checkpoints)
                                </span>
                            </div>

                            {/* Brief & Stimulus Info */}
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', background: 'rgba(15, 23, 42, 0.6)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem' }}>
                                <div><strong style={{ color: '#94a3b8' }}>Brief:</strong> <span style={{ color: '#f472b6', fontWeight: 700 }}>{c2.briefLabel}</span></div>
                                <div><strong style={{ color: '#94a3b8' }}>Stimulus:</strong> <span style={{ color: '#fff' }}>{c2.stimulusText}</span></div>
                                <div><strong style={{ color: '#94a3b8' }}>Logbook Notes:</strong> <span style={{ color: '#34d399', fontWeight: 700 }}>{c2.notesCount} Written</span></div>
                            </div>

                            {/* AG1 Synthesis, AG2 Sampling, AG3 FX 8-Dot Indicators */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', marginBottom: '8px' }}>
                                        <span>🎹 AG1 Synthesis</span>
                                        <span>{c2.synDone} / 8</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px' }}>
                                        {c2.synTechs.map(t => (
                                            <div key={t.id} title={t.title} style={{
                                                height: '20px', borderRadius: '4px', fontSize: '0.64rem', fontWeight: 800,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                background: t.done ? '#38bdf8' : 'rgba(255,255,255,0.06)',
                                                color: t.done ? '#0f172a' : '#64748b'
                                            }}>
                                                {t.done ? '✓' : t.num}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(192, 132, 252, 0.25)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#c084fc', marginBottom: '8px' }}>
                                        <span>✂️ AG2 Sampling</span>
                                        <span>{c2.smpDone} / 8</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px' }}>
                                        {c2.smpTechs.map(t => (
                                            <div key={t.id} title={t.title} style={{
                                                height: '20px', borderRadius: '4px', fontSize: '0.64rem', fontWeight: 800,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                background: t.done ? '#c084fc' : 'rgba(255,255,255,0.06)',
                                                color: t.done ? '#0f172a' : '#64748b'
                                            }}>
                                                {t.done ? '✓' : t.num}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(244, 114, 182, 0.25)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#f472b6', marginBottom: '8px' }}>
                                        <span>🎛️ AG3 Creative FX</span>
                                        <span>{c2.fxDone} / 8</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px' }}>
                                        {c2.fxTechs.map(t => (
                                            <div key={t.id} title={t.title} style={{
                                                height: '20px', borderRadius: '4px', fontSize: '0.64rem', fontWeight: 800,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                background: t.done ? '#f472b6' : 'rgba(255,255,255,0.06)',
                                                color: t.done ? '#0f172a' : '#64748b'
                                            }}>
                                                {t.done ? '✓' : t.num}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* COMPONENT 3 SECTION */}
                    {(activeSection === 'all' || activeSection === 'c3') && (
                        <div style={{
                            background: 'rgba(168, 85, 247, 0.04)',
                            border: '1px solid rgba(168, 85, 247, 0.25)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🎧</span>
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#c084fc', fontWeight: 800 }}>
                                        Component 3: Listening and Analysing (9MT0/03)
                                    </h3>
                                </div>
                                <span style={{
                                    background: 'rgba(168, 85, 247, 0.18)',
                                    color: '#c084fc',
                                    border: '1px solid rgba(168, 85, 247, 0.4)',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    fontWeight: 800,
                                    fontSize: '0.84rem'
                                }}>
                                    {c3.overallPercent}% Readiness ({c3.completedGenreCount}/{c3.totalGenres} Genres Practiced)
                                </span>
                            </div>

                            {/* 5 Specification Exam Genres Cards */}
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '8px' }}>
                                    Edexcel Specification Exam Genres
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
                                    {c3.genreStatus.map(g => (
                                        <div key={g.id} style={{
                                            background: g.completed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(15, 23, 42, 0.65)',
                                            border: `1px solid ${g.completed ? '#10b981' : 'rgba(255,255,255,0.08)'}`,
                                            borderRadius: '8px', padding: '10px'
                                        }}>
                                            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: g.completed ? '#34d399' : '#fff' }}>
                                                {g.name}
                                            </div>
                                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '3px' }}>
                                                {g.completed ? `Score: ${g.score}/${g.total} (${g.percentage}%) • Gr: ${g.grade}` : 'Not attempted'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Diagnostic Competencies */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }}>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Acoustics & Transducers</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: c3.diagnostics.acoustics >= 70 ? '#34d399' : '#fbbf24', marginTop: '2px' }}>
                                        {c3.diagnostics.acoustics !== null ? `${c3.diagnostics.acoustics}% Mastery` : 'Untracked'}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>EQ & Spectral Filters</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: c3.diagnostics.eq >= 70 ? '#34d399' : '#fbbf24', marginTop: '2px' }}>
                                        {c3.diagnostics.eq !== null ? `${c3.diagnostics.eq}% Mastery` : 'Untracked'}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Dynamic Processing</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: c3.diagnostics.dynamics >= 70 ? '#34d399' : '#fbbf24', marginTop: '2px' }}>
                                        {c3.diagnostics.dynamics !== null ? `${c3.diagnostics.dynamics}% Mastery` : 'Untracked'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* COMPONENT 4 SECTION */}
                    {(activeSection === 'all' || activeSection === 'c4') && (
                        <div style={{
                            background: 'rgba(16, 185, 129, 0.04)',
                            border: '1px solid rgba(16, 185, 129, 0.25)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🎛️</span>
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#34d399', fontWeight: 800 }}>
                                        Component 4: Producing and Analysing (9MT0/04)
                                    </h3>
                                </div>
                                <span style={{
                                    background: 'rgba(16, 185, 129, 0.18)',
                                    color: '#34d399',
                                    border: '1px solid rgba(16, 185, 129, 0.4)',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    fontWeight: 800,
                                    fontSize: '0.84rem'
                                }}>
                                    {c4.overallPercent}% Readiness ({c4.completedPaperCount}/{c4.totalPapers} Practical Papers)
                                </span>
                            </div>

                            {/* Practical DAW Papers */}
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '8px' }}>
                                    Practical DAW Exam Papers
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                                    {c4.paperStatus.map(p => (
                                        <div key={p.id} style={{
                                            background: p.completed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(15, 23, 42, 0.65)',
                                            border: `1px solid ${p.completed ? '#10b981' : 'rgba(255,255,255,0.08)'}`,
                                            borderRadius: '8px', padding: '10px'
                                        }}>
                                            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: p.completed ? '#34d399' : '#fff' }}>
                                                {p.name}
                                            </div>
                                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '3px' }}>
                                                {p.completed ? `Score: ${p.score}/${p.total} (${p.percentage}%) • Gr: ${p.grade}` : 'Pending practical run'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Practical Tasks Competencies */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '8px' }}>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>MIDI Editing & Quantisation</div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: c4.practicalCompetencies.midiQuantisation ? '#34d399' : '#94a3b8', marginTop: '2px' }}>
                                        {c4.practicalCompetencies.midiQuantisation ? '✓ Demonstrated' : 'Practice needed'}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Synthesiser Sound Design</div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: c4.practicalCompetencies.synthSoundDesign ? '#34d399' : '#94a3b8', marginTop: '2px' }}>
                                        {c4.practicalCompetencies.synthSoundDesign ? '✓ Demonstrated' : 'Practice needed'}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Vocal Pitch / Flex Tuning</div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: c4.practicalCompetencies.pitchCorrection ? '#34d399' : '#94a3b8', marginTop: '2px' }}>
                                        {c4.practicalCompetencies.pitchCorrection ? '✓ Demonstrated' : 'Practice needed'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* QUIZ RESULTS & MASTERY SECTION */}
                    {(activeSection === 'all' || activeSection === 'quizzes') && (
                        <div>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                                <div style={{ padding: '30px 20px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px dashed rgba(255, 255, 255, 0.1)', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    No quiz assessments taken yet.
                                </div>
                            )}

                            {/* Subject Mastery */}
                            {masteryKeys.length > 0 && (
                                <div style={{ marginTop: '20px' }}>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>Grades by Topic Area</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                                        {masteryKeys.map((topicKey) => {
                                            const percent = mastery[topicKey];
                                            const topicGrade = getGradeFromPercentage(percent);
                                            const topicTitle = formatTopicName(topicKey);
                                            return (
                                                <div key={topicKey} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '12px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{topicTitle}</span>
                                                        <span style={{ color: topicGrade.color, fontWeight: 700, fontSize: '0.8rem' }}>{topicGrade.grade}</span>
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
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 28px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        Edexcel A-Level Music Technology (9MT0) Diagnostic System
                    </span>
                    <button
                        onClick={onClose}
                        className="btn-primary"
                        style={{
                            padding: '9px 22px',
                            background: 'var(--accent-blue, #3b82f6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: '0.9rem',
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
