import React from 'react';
import { useUser } from '../contexts/UserContext';

const TeacherDashboard = ({ onBack }) => {
    const { allUsers, resetClassroom } = useUser();

    // Filter out the "Teacher" account from stats
    const studentNames = Object.keys(allUsers).filter(name => name !== 'Teacher');

    // Calculate Class Stats
    const totalStudents = studentNames.length;

    let totalAverageSum = 0;
    let activeStudentCount = 0;

    studentNames.forEach(name => {
        const history = allUsers[name].history || [];
        if (history.length > 0) {
            // Calculate this student's average quiz percentage
            const studentTotalPercent = history.reduce((sum, quiz) => sum + (quiz.score / quiz.total), 0);
            const studentAvgPercent = studentTotalPercent / history.length;

            totalAverageSum += studentAvgPercent;
            activeStudentCount++;
        }
    });

    const classAverageScore = activeStudentCount === 0 ? 0 : Math.round((totalAverageSum / activeStudentCount) * 100);

    const handleReset = () => {
        if (window.confirm("Are you sure? This will delete ALL student data.")) {
            resetClassroom();
        }
    };

    return (
        <div className="dashboard-container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Teacher Overview</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Monitoring {totalStudents} Student(s)</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleReset}
                        style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        Reset Class Data
                    </button>
                    <button
                        onClick={onBack}
                        className="btn-primary"
                        style={{ background: 'transparent', border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)' }}
                    >
                        Back to App
                    </button>
                </div>
            </header>

            {/* Class Stats Row */}
            <div className="stats-grid" style={{ marginBottom: '40px' }}>
                <div className="stat-card" style={{ background: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ color: 'var(--accent-purple)', margin: '0 0 10px 0' }}>Class Average Accuracy</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '800' }}>{classAverageScore}%</div>
                </div>
            </div>

            {/* Student Table */}
            <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                            <th style={{ padding: '20px' }}>Student Name</th>
                            <th style={{ padding: '20px' }}>Quizzes Taken</th>
                            <th style={{ padding: '20px' }}>Total Questions Correct</th>
                            <th style={{ padding: '20px' }}>Latest Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentNames.length > 0 ? (
                            studentNames.map(name => {
                                const user = allUsers[name];
                                const latestQuiz = user.history && user.history[0];
                                return (
                                    <tr key={name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '20px', fontWeight: 'bold' }}>{name}</td>
                                        <td style={{ padding: '20px' }}>{user.quizzesCompleted}</td>
                                        <td style={{ padding: '20px' }}>{user.totalScore}</td>
                                        <td style={{ padding: '20px' }}>
                                            {latestQuiz ? (
                                                <span style={{
                                                    padding: '5px 10px',
                                                    borderRadius: '4px',
                                                    background: latestQuiz.grade === 'A' ? 'rgba(16, 185, 129, 0.2)' : latestQuiz.grade === 'U' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(250, 204, 21, 0.2)',
                                                    color: latestQuiz.grade === 'A' ? '#10b981' : latestQuiz.grade === 'U' ? '#ef4444' : '#facc15'
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
                                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No students have joined yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherDashboard;
