import React, { useState, useEffect, useMemo } from 'react';
import { Flame, Clock, Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Zap, Trophy, BookOpen } from 'lucide-react';
import dictionaryData from '../data/dictionary_quizzes.json';
import { useUser } from '../contexts/UserContext';

const HISTORY_KEY = 'mtg_daily5_history';
const STREAK_KEY = 'mtg_daily5_streak';

/**
 * Validates that all answer choices in a question are of comparable length.
 * Prevents students from guessing the correct answer simply because it is the longest or shortest option.
 * @param {Array} answers Array of answer objects with .text property
 * @param {number} maxAllowedDiff Maximum character length difference between longest and shortest answer (default 10)
 * @returns {boolean}
 */
export function isAnswerLengthBalanced(answers, maxAllowedDiff = 10) {
  if (!answers || answers.length < 2) return false;
  const lengths = answers.map(a => (a.text || '').trim().length);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  if (min === 0) return false;
  return (max - min) <= maxAllowedDiff;
}

// Extract full flattened bank of questions that meet strict length-balance standards
function getAllQuestionsPool() {
  const pool = [];
  dictionaryData.volumes.forEach((vol, vIdx) => {
    (vol.parts || []).forEach((part, pIdx) => {
      (part.topics || []).forEach((topic, tIdx) => {
        ['basic', 'intermediate'].forEach(lvl => {
          (topic.levels?.[lvl] || []).forEach((q, qIdx) => {
            const correctAns = q.answers?.find(a => a.is_true === 'yes' || a.is_true === true);
            // Strict pedagogical safeguard: answers must be balanced in length (max diff <= 10 chars)
            // so students cannot deduce the answer by option length
            if (correctAns && q.content && isAnswerLengthBalanced(q.answers, 10)) {
              pool.push({
                uid: `v${vIdx + 1}_p${pIdx + 1}_t${tIdx + 1}_${lvl}_q${qIdx + 1}`,
                volumeTitle: vol.title,
                topicTitle: topic.title,
                tier: lvl,
                question: q.content,
                answers: q.answers,
                correctAnswer: correctAns.text,
                explanation: q.explanation || q.rationale || '',
                image: q.explanation_image?.src || null
              });
            }
          });
        });
      });
    });
  });
  return pool;
}

// Spaced Repetition Question Selection
export function selectDaily5Questions() {
  const allPool = getAllQuestionsPool();
  let history = {};
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) history = JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse daily5 history:', e);
  }

  const now = Date.now();
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;

  // Split into categories:
  // 1. Weak points (wrong in last attempt)
  const weakQuestions = [];
  // 2. Due for review (>14 days or never seen)
  const dueQuestions = [];
  // 3. Recently mastered
  const masteredQuestions = [];

  allPool.forEach(q => {
    const rec = history[q.uid];
    if (rec) {
      if (rec.lastResult === 'wrong') {
        weakQuestions.push(q);
      } else if (now - rec.lastSeen > fourteenDaysMs) {
        dueQuestions.push(q);
      } else {
        masteredQuestions.push(q);
      }
    } else {
      dueQuestions.push(q);
    }
  });

  // Shuffle arrays
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const shuffledWeak = shuffle(weakQuestions);
  const shuffledDue = shuffle(dueQuestions);
  const shuffledMastered = shuffle(masteredQuestions);

  const selected = [];
  const usedTopics = new Set();

  const addUnique = qList => {
    for (const q of qList) {
      if (selected.length >= 5) break;
      if (!selected.some(s => s.uid === q.uid)) {
        selected.push(q);
        usedTopics.add(q.topicTitle);
      }
    }
  };

  // Up to 2 from weak points
  addUnique(shuffledWeak);
  // Fill remaining from due questions
  addUnique(shuffledDue);
  // Fallback to mastered if still needed
  if (selected.length < 5) {
    addUnique(shuffledMastered);
  }

  // Final fallback
  if (selected.length < 5) {
    addUnique(shuffle(allPool));
  }

  return selected.slice(0, 5);
}

