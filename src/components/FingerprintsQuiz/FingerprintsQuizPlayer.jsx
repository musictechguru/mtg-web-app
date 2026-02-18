import React, { useState, useEffect } from 'react';
import SongSelector from './SongSelector';
import CriterionQuestion from './CriterionQuestion';
import FeedbackModal from './FeedbackModal';
import fingerprintsData from '../../data/fingerprints_data.json';

const FingerprintsQuizPlayer = ({ onExit }) => {
    // State
    const [view, setView] = useState('selector'); // selector, quiz, summary
    const [currentSong, setCurrentSong] = useState(null);
    const [currentCriterionIndex, setCurrentCriterionIndex] = useState(0);
    const [completedCriteria, setCompletedCriteria] = useState({}); // { id: { score, level, selections, max } }
    const [showFeedback, setShowFeedback] = useState(false);

    // We store the full result object from the classification step
    const [userResult, setUserResult] = useState(null);

    const handleSongSelect = (song) => {
        setCurrentSong(song);
        setCurrentCriterionIndex(0);
        setCompletedCriteria({});
        setView('quiz');
        window.scrollTo(0, 0);
    };

    const handleAnswerSubmit = (result) => {
        // result = { correctList, incorrectList, pool }
        setUserResult(result);
        setShowFeedback(true);
    };

    const handleSkip = () => {
        const criterion = currentSong.criteria[currentCriterionIndex];
        // Mark as skipped (0 score) in history
        setCompletedCriteria(prev => ({
            ...prev,
            [criterion.id]: {
                id: criterion.id,
                name: criterion.name,
                score: 0,
                maxScore: 25,
                percentage: 0,
                selections: [],
                skipped: true
            }
        }));
        handleNextStep();
    };

    const handleFeedbackComplete = (scoreData) => {
        // scoreData = { score, maxScore } passed from FeedbackModal
        const criterion = currentSong.criteria[currentCriterionIndex];

        setCompletedCriteria(prev => ({
            ...prev,
            [criterion.id]: {
                id: criterion.id,
                name: criterion.name,
                score: scoreData.score,
                maxScore: scoreData.maxScore,
                percentage: Math.round((scoreData.score / scoreData.maxScore) * 100),
                selections: userResult.correctList, // Store just the correct list for summary?
                skipped: false
            }
        }));

        handleNextStep();
    };

    const handleNextStep = () => {
        setShowFeedback(false);
        const nextIndex = currentCriterionIndex + 1;

        // Check if there is a next criterion THAT IS APPLICABLE
        // We assume the rendered UI only lets you step through valid ones anyway.

        const applicableCriteria = currentSong
            ? currentSong.criteria.filter(c => c.applicableToSong)
            : [];

        if (nextIndex < applicableCriteria.length) {
            setCurrentCriterionIndex(nextIndex);
            window.scrollTo(0, 0);
        } else {
            setView('summary');
            window.scrollTo(0, 0);
        }
    };

    // Derived state for current applicable criteria
    const applicableCriteria = currentSong
        ? currentSong.criteria.filter(c => c.applicableToSong)
        : [];

    const currentCriterion = applicableCriteria[currentCriterionIndex];

    // -- RENDERERS --

    const renderSummary = () => {
        const totalScore = Object.values(completedCriteria).reduce((acc, c) => acc + c.score, 0);
        const totalMax = Object.values(completedCriteria).reduce((acc, c) => acc + c.maxScore, 0);
        const overallPercentage = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

        return (
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
                <header style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Analysis Complete</h2>
                    <h1 style={{ color: 'var(--accent-purple)', marginBottom: '20px' }}>{currentSong.title}</h1>

                    <div style={{
                        background: 'var(--bg-panel)',
                        padding: '30px',
                        borderRadius: '16px',
                        display: 'inline-block',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                            {overallPercentage}%
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>Overall Accuracy</div>
                    </div>
                </header>

                <div style={{ display: 'grid', gap: '20px' }}>
                    {Object.values(completedCriteria).map((result, idx) => (
                        <div key={idx} style={{
                            background: 'var(--bg-panel)',
                            padding: '20px',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: `5px solid ${result.percentage >= 76 ? 'var(--accent-success)' : result.percentage >= 56 ? 'var(--accent-warning)' : 'var(--accent-error)'}`
                        }}>
                            <div>
                                <h3 style={{ margin: '0 0 5px 0' }}>{result.name}</h3>
                                {result.skipped ? (
                                    <span style={{ color: '#666', fontStyle: 'italic' }}>Skipped</span>
                                ) : (
                                    <span style={{ color: '#ccc' }}>
                                        Score: {result.score} / {result.maxScore}
                                    </span>
                                )}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                {result.percentage}%
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '50px', textAlign: 'center' }}>
                    <button
                        onClick={() => setView('selector')}
                        className="btn-secondary"
                        style={{ padding: '15px 30px', marginRight: '20px' }}
                    >
                        Select Another Song
                    </button>
                    <button
                        onClick={onExit}
                        className="btn-primary"
                        style={{ padding: '15px 30px' }}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    };

    if (view === 'selector') {
        return <SongSelector songs={fingerprintsData.songs} onSelect={handleSongSelect} />;
    }

    if (view === 'summary') {
        return renderSummary();
    }

    return (
        <div className="fingerprints-player">
            {/* Header / Progress */}
            <div style={{
                padding: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px'
            }}>
                <div>
                    <h3 style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>ANALYZING</h3>
                    <div style={{ fontWeight: 'bold' }}>{currentSong.title}</div>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                    Criterion {currentCriterionIndex + 1} of {applicableCriteria.length}
                </div>
            </div>

            {/* YouTube Embed */}
            {currentSong.youtubeId && (
                <div style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}>
                    <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${currentSong.youtubeId}`}
                        title={currentSong.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <CriterionQuestion
                criterion={currentCriterion}
                onSubmit={handleAnswerSubmit}
                onSkip={handleSkip}
                onBack={() => {
                    if (currentCriterionIndex > 0) {
                        setCurrentCriterionIndex(currentCriterionIndex - 1);
                        window.scrollTo(0, 0);
                    } else {
                        setView('selector');
                    }
                }}
            />

            {showFeedback && (
                <FeedbackModal
                    criterion={currentCriterion}
                    userResult={userResult}
                    onNext={handleFeedbackComplete}
                    isLastCriterion={currentCriterionIndex === applicableCriteria.length - 1}
                />
            )}
        </div>
    );
};

export default FingerprintsQuizPlayer;
