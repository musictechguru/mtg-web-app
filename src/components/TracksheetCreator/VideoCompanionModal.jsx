import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Disc, Play, Pause, Minimize2, Maximize2, X, Volume2, VolumeX, 
  Radio, Mic2, Sliders, Building2, Users, Music, Layers, 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowDownToLine,
  ExternalLink, Sparkles, RefreshCw, Star, Check, Zap
} from 'lucide-react';
import { generateCommentaryTimeline, getActiveBeatForTime, formatSeconds, enforceCommentaryTiming } from './commentaryEngine';
import { COMMENTARY_PERSONAS, COMMENTARY_FEEDBACK_CATEGORIES } from './commentaryPersonas';

// Icon mapper for commentary categories
const CATEGORY_ICONS = {
  preroll: Disc,
  personnel: Users,
  producer: Users,
  arrangement: Music,
  instrument: Music,
  outboard: Sliders,
  studio: Building2,
  backline: Music,
  mic: Mic2,
  panning: Sliders,
  pathway: Layers,
  culture: Radio,
  mix: Disc
};

// Verified catalog of YouTube video IDs for Component 1 and classic tracks (all verified 200 OK for 3rd-party embedding)
const KNOWN_TRACK_VIDEOS = {
  "angels": "luwAMFcc2f8",
  "september": "Gs069dndIYk",
  "animals": "jdWhJcrrjQs",
  "common people": "yuTMWgOduFM",
  "i love you, i'm sorry": "ZWGt1jMIjBY",
  "i love you, i’m sorry": "ZWGt1jMIjBY",
  "kill bill": "MSRcC626prw",
  "chaise longue": "gJ2_y0Zv95w",
  "the logical song": "low6Coqrw9Y",
  "moving to new york": "4X3hDrlc5I4",
  "i don't feel like dancin'": "k6Vu7SRMlFk",
  "i don’t feel like dancin’": "k6Vu7SRMlFk",
  "fame": "Ypgq0qdgVZA",
  "bohemian rhapsody": "fJ9rUzIMcZQ",
  "superstition": "0CFuCYNx-1g",
  "whole lotta love": "HQmmM_qwG4k",
  "taxman": "Maz9ddxEQnM",
  "hey jude": "A_MjCqQoLLA",
  "hotel california": "09839DpTctU",
  "yesterday": "wXTJBr9tt8Q"
};

const API_BASE = import.meta.env.VITE_TRACKSHEET_API_URL || '';

// Universal API Fetcher with automatic fallback to configured API / localhost
async function fetchCompanionApi(endpoint, options = {}) {
  // 1. Try configured API base first (e.g. Render backend)
  if (API_BASE) {
    try {
      const targetUrl = `${API_BASE}${endpoint}`;
      const res = await fetch(targetUrl, options);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        return await res.json();
      }
    } catch (e) {
      // Configured API route network error
    }
  }

  // 2. Try relative route through Vite proxy
  try {
    const res = await fetch(endpoint, options);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (e) {
    // Relative route network error
  }

  // 3. Fallback to localhost:3001 if in development
  if (import.meta.env.DEV) {
    try {
      const fallbackUrl = `http://localhost:3001${endpoint}`;
      const fallbackRes = await fetch(fallbackUrl, options);
      if (fallbackRes.ok) {
        return await fallbackRes.json();
      }
    } catch (fallbackErr) {
      // Fallback error
    }
  }

  throw new Error(`Could not connect to service at ${endpoint}`);
}

