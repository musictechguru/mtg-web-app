import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

export default function AudioComparisonQuiz({
    audioSrcA,
    audioSrcB,
    labelA = "Original (Dry)",
    labelB = "Effected (Wet)",
    options = [],
    correctAnswerIndex,
    onResult
}) {
    // State
    const [playing, setPlaying] = useState(null); // 'A', 'B', or null
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Refs for audio elements
    const audioRefA = useRef(null);
    const audioRefB = useRef(null);

    // Stop other audio when one starts
    useEffect(() => {
        if (playing === 'A') {
            audioRefB.current?.pause();
            audioRefB.current.currentTime = 0; // Optional: Reset or just pause
            audioRefA.current?.play().catch(e => console.log("Play error:", e));
        } else if (playing === 'B') {
            audioRefA.current?.pause();
            audioRefA.current.currentTime = 0;
            audioRefB.current?.play().catch(e => console.log("Play error:", e));
        } else {
            audioRefA.current?.pause();
            audioRefB.current?.pause();
        }
    }, [playing]);

    // Handle play button clicks
    const togglePlay = (track) => {
        if (playing === track) {
            setPlaying(null);
        } else {
            setPlaying(track);
        }
    };

    // Handle option selection
    const handleSelect = (index) => {
        if (isSubmitted) return;
        setSelectedOption(index);
    };

    // Handle Submit
    const handleSubmit = () => {
        if (selectedOption === null) return;

        setIsSubmitted(true);
        const correct = selectedOption === correctAnswerIndex;
        setIsCorrect(correct);
        setPlaying(null); // Stop audio on submit

        if (onResult) {
            onResult(correct);
        }
    };

    return (
        <div className="audio-comparison-quiz" style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            <p style={{ marginTop: 0, marginBottom: '20px', color: '#94a3b8' }}>
                Listen to the audio clips and identify the effect processing.
            </p>

            <div className="audio-players" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                {/* Player A */}
                <div className={`player-card ${playing === 'A' ? 'playing' : ''}`} style={{
                    background: playing === 'A' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.05)',
                    border: playing === 'A' ? '1px solid #38bdf8' : '1px solid transparent',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#e2e8f0' }}>{labelA}</div>
                    <button
                        onClick={() => togglePlay('A')}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: 'none',
                            background: playing === 'A' ? '#38bdf8' : '#475569',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {playing === 'A' ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <audio ref={audioRefA} src={audioSrcA} onEnded={() => setPlaying(null)} />
                </div>

                {/* Player B */}
                <div className={`player-card ${playing === 'B' ? 'playing' : ''}`} style={{
                    background: playing === 'B' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.05)',
                    border: playing === 'B' ? '1px solid #38bdf8' : '1px solid transparent',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#e2e8f0' }}>{labelB}</div>
                    <button
                        onClick={() => togglePlay('B')}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: 'none',
                            background: playing === 'B' ? '#38bdf8' : '#475569',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {playing === 'B' ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <audio ref={audioRefB} src={audioSrcB} onEnded={() => setPlaying(null)} />
                </div>
            </div>

            {/* Options */}
            <div className="options-grid" style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                {options.map((opt, idx) => {
                    let style = {
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        cursor: isSubmitted ? 'default' : 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s'
                    };

                    if (selectedOption === idx) {
                        style.background = 'rgba(255,255,255,0.1)';
                        style.borderColor = 'var(--text-primary)';
                    }

                    if (isSubmitted) {
                        if (idx === correctAnswerIndex) {
                            style.background = 'rgba(34, 197, 94, 0.2)';
                            style.borderColor = '#22c55e';
                        } else if (selectedOption === idx && idx !== correctAnswerIndex) {
                            style.background = 'rgba(239, 68, 68, 0.2)';
                            style.borderColor = '#ef4444';
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            disabled={isSubmitted}
                            style={style}
                        >
                            <span style={{ fontWeight: 'bold', marginRight: '8px' }}>{String.fromCharCode(65 + idx)}.</span>
                            {opt}
                        </button>
                    )
                })}
            </div>

            {!isSubmitted && (
                <button
                    onClick={handleSubmit}
                    className="btn-primary"
                    disabled={selectedOption === null}
                    style={{ width: '100%', marginTop: '20px', opacity: selectedOption === null ? 0.5 : 1 }}
                >
                    Check Choice
                </button>
            )}
        </div>
    );
}
