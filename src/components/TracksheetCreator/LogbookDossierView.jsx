import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Sliders, Mic2, Disc, AlertTriangle, 
  ExternalLink, Layers, Volume2, Cpu, Star, Radio, Zap, Activity,
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowDownToLine, Check,
  List, ChevronDown, ChevronUp, Copy, CheckCircle2, Gauge, LayoutGrid, ShieldCheck
} from 'lucide-react';
import { get3rdPartyPluginName } from './logbookParser.js';

// Instrument family styling helper for console strips
const getInstrumentFamily = (stemName) => {
  const n = (stemName || '').toLowerCase();
  if (n.includes('kick')) return { name: 'Drums', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981' };
  if (n.includes('snare')) return { name: 'Drums', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981' };
  if (n.includes('drum') || n.includes('overhead') || n.includes('percussion') || n.includes('tom') || n.includes('hat') || n.includes('cymbal')) {
    return { name: 'Drums', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981' };
  }
  if (n.includes('bass')) return { name: 'Bass', color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.15)', border: '#0EA5E9' };
  if (n.includes('guitar')) return { name: 'Guitar', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', border: '#F59E0B' };
  if (n.includes('vocal') || n.includes('voice') || n.includes('harmony') || n.includes('backing')) {
    return { name: 'Vocals', color: '#A855F7', bg: 'rgba(168, 85, 247, 0.15)', border: '#A855F7' };
  }
  if (n.includes('brass') || n.includes('horn') || n.includes('trumpet') || n.includes('sax') || n.includes('trombone')) {
    return { name: 'Brass', color: '#F97316', bg: 'rgba(249, 115, 22, 0.15)', border: '#F97316' };
  }
  if (n.includes('piano') || n.includes('key') || n.includes('organ') || n.includes('hammond') || n.includes('rhodes') || n.includes('synth') || n.includes('string')) {
    return { name: 'Keys', color: '#EAB308', bg: 'rgba(234, 179, 8, 0.15)', border: '#EAB308' };
  }
  return { name: 'Other', color: '#EC4899', bg: 'rgba(236, 72, 153, 0.15)', border: '#EC4899' };
};

// Map fader dB to vertical position (top percentage)
const getFaderThumbPos = (faderStr) => {
  const dbMatch = (faderStr || '').match(/([-+]?\d+(?:\.\d+)?)/);
  const dbVal = dbMatch ? parseFloat(dbMatch[1]) : -6.0;
  if (dbVal >= 3) return 8;
  if (dbVal >= 0) return 22;
  if (dbVal >= -3) return 36;
  if (dbVal >= -6) return 50;
  if (dbVal >= -10) return 64;
  if (dbVal >= -18) return 78;
  return 88;
};

// Map pan string to knob rotation angle (-135deg to +135deg)
const getPanRotation = (panStr) => {
  if (!panStr || panStr.trim().toUpperCase() === 'C') return 0;
  const p = panStr.trim();
  const leftMatch = p.match(/^L\s*(\d+)/i) || p.match(/(\d+)\s*L/i);
  if (leftMatch) {
    const val = parseInt(leftMatch[1], 10);
    return -Math.round((val / 64) * 135);
  }
  const rightMatch = p.match(/^R\s*(\d+)/i) || p.match(/(\d+)\s*R/i);
  if (rightMatch) {
    const val = parseInt(rightMatch[1], 10);
    return Math.round((val / 64) * 135);
  }
  if (p.includes('Hard Left')) return -135;
  if (p.includes('Hard Right')) return 135;
  return 0;
};

// Transducer & capture icon mapper
const renderCaptureGlyph = (capStr) => {
  const c = (capStr || '').toLowerCase();
  if (c.includes('di') || c.includes('direct')) {
    return <Zap size={12} color="#FBBF24" />;
  }
  if (c.includes('midi') || c.includes('soft') || c.includes('synth') || c.includes('software')) {
    return <Radio size={12} color="#C084FC" />;
  }
  return <Mic2 size={12} color="#38BDF8" />;
};

export default function LogbookDossierView({ data, daw, tracksheetData = null, isProducer = false }) {
  if (!data) return null;

  const [activeInstIdx, setActiveInstIdx] = useState(0);
  const [useThirdPartyPlugins, setUseThirdPartyPlugins] = useState(false);
  const [deskViewMode, setDeskViewMode] = useState('desk'); // 'desk' (Mixing Desk) | 'table' (Comprehensive Track Table)
  const section3Ref = useRef(null);

  // Studio Track & Plug-In Inspector State (Anchored over button by default, Dock to Side or Modal on demand)
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [inspectorMode, setInspectorMode] = useState('anchored'); // 'anchored' (default directly over item) | 'docked' (side panel) | 'modal' (center)
  const [targetRect, setTargetRect] = useState(null);
  const targetElementRef = useRef(null);
  const [inspectorDetailLevel, setInspectorDetailLevel] = useState('concise'); // 'concise' | 'full'
  const [inspectorFocus, setInspectorFocus] = useState({ trackIdx: 0, sectionType: 'dynamics', itemName: '' });

  const handleSelectTrack = (idx, shouldScroll = false) => {
    setActiveInstIdx(idx);
    if (shouldScroll && section3Ref.current) {
      section3Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const {
    trackName,
    artistName,
    year,
    originalYear,
    genre,
    genre1,
    genre2,
    recordLabel,
    daw: parsedDaw,
    mixStrategy,
    masterBus
  } = data;

  const formatObjText = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      if (val.rawText && typeof val.rawText === 'string') return val.rawText;
      return Object.entries(val)
        .filter(([k, v]) => v && typeof v === 'string')
        .map(([k, v]) => `* **${k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:** ${v}`)
        .join('\n');
    }
    return String(val);
  };

  const instruments = data.instruments && data.instruments.length > 0 
    ? data.instruments 
    : (data.stems || []).map((s) => {
        const chain = s.stockChain || [];
        return {
          name: s.name,
          rawHeading: s.name,
          pathway1: formatObjText(s.microphoneSetup),
          pathway2: formatObjText(s.diSetup),
          pathway3: formatObjText(s.soundDesign) || formatObjText(s.midiProgramming),
          preferredPathway: s.pathway || `Pathway ${s.pathwayType || 3}`,
          preferredJustification: s.originalGear ? `Authentic hardware: ${s.originalGear}` : '',
          channelStrip: chain.map(c => ({
            slot: c.slot,
            plugin: c.plugin,
            circuit: c.type || c.circuit || '',
            params: c.settings || c.params || '',
            objective: c.objective || ''
          })),
          thirdParty: (s.thirdPartyChain || []).map(c => ({
            name: c.plugin,
            circuit: c.type || c.circuit || '',
            params: c.settings || c.params || '',
            objective: c.objective || '',
            url: ''
          })),
          examinerPitfall: '',
          rawBody: typeof s.rawBody === 'string' ? s.rawBody : ''
        };
      });

  const rawTrackTable = data.trackTable || [];
  const trackTable = rawTrackTable.map((t, idx) => {
    const stemObj = (data.stems || [])[idx] || (data.stems || []).find(s => s.name && t.stem && s.name.toLowerCase().includes(t.stem.toLowerCase()));
    const chain = stemObj?.stockChain || [];
    const dyn = chain.filter(c => /comp|gate|limit|vca|fet|opto/i.test(c.plugin + ' ' + (c.type || ''))).map(c => c.plugin).join(' + ');
    const eq = chain.filter(c => /eq|filter/i.test(c.plugin + ' ' + (c.type || ''))).map(c => c.plugin).join(' + ');
    const ins = chain.filter(c => !/comp|gate|limit|vca|fet|opto|eq|filter/i.test(c.plugin + ' ' + (c.type || ''))).map(c => c.plugin).join(' + ');

    return {
      ...t,
      capture: t.capture || t.inputSource || t.pathway || (t.dawInput ? `${t.originalSource || t.stem} (${t.dawInput})` : 'Direct Capture'),
      dynamics: t.dynamics || dyn || 'VCA Compressor',
      eq: t.eq || eq || 'Channel EQ',
      inserts: t.inserts || ins || 'Analog Saturation',
      aux: t.aux || t.routing || 'Aux Reverb'
    };
  });

  const currentDaw = daw || parsedDaw || 'Logic Pro';

  // Fallback metadata assembled from data or historical tracksheetData
  const songTitle = trackName || tracksheetData?.song || (isProducer ? 'Producer Studio Recreation' : 'Component 1 Recording');
  const artist = artistName || tracksheetData?.artist || 'Unknown Artist';
  const releaseYear = year || originalYear || tracksheetData?.releaseDate || tracksheetData?.datesRecorded || '';
  const songGenre = genre1 ? `${genre1}${genre2 ? ` / ${genre2}` : ''}` : (genre || tracksheetData?.genre || '');
  const label = recordLabel || tracksheetData?.recordCompany || '';
  const dates = tracksheetData?.datesRecorded || year || '';
  const primaryStudio = tracksheetData?.studio?.trackingStudio || tracksheetData?.studio?.name || '';
  const key = tracksheetData?.musicology?.key || data?.key || '';
  const rawBpm = tracksheetData?.musicology?.bpm || data?.bpm || '';
  const cleanBpm = (val) => {
    if (!val) return '';
    const str = String(val).replace(/bpm/i, '').trim();
    const num = parseFloat(str);
    if (!isNaN(num) && num > 0) return String(num);
    return '';
  };
  const bpm = cleanBpm(rawBpm);
  const meter = tracksheetData?.musicology?.timeSignature || data?.timeSignature || '';
  const tuning = tracksheetData?.musicology?.tuning || data?.tuning || '';
  const reliability = tracksheetData?.overallConfidence || 98;

  const getDawColor = (dName) => {
    const d = (dName || '').toLowerCase();
    if (d.includes('logic')) return '#A855F7';
    if (d.includes('pro')) return '#38BDF8';
    if (d.includes('ableton')) return '#10B981';
    if (d.includes('cubase')) return '#EF4444';
    if (d.includes('bitwig')) return '#F59E0B';
    return '#8B5CF6';
  };

  const dawColor = getDawColor(currentDaw);

  // Smart splitter to separate hardware setup (physical DI / mic / isolation) from in-the-box DAW processing
  const splitJustification = (text) => {
    if (!text) return { hardwareSetup: '', dawProcessing: '' };
    
    // Clean text from bullet / bold prefix
    const clean = text
      .replace(/^[•*-]\s*/, '')
      .replace(/^\*\*Technical Justification:\*\*\s*/i, '')
      .replace(/^\*\*Justification:\*\*\s*/i, '')
      .trim();

    // Check if there are explicit sentences
    const sentences = clean.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length <= 1) {
      const sLower = clean.toLowerCase();
      const isDaw = /logic|pro tools|cubase|ableton|reaper|studio one|daw|amp designer|cabinet model|plugin|plug-in|channel strip|phase align|in-the-box|itb/i.test(sLower);
      if (isDaw) {
        return {
          hardwareSetup: 'Direct physical hardware capture configured for pristine signal-to-noise ratio and zero acoustic spill.',
          dawProcessing: clean
        };
      }
      return {
        hardwareSetup: clean,
        dawProcessing: `Calibrated in ${currentDaw} channel strip for dynamic punch, surgical spectral balance, and mix coherence.`
      };
    }

    const hardwareParts = [];
    const dawParts = [];

    sentences.forEach(s => {
      const sLower = s.toLowerCase();
      const isDaw = /logic|pro tools|cubase|ableton|reaper|studio one|daw|amp designer|cabinet model|plugin|plug-in|channel strip|phase align|in-the-box|itb|software|virtual/i.test(sLower);
      const isHardware = /di tracking|direct injection|transducer|mic|spill|standing wave|room|acoustic|preamp|gain staging|capsule|polar pattern|baffle|reflector|hardware|isolated/i.test(sLower);

      if (isDaw && !isHardware) {
        dawParts.push(s);
      } else if (isHardware && !isDaw) {
        hardwareParts.push(s);
      } else if (isDaw) {
        dawParts.push(s);
      } else {
        hardwareParts.push(s);
      }
    });

    let hardwareSetup = hardwareParts.join(' ').trim();
    let dawProcessing = dawParts.join(' ').trim();

    if (!hardwareSetup && !dawProcessing) {
      hardwareSetup = clean;
    } else if (!hardwareSetup && dawProcessing) {
      hardwareSetup = 'Direct physical hardware capture configured for pristine signal-to-noise ratio and zero acoustic spill.';
    } else if (!dawProcessing && hardwareSetup) {
      dawProcessing = `Calibrated in ${currentDaw} channel strip for dynamic punch, surgical spectral balance, and mix coherence.`;
    }

    return { hardwareSetup, dawProcessing };
  };

  // Section 4 Multi-Mode & Accessibility State
  // Section 3 Collapsible Modular State
  const [expandedSec3Cards, setExpandedSec3Cards] = useState({}); // All collapsed by default for clean, uncluttered reading
  const [copiedSec3Key, setCopiedSec3Key] = useState(null);

  const handleToggleSec3Card = (cardKey) => {
    setExpandedSec3Cards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  const handleExpandAllSec3Cards = (expand) => {
    setExpandedSec3Cards({
      capture: expand,
      strip: expand,
      pitfall: expand,
      alts: expand
    });
  };

  const handleCopySec3Module = (title, text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(`### ${title}\n\n${text}`);
      setCopiedSec3Key(key);
      setTimeout(() => setCopiedSec3Key(null), 2000);
    }
  };

  const handleCopyTrackSpec = () => {
    if (!activeInstrument && !activeTrack) return;
    const name = activeTrack?.stem || activeInstrument?.name || 'Track';
    const { hardwareSetup, dawProcessing } = splitJustification(activeInstrument?.preferredJustification);
    let doc = `## Section 3: Detailed Signal Path & Channel Strip: ${name}\n\n`;
    if (activeInstrument?.preferredPathway) {
      doc += `### Preferred Capture Protocol\n${activeInstrument.preferredPathway}\n\n`;
    }
    if (hardwareSetup) {
      doc += `### Hardware Setup & Acoustic Isolation\n${hardwareSetup}\n\n`;
    }
    if (dawProcessing) {
      doc += `### In-The-Box DAW Processing Strategy\n${dawProcessing}\n\n`;
    }
    if (activeInstrument?.channelStrip && activeInstrument.channelStrip.length > 0) {
      doc += `### Vertical Channel Strip Insert Chain (${currentDaw})\n\n`;
      doc += `| ORDER | PROCESSOR / PLUGIN | TYPE & CIRCUIT | DIALLED SETTINGS / KNOBS | TECHNICAL OBJECTIVE |\n`;
      doc += `| --- | --- | --- | --- | --- |\n`;
      doc += activeInstrument.channelStrip.map((r, i) => 
        `| ${r.slot || `Insert ${i + 1}`} | ${useThirdPartyPlugins ? get3rdPartyPluginName(r.plugin) : r.plugin} | ${r.type} | ${r.settings} | ${r.objective} |`
      ).join('\n') + '\n\n';
    }
    if (activeInstrument?.examinerPitfall) {
      doc += `### Examiner Pitfalls & Traps\n${activeInstrument.examinerPitfall}\n\n`;
    }
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(doc);
      setCopiedSec3Key('all');
      setTimeout(() => setCopiedSec3Key(null), 2000);
    }
  };

  // Section 4 Multi-Mode & Accessibility State
  const [sec4ViewMode, setSec4ViewMode] = useState('cards'); // 'cards' (Modular Collapsible Cards) | 'tabs' (Workflow Walkthrough)
  const [activeSec4Tab, setActiveSec4Tab] = useState(0); // 0 to 3
  const [expandedSec4Cards, setExpandedSec4Cards] = useState({}); // All collapsed by default for clean, uncluttered reading
  const [expandedPhilosophy, setExpandedPhilosophy] = useState(false); // Collapsed by default to avoid crowding
  const [sec4Density, setSec4Density] = useState('comfortable'); // 'comfortable' | 'compact'
  const [copiedSec4Idx, setCopiedSec4Idx] = useState(null); // idx or 'all'

  // Section 4 Pillars Definition (4 Mix Strategy Pillars; Master Bus is now standalone Section 5)
  const sec4Pillars = [
    {
      id: 0,
      num: '1',
      title: '1. Frequency Masking Management & Spectral Separation',
      shortTitle: 'EQ & Spectral',
      tag: 'EQ & Pocketing',
      icon: Activity,
      color: '#C084FC',
      content: mixStrategy?.frequencySeparation,
      type: 'text'
    },
    {
      id: 1,
      num: '2',
      title: '2. Dynamic Control, Mix Subgroups & Bus Glue',
      shortTitle: 'Dynamics & Glue',
      tag: 'VCA & Subgroups',
      icon: Volume2,
      color: '#FBBF24',
      content: mixStrategy?.dynamicControl,
      type: 'text'
    },
    {
      id: 2,
      num: '3',
      title: '3. Spatial Depth & Time-Based FX Architecture',
      shortTitle: 'Spatial & FX',
      tag: 'Reverb & Delays',
      icon: Disc,
      color: '#34D399',
      content: mixStrategy?.spatialDepth,
      type: 'text'
    },
    {
      id: 3,
      num: '4',
      title: '4. Mix Automation Passes & Dynamic Rides',
      shortTitle: 'Automation Rides',
      tag: 'Fader Passes',
      icon: Zap,
      color: '#F472B6',
      content: mixStrategy?.automation,
      type: 'text'
    }
  ].filter(p => Boolean(p.content));

  const handleToggleSec4Card = (id) => {
    setExpandedSec4Cards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAllSec4Cards = (expand) => {
    const next = {};
    sec4Pillars.forEach(p => {
      next[p.id] = expand;
    });
    setExpandedSec4Cards(next);
  };

  const handleCopySec4Pillar = (pillar, idx) => {
    const text = `### ${pillar.title}\n\n${pillar.content || ''}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedSec4Idx(idx);
      setTimeout(() => setCopiedSec4Idx(null), 2000);
    }
  };

  const handleCopyAllSec4 = () => {
    let fullDoc = `## Section 4: Mix Strategy — EQ, Dynamics, Spatial Depth & Automation\n\n`;
    if (mixStrategy?.philosophy) {
      fullDoc += `### Mixdown Engineering Approach & Staging Methodology\n${mixStrategy.philosophy}\n\n`;
    }
    sec4Pillars.forEach(p => {
      fullDoc += `### ${p.title}\n\n${p.content || ''}\n\n`;
    });

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullDoc);
      setCopiedSec4Idx('all');
      setTimeout(() => setCopiedSec4Idx(null), 2000);
    }
  };

  // Section 5 Master Bus State & Handler
  const [copiedMasterBus, setCopiedMasterBus] = useState(false);

  const handleCopyMasterBus = () => {
    if (!masterBus) return;
    let doc = `## Section 5: Master Bus Processing Chain & Metering Architecture (${currentDaw})\n\n`;
    doc += `### Loudness & Headroom Target Standards\n`;
    doc += `- True Peak Ceiling: -1.0 dBFS Max (EBU R128 / ITU-R BS.1770)\n`;
    doc += `- Integrated Loudness: -14.0 to -16.0 LUFS (Commercial Streaming Standard)\n`;
    doc += `- Dynamic Range / Crest Factor: PSR 9 – 12 dB\n\n`;
    doc += `### Serial 2-Bus Processing Signal Flow\n`;
    doc += `1. Linear Phase EQ: HPF 30Hz • Sub-rumble notch\n`;
    doc += `2. VCA Bus Glue: SSL Bus Compressor • 30ms att • 0.1s rel • 2:1 ratio • 1-2 dB GR\n`;
    doc += `3. Harmonic Saturation: Tape Sim • 1/2" 30 IPS • Analogue warmth & cohesion\n`;
    doc += `4. True Peak Limiter: Ceiling -1.0 dBFS • 24-bit TPDF dither • Inter-sample peak safe\n\n`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(doc);
      setCopiedMasterBus(true);
      setTimeout(() => setCopiedMasterBus(false), 2000);
    }
  };

  // Active track selection in the virtual console
  const activeTrack = (trackTable && trackTable.length > 0)
    ? (trackTable[activeInstIdx] || trackTable[0])
    : null;

  // Smart fuzzy instrument matcher for any stem in trackTable (split guitars, harmonies, organ, brass, etc.)
  const findMatchingInstrument = (stemName, idx) => {
    if (!instruments || instruments.length === 0) return null;
    const sNorm = (stemName || '').toLowerCase().trim();
    if (!sNorm) return instruments[idx] || instruments[0];

    // 1. Exact or substring match
    const match = instruments.find(i => {
      const iNorm = (i.name || '').toLowerCase().trim();
      return sNorm.includes(iNorm) || iNorm.includes(sNorm);
    });
    if (match) return match;

    // 2. Keyword matching for common stem families
    const keywords = [
      { keys: ['kick', 'bd', 'bass drum'], target: 'kick' },
      { keys: ['snare', 'sd'], target: 'snare' },
      { keys: ['hat', 'hh'], target: 'hi-hat' },
      { keys: ['drum', 'overhead', 'oh', 'tom', 'cymbal', 'perc'], target: 'drum' },
      { keys: ['bass', 'di bass', 'sub'], target: 'bass' },
      { keys: ['guitar', 'gtr', 'acoustic', 'electric'], target: 'guitar' },
      { keys: ['vocal', 'vox', 'lead voc', 'backing', 'bgv', 'harmony'], target: 'vocal' },
      { keys: ['piano', 'key', 'organ', 'synth', 'pad', 'hammond', 'rhodes'], target: 'key' },
      { keys: ['brass', 'horn', 'sax', 'trumpet'], target: 'brass' }
    ];

    for (const kw of keywords) {
      if (kw.keys.some(k => sNorm.includes(k))) {
        const found = instruments.find(i => {
          const iName = (i.name || '').toLowerCase();
          return kw.keys.some(k => iName.includes(k)) || iName.includes(kw.target);
        });
        if (found) return found;
      }
    }

    return instruments[idx] || instruments[0];
  };

  // Active instrument object in Section 3
  const activeInstrument = (instruments && instruments.length > 0)
    ? findMatchingInstrument(activeTrack?.stem, activeInstIdx)
    : null;

  // Open Inspector (Anchored in the middle pointing directly to the clicked slot or pill)
  const handleOpenInspector = (e, trackIdx, sectionType, itemName) => {
    if (e) {
      e.stopPropagation();
    }
    if (targetElementRef.current) {
      targetElementRef.current.classList.remove('active-inspect-target');
    }
    setActiveInstIdx(trackIdx);

    if (e && e.currentTarget) {
      targetElementRef.current = e.currentTarget;
      e.currentTarget.classList.add('active-inspect-target');
      const r = e.currentTarget.getBoundingClientRect();
      setTargetRect({
        top: r.top,
        bottom: r.bottom,
        left: r.left,
        right: r.right,
        width: r.width,
        height: r.height,
        centerX: r.left + r.width / 2,
        centerY: r.top + r.height / 2
      });
    }

    setInspectorFocus({
      trackIdx,
      sectionType: sectionType || 'dynamics',
      itemName: itemName || ''
    });

    setInspectorOpen(true);
    // Keep side panel if already docked or modal; otherwise open directly anchored in the middle
    if (inspectorMode !== 'docked' && inspectorMode !== 'modal') {
      setInspectorMode('anchored');
    }
  };

  const handleSnapToSlot = () => {
    setInspectorMode('anchored');
  };

  const handleDockToSide = () => {
    setInspectorMode('docked');
  };

  const handleExpandToCenter = () => {
    setInspectorMode('modal');
  };

  const handleCloseInspector = () => {
    if (targetElementRef.current) {
      targetElementRef.current.classList.remove('active-inspect-target');
    }
    setInspectorOpen(false);
    targetElementRef.current = null;
    setTargetRect(null);
  };

  const updateTargetForTrack = (newTrackIdx, secType) => {
    if (typeof document === 'undefined') return;
    if (targetElementRef.current) {
      targetElementRef.current.classList.remove('active-inspect-target');
    }
    const targetSec = secType || inspectorFocus.sectionType;
    const el = document.querySelector(`[data-track-idx="${newTrackIdx}"][data-section="${targetSec}"]`) ||
               document.querySelector(`[data-track-idx="${newTrackIdx}"]`);
    if (el) {
      targetElementRef.current = el;
      el.classList.add('active-inspect-target');
      const r = el.getBoundingClientRect();
      setTargetRect({
        top: r.top,
        bottom: r.bottom,
        left: r.left,
        right: r.right,
        width: r.width,
        height: r.height,
        centerX: r.left + r.width / 2,
        centerY: r.top + r.height / 2
      });
      if (r.left < 0 || r.right > window.innerWidth) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handlePrevTrack = () => {
    if (!trackTable || trackTable.length === 0) return;
    const newIdx = (inspectorFocus.trackIdx - 1 + trackTable.length) % trackTable.length;
    setInspectorFocus(prev => ({ ...prev, trackIdx: newIdx }));
    setActiveInstIdx(newIdx);
    updateTargetForTrack(newIdx, inspectorFocus.sectionType);
  };

  const handleNextTrack = () => {
    if (!trackTable || trackTable.length === 0) return;
    const newIdx = (inspectorFocus.trackIdx + 1) % trackTable.length;
    setInspectorFocus(prev => ({ ...prev, trackIdx: newIdx }));
    setActiveInstIdx(newIdx);
    updateTargetForTrack(newIdx, inspectorFocus.sectionType);
  };

  // Handle Escape key to close inspector
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseInspector();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Track target element coordinates on scroll/resize so laser line stays glued to the clicked plugin
  useEffect(() => {
    if (!inspectorOpen || !targetElementRef.current) return;

    const handleUpdate = () => {
      if (targetElementRef.current) {
        if (!document.body.contains(targetElementRef.current)) return;
        const r = targetElementRef.current.getBoundingClientRect();
        // Only close if deeply scrolled away (> 240px outside screen boundaries)
        if (r.bottom < -240 || r.top > window.innerHeight + 240 || r.right < -240 || r.left > window.innerWidth + 240) {
          handleCloseInspector();
          return;
        }
        setTargetRect({
          top: r.top,
          bottom: r.bottom,
          left: r.left,
          right: r.right,
          width: r.width,
          height: r.height,
          centerX: r.left + r.width / 2,
          centerY: r.top + r.height / 2
        });
      }
    };

    window.addEventListener('scroll', handleUpdate, { capture: true, passive: true });
    window.addEventListener('resize', handleUpdate, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleUpdate, { capture: true });
      window.removeEventListener('resize', handleUpdate);
    };
  }, [inspectorOpen, inspectorMode]);

  // Cleanup active target class on unmount
  useEffect(() => {
    return () => {
      if (targetElementRef.current) {
        targetElementRef.current.classList.remove('active-inspect-target');
      }
    };
  }, []);

  // In anchored mode: close popover when clicking outside (without intercepting clicks on other slots/pills)
  useEffect(() => {
    if (!inspectorOpen || inspectorMode !== 'anchored') return;

    const handleClickOutside = (e) => {
      if (!e || !e.target) return;
      // Do not close if clicking inside inspector popover
      if (e.target.closest && e.target.closest('.tracksheet-inspector-root')) {
        return;
      }
      // Do not close if clicking any other pill, slot, fader, or inspect button
      if (e.target.closest && e.target.closest(
        '.clickable-pill, .clickable-slot, .desk-inspect-btn, .comp-fx-pill, .comp-inspect-btn, .desk-ch-slot, .desk-fx-pill, .logbook-track-pill, .logbook-sec-btn'
      )) {
        return;
      }
      handleCloseInspector();
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inspectorOpen, inspectorMode]);

  // Format graphical dialled knob settings badge
  const renderSettingsBadge = (settingsStr) => {
    if (!settingsStr) return null;
    const badges = [...settingsStr.matchAll(/`([^`]+)`/g)];
    if (badges.length > 0) {
      return (
        <div className="logbook-knob-badges">
          {badges.map((b, idx) => (
            <span key={idx} className="logbook-knob-badge">{b[1]}</span>
          ))}
        </div>
      );
    }
    return <span style={{ color: '#38BDF8' }}>{settingsStr}</span>;
  };

  // Helper to parse embedded markdown or ASCII tables
  const parseMarkdownTable = (text) => {
    if (!text) return null;

    // 1. Standard markdown table: | Col 1 | Col 2 | \n | --- | --- | \n | Val 1 | Val 2 |
    const mdMatch = text.match(/\|([^\n]+)\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
    if (mdMatch) {
      const headers = mdMatch[1].split('|').map(c => c.trim()).filter(Boolean);
      const rows = mdMatch[2].trim().split('\n').map(row => 
        row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      );
      const beforeText = text.substring(0, mdMatch.index).replace(/```[a-z]*\s*$/i, '').trim();
      const afterText = text.substring(mdMatch.index + mdMatch[0].length).replace(/^```/i, '').trim();
      return { headers, rows, beforeText, afterText };
    }

    // 2. ASCII box table (e.g. +-------+ \n | TITLE | \n +-------+ \n | Col 1 | Col 2 | \n +-------+)
    const asciiRegex = /(?:```[a-z]*\s*\n)?\+[-+]+\+\n(?:\|([^\n|]+)\|\n\+[-+]+\+\n)?((?:\|[^\n]+\|\n?)+)\+[-+]+\+(?:\s*\n```)?/;
    const asciiMatch = text.match(asciiRegex);
    if (asciiMatch) {
      const tableTitle = asciiMatch[1] ? asciiMatch[1].trim() : null;
      const rawRows = asciiMatch[2].trim().split('\n').filter(l => l.includes('|') && !l.startsWith('+'));
      
      const rows = rawRows.map(line => 
        line.split('|').map(c => c.trim()).filter(Boolean)
      );

      const beforeText = text.substring(0, asciiMatch.index).replace(/```[a-z]*\s*$/i, '').trim();
      const afterText = text.substring(asciiMatch.index + asciiMatch[0].length).replace(/^```/i, '').trim();

      return {
        tableTitle,
        headers: tableTitle ? [tableTitle, 'Frequency Allocation & Processing'] : [],
        rows,
        beforeText,
        afterText
      };
    }

    // 3. Fallback: Multiple piped lines
    const pipedRegex = /(?:^|\n)((?:\|[^\n]+\|\n?){2,})/;
    const pipedMatch = text.match(pipedRegex);
    if (pipedMatch) {
      const lines = pipedMatch[1].trim().split('\n').filter(l => !l.match(/^[|+-:\s]+$/));
      if (lines.length >= 2) {
        const firstLine = lines[0].split('|').map(c => c.trim()).filter(Boolean);
        const remainingLines = lines.slice(1);
        const rows = remainingLines.map(l => l.split('|').map(c => c.trim()).filter(Boolean));
        
        const beforeText = text.substring(0, pipedMatch.index).replace(/```[a-z]*\s*$/i, '').trim();
        const afterText = text.substring(pipedMatch.index + pipedMatch[0].length).replace(/^```/i, '').trim();

        return {
          headers: firstLine.length > 1 ? firstLine : [],
          rows: firstLine.length === 1 ? [firstLine, ...rows] : rows,
          beforeText,
          afterText
        };
      }
    }

    return null;
  };

  // Helper to highlight audio parameter tokens
  const renderFormattedAudioText = (rawStr) => {
    if (!rawStr) return null;
    const paramRegex = /([±+-]?\d+(?:\.\d+)?\s*(?:kHz|Hz|dBFS|dB|ms|s|BPM)|\b\d+(?:\.\d+)?:\d+\b|\b\d+\s*–\s*\d+\s*(?:kHz|Hz|dB)\b|\b\d+\s*to\s*\d+\s*(?:kHz|Hz|dB)\b)/gi;
    const parts = rawStr.split(paramRegex);
    return parts.map((part, idx) => {
      if (part && paramRegex.test(part)) {
        paramRegex.lastIndex = 0;
        return <span key={idx} className="logbook-param-token">{part}</span>;
      }
      return part;
    });
  };

  // Render structured mix strategy card content
  const renderMixCardContent = (rawText, accentColor) => {
    if (!rawText) return null;

    // Clean any fence or border artifacts before parsing
    const cleanedText = rawText.replace(/^```[a-z]*\s*$/gim, '').trim();
    const tableData = parseMarkdownTable(cleanedText);

    const renderNarrativeBlocks = (content) => {
      if (!content) return null;
      const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

      return lines
        .filter(line => {
          const clean = line.trim();
          if (!clean) return false;
          if (clean === '```' || clean.startsWith('```')) return false;
          if (/^[+=-]{3,}$/.test(clean)) return false;
          if (/^\+[-+]+\+$/.test(clean)) return false;
          if (/^[-—]{3,}$/.test(clean)) return false;
          return true;
        })
        .map((line, idx) => {
          const cleanLine = line.replace(/^[•*-]\s*/, '').replace(/```/g, '').replace(/^[+=-]{3,}$/g, '').trim();
          if (!cleanLine) return null;

          const subheadMatch = cleanLine.match(/^#{1,6}\s+(.*)$/);
          if (subheadMatch) {
            const subheadTitle = subheadMatch[1].replace(/[*#]/g, '').trim();
            return (
              <div key={idx} className="logbook-mix-block" style={{ marginTop: idx > 0 ? '0.65rem' : '0' }}>
                <span 
                  className="logbook-mix-subhead-pill" 
                  style={{ 
                    background: `${accentColor}18`, 
                    borderColor: `${accentColor}45`, 
                    color: accentColor 
                  }}
                >
                  {subheadTitle}
                </span>
              </div>
            );
          }

          const boldTitleMatch = cleanLine.match(/^\*\*([^*]+)\*\*:?\s*(.*)$/);
          if (boldTitleMatch) {
            const title = boldTitleMatch[1].replace(/:$/, '').trim();
            const desc = boldTitleMatch[2].trim();
            return (
              <div key={idx} className="logbook-mix-block">
                <span 
                  className="logbook-mix-subhead-pill" 
                  style={{ 
                    background: `${accentColor}18`, 
                    borderColor: `${accentColor}45`, 
                    color: accentColor 
                  }}
                >
                  {title}
                </span>
                {desc && (
                  <p className="logbook-mix-block-text">
                    {renderFormattedAudioText(desc)}
                  </p>
                )}
              </div>
            );
          }

          return (
            <p key={idx} className="logbook-mix-block-text" style={{ margin: '0.25rem 0' }}>
              {renderFormattedAudioText(cleanLine.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1'))}
            </p>
          );
        });
    };

    return (
      <>
        {tableData?.beforeText && renderNarrativeBlocks(tableData.beforeText)}
        {tableData && tableData.rows && tableData.rows.length > 0 && (
          <div className="table-wrapper" style={{ margin: '0.75rem 0' }}>
            {tableData.tableTitle && (
              <div className="logbook-mix-table-title" style={{ color: accentColor, marginBottom: '0.6rem' }}>
                <Activity size={15} color={accentColor} />
                <span>{tableData.tableTitle}</span>
              </div>
            )}
            <table className="logbook-master-table">
              {tableData.headers && tableData.headers.length > 0 && (
                <thead>
                  <tr>
                    {tableData.headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{renderFormattedAudioText(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tableData?.afterText && renderNarrativeBlocks(tableData.afterText)}
        {!tableData && renderNarrativeBlocks(cleanedText)}
      </>
    );
  };

  // Render dedicated Master Bus hardware rack & signal flow module
  const renderMasterBusModule = (showFullRack = true) => {
    return (
      <div className="sec4-master-bus-module">
        {/* Loudness & Headroom Targets HUD */}
        <div className="sec4-master-hud">
          <div className="sec4-hud-card">
            <div className="sec4-hud-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}>
              <Gauge size={16} />
            </div>
            <div className="sec4-hud-info">
              <span className="sec4-hud-label">True Peak Ceiling</span>
              <div className="sec4-hud-value" style={{ color: '#F87171' }}>
                {masterBus?.truePeak || (isProducer ? '-0.3 dBFS' : '-1.0 dBFS Max')}
              </div>
              <span className="sec4-hud-desc">
                {isProducer ? 'Master DAC headroom; eliminates inter-sample distortion' : 'Inter-sample peak safe for AAC/MP3/Ogg streaming transcoding'}
              </span>
            </div>
          </div>

          <div className="sec4-hud-card">
            <div className="sec4-hud-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
              <Volume2 size={16} />
            </div>
            <div className="sec4-hud-info">
              <span className="sec4-hud-label">Integrated Loudness</span>
              <div className="sec4-hud-value" style={{ color: '#38BDF8' }}>
                {masterBus?.targetLoudness || (isProducer ? '-8 to -10 LUFS' : '-14 to -16 LUFS')}
              </div>
              <span className="sec4-hud-desc">
                {isProducer ? 'Modern commercial competitive club/streaming master target' : 'Commercial streaming standard (Spotify, Apple Music, YouTube)'}
              </span>
            </div>
          </div>

          <div className="sec4-hud-card">
            <div className="sec4-hud-icon-wrap" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34D399' }}>
              <Activity size={16} />
            </div>
            <div className="sec4-hud-info">
              <span className="sec4-hud-label">{isProducer ? 'Phase Correlation' : 'Dynamic Crest / PSR'}</span>
              <div className="sec4-hud-value" style={{ color: '#34D399' }}>
                {isProducer ? (masterBus?.phaseCorrelation || '+0.8 to +1.0') : '9 – 12 dB'}
              </div>
              <span className="sec4-hud-desc">
                {isProducer ? 'Monitored via correlation meter; mono club sound system compatible' : 'Punchy transients, breathing punch, unclipped master headroom'}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Stage Hardware Rack Signal Flow */}
        {showFullRack && (
          <div className="sec4-rack-chassis">
            <div className="sec4-rack-header">
              <div className="sec4-rack-title">
                <Cpu size={14} color="#38BDF8" />
                <span>Stereo 2-Bus Serial Processing Architecture</span>
              </div>
              <span className="sec4-rack-sub">Linear Signal Flow ➔ Left / Right Master Out</span>
            </div>
            <div className="sec4-rack-flow">
              <div className="sec4-rack-unit">
                <span className="sec4-rack-unit-step">01</span>
                <span className="sec4-rack-unit-name">Linear Phase EQ</span>
                <span className="sec4-rack-unit-detail">HPF 30Hz • Sub-rumble notch</span>
              </div>
              <div className="sec4-rack-connector">➔</div>
              <div className="sec4-rack-unit">
                <span className="sec4-rack-unit-step">02</span>
                <span className="sec4-rack-unit-name">VCA Bus Glue</span>
                <span className="sec4-rack-unit-detail">SSL Bus • 30ms att • 0.1s rel • 2:1</span>
              </div>
              <div className="sec4-rack-connector">➔</div>
              <div className="sec4-rack-unit">
                <span className="sec4-rack-unit-step">03</span>
                <span className="sec4-rack-unit-name">Harmonic Saturation</span>
                <span className="sec4-rack-unit-detail">Tape Sim • 1/2" 30 IPS • Warmth</span>
              </div>
              <div className="sec4-rack-connector">➔</div>
              <div className="sec4-rack-unit limiter">
                <span className="sec4-rack-unit-step">04</span>
                <span className="sec4-rack-unit-name">True Peak Limiter</span>
                <span className="sec4-rack-unit-detail">Ceiling -1.0 dBFS • 24-bit TPDF</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Helper to parse transducer specifications
  const parseLogbookTransducer = (body, instName) => {
    if (!body) return null;
    const bodyText = typeof body === 'string' ? body : (body.rawText || String(body));

    let rawTransducer = '';
    let polarPattern = '';
    let placement = '';
    let gainStaging = '';

    const lines = bodyText.split('\n');
    for (const line of lines) {
      const clean = line.trim().replace(/^[•*-]\s*/, '');
      const boldMatch = clean.match(/^\*\*([^*]+)\*\*:?\s*(.*)$/);
      if (boldMatch) {
        const title = boldMatch[1].toLowerCase();
        const val = boldMatch[2].trim();
        if (title.includes('transducer') || title.includes('microphone') || title.includes('signal hardware')) {
          rawTransducer = val;
        } else if (title.includes('polar pattern')) {
          polarPattern = val;
        } else if (title.includes('placement') || title.includes('axis alignment')) {
          placement = val;
        } else if (title.includes('gain staging') || title.includes('preamp')) {
          gainStaging = val;
        }
      }
    }

    if (!rawTransducer && activeTrack && activeTrack.capture) {
      rawTransducer = activeTrack.capture;
    }

    if (!rawTransducer && !polarPattern && !placement) {
      return null;
    }

    let cleanPolar = '';
    const searchPolarText = `${polarPattern} ${rawTransducer}`;
    if (/figure[- ]?8|bidirectional/i.test(searchPolarText)) cleanPolar = 'Figure-8';
    else if (/hyper[- ]?cardioid/i.test(searchPolarText)) cleanPolar = 'Hypercardioid';
    else if (/super[- ]?cardioid/i.test(searchPolarText)) cleanPolar = 'Supercardioid';
    else if (/omni(?:directional)?/i.test(searchPolarText)) cleanPolar = 'Omnidirectional';
    else if (/cardioid/i.test(searchPolarText)) cleanPolar = 'Cardioid';

    let typeClass = 'dynamic';
    let category = 'Moving-Coil Dynamic';

    if (/valve|tube/i.test(rawTransducer)) {
      typeClass = 'tube';
      category = 'Valve / Tube Condenser';
    } else if (/ribbon/i.test(rawTransducer)) {
      typeClass = 'ribbon';
      category = 'Ribbon Transducer';
    } else if (/di\b|direct injection|line input/i.test(rawTransducer)) {
      typeClass = 'di';
      category = 'Direct Injection (DI)';
    } else if (/small diaphragm|sdc|c1000|nt5|km184/i.test(rawTransducer)) {
      typeClass = 'condenser';
      category = 'Small Diaphragm Condenser (SDC)';
    } else if (/large diaphragm|ldc|u87|c414|nt1|at2020|at2035/i.test(rawTransducer)) {
      typeClass = 'condenser';
      category = 'Large Diaphragm Condenser (LDC)';
    } else if (/low[- ]end|bass/i.test(rawTransducer)) {
      typeClass = 'dynamic';
      category = 'Low-End Dynamic Microphone';
    }

    let model = '';
    const allParens = [...rawTransducer.matchAll(/\(([^)]+)\)/g)].map(m => m[1].trim());
    const gearParen = allParens.find(p => /e\.g\.|i\.e\.|shure|akg|neumann|sennheiser|rode|audio-technica|radial|bss|sony|coles|royer|ev|d112|sm57|u87|c414|nt1|nt2|re20|md421|beta 52|c1000|nt5/i.test(p));

    if (gearParen) {
      model = gearParen.replace(/^(?:e\.g\.?|i\.e\.?)\s*/i, '').trim();
    } else if (allParens.length > 0 && !/sdc|ldc|mic|audio/i.test(allParens[0])) {
      model = allParens[0].replace(/^(?:e\.g\.?|i\.e\.?)\s*/i, '').trim();
    } else {
      const outside = rawTransducer.replace(/\s*\([^)]+\)/g, '').replace(/\.$/, '').trim();
      model = outside || category;
    }

    return {
      raw: rawTransducer,
      model: model || category,
      category,
      typeClass,
      polarPattern: cleanPolar,
      placement: placement.replace(/\.$/, '').trim(),
      gainStaging: gainStaging.replace(/\.$/, '').trim()
    };
  };

  const ensureString = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      if (val.rawText) return val.rawText;
      return Object.entries(val)
        .filter(([k, v]) => v && typeof v === 'string')
        .map(([k, v]) => `* **${k}:** ${v}`)
        .join('\n');
    }
    return String(val);
  };

  const getSelectedCaptureSolution = (inst) => {
    if (!inst) return null;

    let pathwayStr = '';
    if (activeTrack && activeTrack.capture) {
      pathwayStr = activeTrack.capture;
    } else if (inst.preferredPathway) {
      pathwayStr = inst.preferredPathway;
    }

    const norm = pathwayStr.toLowerCase();

    if (norm.includes('pathway 1') || /\bp1\b/.test(norm) || norm.includes('acoustic') || norm.includes('microphone') || norm.includes('mic')) {
      return {
        num: 1,
        title: 'Pathway 1: Acoustic / Microphone Capture',
        body: ensureString(inst.pathway1 || inst.pathway2 || inst.pathway3)
      };
    }
    if (norm.includes('pathway 3') || /\bp3\b/.test(norm) || norm.includes('midi') || norm.includes('software instrument') || norm.includes('synth')) {
      return {
        num: 3,
        title: 'Pathway 3: Audio Instruments & MIDI',
        body: ensureString(inst.pathway3 || inst.pathway2 || inst.pathway1)
      };
    }
    if (norm.includes('pathway 2') || /\bp2\b/.test(norm) || norm.includes('direct injection') || /\bdi\b/.test(norm) || norm.includes('line input')) {
      return {
        num: 2,
        title: 'Pathway 2: Direct Injection (DI) & Line Input',
        body: ensureString(inst.pathway2 || inst.pathway1 || inst.pathway3)
      };
    }

    if (inst.pathway1) return { num: 1, title: 'Pathway 1: Acoustic / Microphone Capture', body: ensureString(inst.pathway1) };
    if (inst.pathway2) return { num: 2, title: 'Pathway 2: Direct Injection (DI) & Line Input', body: ensureString(inst.pathway2) };
    if (inst.pathway3) return { num: 3, title: 'Pathway 3: Audio Instruments & MIDI', body: ensureString(inst.pathway3) };

    return null;
  };

  // Check if a channel strip row matches the currently focused section in pop-out
  const isRowHighlighted = (pluginName, typeStr, focusSec) => {
    if (focusSec === 'all' || !focusSec) return false;
    const combined = `${pluginName} ${typeStr}`.toLowerCase();
    if (focusSec === 'dynamics') {
      return combined.includes('comp') || combined.includes('gate') || combined.includes('limit') || combined.includes('vca') || combined.includes('opto') || combined.includes('fet');
    }
    if (focusSec === 'eq') {
      return combined.includes('eq') || combined.includes('filter') || combined.includes('hpf') || combined.includes('pultec') || combined.includes('bell');
    }
    if (focusSec === 'inserts') {
      return !combined.includes('gate') && !combined.includes('comp') && !combined.includes('eq') && !combined.includes('filter');
    }
    if (focusSec === 'aux') {
      return combined.includes('reverb') || combined.includes('delay') || combined.includes('space') || combined.includes('echo');
    }
    return false;
  };

  // Split multiple plugins in a slot string (e.g. "Noise Gate, Logic Pro Compressor" -> ["Noise Gate", "Logic Pro Compressor"])
  const splitSlotItems = (str) => {
    if (!str) return [];
    return str.split(/[,+]|\band\b/i).map(s => s.trim()).filter(Boolean);
  };

  // Render parameters as individual badges
  const renderConciseParamBadges = (paramStr) => {
    if (!paramStr) return null;
    const backticked = [...paramStr.matchAll(/`([^`]+)`/g)].map(m => m[1]);
    if (backticked.length > 0) {
      return backticked.map((item, i) => (
        <span key={i} className="desk-popover-param-badge">{item}</span>
      ));
    }
    const tokens = paramStr.split(/[•;,]/).map(s => s.trim()).filter(Boolean);
    if (tokens.length > 1) {
      return tokens.map((item, i) => (
        <span key={i} className="desk-popover-param-badge">{item}</span>
      ));
    }
    return <span className="desk-popover-param-badge">{paramStr}</span>;
  };

  // Concise pop-up information resolver for clicked slot/pill
  const getConcisePopoverData = (trk, inst, sectionType, itemName, use3rdParty, dawName = 'Logic Pro') => {
    if (!trk) return null;

    const stemName = trk.stem || (inst ? inst.name : 'Track');
    const trackNo = trk.trackNo || '1';

    // 1. CAPTURE
    if (sectionType === 'capture') {
      const selected = inst ? getSelectedCaptureSolution(inst) : null;
      const transducerSpec = selected ? parseLogbookTransducer(selected.body, stemName) : null;
      
      const title = transducerSpec?.model || trk.capture || 'Dynamic Instrument Microphone';
      const whatItIs = transducerSpec 
        ? `${transducerSpec.category} (${transducerSpec.polarPattern || 'Cardioid'}) via Preamp Pathway`
        : (inst?.preferredPathway || `${dawName} Audio Track Capture`);
        
      const params = transducerSpec?.placement 
        ? `Placement: ${transducerSpec.placement} • Gain: Staged to -14 dBFS peak headroom`
        : 'Microphone aligned 45° off-axis, 2–4 inches from source • Pad: 0 dB • Gain staged to -14 dBFS';

      const objective = inst?.preferredJustification
        ? inst.preferredJustification
        : `Provides pristine transient impact, strong acoustic isolation, and high signal-to-noise ratio for ${stemName}.`;

      return {
        title,
        altName: null,
        badge: 'ACOUSTIC CAPTURE',
        categoryClass: 'pop-badge-cap',
        whatItIs,
        parameters: params,
        objective,
        stem: stemName,
        trackNo
      };
    }

    // 1.5 CHANNEL OVERVIEW & PAN POSITION
    if (sectionType === 'channel') {
      const fam = getInstrumentFamily(stemName);
      const dynText = trk.dynamics || 'Stock Compressor';
      const eqText = trk.eq || 'Stock EQ';
      const insText = trk.inserts || 'Stock ChromaGlow';
      const auxText = trk.aux || 'Stock Space Designer';

      return {
        title: `${stemName} (CH ${trackNo})`,
        altName: `${fam.name} Stem • ${dawName} Channel Strip`,
        badge: fam.name,
        categoryClass: 'pop-badge-cap',
        whatItIs: inst?.preferredPathway || `Multi-track ${fam.name} Audio Stem routing into ${dawName} mixing desk.`,
        parameters: `Fader: ${trk.fader || '0.0 dB'} • Pan: ${trk.pan || 'C'} • Capture: ${trk.capture || 'Direct'} • Dyn: ${dynText} • EQ: ${eqText} • Inserts: ${insText} • Aux: ${auxText}`,
        objective: inst?.preferredJustification || `Anchors the arrangement groove, dynamic pacing, and tonal clarity of ${stemName} in the stereo mix.`,
        stem: stemName,
        trackNo
      };
    }

    if (sectionType === 'pan') {
      return {
        title: `Pan Position: ${trk.pan || 'C (Center)'}`,
        altName: `Stereo Field Azimuth • CH ${trackNo}`,
        badge: 'STEREO PAN',
        categoryClass: 'pop-badge-cap',
        whatItIs: 'Stereo Field Azimuth Pan Potentiometer with -3 dB Pan Law Compensation',
        parameters: `Position: ${trk.pan || 'C'} • Fader: ${trk.fader || '0.0 dB'} • Pan Law: -3 dB Compensated`,
        objective: `Positions ${stemName} precisely in the stereo panorama to eliminate frequency masking and craft 3D spatial depth.`,
        stem: stemName,
        trackNo
      };
    }

    // 2. DYNAMICS, EQ, INSERTS, AUX
    const channelStrip = inst?.channelStrip || [];
    const query = (itemName || '').toLowerCase();

    // Try to find matching channelStrip row
    let matchedRow = null;
    if (query) {
      matchedRow = channelStrip.find(row => {
        const p = (row.plugin || '').toLowerCase();
        const t = (row.type || '').toLowerCase();
        return p.includes(query) || query.includes(p) || t.includes(query) || query.includes(t);
      });
    }

    // If not matched by query, find by section type category
    if (!matchedRow) {
      if (sectionType === 'dynamics') {
        matchedRow = channelStrip.find(r => {
          const c = `${r.plugin} ${r.type}`.toLowerCase();
          return c.includes('comp') || c.includes('gate') || c.includes('limit') || c.includes('fet') || c.includes('vca') || c.includes('opto');
        });
      } else if (sectionType === 'eq') {
        matchedRow = channelStrip.find(r => {
          const c = `${r.plugin} ${r.type}`.toLowerCase();
          return c.includes('eq') || c.includes('filter') || c.includes('hpf') || c.includes('pultec') || c.includes('bell');
        });
      } else if (sectionType === 'aux') {
        matchedRow = channelStrip.find(r => {
          const c = `${r.plugin} ${r.type}`.toLowerCase();
          return c.includes('reverb') || c.includes('space') || c.includes('delay') || c.includes('echo') || c.includes('send');
        });
      } else if (sectionType === 'inserts') {
        matchedRow = channelStrip.find(r => {
          const c = `${r.plugin} ${r.type}`.toLowerCase();
          return !c.includes('comp') && !c.includes('gate') && !c.includes('limit') && !c.includes('eq') && !c.includes('filter') && !c.includes('reverb') && !c.includes('delay');
        });
      }
    }

    const categoryMeta = {
      dynamics: { label: 'DYNAMICS', class: 'pop-badge-dyn' },
      eq: { label: 'EQUALISATION', class: 'pop-badge-eq' },
      inserts: { label: 'INSERT PROCESSOR', class: 'pop-badge-ins' },
      aux: { label: 'AUX SEND ROUTE', class: 'pop-badge-aux' }
    }[sectionType] || { label: 'PROCESSOR', class: 'pop-badge-ins' };

    if (matchedRow) {
      const stockPlugin = matchedRow.plugin;
      const thirdPartyPlugin = get3rdPartyPluginName(stockPlugin);
      const title = use3rdParty ? thirdPartyPlugin : stockPlugin;
      const altName = use3rdParty ? stockPlugin : thirdPartyPlugin;

      return {
        title,
        altName: altName !== title ? altName : null,
        badge: matchedRow.slot || categoryMeta.label,
        categoryClass: categoryMeta.class,
        whatItIs: matchedRow.type || 'DAW Channel Strip Audio Processor',
        parameters: matchedRow.settings || 'Default unity calibration with manual threshold optimization',
        objective: matchedRow.objective || `Refines frequency balance and dynamics for ${stemName} in the final mix.`,
        stem: stemName,
        trackNo
      };
    }

    // Smart Contextual Fallback for Specific Audio Processors
    const cleanItem = itemName || (
      sectionType === 'dynamics' ? (trk.dynamics || `${dawName} Compressor`) :
      sectionType === 'eq' ? (trk.eq || `${dawName} Channel EQ`) :
      sectionType === 'inserts' ? (trk.inserts || `${dawName} ChromaGlow`) :
      (trk.aux || `${dawName} Space Designer`)
    );

    const cleanLower = cleanItem.toLowerCase();
    const thirdPartyAlt = get3rdPartyPluginName(cleanItem);
    const title = use3rdParty ? thirdPartyAlt : cleanItem;
    const altName = use3rdParty ? cleanItem : thirdPartyAlt;

    if (cleanLower.includes('chromaglow') || cleanLower.includes('chroma glow') || cleanLower.includes('saturation') || cleanLower.includes('warmth')) {
      return {
        title,
        altName: altName !== title ? altName : 'Soundtoys Decapitator / Sonnox Inflator',
        badge: 'ANALOGUE SATURATION',
        categoryClass: 'pop-badge-ins',
        whatItIs: 'Non-linear Analogue Tube & Tape Saturation Model with Even-Order Harmonic Generation.',
        parameters: 'Model: Modern Tube • Drive: 3.5 • Warmth: High • Mix: 60% Wet • Output: -0.5 dB',
        objective: `Injects analogue harmonic density and rich warmth, allowing ${stemName} to cut through the mix without abrasive treble EQ boosts.`,
        stem: stemName,
        trackNo
      };
    }

    if (cleanLower.includes('gate')) {
      return {
        title,
        altName: altName !== title ? altName : 'FabFilter Pro-G',
        badge: 'DYNAMIC NOISE GATE',
        categoryClass: 'pop-badge-dyn',
        whatItIs: 'Fast-acting Downward Dynamic Expander / Gate Circuit.',
        parameters: 'Threshold: -32 dB • Reduction: -24 dB • Attack: 1.2 ms • Hold: 40 ms • Release: 120 ms',
        objective: `Isolates acoustic strokes and eliminates mic spill between hits on ${stemName}, keeping the mix punchy and artifact-free.`,
        stem: stemName,
        trackNo
      };
    }

    if (cleanLower.includes('comp') || cleanLower.includes('fet') || cleanLower.includes('vca') || cleanLower.includes('opto') || cleanLower.includes('limit')) {
      return {
        title,
        altName: altName !== title ? altName : 'Empirical Labs Distressor / UAD 1176LN',
        badge: 'DYNAMICS PROCESSOR',
        categoryClass: 'pop-badge-dyn',
        whatItIs: 'Studio Limiting Amplifier with Ultra-Fast Attack & Program-Dependent Release.',
        parameters: 'Threshold: -16 dB • Ratio: 4:1 • Attack: 15 ms • Release: 95 ms • Makeup: +2.5 dB',
        objective: `Evens out dynamic performance velocity, locks ${stemName} solidly in the mix, and thickens sustain body.`,
        stem: stemName,
        trackNo
      };
    }

    if (cleanLower.includes('eq') || cleanLower.includes('filter')) {
      return {
        title,
        altName: altName !== title ? altName : 'FabFilter Pro-Q 3',
        badge: 'EQUALISATION',
        categoryClass: 'pop-badge-eq',
        whatItIs: '8-Band Parametric Clean Equalizer with High-Pass & Resonant Bell Filters.',
        parameters: 'HPF: 35 Hz (18 dB/oct) • Bell: -3 dB @ 450 Hz (Q: 2.2) • High Shelf: +2 dB @ 8.5 kHz',
        objective: `Carves out boxy low-mid build-up, filters sub-audible subsonic rumble, and enhances presence and air on ${stemName}.`,
        stem: stemName,
        trackNo
      };
    }

    if (cleanLower.includes('reverb') || cleanLower.includes('space') || cleanLower.includes('room') || cleanLower.includes('hall')) {
      return {
        title,
        altName: altName !== title ? altName : 'Soundtoys SuperPlate / Valhalla VintageVerb',
        badge: 'CONVOLUTION REVERB',
        categoryClass: 'pop-badge-aux',
        whatItIs: 'Stereo Convolution Impulse Response Reverb Processor.',
        parameters: 'IR Model: Warm Wood Drum Room (1.3s) • Pre-Delay: 12 ms • Filter HPF: 140 Hz • Bus Send: -14 dB',
        objective: `Places ${stemName} into a believable three-dimensional acoustic space while maintaining front-and-center direct clarity.`,
        stem: stemName,
        trackNo
      };
    }

    if (cleanLower.includes('delay') || cleanLower.includes('echo')) {
      return {
        title,
        altName: altName !== title ? altName : 'Soundtoys EchoBoy',
        badge: 'TEMPO DELAY AUX',
        categoryClass: 'pop-badge-aux',
        whatItIs: 'Analogue Tape & Stereo BBD Tempo-Synced Delay.',
        parameters: 'Timing: 1/8th Note Sync • Feedback: 22% • Low Cut: 200 Hz • High Cut: 4.5 kHz • Send: -18 dB',
        objective: `Adds spatial width and rhythmic dimension to ${stemName} without cluttering the center vocal and bass image.`,
        stem: stemName,
        trackNo
      };
    }

    // General Fallback
    return {
      title,
      altName: altName !== title ? altName : null,
      badge: categoryMeta.label,
      categoryClass: categoryMeta.class,
      whatItIs: `${dawName} Dedicated Audio Processor Module.`,
      parameters: 'Calibrated to production mix reference • Unity gain structure preserved',
      objective: `Enhances the tonal character and dynamic envelope of ${stemName} for cohesive mixdown integration.`,
      stem: stemName,
      trackNo
    };
  };

  // Core Section 3 Content Renderer (reusable between On-Page Inspector and Pop-Out Window)
  const renderSection3Details = (inst, trk, focusSec = 'all') => {
    if (!inst) return null;

    const selected = getSelectedCaptureSolution(inst);
    const headerClass = selected ? (selected.num === 1 ? 'p1' : selected.num === 2 ? 'p2' : 'p3') : 'p1';
    const HeaderIcon = selected ? (selected.num === 1 ? Mic2 : selected.num === 2 ? Zap : Radio) : Mic2;
    const prefPathwayTitle = inst.preferredPathway || (selected ? selected.title : 'Acoustic / DI Capture');
    const transducerSpec = selected ? parseLogbookTransducer(selected.body, inst.name) : null;
    const { hardwareSetup, dawProcessing } = splitJustification(inst.preferredJustification);

    // Card expansion states
    const isCaptureExpanded = focusSec === 'capture' || (focusSec === 'all' && Boolean(expandedSec3Cards['capture']));
    const isStripActiveInPopup = ['inserts', 'dynamics', 'eq', 'aux', 'strip'].includes(focusSec);
    const isStripExpanded = isStripActiveInPopup || (focusSec === 'all' && Boolean(expandedSec3Cards['strip']));
    const isPitfallExpanded = focusSec === 'pitfall' || (focusSec === 'all' && Boolean(expandedSec3Cards['pitfall']));
    const isAltsExpanded = focusSec === 'alts' || (focusSec === 'all' && Boolean(expandedSec3Cards['alts']));

    return (
      <div className="logbook-inst-hub sec4-accordion-list" style={{ marginTop: '0.75rem' }}>
        {/* Module 1: Hardware Setup & Transducer Specification */}
        {selected && selected.body && (
          <div 
            className={`sec4-accordion-card ${isCaptureExpanded ? 'open' : 'collapsed'} ${focusSec === 'capture' ? 'section-spotlight' : ''}`}
            style={{ borderColor: isCaptureExpanded ? '#38BDF860' : 'rgba(255, 255, 255, 0.08)' }}
          >
            {/* Clickable Header */}
            <div
              className="sec4-accordion-header"
              role="button"
              tabIndex={0}
              aria-expanded={isCaptureExpanded}
              onClick={() => handleToggleSec3Card('capture')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleSec3Card('capture');
                }
              }}
            >
              <div className="sec4-accordion-header-left">
                <div className="sec4-accordion-icon" style={{ background: 'rgba(56, 189, 248, 0.18)', borderColor: 'rgba(56, 189, 248, 0.45)' }}>
                  <HeaderIcon size={16} color="#38BDF8" />
                </div>
                <div className="sec4-accordion-title-wrap">
                  <span className="sec4-accordion-title">1. Hardware Setup, Transducer Protocol &amp; Preamp Gain Staging</span>
                  <span className="sec4-accordion-tag" style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', borderColor: 'rgba(56, 189, 248, 0.35)' }}>
                    ⭐ Preferred: {prefPathwayTitle.split(':')[0]}
                  </span>
                </div>
              </div>

              <div className="sec4-accordion-header-right">
                <button
                  type="button"
                  className="sec4-accordion-copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const text = [
                      `Preferred Capture Protocol: ${prefPathwayTitle}`,
                      hardwareSetup ? `Hardware Setup & Acoustic Isolation: ${hardwareSetup}` : '',
                      dawProcessing ? `In-The-Box DAW Processing: ${dawProcessing}` : '',
                      transducerSpec ? `Transducer: ${transducerSpec.model} (${transducerSpec.category})\nPlacement: ${transducerSpec.placement || 'N/A'}\nGain Staging: ${transducerSpec.gainStaging || 'N/A'}` : '',
                      selected.body
                    ].filter(Boolean).join('\n\n');
                    handleCopySec3Module('1. Hardware Setup, Transducer Protocol & Preamp Gain Staging', text, 'capture');
                  }}
                  title="Copy hardware capture specifications"
                >
                  {copiedSec3Key === 'capture' ? <CheckCircle2 size={13} color="#10B981" /> : <Copy size={13} />}
                </button>
                <div className="sec4-accordion-chevron">
                  {isCaptureExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </div>

            {/* Accordion Body */}
            {isCaptureExpanded && (
              <div className="sec4-accordion-body">
                <div className="logbook-preferred-capture-card" style={{ margin: 0 }}>
                  {(transducerSpec || hardwareSetup) && (
                    <div className="logbook-transducer-card">
                      <div className="logbook-transducer-header">
                        <div className="logbook-transducer-title-wrap">
                          <Mic2 size={16} color="#38BDF8" />
                          <span className="logbook-transducer-sec-title">Hardware Setup &amp; Transducer Specification</span>
                        </div>
                        {transducerSpec && (
                          <div className="logbook-transducer-pills">
                            <span className={`dossier-mic-tech-pill tech-${transducerSpec.typeClass}`}>
                              {transducerSpec.category}
                            </span>
                            {transducerSpec.polarPattern && (
                              <span className="dossier-mic-pattern-pill">
                                <Radio size={10} /> {transducerSpec.polarPattern}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {transducerSpec?.model && (
                        <div className="logbook-transducer-model-wrap">
                          <span className="logbook-transducer-model-label">Documented Transducer Make &amp; Model:</span>
                          <h4 className="logbook-transducer-model-name">{transducerSpec.model}</h4>
                        </div>
                      )}

                      <div className="logbook-transducer-quick-grid">
                        {transducerSpec?.placement && (
                          <div className="logbook-transducer-quick-item">
                            <span className="logbook-transducer-quick-label">Placement &amp; Alignment:</span>
                            <p className="logbook-transducer-quick-text">{transducerSpec.placement}</p>
                          </div>
                        )}
                        {transducerSpec?.gainStaging && (
                          <div className="logbook-transducer-quick-item">
                            <span className="logbook-transducer-quick-label">Preamp Gain Staging:</span>
                            <p className="logbook-transducer-quick-text">{transducerSpec.gainStaging}</p>
                          </div>
                        )}
                        {hardwareSetup && (
                          <div className="logbook-transducer-quick-item" style={{ gridColumn: '1 / -1' }}>
                            <span className="logbook-transducer-quick-label">Hardware Setup &amp; Acoustic Isolation:</span>
                            <p className="logbook-transducer-quick-text">{hardwareSetup}</p>
                          </div>
                        )}
                        {dawProcessing && (
                          <div className="logbook-transducer-quick-item" style={{ gridColumn: '1 / -1' }}>
                            <span className="logbook-transducer-quick-label" style={{ color: '#C084FC' }}>In-The-Box DAW Processing Objective:</span>
                            <p className="logbook-transducer-quick-text">{dawProcessing}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="logbook-capture-procedure-box">
                    <div className={`logbook-p-header ${headerClass}`}>
                      <HeaderIcon size={16} />
                      <span>{selected.title} — Signal Chain &amp; Acoustic Capture Procedure</span>
                      <span className="logbook-badge-pref" style={{ marginLeft: 'auto', fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                        ✓ Official C1 Submission
                      </span>
                    </div>
                    <div className="logbook-p-body" style={{ fontSize: '0.88rem', lineHeight: '1.65', padding: '1rem' }}>
                      {selected.body.split('\n').map((line, lIdx) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        const clean = trimmed.replace(/^[•*-]\s*/, '');
                        
                        const boldBulletMatch = clean.match(/^\*\*([^*]+)\*\*:?\s*(.*)$/);
                        if (boldBulletMatch) {
                          const bTitle = boldBulletMatch[1].replace(/:$/, '').trim();
                          const bDesc = boldBulletMatch[2].trim();
                          return (
                            <div key={lIdx} style={{ margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ color: selected.num === 1 ? '#38BDF8' : selected.num === 2 ? '#FBBF24' : '#C084FC', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                                {bTitle}
                              </span>
                              {bDesc && (
                                <p style={{ margin: 0, color: '#E2E8F0' }}>
                                  {renderFormattedAudioText(bDesc)}
                                </p>
                              )}
                            </div>
                          );
                        }

                        if (/^#{1,6}\s+/.test(clean)) {
                          return (
                            <div key={lIdx} style={{ margin: '0.6rem 0 0.3rem 0' }}>
                              <strong style={{ color: '#F8FAFC', fontSize: '0.9rem' }}>
                                {clean.replace(/^#{1,6}\s+/, '')}
                              </strong>
                            </div>
                          );
                        }

                        return (
                          <p key={lIdx} style={{ margin: '0.35rem 0', color: '#CBD5E1' }}>
                            {renderFormattedAudioText(clean)}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Module 2: Vertical Channel Strip Insert Chain */}
        {inst.channelStrip && inst.channelStrip.length > 0 && (
          <div 
            className={`sec4-accordion-card ${isStripExpanded ? 'open' : 'collapsed'} ${isStripActiveInPopup ? 'section-spotlight' : ''}`}
            style={{ borderColor: isStripExpanded ? '#818CF860' : 'rgba(255, 255, 255, 0.08)' }}
          >
            {/* Clickable Header */}
            <div
              className="sec4-accordion-header"
              role="button"
              tabIndex={0}
              aria-expanded={isStripExpanded}
              onClick={() => handleToggleSec3Card('strip')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleSec3Card('strip');
                }
              }}
            >
              <div className="sec4-accordion-header-left">
                <div className="sec4-accordion-icon" style={{ background: 'rgba(129, 140, 248, 0.18)', borderColor: 'rgba(129, 140, 248, 0.45)' }}>
                  <Sliders size={16} color="#818CF8" />
                </div>
                <div className="sec4-accordion-title-wrap">
                  <span className="sec4-accordion-title">
                    2. DAW Processing &amp; Vertical Channel Strip ({useThirdPartyPlugins ? '3rd-Party Pro' : currentDaw}): {inst.name}
                  </span>
                  <span className="sec4-accordion-tag" style={{ color: '#818CF8', background: 'rgba(129, 140, 248, 0.15)', borderColor: 'rgba(129, 140, 248, 0.35)' }}>
                    {inst.channelStrip.length} Inserts Configured
                  </span>
                </div>
              </div>

              <div className="sec4-accordion-header-right">
                <button
                  type="button"
                  className="sec4-accordion-copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const text = [
                      dawProcessing ? `DAW Processing Strategy: ${dawProcessing}\n` : '',
                      ...inst.channelStrip.map((r, i) => 
                        `${r.slot || `Insert ${i + 1}`}: ${useThirdPartyPlugins ? get3rdPartyPluginName(r.plugin) : r.plugin} (${r.type}) — Settings: ${r.settings} — Objective: ${r.objective}`
                      )
                    ].filter(Boolean).join('\n');
                    handleCopySec3Module(`2. Channel Strip Insert Chain: ${inst.name}`, text, 'strip');
                  }}
                  title="Copy channel strip inserts"
                >
                  {copiedSec3Key === 'strip' ? <CheckCircle2 size={13} color="#10B981" /> : <Copy size={13} />}
                </button>
                <div className="sec4-accordion-chevron">
                  {isStripExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </div>

            {/* Accordion Body */}
            {isStripExpanded && (
              <div className="sec4-accordion-body">
                {dawProcessing && (
                  <div className="logbook-daw-proc-strip" style={{ marginBottom: '0.85rem', padding: '0.75rem 1rem', background: 'rgba(129, 140, 248, 0.08)', border: '1px solid rgba(129, 140, 248, 0.25)', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ padding: '0.35rem', background: 'rgba(129, 140, 248, 0.15)', borderRadius: '6px', color: '#818CF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Cpu size={15} />
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#818CF8', marginBottom: '0.2rem' }}>
                        {currentDaw} In-The-Box Processing Strategy
                      </span>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                        {dawProcessing}
                      </p>
                    </div>
                  </div>
                )}

                <div className="table-wrapper" style={{ margin: 0 }}>
                  <table className="logbook-strip-table">
                    <thead>
                      <tr>
                        <th style={{ width: '85px' }}>ORDER</th>
                        <th>PROCESSOR / PLUGIN</th>
                        <th>TYPE &amp; CIRCUIT</th>
                        <th>DIALLED SETTINGS / KNOBS</th>
                        <th>TECHNICAL OBJECTIVE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inst.channelStrip.map((row, rIdx) => {
                        const pluginName = useThirdPartyPlugins ? get3rdPartyPluginName(row.plugin) : row.plugin;
                        const highlighted = isRowHighlighted(row.plugin, row.type, focusSec);
                        return (
                          <tr 
                            key={rIdx} 
                            className={`clickable-slot ${highlighted ? 'highlighted-strip-row' : ''}`}
                            data-track-idx={activeInstIdx}
                            data-section="inserts"
                            onClick={(e) => handleOpenInspector(e, activeInstIdx, 'inserts', row.plugin)}
                            style={{ cursor: 'pointer' }}
                            title={`Click to inspect parameters for ${pluginName}`}
                          >
                            <td>
                              <span className={`logbook-slot-pill ${highlighted ? 'slot-highlight' : ''}`}>
                                {row.slot || `Insert ${rIdx + 1}`}
                              </span>
                            </td>
                            <td>
                              <strong style={{ color: useThirdPartyPlugins ? '#C084FC' : '#F8FAFC' }}>
                                {pluginName}
                              </strong>
                              {useThirdPartyPlugins && (
                                <span className="logbook-tp-badge-tag">3rd-Party</span>
                              )}
                              {highlighted && (
                                <span className="logbook-match-tag">Matched Section</span>
                              )}
                            </td>
                            <td style={{ color: '#38BDF8', fontSize: '0.82rem' }}>{row.type}</td>
                            <td>{renderSettingsBadge(row.settings)}</td>
                            <td style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>{row.objective}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Module 3: Crucial Examiner Pitfalls & Marking Traps */}
        {inst.examinerPitfall && (
          <div 
            className={`sec4-accordion-card ${isPitfallExpanded ? 'open' : 'collapsed'}`}
            style={{ borderColor: isPitfallExpanded ? '#EF444460' : 'rgba(255, 255, 255, 0.08)' }}
          >
            {/* Clickable Header */}
            <div
              className="sec4-accordion-header"
              role="button"
              tabIndex={0}
              aria-expanded={isPitfallExpanded}
              onClick={() => handleToggleSec3Card('pitfall')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleSec3Card('pitfall');
                }
              }}
            >
              <div className="sec4-accordion-header-left">
                <div className="sec4-accordion-icon" style={{ background: 'rgba(239, 68, 68, 0.18)', borderColor: 'rgba(239, 68, 68, 0.45)' }}>
                  <AlertTriangle size={16} color="#EF4444" />
                </div>
                <div className="sec4-accordion-title-wrap">
                  <span className="sec4-accordion-title">3. Crucial Examiner Pitfalls &amp; Marking Traps</span>
                  <span className="sec4-accordion-tag" style={{ color: '#EF4444', background: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.35)' }}>
                    Edexcel Marking Penalty Alert
                  </span>
                </div>
              </div>

              <div className="sec4-accordion-header-right">
                <button
                  type="button"
                  className="sec4-accordion-copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopySec3Module('3. Crucial Examiner Pitfalls & Marking Traps', inst.examinerPitfall, 'pitfall');
                  }}
                  title="Copy examiner pitfall advice"
                >
                  {copiedSec3Key === 'pitfall' ? <CheckCircle2 size={13} color="#10B981" /> : <Copy size={13} />}
                </button>
                <div className="sec4-accordion-chevron">
                  {isPitfallExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </div>

            {/* Accordion Body */}
            {isPitfallExpanded && (
              <div className="sec4-accordion-body">
                <div className="logbook-pitfall-body-card" style={{ margin: 0 }}>
                  <p className="logbook-pitfall-text">{inst.examinerPitfall}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Module 4: Recommended 3rd-Party Industry Alternatives */}
        {inst.thirdParty && inst.thirdParty.length > 0 && (
          <div 
            className={`sec4-accordion-card ${isAltsExpanded ? 'open' : 'collapsed'}`}
            style={{ borderColor: isAltsExpanded ? '#A855F760' : 'rgba(255, 255, 255, 0.08)' }}
          >
            {/* Clickable Header */}
            <div
              className="sec4-accordion-header"
              role="button"
              tabIndex={0}
              aria-expanded={isAltsExpanded}
              onClick={() => handleToggleSec3Card('alts')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleSec3Card('alts');
                }
              }}
            >
              <div className="sec4-accordion-header-left">
                <div className="sec4-accordion-icon" style={{ background: 'rgba(168, 85, 247, 0.18)', borderColor: 'rgba(168, 85, 247, 0.45)' }}>
                  <Zap size={16} color="#A855F7" />
                </div>
                <div className="sec4-accordion-title-wrap">
                  <span className="sec4-accordion-title">4. Recommended 3rd-Party Industry Alternatives</span>
                  <span className="sec4-accordion-tag" style={{ color: '#A855F7', background: 'rgba(168, 85, 247, 0.15)', borderColor: 'rgba(168, 85, 247, 0.35)' }}>
                    Studio Standards
                  </span>
                </div>
              </div>

              <div className="sec4-accordion-header-right">
                <button
                  type="button"
                  className="sec4-accordion-copy-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const text = inst.thirdParty.map(tp => tp.name).join(', ');
                    handleCopySec3Module('4. Recommended 3rd-Party Alternatives', text, 'alts');
                  }}
                  title="Copy 3rd-party alternatives"
                >
                  {copiedSec3Key === 'alts' ? <CheckCircle2 size={13} color="#10B981" /> : <Copy size={13} />}
                </button>
                <div className="sec4-accordion-chevron">
                  {isAltsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </div>

            {/* Accordion Body */}
            {isAltsExpanded && (
              <div className="sec4-accordion-body">
                <div className="logbook-alts-body-card" style={{ margin: 0 }}>
                  <div className="logbook-tp-links">
                    {inst.thirdParty.map((tp, tpIdx) => (
                      tp.url ? (
                        <a key={tpIdx} href={tp.url} target="_blank" rel="noopener noreferrer" className="logbook-tp-badge">
                          <ExternalLink size={12} /> {tp.name}
                        </a>
                      ) : (
                        <span key={tpIdx} className="logbook-tp-badge">{tp.name}</span>
                      )
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="logbook-dossier-container">
      {/* 1. Hero Song & Archival / C1 Specification Card */}
      <div className="dossier-hero-card glass-panel" style={{ '--daw-accent': dawColor }}>
        <div className="dossier-hero-left">
          <div className="dossier-disc-wrap">
            <Disc className="dossier-spinning-vinyl" size={64} color="#C084FC" />
            <div className="dossier-disc-glow"></div>
          </div>

          <div className="dossier-hero-info">
            <div className="dossier-badge-row">
              <span className="dossier-pill dossier-pill-primary">
                {isProducer ? (
                  <>
                    <Zap size={11} fill="#06B6D4" color="#06B6D4" style={{ marginRight: 4, display: 'inline-block', verticalAlign: 'middle' }} />
                    PRODUCER STUDIO RECREATION
                  </>
                ) : (
                  <>
                    <Star size={11} fill="#FBBF24" color="#FBBF24" style={{ marginRight: 4, display: 'inline-block', verticalAlign: 'middle' }} />
                    COMPONENT 1 RECORDING
                  </>
                )}
              </span>
              {songGenre && <span className="dossier-pill">{songGenre}</span>}
              {releaseYear && <span className="dossier-pill">{releaseYear}</span>}
              <span className="dossier-pill" style={{ borderColor: dawColor, color: dawColor, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sliders size={11} />
                {currentDaw}
              </span>
            </div>

            <h1 className="dossier-song-title">{songTitle}</h1>
            <h2 className="dossier-artist-name">{artist}</h2>

            <div className="dossier-meta-grid">
              {label && (
                <div className="dossier-meta-item">
                  <span className="dossier-meta-label">Label &amp; Release:</span>
                  <span className="dossier-meta-value">{label}</span>
                </div>
              )}
              {dates && (
                <div className="dossier-meta-item">
                  <span className="dossier-meta-label">Tracking Dates:</span>
                  <span className="dossier-meta-value">{dates}</span>
                </div>
              )}
              {primaryStudio && (
                <div className="dossier-meta-item">
                  <span className="dossier-meta-label">Primary Facility:</span>
                  <span className="dossier-meta-value">{primaryStudio}</span>
                </div>
              )}
            </div>

            <div className="dossier-music-tags">
              {key && (
                <div className="dossier-tag">
                  <span className="dossier-tag-label">KEY</span>
                  <span className="dossier-tag-val" style={{ color: '#C084FC' }}>{key}</span>
                </div>
              )}
              {bpm && (
                <div className="dossier-tag">
                  <span className="dossier-tag-label">TEMPO</span>
                  <span className="dossier-tag-val" style={{ color: '#38BDF8' }}>{bpm} BPM</span>
                </div>
              )}
              {meter && (
                <div className="dossier-tag">
                  <span className="dossier-tag-label">METER</span>
                  <span className="dossier-tag-val" style={{ color: '#34D399' }}>{meter}</span>
                </div>
              )}
              {tuning && (
                <div className="dossier-tag" title={tuning}>
                  <span className="dossier-tag-label">TUNING</span>
                  <span className="dossier-tag-val" style={{ color: '#FBBF24' }}>
                    {tuning.length > 28 ? `${tuning.substring(0, 26)}…` : tuning}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Circular Confidence / C1 Compliance Meter */}
        <div className="dossier-confidence-wrap">
          <div className="dossier-gauge">
            <svg viewBox="0 0 100 100" className="dossier-gauge-svg">
              <circle 
                cx="50" cy="50" r="42" 
                className="dossier-gauge-bg"
              />
              <circle 
                cx="50" cy="50" r="42" 
                className="dossier-gauge-fill"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * (reliability || 95)) / 100}
              />
            </svg>
            <div className="dossier-gauge-content">
              <span className="dossier-gauge-num">{reliability}%</span>
              <span className="dossier-gauge-sub">{isProducer ? 'STUDIO READY' : 'C1 COMPLIANT'}</span>
            </div>
          </div>
          <div className="dossier-gauge-footer">
            <ShieldCheck size={14} color="#34D399" />
            <span>{isProducer ? 'Authentic ITB Recreated' : 'Edexcel Spec Verified'}</span>
          </div>
        </div>
      </div>

      {/* 2. Section 2: Comprehensive Mixing Desk & Session Track Sheet (Option 1: Virtual Console Deck) */}
      {trackTable && trackTable.length > 0 && (
        <div className="logbook-section-card glass-panel logbook-console-card">
          <div className="logbook-sec-header">
            <div className="logbook-sec-title-wrap">
              <Activity size={20} color="#38BDF8" />
              <div>
                <h3 className="logbook-sec-title">Section 2: Comprehensive Mixing Desk &amp; Master Track Sheet</h3>
                <p className="logbook-sec-subtitle">
                  Click any channel to reveal its full signal path in Section 3, or click an insert parameter to pop out technical details
                </p>
              </div>
            </div>

            <div className="logbook-desk-toolbar">
              {/* View Switcher: Mixing Desk vs Comprehensive Track Table */}
              <div className="logbook-view-switcher">
                <button
                  type="button"
                  className={`logbook-view-btn ${deskViewMode === 'desk' ? 'active' : ''}`}
                  onClick={() => setDeskViewMode('desk')}
                  title="Vertical Mixing Desk View"
                >
                  <Sliders size={13} />
                  <span>Mixing Desk</span>
                </button>
                <button
                  type="button"
                  className={`logbook-view-btn ${deskViewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setDeskViewMode('table')}
                  title="Comprehensive Multi-Column Track Sheet Table"
                >
                  <List size={13} />
                  <span>Track Table</span>
                </button>
              </div>

              {/* Global 3rd-Party vs Stock Switcher */}
              <button
                type="button"
                className={`logbook-plugin-mode-toggle ${useThirdPartyPlugins ? 'third-party' : 'stock'}`}
                onClick={() => setUseThirdPartyPlugins(!useThirdPartyPlugins)}
                title="Click to toggle between Stock DAW plugins and 3rd-Party Pro equivalents across the entire console"
              >
                <span className="toggle-indicator"></span>
                <span className="toggle-label">
                  {useThirdPartyPlugins ? '3rd-Party Pro (FabFilter / UAD / Soundtoys)' : `Stock DAW (${currentDaw})`}
                </span>
                <span className="toggle-action-pill">
                  {useThirdPartyPlugins ? 'View Stock' : 'View 3rd-Party'}
                </span>
              </button>

              <span className="logbook-sec-pill">{trackTable.length} Channels Allocated</span>
            </div>
          </div>

          {/* View Mode 1: Comprehensive Multi-Column Track Table */}
          {deskViewMode === 'table' ? (
            <div className="logbook-comprehensive-table-wrapper">
              <table className="logbook-comp-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px', textAlign: 'center' }}>Trk</th>
                    <th style={{ width: '180px' }}>Stem / Instrument</th>
                    <th style={{ width: '190px' }}>Capture</th>
                    <th style={{ width: '100px' }}>Fader Level</th>
                    <th style={{ width: '85px' }}>Pan</th>
                    <th>Dynamics</th>
                    <th>EQ</th>
                    <th>Inserts</th>
                    <th>Aux</th>
                    <th style={{ width: '110px', textAlign: 'center' }}>Section 3</th>
                  </tr>
                </thead>
                <tbody>
                  {trackTable.map((trk, idx) => {
                    const isSelected = activeInstIdx === idx;
                    const fam = getInstrumentFamily(trk.stem);
                    const dynItems = splitSlotItems(trk.dynamics).length > 0 ? splitSlotItems(trk.dynamics) : ['Compressor'];
                    const eqItems = splitSlotItems(trk.eq).length > 0 ? splitSlotItems(trk.eq) : ['Channel EQ'];
                    const insItems = splitSlotItems(trk.inserts).length > 0 ? splitSlotItems(trk.inserts) : ['ChromaGlow'];
                    const auxItems = splitSlotItems(trk.aux).length > 0 ? splitSlotItems(trk.aux) : ['Space Designer'];

                    return (
                      <tr 
                        key={idx}
                        data-track-idx={idx}
                        className={`comp-table-row ${isSelected ? 'active-row' : ''}`}
                        onClick={() => handleSelectTrack(idx, false)}
                      >
                        <td style={{ textAlign: 'center' }}>
                          <span className="comp-trk-num">{trk.trackNo || idx + 1}</span>
                        </td>
                        <td>
                          <div 
                            className="comp-stem-wrap clickable-slot"
                            data-track-idx={idx}
                            data-section="channel"
                            title="Click to inspect channel overview"
                            onClick={(e) => handleOpenInspector(e, idx, 'channel', trk.stem)}
                            style={{ cursor: 'pointer' }}
                          >
                            <span className="comp-stem-name">{trk.stem}</span>
                            <span 
                              className="comp-fam-badge" 
                              style={{ background: fam.bg, color: fam.color, borderColor: fam.border }}
                            >
                              {fam.name}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div 
                            className="comp-capture-cell clickable-slot" 
                            data-track-idx={idx}
                            data-section="capture"
                            style={{ padding: '0.25rem 0.4rem', borderRadius: '6px' }}
                            title="Click to inspect capture parameters"
                            onClick={(e) => handleOpenInspector(e, idx, 'capture', trk.capture)}
                          >
                            {renderCaptureGlyph(trk.capture)}
                            <span>{trk.capture || 'Direct Capture'}</span>
                          </div>
                        </td>
                        <td>
                          <div 
                            className="comp-meter-cell clickable-slot"
                            data-track-idx={idx}
                            data-section="channel"
                            style={{ padding: '0.25rem 0.4rem', borderRadius: '6px' }}
                            title="Click to inspect fader level"
                            onClick={(e) => handleOpenInspector(e, idx, 'channel', trk.stem)}
                          >
                            <Sliders size={12} color="#38BDF8" />
                            <span>{trk.fader || '0.0 dB'}</span>
                          </div>
                        </td>
                        <td>
                          <div 
                            className="comp-meter-cell clickable-slot"
                            data-track-idx={idx}
                            data-section="pan"
                            style={{ padding: '0.25rem 0.4rem', borderRadius: '6px', color: '#F59E0B' }}
                            title="Click to inspect pan azimuth"
                            onClick={(e) => handleOpenInspector(e, idx, 'pan', trk.pan || 'C')}
                          >
                            <Disc size={12} color="#F59E0B" />
                            <span>{trk.pan || 'C'}</span>
                          </div>
                        </td>
                        <td>
                          <div className="comp-pills-wrap" data-track-idx={idx} data-section="dynamics">
                            {dynItems.map((item, pIdx) => {
                              const pName = useThirdPartyPlugins ? get3rdPartyPluginName(item) : item;
                              return (
                                <span
                                  key={pIdx}
                                  className="comp-fx-pill dyn-pill clickable-pill"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenInspector(e, idx, 'dynamics', item);
                                  }}
                                  title={`Click to inspect parameters for ${pName}`}
                                >
                                  {pName}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td>
                          <div className="comp-pills-wrap" data-track-idx={idx} data-section="eq">
                            {eqItems.map((item, pIdx) => {
                              const pName = useThirdPartyPlugins ? get3rdPartyPluginName(item) : item;
                              return (
                                <span
                                  key={pIdx}
                                  className="comp-fx-pill eq-pill clickable-pill"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenInspector(e, idx, 'eq', item);
                                  }}
                                  title={`Click to inspect parameters for ${pName}`}
                                >
                                  {pName}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td>
                          <div className="comp-pills-wrap" data-track-idx={idx} data-section="inserts">
                            {insItems.map((item, pIdx) => {
                              const pName = useThirdPartyPlugins ? get3rdPartyPluginName(item) : item;
                              return (
                                <span
                                  key={pIdx}
                                  className="comp-fx-pill ins-pill clickable-pill"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenInspector(e, idx, 'inserts', item);
                                  }}
                                  title={`Click to inspect parameters for ${pName}`}
                                >
                                  {pName}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td>
                          <div className="comp-pills-wrap" data-track-idx={idx} data-section="aux">
                            {auxItems.map((item, pIdx) => {
                              const pName = useThirdPartyPlugins ? get3rdPartyPluginName(item) : item;
                              return (
                                <span
                                  key={pIdx}
                                  className="comp-fx-pill aux-pill clickable-pill"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenInspector(e, idx, 'aux', item);
                                  }}
                                  title={`Click to inspect parameters for ${pName}`}
                                >
                                  {pName}
                                </span>
                              );
                            })}
                          </div>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className={`comp-inspect-btn ${isSelected ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTrack(idx, true);
                            }}
                            title={`Inspect CH ${trk.trackNo || idx + 1} in Section 3`}
                          >
                            <Sliders size={11} />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* View Mode 2: Mixing Desk Horizontal Scroll Bay */
            <div className="logbook-console-desk-container">
              <div className="logbook-console-desk">
                {trackTable.map((trk, idx) => {
                  const isSelected = activeInstIdx === idx;
                  const fam = getInstrumentFamily(trk.stem);
                  const thumbPos = getFaderThumbPos(trk.fader);
                  const panRot = getPanRotation(trk.pan);

                  const dynItems = splitSlotItems(trk.dynamics).length > 0 ? splitSlotItems(trk.dynamics) : ['Compressor'];
                  const eqItems = splitSlotItems(trk.eq).length > 0 ? splitSlotItems(trk.eq) : ['Channel EQ'];
                  const insItems = splitSlotItems(trk.inserts).length > 0 ? splitSlotItems(trk.inserts) : ['ChromaGlow'];
                  const auxItems = splitSlotItems(trk.aux).length > 0 ? splitSlotItems(trk.aux) : ['Space Designer'];

                  return (
                    <div
                      key={idx}
                      data-track-idx={idx}
                      className={`logbook-desk-channel ${isSelected ? 'active-channel' : ''}`}
                      style={{ '--fam-accent': fam.color }}
                      onClick={() => handleSelectTrack(idx, false)}
                    >
                      {/* Channel Top Header */}
                      <div 
                        className="desk-ch-top clickable-slot" 
                        data-track-idx={idx}
                        data-section="channel"
                        style={{ borderTopColor: fam.color }}
                        title={`Click to select CH ${trk.trackNo || idx + 1} and view Section 3`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTrack(idx, true);
                        }}
                      >
                        <div className="desk-ch-top-num-row">
                          <span 
                            className="desk-ch-num"
                            title={`CH ${trk.trackNo || idx + 1}`}
                          >CH {trk.trackNo || idx + 1}</span>
                          <span className="desk-slot-click-hint" style={{ opacity: 0.85 }}>SECTION 3</span>
                        </div>
                        <strong 
                          className="desk-ch-stem" 
                          title={`Select ${trk.stem} for Section 3`}
                        >{trk.stem}</strong>
                        <span 
                          className="desk-ch-family-pill clickable-pill" 
                          data-track-idx={idx}
                          data-section="channel"
                          style={{ background: fam.bg, color: fam.color, borderColor: fam.border }}
                          title={`Family: ${fam.name}`}
                        >
                          {fam.name}
                        </span>
                      </div>

                      {/* Coloured Section 1: Capture Box */}
                      <div 
                        className="desk-ch-slot desk-capture-slot clickable-slot" 
                        data-track-idx={idx}
                        data-section="capture"
                        title={`Click to inspect Capture parameters for ${trk.stem}`}
                        onClick={(e) => handleOpenInspector(e, idx, 'capture', trk.capture)}
                      >
                        <div className="desk-slot-header-row">
                          <span className="desk-slot-label">CAPTURE</span>
                          <span className="desk-slot-click-hint">PARAMETERS</span>
                        </div>
                        <div className="desk-capture-content">
                          {renderCaptureGlyph(trk.capture)}
                          <span className="desk-capture-text">{trk.capture || 'Direct'}</span>
                        </div>
                      </div>

                      {/* Pan Rotary Knob */}
                      <div 
                        className="desk-ch-slot desk-pan-slot clickable-slot" 
                        data-track-idx={idx}
                        data-section="pan"
                        title={`Click to inspect Pan positioning for ${trk.stem}`}
                        onClick={(e) => handleOpenInspector(e, idx, 'pan', trk.pan || 'C')}
                      >
                        <div className="desk-slot-header-row">
                          <span className="desk-slot-label">PAN</span>
                          <span className="desk-slot-click-hint">AZIMUTH</span>
                        </div>
                        <div className="desk-pan-row">
                          <div className="desk-pan-knob" title={`Pan: ${trk.pan || 'C'}`}>
                            <div className="desk-pan-needle" style={{ transform: `rotate(${panRot}deg)` }}></div>
                          </div>
                          <span className="desk-pan-badge">{trk.pan || 'C'}</span>
                        </div>
                      </div>

                      {/* Coloured Section 2: Dynamics Slot */}
                      <div 
                        className="desk-ch-slot desk-fx-slot clickable-slot" 
                        data-track-idx={idx}
                        data-section="dynamics"
                        title={`Click to inspect Dynamics parameters for ${trk.stem}`}
                        onClick={(e) => handleOpenInspector(e, idx, 'dynamics', dynItems[0] || trk.dynamics)}
                      >
                        <div className="desk-slot-header-row">
                          <span className="desk-slot-label">DYNAMICS</span>
                          <span className="desk-slot-click-hint">PARAMETERS</span>
                        </div>
                        <div className="desk-slot-pills-wrap">
                          {dynItems.map((item, pIdx) => {
                            const pName = useThirdPartyPlugins ? get3rdPartyPluginName(item) : item;
                            return (
                              <span 
                                key={pIdx}
                                className="desk-fx-pill dyn-pill clickable-pill"
                                data-track-idx={idx}
                                data-section="dynamics"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenInspector(e, idx, 'dynamics', item);
                                }}
                                title={`Click to inspect parameters for ${pName}`}
                              >
                                {pName}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Coloured Section 3: EQ Slot */}
                      <div 
                        className="desk-ch-slot desk-fx-slot clickable-slot" 
                        data-track-idx={idx}
                        data-section="eq"
                        title={`Click to inspect EQ parameters for ${trk.stem}`}
                        onClick={(e) => handleOpenInspector(e, idx, 'eq', eqItems[0] || trk.eq)}
                      >
                        <div className="desk-slot-header-row">
                          <span className="desk-slot-label">EQ</span>
                          <span className="desk-slot-click-hint">PARAMETERS</span>
                        </div>
                        <div className="desk-slot-pills-wrap">
                          {eqItems.map((item, pIdx) => {
                            const pName = useThirdPartyPlugins ? get3rdPartyPluginName(item) : item;
                            return (
                              <span 
                                key={pIdx}
                                className="desk-fx-pill eq-pill clickable-pill"
                                data-track-idx={idx}
                                data-section="eq"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenInspector(e, idx, 'eq', item);
                                }}
                                title={`Click to inspect parameters for ${pName}`}
                              >
                                {pName}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Coloured Section 4: Inserts Slot */}
                      <div 
                        className="desk-ch-slot desk-fx-slot clickable-slot" 
                        data-track-idx={idx}
                        data-section="inserts"
                        title={`Click to inspect Insert parameters for ${trk.stem}`}
                        onClick={(e) => handleOpenInspector(e, idx, 'inserts', insItems[0] || trk.inserts)}
                      >
                        <div className="desk-slot-header-row">
                          <span className="desk-slot-label">INSERTS</span>
                          <span className="desk-slot-click-hint">PARAMETERS</span>
                        </div>
                        <div className="desk-slot-pills-wrap">
                          {insItems.map((item, pIdx) => {
                            const pName = useThirdPartyPlugins ? get3rdPartyPluginName(item) : item;
                            return (
                              <span 
                                key={pIdx}
                                className="desk-fx-pill ins-pill clickable-pill"
                                data-track-idx={idx}
                                data-section="inserts"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenInspector(e, idx, 'inserts', item);
                                }}
                                title={`Click to inspect parameters for ${pName}`}
                              >
                                {pName}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Coloured Section 5: Aux Sends Slot */}
                      <div 
                        className="desk-ch-slot desk-fx-slot clickable-slot" 
                        data-track-idx={idx}
                        data-section="aux"
                        title={`Click to inspect Aux parameters for ${trk.stem}`}
                        onClick={(e) => handleOpenInspector(e, idx, 'aux', auxItems[0] || trk.aux)}
                      >
                        <div className="desk-slot-header-row">
                          <span className="desk-slot-label">AUX SENDS</span>
                          <span className="desk-slot-click-hint">PARAMETERS</span>
                        </div>
                        <div className="desk-slot-pills-wrap">
                          {auxItems.map((item, pIdx) => {
                            const pName = useThirdPartyPlugins ? get3rdPartyPluginName(item) : item;
                            return (
                              <span 
                                key={pIdx}
                                className="desk-fx-pill aux-pill clickable-pill"
                                data-track-idx={idx}
                                data-section="aux"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenInspector(e, idx, 'aux', item);
                                }}
                                title={`Click to inspect parameters for ${pName}`}
                              >
                                {pName}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Vertical Console Fader */}
                      <div 
                        className="desk-fader-assembly clickable-slot"
                        data-track-idx={idx}
                        data-section="channel"
                        title={`Click to inspect CH ${trk.trackNo || idx + 1} fader level (${trk.fader || '0.0 dB'})`}
                        onClick={(e) => handleOpenInspector(e, idx, 'channel', trk.fader || '0.0 dB')}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="desk-fader-ticks">
                          <span>+6</span>
                          <span>0</span>
                          <span>-6</span>
                          <span>-12</span>
                          <span>-24</span>
                          <span>-∞</span>
                        </div>
                        <div className="desk-fader-track">
                          <div className="desk-fader-cap" style={{ top: `${thumbPos}%` }}>
                            <span className="desk-fader-cap-line"></span>
                          </div>
                        </div>
                        <div className="desk-fader-db-badge">
                          <span>{trk.fader || '0.0 dB'}</span>
                        </div>
                      </div>

                      {/* Inspect Button - Reveals Section 3 for this track */}
                      <button
                        type="button"
                        className={`desk-inspect-btn ${isSelected ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTrack(idx, true);
                        }}
                        title={`Reveal Section 3 detailed signal path & channel strip for ${trk.stem}`}
                      >
                        <Sliders size={12} />
                        <span>REVEAL STRIP</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Section 3: Signal Path, Capture Specification & Logic Pro Channel Strip Insert Chain */}
      <div ref={section3Ref} className="logbook-section-card glass-panel logbook-s3-container">
        <div className="logbook-sec-header">
          <div className="logbook-sec-title-wrap">
            <Sliders size={20} color="#A855F7" />
            <div>
              <h3 className="logbook-sec-title">Section 3: Detailed Signal Path &amp; {currentDaw} Channel Strip</h3>
              <p className="logbook-sec-subtitle">
                Each track on the track sheet reveals its authentic capture signal path, transducer specifications, and complete vertical channel strip insert chain
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span className="logbook-sec-pill">
              CH {activeTrack?.trackNo || activeInstIdx + 1} of {trackTable?.length || 0} Selected
            </span>
            <div className="sec4-cards-master-actions" style={{ margin: 0 }}>
              <button
                type="button"
                className="sec4-cards-expand-btn"
                onClick={() => handleExpandAllSec3Cards(true)}
                title="Expand all Section 3 modules for this track"
              >
                Expand All
              </button>
              <button
                type="button"
                className="sec4-cards-expand-btn"
                onClick={() => handleExpandAllSec3Cards(false)}
                title="Collapse all Section 3 modules for this track"
              >
                Collapse All
              </button>
            </div>
            <button
              type="button"
              className="sec4-copy-btn"
              onClick={handleCopyTrackSpec}
              title="Copy complete Section 3 track specification in Markdown"
            >
              {copiedSec3Key === 'all' || copiedSec3Key === 'track' ? (
                <>
                  <CheckCircle2 size={14} color="#10B981" />
                  <span style={{ color: '#10B981' }}>Copied Track Spec!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Track Spec</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Track Selector Tab Bar */}
        {trackTable && trackTable.length > 0 && (
          <div className="logbook-track-selector-bar">
            {trackTable.map((trk, idx) => {
              const isSelected = activeInstIdx === idx;
              const fam = getInstrumentFamily(trk.stem);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`logbook-track-pill ${isSelected ? 'active-track-pill' : ''}`}
                  style={{
                    '--pill-accent': fam.color,
                    '--pill-bg': fam.bg,
                    '--pill-border': fam.border
                  }}
                  onClick={() => handleSelectTrack(idx, false)}
                  title={`Select CH ${trk.trackNo || idx + 1}: ${trk.stem}`}
                >
                  <span className="pill-ch-num">CH {trk.trackNo || idx + 1}</span>
                  <span className="pill-stem-name">{trk.stem}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Track Banner */}
        {activeTrack && (
          <div className="logbook-s3-selected-banner">
            <div className="s3-banner-left">
              <span className="s3-banner-ch">CH {activeTrack.trackNo || activeInstIdx + 1}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h4 className="s3-banner-stem">{activeTrack.stem}</h4>
                  {(() => {
                    const fam = getInstrumentFamily(activeTrack.stem);
                    return (
                      <span 
                        className="comp-fam-badge" 
                        style={{ background: fam.bg, color: fam.color, borderColor: fam.border }}
                      >
                        {fam.name}
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>

            <div className="s3-banner-metrics">
              <div className="s3-metric-chip" title="Capture Method">
                {renderCaptureGlyph(activeTrack.capture)}
                <span>{activeTrack.capture || 'Direct'}</span>
              </div>
              <div className="s3-metric-chip" title="Fader Level">
                <Sliders size={12} color="#38BDF8" />
                <span>{activeTrack.fader || '0.0 dB'}</span>
              </div>
              <div className="s3-metric-chip" title="Pan Position">
                <Disc size={12} color="#F59E0B" />
                <span>{activeTrack.pan || 'Center'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Selected Track Detailed Hub */}
        {activeInstrument ? (
          renderSection3Details(activeInstrument, activeTrack, 'all')
        ) : (
          <div className="logbook-empty-state" style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8' }}>
            <p>Select a track from the mixing desk above to inspect its signal path and channel strip.</p>
          </div>
        )}
      </div>

      {/* 4. Studio Track & Plug-In Inspector (Anchored directly over clicked item by default) */}
      {inspectorOpen && (() => {
        const trk = trackTable && trackTable[inspectorFocus.trackIdx] 
          ? trackTable[inspectorFocus.trackIdx] 
          : (trackTable[activeInstIdx] || trackTable[0]);
        if (!trk) return null;

        const inst = findMatchingInstrument(trk.stem, inspectorFocus.trackIdx);

        const popoverData = getConcisePopoverData(
          trk,
          inst,
          inspectorFocus.sectionType,
          inspectorFocus.itemName,
          useThirdPartyPlugins,
          currentDaw
        );

        const fam = getInstrumentFamily(trk.stem);

        const slotTabs = [
          { key: 'channel', label: 'Overview', icon: Disc, tabClass: 'tab-channel' },
          { key: 'capture', label: 'Capture', icon: Mic2, tabClass: 'tab-capture' },
          { key: 'dynamics', label: 'Dynamics', icon: Sliders, tabClass: 'tab-dynamics' },
          { key: 'eq', label: 'EQ', icon: Activity, tabClass: 'tab-eq' },
          { key: 'inserts', label: 'Inserts', icon: Zap, tabClass: 'tab-inserts' },
          { key: 'aux', label: 'Aux Sends', icon: Layers, tabClass: 'tab-aux' },
        ];

        // Positioning logic - Pop-up box positioned in the middle of the screen pointing to the relevant plugin
        const POPOVER_WIDTH = Math.min(460, window.innerWidth - 24);
        const rect = targetRect;

        const popoverLeft = Math.max(12, (window.innerWidth - POPOVER_WIDTH) / 2);
        const popoverRight = popoverLeft + POPOVER_WIDTH;
        const popoverTop = Math.min(115, Math.max(70, Math.round(window.innerHeight * 0.11)));
        const popoverHeight = Math.min(640, Math.round(window.innerHeight * 0.84));
        const popoverBottom = popoverTop + popoverHeight;

        let rootStyle = {};

        if (inspectorMode === 'anchored') {
          rootStyle = {
            position: 'fixed',
            zIndex: 10000,
            top: `${popoverTop}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${POPOVER_WIDTH}px`,
            maxHeight: `${popoverHeight}px`,
            display: 'flex',
            flexDirection: 'column'
          };
        } else if (inspectorMode === 'docked') {
          rootStyle = {
            position: 'fixed',
            zIndex: 9998,
            top: '80px',
            right: window.innerWidth < 640 ? '12px' : '24px',
            left: window.innerWidth < 640 ? '12px' : 'auto',
            width: window.innerWidth < 640 ? 'auto' : '440px',
            maxHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column'
          };
        }

        // Calculate laser pointer geometry from centered pop-up box to relevant clicked plugin
        let svgPathData = '';
        let svgMarker = '';
        let beaconX = 0;
        let beaconY = 0;
        let anchorX = 0;
        let anchorY = 0;

        if (rect && inspectorMode === 'anchored') {
          const tCenterX = rect.centerX || (rect.left + rect.width / 2);
          const tCenterY = rect.centerY || (rect.top + rect.height / 2);

          if (tCenterX < popoverLeft) {
            // Target plugin is to the LEFT of the pop-up box (e.g. CH 1, 2, 3)
            anchorX = popoverLeft;
            anchorY = Math.min(popoverBottom - 45, Math.max(popoverTop + 45, tCenterY));
            beaconX = rect.right + 6;
            beaconY = tCenterY;
            const midX = (anchorX + beaconX) / 2;
            svgPathData = `M ${anchorX} ${anchorY} C ${midX} ${anchorY}, ${midX} ${beaconY}, ${beaconX} ${beaconY}`;
            svgMarker = 'url(#arrowHeadLeft)';
          } else if (tCenterX > popoverRight) {
            // Target plugin is to the RIGHT of the pop-up box (e.g. CH 7, 8, 9)
            anchorX = popoverRight;
            anchorY = Math.min(popoverBottom - 45, Math.max(popoverTop + 45, tCenterY));
            beaconX = rect.left - 6;
            beaconY = tCenterY;
            const midX = (anchorX + beaconX) / 2;
            svgPathData = `M ${anchorX} ${anchorY} C ${midX} ${anchorY}, ${midX} ${beaconY}, ${beaconX} ${beaconY}`;
            svgMarker = 'url(#arrowHeadRight)';
          } else if (tCenterY > popoverBottom) {
            // Target plugin is BELOW the pop-up box
            anchorX = tCenterX;
            anchorY = popoverBottom;
            beaconX = tCenterX;
            beaconY = rect.top - 6;
            svgPathData = `M ${anchorX} ${anchorY} L ${beaconX} ${beaconY}`;
            svgMarker = 'url(#arrowHeadDown)';
          } else {
            // Target plugin is ABOVE the pop-up box
            anchorX = tCenterX;
            anchorY = popoverTop;
            beaconX = tCenterX;
            beaconY = rect.bottom + 6;
            svgPathData = `M ${anchorX} ${anchorY} L ${beaconX} ${beaconY}`;
            svgMarker = 'url(#arrowHeadUp)';
          }
        }

        const inspectorNode = (
          <>
            {/* SVG Connecting Laser Pointer to the Relevant Plugin */}
            {inspectorMode === 'anchored' && rect && svgPathData && (
              <svg 
                className="inspector-pointer-canvas"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  pointerEvents: 'none',
                  zIndex: 9999
                }}
              >
                <defs>
                  <filter id="laserGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <marker id="arrowHeadLeft" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">
                    <polygon points="8,1 1,4 8,7" fill="#C084FC" />
                  </marker>
                  <marker id="arrowHeadRight" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0,1 7,4 0,7" fill="#C084FC" />
                  </marker>
                  <marker id="arrowHeadDown" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
                    <polygon points="1,0 4,7 7,0" fill="#C084FC" />
                  </marker>
                  <marker id="arrowHeadUp" markerWidth="8" markerHeight="8" refX="4" refY="2" orient="auto">
                    <polygon points="1,8 4,1 7,8" fill="#C084FC" />
                  </marker>
                </defs>
                {/* Connecting laser line */}
                <path
                  d={svgPathData}
                  fill="none"
                  stroke="#C084FC"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  filter="url(#laserGlow)"
                  markerEnd={svgMarker}
                  className="inspector-laser-path"
                />
                {/* Target beacon dot on the clicked plugin */}
                <circle
                  cx={beaconX}
                  cy={beaconY}
                  r="4"
                  fill="#38BDF8"
                  stroke="#FFF"
                  strokeWidth="1.5"
                  filter="url(#laserGlow)"
                />
                {/* Anchor dot on pop-up box edge */}
                <circle
                  cx={anchorX}
                  cy={anchorY}
                  r="3.5"
                  fill="#C084FC"
                  stroke="#FFF"
                  strokeWidth="1"
                />
              </svg>
            )}

            <div 
              className={`tracksheet-inspector-root ${
                inspectorMode === 'anchored' ? 'anchored-mode' :
                inspectorMode === 'docked' ? 'docked-mode' : 'modal-mode'
              }`}
              style={rootStyle}
            >
              {inspectorMode === 'modal' && (
                <div 
                  className="tracksheet-inspector-backdrop" 
                  onClick={handleSnapToSlot} 
                  title="Click backdrop to return over slot"
                />
              )}

              <div 
                className="tracksheet-inspector-container glass-panel" 
                onClick={(e) => e.stopPropagation()}
              >
              {/* Header */}
              <div className="inspector-header">
                <div className="inspector-title-group">
                  <span
                    className="inspector-ch-badge"
                    style={{
                      backgroundColor: fam.bg,
                      color: fam.color,
                      borderColor: fam.border
                    }}
                  >
                    CH {trk.trackNo || inspectorFocus.trackIdx + 1}
                  </span>
                  <div className="inspector-track-info">
                    <h4 className="inspector-track-stem">
                      {trk.stem || inst?.name || 'Channel Strip'}
                    </h4>
                    <div className="inspector-sub-tags">
                      <span>{currentDaw}</span>
                      {popoverData?.badge && <span>• {popoverData.badge}</span>}
                    </div>
                  </div>
                </div>

                <div className="inspector-controls">
                  {/* Stock vs 3rd-Party Toggle */}
                  <button
                    type="button"
                    className={`inspector-btn-pill ${useThirdPartyPlugins ? 'active-tp' : ''}`}
                    onClick={() => setUseThirdPartyPlugins(!useThirdPartyPlugins)}
                    title="Toggle between DAW Stock and 3rd-Party Pro equivalents"
                  >
                    <Zap size={12} />
                    <span>{useThirdPartyPlugins ? '3rd-Party' : 'Stock'}</span>
                  </button>

                  {/* Mode Controls */}
                  {inspectorMode === 'anchored' ? (
                    <>
                      <button
                        type="button"
                        className="inspector-btn-icon"
                        onClick={handleDockToSide}
                        title="Dock to Right Side of Screen (keeps mixing desk completely clear)"
                      >
                        <ArrowDownToLine size={13} />
                      </button>
                      <button
                        type="button"
                        className="inspector-btn-icon"
                        onClick={handleExpandToCenter}
                        title="Enlarge in Center Modal"
                      >
                        <Maximize2 size={13} />
                      </button>
                    </>
                  ) : inspectorMode === 'docked' ? (
                    <>
                      <button
                        type="button"
                        className="inspector-btn-icon"
                        onClick={handleSnapToSlot}
                        title="Snap back directly over clicked plug-in"
                      >
                        <Minimize2 size={13} />
                      </button>
                      <button
                        type="button"
                        className="inspector-btn-icon"
                        onClick={handleExpandToCenter}
                        title="Enlarge in Center Modal"
                      >
                        <Maximize2 size={13} />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="inspector-btn-icon"
                      onClick={handleSnapToSlot}
                      title="Return directly over clicked plug-in"
                    >
                      <Minimize2 size={13} />
                    </button>
                  )}

                  {/* Close Inspector */}
                  <button
                    type="button"
                    className="inspector-btn-icon close-btn"
                    onClick={handleCloseInspector}
                    title="Close Inspector (Esc)"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Channel Slot Switcher Tabs */}
              <div className="inspector-slot-tabs">
                {slotTabs.map((slot) => {
                  const SlotIcon = slot.icon;
                  const isActive = inspectorFocus.sectionType === slot.key;
                  return (
                    <button
                      key={slot.key}
                      type="button"
                      className={`inspector-slot-tab ${slot.tabClass} ${isActive ? 'active-tab' : ''}`}
                      onClick={() => setInspectorFocus(prev => ({ ...prev, sectionType: slot.key, itemName: '' }))}
                    >
                      <SlotIcon size={12} />
                      <span>{slot.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pointing to Relevant Plugin Live Indicator */}
              <div className="inspector-pointing-pill-row">
                <div className="inspector-pointing-pill">
                  <span className="pointing-live-radar"></span>
                  <span>POINTING TO: CH {trk.trackNo || inspectorFocus.trackIdx + 1} ({trk.stem}) • {inspectorFocus.itemName || inspectorFocus.sectionType.toUpperCase()}</span>
                </div>
              </div>

              {/* Inspector Scrollable Body */}
              <div className="inspector-body">
                {inspectorDetailLevel === 'concise' ? (
                  <div className="inspector-concise-box">
                    {/* Item Title & Alternate Header */}
                    <div className="inspector-item-title-row">
                      <h5 className="inspector-item-name">{popoverData?.title || trk.stem}</h5>
                      {popoverData?.altName && (
                        <span className="inspector-alt-badge">
                          {useThirdPartyPlugins ? 'Stock DAW' : '3rd-Party Pro'}: {popoverData.altName}
                        </span>
                      )}
                    </div>

                    {/* 1. What It Is */}
                    <div className="inspector-pillar-block">
                      <span className="inspector-pillar-label">1. WHAT IT IS</span>
                      <p className="inspector-pillar-text">{popoverData?.whatItIs || `${currentDaw} Audio Channel Processing`}</p>
                    </div>

                    {/* 2. Parameters & Dialled Settings */}
                    <div className="inspector-pillar-block">
                      <span className="inspector-pillar-label">2. PARAMETERS & DIALLED SETTINGS</span>
                      <div className="desk-popover-badges-wrap">
                        {renderConciseParamBadges(popoverData?.parameters)}
                      </div>
                    </div>

                    {/* 3. What I'm Using It For */}
                    <div className="inspector-pillar-block">
                      <span className="inspector-pillar-label">3. WHAT I'M USING IT FOR</span>
                      <p className="inspector-pillar-objective">{popoverData?.objective || 'Mix enhancement and balance.'}</p>
                    </div>

                    {/* Toggle to Full Channel Strip Details */}
                    <div style={{ marginTop: '0.35rem', textAlign: 'center' }}>
                      <button
                        type="button"
                        className="inspector-mode-toggle-link"
                        onClick={() => setInspectorDetailLevel('full')}
                      >
                        <span>View Full Channel Strip & Transducer Specification</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="inspector-full-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.35rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C084FC', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        Full Mark Scheme & Transducer Specification
                      </span>
                      <button
                        type="button"
                        className="inspector-mode-toggle-link"
                        onClick={() => setInspectorDetailLevel('concise')}
                      >
                        <ChevronLeft size={12} />
                        <span>Back to 3-Pillar View</span>
                      </button>
                    </div>
                    {inst && renderSection3Details(inst, trk, inspectorFocus.sectionType === 'channel' ? 'all' : inspectorFocus.sectionType)}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="inspector-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="inspector-nav-btn"
                    onClick={handlePrevTrack}
                    title="Previous Channel"
                  >
                    <ChevronLeft size={13} /> Prev
                  </button>
                  <span className="inspector-nav-counter">
                    CH {inspectorFocus.trackIdx + 1} / {trackTable.length}
                  </span>
                  <button
                    type="button"
                    className="inspector-nav-btn"
                    onClick={handleNextTrack}
                    title="Next Channel"
                  >
                    Next <ChevronRight size={13} />
                  </button>
                </div>

                {inspectorMode === 'anchored' ? (
                  <button
                    type="button"
                    className="inspector-mode-toggle-link"
                    onClick={handleDockToSide}
                    title="Dock to Right Side of Screen"
                  >
                    <ArrowDownToLine size={12} />
                    <span>Dock to Side</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inspector-mode-toggle-link"
                    onClick={handleSnapToSlot}
                    title="Snap directly over clicked plug-in"
                  >
                    <Minimize2 size={12} />
                    <span>Snap Over Plug-in</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      );

      return typeof document !== 'undefined' ? createPortal(inspectorNode, document.body) : null;
    })()}


      {/* 5. Section 4: Mix Strategy — EQ, Dynamics, Spatial Depth & Automation */}
      {mixStrategy && (
        <div className={`logbook-section-card glass-panel logbook-mixdown-card density-${sec4Density}`}>
          <div className="logbook-sec-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div className="logbook-sec-title-wrap">
              <Cpu size={20} color="#34D399" />
              <div>
                <h3 className="logbook-sec-title">Section 4: Mix Strategy — EQ, Dynamics, Spatial Depth &amp; Automation</h3>
                <p className="logbook-sec-subtitle">
                  Creative engineering strategies for spectral balance, dynamic control, spatial depth, and mix automation passes
                </p>
              </div>
            </div>

            <div className="logbook-sec4-toolbar-actions">
              {/* Segmented View Mode Switcher */}
              <div className="sec4-mode-switcher" role="tablist" aria-label="Section 4 Layout View">
                <button
                  type="button"
                  className={`sec4-mode-btn ${sec4ViewMode === 'cards' ? 'active' : ''}`}
                  onClick={() => setSec4ViewMode('cards')}
                  aria-selected={sec4ViewMode === 'cards'}
                  role="tab"
                  title="Modular Cards: Collapsible multi-column cards"
                >
                  <LayoutGrid size={14} />
                  <span>Modular Cards</span>
                </button>
                <button
                  type="button"
                  className={`sec4-mode-btn ${sec4ViewMode === 'tabs' ? 'active' : ''}`}
                  onClick={() => setSec4ViewMode('tabs')}
                  aria-selected={sec4ViewMode === 'tabs'}
                  role="tab"
                  title="Workflow Walkthrough: Step-by-step console stages"
                >
                  <Layers size={14} />
                  <span>Workflow Tabs</span>
                </button>
              </div>

              {/* Density Toggle */}
              <div className="sec4-density-toggle" title="Toggle reading text density">
                <button
                  type="button"
                  className={`sec4-density-btn ${sec4Density === 'comfortable' ? 'active' : ''}`}
                  onClick={() => setSec4Density('comfortable')}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  className={`sec4-density-btn ${sec4Density === 'compact' ? 'active' : ''}`}
                  onClick={() => setSec4Density('compact')}
                >
                  Compact
                </button>
              </div>

              {/* Copy Full Strategy Button */}
              <button
                type="button"
                className="sec4-copy-btn"
                onClick={handleCopyAllSec4}
                title="Copy complete Section 4 strategy in Markdown"
              >
                {copiedSec4Idx === 'all' ? (
                  <>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span style={{ color: '#10B981' }}>Copied Strategy!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Mix Strategy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {mixStrategy?.philosophy && (
            <div className="logbook-philosophy-accordion">
              <div 
                className="logbook-philosophy-header"
                role="button"
                tabIndex={0}
                aria-expanded={expandedPhilosophy}
                onClick={() => setExpandedPhilosophy(prev => !prev)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedPhilosophy(prev => !prev); } }}
                title="Click to toggle Mixdown Engineering Approach"
              >
                <div className="logbook-phil-header-left">
                  <Sliders size={16} color="#38BDF8" />
                  <strong>Mixdown Engineering Approach &amp; Staging Methodology</strong>
                </div>
                <div className="logbook-phil-header-right">
                  <span className="logbook-phil-toggle-text">{expandedPhilosophy ? 'Collapse' : 'Expand Approach'}</span>
                  {expandedPhilosophy ? <ChevronUp size={16} color="#38BDF8" /> : <ChevronDown size={16} color="#38BDF8" />}
                </div>
              </div>
              {expandedPhilosophy && (
                <div className="logbook-philosophy-body">
                  <p className="logbook-phil-text">{mixStrategy.philosophy.replace(/^---\s*$/gm, '').trim()}</p>
                </div>
              )}
            </div>
          )}

          {/* MODE 1: WORKFLOW TABS */}
          {sec4ViewMode === 'tabs' && (
            <div className="sec4-tabs-view">
              {/* Stepper Tabs Bar */}
              <div className="sec4-stepper-bar" role="tablist" aria-label="Mixdown Workflow Stages">
                {sec4Pillars.map((p, idx) => {
                  const PIcon = p.icon;
                  const isActive = activeSec4Tab === idx;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`sec4-step-tab ${isActive ? 'active' : ''}`}
                      style={{ '--pillar-color': p.color }}
                      onClick={() => setActiveSec4Tab(idx)}
                    >
                      <span className="sec4-step-badge">Stage 0{idx + 1}</span>
                      <div className="sec4-step-main">
                        <PIcon size={15} color={isActive ? p.color : '#94A3B8'} />
                        <span className="sec4-step-title">{p.shortTitle}</span>
                      </div>
                      <span className="sec4-step-tag">{p.tag}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Panel */}
              {(() => {
                const currentPillar = sec4Pillars[activeSec4Tab] || sec4Pillars[0];
                if (!currentPillar) return null;
                const PIcon = currentPillar.icon;

                return (
                  <div className="sec4-stage-panel" style={{ borderColor: `${currentPillar.color}35` }}>
                    {/* Stage Header */}
                    <div className="sec4-stage-header">
                      <div className="sec4-stage-header-left">
                        <div className="sec4-stage-icon" style={{ background: `${currentPillar.color}20`, borderColor: `${currentPillar.color}50` }}>
                          <PIcon size={18} color={currentPillar.color} />
                        </div>
                        <div>
                          <h4 className="sec4-stage-title" style={{ color: '#F8FAFC' }}>{currentPillar.title}</h4>
                          <span className="sec4-stage-category" style={{ color: currentPillar.color, background: `${currentPillar.color}15`, borderColor: `${currentPillar.color}35` }}>
                            {currentPillar.tag}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="sec4-stage-copy-btn"
                        onClick={() => handleCopySec4Pillar(currentPillar, activeSec4Tab)}
                        title="Copy this stage's strategy"
                      >
                        {copiedSec4Idx === activeSec4Tab ? (
                          <>
                            <CheckCircle2 size={13} color="#10B981" />
                            <span style={{ color: '#10B981' }}>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Stage</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Content Area */}
                    <div className="sec4-stage-body">
                      {currentPillar.type === 'masterBus' ? (
                        renderMasterBusModule(true)
                      ) : (
                        renderMixCardContent(currentPillar.content, currentPillar.color)
                      )}
                    </div>

                    {/* Stepper Navigation Footer */}
                    <div className="sec4-stage-footer">
                      <button
                        type="button"
                        className="sec4-nav-btn prev"
                        disabled={activeSec4Tab === 0}
                        onClick={() => setActiveSec4Tab(prev => Math.max(0, prev - 1))}
                      >
                        <ChevronLeft size={16} />
                        <span>Previous Stage</span>
                      </button>

                      <div className="sec4-stage-indicator">
                        Stage {activeSec4Tab + 1} of {sec4Pillars.length}
                      </div>

                      <button
                        type="button"
                        className="sec4-nav-btn next"
                        disabled={activeSec4Tab === sec4Pillars.length - 1}
                        onClick={() => setActiveSec4Tab(prev => Math.min(sec4Pillars.length - 1, prev + 1))}
                      >
                        <span>Next Stage</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* MODE 2: MODULAR CARDS */}
          {sec4ViewMode === 'cards' && (
            <div className="sec4-cards-view">
              <div className="sec4-cards-master-bar">
                <div className="sec4-cards-count-info">
                  Showing <strong>{sec4Pillars.length}</strong> modular mixdown strategy cards (click any card to expand)
                </div>
                <div className="sec4-cards-master-actions">
                  <button
                    type="button"
                    className="sec4-cards-expand-btn"
                    onClick={() => handleExpandAllSec4Cards(true)}
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    className="sec4-cards-expand-btn"
                    onClick={() => handleExpandAllSec4Cards(false)}
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              <div className="sec4-accordion-list">
                {sec4Pillars.map((pillar, idx) => {
                  const PIcon = pillar.icon;
                  const isExpanded = Boolean(expandedSec4Cards[pillar.id]);

                  return (
                    <div 
                      key={pillar.id} 
                      className={`sec4-accordion-card ${isExpanded ? 'open' : 'collapsed'}`}
                      style={{ borderColor: isExpanded ? `${pillar.color}45` : 'rgba(255, 255, 255, 0.08)' }}
                    >
                      {/* Clickable Header */}
                      <div
                        className="sec4-accordion-header"
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        onClick={() => handleToggleSec4Card(pillar.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggleSec4Card(pillar.id);
                          }
                        }}
                      >
                        <div className="sec4-accordion-header-left">
                          <div className="sec4-accordion-icon" style={{ background: `${pillar.color}20`, borderColor: `${pillar.color}50` }}>
                            <PIcon size={16} color={pillar.color} />
                          </div>
                          <div className="sec4-accordion-title-wrap">
                            <span className="sec4-accordion-title">{pillar.title}</span>
                            <span className="sec4-accordion-tag" style={{ color: pillar.color, background: `${pillar.color}15`, borderColor: `${pillar.color}35` }}>
                              {pillar.tag}
                            </span>
                          </div>
                        </div>

                        <div className="sec4-accordion-header-right">
                          <button
                            type="button"
                            className="sec4-accordion-copy-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopySec4Pillar(pillar, idx);
                            }}
                            title="Copy this section"
                          >
                            {copiedSec4Idx === idx ? <CheckCircle2 size={13} color="#10B981" /> : <Copy size={13} />}
                          </button>
                          <div className="sec4-accordion-chevron">
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </div>
                      </div>

                      {/* Drawer Body */}
                      {isExpanded && (
                        <div className="sec4-accordion-body">
                          {pillar.type === 'masterBus' ? (
                            renderMasterBusModule(false)
                          ) : (
                            renderMixCardContent(pillar.content, pillar.color)
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* 6. Section 5: Master Bus Processing Chain & Metering Architecture */}
      {masterBus && (
        <div className="logbook-section-card glass-panel logbook-masterbus-section" style={{ marginTop: '2rem' }}>
          <div className="logbook-sec-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div className="logbook-sec-title-wrap">
              <Gauge size={20} color="#F59E0B" />
              <div>
                <h3 className="logbook-sec-title">Section 5: Master Bus Processing Chain &amp; Metering Architecture ({currentDaw})</h3>
                <p className="logbook-sec-subtitle">
                  Dedicated stereo 2-bus hardware rack signal flow, dynamic headroom targets, and final pre-mastering bus conditioning
                </p>
              </div>
            </div>

            <div className="logbook-sec4-toolbar-actions">
              <button
                type="button"
                className="sec4-copy-btn"
                onClick={handleCopyMasterBus}
                title="Copy complete Section 5 Master Bus specification in Markdown"
              >
                {copiedMasterBus ? (
                  <>
                    <CheckCircle2 size={14} color="#10B981" />
                    <span style={{ color: '#10B981' }}>Copied Master Bus!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Master Bus</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="logbook-masterbus-body" style={{ marginTop: '1.25rem' }}>
            {renderMasterBusModule(true)}
          </div>
        </div>
      )}
    </div>
  );
}
