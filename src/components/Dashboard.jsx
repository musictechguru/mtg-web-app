import React, { useMemo } from 'react';
import { useUser } from '../contexts/UserContext';
import GuruTracker from './GuruTracker';
import WelcomeVideoModal from './WelcomeVideoModal';
import CampaignMap from './CampaignMap';
import campaignData from '../data/campaign_route.json';

console.log('GuruTracker import:', GuruTracker);

const Dashboard = ({ onNavigate }) => {
    const { userProgress, clearProgress } = useUser();
    const [showWelcomeModal, setShowWelcomeModal] = React.useState(false);
    const [showProgress, setShowProgress] = React.useState(false);

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

    return (
        <div className="dashboard-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '2.5rem' }}>
                    Welcome back, <span style={{ color: 'var(--accent-blue)' }}>Creator!</span>
                </h1>
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

            {/* Welcome Video Text Banner */}
            <div className="welcome-banner" style={{ textAlign: 'right' }}>
                <button
                    onClick={clearProgress}
                    style={{ background: 'transparent', border: '1px solid #333', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', color: '#666' }}
                >
                    Reset Data
                </button>
            </div>

            {/* Welcome Banner */}
            <div style={{
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)',
                borderLeft: '4px solid var(--accent-blue)',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
            }}>
                <div style={{ flexShrink: 0, width: '160px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
                    <video width="100%" autoPlay muted loop playsInline style={{ display: 'block' }}>
                        <source src="/MTGuru_vids/MTG%20Wecome%20short.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div>
                    <h3 style={{ margin: '0 0 5px 0', color: 'var(--accent-blue)' }}>Welcome to the Music Tech Guru Revision App!</h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        This is your central hub for mastering Music Technology.
                        Take interactive quizzes, prepare for your exams, and level up your skills to become a <strong>Legend</strong>!
                    </p>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => {
                                const mapEl = document.getElementById('campaign-map-section');
                                if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                                backgroundColor: 'var(--accent-success)',
                                color: '#fff',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Start A-Level Music Tech Journey Here
                        </button>
                        <button
                            onClick={() => setShowWelcomeModal(true)}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'var(--accent-blue)',
                                border: '2px solid var(--accent-blue)',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Play Welcome Video
                        </button>
                    </div>
                </div>
            </div>

            <div id="campaign-map-section">
                <CampaignMap onNavigate={onNavigate} />
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
                <WelcomeVideoModal onClose={() => setShowWelcomeModal(false)} />
            )}
        </div>
    );
};

export default Dashboard;
