import React, { useState } from 'react';
import { Play, Check, X, RotateCcw, Sparkles, Lightbulb, BookOpen } from 'lucide-react';

export default function BinaryMIDIQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [binaryBoxes, setBinaryBoxes] = useState([0, 0, 0, 0, 0, 0, 0, 0]); // 8 bits

  const questions = [
    {
      type: 'binary-diagram',
      question: 'Click the boxes to make the number 5 in binary',
      targetNumber: 5,
      hint: 'You need to add up to 5. Which boxes should have a 1? (Hint: 4 + 1 = 5)',
      explanation: 'To make 5, you need the 4 box and the 1 box: 4 + 1 = 5. In binary, this is 00000101.'
    },
    {
      type: 'multiple-choice',
      question: 'What is binary?',
      hint: 'Think about how computers count',
      options: [
        'A system that uses 10 digits (0-9)',
        'A system that uses only 2 digits (0 and 1)',
        'A system that uses letters and numbers',
        'A musical notation system'
      ],
      correct: 1,
      explanation: 'Binary uses only two digits: 0 and 1. Computers use binary because electronic circuits have two states: on (1) and off (0).'
    },
    {
      type: 'binary-diagram',
      question: 'Click the boxes to make the number 3 in binary',
      targetNumber: 3,
      hint: 'What two numbers add to 3? (Think: 2 + 1 = ?)',
      explanation: 'To make 3, you need the 2 box and the 1 box: 2 + 1 = 3. In binary, this is 00000011.'
    },
    {
      type: 'true-false',
      question: 'True or False: In binary, the number "10" means ten.',
      hint: 'Remember, binary is different from our normal counting!',
      options: ['True', 'False'],
      correct: 1,
      explanation: 'False! In binary, "10" means TWO (not ten). Each position represents a power of 2. So "10" = one 2 and zero 1s = 2.'
    },
    {
      type: 'multiple-choice',
      question: 'What does the binary number "1" equal in decimal (normal numbers)?',
      hint: 'This is the easiest one!',
      options: ['0', '1', '2', '10'],
      correct: 1,
      explanation: 'The binary number "1" equals 1 in decimal. Binary "1" = 1, and this is the same in both systems!'
    },
    {
      type: 'multiple-choice',
      question: 'What does the binary number "11" equal in decimal?',
      hint: 'Binary positions from right to left are: 1, 2, 4, 8... Add up the positions where you see a "1"',
      options: ['2', '3', '4', '11'],
      correct: 1,
      explanation: 'Binary "11" = 3 in decimal. We have a 1 in the 2s place (2) and a 1 in the 1s place (1). So 2 + 1 = 3!'
    },
    {
      type: 'multiple-choice',
      question: 'MIDI is a music technology that lets keyboards, computers, and synthesizers talk to each other. What number system does MIDI use?',
      hint: 'Computers love this system!',
      options: ['Decimal (0-9)', 'Binary (0-1)', 'Roman numerals', 'Fractions'],
      correct: 1,
      explanation: 'MIDI uses binary! Like all computer data, MIDI messages are stored and transmitted as 1s and 0s.'
    },
    {
      type: 'multiple-choice',
      question: 'What does the binary number "100" equal in decimal?',
      hint: 'The positions are: 1, 2, 4, 8... This has a 1 in the third position from the right.',
      options: ['1', '3', '4', '100'],
      correct: 2,
      explanation: 'Binary "100" = 4 in decimal. There\'s a 1 in the 4s place and 0s everywhere else. So we just have 4!'
    },
    {
      type: 'binary-diagram',
      question: 'Click the boxes to make the number 12 in binary',
      targetNumber: 12,
      hint: 'Break 12 into two numbers that add up to it. Try 8 + 4!',
      explanation: 'To make 12, you need the 8 box and the 4 box: 8 + 4 = 12. In binary, this is 00001100.'
    },
    {
      type: 'true-false',
      question: 'True or False: MIDI note numbers go from 0 to 127.',
      hint: 'This is just a fact to remember about MIDI',
      options: ['True', 'False'],
      correct: 0,
      explanation: 'True! MIDI uses note numbers from 0 (very low) to 127 (very high). Note 60 is Middle C on the piano.'
    },
    {
      type: 'multiple-choice',
      question: 'In MIDI, note number 60 is Middle C. What might note number 61 be?',
      hint: 'The numbers go up one for each piano key',
      options: ['Also Middle C', 'C# (one key higher)', 'High C', 'Low C'],
      correct: 1,
      explanation: 'Note 61 is C# (the black key just above Middle C). Each MIDI note number represents one key on the piano, going up by 1 each time.'
    },
    {
      type: 'multiple-choice',
      question: 'A "bit" is a single binary digit (0 or 1). How many different values can you make with 3 bits?',
      hint: 'Count them: 000, 001, 010, 011, 100, 101, 110, 111',
      options: ['3', '6', '8', '9'],
      correct: 2,
      explanation: 'You can make 8 different values! With 3 bits, you can count from 000 to 111 (that\'s 0 to 7 in decimal, which is 8 numbers total).'
    },
    {
      type: 'multiple-choice',
      question: 'MIDI velocity means how hard you hit a key (how loud the note is). MIDI velocity goes from 0 (silent) to 127 (loudest). What does a velocity of 0 mean?',
      hint: 'Think about what happens when you don\'t press a key at all',
      options: ['Very quiet', 'No sound/note off', 'Medium volume', 'Error'],
      correct: 1,
      explanation: 'Velocity 0 means no sound or note off. It\'s like not pressing the key at all. Velocity 127 is the loudest, and 64 is about medium.'
    }
  ];

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎹</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Binary & MIDI Quiz</h1>
            <p className="text-xl text-gray-600">Learn the basics of binary and how it works in music technology!</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
            <div className="flex items-start gap-3 mb-4">
              <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">What You'll Learn</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>What binary is and why computers use it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>How to read simple binary numbers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>How MIDI uses binary to represent musical notes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Quick Binary Primer</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Binary</strong> is a counting system that uses only 0 and 1.</p>
                  <p className="text-sm">Each position from right to left represents: <span className="font-mono bg-white px-2 py-1 rounded">1, 2, 4, 8, 16, 32, 64, 128...</span></p>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Example:</p>
                    <p className="font-mono text-lg">101 = <span className="text-blue-600">(1×4)</span> + <span className="text-green-600">(0×2)</span> + <span className="text-purple-600">(1×1)</span> = <strong>5</strong></p>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-300 p-3 rounded-lg">
                    <p className="text-sm font-semibold mb-1">🎯 Interactive Learning:</p>
                    <p className="text-sm">You'll click boxes to build binary numbers! Each box you click adds its value to your total. It's like a fun puzzle!</p>
                  </div>
                  <p><strong>MIDI</strong> (Musical Instrument Digital Interface) uses binary to send musical information like which note to play and how loud!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">📊 11 Questions</div>
              <div>Interactive diagrams & quizzes</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">💡 Hints Included</div>
              <div>Get help on every question</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">🤖 AI Tutor</div>
              <div>Personalized explanations</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-gray-800 mb-1">⏱️ No Time Limit</div>
              <div>Learn at your own pace</div>
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
              content: `You're a friendly, encouraging tutor teaching binary and MIDI to beginners. A student just answered this question:

Question: ${question.question}
Hint provided: ${question.hint || 'None'}
Their answer: ${userAnswer}
Correct answer: ${question.type === 'multiple-choice' || question.type === 'true-false' ? question.options[question.correct] : question.correct}
Result: ${isCorrect ? 'Correct' : 'Incorrect'}

Provide a warm, encouraging explanation (2-3 sentences) that:
- Celebrates their success if correct, or gently guides them if incorrect
- Uses simple, beginner-friendly language
- Relates the concept to something familiar when possible
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
    const isCorrect = currentQ.input 
      ? answer.toLowerCase().replace(/\s/g, '') === currentQ.correct.toLowerCase().replace(/\s/g, '')
      : answer === currentQ.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    await getAIExplanation(currentQ, answer, isCorrect);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAiExplanation('');
      setBinaryBoxes([0, 0, 0, 0, 0, 0, 0, 0]); // Reset boxes for next question
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
    setBinaryBoxes([0, 0, 0, 0, 0, 0, 0, 0]); // Reset boxes
  };

  const toggleBinaryBox = (index) => {
    if (showFeedback) return; // Don't allow changes after submission
    
    const newBoxes = [...binaryBoxes];
    newBoxes[index] = newBoxes[index] === 0 ? 1 : 0;
    setBinaryBoxes(newBoxes);
  };

  const calculateBinaryValue = () => {
    const positions = [128, 64, 32, 16, 8, 4, 2, 1];
    return binaryBoxes.reduce((sum, bit, index) => sum + (bit * positions[index]), 0);
  };

  const checkBinaryAnswer = async () => {
    const currentValue = calculateBinaryValue();
    const targetValue = questions[currentQuestion].targetNumber;
    const isCorrect = currentValue === targetValue;
    
    setSelectedAnswer(currentValue);
    setShowFeedback(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    await getAIExplanation(questions[currentQuestion], currentValue.toString(), isCorrect);
  };

  const renderQuestion = () => {
    const q = questions[currentQuestion];

    if (q.type === 'binary-diagram') {
      const positions = [128, 64, 32, 16, 8, 4, 2, 1];
      const currentValue = calculateBinaryValue();
      const isCorrect = currentValue === q.targetNumber;

      return (
        <div className="space-y-6">
          {/* The Binary Diagram */}
          <div className="bg-white border-4 border-gray-300 rounded-xl p-6">
            <div className="grid grid-cols-8 gap-2 mb-4">
              {positions.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-700 mb-2">{value}</div>
                  <button
                    onClick={() => toggleBinaryBox(index)}
                    disabled={showFeedback}
                    className={`w-full aspect-square border-4 rounded-lg text-3xl font-bold transition-all ${
                      binaryBoxes[index] === 1
                        ? 'bg-blue-500 border-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white border-gray-300 text-gray-300 hover:border-blue-400'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                  >
                    {binaryBoxes[index]}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Current Value Display */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Your current number:</p>
                <p className="text-4xl font-bold text-purple-600">{currentValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Target number:</p>
                <p className="text-4xl font-bold text-blue-600">{q.targetNumber}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {!showFeedback && (
            <button
              onClick={checkBinaryAnswer}
              className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
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
                    <span className="font-bold text-green-800 text-lg">Perfect! 🎉</span>
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

    if (q.type === 'multiple-choice' || q.type === 'true-false' || q.type === 'matching') {
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
                  <span className="font-mono">{option}</span>
                  {showCorrect && <Check className="text-green-600" size={20} />}
                  {showIncorrect && <X className="text-red-600" size={20} />}
                </div>
              </button>
            );
          })}
        </div>
      );
    }

    if (q.type === 'binary-conversion' || q.type === 'calculation') {
      return (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your answer..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg font-mono text-lg focus:border-blue-500 focus:outline-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value && !showFeedback) {
                handleAnswer(e.target.value);
              }
            }}
            disabled={showFeedback}
          />
          {!showFeedback && (
            <button
              onClick={(e) => {
                const input = e.target.parentElement.querySelector('input');
                if (input.value) handleAnswer(input.value);
              }}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Answer
            </button>
          )}
          {showFeedback && (
            <div className={`p-4 rounded-lg ${
              selectedAnswer?.toLowerCase().replace(/\s/g, '') === q.correct.toLowerCase().replace(/\s/g, '')
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-red-50 border-2 border-red-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer?.toLowerCase().replace(/\s/g, '') === q.correct.toLowerCase().replace(/\s/g, '') ? (
                  <>
                    <Check className="text-green-600" size={20} />
                    <span className="font-semibold text-green-800">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="text-red-600" size={20} />
                    <span className="font-semibold text-red-800">Incorrect</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700">Correct answer: <span className="font-mono font-bold">{q.correct}</span></p>
            </div>
          )}
        </div>
      );
    }
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '🌟'}
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
                  {percentage >= 70 ? '🌟 Fantastic! You\'re really getting the hang of binary and MIDI!' :
                   percentage >= 50 ? '👏 Nice work! You\'re learning! Try again to improve your score.' :
                   '💪 Great start! Learning binary takes practice. Review the explanations and try again!'}
                </p>
              </div>
              
              {percentage < 100 && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-left">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Tips for improvement:</p>
                      <ul className="space-y-1 ml-4">
                        <li>• Read the hints carefully before answering</li>
                        <li>• Review the AI explanations after each question</li>
                        <li>• Remember: binary positions are 1, 2, 4, 8, 16...</li>
                        <li>• Take your time - there's no rush!</li>
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Binary & MIDI Quiz</h1>
            <p className="text-blue-100">Master the fundamentals of binary in music technology</p>
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
            💡 <strong>Remember:</strong> Take your time and use the hints! Binary might seem tricky at first, but you'll get the hang of it. 
            Each question has a helpful explanation to guide you.
          </p>
        </div>
      </div>
    </div>
  );
}