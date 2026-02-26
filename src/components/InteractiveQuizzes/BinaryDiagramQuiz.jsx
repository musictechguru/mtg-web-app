import React, { useState } from 'react';

const BinaryDiagramQuiz = ({ targetNumber, hint, onResult }) => {
    const [binaryBoxes, setBinaryBoxes] = useState([0, 0, 0, 0, 0, 0, 0]); // 7 bits for MIDI
    const [submitted, setSubmitted] = useState(false);
    const [revealHint, setRevealHint] = useState(false);

    const positions = [64, 32, 16, 8, 4, 2, 1]; // 7-bit MIDI values

    const toggleBinaryBox = (index) => {
        if (submitted) return;

        const newBoxes = [...binaryBoxes];
        newBoxes[index] = newBoxes[index] === 0 ? 1 : 0;
        setBinaryBoxes(newBoxes);
    };

    const calculateBinaryValue = () => {
        return binaryBoxes.reduce((sum, bit, index) => sum + (bit * positions[index]), 0);
    };

    const checkBinaryAnswer = () => {
        const currentValue = calculateBinaryValue();
        const isCorrect = currentValue === targetNumber;

        setSubmitted(true);
        onResult(isCorrect);
    };

    const currentValue = calculateBinaryValue();
    const isCorrect = currentValue === targetNumber;

    return (
        <div style={{ width: '100%' }}>
            {/* The Binary Diagram */}
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '10px',
                    marginBottom: '15px'
                }}>
                    {positions.map((value, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: 'var(--text-secondary)',
                                marginBottom: '8px'
                            }}>
                                {value}
                            </div>
                            <button
                                onClick={() => toggleBinaryBox(index)}
                                disabled={submitted}
                                style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    border: binaryBoxes[index] === 1
                                        ? '3px solid var(--accent-purple)'
                                        : '3px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    background: binaryBoxes[index] === 1
                                        ? 'var(--accent-purple)'
                                        : 'rgba(255,255,255,0.05)',
                                    color: binaryBoxes[index] === 1
                                        ? '#fff'
                                        : 'rgba(255,255,255,0.3)',
                                    cursor: submitted ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s ease',
                                    transform: binaryBoxes[index] === 1 ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: binaryBoxes[index] === 1
                                        ? '0 4px 12px rgba(168, 85, 247, 0.4)'
                                        : 'none'
                                }}
                            >
                                {binaryBoxes[index]}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Value Display */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
                border: '2px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '5px'
                        }}>
                            Your current number:
                        </p>
                        <p style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: 'var(--accent-purple)',
                            margin: 0
                        }}>
                            {currentValue}
                        </p>
                    </div>
                    <div>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '5px'
                        }}>
                            Target number:
                        </p>
                        <p style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: 'var(--accent-blue)',
                            margin: 0
                        }}>
                            {targetNumber}
                        </p>
                    </div>
                </div>
            </div>

            {/* Hint */}
            {hint && !submitted && (
                <div style={{ marginBottom: '20px' }}>
                    {!revealHint ? (
                        <button
                            onClick={() => setRevealHint(true)}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(251, 191, 36, 0.5)',
                                color: '#fbbf24',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(251, 191, 36, 0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            💡 Need a hint?
                        </button>
                    ) : (
                        <div style={{
                            background: 'rgba(251, 191, 36, 0.1)',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            borderRadius: '8px',
                            padding: '12px',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)'
                        }}>
                            <strong style={{ color: '#fbbf24' }}>💡 Hint:</strong> {hint}
                        </div>
                    )}
                </div>
            )}

            {/* Submit Button */}
            {!submitted && (
                <button
                    onClick={checkBinaryAnswer}
                    className="btn-primary"
                    style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}
                >
                    Check Answer
                </button>
            )}

            {/* Feedback */}
            {submitted && (
                <div style={{
                    padding: '15px',
                    borderRadius: '8px',
                    border: `2px solid ${isCorrect ? 'var(--accent-success)' : 'var(--accent-error)'}`,
                    background: isCorrect
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                    marginTop: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>
                            {isCorrect ? '✅' : '❌'}
                        </span>
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            color: isCorrect ? 'var(--accent-success)' : 'var(--accent-error)'
                        }}>
                            {isCorrect ? 'Perfect! 🎉' : 'Not quite - try again next time!'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BinaryDiagramQuiz;
