import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Lightbulb, Scissors, Shuffle, Volume2, Pause, Trash2, ArrowLeft, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const DEFAULT_QUESTIONS = [
  {
    type: 'slice-count',
    question: 'Chop this 4/4 drum loop into 4 equal beats (Quarter-Note Slices)',
    hint: 'Click the 3 beat lines (Beat 2, Beat 3, Beat 4) to divide the bar into 4 slices. Click any scissors icon again to remove a cut.',
    waveform: 'kick-snare-loop',
    targetSlices: 4,
    explanation: 'Slicing into 4 quarter-notes isolates each main beat (Kick 1, Snare 2, Kick 3, Snare 4) so you can trigger or rearrange them on sampler pads.',
    producerTip: 'Set your DAW grid to 1/4 note before slicing so every chop lands tight on the beat.'
  },
  {
    type: 'rearrange',
    question: 'Reverse this 4-beat riff into the order: 4 - 3 - 2 - 1',
    hint: 'Use the ◀ / ▶ arrows (or drag) to put the slices in backwards order: 4 - 3 - 2 - 1.',
    waveform: 'melody-loop',
    preSliced: [0, 0.25, 0.5, 0.75, 1.0],
    targetOrder: [3, 2, 1, 0],
    explanation: 'Rearranging slices backwards flips the melodic phrase while keeping each individual slice playing forward cleanly.',
    producerTip: 'Try auditioning with "Play Chopped / Arranged" before you check your answer.'
  },
  {
    type: 'multiple-choice',
    question: 'Why should audio slices be cut at Zero-Crossing points?',
    hint: 'Think about what happens if a cut jumps suddenly from a loud peak straight to silence.',
    options: [
      'To quantise the loop to the DAW tempo',
      'To prevent audible clicks and pops at the cut',
      'To double the file sample rate automatically',
      'To convert a mono sample into wide stereo'
    ],
    correct: 1,
    explanation: 'A zero-crossing is where the waveform sits at 0V. Cutting there stops the speaker cone from jumping suddenly, preventing sharp clicks and pops.',
    producerTip: 'Turn on "Snap to Zero Crossing" in Logic Pro or Ableton Live before chopping samples.'
  },
  {
    type: 'slice-count',
    question: 'Chop this breakbeat into 8 equal eighth-note slices',
    hint: 'Click each of the 7 eighth-note grid lines (1&, 2, 2&, 3, 3&, 4, 4&) to make 8 slices. Click a cut again to undo it.',
    waveform: 'breakbeat',
    targetSlices: 8,
    explanation: 'Eighth-note slicing separates kicks, snares, and ghost hi-hats — the core breakbeat chopping technique in Hip Hop, Jungle, and Drum & Bass.',
    producerTip: 'Classic UK Jungle producers sliced the "Amen Break" into 8th and 16th hits on Akai hardware samplers.'
  },
  {
    type: 'rearrange',
    question: 'Create a stutter intro by repeating Slice 1 twice: 1 - 1 - 2 - 3',
    hint: 'Click "+ Dup" on Slice 1 to duplicate it so your sequence reads 1 - 1 - 2 - 3.',
    waveform: 'vocal-chop',
    preSliced: [0, 0.33, 0.66, 1.0],
    targetOrder: [0, 0, 1, 2],
    explanation: 'Duplicating the first slice creates a punchy rhythmic stutter edit — a staple transition technique in Hip Hop, House, and EDM.',
    producerTip: 'Pair a 1/8th or 1/16th stutter with a rising filter sweep before a chorus drop.'
  },
  {
    type: 'multiple-choice',
    question: 'On a vintage sampler without time-stretching, pitching a sample DOWN one octave makes it:',
    hint: 'Think about slowing down a vinyl record or tape machine.',
    options: [
      'Stay the exact same length and tempo',
      'Play twice as fast and finish in half the time',
      'Play twice as slow and double in length',
      'Remove all bass frequencies below 100 Hz'
    ],
    correct: 2,
    explanation: 'Classic samplers changed pitch by changing playback speed. Dropping pitch by one octave halves the playback speed, doubling the sample length.',
    producerTip: 'Early hip-hop producers sampled vinyl at 45 RPM to save RAM, then pitched it down in the sampler for gritty warmth.'
  },
  {
    type: 'rearrange',
    question: 'Flip the groove by moving Slice 2 to the start: 2 - 1 - 3 - 4',
    hint: 'Use ◀ on Slice 2 (or drag it left) so the sequence becomes 2 - 1 - 3 - 4.',
    waveform: 'kick-snare-loop',
    preSliced: [0, 0.25, 0.5, 0.75, 1.0],
    targetOrder: [1, 0, 2, 3],
    explanation: 'Moving the snare or off-beat slice onto beat 1 instantly creates a fresh, syncopated groove from an old drum loop.',
    producerTip: 'Swapping kick and snare slices is the fastest way to flip a familiar breakbeat into an original beat.'
  },
  {
    type: 'multiple-choice',
    question: 'Why is Crossfade Looping used on sustained string or pad samples?',
    hint: 'Think about holding a keyboard note longer than the original sample recording.',
    options: [
      'To invert stereo phase between Left and Right',
      'To boost dynamic range by 6 dB per loop',
      'To filter out low rumble below 40 Hz',
      'To blend loop ends smoothly with no clicks'
    ],
    correct: 3,
    explanation: 'Crossfade looping gently fades the end of a loop into its start (10–50 ms) so held notes sustain smoothly without audible clicks or sudden jumps.',
    producerTip: 'In Component 4 sampling tasks, a 10 ms crossfade keeps looped pads seamless.'
  },
  {
    type: 'rearrange',
    question: 'Truncate the loop to 3 beats by removing Slice 4: keep 1 - 2 - 3',
    hint: 'Click × on Slice 4 (or click "Truncate Slice 4") so only 1 - 2 - 3 remain.',
    waveform: 'breakbeat',
    preSliced: [0, 0.25, 0.5, 0.75, 1.0],
    targetOrder: [0, 1, 2],
    explanation: 'Truncation trims away unwanted silence or trailing audio, tightening trigger response and saving sampler memory.',
    producerTip: 'Always truncate dead air before the first transient so drum pads fire with zero delay.'
  },
  {
    type: 'multiple-choice',
    question: 'Which DAW feature automatically places slice markers on sudden drum hits?',
    hint: 'Think of the sharp initial volume spike at the start of every kick or snare.',
    options: [
      'Transient Detection',
      'Sidechain Compression',
      'Convolution Reverb',
      'Stereo Panning Automation'
    ],
    correct: 0,
    explanation: 'Transient detection spots sharp volume spikes (kicks, snares, hi-hats) and automatically places slice markers so you can chop a beat to MIDI in seconds.',
    producerTip: 'Use "Convert to Sampler Track" in Logic Pro or "Slice to MIDI" in Ableton Live.'
  }
];

