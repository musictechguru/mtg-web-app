/**
 * commentaryEngine.js
 * Producer & Audio Engineering Commentary Engine for Historical Track Sheets.
 *
 * Fully synchronized to the song's musical form and arrangement roadmap:
 * - Intro (0:05+): Opening motif, groove inspiration, studio environment & monitor setup.
 * - Verse 1: Arrangement shift (hook drops out, kick/bass carries groove, vocal enters), vocal signal chain with hardware lore.
 * - Pre-Chorus: Filter sweeps, dynamic build, drum machine & sub-bass pocket.
 * - Chorus: Dynamic impact, lead synth widening, frequency separation & plate reverb bloom.
 * - Verse 2: Subtle arrangement variations (hi-hats, ad-libs), producer arrangement rules.
 * - Bridge / Breakdown: Half-time pulse, synth departure, emotional vocal vulnerability.
 * - Chorus 3: Peak arrangement density, mixdown secrets (Serban's 100% ITB mix, zero bus compression).
 * - Outro: Filter sweep, ambient decay, Dave Kutch mastering at 96kHz, mono club translation, and loudness.
 *
 * Features reality-based studio anecdotes and gear lore.
 * Soundbites are short, punchy, and conversational.
 */

export const COMMENTARY_CATEGORIES = {
  preroll: {
    label: 'AUDIO ROLL',
    color: '#94A3B8',
    icon: 'Disc'
  },
  arrangement: {
    label: 'ARRANGEMENT & HOOK',
    color: '#C084FC',
    icon: 'Music'
  },
  studio: {
    label: 'STUDIO & MONITORS',
    color: '#8B5CF6',
    icon: 'Building2'
  },
  outboard: {
    label: 'OUTBOARD ROSTER',
    color: '#EC4899',
    icon: 'Sliders'
  },
  vocal: {
    label: 'VOCAL SIGNAL CHAIN',
    color: '#06B6D4',
    icon: 'Mic2'
  },
  synth: {
    label: 'SYNTHS & BACKLINE',
    color: '#10B981',
    icon: 'Music'
  },
  drums: {
    label: 'DRUMS & PROGRAMMING',
    color: '#F59E0B',
    icon: 'Sliders'
  },
  mix: {
    label: 'MIXDOWN SECRETS',
    color: '#3B82F6',
    icon: 'Sliders'
  },
  mono: {
    label: 'SPATIAL & MONO CLUB',
    color: '#14B8A6',
    icon: 'Radio'
  },
  master: {
    label: 'MASTERING & LOUDNESS',
    color: '#E879F9',
    icon: 'Disc'
  }
};

// Verified reality-based studio anecdotes
const STUDIO_ANECDOTES = {
  sun: "Sam Phillips' Sun Studio at 706 Union Avenue in Memphis featured corrugated acoustic ceiling tiles and concrete floors, creating the legendary natural slapback of 1950s rock 'n' roll.",
  chess: "Chess Studios at 2120 S. Michigan Ave in Chicago featured Bill Putnam's custom tube rotary console and a sewer pipe basement echo chamber that defined Chicago blues and rock.",
  rca: "RCA Studio B in Nashville was the birthplace of the Nashville Sound, featuring live tracking rooms with acoustic X-baffles for natural acoustic separation.",
  western: "Western Recorders in Hollywood featured Bill Putnam's custom 610 tube console and acoustic echo chambers, capturing timeless 60s rock and pop.",
  goldstar: "Gold Star Studios in LA was home to Phil Spector's Wall of Sound and the most famous trapezoidal cement echo chambers in rock history.",
  conway: "Conway's garden vocal booths in Hollywood are floated on neoprene pads by Vincent Van Haaff, allowing singers to track whisper-quiet vocals without city rumble.",
  abbey: "Abbey Road Studio Two's white acoustic quilts and parquet floor are iconic: Geoff Emerick famously defied EMI rules to close-mic drums, inventing modern punch.",
  electric: "Electric Lady was designed for Jimi Hendrix with curved acoustic brick walls to eliminate flutter echoes, letting bands track all night in pure isolation.",
  soundcity: "Sound City's Van Nuys live room had high acoustic ceilings and a custom Neve 8028 desk, giving rock drums an explosive, unmistakable natural room slap.",
  sunset: "Sunset Sound Studio 2 featured custom API/DeMedio consoles and natural concrete echo chambers where Prince and classic rock icons cut their hits.",
  hansa: "Hansa Studio by the Wall in Berlin had a cavernous Meistersaal ballroom, giving tracking sessions an enormous natural slap that defined post-punk and Bowie's Berlin era.",
  olympic: "Olympic Sound Studios in London was renowned for its stone acoustic live room and custom Helios console, giving rock drums an explosive natural bite.",
  dafthouse: "Daft House in Paris proved you didn't need a million-dollar facility—just a home studio, Mackie desk, samplers, and an Alesis compressor to conquer the world.",
  criteria: "Criteria Studios in Miami housed Jeep Harned's custom MCI consoles and tape machines, where Clapton and the Bee Gees captured warm analog tape saturation.",
  sarm: "Sarm West in London featured SSL 4000 consoles where Trevor Horn pioneered cutting-edge Fairlight sampling and massive 80s production.",
  trident: "Trident Studios in Soho London housed the famous Bechstein grand piano and Sound Techniques desk that birthed Queen and David Bowie's 70s masterpieces.",
  mxm: "Max Martin's MXM studio in West Hollywood: calibrated with laser precision so pop arrangements translate flawlessly from high-end mains to cheap earbuds.",
  mixstar: "Serban Ghenea mixes 100% In-The-Box at MixStar Studios in Virginia Beach, with John Hanes prepping stems on a pristine digital Pro Tools HDX system.",
  powerstation: "Power Station (Avatar) in NYC featured Tony Bongiovi and Bob Clearmountain's wood-slatted drum room, creating the punchiest live acoustic drum capture in America."
};

