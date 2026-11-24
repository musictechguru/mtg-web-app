import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import './RockProductionQuiz.css';

const quizData = [
    {
        category: "Drums: Gated Reverb",
        scenario: "You want a huge 1980s snare sound where a dense reverb tail cuts off abruptly before the next hit.",
        options: [
            { text: "Spring Reverb", correct: false },
            { text: "Gated Reverb", correct: true },
            { text: "Reverse Delay", correct: false },
            { text: "Parallel Distortion", correct: false }
        ],
        explanation: "Gated reverb sends the snare to a dense reverb, then places a noise gate on the reverb return set to close quickly for an explosive, abrupt tail."
    },
    {
        category: "Drums: Parallel Compression",
        scenario: "Your rock drums sound thin. You want thicker room sustain without squashing the transient punch of the close mics.",
        options: [
            { text: "Parallel (New York) Compression", correct: true },
            { text: "Brickwall Limiting on Master Bus", correct: false },
            { text: "Subtractive Equalisation", correct: false },
            { text: "Transient Shaping", correct: false }
        ],
        explanation: "Parallel compression blends a heavily compressed auxiliary copy underneath the uncompressed dry drums, preserving transient punch while adding sustain."
    },
    {
        category: "Guitars: Double-Tracking",
        scenario: "A single rhythm guitar panned to the centre sounds small and clashes with the lead vocal and snare.",
        options: [
            { text: "Add a stereo chorus plugin", correct: false },
            { text: "Use auto-pan modulation", correct: false },
            { text: "Record a second take and pan L/R", correct: true },
            { text: "Cut the centre with Mid/Side EQ", correct: false }
        ],
        explanation: "Double-tracking records two separate performances and pans them hard Left and Right, creating natural stereo width and leaving the centre clear."
    },
    {
        category: "Guitars: Reamping & Amp Sim",
        scenario: "You recorded a clean DI guitar signal for tight editing, and now want real valve amplifier distortion and cabinet tone.",
        options: [
            { text: "Reamp box or Amp Simulator plugin", correct: true },
            { text: "Boost 10 kHz with a shelf EQ", correct: false },
            { text: "Run it through a vocal de-esser", correct: false },
            { text: "Add a 100 ms slapback delay", correct: false }
        ],
        explanation: "Reamping sends the clean DI recording out through a reamp box into a guitar amp (or uses an amp simulator plugin) to capture amp saturation and cabinet tone."
    },
    {
        category: "Bass & Guitar: Frequency Masking",
        scenario: "Bass guitar and rhythm guitars both build up around 100–200 Hz, creating a muddy low end.",
        options: [
            { text: "Boost 150 Hz on both tracks", correct: false },
            { text: "Carve complementary EQ cuts (unmasking)", correct: true },
            { text: "Hard-limit both tracks together", correct: false },
            { text: "Pan the sub-bass hard right", correct: false }
        ],
        explanation: "Complementary equalisation cuts clashing 100–200 Hz frequencies in the rhythm guitar so the bass guitar sits clearly without mud."
    },
    {
        category: "Vocals: Slapback Delay",
        scenario: "You want a classic 1950s rock-and-roll vocal thickness using a single short echo rather than a long reverb.",
        options: [
            { text: "Long hall reverberation", correct: false },
            { text: "Brickwall limiting", correct: false },
            { text: "Slapback Delay (75–150 ms, 0% feedback)", correct: true },
            { text: "Heavy flanging", correct: false }
        ],
        explanation: "A slapback delay uses one short echo (75–150 ms) with zero feedback, thickening the vocal just like vintage tape slap."
    },
    {
        category: "Vocals: Dynamic Control",
        scenario: "Your rock vocalist is quiet in verses and very loud in choruses. How do you keep the vocal level steady without over-squashing it?",
        options: [
            { text: "Volume automation (riding) into a compressor", correct: true },
            { text: "A single brickwall limiter at 20:1", correct: false },
            { text: "De-essing only the quiet verse", correct: false },
            { text: "Adding heavy tape distortion", correct: false }
        ],
        explanation: "Automating (riding) the fader before the compressor evens out big section jumps so the compressor reacts smoothly and naturally."
    },
    {
        category: "Drums: Phase Alignment",
        scenario: "The snare close mic sounds full on its own, but turns thin and hollow as soon as the stereo overheads are unmuted.",
        options: [
            { text: "Overheads need more sub-bass EQ", correct: false },
            { text: "Snare mic needs more compression", correct: false },
            { text: "Phase cancellation between the mics", correct: true },
            { text: "The snare drum is out of tune", correct: false }
        ],
        explanation: "Time-of-arrival differences between the close mic and overheads cause phase cancellation. Flipping polarity or aligning the tracks restores fullness."
    },
    {
        category: "Drums: Sample Blending",
        scenario: "The drummer's groove is great, but the recorded snare sounds boxy. How can you improve the tone while keeping the exact performance?",
        options: [
            { text: "Transient-triggered drum sample blending", correct: true },
            { text: "Sidechain gating on the master bus", correct: false },
            { text: "Delete the audio and program MIDI", correct: false },
            { text: "Boost 300 Hz by +10 dB", correct: false }
        ],
        explanation: "Sample triggering detects the live snare transients and layers a punchy sample underneath, keeping the drummer's natural timing and dynamics."
    },
    {
        category: "Mix Bus: Cohesion",
        scenario: "All instruments sound clear individually, but the full rock mix lacks cohesion and punch.",
        options: [
            { text: "Stereo widening on every channel", correct: false },
            { text: "Brickwall limiting with +6 dB gain", correct: false },
            { text: "Gentle Mix Bus Compression (1–3 dB GR)", correct: true },
            { text: "Noise gating the stereo master", correct: false }
        ],
        explanation: "Gentle mix bus compression (1–3 dB gain reduction) glues the drums, bass, and guitars together into a cohesive record."
    }
];

