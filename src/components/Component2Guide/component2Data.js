// Component 2: Technology-Based Composition - Comprehensive Mark Scheme & Technique Guide Data

export const OVERVIEW_SPECS = [
  { label: 'Total Marks', value: '60 Marks', sub: '20% of A-Level Music Technology', icon: '🏆' },
  { label: 'Target Duration', value: '3:00 Minutes', sub: 'Check brief timing rules (usually 3 mins)', icon: '⏱️' },
  { label: 'Export Format', value: '16-bit / 44.1kHz', sub: 'Uncompressed Stereo .WAV file', icon: '💿' },
  { label: 'Minimum Parts', value: '6+ Distinct Parts', sub: 'Vocal, instrumental & sample-based', icon: '🎚️' },
  { label: 'Submission', value: 'May Deadline', sub: 'Check your annual Edexcel exam window', icon: '📅' }
];

export const BRIEF_OPTIONS = [
  {
    id: 'brief2',
    badge: '⭐ STRONGLY RECOMMENDED',
    badgeType: 'recommended',
    title: 'Brief 2: Song / Text-Based Composition',
    subtitle: 'Compose a piece using the set stimulus text/poem provided by Edexcel',
    summary: 'Offers maximum creative flexibility and a ready-made musical structure. You can create either a full song with sung vocals OR a contemporary electronic/experimental piece using spoken-word recordings and manipulated audio samples derived from the set text.',
    pros: [
      'Maximum Creative Freedom: Create a vocal song OR a contemporary piece using manipulated vocal/text samples.',
      'Clear Structural Blueprint: The set text/poem naturally suggests contrasting sections, verses, and choruses.',
      'No Video Sync Stress: You are free to choose your own tempo, meter, and phrase lengths without frame-locked hit points.',
      'More Musical Scope: Familiar verse/chorus/bridge/drop structures make it much easier to score highly in Musicality (AG7–11).',
      'Rich Sound Design Opportunities: Contrasting imagery in the text naturally inspires distinct sonic palettes.'
    ],
    criticalRule: 'CRITICAL: You MUST use the set text in a recognisable form within your composition (sung, rapped, spoken, or clearly intelligible sampled phrases) to be awarded marks for Response to Brief.'
  },
  {
    id: 'brief3',
    badge: '⭐ STRONGLY RECOMMENDED',
    badgeType: 'recommended',
    title: 'Brief 3: Topic / Theme / Stimulus-Based Composition',
    subtitle: 'Compose a piece inspired by the set conceptual topic, theme, or audio stimulus',
    summary: 'Ideal for electronic producers, sound designers, and instrumental composers who want complete freedom over form, texture, and sonic experimentation while responding to an evocative concept or stimulus.',
    pros: [
      'Total Sonic & Genre Freedom: Perfect for EDM, Ambient, Hip-Hop, IDM, Cinematic, or hybrid electronic production.',
      'Focus on Sound Design & Sampling: Build bespoke sample libraries, field recordings, and deep synthesis textures around the theme.',
      'Flexible Arrangement: Structure builds, breakdowns, and evolving sections organically around musical flow rather than video cuts.',
      'Strong Narrative Scope: Great for demonstrating how synthesis, sampling, and creative FX represent programmatic ideas in your logbook.'
    ],
    criticalRule: 'CRITICAL: Ensure you follow any compulsory sample/stimulus rules stated in your year\'s Brief 3 specification and clearly explain in your logbook how your sound design and sections represent the brief.'
  },
  {
    id: 'brief1',
    badge: '⚠️ NOT RECOMMENDED FOR MOST STUDENTS',
    badgeType: 'warning',
    title: 'Brief 1: Composition to Moving Image (Video Brief)',
    subtitle: 'Compose a soundtrack synced to the short film/video clip provided by Edexcel',
    summary: 'While composing to picture can look appealing, we generally advise choosing Brief 2 or Brief 3 instead. Video briefs impose strict visual timing constraints that often hurt your musicality and coherence marks.',
    pros: [
      'Rigid Hit-Point Constraints: Having to hit awkward visual cuts often forces unnatural bar lengths, abrupt transitions, and disjointed musical flow.',
      'Harder to Develop Musicality: Short scene changes make it difficult to develop extended melodies, harmonic progressions, and cohesive song structures.',
      'Time-Consuming Sync Work: Students often spend weeks calculating SMPTE timecodes and tempo changes instead of refining their synthesis, sampling, and mix.',
      'Higher Risk on Coherence (AG6): Sounding like a collection of short sound-effect cues rather than a coherent 3-minute piece of music can cap your marks.'
    ],
    criticalRule: 'ADVICE: Unless you have extensive experience scoring to picture with tempo mapping, stick to Brief 2 or Brief 3 where your music drives the structure!'
  }
];

// Detailed Assessment Grids (AG1 to AG11) with Mark Bands, Concrete Examples & Sub-Checklists
export const MARK_SCHEME_DETAILED = [
  {
    code: 'AG1',
    title: 'Synthesis',
    marks: 8,
    category: 'Technical Control (30 Marks)',
    color: '#38bdf8',
    jumpTab: 'synthesis',
    summary: 'Assesses your ability to create, edit, and shape original synthesizer patches (subtractive, FM, wavetable) with expressive real-time control and modulation.',
    bands: [
      { level: 'Level 1 (1–2m)', desc: 'Relying mostly on unedited factory presets; limited suitability to the piece.' },
      { level: 'Level 2 (3–4m)', desc: 'Basic editing of presets (e.g., simple filter cutoff adjustment); functional but lacks depth.' },
      { level: 'Level 3 (5–6m)', desc: 'Competent sound design using multiple synth parameters (oscillators, filters, ADSR, LFO) that fit the musical style.' },
      { level: 'Level 4 (7–8m)', desc: 'Imaginative, bespoke synthesis across multiple parts (Subtractive, FM, Wavetable) with expressive modulation, envelopes, and automation seamlessly integrated.' }
    ],
    elementsChecklist: [
      { id: 'ms_ag1_1', text: 'Oscillator waveform selection, blending & detuning in cents (e.g., Saw + Pulse in ES2/Retro Synth)' },
      { id: 'ms_ag1_2', text: 'Filter shaping (Low-Pass, High-Pass, Band-Pass, Slope 12/24dB, Resonance/Drive)' },
      { id: 'ms_ag1_3', text: 'ADSR Amplitude & Filter Envelope sculpting (Attack, Decay, Sustain, Release)' },
      { id: 'ms_ag1_4', text: 'LFO & Matrix Modulation (Vibrato, Tremolo, Filter Wobble, Wavetable morphing)' },
      { id: 'ms_ag1_5', text: 'Expressive performance parameters (Glide/Portamento, Pitch Bend range, Velocity sensitivity, Arpeggiator)' }
    ],
    realWorldExample: 'Example: Programming a dark Reese bass in ES2 using two Sawtooth oscillators detuned +9c/-9c with a Sine sub (-12st), filtered through a 24dB Low-Pass filter (160Hz cutoff, 40% resonance) with LFO 1 modulating cutoff at 1/4-note rate.'
  },
  {
    code: 'AG2',
    title: 'Sampling & Audio Manipulation',
    marks: 8,
    category: 'Technical Control (30 Marks)',
    color: '#a855f7',
    jumpTab: 'sampling',
    summary: 'Assesses your capture, selection, editing, and creative manipulation of audio samples (vocal phrases, found sounds, instrumental hits, and loops).',
    bands: [
      { level: 'Level 1 (1–2m)', desc: 'Raw drag-and-drop loops used with minimal editing or poor timing/tuning.' },
      { level: 'Level 2 (3–4m)', desc: 'Basic sample trimming/truncation and level adjustment; fits tempo reasonably.' },
      { level: 'Level 3 (5–6m)', desc: 'Effective sample manipulation (slicing, reversing, time-stretching, pitch-shifting) integrated rhythmically and harmonically.' },
      { level: 'Level 4 (7–8m)', desc: 'Sophisticated, varied audio manipulation across 6+ samples (Quick Sampler slicing, Flex Time/Pitch harmonies, multi-sample key-mapping, looping/stuttering, sampler filter/ADSR shaping).' }
    ],
    elementsChecklist: [
      { id: 'ms_ag2_1', text: 'Minimum of 6 distinct samples sourced/recorded and credited in logbook' },
      { id: 'ms_ag2_2', text: 'Transient Slicing & MIDI re-sequencing in Quick Sampler' },
      { id: 'ms_ag2_3', text: 'Time-stretching via Flex Time (Polyphonic, Rhythmic, Slicing, or Tempophone FX)' },
      { id: 'ms_ag2_4', text: 'Pitch shifting & Formant manipulation via Flex Pitch or Region Transpose' },
      { id: 'ms_ag2_5', text: 'Sample reversing, truncation/fades, micro-loop stuttering & multi-zone Sampler layering' }
    ],
    realWorldExample: 'Example: Recording a spoken-word line from the set text, slicing it by transient in Quick Sampler, re-triggering syllables in a 1/16th syncopated pattern, and layering a duplicate track pitched -12 semitones down via Flex Pitch.'
  },
  {
    code: 'AG3',
    title: 'Creative Effects & Automation',
    marks: 8,
    category: 'Technical Control (30 Marks)',
    color: '#ec4899',
    jumpTab: 'effects',
    summary: 'Assesses how creatively you use studio signal processing (reverb, delay, modulation, distortion, vocoding) and dynamic automation to shape space, movement, and transitions.',
    bands: [
      { level: 'Level 1 (1–2m)', desc: 'Static default plugin inserts with little musical purpose or excessive wet reverb muddying the track.' },
      { level: 'Level 2 (3–4m)', desc: 'Basic static reverb/delay and simple volume fades.' },
      { level: 'Level 3 (5–6m)', desc: 'Purposeful creative effects (chorus, phaser, distortion, delay throws) with clear parameter automation.' },
      { level: 'Level 4 (7–8m)', desc: 'Advanced multi-FX design and intricate automation (reverb blooms, escalating delay feedback, gated reverb, EVOC 20 vocoding, Step FX/Remix FX, bus filter sweeps) driving musical tension and release.' }
    ],
    elementsChecklist: [
      { id: 'ms_ag3_1', text: 'Spatial FX automation: Reverb Bloom send swells & hard drop mutes' },
      { id: 'ms_ag3_2', text: 'Rhythmic Delay throws & automated Delay Feedback escalation (40% -> 90%)' },
      { id: 'ms_ag3_3', text: 'Modulation & Harmonic FX: Chorus, Flanger, Phaser, Overdrive, Bitcrusher' },
      { id: 'ms_ag3_4', text: 'Advanced routing: Gated Reverb (Reverb -> Noise Gate) or EVOC 20 Sidechain Vocoder' },
      { id: 'ms_ag3_5', text: 'Real-time / Sequenced FX automation: Step FX, Remix FX, and AutoFilter bus sweeps' }
    ],
    realWorldExample: 'Example: Automating a ChromaVerb send (+6dB swell) and AutoFilter High-Pass sweep (20Hz to 500Hz) across Bars 29–32, then snapping both off on Bar 33 Beat 1 so the chorus bass drops with maximum contrast.'
  },
  {
    code: 'AG4',
    title: 'Edit & Mix',
    marks: 6,
    category: 'Technical Control (30 Marks)',
    color: '#10b981',
    jumpTab: 'mixing',
    summary: 'Assesses the technical clarity, balance, EQ separation, dynamic control, stereo imaging, noise floor, and final mastering of your stereo WAV bounce.',
    bands: [
      { level: 'Level 1 (1–2m)', desc: 'Unbalanced fader levels, frequency masking/mud, digital clipping, or clicks at region boundaries.' },
      { level: 'Level 2 (3–4m)', desc: 'Generally audible parts with basic EQ and panning, though dynamics or low-end may be uneven.' },
      { level: 'Level 3 (5–6m)', desc: 'Clean, punchy, commercial-grade mix: precise subtractive/additive EQ, controlled dynamics (track/bus/sidechain compression), purposeful stereo field, and distortion-free -14 to -10 LUFS master.' }
    ],
    elementsChecklist: [
      { id: 'ms_ag4_1', text: 'Clean edits: All audio regions trimmed with short crossfades/fades (zero clicks or pops)' },
      { id: 'ms_ag4_2', text: 'Frequency separation: High-pass filters (<80Hz) on non-bass parts & subtractive EQ cuts' },
      { id: 'ms_ag4_3', text: 'Dynamic control: Track compression (4:1), Bus glue compression (2:1), and Kick-to-Bass sidechain' },
      { id: 'ms_ag4_4', text: 'Balanced Stereo Field: Kick/Bass/Lead Vocal centered; complementary synths/percussion panned L/R' },
      { id: 'ms_ag4_5', text: 'Mastering: Adaptive Limiter at -0.1dB ceiling, -14 to -10 LUFS integrated, A/B checked against Stimulus' }
    ],
    realWorldExample: 'Example: High-passing all vocal and synth pad tracks at 100Hz (24dB/oct), sidechain-compressing the Reese bass by 4dB from the Kick drum, and mastering with Adaptive Limiter (-0.1dB ceiling, -12.5 LUFS).'
  },
  {
    code: 'AG5',
    title: 'Response to Brief',
    marks: 6,
    category: 'Musical & Creative Response (30 Marks)',
    color: '#f59e0b',
    jumpTab: 'musicality',
    summary: 'Assesses how convincingly your music, mood, structure, and sound design fulfil the specific Edexcel brief and meet the mandatory 3:00 duration.',
    bands: [
      { level: 'Level 1 (1–2m)', desc: 'Weak connection to the stimulus/brief, unrecognizable text (Brief 2), or significant timing under/over-run.' },
      { level: 'Level 2 (3–4m)', desc: 'Clear use of the brief text/stimulus with appropriate mood and near-accurate duration.' },
      { level: 'Level 3 (5–6m)', desc: 'Imaginative, cohesive interpretation where every sonic and structural choice reinforces the brief\'s meaning, finishing cleanly at 3:00.' }
    ],
    elementsChecklist: [
      { id: 'ms_ag5_1', text: 'Mandatory stimulus/text is clearly recognisable and central to the composition' },
      { id: 'ms_ag5_2', text: 'Sonic palette, synthesis timbres, and effects directly reflect the imagery/theme of the brief' },
      { id: 'ms_ag5_3', text: 'Composition finishes cleanly at exactly 3:00 minutes (with natural reverb decay)' }
    ],
    realWorldExample: 'Example: Using intimate, dry, close-miked whispered vocal samples with narrow panning for "quiet/introspective" verses, contrasting with wide detuned supersaws and gated reverb drums for "expansive/climactic" choruses.'
  },
  {
    code: 'AG6',
    title: 'Style & Coherence',
    marks: 6,
    category: 'Musical & Creative Response (30 Marks)',
    color: '#6366f1',
    jumpTab: 'musicality',
    summary: 'Assesses whether your composition sounds like an authentic, unified piece of music in a recognisable genre/style with smooth transitions and sense of direction.',
    bands: [
      { level: 'Level 1 (1–2m)', desc: 'Pastiche of unrelated loops/ideas that feel disjointed or lack stylistic identity.' },
      { level: 'Level 2 (3–4m)', desc: 'Identifiable style with reasonable flow between sections, though some transitions feel abrupt.' },
      { level: 'Level 3 (5–6m)', desc: 'Compelling, idiomatic production that emulates professional genre conventions (inspired by your stimulus track) with seamless transitions and momentum.' }
    ],
    elementsChecklist: [
      { id: 'ms_ag6_1', text: 'Drum sounds, synth timbres, and tempo match your chosen genre and stimulus track' },
      { id: 'ms_ag6_2', text: 'Transitions between sections use risers, reverse reverb swells, drum fills, or filter sweeps' },
      { id: 'ms_ag6_3', text: 'Recurring motifs or vocal/sample hooks tie contrasting sections together into a unified whole' }
    ],
    realWorldExample: 'Example: Using a recurring 2-bar sliced vocal motif that appears filtered in the intro, full-range in the chorus, and time-stretched to half-speed in the ambient bridge.'
  },
  {
    code: 'AG7–11',
    title: 'Musicality (Best 3 out of 5 Criteria = 18 Marks)',
    marks: 18,
    category: 'Musical & Creative Response (30 Marks)',
    color: '#14b8a6',
    jumpTab: 'musicality',
    summary: 'Assessed across AG7 Melody (6m), AG8 Harmony (6m), AG9 Rhythm (6m), AG10 Texture (6m), and AG11 Form & Structure (6m). The examiner awards marks for all 5 and counts your BEST 3 (max 18 marks).',
    bands: [
      { level: 'Level 1 (1–2m each)', desc: 'Repetitive 1–2 bar ostinatos, basic triads, rigid unvaried quantised beats, static block textures.' },
      { level: 'Level 2 (3–4m each)', desc: 'Developing melodies, functional 4-chord progressions, varied drum patterns, and clear verse/chorus contrast.' },
      { level: 'Level 3 (5–6m each)', desc: 'Sophisticated melodic development/counter-melodies, extended/modal harmonies, intricate rhythmic groove/syncopation, dynamic multi-layered textures, and purposeful macro-form.' }
    ],
    elementsChecklist: [
      { id: 'ms_ag7_1', text: 'AG7 Melody (6m): Main vocal/lead hook + counter-melody + octave/interval variation across sections' },
      { id: 'ms_ag8_1', text: 'AG8 Harmony (6m): Extended chords (min7, maj7, add9, sus4), inversions, pedal notes, or modal shift in bridge' },
      { id: 'ms_ag9_1', text: 'AG9 Rhythm (6m): Syncopation, ghost notes, hi-hat velocity groove, polyrhythms, halftime/double-time feel shifts' },
      { id: 'ms_ag10_1', text: 'AG10 Texture (6m): 6+ distinct parts weaving across sub, low-mid, mid, and high registers with sparse vs dense contrast' },
      { id: 'ms_ag11_1', text: 'AG11 Form & Structure (6m): Well-proportioned 3:00 arc (Intro -> Verse -> Build -> Chorus/Drop -> Bridge/Breakdown -> Climax -> Outro)' }
    ],
    realWorldExample: 'Example: Combining C minor 9th/11th synth pads (Harmony) with a syncopated 16th-note arpeggiator and halftime breakdown beat (Rhythm & Texture) across a 7-section 3-minute arrangement (Form).'
  }
];