// Verified reality-based gear lore
const GEAR_LORE = {
  // Vintage Microphones & Tube Gear
  '77-dx': "The RCA 77-DX polydirectional ribbon mic was a Sun and Chess staple, delivering warm, velvety low-end and smooth off-axis rejection.",
  '44-bx': "The massive RCA 44-BX ribbon mic captures deep low-end proximity and natural room bleed from both sides of its figure-8 pattern.",
  unidyne: "The Shure 55 Unidyne dynamic mic: the classic 'Elvis mic' with a tight cardioid pattern designed to handle explosive vocal SPL without distortion.",
  '666': "The Electro-Voice 666 dynamic mic used Variable-D technology to eliminate proximity boom on loud guitar amplifiers and horns.",
  '76-d': "The RCA 76-D tube console used discrete Western Electric-style transformers and rotary attenuators for warm, uncompressed tube gain.",
  
  // Tape Slapback & Vintage Outboard
  ampex: "The Ampex 350 tape machine in Repro mode: running tape at 15 IPS with ~130ms head delay created the signature Sun Records slapback echo that defined early rock 'n' roll.",
  slapback: "The Ampex tape slapback in Repro mode created the quintessential rock 'n' roll slap echo (~130ms delay), bouncing vocals and guitar with raw analog flutter.",
  repro: "Running tape in Repro mode: signal from the playback head was fed back into the console, inventing the legendary 1950s tape slapback echo.",
  altec: "Altec 604 Duplex coaxial monitors: the universal studio reference of the 50s and 60s, ruthlessly revealing mid-range balance and tape saturation.",
  spinet: "The upright spinet piano was tracked close to the soundboard hammers, cutting through the rhythm section with raw percussive acoustic transient attack.",

  // Classic & Modern Studio Gear
  c800: "That aluminum fin on the Sony C-800G houses a Peltier cooling chip that keeps the internal 6AU6 tube cold, keeping the vocal noise floor whisper-quiet.",
  u47: "The legendary Neumann U47 uses a M7 capsule and telefunken steel tube, producing an intimate proximity effect that sits vocals right in front of the speakers.",
  u87: "The Neumann U87's K67 capsule delivers a gentle presence rise around 8kHz to 10kHz, cutting through dense arrangements without needing harsh digital EQ.",
  sm7: "Bruce Swedien famously tracked Michael Jackson's vocals on an SM7 without a pop filter—its thick dynamic diaphragm resists plosives and harsh room reflections.",
  km84: "Neumann's classic small-diaphragm condenser: flat off-axis response that makes acoustic instruments and percussion sound completely natural.",
  c12: "AKG's legendary C12 with CK12 brass capsule provides the silkiest, most 3D airy high-end top sheen in vocal recording history.",
  re20: "Electro-Voice's Variable-D design eliminates proximity bass-boost, keeping tone consistent even when vocalists or horns move off-axis.",
  ns10: "The white-cone Yamaha NS-10Ms: Bob Clearmountain famously taped tissue paper over the tweeters to tame the harsh 3kHz peak, inventing the classic studio mod.",
  neve: "Rupert Neve's 1073 preamps feature hand-wound Marinair transformers that saturate harmonically when driven, adding weight you can't fake with stock digital preamps.",
  tubetech: "The Danish blue Tube-Tech CL 1B uses a photo-optical cell with an inherently musical curve that clamps vocal peaks without any audible pumping.",
  la2a: "The Teletronix LA-2A relies on an electro-luminescent optical panel (T4B cell) with a program-dependent release, smoothing out transients like velvet.",
  '1176': "Ultra-fast FET compression with a 20-microsecond attack; pushing 'all buttons in' creates explosive harmonic aggression on drum rooms and lead vocals.",
  bricasti: "Built by ex-Lexicon engineers with dedicated dual-core DSP chips, the Bricasti M7 generates the most natural, pristine acoustic reverb tail in modern pop.",
  '3630': "The $100 Alesis 3630 VCA compressor: keying the sidechain to a 909 kick creates the extreme -15dB ducking that birthed French House.",
  'dp/4': "The Ensoniq DP/4 parallel effects processor delivers the iconic sweeping phaser that defined late-90s French Touch and Daft Punk's Discovery.",
  '480l': "The Lexicon 480L with its motorized LARC fader remote defined 80s/90s spatial sheen and lush algorithmic vocal halls.",
  emt: "The EMT 140 is a 600-pound cold-rolled steel sheet suspended on springs; the undisputed gold standard for silky, organic analog plate reverb.",
  h3000: "The Eventide H3000 dual pitch-shifter is famous for the micro-pitch widening trick (+9 / -9 cents) that makes backing vocals sound massive.",
  pultec: "The Pultec EQP-1A's passive tube circuit allows simultaneous boost and cut at the same frequency, tightening sub-bass while scooping boxy mud.",
  minimoog: "Bob Moog's 24dB/octave ladder filter creates the fattest, punchiest analog synth basslines on planet earth.",
  juno: "Roland's analog oscillators combined with their signature bucket-brigade stereo chorus create lush, shimmering pads that sit effortlessly in a mix.",
  linn: "Roger Linn's 8-bit/12-bit Eprom drum samples defined 80s pop funk with crisp, unmistakable snare and sidestick punch.",
  '909': "Roland's TR-909: the punchy analog kick and crisp sample hi-hats became the permanent rhythmic backbone of modern dance music.",
  twin: "Fender Twin Reverb tube amplifier: exceptionally clean headroom with signature spring reverb, giving funk and rock guitars razor-sharp clarity."
};

// Verified producer rules & philosophies
const PRODUCER_LORE = {
  'sam phillips': "Sam Phillips' studio philosophy: 'If you're not doing something different, you're not doing anything.' Prioritizing spontaneous live energy and raw feel over polished perfection.",
  'phillips': "Sam Phillips' recording rule: capture the raw spontaneous electricity in the room on the first few takes before over-rehearsal kills the magic.",
  'chess': "Leonard & Phil Chess's recording rule: keep the tape rolling and push the musicians until the groove captures raw, unvarnished emotional fire.",
  'spector': "Phil Spector's Wall of Sound doctrine: layering multiple acoustic instruments and routing them into cement echo chambers to create a single symphonic roar.",
  'max martin': "Max Martin's production rule: never let Verse 2 repeat Verse 1 identically—always add subtle percussion, textural layers, or vocal ad-libs.",
  'daft punk': "Daft Punk's French Touch rule: use resonant low-pass filter sweeps to completely transform energy dynamics without changing a single musical note.",
  'bangalter': "Thomas Bangalter's production rule: run the instrumental sub-mix through a sidechained compressor so the kick drum physically breathes the music.",
  'quincy jones': "Quincy Jones' studio rule: leave space between the instruments so every frequency pocket and vocal emotion can breathe without clutter.",
  'bowie': "David Bowie & Harry Maslin's production rule: treat the studio as an instrument—using varispeed tape modulation to push vocals into otherworldly territory.",
  'maslin': "Harry Maslin's arrangement rule: build dynamic tension by letting the rhythm section establish a relentless groove before introducing top-line instrumentation.",
  'visconti': "Tony Visconti's tracking rule: use room acoustics and multi-microphone distance arrays to capture real physical air and three-dimensional perspective.",
  'george martin': "George Martin's production ethos: treat each song section like an orchestral movement with deliberate thematic contrasts and dynamic shifts.",
  'nile rodgers': "Nile Rodgers' 'chucking' rhythm rule: keep the 16th-note guitar motor running continuously to lock the groove into an unbreakable pocket.",
  'rick rubin': "Rick Rubin's production principle: strip away every non-essential layer until only raw, unadulterated musical energy remains.",
  'dr. dre': "Dr. Dre's sonic rule: every drum transient must hit with devastating low-end weight while remaining surgical and dry in the center."
};

