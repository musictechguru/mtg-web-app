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
import component3FunkData from './data/component3_funk_exam.json';
import component3SynthPopData from './data/component3_synthpop_exam.json';
import component3HeavyRockData from './data/component3_heavyrock_exam.json';
import component3SoulData from './data/component3_soul_exam.json';
import component3ReggaeData from './data/component3_reggae_exam.json';
import component4EdmData from './data/component4_edm_exam.json';

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
    setActiveItem(item);
    window.scrollTo(0, 0);
  };

  const goToDashboard = () => {
    setActiveItem(null);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header" style={{ cursor: 'pointer' }}>
          <div onClick={goToDashboard}>
            <h1>Music Tech Guru</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', marginTop: '5px' }}>
              Logged in as: {currentUser.email}
            </p>
          </div>
        </div>

        <nav>
          <button
            className={`nav-item ${!activeItem ? 'active' : ''}`}
            onClick={goToDashboard}
            style={{ marginBottom: '20px', fontWeight: 'bold', color: 'var(--accent-blue)' }}
          >
            Dashboard
          </button>

          <button
            className={`nav-item ${activeItem?.type === 'dictionary_selector' ? 'active' : ''}`}
            onClick={() => setActiveItem({ type: 'dictionary_selector', title: 'Dictionary Quizzes' })}
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
                  onClick={() => handleItemSelect(item)}
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
            <QuizPlayer quiz={activeItem} onFinish={goToDashboard} />
          ) : activeItem.type === 'lp_activity' ? (
            <WorksheetPlayer activity={activeItem} onFinish={goToDashboard} />
          ) : activeItem.type === 'lp_fingerprints' ? (
            <FingerprintsQuizPlayer onExit={goToDashboard} />
          ) : activeItem.type === 'dictionary_selector' ? (
            <DictionaryQuizSelector
              onSelectQuiz={(quiz) => handleItemSelect({ type: 'lp_quiz', ...quiz })}
              onBack={goToDashboard}
            />
          ) : activeItem.type === 'component3_exam' ? (
            <Component3ExamPlayer
              examData={EXAM_DATA_MAP[activeItem.id] || EXAM_DATA_MAP['default']}
              onExit={goToDashboard}
            />
          ) : activeItem.type === 'lp_synth_quiz' ? (
            <SynthesizerQuiz onExit={goToDashboard} />
          ) : activeItem.type === 'effects_chain_quiz' ? (
            <EffectsChainQuiz onExit={goToDashboard} />
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
