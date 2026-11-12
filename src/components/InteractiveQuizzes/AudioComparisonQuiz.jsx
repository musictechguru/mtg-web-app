import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Repeat, HelpCircle, Gauge } from 'lucide-react';

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
    const [isLooping, setIsLooping] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

    // Refs for audio elements
    const audioRefA = useRef(null);
    const audioRefB = useRef(null);

    // Keep playback speed in sync
    useEffect(() => {
        if (audioRefA.current) audioRefA.current.playbackRate = playbackSpeed;
        if (audioRefB.current) audioRefB.current.playbackRate = playbackSpeed;
    }, [playbackSpeed]);

    // Handle seamless play/flip between A and B
    const togglePlay = (track) => {
        if (playing === track) {
            // Pause current
            setPlaying(null);
            audioRefA.current?.pause();
            audioRefB.current?.pause();
        } else {
            // Seamless Flip: Transfer current playhead position to match exact bar/word
            let currentPos = 0;
            if (playing === 'A' && audioRefA.current) {
                currentPos = audioRefA.current.currentTime;
            } else if (playing === 'B' && audioRefB.current) {
                currentPos = audioRefB.current.currentTime;
            }

            if (track === 'A') {
                audioRefB.current?.pause();
                if (audioRefA.current) {
                    if (currentPos > 0 && currentPos < (audioRefA.current.duration || 100)) {
                        audioRefA.current.currentTime = currentPos;
                    }
                    audioRefA.current.loop = isLooping;
                    audioRefA.current.playbackRate = playbackSpeed;
                    audioRefA.current.play().catch(e => console.log("Play error A:", e));
                }
                setPlaying('A');
            } else if (track === 'B') {
                audioRefA.current?.pause();
                if (audioRefB.current) {
                    if (currentPos > 0 && currentPos < (audioRefB.current.duration || 100)) {
                        audioRefB.current.currentTime = currentPos;
                    }
                    audioRefB.current.loop = isLooping;
                    audioRefB.current.playbackRate = playbackSpeed;
                    audioRefB.current.play().catch(e => console.log("Play error B:", e));
                }
                setPlaying('B');
            }
        }
    };

    // Update loop attribute dynamically
    const toggleLoop = () => {
        const nextLoop = !isLooping;
        setIsLooping(nextLoop);
        if (audioRefA.current) audioRefA.current.loop = nextLoop;
        if (audioRefB.current) audioRefB.current.loop = nextLoop;
    };

    // Toggle playback rate between 0.75x, 1.0x, 1.25x
    const cycleSpeed = () => {
        const speeds = [1.0, 0.75, 1.25];
        const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
        setPlaybackSpeed(nextSpeed);
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
        setPlaying(null);
        audioRefA.current?.pause();
        audioRefB.current?.pause();

        if (onResult) {
            onResult(correct);
        }
    };

    // Handle "I'm Not Sure"
    const handleUnsure = () => {
        if (isSubmitted) return;
        setIsSubmitted(true);
        setIsCorrect(false);
        setSelectedOption('unsure');
        setPlaying(null);
        audioRefA.current?.pause();
        audioRefB.current?.pause();

        if (onResult) {
            onResult(false);
        }
    };

    return (
        <div className="audio-comparison-quiz" style={{ background: 'rgba(0,0,0,0.25)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
                    Listen and toggle between <strong>Version A</strong> and <strong>Version B</strong> to hear the effect.
                </p>

                {/* Accessibility Controls: Loop & Playback Speed */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                        type="button"
                        onClick={toggleLoop}
                        title={isLooping ? "Looping enabled (repeats audio)" : "Looping disabled (plays once)"}
                        style={{
                            background: isLooping ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.05)',
                            border: isLooping ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.15)',
                            color: isLooping ? '#38bdf8' : '#94a3b8',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        <Repeat size={14} />
                        {isLooping ? 'Loop: ON' : 'Loop: OFF'}
                    </button>

                    <button
                        type="button"
                        onClick={cycleSpeed}
                        title="Change audio playback speed (great for catching fast transients)"
                        style={{
                            background: playbackSpeed !== 1.0 ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.05)',
                            border: playbackSpeed !== 1.0 ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.15)',
                            color: playbackSpeed !== 1.0 ? '#c084fc' : '#94a3b8',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        <Gauge size={14} />
                        Speed: {playbackSpeed}×
                    </button>
                </div>
            </div>

            {/* Players side-by-side */}
            <div className="audio-players" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                {/* Player A */}
                <div className={`player-card ${playing === 'A' ? 'playing' : ''}`} style={{
                    background: playing === 'A' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255,255,255,0.04)',
                    border: playing === 'A' ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                    padding: '16px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                }}>
                    <div style={{ marginBottom: '12px', fontWeight: '700', color: '#e2e8f0', fontSize: '0.95rem' }}>{labelA}</div>
                    <button
                        onClick={() => togglePlay('A')}
                        type="button"
                        style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '50%',
                            border: 'none',
                            background: playing === 'A' ? '#38bdf8' : '#334155',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: playing === 'A' ? '0 0 16px rgba(56,189,248,0.4)' : 'none',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        {playing === 'A' ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
                    </button>
                    <div style={{ marginTop: '8px', fontSize: '0.75rem', color: playing === 'A' ? '#38bdf8' : '#64748b' }}>
                        {playing === 'A' ? 'Playing (Tap B to A/B flip)' : 'Tap to listen'}
                    </div>
                    <audio ref={audioRefA} src={audioSrcA} loop={isLooping} onEnded={() => { if (!isLooping) setPlaying(null); }} />
                </div>

                {/* Player B */}
                <div className={`player-card ${playing === 'B' ? 'playing' : ''}`} style={{
                    background: playing === 'B' ? 'rgba(168, 85, 247, 0.14)' : 'rgba(255,255,255,0.04)',
                    border: playing === 'B' ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                    padding: '16px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                }}>
                    <div style={{ marginBottom: '12px', fontWeight: '700', color: '#e2e8f0', fontSize: '0.95rem' }}>{labelB}</div>
                    <button
                        onClick={() => togglePlay('B')}
                        type="button"
                        style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '50%',
                            border: 'none',
                            background: playing === 'B' ? '#a855f7' : '#334155',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: playing === 'B' ? '0 0 16px rgba(168,85,247,0.4)' : 'none',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        {playing === 'B' ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
                    </button>
                    <div style={{ marginTop: '8px', fontSize: '0.75rem', color: playing === 'B' ? '#c084fc' : '#64748b' }}>
                        {playing === 'B' ? 'Playing (Tap A to A/B flip)' : 'Tap to listen'}
                    </div>
                    <audio ref={audioRefB} src={audioSrcB} loop={isLooping} onEnded={() => { if (!isLooping) setPlaying(null); }} />
                </div>
            </div>

            {/* Options */}
            <div className="options-grid" style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                {options.map((opt, idx) => {
                    let style = {
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.03)',
                        color: 'var(--text-primary)',
                        cursor: isSubmitted ? 'default' : 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                        fontSize: '0.92rem',
                        lineHeight: 1.4
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
                            <span style={{ fontWeight: 'bold', marginRight: '8px', color: 'var(--accent-purple, #a855f7)' }}>
                                {String.fromCharCode(65 + idx)}.
                            </span>
                            {opt}
                        </button>
                    );
                })}
            </div>

            {!isSubmitted && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button
                        type="button"
                        onClick={handleUnsure}
                        title="Not sure what effect was applied? Reveal the answer and breakdown without guessing."
                        style={{
                            padding: '12px 18px',
                            borderRadius: '8px',
                            border: '1px dashed rgba(168, 85, 247, 0.6)',
                            background: 'rgba(168, 85, 247, 0.08)',
                            color: '#e2e8f0',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.18)';
                            e.currentTarget.style.borderColor = '#c084fc';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.08)';
                            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                        }}
                    >
                        <HelpCircle size={17} style={{ color: '#c084fc' }} />
                        I'm Not Sure
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="btn-primary"
                        disabled={selectedOption === null}
                        style={{ flex: 1, opacity: selectedOption === null ? 0.5 : 1 }}
                    >
                        Check Choice
                    </button>
                </div>
            )}
        </div>
    );
}
