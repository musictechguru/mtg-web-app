// Edexcel A-Level Music Technology (9MT0/01) Component 1: Recording — Concise Tick List & Official Mark Scheme Data
// Official Mark Scheme Structure: Separates DRUM KIT, VOCALS (Lead & Backing), and ALL OTHER INSTRUMENTS.

export const C1_OVERVIEW_SPECS = [
  { icon: '⏱️', label: 'Duration', value: '3:00 – 3:30', sub: 'Strict C1 window (penalties under 3:00)' },
  { icon: '🎙️', label: 'Track Count', value: '12 – 24 Tracks', sub: 'Min 12 captured; max 24 in session' },
  { icon: '🎤', label: 'Vocals (Separated)', value: 'Lead & BV (16m+)', sub: 'Dedicated mark scheme column (AG1B–AG4)' },
  { icon: '🥁', label: 'Drum Kit', value: 'Min. 4 Mics (16m+)', sub: '4-Mic Glyn Johns (Preferred) or Multi-Mic' },
  { icon: '🎸', label: 'Other Instruments', value: 'Bass, Gtr + 2 Extra', sub: 'Mic/DI/Amp Sim + MIDI Keys/Synths/Mellotron' },
  { icon: '💿', label: 'Master Format', value: '16-bit / 44.1 kHz', sub: 'Stereo WAV (-1.0 dBFS) + Logbook PDF' }
];

export const C1_RECORDING_APPROACHES = [
  {
    id: 'hybrid_school',
    title: 'Option 1: 4-Mic Glyn Johns Drums + DI Amp Sims + Live MIDI Keys',
    subtitle: 'Ideal for School Studios • Zero Spill, Fast Setup & Maximum Phase Coherence',
    badge: '⭐ STRONGLY RECOMMENDED',
    badgeType: 'recommended',
    description:
      'Capture the acoustic drum kit using the phase-locked 4-Mic Glyn Johns method (AG1A), record Electric Guitars and Bass via clean Active DI into Logic Amp Designer & Pedalboard (AG1C), perform Pianos, Hammond B3, Rhodes & Mellotron live via USB MIDI (Pathway 3), and track Lead & Backing Vocals in a treated booth (AG1B).',
    pros: [
      '4-Mic Glyn Johns guarantees phase-coherent drums with a 30-second cable equidistance check',
      'Zero guitar/bass amplifier spill into drum or vocal microphones',
      'Full flexibility to tweak guitar/bass amp models, virtual mic positions & MIDI patches during mixing'
    ],
    keyTip: 'Always play Pathway 3 MIDI parts live on a keyboard with CC64 sustain & CC1 modulation — never import pre-made MIDI files.'
  },
  {
    id: 'multi_mic_live',
    title: 'Option 2: Multi-Mic Drum Kit (6–8 Mics) + Miked Guitar Cabinets',
    subtitle: 'Traditional Studio Approach • Best for Large Multi-Room Studios with Isolation Booths',
    badge: '🎙️ TRADITIONAL STUDIO',
    badgeType: 'recommended',
    description:
      'Close-mike every drum shell (Kick, Snare Top/Bottom, Rack/Floor Toms, Hi-Hat + Stereo Overheads) and place dynamic/ribbon microphones (SM57 / R-121) on physical guitar and bass speaker cabinets in isolated rooms.',
    pros: [
      'Individual close mics on toms and hi-hat allow discrete gating and panning in rock/pop mixes',
      'Authentic physical speaker cone movement on electric guitar and bass cabinets',
      'Strong demonstration of multi-microphone acoustic capture across AG1A and AG1C'
    ],
    keyTip: 'Even when miking a guitar amp, always split the signal with a DI box Thru output to capture a clean safety DI track.'
  },
  {
    id: 'unplanned_live',
    title: 'Pitfall to Avoid: Unisolated Live-Room Tracking Without Phase/Spill Control',
    subtitle: 'High Risk of Phase Cancellation, Cymbal Bleed & Capped AG1/AG7 Marks',
    badge: '⚠️ AVOID THIS TRAP',
    badgeType: 'warning',
    description:
      'Placing 8+ drum mics without measuring overhead equidistance, or tracking loud guitar amps and vocals in the same room as the drum kit, creates severe phase hollowness and unmixable cymbal bleed.',
    pros: [
      'Can feel fast on tracking day, but creates major problems during mixing (AG2–AG7)'
    ],
    cons: [
      'Unequal overhead distances cause comb-filtering and a thin, off-center snare',
      'Cymbal bleed into vocal or guitar mics becomes harsh when compressed in AG3',
      'Headphone click bleed or room boominess caps AG1B (Vocals) and AG7 (Hygiene)'
    ],
    keyTip: 'Keep tracking separated: Drums first (phase-checked), DI/MIDI instruments second, and Vocals in a deadened booth last.'
  }
];

export const C1_RECOMMENDED_STYLES = [
  {
    id: 'funk_soul_disco',
    genre: '🎷 Funk / Soul / Motown / Disco',
    badge: '⭐ TOP CHOICE FOR C1',
    bpm: '95–120 BPM',
    exampleTracks: ['Superstition — Stevie Wonder', 'Sir Duke — Stevie Wonder', 'Good Times — Chic', "Don't You Worry 'Bout a Thing — Stevie Wonder"],
    why: 'Tight, dry drum grooves, upfront melodic basslines, rhythmic DI guitars, and rich keyboard/horn arrangements make it effortless to hit all 12–24 tracks and showcase all 3 capture pathways.',
    drumsFit: 'Dry, punchy 4-Mic Glyn Johns kit with crisp snare ghost notes and tight kick pocket.',
    vocalsFit: 'Dynamic, expressive Lead Vocal with wide call-and-response Backing Vocal stacks (L35/R35).',
    otherFit: 'Articulate Active DI Bass, clean DI rhythm guitar, plus live MIDI Clavinet, Rhodes, Hammond B3 & Horn section.'
  },
  {
    id: 'classic_pop_rock',
    genre: '🎸 Classic Rock / AOR / Soft Rock',
    badge: '🔥 HIGH MARKS POTENTIAL',
    bpm: '105–135 BPM',
    exampleTracks: ['Dreams — Fleetwood Mac', 'Rosanna — Toto', 'Black Dog — Led Zeppelin', 'More Than a Feeling — Boston'],
    why: 'Combines room-filling acoustic drums, layered acoustic & electric guitars, lush multi-part vocal harmonies, and signature piano/organ parts for natural stereo width (AG6).',
    drumsFit: 'Glyn Johns or 6-mic kit with Parallel NY Drum Bus compression and gated toms.',
    vocalsFit: 'Soaring Lead Vocal with 3-part double-tracked chorus harmonies (L35/R35 & L65/R65).',
    otherFit: '12th-fret SDC Acoustic Guitar, double-tracked DI/Amp Sim Electric Guitars (L55/R55), Bass DI+SVT, and MIDI B3/Rhodes.'
  },
  {
    id: '80s_pop_new_wave',
    genre: '🎹 80s Pop / New Wave / Art-Rock',
    badge: '✨ GREAT MIX & FX SHOWCASE',
    bpm: '110–128 BPM',
    exampleTracks: ['Billie Jean — Michael Jackson', 'Fame — David Bowie', 'Roxanne — The Police'],
    why: 'Showcases precision EQ pocketing (AG2), punchy VCA compression (AG3), gated/plate reverbs and tempo-synced delays (AG4), plus hybrid live + MIDI synthesizer layers (AG1C).',
    drumsFit: 'Close-miked punchy Kick & Snare with short 0.7s Studio Room / Gated Plate ambience.',
    vocalsFit: 'Crisp Lead Vocal with 28 ms pre-delayed Plate Reverb, 1/8D stereo delay throws, and rhythmic BVs.',
    otherFit: 'Locked Bass DI + Synth Bass layer, funk/chorus DI Guitars, and Pathway 3 Retro Synth pads/brass.'
  }
];

