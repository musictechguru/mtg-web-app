import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useUser } from '../../contexts/UserContext';
import './Component2Guide.css';
import {
  OVERVIEW_SPECS,
  BRIEF_OPTIONS,
  MARK_SCHEME_DETAILED,
  MUSICALITY_PILLARS,
  STIMULUS_CHECKLIST,
  SUGGESTED_GENRES,
  WORKFLOW_PHASES,
  TECHNIQUES_BANK,
  MIXING_GUIDELINES,
  LOGBOOK_REQUIREMENTS,
  LOGBOOK_WRITING_EXAMPLES,
  MASTER_CHECKLIST,
  RESOURCE_LINKS
} from './component2Data';
import StudentMarkSchemeModal from '../StudentMarkSchemeModal';
import PremiumLocked from '../PremiumLocked';

const STORAGE_KEY = 'mtg_component2_guide_state_v2';

const DEFAULT_STATE = {
  selectedBrief: 'brief2',
  selectedGenreId: 'synthpop',
  selectedMusicality: ['melody', 'texture', 'form'],
  stimulusInfo: {
    trackTitle: '',
    artist: '',
    bpm: '',
    keySignature: '',
    genre: 'Synth-Pop / Electropop / Nu-Disco',
    notes: ''
  },
  checkedItems: {}, // stores boolean flags for mark scheme elements, stimulus, phases, mix, logbook reqs, master checklist
  completedTechniques: {}, // stores boolean flags for syn_1..8, smp_1..8, fx_1..8
  techniqueNotes: {}, // stores custom logbook text per technique id or musicality id
  sampleCredits: [
    { id: 'sc_1', name: '', source: '', manipulation: '', bars: '' }
  ]
};

