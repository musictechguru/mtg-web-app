import React, { useState, useEffect } from 'react';

const CriterionQuestion = ({ criterion, onBack, onSubmit }) => {
    // True/False mode: criterion.answers is a list of 5 items with { text, isTrue }

    // State: map of question text -> boolean (true=User thinks it's True, false=User thinks it's False)
    const [responses, setResponses] = useState({});

    // Reset when criterion changes
    useEffect(() => {
        setResponses({});
    }, [criterion.id]);

    const handleSelect = (text, value) => {
        setResponses(prev => ({
            ...prev,
            [text]: value
        }));
    };

    // All items must be answered before submit
    const isComplete = criterion.answers && criterion.answers.every(a => responses[a.text] !== undefined);

    const handleSubmit = () => {
        onSubmit({
            responses,
            originalAnswers: criterion.answers
        });
    };

    if (!criterion) return null;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <button onClick={onBack} style={{
                marginBottom: '20px',
                background: 'none',
                border: '1px solid #555',
                color: '#ccc',
                padding: '8px 16px',
                cursor: 'pointer',
                borderRadius: '4px'
            }}>
                ← Back
            </button>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--accent-blue)', marginBottom: '10px' }}>{criterion.name}</h2>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>{criterion.question}</h3>
                <p style={{ color: '#aaa' }}>
                    Read each statement below and identify if it is <strong>TRUE</strong> (Correct) or <strong>FALSE</strong> (Incorrect/Irrelevant).
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {criterion.answers.map((ans, idx) => {
                    const currentVal = responses[ans.text];

                    return (
                        <div key={idx} style={{
                            padding: '20px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid #444',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '20px',
                            transition: 'border-color 0.2s'
                        }}>
                            <span style={{ fontSize: '1rem', flex: 1, color: '#e5e7eb', lineHeight: '1.5' }}>{ans.text}</span>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => handleSelect(ans.text, true)}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: currentVal === true ? 'var(--accent-success)' : '#333',
                                        color: currentVal === true ? '#fff' : '#888',
                                        fontWeight: 'bold',
                                        transition: 'all 0.2s',
                                        minWidth: '80px'
                                    }}
                                >
                                    TRUE
                                </button>
                                <button
                                    onClick={() => handleSelect(ans.text, false)}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: currentVal === false ? 'var(--accent-error)' : '#333',
                                        color: currentVal === false ? '#fff' : '#888',
                                        fontWeight: 'bold',
                                        transition: 'all 0.2s',
                                        minWidth: '80px'
                                    }}
                                >
                                    FALSE
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center', paddingBottom: '40px' }}>
                <button
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    style={{
                        padding: '15px 40px',
                        fontSize: '18px',
                        backgroundColor: isComplete ? 'var(--accent-blue)' : '#444',
                        color: isComplete ? 'white' : '#888',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isComplete ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        transition: 'all 0.2s',
                        boxShadow: isComplete ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none'
                    }}
                >
                    Submit Answers
                </button>
            </div>
        </div>
    );
};

export default CriterionQuestion;
