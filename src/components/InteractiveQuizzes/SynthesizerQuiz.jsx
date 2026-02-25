import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, Pause, Zap, Volume2, Settings, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import './SynthesizerQuiz.css';

const KnobComponent = ({ label, value, min, max, step, onChange, unit = '', isCorrect = null, targetValue = null, isLogScale = false, showFeedback = false }) => {
  let percentage = 0;
  if (isLogScale) {
    const minLog = Math.log10(min);
    const maxLog = Math.log10(max);
    const valLog = Math.log10(Math.max(value, min));
    percentage = ((valLog - minLog) / (maxLog - minLog)) * 100;
  } else {
    percentage = ((value - min) / (max - min)) * 100;
  }

  const rotation = (percentage / 100) * 270 - 135;

  let targetRotation = null;
  if (targetValue !== null) {
    if (isLogScale) {
      const minLog = Math.log10(min);
      const maxLog = Math.log10(max);
      const targetLog = Math.log10(Math.max(targetValue, min));
      const targetPercentage = ((targetLog - minLog) / (maxLog - minLog)) * 100;
      targetRotation = (targetPercentage / 100) * 270 - 135;
    } else {
      const targetPercentage = ((targetValue - min) / (max - min)) * 100;
      targetRotation = (targetPercentage / 100) * 270 - 135;
    }
  }

  const handlePointerDown = (e) => {
    if (showFeedback) return;
    e.preventDefault();

    const startY = e.clientY;
    const valMin = isLogScale ? Math.log10(min) : min;
    const valMax = isLogScale ? Math.log10(max) : max;
    const valRange = valMax - valMin;
    const startValue = isLogScale ? Math.log10(Math.max(value, min)) : value;

    // 200px drag equals full range
    const DRAG_SCALE = 200;

    const handlePointerMove = (moveEvent) => {
      // Up is positive, Down is negative
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

  return (
    <div className="synth-knob-container">
      <div
        className="synth-knob-wrapper"
        onPointerDown={handlePointerDown}
        style={{ touchAction: 'none', cursor: showFeedback ? 'default' : 'ns-resize' }}
      >
        <div className="synth-knob-shadow"></div>

        {targetRotation !== null && showFeedback && (
          <div
            className="synth-ghost-knob"
            style={{ transform: `rotate(${targetRotation}deg)` }}
          >
            <div className="synth-ghost-marker"></div>
          </div>
        )}

        <div
          className={`synth-knob-cap ${isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : 'neutral'}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className={`synth-knob-marker ${isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : 'neutral'}`}></div>
        </div>
      </div>

      <div className="synth-knob-label-box">
        <span className="synth-knob-label">{label}</span>
        <span className="synth-knob-value">{value.toFixed(value >= 10 ? 0 : 2)}{unit}</span>
        {showFeedback && isCorrect === false && targetValue !== null && (
          <span className="synth-knob-target-label" style={{ display: 'block', color: '#ef4444', fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>
            TARGET:<br />{targetValue.toFixed(targetValue >= 10 ? 0 : 2)}{unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default function SynthesizerQuiz({ onExit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  // const [aiExplanation, setAiExplanation] = useState('');
  // const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isPlayingUser, setIsPlayingUser] = useState(false);
  const [isPlayingTarget, setIsPlayingTarget] = useState(false);

  // Synth parameters
  const [synthParams, setSynthParams] = useState({
    waveform: 'sine',
    filterCutoff: 10000,
    filterResonance: 1,
    attack: 0.01,
    decay: 0.1,
    sustain: 1.0,
    release: 0.01,
    drive: 0.2, // New: Saturation amount
    reverb: 0.3 // New: Reverb mix
  });

  const audioContextRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const reverbBufferRef = useRef(null); // New: Store impulse response

  const questions = [
    {
      type: 'match-sound',
      question: 'Stage 1: The Bass',
      hint: 'Use a sawtooth or square wave, low filter cutoff to hide highs (200-500 Hz), short attack for punch.',
      target: {
        waveform: 'square', // Make bass deep square
        filterCutoff: 300,
        filterResonance: 1.5,
        attack: 0.01,
        decay: 0.2, // Faster decay for plucky bass
        sustain: 0.4,
        release: 0.1
      },
      tolerances: {
        filterCutoff: 300, // Very wide
        filterResonance: 3,
        attack: 0.1, // Easy
        decay: 0.35, // Easy
        sustain: 0.4,
        release: 0.4
      },
      explanation: 'Bass sounds use low-frequency waveforms with a low filter cutoff to remove bright, high frequencies. A quick attack gives the note punch.'
    },
    {
      type: 'match-sound',
      question: 'Stage 2: The Lead',
      hint: 'Use a bright sawtooth wave, high filter cutoff (3000+ Hz), fast attack, and fast release.',
      target: {
        waveform: 'sawtooth', // Classic bright lead
        filterCutoff: 4000,
        filterResonance: 5, // High resonance for character
        attack: 0.01,
        decay: 0.3,
        sustain: 0.7,
        release: 0.2
      },
      tolerances: {
        filterCutoff: 2000, // Extremely wide, anything bright passes
        filterResonance: 5, // Basically ignore resonance
        attack: 0.2,
        decay: 0.5,
        sustain: 0.5,
        release: 0.5
      },
      explanation: 'Leads need bright waveforms and an open filter to cut through a mix. This lead uses high resonance for a slightly nasal "squelch" character.'
    },
    {
      type: 'match-sound',
      question: 'Stage 3: The Pad',
      hint: 'Use a warm sine wave, moderate filter (800-1200 Hz), slow attack (0.8s), and long release (1.0s).',
      target: {
        waveform: 'sine', // Sine is distinctly different from saw/square
        filterCutoff: 1500,
        filterResonance: 0,
        attack: 0.8,
        decay: 0.5,
        sustain: 0.8,
        release: 1.5 // Long release
      },
      tolerances: {
        filterCutoff: 1000,
        filterResonance: 5,
        attack: 0.6, // Very loose attack
        decay: 0.8,
        sustain: 0.5,
        release: 1.0 // Very loose release
      },
      explanation: 'Pad sounds fill empty space in a song. They need a slow attack to swell in gradually, and a long release to fade out smoothly after you let go.'
    },
    {
      type: 'match-sound',
      question: 'Stage 4: The Pluck',
      hint: 'Use a square or saw wave, low-medium cutoff, instantaneous attack (0.0s), and very short decay (0.1s) with NO sustain.',
      target: {
        waveform: 'square',
        filterCutoff: 1000,
        filterResonance: 2,
        attack: 0.0,
        decay: 0.1,
        sustain: 0.0,
        release: 0.1
      },
      tolerances: {
        filterCutoff: 1000,
        filterResonance: 3,
        attack: 0.05,
        decay: 0.2, // Must be plucky
        sustain: 0.2, // Must be essentially zero
        release: 0.2
      },
      explanation: 'Plucks rely entirely on a lightning-fast Envelope. The attack is instantaneous, and the decay drops to zero sustain immediately.'
    },
    {
      type: 'match-sound',
      question: 'Stage 5: 80s Brass',
      hint: 'Use a bright sawtooth wave. A slow attack (0.2s) makes it "swell" slightly before holding strong at maximum sustain.',
      target: {
        waveform: 'sawtooth',
        filterCutoff: 3000,
        filterResonance: 1,
        attack: 0.2,
        decay: 0.1,
        sustain: 1.0,
        release: 0.3
      },
      tolerances: {
        filterCutoff: 2000,
        filterResonance: 4,
        attack: 0.15, // Look for the swell
        decay: 0.5,
        sustain: 0.4, // Look for high sustain
        release: 0.3
      },
      explanation: 'Synth brass is iconic for its "swell." A slightly slow attack mimics the time it takes a horn player to blow air through the instrument.'
    },
    {
      type: 'match-sound',
      question: 'Stage 6: Sub Boom',
      hint: 'Use a sine wave with the absolute lowest filter cutoff possible (20Hz-100Hz) to isolate only the lowest sub frequencies. Give it a long decay.',
      target: {
        waveform: 'sine',
        filterCutoff: 80,
        filterResonance: 0,
        attack: 0.01,
        decay: 1.0,
        sustain: 0.0,
        release: 0.8
      },
      tolerances: {
        filterCutoff: 150, // Must be very low
        filterResonance: 4,
        attack: 0.2,
        decay: 0.8,
        sustain: 0.4,
        release: 0.8
      },
      explanation: 'Sub bass is felt more than heard. A pure sine wave with all upper harmonics filtered out provides the ultimate clean low-end boom.'
    },
    {
      type: 'match-sound',
      question: 'Stage 7: Vintage Chiptune',
      hint: 'Square waves are the backbone of retro video game sounds. Open the filter completely (20000Hz) with no resonance for a harsh, raw tone.',
      target: {
        waveform: 'square',
        filterCutoff: 20000,
        filterResonance: 0,
        attack: 0.01,
        decay: 0.1,
        sustain: 0.5,
        release: 0.05
      },
      tolerances: {
        filterCutoff: 5000, // Very open
        filterResonance: 2,
        attack: 0.1,
        decay: 0.5,
        sustain: 0.5,
        release: 0.2 // Very abrupt
      },
      explanation: 'Old game consoles generated pure square waves with no filtering. A fast envelope with an abrupt release gives it that rigid, quantized feel.'
    },
    {
      type: 'match-sound',
      question: 'Stage 8: The Ghost Drone',
      hint: 'Use a sine wave with maximum resonance. Give it incredibly slow attack and release times (2.0s+) to make it slowly haunt the room.',
      target: {
        waveform: 'sine',
        filterCutoff: 800,
        filterResonance: 20, // Max resonance for howling
        attack: 2.0,
        decay: 0.1,
        sustain: 1.0,
        release: 2.5
      },
      tolerances: {
        filterCutoff: 600,
        filterResonance: 10, // Must have high res
        attack: 1.0, // Look for slow attack
        decay: 0.5,
        sustain: 0.5,
        release: 1.5 // Look for very slow release
      },
      explanation: 'High resonance makes a filter "howl" by emphasizing a specific frequency. Combining this with long, drawn-out envelopes creates eerie atmospheres.'
    },
    {
      type: 'match-sound',
      question: 'Stage 9: Soft Strings',
      hint: 'Use a sawtooth wave with a moderately low cutoff (roughly 600Hz). Strings need a smooth attack (0.5s) and a smooth release (0.8s).',
      target: {
        waveform: 'sawtooth',
        filterCutoff: 600,
        filterResonance: 1,
        attack: 0.5,
        decay: 0.5,
        sustain: 0.8,
        release: 0.8
      },
      tolerances: {
        filterCutoff: 400, // Medium-dark
        filterResonance: 3,
        attack: 0.25, // Semi-slow
        decay: 0.5,
        sustain: 0.4,
        release: 0.5 // Semi-slow
      },
      explanation: 'Bowed strings (like violins) sound like muffled sawtooth waves. They never hit their volume instantly, so a moderate attack is crucial.'
    },
    {
      type: 'match-sound',
      question: 'Stage 10: Hollow Bell',
      hint: 'Use a sine wave with a completely open filter, but give it a sharp attack, medium decay, and zero sustain. It should ring out.',
      target: {
        waveform: 'sine',
        filterCutoff: 15000,
        filterResonance: 0,
        attack: 0.01,
        decay: 1.5,
        sustain: 0.0,
        release: 1.0
      },
      tolerances: {
        filterCutoff: 6000, // Open
        filterResonance: 3,
        attack: 0.1, // Fast
        decay: 0.8, // Long decay
        sustain: 0.2, // Must be near zero
        release: 1.0
      },
      explanation: 'Bells ring out and decay naturally. They don\'t sustain indefinitely while you hold the key, which is why the Sustain must be zero.'
    }
  ];

  useEffect(() => {
    // Init Audio Context
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioCtor();
    const ctx = audioContextRef.current;

    // Create Analyser
    analyserRef.current = ctx.createAnalyser();

    // Create Reverb Impulse Response (Simple Room)
    const rate = ctx.sampleRate;
    const length = rate * 1.5; // 1.5 seconds tail
    const decay = 2.0;
    const impulse = ctx.createBuffer(2, length, rate);
    const impulseL = impulse.getChannelData(0);
    const impulseR = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      // const n = length - i;
      const multi = Math.pow(1 - i / length, decay);
      impulseL[i] = (Math.random() * 2 - 1) * multi;
      impulseR[i] = (Math.random() * 2 - 1) * multi;
    }
    reverbBufferRef.current = impulse;

    // Start visualizer loop
    let animationId;
    const draw = () => {
      if (!canvasRef.current || !analyserRef.current) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      const canvas = canvasRef.current;
      const ctx2d = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyserRef.current.getByteTimeDomainData(dataArray);

      // Clear with transparency for trail effect? No, solid is faster/cleaner
      ctx2d.fillStyle = 'rgb(15, 23, 42)'; // match bg-slate-900
      ctx2d.fillRect(0, 0, width, height);

      ctx2d.lineWidth = 2;
      ctx2d.strokeStyle = '#3b82f6'; // blue-500
      ctx2d.beginPath();

      const sliceWidth = width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * height / 2;

        if (i === 0) ctx2d.moveTo(x, y);
        else ctx2d.lineTo(x, y);

        x += sliceWidth;
      }

      ctx2d.lineTo(canvas.width, canvas.height / 2);
      ctx2d.stroke();

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

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

      saveQuizResult("Topic 34: Synthesizer Fundamentals", score, questions.length, grade);
    }
  }, [quizComplete, score, questions.length, saveQuizResult]);

  const playSound = (params, isTarget = false) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (isTarget) {
      setIsPlayingTarget(true);
    } else {
      setIsPlayingUser(true);
    }

    const now = ctx.currentTime;
    // Lower frequency for bass matching if needed, but keeping A3 (220) is standard.
    // However, user wants "realistic", maybe drop to A2 (110) for bassier synths?
    // Let's stick to 110Hz for a fatter sound.
    const noteFreq = 110;
    const noteDuration = params.attack + params.decay + 0.5;

    // --- OSCILLATORS (Dual Osc) ---
    // Osc 1: Main
    const osc1 = ctx.createOscillator();
    osc1.type = params.waveform;
    osc1.frequency.value = noteFreq;

    // Osc 2: Sub or Detune
    const osc2 = ctx.createOscillator();
    let osc2GainVal = 0.5; // Default mix

    if (params.waveform === 'sawtooth' || params.waveform === 'square') {
      // Unison Detune effect
      osc2.type = params.waveform;
      osc2.frequency.value = noteFreq;
      osc2.detune.value = 10; // +10 cents
      osc2GainVal = 0.6;
    } else {
      // Sub Oscillator (Sine/Triangle)
      osc2.type = params.waveform; // Keep same shape usually, or sine for sub
      osc2.frequency.value = noteFreq / 2; // Octave down
      osc2GainVal = 0.7;
    }

    const osc1Gain = ctx.createGain();
    const osc2Gain = ctx.createGain();
    const oscMix = ctx.createGain();

    osc1Gain.gain.value = 0.7; // Headroom
    osc2Gain.gain.value = osc2GainVal;

    osc1.connect(osc1Gain);
    osc2.connect(osc2Gain);
    osc1Gain.connect(oscMix);
    osc2Gain.connect(oscMix);

    // --- SATURATION (Drive) ---
    const shaper = ctx.createWaveShaper();
    // Simple soft clipping curve
    const curve = new Float32Array(4096);
    const driveAmt = 0.5; // Fixed drive for "analogue" warmth
    for (let i = 0; i < 4096; i++) {
      const x = (i * 2) / 4096 - 1;
      curve[i] = ((3 + driveAmt) * x * 20 * Math.PI / (Math.PI + driveAmt * Math.abs(x))) * 0.1; // Soft clip
    }
    shaper.curve = curve;
    shaper.oversample = '4x';

    // --- FILTER ---
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = Math.max(20, Math.min(20000, params.filterCutoff));
    filter.Q.value = params.filterResonance;

    // --- AMP ENVELOPE (VCA) ---
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);

    // ADSR Implementation
    // Attack
    masterGain.gain.linearRampToValueAtTime(0.5, now + params.attack);
    // Decay -> Sustain
    masterGain.gain.linearRampToValueAtTime(
      0.5 * params.sustain,
      now + params.attack + params.decay
    );
    // Sustain Hold
    const sustainTime = 0.5;
    masterGain.gain.setValueAtTime(
      0.5 * params.sustain,
      now + params.attack + params.decay + sustainTime
    );
    // Release
    masterGain.gain.linearRampToValueAtTime(
      0.001,
      now + params.attack + params.decay + sustainTime + params.release
    );

    // --- EFFECTS: Reverb ---
    const convolver = ctx.createConvolver();
    if (reverbBufferRef.current) {
      convolver.buffer = reverbBufferRef.current;
    }
    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.25; // Wet level for reverb

    // --- ROUTING ---
    // Signal Path: OscMix -> Shaper -> Filter -> MasterGain -> [Split] -> Destination
    oscMix.connect(shaper);
    shaper.connect(filter);
    filter.connect(masterGain);

    // Dry Path
    masterGain.connect(ctx.destination);

    // Wet Path (Reverb)
    masterGain.connect(convolver);
    convolver.connect(reverbGain);
    reverbGain.connect(ctx.destination);

    // Visualizer Connect
    if (analyserRef.current) {
      masterGain.connect(analyserRef.current);
    }

    // --- TRANSPORT ---
    osc1.start(now);
    osc2.start(now);

    const stopTime = now + noteDuration + params.release;
    osc1.stop(stopTime);
    osc2.stop(stopTime);

    // Reset playing state
    setTimeout(() => {
      if (isTarget) {
        setIsPlayingTarget(false);
      } else {
        setIsPlayingUser(false);
      }
    }, (noteDuration + params.release) * 1000);
  };

  const updateParam = (param, value) => {
    if (showFeedback) return;
    setSynthParams(prev => ({ ...prev, [param]: value }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in a text input (not relevant here, but safe practice)
      if (e.target.tagName.toLowerCase() === 'input' && e.target.type !== 'range') return;

      if (e.key.toLowerCase() === 't') {
        if (!isPlayingTarget) playSound(questions[currentQuestion].target, true);
      } else if (e.key.toLowerCase() === 'u') {
        if (!isPlayingUser) playSound(synthParams, false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, questions, synthParams, isPlayingTarget, isPlayingUser]);

  const checkMatch = async () => {
    const q = questions[currentQuestion];

    // Check if all parameters are within tolerance
    const waveformMatch = synthParams.waveform === q.target.waveform;
    const filterCutoffMatch = Math.abs(synthParams.filterCutoff - q.target.filterCutoff) <= q.tolerances.filterCutoff;
    const filterResonanceMatch = Math.abs(synthParams.filterResonance - q.target.filterResonance) <= q.tolerances.filterResonance;
    const attackMatch = Math.abs(synthParams.attack - q.target.attack) <= q.tolerances.attack;
    const decayMatch = Math.abs(synthParams.decay - q.target.decay) <= q.tolerances.decay;
    const sustainMatch = Math.abs(synthParams.sustain - q.target.sustain) <= q.tolerances.sustain;
    const releaseMatch = Math.abs(synthParams.release - q.target.release) <= q.tolerances.release;

    const isCorrect = waveformMatch && filterCutoffMatch && filterResonanceMatch &&
      attackMatch && decayMatch && sustainMatch && releaseMatch;

    setSelectedAnswer(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };



  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      // setAiExplanation('');

      // Reset synth to defaults
      setSynthParams({
        waveform: 'sawtooth',
        filterCutoff: 1000,
        filterResonance: 1,
        attack: 0.1,
        decay: 0.2,
        sustain: 0.7,
        release: 0.3
      });
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
    setShowIntro(true);
    resultsSavedRef.current = false;
    setSynthParams({
      waveform: 'sine',
      filterCutoff: 10000,
      filterResonance: 1,
      attack: 0.01,
      decay: 0.1,
      sustain: 1.0,
      release: 0.01,
      drive: 0.2,
      reverb: 0.3
    });
  };

  const retryPatch = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };





  const renderQuestion = () => {
    const q = questions[currentQuestion];

    const paramChecks = showFeedback ? {
      waveform: synthParams.waveform === q.target.waveform,
      filterCutoff: Math.abs(synthParams.filterCutoff - q.target.filterCutoff) <= q.tolerances.filterCutoff,
      filterResonance: Math.abs(synthParams.filterResonance - q.target.filterResonance) <= q.tolerances.filterResonance,
      attack: Math.abs(synthParams.attack - q.target.attack) <= q.tolerances.attack,
      decay: Math.abs(synthParams.decay - q.target.decay) <= q.tolerances.decay,
      sustain: Math.abs(synthParams.sustain - q.target.sustain) <= q.tolerances.sustain,
      release: Math.abs(synthParams.release - q.target.release) <= q.tolerances.release
    } : {};

    return (
      <div className="space-y-6">
        <div className="synth-panel-container">
          <div className="synth-bg-icon">
            <Zap size={200} />
          </div>

          <div className="synth-top-section">
            <div className="synth-visualizer">
              <div className="synth-vis-bg"></div>
              <div className="synth-vis-scanlines"></div>

              <canvas
                ref={canvasRef}
                width={800}
                height={200}
                className="synth-vis-canvas"
              />
              <div className="synth-vis-legend">
                <div className="synth-legend-item">
                  <span className={`synth-led target ${isPlayingTarget ? 'active' : ''}`}></span>
                  <span className="synth-legend-text">Target</span>
                </div>
                <div className="synth-legend-item">
                  <span className={`synth-led user ${isPlayingUser ? 'active' : ''}`}></span>
                  <span className="synth-legend-text">User</span>
                </div>
              </div>
            </div>

            <div className="synth-transport">
              <button
                onClick={() => playSound(q.target, true)}
                disabled={isPlayingTarget}
                className={`synth-btn synth-btn-target ${isPlayingTarget ? 'active' : ''}`}
                title="Press 'T' to play target sound"
              >
                {isPlayingTarget ? <Pause size={20} /> : <Play size={20} className="fill-current" />}
                TARGET (T)
              </button>
              <button
                onClick={() => playSound(synthParams, false)}
                disabled={isPlayingUser}
                className={`synth-btn synth-btn-user ${isPlayingUser ? 'active' : ''}`}
                title="Press 'U' to play your patch"
              >
                {isPlayingUser ? <Pause size={20} /> : <Volume2 size={20} />}
                MY PATCH (U)
              </button>
            </div>
          </div>

          <div className="synth-modules">

            <div className="synth-module">
              <div className="synth-module-glare osc"></div>
              <div className="synth-module-header">
                <div className="synth-module-led osc"></div> OSCILLATOR
              </div>
              <div className="synth-wave-container">
                <label className="synth-wave-label">Waveform</label>
                <div className="synth-wave-buttons">
                  {['sine', 'square', 'sawtooth'].map(type => (
                    <button
                      key={type}
                      onClick={() => !showFeedback && updateParam('waveform', type)}
                      className={`synth-wave-btn ${synthParams.waveform === type ? 'active' : ''}`}
                    >
                      {type === 'sine' ? 'SINE' : type === 'square' ? 'SQR' : 'SAW'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="synth-module">
              <div className="synth-module-glare flt"></div>
              <div className="synth-module-header">
                <div className="synth-module-led flt"></div> FILTER
              </div>
              <div className="synth-knobs-grid flt">
                <KnobComponent label="Cutoff" value={synthParams.filterCutoff} min={20} max={20000} step={10} onChange={(v) => updateParam('filterCutoff', v)} unit="Hz" isCorrect={paramChecks.filterCutoff} targetValue={q.target.filterCutoff} isLogScale={true} showFeedback={showFeedback} />
                <KnobComponent label="Res" value={synthParams.filterResonance} min={0} max={20} step={0.1} onChange={(v) => updateParam('filterResonance', v)} unit="" isCorrect={paramChecks.filterResonance} targetValue={q.target.filterResonance} showFeedback={showFeedback} />
              </div>
            </div>

            <div className="synth-module">
              <div className="synth-module-glare env"></div>
              <div className="synth-module-header">
                <div className="synth-module-led env"></div> ENVELOPE
              </div>
              <div className="synth-knobs-grid env">
                <KnobComponent label="Attack" value={synthParams.attack} min={0} max={2} step={0.01} onChange={(v) => updateParam('attack', v)} unit="s" isCorrect={paramChecks.attack} targetValue={q.target.attack} showFeedback={showFeedback} />
                <KnobComponent label="Decay" value={synthParams.decay} min={0} max={2} step={0.01} onChange={(v) => updateParam('decay', v)} unit="s" isCorrect={paramChecks.decay} targetValue={q.target.decay} showFeedback={showFeedback} />
                <KnobComponent label="Sustain" value={synthParams.sustain} min={0} max={1} step={0.01} onChange={(v) => updateParam('sustain', v)} unit="" isCorrect={paramChecks.sustain} targetValue={q.target.sustain} showFeedback={showFeedback} />
                <KnobComponent label="Release" value={synthParams.release} min={0} max={5} step={0.01} onChange={(v) => updateParam('release', v)} unit="s" isCorrect={paramChecks.release} targetValue={q.target.release} showFeedback={showFeedback} />
              </div>
            </div>

          </div>
        </div>

        <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px' }}>
          <p style={{ fontSize: '0.875rem', color: '#93c5fd', margin: 0 }}>
            🎛️ <strong>Listen to the Target</strong> sound, then adjust your synth parameters to match it!
          </p>
        </div>

        {!showFeedback && (
          <button
            onClick={checkMatch}
            className="btn-primary synth-check-btn"
          >
            Check Sound Match
          </button>
        )}

        {showFeedback && (
          <div className={`synth-feedback-box ${selectedAnswer === true ? 'correct' : 'incorrect'}`}>
            <div className={`synth-feedback-header ${selectedAnswer === true ? 'correct' : 'incorrect'}`}>
              {selectedAnswer === true ? (
                <>
                  <Check className="synth-feedback-icon" />
                  <span>Perfect Match! 🎹</span>
                </>
              ) : (
                <>
                  <X className="synth-feedback-icon" />
                  <span>Not quite - check the red knobs!</span>
                </>
              )}
            </div>
            <p className="synth-feedback-desc">{q.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  if (showIntro) {
    return (
      <div className="quiz-container">
        <div className="question-card synth-intro-container">
          <div className="synth-intro-icon"><Zap size={64} /></div>
          <h1 className="synth-intro-title">Synthesizer Programming</h1>
          <p className="synth-intro-subtitle">Skills taught: Subtractive synthesis basics</p>

          <div className="synth-mission-box">
            <h2 className="synth-mission-header">
              <Zap size={24} /> Mission Briefing
            </h2>
            <div className="synth-mission-steps">
              <div className="synth-mission-step">
                <div className="synth-step-icon listen">
                  <Volume2 size={28} />
                </div>
                <div className="synth-step-content">
                  <h3>Listen to the Target</h3>
                  <p>Target sounds will play repeatedly. Identify the waveform, filter, and ADSR envelope.</p>
                </div>
              </div>
              <div className="synth-mission-step">
                <div className="synth-step-icon patch">
                  <Settings size={28} />
                </div>
                <div className="synth-step-content">
                  <h3>Patch the Synth</h3>
                  <p>Adjust the interactive knobs to recreate the target sound you analyze.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowIntro(false)}
            className="btn-primary synth-enter-btn"
          >
            Enter Synth Lab <ArrowRight size={20} />
          </button>

          <button onClick={onExit} className="synth-back-btn">
            Back to Dashboard
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
        <h2 style={{ fontSize: '2rem', color: 'white' }}>{percentage}%</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
          You scored {score} out of {questions.length}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={resetQuiz}
            className="btn-primary flex items-center gap-2"
          >
            <RotateCcw size={20} />
            {percentage < 100 ? 'Try Again' : 'Retake Quiz'}
          </button>
          <button
            onClick={onExit}
            className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-slate-800 text-gray-300 font-medium"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Synthesizer Sound Design • Question {currentQuestion + 1} of {questions.length}
      </div>

      <div className="question-card" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="font-bold text-xl mb-4 text-white">
          {questions[currentQuestion].question}
        </div>

        {/* Hint */}
        {questions[currentQuestion].hint && (
          <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex items-start gap-2">
              <Lightbulb className="text-yellow-500 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-semibold text-yellow-500">Hint</p>
                <p className="text-sm text-yellow-300">{questions[currentQuestion].hint}</p>
              </div>
            </div>
          </div>
        )}

        {renderQuestion()}

        {/* Navigation */}
        {showFeedback && (
          <div className="flex justify-end mt-6 pt-6 border-t border-slate-700 gap-4">
            {selectedAnswer === false && (
              <button
                onClick={retryPatch}
                className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 hover:bg-slate-800 transition-colors text-white"
              >
                <RotateCcw size={20} />
                Try Again
              </button>
            )}
            <button
              onClick={nextQuestion}
              className="btn-primary flex items-center gap-2"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              <Play size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}