export const C1_MARK_SCHEME_DETAILED = [
  {
    code: 'AG1A',
    title: 'Capture — Drum Kit',
    marks: 4,
    category: 'AG1 Capture (12m Total) • Drum Kit Column',
    color: '#38bdf8',
    jumpTab: 'drums',
    subColumns: [
      { label: '🥁 Drum Kit', marks: '4m', active: true },
      { label: '🎤 Vocals', marks: '4m', active: false },
      { label: '🎸 Other Parts', marks: '4m', active: false }
    ],
    summary: 'Mic selection, placement, phase coherence, and gain staging on the Acoustic Drum Kit (min. 4 mics).',
    realWorldExample: 'Preferred 4-Mic Glyn Johns (Top OH + Side Floor-Tom OH equidistant from snare + Kick D112 + Snare SM57).',
    bands: [
      { level: 'L1 (1m)', desc: 'Phase cancellation, severe spill, or poor balance.' },
      { level: 'L2 (2m)', desc: 'Inconsistent capture; occasional phase/spill issues.' },
      { level: 'L3 (3m)', desc: 'Competent capture; good clarity and stereo image.' },
      { level: 'L4 (4m)', desc: 'Phase-locked overheads, punchy kick/snare, zero clipping.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag1_5', text: '⭐ Preferred (4-Mic Glyn Johns): Top OH + Side OH (equidistant from snare) + Kick + Snare' },
      { id: 'c1_ms_ag1_1', text: '🥁 Min. 4 microphones used on Acoustic Drum Kit' },
      { id: 'c1_ms_ag1_2', text: '🥁 Overheads measured equidistant from snare center (cable check) for phase coherence' },
      { id: 'c1_ms_ag1_4', text: '🥁 Drum preamps gain-staged so loudest fills peak at -8 to -6 dBFS (zero clipping)' }
    ]
  },
  {
    code: 'AG1B',
    title: 'Capture — Vocals (Lead & Backing Separated)',
    marks: 4,
    category: 'AG1 Capture (12m Total) • Dedicated Vocals Column',
    color: '#fbbf24',
    jumpTab: 'vocals',
    subColumns: [
      { label: '🥁 Drum Kit', marks: '4m', active: false },
      { label: '🎤 Vocals (Lead & BV)', marks: '4m', active: true },
      { label: '🎸 Other Parts', marks: '4m', active: false }
    ],
    summary: 'Assessed separately from all instruments: LDC choice, cardioid polar pattern, pop shield, proximity control, and zero click bleed.',
    realWorldExample: 'Lead Vocal: C414/NT1 (Cardioid, 80Hz HPF) at 18 cm with pop filter at 7 cm. BVs: 28 cm distance, double-tracked.',
    bands: [
      { level: 'L1 (1m)', desc: 'Plosive pops, room boominess, clipping, or click bleed.' },
      { level: 'L2 (2m)', desc: 'Inconsistent vocal tone; occasional plosives or room ring.' },
      { level: 'L3 (3m)', desc: 'Competent Lead & BV capture; clear diction and low noise.' },
      { level: 'L4 (4m)', desc: 'Intimate, plosive-free Lead Vocal & cohesive BVs with zero spill.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag2_3', text: '🎤 Lead Vocal: LDC (Cardioid), shockmount, pop shield (7 cm), reflection filter, 15–20 cm distance' },
      { id: 'c1_ms_ag2_4', text: '🎤 Backing Vocals: Tracked at 25–30 cm (less proximity bass) & double-tracked for L/R width' },
      { id: 'c1_ms_ag1b_3', text: '🎤 Vocal Preamp: Peaks at -10 to -6 dBFS with 80 Hz HPF engaged' },
      { id: 'c1_ms_ag1b_4', text: '🎤 Closed-back headphones used; zero metronome click bleed in vocal tails' }
    ]
  },
  {
    code: 'AG1C',
    title: 'Capture — All Other Instruments (Bass, Guitars, MIDI & Extra)',
    marks: 4,
    category: 'AG1 Capture (12m Total) • Other Parts Column',
    color: '#c084fc',
    jumpTab: 'other_instruments',
    subColumns: [
      { label: '🥁 Drum Kit', marks: '4m', active: false },
      { label: '🎤 Vocals', marks: '4m', active: false },
      { label: '🎸 Other Parts', marks: '4m', active: true }
    ],
    summary: 'Capture of Bass, Acoustic Guitar, Electric Guitar (DI + Amp Sim or Amp Mic), plus min. 2 Additional Instruments (MIDI or Live).',
    realWorldExample: 'Bass DI + SVT sim; Acoustic Gtr SDC at 12th fret; Electric Gtr DI into Amp Designer/Pedalboard (or SM57 on cone); Live MIDI Keys/Synths/Mellotron.',
    bands: [
      { level: 'L1 (1m)', desc: 'Soundhole boom, noisy amps, or missing additional instruments.' },
      { level: 'L2 (2m)', desc: 'Functional capture; some static MIDI or boxy acoustic tone.' },
      { level: 'L3 (3m)', desc: 'Competent bass, guitar, and additional live/MIDI capture.' },
      { level: 'L4 (4m)', desc: 'Articulate bass, rich guitars, and expressive additional live/MIDI stems.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag1_3', text: '🎸 Bass Guitar: Clean Active DI + Bass Amp Designer SVT blend (or miked cab)' },
      { id: 'c1_ms_ag2_1', text: '🎸 Acoustic Guitar: SDC at 12th fret (15–20 cm, angled to bridge — avoiding soundhole boom)' },
      { id: 'c1_ms_ag2_5', text: '🎸 Electric Guitar (DI + Amp Sim): Clean DI into Logic Pedalboard & Amp Designer' },
      { id: 'c1_ms_ag2_2', text: '🎸 Electric Guitar (Amp Mic): Dynamic/Ribbon mic on speaker cone edge + safety DI' },
      { id: 'c1_ms_ag3_5', text: '🎹 Pathway 3 MIDI Instruments: Synths, Pianos, Hammond B3 (CC1 Leslie), Rhodes & Mellotron played live (CC64)' },
      { id: 'c1_ms_ag3_1', text: '🎷 Additional Live Instruments: Brass, strings, or percussion miked at 30–45 cm' },
      { id: 'c1_ms_ag3_4', text: '📋 All 3 capture pathways (Pathway 1 Mic, Pathway 2 DI, Pathway 3 MIDI) logged' }
    ]
  },
  {
    code: 'AG2',
    title: 'Processing — EQ (Drums 4m | Vocals 4m | Other Parts & Mix 4m)',
    marks: 12,
    category: 'AO2 • Equalisation Split Across 3 Columns',
    color: '#60a5fa',
    jumpTab: 'mixing_mastering',
    subColumns: [
      { label: '🥁 Drum Kit EQ', marks: '4m', active: true },
      { label: '🎤 Vocals EQ', marks: '4m', active: true },
      { label: '🎸 Other Parts & Mix EQ', marks: '4m', active: true }
    ],
    summary: 'High-pass filtering, resonance removal, vocal presence/air, and Kick/Bass/Vocal frequency pocketing.',
    realWorldExample: 'Vocals: 85Hz HPF, -2.5dB @ 240Hz, +2dB @ 3.5kHz. Drums: Kick +3dB @ 60Hz / -3.5dB @ 180Hz. Bass: +2.5dB @ 180Hz.',
    bands: [
      { level: 'L1 (1–3m)', desc: 'Muddy low end, harsh vocal sibilance, or severe masking.' },
      { level: 'L2 (4–6m)', desc: 'Basic EQ; low-mids (200–400 Hz) occasionally congested.' },
      { level: 'L3 (7–9m)', desc: 'Clear spectral separation with effective HPFs and tone shaping.' },
      { level: 'L4 (10–12m)', desc: 'Punchy low-end pocketing, crystal-clear vocals, zero masking.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag6_4', text: '🎤 VOCALS EQ (4m): 85 Hz HPF, 240 Hz mud cut, 3.5 kHz presence boost & 12 kHz air shelf' },
      { id: 'c1_ms_ag2_drm', text: '🥁 DRUM KIT EQ (4m): Kick sub/snap sculpted, Snare/Tom 300 Hz boxiness cut, Overheads high-passed' },
      { id: 'c1_ms_ag6_2', text: '🎸 OTHER PARTS EQ (4m): Complementary EQ pocketing between Kick (60 Hz) and Bass (180 Hz)' },
      { id: 'c1_ms_ag6_1', text: '🎸 MIX EQ: HPFs on all non-bass stems + 3 kHz dip on guitars/keys to clear the Vocal pocket' }
    ]
  },
  {
    code: 'AG3',
    title: 'Processing — Dynamics (Drums 4m | Vocals 4m | Other Parts & Mix 4m)',
    marks: 12,
    category: 'AO2 • Dynamics Split Across 3 Columns',
    color: '#a855f7',
    jumpTab: 'mixing_mastering',
    subColumns: [
      { label: '🥁 Drum Dynamics', marks: '4m', active: true },
      { label: '🎤 Vocal Dynamics', marks: '4m', active: true },
      { label: '🎸 Other Parts & Mix', marks: '4m', active: true }
    ],
    summary: 'Compression, de-essing, noise gating, parallel drum compression, and subgroup bus glue.',
    realWorldExample: 'Vocals: Serial FET (4:1) -> Opto (2:1) + De-Esser @ 6.8kHz. Drums: 20ms attack VCA, Tom gates, Parallel NY Crush.',
    bands: [
      { level: 'L1 (1–3m)', desc: 'Uneven vocal levels or heavy pumping over-compression.' },
      { level: 'L2 (4–6m)', desc: 'Compression applied, but attack/release occasionally clamps punch.' },
      { level: 'L3 (7–9m)', desc: 'Consistent vocal/bass levels while preserving drum transients.' },
      { level: 'L4 (10–12m)', desc: 'Silky serial vocal control, smooth de-essing, punchy gated/parallel drums.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag7_1', text: '🎤 VOCALS DYNAMICS (4m): Serial compression (FET 4:1 -> Opto 2:1) + De-Esser (6.8 kHz) + BV Bus glue' },
      { id: 'c1_ms_ag7_2', text: '🥁 DRUM KIT DYNAMICS (4m): Kick/Snare 20 ms attack (keeps stick snap) + Noise Gates on Toms' },
      { id: 'c1_ms_ag7_4', text: '🥁 DRUM BUS: Parallel NY Compression (8:1) and Drum Bus VCA Glue (2:1)' },
      { id: 'c1_ms_ag7_oth', text: '🎸 OTHER PARTS & MIX (4m): Bass levelled (4:1 Opto) + Master Bus VCA glue (2:1)' }
    ]
  },
  {
    code: 'AG4',
    title: 'Processing — Effects & Ambience (Drums 4m | Vocals 4m | Other Parts 4m)',
    marks: 12,
    category: 'AO2 • Spatial & Creative FX Split Across 3 Columns',
    color: '#f43f5e',
    jumpTab: 'mixing_mastering',
    subColumns: [
      { label: '🥁 Drum Ambience', marks: '4m', active: true },
      { label: '🎤 Vocal Effects', marks: '4m', active: true },
      { label: '🎸 Other Parts FX', marks: '4m', active: true }
    ],
    summary: 'Shared Aux reverbs, pre-delay, EQ-filtered returns, tempo-synced delays, and instrument modulation/amp FX.',
    realWorldExample: 'Vocals: Aux 1 Plate (1.5s, 28ms pre-delay, EQ 200Hz–7.5kHz) + 1/8D Delay. Drums: Aux 2 Room (0.75s).',
    bands: [
      { level: 'L1 (1–3m)', desc: 'Bone-dry stems or muddy channel-insert reverbs.' },
      { level: 'L2 (4–6m)', desc: 'Reverb/delay used, but decay tails slightly cloud midrange.' },
      { level: 'L3 (7–9m)', desc: 'Effective Aux reverbs, delays, and modulation creating natural depth.' },
      { level: 'L4 (10–12m)', desc: 'Polished spatial depth with pre-delay, filtered returns & authentic FX.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag9_2', text: '🎤 VOCALS FX (4m): Aux Vocal Plate Reverb (28 ms Pre-Delay) + Tempo-Synced 1/8D Delay' },
      { id: 'c1_ms_ag9_3', text: '🎤 REVERB EQ: EQ on Aux Returns (HPF @ 200 Hz, LPF @ 8 kHz) to prevent mud' },
      { id: 'c1_ms_ag4_drm', text: '🥁 DRUM AMBIENCE (4m): Shared Drum Room / Snare Plate Aux (0.6–0.9s) glueing kit' },
      { id: 'c1_ms_ag9_1', text: '🎸 OTHER PARTS FX (4m): Guitar Pedalboard/Amp FX, B3 Leslie (CC1) & Rhodes Tremolo' }
    ]
  },
  {
    code: 'AG5',
    title: 'Production — Balance & Blend (Overall Mix & Vocal Hierarchy)',
    marks: 4,
    category: 'AO2 • Mix Cohesion, Vocal Hierarchy & Automation',
    color: '#34d399',
    jumpTab: 'mixing_mastering',
    summary: 'Relative volume balance, Lead Vocal intelligibility above the band, section fader rides, and 3:00–3:30 duration.',
    realWorldExample: 'Lead Vocal rides (+1.5 dB in choruses), BVs tucked -4.5 dB behind Lead, solo boost (+2 dB), 3:00–3:30 duration.',
    bands: [
      { level: 'L1 (1m)', desc: 'Buried vocals or unbalanced stems throughout.' },
      { level: 'L2 (2m)', desc: 'Inconsistent balance (or capped at L2 if min. playing times unmet).' },
      { level: 'L3 (3m)', desc: 'Competent balance with clear vocal hierarchy and section lifts.' },
      { level: 'L4 (4m)', desc: 'Effortless vocal intelligibility, dynamic fader automation & cohesion.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag10_1', text: 'Fader automation written for Lead Vocal, Backing Vocals, and Solos across sections' },
      { id: 'c1_ms_ag5_bal', text: 'All Compulsory Stems and 2+ Additional Instruments clearly audible' },
      { id: 'c1_ms_ag10_3', text: 'Total bounced track duration is strictly between 3:00 and 3:30' }
    ]
  },
  {
    code: 'AG6',
    title: 'Production — Use of Stereo Field',
    marks: 4,
    category: 'AO2 • Stereo Panning & Soundstage Width',
    color: '#2dd4bf',
    jumpTab: 'mixing_mastering',
    summary: 'Center anchor (Kick, Snare, Bass, Lead Vocal), consistent Drum Kit panning, and balanced L/R spread.',
    realWorldExample: 'Center (0): Kick, Snare, Bass, Lead Vox. Drums: OH L45/R45 (or Glyn Johns -60L/+25R). BVs L35/R35; Guitars L55/R55.',
    bands: [
      { level: 'L1 (1m)', desc: 'Narrow mono-heavy mix or off-center kick/bass.' },
      { level: 'L2 (2m)', desc: 'Basic panning with occasional lopsided clustering.' },
      { level: 'L3 (3m)', desc: 'Balanced stereo field with clear center anchor.' },
      { level: 'L4 (4m)', desc: 'Wide, 3D stereo image with +0.7 to +1.0 phase correlation.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag8_1', text: 'Kick, Snare, Bass Guitar, and Lead Vocal anchored dead Center (Pan 0)' },
      { id: 'c1_ms_ag8_2', text: 'Drum Overheads, Hi-Hat, and Toms panned with a single consistent perspective' },
      { id: 'c1_ms_ag8_3', text: 'Backing Vocals (L35/R35), Double-Tracked Guitars (L55/R55) & Keys panned symmetrically L/R' }
    ]
  },
  {
    code: 'AG7',
    title: 'Production — Noise, Distortion, Pitch/Time Edits & Master Level',
    marks: 4,
    category: 'AO1/AO2 • Hygiene, Comping/Tuning & Master Bounce',
    color: '#10b981',
    jumpTab: 'workflow',
    summary: 'Freedom from noise/spill/clicks, top-and-tail fades, phase-locked drum edits, vocal comping/tuning, and -1.0 dBFS master.',
    realWorldExample: '10ms crossfades; Phase-Locked Drum Group; Vocal Quick Swipe Comp + Flex Pitch; Adaptive Limiter at -1.0 dBFS True Peak.',
    bands: [
      { level: 'L1 (1m)', desc: 'Click bleed, hum, digital clipping, or out-of-tune/out-of-time stems.' },
      { level: 'L2 (2m)', desc: 'Mostly clean with minor spill, timing drift, or audible tuning artifacts.' },
      { level: 'L3 (3m)', desc: 'Clean noise floor, tight timing, accurate tuning & healthy master level.' },
      { level: 'L4 (4m)', desc: 'Pristine edits, natural vocal tuning, zero clipping & -1.0 dBFS True Peak.' }
    ],
    elementsChecklist: [
      { id: 'c1_ms_ag4_1', text: 'Drum polarity (Ø) verified & edited as a Phase-Locked Group' },
      { id: 'c1_ms_ag5_2', text: '🎤 Vocals comped (Quick Swipe + 10ms crossfades) with natural Flex Pitch / Melodyne' },
      { id: 'c1_ms_ag4_2', text: 'All regions topped-and-tailed with 5–15 ms fades; zero click bleed or hum' },
      { id: 'c1_ms_ag10_2', text: 'Master Limiter at -1.0 dBFS True Peak (-14 LUFS) & bounced as 16-bit / 44.1 kHz WAV' }
    ]
  }
];

