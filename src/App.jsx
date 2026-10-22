import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import './App.css';
import courseData from './data/course_data.json';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';
import PremiumLocked from './components/PremiumLocked';
import { UserProvider, useUser } from './contexts/UserContext';

// Lazy-load sub-routes and heavy components for optimal initial bundle and performance
const QuizPlayer = lazy(() => import('./components/QuizPlayer'));
const LessonViewer = lazy(() => import('./components/LessonViewer'));
const TeacherDashboard = lazy(() => import('./components/TeacherDashboard'));
const InviteLanding = lazy(() => import('./components/InviteLanding'));
const WorksheetPlayer = lazy(() => import('./components/WorksheetPlayer'));
const FingerprintsQuizPlayer = lazy(() => import('./components/FingerprintsQuiz/FingerprintsQuizPlayer'));
const DictionaryQuizSelector = lazy(() => import('./components/DictionaryQuizSelector'));
const Component3ExamPlayer = lazy(() => import('./components/Component3ExamPlayer'));
const ProfileSettings = lazy(() => import('./components/ProfileSettings'));
const EffectsChainQuiz = lazy(() => import('./components/InteractiveQuizzes/EffectsChainQuiz'));
const SynthesizerQuiz = lazy(() => import('./components/InteractiveQuizzes/SynthesizerQuiz'));
const MicrophonePlacementQuiz = lazy(() => import('./components/InteractiveQuizzes/MicrophonePlacementQuiz'));
const ProductionTechniqueQuiz = lazy(() => import('./components/InteractiveQuizzes/ProductionTechniqueQuiz'));
const RockProductionQuiz = lazy(() => import('./components/InteractiveQuizzes/RockProductionQuiz'));
const SampleChoppingQuiz = lazy(() => import('./components/InteractiveQuizzes/SampleChoppingQuiz'));
const TracksheetCreator = lazy(() => import('./components/TracksheetCreator/TracksheetCreator'));
const TimetableBuilder = lazy(() => import('./components/TimetableBuilder/TimetableBuilder'));
const QuickFireDaily5 = lazy(() => import('./components/QuickFireDaily5'));
const Component2Guide = lazy(() => import('./components/Component2Guide/Component2Guide'));
const WelcomeVideoModal = lazy(() => import('./components/WelcomeVideoModal'));
const UpdatePasswordModal = lazy(() => import('./components/UpdatePasswordModal'));
import GuruBuddy from './components/GuruBuddy/GuruBuddy';

