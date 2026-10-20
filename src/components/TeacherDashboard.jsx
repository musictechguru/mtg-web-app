import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../config/supabase';
import StudentProgressModal from './StudentProgressModal';
import Component2Guide from './Component2Guide/Component2Guide';
import {
    OVERVIEW_SPECS,
    MARK_SCHEME_DETAILED,
    WORKFLOW_PHASES
} from './Component2Guide/component2Data';

const TEACHER_C2_CHECKLIST_KEY = 'mtg_teacher_c2_moderation_checklist_v1';

const TEACHER_MODERATION_ITEMS = [
    { id: 'tm_1', phase: 'Week 1: Brief & Stimulus', text: 'Guided all students to select Brief 2 (Text/Poem) or Brief 3 (Topic/Stimulus) rather than Brief 1 (Video).' },
    { id: 'tm_2', phase: 'Week 1: Brief & Stimulus', text: 'Verified every student has imported a commercial Stimulus Track into Logic Pro X at -6dB with matched project tempo.' },
    { id: 'tm_3', phase: 'Weeks 2–4: Core Composition', text: 'Checked that each student composition has at least 6 distinct parts (vocal, instrumental, sample-based) and clear section contrast.' },
    { id: 'tm_4', phase: 'Weeks 2–4: Core Composition', text: 'Confirmed Brief 2 students have used the set text in a clearly recognisable form (sung, rapped, spoken, or intelligible slices).' },
    { id: 'tm_5', phase: 'Weeks 5–6: AG1–AG3 Tech Audit', text: 'Audited student projects for bespoke AG1 Synthesis (oscillator detuning, filter sweeps, ADSR, LFO, FM, Glide, Wavetables).' },
    { id: 'tm_6', phase: 'Weeks 5–6: AG1–AG3 Tech Audit', text: 'Audited student projects for AG2 Sampling (6+ samples, Quick Sampler slicing, Flex Time, Flex Pitch harmonies, looping, bitcrushing, multi-zone mapping).' },
    { id: 'tm_7', phase: 'Weeks 5–6: AG1–AG3 Tech Audit', text: 'Audited student projects for AG3 Creative FX & Automation (reverb blooms, delay throws/feedback escalation, modulation FX, EVOC 20 vocoder, gated reverb).' },
    { id: 'tm_8', phase: 'Week 7: AG4 Mix & Master', text: 'Reviewed student mixes for high-pass filtering (<80Hz on non-bass), track/bus compression, stereo balance, and Adaptive Limiter (-0.1dB ceiling, -14 to -10 LUFS).' },
    { id: 'tm_9', phase: 'Week 8: Logbook & Credits', text: 'Verified every student Logbook contains specific technical parameters, bar numbers, screenshots, and full credits for ALL samples (including AI-generated) & performers.' },
    { id: 'tm_10', phase: 'Week 8: Final Submission', text: 'Checked all exported audio bounces are 3:00 duration, 16-bit / 44.1kHz Stereo .WAV (Normalize: Off), named 9MT002_centrenumber_candidatenumber_name.wav, with signed Authentication Forms.' }
];

