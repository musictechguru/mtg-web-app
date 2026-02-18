import React, { useState, useEffect, useMemo } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowDown, Lock, Download, Play } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import SignalFlowLabelQuiz from './InteractiveQuizzes/SignalFlowLabelQuiz';

// --- Sortable Item Component (For// SortableItem component
function SortableItem({ id, item, onItemChange }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: typeof item === 'string' ? item : item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '15px',
        margin: '10px 0',
        background: '#333',
        color: 'white',
        borderRadius: '5px',
        cursor: 'grab',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #444',
        touchAction: 'none'
    };

    const content = typeof item === 'string' ? item : item.content;

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <span style={{ color: '#666' }}>::</span>
                <span>{content}</span>
            </div>
            {item.options && (
                <select
                    value={item.selectedOption || ""}
                    onChange={(e) => onItemChange && onItemChange(item.id, e.target.value)}
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{ background: '#222', color: 'white', border: '1px solid #555', padding: '5px', borderRadius: '4px' }}
                >
                    <option value="">Select Type...</option>
                    {item.options.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
                </select>
            )}
        </div>
    );
}



// --- Draggable Card Component (For Categorisation) ---
function DraggableCard({ id, content }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div style={{ padding: '10px', background: 'var(--accent-blue)', color: 'white', borderRadius: '5px', cursor: 'grab', marginBottom: '10px', fontSize: '0.9rem', touchAction: 'none' }}>
                {content}
            </div>
        </div>
    );
}

// --- Droppable Bucket Component ---
function DroppableBucket({ id, title, children }) {
    const { isOver, setNodeRef } = useDroppable({ id });
    const style = {
        background: isOver ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
        border: isOver ? '2px dashed var(--accent-success)' : '2px dashed #444',
        borderRadius: '8px',
        padding: '15px',
        minHeight: '150px',
        flex: 1
    };
    return (
        <div ref={setNodeRef} style={style}>
            <h4 style={{ textAlign: 'center', marginBottom: '10px', color: '#aaa' }}>{title}</h4>
            {children}
        </div>
    );
}

