/**
 * logbookParser.js
 * Parses Component 1 Recording Logbook markdown into structured data
 * for the Logbook Dossier View.
 */

// Helper dictionary to map stock DAW plugins to modern 3rd-party industry standards
export const STOCK_TO_THIRDPARTY_MAP = {
  // Logic Pro / Generic Stock EQs
  'channel eq': 'FabFilter Pro-Q 3',
  'linear phase eq': 'FabFilter Pro-Q 3',
  'vintage tube eq': 'UAD Pultec EQP-1A',
  'vintage graphic eq': 'API 560 (Waves / UAD)',
  'vintage console eq': 'UAD Neve 1073 EQ',
  'parametric eq': 'FabFilter Pro-Q 3',
  'eq eight': 'FabFilter Pro-Q 3',
  'stock eq': 'FabFilter Pro-Q 3',

  // Dynamics & Compressors
  'compressor': 'Universal Audio 1176LN / SSL G-Master',
  'studio vca': 'SSL G-Master Bus Compressor',
  'vintage opto': 'Teletronix LA-2A (UAD)',
  'vintage fet': 'Universal Audio 1176LN Classic',
  'classic vca': 'dbx 160 Compressor (Waves / UAD)',
  'studio fet': 'Empirical Labs Distressor (Empirical Labs)',
  'noise gate': 'FabFilter Pro-G',
  'gate': 'FabFilter Pro-G',
  'expander': 'FabFilter Pro-G',
  'de-esser': 'FabFilter Pro-DS',
  'multipressor': 'FabFilter Pro-MB',
  'multiband compressor': 'FabFilter Pro-MB',
  'limiter': 'FabFilter Pro-L 2',
  'adaptive limiter': 'FabFilter Pro-L 2',
  'mastering assistant': 'iZotope Ozone 11 Maximizer',

  // Time-Based FX & Spatial
  'space designer': 'Soundtoys SuperPlate / Valhalla VintageVerb',
  'chromaverb': 'Valhalla VintageVerb',
  'silververb': 'Valhalla Room',
  'tape delay': 'Soundtoys EchoBoy',
  'delay designer': 'Soundtoys EchoBoy',
  'stereo delay': 'Soundtoys EchoBoy',
  'sample delay': 'Soundtoys Little MicroShift',

  // Color, Saturation & Amp Sims
  'chromaglow': 'Soundtoys Decapitator / Sonnox Inflator',
  'overdrive': 'Soundtoys Decapitator',
  'distortion': 'Soundtoys Devil-Loc Deluxe',
  'clip distortion': 'FabFilter Saturn 2',
  'pedalboard': 'Line 6 Helix Native',
  'amp designer': 'Neural DSP Tone King Imperial',
  'bass amp designer': 'Ampeg SVT-VR Classic (Plugin Alliance)',
  'vintage warmer': 'PSP VintageWarmer 2',
  'subbass': 'Waves Submarine',

  // Modulation & Pitch
  'chorus': 'Soundtoys MicroShift',
  'ensemble': 'Roland Dimension D (UAD / Arturia)',
  'flanger': 'Eventide Instant Flanger Mk II',
  'phaser': 'Soundtoys PhaseMistress',
  'tremolo': 'Soundtoys Tremolator',
  'pitch correction': 'Antares Auto-Tune Pro',
  'flex pitch': 'Celemony Melodyne 5'
};

export function get3rdPartyPluginName(stockName) {
  if (!stockName) return 'FabFilter / UAD Equivalent';
  const clean = stockName.toLowerCase().replace(/\[.*?\]/g, '').replace(/`.*?`/g, '').trim();
  
  for (const [key, val] of Object.entries(STOCK_TO_THIRDPARTY_MAP)) {
    if (clean.includes(key)) return val;
  }
  
  if (clean.includes('comp') || clean.includes('1176') || clean.includes('vca')) return 'UAD 1176LN / SSL G-Comp';
  if (clean.includes('opto') || clean.includes('la-2a')) return 'Teletronix LA-2A (UAD)';
  if (clean.includes('eq') || clean.includes('filter')) return 'FabFilter Pro-Q 3';
  if (clean.includes('reverb') || clean.includes('plate') || clean.includes('room')) return 'Valhalla VintageVerb';
  if (clean.includes('delay') || clean.includes('echo')) return 'Soundtoys EchoBoy';
  if (clean.includes('gate')) return 'FabFilter Pro-G';
  if (clean.includes('amp') || clean.includes('cab')) return 'Ampeg SVT-VR / Neural DSP';
  if (clean.includes('sat') || clean.includes('drive') || clean.includes('glow')) return 'Soundtoys Decapitator';
  if (clean.includes('limit') || clean.includes('maxim')) return 'FabFilter Pro-L 2';
  if (clean.includes('mod') || clean.includes('chorus')) return 'Soundtoys MicroShift';

  return `${stockName} (3rd-Party Pro)`;
}