export const MUSICALITY_PILLARS = [
  {
    id: 'melody',
    code: 'AG7',
    name: 'Melody',
    marks: 6,
    desc: 'Memorable vocal hooks, lead synth lines, counter-melodies, motif development, and expressive phrasing.',
    detailedTips: [
      'Write a strong primary melodic motif (vocal or lead synth) and develop it across sections using sequence, inversion, or octave doubling.',
      'Introduce a weave/counter-melody in the second verse or final chorus (e.g., an arpeggiated pluck or high string line answering the vocal phrases).',
      'Humanise MIDI lead lines using Pitch Bend, Glide/Portamento, Mod Wheel vibrato, and varied note velocities.'
    ],
    logicExample: 'In Bars 33–48 (Chorus 2), I introduced a counter-melody on Retro Synth (Analog Lead) playing in 6ths and 3rds above the main vocal hook, with a 65ms legato glide and LFO vibrato routed to the Mod Wheel.'
  },
  {
    id: 'harmony',
    code: 'AG8',
    name: 'Harmony',
    marks: 6,
    desc: 'Extended chords (7ths, 9ths, sus), modal shifts, harmonic rhythm, bass/chord relationship, and tonal contrast between sections.',
    detailedTips: [
      'Move beyond basic root-position triads: use 7ths (min7, maj7), 9ths, sus2/sus4 chords, and smooth voice-leading inversions in the Piano Roll.',
      'Create harmonic contrast between sections: e.g., a tense minor or Phrygian 2-chord pedal in the Verse vs. a relative major lift or lush 4-chord progression in the Chorus.',
      'Experiment with harmonic rhythm (e.g., rapid 2-beat chord changes in the pre-chorus vs. sustained 2-bar chords in the breakdown).'
    ],
    logicExample: 'In the Verse (Bars 9–24), the harmony centres on a dark Cm9 – Abmaj7(#11) – Fm9 – G7(b9) progression voiced across Alchemy pads, before shifting to the relative major (Eb major) in the Bridge (Bar 49) to reflect the uplifting shift in the text.'
  },
  {
    id: 'rhythm',
    code: 'AG9',
    name: 'Rhythm',
    marks: 6,
    desc: 'Syncopation, groove, ghost notes, polyrhythms, varied drum programming, tempo/feel shifts, and rhythmic sample slicing.',
    detailedTips: [
      'Avoid copy-pasting the exact same 2-bar drum loop for 3 minutes: program ghost snares, varied hi-hat rolls (1/16, 1/32 triplets), and unique 4-bar/8-bar drum fills.',
      'Use Logic\'s Region Quantize "Q-Swing" (e.g., 54%–62%) and varied MIDI velocities so percussion grooves naturally.',
      'Create dramatic rhythmic contrast by shifting to a Halftime feel in the breakdown or layering a 3-against-4 dotted-8th synth arpeggio against a 4/4 kick pattern.'
    ],
    logicExample: 'In Bars 25–32, I programmed a syncopated UK Garage / breakbeat groove with 58% 16th-note swing, ghost rimshots at velocity 45, and a 1/16th triplet hi-hat roll leading into a halftime snare drop at Bar 49.'
  },
  {
    id: 'texture',
    code: 'AG10',
    name: 'Texture',
    marks: 6,
    desc: 'Layering of parts, density changes (sparse vs dense sections), register separation, counterpoint, and evolving ambient beds.',
    detailedTips: [
      'Ensure you have at least 6 distinct musical layers occupying clear frequency registers: Sub-Bass, Mid Bass/Keys, Harmony Pad, Rhythmic Arp/Guitar, Lead Vocal/Sample, Counter-Melody, and Percussion.',
      'Use dramatic textural drops: strip the arrangement down to just a filtered piano and whispered vocal sample in the breakdown before bringing in the full 12-track wall of sound in the final chorus.',
      'Layer organic recordings with synthesized/sampled elements (e.g., layering a breathy vocal sample with an Alchemy wavetable pad).'
    ],
    logicExample: 'At Bar 41 (Breakdown), the dense 10-track chorus texture drops abruptly to a sparse monophonic/homophonic texture featuring only a reversed vocal bed and sub-bass pulse, before rebuilding layer-by-layer every 2 bars.'
  },
  {
    id: 'form',
    code: 'AG11',
    name: 'Form & Structure',
    marks: 6,
    desc: 'Clear macro-structure (intro, verse, build, drop/chorus, breakdown, outro), pacing, tension/release, and well-crafted transitions.',
    detailedTips: [
      'Map out your entire 3:00 timeline in bars using Logic Arrangement Markers before getting bogged down in micro-details.',
      'Ensure every recurring section (e.g., Verse 2 vs Verse 1, Chorus 2 vs Chorus 1) evolves by adding new percussion, counter-melodies, or FX modulation rather than being a straight copy-paste.',
      'Craft bespoke 2-to-4 bar transition zones (risers, filter sweeps, delay throws, drum dropouts) between every major structural boundary.'
    ],
    logicExample: 'Structured at 120 BPM (90 bars = 3:00 exactly): Intro (Bars 1–8) -> Verse 1 (9–20) -> Pre-Chorus Build (21–24) -> Chorus 1 (25–36) -> Verse 2 with Arp (37–48) -> Breakdown/Bridge (49–60) -> Climax Chorus 2 (61–76) -> Outro fade (77–90).'
  }
];

export const STIMULUS_CHECKLIST = [
  { id: 'stim_1', text: 'Select a professional reference track that embodies the exact genre, mood, and sonic quality you want to achieve.' },
  { id: 'stim_2', text: 'Import your stimulus track onto Track 1 of your Logic Pro X project.' },
  { id: 'stim_3', text: 'Detect the exact tempo (using BPM Counter plugin or Beat Detection) and set your project tempo to match.' },
  { id: 'stim_4', text: 'Trim the start of the stimulus audio region so the first downbeat aligns precisely with Bar 1, Beat 1.' },
  { id: 'stim_5', text: 'Turn the stimulus track volume down to around -6dB (or -8dB) so its mastered loudness does not overpower your work-in-progress mix during A/B comparisons.' },
  { id: 'stim_6', text: 'Create Arrangement Markers along the timeline mapping out the stimulus track\'s structure (Intro, Verse, Pre-Chorus/Build, Chorus/Drop, Breakdown, Outro).' },
  { id: 'stim_7', text: 'Mute/Solo the stimulus track regularly to A/B compare your sub-bass weight, vocal/lead level, drum punch, and stereo width.' }
];