const TeacherDashboard = ({ onBack }) => {
    const { currentUser, fetchClassProgress } = useUser();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);
    const [buying, setBuying] = useState(false);
    const [copied, setCopied] = useState(false);
    const [teacherTab, setTeacherTab] = useState('overview'); // 'overview' | 'c2_tracker' | 'c2_guide'

    const [teacherModChecks, setTeacherModChecks] = useState(() => {
        try {
            const saved = localStorage.getItem(TEACHER_C2_CHECKLIST_KEY);
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(TEACHER_C2_CHECKLIST_KEY, JSON.stringify(teacherModChecks));
        } catch (e) {
            console.warn('Failed to save teacher moderation checks:', e);
        }
    }, [teacherModChecks]);

    const toggleTeacherModCheck = (id) => {
        setTeacherModChecks(prev => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        const loadStudents = async () => {
            setLoadingStats(true);
            const data = await fetchClassProgress();
            setStudents(data || []);
            setLoadingStats(false);
        };
        if (currentUser?.role === 'teacher') {
            loadStudents();
        } else {
            setLoadingStats(false);
        }
    }, [currentUser, fetchClassProgress]);

    const handleBuyLicenses = async (priceId, seats) => {
        try {
            setBuying(true);
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: {
                    priceId: priceId,
                    checkoutType: 'classroom',
                    quantity: 1,
                    seats: seats
                },
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

    const handleCopyInvite = () => {
        const inviteLink = `${window.location.origin}/invite/${currentUser.id}`;
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Helper to extract Component 2 metrics for a student
    const getStudentC2Metrics = (student) => {
        const c2 = student?.progress?.component2Guide || null;
        if (!c2) {
            return { started: false, briefLabel: 'Not Set', techDone: 0, synDone: 0, smpDone: 0, fxDone: 0, phaseDone: 0, masterDone: 0, notesCount: 0, stimulusText: '-' };
        }
        const completedTechIds = c2.completedTechniques ? Object.keys(c2.completedTechniques).filter(k => c2.completedTechniques[k]) : [];
        const synDone = completedTechIds.filter(k => k.startsWith('syn_')).length;
        const smpDone = completedTechIds.filter(k => k.startsWith('smp_')).length;
        const fxDone = completedTechIds.filter(k => k.startsWith('fx_')).length;
        const checkedKeys = c2.checkedItems ? Object.keys(c2.checkedItems).filter(k => c2.checkedItems[k]) : [];
        const masterDone = checkedKeys.filter(k => k.startsWith('mc_')).length;
        const phaseDone = checkedKeys.filter(k => /^p[1-5]_/.test(k)).length;
        const notesCount = c2.techniqueNotes ? Object.values(c2.techniqueNotes).filter(v => v && v.trim()).length : 0;
        const briefLabel = c2.selectedBrief === 'brief3' ? 'Brief 3 (Topic)' : c2.selectedBrief === 'brief1' ? 'Brief 1 (Video)' : 'Brief 2 (Text)';
        const stimulusText = c2.stimulusInfo?.trackTitle
            ? `${c2.stimulusInfo.trackTitle}${c2.stimulusInfo.artist ? ` (${c2.stimulusInfo.artist})` : ''}`
            : '-';

        return {
            started: true,
            briefLabel,
            techDone: completedTechIds.length,
            synDone,
            smpDone,
            fxDone,
            phaseDone,
            masterDone,
            notesCount,
            stimulusText
        };
    };

    if (currentUser?.role !== 'teacher') {
        return (
            <div className="dashboard-container" style={{ textAlign: 'center', padding: '50px 20px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Teacher Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    You need a Classroom Pack to access student tracking and classroom management features.
                </p>
                <div style={{ marginBottom: '30px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Logged in as: <strong>{currentUser?.email}</strong>
                </div>

                <div style={{ background: 'var(--bg-panel)', padding: '30px', borderRadius: '16px', maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h2>Get Started as a Teacher</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>Unlock the dashboard, track student quiz & Component 2 coursework progress, and invite your students with a Classroom Pack.</p>
                        
                        <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
                             <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>Already purchased a pack?</p> 
                             <button 
                                onClick={() => window.location.reload()}
                                className="btn-primary"
                                style={{ background: 'transparent', border: '1px solid var(--accent-success)', color: 'var(--accent-success)', padding: '8px 15px', fontSize: '0.9rem' }}
                             >
                                🔄 Refresh Status
                             </button>
                        </div>

                        <button
                            onClick={() => handleBuyLicenses('price_1UD0U9LxDAAultYK3m7LkYHI', 5)}
                            disabled={buying}
                            className="btn-primary"
                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                        >
                            {buying ? 'Preparing Checkout...' : 'Buy 5 Logins (£50)'}
                        </button>
                        <button
                            onClick={() => handleBuyLicenses('price_1UD0UYLxDAAultYKzuhuzFdx', 10)}
                            disabled={buying}
                            className="btn-primary"
                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', border: 'none' }}
                        >
                            {buying ? 'Preparing Checkout...' : 'Buy 10 Logins (£100)'}
                        </button>
                </div>
                <button onClick={onBack} style={{ marginTop: '30px', background: 'transparent', color: 'var(--accent-blue)', border: 'none', cursor: 'pointer' }}>
                    Return to App
                </button>
            </div>
        );
    }

    const totalStudents = students.length;
    let totalAverageSum = 0;
    let activeStudentCount = 0;
    let c2ActiveStudents = 0;

    students.forEach(student => {
        const history = student.progress?.history || [];
        if (history.length > 0) {
            const studentTotalPercent = history.reduce((sum, quiz) => sum + (quiz.score / quiz.total), 0);
            const studentAvgPercent = studentTotalPercent / history.length;
            totalAverageSum += studentAvgPercent;
            activeStudentCount++;
        }
        if (student.progress?.component2Guide) {
            c2ActiveStudents++;
        }
    });

    const classAverageScore = activeStudentCount === 0 ? 0 : Math.round((totalAverageSum / activeStudentCount) * 100);
    const modDoneCount = TEACHER_MODERATION_ITEMS.filter(i => teacherModChecks[i.id]).length;

    return (
        <div className="dashboard-container teacher-dashboard" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <header style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '2.4rem', marginBottom: '6px' }}>Teacher Dashboard & Coursework Hub</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                        Monitoring {totalStudents} Student(s) • Quizzes, Component 2 Technology-Based Composition & Logbooks
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => handleBuyLicenses('price_1UD0U9LxDAAultYK3m7LkYHI', 5)}
                        disabled={buying}
                        className="btn-primary"
                        style={{ padding: '10px 20px' }}
                    >
                        {buying ? 'Loading...' : '+5 Licenses (£50)'}
                    </button>
                    <button
                        onClick={() => handleBuyLicenses('price_1UD0UYLxDAAultYKzuhuzFdx', 10)}
                        disabled={buying}
                        className="btn-primary"
                        style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', border: 'none' }}
                    >
                        {buying ? 'Loading...' : '+10 Licenses (£100)'}
                    </button>
                    <button
                        onClick={onBack}
                        className="btn-primary"
                        style={{ background: 'transparent', border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)', padding: '10px 20px' }}
                    >
                        Back to App
                    </button>
                </div>
            </header>

            {/* Teacher Navigation Tabs */}
            <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                background: 'rgba(30, 41, 59, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '8px',
                borderRadius: '14px',
                marginBottom: '30px'
            }}>
                <button
                    onClick={() => setTeacherTab('overview')}
                    style={{
                        flex: '1 1 auto',
                        padding: '12px 18px',
                        borderRadius: '10px',
                        border: teacherTab === 'overview' ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
                        background: teacherTab === 'overview' ? 'rgba(56, 189, 248, 0.18)' : 'transparent',
                        color: teacherTab === 'overview' ? '#38bdf8' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        cursor: 'pointer'
                    }}
                >
                    👥 Class Roster & Overview ({totalStudents})
                </button>
                <button
                    onClick={() => setTeacherTab('c2_tracker')}
                    style={{
                        flex: '1 1 auto',
                        padding: '12px 18px',
                        borderRadius: '10px',
                        border: teacherTab === 'c2_tracker' ? '1px solid rgba(244, 114, 182, 0.5)' : '1px solid transparent',
                        background: teacherTab === 'c2_tracker' ? 'rgba(244, 114, 182, 0.18)' : 'transparent',
                        color: teacherTab === 'c2_tracker' ? '#f472b6' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        cursor: 'pointer'
                    }}
                >
                    📋 Component 2 Class Tracker & Moderation ({modDoneCount}/{TEACHER_MODERATION_ITEMS.length})
                </button>
                <button
                    onClick={() => setTeacherTab('c2_guide')}
                    style={{
                        flex: '1 1 auto',
                        padding: '12px 18px',
                        borderRadius: '10px',
                        border: teacherTab === 'c2_guide' ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid transparent',
                        background: teacherTab === 'c2_guide' ? 'rgba(168, 85, 247, 0.18)' : 'transparent',
                        color: teacherTab === 'c2_guide' ? '#c084fc' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        cursor: 'pointer'
                    }}
                >
                    🎹 Component 2 Guide, Mark Scheme & 24 Techniques
                </button>
            </div>

            {/* =========================================================
                TEACHER TAB 1: CLASS ROSTER & OVERVIEW
                ========================================================= */}
            {teacherTab === 'overview' && (
                <>
                    {/* Class Stats Row */}
                    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '30px', gap: '20px' }}>
                        <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ color: 'var(--accent-purple)', margin: '0 0 10px 0' }}>Class Average Quiz Accuracy</h3>
                            <div style={{ fontSize: '3rem', fontWeight: '800' }}>{classAverageScore}%</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                                Across {activeStudentCount} active quiz student(s)
                            </div>
                        </div>

                        <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(244, 114, 182, 0.25)' }}>
                            <h3 style={{ color: '#f472b6', margin: '0 0 10px 0' }}>Component 2 Coursework</h3>
                            <div style={{ fontSize: '3rem', fontWeight: '800', color: '#fff' }}>
                                {c2ActiveStudents} <span style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>/ {totalStudents} Active</span>
                            </div>
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setTeacherTab('c2_tracker')}
                                    style={{
                                        background: 'rgba(244, 114, 182, 0.15)',
                                        color: '#f472b6',
                                        border: '1px solid rgba(244, 114, 182, 0.4)',
                                        padding: '7px 12px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        flex: 1
                                    }}
                                >
                                    Class C2 Matrix →
                                </button>
                                <button
                                    onClick={() => setTeacherTab('c2_guide')}
                                    style={{
                                        background: 'rgba(168, 85, 247, 0.15)',
                                        color: '#c084fc',
                                        border: '1px solid rgba(168, 85, 247, 0.4)',
                                        padding: '7px 12px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        flex: 1
                                    }}
                                >
                                    Open C2 Guide →
                                </button>
                            </div>
                        </div>

                        <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ color: 'var(--accent-success)', margin: '0 0 10px 0' }}>Licenses Used</h3>
                            <div style={{ fontSize: '3rem', fontWeight: '800' }}>
                                {currentUser.licenses_used} <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/ {currentUser.licenses_total}</span>
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <button
                                    onClick={handleCopyInvite}
                                    style={{
                                        background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                                        color: copied ? '#10b981' : 'var(--accent-blue)',
                                        border: `1px solid ${copied ? '#10b981' : 'var(--accent-blue)'}`,
                                        padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', width: '100%', fontWeight: 600
                                    }}
                                >
                                    {copied ? '✓ Invite Link Copied!' : 'Copy Student Invite Link'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Component 2 Teacher Quick-Reference Summary Banner */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                        border: '1px solid rgba(244, 114, 182, 0.3)',
                        borderRadius: '16px',
                        padding: '20px 24px',
                        marginBottom: '30px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'rgba(236, 72, 153, 0.25)', color: '#f472b6', padding: '2px 8px', borderRadius: '6px' }}>
                                    COMPONENT 2 CLASSROOM DELIVERY (60 MARKS)
                                </span>
                                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                    3:00 Duration • 6+ Parts • Recommend Brief 2 (Text) or Brief 3 (Topic)
                                </span>
                            </div>
                            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#fff' }}>
                                Component 2: Technology-Based Composition Teaching & Moderation Suite
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
                                Access the full mark scheme breakdown (AG1–AG11), 24 Logic Pro X synthesis, sampling & creative FX examples with parameter recipes, and monitor student logbooks & sample credits.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setTeacherTab('c2_tracker')}
                                style={{
                                    background: 'rgba(15, 23, 42, 0.8)',
                                    border: '1px solid rgba(244, 114, 182, 0.45)',
                                    color: '#f472b6',
                                    padding: '10px 18px',
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer'
                                }}
                            >
                                📋 View Class C2 Tracker
                            </button>
                            <button
                                onClick={() => setTeacherTab('c2_guide')}
                                style={{
                                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '10px 18px',
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    fontSize: '0.88rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.35)'
                                }}
                            >
                                🎹 Launch Full C2 Guide →
                            </button>
                        </div>
                    </div>

                    {/* Student Table */}
                    <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {loadingStats ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading student data...</div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                                        <th style={{ padding: '18px 20px' }}>Student Name</th>
                                        <th style={{ padding: '18px 20px' }}>Quizzes Taken</th>
                                        <th style={{ padding: '18px 20px' }}>Latest Quiz Grade</th>
                                        <th style={{ padding: '18px 20px' }}>Component 2 Coursework</th>
                                        <th style={{ padding: '18px 20px', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length > 0 ? (
                                        students.map(student => {
                                            const history = student.progress?.history || [];
                                            const latestQuiz = history[0];
                                            const quizzesCompleted = student.progress?.quizzesCompleted || 0;
                                            const c2Metrics = getStudentC2Metrics(student);

                                            return (
                                                <tr 
                                                    key={student.student_id} 
                                                    style={{ 
                                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                        transition: 'background 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    <td style={{ padding: '18px 20px' }}>
                                                        <button
                                                            onClick={() => setSelectedStudent(student)}
                                                            style={{
                                                                background: 'none',
                                                                border: 'none',
                                                                padding: 0,
                                                                color: 'var(--text-primary)',
                                                                fontWeight: 'bold',
                                                                fontSize: '1rem',
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '8px'
                                                            }}
                                                            title="Click to view full quiz & Component 2 breakdown"
                                                        >
                                                            <span>{student.full_name || 'Anonymous Student'}</span>
                                                            <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>📊</span>
                                                        </button>
                                                    </td>
                                                    <td style={{ padding: '18px 20px' }}>{quizzesCompleted}</td>
                                                    <td style={{ padding: '18px 20px' }}>
                                                        {latestQuiz ? (
                                                            <span style={{
                                                                padding: '5px 10px',
                                                                borderRadius: '4px',
                                                                background: latestQuiz.grade === 'A' ? 'rgba(16, 185, 129, 0.2)' : latestQuiz.grade === 'U' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(250, 204, 21, 0.2)',
                                                                color: latestQuiz.grade === 'A' ? '#10b981' : latestQuiz.grade === 'U' ? '#ef4444' : '#facc15',
                                                                display: 'inline-block', fontSize: '0.88rem'
                                                            }}>
                                                                {latestQuiz.grade} ({latestQuiz.quizTitle})
                                                            </span>
                                                        ) : '-'}
                                                    </td>
                                                    <td style={{ padding: '18px 20px' }}>
                                                        {c2Metrics.started ? (
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                                <span style={{
                                                                    background: 'rgba(244, 114, 182, 0.15)',
                                                                    color: '#f472b6',
                                                                    border: '1px solid rgba(244, 114, 182, 0.35)',
                                                                    padding: '3px 8px',
                                                                    borderRadius: '6px',
                                                                    fontSize: '0.78rem',
                                                                    fontWeight: 700
                                                                }}>
                                                                    {c2Metrics.briefLabel}
                                                                </span>
                                                                <span style={{ fontSize: '0.84rem', color: '#38bdf8', fontWeight: 700 }}>
                                                                    {c2Metrics.techDone}/24 Tech
                                                                </span>
                                                                <span style={{ fontSize: '0.82rem', color: '#34d399' }}>
                                                                    • {c2Metrics.masterDone}/17 Checklist
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Not started</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '18px 20px', textAlign: 'right' }}>
                                                        <button
                                                            onClick={() => setSelectedStudent(student)}
                                                            style={{
                                                                background: 'rgba(59, 130, 246, 0.1)',
                                                                border: '1px solid rgba(59, 130, 246, 0.25)',
                                                                color: 'var(--accent-blue, #3b82f6)',
                                                                padding: '6px 14px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.85rem',
                                                                fontWeight: '600',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            View Details →
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                No students have joined yet. Share your invite link to get started!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}

            {/* =========================================================
                TEACHER TAB 2: COMPONENT 2 CLASS TRACKER & CENTRE MODERATION
                ========================================================= */}
            {teacherTab === 'c2_tracker' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {/* Overview Specs Strip */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                        {OVERVIEW_SPECS.map((s, idx) => (
                            <div key={idx} style={{ background: 'var(--bg-panel)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
                                <div>
                                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>{s.label}</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{s.value}</div>
                                    <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{s.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Class-Wide Component 2 Student Matrix */}
                    <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#fff' }}>
                                    🎹 Student Component 2 Coursework & Logbook Matrix
                                </h2>
                                <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                                    Live tracking of each student's chosen Brief, Stimulus Track, AG1 Synthesis (8), AG2 Sampling (8), AG3 Creative FX (8), and Logbook progress.
                                </p>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '850px' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left', fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                                        <th style={{ padding: '14px 16px' }}>Student</th>
                                        <th style={{ padding: '14px 16px' }}>Brief</th>
                                        <th style={{ padding: '14px 16px' }}>Stimulus Track</th>
                                        <th style={{ padding: '14px 16px' }}>AG1 Synthesis</th>
                                        <th style={{ padding: '14px 16px' }}>AG2 Sampling</th>
                                        <th style={{ padding: '14px 16px' }}>AG3 Creative FX</th>
                                        <th style={{ padding: '14px 16px' }}>Logbook Notes</th>
                                        <th style={{ padding: '14px 16px' }}>17-Pt Checklist</th>
                                        <th style={{ padding: '14px 16px', textAlign: 'right' }}>Dossier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length > 0 ? (
                                        students.map(student => {
                                            const m = getStudentC2Metrics(student);
                                            return (
                                                <tr key={student.student_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                                                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#fff' }}>
                                                        {student.full_name || 'Anonymous Student'}
                                                    </td>
                                                    <td style={{ padding: '14px 16px' }}>
                                                        <span style={{
                                                            padding: '3px 8px',
                                                            borderRadius: '6px',
                                                            fontSize: '0.78rem',
                                                            fontWeight: 700,
                                                            background: m.started ? 'rgba(244, 114, 182, 0.15)' : 'rgba(255,255,255,0.05)',
                                                            color: m.started ? '#f472b6' : '#64748b'
                                                        }}>
                                                            {m.briefLabel}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '14px 16px', color: '#cbd5e1', fontSize: '0.84rem' }}>
                                                        {m.stimulusText}
                                                    </td>
                                                    <td style={{ padding: '14px 16px', color: '#38bdf8', fontWeight: 700 }}>
                                                        {m.synDone} / 8
                                                    </td>
                                                    <td style={{ padding: '14px 16px', color: '#c084fc', fontWeight: 700 }}>
                                                        {m.smpDone} / 8
                                                    </td>
                                                    <td style={{ padding: '14px 16px', color: '#f472b6', fontWeight: 700 }}>
                                                        {m.fxDone} / 8
                                                    </td>
                                                    <td style={{ padding: '14px 16px', color: '#e2e8f0' }}>
                                                        {m.notesCount} written
                                                    </td>
                                                    <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 700 }}>
                                                        {m.masterDone} / 17
                                                    </td>
                                                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                                                        <button
                                                            onClick={() => setSelectedStudent(student)}
                                                            style={{
                                                                background: 'rgba(244, 114, 182, 0.15)',
                                                                border: '1px solid rgba(244, 114, 182, 0.4)',
                                                                color: '#f472b6',
                                                                padding: '6px 12px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 700,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            Inspect Logbook →
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="9" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                No students enrolled yet. Once students join via your invite link, their Component 2 progress and logbooks will appear here automatically.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Teacher Centre Delivery & Moderation Tick List */}
                    <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#fff' }}>
                                    ✅ Teacher Centre Delivery & Pre-Submission Moderation Checklist
                                </h2>
                                <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                                    Use this cohort tick list across Weeks 1–8 to ensure every candidate meets Edexcel 9MT0/02 administrative and technical standards.
                                </p>
                            </div>
                            <span style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid rgba(16, 185, 129, 0.4)',
                                color: '#34d399',
                                padding: '6px 14px',
                                borderRadius: '10px',
                                fontWeight: 800,
                                fontSize: '0.88rem'
                            }}>
                                {modDoneCount} / {TEACHER_MODERATION_ITEMS.length} Verified
                            </span>
                        </div>

                        <div className="c2-tick-list">
                            {TEACHER_MODERATION_ITEMS.map(item => {
                                const checked = !!teacherModChecks[item.id];
                                return (
                                    <div
                                        key={item.id}
                                        className={`c2-tick-item ${checked ? 'checked' : ''}`}
                                        onClick={() => toggleTeacherModCheck(item.id)}
                                    >
                                        <div className="c2-checkbox">{checked ? '✓' : ''}</div>
                                        <div className="c2-tick-text">
                                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f472b6', textTransform: 'uppercase', marginRight: '8px' }}>
                                                [{item.phase}]
                                            </span>
                                            <span className="c2-tick-title" style={{ display: 'inline' }}>{item.text}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Summary of the 5-Phase Classroom Delivery Plan & Mark Scheme */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                        <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', padding: '22px', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <h3 style={{ margin: '0 0 12px 0', color: '#38bdf8', fontSize: '1.15rem' }}>
                                🗓️ 8-Week Classroom Delivery Schedule
                            </h3>
                            {WORKFLOW_PHASES.map(p => (
                                <div key={p.id} style={{ marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{ fontWeight: 800, color: p.color, fontSize: '0.82rem', textTransform: 'uppercase' }}>
                                        {p.phaseNumber}: {p.title} ({p.timing})
                                    </div>
                                    <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                                        {p.summary}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', padding: '22px', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <h3 style={{ margin: '0 0 12px 0', color: '#c084fc', fontSize: '1.15rem' }}>
                                📊 60-Mark Assessment Grid Summary (AG1–AG11)
                            </h3>
                            {MARK_SCHEME_DETAILED.map(m => (
                                <div key={m.code} style={{ marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                    <div>
                                        <strong style={{ color: m.color, fontSize: '0.86rem' }}>{m.code}: {m.title}</strong>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{m.summary}</div>
                                    </div>
                                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.84rem', whiteSpace: 'nowrap' }}>
                                        {m.marks}m
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================
                TEACHER TAB 3: FULL INTERACTIVE COMPONENT 2 GUIDE
                ========================================================= */}
            {teacherTab === 'c2_guide' && (
                <Component2Guide embeddedInTeacher={true} onBack={() => setTeacherTab('overview')} />
            )}

            {/* Expanded Student Progress Modal */}
            {selectedStudent && (
                <StudentProgressModal 
                    student={selectedStudent} 
                    onClose={() => setSelectedStudent(null)} 
                />
            )}
        </div>
    );
};

export default TeacherDashboard;
