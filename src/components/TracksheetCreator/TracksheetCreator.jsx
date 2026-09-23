import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Sparkles, Music, Mic2, Database, History, Sliders, 
  FileText, Copy, Check, Disc,
  Search, ArrowLeft, RefreshCw, LayoutTemplate,
  FileDown, Loader2, X, Radio, Download, Printer, Zap, GraduationCap
} from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './TracksheetCreator.css';
import { getTracksheetActivityPhrases, getSolutionEngineeringPhrases } from './activityPhrases';
import DossierView from './DossierView';
import LogbookDossierView from './LogbookDossierView';
import ProducerDossierView from './ProducerDossierView';
import VideoCompanionModal from './VideoCompanionModal';
import { parseHistoricalTracksheet } from './tracksheetParser';
import { parseLogbook } from './logbookParser';
import { parseProducerRecreation } from './producerParser';
import { downloadGoodLookingPdf } from './pdfExporter';
import { downloadProducerPdf } from './producerPdfExporter';

export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) {
      return import.meta.env.VITE_TRACKSHEET_API_URL_DEV || 'http://localhost:3001';
    }
  }
  return import.meta.env.VITE_TRACKSHEET_API_URL || 'https://tracksheet-creator-2.onrender.com';
}

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
  { track: 'Fame', artist: 'David Bowie', id: 1 },
  { track: 'Bohemian Rhapsody', artist: 'Queen', id: 16 },
  { track: 'Superstition', artist: 'Stevie Wonder', id: 34 },
  { track: 'Whole Lotta Love', artist: 'Led Zeppelin', id: 200 },
  { track: 'Taxman', artist: 'The Beatles', id: 37 },
  { track: 'Hey Jude', artist: 'The Beatles', id: 168 },
  { track: 'Hotel California', artist: 'The Eagles', id: 5 },
  { track: 'Yesterday', artist: 'The Beatles', id: 189 }
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