export const SUGGESTED_GENRES = [
  {
    id: 'synthpop',
    icon: '🎹',
    genre: 'Synth-Pop / Electropop / Nu-Disco',
    badge: '⭐ Top Choice for Brief 2 (Song / Text)',
    color: '#38bdf8',
    bpm: '105–126 BPM',
    bestForBriefs: 'Brief 2 (Sung Vocal or Vocoder/Sampled Hook) & Brief 3',
    why: 'Familiar Verse–Pre-Chorus–Chorus–Bridge structures make it effortless to score top marks in Melody (AG7), Harmony (AG8), and Form (AG11) while showcasing rich analog synthesis.',
    ag1Fit: 'Detuned ES2 Supersaw pads, Retro Synth arpeggio plucks, sub-bass layers, and legato lead lines.',
    ag2Fit: 'Sliced vocal hooks in Quick Sampler, Flex Pitch backing harmonies (+3/+7st), and reversed vocal pre-drops.',
    ag3Fit: 'EVOC 20 Vocoder layers, 80s Gated Reverb snares, Chorus stereo widening, and Tape Delay vocal throws.',
    referenceArtists: 'Chvrches, The Weeknd, Dua Lipa, Depeche Mode, Robyn'
  },
  {
    id: 'electronic_ukg',
    icon: '🎧',
    genre: 'Electronic / House / UK Garage / DnB',
    badge: '⭐ Top Choice for Brief 2 & Brief 3',
    color: '#c084fc',
    bpm: '122–135 BPM (House/UKG) or 170–174 BPM (DnB)',
    bestForBriefs: 'Brief 2 (Spoken Word / Chopped Vocal Text) & Brief 3 (Topic/Stimulus)',
    why: 'Built entirely around technology-based production: dramatic filtered build-ups, chopped vocal motifs, deep bass design, and high-impact drops.',
    ag1Fit: 'ES2 Reese bass (detuned saws + sine sub), LFO filter wobbles, white-noise risers, and FM pluck stabs.',
    ag2Fit: 'Transient-sliced spoken-word phrases, chopped breakbeats, pitch-shifted vocal stutters, and found-sound percussion.',
    ag3Fit: 'AutoFilter High-Pass build sweeps, ChromaVerb bloom automation with hard drop-mutes, and Kick-to-Bass sidechain pumping.',
    referenceArtists: 'Fred again.., Disclosure, Bicep, Overmono, Sub Focus'
  },
  {
    id: 'hiphop_triphop',
    icon: '🎤',
    genre: 'Hip-Hop / Trip-Hop / Alternative Trap',
    badge: '⭐ Best for Spoken Word & Rhythmic Text',
    color: '#f472b6',
    bpm: '75–95 BPM (Boom-Bap/Trip-Hop) or 130–145 BPM (Trap)',
    bestForBriefs: 'Brief 2 (Rapped, Spoken Word, or Sampled Set Text)',
    why: 'Perfect if you don\'t have a traditional pop singer—allows clear, rhythmic spoken-word or rapped delivery of the set text over dusty chopped samples and heavy 808s.',
    ag1Fit: '808 sub-bass with pitch envelope and mono legato Glide (Portamento), dark haunting pad beds, and eerie lead synths.',
    ag2Fit: 'Resampled chord loops, vinyl/found-sound textures, halftime stretched audio (Flex Time), and octave-down (-12st) vocal doubles.',
    ag3Fit: 'Bitcrusher lo-fi crunch, Overdrive tape warmth, rhythmic 1/4-note delay throws on final words, and Step FX filter gating.',
    referenceArtists: 'Massive Attack, Portishead, Loyle Carner, Kendrick Lamar, Gorillaz'
  },
  {
    id: 'indie_electronic',
    icon: '🎸',
    genre: 'Alternative / Indie Electronic / Art-Pop',
    badge: '✨ Great for Organic + Electronic Contrast',
    color: '#34d399',
    bpm: '90–118 BPM',
    bestForBriefs: 'Brief 2 (Intimate Vocal Song) & Brief 3 (Atmospheric Theme)',
    why: 'Ideal for contrasting intimate, sparse verses (whispered vocals, acoustic/electric guitar or piano samples) with dense, heavily processed electronic choruses.',
    ag1Fit: 'Alchemy morphing wavetable pads, warm analog bass, and subtle FM bell counter-melodies.',
    ag2Fit: 'Multi-layered organic recordings + manipulated vocal breaths/whispers mapped across the keyboard in Sampler.',
    ag3Fit: 'Extreme dry-vs-wet spatial contrast, Space Designer ambient swells, Tremolo/Phaser movement, and parallel distortion.',
    referenceArtists: 'Billie Eilish, James Blake, Radiohead, FKA twigs, Caroline Polachek'
  },
  {
    id: 'ambient_idm',
    icon: '🌌',
    genre: 'Cinematic Electronica / Downtempo / IDM',
    badge: '🎨 Best for Brief 3 (Conceptual / Theme)',
    color: '#fbbf24',
    bpm: '85–115 BPM',
    bestForBriefs: 'Brief 3 (Topic / Stimulus-Based) or Experimental Brief 2',
    why: 'Rewards deep sound design, evolving textures (AG10), intricate rhythmic programming (AG9), and programmatic storytelling without needing a traditional pop vocal.',
    ag1Fit: 'Deep Alchemy granular/wavetable synthesis, evolving 4-stage ADSR pads, and complex LFO matrix modulation.',
    ag2Fit: 'Extreme Flex Time stretching (Tempophone/Paulstretch style), environmental foley field recordings, and micro-loop glitches.',
    ag3Fit: 'Escalating Tape Delay feedback (40%→90%), sweeping bandpass filters, and wide binaural/stereo panning.',
    referenceArtists: 'Bonobo, Jon Hopkins, Four Tet, Boards of Canada, Rival Consoles'
  },
  {
    id: 'darkwave_midtempo',
    icon: '⚡',
    genre: 'Darkwave / Cyberpunk / Industrial Electro',
    badge: '🔥 High-Impact Sound Design',
    color: '#fb7185',
    bpm: '95–112 BPM',
    bestForBriefs: 'Brief 2 (Dramatic / Dystopian Text) & Brief 3',
    why: 'Dramatic, aggressive, and cinematic—makes aggressive synthesis, distortion, and heavy automation sound completely idiomatic.',
    ag1Fit: 'Aggressive FM metallic basslines (EFM1/ES2), detuned brassy saw leads, and rapid 1/16th arpeggiators.',
    ag2Fit: 'Heavily processed robotic vocal slices, metallic impact samples, and pitch-dropped vocal phrases.',
    ag3Fit: 'Heavy Clip Distortion/Bitcrusher automation, EVOC 20 vocoding, Remix FX stutters, and huge gated drum rooms.',
    referenceArtists: 'Gesaffelstein, Justice, Nine Inch Nails, Grimes, Kavinsky'
  }
];

export const WORKFLOW_PHASES = [
  {
    id: 'phase1',
    phaseNumber: 'Phase 1',
    title: 'Planning & Setup',
    timing: 'Stage 1 (Week 1)',
    color: '#38bdf8',
    summary: 'Lock in your brief (Brief 2 or Brief 3), dissect your professional stimulus track, and set up a clean template in Logic Pro X.',
    tasks: [
      { id: 'p1_t1', label: 'Choose Brief 2 or Brief 3', detail: 'Confirm your chosen brief and read the mandatory stimulus/text requirements carefully.' },
      { id: 'p1_t2', label: 'Select a Professional Stimulus Track', detail: 'Pick a commercial reference track in your target genre with strong production values.' },
      { id: 'p1_t3', label: 'Analyse the Stimulus Track', detail: 'Document its tempo (BPM), key signature, section structure (bars), instrumentation, and key production/FX techniques.' },
      { id: 'p1_t4', label: 'Create & Configure Project in Logic Pro X', detail: 'Set project tempo, sample rate (44.1kHz), arrangement markers, colour-coded track stacks, and stimulus track at -6dB.' },
      { id: 'p1_t5', label: 'Sketch Core Musical Ideas', detail: 'Experiment with initial chord progressions, basslines, melodic motifs, and how your text/theme samples will sit rhythmically.' }
    ]
  },
  {
    id: 'phase2',
    phaseNumber: 'Phase 2',
    title: 'Core Composition & Arrangement',
    timing: 'Stage 2 (Weeks 2–4)',
    color: '#a855f7',
    summary: 'Build the musical backbone of your piece across a full 3-minute arrangement with at least 6 distinct parts and clear section contrast.',
    tasks: [
      { id: 'p2_t1', label: 'Build the Rhythm & Harmonic Foundation', detail: 'Program/record drums & percussion, sub/synth bass, and core harmonic pads or keys.' },
      { id: 'p2_t2', label: 'Integrate Vocals / Set Text / Stimulus Samples', detail: 'Record original vocals/spoken word or import & slice your brief samples (adapting/reordering phrases creatively).' },
      { id: 'p2_t3', label: 'Develop Melodies, Counter-Melodies & Hooks', detail: 'Add lead instruments, arpeggios, or vocal hooks to maximise your best 3 Musicality criteria.' },
      { id: 'p2_t4', label: 'Create Distinct Contrast Between Sections', detail: 'Ensure A/B sections (e.g., sparse vs dense, intimate vs expansive, verse vs drop) have contrasting textures and timbres.' },
      { id: 'p2_t5', label: 'Arrange Full Structure to 3:00 Exactly', detail: 'Map out Intro, Main Sections, Transitions/Breakdowns, and Outro so the composition finishes cleanly at the 3-minute mark.' }
    ]
  },
  {
    id: 'phase3',
    phaseNumber: 'Phase 3',
    title: 'Sound Design, Sampling & Creative FX',
    timing: 'Stage 3 (Weeks 5–6)',
    color: '#ec4899',
    summary: 'Elevate your tracks from presets to bespoke sound design across AG1 (Synthesis), AG2 (Sampling), and AG3 (Creative Effects & Automation).',
    tasks: [
      { id: 'p3_t1', label: 'Apply Synthesis Techniques (AG1 — 8 Marks)', detail: 'Design custom patches using oscillator blending, detuning, filter cutoffs, ADSR envelopes, LFOs, FM, portamento, and wavetables.' },
      { id: 'p3_t2', label: 'Manipulate 6+ Audio Samples (AG2 — 8 Marks)', detail: 'Demonstrate slicing, reversing, Flex Time stretching, pitch shifting, looping/stuttering, bitcrushing, layering, and sampler filtering.' },
      { id: 'p3_t3', label: 'Add Creative Effects & Automation (AG3 — 8 Marks)', detail: 'Automate reverb blooms, delay throws, modulation FX, saturation, Step/Remix FX, filter sweeps, vocoders, and gated reverb.' },
      { id: 'p3_t4', label: 'Document Every Technique & Screenshot as You Go', detail: 'Record exact plugin names, parameter values, bar numbers, and screenshots in your logbook while the project is open.' }
    ]
  },
  {
    id: 'phase4',
    phaseNumber: 'Phase 4',
    title: 'Mixing & Mastering',
    timing: 'Stage 4 (Week 7)',
    color: '#10b981',
    summary: 'Polish the frequency balance, dynamic punch, stereo width, and loudness of your composition for the 6 Edit & Mix marks (AG4).',
    tasks: [
      { id: 'p4_t1', label: 'Balance All Track Fader Levels', detail: 'Mix at low volume first so no element jumps out unnaturally or masks the vocals/lead.' },
      { id: 'p4_t2', label: 'Apply Subtractive & Additive EQ to Every Track', detail: 'High-pass non-bass tracks (<80Hz), cut muddy/harsh frequencies, and carve space for each instrument.' },
      { id: 'p4_t3', label: 'Pan Instruments Across the Stereo Field', detail: 'Keep kick, bass, and lead vocal centered; pan drums naturally and spread complementary harmonies/synths L/R.' },
      { id: 'p4_t4', label: 'Control Dynamics with Track & Bus Compression', detail: 'Use compression (e.g., 4:1 starting ratio) on vocals/drums and bus compression to glue instrument groups together.' },
      { id: 'p4_t5', label: 'Apply Master Bus Processing & Adaptive Limiter', detail: 'Leave 3–6dB mix headroom, then apply subtle master EQ, gentle multiband compression, and a limiter (-0.1dB ceiling, -14 to -10 LUFS).' },
      { id: 'p4_t6', label: 'A/B Reference Against Your Stimulus Track', detail: 'Compare low-end weight, vocal clarity, and overall tonal balance on both studio monitors and headphones.' },
      { id: 'p4_t7', label: 'Verify Exact 3:00 Composition Duration', detail: 'Check that reverb/delay tails fade out cleanly right at 3:00 without abrupt clipping or dead silence.' }
    ]
  },
  {
    id: 'phase5',
    phaseNumber: 'Phase 5',
    title: 'Export, Logbook & Submission',
    timing: 'Stage 5 (Week 8)',
    color: '#f59e0b',
    summary: 'Complete final quality-control checks on your audio bounce, logbook documentation, sample credits, and candidate paperwork.',
    tasks: [
      { id: 'p5_t1', label: 'Bounce as 16-bit / 44.1kHz Stereo .WAV File', detail: 'In Logic Bounce window: File Type = WAVE, Bit Depth = 16-bit, Sample Rate = 44.1 kHz, Format = Interleaved, Normalize = Off.' },
      { id: 'p5_t2', label: 'Name Audio File Using Official Convention', detail: 'Format: 9MT002_centrenumber_candidatenumber_name.wav — listen back to the exported WAV from start to finish!' },
      { id: 'p5_t3', label: 'Complete & Proofread Your Logbook', detail: 'Ensure every synthesis, sampling, FX, and mixing decision includes technical terms, parameter values, and bar numbers.' },
      { id: 'p5_t4', label: 'Verify All Samples & Performers Are Credited', detail: 'List the exact origin/URL of every third-party or AI-generated sample and any live musicians who performed on your track.' },
      { id: 'p5_t5', label: 'Sign Authentication Form & Submit on Time', detail: 'Ensure candidate and teacher signatures are complete before the official Edexcel May deadline.' }
    ]
  }
];

