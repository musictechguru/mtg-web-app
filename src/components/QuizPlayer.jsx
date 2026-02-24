
import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import SignalChainQuiz from './InteractiveQuizzes/SignalChainQuiz';
import AudioComparisonQuiz from './InteractiveQuizzes/AudioComparisonQuiz';
import ParameterMatchingQuiz from './InteractiveQuizzes/ParameterMatchingQuiz';
import WaveformQuiz from './InteractiveQuizzes/WaveformQuiz';
import HotspotQuiz from './InteractiveQuizzes/HotspotQuiz';
import BinaryDiagramQuiz from './InteractiveQuizzes/BinaryDiagramQuiz';
import GraphDrawingQuiz from './InteractiveQuizzes/GraphDrawingQuiz';
import PianoRollQuiz from './InteractiveQuizzes/PianoRollQuiz';

const QuizPlayer = ({ quiz, onFinish }) => {
    // FORCE CACHE BUST: V3
    console.log("QuizPlayer Component Loaded - Version 3.0 Fixed");
    // State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState({});
    const [quizFinished, setQuizFinished] = useState(false);
    const [activeQuestions, setActiveQuestions] = useState([]);

    const userContext = useUser();
    const saveQuizResult = userContext ? userContext.saveQuizResult : null;

    // Reset state and randomize questions when quiz changes
    useEffect(() => {
        if (quiz && Array.isArray(quiz.questions)) {
            let questions = [];
            try {
                questions = [...quiz.questions]; // Safe copy

                // Check if randomization is disabled for this quiz
                if (quiz.randomise === false) {
                    // Use questions as-is, no shuffle, no slice (unless clearly too large?)
                    // Still limiting to 20? The user said "group the plugins", presumably they want ALL of them.
                    // But the original code sliced to 20. If we have 22, and don't slice, we show 22.
                    // Let's assume we show all if not randomized.
                } else {
                    // Standard Randomization Logic
                    // If we have a pool larger than 20, shuffle and pick 20
                    if (questions.length > 20) {
                        for (let i = questions.length - 1; i > 0; i--) {
                            // Fisher-Yates shuffle
                            const j = Math.floor(Math.random() * (i + 1));
                            [questions[i], questions[j]] = [questions[j], questions[i]];
                        }
                        questions = questions.slice(0, 20);
                    }

                    // NOW SHUFFLE ANSWERS for each selected question
                    // We need to map over questions and shuffle their answers array
                    questions = questions.map(q => {
                        if (!q.answers || q.answers.length < 2) return q;

                        // Create a copy of answers
                        const shuffledAnswers = [...q.answers];

                        // Fisher-Yates shuffle answers
                        for (let i = shuffledAnswers.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
                        }

                        // Return new question object with shuffled answers
                        return { ...q, answers: shuffledAnswers };
                    });
                }

            } catch (error) {
                console.error("Shuffle failed:", error);
                questions = quiz.questions?.slice(0, 20) || [];
            }
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveQuestions(questions);
        } else {
            console.error("Quiz questions invalid:", quiz);
            setActiveQuestions([]);
        }
        setCurrentQuestionIndex(0);
        setUserResponses({});
        setQuizFinished(false);
    }, [quiz]);

    // Calculate score derived from all responses (needed for effect)
    const totalQuestions = activeQuestions.length;
    const score = Object.values(userResponses).filter(r => r.submitted && r.isCorrect).length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    let grade = 'U';
    let expl = 'Keep practicing.';
    let color = 'var(--accent-error)';

    if (percentage >= 80) {
        grade = 'A';
        expl = 'Excellent! You have a solid grasp of the foundation and advanced concepts.';
        color = 'var(--accent-success)';
    } else if (percentage >= 70) {
        grade = 'B';
        expl = 'Great work! You are secure in most areas but review the weaker topics.';
        color = '#a3e635';
    } else if (percentage >= 60) {
        grade = 'C';
        expl = 'Good effort. You know the basics well, but deeper technical understanding is needed.';
        color = '#facc15';
    } else if (percentage >= 50) {
        grade = 'D';
        expl = 'Passable, but significant gaps in your knowledge. Review Part 1 (Foundation).';
        color = '#fb923c';
    }

    // Save result logic with Ref to prevent double-save
    const resultsSavedRef = React.useRef(false);

    useEffect(() => {
        if (quizFinished && saveQuizResult && !resultsSavedRef.current) {
            resultsSavedRef.current = true;
            saveQuizResult(quiz.title, score, totalQuestions, grade);
        }
    }, [quizFinished, quiz, score, totalQuestions, grade, saveQuizResult]);

    // Cleanup ref when quiz changes
    useEffect(() => {
        resultsSavedRef.current = false;
    }, [quiz]);

    // Handle external quiz files (like advanced-mic-placement-quiz.jsx)
    if (quiz?.quizFile) {
        return (
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-primary)'
            }}>
                <div style={{
                    padding: '20px',
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>{quiz.title}</h2>
                        <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {quiz.description}
                        </p>
                    </div>
                    <button
                        onClick={onFinish}
                        style={{
                            padding: '10px 20px',
                            background: 'var(--accent-blue)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Back to Dashboard
                    </button>
                </div>
                <iframe
                    src={`/${quiz.quizFile}`}
                    style={{
                        flex: 1,
                        width: '100%',
                        border: 'none',
                        background: 'white'
                    }}
                    title={quiz.title}
                />
            </div>
        );
    }

    // Safety checks / Logic
    if (!userContext) {
        return <div style={{ padding: 20, color: 'red' }}>Error: UserContext missing. Please refresh.</div>;
    }

    if (!quiz || !Array.isArray(quiz.questions) || activeQuestions.length === 0) {
        return (
            <div className="quiz-container">
                <h1>{quiz?.title || 'Loading...'}</h1>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                    {quiz?.questions ? <p>Loading questions...</p> : <p>Error: No questions found.</p>}
                </div>
            </div>
        );
    }

    // Check index bounds
    const currentQuestion = activeQuestions[currentQuestionIndex];
    if (!currentQuestion) {
        // Only show error if we are NOT finished
        if (!quizFinished) {
            return (
                <div className="quiz-container">
                    <h1>{quiz.title}</h1>
                    <div style={{ background: 'rgba(255,0,0,0.1)', padding: '20px', borderRadius: '10px', marginTop: '20px', color: 'red' }}>
                        <p>Error: Unable to load question {currentQuestionIndex + 1}.</p>
                        <button onClick={onFinish} style={{ marginTop: 10, padding: '5px 10px' }}>Return</button>
                    </div>
                </div>
            );
        }
    }

    // Derived state for current question
    const currentResponse = userResponses[currentQuestionIndex] || { selected: null, submitted: false, isCorrect: false };
    const selectedAnswer = currentResponse.selected;
    const isSubmitted = currentResponse.submitted;


    const handleOptionClick = (idx) => {
        if (isSubmitted) return;
        setUserResponses(prev => ({
            ...prev,
            [currentQuestionIndex]: { selected: idx, submitted: false, isCorrect: false }
        }));
    };

    const handleClozeChange = (blankId, value) => {
        if (isSubmitted) return;
        setUserResponses(prev => {
            const currentObj = prev[currentQuestionIndex]?.selected || {};
            return {
                ...prev,
                [currentQuestionIndex]: {
                    selected: { ...currentObj, [blankId]: value },
                    submitted: false,
                    isCorrect: false
                }
            };
        });
    };

    const handleSubmit = () => {
        if (!currentQuestion) return;

        let isCorrect = false;
        if (currentQuestion.type === 'cloze') {
            if (currentQuestion.answer && typeof selectedAnswer === 'object' && selectedAnswer !== null) {
                isCorrect = true;
                for (let i = 0; i < currentQuestion.answer.length; i++) {
                    if (selectedAnswer[i] !== currentQuestion.answer[i]) {
                        isCorrect = false;
                        break;
                    }
                }
                if (Object.keys(selectedAnswer).length !== currentQuestion.answer.length) {
                    isCorrect = false;
                }
            }
        } else {
            if (!currentQuestion.answers) return;
            isCorrect = currentQuestion.answers[selectedAnswer]?.is_true === 'yes';
        }

        setUserResponses(prev => ({
            ...prev,
            [currentQuestionIndex]: { selected: selectedAnswer, submitted: true, isCorrect }
        }));

        // Mobile: Scroll to explanation
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                const explanationEl = document.querySelector('.quiz-right-col');
                if (explanationEl) {
                    explanationEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    };

    const handleInteractiveResult = (isCorrect) => {
        setUserResponses(prev => ({
            ...prev,
            [currentQuestionIndex]: { selected: 'interactive', submitted: true, isCorrect }
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex + 1 < totalQuestions) {
            setCurrentQuestionIndex(p => p + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(p => p - 1);
        }
    };


    if (quizFinished) {
        return (
            <div className="quiz-container results-screen">
                <div className="score-circle" style={{ borderColor: color, color: color }}>
                    {grade}
                </div>
                <h2 style={{ fontSize: '2rem' }}>{percentage}%</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    You scored {score} out of {totalQuestions}.
                </p>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>{expl}</p>
                </div>
                <button
                    className="btn-primary"
                    onClick={onFinish}
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-player-layout">
            {/* Left: Question Card */}
            <div className="quiz-left-col">
                <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {quiz.title} • Question {currentQuestionIndex + 1} of {totalQuestions}
                </div>

                <div className="question-card">
                    {currentQuestion._sourceTopic && (
                        <div style={{
                            marginBottom: '10px',
                            fontSize: '0.85rem',
                            color: 'var(--accent-blue)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {currentQuestion._sourceTopic}
                            {currentQuestion._sourceLevel && <span style={{ color: 'var(--text-secondary)' }}> • {currentQuestion._sourceLevel}</span>}
                        </div>
                    )}
                    <div className="question-header">
                        <span>{currentQuestion.title}</span>
                    </div>

                    {quiz.youtube_id_2 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }} className="comparison-video-grid">
                            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                <div style={{ background: '#333', color: '#fff', padding: '5px 10px', fontSize: '0.8rem', fontWeight: 'bold' }}>{quiz.video_title_1 || "Version A"}</div>
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={`https://www.youtube.com/embed/${quiz.youtube_id}`}
                                    title={quiz.video_title_1 || "Version A"}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                <div style={{ background: '#333', color: '#fff', padding: '5px 10px', fontSize: '0.8rem', fontWeight: 'bold' }}>{quiz.video_title_2 || "Version B"}</div>
                                <iframe
                                    width="100%"
                                    height="200"
                                    src={`https://www.youtube.com/embed/${quiz.youtube_id_2}`}
                                    title="Version B"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ) : quiz.youtube_id && (
                        <div style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                            <iframe
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${quiz.youtube_id}`}
                                title={quiz.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    <div className="question-text">
                        {currentQuestion.content}
                    </div>

                    <div className="options-grid">
                        {currentQuestion.type === 'drag_drop' ? (
                            <SignalChainQuiz
                                key={currentQuestionIndex}
                                items={currentQuestion.items}
                                correctOrder={currentQuestion.correct_order}
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'audio_comparison' ? (
                            <AudioComparisonQuiz
                                key={currentQuestionIndex}
                                audioSrcA={currentQuestion.audio_a}
                                audioSrcB={currentQuestion.audio_b}
                                options={currentQuestion.options}
                                correctAnswerIndex={currentQuestion.correct_index}
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'piano-roll' ? (
                            <PianoRollQuiz
                                key={currentQuestionIndex}
                                question={currentQuestion}
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'parameter_matching' ? (
                            <ParameterMatchingQuiz
                                key={currentQuestionIndex}
                                label={currentQuestion.label}
                                min={currentQuestion.min}
                                max={currentQuestion.max}
                                step={currentQuestion.step}
                                unit={currentQuestion.unit}
                                correctValue={currentQuestion.correct_value}
                                tolerance={currentQuestion.tolerance}
                                audioBeforeSrc={currentQuestion.audio_before}
                                audioAfterSrc={currentQuestion.audio_after}
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'waveform_id' ? (
                            <WaveformQuiz
                                key={currentQuestionIndex}
                                audioSrc={currentQuestion.audio_src}
                                options={currentQuestion.options}
                                correctOption={currentQuestion.correct_option}
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'hotspot' ? (
                            <HotspotQuiz
                                key={currentQuestionIndex}
                                imageSrc={currentQuestion.image_src}
                                hotspots={currentQuestion.hotspots}
                                questionText={currentQuestion.question_text} // passed from content usually, but optional prop
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'cloze' ? (
                            <div key={currentQuestionIndex + "-cloze"} className="cloze-quiz-container" style={{ lineHeight: '2.5', fontSize: '1.1rem', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '8px' }}>
                                {Array.isArray(currentQuestion.text) ? (
                                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                        {currentQuestion.text.map((line, lineIdx) => (
                                            <li key={lineIdx} style={{ marginBottom: '15px' }}>
                                                {line.split(/\{(\d+)\}/g).map((fragment, idx) => {
                                                    if (idx % 2 === 0) return <span key={idx}>{fragment}</span>;
                                                    const blankId = parseInt(fragment);
                                                    const currentBlanks = selectedAnswer || {};

                                                    let selectStyle = { margin: '0 5px', padding: '5px', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', appearance: 'auto', minWidth: '150px' };
                                                    if (isSubmitted) {
                                                        if (currentBlanks[blankId] === currentQuestion.answer[blankId]) {
                                                            selectStyle.border = '2px solid var(--accent-success)';
                                                            selectStyle.background = 'rgba(34, 197, 94, 0.1)';
                                                        } else {
                                                            selectStyle.border = '2px solid var(--accent-error)';
                                                            selectStyle.background = 'rgba(239, 68, 68, 0.1)';
                                                        }
                                                    }

                                                    return (
                                                        <select
                                                            key={idx}
                                                            style={selectStyle}
                                                            value={currentBlanks[blankId] || ''}
                                                            onChange={(e) => handleClozeChange(blankId, e.target.value)}
                                                            disabled={isSubmitted}
                                                        >
                                                            <option value="">...</option>
                                                            {currentQuestion.options[blankId] && currentQuestion.options[blankId].map((opt, oIdx) => <option key={oIdx} value={opt}>{opt}</option>)}
                                                        </select>
                                                    );
                                                })}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div style={{ marginBottom: '15px' }}>
                                        {currentQuestion.text.split(/\{(\d+)\}/g).map((fragment, idx) => {
                                            if (idx % 2 === 0) return <span key={idx}>{fragment}</span>;
                                            const blankId = parseInt(fragment);
                                            const currentBlanks = selectedAnswer || {};

                                            let selectStyle = { margin: '0 5px', padding: '5px', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', appearance: 'auto', minWidth: '150px' };
                                            if (isSubmitted) {
                                                if (currentBlanks[blankId] === currentQuestion.answer[blankId]) {
                                                    selectStyle.border = '2px solid var(--accent-success)';
                                                    selectStyle.background = 'rgba(34, 197, 94, 0.1)';
                                                } else {
                                                    selectStyle.border = '2px solid var(--accent-error)';
                                                    selectStyle.background = 'rgba(239, 68, 68, 0.1)';
                                                }
                                            }

                                            return (
                                                <select
                                                    key={idx}
                                                    style={selectStyle}
                                                    value={currentBlanks[blankId] || ''}
                                                    onChange={(e) => handleClozeChange(blankId, e.target.value)}
                                                    disabled={isSubmitted}
                                                >
                                                    <option value="">...</option>
                                                    {currentQuestion.options[blankId] && currentQuestion.options[blankId].map((opt, oIdx) => <option key={oIdx} value={opt}>{opt}</option>)}
                                                </select>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ) : currentQuestion.type === 'binary-diagram' ? (
                            <BinaryDiagramQuiz
                                key={currentQuestionIndex}
                                targetNumber={currentQuestion.targetNumber}
                                hint={currentQuestion.hint}
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'graph-drawing' ? (
                            <GraphDrawingQuiz
                                key={currentQuestionIndex}
                                question={currentQuestion.question}
                                targetPoints={currentQuestion.targetPoints}
                                hint={currentQuestion.hint}
                                onResult={handleInteractiveResult}
                            />
                        ) : (
                            currentQuestion.answers && currentQuestion.answers.map((ans, idx) => {
                                let className = "option-btn";
                                if (selectedAnswer === idx) className += " selected";
                                if (isSubmitted) {
                                    if (ans.is_true === 'yes') className += " correct";
                                    else if (selectedAnswer === idx) className += " incorrect";
                                }

                                return (
                                    <button
                                        key={idx}
                                        className={className}
                                        onClick={() => handleOptionClick(idx)}
                                        disabled={isSubmitted}
                                    >
                                        {ans.text}
                                    </button>
                                );
                            })
                        )}
                    </div>

                    <div className="controls" style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className="btn-secondary"
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                background: 'transparent',
                                color: 'var(--text-primary)',
                                cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                                opacity: currentQuestionIndex === 0 ? 0.5 : 1,
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}
                        >
                            Previous
                        </button>

                        {!isSubmitted ? (
                            currentQuestion.type !== 'drag_drop' && currentQuestion.type !== 'audio_comparison' && currentQuestion.type !== 'parameter_matching' && currentQuestion.type !== 'binary-diagram' && currentQuestion.type !== 'graph-drawing' && currentQuestion.type !== 'piano-roll' && (
                                <button
                                    className="btn-primary"
                                    onClick={handleSubmit}
                                    disabled={currentQuestion.type === 'cloze' ? (!selectedAnswer || Object.keys(selectedAnswer).length < (currentQuestion.answer?.length || 0)) : selectedAnswer === null}
                                    style={{ flex: 1, opacity: (currentQuestion.type === 'cloze' ? (!selectedAnswer || Object.keys(selectedAnswer).length < (currentQuestion.answer?.length || 0)) : selectedAnswer === null) ? 0.5 : 1 }}
                                >
                                    Submit Answer
                                </button>
                            )
                        ) : (
                            <button className="btn-primary" onClick={handleNext} style={{ flex: 1 }}>
                                {currentQuestionIndex + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Explanation Panel */}
            <div className={`quiz-right-col ${isSubmitted ? 'visible' : ''}`}>
                <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--accent-purple)' }}>
                    Expert Explanation
                </h3>

                {isSubmitted ? (
                    currentQuestion.expert_explanation ? (
                        <div key={`expl-new-${currentQuestion.id || currentQuestionIndex}`} className="expert-explanation-container">

                            {/* 2. Image (Moved Above Text based on user feedback) */}
                            {(currentQuestion.explanation_image || currentQuestion.img) && (
                                <div className="expert-image" style={{ marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <img
                                        src={currentQuestion.explanation_image?.src || currentQuestion.img}
                                        alt={currentQuestion.explanation_image?.alt || 'Explanation Diagram'}
                                        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', display: 'block', background: '#fff' }}
                                    />
                                </div>
                            )}

                            {/* 1. Main Text */}
                            <div className="expert-text" style={{ marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                                {currentQuestion.expert_explanation}
                            </div>


                            {/* 3. Quote */}
                            {currentQuestion.expert_quote && (
                                <blockquote className="expert-quote" style={{
                                    borderLeft: '4px solid var(--accent-gold)',
                                    background: 'rgba(255, 215, 0, 0.05)',
                                    margin: '0',
                                    padding: '15px 20px',
                                    fontStyle: 'italic',
                                    borderRadius: '0 8px 8px 0'
                                }}>
                                    {typeof currentQuestion.expert_quote === 'string' ? (
                                        <p style={{ margin: '0', fontSize: '1.1rem', color: '#ffd700' }}>
                                            {currentQuestion.expert_quote}
                                        </p>
                                    ) : (
                                        <>
                                            <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#ffd700' }}>
                                                "{currentQuestion.expert_quote.text}"
                                            </p>
                                            <footer style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'normal' }}>
                                                — {currentQuestion.expert_quote.author}
                                            </footer>
                                        </>
                                    )}
                                </blockquote>
                            )}

                            {/* Fallback for mixed content that might still exist in legacy string */}
                            {!currentQuestion.expert_explanation && currentQuestion.explanation && (
                                <div
                                    className="explanation-content legacy-fallback"
                                    dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                                />
                            )}
                        </div>
                    ) : currentQuestion.explanation ? (
                        <div
                            key={`expl-${currentQuestion.id || currentQuestionIndex}-${isSubmitted}`}
                            className="explanation-content"
                        >
                            <div dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }} />

                            {/* Quote for Legacy Questions */}
                            {currentQuestion.expert_quote && (
                                <blockquote className="expert-quote" style={{
                                    borderLeft: '4px solid var(--accent-gold)',
                                    background: 'rgba(255, 215, 0, 0.05)',
                                    margin: '20px 0 0 0',
                                    padding: '15px 20px',
                                    fontStyle: 'italic',
                                    borderRadius: '0 8px 8px 0'
                                }}>
                                    {typeof currentQuestion.expert_quote === 'string' ? (
                                        <p style={{ margin: '0', fontSize: '1.1rem', color: '#ffd700' }}>
                                            {currentQuestion.expert_quote}
                                        </p>
                                    ) : (
                                        <>
                                            <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#ffd700' }}>
                                                "{currentQuestion.expert_quote.text}"
                                            </p>
                                            <footer style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'normal' }}>
                                                — {currentQuestion.expert_quote.author}
                                            </footer>
                                        </>
                                    )}
                                </blockquote>
                            )}
                        </div>
                    ) : (
                        <div className="explanation-placeholder">
                            <p>No explanation provided for this question.</p>
                        </div>
                    )
                ) : (
                    <div className="explanation-placeholder">
                        <p>Submit your answer to reveal the explanation.</p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default QuizPlayer;
