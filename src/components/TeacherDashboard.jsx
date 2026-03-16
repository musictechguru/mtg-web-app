import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { supabase } from '../config/supabase';

const TeacherDashboard = ({ onBack }) => {
    const { currentUser, fetchClassProgress } = useUser();
    const [students, setStudents] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [buying, setBuying] = useState(false);
    const [copied, setCopied] = useState(false);

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

    if (currentUser?.role !== 'teacher') {
        return (
            <div className="dashboard-container" style={{ textAlign: 'center', padding: '50px 20px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Teacher Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    You need a Classroom Pack to access the teacher features.
                </p>
                <div style={{ background: 'var(--bg-panel)', padding: '30px', borderRadius: '16px', maxWidth: '500px', margin: '0 auto' }}>
                    <h2>Buy 10 Student Logins</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Unlock the dashboard and invite your students.</p>
                        <button
                            onClick={() => handleBuyLicenses('price_1TBY9LLxDAAultYKd6OrgvvY', 5)}
                            disabled={buying}
                            className="btn-primary"
                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
                        >
                            {buying ? 'Preparing Checkout...' : 'Buy 5 Logins'}
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

    students.forEach(student => {
        const history = student.progress?.history || [];
        if (history.length > 0) {
            const studentTotalPercent = history.reduce((sum, quiz) => sum + (quiz.score / quiz.total), 0);
            const studentAvgPercent = studentTotalPercent / history.length;
            totalAverageSum += studentAvgPercent;
            activeStudentCount++;
        }
    });

    const classAverageScore = activeStudentCount === 0 ? 0 : Math.round((totalAverageSum / activeStudentCount) * 100);

    return (
        <div className="dashboard-container">
            <header style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Teacher Overview</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Monitoring {totalStudents} Student(s)</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => handleBuyLicenses('price_1TBY9LLxDAAultYKd6OrgvvY', 5)}
                        disabled={buying}
                        className="btn-primary"
                        style={{ padding: '10px 20px' }}
                    >
                        {buying ? 'Loading...' : '+5 Licenses (£50)'}
                    </button>
                    <button
                        onClick={() => handleBuyLicenses('price_1T9TUvLxDAAultYKPmTvNQh5', 10)}
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

            {/* Class Stats Row */}
            <div className="stats-grid" style={{ marginBottom: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ color: 'var(--accent-purple)', margin: '0 0 10px 0' }}>Class Average Accuracy</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '800' }}>{classAverageScore}%</div>
                </div>
                <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ color: 'var(--accent-success)', margin: '0 0 10px 0' }}>Licenses Used</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '800' }}>
                        {currentUser.licenses_used} <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/ {currentUser.licenses_total}</span>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                        <button
                            onClick={handleCopyInvite}
                            style={{
                                background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                                color: copied ? '#10b981' : 'var(--accent-blue)',
                                border: `1px solid ${copied ? '#10b981' : 'var(--accent-blue)'}`,
                                padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', width: '100%'
                            }}
                        >
                            {copied ? 'Copied!' : 'Copy Invite Link'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Student Table */}
            <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
                {loadingStats ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading student data...</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                                <th style={{ padding: '20px' }}>Student Name</th>
                                <th style={{ padding: '20px' }}>Quizzes Taken</th>
                                <th style={{ padding: '20px' }}>Total Questions Correct</th>
                                <th style={{ padding: '20px' }}>Latest Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map(student => {
                                    const history = student.progress?.history || [];
                                    const latestQuiz = history[0];
                                    const quizzesCompleted = student.progress?.quizzesCompleted || 0;
                                    const totalScore = student.progress?.totalScore || 0;

                                    return (
                                        <tr key={student.student_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '20px', fontWeight: 'bold' }}>{student.full_name || 'Anonymous Student'}</td>
                                            <td style={{ padding: '20px' }}>{quizzesCompleted}</td>
                                            <td style={{ padding: '20px' }}>{totalScore}</td>
                                            <td style={{ padding: '20px' }}>
                                                {latestQuiz ? (
                                                    <span style={{
                                                        padding: '5px 10px',
                                                        borderRadius: '4px',
                                                        background: latestQuiz.grade === 'A' ? 'rgba(16, 185, 129, 0.2)' : latestQuiz.grade === 'U' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(250, 204, 21, 0.2)',
                                                        color: latestQuiz.grade === 'A' ? '#10b981' : latestQuiz.grade === 'U' ? '#ef4444' : '#facc15',
                                                        display: 'inline-block', fontSize: '0.9rem'
                                                    }}>
                                                        {latestQuiz.grade} ({latestQuiz.quizTitle})
                                                    </span>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    )
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
        </div>
    );
};

export default TeacherDashboard;
