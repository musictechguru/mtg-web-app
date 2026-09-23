import { parseLogbook } from './logbookParser.js';

export function parseProducerRecreation(markdown) {
  if (!markdown) return null;

  // If this markdown is in the standard C1 / Logbook comprehensive format, parse with parseLogbook
  const hasLogbookS2 = /### Section 2[^\n]*\n+\s*\|[^|]*Trk[^|]*\|[^|]*Stem[^|]*\|[^|]*Capture/i.test(markdown) ||
                       /\|[ ]*Trk[ ]*\|[ ]*Stem \/ Instrument[ ]*\|/i.test(markdown);
  if (hasLogbookS2) {
    const logbookData = parseLogbook(markdown);
    if (logbookData && logbookData.trackTable && logbookData.trackTable.length > 0) {
      logbookData.isProducer = true;
      return logbookData;
    }
  }

  const result = {
    title: 'Studio Production & Stem Recreation Dossier',
    trackName: '',
    artistName: '',
    daw: '',
    audioInterface: '',
    monitoring: '',
    originalYear: '',
    tempoBpm: '',
    keySignature: '',
    summary: '',
    eraHeritage: '',
    originalGearRoster: [],
    trackTable: [],
    stems: [],
    mixStrategy: {
      philosophy: '',
      faderHierarchy: [],
      frequencySeparation: '',
      dynamicControl: '',
      spatialDepth: '',
      automation: ''
    },
    masterBus: {
      stockChain: [],
      thirdPartyChain: [],
      targetLoudness: '-8 to -10 LUFS',
      truePeak: '-0.3 dBFS',
      phaseCorrelation: '+0.8 to +1.0',
      notes: ''
    }
  };

  // 1. Header & Metadata
  const titleArtistMatch = markdown.match(/(?:Selected Title & Artist|Song & Artist|Song Title|TRACK):\s*\*{0,2}(.*?)\*{0,2}(?:\n|$)/i);
  if (titleArtistMatch) {
    const raw = titleArtistMatch[1].trim();
    const parts = raw.split(/\s*[-—–]\s*|\s+by\s+/i);
    if (parts.length > 1) {
      result.trackName = parts[0].trim().replace(/^["'*]+|["'*]+$/g, '');
      result.artistName = parts[1].trim().replace(/^["'*]+|["'*]+$/g, '');
    } else {
      result.trackName = raw.replace(/^["'*]+|["'*]+$/g, '');
    }
  }

  const dawMatch = markdown.match(/(?:Primary (?:Digital Audio Workstation|DAW)|Target DAW):\s*\*{0,2}(.*?)\*{0,2}(?:\n|$)/i);
  if (dawMatch) {
    result.daw = dawMatch[1].trim().replace(/\s*\(.*?\)/, '');
  }

  const ifaceMatch = markdown.match(/(?:Studio Audio Interface|Audio Interface & Converters|Interface):\s*\*{0,2}(.*?)\*{0,2}(?:\n|$)/i);
  if (ifaceMatch) {
    result.audioInterface = ifaceMatch[1].trim();
  }

  const monitorMatch = markdown.match(/(?:Monitoring & Acoustic Calibration|Monitoring Environment|Monitors):\s*\*{0,2}(.*?)\*{0,2}(?:\n|$)/i);
  if (monitorMatch) {
    result.monitoring = monitorMatch[1].trim();
  }

  const bpmMatch = markdown.match(/(?:\*\*|[*•-])\s*(?:Tempo(?:\s*\/\s*BPM|\s*&\s*Meter)?|BPM)\s*[:*]+\s*(?:~|approx\.?|approximately\s*)?\b(\d{2,3}(?:\.\d+)?)(?:\s*-\s*\d{2,3}(?:\.\d+)?)?\s*BPM/i) ||
                   markdown.match(/\b(\d{2,3}(?:\.\d+)?)\s*BPM\b/i);
  if (bpmMatch) {
    const num = parseFloat(bpmMatch[1]);
    result.tempoBpm = !isNaN(num) && num > 0 ? `${num} BPM` : bpmMatch[1].trim();
  }

  const keyMatch = markdown.match(/\*\*\s*(?:Key(?:\s*\/\s*Tonal Center)?|Tonal Center)\s*[:*]+\s*([A-G][b#]?(?:\s*(?:Major|Minor|m|Maj|Min))?)/i);
  if (keyMatch) {
    result.keySignature = keyMatch[1].trim();
  }

  // 2. Section 1: Production Blueprint & Original Gear
  const s1Match = markdown.match(/### Section 1[^\n]*\n+([\s\S]*?)(?=### Section 2|$)/i);
  if (s1Match) {
    const s1Text = s1Match[1];
    const firstBlock = s1Text.split(/\n\s*[*•-]\s+/)[0].replace(/^[*#\s]+/, '').trim();
    if (firstBlock && !firstBlock.toLowerCase().includes('selected title') && !firstBlock.toLowerCase().includes('target daw')) {
      result.summary = firstBlock;
    } else {
      result.summary = '';
    }

    const eraMatch = s1Text.match(/(?:Production Era|Historic Session Context|Historic Heritage):\s*\*{0,2}([\s\S]*?)(?=(?:\n\*\s+\*\*|\n###|$))/i);
    if (eraMatch) {
      result.eraHeritage = eraMatch[1].trim();
    }

    // Extract gear bullets
    const lines = s1Text.split('\n');
    let inGear = false;
    for (const line of lines) {
      if (line.includes('Verified Original Master Equipment') || line.includes('Original Master Equipment') || line.includes('Original Hardware')) {
        inGear = true;
        continue;
      }
      if (inGear) {
        if (line.trim().startsWith('---') || line.trim().startsWith('###')) {
          break;
        }
        const m = line.match(/\*\*\s*([^*:]+)\s*[:*]+\s*(.*)$/);
        if (m) {
          result.originalGearRoster.push({
            name: m[1].trim(),
            role: m[2].trim()
          });
        }
      }
    }
  }

  // Helper to parse Channel Strip Tables
  const parseTableRows = (tableText) => {
    const rows = [];
    if (!tableText) return rows;
    const lines = tableText.trim().split('\n').filter(l => l.trim().startsWith('|') && !l.includes('---'));
    for (let i = 1; i < lines.length; i++) {
      const cells = lines[i].split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (cells.length >= 4) {
        rows.push({
          slot: cells[0] || `Slot ${i}`,
          plugin: cells[1] || 'Plugin',
          type: cells[2] || 'Processor',
          settings: cells[3] || '',
          objective: cells[4] || ''
        });
      }
    }
    return rows;
  };

  // 3. Section 2: Master Track Sheet Table
  // Check whether Section 2 contains the Master Track Sheet table (new format) or Stems directly (old format)
  const s2Idx = markdown.indexOf('### Section 2');
  const s3Idx = markdown.indexOf('### Section 3');
  const s4Idx = markdown.indexOf('### Section 4');

  const s2Text = s2Idx !== -1 
    ? (s3Idx !== -1 ? markdown.substring(s2Idx, s3Idx) : (s4Idx !== -1 ? markdown.substring(s2Idx, s4Idx) : markdown.substring(s2Idx)))
    : '';

  const isNewSection2RoutingTable = s2Text && /Master Track Sheet|Channel Allocation Table|Input Routing/i.test(s2Text);

  if (isNewSection2RoutingTable) {
    const trackTableMatch = s2Text.match(/\|([^\n]+)\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
    if (trackTableMatch) {
      const headerCells = trackTableMatch[1].split('|').map(h => h.trim().toLowerCase()).filter(Boolean);
      const rows = trackTableMatch[2].trim().split('\n');

      const trkIdx = headerCells.findIndex(h => h.includes('trk') || h.includes('track'));
      const stemIdx = headerCells.findIndex(h => h.includes('stem') || h.includes('instrument') || h.includes('element'));
      const captureIdx = headerCells.findIndex(h => h.includes('capture') || h.includes('pathway') || h.includes('source') || h.includes('mic') || h.includes('input'));
      const faderIdx = headerCells.findIndex(h => h.includes('fader') || h.includes('level') || h.includes('volume'));
      const panIdx = headerCells.findIndex(h => h.includes('pan') || h.includes('pos'));
      const dynIdx = headerCells.findIndex(h => h.includes('dynamic') || h.includes('gate') || h.includes('comp'));
      const eqIdx = headerCells.findIndex(h => h.includes('eq') || h.includes('equaliz') || h.includes('filter'));
      const insertsIdx = headerCells.findIndex(h => h.includes('insert') || h.includes('fx'));
      const auxIdx = headerCells.findIndex(h => h.includes('aux') || h.includes('send') || h.includes('reverb') || h.includes('routing'));

      const isComprehensiveFormat = dynIdx !== -1 || eqIdx !== -1 || insertsIdx !== -1;

      for (const row of rows) {
        const cells = row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cells.length >= 3) {
          if (isComprehensiveFormat) {
            result.trackTable.push({
              trackNo: trkIdx !== -1 && cells[trkIdx] ? cells[trkIdx] : `${result.trackTable.length + 1}`,
              stem: stemIdx !== -1 && cells[stemIdx] ? cells[stemIdx] : cells[1] || 'Stem',
              capture: captureIdx !== -1 && cells[captureIdx] ? cells[captureIdx] : cells[2] || '',
              fader: faderIdx !== -1 && cells[faderIdx] ? cells[faderIdx] : '0.0 dB',
              pan: panIdx !== -1 && cells[panIdx] ? cells[panIdx] : 'C',
              dynamics: dynIdx !== -1 && cells[dynIdx] ? cells[dynIdx] : '',
              eq: eqIdx !== -1 && cells[eqIdx] ? cells[eqIdx] : '',
              inserts: insertsIdx !== -1 && cells[insertsIdx] ? cells[insertsIdx] : '',
              aux: auxIdx !== -1 && cells[auxIdx] ? cells[auxIdx] : '',
              pathway: captureIdx !== -1 ? cells[captureIdx] : '',
              originalSource: captureIdx !== -1 ? cells[captureIdx] : '',
              dawInput: `Input ${result.trackTable.length + 1}`,
              targetHeadroom: '-10 dBFS Peak'
            });
          } else {
            // Legacy 8-9 column routing table format
            const hasPathwayCol = cells.length >= 9 || /(?:pathway|mic|di|instrument|midi)/i.test(cells[2]);
            const trackNo = cells[0] || `${result.trackTable.length + 1}`;
            const stem = cells[1] || 'Stem';
            let pathway = hasPathwayCol ? cells[2] : '';
            const originalSource = hasPathwayCol ? cells[3] : cells[2];
            const dawInput = hasPathwayCol ? cells[4] : cells[3];
            const pan = hasPathwayCol ? cells[5] : cells[4];
            const fader = hasPathwayCol ? cells[6] : cells[5];
            const targetHeadroom = hasPathwayCol ? cells[7] : cells[6];
            const routing = cells[cells.length - 1] || 'Subgroup';

            if (!pathway) {
              const normInput = (dawInput + ' ' + stem + ' ' + originalSource).toLowerCase();
              if (normInput.includes('audio track') || normInput.includes('mic') || normInput.includes('vocal') || normInput.includes('acoustic')) {
                pathway = 'Pathway 1: Microphone';
              } else if (normInput.includes('di') || normInput.includes('direct')) {
                pathway = 'Pathway 2: Direct Injection (DI)';
              } else {
                pathway = 'Pathway 3: Audio Instrument';
              }
            }

            result.trackTable.push({
              trackNo,
              stem,
              capture: originalSource || pathway || dawInput || 'Direct Capture',
              pathway,
              originalSource,
              dawInput,
              pan,
              fader,
              targetHeadroom,
              routing,
              dynamics: '',
              eq: '',
              inserts: '',
              aux: routing
            });
          }
        }
      }
    }
  }

  // 4. Stems Processing: In new format, Stems are in Section 3. In legacy format, Stems are in Section 2.
  const stemsBlockText = isNewSection2RoutingTable
    ? (s3Idx !== -1 ? (s4Idx !== -1 ? markdown.substring(s3Idx, s4Idx) : markdown.substring(s3Idx)) : '')
    : s2Text;

  if (stemsBlockText) {
    const stemChunks = stemsBlockText.split(/\n####\s+/);
    for (let i = 1; i < stemChunks.length; i++) {
      const chunk = stemChunks[i];
      const firstLineEnd = chunk.indexOf('\n');
      const rawHeader = firstLineEnd !== -1 ? chunk.substring(0, firstLineEnd).trim() : chunk.trim();
      const body = firstLineEnd !== -1 ? chunk.substring(firstLineEnd) : '';

      const stemName = rawHeader.replace(/^(?:Stem\s*\d*[:.-]?\s*|\d+\.\s*)/i, '').trim();

      const cleanVal = (val) => {
        if (!val) return '';
        return val
          .replace(/^\*+\s*/, '')
          .replace(/\*{1,2}$/, '')
          .replace(/^[`"']+|[`"']+$/g, '')
          .trim();
      };

      // Detect Pathway (Pathway 1: Mic, Pathway 2: DI, Pathway 3: Audio Instrument)
      let pathwayStr = '';
      let pathwayType = 3; // Default 3: Audio Instrument

      const pathwayMatch = body.match(/(?:\*{0,2}(?:Selected )?(?:Recreation |Capture )?Pathway\*{0,2})[:\s]*([^\n*]+)/i);
      if (pathwayMatch) {
        pathwayStr = cleanVal(pathwayMatch[1]);
      } else {
        const matchedRow = result.trackTable.find(r => 
          r.stem.toLowerCase().includes(stemName.toLowerCase()) || 
          stemName.toLowerCase().includes(r.stem.toLowerCase())
        );
        if (matchedRow && matchedRow.pathway) {
          pathwayStr = cleanVal(matchedRow.pathway);
        }
      }

      const normPathway = pathwayStr.toLowerCase();
      const normAll = (pathwayStr + ' ' + stemName).toLowerCase();

      if (normPathway.includes('pathway 3') || normPathway.includes('audio instrument') || normPathway.includes('software instrument') || normPathway.includes('sampler') || normPathway.includes('synth')) {
        pathwayType = 3;
        pathwayStr = pathwayStr || 'Pathway 3: Audio Instrument';
      } else if (normPathway.includes('pathway 1') || normPathway.includes('mic') || normAll.includes('vocal') || normAll.includes('voice') || normPathway.includes('acoustic')) {
        pathwayType = 1;
        pathwayStr = pathwayStr || 'Pathway 1: Microphone (Acoustic Capture)';
      } else if (normPathway.includes('pathway 2') || /\bdi\b/i.test(normPathway) || normPathway.includes('direct injection') || normAll.includes('direct injection')) {
        pathwayType = 2;
        pathwayStr = pathwayStr || 'Pathway 2: Direct Injection (DI)';
      } else if (normAll.includes('mic') || normAll.includes('acoustic')) {
        pathwayType = 1;
        pathwayStr = pathwayStr || 'Pathway 1: Microphone (Acoustic Capture)';
      } else {
        pathwayType = 3;
        pathwayStr = pathwayStr || 'Pathway 3: Audio Instrument';
      }

      const stemObj = {
        name: stemName,
        pathway: pathwayStr,
        pathwayType, // 1 | 2 | 3
        originalGear: '',
        microphoneSetup: {
          microphone: '',
          placement: '',
          preamp: '',
          comping: '',
          rawText: ''
        },
        diSetup: {
          diBox: '',
          preamp: '',
          rawText: ''
        },
        soundDesign: {
          synthModel: '',
          oscillators: '',
          filter: '',
          envelope: '',
          lfo: '',
          effects: '',
          rawRecipe: ''
        },
        midiProgramming: {
          gridSwing: '',
          velocityDynamics: '',
          modulation: '',
          rawMidi: ''
        },
        stockInstrument: '',
        stockPreset: '',
        stockInstrumentSettings: '',
        stockPreamp: '',
        stockChain: [],
        thirdPartyInstrument: '',
        thirdPartyPreset: '',
        thirdPartyInstrumentSettings: '',
        thirdPartyPreamp: '',
        thirdPartyChain: [],
        thirdPartyLinks: [],
        rawBody: body
      };

      // Extract Original Master Gear / Tracking
      const gearMatch = body.match(/(?:\*{1,2}Original(?: Master)? Gear(?:\s*&\s*Tracking Chain)?(?::\*{1,2}|\*{1,2}:)|Original Hardware:)\s*([^\n]+)/i);
      if (gearMatch) {
        stemObj.originalGear = gearMatch[1].trim();
      }

      // If Pathway 1: Microphone — Extract Acoustic Capture Details
      if (pathwayType === 1) {
        const micBlockMatch = body.match(/(?:\*{0,2}(?:Acoustic Microphone & Tracking Architecture|Vocal Performance & Tracking Protocol|Microphone & Tracking Architecture|Acoustic Capture Architecture)\*{0,2})[:\s]*([\s\S]*?)(?=(?:\*{0,2}(?:DAW Track|Stock DAW|100% Native|Native Stock)|###|####|$))/i);
        const searchScope = micBlockMatch ? micBlockMatch[1] : body;
        stemObj.microphoneSetup.rawText = searchScope.trim();

        const mMatch = searchScope.match(/(?:Microphone (?:Selection & Capsule|Selection|Model)|Microphone Model|Microphone|Capsule)\*{0,2}:\s*([^\n]+)/i);
        if (mMatch && !/technique|distance|placement/i.test(mMatch[0])) {
          stemObj.microphoneSetup.microphone = cleanVal(mMatch[1]);
        }

        const pMatch = searchScope.match(/(?:Placement & Distance|Microphone Technique|Placement|Distance)\*{0,2}:\s*([^\n]+)/i);
        if (pMatch) stemObj.microphoneSetup.placement = cleanVal(pMatch[1]);

        const preMatch = searchScope.match(/(?:Hardware Preamp(?: & Tracking Front-End)?|Preamp & Tracking|Preamp)\*{0,2}:\s*([^\n]+)/i);
        if (preMatch) stemObj.microphoneSetup.preamp = cleanVal(preMatch[1]);

        const compMatch = searchScope.match(/(?:Performance Tracking & Comping Technique|Comping Technique|Dynamics & Pitch|Tracking Protocol|Comping)\*{0,2}:\s*([^\n]+)/i);
        if (compMatch) stemObj.microphoneSetup.comping = cleanVal(compMatch[1]);

        // Fallback to originalGear tracking chain if specific mic wasn't captured in sub-bullets
        if (!stemObj.microphoneSetup.microphone && stemObj.originalGear) {
          const firstGear = stemObj.originalGear.split('->')[0].trim();
          if (/mic|condenser|dynamic|ribbon|u87|sm57|c414|u47/i.test(firstGear)) {
            stemObj.microphoneSetup.microphone = firstGear;
          }
        }
        if (!stemObj.microphoneSetup.preamp && stemObj.originalGear && stemObj.originalGear.includes('->')) {
          const parts = stemObj.originalGear.split('->').map(p => p.trim());
          const pre = parts.find(p => /preamp|console|desk|soundcraft|neve|ssl|api/i.test(p));
          if (pre) stemObj.microphoneSetup.preamp = pre;
        }
      }

      // If Pathway 2: Direct Injection — Extract DI Details
      if (pathwayType === 2) {
        const diBlockMatch = body.match(/(?:\*{0,2}(?:Direct Injection & Line Tracking Architecture|Direct Injection Architecture|DI Tracking Architecture)\*{0,2})[:\s]*([\s\S]*?)(?=(?:\*{0,2}(?:DAW Track|Stock DAW|100% Native|Native Stock)|###|####|$))/i);
        const searchScope = diBlockMatch ? diBlockMatch[1] : body;
        stemObj.diSetup.rawText = searchScope.trim();

        const diBoxMatch = searchScope.match(/(?:DI Box(?: & Impedance Matching)?|DI Box)\*{0,2}:\s*([^\n]+)/i);
        if (diBoxMatch) stemObj.diSetup.diBox = cleanVal(diBoxMatch[1]);

        const preMatch = searchScope.match(/(?:Hardware Preamp(?: & Line Trim)?|Preamp)\*{0,2}:\s*([^\n]+)/i);
        if (preMatch) stemObj.diSetup.preamp = cleanVal(preMatch[1]);

        if (!stemObj.diSetup.diBox && stemObj.originalGear) {
          stemObj.diSetup.diBox = stemObj.originalGear.split('->')[0].trim();
        }
      }

      // If Pathway 3: Audio Instrument — Extract Sound Design & MIDI
      if (pathwayType === 3) {
        const sdBlockMatch = body.match(/(?:\*{0,2}(?:Synthesizer )?Sound Design(?: Recipe| & Synthesis)?\*{0,2})[:\s]*([\s\S]*?)(?=(?:\*{0,2}(?:MIDI Step Programming|Stock DAW|100% Native|Native Stock)|###|####|$))/i);
        if (sdBlockMatch) {
          const sdText = sdBlockMatch[1].trim();
          stemObj.soundDesign.rawRecipe = sdText;

          const oscMatch = sdText.match(/(?:Oscillators?|Waveforms?|Osc):\s*([^\n]+)/i);
          if (oscMatch) stemObj.soundDesign.oscillators = oscMatch[1].trim();

          const fltMatch = sdText.match(/(?:Filter|Cutoff|VCF):\s*([^\n]+)/i);
          if (fltMatch) stemObj.soundDesign.filter = fltMatch[1].trim();

          const envMatch = sdText.match(/(?:Envelopes?|ADSR|VCA):\s*([^\n]+)/i);
          if (envMatch) stemObj.soundDesign.envelope = envMatch[1].trim();

          const lfoMatch = sdText.match(/(?:LFO|Modulation):\s*([^\n]+)/i);
          if (lfoMatch) stemObj.soundDesign.lfo = lfoMatch[1].trim();

          const fxMatch = sdText.match(/(?:Character FX|Effects?|Chorus|Saturation):\s*([^\n]+)/i);
          if (fxMatch) stemObj.soundDesign.effects = fxMatch[1].trim();
        }

        const midiBlockMatch = body.match(/(?:\*{0,2}MIDI Step Programming & Humanization\*{0,2})[:\s]*([\s\S]*?)(?=(?:\*{0,2}(?:Stock DAW|100% Native|Native Stock)|###|####|$))/i);
        if (midiBlockMatch) {
          const mText = midiBlockMatch[1].trim();
          stemObj.midiProgramming.rawMidi = mText;

          const gridMatch = mText.match(/(?:Quantize Grid & Swing|Grid & Swing|Grid):\s*([^\n]+)/i);
          if (gridMatch) stemObj.midiProgramming.gridSwing = gridMatch[1].trim();

          const velMatch = mText.match(/(?:Velocity Dynamics|Dynamics|Velocity):\s*([^\n]+)/i);
          if (velMatch) stemObj.midiProgramming.velocityDynamics = velMatch[1].trim();

          const modMatch = mText.match(/(?:Performance Modulation|Modulation|CC):\s*([^\n]+)/i);
          if (modMatch) stemObj.midiProgramming.modulation = modMatch[1].trim();
        }
      }

      // Extract Stock DAW Solution
      const stockBlockMatch = body.match(/(?:100%\s*Native\s*Stock|Stock\s*DAW|Native\s*Stock)[\s\S]*?(?=(?:Industry-Standard|3rd-Party|Third-Party|####|\n\s*###|$))/i);
      if (stockBlockMatch) {
        const sText = stockBlockMatch[0];
        
        // Preamp / Input Emulation (for Pathway 1 & 2)
        const preampMatch = sText.match(/(?:Console Preamp(?: \/ Input Emulation)?|Stock Amp(?: \/ Preamp)?|Preamp Emulation|Preamp)\*{0,2}:\s*\*{0,2}([^\n]+)/i);
        if (preampMatch) stemObj.stockPreamp = cleanVal(preampMatch[1]);

        // Native Software Instrument (for Pathway 3)
        if (pathwayType === 3) {
          const instMatch = sText.match(/(?:Native (?:Software )?Instrument(?: \/ Sound Source)?|Native Sound Source|Native Instrument|Instrument|Synth|Generator)\*{0,2}:\s*\*{0,2}([^\n]+)/i);
          if (instMatch) stemObj.stockInstrument = cleanVal(instMatch[1]);
        }

        // Stock Preset / Starting Patch / Channel Strip Preset
        const presetMatch = sText.match(/(?:Stock (?:Channel Strip )?Preset(?: \/ Starting Patch)?|Stock Channel Strip Preset|Starting Patch|Channel Strip Preset|Stock Starting Patch|Preset)\*{0,2}:\s*\*{0,2}([^\n]+)/i);
        if (presetMatch) stemObj.stockPreset = cleanVal(presetMatch[1]);

        // Instrument Core Settings OR Gain Staging
        const settingsMatch = sText.match(/(?:(?:Instrument )?Core (?:Generator )?Settings|Instrument (?:Core )?Settings|Core Generator Settings|Tracking Gain Staging|Gain Staging|Core Settings|Generator Settings)\*{0,2}:\s*\*{0,2}([^\n]+)/i);
        if (settingsMatch) stemObj.stockInstrumentSettings = cleanVal(settingsMatch[1]);
        
        const tableMatch = sText.match(/\|[^\n]+\|\n\s*\|[-| :]+\|\n((?:\s*\|[^\n]+\|\n?)+)/);
        if (tableMatch) {
          stemObj.stockChain = parseTableRows(tableMatch[0]);
        }
      }

      // Extract 3rd-Party Solution Table
      const tpBlockMatch = body.match(/(?:Industry-Standard\s*3rd-Party|Third-Party Solution|3rd-Party\s*VST|3rd-Party\s*Solution)[\s\S]*?(?=(?:####|\n\s*###|$))/i);
      if (tpBlockMatch) {
        const tpText = tpBlockMatch[0];

        // Dedicated Preamp / Amp VST (for Pathway 1 & 2)
        const tpPreampMatch = tpText.match(/(?:Dedicated Preamp(?: & Channel Strip VST)?|Dedicated Pro DI(?: \/ Amp VST)?|Preamp VST|Preamp)\*{0,2}:\s*\*{0,2}([^\n]+)/i);
        if (tpPreampMatch) stemObj.thirdPartyPreamp = cleanVal(tpPreampMatch[1]);

        // Dedicated 3rd-Party VST (for Pathway 3)
        if (pathwayType === 3) {
          const tpInstMatch = tpText.match(/(?:Dedicated (?:3rd-Party )?VST(?: \/ Emulation)?|Dedicated VST|3rd-Party VST|3rd-Party Instrument|VST \/ Emulation|Instrument|Synth|VST)\*{0,2}:\s*\*{0,2}([^\n]+)/i);
          if (tpInstMatch) stemObj.thirdPartyInstrument = cleanVal(tpInstMatch[1]);
        }

        // 3rd-Party Preset / Sound Bank
        const tpPresetMatch = tpText.match(/(?:3rd-Party Preset(?: \/ Sound Bank)?|3rd-Party Preset \/ Starting Template|Preset \/ Sound Bank|Sound Bank|3rd-Party Preset|Starting Patch|Preset)\*{0,2}:\s*\*{0,2}([^\n]+)/i);
        if (tpPresetMatch) stemObj.thirdPartyPreset = cleanVal(tpPresetMatch[1]);

        // VST Core Settings
        const tpSettingsMatch = tpText.match(/(?:(?:VST )?Core (?:Generator )?Settings|VST (?:Core )?Settings|Core Generator Settings|Core Settings|Generator Settings)\*{0,2}:\s*\*{0,2}([^\n]+)/i);
        if (tpSettingsMatch) stemObj.thirdPartyInstrumentSettings = cleanVal(tpSettingsMatch[1]);

        const tableMatch = tpText.match(/\|[^\n]+\|\n\s*\|[-| :]+\|\n((?:\s*\|[^\n]+\|\n?)+)/);
        if (tableMatch) {
          stemObj.thirdPartyChain = parseTableRows(tableMatch[0]);
        }

        // Extract any 3rd party markdown links
        const linkMatches = [...tpText.matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)];
        for (const lm of linkMatches) {
          stemObj.thirdPartyLinks.push({
            name: lm[1],
            url: lm[2]
          });
        }
      }

      result.stems.push(stemObj);
    }
  }

  // 5. Section 4 (or Section 3 in legacy): Mix Architecture & Console Routing
  const mixdownSectionText = s4Idx !== -1 
    ? markdown.substring(s4Idx) 
    : (isNewSection2RoutingTable ? '' : (s3Idx !== -1 ? markdown.substring(s3Idx) : ''));

  if (mixdownSectionText) {
    // 5.1 Fader Hierarchy & Mix Philosophy
    const faderSectionMatch = mixdownSectionText.match(/(?:4\.1|Fader Hierarchy|Mix Philosophy|Mix Architecture)[^:\n]*:?\s*([\s\S]*?)(?=(?:4\.[2-5]|### Section|#### 4\.[2-5]|### Frequency|$))/i);
    if (faderSectionMatch) {
      let rawFaderSec = faderSectionMatch[1].trim();
      const faderTableMatch = rawFaderSec.match(/\|([^\n]+)\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
      if (faderTableMatch) {
        const rows = faderTableMatch[2].trim().split('\n');
        for (const row of rows) {
          const cells = row.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
          if (cells.length >= 3) {
            const faderLevel = cells[1];
            const dbMatch = faderLevel.match(/([-+]?\d+(?:\.\d+)?)/);
            const dbNum = dbMatch ? parseFloat(dbMatch[1]) : 0;

            result.mixStrategy.faderHierarchy.push({
              stem: cells[0],
              level: faderLevel,
              dbNum,
              pan: cells[2],
              role: cells[3] || '',
              space: cells[4] || ''
            });
          }
        }
        rawFaderSec = rawFaderSec.replace(faderTableMatch[0], '').trim();
      }
      result.mixStrategy.philosophy = rawFaderSec;
    }

    // 5.2 Frequency Masking & Spectral Separation
    const freqMatch = mixdownSectionText.match(/(?:4\.2|Frequency Masking Management & Spectral Separation)[^:\n]*:?\s*([\s\S]*?)(?=(?:4\.[3-5]|#### 4\.[3-5]|### Dynamic|$))/i);
    if (freqMatch) {
      result.mixStrategy.frequencySeparation = freqMatch[1].trim();
    }

    // 5.3 Dynamic Control, Mix Subgroups & Bus Glue
    const dynMatch = mixdownSectionText.match(/(?:4\.3|Dynamic Control, Mix Subgroups & Bus Glue)[^:\n]*:?\s*([\s\S]*?)(?=(?:4\.[4-5]|#### 4\.[4-5]|### Spatial|$))/i);
    if (dynMatch) {
      result.mixStrategy.dynamicControl = dynMatch[1].trim();
    }

    // 5.4 Spatial Depth & Time-Based FX Architecture
    const spatMatch = mixdownSectionText.match(/(?:4\.4|Spatial Depth & Time-Based FX Architecture)[^:\n]*:?\s*([\s\S]*?)(?=(?:4\.5|#### 4\.5|### Master|$))/i);
    if (spatMatch) {
      result.mixStrategy.spatialDepth = spatMatch[1].trim();
    }

    // Mix Automation Passes if separated
    const autoMatch = mixdownSectionText.match(/(?:Mix Automation Passes|Automation Strategy)[^:\n]*:?\s*([\s\S]*?)(?=(?:4\.[4-5]|#### 4\.[4-5]|### Master|$))/i);
    if (autoMatch) {
      result.mixStrategy.automation = autoMatch[1].trim();
    }

    // 5.5 Master Bus Suite
    const masterSectionMatch = mixdownSectionText.match(/(?:4\.5|Commercial Master Bus|Master Bus Processing)[^:\n]*:?\s*([\s\S]*)$/i);
    const mText = masterSectionMatch ? masterSectionMatch[1] : mixdownSectionText;

    // Look for Stock Master Bus Table
    const stockMasterMatch = mText.match(/(?:100% Native Stock Master Bus Chain|Native Stock Master Bus)[^:\n]*:?\s*([\s\S]*?)(?=(?:Industry-Standard|3rd-Party Master Bus Chain|$))/i);
    if (stockMasterMatch) {
      const sTableMatch = stockMasterMatch[1].match(/\|[^\n]+\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
      if (sTableMatch) {
        result.masterBus.stockChain = parseTableRows(sTableMatch[0]);
      }
    } else {
      // Fallback to first table in master section
      const firstTableMatch = mText.match(/\|[^\n]+\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
      if (firstTableMatch) {
        result.masterBus.stockChain = parseTableRows(firstTableMatch[0]);
      }
    }

    // Look for 3rd-Party Master Bus Table
    const tpMasterMatch = mText.match(/(?:Industry-Standard 3rd-Party Master Bus Chain|3rd-Party Master Bus)[^:\n]*:?\s*([\s\S]*?)(?=(?:End the document|###|$))/i);
    if (tpMasterMatch) {
      const tpTableMatch = tpMasterMatch[1].match(/\|[^\n]+\|\n\|[-| :]+\|\n((?:\|[^\n]+\|\n?)+)/);
      if (tpTableMatch) {
        result.masterBus.thirdPartyChain = parseTableRows(tpTableMatch[0]);
      }
    }

    const lufsMatch = mText.match(/(?:Integrated Loudness|Target Loudness|LUFS):\s*\*{0,2}([-0-9.]+\s*to\s*[-0-9.]+\s*LUFS|[-0-9.]+\s*LUFS)\*{0,2}/i);
    if (lufsMatch) {
      result.masterBus.targetLoudness = lufsMatch[1].trim();
    }

    const tpMatch = mText.match(/(?:True Peak|Peak Ceiling):\s*\*{0,2}([-0-9.]+\s*dBFS(?:\s*True Peak)?)\*{0,2}/i);
    if (tpMatch) {
      result.masterBus.truePeak = tpMatch[1].trim();
    }

    const corrMatch = mText.match(/(?:Stereo Phase Correlation|Phase Correlation|Correlation):\s*\*{0,2}([+0-9.]+\s*to\s*[+0-9.]+|[+0-9.]+)\*{0,2}/i);
    if (corrMatch) {
      result.masterBus.phaseCorrelation = corrMatch[1].trim();
    }
  }

  // Populate instruments for seamless parity with LogbookDossierView
  const extractText = (val) => {
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

  result.instruments = (result.stems || []).map(s => ({
    name: s.name,
    rawHeading: s.name,
    pathway1: extractText(s.microphoneSetup),
    pathway2: extractText(s.diSetup),
    pathway3: extractText(s.soundDesign) || extractText(s.midiProgramming),
    preferredPathway: s.pathway || `Pathway ${s.pathwayType || 3}`,
    preferredJustification: s.originalGear ? `Authentic hardware: ${s.originalGear}` : '',
    channelStrip: (s.stockChain || []).map(c => ({
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
  }));

  return result;
}
