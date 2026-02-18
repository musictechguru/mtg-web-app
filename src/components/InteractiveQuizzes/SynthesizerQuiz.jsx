import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, Pause } from 'lucide-react';

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
      question: 'Create a deep, fat bass sound',
      hint: 'Use a sawtooth or square wave, low filter cutoff (200-500 Hz), short attack',
      target: {
        waveform: 'sawtooth',
        filterCutoff: 350,
        filterResonance: 2,
        attack: 0.01,
        decay: 0.3,
        sustain: 0.6,
        release: 0.2
      },
      tolerances: {
        filterCutoff: 150,
        filterResonance: 1,
        attack: 0.05,
        decay: 0.2,
        sustain: 0.2,
        release: 0.2
      },
      explanation: 'Bass sounds use low-frequency waveforms (sawtooth/square) with low filter cutoff to remove high frequencies. Quick attack gives punch, moderate sustain provides body.'
    },
    {
      type: 'match-sound',
      question: 'Create a bright, plucky lead synth',
      hint: 'Square or sawtooth wave, higher filter cutoff (2000+ Hz), fast attack and release',
      target: {
        waveform: 'square',
        filterCutoff: 2500,
        filterResonance: 3,
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1
      },
      tolerances: {
        filterCutoff: 500,
        filterResonance: 1.5,
        attack: 0.02,
        decay: 0.1,
        sustain: 0.2,
        release: 0.1
      },
      explanation: 'Plucky leads need bright waveforms (square/saw), open filter for brightness, and short envelope for a percussive "pluck" effect. High resonance adds character!'
    },
    {
      type: 'multiple-choice',
      question: 'What does the "Attack" parameter in an ADSR envelope control?',
      hint: 'Think about the beginning of a sound',
      options: [
        'How loud the sound is',
        'How long it takes for the sound to reach full volume',
        'How long the sound lasts',
        'How bright the sound is'
      ],
      correct: 1,
      explanation: 'Attack is the time it takes for a sound to go from silence to peak volume. Fast attack (0.01s) = instant/percussive. Slow attack (1s+) = gradual swell, like strings.'
    },
    {
      type: 'match-sound',
      question: 'Create a warm, lush pad sound',
      hint: 'Sawtooth wave, moderate filter (800-1200 Hz), slow attack and release',
      target: {
        waveform: 'sawtooth',
        filterCutoff: 1000,
        filterResonance: 1.5,
        attack: 0.8,
        decay: 0.5,
        sustain: 0.8,
        release: 1.0
      },
      tolerances: {
        filterCutoff: 300,
        filterResonance: 1,
        attack: 0.3,
        decay: 0.3,
        sustain: 0.2,
        release: 0.5
      },
      explanation: 'Pads need slow attack for gradual swell, high sustain to hold the sound, and long release for smooth fade-out. Moderate filter keeps it warm, not harsh.'
    },
    {
      type: 'multiple-choice',
      question: 'What does a low-pass filter do?',
      hint: 'Think about which frequencies pass through',
      options: [
        'Removes low frequencies, keeps high frequencies',
        'Removes high frequencies, keeps low frequencies',
        'Makes the sound quieter',
        'Adds reverb'
      ],
      correct: 1,
      explanation: 'A low-pass filter lets LOW frequencies pass through while cutting HIGH frequencies. Lower cutoff = darker sound. This is the most common filter type in synthesis!'
    },
    {
      type: 'match-sound',
      question: 'Create a stab/brass sound',
      hint: 'Sawtooth wave, medium-high filter (1500 Hz), medium attack (0.1-0.2s)',
      target: {
        waveform: 'sawtooth',
        filterCutoff: 1500,
        filterResonance: 4,
        attack: 0.15,
        decay: 0.3,
        sustain: 0.5,
        release: 0.2
      },
      tolerances: {
        filterCutoff: 400,
        filterResonance: 2,
        attack: 0.1,
        decay: 0.2,
        sustain: 0.3,
        release: 0.2
      },
      explanation: 'Brass/stab sounds use medium attack for that "punch-in" feel, moderate filter for brightness, and high resonance for the characteristic "honk". Classic 80s synth!'
    },
    {
      type: 'envelope-draw',
      question: 'Which ADSR envelope shape matches a piano sound?',
      hint: 'Piano has instant attack, quick decay, then gradual fade',
      options: [
        { attack: 0.8, decay: 0.5, sustain: 0.8, release: 1.0, label: 'Slow swell (pad)' },
        { attack: 0.01, decay: 0.3, sustain: 0.3, release: 0.5, label: 'Fast attack, quick decay (piano)' },
        { attack: 0.01, decay: 0.1, sustain: 0.9, release: 0.1, label: 'Fast attack, high sustain (organ)' },
        { attack: 0.5, decay: 0.2, sustain: 0.7, release: 0.3, label: 'Medium attack (strings)' }
      ],
      correct: 1,
      explanation: 'Piano has instant attack (hammer hits string immediately), quick decay as the note fades, moderate sustain while key is held, and medium release when key lifts.'
    },
    {
      type: 'match-sound',
      question: 'Create a bell/pluck sound',
      hint: 'Sine or triangle wave, high filter, very short attack and release',
      target: {
        waveform: 'sine',
        filterCutoff: 3000,
        filterResonance: 5,
        attack: 0.01,
        decay: 0.5,
        sustain: 0.1,
        release: 0.4
      },
      tolerances: {
        filterCutoff: 800,
        filterResonance: 2,
        attack: 0.02,
        decay: 0.3,
        sustain: 0.2,
        release: 0.3
      },
      explanation: 'Bell sounds use pure waveforms (sine/triangle), instant attack, quick decay to low sustain, and medium release. High resonance creates that metallic "ring"!'
    },
    {
      type: 'multiple-choice',
      question: 'What does "Resonance" do on a filter?',
      hint: 'It emphasizes something at the cutoff frequency',
      options: [
        'Makes the sound louder overall',
        'Creates a peak/emphasis at the cutoff frequency',
        'Changes the waveform',
        'Adds delay'
      ],
      correct: 1,
      explanation: 'Resonance (also called "Q") creates a boost at the filter cutoff frequency. High resonance = pronounced peak, can self-oscillate. Used for "acid" sounds and character!'
    },
    {
      type: 'match-sound',
      question: 'Create a sub-bass sound (lowest bass)',
      hint: 'Sine wave (purest low end), very low filter (100-200 Hz), short envelope',
      target: {
        waveform: 'sine',
        filterCutoff: 150,
        filterResonance: 1,
        attack: 0.01,
        decay: 0.2,
        sustain: 0.7,
        release: 0.15
      },
      tolerances: {
        filterCutoff: 100,
        filterResonance: 0.5,
        attack: 0.02,
        decay: 0.15,
        sustain: 0.2,
        release: 0.15
      },
      explanation: 'Sub-bass uses sine waves for pure, clean low frequencies. Very low filter cutoff (100-200 Hz), minimal resonance to avoid muddiness. Common in electronic music!'
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

  const checkMatch = async () => {
    const q = questions[currentQuestion];

    if (q.type === 'match-sound') {
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

      // await getAIExplanation(q, isCorrect);
    }
  };

  const handleMultipleChoice = async (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const currentQ = questions[currentQuestion];
    const isCorrect = answer === currentQ.correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    // await getAIExplanation(currentQ, isCorrect);
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
    // setAiExplanation('');
    setShowIntro(true);
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



  const renderADSREnvelope = (a, d, s, r, mini = false) => {
    const width = mini ? 120 : 200;
    const height = mini ? 60 : 100;
    const padding = 10;

    // Normalize to canvas
    const totalTime = a + d + 0.3 + r; // 0.3 for sustain hold time
    const attackX = padding + (a / totalTime) * (width - 2 * padding);
    const decayX = attackX + (d / totalTime) * (width - 2 * padding);
    const sustainX = decayX + (0.3 / totalTime) * (width - 2 * padding);
    const releaseX = width - padding;

    const topY = padding;
    const sustainY = padding + (1 - s) * (height - 2 * padding);
    const bottomY = height - padding;

    const path = `
      M ${padding},${bottomY}
      L ${attackX},${topY}
      L ${decayX},${sustainY}
      L ${sustainX},${sustainY}
      L ${releaseX},${bottomY}
    `;

    return (
      <svg width={width} height={height} className={`bg-slate-900 rounded ${mini ? '' : 'border border-slate-700'}`}>
        <path
          d={path}
          fill="none"
          stroke="#00ff88"
          strokeWidth="2"
        />
        {!mini && (
          <>
            <text x={attackX / 2} y={height - 5} fill="#888" fontSize="10" textAnchor="middle">A</text>
            <text x={(attackX + decayX) / 2} y={height - 5} fill="#888" fontSize="10" textAnchor="middle">D</text>
            <text x={(decayX + sustainX) / 2} y={height - 5} fill="#888" fontSize="10" textAnchor="middle">S</text>
            <text x={(sustainX + releaseX) / 2} y={height - 5} fill="#888" fontSize="10" textAnchor="middle">R</text>
          </>
        )}
      </svg>
    );
  };

  const renderKnob = (label, value, min, max, step, onChange, unit = '', isCorrect = null, targetValue = null) => {
    const percentage = ((value - min) / (max - min)) * 100;
    const rotation = (percentage / 100) * 270 - 135;

    // Calculate target rotation if provided
    let targetRotation = null;
    if (targetValue !== null) {
      const targetPercentage = ((targetValue - min) / (max - min)) * 100;
      targetRotation = (targetPercentage / 100) * 270 - 135;
    }

    return (
      <div className="flex flex-col items-center group relative">
        <div className="relative w-16 h-16 mb-2">
          {/* Knob Background/Shadow */}
          <div className="absolute inset-0 rounded-full bg-slate-900 border border-slate-700 shadow-xl"></div>

          {/* Target Ghost Knob (Only show if targetValue exists and feedback is shown) */}
          {targetRotation !== null && showFeedback && (
            <div
              className="absolute inset-1 rounded-full border-2 border-dashed border-white/30 pointer-events-none z-0"
              style={{ transform: `rotate(${targetRotation}deg)` }}
            >
              <div className="absolute top-1 left-1/2 w-1 h-3 -translate-x-1/2 rounded-full bg-white/50"></div>
            </div>
          )}

          {/* The Rotating Cap */}
          <div
            className={`absolute inset-1 rounded-full border-2 cursor-pointer transition-transform duration-75 ease-out shadow-md z-10
              ${isCorrect === true ? 'border-green-500 bg-slate-800' :
                isCorrect === false ? 'border-red-500 bg-slate-800' :
                  'border-slate-600 bg-slate-800 hover:border-blue-500'}`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Marker */}
            <div className={`absolute top-1 left-1/2 w-1 h-3 -translate-x-1/2 rounded-full
                ${isCorrect === true ? 'bg-green-500' :
                isCorrect === false ? 'bg-red-500' : 'bg-slate-300'}`}></div>
          </div>

          {/* Touch Target (Invisible Range Input) */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            disabled={showFeedback}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize z-10"
            title={`${label}: ${value.toFixed(2)}${unit}`}
          />
        </div>

        <div className="text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{label}</span>
          <span className="text-[10px] font-mono text-blue-400">{value.toFixed(value >= 10 ? 0 : 2)}{unit}</span>
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];

    if (q.type === 'match-sound') {
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
          {/* Main Synth Panel */}
          <div className="rounded-xl p-8 border-t-4 border-slate-700 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(30, 41, 59, 0.8)' }}>
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Zap size={120} />
            </div>

            {/* 1. Top Section: Visualizer & Transport */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8 relative z-10">
              {/* Visualizer */}
              <div className="flex-grow bg-black rounded-lg border border-slate-700 relative overflow-hidden h-32 lg:h-40 shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black opacity-50"></div>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={160}
                  className="w-full h-full relative z-10"
                />
                <div className="absolute top-3 right-3 flex flex-col items-end pointer-events-none z-20">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isPlayingTarget ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`}></span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Target</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isPlayingUser ? 'bg-purple-500 animate-pulse' : 'bg-slate-700'}`}></span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">User</span>
                  </div>
                </div>
              </div>

              {/* Play Controls */}
              <div className="flex lg:flex-col justify-center gap-3 min-w-[180px]">
                <button
                  onClick={() => playSound(q.target, true)}
                  disabled={isPlayingTarget}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2
                        ${isPlayingTarget
                      ? 'bg-blue-900/50 text-blue-400 border border-blue-800'
                      : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 hover:shadow-lg hover:translate-y-[-1px]'}`}
                >
                  {isPlayingTarget ? <Pause size={18} /> : <Play size={18} />}
                  TARGET
                </button>
                <button
                  onClick={() => playSound(synthParams, false)}
                  disabled={isPlayingUser}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2
                        ${isPlayingUser
                      ? 'bg-purple-900/50 text-purple-400 border border-purple-800'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500 hover:shadow-lg hover:translate-y-[-1px]'}`}
                >
                  {isPlayingUser ? <Pause size={18} /> : <Volume2 size={18} />}
                  MY PATCH
                </button>
              </div>
            </div>

            {/* 2. Parameters Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* ... (Kept original logic, but will ensure colors match) */}

              {/* Oscillator */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Oscillator
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Waveform</label>
                    <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                      {['sine', 'square', 'sawtooth'].map(type => (
                        <button
                          key={type}
                          onClick={() => !showFeedback && updateParam('waveform', type)}
                          className={`flex-1 py-2 rounded text-[10px] font-bold uppercase transition-all
                              ${synthParams.waveform === type
                              ? 'bg-slate-700 text-white shadow-sm'
                              : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          {type.substr(0, 4)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Filter
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {renderKnob("Cutoff", synthParams.filterCutoff, 20, 20000, 10, (v) => updateParam('filterCutoff', v), 'Hz', paramChecks.filterCutoff, q.target.filterCutoff)}
                  {renderKnob("Res", synthParams.filterResonance, 0, 20, 0.1, (v) => updateParam('filterResonance', v), '', paramChecks.filterResonance, q.target.filterResonance)}
                </div>
              </div>

              {/* Envelope */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span> Envelope
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {renderKnob("A", synthParams.attack, 0, 2, 0.01, (v) => updateParam('attack', v), 's', paramChecks.attack, q.target.attack)}
                  {renderKnob("D", synthParams.decay, 0, 2, 0.01, (v) => updateParam('decay', v), 's', paramChecks.decay, q.target.decay)}
                  {renderKnob("S", synthParams.sustain, 0, 1, 0.01, (v) => updateParam('sustain', v), '', paramChecks.sustain, q.target.sustain)}
                  {renderKnob("R", synthParams.release, 0, 5, 0.01, (v) => updateParam('release', v), 's', paramChecks.release, q.target.release)}
                </div>
              </div>

            </div>
          </div>

          <div style={{ background: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', padding: '16px' }}>
            <p className="text-sm text-blue-300">
              🎛️ <strong>Listen to the Target</strong> sound, then adjust your synth parameters to match it!
            </p>
          </div>

          {!showFeedback && (
            <button
              onClick={checkMatch}
              className="btn-primary w-full p-4 flex items-center justify-center gap-2 text-lg shadow-lg"
            >
              Check Sound Match
            </button>
          )}

          {showFeedback && (
            <div className={`p-4 rounded-lg border ${selectedAnswer === true
              ? 'bg-green-900/20 border-green-500'
              : 'bg-red-900/20 border-red-500'
              }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === true ? (
                  <>
                    <Check className="text-green-500" size={24} />
                    <span className="font-bold text-green-400 text-lg">Perfect Match! 🎹</span>
                  </>
                ) : (
                  <>
                    <X className="text-red-500" size={24} />
                    <span className="font-bold text-red-400 text-lg">Not quite - check the red knobs!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-300">{q.explanation}</p>
            </div>
          )}
        </div>
      );
    }

    if (q.type === 'multiple-choice' || q.type === 'envelope-draw') {
      return (
        <div className="space-y-4">
          {q.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === q.correct;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showFeedback && handleMultipleChoice(index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border transition-all ${showCorrect
                  ? 'border-green-500 bg-green-900/20 text-green-300'
                  : showIncorrect
                    ? 'border-red-500 bg-red-900/20 text-red-300'
                    : isSelected
                      ? 'border-blue-500 bg-blue-900/20 text-blue-300'
                      : 'border-slate-700 hover:border-blue-500 bg-slate-800 text-gray-300'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {q.type === 'envelope-draw' && (
                      <div className="flex-shrink-0">
                        {renderADSREnvelope(option.attack, option.decay, option.sustain, option.release, true)}
                      </div>
                    )}
                    <span className="font-medium text-lg">{q.type === 'envelope-draw' ? option.label : option}</span>
                  </div>
                  {showCorrect && <Check className="text-green-500" size={20} />}
                  {showIncorrect && <X className="text-red-500" size={20} />}
                </div>
              </button>
            );
          })}
        </div>
      )
    }
  };

  if (showIntro) {
    return (
      <div className="quiz-container">
        <div className="question-card text-center p-8" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="text-6xl mb-4 text-blue-400"><Zap size={64} className="inline-block" /></div>
          <h1 className="text-4xl font-bold text-white mb-4">Synthesizer Sound Design</h1>
          <p className="text-xl text-gray-400 mb-8">Master the art of synthesis by matching sounds!</p>

          <div className="bg-slate-800 rounded-xl p-6 mb-8 text-left border border-slate-700">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Mission Briefing</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><Volume2 size={24} /></div>
                <div>
                  <strong className="block text-white">Listen & Analyze</strong>
                  Target sounds will play repeatedly. Identify the waveform and envelope.
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><Settings size={24} /></div>
                <div>
                  <strong className="block text-white">Patch the Synth</strong>
                  Adjust the interactive knobs to recreate the sound you hear.
                </div>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setShowIntro(false)}
            className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
          >
            Enter Synth Lab <ArrowRight size={20} />
          </button>

          <button onClick={onExit} className="text-gray-500 mt-6 hover:text-gray-300 font-medium">
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
          <div className="flex justify-end mt-6 pt-6 border-t border-slate-700">
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