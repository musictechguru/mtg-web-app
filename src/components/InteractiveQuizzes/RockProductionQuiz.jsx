import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';
import './RockProductionQuiz.css';

const quizData = [
    {
        category: "Drums: Gated Reverb",
        scenario: "You have a dry snare drum that needs to sound absolutely massive like a 1980s Phil Collins track. You want a huge reverb tail that cuts off abruptly before the next drum hit.",
        options: [
            { text: "Spring Reverb", correct: false },
            { text: "Gated Reverb", correct: true },
            { text: "Reverse Delay", correct: false },
            { text: "Parallel Distortion", correct: false }
        ],
        explanation: "Gated reverb involves sending the snare to a heavy, dense reverb, and then placing a noise gate on the reverb return, set to close quickly. This creates a massive boom that abruptly stops."
    },
    {
        category: "Drums: Parallel Compression",
        scenario: "Your rock drum mix sounds thin. You want to add explosive energy and thickness to the room mics and shells without losing the initial 'crack' and transient punch of the close mics.",
        options: [
            { text: "New York Compression (Parallel)", correct: true },
            { text: "Limiting on the Master Bus", correct: false },
            { text: "Subtractive EQing", correct: false },
            { text: "Transient Shaping", correct: false }
        ],
        explanation: "Parallel compression involves duplicating the drums (or sending them to an aux), heavily compressing the copy to squash transients and bring up room sound, and blending it underneath the punchy dry track."
    },
    {
        category: "Guitars: Double-Tracking",
        scenario: "You have recorded a heavy rhythm guitar part, but it sounds small and sits dead-center in the mix, clashing with the lead vocal and snare drum.",
        options: [
            { text: "Add a stereo chorus plugin", correct: false },
            { text: "Pan it wildly with auto-pan", correct: false },
            { text: "Record a second, distinct take and hard pan L/R", correct: true },
            { text: "Use mid/side EQ to cut the center", correct: false }
        ],
        explanation: "Double-tracking means actually playing the part twice. Panning one take hard left and the other hard right creates a massive wall of sound and leaves the center wide open for the vocal and snare."
    },
    {
        category: "Guitars: Amp Simulation & Reamping",
        scenario: "You recorded a clean DI (Direct Injection) guitar signal to ensure perfect editing, but now you need it to sound like a cranked Marshall stack.",
        options: [
            { text: "Use an Amp Simulator plugin or Reamp box", correct: true },
            { text: "Boost the high frequencies with EQ", correct: false },
            { text: "Run it through a vocal exciter", correct: false },
            { text: "Add a short slapback echo", correct: false }
        ],
        explanation: "Reamping is the process of taking a clean recorded signal and sending it back out of the interface into a real amplifier (or processing it with an Amp Sim plugin) to capture the tone of the amp."
    },
    {
        category: "Bass & Guitar: Frequency Masking",
        scenario: "Your bass guitar and the low-end of your rhythm guitars are both occupying the 100Hz-200Hz range, causing a muddy, rumbling mess where neither instrument is defined.",
        options: [
            { text: "Add more bass to both instruments", correct: false },
            { text: "Use EQ masking principles (carve space for one in the other)", correct: true },
            { text: "Compress them both together heavily", correct: false },
            { text: "Add distortion to the bass", correct: false }
        ],
        explanation: "Frequency masking occurs when two instruments compete for the same frequencies. A common solution is to cut the clashing frequency in the instrument where it's less important, allowing the other to shine."
    },
    {
        category: "Vocals: Slapback Delay",
        scenario: "You are aiming for a vintage, 1950s rockabilly or John Lennon style vocal sound. It needs a thick, almost doubled feel, but actual double-tracking sounds too modern and tight.",
        options: [
            { text: "Long hall reverb", correct: false },
            { text: "High-ratio limiting", correct: false },
            { text: "Slapback Delay (75-150ms, 0 feedback)", correct: true },
            { text: "Flanger effect", correct: false }
        ],
        explanation: "A slapback delay is a single, quick echo (usually around 100ms) with zero feedback. It creates a classic thicker vocal sound reminiscent of tape-delay systems used in early rock and roll studios."
    },
    {
        category: "Vocals: Dynamic Consistency",
        scenario: "Your lead rock vocalist ranges from a whisper in the verses to full-blown screaming in the choruses. You need it to sit locked in place on top of the guitars at all times.",
        options: [
            { text: "Vocal riding (automation) feeding a compressor", correct: true },
            { text: "A single fast Limiter", correct: false },
            { text: "De-essing only the loud parts", correct: false },
            { text: "Adding massive amounts of distortion", correct: false }
        ],
        explanation: "Instead of relying on a single compressor to work incredibly hard, riding the vocal fader (automating the volume manually) BEFORE it hits a compressor ensures a consistent level enters the compressor, yielding a much more natural, locked-in sound."
    },
    {
        category: "Drums: Phase Alignment",
        scenario: "When you listen to the snare drum close mic by itself, it sounds thick. But the moment you unmute the stereo overhead mics, the snare drum suddenly sounds thin, hollow, and weak.",
        options: [
            { text: "The overheads need more low-end EQ", correct: false },
            { text: "The snare mic needs more compression", correct: false },
            { text: "There is a Phase cancellation issue between the mics", correct: true },
            { text: "The drummer hit the snare softer", correct: false }
        ],
        explanation: "Because sound takes time to travel through the air, it reaches the close mic before the overheads. This delay causes phase cancellation, dropping out frequencies. Flipping the polarity (phase) or manually nudging the audio regions usually fixes this."
    },
    {
        category: "Drums: Sample Augmentation",
        scenario: " The session drummer played great, but the recorded snare drum sounds like a cardboard box. No amount of EQ or compression is fixing the fundamental tone, but you don't want to lose the drummer's exact groove.",
        options: [
            { text: "Drum Sample Triggering / Blending", correct: true },
            { text: "Reverb sidechaining", correct: false },
            { text: "Delete the track and program MIDI", correct: false },
            { text: "Add more analog distortion", correct: false }
        ],
        explanation: "Drum replacement tools (like Slate Trigger) detect the transients of the original bad recording and trigger a high-quality pre-recorded drum sample perfectly in time, allowing you to blend a great tone with a real human performance."
    },
    {
        category: "Mix Bus: The Glue",
        scenario: "Your entire rock mix sounds good, but all the instruments feel a bit disconnected from each other. The chorus gets loud, but it doesn't feel like a cohesive 'record' yet.",
        options: [
            { text: "Stereo Widening on every track", correct: false },
            { text: "Adding a brickwall limiter to +6dB", correct: false },
            { text: "SSL-style Mix Bus Compression (The Glue)", correct: true },
            { text: "Multiband Expansion", correct: false }
        ],
        explanation: "Mix bus compression (often using an SSL bus comp style VCA compressor) applying gentle gain reduction (1-3dB) across the entire mix 'glues' the elements together, making the snare and vocals react as a single unified piece of music."
    }
];