export const TECHNIQUES_BANK = [
  // ==========================================
  // AG1: SYNTHESIS TECHNIQUES (8 EXAMPLES)
  // ==========================================
  {
    id: 'syn_1',
    category: 'synthesis',
    categoryLabel: 'AG1: Synthesis (8 Marks)',
    number: 1,
    title: 'Oscillator Blending & Detuning',
    image: '/C4_Rock_pics/C4_ES2_synth.png',
    imageCaption: 'Logic Pro ES2 — 3-Oscillator Subtractive Synth with Fine Detune & Triangle Mix Pad',
    description: 'Combine multiple oscillator waveforms and slightly detune them in cents (1/100th of a semitone) or octaves to create richer, thicker, phase-animated timbres.',
    whyExaminersLoveIt: 'Shows you understand how fundamental frequencies, overtones, and phase beating interact rather than relying on a single thin waveform or preset.',
    recipes: [
      { name: 'Thick Reese Sub-Bass', settings: 'Osc 1: Sawtooth (0c) + Osc 2: Sawtooth (+9c) + Osc 3: Sine (-12 semitones, 0c) | Unison: On' },
      { name: 'Lush Analog Supersaw Pad', settings: 'Osc 1: Saw (0c) + Osc 2: Saw (-12c) + Osc 3: Pulse (+12c) | Analog knob: 25%' },
      { name: 'Hollow 5th Lead', settings: 'Osc 1: Square (0st) + Osc 2: Saw (+7 semitones, +5c) | Mix: 65% / 35%' }
    ],
    steps: [
      'Open ES2, Retro Synth, or Alchemy on a Software Instrument track and initialise the patch (Recall Default).',
      'Enable 2 or 3 oscillators simultaneously in the Oscillator section.',
      'Select contrasting or complementary waveforms (e.g., Sawtooth for all harmonics + Square/Pulse for hollow odd harmonics + Sine for sub weight).',
      'Detune Oscillator 2 by +5 to +12 cents and Oscillator 3 by -5 to -12 cents to create thick chorus-like phase movement.',
      'Balance the oscillator levels using ES2\'s Triangle Mix pad or Retro Synth\'s Mix slider.'
    ],
    logbookPrompt: 'Document: Which synth plugin, oscillator waveforms chosen, octave/semitone offsets, exact detune values in cents, bar numbers, and sonic purpose.',
    templatePlaceholder: 'In ES2 on the Reese Bass track (Bars 9–24), I enabled all 3 oscillators: Osc 1 & 2 set to Sawtooth waves detuned by +9 cents and -9 cents for thick phase movement, blended with Osc 3 set to a Sine wave pitched down -12 semitones to anchor the sub-bass fundamental.'
  },
  {
    id: 'syn_2',
    category: 'synthesis',
    categoryLabel: 'AG1: Synthesis (8 Marks)',
    number: 2,
    title: 'Filter Cutoff & Resonance Automation',
    image: '/images/subtractive_synth_flow_hq.png',
    imageCaption: 'Subtractive Synthesis Signal Path & Resonant Low-Pass Filter Cutoff Sweep',
    description: 'Automate the synthesizer\'s filter cutoff frequency and resonance over time to create dynamic movement, tension builds, and evolving harmonic textures.',
    whyExaminersLoveIt: 'Demonstrates dynamic real-time control of harmonic content across structural transitions (e.g., opening a dark pad into a bright chorus drop).',
    recipes: [
      { name: '8-Bar Pre-Chorus Build Sweep', settings: '24dB Low-Pass Filter | Cutoff automated 180Hz -> 9.5kHz | Resonance: 45% | Drive: 20%' },
      { name: 'Acid Bassline Sweep', settings: '18dB/24dB TB-style Low-Pass | Cutoff: 250Hz -> 3.2kHz | High Resonance: 70%' },
      { name: 'Intro Band-Pass Reveal', settings: '12dB Band-Pass Filter | Cutoff swept 400Hz -> 4kHz before switching to full range' }
    ],
    steps: [
      'Select a synth with a multi-mode resonant filter (ES2 Dual Filter, Retro Synth, or Alchemy).',
      'Choose a filter mode — Low-Pass (12dB or 24dB/oct) attenuates highs; High-Pass removes lows; Band-Pass isolates a mid band.',
      'Press "A" in Logic\'s Tracks area to open Automation view and select [Synth Name] > Filter 1 Cutoff.',
      'Draw an upward or downward automation curve across your transition or verse/chorus bars.',
      'Increase Resonance (Res) to create a pronounced frequency peak right at the cutoff point as it sweeps.'
    ],
    logbookPrompt: 'Document: Filter type (LP/HP/BP) and slope (12/24dB), cutoff sweep range (Hz or 0.0–1.0), resonance value, and exact bar numbers where automation occurs.',
    templatePlaceholder: 'On the Chord Pad in Retro Synth, I selected a 24dB Lush Low-Pass Filter with Resonance at 42%. Across Bars 17–24 (Pre-Chorus), I automated the Filter Cutoff from 220Hz up to 7.8kHz to progressively unveil upper harmonics and build energy into the chorus.'
  },
  {
    id: 'syn_3',
    category: 'synthesis',
    categoryLabel: 'AG1: Synthesis (8 Marks)',
    number: 3,
    title: 'ADSR Envelope Shaping (Amp & Filter Envelopes)',
    image: '/images/explanation_adsr_envelope.png',
    imageCaption: 'ADSR Envelope Stages: Attack Time, Decay Time, Sustain Level, and Release Time',
    description: 'Sculpt how a sound\'s volume, pitch, or filter brightness evolves from the instant a MIDI key is pressed to after it is released using Attack, Decay, Sustain, and Release.',
    whyExaminersLoveIt: 'Proves you can tailor the transient punch or atmospheric swell of a synth to match its rhythmic role in the arrangement.',
    recipes: [
      { name: 'Snappy Pluck / Arp Synth', settings: 'Attack: 0–5ms | Decay: 160ms | Sustain: 0–10% | Release: 220ms' },
      { name: 'Cinematic Swelling Pad', settings: 'Attack: 850ms | Decay: 1.2s | Sustain: 80% | Release: 1.8s' },
      { name: 'Punchy 808 Sub Bass', settings: 'Amp Env: A 2ms, D 900ms, S 0%, R 150ms + Pitch Env: +12st dropping in 25ms for kick transient' }
    ],
    steps: [
      'Locate the Amplitude Envelope (Env 3 in ES2 / Amp Env in Retro Synth & Alchemy).',
      'Adjust Attack (A): Use a slow attack (400ms–1.5s) for swelling pads, or fast attack (0–5ms) for percussive plucks and basses.',
      'Set Decay (D): Controls how quickly the sound drops from its initial peak down to the Sustain level.',
      'Adjust Sustain (S): Sets the held level while the MIDI note remains pressed (0% for plucks, 70–100% for pads/leads).',
      'Increase Release (R): Controls how smoothly the sound rings out after the MIDI key is released.'
    ],
    logbookPrompt: 'Document: Exact ADSR values (e.g., A: 5ms, D: 180ms, S: 15%, R: 350ms), whether shaping Amplitude, Filter, or Pitch, and the musical articulation achieved.',
    templatePlaceholder: 'To articulate the 16th-note arpeggio in Bars 25–40, I shaped ES2\'s Amplitude Envelope (Env 3) with a fast Attack (2ms), short Decay (145ms), low Sustain (10%), and moderate Release (280ms), ensuring crisp transient separation without muddying the mix.'
  },
  {
    id: 'syn_4',
    category: 'synthesis',
    categoryLabel: 'AG1: Synthesis (8 Marks)',
    number: 4,
    title: 'LFO Modulation (Vibrato, Tremolo, Filter Wobble)',
    image: '/images/lfo_shapes.svg',
    imageCaption: 'LFO Waveforms (Sine, Triangle, Square, Sawtooth, Sample & Hold) for Cyclic Modulation',
    description: 'Use a Low Frequency Oscillator (LFO operating below 20Hz) to cyclically or rhythmically modulate pitch (vibrato), filter cutoff (wobble), or volume (tremolo).',
    whyExaminersLoveIt: 'Routing LFOs via a synthesizer\'s Modulation Matrix (and automating LFO rate or depth) is a hallmark of Level 4 synthesis.',
    recipes: [
      { name: 'Dubstep / DnB Filter Wobble', settings: 'LFO 1 (Triangle) -> Cutoff 1+2 | Rate synced: 1/4 -> 1/8t -> 1/16 automated | Depth: 55%' },
      { name: 'Expressive Lead Vibrato', settings: 'LFO 2 (Sine, 5.5Hz) -> Pitch123 | Controlled via Mod Wheel (CC1) | Depth: 25 cents' },
      { name: 'Rhythmic Sample & Hold Glitch', settings: 'LFO 1 (Random S&H, 1/16 sync) -> Filter Cutoff & Pan | Depth: 40%' }
    ],
    steps: [
      'Enable an LFO module in your synthesizer (LFO 1 or LFO 2 in ES2, Retro Synth, or Alchemy).',
      'Choose an LFO waveform: Sine/Triangle for smooth sweeps, Square for rhythmic on/off gating, Sawtooth for rhythmic plucks, or Random (S&H) for stepped movement.',
      'Route the LFO via the Router/Modulation Matrix: Target = Pitch (Vibrato), Cutoff (Filter Wobble), or Amp (Tremolo).',
      'Set the LFO Rate in Hz (free-running) or tempo-synced to note divisions (e.g., 1/4, 1/8d, 1/16).',
      'Adjust Modulation Depth (or map "Via" to Mod Wheel) and automate the LFO Rate across sections.'
    ],
    logbookPrompt: 'Document: LFO waveform, LFO rate (Hz or tempo division), modulation target in Matrix, depth amount, and where it features in the composition.',
    templatePlaceholder: 'In ES2 on the Breakdown Bass (Bars 49–56), I routed LFO 2 (Triangle wave, tempo-synced) to modulate Filter 1&2 Cutoff with a depth of 48%. I automated the LFO Rate from 1/4 notes to 1/8 triplets in Bar 55 to create a rhythmic wobble fill.'
  },
  {
    id: 'syn_5',
    category: 'synthesis',
    categoryLabel: 'AG1: Synthesis (8 Marks)',
    number: 5,
    title: 'FM (Frequency Modulation) Synthesis & Arpeggiation',
    image: '/C4_EDM_Logic_Pics/C4_EDM_RetroBasssynth.png',
    imageCaption: 'Logic Pro Retro Synth — Oscillator, Filter & Envelope Modulation Controls',
    description: 'Generate complex, metallic, glassy, bell-like, or aggressive harmonic sidebands by modulating one oscillator\'s frequency (Carrier) with another audio-rate oscillator (Modulator).',
    whyExaminersLoveIt: 'Contrasting FM synthesis with analog subtractive synthesis proves breadth of synthesis knowledge for the top 7–8 mark band.',
    recipes: [
      { name: 'Glassy DX Electric Piano / Bell', settings: 'Retro Synth (FM Mode) | Harmonic: 2 or 3 | Inharmonic: 0 | FM Env Decay: 650ms' },
      { name: 'Aggressive Metallic FM Bass', settings: 'Retro Synth (FM Mode) | Harmonic: 1 | FM Amount: 65% | Low-Pass Cutoff: 0.362' },
      { name: 'Busy 16th-Note FM Arpeggio (PDF Exemplar)', settings: 'Retro Synth FM + Logic Arpeggiator MIDI FX (1/16 rate, 2-Octave Up/Down range) + automated FM Intensity' }
    ],
    steps: [
      'Open Retro Synth and click the "FM" tab at the top-left (or open EFM1 / ES2 FM knob).',
      'Adjust the Harmonic and Inharmonic sliders to set the frequency ratio between the Carrier and Modulator.',
      'Increase the FM Amount / Modulation Index slider to generate brighter, more complex harmonic sidebands.',
      'Use the Filter Env and Amp Env to make the metallic FM overtones decay naturally after each note strike.',
      'Optional (High-Mark Exemplar): Add Logic\'s Arpeggiator MIDI FX (1/16 rate, 2-octave range) and automate FM Intensity across bars!'
    ],
    logbookPrompt: 'Document: Synth & FM mode, Carrier/Modulator harmonic ratio, FM Intensity/Index automation, filter cutoff, and any MIDI FX (e.g., Arpeggiator settings).',
    templatePlaceholder: 'In Bars 33–48, I used Retro Synth in FM mode (Harmonic ratio 2, Low-Pass Cutoff at 0.362 to tame harsh highs) driven by Logic\'s Arpeggiator MIDI FX (1/16th rate, 2-octave range). I automated FM Intensity from 0.17 to 0.38 to create an evolving, busy metallic texture.'
  },
  {
    id: 'syn_6',
    category: 'synthesis',
    categoryLabel: 'AG1: Synthesis (8 Marks)',
    number: 6,
    title: 'Pitch Bend & Glide / Portamento',
    image: '/C4_EDM_Logic_Pics/C4_EDM_pitchbend.png',
    imageCaption: 'Logic Pro Piano Roll — MIDI Pitch Bend Automation Curve & Legato Glide Notes',
    description: 'Create expressive vocal-like pitch slides between consecutive notes using Legato Glide (Portamento) or Pitch Bend automation in the Piano Roll.',
    whyExaminersLoveIt: 'Prevents MIDI parts from sounding robotic and demonstrates mastery of MIDI continuous controllers and synth voice modes.',
    recipes: [
      { name: 'Sliding 808 Sub-Bass Glides', settings: 'Voice Mode: Legato | Glide Time: 140ms | Overlapping octave notes in Piano Roll' },
      { name: 'Expressive Synth Lead Hook', settings: 'Voice Mode: Mono | Glide: 65ms | Pitch Bend Range: +/- 2 semitones for blues/vocal bends' },
      { name: '1-Octave Riser / Tape Dive', settings: 'Pitch Bend Range: 12 semitones | Piano Roll Pitch Bend drawn from 0 to +8191 (or -8192)' }
    ],
    steps: [
      'In your synth (ES2, Retro Synth, or Alchemy), switch the Voice Mode from Poly to "Mono" or "Legato".',
      'Increase the Glide / Portamento time control (e.g., 60ms for quick slides, 200ms+ for dramatic sweeps).',
      'In the Piano Roll, slightly overlap the end of one MIDI note with the start of the next note to trigger legato glide.',
      'Set the synth\'s Pitch Bend Range (e.g., 2 semitones for lead expression, or 12 semitones for octave drops/risers).',
      'Open MIDI Automation in the Piano Roll, select "Pitch Bend", and draw or record smooth pitch curves.'
    ],
    logbookPrompt: 'Document: Voice mode (Mono/Legato), Glide/Portamento time (ms), Pitch Bend range (semitones), and exact bar numbers where slides occur.',
    templatePlaceholder: 'On the Lead Synth in ES2 (Bars 25–32), I set the voice mode to Legato with a Glide time of 110ms and overlapped consecutive MIDI notes in the Piano Roll. At Bar 32 Beat 3, I set Pitch Bend range to 12 semitones and drew a downward curve from 0 to -8192 for an octave drop.'
  },
  {
    id: 'syn_7',
    category: 'synthesis',
    categoryLabel: 'AG1: Synthesis (8 Marks)',
    number: 7,
    title: 'Wavetable Synthesis & Morphing',
    image: '/images/Alchemy Synth.png',
    imageCaption: 'Logic Pro Alchemy — Multi-Source Advanced Synthesizer with Wavetable & Morph Pad',
    description: 'Morph smoothly across a table of different single-cycle waveforms to create rich, evolving digital and organic timbres.',
    whyExaminersLoveIt: 'Wavetable modulation (via Alchemy or Retro Synth Table mode) creates complex timbral motion that static oscillators cannot achieve.',
    recipes: [
      { name: 'Evolving Ambient Morph Pad', settings: 'Alchemy (Wavetable mode) | LFO 1 (4-bar cycle) modulating Wavetable Position + X/Y Transform Pad' },
      { name: 'Modern Growl / Mid-Bass', settings: 'Retro Synth (Table Mode) | Envelope routed to Shape/Position | 24dB LP Filter + Chorus' }
    ],
    steps: [
      'Open Alchemy (click "Advanced" tab > File > Initialize Preset) or Retro Synth (select "Table" tab).',
      'In Alchemy Source A, select "Wavetable" or load a multi-spectrum sound source.',
      'Use the Wavetable Position / Shape knob to sweep across different harmonic frames.',
      'Right-click the Wavetable Position knob (or use Alchemy\'s Perform X/Y Pad) and assign an LFO, AHDSR Envelope, or Track Automation so the waveform morphs over time.',
      'Combine with dual filters and stereo unison for deep evolving textures.'
    ],
    logbookPrompt: 'Document: Synth used (Alchemy / Retro Synth Table), wavetable selected, how Wavetable Position/Transform Pad was modulated, and bars.',
    templatePlaceholder: 'In Alchemy (Advanced View) on the Bridge Pad (Bars 49–60), I initialised a patch and loaded a harmonic wavetable on Source A. I routed an AHDSR envelope (Attack 1.5s) and LFO 1 to modulate Wavetable Position and the Perform X/Y pad, creating an evolving timbral shift.'
  },
  {
    id: 'syn_8',
    category: 'synthesis',
    categoryLabel: 'AG1: Synthesis (8 Marks)',
    number: 8,
    title: 'Subtractive Synthesis with Envelope-Modulated Resonant Filter',
    image: '/C4_SPOP_Pics/C4_bass_synth.png',
    imageCaption: 'Logic Pro Synth Bass — Subtractive Waveform + Resonant Filter Envelope Articulation',
    description: 'Start with a harmonically rich waveform and use a dedicated Filter Envelope to dynamically sweep a high-resonance filter on every MIDI note trigger.',
    whyExaminersLoveIt: 'Shows classic analog synth programming (like a Minimoog or Roland TB-303) where the filter envelope shapes the harmonic transient of every note.',
    recipes: [
      { name: '303 Acid Squelch Bass', settings: 'Sawtooth wave | 24dB LP Filter (Cutoff 300Hz, Res 68%) | Filter Env: A 3ms, D 240ms, S 0% | Env Depth: +60%' },
      { name: '80s Synth-Pop Brass Stab', settings: 'Dual Sawtooth (+7c/-7c) | 24dB LP Filter | Filter Env: A 65ms, D 380ms, S 35% for brassy "wah" swell' }
    ],
    steps: [
      'Start with a harmonically rich waveform such as a Sawtooth or Pulse wave.',
      'Engage a Low-Pass or Band-Pass filter with a low initial Cutoff (e.g., 200–400Hz) and high Resonance (50–75%).',
      'Route a dedicated Envelope (Env 2 in ES2 or Filter Env in Retro Synth) to modulate Filter Cutoff.',
      'Set fast Attack (0–15ms), medium Decay (180–350ms), and zero Sustain on the Filter Envelope.',
      'Increase Velocity Sensitivity on the Filter Envelope so harder MIDI notes open the filter brighter than soft ghost notes.'
    ],
    logbookPrompt: 'Document: Initial waveform, filter slope & resonance setting, Filter Envelope ADSR values, velocity sensitivity, and resulting timbre.',
    templatePlaceholder: 'Using subtractive synthesis in ES2 (Bars 9–24), I filtered a Sawtooth wave through a 24dB Low-Pass filter (Cutoff 260Hz, Resonance 62%). I routed Envelope 2 (Attack 8ms, Decay 240ms, Sustain 0%) to Cutoff with Velocity sensitivity enabled so accented notes trigger a resonant squelch.'
  },

  // ==========================================
  // AG2: SAMPLING & AUDIO MANIPULATION (8 EXAMPLES)
  // ==========================================
  {
    id: 'smp_1',
    category: 'sampling',
    categoryLabel: 'AG2: Sampling (8 Marks)',
    number: 1,
    title: 'Sample Slicing & Re-Sequencing with Quick Sampler',
    image: '/C4_SPOP_Pics/C4_Sampler.png',
    imageCaption: 'Logic Pro Quick Sampler / Sampler — Transient Slice Markers Mapped to MIDI Keys',
    description: 'Slice an audio recording (set text phrase, vocal hook, or drum break) into individual transient hits mapped across MIDI keys for creative rhythmic re-sequencing.',
    whyExaminersLoveIt: 'One of the highest-scoring AG2 techniques—especially for Brief 2 (slicing spoken/sung text syllables into rhythmic hooks) and Brief 3.',
    recipes: [
      { name: 'Rhythmic Set-Text Vocal Chop Hook', settings: 'Quick Sampler (Slice Mode: Transient) | Sensitivity: 75% | Polyphony: Mono | Glide: 40ms | Re-sequenced in Piano Roll' },
      { name: 'Sliced Breakbeat Drum Rearrangement', settings: 'Quick Sampler (Slice Mode: Beat Divisions 1/8 or Transient) | Copy MIDI Pattern to track & rearrange snare/kick order' }
    ],
    steps: [
      'Drag your audio region (recorded poem/text phrase or instrumental loop) into the Track Header and choose "Quick Sampler (Optimized)".',
      'Click the "Slice" mode tab at the top of Quick Sampler.',
      'Choose "Transient" or "Beat Divisions" mode and adjust the Sensitivity slider to add or remove yellow slice markers.',
      'Enable "Gate" and add a 5–10ms Fade Out so every slice stops cleanly without clicks.',
      'Drag the "Copy MIDI Pattern" icon into your track (or play notes from C1 upwards on your MIDI keyboard) to re-sequence the slices in a brand-new rhythmic order.'
    ],
    logbookPrompt: 'Document: Original sample source & credit, slicing mode (Transient/Beat), number of slices, MIDI re-sequencing pattern, and bar numbers.',
    templatePlaceholder: 'I imported my recording of the set text phrase (Bars 1–4) into Quick Sampler in Slice Mode (Transient detection, Sensitivity 78%, 14 slices mapped C1–D2). In Bars 25–32, I programmed a syncopated 16th-note MIDI sequence to rhythmically re-order the syllables into a vocal hook.'
  },
  {
    id: 'smp_2',
    category: 'sampling',
    categoryLabel: 'AG2: Sampling (8 Marks)',
    number: 2,
    title: 'Reversing Audio & Reverse Reverb Swells',
    image: '/images/sample_reverse_diagram.svg',
    imageCaption: 'Waveform Polarity & Envelope Inversion When Reversing Audio Regions',
    description: 'Play audio samples or bounced reverb tails backwards to create psychedelic textures, inhaling vocal pre-echoes, and seamless section transitions.',
    whyExaminersLoveIt: 'Builds organic anticipation into structural downbeats (contributing to both AG2 Sampling and AG6 Style & Coherence).',
    recipes: [
      { name: 'Inhaling Reverse-Reverb Vocal Riser', settings: 'Reverse first word of chorus -> Bounce in Place with 3.8s ChromaVerb -> Reverse bounced region -> Align to Bar 1 of Chorus' },
      { name: 'Reversed Cymbal / Piano Chord Swell', settings: 'Audio Region Inspector > Tick "Reverse" + 15ms Fade Out at cut point' }
    ],
    steps: [
      'Select an audio region (or scissor-cut a single vocal word/chord hit) in the Arrangement area.',
      'In the Region Inspector (top-left), expand "More" and tick the "Reverse" checkbox (or press Ctrl+Shift+R).',
      'For a "Reverse Reverb" transition: reverse a vocal word, add a 3–4s reverb, press Ctrl+B (Bounce in Place), and reverse the newly bounced audio region back again!',
      'Slide the reversed reverb tail so its crescendo peaks right on Beat 1 of the new section.',
      'Apply a short fade-out with the Fade Tool so the cut is completely click-free.'
    ],
    logbookPrompt: 'Document: Which sample/vocal was reversed, whether combined with bounced reverb, exact bar placement, and how it aids the transition.',
    templatePlaceholder: 'To transition into Chorus 1 at Bar 25, I isolated the first syllable of the lead vocal, applied a 3.6s ChromaVerb hall tail, bounced it in place (Ctrl+B), and reversed the resulting audio region in the Region Inspector so the vocal pre-echo swells across Bar 24 Beats 1–4.'
  },
  {
    id: 'smp_3',
    category: 'sampling',
    categoryLabel: 'AG2: Sampling (8 Marks)',
    number: 3,
    title: 'Time-Stretching / Tempo Manipulation (Flex Time)',
    image: '/images/time_stretching_hardware.png',
    imageCaption: 'Time-Stretching & Granular Duration Manipulation Without Pitch Alteration',
    description: 'Alter the tempo, timing, or duration of an audio sample independently of its pitch (or deliberately introduce granular/tape artifacts) using Logic\'s Flex Time.',
    whyExaminersLoveIt: 'Shows technical understanding of choosing the right time-stretch algorithm (Polyphonic vs Rhythmic vs Monophonic vs Tempophone).',
    recipes: [
      { name: 'Halftime Stretched Vocal / Pad', settings: 'Flex Time: Polyphonic (Complex ticked) | Option-drag region from 2 bars to 4 bars (50% speed, same pitch)' },
      { name: 'Granular Retro Stretch FX', settings: 'Flex Time: Tempophone (FX) | Grain Size & Crossfade tweaked for metallic time-stretched texture' },
      { name: 'Tape Speed Pitch+Time Drop', settings: 'Flex Time: Speed (FX) | Stretched to lower both pitch and speed simultaneously' }
    ],
    steps: [
      'Select the audio track and press Cmd+F (or click the Flex button in the Tracks toolbar) to reveal Flex Time view.',
      'Select the optimal Flex algorithm on the track header: "Monophonic" for solo vocals/bass, "Rhythmic" or "Slicing" for drums, or "Polyphonic" for chords/complex audio.',
      'For creative sound design, try "Tempophone (FX)" (granular) or "Speed (FX)" (tape varispeed).',
      'Hover over the upper-right edge of the audio region (cursor turns into a bracket with waves) and drag to stretch or compress the entire phrase, or drag individual warp markers.'
    ],
    logbookPrompt: 'Document: Original sample duration/tempo vs new stretched duration, exact Flex Time algorithm used, bar numbers, and sonic result.',
    templatePlaceholder: 'In the Breakdown (Bars 49–56), I enabled Flex Time on the spoken-word sample using the Polyphonic (Complex) algorithm and stretched the 2-bar phrase across 4 bars (50% speed while preserving pitch), creating an ethereal, elongated vocal texture.'
  },
  {
    id: 'smp_4',
    category: 'sampling',
    categoryLabel: 'AG2: Sampling (8 Marks)',
    number: 4,
    title: 'Pitch Shifting, Formant Shifting & Vocal Harmonisation',
    image: '/C4_EDM_Logic_Pics/C4_EDM_pitchshift.png',
    imageCaption: 'Pitch & Formant Shifting in Logic Pro (Region Transpose, Pitch Shifter & Flex Pitch)',
    description: 'Transpose audio samples in semitones/cents or use Flex Pitch & Formant Shifting to build multi-part harmonies and altered vocal characters from a single recording.',
    whyExaminersLoveIt: 'Constructing 3-part harmonies or deep formant-shifted vocal layers from your brief text/sample hits both AG2 (Sampling) and AG8 (Harmony).',
    recipes: [
      { name: 'Deep Monster / Low-Formant Vocal Layer', settings: 'Duplicate vocal -> Region Transpose: -12 semitones | Flex Pitch Formant Shift: -35% | Pan: Center (-6dB under dry vocal)' },
      { name: '3-Part Flex Pitch Vocal Harmony', settings: 'Duplicate lead vocal twice -> In Flex Pitch editor, shift Harmony 1 up a Major/Minor 3rd (+3/+4st) and Harmony 2 up a 5th (+7st)' }
    ],
    steps: [
      'Select the audio region you wish to pitch-shift.',
      'For instant semitone/octave transposition: use the Region Inspector "Transpose" (+/- semitones) and "Fine Tune" (+/- cents) parameters.',
      'For note-by-note harmony creation: duplicate the audio track, enable "Flex Pitch", open the Audio Track Editor, and drag the notes to construct a 3rd or 5th harmony line.',
      'Drag the "Formant Shift" hotspot (bottom-right of each Flex Pitch note beam) or insert Vocal Transformer to alter vocal tract timbre without changing pitch.'
    ],
    logbookPrompt: 'Document: Original sample, exact transposition (+/- semitones or harmonic intervals), Formant Shift settings, and bar numbers.',
    templatePlaceholder: 'In Chorus 1 (Bars 25–36), I duplicated the set text vocal region onto two harmony tracks. Using Flex Pitch, I shifted Track 2 up a minor 3rd (+3 semitones, panned L35) and transposed Track 3 down -12 semitones in the Region Inspector with a -30% formant shift to thicken the hook.'
  },
  {
    id: 'smp_5',
    category: 'sampling',
    categoryLabel: 'AG2: Sampling (8 Marks)',
    number: 5,
    title: 'Sample Looping & Micro-Stuttering (Glitch Edits)',
    image: '/images/sample_stutter_edit_diagram.svg',
    imageCaption: 'Micro-Loop Stutter Regions & Crossfade Loop Boundaries in Sampler',
    description: 'Create rapid rhythmic stutters, buffer repeats, or sustained infinite pads from short sample segments using Sampler loop markers or scissor micro-edits.',
    whyExaminersLoveIt: 'Shows precision editing at the millisecond/16th-note level to create rhythmic fills and sustained instrument tones from short one-shot samples.',
    recipes: [
      { name: 'Ping-Pong Sustained Sample Pad', settings: 'Quick Sampler (Classic Mode) | Loop: Alternate (Ping-Pong) | Crossfade: 25ms for seamless infinite sustain' },
      { name: 'Accelerating 1/32nd Stutter Fill', settings: 'Scissor-cut first 1/16th of vocal word -> Repeat 8x (Cmd+R) -> Transpose each slice +1st higher (-6st to +1st)' }
    ],
    steps: [
      'Load your sample into Quick Sampler (Classic mode) or Sampler.',
      'Enable Loop mode ("Forward", "Reverse", or "Alternate / Ping-Pong" back-and-forth looping).',
      'Drag the yellow Loop Start and Loop End flags close together to create a rapid rhythmic buzz/stutter while a MIDI note is held.',
      'Adjust the Crossfade (X-Fade) parameter to eliminate clicks at the loop turnaround point.',
      'Alternatively, use the Scissors tool in the Tracks area to cut 1/16th or 1/32nd slices of a sample and repeat them (Cmd+R) with rising pitch or panning.'
    ],
    logbookPrompt: 'Document: Sample used, loop start/end points, loop mode (Forward/Alternate), crossfade time (or scissor note division), and bar numbers.',
    templatePlaceholder: 'At Bar 24 Beat 4 (pre-drop fill), I loaded the vocal syllable into Quick Sampler (Classic Mode) with Forward Looping enabled across a narrow 95ms window (5ms crossfade), triggering a rapid rhythmic stutter that accelerates into the chorus.'
  },
  {
    id: 'smp_6',
    category: 'sampling',
    categoryLabel: 'AG2: Sampling (8 Marks)',
    number: 6,
    title: 'Bit Crushing & Sample Rate Reduction (Down-Sampling)',
    image: '/images/quantization_steps.svg',
    imageCaption: 'Bit Depth Quantisation Steps & Sample Rate Reduction Aliasing',
    description: 'Intentionally reduce audio bit depth and sample rate to introduce lo-fi grit, vintage 12-bit hardware sampler crunch (like an E-mu SP-1200 or Akai S950), and digital aliasing harmonics.',
    whyExaminersLoveIt: 'Connects practical sound design directly to A-Level digital audio theory (quantisation distortion and Nyquist aliasing).',
    recipes: [
      { name: '90s Boom-Bap / SP-1200 Drum Crunch', settings: 'Logic Bitcrusher | Resolution: 12-bit | Downsampling: 2x (22.05kHz) | Drive: +3dB' },
      { name: 'Aggressive 8-Bit Glitch Vocal / Synth Chop', settings: 'Logic Bitcrusher | Resolution: 8-bit | Downsampling: 8x | Drive: +6dB | Mix: 60%' }
    ],
    steps: [
      'Insert Logic\'s Bitcrusher plugin (Distortion > Bitcrusher) onto your sample or drum loop track.',
      'Reduce the Resolution (Bit Depth) knob from 24-bit down to 12-bit, 8-bit, or 6-bit to increase quantisation noise and dynamic grit.',
      'Increase the Downsampling factor (e.g., 3x to 12x) to divide the sample rate and create metallic high-frequency aliasing overtones.',
      'Adjust Drive and Clip Level to saturate peaks, and blend with the dry signal using the Mix (%) control.'
    ],
    logbookPrompt: 'Document: Target sample track, Bit Depth resolution (bits), Downsampling factor (x), Drive (dB), Mix %, and the sonic character achieved.',
    templatePlaceholder: 'To contrast the lo-fi Intro (Bars 1–8) with the clean Verse, I processed the drum break sample through Logic\'s Bitcrusher set to 8-bit Resolution, 6x Downsampling, and +4.0dB Drive (Mix 75%), introducing quantisation grit and Nyquist aliasing harmonics.'
  },
  {
    id: 'smp_7',
    category: 'sampling',
    categoryLabel: 'AG2: Sampling (8 Marks)',
    number: 7,
    title: 'Multi-Sample Layering & Key Zone Spanning',
    image: '/images/sample_spanning_keyzones.svg',
    imageCaption: 'Multi-Sample Key Zone Mapping & Velocity Layering Across the MIDI Keyboard',
    description: 'Map multiple distinct samples across specific keyboard zones or velocity layers in Logic\'s multi-zone Sampler to construct a bespoke playable instrument.',
    whyExaminersLoveIt: 'Building your own multi-sampled instrument in Logic\'s Sampler (rather than only using single-sample Quick Sampler instances) is a standout Level 4 technique.',
    recipes: [
      { name: 'Custom Found-Sound / Foley Drum Kit', settings: 'Sampler Mapping View | C1: Sub Kick + Door Slam layer | D1: Snare + Paper Rip layer | F#1–A1: Metallic hits' },
      { name: 'Velocity-Switched Melodic Instrument', settings: 'Keys C2–C5 | Velocity 1–85 triggers soft plucked sample | Velocity 86–127 triggers hard accented sample' }
    ],
    steps: [
      'Open Logic\'s full multi-zone Sampler (Instrument > Sampler) and click the "Mapping" button at the top.',
      'Drag 3 to 6 different audio samples into the Zone mapping editor.',
      'Adjust each zone\'s Key Range (Low Key to High Key) and Root Key so samples span cleanly across the keyboard.',
      'Stack 2+ samples on the exact same key range to layer timbres, or set Velocity Ranges (e.g., 1–85 soft, 86–127 hard) for dynamic velocity switching.',
      'Fine-tune each zone\'s individual tuning, pan, and volume.'
    ],
    logbookPrompt: 'Document: All samples loaded into Sampler, how key ranges and velocity layers were mapped, zone tuning/pan adjustments, and bar numbers.',
    templatePlaceholder: 'In Logic\'s multi-zone Sampler (Bars 9–36), I constructed a custom percussion/melodic patch by mapping 5 recorded samples across C1–C3. On D1, I layered an acoustic snare sample with a pitched metallic hit split by velocity (1–90 soft, 91–127 accented layer).'
  },
  {
    id: 'smp_8',
    category: 'sampling',
    categoryLabel: 'AG2: Sampling (8 Marks)',
    number: 8,
    title: 'Synthesis Shaping on Samples (Sampler ADSR, Filters & Mod Matrix)',
    image: '/images/sample_filtering_diagram.svg',
    imageCaption: 'Shaping Raw Audio Samples Using Subtractive Filter Envelopes & LFOs in Sampler',
    description: 'Transform raw audio recordings or spoken words into unrecognizable, expressive synthesizer-like instruments using Sampler\'s built-in filters, envelopes, and Mod Matrix.',
    whyExaminersLoveIt: 'Bridges AG1 (Synthesis) and AG2 (Sampling) by turning an ordinary recording (e.g., a single spoken vowel from the set text) into a lush playable synth pad or lead.',
    recipes: [
      { name: 'Spoken-Vowel to Lush Ambient Pad', settings: 'Quick Sampler (Single Vowel Loop) | 24dB LP Filter (Cutoff 1.4kHz, Res 35%) | Amp Attack: 600ms, Release: 1.5s | LFO 1 -> Pitch & Pan' },
      { name: 'Plucked Found-Sound Marimba', settings: 'Glass/Wood tap sample | Band-Pass Filter + Fast Filter Env (A 0ms, D 180ms) | Key Tracking: 100%' }
    ],
    steps: [
      'Load a raw audio recording (e.g., a sustained vowel from your set text or an acoustic note) into Quick Sampler or Sampler.',
      'Loop the sustain portion of the waveform smoothly using Forward or Alternate looping with Crossfade.',
      'Enable the Sampler\'s built-in Filter (e.g., 12dB or 24dB Low-Pass/Band-Pass) with Keyscale tracking turned on.',
      'Shape the Filter Envelope and Amplitude ADSR (e.g., 500ms Attack and 1.2s Release to turn a short sample into a swelling pad).',
      'In the Mod Matrix, route LFO 1 to Filter Cutoff and Fine Pitch for organic movement.'
    ],
    logbookPrompt: 'Document: Original raw sample source, loop settings, Sampler Filter mode/cutoff/resonance, Amp & Filter ADSR values, and Mod Matrix routing.',
    templatePlaceholder: 'I isolated a 400ms vowel ("Ah") from my set text recording and loaded it into Quick Sampler (Bars 49–60) with Alternate looping (30ms crossfade). By applying a 24dB Low-Pass Filter (1.1kHz cutoff), a 550ms Amp Attack, and routing LFO 1 to Cutoff, I transformed the voice into a warm playable synth pad.'
  },

  // ==========================================
  // AG3: CREATIVE EFFECTS & AUTOMATION (8 EXAMPLES)
  // ==========================================
  {
    id: 'fx_1',
    category: 'effects',
    categoryLabel: 'AG3: Creative FX (8 Marks)',
    number: 1,
    title: 'Reverb Bloom (Automated Reverb Build & Drop Mute)',
    image: '/images/Space designer picture.png',
    imageCaption: 'Logic Pro Space Designer / ChromaVerb — Automated Aux Send Reverb Swell',
    description: 'Create dramatic spatial builds and wash-out transitions by automating a track\'s Aux Send level into a huge reverb, then snapping it dry on the drop.',
    whyExaminersLoveIt: 'Shows advanced Aux bus routing, automation control, and dramatic use of wet/dry spatial contrast at section boundaries.',
    recipes: [
      { name: '4-Bar Pre-Drop Vocal/Synth Bloom', settings: 'Bus 1: ChromaVerb (Synth Hall, 5.5s Decay) | Send automated -20dB -> +6dB (Bars 21–24) | Aux Mute snapped ON at Bar 25 Beat 1' }
    ],
    steps: [
      'Create an Aux Send Bus (e.g., Bus 1) and insert ChromaVerb (Synth Hall / Bloom algorithm) or Space Designer with a long Decay Time (4.5s–8.0s, 100% Wet).',
      'Place a Channel EQ on the Reverb Aux after the reverb to High-Pass below 200Hz (keeps the swell from muddying the sub-bass).',
      'Open Automation ("A") on your Vocal or Synth track and select "Main > Send 1 (Reverb)".',
      'Draw an upward automation curve across 2 to 4 bars before a transition (rising from -20dB up to +6dB) so the sound washes into a giant cavern.',
      'Automate the Reverb Aux track\'s Mute or Volume to snap shut (-∞ dB) right on Beat 1 of the new section for maximum dry punch!'
    ],
    logbookPrompt: 'Document: Reverb plugin & algorithm, decay time (seconds), automated parameter (Send level or Wet %), dB range, and exact bar numbers.',
    templatePlaceholder: 'Across Bars 21–24 (Pre-Chorus build), I sent the Lead Vocal via Bus 1 to ChromaVerb (Synth Hall, 5.4s decay, HPF at 220Hz). I automated the Bus 1 Send level from -18dB up to +4.5dB to create a spatial reverb bloom, then automated the Aux Mute at Bar 25 Beat 1 for a clean drop.'
  },
  {
    id: 'fx_2',
    category: 'effects',
    categoryLabel: 'AG3: Creative FX (8 Marks)',
    number: 2,
    title: 'Delay Throws & Automated Feedback Escalation',
    image: '/images/Tape delay picture.png',
    imageCaption: 'Logic Pro Tape Delay / Stereo Delay — Tempo-Synced Echo Throws & Feedback Escalation',
    description: 'Spot-automate delay sends ("Delay Throws") on key words of the set text, or escalate Delay Feedback into cascading self-oscillating echoes across transitions.',
    whyExaminersLoveIt: 'Far more musical and sophisticated than leaving a static delay on an entire vocal track.',
    recipes: [
      { name: 'Spot Vocal Word Delay Throw', settings: 'Bus 2: Stereo Delay (L: 1/4, R: 1/8d, Low Cut 300Hz, High Cut 3.2kHz) | Send automated -∞ -> 0dB on final word of phrase only' },
      { name: 'Self-Oscillating Tape Delay Build', settings: 'Logic Tape Delay | Feedback automated 35% -> 92% over 4 bars + Flutter intensity increased, then snapped back to 30%' }
    ],
    steps: [
      'Insert Tape Delay, Stereo Delay, or Delay Designer on an Aux Bus (or track insert).',
      'Sync delay times to project tempo (e.g., 1/4 note or 1/8 dotted) and set the internal Low-Cut (300Hz) and High-Cut (3.5kHz) filters so repeats sit behind the dry vocal.',
      'For a Delay Throw: automate the Bus Send level to spike up ONLY on the last word of a vocal line so that specific word echoes into the gap.',
      'For Feedback Escalation: automate the Delay "Feedback" parameter from 40% up to 85–95% at a bridge/breakdown transition so echoes build into a rhythmic cascade, then automate Feedback back down.'
    ],
    logbookPrompt: 'Document: Delay plugin, note values (L/R), filter settings, Feedback % automation range, and which lyric/phrase triggered the throw (bars).',
    templatePlaceholder: 'In Bar 16 Beat 3, I automated a Delay Throw (Bus 2 -> Tape Delay set to 1/8 dotted with 300Hz–3.2kHz band-limiting) on the key text word. Across Bars 57–60, I automated Tape Delay Feedback from 38% to 90% to create an escalating, saturating echo tail.'
  },
  {
    id: 'fx_3',
    category: 'effects',
    categoryLabel: 'AG3: Creative FX (8 Marks)',
    number: 3,
    title: 'Modulation Effects (Chorus, Flanger, Phaser)',
    image: '/images/Logic\'s Flange Factory.png',
    imageCaption: 'Logic Pro Modulation Effects — Retro Chorus, Flange Factory & Roto Phase',
    description: 'Add lush stereo width, liquid movement, or sweeping comb-filtered phase cancellation using time-based modulation plugins (Chorus, Flanger, Phaser, Tremolo).',
    whyExaminersLoveIt: 'Demonstrates clear understanding of delay-line modulation (Chorus 15–35ms, Flanger 1–10ms comb filtering, Phaser all-pass phase notches).',
    recipes: [
      { name: 'Wide 80s Retro Chorus Pad/Guitar', settings: 'Pedalboard > Retro Chorus (or Chorus) | Rate: 0.8Hz | Intensity/Depth: 45% | Mix: 50%' },
      { name: 'Jet-Plane Drum/Transition Flanger', settings: 'Flange Factory (or Flanger) | Rate synced: 2 Bars | Feedback: 65% | Depth: 70% automated on drum fill' },
      { name: 'Swirling Phaser Electric Piano / Arp', settings: 'Roto Phase (or Phaser) | Order: 8-stage | Rate: 1/2 bar | Feedback: 40%' }
    ],
    steps: [
      'Insert a Modulation plugin (Chorus, Ensemble, Flanger, Phaser, or Pedalboard stompboxes: Retro Chorus, Flange Factory, Roto Phase).',
      'Use Chorus on vocals, guitars, or synth leads to thicken the tone and widen the stereo image.',
      'Use Flanger (short modulated delay with feedback creating harmonic comb-filter notches) on drum fills, guitars, or transition risers.',
      'Use Phaser (all-pass filters creating sweeping phase notches) on pads, keys, or arpeggios.',
      'Sync the Rate to tempo (or set in Hz), adjust Depth and Feedback, and automate Mix % across sections.'
    ],
    logbookPrompt: 'Document: Modulation effect type & plugin, Rate (Hz or note value), Depth/Feedback %, target instrument, and sonic impact.',
    templatePlaceholder: 'On the Synth Pad in the Bridge (Bars 49–60), I inserted Logic\'s Phaser (8-stage mode) with the Rate synced to 1/2 bar, Depth at 65%, and Feedback at 40%, creating a sweeping phase-notch modulation across the stereo field.'
  },
  {
    id: 'fx_4',
    category: 'effects',
    categoryLabel: 'AG3: Creative FX (8 Marks)',
    number: 4,
    title: 'Distortion, Overdrive & Parallel Harmonic Saturation',
    image: '/C4_Rock_pics/C4_Bass_distortion_example.png',
    imageCaption: 'Logic Pro Distortion / Overdrive — Adding Odd & Even Harmonic Saturation',
    description: 'Add warm analog saturation, midrange grit, or aggressive fuzz clipping to basslines, drums, synths, or parallel vocal buses.',
    whyExaminersLoveIt: 'Adding upper harmonics to sub-bass or parallel vocals helps parts cut through dense mixes and adds emotional intensity to climax sections.',
    recipes: [
      { name: 'Warm Sub-Bass Midrange Growl', settings: 'Logic Overdrive | Drive: +7.5dB | Tone: 3.2kHz | Output: -5dB (makes bass audible on small speakers)' },
      { name: 'Parallel Vocal / Drum Crunch Bus', settings: 'Send Vocal/Drums to Aux Bus -> Distortion II (or Pedalboard Candy Fuzz / Happy Face Fuzz) -> HPF 400Hz, LPF 5kHz -> Blend softly under dry track' }
    ],
    steps: [
      'Choose a distortion processor: Overdrive (warm soft-clipping even/odd harmonics), Distortion II (aggressive tube/organ growl), or Phat FX.',
      'For warmth and midrange presence on Bass or Kick: insert Overdrive with 4–8dB Drive and set the Tone low-pass filter around 2.5kHz–4.5kHz.',
      'For aggressive edge on Vocals or Drums without losing transient clarity: place Distortion II or Fuzz on a Parallel Aux Bus and blend it underneath the clean track.',
      'Automate Drive or Aux Send level so the Chorus/Drop sections have noticeably more harmonic grit than the Verses.'
    ],
    logbookPrompt: 'Document: Distortion plugin & type (Overdrive/Fuzz/Tube), Drive (dB), Tone frequency (Hz), insert vs parallel routing, and bars.',
    templatePlaceholder: 'To make the Synth Bass cut through the dense Chorus mix (Bars 25–36), I inserted Logic\'s Overdrive with +8.0dB of Drive and the Tone filter set to 3.4kHz, generating warm upper harmonics without harsh high-end fizz.'
  },
  {
    id: 'fx_5',
    category: 'effects',
    categoryLabel: 'AG3: Creative FX (8 Marks)',
    number: 5,
    title: 'Real-Time Sequenced Multi-FX (Step FX & Remix FX)',
    image: '/C4_EDM_Logic_Pics/C4_EDM_Tremolo.png',
    imageCaption: 'Rhythmic Gating, Step Modulation & Real-Time Multi-FX Automation',
    description: 'Use Logic\'s rhythmic 16-step modulator (Step FX) or performance XY multi-effect (Remix FX) for trance gates, glitch repeats, and vinyl tape-stops.',
    whyExaminersLoveIt: 'Turn static sustained chords or drum loops into intricate rhythmic sequences and dramatic turntable tape-stop transitions.',
    recipes: [
      { name: '16-Step Rhythmic Trance-Gate Pad', settings: 'Step FX on Synth Pad | Step Modulator (1/16 rate, Gate + Filter Cutoff) | Mix automated 0% -> 100% in Pre-Chorus' },
      { name: 'Pre-Drop Turntable Tape-Stop', settings: 'Remix FX on Stereo Out / Drum Bus | Automate "Tape Stop" button & time (1/2 bar) at Bar 24 Beat 3–4' }
    ],
    steps: [
      'Insert Multi Effects > Step FX or Remix FX on an instrument track, group bus, or the Stereo Out.',
      'In Step FX: enable the 16-step sequencer and route it to modulate Gate (rhythmic chopping), Filter Cutoff, and Pan at 1/16th-note resolution.',
      'In Remix FX: use the dual XY pads and buttons to trigger real-time Beat Repeats, Gater, Filter Sweeps, or Turntable Tape-Stop.',
      'Set the track\'s Automation mode to "Latch" or "Touch" to record real-time XY pad movements, or draw the automation lanes directly in the Tracks view.'
    ],
    logbookPrompt: 'Document: Whether Step FX or Remix FX was used, active modules (Step Gate, Tape Stop, Repeater), note division, and exact automated bars.',
    templatePlaceholder: 'On the Sustained Pad in Bars 17–24, I inserted Step FX using a 16-step rhythmic gate and filter modulator synced to 1/16th notes. At Bar 24 Beats 3–4, I automated Remix FX\'s Tape Stop module on the Drum & Synth bus to create a vinyl power-down effect before the chorus.'
  },
  {
    id: 'fx_6',
    category: 'effects',
    categoryLabel: 'AG3: Creative FX (8 Marks)',
    number: 6,
    title: 'Group Bus Filter Sweep Automation (AutoFilter / Channel EQ)',
    image: '/C4_EDM_Logic_Pics/C4_EDM_Snarefilter.png',
    imageCaption: 'Logic Pro Automated Filter Frequency Sweep Across Transition Bars',
    description: 'Automate a resonant Low-Pass or High-Pass filter sweep across an entire Summing Stack (Drums, Synths, or Full Mix) for underwater intros and high-impact drops.',
    whyExaminersLoveIt: 'Sweeping out the sub-bass (High-Pass) for 4 bars before a chorus makes the return of the sub-bass on Beat 1 hit with ten times more perceived power.',
    recipes: [
      { name: 'Underwater Intro Reveal (Low-Pass)', settings: 'AutoFilter (24dB Low-Pass, Res 30%) on Music Bus | Cutoff automated 300Hz -> 20kHz across Bars 1–8' },
      { name: 'Pre-Drop Sub-Bass Removal (High-Pass)', settings: 'Channel EQ / AutoFilter (High-Pass) on Drum+Bass Bus | Automated 20Hz -> 480Hz across Bars 21–24, bypassed at Bar 25' }
    ],
    steps: [
      'Select your related tracks (e.g., all Drums & Bass, or all Synths) and press Cmd+Shift+D to group them into a Summing Track Stack.',
      'Insert Filter > AutoFilter (or Channel EQ) on the Summing Stack bus.',
      'Choose Low-Pass mode (muffles highs for an underwater/distant feel) or High-Pass mode (thins out bass before a drop).',
      'Enable Automation ("A") on the Summing Stack and draw a smooth Cutoff Frequency ramp across 4 or 8 bars.',
      'Automate the Cutoff back to full range (or automate Plugin Bypass) sharply on Beat 1 of the next section.'
    ],
    logbookPrompt: 'Document: Target Summing Bus, plugin (AutoFilter/Channel EQ), filter mode (LP/HP), cutoff sweep range (Hz), resonance, and exact bars.',
    templatePlaceholder: 'On the Drum & Bass Summing Stack across Bars 21–24, I automated an AutoFilter High-Pass Filter sweeping from 20Hz up to 460Hz (Resonance 28%) to strip out the low end during the build, then automated the filter Bypass on Bar 25 Beat 1 so the chorus sub-bass drops with maximum impact.'
  },
  {
    id: 'fx_7',
    category: 'effects',
    categoryLabel: 'AG3: Creative FX (8 Marks)',
    number: 7,
    title: 'Vocoder & Hard Pitch Correction FX (EVOC 20 PS / Pitch Correction)',
    image: '/C4_Rock_pics/C4_Vocoder.png',
    imageCaption: 'Logic Pro EVOC 20 PolySynth Vocoder & Vocal Pitch Correction',
    description: 'Synthesize robotic harmonised vocals by modulating a carrier synth with your vocal sidechain (EVOC 20 PS Vocoder), or apply hard-tuned pitch quantisation.',
    whyExaminersLoveIt: 'A showstopping technique for Brief 2 (turning spoken-word poem lines into lush Daft Punk / Imogen Heap / Bon Iver chord harmonies) while keeping the text 100% intelligible!',
    recipes: [
      { name: 'Polyphonic Chord Vocoder (EVOC 20 PS)', settings: 'EVOC 20 PS (Software Instrument) | Side Chain: Spoken Vocal Track | Signal: Vocoder | Bands: 20 | Play MIDI 7th chords' },
      { name: 'Hard-Tuned Robotic Vocal Lead', settings: 'Pitch > Pitch Correction | Response Time: 0.0ms | Scale: Project Key | Detune: 0c' }
    ],
    steps: [
      'For Vocoder: Create a new Software Instrument track and load "EVOC 20 PolySynth".',
      'In the top-right "Side Chain" dropdown of the EVOC 20 window, select your recorded Vocal/Spoken-Word audio track as the analysis input.',
      'Set the "Signal" selector (right side) to "Vocoder" and play/program sustained MIDI chords on the EVOC track during the bars where the vocal is speaking!',
      'Adjust Bands (16–20 bands for clarity), Formant Shift, and U/V (Unvoiced sibilance) detection so the words remain clearly recognisable.',
      'For Hard Pitch Correction: insert Pitch > Pitch Correction on a vocal track, set Root & Scale, and drag Response Time to 0ms.'
    ],
    logbookPrompt: 'Document: EVOC 20 PS sidechain source track, MIDI chords played, number of filter bands, Formant Shift setting (or Pitch Correction speed), and bars.',
    templatePlaceholder: 'To harmonise the spoken set text in Bars 37–44, I created a Software Instrument track with EVOC 20 PolySynth side-chained to Lead Vocal 1. Playing Cm9 – Fm9 – G7sus4 MIDI chords as the carrier (20 filter bands, Formant Stretch +0.15, U/V level 45%), I turned the speech into robotic chord harmonies.'
  },
  {
    id: 'fx_8',
    category: 'effects',
    categoryLabel: 'AG3: Creative FX (8 Marks)',
    number: 8,
    title: 'Gated Reverb (Non-Linear Explosive Snare / Percussion Ambience)',
    image: '/images/gated_snare_reverb_diagram.png',
    imageCaption: 'Gated Reverb Signal Chain: Drum Send -> Large Reverb -> Sidechained Noise Gate',
    description: 'Place a Noise Gate immediately after a dense reverb on an Aux bus (sidechained to the dry drum) so the massive reverb tail is chopped off abruptly after each hit.',
    whyExaminersLoveIt: 'Demonstrates advanced serial Aux bus routing, sidechain key triggering, and envelope shaping to add huge perceived size without cluttering the mix.',
    recipes: [
      { name: 'Explosive 80s / Synthwave Snare Gate', settings: 'Aux Bus: ChromaVerb (Dense Room, 2.8s Decay, 100% Wet) -> Noise Gate (Sidechain: Dry Snare, Threshold -22dB, Hold 180ms, Release 40ms)' }
    ],
    steps: [
      'Send your Snare, Clap, or Tom track to a dedicated Aux Bus (e.g., Bus 4 at 0dB).',
      'Insert a large, dense Reverb on Bus 4 (ChromaVerb "Dense Room/Hall" or Space Designer with 100% Wet, 0% Dry, and 2.5s–4.0s Decay).',
      'Insert Dynamics > Noise Gate in the plugin slot directly AFTER the Reverb on that same Aux Bus.',
      'Set the Noise Gate\'s top-right "Side Chain" input to listen to the dry Snare track (so the gate opens only when the snare hits, not from reverb bleed).',
      'Adjust Threshold (-25dB to -15dB), Attack (1ms), Hold (140–240ms), and fast Release (25–60ms) so the reverb bursts out then cuts dead to silence.'
    ],
    logbookPrompt: 'Document: Source drum/instrument, Reverb plugin & decay time, Noise Gate Threshold (dB), Hold (ms), Release (ms), and sidechain routing.',
    templatePlaceholder: 'On the Chorus Snare (Bars 25–36), I configured a Gated Reverb on Aux Bus 4 by inserting ChromaVerb (Dense Hall, 3.0s decay, 100% Wet) followed by Logic\'s Noise Gate side-chained to the dry snare track (Threshold -21dB, Attack 2ms, Hold 190ms, Release 45ms), creating a punchy, non-linear ambience.'
  }
];