export function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function cleanVal(str) {
  if (!str) return '';
  return str.replace(/^[*\s\->#:\[\]]+/, '')
            .replace(/[\[\]]/g, '')
            .replace(/-?\s*Score:\s*\[[^\]]+\]/gi, '')
            .replace(/\s*\[Score:[^\]]+\]/gi, '')
            .replace(/\s*\(Source:[^)]+\)/gi, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/[.;\s]+$/, '')
            .trim();
}

function parseSectionSeconds(sectionTitle) {
  if (!sectionTitle) return null;
  const m = sectionTitle.match(/\b(\d+):(\d{2})\b/);
  if (m) {
    return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
  }
  return null;
}

function getStudioAnecdote(studioStr) {
  if (!studioStr) return null;
  const s = studioStr.toLowerCase();
  for (const [key, text] of Object.entries(STUDIO_ANECDOTES)) {
    if (s.includes(key)) return text;
  }
  return null;
}

function getGearLore(gearStr) {
  if (!gearStr) return null;
  const g = gearStr.toLowerCase();
  for (const [key, text] of Object.entries(GEAR_LORE)) {
    if (g.includes(key)) return text;
  }
  return null;
}

function getProducerLore(producerStr) {
  if (!producerStr) return null;
  const p = producerStr.toLowerCase();
  for (const [key, text] of Object.entries(PRODUCER_LORE)) {
    if (p.includes(key)) return text;
  }
  return null;
}

