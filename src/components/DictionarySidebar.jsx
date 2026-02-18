import React, { useState, useMemo } from 'react';
import { useUser } from '../contexts/UserContext';
import GuruTracker from './GuruTracker';

const DictionarySidebar = ({ data, selectedTopicId, onSelectTopic }) => {
    const { userProgress } = useUser();

    // State to track expanded sections.
    // We ideally want the section containing the selected topic to be open.
    // For now, let's allow independent toggling.
    const [expandedIds, setExpandedIds] = useState(new Set());

    const toggleExpand = (id, e) => {
        e.stopPropagation();
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIds(newSet);
    };

    // Calculate Progress for Guru
    // We count how many unique topics have at least one level passed > 80% (Mastery)
    // Or just look at userProgress.mastery if available.
    const guruStats = useMemo(() => {
        if (!userProgress || !userProgress.history) {
            return { progress: 0, level: 'Apprentice' };
        }

        // Count mastered topics (score >= 80% stored in mastery map)
        // Note: UserContext updates mastery map with percentage.
        const masteryMap = userProgress.mastery || {};
        const masteredCount = Object.values(masteryMap).filter(score => score >= 80).length;

        // Total Estimated Topics in Dictionary
        // We can count them from 'data' prop
        let totalTopics = 0;
        data.volumes.forEach(v => v.parts.forEach(p => totalTopics += p.topics.length));

        // Avoid division by zero
        if (totalTopics === 0) totalTopics = 1;

        const percent = Math.min(100, Math.round((masteredCount / totalTopics) * 100));

        // Determine Rank Title
        let title = "Apprentice";
        if (percent >= 10) title = "Novice";
        if (percent >= 25) title = "Adept";
        if (percent >= 50) title = "Synthesist";
        if (percent >= 75) title = "Virtuoso";
        if (percent >= 90) title = "Guru";
        if (percent >= 100) title = "Legend";

        return { progress: percent, level: title };
    }, [userProgress, data]);

    // Helper to get topic status from userProgress
    const getTopicStatus = (topic) => {
        if (!userProgress || !userProgress.mastery) return null;

        // The mastery map keys are tricky. They are usually "Topic Title - Level".
        // Or sometimes just "Topic Title"?
        // Let's check how saveQuizResult saves it:
        // const topicName = quizTitle.split(':')[0].replace('Topic ', '').trim();
        // Wait, saveQuizResult logic (from UserContext.jsx):
        // const topicName = quizTitle.split(':')[0].replace('Topic ', '').trim();
        // If quiz title is "Topic 1.1: Audio - Basic", then topicName is "1.1: Audio".
        // If quiz title is "Digital Audio Fundamentals - Basic", then topicName is "Digital Audio Fundamentals - Basic" (no colon).

        // Actually, my DictionaryQuizSelector constructs title as: `${topic.title} - ${level...}`
        // So `saveQuizResult` logic might need inspection.
        // Line 62 of UserContext: `const topicName = quizTitle.split(':')[0].replace('Topic ', '').trim();`
        // If I pass "EQ - Basic", it saves as "EQ - Basic".
        // If I pass "Topic 1: EQ - Basic", it saves as "1: EQ - Basic".

        // For the purpose of the sidebar, we want to know if *any* level of this topic is done.
        // We can search the mastery keys for the Topic Title.

        const topicTitle = topic.title;
        const keys = Object.keys(userProgress.mastery);

        // Find keys that contain the topic title
        const relevantKeys = keys.filter(k => k.includes(topicTitle));

        if (relevantKeys.length === 0) return 'unattempted';

        // Check scores
        const maxScore = Math.max(...relevantKeys.map(k => userProgress.mastery[k]));

        if (maxScore >= 80) return 'mastered';
        return 'in-progress';
    };

    return (
        <div className="dictionary-sidebar" style={{
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-color)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Scrollable Tree Area */}
            <div style={{ flex: '1', overflowY: 'auto', padding: '10px' }}>
                <h3 style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)', marginBottom: '10px' }}>
                    Navigation
                </h3>

                {data.volumes.map(vol => (
                    <div key={vol.id} className="nav-volume" style={{ marginBottom: '15px' }}>
                        <div
                            onClick={(e) => toggleExpand(vol.id, e)}
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                color: 'var(--text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '5px'
                            }}
                        >
                            <span style={{ marginRight: '8px', fontSize: '0.8em' }}>
                                {expandedIds.has(vol.id) ? '▼' : '▶'}
                            </span>
                            {vol.title}
                        </div>

                        {expandedIds.has(vol.id) && (
                            <div style={{ paddingLeft: '15px' }}>
                                {vol.parts.map(part => {
                                    const partKey = `${vol.id}_${part.id}`;

                                    // Flatten "All Topics" parts (auto-show topics directly)
                                    if (part.title === 'All Topics') {
                                        return (
                                            <div key={part.id} style={{ paddingLeft: '15px' }}>
                                                {part.topics.map(topic => {
                                                    const status = getTopicStatus(topic);
                                                    return (
                                                        <div
                                                            key={topic.id}
                                                            onClick={() => onSelectTopic(vol, part, topic)}
                                                            className={`nav-topic ${selectedTopicId === topic.id ? 'active' : ''}`}
                                                            style={{
                                                                padding: '6px 10px',
                                                                cursor: 'pointer',
                                                                fontSize: '0.9em',
                                                                color: selectedTopicId === topic.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                                                background: selectedTopicId === topic.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                                                borderRadius: '4px',
                                                                marginTop: '2px',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <span>{topic.title}</span>
                                                            {status === 'mastered' && (
                                                                <span style={{ color: 'var(--accent-success)', fontSize: '0.8em' }}>✓</span>
                                                            )}
                                                            {status === 'in-progress' && (
                                                                <span style={{ color: '#facc15', fontSize: '1.2em', lineHeight: 0.5 }}>•</span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    }

                                    return (
                                        <div key={part.id} className="nav-part" style={{ marginBottom: '10px' }}>
                                            <div
                                                onClick={(e) => toggleExpand(partKey, e)}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.95em',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    marginBottom: '3px'
                                                }}
                                            >
                                                <span style={{ marginRight: '8px', fontSize: '0.8em' }}>
                                                    {expandedIds.has(partKey) ? '▼' : '▶'}
                                                </span>
                                                {part.title}
                                            </div>

                                            {expandedIds.has(partKey) && (
                                                <div style={{ paddingLeft: '15px', borderLeft: '1px solid var(--border-color)' }}>
                                                    {part.topics.map(topic => {
                                                        const status = getTopicStatus(topic);
                                                        return (
                                                            <div
                                                                key={topic.id}
                                                                onClick={() => onSelectTopic(vol, part, topic)}
                                                                className={`nav-topic ${selectedTopicId === topic.id ? 'active' : ''}`}
                                                                style={{
                                                                    padding: '6px 10px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.9em',
                                                                    color: selectedTopicId === topic.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                                                    background: selectedTopicId === topic.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                                                    borderRadius: '4px',
                                                                    marginTop: '2px',
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <span>{topic.title}</span>
                                                                {status === 'mastered' && (
                                                                    <span style={{ color: 'var(--accent-success)', fontSize: '0.8em' }}>✓</span>
                                                                )}
                                                                {status === 'in-progress' && (
                                                                    <span style={{ color: '#facc15', fontSize: '1.2em', lineHeight: 0.5 }}>•</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Sticky Footer: Guru Tracker */}
            <div style={{
                borderTop: '1px solid var(--border-color)',
                padding: '10px',
                background: 'var(--bg-card)'
            }}>
                <GuruTracker progress={guruStats.progress} levelTitle={guruStats.level} />
            </div>
        </div>
    );
};

export default DictionarySidebar;
