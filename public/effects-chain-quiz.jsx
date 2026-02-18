import React, { useState, useRef, useEffect } from 'react';
import { Play, Check, X, RotateCcw, Sparkles, Lightbulb, BookOpen, Volume2, Settings, ArrowRight, Pause, RotateCw } from 'lucide-react';

export default function EffectsChainQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [effectsOrder, setEffectsOrder] = useState([]);
  const [draggedEffect, setDraggedEffect] = useState(null);
  const [parameters, setParameters] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);

  const questions = [
    {
      type: 'order-chain',
      scenario: 'vocal-recording',
      question: 'Arrange these effects in the correct order for a vocal recording chain',
      hint: 'Order: EQ (fix problems) → Compressor (control dynamics) → Reverb (add space)',
      effects: [
        { id: 'reverb', name: 'Reverb', color: '#8b5cf6' },
        { id: 'eq', name: 'EQ', color: '#3b82f6' },
        { id: 'compressor', name: 'Compressor', color: '#ef4444' }
      ],
      correctOrder: ['eq', 'compressor', 'reverb'],
      explanation: 'Vocal chain: EQ first to fix frequency issues, Compressor to even out levels, then Reverb for space. Never compress before fixing EQ problems, and reverb always comes last!'
    },
    {
      type: 'set-parameters',
      scenario: 'compressor-vocal',
      question: 'Set the compressor for gentle vocal compression',
      hint: 'Ratio around 3:1 to 4:1, medium attack (10ms), medium-fast release (100ms)',
      effect: {
        name: 'Compressor',
        parameters: [
          { id: 'ratio', name: 'Ratio', min: 1, max: 20, target: 4, unit: ':1', tolerance: 1 },
          { id: 'attack', name: 'Attack', min: 0, max: 100, target: 10, unit: 'ms', tolerance: 5 },
          { id: 'release', name: 'Release', min: 10, max: 500, target: 100, unit: 'ms', tolerance: 30 }
        ]
      },
      explanation: '3:1 to 4:1 ratio provides gentle compression. 10ms attack lets transients through for natural sound. 100ms release lets the compressor recover between phrases.'
    },
    {
      type: 'order-chain',
      scenario: 'guitar-distortion',
      question: 'Order these guitar pedal effects correctly',
      hint: 'Guitar → Distortion → EQ → Delay → Reverb',
      effects: [
        { id: 'delay', name: 'Delay', color: '#10b981' },
        { id: 'reverb', name: 'Reverb', color: '#8b5cf6' },
        { id: 'distortion', name: 'Distortion', color: '#f59e0b' },
        { id: 'eq', name: 'EQ', color: '#3b82f6' }
      ],
      correctOrder: ['distortion', 'eq', 'delay', 'reverb'],
      explanation: 'Distortion first to create the tone, EQ to shape it, then time-based effects (Delay, Reverb) at the end. Reversing this order sounds muddy!'
    },
    {
      type: 'set-parameters',
      scenario: 'eq-remove-mud',
      question: 'Set the EQ to remove muddiness from a vocal (cut around 250-300 Hz)',
      hint: 'Frequency: 250-300 Hz, Gain: -3 to -6 dB, Q: 1.5-2.5',
      effect: {
        name: 'Parametric EQ',
        parameters: [
          { id: 'frequency', name: 'Frequency', min: 20, max: 20000, target: 275, unit: 'Hz', tolerance: 50 },
          { id: 'gain', name: 'Gain', min: -12, max: 12, target: -4, unit: 'dB', tolerance: 2 },
          { id: 'q', name: 'Q', min: 0.5, max: 5, target: 2, unit: '', tolerance: 0.7 }
        ]
      },
      explanation: 'Cutting 250-300 Hz removes muddiness and boxiness in vocals. Use moderate Q (1.5-2.5) for a natural sound. Too narrow sounds surgical, too wide affects too much.'
    },
    {
      type: 'order-chain',
      scenario: 'mastering-chain',
      question: 'Arrange a basic mastering chain',
      hint: 'EQ → Compressor → Limiter (always last!)',
      effects: [
        { id: 'limiter', name: 'Limiter', color: '#dc2626' },
        { id: 'compressor', name: 'Compressor', color: '#ef4444' },
        { id: 'eq', name: 'EQ', color: '#3b82f6' }
      ],
      correctOrder: ['eq', 'compressor', 'limiter'],
      explanation: 'Mastering chain: EQ for tonal balance, gentle Compressor for glue, Limiter last to catch peaks and maximize loudness. Limiter ALWAYS comes last in mastering!'
    },
    {
      type: 'identify-problem',
      question: 'What\'s wrong with this effects chain: Reverb → Compressor → EQ?',
      hint: 'Think about the signal flow and what each effect does',
      options: [
        'Nothing, this is correct',
        'Reverb should be last (after compression)',
        'EQ should be first',
        'Both B and C are correct'
      ],
      correct: 3,
      explanation: 'This chain is backwards! EQ should be first to fix problems, Compressor second to control dynamics, and Reverb last to add space. Compressing reverb tails sounds unnatural!'
    },
    {
      type: 'set-parameters',
      scenario: 'reverb-vocal',
      question: 'Set a subtle vocal reverb that adds space without washing out the vocal',
      hint: 'Small-medium room, short decay (1-2s), low mix (10-25%)',
      effect: {
        name: 'Reverb',
        parameters: [
          { id: 'roomSize', name: 'Room Size', min: 0, max: 100, target: 35, unit: '%', tolerance: 15 },
          { id: 'decay', name: 'Decay Time', min: 0.1, max: 10, target: 1.5, unit: 's', tolerance: 0.5 },
          { id: 'mix', name: 'Wet/Dry Mix', min: 0, max: 100, target: 20, unit: '%', tolerance: 10 }
        ]
      },
      explanation: 'Subtle vocal reverb: small-medium room (30-40%), short decay (1-2s), and low mix (15-25%). This adds depth without making vocals sound distant or washed out.'
    },
    {
      type: 'multiple-choice',
      question: 'Why should you usually place EQ before compression?',
      hint: 'Think about what happens when you compress problem frequencies',
      options: [
        'EQ is always first, it\'s a rule',
        'So the compressor doesn\'t emphasize frequency problems',
        'It doesn\'t matter what order they\'re in',
        'To make the compressor work harder'
      ],
      correct: 1,
      explanation: 'EQ before compression means you fix frequency problems first. If you compress first, you\'ll make those problems louder and harder to fix. Remove mud before controlling dynamics!'
    },
    {
      type: 'order-chain',
      scenario: 'parallel-compression',
      question: 'Order a parallel compression setup for drums',
      hint: 'Split → Heavy Compressor → Mix back with original',
      effects: [
        { id: 'heavy-comp', name: 'Heavy Compressor', color: '#dc2626' },
        { id: 'eq', name: 'EQ (on compressed)', color: '#3b82f6' },
        { id: 'blend', name: 'Blend with Original', color: '#10b981' }
      ],
      correctOrder: ['heavy-comp', 'eq', 'blend'],
      explanation: 'Parallel compression: crush the signal with heavy compression, EQ the compressed version if needed, then blend it back with the clean signal. This adds punch while keeping dynamics!'
    },
    {
      type: 'multiple-choice',
      question: 'When should reverb and delay come in an effects chain?',
      hint: 'Think about what happens to the reverb tail',
      options: [
        'At the very beginning',
        'Before distortion and compression',
        'After all dynamic and frequency effects',
        'It doesn\'t matter'
      ],
      correct: 2,
      explanation: 'Time-based effects (reverb, delay) come LAST! If you compress or distort after reverb, you\'ll affect the reverb tails in weird ways. Process the sound first, add space last.'
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

  const playWithEffects = () => {
    const ctx = audioContextRef.current;
    if (!ctx || isPlaying) return;

    setIsPlaying(true);
    const now = ctx.currentTime;
    
    // Create a simple melody
    const notes = [262, 330, 392, 330]; // C-E-G-E
    const duration = 0.4;
    
    notes.forEach((freq, i) => {
      const noteTime = now + i * duration;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.2, noteTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, noteTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(noteTime);
      osc.stop(noteTime + duration);
    });

    setTimeout(() => setIsPlaying(false), notes.length * duration * 1000);
  };

  const handleDragStart = (effect, index) => {
    if (showFeedback) return;
    setDraggedEffect({ effect, index });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedEffect === null || showFeedback) return;
    
    const newOrder = [...effectsOrder];
    const draggedItem = newOrder[draggedEffect.index];
    newOrder.splice(draggedEffect.index, 1);
    newOrder.splice(targetIndex, 0, draggedItem);
    
    setEffectsOrder(newOrder);
    setDraggedEffect(null);
  };

  const updateParameter = (paramId, value) => {
    if (showFeedback) return;
    setParameters(prev => ({ ...prev, [paramId]: value }));
  };

  const checkAnswer = async () => {
    const q = questions[currentQuestion];
    let isCorrect = false;
    
    if (q.type === 'order-chain') {
      const currentIds = effectsOrder.map(e => e.id);
      isCorrect = JSON.stringify(currentIds) === JSON.stringify(q.correctOrder);
    } else if (q.type === 'set-parameters') {
      isCorrect = q.effect.parameters.every(param => {
        const userValue = parameters[param.id] || param.min;
        return Math.abs(userValue - param.target) <= param.tolerance;
      });
    }
    
    setSelectedAnswer(isCorrect);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    await getAIExplanation(q, isCorrect);
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
              content: `You're an experienced mixing engineer teaching audio effects. A student just answered:

Question: ${question.question}
Result: ${isCorrect ? 'Correct' : 'Incorrect'}

Provide a warm, encouraging explanation (2-3 sentences) that:
- Celebrates success or gently guides if incorrect
- Explains why this effects routing/setting matters
- Gives a practical mixing tip
Keep it professional but friendly!`
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

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAiExplanation('');
      
      const nextQ = questions[currentQuestion + 1];
      if (nextQ.type === 'order-chain') {
        // Randomize initial order
        const shuffled = [...nextQ.effects].sort(() => Math.random() - 0.5);
        setEffectsOrder(shuffled);
      } else if (nextQ.type === 'set-parameters') {
        // Reset parameters to default
        const defaults = {};
        nextQ.effect.parameters.forEach(param => {
          defaults[param.id] = param.min;
        });
        setParameters(defaults);
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
    setEffectsOrder([]);
    setParameters({});
  };

  const renderEffectBox = (effect, index, showIndex = false) => {
    const colors = {
      '#3b82f6': 'from-blue-500 to-blue-600',
      '#ef4444': 'from-red-500 to-red-600',
      '#8b5cf6': 'from-purple-500 to-purple-600',
      '#10b981': 'from-green-500 to-green-600',
      '#f59e0b': 'from-amber-500 to-amber-600',
      '#dc2626': 'from-rose-500 to-rose-600'
    };

    return (
      <div
        key={effect.id}
        draggable={!showFeedback}
        onDragStart={() => handleDragStart(effect, index)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(index)}
        className={`bg-gradient-to-br ${colors[effect.color]} rounded-xl p-4 shadow-lg min-w-[140px] cursor-move hover:scale-105 transition-all ${
          showFeedback ? 'cursor-not-allowed opacity-90' : ''
        }`}
      >
        <div className="text-white">
          {showIndex && (
            <div className="text-xs font-bold mb-1 opacity-75">Step {index + 1}</div>
          )}
          <div className="flex items-center gap-2">
            <Settings size={18} />
            <span className="font-bold">{effect.name}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderKnob = (param, value) => {
    const percentage = ((value - param.min) / (param.max - param.min)) * 100;
    const rotation = (percentage / 100) * 270 - 135; // -135 to +135 degrees
    
    const isCorrect = showFeedback && Math.abs(value - param.target) <= param.tolerance;
    const isWrong = showFeedback && !isCorrect;

    return (
      <div className="flex flex-col items-center">
        <label className="text-sm font-semibold text-gray-700 mb-2">{param.name}</label>
        
        {/* Knob */}
        <div className="relative w-24 h-24 mb-2">
          <div className={`absolute inset-0 rounded-full border-8 ${
            isCorrect ? 'border-green-500' :
            isWrong ? 'border-red-500' :
            'border-gray-300'
          } shadow-inner`}></div>
          <div
            className={`absolute inset-2 rounded-full ${
              isCorrect ? 'bg-gradient-to-br from-green-400 to-green-600' :
              isWrong ? 'bg-gradient-to-br from-red-400 to-red-600' :
              'bg-gradient-to-br from-blue-400 to-blue-600'
            } shadow-lg cursor-pointer`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Indicator line */}
            <div className="absolute top-1 left-1/2 w-1 h-6 bg-white rounded-full transform -translate-x-1/2"></div>
          </div>
          <RotateCw 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-30 pointer-events-none" 
            size={32} 
          />
        </div>

        {/* Slider */}
        <input
          type="range"
          min={param.min}
          max={param.max}
          step={(param.max - param.min) / 100}
          value={value}
          onChange={(e) => updateParameter(param.id, parseFloat(e.target.value))}
          disabled={showFeedback}
          className="w-full accent-blue-600 cursor-pointer disabled:cursor-not-allowed"
        />
        
        {/* Value display */}
        <div className={`text-sm font-bold mt-1 ${
          isCorrect ? 'text-green-600' :
          isWrong ? 'text-red-600' :
          'text-gray-700'
        }`}>
          {value.toFixed(param.unit === 'Hz' && value > 1000 ? 0 : 1)} {param.unit}
        </div>
        
        {/* Target indicator when showing feedback */}
        {showFeedback && (
          <div className="text-xs text-gray-500 mt-1">
            Target: {param.target} {param.unit}
          </div>
        )}
      </div>
    );
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];

    if (q.type === 'order-chain') {
      const isCorrect = showFeedback && JSON.stringify(effectsOrder.map(e => e.id)) === JSON.stringify(q.correctOrder);

      return (
        <div className="space-y-6">
          {/* Signal flow visualization */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 border-2 border-gray-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold">
                Input
              </div>
              <ArrowRight className="text-gray-600" size={24} />
            </div>

            {/* Effects chain */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {effectsOrder.map((effect, index) => (
                <React.Fragment key={effect.id}>
                  {renderEffectBox(effect, index, true)}
                  {index < effectsOrder.length - 1 && (
                    <ArrowRight className="text-gray-600" size={24} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ArrowRight className="text-gray-600" size={24} />
              <div className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold">
                Output
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-800">
              🔄 <strong>Drag the effect boxes</strong> to rearrange the signal chain. Order matters in audio processing!
            </p>
          </div>

          {/* Test button */}
          <button
            onClick={playWithEffects}
            disabled={isPlaying}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
          >
            {isPlaying ? <Pause size={20} /> : <Volume2 size={20} />}
            {isPlaying ? 'Playing...' : 'Test Sound'}
          </button>

          {/* Check button */}
          {!showFeedback && (
            <button
              onClick={checkAnswer}
              className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg"
            >
              Check Chain Order
            </button>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg border-2 ${
              isCorrect
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <Check className="text-green-600" size={24} />
                    <span className="font-bold text-green-800 text-lg">Perfect signal flow! 🎚️</span>
                  </>
                ) : (
                  <>
                    <X className="text-orange-600" size={24} />
                    <span className="font-bold text-orange-800 text-lg">Not quite - check the order!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700 mb-2">{q.explanation}</p>
              {!isCorrect && (
                <div className="mt-2 text-xs text-gray-600">
                  Correct order: {q.correctOrder.map((id, i) => {
                    const effect = q.effects.find(e => e.id === id);
                    return (
                      <span key={id}>
                        {i > 0 && ' → '}
                        <strong>{effect.name}</strong>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    if (q.type === 'set-parameters') {
      const allCorrect = showFeedback && q.effect.parameters.every(param => {
        const userValue = parameters[param.id] || param.min;
        return Math.abs(userValue - param.target) <= param.tolerance;
      });

      return (
        <div className="space-y-6">
          {/* Effect panel */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border-2 border-slate-700">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">{q.effect.name}</h3>
              <p className="text-slate-400 text-sm">Adjust the parameters to match the target</p>
            </div>

            {/* Knobs */}
            <div className="grid grid-cols-3 gap-8">
              {q.effect.parameters.map(param => (
                <div key={param.id}>
                  {renderKnob(param, parameters[param.id] || param.min)}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-800">
              🎛️ <strong>Adjust the knobs</strong> or use the sliders to set the parameters. Match the target values!
            </p>
          </div>

          {/* Check button */}
          {!showFeedback && (
            <button
              onClick={checkAnswer}
              className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg"
            >
              Check Parameters
            </button>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg border-2 ${
              allCorrect
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {allCorrect ? (
                  <>
                    <Check className="text-green-600" size={24} />
                    <span className="font-bold text-green-800 text-lg">Perfect settings! 🎛️</span>
                  </>
                ) : (
                  <>
                    <X className="text-orange-600" size={24} />
                    <span className="font-bold text-orange-800 text-lg">Close, but some parameters need adjustment!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700">{q.explanation}</p>
            </div>
          )}
        </div>
      );
    }

    if (q.type === 'multiple-choice' || q.type === 'identify-problem') {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎚️</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Effects Chain Quiz</h1>
            <p className="text-xl text-gray-600">Master signal flow and effect parameters!</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">What You'll Learn</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Correct order for different effect chains</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>How to set compressor and EQ parameters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Why signal flow order matters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Professional mixing techniques</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Settings className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">How It Works</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p><strong>Effects order</strong> dramatically changes your sound!</p>
                  <p>🔄 <strong>Drag effects</strong> to arrange the signal chain</p>
                  <p>🎛️ <strong>Adjust knobs</strong> to set the right parameters</p>
                  <p>📊 <strong>Learn the rules</strong> - EQ before compression, reverb last, etc.</p>
                  <div className="bg-white p-3 rounded-lg border border-yellow-300">
                    <p className="text-xs font-semibold mb-1">💡 Pro Tip:</p>
                    <p className="text-xs">Most mixing mistakes come from wrong effect order, not bad settings! Get the signal flow right first.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🎚️ 10 Questions</div>
              <div>Chains & parameters</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🔧 Interactive</div>
              <div>Drag, adjust, learn</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🤖 AI Tutor</div>
              <div>Mixing engineer tips</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">⏱️ No Time Limit</div>
              <div>Learn at your pace</div>
            </div>
          </div>

          <button
            onClick={() => {
              setShowIntro(false);
              const firstQ = questions[0];
              if (firstQ.type === 'order-chain') {
                const shuffled = [...firstQ.effects].sort(() => Math.random() - 0.5);
                setEffectsOrder(shuffled);
              } else if (firstQ.type === 'set-parameters') {
                const defaults = {};
                firstQ.effect.parameters.forEach(param => {
                  defaults[param.id] = param.min;
                });
                setParameters(defaults);
              }
            }}
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '🎚️' : '🎛️'}
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
                  {percentage >= 70 ? '🌟 Excellent! You understand signal flow like a pro engineer!' :
                   percentage >= 50 ? '👏 Good work! Keep practicing effect chains in your mixes!' :
                   '💪 Great start! Effects routing takes practice - review the concepts and try again!'}
                </p>
              </div>
              
              {percentage < 100 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Tips for improvement:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Remember: EQ → Compression → Time effects (delay/reverb)</li>
                        <li>• Fix problems before enhancing or adding space</li>
                        <li>• Reverb and delay always come last</li>
                        <li>• Experiment in your DAW to hear the differences!</li>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Effects Chain Quiz</h1>
            <p className="text-blue-100">Master signal flow and processing</p>
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
                    <h3 className="font-semibold text-blue-900">Mixing Engineer Tips</h3>
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
            💡 <strong>Pro Tip:</strong> The golden rule: Fix → Control → Enhance → Space. 
            Fix problems (EQ), Control dynamics (compression), Enhance (saturation), Add space (reverb/delay).
          </p>
        </div>
      </div>
    </div>
  );
}