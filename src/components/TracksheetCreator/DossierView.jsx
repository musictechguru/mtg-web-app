import { useState } from 'react';
import { 
  Disc, Mic2, Radio, ExternalLink, Sliders, ShieldCheck, 
  Layers, Volume2, Cpu, FileText, CheckCircle2, ChevronRight, ChevronDown, ChevronUp, User, Award
} from 'lucide-react';

export default function DossierView({ data, onOpenVideoCompanion }) {
  const [activeInstIdx, setActiveInstIdx] = useState(0);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [showExtendedNotes, setShowExtendedNotes] = useState(false);
  const [showAllSections, setShowAllSections] = useState(false);

  if (!data) return null;

  const {
    song,
    artist,
    genre,
    datesRecorded,
    recordCompany,
    releaseDate,
    youtubeUrl,
    personnel,
    studio,
    musicology,
    instruments,
    references,
    overallConfidence,
    mixdown
  } = data;

  const activeInstrument = instruments && instruments.length > 0 ? instruments[activeInstIdx] : null;

  // Split signal chain into distinct sequential stage boxes
  const parseSignalNodes = (chainStr, micStr, tapeStr) => {
    if (!chainStr) {
      const list = [];
      if (micStr) list.push(micStr);
      list.push('Console Preamp & Channel Strip');
      if (tapeStr) list.push(tapeStr);
      else list.push('Multitrack Master Tape');
      return list;
    }

    let rawParts = [];

    // 1. If explicit arrows or standard delimiters exist: ->, →, ➔, ➜, ➡, ▶, >>, >
    if (/->|→|➔|➜|➡|▶|>>|>/.test(chainStr)) {
      rawParts = chainStr.split(/->|→|➔|➜|➡|▶|>>|>/).map(s => s.trim()).filter(Boolean);
    } else if (/;/.test(chainStr)) {
      rawParts = chainStr.split(';').map(s => s.trim()).filter(Boolean);
    } else {
      // 2. Check for numbered sequences (e.g. 1. ... 2. ...)
      if (/\b\d+\.\s+/.test(chainStr)) {
        rawParts = chainStr.split(/\b\d+\.\s+/).map(s => s.trim()).filter(Boolean);
      } else {
        // 3. Split on transitional sequence phrases: ' into ', ' through ', ' then ', ' routed to ', ' sent to ', ' fed to ', ' direct to '
        const transitionalRegex = /\s+(?:into(?:\s+a|\s+an|\s+the)?|through(?:\s+a|\s+an|\s+the)?|then(?:\s+into)?|routed\s+to|sent\s+to|fed\s+to|direct\s+to)\s+/i;
        if (transitionalRegex.test(chainStr)) {
          rawParts = chainStr.split(transitionalRegex).map(s => s.trim()).filter(Boolean);
        } else if (/,/.test(chainStr)) {
          // Commas separating hardware/console stages
          rawParts = chainStr.split(/,\s*/).map(s => s.trim()).filter(Boolean);
        }
      }
    }

    // Clean each part
    let cleaned = (rawParts.length > 0 ? rawParts : [chainStr]).map(p => {
      return p.replace(/^[–—\-\s>]+|[–—\-\s>]+$/g, '').trim();
    }).filter(p => p.length > 0);

    // If still only 1 item and it is a long sentence, break by clause/sentence
    if (cleaned.length === 1 && cleaned[0].length > 40) {
      const sub = cleaned[0].split(/[.,;]\s+/).map(s => s.trim()).filter(Boolean);
      if (sub.length > 1) {
        cleaned = sub;
      }
    }

    // If microphone is known and not mentioned in the first node, prepend it as node 1
    if (micStr && cleaned.length > 0) {
      const cleanMic = micStr.split(/[.;]/)[0].replace(/\s*\(.*?\)/g, '').replace(/[-:]\s*$/, '').trim();
      const firstNode = cleaned[0].toLowerCase();
      if (cleanMic.length > 2 && cleanMic.length < 80 && !firstNode.includes(cleanMic.toLowerCase()) && !firstNode.includes('mic')) {
        cleaned.unshift(cleanMic);
      }
    }

    return cleaned.length > 0 ? cleaned : ['Direct / Console Tracking', 'Multitrack Tape'];
  };

  // Sanitize instrument mics and signal chain in case chains were bundled with mics
  const sanitizeInstrumentMicsAndChain = (instrument) => {
    if (!instrument) return { cleanMics: '', cleanChain: '' };
    let mics = instrument.mics || '';
    let chain = instrument.signalChain || '';

    if (mics && (/->|→/.test(mics))) {
      const parts = mics.split(/\s*\|\s*/);
      const cleanMicParts = [];
      const extractedChains = [];
      for (const p of parts) {
        if (/->|→/.test(p)) {
          const cleanP = p.replace(/^[\s*–—-]+([^*:]+)[*:\s]+/, '$1: ').trim();
          extractedChains.push(cleanP);
          // Preserve the transducer from before the first arrow
          const micFromChain = cleanP.split(/->|→/)[0].replace(/\s*-\s*Score:.*$/i, '').trim();
          if (micFromChain) {
            cleanMicParts.push(micFromChain);
          }
        } else {
          cleanMicParts.push(p);
        }
      }
      if (extractedChains.length > 0) {
        const extractedStr = extractedChains.join(' | ');
        if (!chain) {
          chain = extractedStr;
        } else if (!chain.includes(extractedChains[0])) {
          chain = chain + ' | ' + extractedStr;
        }
      }
      mics = cleanMicParts.join('; ').replace(/^;\s*|;\s*$/g, '').trim();
    }

    // Fallback 1: If mics is empty, extract transducer from signal chain
    if (!mics && chain && (/->|→/.test(chain))) {
      const chainParts = chain.split(/\s*\|\s*/);
      const extractedNodes = [];
      for (const cp of chainParts) {
        const firstNode = cp.split(/->|→/)[0].replace(/^[\s*–—-]+([^*:]+)[*:\s]+/, '$1: ').replace(/\s*-\s*Score:.*$/i, '').trim();
        if (firstNode && !/^(?:direct\s+injection|di\s+box|line\s+level|software\s+instrument|midi)$/i.test(firstNode)) {
          extractedNodes.push(firstNode);
        }
      }
      if (extractedNodes.length > 0) {
        mics = extractedNodes.join('; ');
      }
    }

    // Fallback 2: Check pathway for explicit mic mentions (e.g. "Acoustic Microphone Capture (Shure SM57)" or "via Neumann U87")
    if (!mics && instrument.pathway) {
      const parenMatch = instrument.pathway.match(/\(([^)]+)\)/);
      const viaMatch = instrument.pathway.match(/(?:via|using|with)\s+([A-Za-z0-9\s/&#_-]+)/i);
      if (parenMatch && !/^(?:acoustic|microphone|capture|mono|stereo)$/i.test(parenMatch[1].trim())) {
        mics = parenMatch[1].trim();
      } else if (viaMatch) {
        mics = viaMatch[1].trim();
      }
    }

    return {
      cleanMics: mics.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').trim(),
      cleanChain: chain.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').trim()
    };
  };

  // Parse structured microphones from text
  const parseMicrophones = (rawStr) => {
    if (!rawStr) return [];

    let str = rawStr.replace(/^[–—\-\s*]+/, '').trim();
    str = str.replace(/\s*-\s*Score:\s*\[?[0-9/]+\]?.*$/i, '').trim();
    str = str.replace(/\(Source:[^)]+\)/gi, '').trim();

    let rawChunks = [];
    if (str.includes(';')) {
      rawChunks = str.split(';').map(s => s.trim()).filter(Boolean);
    } else if (str.includes(' | ')) {
      rawChunks = str.split(' | ').map(s => s.trim()).filter(Boolean);
    } else if (/\.\s+(?=[A-Za-z0-9\s/&#_-]+:\s*)/.test(str)) {
      rawChunks = str.split(/\.\s+(?=[A-Za-z0-9\s/&#_-]+:\s*)/).map(s => s.trim()).filter(Boolean);
    } else if (/\b(?:OR|or)\b\s+(?=[A-Z])/.test(str)) {
      const orParts = str.split(/\s+\b(?:OR|or)\b\s+/);
      if (orParts.length > 1) {
        rawChunks = [orParts[0], `Alternate: ${orParts.slice(1).join(' / ')}`];
      }
    }

    if (rawChunks.length === 0) {
      rawChunks = [str];
    }

    const results = [];
    const genericClassificationRegex = /^(?:moving[- ]coil\s+|dedicated\s+|bass\s+|low[- ]end\s+|matched\s+|pair\s+of\s+|matched\s+pair\s+of\s+|pair\s+|stereo\s+pair\s+of\s+|large\s+diaphragm\s+|small\s+diaphragm\s+|pencil\s+|vintage\s+|studio\s+|tube\s+|valve\s+|condenser\s+|dynamic\s+|ribbon\s+|transducer\s+|microphone\s+|mic\s+|active\s+|passive\s+|direct\s+injection\s+|di\s+|box\s+|audio\s+track\s+|audio\s+|track\s+|sdc|ldc|\(|\)|\/|\-|\s)+$/i;

    for (const chunk of rawChunks) {
      let text = chunk.replace(/\.$/, '').trim();
      if (!text) continue;

      let role = '';
      const roleMatch = text.match(/^([A-Za-z0-9\s/&#_-]+):\s*(.*)$/);
      if (roleMatch && !/(?:neuma|shure|akg|sennheiser|sony|rode|telefunken|electro-voice|beyerdynamic|coles|royer)/i.test(roleMatch[1])) {
        role = roleMatch[1].trim();
        text = roleMatch[2].trim();
      }

      // Detect polar pattern
      let polarPattern = '';
      if (/figure[- ]?8|bidirectional/i.test(text)) polarPattern = 'Figure-8';
      else if (/hyper[- ]?cardioid/i.test(text)) polarPattern = 'Hypercardioid';
      else if (/super[- ]?cardioid/i.test(text)) polarPattern = 'Supercardioid';
      else if (/omni(?:directional)?/i.test(text)) polarPattern = 'Omni';
      else if (/cardioid/i.test(text)) polarPattern = 'Cardioid';

      // Detect transducer type
      let transducerType = '';
      let typeClass = 'dynamic';
      if (/valve|tube/i.test(text)) {
        transducerType = 'Valve / Tube Condenser';
        typeClass = 'tube';
      } else if (/ribbon/i.test(text)) {
        transducerType = 'Ribbon Transducer';
        typeClass = 'ribbon';
      } else if (/di\b|direct injection|line[- ]level|line input/i.test(text)) {
        transducerType = 'Direct Injection (DI)';
        typeClass = 'di';
      } else if (/small diaphragm|pencil|sdc|km84|km184|km54|km56|c451|nt5|c1000/i.test(text)) {
        transducerType = 'Small Diaphragm Condenser';
        typeClass = 'condenser';
      } else if (/condenser|ldc|u47|u67|u87|c12|c414|c800|elam 251|nt1|at2020|at2035/i.test(text)) {
        transducerType = 'Large Diaphragm Condenser';
        typeClass = 'condenser';
      } else if (/dynamic|moving[- ]coil|sm57|sm58|sm7|md421|md441|d12|d112|re20|beta 52/i.test(text)) {
        transducerType = 'Moving-Coil Dynamic';
        typeClass = 'dynamic';
      }

      // Default polar pattern if standard known mic
      if (!polarPattern) {
        if (/sm57|sm58|re20|d12|d112|km84|km184/i.test(text)) polarPattern = 'Cardioid';
        else if (/md441/i.test(text)) polarPattern = 'Supercardioid';
        else if (/md421/i.test(text)) polarPattern = 'Cardioid';
        else if (/4038|44-bx/i.test(text)) polarPattern = 'Figure-8';
      }

      // Extract make and model, handling educational formatting e.g. "Low-End Dynamic (e.g. AKG D112 / Shure Beta 52A)"
      let model = text;
      let notes = '';

      const allParens = [...text.matchAll(/\(([^)]+)\)/g)].map(m => m[1].trim());
      // Look for a parenthesis that contains the specific make & model
      const gearParen = allParens.find(p => /e\.g\.|i\.e\.|shure|akg|neumann|sennheiser|rode|audio-technica|radial|bss|sony|coles|royer|ev|d112|sm57|u87|c414|nt1|re20|md421|beta 52|c1000|nt5|km184/i.test(p));

      if (gearParen) {
        const outside = text.replace(/\s*\([^)]+\)/g, '').trim();
        const outsideIsGeneric = genericClassificationRegex.test(outside) || !/[A-Za-z0-9]/.test(outside);
        const outsideHasBrand = /shure|neumann|akg|sennheiser|sony|rode|coles|royer|telefunken|d112|sm57|u87|c414/i.test(outside);

        if (outsideIsGeneric || !outsideHasBrand) {
          // The real make & model is INSIDE the parenthesis!
          model = gearParen.replace(/^(?:e\.g\.?|i\.e\.?)\s*/i, '').trim();
          notes = outside;
        } else {
          // The make & model is outside; parentheses are secondary notes/specs
          model = outside;
          const filtered = gearParen
            .replace(/tube|valve|condenser|dynamic|moving[- ]coil|ribbon|cardioid|omni|figure[- ]?8|large diaphragm|small diaphragm|pattern/gi, '')
            .replace(/[,;\s]+/g, ' ')
            .trim();
          if (filtered.length > 2) notes = filtered;
        }
      } else if (allParens.length > 0) {
        // Parentheses exist but without obvious brand keywords
        const firstParen = allParens[0];
        const outside = text.replace(/\s*\([^)]+\)/g, '').trim();
        const outsideIsGeneric = genericClassificationRegex.test(outside);

        if (outsideIsGeneric && firstParen.length > 2) {
          model = firstParen.replace(/^(?:e\.g\.?|i\.e\.?)\s*/i, '').trim();
          notes = outside;
        } else {
          model = outside;
          const filtered = firstParen
            .replace(/tube|valve|condenser|dynamic|moving[- ]coil|ribbon|cardioid|omni|figure[- ]?8|large diaphragm|small diaphragm|pattern/gi, '')
            .replace(/[,;\s]+/g, ' ')
            .trim();
          if (filtered.length > 2) notes = filtered;
        }
      }

      // Clean redundant prefixes from model (e.g. "Pair of", "Single", trailing placement text)
      model = model
        .replace(/^(?:Pair of|Matched Pair of|Matched|Single)\s+/i, '')
        .replace(/\s*-\s*Score:.*$/i, '')
        .replace(/\s*placed inside.*$/i, '')
        .replace(/\s*inside open grand piano.*$/i, '')
        .replace(/\s*\.\s*(?:Cardioid|Omni|Figure-8|Supercardioid|Hypercardioid).*$/i, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/[-:,]+$/, '')
        .trim();

      // Guard: If model is empty or solely generic classification words, restore best readable description
      if (!model || genericClassificationRegex.test(model)) {
        model = text.replace(/\s*-\s*Score:.*$/i, '').trim() || (typeClass === 'di' ? 'Direct Injection (DI Box)' : 'Studio Microphone');
      }

      let effectiveRole = role;
      if (!effectiveRole) {
        if (rawChunks.length === 1) {
          effectiveRole = typeClass === 'di' ? 'Direct Capture' : 'Primary Transducer';
        } else {
          effectiveRole = `Transducer 0${results.length + 1}`;
        }
      }

      results.push({
        role: effectiveRole,
        model,
        transducerType: transducerType || 'Studio Transducer',
        typeClass,
        polarPattern,
        notes
      });
    }

    return results;
  };

  return (
    <div className="dossier-container">
      {/* 1. Hero Song & Archival Confidence Card */}
      <div className="dossier-hero-card glass-panel">
        <div className="dossier-hero-left">
          <div className="dossier-disc-wrap">
            <Disc className="dossier-spinning-vinyl" size={64} color="#C084FC" />
            <div className="dossier-disc-glow"></div>
          </div>

          <div className="dossier-hero-info">
            <div className="dossier-badge-row">
              <span className="dossier-pill dossier-pill-primary">HISTORICAL ARCHIVE</span>
              {genre && <span className="dossier-pill">{genre}</span>}
              {releaseDate && <span className="dossier-pill">{releaseDate}</span>}
            </div>

            <h1 className="dossier-song-title">{song || 'Track Dossier'}</h1>
            <h2 className="dossier-artist-name">{artist || 'Unknown Artist'}</h2>

            <div className="dossier-meta-grid">
              {recordCompany && (
                <div className="dossier-meta-item">
                  <span className="dossier-meta-label">Label & Cat:</span>
                  <span className="dossier-meta-value">{recordCompany}</span>
                </div>
              )}
              {datesRecorded && (
                <div className="dossier-meta-item">
                  <span className="dossier-meta-label">Tracking Dates:</span>
                  <span className="dossier-meta-value">{datesRecorded}</span>
                </div>
              )}
              {studio.trackingStudio && (
                <div className="dossier-meta-item">
                  <span className="dossier-meta-label">Primary Studio:</span>
                  <span className="dossier-meta-value">{studio.trackingStudio}</span>
                </div>
              )}
            </div>

            <div className="dossier-music-tags">
              {musicology.key && (
                <div className="dossier-tag">
                  <span className="dossier-tag-label">KEY</span>
                  <span className="dossier-tag-val" style={{ color: '#C084FC' }}>{musicology.key}</span>
                </div>
              )}
              {musicology.bpm && (
                <div className="dossier-tag">
                  <span className="dossier-tag-label">TEMPO</span>
                  <span className="dossier-tag-val" style={{ color: '#38BDF8' }}>{musicology.bpm} BPM</span>
                </div>
              )}
              {musicology.timeSignature && (
                <div className="dossier-tag">
                  <span className="dossier-tag-label">METER</span>
                  <span className="dossier-tag-val" style={{ color: '#34D399' }}>{musicology.timeSignature}</span>
                </div>
              )}
              {musicology.tuning && (
                <div className="dossier-tag" title={musicology.tuning}>
                  <span className="dossier-tag-label">TUNING</span>
                  <span className="dossier-tag-val" style={{ color: '#FBBF24' }}>
                    {musicology.tuning.length > 28 ? `${musicology.tuning.substring(0, 26)}…` : musicology.tuning}
                  </span>
                </div>
              )}
              {onOpenVideoCompanion && (
                <button 
                  type="button" 
                  onClick={onOpenVideoCompanion} 
                  className="dossier-video-companion-btn" 
                  title="Watch session video with synchronized Studio Text Monitor"
                >
                  <span className="live-companion-dot"></span>
                  <Radio size={14} /> Studio Video Companion <span className="companion-beta-tag">(BETA)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Circular Confidence Meter */}
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
                strokeDashoffset={264 - (264 * (overallConfidence || 95)) / 100}
              />
            </svg>
            <div className="dossier-gauge-content">
              <span className="dossier-gauge-num">{overallConfidence}%</span>
              <span className="dossier-gauge-sub">RELIABILITY</span>
            </div>
          </div>
          <div className="dossier-gauge-footer">
            <ShieldCheck size={14} color="#34D399" />
            <span>Master Archive Verified</span>
          </div>
        </div>
      </div>

      {/* 2. Song Form & Structural Roadmap */}
      {(musicology.formBreakdown?.length > 0 || musicology.arrangementTechniques || musicology.arrangementPoints?.length > 0 || musicology.rawContent || musicology.key || musicology.bpm) && (
        <div className="dossier-section-card glass-panel">
          <div className="dossier-section-header">
            <div className="dossier-section-title-wrap">
              <Layers size={20} color="#38BDF8" />
              <h3 className="dossier-section-title">Musical Form & Arrangement Roadmap</h3>
            </div>
            {musicology.formBreakdown && musicology.formBreakdown.length > 0 ? (
              <span className="dossier-section-pill">{musicology.formBreakdown.length} Sections</span>
            ) : (
              <span className="dossier-section-pill">Harmonic & Arrangement Analysis</span>
            )}
          </div>

          {/* Interactive Form Timeline */}
          {musicology.formBreakdown && musicology.formBreakdown.length > 0 && (
            <div className="dossier-form-timeline">
              {musicology.formBreakdown.map((sec, idx) => {
                const isSelected = (selectedSectionIdx ?? 0) === idx;
                const secDetail = musicology.formSections && musicology.formSections[idx];
                const hasDetail = secDetail && secDetail.description;
                return (
                  <div 
                    key={idx} 
                    className={`dossier-form-step ${isSelected ? 'active' : ''} ${hasDetail ? 'has-detail' : ''}`}
                    onClick={() => {
                      setSelectedSectionIdx(idx);
                      setShowAllSections(false);
                    }}
                    title={hasDetail ? "Click to view musical analysis & timing breakdown" : undefined}
                  >
                    <span className="dossier-form-step-num">0{idx + 1}</span>
                    <span className="dossier-form-step-name">{sec}</span>
                    {idx < musicology.formBreakdown.length - 1 && (
                      <ChevronRight size={14} className="dossier-form-step-arrow" />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Section Arrangement Forensics */}
          {musicology.formSections && musicology.formSections.length > 0 && (
            <div className="dossier-all-sections-grid" style={{ marginTop: '1rem', paddingTop: '0.75rem' }}>
              <div className="dossier-box-label" style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Layers size={14} color="#38BDF8" /> SECTION-BY-SECTION ARRANGEMENT FORENSICS & TIMINGS
                </span>
                {musicology.formSections.length > 1 && (
                  <button 
                    type="button"
                    className="dossier-toggle-pill-btn"
                    onClick={() => setShowAllSections(!showAllSections)}
                    title={showAllSections ? "Focus on selected section card" : "View all sections in grid"}
                  >
                    {showAllSections ? `Focus Selected (${(selectedSectionIdx ?? 0) + 1}/${musicology.formSections.length})` : `View All (${musicology.formSections.length})`}
                  </button>
                )}
              </div>

              {showAllSections ? (
                /* Complete Breakdown of All Sections in Grid */
                <div className="dossier-section-cards-list">
                  {musicology.formSections.map((sec, idx) => (
                    <div 
                      key={idx} 
                      className={`dossier-section-subcard ${(selectedSectionIdx ?? 0) === idx ? 'dossier-section-subcard-selected' : ''}`}
                      onClick={() => setSelectedSectionIdx(idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="dossier-subcard-head">
                        <strong className="dossier-subcard-title">{sec.title}</strong>
                        {sec.score && <span className="dossier-score-badge">{sec.score}</span>}
                      </div>
                      <p className="dossier-subcard-body">
                        {sec.description || `Form section ${idx + 1} (${sec.title}) documented in commercial master arrangement timeline.`}
                      </p>
                      {sec.source && <span className="dossier-spec-source">Source: {sec.source}</span>}
                    </div>
                  ))}
                </div>
              ) : (
                /* Single Equivalent Information Card for Selected Section */
                (() => {
                  const currentIdx = (selectedSectionIdx !== null && selectedSectionIdx >= 0 && selectedSectionIdx < musicology.formSections.length)
                    ? selectedSectionIdx
                    : 0;
                  const sec = musicology.formSections[currentIdx];
                  if (!sec) return null;
                  return (
                    <div className="dossier-section-subcard dossier-section-subcard-selected">
                      <div className="dossier-subcard-head">
                        <strong className="dossier-subcard-title" style={{ fontSize: '1rem' }}>{sec.title}</strong>
                        {sec.score && <span className="dossier-score-badge" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>{sec.score}</span>}
                      </div>
                      <p className="dossier-subcard-body" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {sec.description || `Form section ${currentIdx + 1} (${sec.title}) documented in commercial master arrangement timeline.`}
                      </p>
                      {sec.source && <span className="dossier-spec-source" style={{ fontSize: '0.8rem' }}>Source: {sec.source}</span>}
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* Production & Arrangement Forensics */}
          {musicology.arrangementPoints && musicology.arrangementPoints.length > 0 ? (
            <div className="dossier-arrangement-box">
              <div className="dossier-box-label" style={{ marginBottom: '0.75rem' }}>
                <Radio size={14} color="#C084FC" /> PRODUCTION & ARRANGEMENT SIGNATURES ({musicology.arrangementPoints.length} FORENSIC PILLARS)
              </div>
              <div className="dossier-arrangement-grid">
                {musicology.arrangementPoints.map((pt, idx) => (
                  <div key={idx} className="dossier-arrangement-card">
                    <div className="dossier-arr-title">
                      <strong>{pt.title}</strong>
                      {pt.score && <span className="dossier-score-badge">{pt.score}</span>}
                    </div>
                    <p className="dossier-arr-desc">{pt.description}</p>
                    {pt.source && <span className="dossier-spec-source">Source: {pt.source}</span>}
                  </div>
                ))}
              </div>
            </div>
          ) : musicology.arrangementTechniques ? (
            <div className="dossier-arrangement-box">
              <div className="dossier-box-label">
                <Radio size={14} color="#C084FC" /> PRODUCTION & ARRANGEMENT FORENSICS
              </div>
              <p className="dossier-box-text" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {musicology.arrangementTechniques}
              </p>
            </div>
          ) : musicology.rawContent ? (
            <div className="dossier-arrangement-box">
              <div className="dossier-box-label">
                <Radio size={14} color="#C084FC" /> EXTENDED MUSICAL & HARMONIC FORENSICS
              </div>
              <p className="dossier-box-text" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {musicology.rawContent}
              </p>
            </div>
          ) : null}
        </div>
      )}

      {/* 3. Studio & Vintage Technology Roster */}
      <div className="dossier-section-card glass-panel">
        <div className="dossier-section-header">
          <div className="dossier-section-title-wrap">
            <Sliders size={20} color="#F472B6" />
            <h3 className="dossier-section-title">Studio Environment & Outboard Roster</h3>
          </div>
        </div>

        <div className="dossier-studio-grid">
          {studio.trackingStudio && (
            <div className="dossier-studio-cell">
              <span className="dossier-cell-label">TRACKING ROOM</span>
              <span className="dossier-cell-val">{studio.trackingStudio}</span>
            </div>
          )}
          {studio.console && (
            <div className="dossier-studio-cell">
              <span className="dossier-cell-label">MIXING CONSOLE / DESK</span>
              <span className="dossier-cell-val highlight-cyan">{studio.console}</span>
            </div>
          )}
          {studio.tapeMachine && (
            <div className="dossier-studio-cell">
              <span className="dossier-cell-label">MULTITRACK TAPE MACHINE</span>
              <span className="dossier-cell-val highlight-purple">{studio.tapeMachine}</span>
            </div>
          )}
          {studio.monitors && (
            <div className="dossier-studio-cell">
              <span className="dossier-cell-label">STUDIO MONITORS</span>
              <span className="dossier-cell-val">{studio.monitors}</span>
            </div>
          )}
        </div>

        {/* Key Outboard Hardware Processors - Option 1: Categorized Forensic Cards */}
        {studio.outboard && studio.outboard.length > 0 && (
          <div className="dossier-outboard-wrap">
            <div className="dossier-box-label" style={{ marginBottom: '0.85rem' }}>
              <Cpu size={14} color="#34D399" /> KEY OUTBOARD HARDWARE PROCESSORS & RACK UNITS ({studio.outboard.length})
            </div>
            <div className="dossier-outboard-grid">
              {studio.outboard.map((item, idx) => {
                const catLower = (item.category || '').toLowerCase();
                let catClass = 'cat-dynamics';
                if (catLower.includes('reverb') || catLower.includes('time') || catLower.includes('delay')) catClass = 'cat-time';
                else if (catLower.includes('eq') || catLower.includes('equaliz')) catClass = 'cat-eq';
                else if (catLower.includes('sampl') || catLower.includes('sequenc') || catLower.includes('drum')) catClass = 'cat-sample';
                else if (catLower.includes('preamp') || catLower.includes('di') || catLower.includes('channel')) catClass = 'cat-preamp';

                return (
                  <div key={idx} className={`dossier-outboard-card ${catClass}`}>
                    <div className="dossier-outboard-header">
                      <div className="dossier-outboard-title-wrap">
                        <span className="dossier-outboard-cat-badge">
                          {item.category || 'Outboard Processor'}
                        </span>
                        <h4 className="dossier-outboard-title">
                          {item.name || item.gear || 'Hardware Processor'}
                        </h4>
                      </div>
                      {item.score && (
                        <span className="dossier-score-badge">{item.score}</span>
                      )}
                    </div>
                    {item.circuit && (
                      <div className="dossier-outboard-circuit">
                        <span className="dossier-circuit-label">Circuit / Architecture:</span> <strong>{item.circuit}</strong>
                      </div>
                    )}
                    <p className="dossier-outboard-body">
                      {item.role || item.gear || 'Documented studio outboard processor utilised in session.'}
                    </p>
                    {item.source && (
                      <div className="dossier-spec-source">Source: {item.source}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Interactive Instrument Explorer */}
      {instruments && instruments.length > 0 && (
        <div className="dossier-section-card glass-panel">
          <div className="dossier-section-header">
            <div className="dossier-section-title-wrap">
              <Mic2 size={20} color="#A855F7" />
              <h3 className="dossier-section-title">Historical Recording Pathways & Stems</h3>
            </div>
            <span className="dossier-section-pill">{instruments.length} Stems Documented</span>
          </div>

          {/* Stem Selector Tabs */}
          <div className="dossier-inst-tabs">
            {instruments.map((inst, idx) => (
              <button
                key={idx}
                type="button"
                className={`dossier-inst-tab-btn ${activeInstIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveInstIdx(idx)}
              >
                <span 
                  className="dossier-inst-dot" 
                  style={{ backgroundColor: inst.color || '#A855F7' }}
                ></span>
                <span className="dossier-inst-tab-name">{inst.name}</span>
              </button>
            ))}
          </div>

          {/* Active Instrument Detail View */}
          {activeInstrument && (() => {
            const { cleanMics: effectiveMics, cleanChain: effectiveChain } = sanitizeInstrumentMicsAndChain(activeInstrument);
            const parsedMics = parseMicrophones(effectiveMics, activeInstrument.name);

            return (
              <div className="dossier-inst-detail-card">
                <div className="dossier-inst-header">
                  <div>
                    <h4 className="dossier-inst-title">{activeInstrument.name}</h4>
                    {(activeInstrument.pathway || effectiveMics) && (() => {
                      const pathwayText = activeInstrument.pathway ? activeInstrument.pathway.replace(/\.$/, '') : 'Acoustic Microphone Capture';
                      const cleanMic = (() => {
                        if (!effectiveMics) return '';
                        if (parsedMics && parsedMics.length > 0) {
                          if (parsedMics.length === 1) return parsedMics[0].model;
                          return parsedMics
                            .map(m => m.role && !m.role.startsWith('Transducer') ? `${m.role}: ${m.model}` : m.model)
                            .join(' / ');
                        }
                        return effectiveMics.split(/[.;]/)[0].replace(/\s*\(.*?\)/g, '').replace(/[-:]\s*$/, '').trim();
                      })();

                      const hasMicInPathway = cleanMic && (() => {
                        const lowPathway = pathwayText.toLowerCase();
                        const lowMic = cleanMic.toLowerCase();
                        if (lowPathway.includes(lowMic)) return true;
                        return cleanMic.split(/[/,;]/).some(part => {
                          const p = part.replace(/^[^:]+:\s*/, '').trim().toLowerCase();
                          return p.length > 3 && lowPathway.includes(p);
                        });
                      })();

                      return (
                        <span className="dossier-inst-pathway">
                          Input Pathway: <strong>{pathwayText}</strong>
                          {cleanMic && !hasMicInPathway && (
                            <span className="dossier-inst-pathway-mic">
                              {' '}— Mic: <strong>{cleanMic}</strong>
                            </span>
                          )}
                        </span>
                      );
                    })()}
                  </div>
                  {activeInstrument.score && (
                    <div className="dossier-verified-badge">
                      <CheckCircle2 size={16} color="#34D399" />
                      <span>Reliability: {activeInstrument.score}</span>
                    </div>
                  )}
                </div>

                {/* Spec Blocks Grid */}
                <div className="dossier-specs-grid">
                  {activeInstrument.backline && (
                    <div className="dossier-spec-card">
                      <div className="dossier-spec-header">
                        <span className="dossier-spec-title">🎸 Historical Backline & Instrument Details</span>
                        {activeInstrument.backlineScore && (
                          <span className="dossier-spec-score">{activeInstrument.backlineScore}</span>
                        )}
                      </div>
                      <p className="dossier-spec-body">{activeInstrument.backline}</p>
                      {activeInstrument.backlineSource && (
                        <span className="dossier-spec-source">Source: {activeInstrument.backlineSource}</span>
                      )}
                    </div>
                  )}

                  {effectiveMics && (
                    <div className="dossier-spec-card dossier-mics-spec-card">
                      <div className="dossier-spec-header">
                        <div className="dossier-mics-header-info">
                          <span className="dossier-spec-title">🎙️ Microphone(s) & Transducer Setup</span>
                          {parsedMics.length > 1 && (
                            <span className="dossier-mics-count-pill">{parsedMics.length} Transducers</span>
                          )}
                        </div>
                        {activeInstrument.micScore && (
                          <span className="dossier-spec-score">{activeInstrument.micScore}</span>
                        )}
                      </div>

                      <div className="dossier-mics-grid">
                        {parsedMics.map((m, mIdx) => (
                          <div key={mIdx} className={`dossier-mic-chip-card mic-cat-${m.typeClass}`}>
                            <div className="dossier-mic-chip-top">
                              <span className="dossier-mic-role-pill">{m.role}</span>
                              {m.transducerType && (
                                <span className={`dossier-mic-tech-pill tech-${m.typeClass}`}>
                                  {m.transducerType}
                                </span>
                              )}
                              {m.polarPattern && (
                                <span className="dossier-mic-pattern-pill" title={`Polar Pattern: ${m.polarPattern}`}>
                                  <Radio size={10} /> {m.polarPattern}
                                </span>
                              )}
                            </div>

                            <div className="dossier-mic-model-wrap">
                              <h5 className="dossier-mic-model-name">{m.model}</h5>
                            </div>

                            {m.notes && (
                              <p className="dossier-mic-notes">{m.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>

                      {activeInstrument.micSource && (
                        <span className="dossier-spec-source">Source: {activeInstrument.micSource}</span>
                      )}
                    </div>
                  )}

                  {activeInstrument.placement && (
                    <div className="dossier-spec-card">
                      <div className="dossier-spec-header">
                        <span className="dossier-spec-title">📐 Mic Placement, Distance & Acoustic Baffling</span>
                        {activeInstrument.placementScore && (
                          <span className="dossier-spec-score">{activeInstrument.placementScore}</span>
                        )}
                      </div>
                      <p className="dossier-spec-body">{activeInstrument.placement}</p>
                      {activeInstrument.placementSource && (
                        <span className="dossier-spec-source">Source: {activeInstrument.placementSource}</span>
                      )}
                    </div>
                  )}

                  {activeInstrument.stereoArray && (
                    <div className="dossier-spec-card">
                      <div className="dossier-spec-header">
                        <span className="dossier-spec-title">🎧 Stereo / Multi-Mic Array Configuration</span>
                        {activeInstrument.stereoArrayScore && (
                          <span className="dossier-spec-score">{activeInstrument.stereoArrayScore}</span>
                        )}
                      </div>
                      <p className="dossier-spec-body">{activeInstrument.stereoArray}</p>
                      {activeInstrument.stereoArraySource && (
                        <span className="dossier-spec-source">Source: {activeInstrument.stereoArraySource}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Visual Analog Signal Chain Ribbon */}
                {effectiveChain && (() => {
                  const chainParts = effectiveChain.split(/\s*\|\s*/).filter(Boolean);
                  const hasMultipleChannels = chainParts.length > 1 && chainParts.some(p => /^[A-Za-z0-9\s/&#_-]+:/.test(p));

                  return (
                    <div className="dossier-chain-section">
                      <div className="dossier-box-label" style={{ marginBottom: '0.75rem' }}>
                        <Sliders size={14} color="#F59E0B" /> ANALOG TRACKING SIGNAL CHAIN & CONSOLE INSERTS
                        {hasMultipleChannels && (
                          <span style={{ marginLeft: '0.5rem', color: '#CBD5E1', fontSize: '0.7rem', fontWeight: 'normal' }}>
                            ({chainParts.length} Discrete Channels)
                          </span>
                        )}
                      </div>

                      {hasMultipleChannels ? (
                        chainParts.map((part, pIdx) => {
                          const colonMatch = part.match(/^([A-Za-z0-9\s/&#_-]+):\s*(.*)$/);
                          const chLabel = colonMatch ? colonMatch[1].trim() : `Channel ${pIdx + 1}`;
                          const chChain = colonMatch ? colonMatch[2].trim() : part;
                          const nodes = parseSignalNodes(chChain, effectiveMics, activeInstrument.tapeAllocation);

                          return (
                            <div key={pIdx} className="dossier-chain-channel-block">
                              <div className="dossier-chain-channel-title">
                                <span style={{ color: '#F59E0B' }}>●</span> {chLabel.toUpperCase()} SIGNAL PATH:
                              </div>
                              <div className="dossier-chain-ribbon">
                                {nodes.map((node, nIdx, arr) => (
                                  <div key={nIdx} className="dossier-chain-node-wrap">
                                    <div className="dossier-chain-node">
                                      <span className="dossier-node-idx">{nIdx + 1}</span>
                                      <span className="dossier-node-text">{node}</span>
                                    </div>
                                    {nIdx < arr.length - 1 && (
                                      <div className="dossier-chain-connector">➔</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="dossier-chain-ribbon">
                          {parseSignalNodes(effectiveChain, effectiveMics, activeInstrument.tapeAllocation).map((node, nIdx, arr) => (
                            <div key={nIdx} className="dossier-chain-node-wrap">
                              <div className="dossier-chain-node">
                                <span className="dossier-node-idx">{nIdx + 1}</span>
                                <span className="dossier-node-text">{node}</span>
                              </div>
                              {nIdx < arr.length - 1 && (
                                <div className="dossier-chain-connector">➔</div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {activeInstrument.chainSource && (
                        <div className="dossier-chain-citation">
                          Verified from: {activeInstrument.chainSource}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Multitrack Tape Allocation */}
                {activeInstrument.tapeAllocation && (
                  <div className="dossier-tape-allocation-box">
                    <div className="dossier-box-label">
                      <Volume2 size={14} color="#EC4899" /> MULTITRACK TAPE ALLOCATION & BOUNCING HISTORY
                    </div>
                    <p className="dossier-tape-text">{activeInstrument.tapeAllocation}</p>
                  </div>
                )}

                {/* Historical Mix Balance, Panning & Spatial FX */}
                {(activeInstrument.mixBalance || activeInstrument.mixProcessing) && (
                  <div className="dossier-mix-stage-box">
                    <div className="dossier-box-label" style={{ color: '#38BDF8' }}>
                      <Sliders size={14} color="#38BDF8" /> HISTORICAL MIX BALANCE, PANNING & SPATIAL FX
                    </div>
                    <div className="dossier-mix-grid">
                      {activeInstrument.mixBalance && (
                        <div className="dossier-mix-card">
                          <span className="dossier-mix-subtitle">Stereo Panning & Soundstage:</span>
                          <p className="dossier-mix-text">{activeInstrument.mixBalance}</p>
                          {activeInstrument.mixBalanceSource && (
                            <span className="dossier-spec-source">Source: {activeInstrument.mixBalanceSource}</span>
                          )}
                        </div>
                      )}
                      {activeInstrument.mixProcessing && (
                        <div className="dossier-mix-card">
                          <span className="dossier-mix-subtitle">Mixdown Console EQ & Outboard FX:</span>
                          <p className="dossier-mix-text">{activeInstrument.mixProcessing}</p>
                          {activeInstrument.mixProcessingSource && (
                            <span className="dossier-spec-source">Source: {activeInstrument.mixProcessingSource}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* 5. Historical Mixdown, Master Bus & Stereo Master Tape */}
      {mixdown && (mixdown.architecture || mixdown.masterBusChain || mixdown.masterTape || mixdown.spatialStaging) && (
        <div className="dossier-section-card glass-panel">
          <div className="dossier-section-header">
            <div className="dossier-section-title-wrap">
              <Cpu size={20} color="#38BDF8" />
              <h3 className="dossier-section-title">Historical Mixdown, Master Bus & Stereo Master Tape</h3>
            </div>
            <span className="dossier-section-pill">Analog Summing & Mastering</span>
          </div>

          <div className="dossier-mixdown-grid">
            {mixdown.architecture && (
              <div className="dossier-mixdown-card">
                <div className="dossier-mixdown-card-title">Mixdown Architecture & Console Routing</div>
                <p className="dossier-mixdown-card-body">{mixdown.architecture}</p>
              </div>
            )}
            {mixdown.masterBusChain && (
              <div className="dossier-mixdown-card">
                <div className="dossier-mixdown-card-title">Master Bus Dynamics & Program EQ</div>
                <p className="dossier-mixdown-card-body">{mixdown.masterBusChain}</p>
              </div>
            )}
            {mixdown.masterTape && (
              <div className="dossier-mixdown-card">
                <div className="dossier-mixdown-card-title">Stereo Master Tape Recorder & Stock</div>
                <p className="dossier-mixdown-card-body">{mixdown.masterTape}</p>
              </div>
            )}
            {mixdown.spatialStaging && (
              <div className="dossier-mixdown-card">
                <div className="dossier-mixdown-card-title">Stereo Spatial Staging & Mix Variants</div>
                <p className="dossier-mixdown-card-body">{mixdown.spatialStaging}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Session Personnel & Musicians Roster */}
      <div className="dossier-section-card glass-panel">
        <div className="dossier-section-header">
          <div className="dossier-section-title-wrap">
            <User size={20} color="#34D399" />
            <h3 className="dossier-section-title">Session Personnel & Musician Roster</h3>
          </div>
        </div>

        <div className="dossier-personnel-grid">
          {/* Engineering & Executive Team */}
          <div className="dossier-personnel-col">
            <h4 className="dossier-col-title">Production & Engineering Team</h4>
            <div className="dossier-personnel-cards">
              {personnel.producers.map((p, idx) => (
                <div key={idx} className="dossier-personnel-item">
                  <div className="dossier-p-role">PRODUCER</div>
                  <div className="dossier-p-name">{p.name}</div>
                  {p.source && <div className="dossier-p-source">{p.source}</div>}
                </div>
              ))}
              {personnel.chiefEngineers.map((p, idx) => (
                <div key={idx} className="dossier-personnel-item">
                  <div className="dossier-p-role">{p.role || 'RECORDING ENGINEER'}</div>
                  <div className="dossier-p-name">{p.name}</div>
                </div>
              ))}
              {personnel.mixEngineers.map((p, idx) => (
                <div key={idx} className="dossier-personnel-item">
                  <div className="dossier-p-role">MIXING ENGINEER</div>
                  <div className="dossier-p-name">{p.name}</div>
                </div>
              ))}
              {personnel.masteringEngineers.map((p, idx) => (
                <div key={idx} className="dossier-personnel-item">
                  <div className="dossier-p-role">MASTERING ENGINEER</div>
                  <div className="dossier-p-name">{p.name}</div>
                </div>
              ))}
              {personnel.assistantEngineers.map((p, idx) => (
                <div key={idx} className="dossier-personnel-item">
                  <div className="dossier-p-role">ASSISTANT / TAPE OP</div>
                  <div className="dossier-p-name">{p.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Musicians & Performers */}
          {personnel.musicians && personnel.musicians.length > 0 && (
            <div className="dossier-personnel-col">
              <h4 className="dossier-col-title">Session Performers & Instruments</h4>
              <div className="dossier-musicians-grid">
                {personnel.musicians.map((m, idx) => (
                  <div key={idx} className="dossier-musician-card">
                    <div className="dossier-m-header">
                      <span className="dossier-m-name">{m.name}</span>
                      {m.score && <span className="dossier-m-score">{m.score}</span>}
                    </div>
                    <div className="dossier-m-instruments">{m.instruments}</div>
                    {m.source && <div className="dossier-m-source">Source: {m.source}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. Authoritative Reference Sources */}
      {references && references.length > 0 && (
        <div className="dossier-section-card glass-panel">
          <div className="dossier-section-header">
            <div className="dossier-section-title-wrap">
              <Award size={20} color="#FBBF24" />
              <h3 className="dossier-section-title">Authoritative Historical & Technical References</h3>
            </div>
          </div>

          <div className="dossier-references-list">
            {references.map((ref, idx) => (
              <a 
                key={idx} 
                href={ref.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="dossier-reference-card"
              >
                <div className="dossier-ref-icon">
                  <ExternalLink size={16} />
                </div>
                <div className="dossier-ref-text">
                  <div className="dossier-ref-title">{ref.title}</div>
                  {ref.description && (
                    <div className="dossier-ref-desc">{ref.description}</div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 7. Extended Archival Session Documentation & Verbatim Notes Drawer */}
      {(musicology?.rawContent || studio?.rawContent || mixdown?.rawContent) && (
        <div className="dossier-section-card glass-panel dossier-notes-accordion">
          <button 
            type="button" 
            className="dossier-accordion-btn"
            onClick={() => setShowExtendedNotes(prev => !prev)}
          >
            <div className="dossier-section-title-wrap">
              <FileText size={18} color="#94A3B8" />
              <h4 className="dossier-notes-title">Extended Archival Forensics & Session Transcripts</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94A3B8', fontSize: '0.8rem' }}>
              <span>{showExtendedNotes ? 'Hide Full Text' : 'View Full Text'}</span>
              {showExtendedNotes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {showExtendedNotes && (
            <div className="dossier-accordion-content">
              {musicology?.rawContent && (
                <div className="dossier-extended-block">
                  <div className="dossier-box-label" style={{ color: '#38BDF8', marginBottom: '0.5rem' }}>
                    <Layers size={14} color="#38BDF8" /> MUSICAL & HARMONIC TRANSCRIPT
                  </div>
                  <pre className="dossier-raw-pre">{musicology.rawContent}</pre>
                </div>
              )}

              {studio?.rawContent && (
                <div className="dossier-extended-block">
                  <div className="dossier-box-label" style={{ color: '#F472B6', marginBottom: '0.5rem' }}>
                    <Sliders size={14} color="#F472B6" /> STUDIO ENVIRONMENT & OUTBOARD LOGS
                  </div>
                  <pre className="dossier-raw-pre">{studio.rawContent}</pre>
                </div>
              )}

              {mixdown?.rawContent && (
                <div className="dossier-extended-block">
                  <div className="dossier-box-label" style={{ color: '#C084FC', marginBottom: '0.5rem' }}>
                    <Cpu size={14} color="#C084FC" /> MIXDOWN & MASTER BUS ARCHITECTURE
                  </div>
                  <pre className="dossier-raw-pre">{mixdown.rawContent}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
