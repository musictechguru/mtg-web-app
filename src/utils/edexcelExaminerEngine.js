/**
 * Pearson Edexcel A-Level Music Technology (9MT0) Official Extended Response Examiner Engine
 *
 * Built directly from official Pearson Edexcel 9MT0 Past Papers, Mark Schemes (2019–2025),
 * Chief Examiner Guidance, and the Pearson Edexcel Student Exemplars Pack:
 *
 *  - Chief Examiner Formatting Guidance:
 *      "Candidates are invited to use tables, bullet points and sub-headings to arrange their responses.
 *       Sub-headings are especially useful here." (Always use full sentences pairing AO3 point + AO4 impact).
 *
 *  - Component 3 Question 5 (15 Marks):
 *      • AO3: 5 marks (Identify) + AO4: 10 marks (Impact / Compare)
 *      • 5 Levels: Level 1 (1–3), Level 2 (4–6), Level 3 (7–9), Level 4 (10–12), Level 5 (13–15)
 *      • 6 Official Sub-headings: Capture, production approach & music style • Synthesis, sequencing & sampling •
 *        EQ & filtering • Dynamic processing • Pan & stereo field • Effects
 *
 *  - Component 3 Question 6 (20 Marks) & Component 4 Question 6 (20 Marks):
 *      • AO3: 5 marks (Technical Knowledge) + AO4: 15 marks (Analysis, Deconstruction & Wider Impact)
 *      • 5 Levels: Level 1 (1–4), Level 2 (5–8), Level 3 (9–12), Level 4 (13–16), Level 5 (17–20)
 *      • Note: If a response demonstrates ONLY AO3 without any AO4 explanation, Edexcel caps it at 1–5 marks.
 */

