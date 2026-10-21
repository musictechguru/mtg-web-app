import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import campaignData from '../data/campaign_route.json';
import courseData from '../data/course_data.json';

const CampaignMap = ({ onNavigate }) => {
    const { userProgress, setCampaignCompletedNodes } = useUser();
    const scrollRef = useRef(null);

    const isDev = Boolean(import.meta.env.DEV);
    const [devMode, setDevMode] = useState(() => {
        if (!isDev) return false;
        try {
            return localStorage.getItem('mtg_dev_mode') === 'true';
        } catch (e) {
            return false;
        }
    });

    const toggleDevMode = () => {
        if (!isDev) return;
        const next = !devMode;
        setDevMode(next);
        try {
            localStorage.setItem('mtg_dev_mode', next ? 'true' : 'false');
        } catch (e) {}
    };

    // Keyboard shortcut: Shift + D toggles Dev Mode (ONLY in local development)
    useEffect(() => {
        if (!isDev) return;
        const handleKeyDown = (e) => {
            if ((e.shiftKey && (e.key === 'D' || e.key === 'd')) || (e.altKey && (e.key === 'D' || e.key === 'd'))) {
                // Ignore if user is typing in an input or textarea
                if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
                e.preventDefault();
                toggleDevMode();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [devMode, isDev]);

    const completedNodes = userProgress?.campaignCompleted || [];

    // Determine unlocked and active status for each node
    // Rule 1: In Dev Mode, ALL nodes are immediately unlocked
    // Rule 2: The first node of any standard round is unlocked
    // Rule 3: subsequent nodes in a round are unlocked if the previous node IS completed
    // Rule 4: Exams unlock if the last node of the preceding round is completed
    const isNodeUnlocked = (rIdx, nIdx) => {
        if (devMode) return true;
        if (rIdx === 0 && nIdx === 0) return true;
        const round = campaignData.rounds[rIdx];

        // Node 1 of any non-exam round is always open
        if (nIdx === 0 && !round.title.includes('Exam')) return true;

        if (nIdx > 0) {
            const prevNode = round.nodes[nIdx - 1];
            return completedNodes.includes(prevNode.id);
        }

        // Exam nodes (nIdx === 0 and is Exam)
        if (nIdx === 0 && round.title.includes('Exam') && rIdx > 0) {
            const prevRound = campaignData.rounds[rIdx - 1];
            if (prevRound) {
                const lastNode = prevRound.nodes[prevRound.nodes.length - 1];
                return completedNodes.includes(lastNode.id);
            }
        }
        return false;
    };

    // Find the first active node to scroll to (the first uncompleted node of the lowest round)
    let firstActiveNodeId = null;
    let foundFirstActive = false;
    for (let rIdx = 0; rIdx < campaignData.rounds.length; rIdx++) {
        const round = campaignData.rounds[rIdx];
        for (let nIdx = 0; nIdx < round.nodes.length; nIdx++) {
            const node = round.nodes[nIdx];
            if (!completedNodes.includes(node.id) && isNodeUnlocked(rIdx, nIdx)) {
                if (!foundFirstActive) {
                    firstActiveNodeId = node.id;
                    foundFirstActive = true;
                }
            }
        }
    }

    // Scroll to the first active node
    useEffect(() => {
        if (firstActiveNodeId) {
            const el = document.getElementById(`campaign-node-${firstActiveNodeId}`);
            if (el && scrollRef.current) {
                // Wait for layout to settle
                setTimeout(() => {
                    scrollRef.current.scrollTo({
                        left: el.offsetLeft - scrollRef.current.offsetWidth / 2 + el.offsetWidth / 2,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }, [firstActiveNodeId]);

    const handleNodeClick = async (node, isActive, isCompleted) => {
        if (!devMode && !isCompleted && !isActive) return;

        let targetItem = null;
        if (node.type === 'course') {
            for (const section of courseData.sections) {
                for (const item of section.items) {
                    if (item.id === node.quizId || item.title === node.title) {
                        targetItem = { ...item, campaignNodeId: node.id };
                        break;
                    }
                }
                if (targetItem) break;
            }
        } else if (node.type === 'dictionary') {
            const { default: dictionaryData } = await import('../data/dictionary_quizzes.json');
            let topicObj = null;
            dictionaryData.volumes.forEach(v => v.parts.forEach(p => p.topics.forEach(t => {
                if (t.id === node.topicId) topicObj = t;
            })));
            if (topicObj && topicObj.levels[node.level]) {
                targetItem = {
                    type: 'lp_quiz',
                    id: `${topicObj.id}_${node.level}`,
                    title: `${topicObj.title} - ${node.level.charAt(0).toUpperCase() + node.level.slice(1)}`,
                    questions: topicObj.levels[node.level],
                    campaignNodeId: node.id
                };
            }
        } else if (node.type === 'exam') {
            let examId = 'c3_funk'; 
            let examType = 'component3_exam';

            if (node.quizId === 'exam_1') {
                examId = 'c3_funk';
                examType = 'component3_exam';
            } else if (node.quizId === 'exam_2') {
                examId = 'c4_edm';
                examType = 'component4_exam';
            } else if (node.quizId === 'exam_3') {
                examId = 'c3_heavyrock';
                examType = 'component3_exam';
            } else if (node.quizId === 'exam_4') {
                examId = 'c4_spop';
                examType = 'component4_exam';
            } else if (node.quizId === 'exam_5') {
                examId = 'c3_synthpop';
                examType = 'component3_exam';
            }

            targetItem = { type: examType, id: examId, title: node.title, campaignNodeId: node.id };
        } else if (node.type === 'roulette') {
            // Russian Roulette Mega Quiz: gather diverse questions across all stages
            const pool = [];
            (courseData.sections || []).forEach(section => {
                (section.items || []).forEach(item => {
                    if (Array.isArray(item.questions) && item.questions.length > 0) {
                        item.questions.forEach(q => {
                            if (q.answers || q.correct_order || q.audio_src || q.audio_a || q.targetNumber || q.hotspots || q.options) {
                                pool.push({ ...q, sourceQuiz: item.title });
                            }
                        });
                    }
                });
            });

            // Randomize and select 25 challenging questions
            const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, 25);

            targetItem = {
                type: 'lp_quiz',
                id: 'russian_roulette_mega_quiz',
                title: 'Russian Roulette: Mega Quiz',
                campaignNodeId: node.id,
                randomise: false,
                questions: selected
            };
        }

        if (targetItem) {
            onNavigate(targetItem);
        } else {
            console.error("Could not find target item for node:", node);
            alert("This content is still under construction! Could not load the quiz.");
        }
    };

    const handleJumpToRound = (rIdx) => {
        const round = campaignData.rounds[rIdx];
        if (round && round.nodes[0]) {
            const el = document.getElementById(`campaign-node-${round.nodes[0].id}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const unlockUpToRound5 = () => {
        const priorNodes = [];
        for (let r = 0; r <= 5; r++) {
            campaignData.rounds[r].nodes.forEach(n => priorNodes.push(n.id));
        }
        const round5 = campaignData.rounds[6];
        if (round5) {
            round5.nodes.slice(0, 7).forEach(n => priorNodes.push(n.id));
        }
        if (setCampaignCompletedNodes) {
            setCampaignCompletedNodes(priorNodes);
        }
    };

    const resetMapProgress = () => {
        if (setCampaignCompletedNodes) {
            setCampaignCompletedNodes([]);
        }
    };

    // We need to group rounds into pairs ("2 stages") followed by an Exam.
    // However, our data is flat: 10 rounds, 5 exams. 
    // They are logically ordered: Vol 1, Vol 2, Exam 1, Vol 3, Vol 4, Exam 2, etc.
    // Let's create a visual layout where each "Block" is [Vol A, Vol B, Exam].
    // And lay them out vertically or in a wrapping flexbox.

    const blocks = [];
    let currentBlock = [];
    campaignData.rounds.forEach(r => {
        currentBlock.push(r);
        if (r.type === 'exam' || r.title.includes('Exam') || r.title.includes('Roulette')) {
            blocks.push(currentBlock);
            currentBlock = [];
        }
    });
    if (currentBlock.length > 0) blocks.push(currentBlock);

    return (
        <div style={{ background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', marginBottom: '40px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ maxWidth: '100%' }}>
                    <h2 style={{ margin: 0, color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                        {campaignData.campaignName}
                    </h2>
                    <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{campaignData.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isDev && (
                        <button
                            onClick={toggleDevMode}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: devMode ? '#eab308' : '#1e293b',
                                border: devMode ? '2px solid #ca8a04' : '2px solid #eab308',
                                color: devMode ? '#0f172a' : '#fef08a',
                                padding: '8px 16px',
                                borderRadius: '24px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.88rem',
                                boxShadow: devMode ? '0 0 15px rgba(234, 179, 8, 0.6)' : '0 2px 6px rgba(0,0,0,0.3)',
                                transition: 'all 0.2s ease'
                            }}
                            title="Toggle Dev Mode (Shortcut: Shift + D) to unlock all nodes"
                        >
                            <span>{devMode ? '🔓 Dev Mode: ON (Click to Turn OFF)' : '⚡ Dev Mode: OFF (Click to Enable)'}</span>
                        </button>
                    )}
                    <div style={{ fontWeight: 'bold', color: 'var(--accent-success)', background: 'rgba(34, 197, 94, 0.1)', padding: '5px 15px', borderRadius: '20px' }}>
                        {completedNodes.length} / {campaignData.rounds.reduce((acc, r) => acc + r.nodes.length, 0)} Nodes
                    </div>
                </div>
            </div>

            {devMode && (
                <div style={{
                    padding: '12px 20px',
                    background: 'rgba(234, 179, 8, 0.08)',
                    borderBottom: '1px solid rgba(234, 179, 8, 0.2)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    fontSize: '0.85rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fef08a', fontWeight: 'bold' }}>
                        <span>🛠️ Dev Mode Active (Shift + D):</span>
                        <span style={{ fontWeight: 'normal', color: '#cbd5e1' }}>All nodes unlocked &amp; clickable</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <select
                            onChange={(e) => {
                                if (e.target.value !== '') {
                                    handleJumpToRound(Number(e.target.value));
                                }
                            }}
                            style={{
                                background: '#1e293b',
                                color: '#f8fafc',
                                border: '1px solid #475569',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                            }}
                            defaultValue=""
                        >
                            <option value="" disabled>📍 Jump to Stage / Round...</option>
                            {campaignData.rounds.map((r, idx) => (
                                <option key={idx} value={idx}>{r.title}</option>
                            ))}
                        </select>
                        <button
                            onClick={unlockUpToRound5}
                            style={{
                                background: 'rgba(59, 130, 246, 0.2)',
                                border: '1px solid #3b82f6',
                                color: '#93c5fd',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.8rem'
                            }}
                            title="Marks Rounds 1-4 and start of Round 5 complete so C4 lessons are unlocked"
                        >
                            ⏩ Fast-Forward to Round 5 Lessons
                        </button>
                        <button
                            onClick={resetMapProgress}
                            style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: '1px solid #ef4444',
                                color: '#fca5a5',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.8rem'
                            }}
                            title="Reset all campaign completed nodes"
                        >
                            🔄 Reset Map Progress
                        </button>
                        <button
                            onClick={toggleDevMode}
                            style={{
                                background: '#dc2626',
                                border: '1px solid #ef4444',
                                color: '#ffffff',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.8rem'
                            }}
                            title="Turn Dev Mode OFF"
                        >
                            ✕ Turn Dev Mode OFF
                        </button>
                    </div>
                </div>
            )}

            <div
                ref={scrollRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '40px 20px',
                    gap: '60px',
                    alignItems: 'center',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(59, 130, 246, 0.05) 100%)',
                }}
            >
                {blocks.map((block, bIdx) => (
                    <div key={bIdx} className="round-block" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '40px',
                        background: 'rgba(255,255,255,0.02)',
                        padding: '40px',
                        borderRadius: '24px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        width: '100%',
                        maxWidth: '1200px'
                    }}>
                        {block.map((round, innerIdx) => {
                            // Find absolute round index for logic
                            const rIdx = campaignData.rounds.findIndex(r => r === round);
                            const isFinalNode = round.type === 'exam' || round.title.includes('Exam') || round.title.includes('Roulette');

                            return (
                                <div key={rIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                    <div style={{
                                        marginBottom: '30px',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        color: isFinalNode ? 'var(--accent-gold)' : 'var(--text-primary)',
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '8px 20px',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {round.title}
                                    </div>

                                    {/* Circle Layout for Nodes within a Round */}
                                    <div className="round-nodes-container" style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        maxWidth: isFinalNode ? '200px' : '400px',
                                        gap: '20px 40px',
                                        alignItems: 'flex-start'
                                    }}>
                                        {round.nodes.map((node, nIdx) => {
                                            const isCompleted = completedNodes.includes(node.id);
                                            const isUnlocked = isNodeUnlocked(rIdx, nIdx);
                                            const isActive = isUnlocked && !isCompleted;
                                            const isLocked = !isCompleted && !isActive;

                                            let nodeColor = 'var(--bg-secondary)';
                                            let borderColor = 'var(--border-color)';
                                            if (isCompleted) {
                                                nodeColor = 'var(--accent-success)';
                                                borderColor = 'var(--accent-success)';
                                            } else if (isActive) {
                                                nodeColor = 'var(--accent-blue)';
                                                borderColor = 'var(--accent-blue)';
                                            }

                                            const isExam = node.type === 'exam' || node.type === 'roulette';
                                            const nodeSize = isExam ? 90 : 65;

                                            return (
                                                <div key={node.id} className="campaign-node-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
                                                    <div
                                                        id={`campaign-node-${node.id}`}
                                                        onClick={() => handleNodeClick(node, isActive, isCompleted)}
                                                        style={{
                                                            width: `${nodeSize}px`,
                                                            height: `${nodeSize}px`,
                                                            borderRadius: '50%',
                                                            background: nodeColor,
                                                            border: isActive ? '4px solid rgba(255,255,255,0.5)' : '2px solid ' + borderColor,
                                                            boxShadow: isActive ? '0 0 20px rgba(59, 130, 246, 0.8)' : (isExam && isCompleted ? '0 0 15px var(--accent-gold)' : '0 4px 6px rgba(0,0,0,0.3)'),
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            cursor: isLocked ? 'not-allowed' : 'pointer',
                                                            opacity: isLocked ? 0.4 : 1,
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            zIndex: 2,
                                                            transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                                            marginBottom: '15px'
                                                        }}
                                                        title={node.title}
                                                        className={isActive ? 'pulse-node' : ''}
                                                    >
                                                        {isCompleted && (
                                                            <svg width={isExam ? "45" : "30"} height={isExam ? "45" : "30"} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12"></polyline>
                                                            </svg>
                                                        )}
                                                        {isActive && !isExam && (
                                                            <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>START</div>
                                                        )}
                                                        {isActive && isExam && (
                                                            <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                                                                {node.type === 'roulette' ? 'SPIN' : 'EXAM'}
                                                            </div>
                                                        )}
                                                        {isLocked && (
                                                            <svg width={isExam ? "32" : "24"} height={isExam ? "32" : "24"} viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                            </svg>
                                                        )}
                                                    </div>

                                                    <div style={{
                                                        textAlign: 'center',
                                                        fontSize: '0.8rem',
                                                        color: isActive ? 'var(--accent-blue)' : (isCompleted ? 'var(--text-primary)' : 'rgba(255,255,255,0.6)'),
                                                        fontWeight: isActive ? 'bold' : 'normal',
                                                        lineHeight: '1.2'
                                                    }}>
                                                        {node.title}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .pulse-node {
                    animation: pulse-glow 2s infinite;
                }
                @keyframes pulse-glow {
                    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                    70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                }
                /* Hide scrollbar for cleaner look but remain scrollable */
                div::-webkit-scrollbar {
                    display: none;
                }
                div {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}} />
        </div >
    );
};

export default CampaignMap;
