import React, { useState, useEffect, useMemo } from 'react';
import './TimetableBuilder.css';
import { TIMETABLE_BLOCKS, SOW_RANKS, calculateSowProgress } from './timetableData';
import courseData from '../../data/course_data.json';

const TimetableBuilder = ({ onNavigate, onBack }) => {
  // Local state persistence
  const [completedBlocks, setCompletedBlocks] = useState(() => {
    try {
      const saved = localStorage.getItem('mtg_sow_completed_blocks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedHours, setCompletedHours] = useState(() => {
    try {
      const saved = localStorage.getItem('mtg_sow_completed_hours');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedSkills, setCompletedSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('mtg_sow_completed_skills');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedFacts, setCompletedFacts] = useState(() => {
    try {
      const saved = localStorage.getItem('mtg_sow_completed_facts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [viewMode, setViewMode] = useState('skills'); // 'skills' | 'map' | 'grid' | 'facts'
  const [filterPhase, setFilterPhase] = useState('all'); // 'all' | 'year1' | 'year2' | 'boss'
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [activeFactsBlockId, setActiveFactsBlockId] = useState(TIMETABLE_BLOCKS[0].id);
  const [activeSkillsBlockId, setActiveSkillsBlockId] = useState(TIMETABLE_BLOCKS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('mtg_sow_completed_blocks', JSON.stringify(completedBlocks));
    } catch (e) {
      console.warn('Failed to save completed blocks locally', e);
    }
  }, [completedBlocks]);

  useEffect(() => {
    try {
      localStorage.setItem('mtg_sow_completed_hours', JSON.stringify(completedHours));
    } catch (e) {
      console.warn('Failed to save completed hours locally', e);
    }
  }, [completedHours]);

  useEffect(() => {
    try {
      localStorage.setItem('mtg_sow_completed_skills', JSON.stringify(completedSkills));
    } catch (e) {
      console.warn('Failed to save completed skills locally', e);
    }
  }, [completedSkills]);

  useEffect(() => {
    try {
      localStorage.setItem('mtg_sow_completed_facts', JSON.stringify(completedFacts));
    } catch (e) {
      console.warn('Failed to save completed facts locally', e);
    }
  }, [completedFacts]);

  const stats = useMemo(() => {
    return calculateSowProgress(completedBlocks, completedSkills);
  }, [completedBlocks, completedSkills]);

  // Filter blocks
  const filteredBlocks = useMemo(() => {
    return TIMETABLE_BLOCKS.filter(b => {
      if (filterPhase === 'year1' && b.phase !== 'Year 1') return false;
      if (filterPhase === 'year2' && b.phase !== 'Year 2') return false;
      if (filterPhase === 'boss' && !b.isBossBlock) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(q) || b.subtitle.toLowerCase().includes(q);
        const matchesListening = b.listening.genres.toLowerCase().includes(q) ||
          b.listening.tracks.some(t => t.artist.toLowerCase().includes(q) || t.title.toLowerCase().includes(q));
        const matchesTech = b.technical.topics.some(top => top.toLowerCase().includes(q));
        const matchesSkills = b.skillsMap && b.skillsMap.some(s =>
          s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
        );
        return matchesTitle || matchesListening || matchesTech || matchesSkills;
      }

      return true;
    });
  }, [filterPhase, searchQuery]);

  const selectedBlock = useMemo(() => {
    return TIMETABLE_BLOCKS.find(b => b.id === selectedBlockId) || null;
  }, [selectedBlockId]);

  const toggleBlockMastered = (blockId, e) => {
    if (e) e.stopPropagation();
    setCompletedBlocks(prev => {
      if (prev.includes(blockId)) {
        return prev.filter(id => id !== blockId);
      } else {
        return [...prev, blockId];
      }
    });
  };

  const toggleHourCompleted = (hourKey, e) => {
    if (e) e.stopPropagation();
    setCompletedHours(prev => ({
      ...prev,
      [hourKey]: !prev[hourKey]
    }));
  };

  const toggleSkillCompleted = (skillId, e) => {
    if (e) e.stopPropagation();
    setCompletedSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const toggleAllSkillsForBlock = (block) => {
    const blockSkillIds = (block.skillsMap || []).map(s => s.id);
    const allDone = blockSkillIds.every(id => completedSkills.includes(id));
    if (allDone) {
      setCompletedSkills(prev => prev.filter(id => !blockSkillIds.includes(id)));
    } else {
      setCompletedSkills(prev => Array.from(new Set([...prev, ...blockSkillIds])));
    }
  };

  const toggleFactCompleted = (factKey, e) => {
    if (e) e.stopPropagation();
    setCompletedFacts(prev => {
      if (prev.includes(factKey)) {
        return prev.filter(k => k !== factKey);
      } else {
        return [...prev, factKey];
      }
    });
  };

  // Launch MTG Quiz directly into the App
  const handleLaunchQuiz = (quizId, quizTitle) => {
    if (!onNavigate) return;
    let foundItem = null;
    for (const section of courseData.sections || []) {
      for (const item of section.items || []) {
        if (item.id === quizId || item.title === quizTitle) {
          foundItem = item;
          break;
        }
      }
      if (foundItem) break;
    }

    if (foundItem) {
      onNavigate(foundItem);
    } else {
      onNavigate({ type: 'lp_quiz', id: quizId, title: quizTitle });
    }
  };

  // Launch Tracksheet Creator
  const handleLaunchTracksheet = () => {
    if (onNavigate) {
      onNavigate({ type: 'tracksheet_creator', title: 'Component 1: Track Sheet & Logbook' });
    }
  };

  const getCategoryClass = (cat = '') => {
    const lower = cat.toLowerCase();
    if (lower.includes('listening')) return 'listening';
    if (lower.includes('capture')) return 'capture';
    if (lower.includes('production')) return 'production';
    if (lower.includes('dsp') || lower.includes('technical')) return 'dsp';
    if (lower.includes('hardware') || lower.includes('routing')) return 'hardware';
    if (lower.includes('coursework') || lower.includes('nea')) return 'coursework';
    if (lower.includes('exam')) return 'exam';
    return '';
  };

  return (
    <div className="timetable-container">
      {/* Top Breadcrumb / Return */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#94a3b8',
            padding: '8px 16px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
        >
          ← Back to Dashboard
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => window.print()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            🖨️ Print / Save Plan
          </button>
        </div>
      </div>

      {/* Gaming HUD / Level Progress Header */}
      <div className="sow-hud">
        <div className="hud-top">
          <div className="hud-title-area">
            <h1>
              <span>🗺️</span> 16-Block Timetable & Scheme of Work
            </h1>
            <p className="hud-subtitle">
              Edexcel A-Level Music Technology (9MT0) • 24 Weeks/Year Framework (3 Weeks / 12h per Block)
            </p>
          </div>

          <div className="hud-stats-badges">
            <div className="hud-badge">
              <span className="hud-badge-icon">{stats.rank.badge}</span>
              <div className="hud-badge-info">
                <span className="hud-badge-label">Curriculum Rank</span>
                <span className="hud-badge-val" style={{ color: '#38bdf8' }}>{stats.rank.title}</span>
              </div>
            </div>

            <div className="hud-badge">
              <span className="hud-badge-icon">🏆</span>
              <div className="hud-badge-info">
                <span className="hud-badge-label">Blocks Mastered</span>
                <span className="hud-badge-val">{stats.completedCount} / {stats.totalBlocks}</span>
              </div>
            </div>

            <div className="hud-badge">
              <span className="hud-badge-icon">🎯</span>
              <div className="hud-badge-info">
                <span className="hud-badge-label">Skills Mastered</span>
                <span className="hud-badge-val" style={{ color: '#10b981' }}>
                  {stats.skillsDoneCount} / {stats.totalSkills}
                </span>
              </div>
            </div>

            <div className="hud-badge">
              <span className="hud-badge-icon">⏱️</span>
              <div className="hud-badge-info">
                <span className="hud-badge-label">Teaching Hours</span>
                <span className="hud-badge-val">{stats.completedHours} / {stats.totalTeachingHours}h</span>
              </div>
            </div>
          </div>
        </div>

        {/* HUD Progress Bar */}
        <div className="hud-progress-wrapper">
          <div className="hud-progress-labels">
            <span style={{ color: 'var(--text-secondary)' }}>Overall Syllabus Completion</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ color: '#10b981' }}>🎯 {stats.skillsPercent}% Skills</span>
              <span style={{ color: '#38bdf8' }}>🏆 {stats.percent}% Blocks</span>
            </div>
          </div>
          <div className="hud-bar-container">
            <div className="hud-bar-fill" style={{ width: `${Math.max(stats.percent, stats.skillsPercent)}%` }} />
          </div>
        </div>
      </div>

      {/* View Switcher & Filters */}
      <div className="sow-controls">
        <div className="view-mode-tabs">
          <button
            className={`view-tab ${viewMode === 'skills' ? 'active' : ''}`}
            onClick={() => setViewMode('skills')}
          >
            <span>🎯</span> Skills Map
          </button>
          <button
            className={`view-tab ${viewMode === 'map' ? 'active' : ''}`}
            onClick={() => setViewMode('map')}
          >
            <span>🎮</span> Quest Map
          </button>
          <button
            className={`view-tab ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <span>📅</span> Weekly Timetable
          </button>
          <button
            className={`view-tab ${viewMode === 'facts' ? 'active' : ''}`}
            onClick={() => setViewMode('facts')}
          >
            <span>🧠</span> 5–10 Facts Arena
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="filter-pills">
            <button
              className={`filter-pill ${filterPhase === 'all' ? 'active' : ''}`}
              onClick={() => setFilterPhase('all')}
            >
              All 16 Blocks
            </button>
            <button
              className={`filter-pill ${filterPhase === 'year1' ? 'active' : ''}`}
              onClick={() => setFilterPhase('year1')}
            >
              Year 1 (Blocks 1–8)
            </button>
            <button
              className={`filter-pill ${filterPhase === 'year2' ? 'active' : ''}`}
              onClick={() => setFilterPhase('year2')}
            >
              Year 2 (Blocks 9–16)
            </button>
            <button
              className={`filter-pill ${filterPhase === 'boss' ? 'active' : ''}`}
              onClick={() => setFilterPhase('boss')}
              style={{ borderColor: filterPhase === 'boss' ? '#ffd700' : 'rgba(255,215,0,0.3)', color: '#ffd700' }}
            >
              ⚡ Boss Milestones
            </button>
          </div>

          <input
            type="text"
            placeholder="Search skills, topics, gear..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              outline: 'none',
              minWidth: '200px'
            }}
          />
        </div>
      </div>

      {/* =========================================================
          VIEW 0: SKILLS MAP (DISPLAYED LIKE FACTS + TICK SYSTEM)
          ========================================================= */}
      {viewMode === 'skills' && (
        <div className="skills-arena">
          {/* Horizontal Block Selector Bar */}
          <div className="skills-selector-bar">
            {TIMETABLE_BLOCKS.map(block => {
              const blockSkills = block.skillsMap || [];
              const skillsDoneInBlock = blockSkills.filter(s => completedSkills.includes(s.id)).length;
              const isAllComplete = blockSkills.length > 0 && skillsDoneInBlock === blockSkills.length;
              const isSelected = activeSkillsBlockId === block.id;

              return (
                <button
                  key={block.id}
                  className={`skills-block-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveSkillsBlockId(block.id)}
                >
                  <span>{block.icon}</span>
                  <span>Block {block.blockNumber}: {block.title.split('&')[0]}</span>
                  <span className={`skills-badge-mini ${isAllComplete ? 'complete' : ''}`}>
                    {skillsDoneInBlock}/{blockSkills.length} {isAllComplete ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>

          {(() => {
            const activeBlock = TIMETABLE_BLOCKS.find(b => b.id === activeSkillsBlockId);
            if (!activeBlock) return null;

            const blockSkills = activeBlock.skillsMap || [];
            const skillsDoneCount = blockSkills.filter(s => completedSkills.includes(s.id)).length;
            const blockPercent = blockSkills.length > 0 ? Math.round((skillsDoneCount / blockSkills.length) * 100) : 0;
            const allDone = blockSkills.length > 0 && skillsDoneCount === blockSkills.length;

            return (
              <div>
                <div className="skills-header-row">
                  <div>
                    <h2 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span>{activeBlock.icon}</span>
                      Block {activeBlock.blockNumber} Skills Map: {activeBlock.title}
                    </h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {activeBlock.subtitle} • Interactive syllabus competencies checklist with click-to-tick mastery tracking.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: allDone ? '#10b981' : '#38bdf8' }}>
                        {skillsDoneCount} of {blockSkills.length} Skills Mastered ({blockPercent}%)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {activeBlock.weeksLabel} • 3 Weeks (12 Guided Learning Hours)
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAllSkillsForBlock(activeBlock)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        background: allDone ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        border: `1px solid ${allDone ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`,
                        color: allDone ? '#f87171' : '#34d399',
                        fontWeight: '700',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {allDone ? 'Reset Block Skills' : '✓ Mark All Ticked'}
                    </button>
                  </div>
                </div>

                {/* Progress bar for active block */}
                <div className="skills-progress-bar-wrapper">
                  <div className="skills-progress-bar-bg">
                    <div className="skills-progress-bar-fill" style={{ width: `${blockPercent}%` }} />
                  </div>
                </div>

                {/* Skills Cards Grid with Tick System */}
                <div className="skills-cards-grid">
                  {blockSkills.map(skill => {
                    const isTicked = completedSkills.includes(skill.id);
                    const catClass = getCategoryClass(skill.category);

                    return (
                      <div
                        key={skill.id}
                        className={`skill-item-card ${isTicked ? 'ticked' : ''}`}
                        onClick={() => toggleSkillCompleted(skill.id)}
                      >
                        <div
                          className="skill-tick-btn"
                          onClick={(e) => toggleSkillCompleted(skill.id, e)}
                          title={isTicked ? "Click to untick" : "Click to mark skill as mastered"}
                        >
                          {isTicked && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>

                        <div className="skill-content">
                          <div className="skill-meta-row">
                            <span className={`skill-category-tag ${catClass}`}>
                              {skill.category}
                            </span>
                            {isTicked && (
                              <span className="skill-status-tag">✓ Mastered</span>
                            )}
                          </div>

                          <div className="skill-title">{skill.title}</div>
                          <div className="skill-desc">{skill.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================
          VIEW 1: QUEST MAP (GAMIFIED ROAD VIEW)
          ========================================================= */}
      {viewMode === 'map' && (
        <div className="quest-map-view">
          {/* Year 1 Section */}
          {(filterPhase === 'all' || filterPhase === 'year1') && (
            <>
              <div className="year-divider">
                <div className="year-divider-line" />
                <div className="year-divider-pill">Year 1: Audio Foundations & Practice Coursework</div>
                <div className="year-divider-line" />
              </div>

              <div className="quest-grid">
                {filteredBlocks.filter(b => b.phase === 'Year 1').map(block => {
                  const isDone = completedBlocks.includes(block.id);
                  const blockSkills = block.skillsMap || [];
                  const skillsDoneInBlock = blockSkills.filter(s => completedSkills.includes(s.id)).length;

                  return (
                    <div
                      key={block.id}
                      className={`quest-card ${isDone ? 'completed' : ''} ${block.isBossBlock ? 'boss-card' : ''}`}
                      onClick={() => setSelectedBlockId(block.id)}
                    >
                      <div>
                        <div className="card-top-row">
                          <div className="block-portal-node" style={{ borderColor: block.badgeColor }}>
                            {block.icon}
                          </div>
                          <div className="block-meta-badges">
                            <span className="week-badge">{block.weeksLabel} • 12h</span>
                            {block.isBossBlock && (
                              <span className="boss-flag">⚔️ Boss Block</span>
                            )}
                          </div>
                        </div>

                        <h3 className="card-title">Block {block.blockNumber}: {block.title}</h3>
                        <div className="card-subtitle">{block.subtitle}</div>

                        <div className="card-mission-box">
                          <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Studio Mission:</strong>
                          {block.practical.title}
                        </div>

                        {/* Skills mini bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#94a3b8', marginBottom: '8px' }}>
                          <span>🎯 Skills Progress:</span>
                          <span style={{ color: skillsDoneInBlock === blockSkills.length ? '#10b981' : '#38bdf8', fontWeight: '700' }}>
                            {skillsDoneInBlock} / {blockSkills.length} Ticked
                          </span>
                        </div>
                      </div>

                      <div className="card-footer">
                        <div className="card-status-indicator">
                          <div className={`status-dot ${isDone ? 'done' : 'active'}`} />
                          <span style={{ color: isDone ? '#10b981' : 'var(--text-secondary)' }}>
                            {isDone ? 'Mastered' : 'In Progress'}
                          </span>
                        </div>

                        <button
                          onClick={(e) => toggleBlockMastered(block.id, e)}
                          style={{
                            background: isDone ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                            border: `1px solid ${isDone ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                            color: isDone ? '#10b981' : '#cbd5e1',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          {isDone ? '✓ Completed' : 'Mark Done'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Year 2 Section */}
          {(filterPhase === 'all' || filterPhase === 'year2') && (
            <>
              <div className="year-divider" style={{ marginTop: '50px' }}>
                <div className="year-divider-line" />
                <div className="year-divider-pill" style={{ borderColor: 'rgba(249, 115, 22, 0.4)', color: '#fdba74' }}>
                  Year 2: Official A-Level NEA Coursework & Final Exam Prep
                </div>
                <div className="year-divider-line" />
              </div>

              <div className="quest-grid">
                {filteredBlocks.filter(b => b.phase === 'Year 2').map(block => {
                  const isDone = completedBlocks.includes(block.id);
                  const blockSkills = block.skillsMap || [];
                  const skillsDoneInBlock = blockSkills.filter(s => completedSkills.includes(s.id)).length;

                  return (
                    <div
                      key={block.id}
                      className={`quest-card ${isDone ? 'completed' : ''} ${block.isBossBlock ? 'boss-card' : ''}`}
                      onClick={() => setSelectedBlockId(block.id)}
                    >
                      <div>
                        <div className="card-top-row">
                          <div className="block-portal-node" style={{ borderColor: block.badgeColor }}>
                            {block.icon}
                          </div>
                          <div className="block-meta-badges">
                            <span className="week-badge">{block.weeksLabel} • 12h</span>
                            {block.isBossBlock && (
                              <span className="boss-flag">⚔️ Boss Block</span>
                            )}
                          </div>
                        </div>

                        <h3 className="card-title">Block {block.blockNumber}: {block.title}</h3>
                        <div className="card-subtitle">{block.subtitle}</div>

                        <div className="card-mission-box">
                          <strong style={{ color: '#fff', display: 'block', marginBottom: '2px' }}>Studio Mission:</strong>
                          {block.practical.title}
                        </div>

                        {/* Skills mini bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#94a3b8', marginBottom: '8px' }}>
                          <span>🎯 Skills Progress:</span>
                          <span style={{ color: skillsDoneInBlock === blockSkills.length ? '#10b981' : '#38bdf8', fontWeight: '700' }}>
                            {skillsDoneInBlock} / {blockSkills.length} Ticked
                          </span>
                        </div>
                      </div>

                      <div className="card-footer">
                        <div className="card-status-indicator">
                          <div className={`status-dot ${isDone ? 'done' : 'active'}`} />
                          <span style={{ color: isDone ? '#10b981' : 'var(--text-secondary)' }}>
                            {isDone ? 'Mastered' : 'In Progress'}
                          </span>
                        </div>

                        <button
                          onClick={(e) => toggleBlockMastered(block.id, e)}
                          style={{
                            background: isDone ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                            border: `1px solid ${isDone ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                            color: isDone ? '#10b981' : '#cbd5e1',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          {isDone ? '✓ Completed' : 'Mark Done'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* =========================================================
          VIEW 2: WEEKLY TIMETABLE GRID (4-HOUR SYSTEM)
          ========================================================= */}
      {viewMode === 'grid' && (
        <div className="weekly-grid-view">
          {filteredBlocks.map(block => {
            const isDone = completedBlocks.includes(block.id);
            const blockSkills = block.skillsMap || [];
            const skillsDoneInBlock = blockSkills.filter(s => completedSkills.includes(s.id)).length;

            return (
              <div key={block.id} className="grid-block-card">
                <div className="grid-block-header">
                  <div className="grid-block-title-group">
                    <span style={{ fontSize: '1.4rem' }}>{block.icon}</span>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '1.05rem', marginRight: '10px' }}>
                        Block {block.blockNumber}: {block.title}
                      </strong>
                      <span style={{ color: '#38bdf8', fontSize: '0.85rem' }}>({block.weeksLabel} • 12h total)</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      🎯 Skills: <strong style={{ color: '#10b981' }}>{skillsDoneInBlock}/{blockSkills.length}</strong>
                    </span>
                    <button
                      onClick={() => setSelectedBlockId(block.id)}
                      style={{
                        background: 'rgba(56, 189, 248, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        color: '#38bdf8',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}
                    >
                      🔍 View Dossier
                    </button>
                    <button
                      onClick={(e) => toggleBlockMastered(block.id, e)}
                      style={{
                        background: isDone ? '#10b981' : 'transparent',
                        border: '1px solid #10b981',
                        color: isDone ? '#000' : '#10b981',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: '700'
                      }}
                    >
                      {isDone ? '✓ Block Mastered' : 'Mark Block Complete'}
                    </button>
                  </div>
                </div>

                {/* 3 Weekly Teaching Columns (4h per week = 12h total) */}
                <div className="grid-block-hours-grid">
                  {/* Week 1: Critical Listening & Technical Core */}
                  <div className="hour-column">
                    <div className="hour-top">
                      <span className="hour-tag">Week 1 (4h) • Listening & Core</span>
                      <input
                        type="checkbox"
                        className="hour-checkbox"
                        checked={Boolean(completedHours[`${block.id}_w1`])}
                        onChange={(e) => toggleHourCompleted(`${block.id}_w1`, e)}
                        title="Mark Week 1 Complete (4h)"
                      />
                    </div>
                    <div className="hour-desc">
                      <strong style={{ color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                        {block.listening.era} — {block.listening.genres}
                      </strong>
                      <div style={{ marginBottom: '6px' }}>{block.listening.context}</div>
                      <div style={{ color: '#38bdf8', fontSize: '0.78rem' }}>
                        ⚡ Theory: {block.technical.topics[0]}
                      </div>
                    </div>
                  </div>

                  {/* Week 2: Practical Studio & DAW Workshop */}
                  <div className="hour-column">
                    <div className="hour-top">
                      <span className="hour-tag" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                        Week 2 (4h) • Studio & Tracking
                      </span>
                      <input
                        type="checkbox"
                        className="hour-checkbox"
                        checked={Boolean(completedHours[`${block.id}_w2`])}
                        onChange={(e) => toggleHourCompleted(`${block.id}_w2`, e)}
                        title="Mark Week 2 Complete (4h)"
                      />
                    </div>
                    <div className="hour-desc">
                      <strong style={{ color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                        {block.practical.title}
                      </strong>
                      <div style={{ marginBottom: '6px' }}>{block.practical.description}</div>
                      <div style={{ color: '#34d399', fontSize: '0.78rem', fontWeight: '600' }}>
                        📦 Deliverable: {block.practical.deliverable}
                      </div>
                    </div>
                  </div>

                  {/* Week 3: Coursework Milestone, App & Sign-Off */}
                  <div className="hour-column">
                    <div className="hour-top">
                      <span className="hour-tag" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
                        Week 3 (4h) • Milestone & Review
                      </span>
                      <input
                        type="checkbox"
                        className="hour-checkbox"
                        checked={Boolean(completedHours[`${block.id}_w3`])}
                        onChange={(e) => toggleHourCompleted(`${block.id}_w3`, e)}
                        title="Mark Week 3 Complete (4h)"
                      />
                    </div>
                    <div className="hour-desc">
                      <strong style={{ color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>
                        {block.courseworkExam.milestone}
                      </strong>
                      <div style={{ marginBottom: '6px' }}>{block.courseworkExam.detail}</div>
                      <div style={{ color: '#fbbf24', fontSize: '0.78rem' }}>
                        📱 MTG App: {block.appLinks.mtgQuizTitle}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================
          VIEW 3: 5–10 FACTS FLASHCARD ARENA (WITH TICK SYSTEM)
          ========================================================= */}
      {viewMode === 'facts' && (
        <div className="facts-arena">
          <div className="facts-selector-bar">
            {TIMETABLE_BLOCKS.map(block => (
              <button
                key={block.id}
                className={`facts-block-btn ${activeFactsBlockId === block.id ? 'active' : ''}`}
                onClick={() => setActiveFactsBlockId(block.id)}
              >
                <span>{block.icon}</span> Block {block.blockNumber}: {block.title.split('&')[0]}
              </button>
            ))}
          </div>

          {(() => {
            const activeBlock = TIMETABLE_BLOCKS.find(b => b.id === activeFactsBlockId);
            if (!activeBlock) return null;

            return (
              <div>
                <div style={{ marginBottom: '18px' }}>
                  <h2 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '1.4rem' }}>
                    Block {activeBlock.blockNumber} Revision Cards: 5 to 10 Essential Facts
                  </h2>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {activeBlock.subtitle} • Master these core facts for active recall and homework verification. Click any card to tick it off.
                  </p>
                </div>

                <div className="facts-cards-grid">
                  {activeBlock.factsHW.map(item => {
                    const factKey = `${activeBlock.id}_fact_${item.id}`;
                    const isFactTicked = completedFacts.includes(factKey);

                    return (
                      <div
                        key={item.id}
                        className={`fact-item-card ${isFactTicked ? 'ticked' : ''}`}
                        onClick={() => toggleFactCompleted(factKey)}
                        style={{
                          cursor: 'pointer',
                          borderColor: isFactTicked ? '#10b981' : 'rgba(255,255,255,0.08)',
                          background: isFactTicked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(30, 41, 59, 0.75)'
                        }}
                      >
                        <div
                          className="fact-num"
                          style={{
                            background: isFactTicked ? '#10b981' : 'rgba(56, 189, 248, 0.15)',
                            color: isFactTicked ? '#000' : '#38bdf8'
                          }}
                        >
                          {isFactTicked ? '✓' : item.id}
                        </div>
                        <div className="fact-text" style={{ flex: 1 }}>{item.fact}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================
          INTERACTIVE QUEST DOSSIER MODAL (WHEN BLOCK CLICKED)
          ========================================================= */}
      {selectedBlock && (
        <div className="dossier-overlay" onClick={() => setSelectedBlockId(null)}>
          <div className="dossier-modal" onClick={e => e.stopPropagation()}>
            <div className="dossier-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '2rem' }}>{selectedBlock.icon}</span>
                <div>
                  <h2 style={{ margin: 0, color: '#fff', fontSize: '1.4rem' }}>
                    Block {selectedBlock.blockNumber}: {selectedBlock.title}
                  </h2>
                  <span style={{ color: '#38bdf8', fontSize: '0.85rem' }}>
                    {selectedBlock.phase} • {selectedBlock.weeksLabel} (3 Weeks • 12 Guided Learning Hours)
                  </span>
                </div>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedBlockId(null)}>✕</button>
            </div>

            <div className="dossier-body">
              {/* Practical Skills Checklist (Tick System) inside Modal */}
              <div className="dossier-section" style={{ borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                  <h4 className="dossier-section-title" style={{ color: '#10b981', margin: 0 }}>
                    <span>🎯</span> Practical Skills Checklist (Tick System)
                  </h4>
                  <button
                    onClick={() => toggleAllSkillsForBlock(selectedBlock)}
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#34d399',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Toggle All Skills
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(selectedBlock.skillsMap || []).map(skill => {
                    const isTicked = completedSkills.includes(skill.id);
                    const catClass = getCategoryClass(skill.category);

                    return (
                      <div
                        key={skill.id}
                        className={`dossier-skill-row ${isTicked ? 'ticked' : ''}`}
                        onClick={() => toggleSkillCompleted(skill.id)}
                      >
                        <div
                          className="skill-tick-btn"
                          style={{
                            width: '26px',
                            height: '26px',
                            background: isTicked ? '#10b981' : 'rgba(0,0,0,0.3)',
                            borderColor: isTicked ? '#10b981' : 'rgba(255,255,255,0.2)'
                          }}
                        >
                          {isTicked && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                            <span className={`skill-category-tag ${catClass}`} style={{ fontSize: '0.65rem' }}>
                              {skill.category}
                            </span>
                            <span style={{ color: '#fff', fontSize: '0.88rem', fontWeight: '700' }}>
                              {skill.title}
                            </span>
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: '1.4' }}>
                            {skill.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Critical Listening Section */}
              <div className="dossier-section">
                <h4 className="dossier-section-title">
                  <span>🎧</span> Critical Listening & Era Fingerprints ({selectedBlock.listening.era})
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0 0 12px 0' }}>
                  <strong>Context:</strong> {selectedBlock.listening.context}
                </p>
                <div>
                  {selectedBlock.listening.tracks.map((tr, idx) => (
                    <div key={idx} className="listening-track-row">
                      <div>
                        <strong style={{ color: '#fff' }}>{tr.artist}</strong> — <em>"{tr.title}"</em>
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        {tr.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Core Section */}
              <div className="dossier-section">
                <h4 className="dossier-section-title" style={{ color: '#a855f7' }}>
                  <span>⚡</span> Technical Theory, Signal Flow & Physics
                </h4>
                <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px', color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  {selectedBlock.technical.topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
                {selectedBlock.technical.formulas && selectedBlock.technical.formulas.length > 0 && (
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', borderLeft: '3px solid #a855f7', marginTop: '10px' }}>
                    <span style={{ color: '#c084fc', fontWeight: '700', fontSize: '0.78rem', textTransform: 'uppercase' }}>Key Formulas:</span>
                    <div style={{ color: '#f8fafc', fontSize: '0.85rem', marginTop: '4px', fontFamily: 'monospace' }}>
                      {selectedBlock.technical.formulas.join('  •  ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Practical Studio Mission */}
              <div className="dossier-section">
                <h4 className="dossier-section-title" style={{ color: '#10b981' }}>
                  <span>🎛️</span> Practical Studio & DAW Workshop Mission
                </h4>
                <h5 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '0.95rem' }}>{selectedBlock.practical.title}</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                  {selectedBlock.practical.description}
                </p>
                <div style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: '600' }}>
                  📦 Required Deliverable: {selectedBlock.practical.deliverable}
                </div>
              </div>

              {/* Coursework & Exam Milestone */}
              <div className="dossier-section" style={{ borderLeft: selectedBlock.isBossBlock ? '4px solid #ffd700' : '1px solid rgba(255,255,255,0.06)' }}>
                <h4 className="dossier-section-title" style={{ color: selectedBlock.isBossBlock ? '#ffd700' : '#f59e0b' }}>
                  <span>{selectedBlock.isBossBlock ? '⚔️' : '📝'}</span> Coursework & Examination Milestone
                </h4>
                <strong style={{ color: '#fff', fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>
                  {selectedBlock.courseworkExam.milestone}
                </strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                  {selectedBlock.courseworkExam.detail}
                </p>
              </div>

              {/* 5 to 10 Revision Facts Checklist */}
              <div className="dossier-section">
                <h4 className="dossier-section-title" style={{ color: '#38bdf8' }}>
                  <span>🧠</span> 5 to 10 Essential Facts (Revision & Homework)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedBlock.factsHW.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.85rem', color: '#cbd5e1' }}>
                      <span style={{ color: '#38bdf8', fontWeight: '700' }}>#{item.id}</span>
                      <span>{item.fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive In-App Launch Actions */}
              <div className="dossier-actions">
                <button
                  className="action-btn primary"
                  onClick={() => {
                    handleLaunchQuiz(selectedBlock.appLinks.mtgQuizId, selectedBlock.appLinks.mtgQuizTitle);
                  }}
                >
                  <span>⚡</span> Launch {selectedBlock.appLinks.mtgQuizTitle}
                </button>

                {selectedBlock.appLinks.hasTracksheet && (
                  <button
                    className="action-btn secondary"
                    onClick={handleLaunchTracksheet}
                  >
                    <span>🎚️</span> Open Tracksheet Creator
                  </button>
                )}

                <button
                  className={`action-btn ${completedBlocks.includes(selectedBlock.id) ? 'success' : 'secondary'}`}
                  onClick={() => toggleBlockMastered(selectedBlock.id)}
                >
                  <span>{completedBlocks.includes(selectedBlock.id) ? '✓' : '⭐'}</span>
                  {completedBlocks.includes(selectedBlock.id) ? 'Marked as Mastered' : 'Mark Block as Mastered (+XP)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableBuilder;