const LoadingFallback = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: '#94a3b8', gap: '16px' }}>
    <div style={{ width: '36px', height: '36px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Loading module...</span>
  </div>
);

const isDev = Boolean(
  import.meta.env.DEV ||
  (typeof window !== 'undefined' && (
    window.location.search.includes('dev=true') ||
    localStorage.getItem('dev_mode') === 'true'
  ))
);

const findCourseItem = (idOrTitle) => {
  if (!idOrTitle) return null;
  for (const section of courseData.sections || []) {
    for (const item of section.items || []) {
      if (item.id === idOrTitle || item.title === idOrTitle) {
        return item;
      }
    }
  }
  return null;
};

const STAGE_THEMES = [
  { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' }, // Stage 1 - Cyan
  { color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.12)', border: 'rgba(96, 165, 250, 0.3)' }, // Stage 2 - Blue
  { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)', border: 'rgba(167, 139, 250, 0.3)' }, // Stage 3 - Purple
  { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.3)' }, // Stage 4 - Amber
  { color: '#f472b6', bg: 'rgba(244, 114, 182, 0.12)', border: 'rgba(244, 114, 182, 0.3)' }, // Stage 4b - Rose
  { color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)' }, // Stage 5 - Emerald
  { color: '#fb923c', bg: 'rgba(251, 146, 60, 0.12)', border: 'rgba(251, 146, 60, 0.3)' }, // Stage 6 - Orange
  { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' }, // Stage 7 - Sky
  { color: '#e879f9', bg: 'rgba(232, 121, 249, 0.12)', border: 'rgba(232, 121, 249, 0.3)' }, // Stage 8 - Fuchsia
  { color: '#2dd4bf', bg: 'rgba(45, 212, 191, 0.12)', border: 'rgba(45, 212, 191, 0.3)' }, // Component 4 - Teal
];

const parseStageTitle = (rawTitle) => {
  if (!rawTitle) return { badge: 'STAGE', name: '' };
  if (rawTitle.includes(':')) {
    const parts = rawTitle.split(':');
    const badge = parts[0].trim();
    const name = parts.slice(1).join(':').trim();
    return { badge: badge.toUpperCase(), name };
  }
  return { badge: 'STAGE', name: rawTitle };
};

const getStageCountLabel = (section, isTopicSection, topicGroupCount) => {
  const count = section.items?.length || 0;
  if (isTopicSection) {
    return `${topicGroupCount} Topics`;
  }
  const titleLower = (section.title || '').toLowerCase();
  if (titleLower.includes('mock')) {
    return `${count} ${count === 1 ? 'Mock' : 'Mocks'}`;
  }
  if (titleLower.includes('producing') || titleLower.includes('lesson')) {
    return `${count} ${count === 1 ? 'Module' : 'Modules'}`;
  }
  return `${count} ${count === 1 ? 'Quiz' : 'Quizzes'}`;
};

// Logic Component
const MainApp = () => {
  const { currentUser, userProgress, loading, needsPasswordReset } = useUser();
  const [activeItem, setActiveItem] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      let quizParam = params.get('quiz') || (isDev ? sessionStorage.getItem('mtg_dev_quiz') : null);

      // Support clean path routing like /topic/ID or /revision/ID
      const path = window.location.pathname;
      if (!quizParam && (path.startsWith('/topic/') || path.startsWith('/revision/'))) {
        const parts = path.split('/');
        if (parts.length > 2 && parts[2]) {
          quizParam = decodeURIComponent(parts[2]);
        }
      }

      const quickfireParam = params.get('quickfire') || params.get('daily5');
      if (quickfireParam === 'true' || quizParam === 'quick_fire_daily5' || quizParam === 'quickfire' || quizParam === 'daily5') {
        return { id: 'quick_fire_daily5', type: 'quick_fire_daily5', title: 'Daily 5 Quick-Fire Drill' };
      }
      if (quizParam) {
        if (quizParam === 'dictionary_selector') {
          return { type: 'dictionary_selector', title: 'Dictionary Quizzes' };
        }
        if (quizParam === 'tracksheet_creator') {
          return { id: 'tracksheet_creator', type: 'tracksheet_creator', title: 'Component 1: Track Sheet & Logbook', isPremium: true };
        }
        if (quizParam === 'component1_guide' || quizParam === 'c1_guide') {
          return { id: 'component1_guide', type: 'component1_guide', title: 'Component 1: Recording Guide & Tick List', isPremium: true };
        }
        if (quizParam === 'component2_guide' || quizParam === 'c2_guide') {
          return { id: 'component2_guide', type: 'component2_guide', title: 'Component 2: Composition Guide & Logbook', isPremium: true };
        }
        if (quizParam === 'lp_fingerprints' || quizParam === 'fingerprints') {
          return { id: 'lp_fingerprints', type: 'lp_fingerprints', title: 'Sonic Fingerprints: Production Analysis', isPremium: true };
        }
        if (quizParam === 'timetable_builder' || quizParam === 'timetable' || quizParam === 'scheme_of_work') {
          return { type: 'timetable_builder', title: '16-Block Timetable & Scheme of Work' };
        }
        const found = findCourseItem(quizParam);
        if (found) return found;
      }
    }
    return null;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const quizParam = params.get('quiz') || (isDev ? sessionStorage.getItem('mtg_dev_quiz') : null);
      if (quizParam) {
        const found = findCourseItem(quizParam);
        if (found && found.title && found.title.includes("Topic")) {
          return found.title.split(" (Part")[0];
        }
      }
    }
    return null;
  });
  const [appView, setAppView] = useState('student');
  const [inviteTeacherId, setInviteTeacherId] = useState(null);
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const [expandedStages, setExpandedStages] = useState(() => {
    // Default Stage 1 (Diagnostic) and Stage 2 (Topic Mastery) open
    const initial = { 0: true, 1: true };
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const quizParam = params.get('quiz') || (isDev ? sessionStorage.getItem('mtg_dev_quiz') : null);
      if (quizParam) {
        const secIdx = (courseData.sections || []).findIndex(sec =>
          sec.items?.some(it => it.id === quizParam || it.title === quizParam)
        );
        if (secIdx !== -1) {
          initial[secIdx] = true;
        }
      }
    }
    return initial;
  });

  const isItemActive = (item) => {
    if (!activeItem || !item) return false;
    if (activeItem === item) return true;
    if (item.id && activeItem.id && item.id === activeItem.id) return true;
    if (item.title && activeItem.title && item.title === activeItem.title) return true;
    return false;
  };

  const toggleStage = (secIdx) => {
    setExpandedStages(prev => ({
      ...prev,
      [secIdx]: !prev[secIdx]
    }));
  };

  const allStagesExpanded = (courseData.sections || []).length > 0 &&
    (courseData.sections || []).every((_, idx) => Boolean(expandedStages[idx]));

  const toggleAllStages = () => {
    if (allStagesExpanded) {
      setExpandedStages({});
    } else {
      const allOpen = {};
      (courseData.sections || []).forEach((_, idx) => {
        allOpen[idx] = true;
      });
      setExpandedStages(allOpen);
    }
  };

  const isPremiumItem = (item) => {
    if (!item) return false;
    if (item.isPremium) return true;
    const key = item.type || item.id;
    return (
      key === 'tracksheet_creator' ||
      key === 'component1_guide' ||
      key === 'c1_guide' ||
      key === 'component2_guide' ||
      key === 'c2_guide' ||
      key === 'lp_fingerprints'
    );
  };

  // If activeItem requires premium and user is not premium, enforce premium_locked
  useEffect(() => {
    if (!loading && activeItem && isPremiumItem(activeItem) && !currentUser?.is_premium) {
      if (activeItem.type !== 'premium_locked') {
        setActiveItem({ type: 'premium_locked', title: activeItem.title || 'Premium Feature' });
      }
    }
  }, [loading, currentUser, activeItem]);

  // When courseData updates via Vite HMR, keep the currently active item updated with the new questions
  useEffect(() => {
    if (activeItem && (activeItem.id || activeItem.title)) {
      const refreshed = findCourseItem(activeItem.id || activeItem.title);
      if (refreshed && refreshed !== activeItem) {
        setActiveItem(refreshed);
      }
    }
  }, [courseData]);

  // Dynamic SEO metadata & canonical tag based on active item
  useEffect(() => {
    const baseUrl = 'https://app.musictechguru.com';
    let currentUrl = baseUrl;
    let pageTitle = 'Music Tech Guru | A-Level Music Technology Revision';
    let pageDesc = 'Master Edexcel A-Level Music Technology with interactive quizzes, Component 3 & 4 mock exams, and premium teacher tools.';

    if (activeItem?.title) {
      pageTitle = `${activeItem.title} | Music Tech Guru Revision`;
      pageDesc = `Revise ${activeItem.title} for Edexcel A-Level Music Technology with interactive questions, audio analysis, and exam tips.`;

      const itemId = activeItem.id || activeItem.title;
      if (activeItem.type === 'quick_fire_daily5') {
        currentUrl = `${baseUrl}/?quiz=quick_fire_daily5`;
      } else if (activeItem.type === 'dictionary_selector') {
        currentUrl = `${baseUrl}/?quiz=dictionary_selector`;
      } else if (activeItem.type === 'tracksheet_creator') {
        currentUrl = `${baseUrl}/?quiz=tracksheet_creator`;
      } else if (activeItem.type === 'component1_guide') {
        currentUrl = `${baseUrl}/?quiz=component1_guide`;
      } else if (activeItem.type === 'component2_guide') {
        currentUrl = `${baseUrl}/?quiz=component2_guide`;
      } else if (activeItem.type === 'timetable_builder') {
        currentUrl = `${baseUrl}/?quiz=timetable_builder`;
      } else if (activeItem.type === 'lp_fingerprints') {
        currentUrl = `${baseUrl}/?quiz=lp_fingerprints`;
      } else if (itemId) {
        currentUrl = `${baseUrl}/?quiz=${encodeURIComponent(itemId)}`;
      }
    }

    document.title = pageTitle;

    const setMeta = (selector, attr, val) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) {
          const propName = selector.match(/property="([^"]+)"/)?.[1];
          if (propName) el.setAttribute('property', propName);
        } else if (selector.includes('name=')) {
          const nameVal = selector.match(/name="([^"]+)"/)?.[1];
          if (nameVal) el.setAttribute('name', nameVal);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };

    setMeta('meta[name="description"]', 'content', pageDesc);
    setMeta('meta[property="og:title"]', 'content', pageTitle);
    setMeta('meta[property="og:description"]', 'content', pageDesc);
    setMeta('meta[property="og:url"]', 'content', currentUrl);
    setMeta('meta[name="twitter:title"]', 'content', pageTitle);
    setMeta('meta[name="twitter:description"]', 'content', pageDesc);
    setMeta('meta[name="twitter:url"]', 'content', currentUrl);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
  }, [activeItem]);


  useEffect(() => {
    // Diagnostic: Log Supabase URL to ensure correct environment
    if (import.meta.env.DEV) {
      console.log('Connect to Supabase:', import.meta.env.VITE_SUPABASE_URL);
    }
    // Check for invite route on load
    const path = window.location.pathname;
    if (path.startsWith('/invite/')) {
      const parts = path.split('/');
      if (parts.length > 2 && parts[2]) {
        setInviteTeacherId(parts[2]);
        setAppView('invite');
      }
    }
  }, []);

  useEffect(() => {
    // Check if the user has seen the welcome video.
    if (currentUser?.id) {
      const hasSeen = localStorage.getItem('hasSeenWelcomeVideo');
      if (!hasSeen) {
        // Mark immediately so background profile fetches or re-renders cannot trigger a second playback
        localStorage.setItem('hasSeenWelcomeVideo', 'true');
        setShowWelcomeVideo(true);
      }
    }
  }, [currentUser?.id]);

  // Auto-expand stage containing activeItem whenever activeItem changes
  useEffect(() => {
    if (activeItem) {
      const secIdx = (courseData.sections || []).findIndex(sec =>
        sec.items?.some(it => (it.id && it.id === activeItem.id) || (it.title && it.title === activeItem.title))
      );
      if (secIdx !== -1 && secIdx !== undefined) {
        setExpandedStages(prev => ({ ...prev, [secIdx]: true }));
      }
    }
  }, [activeItem]);

  const handleWelcomeVideoClose = useCallback(() => {
    localStorage.setItem('hasSeenWelcomeVideo', 'true');
    setShowWelcomeVideo(false);
  }, []);


  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff' }}>Loading...</div>;
  }

  // Invite routing takes precedence, handles its own unauthenticated state
  if (appView === 'invite') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <InviteLanding teacherId={inviteTeacherId} onComplete={() => {
          window.history.replaceState({}, '', '/');
          setInviteTeacherId(null);
          setAppView('student');
        }} />
      </Suspense>
    );
  }

  if (!currentUser && !activeItem) {
    return <LoginScreen onSelectPreview={handleItemSelect} />;
  }

  if (appView === 'teacher') {
    if (!currentUser) {
      return <LoginScreen onSelectPreview={handleItemSelect} />;
    }
    return (
      <Suspense fallback={<LoadingFallback />}>
        <TeacherDashboard onBack={() => setAppView('student')} />
      </Suspense>
    );
  }

  // Normal App Logic
  const handleItemSelect = (item) => {
    // Premium Check
    if (isPremiumItem(item) && !currentUser?.is_premium) {
      setActiveItem({ type: 'premium_locked', title: item.title || 'Premium Feature' });
      window.scrollTo(0, 0);
      return;
    }

    setActiveItem(item);
    window.scrollTo(0, 0);

    // Auto-expand stage containing this item
    const secIdx = (courseData.sections || []).findIndex(sec =>
      sec.items?.some(it => (it.id && it.id === item.id) || (it.title && it.title === item.title))
    );
    if (secIdx !== -1 && secIdx !== undefined) {
      setExpandedStages(prev => ({ ...prev, [secIdx]: true }));
    }

    if (item?.title && item.title.includes("Topic") && item.title.includes("(Part")) {
      const baseTitle = item.title.split(" (Part")[0];
      setExpandedTopic(baseTitle);
    }

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const quizId = item.id || item.title || (item.type === 'dictionary_selector' ? 'dictionary_selector' : null);
      if (quizId) {
        url.searchParams.set('quiz', quizId);
        if (isDev) {
          sessionStorage.setItem('mtg_dev_quiz', quizId);
        }
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const goToDashboard = () => {
    setActiveItem(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('quiz');
      url.searchParams.delete('q');
      sessionStorage.removeItem('mtg_dev_quiz');
      window.history.replaceState({}, '', url.toString());
    }
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
        <div className="sidebar-header" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
          <div onClick={goToDashboardWrapper}>
            <h1>Music Tech Guru</h1>
          </div>
          {currentUser ? (
            <button 
                  onClick={() => {
                    setShowProfileSettings(true);
                    setMobileMenuOpen(false);
                  }}
                  className={!currentUser.full_name ? "pulse-button" : ""}
                  style={{
                      background: !currentUser.full_name ? '' : 'transparent',
                      border: '1px solid rgba(255,255,255,0.2)', padding: '8px 10px',
                      borderRadius: '8px', color: !currentUser.full_name ? 'white' : 'var(--text-secondary)',
                      fontSize: '0.85rem', textAlign: 'left', marginTop: '10px',
                      display: 'flex', flexDirection: 'column', gap: '4px',
                      width: '100%', transition: 'all 0.2s'
                  }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1rem', color: !currentUser.full_name ? 'white' : 'var(--text-primary)' }}>
                        {currentUser.full_name ? currentUser.full_name : "📝 Set Your Name"}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </div>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{currentUser.email}</span>
            </button>
          ) : (
            <button
              onClick={goToDashboardWrapper}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                border: 'none',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <span>🔐</span> Log In / Sign Up
            </button>
          )}
        </div>

        <nav>
          <button
            className={`nav-item ${appView === 'teacher' ? 'active' : ''}`}
            onClick={() => {
              setAppView('teacher');
              setMobileMenuOpen(false);
            }}
            style={{ marginBottom: '20px', fontWeight: 'bold', color: 'var(--accent-purple)', border: '1px solid var(--accent-purple)' }}
          >
            Teacher Dashboard
          </button>

          <button
            className={`nav-item ${!activeItem && appView === 'student' ? 'active' : ''}`}
            onClick={goToDashboardWrapper}
            style={{ marginBottom: '15px', fontWeight: 'bold', color: 'var(--accent-blue)' }}
          >
            Dashboard
          </button>

          <a
            href="https://www.musictechguru.com/homepage/music-tech-tutor/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
            style={{
              marginBottom: '15px',
              fontWeight: 'bold',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.45)',
              background: 'rgba(56, 189, 248, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textDecoration: 'none',
              padding: '10px 14px',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎓</span> 1-on-1 Music Tech Tutor
            </span>
            <span style={{ fontSize: '0.7rem', background: 'rgba(56, 189, 248, 0.25)', color: '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
              Thor
            </span>
          </a>

          <button
            className={`nav-item ${activeItem?.type === 'dictionary_selector' ? 'active' : ''}`}
            onClick={() => {
              handleItemSelectWrapper({ type: 'dictionary_selector', title: 'Dictionary Quizzes' });
            }}
            style={{ marginBottom: '10px', fontWeight: 'bold', color: 'var(--accent-success)', border: '1px solid var(--accent-success)' }}
          >
            Dictionary Quizzes
          </button>

          <button
            className={`nav-item ${activeItem?.type === 'tracksheet_creator' ? 'active' : ''}`}
            onClick={() => {
              handleItemSelectWrapper({ id: 'tracksheet_creator', type: 'tracksheet_creator', title: 'Component 1: Track Sheet & Logbook', isPremium: true });
            }}
            style={{ 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              color: '#c084fc', 
              border: '1px solid rgba(192, 132, 252, 0.4)',
              background: activeItem?.type === 'tracksheet_creator' ? 'rgba(192, 132, 252, 0.15)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎚️</span> Component 1 Track Sheet
            </span>
            {!currentUser?.is_premium && <span style={{ fontSize: '0.8rem', color: '#facc15' }}>🔒</span>}
          </button>

          <button
            className={`nav-item ${activeItem?.type === 'component1_guide' ? 'active' : ''}`}
            onClick={() => {
              handleItemSelectWrapper({ id: 'component1_guide', type: 'component1_guide', title: 'Component 1: Recording Guide & Tick List', isPremium: true });
            }}
            style={{ 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              color: '#34d399', 
              border: '1px solid rgba(52, 211, 153, 0.45)',
              background: activeItem?.type === 'component1_guide' ? 'rgba(16, 185, 129, 0.14)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span> Component 1 Guide & Tick List
            </span>
            {!currentUser?.is_premium && <span style={{ fontSize: '0.8rem', color: '#facc15' }}>🔒</span>}
          </button>

          <button
            className={`nav-item ${activeItem?.type === 'component2_guide' ? 'active' : ''}`}
            onClick={() => {
              handleItemSelectWrapper({ id: 'component2_guide', type: 'component2_guide', title: 'Component 2: Composition Guide & Logbook', isPremium: true });
            }}
            style={{ 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              color: '#f472b6', 
              border: '1px solid rgba(244, 114, 182, 0.45)',
              background: activeItem?.type === 'component2_guide' ? 'rgba(244, 114, 182, 0.12)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎹</span> Component 2 Guide & Tick List
            </span>
            {!currentUser?.is_premium && <span style={{ fontSize: '0.8rem', color: '#facc15' }}>🔒</span>}
          </button>

          <button
            className={`nav-item ${activeItem?.type === 'timetable_builder' ? 'active' : ''}`}
            onClick={() => {
              handleItemSelectWrapper({ id: 'timetable_builder', type: 'timetable_builder', title: '16-Block Timetable & Scheme of Work' });
            }}
            style={{ 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              color: '#38bdf8', 
              border: '1px solid rgba(56, 189, 248, 0.4)',
              background: activeItem?.type === 'timetable_builder' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🗺️</span> 16-Block Timetable & SOW
          </button>

          <button
            className={`nav-item ${activeItem?.type === 'quick_fire_daily5' ? 'active' : ''}`}
            onClick={() => {
              handleItemSelectWrapper({ id: 'quick_fire_daily5', type: 'quick_fire_daily5', title: 'Daily 5 Quick-Fire Drill' });
            }}
            style={{ 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              color: '#fb923c', 
              border: '1px solid rgba(249, 115, 22, 0.45)',
              background: activeItem?.type === 'quick_fire_daily5' ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🔥</span> Daily 5 Quick-Fire
          </button>

          <button
            className={`nav-item ${activeItem?.type === 'lp_fingerprints' ? 'active' : ''}`}
            onClick={() => {
              handleItemSelectWrapper({ id: 'lp_fingerprints', type: 'lp_fingerprints', title: 'Sonic Fingerprints: Production Analysis', isPremium: true });
            }}
            style={{ 
              marginBottom: '20px', 
              fontWeight: 'bold', 
              color: '#c084fc', 
              border: '1px solid rgba(192, 132, 252, 0.45)',
              background: activeItem?.type === 'lp_fingerprints' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎧</span> Sonic Fingerprints (1950s–2010s)
            </span>
            {!currentUser?.is_premium && <span style={{ fontSize: '0.8rem', color: '#facc15' }}>🔒</span>}
          </button>

          {/* Curriculum Stages Header */}
          <div className="stages-overview-header">
            <span className="stages-overview-title">Curriculum Stages</span>
            <button
              type="button"
              className="stages-toggle-all-btn"
              onClick={toggleAllStages}
              title={allStagesExpanded ? "Collapse all stages" : "Expand all stages"}
            >
              {allStagesExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          {courseData.sections.map((section, secIdx) => {
            // Group items by base Topic name if they are Topic Mastery Quizzes
            const isTopicSection = section.title.includes("Topic Mastery");
            let groupedItems = [];
            let topicGroupCount = 0;

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

              const groupKeys = Object.keys(topicGroups);
              topicGroupCount = groupKeys.length;
              groupKeys.forEach(baseTitle => {
                groupedItems.push({
                  isGroup: true,
                  title: baseTitle,
                  items: topicGroups[baseTitle]
                });
              });
            } else {
              groupedItems = section.items || [];
            }

            const isExpanded = Boolean(expandedStages[secIdx]);
            const theme = STAGE_THEMES[secIdx % STAGE_THEMES.length];
            const parsed = parseStageTitle(section.title);
            const countLabel = getStageCountLabel(section, isTopicSection, topicGroupCount);
            const isActiveStage = section.items?.some(it => isItemActive(it));

            return (
              <div key={secIdx} className="nav-section">
                <button
                  type="button"
                  onClick={() => toggleStage(secIdx)}
                  className={`stage-header-btn ${isExpanded ? 'expanded' : ''} ${isActiveStage ? 'is-active-stage' : ''}`}
                  style={{
                    borderLeftColor: (isExpanded || isActiveStage) ? theme.color : 'rgba(255, 255, 255, 0.08)',
                    background: isActiveStage 
                      ? (isExpanded ? `linear-gradient(135deg, ${theme.bg} 0%, rgba(30, 41, 59, 0.7) 100%)` : theme.bg)
                      : (isExpanded ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)'),
                    borderColor: isActiveStage ? theme.border : (isExpanded ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.08)')
                  }}
                  aria-expanded={isExpanded}
                  aria-label={`${parsed.badge}: ${parsed.name}`}
                >
                  <div className="stage-header-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        className="stage-badge"
                        style={{
                          color: theme.color,
                          background: theme.bg,
                          border: `1px solid ${theme.border}`
                        }}
                      >
                        {parsed.badge}
                      </span>
                      {isActiveStage && (
                        <span className="stage-active-badge" title="Active Stage">
                          <span className="stage-active-dot" style={{ background: theme.color, boxShadow: `0 0 8px ${theme.color}` }}></span>
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="stage-count-pill">{countLabel}</span>
                      <svg
                        className={`stage-chevron ${isExpanded ? 'rotated' : ''}`}
                        width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className="stage-header-title">
                    {parsed.name}
                  </div>
                </button>

                {isExpanded && (
                  <div className="stage-content">
                    {groupedItems.map((item, itemIdx) => {
                      if (item.isGroup) {
                        const isTopicExpanded = expandedTopic === item.title;
                        const hasActiveChild = item.items?.some(sub => isItemActive(sub));
                        const isAllPremium = item.items?.length > 0 && item.items.every(sub => sub.isPremium);
                        return (
                          <div key={itemIdx} className="stage-topic-group">
                            <div
                              onClick={() => setExpandedTopic(isTopicExpanded ? null : item.title)}
                              className={`stage-topic-header ${isTopicExpanded ? 'expanded' : ''} ${hasActiveChild ? 'has-active-child' : ''}`}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            >
                              <span className="stage-topic-title">{item.title}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {isAllPremium && !currentUser?.is_premium && (
                                  <span style={{ fontSize: '0.75rem', color: '#facc15' }} title="Premium Topic">🔒</span>
                                )}
                                <svg
                                  className={`stage-topic-chevron ${isTopicExpanded ? 'rotated' : ''}`}
                                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                >
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </div>
                            </div>

                            {isTopicExpanded && (
                              <div className="stage-subtopic-list">
                                {item.items.map((subItem, subIdx) => (
                                  <button
                                    key={subIdx}
                                    className={`nav-item stage-subitem ${isItemActive(subItem) ? 'active' : ''}`}
                                    onClick={() => handleItemSelectWrapper(subItem)}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                  >
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <span className="subitem-bullet"></span>
                                      {subItem.title.includes('(Part 1)') ? 'Part 1' : 'Part 2'}
                                    </span>
                                    {subItem.isPremium && !currentUser?.is_premium && (
                                      <span style={{ fontSize: '0.75rem', color: '#facc15' }}>🔒</span>
                                    )}
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
                          className={`nav-item stage-nav-item ${isItemActive(item) ? 'active' : ''}`}
                          onClick={() => handleItemSelectWrapper(item)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                          {item.isPremium && !currentUser?.is_premium && (
                            <span style={{ fontSize: '0.75rem', flexShrink: 0, color: '#facc15' }}>🔒</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>



      {/* Main Content Area */}
      <main className="main-content">
        {!currentUser && activeItem && (
          <div style={{
            background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '12px',
            padding: '12px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem' }}>🎧</span>
              <div>
                <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>Free Revision Preview</strong>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
                  You are previewing <strong>{activeItem.title}</strong>. Practice freely or log in to track your scores across all stages.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={goToDashboardWrapper}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                ← All Topics
              </button>
              <button
                onClick={goToDashboardWrapper}
                style={{
                  background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Log In / Sign Up
              </button>
            </div>
          </div>
        )}
        <Suspense fallback={<LoadingFallback />}>
          {activeItem ? (
            activeItem.type === 'quick_fire_daily5' ? (
              <QuickFireDaily5 onExit={goToDashboardWrapper} />
            ) : activeItem.type === 'timetable_builder' ? (
              <TimetableBuilder onNavigate={handleItemSelectWrapper} onBack={goToDashboardWrapper} />
            ) : activeItem.type === 'tracksheet_creator' ? (
              !currentUser?.is_premium ? (
                <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '10px 0' }}>
                  <button
                    onClick={goToDashboardWrapper}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      marginBottom: '20px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ← Back to Dashboard
                  </button>
                  <PremiumLocked itemTitle={activeItem.title || 'Component 1: Track Sheet & Logbook'} />
                </div>
              ) : (
                <TracksheetCreator onBack={goToDashboardWrapper} initialMode="generator" />
              )
            ) : activeItem.type === 'component1_guide' ? (
              !currentUser?.is_premium ? (
                <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '10px 0' }}>
                  <button
                    onClick={goToDashboardWrapper}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      marginBottom: '20px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ← Back to Dashboard
                  </button>
                  <PremiumLocked itemTitle={activeItem.title || 'Component 1: Recording Guide & Tick List'} />
                </div>
              ) : (
                <TracksheetCreator onBack={goToDashboardWrapper} initialMode="checklist" />
              )
            ) : activeItem.type === 'component2_guide' ? (
              !currentUser?.is_premium ? (
                <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '10px 0' }}>
                  <button
                    onClick={goToDashboardWrapper}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      marginBottom: '20px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ← Back to Dashboard
                  </button>
                  <PremiumLocked itemTitle={activeItem.title || 'Component 2: Composition Guide & Logbook'} />
                </div>
              ) : (
                <Component2Guide onBack={goToDashboardWrapper} />
              )
            ) : activeItem.type === 'lp_quiz' ? (
              <QuizPlayer quiz={activeItem} onFinish={goToDashboardWrapper} />
            ) : activeItem.type === 'lp_activity' ? (
              <WorksheetPlayer activity={activeItem} onFinish={goToDashboardWrapper} />
            ) : activeItem.type === 'lp_fingerprints' ? (
              !currentUser?.is_premium ? (
                <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '10px 0' }}>
                  <button
                    onClick={goToDashboardWrapper}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      marginBottom: '20px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ← Back to Dashboard
                  </button>
                  <PremiumLocked itemTitle={activeItem.title || 'Sonic Fingerprints: Production Analysis'} />
                </div>
              ) : (
                <FingerprintsQuizPlayer onExit={goToDashboardWrapper} />
              )
            ) : activeItem.type === 'dictionary_selector' ? (
              <DictionaryQuizSelector
                onSelectQuiz={(quiz) => handleItemSelectWrapper({ type: 'lp_quiz', ...quiz })}
                onBack={goToDashboardWrapper}
              />
            ) : (activeItem.type === 'component3_exam' || activeItem.type === 'component4_exam') ? (
              <Component3ExamPlayer
                examData={activeItem}
                onExit={goToDashboardWrapper}
              />
            ) : activeItem.type === 'lp_synth_quiz' ? (
              <SynthesizerQuiz quiz={activeItem} onExit={goToDashboardWrapper} />
            ) : activeItem.type === 'effects_chain_quiz' ? (
              <EffectsChainQuiz quiz={activeItem} onExit={goToDashboardWrapper} />
            ) : activeItem.type === 'microphone_placement_quiz' ? (
              <MicrophonePlacementQuiz quiz={activeItem} onExit={goToDashboardWrapper} />
            ) : activeItem.type === 'production_technique_quiz' ? (
              <ProductionTechniqueQuiz quiz={activeItem} onExit={goToDashboardWrapper} />
            ) : activeItem.type === 'rock_production_quiz' ? (
              <RockProductionQuiz quiz={activeItem} onExit={goToDashboardWrapper} />
            ) : activeItem.type === 'sample_chopping_quiz' ? (
              <SampleChoppingQuiz quiz={activeItem} onExit={goToDashboardWrapper} />
            ) : activeItem.type === 'premium_locked' ? (
              <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '10px 0' }}>
                <button
                  onClick={goToDashboardWrapper}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#94a3b8',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                >
                  ← Back to Dashboard
                </button>
                <PremiumLocked itemTitle={activeItem.title} />
              </div>
            ) : (
              <LessonViewer lesson={activeItem} onBack={goToDashboardWrapper} />
            )
          ) : (
            <Dashboard onNavigate={handleItemSelectWrapper} onOpenProfile={() => setShowProfileSettings(true)} />
          )}
        </Suspense>
      </main>

      {/* Full-screen Welcome Video */}
      {showWelcomeVideo && (
        <Suspense fallback={null}>
          <WelcomeVideoModal onClose={handleWelcomeVideoClose} />
        </Suspense>
      )}

      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <Suspense fallback={null}>
          <ProfileSettings onClose={() => setShowProfileSettings(false)} />
        </Suspense>
      )}

      {/* Update Password Modal */}
      {needsPasswordReset && (
        <Suspense fallback={null}>
          <UpdatePasswordModal />
        </Suspense>
      )}

      {/* Floating Blue Music Tech Guru Buddy */}
      {currentUser && (
        <GuruBuddy
          userProgress={userProgress}
          courseData={courseData}
          onNavigate={handleItemSelectWrapper}
          activeItem={activeItem}
          onGoToDashboard={goToDashboardWrapper}
        />
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
