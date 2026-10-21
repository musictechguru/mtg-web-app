import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Lightbulb, Scissors, Shuffle, Volume2, Pause, Trash2, ArrowLeft, Award, Sparkles } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const DEFAULT_QUESTIONS = [
  {
    type: 'slice-count',
    question: 'Slice this drum loop into 4 equal beats (Quarter-Note Slices)',
    hint: 'Place slice markers at 25%, 50%, and 75% to divide the 4/4 bar into 4 beats.',
    waveform: 'kick-snare-loop',
    targetSlices: 4,
    explanation: 'Slicing into 4 quarter-notes isolates each downbeat and backbeat (Kick 1, Snare 2, Kick 3, Snare 4). This is the classic foundation for MPC hip-hop beat rearrangement.',
    producerTip: 'In Component 4, ensure your DAW grid is set to 1/4 note to snap slices cleanly to the tempo.'
  },
  {
    type: 'rearrange',
    question: 'Reverse this 4-beat melodic riff (Play backwards: 4-3-2-1)',
    hint: 'Drag the slice blocks to flip the order: 4 then 3 then 2 then 1.',
    waveform: 'melody-loop',
    preSliced: [0, 0.25, 0.5, 0.75, 1.0],
    targetOrder: [3, 2, 1, 0],
    explanation: 'Reversing phrase chunks creates an inverted melodic hook while preserving the forward envelope of each individual slice.',
    producerTip: 'Pioneered by 1960s psychedelic rock tape splices and 1990s trip-hop producers (e.g. Portishead, DJ Shadow).'
  },
  {
    type: 'multiple-choice',
    question: 'Why must audio slices be cut strictly at "Zero-Crossing" points?',
    hint: 'Consider what happens to speaker cone voltage when audio is sliced at non-zero amplitudes.',
    options: [
      'To automatically quantize the audio to the project tempo',
      'To prevent audible DC clicks, pops, and voltage discontinuities at the splice boundary',
      'To increase the sample rate and frequency resolution of the audio file',
      'To convert mono audio files into true stereo files'
    ],
    correct: 1,
    explanation: 'A zero-crossing is a point where the waveform amplitude voltage is exactly 0V. Cutting audio at any amplitude above or below zero forces the speaker cone to instantly jump from a voltage value to zero, generating a high-frequency transient click or pop.',
    producerTip: 'Always enable "Snap to Zero Crossing" in Logic Pro, Pro Tools, or Ableton Live prior to chopping.'
  },
  {
    type: 'slice-count',
    question: 'Subdivide this breakbeat into 8 slices (Eighth-Note Slices)',
    hint: 'Click to place 7 slice markers dividing the bar into 8 equal slices (every 12.5%).',
    waveform: 'breakbeat',
    targetSlices: 8,
    explanation: '8-slice subdivision isolates individual 8th-note ghost notes, kick hits, and snare rolls. This is the cornerstone technique of Jungle, Drum & Bass, and UK Garage break chopping.',
    producerTip: 'Classic jungle producers chopped the 1969 "Amen Break" (The Winstons) into 8th and 16th slices on Akai S950 samplers.'
  },
  {
    type: 'rearrange',
    question: 'Create a "Stutter" intro by repeating the initial kick slice twice',
    hint: 'Arrange the slices into: 1 - 1 - 2 - 3 (repeating slice 1).',
    waveform: 'vocal-chop',
    preSliced: [0, 0.33, 0.66, 1.0],
    targetOrder: [0, 0, 1, 2],
    explanation: 'Slice duplication creates machine-gun or stuttered syncopation, a hallmark of French House, Electro, and modern EDM vocal manipulation.',
    producerTip: 'Combine slice repetition with an automated high-pass filter sweep for high-impact build-ups.'
  },
  {
    type: 'multiple-choice',
    question: 'In a vintage sampler without time-stretching, pitching a sample DOWN by 12 semitones (one octave) causes:',
    hint: 'Recall the physics of tape speed and sample playback clock rates.',
    options: [
      'The pitch drops by one octave and the playback duration doubles (plays twice as slow)',
      'The pitch drops by one octave while duration stays identical',
      'The pitch drops by one octave and duration halves (plays twice as fast)',
      'The pitch is preserved but aliasing noise increases by 12 dB'
    ],
    correct: 0,
    explanation: 'Classic hardware samplers (e.g. Fairlight CMI, E-mu SP-1200, Akai S900) modulated pitch simply by varying the sample playback clock frequency. Dropping pitch by 12 semitones cuts the clock rate in half, which doubles the playback length.',
    producerTip: 'Early 1990s golden-age hip-hop producers sampled 33⅓ RPM vinyl records at 45 RPM to save sampler memory, then pitched them down in the sampler!'
  },
  {
    type: 'rearrange',
    question: 'Shuffle the groove: Move slice 2 to the front (Pattern: 2-1-3-4)',
    hint: 'Place slice 2 first, followed by 1, 3, and 4.',
    waveform: 'kick-snare-loop',
    preSliced: [0, 0.25, 0.5, 0.75, 1.0],
    targetOrder: [1, 0, 2, 3],
    explanation: 'Placing the snare or backbeat on beat 1 completely shifts the rhythmic pocket and syncopation, transforming a standard 4/4 groove into an off-kilter break.',
    producerTip: 'J Dilla famously swapped kicks and snares manually without quantize to achieve his legendary drunken swing.'
  },
  {
    type: 'multiple-choice',
    question: 'What is the primary function of "Crossfade Looping" on sustained instrument samples?',
    hint: 'Think about sustaining a string section or brass pad past its original recording length.',
    options: [
      'To invert the stereo phase between left and right channels',
      'To smoothly blend the end of a loop back into its start point, eliminating abrupt clicks and timbral jumps',
      'To increase the dynamic range by 6 dB per crossfade curve',
      'To remove low-frequency rumble below 20 Hz'
    ],
    correct: 1,
    explanation: 'When looping sustained sounds like strings or pads, natural vibrato and timbre fluctuations make finding an exact duplicate waveform impossible. An equal-power crossfade fades the tail into the head across 10–50ms to create an imperceptible seamless infinite sustain.',
    producerTip: 'In Component 4 sampling tasks, always apply a subtle 5–15ms crossfade at loop boundaries to guarantee smooth playback.'
  },
  {
    type: 'rearrange',
    question: 'Truncate the sample: Remove slice 4 to shorten the loop to 3 beats (Keep: 1-2-3)',
    hint: 'Drag slice 4 into the trash zone so only slices 1, 2, and 3 remain.',
    waveform: 'breakbeat',
    preSliced: [0, 0.25, 0.5, 0.75, 1.0],
    targetOrder: [0, 1, 2],
    explanation: 'Truncation deletes unneeded audio data (such as room decay, background noise, or trailing beats), freeing up memory and creating odd-meter rhythmic loops (e.g. 3/4 bar turnaround).',
    producerTip: 'Truncating silence before transient attacks reduces trigger latency when playing drum pads via MIDI.'
  },
  {
    type: 'multiple-choice',
    question: 'Which DAW / sampler function automatically detects drum hits for slicing based on rapid volume spikes?',
    hint: 'Think about the sudden initial burst of sound energy.',
    options: [
      'Transient Detection / Beat Detective threshold',
      'Sidechain Compression release gate',
      'Convolution Reverb impulse capture',
      'Comb Filter resonance peak'
    ],
    correct: 0,
    explanation: 'Transient detection algorithms analyze sudden changes in amplitude (transients) and place markers at the attack onset of kicks, snares, and hi-hats. Producers can adjust sensitivity thresholds to isolate major beats or subtle ghost notes.',
    producerTip: 'Use "Slice to MIDI Track" in Ableton Live or "Convert to Sampler Track" in Logic Pro with transient markers.'
  }
];

