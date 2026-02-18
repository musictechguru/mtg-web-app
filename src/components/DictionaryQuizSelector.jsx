import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import dictionaryData from '../data/dictionary_quizzes.json';
import DictionarySidebar from './DictionarySidebar';

const DictionaryQuizSelector = ({ onSelectQuiz, onBack }) => {
    // We now track the full selection path.
    // If nothing is selected, we might show a "Welcome/Root" view, 
    // but with the sidebar, we can always show the sidebar.
    const [selectedVolume, setSelectedVolume] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const { userProgress } = useUser(); // Access progress to show scores

    // Effect to auto-expand sidebar or manage mobile view could go here.

    const handleTopicSelect = (vol, part, topic) => {
        setSelectedVolume(vol);
        setSelectedPart(part);
        setSelectedTopic(topic);
        window.scrollTo(0, 0);
    };

    const handleLevelSelect = (level) => {
        if (!selectedTopic) return;
        const quizObject = {
            id: `${selectedTopic.id}_${level}`,
            // NOTE: This Title formatting must match what we look for in mastery if we want exact matches,
            // or we rely on the substring matching we added to Sidebar.
            title: `${selectedTopic.title} - ${level.charAt(0).toUpperCase() + level.slice(1)}`,
            description: `Level: ${level.toUpperCase()}`,
            questions: selectedTopic.levels[level]
        };
        onSelectQuiz(quizObject);
    };

    const handleRandomQuiz = (mode) => {
        // Aggregate all questions
        let allQuestions = [];
        dictionaryData.volumes.forEach(vol => {
            vol.parts.forEach(part => {
                part.topics.forEach(topic => {
                    ['basic', 'intermediate', 'advanced', 'master'].forEach(level => {
                        // Filter Logic
                        const isBasic = level === 'basic';
                        const isAdvanced = ['intermediate', 'advanced', 'master'].includes(level);

                        let shouldInclude = false;
                        if (mode === 'basic' && isBasic) shouldInclude = true;
                        if (mode === 'advanced' && isAdvanced) shouldInclude = true;
                        if (mode === 'all') shouldInclude = true; // Legacy support or "Chaos Mode" if we want

                        if (shouldInclude && topic.levels[level]) {
                            // Add metadata
                            const questionsWithSource = topic.levels[level].map(q => ({
                                ...q,
                                _sourceTopic: topic.title,
                                _sourceLevel: level
                            }));
                            allQuestions = allQuestions.concat(questionsWithSource);
                        }
                    });
                });
            });
        });

        // Fisher-Yates Shuffle
        for (let i = allQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
        }

        // Slice first 20
        const selectedQuestions = allQuestions.slice(0, 20);

        const titleMap = {
            'basic': 'Foundation Roulette (Basic)',
            'advanced': 'Pro Roulette (Intermediate+)',
            'all': 'Terminology Roulette'
        };

        const quizObject = {
            id: `random_roulette_${mode}_${Date.now()}`,
            title: titleMap[mode],
            description: `20 Random Questions (${mode === 'all' ? 'Mixed' : mode === 'basic' ? 'Basic Only' : 'Intermediate & Advanced'})`,
            questions: selectedQuestions
        };

        onSelectQuiz(quizObject);
    };

    // Helper to get score for a level
    const getLevelScore = (level) => {
        if (!userProgress || !userProgress.mastery || !selectedTopic) return null;

        // We need to match the key that UserContext saves.
        // It saves "TopicName" extracted from title.
        // Our title is `${selectedTopic.title} - ${level...}`
        const expectedKeyPart = selectedTopic.title;
        // And possibly the level?
        // UserContext logic: `const topicName = quizTitle.split(':')[0].replace('Topic ', '').trim();`
        // If our title has no colon, it uses the whole title.
        // So key might be "EQ - Basic".

        const searchKey = `${selectedTopic.title} - ${level.charAt(0).toUpperCase() + level.slice(1)}`;
        // Check for exact match first
        if (userProgress.mastery[searchKey]) return userProgress.mastery[searchKey];

        // Or check fuzzy
        const keys = Object.keys(userProgress.mastery);
        const match = keys.find(k => k.includes(searchKey));
        return match ? userProgress.mastery[match] : null;
    };

    // Responsive helper: On mobile, we might want to hide sidebar if a topic is selected?
    // For now, let's build a standard desktop 2-column layout.

    return (
        <div className="dictionary-layout" style={{ display: 'flex', minHeight: '80vh', gap: '20px' }}>

            {/* Sidebar Region - Fixed width or flexible */}
            <div className="sidebar-region" style={{ flex: '0 0 300px', borderRight: '1px solid var(--border-color)' }}>
                <DictionarySidebar
                    data={dictionaryData}
                    selectedTopicId={selectedTopic?.id}
                    onSelectTopic={handleTopicSelect}
                />
            </div>

            {/* Main Content Region */}
            <div className="content-region" style={{ flex: '1', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    {/* Breadcrumbs or Title */}
                    {selectedTopic ? (
                        <div>
                            <div style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
                                {selectedVolume?.title} &gt; {selectedPart?.title}
                            </div>
                            <h1 style={{ margin: '5px 0' }}>{selectedTopic.title}</h1>
                        </div>
                    ) : (
                        <h1>Dictionary Quizzes</h1>
                    )}
                </div>

                {selectedTopic ? (
                    <div className="level-selection">
                        <h3 style={{ marginBottom: '20px' }}>Select Difficulty Level</h3>
                        <div className="level-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                            {['basic', 'intermediate', 'advanced', 'master'].map(level => {
                                const questionCount = selectedTopic.levels[level]?.length || 0;
                                if (questionCount === 0) return null; // Hide empty levels

                                const score = getLevelScore(level);
                                const isMastered = score >= 80;
                                const hasAttempted = score !== null;

                                return (
                                    <div
                                        key={level}
                                        className={`level-card ${level}`}
                                        onClick={() => handleLevelSelect(level)}
                                        style={{
                                            padding: '30px',
                                            borderRadius: '12px',
                                            background: 'var(--bg-card)',
                                            border: isMastered ? '2px solid var(--accent-success)' : hasAttempted ? '1px solid #facc15' : '1px solid var(--border-color)',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'transform 0.2s',
                                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                            position: 'relative'
                                        }}
                                    >
                                        {hasAttempted && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: isMastered ? 'var(--accent-success)' : '#facc15',
                                                color: '#000',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {score}%
                                            </div>
                                        )}
                                        <h2 style={{ textTransform: 'capitalize', color: 'var(--accent-blue)', marginBottom: '10px' }}>{level}</h2>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                            {level === 'basic' && 'GCSE Level Questions (Core Concepts)'}
                                            {level === 'intermediate' && 'A Level Questions (Deep Dives)'}
                                            {level === 'advanced' && 'Degree Level (Complex Theory)'}
                                            {level === 'master' && 'Expert Level (Niche trivia)'}
                                        </div>
                                        <div style={{ marginTop: '15px', fontWeight: 'bold' }}>
                                            {questionCount} Questions
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="welcome-state">
                        <div style={{ textAlign: 'center', padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                            <h2 style={{ fontSize: '2em', marginBottom: '10px', color: 'var(--text-primary)' }}>Dictionary Quizzes</h2>
                            <p style={{ fontSize: '1.1em', color: 'var(--text-secondary)', marginBottom: '40px' }}>
                                Select a topic from the sidebar to revise specific terms, or test your overall knowledge with a random mix.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px', placeItems: 'stretch' }}>
                                {/* Basic / Foundation Card */}
                                <div
                                    onClick={() => handleRandomQuiz('basic')}
                                    style={{
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                        padding: '30px',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '15px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        height: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(59, 130, 246, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
                                    }}
                                >
                                    <div style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        padding: '15px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2v20M2 12h20"></path> {/* Plus sign / Basic icon */}
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.4em' }}>Foundation Roulette</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '0.9em' }}>
                                            20 random <strong>Basic</strong> questions. Perfect for GCSE revision.
                                        </p>
                                    </div>
                                </div>

                                {/* Intermediate / Advanced Card */}
                                <div
                                    onClick={() => handleRandomQuiz('advanced')}
                                    style={{
                                        background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                                        padding: '30px',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '15px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        height: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(236, 72, 153, 0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(236, 72, 153, 0.4)';
                                    }}
                                >
                                    <div style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        padding: '15px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path> {/* Star / Advanced */}
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.4em' }}>Pro Roulette</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '0.9em' }}>
                                            20 random <strong>Intermediate & Advanced</strong> questions for A Level+.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DictionaryQuizSelector;
