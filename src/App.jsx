import React, { useState, useEffect } from 'react';
import './App.css';
import courseData from './data/course_data.json';
import QuizPlayer from './components/QuizPlayer';
import LessonViewer from './components/LessonViewer';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';
import TeacherDashboard from './components/TeacherDashboard';
import { UserProvider, useUser } from './contexts/UserContext';
import WorksheetPlayer from './components/WorksheetPlayer';
import FingerprintsQuizPlayer from './components/FingerprintsQuiz/FingerprintsQuizPlayer';
import DictionaryQuizSelector from './components/DictionaryQuizSelector';
import Component3ExamPlayer from './components/Component3ExamPlayer';
import EffectsChainQuiz from './components/InteractiveQuizzes/EffectsChainQuiz';
import SynthesizerQuiz from './components/InteractiveQuizzes/SynthesizerQuiz';
import MicrophonePlacementQuiz from './components/InteractiveQuizzes/MicrophonePlacementQuiz';
import ProductionTechniqueQuiz from './components/InteractiveQuizzes/ProductionTechniqueQuiz';
import RockProductionQuiz from './components/InteractiveQuizzes/RockProductionQuiz';
import component3FunkData from './data/component3_funk_exam.json';
import component3SynthPopData from './data/component3_synthpop_exam.json';
import component3HeavyRockData from './data/component3_heavyrock_exam.json';
import component3SoulData from './data/component3_soul_exam.json';
import component3ReggaeData from './data/component3_reggae_exam.json';
import component4EdmData from './data/component4_edm_exam.json';
import PremiumLocked from './components/PremiumLocked';

import WelcomeVideoModal from './components/WelcomeVideoModal';

const EXAM_DATA_MAP = {
  'c3_funk': component3FunkData,
  'c3_synthpop': component3SynthPopData,
  'c3_heavyrock': component3HeavyRockData,
  'c3_soul': component3SoulData,
  'c3_reggae': component3ReggaeData,
  'c4_edm': component4EdmData,
  // Fallback for legacy course_data entries that might not have ID yet
  'default': component3FunkData
};

