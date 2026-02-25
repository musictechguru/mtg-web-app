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

    // Initialize AudioContext
    useEffect(() => {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtor();
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

    const playAudioExample = () => {
        if (isPlaying) {
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
        let playDuration = 4; // Default duration

        const addSource = (src) => activeSources.current.push(src);

        // --- Master Out ---
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.5;
        masterGain.connect(ctx.destination);

        // Custom noise buffer for snare modeling
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < ctx.sampleRate * 2; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const createKick = (time, dest) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(120, time);
            osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);

            const click = ctx.createOscillator();
            click.type = 'square';
            click.frequency.setValueAtTime(2000, time);
            click.frequency.exponentialRampToValueAtTime(100, time + 0.05);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(1, time + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

            const clickGain = ctx.createGain();
            clickGain.gain.setValueAtTime(0, time);
            clickGain.gain.linearRampToValueAtTime(0.2, time + 0.005);
            clickGain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

            osc.connect(gain);
            click.connect(clickGain);
            gain.connect(dest);
            clickGain.connect(dest);

            osc.start(time);
            click.start(time);
            osc.stop(time + 0.5);
            click.stop(time + 0.5);
            addSource(osc);
            addSource(click);
        };

        const createSnare = (time, dest, tone = 'good') => {
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, time);
            osc.frequency.exponentialRampToValueAtTime(100, time + 0.1);

            const bodyGain = ctx.createGain();
            bodyGain.gain.setValueAtTime(0, time);
            bodyGain.gain.linearRampToValueAtTime(1, time + 0.01);
            bodyGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

            osc.connect(bodyGain);
            bodyGain.connect(dest);

            if (tone === 'good' || tone === 'snappy') {
                const noise = ctx.createBufferSource();
                noise.buffer = noiseBuffer;

                const noiseFilter = ctx.createBiquadFilter();
                noiseFilter.type = 'highpass';
                noiseFilter.frequency.value = (tone === 'snappy') ? 2000 : 800;

                const noiseGain = ctx.createGain();
                noiseGain.gain.setValueAtTime(0, time);
                noiseGain.gain.linearRampToValueAtTime(tone === 'snappy' ? 0.8 : 0.5, time + 0.01);
                noiseGain.gain.exponentialRampToValueAtTime(0.01, time + (tone === 'snappy' ? 0.1 : 0.25));

                noise.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                noiseGain.connect(dest);

                noise.start(time);
                noise.stop(time + 0.5);
                addSource(noise);
            }

            osc.start(time);
            osc.stop(time + 0.5);
            addSource(osc);
        };

        const createPowerChord = (rootFreq, time, duration, dest, distAmount = 20) => {
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.6, time + 0.02);
            gain.gain.setValueAtTime(0.6, time + duration - 0.05);
            gain.gain.linearRampToValueAtTime(0, time + duration);

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

            gain.connect(cabFilter2);
            cabFilter2.connect(dist);
            dist.connect(cabFilter);
            cabFilter.connect(dest);

            [rootFreq, rootFreq * 1.498, rootFreq * 2].forEach(freq => {
                const osc = ctx.createOscillator();
                osc.type = 'sawtooth';
                osc.frequency.value = freq;
                osc.detune.value = (Math.random() - 0.5) * 15;
                osc.connect(gain);
                osc.start(time);
                osc.stop(time + duration + 0.1);
                addSource(osc);
            });
        };

        const createVocal = (freq, time, duration, dest, amp = 1.0) => {
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, time);

            const vib = ctx.createOscillator();
            vib.frequency.value = 5;
            const vibGain = ctx.createGain();
            vibGain.gain.value = 15;
            vib.connect(vibGain);
            vibGain.connect(osc.frequency);
            vib.start(time);
            vib.stop(time + duration);
            addSource(vib);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(amp * 0.4, time + 0.1);
            gain.gain.setValueAtTime(amp * 0.4, time + duration - 0.1);
            gain.gain.linearRampToValueAtTime(0, time + duration);

            const f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 700; f1.Q.value = 3;
            const f2 = ctx.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 1100; f2.Q.value = 3;

            const outGain = ctx.createGain();
            outGain.connect(dest);

            osc.connect(gain);
            gain.connect(f1);
            gain.connect(f2);
            f1.connect(outGain);
            f2.connect(outGain);

            osc.start(time);
            osc.stop(time + duration + 0.1);
            addSource(osc);
        };

        switch (currentQuestionIndex) {
            case 0: // Gated Reverb
                {
                    playDuration = 3;
                    const drySnareGain = ctx.createGain();
                    drySnareGain.connect(masterGain);
                    createSnare(now + 0.5, drySnareGain, 'good');

                    const revNoise = ctx.createBufferSource();
                    revNoise.buffer = noiseBuffer;
                    const revFilter = ctx.createBiquadFilter();
                    revFilter.type = 'lowpass';
                    revFilter.frequency.value = 2500;
                    const revGain = ctx.createGain();

                    revGain.gain.setValueAtTime(0, now);
                    revGain.gain.setValueAtTime(0, now + 0.5);
                    revGain.gain.linearRampToValueAtTime(0.5, now + 0.51);
                    revGain.gain.setValueAtTime(0.5, now + 0.8);
                    revGain.gain.linearRampToValueAtTime(0, now + 0.85);

                    revNoise.connect(revFilter);
                    revFilter.connect(revGain);
                    revGain.connect(masterGain);
                    revNoise.start(now);
                    revNoise.stop(now + 2);
                    addSource(revNoise);
                }
                break;

            case 1: // Parallel Compression (Drums)
                {
                    playDuration = 3;
                    const cleanKitGain = ctx.createGain();
                    cleanKitGain.gain.value = 0.8;
                    cleanKitGain.connect(masterGain);

                    const smashComp = ctx.createDynamicsCompressor();
                    smashComp.threshold.value = -40;
                    smashComp.ratio.value = 20;
                    smashComp.attack.value = 0.002;
                    smashComp.release.value = 0.4;
                    const smashGain = ctx.createGain();
                    smashGain.gain.value = 2.0;
                    smashComp.connect(smashGain);
                    smashGain.connect(masterGain);

                    for (let i = 0; i < 4; i++) {
                        const hitTime = now + (i * 0.5);
                        if (i % 2 === 0) {
                            createKick(hitTime, cleanKitGain);
                            createKick(hitTime, smashComp);
                        } else {
                            createSnare(hitTime, cleanKitGain, 'good');
                            createSnare(hitTime, smashComp, 'good');
                        }
                    }
                }
                break;

            case 2: // Double-Tracking Guitars
                {
                    playDuration = 4;
                    const riffPattern = [{ t: 0.5, f: 82.41 }, { t: 0.9, f: 82.41 }, { t: 1.3, f: 110.00 }, { t: 1.7, f: 98.00 }, { t: 2.1, f: 82.41 }];

                    const createTake = (pan, timeOffset, distAmt) => {
                        const panner = ctx.createStereoPanner();
                        panner.pan.value = pan;
                        panner.connect(masterGain);

                        riffPattern.forEach(note => {
                            createPowerChord(note.f, now + note.t + timeOffset, 0.35, panner, distAmt);
                        });
                    };

                    createTake(-1, 0, 10);
                    createTake(1, 0.02, 12);
                }
                break;

            case 3: // Amp Simulation
                {
                    playDuration = 4;
                    const root = 110;
                    const diGain = ctx.createGain();
                    diGain.gain.value = 1.2;
                    diGain.connect(masterGain);

                    const diOsc = ctx.createOscillator();
                    diOsc.type = 'triangle';
                    diOsc.frequency.value = root;
                    diOsc.connect(diGain);
                    diOsc.start(now + 0.5);
                    diOsc.stop(now + 1.5);
                    addSource(diOsc);

                    const ampGain = ctx.createGain();
                    ampGain.gain.value = 0.8;
                    ampGain.connect(masterGain);
                    createPowerChord(root, now + 2.0, 1.5, ampGain, 15);
                }
                break;

            case 4: // Bass/Guitar Masking Fix
                {
                    playDuration = 5;
                    const mudGain = ctx.createGain();
                    mudGain.gain.value = 0.8;
                    mudGain.connect(masterGain);

                    const pattern = [0, 0.5, 1, 1.5, 2.5, 3.0, 3.5, 4.0];

                    const bassFilter = ctx.createBiquadFilter();
                    bassFilter.type = 'peaking';
                    bassFilter.frequency.setValueAtTime(150, now);
                    bassFilter.Q.value = 1.0;
                    bassFilter.gain.setValueAtTime(0, now);
                    bassFilter.gain.setValueAtTime(-12, now + 2.4);
                    bassFilter.connect(mudGain);

                    const guiFilter = ctx.createBiquadFilter();
                    guiFilter.type = 'bandpass';
                    guiFilter.frequency.setValueAtTime(180, now);
                    guiFilter.frequency.linearRampToValueAtTime(350, now + 2.5);
                    guiFilter.Q.setValueAtTime(1.5, now);
                    guiFilter.Q.linearRampToValueAtTime(0.8, now + 2.5);
                    guiFilter.connect(mudGain);

                    pattern.forEach(t => {
                        const bOsc = ctx.createOscillator();
                        bOsc.type = 'sawtooth';
                        bOsc.frequency.value = 73.42;
                        const bEnv = ctx.createGain();
                        bEnv.gain.setValueAtTime(0, now + t);
                        bEnv.gain.linearRampToValueAtTime(0.8, now + t + 0.05);
                        bEnv.gain.exponentialRampToValueAtTime(0.01, now + t + 0.4);
                        bOsc.connect(bEnv); bEnv.connect(bassFilter);
                        bOsc.start(now + t); bOsc.stop(now + t + 0.5); addSource(bOsc);

                        createPowerChord(146.83, now + t, 0.35, guiFilter, 8);
                    });
                }
                break;

            case 5: // Slapback Vocal
                {
                    playDuration = 3;
                    const dryVocal = ctx.createGain();

                    const delay = ctx.createDelay();
                    delay.delayTime.value = 0.12;
                    const delayLevel = ctx.createGain();
                    delayLevel.gain.value = 0.6;

                    dryVocal.connect(masterGain);
                    dryVocal.connect(delay);
                    delay.connect(delayLevel);
                    delayLevel.connect(masterGain);

                    createVocal(300, now + 0.5, 0.4, dryVocal, 1.0);
                    createVocal(250, now + 0.9, 0.3, dryVocal, 0.8);
                }
                break;

            case 6: // Vocal Riding
                {
                    playDuration = 5;
                    const faderGain = ctx.createGain();
                    faderGain.connect(masterGain);

                    createVocal(200, now + 0.5, 1.5, faderGain, 0.1);
                    faderGain.gain.setValueAtTime(6.0, now);

                    createVocal(400, now + 2.5, 1.5, faderGain, 1.0);
                    faderGain.gain.setValueAtTime(0.6, now + 2.4);
                }
                break;

            case 7: // Phase Alignment
                {
                    playDuration = 4;
                    const closeMic = ctx.createGain();
                    closeMic.connect(masterGain);

                    const ohMic = ctx.createGain();
                    const ohDelay = ctx.createDelay();
                    ohDelay.delayTime.value = 0.003;
                    const phaseInvert = ctx.createGain();
                    phaseInvert.gain.value = -1; // Initially out-of-phase

                    ohMic.connect(ohDelay);
                    ohDelay.connect(phaseInvert);
                    phaseInvert.connect(masterGain);

                    createSnare(now + 0.5, closeMic, 'good');
                    createSnare(now + 0.5, ohMic, 'good');

                    phaseInvert.gain.setValueAtTime(-1, now);
                    phaseInvert.gain.setValueAtTime(1, now + 1.8);

                    createSnare(now + 2.0, closeMic, 'good');
                    createSnare(now + 2.0, ohMic, 'good');
                }
                break;

            case 8: // Sample Augmentation
                {
                    playDuration = 4;
                    const badSnareDest = ctx.createGain();
                    badSnareDest.connect(masterGain);
                    createSnare(now + 0.5, badSnareDest, 'bad');

                    createSnare(now + 2.0, badSnareDest, 'bad');
                    const goodSnareDest = ctx.createGain();
                    goodSnareDest.connect(masterGain);
                    createSnare(now + 2.0, goodSnareDest, 'snappy');
                }
                break;

            case 9: // The Glue
                {
                    playDuration = 4;
                    const busComp = ctx.createDynamicsCompressor();
                    busComp.threshold.value = -35;
                    busComp.ratio.value = 5;
                    busComp.attack.value = 0.02;
                    busComp.release.value = 0.15;

                    const makeup = ctx.createGain();
                    makeup.gain.value = 1.8;

                    busComp.connect(makeup);
                    makeup.connect(masterGain);

                    for (let i = 0; i < 8; i++) {
                        const time = now + 0.5 + (i * 0.3);
                        if (i % 4 === 0) createKick(time, busComp);
                        else if (i % 2 === 0) createSnare(time, busComp, 'good');

                        createPowerChord(110, time, 0.15, busComp, 8);
                    }
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
                            className={`rock-play-btn ${isPlaying ? 'playing' : ''}`}
                            onClick={playAudioExample}
                        >
                            {isPlaying ? <Square size={20} className="fill-current" /> : <Play size={20} className="fill-current" />}
                            <span>{isPlaying ? 'Stop Studio Feed' : 'Play Studio Feed'}</span>
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
