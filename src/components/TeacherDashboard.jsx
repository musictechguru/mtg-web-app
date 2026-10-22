import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../config/supabase';
import StudentProgressModal from './StudentProgressModal';
import {
    SIMPLE_C1_CHECKLIST,
    SIMPLE_C2_CHECKLIST,
    SIMPLE_C3_CHECKLIST,
    SIMPLE_C4_CHECKLIST,
    DEFAULT_SAMPLE_STUDENTS,
    computeSimpleStudentMetrics,
    getGradeFromPercentage
} from './teacherComponentMetrics';

const TEACHER_TICKS_KEY = 'mtg_teacher_evaluations_v3';

const TeacherDashboard = ({ onBack }) => {
    const { currentUser, userProgress, fetchClassProgress } = useUser();
    const [students, setStudents] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [buying, setBuying] = useState(false);
    const [copied, setCopied] = useState(false);

    // Active view: 'matrix' (All students table) or 'student_ticks' (Fill-in mode for a student)
    const [viewMode, setViewMode] = useState('matrix');
    const [selectedStudentId, setSelectedStudentId] = useState('teacher_live');
    const [selectedStudentForModal, setSelectedStudentForModal] = useState(null);
    const [activeComponentTab, setActiveComponentTab] = useState('all'); // 'all' | 'c1' | 'c2' | 'c3' | 'c4'
    const [searchQuery, setSearchQuery] = useState('');

    // Teacher saved ticks: { [student_id]: { c1: {}, c2: {}, c3: {}, c4: {}, teacherNotes: '' } }
    const [teacherTicks, setTeacherTicks] = useState(() => {
        try {
            const savedV3 = localStorage.getItem(TEACHER_TICKS_KEY);
            if (savedV3) return JSON.parse(savedV3);

            // One-time migration from v2: keep notes/c3/c4, reset c1 and c2
            const savedV2 = localStorage.getItem('mtg_teacher_evaluations_v2') || localStorage.getItem('mtg_teacher_saved_ticks_v2');
            if (savedV2) {
                const parsedV2 = JSON.parse(savedV2);
                const migrated = {};
                Object.keys(parsedV2).forEach(id => {
                    migrated[id] = {
                        teacherNotes: parsedV2[id]?.teacherNotes || '',
                        c1: {}, // reset Component 1
                        c2: {}, // reset Component 2
                        c3: parsedV2[id]?.c3 || {},
                        c4: parsedV2[id]?.c4 || {}
                    };
                });
                localStorage.setItem(TEACHER_TICKS_KEY, JSON.stringify(migrated));
                return migrated;
            }
            return {};
        } catch {
            return {};
        }
    });

    // Save teacher ticks to localStorage whenever updated
    useEffect(() => {
        try {
            localStorage.setItem(TEACHER_TICKS_KEY, JSON.stringify(teacherTicks));
        } catch (e) {
            console.warn('Failed to save teacher ticks:', e);
        }
    }, [teacherTicks]);

    // Reset Component 1 ticks for a single student (Teacher & Student)
    const resetStudentC1 = (studentId) => {
        setTeacherTicks(prev => {
            const studentData = prev[studentId] || {};
            return {
                ...prev,
                [studentId]: {
                    ...studentData,
                    c1: {}
                }
            };
        });
        setStudents(prev => prev.map(s => {
            if (s.student_id !== studentId) return s;
            return {
                ...s,
                progress: {
                    ...(s.progress || {}),
                    component1Guide: {
                        ...(s.progress?.component1Guide || {}),
                        markSchemeTicks: {},
                        checkedItems: {},
                        completedTechniques: {}
                    }
                }
            };
        }));
    };

    // Reset Component 2 ticks for a single student (Teacher & Student)
    const resetStudentC2 = (studentId) => {
        setTeacherTicks(prev => {
            const studentData = prev[studentId] || {};
            return {
                ...prev,
                [studentId]: {
                    ...studentData,
                    c2: {}
                }
            };
        });
        setStudents(prev => prev.map(s => {
            if (s.student_id !== studentId) return s;
            return {
                ...s,
                progress: {
                    ...(s.progress || {}),
                    component2Guide: {
                        ...(s.progress?.component2Guide || {}),
                        markSchemeTicks: {},
                        checkedItems: {},
                        completedTechniques: {}
                    }
                }
            };
        }));
    };

    // Reset both C1 and C2 ticks for a single student (Teacher & Student)
    const resetStudentC1C2 = (studentId) => {
        setTeacherTicks(prev => {
            const studentData = prev[studentId] || {};
            return {
                ...prev,
                [studentId]: {
                    ...studentData,
                    c1: {},
                    c2: {}
                }
            };
        });
        setStudents(prev => prev.map(s => {
            if (s.student_id !== studentId) return s;
            return {
                ...s,
                progress: {
                    ...(s.progress || {}),
                    component1Guide: {
                        ...(s.progress?.component1Guide || {}),
                        markSchemeTicks: {},
                        checkedItems: {},
                        completedTechniques: {}
                    },
                    component2Guide: {
                        ...(s.progress?.component2Guide || {}),
                        markSchemeTicks: {},
                        checkedItems: {},
                        completedTechniques: {}
                    }
                }
            };
        }));
    };

    // Reset both C1 and C2 ticks for ALL students (Teacher & Student)
    const resetAllStudentsC1C2 = () => {
        if (!window.confirm("Are you sure you want to reset all Component 1 and Component 2 ticks for all students?")) {
            return;
        }
        setTeacherTicks(prev => {
            const updated = {};
            Object.keys(prev).forEach(sid => {
                updated[sid] = {
                    ...prev[sid],
                    c1: {},
                    c2: {}
                };
            });
            return updated;
        });
        setStudents(prev => prev.map(s => ({
            ...s,
            progress: {
                ...(s.progress || {}),
                component1Guide: {
                    ...(s.progress?.component1Guide || {}),
                    markSchemeTicks: {},
                    checkedItems: {},
                    completedTechniques: {}
                },
                component2Guide: {
                    ...(s.progress?.component2Guide || {}),
                    markSchemeTicks: {},
                    checkedItems: {},
                    completedTechniques: {}
                }
            }
        })));
    };

    // Load real student roster from Supabase or default authentic cohort
    const loadStudents = useCallback(async () => {
        setLoadingStats(true);
        try {
            const data = await fetchClassProgress();

            if (data && data.length > 0) {
                // Merge DB records with authentic student defaults to ensure tracks and briefs are populated
                const merged = data.map(dbStudent => {
                    const sampleMatch = DEFAULT_SAMPLE_STUDENTS.find(
                        s => s.student_id === dbStudent.student_id || s.full_name === dbStudent.full_name
                    );
                    return {
                        ...sampleMatch,
                        ...dbStudent,
                        progress: {
                            ...(sampleMatch?.progress || {}),
                            ...(dbStudent.progress || {})
                        }
                    };
                });

                setStudents(merged);
            } else {
                // Only fallback to sample cohort for admin or developer preview
                const isDevOrAdmin = currentUser?.id === '7ba50a09-985b-4edd-a679-799f79d02353' || currentUser?.role === 'admin';
                setStudents(isDevOrAdmin ? DEFAULT_SAMPLE_STUDENTS : []);
            }
        } catch (err) {
            console.error("Error loading student roster:", err);
            const isDevOrAdmin = currentUser?.id === '7ba50a09-985b-4edd-a679-799f79d02353' || currentUser?.role === 'admin';
            setStudents(isDevOrAdmin ? DEFAULT_SAMPLE_STUDENTS : []);
        } finally {
            setLoadingStats(false);
        }
    }, [currentUser, fetchClassProgress]);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    // Teacher Live Preview Object
    const teacherLiveStudent = useMemo(() => {
        return {
            student_id: 'teacher_live',
            full_name: `${currentUser?.full_name || 'Teacher'} (My Live Demo)`,
            isTeacherPreview: true,
            progress: userProgress || {}
        };
    }, [currentUser, userProgress]);

    // Unified list of all profiles (Teacher Live + students)
    const allProfiles = useMemo(() => {
        return [teacherLiveStudent, ...students];
    }, [teacherLiveStudent, students]);

    // Currently inspected student
    const activeStudent = useMemo(() => {
        return allProfiles.find(s => s.student_id === selectedStudentId) || teacherLiveStudent;
    }, [allProfiles, selectedStudentId, teacherLiveStudent]);

    // Toggle a checkbox for a student in Component 1, 2, 3, or 4
    const toggleTick = (studentId, component, itemId, currentValue) => {
        setTeacherTicks(prev => {
            const studentData = prev[studentId] || {};
            const compData = studentData[component] || {};
            return {
                ...prev,
                [studentId]: {
                    ...studentData,
                    [component]: {
                        ...compData,
                        [itemId]: !currentValue
                    }
                }
            };
        });
    };

    // Update teacher notes for a student
    const updateTeacherNotes = (studentId, notes) => {
        setTeacherTicks(prev => {
            const studentData = prev[studentId] || {};
            return {
                ...prev,
                [studentId]: {
                    ...studentData,
                    teacherNotes: notes
                }
            };
        });
    };

    // Calculate metrics for all students
    const evaluatedProfiles = useMemo(() => {
        return allProfiles.map(student => {
            const metrics = computeSimpleStudentMetrics(student, teacherTicks);
            const gradeInfo = getGradeFromPercentage(metrics.overallPct);
            return {
                ...student,
                metrics,
                gradeInfo
            };
        });
    }, [allProfiles, teacherTicks]);

    // Class average statistics
    const classSummary = useMemo(() => {
        const count = evaluatedProfiles.length;
        if (count === 0) return { c1Avg: 0, c2Avg: 0, c3Avg: 0, c4Avg: 0, overallAvg: 0 };
        const c1Sum = evaluatedProfiles.reduce((acc, p) => acc + p.metrics.c1Pct, 0);
        const c2Sum = evaluatedProfiles.reduce((acc, p) => acc + p.metrics.c2Pct, 0);
        const c3Sum = evaluatedProfiles.reduce((acc, p) => acc + p.metrics.c3Pct, 0);
        const c4Sum = evaluatedProfiles.reduce((acc, p) => acc + p.metrics.c4Pct, 0);
        return {
            c1Avg: Math.round(c1Sum / count),
            c2Avg: Math.round(c2Sum / count),
            c3Avg: Math.round(c3Sum / count),
            c4Avg: Math.round(c4Sum / count),
            overallAvg: Math.round((c1Sum + c2Sum + c3Sum + c4Sum) / (count * 4))
        };
    }, [evaluatedProfiles]);

    // Filtered student list
    const filteredProfiles = useMemo(() => {
        return evaluatedProfiles.filter(p => {
            const name = (p.full_name || '').toLowerCase();
            return !searchQuery || name.includes(searchQuery.toLowerCase());
        });
    }, [evaluatedProfiles, searchQuery]);

    // Active student's metrics
    const activeMetrics = useMemo(() => {
        return computeSimpleStudentMetrics(activeStudent, teacherTicks);
    }, [activeStudent, teacherTicks]);

    const activeGradeInfo = useMemo(() => {
        return getGradeFromPercentage(activeMetrics.overallPct);
    }, [activeMetrics]);

    const handleCopyInvite = () => {
        const inviteLink = `${window.location.origin}/invite/${currentUser?.id || ''}`;
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBuyLicenses = async (priceId, seats) => {
        try {
            setBuying(true);
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: { priceId, checkoutType: 'classroom', quantity: 1, seats },
            });
            if (error) throw error;
            if (data?.url) window.location.href = data.url;
        } catch (err) {
            console.error("Error creating checkout session:", err);
            alert("Could not initialize checkout. Please try again.");
        } finally {
            setBuying(false);
        }
    };

    return (
        <div className="dashboard-container teacher-dashboard" style={{ maxWidth: '1240px', margin: '0 auto', padding: '16px 20px 60px 20px' }}>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '1.4rem' }}>👨‍🏫</span>
                        <h1 style={{ fontSize: '1.85rem', margin: 0, fontWeight: 800 }}>Teacher Desktop & Gradebook</h1>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                            Edexcel 9MT0
                        </span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                        Simple 4-Component progress overview and interactive tick list. Click any checkbox to update student progress in real-time.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={loadStudents}
                        disabled={loadingStats}
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#e2e8f0',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700
                        }}
                        title="Reload latest student progress and roster from database"
                    >
                        {loadingStats ? '↻ Refreshing...' : '↻ Refresh Roster'}
                    </button>
                    <button
                        onClick={handleCopyInvite}
                        style={{
                            background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.12)',
                            color: copied ? '#10b981' : 'var(--accent-blue)',
                            border: `1px solid ${copied ? '#10b981' : 'rgba(59, 130, 246, 0.3)'}`,
                            padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700
                        }}
                    >
                        {copied ? '✓ Link Copied!' : '🔗 Copy Student Invite'}
                    </button>
                    <button
                        onClick={() => handleBuyLicenses('price_1UD0U9LxDAAultYK3m7LkYHI', 5)}
                        disabled={buying}
                        style={{
                            background: 'rgba(139, 92, 246, 0.15)',
                            color: '#c084fc',
                            border: '1px solid rgba(139, 92, 246, 0.35)',
                            padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700
                        }}
                    >
                        {buying ? '...' : '+5 Licenses (£50)'}
                    </button>
                    <button
                        onClick={onBack}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#e2e8f0',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.82rem',
                            fontWeight: 700
                        }}
                    >
                        Return to App
                    </button>
                </div>
            </header>

            {/* 4 Clean Component Summary Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
                marginBottom: '24px'
            }}>
                {/* C1 Card */}
                <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8' }}>🎙️ Component 1: Recording</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{classSummary.c1Avg}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${classSummary.c1Avg}%`, height: '100%', background: '#38bdf8' }} />
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '6px' }}>
                        Coursework (20%) • 8 Key Milestones
                    </div>
                </div>

                {/* C2 Card */}
                <div style={{ background: 'rgba(244, 114, 182, 0.05)', border: '1px solid rgba(244, 114, 182, 0.25)', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f472b6' }}>🎹 Component 2: Composition</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{classSummary.c2Avg}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${classSummary.c2Avg}%`, height: '100%', background: '#f472b6' }} />
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '6px' }}>
                        Coursework (20%) • 8 Key Milestones
                    </div>
                </div>

                {/* C3 Card */}
                <div style={{ background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c084fc' }}>🎧 Component 3: Listening</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{classSummary.c3Avg}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${classSummary.c3Avg}%`, height: '100%', background: '#c084fc' }} />
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '6px' }}>
                        Exam Paper (25%) • 8 Key Milestones
                    </div>
                </div>

                {/* C4 Card */}
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399' }}>🎛️ Component 4: Producing</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>{classSummary.c4Avg}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ width: `${classSummary.c4Avg}%`, height: '100%', background: '#34d399' }} />
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '6px' }}>
                        DAW Practical Exam (35%) • 8 Key Milestones
                    </div>
                </div>
            </div>

            {/* View Mode Toggle Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '18px'
            }}>
                <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.75)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <button
                        onClick={() => setViewMode('matrix')}
                        style={{
                            padding: '9px 18px',
                            borderRadius: '8px',
                            border: 'none',
                            background: viewMode === 'matrix' ? '#38bdf8' : 'transparent',
                            color: viewMode === 'matrix' ? '#0f172a' : '#cbd5e1',
                            fontWeight: 800,
                            fontSize: '0.86rem',
                            cursor: 'pointer'
                        }}
                    >
                        📋 Class Overview & Matrix
                    </button>
                    <button
                        onClick={() => setViewMode('student_ticks')}
                        style={{
                            padding: '9px 18px',
                            borderRadius: '8px',
                            border: 'none',
                            background: viewMode === 'student_ticks' ? '#38bdf8' : 'transparent',
                            color: viewMode === 'student_ticks' ? '#0f172a' : '#cbd5e1',
                            fontWeight: 800,
                            fontSize: '0.86rem',
                            cursor: 'pointer'
                        }}
                    >
                        ✅ Fill In Student Tick List ({activeStudent.full_name.split(' ')[0]})
                    </button>
                </div>

                {viewMode === 'matrix' && (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="🔍 Filter student..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                background: 'rgba(15, 23, 42, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                color: '#fff',
                                padding: '7px 14px',
                                borderRadius: '8px',
                                fontSize: '0.84rem',
                                outline: 'none',
                                width: '200px'
                            }}
                        />
                        <button
                            onClick={resetAllStudentsC1C2}
                            style={{
                                background: 'rgba(239, 68, 68, 0.12)',
                                border: '1px solid rgba(239, 68, 68, 0.35)',
                                color: '#fca5a5',
                                padding: '7px 14px',
                                borderRadius: '8px',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                whiteSpace: 'nowrap'
                            }}
                            title="Reset all Component 1 and Component 2 ticks for all students"
                        >
                            ↺ Reset All C1 & C2 Ticks
                        </button>
                    </div>
                )}
            </div>

            {/* =========================================================
                VIEW 1: CLASS OVERVIEW & PROGRESS MATRIX
                ========================================================= */}
            {viewMode === 'matrix' && (
                <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    {loadingStats ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading candidate records...</div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '850px' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255, 255, 255, 0.04)', textAlign: 'left', fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                                        <th style={{ padding: '16px 20px' }}>Candidate</th>
                                        <th style={{ padding: '16px 14px', width: '130px' }}>🎙️ C1: Recording</th>
                                        <th style={{ padding: '16px 14px', width: '130px' }}>🎹 C2: Composition</th>
                                        <th style={{ padding: '16px 14px', width: '130px' }}>🎧 C3: Listening</th>
                                        <th style={{ padding: '16px 14px', width: '130px' }}>🎛️ C4: Producing</th>
                                        <th style={{ padding: '16px 14px', width: '100px' }}>Grade</th>
                                        <th style={{ padding: '16px 20px', textAlign: 'right', width: '190px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProfiles.map(student => {
                                        const m = student.metrics;
                                        const gr = student.gradeInfo;

                                        return (
                                            <tr
                                                key={student.student_id}
                                                style={{
                                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                                    transition: 'background 0.15s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                {/* Student Name */}
                                                <td style={{ padding: '16px 20px' }}>
                                                    <button
                                                        onClick={() => setSelectedStudentForModal(student)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            padding: 0,
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px'
                                                        }}
                                                        title="Click to view full candidate analytics"
                                                    >
                                                        <span style={{ fontSize: '1.2rem' }}>{student.isTeacherPreview ? '🎓' : '👤'}</span>
                                                        <div>
                                                            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.94rem' }}>
                                                                {student.full_name}
                                                            </div>
                                                            {student.isTeacherPreview && (
                                                                <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>
                                                                    Teacher Live Demo
                                                                </span>
                                                            )}
                                                            {student.isSample && (
                                                                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                                                    Sample Student
                                                                </span>
                                                            )}
                                                        </div>
                                                    </button>
                                                </td>

                                                {/* C1 Progress (60 Marks) */}
                                                <td style={{ padding: '16px 14px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                                        <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.84rem' }}>
                                                            {m.c1Marks}m
                                                        </span>
                                                        <span style={{ color: '#94a3b8', fontSize: '0.74rem' }}>
                                                            {m.c1Pct}%
                                                        </span>
                                                    </div>
                                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${m.c1Pct}%`, height: '100%', background: '#38bdf8' }} />
                                                    </div>
                                                </td>

                                                {/* C2 Progress (60 Marks) */}
                                                <td style={{ padding: '16px 14px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                                        <span style={{ color: '#f472b6', fontWeight: 800, fontSize: '0.84rem' }}>
                                                            {m.c2Marks}m
                                                        </span>
                                                        <span style={{ color: '#94a3b8', fontSize: '0.74rem' }}>
                                                            {m.c2Pct}%
                                                        </span>
                                                    </div>
                                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${m.c2Pct}%`, height: '100%', background: '#f472b6' }} />
                                                    </div>
                                                </td>

                                                {/* C3 Progress (75 Marks) */}
                                                <td style={{ padding: '16px 14px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                                        <span style={{ color: '#c084fc', fontWeight: 800, fontSize: '0.84rem' }}>
                                                            {m.c3Marks}m
                                                        </span>
                                                        <span style={{ color: '#94a3b8', fontSize: '0.74rem' }}>
                                                            {m.c3Pct}%
                                                        </span>
                                                    </div>
                                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${m.c3Pct}%`, height: '100%', background: '#c084fc' }} />
                                                    </div>
                                                </td>

                                                {/* C4 Progress (75 Marks) */}
                                                <td style={{ padding: '16px 14px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                                        <span style={{ color: '#34d399', fontWeight: 800, fontSize: '0.84rem' }}>
                                                            {m.c4Marks}m
                                                        </span>
                                                        <span style={{ color: '#94a3b8', fontSize: '0.74rem' }}>
                                                            {m.c4Pct}%
                                                        </span>
                                                    </div>
                                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${m.c4Pct}%`, height: '100%', background: '#34d399' }} />
                                                    </div>
                                                </td>

                                                {/* Overall Grade */}
                                                <td style={{ padding: '16px 14px' }}>
                                                    <span style={{
                                                        background: gr.bg,
                                                        color: gr.color,
                                                        border: `1px solid ${gr.color}40`,
                                                        borderRadius: '6px',
                                                        padding: '4px 10px',
                                                        fontSize: '0.82rem',
                                                        fontWeight: 800,
                                                        display: 'inline-block'
                                                    }}>
                                                        {gr.grade} ({m.overallPct}%)
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                                    <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedStudentId(student.student_id);
                                                                setViewMode('student_ticks');
                                                            }}
                                                            style={{
                                                                background: 'rgba(56, 189, 248, 0.15)',
                                                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                                                color: '#38bdf8',
                                                                padding: '6px 12px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 700,
                                                                cursor: 'pointer',
                                                                whiteSpace: 'nowrap'
                                                            }}
                                                        >
                                                            ✏️ Moderate & Tick
                                                        </button>
                                                        <button
                                                            onClick={() => setSelectedStudentForModal(student)}
                                                            style={{
                                                                background: 'rgba(255, 255, 255, 0.06)',
                                                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                                                color: '#cbd5e1',
                                                                padding: '6px 10px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                whiteSpace: 'nowrap'
                                                            }}
                                                        >
                                                            📊 Details
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* =========================================================
                VIEW 2: STUDENT TICK LIST (TEACHER FILL-IN MODE)
                ========================================================= */}
            {viewMode === 'student_ticks' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    {/* Top Student Switcher Bar */}
                    <div style={{
                        background: 'var(--bg-panel)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '18px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '14px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                                Select Student to Fill In:
                            </span>
                            <select
                                value={selectedStudentId}
                                onChange={(e) => setSelectedStudentId(e.target.value)}
                                style={{
                                    background: 'rgba(15, 23, 42, 0.9)',
                                    border: '1px solid rgba(56, 189, 248, 0.5)',
                                    color: '#fff',
                                    padding: '9px 16px',
                                    borderRadius: '10px',
                                    fontWeight: 800,
                                    fontSize: '0.92rem',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                {allProfiles.map(s => (
                                    <option key={s.student_id} value={s.student_id}>
                                        {s.isTeacherPreview ? '🎓 ' : '👤 '}{s.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => resetStudentC1C2(activeStudent.student_id)}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.12)',
                                    border: '1px solid rgba(239, 68, 68, 0.35)',
                                    color: '#fca5a5',
                                    padding: '8px 14px',
                                    borderRadius: '8px',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    whiteSpace: 'nowrap'
                                }}
                                title={`Reset Component 1 & 2 ticks for ${activeStudent.full_name}`}
                            >
                                ↺ Reset C1 & C2
                            </button>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Overall Completion</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: activeGradeInfo.color }}>
                                    {activeMetrics.overallPct}% • Grade {activeGradeInfo.grade}
                                </div>
                            </div>
                            <button
                                onClick={() => setViewMode('matrix')}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    color: '#fff',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontWeight: 700,
                                    fontSize: '0.82rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ← Back to Class Overview
                            </button>
                        </div>
                    </div>

                    {/* Candidate Coursework & Progress Overview Strip */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '14px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '14px'
                    }}>
                        <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap', fontSize: '0.86rem' }}>
                            <div>
                                <span style={{ color: 'var(--text-secondary)' }}>🎙️ C1 Track: </span>
                                <strong style={{ color: '#fff' }}>
                                    {activeStudent.progress?.component1Guide?.sessionInfo?.prescribedTrack || activeStudent.progress?.component1Guide?.chosenSong || 'In Progress'}
                                </strong>
                            </div>
                            <div>
                                <span style={{ color: 'var(--text-secondary)' }}>🎹 C2 Stimulus: </span>
                                <strong style={{ color: '#fff' }}>
                                    {activeStudent.progress?.component2Guide?.stimulusInfo?.trackTitle || 'In Progress'}
                                </strong>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', fontSize: '0.84rem' }}>
                            <span style={{ color: '#38bdf8', fontWeight: 800 }}>C1: {activeMetrics.c1Marks}/60m</span>
                            <span style={{ color: '#f472b6', fontWeight: 800 }}>C2: {activeMetrics.c2Marks}/60m</span>
                            <span style={{ color: '#c084fc', fontWeight: 800 }}>C3: {activeMetrics.c3Marks}/75m</span>
                            <span style={{ color: '#34d399', fontWeight: 800 }}>C4: {activeMetrics.c4Marks}/75m</span>
                        </div>
                    </div>

                    {/* Component Filter Tabs */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                            { id: 'all', label: 'All 4 Components' },
                            { id: 'c1', label: `🎙️ C1: Recording (${activeMetrics.c1Marks}/60m)`, color: '#38bdf8' },
                            { id: 'c2', label: `🎹 C2: Composition (${activeMetrics.c2Marks}/60m)`, color: '#f472b6' },
                            { id: 'c3', label: `🎧 C3: Listening (${activeMetrics.c3Marks}/75m)`, color: '#c084fc' },
                            { id: 'c4', label: `🎛️ C4: Producing (${activeMetrics.c4Marks}/75m)`, color: '#34d399' }
                        ].map(c => (
                            <button
                                key={c.id}
                                onClick={() => setActiveComponentTab(c.id)}
                                style={{
                                    padding: '7px 14px',
                                    borderRadius: '8px',
                                    border: activeComponentTab === c.id ? `1px solid ${c.color || 'var(--accent-blue)'}` : '1px solid rgba(255,255,255,0.1)',
                                    background: activeComponentTab === c.id ? (c.color ? `${c.color}22` : 'rgba(56, 189, 248, 0.2)') : 'transparent',
                                    color: activeComponentTab === c.id ? (c.color || '#38bdf8') : 'var(--text-secondary)',
                                    fontSize: '0.82rem',
                                    fontWeight: 800,
                                    cursor: 'pointer'
                                }}
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>

                    {/* 4 Interactive Component Tick List Panels */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* COMPONENT 1 TICK LIST */}
                        {(activeComponentTab === 'all' || activeComponentTab === 'c1') && (
                            <div style={{ background: 'var(--bg-panel)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '16px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#38bdf8', fontWeight: 800 }}>
                                            🎙️ Component 1: Recording Mark Scheme (9MT0/01)
                                        </h3>
                                        <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            Coursework (20%) • Multi-track capture, EQ, dynamics, FX, stereo balance & master • 60 Marks Total
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.35)', padding: '4px 12px', borderRadius: '8px', fontWeight: 800, fontSize: '0.84rem' }}>
                                            🏆 {activeMetrics.c1Marks || activeMetrics.c1Count * 4} / 60 Marks ({activeMetrics.c1Pct}%) • Grade {getGradeFromPercentage(activeMetrics.c1Pct).grade}
                                        </span>
                                        <button
                                            onClick={() => resetStudentC1(activeStudent.student_id)}
                                            style={{
                                                background: 'rgba(56, 189, 248, 0.1)',
                                                border: '1px solid rgba(56, 189, 248, 0.3)',
                                                color: '#38bdf8',
                                                padding: '4px 10px',
                                                borderRadius: '8px',
                                                fontSize: '0.74rem',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                            title="Reset Component 1 ticks for this student"
                                        >
                                            ↺ Reset C1
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                                    {SIMPLE_C1_CHECKLIST.map(item => {
                                        const checked = Boolean(activeMetrics.c1Ticks[item.id]);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleTick(activeStudent.student_id, 'c1', item.id, checked)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '12px',
                                                    background: checked ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                                    border: `1px solid ${checked ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'}`,
                                                    borderRadius: '10px',
                                                    padding: '12px 14px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                <div style={{
                                                    width: '20px', height: '20px', borderRadius: '5px',
                                                    background: checked ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
                                                    border: `1px solid ${checked ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#0f172a', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0, marginTop: '2px'
                                                }}>
                                                    {checked ? '✓' : ''}
                                                </div>
                                                <div style={{ flex: '1' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '6px' }}>
                                                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: checked ? '#fff' : '#cbd5e1' }}>
                                                            {item.label}
                                                        </div>
                                                        <span style={{
                                                            background: checked ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                                                            color: checked ? '#38bdf8' : '#94a3b8',
                                                            padding: '1px 6px',
                                                            borderRadius: '4px',
                                                            fontSize: '0.7rem',
                                                            fontWeight: 800,
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            +{item.marks || 4}m
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                                                        {item.sub}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* COMPONENT 2 TICK LIST */}
                        {(activeComponentTab === 'all' || activeComponentTab === 'c2') && (
                            <div style={{ background: 'var(--bg-panel)', border: '1px solid rgba(244, 114, 182, 0.3)', borderRadius: '16px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f472b6', fontWeight: 800 }}>
                                            🎹 Component 2: Technology-Based Composition Mark Scheme (9MT0/02)
                                        </h3>
                                        <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            Coursework (20%) • Brief & stimulus, 6+ parts, AG1 Synthesis, AG2 Sampling, AG3 Creative FX, Musicality • 60 Marks Total
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ background: 'rgba(244, 114, 182, 0.15)', color: '#f472b6', border: '1px solid rgba(244, 114, 182, 0.35)', padding: '4px 12px', borderRadius: '8px', fontWeight: 800, fontSize: '0.84rem' }}>
                                            🏆 {activeMetrics.c2Marks || activeMetrics.c2Count * 4} / 60 Marks ({activeMetrics.c2Pct}%) • Grade {getGradeFromPercentage(activeMetrics.c2Pct).grade}
                                        </span>
                                        <button
                                            onClick={() => resetStudentC2(activeStudent.student_id)}
                                            style={{
                                                background: 'rgba(244, 114, 182, 0.1)',
                                                border: '1px solid rgba(244, 114, 182, 0.3)',
                                                color: '#f472b6',
                                                padding: '4px 10px',
                                                borderRadius: '8px',
                                                fontSize: '0.74rem',
                                                fontWeight: 700,
                                                cursor: 'pointer'
                                            }}
                                            title="Reset Component 2 ticks for this student"
                                        >
                                            ↺ Reset C2
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                                    {SIMPLE_C2_CHECKLIST.map(item => {
                                        const checked = Boolean(activeMetrics.c2Ticks[item.id]);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleTick(activeStudent.student_id, 'c2', item.id, checked)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '12px',
                                                    background: checked ? 'rgba(244, 114, 182, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                                    border: `1px solid ${checked ? '#f472b6' : 'rgba(255, 255, 255, 0.08)'}`,
                                                    borderRadius: '10px',
                                                    padding: '12px 14px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                <div style={{
                                                    width: '20px', height: '20px', borderRadius: '5px',
                                                    background: checked ? '#f472b6' : 'rgba(255, 255, 255, 0.08)',
                                                    border: `1px solid ${checked ? '#f472b6' : 'rgba(255, 255, 255, 0.2)'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#0f172a', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0, marginTop: '2px'
                                                }}>
                                                    {checked ? '✓' : ''}
                                                </div>
                                                <div style={{ flex: '1' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '6px' }}>
                                                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: checked ? '#fff' : '#cbd5e1' }}>
                                                            {item.label}
                                                        </div>
                                                        <span style={{
                                                            background: checked ? 'rgba(244, 114, 182, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                                                            color: checked ? '#f472b6' : '#94a3b8',
                                                            padding: '1px 6px',
                                                            borderRadius: '4px',
                                                            fontSize: '0.7rem',
                                                            fontWeight: 800,
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            +{item.marks || 4}m
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                                                        {item.sub}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* COMPONENT 3 TICK LIST */}
                        {(activeComponentTab === 'all' || activeComponentTab === 'c3') && (
                            <div style={{ background: 'var(--bg-panel)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '16px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#c084fc', fontWeight: 800 }}>
                                            🎧 Component 3: Listening & Analysing Tick List (9MT0/03)
                                        </h3>
                                        <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            Exam Paper (25%) • 5 Genres (Funk, Synth Pop, Rock, Soul, Reggae), Acoustics, EQ/Dynamics, Section A & B essays.
                                        </p>
                                    </div>
                                    <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.35)', padding: '4px 12px', borderRadius: '8px', fontWeight: 800, fontSize: '0.84rem' }}>
                                        {activeMetrics.c3Count} / 8 Ticked ({activeMetrics.c3Pct}%)
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                                    {SIMPLE_C3_CHECKLIST.map(item => {
                                        const checked = Boolean(activeMetrics.c3Ticks[item.id]);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleTick(activeStudent.student_id, 'c3', item.id, checked)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '12px',
                                                    background: checked ? 'rgba(168, 85, 247, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                                    border: `1px solid ${checked ? '#c084fc' : 'rgba(255, 255, 255, 0.08)'}`,
                                                    borderRadius: '10px',
                                                    padding: '12px 14px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                <div style={{
                                                    width: '20px', height: '20px', borderRadius: '5px',
                                                    background: checked ? '#c084fc' : 'rgba(255, 255, 255, 0.08)',
                                                    border: `1px solid ${checked ? '#c084fc' : 'rgba(255, 255, 255, 0.2)'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#0f172a', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0, marginTop: '2px'
                                                }}>
                                                    {checked ? '✓' : ''}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: checked ? '#fff' : '#cbd5e1' }}>
                                                        {item.label}
                                                    </div>
                                                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                                                        {item.sub}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* COMPONENT 4 TICK LIST */}
                        {(activeComponentTab === 'all' || activeComponentTab === 'c4') && (
                            <div style={{ background: 'var(--bg-panel)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#34d399', fontWeight: 800 }}>
                                            🎛️ Component 4: Producing & Analysing Tick List (9MT0/04)
                                        </h3>
                                        <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            Practical DAW Exam (35%) • MIDI editing, Flex Pitch, synth programming, sidechain ducking, Section B/C essays.
                                        </p>
                                    </div>
                                    <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.35)', padding: '4px 12px', borderRadius: '8px', fontWeight: 800, fontSize: '0.84rem' }}>
                                        {activeMetrics.c4Count} / 8 Ticked ({activeMetrics.c4Pct}%)
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                                    {SIMPLE_C4_CHECKLIST.map(item => {
                                        const checked = Boolean(activeMetrics.c4Ticks[item.id]);
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleTick(activeStudent.student_id, 'c4', item.id, checked)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '12px',
                                                    background: checked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                                    border: `1px solid ${checked ? '#34d399' : 'rgba(255, 255, 255, 0.08)'}`,
                                                    borderRadius: '10px',
                                                    padding: '12px 14px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.15s ease'
                                                }}
                                            >
                                                <div style={{
                                                    width: '20px', height: '20px', borderRadius: '5px',
                                                    background: checked ? '#34d399' : 'rgba(255, 255, 255, 0.08)',
                                                    border: `1px solid ${checked ? '#34d399' : 'rgba(255, 255, 255, 0.2)'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#0f172a', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0, marginTop: '2px'
                                                }}>
                                                    {checked ? '✓' : ''}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: checked ? '#fff' : '#cbd5e1' }}>
                                                        {item.label}
                                                    </div>
                                                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                                                        {item.sub}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Teacher Notes & Action Plan Area */}
                    <div style={{ background: 'var(--bg-panel)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '20px' }}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.96rem', color: '#e2e8f0', fontWeight: 700 }}>
                            📝 Teacher Notes & Individual Action Plan for {activeStudent.full_name}
                        </h4>
                        <textarea
                            placeholder="Type coursework targets, intervention notes, or studio dates for this candidate..."
                            value={activeMetrics.teacherNotes}
                            onChange={(e) => updateTeacherNotes(activeStudent.student_id, e.target.value)}
                            rows={3}
                            style={{
                                width: '100%',
                                background: 'rgba(15, 23, 42, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '10px',
                                color: '#fff',
                                padding: '12px',
                                fontSize: '0.88rem',
                                outline: 'none',
                                resize: 'vertical',
                                boxSizing: 'border-box'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                Notes and ticks save automatically in your browser session.
                            </span>
                            <button
                                onClick={() => setViewMode('matrix')}
                                style={{
                                    background: 'var(--accent-blue)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 18px',
                                    borderRadius: '8px',
                                    fontWeight: 700,
                                    fontSize: '0.84rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Done & Return to Matrix
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Expanded Detailed Student Progress Modal */}
            {selectedStudentForModal && (
                <StudentProgressModal
                    student={selectedStudentForModal}
                    onClose={() => setSelectedStudentForModal(null)}
                />
            )}
        </div>
    );
};

export default TeacherDashboard;
