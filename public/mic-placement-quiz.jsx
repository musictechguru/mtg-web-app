import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Sparkles, Lightbulb, BookOpen, Volume2, Mic, Target, Pause } from 'lucide-react';

export default function MicPlacementQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [micPosition, setMicPosition] = useState({ x: 150, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSweetSpot, setShowSweetSpot] = useState(false);
  const audioContextRef = useRef(null);
  const containerRef = useRef(null);

  const questions = [
    {
      type: 'placement',
      scenario: 'acoustic-guitar',
      question: 'Place the microphone to capture a bright, natural acoustic guitar sound',
      hint: 'Point the mic at the 12th fret area, about 6-12 inches away',
      sweetSpot: { x: 220, y: 180, radius: 40 },
      explanation: 'The sweet spot for acoustic guitar is typically pointing at the 12th-14th fret, 6-12 inches away. This captures a balance of warmth from the body and clarity from the strings.',
      instrument: {
        name: 'Acoustic Guitar',
        soundhole: { x: 200, y: 200 },
        neck: { x: 200, y: 100 },
        fret12: { x: 220, y: 180 }
      }
    },
    {
      type: 'placement',
      scenario: 'vocalist',
      question: 'Position the mic for optimal vocal recording',
      hint: 'About 6 inches from the mouth, slightly off-axis to avoid plosives',
      sweetSpot: { x: 200, y: 170, radius: 35 },
      explanation: 'For vocals, place the mic 4-8 inches from the mouth, slightly angled off-axis. This captures clear tone while reducing plosives (P and B sounds). Always use a pop filter!',
      instrument: {
        name: 'Vocalist',
        mouth: { x: 200, y: 150 },
        head: { x: 200, y: 120 }
      }
    },
    {
      type: 'placement',
      scenario: 'kick-drum',
      question: 'Place the mic for a punchy kick drum sound with good attack',
      hint: 'Inside the drum, pointing at where the beater hits the head',
      sweetSpot: { x: 200, y: 190, radius: 30 },
      explanation: 'For kick drum, place the mic inside the drum (if there\'s a hole in the front head), pointing toward where the beater strikes. This captures the "click" of the attack and the body of the drum.',
      instrument: {
        name: 'Kick Drum',
        center: { x: 200, y: 200 },
        beater: { x: 200, y: 180 }
      }
    },
    {
      type: 'placement',
      scenario: 'guitar-amp',
      question: 'Mic this guitar amp for a full, balanced electric guitar tone',
      hint: 'Point at the speaker cone, slightly off-center for less brightness',
      sweetSpot: { x: 210, y: 200, radius: 35 },
      explanation: 'For guitar amps, start with the mic pointing at the speaker cone. Dead center = brightest, off-center = warmer. Distance affects room sound - closer is more direct.',
      instrument: {
        name: 'Guitar Amp',
        speaker: { x: 200, y: 200 },
        center: { x: 200, y: 200 },
        edge: { x: 240, y: 200 }
      }
    },
    {
      type: 'multiple-choice',
      question: 'What is the "proximity effect" in microphone recording?',
      hint: 'Think about what happens when you get very close to certain mics',
      options: [
        'The mic gets louder the closer you get',
        'Bass frequencies increase when closer to directional mics',
        'The mic picks up more room sound',
        'High frequencies get brighter up close'
      ],
      correct: 1,
      explanation: 'The proximity effect causes bass frequencies to increase as you get closer to directional (cardioid, figure-8) microphones. This is why vocalists sound "warmer" when close to the mic!'
    },
    {
      type: 'placement',
      scenario: 'overhead-cymbals',
      question: 'Place an overhead mic to capture cymbals and drum kit ambience',
      hint: 'Position above the kit, centered, at a good height (3-4 feet)',
      sweetSpot: { x: 200, y: 120, radius: 40 },
      explanation: 'Overhead mics should be centered above the kit, 3-4 feet high. Too low captures mostly cymbals, too high adds too much room. This position captures the whole kit blend.',
      instrument: {
        name: 'Drum Kit (Overhead)',
        snare: { x: 180, y: 200 },
        cymbal: { x: 220, y: 180 },
        kit: { x: 200, y: 200 }
      }
    },
    {
      type: 'multiple-choice',
      question: 'Why would you use a pop filter when recording vocals?',
      hint: 'Think about sounds like "P" and "B"',
      options: [
        'To make the voice sound warmer',
        'To reduce plosive sounds (P, B, T)',
        'To add reverb to the voice',
        'To make the mic louder'
      ],
      correct: 1,
      explanation: 'Pop filters reduce plosives - bursts of air from "P," "B," and "T" sounds that can overload the mic and create a "pop" sound in the recording.'
    },
    {
      type: 'placement',
      scenario: 'snare-drum',
      question: 'Mic this snare drum to capture the crack and body',
      hint: 'Aim at the drum head from above, slightly off-center to avoid hi-hat bleed',
      sweetSpot: { x: 190, y: 170, radius: 30 },
      explanation: 'Snare mics go above the drum, pointing down at the head. Angle slightly away from hi-hats to reduce bleed. 2-3 inches above the rim is typical.',
      instrument: {
        name: 'Snare Drum',
        center: { x: 200, y: 200 },
        rim: { x: 200, y: 180 }
      }
    },
    {
      type: 'multiple-choice',
      question: 'What does "off-axis" mean in microphone placement?',
      hint: 'Think about which direction the mic is pointing',
      options: [
        'The microphone is broken',
        'Pointing the mic away from the direct sound source',
        'Using the wrong type of microphone',
        'Recording in stereo'
      ],
      correct: 1,
      explanation: 'Off-axis means the mic is not pointing directly at the sound source. This can reduce harshness, avoid plosives in vocals, or change the tone by catching less direct sound.'
    },
    {
      type: 'placement',
      scenario: 'piano',
      question: 'Position the mic to capture a balanced upright piano sound',
      hint: 'Aim over the open lid, toward the hammers and strings',
      sweetSpot: { x: 200, y: 140, radius: 45 },
      explanation: 'For upright piano with the lid open, position mics above looking down at the hammers/strings. For grand pianos, mic over the open lid or remove it entirely for a closer sound.',
      instrument: {
        name: 'Upright Piano',
        strings: { x: 200, y: 160 },
        hammers: { x: 200, y: 150 }
      }
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

  // Calculate how close mic is to sweet spot
  const getDistanceFromSweetSpot = () => {
    const q = questions[currentQuestion];
    if (!q.sweetSpot) return 999;
    
    const dx = micPosition.x - q.sweetSpot.x;
    const dy = micPosition.y - q.sweetSpot.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Play sound that varies based on mic position
  const playPositionalSound = () => {
    const ctx = audioContextRef.current;
    if (!ctx || isPlaying) return;

    setIsPlaying(true);
    const q = questions[currentQuestion];
    const distance = getDistanceFromSweetSpot();
    const inSweetSpot = distance < (q.sweetSpot?.radius || 40);
    
    // Base frequencies for different instruments
    const baseFreqs = {
      'acoustic-guitar': [330, 440, 550],
      'vocalist': [220, 440, 880],
      'kick-drum': [60, 80, 120],
      'guitar-amp': [220, 440, 880],
      'overhead-cymbals': [2000, 4000, 8000],
      'snare-drum': [200, 400, 2000],
      'piano': [262, 330, 440]
    };

    const freqs = baseFreqs[q.scenario] || [440];
    const now = ctx.currentTime;
    const duration = 1.5;

    // Create sound with filtering based on position
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.frequency.value = freq;
      osc.type = q.scenario.includes('drum') ? 'sawtooth' : 'sine';
      
      // Filter and gain based on position
      if (inSweetSpot) {
        // Good position - full frequency, good level
        filter.type = 'lowpass';
        filter.frequency.value = 12000;
        gain.gain.setValueAtTime(0.15 / (i + 1), now);
      } else {
        // Bad position - filtered, quieter
        filter.type = 'lowpass';
        filter.frequency.value = Math.max(2000 - distance * 10, 500);
        gain.gain.setValueAtTime(0.08 / (i + 1), now);
      }
      
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + duration);
    });

    setTimeout(() => setIsPlaying(false), duration * 1000);
  };

  const handleMouseDown = (e) => {
    if (showFeedback) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current || showFeedback) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Keep mic within bounds
    const boundedX = Math.max(30, Math.min(x, 370));
    const boundedY = Math.max(30, Math.min(y, 370));
    
    setMicPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const checkPlacement = async () => {
    const q = questions[currentQuestion];
    const distance = getDistanceFromSweetSpot();
    const isCorrect = distance < q.sweetSpot.radius;
    
    setSelectedAnswer(distance);
    setShowFeedback(true);
    setShowSweetSpot(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    await getAIExplanation(q, `${distance.toFixed(0)} pixels from sweet spot`, isCorrect);
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
              content: `You're a friendly audio engineer teaching microphone techniques. A student just answered:

Question: ${question.question}
Hint: ${question.hint || 'None'}
Result: ${isCorrect ? 'Correct placement' : 'Incorrect placement'}

Provide a warm, encouraging explanation (2-3 sentences) that:
- Celebrates success or gently guides if incorrect
- Explains why this mic position matters
- Gives a practical recording tip
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

    await getAIExplanation(currentQ, currentQ.options[answer], isCorrect);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAiExplanation('');
      setShowSweetSpot(false);
      setMicPosition({ x: 150, y: 150 });
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
    setShowSweetSpot(false);
    setMicPosition({ x: 150, y: 150 });
  };

  const renderInstrument = (scenario, instrument) => {
    switch(scenario) {
      case 'acoustic-guitar':
        return (
          <g>
            {/* Guitar body */}
            <ellipse cx="200" cy="220" rx="60" ry="80" fill="#d4a574" stroke="#8b4513" strokeWidth="3"/>
            {/* Soundhole */}
            <circle cx="200" cy="200" r="20" fill="#654321"/>
            {/* Neck */}
            <rect x="185" y="80" width="30" height="140" fill="#8b4513" rx="5"/>
            {/* Strings */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <line 
                key={i}
                x1="200" y1="80" 
                x2="200" y2="300" 
                stroke="#c0c0c0" 
                strokeWidth="0.5"
                transform={`translate(${(i - 2.5) * 4}, 0)`}
              />
            ))}
            {/* 12th fret marker */}
            <circle cx="220" cy="180" r="4" fill="#ffd700" opacity="0.6"/>
            <text x="240" y="185" fontSize="10" fill="#666">12th fret</text>
          </g>
        );
      
      case 'vocalist':
        return (
          <g>
            {/* Head */}
            <circle cx="200" cy="120" r="40" fill="#ffdbac" stroke="#333" strokeWidth="2"/>
            {/* Hair */}
            <path d="M 160 120 Q 160 80, 200 80 Q 240 80, 240 120" fill="#8b4513"/>
            {/* Eyes */}
            <circle cx="185" cy="115" r="3" fill="#333"/>
            <circle cx="215" cy="115" r="3" fill="#333"/>
            {/* Mouth */}
            <ellipse cx="200" cy="150" rx="8" ry="12" fill="#ff6b6b"/>
            {/* Body */}
            <rect x="175" y="160" width="50" height="80" fill="#4a90e2" rx="10"/>
            {/* Reference point */}
            <circle cx="200" cy="150" r="3" fill="#ff0000" opacity="0.5"/>
            <text x="210" y="155" fontSize="10" fill="#666">mouth</text>
          </g>
        );
      
      case 'kick-drum':
        return (
          <g>
            {/* Drum shell */}
            <ellipse cx="200" cy="200" rx="80" ry="70" fill="#333" stroke="#000" strokeWidth="3"/>
            {/* Front head */}
            <ellipse cx="200" cy="200" rx="70" ry="60" fill="#f0f0f0" stroke="#666" strokeWidth="2"/>
            {/* Sound hole */}
            <circle cx="200" cy="200" r="25" fill="#222"/>
            {/* Beater position indicator */}
            <circle cx="200" cy="180" r="5" fill="#ff6b6b" opacity="0.7"/>
            <text x="210" y="185" fontSize="10" fill="#666">beater point</text>
          </g>
        );
      
      case 'guitar-amp':
        return (
          <g>
            {/* Amp cabinet */}
            <rect x="120" y="140" width="160" height="120" fill="#222" stroke="#000" strokeWidth="3" rx="5"/>
            {/* Speaker cone */}
            <circle cx="200" cy="200" r="50" fill="#444" stroke="#666" strokeWidth="2"/>
            <circle cx="200" cy="200" r="40" fill="#333"/>
            <circle cx="200" cy="200" r="20" fill="#555"/>
            {/* Dust cap */}
            <circle cx="200" cy="200" r="10" fill="#666"/>
            {/* Control knobs */}
            <circle cx="150" cy="160" r="5" fill="#888"/>
            <circle cx="175" cy="160" r="5" fill="#888"/>
            <circle cx="200" cy="160" r="5" fill="#888"/>
            {/* Labels */}
            <text x="240" y="205" fontSize="10" fill="#999">center</text>
          </g>
        );
      
      case 'overhead-cymbals':
        return (
          <g>
            {/* Cymbal */}
            <ellipse cx="220" cy="180" rx="50" ry="8" fill="#ffd700" stroke="#b8860b" strokeWidth="2"/>
            <ellipse cx="220" cy="180" rx="40" ry="6" fill="#ffed4e" opacity="0.5"/>
            {/* Cymbal stand */}
            <line x1="220" y1="180" x2="220" y2="280" stroke="#555" strokeWidth="3"/>
            {/* Snare drum below */}
            <ellipse cx="180" cy="240" rx="35" ry="30" fill="#f0f0f0" stroke="#666" strokeWidth="2"/>
            {/* Kit center reference */}
            <circle cx="200" cy="200" r="5" fill="#ff6b6b" opacity="0.5"/>
            <text x="130" y="130" fontSize="10" fill="#666">position overhead</text>
          </g>
        );
      
      case 'snare-drum':
        return (
          <g>
            {/* Snare shell */}
            <ellipse cx="200" cy="200" rx="50" ry="45" fill="#e0e0e0" stroke="#666" strokeWidth="3"/>
            {/* Top head */}
            <ellipse cx="200" cy="200" rx="45" ry="40" fill="#f5f5f5" stroke="#888" strokeWidth="2"/>
            {/* Snare wires (side view) */}
            {[0, 1, 2, 3, 4].map(i => (
              <line 
                key={i}
                x1="170" y1={220 + i * 3}
                x2="230" y2={220 + i * 3}
                stroke="#c0c0c0"
                strokeWidth="0.5"
              />
            ))}
            {/* Rim */}
            <ellipse cx="200" cy="180" rx="48" ry="42" fill="none" stroke="#333" strokeWidth="3"/>
            {/* Reference */}
            <circle cx="200" cy="180" r="3" fill="#ff6b6b" opacity="0.7"/>
            <text x="210" y="175" fontSize="10" fill="#666">rim</text>
          </g>
        );
      
      case 'piano':
        return (
          <g>
            {/* Piano body */}
            <rect x="100" y="180" width="200" height="100" fill="#1a1a1a" stroke="#000" strokeWidth="3" rx="5"/>
            {/* Open lid */}
            <path d="M 100 180 L 100 120 L 280 100 L 300 180" fill="#2a2a2a" stroke="#000" strokeWidth="2"/>
            {/* Strings visible through lid */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <line 
                key={i}
                x1={130 + i * 20} y1="140"
                x2={130 + i * 20} y2="180"
                stroke="#c0c0c0"
                strokeWidth="0.5"
              />
            ))}
            {/* Keyboard */}
            <rect x="100" y="280" width="200" height="20" fill="#f5f5f5" stroke="#666" strokeWidth="2"/>
            {/* Reference */}
            <text x="110" y="135" fontSize="10" fill="#999">strings/hammers</text>
          </g>
        );
      
      default:
        return null;
    }
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];

    if (q.type === 'placement') {
      const distance = getDistanceFromSweetSpot();
      const inSweetSpot = showFeedback && distance < q.sweetSpot.radius;
      const proximityFeedback = 
        distance < 30 ? "🎯 Perfect!" :
        distance < 60 ? "🎵 Very close!" :
        distance < 100 ? "📍 Getting warmer..." :
        "🔍 Keep looking...";

      return (
        <div className="space-y-6">
          {/* Placement Area */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 border-2 border-slate-300">
            <div
              ref={containerRef}
              className="relative bg-white rounded-lg shadow-inner border-2 border-slate-300 cursor-move"
              style={{ width: 400, height: 400 }}
              onMouseDown={handleMouseDown}
            >
              {/* SVG for instrument */}
              <svg width="400" height="400" className="absolute inset-0 pointer-events-none">
                {renderInstrument(q.scenario, q.instrument)}
                
                {/* Sweet spot indicator (only show after checking) */}
                {showSweetSpot && (
                  <>
                    <circle
                      cx={q.sweetSpot.x}
                      cy={q.sweetSpot.y}
                      r={q.sweetSpot.radius}
                      fill="rgba(34, 197, 94, 0.2)"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <circle
                      cx={q.sweetSpot.x}
                      cy={q.sweetSpot.y}
                      r="5"
                      fill="#22c55e"
                    />
                    <text
                      x={q.sweetSpot.x + 15}
                      y={q.sweetSpot.y - 15}
                      fontSize="12"
                      fill="#22c55e"
                      fontWeight="bold"
                    >
                      Sweet Spot
                    </text>
                  </>
                )}
              </svg>

              {/* Draggable Microphone */}
              <div
                className={`absolute w-12 h-12 cursor-grab ${isDragging ? 'cursor-grabbing scale-110' : ''} transition-transform`}
                style={{
                  left: micPosition.x - 24,
                  top: micPosition.y - 24,
                }}
              >
                <div className="relative">
                  {/* Mic icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    inSweetSpot ? 'bg-green-500' : 'bg-blue-500'
                  } shadow-lg border-2 border-white`}>
                    <Mic className="text-white" size={24} />
                  </div>
                  {/* Direction indicator */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className={`w-1 h-6 ${inSweetSpot ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    <div className={`w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent ${
                      inSweetSpot ? 'border-t-green-500' : 'border-t-blue-500'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Position feedback */}
            {!showFeedback && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-blue-300">
                  <Target size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">{proximityFeedback}</span>
                </div>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3">
            <button
              onClick={playPositionalSound}
              disabled={isPlaying}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
            >
              {isPlaying ? <Pause size={20} /> : <Volume2 size={20} />}
              {isPlaying ? 'Playing...' : 'Test Sound'}
            </button>
            {!showFeedback && (
              <button
                onClick={checkPlacement}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Check Placement
              </button>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-800">
              🎤 <strong>Drag the microphone</strong> to position it. Click "Test Sound" to hear how it sounds from that position. Find the sweet spot!
            </p>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg border-2 ${
              inSweetSpot
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {inSweetSpot ? (
                  <>
                    <Check className="text-green-600" size={24} />
                    <span className="font-bold text-green-800 text-lg">Perfect placement! 🎯</span>
                  </>
                ) : (
                  <>
                    <X className="text-orange-600" size={24} />
                    <span className="font-bold text-orange-800 text-lg">Close, but not quite in the sweet spot!</span>
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
                onClick={() => !showFeedback && handleAnswer(index)}
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎤</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Microphone Placement Quiz</h1>
            <p className="text-xl text-gray-600">Learn professional mic techniques by ear and placement!</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">What You'll Learn</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>How to position mics for different instruments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Find the "sweet spot" for optimal sound</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Understanding proximity effect and off-axis technique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Professional recording techniques used in studios</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Mic className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">How It Works</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p>Microphone placement is one of the most important skills in recording!</p>
                  <p>🎯 <strong>Drag the mic</strong> around to find the best position for each instrument</p>
                  <p>🔊 <strong>Test the sound</strong> - you'll hear how position affects tone</p>
                  <p>📍 <strong>Find the sweet spot</strong> - the optimal recording position</p>
                  <div className="bg-white p-3 rounded-lg border border-yellow-300">
                    <p className="text-xs font-semibold mb-1">💡 Pro Tip:</p>
                    <p className="text-xs">In real studios, engineers spend a lot of time finding the perfect mic position. Small changes = big differences in sound!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🎸 10 Questions</div>
              <div>7 instruments + concepts</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🔊 Audio Feedback</div>
              <div>Hear position changes</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🤖 AI Tutor</div>
              <div>Pro recording tips</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">⏱️ No Time Limit</div>
              <div>Learn at your pace</div>
            </div>
          </div>

          <button
            onClick={() => setShowIntro(false)}
            className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-lg flex items-center justify-center gap-2"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '🎤' : '🎧'}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
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
                  {percentage >= 70 ? '🌟 Excellent! You understand mic placement like a pro!' :
                   percentage >= 50 ? '👏 Good work! Keep practicing mic techniques in real sessions!' :
                   '💪 Nice start! Mic placement takes practice - try these techniques in real recordings!'}
                </p>
              </div>
              
              {percentage < 100 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Tips for improvement:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Always experiment with mic position while listening</li>
                        <li>• Small movements (inches) can make huge tonal differences</li>
                        <li>• Start with standard positions, then adjust to taste</li>
                        <li>• Use your ears - the "best" position depends on the sound you want!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={resetQuiz}
                className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Microphone Placement Quiz</h1>
            <p className="text-blue-100">Master the art of mic positioning</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 h-2">
            <div 
              className="bg-blue-600 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question Area */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
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
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-blue-600" size={18} />
                    <h3 className="font-semibold text-blue-900">AI Tutor Explanation</h3>
                  </div>
                  {loadingExplanation ? (
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
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
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium flex items-center justify-center gap-2"
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
            💡 <strong>Pro Tip:</strong> In real studios, engineers often spend 10-15 minutes just finding the perfect mic position. 
            Small changes make huge differences in the final sound!
          </p>
        </div>
      </div>
    </div>
  );
}