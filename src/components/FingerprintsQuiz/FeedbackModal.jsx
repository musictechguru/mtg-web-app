import React from 'react';

const FeedbackModal = ({
    criterion,
    userResult, // { responses, originalAnswers }
    onNext,
    isLastCriterion
}) => {
    // Scoring Logic for True/False
    // 1 Point for each correct identification

    let score = 0;
    const totalItems = userResult.originalAnswers.length;

    const results = userResult.originalAnswers.map(ans => {
        const userChoice = userResult.responses[ans.text];
        const isCorrect = userChoice === ans.isTrue;

        if (isCorrect) score += 1;

        return {
            ...ans,
            userChoice, // true (True) / false (False)
            isCorrectChoice: isCorrect
        };
    });

    const percentage = Math.round((score / totalItems) * 100);

    // Level Determination based on Accuracy
    let level = { name: "Establish", color: 'var(--accent-error)' };
    if (percentage >= 90) level = { name: "Exemplar", color: '#FFD700' }; // Gold
    else if (percentage >= 75) level = { name: "Mastery", color: '#C0C0C0' }; // Silver
    else if (percentage >= 55) level = { name: "Secure", color: '#CD7F32' };  // Bronze
    else if (percentage >= 35) level = { name: "Developing", color: '#3b82f6' };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                background: 'var(--bg-card)',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '16px',
                border: `1px solid ${level.color}`,
                boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #333',
                    paddingBottom: '20px',
                    marginBottom: '20px'
                }}>
                    <div>
                        <h2 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>Analysis Result</h2>
                        <div style={{ color: '#aaa' }}>{criterion.name}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: level.color }}>
                            {score} <span style={{ fontSize: '1rem', color: '#666' }}>/ {totalItems}</span>
                        </div>
                        <div style={{ color: level.color, fontWeight: 'bold', textTransform: 'uppercase' }}>
                            {level.name} ({percentage}%)
                        </div>
                    </div>
                </header>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {results.map((item, idx) => (
                        <div key={idx} style={{
                            padding: '15px',
                            background: item.isCorrectChoice ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            borderLeft: item.isCorrectChoice ? '4px solid var(--accent-success)' : '4px solid var(--accent-error)',
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.95rem', color: '#eee', marginBottom: '4px' }}>
                                        {item.text}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#aaa' }}>
                                        Status: <strong style={{ color: item.isTrue ? '#4ade80' : '#f87171' }}>
                                            {item.isTrue ? 'Valid Fact (TRUE)' : 'Incorrect/Distractor (FALSE)'}
                                        </strong>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '4px' }}>You Chose:</div>
                                    <div style={{
                                        fontWeight: 'bold',
                                        color: item.userChoice ? '#4ade80' : '#f87171',
                                        fontSize: '1.1rem'
                                    }}>
                                        {item.userChoice ? 'TRUE' : 'FALSE'}
                                    </div>
                                    {!item.isCorrectChoice && (
                                        <div style={{ color: 'var(--accent-error)', fontSize: '0.8rem', marginTop: '2px' }}>
                                            (Wrong)
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ padding: '5px 0 0 0', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#9ca3af', fontSize: '0.85rem', fontStyle: 'italic' }}>
                                {item.reason}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <button
                        onClick={() => onNext({ score, maxScore: totalItems })}
                        style={{
                            padding: '12px 40px',
                            fontSize: '1.1rem',
                            background: 'var(--accent-success)',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                        }}
                    >
                        {isLastCriterion ? "Finish Quiz" : "Next Criterion →"}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default FeedbackModal;