const RockProductionQuiz = ({ onExit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioContextRef = useRef(null);
    const activeSources = useRef([]);


    const [isLoadingAudio, setIsLoadingAudio] = useState(true);
    const audioBuffers = useRef({});

    // Initialize AudioContext
    useEffect(() => {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtor();

        const loadAudio = async () => {
            const ctx = audioContextRef.current;
            const files = {
                bass: '/Audio/rock_raw/bass_di.mp3',
                drums: '/Audio/rock_raw/drum_loop_clean.mp3',
                guitar_riff: '/Audio/rock_raw/guitar_di_riff.mp3',
                guitar_solo: '/Audio/rock_raw/guitar_di_solo.mp3',
                snare: '/Audio/rock_raw/single_snare_dry.mp3',
                vocal: '/Audio/rock_raw/vocal_dry_verse.mp3'
            };

            const buffers = {};
            for (const [key, path] of Object.entries(files)) {
                try {
                    const response = await fetch(path);
                    const arrayBuffer = await response.arrayBuffer();
                    const decodedData = await ctx.decodeAudioData(arrayBuffer);
                    buffers[key] = decodedData;
                } catch (e) {
                    console.error('Failed to load audio:', path, e);
                }
            }
            audioBuffers.current = buffers;
            setIsLoadingAudio(false);
        };

        loadAudio();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const stopAudio = () => {
        activeSources.current.forEach(source => {
            try { source.stop(); } catch (e) { }
        });
        activeSources.current = [];
        setIsPlaying(false);
    };

    const playAudioExample = (isProcessed = true) => {
        if (isPlaying || isLoadingAudio) {
            stopAudio();
            return;
        }

        const ctx = audioContextRef.current;
        if (!ctx) return;

        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        setIsPlaying(true);
        const now = ctx.currentTime;
        let playDuration = 6.0; // Default duration slightly longer for real audio

        const addSource = (src) => activeSources.current.push(src);

        // --- Master Out ---
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.5;
        masterGain.connect(ctx.destination);

        const playBuffer = (bufferKey, time, dest, loop = false, playbackRate = 1.0) => {
            if (!audioBuffers.current[bufferKey]) return null;
            const src = ctx.createBufferSource();
            src.buffer = audioBuffers.current[bufferKey];
            src.loop = loop;
            src.playbackRate.value = playbackRate;
            src.connect(dest);
            src.start(time);
            addSource(src);
            return src;
        };

        // Shared Amp Sim Function
        const createAmpSim = (dest, distAmount = 20) => {
            const dist = ctx.createWaveShaper();
            const curve = new Float32Array(400);
            for (let i = 0; i < 400; i++) {
                const x = i * 2 / 400 - 1;
                curve[i] = Math.tanh(x * distAmount);
            }
            dist.curve = curve;

            const cabFilter = ctx.createBiquadFilter();
            cabFilter.type = 'lowpass';
            cabFilter.frequency.value = 4000;
            const cabFilter2 = ctx.createBiquadFilter();
            cabFilter2.type = 'highpass';
            cabFilter2.frequency.value = 100;

            cabFilter2.connect(dist);
            dist.connect(cabFilter);
            cabFilter.connect(dest);
            return cabFilter2; // Input node
        };

        const createSynthSnare = (time, dest, tone = 'bad') => {
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, time);
            osc.frequency.exponentialRampToValueAtTime(100, time + 0.1);

            const bodyGain = ctx.createGain();
            bodyGain.gain.setValueAtTime(0, time);
            bodyGain.gain.linearRampToValueAtTime(0.8, time + 0.01);
            bodyGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

            osc.connect(bodyGain);
            bodyGain.connect(dest);
            osc.start(time);
            osc.stop(time + 0.5);
            addSource(osc);
        };

        switch (currentQuestionIndex) {
            case 0: // Gated Reverb
                {
                    playDuration = 2.5;
                    const snareGain = ctx.createGain();
                    snareGain.connect(masterGain);

                    playBuffer('snare', now, snareGain);

                    if (isProcessed) {
                        // Reverb emulation using a real ConvolverNode and generated impulse response
                        const createReverbImpulse = (context, duration = 3.0, decay = 2.0) => {
                            const sampleRate = context.sampleRate;
                            const length = sampleRate * duration;
                            const impulse = context.createBuffer(2, length, sampleRate);
                            const left = impulse.getChannelData(0);
                            const right = impulse.getChannelData(1);

                            for (let i = 0; i < length; i++) {
                                left[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
                                right[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
                            }
                            return impulse;
                        };

                        const convolver = ctx.createConvolver();
                        convolver.buffer = createReverbImpulse(ctx, 2.0, 2.0);

                        const revEnv = ctx.createGain();
                        revEnv.gain.setValueAtTime(0, now);
                        revEnv.gain.linearRampToValueAtTime(0.8, now + 0.01);
                        // The "Gate" snapping shut abruptly
                        revEnv.gain.setValueAtTime(0.8, now + 0.35);
                        if (isProcessed) {
                            convolver.connect(revEnv);
                            revEnv.connect(masterGain);
                            playBuffer('snare', now, convolver);
                        }
                    }
                }
                break;

            case 1: // Parallel Compression (Drums)
                {
                    playDuration = 4;
                    const cleanKitGain = ctx.createGain();
                    cleanKitGain.gain.value = 0.8;
                    cleanKitGain.connect(masterGain);

                    playBuffer('drums', now, cleanKitGain);

                    if (isProcessed) {
                        const smashComp = ctx.createDynamicsCompressor();
                        smashComp.threshold.value = -35;
                        smashComp.ratio.value = 15;
                        smashComp.attack.value = 0.005;
                        smashComp.release.value = 0.3;
                        const smashGain = ctx.createGain();
                        smashGain.gain.value = 1.8;
                        smashComp.connect(smashGain);
                        smashGain.connect(masterGain);
                        playBuffer('drums', now, smashComp);
                    }
                }
                break;

            case 2: // Double-Tracking Guitars
                {
                    playDuration = 5;

                    if (!isProcessed) {
                        const monoGain = ctx.createGain();
                        monoGain.connect(masterGain);
                        playBuffer('guitar_riff', now, monoGain);
                    } else {
                        const pannerL = ctx.createStereoPanner();
                        pannerL.pan.value = -1;
                        const ampL = createAmpSim(pannerL, 12);
                        pannerL.connect(masterGain);

                        const pannerR = ctx.createStereoPanner();
                        pannerR.pan.value = 1;
                        const ampR = createAmpSim(pannerR, 15); // Slightly different distortion
                        pannerR.connect(masterGain);

                        // Left take
                        playBuffer('guitar_riff', now, ampL);

                        // Right take: simulate a different take by slightly delaying and detuning the playback rate
                        playBuffer('guitar_riff', now + 0.015, ampR, false, 0.995);
                    }
                }
                break;

            case 3: // Amp Simulation
                {
                    playDuration = 5;
                    const diGain = ctx.createGain();
                    diGain.gain.value = 1.5;
                    diGain.connect(masterGain);

                    if (!isProcessed) {
                        playBuffer('guitar_solo', now, diGain);
                    } else {
                        // Play clean DI for 2.5 seconds
                        const src1 = playBuffer('guitar_solo', now, diGain);
                        if (src1) {
                            src1.stop(now + 2.5);
                        }

                        // Then blast the amp simulation for the rest
                        const ampOut = ctx.createGain();
                        ampOut.gain.value = 1.0;
                        ampOut.connect(masterGain);
                        const ampSimInput = createAmpSim(ampOut, 20);

                        playBuffer('guitar_solo', now + 2.5, ampSimInput);
                    }
                }
                break;

            case 4: // Bass/Guitar Masking Fix
                {
                    playDuration = 6;
                    const mixGain = ctx.createGain();
                    mixGain.gain.value = 0.8;
                    mixGain.connect(masterGain);

                    if (isProcessed) {
                        // Bass with EQ carving
                        const bassEq = ctx.createBiquadFilter();
                        bassEq.type = 'peaking';
                        bassEq.frequency.setValueAtTime(200, now);
                        bassEq.gain.setValueAtTime(0, now);
                        bassEq.gain.setValueAtTime(-8, now + 3.0); // Scoops the mud out halfway through
                        bassEq.connect(mixGain);
                        playBuffer('bass', now, bassEq);

                        // Guitar with complementary EQ
                        const guiEq = ctx.createBiquadFilter();
                        guiEq.type = 'peaking';
                        guiEq.frequency.setValueAtTime(200, now);
                        guiEq.gain.setValueAtTime(0, now);
                        guiEq.gain.setValueAtTime(4, now + 3.0); // Fills the space
                        const guiAmp = createAmpSim(guiEq, 8); // Light crunch
                        guiEq.connect(mixGain);
                        playBuffer('guitar_riff', now, guiAmp);
                    } else {
                        playBuffer('bass', now, mixGain);
                        playBuffer('guitar_riff', now, mixGain);
                    }
                }
                break;

            case 5: // Slapback Vocal
                {
                    playDuration = 5;
                    const vocalDry = ctx.createGain();
                    vocalDry.connect(masterGain);

                    const vocalSrc = playBuffer('vocal', now, vocalDry);

                    if (isProcessed && vocalSrc) {
                        const delay = ctx.createDelay();
                        delay.delayTime.value = 0.13; // 130ms slap
                        const delayLevel = ctx.createGain();
                        delayLevel.gain.value = 0.6; // No feedback = single slap

                        delay.connect(delayLevel);
                        delayLevel.connect(masterGain);

                        vocalSrc.connect(delay); // Send to slapback
                    }
                }
                break;

            case 6: // Vocal Riding
                {
                    playDuration = 5;
                    const riderGain = ctx.createGain();
                    riderGain.connect(masterGain);

                    if (isProcessed) {
                        // Assuming vocal file has natural dynamics, we exaggerate them then "ride" them
                        riderGain.gain.setValueAtTime(1.0, now);
                        riderGain.gain.linearRampToValueAtTime(0.3, now + 2.5); // Bring down the loud part to keep it even
                    } else {
                        riderGain.gain.setValueAtTime(1.0, now);
                    }

                    playBuffer('vocal', now, riderGain);
                }
                break;

            case 7: // Phase Alignment
                {
                    playDuration = 5;
                    const closeMic = ctx.createGain();
                    closeMic.connect(masterGain);

                    const ohMic = ctx.createGain();
                    const ohDelay = ctx.createDelay();
                    ohDelay.delayTime.value = 0.005; // 5ms gap representing air distance

                    const phaseInvert = ctx.createGain();
                    phaseInvert.gain.value = -1; // Initially out-of-phase

                    ohMic.connect(ohDelay);
                    ohDelay.connect(phaseInvert);
                    phaseInvert.connect(masterGain);

                    // Snare hits repeatedly
                    for (let i = 0; i < 4; i++) {
                        const hitTime = now + (i * 1.0);
                        playBuffer('snare', hitTime, closeMic);
                        playBuffer('snare', hitTime, ohMic);
                    }

                    if (isProcessed) {
                        // Flip the phase alignment automatically at 2 seconds
                        phaseInvert.gain.setValueAtTime(-1, now);
                        phaseInvert.gain.setValueAtTime(1, now + 2.0);
                    } else {
                        // Keep out of phase
                        phaseInvert.gain.setValueAtTime(-1, now);
                    }
                }
                break;

            case 8: // Sample Augmentation
                {
                    playDuration = 5;
                    const badSnareMix = ctx.createGain();
                    badSnareMix.connect(masterGain);

                    const goodSnareMix = ctx.createGain();
                    goodSnareMix.gain.value = 0.8;
                    goodSnareMix.connect(masterGain);

                    for (let i = 0; i < 4; i++) {
                        const hitTime = now + (i * 1.0);
                        // The cardboard box snare (always playing)
                        createSynthSnare(hitTime, badSnareMix, 'bad');

                        // Drum replacement triggered (only on hits 3 and 4)
                        if (i >= 2) {
                            playBuffer('snare', hitTime + 0.02, goodSnareMix); // The high-quality sample blended in
                        }
                    }
                }
                break;

            case 9: // The Glue
                {
                    playDuration = 6;
                    const busComp = ctx.createDynamicsCompressor();
                    busComp.threshold.value = -25;
                    busComp.ratio.value = 4;
                    busComp.attack.value = 0.01;
                    busComp.release.value = 0.15;

                    const makeup = ctx.createGain();
                    makeup.gain.value = 1.5;

                    busComp.connect(makeup);
                    makeup.connect(masterGain);

                    playBuffer('drums', now, busComp);
                    playBuffer('bass', now, busComp);

                    const guiAmp = createAmpSim(busComp, 15);
                    playBuffer('guitar_riff', now, guiAmp);
                }
                break;

            default:
                playDuration = 1;
                break;
        }

        setTimeout(() => {
            setIsPlaying(false);
            activeSources.current = [];
        }, playDuration * 1000);
    };


    // Shuffle options when a new question loads
    const [currentOptions, setCurrentOptions] = useState([]);

    useEffect(() => {
        if (currentQuestionIndex < quizData.length) {
            const options = [...quizData[currentQuestionIndex].options];
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            setCurrentOptions(options);
            setSelectedOptionIndex(null);
            setIsAnswered(false);
        }
    }, [currentQuestionIndex]);

    const handleOptionClick = (index) => {
        if (isAnswered) return;

        setSelectedOptionIndex(index);
        setIsAnswered(true);

        if (currentOptions[index].correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        stopAudio();
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinished(false);
    };

    // Stop audio on unmount or question change
    useEffect(() => {
        return () => stopAudio();
    }, []);

    useEffect(() => {
        stopAudio();
    }, [currentQuestionIndex]);

    if (quizFinished) {
        const percentage = Math.round((score / quizData.length) * 100);
        let message = "";
        if (percentage === 100) message = "Perfect! You are a rock production legend.";
        else if (percentage >= 80) message = "Excellent! You know your way around a mixing console.";
        else if (percentage >= 60) message = "Good job. Keep practicing these analog techniques.";
        else message = "Review these rock techniques and try again to sharpen your skills.";

        return (
            <div className="rock-quiz-container">
                <div className="rock-header">
                    <h1>Rock Production Masterclass</h1>
                    <button className="rock-exit-btn" onClick={onExit}>Exit Session</button>
                </div>
                <div className="rock-content" style={{ justifyContent: 'center' }}>
                    <div className="rock-completion-screen">
                        <h2>Session Complete</h2>
                        <div className="rock-completion-score">{score} / {quizData.length}</div>
                        <p className="rock-completion-message">{message}</p>
                        <div style={{ marginTop: '2rem' }}>
                            <button className="rock-restart-btn" onClick={handleRestart}>Try Again</button>
                            <button className="rock-finish-btn" onClick={onExit}>Return to Menu</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = quizData[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;

    return (
        <div className="rock-quiz-container">
            <div className="rock-header">
                <h1>Rock Production Masterclass</h1>
                <button className="rock-exit-btn" onClick={() => { stopAudio(); onExit(); }}>End Session</button>
            </div>

            <div className="rock-content">
                <div className="rock-progress-bar-container">
                    <div className="rock-progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>

                <div className="rock-category-badge">
                    {currentQ.category}
                </div>

                <div className="rock-scenario-card">
                    <div className="rock-scenario-title">Studio Scenario:</div>
                    <div className="rock-scenario-text">
                        "{currentQ.scenario}"
                    </div>

                    <div className="rock-audio-widget">
                        <button
                            className={`rock-play-btn ${isPlaying ? 'playing' : ''} ${isLoadingAudio ? 'loading' : ''}`}
                            onClick={() => playAudioExample(false)}  // The main button now plays the DRY stem initially
                            disabled={isLoadingAudio}
                        >
                            {isLoadingAudio ? (
                                <>
                                    <Square size={20} className="fill-current" style={{ opacity: 0.5 }} />
                                    <span>Loading Audio...</span>
                                </>
                            ) : isPlaying ? (
                                <>
                                    <Square size={20} className="fill-current" />
                                    <span>Stop Studio Feed</span>
                                </>
                            ) : (
                                <>
                                    <Play size={20} className="fill-current" />
                                    <span>Play Studio Feed (Dry)</span>
                                </>
                            )}
                        </button>
                        {isPlaying && <div className="rock-audio-waves">
                            <span className="rock-wave-bar"></span>
                            <span className="rock-wave-bar"></span>
                            <span className="rock-wave-bar"></span>
                            <span className="rock-wave-bar"></span>
                            <span className="rock-wave-bar"></span>
                        </div>}
                    </div>

                    <div className="rock-options-grid">
                        {currentOptions.map((opt, index) => {
                            let btnClass = "rock-option-btn";
                            if (isAnswered) {
                                if (index === selectedOptionIndex) {
                                    btnClass += opt.correct ? " selected-correct" : " selected-wrong";
                                } else if (opt.correct) {
                                    btnClass += " reveal-correct";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    className={btnClass}
                                    onClick={() => handleOptionClick(index)}
                                    disabled={isAnswered}
                                >
                                    {opt.text}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <div className={`rock-feedback-panel ${currentOptions[selectedOptionIndex].correct ? 'correct' : 'wrong'}`}>
                            <div className="rock-feedback-title">
                                {currentOptions[selectedOptionIndex].correct ? 'Perfect Mix' : 'Incorrect Technique'}
                            </div>
                            <div className="rock-feedback-text">
                                {currentQ.explanation}
                            </div>

                            <div className="rock-audio-widget" style={{ marginBottom: '1rem', marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.8 }}>Hear the processed technique in action:</div>
                                <button
                                    className={`rock-play-btn ${isPlaying ? 'playing' : ''} ${isLoadingAudio ? 'loading' : ''}`}
                                    onClick={playAudioExample}
                                    disabled={isLoadingAudio}
                                >
                                    {isLoadingAudio ? (
                                        <>
                                            <Square size={20} className="fill-current" style={{ opacity: 0.5 }} />
                                            <span>Loading Audio...</span>
                                        </>
                                    ) : isPlaying ? (
                                        <>
                                            <Square size={20} className="fill-current" />
                                            <span>Stop Processed Example</span>
                                        </>
                                    ) : (
                                        <>
                                            <Play size={20} className="fill-current" />
                                            <span>Play Processed Example</span>
                                        </>
                                    )}
                                </button>
                                {isPlaying && <div className="rock-audio-waves" style={{ marginTop: '0.5rem' }}>
                                    <span className="rock-wave-bar"></span>
                                    <span className="rock-wave-bar"></span>
                                    <span className="rock-wave-bar"></span>
                                </div>}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="rock-next-btn" onClick={handleNextQuestion}>
                                    {currentQuestionIndex < quizData.length - 1 ? 'Next Scenario \u2192' : 'View Results'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RockProductionQuiz;
