import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Sparkles, Music, Mic2, Database, History, Sliders, 
  FileText, Copy, Check, Disc,
  Search, ArrowLeft, RefreshCw, LayoutTemplate,
  FileDown, Loader2, X
} from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './TracksheetCreator.css';
import { getTracksheetActivityPhrases, getSolutionEngineeringPhrases } from './activityPhrases';
import DossierView from './DossierView';
import LogbookDossierView from './LogbookDossierView';
import { parseHistoricalTracksheet } from './tracksheetParser';
import { parseLogbook } from './logbookParser';
import { downloadGoodLookingPdf } from './pdfExporter';

const API_BASE = import.meta.env.VITE_TRACKSHEET_API_URL || '';

const DAW_OPTIONS = [
  'Logic Pro',
  'Protools',
  'Ableton',
  'FL Studio',
  'Studio One',
  'Cubase',
  'Bitwig'
];

const SUGGESTED_TRACKS = [
  { track: 'Fame', artist: 'David Bowie' },
  { track: 'Bohemian Rhapsody', artist: 'Queen' },
  { track: 'A Day in the Life', artist: 'The Beatles' },
  { track: 'Superstition', artist: 'Stevie Wonder' },
  { track: 'When The Levee Breaks', artist: 'Led Zeppelin' },
  { track: 'Dreams', artist: 'Fleetwood Mac' },
  { track: 'Money', artist: 'Pink Floyd' },
  { track: 'Peg', artist: 'Steely Dan' },
  { track: 'Billie Jean', artist: 'Michael Jackson' },
  { track: 'Roxanne', artist: 'The Police' }
];

const C1_2027_TRACKS = [
  { track: "I Love You, I'm Sorry", artist: "Gracie Abrams", id: 146 },
  { track: "Animals", artist: "Architects", id: 147 },
  { track: "September", artist: "Earth, Wind & Fire", id: 148 },
  { track: "Common People", artist: "Pulp", id: 149 },
  { track: "I Don't Feel Like Dancin'", artist: "Scissor Sisters", id: 150 },
  { track: "The Logical Song", artist: "Supertramp", id: 151 },
  { track: "Kill Bill", artist: "SZA", id: 152 },
  { track: "Chaise Longue", artist: "Wet Leg", id: 153 },
  { track: "Angels", artist: "Robbie Williams", id: 154 },
  { track: "Moving to New York", artist: "The Wombats", id: 36 }
];

