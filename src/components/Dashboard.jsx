import React, { useMemo, useState, lazy, Suspense } from 'react';
import { useUser } from '../contexts/UserContext';
import GuruTracker from './GuruTracker';
import CampaignMap from './CampaignMap';
import campaignData from '../data/campaign_route.json';
import courseData from '../data/course_data.json';
import AssignmentBanner from './AssignmentBanner';
import { getGradeFromPercentage } from './teacherComponentMetrics';

const WelcomeVideoModal = lazy(() => import('./WelcomeVideoModal'));
const StudentMarkSchemeModal = lazy(() => import('./StudentMarkSchemeModal'));

const Dashboard = ({ onNavigate, onOpenProfile }) => {
    const { currentUser, userProgress, clearProgress, logout } = useUser();
    const [showWelcomeModal, setShowWelcomeModal] = React.useState(false);
    const [showProgress, setShowProgress] = React.useState(false);
    const [markSchemeModal, setMarkSchemeModal] = useState({ open: false, component: 'c1' });

    // Coursework 60-mark metrics for Component 1 & 2
    const courseworkStats = useMemo(() => {
        const c1Ticks = userProgress?.component1Guide?.markSchemeTicks || {};
        const c1Marks = Object.values(c1Ticks).filter(Boolean).length * 4;
        const c1Pct = Math.min(100, Math.round((c1Marks / 60) * 100));
        const c1Grade = getGradeFromPercentage(c1Pct);

        const c2Ticks = userProgress?.component2Guide?.markSchemeTicks || {};
        const c2Marks = Object.values(c2Ticks).filter(Boolean).length * 4;
        const c2Pct = Math.min(100, Math.round((c2Marks / 60) * 100));
        const c2Grade = getGradeFromPercentage(c2Pct);

        return { c1Marks, c1Pct, c1Grade, c2Marks, c2Pct, c2Grade };
    }, [userProgress]);

    // Calculate Global Guru Progress using Campaign Nodes
    const guruStats = useMemo(() => {
        const completedNodes = userProgress?.campaignCompleted || [];
        const completedCount = completedNodes.length;

        // Target: Total nodes in the campaign route
        const targetNodes = campaignData.rounds.reduce((acc, r) => acc + r.nodes.length, 0);
        const percent = Math.min(100, Math.round((completedCount / (targetNodes || 1)) * 100));

        let title = "Apprentice";
        if (percent >= 10) title = "Novice";
        if (percent >= 20) title = "Trainee";
        if (percent >= 30) title = "Adept";
        if (percent >= 40) title = "Engineer";
        if (percent >= 50) title = "Synthesist";
        if (percent >= 60) title = "Producer";
        if (percent >= 70) title = "Virtuoso";
        if (percent >= 80) title = "Master";
        if (percent >= 90) title = "Guru";
        if (percent >= 100) title = "Legend";

        return { progress: percent, level: title, count: completedCount, target: targetNodes };
    }, [userProgress]);

    // Calculate Overall Grade
    const getOverallGrade = () => {
        if (userProgress.history.length === 0) return '-';
        const totalPercentage = userProgress.history.reduce((acc, curr) => acc + (curr.score / curr.total), 0) / userProgress.history.length * 100;
        if (totalPercentage >= 80) return 'A';
        if (totalPercentage >= 70) return 'B';
        if (totalPercentage >= 60) return 'C';
        if (totalPercentage >= 50) return 'D';
        return 'U';
    };

    // Daily 5 Spaced Repetition streak
    const dailyStreak = useMemo(() => {
        try {
            const val = localStorage.getItem('mtg_daily5_streak');
            return val ? parseInt(val, 10) : 0;
        } catch {
            return 0;
        }
    }, []);

    // Homework Assignment task launcher
    const handleLaunchAssignmentTask = (task) => {
        if (!task || !onNavigate) return;
        if (task.type === 'quiz' || task.type === 'exam_c3' || task.type === 'exam_c4') {
            for (const section of courseData.sections || []) {
                for (const item of section.items || []) {
                    if (item.id === task.id || item.title === task.title) {
                        onNavigate(item);
                        return;
                    }
                }
            }
        } else if (task.type === 'tracksheet') {
            onNavigate({ id: 'tracksheet_creator', type: 'tracksheet_creator', title: 'Component 1: Track Sheet & Logbook', isPremium: true });
            return;
        } else if (task.type === 'fingerprints') {
            onNavigate({ type: 'lp_fingerprints', title: 'Sonic Fingerprints: Production Analysis' });
            return;
        } else if (task.type === 'dictionary') {
            onNavigate({ type: 'dictionary_selector', title: 'Dictionary Quizzes' });
            return;
        }
        onNavigate(task);
    };

    return (
        <div className="dashboard-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Active Teacher Homework Assignment Banner (auto-detects assignment URL/storage) */}
            <AssignmentBanner onLaunchTask={handleLaunchAssignmentTask} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                <h1 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '2.5rem' }}>
                    Welcome back, <span style={{ color: 'var(--accent-blue)' }}>{currentUser?.full_name || 'Creator'}!</span>
                </h1>
                
                {!currentUser?.full_name ? (
                    <button 
                        onClick={onOpenProfile}
                        className="pulse-button"
                        style={{
                            padding: '12px 24px', borderRadius: '12px', fontSize: '1.1rem',
                            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                        }}
                    >
                        <span style={{ fontSize: '1.3rem' }}>📝</span>
                        Set Your Name
                    </button>
                ) : (
                    <button 
                        onClick={onOpenProfile}
                        style={{
                            padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Permanent Guru Hero Section at Top */}
            <div className="guru-hero" style={{
                background: 'linear-gradient(135deg, var(--bg-panel) 0%, rgba(59, 130, 246, 0.1) 100%)',
                borderRadius: '20px',
                padding: '30px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                border: '1px solid var(--border-color)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <GuruTracker progress={guruStats.progress} levelTitle={guruStats.level} />
                </div>
                <div style={{ maxWidth: '600px', flex: '1 1 300px' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--accent-blue)' }}>
                        Path to Legend
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        You have completed <strong>{guruStats.count}</strong> out of <strong>{guruStats.target}</strong> campaign nodes.
                        Keep progressing through the map to charge the Guru!
                    </p>
                    <div style={{ marginTop: '20px', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <span>Apprentice</span>
                            {guruStats.progress >= 50 ? <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{guruStats.level}</span> : <span>...</span>}
                            <span>Legend</span>
                        </div>
                        <div style={{ height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '7px', position: 'relative' }}>
                            {/* The filled section */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0,
                                width: `${guruStats.progress}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-success) 100%)',
                                borderRadius: '7px',
                                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                            }} />

                            {/* Level Markers */}
                            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(threshold => (
                                <div key={threshold} style={{
                                    position: 'absolute',
                                    left: `${threshold}%`,
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '4px',
                                    height: '14px',
                                    background: guruStats.progress >= threshold ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                                    borderRadius: '2px'
                                }} />
                            ))}
                        </div>

                        {/* Current Level Indicator */}
                        <div style={{
                            position: 'absolute',
                            left: `${Math.min(95, guruStats.progress)}%`,
                            top: '40px',
                            transform: 'translateX(-50%)',
                            background: 'var(--bg-panel)',
                            padding: '4px 10px',
                            borderRadius: '10px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--accent-blue)',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            transition: 'left 1s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}>
                            {guruStats.progress}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="welcome-banner" style={{ textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <button
                    onClick={() => setShowWelcomeModal(true)}
                    style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        color: 'var(--accent-blue)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: '600'
                    }}
                >
                    <span>🎬</span> Watch Welcome Tour
                </button>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={clearProgress}
                        style={{ background: 'transparent', border: '1px solid #333', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', color: '#666', cursor: 'pointer' }}
                    >
                        Reset Data
                    </button>
                    <button
                        onClick={logout}
                        style={{ background: 'transparent', border: '1px solid #e11d48', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', color: '#e11d48', cursor: 'pointer' }}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* Slim Daily 5 Spaced Repetition Sprint Bar */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 88, 12, 0.06) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '14px',
                padding: '12px 20px',
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #ea580c, #f97316)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        boxShadow: '0 2px 8px rgba(249, 115, 22, 0.3)'
                    }}>
                        🔥
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                                Daily 5 Quick-Fire Drill
                            </span>
                            <span style={{
                                fontSize: '0.72rem',
                                fontWeight: 'bold',
                                background: dailyStreak > 0 ? 'rgba(249, 115, 22, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                                color: dailyStreak > 0 ? '#fb923c' : '#94a3b8',
                                border: `1px solid ${dailyStreak > 0 ? 'rgba(249, 115, 22, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`,
                                padding: '2px 8px',
                                borderRadius: '6px'
                            }}>
                                🔥 {dailyStreak > 0 ? `${dailyStreak}-Day Streak` : 'Start Streak'}
                            </span>
                        </div>
                        <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            2-minute spaced repetition sprint targeting past mistakes and review-due questions.
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => onNavigate({ id: 'quick_fire_daily5', type: 'quick_fire_daily5', title: 'Daily 5 Quick-Fire Drill' })}
                    style={{
                        padding: '9px 18px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                        color: '#fff',
                        border: 'none',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 10px rgba(234, 88, 12, 0.3)',
                        transition: 'transform 0.2s',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <span>⚡</span> Start Daily 5 Drill (+XP)
                </button>
            </div>

            {/* CENTRAL FOCUS: THE PATH TO LEGEND (Campaign Map) */}
            <div id="campaign-map-section" style={{ marginBottom: '35px' }}>
                <CampaignMap onNavigate={onNavigate} />
            </div>

            {/* Coursework & Specialised Tools (Compact, Non-Distracting Grid) */}
            <div style={{ marginBottom: '35px' }}>
                <div style={{ marginBottom: '14px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🎛️</span> Coursework &amp; Specialised Tools
                    </h3>
                    <p style={{ margin: '3px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                        Quick access to your 16-block syllabus timetable, C1/C2 coursework guides, and listening laboratories.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '16px'
                }}>
                    {/* Card 1: 16-Block Timetable */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    🗺️
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '3px 8px', borderRadius: '6px' }}>
                                    EDEXCEL 9MT0
                                </span>
                            </div>
                            <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                                16-Block Scheme of Work
                            </h4>
                            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                                24-week framework (12h per block) covering theory, listening, and coursework milestones.
                            </p>
                        </div>
                        <button
                            onClick={() => onNavigate({ type: 'timetable_builder', title: '16-Block Timetable & Scheme of Work' })}
                            style={{
                                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                color: '#fff',
                                border: 'none',
                                padding: '9px 14px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Launch Timetable Quest Map →
                        </button>
                    </div>

                    {/* Card 2: Component 1 Track Sheet */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)',
                        border: '1px solid rgba(168, 85, 247, 0.25)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    🎚️
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '3px 8px', borderRadius: '6px' }}>
                                    9MT0/01 • {courseworkStats.c1Marks}/60m
                                </span>
                            </div>
                            <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                                Component 1 Track Sheet &amp; Logbook
                            </h4>
                            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                                DAW session sheets, mic setups, and PDF logbook generator with marking rationale.
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <button
                                onClick={() => onNavigate({ id: 'tracksheet_creator', type: 'tracksheet_creator', title: 'Component 1: Track Sheet & Logbook', isPremium: true })}
                                style={{
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    textAlign: 'center'
                                }}
                            >
                                Track Sheet →
                            </button>
                            <button
                                onClick={() => {
                                    if (!currentUser?.is_premium) {
                                        onNavigate({ id: 'component1_checklist', type: 'premium_locked', title: 'Component 1: Mark Scheme Checklist', isPremium: true });
                                        return;
                                    }
                                    setMarkSchemeModal({ open: true, component: 'c1' });
                                }}
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    color: '#e2e8f0',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    textAlign: 'center'
                                }}
                            >
                                Tick List →
                            </button>
                        </div>
                    </div>

                    {/* Card 3: Component 2 Composition */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%)',
                        border: '1px solid rgba(244, 114, 182, 0.25)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    🎹
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6', padding: '3px 8px', borderRadius: '6px' }}>
                                    9MT0/02 • {courseworkStats.c2Marks}/60m
                                </span>
                            </div>
                            <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                                Component 2: Composition Guide
                            </h4>
                            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                                Brief 2 &amp; 3 companion, 24 synthesis &amp; FX techniques, and logbook entries.
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <button
                                onClick={() => onNavigate({ id: 'component2_guide', type: 'component2_guide', title: 'Component 2: Composition Guide & Logbook', isPremium: true })}
                                style={{
                                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    textAlign: 'center'
                                }}
                            >
                                Open Guide →
                            </button>
                            <button
                                onClick={() => {
                                    if (!currentUser?.is_premium) {
                                        onNavigate({ id: 'component2_checklist', type: 'premium_locked', title: 'Component 2: Mark Scheme Checklist', isPremium: true });
                                        return;
                                    }
                                    setMarkSchemeModal({ open: true, component: 'c2' });
                                }}
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    color: '#e2e8f0',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    padding: '8px 10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    textAlign: 'center'
                                }}
                            >
                                Tick List →
                            </button>
                        </div>
                    </div>

                    {/* Card 4: Sonic Fingerprints Lab */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
                        border: '1px solid rgba(99, 102, 241, 0.25)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    🎧
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '3px 8px', borderRadius: '6px' }}>
                                    1950s–2010s
                                </span>
                            </div>
                            <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                                Sonic Fingerprints: Production Analysis
                            </h4>
                            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                                Critical listening lab on iconic tracks (Beatles, Pink Floyd, Daft Punk, etc.).
                            </p>
                        </div>
                        <button
                            onClick={() => onNavigate({ id: 'lp_fingerprints', type: 'lp_fingerprints', title: 'Sonic Fingerprints: Production Analysis' })}
                            style={{
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                                color: '#fff',
                                border: 'none',
                                padding: '9px 14px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Launch Fingerprints Lab →
                        </button>
                    </div>

                    {/* Card 5: 1-on-1 Music Tech Tutor */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(0, 193, 240, 0.12) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        border: '1px solid rgba(0, 193, 240, 0.4)',
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <div style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #00C1F0, #0284c7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.25rem'
                                }}>
                                    🎓
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', background: 'rgba(0, 193, 240, 0.2)', color: '#00C1F0', padding: '3px 8px', borderRadius: '6px' }}>
                                    1-ON-1 ONLINE
                                </span>
                            </div>
                            <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
                                Music Tech Tutor (Private Lessons)
                            </h4>
                            <p style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                                1-on-1 private tuition with Thor. 20+ years Edexcel teaching, coursework rescue, and exam mastery.
                            </p>
                        </div>
                        <a
                            href="https://www.musictechguru.com/homepage/music-tech-tutor/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                background: 'linear-gradient(135deg, #00C1F0 0%, #0284c7 100%)',
                                color: '#0b0f19',
                                textDecoration: 'none',
                                padding: '9px 14px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 8px rgba(0, 193, 240, 0.3)',
                                transition: 'all 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Book Free Consultation ↗
                        </a>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <button
                    onClick={() => setShowProgress(!showProgress)}
                    style={{
                        backgroundColor: showProgress ? 'rgba(255,255,255,0.1)' : 'var(--accent-purple)',
                        color: showProgress ? 'var(--text-primary)' : '#fff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        padding: '10px 30px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {showProgress ? 'Hide Progress' : 'View Path to Legend & Progress Stats'}
                </button>
            </div>

            {showProgress && (
                <div className="progress-dropdown" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ color: 'var(--accent-purple)', margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Grade</h3>
                            <div style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>{getOverallGrade()}</div>
                        </div>
                        <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ color: 'var(--accent-blue)', margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quizzes Taken</h3>
                            <div style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>{userProgress.quizzesCompleted}</div>
                        </div>
                        <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ color: '#10b981', margin: '0 0 10px 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Questions Answered</h3>
                            <div style={{ fontSize: '3rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>{userProgress.totalScore}</div>
                        </div>
                    </div>

                    <div className="dashboard-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

                        {/* Topic Mastery */}
                        <div className="mastery-section">
                            <h2 style={{ marginBottom: '20px' }}>Topic Mastery</h2>
                            {Object.keys(userProgress.mastery).length > 0 ? (
                                <div className="mastery-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {Object.entries(userProgress.mastery).map(([topic, score]) => (
                                        <div key={topic} style={{ background: 'var(--bg-panel)', padding: '15px', borderRadius: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <strong>{topic}</strong>
                                                <span>{score}%</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${score}%`,
                                                    height: '100%',
                                                    background: score >= 70 ? 'var(--accent-success)' : score >= 40 ? '#facc15' : 'var(--accent-error)',
                                                    transition: 'width 0.5s ease'
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-panel)', borderRadius: '10px', color: 'var(--text-secondary)' }}>
                                    No data yet. Take a quiz to see your mastery!
                                </div>
                            )}
                        </div>

                        {/* Recent Activity */}
                        <div className="activity-section">
                            <h2 style={{ marginBottom: '20px' }}>Recent Activity</h2>
                            {userProgress.history.length > 0 ? (
                                <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {userProgress.history.map((item, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            background: 'rgba(255,255,255,0.03)',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            borderLeft: `4px solid ${item.grade === 'A' || item.grade === 'B' ? 'var(--accent-success)' : item.grade === 'U' || item.grade === 'D' ? 'var(--accent-error)' : '#facc15'}`
                                        }}>
                                            <div>
                                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{item.quizTitle}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.date}</div>
                                            </div>
                                            <div style={{ fontWeight: 'bold' }}>{item.grade} ({item.score}/{item.total})</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: 'var(--text-secondary)' }}>No recent activity.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Welcome Video Replay logic */}
            {showWelcomeModal && (
                <Suspense fallback={null}>
                    <WelcomeVideoModal onClose={() => setShowWelcomeModal(false)} />
                </Suspense>
            )}

            {/* Coursework Mark Scheme Points Interactive Modal */}
            {markSchemeModal.open && (
                <Suspense fallback={null}>
                    <StudentMarkSchemeModal
                        isOpen={markSchemeModal.open}
                        initialComponent={markSchemeModal.component}
                        onClose={() => setMarkSchemeModal({ open: false, component: 'c1' })}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default Dashboard;
