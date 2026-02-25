import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Lightbulb, Volume2, Settings, ArrowDown, Pause, GripVertical, ChevronUp, ChevronDown, Info, PlusCircle } from 'lucide-react';
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
        if (isCorrect === true) {
            markerClass = 'correct';
            capClass = 'correct';
        } else if (isCorrect === false) {
            markerClass = 'incorrect';
            capClass = 'incorrect';
        }
    }

    let targetRotation = null;
    if (showFeedback && isCorrect === false && targetValue !== null && targetValue !== undefined) {
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
    const sourceRef = useRef(null);
    const [showHint, setShowHint] = useState(false);

    // Cache to prevent re-fetching the MP3 every time a knob is dragged
    const bufferCacheRef = useRef({});

    // Configurations for the 8 available Mini-DAW plugins
    const effectConfigs = {
        'eq': { name: 'EQ', parameters: [{ id: 'eq_cutoff', name: 'Cutoff', min: 20, max: 500, target: 120, unit: 'Hz', step: 1, init: 20 }] },
        'compressor': {
            name: 'Compressor', parameters: [
                { id: 'comp_thresh', name: 'Threshold', min: -40, max: 0, target: -18, unit: 'dB', step: 1, init: 0 },
                { id: 'comp_ratio', name: 'Ratio', min: 1, max: 20, target: 4, unit: ':1', step: 1, init: 1 },
                { id: 'comp_attack', name: 'Attack', min: 0, max: 100, target: 10, unit: 'ms', step: 1, init: 10 },
                { id: 'comp_release', name: 'Release', min: 10, max: 500, target: 100, unit: 'ms', step: 5, init: 100 }
            ]
        },
        'gate': { name: 'Noise Gate', parameters: [{ id: 'gate_thresh', name: 'Threshold', min: -60, max: 0, target: -40, unit: 'dB', step: 1, init: -60 }] },
        'reverb': { name: 'Reverb', parameters: [{ id: 'rev_time', name: 'Time', min: 0.1, max: 5.0, target: 1.5, unit: 's', step: 0.1, init: 1.5 }, { id: 'rev_mix', name: 'Mix', min: 0, max: 100, target: 20, unit: '%', step: 1, init: 20 }] },
        'delay': { name: 'Delay', parameters: [{ id: 'del_time', name: 'Time', min: 0.1, max: 1.0, target: 0.3, unit: 's', step: 0.05, init: 0.3 }, { id: 'del_fb', name: 'Feedback', min: 0, max: 90, target: 30, unit: '%', step: 1, init: 30 }] },
        'chorus': { name: 'Chorus', parameters: [{ id: 'cho_rate', name: 'Rate', min: 0.1, max: 5.0, target: 1.0, unit: 'Hz', step: 0.1, init: 1.0 }, { id: 'cho_depth', name: 'Depth', min: 0, max: 100, target: 50, unit: '%', step: 1, init: 50 }] },
        'distortion': { name: 'Distortion', parameters: [{ id: 'dist_drive', name: 'Drive', min: 0, max: 100, target: 50, unit: '%', step: 1, init: 50 }] },
        'flanger': { name: 'Flanger', parameters: [{ id: 'flan_rate', name: 'Rate', min: 0.1, max: 5.0, target: 0.5, unit: 'Hz', step: 0.1, init: 0.5 }, { id: 'flan_fb', name: 'Feedback', min: 0, max: 90, target: 50, unit: '%', step: 1, init: 50 }] },
        'limiter': { name: 'Limiter', parameters: [{ id: 'lim_thresh', name: 'Threshold', min: -20, max: 0, target: -3, unit: 'dB', step: 0.5, init: 0 }] }
    };

    const questions = [
        {
            type: 'build-chain',
            scenario: 'vocal-recording',
            question: 'You are mixing a dynamic lead vocal that has some low-end rumble from the mic stand. Build a professional signal chain to clean it up (cut 80Hz), level it out (Threshold -15dB), and put it in a subtle virtual space (Reverb Mix 15%).',
            hint: 'Think: Do you want a compressor reacting to rumble, or compressing the echoes of a room?',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['eq', 'compressor', 'reverb'],
            targetParameters: [
                { effectId: 'eq', id: 'eq_cutoff', value: 80, tolerance: 40 },
                { effectId: 'compressor', id: 'comp_thresh', value: -15, tolerance: 10 },
                { effectId: 'reverb', id: 'rev_mix', value: 15, tolerance: 20 }
            ],
            explanation: 'Vocal chain: EQ first to fix frequency issues, Compressor to even out levels, then Reverb for space. Never compress before fixing EQ problems, and reverb always comes last!'
        },
        {
            type: 'build-chain',
            scenario: 'compressor-vocal',
            question: 'You need to lightly control the dynamics of a lead vocal without squashing the life out of it. Add a compressor to the rack and dial it in for gentle vocal smoothing.',
            hint: 'Gentle vocal compression usually needs a low Ratio (like 3:1 or 4:1) and a Threshold that only catches the peaks (-15dB to -20dB).',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['compressor'],
            targetParameters: [
                { effectId: 'compressor', id: 'comp_thresh', value: -18, tolerance: 12 },
                { effectId: 'compressor', id: 'comp_ratio', value: 4, tolerance: 6 },
                { effectId: 'compressor', id: 'comp_attack', value: 10, tolerance: 40 },
                { effectId: 'compressor', id: 'comp_release', value: 100, tolerance: 200 }
            ],
            explanation: '3:1 to 4:1 ratio provides gentle compression. A threshold around -18dB usually catches the vocal peaks nicely. 10ms attack lets transients through, and 100ms release recovers properly.'
        },
        {
            type: 'build-chain',
            scenario: 'guitar-distortion',
            question: 'Set up an electric guitar pedalboard. Squeeze it with 80% drive distortion, carve out the low mud with a 150Hz EQ cut, add a fast 0.2s slapback delay (20% feedback), and a 2.0s reverb.',
            hint: 'Create the core tone first (Distortion), shape it with EQ, then add space (Delay, Reverb) at the very end.',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['distortion', 'eq', 'delay', 'reverb'],
            targetParameters: [
                { effectId: 'distortion', id: 'dist_drive', value: 80, tolerance: 30 },
                { effectId: 'eq', id: 'eq_cutoff', value: 150, tolerance: 80 },
                { effectId: 'delay', id: 'del_time', value: 0.2, tolerance: 0.2 },
                { effectId: 'delay', id: 'del_fb', value: 20, tolerance: 20 },
                { effectId: 'reverb', id: 'rev_time', value: 2.0, tolerance: 1.0 }
            ],
            explanation: 'Distortion first to create the tone, EQ to shape it, then time-based effects (Delay, Reverb) at the end. Reversing this order sounds muddy!'
        },
        {
            type: 'build-chain',
            scenario: 'eq-remove-mud',
            question: 'A vocal recording sounds very "muddy" and "boxy" because the singer was standing too close to the microphone. Place an EQ in the rack and use it to hollow out the mud.',
            hint: 'Mud lives in the lower-mids. A highpass filter cutoff set around 200-300Hz helps clear this up.',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['eq'],
            targetParameters: [
                { effectId: 'eq', id: 'eq_cutoff', value: 250, tolerance: 100 }
            ],
            explanation: 'Cutting out the low frequencies below 250Hz removes muddiness and boxiness in vocals caused by the proximity effect.'
        },
        {
            type: 'build-chain',
            scenario: 'mastering-chain',
            question: 'Master a mix bus. It needs slight tonal balancing (40Hz cut), glue (Compressor Threshold -10dB, Ratio 2:1), and a hard ceiling (Limiter Threshold -1dB) to stop clipping.',
            hint: 'A Limiter is a brick wall. Never put anything after a brick wall.',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['eq', 'compressor', 'limiter'],
            targetParameters: [
                { effectId: 'eq', id: 'eq_cutoff', value: 40, tolerance: 40 },
                { effectId: 'compressor', id: 'comp_thresh', value: -10, tolerance: 10 },
                { effectId: 'compressor', id: 'comp_ratio', value: 2, tolerance: 3 },
                { effectId: 'limiter', id: 'lim_thresh', value: -1, tolerance: 3 }
            ],
            explanation: 'Mastering chain: EQ for tonal balance, gentle Compressor for glue, Limiter last to catch peaks and maximize loudness. Limiter ALWAYS comes last in mastering!'
        },
        {
            type: 'build-chain',
            scenario: 'identify-vocal',
            question: 'An amateur shows you their terrible vocal chain: Reverb → Compressor → EQ. Build this awful chain in the rack using a massive 3.0s Reverb and a heavy 8:1 Compressor to hear why it fails.',
            hint: 'Place the Reverb first, then the Compressor, then the EQ.',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['reverb', 'compressor', 'eq'],
            targetParameters: [
                { effectId: 'reverb', id: 'rev_time', value: 3.0, tolerance: 2.0 },
                { effectId: 'compressor', id: 'comp_ratio', value: 8, tolerance: 12 }
            ],
            explanation: 'This chain is backwards! Compressing reverb tails ruins their natural fade, and EQing last means you spent CPU processing mud. Listen to how pumping and muddy the audio sounds!'
        },
        {
            type: 'build-chain',
            scenario: 'reverb-vocal',
            question: 'Set up a subtle Reverb for a vocal. It needs to sound like they are in a small studio room, not a massive cathedral, and it shouldn\'t wash out the dry signal.',
            hint: 'Add the Reverb plugin. Keep the decay time under 2 seconds, and the mix very low.',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['reverb'],
            targetParameters: [
                { effectId: 'reverb', id: 'rev_time', value: 1.5, tolerance: 2.0 },
                { effectId: 'reverb', id: 'rev_mix', value: 20, tolerance: 30 }
            ],
            explanation: 'Subtle vocal reverb: medium decay (1-2s), and low mix (15-25%). This adds depth without making vocals sound distant.'
        },
        {
            type: 'build-chain',
            scenario: 'identify-vocal',
            question: 'It is standard industry practice to place your EQ *before* your Compressor in a vocal chain. Build this 2-plugin chain, cutting out 150Hz of mud and setting a gentle 3:1 compression.',
            hint: 'Put the EQ first, then the Compressor. This lets you EQ out the mud *before* it hits the compressor.',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['eq', 'compressor'],
            targetParameters: [
                { effectId: 'eq', id: 'eq_cutoff', value: 150, tolerance: 100 },
                { effectId: 'compressor', id: 'comp_ratio', value: 3, tolerance: 3 }
            ],
            explanation: 'EQ before compression means you fix frequency problems first. If you compress first, you\'ll make those problems louder and harder to fix.'
        },
        {
            type: 'build-chain',
            scenario: 'parallel-compression',
            question: 'You want to add extreme punch to a Drum Bus. Create a "Parallel Compression" chain by aggressively crushing the dynamics, then adding an EQ to shape the tone.',
            hint: 'Put the Compressor first, then the EQ.',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['compressor', 'eq'],
            targetParameters: [
                { effectId: 'compressor', id: 'comp_ratio', value: 10, tolerance: 15 },
                { effectId: 'compressor', id: 'comp_thresh', value: -30, tolerance: 20 }
            ],
            explanation: 'In parallel compression you crush the signal with a heavy compressor (high ratio, low threshold) and EQ it before blending it back with the dry signal.'
        },
        {
            type: 'build-chain',
            scenario: 'identify-guitar',
            question: 'When placing time-based effects on a distorted guitar lead, where should they go in the signal chain? Build a chain with Distortion (Drive 60%), Flanger (Rate 1.0Hz), and a Delay.',
            hint: 'What happens if you run a beautiful, fading echo directly into a fuzz pedal? It sounds terrible! Fuzz first, time last.',
            availableEffects: ['eq', 'compressor', 'gate', 'reverb', 'delay', 'chorus', 'distortion', 'flanger', 'limiter'],
            correctOrder: ['distortion', 'flanger', 'delay'],
            targetParameters: [
                { effectId: 'distortion', id: 'dist_drive', value: 60, tolerance: 40 },
                { effectId: 'flanger', id: 'flan_rate', value: 1.0, tolerance: 1.0 }
            ],
            explanation: 'Time-based effects (reverb, delay, flanger) come LAST! If you compress or distort after an echo, you\'ll destroy the fading tail.'
        }
    ];

    // Save quiz result
    const userContext = useUser();
    const saveQuizResult = userContext ? userContext.saveQuizResult : null;
    const resultsSavedRef = useRef(false);
    const activeNodesRef = useRef([]);

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
        // Initialize first question
        const firstQ = questions[0];
        if (firstQ.type === 'build-chain') {
            setEffectsOrder([]);
            setParameters({});
        }
    }, []);

    // Add a helper for reverb impulse response generation
    const createReverbImpulse = (ctx, duration = 2.0, decay = 2.0) => {
        const sampleRate = ctx.sampleRate;
        const length = sampleRate * duration;
        const impulse = ctx.createBuffer(2, length, sampleRate);
        const left = impulse.getChannelData(0);
        const right = impulse.getChannelData(1);

        for (let i = 0; i < length; i++) {
            const n = i === 0 ? 1 : 0;
            left[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
            right[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
        }
        return impulse;
    };

    const stopAudio = () => {
        if (sourceRef.current) {
            try {
                sourceRef.current.stop();
                sourceRef.current.disconnect();
            } catch (e) {
                // Ignore if already stopped
            }
            sourceRef.current = null;
        }

        // Stop any active LFOs
        activeNodesRef.current.forEach(node => {
            try {
                if (node.stop) node.stop();
                node.disconnect();
            } catch (e) { }
        });
        activeNodesRef.current = [];

        setIsPlaying(false);
    };

    const playWithEffects = async () => {
        // Debounce/restart logic
        stopAudio();

        setIsPlaying(true);

        try {
            // Lazy-init AudioContext so it only starts on user gesture
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            } else if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }
            const ctx = audioContextRef.current;

            const q = questions[currentQuestion];
            let fileSuffix = 'mastering';
            if (q.scenario.includes('vocal') || q.scenario.includes('eq-remove')) fileSuffix = 'vocal';
            else if (q.scenario.includes('guitar')) fileSuffix = 'guitar';
            else if (q.scenario.includes('parallel') || q.scenario.includes('drum')) fileSuffix = 'drums';

            // 1. Fetch and decode the pure audio file (with caching)
            const mp3Path = `/Audio/Audio_effect_quiz_audio/${fileSuffix}-dry.mp3`;
            let audioBuffer = bufferCacheRef.current[mp3Path];

            if (!audioBuffer) {
                const response = await fetch(mp3Path);
                const arrayBuffer = await response.arrayBuffer();
                audioBuffer = await ctx.decodeAudioData(arrayBuffer);
                bufferCacheRef.current[mp3Path] = audioBuffer;
            }

            // 2. Set up the source
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            sourceRef.current = source; // Store for stopAudio()

            // 3. Build the dynamic node graph based on UI state
            const nodes = [];

            // Helpful local function to generate a specific node based on an ID
            const createNodeForEffect = (effectId) => {
                let node;

                // Helper to get current parameter value or fallback to init
                const getParam = (paramId) => {
                    if (parameters[paramId] !== undefined) return parameters[paramId];
                    if (!effectConfigs[effectId]) return 0;
                    const cfg = effectConfigs[effectId].parameters.find(p => p.id === paramId);
                    return cfg ? cfg.init : 0;
                };

                if (effectId === 'eq') {
                    node = ctx.createBiquadFilter();
                    node.type = 'highpass';
                    node.frequency.value = getParam('eq_cutoff') || 120;
                } else if (effectId === 'compressor') {
                    node = ctx.createDynamicsCompressor();
                    node.threshold.value = getParam('comp_thresh') || -18;
                    node.ratio.value = getParam('comp_ratio') || 4;
                    // Web Audio API expects Attack and Release in Seconds, our UI uses milliseconds.
                    node.attack.value = (getParam('comp_attack') !== undefined ? getParam('comp_attack') : 10) / 1000;
                    node.release.value = (getParam('comp_release') !== undefined ? getParam('comp_release') : 100) / 1000;
                } else if (effectId === 'limiter') {
                    node = ctx.createDynamicsCompressor();
                    node.threshold.value = getParam('lim_thresh') || 0;
                    node.ratio.value = 20; // Hard limiting ratio
                    node.attack.value = 0.001; // 1ms attack
                    node.release.value = 0.1; // 100ms release
                } else if (effectId === 'gate') {
                    // Simulated Noise Gate using a WaveShaper curve for downward expansion
                    node = ctx.createWaveShaper();
                    const thresholdDB = getParam('gate_thresh') || -40;
                    const thresholdLinear = Math.pow(10, thresholdDB / 20);
                    const curve = new Float32Array(256);
                    for (let i = 0; i < 256; i++) {
                        const x = (i * 2 / 255) - 1;
                        curve[i] = Math.abs(x) < thresholdLinear ? 0 : x;
                    }
                    node.curve = curve;
                } else if (effectId === 'reverb') {
                    node = ctx.createConvolver();
                    const time = getParam('rev_time') || 1.5;
                    node.buffer = createReverbImpulse(ctx, time, 2.0);
                    const wet = ctx.createGain();
                    const dry = ctx.createGain();
                    const mix = getParam('rev_mix') || 20;
                    wet.gain.value = mix / 100;
                    dry.gain.value = 1 - (mix / 100);
                    return { isMixer: true, effect: node, wet, dry };
                } else if (effectId === 'delay') {
                    node = ctx.createDelay(2.0);
                    node.delayTime.value = getParam('del_time') || 0.3;
                    const feedback = ctx.createGain();
                    feedback.gain.value = (getParam('del_fb') || 30) / 100;
                    node.connect(feedback);
                    feedback.connect(node);

                    const wet = ctx.createGain();
                    const dry = ctx.createGain();
                    wet.gain.value = 0.5; // Fixed 50% wet signal path
                    dry.gain.value = 1.0;
                    return { ...{ isMixer: true, effect: node, wet, dry, fb: feedback } };
                } else if (effectId === 'chorus' || effectId === 'flanger') {
                    const isFlanger = effectId === 'flanger';
                    node = ctx.createDelay(0.1);
                    node.delayTime.value = isFlanger ? 0.005 : 0.02; // Flanger=5ms base, Chorus=20ms base

                    const lfo = ctx.createOscillator();
                    lfo.type = 'sine';
                    lfo.frequency.value = getParam(isFlanger ? 'flan_rate' : 'cho_rate') || 1.0;

                    const lfoGain = ctx.createGain();
                    lfoGain.gain.value = isFlanger ? 0.002 : 0.005;

                    lfo.connect(lfoGain);
                    lfoGain.connect(node.delayTime);
                    lfo.start();
                    activeNodesRef.current.push(lfo);

                    const wet = ctx.createGain();
                    const dry = ctx.createGain();

                    if (isFlanger) {
                        const feedback = ctx.createGain();
                        feedback.gain.value = (getParam('flan_fb') || 50) / 100;
                        node.connect(feedback);
                        feedback.connect(node);
                        wet.gain.value = 0.5;
                    } else {
                        wet.gain.value = (getParam('cho_depth') || 50) / 100;
                    }

                    return { ...{ isMixer: true, effect: node, wet, dry, lfo } };
                } else if (effectId === 'distortion') {
                    node = ctx.createWaveShaper();
                    const drive = getParam('dist_drive') || 50;
                    const amount = drive * 10;
                    const curve = new Float32Array(ctx.sampleRate);
                    const step = 2 / ctx.sampleRate;
                    for (let i = 0; i < ctx.sampleRate; i++) {
                        const x = i * step - 1;
                        curve[i] = amount === 0 ? x : (3 + amount) * x * 20 * (Math.PI / 180) / (Math.PI + amount * Math.abs(x));
                    }
                    node.curve = curve;
                    node.oversample = '4x';
                } else {
                    node = ctx.createGain(); // Fallback null-op
                }
                return node;
            };

            // Order-Chain logic: string the nodes together in the exact visual order
            if (q.type === 'order-chain' || q.type === 'build-chain') {
                effectsOrder.forEach(effect => {
                    nodes.push(createNodeForEffect(effect.id));
                });
            }
            // Knob-Parameter logic: create the single effect and map the live React state to it
            else if (q.type === 'set-parameters') {
                if (q.effect.name.toLowerCase().includes('compressor')) {
                    const comp = ctx.createDynamicsCompressor();
                    comp.threshold.value = parameters['threshold'] || -18;
                    comp.ratio.value = parameters['ratio'] || 4;
                    comp.attack.value = (parameters['attack'] || 10) / 1000; // ms to s
                    comp.release.value = (parameters['release'] || 100) / 1000; // ms to s
                    nodes.push(comp);
                } else if (q.effect.name.toLowerCase().includes('eq')) {
                    const eq = ctx.createBiquadFilter();
                    eq.type = 'peaking';
                    eq.frequency.value = parameters['frequency'] || 250;
                    eq.Q.value = parameters['q'] || 1;
                    eq.gain.value = parameters['gain'] || 0;
                    nodes.push(eq);
                } else if (q.effect.name.toLowerCase().includes('reverb')) {
                    const rev = ctx.createConvolver();
                    const time = parameters['time'] || 1.5;
                    rev.buffer = createReverbImpulse(ctx, time, 2.0);

                    // Simple wet/dry mix setup
                    const wet = ctx.createGain();
                    const dry = ctx.createGain();
                    const mix = parameters['mix'] || 20;
                    wet.gain.value = mix / 100;
                    dry.gain.value = 1 - (mix / 100);

                    // Wrap in an array wrapper for custom routing below
                    nodes.push({ isMixer: true, effect: rev, wet, dry });
                }
            }

            // 4. Wire everything together!
            let currentNode = source;

            nodes.forEach(nodeObj => {
                if (nodeObj.isMixer) {
                    // Custom parallel routing (e.g. for Reverb wet/dry)
                    currentNode.connect(nodeObj.dry);
                    currentNode.connect(nodeObj.effect);
                    nodeObj.effect.connect(nodeObj.wet);

                    // Merge back into a master bus
                    const bus = ctx.createGain();
                    nodeObj.dry.connect(bus);
                    nodeObj.wet.connect(bus);
                    currentNode = bus;
                } else {
                    // Standard serial routing
                    currentNode.connect(nodeObj);
                    currentNode = nodeObj;
                }
            });

            // Master volume to prevent clipping
            const masterVol = ctx.createGain();
            masterVol.gain.value = 0.7;
            currentNode.connect(masterVol);
            masterVol.connect(ctx.destination);

            // 5. Play!
            source.start(0);

            source.onended = () => {
                if (sourceRef.current === source) {
                    setIsPlaying(false);
                    sourceRef.current = null;
                }
            };

        } catch (error) {
            console.error("Audio engine failed:", error);
            alert("Error playing audio: " + (error.message || error));
            setIsPlaying(false);
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

    const addEffectToRack = (effectId) => {
        const q = questions[currentQuestion];
        const maxPlugins = q.correctOrder ? q.correctOrder.length : 3;
        if (showFeedback || effectsOrder.length >= maxPlugins) return;
        const cfg = effectConfigs[effectId];
        setEffectsOrder([...effectsOrder, { id: effectId, name: cfg.name }]);
        setParameters(prev => {
            const newParams = { ...prev };
            cfg.parameters.forEach(p => {
                newParams[p.id] = p.init;
            });
            return newParams;
        });
        if (isPlaying) {
            playWithEffects();
        }
    };

    const removeEffectFromRack = (index) => {
        if (showFeedback) return;
        const newOrder = [...effectsOrder];
        newOrder.splice(index, 1);
        setEffectsOrder(newOrder);
        if (isPlaying) {
            playWithEffects();
        }
    };

    const moveEffectUp = (index) => {
        if (showFeedback || index === 0) return;
        const newOrder = [...effectsOrder];
        const temp = newOrder[index - 1];
        newOrder[index - 1] = newOrder[index];
        newOrder[index] = temp;
        setEffectsOrder(newOrder);
        if (isPlaying) playWithEffects();
    };

    const moveEffectDown = (index) => {
        if (showFeedback || index === effectsOrder.length - 1) return;
        const newOrder = [...effectsOrder];
        const temp = newOrder[index + 1];
        newOrder[index + 1] = newOrder[index];
        newOrder[index] = temp;
        setEffectsOrder(newOrder);
        if (isPlaying) playWithEffects();
    };

    const updateParameter = (paramId, value) => {
        if (showFeedback) return;
        setParameters(prev => ({ ...prev, [paramId]: value }));
        // If they tweak a knob while audio is playing, instantly recalculate the graph
        if (isPlaying) {
            playWithEffects();
        }
    };

    const checkAnswer = async () => {
        const q = questions[currentQuestion];
        let isCorrect = false;

        if (q.type === 'order-chain' || q.type === 'build-chain') {
            const currentIds = effectsOrder.map(e => e.id);
            isCorrect = JSON.stringify(currentIds) === JSON.stringify(q.correctOrder);

            // For build-chain, also verify specific knob settings if targetParameters exist in the question
            if (isCorrect && q.type === 'build-chain' && q.targetParameters) {
                isCorrect = q.targetParameters.every(target => {
                    const userValue = parameters[target.id];
                    // If they haven't touched it (undefined) but the target allows the init value
                    const actualValue = userValue !== undefined ? userValue : (effectConfigs[target.effectId]?.parameters.find(p => p.id === target.id)?.init || 0);
                    return Math.abs(actualValue - target.value) <= target.tolerance;
                });
            }
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

        stopAudio();
        await getAIExplanation(q, isCorrect);
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
        stopAudio();
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setShowHint(false);
            setAiExplanation('');

            const nextQ = questions[currentQuestion + 1];
            if (nextQ.type === 'build-chain') {
                setEffectsOrder([]);
                setParameters({});
            }
        } else {
            setQuizComplete(true);
        }
    };

    const resetQuiz = () => {
        stopAudio();
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setQuizComplete(false);
        setShowHint(false);
        setAiExplanation('');
        setEffectsOrder([]);
        setParameters({});
        resultsSavedRef.current = false;

        const firstQ = questions[0];
        if (firstQ.type === 'build-chain') {
            setEffectsOrder([]);
            setParameters({});
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
                    <div className="fx-grip-icon" style={{ display: 'flex', flexDirection: 'column', marginRight: '1rem', opacity: showFeedback ? 0.2 : 0.8 }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); moveEffectUp(index); }}
                            disabled={index === 0 || showFeedback}
                            className={`hover:text-white transition-colors ${index === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                            title="Move Up"
                        >
                            <ChevronUp size={20} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); moveEffectDown(index); }}
                            disabled={index === effectsOrder.length - 1 || showFeedback}
                            className={`hover:text-white transition-colors ${index === effectsOrder.length - 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                            title="Move Down"
                        >
                            <ChevronDown size={20} />
                        </button>
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

        // Local render method for build-chain rack effect
        const renderRackEffect = (effectItem, index) => {
            const isCorrectOrder = showFeedback && selectedAnswer && q.correctOrder && q.correctOrder[index] === effectItem.id;
            const cfg = effectConfigs[effectItem.id];
            const isDragSource = draggedEffect && draggedEffect.effect.id === effectItem.id;

            return (
                <div
                    key={`${effectItem.id}-${index}`}
                    className={`bg-slate-800/80 border border-slate-700/50 rounded-xl mb-2 relative transition-all duration-200 ${isDragSource ? 'opacity-50 scale-[0.98]' : 'hover:border-slate-500/50'} ${showFeedback ? 'pointer-events-none' : ''}`}
                    style={{ borderColor: showFeedback && !selectedAnswer ? 'rgba(239, 68, 68, 0.5)' : '' }}
                    draggable={!showFeedback}
                    onDragStart={() => handleDragStart(effectItem, index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                >
                    {/* Header with name and controls */}
                    <div className="flex justify-between items-center px-4 py-2 border-b border-black/20 bg-black/10 rounded-t-xl">
                        <div className="flex items-center gap-3">
                            <div className="cursor-grab hover:text-amber-500 transition-colors opacity-60 hover:opacity-100 flex items-center justify-center py-1">
                                <GripVertical size={16} />
                            </div>
                            <span className="font-bold text-md text-white/90">{cfg.name}</span>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); removeEffectFromRack(index); }}
                            className="text-red-400/70 hover:text-red-400 hover:bg-red-400/10 p-1 rounded-md transition-colors"
                            title="Remove Plugin"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Knobs */}
                    <div className="fx-knob-grid px-3 py-3">
                        {cfg.parameters.map(param => {
                            const val = parameters[param.id] !== undefined ? parameters[param.id] : param.init;
                            let isCorrectParam = null;
                            let paramTarget = null;
                            let isTracked = false;

                            if (showFeedback && q.targetParameters) {
                                const targetDef = q.targetParameters.find(t => t.id === param.id && t.effectId === effectItem.id);
                                if (targetDef) {
                                    isTracked = true;
                                    paramTarget = targetDef.value;
                                    isCorrectParam = Math.abs(val - targetDef.value) <= targetDef.tolerance;
                                }
                            }

                            return (
                                <div key={param.id}>
                                    <KnobComponent
                                        label={param.name}
                                        value={val}
                                        min={param.min}
                                        max={param.max}
                                        step={param.step}
                                        unit={param.unit}
                                        onChange={(v) => updateParameter(param.id, v)}
                                        showFeedback={showFeedback && isTracked}
                                        isCorrect={isCorrectParam}
                                        targetValue={paramTarget}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        };

        if (q.type === 'build-chain') {
            const isCorrect = showFeedback && selectedAnswer;
            const maxPlugins = q.correctOrder ? q.correctOrder.length : 3;

            return (
                <div className="space-y-6 w-full">
                    {/* Available Plugins Pool */}
                    <div className="bg-slate-800/50 border border-white/10 rounded-xl p-4">
                        <p className="text-sm text-slate-400 uppercase font-bold mb-3 flex items-center gap-2">
                            <PlusCircle size={14} /> Available Plugins
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {q.availableEffects.map(effectId => {
                                const cfg = effectConfigs[effectId];
                                const isAdded = effectsOrder.some(e => e.id === effectId);
                                return (
                                    <button
                                        key={`pool-${effectId}`}
                                        onClick={() => addEffectToRack(effectId)}
                                        disabled={showFeedback || effectsOrder.length >= maxPlugins || isAdded}
                                        className={`px-4 py-2.5 rounded-lg border text-sm font-semibold tracking-wide shadow-sm transition-all duration-200
                                            ${isAdded
                                                ? 'bg-slate-900 border-indigo-500/20 text-indigo-400/50 shadow-inner'
                                                : 'bg-gradient-to-b from-slate-700 to-slate-800 border-slate-600 text-slate-200 hover:from-slate-600 hover:to-slate-700 hover:border-slate-500 hover:shadow-md hover:-translate-y-0.5'}
                                            disabled:opacity-40
                                        `}
                                    >
                                        {cfg.name}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-amber-500/70 mt-3 flex items-center gap-1">
                            <Info size={12} /> Add up to {maxPlugins} plugin{maxPlugins !== 1 ? 's' : ''} to the rack below.
                        </p>
                    </div>

                    {/* Active Rack */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 min-h-[300px]">
                        <p className="text-sm text-slate-400 uppercase font-bold mb-4 flex justify-between items-center">
                            <span><Settings size={14} className="inline mr-2" /> Active Signal Chain (Max {maxPlugins})</span>
                            <span className="text-amber-500 bg-amber-500/10 px-2 py-1 rounded">{effectsOrder.length} / {maxPlugins}</span>
                        </p>

                        {effectsOrder.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-slate-500 border-2 border-dashed border-slate-700 rounded-lg">
                                <PlusCircle size={32} className="mb-2 opacity-50" />
                                <p>Click plugins above to add them to your chain</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {effectsOrder.map((effect, index) => renderRackEffect(effect, index))}
                            </div>
                        )}
                    </div>

                    {!showFeedback && (
                        <div className="flex gap-2 mt-6">
                            <button
                                onClick={playWithEffects}
                                disabled={isPlaying}
                                className="px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 border border-slate-600 disabled:opacity-50 flex items-center gap-2 text-sm"
                            >
                                {isPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
                                {isPlaying ? 'Playing...' : 'Test AUDIO'}
                            </button>
                            <button
                                onClick={checkAnswer}
                                disabled={effectsOrder.length !== maxPlugins}
                                className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Answer
                            </button>
                        </div>
                    )}

                    {showFeedback && !isCorrect && (
                        <div className="fx-correct-order-box mt-4 space-y-4">
                            <div>
                                <strong>Correct Sequence:</strong><br />
                                {q.correctOrder.map(id => effectConfigs[id].name).join(' → ')}
                            </div>
                            <button
                                onClick={() => {
                                    setShowFeedback(false);
                                    setSelectedAnswer(null);
                                    setAiExplanation('');
                                }}
                                className="px-4 py-2 bg-amber-500/20 text-amber-500 border border-amber-500/50 rounded-lg hover:bg-amber-500/30 transition-colors flex items-center gap-2 text-sm"
                            >
                                <RotateCcw size={14} /> Retry Question
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        return null;
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
                        <span className="fx-question-text">{questions[currentQuestion].question}</span>
                    </div>

                    <div className="question-text">

                        {questions[currentQuestion].hint && (
                            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-3 mb-6 flex flex-col gap-2">
                                <div className="flex gap-3 items-center">
                                    <Lightbulb className="text-amber-500 flex-shrink-0" size={20} />
                                    <div className="flex-grow">
                                        <p className="text-xs font-bold text-amber-500 uppercase">Hint</p>
                                    </div>
                                    {!showHint && (
                                        <button
                                            onClick={() => setShowHint(true)}
                                            className="fx-hint-toggle-btn"
                                        >
                                            Reveal Hint
                                        </button>
                                    )}
                                </div>
                                {showHint && (
                                    <p className="text-sm text-amber-200 mt-2 ml-[32px]">{questions[currentQuestion].hint}</p>
                                )}
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
                            {/* Legacy retry button removed */}
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