export const C1_TECHNIQUES_BANK = [
  // ============================================================================
  // CATEGORY 1: DRUM KIT CAPTURE (AG1A • 4 CARDS)
  // ============================================================================
  {
    id: 'c1_tech_glyn_johns',
    number: 1,
    preferred: true,
    category: 'drums',
    categoryLabel: '⭐ Preferred Method',
    title: '4-Mic Glyn Johns Drum Method',
    description: 'Simple, fast, phase-coherent 4-mic drum setup where both overheads are measured equidistant from the snare center.',
    recipes: [
      { name: 'Mic 1 — Top OH', settings: 'AKG C414 / NT5 (Cardioid) • 105 cm (42") directly above Snare • Pan: Center or +25R' },
      { name: 'Mic 2 — Side OH', settings: 'Matched C414 / NT5 • 15 cm above Floor Tom rim aiming at Snare (105 cm distance) • Pan: -60L' },
      { name: 'Mic 3 & 4 — Kick + Snare', settings: 'Kick: D112 inside porthole (Pan 0) • Snare: SM57 4 cm above rim @ 45° (Pan 0)' }
    ],
    steps: [
      'Cable Equidistance Check: Hold a mic cable on the snare center—measure to Top OH, then swing the same length to Side OH so both are 100% equidistant.',
      'Solo both overheads in Mono first to verify the snare sounds full and punchy, then bring up Kick and Snare mics.'
    ],
    logbookPrompt: 'Mic models, cable equidistance measurement (cm) from snare center, and L/R panning.',
    templatePlaceholder: 'Drums captured via 4-Mic Glyn Johns Method: Top OH (AKG C414) 105 cm above snare center; Side OH (matched C414) 15 cm above floor tom rim at an identical 105 cm distance from snare (cable-verified). Reinforced with AKG D112 (Kick) and Shure SM57 (Snare).'
  },
  {
    id: 'c1_tech_1',
    number: 2,
    category: 'drums',
    categoryLabel: 'AG1A • Close Mics',
    title: 'Kick & Snare Close-Miking (Spill Null & Polarity Ø)',
    description: 'Maximising kick punch and snare crack while rejecting hi-hat bleed and preventing top/bottom phase cancellation.',
    recipes: [
      { name: 'Kick In', settings: 'AKG D112 / Beta 52A • Inside porthole angled 30° to beater • Peaks @ -8 dBFS' },
      { name: 'Snare Top & Bottom', settings: 'Top: SM57 4 cm above rim @ 45° (null to Hi-Hat) • Bottom: SM57 w/ Polarity Inverted (Ø)' }
    ],
    steps: [
      'Point the rear null of the Snare Top SM57 directly at the hi-hat to reject cymbal spill.',
      'Invert Snare Bottom polarity (Ø) in the DAW so top and bottom capsules move in phase.'
    ],
    logbookPrompt: 'Kick/Snare mic models, off-axis hi-hat rejection, and Snare Bottom polarity (Ø).',
    templatePlaceholder: 'Kick: AKG D112 inside porthole 10 cm from beater. Snare Top: Shure SM57 4 cm above rim at 45° (null to hi-hat); Snare Bottom polarity inverted (Ø).'
  },
  {
    id: 'c1_tech_2',
    number: 3,
    category: 'drums',
    categoryLabel: 'AG1A • Stereo Overheads',
    title: 'Alternative Stereo Overheads (XY vs Equidistant Spaced Pair)',
    description: 'Matched condenser pair capturing a wide stereo cymbal and kit image with a centered snare.',
    recipes: [
      { name: 'XY Coincident Pair', settings: '2x Rode NT5 / KM184 (Cardioid) • Capsules crossed at 90° above snare, 100 cm high' },
      { name: 'Equidistant Spaced Pair', settings: '2x AKG C414 / NT5 (+48V) • Measured 110 cm from snare center • Pan L45 / R45' }
    ],
    steps: [
      'Match preamp gains identically on both condensers and measure equal distance from the snare center.',
      'Check overheads in Mono to confirm zero phase hollowness.'
    ],
    logbookPrompt: 'Stereo array (XY or Spaced Pair), condenser models, and equidistance measurement.',
    templatePlaceholder: 'Overheads: Matched pair of Rode NT5 SDCs (+48V, Cardioid) in an equidistant spaced pair measured at 110 cm from snare center (Pan L45/R45).'
  },
  {
    id: 'c1_tech_3',
    number: 4,
    category: 'drums',
    categoryLabel: 'AG1A • Multi-Mic Expansion',
    title: 'Optional Toms, Hi-Hat & Room Mics',
    description: 'Adding close tom dynamics, hi-hat SDC, and a room condenser while maintaining one consistent panning perspective.',
    recipes: [
      { name: 'Rack & Floor Toms', settings: 'Sennheiser e604 / MD421 • Clipped 4 cm above rim, angled away from crashes' },
      { name: 'Hi-Hat & Room', settings: 'Hat: NT5 12 cm above outer edge (300 Hz HPF) • Room: C414 (Omni) 2.5 m front' }
    ],
    steps: [
      'Aim tom mics toward the drumhead center with rear nulls pointing at nearby cymbals.',
      'Pan all drum mics to ONE consistent perspective (e.g. Audience: Hat R25, Rack L20, Floor R35).'
    ],
    logbookPrompt: 'Tom/hat/room mic models and chosen panning perspective (Audience vs Drummer).',
    templatePlaceholder: 'Toms miked with Sennheiser e604s 4 cm above rims; panned in Audience Perspective (Rack L20, Floor R35).'
  },

  // ============================================================================
  // CATEGORY 2: VOCALS (LEAD & BACKING) — SEPARATED FROM ALL INSTRUMENTS (4 CARDS)
  // ============================================================================
  {
    id: 'c1_tech_7',
    number: 5,
    preferred: true,
    category: 'vocals',
    categoryLabel: 'AG1B • Lead Vocal (4m)',
    title: 'Lead Vocal Capture (LDC, Pop Shield & Reflection Filter)',
    description: 'Clean, plosive-free Lead Vocal capture assessed in its own dedicated 4-mark column (AG1B).',
    recipes: [
      { name: 'Mic & Pattern', settings: 'AKG C414 / Rode NT1 / U87 (Cardioid, +48V) • Shockmount + 80 Hz HPF' },
      { name: 'Distance & Acoustic Control', settings: 'Pop shield 7 cm from capsule • Singer at 15–20 cm • Reflection Filter behind mic' }
    ],
    steps: [
      'Place pop shield 7 cm from capsule and position singer 15–20 cm back.',
      'Gain-stage on the loudest chorus line for -10 to -6 dBFS peaks.'
    ],
    logbookPrompt: 'LDC model, Cardioid pattern, pop shield distance, reflection filter, and peak dBFS.',
    templatePlaceholder: 'Lead Vocal (AG1B): AKG C414 XLII (Cardioid, +48V, 80 Hz HPF) in shockmount with Reflection Filter and pop shield at 7 cm (singer at 18 cm, peaking at -8 dBFS).'
  },
  {
    id: 'c1_tech_voc_bv',
    number: 6,
    category: 'vocals',
    categoryLabel: 'AG1B & AG6 • Backing Vocals',
    title: 'Backing Vocals (25–30 cm Distance & Stereo Double-Tracking)',
    description: 'Stepping back to 25–30 cm reduces proximity bass so BVs sit naturally behind the Lead Vocal when panned L/R.',
    recipes: [
      { name: 'BV Placement', settings: 'LDC (Cardioid) @ 25–30 cm distance • Closed-back headphones (zero click bleed)' },
      { name: 'Stereo Stack', settings: 'Separate Take A & Take B passes • Low Harmonies L35/R35 • High Harmonies L65/R65' }
    ],
    steps: [
      'Record two separate performance takes for each harmony line (never copy-paste the same region).',
      'Mute the metronome click during quiet final vocal tails to prevent headphone spill.'
    ],
    logbookPrompt: 'BV mic distance (25–30 cm), double-tracked L/R panning, and headphone click-bleed check.',
    templatePlaceholder: 'Backing Vocals (AG1B/AG6): AKG C414 (Cardioid) at 28 cm distance; harmonies double-tracked as separate takes and panned L35/R35 and L65/R65.'
  },
  {
    id: 'c1_tech_voc_proc',
    number: 7,
    category: 'vocals',
    categoryLabel: 'AG2, AG3 & AG7 • Vocal Chain',
    title: 'Vocal Comping, Pitch Edit, EQ & Serial FET->Opto Compression',
    description: 'Targets the dedicated 4m Vocals EQ (AG2) and 4m Vocals Dynamics (AG3) mark scheme columns.',
    recipes: [
      { name: 'Comping & Pitch (AG7)', settings: 'Quick Swipe Comp (10 ms crossfades) • Natural Flex Pitch / Melodyne on sustained notes' },
      { name: 'Vocal EQ (AG2 — 4m)', settings: '85 Hz HPF • -2.5 dB @ 240 Hz (de-mud) • +2 dB @ 3.5 kHz (presence) • +1.5 dB @ 12 kHz (air)' },
      { name: 'Serial Compression (AG3 — 4m)', settings: 'FET 1176 (4:1, 3 dB peak GR) -> Opto LA-2A (2:1, 2 dB smooth GR) -> DeEsser @ 6.8 kHz' }
    ],
    steps: [
      'Comp the best vocal phrases with 10 ms crossfades and strip silence/breaths between lines.',
      'Chain a fast FET compressor (catching peaks) into a slow Opto compressor (levelling phrases) + De-Esser.'
    ],
    logbookPrompt: 'Vocal EQ frequencies/gains and Serial Compressor + De-Esser settings.',
    templatePlaceholder: 'Vocal EQ (AG2): 85 Hz HPF, -2.5 dB @ 245 Hz, +2 dB @ 3.6 kHz, +1.5 dB @ 12 kHz. Vocal Dynamics (AG3): Serial FET (4:1, 3 dB GR) -> Opto (2:1, 2 dB GR) + DeEsser @ 6.8 kHz.'
  },
  {
    id: 'c1_tech_voc_fx',
    number: 8,
    category: 'vocals',
    categoryLabel: 'AG4 & AG5 • Vocal Space & Rides',
    title: 'Vocal Plate Reverb (28 ms Pre-Delay), Delay Throws & Fader Rides',
    description: 'Pre-delayed Plate Reverb keeps consonants crisp, filtered returns prevent mud, and fader rides keep every lyric audible.',
    recipes: [
      { name: 'Aux 1 Vocal Plate (AG4)', settings: 'Space Designer Plate • 1.5s Decay • 28 ms Pre-Delay • Post-EQ: 220 Hz HPF, 7.5 kHz LPF' },
      { name: 'Delay & Fader Rides (AG5)', settings: 'Aux 3 Stereo Delay (1/8D, LPF 3.8 kHz) • Lead Vocal automated +1.5 dB in Choruses' }
    ],
    steps: [
      'Place an EQ after the reverb plugin on Aux 1 (220 Hz HPF / 7.5 kHz LPF) so reverb tails never muddy the vocal.',
      'Automate the Lead Vocal fader (+1.5 dB in choruses) so every word sits clearly above the mix.'
    ],
    logbookPrompt: 'Vocal Plate decay, pre-delay (ms), return EQ cuts, and chorus vocal fader rides.',
    templatePlaceholder: 'Vocal FX (AG4): Aux 1 Vocal Plate (1.5s decay, 28 ms pre-delay, post-EQ 220 Hz–7.5 kHz) + Aux 3 1/8D Delay. Balance (AG5): Lead Vocal automated +1.5 dB in Choruses.'
  },

  // ============================================================================
  // CATEGORY 3: OTHER INSTRUMENTS — BASS, GUITARS & MIDI/EXTRA (AG1C • 6 CARDS)
  // ============================================================================
  {
    id: 'c1_tech_4',
    number: 9,
    category: 'other_instruments',
    categoryLabel: 'AG1C • Bass Guitar',
    title: 'Bass Guitar Capture (Active DI + SVT Amp Sim / Cab Blend)',
    description: 'Blending clean Active DI sub-bass with an Ampeg SVT amp simulation (or miked cab) for midrange finger/pick definition.',
    recipes: [
      { name: 'Clean DI + SVT Blend', settings: 'Radial J48 DI (Ground Lift ON, -10 dBFS peaks) + Logic Bass Amp Designer (SVT 8x10, HPF 180 Hz)' }
    ],
    steps: [
      'Record clean Active DI and duplicate/send to Bass Amp Designer for 400–800 Hz articulation.',
      'Zoom in to verify sample phase alignment between the clean DI and amp channel.'
    ],
    logbookPrompt: 'DI box model, Ground Lift setting, and Bass Amp Designer / cab blend.',
    templatePlaceholder: 'Bass Guitar (AG1C): Radial J48 Active DI (Ground Lift ON) blended with Logic Bass Amp Designer (Classic SVT model) for midrange definition.'
  },
  {
    id: 'c1_tech_5',
    number: 10,
    category: 'other_instruments',
    categoryLabel: 'AG1C • Acoustic Guitar',
    title: 'Acoustic Guitar Miking (12th Fret Sweet Spot)',
    description: 'Aiming a Small Diaphragm Condenser at the 12th fret captures crisp string detail while avoiding 120 Hz soundhole boom.',
    recipes: [
      { name: '12th Fret SDC', settings: 'Rode NT5 / KM184 (Cardioid, +48V, 80 Hz HPF) • 18 cm from 12th fret angled 15° to bridge' }
    ],
    steps: [
      'Never point the condenser directly into the soundhole; aim 15–20 cm from the 12th fret.',
      'Double-track rhythm parts as two separate takes and pan L45 / R45.'
    ],
    logbookPrompt: 'Condenser model, 12th-fret distance/angle, and soundhole avoidance.',
    templatePlaceholder: 'Acoustic Guitar (AG1C): Rode NT5 SDC (Cardioid, +48V) 18 cm from 12th fret angled toward bridge to avoid soundhole resonance.'
  },
  {
    id: 'c1_tech_guitar_di_amp_sim',
    number: 11,
    preferred: true,
    category: 'other_instruments',
    categoryLabel: 'AG1C • ⭐ DI + Amp Designer',
    title: 'Electric Guitar DI + Logic Amp Designer & Pedalboard',
    description: 'Spill-free Pathway 2 DI guitar tracking into Logic Pedalboard stompboxes and Amp Designer with virtual mic placement.',
    recipes: [
      { name: 'DI Input (Pathway 2)', settings: 'Radial J48 DI / Interface Hi-Z Input • Ground Lift ON • Peaks @ -10 dBFS • 64-sample buffer' },
      { name: 'Pedalboard -> Amp Designer', settings: 'Tube Burner (Drive 35%) -> Vox AC30 / Fender Twin / Marshall • Virtual SM57 / Ribbon 121 @ cone edge' }
    ],
    steps: [
      'Track clean DI at a 64-sample buffer for zero-latency monitoring through Amp Designer.',
      'Double-track rhythm guitars as two separate takes panned L55 / R55 with contrasting amp/mic models.'
    ],
    logbookPrompt: 'DI/Hi-Z input, Pedalboard pedals, and Amp Designer head, cab & virtual mic placement.',
    templatePlaceholder: 'Electric Guitars (AG1C): Tracked via Radial J48 Active DI into Logic Pedalboard (Tube Burner) and Amp Designer (British AC30 2x12, Virtual Ribbon 121 at cone edge). Double-tracked L55/R55.'
  },
  {
    id: 'c1_tech_6',
    number: 12,
    category: 'other_instruments',
    categoryLabel: 'AG1C • Miked Guitar Amp',
    title: 'Electric Guitar Amplifier Miking (Cone Edge SM57 + Safety DI)',
    description: 'Close-miking the speaker cone dust-cap edge with a dynamic/ribbon mic alongside a split safety DI track.',
    recipes: [
      { name: 'Cone Edge + Safety DI', settings: 'Shure SM57 2 cm from grille @ dust-cap edge + optional Royer R-121 Ribbon + Radial Thru DI' }
    ],
    steps: [
      'Shine a torch through the grille to aim the SM57 right at the dust-cap seam (sweet spot).',
      'Capture a simultaneous clean safety DI track via the DI box Thru output.'
    ],
    logbookPrompt: 'Amp model, mic model, cone position (dust-cap edge), and safety DI.',
    templatePlaceholder: 'Electric Guitar (AG1C): Shure SM57 2 cm from grille at dust-cap edge of guitar cab + simultaneous Radial safety DI.'
  },
  {
    id: 'c1_tech_midi_keys_mellotron_synths',
    number: 13,
    preferred: true,
    category: 'other_instruments',
    categoryLabel: 'AG1C • ⭐ Pathway 3 MIDI',
    title: 'MIDI Instruments: Synths, Pianos, Hammond B3, Electric Pianos & Mellotron',
    description: 'Live USB MIDI keyboard capture of Acoustic Pianos, Rhodes/Wurlitzer, Hammond B3 Organ, Vintage Mellotron, and Synths.',
    recipes: [
      { name: 'Pianos & Electric Pianos', settings: 'Logic Studio Piano & Vintage Electric Piano (Rhodes Mk I / Wurlitzer 200A) • Live velocity + CC64 Sustain' },
      { name: 'Hammond B3 & Mellotron', settings: 'Vintage B3 (Drawbars 888000000, CC1 Leslie speed) • Vintage Mellotron (Flutes / 3-Violins / Choir blend)' },
      { name: 'Synthesizers', settings: 'Retro Synth / Alchemy (Analog Saw/Pulse Pad, Lead or Synth Brass) • CC74 Filter Cutoff + Humanize' }
    ],
    steps: [
      'Perform parts LIVE on a USB MIDI keyboard with sustain pedal (CC64) — never import pre-made MIDI files.',
      'Automate Mod Wheel (CC1) for B3 Leslie speed (Chorale/Tremolo) or filter cutoff sweeps on Retro Synth.'
    ],
    logbookPrompt: 'MIDI keyboard used, live CC articulations (CC64 sustain, CC1 Leslie), and plugin settings.',
    templatePlaceholder: 'Pathway 3 MIDI Instruments (AG1C) played live via USB MIDI keyboard: Rhodes Mk I (CC64 sustain, Tremolo 4 Hz), Hammond B3 (888000000, CC1 Leslie speed automated), Vintage Mellotron (Flutes/Strings blend), and Retro Synth Pad.'
  },
  {
    id: 'c1_tech_8',
    number: 14,
    category: 'other_instruments',
    categoryLabel: 'AG1C • Live Extra Stems',
    title: 'Additional Live Instruments (Brass, Strings & Percussion)',
    description: 'Capturing live auxiliary instruments (Sax, Trumpet, Strings, Tambourine, Shaker) at 30–45 cm with off-axis transient control.',
    recipes: [
      { name: 'Brass & Percussion', settings: 'Brass: MD421 / Ribbon 35–45 cm off-axis • Tambourine/Shaker: NT5 (Cardioid) 35 cm @ 45° (250 Hz HPF)' }
    ],
    steps: [
      'Place brass or percussion 30–45 cm from the mic angled slightly off-axis to prevent transient clipping.',
      'Engage a 150–250 Hz HPF to remove room rumble.'
    ],
    logbookPrompt: 'Additional live instruments, mic models, distances (30–45 cm), and HPF settings.',
    templatePlaceholder: 'Live Additional Instruments (AG1C): Tambourine & Shaker via Rode NT5 at 35 cm (250 Hz HPF); Tenor Sax via Sennheiser MD421 at 40 cm off-axis.'
  },

  // ============================================================================
  // CATEGORY 4: MIXING, STEREO & MASTERING (AG2–AG7 • 4 CARDS)
  // ============================================================================
  {
    id: 'c1_tech_9',
    number: 15,
    category: 'mixing_mastering',
    categoryLabel: 'AG2 • Mix EQ (12m)',
    title: 'Subtractive EQ, High-Pass Filtering & Kick/Bass/Vocal Pocketing',
    description: 'Eliminating low-end mud and midrange masking across Drums (4m), Vocals (4m), and Other Instruments (4m).',
    recipes: [
      { name: 'Kick vs Bass Pocket', settings: 'Kick: +3 dB @ 60 Hz, -3.5 dB @ 180 Hz • Bass: 35 Hz HPF, -3 dB @ 60 Hz, +2.5 dB @ 180 Hz' },
      { name: 'Vocal Midrange Pocket', settings: 'Guitars/Keys: 100 Hz HPF, -2 dB dip @ 3.2 kHz so Lead Vocal (+2 dB @ 3.5 kHz) cuts through' }
    ],
    steps: [
      'High-pass all non-bass tracks (80–100 Hz on vocals/guitars/snare; 250 Hz on hi-hat/percussion).',
      'Notch 300 Hz drum boxiness and inverse-pocket Kick (60 Hz) against Bass (180 Hz).'
    ],
    logbookPrompt: 'Exact EQ frequencies (Hz), gain (±dB), and Q values for Drums, Vocals, and Other Parts.',
    templatePlaceholder: 'EQ (AG2): Kick +3 dB @ 62 Hz / -3.5 dB @ 190 Hz; Bass -3 dB @ 62 Hz / +2.5 dB @ 190 Hz. Guitars/Keys high-passed @ 100 Hz with -2 dB cut @ 3.2 kHz for Lead Vocal clarity.'
  },
  {
    id: 'c1_tech_10',
    number: 16,
    category: 'mixing_mastering',
    categoryLabel: 'AG3 • Mix Dynamics (12m)',
    title: 'Drum Transient VCA, Tom Gates, Bass Opto & Parallel NY Crush',
    description: 'Punchy drum transients, clean tom gating, even sub-bass, and parallel drum bus weight.',
    recipes: [
      { name: 'Drums & Gates (4m)', settings: 'Kick/Snare VCA: 4:1, 22 ms Atk, 80 ms Rel (3.5 dB GR) • Tom Gate: -28 dB Thresh, 180 ms Rel' },
      { name: 'Parallel Crush & Bass (4m)', settings: 'Parallel Drum Aux: FET 8:1 (10 dB GR) blended @ -14 dB • Bass: Vintage Opto 4:1 (4.5 dB GR)' }
    ],
    steps: [
      'Use 20–25 ms attack on Kick/Snare compressors so initial drumstick transients pass through unclamped.',
      'Blend an 8:1 Parallel Drum Crush bus underneath the dry drums for sustain and weight.'
    ],
    logbookPrompt: 'Compressor models, Ratio, Attack/Release (ms), and Gain Reduction (dB).',
    templatePlaceholder: 'Dynamics (AG3): Kick/Snare VCA (4:1, 22ms attack, 3.5 dB GR); Toms gated (-28 dB); Parallel NY Drum Bus (8:1, 10 dB GR blended at -14 dB); Bass Opto (4:1, 4.5 dB GR).'
  },
  {
    id: 'c1_tech_11',
    number: 17,
    category: 'mixing_mastering',
    categoryLabel: 'AG4 & AG6 • Stereo & Room (16m)',
    title: 'Stereo Panning Architecture & Shared Studio Room Reverb',
    description: 'Cohesive 3D stereo image uniting miked, DI, and MIDI stems in a shared virtual room.',
    recipes: [
      { name: 'Stereo Map (AG6 — 4m)', settings: 'Center (0): Kick, Snare, Bass, Lead Vox • Drums: -60L/+25R (or L45/R45) • BVs: L35/R35 • Gtrs: L55/R55 • Keys: L40/R40' },
      { name: 'Aux 2 Studio Room (AG4)', settings: 'Space Designer Studio Room • 0.75s decay, 12 ms pre-delay • Post-EQ: 180 Hz HPF, 8 kHz LPF' }
    ],
    steps: [
      'Keep Kick, Snare, Bass, and Lead Vocal dead Center (0) and counter-pan Guitars, BVs, and Keys L/R.',
      'Send drums, DI guitars, and MIDI keys to Aux 2 Studio Room so they share one acoustic space.'
    ],
    logbookPrompt: 'Complete L/R panning positions (AG6) and shared Studio Room reverb settings (AG4).',
    templatePlaceholder: 'Stereo (AG6): Center (0) Kick/Snare/Bass/Lead Vox; Drums panned consistently; Guitars L55/R55; BVs L35/R35; Keys L40/R40. Aux 2 Studio Room (0.75s, filtered 180Hz–8kHz).'
  },
  {
    id: 'c1_tech_12',
    number: 18,
    category: 'mixing_mastering',
    categoryLabel: 'AG5 & AG7 • Automation & Master (8m)',
    title: 'Section Balance Rides, Mix Bus Glue & -1.0 dBFS Master',
    description: 'Dynamic section automation, 2:1 VCA mix bus glue, and -1.0 dBFS True Peak limiting (-14 LUFS).',
    recipes: [
      { name: 'Automation & Master Chain', settings: 'Chorus Vocal/Gtr lifts (+1.5 dB) & Solo (+2 dB) • Master VCA (2:1, 1.5 dB GR) -> 25 Hz HPF -> Adaptive Limiter (-1.0 dBFS True Peak, -14 LUFS)' }
    ],
    steps: [
      'Automate chorus lifts (+1.5 dB) and solo boosts (+2 dB) so the mix builds dynamically.',
      'Bounce as a 16-bit / 44.1 kHz Stereo WAV strictly between 3:00 and 3:30.'
    ],
    logbookPrompt: 'Section automation rides (AG5) and Master Bus chain, True Peak ceiling (-1.0 dBFS), and LUFS (AG7).',
    templatePlaceholder: 'Balance & Master (AG5/AG7): Automated Lead Vocal (+1.5 dB in Choruses) and solo lift (+2 dB). Master Bus: Vintage VCA (2:1, 1.5 dB GR) -> 25 Hz HPF -> Adaptive Limiter (-1.0 dBFS True Peak, -14.5 LUFS).'
  }
];

