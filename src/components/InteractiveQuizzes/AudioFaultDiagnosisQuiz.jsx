import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Square, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AudioFaultDiagnosisQuiz({ question, onResult }) {
    const [isPlayingFault, setIsPlayingFault] = useState(false);
    const [isPlayingClean, setIsPlayingClean] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const ctxRef = useRef(null);
    const activeNodesRef = useRef([]);
    const timerRef = useRef(null);

    const stopAudio = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        activeNodesRef.current.forEach((n) => {
            try {
                if (typeof n.stop === 'function') n.stop();
                n.disconnect();
            } catch (_) {}
        });
        activeNodesRef.current = [];
        setIsPlayingFault(false);
        setIsPlayingClean(false);
    };

    useEffect(() => {
        stopAudio();
        setSelectedIdx(null);
        setSubmitted(false);
        return () => stopAudio();
    }, [question]);

    const getCtx = async () => {
        if (!ctxRef.current) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            ctxRef.current = new AudioCtx();
        }
        if (ctxRef.current.state === 'suspended') {
            await ctxRef.current.resume();
        }
        return ctxRef.current;
    };

    const createNoiseBuffer = (ctx, seconds = 3) => {
        const bufferSize = ctx.sampleRate * seconds;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        return buffer;
    };

    const playSynthesizedExample = async (withFault) => {
        const currentlySame = withFault ? isPlayingFault : isPlayingClean;
        stopAudio();
        if (currentlySame) return;

        const ctx = await getCtx();
        const now = ctx.currentTime;
        const fault = question.fault_type;
        const master = ctx.createGain();
        master.gain.value = 0.65;
        master.connect(ctx.destination);
        activeNodesRef.current.push(master);

        if (withFault) setIsPlayingFault(true);
        else setIsPlayingClean(true);

        const duration = 3.2;

        // Helper to play a simple warm chord / musical tone base
        const playBaseTone = (dest, freqList = [110, 164.81, 220, 277.18]) => {
            freqList.forEach((f) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.value = f;
                g.gain.setValueAtTime(0.12, now);
                g.gain.exponentialRampToValueAtTime(0.05, now + duration);
                osc.connect(g);
                g.connect(dest);
                osc.start(now);
                osc.stop(now + duration);
                activeNodesRef.current.push(osc, g);
            });
        };

        if (fault === 'mains_hum') {
            // Musical guitar/bass chord + 50 Hz mains hum & 100/150 Hz harmonics
            playBaseTone(master, [130.81, 196.0, 261.63]);
            if (withFault) {
                [50, 100, 150].forEach((hz, idx) => {
                    const hum = ctx.createOscillator();
                    const humGain = ctx.createGain();
                    hum.type = idx === 0 ? 'sine' : 'sawtooth';
                    hum.frequency.value = hz;
                    humGain.gain.value = idx === 0 ? 0.35 : idx === 1 ? 0.12 : 0.06;
                    hum.connect(humGain);
                    humGain.connect(master);
                    hum.start(now);
                    hum.stop(now + duration);
                    activeNodesRef.current.push(hum, humGain);
                });
            }
        } else if (fault === 'phase_cancellation') {
            // Rich sawtooth synth summed with delayed/inverted copy -> hollow comb filtering
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.value = 110;
            const lpf = ctx.createBiquadFilter();
            lpf.type = 'lowpass';
            lpf.frequency.value = 2800;
            const dryGain = ctx.createGain();
            dryGain.gain.value = 0.28;
            osc.connect(lpf);
            lpf.connect(dryGain);
            dryGain.connect(master);

            if (withFault) {
                const delay = ctx.createDelay();
                delay.delayTime.value = 0.0018; // 1.8 ms comb cancellation
                const invGain = ctx.createGain();
                invGain.gain.value = -0.27;
                lpf.connect(delay);
                delay.connect(invGain);
                invGain.connect(master);
                activeNodesRef.current.push(delay, invGain);
            }
            osc.start(now);
            osc.stop(now + duration);
            activeNodesRef.current.push(osc, lpf, dryGain);
        } else if (fault === 'digital_clipping') {
            // Clean electric piano / bass vs hard-clipped waveshaper
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = 146.83;
            const osc2 = ctx.createOscillator();
            osc2.type = 'triangle';
            osc2.frequency.value = 220;

            if (withFault) {
                const shaper = ctx.createWaveShaper();
                const curve = new Float32Array(1024);
                for (let i = 0; i < 1024; i++) {
                    const x = (i * 2) / 1024 - 1;
                    curve[i] = Math.max(-0.22, Math.min(0.22, x * 4.5));
                }
                shaper.curve = curve;
                const pre = ctx.createGain();
                pre.gain.value = 1.6;
                const post = ctx.createGain();
                post.gain.value = 0.55;
                osc.connect(pre);
                osc2.connect(pre);
                pre.connect(shaper);
                shaper.connect(post);
                post.connect(master);
                activeNodesRef.current.push(shaper, pre, post);
            } else {
                const g = ctx.createGain();
                g.gain.value = 0.25;
                osc.connect(g);
                osc2.connect(g);
                g.connect(master);
                activeNodesRef.current.push(g);
            }
            osc.start(now);
            osc2.start(now);
            osc.stop(now + duration);
            osc2.stop(now + duration);
            activeNodesRef.current.push(osc, osc2);
        } else if (fault === 'noise_floor') {
            // Quiet chord with loud white noise hiss floor
            playBaseTone(master, [164.81, 246.94, 329.63]);
            if (withFault) {
                const noise = ctx.createBufferSource();
                noise.buffer = createNoiseBuffer(ctx, duration);
                const hpf = ctx.createBiquadFilter();
                hpf.type = 'highpass';
                hpf.frequency.value = 1800;
                const ng = ctx.createGain();
                ng.gain.value = 0.22;
                noise.connect(hpf);
                hpf.connect(ng);
                ng.connect(master);
                noise.start(now);
                activeNodesRef.current.push(noise, hpf, ng);
            }
        } else if (fault === 'edit_clicks') {
            // Smooth sustained chord with sharp splice clicks every 0.6s
            playBaseTone(master, [146.83, 220, 293.66]);
            if (withFault) {
                [0.45, 1.05, 1.65, 2.25, 2.85].forEach((offset) => {
                    const clickOsc = ctx.createOscillator();
                    const cg = ctx.createGain();
                    clickOsc.type = 'square';
                    clickOsc.frequency.value = 2400;
                    cg.gain.setValueAtTime(0.001, now + offset);
                    cg.gain.linearRampToValueAtTime(0.55, now + offset + 0.002);
                    cg.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.014);
                    clickOsc.connect(cg);
                    cg.connect(master);
                    clickOsc.start(now + offset);
                    clickOsc.stop(now + offset + 0.02);
                    activeNodesRef.current.push(clickOsc, cg);
                });
            }
        } else if (fault === 'sibilance') {
            // Simulated vocal vowel + piercing 6.8 kHz 'S' sibilance bursts
            playBaseTone(master, [196, 293.66]);
            [0.3, 1.2, 2.1].forEach((offset) => {
                const noise = ctx.createBufferSource();
                noise.buffer = createNoiseBuffer(ctx, 0.35);
                const bpf = ctx.createBiquadFilter();
                bpf.type = 'bandpass';
                bpf.frequency.value = 6800;
                bpf.Q.value = withFault ? 5.5 : 1.5;
                const sg = ctx.createGain();
                sg.gain.setValueAtTime(0.001, now + offset);
                sg.gain.linearRampToValueAtTime(withFault ? 0.52 : 0.1, now + offset + 0.04);
                sg.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.28);
                noise.connect(bpf);
                bpf.connect(sg);
                sg.connect(master);
                noise.start(now + offset);
                activeNodesRef.current.push(noise, bpf, sg);
            });
        } else if (fault === 'plosive') {
            // Vocal mid tone + heavy 65 Hz 'P' pop thump bursts
            playBaseTone(master, [196, 261.63]);
            if (withFault) {
                [0.35, 1.35, 2.35].forEach((offset) => {
                    const pop = ctx.createOscillator();
                    const pg = ctx.createGain();
                    pop.type = 'sine';
                    pop.frequency.setValueAtTime(110, now + offset);
                    pop.frequency.exponentialRampToValueAtTime(42, now + offset + 0.16);
                    pg.gain.setValueAtTime(0.85, now + offset);
                    pg.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
                    pop.connect(pg);
                    pg.connect(master);
                    pop.start(now + offset);
                    pop.stop(now + offset + 0.2);
                    activeNodesRef.current.push(pop, pg);
                });
            }
        } else if (fault === 'gate_chatter') {
            // Decaying guitar/pad with rapid stuttering gate chatter
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.value = 196;
            const gateGain = ctx.createGain();
            gateGain.gain.value = 0.3;

            if (withFault) {
                for (let t = 0.2; t < duration - 0.2; t += 0.14) {
                    gateGain.gain.setValueAtTime(0.32, now + t);
                    gateGain.gain.setValueAtTime(0.01, now + t + 0.06);
                }
            }
            osc.connect(gateGain);
            gateGain.connect(master);
            osc.start(now);
            osc.stop(now + duration);
            activeNodesRef.current.push(osc, gateGain);
        }

        timerRef.current = setTimeout(() => {
            stopAudio();
        }, duration * 1000);
    };

    const handleSubmit = () => {
        if (selectedIdx === null || submitted) return;
        setSubmitted(true);
        const ans = question.answers[selectedIdx];
        const isCorrect = ans?.is_true === 'yes' || ans?.is_true === true;
        if (onResult) onResult(isCorrect);
    };

    const handleImNotSure = () => {
        if (submitted) return;
        const correctIdx = question.answers.findIndex((a) => a.is_true === 'yes' || a.is_true === true);
        setSelectedIdx(correctIdx);
        setSubmitted(true);
        if (onResult) onResult(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Audio Listening Console */}
            <div style={{
                background: '#090d16',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Studio Listening Test
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Compare Faulty Audio vs Clean Reference
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={() => playSynthesizedExample(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '12px',
                            borderRadius: '8px',
                            border: isPlayingFault ? '1px solid #f43f5e' : '1px solid rgba(244, 63, 94, 0.45)',
                            background: isPlayingFault ? 'rgba(244, 63, 94, 0.25)' : 'rgba(244, 63, 94, 0.12)',
                            color: '#fda4af',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        {isPlayingFault ? <Square size={16} /> : <AlertTriangle size={16} />}
                        {isPlayingFault ? 'Stop Fault Audio' : 'Play Faulty Audio'}
                    </button>

                    <button
                        type="button"
                        onClick={() => playSynthesizedExample(false)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '12px',
                            borderRadius: '8px',
                            border: isPlayingClean ? '1px solid #22c55e' : '1px solid rgba(34, 197, 94, 0.4)',
                            background: isPlayingClean ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.1)',
                            color: '#86efac',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        {isPlayingClean ? <Square size={16} /> : <Volume2 size={16} />}
                        {isPlayingClean ? 'Stop Clean Audio' : 'Play Clean Audio'}
                    </button>
                </div>
            </div>

            {/* 4 Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {question.answers && question.answers.map((ans, idx) => {
                    const isThisCorrect = ans.is_true === 'yes' || ans.is_true === true;
                    let className = 'option-btn';
                    if (selectedIdx === idx) className += ' selected';
                    if (submitted) {
                        if (isThisCorrect) className += ' correct';
                        else if (selectedIdx === idx) className += ' incorrect';
                    }
                    return (
                        <button
                            key={idx}
                            type="button"
                            className={className}
                            onClick={() => !submitted && setSelectedIdx(idx)}
                            disabled={submitted}
                        >
                            {ans.text}
                        </button>
                    );
                })}
            </div>

            {/* Submit / I'm Not Sure */}
            {!submitted && (
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                    <button
                        type="button"
                        onClick={handleImNotSure}
                        style={{
                            padding: '10px 16px',
                            background: 'rgba(139, 92, 246, 0.12)',
                            color: '#c4b5fd',
                            border: '1px dashed rgba(139, 92, 246, 0.5)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 600
                        }}
                    >
                        I'm Not Sure
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={selectedIdx === null}
                        style={{
                            flex: 1,
                            padding: '10px 16px',
                            background: selectedIdx === null ? 'rgba(148, 163, 184, 0.2)' : 'var(--accent-purple, #8b5cf6)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: selectedIdx === null ? 'not-allowed' : 'pointer',
                            fontSize: '0.95rem',
                            fontWeight: 600
                        }}
                    >
                        Submit Answer
                    </button>
                </div>
            )}
        </div>
    );
}
