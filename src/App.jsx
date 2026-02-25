import React, { useState } from 'react';
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
  const { currentUser, logout, loading } = useUser();
  const [activeItem, setActiveItem] = useState(null);
  const [showTeacherView, setShowTeacherView] = useState(false);
  // Mobile Menu Logic
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


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

          {courseData.sections.map((section, secIdx) => (
            <div key={secIdx} className="nav-section">
              <h2>{section.title}</h2>
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  className={`nav-item ${activeItem === item ? 'active' : ''}`}
                  onClick={() => handleItemSelectWrapper(item)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          ))}
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
              examData={EXAM_DATA_MAP[activeItem.id] || EXAM_DATA_MAP['default']}
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
          <Dashboard />
        )}
      </main>
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
