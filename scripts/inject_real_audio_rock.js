import fs from 'fs';
const filePath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/components/InteractiveQuizzes/RockProductionQuiz.jsx';

let fileContent = fs.readFileSync(filePath, 'utf8');

const newCode = `
    const [isLoadingAudio, setIsLoadingAudio] = useState(true);
    const audioBuffers = useRef({});

    // Initialize AudioContext
    useEffect(() => {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtor();

        const loadAudio = async () => {
            const ctx = audioContextRef.current;
            const files = {
                bass: '/audio/rock_raw/bass_di.mp3',
                drums: '/audio/rock_raw/drum_loop_clean.mp3',
                guitar_riff: '/audio/rock_raw/guitar_di_riff.mp3',
                guitar_solo: '/audio/rock_raw/guitar_di_solo.mp3',
                snare: '/audio/rock_raw/snare_dry.mp3',
                vocal: '/audio/rock_raw/vocal_dry_verse.mp3'
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

    const playAudioExample = () => {
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

                    // Reverb emulation using short delays and diffused noise
                    const revNoiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
                    const output = revNoiseBuffer.getChannelData(0);
                    for (let i = 0; i < ctx.sampleRate * 2; i++) { output[i] = Math.random() * 2 - 1; }
                    const revNoise = ctx.createBufferSource();
                    revNoise.buffer = revNoiseBuffer;

                    const revFilter = ctx.createBiquadFilter();
                    revFilter.type = 'bandpass';
                    revFilter.frequency.value = 1500;
                    
                    const revEnv = ctx.createGain();
                    revEnv.gain.setValueAtTime(0, now);
                    revEnv.gain.linearRampToValueAtTime(0.6, now + 0.01);
                    // The "Gate" snapping shut
                    revEnv.gain.setValueAtTime(0.6, now + 0.4); 
                    revEnv.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

                    revNoise.connect(revFilter);
                    revFilter.connect(revEnv);
                    revEnv.connect(masterGain);
                    
                    revNoise.start(now);
                    revNoise.stop(now + 2);
                    addSource(revNoise);
                }
                break;

            case 1: // Parallel Compression (Drums)
                {
                    playDuration = 4;
                    const cleanKitGain = ctx.createGain();
                    cleanKitGain.gain.value = 0.8;
                    cleanKitGain.connect(masterGain);

                    const smashComp = ctx.createDynamicsCompressor();
                    smashComp.threshold.value = -35;
                    smashComp.ratio.value = 15;
                    smashComp.attack.value = 0.005;
                    smashComp.release.value = 0.3;
                    const smashGain = ctx.createGain();
                    smashGain.gain.value = 1.8; 
                    smashComp.connect(smashGain);
                    smashGain.connect(masterGain);

                    playBuffer('drums', now, cleanKitGain);
                    playBuffer('drums', now, smashComp);
                }
                break;

            case 2: // Double-Tracking Guitars
                {
                    playDuration = 5;
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
                break;

            case 3: // Amp Simulation
                {
                    playDuration = 5;
                    const diGain = ctx.createGain();
                    diGain.gain.value = 1.5;
                    diGain.connect(masterGain);
                    
                    // Play clean DI for 2.5 seconds
                    const src1 = playBuffer('guitar_solo', now, diGain);
                    if(src1) {
                        src1.stop(now + 2.5);
                    }

                    // Then blast the amp simulation for the rest
                    const ampOut = ctx.createGain();
                    ampOut.gain.value = 1.0;
                    ampOut.connect(masterGain);
                    const ampSimInput = createAmpSim(ampOut, 20);
                    
                    const src2 = playBuffer('guitar_solo', now + 2.5, ampSimInput);
                }
                break;
                
            case 4: // Bass/Guitar Masking Fix
                {
                    playDuration = 6;
                    const mixGain = ctx.createGain();
                    mixGain.gain.value = 0.8;
                    mixGain.connect(masterGain);

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
                }
                break;

            case 5: // Slapback Vocal
                {
                    playDuration = 5;
                    const vocalDry = ctx.createGain();
                    vocalDry.connect(masterGain);

                    const delay = ctx.createDelay();
                    delay.delayTime.value = 0.13; // 130ms slap
                    const delayLevel = ctx.createGain();
                    delayLevel.gain.value = 0.6; // No feedback = single slap
                    
                    delay.connect(delayLevel);
                    delayLevel.connect(masterGain);

                    const vocalSrc = playBuffer('vocal', now, vocalDry);
                    if (vocalSrc) {
                        vocalSrc.connect(delay); // Send to slapback
                    }
                }
                break;

            case 6: // Vocal Riding
                {
                    playDuration = 5;
                    const riderGain = ctx.createGain();
                    riderGain.connect(masterGain);

                    // Assuming vocal file has natural dynamics, we exaggerate them then "ride" them
                    riderGain.gain.setValueAtTime(1.0, now);
                    riderGain.gain.linearRampToValueAtTime(0.3, now + 2.5); // Bring down the loud part to keep it even
                    
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

                    // Flip the phase alignment automatically at 2 seconds
                    phaseInvert.gain.setValueAtTime(-1, now);
                    phaseInvert.gain.setValueAtTime(1, now + 2.0); 
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
`;

// Replace finding the proper points in RockProductionQuiz.jsx
// We need to replace from useEffect(() => { const AudioCtor = ... }) down to the setTimeout ... };

const replaceStartMarker = "// Initialize AudioContext";
const replaceEndMarker = "        setTimeout(() => {\n            setIsPlaying(false);\n            activeSources.current = [];\n        }, playDuration * 1000);\n    };";

const startIndex = fileContent.indexOf(replaceStartMarker);
const endIndex = fileContent.indexOf(replaceEndMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const startStr = fileContent.substring(0, startIndex);
    const endStr = fileContent.substring(endIndex + replaceEndMarker.length);

    fs.writeFileSync(filePath, startStr + newCode + endStr);
    console.log("Successfully patched RockProductionQuiz.jsx");
} else {
    console.log("Could not find markers.", { startIndex, endIndex });
}
