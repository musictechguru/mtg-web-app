import React, { useState } from 'react';
import { Play, Check, X, RotateCcw, Sparkles, Lightbulb, BookOpen, Volume2 } from 'lucide-react';

export default function MusicTechGraphsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [compressorSettings, setCompressorSettings] = useState({ threshold: -20, ratio: 4, attack: 10, release: 100 });

  const questions = [
    {
      type: 'waveform-match',
      question: 'Which waveform is this?',
      waveformType: 'sine',
      hint: 'This is the smoothest, most natural waveform - like a pure tone',
      options: ['Sine Wave', 'Square Wave', 'Sawtooth Wave', 'Triangle Wave'],
      correct: 0,
      explanation: 'This is a sine wave! It\'s the purest, smoothest waveform with no harmonics. It sounds like a whistle or pure tone and is the basis of all other sounds.'
    },
    {
      type: 'waveform-match',
      question: 'Which waveform is this?',
      waveformType: 'square',
      hint: 'This waveform has sharp, flat tops and bottoms - very digital sounding',
      options: ['Sine Wave', 'Square Wave', 'Sawtooth Wave', 'Triangle Wave'],
      correct: 1,
      explanation: 'This is a square wave! It has a hollow, buzzy sound with only odd harmonics. Classic for video game sounds and retro synths.'
    },
    {
      type: 'polar-pattern-match',
      question: 'What microphone polar pattern is shown?',
      patternType: 'cardioid',
      hint: 'This pattern picks up sound from the front, shaped like a heart',
      options: ['Cardioid', 'Omnidirectional', 'Figure-8', 'Shotgun'],
      correct: 0,
      explanation: 'This is a cardioid pattern! It picks up sound from the front and rejects sound from the back. Most common for vocals and instruments. Named because it looks like a heart (cardio)!'
    },
    {
      type: 'polar-pattern-match',
      question: 'What microphone polar pattern is shown?',
      patternType: 'omni',
      hint: 'This pattern picks up sound equally from all directions',
      options: ['Cardioid', 'Omnidirectional', 'Figure-8', 'Shotgun'],
      correct: 1,
      explanation: 'This is an omnidirectional pattern! It picks up sound equally from all directions (360°). Great for capturing room ambience or group recordings.'
    },
    {
      type: 'frequency-identify',
      question: 'What frequency range does this graph show as the strongest?',
      frequencyRange: 'bass',
      hint: 'Look at which part of the graph is highest',
      options: ['Bass (20-250 Hz)', 'Midrange (250-4000 Hz)', 'Treble (4000-20000 Hz)', 'All Equal'],
      correct: 0,
      explanation: 'This shows strong bass frequencies! Bass is felt more than heard - think kick drums, bass guitars, and sub-bass. 20-250 Hz.'
    },
    {
      type: 'frequency-identify',
      question: 'What frequency range does this graph show as the strongest?',
      frequencyRange: 'treble',
      hint: 'Look at the right side of the frequency spectrum',
      options: ['Bass (20-250 Hz)', 'Midrange (250-4000 Hz)', 'Treble (4000-20000 Hz)', 'All Equal'],
      correct: 2,
      explanation: 'This shows strong treble frequencies! Treble gives brightness and clarity - think cymbals, hi-hats, and vocal sibilance. 4000-20000 Hz.'
    },
    {
      type: 'compressor-interactive',
      question: 'Set the compressor threshold to -12 dB',
      targetSetting: { threshold: -12 },
      hint: 'Threshold is the level where compression starts. Move the slider to -12 dB',
      explanation: 'Threshold is the volume level where the compressor starts working. Sounds above this level get compressed (reduced in volume). -12 dB is a common starting point for vocals.'
    },
    {
      type: 'multiple-choice',
      question: 'What does a compressor\'s "ratio" control?',
      hint: 'Think about how much the compressor reduces the volume',
      options: [
        'How fast it starts working',
        'How much it reduces volume above the threshold',
        'The frequency it affects',
        'The input volume'
      ],
      correct: 1,
      explanation: 'Ratio controls how much the compressor reduces volume. A 4:1 ratio means for every 4 dB above the threshold, only 1 dB comes out. Higher ratios = more compression!'
    },
    {
      type: 'waveform-match',
      question: 'Which waveform is this?',
      waveformType: 'sawtooth',
      hint: 'This waveform looks like the teeth of a saw - rich and bright',
      options: ['Sine Wave', 'Square Wave', 'Sawtooth Wave', 'Triangle Wave'],
      correct: 2,
      explanation: 'This is a sawtooth wave! It has a bright, buzzy, rich sound with all harmonics (odd and even). Very common in synthesizers for bass and lead sounds.'
    },
    {
      type: 'volume-reading',
      question: 'Is this audio signal clipping (distorting)?',
      isClipping: true,
      hint: 'Look for the waveform hitting the top and bottom limits',
      options: ['Yes - it\'s clipping', 'No - it\'s fine'],
      correct: 0,
      explanation: 'Yes, this is clipping! When the waveform hits the maximum limit and gets cut off (looks flat), it causes distortion. Always bad unless you want it for creative effect!'
    },
    {
      type: 'multiple-choice',
      question: 'What happens when you increase the "Attack" time on a compressor?',
      hint: 'Attack is how fast the compressor starts working',
      options: [
        'Compression starts more slowly, letting transients through',
        'Compression starts instantly',
        'The volume gets louder',
        'It only affects low frequencies'
      ],
      correct: 0,
      explanation: 'Slower attack lets the initial "punch" or transient through before compression kicks in. Fast attack (1-10ms) catches everything. Slow attack (20-100ms) preserves the impact of drums and percussive sounds.'
    },
    {
      type: 'polar-pattern-match',
      question: 'What microphone polar pattern is shown?',
      patternType: 'figure8',
      hint: 'This pattern picks up sound from front and back, but not the sides',
      options: ['Cardioid', 'Omnidirectional', 'Figure-8', 'Shotgun'],
      correct: 2,
      explanation: 'This is a figure-8 (or bidirectional) pattern! It picks up sound from the front and back equally, but rejects sound from the sides. Great for recording two people facing each other or for stereo techniques.'
    }
  ];

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
              content: `You're a friendly, encouraging music production tutor. A student just answered this question about audio engineering:

Question: ${question.question}
Hint provided: ${question.hint || 'None'}
Their answer: ${userAnswer}
Correct answer: ${question.options ? question.options[question.correct] : 'Correct setting achieved'}
Result: ${isCorrect ? 'Correct' : 'Incorrect'}

Provide a warm, encouraging explanation (2-3 sentences) that:
- Celebrates their success if correct, or gently guides them if incorrect
- Uses simple language and real-world examples
- Relates to practical music production
- Builds their confidence

Keep it friendly and conversational!`
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

    await getAIExplanation(currentQ, currentQ.options ? currentQ.options[answer] : answer, isCorrect);
  };

  const checkCompressorAnswer = async () => {
    const currentQ = questions[currentQuestion];
    const targetThreshold = currentQ.targetSetting.threshold;
    const isCorrect = Math.abs(compressorSettings.threshold - targetThreshold) <= 1; // Within 1 dB is fine
    
    setSelectedAnswer(compressorSettings.threshold);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    await getAIExplanation(currentQ, `${compressorSettings.threshold} dB`, isCorrect);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAiExplanation('');
      setCompressorSettings({ threshold: -20, ratio: 4, attack: 10, release: 100 });
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
    setCompressorSettings({ threshold: -20, ratio: 4, attack: 10, release: 100 });
  };

  // Waveform drawing function
  const drawWaveform = (type, width = 300, height = 150) => {
    const points = [];
    const samples = 200;
    
    for (let i = 0; i < samples; i++) {
      const x = (i / samples) * width;
      const t = (i / samples) * Math.PI * 4; // 2 cycles
      let y;
      
      switch(type) {
        case 'sine':
          y = Math.sin(t);
          break;
        case 'square':
          y = Math.sin(t) > 0 ? 1 : -1;
          break;
        case 'sawtooth':
          y = 2 * (t / (2 * Math.PI) - Math.floor(t / (2 * Math.PI) + 0.5));
          break;
        case 'triangle':
          y = Math.abs((t % (2 * Math.PI)) / Math.PI - 1) * 2 - 1;
          break;
        default:
          y = 0;
      }
      
      const yPos = height / 2 - (y * height / 2.5);
      points.push(`${x},${yPos}`);
    }
    
    return points.join(' ');
  };

  // Polar pattern drawing
  const drawPolarPattern = (type) => {
    const cx = 100;
    const cy = 100;
    const r = 70;
    
    let path = '';
    
    switch(type) {
      case 'cardioid':
        // Heart-shaped pattern
        for (let angle = 0; angle <= 360; angle += 5) {
          const rad = (angle * Math.PI) / 180;
          const distance = r * (1 + Math.cos(rad)) / 2;
          const x = cx + distance * Math.sin(rad);
          const y = cy - distance * Math.cos(rad);
          path += `${angle === 0 ? 'M' : 'L'} ${x} ${y} `;
        }
        break;
      case 'omni':
        // Circle
        path = `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`;
        break;
      case 'figure8':
        // Two circles (figure 8)
        for (let angle = 0; angle <= 360; angle += 5) {
          const rad = (angle * Math.PI) / 180;
          const distance = r * Math.abs(Math.cos(rad));
          const x = cx + distance * Math.sin(rad);
          const y = cy - distance * Math.cos(rad);
          path += `${angle === 0 ? 'M' : 'L'} ${x} ${y} `;
        }
        break;
    }
    
    return path;
  };

  // Frequency spectrum drawing
  const drawFrequencySpectrum = (range) => {
    const bars = [];
    const barCount = 30;
    
    for (let i = 0; i < barCount; i++) {
      let height;
      
      if (range === 'bass') {
        height = i < 8 ? 80 - (i * 5) : 10 + Math.random() * 20;
      } else if (range === 'treble') {
        height = i > 20 ? (i - 20) * 8 : 10 + Math.random() * 20;
      } else {
        height = 40 - Math.abs(15 - i) * 1.5 + Math.random() * 15;
      }
      
      bars.push(
        <rect
          key={i}
          x={i * 10}
          y={100 - height}
          width="8"
          height={height}
          fill={`hsl(${200 + i * 5}, 70%, 50%)`}
          className="transition-all duration-300"
        />
      );
    }
    
    return bars;
  };

  // Clipping waveform
  const drawClippingWaveform = (isClipping, width = 300, height = 150) => {
    const points = [];
    const samples = 200;
    const clipThreshold = isClipping ? 0.7 : 1.5;
    
    for (let i = 0; i < samples; i++) {
      const x = (i / samples) * width;
      const t = (i / samples) * Math.PI * 4;
      let y = Math.sin(t) * 1.2; // Slightly hot signal
      
      if (isClipping) {
        y = Math.max(-clipThreshold, Math.min(clipThreshold, y));
      }
      
      const yPos = height / 2 - (y * height / 2.5);
      points.push(`${x},${yPos}`);
    }
    
    return points.join(' ');
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];

    if (q.type === 'waveform-match') {
      return (
        <div className="space-y-6">
          {/* Waveform Display */}
          <div className="bg-gray-900 rounded-xl p-8 flex items-center justify-center">
            <svg width="320" height="170" className="bg-black rounded-lg">
              {/* Grid lines */}
              <line x1="0" y1="85" x2="320" y2="85" stroke="#333" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="160" y1="0" x2="160" y2="170" stroke="#333" strokeWidth="1" strokeDasharray="5,5" />
              
              {/* Waveform */}
              <polyline
                points={drawWaveform(q.waveformType, 300, 150)}
                fill="none"
                stroke="#00ff88"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(10, 10)"
              />
            </svg>
          </div>

          {/* Answer Options */}
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
        </div>
      );
    }

    if (q.type === 'polar-pattern-match') {
      return (
        <div className="space-y-6">
          {/* Polar Pattern Display */}
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl p-8 flex items-center justify-center">
            <svg width="200" height="200" className="bg-black bg-opacity-30 rounded-full">
              {/* Grid circles */}
              <circle cx="100" cy="100" r="30" fill="none" stroke="#ffffff20" strokeWidth="1" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="#ffffff20" strokeWidth="1" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#ffffff20" strokeWidth="1" />
              
              {/* Axis lines */}
              <line x1="100" y1="20" x2="100" y2="180" stroke="#ffffff30" strokeWidth="1" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="#ffffff30" strokeWidth="1" />
              
              {/* Polar pattern */}
              <path
                d={drawPolarPattern(q.patternType)}
                fill="#ff006680"
                stroke="#ff0066"
                strokeWidth="3"
              />
              
              {/* Microphone indicator */}
              <circle cx="100" cy="100" r="8" fill="#00ff88" />
              <text x="100" y="20" textAnchor="middle" fill="white" fontSize="12">Front</text>
            </svg>
          </div>

          {/* Answer Options */}
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
        </div>
      );
    }

    if (q.type === 'frequency-identify') {
      return (
        <div className="space-y-6">
          {/* Frequency Spectrum Display */}
          <div className="bg-gray-900 rounded-xl p-8">
            <svg width="300" height="120" className="w-full">
              {/* Labels */}
              <text x="10" y="15" fill="#888" fontSize="11">Bass</text>
              <text x="130" y="15" fill="#888" fontSize="11">Mid</text>
              <text x="250" y="15" fill="#888" fontSize="11">Treble</text>
              
              {/* Spectrum bars */}
              <g transform="translate(0, 20)">
                {drawFrequencySpectrum(q.frequencyRange)}
              </g>
              
              {/* Frequency labels */}
              <text x="10" y="115" fill="#666" fontSize="10">20Hz</text>
              <text x="250" y="115" fill="#666" fontSize="10">20kHz</text>
            </svg>
          </div>

          {/* Answer Options */}
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
        </div>
      );
    }

    if (q.type === 'compressor-interactive') {
      const targetThreshold = q.targetSetting.threshold;
      const isCorrect = Math.abs(compressorSettings.threshold - targetThreshold) <= 1;

      return (
        <div className="space-y-6">
          {/* Compressor Visual */}
          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-8 border-2 border-orange-300">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-center text-xl font-bold text-gray-800 mb-6">Compressor Controls</h3>
              
              {/* Threshold Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold text-gray-700">Threshold</label>
                  <span className={`text-2xl font-bold ${
                    showFeedback 
                      ? isCorrect ? 'text-green-600' : 'text-red-600'
                      : 'text-blue-600'
                  }`}>
                    {compressorSettings.threshold} dB
                  </span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="0"
                  value={compressorSettings.threshold}
                  onChange={(e) => !showFeedback && setCompressorSettings({...compressorSettings, threshold: parseInt(e.target.value)})}
                  disabled={showFeedback}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-40 dB (Quiet)</span>
                  <span>0 dB (Loud)</span>
                </div>
              </div>

              {/* Visual meter */}
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Target: <strong>{targetThreshold} dB</strong></div>
                <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      showFeedback
                        ? isCorrect ? 'bg-green-500' : 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${((compressorSettings.threshold + 40) / 40) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {!showFeedback && (
            <button
              onClick={checkCompressorAnswer}
              className="w-full p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-lg"
            >
              Check Answer
            </button>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg border-2 ${
              isCorrect
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <Check className="text-green-600" size={24} />
                    <span className="font-bold text-green-800 text-lg">Perfect! 🎚️</span>
                  </>
                ) : (
                  <>
                    <X className="text-red-600" size={24} />
                    <span className="font-bold text-red-800 text-lg">Not quite - try again next time!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700">{q.explanation}</p>
            </div>
          )}
        </div>
      );
    }

    if (q.type === 'volume-reading') {
      return (
        <div className="space-y-6">
          {/* Clipping Waveform Display */}
          <div className="bg-gray-900 rounded-xl p-8 flex items-center justify-center">
            <svg width="320" height="170" className="bg-black rounded-lg">
              {/* Max level indicators */}
              <line x1="10" y1="35" x2="310" y2="35" stroke="#ff0000" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="10" y1="135" x2="310" y2="135" stroke="#ff0000" strokeWidth="2" strokeDasharray="5,5" />
              <text x="315" y="38" fill="#ff0000" fontSize="10">Max</text>
              <text x="315" y="138" fill="#ff0000" fontSize="10">Max</text>
              
              {/* Center line */}
              <line x1="0" y1="85" x2="320" y2="85" stroke="#333" strokeWidth="1" strokeDasharray="5,5" />
              
              {/* Waveform */}
              <polyline
                points={drawClippingWaveform(q.isClipping, 300, 150)}
                fill="none"
                stroke={q.isClipping ? "#ff0066" : "#00ff88"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(10, 10)"
              />
            </svg>
          </div>

          {/* Answer Options */}
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎚️</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Music Tech Graphs Quiz</h1>
            <p className="text-xl text-gray-600">Master waveforms, polar patterns, frequencies & compression!</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="text-purple-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">What You'll Learn</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Identify different waveform types (sine, square, sawtooth)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Understand microphone polar patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Read frequency spectrums and identify ranges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Use compressor controls effectively</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Recognize audio clipping and distortion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Volume2 className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Quick Audio Primer</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p><strong>Waveforms</strong> show the shape of sound. Different shapes = different tones!</p>
                  <p><strong>Polar Patterns</strong> show where a microphone picks up sound from.</p>
                  <p><strong>Frequency Spectrum</strong> shows which pitches are loud or quiet (bass to treble).</p>
                  <p><strong>Compressors</strong> make loud sounds quieter to even out the volume.</p>
                  <p><strong>Clipping</strong> happens when audio is too loud and gets distorted.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🎵 12 Questions</div>
              <div>Visual & interactive</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">💡 Hints Included</div>
              <div>Guidance on every question</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🤖 AI Tutor</div>
              <div>Real-world examples</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">⏱️ No Time Limit</div>
              <div>Learn at your pace</div>
            </div>
          </div>

          <button
            onClick={() => setShowIntro(false)}
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
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '🎵' : '🎚️'}
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
                  {percentage >= 70 ? '🌟 Excellent! You\'ve got a great understanding of audio production concepts!' :
                   percentage >= 50 ? '👏 Good work! You\'re learning the fundamentals. Keep practicing!' :
                   '💪 Nice start! Review the visual explanations and try again to improve!'}
                </p>
              </div>
              
              {percentage < 100 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Tips for improvement:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Study the visual examples carefully</li>
                        <li>• Each waveform has a unique shape to memorize</li>
                        <li>• Polar patterns show pickup direction from the mic's perspective</li>
                        <li>• Practice identifying frequency ranges: bass, mid, treble</li>
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Music Tech Graphs Quiz</h1>
            <p className="text-purple-100">Visual audio engineering fundamentals</p>
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
                    <h3 className="font-semibold text-purple-900">AI Tutor Explanation</h3>
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
            💡 <strong>Remember:</strong> Visual learning helps! Study each graph and waveform carefully. 
            In real production, you'll see these all the time!
          </p>
        </div>
      </div>
    </div>
  );
}