export default function VideoCompanionModal({ 
  isOpen, 
  onClose, 
  trackId,
  trackName, 
  artistName, 
  parsedTracksheet, 
  rawMarkdown, 
  youtubeUrl: initialYoutubeUrl 
}) {
  // Screen positioning state: 'center' pop-up modal vs 'docked' at bottom
  const [docked, setDocked] = useState(false);
  const [autoMoveToBottom, setAutoMoveToBottom] = useState(() => {
    return localStorage.getItem('auto_move_companion_to_bottom') !== 'false';
  });
  const [autoMoveActive, setAutoMoveActive] = useState(false);
  const [autoMoveSecondsLeft, setAutoMoveSecondsLeft] = useState(2);
  const [autoMoveDismissed, setAutoMoveDismissed] = useState(false);
  const [isGliding, setIsGliding] = useState(false);
  const [isCompactHud, setIsCompactHud] = useState(() => {
    return localStorage.getItem('video_companion_compact_hud') === 'true';
  });
  const [videoId, setVideoId] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [videoRetryCount, setVideoRetryCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [manualBeatIdx, setManualBeatIdx] = useState(0);
  const [autoLaunch, setAutoLaunch] = useState(() => {
    return localStorage.getItem('auto_launch_video_companion') !== 'false';
  });

  // Persona Voice commentary state (Default to Music Tech Guru)
  const [selectedPersona, setSelectedPersona] = useState(() => {
    return localStorage.getItem('preferred_commentary_persona') || 'guru';
  });
  const [aiBeats, setAiBeats] = useState(null);
  const [isGeneratingPersona, setIsGeneratingPersona] = useState(false);
  const [personaError, setPersonaError] = useState(null);
  const personaCacheRef = useRef({});

  // Typewriter display states
  const [displayedCommentary, setDisplayedCommentary] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const typewriterTimerRef = useRef(null);
  const typewriterBoxRef = useRef(null);

  // Auto-scroll typewriter box into view when beat changes
  useEffect(() => {
    if (typewriterBoxRef.current) {
      typewriterBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeBeat?.id]);

  // Clear persona beats cache if track changes
  const prevTrackIdentifierRef = useRef(null);
  const currentTrackIdentifier = `${trackId || ''}_${trackName || ''}_${artistName || ''}`;

  useEffect(() => {
    if (prevTrackIdentifierRef.current && prevTrackIdentifierRef.current !== currentTrackIdentifier) {
      personaCacheRef.current = {};
      setAiBeats(null);
      setPersonaError(null);
    }
    prevTrackIdentifierRef.current = currentTrackIdentifier;
  }, [currentTrackIdentifier]);

  // Cleanly reset player, videoId, and active timers whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      setVideoId(null);
      setLoadingVideo(false);
      setVideoError(null);
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
      setManualBeatIdx(0);
      setAutoSync(true);
      setRatedBeats({});
      setRatingToast(null);

      if (playerRef.current) {
        try {
          if (typeof playerRef.current.stopVideo === 'function') {
            playerRef.current.stopVideo();
          }
          if (typeof playerRef.current.destroy === 'function') {
            playerRef.current.destroy();
          }
        } catch (e) {}
        playerRef.current = null;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
    }
  }, [isOpen]);

  // Reset video state when switching tracks while modal is open
  useEffect(() => {
    if (isOpen) {
      setVideoId(null);
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
      setManualBeatIdx(0);
      setAutoSync(true);
      setRatedBeats({});
      setRatingToast(null);
    }
  }, [isOpen, trackId, trackName, artistName]);

  // Fetch AI persona beats when persona != 'engineer'
  useEffect(() => {
    if (!isOpen) return;

    if (selectedPersona === 'engineer') {
      setAiBeats(null);
      setIsGeneratingPersona(false);
      setPersonaError(null);
      return;
    }

    // Use cached beats if available
    if (personaCacheRef.current[selectedPersona]) {
      setAiBeats(personaCacheRef.current[selectedPersona]);
      setIsGeneratingPersona(false);
      setPersonaError(null);
      return;
    }

    let isMounted = true;
    async function fetchPersonaBeats() {
      setIsGeneratingPersona(true);
      setPersonaError(null);
      try {
        const data = await fetchCompanionApi('/api/commentary/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            trackId: trackId || null,
            persona: selectedPersona,
            trackName: trackName,
            artistName: artistName,
            tracksheetData: parsedTracksheet,
            content: rawMarkdown,
            rawMarkdown: rawMarkdown
          })
        });
        if (isMounted) {
          if (data.success && Array.isArray(data.beats) && data.beats.length > 0) {
            personaCacheRef.current[selectedPersona] = data.beats;
            setAiBeats(data.beats);
            setPersonaError(null);
          } else {
            console.warn('[VideoCompanion] Persona commentary fallback:', data.error);
            setPersonaError(data.error || 'Failed to craft voice commentary');
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('[VideoCompanion] Network error fetching persona commentary:', err);
          setPersonaError('Could not reach commentary generation server');
        }
      } finally {
        if (isMounted) {
          setIsGeneratingPersona(false);
        }
      }
    }

    fetchPersonaBeats();

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedPersona, trackId, trackName, artistName, parsedTracksheet, rawMarkdown]);

  // Handle persona selection
  const handlePersonaChange = (newPersonaId) => {
    setSelectedPersona(newPersonaId);
    localStorage.setItem('preferred_commentary_persona', newPersonaId);
  };

  // 1. Generate local engineer commentary timeline beats from tracksheet data
  const localBeats = useMemo(() => {
    return generateCommentaryTimeline(parsedTracksheet, rawMarkdown);
  }, [parsedTracksheet, rawMarkdown]);

  // Active beats: AI persona beats if available, else smooth fallback to engineer telemetry
  const beats = useMemo(() => {
    if (selectedPersona !== 'engineer' && aiBeats && aiBeats.length > 0) {
      return enforceCommentaryTiming(aiBeats);
    }
    return localBeats;
  }, [selectedPersona, aiBeats, localBeats]);

  // Video-to-music timeline calibration offset (deals with film intros, MTV dialogue, director logos)
  const [videoOffset, setVideoOffset] = useState(0);
  const [mediaPreference, setMediaPreference] = useState('video');

  // Whenever the companion is opened, ensure it starts as a centered pop-up window with video open
  useEffect(() => {
    if (isOpen) {
      setDocked(false);
      setIsGliding(false);
      setAutoMoveDismissed(false);
      setAutoMoveActive(true);
      setAutoMoveSecondsLeft(2);
      setMediaPreference('video');
      setVideoError(null);
    }
  }, [isOpen]);

  // Re-read or reset offset when videoId changes
  useEffect(() => {
    if (!videoId) return;
    const saved = localStorage.getItem(`companion_offset_${videoId}`);
    if (saved !== null) {
      setVideoOffset(parseFloat(saved) || 0);
    } else {
      setVideoOffset(0);
    }
  }, [videoId]);

  const updateVideoOffset = (val) => {
    const clamped = Math.max(-180, Math.min(600, Math.round(val * 10) / 10));
    setVideoOffset(clamped);
    if (videoId) {
      localStorage.setItem(`companion_offset_${videoId}`, String(clamped));
    }
  };

  const handleToggleMediaMode = () => {
    const nextMode = mediaPreference === 'video' ? 'audio' : 'video';
    setMediaPreference(nextMode);
    localStorage.setItem('video_companion_media_mode', nextMode);
  };

  // Effective song time (accounts for video intro skits, director logos, or mid-roll offsets)
  const effectiveMusicTime = Math.max(0, currentTime - videoOffset);

  // 5-Star Commentary Rating, Persona-Honing & User Learning State
  const [ratedBeats, setRatedBeats] = useState({});
  const [hoverRating, setHoverRating] = useState(0);
  const [personaStats, setPersonaStats] = useState({});
  const [ratingToast, setRatingToast] = useState(null);
  const [isHoning, setIsHoning] = useState(false);
  const [customFeedbackText, setCustomFeedbackText] = useState('');
  const [isSubmittingInput, setIsSubmittingInput] = useState(false);
  const [learnedRules, setLearnedRules] = useState([]);
  const [showMemoryDrawer, setShowMemoryDrawer] = useState(false);

  const loadPersonaStats = async () => {
    try {
      const data = await fetchCompanionApi('/api/commentary/persona-stats');
      if (data.success && data.personas) {
        setPersonaStats(data.personas);
      }
    } catch (e) {
      console.warn('Could not load persona stats:', e.message);
    }
  };

  const loadLearnedRules = async () => {
    try {
      const data = await fetchCompanionApi(`/api/commentary/user-rules?persona=${selectedPersona}`);
      if (data.success && data.rules) {
        setLearnedRules(data.rules);
      }
    } catch (e) {
      console.warn('Could not load learned rules:', e.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadPersonaStats();
      loadLearnedRules();
    }
  }, [isOpen, selectedPersona]);

  // Determine which beat is active (auto-sync with video time or user selected)
  const activeBeat = useMemo(() => {
    if (!beats || beats.length === 0) return null;
    if (autoSync) {
      return getActiveBeatForTime(beats, effectiveMusicTime) || beats[0];
    }
    const safeIdx = Math.max(0, Math.min(manualBeatIdx, beats.length - 1));
    return beats[safeIdx] || beats[0];
  }, [beats, effectiveMusicTime, autoSync, manualBeatIdx]);

  const handleRateBeat = async (stars, tag = null, customNote = null) => {
    if (!activeBeat) return;
    const beatKey = activeBeat.id || `beat-${curBeatIdx}`;
    const previous = ratedBeats[beatKey];
    const newRating = stars !== null ? stars : (previous?.rating || 8);
    const tags = tag ? [tag] : (previous?.tags || []);
    const note = customNote !== null ? customNote : (previous?.note || '');

    setRatedBeats(prev => ({
      ...prev,
      [beatKey]: { rating: newRating, tags, note }
    }));

    try {
      const data = await fetchCompanionApi('/api/commentary/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId: trackId || null,
          persona: selectedPersona,
          beatIndex: curBeatIdx,
          beatTitle: activeBeat.title,
          beatText: activeBeat.text,
          rating: newRating,
          feedbackTags: tags,
          notes: note
        })
      });
      if (data.success) {
        const personaObj = COMMENTARY_PERSONAS[selectedPersona] || {};
        const personaTitle = personaObj.shortLabel || personaObj.name || selectedPersona;
        const tagText = tag ? ` "${tag}"` : '';
        const noteMsg = note ? ` • Learned: "${note.length > 25 ? note.substring(0, 23) + '...' : note}"` : '';
        setRatingToast(`Saved${tagText} (${newRating}/10) to ${personaTitle}!${noteMsg}`);
        setTimeout(() => setRatingToast(null), 4000);
        loadPersonaStats();
        loadLearnedRules();
      }
    } catch (err) {
      console.warn('Failed to record rating:', err);
    }
  };

  const handleCustomFeedbackSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanText = customFeedbackText.trim();
    if (!cleanText || isSubmittingInput) return;

    setIsSubmittingInput(true);
    const beatKey = activeBeat?.id || `beat-${curBeatIdx}`;
    const currentRating = ratedBeats[beatKey]?.rating || 8;
    const currentTags = ratedBeats[beatKey]?.tags || [];

    try {
      await handleRateBeat(currentRating, currentTags.length > 0 ? currentTags[0] : null, cleanText);
      setCustomFeedbackText('');
      setRatingToast(`💡 Learned your input: "${cleanText.length > 28 ? cleanText.substring(0, 26) + '...' : cleanText}"`);
      setTimeout(() => setRatingToast(null), 4500);
    } catch (err) {
      console.error('Error submitting custom feedback:', err);
    } finally {
      setIsSubmittingInput(false);
    }
  };

  const handleHoneAndRegenerate = async () => {
    if (isGeneratingPersona || isHoning) return;
    setIsHoning(true);
    try {
      if (trackId) {
        await fetchCompanionApi('/api/commentary/regenerate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trackId, persona: selectedPersona })
        });
      }
      delete personaCacheRef.current[selectedPersona];
      setIsGeneratingPersona(true);
      const data = await fetchCompanionApi('/api/commentary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId: trackId || null,
          persona: selectedPersona,
          trackName: trackName,
          artistName: artistName,
          tracksheetData: parsedTracksheet,
          content: rawMarkdown,
          rawMarkdown: rawMarkdown
        })
      });
      if (data.success && Array.isArray(data.beats) && data.beats.length > 0) {
        personaCacheRef.current[selectedPersona] = data.beats;
        setAiBeats(data.beats);
        setRatingToast(`✨ Re-crafted with your 5-star preferences!`);
        setTimeout(() => setRatingToast(null), 4000);
        loadPersonaStats();
      }
    } catch (err) {
      console.error('Error re-generating honed commentary:', err);
    } finally {
      setIsHoning(false);
      setIsGeneratingPersona(false);
    }
  };

  // 2. Resolve YouTube video ID whenever track or URL changes
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function resolveVideo() {
      setLoadingVideo(true);
      setVideoError(null);

      // 1. Instant check against verified offline track catalogue (for video mode)
      const cleanTrackName = (trackName || '').toLowerCase().trim();
      const matchedKey = Object.keys(KNOWN_TRACK_VIDEOS).find(k => 
        cleanTrackName === k || cleanTrackName.includes(k) || k.includes(cleanTrackName)
      );
      if (mediaPreference !== 'audio' && matchedKey && KNOWN_TRACK_VIDEOS[matchedKey]) {
        setVideoId(KNOWN_TRACK_VIDEOS[matchedKey]);
        setLoadingVideo(false);
        return;
      }

      try {
        const queryParam = initialYoutubeUrl || `${trackName || ''} ${artistName || ''}`.trim();
        if (!queryParam) {
          setVideoError('No track name provided for video search.');
          setLoadingVideo(false);
          return;
        }

        const preferParam = mediaPreference === 'audio' ? '&prefer=audio' : '&prefer=video';
        const data = await fetchCompanionApi(`/api/youtube/resolve?query=${encodeURIComponent(queryParam)}${preferParam}`);

        if (isMounted) {
          if (data && data.success && data.videoId) {
            setVideoId(data.videoId);
          } else if (matchedKey && KNOWN_TRACK_VIDEOS[matchedKey]) {
            setVideoId(KNOWN_TRACK_VIDEOS[matchedKey]);
          } else {
            setVideoError('Could not locate an embeddable YouTube video for this track.');
          }
        }
      } catch (err) {
        if (isMounted) {
          if (matchedKey && KNOWN_TRACK_VIDEOS[matchedKey]) {
            setVideoId(KNOWN_TRACK_VIDEOS[matchedKey]);
          } else {
            setVideoError('Failed to connect to YouTube video resolver.');
          }
        }
      } finally {
        if (isMounted) setLoadingVideo(false);
      }
    }

    resolveVideo();

    return () => {
      isMounted = false;
    };
  }, [isOpen, trackName, artistName, initialYoutubeUrl, mediaPreference, videoRetryCount]);

  // 3. YouTube IFrame API Initialization & Polling
  useEffect(() => {
    if (!isOpen || !videoId) return;

    // Load YouTube IFrame API script if not present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    let checkYTInterval = null;

    function initPlayer() {
      if (!window.YT || !window.YT.Player || !videoId) return;

      // Clean up previous instance safely
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.destroy === 'function') {
            playerRef.current.destroy();
          }
        } catch (e) {
          console.warn('[VideoCompanion] Error destroying old player:', e);
        }
        playerRef.current = null;
      }

      // Re-create a clean mount element inside playerContainerRef because YT.Player destroys/replaces it
      if (playerContainerRef.current) {
        playerContainerRef.current.innerHTML = '<div id="yt-companion-player-iframe" class="yt-iframe-embed"></div>';
      }

      const mountEl = document.getElementById('yt-companion-player-iframe');
      if (!mountEl) return;

      try {
        playerRef.current = new window.YT.Player(mountEl, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              try {
                event.target.playVideo();
                setDuration(event.target.getDuration() || 0);
                // Check if muted by browser autoplay policy
                const muted = typeof event.target.isMuted === 'function' ? event.target.isMuted() : false;
                setIsMuted(muted);
              } catch (e) {}
            },
            onStateChange: (event) => {
              // YT.PlayerState: PLAYING = 1, PAUSED = 2, ENDED = 0
              if (event.data === 1) {
                setIsPlaying(true);
                if (playerRef.current && typeof playerRef.current.isMuted === 'function') {
                  setIsMuted(playerRef.current.isMuted());
                }
              } else {
                setIsPlaying(false);
              }
            },
            onError: (event) => {
              console.warn('[VideoCompanion] YouTube Player error:', event.data);
              if (event.data === 101 || event.data === 150) {
                // Video owner has prohibited embedded playback on external domains (common on official VEVO/label uploads)
                if (mediaPreference !== 'audio') {
                  console.info('[VideoCompanion] Video embed restricted by owner. Automatically recovering with Studio Audio...');
                  setMediaPreference('audio');
                  return;
                }
                setVideoError('Playback restricted by video owner for this embed. Try clicking Retry or watching on YouTube.');
              }
            }
          }
        });
      } catch (err) {
        console.error('[VideoCompanion] Error instantiating YT.Player:', err);
      }
    }

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      checkYTInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkYTInterval);
          checkYTInterval = null;
          initPlayer();
        }
      }, 120);
    }

    return () => {
      if (checkYTInterval) {
        clearInterval(checkYTInterval);
        checkYTInterval = null;
      }
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.destroy === 'function') {
            playerRef.current.destroy();
          }
        } catch (e) {}
        playerRef.current = null;
      }
    };
  }, [isOpen, videoId]);

  // 4. Playback Time & Audio Status Polling
  useEffect(() => {
    if (!isOpen) return;

    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        if (typeof playerRef.current.getCurrentTime === 'function') {
          try {
            const t = playerRef.current.getCurrentTime();
            if (typeof t === 'number' && !isNaN(t)) {
              setCurrentTime(t);
            }
          } catch (e) {}
        }
        if (typeof playerRef.current.isMuted === 'function') {
          try {
            setIsMuted(playerRef.current.isMuted());
          } catch (e) {}
        }
      }
    }, 450);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen]);

  // Audio Unmute Handler
  const handleUnmute = () => {
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.unMute === 'function') {
          playerRef.current.unMute();
        }
        if (typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(100);
        }
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
        setIsMuted(false);
      } catch (e) {}
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        handleUnmute();
      } else {
        if (typeof playerRef.current.mute === 'function') {
          playerRef.current.mute();
        }
        setIsMuted(true);
      }
    } catch (e) {}
  };

  // 5. Smooth Typewriter Text Animation for the Active Beat
  useEffect(() => {
    if (!activeBeat || !activeBeat.text) {
      setDisplayedCommentary('');
      return;
    }

    const fullText = activeBeat.text;
    let charIdx = 0;
    setDisplayedCommentary('');
    setIsTyping(true);

    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);

    // Fast, crisp keystroke cadence (14ms)
    typewriterTimerRef.current = setInterval(() => {
      charIdx++;
      setDisplayedCommentary(fullText.slice(0, charIdx));
      if (charIdx >= fullText.length) {
        clearInterval(typewriterTimerRef.current);
        setIsTyping(false);
      }
    }, 14);

    return () => {
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    };
  }, [activeBeat?.id, activeBeat?.text]);

  // Handle move to bottom
  const handleMoveToBottom = () => {
    setIsGliding(true);
    setDocked(true);
    localStorage.setItem('video_companion_docked', 'true');
    setAutoMoveActive(false);
    setTimeout(() => {
      setIsGliding(false);
    }, 400);
  };

  const handleCancelAutoMove = () => {
    setAutoMoveActive(false);
    setAutoMoveDismissed(true);
  };

  // Handle dock toggle
  const toggleDock = () => {
    const next = !docked;
    if (next) {
      handleMoveToBottom();
    } else {
      setDocked(false);
      localStorage.setItem('video_companion_docked', 'false');
      setAutoMoveActive(false);
      setAutoMoveDismissed(true);
    }
  };

  // Compact HUD toggle
  const toggleCompactHud = () => {
    const next = !isCompactHud;
    setIsCompactHud(next);
    localStorage.setItem('video_companion_compact_hud', String(next));
  };

  // Handle auto move to bottom preference toggle
  const toggleAutoMovePreference = () => {
    const next = !autoMoveToBottom;
    setAutoMoveToBottom(next);
    localStorage.setItem('auto_move_companion_to_bottom', String(next));
    if (!next) {
      setAutoMoveActive(false);
    }
  };

  // Auto-move countdown & initiation: automatically moves modal to bottom of screen after 2s
  useEffect(() => {
    if (!isOpen || docked || !autoMoveToBottom || autoMoveDismissed) {
      setAutoMoveActive(false);
      return;
    }

    setAutoMoveActive(true);
    setAutoMoveSecondsLeft(2);

    const timer = setInterval(() => {
      setAutoMoveSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleMoveToBottom();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, docked, autoMoveToBottom, autoMoveDismissed]);

  // Window scroll & wheel listener: instantly glides to bottom if user interacts with/scrolls the track sheet
  useEffect(() => {
    if (!isOpen || docked || autoMoveDismissed) return;

    const handleUserScroll = (e) => {
      if (e.type === 'wheel') {
        const modalContainer = document.querySelector('.video-companion-container');
        if (!modalContainer || !modalContainer.contains(e.target)) {
          handleMoveToBottom();
        }
      } else {
        handleMoveToBottom();
      }
    };

    window.addEventListener('scroll', handleUserScroll, { passive: true });
    window.addEventListener('wheel', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleUserScroll);
      window.removeEventListener('wheel', handleUserScroll);
    };
  }, [isOpen, docked, autoMoveDismissed]);

  // Handle auto launch preference toggle
  const toggleAutoLaunch = () => {
    const next = !autoLaunch;
    setAutoLaunch(next);
    localStorage.setItem('auto_launch_video_companion', String(next));
  };

  // Fact navigation
  const handlePrevFact = () => {
    setAutoSync(false);
    if (!beats || beats.length === 0) return;
    const curIdx = beats.findIndex(b => b.id === activeBeat?.id);
    const prevIdx = Math.max(0, curIdx - 1);
    setManualBeatIdx(prevIdx);
  };

  const handleNextFact = () => {
    setAutoSync(false);
    if (!beats || beats.length === 0) return;
    const curIdx = beats.findIndex(b => b.id === activeBeat?.id);
    const nextIdx = Math.min(beats.length - 1, curIdx + 1);
    setManualBeatIdx(nextIdx);
  };

  const handleResumeSync = () => {
    setAutoSync(true);
  };

  if (!isOpen) return null;

  const IconComponent = activeBeat ? (CATEGORY_ICONS[activeBeat.category] || Sparkles) : Sparkles;
  const curBeatIdx = beats ? beats.findIndex(b => b.id === activeBeat?.id) : 0;
  const totalBeats = beats ? beats.length : 0;

  return (
    <div className={`video-companion-root ${docked ? 'docked-mode' : 'modal-mode'} ${isGliding ? 'gliding-to-bottom' : ''}`}>
      {!docked && <div className="video-companion-backdrop" onClick={handleMoveToBottom} />}

      <div className="video-companion-container glass-panel">
        {/* Auto-Move to Bottom Progress Banner (When in Modal Mode) */}
        {!docked && autoMoveActive && (
          <div className="companion-auto-move-banner">
            <div className="auto-move-info">
              <span className="auto-move-pulse"></span>
              <span className="auto-move-text">
                Moving to bottom of screen in <strong>{autoMoveSecondsLeft}s</strong> to show track sheet
              </span>
            </div>
            <div className="auto-move-actions">
              <button 
                type="button" 
                className="btn-auto-move-now" 
                onClick={handleMoveToBottom}
                title="Move companion window to bottom of screen immediately"
              >
                <ArrowDownToLine size={13} /> Move Now
              </button>
              <button 
                type="button" 
                className="btn-auto-move-cancel" 
                onClick={handleCancelAutoMove}
                title="Stay centered for now"
              >
                Keep Centered
              </button>
            </div>
            <div className="auto-move-progress-track">
              <div 
                className="auto-move-progress-bar" 
                style={{ width: `${Math.max(0, (autoMoveSecondsLeft / 2) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="video-companion-header">
          <div className="video-companion-title-group">
            <div className="video-live-pulse-badge">
              <span className="live-dot-pulse"></span>
              <span className="live-title-text">
                {docked ? 'STUDIO COMPANION' : 'STUDIO VIDEO COMPANION'} <span className="title-beta-pill">BETA</span>
              </span>
            </div>
            <span className="video-track-subtitle" title={`${trackName}${artistName ? ' • ' + artistName : ''}`}>
              <strong style={{ color: '#F8FAFC' }}>{trackName}</strong>
              {artistName && <span style={{ color: '#94A3B8' }}> • {artistName}</span>}
            </span>
          </div>

          <div className="video-companion-controls">
            {/* Clean Audio vs Music Video Toggle */}
            <button
              type="button"
              className={`companion-btn-text-pill ${mediaPreference === 'audio' ? 'active-audio' : ''}`}
              onClick={handleToggleMediaMode}
              title={mediaPreference === 'audio' ? "Playing Clean Studio Audio. Click to switch to Music Video." : "Playing Music Video. Click to switch to Clean Studio Audio (avoids film intro skits)."}
            >
              {mediaPreference === 'audio' ? '🎵 Audio' : '🎬 Video'}
            </button>

            {/* Audio Volume / Unmute Button */}
            <button 
              type="button"
              className={`companion-btn-icon ${isMuted ? 'muted-warning' : ''}`}
              onClick={toggleMute} 
              title={isMuted ? "Audio is Muted — Click to Unmute" : "Mute Audio"}
            >
              {isMuted ? <VolumeX size={15} color="#F87171" /> : <Volume2 size={15} color="#34D399" />}
            </button>

            {/* Compact HUD Toggle (when docked at bottom) */}
            {docked && (
              <button 
                type="button" 
                className={`companion-btn-icon ${isCompactHud ? 'compact-active' : ''}`}
                onClick={toggleCompactHud} 
                title={isCompactHud ? "Expand Full Studio Commentary Controls" : "Compact HUD: Mini-bar to give maximum space for track sheet"}
              >
                {isCompactHud ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            )}

            {/* Move to Bottom / Expand Button */}
            <button 
              type="button"
              className="companion-btn-icon" 
              onClick={toggleDock} 
              title={docked ? "Expand to Center Modal" : "Move to Bottom of Screen (allows viewing rest of track sheet)"}
            >
              {docked ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
            </button>

            {/* Close Button */}
            <button 
              type="button"
              className="companion-btn-icon close-btn" 
              onClick={onClose} 
              title="Close Video Companion"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Video Player Area */}
        <div className="video-player-frame-wrap">
          {loadingVideo && (
            <div className="video-loading-overlay">
              <RefreshCw className="spinning-icon" size={24} color="#C084FC" />
              <span>Locating authentic recording session video...</span>
            </div>
          )}

          {/* Prominent Unmute Pill if browser muted playback */}
          {isMuted && !loadingVideo && !videoError && (
            <div className="video-unmute-overlay">
              <button 
                type="button" 
                className="video-unmute-btn" 
                onClick={handleUnmute}
                title="Browser muted audio on autoplay. Click to unmute."
              >
                <Volume2 size={16} className="unmute-pulse-icon" />
                <span>Click to Unmute Audio</span>
              </button>
            </div>
          )}

          {videoError && !loadingVideo && (
            <div className="video-error-overlay">
              <p>{videoError}</p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button 
                  type="button" 
                  className="btn-link-yt" 
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}
                  onClick={() => setVideoRetryCount(c => c + 1)}
                >
                  <RefreshCw size={14} /> Retry
                </button>
                <button 
                  type="button" 
                  className="btn-link-yt" 
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                  onClick={() => setMediaPreference(p => p === 'audio' ? 'video' : 'audio')}
                >
                  <Music size={14} /> {mediaPreference === 'audio' ? 'Switch to Video' : 'Switch to Studio Audio'}
                </button>
                <a 
                  href={initialYoutubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(`${trackName || ''} ${artistName || ''}`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-link-yt"
                >
                  <ExternalLink size={14} /> Open in YouTube
                </a>
              </div>
            </div>
          )}

          <div ref={playerContainerRef} className="yt-player-host">
            <div id="yt-companion-player-iframe" className="yt-iframe-embed"></div>
          </div>
        </div>

        {/* Synchronized Studio Text Monitor HUD (Activity Monitor aesthetic) */}
        <div className={`companion-monitor-hud ${isCompactHud && docked ? 'compact-hud' : ''}`}>
          {/* Monitor Top Meta Line */}
          <div className="monitor-meta-bar">
            <div className="monitor-badge-wrap">
              {activeBeat && (
                <span 
                  className="monitor-category-pill"
                  style={{ 
                    borderColor: `${activeBeat.accentColor}55`, 
                    backgroundColor: `${activeBeat.accentColor}18`,
                    color: activeBeat.accentColor 
                  }}
                >
                  <IconComponent size={12} style={{ marginRight: '5px' }} />
                  {activeBeat.badge}
                </span>
              )}
              {activeBeat?.title && (
                <span className="monitor-fact-title">{activeBeat.title}</span>
              )}
            </div>

            {/* Persona Voice Selector */}
            <div className="companion-voice-bar">
              <div className="voice-selector-capsule">
                <span className="voice-capsule-label">VOICE:</span>
                <select
                  value={selectedPersona}
                  onChange={(e) => handlePersonaChange(e.target.value)}
                  className="companion-persona-select"
                  title="Select commentator voice persona"
                >
                  {Object.values(COMMENTARY_PERSONAS).map((p) => {
                    const pStat = personaStats[p.id];
                    return (
                      <option key={p.id} value={p.id}>
                        {p.emoji} {p.shortLabel || p.label} {pStat?.avgRating ? `(${pStat.avgRating}/10)` : ''}
                      </option>
                    );
                  })}
                </select>
                {personaStats[selectedPersona]?.avgRating ? (
                  <span className="persona-rating-capsule-badge" title={`${personaStats[selectedPersona].count} ratings received. Honed by user marks!`}>
                    ★ {personaStats[selectedPersona].avgRating}/10
                  </span>
                ) : null}
                {isGeneratingPersona && (
                  <span className="persona-tuning-badge" title="Crafting authentic voice commentary with Gemini AI...">
                    <RefreshCw size={10} className="spinning-icon" />
                    <span>Tuning...</span>
                  </span>
                )}
              </div>
            </div>

            <div className="monitor-time-sync-group">
              <span 
                className="monitor-time-stamp" 
                title={videoOffset !== 0 ? `Music: ${formatSeconds(effectiveMusicTime)} | Video: ${formatSeconds(currentTime)} (Offset: ${videoOffset > 0 ? '+' : ''}${videoOffset}s)` : `Playback Time: ${formatSeconds(currentTime)}`}
              >
                {formatSeconds(effectiveMusicTime)}
                {videoOffset !== 0 && (
                  <span className="offset-time-badge"> ({videoOffset > 0 ? `+${videoOffset}s` : `${videoOffset}s`})</span>
                )}
                <span className="time-sep"> / </span>
                {duration > 0 ? formatSeconds(duration) : '--:--'}
              </span>
              <span className="monitor-beat-count">
                Fact {totalBeats > 0 ? curBeatIdx + 1 : 0} of {totalBeats}
              </span>
            </div>
          </div>

          {personaError && !aiBeats && (
            <div className="companion-persona-error-banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span>⚠️ {personaError} — using Chief Studio Engineer telemetry</span>
              <button 
                type="button" 
                onClick={() => {
                  delete personaCacheRef.current[selectedPersona];
                  setSelectedPersona(p => p);
                }}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#FFF',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.68rem',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Monitor Live Typewriter Text Box */}
          <div ref={typewriterBoxRef} className="companion-typewriter-box">
            <div className="companion-radar-wrap">
              <div className="companion-radar-ring"></div>
              <Disc className="companion-spinning-vinyl" size={22} color={activeBeat?.accentColor || '#C084FC'} />
            </div>

            <div className="companion-text-stream">
              {selectedPersona !== 'engineer' && COMMENTARY_PERSONAS[selectedPersona] && (
                <div className="persona-speaker-indicator">
                  <span className="persona-speaker-name">
                    {COMMENTARY_PERSONAS[selectedPersona].emoji} {COMMENTARY_PERSONAS[selectedPersona].name}
                  </span>
                  {isGeneratingPersona ? (
                    <span className="persona-live-tag tuning">Tuning In...</span>
                  ) : (
                    <span className="persona-live-tag active">Voice Active</span>
                  )}
                </div>
              )}
              <p className="companion-typewriter-text">
                {displayedCommentary}
                {isTyping && <span className="companion-cursor">▋</span>}
              </p>
            </div>
          </div>

          {/* Active Soundbite 5-Star Rating & Persona-Honing Bar */}
          <div className="companion-rating-bar">
            <div className="rating-top-row">
              <div className="rating-controls-left">
                <span className="rating-label-tag" title="Rate this soundbite (1-10) to hone this commentator's voice and gear depth">
                  HONE VOICE:
                </span>
                <div className="ten-score-group" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => {
                    const currentBeatRating = activeBeat ? ratedBeats[activeBeat.id || `beat-${curBeatIdx}`]?.rating : 0;
                    const isSelected = currentBeatRating === score;
                    const isPassed = (hoverRating || currentBeatRating) >= score;
                    return (
                      <button
                        key={score}
                        type="button"
                        className={`ten-score-btn score-${score} ${isSelected ? 'selected' : ''} ${isPassed ? 'active' : ''}`}
                        onClick={() => handleRateBeat(score)}
                        onMouseEnter={() => setHoverRating(score)}
                        title={`Give ${score} out of 10 to hone ${COMMENTARY_PERSONAS[selectedPersona]?.name || 'persona'}`}
                      >
                        {score}
                      </button>
                    );
                  })}
                </div>
                <span className="rating-hint-text">
                  {hoverRating === 1 ? '1/10: Completely Wrong' :
                   hoverRating === 2 ? '2/10: Very Poor' :
                   hoverRating === 3 ? '3/10: Repetitive' :
                   hoverRating === 4 ? '4/10: Half Right?' :
                   hoverRating === 5 ? '5/10: A Bit Weird' :
                   hoverRating === 6 ? '6/10: Decent' :
                   hoverRating === 7 ? '7/10: Good' :
                   hoverRating === 8 ? '8/10: Has Some Detail' :
                   hoverRating === 9 ? '9/10: Has Great Detail' :
                   hoverRating === 10 ? '10/10: Absolutely Fantastic / Awesome!' :
                   (activeBeat && ratedBeats[activeBeat.id || `beat-${curBeatIdx}`]?.rating) ?
                     `Rated ${ratedBeats[activeBeat.id || `beat-${curBeatIdx}`].rating}/10` :
                     'Mark out of 10'}
                </span>
              </div>

              <div className="rating-actions-right">
                {ratingToast ? (
                  <span className="rating-toast-pill">
                    <Check size={11} className="toast-check-icon" /> {ratingToast}
                  </span>
                ) : selectedPersona !== 'engineer' ? (
                  <button
                    type="button"
                    className="btn-hone-regenerate"
                    onClick={handleHoneAndRegenerate}
                    disabled={isGeneratingPersona || isHoning}
                    title="Re-generate commentary using your latest 5-star ratings and honed feedback"
                  >
                    <RefreshCw size={11} className={isHoning || isGeneratingPersona ? 'spinning-icon' : ''} />
                    <span>{isHoning ? 'Honing...' : '⚡ Hone & Re-craft'}</span>
                  </button>
                ) : null}
              </div>
            </div>

            {/* Qualitative Feedback Categories (User Categories) */}
            <div className="companion-category-chips-wrap">
              <span className="chips-row-label" title="Categorize this commentary to hone the persona's tone and engineering depth">
                CATEGORIES:
              </span>
              <div className="category-chips-scroll">
                {COMMENTARY_FEEDBACK_CATEGORIES.map((cat) => {
                  const currentTags = activeBeat ? (ratedBeats[activeBeat.id || `beat-${curBeatIdx}`]?.tags || []) : [];
                  const isSelected = currentTags.includes(cat.label);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`btn-category-chip chip-${cat.id} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleRateBeat(cat.score, cat.label)}
                      title={`Mark as "${cat.label}" (${cat.score}/10) to hone personality`}
                    >
                      <span className="chip-emoji">{cat.emoji}</span>
                      <span className="chip-label">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Teach the Guru / Direct User Input & Learning Section */}
            <div className="companion-user-input-wrap">
              <div className="user-input-bar">
                <span className="user-input-label" title="Give the Guru custom instructions, corrections, or explanations to learn from">
                  <Sparkles size={12} color="#C084FC" /> TEACH GURU:
                </span>
                <form onSubmit={handleCustomFeedbackSubmit} className="user-input-form">
                  <input
                    type="text"
                    className="user-input-field"
                    value={customFeedbackText}
                    onChange={(e) => setCustomFeedbackText(e.target.value)}
                    placeholder="e.g. 'Explain what FET stands for', 'Be more excited about tape saturation'..."
                  />
                  <button 
                    type="submit" 
                    className="btn-submit-user-input"
                    disabled={!customFeedbackText.trim() || isSubmittingInput}
                    title="Send this input to the Guru's permanent learning memory"
                  >
                    <Zap size={12} /> {isSubmittingInput ? 'Learning...' : 'Teach Guru'}
                  </button>
                </form>
                {learnedRules.length > 0 && (
                  <button
                    type="button"
                    className={`btn-view-memory ${showMemoryDrawer ? 'active' : ''}`}
                    onClick={() => setShowMemoryDrawer(!showMemoryDrawer)}
                    title="View rules and instructions the Guru has learned from your inputs"
                  >
                    🧠 {learnedRules.length} Learned Rule{learnedRules.length > 1 ? 's' : ''}
                  </button>
                )}
              </div>

              {/* Expandable Memory Drawer */}
              {showMemoryDrawer && (
                <div className="user-memory-drawer">
                  <div className="memory-drawer-header">
                    <span>🧠 Guru Memory (Learned from your inputs):</span>
                    <button type="button" onClick={() => setShowMemoryDrawer(false)} className="close-memory-btn">✕</button>
                  </div>
                  <div className="memory-rules-list">
                    {learnedRules.map((r) => (
                      <div key={r.id} className="memory-rule-item">
                        <span className="rule-bullet">⚡</span>
                        <span className="rule-text">"{r.rule_text}"</span>
                        {r.beat_context && <span className="rule-context">({r.beat_context})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Dialogue & Intro Offset Calibration Strip */}
          <div className="companion-sync-calibrate-strip">
            <div className="sync-calibrate-controls">
              <span className="sync-tag-label" title="Compensate for music video intro skits, dialogue, or film logos">
                VIDEO SYNC:
              </span>
              <button
                type="button"
                className={`btn-sync-mark ${videoOffset > 0 ? 'calibrated' : ''}`}
                onClick={() => updateVideoOffset(currentTime)}
                title="Click at the exact moment the music starts to calibrate commentary timing"
              >
                📍 Music Starts Here ({formatSeconds(currentTime)})
              </button>
              <div className="sync-nudge-group">
                <button
                  type="button"
                  className="btn-sync-nudge"
                  onClick={() => updateVideoOffset(videoOffset - 1)}
                  title="Nudge commentary 1s earlier (-1s)"
                >
                  -1s
                </button>
                <span className="sync-offset-pill" title="Current video-to-music time offset">
                  {videoOffset > 0 ? `+${videoOffset}s` : videoOffset < 0 ? `${videoOffset}s` : '0s'}
                </span>
                <button
                  type="button"
                  className="btn-sync-nudge"
                  onClick={() => updateVideoOffset(videoOffset + 1)}
                  title="Nudge commentary 1s later (+1s)"
                >
                  +1s
                </button>
                {videoOffset !== 0 && (
                  <button
                    type="button"
                    className="btn-sync-reset"
                    onClick={() => updateVideoOffset(0)}
                    title="Reset sync offset to 0s"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div className="sync-status-hint">
              {videoOffset > 0 ? (
                <span>Song begins at {formatSeconds(videoOffset)} in video</span>
              ) : (
                <span>In sync with video 0:00</span>
              )}
            </div>
          </div>

          {/* Monitor Bottom Controls & Preferences */}
          <div className="companion-footer-bar">
            <div className="companion-fact-nav">
              <button 
                className="fact-nav-btn" 
                onClick={handlePrevFact} 
                disabled={curBeatIdx <= 0}
                title="Previous Fact"
              >
                <ChevronLeft size={14} /> Prev
              </button>

              {!autoSync ? (
                <button 
                  className="fact-sync-btn active-resume" 
                  onClick={handleResumeSync}
                  title="Resume real-time synchronization with playback"
                >
                  <span className="sync-dot yellow"></span>
                  Resume Video Sync
                </button>
              ) : (
                <span className="fact-sync-btn locked">
                  <span className="sync-dot green"></span>
                  Live Syncing with Song
                </span>
              )}

              <button 
                className="fact-nav-btn" 
                onClick={handleNextFact} 
                disabled={curBeatIdx >= totalBeats - 1}
                title="Next Fact"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>

            <div className="companion-pref-toggle-group">
              <label className="pref-checkbox-label" title="Automatically move companion to bottom of screen so track sheet is never obscured">
                <input 
                  type="checkbox" 
                  checked={autoMoveToBottom} 
                  onChange={toggleAutoMovePreference} 
                />
                <span>Auto-move to bottom</span>
              </label>

              <label className="pref-checkbox-label" title="Automatically launch video companion when viewing or creating track sheets">
                <input 
                  type="checkbox" 
                  checked={autoLaunch} 
                  onChange={toggleAutoLaunch} 
                />
                <span>Auto-pop on tracks</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
