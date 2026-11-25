import React, { useMemo, useState } from 'react';
import {
    buildClassProgressReport,
    buildStudentProgressReport
} from './teacherProgressReport.js';

const SEVERITY_STYLE = {
    critical: {
        bg: 'rgba(239, 68, 68, 0.12)',
        border: 'rgba(239, 68, 68, 0.4)',
        text: '#fca5a5',
        badgeBg: 'rgba(239, 68, 68, 0.25)',
        label: 'Action Needed'
    },
    warning: {
        bg: 'rgba(245, 158, 11, 0.1)',
        border: 'rgba(245, 158, 11, 0.35)',
        text: '#fcd34d',
        badgeBg: 'rgba(245, 158, 11, 0.22)',
        label: 'Watch'
    },
    info: {
        bg: 'rgba(56, 189, 248, 0.08)',
        border: 'rgba(56, 189, 248, 0.3)',
        text: '#7dd3fc',
        badgeBg: 'rgba(56, 189, 248, 0.2)',
        label: 'Note'
    }
};

const TeacherProgressReport = ({
    students = [],
    teacherTicks = {},
    selectedStudentId,
    onSelectStudent,
    activeComponent = 'all',
    onOpenStudentModal
}) => {
    const [reportScope, setReportScope] = useState('cohort'); // 'cohort' | 'individual'

    const classReport = useMemo(
        () => buildClassProgressReport(students, teacherTicks, activeComponent),
        [students, teacherTicks, activeComponent]
    );

    const selectedStudent = useMemo(
        () => students.find((s) => s.student_id === selectedStudentId) || students[0] || null,
        [students, selectedStudentId]
    );

    const individualReport = useMemo(
        () => (selectedStudent ? buildStudentProgressReport(selectedStudent, teacherTicks) : null),
        [selectedStudent, teacherTicks]
    );

    const filteredCohortReports = classReport.reports;

    const handleInspectStudent = (studentId) => {
        if (onSelectStudent) onSelectStudent(studentId);
        setReportScope('individual');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* =========================================================
                SCOPE A: CLASS COHORT REPORT
                ========================================================= */}
            {reportScope === 'cohort' && (
                <>
                    {/* Summary KPI Strip */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '14px'
                    }}>
                        <div style={{
                            background: 'rgba(56, 189, 248, 0.06)',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            borderRadius: '14px',
                            padding: '16px'
                        }}>
                            <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                                Path to Legend Cohort Avg
                            </div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                                {classReport.avgPathPct}%
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#cbd5e1', marginTop: '2px' }}>
                                Across {classReport.reports.length} candidates
                            </div>
                        </div>
                    </div>

                    {/* Cohort Progress Table */}
                    <div style={{
                        background: 'var(--bg-panel)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        overflow: 'hidden'
                    }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '880px' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255, 255, 255, 0.04)', textAlign: 'left', fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                                        <th style={{ padding: '14px 18px' }}>Candidate</th>
                                        <th style={{ padding: '14px 14px' }}>🗺️ Path to Legend</th>
                                        <th style={{ padding: '14px 18px', textAlign: 'right', width: '140px' }}>Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCohortReports.map((rep) => {
                                        const st = rep.student;
                                        const ptl = rep.pathToLegend;

                                        return (
                                            <tr
                                                key={st.student_id}
                                                style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
                                            >
                                                <td style={{ padding: '14px 18px' }}>
                                                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                                                        {st.isTeacherPreview ? '🎓 ' : '👤 '}{st.full_name}
                                                    </div>
                                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                                                        {st.progress?.quizzesCompleted || 0} quizzes • {st.progress?.totalScore || 0} pts
                                                    </div>
                                                </td>

                                                <td style={{ padding: '14px 14px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                                                        <span style={{ color: '#38bdf8', fontWeight: 800 }}>
                                                            {ptl.completedCount}/{ptl.totalNodes} nodes
                                                        </span>
                                                        <span style={{ color: '#cbd5e1', fontWeight: 700 }}>{ptl.percent}%</span>
                                                    </div>
                                                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${ptl.percent}%`, height: '100%', background: '#38bdf8' }} />
                                                    </div>
                                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '320px' }}>
                                                        {ptl.currentStageTitle}
                                                    </div>
                                                </td>

                                                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                                                    <button
                                                        onClick={() => handleInspectStudent(st.student_id)}
                                                        style={{
                                                            background: 'rgba(56, 189, 248, 0.14)',
                                                            border: '1px solid rgba(56, 189, 248, 0.35)',
                                                            color: '#38bdf8',
                                                            padding: '6px 12px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.78rem',
                                                            fontWeight: 700,
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Inspect Report →
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* =========================================================
                SCOPE B: INDIVIDUAL CANDIDATE PROGRESS REPORT
                ========================================================= */}
            {reportScope === 'individual' && individualReport && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Candidate Header Summary */}
                    <div style={{
                        background: 'var(--bg-panel)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}>
                        <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                                {individualReport.student.isTeacherPreview ? '🎓 ' : '👤 '}
                                {individualReport.student.full_name} — Progress Report
                            </div>
                            <div style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: '4px' }}>
                                Path to Legend: <strong style={{ color: '#38bdf8' }}>
                                    {individualReport.pathToLegend.completedCount}/{individualReport.pathToLegend.totalNodes} nodes ({individualReport.pathToLegend.percent}%)
                                </strong> • Current Stage: <strong style={{ color: '#e2e8f0' }}>{individualReport.pathToLegend.currentStageTitle}</strong>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {onOpenStudentModal && (
                                <button
                                    onClick={() => onOpenStudentModal(individualReport.student)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.07)',
                                        border: '1px solid rgba(255, 255, 255, 0.16)',
                                        color: '#e2e8f0',
                                        padding: '8px 14px',
                                        borderRadius: '8px',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                    }}
                                >
                                    📊 Open Full Dossier
                                </button>
                            )}
                            <button
                                onClick={() => setReportScope('cohort')}
                                style={{
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    border: '1px solid rgba(56, 189, 248, 0.35)',
                                    color: '#38bdf8',
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                ← Back to Class Report
                            </button>
                        </div>
                    </div>

                    {/* Path to Legend 6-Stage Checkpoint Timeline */}
                    <div style={{
                        background: 'var(--bg-panel)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '20px'
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>
                            🗺️ Path to Legend — Stage & Checkpoint Progression
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                            {individualReport.pathToLegend.checkpoints.map((cp) => (
                                <div
                                    key={cp.id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.025)',
                                        border: `1px solid ${cp.isReached ? `${cp.accent}66` : 'rgba(255, 255, 255, 0.08)'}`,
                                        borderRadius: '12px',
                                        padding: '14px'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff' }}>
                                            {cp.badge} {cp.title}
                                        </span>
                                        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: cp.accent }}>
                                            {cp.completedCount}/{cp.totalCount}
                                        </span>
                                    </div>
                                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
                                        <div style={{ width: `${cp.progressPct}%`, height: '100%', background: cp.accent }} />
                                    </div>
                                    <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                                        {cp.stageFocus}
                                    </div>
                                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: cp.accent, marginTop: '4px' }}>
                                        {cp.averageScore !== null ? `Avg Quiz Score: ${cp.averageScore}% • ${cp.subheadline}` : cp.subheadline}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* App & Path to Legend Problems */}
                    <div style={{
                        background: 'var(--bg-panel)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '20px'
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', fontWeight: 800, color: '#fcd34d' }}>
                            ⚠️ Where There May Be Problems (App &amp; Path to Legend)
                        </h3>
                        {individualReport.problems.length === 0 ? (
                            <div style={{
                                padding: '12px 14px',
                                borderRadius: '10px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                color: '#6ee7b7',
                                fontSize: '0.84rem',
                                fontWeight: 700
                            }}>
                                ✓ No problems flagged across the app or Path to Legend.
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                                {individualReport.problems.map((prob) => {
                                    const st = SEVERITY_STYLE[prob.severity] || SEVERITY_STYLE.info;
                                    return (
                                        <div
                                            key={prob.id}
                                            style={{
                                                background: st.bg,
                                                border: `1px solid ${st.border}`,
                                                borderRadius: '10px',
                                                padding: '12px 14px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fff' }}>
                                                    {prob.title}
                                                </span>
                                                <span style={{
                                                    fontSize: '0.68rem',
                                                    fontWeight: 800,
                                                    background: st.badgeBg,
                                                    color: st.text,
                                                    padding: '2px 7px',
                                                    borderRadius: '5px',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {st.label}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '0.76rem', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.35 }}>
                                                {prob.detail}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherProgressReport;
