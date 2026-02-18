import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Sparkles, Lightbulb, BookOpen, Music, Pause, Volume2 } from 'lucide-react';

export default function PianoRollQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [userNotes, setUserNotes] = useState([]);
  const [isPlayingTarget, setIsPlayingTarget] = useState(false);
  const [isPlayingUser, setIsPlayingUser] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const audioContextRef = useRef(null);

  const questions = [
    {
      type: 'drum-pattern-match',
      question: 'Listen to the target drum pattern and recreate it',
      hint: 'Four-on-the-floor: Kick drum on every beat (beats 1, 2, 3, 4)',
      rows: [
        { name: 'Hi-Hat', note: 'HH' },
        { name: 'Snare', note: 'SN' },
        { name: 'Kick', note: 'KK' }
      ],
      columns: 16,
      targetPattern: [
        { row: 2, col: 0, length: 1 },
        { row: 2, col: 4, length: 1 },
        { row: 2, col: 8, length: 1 },
        { row: 2, col: 12, length: 1 },
      ],
      explanation: 'Four-on-the-floor is a kick drum on every quarter note (beats 1, 2, 3, 4). This driving pattern is the foundation of house, techno, and most electronic dance music!'
    },
    {
      type: 'melody-match',
      question: 'Recreate this simple piano melody',
      hint: 'Listen carefully - it goes C, E, G, E (up and back down)',
      rows: [
        { name: 'C5', note: 'C5' },
        { name: 'B4', note: 'B4' },
        { name: 'A4', note: 'A4' },
        { name: 'G4', note: 'G4' },
        { name: 'F4', note: 'F4' },
        { name: 'E4', note: 'E4' },
        { name: 'D4', note: 'D4' },
        { name: 'C4', note: 'C4' },
      ],
      columns: 16,
      targetPattern: [
        { row: 7, col: 0, length: 2 },  // C4
        { row: 5, col: 4, length: 2 },  // E4
        { row: 3, col: 8, length: 2 },  // G4
        { row: 5, col: 12, length: 2 }, // E4
      ],
      explanation: 'This melody uses notes from a C major chord (C-E-G). Playing chord tones in sequence creates a pleasant, harmonious melody.'
    },
    {
      type: 'drum-pattern-match',
      question: 'Create the classic rock beat',
      hint: 'Kick on 1 & 3, Snare on 2 & 4 - the most famous drum pattern!',
      rows: [
        { name: 'Hi-Hat', note: 'HH' },
        { name: 'Snare', note: 'SN' },
        { name: 'Kick', note: 'KK' }
      ],
      columns: 16,
      targetPattern: [
        { row: 2, col: 0, length: 1 },  // Kick on 1
        { row: 1, col: 8, length: 1 },  // Snare on 2
        { row: 2, col: 8, length: 1 },  // Kick on 3 (actually beat 3 is col 8 in 16-step)
        { row: 1, col: 8, length: 1 },  // Snare on 4
      ],
      prefilledNotes: [],
      targetPattern: [
        { row: 2, col: 0, length: 1 },
        { row: 1, col: 4, length: 1 },
        { row: 2, col: 8, length: 1 },
        { row: 1, col: 12, length: 1 },
      ],
      explanation: 'The backbeat! Kick on 1 and 3 (the downbeats), snare on 2 and 4 (the backbeat). This pattern is in rock, pop, funk, and countless other genres.'
    },
    {
      type: 'melody-match',
      question: 'Play this C major scale going up',
      hint: 'Eight notes going up the white keys: C-D-E-F-G-A-B-C',
      rows: [
        { name: 'C5', note: 'C5' },
        { name: 'B4', note: 'B4' },
        { name: 'A4', note: 'A4' },
        { name: 'G4', note: 'G4' },
        { name: 'F4', note: 'F4' },
        { name: 'E4', note: 'E4' },
        { name: 'D4', note: 'D4' },
        { name: 'C4', note: 'C4' },
      ],
      columns: 16,
      targetPattern: [
        { row: 7, col: 0, length: 1 },
        { row: 6, col: 2, length: 1 },
        { row: 5, col: 4, length: 1 },
        { row: 4, col: 6, length: 1 },
        { row: 3, col: 8, length: 1 },
        { row: 2, col: 10, length: 1 },
        { row: 1, col: 12, length: 1 },
        { row: 0, col: 14, length: 1 },
      ],
      explanation: 'The C major scale! This is do-re-mi-fa-sol-la-ti-do. Learning scales helps you understand melodies and create your own music.'
    },
    {
      type: 'drum-pattern-match',
      question: 'Add eighth-note hi-hats to this beat',
      hint: 'Place hi-hats on EVERY step (all 8 positions) to create a driving rhythm',
      rows: [
        { name: 'Hi-Hat', note: 'HH' },
        { name: 'Snare', note: 'SN' },
        { name: 'Kick', note: 'KK' }
      ],
      columns: 16,
      prefilledNotes: [
        { row: 2, col: 0, length: 1 },
        { row: 1, col: 4, length: 1 },
        { row: 2, col: 8, length: 1 },
        { row: 1, col: 12, length: 1 },
      ],
      targetPattern: [
        { row: 0, col: 0, length: 1 }, { row: 0, col: 2, length: 1 },
        { row: 0, col: 4, length: 1 }, { row: 0, col: 6, length: 1 },
        { row: 0, col: 8, length: 1 }, { row: 0, col: 10, length: 1 },
        { row: 0, col: 12, length: 1 }, { row: 0, col: 14, length: 1 },
        { row: 2, col: 0, length: 1 },
        { row: 1, col: 4, length: 1 },
        { row: 2, col: 8, length: 1 },
        { row: 1, col: 12, length: 1 },
      ],
      explanation: 'Eighth-note hi-hats create constant forward motion and energy. This "chick-a chick-a" rhythm is essential in most modern music production!'
    },
    {
      type: 'melody-match',
      question: 'Create a C major chord (all notes at the same time)',
      hint: 'Place C, E, and G all starting at the first beat, make them longer notes',
      rows: [
        { name: 'C5', note: 'C5' },
        { name: 'B4', note: 'B4' },
        { name: 'A4', note: 'A4' },
        { name: 'G4', note: 'G4' },
        { name: 'F4', note: 'F4' },
        { name: 'E4', note: 'E4' },
        { name: 'D4', note: 'D4' },
        { name: 'C4', note: 'C4' },
      ],
      columns: 16,
      targetPattern: [
        { row: 7, col: 0, length: 4 },
        { row: 5, col: 0, length: 4 },
        { row: 3, col: 0, length: 4 },
      ],
      explanation: 'A chord is multiple notes played simultaneously! C-E-G creates a C major chord - the most fundamental harmony in music. Notice how the notes are longer (sustained).'
    },
    {
      type: 'identify-mistake',
      question: 'Listen to this beat. What\'s wrong with it?',
      hint: 'Pay attention to the timing of the snare hits',
      rows: [
        { name: 'Hi-Hat', note: 'HH' },
        { name: 'Snare', note: 'SN' },
        { name: 'Kick', note: 'KK' }
      ],
      columns: 16,
      displayPattern: [
        { row: 2, col: 0, length: 1 },
        { row: 1, col: 5, length: 1 }, // WRONG - should be 4
        { row: 2, col: 8, length: 1 },
        { row: 1, col: 12, length: 1 },
      ],
      options: [
        'The kick is too early',
        'The first snare is slightly off-beat (not on the grid)',
        'The pattern is perfect',
        'There are too many notes'
      ],
      correct: 1,
      explanation: 'The snare on beat 2 is slightly late! Even being one step off the grid makes a groove feel wrong. In real production, this is why we use quantize to snap notes to the beat.'
    },
    {
      type: 'multiple-choice',
      question: 'What does "quantize" do in a DAW?',
      hint: 'Think about fixing timing issues',
      options: [
        'Makes all notes louder',
        'Snaps notes to the nearest beat/grid position',
        'Deletes selected notes',
        'Changes the instrument sound'
      ],
      correct: 1,
      explanation: 'Quantize automatically moves notes to the nearest grid position, fixing timing mistakes. It\'s one of the most used features in production, but overusing it can make music sound robotic!'
    },
    {
      type: 'multiple-choice',
      question: 'In a piano roll, what does making a note longer (wider) do?',
      hint: 'Think about how long you hear the sound',
      options: [
        'Makes it louder',
        'Makes it higher pitch',
        'Makes the note sustain/ring out longer',
        'Adds more instruments'
      ],
      correct: 2,
      explanation: 'Note length controls how long the note plays! Short notes are staccato (choppy), long notes are legato (smooth). This is crucial for creating realistic performances.'
    },
    {
      type: 'melody-match',
      question: 'Create a simple bassline: C (long) - G (short) - G (short)',
      hint: 'C4 is at the bottom, G4 is in the middle. Make the first C longer!',
      rows: [
        { name: 'C5', note: 'C5' },
        { name: 'B4', note: 'B4' },
        { name: 'A4', note: 'A4' },
        { name: 'G4', note: 'G4' },
        { name: 'F4', note: 'F4' },
        { name: 'E4', note: 'E4' },
        { name: 'D4', note: 'D4' },
        { name: 'C4', note: 'C4' },
      ],
      columns: 16,
      targetPattern: [
        { row: 7, col: 0, length: 4 },
        { row: 3, col: 8, length: 2 },
        { row: 3, col: 12, length: 2 },
      ],
      explanation: 'This bassline uses rhythm and note length! The long C gives weight, while the short Gs create movement. This root-to-fifth pattern is common in electronic and pop music.'
    }
  ];

  // Initialize Web Audio Context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Improved sound synthesis with better instrument sounds
  const playSound = (type, pitch = 'C4', duration = 0.2) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;

    // Note frequencies
    const frequencies = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
      'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25
    };

    if (type === 'KK') {
      // Improved kick drum
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
      
    } else if (type === 'SN') {
      // Improved snare with tone + noise
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      const noiseFilter = ctx.createBiquadFilter();
      const noiseGain = ctx.createGain();
      
      noise.buffer = buffer;
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1500;
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      
      // Add tonal component
      const tone = ctx.createOscillator();
      const toneGain = ctx.createGain();
      
      tone.frequency.value = 180;
      toneGain.gain.setValueAtTime(0.3, now);
      toneGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      tone.connect(toneGain);
      toneGain.connect(ctx.destination);
      tone.start(now);
      tone.stop(now + 0.1);
      
    } else if (type === 'HH') {
      // Improved hi-hat
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      const filter1 = ctx.createBiquadFilter();
      const filter2 = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      noise.buffer = buffer;
      filter1.type = 'highpass';
      filter1.frequency.value = 7000;
      filter2.type = 'bandpass';
      filter2.frequency.value = 10000;
      filter2.Q.value = 1.0;
      
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      
      noise.connect(filter1);
      filter1.connect(filter2);
      filter2.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      
    } else {
      // Piano-like sound with harmonics
      const fundamental = ctx.createOscillator();
      const harmonic2 = ctx.createOscillator();
      const harmonic3 = ctx.createOscillator();
      
      const masterGain = ctx.createGain();
      const gain1 = ctx.createGain();
      const gain2 = ctx.createGain();
      const gain3 = ctx.createGain();
      
      const freq = frequencies[pitch] || 440;
      
      fundamental.frequency.value = freq;
      harmonic2.frequency.value = freq * 2;
      harmonic3.frequency.value = freq * 3;
      
      fundamental.type = 'sine';
      harmonic2.type = 'sine';
      harmonic3.type = 'sine';
      
      gain1.gain.value = 1.0;
      gain2.gain.value = 0.3;
      gain3.gain.value = 0.1;
      
      // Piano envelope (quick attack, gentle decay)
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.3, now + 0.01);
      masterGain.gain.exponentialRampToValueAtTime(0.15, now + duration * 0.3);
      masterGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
      
      fundamental.connect(gain1);
      harmonic2.connect(gain2);
      harmonic3.connect(gain3);
      
      gain1.connect(masterGain);
      gain2.connect(masterGain);
      gain3.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      fundamental.start(now);
      harmonic2.start(now);
      harmonic3.start(now);
      
      fundamental.stop(now + duration);
      harmonic2.stop(now + duration);
      harmonic3.stop(now + duration);
    }
  };

  // Play pattern with proper timing and note lengths
  const playPattern = (pattern, rows, isTarget = false) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (isTarget) {
      setIsPlayingTarget(true);
    } else {
      setIsPlayingUser(true);
    }

    const tempo = 120; // BPM
    const beatDuration = 60 / tempo; // seconds per beat
    const stepDuration = beatDuration / 4; // 16th notes (since we have 16 columns for 4 beats)

    // Sort notes by column (time) for proper playback
    const sortedPattern = [...pattern].sort((a, b) => a.col - b.col);

    sortedPattern.forEach((note) => {
      const delay = note.col * stepDuration * 1000;
      const noteDuration = (note.length || 1) * stepDuration;
      
      setTimeout(() => {
        const rowData = rows[note.row];
        const instrumentType = rowData.note || rowData.name;
        playSound(instrumentType, instrumentType, noteDuration);
      }, delay);
    });

    // Reset playing state after pattern completes
    const longestNote = Math.max(...pattern.map(n => n.col + (n.length || 1)));
    const totalDuration = longestNote * stepDuration * 1000 + 500;
    
    setTimeout(() => {
      if (isTarget) {
        setIsPlayingTarget(false);
      } else {
        setIsPlayingUser(false);
      }
    }, totalDuration);
  };

  const getAIExplanation = async (question, userAnswer, isCorrect) => {
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
              content: `You're a friendly music production tutor teaching DAW concepts. A student just answered:

Question: ${question.question}
Hint: ${question.hint || 'None'}
Result: ${isCorrect ? 'Correct' : 'Incorrect'}

Provide a warm, encouraging explanation (2-3 sentences) that:
- Celebrates success or gently guides if incorrect
- Explains the musical concept in simple terms
- Relates to real music production
Keep it friendly!`
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

  const handleAnswer = async (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const currentQ = questions[currentQuestion];
    const isCorrect = answer === currentQ.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    await getAIExplanation(currentQ, answer, isCorrect);
  };

  const checkPatternMatch = async () => {
    const currentQ = questions[currentQuestion];
    const target = currentQ.targetPattern;
    
    // Check if patterns match (including length)
    const isCorrect = 
      userNotes.length === target.length &&
      userNotes.every(note => 
        target.some(t => t.row === note.row && t.col === note.col && t.length === note.length)
      );
    
    setSelectedAnswer(userNotes.length);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    await getAIExplanation(currentQ, userNotes.length.toString(), isCorrect);
  };

  const handleMouseDown = (row, col) => {
    if (showFeedback) return;
    
    // Check if clicking on existing note
    const existingNoteIndex = userNotes.findIndex(n => 
      n.row === row && col >= n.col && col < n.col + n.length
    );
    
    if (existingNoteIndex >= 0) {
      // Remove existing note
      setUserNotes(userNotes.filter((_, i) => i !== existingNoteIndex));
    } else {
      // Start dragging new note
      setIsDragging(true);
      setDragStart({ row, col });
      setUserNotes([...userNotes, { row, col, length: 1 }]);
      
      // Play sound
      const rowData = questions[currentQuestion].rows[row];
      playSound(rowData.note || rowData.name, rowData.note || rowData.name);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!isDragging || !dragStart || showFeedback) return;
    if (row !== dragStart.row) return; // Only drag horizontally
    
    const start = dragStart.col;
    const length = Math.abs(col - start) + 1;
    const startCol = Math.min(start, col);
    
    // Update the last note (the one being dragged)
    setUserNotes(notes => {
      const newNotes = [...notes];
      newNotes[newNotes.length - 1] = { row, col: startCol, length };
      return newNotes;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const renderPianoRoll = (rows, columns, editable = false) => {
    const cellWidth = 30;
    const cellHeight = 32;
    
    const rowColors = {
      'HH': { bg: '#fef08a', border: '#facc15', text: '#854d0e' },
      'SN': { bg: '#fca5a5', border: '#f87171', text: '#991b1b' },
      'KK': { bg: '#93c5fd', border: '#60a5fa', text: '#1e3a8a' },
      'C4': { bg: '#c084fc', border: '#a855f7', text: '#581c87' },
      'D4': { bg: '#60a5fa', border: '#3b82f6', text: '#1e3a8a' },
      'E4': { bg: '#4ade80', border: '#22c55e', text: '#14532d' },
      'F4': { bg: '#fbbf24', border: '#f59e0b', text: '#78350f' },
      'G4': { bg: '#fb923c', border: '#f97316', text: '#7c2d12' },
      'A4': { bg: '#f472b6', border: '#ec4899', text: '#831843' },
      'B4': { bg: '#818cf8', border: '#6366f1', text: '#312e81' },
      'C5': { bg: '#a78bfa', border: '#8b5cf6', text: '#4c1d95' },
    };

    return (
      <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
        <div className="inline-block">
          {/* Column headers (beat numbers) */}
          <div className="flex mb-2">
            <div className="w-16"></div>
            {Array.from({ length: columns }).map((_, i) => {
              const beatNumber = Math.floor(i / 4) + 1;
              const isBeatStart = i % 4 === 0;
              return (
                <div 
                  key={i} 
                  className={`text-center text-xs ${isBeatStart ? 'text-blue-400 font-bold' : 'text-gray-500'}`}
                  style={{ width: cellWidth }}
                >
                  {isBeatStart ? beatNumber : '·'}
                </div>
              );
            })}
          </div>
          
          {/* Piano roll grid */}
          {rows.map((rowData, rowIndex) => {
            const rowName = rowData.name || rowData;
            const noteType = rowData.note || rowName;
            const colors = rowColors[noteType] || { bg: '#9ca3af', border: '#6b7280', text: '#1f2937' };
            
            return (
              <div key={rowIndex} className="flex items-center mb-0.5 relative">
                {/* Row label */}
                <div className="w-16 text-right pr-2 text-xs font-bold text-gray-300">
                  {rowName}
                </div>
                
                {/* Grid container */}
                <div className="relative flex" style={{ height: cellHeight }}>
                  {/* Background grid */}
                  {Array.from({ length: columns }).map((_, colIndex) => {
                    const isQuarterBeat = colIndex % 4 === 0;
                    return (
                      <div
                        key={colIndex}
                        onMouseDown={() => editable && handleMouseDown(rowIndex, colIndex)}
                        onMouseEnter={() => editable && handleMouseEnter(rowIndex, colIndex)}
                        className={`border-r border-b ${
                          isQuarterBeat ? 'border-gray-600' : 'border-gray-800'
                        } ${editable ? 'cursor-pointer hover:bg-gray-800' : ''} bg-gray-850`}
                        style={{ width: cellWidth, height: cellHeight }}
                      />
                    );
                  })}
                  
                  {/* Notes overlay */}
                  {userNotes
                    .filter(note => note.row === rowIndex)
                    .map((note, idx) => (
                      <div
                        key={idx}
                        className="absolute top-0.5 bottom-0.5 rounded shadow-lg border-2 flex items-center justify-center text-xs font-bold"
                        style={{
                          left: note.col * cellWidth + 2,
                          width: note.length * cellWidth - 4,
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      >
                        {note.length > 1 && <span className="opacity-70">{note.length}</span>}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAiExplanation('');
      
      // Set prefilled notes if any
      const nextQ = questions[currentQuestion + 1];
      setUserNotes(nextQ.prefilledNotes || []);
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
    setUserNotes([]);
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];

    if (q.type === 'drum-pattern-match' || q.type === 'melody-match') {
      const targetMatches = 
        userNotes.length === q.targetPattern.length &&
        userNotes.every(note => 
          q.targetPattern.some(t => t.row === note.row && t.col === note.col && t.length === note.length)
        );

      return (
        <div className="space-y-6">
          {/* Play Target Button */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">🎯 Listen to the Target</h3>
                <p className="text-sm text-gray-600">Play this to hear what you need to recreate</p>
              </div>
              <button
                onClick={() => playPattern(q.targetPattern, q.rows, true)}
                disabled={isPlayingTarget}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
              >
                {isPlayingTarget ? <Pause size={20} /> : <Play size={20} />}
                {isPlayingTarget ? 'Playing...' : 'Play Target'}
              </button>
            </div>
          </div>

          {/* User's Pattern */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800">Your Pattern</h3>
                <p className="text-xs text-gray-500">Click and drag to create notes</p>
              </div>
              <button
                onClick={() => userNotes.length > 0 && playPattern(userNotes, q.rows, false)}
                disabled={isPlayingUser || userNotes.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
              >
                {isPlayingUser ? <Pause size={16} /> : <Volume2 size={16} />}
                {isPlayingUser ? 'Playing...' : 'Play Yours'}
              </button>
            </div>
            {renderPianoRoll(q.rows, q.columns, !showFeedback)}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Click and drag</strong> to create notes. Drag right to make longer notes. Click existing notes to delete them.
            </p>
          </div>

          {/* Check Button */}
          {!showFeedback && (
            <button
              onClick={checkPatternMatch}
              className="w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg shadow-lg"
            >
              Check Pattern
            </button>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg border-2 ${
              targetMatches
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {targetMatches ? (
                  <>
                    <Check className="text-green-600" size={24} />
                    <span className="font-bold text-green-800 text-lg">Perfect match! 🎵</span>
                  </>
                ) : (
                  <>
                    <X className="text-orange-600" size={24} />
                    <span className="font-bold text-orange-800 text-lg">Not quite - listen again and try to match it!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700">{q.explanation}</p>
            </div>
          )}
        </div>
      );
    }

    if (q.type === 'identify-mistake') {
      const mistakePattern = q.displayPattern.map(note => ({
        ...note,
        length: note.length || 1
      }));
      // Temporarily set userNotes to display pattern for this question type
      React.useEffect(() => {
        if (q.type === 'identify-mistake' && userNotes.length === 0) {
          setUserNotes(mistakePattern);
        }
      }, []);

      return (
        <div className="space-y-6">
          {/* Display Pattern */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">Listen to this pattern:</h3>
              <button
                onClick={() => playPattern(mistakePattern, q.rows, true)}
                disabled={isPlayingTarget}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isPlayingTarget ? <Pause size={16} /> : <Play size={16} />}
                {isPlayingTarget ? 'Playing...' : 'Play Pattern'}
              </button>
            </div>
            {renderPianoRoll(q.rows, q.columns, false)}
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {q.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === q.correct;
              const showCorrect = showFeedback && isCorrect;
              const showIncorrect = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 bg-white'
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
                onClick={() => !showFeedback && handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 bg-white'
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎹</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Piano Roll Editor Quiz</h1>
            <p className="text-xl text-gray-600">Learn to create beats and melodies in a DAW!</p>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">What You'll Learn</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>How to create drum patterns in a piano roll</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Build simple melodies and chord progressions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Identify and fix common timing mistakes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>Understand piano roll basics and DAW concepts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Music className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">How It Works</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p>The <strong>piano roll</strong> is where you create music in DAWs like FL Studio, Ableton, or Logic Pro.</p>
                  <p><strong>Horizontal</strong> = Time (when notes play) | <strong>Vertical</strong> = Pitch (which note)</p>
                  <p>🎵 <strong>Listen first</strong> - You'll hear target patterns but won't see them. Use your ears!</p>
                  <p>🖱️ <strong>Click and drag</strong> to create notes. Drag right to make longer notes!</p>
                  <div className="bg-white p-3 rounded-lg border border-yellow-300">
                    <p className="text-xs"><strong>🎨 Instrument Colors:</strong></p>
                    <div className="flex gap-3 mt-1 flex-wrap">
                      <span className="text-xs bg-blue-100 px-2 py-0.5 rounded">🔵 Kick</span>
                      <span className="text-xs bg-red-100 px-2 py-0.5 rounded">🔴 Snare</span>
                      <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded">🟡 Hi-Hat</span>
                      <span className="text-xs bg-purple-100 px-2 py-0.5 rounded">🟣 Piano</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🎼 10 Questions</div>
              <div>Pattern matching & concepts</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🔊 Real Sounds</div>
              <div>Hear piano & drum sounds</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🤖 AI Tutor</div>
              <div>Music production tips</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">⏱️ No Time Limit</div>
              <div>Practice at your pace</div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowIntro(false);
              setUserNotes(questions[0].prefilledNotes || []);
            }}
            className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium text-lg flex items-center justify-center gap-2"
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '🎵' : '🎹'}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold text-indigo-600 mb-2">{percentage}%</div>
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
                  {percentage >= 70 ? '🌟 Excellent! You\'re ready to make beats in a real DAW!' :
                   percentage >= 50 ? '👏 Good work! Keep practicing and you\'ll be a pro soon!' :
                   '💪 Great start! Piano rolls take practice - keep at it!'}
                </p>
              </div>
              
              {percentage < 100 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Tips for improvement:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Listen to the target pattern carefully before recreating it</li>
                        <li>• Remember: kick on 1 & 3, snare on 2 & 4 is the basic beat</li>
                        <li>• Use the play buttons to compare your pattern to the target</li>
                        <li>• Practice timing - even one cell off changes the groove!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={resetQuiz}
                className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Piano Roll Editor Quiz</h1>
            <p className="text-indigo-100">Create patterns like a real producer!</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 h-2">
            <div 
              className="bg-indigo-600 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question Area */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-indigo-600">
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
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-indigo-600" size={18} />
                    <h3 className="font-semibold text-indigo-900">AI Tutor Explanation</h3>
                  </div>
                  {loadingExplanation ? (
                    <div className="flex items-center gap-2 text-indigo-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
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
                className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2"
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
            💡 <strong>Pro Tip:</strong> In real DAWs, you can drag notes to change timing and pitch. 
            Practice these patterns in FL Studio, Ableton, or any DAW to get faster!
          </p>
        </div>
      </div>
    </div>
  );
}