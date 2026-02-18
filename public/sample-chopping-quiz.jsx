import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Sparkles, Lightbulb, BookOpen, Scissors, Shuffle, Volume2, Pause, Trash2 } from 'lucide-react';

export default function SampleChoppingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [slicePositions, setSlicePositions] = useState([]);
  const [sliceOrder, setSliceOrder] = useState([]);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [isPlayingChopped, setIsPlayingChopped] = useState(false);
  const [draggedSlice, setDraggedSlice] = useState(null);
  const audioContextRef = useRef(null);

  const questions = [
    {
      type: 'slice-count',
      question: 'Slice this drum loop into 4 equal parts (4 slices)',
      hint: 'Place slice markers to divide the loop into quarters - click at 25%, 50%, 75%',
      waveform: 'kick-snare-loop',
      targetSlices: 4,
      explanation: 'Slicing into 4 parts creates quarters. This is the most common starting point for chopping drum loops - each slice becomes a beat you can rearrange!'
    },
    {
      type: 'rearrange',
      question: 'Reverse this 4-beat loop (make it play backwards)',
      hint: 'Drag the slices to flip the order: 4-3-2-1 instead of 1-2-3-4',
      waveform: 'melody-loop',
      preSliced: [0, 0.25, 0.5, 0.75, 1.0],
      targetOrder: [3, 2, 1, 0],
      explanation: 'Reversing a loop creates a backwards effect! This technique is used in hip-hop and electronic music to create unique textures.'
    },
    {
      type: 'slice-count',
      question: 'Slice this break into 8 equal parts for chopping',
      hint: 'Click to place 7 slice points, dividing into 8 sections (every 12.5%)',
      waveform: 'breakbeat',
      targetSlices: 8,
      explanation: 'Slicing into 8 parts gives you eighth-note slices - perfect for detailed rearrangement. Classic in jungle and drum & bass!'
    },
    {
      type: 'rearrange',
      question: 'Create a "stuttering" effect by repeating the first slice',
      hint: 'Arrange the slices like: 1-1-2-3 (first slice plays twice)',
      waveform: 'vocal-chop',
      preSliced: [0, 0.33, 0.66, 1.0],
      targetOrder: [0, 0, 1, 2],
      explanation: 'Stuttering is when you repeat a slice! This creates a glitchy, rhythmic effect popular in electronic and hip-hop production.'
    },
    {
      type: 'multiple-choice',
      question: 'What is "sample chopping" in music production?',
      hint: 'Think about what you\'ve been doing in this quiz!',
      options: [
        'Cutting a sample with scissors',
        'Slicing a sample into pieces and rearranging them',
        'Deleting parts of a sample',
        'Making a sample quieter'
      ],
      correct: 1,
      explanation: 'Sample chopping is slicing audio into pieces and rearranging them to create new rhythms and melodies. It\'s a fundamental hip-hop and electronic music technique!'
    },
    {
      type: 'rearrange',
      question: 'Shuffle this beat: move slice 2 to the beginning',
      hint: 'Rearrange to: 2-1-3-4',
      waveform: 'kick-snare-loop',
      preSliced: [0, 0.25, 0.5, 0.75, 1.0],
      targetOrder: [1, 0, 2, 3],
      explanation: 'Shuffling slices creates new grooves! Moving beats around is how producers create unique drum patterns from existing loops.'
    },
    {
      type: 'slice-count',
      question: 'Slice this loop to isolate each drum hit (2 slices)',
      hint: 'Listen for the kick and snare - slice between them',
      waveform: 'simple-beat',
      targetSlices: 2,
      explanation: 'Slicing at transients (drum hits) lets you isolate individual sounds. You can then trigger each hit separately or rearrange them!'
    },
    {
      type: 'multiple-choice',
      question: 'What are "transients" in audio?',
      hint: 'Think about the sharp, sudden parts of drum hits',
      options: [
        'Quiet parts of audio',
        'The sudden, sharp attack of sounds (like drum hits)',
        'Background noise',
        'Sustained notes'
      ],
      correct: 1,
      explanation: 'Transients are the sharp, sudden peaks in audio - like the "crack" of a snare or "thump" of a kick. Slicing at transients is key to clean sample chopping!'
    },
    {
      type: 'rearrange',
      question: 'Remove the last slice to make the loop shorter',
      hint: 'Delete slice 4 by dragging it to the trash, keep 1-2-3',
      waveform: 'breakbeat',
      preSliced: [0, 0.25, 0.5, 0.75, 1.0],
      targetOrder: [0, 1, 2],
      explanation: 'Removing slices shortens loops! This technique lets you cut out unwanted parts or create new rhythmic patterns by subtraction.'
    },
    {
      type: 'multiple-choice',
      question: 'Which music genre heavily pioneered sample chopping?',
      hint: 'Think about J Dilla, DJ Premier, MF DOOM...',
      options: [
        'Classical',
        'Hip-Hop',
        'Country',
        'Jazz'
      ],
      correct: 1,
      explanation: 'Hip-hop pioneered sample chopping! Producers like J Dilla and Pete Rock turned it into an art form, creating new beats from chopped soul and funk records.'
    }
  ];

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Generate waveform data
  const generateWaveform = (type) => {
    const points = 100;
    const data = [];
    
    for (let i = 0; i < points; i++) {
      const x = i / points;
      let amplitude = 0;
      
      switch(type) {
        case 'kick-snare-loop':
          // Kick on 1 and 3, Snare on 2 and 4
          if (Math.abs(x % 0.25) < 0.05) {
            amplitude = x % 0.5 < 0.25 ? 0.9 : 0.7; // Kick louder than snare
          } else {
            amplitude = 0.2 + Math.random() * 0.1; // Background
          }
          break;
          
        case 'melody-loop':
          // Melodic wave
          amplitude = 0.5 + Math.sin(x * Math.PI * 8) * 0.4 + Math.random() * 0.05;
          break;
          
        case 'breakbeat':
          // Complex drum break
          amplitude = 0.3 + Math.sin(x * Math.PI * 16) * 0.3;
          if (Math.abs(x % 0.125) < 0.03) {
            amplitude += 0.4;
          }
          break;
          
        case 'vocal-chop':
          // Vocal sample
          amplitude = 0.4 + Math.sin(x * Math.PI * 4) * 0.3 * (1 - x * 0.3);
          break;
          
        case 'simple-beat':
          // Simple kick-snare
          if (Math.abs(x - 0.25) < 0.05 || Math.abs(x - 0.75) < 0.05) {
            amplitude = 0.85;
          } else {
            amplitude = 0.15;
          }
          break;
          
        default:
          amplitude = 0.5 + Math.sin(x * Math.PI * 4) * 0.3;
      }
      
      data.push(amplitude);
    }
    
    return data;
  };

  // Play original loop
  const playOriginal = () => {
    const ctx = audioContextRef.current;
    if (!ctx || isPlayingOriginal) return;

    setIsPlayingOriginal(true);
    const q = questions[currentQuestion];
    const now = ctx.currentTime;
    const duration = 2.0; // 2 second loop
    
    // Create a basic rhythmic pattern
    const pattern = getPatternForWaveform(q.waveform);
    
    pattern.forEach(({ time, freq, type }) => {
      const noteTime = now + (time * duration);
      playNote(freq, noteTime, type);
    });

    setTimeout(() => setIsPlayingOriginal(false), duration * 1000);
  };

  // Play chopped version
  const playChopped = () => {
    const ctx = audioContextRef.current;
    if (!ctx || isPlayingChopped || sliceOrder.length === 0) return;

    setIsPlayingChopped(true);
    const q = questions[currentQuestion];
    const now = ctx.currentTime;
    const totalDuration = 2.0;
    const sliceDuration = totalDuration / sliceOrder.length;
    
    const pattern = getPatternForWaveform(q.waveform);
    
    sliceOrder.forEach((sliceIndex, orderIndex) => {
      const sliceStartTime = orderIndex * sliceDuration;
      
      // Get sounds for this slice
      const originalSliceStart = sliceIndex / (slicePositions.length - 1 || 1);
      const originalSliceEnd = (sliceIndex + 1) / (slicePositions.length - 1 || 1);
      
      const sliceSounds = pattern.filter(p => 
        p.time >= originalSliceStart && p.time < originalSliceEnd
      );
      
      sliceSounds.forEach(({ time, freq, type }) => {
        // Remap time to new position
        const relativeTime = (time - originalSliceStart) / (originalSliceEnd - originalSliceStart);
        const newTime = now + sliceStartTime + (relativeTime * sliceDuration);
        playNote(freq, newTime, type);
      });
    });

    setTimeout(() => setIsPlayingChopped(false), totalDuration * 1000);
  };

  const getPatternForWaveform = (type) => {
    switch(type) {
      case 'kick-snare-loop':
        return [
          { time: 0, freq: 60, type: 'kick' },
          { time: 0.25, freq: 200, type: 'snare' },
          { time: 0.5, freq: 60, type: 'kick' },
          { time: 0.75, freq: 200, type: 'snare' },
        ];
      case 'simple-beat':
        return [
          { time: 0.25, freq: 60, type: 'kick' },
          { time: 0.75, freq: 200, type: 'snare' },
        ];
      case 'melody-loop':
        return [
          { time: 0, freq: 262, type: 'tone' },
          { time: 0.25, freq: 330, type: 'tone' },
          { time: 0.5, freq: 392, type: 'tone' },
          { time: 0.75, freq: 330, type: 'tone' },
        ];
      case 'vocal-chop':
        return [
          { time: 0, freq: 220, type: 'tone' },
          { time: 0.33, freq: 262, type: 'tone' },
          { time: 0.66, freq: 196, type: 'tone' },
        ];
      case 'breakbeat':
        return [
          { time: 0, freq: 60, type: 'kick' },
          { time: 0.125, freq: 8000, type: 'hihat' },
          { time: 0.25, freq: 200, type: 'snare' },
          { time: 0.375, freq: 8000, type: 'hihat' },
          { time: 0.5, freq: 60, type: 'kick' },
          { time: 0.625, freq: 8000, type: 'hihat' },
          { time: 0.75, freq: 200, type: 'snare' },
          { time: 0.875, freq: 60, type: 'kick' },
        ];
      default:
        return [{ time: 0, freq: 440, type: 'tone' }];
    }
  };

  const playNote = (freq, time, type) => {
    const ctx = audioContextRef.current;
    const now = time;
    
    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'snare') {
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      noise.buffer = buffer;
      filter.type = 'highpass';
      filter.frequency.value = 1500;
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } else if (type === 'hihat') {
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      noise.buffer = buffer;
      filter.type = 'highpass';
      filter.frequency.value = 8000;
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  };

  const addSlice = (position) => {
    if (showFeedback) return;
    
    const normalizedPos = position / 600; // 600 is waveform width
    
    // Don't add if too close to existing slice
    const tooClose = slicePositions.some(pos => Math.abs(pos - normalizedPos) < 0.05);
    if (tooClose) return;
    
    const newSlices = [...slicePositions, normalizedPos].sort((a, b) => a - b);
    setSlicePositions(newSlices);
    
    // Update slice order
    const newOrder = Array.from({ length: newSlices.length - 1 }, (_, i) => i);
    setSliceOrder(newOrder);
  };

  const handleDragStart = (index) => {
    if (showFeedback) return;
    setDraggedSlice(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedSlice === null || showFeedback) return;
    
    const newOrder = [...sliceOrder];
    const draggedValue = newOrder[draggedSlice];
    newOrder.splice(draggedSlice, 1);
    newOrder.splice(targetIndex, 0, draggedValue);
    
    setSliceOrder(newOrder);
    setDraggedSlice(null);
  };

  const handleDropToTrash = () => {
    if (draggedSlice === null || showFeedback) return;
    
    const newOrder = [...sliceOrder];
    newOrder.splice(draggedSlice, 1);
    setSliceOrder(newOrder);
    setDraggedSlice(null);
  };

  const checkAnswer = async () => {
    const q = questions[currentQuestion];
    let isCorrect = false;
    
    if (q.type === 'slice-count') {
      // Check if correct number of slices (positions includes start and end)
      const actualSlices = slicePositions.length - 1;
      isCorrect = actualSlices === q.targetSlices;
    } else if (q.type === 'rearrange') {
      // Check if slice order matches target
      isCorrect = JSON.stringify(sliceOrder) === JSON.stringify(q.targetOrder);
    }
    
    setSelectedAnswer(isCorrect);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    await getAIExplanation(q, isCorrect);
  };

  const getAIExplanation = async (question, isCorrect) => {
    setLoadingExplanation(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You're a hip-hop producer teaching sample chopping. A student just answered:

Question: ${question.question}
Result: ${isCorrect ? 'Correct' : 'Incorrect'}

Provide a warm, encouraging explanation (2-3 sentences) that:
- Celebrates success or gently guides if incorrect
- Explains the sampling technique
- Gives a practical production tip
Keep it friendly and producer-focused!`
            }
          ]
        })
      });

      const data = await response.json();
      const explanation = data.content
        .map(item => item.type === "text" ? item.text : "")
        .join("\n");
      setAiExplanation(explanation);
    } catch (error) {
      console.error("AI explanation error:", error);
      setAiExplanation("Great effort! " + question.explanation);
    } finally {
      setLoadingExplanation(false);
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

    await getAIExplanation(currentQ, isCorrect);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAiExplanation('');
      
      const nextQ = questions[currentQuestion + 1];
      if (nextQ.preSliced) {
        setSlicePositions(nextQ.preSliced);
        setSliceOrder(Array.from({ length: nextQ.preSliced.length - 1 }, (_, i) => i));
      } else {
        setSlicePositions([0, 1]);
        setSliceOrder([0]);
      }
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
    setAiExplanation('');
    setShowIntro(true);
    setSlicePositions([0, 1]);
    setSliceOrder([0]);
  };

  const renderWaveform = () => {
    const q = questions[currentQuestion];
    const waveformData = generateWaveform(q.waveform);
    const width = 600;
    const height = 150;
    
    const points = waveformData.map((amp, i) => {
      const x = (i / waveformData.length) * width;
      const y = height / 2 - (amp * height / 2.5);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="bg-gray-900 rounded-xl p-6">
        <svg 
          width={width} 
          height={height} 
          className="bg-black rounded-lg cursor-pointer"
          onClick={(e) => {
            if (q.type === 'slice-count' && !showFeedback) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              addSlice(x);
            }
          }}
        >
          {/* Waveform */}
          <polyline
            points={points}
            fill="none"
            stroke="#00ff88"
            strokeWidth="2"
          />
          
          {/* Slice markers */}
          {slicePositions.map((pos, i) => {
            if (pos === 0 || pos === 1) return null; // Don't show start/end
            return (
              <g key={i}>
                <line
                  x1={pos * width}
                  y1={0}
                  x2={pos * width}
                  y2={height}
                  stroke="#ff0066"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <circle
                  cx={pos * width}
                  cy={10}
                  r="6"
                  fill="#ff0066"
                />
              </g>
            );
          })}
          
          {/* Slice number labels */}
          {slicePositions.slice(0, -1).map((pos, i) => {
            const nextPos = slicePositions[i + 1] || 1;
            const midPoint = (pos + nextPos) / 2;
            return (
              <text
                key={i}
                x={midPoint * width}
                y={height - 10}
                fill="#00ff88"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
              >
                {i + 1}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderSliceSequencer = () => {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Shuffle size={18} />
          Slice Sequencer - Drag to Rearrange
        </h3>
        
        <div className="flex flex-wrap gap-3 mb-4 min-h-[80px]">
          {sliceOrder.map((sliceIndex, orderIndex) => (
            <div
              key={orderIndex}
              draggable={!showFeedback}
              onDragStart={() => handleDragStart(orderIndex)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(orderIndex)}
              className={`bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 min-w-[80px] text-center cursor-move hover:scale-105 transition-transform ${
                showFeedback ? 'cursor-not-allowed opacity-75' : ''
              }`}
            >
              <div className="text-white text-sm font-semibold mb-1">Slice</div>
              <div className="text-white text-2xl font-bold">{sliceIndex + 1}</div>
            </div>
          ))}
        </div>

        {/* Trash zone */}
        {!showFeedback && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDropToTrash}
            className="border-2 border-dashed border-red-400 rounded-lg p-4 bg-red-900 bg-opacity-20 flex items-center justify-center gap-2 hover:bg-opacity-30 transition-all"
          >
            <Trash2 className="text-red-400" size={20} />
            <span className="text-red-400 font-semibold">Drag here to remove slice</span>
          </div>
        )}
      </div>
    );
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];

    if (q.type === 'slice-count' || q.type === 'rearrange') {
      return (
        <div className="space-y-6">
          {/* Waveform */}
          {renderWaveform()}

          {/* Slice sequencer for rearrange questions */}
          {q.type === 'rearrange' && renderSliceSequencer()}

          {/* Info panel */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            {q.type === 'slice-count' ? (
              <p className="text-sm text-blue-800">
                ✂️ <strong>Click on the waveform</strong> to add slice markers. Place {q.targetSlices} slices to divide the loop.
              </p>
            ) : (
              <p className="text-sm text-blue-800">
                🔄 <strong>Drag the slice boxes</strong> to rearrange the order. Create the pattern: {q.targetOrder.map(i => i + 1).join('-')}
              </p>
            )}
          </div>

          {/* Slice count display */}
          {q.type === 'slice-count' && (
            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
              <div>
                <div className="text-sm text-gray-600">Current Slices:</div>
                <div className="text-2xl font-bold text-gray-800">{Math.max(0, slicePositions.length - 1)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Target:</div>
                <div className="text-2xl font-bold text-blue-600">{q.targetSlices}</div>
              </div>
              {slicePositions.length > 2 && (
                <button
                  onClick={() => {
                    setSlicePositions([0, 1]);
                    setSliceOrder([0]);
                  }}
                  disabled={showFeedback}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Clear Slices
                </button>
              )}
            </div>
          )}

          {/* Playback controls */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={playOriginal}
              disabled={isPlayingOriginal}
              className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
            >
              {isPlayingOriginal ? <Pause size={20} /> : <Play size={20} />}
              {isPlayingOriginal ? 'Playing...' : 'Play Original'}
            </button>
            <button
              onClick={playChopped}
              disabled={isPlayingChopped || sliceOrder.length === 0}
              className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
            >
              {isPlayingChopped ? <Pause size={20} /> : <Volume2 size={20} />}
              {isPlayingChopped ? 'Playing...' : 'Play Chopped'}
            </button>
          </div>

          {/* Check button */}
          {!showFeedback && (
            <button
              onClick={checkAnswer}
              className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg"
            >
              Check Answer
            </button>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer ? (
                  <>
                    <Check className="text-green-600" size={24} />
                    <span className="font-bold text-green-800 text-lg">Perfect! 🎵</span>
                  </>
                ) : (
                  <>
                    <X className="text-orange-600" size={24} />
                    <span className="font-bold text-orange-800 text-lg">Not quite - try again next time!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700">{q.explanation}</p>
            </div>
          )}
        </div>
      );
    }

    if (q.type === 'multiple-choice') {
      return (
        <div className="space-y-3">
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
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showCorrect && <Check className="text-green-600" size={20} />}
                  {showIncorrect && <X className="text-red-600" size={20} />}
                </div>
              </button>
            );
          })}
        </div>
      );
    }
  };

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✂️</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Sample Chopping Quiz</h1>
            <p className="text-xl text-gray-600">Learn to slice and rearrange audio like a hip-hop producer!</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">What You'll Learn</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>How to slice audio samples into pieces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Rearrange slices to create new rhythms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Classic hip-hop production techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Create stutters, reversals, and shuffles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Scissors className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">How It Works</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p><strong>Sample chopping</strong> is slicing audio and rearranging it - a fundamental hip-hop technique!</p>
                  <p>✂️ <strong>Click the waveform</strong> to add slice markers</p>
                  <p>🔄 <strong>Drag slices</strong> to rearrange them</p>
                  <p>🎵 <strong>Play back</strong> to hear your creation</p>
                  <div className="bg-white p-3 rounded-lg border border-yellow-300">
                    <p className="text-xs font-semibold mb-1">💡 Producer Tip:</p>
                    <p className="text-xs">J Dilla, MF DOOM, and Madlib mastered this technique. They could take a 2-second soul sample and create an entire beat!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🎵 10 Questions</div>
              <div>Slicing & rearranging</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🔊 Audio Playback</div>
              <div>Hear before & after</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🤖 AI Tutor</div>
              <div>Hip-hop production tips</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">⏱️ No Time Limit</div>
              <div>Practice at your pace</div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowIntro(false);
              const firstQ = questions[0];
              if (firstQ.preSliced) {
                setSlicePositions(firstQ.preSliced);
                setSliceOrder(Array.from({ length: firstQ.preSliced.length - 1 }, (_, i) => i));
              } else {
                setSlicePositions([0, 1]);
                setSliceOrder([0]);
              }
            }}
            className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium text-lg flex items-center justify-center gap-2"
          >
            Start Quiz
            <Play size={24} />
          </button>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '✂️' : '🎵'}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold text-purple-600 mb-2">{percentage}%</div>
            <p className="text-xl text-gray-600 mb-8">
              You scored {score} out of {questions.length}
            </p>
            <div className="space-y-3">
              <div className={`p-4 rounded-lg ${
                percentage >= 70 ? 'bg-green-100 text-green-800' :
                percentage >= 50 ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                <p className="font-semibold">
                  {percentage >= 70 ? '🌟 Excellent! You\'re ready to chop samples like a pro producer!' :
                   percentage >= 50 ? '👏 Good work! Keep practicing chopping in your DAW!' :
                   '💪 Great start! Sample chopping takes practice - try it in FL Studio or Ableton!'}
                </p>
              </div>
              
              {percentage < 100 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Tips for improvement:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Slice at transients (drum hits) for clean cuts</li>
                        <li>• Listen to the original before chopping</li>
                        <li>• Experiment with different arrangements</li>
                        <li>• Study J Dilla, Madlib, and DJ Premier's chopping techniques!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={resetQuiz}
                className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                {percentage < 100 ? 'Try Again' : 'Retake Quiz'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Sample Chopping Quiz</h1>
            <p className="text-purple-100">Slice, rearrange, create!</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 h-2">
            <div 
              className="bg-purple-600 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question Area */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-purple-600">
                Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {questions[currentQuestion].question}
              </h2>
              
              {/* Hint */}
              {questions[currentQuestion].hint && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">Hint</p>
                      <p className="text-sm text-yellow-700">{questions[currentQuestion].hint}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {renderQuestion()}
            </div>

            {/* AI Explanation */}
            {showFeedback && (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-purple-600" size={18} />
                    <h3 className="font-semibold text-purple-900">AI Producer Tips</h3>
                  </div>
                  {loadingExplanation ? (
                    <div className="flex items-center gap-2 text-purple-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span className="text-sm">Generating explanation...</span>
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed">{aiExplanation}</p>
                  )}
                </div>
              </div>
            )}

            {/* Next Button */}
            {showFeedback && (
              <button
                onClick={nextQuestion}
                className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium flex items-center justify-center gap-2"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                <Play size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
          <p className="text-sm text-gray-600 text-center">
            💡 <strong>Pro Tip:</strong> In your DAW, use keyboard shortcuts to slice at transients automatically. 
            Then experiment with different arrangements to find the perfect groove!
          </p>
        </div>
      </div>
    </div>
  );
}