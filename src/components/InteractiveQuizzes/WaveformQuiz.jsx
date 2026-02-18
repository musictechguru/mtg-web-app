import React, { useState } from 'react';

export default function WaveformQuiz({ audioSrc, options, correctOption, onResult }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Determine which shape to draw based on correct answer
    // We can infer it from the 'correctOption' string
    const getShapeType = () => {
        const lower = correctOption.toLowerCase();
        if (lower.includes('sine')) return 'sine';
        if (lower.includes('square')) return 'square';
        if (lower.includes('saw')) return 'sawtooth';
        if (lower.includes('triangle')) return 'triangle';
        return 'sine';
    };

    const renderWaveform = (type) => {
        const width = 300;
        const height = 150;
        const mid = height / 2;
        const amp = 50; // Amplitude

        let path = "";

        // Stroke style
        const strokeColor = "#38bdf8";
        const strokeWidth = 5;

        switch (type) {
            case 'sine':
                // Draw 2 cycles of sine
                path = `M 0 ${mid}`;
                for (let x = 0; x <= width; x++) {
                    const y = mid - amp * Math.sin((x / width) * 4 * Math.PI);
                    path += ` L ${x} ${y}`;
                }
                break;
            case 'square':
                // Draw 2 cycles of square
                // High from 0-25%, Low from 25-50%, etc.
                const cycle = width / 2;
                path = `M 0 ${mid - amp} 
                        L ${cycle / 2} ${mid - amp} L ${cycle / 2} ${mid + amp} 
                        L ${cycle} ${mid + amp} L ${cycle} ${mid - amp}
                        L ${cycle * 1.5} ${mid - amp} L ${cycle * 1.5} ${mid + amp}
                        L ${width} ${mid + amp}`;
                break;
            case 'sawtooth':
                // Draw 2 cycles of Saw
                // Ramp up, Drop down
                const half = width / 2;
                path = `M 0 ${mid + amp} 
                        L ${half} ${mid - amp} L ${half} ${mid + amp}
                        L ${width} ${mid - amp}`;
                break;
            case 'triangle':
                // Draw 2 cycles of Triangle
                const q = width / 4;
                path = `M 0 ${mid} 
                        L ${q} ${mid - amp} L ${q * 2} ${mid + amp} 
                        L ${q * 3} ${mid - amp} L ${width} ${mid}`;
                break;
            default:
                break;
        }

        return (
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                <path d={path} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {/* Center Line for reference */}
                <line x1="0" y1={mid} x2={width} y2={mid} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4" />
            </svg>
        );
    };

    const handleSubmit = () => {
        if (!selectedOption || isSubmitted) return;

        const correct = selectedOption === correctOption;
        setIsSubmitted(true);
        setIsCorrect(correct);

        if (onResult) {
            onResult(correct);
        }
    };

    return (
        <div className="waveform-quiz" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Identify the Waveform</h3>

            <div
                style={{
                    marginBottom: '20px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '20px'
                }}
            >
                {renderWaveform(getShapeType())}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <audio controls src={audioSrc} style={{ width: '100%', maxWidth: '300px' }} />
            </div>

            <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => !isSubmitted && setSelectedOption(option)}
                        className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
                        disabled={isSubmitted}
                        style={{
                            padding: '15px',
                            background: selectedOption === option ? '#38bdf8' : 'rgba(255,255,255,0.05)',
                            border: selectedOption === option ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                            color: selectedOption === option ? '#0f172a' : '#fff',
                            borderRadius: '8px',
                            cursor: isSubmitted ? 'default' : 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: 'bold'
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {!isSubmitted ? (
                <button
                    onClick={handleSubmit}
                    className="btn-primary"
                    disabled={!selectedOption}
                    style={{ width: '100%', opacity: selectedOption ? 1 : 0.5 }}
                >
                    Submit Answer
                </button>
            ) : (
                <div style={{
                    padding: '15px',
                    borderRadius: '8px',
                    background: isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    border: isCorrect ? '1px solid #22c55e' : '1px solid #ef4444',
                    textAlign: 'center'
                }}>
                    <p style={{ fontWeight: 'bold', margin: '0 0 5px 0', color: isCorrect ? '#22c55e' : '#ef4444' }}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>
                        This is a <strong>{correctOption}</strong>.
                    </p>
                </div>
            )}
        </div>
    );
}