export const MIXING_GUIDELINES = [
  {
    id: 'mix_eq',
    title: 'EQ (Equalization)',
    icon: '📊',
    color: '#38bdf8',
    image: '/images/Channel EQ.png',
    imageCaption: 'Logic Pro Channel EQ — High-Pass Filtering, Subtractive Cuts & Presence Boosts',
    items: [
      { id: 'eq_1', text: 'Use subtractive EQ first — cut resonant or muddy problem frequencies (200–450Hz) with a narrow Q before boosting.' },
      { id: 'eq_2', text: 'Apply a High-Pass Filter (HPF) below 80–100Hz on non-bass instruments (vocals, guitars, synths, hi-hats) to eliminate low-end rumble and mud.' },
      { id: 'eq_3', text: 'Carve space between Kick and Bass (e.g., boost Kick fundamental at 60Hz and cut 60Hz slightly on the Bass, or boost Bass harmonics at 120–200Hz).' },
      { id: 'eq_4', text: 'Tame harshness in the 2.5kHz–5kHz ear-sensitivity zone on aggressive synths or vocals if they sound piercing.' },
      { id: 'eq_5', text: 'Boost vocal/lead presence gently around 3kHz–5kHz and air above 10kHz (using a High Shelf) for lyric intelligibility.' },
      { id: 'eq_6', text: 'Use Logic Channel EQ\'s built-in Analyzer (Pre/Post) to visually inspect frequency masking across tracks.' }
    ]
  },
  {
    id: 'mix_dyn',
    title: 'Balance, Compression & Dynamics',
    icon: '🎚️',
    color: '#a855f7',
    image: '/images/Platinum Digital Compressor.png',
    imageCaption: 'Logic Pro Compressor — Threshold, Ratio, Attack/Release & Gain Reduction Metering',
    items: [
      { id: 'dyn_1', text: 'Start your mix balance at a low monitoring volume to prevent ear fatigue and accurately judge vocal/drum hierarchy.' },
      { id: 'dyn_2', text: 'Use track faders and region gain first so no single part jumps out unnaturally or gets buried.' },
      { id: 'dyn_3', text: 'Compress individual dynamic tracks (e.g., vocals, live bass, percussion) — a 4:1 ratio with 3–6dB of gain reduction is a solid starting point.' },
      { id: 'dyn_4', text: 'Apply gentle Bus Compression (e.g., Vintage VCA at 2:1 ratio, slow 30ms attack, 1–3dB reduction) on Drum and Vocal groups to glue them together.' },
      { id: 'dyn_5', text: 'Use Sidechain Compression (ducker) on synth bass/pads triggered by the Kick drum so every kick transient punches clearly through the mix.' },
      { id: 'dyn_6', text: 'Leave 3dB to 6dB of headroom on the Stereo Out (peaking around -6dBFS to -3dBFS) before enabling your master limiter.' }
    ]
  },
  {
    id: 'mix_stereo',
    title: 'Stereo Field, Panning & Depth',
    icon: '🎧',
    color: '#ec4899',
    image: '/images/Logic Mixer.png',
    imageCaption: 'Logic Pro Mixer — Stereo Panning, Aux Sends & Summing Track Stacks',
    items: [
      { id: 'st_1', text: 'Keep high-energy low-frequency foundations (Kick Drum, Sub/Synth Bass) and the Lead Vocal panned dead center.' },
      { id: 'st_2', text: 'Pan drum kit elements naturally across the stereo image (hi-hats, toms, and percussion spread slightly L/R as if facing or sitting at the kit).' },
      { id: 'st_3', text: 'Create balanced width by panning complementary parts opposite each other (e.g., Rhythm Synth L30 / Arp Synth R30, or double-tracked backing vocals hard L/R).' },
      { id: 'st_4', text: 'Use shared Reverb and Delay Aux buses (Short Room vs Long Hall) to establish front-to-back spatial depth.' },
      { id: 'st_5', text: 'Avoid extreme hard-panning on solitary main melodic elements without a counterweight on the opposite side.' },
      { id: 'st_6', text: 'Check your mix in Mono (using the Gain plugin\'s "Mono" button on Stereo Out) to ensure phase cancellation doesn\'t make synths or vocals disappear.' }
    ]
  },
  {
    id: 'mix_master',
    title: 'Mastering & Final 16-Bit WAV Bounce',
    icon: '💿',
    color: '#10b981',
    image: '/images/Logic Limiter.png',
    imageCaption: 'Logic Pro Adaptive Limiter & Stereo Out Mastering Chain (-0.1dB Ceiling, -14 to -10 LUFS)',
    items: [
      { id: 'mst_1', text: 'Insert subtle corrective/tonal EQ and gentle Bus/Multiband Compression (Multipressor or Mastering Assistant) on the Stereo Out channel.' },
      { id: 'mst_2', text: 'Place Logic\'s Adaptive Limiter as the very last plugin in the Stereo Out chain.' },
      { id: 'mst_3', text: 'Set the Adaptive Limiter Out Ceiling to -0.1dB (with True Peak Detection On) to guarantee zero digital clipping.' },
      { id: 'mst_4', text: 'Use the Loudness Meter plugin (Metering > Loudness Meter) to aim for an integrated loudness around -14 to -10 LUFS.' },
      { id: 'mst_5', text: 'A/B compare your mastered mix against your attenuated (-6dB) Stimulus Track across studio monitors and headphones.' },
      { id: 'mst_6', text: 'Set your cycle locators to bounce the exact 3:00 duration and export as a 16-bit / 44.1kHz Stereo interleaved .WAV file (Normalize: Off).' }
    ]
  }
];