export const C1_WORKFLOW_PHASES = [
  {
    id: 'c1_phase_1',
    phaseNumber: 'Phase 1',
    timing: 'Weeks 1–2',
    title: 'Song Selection, Tempo Map & 12–24 Track Plan',
    color: '#38bdf8',
    summary: 'Select prescribed song, set 24-bit/48kHz project, map BPM/markers (3:00–3:30), and record scratch guide.',
    tasks: [
      { id: 'c1_p1_1', label: 'Select Prescribed Song & Generate Track Sheet', detail: 'Review compulsory stems + min. 2 additional instruments.' },
      { id: 'c1_p1_2', label: 'Set 24-bit / 48 kHz, Map BPM & Arrangement Markers', detail: 'Verify arrangement length is strictly 3:00–3:30.' },
      { id: 'c1_p1_3', label: 'Verify 12–24 Track Allocation (Drums, Vocals & Other Parts)', detail: 'Drums (4+ mics), Lead/BV, Bass, Ac/El Guitar + 2 Extra.' },
      { id: 'c1_p1_4', label: 'Record Scratch Guide & Click Routing', detail: 'Create headphone cue mix for tracking.' },
      { id: 'c1_p1_5', label: 'DELETE Original Reference Audio', detail: 'Ensure zero commercial audio remains in project.' }
    ]
  },
  {
    id: 'c1_phase_2',
    phaseNumber: 'Phase 2',
    timing: 'Weeks 3–4',
    title: 'AG1A Drum Kit (Preferred 4-Mic Glyn Johns) & Bass Tracking',
    color: '#c084fc',
    summary: 'Capture phase-coherent drums (Preferred 4-Mic Glyn Johns or multi-mic) and dual-pathway bass.',
    tasks: [
      { id: 'c1_p2_6', label: '⭐ Preferred: 4-Mic Glyn Johns Drum Setup (AG1A)', detail: 'Top OH + Side Floor-Tom OH (equidistant from snare) + Kick + Snare.' },
      { id: 'c1_p2_1', label: 'Alternative: Multi-Mic 5–8 Drum Setup (AG1A)', detail: 'Kick (D112), Snare (SM57), Overheads L/R (NT5/C414) + Toms/Hat.' },
      { id: 'c1_p2_2', label: 'Verify Overhead Equidistance & Polarity (Ø)', detail: 'Cable distance check from snare center + Snare Bottom flip.' },
      { id: 'c1_p2_3', label: 'Gain Stage Drum Preamps (-8 to -6 dBFS Peaks)', detail: 'Zero pre-A/D clipping on loudest fills.' },
      { id: 'c1_p2_4', label: 'Group & Phase-Lock Edit Drum Takes (AG7)', detail: 'Enable Phase-Locked Audio Group before editing.' },
      { id: 'c1_p2_5', label: 'Track Bass Guitar via Active DI + SVT Amp Sim (AG1C)', detail: 'Clean DI + Bass Amp Designer or miked cab.' }
    ]
  },
  {
    id: 'c1_phase_3',
    phaseNumber: 'Phase 3',
    timing: 'Weeks 5–6',
    title: 'AG1C Other Instruments: Guitars, MIDI Keys/Synths & Extra',
    color: '#f472b6',
    summary: 'Track Acoustic/Electric Guitars (DI+Amp Sim or Mic), MIDI Keyboards/Synths/Mellotron, and Live Brass/Percussion.',
    tasks: [
      { id: 'c1_p3_1', label: 'Track Acoustic Guitar at 12th Fret (AG1C)', detail: 'SDC 15–20 cm from 12th fret angled to bridge.' },
      { id: 'c1_p3_6', label: 'Track Electric Guitar via DI + Amp Designer & Pedalboard', detail: 'Spill-free DI tracking with virtual head, cab & cone-edge mic.' },
      { id: 'c1_p3_2', label: 'Alternative: Miked Electric Guitar Cab + Safety DI', detail: 'SM57/Ribbon at cone edge + split DI.' },
      { id: 'c1_p3_7', label: 'Pathway 3 MIDI: Synths, Pianos, Hammond B3, Rhodes & Mellotron', detail: 'Live USB MIDI performance with velocity, CC64 sustain & CC1 Leslie.' },
      { id: 'c1_p3_4', label: 'Capture Additional Live Instrument (Brass / Strings / Percussion)', detail: 'Mic at 30–45 cm off-axis (HPF engaged).' },
      { id: 'c1_p3_5', label: 'Log All Mics, DI Boxes, Amp Sims & MIDI Patches', detail: 'Record exact models and parameters for C1 Logbook.' }
    ]
  },
  {
    id: 'c1_phase_4',
    phaseNumber: 'Phase 4',
    timing: 'Week 7',
    title: 'AG1B Dedicated Vocals Session: Lead & Backing Vocals',
    color: '#fbbf24',
    summary: 'Separated Vocal Capture (AG1B): Track Lead & Backing Vocals, Quick Swipe Comp, and top-and-tail regions.',
    tasks: [
      { id: 'c1_p4_1', label: 'Record Lead Vocal Takes (LDC, Cardioid, Pop Shield — AG1B)', detail: '15–20 cm distance, pop shield at 7 cm, reflection filter, 80 Hz HPF.' },
      { id: 'c1_p4_2', label: 'Record Backing Vocals (25–30 cm, Double-Tracked L/R — AG1B/AG6)', detail: 'Step back to reduce proximity bass; record separate L/R takes.' },
      { id: 'c1_p4_3', label: 'Quick Swipe Comp & Transparent Pitch Edit (AG7)', detail: '10 ms crossfades + natural Flex Pitch / Melodyne.' },
      { id: 'c1_p4_4', label: 'Top-and-Tail All Regions & Strip Silence (AG7)', detail: 'Remove dead air, coughs, hum, and click bleed.' },
      { id: 'c1_p4_5', label: 'Verify Final Track Count (12–24 Tracks)', detail: 'Confirm total active tracks are strictly 12–24.' }
    ]
  },
  {
    id: 'c1_phase_5',
    phaseNumber: 'Phase 5',
    timing: 'Week 8',
    title: 'AG2–AG7 Mixdown, Automation, Mastering & Logbook',
    color: '#10b981',
    summary: 'Apply separated EQ (AG2), Dynamics (AG3), FX (AG4), Balance Rides (AG5), Stereo (AG6), and -1.0 dBFS Master (AG7).',
    tasks: [
      { id: 'c1_p5_1', label: 'AG2 EQ (12m): Drums (4m), Vocals (4m) & Other Parts (4m)', detail: 'HPFs, Kick/Bass pocketing & Vocal presence/air.' },
      { id: 'c1_p5_2', label: 'AG3 Dynamics (12m): Serial Vocal Comp/De-Ess, Drum Gates & Parallel', detail: 'FET->Opto vocal chain, slow-attack drum VCA & bass Opto.' },
      { id: 'c1_p5_3', label: 'AG4 & AG6 FX (12m) & Stereo (4m): Vocal Plate, Room & Panning', detail: '28 ms pre-delay, filtered return EQ & consistent drum panning.' },
      { id: 'c1_p5_4', label: 'AG5 Balance (4m): Lead Vocal & Section Automation Rides', detail: 'Ensure every lyric word cuts through choruses.' },
      { id: 'c1_p5_5', label: 'AG7 Master (-1.0 dBFS True Peak, 16-bit/44.1kHz WAV) & Logbook PDF', detail: 'Audit full bounce on monitors + headphones.' }
    ]
  }
];

