import React, { useState, useEffect, useMemo } from 'react';
import '../Component2Guide/Component2Guide.css';
import {
  C1_OVERVIEW_SPECS,
  C1_RECORDING_APPROACHES,
  C1_RECOMMENDED_STYLES,
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
  selectedApproach: 'hybrid_school',
  selectedStyleId: 'funk_soul_disco',
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
  const { saveComponent1Progress, currentUser } = useUser() || {};

  // 7 clear step-by-step tabs matching Component 2 Guide
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'markscheme' | 'drums' | 'vocals' | 'other_instruments' | 'mixing_mastering' | 'workflow'
  const [techSearch, setTechSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showMarkSchemeModal, setShowMarkSchemeModal] = useState(false);
  const [openNoteIds, setOpenNoteIds] = useState({});
  const [expandedMsCodes, setExpandedMsCodes] = useState({});
  const [showChannelTable, setShowChannelTable] = useState(false);

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

  useEffect(() => {
    if (activeTrackName && !state.chosenSong) {
      setState(prev => ({
        ...prev,
        chosenSong: activeTrackName,
        originalArtist: activeArtistName || prev.originalArtist
      }));
    }
  }, [activeTrackName, activeArtistName]);

  const switchTab = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateField = (field, value) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const selectSongPill = (track, artist) => {
    setState(prev => ({
      ...prev,
      chosenSong: track,
      originalArtist: artist
    }));
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

  const toggleNoteEditor = (id) => {
    setOpenNoteIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMsBands = (code) => {
    setExpandedMsCodes(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const updateChannelRow = (idx, field, value) => {
    setState(prev => {
      const updated = [...prev.channelPlan];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, channelPlan: updated };
    });
  };

  const copyTextToClipboard = (text, idKey) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idKey);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleReset = () => {
    if (window.confirm('Reset all Component 1 tick lists and logbook notes? This cannot be undone.')) {
      setState(INITIAL_STATE);
      localStorage.removeItem(C1_STORAGE_KEY);
    }
  };

  // Progress calculations
  const progressStats = useMemo(() => {
    const totalMarkSchemeChecks = C1_MARK_SCHEME_DETAILED.reduce((acc, g) => acc + g.elementsChecklist.length, 0);
    const completedMarkSchemeChecks = Object.values(state.checkedMarkScheme || {}).filter(Boolean).length;

    const totalPhaseTasks = C1_WORKFLOW_PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
    const completedPhaseTasks = Object.values(state.checkedTasks || {}).filter(Boolean).length;

    const totalTechniques = C1_TECHNIQUES_BANK.length;
    const completedTechniques = Object.values(state.checkedTechniques || {}).filter(Boolean).length;

    const drumsDone = C1_TECHNIQUES_BANK.filter(t => t.category === 'drums' && state.checkedTechniques?.[t.id]).length;
    const vocalsDone = C1_TECHNIQUES_BANK.filter(t => t.category === 'vocals' && state.checkedTechniques?.[t.id]).length;
    const otherDone = C1_TECHNIQUES_BANK.filter(t => t.category === 'other_instruments' && state.checkedTechniques?.[t.id]).length;
    const mixDone = C1_TECHNIQUES_BANK.filter(t => t.category === 'mixing_mastering' && state.checkedTechniques?.[t.id]).length;

    const totalPreflight = C1_MASTER_CHECKLIST.length;
    const completedPreflight = Object.values(state.checkedPreflight || {}).filter(Boolean).length;

    const total = totalMarkSchemeChecks + totalPhaseTasks + totalTechniques + totalPreflight;
    const done = completedMarkSchemeChecks + completedPhaseTasks + completedTechniques + completedPreflight;
    const overallPercent = total > 0 ? Math.round((done / total) * 100) : 0;

    return {
      msDone: completedMarkSchemeChecks,
      msTotal: totalMarkSchemeChecks,
      phaseDone: completedPhaseTasks,
      phaseTotal: totalPhaseTasks,
      techDone: completedTechniques,
      techTotal: totalTechniques,
      drumsDone,
      vocalsDone,
      otherDone,
      mixDone,
      preflightDone: completedPreflight,
      preflightTotal: totalPreflight,
      overallPercent
    };
  }, [state]);

  const generateMarkdownSummary = () => {
    const songTitle = state.chosenSong || activeTrackName || '[Chosen Song Title]';
    const artist = state.originalArtist || activeArtistName || '[Original Artist]';
    const checkedTechList = C1_TECHNIQUES_BANK.filter(t => state.checkedTechniques?.[t.id] || state.techniqueNotes?.[t.id]);

    const lines = [
      `# PEARSON EDEXCEL A-LEVEL MUSIC TECHNOLOGY (9MT0/01)`,
      `## Component 1: Recording Logbook & Mark Scheme Dossier (${activeDaw})`,
      ``,
      `- **Candidate Name:** ${state.studentName || '[Name]'} ${state.candidateNumber ? `(#${state.candidateNumber})` : ''}`,
      `- **Chosen Prescribed Song:** ${songTitle} (${artist})`,
      `- **Recording Approach:** ${state.ensembleType}`,
      `- **Overall Coursework Progress:** ${progressStats.overallPercent}%`,
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
      `## 3. Tick-Off Techniques & Logbook Evidence (${progressStats.techDone}/${progressStats.techTotal})`,
      ...(checkedTechList.length > 0
        ? checkedTechList.map(t => {
            const note = state.techniqueNotes?.[t.id]?.trim();
            return `### ✅ #${t.number} [${t.categoryLabel}] ${t.title}\n- **Summary:** ${t.description}\n- **Logbook Evidence:** ${note || t.templatePlaceholder}`;
          })
        : [`*No techniques ticked off yet.*`])
    ];

    return lines.join('\n');
  };

  // Shared Renderer for Technique Cards — identical visual card layout to Component 2 Guide
  const renderTechniqueSection = (categoryKey, sectionTitle, sectionSubtitle, accentColor, extraBanner = null) => {
    const items = C1_TECHNIQUES_BANK.filter(t => {
      if (t.category !== categoryKey) return false;
      if (techSearch.trim()) {
        const q = techSearch.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.steps.some(s => s.toLowerCase().includes(q)) ||
          (t.recipes && t.recipes.some(r => r.name.toLowerCase().includes(q) || r.settings.toLowerCase().includes(q)))
        );
      }
      return true;
    });

    const totalCategory = C1_TECHNIQUES_BANK.filter(t => t.category === categoryKey).length;
    const doneCategory = C1_TECHNIQUES_BANK.filter(t => t.category === categoryKey && state.checkedTechniques?.[t.id]).length;

    return (
      <div>
        <div className="c2-section-card" style={{ borderTop: `4px solid ${accentColor}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: extraBanner ? '14px' : 0 }}>
            <div>
              <h2 className="c2-section-title" style={{ margin: 0 }}>
                {sectionTitle}
              </h2>
              <p className="c2-section-desc" style={{ margin: '6px 0 0 0' }}>
                {sectionSubtitle}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="c2-input-field"
                style={{ width: '240px' }}
                placeholder="🔍 Filter techniques or recipes..."
                value={techSearch}
                onChange={e => setTechSearch(e.target.value)}
              />
              <span style={{
                background: `${accentColor}20`,
                border: `1px solid ${accentColor}60`,
                color: accentColor,
                padding: '8px 14px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                {doneCategory} / {totalCategory} Used in Session
              </span>
            </div>
          </div>

          {extraBanner}
        </div>

        <div className="c2-tech-detailed-list">
          {items.map((tech) => {
            const isCompleted = !!state.checkedTechniques?.[tech.id];
            const noteValue = state.techniqueNotes?.[tech.id] || '';
            const isNoteOpen = Boolean(openNoteIds[tech.id] || noteValue.trim());

            return (
              <div
                key={tech.id}
                className={`c2-tech-detailed-card ${isCompleted ? 'completed' : ''}`}
                style={{ borderTop: `3px solid ${isCompleted ? '#10b981' : accentColor}` }}
              >
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.73rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: `${accentColor}22`,
                        color: accentColor,
                        border: `1px solid ${accentColor}50`
                      }}>
                        {tech.categoryLabel} • Technique #{tech.number}
                      </span>
                      {tech.preferred && (
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '6px',
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: '#34d399',
                          border: '1px solid rgba(16, 185, 129, 0.45)'
                        }}>
                          ⭐ RECOMMENDED SCHOOL STUDIO METHOD
                        </span>
                      )}
                      {isCompleted && (
                        <span style={{
                          fontSize: '0.73rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '6px',
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: '#34d399',
                          border: '1px solid rgba(16, 185, 129, 0.4)'
                        }}>
                          ✓ USED IN SESSION
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff', fontWeight: 800 }}>
                      {tech.number}. {tech.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => toggleNoteEditor(tech.id)}
                      style={{
                        padding: '9px 14px',
                        borderRadius: '10px',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        background: isNoteOpen ? 'rgba(56, 189, 248, 0.18)' : 'rgba(15, 23, 42, 0.7)',
                        color: '#38bdf8',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✍️ {noteValue.trim() ? 'Edit Logbook Note' : isNoteOpen ? 'Hide Logbook Note' : '+ Add Logbook Note'}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCheck('checkedTechniques', tech.id)}
                      style={{
                        padding: '9px 16px',
                        borderRadius: '10px',
                        border: isCompleted ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.25)',
                        background: isCompleted ? '#10b981' : 'rgba(15, 23, 42, 0.85)',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: isCompleted ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none'
                      }}
                    >
                      {isCompleted ? '✓ Ticked Off' : '☐ Tick When Used'}
                    </button>
                  </div>
                </div>

                {/* 2-Column Body: Parameter Recipes (Left) | Steps & Collapsible Logbook Note (Right) */}
                <div className="c2-tech-body-grid">
                  <div>
                    {tech.recipes && tech.recipes.length > 0 && (
                      <div className="c2-recipes-box">
                        <div style={{ fontSize: '0.76rem', fontWeight: 800, color: accentColor, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                          🎙️ Exact Studio & {activeDaw} Settings:
                        </div>
                        {tech.recipes.map((r, rIdx) => (
                          <div key={rIdx} style={{ marginBottom: rIdx < tech.recipes.length - 1 ? '8px' : 0, fontSize: '0.82rem', lineHeight: 1.45 }}>
                            <div style={{ color: '#fff', fontWeight: 700, marginBottom: '2px' }}>• {r.name}:</div>
                            <div style={{ color: '#cbd5e1', fontFamily: 'monospace', fontSize: '0.79rem', paddingLeft: '10px' }}>{r.settings}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <p style={{ margin: '0 0 10px 0', fontSize: '0.92rem', color: '#f1f5f9', lineHeight: 1.5 }}>
                      {tech.description}
                    </p>

                    <div style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      marginBottom: '10px'
                    }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                        Step-by-Step Studio Checklist:
                      </div>
                      <ol className="c2-tech-steps" style={{ margin: 0 }}>
                        {tech.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="c2-logbook-prompt" style={{ marginBottom: isNoteOpen ? '10px' : 0 }}>
                      <strong>📝 Logbook Evidence Needed:</strong> {tech.logbookPrompt}
                    </div>

                    {isNoteOpen && (
                      <div style={{
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '12px',
                        padding: '12px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8' }}>
                            ✍️ Custom Logbook Entry for Technique #{tech.number}
                          </span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => updateTechniqueNote(tech.id, tech.templatePlaceholder)}
                              style={{
                                background: 'rgba(56, 189, 248, 0.15)',
                                border: '1px solid rgba(56, 189, 248, 0.4)',
                                color: '#38bdf8',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              Load Example Template
                            </button>
                            <button
                              type="button"
                              onClick={() => copyTextToClipboard(noteValue || tech.templatePlaceholder, tech.id)}
                              style={{
                                background: 'rgba(16, 185, 129, 0.18)',
                                border: '1px solid rgba(16, 185, 129, 0.45)',
                                color: '#34d399',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              {copiedId === tech.id ? '✓ Copied!' : 'Copy Note'}
                            </button>
                          </div>
                        </div>
                        <textarea
                          className="c2-note-textarea"
                          placeholder={`Example: "${tech.templatePlaceholder}"`}
                          value={noteValue}
                          onChange={e => updateTechniqueNote(tech.id, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
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
            ← Back to Dashboard
          </button>
        )}
        <PremiumLocked itemTitle="Component 1: Recording Guide & Tick List" />
      </div>
    );
  }

  return (
    <div className="c2-guide-container">
      {/* Top Bar — Matches Component 2 Guide */}
      <div className="c2-top-bar">
        {onBack ? (
          <button className="c2-back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>
        ) : (
          <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontWeight: 600 }}>
            🎙️ Component 1: Multi-Track Recording Guide & Tick List
          </div>
        )}
        <div className="c2-top-actions">
          {onSwitchToTracksheet && (
            <button
              type="button"
              className="c2-action-btn"
              style={{
                background: 'rgba(168, 85, 247, 0.18)',
                borderColor: 'rgba(168, 85, 247, 0.5)',
                color: '#e9d5ff'
              }}
              onClick={onSwitchToTracksheet}
            >
              🎛️ Open Track Sheet Creator →
            </button>
          )}
          <button
            type="button"
            className="c2-action-btn"
            style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', border: 'none' }}
            onClick={() => setShowMarkSchemeModal(true)}
          >
            🏆 Mark Scheme Tick List (60m)
          </button>
          <button
            type="button"
            className="c2-action-btn"
            onClick={() => copyTextToClipboard(generateMarkdownSummary(), 'full_c1_export')}
          >
            {copiedId === 'full_c1_export' ? '✅ Copied Full Logbook Summary!' : '📋 Copy Full Logbook Summary'}
          </button>
          <button type="button" className="c2-action-btn secondary" onClick={handleReset}>
            ↺ Reset All Tick Lists
          </button>
        </div>
      </div>

      {/* Hero HUD — Matches Component 2 Guide */}
      <div className="c2-hud">
        <div className="c2-hud-top">
          <div className="c2-hud-title">
            <span style={{
              fontSize: '0.73rem',
              fontWeight: '800',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.45)',
              padding: '3px 10px',
              borderRadius: '6px',
              letterSpacing: '0.6px'
            }}>
              EDEXCEL A-LEVEL 9MT0/01 • COMPONENT 1 (60 MARKS • 3:00–3:30 DURATION)
            </span>
            <h1>Multi-Track Recording Guide & Tick List</h1>
            <p className="c2-hud-subtitle">
              Choose your prescribed song & studio approach, follow the 18 capture & mixing recipes across Drums (`AG1A`), Vocals (`AG1B`) & Other Instruments (`AG1C`), and tick off your coursework progress.
            </p>
          </div>

          {/* Clickable Quick-Jump HUD Badges */}
          <div className="c2-hud-badges">
            <div className="c2-stat-badge" onClick={() => switchTab('drums')} title="Jump to AG1A Drum Kit Capture">
              <span className="c2-stat-icon">🥁</span>
              <div className="c2-stat-info">
                <span className="c2-stat-label">AG1A Drums</span>
                <span className="c2-stat-val" style={{ color: '#38bdf8' }}>{progressStats.drumsDone} / 4</span>
              </div>
            </div>
            <div className="c2-stat-badge" onClick={() => switchTab('vocals')} title="Jump to AG1B Separated Vocals">
              <span className="c2-stat-icon">🎤</span>
              <div className="c2-stat-info">
                <span className="c2-stat-label">AG1B Vocals</span>
                <span className="c2-stat-val" style={{ color: '#fbbf24' }}>{progressStats.vocalsDone} / 4</span>
              </div>
            </div>
            <div className="c2-stat-badge" onClick={() => switchTab('other_instruments')} title="Jump to AG1C Guitars, Bass & MIDI Keys">
              <span className="c2-stat-icon">🎸</span>
              <div className="c2-stat-info">
                <span className="c2-stat-label">AG1C Other Inst</span>
                <span className="c2-stat-val" style={{ color: '#c084fc' }}>{progressStats.otherDone} / 6</span>
              </div>
            </div>
            <div className="c2-stat-badge" onClick={() => switchTab('markscheme')} title="Jump to 60-Mark Assessment Grids">
              <span className="c2-stat-icon">📊</span>
              <div className="c2-stat-info">
                <span className="c2-stat-label">Mark Scheme</span>
                <span className="c2-stat-val" style={{ color: '#34d399' }}>{progressStats.msDone} / {progressStats.msTotal}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="c2-progress-area" style={{ paddingBottom: '22px' }}>
          <div className="c2-progress-labels">
            <span style={{ color: '#94a3b8' }}>Overall Component 1 Recording & Mix Completion</span>
            <span style={{ color: '#34d399' }}>{progressStats.overallPercent}% Complete</span>
          </div>
          <div className="c2-progress-track" style={{ position: 'relative', overflow: 'visible' }}>
            <div className="c2-progress-fill" style={{ width: `${progressStats.overallPercent}%` }} />
            {[
              { pct: 0, label: 'Song & Setup' },
              { pct: 20, label: 'P1: Drums' },
              { pct: 40, label: 'P2: DI & MIDI' },
              { pct: 60, label: 'P3: Vocals' },
              { pct: 80, label: 'P4: AG2–6 Mix' },
              { pct: 100, label: 'P5: Master' }
            ].map(mk => {
              const reached = progressStats.overallPercent >= mk.pct;
              return (
                <div
                  key={mk.pct}
                  style={{
                    position: 'absolute',
                    left: `${mk.pct}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}
                >
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: reached ? '#10b981' : '#1e293b',
                    border: `2px solid ${reached ? '#fff' : '#64748b'}`,
                    boxShadow: reached ? '0 0 8px rgba(16, 185, 129, 0.8)' : 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '50%',
                    transform: mk.pct === 0 ? 'translateX(0%)' : mk.pct === 100 ? 'translateX(-100%)' : 'translateX(-50%)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: reached ? '#34d399' : '#64748b',
                    whiteSpace: 'nowrap'
                  }}>
                    {mk.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Clean Step-by-Step 7-Tab Navigation Bar — Matches Component 2 Guide */}
      <div className="c2-tabs-bar">
        <button
          type="button"
          className={`c2-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => switchTab('overview')}
        >
          <span>🧭</span> 1. Song, Setup & Channel Plan
        </button>
        <button
          type="button"
          className={`c2-tab-btn ${activeTab === 'markscheme' ? 'active' : ''}`}
          onClick={() => switchTab('markscheme')}
        >
          <span>📊</span> 2. Mark Scheme (60m)
          <span className="c2-tab-count">{progressStats.msDone}/{progressStats.msTotal}</span>
        </button>
        <button
          type="button"
          className={`c2-tab-btn ${activeTab === 'drums' ? 'active' : ''}`}
          onClick={() => switchTab('drums')}
        >
          <span>🥁</span> 3. Drum Kit (4)
          <span className="c2-tab-count">{progressStats.drumsDone}/4</span>
        </button>
        <button
          type="button"
          className={`c2-tab-btn ${activeTab === 'vocals' ? 'active' : ''}`}
          onClick={() => switchTab('vocals')}
        >
          <span>🎤</span> 4. Vocals (4)
          <span className="c2-tab-count">{progressStats.vocalsDone}/4</span>
        </button>
        <button
          type="button"
          className={`c2-tab-btn ${activeTab === 'other_instruments' ? 'active' : ''}`}
          onClick={() => switchTab('other_instruments')}
        >
          <span>🎸</span> 5. Other Inst (6)
          <span className="c2-tab-count">{progressStats.otherDone}/6</span>
        </button>
        <button
          type="button"
          className={`c2-tab-btn ${activeTab === 'mixing_mastering' ? 'active' : ''}`}
          onClick={() => switchTab('mixing_mastering')}
        >
          <span>🎚️</span> 6. Mix & Master (4)
          <span className="c2-tab-count">{progressStats.mixDone}/4</span>
        </button>
        <button
          type="button"
          className={`c2-tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => switchTab('workflow')}
        >
          <span>✅</span> 7. 5-Phase & Final Check
          <span className="c2-tab-count">{progressStats.preflightDone}/{progressStats.preflightTotal}</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: STUDIO RECORDING STRATEGY, SONG & CHANNEL PLAN
          ========================================================= */}
      {activeTab === 'overview' && (
        <div>
          {/* Core Specifications Strip */}
          <div className="c2-specs-grid">
            {C1_OVERVIEW_SPECS.map((spec, idx) => (
              <div key={idx} className="c2-spec-card">
                <div className="c2-spec-icon">{spec.icon}</div>
                <div>
                  <div style={{ fontSize: '0.73rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700 }}>
                    {spec.label}
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '2px 0' }}>
                    {spec.value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    {spec.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* STEP 1: CHOOSE YOUR RECORDING APPROACH */}
          <div className="c2-section-card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '6px' }}>
              <h2 className="c2-section-title" style={{ margin: 0 }}>
                <span>🎙️</span> Step 1: Choose Your Studio Recording Strategy
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>
                Click a card to select your studio setup
              </span>
            </div>
            <p className="c2-section-desc">
              For school and college studios, we strongly recommend <strong>Option 1 (4-Mic Glyn Johns Drums + DI Amp Sim Guitars + Live USB MIDI Keys + Separated Booth Vocals)</strong>. It eliminates amplifier spill and phase cancellation while hitting all 3 capture pathways.
            </p>

            <div className="c2-briefs-grid">
              {C1_RECORDING_APPROACHES.map((approach) => {
                const isSelected = state.selectedApproach === approach.id;
                return (
                  <div
                    key={approach.id}
                    className={`c2-brief-card ${approach.badgeType} ${isSelected ? 'selected-brief' : ''}`}
                    onClick={() => setState(prev => ({
                      ...prev,
                      selectedApproach: approach.id,
                      ensembleType: approach.title
                    }))}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span className={`c2-brief-badge ${approach.badgeType}`}>
                          {approach.badge}
                        </span>
                        {isSelected && (
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            background: 'rgba(56, 189, 248, 0.25)',
                            color: '#38bdf8',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            ✓ SELECTED STRATEGY
                          </span>
                        )}
                      </div>

                      <h3 style={{ margin: '4px 0', color: '#fff', fontSize: '1.12rem' }}>{approach.title}</h3>
                      <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600, marginBottom: '8px' }}>
                        {approach.subtitle}
                      </div>
                      <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                        {approach.description}
                      </p>

                      {approach.pros && (
                        <ul className="c2-brief-list">
                          {approach.pros.map((pro, i) => (
                            <li key={i} style={{ color: '#a7f3d0' }}>✅ {pro}</li>
                          ))}
                        </ul>
                      )}
                      {approach.cons && (
                        <ul className="c2-brief-list" style={{ marginTop: '6px' }}>
                          {approach.cons.map((con, i) => (
                            <li key={i} style={{ color: '#fca5a5' }}>⚠️ {con}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div style={{
                      marginTop: '14px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      fontSize: '0.8rem',
                      color: '#e2e8f0'
                    }}>
                      <strong>💡 Studio Tip:</strong> {approach.keyTip}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SESSION DETAILS & 12-CHANNEL PATCH PLAN */}
          <div className="c2-section-card" style={{ borderTop: '4px solid #38bdf8' }}>
            <h2 className="c2-section-title">
              <span>📋</span> Step 2: Your Prescribed Song & 12–24 Channel Studio Patch Plan
            </h2>
            <p className="c2-section-desc">
              Enter your chosen prescribed song and candidate details below. They automatically sync with your exported Component 1 Logbook summary and your Teacher Dashboard.
            </p>

            <div className="c2-input-grid" style={{ marginBottom: '18px' }}>
              <div className="c2-input-group">
                <label>Chosen Prescribed Song</label>
                <input
                  type="text"
                  list="c1-prescribed-song-list"
                  className="c2-input-field"
                  placeholder="e.g. Superstition, Dreams, Billie Jean..."
                  value={state.chosenSong}
                  onChange={e => updateSongField(e.target.value)}
                />
                <datalist id="c1-prescribed-song-list">
                  {PRESCRIBED_SONG_SUGGESTIONS.map(s => (
                    <option key={s.track} value={s.track}>{s.track} — {s.artist}</option>
                  ))}
                </datalist>
              </div>
              <div className="c2-input-group">
                <label>Original Artist</label>
                <input
                  type="text"
                  className="c2-input-field"
                  placeholder="e.g. Stevie Wonder, Fleetwood Mac..."
                  value={state.originalArtist}
                  onChange={e => updateField('originalArtist', e.target.value)}
                />
              </div>
              <div className="c2-input-group">
                <label>Candidate Name</label>
                <input
                  type="text"
                  className="c2-input-field"
                  placeholder="Student Name"
                  value={state.studentName}
                  onChange={e => updateField('studentName', e.target.value)}
                />
              </div>
              <div className="c2-input-group">
                <label>Candidate Number</label>
                <input
                  type="text"
                  className="c2-input-field"
                  placeholder="e.g. 1234"
                  value={state.candidateNumber}
                  onChange={e => updateField('candidateNumber', e.target.value)}
                />
              </div>
            </div>

            {/* Collapsible 12-Channel Studio Allocation Table */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <div
                onClick={() => setShowChannelTable(prev => !prev)}
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem' }}>
                    🎛️ 12-Channel Studio Patch Sheet (Drums `AG1A`, Vocals `AG1B`, Other Inst `AG1C`)
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem', marginLeft: '10px' }}>
                    Click to view or customize your microphone, DI & MIDI channel plan
                  </span>
                </div>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#38bdf8',
                  background: 'rgba(56, 189, 248, 0.12)',
                  padding: '5px 12px',
                  borderRadius: '8px'
                }}>
                  {showChannelTable ? '▲ Hide Channel Table' : '▼ View / Edit 12 Channels'}
                </span>
              </div>

              {showChannelTable && (
                <div style={{ padding: '0 16px 16px', overflowX: 'auto' }}>
                  <table className="c2-sample-table">
                    <thead>
                      <tr>
                        <th style={{ width: '50px' }}>Ch</th>
                        <th>Instrument / Stem</th>
                        <th style={{ width: '150px' }}>Mark Scheme Column</th>
                        <th>Mic / DI Box / MIDI Instrument</th>
                        <th>Placement, Distance & Panning Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.channelPlan.map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 800, color: '#38bdf8' }}>{row.ch}</td>
                          <td>
                            <input
                              type="text"
                              className="c2-input-field"
                              value={row.source}
                              onChange={e => updateChannelRow(idx, 'source', e.target.value)}
                            />
                          </td>
                          <td style={{ fontWeight: 700, color: '#cbd5e1', fontSize: '0.8rem' }}>{row.category}</td>
                          <td>
                            <input
                              type="text"
                              className="c2-input-field"
                              value={row.mic}
                              onChange={e => updateChannelRow(idx, 'mic', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="c2-input-field"
                              value={row.placement}
                              onChange={e => updateChannelRow(idx, 'placement', e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: OFFICIAL 60-MARK SCHEME (AG1A–AG7)
          ========================================================= */}
      {activeTab === 'markscheme' && (
        <div>
          <div className="c2-section-card" style={{ borderTop: '4px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '6px' }}>
              <h2 className="c2-section-title" style={{ margin: 0 }}>
                <span>📊</span> Official 60-Mark Assessment Grids (`AG1A`–`AG7`)
              </h2>
              <span style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 700 }}>
                {progressStats.msDone} / {progressStats.msTotal} Elements Ticked
              </span>
            </div>
            <p className="c2-section-desc">
              Notice how the Component 1 Mark Scheme assesses <strong>Vocals (`AG1B`) in their own dedicated column</strong> separately from the <strong>Drum Kit (`AG1A`)</strong> and <strong>All Other Instruments (`AG1C`)</strong>. Tick off each requirement below, or click <strong>"View Level 1–4 Bands"</strong> on any card to inspect the mark band descriptors.
            </p>

            <div className="c2-ms-grid-list">
              {C1_MARK_SCHEME_DETAILED.map((ms) => {
                const doneCount = ms.elementsChecklist.filter(e => state.checkedMarkScheme?.[e.id]).length;
                const isBandsOpen = !!expandedMsCodes[ms.code];
                return (
                  <div key={ms.code} className="c2-ms-card" style={{ borderLeft: `5px solid ${ms.color}` }}>
                    <div className="c2-ms-header">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{
                            background: ms.color,
                            color: '#0f172a',
                            fontWeight: 900,
                            padding: '3px 10px',
                            borderRadius: '6px',
                            fontSize: '0.82rem'
                          }}>
                            {ms.code}
                          </span>
                          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>{ms.title}</h3>
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>({ms.category})</span>
                        </div>
                        <p style={{ margin: '6px 0 0 0', fontSize: '0.88rem', color: '#cbd5e1' }}>
                          {ms.summary}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="c2-ms-marks-badge" style={{
                          background: `${ms.color}20`,
                          color: ms.color,
                          border: `1px solid ${ms.color}50`
                        }}>
                          {ms.marks} Marks ({doneCount}/{ms.elementsChecklist.length} Ticked)
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleMsBands(ms.code)}
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.14)',
                            color: '#cbd5e1',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {isBandsOpen ? '▲ Hide Level 1–4 Bands' : '▼ View Level 1–4 Bands'}
                        </button>
                      </div>
                    </div>

                    {isBandsOpen && (
                      <>
                        <div style={{
                          background: 'rgba(56, 189, 248, 0.08)',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          marginBottom: '12px',
                          fontSize: '0.83rem',
                          color: '#e2e8f0'
                        }}>
                          <strong style={{ color: '#38bdf8' }}>💡 Studio Reference Example: </strong>
                          {ms.realWorldExample}
                        </div>

                        <div className="c2-ms-bands">
                          {ms.bands.map((b, idx) => (
                            <div key={idx} className={`c2-ms-band ${idx === 3 ? 'top-band' : ''}`}>
                              <div className="c2-ms-band-lvl">{b.level}</div>
                              <div className="c2-ms-band-desc">{b.desc}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Tickable Elements for this Mark Scheme Grid */}
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: ms.color, marginBottom: '8px', letterSpacing: '0.5px' }}>
                      ✅ Tick Off Required {ms.code} Elements in Your Session:
                    </div>
                    <div className="c2-checklist-grid">
                      {ms.elementsChecklist.map((el) => {
                        const isChecked = !!state.checkedMarkScheme?.[el.id];
                        return (
                          <div
                            key={el.id}
                            className={`c2-check-item ${isChecked ? 'checked' : ''}`}
                            onClick={() => toggleCheck('checkedMarkScheme', el.id)}
                          >
                            <div className="c2-checkbox">{isChecked ? '✓' : ''}</div>
                            <div className="c2-check-text">
                              <div className="c2-check-label">{el.text}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: DRUM KIT CAPTURE (AG1A • 4 TECHNIQUES)
          ========================================================= */}
      {activeTab === 'drums' && renderTechniqueSection(
        'drums',
        '🥁 AG1A: Drum Kit Capture — 4 Practical Studio Recipes (4 Marks)',
        'Assessed in its own dedicated column (AG1A). We strongly recommend Technique #1 (4-Mic Glyn Johns Method) for fast setup and rock-solid phase coherence.',
        '#38bdf8'
      )}

      {/* =========================================================
          TAB 4: VOCALS — LEAD & BACKING (AG1B • 4 TECHNIQUES)
          ========================================================= */}
      {activeTab === 'vocals' && renderTechniqueSection(
        'vocals',
        '🎤 AG1B: Separated Vocals (Lead & Backing) — 4 Studio Recipes',
        'Vocals are assessed separately from all instruments across Capture (AG1B), EQ (AG2), Dynamics (AG3), Effects (AG4), and Balance (AG5).',
        '#fbbf24'
      )}

      {/* =========================================================
          TAB 5: ALL OTHER INSTRUMENTS — DI, AMP SIMS & MIDI (AG1C • 6 TECHNIQUES)
          ========================================================= */}
      {activeTab === 'other_instruments' && renderTechniqueSection(
        'other_instruments',
        '🎸 AG1C: Guitars, Bass, Live MIDI Keys & Extra Stems — 6 Recipes',
        'Covers Active DI Bass + SVT blend, 12th-fret SDC Acoustic Guitar, DI Electric Guitars into Logic Amp Designer, and live Pathway 3 USB MIDI Pianos, Hammond B3, Rhodes & Mellotron.',
        '#c084fc'
      )}

      {/* =========================================================
          TAB 6: MIXING, STEREO & MASTERING (AG2–AG7 • 4 TECHNIQUES)
          ========================================================= */}
      {activeTab === 'mixing_mastering' && renderTechniqueSection(
        'mixing_mastering',
        '🎚️ AG2–AG7: EQ, Dynamics, Spatial FX, Stereo Panning & Mastering (48 Marks)',
        '80% of your Component 1 marks come from mixing, EQ pocketing, serial compression, shared reverb spaces, stereo panning, and -1.0 dBFS mastering.',
        '#10b981'
      )}

      {/* =========================================================
          TAB 7: 5-PHASE WORKFLOW & 16-POINT FINAL SUBMISSION CHECKLIST
          ========================================================= */}
      {activeTab === 'workflow' && (
        <div>
          <div className="c2-section-card" style={{ borderTop: '4px solid #38bdf8' }}>
            <h2 className="c2-section-title">
              <span>🗓️</span> 5-Phase Studio Recording & Mixing Roadmap
            </h2>
            <p className="c2-section-desc">
              Follow these 5 chronological studio phases from choosing your prescribed song to bouncing your 16-bit / 44.1 kHz Stereo WAV master.
            </p>

            {C1_WORKFLOW_PHASES.map((phase) => {
              const pTotal = phase.tasks.length;
              const pDone = phase.tasks.filter(t => state.checkedTasks?.[t.id]).length;
              const pPct = Math.round((pDone / pTotal) * 100);

              return (
                <div key={phase.id} className="c2-phase-card" style={{ borderLeft: `4px solid ${phase.color}` }}>
                  <div className="c2-phase-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span className="c2-phase-badge" style={{
                          background: `${phase.color}20`,
                          color: phase.color,
                          border: `1px solid ${phase.color}50`
                        }}>
                          {phase.phaseNumber} • {phase.timing}
                        </span>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem' }}>{phase.title}</h3>
                      </div>
                      <p style={{ margin: '6px 0 0 0', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                        {phase.summary}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '110px' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: pDone === pTotal ? '#34d399' : '#fff' }}>
                        {pDone} / {pTotal} Tasks ({pPct}%)
                      </div>
                      <div style={{ height: '6px', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', marginTop: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${pPct}%`, height: '100%', background: phase.color, transition: 'width 0.3s ease' }} />
                      </div>
                    </div>
                  </div>

                  <div className="c2-checklist-grid">
                    {phase.tasks.map((task) => {
                      const isChecked = !!state.checkedTasks?.[task.id];
                      return (
                        <div
                          key={task.id}
                          className={`c2-check-item ${isChecked ? 'checked' : ''}`}
                          onClick={() => toggleCheck('checkedTasks', task.id)}
                        >
                          <div className="c2-checkbox">{isChecked ? '✓' : ''}</div>
                          <div className="c2-check-text">
                            <div className="c2-check-label">{task.label}</div>
                            <div className="c2-check-detail">{task.detail}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 16-Point Final Submission Pre-Flight Checklist */}
          <div className="c2-section-card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <h2 className="c2-section-title" style={{ margin: 0 }}>
                  <span>🛡️</span> 16-Point Pre-Flight Submission Checklist
                </h2>
                <p className="c2-section-desc" style={{ margin: '4px 0 0 0' }}>
                  Do not submit your Component 1 audio and Logbook PDF until all 16 checks below are ticked green.
                </p>
              </div>
              <div style={{
                background: progressStats.preflightDone === progressStats.preflightTotal ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.15)',
                border: `1px solid ${progressStats.preflightDone === progressStats.preflightTotal ? '#10b981' : '#38bdf8'}`,
                color: progressStats.preflightDone === progressStats.preflightTotal ? '#34d399' : '#38bdf8',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                {progressStats.preflightDone} / {progressStats.preflightTotal} Verified
              </div>
            </div>

            <div className="c2-checklist-grid">
              {C1_MASTER_CHECKLIST.map((item) => {
                const isChecked = !!state.checkedPreflight?.[item.id];
                return (
                  <div
                    key={item.id}
                    className={`c2-check-item ${isChecked ? 'checked' : ''}`}
                    onClick={() => toggleCheck('checkedPreflight', item.id)}
                  >
                    <div className="c2-checkbox">{isChecked ? '✓' : ''}</div>
                    <div className="c2-check-text">
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: '#38bdf8',
                        letterSpacing: '0.5px',
                        display: 'block',
                        marginBottom: '2px'
                      }}>
                        {item.category}
                      </span>
                      <div className="c2-check-label">{item.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
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