const Component2Guide = ({ onBack, embeddedInTeacher = false }) => {
  const { userProgress, saveComponent2Progress, currentUser } = useUser() || {};
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'musicality' | 'synthesis' | 'sampling' | 'effects' | 'mixing' | 'workflow'
  const [techSearch, setTechSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showMarkSchemeModal, setShowMarkSchemeModal] = useState(false);
  const [openNoteIds, setOpenNoteIds] = useState({});
  const [expandedMsCodes, setExpandedMsCodes] = useState({});
  const isInitialMount = useRef(true);

  const [guideState, setGuideState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('mtg_component2_guide_state_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          stimulusInfo: { ...DEFAULT_STATE.stimulusInfo, ...(parsed.stimulusInfo || {}) }
        };
      }
      if (userProgress?.component2Guide) {
        return {
          ...DEFAULT_STATE,
          ...userProgress.component2Guide,
          stimulusInfo: { ...DEFAULT_STATE.stimulusInfo, ...(userProgress.component2Guide.stimulusInfo || {}) }
        };
      }
    } catch (e) {
      console.warn('Failed to load Component 2 guide state:', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guideState));
    } catch (e) {
      console.warn('Failed to save Component 2 guide state:', e);
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (saveComponent2Progress && !userProgress?.component2Guide) {
        saveComponent2Progress(guideState);
      }
      return;
    }

    if (saveComponent2Progress) {
      const timer = setTimeout(() => {
        saveComponent2Progress(guideState);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [guideState]);

  const switchTab = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCheckItem = (id) => {
    setGuideState(prev => {
      const next = {
        ...prev,
        checkedItems: {
          ...prev.checkedItems,
          [id]: !prev.checkedItems[id]
        }
      };
      if (saveComponent2Progress) saveComponent2Progress(next);
      return next;
    });
  };

  const toggleTechnique = (id) => {
    setGuideState(prev => {
      const next = {
        ...prev,
        completedTechniques: {
          ...prev.completedTechniques,
          [id]: !prev.completedTechniques[id]
        }
      };
      if (saveComponent2Progress) saveComponent2Progress(next);
      return next;
    });
  };

  const updateTechniqueNote = (id, text) => {
    setGuideState(prev => ({
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

  const selectGenreCard = (genreObj) => {
    setGuideState(prev => {
      const next = {
        ...prev,
        selectedGenreId: genreObj.id,
        stimulusInfo: {
          ...prev.stimulusInfo,
          genre: genreObj.genre
        }
      };
      if (saveComponent2Progress) saveComponent2Progress(next);
      return next;
    });
  };

  const toggleMusicalityPillar = (pillarId) => {
    setGuideState(prev => {
      const current = prev.selectedMusicality || [];
      let nextMusicality;
      if (current.includes(pillarId)) {
        nextMusicality = current.filter(id => id !== pillarId);
      } else if (current.length >= 3) {
        nextMusicality = [...current.slice(1), pillarId];
      } else {
        nextMusicality = [...current, pillarId];
      }
      const next = { ...prev, selectedMusicality: nextMusicality };
      if (saveComponent2Progress) saveComponent2Progress(next);
      return next;
    });
  };

  const updateStimulusField = (field, value) => {
    setGuideState(prev => ({
      ...prev,
      stimulusInfo: {
        ...prev.stimulusInfo,
        [field]: value
      }
    }));
  };

  const addSampleCreditRow = () => {
    setGuideState(prev => ({
      ...prev,
      sampleCredits: [
        ...(prev.sampleCredits || []),
        { id: `sc_${Date.now()}`, name: '', source: '', manipulation: '', bars: '' }
      ]
    }));
  };

  const updateSampleCreditRow = (id, field, value) => {
    setGuideState(prev => ({
      ...prev,
      sampleCredits: (prev.sampleCredits || []).map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    }));
  };

  const removeSampleCreditRow = (id) => {
    setGuideState(prev => ({
      ...prev,
      sampleCredits: (prev.sampleCredits || []).filter(row => row.id !== id)
    }));
  };

  // Calculate progress across all sections
  const progressStats = useMemo(() => {
    const msElementIds = MARK_SCHEME_DETAILED.flatMap(m => m.elementsChecklist.map(e => e.id));
    const msDone = msElementIds.filter(id => guideState.checkedItems[id]).length;

    const workflowIds = WORKFLOW_PHASES.flatMap(p => p.tasks.map(t => t.id));
    const workflowDone = workflowIds.filter(id => guideState.checkedItems[id]).length;

    const techIds = TECHNIQUES_BANK.map(t => t.id);
    const techDone = techIds.filter(id => guideState.completedTechniques[id]).length;

    const synDone = TECHNIQUES_BANK.filter(t => t.category === 'synthesis' && guideState.completedTechniques[t.id]).length;
    const smpDone = TECHNIQUES_BANK.filter(t => t.category === 'sampling' && guideState.completedTechniques[t.id]).length;
    const fxDone = TECHNIQUES_BANK.filter(t => t.category === 'effects' && guideState.completedTechniques[t.id]).length;

    const mixIds = MIXING_GUIDELINES.flatMap(g => g.items.map(i => i.id));
    const mixDone = mixIds.filter(id => guideState.checkedItems[id]).length;

    const logbookIds = LOGBOOK_REQUIREMENTS.map(l => l.id);
    const logbookDone = logbookIds.filter(id => guideState.checkedItems[id]).length;

    const masterIds = MASTER_CHECKLIST.map(m => m.id);
    const masterDone = masterIds.filter(id => guideState.checkedItems[id]).length;

    const stimIds = STIMULUS_CHECKLIST.map(s => s.id);
    const stimDone = stimIds.filter(id => guideState.checkedItems[id]).length;

    const totalItems = msElementIds.length + workflowIds.length + techIds.length + mixIds.length + masterIds.length;
    const totalDone = msDone + workflowDone + techDone + mixDone + masterDone;
    const overallPercent = Math.round((totalDone / (totalItems || 1)) * 100);

    return {
      msDone,
      msTotal: msElementIds.length,
      workflowDone,
      workflowTotal: workflowIds.length,
      techDone,
      techTotal: techIds.length,
      synDone,
      smpDone,
      fxDone,
      mixDone,
      mixTotal: mixIds.length,
      logbookDone,
      logbookTotal: logbookIds.length,
      masterDone,
      masterTotal: masterIds.length,
      stimDone,
      stimTotal: stimIds.length,
      overallPercent
    };
  }, [guideState]);

  const copyTextToClipboard = (text, idKey) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idKey);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const buildFullLogbookExport = () => {
    const briefObj = BRIEF_OPTIONS.find(b => b.id === guideState.selectedBrief) || BRIEF_OPTIONS[0];
    const genreObj = SUGGESTED_GENRES.find(g => g.id === guideState.selectedGenreId);
    const musicalityNames = MUSICALITY_PILLARS
      .filter(m => (guideState.selectedMusicality || []).includes(m.id))
      .map(m => `${m.code}: ${m.name}`)
      .join(', ');

    const { trackTitle, artist, bpm, keySignature, genre, notes } = guideState.stimulusInfo;

    const synEntries = TECHNIQUES_BANK.filter(
      t => t.category === 'synthesis' && (guideState.completedTechniques[t.id] || guideState.techniqueNotes[t.id])
    );
    const smpEntries = TECHNIQUES_BANK.filter(
      t => t.category === 'sampling' && (guideState.completedTechniques[t.id] || guideState.techniqueNotes[t.id])
    );
    const fxEntries = TECHNIQUES_BANK.filter(
      t => t.category === 'effects' && (guideState.completedTechniques[t.id] || guideState.techniqueNotes[t.id])
    );

    const lines = [
      '# EDEXCEL A-LEVEL MUSIC TECHNOLOGY (9MT0)',
      '## COMPONENT 2: TECHNOLOGY-BASED COMPOSITION — LOGBOOK DOSSIER',
      '',
      '### 1. Brief, Target Style/Genre & Stimulus Track',
      `- **Chosen Brief**: ${briefObj.title}`,
      `- **Target Style / Genre**: ${genre || genreObj?.genre || '[Genre]'}`,
      `- **Target Musicality Focus (Best 3 of 5)**: ${musicalityNames || 'AG7 Melody, AG10 Texture, AG11 Form & Structure'}`,
      `- **Stimulus / Reference Track**: ${trackTitle || '[Track Title]'} by ${artist || '[Artist]'}`,
      `- **Project Tempo & Key**: ${bpm || '[BPM]'} BPM | Key: ${keySignature || '[Key]'}`,
      notes ? `- **Stimulus Analysis Notes**: ${notes}` : '',
      '',
      '### 2. AG1: Synthesis Techniques (8 Marks)',
      synEntries.length > 0
        ? synEntries.map(t => `- **${t.title}**: ${guideState.techniqueNotes[t.id] || t.templatePlaceholder}`).join('\n')
        : '- [Tick or fill in Synthesis techniques in the AG1 Synthesis tab]',
      '',
      '### 3. AG2: Sampling & Audio Manipulation (8 Marks)',
      smpEntries.length > 0
        ? smpEntries.map(t => `- **${t.title}**: ${guideState.techniqueNotes[t.id] || t.templatePlaceholder}`).join('\n')
        : '- [Tick or fill in Sampling techniques in the AG2 Sampling tab]',
      '',
      '### 4. AG3: Creative Effects & Automation (8 Marks)',
      fxEntries.length > 0
        ? fxEntries.map(t => `- **${t.title}**: ${guideState.techniqueNotes[t.id] || t.templatePlaceholder}`).join('\n')
        : '- [Tick or fill in Creative FX techniques in the AG3 Creative FX tab]',
      '',
      '### 5. AG5–AG11: Musicality, Style & Brief Development',
      ...MUSICALITY_PILLARS.map(p => {
        const customNote = guideState.techniqueNotes[`mus_${p.id}`];
        const isBest3 = (guideState.selectedMusicality || []).includes(p.id);
        if (!customNote && !isBest3) return null;
        return `- **${p.code} ${p.name}${isBest3 ? ' (Top 3 Focus)' : ''}**: ${customNote || p.logicExample}`;
      }).filter(Boolean),
      '',
      '### 6. Mandatory Sample & Performer Credits',
      ...(guideState.sampleCredits || [])
        .filter(r => r.name || r.source)
        .map((r, i) => `${i + 1}. **Sample/Part**: ${r.name || 'N/A'} | **Source/Credit**: ${r.source || 'N/A'} | **Manipulation**: ${r.manipulation || 'N/A'} | **Bars**: ${r.bars || 'N/A'}`)
    ];

    return lines.filter(l => l !== null).join('\n');
  };

  const handleResetGuide = () => {
    if (window.confirm('Reset all Component 2 tick lists and logbook notes? This cannot be undone.')) {
      setGuideState(DEFAULT_STATE);
      localStorage.removeItem(STORAGE_KEY);
      if (saveComponent2Progress) saveComponent2Progress(DEFAULT_STATE);
    }
  };

  // Shared Renderer for the 8 Detailed Technique Cards (Decluttered with Collapsible Logbook Notes)
  const renderTechniqueSection = (categoryKey, sectionTitle, sectionSubtitle, accentColor, extraBanner = null) => {
    const items = TECHNIQUES_BANK.filter(t => {
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

    const totalCategory = TECHNIQUES_BANK.filter(t => t.category === categoryKey).length;
    const doneCategory = TECHNIQUES_BANK.filter(t => t.category === categoryKey && guideState.completedTechniques[t.id]).length;

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
                {doneCategory} / {totalCategory} Used in Track
              </span>
            </div>
          </div>

          {extraBanner}
        </div>

        <div className="c2-tech-detailed-list">
          {items.map((tech) => {
            const isCompleted = !!guideState.completedTechniques[tech.id];
            const noteValue = guideState.techniqueNotes[tech.id] || '';
            const isNoteOpen = Boolean(openNoteIds[tech.id] || noteValue.trim());

            return (
              <div
                key={tech.id}
                className={`c2-tech-detailed-card ${isCompleted ? 'completed' : ''}`}
                style={{ borderTop: `3px solid ${isCompleted ? '#10b981' : accentColor}` }}
              >
                {/* Top Header */}
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
                        {tech.categoryLabel} • Example #{tech.number}
                      </span>
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
                          ✓ USED IN TRACK
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.28rem', color: '#fff', fontWeight: 800 }}>
                      {tech.number}. {tech.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
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
                      onClick={() => toggleTechnique(tech.id)}
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

                {/* 2-Column Body: Visual Diagram + Parameter Recipes (Left) | Steps & Logbook Note (Right) */}
                <div className="c2-tech-body-grid">
                  <div>
                    {tech.image && (
                      <div className="c2-tech-image-box" style={{ marginBottom: '12px' }}>
                        <img src={tech.image} alt={tech.title} loading="lazy" />
                        <div className="c2-tech-image-caption">{tech.imageCaption}</div>
                      </div>
                    )}

                    {tech.recipes && tech.recipes.length > 0 && (
                      <div className="c2-recipes-box">
                        <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
                          🎛️ Exact Parameter Recipes (Logic Pro X):
                        </div>
                        {tech.recipes.map((r, rIdx) => (
                          <div key={rIdx} style={{ marginBottom: rIdx < tech.recipes.length - 1 ? '6px' : 0, fontSize: '0.8rem', lineHeight: 1.4 }}>
                            <span style={{ color: '#fff', fontWeight: 700 }}>• {r.name}: </span>
                            <span style={{ color: '#cbd5e1', fontFamily: 'monospace', fontSize: '0.78rem' }}>{r.settings}</span>
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
                        Step-by-Step in Logic Pro X:
                      </div>
                      <ol className="c2-tech-steps" style={{ margin: 0 }}>
                        {tech.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div className="c2-logbook-prompt" style={{ marginBottom: isNoteOpen ? '10px' : 0 }}>
                      <strong>📝 Logbook Checklist:</strong> {tech.logbookPrompt}
                    </div>

                    {/* Collapsible Logbook Note Editor */}
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

  if (!currentUser?.is_premium && !embeddedInTeacher) {
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
        <PremiumLocked itemTitle="Component 2: Composition Guide & Logbook" />
      </div>
    );
  }

  return (
    <div className="c2-guide-container">
      {/* Top Bar */}
      <div className="c2-top-bar">
        {!embeddedInTeacher ? (
          <button className="c2-back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>
        ) : (
          <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontWeight: 600 }}>
            🎓 Teacher Interactive Component 2 Guide & Classroom Reference
          </div>
        )}
        <div className="c2-top-actions">
          <button
            className="c2-action-btn"
            style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', border: 'none' }}
            onClick={() => setShowMarkSchemeModal(true)}
          >
            🏆 Mark Scheme Tick List (60m)
          </button>
          <button
            className="c2-action-btn"
            onClick={() => copyTextToClipboard(buildFullLogbookExport(), 'full_export')}
          >
            {copiedId === 'full_export' ? '✅ Copied Full Logbook Dossier!' : '📋 Copy Full Logbook Dossier'}
          </button>
          <button className="c2-action-btn secondary" onClick={handleResetGuide}>
            ↺ Reset All Tick Lists
          </button>
        </div>
      </div>

      {/* Clean, Compact Hero HUD */}
      <div className="c2-hud">
        <div className="c2-hud-top">
          <div className="c2-hud-title">
            <span style={{
              fontSize: '0.73rem',
              fontWeight: '800',
              background: 'rgba(244, 114, 182, 0.2)',
              color: '#f472b6',
              border: '1px solid rgba(244, 114, 182, 0.45)',
              padding: '3px 10px',
              borderRadius: '6px',
              letterSpacing: '0.6px'
            }}>
              EDEXCEL A-LEVEL 9MT0 • COMPONENT 2 (60 MARKS • 3:00 DURATION)
            </span>
            <h1>Technology-Based Composition Guide</h1>
            <p className="c2-hud-subtitle">
              Choose your Brief & recommended Style/Genre, follow the 24 Logic Pro X synthesis, sampling & FX techniques, and tick off your coursework progress.
            </p>
          </div>

          {/* Clickable Quick-Jump HUD Badges */}
          <div className="c2-hud-badges">
            <div className="c2-stat-badge" onClick={() => switchTab('synthesis')} title="Jump to AG1 Synthesis Examples">
              <span className="c2-stat-icon">🎹</span>
              <div className="c2-stat-info">
                <span className="c2-stat-label">AG1 Synthesis</span>
                <span className="c2-stat-val" style={{ color: '#38bdf8' }}>{progressStats.synDone} / 8</span>
              </div>
            </div>
            <div className="c2-stat-badge" onClick={() => switchTab('sampling')} title="Jump to AG2 Sampling Examples">
              <span className="c2-stat-icon">✂️</span>
              <div className="c2-stat-info">
                <span className="c2-stat-label">AG2 Sampling</span>
                <span className="c2-stat-val" style={{ color: '#c084fc' }}>{progressStats.smpDone} / 8</span>
              </div>
            </div>
            <div className="c2-stat-badge" onClick={() => switchTab('effects')} title="Jump to AG3 Creative FX Examples">
              <span className="c2-stat-icon">🎛️</span>
              <div className="c2-stat-info">
                <span className="c2-stat-label">AG3 Creative FX</span>
                <span className="c2-stat-val" style={{ color: '#f472b6' }}>{progressStats.fxDone} / 8</span>
              </div>
            </div>
            <div className="c2-stat-badge" onClick={() => switchTab('musicality')} title="Jump to Mark Scheme Checklist">
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
            <span style={{ color: '#94a3b8' }}>Overall Component 2 Coursework & Technique Completion</span>
            <span style={{ color: '#34d399' }}>{progressStats.overallPercent}% Complete</span>
          </div>
          <div className="c2-progress-track" style={{ position: 'relative', overflow: 'visible' }}>
            <div className="c2-progress-fill" style={{ width: `${progressStats.overallPercent}%` }} />
            {[
              { pct: 0, label: 'Brief & Style' },
              { pct: 20, label: 'P1: Setup' },
              { pct: 40, label: 'P2: Parts' },
              { pct: 60, label: 'P3: AG1–3 Tech' },
              { pct: 80, label: 'P4: AG4 Mix' },
              { pct: 100, label: 'P5: Submit' }
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

      {/* Clean Step-by-Step 7-Tab Navigation Bar */}
      <div className="c2-tabs-bar">
        <button
          className={`c2-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => switchTab('overview')}
        >
          <span>🧭</span> 1. Brief, Styles & Stimulus
        </button>
        <button
          className={`c2-tab-btn ${activeTab === 'musicality' ? 'active' : ''}`}
          onClick={() => switchTab('musicality')}
        >
          <span>📊</span> 2. Mark Scheme & Musicality
          <span className="c2-tab-count">{progressStats.msDone}/{progressStats.msTotal}</span>
        </button>
        <button
          className={`c2-tab-btn ${activeTab === 'synthesis' ? 'active' : ''}`}
          onClick={() => switchTab('synthesis')}
        >
          <span>🎹</span> 3. Synthesis (8)
          <span className="c2-tab-count">{progressStats.synDone}/8</span>
        </button>
        <button
          className={`c2-tab-btn ${activeTab === 'sampling' ? 'active' : ''}`}
          onClick={() => switchTab('sampling')}
        >
          <span>✂️</span> 4. Sampling (8)
          <span className="c2-tab-count">{progressStats.smpDone}/8</span>
        </button>
        <button
          className={`c2-tab-btn ${activeTab === 'effects' ? 'active' : ''}`}
          onClick={() => switchTab('effects')}
        >
          <span>🎛️</span> 5. Creative FX (8)
          <span className="c2-tab-count">{progressStats.fxDone}/8</span>
        </button>
        <button
          className={`c2-tab-btn ${activeTab === 'mixing' ? 'active' : ''}`}
          onClick={() => switchTab('mixing')}
        >
          <span>🎚️</span> 6. Mix & Logbook
          <span className="c2-tab-count">{progressStats.mixDone}/{progressStats.mixTotal}</span>
        </button>
        <button
          className={`c2-tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => switchTab('workflow')}
        >
          <span>✅</span> 7. 5-Phase & Final Check
          <span className="c2-tab-count">{progressStats.masterDone}/{progressStats.masterTotal}</span>
        </button>
      </div>

      {/* =========================================================
          TAB 1: BRIEF SELECTION, RECOMMENDED STYLES/GENRES & STIMULUS
          ========================================================= */}
      {activeTab === 'overview' && (
        <div>
          {/* Core Specifications Strip */}
          <div className="c2-specs-grid">
            {OVERVIEW_SPECS.map((spec, idx) => (
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

          {/* STEP 1: CHOOSING YOUR BRIEF (Brief 2 & Brief 3 Recommended) */}
          <div className="c2-section-card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '6px' }}>
              <h2 className="c2-section-title" style={{ margin: 0 }}>
                <span>🧭</span> Step 1: Choose Your Brief (Brief 2 & Brief 3 Strongly Recommended)
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>
                Click a card to select your brief
              </span>
            </div>
            <p className="c2-section-desc">
              We strongly advise choosing <strong>Brief 2 (Song / Text-Based)</strong> or <strong>Brief 3 (Topic / Stimulus-Based)</strong> rather than Brief 1 (Video), so your musical structure, tempo, and sound design aren't restricted by rigid video hit-points.
            </p>

            <div className="c2-briefs-grid">
              {BRIEF_OPTIONS.map((brief) => {
                const isSelected = guideState.selectedBrief === brief.id;
                return (
                  <div
                    key={brief.id}
                    className={`c2-brief-card ${brief.badgeType} ${isSelected ? 'selected-brief' : ''}`}
                    onClick={() => setGuideState(prev => ({ ...prev, selectedBrief: brief.id }))}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span className={`c2-brief-badge ${brief.badgeType}`}>
                          {brief.badge}
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
                            ✓ SELECTED BRIEF
                          </span>
                        )}
                      </div>

                      <h3 style={{ margin: '4px 0', color: '#fff', fontSize: '1.15rem' }}>{brief.title}</h3>
                      <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600, marginBottom: '8px' }}>
                        {brief.subtitle}
                      </div>
                      <p style={{ margin: '0 0 10px 0', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {brief.summary}
                      </p>

                      <ul className="c2-brief-list">
                        {brief.pros.slice(0, 3).map((pro, i) => (
                          <li key={i} style={{ fontSize: '0.82rem' }}>{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={`c2-critical-box ${brief.badgeType === 'recommended' ? 'danger' : 'amber'}`} style={{ fontSize: '0.78rem', padding: '10px 12px' }}>
                      {brief.criticalRule}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: RECOMMENDED STYLES & GENRES FOR COMPONENT 2 (PROMINENT & INTERACTIVE) */}
          <div className="c2-section-card" style={{ borderTop: '4px solid #f472b6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '6px' }}>
              <div>
                <h2 className="c2-section-title" style={{ margin: 0 }}>
                  <span>🎶</span> Step 2: Best Styles & Genres for Component 2 (AG6 Style & Coherence)
                </h2>
              </div>
              <span style={{
                background: 'rgba(244, 114, 182, 0.18)',
                border: '1px solid rgba(244, 114, 182, 0.45)',
                color: '#f472b6',
                padding: '5px 12px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 800
              }}>
                Click your target style to set your project genre
              </span>
            </div>
            <p className="c2-section-desc">
              Component 2 specifically rewards <strong>Technology-Based Composition</strong>: custom synthesis (`AG1`), creative audio sampling (`AG2`), and dynamic effects automation (`AG3`). Purely acoustic/unprocessed genres make it hard to access top technical marks. The <strong>6 styles & genres below</strong> are the best choices for scoring Band 4 marks:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '16px' }}>
              {SUGGESTED_GENRES.map((g) => {
                const isSelectedGenre = guideState.selectedGenreId === g.id || guideState.stimulusInfo.genre === g.genre;
                return (
                  <div
                    key={g.id}
                    onClick={() => selectGenreCard(g)}
                    style={{
                      background: isSelectedGenre ? `${g.color}14` : 'rgba(15, 23, 42, 0.75)',
                      border: isSelectedGenre ? `2px solid ${g.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '18px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '12px',
                      boxShadow: isSelectedGenre ? `0 8px 24px ${g.color}25` : 'none'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 9px',
                          borderRadius: '6px',
                          background: `${g.color}22`,
                          color: g.color,
                          border: `1px solid ${g.color}50`
                        }}>
                          {g.badge}
                        </span>
                        {isSelectedGenre && (
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            background: '#10b981',
                            color: '#0f172a',
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}>
                            ✓ TARGET STYLE
                          </span>
                        )}
                      </div>

                      <h3 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{g.icon}</span> {g.genre}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: g.color, fontWeight: 700, marginBottom: '8px' }}>
                        ⏱️ {g.bpm} • {g.bestForBriefs}
                      </div>

                      <p style={{ margin: '0 0 12px 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                        {g.why}
                      </p>

                      {/* How this genre hits AG1, AG2, AG3 */}
                      <div style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        fontSize: '0.79rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <div>
                          <strong style={{ color: '#38bdf8' }}>🎹 AG1 Synthesis: </strong>
                          <span style={{ color: '#e2e8f0' }}>{g.ag1Fit}</span>
                        </div>
                        <div>
                          <strong style={{ color: '#c084fc' }}>✂️ AG2 Sampling: </strong>
                          <span style={{ color: '#e2e8f0' }}>{g.ag2Fit}</span>
                        </div>
                        <div>
                          <strong style={{ color: '#f472b6' }}>🎛️ AG3 Creative FX: </strong>
                          <span style={{ color: '#e2e8f0' }}>{g.ag3Fit}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      fontSize: '0.77rem',
                      color: '#94a3b8',
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      paddingTop: '8px'
                    }}>
                      <strong style={{ color: '#fff' }}>🎧 Reference Artists:</strong> {g.referenceArtists}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: STIMULUS TRACK SETUP & LOGGER */}
          <div className="c2-section-card" style={{ borderTop: '4px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
              <h2 className="c2-section-title" style={{ margin: 0 }}>
                <span>🎧</span> Step 3: Set Up Your Stimulus / Reference Track in Logic Pro X (-6dB Rule)
              </h2>
              <span style={{
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: 700
              }}>
                {progressStats.stimDone} / {progressStats.stimTotal} Setup Steps Completed
              </span>
            </div>
            <p className="c2-section-desc">
              Pick a commercial reference track from your chosen style/genre above and import it onto Track 1 of Logic Pro X at <strong>-6dB</strong> to guide your structure, arrangement markers, and mix balance.
            </p>

            {/* Stimulus Track Metadata Form */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.88rem', marginBottom: '10px' }}>
                📝 Log Your Stimulus Track & Genre Details (Included in Logbook Export)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                <input
                  className="c2-input-field"
                  placeholder="Stimulus Track Title..."
                  value={guideState.stimulusInfo.trackTitle}
                  onChange={e => updateStimulusField('trackTitle', e.target.value)}
                />
                <input
                  className="c2-input-field"
                  placeholder="Artist / Producer..."
                  value={guideState.stimulusInfo.artist}
                  onChange={e => updateStimulusField('artist', e.target.value)}
                />
                <input
                  className="c2-input-field"
                  placeholder="Tempo (e.g. 124 BPM)..."
                  value={guideState.stimulusInfo.bpm}
                  onChange={e => updateStimulusField('bpm', e.target.value)}
                />
                <input
                  className="c2-input-field"
                  placeholder="Key (e.g. C Minor)..."
                  value={guideState.stimulusInfo.keySignature}
                  onChange={e => updateStimulusField('keySignature', e.target.value)}
                />
                <input
                  className="c2-input-field"
                  placeholder="Target Style / Genre..."
                  value={guideState.stimulusInfo.genre}
                  onChange={e => updateStimulusField('genre', e.target.value)}
                />
              </div>
              <input
                className="c2-input-field"
                placeholder="Key production / structure ideas you are emulating from this stimulus track..."
                value={guideState.stimulusInfo.notes}
                onChange={e => updateStimulusField('notes', e.target.value)}
              />
            </div>

            <div className="c2-tick-list">
              {STIMULUS_CHECKLIST.map(item => {
                const checked = !!guideState.checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    className={`c2-tick-item ${checked ? 'checked' : ''}`}
                    onClick={() => toggleCheckItem(item.id)}
                  >
                    <div className="c2-checkbox">{checked ? '✓' : ''}</div>
                    <div className="c2-tick-text">
                      <div className="c2-tick-title">{item.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: MARK SCHEME (AG1–AG11) & MUSICALITY (BEST 3 OF 5)
          ========================================================= */}
      {activeTab === 'musicality' && (
        <div>
          {/* Complete Mark Scheme Breakdown (Clean & Collapsible Band Details) */}
          <div className="c2-section-card" style={{ borderTop: '4px solid #34d399' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
              <h2 className="c2-section-title" style={{ margin: 0 }}>
                <span>📊</span> Edexcel Component 2 Mark Scheme Breakdown (60 Marks Total)
              </h2>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                padding: '6px 14px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>
                {progressStats.msDone} / {progressStats.msTotal} Mark Scheme Elements Ticked
              </span>
            </div>
            <p className="c2-section-desc">
              Tick off each mark scheme element as you build your track. Click <strong>"View Level 1–4 Bands"</strong> on any criterion to inspect the exact marking descriptors.
            </p>

            <div className="c2-ms-detailed-list">
              {MARK_SCHEME_DETAILED.map((ms) => {
                const doneCount = ms.elementsChecklist.filter(e => guideState.checkedItems[e.id]).length;
                const isExpanded = !!expandedMsCodes[ms.code];
                return (
                  <div key={ms.code} className="c2-ms-card" style={{ borderLeft: `5px solid ${ms.color}`, padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <span style={{
                            background: `${ms.color}25`,
                            color: ms.color,
                            border: `1px solid ${ms.color}60`,
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            padding: '2px 9px',
                            borderRadius: '6px'
                          }}>
                            {ms.code} • {ms.marks} MARKS
                          </span>
                          <span style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>
                            {ms.category}
                          </span>
                        </div>
                        <h3 style={{ margin: '2px 0', fontSize: '1.2rem', color: '#fff' }}>
                          {ms.code}: {ms.title}
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                          {ms.summary}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => toggleMsBands(ms.code)}
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#cbd5e1',
                            padding: '7px 12px',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          {isExpanded ? 'Hide Level 1–4 Bands ▲' : 'View Level 1–4 Bands ▼'}
                        </button>
                        {ms.jumpTab !== 'musicality' && (
                          <button
                            onClick={() => switchTab(ms.jumpTab)}
                            style={{
                              background: `${ms.color}20`,
                              border: `1px solid ${ms.color}60`,
                              color: ms.color,
                              padding: '7px 12px',
                              borderRadius: '8px',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            Open {ms.code} Examples →
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <>
                        <div className="c2-ms-bands-grid" style={{ marginBottom: '12px' }}>
                          {ms.bands.map((b, bIdx) => (
                            <div
                              key={bIdx}
                              className="c2-ms-band-box"
                              style={{
                                borderTop: bIdx === ms.bands.length - 1 ? `2px solid ${ms.color}` : '1px solid rgba(255,255,255,0.08)',
                                background: bIdx === ms.bands.length - 1 ? `${ms.color}12` : 'rgba(30, 41, 59, 0.6)'
                              }}
                            >
                              <div style={{ fontWeight: 800, fontSize: '0.76rem', color: bIdx === ms.bands.length - 1 ? ms.color : '#cbd5e1', marginBottom: '4px' }}>
                                {b.level} {bIdx === ms.bands.length - 1 ? '⭐ Top Band' : ''}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                {b.desc}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{
                          background: 'rgba(56, 189, 248, 0.08)',
                          borderLeft: `3px solid ${ms.color}`,
                          padding: '9px 12px',
                          borderRadius: '6px',
                          fontSize: '0.82rem',
                          color: '#e2e8f0',
                          marginBottom: '12px',
                          lineHeight: 1.45
                        }}>
                          <strong>💡 Concrete High-Mark Example:</strong> {ms.realWorldExample}
                        </div>
                      </>
                    )}

                    {/* Tickable Sub-Elements for this Criterion */}
                    <div className="c2-tick-list">
                      {ms.elementsChecklist.map(el => {
                        const checked = !!guideState.checkedItems[el.id];
                        return (
                          <div
                            key={el.id}
                            className={`c2-tick-item ${checked ? 'checked' : ''}`}
                            onClick={() => toggleCheckItem(el.id)}
                            style={{ padding: '9px 12px' }}
                          >
                            <div className="c2-checkbox">{checked ? '✓' : ''}</div>
                            <div className="c2-tick-text">
                              <div className="c2-tick-title" style={{ fontSize: '0.86rem' }}>{el.text}</div>
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

          {/* AG7–AG11 Musicality Pillars (Best 3 out of 5 = 18 Marks) */}
          <div className="c2-section-card" style={{ borderTop: '4px solid #14b8a6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <div>
                <h2 className="c2-section-title" style={{ margin: 0 }}>
                  <span>🎼</span> AG7–AG11: Musicality Focus Selector (Best 3 out of 5 = 18 Marks)
                </h2>
                <p className="c2-section-desc" style={{ margin: '6px 0 0 0' }}>
                  Examiners mark all 5 Musicality criteria (6 marks each) and count your <strong>BEST 3 out of 5</strong>. Select your 3 primary pillars below:
                </p>
              </div>
              <span style={{
                background: 'rgba(20, 184, 166, 0.2)',
                border: '1px solid rgba(20, 184, 166, 0.5)',
                color: '#5eead4',
                padding: '8px 14px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.88rem'
              }}>
                {(guideState.selectedMusicality || []).length} / 3 Focus Pillars Selected
              </span>
            </div>

            <div className="c2-tech-detailed-list">
              {MUSICALITY_PILLARS.map((pillar) => {
                const isSelected = (guideState.selectedMusicality || []).includes(pillar.id);
                const noteKey = `mus_${pillar.id}`;
                const noteValue = guideState.techniqueNotes[noteKey] || '';
                const isNoteOpen = Boolean(openNoteIds[noteKey] || noteValue.trim());

                return (
                  <div
                    key={pillar.id}
                    className={`c2-tech-detailed-card ${isSelected ? 'completed' : ''}`}
                    style={{ borderTop: `3px solid ${isSelected ? '#14b8a6' : 'rgba(255,255,255,0.2)'}`, padding: '18px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
                      <div>
                        <span style={{
                          fontSize: '0.73rem',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '6px',
                          background: isSelected ? 'rgba(20, 184, 166, 0.25)' : 'rgba(255,255,255,0.08)',
                          color: isSelected ? '#5eead4' : '#94a3b8'
                        }}>
                          {pillar.code} • {pillar.marks} MARKS {isSelected ? '• ⭐ TOP 3 FOCUS' : ''}
                        </span>
                        <h3 style={{ margin: '6px 0 2px 0', fontSize: '1.22rem', color: '#fff' }}>
                          {pillar.code}: {pillar.name}
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                          {pillar.desc}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => toggleNoteEditor(noteKey)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid rgba(56, 189, 248, 0.4)',
                            background: isNoteOpen ? 'rgba(56, 189, 248, 0.18)' : 'rgba(15, 23, 42, 0.7)',
                            color: '#38bdf8',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          ✍️ {noteValue.trim() ? 'Edit Note' : '+ Logbook Note'}
                        </button>
                        <button
                          onClick={() => toggleMusicalityPillar(pillar.id)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '8px',
                            border: isSelected ? '1px solid #14b8a6' : '1px solid rgba(255,255,255,0.2)',
                            background: isSelected ? '#0d9488' : 'rgba(15, 23, 42, 0.8)',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                        >
                          {isSelected ? '★ Selected in Best 3' : '☆ Select as Top 3'}
                        </button>
                      </div>
                    </div>

                    <ul className="c2-tech-steps" style={{ margin: '0 0 10px 0' }}>
                      {pillar.detailedTips.map((tip, idx) => (
                        <li key={idx} style={{ fontSize: '0.84rem' }}>{tip}</li>
                      ))}
                    </ul>

                    {isNoteOpen && (
                      <div style={{ marginTop: '10px', background: 'rgba(15, 23, 42, 0.8)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>
                            ✍️ Your {pillar.name} Logbook Notes:
                          </span>
                          <button
                            onClick={() => updateTechniqueNote(noteKey, pillar.logicExample)}
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
                            Insert Example Template
                          </button>
                        </div>
                        <textarea
                          className="c2-note-textarea"
                          style={{ minHeight: '68px' }}
                          placeholder={pillar.logicExample}
                          value={noteValue}
                          onChange={e => updateTechniqueNote(noteKey, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: AG1 SYNTHESIS TECHNIQUES (8 DETAILED EXAMPLES)
          ========================================================= */}
      {activeTab === 'synthesis' && renderTechniqueSection(
        'synthesis',
        '🎹 AG1: Synthesis Techniques in Logic Pro X (8 Detailed Examples — 8 Marks)',
        'Demonstrate original patch design across multiple parts (ES2, Retro Synth, Alchemy, EFM1). Tick off each technique used and click "+ Add Logbook Note" to document your exact parameters.',
        '#38bdf8'
      )}

      {/* =========================================================
          TAB 4: AG2 SAMPLING & AUDIO MANIPULATION (8 DETAILED EXAMPLES)
          ========================================================= */}
      {activeTab === 'sampling' && renderTechniqueSection(
        'sampling',
        '✂️ AG2: Sampling & Audio Manipulation in Logic Pro X (8 Detailed Examples — 8 Marks)',
        'Use at least 6 distinct samples and demonstrate diverse manipulation techniques across Quick Sampler, multi-zone Sampler, Flex Time, and Flex Pitch.',
        '#c084fc',
        <div className="c2-critical-box danger">
          ⚠️ CRITICAL EXAMINER RULE: Every sample used (including Freesound, Splice, recorded performers, or AI-generated audio) MUST be credited with its source in your logbook!
        </div>
      )}

      {/* =========================================================
          TAB 5: AG3 CREATIVE EFFECTS & AUTOMATION (8 DETAILED EXAMPLES)
          ========================================================= */}
      {activeTab === 'effects' && renderTechniqueSection(
        'effects',
        '🎛️ AG3: Creative Effects & Automation in Logic Pro X (8 Detailed Examples — 8 Marks)',
        'Use spatial Aux bus routing, dynamic filter/FX automation, vocoding, and rhythmic processing to drive transitions and contrast.',
        '#f472b6'
      )}

      {/* =========================================================
          TAB 6: AG4 MIXING, MASTERING & LOGBOOK EXEMPLARS
          ========================================================= */}
      {activeTab === 'mixing' && (
        <div>
          <div className="c2-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
              <h2 className="c2-section-title" style={{ margin: 0 }}>
                <span>🎚️</span> AG4: Mix & Production Guidelines (6 Marks)
              </h2>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                padding: '5px 12px',
                borderRadius: '12px',
                fontSize: '0.84rem',
                fontWeight: 700
              }}>
                {progressStats.mixDone} / {progressStats.mixTotal} Mix Checks Done
              </span>
            </div>
            <p className="c2-section-desc">
              Work through each of the 4 mixing stages below. Each card includes the Logic Pro X reference view and interactive tick list:
            </p>

            <div className="c2-tech-detailed-list">
              {MIXING_GUIDELINES.map(group => {
                const done = group.items.filter(i => guideState.checkedItems[i.id]).length;
                return (
                  <div
                    key={group.id}
                    className="c2-tech-detailed-card"
                    style={{ borderTop: `3px solid ${group.color}` }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{group.icon}</span> {group.title}
                      </h3>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: group.color }}>
                        {done} / {group.items.length} Completed
                      </span>
                    </div>

                    <div className="c2-tech-body-grid">
                      {group.image && (
                        <div className="c2-tech-image-box">
                          <img src={group.image} alt={group.title} loading="lazy" />
                          <div className="c2-tech-image-caption">{group.imageCaption}</div>
                        </div>
                      )}
                      <div className="c2-tick-list">
                        {group.items.map(item => {
                          const checked = !!guideState.checkedItems[item.id];
                          return (
                            <div
                              key={item.id}
                              className={`c2-tick-item ${checked ? 'checked' : ''}`}
                              onClick={() => toggleCheckItem(item.id)}
                              style={{ padding: '10px 12px' }}
                            >
                              <div className="c2-checkbox">{checked ? '✓' : ''}</div>
                              <div className="c2-tick-text">
                                <div className="c2-tick-title" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                                  {item.text}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logbook Requirements & Writing Examples */}
          <div className="c2-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
              <h2 className="c2-section-title" style={{ margin: 0 }}>
                <span>📖</span> Logbook Requirements & Examiner Writing Exemplars
              </h2>
              <span style={{
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                padding: '5px 12px',
                borderRadius: '12px',
                fontSize: '0.84rem',
                fontWeight: 700
              }}>
                {progressStats.logbookDone} / {progressStats.logbookTotal} Logbook Sections Checked
              </span>
            </div>
            <p className="c2-section-desc">
              <strong>Your logbook is WHERE YOU GET MARKS.</strong> The examiner cannot award credit for synthesis, sampling, or automation techniques they cannot see clear technical evidence of.
            </p>

            <div className="c2-tick-list" style={{ marginBottom: '24px' }}>
              {LOGBOOK_REQUIREMENTS.map(req => {
                const checked = !!guideState.checkedItems[req.id];
                return (
                  <div
                    key={req.id}
                    className={`c2-tick-item ${checked ? 'checked' : ''}`}
                    onClick={() => toggleCheckItem(req.id)}
                  >
                    <div className="c2-checkbox">{checked ? '✓' : ''}</div>
                    <div className="c2-tick-text">
                      <div className="c2-tick-title">{req.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '12px' }}>
              🔍 Weak vs. Top-Band Logbook Entries (How to Write for Full Marks)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {LOGBOOK_WRITING_EXAMPLES.map((ex, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '14px'
                  }}
                >
                  <div style={{ fontWeight: 800, color: '#38bdf8', fontSize: '0.82rem', marginBottom: '8px', textTransform: 'uppercase' }}>
                    {ex.category}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '0.73rem', fontWeight: 800, color: '#f87171', marginBottom: '4px' }}>❌ WEAK ENTRY (Vague, low marks)</div>
                      <div style={{ fontSize: '0.83rem', color: '#fca5a5', fontStyle: 'italic' }}>{ex.weak}</div>
                    </div>
                    <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '0.73rem', fontWeight: 800, color: '#34d399', marginBottom: '4px' }}>✅ TOP-BAND ENTRY (Specific plugin, parameters & bars)</div>
                      <div style={{ fontSize: '0.83rem', color: '#d1fae5', lineHeight: 1.45 }}>{ex.strong}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Sample & Performer Credit Tracker */}
          <div className="c2-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
              <div>
                <h2 className="c2-section-title" style={{ margin: 0 }}>
                  <span>🧾</span> Mandatory Sample & Performer Credit Log
                </h2>
                <p className="c2-section-desc" style={{ margin: '4px 0 0 0' }}>
                  Credit every sample (Freesound, Splice, Logic Library, self-recorded, or AI-generated) and any contributing musicians here. Aim for at least 6 distinct samples!
                </p>
              </div>
              <button className="c2-action-btn" onClick={addSampleCreditRow}>
                + Add Sample / Credit Row
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(guideState.sampleCredits || []).map((row, idx) => (
                <div
                  key={row.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '32px 1.2fr 1.5fr 1.5fr 0.8fr auto',
                    gap: '10px',
                    alignItems: 'center',
                    background: 'rgba(15, 23, 42, 0.65)',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <span style={{ fontWeight: 800, color: '#38bdf8', fontSize: '0.85rem' }}>#{idx + 1}</span>
                  <input
                    className="c2-input-field"
                    placeholder="Sample / Audio File Name"
                    value={row.name}
                    onChange={e => updateSampleCreditRow(row.id, 'name', e.target.value)}
                  />
                  <input
                    className="c2-input-field"
                    placeholder="Source / Creator URL / Performer Credit"
                    value={row.source}
                    onChange={e => updateSampleCreditRow(row.id, 'source', e.target.value)}
                  />
                  <input
                    className="c2-input-field"
                    placeholder="Manipulation Used (e.g. Sliced, Flex Pitch -12st)"
                    value={row.manipulation}
                    onChange={e => updateSampleCreditRow(row.id, 'manipulation', e.target.value)}
                  />
                  <input
                    className="c2-input-field"
                    placeholder="Bars (e.g. 16–32)"
                    value={row.bars}
                    onChange={e => updateSampleCreditRow(row.id, 'bars', e.target.value)}
                  />
                  <button
                    onClick={() => removeSampleCreditRow(row.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      color: '#fca5a5',
                      borderRadius: '8px',
                      padding: '8px 10px',
                      cursor: 'pointer',
                      fontWeight: 700
                    }}
                    title="Remove row"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 7: 5-PHASE WORKFLOW, MASTER CHECKLIST & RESOURCES
          ========================================================= */}
      {activeTab === 'workflow' && (
        <div>
          {/* 5-Phase Workflow */}
          <div className="c2-section-card" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 className="c2-section-title" style={{ margin: 0 }}>
                  <span>🗺️</span> Step-by-Step 5-Phase Composition Workflow
                </h2>
                <p className="c2-section-desc" style={{ margin: '6px 0 0 0' }}>
                  Follow this structured 8-week production pipeline from initial stimulus analysis to final 16-bit/44.1kHz WAV bounce.
                </p>
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#34d399',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem'
              }}>
                {progressStats.workflowDone} / {progressStats.workflowTotal} Workflow Tasks Done
              </div>
            </div>
          </div>

          {WORKFLOW_PHASES.map((phase) => {
            const doneCount = phase.tasks.filter(t => guideState.checkedItems[t.id]).length;
            const totalCount = phase.tasks.length;
            const pct = Math.round((doneCount / totalCount) * 100);

            return (
              <div key={phase.id} className="c2-section-card" style={{ borderTop: `3px solid ${phase.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <span style={{
                      background: `${phase.color}25`,
                      color: phase.color,
                      border: `1px solid ${phase.color}60`,
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      textTransform: 'uppercase'
                    }}>
                      {phase.phaseNumber} • {phase.timing}
                    </span>
                    <h3 style={{ margin: '6px 0 4px 0', fontSize: '1.25rem', color: '#fff' }}>{phase.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>{phase.summary}</p>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '140px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: phase.color, marginBottom: '6px' }}>
                      {doneCount} / {totalCount} ({pct}%)
                    </div>
                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: phase.color, transition: 'width 0.3s ease' }} />
                    </div>
                  </div>
                </div>

                <div className="c2-tick-list">
                  {phase.tasks.map((task) => {
                    const checked = !!guideState.checkedItems[task.id];
                    return (
                      <div
                        key={task.id}
                        className={`c2-tick-item ${checked ? 'checked' : ''}`}
                        onClick={() => toggleCheckItem(task.id)}
                      >
                        <div className="c2-checkbox">{checked ? '✓' : ''}</div>
                        <div className="c2-tick-text">
                          <div className="c2-tick-title">{task.label}</div>
                          <div className="c2-tick-detail">{task.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Master 17-Point Checklist */}
          <div className="c2-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <div>
                <h2 className="c2-section-title" style={{ margin: 0 }}>
                  <span>🏁</span> Quick Reference Summary: Essential 17-Point Submission Checklist
                </h2>
                <p className="c2-section-desc" style={{ margin: '6px 0 0 0' }}>
                  Run through this final pre-flight checklist before exporting and submitting your Component 2 coursework.
                </p>
              </div>
              <div style={{
                background: progressStats.masterDone === progressStats.masterTotal ? 'rgba(16, 185, 129, 0.25)' : 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: progressStats.masterDone === progressStats.masterTotal ? '#34d399' : '#38bdf8',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: 800
              }}>
                {progressStats.masterDone} / {progressStats.masterTotal} Verified
              </div>
            </div>

            <div className="c2-tick-list">
              {MASTER_CHECKLIST.map(item => {
                const checked = !!guideState.checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    className={`c2-tick-item ${checked ? 'checked' : ''}`}
                    onClick={() => toggleCheckItem(item.id)}
                  >
                    <div className="c2-checkbox">{checked ? '✓' : ''}</div>
                    <div className="c2-tick-text">
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: '#38bdf8',
                        marginRight: '8px'
                      }}>
                        [{item.category}]
                      </span>
                      <span className="c2-tick-title" style={{ display: 'inline' }}>{item.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="c2-section-card">
            <h2 className="c2-section-title">
              <span>📚</span> Additional Resources, Sample Libraries & Tutorials
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
              {RESOURCE_LINKS.map((group, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '18px'
                  }}
                >
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{group.icon}</span> {group.group}
                  </h3>
                  <ul className="c2-brief-list" style={{ margin: 0 }}>
                    {group.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Official 60-Mark Scheme Tick List Modal */}
      <StudentMarkSchemeModal
        isOpen={showMarkSchemeModal}
        onClose={() => setShowMarkSchemeModal(false)}
        initialComponent="c2"
      />
    </div>
  );
};

export default Component2Guide;