export const C1_MASTER_CHECKLIST = [
  { id: 'c1_mc_1', category: 'Prescribed Song', text: 'Based on an official Edexcel Component 1 prescribed song for your cohort' },
  { id: 'c1_mc_2', category: 'Duration (AG5)', text: 'Final bounce is strictly 3:00–3:30 with clean start and natural ending' },
  { id: 'c1_mc_3', category: 'Track Count', text: 'Uses a minimum of 12 captured tracks and maximum of 24 tracks' },
  { id: 'c1_mc_4', category: 'Drums (AG1A)', text: 'Acoustic Drum Kit recorded with 4+ mics (4-Mic Glyn Johns or Multi-Mic) in phase' },
  { id: 'c1_mc_5', category: 'Vocals (AG1B)', text: 'Lead & Backing Vocals captured cleanly (LDC, pop filter) with zero click bleed' },
  { id: 'c1_mc_6', category: 'Other Inst (AG1C)', text: 'Bass, Ac/El Guitars (DI+Amp Sim or Mic) + 2+ Additional Instruments (MIDI/Live) present' },
  { id: 'c1_mc_7', category: '100% Original', text: 'All audio/MIDI captured by candidate — zero commercial stems or unpermitted loops' },
  { id: 'c1_mc_8', category: 'Hygiene (AG7)', text: 'Regions topped-and-tailed with crossfades; zero hum, plosives, or clipping' },
  { id: 'c1_mc_9', category: 'EQ (AG2 • 12m)', text: 'EQ applied across Drums (4m), Vocals (4m) & Other Parts (4m) with Kick/Bass pocketing' },
  { id: 'c1_mc_10', category: 'Dynamics (AG3 • 12m)', text: 'Serial Vocal compression + De-Esser (4m), Drum gating/parallel (4m) & Bass Opto (4m)' },
  { id: 'c1_mc_11', category: 'Effects (AG4 • 12m)', text: 'Aux Vocal Plate with pre-delay & EQ filter (4m), Drum Room (4m) & Instrument FX (4m)' },
  { id: 'c1_mc_12', category: 'Balance (AG5 • 4m)', text: 'Vocal fader rides and section automation keep Lead Vocal clearly intelligible' },
  { id: 'c1_mc_13', category: 'Stereo (AG6 • 4m)', text: 'Kick/Snare/Bass/Lead Vox centered; consistent drum panning; balanced L/R guitars & BVs' },
  { id: 'c1_mc_14', category: 'Master (AG7 • 4m)', text: 'Bounced as 16-bit / 44.1 kHz Stereo WAV at -1.0 dBFS True Peak (-14 to -16 LUFS)' },
  { id: 'c1_mc_15', category: 'Audit Check', text: 'Full WAV file listened to from 0:00 to end on both monitors and headphones' },
  { id: 'c1_mc_16', category: 'Logbook PDF', text: 'Official C1 Logbook completed with all mics, DI boxes, Amp Sims, MIDI & plugins' }
];
