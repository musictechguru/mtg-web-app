import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckSquare, Square, ChevronDown, ChevronUp,
  Copy, Check, RotateCcw, ArrowLeft, Disc, Music, User
} from 'lucide-react';
import {
  C1_OVERVIEW_SPECS,
  C1_MARK_SCHEME_DETAILED,
  C1_TECHNIQUES_BANK,
  C1_WORKFLOW_PHASES,
  C1_MASTER_CHECKLIST
} from './component1ChecklistData';
import StudentMarkSchemeModal from '../StudentMarkSchemeModal';
import PremiumLocked from '../PremiumLocked';
import { useUser } from '../../contexts/UserContext';

const C1_STORAGE_KEY = 'mtg_component1_checklist_v3';

export const PRESCRIBED_SONG_SUGGESTIONS = [
  { track: 'Superstition', artist: 'Stevie Wonder' },
  { track: 'Black Dog', artist: 'Led Zeppelin' },
  { track: 'Dreams', artist: 'Fleetwood Mac' },
  { track: 'Fame', artist: 'David Bowie' },
  { track: 'Rosanna', artist: 'Toto' },
  { track: 'Good Times', artist: 'Chic' },
  { track: 'Sir Duke', artist: 'Stevie Wonder' },
  { track: 'Roxanne', artist: 'The Police' },
  { track: 'Billie Jean', artist: 'Michael Jackson' },
  { track: 'More Than a Feeling', artist: 'Boston' },
  { track: "Don't You Worry 'Bout a Thing", artist: 'Stevie Wonder' }
];

const DEFAULT_CHANNEL_PLAN = [
  { ch: 1, source: 'Kick Drum', category: '🥁 Drum Kit', mic: 'AKG D112 (Dynamic)', placement: 'Inside porthole, 8 cm from beater @ 30°' },
  { ch: 2, source: 'Snare Top', category: '🥁 Drum Kit', mic: 'Shure SM57 (Dynamic)', placement: '4 cm above rim @ 45°, null to Hi-Hat' },
  { ch: 3, source: 'Overhead Top (Glyn Johns)', category: '🥁 Drum Kit', mic: 'Rode NT5 / AKG C414', placement: '105 cm directly above snare center' },
  { ch: 4, source: 'Overhead Side (Glyn Johns)', category: '🥁 Drum Kit', mic: 'Rode NT5 / AKG C414', placement: '105 cm equidistant over floor tom rim' },
  { ch: 5, source: 'Lead Vocal', category: '🎤 Vocals', mic: 'AKG C414 / Rode NT1 (LDC)', placement: '18 cm distance + Pop Shield (7 cm) + Reflection Filter' },
  { ch: 6, source: 'Backing Vocal L', category: '🎤 Vocals', mic: 'Rode NT1 / Shure SM7B', placement: '28 cm distance (Panned L35)' },
  { ch: 7, source: 'Backing Vocal R (Double)', category: '🎤 Vocals', mic: 'Rode NT1 / Shure SM7B', placement: '28 cm distance (Panned R35)' },
  { ch: 8, source: 'Bass Guitar', category: '🎸 Other Inst', mic: 'Radial J48 Active DI + SVT Sim', placement: 'Pathway 2 Clean DI + Ampeg SVT blend' },
  { ch: 9, source: 'Acoustic Guitar', category: '🎸 Other Inst', mic: 'Rode NT5 (Cardioid SDC)', placement: '18 cm from 12th fret angled to bridge' },
  { ch: 10, source: 'Electric Guitar L', category: '🎸 Other Inst', mic: 'DI + Logic Amp Designer (or SM57)', placement: 'British AC30 / Virtual Ribbon 121 @ cone edge (L55)' },
  { ch: 11, source: 'Electric Guitar R (Double)', category: '🎸 Other Inst', mic: 'DI + Logic Amp Designer (or SM57)', placement: 'Fender Twin / Virtual SM57 @ dust-cap edge (R55)' },
  { ch: 12, source: 'Keys / B3 / Rhodes / Mellotron', category: '🎹 Pathway 3 MIDI', mic: 'USB MIDI (CC64 Sustain + CC1 Leslie)', placement: 'Vintage B3, Rhodes EP, Mellotron & Retro Synth' }
];

const INITIAL_STATE = {
  studentName: '',
  candidateNumber: '',
  chosenSong: '',
  originalArtist: '',
  ensembleType: 'Preferred 4-Mic Glyn Johns Drums + DI Amp Sim Guitars + MIDI Keys/Synths + Separated Vocals',
  checkedMarkScheme: {},
  checkedTasks: {},
  checkedTechniques: {},
  techniqueNotes: {},
  checkedPreflight: {},
  channelPlan: DEFAULT_CHANNEL_PLAN
};

