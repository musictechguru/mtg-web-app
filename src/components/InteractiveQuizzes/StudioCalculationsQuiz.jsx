import React, { useState } from 'react';

/**
 * Simple, Visual 3-Step Skill Builder for Edexcel 9MT0 Studio Numbers:
 * - calcMode = 'delay_bpm': 120 BPM -> 2 beats per second -> Quarter note = 0.5 s (500 ms) -> Eighth note = 0.25 s (250 ms)
 * - calcMode = 'wavelength': Octaves & Frequency (440 Hz -> Octave up = ×2 (880 Hz), Octave down = ÷2 (220 Hz), Bass = long waves)
 */
export default function StudioCalculationsQuiz({ question, onResult }) {
    const mode = question?.calcMode || 'delay_bpm';

    const [step1Choice, setStep1Choice] = useState(null);
    const [step2Choice, setStep2Choice] = useState(null);
    const [step3Choice, setStep3Choice] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const config = mode === 'wavelength'
        ? {
            badge: 'FREQUENCY & OCTAVES SKILL BUILDER',
            accent: '#38bdf8',
            cheatTitle: 'The Octave Rule (Concert A = 440 Hz)',
            cheatSubtitle: 'Use the relationship between frequency (Hz) and octaves to find one octave above and one octave below 440 Hz.',
            steps: [
                {
                    label: 'Step 1: One Octave Higher (A5)',
                    prompt: 'The note A4 is 440 Hz. What is the frequency of A5 (1 octave higher)?',
                    options: [
                        { id: '220', text: '220 Hz', correct: false },
                        { id: '452', text: '452 Hz', correct: false },
                        { id: '880', text: '880 Hz', correct: true },
                        { id: '1000', text: '1,000 Hz', correct: false }
                    ],
                    hint: 'Going up 1 octave doubles the frequency: 440 × 2 = 880 Hz.'
                },
                {
                    label: 'Step 2: One Octave Lower (A3)',
                    prompt: 'Starting from A4 (440 Hz), what is the frequency of A3 (1 octave lower)?',
                    options: [
                        { id: '110', text: '110 Hz', correct: false },
                        { id: '220', text: '220 Hz', correct: true },
                        { id: '340', text: '340 Hz', correct: false },
                        { id: '400', text: '400 Hz', correct: false }
                    ],
                    hint: 'Going down 1 octave halves the frequency: 440 ÷ 2 = 220 Hz.'
                },
                {
                    label: 'Step 3: Low Bass vs High Treble Sound Waves',
                    prompt: 'Why are low bass frequencies much harder to control in a small studio room than high treble frequencies?',
                    options: [
                        { id: 'long', text: 'Low bass frequencies have long, big sound waves that pass through thin foam', correct: true },
                        { id: 'short', text: 'Low bass frequencies have tiny sound waves that vanish in air', correct: false },
                        { id: 'fast', text: 'Low bass frequencies travel ten times faster than high treble notes', correct: false }
                    ],
                    hint: 'Low frequencies have long physical waves, so they need thick bass traps in the corners of a studio.'
                }
            ]
        }
        : {
            badge: 'TEMPO DELAY SKILL BUILDER',
            accent: '#f97316',
            cheatTitle: 'Simple 120 BPM Studio Delay Timing',
            cheatSubtitle: '120 BPM is the most common tempo in Edexcel exams because 120 beats in a 60-second minute equals exactly 2 beats per second.',
            steps: [
                {
                    label: 'Step 1: Beats Per Second at 120 BPM',
                    prompt: 'A minute has 60 seconds. If a track is 120 Beats Per Minute (120 ÷ 60), how many beats happen every second?',
                    options: [
                        { id: '1', text: '1 beat per second', correct: false },
                        { id: '2', text: '2 beats per second  (120 ÷ 60)', correct: true },
                        { id: '4', text: '4 beats per second', correct: false }
                    ],
                    hint: '120 beats in 60 seconds = 2 beats every second.'
                },
                {
                    label: 'Step 2: Length of 1 Quarter-Note Beat (1/4)',
                    prompt: 'Since 2 beats fit into 1 second, each beat is half a second long (0.5 s). What is half a second in milliseconds (ms)?',
                    options: [
                        { id: '100', text: '100 ms', correct: false },
                        { id: '250', text: '250 ms', correct: false },
                        { id: '500', text: '500 ms  (0.5 seconds)', correct: true },
                        { id: '1000', text: '1,000 ms (1 full second)', correct: false }
                    ],
                    hint: '1 full second is 1,000 ms, so half a second (0.5 s) is 500 ms.'
                },
                {
                    label: 'Step 3: Length of 1 Eighth-Note Delay (1/8)',
                    prompt: 'An eighth note (1/8) is half of a quarter note. What is half of 500 ms?',
                    options: [
                        { id: '125', text: '125 ms', correct: false },
                        { id: '250', text: '250 ms  (Half of 500 ms)', correct: true },
                        { id: '500', text: '500 ms', correct: false },
                        { id: '750', text: '750 ms', correct: false }
                    ],
                    hint: 'Half of 500 ms is 250 ms (a quarter of a second).'
                }
            ]
        };

    const step1Correct = config.steps[0].options.find(o => o.id === step1Choice)?.correct;
    const step2Correct = config.steps[1].options.find(o => o.id === step2Choice)?.correct;
    const step3Correct = config.steps[2].options.find(o => o.id === step3Choice)?.correct;

    const allSelected = Boolean(step1Choice && step2Choice && step3Choice);
    const allCorrect = Boolean(step1Correct && step2Correct && step3Correct);

    const handleSubmit = () => {
        if (!allSelected) return;
        setIsSubmitted(true);
        if (onResult) {
            onResult(allCorrect);
        }
    };

    const handleRetry = () => {
        if (!step1Correct) setStep1Choice(null);
        if (!step2Correct) setStep2Choice(null);
        if (!step3Correct) setStep3Choice(null);
        setIsSubmitted(false);
    };

    const choices = [step1Choice, step2Choice, step3Choice];
    const setters = [setStep1Choice, setStep2Choice, setStep3Choice];

    return (
        <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: `1px solid ${config.accent}44`,
            borderRadius: '16px',
            padding: '22px',
            marginTop: '12px'
        }}>
            {/* Visual Cheat-Sheet Header */}
            <div style={{
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '16px 18px',
                marginBottom: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
            }}>
                <div style={{ flex: '1 1 280px' }}>
                    <span style={{
                        display: 'inline-block',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: `${config.accent}22`,
                        color: config.accent,
                        marginBottom: '6px'
                    }}>
                        {config.badge}
                    </span>
                    <h4 style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
                        {config.cheatTitle}
                    </h4>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.45 }}>
                        {config.cheatSubtitle}
                    </p>
                </div>

                {/* Simple Visual Summary Box */}
                {mode === 'wavelength' ? (
                    <div style={{
                        background: '#0f172a',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '10px',
                        padding: '10px 16px',
                        minWidth: '210px',
                        fontFamily: 'monospace',
                        fontSize: '0.86rem',
                        color: '#e2e8f0'
                    }}>
                        <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
                            OCTAVE LADDER (CONCERT A)
                        </div>
                        <div>▲ 1 Octave Up (A5): <strong style={{ color: step1Correct ? '#34d399' : '#94a3b8' }}>{step1Correct ? '880 Hz' : '?'}</strong></div>
                        <div>● Middle Reference (A4): <strong style={{ color: '#facc15' }}>440 Hz</strong></div>
                        <div>▼ 1 Octave Down (A3): <strong style={{ color: step2Correct ? '#34d399' : '#94a3b8' }}>{step2Correct ? '220 Hz' : '?'}</strong></div>
                    </div>
                ) : (
                    <div style={{
                        background: '#0f172a',
                        border: '1px solid rgba(249, 115, 22, 0.35)',
                        borderRadius: '10px',
                        padding: '10px 16px',
                        minWidth: '220px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        color: '#e2e8f0'
                    }}>
                        <div style={{ color: '#fb923c', fontWeight: 700, fontSize: '0.75rem', marginBottom: '4px' }}>
                            120 BPM CHEAT SHEET
                        </div>
                        <div>1. Speed: <strong style={{ color: step1Correct ? '#34d399' : '#94a3b8' }}>{step1Correct ? '2 beats / sec' : '?'}</strong></div>
                        <div>2. 1/4 Beat: <strong style={{ color: step2Correct ? '#34d399' : '#94a3b8' }}>{step2Correct ? '0.5 s (500 ms)' : '?'}</strong></div>
                        <div>3. 1/8 Note: <strong style={{ color: isSubmitted && step3Correct ? '#34d399' : '#facc15' }}>{isSubmitted && step3Correct ? '0.25 s (250 ms)' : '?'}</strong></div>
                    </div>
                )}
            </div>

            {/* 3 Guided Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {config.steps.map((step, sIdx) => {
                    const isUnlocked = sIdx === 0 || Boolean(choices[sIdx - 1]);
                    const selectedId = choices[sIdx];
                    const selectedOpt = step.options.find(o => o.id === selectedId);

                    return (
                        <div
                            key={sIdx}
                            style={{
                                opacity: isUnlocked ? 1 : 0.45,
                                pointerEvents: isUnlocked ? 'auto' : 'none',
                                background: 'rgba(30, 41, 59, 0.55)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '12px',
                                padding: '14px 16px',
                                transition: 'opacity 0.2s ease'
                            }}
                        >
                            <div style={{
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                color: config.accent,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                marginBottom: '4px'
                            }}>
                                {step.label}
                            </div>
                            <p style={{ margin: '0 0 12px 0', color: '#f1f5f9', fontSize: '0.94rem', lineHeight: 1.45 }}>
                                {step.prompt}
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '8px'
                            }}>
                                {step.options.map(opt => {
                                    const isSelected = selectedId === opt.id;
                                    let bg = 'rgba(255, 255, 255, 0.04)';
                                    let border = '1px solid rgba(255, 255, 255, 0.1)';
                                    let color = '#e2e8f0';

                                    if (isSubmitted) {
                                        if (opt.correct) {
                                            bg = 'rgba(16, 185, 129, 0.16)';
                                            border = '1px solid #10b981';
                                            color = '#34d399';
                                        } else if (isSelected) {
                                            bg = 'rgba(239, 68, 68, 0.16)';
                                            border = '1px solid #ef4444';
                                            color = '#fca5a5';
                                        }
                                    } else if (isSelected) {
                                        bg = `${config.accent}24`;
                                        border = `1px solid ${config.accent}`;
                                        color = '#fff';
                                    }

                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            disabled={isSubmitted}
                                            onClick={() => setters[sIdx](opt.id)}
                                            style={{
                                                background: bg,
                                                border,
                                                color,
                                                padding: '10px 12px',
                                                borderRadius: '8px',
                                                fontSize: '0.88rem',
                                                fontWeight: isSelected ? 600 : 500,
                                                textAlign: 'left',
                                                cursor: isSubmitted ? 'default' : 'pointer',
                                                transition: 'all 0.15s ease'
                                            }}
                                        >
                                            {opt.text}
                                        </button>
                                    );
                                })}
                            </div>

                            {isSubmitted && selectedOpt && !selectedOpt.correct && (
                                <div style={{
                                    marginTop: '8px',
                                    fontSize: '0.82rem',
                                    color: '#fca5a5'
                                }}>
                                    💡 {step.hint}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Submit / Retry Bar */}
            <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                {!isSubmitted ? (
                    <button
                        type="button"
                        disabled={!allSelected}
                        onClick={handleSubmit}
                        style={{
                            background: allSelected
                                ? `linear-gradient(135deg, ${config.accent}, #2563eb)`
                                : 'rgba(255, 255, 255, 0.08)',
                            color: allSelected ? '#fff' : '#64748b',
                            border: 'none',
                            padding: '10px 22px',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            cursor: allSelected ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Check All 3 Steps
                    </button>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{
                            fontWeight: 700,
                            fontSize: '0.92rem',
                            color: allCorrect ? '#34d399' : '#f87171'
                        }}>
                            {allCorrect
                                ? '✓ All 3 steps mastered!'
                                : '✗ One or more steps need fixing — check the hints above.'}
                        </span>
                        {!allCorrect && (
                            <button
                                type="button"
                                onClick={handleRetry}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: '#fff',
                                    padding: '7px 14px',
                                    borderRadius: '8px',
                                    fontSize: '0.84rem',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Fix Incorrect Steps
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