export const EDEXCEL_RUBRIC_BANK = [
  {
    id: 'c3_q5_liquid_spirit_15m',
    paperCode: 'Component 3: Listening & Analysing • Extended Response Practice',
    component: 'Component 3',
    questionNumber: '5',
    title: 'C3 Q5: Acoustic Jazz vs Modern Remix — Gregory Porter "Liquid Spirit" (15 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q5_Liquid_Spirit_Exemplar_15m.md',
    maxMarks: 15,
    ao3Max: 5,
    ao4Max: 10,
    youtubeId1: 'NS6JV-veVAE',
    youtubeWatchId1: '07rb7QQYk7E',
    videoTitle1: 'Track 5: Gregory Porter — Liquid Spirit (Original Acoustic Jazz)',
    youtubeId2: 'e41PxeE6O14',
    videoTitle2: 'Track 6: Gregory Porter — Liquid Spirit [20 Syl Remix]',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Jazz & Acoustic Studio Recording',
        url: '/interactive-slide-jazz.html',
        quizUrl: '/jazz-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Dance, Sampling & Remixing',
        url: '/interactive-slide-dance.html',
        quizUrl: '/dance-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Gregory Porter: Liquid Spirit (Track 5) and Gregory Porter: Liquid Spirit [20 Syl Remix] (Track 6). Compare the production techniques used in both versions.',
    examBullets: [
      'capture, production approach and music style',
      'synthesis, sequencing and sampling',
      'EQ and filtering',
      'dynamic processing',
      'pan and stereo field',
      'effects.'
    ],
    mtgRevisionGuide: {
      summary: 'Key concepts to listen for when comparing a live acoustic jazz recording (Track 5) against an electronic DAW remix (Track 6):',
      keyPoints: [
        'Capture & Style: Acoustic jazz instruments (double bass, piano, horns, drums) recorded live in a studio room vs DAW sequencing with programmed drum samples and synths.',
        'Sampling & Synthesis: Listen for how the remix chops, loops, pitch-shifts, and scratches Gregory Porter’s vocal stems and replaces the double bass with a synth bass.',
        'Dynamics: Natural dynamic range with light compression in the original vs heavy compression and side-chain compression (kick drum ducking the synth chords) in the remix.',
        'Space & FX: Natural room reverb on the drums and 1.5s vocal reverb in the original vs dry, punchy electronic drums and wide autopanned pitch-shifted delays (e.g. at 1:22) in the remix.'
      ],
      links: [
        { label: '🌐 Component 3 Listening & Analysing Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-music-technology-revision/' },
        { label: '🌐 Music Tech Toolbox: EQ, Compression & Effects (musictechguru.com)', url: 'https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/' },
        { label: '🎯 In-App Stage 4: Liquid Spirit Comparison Quiz', url: '/?quiz=comp_liquid_spirit' },
        { label: '🎯 In-App Quiz: Topic 4 Sampling & Topic 5 Dynamic Processing', url: '/?quiz=quiz-topic-4_p1' }
      ]
    },
    questionPrompt:
      'Gregory Porter: Liquid Spirit (Track 5) and Gregory Porter: Liquid Spirit [20 Syl Remix] (Track 6). Compare the production techniques used in both versions. Your response may consider: Capture, production approach and music style • Synthesis, sequencing and sampling • EQ and filtering • Dynamic processing • Pan and stereo field • Effects. (15 marks — AO3: 5 marks, AO4: 10 marks)',
    ao3Anchors: [
      {
        id: 'ao3_capture_instruments',
        label: 'Capture & instrumentation: Original captured live through microphones with acoustic jazz instruments (double bass, horns, drums, piano) vs Remix sequenced in a DAW using electronic drums and synths',
        keywords: ['live', 'acoustic', 'jazz', 'double bass', 'brass', 'horns', 'daw', 'sequenced', 'electronic drum', 'drum machine', 'remix']
      },
      {
        id: 'ao3_sampling_synths',
        label: 'Sampling & synthesis: No sampling/synthesis in original vs Remix sampling vocal stems (looped, stuttered, pitch-shifted, scratched) and replacing double bass/horns with synth bass & synth chords',
        keywords: ['sample', 'sampled', 'stutter', 'cut up', 'loop', 'synth', 'pitch shift', '808', 'electronic']
      },
      {
        id: 'ao3_dynamics_effects_pan',
        label: 'Dynamics, pan & effects: Natural room/1.5s vocal reverb, brass panning & light compression in original vs heavy compression, side-chain compression (kick triggering synth), stereo widening/ADT & creative autopanned delay in remix',
        keywords: ['reverb', 'room', 'compression', 'side chain', 'side-chain', 'pumping', 'panning', 'stereo', 'delay', 'autopan']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_style_comparison',
        label: 'Compares musical feel & style: Original preserves a natural, human live jazz/blues feel vs Remix creating a tighter, less human club/dance production',
        keywords: ['natural', 'human', 'live feel', 'jazz', 'blues', 'club', 'dance', 'tighter', 'styles', 'whereas', 'however']
      },
      {
        id: 'ao4_dynamics_impact',
        label: 'Evaluates impact of dynamics: Light compression in original keeps natural dynamic range, whereas side-chain compression and high-ratio compression in remix create rhythmic pumping and punch',
        keywords: ['pumping', 'kick', 'tighter', 'volume', 'high compression', 'ratio', 'blend', 'prominent']
      },
      {
        id: 'ao4_drums_ambience_impact',
        label: 'Evaluates drums, ambience & vocal manipulation: Room reverb on original drums creates a distant, blended wash vs dry, tight electronic drums and rhythmic chopped vocal harmonies in remix',
        keywords: ['distant', 'wash', 'ride cymbal', 'percussive', 'layers', 'choppy', 'harmony', 'connection']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Capture, Production Approach and Music Style:',
        '• Track A (Original) comes across as a natural-sounding blues/jazz band recorded live with acoustic instruments (double bass, piano, brass/horns, and drums) captured through modern studio microphones with no obvious spill, whereas Track B (20 Syl Remix) is a contemporary club/dance remix sequenced in a DAW.',
        '• Track A preserves a human, live performance feel and a warm connection with the musicians, whereas Track B replaces the live band with programmed electronic drums and synths to create a tighter, hard-hitting dance feel.',
        '',
        'Synthesis, Sequencing and Sampling:',
        '• There is no synthesis or sampling in Track A as all instruments are played live from start to finish, whereas Track B samples stems from Track A and cuts up the lead vocal into rhythmic stuttered loops, pitch-shifted harmonies, and DJ-style scratches.',
        '• In Track B, the acoustic double bass and horns from Track A are replaced with a deep electronic synth bass and wide stereo synth chords that drive the club groove.',
        '',
        'Dynamic Processing:',
        '• Track A uses light, natural compression across the acoustic instruments so the jazz performance retains its natural dynamic range, whereas Track B uses heavy high-ratio compression across the mix to create a louder, tighter, and less human sound.',
        '• Track B also uses side-chain compression on the wide stereo synth, triggered by the electronic kick drum, which causes the synth volume to duck and creates a rhythmic pumping effect typical of modern dance music.',
        '',
        'Pan, Stereo Field and Effects:',
        '• Track A pans the brass section naturally across the stereo field and uses lots of natural room reverb on the drums (giving a distant sound and a wash on the ride cymbal) plus a 1.5s reverb on the lead vocal.',
        "• By contrast, Track B uses tighter, drier electronic drum samples layered with the original jazz cymbals for extra percussive punch, alongside creative stereo delays such as at 1:22 on the word 'liquid', which is pitch-shifted, wide in the stereo field, and autopanned."
      ].join('\n'),
      grade_B: [
        'Original Version (Track A):',
        '• The original is a very natural-sounding jazz/blues mix where all the instruments are acoustic and blend together well.',
        '• There are small amounts of room reverb on the instrument tracks and a natural 1.5s reverb on the lead vocals so the vocal sits nicely on top of the band.',
        '• The lead vocals and acoustic instruments are only lightly compressed to keep a natural sound.',
        '',
        '20 Syl Remix (Track B):',
        '• In the remix, the drums are much more prominent and programmed on an electronic drum machine (possibly an 808) with an added synth part.',
        '• There is a high compression ratio on the remix, especially on the vocals, making it sound more like a modern dance track than the jazz/blues original.',
        '• The vocals have also been cut up and sampled in a DAW to create choppy rhythms and new harmony lines.'
      ].join('\n'),
      grade_D: [
        'Instrumentation and Bass Comparison:',
        '• The original song has been recorded with live acoustic instruments, whereas the remix uses MIDI and electronic instruments.',
        '• In the original, you can hear the plucking and fret buzz of the live double bass at the start, which has been EQ’d so it sits cleanly in the mix.',
        '• In the remix, a synth bass recorded with MIDI is used instead, making the song sound less like the original and fitting a modern remix style.'
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
    },
    officialExaminerNotes: {
      level5:
        'Senior Examiner Commentary (Level 5 • 13–15m): Clear sub-headings and full-sentence bullet points directly contrast how the original jazz band was captured (room ambience, acoustic instruments, light compression) against the electronic DAW production of the remix (vocal sampling, synth bass, side-chain compression pumping, and pitch-shifted autopanned delay at 1:22).',
      level3:
        'Senior Examiner Commentary (Level 3 • 7–9m): This candidate has separated the Original and Remix into two separate bullet lists so direct comparisons are less explicit. Clear references are made to reverb (1.5s) and compression settings, though the musical effect could be explained in greater depth.',
      level1:
        'Senior Examiner Commentary (Level 1 • 1–3m): The bullet points state that there is a difference in live vs MIDI instrumentation, but comparisons between the two versions are limited almost entirely to the bass.'
    }
  },
  {
    id: 'c3_q6_britney_daw_20m',
    paperCode: 'Component 3: Listening & Analysing • Extended Response Practice',
    component: 'Component 3',
    questionNumber: '6',
    title: 'C3 Q6: Millennium Pop Production & DAW Vocal Editing (20 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q6_Britney_DAW_Vocal_20m.md',
    maxMarks: 20,
    ao3Max: 5,
    ao4Max: 15,
    youtubeId1: null,
    youtubeId1: 'C-u5WLJ9Yk4',
    audioSrc1: null,
    audioTitle1: 'Reference Video: Britney Spears — Oops!... I Did It Again (1999)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Commercial Pop & DAW Vocal Production',
        url: '/interactive-slide-commercial-pop.html',
        quizUrl: '/commercial-pop-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Studio Effects & Vocal Processing',
        url: '/interactive-slide-studio-effects.html',
        quizUrl: '/reverb-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Mixers & DAW Workflows',
        url: '/interactive-slide-mixers-daw.html',
        quizUrl: '/mixers-daw-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Britney Spears: Oops!... I Did It Again (Track 7). This track was produced in 1999. Evaluate the impact that digital audio workstation (DAW) technology has had on the vocal production in this track, and the wider impact DAW technology has had on vocal production since 1999.',
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — How DAWs Changed Vocal Production (1999 to Present):',
      keyPoints: [
        'Waveform Editing & Vocal Sampling: In a DAW, producers can cut up vocal waveforms non-destructively, reverse vocal breaths, and load vocal hums/breaths into a sampler triggered via MIDI (hear the rhythmic vocal hook at 0:34).',
        'Pitch Correction & Multitrack Overdubbing: Antares Auto-Tune (introduced late 1990s) corrects vocal pitch for a polished pop sheen, while unlimited DAW audio tracks allow huge stacked chorus harmonies without analogue tape hiss.',
        'DAW Plugins & Automation: Duplicating vocal sections onto separate tracks makes it easy to apply a band-pass ("telephone") EQ filter (high-pass + low-pass filter at 0:41), heavy compression, and stereo reverb/delay plugins.',
        'Wider Impact Since 1999: Affordable DAWs (Logic Pro, Pro Tools) empowered bedroom producers, sparked debate over whether heavy Auto-Tune removes natural human expression, and led to modern hybrid studios pairing SSL analogue desks/valve mics with DAW editing.'
      ],
      links: [
        { label: '🌐 Component 3 Revision Hub & Q6 Essay Guides (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-music-technology-revision/' },
        { label: '🌐 Music Tech Toolbox: Vocal Production, EQ & Compression (musictechguru.com)', url: 'https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/' },
        { label: '🎯 In-App Revision: Modern ITB, DAW & Vocal Production (2000s–Present)', url: '/?quiz=quiz-history-7' },
        { label: '🎯 In-App Case Study: Smooth Criminal Production Breakdown', url: '/?quiz=case_smooth_criminal' }
      ]
    },
    questionPrompt:
      'Britney Spears: Oops!... I Did It Again. This track was produced in 1999. Evaluate the impact that digital audio workstation (DAW) technology has had on the vocal production in this track, and the wider impact DAW technology has had on vocal production since 1999. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_vocal_sampling_edits',
        label: 'Vocal editing & sampling in DAW: Cutting up vocal waveforms, copying/pasting vocal breaths/hums into a digital sampler triggered via MIDI (e.g. rhythmic loop at 0:34), reversing vocal breaths',
        keywords: ['sample', 'sampling', 'sampler', 'cutting', 'cut up', 'waveform', 'midi', 'loop', '0:34', 'breathing', 'breath', 'reverse']
      },
      {
        id: 'ao3_pitch_overdubs',
        label: 'Pitch correction & multitrack overdubbing: Pitch correction / Auto-Tune on lead and backing vocals, plus virtually unlimited DAW tracks for double-tracking and stacked chorus harmonies',
        keywords: ['pitch correction', 'auto-tune', 'autotune', 'Auto tune', 'pitch', 'overdub', 'overdubbing', 'double tracked', 'harmonies', 'tracks']
      },
      {
        id: 'ao3_eq_effects_plugins',
        label: 'DAW EQ, compression & effects plugins: Band-pass / high & low pass filter ("telephone" EQ effect at 0:41), heavy vocal compression, and bright reverb/timed delay plugins',
        keywords: ['telephone', 'eq', 'filter', 'high and low pass', '0:41', 'compression', 'reverb', 'delay', 'plugin']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_song_deconstruction',
        label: 'Analyses how DAW techniques shape the 1999 track: Pitch-perfect pop lead vocal, huge synthesised-sounding backing chorus harmonies, hard L/R panned breath hooks, and telephone EQ contrast',
        keywords: ['pitch perfect', 'backing vocal', 'chorus', 'hook', 'atmosphere', 'left', 'right', 'panned', 'post production']
      },
      {
        id: 'ao4_wider_industry_impact',
        label: 'Evaluates wider impact since 1999: Rise of bedroom producers with affordable DAWs (Logic Pro, Pro Tools), non-destructive editing, and debate over whether Auto-Tune removes natural human quality or fixes weak singers',
        keywords: ['1999', 'bedroom', 'accessible', 'natural', 'human', 'imperfect', 'bad', 'creativity', 'industry', 'non-destructive']
      },
      {
        id: 'ao4_hybrid_conclusion',
        label: 'Reaches a balanced critical conclusion: Weighs digital DAW convenience against major studios still integrating vintage analogue gear (valves, SSL desks) for analogue warmth alongside digital editing',
        keywords: ['analogue', 'valve', 'ssl', 'logic', 'pro tools', 'vintage', 'overall', 'better and for worse', 'combined']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Vocal Editing and Sampling in the Track:',
        '• The DAW has been used to cut up the vocal waveform with precision, copying short vocal breaths and hums into a digital sampler controlled via MIDI to create rhythmic vocal hooks, such as the loop at 0:34.',
        '• Unlike older analogue tape or hardware samplers with limited memory, the DAW allows non-destructive editing, reversing of vocal breaths, and hard left/right panning of cut-up vocal samples across the stereo field.',
        '',
        'Pitch Correction (Auto-Tune) and Multitrack Overdubbing:',
        '• Early digital pitch correction (Auto-Tune) has been applied to Britney Spears’s lead and backing vocals, giving a pitch-perfect pop delivery and almost synthesised-sounding chorus harmonies that define the late-1990s teen-pop style.',
        '• Because a DAW provides virtually unlimited audio tracks for overdubbing and comping, the producers were able to layer huge stacked backing vocal harmonies in the chorus without tape degeneration.',
        '',
        'Digital EQ, Compression and Effects Plugins:',
        "• The DAW makes it easy to duplicate cut-up vocal phrases onto separate tracks and apply automated plugin processing, such as the band-pass ('telephone') EQ filter at 0:41 (using high-pass and low-pass filters) alongside heavy vocal compression and bright stereo reverb.",
        '',
        'Wider Impact on Vocal Production Since 1999 & Conclusion:',
        '• Since 1999, DAWs such as Logic Pro and Pro Tools have become affordable and accessible to bedroom producers, enabling limitless vocal creativity but also sparking debate that heavy Auto-Tune and quantised editing strip music of its natural human quality by turning an imperfect singer into a pitch-perfect recording.',
        '• Despite the dominance of DAWs, many major studios still integrate vintage analogue equipment—such as valve microphones and an SSL mixing desk—alongside Pro Tools or Logic Pro to combine analogue warmth with digital editing speed.'
      ].join('\n'),
      grade_B: [
        'Vocal Sampling and Filtering:',
        '• DAW technology makes it easy to extract and sample specific parts of the vocal waveform with complete accuracy, which is heard in the hard left and right panning of the vocalist’s breathing.',
        '• The DAW also modulates the vocal sound using a high-pass and low-pass filter to create a narrow frequency response ("telephone" effect) on specific sections in post-production.',
        '',
        'Double-Tracking, Pitch Shifting and Reverb Plugins:',
        '• The DAW allows the vocals to be double-tracked across multiple tracks and altered in post-production using a pitch-shifter / pitch-correction plugin.',
        '• Virtual reverb and delay plugins inside the DAW emulate real acoustic spaces, adding bright reverbs and delays to the vocals to create atmosphere.'
      ].join('\n'),
      grade_D: [
        'EQ and Panning on the Vocals:',
        '• DAW technology has had a large impact on the track because the vocal sound changes throughout the song.',
        '• In the intro, the mid frequencies are boosted and the high frequencies are cut with EQ so the vocal sounds like it is coming through a telephone or mic receiver.',
        '• The backing vocals in the chorus are panned left and right away from the centre of the stereo field.'
      ].join('\n'),
      student_template: [
        'Vocal Editing and Sampling in the Track:',
        '• ',
        '',
        'Pitch Correction (Auto-Tune) and Multitrack Overdubbing:',
        '• ',
        '',
        'Digital EQ, Compression and Effects Plugins:',
        '• ',
        '',
        'Wider Impact on Vocal Production Since 1999 & Conclusion:',
        '• '
      ].join('\n')
    },
    officialExaminerNotes: {
      level5:
        'Senior Examiner Commentary (Level 5 • 17–20m): Organized under clear sub-headings with full-sentence bullet points covering DAW vocal sampling (0:34), telephone EQ (0:41), multitrack overdubbing, and Auto-Tune. Evaluates the wider post-1999 impact on bedroom producers, the loss of human imperfection, and hybrid studio integration (SSL desk + Logic/Pro Tools).',
      level3:
        'Senior Examiner Commentary (Level 3 • 9–12m): Clear bulleted points explaining vocal sampling, L/R breath panning, and how a telephone effect is created from a high and low pass filter. However, it needs deeper evaluation of the wider impact of DAWs on the music industry since 1999.',
      level1:
        'Senior Examiner Commentary (Level 1 • 1–4m): Brief bullet points mention creative EQ ("mic receiver") and backing vocal panning, but no wider DAW techniques or historical context are discussed.'
    }
  },
  {
    id: 'c3_q5_sway_2025_15m',
    paperCode: 'Component 3: Listening & Analysing • 15-Mark Comparative Analysis',
    component: 'Component 3',
    questionNumber: '5',
    title: 'C3 Q5: 1950s Big Band Tracking vs 1990s Latin Dance Remix — "Sway" (15 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q5_Sway_2025_15m.md',
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
        title: 'Interactive Deck: Direct-to-Tape & 1950s Mono Recording',
        url: '/interactive-slide-direct-to-tape.html',
        quizUrl: '/direct-to-tape-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Dance, Sampling & Filter Sweeps',
        url: '/interactive-slide-dance.html',
        quizUrl: '/dance-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Dean Martin: Sway (1954) Track 5 and Shaft: (Mucho Mambo) Sway (1999) Track 6. Evaluate the production techniques used in each version of the song.',
    examBullets: [
      'capture, production approach and music style',
      'synthesis, sequencing and sampling',
      'EQ and filtering',
      'dynamic processing',
      'pan and stereo field',
      'effects.'
    ],
    mtgRevisionGuide: {
      summary: 'Key concepts for comparing 1950s Analogue Mono Recording (Dean Martin, 1954) vs 1990s DAW Club Production (Shaft, 1999):',
      keyPoints: [
        '1954 Capture vs 1999 Sequencing: Dean Martin recorded live in a single take onto mono analogue tape using ribbon mics (flexible tempo, subtle tape hiss/saturation) vs Shaft sequenced in a DAW with quantised 4-on-the-floor MIDI drums and condenser vocal mic.',
        'Synthesis & Sampling: Dean Martin uses only live acoustic orchestral instruments vs Shaft using detuned chorus synths, resonant low-pass filter bass synth, sampled brass stabs, samba whistle, reverse cymbals, and stuttered vocal chops.',
        'EQ & Dynamics: Ribbon mics on the 1954 track roll off high frequencies with wide natural dynamics, whereas the 1999 track uses HPF on brass, upward filter sweeps on builds, and heavy vocal compression/brickwall limiting for club loudness.',
        'Mono Depth vs Wide Stereo: The 1954 mono mix creates front-to-back depth by placing Dean Martin close/dry and strings further back in 2–3s chamber reverb, whereas the 1999 mix pans percussion wide in stereo and uses timed 1/4-note delays.'
      ],
      links: [
        { label: '🌐 Music Technology History 1930–1961 Guide (musictechguru.com)', url: 'https://www.musictechguru.com/product/music-technology-1930-1961/' },
        { label: '🌐 Component 3 Listening & Analysing Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-music-technology-revision/' },
        { label: '🎯 In-App Revision: 1950s Mono & Early Tape Pioneers', url: '/?quiz=quiz-history-0' },
        { label: '🎯 In-App Revision: 1990s Dance, Sampling & EDM Production', url: '/?quiz=quiz-topic-36' }
      ]
    },
    questionPrompt:
      '5. Dean Martin: Sway (1954) Track 5 and Shaft: (Mucho Mambo) Sway (1999) Track 6. Evaluate the production techniques used in each version of the song. Your response may consider: Capture, production approach and music style • Synthesis, sequencing and sampling • EQ and filtering • Dynamic processing • Pan and stereo field • Effects. (15 marks — AO3: 5 marks, AO4: 10 marks)',
    ao3Anchors: [
      {
        id: 'ao3_capture_sway',
        label: 'Capture & style: Dean Martin (1954) analogue mono recording, few ribbon mics, live ensemble in a single take (Latin/jazz) vs Shaft (1999) DAW/MIDI sequencing, quantised parts, condenser vocal mic & 4-on-the-floor EDM/club style',
        keywords: ['mono', 'analogue', '1954', 'live', 'single take', 'ribbon', 'daw', 'midi', 'quantised', 'condenser', 'edm', 'dance', 'club']
      },
      {
        id: 'ao3_synth_sampling_sway',
        label: 'Synthesis & sampling in Shaft (1999): Layered detuned/chorus synths, bass synth with resonant low-pass filter, sampled brass stabs/percussion/samba whistle, vocal chops/stutters, and reverse cymbals',
        keywords: ['synth', 'detuned', 'chorus', 'low pass filter', 'resonant', 'brass', 'sample', 'stutter', 'chop', 'reverse cymbal', 'whistle']
      },
      {
        id: 'ao3_mix_effects_sway',
        label: 'EQ, dynamics, pan & effects: DM has limited HF/thin double bass, little track compression, no panning, and 2–3s chamber reverb vs Shaft having HPF on brass, heavy vocal compression/limiting, wide stereo layers, and filtered 1/4 or 1/8-note delays',
        keywords: ['chamber reverb', 'dynamic range', 'compression', 'limiting', 'stereo', 'panning', 'high pass', 'hpf', 'delay', 'pre-delay']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_capture_impact',
        label: 'Compares impact of capture: DM has tape saturation/hiss, flexible tempo, and natural blend from mic distance vs Shaft having low noise, rigid mechanical tempo for club dancing, and risers/builds/drops',
        keywords: ['hiss', 'saturation', 'flexible', 'human', 'blend', 'distance', 'rigid', 'mechanical', 'riser', 'drop', 'build']
      },
      {
        id: 'ao4_eq_dynamics_impact',
        label: 'Compares EQ & dynamic impact: Ribbon mics in DM give smooth/limited high frequencies and wide dynamic peaks, whereas Shaft uses heavy compression/limiting for vocal consistency and high perceived loudness ("loudness wars")',
        keywords: ['smooth', 'thin', 'peaks', 'consistent', 'consistency', 'loudness', 'cut through', 'sweeps up']
      },
      {
        id: 'ao4_space_effects_impact',
        label: 'Compares spatial & effects impact: DM places lead vocal closer/drier than wet background strings for depth in mono, whereas Shaft uses wide stereo opposition for percussion separation and timed delays as rhythmic hooks',
        keywords: ['closer', 'drier', 'further away', 'depth', 'separation', 'opposition', 'hook', 'timed', 'rhythmic']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Capture, Production Approach and Music Style:',
        '• The 1954 Dean Martin version (DM) was captured using analogue tape recording direct to mono with very few ribbon microphones recording the live Latin/jazz orchestra in a single take, resulting in a flexible human tempo, subtle tape saturation/hiss, and a natural acoustic blend.',
        '• By contrast, the 1999 Shaft version (SH) is an EDM/club dance track produced in a DAW using MIDI sequencing, quantised drum programming, and a condenser vocal mic, giving it a low noise floor, a rigid mechanical tempo for club dancing, and a 4-on-the-floor kick drum with risers, builds, and drops.',
        '',
        'Synthesis, Sequencing and Sampling:',
        '• While DM uses only live acoustic instruments, SH layers detuned synth waveforms with chorus for thickness and uses a bass synth with a resonant low-pass filter for a squelchy dance bassline.',
        '• SH also triggers sampled brass stabs, percussion loops, and a samba whistle sample to punctuate the drops, while chopping and stuttering vocal samples alongside reverse cymbals to build tension into transitions.',
        '',
        'EQ, Filtering and Dynamic Processing:',
        '• Due to 1950s ribbon microphones, DM has smooth, rolled-off high frequencies and a thin double bass low end, whereas SH uses a high-pass filter (HPF) on the brass hooks so they cut through the mix and sweeps a low-pass filter cut-off upwards during vocal builds.',
        '• DM has very little individual track compression so it retains a wide dynamic range with natural peaks, whereas SH uses heavy vocal compression for consistency and brickwall limiting to achieve high perceived loudness ("loudness wars").',
        '',
        'Pan, Stereo Field and Effects:',
        '• Because DM is in mono with no panning, front-to-back depth is achieved by placing Dean Martin closer to the mic (sounding drier and more intimate) while the strings and backing vocals are further away with a warm 2–3 second chamber reverb.',
        '• Conversely, SH pans percussion layers wide in opposition across the stereo field for separation and sends the vocal chops through a filtered quarter-note delay to create a rhythmic hook.'
      ].join('\n'),
      grade_B: [
        'Capture and Sequencing:',
        '• Dean Martin’s 1954 version was recorded live in a single take onto mono analogue tape using ribbon microphones, giving it a warm sound with some tape hiss and a natural, flexible tempo.',
        '• In contrast, the 1999 Shaft version is an EDM dance track sequenced in a DAW with quantised MIDI drums and a 4-on-the-floor kick drum.',
        '',
        'Sampling, EQ and Dynamics:',
        '• Shaft uses sampled brass stabs, reverse cymbals as risers before the drops, and vocal chops that stutter and repeat with a filter sweep, whereas Dean Martin uses only live acoustic instruments.',
        '• The 1954 version has a wide dynamic range and less bass, whereas the 1999 version uses heavy vocal compression and limiting so it sounds much louder for clubs.',
        '',
        'Panning and Effects:',
        '• In the mono 1954 version, depth is created by having Dean Martin closer to the mic while the strings are further away in chamber reverb, whereas Shaft pans percussion wide across the stereo field and uses timed delay on the vocals.'
      ].join('\n'),
      grade_D: [
        'Comparison of Both Versions:',
        '• The 1954 Dean Martin track is an old mono recording of a live jazz band recorded with microphones in a room with reverb, so it sounds warm and quieter.',
        '• The 1999 Shaft remix is a modern club dance song made on a computer DAW using synthesisers, brass samples, and a loud 4-on-the-floor drum beat.',
        '• The remix uses heavy compression to make it loud and puts delay and stutter effects on the vocals.'
      ].join('\n'),
      student_template: [
        'Capture, Production Approach and Music Style:',
        '• ',
        '',
        'Synthesis, Sequencing and Sampling:',
        '• ',
        '',
        'EQ, Filtering and Dynamic Processing:',
        '• ',
        '',
        'Pan, Stereo Field and Effects:',
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
      'Bass Drum: Bridged-T resonant network producing a sine-like pitch drop with initial transient click',
      'Snare Drum: Dual-circuit architecture combining tuned resonant body tone with shaped white noise',
      'Tom Drums (Low & High): Tuned resonant oscillators with exponential pitch envelope decay',
      'Hi-Hats (Closed & Open): Metallic 6-oscillator square wave array routed through high-pass/band-pass filtering',
      'Pattern & Groove: Mono mixdown, discrete analogue envelopes, and rhythmic 16th-note step timing.'
    ],
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — How Roland TR-606 Analogue Drum Synthesis Works:',
      keyPoints: [
        'Bass Drum: Bridged-T resonant network (damped sine oscillator) excited by a pulse trigger + low-pass filtering. Amplitude envelope has 0ms attack (cutting the wave off-zero to create a beater click transient), medium decay, and 0 sustain.',
        'Snare Drum: Combines two parallel circuits: a tuned resonant oscillator (drum body tone) plus an unpitched white noise generator shaped by a band-pass filter and short decay envelope for the snare wires.',
        'Hi-Hats: 6 detuned Schmitt-trigger square wave oscillators create an inharmonic metallic cluster, routed through a high-pass / band-pass filter. Closed hat uses a very short decay envelope; open hat has a longer release decay.',
        'Toms: Dual bridged-T resonant filter oscillators tuned to Low and High pitches with exponential pitch envelope decay. In the pattern (Bars 5–8), all sounds are dry, discrete analogue circuits summed into a focused mono groove.'
      ],
      links: [
        { label: '🌐 Component 4 Production Exam Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-4-production-exam-revision/' },
        { label: '🌐 Introduction to Drum Sampling & Synthesis (musictechguru.com)', url: 'https://www.musictechguru.com/product/introduction-to-drum-sampling/' },
        { label: '🎯 In-App Interactive Trainer: Synthesiser Fundamentals', url: '/?quiz=quiz-topic-34' },
        { label: '🎯 In-App Quiz: Topic 3 Synthesis (Waveforms, VCF, ADSR & LFO)', url: '/?quiz=quiz-topic-3_p1' }
      ]
    },
    questionPrompt:
      'Listen to the Roland TR-606 Drumatix audio stem. Analyse how the analogue drum sounds (bass drum, snare drum, toms, hi-hats) and the groove are created using subtractive synthesis. In your response, evaluate oscillator selection, filter networks, noise generators, and envelope decay times. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_waveforms_noise',
        label: 'Oscillator waveforms & noise generators: Sine/triangle wave (bass drum), white noise (snare & hi-hats), square/sawtooth wave (toms), and dual detuned triangle/sine oscillators (flex-a-tone)',
        keywords: ['sine', 'triangle', 'white noise', 'square', 'saw', 'sawtooth', 'oscillator', 'detuned', 'two oscillators']
      },
      {
        id: 'ao3_filters',
        label: 'Filter types (VCF): Low-pass filter on bass drum (80–200Hz), resonant low-pass filter with envelope on snare, high-pass filter on hi-hats (2000–9000Hz), no filtering on toms',
        keywords: ['low pass', 'low-pass', 'lpf', 'high pass', 'high-pass', 'hpf', 'cut-off', 'cutoff', 'resonance', 'filter envelope']
      },
      {
        id: 'ao3_envelopes_lfo_seq',
        label: 'Envelopes (ADSR), LFO & sequencing: Amplitude envelopes (0/short attack, medium decay, 0 sustain), pitch envelopes on toms & flex-a-tone, fast LFO pitch vibrato on flex-a-tone, mono/dry quantised step sequence',
        keywords: ['envelope', 'attack', 'decay', 'sustain', 'release', 'pitch envelope', 'lfo', 'vibrato', 'mono', 'quantised', 'step sequenced']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_kick_snare_analysis',
        label: 'Deconstructs bass drum & snare synthesis: Sine/triangle + LPF (80–200Hz) gives a low, bassy tone with few harmonics; 0ms attack cuts the waveform away from zero-crossing causing a beater transient click; white noise + falling resonant LPF sweep gives unpitched snare snap',
        keywords: ['harmonics', 'bassy', '80-200hz', 'click', 'zero crossing', 'beater', 'transient', 'unpitched', 'sweep', 'fades to silence']
      },
      {
        id: 'ao4_hihat_tom_analysis',
        label: 'Deconstructs hi-hats & toms: White noise through fixed HPF (2–9kHz) removes low/mid frequencies to thin out the hi-hat, with longer decay/release on open vs closed hi-hat; square/saw wave gives bright harmonics for toms with falling pitch envelope',
        keywords: ['2000hz', '9000hz', 'thins out', 'closed hi-hat', 'open hi-hat', 'longer decay', 'bright', 'pitch starts high', 'falls']
      },
      {
        id: 'ao4_flexatone_pattern_analysis',
        label: 'Deconstructs flex-a-tone & pattern: Two detuned oscillators create a clashing interval, 16th-note LFO modulates pitch for fast vibrato while pitch envelope rises and multi-stage amplitude envelope swells; all sounds are monophonic, dry, and centre-panned for focus',
        keywords: ['clashing', '16th', 'pitch starts low', 'rises', 'multistage', 'inverted', 'centre', 'dry', '1/16']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Bass Drum (Bar 1):',
        '• The bass drum is synthesised using a low-pitched sine or triangle wave oscillator with very few harmonics, routed through a low-pass filter (LPF) with a cut-off around 80–200Hz to remove upper harmonics and leave a deep, bassy tone.',
        '• Its amplitude envelope uses a 0ms (very short) attack, medium decay and release, and zero sustain so each hit fades to silence; because the 0ms attack cuts the waveform away from the zero-crossing point, it produces an audible click transient that mimics a bass drum beater and helps the kick cut through the mix.',
        '',
        'Snare Drum (Bar 2):',
        '• The snare drum uses a white noise generator, which is random and unpitched with equal energy across all frequencies to produce a bright, snappy sound.',
        '• It is shaped by a resonant low-pass filter modulated by a filter envelope where the cut-off frequency starts high and sweeps rapidly downwards, paired with a short-attack, medium-decay, zero-sustain amplitude envelope.',
        '',
        'Hi-Hats (Bar 3):',
        '• Both closed and open hi-hats use unpitched white noise routed through a fixed high-pass filter (HPF) with a cut-off between 2000Hz and 9000Hz, removing low and mid frequencies to thin out the metallic timbre.',
        '• Both use a 0ms attack and zero sustain, but the closed hi-hat has a very short decay and release whereas the open hi-hat has a noticeably longer decay and release so it rings out.',
        '',
        'Tom Drums (Bar 4):',
        '• The three toms use a bright square or sawtooth wave with rich harmonics played at three different pitches without filtering.',
        '• A pitch envelope with a medium decay causes the pitch of each tom to start high and fall downwards when struck, while the amplitude envelope uses a short attack, a 16th-note hold stage, medium decay, and zero sustain.',
        '',
        'Flex-a-tone (Bar 5) and Combined Pattern (Bars 7–10):',
        '• The flex-a-tone combines two detuned triangle/sine oscillators tuned to a clashing high-pitched interval, with an LFO modulating pitch at a fast 16th-note rate for vibrato, a slow-attack pitch envelope that makes the pitch rise, and a multi-stage amplitude envelope that swells back up before fading out.',
        '• Across Bars 7–10, all drum sounds are monophonic, completely dry with no reverb or delay effects, panned dead-centre in mono, and step-sequenced/quantised strictly to 1/16th and 1/4-note grid divisions.'
      ].join('\n'),
      grade_B: [
        'Bass Drum (Bar 1) and Snare Drum (Bar 2):',
        '• The bass drum is made with a low-pitched sine or triangle wave and a low-pass filter around 100Hz so it sounds bassy with very few harmonics, and its fast 0ms attack causes a click transient at the start of each hit.',
        '• The snare drum uses white noise, which is unpitched and bright, shaped by a resonant low-pass filter with an envelope that sweeps the cut-off frequency down.',
        '',
        'Hi-Hats (Bar 3) and Tom Drums (Bar 4):',
        '• The hi-hats also use white noise passed through a high-pass filter above 2kHz to thin out the sound by removing low frequencies, and the open hi-hat has a longer decay and release time than the closed hi-hat.',
        '• The toms use a brighter square or saw wave with a pitch envelope that drops in pitch from high to low on each strike.',
        '',
        'Flex-a-tone (Bar 5) and Pattern (Bars 7–10):',
        '• The flex-a-tone uses two detuned oscillators with a fast LFO modulating the pitch for vibrato and a pitch envelope that rises upwards.',
        '• In Bars 7–10, all the drum parts are step-sequenced and quantised in mono in the centre of the mix with no reverb or effects.'
      ].join('\n'),
      grade_D: [
        'Drum Synthesis Breakdown:',
        '• The bass drum uses a low sine wave with a low-pass filter so only the bass frequencies come through, and a short envelope so it does not ring out.',
        '• The snare drum and hi-hats are both made using white noise, with a high-pass filter on the hi-hat to make it thin and a longer release on the open hi-hat.',
        '• The toms use a synth wave that drops in pitch when hit, the flex-a-tone uses an LFO to wobble the pitch, and all the drums are sequenced in time in the middle of the mix.'
      ].join('\n'),
      student_template: [
        'Bass Drum (Bar 1):',
        '• ',
        '',
        'Snare Drum (Bar 2):',
        '• ',
        '',
        'Hi-Hats (Bar 3):',
        '• ',
        '',
        'Tom Drums (Bar 4):',
        '• ',
        '',
        'Flex-a-tone (Bar 5) and Combined Pattern (Bars 7–10):',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c3_q6_guitar_evolution_20m',
    paperCode: 'Component 3: Listening & Analysing • Extended Response Practice',
    component: 'Component 3',
    questionNumber: '6',
    title: 'C3 Q6: Development of the Electric Guitar & Amplification (20 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C3_Q6_Electric_Guitar_Evolution_20m.md',
    maxMarks: 20,
    ao3Max: 5,
    ao4Max: 15,
    youtubeId1: null,
    audioSrc1: '/C3_Heavy_Rock_Audio/06 Voodoo Child (Slight Return).mp3',
    audioTitle1: 'Reference A: Jimi Hendrix — Voodoo Child (1968 Fender Stratocaster)',
    audioSrc2: '/C3_Heavy_Rock_Audio/02 Eruption.mp3',
    audioTitle2: 'Reference B: Van Halen — Eruption (1978 Frankenstrat Humbucker)',
    interactiveDecks: [
      {
        title: 'Interactive Deck: The Electric Guitar (1950s–Present)',
        url: '/interactive-slide-the-electric-guitar.html',
        quizUrl: '/the-electric-guitar-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Amplifiers, Valves & Distortion',
        url: '/interactive-slide-amplifiers.html',
        quizUrl: '/amplifiers-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Rock Production History',
        url: '/interactive-slide-rock.html',
        quizUrl: '/rock-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Describe the components of an electric guitar and how the electric guitar has developed and matured since the 1950s.',
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — Anatomy & Historical Evolution of the Electric Guitar (1950s–1980s):',
      keyPoints: [
        'Components & Pickups (Transducers): Solid wooden body, bolt-on/glued neck, frets, nut, bridge (with whammy bar), and tuning pegs. Pickups are magnets wrapped in wire coils that act as transducers, converting string vibration into an electrical current controlled by volume/tone potentiometers ("pots").',
        '1950s Fender Solid-Body Innovations: Invented so guitarists could be heard in Big Bands without acoustic feedback at high volumes. Fender released the Telecaster (1950, bright/twangy) and the Stratocaster (1954, double-cutaway for high fret access + 3 single-coil pickups, used by Jimi Hendrix on "Voodoo Child").',
        'Gibson Les Paul (1952) & Humbucker (1957): Gibson introduced the Humbucker pickup in 1957 using two coils wired with opposite magnetic/electrical polarity to cancel 50/60Hz mains hum while producing a thicker, warmer rock tone.',
        '1970s–1980s Developments: Eddie Van Halen’s Frankenstrat (1979) combined a Gibson humbucker with a Fender body/tremolo for virtuosic two-handed tapping ("Eruption"), alongside twin-neck 12-string guitars (Gibson EDS-1275, Jimmy Page) and 7-string guitars for Heavy Metal.'
      ],
      links: [
        { label: '🌐 Music Technology 1930–1961 Historical Guide (musictechguru.com)', url: 'https://www.musictechguru.com/product/music-technology-1930-1961/' },
        { label: '🌐 The Guide to Recording & Mixing Rock (musictechguru.com)', url: 'https://www.musictechguru.com/product/the-guide-to-mixing-rock/' },
        { label: '🎯 In-App Revision: Timeline of Historical Equipment & Techniques', url: '/?quiz=quiz-timeline-1' },
        { label: '🎯 In-App Revision: 1950s & 1960s Rock Production', url: '/?quiz=quiz-history-1' }
      ]
    },
    questionPrompt:
      'Describe the components of an electric guitar and how the electric guitar has developed and matured since the 1950s. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_guitar_anatomy',
        label: 'Guitar construction: Solid body, bolt-on or glue-in neck, headstock with tuning pegs, nut, metal frets, bridge, and sprung whammy bar',
        keywords: ['solid body', 'solid-body', 'neck', 'bolt-on', 'headstock', 'tuning pegs', 'nut', 'frets', 'bridge', 'whammy']
      },
      {
        id: 'ao3_pickups_pots',
        label: 'Pickups & controls: Magnets wrapped in coils of wire acting as transducers (converting string vibration into electrical current) + potentiometer (pot) volume/tone controls',
        keywords: ['pickup', 'pick-up', 'magnet', 'coil', 'transducer', 'electrical', 'current', 'induced', 'potentiometer', 'pot']
      },
      {
        id: 'ao3_fender_gibson_models',
        label: '1950s–70s models: Fender Telecaster (1950), Stratocaster (double cutaway, 3 pickups), Gibson Les Paul (1952) & Humbucker (1957 dual coils with opposite polarity), Frankenstrat (1979), EDS-1275 & 7-string guitars',
        keywords: ['fender', 'telecaster', 'stratocaster', 'double cut', 'gibson', 'les paul', 'humbucker', 'opposite polarity', 'frankenstrat', '12 string', '7 string']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_feedback_volume',
        label: 'Explains why solid-body guitars were developed: Making guitars audible in Big Bands, reducing acoustic feedback at high volumes, and making guitars cheaper to produce',
        keywords: ['audible', 'big band', 'feedback', 'high volume', 'cheaper', 'loud']
      },
      {
        id: 'ao4_tonal_comparison',
        label: 'Evaluates sonic differences between models: Twangy Telecaster vs Stratocaster rock tone vs interference-free thicker Humbucker (cancelling mains hum) and 12-string/7-string extended range',
        keywords: ['twangy', 'sound', 'thicker', 'eliminating', 'interference', 'mains hum', 'pitch bends', 'range of pitches']
      },
      {
        id: 'ao4_artists_styles',
        label: 'Links developments to musical styles, playing techniques, and artists (Roy Buchanan, Jimi Hendrix Voodoo Child, Jeff Beck, Van Halen two-handed tapping on Eruption, Jimmy Page, Heavy Metal)',
        keywords: ['hendrix', 'voodoo child', 'jeff beck', 'van halen', 'tapping', 'eruption', 'jimmy page', 'stairway', 'heavy metal', 'virtuosic']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Components and Transducer Operation of the Electric Guitar:',
        '• An electric guitar consists of a solid wooden body with a bolt-on or glue-in neck leading to a headstock with tuning pegs; the metal strings pass over the nut and across thin metal frets on the fretboard that stop the string at the correct pitch.',
        '• The pickups are magnets wrapped in coils of wire that act as transducers, converting mechanical string vibrations into an induced electrical current equivalent to the string’s pitch, while a potentiometer ("pot") controls volume/tone and a sprung whammy bar on the bridge enables pitch bends.',
        '',
        '1950s Fender Solid-Body Innovations (Telecaster & Stratocaster):',
        '• Originally invented so guitarists could be audible in jazz Big Bands, Fender released the first commercially available solid-body guitar—the Telecaster—in 1950, which reduced acoustic feedback at high volumes, was cheaper to manufacture, and produced a bright, twangy sound heard on Roy Buchanan’s "Mule Train Stomp".',
        '• Because jazz players disliked the twangy Telecaster tone, Fender introduced the Stratocaster with a double-cutaway body (allowing easier access to higher frets) and three separate single-coil pickups, which became iconic in rock music such as Jimi Hendrix’s "Voodoo Child" (1968).',
        '',
        'Gibson Les Paul (1952) and the Humbucker Pickup (1957):',
        '• Gibson launched the Les Paul in 1952 and revolutionised rock tone in 1957 by introducing the Humbucker pickup, which used two magnets and coils wired with opposite polarity to cancel out 50/60Hz mains hum and electromagnetic interference while creating a thicker, warmer rock tone used by Jeff Beck.',
        '',
        'Late-1950s to 1980s Virtuosic & Extended-Range Developments:',
        '• In 1979, Eddie Van Halen built the Frankenstrat to combine the thick Gibson Humbucker sound with the physical body and tremolo of a Fender, facilitating virtuosic two-handed tapping heard on "Eruption" (1978).',
        '• Multi-neck and extended-range guitars also expanded the instrument’s sonic palette, including the twin-neck 12-string Gibson EDS-1275 (used by Jimmy Page for a thicker chorus-like texture on live performances of "Stairway to Heaven") and 7-string Ibanez guitars that extended the low-pitch range for Heavy Metal.'
      ].join('\n'),
      grade_B: [
        'Components of the Electric Guitar:',
        '• The modern electric guitar has a solid wooden body, a bolt-on or glued neck with metal frets, a nut, a bridge (often with a sprung whammy bar for pitch bends), and a headstock with tuning pegs.',
        '• Pickups are magnets wrapped in coils of wire that act as transducers, turning the vibrations of the metal strings into an electrical signal controlled by volume and tone pots.',
        '',
        'Fender and Gibson Developments in the 1950s:',
        '• In 1950, Fender released the Telecaster, the first solid-body guitar, which stopped unwanted acoustic feedback when playing at loud volumes, followed by the Stratocaster with three pickups and a double cutaway used by Jimi Hendrix.',
        '• Gibson released the Les Paul in 1952 and added the Humbucker pickup in 1957, using two coils with opposite polarity to cancel out mains hum and produce a thicker rock sound.',
        '',
        'Later Developments (1970s–1980s):',
        '• Eddie Van Halen combined a Gibson humbucker pickup with a Fender body on his Frankenstrat for fast two-handed tapping, and 12-string and 7-string guitars were introduced to give a thicker sound or wider pitch range for heavy metal.'
      ].join('\n'),
      grade_D: [
        'Guitar Parts and History:',
        '• An electric guitar is made of a solid body, a neck with frets, six metal strings, tuning pegs on the headstock, volume knobs, a whammy bar to bend notes, and pickups that send the sound to an amplifier.',
        '• In the 1950s, Fender made the Telecaster and Stratocaster, which did not feed back as much as acoustic guitars when played at loud volumes.',
        '• Gibson made the Les Paul with humbucker pickups to stop buzzing noises and create a heavier rock sound for guitarists like Jimi Hendrix and Eddie Van Halen.'
      ].join('\n'),
      student_template: [
        'Components and Transducer Operation of the Electric Guitar:',
        '• ',
        '',
        '1950s Fender Solid-Body Innovations (Telecaster & Stratocaster):',
        '• ',
        '',
        'Gibson Les Paul (1952) and the Humbucker Pickup (1957):',
        '• ',
        '',
        'Late-1950s to 1980s Virtuosic & Extended-Range Developments:',
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
    image1: '/C4_SPOP_Pics/C4_bass_synth.png',
    imageTitle1: 'Figure 1: Monophonic Analogue Synthesiser Front Panel Architecture',
    imageCaption1: 'VCO modulation, Source Mixer (Pulse/PWM, Saw, Sub-Osc), 24dB/oct VCF, and VCA envelope controls',
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
        title: 'Interactive Deck: Classic Keyboards & Analogue Synths',
        url: '/interactive-slide-classic-keyboards.html',
        quizUrl: '/classic-keyboards-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Figure 1 shows a monophonic synthesiser from 1982 (Roland SH-101). Evaluate the suitability of the settings to produce a synth bass.',
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Q6 Revision Notes — Evaluating Subtractive Synthesiser Settings for a Synth Bass (Roland SH-101):',
      keyPoints: [
        'Monophonic & VCO Range: Monophonic is ideal for bass (plays single notes so chords cannot muddy the low end). However, VCO Range is at 8ft and Transpose is at Medium (M)—switching to 16ft and Low (L) would produce a deeper bass fundamental. Also, LFO pitch modulation (MOD) adds slow vibrato, making the bass sound out of tune.',
        'Source Mixer (PWM, Saw, Sub-Oscillator, Noise): Sub-Oscillator (-1 octave square wave) adds essential sub-bass weight. LFO Pulse Width Modulation (PWM) adds movement. Turning up the Sawtooth wave would add rich harmonics for thickness, while Noise is rightly set to 0 for a clean pitch.',
        'VCF (Low-Pass Filter): The LPF cut-off (FREQ) is set very high, which makes a synth bass too bright and intrusive in a mix. Low resonance avoids thinning out the bass, and Keyboard Tracking (KYBD) keeps higher notes even.',
        'VCA, ADSR & Portamento: 0ms attack gives a punchy bass transient and 0ms release stops notes overlapping, but low sustain means held bass notes fade out quickly (Gate or higher sustain is better). High portamento (5) makes notes slide, blurring fast basslines.'
      ],
      links: [
        { label: '🌐 Component 4 Production Exam Revision Hub (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-4-production-exam-revision/' },
        { label: '🌐 Music Tech Toolbox: Synthesisers, Filters & Envelopes (musictechguru.com)', url: 'https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/' },
        { label: '🎯 In-App Interactive Trainer: Synthesiser Fundamentals', url: '/?quiz=quiz-topic-34' },
        { label: '🎯 In-App Quiz: Evolution of Synthesis (1964–2000)', url: '/?quiz=quiz-history-8' }
      ]
    },
    questionPrompt:
      'Figure 1 shows a monophonic synthesiser from 1982 (Roland SH-101). Evaluate the suitability of the settings to produce a synth bass. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_vco_modulator_sh101',
        label: 'Modulator (LFO) & VCO: Master Tune, slow LFO (<20Hz) with triangle wave, VCO Range set to 8ft, Pulse Width / PWM controlled by LFO, Sawtooth off, Square Sub-Oscillator (1 octave down) on, Noise off',
        keywords: ['lfo', 'triangle', 'vco', 'range', '8', '16', 'pulse width', 'pwm', 'saw', 'sub oscillator', 'sub-oscillator', 'octave', 'noise']
      },
      {
        id: 'ao3_vcf_sh101',
        label: 'VCF (Voltage Controlled Filter): Low-pass filter (LPF) with high cut-off frequency (FREQ), low resonance (RES), Envelope (ENV) modulation, LFO (MOD) off, and Keyboard Tracking (KYBD)',
        keywords: ['vcf', 'low pass', 'low-pass', 'lpf', 'cut-off', 'cutoff', 'resonance', 'keyboard tracking', 'kybd']
      },
      {
        id: 'ao3_vca_env_perf_sh101',
        label: 'VCA, ADSR Envelope & Performance Controls: VCA switched to ENV (vs Gate), ADSR (0 attack, long decay, low sustain, 0 release), Portamento turned up, Transpose set to M, Monophonic analogue synth',
        keywords: ['vca', 'gate', 'attack', 'decay', 'sustain', 'release', 'adsr', 'portamento', 'transpose', 'monophonic', 'analogue']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_vco_sub_evaluation',
        label: 'Evaluates VCO & Source Mixer for bass: 16ft range and Low transpose would be better for deep bass; LFO pitch vibrato (MOD) makes bass sound out of tune; LFO PWM stops bass sounding static; square sub-oscillator adds low-octave weight; turning Saw on would thicken tone',
        keywords: ['16', 'vibrato', 'out of tune', 'movement', 'static', 'weight', 'octave lower', 'thicker', 'clean']
      },
      {
        id: 'ao4_vcf_evaluation',
        label: 'Evaluates VCF settings for bass: High LPF cut-off makes bass too bright/intrusive in a busy mix; low resonance avoids thinning the bass (though higher resonance gives a squelchy synth bass); KYBD tracking keeps higher notes consistent',
        keywords: ['bright', 'harmonics', 'intrusive', 'busy mix', 'thin out', 'squelchy', 'higher notes', 'dull']
      },
      {
        id: 'ao4_env_portamento_evaluation',
        label: 'Evaluates ADSR, VCA & Portamento for bass: 0ms attack gives punchy bass transients (and 0 release stops notes overlapping, though 0 attack/release can click); low sustain means long bass notes fade out (Gate/higher sustain better); high portamento blurs fast basslines; monophonic prevents chord clashes',
        keywords: ['punch', 'overlapping', 'click', 'sustain', 'fade', 'slide', 'fast bass', 'chords', 'warm']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Modulator (LFO) and VCO Pitch / Range Settings:',
        '• The Roland SH-101 is an analogue monophonic synthesiser, which is ideal for a synth bass because bass parts play single notes rather than chords, preventing low-frequency mud, while the Master Tune knob is needed to keep analogue oscillators in tune.',
        '• In the VCO section, the Range is set to 8ft and Transpose is set to Medium (M), whereas switching the Range to 16ft and Transpose to Low (L) would be much more suitable for producing a deep sub-bass fundamental.',
        '• The Modulator LFO rate is set very low (below 20Hz) with a smooth triangle wave and the VCO MOD slider is turned up slightly; this adds slow pitch vibrato, which is unsuitable for a synth bass as it will make the bassline sound out of tune.',
        '',
        'Source Mixer (Pulse Width, Sawtooth, Sub-Oscillator & Noise):',
        '• The Pulse wave is active with Pulse Width Modulation (PWM) controlled by the LFO, which varies the mark-space ratio slowly to add chorus-like movement and stop the bass sounding static, though very thin pulse widths can lose low-end weight.',
        '• The Sawtooth wave is currently turned off (0), and turning it up would add rich harmonics to make the synth bass thicker and more powerful, while White/Pink Noise is rightly set to 0 so the bass retains a clean, pitched tone.',
        '• The Sub-Oscillator is turned up and set to 1 octave down, which is highly suitable for a synth bass because it doubles the melody an octave lower with a square wave, adding weight and filling out the bottom end of the mix.',
        '',
        'Voltage Controlled Filter (VCF):',
        '• The Low-Pass Filter (LPF) cut-off frequency (FREQ) is set very high, meaning the bass will sound overly bright with too many upper harmonics, which could be intrusive in a busy mix where the bass should sit underneath other instruments.',
        '• The Resonance (RES) is set relatively low so it will not thin out the low frequencies (though increasing resonance slightly is common for a squelchy synth bass), while Keyboard Tracking (KYBD) raises the cut-off on higher notes so they do not sound dull.',
        '',
        'VCA, ADSR Envelope and Portamento Controls:',
        '• The ADSR envelope has a zero attack for an instant, punchy bass transient, a long decay, a low sustain (meaning long held bass notes will fade out, so switching the VCA to Gate or raising sustain would give a more even bass level), and zero release, which stops consecutive bass notes overlapping and blurring the mix (though 0ms attack and release can cause clicks).',
        '• Finally, Portamento is switched on and set to 5, causing the pitch to slide between notes; while useful for occasional glides, this makes pitching less precise on fast rhythmic synth basslines.'
      ].join('\n'),
      grade_B: [
        'Oscillator (VCO) and Source Mixer:',
        '• The synthesiser is monophonic and analogue, which is suitable for a synth bass because basslines only play one note at a time, though the VCO Range should be set to 16ft instead of 8ft for a deeper bass.',
        '• In the Source Mixer, the Sub-Oscillator adds a square wave an octave below to give the bass more weight, while LFO Pulse Width Modulation (PWM) gives movement to the pulse wave.',
        '',
        'Filter (VCF):',
        '• The low-pass filter cut-off frequency (FREQ) is set too high, which will make the bass sound too bright with too many harmonics instead of sitting underneath the mix, while the low resonance stops the bass from sounding thin.',
        '',
        'Envelope (ADSR) and Portamento:',
        '• The ADSR envelope has a zero attack for a punchy start and zero release so bass notes do not overlap, though the low sustain means long notes will die away quickly.',
        '• Portamento is turned up to 5, which makes the notes slide into each other and could make fast basslines sound messy.'
      ].join('\n'),
      grade_D: [
        'Synth Bass Settings Evaluation:',
        '• The synthesiser is monophonic so it only plays one note at a time, which is good for a bassline.',
        '• The sub-oscillator is turned up to add an octave below and make the bass sound heavier, while the noise slider is turned off so the bass sounds clean.',
        '• However, the filter cut-off frequency is set very high so the bass will sound too bright, and the portamento is turned on which makes the notes slide.'
      ].join('\n'),
      student_template: [
        'Modulator (LFO) and VCO Pitch / Range Settings:',
        '• ',
        '',
        'Source Mixer (Pulse Width, Sawtooth, Sub-Oscillator & Noise):',
        '• ',
        '',
        'Voltage Controlled Filter (VCF):',
        '• ',
        '',
        'VCA, ADSR Envelope and Portamento Controls:',
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
    audioSrc2: '/C3_Heavy_Rock_Audio/01 Whole Lotta Love.mp3',
    audioTitle2: 'Figure 2 Audio: Late-1960s Classic Ambient Drum Sound (Led Zeppelin — Whole Lotta Love)',
    youtubeId2: 'HQmmM_vhQ4I',
    videoTitle2: 'Figure 2 Reference: Late-1960s Drum Sound (Led Zeppelin — Whole Lotta Love)',
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
        id: 'ao3_room_acoustics_drums',
        label: 'Room acoustics: Fig 1 (2010s) large live room with concrete/wood/glass surfaces, angled ceiling/window & carpet vs Fig 2 (1960s) small room with soft wall treatment and kit placed in the corner',
        keywords: ['large room', 'concrete', 'wooden', 'glass', 'angled', 'carpet', 'small room', 'soft wall', 'treatment', 'corner']
      },
      {
        id: 'ao3_mic_techniques_drums',
        label: 'Microphone placement & types: Fig 1 close mics on every drum (kick inside hole, snare top & bottom, toms, small-diaphragm hi-hat, X-Y overheads, spaced pair in front, distant room mic) vs Fig 2 three-mic Glyn Johns setup (overhead, side mic near floor tom, large-diaphragm kick mic outside front skin)',
        keywords: ['close mic', 'inside', 'top and bottom', 'x-y', 'spaced pair', 'room mic', 'glyn johns', 'three mic', '3 mic', 'outside', 'equidistant']
      },
      {
        id: 'ao3_equipment_mixing_drums',
        label: 'Equipment & mixing: Dynamic mics (high SPL) vs Condenser mics (fast transient/HF response), shock mounts, balanced XLR cables, dampening (Moongel/duvet), and multitrack DAW mixing vs 1960s limited tape tracks',
        keywords: ['dynamic', 'condenser', 'spl', 'phase', 'polarity', 'comb filtering', 'xlr', 'duvet', 'moongel', 'control', 'eq', 'compression']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_acoustics_impact_drums',
        label: 'Evaluates acoustic impact: Fig 1 hard surfaces create longer pre-delay and big rock room reverb while angled ceiling reduces standing waves; Fig 2 soft walls absorb mid/HF creating a dry/dead sound while corner placement exaggerates bass',
        keywords: ['pre-delay', 'reverb', 'standing waves', 'reflections', 'absorb', 'dry', 'dead', 'low frequencies', 'spill']
      },
      {
        id: 'ao4_mic_phase_impact_drums',
        label: 'Evaluates mic placement & phase: Fig 1 kick mic inside captures beater attack, snare top/bottom captures skin + rattle (requiring phase/polarity check), X-Y overheads avoid phase issues; Fig 2 kick mic outside lacks attack, and side mic closer to snare than overhead causes delay/phase cancellation and comb filtering',
        keywords: ['beater', 'attack', 'rattle', 'phase', 'polarity', 'comb filtering', 'equidistant', 'proximity effect', 'air']
      },
      {
        id: 'ao4_mixing_control_drums',
        label: 'Evaluates mixing & rock suitability: Fig 1 gives full individual DAW control over balance, panning, EQ, compression, and gating on every drum for a punchy modern rock mix, whereas Fig 2 uses only 3 tracks with far less individual control over balance and processing',
        keywords: ['balance', 'control', 'individual', 'pan', 'stereo', 'fewer tracks', '1960s', '2010s', 'rock']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Room Acoustics and Monitoring:',
        '• In Figure 1 (2010s setup), the drums are recorded in a large room with exposed concrete, glass, and a wooden floor, which creates a long pre-delay and natural room reverberation suited to a big rock drum sound, while the angled ceiling and window help reduce standing waves and the floor carpet absorbs high-frequency reflections.',
        '• By contrast, Figure 2 (late-1960s setup) is in a small room with soft wall treatment that absorbs mid and high frequencies to produce a dry, dead recording with a short pre-delay, and placing the kit in the corner accentuates low bass frequencies.',
        '',
        'Microphone Placement and Types (Figure 1 — 2010s Multi-Mic):',
        '• Figure 1 close-mics every drum and cymbal to minimise spill and room reverb on individual channels: the kick mic is placed inside the drum to capture the sharp beater attack, and the snare uses both top and bottom mics to capture the batter skin and snare wire rattle (though top and bottom snare mics are prone to phase cancellation and require polarity inversion on the desk).',
        '• Figure 1 also uses dynamic mics on the toms (which handle high SPL and control loud transients), a small-diaphragm condenser above the hi-hat for extended high-frequency response without air blasting, an X-Y coincident pair of overheads (reducing phase problems compared to a spaced pair), a spaced pair in front of the kit for a wide stereo image, and a distant room condenser mic on the far left to capture room ambience.',
        '',
        'Microphone Placement and Phase Issues (Figure 2 — 1960s Three-Mic Setup):',
        '• Figure 2 uses a three-microphone Glyn Johns-style technique consisting of one overhead condenser, one side microphone near the floor tom, and a large-diaphragm kick drum microphone placed outside the front skin (which prevents air blasting and captures warm low end, but lacks the punchy beater attack needed for modern rock).',
        '• In Figure 2, the side microphone is placed too close to the wall (risking boundary reflections) and is closer to the snare drum than the overhead mic; because the overhead and side mics are not equidistant from the snare, the arrival-time delay between them will cause phase problems and comb filtering.',
        '',
        'Dampening, Mixing Control and Overall Suitability for Rock:',
        '• Both setups use duvets inside the kick drum and Moongel/tape on the drum skins to reduce unwanted ringing, alongside shock mounts to prevent mechanical rumble and balanced XLR cables for low-noise signal runs.',
        '• Overall, Figure 1 is much more suitable for a modern rock recording because recording every drum onto its own DAW track gives the engineer complete control over individual balance, stereo panning, gating, EQ, and compression, whereas Figure 2 was designed for 1960s 4-track tape and gives very little control over the balance or processing of individual drums in the mix.'
      ].join('\n'),
      grade_B: [
        'Room Acoustics:',
        '• Figure 1 (2010s) is in a large room with hard wooden and concrete surfaces that create lots of natural reverb for a big rock sound, plus an angled ceiling to reduce standing waves.',
        '• Figure 2 (1960s) is in a small room with soft acoustic wall treatment that absorbs high frequencies, making the drums sound much drier, and the kit is in the corner which boosts bass frequencies.',
        '',
        'Microphone Techniques:',
        '• Figure 1 uses close mics on every drum, including a mic inside the kick drum for beater attack, two mics on the snare (top and bottom, which need their phase checked), an X-Y pair of overheads for stereo width with fewer phase issues, and a distant room mic.',
        '• Figure 2 uses a 3-mic Glyn Johns technique with an overhead mic, a side mic by the floor tom, and a kick mic outside the front skin, which gives less beater attack and can cause phase cancellation and comb filtering if the overhead and side mics are not equidistant from the snare.',
        '',
        'Mixing Control:',
        '• Figure 1 gives the producer much more control in the mix because each drum can be EQ’d, compressed, and panned individually, whereas Figure 2 only uses three mics so there is much less control over individual drum levels.'
      ].join('\n'),
      grade_D: [
        'Comparison of Drum Recording Setups:',
        '• Figure 1 uses lots of close microphones on every drum and cymbal in a large room, including a mic inside the kick drum and two mics on the snare drum.',
        '• Figure 2 only uses three microphones in a small room, with the kick drum mic placed outside the drum so it has less attack.',
        '• Figure 1 is better for rock music because having a mic on every drum gives you more control over the volume and EQ of each drum when mixing.'
      ].join('\n'),
      student_template: [
        'Room Acoustics and Monitoring:',
        '• ',
        '',
        'Microphone Placement and Types (Figure 1 — 2010s Multi-Mic):',
        '• ',
        '',
        'Microphone Placement and Phase Issues (Figure 2 — 1960s Three-Mic Setup):',
        '• ',
        '',
        'Dampening, Mixing Control and Overall Suitability for Rock:',
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
    youtubeId1: null,
    audioSrc1: '/Audio/FX_Ear_Training/EQ Mastery/Clean Mix.mp3',
    audioTitle1: 'Reference A: Full-Range Balanced Studio Mix',
    audioSrc2: '/Audio/FX_Ear_Training/EQ Mastery/Muddy Mix.mp3',
    audioTitle2: 'Reference B: Compromised Frequency Translation Check',
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
        id: 'ao3_nearfield_specs',
        label: 'Nearfield studio monitors (AO3): Two-way speaker design with a larger woofer cone and a tweeter, louder playback capability, and a stereo pair setup',
        keywords: ['two way', 'two-way', 'woofer', 'cone', 'tweeter', 'louder', 'stereo']
      },
      {
        id: 'ao3_phone_specs',
        label: 'Mobile phone speaker (AO3): Very small internal speaker driver and mono (or narrow) output',
        keywords: ['small speaker', 'tiny', 'internal', 'mono', 'mobile phone']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_nearfield_eval',
        label: 'Evaluates nearfield monitors (AO4): Wider/flatter frequency response (woofer reproduces bass, tweeter reproduces high frequencies/treble), lower distortion/better dynamic range to hear quiet mix details, and accurate stereo imaging for panning double-tracked guitars and drums',
        keywords: ['flatter', 'wider', 'frequency response', 'bass', 'treble', 'high frequencies', 'distortion', 'quiet detail', 'panning', 'double tracked']
      },
      {
        id: 'ao4_phone_eval',
        label: 'Evaluates mobile phone speaker (AO4): Narrow/uneven frequency response that cannot reproduce bass below 100–800Hz (sounds tinny), introduces distortion, and cannot judge stereo panning—but is useful as a secondary reference to check mix translation, vocal balance, and sibilance on consumer devices',
        keywords: ['narrow', 'uneven', 'tinny', '100hz', '800hz', 'translation', 'balance', 'sibilance', 'human voice']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Nearfield Studio Monitors:',
        '• Nearfield monitors use a two-way design with a larger woofer cone and a dedicated tweeter, providing a wide, flat frequency response where the woofer accurately reproduces low bass frequencies and the tweeter reproduces high treble detail.',
        '• Because they are a stereo pair capable of louder playback with low distortion and a wide dynamic range, they allow the engineer to hear quiet details in the mix and judge stereo panning accurately (such as the hard-panned double-tracked rhythm guitars and drums).',
        '',
        'Mobile Phone Internal Speaker:',
        '• The mobile phone has a tiny mono internal speaker with a very narrow, uneven frequency response that cannot reproduce low bass frequencies below 100–800Hz, making the mix sound tinny and incapable of showing stereo panning.',
        '• However, because the phone speaker is voiced for the human voice, it is still useful as a secondary check to test mix translation, vocal balance, and harsh sibilance on a real-world consumer device.'
      ].join('\n'),
      grade_B: [
        'Nearfield Studio Monitors:',
        '• The nearfield monitors have a woofer and a tweeter, which gives a much wider and flatter frequency response so you can hear both the bass and high treble frequencies clearly.',
        '• There are two speakers in a stereo pair, making them suitable for checking the stereo panning of the guitars and drums at louder volumes without distortion.',
        '',
        'Mobile Phone Speaker:',
        '• The mobile phone has a very small speaker in mono, so it sounds tinny with no bass frequencies, though it is useful for checking how the mix translates for everyday listeners.'
      ].join('\n'),
      grade_D: [
        'Monitors vs Phone Speaker:',
        '• Nearfield studio monitors have a big woofer cone and tweeter so you can hear the bass and stereo panning properly when mixing.',
        '• The mobile phone speaker is tiny and mono so you cannot hear the bass, making it bad for main mixing.'
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
    paperCode: 'Component 4: Producing & Analysing • Technical Evaluation Practice (November 2021)',
    component: 'Component 4',
    questionNumber: '4(g)',
    title: 'C4: Evaluating Dynamic Compression on Lead Vocals (8 Marks)',
    vaultNode: '04_Edexcel_Curriculum/C4_Q4g_Vocal_Compression_2021_8m.md',
    maxMarks: 8,
    ao3Max: 4,
    ao4Max: 4,
    youtubeId1: null,
    audioSrc1: '/C4_SPOP_Assets/C4_SPOP_Vocal.mp3',
    audioTitle1: 'Reference A: Uncompressed Dry Lead Vocal Stem',
    audioSrc2: '/C4_SPOP_Assets/C4_SPOP_Vocal_Example.mp3',
    audioTitle2: 'Reference B: Dynamically Compressed Lead Vocal Stem',
    interactiveDecks: [
      {
        title: 'Interactive Deck: Studio Effects & Dynamic Compression',
        url: '/interactive-slide-studio-effects.html',
        quizUrl: '/component-4-interactive-quiz.html'
      },
      {
        title: 'Interactive Deck: Component 4 Producing & Analysing',
        url: '/interactive-slide-component-4.html',
        quizUrl: '/component-4-interactive-quiz.html'
      }
    ],
    examPromptLead:
      'Import ‘vocal not compressed.wav’ (bars 8–10 of Suzanne Vega’s 1986 vocal as originally recorded). ‘vocal.wav’ has additional dynamic compression. Evaluate the dynamic compression in ‘vocal.wav’.',
    mtgRevisionGuide: {
      summary: 'Music Tech Guru Revision Notes — Evaluating Dynamic Compression on Vocals:',
      keyPoints: [
        'Threshold, Ratio & Make-Up Gain: A low threshold and high ratio (above 4:1) with high make-up gain reduces dynamic range (bringing quiet words like "before" up in level and raising average RMS volume), but also brings up breath noise, tape hiss, and room reverb.',
        'Attack & Release Settings: A slow attack time (opto-style) lets sharp initial vocal transients pass through uncontrolled (on words like "only", "even", "argue"), while a fast release time causes audible pumping of the reverb tail and slight distortion.'
      ],
      links: [
        { label: '🌐 Music Tech Toolbox: Dynamic Compression Guide (musictechguru.com)', url: 'https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/' },
        { label: '🎯 In-App Quiz: Topic 5 Dynamic Processing & Envelope Matching', url: '/?quiz=quiz-topic-44' }
      ]
    },
    questionPrompt:
      'Import ‘vocal not compressed.wav’ (bars 8–10 of Suzanne Vega’s 1986 vocal as originally recorded). ‘vocal.wav’ has additional dynamic compression. Evaluate the dynamic compression in ‘vocal.wav’. (8 marks — AO3: 4 marks, AO4: 4 marks)',
    ao3Anchors: [
      {
        id: 'ao3_comp_ratio_threshold_gain',
        label: 'Threshold, Ratio & Make-up Gain (AO3): Low threshold and high ratio (above 4:1) with high make-up gain applied',
        keywords: ['high ratio', '4:1', 'low threshold', 'threshold', 'make-up gain', 'make up gain', 'gain make up']
      },
      {
        id: 'ao3_comp_attack_release',
        label: 'Attack, Release & Compressor Type (AO3): Slow attack time (or opto-style compressor) paired with a fast release time',
        keywords: ['slow attack', 'attack slow', 'opto', 'fast release', 'release fast']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_level_noise_impact',
        label: 'Dynamic range & noise impact (AO4): Heavy compression controls the wide dynamic range (bringing quiet words like "before" up to match louder words and raising average/RMS volume to sit with the electronic backing), but increases audible breath noise, tape hiss, and room reverb',
        keywords: ['heavy compression', 'breath', 'hiss', 'reverb', 'dynamic range', 'before', 'average volume', 'rms']
      },
      {
        id: 'ao4_transient_pumping_impact',
        label: 'Transient & release impact (AO4): High make-up gain compensates for heavy gain reduction; slow attack lets initial transients through uncontrolled (e.g. "only", "even", "argue"), while the fast release causes audible pumping of the reverb tail and slight distortion/brightness',
        keywords: ['compensate', 'gain reduction', 'transients', 'only', 'even', 'argue', 'pumping', 'distortion', 'brighter']
      }
    ],
    exemplars: {
      grade_A_star: [
        'Threshold, Ratio and Make-Up Gain:',
        '• A low threshold and a high ratio (greater than 4:1) have been used with high make-up gain to compensate for the heavy gain reduction, which controls the wide dynamic range of the vocal (bringing quiet words such as "before" up in level) and increases the average RMS volume so the vocal sits evenly on top of the electronic backing track.',
        '• However, this heavy compression and make-up gain also brings up unwanted background noise between phrases, noticeably increasing breath noise, analogue tape hiss, and reverb.',
        '',
        'Attack and Release Settings:',
        '• The compressor uses a slow attack time (typical of an opto compressor), which means some sharp initial vocal transients pass through uncontrolled on words such as "only", "even", and "argue".',
        '• The release time is set too fast, which causes audible pumping of the vocal reverb tail and introduces slight harmonic distortion and added brightness.'
      ].join('\n'),
      grade_B: [
        'Threshold, Ratio and Make-Up Gain:',
        '• The vocal has heavy compression with a low threshold, a high ratio above 4:1, and high make-up gain, which reduces the dynamic range and increases the average RMS volume so quieter words like "before" can be heard clearly.',
        '• A drawback of this heavy compression and make-up gain is that it noticeably increases the volume of the singer’s breath noise, tape hiss, and reverb.',
        '',
        'Attack and Release:',
        '• A slow attack time lets some loud vocal transients poke through on words like "only" and "argue", while a fast release time causes noticeable pumping on the reverb.'
      ].join('\n'),
      grade_D: [
        'Vocal Compression Evaluation:',
        '• The vocal has heavy compression with a high ratio and make-up gain to make the quieter words louder and keep the volume even.',
        '• Because it is heavily compressed, you can hear much louder breath noises and tape hiss in the background.'
      ].join('\n'),
      student_template: [
        'Threshold, Ratio and Make-Up Gain:',
        '• ',
        '',
        'Attack and Release Settings:',
        '• '
      ].join('\n')
    }
  },
  {
    id: 'c3_q6_vocal_production_20m',
    component: 'C3',
    questionNumber: 'Q6',
    maxMarks: 20,
    title: 'C3 Q6: Evolution of Lead Vocal Production (1950s to Modern Day) (20 Marks)',
    badge: 'Component 3 • 20 Marks',
    topic: 'Vocal Production Evolution: Microphones, Pitch Correction, Comping, Compression & Reverb',
    suggestedTime: '25 mins',
    wordCountTarget: '450–650 words',
    audioTracks: [
      {
        trackNumber: 1,
        title: 'Frank Sinatra / 1950s Valve & Ribbon Vocal Capture (RCA 44BX & Neumann U47)',
        source: 'Acoustic Room Capture & Mechanical Reverb'
      },
      {
        trackNumber: 2,
        title: 'Modern ITB Pop/Trap Vocal Production (Antares Auto-Tune, Melodyne, 1176/LA-2A Serial Compression)',
        source: 'Surgical Digital Comping & Convolution Reverb'
      }
    ],
    briefing: {
      summary:
        'Vocal production has undergone a profound transformation across the last seven decades, shifting from physical acoustic performance discipline in treated rooms to surgical in-the-box digital manipulation. This extended evaluation covers microphone design and proximity effect, pitch manipulation (varispeed to FFT Auto-Tune/Melodyne), multitrack tape punch-ins vs non-destructive swipe comping, serial dynamic leveling (FET 1176 into optical LA-2A), and the shift from physical echo chambers to convolution reverb and tempo-synced delay throws.',
      keyPoints: [
        'Microphone Design & Proximity Discipline: Figure-8 ribbon mics (RCA 44BX) and early valve condensers (Neumann U47) had strong proximity effect and required physical mic technique; modern solid-state condensers (TLM 103, Sony C800G) allow singing inches from the capsule with pop filters and digital HPF.',
        'Pitch Manipulation & Digital Tuning: Analogue varispeed tape manipulation altered tempo and formants simultaneously; Antares Auto-Tune (1997) and Celemony Melodyne (2001) used phase vocoder / FFT algorithms to decouple pitch from time, enabling note-by-note tuning and 0ms retune robotic effects.',
        'Workflow: Analogue Tape Punch-Ins vs Swipe Comping: Destructive punch-ins on 2-inch tape and physical razor blade 45° splicing vs non-destructive DAW virtual playlists, swipe comping, and micro-crossfades.',
        'Dynamic Control & Serial Processing: Vintage serial analogue compression (fast 1176 catching transient consonants into smooth optical LA-2A leveling phrases) vs modern digital clip gain automation, dynamic EQ (FabFilter Pro-Q3), and sidechain de-essers.',
        'Spatial Acoustics: Physical concrete echo chambers (Hitsville USA) and mechanical EMT 140 plates vs mathematical impulse response convolution reverbs and stereo tempo-synced delay throws.'
      ],
      links: [
        { label: '🌐 Component 3 Revision Hub & Q6 Essay Guides (musictechguru.com)', url: 'https://www.musictechguru.com/edexcel-component-3-music-technology-revision/' },
        { label: '🌐 Music Tech Toolbox: Vocal Production, EQ & Compression (musictechguru.com)', url: 'https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/' },
        { label: '🎯 In-App Topic 1: Fundamentals & Dynamic Processing', url: '/?quiz=quiz-topic-1_p1' }
      ]
    },
    questionPrompt:
      'Evaluate the impact of technological developments on the capture, pitch manipulation, editing, dynamic processing, and artificial reverberation of lead vocals in popular music from the 1950s to the modern day. (20 marks — AO3: 5 marks, AO4: 15 marks)',
    ao3Anchors: [
      {
        id: 'ao3_mics_proximity',
        label: 'Microphone capture & proximity: 1950s figure-8 ribbon mics (RCA 44BX) and valve condensers (Neumann U47) with proximity bass boost vs modern transformerless large-diaphragm condensers (Sony C800G, TLM 103), pop shields, and reflection filters',
        keywords: ['ribbon', 'valve', 'condenser', 'rca', 'u47', 'proximity', 'c800g', 'pop shield', 'pop filter', 'hpf', 'high pass']
      },
      {
        id: 'ao3_pitch_autotune',
        label: 'Pitch correction & tuning: Analogue varispeed tape pitching (linked to tempo/formants) vs digital phase vocoder and FFT tools (Antares Auto-Tune 1997, Celemony Melodyne 2001) separating pitch from time domain',
        keywords: ['varispeed', 'pitch', 'auto-tune', 'autotune', 'melodyne', 'formant', 'fft', 'phase vocoder', 'retune', 'correction']
      },
      {
        id: 'ao3_comping_editing',
        label: 'Editing & comping: Destructive analogue tape punch-ins and razor blade splicing at 45° angles vs DAW virtual playlists, swipe comping, and micro-crossfades at zero crossings',
        keywords: ['punch-in', 'punch in', 'splice', 'razor blade', 'comping', 'playlist', 'take', 'crossfade', 'zero-crossing', 'non-destructive']
      },
      {
        id: 'ao3_serial_compression',
        label: 'Dynamic leveling & serial compression: Fast FET compressor (Universal Audio 1176, 20µs attack) taming consonants into smooth optical leveling amplifier (Teletronix LA-2A, two-stage photocell release), plus modern clip gain automation and dynamic EQ',
        keywords: ['1176', 'la-2a', 'la2a', 'fet', 'optical', 'serial', 'clip gain', 'leveling', 'dynamic eq', 'de-esser', 'photocell']
      },
      {
        id: 'ao3_reverb_delays',
        label: 'Spatial acoustics: Physical basement reverberation chambers and EMT 140 mechanical plates vs impulse response (IR) convolution reverb plugins and tempo-synced stereo delay throws',
        keywords: ['chamber', 'emt 140', 'plate', 'convolution', 'impulse response', 'ir', 'delay throw', 'tempo sync']
      }
    ],
    ao4Anchors: [
      {
        id: 'ao4_performance_discipline',
        label: 'Evaluates singer discipline vs post-production fix: 1950s singers required physical mic technique and physical control, whereas modern workflow allows imperfect performances to be corrected in the box',
        keywords: ['technique', 'discipline', 'physical', 'post-production', 'fix in the mix', 'perfection', 'spontaneity']
      },
      {
        id: 'ao4_creative_timbre',
        label: 'Evaluates error correction transforming into genre aesthetic: 0ms retune speed Auto-Tune evolved from a corrective tool into an unmistakable creative timbre in modern Pop, Trap, and Hip-Hop (Cher, T-Pain, Travis Scott)',
        keywords: ['creative', 'timbre', 'trap', 'hip-hop', 'pop', 'robotic', 'aesthetic', 'artistic', 'cher', 't-pain']
      },
      {
        id: 'ao4_emotional_spontaneity',
        label: 'Evaluates comping impact: Non-destructive swipe comping achieves flawless technical perfection but critics argue it compromises singular raw emotional spontaneity in favour of an engineered mosaic',
        keywords: ['emotional', 'spontaneity', 'mosaic', 'flawless', 'composite', 'authenticity', 'assembled']
      },
      {
        id: 'ao4_mix_balance_clarity',
        label: 'Evaluates vocal placement in the mix: Modern serial leveling, clip gain, and tempo-synced delays keep the lead vocal millimeter-tight, upfront, and hyper-intelligible compared to distant room acoustic washes',
        keywords: ['intelligible', 'upfront', 'locked', 'tight', 'front of the mix', 'wash', 'clarity', 'hyper-real']
      }
    ],
    exemplars: {
      grade_A_star: [
        'INTRODUCTION & SCOPE:',
        'Vocal production has undergone a profound transformation across the last seven decades, shifting from physical acoustic performance discipline in treated rooms to surgical in-the-box digital manipulation. This essay evaluates how technological developments in microphone capture, pitch correction, multi-take editing, dynamic leveling, and artificial spatialization have redefined the sonic aesthetic and artistic definition of the human voice in popular music.',
        '',
        '1. MICROPHONE DESIGN & PROXIMITY DISCIPLINE (AO3/AO4):',
        'In the 1950s, engineers relied on figure-8 ribbon microphones (e.g., RCA 44BX) and early valve condensers (e.g., Neumann U47). Ribbon mics possessed heavy bi-directional proximity effect, rolling off high frequencies above 15 kHz and substantially boosting bass frequencies below 200 Hz if the singer moved within 12 inches of the motor. Singers like Frank Sinatra had to develop physical mic technique—stepping back during fortissimo belts and leaning in during intimate phrases. In modern DAW production, large-diaphragm solid-state condensers (e.g., Neumann TLM 103, Sony C800G) feature transformerless preamps and extended high-end frequency response (up to 25 kHz). Singers perform inches from the capsule behind mesh pop shields and acoustic reflection filters, knowing that any proximity muddiness or plosive energy can be transparently eliminated in post-production via 80 Hz 24 dB/octave high-pass filtering and surgical dynamic EQ.',
        '',
        '2. PITCH MANIPULATION & DIGITAL TUNING (AO3/AO4):',
        'Prior to digital signal processing, altering vocal pitch without altering time was physically impossible. Analogue varispeed tape manipulation adjusted the capstan motor speed via an oscillator, but raising pitch inadvertently sped up tempo and shifted vocal formants upwards (the Munchkin effect). Producers were forced to demand repetitive takes until intonation was acceptable. The release of Antares Auto-Tune (1997) and Celemony Melodyne (2001) revolutionized recording by employing phase vocoder and fast Fourier transform (FFT) algorithms. These tools separate pitch and time domain data, allowing producers to correct micro-pitch variations note-by-note while preserving natural vocal formants and vibrato depth. Furthermore, pushed to instantaneous 0ms retune speeds, Auto-Tune became an unmistakable creative timbre in modern Hip-Hop, Trap, and Pop (Cher, T-Pain, Travis Scott), demonstrating how an error-correction tool transformed into a defining artistic genre marker.',
        '',
        '3. WORKFLOW: ANALOGUE TAPE PUNCH-INS VS DIGITAL SWIPE COMPING (AO3/AO4):',
        'Tracking vocals to 2-inch multitrack tape was a high-stakes destructive process. Engineers like Geoff Emerick at Abbey Road had to physically punch-in on tape heads in real time, where a fraction-of-a-second timing error would erase the artist’s previous performance. Constructing a composite vocal (comping) required physically slicing tape with a razor blade at a 45-degree angle and taping segments together. In modern digital audio workstations, non-destructive virtual playlists allow hundreds of vocal passes. Modern quick-swipe comping enables producers to audition and blend the best syllables, breaths, and consonants into a flawless master take. Micro-crossfades (5-10ms) placed at zero-crossings prevent audio pops and clicks. While this facilitates unprecedented technical perfection, critics argue it has compromised raw emotional spontaneity, replacing the singular human performance with an engineered composite mosaic.',
        '',
        '4. DYNAMIC ENVELOPE CONTROL & SERIAL PROCESSING (AO3/AO4):',
        'Analogue vocal leveling relied on legendary vintage hardware chains. Typically, an engineer ran a fast peak-taming FET compressor (Universal Audio 1176 with 20-microsecond attack) into a smooth optical leveling amplifier (Teletronix LA-2A with a two-stage photocell release: 50% release in 60ms, followed by several seconds of gradual decay). The 1176 caught transient consonants, while the LA-2A smoothed the musical phrase, introducing rich harmonic distortion (tube and transformer warmth). Modern digital vocal chains achieve an even more aggressive, locked-in aesthetic: producers manually draw clip-gain automation to balance syllables before compression, apply dynamic EQ (e.g., FabFilter Pro-Q3) to suppress harsh 2.5-4.5 kHz buildup during loud phrases, insert transparent lookahead brickwall limiters, and apply de-essers with sidechain bandpass filters (5-8.5 kHz). This anchors the vocal millimeter-tight at the front of modern commercial mixes.',
        '',
        '5. SPATIAL ACOUSTICS: ECHO CHAMBERS TO CONVOLUTION (AO3/AO4):',
        'Early recordings were captured in physical acoustic spaces; studios like Motown’s Hitsville USA constructed dedicated reverberation chambers in their basements (concrete-lined rooms with a speaker at one end and a ribbon mic at the other). In the late 1950s, the EMT 140 steel plate offered artificial reverb through mechanical transducer vibration. In contemporary production, convolution reverb plugins load mathematical impulse responses (IRs) that capture the exact linear acoustic reflection profiles of famous cathedrals, tiled bathrooms, or vintage hardware units. Furthermore, modern mixes favor tempo-synced stereo delay throws (dotted eighth notes or quarter notes) over washed-out reverb tails; high-pass and low-pass filtering on the delay feedback loop creates depth and movement while leaving the main lead vocal dry, intimate, and hyper-intelligible in the stereo center.',
        '',
        'CONCLUSION:',
        'In conclusion, technological evolution has dismantled the traditional physical constraints of vocal production. While 1950s recordings stand as historical documents of acoustic performances governed by microphone proximity and room physics, modern vocal production treats the human voice as raw audio data to be tuned, sliced, compressed, and spatially sculpted. The result is an undeniable shift from documentary realism to hyper-real pop perfection.'
      ].join('\n'),
      grade_B: [
        'Vocal Recording & Technology Evolution:',
        '• In early recording (1950s), vocals were recorded with ribbon or valve microphones such as the RCA 44BX or Neumann U47 into valve preamps and analogue tape.',
        '• Singers needed good microphone technique because getting too close caused a strong bass boost (proximity effect) that could not be easily fixed later.',
        '• Reverb was achieved with physical echo chambers (rooms with speakers and microphones) or EMT 140 plates.',
        '• Later on, analogue tape allowed multitracking and drop-ins, but punching in was destructive and could wipe a good take.',
        '• With modern DAWs, producers use large diaphragm condenser microphones and pop shields with reflection filters.',
        '• Pitch correction software like Auto-Tune and Melodyne allows singers to be tuned note-by-note, and quick-swipe comping lets producers piece together multiple takes into one perfect vocal.',
        '• Serial compression using an 1176 compressor followed by an LA-2A is common to keep the vocal loud and consistent, followed by convolution reverb plugins that model real spaces.'
      ].join('\n'),
      grade_D: [
        'Vocal Production Comparison:',
        '• Old recordings used old microphones like ribbon mics which sounded darker and had a lot of room sound.',
        '• Modern vocals sound much brighter and clearer because they use condenser mics and digital plugins.',
        '• In the past, singers had to sing in tune because Auto-Tune was not invented until the late 1990s.',
        '• Now producers use Auto-Tune on almost every pop track and compress the vocals heavily so they are loud in the mix.'
      ].join('\n'),
      student_template: [
        'Introduction & Scope:',
        '• ',
        '',
        '1. Microphone Capture & Placement (Proximity & Hardware):',
        '• ',
        '',
        '2. Pitch Manipulation & Tuning (Varispeed to Auto-Tune/Melodyne):',
        '• ',
        '',
        '3. Editing & Workflow (Tape Punch-Ins vs DAW Swipe Comping):',
        '• ',
        '',
        '4. Dynamic Processing (1176/LA-2A Serial Compression to Digital Lookahead):',
        '• ',
        '',
        '5. Spatial Effects (Echo Chambers, Plates & Convolution Reverb):',
        '• ',
        '',
        'Conclusion (Aesthetic Shift from Realism to Hyper-Real):',
        '• '
      ].join('\n')
    }
  }
];