let cachedArchive = null;
async function getArchiveData() {
  if (cachedArchive && cachedArchive.length > 0) return cachedArchive;
  try {
    const res = await fetch('/data/tracksheet_archive.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        cachedArchive = data;
        return data;
      }
    }
  } catch (e) {
    console.warn('Could not load /data/tracksheet_archive.json:', e);
  }
  return [];
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

  // Platform Mode: 'mtg' (Component 1) vs 'producer' (Producer Studio)
  const [platformMode, setPlatformMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tracksheet_platform_mode');
      if (saved === 'producer' || saved === 'mtg') return saved;
    }
    return 'mtg';
  });

  // Component 1 & Logbook state
  const [selectedDaw, setSelectedDaw] = useState('Logic Pro');
  const [c1Solutions, setC1Solutions] = useState([]);
  const [c1Loading, setC1Loading] = useState(false);
  const [c1Phrases, setC1Phrases] = useState([]);

  // Producer Studio state
  const [selectedProducerDaw, setSelectedProducerDaw] = useState('Logic Pro');
  const [producerSolutions, setProducerSolutions] = useState([]);
  const [producerLoading, setProducerLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('tracksheet'); // 'tracksheet' | daw string | 'producer' | `producer-${daw}`
  const [copyNotification, setCopyNotification] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Layout mode: 'dossier' vs 'text'
  const [tracksheetLayout, setTracksheetLayout] = useState(() => {
    return localStorage.getItem('tracksheet_layout_mode') || 'dossier';
  });

  const activityRef = useRef(null);
  const c1ActivityRef = useRef(null);
  const resultPanelRef = useRef(null);

  useEffect(() => {
    if (loading && searchActive && activityRef.current && typeof window !== 'undefined' && window.innerWidth <= 768) {
      activityRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [loading, searchActive]);

  useEffect(() => {
    if (c1Loading && c1ActivityRef.current && typeof window !== 'undefined' && window.innerWidth <= 768) {
      c1ActivityRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [c1Loading]);

  const fetchHistory = async () => {
    const apiBase = getApiBaseUrl();
    try {
      const res = await fetch(`${apiBase}/api/tracksheets`);
      if (res.ok) {
        const cType = res.headers.get('content-type') || '';
        if (cType.includes('application/json')) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setHistory(data);
            return;
          }
        }
      }
    } catch {
      // Backend not running, load static archive
    }

    const staticData = await getArchiveData();
    if (staticData && staticData.length > 0) {
      setHistory(staticData);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSetLayout = (mode) => {
    setTracksheetLayout(mode);
    localStorage.setItem('tracksheet_layout_mode', mode);
  };

  const handleGenerate = async (e, forceRegenerate = false, overrideTrack = null, overrideArtist = null) => {
    if (e && e.preventDefault) e.preventDefault();
    const reqTrackName = (overrideTrack !== null ? overrideTrack : trackName).trim();
    const reqArtistName = (overrideArtist !== null ? overrideArtist : artistName).trim();
    if (!reqTrackName) return;

    setTrackName(reqTrackName);
    setArtistName(reqArtistName);

    const targetTrackId = forceRegenerate ? currentTrackId : null;

    setLoading(true);
    setSearchActive(true);
    const freshPhrases = getTracksheetActivityPhrases({ trackName: reqTrackName, artistName: reqArtistName });
    setTracksheetPhrases(freshPhrases);
    setResult(null);
    setCurrentTrackId(null);
    setC1Solutions([]);
    setProducerSolutions([]);
    setActiveTab('tracksheet');

    const startTime = Date.now();
    const MIN_ANIMATION_MS = 2000;
    const apiBase = getApiBaseUrl();

    try {
      let data = null;

      // 1. Check local client history & static archive first if not forcing regeneration
      if (!forceRegenerate) {
        let archivedMatch = findArchivedTrack(reqTrackName, reqArtistName, history);
        if (!archivedMatch) {
          const staticData = await getArchiveData();
          archivedMatch = findArchivedTrack(reqTrackName, reqArtistName, staticData);
          if (archivedMatch && history.length === 0) {
            setHistory(staticData);
          }
        }
        if (archivedMatch && archivedMatch.content) {
          data = archivedMatch;
        } else if (archivedMatch && archivedMatch.id) {
          try {
            const res = await fetch(`${apiBase}/api/tracksheets/${archivedMatch.id}`);
            if (res.ok) {
              const cType = res.headers.get('content-type') || '';
              if (cType.includes('application/json')) {
                data = await res.json();
              }
            }
          } catch (e) {
            console.warn('Could not fetch full tracksheet by id:', e);
          }

          if (!data) {
            const staticData = await getArchiveData();
            const staticMatch = staticData.find(s => s.id === archivedMatch.id || (s.track_name && archivedMatch.track_name && s.track_name.toLowerCase() === archivedMatch.track_name.toLowerCase()));
            if (staticMatch && staticMatch.content) {
              data = staticMatch;
            }
          }
        }
      }

      // 2. If not found in archive or forcing regeneration, call live backend
      if (!data) {
        try {
          const res = await fetch(`${apiBase}/api/tracksheets/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              track_name: reqTrackName,
              artist_name: reqArtistName,
              force_regenerate: forceRegenerate,
              existing_id: targetTrackId || undefined,
              source: 'mtg_app'
            })
          });

          if (res.ok) {
            const cType = res.headers.get('content-type') || '';
            if (cType.includes('application/json')) {
              data = await res.json();
            }
          }
        } catch (apiErr) {
          console.warn('Live API generation call failed:', apiErr);
        }
      }

      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_ANIMATION_MS) {
        await new Promise((resolve) => setTimeout(resolve, MIN_ANIMATION_MS - elapsed));
      }

      if (data && data.content) {
        setResult(data.content);
        setCurrentTrackId(data.id);
        setTrackName(data.track_name);
        setArtistName(data.artist_name || '');
        const dedupedC1 = dedupeSolutions(data.c1_solutions || []);
        setC1Solutions(dedupedC1);
        setProducerSolutions(dedupeSolutions(data.producer_solutions || []));
        fetchHistory();

        if (dedupedC1.length > 0) {
          const matched = dedupedC1.find(s => s.daw.toLowerCase() === selectedDaw.toLowerCase()) || dedupedC1[0];
          setActiveTab(matched.daw);
          setSelectedDaw(matched.daw);
        } else {
          setActiveTab('tracksheet');
        }

        if (data.kept_existing_highest) {
          setCopyNotification(`Retained historical tracksheet with highest score (${data.score}%)`);
          setTimeout(() => setCopyNotification(''), 4000);
        }

        setTimeout(() => {
          if (resultPanelRef.current) {
            resultPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      } else {
        setResult(
          `### Track Not Yet in Archive\n\n"${reqTrackName}" was not found in the pre-generated library.\n\n` +
          `Live AI generation of new unarchived tracks requires the backend server to be connected.\n\n` +
          `**Tip:** Choose any of the **Exam Classic Tracks** or the **2027 C1 Example track choices** above to view complete multi-track session sheets and logbooks immediately!`
        );
      }
    } catch (error) {
      console.error('Generation failed', error);
      setResult('Could not load track information. Please select a track from the 2027 C1 Example track choices or the Archive.');
    } finally {
      setSearchActive(false);
      setLoading(false);
    }
  };

  const handleGenerateC1 = async (dawOverride) => {
    const dawToUse = dawOverride || selectedDaw;
    if (!currentTrackId && !result) return;

    const existingSol = c1Solutions.find(s => s.daw.toLowerCase() === dawToUse.toLowerCase());
    if (existingSol) {
      setActiveTab(existingSol.daw);
      setSelectedDaw(existingSol.daw);
      return;
    }

    const apiBase = getApiBaseUrl();
    const freshPhrases = getSolutionEngineeringPhrases(dawToUse, { trackName, artistName });
    setC1Phrases(freshPhrases);
    setC1Loading(true);

    try {
      const res = await fetch(`${apiBase}/api/tracksheets/${currentTrackId || 0}/c1`, {
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
        const cType = res.headers.get('content-type') || '';
        if (cType.includes('application/json')) {
          const data = await res.json();
          setC1Solutions((prev) => {
            const filtered = prev.filter(item => item.daw.toLowerCase() !== data.daw.toLowerCase());
            const updated = [...filtered, data];
            return dedupeSolutions(updated);
          });
          setActiveTab(data.daw);
          setSelectedDaw(data.daw);
          setC1Loading(false);
          return;
        }
      }
    } catch (error) {
      console.error('C1 generation failed', error);
    } finally {
      setC1Loading(false);
    }
  };

  const handleGenerateProducer = async (dawOverride) => {
    const dawToUse = dawOverride || selectedProducerDaw;
    if (!currentTrackId && !result) return;

    const existingSol = producerSolutions.find(s => s.daw.toLowerCase() === dawToUse.toLowerCase());
    if (existingSol) {
      setActiveTab(`producer-${existingSol.daw}`);
      setSelectedProducerDaw(existingSol.daw);
      return;
    }

    const apiBase = getApiBaseUrl();
    setProducerLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/tracksheets/${currentTrackId || 0}/producer`, {
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
        const cType = res.headers.get('content-type') || '';
        if (cType.includes('application/json')) {
          const data = await res.json();
          setProducerSolutions((prev) => {
            const filtered = prev.filter(item => item.daw.toLowerCase() !== data.daw.toLowerCase());
            const updated = [...filtered, data];
            return dedupeSolutions(updated);
          });
          setActiveTab(`producer-${data.daw}`);
          setSelectedProducerDaw(data.daw);
          setProducerLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error('Producer generation failed', error);
    } finally {
      setProducerLoading(false);
    }
  };

  const loadHistoryItem = async (id) => {
    setLoading(true);
    setSearchActive(false);
    const apiBase = getApiBaseUrl();

    try {
      const res = await fetch(`${apiBase}/api/tracksheets/${id}`);
      if (res.ok) {
        const data = await res.json();
        setResult(data.content);
        setCurrentTrackId(data.id);
        setTrackName(data.track_name);
        const dedupedC1 = dedupeSolutions(data.c1_solutions || []);
        setC1Solutions(dedupedC1);
        setProducerSolutions(dedupeSolutions(data.producer_solutions || []));
        if (dedupedC1.length > 0) {
          const matched = dedupedC1.find(s => s.daw.toLowerCase() === selectedDaw.toLowerCase()) || dedupedC1[0];
          setActiveTab(matched.daw);
          setSelectedDaw(matched.daw);
        } else {
          setActiveTab('tracksheet');
        }
        setHistoryOpen(false);
        setLoading(false);

        setTimeout(() => {
          if (resultPanelRef.current) {
            resultPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
        return;
      }
    } catch (e) {
      console.error('Error loading history item from API:', e);
    }

    const staticData = await getArchiveData();
    const found = staticData.find(item => item.id === id);
    if (found && found.content) {
      setResult(found.content);
      setCurrentTrackId(found.id);
      setTrackName(found.track_name);
      setArtistName(found.artist_name || '');
      const dedupedC1 = dedupeSolutions(found.c1_solutions || []);
      setC1Solutions(dedupedC1);
      setProducerSolutions(dedupeSolutions(found.producer_solutions || []));
      if (dedupedC1.length > 0) {
        const matched = dedupedC1.find(s => s.daw.toLowerCase() === selectedDaw.toLowerCase()) || dedupedC1[0];
        setActiveTab(matched.daw);
        setSelectedDaw(matched.daw);
      } else {
        setActiveTab('tracksheet');
      }
      setHistoryOpen(false);
      setLoading(false);

      setTimeout(() => {
        if (resultPanelRef.current) {
          resultPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return;
    }

    setLoading(false);
    alert(`Could not load track #${id}. Please check your connection.`);
  };

  const handleCopy = (contentToCopy) => {
    if (!contentToCopy) return;
    navigator.clipboard.writeText(contentToCopy);
    setCopyNotification('Copied to clipboard!');
    setTimeout(() => setCopyNotification(''), 3000);
  };

  const handleDownload = (content, filename) => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPdf = async (type) => {
    const isLogbook = type === 'logbook' || type === 'c1' || (!isTracksheetTab && !isProducerTab);
    const isProd = type === 'producer' || isProducerTab;
    const content = isProd ? (currentProducer?.content || '') : (isLogbook ? (currentC1?.content || '') : (result || ''));
    if (!content) return;

    setPdfGenerating(true);
    try {
      if (isProd) {
        await downloadProducerPdf({
          content,
          trackName,
          artistName,
          daw: currentProducer?.daw || selectedProducerDaw
        });
      } else {
        await downloadGoodLookingPdf({
          type: isLogbook ? 'logbook' : 'tracksheet',
          content,
          trackName,
          artistName,
          daw: isLogbook ? (currentC1?.daw || selectedDaw) : undefined
        });
      }
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Could not export PDF. Please try again.');
    } finally {
      setPdfGenerating(false);
    }
  };

  const isTracksheetTab = activeTab === 'tracksheet';
  const isProducerTab = !isTracksheetTab && (
    activeTab.startsWith('producer') || 
    producerSolutions.some(s => `producer-${s.daw.toLowerCase()}` === activeTab.toLowerCase() || (platformMode === 'producer' && s.daw.toLowerCase() === activeTab.toLowerCase())) ||
    (platformMode === 'producer' && !activeTab.startsWith('c1') && !c1Solutions.some(s => s.daw.toLowerCase() === activeTab.toLowerCase()))
  );
  const isC1Tab = !isTracksheetTab && !isProducerTab;

  const currentC1 = useMemo(() => {
    if (isTracksheetTab || isProducerTab) return null;
    return c1Solutions.find(s => s.daw.toLowerCase() === activeTab.toLowerCase() || activeTab.toLowerCase() === `c1-${s.daw.toLowerCase()}`) || 
           c1Solutions.find(s => s.daw.toLowerCase() === selectedDaw.toLowerCase()) || 
           c1Solutions[0] || null;
  }, [c1Solutions, activeTab, isTracksheetTab, isProducerTab, selectedDaw]);

  const currentProducer = useMemo(() => {
    if (isTracksheetTab || isC1Tab) return null;
    return producerSolutions.find(s => activeTab.toLowerCase() === `producer-${s.daw.toLowerCase()}` || activeTab.toLowerCase() === s.daw.toLowerCase()) || 
           producerSolutions.find(s => s.daw.toLowerCase() === selectedProducerDaw.toLowerCase()) || 
           producerSolutions[0] || null;
  }, [producerSolutions, activeTab, isTracksheetTab, isC1Tab, selectedProducerDaw]);

  const activeContent = isTracksheetTab 
    ? result 
    : (isProducerTab ? (currentProducer?.content || '') : (currentC1?.content || ''));

  const parsedTracksheetData = useMemo(() => {
    if (!result) return null;
    return parseHistoricalTracksheet(result);
  }, [result]);

  const parsedLogbookData = useMemo(() => {
    if (!currentC1 || !currentC1.content) return null;
    return parseLogbook(currentC1.content);
  }, [currentC1]);

  const parsedProducerData = useMemo(() => {
    if (!currentProducer || !currentProducer.content) return null;
    return parseProducerRecreation(currentProducer.content) || parseLogbook(currentProducer.content);
  }, [currentProducer]);

  const filteredHistory = useMemo(() => {
    if (!historySearch.trim()) return history;
    const q = historySearch.toLowerCase();
    return history.filter(h => 
      (h.track_name && h.track_name.toLowerCase().includes(q)) ||
      (h.artist_name && h.artist_name.toLowerCase().includes(q))
    );
  }, [history, historySearch]);

  // Studio Video Companion State
  const [videoCompanionOpen, setVideoCompanionOpen] = useState(false);
  const [videoCompanionTrack, setVideoCompanionTrack] = useState(null);

  const handleOpenVideoCompanion = (customTrack = null) => {
    if (customTrack) {
      setVideoCompanionTrack(customTrack);
    } else {
      setVideoCompanionTrack({
        id: currentTrackId,
        trackName: trackName,
        artistName: artistName,
        parsedTracksheet: parsedTracksheetData,
        rawMarkdown: result,
        youtubeUrl: parsedTracksheetData?.youtubeUrl || ''
      });
    }
    setVideoCompanionOpen(true);
  };

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
            <History size={16} />
            <span>Library</span>
            {history.length > 0 && <span className="history-count">{history.length}</span>}
          </button>
        </div>
      </div>

      <header>
        <div className="title-container">
          <Sparkles className="title-icon" size={36} color="var(--primary)" />
          <h1>Component 1 Track Sheet &amp; Logbook</h1>
        </div>
        <p className="subtitle">Pearson Edexcel A-Level Music Technology (9MT0/01) Recording Solutions &amp; Multi-Track Intelligence</p>
      </header>

      <main>
        {/* Search & Generator Hero Card */}
        <div className="glass-panel tracksheet-search-panel">
          <form onSubmit={handleGenerate}>
            <div className="input-group">
              <div className="input-field-wrapper">
                <Music size={18} color="var(--text-muted)" className="input-icon" />
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
                <Mic2 size={18} color="var(--text-muted)" className="input-icon" />
                <input 
                  type="text" 
                  className="input-field has-icon" 
                  placeholder="Artist (e.g. David Bowie)" 
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="btn-generate"
                disabled={loading || !trackName.trim()}
              >
                {loading && searchActive ? (
                  <>
                    <Loader2 size={18} className="spin-icon" /> Searching...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Generate Tracksheet
                  </>
                )}
              </button>
            </div>

            {/* Exam Classic Tracks Section */}
            <div className="quick-suggestions-section">
              <div className="suggestion-label">Exam Classic Tracks:</div>
              <div className="pill-group">
                {SUGGESTED_TRACKS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="btn-track-pill"
                    onClick={() => handleGenerate(null, false, item.track, item.artist)}
                  >
                    <strong>{item.track}</strong>
                    <span>({item.artist})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2027 Component 1 Prescribed Options Section */}
            <div className="quick-suggestions-section c1-2027-section">
              <div className="suggestion-label c1-2027-label">2027 C1 Example Track Choices:</div>
              <div className="pill-group">
                {C1_2027_TRACKS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="btn-track-pill pill-c1-2027"
                    onClick={() => handleGenerate(null, false, item.track, item.artist)}
                  >
                    <strong>{item.track}</strong>
                    <span>({item.artist})</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Real-time Activity Monitor */}
        {loading && searchActive && (
          <div ref={activityRef} className="glass-panel activity-monitor-panel">
            <div className="activity-monitor-inner">
              <div className="activity-icon-wrap">
                <div className="activity-radar-ring"></div>
                <Disc className="activity-spinning-disc" size={24} color="#C084FC" />
              </div>
              <div className="activity-text-wrap">
                <span className="activity-badge">
                  <span className="activity-live-dot"></span>
                  ACTIVITY MONITOR
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
          <div ref={resultPanelRef} className="glass-panel tracksheet-result-panel" style={{ animation: 'fadeIn 0.5s ease' }}>
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
              
              {platformMode === 'producer' ? (
                <>
                  {producerSolutions.map((sol) => (
                    <button
                      key={sol.daw}
                      type="button"
                      className={`tab-btn ${isProducerTab && (activeTab.toLowerCase() === `producer-${sol.daw.toLowerCase()}` || activeTab.toLowerCase() === sol.daw.toLowerCase()) ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(`producer-${sol.daw}`);
                        setSelectedProducerDaw(sol.daw);
                      }}
                    >
                      <Zap size={16} color="#06B6D4" />
                      {sol.daw} Studio
                      <span className="daw-tab-badge producer">PRODUCER</span>
                    </button>
                  ))}

                  {producerSolutions.length === 0 && (
                    <button 
                      type="button" 
                      className={`tab-btn ${isProducerTab ? 'active' : ''}`}
                      onClick={() => setActiveTab('producer')}
                    >
                      <Zap size={16} />
                      Studio Recreation
                      <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>(Not yet created)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className={`tab-btn switch-platform-tab ${isC1Tab ? 'active' : ''}`}
                    style={{ borderColor: 'rgba(168, 85, 247, 0.45)', background: isC1Tab ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.1)', color: '#E9D5FF', marginLeft: 'auto' }}
                    onClick={() => {
                      setPlatformMode('mtg');
                      if (typeof window !== 'undefined') localStorage.setItem('tracksheet_platform_mode', 'mtg');
                      if (c1Solutions.length > 0) {
                        setActiveTab(c1Solutions[0].daw);
                        setSelectedDaw(c1Solutions[0].daw);
                      } else {
                        setActiveTab('c1');
                      }
                    }}
                    title="Switch to Pearson Edexcel Component 1 Recording Logbook Suite"
                  >
                    <GraduationCap size={16} color="#C084FC" />
                    <span>Component 1 Logbook</span>
                    <span className="daw-tab-badge mtg">{c1Solutions.length > 0 ? `${c1Solutions.length} Ready` : 'A-LEVEL'}</span>
                  </button>
                </>
              ) : (
                <>
                  {c1Solutions.map((sol) => (
                    <button
                      key={sol.daw}
                      type="button"
                      className={`tab-btn ${isC1Tab && activeTab.toLowerCase() === sol.daw.toLowerCase() ? 'active' : ''}`}
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

                  {c1Solutions.length === 0 && (
                    <button 
                      type="button" 
                      className={`tab-btn ${isC1Tab && activeTab === 'c1' ? 'active' : ''}`}
                      onClick={() => setActiveTab('c1')}
                    >
                      <FileText size={18} />
                      Component 1 Logbook
                      <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>(Not yet created)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className={`tab-btn switch-platform-tab ${isProducerTab ? 'active' : ''}`}
                    style={{ borderColor: 'rgba(6, 182, 212, 0.45)', background: isProducerTab ? 'rgba(6, 182, 212, 0.25)' : 'rgba(6, 182, 212, 0.1)', color: '#CFFAFE', marginLeft: 'auto' }}
                    onClick={() => {
                      setPlatformMode('producer');
                      if (typeof window !== 'undefined') localStorage.setItem('tracksheet_platform_mode', 'producer');
                      if (producerSolutions.length > 0) {
                        setActiveTab(`producer-${producerSolutions[0].daw}`);
                        setSelectedProducerDaw(producerSolutions[0].daw);
                      } else {
                        setActiveTab('producer');
                      }
                    }}
                    title="Switch to Producer Studio In-The-Box Recreation"
                  >
                    <Zap size={16} color="#06B6D4" />
                    <span>Producer Studio</span>
                    <span className="daw-tab-badge producer">{producerSolutions.length > 0 ? `${producerSolutions.length} Ready` : 'PRODUCER'}</span>
                  </button>
                </>
              )}
            </div>

            {/* On-Demand DAW Selector & Action Bar */}
            {platformMode === 'producer' ? (
              <div className="c1-control-bar" style={{ borderColor: 'rgba(6, 182, 212, 0.4)' }}>
                <div className="c1-info">
                  <span className="c1-title">
                    <Zap size={18} color="#06B6D4" />
                    Studio Sound Design &amp; In-The-Box Recreation Suite
                  </span>
                  <span className="c1-subtitle">
                    Select your DAW to engineer authentic in-the-box stem sound design, native stock chains, and 3rd-party vintage emulations.
                  </span>
                </div>

                <div className="c1-actions">
                  <select 
                    className="daw-select"
                    value={selectedProducerDaw}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedProducerDaw(val);
                      const existing = producerSolutions.find(s => s.daw.toLowerCase() === val.toLowerCase());
                      if (existing) {
                        setActiveTab(`producer-${existing.daw}`);
                      }
                    }}
                  >
                    {DAW_OPTIONS.map((daw) => {
                      const isCreated = producerSolutions.some(s => s.daw.toLowerCase() === daw.toLowerCase());
                      return (
                        <option key={daw} value={daw}>
                          {daw} {isCreated ? '✓ (Recreated)' : ''}
                        </option>
                      );
                    })}
                  </select>

                  <button 
                    type="button"
                    className="btn-c1"
                    style={{ background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', borderColor: '#06B6D4' }}
                    onClick={() => handleGenerateProducer(selectedProducerDaw)}
                    disabled={producerLoading || !currentTrackId}
                  >
                    {producerLoading ? (
                      <>
                        <Loader2 size={15} className="spin-icon" /> Engineering Recreation...
                      </>
                    ) : (
                      <>
                        <Zap size={16} />
                        {producerSolutions.some(s => s.daw.toLowerCase() === selectedProducerDaw.toLowerCase()) 
                          ? `Regenerate ${selectedProducerDaw} Recreation` 
                          : `Recreate in ${selectedProducerDaw}`}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
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
                        <Loader2 size={15} className="spin-icon" /> Engineering Solution...
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
            )}

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
                    : platformMode === 'producer'
                      ? `Studio Production & Stem Recreation (${currentProducer ? currentProducer.daw : selectedProducerDaw})`
                      : `Component 1 Completed Logbook (${currentC1 ? currentC1.daw : selectedDaw})`
                  }
                </h2>

                {(isTracksheetTab || (platformMode === 'producer' ? currentProducer : currentC1)) && (
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
                    className="btn-toolbar btn-video-companion"
                    onClick={() => handleOpenVideoCompanion()}
                    title="Watch session video with synchronized Studio Text Monitor"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.22), rgba(56, 189, 248, 0.22))',
                      borderColor: 'rgba(192, 132, 252, 0.45)',
                      color: '#F8FAFC',
                      fontWeight: 600
                    }}
                  >
                    <Radio size={15} color="#34D399" /> Video Companion (BETA)
                  </button>
                )}

                {isTracksheetTab && (
                  <button 
                    type="button" 
                    className="btn-toolbar btn-regenerate" 
                    onClick={() => handleGenerate(null, true)}
                    disabled={loading || c1Loading || producerLoading}
                    title="Regenerate this tracksheet with AI"
                  >
                    <RefreshCw size={15} /> Regenerate Tracksheet
                  </button>
                )}

                <button 
                  type="button" 
                  className="btn-toolbar"
                  onClick={() => handleCopy(activeContent)}
                  title="Copy Markdown content to clipboard"
                >
                  <Copy size={15} /> Copy
                </button>

                <button 
                  type="button"
                  className="btn-toolbar btn-pdf"
                  onClick={() => handleDownloadPdf(isTracksheetTab ? 'tracksheet' : (platformMode === 'producer' ? 'producer' : 'logbook'))}
                  disabled={pdfGenerating}
                  title="Download high-resolution PDF document"
                  style={{
                    background: platformMode === 'producer' 
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(59, 130, 246, 0.25))' 
                      : 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(56, 189, 248, 0.25))',
                    borderColor: platformMode === 'producer' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(168, 85, 247, 0.5)',
                    color: '#F8FAFC',
                    fontWeight: 600
                  }}
                >
                  {pdfGenerating ? (
                    <>
                      <Loader2 size={15} className="spin-icon" /> Generating PDF...
                    </>
                  ) : (
                    <>
                      <FileDown size={15} color={platformMode === 'producer' ? '#38BDF8' : '#C084FC'} /> Download PDF
                    </>
                  )}
                </button>

                <button 
                  type="button" 
                  className="btn-toolbar" 
                  onClick={() => handleDownload(
                    activeContent,
                    `${(trackName || 'track').replace(/[^a-z0-9]/gi, '_')}_${isTracksheetTab ? 'tracksheet' : platformMode === 'producer' ? `Producer_Recreation_${currentProducer ? currentProducer.daw : selectedProducerDaw}` : `C1_Logbook_${currentC1 ? currentC1.daw : selectedDaw}`}.md`
                  )}
                  title="Download Markdown file"
                >
                  <Download size={15} /> .md
                </button>

                <button 
                  type="button" 
                  className="btn-toolbar" 
                  onClick={() => window.print()}
                  title="Print or export via system dialog"
                >
                  <Printer size={15} /> Print
                </button>
              </div>
            </div>

            {/* Document Content View */}
            <div className={`markdown-body ${(isTracksheetTab || (platformMode === 'producer' ? currentProducer : currentC1)) && tracksheetLayout !== 'text' ? 'custom-layout-active' : ''}`}>
              {isTracksheetTab ? (
                tracksheetLayout === 'dossier' && parsedTracksheetData ? (
                  <DossierView data={parsedTracksheetData} onOpenVideoCompanion={() => handleOpenVideoCompanion()} />
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {normalizeMarkdown(result)}
                  </ReactMarkdown>
                )
              ) : platformMode === 'producer' ? (
                currentProducer ? (
                  tracksheetLayout === 'dossier' && (parsedProducerData || parsedLogbookData) ? (
                    <ProducerDossierView data={parsedProducerData || parsedLogbookData} daw={currentProducer.daw} tracksheetData={parsedTracksheetData} />
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {normalizeMarkdown(currentProducer.content)}
                    </ReactMarkdown>
                  )
                ) : (
                  <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                    <Radio size={48} color="#06B6D4" style={{ opacity: 0.8, marginBottom: '1rem' }} />
                    <h3 style={{ color: '#E2E8F0', marginTop: 0 }}>No Producer Recreation Created Yet for {selectedProducerDaw}</h3>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0.5rem auto 1.5rem' }}>
                      Choose your target DAW from the dropdown menu above and click <strong>Recreate in {selectedProducerDaw}</strong> to engineer authentic in-the-box stem sound design, native stock chains, and pro 3rd-party vintage emulations.
                    </p>
                    <button 
                      type="button" 
                      className="btn-c1" 
                      style={{ margin: '0 auto', background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', borderColor: '#06B6D4' }}
                      onClick={() => handleGenerateProducer(selectedProducerDaw)}
                      disabled={producerLoading || !currentTrackId}
                    >
                      {producerLoading ? 'Engineering Recreation...' : `Generate ${selectedProducerDaw} Recreation Now`}
                    </button>
                  </div>
                )
              ) : (
                currentC1 ? (
                  tracksheetLayout === 'dossier' && parsedLogbookData ? (
                    <LogbookDossierView data={parsedLogbookData} daw={currentC1.daw || selectedDaw} tracksheetData={parsedTracksheetData} />
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {normalizeMarkdown(currentC1.content)}
                    </ReactMarkdown>
                  )
                ) : (
                  <div className="empty-c1-state" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                    <Sliders size={48} color="#C084FC" style={{ opacity: 0.8, marginBottom: '1rem' }} />
                    <h3 style={{ color: '#DDD6FE', marginBottom: '0.5rem' }}>No Component 1 Solution Created Yet for {selectedDaw}</h3>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem', fontSize: '0.92rem' }}>
                      Click <strong>Create {selectedDaw} Solution</strong> above to generate a full Edexcel Component 1 logbook with faders, EQ, and mic setups.
                    </p>
                    <button 
                      type="button"
                      className="btn-c1"
                      style={{ margin: '0 auto' }}
                      onClick={() => handleGenerateC1(selectedDaw)}
                      disabled={c1Loading || !currentTrackId}
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

      {/* Studio Video Companion & Synchronized Studio Text Monitor */}
      <VideoCompanionModal
        isOpen={videoCompanionOpen}
        onClose={() => {
          setVideoCompanionOpen(false);
          setVideoCompanionTrack(null);
        }}
        trackId={videoCompanionTrack ? videoCompanionTrack.id : currentTrackId}
        trackName={videoCompanionTrack ? videoCompanionTrack.trackName : trackName}
        artistName={videoCompanionTrack ? videoCompanionTrack.artistName : artistName}
        parsedTracksheet={videoCompanionTrack ? videoCompanionTrack.parsedTracksheet : parsedTracksheetData}
        rawMarkdown={videoCompanionTrack ? videoCompanionTrack.rawMarkdown : result}
        youtubeUrl={videoCompanionTrack ? videoCompanionTrack.youtubeUrl : (parsedTracksheetData?.youtubeUrl || '')}
      />
    </div>
  );
}