const SLICE_COLORS = [
  { fill: 'rgba(56, 189, 248, 0.15)', border: '#38bdf8', text: '#38bdf8', name: 'Slice 1 / Pad 1' },
  { fill: 'rgba(168, 85, 247, 0.15)', border: '#c084fc', text: '#c084fc', name: 'Slice 2 / Pad 2' },
  { fill: 'rgba(236, 72, 153, 0.15)', border: '#f472b6', text: '#f472b6', name: 'Slice 3 / Pad 3' },
  { fill: 'rgba(251, 146, 60, 0.15)', border: '#fb923c', text: '#fb923c', name: 'Slice 4 / Pad 4' },
  { fill: 'rgba(52, 211, 153, 0.15)', border: '#34d399', text: '#34d399', name: 'Slice 5 / Pad 5' },
  { fill: 'rgba(250, 204, 21, 0.15)', border: '#facc15', text: '#facc15', name: 'Slice 6 / Pad 6' },
  { fill: 'rgba(129, 140, 248, 0.15)', border: '#818cf8', text: '#818cf8', name: 'Slice 7 / Pad 7' },
  { fill: 'rgba(244, 63, 94, 0.15)', border: '#f43f5e', text: '#f43f5e', name: 'Slice 8 / Pad 8' }
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
  const [activePad, setActivePad] = useState(null);
  const [draggedSlice, setDraggedSlice] = useState(null);
  const [hoverX, setHoverX] = useState(null);

  const audioContextRef = useRef(null);
  const userContext = useUser();
  const saveQuizResult = userContext ? userContext.saveQuizResult : null;
  const completeCampaignNode = userContext ? userContext.completeCampaignNode : null;

  const questions = DEFAULT_QUESTIONS;

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch (e) {}
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

  // Generate realistic dual-polarity audio waveform amplitudes
  const generateWaveform = (type) => {
    const points = 120;
    const data = [];
    for (let i = 0; i < points; i++) {
      const x = i / points;
      let amp = 0.15;
      switch (type) {
        case 'kick-snare-loop':
          // Beat 1: Kick (0.0s), Beat 2: Snare (0.25), Beat 3: Kick (0.5), Beat 4: Snare (0.75)
          if (x < 0.08) {
            amp = 0.95 * Math.exp(-x * 25) + 0.1; // Kick 1
          } else if (Math.abs(x - 0.25) < 0.08) {
            amp = 0.85 * Math.exp(-Math.abs(x - 0.25) * 20) + 0.15; // Snare 1
          } else if (Math.abs(x - 0.5) < 0.08) {
            amp = 0.9 * Math.exp(-Math.abs(x - 0.5) * 25) + 0.1; // Kick 2
          } else if (Math.abs(x - 0.75) < 0.08) {
            amp = 0.88 * Math.exp(-Math.abs(x - 0.75) * 20) + 0.15; // Snare 2
          } else {
            amp = 0.18 + Math.sin(x * 120) * 0.08;
          }
          break;
        case 'melody-loop':
          amp = 0.45 + Math.sin(x * Math.PI * 8) * 0.35 + Math.sin(x * Math.PI * 18) * 0.15;
          break;
        case 'breakbeat':
          // 8th-note syncopated breakbeat with ghost notes
          if (x < 0.06 || Math.abs(x - 0.5) < 0.06) {
            amp = 0.95; // Kick hits
          } else if (Math.abs(x - 0.25) < 0.06 || Math.abs(x - 0.75) < 0.06) {
            amp = 0.85; // Snare hits
          } else if (Math.abs(x - 0.375) < 0.04 || Math.abs(x - 0.875) < 0.04) {
            amp = 0.6; // Ghost snares
          } else {
            amp = 0.25 + Math.sin(x * 100) * 0.1;
          }
          break;
        case 'vocal-chop':
          amp = (0.5 + Math.sin(x * Math.PI * 10) * 0.35) * (1 - x * 0.3);
          break;
        default:
          amp = 0.4 + Math.sin(x * Math.PI * 6) * 0.3;
      }
      data.push(Math.max(0.08, Math.min(1.0, amp)));
    }
    return data;
  };

  const playSynthesizedSound = (freq, time, type, duration = 0.25) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = Math.max(ctx.currentTime, time);

    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } else if (type === 'snare') {
      const bufferSize = Math.floor(ctx.sampleRate * 0.18);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1200;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } else if (type === 'hihat') {
      const bufferSize = Math.floor(ctx.sampleRate * 0.05);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 7500;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

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
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(500, now + duration);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    }
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
          { time: 0.875, freq: 8000, type: 'hihat' }
        ];
      case 'melody-loop':
        return [
          { time: 0.0, freq: 261.63, type: 'melody' }, // C4
          { time: 0.25, freq: 311.13, type: 'melody' }, // Eb4
          { time: 0.5, freq: 349.23, type: 'melody' }, // F4
          { time: 0.75, freq: 392.00, type: 'melody' }  // G4
        ];
      case 'vocal-chop':
        return [
          { time: 0.0, freq: 440, type: 'melody' },
          { time: 0.33, freq: 523.25, type: 'melody' },
          { time: 0.66, freq: 659.25, type: 'melody' }
        ];
      default:
        return [
          { time: 0.0, freq: 65, type: 'kick' },
          { time: 0.5, freq: 220, type: 'snare' }
        ];
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

      const sliceSounds = pattern.filter(p => p.time >= originalSliceStart - 0.02 && p.time < originalSliceEnd);

      sliceSounds.forEach(({ time, freq, type }) => {
        const sliceSpan = Math.max(0.01, originalSliceEnd - originalSliceStart);
        const relativeTime = (time - originalSliceStart) / sliceSpan;
        const newTime = now + sliceStartTime + (relativeTime * sliceDuration);
        playSynthesizedSound(freq, newTime, type, sliceDuration);
      });
    });

    setTimeout(() => setIsPlayingChopped(false), totalDuration * 1000 + 100);
  };

  const playSingleSlice = (sliceIndex) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    setActivePad(sliceIndex);

    const q = questions[currentQuestion];
    const pattern = getPatternForWaveform(q.waveform);
    const positions = (slicePositions && slicePositions.length > 1) ? slicePositions : [0, 1];
    const numOriginalSlices = Math.max(1, positions.length - 1);

    const startPos = positions[sliceIndex] !== undefined ? positions[sliceIndex] : (sliceIndex / numOriginalSlices);
    const endPos = positions[sliceIndex + 1] !== undefined ? positions[sliceIndex + 1] : ((sliceIndex + 1) / numOriginalSlices);

    const sliceSounds = pattern.filter(p => p.time >= startPos - 0.02 && p.time < endPos);
    const now = ctx.currentTime + 0.02;

    if (sliceSounds.length > 0) {
      sliceSounds.forEach(({ freq, type }) => {
        playSynthesizedSound(freq, now, type, 0.4);
      });
    } else {
      // Fallback sound if sliced in empty area
      playSynthesizedSound(200 + sliceIndex * 50, now, 'melody', 0.25);
    }

    setTimeout(() => setActivePad(null), 350);
  };

  const SNAP_GRID_8 = [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875];
  const SNAP_GRID_4 = [0.25, 0.5, 0.75];

  const getNearestGridPos = (xRatio) => {
    const q = questions[currentQuestion];
    const grid = q?.targetSlices === 4 ? SNAP_GRID_4 : SNAP_GRID_8;
    let best = grid[0];
    let minDist = Math.abs(xRatio - best);
    for (const pt of grid) {
      const dist = Math.abs(xRatio - pt);
      if (dist < minDist) {
        minDist = dist;
        best = pt;
      }
    }
    return best;
  };

  const addSlice = (xRatio) => {
    if (showFeedback) return;
    const snapped = getNearestGridPos(xRatio);

    // Clicking an existing slice marker toggles (removes) that individual cut
    const existingIdx = slicePositions.findIndex(p => Math.abs(p - snapped) < 0.01);
    if (existingIdx !== -1) {
      const updated = slicePositions.filter((_, idx) => idx !== existingIdx);
      setSlicePositions(updated);
      setSliceOrder(Array.from({ length: updated.length - 1 }, (_, i) => i));
      return;
    }

    const updated = [...slicePositions, snapped].sort((a, b) => a - b);
    setSlicePositions(updated);
    setSliceOrder(Array.from({ length: updated.length - 1 }, (_, i) => i));
  };

  const snapToGrid = (divisions) => {
    if (showFeedback) return;
    const newPositions = [0];
    for (let i = 1; i < divisions; i++) {
      newPositions.push(i / divisions);
    }
    newPositions.push(1);
    setSlicePositions(newPositions);
    setSliceOrder(Array.from({ length: divisions }, (_, i) => i));
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

  const moveSlice = (fromIdx, toIdx) => {
    if (showFeedback || toIdx < 0 || toIdx >= sliceOrder.length) return;
    const updated = [...sliceOrder];
    const item = updated[fromIdx];
    updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, item);
    setSliceOrder(updated);
  };

  const removeSlice = (sliceIndex) => {
    if (showFeedback) return;
    const updated = sliceOrder.filter(idx => idx !== sliceIndex);
    setSliceOrder(updated);
  };

  const duplicateSlice = (orderIdx) => {
    if (showFeedback || sliceOrder.length >= 8) return;
    const updated = [...sliceOrder];
    updated.splice(orderIdx + 1, 0, updated[orderIdx]);
    setSliceOrder(updated);
  };

  const removeSliceAt = (orderIdx) => {
    if (showFeedback || sliceOrder.length <= 1) return;
    const updated = [...sliceOrder];
    updated.splice(orderIdx, 1);
    setSliceOrder(updated);
  };

  const resetSequence = () => {
    if (showFeedback) return;
    const q = questions[currentQuestion];
    if (q.preSliced) {
      setSliceOrder(Array.from({ length: q.preSliced.length - 1 }, (_, i) => i));
    }
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
      const total = questions.length;
      const finalScore = score + (selectedAnswer === true ? 1 : 0);
      const percentage = Math.round((finalScore / total) * 100);
      const grade = percentage >= 80 ? 'A*' : percentage >= 70 ? 'A' : percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : 'D';
      if (typeof saveQuizResult === 'function') {
        saveQuizResult(quiz?.title || 'Practical Quiz 20: Sample Chopping & Truncation', finalScore, total, grade);
      }
      if (quiz?.campaignNodeId && typeof completeCampaignNode === 'function' && percentage >= 60) {
        completeCampaignNode(quiz.campaignNodeId);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setShowIntro(false);
    setupQuestionState(0);
  };

  // INTRO SCREEN
  if (showIntro) {
    return (
      <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '900px', margin: '0 auto', color: '#fff' }}>
        <div style={{ background: 'var(--bg-panel)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '18px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)' }}>
              <Scissors size={36} color="#fff" />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 10px 0' }}>
              Practical Quiz 20: Sample Editing, Truncation & Chopping
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
              Master Component 4 audio slicing, zero-crossing points, loop crossfades, and classic MPC sampler workflows.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px' }}>
              <h3 style={{ color: '#c084fc', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scissors size={18} /> Interactive Waveform Slicing
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                Click directly on dual-polarity waveforms along the timeline ruler. Place slice markers at transients, snap to beats, and test zero-crossing principles.
              </p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px' }}>
              <h3 style={{ color: '#f472b6', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shuffle size={18} /> MPC Trigger Pads & Truncation
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                Trigger slices on illuminated MPC pads. Rearrange slices into reversals or stutters, and drag unwanted silence into the truncation trash zone.
              </p>
            </div>
          </div>

          <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '12px', padding: '16px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px', color: '#fef08a', fontSize: '0.9rem' }}>
            <Sparkles size={22} style={{ flexShrink: 0, color: '#facc15' }} />
            <span>
              <strong>Edexcel Component 4 Alignment:</strong> Covers zero-crossing DC protection, sampling duration mathematics, crossfade looping, and transient threshold detection.
            </span>
          </div>

          <button
            onClick={() => {
              setShowIntro(false);
              setupQuestionState(0);
            }}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Start Practical Quiz 20 <Play size={20} />
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
      <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '700px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', background: 'var(--bg-panel)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '75px', height: '75px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', border: '2px solid #a855f7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <Award size={40} color="#c084fc" />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 6px 0', color: '#fff' }}>Quiz Complete!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '25px' }}>Practical Quiz 20: Sample Editing & Chopping</p>

          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '25px', maxWidth: '350px', margin: '0 auto 30px' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
              {percentage}%
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '1.2rem', fontWeight: '600', marginBottom: '10px' }}>
              Score: {score} / {total}
            </div>
            <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', background: 'rgba(168, 85, 247, 0.25)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.5)' }}>
              Grade: {grade}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              onClick={resetQuiz}
              style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <RotateCcw size={18} /> Retake Quiz
            </button>
            {onExit && (
              <button
                onClick={onExit}
                style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', border: 'none', color: '#fff', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
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
  const svgWidth = 700;
  const svgHeight = 180;
  const centerY = svgHeight / 2;

  // Compute dual-polarity polygon points
  const topPoints = [];
  const bottomPoints = [];
  waveformData.forEach((amp, i) => {
    const x = (i / (waveformData.length - 1)) * svgWidth;
    const yTop = centerY - (amp * (svgHeight / 2 - 25));
    const yBottom = centerY + (amp * (svgHeight / 2 - 25));
    topPoints.push(`${x},${yTop}`);
    bottomPoints.unshift(`${x},${yBottom}`);
  });
  const wavePolygon = `${topPoints.join(' ')} ${bottomPoints.join(' ')}`;

  const numSlices = Math.max(1, slicePositions.length - 1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: '#fff', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '900px', width: '100%' }}>

        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          {onExit && (
            <button
              onClick={onExit}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: '600' }}
            >
              <ArrowLeft size={16} /> Exit Quiz
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', padding: '4px 12px', borderRadius: '20px' }}>
              Practical Quiz 20
            </span>
          </div>

          <div style={{ fontSize: '0.95rem', color: '#94a3b8' }}>
            Score: <strong style={{ color: '#c084fc', fontSize: '1.1rem' }}>{score}</strong> / {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', transition: 'width 0.3s ease' }} />
        </div>

        {/* Main Quiz Card */}
        <div style={{ background: 'var(--bg-panel)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '22px 24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>

          {/* Question Sub-Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '3px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
              {q.type.replace('-', ' ')}
            </span>
          </div>

          {/* Question Title */}
          <h2 style={{ fontSize: '1.35rem', fontWeight: '800', lineHeight: '1.3', margin: '0 0 12px 0', color: '#f8fafc' }}>
            {q.question}
          </h2>

          {/* Hint Card */}
          {q.hint && (
            <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '10px', padding: '10px 14px', marginBottom: '16px', display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#fef08a', fontSize: '0.86rem', lineHeight: '1.45' }}>
              <Lightbulb size={18} style={{ flexShrink: 0, color: '#facc15', marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#facc15' }}>Audio Editing Tip: </strong>
                {q.hint}
              </div>
            </div>
          )}

          {/* Waveform & Slicing Laboratory */}
          {(q.type === 'slice-count' || q.type === 'rearrange') && (
            <div style={{ marginBottom: '28px' }}>

              {/* Waveform Info Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span style={{ color: '#94a3b8' }}>
                  Waveform Loop: <strong style={{ color: '#38bdf8' }}>{q.waveform}</strong> (4/4 Bar @ 120 BPM)
                </span>
                {q.type === 'slice-count' && (
                  <span style={{ color: numSlices === q.targetSlices ? '#34d399' : '#c084fc', fontWeight: 'bold' }}>
                    Slices Created: <strong>{numSlices}</strong> / Target: <strong>{q.targetSlices} Slices</strong>
                  </span>
                )}
              </div>

              {/* DAW Interactive Waveform Canvas */}
              <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '14px', padding: '15px', position: 'relative', overflowX: 'auto' }}>

                {/* Beat Ruler along top */}
                {q.targetSlices === 8 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '6px', marginBottom: '6px', fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700' }}>
                    {['1', '1&', '2', '2&', '3', '3&', '4', '4&'].map(lbl => (
                      <span key={lbl} style={{ textAlign: 'left', paddingLeft: '4px', borderLeft: '1px solid rgba(148,163,184,0.2)' }}>{lbl}</span>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '6px', marginBottom: '6px', fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700' }}>
                    <span>Beat 1 (0.0s)</span>
                    <span>Beat 2 (0.5s)</span>
                    <span>Beat 3 (1.0s)</span>
                    <span>Beat 4 (1.5s)</span>
                    <span>End (2.0s)</span>
                  </div>
                )}

                <svg
                  width="100%"
                  height={svgHeight}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  style={{ display: 'block', cursor: q.type === 'slice-count' && !showFeedback ? 'crosshair' : 'default', userSelect: 'none' }}
                  onClick={(e) => {
                    if (q.type === 'slice-count' && !showFeedback) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const xRatio = (e.clientX - rect.left) / rect.width;
                      addSlice(xRatio);
                    }
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoverX((e.clientX - rect.left) / rect.width);
                  }}
                  onMouseLeave={() => setHoverX(null)}
                >
                  <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Quarter Note Grid Lines (25%, 50%, 75%) */}
                  {[0.25, 0.5, 0.75].map(ratio => (
                    <line
                      key={ratio}
                      x1={ratio * svgWidth}
                      y1={0}
                      x2={ratio * svgWidth}
                      y2={svgHeight}
                      stroke="rgba(255, 255, 255, 0.08)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  ))}

                  {/* Eighth Note Sub-Grid Lines (12.5%, 37.5%, 62.5%, 87.5%) */}
                  {[0.125, 0.375, 0.625, 0.875].map(ratio => (
                    <line
                      key={ratio}
                      x1={ratio * svgWidth}
                      y1={0}
                      x2={ratio * svgWidth}
                      y2={svgHeight}
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Zero-Crossing Center Line (0V) */}
                  <line
                    x1={0}
                    y1={centerY}
                    x2={svgWidth}
                    y2={centerY}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1"
                  />
                  <rect x={6} y={centerY - 15} width={118} height={14} rx={4} fill="rgba(9, 13, 22, 0.85)" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="0.75" />
                  <text x={11} y={centerY - 5} fill="#cbd5e1" fontSize="8.5" fontWeight="bold">0.00V (Zero-Crossing)</text>

                  {/* Sliced Regions Highlighting */}
                  {slicePositions.slice(0, -1).map((startPos, i) => {
                    const endPos = slicePositions[i + 1] || 1.0;
                    const regionX = startPos * svgWidth;
                    const regionWidth = (endPos - startPos) * svgWidth;
                    const colorTheme = SLICE_COLORS[i % SLICE_COLORS.length];
                    const isTruncated = q.type === 'rearrange' && !sliceOrder.includes(i);

                    return (
                      <g key={i}>
                        <rect
                          x={regionX}
                          y={2}
                          width={regionWidth}
                          height={svgHeight - 4}
                          fill={isTruncated ? 'rgba(239, 68, 68, 0.25)' : colorTheme.fill}
                          stroke={isTruncated ? '#ef4444' : colorTheme.border}
                          strokeWidth="1"
                          strokeDasharray={isTruncated ? '4 4' : 'none'}
                          opacity={isTruncated ? 0.6 : 0.9}
                        />
                        <text
                          x={regionX + regionWidth / 2}
                          y={svgHeight - 12}
                          fill={isTruncated ? '#ef4444' : colorTheme.text}
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {isTruncated ? `[Truncated: Slice ${i + 1}]` : `Slice ${i + 1}`}
                        </text>
                      </g>
                    );
                  })}

                  {/* Dual-Polarity Waveform Fill */}
                  <polygon
                    points={wavePolygon}
                    fill="url(#waveGradient)"
                    stroke="#4ade80"
                    strokeWidth="1.5"
                    opacity="0.85"
                  />

                  {/* Vertical Slicing Cut Markers */}
                  {slicePositions.map((pos, i) => {
                    if (pos === 0 || pos === 1) return null;
                    const xCoord = pos * svgWidth;

                    return (
                      <g key={i}>
                        <line
                          x1={xCoord}
                          y1={0}
                          x2={xCoord}
                          y2={svgHeight}
                          stroke="#ec4899"
                          strokeWidth="2.5"
                          strokeDasharray="4 3"
                        />
                        {/* Scissors Badge at Slice Head */}
                        <circle cx={xCoord} cy={14} r="10" fill="#ec4899" />
                        <text x={xCoord} y={18} fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">✂</text>
                        {/* Only show % badge when <= 5 slices so it never overlaps Slice labels */}
                        {numSlices <= 5 && (
                          <>
                            <rect x={xCoord - 18} y={svgHeight - 38} width="36" height="14" rx="3" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                            <text x={xCoord} y={svgHeight - 28} fill="#c7d2fe" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                              {Math.round(pos * 100)}%
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* Hover Scissors Indicator — snaps magnetically to the nearest beat line */}
                  {q.type === 'slice-count' && !showFeedback && hoverX !== null && (() => {
                    const snappedPos = getNearestGridPos(hoverX);
                    const isExisting = slicePositions.some(p => Math.abs(p - snappedPos) < 0.01);
                    const hx = snappedPos * svgWidth;
                    return (
                      <g>
                        <line
                          x1={hx}
                          y1={0}
                          x2={hx}
                          y2={svgHeight}
                          stroke={isExisting ? '#f87171' : '#38bdf8'}
                          strokeWidth="2"
                          strokeDasharray="3 3"
                        />
                        <circle cx={hx} cy={14} r="9" fill={isExisting ? '#ef4444' : '#38bdf8'} />
                        <text x={hx} y={18} fill="#fff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                          {isExisting ? '×' : '✂'}
                        </text>
                      </g>
                    );
                  })()}
                </svg>

                {/* Slicing Controls (Grid Snap Active + Clear) */}
                {q.type === 'slice-count' && !showFeedback && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      <strong style={{ color: '#38bdf8' }}>Grid Snap ON:</strong> Click any beat line to place a cut (click a pink ✂ again to remove it).
                    </span>
                    {slicePositions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          setSlicePositions([0, 1]);
                          setSliceOrder([0]);
                        }}
                        style={{ padding: '5px 12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Trash2 size={13} /> Clear Cuts
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* MPC Hardware Trigger Pads — shown on slice-count tasks in clean 4-column MPC grid */}
              {q.type === 'slice-count' && (
                <div style={{ marginTop: '14px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 'bold', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>🎛️</span> MPC Trigger Pads (Click to audition each slice):
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Web Audio Synthesiser</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: numSlices > 4 ? 'repeat(4, 1fr)' : `repeat(${Math.max(1, numSlices)}, 1fr)`, gap: '8px' }}>
                  {Array.from({ length: numSlices }).map((_, idx) => {
                    const colorTheme = SLICE_COLORS[idx % SLICE_COLORS.length];
                    const isTriggered = activePad === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => playSingleSlice(idx)}
                        style={{
                          background: isTriggered ? colorTheme.border : 'rgba(30, 41, 59, 0.8)',
                          border: `2px solid ${isTriggered ? '#fff' : colorTheme.border}`,
                          color: isTriggered ? '#000' : '#fff',
                          borderRadius: '10px',
                          padding: '9px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '3px',
                          boxShadow: isTriggered ? `0 0 18px ${colorTheme.border}` : '0 3px 8px rgba(0,0,0,0.3)',
                          transform: isTriggered ? 'scale(0.96)' : 'scale(1)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.8px', opacity: 0.85 }}>
                          Pad {idx + 1}
                        </span>
                        <span style={{ fontSize: '1.05rem', fontWeight: '800' }}>
                          Slice {idx + 1}
                        </span>
                        <span style={{ fontSize: '0.66rem', opacity: 0.8 }}>
                          ▶ Audition
                        </span>
                      </button>
                    );
                  })}
                  </div>
                </div>
              )}

              {/* Rearrange / Sequencer / Truncation Section */}
              {q.type === 'rearrange' && (() => {
                const baseSliceCount = q.preSliced ? q.preSliced.length - 1 : 4;
                const needsTruncation = q.targetOrder.length < baseSliceCount;
                const needsDuplication = q.targetOrder.length > baseSliceCount;

                return (
                  <div style={{ marginTop: '14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shuffle size={16} color="#c084fc" />
                        Slice Arrangement Sequence
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                          Target: <strong style={{ color: '#34d399' }}>{q.targetOrder.map(i => i + 1).join(' - ')}</strong>
                        </span>
                        {!showFeedback && (
                          <button
                            type="button"
                            onClick={resetSequence}
                            style={{
                              padding: '4px 10px',
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.15)',
                              color: '#cbd5e1',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <RotateCcw size={12} /> Reset
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Full-Width Sequencer Lane Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${Math.max(1, sliceOrder.length)}, minmax(90px, 1fr))`,
                      gap: '10px',
                      marginBottom: needsTruncation ? '12px' : '0',
                      padding: '10px',
                      background: 'rgba(15, 23, 42, 0.65)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      {sliceOrder.map((sliceIdx, orderIdx) => {
                        const colorTheme = SLICE_COLORS[sliceIdx % SLICE_COLORS.length];

                        return (
                          <div
                            key={orderIdx}
                            draggable={!showFeedback}
                            onClick={() => playSingleSlice(sliceIdx)}
                            onDragStart={() => handleDragStart(orderIdx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(orderIdx)}
                            style={{
                              background: `linear-gradient(135deg, ${colorTheme.border}, #4f46e5)`,
                              borderRadius: '10px',
                              padding: '10px 10px',
                              textAlign: 'center',
                              cursor: showFeedback ? 'default' : 'grab',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                              userSelect: 'none',
                              position: 'relative'
                            }}
                          >
                            <div style={{ fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.85 }}>
                              Step {orderIdx + 1}
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '800', margin: '2px 0' }}>
                              Slice {sliceIdx + 1}
                            </div>

                            {/* Quick Controls: Move Left/Right + Contextual Dup/Remove */}
                            {!showFeedback && (
                              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                                {orderIdx > 0 && (
                                  <button
                                    type="button"
                                    title="Move Left"
                                    onClick={(e) => { e.stopPropagation(); moveSlice(orderIdx, orderIdx - 1); }}
                                    style={{ background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', cursor: 'pointer' }}
                                  >
                                    ◀
                                  </button>
                                )}
                                {orderIdx < sliceOrder.length - 1 && (
                                  <button
                                    type="button"
                                    title="Move Right"
                                    onClick={(e) => { e.stopPropagation(); moveSlice(orderIdx, orderIdx + 1); }}
                                    style={{ background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', cursor: 'pointer' }}
                                  >
                                    ▶
                                  </button>
                                )}
                                {needsDuplication && (
                                  <button
                                    type="button"
                                    title="Duplicate this slice"
                                    onClick={(e) => { e.stopPropagation(); duplicateSlice(orderIdx); }}
                                    style={{ background: 'rgba(16, 185, 129, 0.85)', border: 'none', color: '#052e16', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                                  >
                                    + Dup
                                  </button>
                                )}
                                {(needsTruncation || (needsDuplication && sliceOrder.length > 1)) && (
                                  <button
                                    type="button"
                                    title="Remove this slice"
                                    onClick={(e) => { e.stopPropagation(); removeSliceAt(orderIdx); }}
                                    style={{ background: 'rgba(239, 68, 68, 0.85)', border: 'none', color: '#fff', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Truncation Drop Zone & Button — shown ONLY on truncation questions */}
                    {!showFeedback && needsTruncation && (
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleDropTrash}
                          style={{
                            flex: 1,
                            border: '2px dashed rgba(239, 68, 68, 0.4)',
                            borderRadius: '10px',
                            padding: '10px',
                            background: 'rgba(239, 68, 68, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            color: '#f87171',
                            fontSize: '0.84rem',
                            fontWeight: '600'
                          }}
                        >
                          <Trash2 size={15} /> Drag slice here to truncate / remove
                        </div>

                        {sliceOrder.length === 4 && (
                          <button
                            type="button"
                            onClick={() => removeSlice(3)}
                            style={{
                              padding: '8px 14px',
                              background: 'rgba(239, 68, 68, 0.2)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              color: '#fca5a5',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              fontSize: '0.84rem',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Trash2 size={15} /> Truncate Slice 4 (Delete End)
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Audio Playback Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '20px' }}>
                <button
                  onClick={playOriginal}
                  disabled={isPlayingOriginal}
                  style={{
                    padding: '14px 20px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#34d399',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    cursor: isPlayingOriginal ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: isPlayingOriginal ? 0.6 : 1
                  }}
                >
                  {isPlayingOriginal ? <Pause size={18} /> : <Play size={18} />}
                  {isPlayingOriginal ? 'Playing Loop...' : 'Play Original Loop'}
                </button>

                <button
                  onClick={playChopped}
                  disabled={isPlayingChopped || sliceOrder.length === 0}
                  style={{
                    padding: '14px 20px',
                    background: 'rgba(168, 85, 247, 0.2)',
                    border: '1px solid rgba(168, 85, 247, 0.4)',
                    color: '#c084fc',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    cursor: (isPlayingChopped || sliceOrder.length === 0) ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: (isPlayingChopped || sliceOrder.length === 0) ? 0.6 : 1
                  }}
                >
                  {isPlayingChopped ? <Pause size={18} /> : <Volume2 size={18} />}
                  {isPlayingChopped ? 'Playing Chop...' : 'Play Chopped / Arranged'}
                </button>
              </div>

              {/* Submit / Verification Button */}
              {!showFeedback && (
                <button
                  onClick={checkAnswer}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '20px',
                    boxShadow: '0 8px 20px rgba(139, 92, 246, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Check size={20} /> Verify Slicing & Sequence
                </button>
              )}
            </div>
          )}

          {/* Multiple Choice Question Format */}
          {q.type === 'multiple-choice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
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
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      border: showCorrect
                        ? '2px solid #10b981'
                        : showIncorrect
                        ? '2px solid #ef4444'
                        : isSelected
                        ? '2px solid #8b5cf6'
                        : '1px solid rgba(255,255,255,0.12)',
                      background: showCorrect
                        ? 'rgba(16, 185, 129, 0.2)'
                        : showIncorrect
                        ? 'rgba(239, 68, 68, 0.2)'
                        : isSelected
                        ? 'rgba(139, 92, 246, 0.2)'
                        : 'rgba(255, 255, 255, 0.04)',
                      color: '#f8fafc',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      cursor: showFeedback ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{option}</span>
                    {showCorrect && <Check size={20} color="#10b981" style={{ flexShrink: 0 }} />}
                    {showIncorrect && <X size={20} color="#ef4444" style={{ flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Pedagogical Feedback & Explanations */}
          {showFeedback && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '20px' }}>
              <div style={{
                background: (q.type === 'multiple-choice' ? selectedAnswer === q.correct : selectedAnswer === true)
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(234, 179, 8, 0.15)',
                border: `1px solid ${(q.type === 'multiple-choice' ? selectedAnswer === q.correct : selectedAnswer === true)
                  ? 'rgba(16, 185, 129, 0.4)'
                  : 'rgba(234, 179, 8, 0.4)'}`,
                borderRadius: '14px',
                padding: '18px 20px',
                marginBottom: '16px',
                color: '#fff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '8px', color: (q.type === 'multiple-choice' ? selectedAnswer === q.correct : selectedAnswer === true) ? '#34d399' : '#facc15' }}>
                  {(q.type === 'multiple-choice' ? selectedAnswer === q.correct : selectedAnswer === true) ? (
                    <>
                      <Check size={22} color="#34d399" />
                      <span>Correct Analysis!</span>
                    </>
                  ) : (
                    <>
                      <X size={22} color="#facc15" />
                      <span>Review Key Concept</span>
                    </>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.6', color: '#cbd5e1' }}>
                  {q.explanation}
                </p>
              </div>

              {q.producerTip && (
                <div style={{ background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', padding: '14px 18px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                  <Sparkles size={18} style={{ color: '#c084fc', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#c084fc' }}>Producer & Exam Tip: </strong>
                    {q.producerTip}
                  </div>
                </div>
              )}

              <button
                onClick={nextQuestion}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.05rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)'
                }}
              >
                {currentQuestion < questions.length - 1 ? (
                  <>Next Question <ArrowRight size={20} /></>
                ) : (
                  <>Complete Quiz & View Score <Award size={20} /></>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