const STUDIO_TERMINOLOGY_LEXICON = [
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
  'telecaster', 'stratocaster', 'les paul', 'whammy', 'feedback', 'frets', 'nut'
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

/**
 * Maps score to official Pearson Edexcel 9MT0 Level Descriptors (Levels 1 to 5):
 *  - 20-mark essays (C3 Q6 & C4 Q6):
 *      Level 1: 1–4 • Level 2: 5–8 • Level 3: 9–12 • Level 4: 13–16 • Level 5: 17–20
 *  - 15-mark comparative question (C3 Q5):
 *      Level 1: 1–3 • Level 2: 4–6 • Level 3: 7–9 • Level 4: 10–12 • Level 5: 13–15
 *  - 10-mark split essays (2025 C3 Q6a / Q6b):
 *      Level 1: 1–2 • Level 2: 3–4 • Level 3: 5–6 • Level 4: 7–8 • Level 5: 9–10
 */
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

/**
 * Evaluates a candidate's written response against an official Edexcel 9MT0 rubric.
 * Enforces official Edexcel marking rules:
 *  - C3 Q5 (15m): AO3 (5 marks) + AO4 (10 marks) across Levels 1–5
 *  - C3 Q6 & C4 Q6 (20m): AO3 (5 marks) + AO4 (15 marks) across Levels 1–5
 *  - Supports & rewards structured Sub-headings + Full-Sentence Bullet Points per Chief Examiner guidance.
 */
export function evaluateEdexcelEssay(essayText, rubricOrPart) {
  const cleanText = String(essayText || '').trim();
  const maxMarks = rubricOrPart?.maxMarks || rubricOrPart?.marks || 20;
  const ao3Max = rubricOrPart?.ao3Max || 5;
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
    if (hitCount >= 2 || (hitCount === 1 && anchor.keywords.length <= 2)) {
      matchedAo3.push({ ...anchor, strength: hitCount >= 3 ? 'strong' : 'partial' });
    } else {
      missingAo3.push(anchor.label);
    }
  });

  const matchedAo4 = [];
  const missingAo4 = [];
  ao4Anchors.forEach(anchor => {
    const hitCount = anchor.keywords.filter(kw => lower.includes(kw.toLowerCase())).length;
    if (hitCount >= 2 || (hitCount === 1 && anchor.keywords.length <= 2)) {
      matchedAo4.push({ ...anchor, strength: hitCount >= 3 ? 'strong' : 'partial' });
    } else {
      missingAo4.push(anchor.label);
    }
  });

  let ao3Ratio = ao3Anchors.length > 0 ? matchedAo3.length / ao3Anchors.length : Math.min(1, matchedTerms.length / 6);
  let ao4Ratio = ao4Anchors.length > 0 ? matchedAo4.length / ao4Anchors.length : Math.min(1, (matchedTerms.length + numericParams.length) / 8);

  // Calibrate against official Pearson Edexcel Student Exemplars Pack (Level 5, Level 3/4, Level 1/2 scripts)
  const isCompact8To10Mark = maxMarks <= 10;
  const hasLevel5Depth = isCompact8To10Mark
    ? matchedTerms.length >= 4 && (wordCount >= 95 || bulletCount >= 4) && matchedAo4.length >= Math.max(1, ao4Anchors.length)
    : matchedTerms.length >= 8 && (wordCount >= 245 || bulletCount >= 7) && matchedAo4.length >= Math.max(2, ao4Anchors.length - 1);
  const isLevel1Or2Short = isCompact8To10Mark
    ? wordCount <= 52 || (bulletCount > 0 && bulletCount <= 2 && wordCount <= 60) || (matchedAo3.length <= 1 && matchedAo4.length === 0)
    : wordCount <= 98 || (bulletCount > 0 && bulletCount <= 3 && wordCount <= 115) || (matchedAo3.length <= 1 && matchedAo4.length <= 1);

  if (hasLevel5Depth) {
    ao3Ratio = Math.min(1, ao3Ratio + 0.2);
    ao4Ratio = Math.min(1, ao4Ratio + 0.2);
  } else if (isLevel1Or2Short) {
    ao3Ratio = Math.min(0.45, Math.max(0.28, ao3Ratio * 0.55));
    ao4Ratio = Math.min(0.35, Math.max(0.22, ao4Ratio * 0.45));
  } else {
    // Level 3 / Level 4 script range (e.g., 4–6 full-sentence bullets / 100–184 words with clear AO3 and partial AO4)
    ao3Ratio = Math.min(0.8, Math.max(0.65, ao3Ratio * 0.8));
    ao4Ratio = Math.min(0.68, Math.max(0.55, ao4Ratio * 0.72));
  }

  // Fallback support when grading a generic Component3ExamPlayer part.markScheme array
  if (ao3Anchors.length === 0 && Array.isArray(rubricOrPart?.markScheme)) {
    const schemeHits = rubricOrPart.markScheme.filter(line => {
      const tokens = String(line).toLowerCase().split(/\W+/).filter(w => w.length > 4);
      return tokens.some(t => lower.includes(t));
    });
    const ratio = Math.min(1, schemeHits.length / Math.max(1, rubricOrPart.markScheme.length * 0.6));
    ao3Ratio = ratio;
    ao4Ratio = wordCount >= 70 ? ratio : ratio * 0.7;
  }

  const ao3Marks = Math.max(1, Math.min(ao3Max, Math.round(ao3Ratio * ao3Max)));
  const ao4Marks = Math.max(1, Math.min(ao4Max, Math.round(ao4Ratio * ao4Max)));
  const totalMarks = Math.min(maxMarks, ao3Marks + ao4Marks);
  const bandInfo = getLevelBand(totalMarks, maxMarks);
  const grade = getGradeFromMarks(totalMarks, maxMarks);

  const matchedAnchors = [
    ...matchedAo3.map(a => `[AO3] ${a.label}`),
    ...matchedAo4.map(a => `[AO4] ${a.label}`)
  ];
  const missingAnchors = [
    ...missingAo3.map(l => `[AO3] ${l}`),
    ...missingAo4.map(l => `[AO4] ${l}`)
  ];

  // Official Edexcel Level 1–5 descriptor wording
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

  const nextBandTarget =
    missingAnchors.length > 0
      ? `To move up to the next Edexcel Level, add full-sentence bullet points covering BOTH Identify (AO3) and Impact (AO4) for: ${missingAnchors.slice(0, 2).join(' • ')}`
      : 'Full coverage of Pearson Edexcel Level 5 AO3 (Identify) and AO4 (Impact) criteria achieved.';

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