export const LOGBOOK_REQUIREMENTS = [
  { id: 'lb_1', text: 'Every synthesis technique used, with specific synth names, oscillator waveforms, filter slopes, ADSR & LFO parameter values.' },
  { id: 'lb_2', text: 'Every audio sample used (minimum 6), with its original source/creator clearly credited (including any AI-generated samples).' },
  { id: 'lb_3', text: 'Every sample manipulation technique used (slicing, reversing, Flex Time algorithm, pitch transposition, looping, bitcrushing, key mapping).' },
  { id: 'lb_4', text: 'Every creative effect used, detailing exact plugin settings (decay times, feedback %, rate/depth) and its musical/sonic purpose.' },
  { id: 'lb_5', text: 'All automation curves and real-time control routing, stating which parameters were automated and across which exact bar numbers.' },
  { id: 'lb_6', text: 'How your composition responds to your chosen Brief (Brief 2 set text treatment or Brief 3 thematic sound design) and how your Stimulus Track informed your style.' },
  { id: 'lb_7', text: 'Development of your Best 3 Musicality criteria (e.g., chord progressions, melodic development, rhythmic programming, texture changes, structure).' },
  { id: 'lb_8', text: 'Key mixing & mastering decisions: subtractive/additive EQ frequencies, compression ratios/thresholds, stereo panning, and master limiting.' },
  { id: 'lb_9', text: 'Full credit for any live performers or vocalists who contributed recordings under your direction.' },
  { id: 'lb_10', text: 'Clear annotated screenshots from Logic Pro X showing your synths, samplers, effect chains, and automation lanes with bar numbers/timestamps.' }
];

