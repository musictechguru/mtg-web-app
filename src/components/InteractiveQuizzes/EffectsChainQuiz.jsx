import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Lightbulb, Volume2, Settings, ArrowDown, Pause, GripVertical, Info } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

export default function EffectsChainQuiz({ onExit }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [aiExplanation, setAiExplanation] = useState('');
    const [loadingExplanation, setLoadingExplanation] = useState(false);
    const [effectsOrder, setEffectsOrder] = useState([]);
    const [draggedEffect, setDraggedEffect] = useState(null);
    const [parameters, setParameters] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef(null);

    const questions = [
        {
            type: 'order-chain',
            scenario: 'vocal-recording',
            question: 'Arrange these effects in the correct order for a vocal recording chain',
            hint: 'Order: EQ (fix problems) → Compressor (control dynamics) → Reverb (add space)',
            effects: [
                { id: 'reverb', name: 'Reverb' },
                { id: 'eq', name: 'EQ' },
                { id: 'compressor', name: 'Compressor' }
            ],
            correctOrder: ['eq', 'compressor', 'reverb'],
            explanation: 'Vocal chain: EQ first to fix frequency issues, Compressor to even out levels, then Reverb for space. Never compress before fixing EQ problems, and reverb always comes last!'
        },
        {
            type: 'set-parameters',
            scenario: 'compressor-vocal',
            question: 'Set the compressor for gentle vocal compression',
            hint: 'Ratio around 3:1 to 4:1, medium attack (10ms), medium-fast release (100ms)',
            effect: {
                name: 'Compressor',
                parameters: [
                    { id: 'ratio', name: 'Ratio', min: 1, max: 20, target: 4, unit: ':1', tolerance: 1 },
                    { id: 'attack', name: 'Attack', min: 0, max: 100, target: 10, unit: 'ms', tolerance: 5 },
                    { id: 'release', name: 'Release', min: 10, max: 500, target: 100, unit: 'ms', tolerance: 30 }
                ]
            },
            explanation: '3:1 to 4:1 ratio provides gentle compression. 10ms attack lets transients through for natural sound. 100ms release lets the compressor recover between phrases.'
        },
        {
            type: 'order-chain',
            scenario: 'guitar-distortion',
            question: 'Order these guitar pedal effects correctly',
            hint: 'Guitar → Distortion → EQ → Delay → Reverb',
            effects: [
                { id: 'delay', name: 'Delay' },
                { id: 'reverb', name: 'Reverb' },
                { id: 'distortion', name: 'Distortion' },
                { id: 'eq', name: 'EQ' }
            ],
            correctOrder: ['distortion', 'eq', 'delay', 'reverb'],
            explanation: 'Distortion first to create the tone, EQ to shape it, then time-based effects (Delay, Reverb) at the end. Reversing this order sounds muddy!'
        },
        {
            type: 'set-parameters',
            scenario: 'eq-remove-mud',
            question: 'Set the EQ to remove muddiness from a vocal',
            hint: 'Frequency: 250-300 Hz, Gain: -3 to -6 dB, Q: 1.5-2.5',
            effect: {
                name: 'Parametric EQ',
                parameters: [
                    { id: 'frequency', name: 'Frequency', min: 20, max: 20000, target: 275, unit: 'Hz', tolerance: 50 },
                    { id: 'gain', name: 'Gain', min: -12, max: 12, target: -4, unit: 'dB', tolerance: 2 },
                    { id: 'q', name: 'Q', min: 0.5, max: 5, target: 2, unit: '', tolerance: 0.7 }
                ]
            },
            explanation: 'Cutting 250-300 Hz removes muddiness and boxiness in vocals. Use moderate Q (1.5-2.5) for a natural sound. Too narrow sounds surgical, too wide affects too much.'
        },
        {
            type: 'order-chain',
            scenario: 'mastering-chain',
            question: 'Arrange a basic mastering chain',
            hint: 'EQ → Compressor → Limiter (always last!)',
            effects: [
                { id: 'limiter', name: 'Limiter' },
                { id: 'compressor', name: 'Compressor' },
                { id: 'eq', name: 'EQ' }
            ],
            correctOrder: ['eq', 'compressor', 'limiter'],
            explanation: 'Mastering chain: EQ for tonal balance, gentle Compressor for glue, Limiter last to catch peaks and maximize loudness. Limiter ALWAYS comes last in mastering!'
        },
        {
            type: 'identify-problem',
            question: 'What\'s wrong with this effects chain: Reverb → Compressor → EQ?',
            hint: 'Think about the signal flow and what each effect does',
            options: [
                'Nothing, this is correct',
                'Reverb should be last (after compression)',
                'EQ should be first',
                'Both B and C are correct'
            ],
            correct: 3,
            explanation: 'This chain is backwards! EQ should be first to fix problems, Compressor second to control dynamics, and Reverb last to add space. Compressing reverb tails sounds unnatural!'
        },
        {
            type: 'set-parameters',
            scenario: 'reverb-vocal',
            question: 'Set a subtle vocal reverb',
            hint: 'Small-medium room, short decay (1-2s), low mix (10-25%)',
            effect: {
                name: 'Reverb',
                parameters: [
                    { id: 'roomSize', name: 'Room Size', min: 0, max: 100, target: 35, unit: '%', tolerance: 15 },
                    { id: 'decay', name: 'Decay Time', min: 0.1, max: 10, target: 1.5, unit: 's', tolerance: 0.5 },
                    { id: 'mix', name: 'Wet/Dry Mix', min: 0, max: 100, target: 20, unit: '%', tolerance: 10 }
                ]
            },
            explanation: 'Subtle vocal reverb: small-medium room (30-40%), short decay (1-2s), and low mix (15-25%). This adds depth without making vocals sound distant or washed out.'
        },
        {
            type: 'multiple-choice',
            question: 'Why usually place EQ before compression?',
            hint: 'Think about what happens when you compress problem frequencies',
            options: [
                'EQ is always first, it\'s a rule',
                'So the compressor doesn\'t emphasize frequency problems',
                'It doesn\'t matter what order they\'re in',
                'To make the compressor work harder'
            ],
            correct: 1,
            explanation: 'EQ before compression means you fix frequency problems first. If you compress first, you\'ll make those problems louder and harder to fix. Remove mud before controlling dynamics!'
        },
        {
            type: 'order-chain',
            scenario: 'parallel-compression',
            question: 'Order a parallel compression setup for drums',
            hint: 'Split → Heavy Compressor → Mix back with original',
            effects: [
                { id: 'heavy-comp', name: 'Heavy Compressor' },
                { id: 'eq', name: 'EQ (on compressed)' },
                { id: 'blend', name: 'Blend with Original' }
            ],
            correctOrder: ['heavy-comp', 'eq', 'blend'],
            explanation: 'Parallel compression: crush the signal with heavy compression, EQ the compressed version if needed, then blend it back with the clean signal. This adds punch while keeping dynamics!'
        },
        {
            type: 'multiple-choice',
            question: 'When should reverb/delay come in an FX chain?',
            hint: 'Think about what happens to the reverb tail',
            options: [
                'At the very beginning',
                'Before distortion and compression',
                'After all dynamic and frequency effects',
                'It doesn\'t matter'
            ],
            correct: 2,
            explanation: 'Time-based effects (reverb, delay) come LAST! If you compress or distort after reverb, you\'ll affect the reverb tails in weird ways. Process the sound first, add space last.'
        }
    ];

    // Save quiz result
    const userContext = useUser();
    const saveQuizResult = userContext ? userContext.saveQuizResult : null;
    const resultsSavedRef = useRef(false);

    useEffect(() => {
        if (quizComplete && saveQuizResult && !resultsSavedRef.current) {
            resultsSavedRef.current = true;

            const percentage = Math.round((score / questions.length) * 100);
            let grade = 'U';
            if (percentage >= 80) grade = 'A';
            else if (percentage >= 70) grade = 'B';
            else if (percentage >= 60) grade = 'C';
            else if (percentage >= 50) grade = 'D';

            saveQuizResult("Topic 35: Audio Effects Processing", score, questions.length, grade);
        }
    }, [quizComplete, score, questions.length, saveQuizResult]);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

        // Initialize first question
        const firstQ = questions[0];
        if (firstQ.type === 'order-chain') {
            const shuffled = [...firstQ.effects].sort(() => Math.random() - 0.5);
            setEffectsOrder(shuffled);
        } else if (firstQ.type === 'set-parameters') {
            const defaults = {};
            firstQ.effect.parameters.forEach(param => {
                defaults[param.id] = param.min;
            });
            setParameters(defaults);
        }

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playWithEffects = () => {
        const ctx = audioContextRef.current;
        if (!ctx || isPlaying) return;

        setIsPlaying(true);
        const now = ctx.currentTime;

        const notes = [262, 330, 392, 330];
        const duration = 0.4;

        notes.forEach((freq, i) => {
            const noteTime = now + i * duration;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.frequency.value = freq;
            osc.type = 'sine';

            gain.gain.setValueAtTime(0, noteTime);
            gain.gain.linearRampToValueAtTime(0.2, noteTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.01, noteTime + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + duration);
        });

        setTimeout(() => setIsPlaying(false), notes.length * duration * 1000);
    };

    const handleDragStart = (effect, index) => {
        if (showFeedback) return;
        setDraggedEffect({ effect, index });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (targetIndex) => {
        if (draggedEffect === null || showFeedback) return;

        const newOrder = [...effectsOrder];
        const draggedItem = newOrder[draggedEffect.index];
        newOrder.splice(draggedEffect.index, 1);
        newOrder.splice(targetIndex, 0, draggedItem);

        setEffectsOrder(newOrder);
        setDraggedEffect(null);
    };

    const updateParameter = (paramId, value) => {
        if (showFeedback) return;
        setParameters(prev => ({ ...prev, [paramId]: value }));
    };

    const checkAnswer = async () => {
        const q = questions[currentQuestion];
        let isCorrect = false;

        if (q.type === 'order-chain') {
            const currentIds = effectsOrder.map(e => e.id);
            isCorrect = JSON.stringify(currentIds) === JSON.stringify(q.correctOrder);
        } else if (q.type === 'set-parameters') {
            isCorrect = q.effect.parameters.every(param => {
                const userValue = parameters[param.id] || param.min;
                return Math.abs(userValue - param.target) <= param.tolerance;
            });
        }

        setSelectedAnswer(isCorrect);
        setShowFeedback(true);

        if (isCorrect) {
            setScore(score + 1);
        }

        await getAIExplanation(q, isCorrect);
    };

    const handleMultipleChoice = async (answer) => {
        setSelectedAnswer(answer);
        setShowFeedback(true);

        const currentQ = questions[currentQuestion];
        const isCorrect = answer === currentQ.correct;

        if (isCorrect) {
            setScore(score + 1);
        }

        await getAIExplanation(currentQ, isCorrect);
    };

    const getAIExplanation = async (question, isCorrect) => {
        setLoadingExplanation(true);
        try {
            const explanation = isCorrect
                ? "Spot on! You've got the signal flow logic down perfectly. " + question.explanation
                : "Not quite. " + question.explanation;
            await new Promise(resolve => setTimeout(resolve, 800));
            setAiExplanation(explanation);
        } catch (error) {
            setAiExplanation("Great effort! " + question.explanation);
        } finally {
            setLoadingExplanation(false);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setAiExplanation('');

            const nextQ = questions[currentQuestion + 1];
            if (nextQ.type === 'order-chain') {
                const shuffled = [...nextQ.effects].sort(() => Math.random() - 0.5);
                setEffectsOrder(shuffled);
            } else if (nextQ.type === 'set-parameters') {
                const defaults = {};
                nextQ.effect.parameters.forEach(param => {
                    defaults[param.id] = param.min;
                });
                setParameters(defaults);
            }
        } else {
            setQuizComplete(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setQuizComplete(false);
        setAiExplanation('');
        setEffectsOrder([]);
        setParameters({});
        resultsSavedRef.current = false;

        const firstQ = questions[0];
        if (firstQ.type === 'order-chain') {
            const shuffled = [...firstQ.effects].sort(() => Math.random() - 0.5);
            setEffectsOrder(shuffled);
        } else if (firstQ.type === 'set-parameters') {
            const defaults = {};
            firstQ.effect.parameters.forEach(param => {
                defaults[param.id] = param.min;
            });
            setParameters(defaults);
        }
    };

    const renderEffectBox = (effect, index, showIndex = false) => {
        const isDragSource = draggedEffect && draggedEffect.effect.id === effect.id;

        // Dynamic styling state
        let borderColor = 'rgba(255,255,255,0.1)';
        let bg = 'rgba(30, 41, 59, 0.7)';

        const isCorrect = showFeedback && selectedAnswer;
        const isIncorrect = showFeedback && !selectedAnswer;

        if (isCorrect) {
            borderColor = 'var(--accent-success, #22c55e)';
            bg = 'rgba(34, 197, 94, 0.1)';
        } else if (isIncorrect) {
            borderColor = 'var(--accent-error, #991b1b)';
        }

        return (
            <div key={effect.id} className="relative">
                <div
                    draggable={!showFeedback}
                    onDragStart={() => handleDragStart(effect, index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                    className={`flex items-center p-4 rounded-lg cursor-move transition-all ${showFeedback ? 'cursor-default' : 'hover:bg-slate-700/80'
                        } ${isDragSource ? 'opacity-50' : ''}`}
                    style={{
                        background: bg,
                        border: `1px solid ${borderColor}`,
                        marginBottom: '10px'
                    }}
                >
                    <div className="mr-3 text-slate-400 opacity-50">
                        <GripVertical size={20} />
                    </div>
                    <span className="text-base font-medium text-white">{effect.name}</span>
                </div>

                {/* Arrow Connector */}
                {index < effectsOrder.length - 1 && (
                    <div className="flex justify-center h-[10px] mb-[10px] text-slate-500 opacity-30">
                        <ArrowDown size={14} />
                    </div>
                )}
            </div>
        );
    };

    const renderKnob = (param, value) => {
        const percentage = ((value - param.min) / (param.max - param.min)) * 100;
        const rotation = (percentage / 100) * 270 - 135;
        const isCorrect = showFeedback && Math.abs(value - param.target) <= param.tolerance;
        const isWrong = showFeedback && !isCorrect;

        return (
            <div className="flex flex-col items-center">
                <label className="text-sm font-semibold text-gray-300 mb-2">{param.name}</label>
                <div className="relative w-20 h-20 mb-2">
                    <div className={`absolute inset-0 rounded-full border-4 ${isCorrect ? 'border-green-500' : isWrong ? 'border-red-500' : 'border-slate-600'
                        } bg-slate-800`}></div>
                    <div
                        className={`absolute inset-1 rounded-full ${isCorrect ? 'bg-gradient-to-br from-green-500 to-green-700'
                            : isWrong ? 'bg-gradient-to-br from-red-500 to-red-700'
                                : 'bg-gradient-to-br from-blue-500 to-blue-700'
                            } cursor-pointer shadow-lg`}
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        <div className="absolute top-1 left-1/2 w-1 h-4 bg-white/80 rounded-full transform -translate-x-1/2"></div>
                    </div>
                </div>
                <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step={(param.max - param.min) / 100}
                    value={value}
                    onChange={(e) => updateParameter(param.id, parseFloat(e.target.value))}
                    disabled={showFeedback}
                    className="w-full opacity-50 hover:opacity-100 cursor-pointer"
                />
                <div className={`text-sm font-bold mt-1 ${isCorrect ? 'text-green-400' : isWrong ? 'text-red-400' : 'text-blue-300'}`}>
                    {value.toFixed(1)} {param.unit}
                </div>
            </div>
        );
    };

    const renderQuestion = () => {
        const q = questions[currentQuestion];

        if (q.type === 'order-chain') {
            const isCorrect = showFeedback && JSON.stringify(effectsOrder.map(e => e.id)) === JSON.stringify(q.correctOrder);

            return (
                <div className="space-y-4">
                    {/* Signal Flow Container */}
                    <div className="rounded-xl p-6 border border-slate-700/50" style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <p className="text-slate-400 mb-4 text-sm flex items-center gap-2">
                            <ArrowDown size={14} /> Drag items to reorder Signal Flow (Top = First)
                        </p>

                        <div className="flex flex-col">
                            {effectsOrder.map((effect, index) => renderEffectBox(effect, index))}
                        </div>
                    </div>

                    {!showFeedback && (
                        <div className="flex gap-2">
                            <button
                                onClick={playWithEffects}
                                disabled={isPlaying}
                                className="px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 border border-slate-600 disabled:opacity-50 flex items-center gap-2 text-sm"
                            >
                                {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
                                {isPlaying ? 'Playing...' : 'Test'}
                            </button>
                            <button
                                onClick={checkAnswer}
                                className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 text-lg shadow-lg"
                            >
                                Submit Answer
                            </button>
                        </div>
                    )}

                    {showFeedback && !isCorrect && (
                        <div className="mt-2 text-xs text-red-400 bg-red-900/20 border border-red-500/50 p-2 rounded">
                            <strong>Correct Order:</strong> {q.correctOrder.map(id => q.effects.find(e => e.id === id).name).join(' → ')}
                        </div>
                    )}
                </div>
            );
        }

        if (q.type === 'set-parameters') {
            // Keep existing layout but update container style
            const allCorrect = showFeedback && q.effect.parameters.every(param => {
                const userValue = parameters[param.id] || param.min;
                return Math.abs(userValue - param.target) <= param.tolerance;
            });

            return (
                <div className="space-y-6">
                    <div className="rounded-xl p-8 border border-slate-700/50" style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <div className="grid grid-cols-3 gap-4">
                            {q.effect.parameters.map(param => (
                                <div key={param.id}>
                                    {renderKnob(param, parameters[param.id] || param.min)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {!showFeedback && (
                        <button onClick={checkAnswer} className="btn-primary w-full py-3 text-lg">
                            Submit Answer
                        </button>
                    )}
                </div>
            );
        }

        if (q.type === 'multiple-choice' || q.type === 'identify-problem') {
            return (
                <div className="space-y-3">
                    {q.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === q.correct;
                        const showCorrect = showFeedback && isCorrect;
                        const showIncorrect = showFeedback && isSelected && !isCorrect;

                        let className = "option-btn";
                        if (isSelected) className += " selected";
                        if (showFeedback) {
                            if (isCorrect) className += " correct";
                            else if (isSelected) className += " incorrect";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => !showFeedback && handleMultipleChoice(index)}
                                disabled={showFeedback}
                                className={className}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <span className="font-medium">{option}</span>
                                {showCorrect && <Check className="text-green-500" size={20} />}
                                {showIncorrect && <X className="text-red-500" size={20} />}
                            </button>
                        );
                    })}
                </div>
            );
        }
    };

    if (quizComplete) {
        const percentage = Math.round((score / questions.length) * 100);

        let grade = 'U';
        let expl = 'Keep practicing.';
        let color = 'var(--accent-error)';

        if (percentage >= 80) {
            grade = 'A';
            expl = 'Excellent! You have a solid grasp of the foundation and advanced concepts.';
            color = 'var(--accent-success)';
        } else if (percentage >= 70) {
            grade = 'B';
            expl = 'Great work! You are secure in most areas but review the weaker topics.';
            color = '#a3e635';
        } else if (percentage >= 60) {
            grade = 'C';
            expl = 'Good effort. You know the basics well, but deeper technical understanding is needed.';
            color = '#facc15';
        } else if (percentage >= 50) {
            grade = 'D';
            expl = 'Passable, but significant gaps in your knowledge. Review Part 1 (Foundation).';
            color = '#fb923c';
        }

        return (
            <div className="quiz-container results-screen">
                <div className="score-circle" style={{ borderColor: color, color: color }}>
                    {grade}
                </div>
                <h2 style={{ fontSize: '2rem' }}>{percentage}%</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    You scored {score} out of {questions.length}.
                </p>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>{expl}</p>
                </div>
                <button
                    className="btn-primary"
                    onClick={onExit}
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-player-layout">
            <div className="quiz-left-col">
                <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Topic 35: Audio Effects Processing • Question {currentQuestion + 1} of {questions.length}
                </div>

                <div className="question-card">
                    <div className="question-header">
                        <span>{questions[currentQuestion].question}</span>
                    </div>

                    <div className="question-text">

                        {questions[currentQuestion].hint && (
                            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-3 mb-6 flex gap-3">
                                <Lightbulb className="text-amber-500 flex-shrink-0" size={20} />
                                <div>
                                    <p className="text-xs font-bold text-amber-500 uppercase">Hint</p>
                                    <p className="text-sm text-amber-200">{questions[currentQuestion].hint}</p>
                                </div>
                            </div>
                        )}

                        <div className="options-grid" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}>
                            {renderQuestion()}
                        </div>
                    </div>

                    {showFeedback && (
                        <div className="controls" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <button onClick={nextQuestion} className="btn-primary" style={{ flex: 1 }}>
                                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className={`quiz-right-col ${showFeedback ? 'visible' : ''}`}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--accent-purple)' }}>
                    Expert Explanation
                </h3>

                {showFeedback ? (
                    <div className="expert-explanation-container">
                        <div className="expert-text" style={{ marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                            {aiExplanation || questions[currentQuestion].explanation}
                        </div>
                    </div>
                ) : (
                    <div className="explanation-placeholder">
                        <p>Submit your answer to reveal the explanation.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