const Component3ExamPlayer = ({ examData, onExit }) => {
    const { currentUser } = useUser();
    const [currentSectionIndex, setCurrentSectionIndex] = useState(-1); // -1 = Intro
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [manualScores, setManualScores] = useState({}); // For self-marked questions
    const [showMarkScheme, setShowMarkScheme] = useState(false);
    const [examFinished, setExamFinished] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState({}); // Stores randomized options for matching questions
    const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
    const [timerActive, setTimerActive] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false); // Track if timer has been started at least once


    // Timer countdown effect
    useEffect(() => {
        if (!timerActive || timeRemaining <= 0 || examFinished) return;

        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    setExamFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerActive, timeRemaining, examFinished]);

    // Start timer when exam begins (section 0) - only auto-start once
    useEffect(() => {
        if (currentSectionIndex === 0 && !timerStarted) {
            setTimerActive(true);
            setTimerStarted(true);
        }
    }, [currentSectionIndex, timerStarted]);

    // Initialize shuffled order for ordering questions
    // Initialize shuffled order for ordering questions
    useEffect(() => {
        if (!examData || !examData.sections) return;

        setAnswers(prev => {
            const next = { ...prev };
            let modified = false;
            examData.sections?.forEach(sec => {
                sec.questions?.forEach(q => {
                    q.parts?.forEach(p => {
                        const key = `${q.id}_${p.id}`;
                        if (p.type === 'ordering') {
                            if (!next[key] && Array.isArray(p.items)) {
                                // Shuffle items for ordering
                                const shuffled = [...p.items].sort(() => Math.random() - 0.5);
                                next[key] = shuffled;
                                modified = true;
                            }
                        }
                    });
                });
            });
            return modified ? next : prev;
        });

        // Separate Shuffle for Matching Options
        setShuffledOptions(prev => {
            const next = { ...prev };
            let modified = false;
            examData.sections?.forEach(sec => {
                sec.questions?.forEach(q => {
                    q.parts?.forEach(p => {
                        if (p.type === 'matching' && Array.isArray(p.options)) {
                            const key = `${q.id}_${p.id}`;
                            if (!next[key]) {
                                const shuffled = [...p.options].sort(() => Math.random() - 0.5);
                                next[key] = shuffled;
                                modified = true;
                            }
                        }
                    });
                });
            });
            return modified ? next : prev;
        });
    }, [examData]);

    // Safety check
    if (!examData) return <div>Loading Exam...</div>;

    const sections = examData.sections;
    const currentSection = currentSectionIndex >= 0 && currentSectionIndex < sections.length ? sections[currentSectionIndex] : null;
    const currentQuestion = currentSection ? currentSection.questions[currentQuestionIndex] : null;

    // --- Scoring Logic ---

    const calculateAutoScore = (part, userAnswer) => {
        if (!userAnswer) return 0;

        switch (part.type) {
            case 'multiple_choice':
                return userAnswer === part.answer ? part.marks : 0;

            case 'multi_select':
                // Intersection of arrays
                if (!Array.isArray(userAnswer) || !Array.isArray(part.answer)) return 0;
                const correctCount = userAnswer.filter(ans => part.answer.includes(ans)).length;
                // Simple deduction for wrong answers? Or just sum correct? 
                // Context: usually 1 mark per correct answer. 
                // We'll cap at part.marks.
                return Math.min(part.marks, correctCount);

            case 'matching':
                // Count correct pairs
                // answers is object { pairIndex: "MatchString" }
                // part.pairs is array [{ item: "...", match: "..." }]
                let matchScore = 0;
                const matches = part.pairs || part.items;
                matches.forEach((item, idx) => {
                    const correctValue = part.pairs ? item.match : part.answer[idx];
                    if (userAnswer[idx] === correctValue) matchScore++;
                });
                return matchScore;

            case 'ordering':
                // Supports Strings or Objects with IDs
                if (!Array.isArray(userAnswer)) return 0;
                let orderScore = 0;

                part.items.forEach((correctItem, idx) => {
                    const userItem = userAnswer[idx];
                    if (!userItem) return;

                    const correctId = typeof correctItem === 'string' ? correctItem : correctItem.id;
                    const userId = typeof userItem === 'string' ? userItem : userItem.id;

                    // 1. Position Mark
                    if (userId === correctId) {
                        orderScore++;
                    }

                    // 2. Dropdown/Option Mark (Independent of position? Or dependent?)
                    // Current logic: Check the item wherever it is in user answer? 
                    // Or check the userItem at this index?
                    // If userItem matches correctId (correct position), check its option.
                    // If userItem is in WRONG position, should we check option?
                    // Let's iterate userAnswer to find the item with correctId to check its option.
                });

                // Separate pass for Options (so you get marks for correct option even if position is wrong? 
                // Usually "Place the steps..." implies position is key. 
                // But "Select from menu" implies knowledge of filter type.
                // I will award Option mark regardless of position.
                // iterate Correct Items, find matching ID in User Answer
                part.items.forEach(correctItem => {
                    if (typeof correctItem === 'object' && correctItem.correctOption) {
                        const userItem = userAnswer.find(u => (typeof u === 'object' ? u.id : u) === correctItem.id);
                        if (userItem && userItem.selectedOption === correctItem.correctOption) {
                            orderScore++;
                        }
                    }
                });

                return orderScore;

            case 'cloze':
                // userAnswer is object { blankId: "value" }
                // part.answer is array ["val1", "val2"] corresponding to ids 0, 1...
                let clozeScore = 0;
                if (!part.answer) return 0;
                part.answer.forEach((correctVal, idx) => {
                    if (userAnswer[idx] === correctVal) clozeScore++;
                });
                // Depending on marks per blank (usually 1). 
                // Q5(a) is 15 marks but only 5 blanks? Wait, data says 15 marks. 
                // Let's assume pro-rated or specific marks per blank. 
                // 15 marks / 5 blanks = 3 marks per blank.
                const marksPerBlank = part.marks / part.answer.length;
                return Math.round(clozeScore * marksPerBlank);

            case 'sorting':
                // Check if items are in correct buckets
                // userAnswer is { itemId: bucketId }
                // part.items has { id, group }
                if (!userAnswer) return 0;
                let sortScore = 0;
                part.items.forEach(item => {
                    if (userAnswer[item.id] === item.group) sortScore++;
                });
                return sortScore;

            case 'signal-flow-label':
                // Check if terms are placed in correct boxes
                // userAnswer is { boxId: term }
                // part.correctAnswers has { boxId: correctTerm }
                if (!userAnswer || !part.correctAnswers) return 0;
                let flowScore = 0;
                Object.keys(part.correctAnswers).forEach(boxId => {
                    if (userAnswer[boxId] === part.correctAnswers[boxId]) {
                        flowScore++;
                    }
                });
                // Assuming 1 mark per correct placement, or pro-rate based on total marks
                const marksPerBox = part.marks / Object.keys(part.correctAnswers).length;
                return Math.round(flowScore * marksPerBox);

            default:
                return 0; // Manual marking required
        }
    };

    const getScoreForPart = (qId, part) => {
        const userAnswer = answers[`${qId}_${part.id}`];
        if (part.type === 'self_mark') {
            return Array.isArray(userAnswer) ? userAnswer.length : 0;
        }
        if (['short_answer', 'essay_short', 'essay_long', 'list', 'drawing'].includes(part.type)) {
            return manualScores[`${qId}_${part.id}`] || 0;
        } else {
            return calculateAutoScore(part, userAnswer);
        }
    };

    // Calculate Total Scores
    const resultStats = useMemo(() => {
        let totalScore = 0;
        let earnedScore = 0;
        const sectionBreakdown = {};

        sections.forEach(sec => {
            sectionBreakdown[sec.id] = { total: 0, earned: 0 };
            sec.questions.forEach(q => {
                q.parts.forEach(p => {
                    const pScore = getScoreForPart(q.id, p);
                    earnedScore += pScore;
                    totalScore += p.marks;
                    sectionBreakdown[sec.id].earned += pScore;
                    sectionBreakdown[sec.id].total += p.marks;
                });
            });
        });

        const percentage = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : 0;
        let grade = 'U';
        if (percentage >= 90) grade = 'A*';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B';
        else if (percentage >= 60) grade = 'C';
        else if (percentage >= 50) grade = 'D';
        else if (percentage >= 40) grade = 'E';

        return { totalScore, earnedScore, percentage, grade, sectionBreakdown };
    }, [answers, manualScores, sections]);


    // --- Handlers ---

    const handleAnswerChange = (qId, partId, value) => {
        if (examFinished) return; // Locked
        setAnswers(prev => ({
            ...prev,
            [`${qId}_${partId}`]: value
        }));
    };

    const handleManualScoreChange = (qId, partId, value) => {
        setManualScores(prev => ({
            ...prev,
            [`${qId}_${partId}`]: parseInt(value)
        }));
    };

    const nextStep = () => {
        setShowMarkScheme(false);
        if (currentSectionIndex === -1) {
            setCurrentSectionIndex(0);
            setCurrentQuestionIndex(0);
            return;
        }

        if (currentQuestionIndex < currentSection.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            if (currentSectionIndex < sections.length - 1) {
                setCurrentSectionIndex(prev => prev + 1);
                setCurrentQuestionIndex(0);
            } else {
                // Finish
                setExamFinished(true);
            }
        }
    };

    const prevStep = () => {
        setShowMarkScheme(false);
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        } else if (currentSectionIndex > 0) {
            setCurrentSectionIndex(prev => prev - 1);
            setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1);
        } else {
            setCurrentSectionIndex(-1);
        }
    };



    // --- DND Sensors ---
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event, qId, partId, currentOrder) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            const oldIndex = currentOrder.findIndex(item =>
                (typeof item === 'string' ? item : item.id) === active.id
            );
            const newIndex = currentOrder.findIndex(item =>
                (typeof item === 'string' ? item : item.id) === over.id
            );

            if (oldIndex !== -1 && newIndex !== -1) {
                const newOrder = arrayMove(currentOrder, oldIndex, newIndex);
                handleAnswerChange(qId, partId, newOrder);
            }
        }
    };

    const handleDragEndSorting = (event, qId, partId, currentAssignments) => {
        const { active, over } = event;
        if (over) {
            handleAnswerChange(qId, partId, {
                ...currentAssignments,
                [active.id]: over.id
            });
        }
    };

    // --- Renderers ---

    if (examFinished) {
        return (
            <div className="exam-results-container" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Exam Results</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                    <div style={{ background: 'var(--bg-panel)', padding: '30px', borderRadius: '15px', textAlign: 'center', border: '1px solid var(--accent-blue)' }}>
                        <h3 style={{ color: '#aaa', margin: 0 }}>Total Score</h3>
                        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>{resultStats.earnedScore} <span style={{ fontSize: '1.5rem', color: '#666' }}>/ {resultStats.totalScore}</span></div>
                    </div>
                    <div style={{ background: 'var(--bg-panel)', padding: '30px', borderRadius: '15px', textAlign: 'center', border: '1px solid var(--accent-purple)' }}>
                        <h3 style={{ color: '#aaa', margin: 0 }}>Grade</h3>
                        <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>{resultStats.grade}</div>
                        <div style={{ fontSize: '1.2rem' }}>{resultStats.percentage}%</div>
                    </div>
                </div>

                <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Section Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    {Object.entries(resultStats.sectionBreakdown).map(([secId, stats]) => (
                        <div key={secId} style={{ display: 'flex', justifyContent: 'space-between', background: '#222', padding: '15px', borderRadius: '8px' }}>
                            <span>Section {secId}</span>
                            <span>{stats.earned} / {stats.total} ({stats.total > 0 ? Math.round(stats.earned / stats.total * 100) : 0}%)</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
                    <button
                        onClick={() => { setExamFinished(false); setCurrentSectionIndex(0); setCurrentQuestionIndex(0); setShowMarkScheme(true); }}
                        style={{ flex: 1, padding: '15px', background: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Review Answers
                    </button>
                    <button
                        onClick={onExit}
                        style={{ flex: 1, padding: '15px', background: 'var(--accent-success)', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Finish & Exit
                    </button>
                </div>
            </div>
        );
    }

    if (currentSectionIndex === -1) {
        // Intro (Unchanged)
        return (
            <div className="exam-intro-container" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
                <h1 style={{ fontSize: '3rem', borderBottom: '2px solid var(--accent-blue)', paddingBottom: '20px' }}>{examData.title}</h1>
                <div style={{ background: 'var(--bg-panel)', padding: '30px', borderRadius: '15px', marginTop: '30px' }}>
                    <p><strong>Time Allowed:</strong> {examData.timeLimitMinutes} minutes</p>
                    <p><strong>Total Marks:</strong> {examData.totalMarks}</p>
                    <p style={{ margin: '20px 0', lineHeight: '1.6' }}>{examData.description}</p>
                    <h3>Instructions</h3>
                    <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
                        <li>Use headphones for the best listening experience.</li>
                        <li>Answering questions: Interactive types (Choice, Matching, etc.) are marked automatically.</li>
                        <li>Written answers (Essays) must be <strong>Self-Marked</strong> using the Mark Scheme.</li>
                    </ul>
                    <button onClick={nextStep} style={{ marginTop: '30px', background: 'var(--accent-success)', color: 'black', border: 'none', padding: '15px 40px', fontSize: '1.2rem', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>Start Exam</button>
                    <button onClick={onExit} style={{ display: 'block', marginTop: '20px', background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}>Exit to Dashboard</button>
                </div>
            </div>
        );
    }

    // --- Component Logic for Inputs (Recycled from previous step) ---
    // (Abridged for brevity in thought, but full code below)

    return (
        <div className="exam-player-container" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <aside style={{ width: '250px', background: 'var(--bg-panel)', borderRight: '1px solid #333', padding: '20px', overflowY: 'auto' }}>
                <button onClick={onExit} style={{ marginBottom: '20px', background: 'transparent', border: '1px solid #555', color: '#888', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>&larr; Exit</button>
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: 'var(--accent-blue)' }}>{currentSection.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '5px' }}>
                        Current Score: {resultStats.earnedScore} / {resultStats.totalScore}
                    </div>
                    {timerActive && (
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginTop: '15px',
                            padding: '10px',
                            background: timeRemaining < 300 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                            border: `1px solid ${timeRemaining < 300 ? '#ef4444' : '#3b82f6'}`,
                            borderRadius: '8px',
                            textAlign: 'center',
                            color: timeRemaining < 300 ? '#ef4444' : '#3b82f6'
                        }}>
                            ⏱️ {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
                        </div>
                    )}
                    {currentSectionIndex >= 0 && (
                        <button
                            onClick={() => setTimerActive(!timerActive)}
                            style={{
                                width: '100%',
                                marginTop: '10px',
                                padding: '8px',
                                background: timerActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                                border: `1px solid ${timerActive ? '#ef4444' : '#22c55e'}`,
                                borderRadius: '6px',
                                color: timerActive ? '#ef4444' : '#22c55e',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}
                        >
                            {timerActive ? '⏸️ Pause Timer' : '▶️ Start Timer'}
                        </button>
                    )}
                </div>
                {sections.map((sec, sIdx) => (
                    <div key={sec.id} style={{ marginBottom: '20px', opacity: sIdx === currentSectionIndex ? 1 : 0.5 }}>
                        <h4 style={{ marginBottom: '10px' }}>{sec.id}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {sec.questions.map((q, qIdx) => (
                                <div key={q.id} onClick={() => { setCurrentSectionIndex(sIdx); setCurrentQuestionIndex(qIdx); setShowMarkScheme(false); }}
                                    style={{
                                        width: '30px', height: '30px', borderRadius: '50%',
                                        background: (sIdx === currentSectionIndex && qIdx === currentQuestionIndex) ? 'var(--accent-blue)' : '#333',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', cursor: 'pointer',
                                        border: answers[`${q.id}_total`] ? '1px solid var(--accent-success)' : 'none'
                                    }}
                                >
                                    {qIdx + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </aside>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                {/* Audio Bar */}
                {/* Audio Bar (Conditional) */}
                {currentQuestion.track && (
                    <div style={{ padding: '15px 30px', background: '#111', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '50px', height: '50px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>🎵</div>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{currentQuestion.track.title}</div>
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>{currentQuestion.track.artist} ({currentQuestion.track.year})</div>
                            </div>
                        </div>
                        <div style={{ background: '#222', padding: '10px', borderRadius: '15px', minWidth: '350px', textAlign: 'center', color: '#666', fontSize: '0.8rem' }}>
                            <div style={{ marginBottom: currentQuestion.track.compareFilename ? '10px' : '0' }}>
                                {currentQuestion.track.compareFilename && <div style={{ color: '#aaa', marginBottom: '5px', fontSize: '0.75rem' }}>{currentQuestion.track.audioLabel || 'Original (1973)'}</div>}
                                <audio
                                    controls
                                    src={`/${currentQuestion.track.filename}`}
                                    style={{ width: '100%', height: '30px' }}
                                />
                            </div>
                            {currentQuestion.track.compareFilename && (
                                <div>
                                    <div style={{ color: '#aaa', marginBottom: '5px', fontSize: '0.75rem', marginTop: '10px' }}>{currentQuestion.track.compareLabel || 'Remix (2020)'}</div>
                                    <audio
                                        controls
                                        src={`/${currentQuestion.track.compareFilename}`}
                                        style={{ width: '100%', height: '30px' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '2rem' }}>{currentQuestion.title}</h2>
                            <span style={{ fontSize: '1.2rem', color: 'var(--accent-purple)' }}>{currentQuestion.totalMarks} Marks</span>
                        </div>

                        {currentQuestion.track && currentQuestion.track.assets && (
                            <div style={{ marginBottom: '30px', padding: '20px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--accent-blue)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Download size={18} /> Source Assets
                                </h3>
                                <div style={{ display: 'grid', gap: '10px' }}>
                                    {currentQuestion.track.assets.map((asset, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '12px 15px', borderRadius: '6px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '32px', height: '32px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Play size={14} fill="white" />
                                                </div>
                                                <span style={{ fontWeight: 'bold', color: '#e2e8f0', minWidth: '100px' }}>{asset.name}</span>
                                                <audio src={`/${asset.filename}`} controls style={{ height: '30px', width: '250px', opacity: 0.9 }} />
                                            </div>
                                            <div>
                                                {currentUser ? (
                                                    <a
                                                        href={`/${asset.filename}`}
                                                        download
                                                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--accent-blue)', color: 'white', borderRadius: '5px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}
                                                    >
                                                        <Download size={16} /> Download
                                                    </a>
                                                ) : (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#334155', color: '#94a3b8', borderRadius: '5px', fontSize: '0.9rem', cursor: 'not-allowed' }}>
                                                        <Lock size={16} /> Members Only
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentQuestion.parts.map((part) => (
                            <div key={part.id} style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <h4 style={{ color: '#aaa' }}>Part ({part.id})</h4>
                                    <span style={{ fontWeight: 'bold', color: '#666' }}>[{part.marks}]</span>
                                </div>

                                <div
                                    style={{ fontSize: '1.1rem', marginBottom: '20px', lineHeight: '1.6' }}
                                    dangerouslySetInnerHTML={{ __html: part.question.replace(/\n/g, '<br/>') }}
                                />

                                {/* ---- INPUT RENDERERS (Inline for brevity logic) ---- */}
                                {part.type === 'multiple_choice' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {part.options.map((opt, idx) => (
                                            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#222', borderRadius: '5px', cursor: 'pointer' }}>
                                                <input type="radio" name={`${currentQuestion.id}_${part.id}`} value={opt} onChange={(e) => handleAnswerChange(currentQuestion.id, part.id, e.target.value)} checked={answers[`${currentQuestion.id}_${part.id}`] === opt} />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {part.type === 'multi_select' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#888' }}>Select multiple options.</p>
                                        {part.options.map((opt, idx) => {
                                            const currentAns = answers[`${currentQuestion.id}_${part.id}`] || [];
                                            return (
                                                <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#222', borderRadius: '5px', cursor: 'pointer', border: currentAns.includes(opt) ? '1px solid var(--accent-blue)' : '1px solid transparent' }}>
                                                    <input type="checkbox" checked={currentAns.includes(opt)} onChange={() => {
                                                        const newAns = currentAns.includes(opt) ? currentAns.filter(o => o !== opt) : [...currentAns, opt];
                                                        handleAnswerChange(currentQuestion.id, part.id, newAns);
                                                    }} />
                                                    {opt}
                                                </label>
                                            );
                                        })}
                                    </div>
                                )}
                                {/* ... Other types (Matching, Ordering, Cloze) same as before but using handleAnswerChange ... */}
                                {/* For brevity, assuming standard renderers from previous step are preserved here */}
                                {part.type === 'matching' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        {(part.pairs || part.items).map((item, idx) => {
                                            const currentMatches = answers[`${currentQuestion.id}_${part.id}`] || {};
                                            const label = typeof item === 'string' ? item : item.item;
                                            return (
                                                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'center', background: '#222', padding: '10px', borderRadius: '5px' }}>
                                                    <div style={{ fontWeight: 'bold' }}>{label}</div>
                                                    <select style={{ padding: '8px', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' }} value={currentMatches[idx] || ''} onChange={(e) => handleAnswerChange(currentQuestion.id, part.id, { ...currentMatches, [idx]: e.target.value })}>
                                                        <option value="">-- Match --</option>
                                                        {(shuffledOptions[`${currentQuestion.id}_${part.id}`] || part.options).map((opt, oIdx) => <option key={oIdx} value={opt}>{opt}</option>)}
                                                    </select>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {part.type === 'sorting' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>Drag the cards to the correct category.</p>
                                        <DndContext sensors={sensors} onDragEnd={(e) => handleDragEndSorting(e, currentQuestion.id, part.id, answers[`${currentQuestion.id}_${part.id}`] || {})}>
                                            <div style={{ display: 'flex', gap: '15px' }}>
                                                {(part.groups || part.buckets).map(group => {
                                                    const groupId = typeof group === 'string' ? group : group.id;
                                                    const groupTitle = typeof group === 'string' ? group : group.title;
                                                    return (
                                                        <DroppableBucket key={groupId} id={groupId} title={groupTitle}>
                                                            {part.items.filter(item => (answers[`${currentQuestion.id}_${part.id}`] || {})[item.id] === groupId).map(item => (
                                                                <DraggableCard key={item.id} id={item.id} content={item.content} />
                                                            ))}
                                                        </DroppableBucket>
                                                    );
                                                })}
                                            </div>

                                            {/* Unsorted Items Pool */}
                                            <div style={{ background: '#222', padding: '15px', borderRadius: '8px', minHeight: '80px', marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                {part.items.filter(item => !(answers[`${currentQuestion.id}_${part.id}`] || {})[item.id]).map(item => (
                                                    <DraggableCard key={item.id} id={item.id} content={item.content} />
                                                ))}
                                                {part.items.every(item => (answers[`${currentQuestion.id}_${part.id}`] || {})[item.id]) && (
                                                    <span style={{ color: '#555', fontStyle: 'italic' }}>All items sorted!</span>
                                                )}
                                            </div>
                                        </DndContext>
                                    </div>
                                )}

                                {part.type === 'signal-flow-label' && (
                                    <div>
                                        <SignalFlowLabelQuiz
                                            flowSteps={part.flowSteps || []}
                                            terms={part.terms || []}
                                            correctAnswers={part.correctAnswers || {}}
                                            initialAnswer={answers[`${currentQuestion.id}_${part.id}`] || {}}
                                            onAnswerChange={(droppedTerms) => {
                                                handleAnswerChange(currentQuestion.id, part.id, droppedTerms);
                                            }}
                                        />
                                    </div>
                                )}

                                {part.type === 'ordering' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
                                        <p style={{ marginTop: 0, marginBottom: '10px', color: '#94a3b8', fontSize: '0.9rem' }}>
                                            Drag the items into the correct order (Top to Bottom).
                                        </p>
                                        {(() => {
                                            const currentOrder = answers[`${currentQuestion.id}_${part.id}`] || part.items;
                                            return (
                                                <DndContext
                                                    sensors={sensors}
                                                    collisionDetection={closestCenter}
                                                    onDragEnd={(e) => handleDragEnd(e, currentQuestion.id, part.id, currentOrder)}
                                                >
                                                    <SortableContext items={currentOrder.map(i => (typeof i === 'string' ? i : i.id))} strategy={verticalListSortingStrategy}>
                                                        {currentOrder.map((item) => (
                                                            <SortableItem
                                                                key={typeof item === 'string' ? item : item.id}
                                                                id={typeof item === 'string' ? item : item.id}
                                                                item={item}
                                                                onItemChange={(itemId, value) => {
                                                                    const newOrder = currentOrder.map(i =>
                                                                        (i.id === itemId) ? { ...i, selectedOption: value } : i
                                                                    );
                                                                    handleAnswerChange(currentQuestion.id, part.id, newOrder);
                                                                }}
                                                            />
                                                        ))}
                                                    </SortableContext>
                                                </DndContext>
                                            );
                                        })()}
                                    </div>
                                )}
                                {part.type === 'cloze' && (
                                    <div style={{ lineHeight: '2.5', fontSize: '1.1rem' }}>
                                        {Array.isArray(part.text) ? (
                                            <ul style={{ paddingLeft: '20px', margin: 0 }}>
                                                {part.text.map((line, lineIdx) => (
                                                    <li key={lineIdx} style={{ marginBottom: '15px' }}>
                                                        {line.split(/\{(\d+)\}/g).map((fragment, idx) => {
                                                            if (idx % 2 === 0) return <span key={idx}>{fragment}</span>;
                                                            const blankId = parseInt(fragment);
                                                            const currentBlanks = answers[`${currentQuestion.id}_${part.id}`] || {};
                                                            return (
                                                                <select key={idx} style={{ margin: '0 5px', padding: '5px', background: '#333', color: 'white', border: '1px solid var(--accent-blue)', borderRadius: '4px' }} value={currentBlanks[blankId] || ''} onChange={(e) => handleAnswerChange(currentQuestion.id, part.id, { ...currentBlanks, [blankId]: e.target.value })}>
                                                                    <option value="">...</option>
                                                                    {part.options[blankId] && part.options[blankId].map((opt, oIdx) => <option key={oIdx} value={opt}>{opt}</option>)}
                                                                </select>
                                                            );
                                                        })}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            part.text.split(/\{(\d+)\}/g).map((fragment, idx) => {
                                                if (idx % 2 === 0) return <span key={idx}>{fragment}</span>;
                                                const blankId = parseInt(fragment);
                                                const currentBlanks = answers[`${currentQuestion.id}_${part.id}`] || {};
                                                return (
                                                    <select key={idx} style={{ margin: '0 5px', padding: '5px', background: '#333', color: 'white', border: '1px solid var(--accent-blue)' }} value={currentBlanks[blankId] || ''} onChange={(e) => handleAnswerChange(currentQuestion.id, part.id, { ...currentBlanks, [blankId]: e.target.value })}>
                                                        <option value="">...</option>
                                                        {part.options[blankId] && part.options[blankId].map((opt, oIdx) => <option key={oIdx} value={opt}>{opt}</option>)}
                                                    </select>
                                                );
                                            })
                                        )}
                                    </div>
                                )}
                                {(part.type === 'short_answer' || part.type === 'essay_short' || part.type === 'essay_long') && (
                                    <textarea style={{ width: '100%', minHeight: '100px', background: '#222', border: '1px solid #444', color: 'white', padding: '15px' }} placeholder="Type answer..." value={answers[`${currentQuestion.id}_${part.id}`] || ''} onChange={(e) => handleAnswerChange(currentQuestion.id, part.id, e.target.value)} />
                                )}
                                {part.type === 'list' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {[...Array(part.items)].map((_, i) => (
                                            <input key={i} type="text" style={{ padding: '10px', background: '#222', border: '1px solid #444', color: 'white' }} placeholder={`Item ${i + 1}`} value={(answers[`${currentQuestion.id}_${part.id}`] || {})[i] || ''} onChange={(e) => handleAnswerChange(currentQuestion.id, part.id, { ...(answers[`${currentQuestion.id}_${part.id}`] || {}), [i]: e.target.value })} />
                                        ))}
                                    </div>
                                )}
                                {part.type === 'drawing' && (
                                    <div style={{ background: '#222', padding: '20px', borderRadius: '5px', border: '1px solid #444' }}>
                                        {part.subtype === 'filter_2band' ? (
                                            <>
                                                <div style={{ marginBottom: '15px', color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>
                                                    Interactive Filter: Adjust the Low Cut and High Cut frequencies.
                                                </div>

                                                {/* Filter Visualization */}
                                                <div style={{ height: '150px', background: '#111', borderRadius: '4px', position: 'relative', marginBottom: '20px', overflow: 'hidden' }}>
                                                    {/* Grid - Log Scale approx markers (20, 100, 1k, 10k, 20k) */}
                                                    {[0, 25, 50, 75, 100].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', background: '#222' }}></div>)}

                                                    {/* Curve */}
                                                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                        <path
                                                            d={(() => {
                                                                const vals = answers[`${currentQuestion.id}_${part.id}`] || part.defaultValues || [20, 20000];
                                                                // Simple log-ish mapping for display:
                                                                // 20Hz -> 0%, 20kHz -> 100%
                                                                // Let's us linear map of log(freq)
                                                                const minF = Math.log10(20);
                                                                const maxF = Math.log10(20000);
                                                                const range = maxF - minF;

                                                                const getX = (f) => Math.max(0, Math.min(100, ((Math.log10(f) - minF) / range) * 100));

                                                                const x1 = getX(vals[0]); // Low Cut
                                                                const x2 = getX(vals[1]); // High Cut

                                                                // Draw "Box" passband
                                                                // Start bottom left (0, 100) -> (x1, 100) -> Curve up to (x1+5, 20) -> Flat to (x2-5, 20) -> Curve down to (x2, 100) -> (100, 100)
                                                                // Simplified "Trapezoid/Box" shape signifying the passed frequencies

                                                                return `M 0,100 L ${x1},100 L ${x1},10 L ${x2},10 L ${x2},100 L 100,100`;
                                                            })()}
                                                            fill="rgba(59, 130, 246, 0.2)"
                                                            stroke="var(--accent-blue)"
                                                            strokeWidth="4"
                                                            vectorEffect="non-scaling-stroke"
                                                        />
                                                    </svg>
                                                    <div style={{ position: 'absolute', bottom: '5px', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 10px', fontSize: '0.7rem', color: '#666' }}>
                                                        <span>20Hz</span><span>100Hz</span><span>1kHz</span><span>10kHz</span><span>20kHz</span>
                                                    </div>
                                                </div>

                                                {/* Controls */}
                                                <div style={{ display: 'flex', gap: '40px', padding: '0 20px' }}>
                                                    {/* Low Cut Slider */}
                                                    <div style={{ flex: 1 }}>
                                                        <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>Low Cut (HPF)</label>
                                                        <input
                                                            type="range"
                                                            min="20" max="1000" step="10"
                                                            value={(answers[`${currentQuestion.id}_${part.id}`] || part.defaultValues || [20, 20000])[0]}
                                                            style={{ width: '100%', accentColor: 'var(--accent-blue)' }}
                                                            onChange={(e) => {
                                                                const current = answers[`${currentQuestion.id}_${part.id}`] || part.defaultValues || [20, 20000];
                                                                const val = parseInt(e.target.value);
                                                                // Constraint: Low Cut < High Cut
                                                                if (val < current[1]) {
                                                                    handleAnswerChange(currentQuestion.id, part.id, [val, current[1]]);
                                                                }
                                                            }}
                                                        />
                                                        <div style={{ textAlign: 'right', marginTop: '5px', fontWeight: 'bold' }}>{(answers[`${currentQuestion.id}_${part.id}`] || part.defaultValues || [20, 20000])[0]} Hz</div>
                                                    </div>

                                                    {/* High Cut Slider */}
                                                    <div style={{ flex: 1 }}>
                                                        <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>High Cut (LPF)</label>
                                                        <input
                                                            type="range"
                                                            min="1000" max="20000" step="100"
                                                            value={(answers[`${currentQuestion.id}_${part.id}`] || part.defaultValues || [20, 20000])[1]}
                                                            style={{ width: '100%', accentColor: 'var(--accent-blue)' }}
                                                            onChange={(e) => {
                                                                const current = answers[`${currentQuestion.id}_${part.id}`] || part.defaultValues || [20, 20000];
                                                                const val = parseInt(e.target.value);
                                                                // Constraint: High Cut > Low Cut
                                                                if (val > current[0]) {
                                                                    handleAnswerChange(currentQuestion.id, part.id, [current[0], val]);
                                                                }
                                                            }}
                                                        />
                                                        <div style={{ textAlign: 'right', marginTop: '5px', fontWeight: 'bold' }}>{(answers[`${currentQuestion.id}_${part.id}`] || part.defaultValues || [20, 20000])[1]} Hz</div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            /* OLD 5-BAND GRAHIC EQ RENDERER */
                                            <>
                                                <div style={{ marginBottom: '15px', color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>
                                                    Interactive EQ: Adjust the sliders to create the requested curve.
                                                </div>

                                                {/* EQ Visualization */}
                                                <div style={{ height: '150px', background: '#111', borderRadius: '4px', position: 'relative', marginBottom: '20px', overflow: 'hidden' }}>
                                                    {/* Grid Lines */}
                                                    <div style={{ position: 'absolute', top: '50%', width: '100%', height: '1px', background: '#333' }}></div>
                                                    {[20, 40, 60, 80].map(p => <div key={p} style={{ position: 'absolute', left: `${p}%`, top: 0, bottom: 0, width: '1px', background: '#222' }}></div>)}

                                                    {/* Curve */}
                                                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                        <polyline
                                                            points={(() => {
                                                                const userPoints = answers[`${currentQuestion.id}_${part.id}`] || [0, 0, 0, 0, 0];
                                                                const points = userPoints.map((val, idx) => {
                                                                    const x = (idx * 20) + 10;
                                                                    const y = 50 - (val * 4);
                                                                    return `${x},${y}`;
                                                                });
                                                                return points.join(' ');
                                                            })()}
                                                            fill="none"
                                                            stroke="var(--accent-blue)"
                                                            strokeWidth="6"
                                                            vectorEffect="non-scaling-stroke"
                                                        />
                                                    </svg>
                                                    <div style={{ position: 'absolute', bottom: '5px', width: '100%', display: 'flex', justifyContent: 'space-around', fontSize: '0.7rem', color: '#666' }}>
                                                        <span>Low</span><span>Low-Mid</span><span>Mid</span><span>Hi-Mid</span><span>High</span>
                                                    </div>
                                                </div>

                                                {/* Sliders */}
                                                <div style={{ display: 'flex', justifyContent: 'space-around', height: '150px' }}>
                                                    {(answers[`${currentQuestion.id}_${part.id}`] || [0, 0, 0, 0, 0]).map((val, idx) => (
                                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                                            <input
                                                                type="range"
                                                                min="-12" max="12"
                                                                value={val}
                                                                orient="vertical"
                                                                style={{
                                                                    writingMode: 'bt-lr',
                                                                    height: '100px',
                                                                    width: '8px',
                                                                    accentColor: 'var(--accent-blue)',
                                                                    WebkitAppearance: 'slider-vertical'
                                                                }}
                                                                onChange={(e) => {
                                                                    const newVals = [...(answers[`${currentQuestion.id}_${part.id}`] || [0, 0, 0, 0, 0])];
                                                                    newVals[idx] = parseInt(e.target.value);
                                                                    handleAnswerChange(currentQuestion.id, part.id, newVals);
                                                                }}
                                                            />
                                                            <span style={{ marginTop: '10px', fontSize: '0.8rem', color: val > 0 ? '#4ade80' : val < 0 ? '#f87171' : '#888' }}>
                                                                {val > 0 ? '+' : ''}{val}dB
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}


                                {/* --- Mark Scheme & Grading --- */}
                                {showMarkScheme && (
                                    <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid var(--accent-success)', borderRadius: '4px' }}>
                                        <h4 style={{ color: 'var(--accent-success)', marginTop: 0 }}>Mark Scheme</h4>
                                        {/* Show Answer content (Simplified from previous step for brevity) */}
                                        {part.answer && typeof part.answer === 'string' && <p><strong>Correct:</strong> {part.answer}</p>}
                                        {part.answer && Array.isArray(part.answer) && <p><strong>Correct:</strong> {part.answer.join(', ')}</p>}
                                        {part.markScheme && part.type !== 'self_mark' && <ul>{part.markScheme.map((pt, i) => <li key={i}>{pt}</li>)}</ul>}
                                        {part.answerImage && (
                                            <div style={{ margin: '15px 0' }}>
                                                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Example Settings:</p>
                                                {(Array.isArray(part.answerImage) ? part.answerImage : [part.answerImage]).map((imgSrc, idx) => (
                                                    <img key={idx} src={`/${imgSrc}`} alt={`Answer Reference ${idx + 1}`} style={{ maxWidth: '100%', borderRadius: '4px', border: '1px solid #444', marginBottom: '10px', display: 'block' }} />
                                                ))}
                                            </div>
                                        )}
                                        {part.rationale && <p style={{ fontStyle: 'italic', color: '#aaa' }}>{part.rationale}</p>}

                                        {/* --- Grading Controls --- */}
                                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                            {part.type === 'self_mark' ? (
                                                <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                                                    <h4 style={{ margin: '0 0 10px 0', color: '#facc15' }}>Self Assessment Checklist:</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        {(part.markScheme || []).map((criterion, idx) => {
                                                            const currentAns = answers[`${currentQuestion.id}_${part.id}`] || [];
                                                            const isChecked = currentAns.includes(idx);
                                                            return (
                                                                <label key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px', cursor: 'pointer', padding: '8px', background: isChecked ? '#2a2a2a' : 'transparent', borderRadius: '4px' }}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isChecked}
                                                                        onChange={() => {
                                                                            const newAns = isChecked ? currentAns.filter(i => i !== idx) : [...currentAns, idx];
                                                                            handleAnswerChange(currentQuestion.id, part.id, newAns);
                                                                        }}
                                                                        style={{ marginTop: '4px' }}
                                                                    />
                                                                    <span style={{ color: isChecked ? '#fff' : '#aaa' }}>{criterion}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                    <div style={{ marginTop: '15px', textAlign: 'right', fontWeight: 'bold' }}>
                                                        Score: <span style={{ color: 'var(--accent-success)', fontSize: '1.2rem' }}>{(answers[`${currentQuestion.id}_${part.id}`] || []).length}</span> / {part.marks}
                                                    </div>
                                                </div>
                                            ) : ['short_answer', 'essay_short', 'essay_long', 'list', 'drawing'].includes(part.type) ? (
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '10px', color: '#facc15', fontWeight: 'bold' }}>Self Mark This Question:</label>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                        <input
                                                            type="range" min="0" max={part.marks}
                                                            value={manualScores[`${currentQuestion.id}_${part.id}`] || 0}
                                                            onChange={(e) => handleManualScoreChange(currentQuestion.id, part.id, e.target.value)}
                                                            style={{ flex: 1 }}
                                                        />
                                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{manualScores[`${currentQuestion.id}_${part.id}`] || 0} / {part.marks}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Auto-Graded:</span>
                                                    <span style={{ fontSize: '1.2rem' }}>{getScoreForPart(currentQuestion.id, part)} / {part.marks}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ padding: '20px 40px', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-panel)' }}>
                    <button onClick={prevStep} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #555', color: 'white', borderRadius: '5px', cursor: 'pointer' }} disabled={currentSectionIndex === -1}>Previous</button>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button onClick={() => setShowMarkScheme(!showMarkScheme)} style={{ padding: '10px 20px', background: showMarkScheme ? 'var(--accent-purple)' : '#333', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                            {showMarkScheme ? 'Hide Answers' : 'Show Answers & Mark'}
                        </button>
                        <button onClick={nextStep} style={{ padding: '10px 30px', background: 'var(--accent-blue)', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            {currentSectionIndex === sections.length - 1 && currentQuestionIndex === currentSection.questions.length - 1 ? 'Finish Exam' : 'Next Question'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Component3ExamPlayer;
