import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Lightbulb, Volume2, Settings, ArrowDown, Pause, GripVertical, Info } from 'lucide-react';

export default function EffectsChainQuiz({ onExit }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [aiExplanation, setAiExplanation] = useState('');
    const [loadingExplanation, setLoadingExplanation] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
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

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
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
        setShowIntro(true);
        setEffectsOrder([]);
        setParameters({});
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

                    {!showFeedback ? (
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
                                Check Order
                            </button>
                        </div>
                    ) : (
                        <div className={`p-4 rounded-lg border flex items-start gap-3 ${isCorrect ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'
                            }`}>
                            {isCorrect ? <Check className="text-green-500 mt-1" size={24} /> : <X className="text-red-500 mt-1" size={24} />}
                            <div>
                                <h4 className={`font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                    {isCorrect ? 'Perfect Signal Flow!' : 'Broken Chain'}
                                </h4>
                                <p className="text-slate-300 text-sm mt-1">{q.explanation}</p>
                                {!isCorrect && (
                                    <div className="mt-2 text-xs text-slate-400 bg-black/20 p-2 rounded">
                                        <strong>Correct:</strong> {q.correctOrder.map(id => q.effects.find(e => e.id === id).name).join(' → ')}
                                    </div>
                                )}
                            </div>
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

                    {!showFeedback ? (
                        <button onClick={checkAnswer} className="btn-primary w-full py-3 text-lg">
                            Check Settings
                        </button>
                    ) : (
                        <div className={`p-4 rounded-lg border flex items-center gap-3 ${allCorrect ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'
                            }`}>
                            {allCorrect ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                            <div>
                                <p className="text-slate-300">{q.explanation}</p>
                            </div>
                        </div>
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

                        return (
                            <button
                                key={index}
                                onClick={() => !showFeedback && handleMultipleChoice(index)}
                                disabled={showFeedback}
                                className={`w-full p-4 text-left rounded-lg border transition-all ${showCorrect ? 'border-green-500 bg-green-900/20 text-green-300'
                                        : showIncorrect ? 'border-red-500 bg-red-900/20 text-red-300'
                                            : isSelected ? 'border-blue-500 bg-blue-900/20 text-blue-300'
                                                : 'border-slate-700 hover:border-slate-500 bg-slate-800/50 text-slate-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{option}</span>
                                    {showCorrect && <Check className="text-green-500" size={20} />}
                                    {showIncorrect && <X className="text-red-500" size={20} />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            );
        }
    };

    if (showIntro) {
        return (
            <div className="quiz-container">
                <div className="question-card text-center p-8" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <div className="text-6xl mb-4">🎛️</div>
                    <h1 className="text-3xl font-bold text-white mb-2">Effects Chain Challenge</h1>
                    <p className="text-lg text-slate-400 mb-8">Master the art of signal flow and processing.</p>

                    <button
                        onClick={() => {
                            setShowIntro(false);
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
                        }}
                        className="btn-primary px-8 py-3 text-lg flex items-center gap-2 mx-auto"
                    >
                        Start Processing <Play size={20} />
                    </button>
                    <button onClick={onExit} className="block mx-auto mt-4 text-slate-500 hover:text-slate-300">
                        Exit to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (quizComplete) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="quiz-container results-screen">
                <div className="score-circle" style={{
                    borderColor: percentage >= 70 ? 'var(--accent-success)' : percentage >= 50 ? '#fb923c' : 'var(--accent-error)',
                    color: percentage >= 70 ? 'var(--accent-success)' : percentage >= 50 ? '#fb923c' : 'var(--accent-error)'
                }}>
                    {percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'U'}
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">{percentage}% Score</h2>
                <p className="text-slate-400 mb-8">You got {score} out of {questions.length} correct.</p>
                <div className="flex gap-4 justify-center">
                    <button onClick={resetQuiz} className="btn-primary flex items-center gap-2">
                        <RotateCcw size={18} /> Retry
                    </button>
                    <button onClick={onExit} className="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800">
                        Finish
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="mb-4 text-sm text-slate-400 flex justify-between items-center">
                <span><Settings size={14} className="inline mr-1" /> Audio Effects</span>
                <span>Question {currentQuestion + 1} of {questions.length}</span>
            </div>

            <div className="intro-card p-6 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <h2 className="text-xl font-bold text-white mb-4">{questions[currentQuestion].question}</h2>

                {questions[currentQuestion].hint && (
                    <div className="bg-amber-500/10 border-l-4 border-amber-500 p-3 mb-6 flex gap-3">
                        <Lightbulb className="text-amber-500 flex-shrink-0" size={20} />
                        <div>
                            <p className="text-xs font-bold text-amber-500 uppercase">Hint</p>
                            <p className="text-sm text-amber-200">{questions[currentQuestion].hint}</p>
                        </div>
                    </div>
                )}

                {renderQuestion()}

                {showFeedback && (
                    <div className="flex justify-end mt-6 pt-4 border-t border-slate-700/50">
                        <button onClick={nextQuestion} className="btn-primary flex items-center gap-2">
                            {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'} <ArrowDown className="rotate-[-90deg]" size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