export default function QuickFireDaily5({ onExit }) {
  const { currentUser, saveQuizResult } = useUser();
  const [questions, setQuestions] = useState(() => selectDaily5Questions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  const [timerActive, setTimerActive] = useState(true);

  // Streak state
  const [streakData, setStreakData] = useState(() => {
    try {
      const raw = localStorage.getItem(STREAK_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { streak: 0, lastDay: null, bestStreak: 0, totalCompleted: 0 };
  });

  const currentQ = questions[currentIndex];

  // Shuffle answers for current question
  const shuffledAnswers = useMemo(() => {
    if (!currentQ?.answers) return [];
    return [...currentQ.answers].sort(() => Math.random() - 0.5);
  }, [currentQ]);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || isComplete || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, isComplete, timeLeft]);

  // Handle option select
  const handleSelectAnswer = (answerObj) => {
    if (isAnswered) return;
    setSelectedOption(answerObj.text);
    setIsAnswered(true);

    const isCorrect = answerObj.is_true === 'yes' || answerObj.is_true === true;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Record question history for Spaced Repetition
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const history = raw ? JSON.parse(raw) : {};
      const prevRec = history[currentQ.uid] || { wrongCount: 0, correctCount: 0 };
      history[currentQ.uid] = {
        lastSeen: Date.now(),
        lastResult: isCorrect ? 'correct' : 'wrong',
        wrongCount: prevRec.wrongCount + (isCorrect ? 0 : 1),
        correctCount: prevRec.correctCount + (isCorrect ? 1 : 0)
      };
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to update question history:', e);
    }

    setAnswersLog(prev => [...prev, {
      question: currentQ.question,
      userAnswer: answerObj.text,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      explanation: currentQ.explanation,
      topic: currentQ.topicTitle
    }]);
  };

  // Next Question or Finish
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishDrill();
    }
  };

  // Finish Drill & Update Streak
  const finishDrill = () => {
    setIsComplete(true);
    setTimerActive(false);

    const todayStr = new Date().toISOString().split('T')[0];
    let newStreak = streakData.streak || 0;
    
    // Check consecutive day
    if (streakData.lastDay) {
      const last = new Date(streakData.lastDay);
      const today = new Date(todayStr);
      const diffDays = Math.round((today - last) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays === 0) {
        // already practiced today, keep streak
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const updatedStreak = {
      streak: newStreak,
      lastDay: todayStr,
      bestStreak: Math.max(newStreak, streakData.bestStreak || 0),
      totalCompleted: (streakData.totalCompleted || 0) + 1
    };

    setStreakData(updatedStreak);
    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));
    } catch (e) {
      console.warn('Failed to save streak:', e);
    }

    // Save to user context
    if (saveQuizResult) {
      const pct = Math.round(((score + (isAnswered && (selectedOption === currentQ?.correctAnswer) ? 0 : 0)) / 5) * 100);
      let grade = 'U';
      if (pct >= 80) grade = 'A';
      else if (pct >= 60) grade = 'B';
      else if (pct >= 40) grade = 'C';
      saveQuizResult('Daily 5 Quick-Fire Drill', score, 5, grade);
    }
  };

  const handleRestart = () => {
    const next5 = selectDaily5Questions();
    setQuestions(next5);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnswersLog([]);
    setIsComplete(false);
    setTimeLeft(120);
    setTimerActive(true);
  };

  return (
    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      padding: '24px 16px',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Top Header & Streak Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        borderRadius: '16px',
        padding: '16px 24px',
        marginBottom: '24px',
        boxShadow: '0 8px 30px rgba(249, 115, 22, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
          }}>
            <Flame size={26} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                Daily 5 Quick-Fire
              </h2>
              <span style={{
                background: 'rgba(249, 115, 22, 0.2)',
                color: '#fb923c',
                border: '1px solid rgba(249, 115, 22, 0.4)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                Spaced Repetition
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Strengthen memory retention with a 2-minute daily knowledge drill.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Streak Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '8px 14px',
            borderRadius: '10px'
          }}>
            <Flame size={18} color="#f87171" />
            <span style={{ fontWeight: 800, color: '#fca5a5', fontSize: '0.9rem' }}>
              {streakData.streak} Day{streakData.streak === 1 ? '' : 's'} Streak
            </span>
          </div>

          {/* Timer */}
          {!isComplete && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: timeLeft < 30 ? '#ef4444' : '#38bdf8',
              fontWeight: 700,
              fontSize: '1rem',
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '8px 12px',
              borderRadius: '10px',
              border: `1px solid ${timeLeft < 30 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.3)'}`
            }}>
              <Clock size={16} />
              <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
            </div>
          )}

          <button
            onClick={onExit}
            style={{
              background: 'transparent',
              border: '1px solid #475569',
              color: '#94a3b8',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Exit
          </button>
        </div>
      </div>

      {!isComplete ? (
        /* Active Question Card */
        <div style={{
          background: 'var(--bg-panel, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Progress Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <span style={{ color: '#f97316', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.78rem' }}>
              Question {currentIndex + 1} of 5 • {currentQ?.topicTitle}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '32px',
                    height: '6px',
                    borderRadius: '3px',
                    background: idx === currentIndex
                      ? '#f97316'
                      : idx < currentIndex
                      ? '#10b981'
                      : 'rgba(255, 255, 255, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h3 style={{
            fontSize: '1.35rem',
            lineHeight: '1.5',
            fontWeight: 700,
            margin: '0 0 24px 0',
            color: '#f8fafc'
          }}>
            {currentQ?.question}
          </h3>

          {/* Optional Image */}
          {currentQ?.image && (
            <div style={{
              textAlign: 'center',
              marginBottom: '20px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#0f172a',
              border: '1px solid #334155'
            }}>
              <img
                src={currentQ.image.startsWith('http') ? currentQ.image : `/${currentQ.image.replace(/^\//, '')}`}
                alt="Technical Diagram"
                style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>
          )}

          {/* Options Grid */}
          <div style={{ display: 'grid', gap: '12px', marginBottom: '28px' }}>
            {shuffledAnswers.map((opt, idx) => {
              const isSelected = selectedOption === opt.text;
              const isCorrectOpt = opt.is_true === 'yes' || opt.is_true === true;

              let btnBg = 'rgba(255, 255, 255, 0.04)';
              let btnBorder = '1px solid rgba(255, 255, 255, 0.1)';
              let btnColor = '#e2e8f0';

              if (isAnswered) {
                if (isCorrectOpt) {
                  btnBg = 'rgba(16, 185, 129, 0.15)';
                  btnBorder = '2px solid #10b981';
                  btnColor = '#34d399';
                } else if (isSelected) {
                  btnBg = 'rgba(239, 68, 68, 0.15)';
                  btnBorder = '2px solid #ef4444';
                  btnColor = '#fca5a5';
                }
              } else if (isSelected) {
                btnBg = 'rgba(249, 115, 22, 0.2)';
                btnBorder = '1px solid #f97316';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(opt)}
                  disabled={isAnswered}
                  style={{
                    background: btnBg,
                    border: btnBorder,
                    color: btnColor,
                    padding: '16px 20px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    textAlign: 'left',
                    cursor: isAnswered ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  <span style={{ flex: 1, paddingRight: '12px' }}>{opt.text}</span>
                  {isAnswered && isCorrectOpt && <CheckCircle2 size={22} color="#10b981" />}
                  {isAnswered && isSelected && !isCorrectOpt && <XCircle size={22} color="#ef4444" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Rationale Drawer */}
          {isAnswered && (
            <div style={{
              background: selectedOption === currentQ?.correctAnswer ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${selectedOption === currentQ?.correctAnswer ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: selectedOption === currentQ?.correctAnswer ? '#34d399' : '#f87171'
                }}>
                  {selectedOption === currentQ?.correctAnswer ? '✓ Correct!' : '✗ Technical Explanation:'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                {currentQ?.explanation || `Correct answer: ${currentQ?.correctAnswer}`}
              </p>
            </div>
          )}

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {isAnswered && (
              <button
                onClick={handleNext}
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)'
                }}
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Drill'}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Celebration Screen */
        <div style={{
          background: 'var(--bg-panel, #1e293b)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316 0%, #e11d48 100%)',
            margin: '0 auto 20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(249, 115, 22, 0.5)'
          }}>
            <Trophy size={42} color="#fff" />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff' }}>
            Daily 5 Drill Complete!
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', margin: '0 0 30px 0' }}>
            Your memory retention database has been updated.
          </p>

          {/* Score & Streak Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '36px'
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Score</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#38bdf8', marginTop: '4px' }}>
                {score} <span style={{ fontSize: '1.2rem', color: '#64748b' }}>/ 5</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Current Streak</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f97316', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Flame size={32} />
                {streakData.streak}
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Accuracy</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', marginTop: '4px' }}>
                {Math.round((score / 5) * 100)}%
              </div>
            </div>
          </div>

          {/* Drill Recap List */}
          <div style={{ textAlign: 'left', marginBottom: '36px' }}>
            <h4 style={{ fontSize: '1rem', color: '#e2e8f0', marginBottom: '14px', fontWeight: 700 }}>
              Question Breakdown
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {answersLog.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    background: log.isCorrect ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                    border: `1px solid ${log.isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                    borderRadius: '10px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <div style={{ marginTop: '2px' }}>
                    {log.isCorrect ? <CheckCircle2 size={18} color="#10b981" /> : <XCircle size={18} color="#ef4444" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>
                      {log.question}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {log.isCorrect ? (
                        <span style={{ color: '#34d399' }}>Answered: {log.userAnswer}</span>
                      ) : (
                        <span>
                          Your answer: <span style={{ color: '#f87171' }}>{log.userAnswer}</span> • Correct: <span style={{ color: '#34d399' }}>{log.correctAnswer}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button
              onClick={handleRestart}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={18} /> Practice Another 5
            </button>
            <button
              onClick={onExit}
              style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                color: '#fff',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
              }}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
