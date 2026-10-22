import React, { useState, useEffect, useMemo, useRef } from 'react';
import './GuruBuddy.css';
import { generateGuruMissions, GURU_TIPS } from './guruEngine';
import campaignData from '../../data/campaign_route.json';

const FOCUS_OPTIONS = [
  { id: 'all', label: '⚡ All Knowledge Gaps', desc: 'Auto-prioritize biggest holes in knowledge' },
  { id: 'legend', label: '🗺️ Path to Legend', desc: 'Next node on the campaign route' },
  { id: 'gaps', label: '🔬 Exam Topic Holes', desc: 'Microphones, synthesis, dynamics, EQ, acoustics' },
  { id: 'c2', label: '🎹 C2 Coursework', desc: 'Stimulus track, arrangement & logbook' },
  { id: 'c1', label: '🎙️ C1 Recording', desc: 'Track sheet, mic choices & signal paths' },
  { id: 'essays', label: '✍️ Q5 & Q6 Essays', desc: 'AO3 vs AO4 extended writing (35 marks)' }
];

const getImageUrl = (path) => {
  if (!path) return '';
  const cleanPath = path.replace(/^\/+/, '');
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') + '/';
  return encodeURI(`${baseUrl}${cleanPath}`);
};

const GuruBuddy = ({
  userProgress = {},
  courseData = {},
  onNavigate,
  activeItem = null,
  onGoToDashboard
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [studentFocus, setStudentFocus] = useState(() => {
    try {
      return localStorage.getItem('mtg_student_focus') || 'all';
    } catch {
      return 'all';
    }
  });

  const [studentFeeling, setStudentFeeling] = useState(() => {
    try {
      return sessionStorage.getItem('mtg_student_feeling') || null;
    } catch {
      return null;
    }
  });

  const [bubbleDismissed, setBubbleDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('mtg_guru_bubble_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const [tipIndex, setTipIndex] = useState(0);
  const [expandedDiagram, setExpandedDiagram] = useState(null);

  // Focus change handler
  const handleSelectFocus = (focusId) => {
    setStudentFocus(focusId);
    try {
      localStorage.setItem('mtg_student_focus', focusId);
    } catch {}
    setBubbleDismissed(false); // Re-show speech bubble with new priority if dismissed
  };

  const handleSelectFeeling = (feeling) => {
    setStudentFeeling(feeling);
    try {
      sessionStorage.setItem('mtg_student_feeling', feeling);
    } catch {}
  };

  // Determine if student is inside an intensive active quiz/exam session
  const isExamOrQuizActive = useMemo(() => {
    if (!activeItem) return false;
    const type = activeItem.type || '';
    return (
      type === 'lp_quiz' ||
      type === 'component3_exam' ||
      type === 'component4_exam' ||
      type === 'lp_activity' ||
      type.includes('quiz')
    );
  }, [activeItem]);

  // Compute missions from live user progress and current focus
  const { missions, academicPhase, legendStats, nextLegendNode, topicsMasteredCount, totalTopicsCount } = useMemo(() => {
    return generateGuruMissions(userProgress, courseData, studentFocus);
  }, [userProgress, courseData, studentFocus]);

  const topMission = missions[0] || null;
  const secondaryMissions = missions.slice(1, 4);

  // Handle opening the Campaign Map on the dashboard
  const handleOpenCampaignMap = () => {
    setIsDrawerOpen(false);
    setBubbleDismissed(true);
    if (onGoToDashboard) onGoToDashboard();
    setTimeout(() => {
      const el = document.getElementById('campaign-map-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Handle Bubble dismiss
  const handleDismissBubble = (e) => {
    if (e) e.stopPropagation();
    setBubbleDismissed(true);
    try {
      sessionStorage.setItem('mtg_guru_bubble_dismissed', 'true');
    } catch {}
  };

  // Execute mission action
  const handleExecuteMission = (targetItem) => {
    setIsDrawerOpen(false);
    setBubbleDismissed(true);

    if (!targetItem) {
      if (onGoToDashboard) onGoToDashboard();
      return;
    }

    if (onNavigate) {
      onNavigate(targetItem);
    }
  };

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % GURU_TIPS.length);
  };

  const currentTip = GURU_TIPS[tipIndex];

  // Auto-show bubble again if a brand new top mission appears
  useEffect(() => {
    if (topMission?.id) {
      const lastMissionId = sessionStorage.getItem('mtg_last_mission_id');
      if (lastMissionId !== topMission.id) {
        sessionStorage.setItem('mtg_last_mission_id', topMission.id);
        setBubbleDismissed(false);
      }
    }
  }, [topMission?.id]);

  const showSpeechBubble = !isExamOrQuizActive && !bubbleDismissed && topMission && !isDrawerOpen;

  return (
    <div className="guru-buddy-root" aria-label="Music Tech Guru Companion">
      <div className="guru-buddy-wrapper">
        {/* 1. SPEECH BUBBLE PROACTIVE NUDGE */}
        {showSpeechBubble && (
          <div className="guru-speech-bubble" role="dialog" aria-live="polite">
            <div className="guru-bubble-header">
              <span className="guru-bubble-badge">
                {topMission.badge || 'Guru Nudge'}
              </span>
              <button
                className="guru-bubble-close"
                onClick={handleDismissBubble}
                title="Dismiss nudge"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="guru-bubble-text">
              {topMission.speech}
            </p>

            <div className="guru-bubble-actions">
              <button
                className="guru-bubble-btn-action"
                onClick={() => handleExecuteMission(topMission.targetItem)}
              >
                {topMission.actionLabel || 'Go Now 🚀'}
              </button>
              <button
                className="guru-bubble-btn-dismiss"
                onClick={handleDismissBubble}
              >
                Later
              </button>
            </div>
          </div>
        )}

        {/* 2. THE BLUE MUSIC TECH GURU DUDE (FLOATING TRIGGER) */}
        <button
          className={`guru-trigger-btn ${isExamOrQuizActive ? 'guru-quiet-mode' : ''}`}
          onClick={() => {
            setIsDrawerOpen(!isDrawerOpen);
            if (!bubbleDismissed) handleDismissBubble();
          }}
          title={isExamOrQuizActive ? "Guru Buddy (Focus mode active)" : "Open Guru Coach"}
          aria-expanded={isDrawerOpen}
        >
          <img
            src={getImageUrl('images/guru_logo.png')}
            alt="Music Tech Guru"
            className="guru-dude-img"
          />

          {/* Ambient Glow Pulse */}
          {!isExamOrQuizActive && <div className="guru-pulse-ring" />}

          {/* Unread Alert Dot if there are recommendations */}
          {!isExamOrQuizActive && topMission && bubbleDismissed && (
            <span className="guru-alert-badge" title="Guru has a recommendation for you">
              !
            </span>
          )}
        </button>
      </div>

      {/* 3. SLIDE-OUT MISSION DRAWER ("GURU COACH") */}
      {isDrawerOpen && (
        <>
          <div
            className="guru-drawer-overlay"
            onClick={() => setIsDrawerOpen(false)}
          />

          <aside className="guru-drawer" role="dialog" aria-modal="true">
            {/* Drawer Header */}
            <div className="guru-drawer-header">
              <button
                className="guru-drawer-close-btn"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close drawer"
              >
                ✕
              </button>

              <div className="guru-header-identity">
                <img
                  src={getImageUrl('images/guru_logo.png')}
                  alt="Music Tech Guru"
                  className="guru-header-avatar"
                />
                <div>
                  <h2 className="guru-header-title">Guru Coach</h2>
                  <div className="guru-header-sub">
                    <span>Path to Legend Rank:</span>
                    <strong style={{ color: '#38bdf8' }}>{legendStats.currentRank}</strong>
                  </div>
                </div>
              </div>

              {/* Progress on Path to Legend */}
              <div className="guru-rank-bar-wrap">
                <div className="guru-rank-bar-info">
                  <span>Path to Legend Charge</span>
                  <span>{legendStats.count} / {legendStats.total} Nodes ({legendStats.percent}%)</span>
                </div>
                <div className="guru-rank-bar-track">
                  <div
                    className="guru-rank-bar-fill"
                    style={{ width: `${legendStats.percent}%` }}
                  />
                </div>
              </div>

              {/* Calendar & Exam Knowledge Coverage Banner */}
              <div className="guru-calendar-banner">
                <div className="guru-calendar-header">
                  <span className="guru-calendar-phase">
                    📅 {academicPhase.name}
                  </span>
                  {academicPhase.daysUntilMay > 0 && academicPhase.month !== 4 && (
                    <span className="guru-calendar-countdown">
                      {academicPhase.daysUntilMay}d to May Exams
                    </span>
                  )}
                </div>
                <div className="guru-calendar-target-row">
                  <span className="guru-calendar-badge">
                    {academicPhase.isExamSeason ? '🔥 May Exam Sprint' : '🎯 Exam Readiness'}
                  </span>
                  <span className={`guru-target-pill ${topicsMasteredCount === totalTopicsCount ? 'completed' : 'pending'}`}>
                    {topicsMasteredCount} / {totalTopicsCount} Core Topics Mastered
                  </span>
                </div>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="guru-drawer-content">

              {/* STUDENT CHOICE / WHAT DO YOU WANT TO WORK ON? */}
              <div>
                <div className="guru-section-label">
                  <span>🎯</span> What do you want to focus on?
                </div>
                <div className="guru-focus-chips">
                  {FOCUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      className={`guru-focus-chip ${studentFocus === opt.id ? 'active' : ''}`}
                      onClick={() => handleSelectFocus(opt.id)}
                      title={opt.desc}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PATH TO LEGEND ACTIVE STATION */}
              {nextLegendNode && (
                <div className="guru-legend-station">
                  <div className="guru-legend-station-header">
                    <span className="guru-legend-station-badge">
                      🗺️ {nextLegendNode.roundTitle}
                    </span>
                    {legendStats.nextRank && (
                      <span className="guru-legend-next-rank">
                        🎯 {legendStats.nodesToNextRank} node{legendStats.nodesToNextRank === 1 ? '' : 's'} to {legendStats.nextRank}
                      </span>
                    )}
                  </div>
                  <div className="guru-legend-station-body">
                    <span className="guru-legend-station-step">Next Campaign Step:</span>
                    <h4 className="guru-legend-node-title">
                      {nextLegendNode.node.title}
                    </h4>
                  </div>
                  <div className="guru-legend-btn-row">
                    <button
                      className="guru-legend-play-btn"
                      onClick={() => handleExecuteMission(nextLegendNode.targetItem)}
                    >
                      Play Node ⚡
                    </button>
                    <button
                      className="guru-legend-map-btn"
                      onClick={handleOpenCampaignMap}
                    >
                      View Map 🗺️
                    </button>
                  </div>
                </div>
              )}

              {/* PRIMARY RECOMMENDED MISSION */}
              {topMission ? (
                <div>
                  <div className="guru-section-label">
                    <span>⚡</span> Top Recommendation For You
                  </div>
                  <div className="guru-top-mission-card">
                    <div className="guru-mission-category">
                      {topMission.category} • {topMission.badge}
                    </div>
                    <h3 className="guru-mission-title">{topMission.title}</h3>
                    <p className="guru-mission-desc">{topMission.description}</p>
                    <button
                      className="guru-mission-cta-btn"
                      onClick={() => handleExecuteMission(topMission.targetItem)}
                    >
                      {topMission.actionLabel}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="guru-top-mission-card">
                  <h3 className="guru-mission-title">You're All Caught Up! 🎉</h3>
                  <p className="guru-mission-desc">
                    Incredible work! You've tackled all key milestones for your current focus. Ready to challenge yourself with a full listening paper?
                  </p>
                </div>
              )}

              {/* SECONDARY MISSIONS */}
              {secondaryMissions.length > 0 && (
                <div>
                  <div className="guru-section-label">
                    <span>📋</span> Next In Queue
                  </div>
                  <div className="guru-secondary-list">
                    {secondaryMissions.map((mission) => (
                      <div key={mission.id} className="guru-secondary-item">
                        <div className="guru-secondary-info">
                          <h4 className="guru-secondary-title">{mission.title}</h4>
                          <span className="guru-secondary-badge">{mission.badge}</span>
                        </div>
                        <button
                          className="guru-secondary-btn"
                          onClick={() => handleExecuteMission(mission.targetItem)}
                        >
                          Go →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STUDENT FEELING / FEEDBACK BAR */}
              <div className="guru-feeling-container">
                <div className="guru-section-label">
                  <span>💬</span> How are you feeling today?
                </div>
                <div className="guru-feeling-chips">
                  {[
                    { id: 'confident', label: 'Feeling Ready 🚀' },
                    { id: 'practicing', label: 'Need Revision 📖' },
                    { id: 'in_daw', label: 'Deep in Logic 🎛️' }
                  ].map(f => (
                    <button
                      key={f.id}
                      className={`guru-feeling-chip ${studentFeeling === f.id ? 'active' : ''}`}
                      onClick={() => handleSelectFeeling(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                {studentFeeling === 'practicing' && (
                  <p className="guru-feeling-hint">
                    💡 "Slow down, review the MTG dictionary explanations on wrong answers, and take it topic by topic."
                  </p>
                )}
                {studentFeeling === 'in_daw' && (
                  <p className="guru-feeling-hint">
                    💡 "Remember to bounce your mix in 24-bit 44.1kHz WAV and check in mono for phase cancellation!"
                  </p>
                )}
              </div>

              {/* EXPERT SPEC EXPLANATION WITH PICTURE & QUOTE */}
              <div>
                <div className="guru-section-label">
                  <span>💡</span> Expert Spec Explanation
                </div>
                <div className="guru-expert-box">
                  <div className="guru-expert-header">
                    <span className="guru-expert-title">
                      <span>🎧</span> {currentTip.title}
                    </span>
                    <button
                      className="guru-expert-dice-btn"
                      onClick={handleNextTip}
                      title="Next expert spec breakdown"
                    >
                      Next Spec 🎲
                    </button>
                  </div>

                  {/* 1. Expert Diagram / Picture */}
                  {currentTip.image && (
                    <div 
                      className="guru-expert-image-container"
                      onClick={() => setExpandedDiagram(currentTip.image)}
                      title="Click to view full-resolution diagram"
                    >
                      <img
                        src={getImageUrl(currentTip.image)}
                        alt={currentTip.title}
                        className="guru-expert-image"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="guru-expert-expand-badge">
                        🔍 Click to expand
                      </span>
                    </div>
                  )}

                  {/* 2. Main Expert Text */}
                  <div className="guru-expert-text">
                    {currentTip.explanation}
                  </div>

                  {/* 3. Expert Quote with Golden Accent */}
                  {currentTip.quote && (
                    <blockquote className="guru-expert-quote">
                      <p className="guru-quote-text">
                        "{currentTip.quote.text}"
                      </p>
                      <footer className="guru-quote-author">
                        — {currentTip.quote.author}
                      </footer>
                    </blockquote>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Lightbox Modal for Expanded Diagram */}
      {expandedDiagram && (
        <div 
          className="guru-diagram-lightbox-overlay"
          onClick={() => setExpandedDiagram(null)}
        >
          <div className="guru-diagram-lightbox-content" onClick={e => e.stopPropagation()}>
            <button 
              className="guru-diagram-lightbox-close"
              onClick={() => setExpandedDiagram(null)}
              aria-label="Close diagram"
            >
              ✕
            </button>
            <img 
              src={getImageUrl(expandedDiagram)}
              alt="Expanded Audio Engineering Diagram"
              className="guru-diagram-lightbox-img"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GuruBuddy;
