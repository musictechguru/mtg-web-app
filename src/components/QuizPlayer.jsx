
import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import SignalChainQuiz from './InteractiveQuizzes/SignalChainQuiz';
import AudioComparisonQuiz from './InteractiveQuizzes/AudioComparisonQuiz';
import ParameterMatchingQuiz from './InteractiveQuizzes/ParameterMatchingQuiz';
import WaveformQuiz from './InteractiveQuizzes/WaveformQuiz';
import HotspotQuiz from './InteractiveQuizzes/HotspotQuiz';
import BinaryDiagramQuiz from './InteractiveQuizzes/BinaryDiagramQuiz';
import GraphDrawingQuiz from './InteractiveQuizzes/GraphDrawingQuiz';
import PianoRollQuiz from './InteractiveQuizzes/PianoRollQuiz';
import TimelineQuiz from './InteractiveQuizzes/TimelineQuiz';
import MidiPracticalQuiz from './InteractiveQuizzes/MidiPracticalQuiz';

const isDev = Boolean(
    import.meta.env.DEV ||
    (typeof window !== 'undefined' && (
        window.location.search.includes('dev=true') ||
        localStorage.getItem('dev_mode') === 'true'
    ))
);

const QuizPlayer = ({ quiz, onFinish }) => {
    // FORCE CACHE BUST: V3
    console.log("QuizPlayer Component Loaded - Version 3.0 Fixed");
    // State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState({});
    const [quizFinished, setQuizFinished] = useState(false);
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [expandedImage, setExpandedImage] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const hasDraggedRef = useRef(false);

    const openExpandedImage = (imgData) => {
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
        setIsDragging(false);
        setExpandedImage(imgData);
    };

    const closeExpandedImage = () => {
        setExpandedImage(null);
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
        setIsDragging(false);
    };

    const handleZoomIn = (e) => {
        if (e) e.stopPropagation();
        setZoomLevel(prev => Math.min(Number((prev + 0.5).toFixed(1)), 4));
    };

    const handleZoomOut = (e) => {
        if (e) e.stopPropagation();
        setZoomLevel(prev => {
            const next = Math.max(Number((prev - 0.5).toFixed(1)), 1);
            if (next === 1) setPanOffset({ x: 0, y: 0 });
            return next;
        });
    };

    const handleResetZoom = (e) => {
        if (e) e.stopPropagation();
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            setZoomLevel(prev => Math.min(Number((prev + 0.25).toFixed(2)), 4));
        } else {
            setZoomLevel(prev => {
                const next = Math.max(Number((prev - 0.25).toFixed(2)), 1);
                if (next === 1) setPanOffset({ x: 0, y: 0 });
                return next;
            });
        }
    };

    const handleMouseDown = (e) => {
        if (zoomLevel <= 1) return;
        setIsDragging(true);
        hasDraggedRef.current = false;
        setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - (dragStart.x + panOffset.x);
        const dy = e.clientY - (dragStart.y + panOffset.y);
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasDraggedRef.current = true;
        }
        setPanOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        if (zoomLevel <= 1 || e.touches.length !== 1) return;
        setIsDragging(true);
        hasDraggedRef.current = false;
        const touch = e.touches[0];
        setDragStart({ x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y });
    };

    const handleTouchMove = (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        const touch = e.touches[0];
        hasDraggedRef.current = true;
        setPanOffset({
            x: touch.clientX - dragStart.x,
            y: touch.clientY - dragStart.y
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleImageContainerClick = (e) => {
        e.stopPropagation();
        if (hasDraggedRef.current) return;
        if (zoomLevel === 1) {
            setZoomLevel(2);
        } else {
            setZoomLevel(1);
            setPanOffset({ x: 0, y: 0 });
        }
    };

    const [devRawOrder, setDevRawOrder] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('mtg_dev_raw_order') === 'true';
        }
        return false;
    });

    // Close expanded image modal on Escape key and prevent background scroll
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeExpandedImage();
            }
        };

        if (expandedImage) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [expandedImage]);

    const quizStorageKey = quiz ? (quiz.id || quiz.title || 'current_quiz') : 'current_quiz';
    const isTopicMastery = Boolean(
        (quiz && quiz.id && quiz.id.startsWith('quiz-topic-')) ||
        (quiz && quiz.title && quiz.title.toLowerCase().includes('topic '))
    );
    const isPart2 = Boolean(
        quiz && (
            (quiz.title && quiz.title.includes('(Part 2)')) ||
            (quiz.id && quiz.id.endsWith('_p2'))
        )
    );

    const userContext = useUser();
    const saveQuizResult = userContext ? userContext.saveQuizResult : null;
    const completeCampaignNode = userContext ? userContext.completeCampaignNode : null;

    // Reset state and randomize questions when quiz changes
    useEffect(() => {
        if (quiz && Array.isArray(quiz.questions)) {
            let questions = [];
            try {
                questions = [...quiz.questions]; // Safe copy

                const skipRandomise = quiz.randomise === false || isTopicMastery || (isDev && devRawOrder);

                // Check if randomization is disabled for this quiz or overridden by dev
                if (skipRandomise) {
                    // Use questions as-is, no shuffle, no slice
                    questions = questions.map(q => {
                        if (q.type === 'binary-diagram') {
                            const newTarget = Math.floor(Math.random() * 128);
                            const positions = [64, 32, 16, 8, 4, 2, 1];
                            let remainder = newTarget;
                            let powers = [];
                            let binaryStr = "";
                            for (let p of positions) {
                                if (remainder >= p) {
                                    powers.push(p);
                                    remainder -= p;
                                    binaryStr += "1";
                                } else {
                                    binaryStr += "0";
                                }
                            }

                            let hintText = `You need to add up to ${newTarget}. Which boxes should have a 1?`;
                            if (powers.length > 0) {
                                hintText += ` (Hint: ${powers.join(" + ")} = ${newTarget})`;
                            } else {
                                hintText = `Zero means no boxes are clicked. Leave them all at 0!`;
                            }

                            let explanationText = `To make ${newTarget}, you need the boxes: ${powers.join(" + ")} = ${newTarget}. In binary, this is ${binaryStr}.`;
                            if (newTarget === 0) {
                                explanationText = `To make 0, you don't click any boxes! All bits are 0. In binary, this is 0000000.`;
                            }

                            return {
                                ...q,
                                title: `Make ${newTarget} in Binary`,
                                content: `Click the boxes to make the number ${newTarget} in binary`,
                                targetNumber: newTarget,
                                hint: hintText,
                                explanation: explanationText
                            };
                        }

                        // Unless dev explicitly requests raw order, shuffle answer options
                        if (!(isDev && devRawOrder)) {
                            if (!q.answers || q.answers.length < 2) return q;

                            const shuffledAnswers = [...q.answers];
                            for (let i = shuffledAnswers.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
                            }
                            return { ...q, answers: shuffledAnswers };
                        }

                        return q;
                    });
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
                        if (q.type === 'binary-diagram') {
                            const newTarget = Math.floor(Math.random() * 128); // 0 to 127

                            const positions = [64, 32, 16, 8, 4, 2, 1];
                            let remainder = newTarget;
                            let powers = [];
                            let binaryStr = "";
                            for (let p of positions) {
                                if (remainder >= p) {
                                    powers.push(p);
                                    remainder -= p;
                                    binaryStr += "1";
                                } else {
                                    binaryStr += "0";
                                }
                            }

                            let hintText = `You need to add up to ${newTarget}. Which boxes should have a 1?`;
                            if (powers.length > 0) {
                                hintText += ` (Hint: ${powers.join(" + ")} = ${newTarget})`;
                            } else {
                                hintText = `Zero means no boxes are clicked. Leave them all at 0!`;
                            }

                            let explanationText = `To make ${newTarget}, you need the boxes: ${powers.join(" + ")} = ${newTarget}. In binary, this is ${binaryStr}.`;
                            if (newTarget === 0) {
                                explanationText = `To make 0, you don't click any boxes! All bits are 0. In binary, this is 0000000.`;
                            }

                            return {
                                ...q,
                                title: `Make ${newTarget} in Binary`,
                                content: `Click the boxes to make the number ${newTarget} in binary`,
                                targetNumber: newTarget,
                                hint: hintText,
                                explanation: explanationText
                            };
                        }

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

            // In Dev mode: restore saved question index from URL param or sessionStorage
            let initialIdx = 0;
            if (isDev && typeof window !== 'undefined') {
                const urlParam = new URLSearchParams(window.location.search).get('q');
                const storedIdx = sessionStorage.getItem(`dev_q_${quizStorageKey}`);
                if (urlParam) {
                    let parsed = parseInt(urlParam, 10) - 1;
                    if (isPart2 && parsed >= 10) {
                        parsed -= 10;
                    }
                    if (!isNaN(parsed) && parsed >= 0 && parsed < questions.length) {
                        initialIdx = parsed;
                    }
                } else if (storedIdx !== null) {
                    const parsed = parseInt(storedIdx, 10);
                    if (!isNaN(parsed) && parsed >= 0 && parsed < questions.length) {
                        initialIdx = parsed;
                    }
                }
            }
            setCurrentQuestionIndex(initialIdx);
        } else {
            console.error("Quiz questions invalid:", quiz);
            setActiveQuestions([]);
            setCurrentQuestionIndex(0);
        }
        setUserResponses({});
        setQuizFinished(false);
    }, [quiz, devRawOrder]);

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

            // Advance campaign map if >60%
            if (quiz.campaignNodeId && completeCampaignNode) {
                if (percentage >= 60) {
                    completeCampaignNode(quiz.campaignNodeId);
                }
            }
        }
    }, [quizFinished, quiz, score, totalQuestions, grade, saveQuizResult, completeCampaignNode, percentage]);

    // Cleanup ref when quiz changes
    useEffect(() => {
        resultsSavedRef.current = false;
    }, [quiz]);

    const currentQuestion = activeQuestions[currentQuestionIndex];

    const handleExit = () => {
        if (isDev && typeof window !== 'undefined') {
            sessionStorage.removeItem(`dev_q_${quizStorageKey}`);
            const url = new URL(window.location.href);
            url.searchParams.delete('q');
            window.history.replaceState({}, '', url.toString());
        }
        onFinish();
    };

    const goToQuestion = (index) => {
        if (index >= 0 && index < totalQuestions) {
            setQuizFinished(false);
            setCurrentQuestionIndex(index);
        }
    };

    const toggleDevRawOrder = () => {
        const nextVal = !devRawOrder;
        setDevRawOrder(nextVal);
        if (typeof window !== 'undefined') {
            localStorage.setItem('mtg_dev_raw_order', nextVal.toString());
        }
    };

    // Dev mode: automatically persist current question to sessionStorage and URL
    useEffect(() => {
        if (isDev && typeof window !== 'undefined' && totalQuestions > 0) {
            sessionStorage.setItem(`dev_q_${quizStorageKey}`, currentQuestionIndex.toString());
            const url = new URL(window.location.href);
            url.searchParams.set('q', (isPart2 ? currentQuestionIndex + 11 : currentQuestionIndex + 1).toString());
            window.history.replaceState({}, '', url.toString());
        }
    }, [currentQuestionIndex, totalQuestions, quizStorageKey, isPart2]);

    // Dev reveal answer & explanation
    const handleDevReveal = () => {
        if (!currentQuestion) return;
        let correctIdx = null;
        if (Array.isArray(currentQuestion.answers)) {
            correctIdx = currentQuestion.answers.findIndex(a => a.is_true === 'yes' || a.is_true === true);
            if (correctIdx === -1) correctIdx = 0;
        }
        setUserResponses(prev => ({
            ...prev,
            [currentQuestionIndex]: {
                selected: correctIdx !== null ? correctIdx : 'dev_revealed',
                submitted: true,
                isCorrect: true
            }
        }));
    };

    // Dev reset current question response
    const handleDevResetQuestion = () => {
        setUserResponses(prev => {
            const next = { ...prev };
            delete next[currentQuestionIndex];
            return next;
        });
    };

    // Dev mode: Alt+Left / Alt+Right for skipping, Alt+R for reveal
    useEffect(() => {
        if (!isDev) return;
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return;
            if (e.altKey && e.key === 'ArrowRight') {
                e.preventDefault();
                goToQuestion(Math.min(totalQuestions - 1, currentQuestionIndex + 1));
            } else if (e.altKey && e.key === 'ArrowLeft') {
                e.preventDefault();
                goToQuestion(Math.max(0, currentQuestionIndex - 1));
            } else if (e.altKey && (e.key === 'r' || e.key === 'R')) {
                e.preventDefault();
                handleDevReveal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [totalQuestions, currentQuestionIndex, currentQuestion]);

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
                        onClick={handleExit}
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
    if (!currentQuestion) {
        // Only show error if we are NOT finished
        if (!quizFinished) {
            return (
                <div className="quiz-container">
                    <h1>{quiz.title}</h1>
                    <div style={{ background: 'rgba(255,0,0,0.1)', padding: '20px', borderRadius: '10px', marginTop: '20px', color: 'red' }}>
                        <p>Error: Unable to load question {currentQuestionIndex + 1}.</p>
                        <button onClick={handleExit} style={{ marginTop: 10, padding: '5px 10px' }}>Return</button>
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
            isCorrect = currentQuestion.answers[selectedAnswer]?.is_true === 'yes' || currentQuestion.answers[selectedAnswer]?.is_true === true;
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
            goToQuestion(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            goToQuestion(currentQuestionIndex - 1);
        }
    };

    const getQuestionLabel = (q, idx) => {
        const qNum = isPart2 ? idx + 11 : idx + 1;
        if (!q) return `Q${qNum}`;

        const stripHtml = (html) => {
            if (typeof html !== 'string') return '';
            return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        };

        const contentSnippet = stripHtml(q.content || q.question || q.prompt || '');
        const titleSnippet = stripHtml(q.title || '');

        // Check if title is generic like "Question 1", "Question 2", "Q1", etc.
        const isGenericTitle = !titleSnippet || /^Q(uestion)?\s*\d+$/i.test(titleSnippet);

        let displaySnippet = '';
        if (!isGenericTitle) {
            displaySnippet = titleSnippet;
            if (displaySnippet.length < 25 && contentSnippet && !contentSnippet.toLowerCase().includes(displaySnippet.toLowerCase())) {
                displaySnippet += ` - ${contentSnippet}`;
            }
        } else if (contentSnippet) {
            displaySnippet = contentSnippet;
        } else {
            displaySnippet = q.id || `Question ${qNum}`;
        }

        let typeTag = '';
        if (q.type && q.type !== 'multi_choice' && q.type !== 'multiple_choice' && q.type !== 'standard') {
            const typeMap = {
                'binary-diagram': 'Binary',
                'drag_drop': 'Drag&Drop',
                'audio_comparison': 'Audio',
                'parameter_matching': 'Match',
                'waveform': 'Waveform',
                'hotspot': 'Hotspot',
                'graph-drawing': 'Graph',
                'piano-roll': 'PianoRoll',
                'timeline': 'Timeline',
                'midi_practical': 'MIDI',
                'cloze': 'Cloze'
            };
            const tag = typeMap[q.type] || q.type;
            typeTag = `[${tag}] `;
        }

        const topicTag = q._sourceTopic ? `(${q._sourceTopic}) ` : '';

        const fullText = `${typeTag}${topicTag}${displaySnippet}`;
        const truncated = fullText.length > 60 ? fullText.substring(0, 57) + '...' : fullText;

        return `Q${qNum}: ${truncated}`;
    };

    const getQuestionFullText = (q, idx) => {
        const qNum = isPart2 ? idx + 11 : idx + 1;
        if (!q) return `Question ${qNum}`;
        const stripHtml = (html) => typeof html === 'string' ? html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
        const text = stripHtml(q.content || q.question || q.prompt || q.title || '');
        return `Q${qNum}${q.id ? ` (${q.id})` : ''}: ${text}`;
    };

    const renderDevBar = () => {
        if (!isDev || totalQuestions === 0) return null;

        return (
            <div
                className="quiz-dev-bar"
                style={{
                    background: 'linear-gradient(135deg, #181824 0%, #222235 100%)',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    marginBottom: '16px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                    color: '#f8fafc'
                }}
            >
                {/* Dev Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', color: '#f59e0b' }}>
                    <span>🛠️ DEV NAV</span>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        {isPart2 ? `Q${currentQuestionIndex + 11}/20` : `Q${currentQuestionIndex + 1}/${totalQuestions}`}
                    </span>
                </div>

                {/* Direct Question Dropdown with Meaningful Labels */}
                <select
                    value={currentQuestionIndex}
                    onChange={(e) => goToQuestion(parseInt(e.target.value, 10))}
                    style={{
                        flex: '1 1 280px',
                        minWidth: '220px',
                        maxWidth: '560px',
                        background: '#0f172a',
                        color: '#f8fafc',
                        border: '1px solid #475569',
                        borderRadius: '6px',
                        padding: '5px 8px',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        outline: 'none'
                    }}
                    title="Jump directly to question"
                >
                    {activeQuestions.map((q, idx) => (
                        <option key={idx} value={idx} title={getQuestionFullText(q, idx)}>
                            {getQuestionLabel(q, idx)}
                        </option>
                    ))}
                </select>

                {/* Skip buttons */}
                <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                        type="button"
                        onClick={() => goToQuestion(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                        style={{
                            background: currentQuestionIndex === 0 ? 'rgba(71, 85, 105, 0.2)' : '#334155',
                            color: currentQuestionIndex === 0 ? '#64748b' : '#fff',
                            border: '1px solid #475569',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                        }}
                        title="Dev skip to previous (Alt + Left)"
                    >
                        ◀ Prev
                    </button>
                    <button
                        type="button"
                        onClick={() => goToQuestion(Math.min(totalQuestions - 1, currentQuestionIndex + 1))}
                        disabled={currentQuestionIndex >= totalQuestions - 1}
                        style={{
                            background: currentQuestionIndex >= totalQuestions - 1 ? 'rgba(71, 85, 105, 0.2)' : '#334155',
                            color: currentQuestionIndex >= totalQuestions - 1 ? '#64748b' : '#fff',
                            border: '1px solid #475569',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: currentQuestionIndex >= totalQuestions - 1 ? 'not-allowed' : 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                        }}
                        title="Dev skip to next without answering (Alt + Right)"
                    >
                        Next ▶
                    </button>
                </div>

                {/* Reveal Answer Button */}
                <button
                    type="button"
                    onClick={handleDevReveal}
                    style={{
                        background: isSubmitted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(139, 92, 246, 0.2)',
                        color: isSubmitted ? '#34d399' : '#c084fc',
                        border: isSubmitted ? '1px solid #10b981' : '1px solid #8b5cf6',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                    }}
                    title="Instantly reveal correct answer and explanation (Alt + R)"
                >
                    {isSubmitted ? '✓ Revealed' : '👁️ Reveal'}
                </button>

                {/* Reset Question Button */}
                {isSubmitted && (
                    <button
                        type="button"
                        onClick={handleDevResetQuestion}
                        style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#f87171',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                        }}
                        title="Reset current question response"
                    >
                        ↺ Reset Q
                    </button>
                )}

                {/* Raw Order Toggle */}
                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    color: devRawOrder ? '#fbbf24' : '#94a3b8',
                    marginLeft: 'auto',
                    userSelect: 'none',
                    fontWeight: devRawOrder ? '600' : 'normal'
                }}>
                    <input
                        type="checkbox"
                        checked={devRawOrder}
                        onChange={toggleDevRawOrder}
                        style={{ cursor: 'pointer', accentColor: '#f59e0b' }}
                    />
                    <span>Raw Order (No Shuffle)</span>
                </label>
            </div>
        );
    };

    if (quizFinished) {
        return (
            <div className="quiz-container results-screen">
                {renderDevBar()}
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
                    onClick={handleExit}
                >
                    {quiz.campaignNodeId ? 'Return to Campaign Map' : 'Return to Dashboard'}
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-player-layout">
            {/* Left: Question Card */}
            <div className="quiz-left-col">
                {renderDevBar()}
                <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {quiz.title} • Question {isPart2 ? currentQuestionIndex + 11 : currentQuestionIndex + 1} of {isPart2 ? 20 : totalQuestions}
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
                                initValues={currentQuestion.initValues}
                                correctValues={currentQuestion.correctValues}
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'timeline' ? (
                            <TimelineQuiz
                                key={currentQuestionIndex}
                                question={currentQuestion}
                                onResult={handleInteractiveResult}
                            />
                        ) : currentQuestion.type === 'midi_practical' ? (
                            <MidiPracticalQuiz
                                key={currentQuestionIndex}
                                controlType={currentQuestion.control_type}
                                min={currentQuestion.min}
                                max={currentQuestion.max}
                                step={currentQuestion.step}
                                targetValue={currentQuestion.target_value}
                                tolerance={currentQuestion.tolerance}
                                targetMin={currentQuestion.target_min}
                                targetMax={currentQuestion.target_max}
                                unit={currentQuestion.unit}
                                onResult={handleInteractiveResult}
                            />
                        ) : (
                            currentQuestion.answers && currentQuestion.answers.map((ans, idx) => {
                                let className = "option-btn";
                                if (selectedAnswer === idx) className += " selected";
                                if (isSubmitted) {
                                    const isThisCorrect = ans.is_true === 'yes' || ans.is_true === true;
                                    if (isThisCorrect) className += " correct";
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
                            currentQuestion.type !== 'drag_drop' && currentQuestion.type !== 'audio_comparison' && currentQuestion.type !== 'parameter_matching' && currentQuestion.type !== 'binary-diagram' && currentQuestion.type !== 'graph-drawing' && currentQuestion.type !== 'piano-roll' && currentQuestion.type !== 'timeline' && currentQuestion.type !== 'midi_practical' && (
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
                                <div
                                    className="expert-image"
                                    style={{
                                        width: '100%',
                                        marginBottom: '20px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        cursor: 'zoom-in',
                                        position: 'relative'
                                    }}
                                    onClick={() => openExpandedImage({
                                        src: currentQuestion.explanation_image?.src || currentQuestion.img,
                                        alt: currentQuestion.explanation_image?.alt || 'Explanation Diagram'
                                    })}
                                    title="Click to expand image"
                                >
                                    <img
                                        src={currentQuestion.explanation_image?.src || currentQuestion.img}
                                        alt={currentQuestion.explanation_image?.alt || 'Explanation Diagram'}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block'
                                        }}
                                    />
                                    <div className="expert-image-expand-hint">
                                        <Maximize2 size={13} />
                                        <span>Click to expand</span>
                                    </div>
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
                                    onClick={(e) => {
                                        if (e.target && e.target.tagName === 'IMG') {
                                            openExpandedImage({
                                                src: e.target.src,
                                                alt: e.target.alt || 'Explanation Diagram'
                                            });
                                        }
                                    }}
                                    dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                                />
                            )}
                        </div>
                    ) : currentQuestion.explanation ? (
                        <div
                            key={`expl-${currentQuestion.id || currentQuestionIndex}-${isSubmitted}`}
                            className="explanation-content"
                            onClick={(e) => {
                                if (e.target && e.target.tagName === 'IMG') {
                                    openExpandedImage({
                                        src: e.target.src,
                                        alt: e.target.alt || 'Explanation Diagram'
                                    });
                                }
                            }}
                        >
                            {/* Image for Legacy Questions */}
                            {(currentQuestion.explanation_image || currentQuestion.img) && (
                                <div
                                    className="expert-image"
                                    style={{
                                        width: '100%',
                                        marginBottom: '20px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        cursor: 'zoom-in',
                                        position: 'relative'
                                    }}
                                    onClick={() => openExpandedImage({
                                        src: currentQuestion.explanation_image?.src || currentQuestion.img,
                                        alt: currentQuestion.explanation_image?.alt || 'Explanation Diagram'
                                    })}
                                    title="Click to expand image"
                                >
                                    <img
                                        src={currentQuestion.explanation_image?.src || currentQuestion.img}
                                        alt={currentQuestion.explanation_image?.alt || 'Explanation Diagram'}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block'
                                        }}
                                    />
                                    <div className="expert-image-expand-hint">
                                        <Maximize2 size={13} />
                                        <span>Click to expand</span>
                                    </div>
                                </div>
                            )}

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

            {/* Expanded Image Modal / Lightbox with Interactive Zoom & Pan */}
            {expandedImage && (
                <div
                    className="image-lightbox-overlay"
                    onClick={closeExpandedImage}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.92)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99999,
                        padding: '16px',
                        cursor: 'default'
                    }}
                >
                    {/* Top Right Close Button */}
                    <button
                        onClick={closeExpandedImage}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '20px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: '#fff',
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            zIndex: 100000
                        }}
                        title="Close (Esc)"
                        aria-label="Close enlarged image"
                    >
                        <X size={22} />
                    </button>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            maxWidth: '96vw'
                        }}
                    >
                        {/* Zoom Controls Toolbar */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(15, 23, 42, 0.88)',
                                backdropFilter: 'blur(10px)',
                                padding: '6px 16px',
                                borderRadius: '30px',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                                zIndex: 10
                            }}
                        >
                            <button
                                onClick={handleZoomOut}
                                disabled={zoomLevel <= 1}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: zoomLevel <= 1 ? 'rgba(255, 255, 255, 0.3)' : '#fff',
                                    cursor: zoomLevel <= 1 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '5px',
                                    borderRadius: '4px'
                                }}
                                title="Zoom Out (-)"
                            >
                                <ZoomOut size={18} />
                            </button>

                            <span style={{
                                fontSize: '0.88rem',
                                fontWeight: '600',
                                color: '#e2e8f0',
                                minWidth: '48px',
                                textAlign: 'center',
                                userSelect: 'none'
                            }}>
                                {Math.round(zoomLevel * 100)}%
                            </span>

                            <button
                                onClick={handleZoomIn}
                                disabled={zoomLevel >= 4}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: zoomLevel >= 4 ? 'rgba(255, 255, 255, 0.3)' : '#fff',
                                    cursor: zoomLevel >= 4 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '5px',
                                    borderRadius: '4px'
                                }}
                                title="Zoom In (+)"
                            >
                                <ZoomIn size={18} />
                            </button>

                            <div style={{ width: '1px', height: '16px', background: 'rgba(255, 255, 255, 0.2)', margin: '0 2px' }} />

                            <button
                                onClick={handleResetZoom}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#e2e8f0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontSize: '0.82rem',
                                    fontWeight: '500',
                                    padding: '4px 8px',
                                    borderRadius: '6px'
                                }}
                                title="Reset Zoom (100%)"
                            >
                                <RotateCcw size={14} />
                                <span>Reset</span>
                            </button>

                            <span style={{
                                color: 'rgba(255, 255, 255, 0.55)',
                                fontSize: '0.78rem',
                                borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
                                paddingLeft: '10px',
                                userSelect: 'none'
                            }} className="zoom-instructions-text">
                                {zoomLevel > 1 ? 'Drag to pan • Click to reset' : 'Click image to zoom 2× • Mouse wheel to zoom'}
                            </span>
                        </div>

                        {/* Large Image Viewport Container */}
                        <div
                            style={{
                                width: 'min(92vw, 1100px)',
                                height: 'min(74vh, 720px)',
                                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                                userSelect: 'none'
                            }}
                            onWheel={handleWheel}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onClick={handleImageContainerClick}
                        >
                            <img
                                src={expandedImage.src}
                                alt={expandedImage.alt}
                                draggable={false}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                                    transformOrigin: 'center center',
                                    transition: isDragging ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0, 0, 1)',
                                    display: 'block',
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>

                        {/* Caption */}
                        {expandedImage.alt && expandedImage.alt !== 'Explanation Diagram' && (
                            <p style={{
                                margin: '0',
                                color: '#e2e8f0',
                                fontSize: '0.9rem',
                                textAlign: 'center',
                                maxWidth: '750px',
                                background: 'rgba(15, 23, 42, 0.75)',
                                padding: '6px 18px',
                                borderRadius: '20px',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                {expandedImage.alt}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPlayer;