export const LOGBOOK_WRITING_EXAMPLES = [
  {
    category: 'AG1: Synthesis & Arpeggiator (Exemplar from Guide)',
    weak: '"I used an FM synth with an arpeggiator and changed the filter cutoff to make it sound less harsh."',
    strong: '"Changed the cutoff of the low-pass filter on the Retro Synth (FM mode) to 0.362 to attenuate harsh upper sidebands. The synth is driven by Logic\'s Arpeggiator MIDI FX set to a 2-octave range at a 1/16th-note rate, with FM Intensity automated from 0.173 to 0.378 in Bars 28–32 to create an intense, busy layered texture reflecting the tension in the brief."'
  },
  {
    category: 'AG3: Creative Effects & Automation',
    weak: '"I added reverb to the vocal and automated it in the build-up to make it sound bigger."',
    strong: '"In Bars 16–20 (Pre-Chorus build), I sent the Lead Vocal via Bus 1 to ChromaVerb (Synth Hall algorithm, 3.2s Decay Time, 45ms Pre-delay). I automated the Send level from -18dB to +3dB so the reverb tail blooms dramatically, then muted the Aux return on Bar 21 Beat 1 to create a stark dry contrast for the drop."'
  },
  {
    category: 'AG2: Sampling & Audio Manipulation',
    weak: '"I chopped up a vocal sample in Quick Sampler and pitched it down."',
    strong: '"I recorded the set text phrase (Bars 1–4) and loaded it into Quick Sampler in Slice Mode (Transient detection, 14 slices). In Bars 25–32, I re-sequenced slices C1–G1 into a syncopated 1/16th pattern, duplicated the region onto a second track transposed down -12 semitones using Flex Pitch (Formant shifted -35%), and applied Bitcrusher (8-bit, 5x downsampling) for rhythmic grit."'
  }
];