export default function Component1ChecklistPanel({
  activeTrackName = '',
  activeArtistName = '',
  activeDaw = 'Logic Pro',
  standalone = false,
  onBack = null,
  onSwitchToTracksheet = null
}) {
  const { userProgress, saveComponent1Progress, currentUser } = useUser() || {};

  const [activeSubTab, setActiveSubTab] = useState('markscheme'); // 'markscheme' | 'drums' | 'vocals' | 'other_instruments' | 'mixing_mastering' | 'workflow'
  const [techFilter, setTechFilter] = useState('All');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showMarkSchemeModal, setShowMarkSchemeModal] = useState(false);

  // Collapsible accordion state — concise & collapsed by default so there is zero clutter
  const [expandedGrids, setExpandedGrids] = useState({ AG1A: true, AG1B: true });
  const [expandedGridBands, setExpandedGridBands] = useState({});
  const [expandedTechs, setExpandedTechs] = useState({});
  const [expandedTechNotes, setExpandedTechNotes] = useState({});
  const [expandedPhases, setExpandedPhases] = useState({ c1_phase_1: true });
  const [showChannelTable, setShowChannelTable] = useState(false);
  const [showPreflight, setShowPreflight] = useState(true);

  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(C1_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          channelPlan: Array.isArray(parsed.channelPlan) && parsed.channelPlan.length > 0
            ? parsed.channelPlan
            : DEFAULT_CHANNEL_PLAN
        };
      }
    } catch (e) {
      console.error('Failed to load Component 1 checklist state:', e);
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(C1_STORAGE_KEY, JSON.stringify(state));
      if (saveComponent1Progress) {
        saveComponent1Progress({
          ...state,
          sessionInfo: {
            prescribedTrack: state.chosenSong,
            artist: state.originalArtist,
            daw: activeDaw || 'Logic Pro'
          },
          checkedItems: {
            ...(state.checkedMarkScheme || {}),
            ...(state.checkedTasks || {}),
            ...(state.checkedPreflight || {})
          },
          completedTechniques: state.checkedTechniques || {},
          micLogRows: (state.channelPlan || []).map(ch => ({
            stem: ch.source,
            micModel: ch.mic,
            placement: ch.placement,
            category: ch.category
          }))
        });
      }
    } catch (e) {
      console.error('Failed to save Component 1 checklist state:', e);
    }
  }, [state, saveComponent1Progress, activeDaw]);

  // Auto-sync track name & artist from parent props if local state hasn't set one yet
  useEffect(() => {
    if (activeTrackName && !state.chosenSong) {
      setState(prev => ({
        ...prev,
        chosenSong: activeTrackName,
        originalArtist: activeArtistName || prev.originalArtist
      }));
    }
  }, [activeTrackName, activeArtistName]);

  const syncWithActiveTrack = () => {
    if (!activeTrackName) return;
    setState(prev => ({
      ...prev,
      chosenSong: activeTrackName || prev.chosenSong,
      originalArtist: activeArtistName || prev.originalArtist
    }));
  };

  const updateField = (field, value) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const updateSongField = (songName) => {
    setState(prev => {
      const match = PRESCRIBED_SONG_SUGGESTIONS.find(s => s.track.toLowerCase() === songName.trim().toLowerCase());
      return {
        ...prev,
        chosenSong: songName,
        originalArtist: (!prev.originalArtist && match) ? match.artist : prev.originalArtist
      };
    });
  };

  const toggleCheck = (group, id) => {
    setState(prev => ({
      ...prev,
      [group]: {
        ...(prev[group] || {}),
        [id]: !prev[group]?.[id]
      }
    }));
  };

  const updateTechniqueNote = (id, text) => {
    setState(prev => ({
      ...prev,
      techniqueNotes: {
        ...prev.techniqueNotes,
        [id]: text
      }
    }));
  };

  const updateChannelRow = (idx, field, value) => {
    setState(prev => {
      const updated = [...prev.channelPlan];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, channelPlan: updated };
    });
  };

  const handleReset = () => {
    if (window.confirm('Reset all Component 1 tick lists and notes? This cannot be undone.')) {
      setState(INITIAL_STATE);
      localStorage.removeItem(C1_STORAGE_KEY);
    }
  };

  // Progress calculations
  const totalMarkSchemeChecks = useMemo(
    () => C1_MARK_SCHEME_DETAILED.reduce((acc, g) => acc + g.elementsChecklist.length, 0),
    []
  );
  const completedMarkSchemeChecks = useMemo(
    () => Object.values(state.checkedMarkScheme || {}).filter(Boolean).length,
    [state.checkedMarkScheme]
  );

  const totalPhaseTasks = useMemo(
    () => C1_WORKFLOW_PHASES.reduce((acc, p) => acc + p.tasks.length, 0),
    []
  );
  const completedPhaseTasks = useMemo(
    () => Object.values(state.checkedTasks || {}).filter(Boolean).length,
    [state.checkedTasks]
  );

  const totalTechniques = C1_TECHNIQUES_BANK.length;
  const completedTechniques = useMemo(
    () => Object.values(state.checkedTechniques || {}).filter(Boolean).length,
    [state.checkedTechniques]
  );

  const totalPreflight = C1_MASTER_CHECKLIST.length;
  const completedPreflight = useMemo(
    () => Object.values(state.checkedPreflight || {}).filter(Boolean).length,
    [state.checkedPreflight]
  );

  const overallPercent = useMemo(() => {
    const total = totalMarkSchemeChecks + totalPhaseTasks + totalTechniques + totalPreflight;
    const done = completedMarkSchemeChecks + completedPhaseTasks + completedTechniques + completedPreflight;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }, [
    totalMarkSchemeChecks, completedMarkSchemeChecks,
    totalPhaseTasks, completedPhaseTasks,
    totalTechniques, completedTechniques,
    totalPreflight, completedPreflight
  ]);

  const isSchoolOption = (t) =>
    String(t.number).includes('Preferred') ||
    t.categoryLabel.includes('Preferred') ||
    String(t.number).includes('School') ||
    t.categoryLabel.includes('School');

  const getTabTechniques = (categoryKey) => {
    return C1_TECHNIQUES_BANK.filter(t => {
      if (t.category !== categoryKey) return false;
      if (techFilter === 'Completed') return !!state.checkedTechniques?.[t.id];
      if (techFilter === 'Remaining') return !state.checkedTechniques?.[t.id];
      if (techFilter === 'School Studio') return isSchoolOption(t);
      return true;
    });
  };

  const toggleAllGrids = (expand) => {
    const next = {};
    C1_MARK_SCHEME_DETAILED.forEach(g => { next[g.code] = expand; });
    setExpandedGrids(next);
  };

  const toggleAllSectionTechs = (categoryKey, expand) => {
    setExpandedTechs(prev => {
      const next = { ...prev };
      C1_TECHNIQUES_BANK.filter(t => t.category === categoryKey).forEach(t => {
        next[t.id] = expand;
      });
      return next;
    });
  };

  const toggleAllPhases = (expand) => {
    const next = {};
    C1_WORKFLOW_PHASES.forEach(p => { next[p.id] = expand; });
    setExpandedPhases(next);
    setShowChannelTable(expand);
    setShowPreflight(expand);
  };

  const generateMarkdownSummary = () => {
    const songTitle = state.chosenSong || activeTrackName || '[Chosen Song Title]';
    const artist = state.originalArtist || activeArtistName || '[Original Artist]';
    const checkedTechList = C1_TECHNIQUES_BANK.filter(t => state.checkedTechniques?.[t.id]);

    const lines = [
      `# PEARSON EDEXCEL A-LEVEL MUSIC TECHNOLOGY (9MT0/01)`,
      `## Component 1: Recording Logbook & Mark Scheme Evidence (${activeDaw})`,
      ``,
      `- **Candidate Name:** ${state.studentName || '[Name]'}`,
      `- **Chosen Title:** ${songTitle} (${artist})`,
      `- **Recording Approach:** ${state.ensembleType}`,
      `- **Overall Progress:** ${overallPercent}%`,
      ``,
      `---`,
      `## 1. Mark Scheme Self-Audit (60 Marks)`,
      ...C1_MARK_SCHEME_DETAILED.map(g => {
        const done = g.elementsChecklist.filter(c => state.checkedMarkScheme?.[c.id]).length;
        return `- **${g.code} ${g.title} (${g.marks}m):** ${done}/${g.elementsChecklist.length} criteria ticked`;
      }),
      ``,
      `---`,
      `## 2. Channel Plan (Drums vs Vocals vs Other Instruments)`,
      `| Ch | Source | Group | Mic / DI / MIDI | Placement & Notes |`,
      `| :--- | :--- | :--- | :--- | :--- |`,
      ...state.channelPlan.map(r => `| ${r.ch} | ${r.source} | ${r.category} | ${r.mic} | ${r.placement} |`),
      ``,
      `---`,
      `## 3. Tick-Off Techniques & Logbook Evidence (${completedTechniques}/${totalTechniques})`,
      ...(checkedTechList.length > 0
        ? checkedTechList.map(t => {
            const note = state.techniqueNotes?.[t.id]?.trim();
            return `### ✅ #${t.number} [${t.categoryLabel}] ${t.title}\n- **Summary:** ${t.description}\n- **Logbook Evidence:** ${note || t.templatePlaceholder}`;
          })
        : [`*No techniques ticked off yet.*`])
    ];

    return lines.join('\n');
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateMarkdownSummary());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const renderTechniqueSection = (categoryKey, sectionTitle, sectionSubtitle, accentColor, markSchemeHint) => {
    const list = getTabTechniques(categoryKey);
    const allInSection = C1_TECHNIQUES_BANK.filter(t => t.category === categoryKey);
    const doneInSection = allInSection.filter(t => state.checkedTechniques?.[t.id]).length;
    const anyExpanded = list.some(t => expandedTechs[t.id]);

    return (
      <div>
        {/* Compact Section Header & Filter Bar */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: `1px solid ${accentColor}44`,
          borderRadius: '10px',
          padding: '10px 14px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.94rem' }}>{sectionTitle}</span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                background: `${accentColor}22`,
                color: accentColor,
                border: `1px solid ${accentColor}55`
              }}>
                {doneInSection}/{allInSection.length} Ticked
              </span>
              <span style={{ fontSize: '0.73rem', color: '#94A3B8' }}>• {markSchemeHint}</span>
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.77rem', marginTop: '2px' }}>{sectionSubtitle}</div>
          </div>

          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
            {['All', 'Completed', 'Remaining'].map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setTechFilter(f)}
                style={{
                  padding: '4px 9px',
                  borderRadius: '6px',
                  border: techFilter === f ? `1px solid ${accentColor}` : '1px solid rgba(255,255,255,0.1)',
                  background: techFilter === f ? `${accentColor}25` : 'rgba(15, 23, 42, 0.6)',
                  color: techFilter === f ? '#fff' : '#94A3B8',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
            <button
              type="button"
              onClick={() => toggleAllSectionTechs(categoryKey, !anyExpanded)}
              style={{
                padding: '4px 9px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.05)',
                color: '#E2E8F0',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {anyExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              {anyExpanded ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
        </div>

        {/* Collapsible Technique Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {list.map(tech => {
            const isChecked = !!state.checkedTechniques?.[tech.id];
            const isOpen = !!expandedTechs[tech.id];
            const noteValue = state.techniqueNotes?.[tech.id] || '';
            const isNoteOpen = !!expandedTechNotes[tech.id] || Boolean(noteValue.trim());

            return (
              <div
                key={tech.id}
                style={{
                  background: isChecked ? 'rgba(16, 185, 129, 0.06)' : 'rgba(15, 23, 42, 0.65)',
                  border: isChecked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255,255,255,0.09)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >
                {/* Compact 1-Line Accordion Header */}
                <div
                  onClick={() => setExpandedTechs(prev => ({ ...prev, [tech.id]: !prev[tech.id] }))}
                  style={{
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flex: 1, minWidth: 0, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCheck('checkedTechniques', tech.id);
                      }}
                      title={isChecked ? 'Untick technique' : 'Tick off technique'}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0
                      }}
                    >
                      {isChecked ? (
                        <CheckSquare size={18} color="#34D399" />
                      ) : (
                        <Square size={18} color="#64748B" />
                      )}
                    </button>

                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.07)',
                      color: '#CBD5E1',
                      flexShrink: 0
                    }}>
                      #{tech.number}
                    </span>

                    <span style={{
                      color: isChecked ? '#6EE7B7' : '#F8FAFC',
                      fontWeight: 700,
                      fontSize: '0.88rem'
                    }}>
                      {tech.title}
                    </span>

                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      background: `${accentColor}18`,
                      color: accentColor,
                      border: `1px solid ${accentColor}35`,
                      flexShrink: 0
                    }}>
                      {tech.categoryLabel}
                    </span>

                    {noteValue.trim() && (
                      <span style={{
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: '#38BDF8'
                      }}>
                        📝 Note
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94A3B8', fontSize: '0.73rem', fontWeight: 700, flexShrink: 0 }}>
                    <span>{isOpen ? 'Hide' : 'Details'}</span>
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </div>

                {/* Collapsible Details Body */}
                {isOpen && (
                  <div style={{
                    padding: '10px 14px 12px 41px',
                    borderTop: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '8px', lineHeight: 1.4 }}>
                      {tech.description}
                    </div>

                    {/* Concise Signal Chain / Recipe Boxes */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      {tech.recipes.map((r, rIdx) => (
                        <div
                          key={rIdx}
                          style={{
                            padding: '7px 10px',
                            background: 'rgba(2, 6, 23, 0.55)',
                            borderLeft: `3px solid ${accentColor}`,
                            borderRadius: '6px',
                            fontSize: '0.77rem',
                            color: '#E2E8F0',
                            lineHeight: 1.4
                          }}
                        >
                          <div style={{ color: accentColor, fontWeight: 800, marginBottom: '2px' }}>{r.name}</div>
                          <div>{r.settings}</div>
                        </div>
                      ))}
                    </div>

                    {/* Concise Steps */}
                    <ul style={{ margin: '0 0 8px 0', paddingLeft: '16px', color: '#CBD5E1', fontSize: '0.78rem', lineHeight: 1.45 }}>
                      {tech.steps.map((s, idx) => (
                        <li key={idx} style={{ marginBottom: '3px' }}>{s}</li>
                      ))}
                    </ul>

                    {/* Collapsible Logbook Note Input */}
                    <div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => setExpandedTechNotes(prev => ({ ...prev, [tech.id]: !isNoteOpen }))}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#38BDF8',
                            fontSize: '0.73rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: '2px 0'
                          }}
                        >
                          ✍️ {isNoteOpen ? 'Hide Logbook Note' : 'Add Logbook Note'}
                        </button>
                        {isNoteOpen && !noteValue.trim() && (
                          <button
                            type="button"
                            onClick={() => updateTechniqueNote(tech.id, tech.templatePlaceholder)}
                            style={{
                              background: 'rgba(168, 85, 247, 0.15)',
                              border: '1px solid rgba(168, 85, 247, 0.35)',
                              borderRadius: '4px',
                              color: '#D8B4FE',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              padding: '1px 7px',
                              cursor: 'pointer'
                            }}
                          >
                            Insert Example Template
                          </button>
                        )}
                      </div>
                      {isNoteOpen && (
                        <input
                          type="text"
                          placeholder={tech.logbookPrompt}
                          value={noteValue}
                          onChange={e => updateTechniqueNote(tech.id, e.target.value)}
                          style={{
                            width: '100%',
                            marginTop: '4px',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.14)',
                            background: 'rgba(2, 6, 23, 0.65)',
                            color: '#F8FAFC',
                            fontSize: '0.76rem'
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!currentUser?.is_premium) {
    return (
      <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '10px 0' }}>
        {onBack && (
          <button
            onClick={onBack}
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
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <PremiumLocked itemTitle="Component 1 Checklist & Tick List" />
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 17, 54, 0.9) 100%)',
      border: '1px solid rgba(168, 85, 247, 0.35)',
      borderRadius: '16px',
      padding: '16px 18px',
      marginBottom: '22px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)'
    }}>
      {/* Standalone Top Bar */}
      {standalone && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '12px',
          paddingBottom: '10px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          {onBack ? (
            <button onClick={onBack} className="btn-back-dashboard" style={{ margin: 0 }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          ) : <div />}

          {onSwitchToTracksheet && (
            <button
              type="button"
              onClick={onSwitchToTracksheet}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(168, 85, 247, 0.5)',
                background: 'rgba(168, 85, 247, 0.18)',
                color: '#E9D5FF',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Disc size={15} /> Switch to Track Sheet Creator →
            </button>
          )}
        </div>
      )}

      {/* Compact Top Summary & Progress Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {C1_OVERVIEW_SPECS.map((m, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.72rem',
                padding: '3px 9px',
                borderRadius: '6px',
                background: 'rgba(15, 23, 42, 0.78)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#E2E8F0'
              }}
              title={m.sub}
            >
              {m.icon} <strong>{m.label}:</strong> <span style={{ color: '#C084FC', fontWeight: 800 }}>{m.value}</span>
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '5px 12px',
            minWidth: '140px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '2px' }}>
              <span style={{ color: '#94A3B8', fontWeight: 700 }}>C1 PROGRESS</span>
              <span style={{ color: '#34D399', fontWeight: 800 }}>{overallPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                width: `${overallPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #A855F7, #EC4899, #10B981)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMarkSchemeModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              background: 'rgba(56, 189, 248, 0.18)',
              color: '#38bdf8',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            🏆 Mark Scheme Tick List (60m)
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 11px',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.45)',
              background: copiedSummary ? 'rgba(16, 185, 129, 0.28)' : 'rgba(16, 185, 129, 0.14)',
              color: '#6EE7B7',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {copiedSummary ? <Check size={13} /> : <Copy size={13} />}
            {copiedSummary ? 'Copied!' : 'Copy Logbook Summary'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Reset all ticks"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 8px',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#FCA5A5',
              fontSize: '0.74rem',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Permanent Header: Track Name & Session Metadata Bar (Visible across all tabs) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.45), rgba(15, 23, 42, 0.7))',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '10px',
        padding: '10px 14px',
        marginBottom: '12px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px',
        alignItems: 'end',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
      }}>
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.7rem',
            color: '#C084FC',
            fontWeight: 800,
            marginBottom: '4px',
            letterSpacing: '0.04em'
          }}>
            <Music size={13} color="#C084FC" />
            CHOSEN TRACK NAME (PRESCRIBED SONG)
          </label>
          <div>
            <input
              type="text"
              list="c1-prescribed-song-list"
              placeholder={activeTrackName || 'e.g. Superstition, Black Dog, Dreams...'}
              value={state.chosenSong}
              onChange={e => updateSongField(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 11px',
                borderRadius: '7px',
                border: state.chosenSong ? '1px solid rgba(168, 85, 247, 0.6)' : '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(2, 6, 23, 0.75)',
                color: '#F8FAFC',
                fontSize: '0.84rem',
                fontWeight: 700,
                outline: 'none',
                boxShadow: state.chosenSong ? '0 0 0 1px rgba(168,85,247,0.3)' : 'none'
              }}
            />
            <datalist id="c1-prescribed-song-list">
              {PRESCRIBED_SONG_SUGGESTIONS.map(s => (
                <option key={s.track} value={s.track}>{s.track} — {s.artist}</option>
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.7rem',
            color: '#94A3B8',
            fontWeight: 700,
            marginBottom: '4px',
            letterSpacing: '0.04em'
          }}>
            <Disc size={13} color="#94A3B8" />
            ORIGINAL ARTIST
          </label>
          <input
            type="text"
            placeholder={activeArtistName || 'e.g. Stevie Wonder, Led Zeppelin...'}
            value={state.originalArtist}
            onChange={e => updateField('originalArtist', e.target.value)}
            style={{
              width: '100%',
              padding: '7px 11px',
              borderRadius: '7px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(2, 6, 23, 0.75)',
              color: '#E2E8F0',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.7rem',
            color: '#94A3B8',
            fontWeight: 700,
            marginBottom: '4px',
            letterSpacing: '0.04em'
          }}>
            <User size={13} color="#94A3B8" />
            CANDIDATE NAME (OPTIONAL)
          </label>
          <input
            type="text"
            placeholder="Student Name"
            value={state.studentName}
            onChange={e => updateField('studentName', e.target.value)}
            style={{
              width: '100%',
              padding: '7px 11px',
              borderRadius: '7px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(2, 6, 23, 0.75)',
              color: '#E2E8F0',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>

        {activeTrackName && activeTrackName !== state.chosenSong && (
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              type="button"
              onClick={syncWithActiveTrack}
              title={`Import "${activeTrackName}" from Track Sheet Creator`}
              style={{
                width: '100%',
                padding: '7px 12px',
                borderRadius: '7px',
                border: '1px solid rgba(56, 189, 248, 0.5)',
                background: 'rgba(56, 189, 248, 0.16)',
                color: '#38BDF8',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                whiteSpace: 'nowrap'
              }}
            >
              ⚡ Use "{activeTrackName}"
            </button>
          </div>
        )}
      </div>

      {/* Sub-navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        {[
          { id: 'markscheme', label: `📊 Mark Scheme (60m) (${completedMarkSchemeChecks}/${totalMarkSchemeChecks})` },
          { id: 'drums', label: `🥁 Drum Kit (${C1_TECHNIQUES_BANK.filter(t => t.category === 'drums' && state.checkedTechniques?.[t.id]).length}/4)` },
          { id: 'vocals', label: `🎤 Vocals (${C1_TECHNIQUES_BANK.filter(t => t.category === 'vocals' && state.checkedTechniques?.[t.id]).length}/4)` },
          { id: 'other_instruments', label: `🎸 Other Instruments (${C1_TECHNIQUES_BANK.filter(t => t.category === 'other_instruments' && state.checkedTechniques?.[t.id]).length}/6)` },
          { id: 'mixing_mastering', label: `🎚️ Mix & Master (${C1_TECHNIQUES_BANK.filter(t => t.category === 'mixing_mastering' && state.checkedTechniques?.[t.id]).length}/4)` },
          { id: 'workflow', label: `🗺️ Workflow & Pre-Flight (${completedPhaseTasks + completedPreflight}/${totalPhaseTasks + totalPreflight})` }
        ].map(tab => {
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: active ? '1px solid rgba(168, 85, 247, 0.7)' : '1px solid rgba(255,255,255,0.08)',
                background: active
                  ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(236, 72, 153, 0.2))'
                  : 'rgba(15, 23, 42, 0.6)',
                color: active ? '#fff' : '#94A3B8',
                fontWeight: 700,
                fontSize: '0.77rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OFFICIAL 60-MARK SCHEME (COLLAPSIBLE ACCORDION GRIDS) */}
      {activeSubTab === 'markscheme' && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '0.77rem', color: '#94A3B8' }}>
              Click any Assessment Grid (`AG1A`–`AG7`) to expand or collapse its tick list. Vocals (`AG1B`) are assessed separately from Drum Kit (`AG1A`) and Other Instruments (`AG1C`).
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => toggleAllGrids(true)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#CBD5E1',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={() => toggleAllGrids(false)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#CBD5E1',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Collapse All
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {C1_MARK_SCHEME_DETAILED.map(grid => {
              const doneCount = grid.elementsChecklist.filter(c => state.checkedMarkScheme?.[c.id]).length;
              const isOpen = !!expandedGrids[grid.code];
              const isBandsOpen = !!expandedGridBands[grid.code];
              const allDone = doneCount === grid.elementsChecklist.length;

              return (
                <div
                  key={grid.code}
                  style={{
                    background: 'rgba(15, 23, 42, 0.72)',
                    border: `1px solid ${allDone ? 'rgba(16, 185, 129, 0.45)' : `${grid.color}44`}`,
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => setExpandedGrids(prev => ({ ...prev, [grid.code]: !prev[grid.code] }))}
                    style={{
                      padding: '10px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      background: isOpen ? 'rgba(255,255,255,0.02)' : 'transparent'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '5px',
                        background: `${grid.color}22`,
                        color: grid.color,
                        border: `1px solid ${grid.color}55`
                      }}>
                        {grid.code}
                      </span>
                      <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.88rem' }}>
                        {grid.title}
                      </span>
                      <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                        — {grid.summary}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.06)',
                        color: '#E2E8F0'
                      }}>
                        {grid.marks}m
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: allDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.06)',
                        color: allDone ? '#34D399' : '#94A3B8'
                      }}>
                        {doneCount}/{grid.elementsChecklist.length}
                      </span>
                      {isOpen ? <ChevronUp size={15} color="#94A3B8" /> : <ChevronDown size={15} color="#94A3B8" />}
                    </div>
                  </div>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div style={{
                      padding: '10px 14px 12px',
                      borderTop: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '6px',
                        marginBottom: '8px'
                      }}>
                        {grid.elementsChecklist.map(item => {
                          const checked = !!state.checkedMarkScheme?.[item.id];
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleCheck('checkedMarkScheme', item.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '7px 10px',
                                borderRadius: '7px',
                                background: checked ? 'rgba(16, 185, 129, 0.12)' : 'rgba(2, 6, 23, 0.45)',
                                border: checked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255,255,255,0.06)',
                                cursor: 'pointer'
                              }}
                            >
                              {checked ? (
                                <CheckSquare size={15} color="#34D399" style={{ flexShrink: 0 }} />
                              ) : (
                                <Square size={15} color="#64748B" style={{ flexShrink: 0 }} />
                              )}
                              <span style={{
                                fontSize: '0.77rem',
                                color: checked ? '#D1FAE5' : '#E2E8F0',
                                textDecoration: checked ? 'line-through' : 'none'
                              }}>
                                {item.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => setExpandedGridBands(prev => ({ ...prev, [grid.code]: !prev[grid.code] }))}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: grid.color,
                            fontSize: '0.73rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: '2px 0',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {isBandsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          {isBandsOpen ? 'Hide Level 1–4 Descriptors & Example' : 'Show Level 1–4 Descriptors & Example'}
                        </button>

                        {grid.jumpTab && (
                          <button
                            type="button"
                            onClick={() => setActiveSubTab(grid.jumpTab)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#94A3B8',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              padding: '2px 0'
                            }}
                          >
                            Open {grid.jumpTab.replace('_', ' ')} recipes →
                          </button>
                        )}
                      </div>

                      {isBandsOpen && (
                        <div style={{
                          marginTop: '6px',
                          padding: '8px 10px',
                          borderRadius: '7px',
                          background: 'rgba(2, 6, 23, 0.6)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          fontSize: '0.74rem'
                        }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '6px', marginBottom: '6px' }}>
                            {grid.bands.map((b, idx) => (
                              <div key={idx} style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: '5px' }}>
                                <div style={{ color: grid.color, fontWeight: 800 }}>{b.level}</div>
                                <div style={{ color: '#CBD5E1', marginTop: '2px' }}>{b.desc}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ color: '#A7F3D0', fontSize: '0.74rem' }}>
                            <strong>💡 Example:</strong> {grid.realWorldExample}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: DRUM KIT */}
      {activeSubTab === 'drums' && renderTechniqueSection(
        'drums',
        '🥁 Section A: Drum Kit Capture (AG1A • 4 Marks)',
        'Click any card to view concise settings, or tick the checkbox directly.',
        '#38BDF8',
        '⭐ Preferred: 4-Mic Glyn Johns Method'
      )}

      {/* TAB 3: VOCALS */}
      {activeSubTab === 'vocals' && renderTechniqueSection(
        'vocals',
        '🎤 Section B: Vocals — Lead & Backing (AG1B • 4 Marks + AG2–AG4)',
        'Separated from all other instruments in the Component 1 Mark Scheme.',
        '#FBBF24',
        'Treated Booth, Close Dynamic, Serial Compression & Backing Stacks'
      )}

      {/* TAB 4: OTHER INSTRUMENTS */}
      {activeSubTab === 'other_instruments' && renderTechniqueSection(
        'other_instruments',
        '🎸 Section C: All Other Instruments — DI Amp Sims, MIDI Keys & Acoustic (AG1C • 4 Marks)',
        'Electric Guitar/Bass DI + Amp Designer & Pathway 3 MIDI Synths, Pianos, B3 Organs, Rhodes & Mellotron.',
        '#C084FC',
        'DI Amp Sims, Pathway 3 MIDI & Acoustic Capture'
      )}

      {/* TAB 5: MIXING & MASTERING */}
      {activeSubTab === 'mixing_mastering' && renderTechniqueSection(
        'mixing_mastering',
        '🎚️ Section D: EQ, Dynamics, FX, Balance & Mastering (AG2–AG7 • 48 Marks)',
        '80% of Component 1 marks come from mixing, processing, stereo imaging, and mastering.',
        '#10B981',
        'Subtractive EQ, Automation, Shared Space Buses & -1 dBTP Master'
      )}

      {/* TAB 6: WORKFLOW, CHANNEL LOG & PRE-FLIGHT (COLLAPSIBLE ACCORDIONS) */}
      {activeSubTab === 'workflow' && (
        <div>
          {/* Workflow Controls & Candidate Number Bar */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700, whiteSpace: 'nowrap' }}>CANDIDATE NO:</label>
                <input
                  type="text"
                  placeholder="e.g. 1234"
                  value={state.candidateNumber}
                  onChange={e => updateField('candidateNumber', e.target.value)}
                  style={{ width: '90px', padding: '5px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(2, 6, 23, 0.6)', color: '#fff', fontSize: '0.78rem' }}
                />
              </div>

              <div style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#94A3B8', fontWeight: 700 }}>DAW:</span>
                <span style={{ padding: '3px 8px', borderRadius: '5px', background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC', fontWeight: 700 }}>{activeDaw || 'Logic Pro'}</span>
              </div>

              {state.chosenSong && (
                <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
                  Target Track: <strong style={{ color: '#F1F5F9' }}>{state.chosenSong}</strong> {state.originalArtist ? `(${state.originalArtist})` : ''}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => toggleAllPhases(true)}
                style={{
                  padding: '6px 11px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#CBD5E1',
                  fontSize: '0.73rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={() => toggleAllPhases(false)}
                style={{
                  padding: '6px 11px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#CBD5E1',
                  fontSize: '0.73rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* 5 Collapsible Workflow Phases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
            {C1_WORKFLOW_PHASES.map(phase => {
              const phaseDone = phase.tasks.filter(t => state.checkedTasks?.[t.id]).length;
              const isOpen = !!expandedPhases[phase.id];
              return (
                <div
                  key={phase.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.68)',
                    border: `1px solid ${phase.color}44`,
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    onClick={() => setExpandedPhases(prev => ({ ...prev, [phase.id]: !prev[phase.id] }))}
                    style={{
                      padding: '9px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '5px',
                        background: `${phase.color}22`,
                        color: phase.color
                      }}>
                        {phase.phaseNumber} • {phase.timing}
                      </span>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.86rem' }}>{phase.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: phaseDone === phase.tasks.length ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.06)',
                        color: phaseDone === phase.tasks.length ? '#34D399' : '#94A3B8'
                      }}>
                        {phaseDone}/{phase.tasks.length}
                      </span>
                      {isOpen ? <ChevronUp size={15} color="#94A3B8" /> : <ChevronDown size={15} color="#94A3B8" />}
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{
                      padding: '8px 14px 12px',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '6px'
                    }}>
                      {phase.tasks.map(task => {
                        const checked = !!state.checkedTasks?.[task.id];
                        return (
                          <div
                            key={task.id}
                            onClick={() => toggleCheck('checkedTasks', task.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              padding: '7px 10px',
                              borderRadius: '7px',
                              background: checked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(2, 6, 23, 0.45)',
                              border: checked ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(255,255,255,0.06)',
                              cursor: 'pointer'
                            }}
                          >
                            {checked ? (
                              <CheckSquare size={15} color="#34D399" style={{ marginTop: '2px', flexShrink: 0 }} />
                            ) : (
                              <Square size={15} color="#64748B" style={{ marginTop: '2px', flexShrink: 0 }} />
                            )}
                            <div>
                              <div style={{ fontSize: '0.77rem', fontWeight: 700, color: checked ? '#D1FAE5' : '#E2E8F0', textDecoration: checked ? 'line-through' : 'none' }}>
                                {task.label}
                              </div>
                              <div style={{ fontSize: '0.71rem', color: '#94A3B8' }}>{task.detail}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Collapsible Channel Allocation Log */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.68)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '10px',
            marginBottom: '10px',
            overflow: 'hidden'
          }}>
            <div
              onClick={() => setShowChannelTable(prev => !prev)}
              style={{
                padding: '9px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.86rem' }}>
                🎙️ Mic, DI &amp; MIDI Channel Allocation Log ({state.channelPlan.length} Channels)
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#38BDF8', fontSize: '0.74rem', fontWeight: 700 }}>
                <span>{showChannelTable ? 'Hide Table' : 'Show Table'}</span>
                {showChannelTable ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </div>
            </div>

            {showChannelTable && (
              <div style={{ padding: '0 14px 12px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', textAlign: 'left', color: '#C084FC' }}>
                      <th style={{ padding: '5px' }}>Ch</th>
                      <th style={{ padding: '5px' }}>Source</th>
                      <th style={{ padding: '5px' }}>Group</th>
                      <th style={{ padding: '5px' }}>Mic / DI / MIDI</th>
                      <th style={{ padding: '5px' }}>Placement &amp; Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.channelPlan.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <td style={{ padding: '4px 5px', fontWeight: 800, color: '#94A3B8' }}>{row.ch}</td>
                        <td style={{ padding: '4px 5px' }}>
                          <input
                            type="text"
                            value={row.source}
                            onChange={e => updateChannelRow(idx, 'source', e.target.value)}
                            style={{ width: '100%', background: 'rgba(2,6,23,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 6px', color: '#fff', fontSize: '0.74rem' }}
                          />
                        </td>
                        <td style={{ padding: '4px 5px', color: '#CBD5E1', fontWeight: 700 }}>{row.category}</td>
                        <td style={{ padding: '4px 5px' }}>
                          <input
                            type="text"
                            value={row.mic}
                            onChange={e => updateChannelRow(idx, 'mic', e.target.value)}
                            style={{ width: '100%', background: 'rgba(2,6,23,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 6px', color: '#E9D5FF', fontSize: '0.74rem' }}
                          />
                        </td>
                        <td style={{ padding: '4px 5px' }}>
                          <input
                            type="text"
                            value={row.placement}
                            onChange={e => updateChannelRow(idx, 'placement', e.target.value)}
                            style={{ width: '100%', background: 'rgba(2,6,23,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '4px 6px', color: '#CBD5E1', fontSize: '0.74rem' }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Collapsible 16-Point Pre-Flight Audit */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.68)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div
              onClick={() => setShowPreflight(prev => !prev)}
              style={{
                padding: '9px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.86rem' }}>
                🛡️ 16-Point Pre-Flight Submission Checklist ({completedPreflight}/{totalPreflight})
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#34D399', fontSize: '0.74rem', fontWeight: 700 }}>
                <span>{showPreflight ? 'Hide' : 'Show'}</span>
                {showPreflight ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </div>
            </div>

            {showPreflight && (
              <div style={{
                padding: '8px 14px 12px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '6px'
              }}>
                {C1_MASTER_CHECKLIST.map(item => {
                  const checked = !!state.checkedPreflight?.[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck('checkedPreflight', item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '7px 10px',
                        borderRadius: '7px',
                        background: checked ? 'rgba(16, 185, 129, 0.12)' : 'rgba(2, 6, 23, 0.45)',
                        border: checked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255,255,255,0.06)',
                        cursor: 'pointer'
                      }}
                    >
                      {checked ? <CheckSquare size={15} color="#34D399" style={{ flexShrink: 0 }} /> : <Square size={15} color="#64748B" style={{ flexShrink: 0 }} />}
                      <span style={{ fontSize: '0.75rem', color: checked ? '#D1FAE5' : '#E2E8F0', textDecoration: checked ? 'line-through' : 'none' }}>
                        <strong style={{ color: '#A7F3D0' }}>{item.category}:</strong> {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Official 60-Mark Scheme Tick List Modal */}
      <StudentMarkSchemeModal
        isOpen={showMarkSchemeModal}
        onClose={() => setShowMarkSchemeModal(false)}
        initialComponent="c1"
      />
    </div>
  );
}
