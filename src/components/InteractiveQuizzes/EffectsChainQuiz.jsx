import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Lightbulb, Volume2, Settings, ArrowDown, Pause, GripVertical, Info } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import './EffectsChainQuiz.css';

const DRAG_SCALE = 200;

const KnobComponent = ({ label, value, min, max, step, onChange, unit = '', isCorrect = null, targetValue = null, isLogScale = false, showFeedback = false }) => {
    const valMin = isLogScale ? Math.log10(min) : min;
    const valMax = isLogScale ? Math.log10(max) : max;
    const valRange = valMax - valMin;

    const displayVal = isLogScale ? Math.log10(value) : value;
    const percentage = Math.max(0, Math.min(1, (displayVal - valMin) / valRange));
    const rotation = percentage * 270 - 135;

    const handlePointerDown = (e) => {
        if (showFeedback) return;
        e.preventDefault();

        const startY = e.clientY;
        const startValue = isLogScale ? Math.log10(value) : value;

        const handlePointerMove = (moveEvent) => {
            const deltaY = startY - moveEvent.clientY;
            let newVal = startValue + (deltaY / DRAG_SCALE) * valRange;

            newVal = Math.max(valMin, Math.min(valMax, newVal));

            if (isLogScale) {
                onChange(Math.pow(10, newVal));
            } else {
                if (step) {
                    newVal = Math.round(newVal / step) * step;
                }
                onChange(newVal);
            }
        };

        const handlePointerUp = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    let markerClass = 'neutral';
    let capClass = 'neutral';
    if (showFeedback) {
        if (isCorrect) {
            markerClass = 'correct';
            capClass = 'correct';
        } else if (isCorrect === false) {
            markerClass = 'incorrect';
            capClass = 'incorrect';
        }
    }

    let targetRotation = null;
    if (showFeedback && isCorrect === false && targetValue !== null) {
        const targetDisplayVal = isLogScale ? Math.log10(targetValue) : targetValue;
        const targetPercentage = Math.max(0, Math.min(1, (targetDisplayVal - valMin) / valRange));
        targetRotation = targetPercentage * 270 - 135;
    }

    return (
        <div className="fx-knob-container">
            <div
                className="fx-knob-wrapper"
                onPointerDown={handlePointerDown}
                style={{ touchAction: 'none', cursor: showFeedback ? 'default' : 'ns-resize' }}
            >
                <div className="fx-knob-shadow"></div>

                {targetRotation !== null && (
                    <>
                        <div className="fx-ghost-knob" style={{ transform: `rotate(${targetRotation}deg)` }}>
                            <div className="fx-ghost-marker"></div>
                        </div>
                    </>
                )}

                <div className={`fx-knob-cap ${capClass}`} style={{ transform: `rotate(${rotation}deg)` }}>
                    <div className={`fx-knob-marker ${markerClass}`}></div>
                </div>
            </div>
            <div className="fx-knob-label-box">
                <span className="fx-knob-label">{label}</span>
                <span className="fx-knob-value">{value.toFixed(value >= 10 ? 0 : 1)}{unit}</span>
                {showFeedback && isCorrect === false && targetValue !== null && (
                    <span className="fx-knob-target-label">
                        TARGET:<br />{targetValue.toFixed(targetValue >= 10 ? 0 : 1)}{unit}
                    </span>
                )}
            </div>
        </div>
    );
};

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
            question: 'You are mixing a dynamic lead vocal that has some low-end rumble from the mic stand. Build a professional signal chain to clean it up, level it out, and put it in a virtual space.',
            hint: 'Think: Do you want a compressor reacting to rumble, or compressing the echoes of a room?',
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
            question: 'You need to lightly control the dynamics of a lead vocal without squashing the life out of it. Dial in the compressor settings.',
            hint: 'Gentle compression needs a low Ratio and a Threshold that only catches the peaks.',
            effect: {
                name: 'Compressor',
                parameters: [
                    { id: 'threshold', name: 'Threshold', min: -40, max: 0, target: -18, unit: 'dB', tolerance: 6, step: 1 },
                    { id: 'ratio', name: 'Ratio', min: 1, max: 20, target: 4, unit: ':1', tolerance: 3, step: 0.1 },
                    { id: 'attack', name: 'Attack', min: 0, max: 100, target: 10, unit: 'ms', tolerance: 20, step: 1 },
                    { id: 'release', name: 'Release', min: 10, max: 500, target: 100, unit: 'ms', tolerance: 100, step: 5 }
                ]
            },
            explanation: '3:1 to 4:1 ratio provides gentle compression. 10ms attack lets transients through for natural sound. 100ms release lets the compressor recover between phrases.'
        },
        {
            type: 'order-chain',
            scenario: 'guitar-distortion',
            question: 'You are setting up a pedalboard for an electric guitar. You want to heavily distort the signal, shape the tone of that distortion, and then add a spacious echo.',
            hint: 'Create the core tone first, then shape it, then add space at the very end.',
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
            question: 'A vocal recording sounds very "muddy" and "boxy" because the singer was standing too close to the microphone foam. Use the EQ to hollow out the mud.',
            hint: 'Mud lives in the lower-mids. Use a moderate width (Q) so you don\'t gut the root notes.',
            effect: {
                name: 'Parametric EQ',
                parameters: [
                    { id: 'frequency', name: 'Frequency', min: 20, max: 5000, target: 275, unit: 'Hz', tolerance: 150, isLogScale: true },
                    { id: 'gain', name: 'Gain', min: -12, max: 12, target: -4, unit: 'dB', tolerance: 4, step: 0.5 },
                    { id: 'q', name: 'Q', min: 0.5, max: 5, target: 2, unit: '', tolerance: 1.5, step: 0.1 }
                ]
            },
            explanation: 'Cutting 250-300 Hz removes muddiness and boxiness in vocals. Use moderate Q (1.5-2.5) for a natural sound. Too narrow sounds surgical, too wide affects too much.'
        },
        {
            type: 'order-chain',
            scenario: 'mastering-chain',
            question: 'You are mastering a final stereo mixdown of a track. It needs slight tonal balancing, some "glue" to hold the instruments together, and finally, a hard ceiling to ensure it doesn\'t clip at 0dB.',
            hint: 'A Limiter is a brick wall. Never put anything after a brick wall.',
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
            scenario: 'identify-vocal',
            question: 'An amateur producer shows you their vocal chain: Reverb → Compressor → EQ. What is fundamentally wrong with this order?',
            hint: 'What happens to the volume tail of an echo when you smash it with a Compressor?',
            options: [
                'Nothing, this is an acceptable creative choice',
                'Reverb should be last because compressing a reverb tail ruins its natural fade',
                'EQ should be first to fix problems before anything else',
                'Both B and C are correct'
            ],
            correct: 3,
            explanation: 'This chain is backwards! EQ should be first to fix problems, Compressor second to control dynamics, and Reverb last to add space. Compressing reverb tails sounds unnatural!'
        },
        {
            type: 'set-parameters',
            scenario: 'reverb-vocal',
            question: 'Set up a subtle Reverb for a vocal. It needs to sound like they are in a small studio room, not a massive cathedral, and it shouldn\'t wash out the dry signal.',
            hint: 'Keep the room small, the decay under 2 seconds, and the mix very low.',
            effect: {
                name: 'Reverb',
                parameters: [
                    { id: 'roomSize', name: 'Room Size', min: 0, max: 100, target: 35, unit: '%', tolerance: 30, step: 1 },
                    { id: 'decay', name: 'Decay Time', min: 0.1, max: 10, target: 1.5, unit: 's', tolerance: 1.0, step: 0.1 },
                    { id: 'mix', name: 'Wet/Dry Mix', min: 0, max: 100, target: 20, unit: '%', tolerance: 15, step: 1 }
                ]
            },
            explanation: 'Subtle vocal reverb: small-medium room (30-40%), short decay (1-2s), and low mix (15-25%). This adds depth without making vocals sound distant or washed out.'
        },
        {
            type: 'multiple-choice',
            scenario: 'identify-vocal',
            question: 'Why is it standard industry practice to place your EQ *before* your Compressor in a vocal chain?',
            hint: 'What happens if a compressor reacts to a massive bass rumble that you haven\'t removed yet?',
            options: [
                'It is just an old habit from the analog mixing console days',
                'If you compress first, the compressor will react to bad frequencies, making them louder and harder to EQ out later',
                'Because compressors require a perfectly flat EQ curve to function mathematically',
                'To make the compressor work harder and achieve more saturation'
            ],
            correct: 1,
            explanation: 'EQ before compression means you fix frequency problems first. If you compress first, you\'ll make those problems louder and harder to fix. Remove mud before controlling dynamics!'
        },
        {
            type: 'order-chain',
            scenario: 'parallel-compression',
            question: 'You want to add extreme punch to a Drum Bus without losing the transients. Set up a "Parallel Compression" chain (often called New York Compression).',
            hint: 'Crush a copy of the drums, EQ the crushed version, then mix it back with the dry drums.',
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
            scenario: 'identify-guitar',
            question: 'When placing time-based effects like Delay or Reverb on a distorted guitar lead, where should they go in the signal chain?',
            hint: 'What happens if you run a beautiful, fading echo directly into a fuzz pedal?',
            options: [
                'At the very beginning, before the amp simulator',
                'Before distortion and compression, but after EQ',
                'At the very end of the chain, after all dynamic, distortion, and frequency effects',
                'It doesn\'t matter, digital audio workstations calculate them simultaneously'
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
        const q = questions[currentQuestion];

        if (q.scenario.includes('vocal')) {
            // Simulate a voice: Sawtooth with a tight bandpass filter and vibrato
            const duration = 1.5;
            const osc = ctx.createOscillator();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.value = 220; // A3

            // Vibrato
            lfo.type = 'sine';
            lfo.frequency.value = 5.5; // 5.5Hz vibrato
            lfoGain.gain.value = 5; // Pitch modulation depth
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);

            // Formant/Voice Filter
            filter.type = 'bandpass';
            filter.frequency.value = 1200;
            filter.Q.value = 2;

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.2); // Slow vocal attack
            gain.gain.linearRampToValueAtTime(0.2, now + duration - 0.2);
            gain.gain.linearRampToValueAtTime(0, now + duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            lfo.start(now);
            osc.stop(now + duration);
            lfo.stop(now + duration);

            setTimeout(() => setIsPlaying(false), duration * 1000);

        } else if (q.scenario.includes('guitar')) {
            // Simulate distorted guitar: Power chord (Root, Fifth, Octave)
            const duration = 1.0;
            const root = 146.83; // D3

            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const osc3 = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc1.type = 'square';
            osc2.type = 'square';
            osc3.type = 'square';

            osc1.frequency.value = root;
            osc2.frequency.value = root * 1.5; // Perfect 5th
            osc3.frequency.value = root * 2;   // Octave

            // Filter out harsh highs
            filter.type = 'lowpass';
            filter.frequency.value = 4000;

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.15, now + 0.05); // Fast attack
            gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

            osc1.connect(filter);
            osc2.connect(filter);
            osc3.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc3.start(now);
            osc1.stop(now + duration);
            osc2.stop(now + duration);
            osc3.stop(now + duration);

            setTimeout(() => setIsPlaying(false), duration * 1000);

        } else if (q.scenario.includes('drums') || q.scenario.includes('parallel')) {
            // Simulate Kick and Snare
            const duration = 0.8;

            // Kick
            const kickOsc = ctx.createOscillator();
            const kickGain = ctx.createGain();
            kickOsc.type = 'sine';

            // Pitch drop for kick
            kickOsc.frequency.setValueAtTime(150, now);
            kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.1);

            kickGain.gain.setValueAtTime(0.6, now);
            kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

            kickOsc.connect(kickGain);
            kickGain.connect(ctx.destination);

            kickOsc.start(now);
            kickOsc.stop(now + 0.3);

            // Snare (offset by 0.4s)
            const snareTime = now + 0.4;
            const bufferSize = ctx.sampleRate * 0.2; // 0.2 seconds of noise
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const noiseFilter = ctx.createBiquadFilter();
            const snareGain = ctx.createGain();

            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.value = 2500;
            noiseFilter.Q.value = 1;

            snareGain.gain.setValueAtTime(0.4, snareTime);
            snareGain.gain.exponentialRampToValueAtTime(0.01, snareTime + 0.2);

            noise.connect(noiseFilter);
            noiseFilter.connect(snareGain);
            snareGain.connect(ctx.destination);

            noise.start(snareTime);

            setTimeout(() => setIsPlaying(false), duration * 1000);

        } else {
            // Default / Mastering (Rich synth chord)
            const duration = 2.0;
            const root = 261.63; // C4

            [1, 1.25, 1.5, 2].forEach(ratio => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.value = root * ratio;

                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + duration);
            });

            setTimeout(() => setIsPlaying(false), duration * 1000);
        }
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

    const retryPatch = () => {
        setSelectedAnswer(null);
        setShowFeedback(false);
    };

    const renderEffectBox = (effect, index, showIndex = false) => {
        const isDragSource = draggedEffect && draggedEffect.effect.id === effect.id;

        const isCorrect = showFeedback && selectedAnswer;
        const isIncorrect = showFeedback && !selectedAnswer;

        let statusClass = '';
        if (isCorrect) statusClass = 'correct';
        else if (isIncorrect) statusClass = 'incorrect';

        return (
            <div key={effect.id} className="relative w-full">
                <div
                    draggable={!showFeedback}
                    onDragStart={() => handleDragStart(effect, index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                    className={`fx-draggable-box ${showFeedback ? 'disabled' : ''} ${isDragSource ? 'dragging' : ''} ${statusClass}`}
                >
                    <div className="fx-grip-icon">
                        <GripVertical size={20} />
                    </div>
                    <span>{effect.name}</span>
                </div>

                {/* Arrow Connector */}
                {index < effectsOrder.length - 1 && (
                    <div className="fx-arrow-connector">
                        <ArrowDown size={14} />
                    </div>
                )}
            </div>
        );
    };

    const renderQuestion = () => {
        const q = questions[currentQuestion];

        if (q.type === 'order-chain') {
            const isCorrect = showFeedback && JSON.stringify(effectsOrder.map(e => e.id)) === JSON.stringify(q.correctOrder);

            return (
                <div className="space-y-4 w-full">
                    {/* Signal Flow Container */}
                    <div className="fx-panel-container fx-flow-container">
                        <p className="fx-panel-label">
                            <ArrowDown size={14} /> Drag to Reorder Signal Flow
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
                        <div className="fx-correct-order-box">
                            <strong>Correct Order:</strong><br />{q.correctOrder.map(id => q.effects.find(e => e.id === id).name).join(' → ')}
                        </div>
                    )}
                </div>
            );
        }

        if (q.type === 'set-parameters') {
            const allCorrect = showFeedback && selectedAnswer;

            return (
                <div className="space-y-6 w-full">
                    <div className="fx-panel-container">
                        <p className="fx-panel-label text-center w-full justify-center">
                            <Settings size={14} /> {q.effect.name} Parameters
                        </p>
                        <div className="fx-knob-grid">
                            {q.effect.parameters.map(param => {
                                const val = parameters[param.id] !== undefined ? parameters[param.id] : param.min;
                                const isCorrectParam = showFeedback ? Math.abs(val - param.target) <= param.tolerance : null;
                                return (
                                    <div key={param.id}>
                                        <KnobComponent
                                            label={param.name}
                                            value={val}
                                            min={param.min}
                                            max={param.max}
                                            step={param.step}
                                            onChange={(v) => updateParameter(param.id, v)}
                                            unit={param.unit}
                                            isCorrect={isCorrectParam}
                                            targetValue={param.target}
                                            isLogScale={param.isLogScale || false}
                                            showFeedback={showFeedback}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {!showFeedback && (
                        <button onClick={checkAnswer} className="btn-primary w-full py-3 text-lg">
                            Submit Patch
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
                            {selectedAnswer === false && (q.type === 'order-chain' || q.type === 'set-parameters') && (
                                <button onClick={retryPatch} className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid #475569', color: 'white' }}>
                                    <RotateCcw size={18} /> Try Again
                                </button>
                            )}
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
