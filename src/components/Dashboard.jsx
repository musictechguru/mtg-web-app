import React, { useMemo } from 'react';
import { useUser } from '../contexts/UserContext';
import GuruTracker from './GuruTracker';

const Dashboard = ({ onNavigate }) => {
    const { userProgress, clearProgress } = useUser();

    // Calculate Global Guru Progress
    const guruStats = useMemo(() => {
        if (!userProgress || !userProgress.mastery) {
            return { progress: 0, level: 'Apprentice' };
        }

        // Count all mastered items (Source: Dictionary, Course Quizzes, etc.)
        // Threshold: 80%
        const masteryMap = userProgress.mastery;
        const masteredCount = Object.values(masteryMap).filter(score => score >= 80).length;

        // Target: 50 Skills for 'Legend' status
        const targetSkills = 50;
        const percent = Math.min(100, Math.round((masteredCount / targetSkills) * 100));

        let title = "Apprentice";
        if (percent >= 10) title = "Novice";
        if (percent >= 25) title = "Adept";
        if (percent >= 50) title = "Synthesist";
        if (percent >= 75) title = "Virtuoso";
        if (percent >= 90) title = "Guru";
        if (percent >= 100) title = "Legend";

        return { progress: percent, level: title, count: masteredCount, target: targetSkills };
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

    return (
        <div className="dashboard-container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Student Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back to your revision hub.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <button
                        onClick={clearProgress}
                        style={{ background: 'transparent', border: '1px solid #333', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', color: '#666' }}
                    >
                        Reset Data
                    </button>
                </div>
            </header>

            {/* Guru Hero Section */}
            <div className="guru-hero" style={{
                background: 'linear-gradient(135deg, var(--bg-panel) 0%, rgba(59, 130, 246, 0.1) 100%)',
                borderRadius: '20px',
                padding: '30px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                border: '1px solid var(--border-color)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <GuruTracker progress={guruStats.progress} levelTitle={guruStats.level} />
                </div>
                <div style={{ maxWidth: '400px' }}>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--accent-blue)' }}>
                        Path to Legend
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        You have mastered <strong>{guruStats.count}</strong> out of <strong>{guruStats.target}</strong> key skills.
                        Keep taking quizzes and achieving &gt;80% to charge the Guru!
                    </p>
                    <div style={{ marginTop: '20px', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${guruStats.progress}%`,
                            height: '100%',
                            background: 'var(--accent-success)',
                            transition: 'width 1s ease'
                        }} />
                    </div>
                </div>
            </div>

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
    );
};

export default Dashboard;