export const MASTER_CHECKLIST = [
  { id: 'mc_1', category: 'Brief & Planning', text: 'Chosen Brief 2 (Text-Based) or Brief 3 (Topic/Stimulus-Based) and verified mandatory brief rules' },
  { id: 'mc_2', category: 'Brief & Planning', text: 'Selected and analysed a professional Stimulus Track (tempo, key, structure, production)' },
  { id: 'mc_3', category: 'Brief & Planning', text: 'Configured Logic Pro X project with matching tempo, arrangement markers, and stimulus at -6dB' },
  { id: 'mc_4', category: 'Composition Rules', text: 'Composition duration is EXACTLY 3:00 minutes (no abrupt cut-offs or excessive trailing silence)' },
  { id: 'mc_5', category: 'Composition Rules', text: 'Minimum of 6 distinct parts used (vocal, instrumental, and sample-based parts)' },
  { id: 'mc_6', category: 'Composition Rules', text: 'Set text (Brief 2) is clearly recognisable OR Brief 3 stimulus/theme is unmistakably realised' },
  { id: 'mc_7', category: 'Composition Rules', text: 'Strong focus on at least 3 of the 5 Musicality criteria (Melody, Harmony, Rhythm, Texture, Form & Structure)' },
  { id: 'mc_8', category: 'Sound Design & Tech', text: 'Demonstrated a wide variety of original Synthesis techniques (AG1 — Oscillator detuning, Filters, ADSR, LFO, FM, Glide, Wavetables)' },
  { id: 'mc_9', category: 'Sound Design & Tech', text: 'Used 6+ Samples with diverse Audio Manipulation techniques (AG2 — Slicing, Reversing, Flex Time, Pitch Shifting, Looping, Bitcrushing, Layering)' },
  { id: 'mc_10', category: 'Sound Design & Tech', text: 'Applied Creative Effects & detailed Automation (AG3 — Reverb blooms, Delay throws, Modulation FX, Distortion, Step/Remix FX, Filter sweeps, Vocoder, Gated Reverb)' },
  { id: 'mc_11', category: 'Mix & Master', text: 'Professionally mixed across all tracks (Subtractive/Additive EQ, Fader balance, Track & Bus Compression, Stereo Panning, Mono check)' },
  { id: 'mc_12', category: 'Mix & Master', text: 'Mastered with Adaptive Limiter (-0.1dB ceiling, -14 to -10 LUFS integrated) and A/B checked against Stimulus Track' },
  { id: 'mc_13', category: 'Logbook & Submission', text: 'Documented every synthesis, sampling, FX, and mix technique in Logbook using precise technical language, bar numbers, and screenshots' },
  { id: 'mc_14', category: 'Logbook & Submission', text: 'Credited ALL samples (including Freesound/Splice/AI-generated sources) and any contributing performers in Logbook' },
  { id: 'mc_15', category: 'Logbook & Submission', text: 'Exported final audio as 16-bit / 44.1kHz Stereo interleaved .WAV file (Normalize: Off)' },
  { id: 'mc_16', category: 'Logbook & Submission', text: 'Named audio file correctly: 9MT002_centrenumber_candidatenumber_name.wav and listened back in full' },
  { id: 'mc_17', category: 'Logbook & Submission', text: 'Logbook proofread, Authentication Form signed, and submitted ahead of the May deadline' }
];

export const RESOURCE_LINKS = [
  {
    group: 'MusicTechGuru Video Tutorials & Topics',
    icon: '🎬',
    items: [
      'Logic Pro X Synthesis Masterclass (ES2, Retro Synth & Alchemy)',
      'Sampling & Audio Manipulation Techniques in Quick Sampler & Flex Time',
      'Creative Effects, Sidechaining & Automation Workflows',
      'Mixing & Mastering A-Level Coursework in Logic Pro X',
      'High-Scoring Logbook Writing & Technical Documentation',
      'A-Level Music Tech Component 2 Exemplar Walkthroughs'
    ]
  },
  {
    group: 'Sample Sources & Production Websites',
    icon: '🌐',
    items: [
      'Freesound.org — Free Creative Commons sound effects & field recordings (always credit the creator URL in your logbook!)',
      'Splice.com — Professional royalty-free sample library (credit pack & file name in logbook)',
      'YouTube Audio Library / BBC Sound Effects — Royalty-free sound effects & atmospheres',
      'Sound on Sound (soundonsound.com) — In-depth synthesis, mixing, and production articles',
      'LANDR Blog — Practical guides on EQ, compression, LUFS mastering, and arrangement'
    ]
  },
  {
    group: 'Recommended Reading & Official Guides',
    icon: '📚',
    items: [
      'Logic Pro User Guide (Help > Logic Pro Help) — Complete reference for Instruments & Effects',
      'Mixing Secrets for the Small Studio — Mike Senior',
      'The Computer Music Tutorial — Curtis Roads',
      'Electronic Music Production Techniques — Richard Coxe',
      'The Art of Digital Music — David Battino'
    ]
  }
];
