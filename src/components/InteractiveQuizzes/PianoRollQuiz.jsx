import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Check, X, RotateCcw } from 'lucide-react';

export default function PianoRollQuiz({ question, onResult }) {
    const [userNotes, setUserNotes] = useState([]);
    const [isPlayingTarget, setIsPlayingTarget] = useState(false);
    const [isPlayingUser, setIsPlayingUser] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null); // { row, col }
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState(null); // { isCorrect, message }

    const [playingCol, setPlayingCol] = useState(null); // Which column is currently playing

    const audioContextRef = useRef(null);
    const playbackRef = useRef(null); // For canceling animation frame

    // Initialize state from question
    useEffect(() => {
        if (question.prefilledNotes) {
            setUserNotes(question.prefilledNotes);
        } else if (question.initialPattern) {
            setUserNotes(question.initialPattern);
        } else {
            setUserNotes([]);
        }
        setSubmitted(false);
        setFeedback(null);
        setPlayingCol(null);
        if (playbackRef.current) cancelAnimationFrame(playbackRef.current);
    }, [question]);

    // Initialize Audio Context
    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (playbackRef.current) {
                cancelAnimationFrame(playbackRef.current);
            }
        };
    }, []);

    const playSound = (type, pitch = 'C4', duration = 0.2, time = null) => {
        const ctx = audioContextRef.current;
        if (!ctx) return;

        const now = time !== null ? time : ctx.currentTime;
        // Basic frequencies
        const frequencies = {
            'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
            'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25
        };

        if (type === 'KK') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
            gain.gain.setValueAtTime(1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'SN') {
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
            noise.buffer = buffer;
            const noiseFilter = ctx.createBiquadFilter();
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 1000;
            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0.5, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            noise.start(now);
        } else if (type === 'HH') {
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 7000;
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start(now);
        } else {
            // Synth
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = frequencies[pitch] || 440;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + duration);
        }
    };

    const playPattern = (pattern, isTarget = false) => {
        if (!pattern || pattern.length === 0) return;

        // Resume AudioContext if suspended (browser requirements)
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        if (isTarget) setIsPlayingTarget(true);
        else setIsPlayingUser(true);

        const tempo = 120;
        const stepTime = (60 / tempo) / 4; // 16th notes
        const ctx = audioContextRef.current;
        const startTime = ctx.currentTime + 0.1; // Schedule slightly in future

        pattern.forEach(note => {
            const timeOffset = note.col * stepTime;
            const playTime = startTime + timeOffset;
            const duration = (note.length || 1) * stepTime;

            const rowData = question.rows[note.row];
            if (rowData) {
                const soundType = rowData.note || rowData.name;
                playSound(soundType, soundType, duration, playTime);
            }
        });

        // Reset play state after sequence finishes
        const loopDuration = (question.columns || 16) * stepTime;
        // Or based on actual max note: Math.max(...pattern.map(n => n.col + (n.length || 1))) * stepTime;
        // But looping usually implies the whole bar. Let's use Grid Size.

        const finishTime = (loopDuration * 1000) + 100; // + buffer

        // Visual Animation Loop
        const totalCols = question.columns || 16;
        const animate = () => {
            const now = ctx.currentTime;
            const elapsed = now - startTime;

            if (elapsed < 0) {
                playbackRef.current = requestAnimationFrame(animate);
                return;
            }

            const currentStep = Math.floor(elapsed / stepTime);

            if (currentStep >= totalCols) {
                setPlayingCol(null);
                if (isTarget) setIsPlayingTarget(false);
                else setIsPlayingUser(false);
                return;
            }

            setPlayingCol(currentStep);
            playbackRef.current = requestAnimationFrame(animate);
        };

        playbackRef.current = requestAnimationFrame(animate);
    };

    // Interaction Handlers
    const handlePointerDown = (e, row, col) => {
        e.preventDefault();
        if (submitted) return;

        const existingIdx = userNotes.findIndex(n => n.row === row && col >= n.col && col < n.col + (n.length || 1));

        if (existingIdx >= 0) {
            setUserNotes(prev => prev.filter((_, i) => i !== existingIdx));
        } else {
            setUserNotes(prev => [...prev, { row, col, length: 1 }]);
            setIsDragging(true);
            setDragStart({ row, col });
            const rowData = question.rows[row];
            if (rowData) {
                const soundType = rowData.note || rowData.name;
                playSound(soundType, soundType, 0.2);
            }
        }
    };

    const handlePointerEnter = (e, row, col) => {
        e.preventDefault();
        if (!isDragging || !dragStart || submitted) return;
        if (row !== dragStart.row) return;

        const newLength = Math.max(1, col - dragStart.col + 1);

        setUserNotes(prev => {
            const notes = [...prev];
            // Find note starting at dragStart
            // Note: This logic assumes we are editing the note we just started creating
            // which corresponds to the last note added if we append in handleMouseDown.
            // But if we delete notes, last might not be it.
            // Better to find by coordinates.
            const noteIdx = notes.findIndex(n => n.row === dragStart.row && n.col === dragStart.col);

            if (noteIdx >= 0) {
                notes[noteIdx] = { ...notes[noteIdx], length: newLength };
            }
            return notes;
        });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        setDragStart(null);
    };

    useEffect(() => {
        document.addEventListener('pointerup', handlePointerUp);
        return () => document.removeEventListener('pointerup', handlePointerUp);
    }, []);


    const checkAnswer = () => {
        const target = question.targetPattern;
        // Strict match: same number of notes, and every target note exists in user notes
        // (order doesn't matter, ID doesn't matter)
        const isCorrect =
            userNotes.length === target.length &&
            target.every(t => userNotes.some(u => u.row === t.row && u.col === t.col));

        setSubmitted(true);
        setFeedback({ isCorrect });
        if (onResult) onResult(isCorrect);
    };

    const reset = () => {
        setUserNotes([]);
        setSubmitted(false);
        setFeedback(null);
        setPlayingCol(null);
        if (playbackRef.current) cancelAnimationFrame(playbackRef.current);
        setIsPlayingTarget(false);
        setIsPlayingUser(false);
    };

    // Style constants
    const styles = {
        container: {
            backgroundColor: '#1f2937', // gray-800
            color: '#fff',
            padding: '20px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        },
        header: { marginBottom: '16px' },
        title: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '4px' },
        hint: { color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' },
        controls: { display: 'flex', gap: '12px', marginBottom: '16px' },
        button: {
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '6px',
            fontWeight: '600', border: 'none', cursor: 'pointer',
            transition: 'opacity 0.2s', fontSize: '0.9rem'
        },
        btnGreen: { backgroundColor: '#16a34a', color: 'white' },
        btnBlue: { backgroundColor: '#2563eb', color: 'white' },
        btnGray: { backgroundColor: '#374151', color: 'white' },
        btnPurple: { backgroundColor: '#9333ea', color: 'white', width: '100%', justifyContent: 'center', marginTop: '16px', padding: '12px' },
        pianoRoll: {
            overflowX: 'auto',
            border: '1px solid #374151',
            borderRadius: '8px',
            backgroundColor: '#111827', // gray-900
            padding: '16px',
            position: 'relative'
        },
        row: { display: 'flex', height: '32px', marginBottom: '1px' },
        label: {
            width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            paddingRight: '8px', fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af',
            userSelect: 'none'
        },
        grid: { display: 'flex', position: 'relative', flex: 1, backgroundColor: '#1f2937', userSelect: 'none', touchAction: 'none' },
        cell: (isBeatValues) => ({
            width: '30px', height: '100%',
            borderRight: '1px solid #374151',
            borderLeft: isBeatValues ? '1px solid #4b5563' : 'none',
            cursor: 'pointer',
            boxSizing: 'border-box'
        }),
        note: (col, length, isTarget, isMissing) => ({
            position: 'absolute',
            top: isTarget ? '6px' : '2px',
            bottom: isTarget ? '6px' : '2px',
            left: `${col * 30}px`,
            width: `${Math.max(1, length) * 30 - 2}px`,
            backgroundColor: isTarget ? 'transparent' : '#3b82f6',
            border: isTarget ? '2px dashed #22c55e' : '1px solid #2563eb', // green dashed for target
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: isTarget ? 5 : 10,
            opacity: 0.9,
            boxSizing: 'border-box'
        }),
        feedback: (isCorrect) => ({
            marginTop: '16px', padding: '16px', borderRadius: '8px',
            border: `1px solid ${isCorrect ? '#22c55e' : '#ef4444'}`,
            backgroundColor: isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            display: 'flex', alignItems: 'center', gap: '8px', color: isCorrect ? '#4ade80' : '#f87171'
        })
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>{question.title || question.question || "Sequencing Task"}</h3>
                <p style={styles.hint}>{question.hint}</p>
            </div>

            {/* Controls */}
            <div style={styles.controls}>
                <button
                    onClick={() => playPattern(question.targetPattern, true)}
                    disabled={isPlayingTarget}
                    style={{ ...styles.button, ...styles.btnGreen, opacity: isPlayingTarget ? 0.6 : 1 }}
                >
                    {isPlayingTarget ? <Pause size={16} /> : <Play size={16} />} Target
                </button>
                <button
                    onClick={() => playPattern(userNotes, false)}
                    disabled={isPlayingUser || userNotes.length === 0}
                    style={{ ...styles.button, ...styles.btnBlue, opacity: (isPlayingUser || userNotes.length === 0) ? 0.6 : 1 }}
                >
                    {isPlayingUser ? <Pause size={16} /> : <Volume2 size={16} />} My Loop
                </button>
                <button onClick={reset} style={{ ...styles.button, ...styles.btnGray }}>
                    <RotateCcw size={16} />
                </button>
            </div>

            {/* Piano Roll */}
            <div style={styles.pianoRoll}>
                <div style={{ display: 'inline-block', minWidth: '100%' }}>
                    {/* Header (Beats) */}
                    <div style={{ display: 'flex', marginBottom: '4px', marginLeft: '60px' }}>
                        {Array.from({ length: question.columns || 16 }).map((_, i) => (
                            <div key={i} style={{
                                width: '30px',
                                textAlign: 'center',
                                fontSize: '0.75rem',
                                color: (playingCol === i) ? '#fff' : (i % 4 === 0 ? '#fff' : '#4b5563'),
                                fontWeight: (playingCol === i) ? 'bold' : (i % 4 === 0 ? 'bold' : 'normal'),
                                backgroundColor: (playingCol === i) ? '#9333ea' : 'transparent',
                                borderRadius: '4px'
                            }}>
                                {i % 4 === 0 ? (i / 4) + 1 : '·'}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    {question.rows.map((row, r) => (
                        <div key={r} style={styles.row}>
                            {/* Label */}
                            <div style={styles.label}>
                                {row.name}
                            </div>

                            {/* Cells */}
                            <div style={styles.grid}>
                                {Array.from({ length: question.columns || 16 }).map((_, c) => (
                                    <div
                                        key={c}
                                        onPointerDown={(e) => handlePointerDown(e, r, c)}
                                        onPointerEnter={(e) => handlePointerEnter(e, r, c)}
                                        style={{
                                            ...styles.cell(c % 4 === 0),
                                            backgroundColor: (playingCol === c) ? 'rgba(255, 255, 255, 0.1)' : ((dragStart && dragStart.row === r && c >= Math.min(dragStart.col, c) && c < Math.min(dragStart.col, c) + 1) ? '#374151' : 'transparent'),
                                            borderLeft: (c === playingCol) ? '2px solid #9333ea' : styles.cell(c % 4 === 0).borderLeft
                                        }}
                                    />
                                ))}

                                {/* Notes Overlay */}
                                {userNotes.filter(n => n.row === r).map((n, i) => (
                                    <div
                                        key={i}
                                        style={styles.note(n.col, n.length, false)}
                                    />
                                ))}

                                {/* Target Overlay (Ghost) - Show if submitted and wrong */}
                                {submitted && feedback && !feedback.isCorrect && question.targetPattern.filter(t => t.row === r).map((t, i) => (
                                    <div
                                        key={`target-${i}`}
                                        style={styles.note(t.col, t.length, true)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Check Button */}
            {!submitted && (
                <button
                    onClick={checkAnswer}
                    style={{ ...styles.button, ...styles.btnPurple }}
                >
                    Check Pattern
                </button>
            )}

            {/* Feedback */}
            {submitted && (
                <div style={styles.feedback(feedback.isCorrect)}>
                    {feedback.isCorrect ? <Check size={20} /> : <X size={20} />}
                    <span>
                        {feedback.isCorrect ? "Perfect match!" : "Not quite. Check the dashed green lines for the target."}
                    </span>
                </div>
            )}
        </div>
    );
}