export default function SampleChoppingQuiz({ quiz, onExit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [slicePositions, setSlicePositions] = useState([0, 1]);
  const [sliceOrder, setSliceOrder] = useState([0]);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [isPlayingChopped, setIsPlayingChopped] = useState(false);
  const [draggedSlice, setDraggedSlice] = useState(null);

  const audioContextRef = useRef(null);
  const resultsSavedRef = useRef(false);

  const userContext = useUser();
  const saveQuizResult = userContext ? userContext.saveQuizResult : null;
  const completeCampaignNode = userContext ? userContext.completeCampaignNode : null;

  const questions = DEFAULT_QUESTIONS;

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const getAudioContext = () => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const generateWaveform = (type) => {
    const points = 100;
    const data = [];
    for (let i = 0; i < points; i++) {
      const x = i / points;
      let amp = 0.2;
      switch (type) {
        case 'kick-snare-loop':
          if (Math.abs(x - 0) < 0.04 || Math.abs(x - 0.5) < 0.04) {
            amp = 0.95; // Kick hits
          } else if (Math.abs(x - 0.25) < 0.04 || Math.abs(x - 0.75) < 0.04) {
            amp = 0.8; // Snare hits
          } else {
            amp = 0.15 + (Math.sin(x * 40) * 0.08);
          }
          break;
        case 'melody-loop':
          amp = 0.45 + Math.sin(x * Math.PI * 8) * 0.35 + (Math.cos(x * Math.PI * 16) * 0.1);
          break;
        case 'breakbeat':
          amp = 0.25 + Math.sin(x * Math.PI * 16) * 0.2;
          if (Math.abs(x % 0.125) < 0.03) {
            amp += 0.55;
          }
          break;
        case 'vocal-chop':
          amp = 0.4 + Math.sin(x * Math.PI * 6) * 0.35 * (1 - x * 0.4);
          break;
        default:
          amp = 0.5 + Math.sin(x * Math.PI * 4) * 0.3;
      }
      data.push(Math.max(0.05, Math.min(1.0, amp)));
    }
    return data;
  };

  const getPatternForWaveform = (type) => {
    switch (type) {
      case 'kick-snare-loop':
        return [
          { time: 0.0, freq: 65, type: 'kick' },
          { time: 0.25, freq: 220, type: 'snare' },
          { time: 0.5, freq: 65, type: 'kick' },
          { time: 0.75, freq: 220, type: 'snare' },
        ];
      case 'breakbeat':
        return [
          { time: 0.0, freq: 70, type: 'kick' },
          { time: 0.125, freq: 8000, type: 'hihat' },
          { time: 0.25, freq: 240, type: 'snare' },
          { time: 0.375, freq: 8000, type: 'hihat' },
          { time: 0.5, freq: 70, type: 'kick' },
          { time: 0.625, freq: 8000, type: 'hihat' },
          { time: 0.75, freq: 240, type: 'snare' },
          { time: 0.875, freq: 70, type: 'kick' },
        ];
      case 'melody-loop':
        return [
          { time: 0.0, freq: 261.6, type: 'tone' },
          { time: 0.25, freq: 329.6, type: 'tone' },
          { time: 0.5, freq: 392.0, type: 'tone' },
          { time: 0.75, freq: 523.2, type: 'tone' },
        ];
      case 'vocal-chop':
        return [
          { time: 0.0, freq: 349.2, type: 'tone' },
          { time: 0.33, freq: 440.0, type: 'tone' },
          { time: 0.66, freq: 392.0, type: 'tone' },
        ];
      default:
        return [{ time: 0.0, freq: 440, type: 'tone' }];
    }
  };

  const playSynthesizedSound = (freq, time, type, duration = 0.25) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, time);

    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);
      gain.gain.setValueAtTime(0.85, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'snare') {
      const bufferSize = Math.floor(ctx.sampleRate * 0.18);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1400;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } else if (type === 'hihat') {
      const bufferSize = Math.floor(ctx.sampleRate * 0.06);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 7500;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + duration);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    }
  };

  const playOriginal = () => {
    const ctx = getAudioContext();
    if (!ctx || isPlayingOriginal) return;

    setIsPlayingOriginal(true);
    const q = questions[currentQuestion];
    const now = ctx.currentTime + 0.05;
    const duration = 2.0;

    const pattern = getPatternForWaveform(q.waveform);
    pattern.forEach(({ time, freq, type }) => {
      const noteTime = now + (time * duration);
      playSynthesizedSound(freq, noteTime, type);
    });

    setTimeout(() => setIsPlayingOriginal(false), duration * 1000 + 100);
  };

  const playChopped = () => {
    const ctx = getAudioContext();
    if (!ctx || isPlayingChopped || sliceOrder.length === 0) return;

    setIsPlayingChopped(true);
    const q = questions[currentQuestion];
    const now = ctx.currentTime + 0.05;
    const totalDuration = 2.0;
    const sliceDuration = totalDuration / sliceOrder.length;
    const pattern = getPatternForWaveform(q.waveform);

    const positions = (slicePositions && slicePositions.length > 1) ? slicePositions : [0, 1];
    const numOriginalSlices = Math.max(1, positions.length - 1);

    sliceOrder.forEach((sliceIdx, orderIdx) => {
      const sliceStartTime = orderIdx * sliceDuration;
      const originalSliceStart = positions[sliceIdx] !== undefined ? positions[sliceIdx] : (sliceIdx / numOriginalSlices);
      const originalSliceEnd = positions[sliceIdx + 1] !== undefined ? positions[sliceIdx + 1] : ((sliceIdx + 1) / numOriginalSlices);

      const sliceSounds = pattern.filter(p => p.time >= originalSliceStart && p.time < originalSliceEnd);

      sliceSounds.forEach(({ time, freq, type }) => {
        const sliceSpan = Math.max(0.01, originalSliceEnd - originalSliceStart);
        const relativeTime = (time - originalSliceStart) / sliceSpan;
        const newTime = now + sliceStartTime + (relativeTime * sliceDuration);
        playSynthesizedSound(freq, newTime, type, sliceDuration);
      });
    });

    setTimeout(() => setIsPlayingChopped(false), totalDuration * 1000 + 100);
  };

  const addSlice = (xPos) => {
    if (showFeedback) return;
    const normalized = Math.max(0.05, Math.min(0.95, xPos / 600));

    const tooClose = slicePositions.some(p => Math.abs(p - normalized) < 0.06);
    if (tooClose) return;

    const updated = [...slicePositions, normalized].sort((a, b) => a - b);
    setSlicePositions(updated);
    setSliceOrder(Array.from({ length: updated.length - 1 }, (_, i) => i));
  };

  const handleDragStart = (idx) => {
    if (showFeedback) return;
    setDraggedSlice(idx);
  };

  const handleDrop = (targetIdx) => {
    if (draggedSlice === null || showFeedback) return;
    const updated = [...sliceOrder];
    const item = updated[draggedSlice];
    updated.splice(draggedSlice, 1);
    updated.splice(targetIdx, 0, item);
    setSliceOrder(updated);
    setDraggedSlice(null);
  };

  const handleDropTrash = () => {
    if (draggedSlice === null || showFeedback) return;
    const updated = [...sliceOrder];
    updated.splice(draggedSlice, 1);
    setSliceOrder(updated);
    setDraggedSlice(null);
  };

  const checkAnswer = () => {
    const q = questions[currentQuestion];
    let isCorrect = false;

    if (q.type === 'slice-count') {
      const count = slicePositions.length - 1;
      isCorrect = count === q.targetSlices;
    } else if (q.type === 'rearrange') {
      isCorrect = JSON.stringify(sliceOrder) === JSON.stringify(q.targetOrder);
    }

    setSelectedAnswer(isCorrect);
    setShowFeedback(true);
    if (isCorrect) setScore(prev => prev + 1);
  };

  const handleMultipleChoice = (index) => {
    if (showFeedback) return;
    const q = questions[currentQuestion];
    const isCorrect = index === q.correct;
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (isCorrect) setScore(prev => prev + 1);
  };

  const setupQuestionState = (index) => {
    const nextQ = questions[index];
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (nextQ.preSliced) {
      setSlicePositions(nextQ.preSliced);
      setSliceOrder(Array.from({ length: nextQ.preSliced.length - 1 }, (_, i) => i));
    } else {
      setSlicePositions([0, 1]);
      setSliceOrder([0]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const nextIdx = currentQuestion + 1;
      setCurrentQuestion(nextIdx);
      setupQuestionState(nextIdx);
    } else {
      setQuizComplete(true);
    }
  };

  useEffect(() => {
    if (quizComplete && !resultsSavedRef.current) {
      resultsSavedRef.current = true;
      const total = questions.length;
      const pct = Math.round((score / total) * 100);
      const grade = pct >= 80 ? 'A*' : pct >= 70 ? 'A' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : pct >= 40 ? 'D' : 'E';

      if (saveQuizResult) {
        saveQuizResult(quiz?.title || "Practical Quiz 20: Sample Editing & Chopping", score, total, grade);
      }
      if (quiz?.campaignNodeId && completeCampaignNode) {
        completeCampaignNode(quiz.campaignNodeId);
      }
    }
  }, [quizComplete, score, questions.length, saveQuizResult, completeCampaignNode, quiz?.title, quiz?.campaignNodeId]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizComplete(false);
    setShowIntro(true);
    resultsSavedRef.current = false;
    setupQuestionState(0);
  };

  // INTRO SCREEN
  if (showIntro) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
          {onExit && (
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-semibold"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
          )}

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4">
              <Scissors className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Practical Quiz 20: Sample Editing, Truncation & Chopping
            </h1>
            <p className="text-slate-400 text-lg">
              Master Component 4 audio slicing, zero-crossing points, loop crossfades, and classic sampler workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
              <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                <Scissors size={18} /> Audio Slicing & Waveforms
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Click directly on interactive waveforms to place slice markers at rhythmic beats and transient spikes. Listen before and after your edits!
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5">
              <h3 className="text-pink-400 font-bold mb-2 flex items-center gap-2">
                <Shuffle size={18} /> Drag & Drop Sequencer
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Rearrange slices to create reversals, stutter glitches, and shuffled grooves, or drag slices into the trash to test truncation.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 mb-8 text-sm text-slate-300 flex items-center gap-3">
            <Sparkles className="text-yellow-400 flex-shrink-0" size={20} />
            <span>
              <strong>Edexcel Component 4 Alignment:</strong> Covers zero-crossing DC protection, sampling duration mathematics, crossfade looping, and transient threshold detection.
            </span>
          </div>

          <button
            onClick={() => {
              setShowIntro(false);
              setupQuestionState(0);
            }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all text-lg"
          >
            Start Practical Quiz 20
            <Play size={20} />
          </button>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (quizComplete) {
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const grade = percentage >= 80 ? 'A*' : percentage >= 70 ? 'A' : percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : percentage >= 40 ? 'D' : 'E';

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-purple-500/20 border-2 border-purple-500 mx-auto flex items-center justify-center mb-6">
            <Award className="text-purple-400" size={42} />
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-2">Quiz Complete!</h2>
          <p className="text-slate-400 mb-6">Practical Quiz 20: Sample Editing & Chopping</p>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 mb-8 max-w-sm mx-auto">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              {percentage}%
            </div>
            <div className="text-slate-300 font-semibold text-lg mb-1">
              Score: {score} / {total}
            </div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-900/60 text-purple-300 border border-purple-700">
              Grade: {grade}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw size={18} />
              Retake Quiz
            </button>
            {onExit && (
              <button
                onClick={onExit}
                className="flex-1 py-3 px-6 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-colors"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const progressPct = ((currentQuestion + 1) / questions.length) * 100;
  const waveformData = generateWaveform(q.waveform);
  const width = 600;
  const height = 150;
  const points = waveformData.map((amp, i) => {
    const x = (i / waveformData.length) * width;
    const y = height / 2 - (amp * height / 2.5);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          {onExit && (
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
            >
              <ArrowLeft size={16} />
              Exit Quiz
            </button>
          )}
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-950/60 border border-purple-800 px-3 py-1 rounded-full">
            Practical Quiz 20
          </span>
          <span className="text-sm font-medium text-slate-400">
            Score: <strong className="text-purple-400">{score}</strong> / {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Main Quiz Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{q.type.replace('-', ' ')}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            {q.question}
          </h2>

          {q.hint && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-6 flex items-start gap-3 text-amber-200 text-sm">
              <Lightbulb size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Hint:</strong> {q.hint}</span>
            </div>
          )}

          {/* Interactive Area: Slice Count or Rearrange */}
          {(q.type === 'slice-count' || q.type === 'rearrange') && (
            <div className="space-y-6 mb-6">
              {/* Waveform Canvas */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Waveform: <strong className="text-slate-200">{q.waveform}</strong></span>
                  {q.type === 'slice-count' && (
                    <span className="text-purple-400">
                      Slices Placed: <strong>{Math.max(0, slicePositions.length - 1)}</strong> / Target: <strong>{q.targetSlices}</strong>
                    </span>
                  )}
                </div>

                <div className="overflow-x-auto w-full flex justify-center py-2">
                  <svg
                    width={width}
                    height={height}
                    className="bg-black/80 rounded-lg cursor-crosshair border border-slate-800"
                    onClick={(e) => {
                      if (q.type === 'slice-count' && !showFeedback) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        addSlice(x);
                      }
                    }}
                  >
                    <polyline
                      points={points}
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />

                    {/* Slice markers */}
                    {slicePositions.map((pos, i) => {
                      if (pos === 0 || pos === 1) return null;
                      return (
                        <g key={i}>
                          <line
                            x1={pos * width}
                            y1={0}
                            x2={pos * width}
                            y2={height}
                            stroke="#ec4899"
                            strokeWidth="2"
                            strokeDasharray="4,4"
                          />
                          <circle
                            cx={pos * width}
                            cy={10}
                            r="5"
                            fill="#ec4899"
                          />
                        </g>
                      );
                    })}

                    {/* Slice labels */}
                    {slicePositions.slice(0, -1).map((pos, i) => {
                      const nextPos = slicePositions[i + 1] || 1;
                      const midPoint = (pos + nextPos) / 2;
                      return (
                        <text
                          key={i}
                          x={midPoint * width}
                          y={height - 10}
                          fill="#a855f7"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          Slice {i + 1}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                {q.type === 'slice-count' && !showFeedback && slicePositions.length > 2 && (
                  <button
                    onClick={() => {
                      setSlicePositions([0, 1]);
                      setSliceOrder([0]);
                    }}
                    className="mt-3 text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Clear all markers
                  </button>
                )}
              </div>

              {/* Rearrange Sequencer */}
              {q.type === 'rearrange' && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-slate-200 flex items-center gap-2">
                      <Shuffle size={16} className="text-purple-400" />
                      Slice Sequencer (Drag blocks to rearrange)
                    </span>
                    <span className="text-xs text-slate-400">
                      Target: {q.targetOrder.map(i => i + 1).join(' - ')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 min-h-[70px] p-2 bg-slate-900/60 rounded-lg border border-slate-800">
                    {sliceOrder.map((sliceIdx, orderIdx) => (
                      <div
                        key={orderIdx}
                        draggable={!showFeedback}
                        onDragStart={() => handleDragStart(orderIdx)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(orderIdx)}
                        className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg px-4 py-3 min-w-[70px] text-center cursor-move hover:scale-105 transition-transform shadow-md ${
                          showFeedback ? 'cursor-not-allowed opacity-80' : ''
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold text-purple-200">Slice</div>
                        <div className="text-xl font-extrabold text-white">{sliceIdx + 1}</div>
                      </div>
                    ))}
                  </div>

                  {!showFeedback && (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDropTrash}
                      className="border-2 border-dashed border-red-500/40 rounded-lg p-3 bg-red-950/20 flex items-center justify-center gap-2 hover:bg-red-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 className="text-red-400" size={16} />
                      <span className="text-xs text-red-300 font-semibold">Drop slice here to truncate / remove</span>
                    </div>
                  )}
                </div>
              )}

              {/* Audio Playback Controls */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={playOriginal}
                  disabled={isPlayingOriginal}
                  className="py-3 px-4 bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm disabled:opacity-50"
                >
                  {isPlayingOriginal ? <Pause size={18} /> : <Play size={18} />}
                  {isPlayingOriginal ? 'Playing Loop...' : 'Play Original Loop'}
                </button>
                <button
                  onClick={playChopped}
                  disabled={isPlayingChopped || sliceOrder.length === 0}
                  className="py-3 px-4 bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 text-purple-300 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm disabled:opacity-50"
                >
                  {isPlayingChopped ? <Pause size={18} /> : <Volume2 size={18} />}
                  {isPlayingChopped ? 'Playing Chop...' : 'Play Chopped / Arranged'}
                </button>
              </div>

              {!showFeedback && (
                <button
                  onClick={checkAnswer}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all text-base"
                >
                  Verify Slicing & Sequence
                </button>
              )}
            </div>
          )}

          {/* Multiple Choice Options */}
          {q.type === 'multiple-choice' && (
            <div className="space-y-3 mb-6">
              {q.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === q.correct;
                const showCorrect = showFeedback && isCorrect;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleMultipleChoice(idx)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium flex items-center justify-between ${
                      showCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : showIncorrect
                        ? 'bg-red-950/60 border-red-500 text-red-200'
                        : isSelected
                        ? 'bg-purple-950/60 border-purple-500 text-white'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                    } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span>{option}</span>
                    {showCorrect && <Check size={20} className="text-emerald-400 flex-shrink-0 ml-2" />}
                    {showIncorrect && <X size={20} className="text-red-400 flex-shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Feedback & Explanations */}
          {showFeedback && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className={`p-4 rounded-xl border ${
                (q.type === 'multiple-choice' ? selectedAnswer === q.correct : selectedAnswer === true)
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-base mb-1">
                  {(q.type === 'multiple-choice' ? selectedAnswer === q.correct : selectedAnswer === true) ? (
                    <>
                      <Check size={20} className="text-emerald-400" />
                      <span>Correct Analysis!</span>
                    </>
                  ) : (
                    <>
                      <X size={20} className="text-amber-400" />
                      <span>Review Key Concept</span>
                    </>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  {q.explanation}
                </p>
              </div>

              {q.producerTip && (
                <div className="bg-purple-950/30 border border-purple-800/40 rounded-xl p-4 text-xs text-purple-200 flex items-start gap-3">
                  <Sparkles size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-300">Producer & Exam Tip: </strong>
                    {q.producerTip}
                  </div>
                </div>
              )}

              <button
                onClick={nextQuestion}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all text-base flex items-center justify-center gap-2"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Final Results'}
                <Play size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
