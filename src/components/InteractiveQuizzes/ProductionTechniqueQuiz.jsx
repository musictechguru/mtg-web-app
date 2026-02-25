import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';
import './ProductionTechniqueQuiz.css';

const quizData = [
    {
        category: "Sidechain & Dynamics",
        scenario: "You have a massive trance synth chord progression, but it's overpowering the kick drum and making the mix muddy. You need the synth to rhythmically duck out of the way every time the kick hits.",
        options: [
            { text: "'Pumping' Sidechain Compression", correct: true },
            { text: "Multiband Expansion", correct: false },
            { text: "Parallel Compression", correct: false },
            { text: "Sidechain to Ghost Kick", correct: false }
        ],
        explanation: "Standard 'pumping' sidechain compression uses the kick drum to trigger a compressor on the synth, ducking its volume rhythmically to make space for the kick."
    },
    {
        category: "Sidechain & Dynamics",
        scenario: "You have a complex vocal layered over a dense bassline. You only want the sub-frequencies of the bassline to duck when the kick hits, leaving the mid-range of the bass unaffected.",
        options: [
            { text: "Standard Sidechain Compression", correct: false },
            { text: "Multiband Sidechain", correct: true },
            { text: "Limiting", correct: false },
            { text: "Sidechain to Ghost Kick", correct: false }
        ],
        explanation: "Multiband sidechain allows you to target specific frequency ranges (like the low-end) to duck, leaving other frequencies (like the mid-range texture) untouched for a cleaner mix."
    },
    {
        category: "Build-Up Techniques",
        scenario: "You want a dramatic build-up that creates tension before the drop. The synth chords start muffled and gradually become brighter and more aggressive as the drop approaches.",
        options: [
            { text: "Filter Automation (Low-pass opening)", correct: true },
            { text: "White noise riser sweeps", correct: false },
            { text: "Pitched snare/tom rolls", correct: false },
            { text: "Layered impact transition", correct: false }
        ],
        explanation: "Automating a low-pass filter's cutoff frequency from low to high over time is a classic way to build tension, slowly revealing the high frequencies before the climax."
    },
    {
        category: "Build-Up Techniques",
        scenario: "To add a rush of energy rushing into the drop, you need a rushing, airy sound that rises in pitch and intensity alongside the drum roll.",
        options: [
            { text: "Filter Automation", correct: false },
            { text: "White noise riser sweeps", correct: true },
            { text: "Layered impact transition", correct: false },
            { text: "Pitched snare/tom rolls", correct: false }
        ],
        explanation: "White noise sweeps or risers use filtered noise that sweeps upwards, creating a psychological rush of energy that perfectly complements rhythmic build-ups."
    },
    {
        category: "Lead Synth Sounds",
        scenario: "You are producing a Big Room House track and need a massive, wide, anthemic lead sound made by layering multiple detuned sawtooth waves.",
        options: [
            { text: "Pluck synthesis", correct: false },
            { text: "Screech/laser lead", correct: false },
            { text: "Supersaw lead stack", correct: true },
            { text: "Wobble bass modulation", correct: false }
        ],
        explanation: "The 'Supersaw' consists of multiple sawtooth waves detuned against each other, creating a naturally wide, chorus-like, and aggressive lead sound staple to Trance and Big Room."
    },
    {
        category: "Bass Design",
        scenario: "Your dubstep track needs a bass sound that rhythmic opens and closes, creating a 'wub-wub' rhythm syncing to the track tempo.",
        options: [
            { text: "Clean sub bass layering", correct: false },
            { text: "Mid-range harmonic distortion", correct: false },
            { text: "Wobble/LFO modulated bass filter", correct: true },
            { text: "Bass split processing", correct: false }
        ],
        explanation: "Linking an LFO (Low Frequency Oscillator) to the cutoff of a low-pass filter creates the classic 'wobble' bass effect, moving rhythmically based on the LFO rate."
    },
    {
        category: "Bass Design",
        scenario: "Your synth bass sounds muddy when you add chorus and distortion to it, because the sub frequencies are getting messy and losing mono compatibility.",
        options: [
            { text: "Wobble/LFO modulated bass filter", correct: false },
            { text: "Clean sub bass layering", correct: false },
            { text: "Bass split processing", correct: true },
            { text: "Reverb throw", correct: false }
        ],
        explanation: "Bass split processing involves separating the sub frequencies (kept clean & mono) from the mid frequencies (which can be widened, distorted, and chorused) for a powerful, defined bass."
    },
    {
        category: "Vocal Manipulation",
        scenario: "You want the lead vocal to suddenly echo massively on just the last word of the chorus, without the whole vocal phrase getting washed out in reverb.",
        options: [
            { text: "Formant-shifted vocal processing", correct: false },
            { text: "Chopped/sliced vocal edits", correct: false },
            { text: "Reverb/Delay throw", correct: true },
            { text: "Pitched-up sample hooks", correct: false }
        ],
        explanation: "A 'throw' is an automation technique where you quickly send only a specific word or phrase to an auxiliary delay or reverb track, creating an isolated echo tail."
    },
    {
        category: "Drum Processing",
        scenario: "Your 808 kick drum has plenty of deep sub, but it absolutely disappears on phone speakers. You need it to punch through the mix.",
        options: [
            { text: "Layered kick drum (sub + punch + click)", correct: true },
            { text: "Percussion bus compression glue", correct: false },
            { text: "Clap stacking with reverb", correct: false },
            { text: "Multiband sidechain", correct: false }
        ],
        explanation: "Layering involves combining a deep sub kick with a mid-range punch kick and a high-frequency 'click' top kick, ensuring the hit is heard across all speaker systems."
    },
    {
        category: "Transition Effects",
        scenario: "You are transitioning from the breakdown into the build-up. You need a fast, sucking sound that leads perfectly into the downbeat.",
        options: [
            { text: "Downlifter/riser one-shots", correct: false },
            { text: "Reverse cymbal/crash impact", correct: true },
            { text: "Beat-synced delay feedback", correct: false },
            { text: "Automated filter sweeps", correct: false }
        ],
        explanation: "Reversing a crash cymbal sample creates a natural crescendo of white noise that abruptly ends exactly on the downbeat, pulling the listener flawlessly into the next section."
    }
];