export function parseLogbook(markdown) {
  if (!markdown) return null;

  const result = {
    title: 'Component 1 Recording Logbook',
    trackName: '',
    artistName: '',
    year: '',
    genre: '',
    genre1: '',
    genre2: '',
    recordLabel: '',
    daw: '',
    key: '',
    bpm: '',
    timeSignature: '',
    trackTable: [],
    instruments: [],
    mixStrategy: {
      philosophy: '',
      frequencySeparation: '',
      dynamicControl: '',
      spatialDepth: '',
      automation: ''
    },
    masterBus: {
      table: [],
      mixBusChain: '',
      limiting: '',
      rawContent: ''
    }
  };

  // Section 1: Examination & Production Metadata
  // Check for Release Metadata format e.g. Title - Artist Year genre 1 genre 2, record label
  const releaseMetaMatch = markdown.match(/(?:Selected Title & Artist|Title & Artist|Release Metadata|Production Metadata)[^*:\n]*:\*\*\s*(.+)/i);
  if (releaseMetaMatch) {
    const raw = releaseMetaMatch[1].trim();
    // Possible formats:
    // Song - Artist (1994, Progressive Rock, EMI)
    // Song by Artist (1994)
    // Song - Artist
    const parenMatch = raw.match(/\(([^)]+)\)/);
    let outsideParen = raw.replace(/\s*\([^)]+\)/g, '').trim();

    const byMatch = outsideParen.split(/\s+by\s+/i);
    const dashMatch = outsideParen.split(/\s*[-–—]\s*/);

    if (byMatch.length > 1) {
      result.trackName = byMatch[0].trim();
      result.artistName = byMatch[1].trim();
    } else if (dashMatch.length > 1) {
      result.trackName = dashMatch[0].trim();
      result.artistName = dashMatch[1].trim();
    } else {
      result.trackName = outsideParen;
    }

    if (parenMatch) {
      const parenParts = parenMatch[1].split(/,\s*/);
      let remaining = [];
      parenParts.forEach(part => {
        const p = part.trim();
        if (/^\d{4}$/.test(p) && !result.year) {
          result.year = p;
        } else {
          remaining.push(p);
        }
      });

      if (remaining.length === 1) {
        // e.g. (1997, Alternative Rock)
        result.genre1 = remaining[0];
        result.genre = remaining[0];
      } else if (remaining.length === 2) {
        // e.g. (1997, Alternative Rock / Art Rock, Parlophone)
        const gSplit = remaining[0].split(/[\/,]/).map(s => s.trim()).filter(Boolean);
        if (gSplit.length > 1) {
          result.genre1 = gSplit[0];
          result.genre2 = gSplit[1];
          result.genre = `${gSplit[0]} / ${gSplit[1]}`;
        } else {
          result.genre1 = remaining[0];
          result.genre = remaining[0];
        }
        result.recordLabel = remaining[1];
      } else if (remaining.length >= 3) {
        // e.g. (1997, Genre 1, Genre 2, Record Label)
        result.genre1 = remaining[0];
        result.genre2 = remaining[1];
        result.genre = `${remaining[0]} / ${remaining[1]}`;
        result.recordLabel = remaining.slice(2).join(', ');
      }
    } else {
      // Check for format: Title - Artist Year genre 1 genre 2, record label (no parentheses)
      const commaParts = raw.split(/,\s*/);
      if (commaParts.length > 1) {
        result.recordLabel = commaParts[commaParts.length - 1].trim();
        outsideParen = commaParts.slice(0, -1).join(', ').trim();
      }
      const yearInText = outsideParen.match(/\b(19\d\d|20\d\d)\b/);
      if (yearInText) {
        result.year = yearInText[1];
        const beforeYear = outsideParen.substring(0, yearInText.index).trim();
        const afterYear = outsideParen.substring(yearInText.index + 4).trim();
        if (afterYear) {
          const gParts = afterYear.split(/[\/,]/).map(g => g.trim()).filter(Boolean);
          if (gParts.length > 0) result.genre1 = gParts[0];
          if (gParts.length > 1) result.genre2 = gParts[1];
          result.genre = afterYear;
        }
        const dashInBefore = beforeYear.split(/\s*[-–—]\s*/);
        if (dashInBefore.length > 1) {
          result.trackName = dashInBefore[0].trim();
          result.artistName = dashInBefore[1].trim();
        } else {
          result.trackName = beforeYear;
        }
      }
    }
  }

  // Fallback explicit metadata bullets
  const songMatch = markdown.match(/(?:\*\s+\*\*(?:Song|Track|Title):\*\*\s*|\bSong:\s*)([^\n]+)/i);
  if (songMatch && !result.trackName) result.trackName = songMatch[1].replace(/[-*]/g, '').trim();

  const artistMatch = markdown.match(/(?:\*\s+\*\*Artist:\*\*\s*|\bArtist:\s*)([^\n]+)/i);
  if (artistMatch && !result.artistName) result.artistName = artistMatch[1].replace(/[-*]/g, '').trim();

  const yearMatch = markdown.match(/(?:\*\s+\*\*(?:Year|Release Year|Date Recorded):\*\*\s*|\bYear:\s*)(\d{4})/i);
  if (yearMatch) result.year = yearMatch[1].trim();

  const genreMatch = markdown.match(/(?:\*\s+\*\*(?:Genre|Genre \/ Style|Style):\*\*\s*|\bGenre:\s*)([^\n]+)/i);
  if (genreMatch) {
    const rawGenre = genreMatch[1].replace(/[-*]/g, '').trim();
    result.genre = rawGenre;
    const gParts = rawGenre.split(/[\/,]/).map(g => g.trim()).filter(Boolean);
    if (gParts.length > 0) result.genre1 = gParts[0];
    if (gParts.length > 1) result.genre2 = gParts[1];
  }

  const labelMatch = markdown.match(/(?:\*\s+\*\*(?:Record Label|Label|Record Company):\*\*\s*|\bLabel:\s*)([^\n]+)/i);
  if (labelMatch) result.recordLabel = labelMatch[1].replace(/[-*]/g, '').trim();

  const dawMatch = markdown.match(/Primary (?:Digital Audio Workstation|DAW)[^:]*:\*\*\s*(.+)/i);
  if (dawMatch) {
    result.daw = dawMatch[1].trim();
  }

  // Key & Harmonic Structure
  const keyMatch = markdown.match(/\*\s+\*\*Key[^*:]*:\*\*\s*([^\n]+)/i);
  if (keyMatch) {
    const rawKey = keyMatch[1].replace(/[-*]/g, '').trim();
    const keyExtracted = rawKey.match(/^([A-G][b#]?(?:-flat|-sharp)?(?:\s+(?:Major|Minor|Aeolian|Dorian|Mixolydian|pentatonic|blues))?)/i);
    result.key = keyExtracted ? keyExtracted[1].trim() : rawKey.split(/[-(]/)[0].trim();
  }

  // Tempo & Meter / BPM
  const tempoMatch = markdown.match(/\*\s+\*\*Tempo[^*:]*:\*\*\s*([^\n]+)/i);
  if (tempoMatch) {
    const rawTempo = tempoMatch[1];
    const bpmM = rawTempo.match(/(?:~|approx\.?|approximately\s*)?\b(\d{2,3}(?:\.\d+)?)(?:\s*-\s*\d{2,3}(?:\.\d+)?)?\s*BPM/i);
    if (bpmM) {
      result.bpm = String(parseFloat(bpmM[1]));
    }
    const meterM = rawTempo.match(/\b([234567]\/[48]|\b12\/8\b|\b9\/8\b|\b6\/8\b)\b/);
    if (meterM) {
      result.timeSignature = meterM[1];
    }
  }

  // Section 2: Master Track Sheet & Input Routing Table
  const s2Match = markdown.match(/### Section 2[^\n]*\n+([\s\S]*?)(?=### Section 3|$)/i);
  if (s2Match) {
    const tableText = s2Match[1];
    const rows = tableText.split('\n').map(r => r.trim()).filter(r => r.startsWith('|') && !r.includes('---'));
    if (rows.length > 1) {
      const headerCells = rows[0].split('|').map(c => c.trim().toLowerCase()).filter(Boolean);
      
      const trkIdx = headerCells.findIndex(h => h.includes('trk') || h.includes('track') || h === '#');
      const stemIdx = headerCells.findIndex(h => h.includes('stem') || h.includes('instrument'));
      const captureIdx = headerCells.findIndex(h => h.includes('capture') || h.includes('pathway') || h.includes('transducer') || h.includes('input source'));
      const faderIdx = headerCells.findIndex(h => h.includes('fader') || h.includes('level') || h.includes('volume'));
      const panIdx = headerCells.findIndex(h => h.includes('pan') || h.includes('pos'));
      const dynIdx = headerCells.findIndex(h => h.includes('dynamic') || h.includes('gate') || h.includes('comp'));
      const eqIdx = headerCells.findIndex(h => h.includes('eq') || h.includes('equaliz') || h.includes('filter'));
      const insertsIdx = headerCells.findIndex(h => h.includes('insert') || h.includes('fx'));
      const auxIdx = headerCells.findIndex(h => h.includes('aux') || h.includes('send') || h.includes('reverb'));

      const isComprehensiveFormat = dynIdx !== -1 || eqIdx !== -1 || insertsIdx !== -1 || auxIdx !== -1;

      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cells.length >= 3) {
          if (isComprehensiveFormat) {
            result.trackTable.push({
              trackNo: trkIdx !== -1 && cells[trkIdx] ? cells[trkIdx] : String(i),
              stem: stemIdx !== -1 && cells[stemIdx] ? cells[stemIdx] : cells[1] || 'Stem',
              capture: captureIdx !== -1 && cells[captureIdx] ? cells[captureIdx] : cells[2] || '',
              fader: faderIdx !== -1 && cells[faderIdx] ? cells[faderIdx] : '0.0 dB',
              pan: panIdx !== -1 && cells[panIdx] ? cells[panIdx] : 'C',
              dynamics: dynIdx !== -1 && cells[dynIdx] ? cells[dynIdx] : '',
              eq: eqIdx !== -1 && cells[eqIdx] ? cells[eqIdx] : '',
              inserts: insertsIdx !== -1 && cells[insertsIdx] ? cells[insertsIdx] : '',
              aux: auxIdx !== -1 && cells[auxIdx] ? cells[auxIdx] : '',
              pathway: captureIdx !== -1 ? cells[captureIdx] : '',
              inputSource: captureIdx !== -1 ? cells[captureIdx] : '',
              dawInput: `Input ${i}`,
              targetHeadroom: '-12 dBFS'
            });
          } else {
            // Legacy format: Track # | Stem | Pathway | Input Source | DAW Input | Pan | Fader | Headroom
            const rawPathway = cells[2] || '';
            const rawInputSource = cells[3] || '';
            const combinedCapture = rawInputSource 
              ? (rawPathway ? `${rawInputSource} (${rawPathway.replace(/^Pathway\s*\d+\s*\(?/i, '').replace(/\)$/, '')})` : rawInputSource)
              : rawPathway;

            result.trackTable.push({
              trackNo: cells[0] || String(i),
              stem: cells[1] || 'Stem',
              capture: combinedCapture || 'Direct Capture',
              pathway: rawPathway,
              inputSource: rawInputSource,
              dawInput: cells[4] || `Input ${i}`,
              pan: cells[5] || 'C',
              fader: cells[6] || '0.0 dB',
              targetHeadroom: cells[7] || '-12 dBFS',
              dynamics: '',
              eq: '',
              inserts: '',
              aux: ''
            });
          }
        }
      }
    }
  }

  // Section 3: Instrument-by-Instrument Recording Log & 3-Pathway Solutions
  const s3Idx = markdown.indexOf('### Section 3');
  const s4Idx = markdown.indexOf('### Section 4');
  const s3Text = s3Idx !== -1 
    ? (s4Idx !== -1 ? markdown.substring(s3Idx, s4Idx) : markdown.substring(s3Idx))
    : '';

  if (s3Text) {
    // Split by #### (instruments)
    const instChunks = s3Text.split(/\n####\s+/);
    for (let i = 1; i < instChunks.length; i++) {
      const chunk = instChunks[i];
      const firstLineEnd = chunk.indexOf('\n');
      const instName = firstLineEnd !== -1 ? chunk.substring(0, firstLineEnd).trim() : chunk.trim();
      const body = firstLineEnd !== -1 ? chunk.substring(firstLineEnd) : '';

      const instObj = {
        name: instName.replace(/^\d+\.\s*/, ''),
        rawHeading: instName,
        pathway1: '',
        pathway2: '',
        pathway3: '',
        preferredPathway: '',
        preferredJustification: '',
        channelStrip: [],
        thirdParty: [],
        examinerPitfall: '',
        rawBody: body
      };

      // Extract Pathway 1 (Acoustic / Mic)
      const p1Match = body.match(/(?:#{1,6}\s*|\*\s+)?\*{0,2}Pathway\s*1[^*:\n]*\*{0,2}[:\s]*([\s\S]*?)(?=(?:#{1,6}\s*|\*\s+)?\*{0,2}Pathway\s*2|(?:#{1,6}\s*|\*\s+)?\*{0,2}⭐|(?:#{1,6}\s*|\*\s+)?\*{0,2}PREFERRED|\n####|$)/i);
      if (p1Match) instObj.pathway1 = p1Match[1].trim().replace(/^\s*\*\s+/gm, '• ');

      // Extract Pathway 2 (DI / Line)
      const p2Match = body.match(/(?:#{1,6}\s*|\*\s+)?\*{0,2}Pathway\s*2[^*:\n]*\*{0,2}[:\s]*([\s\S]*?)(?=(?:#{1,6}\s*|\*\s+)?\*{0,2}Pathway\s*3|(?:#{1,6}\s*|\*\s+)?\*{0,2}⭐|(?:#{1,6}\s*|\*\s+)?\*{0,2}PREFERRED|\n####|$)/i);
      if (p2Match) instObj.pathway2 = p2Match[1].trim().replace(/^\s*\*\s+/gm, '• ');

      // Extract Pathway 3 (MIDI / Instrument)
      const p3Match = body.match(/(?:#{1,6}\s*|\*\s+)?\*{0,2}Pathway\s*3[^*:\n]*\*{0,2}[:\s]*([\s\S]*?)(?=(?:#{1,6}\s*|\*\s+)?\*{0,2}⭐|(?:#{1,6}\s*|\*\s+)?\*{0,2}PREFERRED|\n####|(?:#{1,6}\s*|\*\s+)?\*{0,2}Channel Strip|$)/i);
      if (p3Match) instObj.pathway3 = p3Match[1].trim().replace(/^\s*\*\s+/gm, '• ');

      // Extract Preferred Pathway & Justification
      const prefMatch = body.match(/(?:#{1,6}\s*|\*\s+)?\*{0,2}⭐?\s*PREFERRED C1 PATHWAY[:\s]*([^\n*.]+)[.*]?\s*([\s\S]*?)(?=(?:#{1,6}\s*|\*\s+)?\*{0,2}Channel Strip|(?:#{1,6}\s*|\*\s+)?\*{0,2}(?:Modern\s*3rd|3rd-Party)|\n####|$)/i);
      if (prefMatch) {
        instObj.preferredPathway = prefMatch[1].trim();
        instObj.preferredJustification = prefMatch[2].trim()
          .replace(/^\*?\s*(?:\*\*)?(?:Mark-Scheme\s*)?Justification:?(?:\*\*)?\s*/i, '')
          .replace(/^\s*\*\s+/gm, '• ');
      }

      // Extract Channel Strip: Table or Bullet List
      const tableMatch = body.match(/\|[^\n]+\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
      if (tableMatch) {
        const rows = tableMatch[1].trim().split('\n');
        for (const row of rows) {
          const cells = row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
          if (cells.length >= 4) {
            instObj.channelStrip.push({
              slot: cells[0],
              plugin: cells[1],
              type: cells[2],
              settings: cells[3],
              objective: cells[4] || ''
            });
          }
        }
      } else {
        // Fallback: bullet points (e.g. *Channel EQ*: settings)
        const bulletMatches = [...body.matchAll(/\*\s+\*([^*:]+)\*:\s*([^\n]+)/g)];
        let slotNum = 1;
        for (const bm of bulletMatches) {
          const pluginName = bm[1].trim();
          if (!pluginName.toLowerCase().includes('setup') && !pluginName.toLowerCase().includes('gain staging') && !pluginName.toLowerCase().includes('justification')) {
            instObj.channelStrip.push({
              slot: `Insert ${slotNum++}`,
              plugin: pluginName,
              type: 'Stock Processor',
              settings: bm[2].trim(),
              objective: 'Dynamic / Frequency shaping'
            });
          }
        }
      }

      // Extract 3rd Party Plugins
      const tpMatch = body.match(/(?:#{1,6}\s*|\*\s+)?\*{0,2}(?:Modern\s*3rd|Third-Party|3rd-Party)[^*:\n]*\*{0,2}[:\s]*([\s\S]*?)(?=(?:#{1,6}\s*|\*\s+)?\*{0,2}Examiner|\n#{1,6}|\n---|$)/i);
      if (tpMatch) {
        const tpText = tpMatch[1].trim();
        const linkMatches = [...tpText.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)];
        if (linkMatches.length > 0) {
          instObj.thirdParty = linkMatches.map(m => ({ name: m[1], url: m[2] }));
        } else {
          instObj.thirdParty = tpText.split('\n').filter(Boolean).map(l => ({ name: l.replace(/^\s*[•*]\s*/, '').trim(), url: '' }));
        }
      }

      // Extract Examiner Pitfall
      const pitfallMatch = body.match(/(?:#{1,6}\s*|\*\s+)?\*{0,2}Examiner\s*(?:Pitfall|Trap)[^*:\n]*\*{0,2}[:\s]*([\s\S]*?)(?=\n#{1,6}|\n---|$)/i);
      if (pitfallMatch) {
        instObj.examinerPitfall = pitfallMatch[1].trim().replace(/^\s*\*\s+/gm, '• ');
      }

      result.instruments.push(instObj);
    }
  }

  // Section 4: Comprehensive Mix Strategy & Mastering Suite
  if (s4Idx !== -1) {
    const s4Text = markdown.substring(s4Idx);
    result.masterBus.rawContent = s4Text;

    // 1. Overall Mix Philosophy & Gain Staging (narrative only — no fader/staging tables)
    const balanceMatch = s4Text.match(/(?:Fader Hierarchy|Mix Balance|Balance \& Stereo|Overall Mix Philosophy|Gain Staging)[^:\n]*:?\s*([\s\S]*?)(?=(?:###|\n####|\*\*4\.\d|\*\*Frequency|\*\*Dynamic|\*\*Spatial|\*\*Master Bus|\*\*Master Limiting|$))/i);
    if (balanceMatch) {
      let rawPhilosophy = balanceMatch[1].trim();
      // Strip any table that might have leaked in (console fades / staging tables)
      rawPhilosophy = rawPhilosophy.replace(/\|[^\n]+\|\n\|[-| :]+\|\n(?:\|[^\n]+\|\n?)+/g, '').trim();
      // Strip ASCII dash-level lines
      rawPhilosophy = rawPhilosophy.replace(/\[\s*[-+]?\d+(?:\.\d+)?\s*dB\s*\]\s*[-—=~]+[^\n]+/gi, '').trim();
      // Clean code fences and headers
      rawPhilosophy = rawPhilosophy.replace(/```[a-z]*\n?/gi, '').replace(/MIX BALANCE \& FADER HIERARCHY:?/i, '').trim();
      result.mixStrategy.philosophy = rawPhilosophy.replace(/^\s*\*\s+/gm, '• ');
    }

    // Resolve s45Idx for master bus table search below
    const s45Idx = s4Text.search(/(?:####\s*4\.5|###\s*Section 4\.5|Master Bus Processing|Master Bus Signal Chain|Mastering \& Final Limiting)/i);

    // 2. Frequency Masking Management & Spectral Separation
    const freqMatch = s4Text.match(/(?:####\s*4\.2[^\n]*|\bFrequency Masking Management[^\n]*|\bFrequency Separation[^\n]*)\n([\s\S]*?)(?=(?:####\s*4\.\d|###\s*Section\s*4\.\d|\n####\s*4|\n###\s*4|$))/i);
    if (freqMatch) {
      result.mixStrategy.frequencySeparation = freqMatch[1].trim().replace(/^\s*\*\s+/gm, '• ');
    } else {
      // Fallback
      const legacyFreq = s4Text.match(/(?:Frequency Separation|Masking Management|Spectral Separation|Frequency Pocketing|Low-End Management)[^:\n]*:?\s*([\s\S]*?)(?=(?:###|\n####|\*\*4\.\d|\*\*Dynamic|\*\*Spatial|\*\*Master Bus|\*\*Master Limiting|$))/i);
      if (legacyFreq) {
        result.mixStrategy.frequencySeparation = legacyFreq[1].trim().replace(/^\s*\*\s+/gm, '• ');
      }
    }

    // 3. Dynamic Control, Mix Subgroups & Automation (Section 4.3)
    const dynSecMatch = s4Text.match(/(?:####\s*4\.3[^\n]*|\bDynamic Control[^\n]*)\n([\s\S]*?)(?=(?:####\s*4\.\d|###\s*Section\s*4\.\d|\n####\s*4|\n###\s*4|$))/i);
    if (dynSecMatch) {
      const full43 = dynSecMatch[1].trim();
      // Check if 4.3 contains automation subheading/bullet
      const autoSplitIdx = full43.search(/(?:^|\n)(?:#{1,6}\s*|\*\s+\*\*|\*\*?)?(?:Mix Automation|Automation Strategy|Automation Passes|Fader Rides)/i);
      if (autoSplitIdx !== -1) {
        result.mixStrategy.dynamicControl = full43.substring(0, autoSplitIdx).trim().replace(/^\s*\*\s+/gm, '• ');
        result.mixStrategy.automation = full43.substring(autoSplitIdx).trim().replace(/^\s*\*\s+/gm, '• ');
      } else {
        result.mixStrategy.dynamicControl = full43.replace(/^\s*\*\s+/gm, '• ');
      }
    } else {
      // Fallback
      const legacyDyn = s4Text.match(/(?:Dynamic Control|Subgroup|Bus Processing|Subgroup Strategy|Sidechain)[^:\n]*:?\s*([\s\S]*?)(?=(?:###|\n####|\*\*4\.\d|\*\*Spatial|\*\*Master Bus|\*\*Master Limiting|$))/i);
      if (legacyDyn) {
        result.mixStrategy.dynamicControl = legacyDyn[1].trim().replace(/^\s*\*\s+/gm, '• ');
      }
    }

    // Clean any leaked fader table from dynamicControl
    if (result.mixStrategy.dynamicControl && /\|[^\n]*(?:stem|element)[^\n]*\|/i.test(result.mixStrategy.dynamicControl)) {
      result.mixStrategy.dynamicControl = result.mixStrategy.dynamicControl.replace(/\|[^\n]*(?:stem|element)[^\n]*\|\n\|[-| :]+\|\n(?:\|[^\n]+\|\n?)+/gi, '').trim();
    }

    // 4. Spatial Depth & Time-Based FX (Section 4.4)
    const spatMatch = s4Text.match(/(?:####\s*4\.4[^\n]*|\bSpatial Depth[^\n]*)\n([\s\S]*?)(?=(?:####\s*4\.\d|###\s*Section\s*4\.\d|\n####\s*4|\n###\s*4|$))/i);
    if (spatMatch) {
      result.mixStrategy.spatialDepth = spatMatch[1].trim().replace(/^\s*\*\s+/gm, '• ');
    } else {
      // Fallback
      const legacySpat = s4Text.match(/(?:Spatial Depth|Time-Based FX|Reverb & Delay|Spatial Dimension|Front-to-Back)[^:\n]*:?\s*([\s\S]*?)(?=(?:###|\n####|\*\*4\.\d|\*\*Automation|\*\*Master Bus|\*\*Master Limiting|\|[^\n]+\|[-| :]+|$))/i);
      if (legacySpat) {
        result.mixStrategy.spatialDepth = legacySpat[1].trim().replace(/^\s*\*\s+/gm, '• ');
      }
    }

    // 5. Automation Strategy (if not already extracted from Section 4.3)
    if (!result.mixStrategy.automation) {
      const autoMatch = s4Text.match(/(?:####\s*4\.\d\s+)?(?:Automation Strategy|Mix Automation|Fader Rides)[^:\n]*:?\s*([\s\S]*?)(?=(?:####\s*4\.\d|###\s*Section\s*4\.\d|\n####\s*4|\n###\s*4|$))/i);
      if (autoMatch) {
        result.mixStrategy.automation = autoMatch[1].trim().replace(/^\s*\*\s+/gm, '• ');
      }
    }

    // 6. Master Bus Table (Search specifically within Section 4.5 to avoid collision with 4.1)
    const s45TableIdx = s4Text.search(/(?:####\s*4\.5|###\s*Section 4\.5|Master Bus Processing|Master Bus Signal Chain|Mastering & Final Limiting)/i);
    if (s45TableIdx !== -1) {
      const s45Text = s4Text.substring(s45TableIdx);
      const tableMatch = s45Text.match(/\|[^\n]+\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
      if (tableMatch) {
        const rows = tableMatch[1].trim().split('\n');
        const parsedRows = [];
        for (const row of rows) {
          const cells = row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
          if (cells.length >= 3) {
            parsedRows.push({
              stage: cells[0],
              processor: cells[1],
              settings: cells[2],
              objective: cells[3] || ''
            });
          }
        }
        // Guard: Discard if this table is actually track fader balances / stems
        const isFaderTable = parsedRows.some(r => /vocal|kick|snare|guitar|synth|bass/i.test(r.stage) && /dB|pan/i.test(r.processor + r.settings));
        if (!isFaderTable) {
          result.masterBus.table = parsedRows;
        }
      }
    }

    // 7. Backward compatibility for legacy outputs
    const mixBusMatch = s4Text.match(/\*\s+\*\*Mix Bus Signal Chain:\*\*\s*([\s\S]*?)(?=\*\s+\*\*Master Limiting|\*\s+\*\*Automation|###|$)/i);
    if (mixBusMatch) {
      result.masterBus.mixBusChain = mixBusMatch[1].trim();
    }

    const limitMatch = s4Text.match(/(?:Master Limiting|Mastering & Final Limiting|Loudness & Dynamic Range)[^*:\n]*:?\s*([\s\S]*?)(?=(?:###|Section 5|$))/i);
    if (limitMatch) {
      result.masterBus.limiting = limitMatch[1].trim().replace(/^\s*\*\s+/gm, '• ');
    }
  }

  // 8. Cross-enrich trackTable with details from instruments if dynamics, EQ, inserts, or aux are empty
  if (result.trackTable && result.trackTable.length > 0) {
    result.trackTable.forEach((row, idx) => {
      const matchedInst = result.instruments.find(inst => {
        const sNorm = (row.stem || '').toLowerCase();
        const iNorm = (inst.name || '').toLowerCase();
        return sNorm.includes(iNorm) || iNorm.includes(sNorm);
      }) || result.instruments[idx];

      if (matchedInst) {
        if (!row.capture || row.capture === 'Direct Capture') {
          row.capture = matchedInst.preferredPathway || matchedInst.pathway1 || matchedInst.pathway2 || matchedInst.pathway3 || 'Acoustic / DI Capture';
        }

        if (!row.dynamics && matchedInst.channelStrip && matchedInst.channelStrip.length > 0) {
          const dynPlugins = matchedInst.channelStrip.filter(cs => {
            const p = (cs.plugin || cs.type || '').toLowerCase();
            return p.includes('gate') || p.includes('comp') || p.includes('limit') || p.includes('vca') || p.includes('opto') || p.includes('fet') || p.includes('expander');
          });
          if (dynPlugins.length > 0) {
            row.dynamics = dynPlugins.map(d => d.plugin).join(' + ');
          }
        }

        if (!row.eq && matchedInst.channelStrip && matchedInst.channelStrip.length > 0) {
          const eqPlugins = matchedInst.channelStrip.filter(cs => {
            const p = (cs.plugin || cs.type || '').toLowerCase();
            return p.includes('eq') || p.includes('filter') || p.includes('hpf') || p.includes('pultec') || p.includes('bell');
          });
          if (eqPlugins.length > 0) {
            row.eq = eqPlugins.map(e => e.plugin).join(' + ');
          }
        }

        if (!row.inserts && matchedInst.channelStrip && matchedInst.channelStrip.length > 0) {
          const insPlugins = matchedInst.channelStrip.filter(cs => {
            const p = (cs.plugin || cs.type || '').toLowerCase();
            return !p.includes('gate') && !p.includes('comp') && !p.includes('limit') && !p.includes('vca') && !p.includes('eq') && !p.includes('filter');
          });
          if (insPlugins.length > 0) {
            row.inserts = insPlugins.map(i => i.plugin).join(' + ');
          }
        }

        if (!row.aux) {
          const stemLow = (row.stem || '').toLowerCase();
          if (stemLow.includes('kick')) row.aux = 'Aux 1 (Mono Sub / Dry)';
          else if (stemLow.includes('snare')) row.aux = 'Aux 1 (Plate Reverb)';
          else if (stemLow.includes('drum') || stemLow.includes('overhead')) row.aux = 'Aux 2 (Drum Room Reverb)';
          else if (stemLow.includes('bass')) row.aux = 'Aux (Amp Fuzz / Sub)';
          else if (stemLow.includes('vocal')) row.aux = 'Aux 1 (Plate) + Aux 2 (Tape Delay)';
          else if (stemLow.includes('guitar')) row.aux = 'Aux 2 (Tape Delay / Spring)';
          else if (stemLow.includes('piano') || stemLow.includes('key')) row.aux = 'Aux 1 (Concert Hall Reverb)';
          else if (stemLow.includes('brass') || stemLow.includes('horn')) row.aux = 'Aux 1 (Chamber Reverb)';
          else row.aux = 'Aux 1 (Room Reverb)';
        }

        if (!row.dynamics) {
          const stemLow = (row.stem || '').toLowerCase();
          if (stemLow.includes('kick') || stemLow.includes('snare')) row.dynamics = 'Noise Gate + Studio VCA';
          else if (stemLow.includes('bass')) row.dynamics = 'Vintage Opto (LA-2A)';
          else if (stemLow.includes('vocal')) row.dynamics = 'FET Compressor (1176)';
          else row.dynamics = 'Studio VCA Compressor';
        }
        if (!row.eq) {
          row.eq = 'Channel EQ (High-Pass + Notch)';
        }
      }
    });
  } else if (result.instruments && result.instruments.length > 0) {
    result.instruments.forEach((inst, idx) => {
      const stemLow = (inst.name || '').toLowerCase();
      let fader = '-6.0 dB';
      let pan = 'Center';
      if (stemLow.includes('lead vocal')) { fader = '0.0 dB'; pan = 'Center'; }
      else if (stemLow.includes('kick')) { fader = '-3.0 dB'; pan = 'Center'; }
      else if (stemLow.includes('snare')) { fader = '-3.5 dB'; pan = 'Center'; }
      else if (stemLow.includes('bass')) { fader = '-4.0 dB'; pan = 'Center'; }
      else if (stemLow.includes('guitar')) { fader = '-6.5 dB'; pan = idx % 2 === 0 ? 'L 45°' : 'R 45°'; }
      else if (stemLow.includes('overhead')) { fader = '-7.5 dB'; pan = 'Stereo L/R'; }
      else if (stemLow.includes('backing') || stemLow.includes('harmony')) { fader = '-8.0 dB'; pan = 'L/R 35°'; }
      else if (stemLow.includes('brass') || stemLow.includes('horn')) { fader = '-7.0 dB'; pan = 'R 30°'; }
      else if (stemLow.includes('piano') || stemLow.includes('organ') || stemLow.includes('hammond')) { fader = '-6.0 dB'; pan = 'L 25°'; }

      const dynPlugins = (inst.channelStrip || []).filter(cs => /gate|comp|limit|vca|opto|fet/i.test(cs.plugin || cs.type || ''));
      const eqPlugins = (inst.channelStrip || []).filter(cs => /eq|filter|hpf/i.test(cs.plugin || cs.type || ''));
      const insPlugins = (inst.channelStrip || []).filter(cs => !/gate|comp|limit|vca|eq|filter/i.test(cs.plugin || cs.type || ''));

      result.trackTable.push({
        trackNo: String(idx + 1),
        stem: inst.name,
        capture: inst.preferredPathway || inst.pathway1 || inst.pathway2 || inst.pathway3 || 'Acoustic / DI Capture',
        fader,
        pan,
        dynamics: dynPlugins.map(d => d.plugin).join(' + ') || 'Studio VCA Compressor',
        eq: eqPlugins.map(e => e.plugin).join(' + ') || 'Channel EQ',
        inserts: insPlugins.map(i => i.plugin).join(' + ') || 'Tape Saturation',
        aux: stemLow.includes('vocal') ? 'Aux 1 (Plate) + Aux 2 (Tape Delay)' : 'Aux 1 (Room Reverb)',
        pathway: inst.preferredPathway || '',
        inputSource: inst.pathway1 || '',
        dawInput: `Input ${idx + 1}`,
        targetHeadroom: '-12 dBFS'
      });
    });
  }

  return result;
}