function getGenreProfile(parsed, rawMarkdown = '') {
  const genreStr = (parsed.genre || '').toLowerCase();
  const dateStr = (parsed.datesRecorded || parsed.releaseDate || '').toLowerCase();
  const rawLower = (rawMarkdown || '').toLowerCase();
  const tapeStr = (parsed.studio?.tapeMachine || '').toLowerCase();
  const archStr = (parsed.mixdown?.architecture || '').toLowerCase();

  const yearMatch = (dateStr + ' ' + (parsed.releaseDate || '')).match(/\b(19\d{2}|20\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : null;

  const isMono = archStr.includes('mono') || archStr.includes('1-track') || archStr.includes('full-track') ||
                 tapeStr.includes('mono') || tapeStr.includes('full-track') ||
                 (year && year < 1963 && !archStr.includes('stereo'));

  const isVintageRockNRoll = /rock\s*(?:and|&|'n')\s*roll|rockabilly|doo-wop|50s|boogie|skiffle/i.test(genreStr) ||
                            ((year && year < 1965) && /rock|blues|r&b|rhythm/i.test(genreStr));

  const isClassicRock = !isVintageRockNRoll && /rock|metal|punk|grunge|psychedelic/i.test(genreStr);

  const isSoulFunk = /funk|soul|motown|r&b|rhythm & blues|disco/i.test(genreStr);

  const isElectronic = /house|techno|electronic|dance|synth-pop|edm|electro|trance|disco house|french touch/i.test(genreStr) ||
                       rawLower.includes('french touch') || rawLower.includes('filter house');

  const isHipHop = /hip-?hop|rap|trap|boom bap/i.test(genreStr);

  return {
    year,
    isMono,
    isVintageRockNRoll,
    isClassicRock,
    isSoulFunk,
    isElectronic,
    isHipHop,
    isModern: year ? year >= 1995 : (!isVintageRockNRoll && !isClassicRock && !isSoulFunk)
  };
}

export function generateCommentaryTimeline(parsed, rawMarkdown = '') {
  if (!parsed) return [];

  const profile = getGenreProfile(parsed, rawMarkdown);
  const beats = [];
  const formSections = Array.isArray(parsed.musicology?.formSections) ? parsed.musicology.formSections : [];
  
  // Find key musical sections and their start timestamps
  const introSecObj = formSections.find(s => /intro/i.test(s.title || ''));
  const verse1SecObj = formSections.find(s => /verse\s*1|section\s*a|groove\s*1/i.test(s.title || ''));
  const preChorusSecObj = formSections.find(s => /pre-?chorus|build/i.test(s.title || ''));
  const chorusSecObj = formSections.find(s => /chorus\s*(?:1)?\b|drop\b/i.test(s.title || ''));
  const verse2SecObj = formSections.find(s => /verse\s*2|section\s*b|groove\s*2/i.test(s.title || ''));
  const bridgeSecObj = formSections.find(s => /bridge|solo|breakdown|filter drop/i.test(s.title || ''));
  const chorus3SecObj = formSections.find(s => /chorus\s*(?:3|final)/i.test(s.title || '')) || formSections.find(s => /chorus\s*2/i.test(s.title || ''));
  const outroSecObj = formSections.find(s => /outro|fade/i.test(s.title || ''));

  // Calculate timestamps (always start commentary after 2 seconds)
  const tIntro = 2;
  const tVerse1 = Math.max(tIntro + 14, parseSectionSeconds(verse1SecObj?.title) || 16);
  const tPreChorus = Math.max(tVerse1 + 14, parseSectionSeconds(preChorusSecObj?.title) || 32);
  const tChorus = Math.max(tPreChorus + 14, parseSectionSeconds(chorusSecObj?.title) || 48);
  const tVerse2 = Math.max(tChorus + 16, parseSectionSeconds(verse2SecObj?.title) || 72);
  const tBridge = Math.max(tVerse2 + 16, parseSectionSeconds(bridgeSecObj?.title) || 104);
  const tChorus3 = Math.max(tBridge + 16, parseSectionSeconds(chorus3SecObj?.title) || 132);
  const tOutro = Math.max(tChorus3 + 16, parseSectionSeconds(outroSecObj?.title) || 160);

  // -------------------------------------------------------------
  // 0. PRE-ROLL (0:00 - 0:02)
  // -------------------------------------------------------------
  beats.push({
    id: 'beat-preroll',
    timeSeconds: 0,
    category: 'preroll',
    title: 'Audio Roll Starting',
    text: `Playback rolling. Session commentary starting at 0:02.`
  });

  // -------------------------------------------------------------
  // 1. INTRO: Opening Motif / Sample / Riff
  // -------------------------------------------------------------
  let introDesc = introSecObj?.description ? cleanVal(introSecObj.description).split(/[.;]\s+/)[0] : '';
  if (!introDesc && parsed.musicology?.arrangementTechniques) {
    introDesc = cleanVal(parsed.musicology.arrangementTechniques).split(/[.;]\s+/)[0];
  }

  const rawLower = (rawMarkdown || '').toLowerCase();
  const isSampleBased = rawLower.includes('sample') || rawLower.includes('sampling') || rawLower.includes('chopped');
  
  let introTitle = 'Intro & Transient Groove';
  let introText = '';

  if (profile.isVintageRockNRoll) {
    introTitle = "Intro: Tape Saturation & Room Slap";
    introText = `Opening tracking: ${introDesc || 'Acoustic piano and driving rhythm section'}. Direct capture to 15 IPS analog tape through discrete vacuum tube console preamps.`;
  } else if (isSampleBased && (rawLower.includes('tavares') || rawLower.includes('daft punk'))) {
    introTitle = 'Intro: Hardware Sampler Chop';
    introText = `Opening arrangement: Slicing and pitch-shifting the Tavares vinyl sample directly into an E-mu or Akai sampler to craft an hypnotic groove.`;
  } else if (profile.isClassicRock) {
    introTitle = 'Intro: Guitar Amplifier Saturation';
    introText = `Opening guitar capture: ${introDesc || 'Overdriven tube amplifier cabinet'}. Miked on-axis with dynamic mic and dialed with midrange boost to cut through the mix immediately.`;
  } else if (introDesc) {
    introText = `Opening arrangement: ${introDesc}. Calibrating initial input levels and frequency balance with zero digital pre-roll edits.`;
  } else {
    introText = `Opening tracking: Rhythmic foundation establishes with clean stereo balance, locked at ${parsed.musicology?.tempo || 'session tempo'}.`;
  }

  beats.push({
    id: 'beat-intro-hook',
    timeSeconds: tIntro,
    category: 'arrangement',
    title: introTitle,
    text: introText
  });

  // -------------------------------------------------------------
  // 2. INTRO: Studio Environment & Monitoring Lore
  // -------------------------------------------------------------
  const trackingStudio = cleanVal(parsed.studio?.trackingStudio || '');
  const desk = cleanVal(parsed.studio?.console || '');
  const monitors = cleanVal(parsed.studio?.monitors || '');
  const studioAnecdote = getStudioAnecdote(trackingStudio) || getGearLore(monitors) || getGearLore(desk);

  let studioText = '';
  if (studioAnecdote) {
    studioText = `Studio environment: ${studioAnecdote}`;
  } else if (profile.isVintageRockNRoll || (profile.year && profile.year < 1965)) {
    studioText = `Tracked at ${trackingStudio || 'the studio'} through a vintage rotary tube console, referenced on classic Altec 604 duplex monitors for raw acoustic clarity.`;
  } else {
    studioText = `Tracked at ${trackingStudio || 'the studio'} through ${desk || 'a discrete analog console'}, referenced on classic ${monitors || 'nearfield monitors'}.`;
  }

  beats.push({
    id: 'beat-studio-lore',
    timeSeconds: tIntro + 9,
    category: 'studio',
    title: 'Studio Environment & Monitors',
    text: studioText
  });

  // -------------------------------------------------------------
  // 3. VERSE 1: Arrangement Shift (Hook drops, rhythm enters)
  // -------------------------------------------------------------
  let verseDesc = verse1SecObj?.description ? cleanVal(verse1SecObj.description).split(/[.;]\s+/)[0] : '';
  let verseTitle = 'Verse 1: Midrange Carving';
  let verseText = '';

  if (profile.isVintageRockNRoll) {
    verseTitle = 'Verse 1: Live Rhythm Pocket';
    verseText = `Arrangement dynamics: Upright bass and piano left-hand clear the 1kHz–3kHz zone. Live rhythm section locks in so the lead vocal cuts through without console EQ boosts.`;
  } else if (profile.isClassicRock) {
    verseTitle = 'Verse 1: Frequency Pocket';
    verseText = `Arrangement discipline: Guitars pull back to palm-muted accompaniment. Rhythm faders dip -2dB, carving room for the lead vocal presence.`;
  } else if (profile.isElectronic) {
    verseTitle = 'Verse 1: Sub & Kick Foundation';
    verseText = `Arrangement shift: Top synth lead drops out. Sub-bass and 4-on-the-floor kick drive the groove alone, clearing the stereo field.`;
  } else {
    verseText = `Arrangement discipline: ${verseDesc || 'Accompaniment strips back'}. Frequency pocket carved between 800Hz and 3kHz to give the lead vocal maximum intelligibility.`;
  }

  beats.push({
    id: 'beat-verse1-shift',
    timeSeconds: tVerse1,
    category: 'arrangement',
    title: verseTitle,
    text: verseText
  });

  // -------------------------------------------------------------
  // 4. VERSE 1: Lead Vocal or Lead Instrument Pathway
  // -------------------------------------------------------------
  const instList = Array.isArray(parsed.instruments) ? parsed.instruments : [];
  const vocalInst = instList.find(i => /vocal|lead vocal|vox|voice/i.test(i.name || ''));
  const leadInst = vocalInst || instList[0];

  let pathwayTitle = 'Vocal Recording Pathway';
  let pathwayText = '';

  if (vocalInst) {
    const vocalMic = cleanVal(vocalInst.mics || vocalInst.mic || '');
    const vocalChain = cleanVal(vocalInst.signalChain || '');
    const micLore = getGearLore(vocalMic) || getGearLore(vocalChain);

    if (vocalChain) {
      const cleanChain = vocalChain.replace(/\s*\([^)]*\)/g, '').replace(/->/g, ' into ').replace(/\s{2,}/g, ' ');
      pathwayText = `Vocal signal chain: ${cleanChain}. ${micLore ? micLore : (profile.isVintageRockNRoll ? 'Tracked 4 inches off-axis to tame plosives with pure tube saturation.' : 'Smooth 3:1 optical leveling for upfront presence.')}`;
    } else if (vocalMic) {
      pathwayText = `Vocal microphone: Captured with a ${vocalMic}. ${micLore ? micLore : (profile.isVintageRockNRoll ? 'Natural figure-8 ribbon warm proximity effect.' : 'Sits dead center with focused high-end sheen!')}`;
    } else if (profile.isVintageRockNRoll) {
      pathwayText = `Vocal tracking: Captured on a ribbon or dynamic mic straight into the tube desk preamp, capturing natural room resonance and tape drive.`;
    } else if (profile.isClassicRock) {
      pathwayText = `Vocal tracking: High-headroom analog console preamps delivering harmonic bite and transparent dynamic headroom.`;
    } else {
      pathwayText = `Vocal tracking: Large-diaphragm studio condenser into a discrete class-A preamp and optical leveling amplifier!`;
    }
  } else if (leadInst) {
    // Instrumental / Sample / Guitar / Piano
    pathwayTitle = `${leadInst.name || 'Lead Element'} Capture`;
    const instMic = cleanVal(leadInst.mics || '');
    const instChain = cleanVal(leadInst.signalChain || '');
    const instBackline = cleanVal(leadInst.backline || '');
    const lore = getGearLore(instMic) || getGearLore(instChain) || getGearLore(instBackline);

    if (/piano/i.test(leadInst.name || instBackline)) {
      pathwayText = `Tracking ${leadInst.name}: ${instBackline ? instBackline.split(/[.;]/)[0] : 'Acoustic piano'}. Miked close to soundboard hammers to capture percussive bite and wooden resonance.`;
    } else if (/guitar/i.test(leadInst.name || instBackline)) {
      pathwayText = `Tracking ${leadInst.name}: ${instBackline ? instBackline.split(/[.;]/)[0] : 'Electric guitar through tube amp'}. Dynamic mic on speaker dustcap edge for raw harmonic bite.`;
    } else if (instMic && !instMic.toLowerCase().includes('n/a')) {
      pathwayText = `Tracking ${leadInst.name}: Captured with a ${instMic.split(/[.;]/)[0]}. ${lore ? lore : 'Cardioid placement with tight acoustic isolation.'}`;
    } else if (instChain) {
      pathwayText = `Tracking ${leadInst.name}: Routed through ${instChain.split(/[.;]/)[0]}. ${lore ? lore : 'Careful analog gain staging to preserve initial transient attack.'}`;
    } else {
      pathwayText = `Tracking ${leadInst.name}: Clean line-level capture routed directly into console summing for maximum transient punch.`;
    }
  }

  beats.push({
    id: 'beat-vocal-chain',
    timeSeconds: tVerse1 + 10,
    category: vocalInst ? 'vocal' : 'synth',
    title: pathwayTitle,
    text: pathwayText
  });

  // -------------------------------------------------------------
  // 5. PRE-CHORUS: Dynamic Tension & Outboard Reverbs/Delays
  // -------------------------------------------------------------
  const outboardList = Array.isArray(parsed.studio?.outboard) ? parsed.studio.outboard : [];
  const delayOrReverbItem = outboardList.find(o => /(?:ampex|slapback|repro|tape delay|bricasti|emt|plate|lexicon|reverb|3630|dp\/4|dp4|delay|space echo|eventide|chamber)/i.test(cleanVal(o.gear || o.name || '')));
  const rName = delayOrReverbItem ? cleanVal(delayOrReverbItem.gear || delayOrReverbItem.name || '') : '';
  const rLower = rName.toLowerCase();

  let preChorusTitle = 'Pre-Chorus Dynamic Build';
  let preChorusText = '';

  if (delayOrReverbItem) {
    const gearTitle = cleanVal(delayOrReverbItem.gear || delayOrReverbItem.name || '');
    preChorusTitle = `Outboard: ${gearTitle.split(/[.;]/)[0]}`;
    preChorusText = `Spatial processing: ${gearTitle}. Auxiliary sends open up, washing subtle reverberant pre-delay across the stereo bus before the hook hits!`;
  } else if (rLower.includes('ampex') || rLower.includes('slapback') || rLower.includes('repro') || rLower.includes('tape delay')) {
    preChorusTitle = 'Tape Slapback Echo';
    preChorusText = `Tape slapback echo: Generated using the Ampex tape machine in Repro mode (~130ms head delay), creating iconic analog slap on vocals and rhythm!`;
  } else if (rLower.includes('bricasti')) {
    preChorusTitle = 'Modulated Acoustic Space';
    preChorusText = `Modulated space: Auxiliary send dialed into a Bricasti M7 London Plate with 32ms pre-delay so vocal consonants stay bone-dry and upfront!`;
  } else if (rLower.includes('3630') || rLower.includes('sidechain')) {
    preChorusTitle = 'Sidechain Dynamic Pump';
    preChorusText = `Sidechain dynamic pump: Keying the Alesis 3630 compressor from the kick drum creates the signature dynamic pump as energy peaks!`;
  } else if (rLower.includes('emt') || rLower.includes('plate')) {
    preChorusTitle = 'EMT 140 Analog Plate';
    preChorusText = `Plate reverb: The EMT 140's 600-pound cold-rolled steel sheet provides silky, organic analog plate resonance with zero digital grain.`;
  } else if (rLower.includes('chamber') || rLower.includes('room')) {
    preChorusTitle = 'Acoustic Echo Chamber';
    preChorusText = `Echo chamber: Routed through the studio's physical basement echo chamber to add natural, airy acoustic depth before the hook hits!`;
  } else if (profile.isVintageRockNRoll) {
    preChorusTitle = 'Turnaround Transient Drive';
    preChorusText = `Turnaround dynamics: The rhythm section drives higher input levels into the console transformers with aggressive snare accents before the chorus hits!`;
  } else if (profile.isClassicRock) {
    preChorusTitle = 'Pre-Chorus Dynamic Build';
    preChorusText = `Pre-Chorus build: Bass sub-frequencies swell, snare drum transient crescendo, and guitar amp speaker excursion building acoustic pressure into the chorus!`;
  } else if (profile.isElectronic) {
    preChorusTitle = 'Pre-Chorus Filter Sweep';
    preChorusText = `Pre-Chorus build: Resonant 24dB low-pass filter cutoff sweeps open while pitch-snare risers build momentum into the drop!`;
  } else {
    preChorusTitle = 'Dynamic Tension Build';
    preChorusText = `Dynamic tension: Rising acoustic energy and frequency density push console summing buses before releasing into the chorus!`;
  }

  beats.push({
    id: 'beat-prechorus-build',
    timeSeconds: tPreChorus,
    category: 'outboard',
    title: preChorusTitle,
    text: preChorusText
  });

  // -------------------------------------------------------------
  // 6. CHORUS 1: Dynamic Explosion & Wall of Sound
  // -------------------------------------------------------------
  let chorusTitle = 'Chorus Dynamic Arrival';
  let chorusText = '';

  if (profile.isMono) {
    chorusTitle = 'Chorus: Live Acoustic Impact';
    chorusText = `Chorus impact: All instruments attack at full volume! In full-track mono, dynamic lift comes entirely from performance intensity rather than stereo panning.`;
  } else if (profile.isVintageRockNRoll) {
    chorusTitle = 'Chorus: Full Dynamic Impact';
    chorusText = `Chorus arrival: Full rhythm section SPL hits the room mics! Piano hammer transients and upright bass slap drive raw, uncompressed acoustic energy direct to tape.`;
  } else if (profile.isClassicRock) {
    chorusTitle = 'Chorus Dynamic Lift';
    chorusText = `Chorus lift: Overdriven guitar amplifier cabinets pan hard left and right, increasing stereo bus crest factor and perceived loudness without touching faders.`;
  } else {
    chorusTitle = 'Chorus Full Frequency Spread';
    chorusText = `Chorus arrival: Full arrangement density! Stereo bus width expands across the side channels, while kick and bass tightly anchor the low-end center.`;
  }

  beats.push({
    id: 'beat-chorus-explosion',
    timeSeconds: tChorus,
    category: 'arrangement',
    title: chorusTitle,
    text: chorusText
  });

  // -------------------------------------------------------------
  // 7. CHORUS 1: Synthesizer Patches / Guitar Tone / Bass Technique
  // -------------------------------------------------------------
  const guitarInst = instList.find(i => /guitar/i.test(i.name || '') && !/bass/i.test(i.name || ''));
  const synthInst = instList.find(i => /synth|lead hook|keyboard|piano/i.test(i.name || ''));
  const bassInst = instList.find(i => /bass/i.test(i.name || ''));
  const harmonicInst = guitarInst || synthInst || bassInst || instList[1] || instList[0];
  const hBackline = cleanVal(harmonicInst?.backline || harmonicInst?.name || '');
  const hName = (harmonicInst?.name || '').toLowerCase();
  const hBackLower = hBackline.toLowerCase();

  let chorusInstTitle = 'Backline & Instrument Miking';
  let chorusInstText = '';

  if (/piano|spinet|wurlitzer|rhodes/i.test(hName) || /piano|spinet|wurlitzer|rhodes/i.test(hBackLower)) {
    chorusInstTitle = 'Acoustic Piano Miking';
    chorusInstText = `Acoustic piano attack: ${hBackline ? hBackline.split(/[.;]/)[0] : 'Miked close over the soundboard hammers'}. Cutting through the rhythm section with fast transient attack and zero muddy buildup.`;
  } else if (/guitar/i.test(hName) || /guitar/i.test(hBackLower)) {
    chorusInstTitle = 'Guitar Tone & Amplification';
    if (profile.isVintageRockNRoll) {
      chorusInstText = `Guitar tone: ${hBackline ? hBackline.split(/[.;]/)[0] : 'Electric guitar pushed through a tube amplifier'}. Driving the rhythm with natural tube saturation and slapback echo.`;
    } else if (profile.isClassicRock) {
      chorusInstText = `Guitar voicing: ${hBackline ? hBackline.split(/[.;]/)[0] : 'Overdriven tube amplifier stacks'}. Layered for massive analog saturation and sustain across the stereo field.`;
    } else {
      chorusInstText = `Guitar voicing: ${hBackline ? hBackline.split(/[.;]/)[0] : 'Clean out-of-phase pickup quack through tube amplification'}. Hard-panned for a crisp, percussive wall of rhythm.`;
    }
  } else if (/bass/i.test(hName) || /bass/i.test(hBackLower)) {
    chorusInstTitle = 'Bass Foundation & Technique';
    if (profile.isVintageRockNRoll || hBackLower.includes('upright')) {
      chorusInstText = `Bass technique: ${hBackline ? hBackline.split(/[.;]/)[0] : 'Upright double bass'}. Slapping gut strings against the fingerboard to provide both pitch and percussive rhythm!`;
    } else {
      chorusInstText = `Bass technique: ${hBackline ? hBackline.split(/[.;]/)[0] : 'Locked tightly to the kick drum'}. Providing rock-solid low-end foundation beneath the chorus hook.`;
    }
  } else if (profile.isElectronic) {
    chorusInstTitle = 'Synthesizer Architecture';
    chorusInstText = `Synthesizer patches: ${hBackline ? hBackline.split(/[.;]/)[0] : 'Analog oscillators with stereo chorus'}. Hard-panned left and right for an enormous wall of sound.`;
  } else {
    chorusInstTitle = 'Backline Tone & Texture';
    chorusInstText = `Backline tone: ${hBackline ? hBackline.split(/[.;]/)[0] : 'Rhythm section accompaniment'}. Tuned carefully to carve its own frequency pocket in the arrangement.`;
  }

  beats.push({
    id: 'beat-synth-stereo',
    timeSeconds: tChorus + 10,
    category: 'synth',
    title: chorusInstTitle,
    text: chorusInstText
  });

  // -------------------------------------------------------------
  // 8. VERSE 2: Arrangement Discipline & Producer Rule
  // -------------------------------------------------------------
  const producersList = Array.isArray(parsed.personnel?.producers) ? parsed.personnel.producers : [];
  const primaryProducer = producersList[0]?.name ? cleanVal(producersList[0].name) : '';
  const prodLore = getProducerLore(primaryProducer) || getProducerLore(parsed.artist || '');

  let verse2Text = '';
  if (profile.isVintageRockNRoll || profile.isClassicRock) {
    verse2Text = `Verse 2 arrangement: Notice the live drummer shifting accents and cymbal dynamics. ${prodLore || (primaryProducer ? `Producer ${primaryProducer}'s rule: keep the performance urgent without repeating Verse 1 statically.` : 'The live rhythm section keeps the momentum fresh.')}`;
  } else if (prodLore) {
    verse2Text = `Verse 2 arrangement: Notice subtle variations in percussion and vocal fills. ${prodLore}`;
  } else if (primaryProducer) {
    verse2Text = `Verse 2 arrangement: Notice subtle variations in hi-hat patterns and fills. Producer ${primaryProducer}'s rule: never let Verse 2 repeat Verse 1 identically.`;
  } else {
    verse2Text = `Verse 2 arrangement: Notice subtle variations in percussion and ad-libs. Classic producer rule: introduce new textures so Verse 2 stays fresh.`;
  }

  beats.push({
    id: 'beat-verse2-subtlety',
    timeSeconds: tVerse2,
    category: 'drums',
    title: 'Verse 2: Arrangement Discipline',
    text: verse2Text
  });

  // -------------------------------------------------------------
  // 9. BRIDGE: Rhythmic Departure & Solo
  // -------------------------------------------------------------
  let bridgeDesc = bridgeSecObj?.description ? cleanVal(bridgeSecObj.description).split(/[.;]\s+/)[0] : '';
  const isSolo = /solo|guitar\s*solo|piano\s*solo/i.test(bridgeSecObj?.title || bridgeDesc || '');

  let bridgeTitle = isSolo ? 'Lead Instrument Break' : 'Bridge Acoustic Breakdown';
  let bridgeText = '';

  if (isSolo || profile.isVintageRockNRoll) {
    bridgeTitle = 'Lead Instrument Break';
    bridgeText = `Instrumental break: ${bridgeDesc || 'Lead instrument pushed forward in the mix with focused midrange presence, tape saturation, and room mic spill'}.`;
  } else {
    bridgeText = `Acoustic breakdown: ${bridgeDesc || 'Arrangement strips down to core elements, pulling faders back to create dynamic contrast before the final chorus'}.`;
  }

  beats.push({
    id: 'beat-bridge-departure',
    timeSeconds: tBridge,
    category: 'arrangement',
    title: bridgeTitle,
    text: bridgeText
  });

  // -------------------------------------------------------------
  // 10. CHORUS 3: Peak Density & Mixdown Secrets
  // -------------------------------------------------------------
  const mixEngList = Array.isArray(parsed.personnel?.mixEngineers) ? parsed.personnel.mixEngineers : [];
  const primaryMixEng = mixEngList[0]?.name ? cleanVal(mixEngList[0].name) : '';
  const mixArch = cleanVal(parsed.mixdown?.architecture || '');
  const mixBus = cleanVal(parsed.mixdown?.masterBusChain || '');

  let mixText = '';
  let mixTitle = 'Mixdown Secrets & Console Routing';

  if (profile.isMono || mixArch.toLowerCase().includes('live-to-mono')) {
    mixTitle = 'Live-to-Mono Tracking';
    mixText = `Live-to-Mono tracking: Balanced live on the fly directly to a single-track tape machine using the console's rotary pots. No multi-track overdubs—just perfect acoustic balancing in the live room!`;
  } else if (/serban/i.test(primaryMixEng) || /mixstar/i.test(mixArch)) {
    mixTitle = 'Mixdown Secrets: Serban Ghenea';
    mixText = `Mixed 100% In-The-Box on Pro Tools by Serban Ghenea with John Hanes. Master bus secret: He notoriously uses little to no master bus compression on his mix prints!`;
  } else if (/bangalter|homem-christo|daft punk/i.test(primaryMixEng) || rawLower.includes('3630')) {
    mixTitle = 'Mixdown Secrets: French Touch Pump';
    mixText = `Mixed by Thomas Bangalter and Guy-Manuel: Keying the Alesis 3630 compressor from the TR-909 kick creates that extreme -15dB dynamic pump!`;
  } else if (/maslin/i.test(primaryMixEng)) {
    mixTitle = 'Mixdown Secrets: Harry Maslin';
    mixText = `Mixed by Harry Maslin at Electric Lady. The legendary vocal descent was pitched down using analog tape varispeed right onto the master reel!`;
  } else if (/clearmountain/i.test(primaryMixEng)) {
    mixTitle = 'Mixdown Secrets: Bob Clearmountain';
    mixText = `Mixed by Bob Clearmountain on an SSL 4000 desk, riding the faders live to 1/2-inch analog tape with classic quad bus VCA glue.`;
  } else if (/swedien/i.test(primaryMixEng)) {
    mixTitle = 'Mixdown Secrets: Bruce Swedien';
    mixText = `Mixed by Bruce Swedien on a custom Harrison desk using his Acusonic Recording Process—never using bus limiters to preserve transient punch.`;
  } else if (primaryMixEng && (mixBus || mixArch)) {
    mixTitle = `Mixdown: ${primaryMixEng.split(/[,(]/)[0]}`;
    mixText = `Mixed by ${primaryMixEng.split(/[,(]/)[0]} on ${mixArch || 'the mixing console'}. Bus processing: ${mixBus ? mixBus.split(/[.;]/)[0] : 'carefully calibrated glue compression'}.`;
  } else if (primaryMixEng) {
    mixTitle = `Mixdown: ${primaryMixEng.split(/[,(]/)[0]}`;
    mixText = `Mixed by ${primaryMixEng.split(/[,(]/)[0]}. Master bus secret: Preserves transient headroom on drum hits with zero aggressive brickwall clipping.`;
  } else {
    mixText = `Console summing: Channels balanced with analog bus glue, preserving explosive transient crest factor with zero master brickwall limiting.`;
  }

  beats.push({
    id: 'beat-mixdown-secret',
    timeSeconds: tChorus3,
    category: 'mix',
    title: mixTitle,
    text: mixText
  });

  // -------------------------------------------------------------
  // 11. CHORUS 3: Spatial Staging & Format Compatibility
  // -------------------------------------------------------------
  let monoTitle = 'Spatial Staging & Format Translation';
  let monoText = '';

  if (profile.isMono) {
    monoTitle = 'Direct-to-Mono Punch & 45 RPM Cut';
    monoText = `Full-track Mono impact: Optimized for maximum punch on 45 RPM jukebox singles and AM radio, delivering focused acoustic energy straight down the center!`;
  } else {
    monoTitle = 'Mono Club Compatibility';
    monoText = `Spatial staging: Frequencies below 120Hz summed to dead mono. Reverbs and stereo doublers panned wide, ensuring zero phase cancellation on phones or club rigs!`;
  }

  beats.push({
    id: 'beat-mono-compatibility',
    timeSeconds: tChorus3 + 11,
    category: 'mono',
    title: monoTitle,
    text: monoText
  });

  // -------------------------------------------------------------
  // 12. OUTRO: Ambient Wash-Out & Mastering Facility
  // -------------------------------------------------------------
  const mastList = Array.isArray(parsed.personnel?.masteringEngineers) ? parsed.personnel.masteringEngineers : [];
  const primaryMasterEng = mastList[0]?.name ? cleanVal(mastList[0].name) : '';
  const masterTape = cleanVal(parsed.mixdown?.masterTape || '');

  let masterTitle = 'Mastering & Final Print';
  let masterText = '';

  if (profile.isVintageRockNRoll || (profile.year && profile.year < 1965)) {
    masterTitle = 'Lacquer Mastering: 45 RPM Cut';
    masterText = `Cut directly to acetate lacquer for 7-inch 45 RPM singles. Mastered with high-frequency pre-emphasis so the needle cuts through noisy jukeboxes without groove distortion.`;
  } else if (/kutch/i.test(primaryMasterEng)) {
    masterTitle = 'Mastering: Dave Kutch';
    masterText = `Outro decay into atmospheric reverb: Printed at 96kHz and mastered by Dave Kutch at The Mastering Palace using hybrid analog and digital limiting.`;
  } else if (/ludwig/i.test(primaryMasterEng)) {
    masterTitle = 'Mastering: Bob Ludwig';
    masterText = `Mastered by Bob Ludwig: cut with unmatched analog fidelity, preserving maximum micro-dynamics and midrange punch.`;
  } else if (/patel/i.test(primaryMasterEng)) {
    masterTitle = 'Mastering: Nilesh Patel';
    masterText = `Cut and mastered by Nilesh Patel at The Exchange, London, locking in deep bass weight for club sound systems and vinyl.`;
  } else if (/grundman/i.test(primaryMasterEng)) {
    masterTitle = 'Mastering: Bernie Grundman';
    masterText = `Mastered by Bernie Grundman on custom discrete analog console electronics, cutting direct from the original stereo master tape.`;
  } else if (primaryMasterEng) {
    masterTitle = `Mastering: ${primaryMasterEng.split(/[,(]/)[0]}`;
    masterText = `Mastered by ${primaryMasterEng.split(/[,(]/)[0]}${masterTape ? ` from ${masterTape.split(/[.;]/)[0]}` : ''}, achieving competitive fidelity while retaining punch.`;
  } else {
    masterText = `Mastering print: Soft-knee saturation and precision limiting applied, achieving competitive loudness while retaining punchy micro-dynamics.`;
  }

  beats.push({
    id: 'beat-outro-mastering',
    timeSeconds: tOutro,
    category: 'master',
    title: masterTitle,
    text: masterText
  });

  // -------------------------------------------------------------
  // 13. FINAL VERDICT: Loudness & Punch
  // -------------------------------------------------------------
  let finalTitle = 'Final Dynamic Punch';
  let finalText = '';

  if (profile.isVintageRockNRoll) {
    finalTitle = 'Final 45 RPM Energy';
    finalText = `The final 45 RPM cut delivers raw, electrifying rock 'n' roll energy — Pure analog history!`;
  } else if (profile.isClassicRock) {
    finalTitle = 'Final Dynamic Punch';
    finalText = `The final analog master delivers explosive live dynamics and visceral instrument crunch — A timeless rock record!`;
  } else {
    finalTitle = 'Final Loudness & Dynamic Punch';
    finalText = `The final master delivers staggering competitive loudness while retaining punch — The mix sounds loud!`;
  }

  beats.push({
    id: 'beat-final-loud',
    timeSeconds: tOutro + 12,
    category: 'master',
    title: finalTitle,
    text: finalText
  });

  // Map each beat with category metadata
  const mapped = beats.map((beat, idx) => {
    const meta = COMMENTARY_CATEGORIES[beat.category] || COMMENTARY_CATEGORIES.studio;
    return {
      ...beat,
      formattedTime: formatSeconds(beat.timeSeconds),
      badge: meta.label,
      accentColor: meta.color,
      iconName: meta.icon,
      index: idx
    };
  });

  return enforceCommentaryTiming(mapped);
}

/**
 * Enforces comfortable reading spacing between commentary cards
 * - Beat 0 starts at 0:00 (brief standby)
 * - Beat 1 starts after 2 seconds (0:02)
 * - Every subsequent beat is guaranteed enough display duration based on previous text length so it's NEVER cut off
 */
export function enforceCommentaryTiming(beats) {
  if (!beats || !Array.isArray(beats) || beats.length === 0) return [];

  const result = beats.map(b => ({ ...b }));

  // Beat 0: Standby at 0s
  if (result[0]) {
    result[0].timeSeconds = 0;
    result[0].formattedTime = formatSeconds(0);
  }

  // Beat 1: Start commentary after 2 seconds
  if (result[1]) {
    result[1].timeSeconds = 2;
    result[1].formattedTime = formatSeconds(2);
  }

  // Ensure each subsequent beat gives full, uninterrupted reading time for the prior card
  for (let i = 2; i < result.length; i++) {
    const prev = result[i - 1];
    const prevText = prev.text || '';
    // Reading pacing: Typewriter animation (~15ms/char) + reading rate (~14 chars/sec) + 4s comfort buffer
    // Minimum 12 seconds gap, scaled up dynamically for rich paragraphs
    const minGap = Math.max(12, Math.ceil(prevText.length / 14) + 4);
    const minTimestamp = prev.timeSeconds + minGap;

    if (result[i].timeSeconds < minTimestamp) {
      result[i].timeSeconds = minTimestamp;
    }
    result[i].formattedTime = formatSeconds(result[i].timeSeconds);
  }

  return result;
}

export function getActiveBeatForTime(beats, currentTimeSeconds) {
  if (!beats || beats.length === 0) return null;
  let active = beats[0];
  for (let i = 0; i < beats.length; i++) {
    if (currentTimeSeconds >= beats[i].timeSeconds) {
      active = beats[i];
    } else {
      break;
    }
  }
  return active;
}