const ProductionTechniqueQuiz = ({ onExit }) => {
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

        // Helper to add active sources
        const addSource = (src) => activeSources.current.push(src);

        // --- Master Out ---
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.5;
        masterGain.connect(ctx.destination);

        // Audio Generation Logic based on current question
        switch (currentQuestionIndex) {
            case 0: // Pumping Sidechain Compression
                {
                    playDuration = 4;
                    // Synth chord
                    const chordGain = ctx.createGain();
                    chordGain.connect(masterGain);

                    // Simple Sidechain Envelope (Ducking on quarter notes)
                    for (let i = 0; i < 8; i++) {
                        const hitTime = now + (i * 0.5);
                        chordGain.gain.setValueAtTime(0.1, hitTime);
                        chordGain.gain.setTargetAtTime(0.8, hitTime + 0.1, 0.1);

                        // Kick
                        const kick = ctx.createOscillator();
                        const kickGain = ctx.createGain();
                        kick.connect(kickGain);
                        kickGain.connect(masterGain);

                        kick.frequency.setValueAtTime(150, hitTime);
                        kick.frequency.exponentialRampToValueAtTime(0.01, hitTime + 0.1);

                        kickGain.gain.setValueAtTime(1, hitTime);
                        kickGain.gain.exponentialRampToValueAtTime(0.01, hitTime + 0.1);

                        kick.start(hitTime);
                        kick.stop(hitTime + 0.2);
                        addSource(kick);
                    }

                    [261.63, 329.63, 392.00].forEach(freq => { // C Major
                        const osc = ctx.createOscillator();
                        osc.type = 'sawtooth';
                        osc.frequency.value = freq;
                        osc.connect(chordGain);
                        osc.start(now);
                        osc.stop(now + playDuration);
                        addSource(osc);
                    });
                }
                break;

            case 1: // Multiband Sidechain
                {
                    playDuration = 4;
                    // Mid Bass (No ducking)
                    const midBassGain = ctx.createGain();
                    midBassGain.gain.value = 0.4;
                    midBassGain.connect(masterGain);
                    const midOsc = ctx.createOscillator();
                    midOsc.type = 'sawtooth';
                    midOsc.frequency.value = 110; // A2
                    midOsc.connect(midBassGain);
                    midOsc.start(now);
                    midOsc.stop(now + playDuration);
                    addSource(midOsc);

                    // Sub Bass (Ducking)
                    const subBassGain = ctx.createGain();
                    subBassGain.connect(masterGain);
                    const subOsc = ctx.createOscillator();
                    subOsc.type = 'sine';
                    subOsc.frequency.value = 55; // A1
                    subOsc.connect(subBassGain);
                    subOsc.start(now);
                    subOsc.stop(now + playDuration);
                    addSource(subOsc);

                    for (let i = 0; i < 8; i++) {
                        const hitTime = now + (i * 0.5);
                        subBassGain.gain.setValueAtTime(0.0, hitTime);
                        subBassGain.gain.setTargetAtTime(1.0, hitTime + 0.1, 0.1); // Ducks!

                        // Kick
                        const kick = ctx.createOscillator();
                        const kickGain = ctx.createGain();
                        kick.connect(kickGain);
                        kickGain.connect(masterGain);
                        kick.frequency.setValueAtTime(150, hitTime);
                        kick.frequency.exponentialRampToValueAtTime(0.01, hitTime + 0.1);
                        kickGain.gain.setValueAtTime(1, hitTime);
                        kickGain.gain.exponentialRampToValueAtTime(0.01, hitTime + 0.1);
                        kick.start(hitTime);
                        kick.stop(hitTime + 0.2);
                        addSource(kick);
                    }
                }
                break;

            case 2: // Filter Automation (Low-pass opening)
                {
                    playDuration = 5;
                    const chordGain = ctx.createGain();
                    const filter = ctx.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.frequency.setValueAtTime(200, now);
                    filter.frequency.exponentialRampToValueAtTime(5000, now + 4);
                    filter.connect(masterGain);
                    chordGain.connect(filter);

                    [440, 554.37, 659.25].forEach(freq => { // A Major
                        const osc = ctx.createOscillator();
                        osc.type = 'sawtooth';
                        osc.frequency.value = freq;
                        osc.connect(chordGain);
                        osc.start(now);
                        osc.stop(now + playDuration);
                        addSource(osc);
                    });
                }
                break;

            case 3: // White noise riser sweeps
                {
                    playDuration = 4;
                    const bufferSize = ctx.sampleRate * playDuration;
                    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                    const data = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        data[i] = Math.random() * 2 - 1;
                    }
                    const noise = ctx.createBufferSource();
                    noise.buffer = buffer;

                    const filter = ctx.createBiquadFilter();
                    filter.type = 'bandpass';
                    filter.frequency.setValueAtTime(100, now);
                    filter.frequency.exponentialRampToValueAtTime(10000, now + playDuration);
                    filter.Q.value = 2; // Slight resonance

                    const gain = ctx.createGain();
                    gain.gain.setValueAtTime(0.01, now);
                    gain.gain.linearRampToValueAtTime(0.5, now + playDuration);

                    noise.connect(filter);
                    filter.connect(gain);
                    gain.connect(masterGain);

                    noise.start(now);
                    addSource(noise);
                }
                break;

            case 4: // Supersaw lead stack
                {
                    playDuration = 3;
                    const leadGain = ctx.createGain();
                    leadGain.gain.value = 0.6 / 5; // Prevent clipping
                    leadGain.connect(masterGain);

                    const baseFreq = 440;
                    const detunes = [-15, -7, 0, 7, 15]; // Cents
                    detunes.forEach(detune => {
                        const osc = ctx.createOscillator();
                        osc.type = 'sawtooth';
                        osc.frequency.value = baseFreq;
                        osc.detune.value = detune;
                        osc.connect(leadGain);
                        osc.start(now);
                        osc.stop(now + playDuration);
                        addSource(osc);
                    });
                }
                break;

            case 5: // Wobble/LFO bass
                {
                    playDuration = 4;
                    const osc = ctx.createOscillator();
                    osc.type = 'sawtooth';
                    osc.frequency.value = 55; // A1

                    const filter = ctx.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.Q.value = 5;

                    // LFO attached to filter freq
                    const lfo = ctx.createOscillator();
                    lfo.type = 'sine';
                    lfo.frequency.setValueAtTime(1, now); // 1 Hz wobble
                    lfo.frequency.linearRampToValueAtTime(8, now + 3); // Speed up

                    const lfoGain = ctx.createGain();
                    lfoGain.gain.value = 1500; // Modulation depth

                    // Base frequency is 200, swings from 200 to 1700
                    filter.frequency.value = 200;

                    lfo.connect(lfoGain);
                    lfoGain.connect(filter.frequency);

                    osc.connect(filter);
                    filter.connect(masterGain);

                    osc.start(now);
                    lfo.start(now);
                    osc.stop(now + playDuration);
                    lfo.stop(now + playDuration);
                    addSource(osc);
                    addSource(lfo);
                }
                break;

            case 6: // Bass split processing
                {
                    playDuration = 3;
                    // Sub
                    const subOsc = ctx.createOscillator();
                    subOsc.type = 'sine';
                    subOsc.frequency.value = 55;

                    const subGain = ctx.createGain();
                    subGain.gain.value = 0.6;
                    subOsc.connect(subGain);
                    subGain.connect(masterGain);

                    // Mid (distorted)
                    const midOsc = ctx.createOscillator();
                    midOsc.type = 'sawtooth';
                    midOsc.frequency.value = 110;

                    const distortion = ctx.createWaveShaper();
                    const curve = new Float32Array(400);
                    for (let i = 0; i < 400; i++) {
                        const x = i * 2 / 400 - 1;
                        curve[i] = (3 + 5) * x * 20 * Math.PI / (Math.PI + 5 * Math.abs(x));
                    }
                    distortion.curve = curve;

                    // High-pass filter for mid to keep sub clean
                    const filter = ctx.createBiquadFilter();
                    filter.type = 'highpass';
                    filter.frequency.value = 200;

                    const midGain = ctx.createGain();
                    midGain.gain.value = 0.3;

                    midOsc.connect(filter);
                    filter.connect(distortion);
                    distortion.connect(midGain);
                    midGain.connect(masterGain);

                    subOsc.start(now);
                    midOsc.start(now);
                    subOsc.stop(now + playDuration);
                    midOsc.stop(now + playDuration);
                    addSource(subOsc);
                    addSource(midOsc);
                }
                break;

            case 7: // Reverb/Delay throw
                {
                    playDuration = 4;
                    // Simulate a vocal phrase with two notes, second goes to huge delay
                    const osc = ctx.createOscillator();
                    osc.type = 'triangle';
                    const oscGain = ctx.createGain();

                    // Note 1 (Dry)
                    osc.frequency.setValueAtTime(440, now);
                    oscGain.gain.setValueAtTime(0, now);
                    oscGain.gain.linearRampToValueAtTime(0.5, now + 0.1);
                    oscGain.gain.setValueAtTime(0.5, now + 0.8);
                    oscGain.gain.linearRampToValueAtTime(0, now + 0.9);

                    // Note 2 (Throw)
                    osc.frequency.setValueAtTime(523.25, now + 1.0); // C5
                    oscGain.gain.setValueAtTime(0, now + 1.0);
                    oscGain.gain.linearRampToValueAtTime(0.6, now + 1.1);
                    oscGain.gain.setValueAtTime(0.6, now + 1.6);
                    oscGain.gain.linearRampToValueAtTime(0, now + 1.7);

                    // Send to delay only for note 2
                    const throwSend = ctx.createGain();
                    throwSend.gain.setValueAtTime(0, now);
                    throwSend.gain.setValueAtTime(1, now + 1.0);
                    throwSend.gain.setValueAtTime(0, now + 1.7);

                    const delay = ctx.createDelay();
                    delay.delayTime.value = 0.4;

                    const feedback = ctx.createGain();
                    feedback.gain.value = 0.6;

                    delay.connect(feedback);
                    feedback.connect(delay);

                    osc.connect(oscGain);
                    oscGain.connect(masterGain); // Dry

                    oscGain.connect(throwSend);
                    throwSend.connect(delay);
                    delay.connect(masterGain); // Wet

                    osc.start(now);
                    osc.stop(now + playDuration);
                    addSource(osc);
                }
                break;

            case 8: // Layered kick drum
                {
                    playDuration = 2;
                    for (let i = 0; i < 4; i++) {
                        const hitTime = now + (i * 0.5);

                        // Sub Kick
                        const sub = ctx.createOscillator();
                        sub.frequency.setValueAtTime(100, hitTime);
                        sub.frequency.exponentialRampToValueAtTime(40, hitTime + 0.3);
                        const subGain = ctx.createGain();
                        subGain.gain.setValueAtTime(1, hitTime);
                        subGain.gain.exponentialRampToValueAtTime(0.01, hitTime + 0.3);
                        sub.connect(subGain);
                        subGain.connect(masterGain);

                        // Punch Kick
                        const punch = ctx.createOscillator();
                        punch.type = 'triangle';
                        punch.frequency.setValueAtTime(300, hitTime);
                        punch.frequency.exponentialRampToValueAtTime(60, hitTime + 0.1);
                        const punchGain = ctx.createGain();
                        punchGain.gain.setValueAtTime(0.8, hitTime);
                        punchGain.gain.exponentialRampToValueAtTime(0.01, hitTime + 0.1);
                        punch.connect(punchGain);
                        punchGain.connect(masterGain);

                        // Click
                        const clickBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
                        const data = clickBuffer.getChannelData(0);
                        for (let j = 0; j < data.length; j++) data[j] = Math.random() * 2 - 1;
                        const click = ctx.createBufferSource();
                        click.buffer = clickBuffer;
                        const clickFilter = ctx.createBiquadFilter();
                        clickFilter.type = 'highpass';
                        clickFilter.frequency.value = 5000;
                        const clickGain = ctx.createGain();
                        clickGain.gain.setValueAtTime(0.3, hitTime);
                        clickGain.gain.exponentialRampToValueAtTime(0.01, hitTime + 0.05);
                        click.connect(clickFilter);
                        clickFilter.connect(clickGain);
                        clickGain.connect(masterGain);

                        sub.start(hitTime);
                        punch.start(hitTime);
                        click.start(hitTime);
                        sub.stop(hitTime + 0.3);
                        punch.stop(hitTime + 0.1);
                        addSource(sub);
                        addSource(punch);
                        addSource(click);
                    }
                }
                break;

            case 9: // Reverse cymbal impact
                {
                    playDuration = 3.5;
                    // White noise sweeping up for 3 seconds then stop
                    const bufferSize = ctx.sampleRate * 3;
                    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                    const data = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        data[i] = (Math.random() * 2 - 1) * (i / bufferSize); // Reverse envelope naturally
                    }
                    const noise = ctx.createBufferSource();
                    noise.buffer = buffer;
                    noise.connect(masterGain);
                    noise.start(now);
                    addSource(noise);

                    // Downbeat kick exactly at 3 seconds
                    const hitTime = now + 3;
                    const kick = ctx.createOscillator();
                    const kickGain = ctx.createGain();
                    kick.frequency.setValueAtTime(150, hitTime);
                    kick.frequency.exponentialRampToValueAtTime(0.01, hitTime + 0.3);
                    kickGain.gain.setValueAtTime(1, hitTime);
                    kickGain.gain.exponentialRampToValueAtTime(0.01, hitTime + 0.3);
                    kick.connect(kickGain);
                    kickGain.connect(masterGain);
                    kick.start(hitTime);
                    kick.stop(hitTime + 0.4);
                    addSource(kick);
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

    // Shuffle options when a new question loads to prevent memorizing positions
    const [currentOptions, setCurrentOptions] = useState([]);

    useEffect(() => {
        if (currentQuestionIndex < quizData.length) {
            const options = [...quizData[currentQuestionIndex].options];
            // Fisher-Yates shuffle
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

    // Ensure audio stops when navigating away or unmounting
    useEffect(() => {
        return () => stopAudio();
    }, []);

    // Stop audio when changing questions
    useEffect(() => {
        stopAudio();
    }, [currentQuestionIndex]);

    if (quizFinished) {
        const percentage = Math.round((score / quizData.length) * 100);
        let message = "";
        if (percentage === 100) message = "Perfect! You are a master producer.";
        else if (percentage >= 80) message = "Excellent! Your production knowledge is solid.";
        else if (percentage >= 60) message = "Good job. Keep practicing these techniques in your DAW.";
        else message = "Review these techniques and try again to sharpen your skills.";

        return (
            <div className="pt-quiz-container">
                <div className="pt-header">
                    <h1>EDM Production Techniques Quiz</h1>
                    <button className="pt-exit-btn" onClick={onExit}>Exit Session</button>
                </div>
                <div className="pt-content" style={{ justifyContent: 'center' }}>
                    <div className="pt-completion-screen">
                        <h2>Session Complete</h2>
                        <div className="pt-completion-score">{score} / {quizData.length}</div>
                        <p className="pt-completion-message">{message}</p>
                        <div style={{ marginTop: '2rem' }}>
                            <button className="pt-restart-btn" onClick={handleRestart}>Try Again</button>
                            <button className="pt-finish-btn" onClick={onExit}>Return to Menu</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = quizData[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;

    return (
        <div className="pt-quiz-container">
            <div className="pt-header">
                <h1>EDM Production Techniques Masterclass</h1>
                <button className="pt-exit-btn" onClick={() => { stopAudio(); onExit(); }}>End Session</button>
            </div>

            <div className="pt-content">
                <div className="pt-progress-bar-container">
                    <div className="pt-progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>

                <div className="pt-category-badge">
                    {currentQ.category}
                </div>

                <div className="pt-scenario-card">
                    <div className="pt-scenario-title">Scenario Goal:</div>
                    <div className="pt-scenario-text">
                        "{currentQ.scenario}"
                    </div>

                    <div className="pt-audio-widget">
                        <button
                            className={`pt-play-btn ${isPlaying ? 'playing' : ''}`}
                            onClick={playAudioExample}
                        >
                            {isPlaying ? <Square size={20} className="fill-current" /> : <Play size={20} className="fill-current" />}
                            <span>{isPlaying ? 'Stop Audio Example' : 'Play Audio Example'}</span>
                        </button>
                        {isPlaying && <div className="pt-audio-waves">
                            <span className="pt-wave-bar"></span>
                            <span className="pt-wave-bar"></span>
                            <span className="pt-wave-bar"></span>
                            <span className="pt-wave-bar"></span>
                        </div>}
                    </div>

                    <div className="pt-options-grid">
                        {currentOptions.map((opt, index) => {
                            let btnClass = "pt-option-btn";
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
                        <div className={`pt-feedback-panel ${currentOptions[selectedOptionIndex].correct ? 'correct' : 'wrong'}`}>
                            <div className="pt-feedback-title">
                                {currentOptions[selectedOptionIndex].correct ? 'Perfect Match' : 'Incorrect Technique'}
                            </div>
                            <div className="pt-feedback-text">
                                {currentQ.explanation}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="pt-next-btn" onClick={handleNextQuestion}>
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

export default ProductionTechniqueQuiz;
