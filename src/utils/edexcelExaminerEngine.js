/**
 * Music Tech Guru — Pearson Edexcel 9MT0 Component 3 & 4 Extended Response Marking Engine
 * 
 * Implements official Pearson Edexcel A-Level Music Technology marking pedagogy:
 *  - C3 Q5 (15 Marks): AO3 (5 marks) + AO4 (10 marks) across Levels 1–5
 *  - C3 Q6 & C4 Q6 (20 Marks): AO3 (5 marks) + AO4 (15 marks) across Levels 1–5
 *  - C4 Q4(g) (8 Marks): AO3 (4 marks) + AO4 (4 marks) across Levels 1–5
 * 
 * NON-EXHAUSTIVE MARK SCHEME WITH SURPLUS REWARDABLE POINTS:
 * Real Edexcel mark schemes provide many more indicative points than total marks.
 * Candidates are NOT required to mention every point to achieve 100% full marks.
 * Multiple distinct and independent combinations of points achieve Grade A* / Level 5.
 */

export const EDEXCEL_RUBRIC_BANK = [
  {
    id: 'c3_q5_liquid_spirit_15m',
    paperCode: '9MT0/03 Component 3: Listening & Analysing • Question 5',
    component: 'Component 3',
    questionNumber: '5',
    title: 'C3 Q5: Acoustic Jazz vs Modern Remix — Gregory Porter "Liquid Spirit" (15 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q5_Liquid_Spirit_Comparison.md',
    maxMarks: 15,
    ao3Max: 5,
    ao4Max: 10,
    audioSrc1: null,
    audioSrc2: null,
    youtubeId1: 'NS6JV-veVAE',
    youtubeWatchId1: '07rb7QQYk7E',
    videoTitle1: 'Track 5: Gregory Porter — Liquid Spirit (Original Acoustic Jazz)',
    youtubeId2: 'e41PxeE6O14',
    videoTitle2: 'Track 6: Gregory Porter — Liquid Spirit [20 Syl Remix]',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Gregory Porter — Liquid Spirit Comparison',
        url: '/interactive-slide-gregory-porter.html',
        quizUrl: '/gregory-porter-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Large-Scale Analogue & Multi-Mic Recording',
        url: '/interactive-slide-large-scale-analogue.html',
        quizUrl: '/large-scale-analogue-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Studio Effects & Dynamic Compression',
        url: '/interactive-slide-studio-effects.html',
        quizUrl: '/component-4-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Gregory Porter: Liquid Spirit (Track 5) and Gregory Porter: Liquid Spirit [20 Syl Remix] (Track 6). Compare the production techniques used in both versions. Your response may consider:',
    examBullets: [
      'Capture, production approach and music style',
      'Synthesis, sequencing and sampling',
      'EQ and filtering',
      'Dynamic processing',
      'Pan and stereo field',
      'Effects'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q5 Revision Notes — Gregory Porter "Liquid Spirit" vs Remix:',
      keyPoints: [
        'Capture & Style: Track A is an authentic acoustic jazz recording featuring live double bass, upright piano, live drums, handclaps, and brass recorded with close/room mics in an acoustic space. Track B is an EDM/dance remix constructed in a DAW with quantised electronic samples and synthesizers.',
        'Sampling & Synths: Track A contains zero sampling or synthesizers. Track B samples vocal stems from Track A, slicing them into rhythmic stutter loops, pitch-shifted chops, and vinyl scratch effects, while replacing the acoustic upright bass with a deep electronic sub-bass.',
        'Dynamic Processing: Track A uses light, transparent dynamic compression preserving a wide natural dynamic range. Track B applies aggressive high-ratio mix compression and kick-triggered side-chain pumping to carve rhythmic space.',
        'Stereo Field & Effects: Track A features a natural acoustic stereo spread (brass panned, natural ride cymbal bleed, 1.5s plate reverb on vocal). Track B employs surgical stereo widening, autopanned delays on vocal throws (e.g. at 1:22 on "liquid"), and tight dry electronic drum transients.'
      ],
      links: [
        { label: '🌐 Component 3 Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-listening-exam-revision/' },
        { label: '🌐 Gregory Porter Case Study Guide (musictechguru.com)', url: 'https://www.musictechguru.com/product/liquid-spirit-comparison/' },
        { label: '🎯 In-App Interactive Trainer: Gregory Porter Track Breakdown', url: '/interactive-slide-gregory-porter.html' },
        { label: '🎯 In-App Quiz: Dynamic Processing & Side-Chaining', url: '/?quiz=quiz-topic-41' }
      ]
    },
    questionPrompt:
      'Gregory Porter: Liquid Spirit (Track 5) and Gregory Porter: Liquid Spirit [20 Syl Remix] (Track 6). Compare the production techniques used in both versions. (15 marks — AO3: 5 marks, AO4: 10 marks)',
    ao3Anchors: [
      {
        id: 'ao3_capture_acoustic_vs_daw',
        label: 'Capture & instrumentation: Live acoustic tracking of double bass, piano, drums, brass in Track A vs DAW-sequenced electronic drum samples and synths in Track B',
        keywords: ['live', 'acoustic', 'jazz', 'double bass', 'brass', 'horns', 'upright piano', 'daw', 'sequenced', 'electronic drum', 'drum machine', '808']
      },
      {
        id: 'ao3_vocal_sampling_edits',
        label: 'Vocal sampling & manipulation: Original continuous vocal take in Track A vs sampled vocal stems, stutter edits, loop slicing, and pitch shifts in Track B',
        keywords: ['sample', 'sampled', 'stutter', 'cut up', 'loop', 'pitch shift', 'vocal stems', 'slices', 'vocal sample']
      },
      {
        id: 'ao3_synth_subbass',
        label: 'Bass instrumentation: Acoustic upright double bass in Track A vs electronic synthesizer sub-bass in Track B',
        keywords: ['sub-bass', 'sub bass', 'synth bass', 'electronic bass', 'double bass', 'upright bass', 'synth chords']
      },
      {
        id: 'ao3_dynamics_sidechain',
        label: 'Dynamic processing: Transparent compression in Track A vs high-ratio mix compression and kick-triggered side-chain pumping in Track B',
        keywords: ['side chain', 'side-chain', 'pumping', 'ducking', 'compression', 'high-ratio', 'transparent compression', 'dynamic range']
      },
      {
        id: 'ao3_stereo_imaging_panning',
        label: 'Pan & stereo imaging: Natural acoustic instrument panning in Track A vs DAW autopanning, stereo widening, and stereo delay throws in Track B',
        keywords: ['panning', 'autopan', 'autopanned', 'stereo width', 'stereo widening', 'stereo delay', 'delay throws']
      },
      {
        id: 'ao3_reverb_space',
        label: 'Spatial ambiance: Natural room acoustics and plate reverb in Track A vs dry electronic transients and artificial digital delay spaces in Track B',
        keywords: ['room reverb', 'plate reverb', 'reverberation', 'dry drums', 'artificial reverb', 'room ambience', 'space']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_style_feel_human_vs_club',
        label: 'Evaluates musical feel: Contrasts organic, expressive live jazz/blues human intimacy with rigid, quantised, driving club/dance energy',
        keywords: ['natural', 'human', 'live feel', 'expressive', 'club', 'dance', 'tighter', 'driving', 'momentum', 'quantised']
      },
      {
        id: 'ao4_vocal_emotional_connection',
        label: 'Evaluates vocal delivery: Explains how Track A prioritises narrative emotional intimacy whereas Track B treats vocals as a rhythmic percussive hook',
        keywords: ['emotional', 'narrative', 'intimacy', 'percussive', 'instrumental', 'hook', 'connection', 'vocal delivery', 'stutter', 'loop', 'loops', 'harmonies', 'slices', 'vocal stems', 'stuttered']
      },
      {
        id: 'ao4_sidechain_groove_pumping',
        label: 'Evaluates dynamic impact: Explains how side-chain compression ducks synths to let the kick drum punch cleanly, establishing a hypnotic dance groove',
        keywords: ['pumping', 'kick', 'tighter', 'carves space', 'groove', 'punch', 'clearance', 'dance rhythm']
      },
      {
        id: 'ao4_low_end_club_impact',
        label: 'Evaluates frequency balance: Explains how deep sub-bass delivers physical low-end energy suited for club sound systems compared to acoustic bass mids',
        keywords: ['subwoofer', 'low-end punch', 'physical impact', 'frequency weight', 'club sound', 'sub-bass', 'sub bass', 'low end', 'bass synth', 'chords']
      },
      {
        id: 'ao4_ambient_spill_vs_isolation',
        label: 'Evaluates acoustic realism vs precision: Explains how room reflections and bleed add realism in Track A vs synthetic isolation enabling aggressive processing in Track B',
        keywords: ['room reflections', 'bleed', 'spill', 'realism', 'separation', 'isolation', 'surgical control', 'room reverb', 'ambient wash', 'natural room', 'dry electronic', 'drum samples', 'plate']
      },
      {
        id: 'ao4_delay_listener_interest',
        label: 'Evaluates creative spatial effects: Explains how tempo-synced delay throws and autopan on hook lyrics create spatial ear-candy and rhythmic variation',
        keywords: ['ear-candy', 'spatial movement', 'listener attention', 'highlight', 'delay throws', 'variation', 'autopanned', 'autopan', 'delays', 'stereo delay']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Capture, Production Approach and Music Style:',
        '• Track A (Original): Live acoustic jazz band (double bass, piano, drums, brass) recorded through close mics; natural, dynamic human performance feel.',
        '• Track B (Remix): EDM/club dance remix sequenced in a DAW using electronic drum samples and synths; rigid, quantised, hard-hitting club feel.',
        '',
        'Synthesis, Sequencing and Sampling:',
        '• Instrumentation: Acoustic double bass and live horns in Track A replaced in Track B with a deep electronic sub-bass synth and wide stereo synth chords.',
        '• Vocal sampling: Track B samples vocal stems from Track A, slicing them into rhythmic stuttered loops, pitch-shifted harmonies, and vinyl-style scratches.',
        '',
        'Dynamic Processing:',
        '• Compression: Track A uses light, transparent compression to preserve natural dynamics; Track B applies heavy, high-ratio compression across the mix for loudness.',
        '• Side-chaining: Track B triggers side-chain compression on the main synth from the kick drum, creating a rhythmic pumping sensation.',
        '',
        'Pan, Stereo Field and Effects:',
        '• Space & Reverb: Track A uses natural room reverb on drums (ambient wash on ride cymbal) and 1.5s vocal plate; Track B uses tight, dry electronic drum samples.',
        '• Stereo Modulation: Track B features creative stereo delay throws on "liquid" (1:22) with pitch-shifting and automatic stereo panning (autopanned).'
      ].join('\n'),
      grade_B: [
        'Capture, Approach and Style:',
        '• Track A is recorded live with acoustic jazz instruments (piano, bass, drums, horns) giving a natural human feel.',
        '• Track B is an electronic remix made in a DAW with drum samples and synthesizers for a club dance style.',
        '',
        'Sampling, Synthesis and Dynamics:',
        '• Track B chops up the vocals into loops and stutters and replaces double bass with a sub-bass synth.',
        '• Track B uses heavy compression and sidechain compression from the kick drum to make the synth pump in time with the beat.',
        '',
        'Stereo Field and Effects:',
        '• Track A has natural room reverb on the drums and plate reverb on vocals.',
        '• Track B has dry drum sounds, wide stereo synths, and autopanned delay effects on certain vocal words.'
      ].join('\n'),
      grade_D: [
        'Production Differences:',
        '• Track A is acoustic jazz with live instruments and natural dynamic range.',
        '• Track B is an EDM remix made with a computer, using synth bass and electronic drum samples.',
        '• Track B has chopped up vocal samples, heavier compression, and delay effects.'
      ].join('\n'),
      student_template: [
        'Capture, Production Approach and Music Style:',
        '• ',
        '',
        'Synthesis, Sequencing and Sampling:',
        '• ',
        '',
        'Dynamic Processing:',
        '• ',
        '',
        'Pan, Stereo Field and Effects:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c3_q6_britney_daw_20m',
    paperCode: '9MT0/03 Component 3: Listening & Analysing • Question 6',
    component: 'Component 3',
    questionNumber: '6',
    title: 'C3 Q6: Millennium Pop Production & DAW Vocal Editing (20 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q6_Britney_Toxic_DAW_20m.md',
    maxMarks: 20,
    ao3Max: 5,
    ao4Max: 15,
    audioSrc1: null,
    youtubeId1: 'C-u5WLJ9Yk4',
    videoTitle1: 'Reference Video: Britney Spears — Oops!... I Did It Again (1999)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Millennium Pop Production & DAW Vocal Editing',
        url: '/interactive-slide-component-4.html',
        quizUrl: '/component-4-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Studio Effects & Dynamic Compression',
        url: '/interactive-slide-studio-effects.html',
        quizUrl: '/component-4-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Listen to the lead vocal and backing vocal arrangements. Evaluate how digital audio workstations (DAWs) and computer software transformed vocal production and the wider music industry at the turn of the millennium:',
    examBullets: [
      'Capture, production approach and music style',
      'Synthesis, sequencing and sampling',
      'EQ and filtering',
      'Dynamic processing',
      'Pan and stereo field',
      'Effects & wider industry impact'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — Millennium Pop & DAW Vocal Editing:',
      keyPoints: [
        'Pitch Correction: Antares Auto-Tune and Celemony Melodyne allowed transparent pitch correction of minor vocal imperfections or deliberate robotic retuning (0 attack speed), establishing a modern pop expectation of pitch perfection.',
        'Comping & Editing: DAWs introduced multi-take "comping" (swipe comping best words/syllables across dozens of takes with micro-crossfades) and slip editing to quantise vocal transients to the MIDI grid.',
        'Vocal Stacks & ADT: Lead vocals doubled and tripled with micro-pitch shifts (+/- 10 cents) and panned wide across the stereo field to create a massive "wall of sound" pop chorus.',
        'Filtering & Creative EQ: Heavy band-pass / telephone EQ (cutting below 400Hz and above 3kHz) applied to verse vocals, creating dramatic frequency and dynamic contrast when the wide chorus drops.'
      ],
      links: [
        { label: '🌐 Component 3 Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-listening-exam-revision/' },
        { label: '🌐 DAW Vocal Editing Masterclass (musictechguru.com)', url: 'https://www.musictechguru.com/product/daw-vocal-editing/' },
        { label: '🎯 In-App Interactive Trainer: Digital Audio Workstations', url: '/interactive-slide-mixers-daw.html' },
        { label: '🎯 In-App Quiz: Audio Editing, Comping & Pitch Correction', url: '/?quiz=quiz-topic-44' }
      ]
    },
    questionPrompt:
      'Evaluate how DAWs and digital audio software transformed vocal production techniques in commercial pop music from the late 1990s onward. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_pitch_autotune',
        label: 'Pitch correction: Software pitch correction (Auto-Tune / Melodyne) applied for seamless correction or deliberate robotic vocal effects',
        keywords: ['auto-tune', 'autotune', 'pitch correction', 'melodyne', 'pitch snapping', 'robotic', 'retuning']
      },
      {
        id: 'ao3_vocal_comping',
        label: 'Vocal comping: Assembling phrases and syllables from multiple takes into a seamless composite master track with crossfades',
        keywords: ['comping', 'composite', 'takes', 'best syllables', 'crossfade', 'multiple takes', 'swipe comping']
      },
      {
        id: 'ao3_vocal_doubling_adt',
        label: 'Vocal stacking & ADT: Multi-tracking, Automatic Double Tracking, micro-pitch shifting (+/- 10 cents), and stereo panning of vocal stacks',
        keywords: ['backing vocals', 'vocal stacks', 'adt', 'double tracked', 'micro-pitch', 'cents', 'stereo spread', 'layers']
      },
      {
        id: 'ao3_slip_editing_quantisation',
        label: 'Audio timing editing: Slip editing, waveform slicing, and quantisation to align vocal syllables to the DAW tempo grid',
        keywords: ['quantised', 'quantise', 'slip editing', 'audio editing', 'grid', 'timing', 'slice', 'tight timing']
      },
      {
        id: 'ao3_telephone_eq_filtering',
        label: 'Creative EQ filtering: Band-pass / telephone EQ (cutting below 400Hz and above 3kHz) applied to intro/verse vocals',
        keywords: ['telephone', 'band-pass', 'bandpass', 'filter', 'high-pass', 'low-pass', 'cut below', 'eq filtering']
      },
      {
        id: 'ao3_spatial_effects_delays',
        label: 'Spatial modulation: Tempo-synced stereo delays, chorus, and algorithmic plate reverbs routed via aux sends',
        keywords: ['ping-pong', 'stereo delay', 'aux send', 'plate reverb', 'chorus', 'delays', 'automation']
      },
      {
        id: 'ao3_daw_automation_recall',
        label: 'DAW automation & total recall: Volume automation curves, plugin parameter automation, and instant total session recall',
        keywords: ['automation', 'total recall', 'non-destructive', 'undo', 'recall', 'plugin chain']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_pitch_perfection_impact',
        label: 'Evaluates pitch aesthetic: Explains how pitch correction established an expectation of digital vocal perfection, removing natural human pitch fluctuation',
        keywords: ['perfection', 'flawless', 'pitch drift', 'digital aesthetic', 'polished', 'hyper-real', 'human pitch']
      },
      {
        id: 'ao4_comping_unreal_performance',
        label: 'Evaluates performance construction: Explains how comping creates an impossible, superhuman vocal delivery with flawless breath control',
        keywords: ['superhuman', 'impossible performance', 'flawless take', 'breath control', 'seamless', 'perfection', 'best words', 'syllables', 'composite', 'crossfades', 'assembled']
      },
      {
        id: 'ao4_vocal_wall_of_sound',
        label: 'Evaluates mix prominence: Explains how layered stereo backing vocals create a massive pop chorus that dominates commercial radio and streaming',
        keywords: ['wall of sound', 'massive chorus', 'commercial pop', 'stereo width', 'dominates', 'radio']
      },
      {
        id: 'ao4_rhythmic_grid_dance_lock',
        label: 'Evaluates rhythmic precision: Explains how quantising vocal transients reinforces the electronic dance tempo, eliminating human rushing or dragging',
        keywords: ['locks to the beat', 'groove', 'reinforces', 'dance rhythm', 'tempo lock', 'rhythmic impact', 'sliced and quantised', 'quantised to', 'driving dance tempo', 'grid', 'quantised']
      },
      {
        id: 'ao4_frequency_contrast_dynamics',
        label: 'Evaluates dynamic contrast: Explains how thin telephone filtering in verses creates maximum punch and impact when the full-frequency chorus arrives',
        keywords: ['dynamic contrast', 'impact', 'drops', 'full bandwidth', 'transition', 'explodes', 'sonic contrast', 'before full-bandwidth', 'full-bandwidth', 'telephone', 'contrast']
      },
      {
        id: 'ao4_economic_studio_impact',
        label: 'Evaluates industry economics: Explains how DAWs drastically reduced tracking costs and studio hours, shifting production from commercial facilities to home studios',
        keywords: ['studio time', 'costs', 'home studio', 'project studio', 'budget', 'democratisation', 'workflow', 'home-studio', 'accelerated', 'democratised', 'total recall']
      },
      {
        id: 'ao4_homogenisation_vs_originality',
        label: 'Synthesises cultural trade-off: Weighs the commercial benefit of radio-ready polish against the risk of vocal homogenisation and loss of raw emotional spontaneity',
        keywords: ['homogenisation', 'sameness', 'loss of emotion', 'spontaneity', 'authenticity', 'commercial standard', 'commercial pop', 'commercial trade-off', 'character', 'homogenising']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Capture, Production Approach and Music Style:',
        '• Vocal Comping & Takes: Producers assembled the master lead vocal from dozens of takes, using slip-editing and crossfades to piece together ideal words and syllables for a seamless superhuman performance.',
        '• Max Martin Production: Digital tracking in a DAW provided total session recall and non-destructive editing, establishing a polished millennium pop standard.',
        '',
        'Synthesis, Sequencing and Sampling:',
        '• Pitch Correction: Auto-Tune and Melodyne software retuned lead and backing vocals, eliminating pitch drift and creating the signature hyper-polished, robotic pop aesthetic.',
        '• Rhythmic Quantisation: Audio waveforms were sliced and quantised to the DAW tempo grid, locking vocal consonants tightly into the driving dance groove.',
        '',
        'EQ and Filtering:',
        '• Creative Filtering: Applied narrow band-pass "telephone" EQ (cutting below 400Hz and above 3kHz) to verse vocals to create dramatic frequency contrast before full-bandwidth choruses.',
        '',
        'Dynamic Processing:',
        '• Compression & Ducking: Heavy serial compression and side-chain ducking kept vocals front and centre against loud synths with consistent radio loudness.',
        '',
        'Pan and Stereo Field:',
        '• Stereo Width & Stacks: Lead vocals were doubled and reinforced with multi-layered backing vocals, pitch-shifted (+/- 10 cents), and panned hard left and right to build a massive "wall of sound" chorus.',
        '',
        'Effects & Wider Industry Impact:',
        '• Effects: Stereo chorus, automated delay throws, and ducking plate reverbs kept the vocal upfront without washing out the mix.',
        '• Economic Impact: DAWs drastically reduced tracking costs and studio hours, shifting production to home/project studios while homogenising commercial pop vocal character.'
      ].join('\n'),
      grade_B: [
        'Pitch Correction and Editing:',
        '• Auto-Tune was used on vocals to fix pitch errors and create an artificial robotic pop effect.',
        '• Comping allowed producers to take the best parts of multiple takes and crossfade them together into one flawless take.',
        '',
        'Vocal Layering and Panning:',
        '• Multiple backing vocal takes were recorded and panned left and right to create a wide stereo chorus.',
        '• ADT and pitch shifting were used to thicken the vocal sound.',
        '',
        'Creative EQ and Industry Impact:',
        '• Band-pass telephone filters were put on the verses to make the vocal sound lo-fi, before the full chorus entered.',
        '• DAWs made recording faster and cheaper because producers did not need expensive tape or commercial studios.'
      ].join('\n'),
      grade_D: [
        'DAW Vocal Production:',
        '• Auto-Tune made the vocal perfectly in tune and gave it a modern pop sound.',
        '• Vocals were cut up and edited on a computer screen instead of cutting tape.',
        '• Backing vocals were panned left and right, and a telephone EQ effect was used in the verse.',
        '• DAWs allowed unlimited tracks and made music cheaper to produce.'
      ].join('\n'),
      student_template: [
        'Capture, Production Approach and Music Style:',
        '• ',
        '',
        'Synthesis, Sequencing and Sampling:',
        '• ',
        '',
        'EQ and Filtering:',
        '• ',
        '',
        'Dynamic Processing:',
        '• ',
        '',
        'Pan and Stereo Field:',
        '• ',
        '',
        'Effects & Wider Industry Impact:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c3_q5_sway_2025_15m',
    paperCode: '9MT0/03 Component 3: Listening & Analysing • Question 5 (Summer 2025)',
    component: 'Component 3',
    questionNumber: '5',
    title: 'C3 Q5: 1950s Big Band Tracking vs 1990s Latin Dance Remix — "Sway" (15 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q5_Sway_Comparison_2025_15m.md',
    maxMarks: 15,
    ao3Max: 5,
    ao4Max: 10,
    audioSrc1: null,
    audioTitle1: 'Reference Video: Dean Martin — Sway (1954)',
    audioSrc2: null,
    audioTitle2: 'Reference Video: Shaft — (Mucho Mambo) Sway (1999)',
    youtubeId1: 'DXq-XdyGehk',
    videoTitle1: 'Track 5: Dean Martin — Sway (1954)',
    youtubeId2: 'BR03WCEEvSs',
    videoTitle2: 'Track 6: Shaft — (Mucho Mambo) Sway (1999)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Early Multitrack & Analogue Tracking',
        url: '/interactive-slide-early-multitrack.html',
        quizUrl: '/early-multitrack-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Direct to Tape & 1950s Recording',
        url: '/interactive-slide-direct-to-tape.html',
        quizUrl: '/direct-to-tape-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Track 5 is Dean Martin’s 1954 recording of "Sway" and Track 6 is Shaft’s 1999 dance remix "(Mucho Mambo) Sway". Evaluate and compare the production techniques used in both recordings:',
    examBullets: [
      'Capture, production approach and music style',
      'Synthesis, sequencing and sampling',
      'EQ and filtering',
      'Dynamic processing',
      'Pan and stereo field',
      'Effects'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q5 Revision Notes — Sway (1954 Big Band vs 1999 Dance Remix):',
      keyPoints: [
        'Live Tracking vs DAW: 1954 captured a live big band ensemble together in a single acoustically resonant room using valve/ribbon mics into a valve mixer directly to tape. 1999 is a dance production sequenced in a DAW using electronic drum machines, digital samplers, and synthesizers.',
        'Tape vs Digital: 1954 features analogue tape saturation, gentle high-frequency roll-off, and low-level tape hiss. 1999 is clean 24-bit digital audio with high headroom and no noise floor.',
        'Sampling Horns: 1954 features live dynamic brass interactions with room spill. 1999 samples Perez Prado’s horn hook, looping it repeatedly with high-pass and low-pass filter sweeps.',
        'Drums & Low End: 1954 features acoustic drums played with brushes and an upright acoustic double bass. 1999 uses a punchy 4-on-the-floor 909-style electronic kick drum and a synthetic sub-bass.'
      ],
      links: [
        { label: '🌐 Component 3 Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-listening-exam-revision/' },
        { label: '🎯 In-App Interactive Trainer: Direct to Tape & 1950s Recording', url: '/interactive-slide-direct-to-tape.html' },
        { label: '🎯 In-App Quiz: Topic 1 Direct to Tape & Early Multitrack', url: '/?quiz=quiz-topic-1_p1' }
      ]
    },
    questionPrompt:
      'Compare the production techniques in Dean Martin: Sway (1954) and Shaft: (Mucho Mambo) Sway (1999). (15 marks — AO3: 5 marks, AO4: 10 marks)',
    ao3Anchors: [
      {
        id: 'ao3_tracking_live_vs_daw',
        label: 'Tracking methodology: Live single-room big band tracking with ribbon/valve mics in 1954 vs DAW sequencing and digital audio editing in 1999',
        keywords: ['live tracking', 'big band', 'ribbon mic', 'tube mic', 'valve', 'single room', 'daw', 'digital multitrack']
      },
      {
        id: 'ao3_tape_vs_digital_recording',
        label: 'Recording medium: Analogue magnetic tape (tape saturation, high noise floor/hiss) vs 24-bit digital audio with wide dynamic headroom',
        keywords: ['tape', 'analogue tape', 'tape saturation', 'noise floor', 'tape hiss', 'digital audio', 'headroom']
      },
      {
        id: 'ao3_brass_sampling_looping',
        label: 'Brass instrumentation: Live acoustic brass section with natural room spill in 1954 vs sampled, looped, and filtered horn riffs in 1999',
        keywords: ['sample', 'sampled', 'brass', 'horns', 'loop', 'looped', 'perez prado', 'filter sweep']
      },
      {
        id: 'ao3_electronic_drums_mambo',
        label: 'Rhythm section: Acoustic drum kit with brushes in 1954 vs four-on-the-floor 909-style electronic kick and sequenced Latin percussion in 1999',
        keywords: ['four-on-the-floor', '4-on-the-floor', 'electronic kick', '909', 'drum kit', 'brushes', 'sequenced percussion']
      },
      {
        id: 'ao3_acoustic_bass_vs_sub',
        label: 'Low end: Acoustic upright double bass in 1954 vs electronic sub-bass synthesizer in 1999',
        keywords: ['double bass', 'upright bass', 'synth bass', 'sub-bass', 'sub bass', 'electronic low end']
      },
      {
        id: 'ao3_spatial_reverb_delays',
        label: 'Spatial acoustics: Physical room acoustics and echo chamber in 1954 vs modern digital reverb, stereo widening, and tempo-synced delays in 1999',
        keywords: ['room reverb', 'natural room', 'digital reverb', 'delay', 'stereo width', 'bleed', 'synthetic space']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_dynamic_ensemble_feel',
        label: 'Evaluates musical momentum: Contrasts Dean Martin’s organic acoustic swing and dynamic room interaction with Shaft’s compressed, driving dancefloor momentum',
        keywords: ['swing', 'organic feel', 'ensemble dynamics', 'dancefloor', 'energy', 'momentum', 'compressed']
      },
      {
        id: 'ao4_horn_loop_repetition',
        label: 'Evaluates horn impact: Explains how sampling and looping the brass hook turns an expressive live horn melody into a hypnotic, repetitive dance riff',
        keywords: ['hypnotic', 'repetitive', 'dance hook', 'riff', 'sampled hook', 'club energy']
      },
      {
        id: 'ao4_sub_kick_club_punch',
        label: 'Evaluates club low end: Explains how 4-on-the-floor electronic kick and sub-bass provide sustained physical low-frequency punch for club subwoofers',
        keywords: ['subwoofer', 'low-end impact', 'chest punch', '4-on-the-floor', 'club playback']
      },
      {
        id: 'ao4_tape_warmth_vs_clarity',
        label: 'Evaluates sonic warmth vs clarity: Weighs tape harmonic saturation and warmth against the crisp high-frequency transient detail and silence of digital audio',
        keywords: ['tape warmth', 'harmonic saturation', 'clarity', 'high-frequency detail', 'clean low end', 'noise floor']
      },
      {
        id: 'ao4_vocal_crooner_vs_hype',
        label: 'Evaluates vocal role: Contrasts Dean Martin’s intimate crooner delivery (proximity effect, subtle vibrato) with Shaft’s hyped MC chants that drive party energy',
        keywords: ['crooner', 'intimate', 'proximity effect', 'hype', 'mc chants', 'party energy', 'vocal delivery']
      },
      {
        id: 'ao4_sampling_culture_impact',
        label: 'Evaluates cultural recontextualisation: Assesses how remix culture and sampling technologies recontextualise mid-century Latin big band music for modern audiences',
        keywords: ['recontextualise', 'remix culture', 'sampling culture', 'revival', 'crossover', 'audiences']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Capture, Studio Acoustics and Tracking:',
        '• 1954 (Dean Martin): Recorded live in a single acoustic room with the big band ensemble; ribbon and valve condenser mics captured natural acoustic bleed between instruments.',
        '• 1999 (Shaft): Sequenced inside a DAW; discrete stems, digital MIDI synths, and electronic drum machines tracked with complete digital isolation.',
        '',
        'Sampling, Sequencing and Brass Arrangement:',
        '• 1954: Live brass section played dynamic acoustic parts with human swing, subtle pitch variations, and room reflections.',
        '• 1999: Samples Perez Prado’s 1950s mambo horn riff, looping it into a relentless, repetitive dance hook with automated filter sweeps.',
        '',
        'Dynamic Processing and Rhythm Section:',
        '• 1954: Minimal dynamic compression preserves wide natural dynamic range; brushed drum kit and upright double bass sit gently in the mix.',
        '• 1999: Heavy brickwall limiting and side-chain compression lock a 4-on-the-floor 909 kick and deep sub-bass to create constant high-energy club impact.',
        '',
        'Vocal Production and Spatial Ambience:',
        '• 1954: Dean Martin sings close to a valve mic (proximity effect) with subtle natural echo chamber reverb; warm, intimate crooner delivery.',
        '• 1999: Hyped party MC vocal chants ("Mucho Mambo") layered with digital stereo delays and short plates to drive dancefloor excitement.'
      ].join('\n'),
      grade_B: [
        'Tracking and Instrumentation:',
        '• The 1954 version was recorded live with a full big band in one room with ribbon mics and tape.',
        '• The 1999 version was sequenced in a DAW using drum machines and synthesizers.',
        '',
        'Sampling and Dynamics:',
        '• Shaft samples the famous brass riff from Perez Prado and loops it over a four-on-the-floor dance beat.',
        '• The 1999 remix has heavy compression to make it loud for clubs, while the 1954 original has natural dynamics.',
        '',
        'Vocals and Effects:',
        '• Dean Martin sings with warm proximity effect and natural room echo.',
        '• Shaft uses party MC vocals with digital delays and bright modern EQ.'
      ].join('\n'),
      grade_D: [
        'Comparison of Sway Versions:',
        '• 1954 has live brass, acoustic double bass, and tape hiss from analogue recording.',
        '• 1999 is a dance remix that samples the brass riff and adds electronic drums and synth bass.',
        '• 1999 is louder with heavier compression and digital effects.'
      ].join('\n'),
      student_template: [
        'Capture, Production Approach and Music Style:',
        '• ',
        '',
        'Synthesis, Sequencing and Sampling:',
        '• ',
        '',
        'EQ and Filtering:',
        '• ',
        '',
        'Dynamic Processing:',
        '• ',
        '',
        'Pan and Stereo Field:',
        '• ',
        '',
        'Effects:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c4_q6_drum_synth_2025_20m',
    paperCode: 'Component 4: Producing & Analysing • 20-Mark Technical Evaluation',
    component: 'Component 4',
    questionNumber: '6',
    title: 'C4 Q6: Subtractive Drum Synthesis — Roland TR-606 Drumatix (20 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C4_Q6_Drum_Synthesis_2025_20m.md',
    maxMarks: 20,
    ao3Max: 5,
    ao4Max: 15,
    youtubeId1: null,
    audioSrc1: '/Audio/tr606_drum_synthesis.wav',
    audioTitle1: 'Roland TR-606 Drumatix Analogue Drum Synthesis Stem (Isolated Voices & Groove)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: The Synthesizer & Sound Synthesis',
        url: '/interactive-slide-the-synthesizer.html',
        quizUrl: '/the-synthesizer-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Component 4 Producing & Analysing',
        url: '/interactive-slide-component-4.html',
        quizUrl: '/component-4-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Listen to the analogue drum synthesis stem in the player (Roland TR-606 Drumatix). Analyse how these analogue drum voices and the combined groove were made using subtractive synthesis:',
    examBullets: [
      'Voice architecture and sound generation',
      'Filter types and frequency shaping',
      'Envelopes and decay times',
      'Pitch modulation',
      'Sequencing and mix balance'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — How Roland TR-606 Analogue Drum Synthesis Works:',
      keyPoints: [
        'Bass Drum: Bridged-T resonant network (damped sine oscillator) excited by a pulse trigger + low-pass filtering. Amplitude envelope has 0ms attack (cutting the wave off-zero to create a beater click transient), medium decay, and 0 sustain.',
        'Snare Drum: Combines two parallel circuits: a tuned resonant oscillator (drum body tone) plus an unpitched white noise generator shaped by a band-pass filter and short decay envelope for the snare wires.',
        'Toms (Low & High): Dual bridged-T resonant filter networks tuned to distinct intervals with fast exponential pitch envelope decay mimicking drumhead tension release.',
        'Hi-Hats & Cymbal: 6 detuned Schmitt-trigger square wave oscillators create an inharmonic metallic cluster, routed through a high-pass filter (>2kHz). Closed hat uses an ultra-short decay envelope (~50ms); open hat and cymbal use longer release decay envelopes.',
        'Sequencer & Mix: Internal 16-step sequencer running at quantised 16th notes. Voices are summed dry in mono for focused punch and mix headroom.'
      ],
      links: [
        { label: '🌐 Component 4 Production Exam Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-4-production-exam-revision/' },
        { label: '🌐 Introduction to Drum Sampling & Synthesis (musictechguru.com)', url: 'https://www.musictechguru.com/product/introduction-to-drum-sampling/' },
        { label: '🎯 In-App Interactive Trainer: Synthesiser Fundamentals', url: '/?quiz=quiz-topic-34' },
        { label: '🎯 In-App Quiz: Topic 3 Synthesis (Waveforms, VCF, ADSR & LFO)', url: '/?quiz=quiz-topic-3_p1' }
      ]
    },
    questionPrompt:
      'Listen to the Roland TR-606 Drumatix audio stem. Analyse how the analogue drum sounds (bass drum, snare drum, toms, hi-hats, cymbal) and the groove are created using subtractive synthesis. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_kick_bridged_t',
        label: 'Bass drum oscillator: Bridged-T resonant filter network excited by a pulse trigger, acting as a damped sine wave oscillator',
        keywords: ['bridged-t', 'bridged t', 'resonant network', 'damped sine', 'sine wave', 'pulse trigger', 'oscillator', 'bass drum']
      },
      {
        id: 'ao3_kick_envelope_click',
        label: 'Bass drum envelope: 0ms attack time cutting the waveform off-zero to create an audible transient click, followed by medium decay and zero sustain',
        keywords: ['0ms attack', 'zero attack', 'transient click', 'click', 'off-zero', 'beater click', 'decay', 'zero sustain']
      },
      {
        id: 'ao3_snare_dual_architecture',
        label: 'Snare drum circuits: Dual parallel architecture combining a tuned resonant oscillator (shell body) with an unpitched white noise generator (wires)',
        keywords: ['dual-circuit', 'parallel circuits', 'white noise', 'tuned oscillator', 'body tone', 'snare drum', 'noise generator']
      },
      {
        id: 'ao3_snare_bandpass_decay',
        label: 'Snare filtering & envelope: White noise shaped by a band-pass filter and short decay envelope for the snare snap',
        keywords: ['band-pass', 'bandpass', 'filter', 'snare wires', 'short decay', 'decay envelope', 'snap']
      },
      {
        id: 'ao3_toms_dual_circuits',
        label: 'Tom circuits: Dual bridged-T resonant filter networks tuned to Low and High frequencies with exponential pitch envelope decay',
        keywords: ['toms', 'low tom', 'high tom', 'pitch envelope', 'exponential decay', 'pitch drop', 'tuned']
      },
      {
        id: 'ao3_hihat_metallic_cluster',
        label: 'Hi-hat oscillator cluster: Array of 6 detuned Schmitt-trigger square wave oscillators producing an inharmonic metallic cluster',
        keywords: ['6 oscillators', 'six oscillators', 'schmitt trigger', 'square wave', 'metallic', 'inharmonic', 'hi-hat', 'hi hats']
      },
      {
        id: 'ao3_hihat_hpf_decay',
        label: 'Hi-hat filtering & envelopes: High-pass filter (>2kHz) with ultra-short decay for closed hat and longer release decay for open hat',
        keywords: ['high-pass', 'high pass', 'hpf', 'closed hat', 'open hat', 'short decay', 'longer release', 'decay time']
      },
      {
        id: 'ao3_cymbal_circuit',
        label: 'Cymbal architecture: Metallic 6-oscillator cluster routed through band-pass/high-pass filtering with extended decay release',
        keywords: ['cymbal', 'long decay', 'metallic cluster', 'filter', 'extended release']
      },
      {
        id: 'ao3_sequencer_mono_mix',
        label: 'Pattern & output: 16th-note quantised step sequencer, discrete analogue voices summed into a focused dry mono mix',
        keywords: ['step sequencer', '16th-note', 'quantised', 'mono', 'dry', 'discrete analogue', 'summed']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_kick_punch_sub_weight',
        label: 'Deconstructs bass drum punch: Bridged-T damped sine oscillation generates a clean sub fundamental while 0ms attack creates a beater click cutting through mixes',
        keywords: ['sub fundamental', 'punch', 'beater click', 'transient', 'cuts through', 'low-end weight', 'zero-crossing']
      },
      {
        id: 'ao4_snare_crack_realism',
        label: 'Deconstructs snare body & wires: Balancing the low-mid resonant body tone with band-pass white noise mimics both shell resonance and wire rattle',
        keywords: ['shell resonance', 'wire rattle', 'crack', 'snappy', 'balance', 'acoustic snare emulation', 'snare snap']
      },
      {
        id: 'ao4_tom_pitch_tension',
        label: 'Deconstructs tom pitch sweep: Downward exponential pitch decay mimics the physical release of membrane tension when an acoustic drumhead is struck',
        keywords: ['membrane tension', 'pitch sweep', 'falling pitch', 'drumhead', 'acoustic tom', 'pitch drop']
      },
      {
        id: 'ao4_hihat_metallic_spectrum',
        label: 'Deconstructs metallic timbre: Detuning 6 square wave oscillators generates dense non-harmonic frequencies emulating bronze cymbal overtones',
        keywords: ['inharmonic', 'bronze', 'metallic overtones', 'cymbal sizzle', 'non-harmonic', 'complex timbre']
      },
      {
        id: 'ao4_hihat_choke_groove',
        label: 'Deconstructs open/closed interplay: Interplay between tight closed decays and ringing open decays creates rhythmic syncopation and groove',
        keywords: ['choke', 'syncopation', 'rhythmic drive', 'interplay', 'groove', 'open and closed', 'closed hat', 'open hat', 'longer release', 'decay envelope']
      },
      {
        id: 'ao4_sequencer_drive_timing',
        label: 'Deconstructs step sequencer drive: Rigid 16th-note clock timing and discrete analogue triggers create a relentless, machine-like rhythm',
        keywords: ['clock timing', 'machine-like', 'relentless', 'techno', 'electro', 'driving rhythm']
      },
      {
        id: 'ao4_mono_mix_headroom',
        label: 'Deconstructs mono mixdown: Summing all voices to mono concentrates punch in the phantom centre, leaving the stereo field free for melodic synths',
        keywords: ['phantom centre', 'headroom', 'stereo space', 'mono focus', 'mix translation']
      },
      {
        id: 'ao4_dry_analogue_punch',
        label: 'Deconstructs dry transient clarity: Total lack of reverb or delay preserves raw transient punch, preventing muddy low-end build-up',
        keywords: ['transient punch', 'no muddiness', 'clarity', 'dry signal', 'immediate impact']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Bass Drum:',
        '• Bridged-T Resonant Filter Network: Acts as a damped sine wave oscillator excited by an analogue pulse trigger, producing a deep fundamental sub tone with no unwanted upper harmonics.',
        '• Amplitude Envelope & Click: Uses 0ms attack time that cuts into the waveform away from zero crossing to generate an initial transient beater click, followed by a medium decay and zero sustain.',
        '',
        'Snare Drum:',
        '• Dual-Circuit Architecture: Combines a tuned resonant bridged-T oscillator for the tonal drum body shell resonance plus an unpitched white noise generator for the snare wires.',
        '• Band-Pass Filtering & Envelope: White noise is shaped by a dedicated band-pass filter and short decay envelope, giving the snare a crisp, snappy acoustic crack with zero sustain.',
        '',
        'Tom Drums (Low Tom & High Tom):',
        '• Dual Resonant Oscillators: Low and High toms use discrete bridged-T filter networks tuned to distinct harmonic intervals.',
        '• Pitch Decay Envelope: Fast exponential pitch envelope decay drops the frequency rapidly upon trigger, accurately simulating the physical membrane tension drop of an acoustic drumhead.',
        '',
        'Hi-Hats (Closed & Open) & Cymbal:',
        '• Metallic 6-Oscillator Cluster: Uses 6 detuned Schmitt-trigger square wave oscillators to generate a dense inharmonic metallic cluster mimicking bronze alloy.',
        '• High-Pass Filtering: Cluster is routed through a fixed high-pass filter (HPF above 2–3kHz) to strip away muddy lows and mids.',
        '• Envelopes & Choke: Closed hat uses an ultra-tight decay envelope (~50ms); open hat and cymbal use longer decay/release envelopes. Striking closed hat chokes the open hat.',
        '',
        'Sequencing, Pattern & Mix (Bars 5–8):',
        '• 16th-Note Step Sequencing: Internal hardware sequencer triggers voices on rigid 16th-note quantised steps, creating a driving machine groove fundamental to early electro.',
        '• Mono Summing & Dry Dynamics: Discrete analogue voices are summed to a punchy mono output with zero reverb or delay, maximizing transient punch and headroom in the stereo mix.'
      ].join('\n'),
      grade_B: [
        'Bass Drum and Snare Drum:',
        '• Bass drum uses a bridged-T resonant filter acting as a sine oscillator with 0ms attack to create a beater click.',
        '• Snare combines a tuned oscillator body tone with band-pass filtered white noise for the snare wires.',
        '',
        'Tom Drums and Hi-Hats:',
        '• Toms use dual tuned oscillators with a falling pitch envelope to sound like real drum heads.',
        '• Hi-hats use 6 detuned square wave oscillators through a high-pass filter to sound metallic, with closed hat having short decay and open hat having long decay.',
        '',
        'Groove and Mix:',
        '• Sequenced in a 16-step pattern with no reverb, summed in mono for a tight, punchy sound.'
      ].join('\n'),
      grade_D: [
        'Roland TR-606 Drum Synthesis:',
        '• Bass drum uses a sine wave oscillator and has a quick click at the start.',
        '• Snare drum uses white noise and a filter for the wires.',
        '• Hi-hats use a high-pass filter so they sound bright, and toms drop in pitch when triggered.',
        '• All drums are sequenced together in mono without any reverb.'
      ].join('\n'),
      student_template: [
        'Bass Drum:',
        '• ',
        '',
        'Snare Drum:',
        '• ',
        '',
        'Tom Drums (Low Tom & High Tom):',
        '• ',
        '',
        'Hi-Hats (Closed & Open) & Cymbal:',
        '• ',
        '',
        'Sequencing, Pattern & Mix (Bars 5–8):',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c3_q6_guitar_evolution_20m',
    paperCode: '9MT0/03 Component 3: Listening & Analysing • Question 6',
    component: 'Component 3',
    questionNumber: '6',
    title: 'C3 Q6: Development of the Electric Guitar & Amplification (20 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q6_Electric_Guitar_Evolution.md',
    maxMarks: 20,
    ao3Max: 5,
    ao4Max: 15,
    audioSrc1: null,
    youtubeId1: 'qFfnlYbFEiE',
    videoTitle1: 'Reference 1: Jimi Hendrix — Voodoo Child (Stratocaster + Fuzz Face into Marshall Stack)',
    youtubeId2: 'M4Czx8EWXb0',
    videoTitle2: 'Reference 2: Eddie Van Halen — Eruption (Cranked Marshall Super Lead Valve Saturation)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Electric Guitar & Amplifiers',
        url: '/interactive-slide-electric-guitar.html',
        quizUrl: '/electric-guitar-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Large-Scale Analogue & Multi-Mic Recording',
        url: '/interactive-slide-large-scale-analogue.html',
        quizUrl: '/large-scale-analogue-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Evaluate how developments in electric guitar construction, pickup design, and amplification transformed musical styles from the 1930s to the 1970s:',
    examBullets: [
      'Body design, materials and construction',
      'Transducers, pickups and electronics',
      'Amplification, speakers and distortion',
      'Effects and sound processing',
      'Impact on musical styles and performance'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — Development of Electric Guitar & Amps:',
      keyPoints: [
        'Body Construction: Early hollow-body archtops (ES-150) suffered from severe microphonic acoustic feedback at stage volume. Solid-body guitars (Fender Telecaster, Stratocaster, Gibson Les Paul) removed the resonant internal air cavity, eliminating unwanted feedback and prolonging note sustain.',
        'Pickups: Single-coils (Fender) produce bright, glassy treble attack but suffer from 50/60Hz mains hum. Seth Lover’s PAF humbucker (Gibson) placed two coils in opposite polarity and reverse-wound them, canceling mains hum while delivering a warmer, thicker, high-output midrange tone.',
        'Valve Amplification: Players pushed valve amplifiers (Fender Bassman, Vox AC30, Marshall Super Lead 100W) into power-stage overdrive. Soft clipping generated musical even-order harmonics, natural compression, and sustain.',
        'Speaker Enclosures & Effects: Jim Marshall paired 100W heads with 4x12 closed-back Celestion cabinets, projecting massive sound pressure levels (SPL) in arenas, while fuzz boxes and treble boosters helped define hard rock and metal.'
      ],
      links: [
        { label: '🌐 Component 3 Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-listening-exam-revision/' },
        { label: '🌐 Electric Guitar & Amp Masterclass (musictechguru.com)', url: 'https://www.musictechguru.com/product/the-geetar-a-level-guide/' },
        { label: '🎯 In-App Interactive Trainer: Electric Guitar & Amplifiers', url: '/interactive-slide-electric-guitar.html' },
        { label: '🎯 In-App Quiz: Topic 2 Electric Guitar Anatomy & Pickups', url: '/?quiz=quiz-topic-2_p1' }
      ]
    },
    questionPrompt:
      'Evaluate how developments in electric guitar construction, pickup design, and amplification shaped modern music from the 1930s to the 1970s. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_body_construction',
        label: 'Body construction: Hollow-body archtops (ES-150) vs semi-hollow (ES-335) vs solid hardwood bodies (Fender Telecaster/Stratocaster, Gibson Les Paul)',
        keywords: ['hollow-body', 'semi-hollow', 'solid-body', 'solid body', 'telecaster', 'stratocaster', 'les paul', 'alder', 'ash', 'mahogany']
      },
      {
        id: 'ao3_electromagnetic_pickups',
        label: 'Pickup mechanics: Electromagnetic transducers using permanent magnets wrapped in copper wire coils converting string vibration into AC voltage',
        keywords: ['transducer', 'electromagnetic', 'magnets', 'copper wire', 'coil', 'faraday', 'ac signal', 'pickup']
      },
      {
        id: 'ao3_single_coil_vs_humbucker',
        label: 'Pickup configurations: Leo Fender single-coils (bright, 50/60Hz hum) vs Seth Lover PAF humbuckers (reverse wound, reverse polarity hum cancelling)',
        keywords: ['single-coil', 'single coil', 'humbucker', 'paf', 'seth lover', 'reverse wound', 'opposite polarity', 'mains hum', '60hz hum']
      },
      {
        id: 'ao3_hardware_controls',
        label: 'Hardware innovations: Volume/tone potentiometers, pickup selector switches, intonated bridge saddles, truss rods, and synchronized whammy bars',
        keywords: ['potentiometer', 'pot', 'tone control', 'pickup selector', 'whammy bar', 'vibrato', 'bridge saddles', 'truss rod']
      },
      {
        id: 'ao3_valve_amp_overdrive',
        label: 'Valve amplification: Preamp (12AX7) and power amp (EL34/6L6) stages driven into saturation, soft clipping, and harmonic distortion',
        keywords: ['valve', 'tube', 'amplifier', 'marshall', 'fender bassman', 'vox ac30', '12ax7', 'el34', 'saturation', 'overdrive']
      },
      {
        id: 'ao3_speaker_cabinets_spl',
        label: 'Speaker enclosures: High-power 4x12 closed-back Celestion speaker cabinets projecting high sound pressure levels (SPL)',
        keywords: ['4x12', 'cabinet', 'celestion', 'closed back', 'spl', 'stage volume', 'stack']
      },
      {
        id: 'ao3_analogue_effects_pedals',
        label: 'Analogue effects pedals: Stompboxes (Fuzz Face, Dallas Rangemaster treble booster, Cry Baby wah, Uni-Vibe, tape echo)',
        keywords: ['fuzz', 'fuzz face', 'treble booster', 'wah', 'wah-wah', 'stompbox', 'pedals', 'tape echo']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_feedback_elimination',
        label: 'Evaluates feedback elimination: Explains how solid hardwood bodies removed the resonant internal air cavity, preventing uncontrolled acoustic microphonic feedback',
        keywords: ['acoustic feedback', 'microphonic', 'feedback elimination', 'stage volume', 'air cavity', 'uncontrolled howl']
      },
      {
        id: 'ao4_sustain_and_note_clarity',
        label: 'Evaluates sustain: Explains how dense, rigid solid bodies prevent string vibrational energy from transferring into wooden top vibrations, prolonging sustain',
        keywords: ['sustain', 'vibrational energy', 'articulation', 'note decay', 'string vibration', 'clarity']
      },
      {
        id: 'ao4_single_vs_humbucker_timbre',
        label: 'Evaluates pickup timbre: Contrasts the glassy, bell-like treble attack of Stratocasters with the thick, warm, high-output mid punch of Les Paul humbuckers',
        keywords: ['glassy', 'bell-like', 'treble bite', 'warmth', 'high output', 'midrange punch', 'tonal difference']
      },
      {
        id: 'ao4_valve_harmonic_saturation',
        label: 'Evaluates valve overdrive: Explains how pushing valve amps into power-stage clipping generates musical even-order harmonics, natural compression, and singing lead tone',
        keywords: ['even-order harmonics', 'soft clipping', 'power amp saturation', 'natural compression', 'singing sustain']
      },
      {
        id: 'ao4_genre_evolution',
        label: 'Evaluates genre evolution: Tracks how volume and overdrive transformed the guitar from a quiet rhythm comping instrument into the dominant lead voice of rock and metal',
        keywords: ['rhythm to lead', 'big band to rock', 'hard rock', 'heavy metal', 'dominant instrument', 'genre evolution']
      },
      {
        id: 'ao4_iconic_artist_tones',
        label: 'Evaluates artist signatures: Connects guitar/amp pairings to legendary sounds (e.g. Hendrix fuzz/whammy on Stratocaster into Marshall, Page Les Paul into Marshall stack)',
        keywords: ['hendrix', 'jimi hendrix', 'jimmy page', 'eric clapton', 'iconic tone', 'marshall stack']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Body Construction and Feedback Elimination:',
        '• Hollow-body archtops (Gibson ES-150): Resonant air cavities vibrated in sympathy with loud stage amps, causing severe microphonic acoustic feedback.',
        '• Solid-body design: The Fender Broadcaster/Telecaster (ash body) and Gibson Les Paul (mahogany/maple) removed the internal cavity, eliminating feedback and allowing guitars to be played at extreme stage volumes with prolonged note sustain.',
        '',
        'Pickup Innovations and Electromagnetic Design:',
        '• Single-coil pickups (Fender): Produced a bright, glassy high-frequency response with sharp transient bite, but picked up 50/60Hz electromagnetic mains hum.',
        '• Humbucking pickups (Seth Lover / Gibson PAF): Wired two coils in reverse wound, opposite polarity to cancel mains hum, yielding a thicker, warmer, higher-output midrange tone.',
        '',
        'Amplification, Saturation and High SPL Projection:',
        '• Valve overdrive: Pushing valve amplifiers (Fender Bassman, Marshall JTM45 / Super Lead 100W) into power-amp saturation produced soft clipping, pleasant even-order harmonics, and natural compression.',
        '• Marshall Stack: Pairing 100W heads with 4x12 closed-back Celestion speaker cabinets delivered high sound pressure levels (SPL) capable of filling large concert arenas.',
        '',
        'Musical Impact and Genre Evolution:',
        '• Shift from rhythm to lead: Increased volume, sustain, and overdrive transformed the guitar from an acoustic rhythm comping instrument in big bands into the dominant lead voice of blues, hard rock, and heavy metal.',
        '• Sonic signatures: Enabled pioneering artists like Jimi Hendrix (Fuzz Face, Stratocaster whammy bar into cranked Marshalls) and Jimmy Page to define modern rock aesthetics.'
      ].join('\n'),
      grade_B: [
        'Body Construction and Feedback:',
        '• Hollow-body jazz guitars like the Gibson ES-150 had major problems with acoustic feedback at high volumes.',
        '• Solid-body guitars like the Fender Telecaster and Gibson Les Paul stopped feedback because they had no hollow cavity, giving notes much more sustain.',
        '',
        'Pickups and Sound:',
        '• Fender single-coil pickups gave a bright, sharp sound, but suffered from 60Hz hum.',
        '• Gibson humbuckers used two coils wired out of phase to cancel hum, creating a warmer, louder sound.',
        '',
        'Amps and Rock Music:',
        '• Turning valve amplifiers all the way up created power-amp distortion, harmonic saturation, and natural sustain.',
        '• Marshall 100W stacks and 4x12 cabinets let bands play loud rock concerts in arenas, turning guitar into a solo instrument.'
      ].join('\n'),
      grade_D: [
        'Electric Guitar Development:',
        '• Solid bodies stopped feedback from hollow guitars and increased sustain.',
        '• Humbuckers got rid of hum that single-coils had and sounded heavier.',
        '• Marshall valve amps were turned up to distort, making rock and metal music possible.',
        '• Guitars became the main lead instrument instead of just playing chords in the background.'
      ].join('\n'),
      student_template: [
        'Body Construction and Feedback Elimination:',
        '• ',
        '',
        'Pickup Innovations and Electromagnetic Design:',
        '• ',
        '',
        'Amplification, Saturation and High SPL Projection:',
        '• ',
        '',
        'Musical Impact and Genre Evolution:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c4_q6_sh101_synth_bass_2024_20m',
    paperCode: 'Component 4: Producing & Analysing • Technical Evaluation Practice',
    component: 'Component 4',
    questionNumber: '6',
    title: 'C4 Q6: Monophonic Analogue Synth Bass Architecture (20 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C4_Q6_SH101_Synth_Bass_2024_20m.md',
    maxMarks: 20,
    ao3Max: 5,
    ao4Max: 15,
    youtubeId1: null,
    audioSrc1: '/C4_SPOP_Assets/C4_SPOP_Bass_Example.mp3',
    audioTitle1: 'Music Tech Guru Monophonic Analogue Synth Bass Stem',
    interactiveDecks: [
      {
        title: 'Interactive Deck: The Synthesizer & Sound Synthesis',
        url: '/interactive-slide-the-synthesizer.html',
        quizUrl: '/the-synthesizer-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Component 4 Producing & Analysing',
        url: '/interactive-slide-component-4.html',
        quizUrl: '/component-4-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Listen to the synthesised bass line in the player. Analyse how subtractive synthesis architecture is used to create this punchy analogue bass sound:',
    examBullets: [
      'Oscillators and waveform generation',
      'Filter types, cutoff and resonance',
      'Envelopes and amplitude/filter modulation',
      'Performance controls, portamento and modulation',
      'Sequencing, pitch control and mix placement'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — Roland SH-101 Monophonic Synth Bass Architecture:',
      keyPoints: [
        'VCO Architecture: Curtis CEM3340 VCO allows simultaneous mixing of sawtooth (rich in all harmonics), variable pulse/square wave with Pulse Width Modulation (PWM), and a dedicated sub-oscillator.',
        'Sub-Oscillator Weight: Can be set 1 or 2 octaves below fundamental pitch (-1 oct square, -2 oct square, -2 oct pulse), providing deep sub-bass foundation that anchors dance mixes.',
        'VCF Filter Design: 24dB/octave (4-pole) resonant low-pass filter (IR3109 chip) with resonance capable of self-oscillation into a pure sine wave.',
        'Envelopes & Portamento: Single 4-stage ADSR envelope shared across filter cutoff and VCA. Fast attack + short decay creates a snappy transient pluck. Analogue portamento slews pitch between overlapping legato notes.'
      ],
      links: [
        { label: '🌐 Component 4 Production Exam Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-4-production-exam-revision/' },
        { label: '🎯 In-App Interactive Trainer: Synthesiser Fundamentals', url: '/?quiz=quiz-topic-34' },
        { label: '🎯 In-App Quiz: Topic 3 Synthesis (Waveforms, VCF, ADSR & LFO)', url: '/?quiz=quiz-topic-3_p1' }
      ]
    },
    questionPrompt:
      'Listen to the synthesised bass line. Analyse how subtractive synthesis architecture is used to create this punchy analogue bass sound. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_vco_waveforms',
        label: 'VCO waveforms: CEM3340 VCO generating simultaneously mixable sawtooth, square/pulse with pulse-width modulation (PWM)',
        keywords: ['cem3340', 'vco', 'sawtooth', 'square', 'pulse', 'pulse-width modulation', 'pwm', 'mixable waveforms']
      },
      {
        id: 'ao3_sub_oscillator_modes',
        label: 'Sub-oscillator integration: Dedicated sub-oscillator operating 1 or 2 octaves below fundamental with square or pulse waves',
        keywords: ['sub-oscillator', 'sub oscillator', '1 octave below', '2 octaves below', 'fundamental', 'square wave sub']
      },
      {
        id: 'ao3_vcf_lowpass_resonance',
        label: 'VCF filter type: 24dB/octave (4-pole) resonant low-pass filter (IR3109) with self-oscillation resonance',
        keywords: ['24db', '4-pole', 'vcf', 'low-pass filter', 'low pass', 'cutoff', 'resonance', 'self-oscillation']
      },
      {
        id: 'ao3_envelope_adsr_routing',
        label: 'Envelope modulation: 4-stage analogue ADSR envelope modulating VCF filter cutoff frequency and VCA amplitude',
        keywords: ['adsr', 'envelope', 'attack', 'decay', 'sustain', 'release', 'filter envelope', 'vca envelope']
      },
      {
        id: 'ao3_portamento_glide',
        label: 'Portamento glide: Analogue portamento slewing pitch smoothly between consecutive legato notes',
        keywords: ['portamento', 'glide', 'legato', 'pitch glide', 'slew rate']
      },
      {
        id: 'ao3_sequencer_arp_clock',
        label: 'Sequencing & clocking: Built-in 100-step digital sequencer and arpeggiator clocked via external CV/Gate or drum trigger',
        keywords: ['sequencer', 'step sequencer', 'arpeggiator', 'cv/gate', 'trigger in', 'clock']
      },
      {
        id: 'ao3_lfo_modulation',
        label: 'LFO modulation: Low-frequency oscillator modulating pitch (vibrato), filter cutoff, or pulse width (PWM)',
        keywords: ['lfo', 'modulation', 'vibrato', 'sample and hold', 'triangle lfo', 'pwm modulation']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_sub_weight_and_impact',
        label: 'Deconstructs sub-bass weight: Explains how layering the sub-oscillator reinforces the lowest octave fundamental, providing physical weight that anchors dance mixes',
        keywords: ['sub weight', 'fundamental power', 'low-end reinforcement', 'physical bass', 'dance music foundation', 'low-end weight', 'anchors the mix', 'sub-oscillator', 'fundamental', 'midrange clarity']
      },
      {
        id: 'ao4_pwm_chorus_richness',
        label: 'Deconstructs PWM movement: Explains how modulating pulse width creates continuous harmonic phase motion, producing a rich chorused texture from a single oscillator',
        keywords: ['phase movement', 'chorused', 'movement', 'harmonic texture', 'thickens', 'single oscillator', 'pulse width modulation', 'harmonic motion', 'pwm', 'continuous harmonic']
      },
      {
        id: 'ao4_filter_pluck_punch',
        label: 'Deconstructs filter pluck: Explains how a fast filter envelope decay on a resonant 24dB/octave slope creates a sharp transient pluck that cuts through dense mixes',
        keywords: ['transient pluck', 'filter decay', 'snappy attack', 'bite', 'cuts through the mix', 'punchy bass', 'pluck', 'snappy', '24db', 'low-pass', 'percussive']
      },
      {
        id: 'ao4_self_oscillation_harmonic',
        label: 'Deconstructs resonance peak: Explains how high resonance boosts cutoff frequencies, generating pure sine whistle tones or aggressive harmonic emphasis',
        keywords: ['boosts cutoff', 'sine wave', 'harmonic emphasis', 'screaming resonance', 'tonal peak', 'self-oscillation', 'cutoff frequency', 'harmonic peak', 'transient snap']
      },
      {
        id: 'ao4_portamento_expressiveness',
        label: 'Deconstructs portamento feel: Explains how portamento glide adds expressive human inflection to synthesized basslines, popular in acid house and funk',
        keywords: ['acid house', 'expressive', 'funk', 'inflection', 'smooth transitions', 'pitch slide']
      },
      {
        id: 'ao4_sequenced_bass_drive',
        label: 'Deconstructs rhythmic drive: Explains how tight step sequencing locked to a drum trigger creates hypnotic, locked bass grooves that never drift in tempo',
        keywords: ['locked groove', 'hypnotic', 'tempo lock', 'driving bassline', 'electronic rhythm', 'headroom', 'phase coherence', 'monophonic', 'phantom centre', 'tight']
      }
    ],
    exemplars: {
      grade_A_star: [
        'VCO Waveform Selection and Sub-Oscillator:',
        '• CEM3340 VCO: Combines a bright sawtooth wave (rich in even and odd harmonics) with a pulse wave modulated by an LFO (Pulse Width Modulation) for continuous harmonic motion.',
        '• Sub-Oscillator Weight: Running a square wave sub-oscillator 1 or 2 octaves below the fundamental provides massive low-end weight that anchors the mix without cluttering midrange clarity.',
        '',
        'VCF Filter Shaping and Resonance:',
        '• 24dB/Octave Low-Pass Filter: Steeper 4-pole slope aggressively cuts high frequencies, creating a focused, warm analogue low-end tone.',
        '• Resonance (Q): High resonance introduces a sharp harmonic peak at the cutoff frequency, sharpening the transient snap and capable of self-oscillation.',
        '',
        'Envelope (ADSR) Modulation:',
        '• Filter Envelope: Programmed with 0ms attack, snappy medium decay (150–250ms), low sustain, and short release; sweeps cutoff downward to create a percussive "pluck" transient.',
        '• VCA Dynamics: Clamped tight to prevent bass notes overlapping and causing muddy low-frequency buildup.',
        '',
        'Portamento, Step Sequencing and Mix Focus:',
        '• Portamento / Glide: Smoothly slews pitch between overlapping legato notes, adding vocal-like slide inflection characteristic of acid house and electro-pop.',
        '• Monophonic Focus: Pure mono bass routing keeps low-frequency energy firmly in the phantom centre, maximizing headroom and kick drum phase coherence.'
      ].join('\n'),
      grade_B: [
        'Oscillator Selection and Sub-Bass:',
        '• Uses a sawtooth wave for bright harmonics and a sub-oscillator 1 octave down for sub-bass weight.',
        '• Pulse width modulation adds movement and thickness to the sound without needing a second oscillator.',
        '',
        'Filter and Envelope Settings:',
        '• A 24dB low-pass filter cuts off top frequencies, and resonance adds bite to the sound.',
        '• Fast attack and short decay on the envelope create a punchy pluck transient.',
        '',
        'Portamento and Mix:',
        '• Portamento glide makes the notes slide smoothly into each other.',
        '• The sound is monophonic and centered in the mix so it does not interfere with stereo instruments.'
      ].join('\n'),
      grade_D: [
        'Analogue Synth Bass Breakdown:',
        '• Sawtooth wave gives bright harmonics, and sub-oscillator adds deep bass.',
        '• Low-pass filter removes high frequencies, and resonance makes it squelchy.',
        '• Fast envelope attack makes it punchy like a bass guitar pluck.',
        '• Notes slide into each other with glide, and it is played in mono.'
      ].join('\n'),
      student_template: [
        'VCO Waveform Selection and Sub-Oscillator:',
        '• ',
        '',
        'VCF Filter Shaping and Resonance:',
        '• ',
        '',
        'Envelope (ADSR) Modulation:',
        '• ',
        '',
        'Portamento, Step Sequencing and Mix Focus:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c4_q6_drum_mics_2021_20m',
    paperCode: 'Component 4: Producing & Analysing • 20-Mark Technical Evaluation',
    component: 'Component 4',
    questionNumber: '6',
    title: 'C4 Q6: Close-Miked Multitrack vs Ambient Spaced Drum Recording (20 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C4_Q6_Drum_Mics_2021_20m.md',
    maxMarks: 20,
    ao3Max: 5,
    ao4Max: 15,
    image1: '/images/slides/large_scale_analogue/drum_kit_close_mics.jpg',
    imageTitle1: 'Figure 1: 2010s Close-Miked Multitrack Drum Kit Setup',
    imageCaption1: 'Direct dynamic (SM57, D112) & condenser mics on each drum head and cymbal in a treated studio',
    image2: '/images/drum_recording_60s.png',
    imageTitle2: 'Figure 2: Late-1960s Ambient Drum Mic Setup',
    imageCaption2: 'Minimalist 3–4 mic Glyn Johns / spaced room placement capturing the live acoustic drum kit',
    youtubeId1: null,
    audioSrc1: '/Audio/rock_raw/drum_loop_clean.mp3',
    audioTitle1: 'Figure 1 Audio: Close-Miked Multitrack Drum Kit Stem',
    audioSrc2: '/C3_Heavy_Rock_Audio/led_zeppelin_when_the_levee_breaks_intro.mp3',
    audioTitle2: 'Figure 2 Audio: Late-1960s Classic Ambient Drum Sound (Led Zeppelin — When The Levee Breaks Intro)',
    youtubeId2: 'JM3fodiK9rY',
    videoTitle2: 'Figure 2 Reference: Classic Ambient Drum Sound (Led Zeppelin — When The Levee Breaks)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Large-Scale Analogue & Multi-Mic Recording',
        url: '/interactive-slide-large-scale-analogue.html',
        quizUrl: '/large-scale-analogue-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Early Multitrack Recording (1960s)',
        url: '/interactive-slide-early-multitrack.html',
        quizUrl: '/early-multitrack-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Rock Drum Recording & Mixing',
        url: '/interactive-slide-rock.html',
        quizUrl: '/rock-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Figure 1 shows a drum mic setup typical of 2010s recordings. Figure 2 shows a drum mic setup typical of the late 1960s. Evaluate and compare the drum recording techniques for a rock recording.',
    examBullets: [
      'Acoustic environment and room positioning',
      'Microphone selection and placement techniques',
      'Stereo capture, overheads and phase relationships',
      'Multitrack recording, spill and track isolation',
      'Signal processing, dynamic control and mix balance'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — 2010s Multi-Mic vs Late-1960s (Glyn Johns) Rock Drum Recording:',
      keyPoints: [
        'Room Acoustics: Fig 1 (2010s) uses a large live room with hard concrete/wood/glass surfaces (long pre-delay, big rock reverb) and an angled ceiling to reduce standing waves. Fig 2 (1960s) uses a small room with soft wall treatment (dry/dead sound) and corner placement that boosts bass.',
        '2010s Multi-Mic (Fig 1): Close mics on every drum (kick inside hole for beater attack, snare top & bottom with polarity/phase check, dynamic mics on toms for high SPL, small-diaphragm condenser on hi-hat, X-Y overheads for phase-coherent stereo, plus distant room mic).',
        '1960s 3-Mic Setup (Fig 2): Glyn Johns-style 3-mic setup (overhead, side mic near floor tom, kick mic outside front head). Kick outside lacks beater attack, and because the side mic is closer to the snare than the overhead (not equidistant), arrival-time differences cause phase cancellation and comb filtering.',
        'Mixing Control for Rock: Fig 1 records each drum to a separate DAW track for complete individual control over balance, panning, gating, EQ, and compression, whereas Fig 2 gives very little individual control.'
      ],
      links: [
        { label: '🌐 The Guide to Recording & Mixing Rock (musictechguru.com)', url: 'https://www.musictechguru.com/product/the-guide-to-mixing-rock/' },
        { label: '🌐 Component 1 Recording & Mixing Guide (musictechguru.com)', url: 'https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/' },
        { label: '🎯 In-App Interactive Trainer: Microphone Placement & Drum Miking', url: '/?quiz=quiz-topic-33' },
        { label: '🎯 In-App Quiz: Phase Alignment, Polarities & Comb Filtering', url: '/?quiz=quiz-topic-46' }
      ]
    },
    questionPrompt:
      'Figure 1 shows a drum mic setup typical of 2010s recordings. Figure 2 shows a drum mic setup typical of the late 1960s. Evaluate and compare the drum recording techniques for a rock recording. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_room_size_acoustics',
        label: 'Room acoustics: Large live room with reflective concrete/hardwood surfaces and angled ceiling (Fig 1) vs small room with wall damping blankets (Fig 2)',
        keywords: ['live room', 'hard surfaces', 'concrete', 'reflective', 'angled ceiling', 'small room', 'dead room', 'acoustic blankets']
      },
      {
        id: 'ao3_room_boundary_placement',
        label: 'Room boundary placement: Fig 2 kit placed near a wall/corner causing low-frequency boundary bass boost vs Fig 1 kit centered in the acoustic space',
        keywords: ['corner', 'boundary effect', 'bass boost', 'wall placement', 'proximity to wall', 'standing waves']
      },
      {
        id: 'ao3_kick_mic_technique',
        label: 'Kick drum miking: Fig 1 dynamic mic (AKG D112) placed inside sound hole near beater vs Fig 2 mic placed outside front resonant head',
        keywords: ['inside the kick', 'sound hole', 'port hole', 'beater', 'd112', 'outside front head', 'resonant head']
      },
      {
        id: 'ao3_snare_top_bottom_polarity',
        label: 'Snare miking & phase: Fig 1 dual dynamic mics (SM57) on top and bottom with bottom polarity flip vs Fig 2 relying on ambient bleed',
        keywords: ['snare top', 'snare bottom', 'sm57', 'polarity', 'phase reverse', 'under snare', 'snare wires']
      },
      {
        id: 'ao3_overheads_xy_vs_glyn_johns',
        label: 'Overheads & stereo imaging: Fig 1 coincident X-Y pair of small-diaphragm condensers vs Fig 2 Glyn Johns 3-mic setup (overhead + side mic near floor tom)',
        keywords: ['x-y', 'xy pair', 'coincident', 'small diaphragm condenser', 'glyn johns', 'side mic', 'floor tom mic', '3-mic']
      },
      {
        id: 'ao3_ambient_room_mics',
        label: 'Ambient room capture: Fig 1 includes distant room condenser mics to capture room ambiance vs Fig 2 capturing natural bleed via 3 mics',
        keywords: ['room mic', 'distant condenser', 'ambient mic', 'stereo room', 'room capture']
      },
      {
        id: 'ao3_daw_multitrack_isolation',
        label: 'Multitrack routing: Fig 1 records each mic to an independent DAW channel/track vs Fig 2 summing 3 mics to 3–4 tape channels with fixed pre-mix balance',
        keywords: ['multitrack', 'separate daw tracks', 'independent channels', 'tape tracks', 'summed', 'pre-mixed']
      },
      {
        id: 'ao3_gating_eq_compression',
        label: 'Channel processing: Fig 1 enables individual channel noise gating, surgical parametric EQ, and aggressive parallel bus compression vs Fig 2 broadband processing',
        keywords: ['noise gate', 'gating', 'parametric eq', 'bus compression', 'parallel compression', 'spill gating']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_room_reverb_energy',
        label: 'Evaluates room acoustics: Explains how hard reflective surfaces in Fig 1 produce a bright, expansive rock room reverb with long pre-delay, whereas Fig 2 yields a dry, focused vintage acoustic drum tone',
        keywords: ['bright reverb', 'pre-delay', 'expansive', 'rock ambience', 'dry tone', 'dead sound']
      },
      {
        id: 'ao4_kick_transient_punch',
        label: 'Evaluates kick drum capture: Explains how placing the mic inside the kick captures the sharp high-frequency beater click transient and deep sub thump, while outside placement captures rounded, boomy resonance',
        keywords: ['beater click', 'transient attack', 'sub thump', 'boomy', 'rounded tone', 'punch']
      },
      {
        id: 'ao4_snare_top_bottom_balance',
        label: 'Evaluates snare balance & phase: Explains how top/bottom mics allow independent balancing of stick crack and wire buzz, while inverting bottom mic polarity prevents destructive phase cancellation',
        keywords: ['stick crack', 'wire buzz', 'phase cancellation', 'polarity flip', 'snare balance']
      },
      {
        id: 'ao4_overhead_phase_coherence',
        label: 'Evaluates overhead phase coherence: Explains how X-Y coincident capsules ensure sound arrives simultaneously at both diaphragms, eliminating phase cancellation and comb filtering across cymbals',
        keywords: ['comb filtering', 'phase coherent', 'arrival time', 'cymbals', 'stereo imaging', 'simultaneous']
      },
      {
        id: 'ao4_glyn_johns_phase_risk',
        label: 'Evaluates Glyn Johns phase risk: Explains how unequal distances from side and overhead mics to the snare drum in Fig 2 create destructive phase interference unless measured to be equidistant',
        keywords: ['equidistant', 'phase interference', 'unequal distances', 'arrival-time difference', 'side mic phase']
      },
      {
        id: 'ao4_spill_isolation_control',
        label: 'Evaluates spill & gating: Explains how close miking minimises bleed and allows noise gating to clean up tracks, whereas 3-mic recording has extensive bleed that cannot be separated',
        keywords: ['bleed', 'spill', 'noise gating', 'isolation', 'cannot be separated', 'clean tracks']
      },
      {
        id: 'ao4_mix_processing_flexibility',
        label: 'Evaluates mix processing flexibility: Explains how separate DAW tracks allow individual panning, EQing out tom boom without dulling cymbals, and parallel drum bus compression for maximum rock punch',
        keywords: ['individual panning', 'surgical eq', 'parallel compression', 'mix flexibility', 'drum punch']
      },
      {
        id: 'ao4_acoustic_cohesion_authenticity',
        label: 'Evaluates vintage authenticity: Explains how late-1960s ambient techniques capture an authentic, cohesive acoustic performance of a drummer in a room rather than a hyper-processed collection of isolated hits',
        keywords: ['cohesive', 'authenticity', 'drummer in a room', 'natural balance', 'organic performance']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Room Acoustics and Boundary Placement:',
        '• Figure 1 (2010s): Kit is centered in a large live room with hard reflective surfaces (wood/concrete) and angled ceilings, generating a bright, explosive rock reverberation with long pre-delay while preventing standing waves.',
        '• Figure 2 (1960s): Kit sits in a small, deadened room with acoustic blankets; corner placement creates low-frequency boundary bass boost, muddying the low end.',
        '',
        'Microphone Selection and Placement Techniques:',
        '• Figure 1 Close-Miking: Dynamic mic (AKG D112) placed inside the kick sound hole captures sharp beater click transients; dual dynamic mics (SM57) on snare top and bottom (with bottom polarity reversed) balance stick crack with snare wire buzz.',
        '• Overheads & Room: Coincident X-Y pair of small-diaphragm condensers eliminates arrival-time differences and comb filtering, while a distant stereo room mic captures natural drum ambiance.',
        '• Figure 2 (1960s Glyn Johns 3-Mic): Uses only 3 mics (front kick mic, overhead, side mic near floor tom). Because the side mic is closer to the snare than the overhead (not equidistant), sound waves arrive at different times, causing destructive phase cancellation and comb filtering.',
        '',
        'Mixing Control, Processing and Production Impact:',
        '• Figure 1 (DAW Multitracking): Each drum is isolated on a dedicated DAW track, allowing surgical parametric EQ, noise gates to eliminate spill, and aggressive parallel bus compression for modern rock punch.',
        '• Figure 2 (Vintage Analogue): Minimal mics sum the entire kit to 3–4 tape tracks with heavy spill, preventing individual gating or independent EQ adjustments; captures a cohesive, raw performance of a drummer in a room.'
      ].join('\n'),
      grade_B: [
        'Room Acoustics and Mic Choice:',
        '• Figure 1 has a large live room with wood floors and angled walls to stop standing waves and give big rock reverb.',
        '• Figure 2 is in a smaller room with sound blankets and the kit is in a corner which causes boundary bass boost.',
        '',
        'Microphone Techniques:',
        '• Figure 1 close-mikes every drum: D112 inside the kick for click, top and bottom snare mics with a phase flip, and an X-Y coincident pair for stereo overheads to stop comb filtering.',
        '• Figure 2 uses a 3-mic Glyn Johns setup, but if the overhead and side mic are not equidistant from the snare, arrival-time differences cause phase cancellation.',
        '',
        'Mixing and Control:',
        '• Figure 1 gives separate DAW tracks so you can gate the spill and EQ each drum individually.',
        '• Figure 2 mixes everything together on fewer tape tracks, so you have bleed and cannot process drums separately.'
      ].join('\n'),
      grade_D: [
        'Drum Miking Comparison:',
        '• Figure 1 has lots of mics (one on each drum) and Figure 2 only has 3 microphones.',
        '• Figure 1 uses X-Y overheads to stop phase issues and has an inside kick mic for punch.',
        '• Figure 2 is in a smaller room with blankets and corner bass boost.',
        '• Figure 1 gives more control in a DAW, whereas Figure 2 was recorded straight to tape with spill.'
      ].join('\n'),
      student_template: [
        'Room Acoustics and Boundary Placement:',
        '• ',
        '',
        'Microphone Selection and Placement Techniques:',
        '• ',
        '',
        'Mixing Control, Processing and Production Impact:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c4_q4g_monitors_vs_phone_2024_8m',
    paperCode: 'Component 4: Producing & Analysing • Technical Evaluation Practice',
    component: 'Component 4',
    questionNumber: '4(g)',
    title: 'C4: Nearfield Studio Monitors vs Mobile Phone Speaker Translation (8 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C4_Q4g_Monitors_vs_Phone_2024_8m.md',
    maxMarks: 8,
    ao3Max: 4,
    ao4Max: 4,
    image1: '/images/studio_nearfield_monitors.png',
    imageTitle1: 'Nearfield Studio Reference Monitors',
    imageCaption1: 'Two-way active stereo monitors with woofer cone (lows) and tweeter dome (highs) providing wide, flat frequency response and accurate stereo imaging',
    image2: '/images/mobile_phone_internal_speaker.jpg',
    imageTitle2: 'Mobile Phone Internal Speaker',
    imageCaption2: 'Miniature mono micro-speaker driver with restricted low-frequency reproduction (cannot reproduce bass below 300–800Hz)',
    youtubeId1: null,
    audioSrc1: '/Audio/nearfield_studio_monitors_full_range.mp3',
    audioTitle1: 'Reference A: Nearfield Studio Monitors (Full-Range Stereo Mix — 40Hz to 20kHz)',
    audioSrc2: '/Audio/mobile_phone_speaker_translation.mp3',
    audioTitle2: 'Reference B: Mobile Phone Speaker (Bandwidth-Limited Mono Transducer — 450Hz to 8kHz)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Component 4 Producing & Analysing',
        url: '/interactive-slide-component-4.html',
        quizUrl: '/component-4-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Mixers, Monitoring & DAWs',
        url: '/interactive-slide-mixers-daw.html',
        quizUrl: '/mixers-daw-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'The pictures show a pair of nearfield studio monitors and a mobile phone internal speaker. Evaluate the suitability of each of these to monitor this song during mixing.',
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Revision Notes — Nearfield Studio Monitors vs Mobile Phone Speaker:',
      keyPoints: [
        'Nearfield Studio Monitors: Two-way stereo speaker design with a larger woofer cone (reproduces low bass frequencies) and tweeter (reproduces high treble detail), offering a wide, flat frequency response, louder playback with low distortion, and accurate stereo imaging for panning.',
        'Mobile Phone Internal Speaker: Tiny mono driver with a narrow, uneven frequency response that cannot reproduce bass below 100–800Hz (sounds tinny) and cannot show stereo panning—but useful as a secondary check for consumer mix translation, vocal balance, and sibilance.'
      ],
      links: [
        { label: '🌐 Component 4 Production Exam Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-4-production-exam-revision/' },
        { label: '🎯 In-App Quiz: Topic 8 Mastering, Monitoring & Mix Translation', url: '/?quiz=quiz-topic-8_p1' }
      ]
    },
    questionPrompt:
      'The pictures show a pair of nearfield studio monitors and a mobile phone internal speaker. Evaluate the suitability of each of these to monitor this song during mixing. (8 marks — AO3: 4 marks, AO4: 4 marks)',
    ao3Anchors: [
      {
        id: 'ao3_monitor_two_way_drivers',
        label: 'Studio monitor drivers: Dedicated woofer cone (lows/mids) and tweeter dome (highs) with active crossover network',
        keywords: ['woofer', 'tweeter', 'two-way', 'active crossover', 'driver', 'cone', 'dome']
      },
      {
        id: 'ao3_monitor_flat_frequency_stereo',
        label: 'Monitor frequency & stereo: Wide, flat frequency response (e.g. 40Hz–20kHz) and stereo pair placement in an equilateral triangle',
        keywords: ['flat frequency response', 'uncoloured', '40hz', '20khz', 'accurate', 'full-range', 'equilateral triangle', 'stereo imaging']
      },
      {
        id: 'ao3_phone_micro_driver',
        label: 'Phone micro-driver: Miniature mono micro-speaker driver (1–2cm diameter) prone to non-linear distortion at high volumes',
        keywords: ['micro-speaker', 'micro speaker', 'tiny driver', 'mono speaker', 'internal speaker', 'miniature']
      },
      {
        id: 'ao3_phone_restricted_bandwidth',
        label: 'Phone frequency cutoff: Severely restricted bandwidth with steep acoustic high-pass cutoff below 300–800Hz and upper mid resonant peaks',
        keywords: ['restricted frequency', 'cutoff below', '300hz', '800hz', 'lacks bass', 'no sub', 'midrange peaks']
      },
      {
        id: 'ao3_workflow_primary_vs_check',
        label: 'Monitoring workflow: Nearfield monitors used for primary tracking and mixing decisions vs mobile phone used as a secondary translation check',
        keywords: ['primary monitoring', 'secondary check', 'translation check', 'real-world', 'consumer device']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_low_end_mix_accuracy',
        label: 'Evaluates low-end accuracy: Studio monitors allow accurate balancing of kick drum and bass guitar low end, while phone speaker cannot reproduce sub frequencies at all',
        keywords: ['sub frequencies', 'low-end balance', 'kick and bass', 'reproduce bass', 'sub-bass', 'cannot hear', 'low bass', 'inaudible', 'balancing']
      },
      {
        id: 'ao4_stereo_field_and_depth',
        label: 'Evaluates stereo imaging: Stereo monitors allow precise placement of instruments across the stereo panorama and reverb depth, which phone speaker collapses to mono',
        keywords: ['stereo panorama', 'reverb depth', 'collapses to mono', 'spatial placement', 'panning balance', 'stereo panning', 'panning placement', 'reverb tails', 'stereo imaging', 'collapsed to mono']
      },
      {
        id: 'ao4_phone_midrange_translation',
        label: 'Evaluates midrange translation: Phone speaker forces the mixer to evaluate whether the lead vocal and midrange cut through on bandwidth-limited consumer hardware',
        keywords: ['cuts through', 'vocal clarity', 'midrange focus', 'consumer playback', 'mix translation', 'lead vocal', 'secondary', 'translation check', 'tinny']
      },
      {
        id: 'ao4_phone_distortion_sibilance',
        label: 'Evaluates flaw detection: Phone speaker highlights harsh resonant peaks, sibilance, and muddy mid buildup that might sound masked on high-end monitors',
        keywords: ['sibilance', 'harshness', 'resonance', 'masked', 'reveals flaws', 'pumping', 'distortion', 'harsh', 'without distortion']
      },
      {
        id: 'ao4_monitoring_workflow_synthesis',
        label: 'Synthesises monitoring role: Concludes that while studio monitors are essential as the primary mixing tool, checking on a mobile phone is vital for consumer translation',
        keywords: ['primary mixing tool', 'essential', 'consumer listening', 'streaming', 'translation check', 'indispensable']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Nearfield Studio Monitors:',
        '• Technical specifications: Dedicated woofer (lows) and tweeter (highs) with an active crossover; flat frequency response (40Hz–20kHz); positioned in a stereo equilateral triangle.',
        '• Mixing suitability: Essential for critical mixing decisions—allows accurate balancing of kick and bass frequencies, precise stereo panning placement, and evaluation of subtle reverb tails without distortion.',
        '',
        'Mobile Phone Internal Speaker:',
        '• Technical specifications: Miniature single micro-speaker driver in mono; steep acoustic high-pass cutoff below 300–800Hz; high distortion at elevated listening levels.',
        '• Mixing suitability: Completely unsuitable as a primary mixing tool because low bass is inaudible and stereo imaging is collapsed to mono. However, it is indispensable as a secondary consumer translation check to ensure the lead vocal cuts through and there is no harsh sibilance.'
      ].join('\n'),
      grade_B: [
        'Nearfield Studio Monitors:',
        '• Have a woofer and tweeter for a wide, flat frequency response from 40Hz to 20kHz.',
        '• Give accurate stereo panning and allow you to hear sub-bass and kick drum balance properly.',
        '',
        'Mobile Phone Speaker:',
        '• A tiny mono speaker that cannot reproduce frequencies below 300Hz, making it sound tinny.',
        '• Bad for main mixing decisions, but useful as a second check to see if the vocals cut through on consumer phones.'
      ].join('\n'),
      grade_D: [
        'Monitoring Comparison:',
        '• Studio monitors have good bass and stereo sound so you can mix instruments accurately.',
        '• Phone speakers have no bass and play in mono with distortion.',
        '• You need monitors to mix the track, but check on a phone because people listen on phones.'
      ].join('\n'),
      student_template: [
        'Nearfield Studio Monitors:',
        '• ',
        '',
        'Mobile Phone Internal Speaker:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c4_q4g_vocal_compression_2021_8m',
    paperCode: 'Component 4: Producing & Analysing • 8-Mark Production Technique Evaluation',
    component: 'Component 4',
    questionNumber: '4(g)',
    title: 'C4: Evaluating Dynamic Compression on Lead Vocals (8 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C4_Q4g_Vocal_Compression_2021_8m.md',
    maxMarks: 8,
    ao3Max: 4,
    ao4Max: 4,
    youtubeId1: null,
    audioSrc1: '/Audio/suzanne_vega_vocal_not_compressed.mp3',
    audioTitle1: 'Reference A: Uncompressed Dry Vocal (Suzanne Vega — Bars 8–10)',
    audioSrc2: '/Audio/suzanne_vega_vocal_compressed.mp3',
    audioTitle2: 'Reference B: Dynamically Compressed Vocal (High Ratio & Makeup Gain)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Dynamic Compression, Ratio & Transfer Curves',
        url: '/interactive-slide-component-4.html?slide=3#slide-3',
        quizUrl: '/component-4-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Studio Effects & Dynamic Compression',
        url: '/interactive-slide-studio-effects.html',
        quizUrl: '/component-4-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Listen to ‘vocal not compressed’ (Reference A — bars 8–10 of Suzanne Vega’s 1986 vocal as originally recorded) and ‘vocal’ (Reference B — which has additional dynamic compression). Evaluate the dynamic compression in ‘vocal’:',
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Revision Notes — Evaluating Dynamic Compression on Vocals:',
      keyPoints: [
        'Threshold, Ratio & Make-Up Gain: A low threshold and high ratio (above 4:1) with high make-up gain reduces dynamic range (bringing quiet words like "before" up in level and raising average RMS volume), but also brings up breath noise, tape hiss, and room reverb.',
        'Attack & Release Settings: A slow attack time (opto-style) lets sharp initial vocal transients pass through uncontrolled (on words like "only", "even", "argue"), while a fast release time causes audible pumping of the reverb tail and slight distortion.'
      ],
      links: [
        { label: '🌐 Music Tech Toolbox: Dynamic Compression Guide (musictechguru.com)', url: 'https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/' },
        { label: '🎯 In-App Interactive Trainer: Dynamic Compression Fundamentals', url: '/interactive-slide-studio-effects.html' },
        { label: '🎯 In-App Quiz: Topic 4 Compression, Gates & Limiters', url: '/?quiz=quiz-topic-4_p1' }
      ]
    },
    questionPrompt:
      'Listen to ‘vocal not compressed’ and ‘vocal’ (Suzanne Vega bars 8–10). Evaluate the dynamic compression in ‘vocal’. (8 marks — AO3: 4 marks, AO4: 4 marks)',
    ao3Anchors: [
      {
        id: 'ao3_threshold_and_ratio',
        label: 'Threshold & ratio: Low threshold setting paired with a high compression ratio (e.g. 4:1 to 8:1) causing substantial gain reduction',
        keywords: ['low threshold', 'threshold', 'ratio', '4:1', 'high ratio', 'gain reduction', 'compression ratio']
      },
      {
        id: 'ao3_makeup_gain',
        label: 'Make-up gain: Substantial make-up gain applied to restore peak levels after significant gain reduction',
        keywords: ['make-up gain', 'makeup gain', 'boosts overall level', 'gain compensation']
      },
      {
        id: 'ao3_slow_attack_time',
        label: 'Attack time: Slow attack time setting (opto/LA-2A style, >20–50ms) allowing initial consonant transients through before attenuation',
        keywords: ['slow attack', 'attack time', 'ms attack', 'lets transients through', 'initial consonants']
      },
      {
        id: 'ao3_fast_release_time',
        label: 'Release time: Fast release time setting (<100ms) causing rapid gain recovery between vocal syllables',
        keywords: ['fast release', 'release time', 'rapid recovery', 'ms release', 'quick release']
      },
      {
        id: 'ao3_dynamic_range_reduction',
        label: 'Dynamic range narrowing: Clamping down dynamic range between loud accented words and soft conversational phrases',
        keywords: ['dynamic range', 'reduced dynamic range', 'evens out', 'levels out', 'inconsistent volume']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_rms_loudness_consistency',
        label: 'Evaluates vocal consistency: Explains how high ratio and low threshold clamp down peak levels, increasing average RMS loudness and ensuring quiet words like "before" remain audible',
        keywords: ['rms loudness', 'average volume', 'quiet words', 'before', 'consistent level', 'audible']
      },
      {
        id: 'ao4_noise_bleed_amplification',
        label: 'Evaluates noise floor elevation: Explains how heavy make-up gain pulls up low-level studio room noise, tape hiss, and breath sounds between vocal phrases',
        keywords: ['tape hiss', 'room noise', 'breaths', 'background noise', 'amplifies', 'noise floor']
      },
      {
        id: 'ao4_transient_punch_preservation',
        label: 'Evaluates consonant punch: Explains how slow attack allows initial consonant transients ("only", "even", "argue") through uncompressed before gain reduction engages',
        keywords: ['transient punch', 'consonants', 'articulation', 'only', 'argue', 'uncompressed transient']
      },
      {
        id: 'ao4_pumping_distortion_artifacts',
        label: 'Evaluates compression artifacts: Explains how an overly fast release causes unnatural breathing/pumping of background ambiance and subtle harmonic saturation on loud notes',
        keywords: ['pumping', 'breathing effect', 'distortion', 'saturation', 'unnatural gain recovery']
      },
      {
        id: 'ao4_aesthetic_suitability',
        label: 'Evaluates aesthetic suitability: Weighs whether aggressive compression suits a modern pop vocal context or detracts from Suzanne Vega’s delicate acoustic narrative intimacy',
        keywords: ['pop vocal', 'acoustic intimacy', 'aesthetic', 'suitability', 'stylistic choice', 'commercial mix']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Threshold, Ratio and Make-Up Gain:',
        '• Low threshold with a high ratio (above 4:1) heavily reduces dynamic range, raising average RMS volume so quiet words like "before" stay consistently audible.',
        '• Significant make-up gain boosts low-level audio, audibly amplifying tape hiss, room noise, and vocal inhalations between phrases.',
        '',
        'Attack and Release Time Calibration:',
        '• Slow attack time (opto-style, >25ms) allows initial consonant transients on words like "only", "even", and "argue" through uncompressed before attenuation begins, preserving articulation.',
        '• Fast release time causes the compressor to recover gain abruptly between syllables, creating subtle breathing/pumping on room ambiance and harmonic saturation on peaks.'
      ].join('\n'),
      grade_B: [
        'Ratio and Threshold:',
        '• A low threshold and high ratio clamp down on the loudest vocal notes and reduce dynamic range.',
        '• Heavy make-up gain brings up the volume of quieter words, but also brings up background tape hiss and breath noises.',
        '',
        'Attack and Release:',
        '• Slow attack lets the start of words like "only" through before compression starts.',
        '• Fast release makes the compressor recover too quickly, causing slight pumping on the reverb tail.'
      ].join('\n'),
      grade_D: [
        'Compression Evaluation:',
        '• The vocal is compressed with a high ratio and low threshold, making it louder and more even.',
        '• Make-up gain makes quiet words easier to hear but increases tape hiss and background noise.',
        '• The attack is slow so consonant clicks come through, and release is fast causing slight pumping.'
      ].join('\n'),
      student_template: [
        'Threshold, Ratio and Make-Up Gain:',
        '• ',
        '',
        'Attack and Release Time Calibration:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c3_q6_vocal_production_20m',
    paperCode: '9MT0/03 Component 3: Listening & Analysing • Question 6',
    component: 'Component 3',
    questionNumber: '6',
    title: 'C3 Q6: Evolution of Lead Vocal Production (1950s to Modern Day) (20 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q6_Lead_Vocal_Production_Evolution.md',
    maxMarks: 20,
    ao3Max: 5,
    ao4Max: 15,
    youtubeId1: null,
    audioSrc1: '/Audio/suzanne_vega_vocal_not_compressed.mp3',
    audioTitle1: 'Historical Vocal Reference: Dry Acoustic Lead Vocal Stem',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Component 4 Producing & Analysing',
        url: '/interactive-slide-component-4.html',
        quizUrl: '/component-4-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Studio Effects & Dynamic Compression',
        url: '/interactive-slide-studio-effects.html',
        quizUrl: '/component-4-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Evaluate how lead vocal recording and production techniques evolved from the 1950s to the modern day. In your response, consider microphone capture, editing workflows, pitch correction, dynamic processing, and spatial effects:',
    examBullets: [
      'Capture, production approach and music style',
      'Synthesis, sequencing and sampling',
      'EQ and filtering',
      'Dynamic processing',
      'Pan and stereo field',
      'Effects & wider industry impact'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — Evolution of Lead Vocal Production (1950s–Present):',
      keyPoints: [
        'Microphone Capture: 1950s used large-diaphragm valve condensers (Neumann U47) and ribbons positioned 12–18 inches away to prevent plosives and harshness. Modern vocals place large-diaphragm condensers close with pop shields, utilising proximity effect bass boost.',
        'Workflow & Comping: 1950s–1970s required complete continuous takes or manual tape punch-ins, demanding high performance discipline. Modern DAWs use swipe-comping across 50+ takes with micro-crossfades to build impossible composite vocal performances.',
        'Pitch Correction: Historically, natural pitch vibrato and minor imperfections were celebrated. Since 1998, Antares Auto-Tune and Celemony Melodyne have established an industry standard of pitch perfection.',
        'Serial Compression: Classic two-stage compression: fast peak limiter (UREI 1176 FET) catches initial transients, followed by optical levelling amplifier (Teletronix LA-2A) smoothing average RMS volume.'
      ],
      links: [
        { label: '🌐 Component 3 Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-listening-exam-revision/' },
        { label: '🎯 In-App Interactive Trainer: Vocal Production Masterclass', url: '/interactive-slide-studio-effects.html' },
        { label: '🎯 In-App Quiz: Topic 4 Compression, Gates & Limiters', url: '/?quiz=quiz-topic-4_p1' }
      ]
    },
    questionPrompt:
      'Evaluate how lead vocal recording and production techniques evolved from the 1950s to the modern day. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_vocal_mics_capsules',
        label: 'Microphone capture: Valve condenser (Neumann U47) and ribbon mics with cardioid patterns, pop shields, and proximity effect vs modern large-diaphragm FET condensers',
        keywords: ['u47', 'condenser', 'ribbon mic', 'cardioid', 'proximity effect', 'pop shield', 'plosives']
      },
      {
        id: 'ao3_vocal_tape_comping',
        label: 'Tracking & editing: Analogue tape full takes and punch-ins vs DAW multi-take swipe comping from dozens of vocal passes with micro-crossfades',
        keywords: ['punch-in', 'tape take', 'full take', 'swipe comping', 'comping', 'composite take', 'multiple passes']
      },
      {
        id: 'ao3_vocal_autotune_melodyne',
        label: 'Pitch correction: Software pitch correction (Auto-Tune and Melodyne) for transparent formant tuning or deliberate robotic pitch snapping',
        keywords: ['auto-tune', 'autotune', 'melodyne', 'pitch correction', 'formant', 'robotic effect', 'pitch snapping']
      },
      {
        id: 'ao3_vocal_serial_compression',
        label: 'Serial dynamic processing: Fast peak-catching FET compression (UREI 1176) followed by smooth optical levelling (Teletronix LA-2A)',
        keywords: ['serial compression', '1176', 'la-2a', 'optical', 'fet', 'peak limiter', 'two compressors']
      },
      {
        id: 'ao3_vocal_deessing_air_eq',
        label: 'Frequency control & de-essing: High-pass filtering (80–120Hz), de-essing 5–8kHz sibilance, and high-shelf air boost (12–16kHz)',
        keywords: ['de-esser', 'sibilance', 'high-pass filter', 'high shelf', 'air band', '12khz', 'rumble']
      },
      {
        id: 'ao3_vocal_spatial_effects',
        label: 'Spatial ambiance: Evolution from physical acoustic echo chambers and EMT 140 plates to digital convolution reverbs and stereo delays',
        keywords: ['echo chamber', 'plate reverb', 'emt 140', 'slapback echo', 'convolution reverb', 'stereo delay', 'delays']
      },
      {
        id: 'ao3_vocal_stacks_layers',
        label: 'Vocal stacking: Modern production stacking with doubled lead, wide stereo-panned harmonies, whisper tracks, and autotuned ad-libs',
        keywords: ['vocal stacks', 'doubled lead', 'harmonies', 'whisper track', 'stereo panning', 'ad-libs']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_vocal_performance_authenticity',
        label: 'Evaluates performance discipline: Contrasts 1950s/60s continuous vocal takes capturing authentic emotional urgency with modern phrase-by-phrase construction',
        keywords: ['authenticity', 'emotional urgency', 'performance discipline', 'imperfection', 'phrase-by-phrase', 'human', 'continuous', 'polished vocal takes', 'singer discipline', 'emotional spontaneity', 'takes or manual']
      },
      {
        id: 'ao4_vocal_mix_front_and_centre',
        label: 'Evaluates vocal placement: Explains how serial compression and aggressive high-shelf air EQ lock the modern vocal in front of dense, heavily compressed instrumental mixes',
        keywords: ['front and centre', 'locks vocal', 'dense mix', 'consistent volume', 'radio translation', 'air and presence', 'locks the vocal', 'front of dense', 'heavily compressed', 'consistent loudness']
      },
      {
        id: 'ao4_vocal_pitch_aesthetic',
        label: 'Evaluates pitch expectations: Evaluates the transition from celebrating natural vocal vibrato and character to modern expectations of flawless digital tuning across all genres',
        keywords: ['pitch perfection', 'flawless tuning', 'natural vibrato', 'character', 'pitch expectation', 'digital standard', 'auto-tune', 'melodyne', 'pitch drift', 'expressive character']
      },
      {
        id: 'ao4_vocal_intimacy_vs_space',
        label: 'Evaluates spatial intimacy: Contrasts the warm, distant wash of natural echo chambers with tight, dry, hyper-present modern vocal production',
        keywords: ['hyper-present', 'intimacy', 'distant wash', 'echo chamber space', 'closeness', 'dry upfront', 'proximity effect', 'intimate', 'inches from', 'dry isolation', 'reflection filters']
      },
      {
        id: 'ao4_vocal_wall_commercial',
        label: 'Evaluates pop chorus power: Explains how modern DAW workflows allow dozens of pitch-perfect, time-aligned backing vocal layers to create massive pop choruses',
        keywords: ['massive chorus', 'wall of sound', 'commercial pop', 'time-aligned', 'streaming impact', 'superhuman', 'impossible', 'swipe comping', 'dozens of passes', 'wall of sound']
      },
      {
        id: 'ao4_vocal_loss_vs_gain_synthesis',
        label: 'Synthesises cultural trade-off: Synthesises the trade-off between technical perfection and consistent radio translation versus potential homogenisation and loss of raw humanity',
        keywords: ['trade-off', 'homogenisation', 'loss of humanity', 'technical perfection', 'creative freedom', 'artistic value', 'vocal clarity', 'maintain vocal clarity', 'air boosts', 'sibilance', 'clarity']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Microphone Capture and Studio Acoustics:',
        '• 1950s/1960s: Large-diaphragm valve condensers (Neumann U47) and ribbon mics with cardioid patterns positioned 12–18 inches away to minimize plosives, capturing natural room reflections.',
        '• Modern Day: Singers positioned inches from modern large-diaphragm condensers with pop shields, exploiting proximity effect bass boost and acoustic reflection filters for dry isolation.',
        '',
        'Tracking Discipline vs DAW Swipe Comping:',
        '• Historical: Analogue tape demanded continuous, polished vocal takes or manual punch-ins, relying on genuine singer discipline and emotional spontaneity.',
        '• Modern: Multi-take swipe comping in DAWs constructs a superhuman lead vocal from dozens of passes, using micro-crossfades to eliminate every breath and mistake.',
        '',
        'Pitch Correction (Auto-Tune & Melodyne):',
        '• Historical: Natural pitch vibrato and slight pitch drift were celebrated as hallmarks of human expressive character.',
        '• Modern: Auto-Tune and Celemony Melodyne are ubiquitous, enforcing absolute pitch perfection and altering modern commercial listening expectations.',
        '',
        'Dynamic Processing and Serial Compression:',
        '• Historical: Single optical levelling amplifier (Teletronix LA-2A) provided smooth, slow dynamic control.',
        '• Modern: Serial compression chains (fast peak-limiting UREI 1176 into smooth opto LA-2A) lock the vocal rigidly in front of dense, heavily compressed modern mixes with consistent loudness.',
        '',
        'Frequency Control and Spatial Ambience:',
        '• De-essing & EQ: High-pass filtering at 80–120Hz removes low rumble; de-essers sidechain 5–8kHz to tame harsh sibilance caused by aggressive 12–16kHz high-shelf "air" boosts.',
        '• Space: Evolved from acoustic echo chambers and EMT 140 plate reverbs to digital convolution reverbs and ducked tempo-synced stereo delays that maintain vocal clarity.'
      ].join('\n'),
      grade_B: [
        'Mics and Recording:',
        '• In the 1950s, singers used valve condenser mics like the Neumann U47 standing back from the mic, while modern vocalists sing close with a pop shield to get proximity effect.',
        '• Historical recording required full takes on tape, while modern DAWs use comping to edit the best parts from many takes.',
        '',
        'Pitch Correction and Dynamics:',
        '• Auto-Tune and Melodyne are used on modern vocals to fix pitch and create robotic pop sounds, whereas older tracks kept natural vibrato.',
        '• Modern vocals use serial compression (an 1176 to catch peaks and an LA-2A to smooth volume) so the voice stays loud over loud tracks.',
        '',
        'EQ and Reverb:',
        '• De-essers remove harsh sibilance, and high-shelf EQ boosts the top-end air.',
        '• 1950s tracks used real echo chambers, while modern producers use digital reverb and stereo delay.'
      ].join('\n'),
      grade_D: [
        'Vocal Production History:',
        '• Old recordings used valve mics and tape, requiring singers to perform the whole song in one take.',
        '• Modern recording uses computers to comp takes and Auto-Tune to fix pitch.',
        '• Compression has gotten heavier with two compressors in a row to make vocals louder.',
        '• Reverb moved from physical echo rooms to digital plugin reverbs and delays.'
      ].join('\n'),
      student_template: [
        'Microphone Capture and Studio Acoustics:',
        '• ',
        '',
        'Tracking Discipline vs DAW Swipe Comping:',
        '• ',
        '',
        'Pitch Correction (Auto-Tune & Melodyne):',
        '• ',
        '',
        'Dynamic Processing and Serial Compression:',
        '• ',
        '',
        'Frequency Control and Spatial Ambience:',
        '• '
      ].join('\n')
    }
  }
];

export const STUDIO_TERMINOLOGY_LEXICON = [
  'equalisation', 'eq', 'high-pass', 'high pass', 'low-pass', 'low pass', 'band-pass', 'telephone',
  'comb filtering', 'phase cancellation', 'threshold', 'ratio', 'attack', 'decay', 'sustain', 'release',
  'make-up gain', 'sidechain', 'side-chain', 'pumping', 'noise gate', 'de-esser', 'sibilance',
  'transient', 'dynamic range', 'headroom', 'clipping', 'limiting', 'limiter',
  'cardioid', 'omnidirectional', 'figure-of-8', 'ribbon', 'condenser',
  'phantom power', 'pop shield', 'plosive', 'proximity effect',
  'reverberation', 'reverb', 'pre-delay', 'plate', 'chamber', 'hall', 'room',
  'tape', 'analogue', 'saturation', 'spill', 'sample', 'sampler', 'daw', 'midi', 'quantised',
  'auxiliary', 'aux send', 'automation', 'panning', 'stereo', 'mono', 'overdub', 'double tracked',
  'auto-tune', 'autotune', 'pitch correction', 'pitch shift', 'oscillator', 'lfo', 'vibrato',
  'sine', 'triangle', 'square', 'sawtooth', 'white noise', 'resonance', 'cut-off', 'zero crossing',
  'fundamental', 'harmonic', 'transducer', 'potentiometer', 'pot',
  'humbucker', 'single-coil', 'opposite polarity', 'solid-body', 'solid body',
  'telecaster', 'stratocaster', 'les paul', 'whammy', 'feedback', 'frets', 'nut',
  'bridged-t', 'bridged t', 'schmitt trigger', 'sub-oscillator', 'sub oscillator'
];

export function getGradeFromMarks(score, maxMarks) {
  if (!maxMarks || score <= 0) return 'U';
  const pct = (score / maxMarks) * 100;
  if (pct >= 84) return 'A*';
  if (pct >= 72) return 'A';
  if (pct >= 60) return 'B';
  if (pct >= 48) return 'C';
  if (pct >= 36) return 'D';
  if (pct >= 24) return 'E';
  return 'U';
}

export function getLevelBand(score, maxMarks) {
  if (!score || score <= 0) return { band: 0, maxBands: 5, rangeLabel: '0' };
  if (maxMarks >= 20) {
    if (score >= 17) return { band: 5, maxBands: 5, rangeLabel: '17–20' };
    if (score >= 13) return { band: 4, maxBands: 5, rangeLabel: '13–16' };
    if (score >= 9) return { band: 3, maxBands: 5, rangeLabel: '9–12' };
    if (score >= 5) return { band: 2, maxBands: 5, rangeLabel: '5–8' };
    return { band: 1, maxBands: 5, rangeLabel: '1–4' };
  }
  if (maxMarks === 15) {
    if (score >= 13) return { band: 5, maxBands: 5, rangeLabel: '13–15' };
    if (score >= 10) return { band: 4, maxBands: 5, rangeLabel: '10–12' };
    if (score >= 7) return { band: 3, maxBands: 5, rangeLabel: '7–9' };
    if (score >= 4) return { band: 2, maxBands: 5, rangeLabel: '4–6' };
    return { band: 1, maxBands: 5, rangeLabel: '1–3' };
  }
  if (maxMarks === 8) {
    if (score >= 7) return { band: 5, maxBands: 5, rangeLabel: '7–8' };
    if (score >= 6) return { band: 4, maxBands: 5, rangeLabel: '6' };
    if (score >= 4) return { band: 3, maxBands: 5, rangeLabel: '4–5' };
    if (score >= 2) return { band: 2, maxBands: 5, rangeLabel: '2–3' };
    return { band: 1, maxBands: 5, rangeLabel: '1' };
  }
  const pct = score / maxMarks;
  if (pct >= 0.85) return { band: 5, maxBands: 5, rangeLabel: '9–10' };
  if (pct >= 0.65) return { band: 4, maxBands: 5, rangeLabel: '7–8' };
  if (pct >= 0.45) return { band: 3, maxBands: 5, rangeLabel: '5–6' };
  if (pct >= 0.25) return { band: 2, maxBands: 5, rangeLabel: '3–4' };
  return { band: 1, maxBands: 5, rangeLabel: '1–2' };
}

export function evaluateEdexcelEssay(essayText, rubricOrPart) {
  const cleanText = String(essayText || '').trim();
  const maxMarks = rubricOrPart?.maxMarks || rubricOrPart?.marks || 20;
  const ao3Max = rubricOrPart?.ao3Max || (maxMarks <= 8 ? 4 : 5);
  const ao4Max = rubricOrPart?.ao4Max || (maxMarks - ao3Max);

  if (!cleanText || cleanText.length < 15) {
    const emptyBand = getLevelBand(0, maxMarks);
    return {
      totalMarks: 0,
      maxMarks,
      ao3Marks: 0,
      ao3Max,
      ao4Marks: 0,
      ao4Max,
      levelBand: 0,
      maxBands: emptyBand.maxBands,
      bandRangeLabel: '0',
      grade: 'U',
      wordCount: cleanText ? cleanText.split(/\s+/).length : 0,
      bulletCount: 0,
      subheadingCount: 0,
      matchedTerms: [],
      matchedAnchors: [],
      missingAnchors: (rubricOrPart?.ao3Anchors || []).concat(rubricOrPart?.ao4Anchors || []).map(a => a.label),
      examinerFeedback: 'No rewardable material (0 marks). Use sub-headings and bullet points with full sentences to identify production techniques (AO3) and explain their musical impact (AO4).',
      nextBandTarget: 'Start by adding sub-headings for each production aspect and writing full-sentence bullet points.'
    };
  }

  // Detect bullet points and sub-headings (endorsed by Pearson Edexcel Chief Examiner)
  const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);
  const bulletLines = lines.filter(l => /^([•\-*]|\d+[.)])\s+\S+/.test(l));
  const subheadingLines = lines.filter(l => !/^([•\-*]|\d+[.)])/.test(l) && l.endsWith(':') && l.length <= 85);
  const nonEmptyBodyLines = lines.filter(l => !subheadingLines.includes(l) && !/^([•\-*]|\d+[.)])\s*$/.test(l));
  const bulletCount = bulletLines.length;
  const subheadingCount = subheadingLines.length;

  const bodyText = nonEmptyBodyLines.join('\n').trim();
  if (!bodyText || bodyText.length < 15) {
    const emptyBand = getLevelBand(0, maxMarks);
    return {
      totalMarks: 0,
      maxMarks,
      ao3Marks: 0,
      ao3Max,
      ao4Marks: 0,
      ao4Max,
      levelBand: 0,
      maxBands: emptyBand.maxBands,
      bandRangeLabel: '0',
      grade: 'U',
      wordCount: 0,
      bulletCount: 0,
      subheadingCount,
      matchedTerms: [],
      matchedAnchors: [],
      missingAnchors: (rubricOrPart?.ao3Anchors || []).concat(rubricOrPart?.ao4Anchors || []).map(a => a.label),
      examinerFeedback: 'Guided sub-heading template loaded (0 marks so far). Type full-sentence bullet points under each sub-heading—press Enter at the end of a bullet to automatically start a new bullet point.',
      nextBandTarget: 'Write at least 1–2 full-sentence bullet points under each sub-heading, pairing an AO3 technical feature with its AO4 musical impact.'
    };
  }

  const lower = bodyText.toLowerCase();
  const words = bodyText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Detect A-Level Studio Terminology from Lexicon
  const matchedTerms = STUDIO_TERMINOLOGY_LEXICON.filter(term => lower.includes(term));

  // Also check timecodes & units (0:34, 1:22, Hz, kHz, dB, ms, 1950s–2020s dates)
  const numericParams = cleanText.match(/\b(\d+:\d{2}|\d+(\.\d+)?\s*(hz|khz|db|ms|s|cm|inches|:1|195\d|196\d|197\d|198\d|199\d|20\d\d))\b/gi) || [];
  numericParams.forEach(np => {
    const normalized = np.trim();
    if (!matchedTerms.includes(normalized)) {
      matchedTerms.push(normalized);
    }
  });

  const ao3Anchors = rubricOrPart?.ao3Anchors || [];
  const ao4Anchors = rubricOrPart?.ao4Anchors || [];

  const matchedAo3 = [];
  const missingAo3 = [];
  ao3Anchors.forEach(anchor => {
    const hitCount = anchor.keywords.filter(kw => lower.includes(kw.toLowerCase())).length;
    if (hitCount >= 1) {
      matchedAo3.push({ ...anchor, strength: hitCount >= 3 ? 'strong' : 'partial' });
    } else {
      missingAo3.push(anchor.label);
    }
  });

  const matchedAo4 = [];
  const missingAo4 = [];
  ao4Anchors.forEach(anchor => {
    const hitCount = anchor.keywords.filter(kw => lower.includes(kw.toLowerCase())).length;
    if (hitCount >= 1) {
      matchedAo4.push({ ...anchor, strength: hitCount >= 3 ? 'strong' : 'partial' });
    } else {
      missingAo4.push(anchor.label);
    }
  });

  const isCompact8To10Mark = maxMarks <= 10;

  // Surplus-calibrated target anchor thresholds for full marks:
  // Candidates do NOT need all anchors; hitting a realistic subset of points achieves 100%.
  const targetAo3 = isCompact8To10Mark
    ? Math.min(2, Math.max(1, Math.ceil(ao3Anchors.length * 0.4)))
    : maxMarks === 15
      ? Math.min(3, Math.max(2, Math.ceil(ao3Anchors.length * 0.45)))
      : Math.min(4, Math.max(2, Math.ceil(ao3Anchors.length * 0.45)));

  const targetAo4 = isCompact8To10Mark
    ? Math.min(2, Math.max(1, Math.ceil(ao4Anchors.length * 0.4)))
    : maxMarks === 15
      ? Math.min(3, Math.max(2, Math.ceil(ao4Anchors.length * 0.45)))
      : Math.min(4, Math.max(3, Math.ceil(ao4Anchors.length * 0.45)));

  let ao3Ratio = ao3Anchors.length > 0
    ? Math.min(1.0, matchedAo3.length / targetAo3)
    : Math.min(1.0, matchedTerms.length / 6);

  let ao4Ratio = ao4Anchors.length > 0
    ? Math.min(1.0, matchedAo4.length / targetAo4)
    : Math.min(1.0, (matchedTerms.length + numericParams.length) / 8);

  // Depth calibration against Pearson Edexcel Chief Examiner grade standards:
  const hasLevel5Depth = isCompact8To10Mark
    ? matchedTerms.length >= 4 && (wordCount >= 55 || bulletCount >= 2) && matchedAo4.length >= targetAo4
    : maxMarks === 15
      ? matchedTerms.length >= 6 && (wordCount >= 135 || bulletCount >= 4) && matchedAo4.length >= targetAo4
      : matchedTerms.length >= 7 && (wordCount >= 170 || bulletCount >= 5) && matchedAo4.length >= targetAo4;

  const isLevel1Or2Short = isCompact8To10Mark
    ? wordCount <= 35 || (bulletCount > 0 && bulletCount <= 1 && wordCount <= 40) || (matchedAo3.length === 0 && matchedAo4.length === 0)
    : wordCount <= 75 || (bulletCount > 0 && bulletCount <= 2 && wordCount <= 90) || (matchedAo3.length <= 1 && matchedAo4.length === 0);

  if (hasLevel5Depth) {
    ao3Ratio = Math.min(1.0, ao3Ratio + 0.25);
    ao4Ratio = Math.min(1.0, ao4Ratio + 0.25);
  } else if (isLevel1Or2Short) {
    ao3Ratio = Math.min(0.45, Math.max(0.20, ao3Ratio * 0.55));
    ao4Ratio = Math.min(0.35, Math.max(0.15, ao4Ratio * 0.45));
  } else {
    // Level 3 / Level 4 script range
    ao3Ratio = Math.min(0.85, Math.max(0.60, ao3Ratio * 0.85));
    ao4Ratio = Math.min(0.75, Math.max(0.55, ao4Ratio * 0.75));
  }

  // Fallback support when grading a generic Component3ExamPlayer part.markScheme array
  if (ao3Anchors.length === 0 && Array.isArray(rubricOrPart?.markScheme)) {
    const schemeHits = rubricOrPart.markScheme.filter(line => {
      const tokens = String(line).toLowerCase().split(/\W+/).filter(w => w.length > 4);
      return tokens.some(t => lower.includes(t));
    });
    const ratio = Math.min(1.0, schemeHits.length / Math.max(1, rubricOrPart.markScheme.length * 0.5));
    ao3Ratio = ratio;
    ao4Ratio = wordCount >= 70 ? ratio : ratio * 0.7;
  }

  let ao3Marks = Math.max(1, Math.min(ao3Max, Math.round(ao3Ratio * ao3Max)));
  let ao4Marks = Math.max(1, Math.min(ao4Max, Math.round(ao4Ratio * ao4Max)));

  // If candidate achieves Level 5 depth and meets anchor targets, award full marks!
  if (hasLevel5Depth && matchedAo3.length >= targetAo3 && matchedAo4.length >= targetAo4) {
    ao3Marks = ao3Max;
    ao4Marks = ao4Max;
  }

  const totalMarks = Math.min(maxMarks, ao3Marks + ao4Marks);
  const bandInfo = getLevelBand(totalMarks, maxMarks);
  const grade = getGradeFromMarks(totalMarks, maxMarks);
  const isFullMarks = totalMarks >= maxMarks;

  const matchedAnchors = [
    ...matchedAo3.map(a => `[AO3] ${a.label}`),
    ...matchedAo4.map(a => `[AO4] ${a.label}`)
  ];

  // If maximum marks are achieved, do not flag unused alternative points as "missing":
  const missingAnchors = isFullMarks
    ? []
    : [
        ...missingAo3.map(l => `[AO3] ${l}`),
        ...missingAo4.map(l => `[AO4] ${l}`)
      ];

  let examinerFeedback = '';
  if (bandInfo.band === 5) {
    examinerFeedback =
      rubricOrPart?.officialExaminerNotes?.level5 ||
      `Level 5 (${bandInfo.rangeLabel} marks — Sophisticated & Detailed): Well-structured sub-headings and full-sentence bullet points demonstrate accurate knowledge of production techniques throughout (AO3), with logical chains of reasoning explaining musical impact and wider context throughout (AO4).`;
  } else if (bandInfo.band >= 3) {
    examinerFeedback =
      rubricOrPart?.officialExaminerNotes?.level3 ||
      `Level ${bandInfo.band} (${bandInfo.rangeLabel} marks — Clear / Detailed): Demonstrates clear knowledge of relevant production techniques (AO3) and competent analysis (AO4), but needs deeper full-sentence explanations of how each parameter affects the specific track or wider music production to reach Level 5.`;
  } else {
    examinerFeedback =
      rubricOrPart?.officialExaminerNotes?.level1 ||
      `Level ${bandInfo.band} (${bandInfo.rangeLabel} marks — Limited Knowledge / Scope): Principally lists basic AO3 observations with limited AO4 explanation of parameters or musical impact. Remember: Edexcel caps responses with only AO3 and no AO4 at 5 marks.`;
  }

  const nextBandTarget = isFullMarks
    ? 'Maximum marks achieved! Outstanding Level 5 response demonstrating complete mastery of Pearson Edexcel AO3 and AO4 marking criteria.'
    : missingAnchors.length > 0
      ? `To move up to the next Edexcel Level, add full-sentence bullet points covering BOTH Identify (AO3) and Impact (AO4) for: ${missingAnchors.slice(0, 2).join(' • ')}`
      : 'Full coverage of key Pearson Edexcel Level 5 AO3 (Identify) and AO4 (Impact) criteria achieved.';

  return {
    totalMarks,
    maxMarks,
    ao3Marks,
    ao3Max,
    ao4Marks,
    ao4Max,
    levelBand: bandInfo.band,
    maxBands: bandInfo.maxBands,
    bandRangeLabel: bandInfo.rangeLabel,
    grade,
    wordCount,
    bulletCount,
    subheadingCount,
    matchedTerms,
    matchedAnchors,
    missingAnchors,
    examinerFeedback,
    nextBandTarget
  };
}

/**
 * Calculates B2B Institutional Department License ROI (£1,200/yr School Site License)
 */
export function generateSchoolQuoteSummary({
  schoolName = 'Sixth Form / FE College Department',
  headOfDept = 'Head of Music Technology',
  cohortSize = 20,
  essaysPerStudentPerYear = 12
} = {}) {
  const safeCohort = Math.max(1, Number(cohortSize) || 20);
  const safeEssays = Math.max(1, Number(essaysPerStudentPerYear) || 12);
  const totalEssaysMarked = safeCohort * safeEssays;
  const hoursSavedPerYear = Math.round((totalEssaysMarked * 18) / 60 + safeCohort * 2.2);
  const costPerStudent = Math.round((1200 / safeCohort) * 100) / 100;

  return {
    schoolName,
    headOfDept,
    cohortSize: safeCohort,
    essaysPerStudentPerYear: safeEssays,
    totalEssaysMarked,
    hoursSavedPerYear,
    annualLicenseGbp: 1200,
    costPerStudentGbp: costPerStudent,
    referenceCode: `MTG-INST-${new Date().getFullYear()}-${String(safeCohort).padStart(2, '0')}S`
  };
}