const RockProductionQuiz = ({ quiz, onExit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [playingMode, setPlayingMode] = useState(null); // null | 'dry' | 'processed'
    const scoredQuestionsRef = useRef(new Set());
    const stopTimerRef = useRef(null);

    const userContext = useUser();
    const saveQuizResult = userContext ? userContext.saveQuizResult : null;
    const completeCampaignNode = userContext ? userContext.completeCampaignNode : null;
    const resultsSavedRef = useRef(false);

    useEffect(() => {
        if (quizFinished && !resultsSavedRef.current) {
            resultsSavedRef.current = true;
            const percentage = Math.round((score / quizData.length) * 100);
            let grade = 'U';
            if (percentage >= 80) grade = 'A';
            else if (percentage >= 70) grade = 'B';
            else if (percentage >= 60) grade = 'C';
            else if (percentage >= 50) grade = 'D';

            if (saveQuizResult) {
                saveQuizResult(quiz?.title || "Practical Quiz 18: Rock Production Techniques", score, quizData.length, grade);
            }
            if (quiz?.campaignNodeId && completeCampaignNode) {
                completeCampaignNode(quiz.campaignNodeId);
            }
        }
    }, [quizFinished, score, saveQuizResult, completeCampaignNode, quiz?.title, quiz?.campaignNodeId]);

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
        if (stopTimerRef.current) {
            clearTimeout(stopTimerRef.current);
            stopTimerRef.current = null;
        }
        activeSources.current.forEach(source => {
            try { source.stop(); } catch (e) { }
        });
        activeSources.current = [];
        setPlayingMode(null);
    };

    const playAudioExample = (isProcessed = true) => {
        const targetMode = isProcessed ? 'processed' : 'dry';
        if (isLoadingAudio) return;
        if (playingMode === targetMode) {
            stopAudio();
            return;
        }
        // Stop any currently playing mode before starting the new one
        stopAudio();

        const ctx = audioContextRef.current;
        if (!ctx) return;

        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        setPlayingMode(targetMode);
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
                    playDuration = 2.4;
                    const hitTimes = [now, now + 0.8];

                    const createReverbImpulse = (context, duration = 1.8, decay = 0.8) => {
                        const sampleRate = context.sampleRate;
                        const length = Math.floor(sampleRate * duration);
                        const impulse = context.createBuffer(2, length, sampleRate);
                        const left = impulse.getChannelData(0);
                        const right = impulse.getChannelData(1);

                        for (let i = 0; i < length; i++) {
                            const env = Math.pow(1 - i / length, decay);
                            left[i] = (Math.random() * 2 - 1) * env;
                            right[i] = (Math.random() * 2 - 1) * env;
                        }
                        return impulse;
                    };

                    const impulse = isProcessed ? createReverbImpulse(ctx, 1.8, 0.8) : null;

                    hitTimes.forEach((hitT) => {
                        const snareGain = ctx.createGain();
                        snareGain.gain.value = 0.9;
                        snareGain.connect(masterGain);
                        playBuffer('snare', hitT, snareGain);

                        if (isProcessed && impulse) {
                            const convolver = ctx.createConvolver();
                            convolver.buffer = impulse;

                            const revEnv = ctx.createGain();
                            revEnv.gain.setValueAtTime(0, hitT);
                            revEnv.gain.linearRampToValueAtTime(1.15, hitT + 0.015);
                            revEnv.gain.setValueAtTime(1.15, hitT + 0.28);
                            // Noise gate slams shut abruptly after 280 ms
                            revEnv.gain.linearRampToValueAtTime(0.0, hitT + 0.31);

                            convolver.connect(revEnv);
                            revEnv.connect(masterGain);
                            playBuffer('snare', hitT, convolver);
                        }
                    });
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

        stopTimerRef.current = setTimeout(() => {
            setPlayingMode(null);
            activeSources.current = [];
            stopTimerRef.current = null;
        }, playDuration * 1000);
    };

    const previewOptionAudio = (optionText, idx) => {
        const targetMode = `opt_${idx}`;
        if (isLoadingAudio) return;
        if (playingMode === targetMode) {
            stopAudio();
            return;
        }
        stopAudio();

        const ctx = audioContextRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        setPlayingMode(targetMode);
        const now = ctx.currentTime;
        let playDuration = 2.4;

        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.5;
        masterGain.connect(ctx.destination);

        const addSource = (src) => activeSources.current.push(src);
        const playBuf = (buf, time, dest) => {
            if (!buf) return;
            const src = ctx.createBufferSource();
            src.buffer = buf;
            src.connect(dest);
            src.start(time);
            addSource(src);
        };

        const snareBuf = audioBuffers.current.snare;
        const hitTimes = [now, now + 0.95];

        if (optionText === 'Spring Reverb') {
            // Boingy, metallic bandpass-filtered spring tail decaying smoothly over 1.3s
            const len = Math.floor(ctx.sampleRate * 1.3);
            const imp = ctx.createBuffer(2, len, ctx.sampleRate);
            for (let ch = 0; ch < 2; ch++) {
                const d = imp.getChannelData(ch);
                for (let i = 0; i < len; i++) {
                    const mod = 0.65 + 0.35 * Math.sin(i / 280);
                    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2) * mod;
                }
            }
            hitTimes.forEach((t) => {
                const dry = ctx.createGain();
                dry.gain.value = 0.85;
                dry.connect(masterGain);
                playBuf(snareBuf, t, dry);

                const conv = ctx.createConvolver();
                conv.buffer = imp;
                const bp = ctx.createBiquadFilter();
                bp.type = 'bandpass';
                bp.frequency.value = 1400;
                bp.Q.value = 3.2;
                const wet = ctx.createGain();
                wet.gain.value = 1.4;
                conv.connect(bp).connect(wet).connect(masterGain);
                playBuf(snareBuf, t, conv);
            });
        } else if (optionText === 'Gated Reverb') {
            // Huge dense reverb that slams shut abruptly at 280 ms
            const len = Math.floor(ctx.sampleRate * 1.8);
            const imp = ctx.createBuffer(2, len, ctx.sampleRate);
            for (let ch = 0; ch < 2; ch++) {
                const d = imp.getChannelData(ch);
                for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 0.8);
            }
            hitTimes.forEach((t) => {
                const dry = ctx.createGain();
                dry.gain.value = 0.9;
                dry.connect(masterGain);
                playBuf(snareBuf, t, dry);

                const conv = ctx.createConvolver();
                conv.buffer = imp;
                const revEnv = ctx.createGain();
                revEnv.gain.setValueAtTime(0, t);
                revEnv.gain.linearRampToValueAtTime(1.15, t + 0.015);
                revEnv.gain.setValueAtTime(1.15, t + 0.28);
                revEnv.gain.linearRampToValueAtTime(0.0, t + 0.31);
                conv.connect(revEnv).connect(masterGain);
                playBuf(snareBuf, t, conv);
            });
        } else if (optionText === 'Reverse Delay') {
            // Unmistakable reversed snare swell ("shhhhh-POW!") + echoing reverse delay tap
            playDuration = 2.6;
            const swellDur = 0.38;
            const swellLen = Math.floor(ctx.sampleRate * swellDur);
            const revBuf = ctx.createBuffer(1, swellLen, ctx.sampleRate);
            const revData = revBuf.getChannelData(0);
            for (let i = 0; i < swellLen; i++) {
                // Exponential rise from silence to full burst right at the end of the 380 ms buffer
                const env = Math.pow(i / swellLen, 2.6);
                revData[i] = (Math.random() * 2 - 1) * env;
            }

            [now + 0.42, now + 1.42].forEach((t) => {
                const swellStart = t - swellDur;
                const bp = ctx.createBiquadFilter();
                bp.type = 'bandpass';
                bp.frequency.value = 1800;
                bp.Q.value = 0.9;
                const swellGain = ctx.createGain();
                swellGain.gain.value = 0.9;
                bp.connect(swellGain).connect(masterGain);
                playBuf(revBuf, swellStart, bp);

                const dry = ctx.createGain();
                dry.gain.value = 0.85;
                dry.connect(masterGain);
                playBuf(snareBuf, t, dry);
            });
        } else if (currentQuestionIndex === 0) {
            // Parallel Distortion: dry snare + heavy grit saturation with zero reverb
            const dist = ctx.createWaveShaper();
            const curve = new Float32Array(512);
            for (let i = 0; i < 512; i++) {
                const x = (i * 2) / 512 - 1;
                curve[i] = Math.tanh(x * 30);
            }
            dist.curve = curve;
            const distGain = ctx.createGain();
            distGain.gain.value = 0.55;
            dist.connect(distGain).connect(masterGain);

            hitTimes.forEach((t) => {
                const dry = ctx.createGain();
                dry.gain.value = 0.75;
                dry.connect(masterGain);
                playBuf(snareBuf, t, dry);
                playBuf(snareBuf, t, dist);
            });
        } else if (currentQuestionIndex === 1) {
            // Q2: Parallel Compression vs Limiter vs Subtractive EQ vs Transient Shaping
            playDuration = 4.0;
            const drums = audioBuffers.current.drums;
            if (optionText.includes('Parallel')) {
                const dry = ctx.createGain();
                dry.gain.value = 0.7;
                dry.connect(masterGain);
                playBuf(drums, now, dry);
                const comp = ctx.createDynamicsCompressor();
                comp.threshold.value = -32;
                comp.ratio.value = 12;
                comp.attack.value = 0.002;
                comp.release.value = 0.12;
                const wet = ctx.createGain();
                wet.gain.value = 0.75;
                comp.connect(wet).connect(masterGain);
                playBuf(drums, now, comp);
            } else if (optionText.includes('Limiting')) {
                const lim = ctx.createDynamicsCompressor();
                lim.threshold.value = -28;
                lim.ratio.value = 20;
                lim.attack.value = 0.001;
                lim.release.value = 0.25;
                lim.connect(masterGain);
                playBuf(drums, now, lim);
            } else if (optionText.includes('Subtractive')) {
                const eq = ctx.createBiquadFilter();
                eq.type = 'peaking';
                eq.frequency.value = 400;
                eq.gain.value = -9;
                eq.connect(masterGain);
                playBuf(drums, now, eq);
            } else {
                const hp = ctx.createBiquadFilter();
                hp.type = 'highpass';
                hp.frequency.value = 900;
                hp.connect(masterGain);
                playBuf(drums, now, hp);
            }
        } else if (currentQuestionIndex === 2) {
            // Q3: Double-Tracking L/R vs Chorus vs Auto-Pan vs Mid/Side Cut
            playDuration = 4.0;
            const gtr = audioBuffers.current.guitar_riff;
            const makeDist = (dest) => {
                const d = ctx.createWaveShaper();
                const c = new Float32Array(256);
                for (let i = 0; i < 256; i++) c[i] = Math.tanh(((i * 2) / 256 - 1) * 14);
                d.curve = c;
                const lp = ctx.createBiquadFilter();
                lp.type = 'lowpass';
                lp.frequency.value = 3800;
                d.connect(lp).connect(dest);
                return d;
            };
            if (optionText.includes('second take')) {
                const pL = ctx.createStereoPanner();
                pL.pan.value = -0.95;
                pL.connect(masterGain);
                const pR = ctx.createStereoPanner();
                pR.pan.value = 0.95;
                pR.connect(masterGain);
                playBuf(gtr, now, makeDist(pL));
                const s2 = ctx.createBufferSource();
                s2.buffer = gtr;
                s2.playbackRate.value = 1.003;
                s2.connect(makeDist(pR));
                s2.start(now + 0.02);
                addSource(s2);
            } else if (optionText.includes('chorus')) {
                const del = ctx.createDelay();
                del.delayTime.value = 0.015;
                const lfo = ctx.createOscillator();
                lfo.frequency.value = 4.5;
                const lg = ctx.createGain();
                lg.gain.value = 0.006;
                lfo.connect(lg).connect(del.delayTime);
                lfo.start(now);
                addSource(lfo);
                const amp = makeDist(masterGain);
                del.connect(amp);
                playBuf(gtr, now, amp);
                playBuf(gtr, now, del);
            } else if (optionText.includes('auto-pan')) {
                const pan = ctx.createStereoPanner();
                const lfo = ctx.createOscillator();
                lfo.frequency.value = 2.0;
                lfo.connect(pan.pan);
                lfo.start(now);
                addSource(lfo);
                pan.connect(masterGain);
                playBuf(gtr, now, makeDist(pan));
            } else {
                const hp = ctx.createBiquadFilter();
                hp.type = 'highpass';
                hp.frequency.value = 750;
                hp.connect(masterGain);
                playBuf(gtr, now, makeDist(hp));
            }
        } else if (currentQuestionIndex === 3) {
            // Q4: Reamping / Amp Sim vs 10 kHz Shelf vs De-esser vs Slapback
            playDuration = 4.0;
            const gtr = audioBuffers.current.guitar_riff;
            if (optionText.includes('Amp Simulator')) {
                const dist = ctx.createWaveShaper();
                const c = new Float32Array(256);
                for (let i = 0; i < 256; i++) c[i] = Math.tanh(((i * 2) / 256 - 1) * 24);
                dist.curve = c;
                const lp = ctx.createBiquadFilter();
                lp.type = 'lowpass';
                lp.frequency.value = 3800;
                dist.connect(lp).connect(masterGain);
                playBuf(gtr, now, dist);
            } else if (optionText.includes('10 kHz')) {
                const hs = ctx.createBiquadFilter();
                hs.type = 'highshelf';
                hs.frequency.value = 5000;
                hs.gain.value = 12;
                hs.connect(masterGain);
                playBuf(gtr, now, hs);
            } else if (optionText.includes('de-esser')) {
                const dip = ctx.createBiquadFilter();
                dip.type = 'peaking';
                dip.frequency.value = 5500;
                dip.gain.value = -12;
                dip.connect(masterGain);
                playBuf(gtr, now, dip);
            } else {
                const del = ctx.createDelay();
                del.delayTime.value = 0.1;
                const g = ctx.createGain();
                g.gain.value = 0.6;
                del.connect(g).connect(masterGain);
                playBuf(gtr, now, masterGain);
                playBuf(gtr, now, del);
            }
        } else if (currentQuestionIndex === 4) {
            // Q5: Frequency Masking (Bass + Guitar)
            playDuration = 4.0;
            const bass = audioBuffers.current.bass;
            const gtr = audioBuffers.current.guitar_riff;
            if (optionText.includes('complementary')) {
                const cut = ctx.createBiquadFilter();
                cut.type = 'highpass';
                cut.frequency.value = 220;
                cut.connect(masterGain);
                playBuf(bass, now, masterGain);
                playBuf(gtr, now, cut);
            } else if (optionText.includes('Boost 150 Hz')) {
                const boost = ctx.createBiquadFilter();
                boost.type = 'peaking';
                boost.frequency.value = 150;
                boost.gain.value = 11;
                boost.connect(masterGain);
                playBuf(bass, now, boost);
                playBuf(gtr, now, boost);
            } else if (optionText.includes('Hard-limit')) {
                const comp = ctx.createDynamicsCompressor();
                comp.threshold.value = -30;
                comp.ratio.value = 20;
                comp.connect(masterGain);
                playBuf(bass, now, comp);
                playBuf(gtr, now, comp);
            } else {
                const pR = ctx.createStereoPanner();
                pR.pan.value = 0.95;
                pR.connect(masterGain);
                playBuf(bass, now, pR);
                playBuf(gtr, now, masterGain);
            }
        } else if (currentQuestionIndex === 5) {
            // Q6: Vocal Slapback vs Long Hall vs Limiting vs Flanger
            playDuration = 4.0;
            const vox = audioBuffers.current.vocal;
            if (optionText.includes('Slapback')) {
                const del = ctx.createDelay();
                del.delayTime.value = 0.11;
                const wet = ctx.createGain();
                wet.gain.value = 0.65;
                del.connect(wet).connect(masterGain);
                playBuf(vox, now, masterGain);
                playBuf(vox, now, del);
            } else if (optionText.includes('Long hall')) {
                const len = Math.floor(ctx.sampleRate * 2.2);
                const imp = ctx.createBuffer(2, len, ctx.sampleRate);
                for (let ch = 0; ch < 2; ch++) {
                    const d = imp.getChannelData(ch);
                    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.8);
                }
                const conv = ctx.createConvolver();
                conv.buffer = imp;
                conv.connect(masterGain);
                playBuf(vox, now, masterGain);
                playBuf(vox, now, conv);
            } else if (optionText.includes('Brickwall')) {
                const lim = ctx.createDynamicsCompressor();
                lim.threshold.value = -28;
                lim.ratio.value = 20;
                lim.connect(masterGain);
                playBuf(vox, now, lim);
            } else {
                const del = ctx.createDelay();
                del.delayTime.value = 0.004;
                const lfo = ctx.createOscillator();
                lfo.frequency.value = 0.9;
                const lg = ctx.createGain();
                lg.gain.value = 0.003;
                lfo.connect(lg).connect(del.delayTime);
                lfo.start(now);
                addSource(lfo);
                del.connect(masterGain);
                playBuf(vox, now, masterGain);
                playBuf(vox, now, del);
            }
        } else if (currentQuestionIndex === 6) {
            // Q7: Vocal Riding + Comp vs Limiter vs De-ess vs Distortion
            playDuration = 4.0;
            const vox = audioBuffers.current.vocal;
            if (optionText.includes('automation')) {
                const comp = ctx.createDynamicsCompressor();
                comp.threshold.value = -16;
                comp.ratio.value = 3;
                comp.connect(masterGain);
                playBuf(vox, now, comp);
            } else if (optionText.includes('20:1')) {
                const lim = ctx.createDynamicsCompressor();
                lim.threshold.value = -32;
                lim.ratio.value = 20;
                lim.connect(masterGain);
                playBuf(vox, now, lim);
            } else if (optionText.includes('De-essing')) {
                const hs = ctx.createBiquadFilter();
                hs.type = 'highshelf';
                hs.frequency.value = 5000;
                hs.gain.value = -12;
                hs.connect(masterGain);
                playBuf(vox, now, hs);
            } else {
                const dist = ctx.createWaveShaper();
                const c = new Float32Array(256);
                for (let i = 0; i < 256; i++) c[i] = Math.tanh(((i * 2) / 256 - 1) * 18);
                dist.curve = c;
                dist.connect(masterGain);
                playBuf(vox, now, dist);
            }
        } else if (currentQuestionIndex === 7) {
            // Q8: Phase Cancellation vs Sub-Bass vs Comp vs Detuned Snare
            playDuration = 2.4;
            if (optionText.includes('Phase cancellation')) {
                const del = ctx.createDelay();
                del.delayTime.value = 0.0014;
                const inv = ctx.createGain();
                inv.gain.value = -0.95;
                del.connect(inv).connect(masterGain);
                playBuf(snareBuf, now, masterGain);
                playBuf(snareBuf, now, del);
                playBuf(snareBuf, now + 0.9, masterGain);
                playBuf(snareBuf, now + 0.9, del);
            } else if (optionText.includes('sub-bass')) {
                const ls = ctx.createBiquadFilter();
                ls.type = 'lowshelf';
                ls.frequency.value = 120;
                ls.gain.value = 10;
                ls.connect(masterGain);
                playBuf(snareBuf, now, ls);
            } else if (optionText.includes('compression')) {
                const comp = ctx.createDynamicsCompressor();
                comp.threshold.value = -24;
                comp.ratio.value = 10;
                comp.connect(masterGain);
                playBuf(snareBuf, now, comp);
            } else {
                const s = ctx.createBufferSource();
                s.buffer = snareBuf;
                s.playbackRate.value = 0.72;
                s.connect(masterGain);
                s.start(now);
                addSource(s);
            }
        } else if (currentQuestionIndex === 8) {
            // Q9: Sample Blending vs Gate vs Synth MIDI vs 300 Hz Boost
            playDuration = 2.4;
            if (optionText.includes('sample blending')) {
                playBuf(snareBuf, now, masterGain);
                playBuf(snareBuf, now + 0.85, masterGain);
            } else if (optionText.includes('gating')) {
                const g = ctx.createGain();
                g.gain.setValueAtTime(1, now);
                g.gain.setValueAtTime(0, now + 0.09);
                g.connect(masterGain);
                playBuf(snareBuf, now, g);
            } else if (optionText.includes('MIDI')) {
                const osc = ctx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(190, now);
                osc.frequency.exponentialRampToValueAtTime(95, now + 0.12);
                const g = ctx.createGain();
                g.gain.setValueAtTime(0.7, now);
                g.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
                osc.connect(g).connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.2);
                addSource(osc);
            } else {
                const pk = ctx.createBiquadFilter();
                pk.type = 'peaking';
                pk.frequency.value = 300;
                pk.gain.value = 12;
                pk.connect(masterGain);
                playBuf(snareBuf, now, pk);
            }
        } else {
            // Q10: Mix Bus Cohesion (Drums + Bass + Guitar)
            playDuration = 4.0;
            const drums = audioBuffers.current.drums;
            const bass = audioBuffers.current.bass;
            const gtr = audioBuffers.current.guitar_riff;
            if (optionText.includes('Mix Bus Compression')) {
                const bus = ctx.createDynamicsCompressor();
                bus.threshold.value = -14;
                bus.ratio.value = 3;
                bus.attack.value = 0.015;
                bus.release.value = 0.18;
                bus.connect(masterGain);
                playBuf(drums, now, bus);
                playBuf(bass, now, bus);
                playBuf(gtr, now, bus);
            } else if (optionText.includes('Stereo widening')) {
                const pL = ctx.createStereoPanner();
                pL.pan.value = -0.9;
                pL.connect(masterGain);
                const pR = ctx.createStereoPanner();
                pR.pan.value = 0.9;
                pR.connect(masterGain);
                playBuf(drums, now, pL);
                playBuf(gtr, now, pR);
            } else if (optionText.includes('Brickwall')) {
                const dist = ctx.createWaveShaper();
                const c = new Float32Array(256);
                for (let i = 0; i < 256; i++) c[i] = Math.tanh(((i * 2) / 256 - 1) * 16);
                dist.curve = c;
                dist.connect(masterGain);
                playBuf(drums, now, dist);
                playBuf(bass, now, dist);
            } else {
                const g = ctx.createGain();
                g.gain.setValueAtTime(1, now);
                g.gain.setValueAtTime(0.05, now + 0.25);
                g.gain.setValueAtTime(1, now + 0.5);
                g.gain.setValueAtTime(0.05, now + 0.75);
                g.connect(masterGain);
                playBuf(drums, now, g);
            }
        }

        stopTimerRef.current = setTimeout(() => {
            setPlayingMode(null);
            activeSources.current = [];
            stopTimerRef.current = null;
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

        if (currentOptions[index].correct && !scoredQuestionsRef.current.has(currentQuestionIndex)) {
            scoredQuestionsRef.current.add(currentQuestionIndex);
            setScore(prev => prev + 1);
        }
    };

    const handleRetryQuestion = () => {
        stopAudio();
        setSelectedOptionIndex(null);
        setIsAnswered(false);
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
        scoredQuestionsRef.current = new Set();
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
                                <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                                    <button
                                        className={btnClass}
                                        style={{ flex: 1 }}
                                        onClick={() => handleOptionClick(index)}
                                        disabled={isAnswered}
                                    >
                                        {opt.text}
                                    </button>
                                    <button
                                        type="button"
                                        className={`rock-play-btn ${playingMode === `opt_${index}` ? 'playing' : ''}`}
                                        style={{ padding: '0 12px', minWidth: '88px', fontSize: '0.8rem', justifyContent: 'center' }}
                                        onClick={() => previewOptionAudio(opt.text, index)}
                                        disabled={isLoadingAudio}
                                        title={`Preview ${opt.text}`}
                                    >
                                        {playingMode === `opt_${index}` ? <Square size={14} className="fill-current" /> : <Play size={14} className="fill-current" />}
                                        <span>{isLoadingAudio ? '...' : playingMode === `opt_${index}` ? 'Stop' : 'Hear'}</span>
                                    </button>
                                </div>
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

                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginTop: '1rem' }}>
                                <button
                                    type="button"
                                    className="rock-exit-btn"
                                    onClick={handleRetryQuestion}
                                >
                                    Try Again
                                </button>
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