// Logic Component
const MainApp = () => {
  const { currentUser, userProgress, logout, loading } = useUser();
  const [activeItem, setActiveItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);

  useEffect(() => {
    // Check if the user has seen the welcome video.
    // If we're logged in, check localStorage.
    if (currentUser) {
      const hasSeen = localStorage.getItem('hasSeenWelcomeVideo');
      if (!hasSeen) {
        setShowWelcomeVideo(true);
      }
    }
  }, [currentUser]);

  const handleWelcomeVideoClose = () => {
    localStorage.setItem('hasSeenWelcomeVideo', 'true');
    setShowWelcomeVideo(false);
  };


  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff' }}>Loading...</div>;
  }

  if (!currentUser) {
    return <LoginScreen />;
  }

  if (currentUser?.displayName === 'Teacher' && !showTeacherView) {
    // Auto-redirect teacher to dashboard initially, but allow them to use the app too?
    // For now, let's just default to the dashboard for teachers, or give them a toggle.
    // Let's force a decision: Default to Teacher View
    return <TeacherDashboard onBack={() => logout()} />;
  }

  // Normal App Logic
  const handleItemSelect = (item) => {
    // Premium Check
    if (item.isPremium && !currentUser?.is_premium) {
      setActiveItem({ type: 'premium_locked', title: item.title });
      window.scrollTo(0, 0);
      return;
    }

    setActiveItem(item);
    window.scrollTo(0, 0);
  };

  const goToDashboard = () => {
    setActiveItem(null);
  };



  // Close menu when route changes or item selected
  const handleItemSelectWrapper = (item) => {
    handleItemSelect(item);
    setMobileMenuOpen(false);
  };

  const goToDashboardWrapper = () => {
    goToDashboard();
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {mobileMenuOpen ? <line x1="18" y1="6" x2="6" y2="18"></line> : <line x1="3" y1="12" x2="21" y2="12"></line>}
          {mobileMenuOpen ? <line x1="6" y1="6" x2="18" y2="18"></line> : <line x1="3" y1="6" x2="21" y2="6"></line>}
          {!mobileMenuOpen && <line x1="3" y1="18" x2="21" y2="18"></line>}
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ cursor: 'pointer' }}>
          <div onClick={goToDashboardWrapper}>
            <h1>Music Tech Guru</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', marginTop: '5px' }}>
              Logged in as: {currentUser.email}
            </p>
          </div>
        </div>

        <nav>
          <button
            className={`nav-item ${!activeItem ? 'active' : ''}`}
            onClick={goToDashboardWrapper}
            style={{ marginBottom: '20px', fontWeight: 'bold', color: 'var(--accent-blue)' }}
          >
            Dashboard
          </button>

          <button
            className={`nav-item ${activeItem?.type === 'dictionary_selector' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem({ type: 'dictionary_selector', title: 'Dictionary Quizzes' });
              setMobileMenuOpen(false);
            }}
            style={{ marginBottom: '20px', fontWeight: 'bold', color: 'var(--accent-success)', border: '1px solid var(--accent-success)' }}
          >
            Dictionary Quizzes
          </button>

          {courseData.sections.map((section, secIdx) => {
            // Group items by base Topic name if they are Topic Mastery Quizzes
            const isTopicSection = section.title.includes("Topic Mastery");
            let groupedItems = [];

            if (isTopicSection) {
              const topicGroups = {};
              section.items.forEach(item => {
                if (item.title.includes("Topic") && item.title.includes("(Part")) {
                  const baseTitle = item.title.split(" (Part")[0];
                  if (!topicGroups[baseTitle]) topicGroups[baseTitle] = [];
                  topicGroups[baseTitle].push(item);
                } else {
                  groupedItems.push(item);
                }
              });

              Object.keys(topicGroups).forEach(baseTitle => {
                groupedItems.push({
                  isGroup: true,
                  title: baseTitle,
                  items: topicGroups[baseTitle]
                });
              });
            } else {
              groupedItems = section.items;
            }

            return (
              <div key={secIdx} className="nav-section">
                <h2>{section.title}</h2>
                {groupedItems.map((item, itemIdx) => {
                  if (item.isGroup) {
                    const isExpanded = expandedTopic === item.title;
                    return (
                      <div key={itemIdx} style={{ marginBottom: '10px' }}>
                        <div
                          onClick={() => setExpandedTopic(isExpanded ? null : item.title)}
                          style={{
                            padding: '10px 15px',
                            color: isExpanded ? 'var(--accent-blue)' : 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: isExpanded ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {item.title}
                          <svg
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease'
                            }}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>

                        {isExpanded && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingLeft: '15px', marginTop: '5px', animation: 'fadeIn 0.2s ease-out' }}>
                            {item.items.map((subItem, subIdx) => (
                              <button
                                key={subIdx}
                                className={`nav-item ${activeItem === subItem ? 'active' : ''}`}
                                onClick={() => handleItemSelectWrapper(subItem)}
                                style={{ padding: '8px 15px', fontSize: '0.9rem' }}
                              >
                                {subItem.title.includes('(Part 1)') ? 'Part 1' : 'Part 2'}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <button
                      key={itemIdx}
                      className={`nav-item ${activeItem === item ? 'active' : ''}`}
                      onClick={() => handleItemSelectWrapper(item)}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </aside>



      {/* Main Content Area */}
      <main className="main-content">
        {activeItem ? (
          activeItem.type === 'lp_quiz' ? (
            <QuizPlayer quiz={activeItem} onFinish={goToDashboardWrapper} />
          ) : activeItem.type === 'lp_activity' ? (
            <WorksheetPlayer activity={activeItem} onFinish={goToDashboardWrapper} />
          ) : activeItem.type === 'lp_fingerprints' ? (
            <FingerprintsQuizPlayer onExit={goToDashboardWrapper} />
          ) : activeItem.type === 'dictionary_selector' ? (
            <DictionaryQuizSelector
              onSelectQuiz={(quiz) => handleItemSelectWrapper({ type: 'lp_quiz', ...quiz })}
              onBack={goToDashboardWrapper}
            />
          ) : activeItem.type === 'component3_exam' ? (
            <Component3ExamPlayer
              examData={{ ...(EXAM_DATA_MAP[activeItem.id] || EXAM_DATA_MAP['default']), campaignNodeId: activeItem.campaignNodeId }}
              onExit={goToDashboardWrapper}
            />
          ) : activeItem.type === 'lp_synth_quiz' ? (
            <SynthesizerQuiz onExit={goToDashboardWrapper} />
          ) : activeItem.type === 'effects_chain_quiz' ? (
            <EffectsChainQuiz onExit={goToDashboardWrapper} />
          ) : activeItem.type === 'microphone_placement_quiz' ? (
            <MicrophonePlacementQuiz quiz={activeItem} onExit={goToDashboardWrapper} />
          ) : activeItem.type === 'production_technique_quiz' ? (
            <ProductionTechniqueQuiz onExit={goToDashboardWrapper} />
          ) : activeItem.type === 'rock_production_quiz' ? (
            <RockProductionQuiz onExit={goToDashboardWrapper} />
          ) : activeItem.type === 'premium_locked' ? (
            <PremiumLocked itemTitle={activeItem.title} />
          ) : (
            <LessonViewer lesson={activeItem} />
          )
        ) : (
          <Dashboard onNavigate={handleItemSelectWrapper} />
        )}
      </main>

      {/* Full-screen Welcome Video */}
      {showWelcomeVideo && (
        <WelcomeVideoModal onClose={handleWelcomeVideoClose} />
      )}
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}

export default App;
