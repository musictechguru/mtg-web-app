import { useState, useEffect, useMemo } from 'react';
import { 
  Sliders, Mic2, Disc, FileText, CheckCircle2, AlertTriangle, 
  ExternalLink, Layers, Volume2, Cpu, Star, Radio, Zap, Activity,
  BarChart2, Table
} from 'lucide-react';

export default function LogbookDossierView({ data, daw, onOpenChecklistHub }) {
  if (!data) return null;

  const [activeInstIdx, setActiveInstIdx] = useState(0);
  const [faderViewMode, setFaderViewMode] = useState('meters'); // 'meters' | 'table' | 'split'

  const {
    trackName,
    artistName,
    daw: parsedDaw,
    audioInterface,
    monitoring,
    trackTable,
    instruments,
    mixStrategy,
    masterBus
  } = data;

  const currentDaw = daw || parsedDaw || 'Logic Pro';
  const activeInstrument = instruments && instruments.length > 0 ? instruments[activeInstIdx] : null;

  const trackStorageKey = useMemo(() => {
    const slug = `${trackName || 'default'}_${currentDaw}`.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    return `mtg_c1_dossier_ticks_${slug}`;
  }, [trackName, currentDaw]);

  const [dossierTicks, setDossierTicks] = useState(() => {
    try {
      const saved = localStorage.getItem(trackStorageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(trackStorageKey);
      setDossierTicks(saved ? JSON.parse(saved) : {});
    } catch {
      setDossierTicks({});
    }
  }, [trackStorageKey]);

  const toggleDossierTick = (id) => {
    setDossierTicks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(trackStorageKey, JSON.stringify(next));
      } catch (e) {
        console.warn('Could not save C1 dossier tick:', e);
      }
      return next;
    });
  };

  const dossierProgress = useMemo(() => {
    const allIds = [];
    (trackTable || []).forEach((_, idx) => allIds.push(`trk_${idx}`));
    (instruments || []).forEach((inst, idx) => {
      allIds.push(`inst_${idx}`);
      (inst.channelStrip || []).forEach((__, sIdx) => allIds.push(`inst_${idx}_slot_${sIdx}`));
    });
    if (mixStrategy?.faderHierarchy?.length || mixStrategy?.philosophy) allIds.push('mix_faders');
    if (mixStrategy?.frequencySeparation) allIds.push('mix_eq');
    if (mixStrategy?.dynamicControl) allIds.push('mix_dyn');
    if (mixStrategy?.spatialDepth) allIds.push('mix_fx');
    if (mixStrategy?.automation) allIds.push('mix_auto');
    (masterBus?.table || []).forEach((_, mIdx) => allIds.push(`master_${mIdx}`));

    const doneCount = allIds.filter(id => dossierTicks[id]).length;
    const totalCount = allIds.length;
    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
    return { doneCount, totalCount, pct };
  }, [trackTable, instruments, mixStrategy, masterBus, dossierTicks]);

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

  const getFaderTheme = (dbNum) => {
    const val = typeof dbNum === 'number' && !isNaN(dbNum) ? dbNum : 0;
    if (val >= -0.5) return { 
      badgeBg: 'rgba(239, 68, 68, 0.2)', 
      border: '#EF4444', 
      text: '#FCA5A5', 
      fillGradient: 'linear-gradient(90deg, #10B981 0%, #F59E0B 70%, #EF4444 100%)',
      glow: 'rgba(239, 68, 68, 0.4)' 
    };
    if (val >= -3.5) return { 
      badgeBg: 'rgba(56, 189, 248, 0.2)', 
      border: '#38BDF8', 
      text: '#7DD3FC', 
      fillGradient: 'linear-gradient(90deg, #10B981 0%, #0284C7 80%, #38BDF8 100%)',
      glow: 'rgba(56, 189, 248, 0.4)' 
    };
    if (val >= -6.5) return { 
      badgeBg: 'rgba(52, 211, 153, 0.2)', 
      border: '#34D399', 
      text: '#6EE7B7', 
      fillGradient: 'linear-gradient(90deg, #059669 0%, #10B981 80%, #34D399 100%)',
      glow: 'rgba(52, 211, 153, 0.4)' 
    };
    return { 
      badgeBg: 'rgba(192, 132, 252, 0.2)', 
      border: '#C084FC', 
      text: '#E9D5FF', 
      fillGradient: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 80%, #C084FC 100%)',
      glow: 'rgba(192, 132, 252, 0.4)' 
    };
  };

  const getFaderPct = (dbNum) => {
    const val = typeof dbNum === 'number' && !isNaN(dbNum) ? dbNum : -6.0;
    return Math.max(14, Math.min(100, Math.round(((val + 12) / 12) * 86 + 14)));
  };

  // Helper to parse embedded markdown table
  const parseMarkdownTable = (text) => {
    if (!text) return null;
    const tableMatch = text.match(/\|([^\n]+)\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
    if (!tableMatch) return null;
    
    const headers = tableMatch[1].split('|').map(c => c.trim()).filter(Boolean);
    const rows = tableMatch[2].trim().split('\n').map(row => 
      row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
    );

    const beforeText = text.substring(0, tableMatch.index).trim();
    const afterText = text.substring(tableMatch.index + tableMatch[0].length).trim();

    return {
      headers,
      rows,
      beforeText,
      afterText
    };
  };

  // Helper to highlight audio parameter tokens (frequencies, levels, ratios, times, BPM)
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

    const tableData = parseMarkdownTable(rawText);

    const renderNarrativeBlocks = (content) => {
      if (!content) return null;
      const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

      return lines.map((line, idx) => {
        const cleanLine = line.replace(/^[•*-]\s*/, '');

        // Check for Markdown Subheading (e.g. ##### Subgroup Processing & Bus Glue)
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

        // Check for Bold Title bullet: e.g. **Low-End Management (Kick vs. Bass):** text
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

        // Check for Numbered Step item: e.g. 1. *Drums Subgroup:* text or 1. **Drums Subgroup:** text
        const numStepMatch = cleanLine.match(/^(\d+)\.\s*(?:\*\*|\*)?([^*:]+)(?:\*\*|\*)?:?\s*(.*)$/);
        if (numStepMatch) {
          const num = numStepMatch[1];
          const stepTitle = numStepMatch[2].trim();
          const stepDesc = numStepMatch[3].trim();
          return (
            <div key={idx} className="logbook-mix-step-item">
              <span 
                className="logbook-mix-step-num"
                style={{ background: `${accentColor}25`, borderColor: `${accentColor}55`, color: accentColor }}
              >
                {num}
              </span>
              <div className="logbook-mix-step-content">
                <strong className="logbook-mix-step-title">{stepTitle}</strong>
                {stepDesc && (
                  <span className="logbook-mix-block-text">
                    {renderFormattedAudioText(stepDesc)}
                  </span>
                )}
              </div>
            </div>
          );
        }

        // Check for Italic Stem bullet: e.g. *Lead Vocal:* text
        const stemMatch = cleanLine.match(/^\*([^*]+)\*:?\s*(.*)$/);
        if (stemMatch) {
          const stemName = stemMatch[1].replace(/:$/, '').trim();
          const stemDesc = stemMatch[2].trim();
          return (
            <div key={idx} className="logbook-mix-stem-row">
              <span className="logbook-mix-stem-pill">{stemName}</span>
              <span className="logbook-mix-block-text">
                {renderFormattedAudioText(stemDesc)}
              </span>
            </div>
          );
        }

        // Standard paragraph
        return (
          <p key={idx} className="logbook-mix-block-text" style={{ margin: '0.2rem 0' }}>
            {renderFormattedAudioText(cleanLine.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1'))}
          </p>
        );
      });
    };

    return (
      <>
        {tableData?.beforeText && renderNarrativeBlocks(tableData.beforeText)}

        {tableData && (
          <div className="table-wrapper" style={{ margin: '0.5rem 0', borderRadius: '8px' }}>
            <table className="logbook-master-table" style={{ fontSize: '0.78rem' }}>
              <thead>
                <tr>
                  {tableData.headers.map((th, hIdx) => (
                    <th key={hIdx} style={{ padding: '6px 8px' }}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((rowCells, rIdx) => (
                  <tr key={rIdx}>
                    {rowCells.map((cell, cIdx) => {
                      const dbMatch = cell.match(/([-+]?\d+(?:\.\d+)?)\s*dB/i);
                      if (dbMatch) {
                        const dbVal = parseFloat(dbMatch[1]);
                        const theme = getFaderTheme(dbVal);
                        return (
                          <td key={cIdx} style={{ textAlign: 'center', padding: '5px 8px' }}>
                            <span 
                              className="logbook-fader-badge" 
                              style={{ background: theme.badgeBg, borderColor: theme.border, color: theme.text, fontSize: '0.7rem' }}
                            >
                              {cell}
                            </span>
                          </td>
                        );
                      }
                      if (/center|pan\s*\d|hard\s*[lr]/i.test(cell) && cell.length < 25) {
                        return (
                          <td key={cIdx} style={{ textAlign: 'center', padding: '5px 8px' }}>
                            <span className="logbook-pan-pill" style={{ fontSize: '0.7rem' }}>{cell}</span>
                          </td>
                        );
                      }
                      if (cIdx === 0) {
                        return (
                          <td key={cIdx} style={{ padding: '5px 8px' }}>
                            <strong style={{ color: '#F8FAFC' }}>{cell}</strong>
                          </td>
                        );
                      }
                      return (
                        <td key={cIdx} style={{ padding: '5px 8px', color: '#CBD5E1' }}>
                          {renderFormattedAudioText(cell)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tableData?.afterText && renderNarrativeBlocks(tableData.afterText)}

        {!tableData && renderNarrativeBlocks(rawText)}
      </>
    );
  };

  // Helper to parse transducer / microphone specifications from C1 logbook text
  const parseLogbookTransducer = (body, instName) => {
    if (!body) return null;

    let rawTransducer = '';
    let polarPattern = '';
    let placement = '';
    let gainStaging = '';

    const lines = body.split('\n');
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

    // Fallback to trackTable if rawTransducer was not in body
    if (!rawTransducer && trackTable && Array.isArray(trackTable)) {
      const matchedRow = trackTable.find(r => {
        const stemNorm = (r.stem || '').toLowerCase();
        const instNorm = (instName || '').toLowerCase();
        return stemNorm.includes(instNorm) || instNorm.includes(stemNorm);
      });
      if (matchedRow && matchedRow.inputSource) {
        rawTransducer = matchedRow.inputSource;
      }
    }

    if (!rawTransducer && !polarPattern && !placement) {
      return null;
    }

    // Detect polar pattern
    let cleanPolar = '';
    const searchPolarText = `${polarPattern} ${rawTransducer}`;
    if (/figure[- ]?8|bidirectional/i.test(searchPolarText)) cleanPolar = 'Figure-8';
    else if (/hyper[- ]?cardioid/i.test(searchPolarText)) cleanPolar = 'Hypercardioid';
    else if (/super[- ]?cardioid/i.test(searchPolarText)) cleanPolar = 'Supercardioid';
    else if (/omni(?:directional)?/i.test(searchPolarText)) cleanPolar = 'Omnidirectional';
    else if (/cardioid/i.test(searchPolarText)) cleanPolar = 'Cardioid';

    // Detect category & transducer class
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

    // Extract practical make & model
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

  const renderInputSourceCell = (sourceStr) => {
    if (!sourceStr) return null;
    const parenMatch = sourceStr.match(/\(([^)]+)\)/);
    const outside = sourceStr.replace(/\s*\([^)]+\)/g, '').trim();
    const inside = parenMatch ? parenMatch[1].replace(/^(?:e\.g\.?|i\.e\.?)\s*/i, '').trim() : '';

    if (inside) {
      return (
        <div className="logbook-table-source-wrap">
          <span className="logbook-table-source-cat">{outside}</span>
          <span className="logbook-table-source-pill">{inside}</span>
        </div>
      );
    }

    return <span style={{ color: '#DDD6FE' }}>{sourceStr}</span>;
  };

  // Helper to determine the specific capture pathway being used from the track list
  const getSelectedCaptureSolution = (inst) => {
    if (!inst) return null;

    // 1. Look up this instrument in the Section 2 trackTable
    let pathwayStr = '';
    if (trackTable && Array.isArray(trackTable)) {
      const matchedRow = trackTable.find(r => {
        const stemNorm = (r.stem || '').toLowerCase();
        const instNorm = (inst.name || '').toLowerCase();
        return stemNorm.includes(instNorm) || instNorm.includes(stemNorm);
      });
      if (matchedRow && matchedRow.pathway) {
        pathwayStr = matchedRow.pathway;
      }
    }

    // 2. Fall back to inst.preferredPathway if not found in trackTable
    if (!pathwayStr && inst.preferredPathway) {
      pathwayStr = inst.preferredPathway;
    }

    const norm = pathwayStr.toLowerCase();

    // Determine Pathway 1, 2, or 3 with precise boundary checks
    if (norm.includes('pathway 1') || /\bp1\b/.test(norm) || norm.includes('acoustic') || norm.includes('microphone')) {
      return {
        num: 1,
        title: 'Pathway 1: Acoustic / Microphone Capture',
        body: inst.pathway1 || inst.pathway2 || inst.pathway3
      };
    }
    if (norm.includes('pathway 3') || /\bp3\b/.test(norm) || norm.includes('midi') || norm.includes('software instrument') || norm.includes('audio instrument')) {
      return {
        num: 3,
        title: 'Pathway 3: Audio Instruments & MIDI',
        body: inst.pathway3 || inst.pathway2 || inst.pathway1
      };
    }
    if (norm.includes('pathway 2') || /\bp2\b/.test(norm) || norm.includes('direct injection') || /\bdi\b/.test(norm) || norm.includes('line input')) {
      return {
        num: 2,
        title: 'Pathway 2: Direct Injection (DI) & Line Input',
        body: inst.pathway2 || inst.pathway1 || inst.pathway3
      };
    }

    // Default fallback: Preferred pathway or whichever pathway has content
    if (inst.pathway1) return { num: 1, title: 'Pathway 1: Acoustic / Microphone Capture', body: inst.pathway1 };
    if (inst.pathway2) return { num: 2, title: 'Pathway 2: Direct Injection (DI) & Line Input', body: inst.pathway2 };
    if (inst.pathway3) return { num: 3, title: 'Pathway 3: Audio Instruments & MIDI', body: inst.pathway3 };

    return null;
  };

  return (
    <div className="logbook-dossier-container">
      {/* 1. Hero Examination & Production Metadata Card */}
      <div className="logbook-hero-card glass-panel" style={{ '--daw-accent': dawColor }}>
        <div className="logbook-hero-top">
          <div className="logbook-exam-pill">
            <Star size={14} fill="#FBBF24" color="#FBBF24" />
            <span>A-LEVEL MUSIC TECHNOLOGY • COMPONENT 1: RECORDING (9MT0/01)</span>
          </div>
          <div className="logbook-daw-badge" style={{ backgroundColor: `${dawColor}22`, borderColor: dawColor, color: dawColor }}>
            <Sliders size={14} />
            <span>{currentDaw}</span>
          </div>
        </div>

        <div className="logbook-hero-main">
          <div>
            <h1 className="logbook-track-title">{trackName || 'Component 1 Recording'}</h1>
            {artistName && <h2 className="logbook-artist-name">{artistName}</h2>}
            <p className="logbook-hero-desc">
              Complete Official Exam Recording Logbook with 3-Pathway Instrumental Solutions, Master Track Sheet, and {currentDaw} Channel Strip Insert Chains.
            </p>
          </div>

          <div className="logbook-hero-stats">
            <div className="logbook-stat-box">
              <span className="logbook-stat-label">AUDIO INTERFACE & CLOCK</span>
              <span className="logbook-stat-val">{audioInterface || '24-bit / 48 kHz Pro Audio Interface'}</span>
            </div>
            <div className="logbook-stat-box">
              <span className="logbook-stat-label">MONITORING ENVIRONMENT</span>
              <span className="logbook-stat-val">{monitoring || 'Calibrated Nearfield Monitors & Headphones'}</span>
            </div>
            <div className="logbook-stat-box">
              <span className="logbook-stat-label">COURSEWORK TARGET</span>
              <span className="logbook-stat-val" style={{ color: '#34D399' }}>Top-Band AO1 (Acoustic Capture)</span>
            </div>
          </div>
        </div>

        {/* Interactive Track Dossier Tick List Progress Bar */}
        {dossierProgress.totalCount > 0 && (
          <div style={{
            marginTop: '1.1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#34D399" />
                Session Tick List Progress for {trackName || 'This Track'}: <strong style={{ color: '#34D399' }}>{dossierProgress.doneCount} / {dossierProgress.totalCount} Steps Ticked ({dossierProgress.pct}%)</strong>
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {onOpenChecklistHub && (
                  <button
                    type="button"
                    onClick={onOpenChecklistHub}
                    style={{
                      background: 'rgba(168, 85, 247, 0.2)',
                      border: '1px solid rgba(192, 132, 252, 0.45)',
                      color: '#E9D5FF',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    📊 Open Full 60-Mark C1 Mark Scheme &amp; Tick List Hub
                  </button>
                )}
                {dossierProgress.doneCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Reset session ticks for ${trackName || 'this track'}?`)) {
                        setDossierTicks({});
                        localStorage.removeItem(trackStorageKey);
                      }
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      color: '#94A3B8',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    ↺ Reset Track Ticks
                  </button>
                )}
              </div>
            </div>
            <div style={{ height: '10px', background: 'rgba(0, 0, 0, 0.45)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{
                width: `${dossierProgress.pct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #10b981 0%, #38bdf8 50%, #a855f7 100%)',
                transition: 'width 0.35s ease'
              }} />
            </div>
          </div>
        )}
      </div>

      {/* 2. Section 2: Master Track Sheet & Input Routing Matrix */}
      {trackTable && trackTable.length > 0 && (
        <div className="logbook-section-card glass-panel">
          <div className="logbook-sec-header">
            <div className="logbook-sec-title-wrap">
              <Activity size={20} color="#38BDF8" />
              <h3 className="logbook-sec-title">Section 2: Master Track Sheet & Input Routing Table</h3>
            </div>
            <span className="logbook-sec-pill">
              {trackTable.filter((_, idx) => dossierTicks[`trk_${idx}`]).length} / {trackTable.length} Channels Tracked
            </span>
          </div>

          <div className="table-wrapper">
            <table className="logbook-table">
              <thead>
                <tr>
                  <th style={{ width: '58px', textAlign: 'center' }}>TICK</th>
                  <th style={{ width: '45px', textAlign: 'center' }}>TRK #</th>
                  <th>STEM / INSTRUMENT</th>
                  <th>SELECTED PATHWAY</th>
                  <th>TRANSDUCER / INPUT SOURCE</th>
                  <th>DAW INPUT / TYPE</th>
                  <th style={{ textAlign: 'center' }}>PAN</th>
                  <th style={{ textAlign: 'center' }}>FADER</th>
                  <th style={{ textAlign: 'right' }}>HEADROOM</th>
                </tr>
              </thead>
              <tbody>
                {trackTable.map((row, idx) => {
                  const isTicked = !!dossierTicks[`trk_${idx}`];
                  return (
                    <tr
                      key={idx}
                      onClick={() => toggleDossierTick(`trk_${idx}`)}
                      style={{
                        cursor: 'pointer',
                        background: isTicked ? 'rgba(16, 185, 129, 0.08)' : undefined,
                        transition: 'background 0.2s ease'
                      }}
                      title="Click row to tick/untick this channel as recorded"
                    >
                      <td style={{ textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          border: isTicked ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.25)',
                          background: isTicked ? '#10b981' : 'rgba(15, 23, 42, 0.6)',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.78rem'
                        }}>
                          {isTicked ? '✓' : ''}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="logbook-trk-pill">{row.trackNo}</span>
                      </td>
                      <td>
                        <strong style={{ color: isTicked ? '#6EE7B7' : '#F8FAFC', textDecoration: isTicked ? 'line-through' : 'none' }}>
                          {row.stem}
                        </strong>
                      </td>
                      <td>
                        <span className={`logbook-pathway-pill ${row.pathway.includes('1') ? 'p1' : row.pathway.includes('2') ? 'p2' : 'p3'}`}>
                          {row.pathway}
                        </span>
                      </td>
                      <td>
                        {renderInputSourceCell(row.inputSource)}
                      </td>
                      <td style={{ fontSize: '0.82rem', color: '#94A3B8' }}>{row.dawInput}</td>
                      <td style={{ textAlign: 'center', color: '#38BDF8', fontWeight: 600 }}>{row.pan}</td>
                      <td style={{ textAlign: 'center', color: '#FBBF24', fontWeight: 600 }}>{row.fader}</td>
                      <td style={{ textAlign: 'right', color: '#34D399', fontWeight: 600 }}>{row.targetHeadroom}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Section 3: Interactive 3-Pathway Solutions Hub (Separating Vocals from Drum Kit & Other Instruments per C1 Mark Scheme) */}
      {instruments && instruments.length > 0 && (() => {
        const isVocalStem = (name = '') => /vocal|lead vox|backing vox|\bbv\b|harmonies|singer/i.test(name);
        const isDrumStem = (name = '') => /drum|kick|snare|overhead|hi-hat|\btom\b|\bkit\b/i.test(name) && !isVocalStem(name);

        const vocalStems = instruments.map((inst, idx) => ({ inst, idx })).filter(x => isVocalStem(x.inst.name));
        const drumStems = instruments.map((inst, idx) => ({ inst, idx })).filter(x => isDrumStem(x.inst.name));
        const otherInstStems = instruments.map((inst, idx) => ({ inst, idx })).filter(x => !isVocalStem(x.inst.name) && !isDrumStem(x.inst.name));

        const renderStemTabBtn = ({ inst, idx }, accentHex) => {
          const isStemDone = !!dossierTicks[`inst_${idx}`];
          const isActive = activeInstIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              className={`logbook-inst-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveInstIdx(idx)}
              style={{
                borderColor: isStemDone ? 'rgba(16, 185, 129, 0.65)' : isActive ? accentHex : undefined
              }}
            >
              <span
                className="logbook-inst-num"
                style={isStemDone ? { background: '#10b981', color: '#fff' } : isActive ? { background: accentHex, color: '#0f172a' } : undefined}
              >
                {isStemDone ? '✓' : idx + 1}
              </span>
              <span className="logbook-inst-name">{inst.name}</span>
            </button>
          );
        };

        const activeIsVocal = activeInstrument && isVocalStem(activeInstrument.name);
        const activeIsDrum = activeInstrument && isDrumStem(activeInstrument.name);

        return (
        <div className="logbook-section-card glass-panel">
          <div className="logbook-sec-header">
            <div className="logbook-sec-title-wrap">
              <Layers size={20} color="#C084FC" />
              <h3 className="logbook-sec-title">Section 3: Vocals vs. Drum Kit &amp; Other Instruments — 3-Pathway Capture &amp; Processing</h3>
            </div>
            <span className="logbook-sec-pill">
              {instruments.filter((_, idx) => dossierTicks[`inst_${idx}`]).length} / {instruments.length} Core Stems Completed
            </span>
          </div>

          {/* Separated Mark Scheme Category Selector (Vocals Separated from Drum Kit & Other Instruments) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {/* Column 1: Vocals (Separated per C1 Mark Scheme AG1B & AG2–AG4) */}
            {vocalStems.length > 0 && (
              <div style={{
                background: 'rgba(251, 191, 36, 0.08)',
                border: '1px solid rgba(251, 191, 36, 0.35)',
                borderRadius: '12px',
                padding: '10px 12px'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  🎤 C1 Mark Scheme Column: Vocals — Lead &amp; Backing (16m+)
                </div>
                <div className="logbook-inst-tabs" style={{ margin: 0 }}>
                  {vocalStems.map(item => renderStemTabBtn(item, '#FBBF24'))}
                </div>
              </div>
            )}

            {/* Column 2: Drum Kit (AG1A & AG2–AG4) */}
            {drumStems.length > 0 && (
              <div style={{
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                borderRadius: '12px',
                padding: '10px 12px'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  🥁 C1 Mark Scheme Column: Drum Kit (4+ Mics • 16m+)
                </div>
                <div className="logbook-inst-tabs" style={{ margin: 0 }}>
                  {drumStems.map(item => renderStemTabBtn(item, '#38BDF8'))}
                </div>
              </div>
            )}

            {/* Column 3: All Other Instruments (Bass, Guitars, MIDI/Keys & Extra — AG1C & AG2–AG4) */}
            {otherInstStems.length > 0 && (
              <div style={{
                background: 'rgba(192, 132, 252, 0.08)',
                border: '1px solid rgba(192, 132, 252, 0.35)',
                borderRadius: '12px',
                padding: '10px 12px',
                gridColumn: vocalStems.length > 0 && drumStems.length > 0 ? '1 / -1' : undefined
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                  🎸 C1 Mark Scheme Column: All Other Instruments — Bass, Guitars, DI Amp Sim &amp; MIDI/Extra (16m+)
                </div>
                <div className="logbook-inst-tabs" style={{ margin: 0 }}>
                  {otherInstStems.map(item => renderStemTabBtn(item, '#C084FC'))}
                </div>
              </div>
            )}
          </div>

          {/* Active Instrument / Vocal Dedicated Sections */}
          {activeInstrument && (
            <div className="logbook-inst-hub">
              {/* Dedicated Section: Capture Procedure (Preferred Pathway Only) */}
              {(() => {
                const selected = getSelectedCaptureSolution(activeInstrument);
                if (!selected || !selected.body) return null;

                const headerClass = selected.num === 1 ? 'p1' : selected.num === 2 ? 'p2' : 'p3';
                const HeaderIcon = selected.num === 1 ? Mic2 : selected.num === 2 ? Zap : Radio;
                const prefPathwayTitle = activeInstrument.preferredPathway || selected.title;
                const isInstTicked = !!dossierTicks[`inst_${activeInstIdx}`];

                return (
                  <div className="logbook-dedicated-section preferred-capture-section">
                    <div className="logbook-section-card-title" style={{ flexWrap: 'wrap', gap: '8px' }}>
                      <div className="logbook-card-title-left">
                        <HeaderIcon size={18} color={selected.num === 1 ? '#38BDF8' : selected.num === 2 ? '#FBBF24' : '#C084FC'} />
                        <span>
                          {activeIsVocal
                            ? `🎤 Vocal Capture Procedure (AG1B Vocals Column): ${activeInstrument.name}`
                            : activeIsDrum
                            ? `🥁 Drum Kit Capture Procedure (AG1A Drums Column): ${activeInstrument.name}`
                            : `🎸 Instrument Capture Procedure (AG1C Other Parts Column): ${activeInstrument.name}`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="logbook-badge-pref">⭐ Preferred Pathway: {selected.title.split(':')[0]}</span>
                        <button
                          type="button"
                          onClick={() => toggleDossierTick(`inst_${activeInstIdx}`)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '8px',
                            border: isInstTicked ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.25)',
                            background: isInstTicked ? '#10b981' : 'rgba(15, 23, 42, 0.85)',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          {isInstTicked ? '✓ Stem Capture Ticked Off' : '☐ Tick When Stem Captured'}
                        </button>
                      </div>
                    </div>

                    <div className="logbook-preferred-capture-card">
                      {/* Preferred Declaration & Edexcel Justification Banner */}
                      <div className="logbook-preferred-banner">
                        <div className="logbook-preferred-title-highlight">
                          <Star size={15} fill="#FBBF24" color="#FBBF24" />
                          <span>Selected Preferred Pathway: <strong>{prefPathwayTitle}</strong></span>
                        </div>
                        {activeInstrument.preferredJustification && (
                          <div className="logbook-preferred-justification-block">
                            <span className="logbook-justification-label">Pearson Edexcel Component 1 Mark Scheme Justification:</span>
                            <p className="logbook-justification-text">{activeInstrument.preferredJustification}</p>
                          </div>
                        )}
                      </div>

                      {/* Transducer & Microphone Capture Specification Card */}
                      {(() => {
                        const transducerSpec = (selected.num === 1 || (selected.body && /transducer|microphone|dynamic|condenser|shure|akg|rode|sennheiser/i.test(selected.body))) 
                          ? parseLogbookTransducer(selected.body, activeInstrument.name) 
                          : null;
                        if (!transducerSpec) return null;

                        return (
                          <div className="logbook-transducer-card">
                            <div className="logbook-transducer-header">
                              <div className="logbook-transducer-title-wrap">
                                <Mic2 size={16} color="#38BDF8" />
                                <span className="logbook-transducer-sec-title">Transducer & Microphone Specification</span>
                              </div>
                              <div className="logbook-transducer-pills">
                                <span className={`dossier-mic-tech-pill tech-${transducerSpec.typeClass}`}>
                                  {transducerSpec.category}
                                </span>
                                {transducerSpec.polarPattern && (
                                  <span className="dossier-mic-pattern-pill" title={`Polar Pattern: ${transducerSpec.polarPattern}`}>
                                    <Radio size={10} /> {transducerSpec.polarPattern}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="logbook-transducer-model-wrap">
                              <span className="logbook-transducer-model-label">Documented Transducer Make & Model:</span>
                              <h4 className="logbook-transducer-model-name">{transducerSpec.model}</h4>
                            </div>

                            {(transducerSpec.placement || transducerSpec.gainStaging) && (
                              <div className="logbook-transducer-quick-grid">
                                {transducerSpec.placement && (
                                  <div className="logbook-transducer-quick-item">
                                    <span className="logbook-transducer-quick-label">Placement & Alignment:</span>
                                    <p className="logbook-transducer-quick-text">{transducerSpec.placement}</p>
                                  </div>
                                )}
                                {transducerSpec.gainStaging && (
                                  <div className="logbook-transducer-quick-item">
                                    <span className="logbook-transducer-quick-label">Preamp Gain Staging:</span>
                                    <p className="logbook-transducer-quick-text">{transducerSpec.gainStaging}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Step-by-Step Capture Procedure & Acoustic Setup */}
                      <div className="logbook-capture-procedure-box">
                        <div className={`logbook-p-header ${headerClass}`}>
                          <HeaderIcon size={16} />
                          <span>{selected.title} — Signal Chain & Acoustic Capture Procedure</span>
                          <span className="logbook-badge-pref" style={{ marginLeft: 'auto', fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                            ✓ Official C1 Submission
                          </span>
                        </div>
                        <div className="logbook-p-body" style={{ fontSize: '0.88rem', lineHeight: '1.65', padding: '1rem' }}>
                          {selected.body.split('\n').map((line, lIdx) => {
                            const trimmed = line.trim();
                            if (!trimmed) return null;
                            const clean = trimmed.replace(/^[•*-]\s*/, '');
                            
                            // Check for Bold Title bullet: e.g. **Transducer Category & Model:** text
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

                            // Subhead check
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
                );
              })()}

              {/* 3. Dedicated Section: Channel Strip Insert Chain Table */}
              {activeInstrument.channelStrip && activeInstrument.channelStrip.length > 0 && (
                <div className="logbook-dedicated-section channel-strip-section">
                  <div className="logbook-section-card-title">
                    <div className="logbook-card-title-left">
                      <Sliders size={18} color="#38BDF8" />
                      <span>{currentDaw} Channel Strip Insert Chain: {activeInstrument.name}</span>
                    </div>
                    <span className="logbook-section-pill">
                      {activeInstrument.channelStrip.filter((_, rIdx) => dossierTicks[`inst_${activeInstIdx}_slot_${rIdx}`]).length} / {activeInstrument.channelStrip.length} Inserts Dialled
                    </span>
                  </div>

                  <div className="table-wrapper" style={{ margin: '0.75rem 0' }}>
                    <table className="logbook-strip-table">
                      <thead>
                        <tr>
                          <th style={{ width: '54px', textAlign: 'center' }}>TICK</th>
                          <th style={{ width: '80px' }}>ORDER</th>
                          <th>PROCESSOR / PLUGIN</th>
                          <th>TYPE & CIRCUIT</th>
                          <th>DIALLED SETTINGS / KNOBS</th>
                          <th>TECHNICAL OBJECTIVE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeInstrument.channelStrip.map((row, rIdx) => {
                          const slotKey = `inst_${activeInstIdx}_slot_${rIdx}`;
                          const isSlotTicked = !!dossierTicks[slotKey];
                          return (
                            <tr
                              key={rIdx}
                              onClick={() => toggleDossierTick(slotKey)}
                              style={{
                                cursor: 'pointer',
                                background: isSlotTicked ? 'rgba(16, 185, 129, 0.08)' : undefined
                              }}
                              title="Click to tick/untick this plugin insert in your DAW"
                            >
                              <td style={{ textAlign: 'center' }}>
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '5px',
                                  border: isSlotTicked ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.25)',
                                  background: isSlotTicked ? '#10b981' : 'rgba(15, 23, 42, 0.6)',
                                  color: '#fff',
                                  fontWeight: 800,
                                  fontSize: '0.74rem'
                                }}>
                                  {isSlotTicked ? '✓' : ''}
                                </span>
                              </td>
                              <td><span className="logbook-slot-pill">{row.slot}</span></td>
                              <td><strong style={{ color: isSlotTicked ? '#6EE7B7' : '#F8FAFC' }}>{row.plugin}</strong></td>
                              <td style={{ color: '#C084FC', fontSize: '0.82rem' }}>{row.type}</td>
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

              {/* 4. Dedicated Section: Crucial Examiner Pitfall & Marking Traps */}
              {activeInstrument.examinerPitfall && (
                <div className="logbook-dedicated-section pitfall-section">
                  <div className="logbook-section-card-title pitfall-title">
                    <div className="logbook-card-title-left">
                      <AlertTriangle size={18} color="#EF4444" />
                      <span>CRUCIAL EXAMINER PITFALLS & MARKING TRAPS</span>
                    </div>
                    <span className="logbook-badge-pitfall">Edexcel Marking Penalty Alert</span>
                  </div>
                  <div className="logbook-pitfall-body-card">
                    <p className="logbook-pitfall-text">{activeInstrument.examinerPitfall}</p>
                  </div>
                </div>
              )}

              {/* 5. Dedicated Section: Modern 3rd-Party Alternatives */}
              {activeInstrument.thirdParty && activeInstrument.thirdParty.length > 0 && (
                <div className="logbook-dedicated-section modern-alts-section">
                  <div className="logbook-section-card-title alts-title">
                    <div className="logbook-card-title-left">
                      <Zap size={18} color="#A855F7" />
                      <span>MODERN 3RD-PARTY PLUGIN ALTERNATIVES</span>
                    </div>
                    <span className="logbook-badge-alts">Industry Standard Gear</span>
                  </div>
                  <div className="logbook-alts-body-card">
                    <div className="logbook-tp-links">
                      {activeInstrument.thirdParty.map((tp, tpIdx) => (
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
      })()}

      {/* 4. Section 4: Comprehensive Mix Strategy & Mastering Suite */}
      {(mixStrategy || masterBus) && (
        <div className="logbook-section-card glass-panel">
          <div className="logbook-sec-header">
            <div className="logbook-sec-title-wrap">
              <Cpu size={20} color="#34D399" />
              <h3 className="logbook-sec-title">Section 4: Comprehensive Mix Strategy & Mastering Suite</h3>
            </div>
            <span className="logbook-sec-pill">Production Architecture</span>
          </div>

          {/* 4.1 to 4.4: Mixdown Engineering Strategy Grid */}
          {mixStrategy && (mixStrategy.philosophy || mixStrategy.frequencySeparation || mixStrategy.dynamicControl || mixStrategy.spatialDepth || mixStrategy.automation) && (
            <div className="logbook-mix-strategy-container">
              <div className="logbook-section-card-title" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                <div className="logbook-card-title-left">
                  <Sliders size={18} color="#38BDF8" />
                  <span>Mixdown Engineering Strategy & Staging Architecture</span>
                </div>
                <span className="logbook-section-pill">Staging & Balance</span>
              </div>

              {/* 4.1 Featured Card: Fader Hierarchy, Balance & Stereo Staging */}
              {(mixStrategy.faderHierarchy?.length > 0 || mixStrategy.philosophy) && (
                <div className="logbook-fader-card" style={dossierTicks['mix_faders'] ? { borderColor: 'rgba(16, 185, 129, 0.5)' } : undefined}>
                  <div className="logbook-fader-card-header" style={{ flexWrap: 'wrap', gap: '8px' }}>
                    <div className="logbook-card-title-left">
                      <Sliders size={16} color="#38BDF8" />
                      <span>4.1 Mix Balance, Fader Hierarchy & Stereo Staging</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => toggleDossierTick('mix_faders')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '7px',
                          border: dossierTicks['mix_faders'] ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.2)',
                          background: dossierTicks['mix_faders'] ? '#10b981' : 'rgba(15, 23, 42, 0.8)',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.74rem',
                          cursor: 'pointer'
                        }}
                      >
                        {dossierTicks['mix_faders'] ? '✓ Faders & Panning Ticked' : '☐ Tick Faders & Panning'}
                      </button>
                      {mixStrategy.faderHierarchy?.length > 0 && (
                        <div className="logbook-view-toggle">
                          <button 
                            type="button"
                            className={`logbook-view-toggle-btn ${faderViewMode === 'meters' ? 'active' : ''}`}
                            onClick={() => setFaderViewMode('meters')}
                            title="Console Fader Meters"
                          >
                            <BarChart2 size={13} />
                            <span>Console Faders</span>
                          </button>
                          <button 
                            type="button"
                            className={`logbook-view-toggle-btn ${faderViewMode === 'table' ? 'active' : ''}`}
                            onClick={() => setFaderViewMode('table')}
                            title="Staging Table"
                          >
                            <Table size={13} />
                            <span>Staging Table</span>
                          </button>
                          <button 
                            type="button"
                            className={`logbook-view-toggle-btn ${faderViewMode === 'split' ? 'active' : ''}`}
                            onClick={() => setFaderViewMode('split')}
                            title="Split Dual View"
                          >
                            <span>Split View</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Philosophy narrative overview */}
                  {mixStrategy.philosophy && (
                    <div className="logbook-philosophy-banner">
                      {mixStrategy.philosophy.split('\n').map((line, idx) => (
                        <p key={idx}>{line.replace(/^\s*[•*]\s*/, '• ')}</p>
                      ))}
                    </div>
                  )}

                  {/* Visual Console Fader Bank */}
                  {mixStrategy.faderHierarchy?.length > 0 && (faderViewMode === 'meters' || faderViewMode === 'split') && (
                    <div className="logbook-fader-console">
                      <div className="logbook-fader-console-header">
                        <span className="logbook-fader-col-stem">Stem / Instrument</span>
                        <span className="logbook-fader-col-level">Target Level</span>
                        <span className="logbook-fader-col-meter">Console Fader Meter (0 to -12 dB)</span>
                        <span className="logbook-fader-col-pan">Stereo Pan</span>
                        <span className="logbook-fader-col-role">Mix Role & Staging</span>
                      </div>
                      <div className="logbook-fader-console-body">
                        {mixStrategy.faderHierarchy.map((item, fIdx) => {
                          const theme = getFaderTheme(item.dbNum);
                          const pct = getFaderPct(item.dbNum);
                          return (
                            <div key={fIdx} className="logbook-fader-row">
                              <div className="logbook-fader-col-stem">
                                <span className="logbook-fader-stem-name">{item.element}</span>
                              </div>
                              <div className="logbook-fader-col-level">
                                <span 
                                  className="logbook-fader-badge" 
                                  style={{ background: theme.badgeBg, borderColor: theme.border, color: theme.text }}
                                >
                                  {item.faderLevel}
                                </span>
                              </div>
                              <div className="logbook-fader-col-meter">
                                <div className="logbook-fader-track">
                                  <div 
                                    className="logbook-fader-fill" 
                                    style={{ width: `${pct}%`, background: theme.fillGradient, boxShadow: `0 0 10px ${theme.glow}` }}
                                  />
                                  <div 
                                    className="logbook-fader-thumb" 
                                    style={{ left: `calc(${pct}% - 7px)` }}
                                  />
                                  <div className="logbook-fader-ticks">
                                    <span>-12</span>
                                    <span>-9</span>
                                    <span>-6</span>
                                    <span>-3</span>
                                    <span style={{ color: '#EF4444', fontWeight: 700 }}>0 dB</span>
                                  </div>
                                </div>
                              </div>
                              <div className="logbook-fader-col-pan">
                                <span className="logbook-pan-pill">
                                  {item.pan || 'Center (0)'}
                                </span>
                              </div>
                              <div 
                                className="logbook-fader-col-role"
                                title={[item.role, item.staging && item.staging !== 'Mix Staging' && item.staging !== item.role ? item.staging : null].filter(Boolean).join(' • ') || item.role || item.staging || 'Mix Element'}
                              >
                                <span className="logbook-role-text">
                                  {[item.role, item.staging && item.staging !== 'Mix Staging' && item.staging !== item.role ? item.staging : null].filter(Boolean).join(' • ') || item.role || item.staging || 'Mix Element'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Structured Fader Table View */}
                  {mixStrategy.faderHierarchy?.length > 0 && (faderViewMode === 'table' || faderViewMode === 'split') && (
                    <div className="table-wrapper" style={{ marginTop: faderViewMode === 'split' ? '1.25rem' : '0.5rem' }}>
                      <table className="logbook-master-table">
                        <thead>
                          <tr>
                            <th style={{ width: '180px' }}>Stem / Instrument</th>
                            <th style={{ width: '110px', textAlign: 'center' }}>Target Level</th>
                            <th style={{ width: '140px' }}>Meter Level</th>
                            <th style={{ width: '120px', textAlign: 'center' }}>Stereo Pan</th>
                            <th>Dynamic & Frequency Role</th>
                            <th>Spatial Staging</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mixStrategy.faderHierarchy.map((row, rIdx) => {
                            const theme = getFaderTheme(row.dbNum);
                            const pct = getFaderPct(row.dbNum);
                            return (
                              <tr key={rIdx}>
                                <td><strong style={{ color: '#F8FAFC' }}>{row.element}</strong></td>
                                <td style={{ textAlign: 'center' }}>
                                  <span 
                                    className="logbook-fader-badge" 
                                    style={{ background: theme.badgeBg, borderColor: theme.border, color: theme.text }}
                                  >
                                    {row.faderLevel}
                                  </span>
                                </td>
                                <td>
                                  <div className="logbook-mini-meter">
                                    <div 
                                      className="logbook-mini-meter-fill" 
                                      style={{ width: `${pct}%`, background: theme.fillGradient }} 
                                    />
                                  </div>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                  <span className="logbook-pan-pill">{row.pan}</span>
                                </td>
                                <td style={{ color: '#CBD5E1', fontSize: '0.84rem' }}>{row.role || '—'}</td>
                                <td style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{row.staging || 'Mix Staging'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              <div className="logbook-mix-grid" style={{ marginTop: '1.25rem' }}>

                {mixStrategy.frequencySeparation && (
                  <div className="logbook-mix-card" style={{ borderColor: dossierTicks['mix_eq'] ? 'rgba(16, 185, 129, 0.55)' : 'rgba(192, 132, 252, 0.28)' }}>
                    <div className="logbook-mix-card-header">
                      <div className="logbook-mix-card-title-group">
                        <div className="logbook-mix-card-icon-wrap" style={{ background: 'rgba(192, 132, 252, 0.15)', borderColor: 'rgba(192, 132, 252, 0.4)' }}>
                          <Activity size={16} color="#C084FC" />
                        </div>
                        <span className="logbook-mix-card-title">Frequency Masking Management & Spectral Separation</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDossierTick('mix_eq')}
                        className="logbook-mix-card-tag"
                        style={{
                          background: dossierTicks['mix_eq'] ? '#10b981' : 'rgba(192, 132, 252, 0.12)',
                          color: dossierTicks['mix_eq'] ? '#fff' : '#C084FC',
                          borderColor: dossierTicks['mix_eq'] ? '#10b981' : 'rgba(192, 132, 252, 0.3)',
                          cursor: 'pointer'
                        }}
                      >
                        {dossierTicks['mix_eq'] ? '✓ EQ Ticked' : '☐ Tick EQ'}
                      </button>
                    </div>
                    <div className="logbook-mix-card-body">
                      {renderMixCardContent(mixStrategy.frequencySeparation, '#C084FC')}
                    </div>
                  </div>
                )}

                {mixStrategy.dynamicControl && (
                  <div className="logbook-mix-card" style={{ borderColor: dossierTicks['mix_dyn'] ? 'rgba(16, 185, 129, 0.55)' : 'rgba(251, 191, 36, 0.28)' }}>
                    <div className="logbook-mix-card-header">
                      <div className="logbook-mix-card-title-group">
                        <div className="logbook-mix-card-icon-wrap" style={{ background: 'rgba(251, 191, 36, 0.15)', borderColor: 'rgba(251, 191, 36, 0.4)' }}>
                          <Volume2 size={16} color="#FBBF24" />
                        </div>
                        <span className="logbook-mix-card-title">Dynamic Control, Mix Subgroups & Bus Glue</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDossierTick('mix_dyn')}
                        className="logbook-mix-card-tag"
                        style={{
                          background: dossierTicks['mix_dyn'] ? '#10b981' : 'rgba(251, 191, 36, 0.12)',
                          color: dossierTicks['mix_dyn'] ? '#fff' : '#FBBF24',
                          borderColor: dossierTicks['mix_dyn'] ? '#10b981' : 'rgba(251, 191, 36, 0.3)',
                          cursor: 'pointer'
                        }}
                      >
                        {dossierTicks['mix_dyn'] ? '✓ Dynamics Ticked' : '☐ Tick Dynamics'}
                      </button>
                    </div>
                    <div className="logbook-mix-card-body">
                      {renderMixCardContent(mixStrategy.dynamicControl, '#FBBF24')}
                    </div>
                  </div>
                )}

                {mixStrategy.spatialDepth && (
                  <div className="logbook-mix-card" style={{ borderColor: dossierTicks['mix_fx'] ? 'rgba(16, 185, 129, 0.55)' : 'rgba(52, 211, 153, 0.28)' }}>
                    <div className="logbook-mix-card-header">
                      <div className="logbook-mix-card-title-group">
                        <div className="logbook-mix-card-icon-wrap" style={{ background: 'rgba(52, 211, 153, 0.15)', borderColor: 'rgba(52, 211, 153, 0.4)' }}>
                          <Disc size={16} color="#34D399" />
                        </div>
                        <span className="logbook-mix-card-title">Spatial Depth & Time-Based FX Architecture</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDossierTick('mix_fx')}
                        className="logbook-mix-card-tag"
                        style={{
                          background: dossierTicks['mix_fx'] ? '#10b981' : 'rgba(52, 211, 153, 0.12)',
                          color: dossierTicks['mix_fx'] ? '#fff' : '#34D399',
                          borderColor: dossierTicks['mix_fx'] ? '#10b981' : 'rgba(52, 211, 153, 0.3)',
                          cursor: 'pointer'
                        }}
                      >
                        {dossierTicks['mix_fx'] ? '✓ Spatial FX Ticked' : '☐ Tick Spatial FX'}
                      </button>
                    </div>
                    <div className="logbook-mix-card-body">
                      {renderMixCardContent(mixStrategy.spatialDepth, '#34D399')}
                    </div>
                  </div>
                )}

                {mixStrategy.automation && (
                  <div className="logbook-mix-card" style={{ borderColor: dossierTicks['mix_auto'] ? 'rgba(16, 185, 129, 0.55)' : 'rgba(244, 114, 182, 0.28)' }}>
                    <div className="logbook-mix-card-header">
                      <div className="logbook-mix-card-title-group">
                        <div className="logbook-mix-card-icon-wrap" style={{ background: 'rgba(244, 114, 182, 0.15)', borderColor: 'rgba(244, 114, 182, 0.4)' }}>
                          <Zap size={16} color="#F472B6" />
                        </div>
                        <span className="logbook-mix-card-title">Mix Automation Passes & Dynamic Rides</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDossierTick('mix_auto')}
                        className="logbook-mix-card-tag"
                        style={{
                          background: dossierTicks['mix_auto'] ? '#10b981' : 'rgba(244, 114, 182, 0.12)',
                          color: dossierTicks['mix_auto'] ? '#fff' : '#F472B6',
                          borderColor: dossierTicks['mix_auto'] ? '#10b981' : 'rgba(244, 114, 182, 0.3)',
                          cursor: 'pointer'
                        }}
                      >
                        {dossierTicks['mix_auto'] ? '✓ Automation Ticked' : '☐ Tick Automation'}
                      </button>
                    </div>
                    <div className="logbook-mix-card-body">
                      {renderMixCardContent(mixStrategy.automation, '#F472B6')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4.5: Master Bus Processing Chain Table */}
          {masterBus && masterBus.table && masterBus.table.length > 0 && (
            <div className="logbook-master-table-container">
              <div className="logbook-section-card-title" style={{ marginTop: '1.75rem', marginBottom: '0.75rem' }}>
                <div className="logbook-card-title-left">
                  <Cpu size={18} color="#34D399" />
                  <span>Master Bus Processing & Final Mastering Chain ({currentDaw})</span>
                </div>
                <span className="logbook-section-pill">
                  {masterBus.table.filter((_, rIdx) => dossierTicks[`master_${rIdx}`]).length} / {masterBus.table.length} Stages Verified
                </span>
              </div>

              <div className="table-wrapper">
                <table className="logbook-master-table">
                  <thead>
                    <tr>
                      <th style={{ width: '54px', textAlign: 'center' }}>TICK</th>
                      <th style={{ width: '180px' }}>Processing Stage</th>
                      <th style={{ width: '220px' }}>Plugin / Processor</th>
                      <th>Exact Parameter Settings</th>
                      <th>Technical Objective</th>
                    </tr>
                  </thead>
                  <tbody>
                    {masterBus.table.map((row, rIdx) => {
                      const mKey = `master_${rIdx}`;
                      const isMasterTicked = !!dossierTicks[mKey];
                      return (
                        <tr
                          key={rIdx}
                          onClick={() => toggleDossierTick(mKey)}
                          style={{
                            cursor: 'pointer',
                            background: isMasterTicked ? 'rgba(16, 185, 129, 0.08)' : undefined
                          }}
                          title="Click to tick/untick this Master Bus processing stage"
                        >
                          <td style={{ textAlign: 'center' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '20px',
                              height: '20px',
                              borderRadius: '5px',
                              border: isMasterTicked ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.25)',
                              background: isMasterTicked ? '#10b981' : 'rgba(15, 23, 42, 0.6)',
                              color: '#fff',
                              fontWeight: 800,
                              fontSize: '0.74rem'
                            }}>
                              {isMasterTicked ? '✓' : ''}
                            </span>
                          </td>
                          <td><strong style={{ color: isMasterTicked ? '#6EE7B7' : '#F8FAFC' }}>{row.stage}</strong></td>
                          <td style={{ color: '#38BDF8', fontWeight: 600 }}>{row.processor}</td>
                          <td>{renderSettingsBadge(row.settings)}</td>
                          <td style={{ color: '#CBD5E1', fontSize: '0.84rem' }}>{row.objective}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Master Bus Legacy Fallback Grid */}
          {(!masterBus?.table || masterBus.table.length === 0) && masterBus && (masterBus.mixBusChain || masterBus.limiting) && (
            <div className="logbook-master-grid" style={{ marginTop: '1.25rem' }}>
              {masterBus.mixBusChain && (
                <div className="logbook-master-card">
                  <div className="logbook-master-card-title">Mix Bus Insert Chain & Glue Compression</div>
                  <div className="logbook-master-body">
                    {masterBus.mixBusChain.split('\n').map((line, lIdx) => (
                      <p key={lIdx} style={{ margin: '0.35rem 0' }}>{line.replace(/^\*\s+/, '')}</p>
                    ))}
                  </div>
                </div>
              )}

              {masterBus.limiting && (
                <div className="logbook-master-card">
                  <div className="logbook-master-card-title">Master Limiting, Ceiling & Target Headroom</div>
                  <div className="logbook-master-body">
                    {masterBus.limiting.split('\n').map((line, lIdx) => (
                      <p key={lIdx} style={{ margin: '0.35rem 0' }}>{line.replace(/^\*\s+/, '')}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Coursework Compliance & Loudness Targets */}
          <div className="logbook-compliance-banner">
            <div className="logbook-compliance-header">
              <CheckCircle2 size={16} color="#34D399" />
              <span>Pearson Edexcel Component 1 Coursework Loudness & Dynamic Range Compliance</span>
            </div>
            <div className="logbook-compliance-grid">
              <div className="logbook-compliance-item">
                <span className="logbook-comp-label">TRUE PEAK CEILING</span>
                <span className="logbook-comp-val" style={{ color: '#38BDF8' }}>-1.0 dBFS True Peak</span>
                <span className="logbook-comp-sub">Guarantees zero inter-sample clipping on DAC moderation playback</span>
              </div>
              <div className="logbook-compliance-item">
                <span className="logbook-comp-label">INTEGRATED LOUDNESS</span>
                <span className="logbook-comp-val" style={{ color: '#FBBF24' }}>-14 to -16 LUFS Integrated</span>
                <span className="logbook-comp-sub">Preserves natural acoustic dynamics required for high-band AO2 marks</span>
              </div>
              <div className="logbook-compliance-item">
                <span className="logbook-comp-label">MONO COMPATIBILITY</span>
                <span className="logbook-comp-val" style={{ color: '#34D399' }}>Phase Correlation +0.7 to +1.0</span>
                <span className="logbook-comp-sub">Monitored via Correlation Meter; sub-bass mono below 100 Hz</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