const normalizeMarkdown = (text) => {
  if (!text) return '';
  let clean = text;
  clean = clean.replace(/\|[ \t]+\|/g, '|\n|');
  clean = clean.replace(/([^\n])\n(\s*\|[^\n]+\|\s*\n\s*\|[-: ]+[-| :]*\|)/g, '$1\n\n$2');
  clean = clean.replace(/(\|[^\n]+\|)\n([^\n|#])/g, '$1\n\n$2');
  return clean;
};

const normalizeString = (str) => {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ');
};

const findArchivedTrack = (tName, aName, historyItems) => {
  if (!tName || !historyItems || historyItems.length === 0) return null;
  const normT = normalizeString(tName);
  const normA = normalizeString(aName);
  return historyItems.find((item) => {
    const itemT = normalizeString(item.track_name);
    const itemA = normalizeString(item.artist_name);
    if (normA) return itemT === normT && itemA === normA;
    return itemT === normT;
  }) || null;
};

const dedupeSolutions = (solutions) => {
  if (!Array.isArray(solutions) || solutions.length === 0) return [];
  const map = new Map();
  solutions.forEach((sol) => {
    if (!sol || !sol.daw) return;
    const key = sol.daw.toLowerCase();
    const existing = map.get(key);
    if (!existing || (sol.id && !existing.id) || (sol.created_at && (!existing.created_at || new Date(sol.created_at) > new Date(existing.created_at)))) {
      map.set(key, sol);
    }
  });
  return Array.from(map.values()).sort((a, b) => {
    const idxA = DAW_OPTIONS.findIndex(d => d.toLowerCase() === a.daw.toLowerCase());
    const idxB = DAW_OPTIONS.findIndex(d => d.toLowerCase() === b.daw.toLowerCase());
    return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
  });
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ActivityTypewriter({ phrases, shuffle = false, getFreshPhrases = null }) {
  const [prevPhrases, setPrevPhrases] = useState(phrases);
  const [deck, setDeck] = useState(() => {
    const initial = getFreshPhrases ? getFreshPhrases() : phrases;
    return shuffle && initial ? shuffleArray(initial) : (initial || []);
  });
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (phrases !== prevPhrases) {
    setPrevPhrases(phrases);
    const current = getFreshPhrases ? getFreshPhrases() : phrases;
    setDeck(shuffle && current ? shuffleArray(current) : (current || []));
    setPhraseIdx(0);
    setDisplayText('');
    setIsDeleting(false);
  }

  useEffect(() => {
    if (!deck || deck.length === 0) return;
    const currentPhrase = deck[phraseIdx % deck.length];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        const typeSpeed = Math.floor(Math.random() * 20) + 38;
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2600);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 18);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIdx((prev) => {
            const next = prev + 1;
            if (next >= deck.length) {
              if (getFreshPhrases) {
                const fresh = getFreshPhrases();
                setDeck(shuffle ? shuffleArray(fresh) : fresh);
                return 0;
              }
              if (shuffle) {
                setDeck(shuffleArray(phrases));
                return 0;
              }
            }
            return next % deck.length;
          });
        }, 350);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx, deck, shuffle, phrases, getFreshPhrases]);

  return (
    <span className="typewriter-container">
      <span className="typewriter-text">{displayText}</span>
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

export default function TracksheetCreator({ onBack }) {
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [result, setResult] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [tracksheetPhrases, setTracksheetPhrases] = useState([]);

  // Component 1 & Logbook state
  const [selectedDaw, setSelectedDaw] = useState('Logic Pro');
  const [c1Solutions, setC1Solutions] = useState([]);
  const [c1Loading, setC1Loading] = useState(false);
  const [c1Phrases, setC1Phrases] = useState([]);
  const [activeTab, setActiveTab] = useState('tracksheet'); // 'tracksheet' or daw string
  const [copyNotification, setCopyNotification] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Layout mode: 'dossier' vs 'text'
  const [tracksheetLayout, setTracksheetLayout] = useState(() => {
    return localStorage.getItem('mtg_tracksheet_layout') || 'dossier';
  });

  const activityRef = useRef(null);
  const c1ActivityRef = useRef(null);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tracksheets`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (e) {
      console.warn('Could not fetch tracksheet archive:', e);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSetLayout = (mode) => {
    setTracksheetLayout(mode);
    localStorage.setItem('mtg_tracksheet_layout', mode);
  };

  const handleGenerate = async (e, forceRegenerate = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!trackName || !trackName.trim()) return;

    const targetTrackId = forceRegenerate ? currentTrackId : null;
    const reqTrackName = trackName.trim();
    const reqArtistName = artistName ? artistName.trim() : '';

    setLoading(true);
    setSearchActive(true);
    const freshPhrases = getTracksheetActivityPhrases({ trackName: reqTrackName, artistName: reqArtistName });
    setTracksheetPhrases(freshPhrases);
    setResult(null);
    setCurrentTrackId(null);
    setC1Solutions([]);
    setActiveTab('tracksheet');

    const startTime = Date.now();
    const MIN_ANIMATION_MS = 3200;

    try {
      let data = null;

      if (!forceRegenerate) {
        const archivedMatch = findArchivedTrack(reqTrackName, reqArtistName, history);
        if (archivedMatch) {
          const res = await fetch(`${API_BASE}/api/tracksheets/${archivedMatch.id}`);
          if (res.ok) {
            data = await res.json();
          }
        }
      }

      if (!data) {
        const res = await fetch(`${API_BASE}/api/tracksheets/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            track_name: reqTrackName,
            artist_name: reqArtistName,
            force_regenerate: forceRegenerate,
            existing_id: targetTrackId || undefined
          })
        });

        if (res.ok) {
          data = await res.json();
        } else {
          setResult('Error generating tracksheet. Please check that the Tracksheet server backend is running on port 3001.');
          return;
        }
      }

      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_ANIMATION_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_ANIMATION_MS - elapsed));
      }

      setResult(data.content);
      setCurrentTrackId(data.id);
      setTrackName(data.track_name);
      setArtistName(data.artist_name || '');
      setC1Solutions(dedupeSolutions(data.c1_solutions));
      fetchHistory();

      if (data.kept_existing_highest) {
        setCopyNotification(`Retained historical tracksheet with highest score (${data.score}%)`);
        setTimeout(() => setCopyNotification(''), 4000);
      }
    } catch (error) {
      console.error('Generation failed', error);
      setResult('Could not connect to the Tracksheet intelligence engine. Ensure the server backend is running on port 3001.');
    } finally {
      setSearchActive(false);
      setLoading(false);
    }
  };

  const handleGenerateC1 = async (dawOverride) => {
    const dawToUse = dawOverride || selectedDaw;
    if (!currentTrackId && !result) return;

    const freshPhrases = getSolutionEngineeringPhrases(dawToUse, { trackName, artistName });
    setC1Phrases(freshPhrases);
    setC1Loading(true);

    try {
      const res = await fetch(`${API_BASE}/api/tracksheets/${currentTrackId || 0}/c1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          daw: dawToUse,
          track_name: trackName,
          artist_name: artistName,
          content: result
        })
      });

      if (res.ok) {
        const data = await res.json();
        setC1Solutions((prev) => {
          const filtered = prev.filter(item => item.daw.toLowerCase() !== data.daw.toLowerCase());
          const updated = [...filtered, data];
          return dedupeSolutions(updated);
        });
        setActiveTab(data.daw);
        setSelectedDaw(data.daw);
      } else {
        const errData = await res.json().catch(() => null);
        const errMsg = errData?.error || `Server returned error (${res.status})`;
        alert(`Error generating Component 1 solution: ${errMsg}`);
      }
    } catch (error) {
      console.error('C1 generation failed', error);
      alert('Error connecting to the server for Component 1 generation.');
    } finally {
      setC1Loading(false);
    }
  };

  const loadHistoryItem = async (id) => {
    setLoading(true);
    setSearchActive(false);
    try {
      const res = await fetch(`${API_BASE}/api/tracksheets/${id}`);
      if (res.ok) {
        const data = await res.json();
        setResult(data.content);
        setCurrentTrackId(data.id);
        setTrackName(data.track_name);
        setArtistName(data.artist_name || '');
        setC1Solutions(dedupeSolutions(data.c1_solutions));
        setActiveTab('tracksheet');
        setHistoryOpen(false);
      }
    } catch (e) {
      console.error('Error loading history item:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (contentToCopy) => {
    if (!contentToCopy) return;
    navigator.clipboard.writeText(contentToCopy);
    setCopyNotification('Copied to clipboard!');
    setTimeout(() => setCopyNotification(''), 3000);
  };

  const handleDownloadPdf = async (type) => {
    const isLogbook = type === 'logbook' || type === 'c1' || activeTab !== 'tracksheet';
    const content = isLogbook ? (currentC1?.content || '') : (result || '');
    if (!content) return;

    setPdfGenerating(true);
    try {
      await downloadGoodLookingPdf({
        type: isLogbook ? 'logbook' : 'tracksheet',
        content,
        trackName,
        artistName,
        daw: isLogbook ? (currentC1?.daw || selectedDaw) : undefined
      });
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Could not export PDF. Please try again.');
    } finally {
      setPdfGenerating(false);
    }
  };

  const isTracksheetTab = activeTab === 'tracksheet';
  const currentC1 = useMemo(() => {
    if (isTracksheetTab) return null;
    return c1Solutions.find(s => s.daw.toLowerCase() === activeTab.toLowerCase()) || null;
  }, [c1Solutions, activeTab, isTracksheetTab]);

  const parsedTracksheetData = useMemo(() => {
    if (!result) return null;
    return parseHistoricalTracksheet(result);
  }, [result]);

  const parsedLogbookData = useMemo(() => {
    if (!currentC1 || !currentC1.content) return null;
    return parseLogbook(currentC1.content);
  }, [currentC1]);

  const filteredHistory = useMemo(() => {
    if (!historySearch.trim()) return history;
    const q = historySearch.toLowerCase();
    return history.filter(h => 
      (h.track_name && h.track_name.toLowerCase().includes(q)) ||
      (h.artist_name && h.artist_name.toLowerCase().includes(q))
    );
  }, [history, historySearch]);

  return (
    <div className="tracksheet-wrapper">
      {/* Background Gradients */}
      <div className="gradient-blob blob-1"></div>
      <div className="gradient-blob blob-2"></div>

      {/* Top Header & Breadcrumbs */}
      <div className="tracksheet-top-bar">
        {onBack ? (
          <button onClick={onBack} className="btn-back-dashboard">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        ) : <div />}
        <div className="tracksheet-top-right">
          <span className="exam-badge-tag">
            PEARSON EDEXCEL (9MT0/01)
          </span>
          <button 
            onClick={() => setHistoryOpen(true)}
            className="btn-history-pill"
            title="Browse Saved Tracksheets"
          >
            <History size={15} />
            Archive ({history.length})
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <header>
        <h1 style={{ cursor: 'default', userSelect: 'none' }}>
          <Sparkles 
            size={36} 
            className="header-star-icon"
            style={{ 
              verticalAlign: 'middle', 
              marginRight: '12px',
              color: '#F472B6'
            }}
          />
          Component 1 Track Sheet & Logbook
        </h1>
        <p className="subtitle">
          Pearson Edexcel A-Level Music Technology (9MT0/01) Recording Solutions & Multi-Track Intelligence
        </p>
      </header>

      <main>
        {/* Search Panel */}
        <div className="glass-panel">
          <form onSubmit={handleGenerate}>
            <div className="input-group">
              <div className="input-field-wrapper">
                <Music size={20} color="var(--text-muted)" className="input-icon" />
                <input 
                  type="text" 
                  className="input-field has-icon" 
                  placeholder="Track Name (e.g. Fame)" 
                  value={trackName}
                  onChange={(e) => setTrackName(e.target.value)}
                  required
                />
              </div>
              <div className="input-field-wrapper">
                <Mic2 size={20} color="var(--text-muted)" className="input-icon" />
                <input 
                  type="text" 
                  className="input-field has-icon"
                  placeholder="Artist (e.g. David Bowie)" 
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-generate" disabled={loading || !trackName.trim()}>
                {loading && searchActive ? (
                  <>
                    <div className="loader"></div>
                    Searching Archives...
                  </>
                ) : loading ? (
                  <div className="loader"></div>
                ) : (
                  <>
                    <Sparkles size={16} /> Generate Tracksheet
                  </>
                )}
              </button>

              {result && (
                <button 
                  type="button" 
                  className="btn-regenerate-form" 
                  onClick={() => handleGenerate(null, true)}
                  disabled={loading || !trackName}
                  title="Regenerate this tracksheet with AI"
                >
                  <RefreshCw size={16} />
                  Regenerate
                </button>
              )}
            </div>
          </form>

          {/* Quick Suggestions */}
          <div className="quick-suggestions-row">
            <span className="quick-label">Exam Classic Tracks:</span>
            <div className="quick-pills">
              {SUGGESTED_TRACKS.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-pill"
                  onClick={() => {
                    setTrackName(t.track);
                    setArtistName(t.artist);
                  }}
                >
                  {t.track} <span className="pill-artist">({t.artist})</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2027 C1 Example track choices */}
          <div className="quick-suggestions-row c1-2027-row">
            <span className="quick-label c1-2027-label">2027 C1 Example track choices:</span>
            <div className="quick-pills">
              {C1_2027_TRACKS.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-pill c1-2027-pill"
                  onClick={() => {
                    setTrackName(t.track);
                    setArtistName(t.artist);
                    if (t.id) {
                      loadHistoryItem(t.id);
                    }
                  }}
                  title={`Load ${t.track} by ${t.artist} (#${t.id})`}
                >
                  {t.track} <span className="pill-artist">({t.artist})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Activity Monitor for Tracksheet */}
        {loading && searchActive && (
          <div ref={activityRef} className="glass-panel activity-monitor-panel">
            <div className="activity-monitor-inner">
              <div className="activity-icon-wrap">
                <div className="activity-radar-ring"></div>
                <Sliders className="activity-spinning-sliders" size={22} color="#8B5CF6" />
              </div>
              <div className="activity-text-wrap">
                <span className="activity-badge">
                  <span className="activity-live-dot"></span>
                  HISTORICAL MULTI-TRACK ARCHIVE & SESSION DISPATCH
                </span>
                <div className="activity-phrase-container">
                  <ActivityTypewriter 
                    phrases={tracksheetPhrases.length > 0 ? tracksheetPhrases : getTracksheetActivityPhrases({ trackName, artistName })} 
                    shuffle={true} 
                    getFreshPhrases={() => getTracksheetActivityPhrases({ trackName, artistName })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Document Result Panel */}
        {result && (
          <div className="glass-panel" style={{ animation: 'fadeIn 0.5s ease' }}>
            {/* View Switching Tabs */}
            <div className="view-tabs">
              <button 
                type="button" 
                className={`tab-btn ${isTracksheetTab ? 'active' : ''}`}
                onClick={() => setActiveTab('tracksheet')}
              >
                <Database size={18} />
                Historical Tracksheet
              </button>
              
              {c1Solutions.map((sol) => (
                <button
                  key={sol.daw}
                  type="button"
                  className={`tab-btn ${activeTab.toLowerCase() === sol.daw.toLowerCase() ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(sol.daw);
                    setSelectedDaw(sol.daw);
                  }}
                >
                  <FileText size={18} />
                  {sol.daw} Logbook
                  <span className="daw-tab-badge">C1</span>
                </button>
              ))}
            </div>

            {/* Component 1 Control Bar */}
            <div className="c1-control-bar">
              <div className="c1-info">
                <span className="c1-title">
                  <Sliders size={18} color="#C084FC" />
                  Component 1 Recording Suite
                </span>
                <span className="c1-subtitle">
                  Select your primary DAW to engineer authentic solutions and generate the completed official logbook document.
                </span>
              </div>

              <div className="c1-actions">
                <select 
                  className="daw-select"
                  value={selectedDaw}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedDaw(val);
                    const existing = c1Solutions.find(s => s.daw.toLowerCase() === val.toLowerCase());
                    if (existing) {
                      setActiveTab(existing.daw);
                    }
                  }}
                >
                  {DAW_OPTIONS.map((daw) => {
                    const isCreated = c1Solutions.some(s => s.daw.toLowerCase() === daw.toLowerCase());
                    return (
                      <option key={daw} value={daw}>
                        {daw} {isCreated ? '✓ (Created)' : ''}
                      </option>
                    );
                  })}
                </select>

                <button 
                  type="button"
                  className="btn-c1"
                  onClick={() => handleGenerateC1(selectedDaw)}
                  disabled={c1Loading || !currentTrackId}
                >
                  {c1Loading ? (
                    <>
                      <div className="loader" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                      Engineering {selectedDaw} Solution...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      {c1Solutions.some(s => s.daw.toLowerCase() === selectedDaw.toLowerCase()) 
                        ? `Regenerate ${selectedDaw} Logbook` 
                        : `Create ${selectedDaw} Solution`}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Real-time Component 1 Activity Monitor */}
            {c1Loading && (
              <div ref={c1ActivityRef} className="glass-panel activity-monitor-panel c1-activity-panel">
                <div className="activity-monitor-inner">
                  <div className="activity-icon-wrap">
                    <div className="activity-radar-ring c1-radar"></div>
                    <Sliders className="activity-spinning-sliders" size={22} color="#D946EF" />
                  </div>
                  <div className="activity-text-wrap">
                    <span className="activity-badge c1-badge">
                      <span className="activity-live-dot"></span>
                      {selectedDaw} LOGBOOK ENGINEERING MONITOR
                    </span>
                    <div className="activity-phrase-container">
                      <ActivityTypewriter 
                        phrases={c1Phrases.length > 0 ? c1Phrases : getSolutionEngineeringPhrases(selectedDaw, { trackName, artistName })} 
                        shuffle={true} 
                        getFreshPhrases={() => getSolutionEngineeringPhrases(selectedDaw, { trackName, artistName })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Document Header & Action Toolbar */}
            <div className="result-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <h2>
                  {isTracksheetTab 
                    ? 'Historical Session Tracksheet' 
                    : `Component 1 Completed Logbook (${currentC1 ? currentC1.daw : selectedDaw})`
                  }
                </h2>

                {(isTracksheetTab || currentC1) && (
                  <div className="layout-switcher-bar">
                    <span className="layout-switcher-label">
                      <LayoutTemplate size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      View:
                    </span>
                    <div className="layout-btn-group">
                      <button 
                        type="button" 
                        className={`layout-mode-btn ${tracksheetLayout === 'text' ? 'active' : ''}`}
                        onClick={() => handleSetLayout('text')}
                        title="Classic Text Document"
                      >
                        <FileText size={13} /> Text View
                      </button>
                      <button 
                        type="button" 
                        className={`layout-mode-btn ${tracksheetLayout === 'dossier' ? 'active' : ''}`}
                        onClick={() => handleSetLayout('dossier')}
                        title="Interactive Dossier View"
                      >
                        <Disc size={13} /> Dossier View
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="doc-toolbar">
                {copyNotification && (
                  <span style={{ color: '#4ADE80', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Check size={16} /> {copyNotification}
                  </span>
                )}

                {isTracksheetTab && (
                  <button 
                    type="button" 
                    className="btn-toolbar btn-regenerate" 
                    onClick={() => handleGenerate(null, true)}
                    disabled={loading || c1Loading}
                    title="Regenerate this tracksheet with AI"
                  >
                    <RefreshCw size={15} /> Regenerate Tracksheet
                  </button>
                )}

                <button 
                  type="button"
                  className="btn-toolbar btn-pdf"
                  onClick={() => handleDownloadPdf(isTracksheetTab ? 'tracksheet' : 'logbook')}
                  disabled={pdfGenerating}
                  title="Download high-resolution PDF document"
                >
                  {pdfGenerating ? (
                    <>
                      <Loader2 size={15} className="spin-icon" /> Generating PDF...
                    </>
                  ) : (
                    <>
                      <FileDown size={15} /> Download PDF
                    </>
                  )}
                </button>

                <button 
                  type="button" 
                  className="btn-toolbar"
                  onClick={() => handleCopy(isTracksheetTab ? result : (currentC1?.content || ''))}
                  title="Copy Markdown content to clipboard"
                >
                  <Copy size={15} /> Copy
                </button>
              </div>
            </div>

            {/* Document Content View */}
            <div className={`markdown-body ${(isTracksheetTab || currentC1) && tracksheetLayout !== 'text' ? 'custom-layout-active' : ''}`}>
              {isTracksheetTab ? (
                tracksheetLayout === 'dossier' && parsedTracksheetData ? (
                  <DossierView data={parsedTracksheetData} />
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {normalizeMarkdown(result)}
                  </ReactMarkdown>
                )
              ) : (
                currentC1 ? (
                  tracksheetLayout === 'dossier' && parsedLogbookData ? (
                    <LogbookDossierView data={parsedLogbookData} daw={currentC1.daw || selectedDaw} />
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {normalizeMarkdown(currentC1.content)}
                    </ReactMarkdown>
                  )
                ) : (
                  <div className="empty-c1-state" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                    <Sliders size={48} color="#C084FC" style={{ opacity: 0.8, marginBottom: '1rem' }} />
                    <h3 style={{ color: '#DDD6FE', marginBottom: '0.5rem' }}>No {selectedDaw} Solution Generated Yet</h3>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem', fontSize: '0.92rem' }}>
                      Click "Create {selectedDaw} Solution" above to generate a full Edexcel Component 1 logbook with faders, EQ, and mic setups.
                    </p>
                    <button 
                      type="button"
                      className="btn-c1"
                      style={{ margin: '0 auto' }}
                      onClick={() => handleGenerateC1(selectedDaw)}
                      disabled={c1Loading}
                    >
                      <Sparkles size={16} /> Create {selectedDaw} Solution
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </main>

      {/* Archive Modal Drawer */}
      {historyOpen && (
        <div className="archive-modal-overlay" onClick={() => setHistoryOpen(false)}>
          <div className="archive-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="archive-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={20} color="var(--accent-purple)" />
                <h3>Historical Archive Library</h3>
              </div>
              <button className="btn-close-modal" onClick={() => setHistoryOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="archive-modal-search">
              <Search size={16} className="archive-search-icon" />
              <input 
                type="text" 
                placeholder="Search archive by track or artist..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
              />
            </div>

            <div className="archive-list">
              {filteredHistory.length === 0 ? (
                <p className="empty-archive-msg">No matching tracks in archive.</p>
              ) : (
                filteredHistory.map((item) => (
                  <div 
                    key={item.id} 
                    className="archive-item-card"
                    onClick={() => loadHistoryItem(item.id)}
                  >
                    <div className="archive-item-info">
                      <div className="archive-item-title">{item.track_name}</div>
                      <div className="archive-item-artist">{item.artist_name || 'Unknown Artist'}</div>
                    </div>
                    <div className="archive-item-action">
                      <span className="archive-load-pill">
                        Load
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
