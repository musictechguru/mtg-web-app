import fs from 'fs';

const filePath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/components/InteractiveQuizzes/RockProductionQuiz.jsx';
let content = fs.readFileSync(filePath, 'utf-8');

const newLogic = `        const addSource = (src) => activeSources.current.push(src);

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
                    const riffPattern = [ {t:0.5, f:82.41}, {t:0.9, f:82.41}, {t:1.3, f:110.00}, {t:1.7, f:98.00}, {t:2.1, f:82.41} ];

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
                        bOsc.start(now+t); bOsc.stop(now+t+0.5); addSource(bOsc);
                        
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
                    faderGain.gain.setValueAtTime(0.6, now+2.4); 
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
        }`;

const startMarker = "const addSource = (src) => activeSources.current.push(src);";
const endMarker = "        setTimeout(() => {";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const updatedContent = content.substring(0, startIndex) + newLogic + "\\n\\n" + content.substring(endIndex);
    fs.writeFileSync(filePath, updatedContent);
    console.log("Successfully replaced audio synthesis engine.");
} else {
    console.error("Markers not found in the file.");
}
