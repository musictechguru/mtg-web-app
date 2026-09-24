/**
 * 16-Block Edexcel A-Level Music Technology (9MT0) Scheme of Work Data
 * 24-week / Multi-Year Academic Framework (4 hours/week = 12 hours/block (3 weeks/block))
 * Seamlessly integrates MTG App, Tracksheet Creator, and MusicTechGuru tutorials.
 */

export const TIMETABLE_BLOCKS = [
  {
    id: "block-1",
    blockNumber: 1,
    title: "Critical Listening & Audio Capture",
    subtitle: "1950s Era • Microphones & Acoustics",
    phase: "Year 1",
    phaseLabel: "Foundation & Audio Fundamentals",
    weeksLabel: "Weeks 1–3",
    hoursTotal: 12,
    icon: "🎙️",
    badgeColor: "#38bdf8", // Sky blue
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "The 1950s",
      genres: "Rock 'n' Roll, Electric Blues, Rockabilly & Early Pop",
      context: "Direct-to-mono/stereo cutting lathes, 1-track and 2-track tape machines, slapback echo, single-room bleed, valve preamps.",
      tracks: [
        { artist: "Elvis Presley", title: "Heartbreak Hotel / That's All Right", note: "Slapback tape delay, room bleed, upright bass slap" },
        { artist: "Chuck Berry", title: "Johnny B. Goode", note: "Early electric guitar valve amplifier overdrive, mono mixdown" },
        { artist: "Little Richard", title: "Tutti Frutti", note: "Pitched vocal saturation, acoustic piano dynamic capture" },
        { artist: "Buddy Holly", title: "Everyday", note: "Celeste capture, knee-slap percussion, close miking innovation" }
      ]
    },

    technical: {
      summary: "Physics of Sound, Microphone Transducers, Polar Patterns & Studio Acoustics.",
      topics: [
        "Frequency (Hz), Amplitude (dB), Phase, Wavelength (λ = v / f), Harmonic Series",
        "Transducer Types: Moving Coil Dynamic, Large Diaphragm Condenser (LDC), Small Diaphragm Condenser (SDC), Ribbon",
        "Polar Patterns: Cardioid, Omnidirectional, Figure-8, Hypercardioid & Proximity Effect",
        "Direct Injection (DI boxes: Passive vs. Active, Ground Lift, Impedance matching)",
        "Studio Acoustics: Early reflections, RT60, flutter echoes, standing waves, absorption vs. diffusion"
      ],
      formulas: ["λ = v / f (Speed of sound v ≈ 343 m/s)", "Period T = 1 / f"]
    },

    practical: {
      title: "1950s Authentic Recording & Production Project",
      description: "Set up a 1950s-style session capturing vocal and acoustic guitar (or upright bass). Implement minimal miking with vintage dynamic/ribbon microphone techniques, control single-room spill, calibrate analogue gain staging with valve preamp emulation, and dial in tape slapback delay (75–120ms with zero feedback).",
      deliverable: "Authentic 1950s-style mono or early stereo mixdown with slapback tape delay, natural acoustic room spill, and documented microphone log."
    },

    courseworkExam: {
      milestone: "Baseline Diagnostic Assessment",
      detail: "Complete initial diagnostic quiz to benchmark prior knowledge in acoustics, signal flow, and DAW operations."
    },

    skillsMap: [
      { id: "b1-s1", category: "Critical Listening", title: "Identify 1950s Production Hallmarks", description: "Detect slapback tape delay, room spill, tape hiss, and valve saturation by ear." },
      { id: "b1-s2", category: "Studio Capture", title: "Microphone Transducer Selection", description: "Select and deploy Dynamic, LDC, SDC, and Ribbon microphones based on acoustic source transients and SPL." },
      { id: "b1-s3", category: "Studio Capture", title: "Polar Pattern Optimization", description: "Set Cardioid, Omnidirectional, and Figure-8 polar patterns to balance isolation against natural room acoustics." },
      { id: "b1-s4", category: "Studio Capture", title: "Proximity Effect Management", description: "Control low-end frequency boost on directional capsules by adjusting mic-to-source distance." },
      { id: "b1-s5", category: "Hardware & Routing", title: "DI Box Configuration", description: "Connect passive and active DI boxes with appropriate impedance matching and ground lift isolation." },
      { id: "b1-s6", category: "Technical DSP", title: "Wavelength & Acoustic Calculations", description: "Calculate wavelength (λ = v / f) and diagnose acoustic room modes, flutter echo, and standing waves." },
      { id: "b1-s7", category: "DAW Production", title: "Reverb Time & Space Balancing", description: "Configure pre-delay, decay time (RT60), damping, and wet/dry mix on plate and chamber reverbs." }
    ],

    factsHW: [
      { id: 1, fact: "Dynamic microphones operate via electromagnetic induction using a voice coil attached to a diaphragm suspended in a magnetic field." },
      { id: 2, fact: "Condenser microphones operate electrostatically (capacitance); they require +48V phantom power to charge the plates and power the internal impedance converter." },
      { id: 3, fact: "Ribbon microphones use an ultra-thin corrugated aluminum foil strip suspended between magnets; they naturally produce a bidirectional (Figure-8) polar pattern." },
      { id: 4, fact: "The Proximity Effect is an artificial boost in low frequencies that occurs when a directional (cardioid/figure-8) microphone is moved close to the sound source." },
      { id: 5, fact: "An Omnidirectional polar pattern responds equally to sound arriving from all angles (360°) and does not suffer from the proximity effect." },
      { id: 6, fact: "A DI (Direct Injection) box converts high-impedance (Hi-Z) unbalanced instrument signals to low-impedance (Low-Z) balanced mic-level signals." },
      { id: 7, fact: "Early reflections reach the listener within the first 50ms and provide spatial cues about room dimensions and wall boundaries." },
      { id: 8, fact: "Reverb RT60 is the exact time required for sound pressure level to decay by 60 dB after the sound source has stopped." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Setting Up a Vocal Microphone (Part 1)",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Setting Up a Vocal Microphone (Part 2)",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Setting Up a Record Track in Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Tutorial"
      },
      {
            "title": "How to Use Reverb (Basic) in Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Tutorial"
      }
],
      shopResources: [
      {
            "title": "Music Technology 1930\u20131961: A Complete Teaching Pack",
            "url": "https://www.musictechguru.com/product/music-technology-1930-1961/",
            "tag": "Teaching Pack"
      }
],
      aLevelGuides: [
      {
            "title": "Past Papers & Edexcel Resources Archive",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/a-level-music-tech-course-overview/past-papers-edexcel-resources/",
            "tag": "Spec Archive"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-1_p1",
            "title": "Topic 1 Quiz: Fundamentals & Recording (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: 1950s Studio Locker Setup",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      },
      {
            "id": "fingerprints",
            "title": "Sonic Fingerprints: 1950s Era Production Hallmarks",
            "type": "fingerprints",
            "actionText": "Explore Fingerprints"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-1_p1",
      mtgQuizTitle: "Topic 1: Fundamentals & Recording (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Set up Studio Locker & Mic Log",
      tutorialTitle: "Acoustics & Space Essentials"
    }
  },

  {
    id: "block-2",
    blockNumber: 2,
    title: "1960s Innovation & Rhythm Generation",
    subtitle: "1960s Era • Amp Modellers, FX & Drum Machines",
    phase: "Year 1",
    phaseLabel: "Foundation & Audio Fundamentals",
    weeksLabel: "Weeks 4–6",
    hoursTotal: 12,
    icon: "🎸",
    badgeColor: "#a855f7", // Purple
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "The 1960s",
      genres: "British Invasion, Motown, Psychedelia, Surf Rock & British Blues",
      context: "4-track (Studer J37) to 8-track tape, sound-on-sound bouncing, tape flanging, fuzz pedals, Motown direct bass tracking.",
      tracks: [
        { artist: "The Beatles", title: "Strawberry Fields Forever / Eleanor Rigby", note: "Mellotron, varispeed tape edits, close-miked strings" },
        { artist: "The Beach Boys", title: "Good Vibrations", note: "Modular multi-studio assembly, Electro-Theremin, layered tape splices" },
        { artist: "Jimi Hendrix", title: "Purple Haze", note: "Fuzz Face, Octavia, Marshall valve head overdriven capture" },
        { artist: "The Supremes", title: "Baby Love", note: "Motown Funk Brothers DI bass, tambourine top-end, room reverb" }
      ]
    },

    technical: {
      summary: "Amp Modellers, Gain Staging, Guitar FX, Flanging, and Drum Machine Foundations.",
      topics: [
        "Analogue tape saturation and harmonic distortion",
        "Electric guitar signal chain: Pickups (Single-coil vs Humbucker), Preamp gain, Speaker cabinet impulse responses (IR)",
        "Modulation FX: Flanging (short delay <15ms with LFO comb filtering) vs Phasing vs Chorus",
        "Drum Machines: Velocity dynamics, quantisation (straight, swing 16ths), groove templates",
        "Audio instruments: Presets, oscillator layers, polyphony, filter cutoff"
      ],
      formulas: ["Comb Filter Nulls: f = (2n + 1) / (2 * Delay)"]
    },

    practical: {
      title: "The 'Talking 'bout a Revolution' Foundation Mixing & Rhythm Project",
      description: "Work with the multitrack stems of 'Talking 'bout a Revolution' (in BandLab or Logic Pro X). Establish proper gain staging, create a solid static balance, pan instruments for width, apply corrective EQ and dynamic compression to vocals and acoustic rhythm guitars, and program a complementary humanized drum machine groove.",
      deliverable: "Polished multitrack balance mix with automated vocal levels, carved EQ pockets, and dynamic rhythm section."
    },

    courseworkExam: {
      milestone: "Drum Quantisation & Velocity Lab",
      detail: "Benchmark practical competence in MIDI editing, groove templates, and humanisation curves."
    },

    skillsMap: [
      { id: "b2-s1", category: "Critical Listening", title: "1960s Tape & Overdrive Analysis", description: "Identify tape varispeed, tape flanging, fuzz pedal saturation, and early stereo ping-pong panning." },
      { id: "b2-s2", category: "DAW Production", title: "Guitar Amp Modelling & IR Placement", description: "Configure virtual amp heads, gain staging, speaker cabinet impulse responses, and virtual microphone angles." },
      { id: "b2-s3", category: "Hardware & Routing", title: "System Gain Staging Calibration", description: "Maintain digital headroom keeping average channel levels at -18dBFS RMS with peaks safely below -6dBFS." },
      { id: "b2-s4", category: "Technical DSP", title: "Modulation Effects Differentiation", description: "Distinguish between Flanger (<15ms comb filtering), Phaser (all-pass filters), and Chorus (15–35ms pitch mod)." },
      { id: "b2-s5", category: "DAW Production", title: "Drum Machine Programming", description: "Program electronic drum kits with dynamic MIDI velocity scaling to avoid static machine-gun playback." },
      { id: "b2-s6", category: "DAW Production", title: "Swing Quantisation & Groove Templates", description: "Apply percentage swing (e.g. 58% to 62% 16th-note swing) to create humanized rhythmic pocket." },
      { id: "b2-s7", category: "DAW Production", title: "32-Bar Arrangement Architecture", description: "Structure a cohesive 32-bar piece with distinct Intro, Build, Drop, and Outro sections." }
    ],

    factsHW: [
      { id: 1, fact: "Flanging is produced by mixing a signal with a delayed copy of itself (<15 ms) modulated by an LFO, resulting in sweeping comb filter peaks and notches." },
      { id: 2, fact: "Phasing uses all-pass filters to shift the phase of specific frequencies rather than time delay, creating subtle, non-harmonically spaced notches." },
      { id: 3, fact: "Chorus uses longer delay times (15–35 ms) with pitch modulation to simulate multiple instruments playing in unison." },
      { id: 4, fact: "Fuzz creates severe square-wave clipping of the waveform; overdrive emulates soft valve saturation; distortion uses hard diode clipping." },
      { id: 5, fact: "Quantisation aligns MIDI note start times or audio transients to a defined rhythmic grid (e.g. 1/16th notes)." },
      { id: 6, fact: "MIDI velocity ranges from 0 to 127, controlling the volume, filter cutoff, or sample layer triggered by a note." },
      { id: 7, fact: "Gain staging is the practice of maintaining optimal signal levels between -18dBFS and -12dBFS RMS throughout every stage of the signal chain." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Basic Drum Programming in Logic Pro X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Using Insert Plugins Within Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Remake 'Shape of You' by Ed Sheeran",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Project"
      }
],
      shopResources: [
      {
            "title": "BandLab Mixing Tutorial/Assessment \u2013 'Talking 'bout a Revolution'",
            "url": "https://www.musictechguru.com/product/bandlab-mixing-tutorial-assessment-talking-bout-a-revolution/",
            "tag": "Multitrack & Guide"
      },
      {
            "title": "The Guide to Mixing Rock",
            "url": "https://www.musictechguru.com/product/the-guide-to-mixing-rock/",
            "tag": "Production Pack"
      }
],
      aLevelGuides: [
      {
            "title": "Music Tech Toolbox Reference",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/",
            "tag": "Toolbox Guide"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-1_p2",
            "title": "Topic 1 Quiz: Fundamentals & Recording (Part 2)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "quiz-topic-7_p1",
            "title": "Topic 7 Quiz: FX & Processors (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "fingerprints",
            "title": "Sonic Fingerprints: 1960s Tape Saturation & Flanging",
            "type": "fingerprints",
            "actionText": "Explore Fingerprints"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-1_p2",
      mtgQuizTitle: "Topic 1: Fundamentals & Recording (Part 2)",
      hasTracksheet: true,
      tracksheetActionText: "Log DI Bass & Amp Modeller Presets",
      tutorialTitle: "Gain Staging in Modern DAWs & History of Flanging"
    }
  },

  {
    id: "block-3",
    blockNumber: 3,
    title: "1970s Production & Sampler Foundations",
    subtitle: "1970s Era • Sampling & Practice Coursework Launch",
    phase: "Year 1",
    phaseLabel: "Foundation & Audio Fundamentals",
    weeksLabel: "Weeks 7–9",
    hoursTotal: 12,
    icon: "🎛️",
    badgeColor: "#10b981", // Emerald green
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "The 1970s",
      genres: "Classic Rock, Funk, Disco, Reggae & Progressive Rock",
      context: "24-track 2-inch tape, SSL & Neve large format consoles, double tracking, tape loops, early digital reverbs and samplers.",
      tracks: [
        { artist: "Pink Floyd", title: "Money / Shine On You Crazy Diamond", note: "Tape loop sound FX, Abbey Road 16-track, EMS VCS3 modular synth" },
        { artist: "Stevie Wonder", title: "Superstition", note: "Hohner Clavinet D6, TONTO modular synth system, real multitracked drums" },
        { artist: "Bob Marley & The Wailers", title: "No Woman, No Cry", note: "One-drop rhythm, spring reverb, tape delay echo" },
        { artist: "Chic", title: "Good Times", note: "Tight DI bass, chucking clean guitar, disco string arrange" }
      ]
    },

    technical: {
      summary: "Double Tracking, ADT, Sampler Architecture, Truncation, Loops & Reversing.",
      topics: [
        "Natural vocal/instrument double tracking vs Artificial Double Tracking (ADT)",
        "Sampler Architecture: Sample Rate, Bit Depth, Truncation (Start/End points), Root Key",
        "Key Zones & Multi-sampling: Avoiding chipmunk effect",
        "Looping techniques: Forward, Alternate, Crossfade loops to avoid clicks",
        "Destructive vs Non-destructive audio editing, Reverse playback"
      ],
      formulas: ["Bit Depth Dynamic Range ≈ Bit Depth × 6 dB (16-bit = 96 dB, 24-bit = 144 dB)"]
    },

    practical: {
      title: "1970s Cover Track & Creative Sampling Launch",
      description: "1. Record an acoustic/electric cover track following A-Level Component 1 specification. 2. Launch creative sampling composition in your DAW by chopping and pitch-mapping an authentic vintage audio stimulus.",
      deliverable: "Multi-track DAW project with recorded cover stems + initial 16-bar sampled composition motif."
    },

    courseworkExam: {
      milestone: "Coursework Practice Launch",
      detail: "Kick off Year 1 practice submissions for Component 1 (Recording) and Component 2 (Composition)."
    },

    skillsMap: [
      { id: "b3-s1", category: "Critical Listening", title: "1970s Multitrack & Console Fingerprinting", description: "Recognize 24-track tape saturation, SSL/Neve console punch, tight acoustic drum dampening, and reggae spring reverb." },
      { id: "b3-s2", category: "Studio Capture", title: "Authentic Double Tracking Production", description: "Execute tight double-tracking of lead vocals and guitars, managing micro-pitch and timing variations." },
      { id: "b3-s3", category: "DAW Production", title: "Precision Sample Truncation", description: "Trim silence at exact zero-crossings before the attack transient to guarantee instantaneous MIDI playback response." },
      { id: "b3-s4", category: "DAW Production", title: "Crossfade Looping Engineering", description: "Set forward and alternating crossfade loop boundaries on sustained samples to eliminate audio clicks." },
      { id: "b3-s5", category: "DAW Production", title: "Key Zone & Root Pitch Mapping", description: "Assign root keys and multi-sample zones across keyboard octaves to eliminate unwanted formant warping." },
      { id: "b3-s6", category: "Technical DSP", title: "Envelope Reversal & Sound Transformation", description: "Reverse audio envelopes to transform decaying percussive tails into forward-moving swells and transitional risers." },
      { id: "b3-s7", category: "Coursework NEA", title: "Pre-Production Cover Multitrack Planning", description: "Organize candidate tempo maps, musician headphone mixes, and track allocation for Component 1 specifications." }
    ],

    factsHW: [
      { id: 1, fact: "Artificial Double Tracking (ADT) was invented at Abbey Road Studios by Ken Townsend using a secondary tape machine with varispeed delay to duplicate vocals." },
      { id: 2, fact: "Sample truncation is the process of trimming the silence before the initial transient and after the natural decay of an audio sample." },
      { id: 3, fact: "A Crossfade Loop overlaps the end of a sample back into an earlier section to create a seamless, click-free sustained pad or tone." },
      { id: 4, fact: "The Root Key in a sampler defines the original pitch at which the sample was recorded, allowing the sampler to transpose up and down the keyboard." },
      { id: 5, fact: "Reversing audio reverses the envelope, turning slow decays into sudden swelling transients (commonly used for cymbal swells and reverb tails)." },
      { id: 6, fact: "A 24-track 2-inch tape machine provides approximately 144 mm/track width, delivering low tape hiss and high dynamic punch." },
      { id: 7, fact: "Multi-sampling involves recording an instrument at multiple pitches and velocities across the keyboard to avoid pitch-shift artifacts." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Importing Audio Tutorial for Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Introduction to Logic Pro X Masterclass",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      }
],
      shopResources: [
      {
            "title": "Mixing for A-Level Music Technology \u2013 A Preparation Project",
            "url": "https://www.musictechguru.com/product/mixing-for-a-level-music-technology-a-preparation-project/",
            "tag": "Practice Project"
      },
      {
            "title": "Introduction to Drum Sampling Pack",
            "url": "https://www.musictechguru.com/product/introduction-to-drum-sampling/",
            "tag": "Sample Pack"
      },
      {
            "title": "\u2018The Model\u2019 by Kraftwerk Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/the-guide-to-recreating-the-model-by-kraftwerk/",
            "tag": "Multitrack Remake"
      }
],
      aLevelGuides: [
      {
            "title": "Component 1: Recording & Mixing Overview",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/",
            "tag": "Spec Guide"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-4_p1",
            "title": "Topic 4 Quiz: Sampling (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Practice Cover Project Initialization",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      },
      {
            "id": "fingerprints",
            "title": "Sonic Fingerprints: 1970s Multitrack Punch & Tape Delays",
            "type": "fingerprints",
            "actionText": "Explore Fingerprints"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-4_p1",
      mtgQuizTitle: "Topic 4: Sampling (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Initialize Cover Project Tracksheet",
      tutorialTitle: "Sampling Fundamentals: Truncation, Looping & Reverse Sound Design"
    }
  },

  {
    id: "block-4",
    blockNumber: 4,
    title: "1980s Synthesis & Component 3 Mock Exam",
    subtitle: "1980s Era • Synthesizers & Listening Paper Mock",
    phase: "Year 1",
    phaseLabel: "Foundation & Audio Fundamentals",
    weeksLabel: "Weeks 10–12",
    hoursTotal: 12,
    icon: "🎹",
    badgeColor: "#ec4899", // Pink
    isBossBlock: true,
    bossType: "EXAM BOSS: Component 3 Mock",

    listening: {
      era: "The 1980s",
      genres: "Synth-Pop, New Wave, Post-Disco, Hair Metal & Early Hip-Hop",
      context: "DX7 digital FM, Roland Jupiter/Juno analog polyphonics, Linn LM-1 drum computer, SSL 4000E consoles, gated reverb.",
      tracks: [
        { artist: "Eurythmics", title: "Sweet Dreams (Are Made of This)", note: "Roland SH-101 sequence, Movement Systems Drum Computer" },
        { artist: "Michael Jackson", title: "Billie Jean", note: "Yamaha CS-80 synth bass, Bruce Swedien acoustic separation, tight stereo mix" },
        { artist: "New Order", title: "Blue Monday", note: "Oberheim DMX drum machine, Moog Source synth bass, Powertran sampler" },
        { artist: "Prince", title: "When Doves Cry", note: "Linn LM-1 pitched snare, no bassline, chorus on electric guitar" }
      ]
    },

    technical: {
      summary: "Subtractive & FM Synthesis, Filters, Envelopes (ADSR), LFOs & MIDI Protocol.",
      topics: [
        "Subtractive synthesis: Oscillators (Saw, Square/Pulse, Triangle, Sine), Harmonic content",
        "Filter Section: Low Pass, High Pass, Band Pass, Cutoff Frequency, Resonance (Q)",
        "Envelopes: Attack, Decay, Sustain, Release (ADSR) for Amp and Filter",
        "LFO (Low Frequency Oscillator): Modulation of Pitch (Vibrato), Amplitude (Tremolo), Cutoff (Wah/Wobble)",
        "MIDI Protocol: 5-pin DIN vs USB, Channels 1–16, Note On/Off, Velocity (0–127), CC Messages"
      ],
      formulas: ["Q-Factor = Resonant Center Frequency / Bandwidth"]
    },

    practical: {
      title: "1980s Synth-Pop Production & Component 3 Mock Examination",
      description: "Construct an authentic 1980s Synth-Pop arrangement featuring analog/FM synthesizer layers (bass, poly-pads, brass leads) and gated reverb snare processing, followed by sitting the Component 3 Synth-Pop Listening Paper.",
      deliverable: "32-bar authentic 80s synth-pop arrangement + completed Component 3 Listening Paper score sheet."
    },

    courseworkExam: {
      milestone: "Component 3 Listening Mock (1950s–1980s)",
      detail: "Sit a full timed exam paper assessing critical listening, historical production, and technical identification."
    },

    skillsMap: [
      { id: "b4-s1", category: "Critical Listening", title: "1980s Synth & Gated Reverb Detection", description: "Identify DX7 FM electric piano, analog resonant filter sweeps, LinnDrum samples, and SSL gated snares by ear." },
      { id: "b4-s2", category: "DAW Production", title: "Subtractive Oscillator Waveform Selection", description: "Choose and blend Sawtooth (rich even/odd harmonics), Square (hollow odd harmonics), and Triangle waves." },
      { id: "b4-s3", category: "Technical DSP", title: "Filter Cutoff & Resonance Sculpting", description: "Set Low Pass / High Pass filter slopes and dial in resonance (Q) up to self-oscillation for tonal character." },
      { id: "b4-s4", category: "DAW Production", title: "Dual ADSR Envelope Configuration", description: "Program distinct Attack, Decay, Sustain, and Release curves for Filter cutoff contours and Amplitude dynamics." },
      { id: "b4-s5", category: "DAW Production", title: "LFO Modulation Routing", description: "Route Low Frequency Oscillators to pitch (vibrato), volume (tremolo), and filter frequency (wah/wobble)." },
      { id: "b4-s6", category: "Hardware & Routing", title: "MIDI Protocol & CC Automation", description: "Configure MIDI channels (1-16) and record continuous automation for CC1 (Modulation) and CC7 (Volume)." },
      { id: "b4-s7", category: "Exam Technique", title: "Component 3 Listening Exam Execution", description: "Deconstruct examination question stems (Identify, Describe, Explain) under strict 45-minute timed mock conditions." }
    ],

    factsHW: [
      { id: 1, fact: "A Sawtooth wave contains all integer harmonics (both odd and even) with amplitudes falling off at 1/n, producing a bright, buzzy sound." },
      { id: 2, fact: "A Square wave contains only odd harmonics (1, 3, 5, 7...), giving it a hollow, clarinet-like timbre." },
      { id: 3, fact: "A Triangle wave contains only odd harmonics, but their amplitudes drop off at 1/n², resulting in a much warmer, softer sound." },
      { id: 4, fact: "Filter Resonance boosts frequencies immediately surrounding the cutoff point; high resonance can push the filter into self-oscillation." },
      { id: 5, fact: "Sustain in an ADSR envelope is a level (amplitude), while Attack, Decay, and Release are all time measurements." },
      { id: 6, fact: "FM (Frequency Modulation) synthesis uses a Modulator operator to alter the frequency of a Carrier operator at audio rates to generate complex sidebands." },
      { id: 7, fact: "MIDI data does not transmit audio; it transmits performance control data (Note On, Pitch, Velocity, CC)." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "The Retro Synth in Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Remake 'Too Good' by Drake (Stock Plugins ONLY) - Instruments Part 2",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Tutorial"
      }
],
      shopResources: [
      {
            "title": "\u2018Nobody\u2019s Diary\u2019 by Yazoo Logic Pro Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/the-guide-to-recreating-nobodys-diary-by-yazoo/",
            "tag": "Multitrack Remake"
      },
      {
            "title": "\u2018Axel F\u2019 Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/axel-f-logic-pro-version-guide/",
            "tag": "Multitrack Remake"
      },
      {
            "title": "\u2018Brick England\u2019 by Pet Shop Boys Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/brick-england-logic-pro-download-pet-shop-boys/",
            "tag": "Multitrack Remake"
      }
],
      aLevelGuides: [
      {
            "title": "Master Edexcel Component 3: Listening and Analysing Guide",
            "url": "https://www.musictechguru.com/edexcel-component-3-music-technology-revision/",
            "tag": "Exam Guide"
      }
],
      inAppActivities: [
      {
            "id": "c3_synthpop",
            "title": "Official Component 3 Mock Exam: Synth-Pop Listening Paper",
            "type": "exam_c3",
            "actionText": "Launch C3 Exam"
      },
      {
            "id": "quiz-topic-3_p1",
            "title": "Topic 3 Quiz: Synthesis (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "fingerprints",
            "title": "Sonic Fingerprints: 1980s FM & Analogue Synthesis",
            "type": "fingerprints",
            "actionText": "Explore Fingerprints"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-3_p1",
      mtgQuizTitle: "Topic 3: Synthesis (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Log Synthesizer Patches & MIDI CC",
      tutorialTitle: "MIDI Architecture, Hexadecimal Basics & Modulation Control"
    }
  },

  {
    id: "block-5",
    blockNumber: 5,
    title: "1990s Dance, Sampling & AS-Level Production Mock",
    subtitle: "1990s Era • Time-Stretching, DAWs & Practical Exam",
    phase: "Year 1",
    phaseLabel: "Foundation & Audio Fundamentals",
    weeksLabel: "Weeks 13–15",
    hoursTotal: 12,
    icon: "💿",
    badgeColor: "#f59e0b", // Amber
    isBossBlock: true,
    bossType: "EXAM BOSS: Component 4 AS Mock",

    listening: {
      era: "The 1990s",
      genres: "Grunge, Britpop, 90s House, Breakbeat Hardcore, Trip-Hop & Jungle",
      context: "Akai S1000/S3000, E-mu SP-1200, time-stretching, pitch-shifting, early DAWs, breakbeat slicing, Loudness War origins.",
      tracks: [
        { artist: "Nirvana", title: "Smells Like Teen Spirit", note: "Butch Vig clean/dirty dynamic contrast, double-tracked guitars, room mics" },
        { artist: "Massive Attack", title: "Teardrop / Unfinished Sympathy", note: "Vinyl crackle sample, live orchestral strings, 808 sub bass" },
        { artist: "The Prodigy", title: "Firestarter / No Good", note: "Akai S1000 time-stretched vocal chops, sliced Amen break" },
        { artist: "Oasis", title: "Live Forever", note: "Loudness war beginnings, tape compression, brickwall master limiting" }
      ]
    },

    technical: {
      summary: "Nyquist-Shannon Theorem, Aliasing, Time-Stretching Algorithms, Digital Formats & DAW Editing.",
      topics: [
        "Nyquist-Shannon Theorem: Sample Rate must be at least twice the highest audio frequency (fs ≥ 2 × fmax)",
        "Anti-Aliasing low pass filters and digital quantisation distortion",
        "Granular vs Phase Vocoder time-stretching and pitch shifting algorithms",
        "Audio File Formats: Uncompressed (WAV, AIFF) vs Lossy (MP3, AAC)",
        "DAW Editing: Strip silence, zero-crossing points, crossfades, DC offset removal"
      ],
      formulas: ["Nyquist Frequency = Sample Rate / 2", "Bitrate = Sample Rate × Bit Depth × Channels"]
    },

    practical: {
      title: "1990s Breakbeat, Time-Stretching & DAW Production Mock",
      description: "Sample an acoustic breakbeat, time-stretch and pitch-shift it into a 138 BPM 2-step groove. Program Reese basslines and apply sidechain compression, then complete the Component 4 Production Mock Paper sprint.",
      deliverable: "138 BPM 1990s dance track stem mix + timed Component 4 practical exam export."
    },

    courseworkExam: {
      milestone: "Component 4 Practical Production Mock (AS-Level)",
      detail: "Complete a timed 60-minute DAW practical exam testing audio editing, pitch correction, EQ, and mixing."
    },

    skillsMap: [
      { id: "b5-s1", category: "Critical Listening", title: "1990s Dance & Grunge Texture Analysis", description: "Identify Akai S1000 time-stretch metallic artifacts, sliced breakbeat transients, and grunge room mic compression." },
      { id: "b5-s2", category: "Technical DSP", title: "Nyquist & Aliasing Troubleshooting", description: "Apply the Nyquist Theorem (fs ≥ 2 × fmax) to diagnose foldover aliasing distortion and explain anti-aliasing filters." },
      { id: "b5-s3", category: "DAW Production", title: "Breakbeat Slicing & Transient Mapping", description: "Slice classic drum breakbeats (e.g. Amen Break) into individual hits and remap across MIDI drum pads." },
      { id: "b5-s4", category: "DAW Production", title: "Time-Stretching Algorithm Optimization", description: "Select between monophonic, polyphonic, and granular time-stretching modes to prevent phase smearing." },
      { id: "b5-s5", category: "Technical DSP", title: "Bitrate & Uncompressed File Calculations", description: "Calculate uncompressed audio bitrates and storage sizes: Bitrate = Sample Rate × Bit Depth × Channels." },
      { id: "b5-s6", category: "DAW Production", title: "Surgical Waveform Editing & De-Clicking", description: "Perform zero-crossing edits, strip silence, batch crossfades, and remove DC offset from audio tracks." },
      { id: "b5-s7", category: "Exam Technique", title: "Component 4 Practical Speed Run", description: "Import stems, lock tempo grid, execute audio corrections, and create an initial balance within 60 minutes." }
    ],

    factsHW: [
      { id: 1, fact: "The Nyquist Theorem states that to accurately record and reproduce a sound without aliasing, the sampling rate must be at least double the highest frequency present." },
      { id: 2, fact: "Aliasing occurs when frequencies above the Nyquist limit are sampled, reflecting back into the audible spectrum as false, inharmonic frequencies." },
      { id: 3, fact: "Standard CD quality audio is 44.1 kHz / 16-bit stereo, providing a theoretical frequency response up to 22.05 kHz and 96 dB dynamic range." },
      { id: 4, fact: "Time-stretching alters the duration of an audio file without altering its pitch; pitch-shifting changes the pitch without changing duration." },
      { id: 5, fact: "Zero-crossing editing cuts audio exactly where the waveform crosses the center amplitude line (0V), preventing clicks and pops." },
      { id: 6, fact: "MP3 is a lossy perceptual compression format that discards psychoacoustically inaudible frequencies using masking algorithms." },
      { id: 7, fact: "Dither is low-level randomized noise added during bit-depth reduction to eliminate correlated quantisation distortion." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Using Aux and Bus Channels in Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "How They Used Sampling for Gnarls Barkley's 'Crazy'",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/",
            "tag": "Case Study"
      }
],
      shopResources: [
      {
            "title": "\u2018Gotta Get Thru This\u2019 Logic Pro X Remake & 2-Step Breakdown",
            "url": "https://www.musictechguru.com/product/gotta-get-thru-this-logic-pro-x-remake/",
            "tag": "Multitrack Remake"
      },
      {
            "title": "\u2018Small Town\u2019 by Morcheeba Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/the-guide-to-recreating-small-town-by-morcheeba/",
            "tag": "Trip-Hop Stems"
      },
      {
            "title": "Guidance Video \u2013 Edexcel Music Technology C4 Production & Analysing Exam Sample Paper",
            "url": "https://www.musictechguru.com/product/guidance-video-edexcel-music-technology-c4-production-analysing-exam-sample-paper/",
            "tag": "Exam Video"
      }
],
      aLevelGuides: [
      {
            "title": "Edexcel Component 4: Producing and Analysing Guide",
            "url": "https://www.musictechguru.com/edexcel-component-4-production-exam-revision/",
            "tag": "Exam Guide"
      }
],
      inAppActivities: [
      {
            "id": "c4_template",
            "title": "Official Component 4 Mock Exam: Practical Production Paper",
            "type": "exam_c4",
            "actionText": "Launch C4 Exam"
      },
      {
            "id": "quiz-topic-4_p2",
            "title": "Topic 4 Quiz: Sequencing & Audio Editing (Part 2)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "fingerprints",
            "title": "Sonic Fingerprints: 1990s Time-Stretch & Early Digital DAWs",
            "type": "fingerprints",
            "actionText": "Explore Fingerprints"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-4_p2",
      mtgQuizTitle: "Topic 4: Sampling (Part 2)",
      hasTracksheet: true,
      tracksheetActionText: "Log Sample Transposition & Slices",
      tutorialTitle: "AS-Level Component 4 DAW Survival Guide: Fixing Audio Glitches"
    }
  },

  {
    id: "block-6",
    blockNumber: 6,
    title: "2000s Dynamics, EQ & Recording Project Hand-In",
    subtitle: "2000s Era • Dynamic Processing & Official Milestone",
    phase: "Year 1",
    phaseLabel: "Foundation & Audio Fundamentals",
    weeksLabel: "Weeks 16–18",
    hoursTotal: 12,
    icon: "🎚️",
    badgeColor: "#ef4444", // Red
    isBossBlock: true,
    bossType: "MAJOR DEADLINE: Hand-in Recording Project",

    listening: {
      era: "The 2000s",
      genres: "Nu-Metal, Contemporary R&B, Pop-Punk, Indie Rock & The Loudness Wars",
      context: "Pro Tools TDM systems, hyper-compressed master buses, hard digital limiting, sidechain compression pumping, auto-tune emergence.",
      tracks: [
        { artist: "Linkin Park", title: "In the End", note: "Pro Tools drum editing, SSL channel strip compression, dual heavy guitars" },
        { artist: "OutKast", title: "Hey Ya!", note: "Hybrid acoustic/digital mix, punchy parallel drum compression" },
        { artist: "The White Stripes", title: "Seven Nation Army", note: "DigiTech Whammy octave drop, analog tape warmth, no bass guitar" },
        { artist: "Britney Spears", title: "Toxic", note: "Extreme sidechain compression, vocal pitch correction, multi-layered harmonies" }
      ]
    },

    technical: {
      summary: "Compressor Topologies (FET vs Opto vs VCA vs Valve), Noise Gates & Parametric EQ.",
      topics: [
        "Compressor parameters: Threshold, Ratio, Attack time, Release time, Knee, Make-up Gain",
        "Compressor Topologies: FET (1176 - ultra fast), Optical (LA-2A - smooth leveling), VCA (SSL - punchy), Valve (Fairchild)",
        "Sidechain compression: Frequency-conscious ducking (Kick/Bass separation)",
        "Noise Gates: Threshold, Attack, Hold, Release, Key/Sidechain filter",
        "Parametric Equalisation: High Pass / Low Pass slopes, Peaking (Q = f0 / BW), Shelving filters"
      ],
      formulas: ["Gain Reduction = (Input Level - Threshold) × (1 - 1/Ratio)"]
    },

    practical: {
      title: "2000s Dynamic Processing, Precision EQ & C1 Hand-In Milestone",
      description: "Finalize and balance all multitrack stems for the Year 1 Component 1 practice portfolio. Apply multi-stage compression, parametric EQ sculpting, gate sidechains, and export an uncompressed 24-bit/44.1kHz master.",
      deliverable: "Approved 24-bit stereo WAV practice mix + exported tracksheet with complete microphone and processing documentation."
    },

    courseworkExam: {
      milestone: "HAND IN: Recording Project (Cover)",
      detail: "Final submission of Component 1 practice multitrack mixdown, studio notes, and tracksheet dossier."
    },

    skillsMap: [
      { id: "b6-s1", category: "Critical Listening", title: "Aural Identification of Compressor Circuits", description: "Identify the sonic coloration and reaction speeds of FET, Optical, VCA, and Valve (Variable-Mu) compressors." },
      { id: "b6-s2", category: "DAW Production", title: "Precision Compressor Parameter Setup", description: "Dial in Threshold, Ratio (2:1 to 20:1), Attack (transients vs smoothing), Release (rhythm sync), and Make-Up Gain." },
      { id: "b6-s3", category: "DAW Production", title: "Frequency-Conscious Sidechain Ducking", description: "Route kick drum trigger into bass guitar compressor sidechain to eliminate low-end masking collisions." },
      { id: "b6-s4", category: "DAW Production", title: "Noise Gate Threshold & Hysteresis", description: "Configure gate Threshold, Attack, Hold, and Release to eliminate acoustic drum bleed and guitar hum." },
      { id: "b6-s5", category: "Technical DSP", title: "Parametric EQ Frequency Carving", description: "Apply high-pass filters (12dB/24dB slope) and narrow bell notches (high Q = f0 / BW) to excise unwanted resonance." },
      { id: "b6-s6", category: "DAW Production", title: "Spectral Pocket Creation", description: "Carve complementary notches and boosts between competing tracks (Kick at 60Hz / Bass at 100Hz; Vocals at 3kHz)." },
      { id: "b6-s7", category: "Coursework NEA", title: "Component 1 Submission Sign-Off", description: "Export pristine 24-bit/44.1kHz WAV master and compile complete Tracksheet Creator technical dossier." }
    ],

    factsHW: [
      { id: 1, fact: "A FET (Field Effect Transistor) compressor like the 1176 features ultra-fast attack times measured in microseconds, making it ideal for controlling aggressive transients." },
      { id: 2, fact: "An Optical compressor like the LA-2A uses a light source and photo-resistor, delivering a smooth, multi-stage program-dependent release." },
      { id: 3, fact: "A VCA (Voltage Controlled Amplifier) compressor provides high precision, low distortion, and predictable gain reduction, making it the industry standard for master bus compression." },
      { id: 4, fact: "Sidechain compression uses an external audio signal to trigger gain reduction on a different track (e.g. kick drum ducking the bass guitar)." },
      { id: 5, fact: "A Noise Gate mutes audio that falls below a set threshold, eliminating spill between drum mics or amp hum during pauses." },
      { id: 6, fact: "Q (Quality Factor) defines the bandwidth of an EQ filter: high Q produces a narrow notch; low Q produces a broad, musical curve." },
      { id: 7, fact: "A High-Pass Filter (HPF) attenuates frequencies below its cutoff point, removing low-end rumble and mechanical stage noise." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "How to Mix Your Drums & Bass for Component 1",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/",
            "tag": "Mixing Guide"
      },
      {
            "title": "Using Insert Plugins Within Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Tutorial"
      }
],
      shopResources: [
      {
            "title": "How to Mix a Live Recorded Song Using Logic Pro X (C1 Coursework Guide)",
            "url": "https://www.musictechguru.com/product/how-to-mix-for-component-1/",
            "tag": "Full Video Guide"
      },
      {
            "title": "The Guide to Mixing \u2018Moaning Lisa Smile\u2019 by Wolf Alice & \u2018Whinging Tom\u2019",
            "url": "https://www.musictechguru.com/product/guide-to-mixing-moaning-lisa-smile-whinging-tom/",
            "tag": "Multitrack Guide"
      }
],
      aLevelGuides: [
      {
            "title": "Component 1 Recording & Mixing Specification",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/",
            "tag": "Spec Guide"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-5_p1",
            "title": "Topic 5 Quiz: Dynamic Processors (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "quiz-topic-6_p1",
            "title": "Topic 6 Quiz: EQ & Filtering (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Generate Candidate Logbook & Declaration",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-5_p1",
      mtgQuizTitle: "Topic 5: Dynamic Processing (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Export Full Recording Project Dossier",
      tutorialTitle: "Compressor Topologies Decoded: When to use FET, Opto, VCA & Valve"
    }
  },

  {
    id: "block-7",
    blockNumber: 7,
    title: "2010s Production & The Ed Sheeran 'Shape of You' Remix",
    subtitle: "2010s Era • Creative Remixing, Modern In-The-Box Mixing & Space Design",
    phase: "Year 1",
    phaseLabel: "Foundation & Audio Fundamentals",
    weeksLabel: "Weeks 19–21",
    hoursTotal: 12,
    icon: "🎚️",
    badgeColor: "#06b6d4", // Cyan
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "The 2010s",
      genres: "EDM Festival Anthems, Trap, Modern Pop & Indie R&B",
      context: "100% In-The-Box production, complex sidechain routing, automated vocal chops, Haas effect stereo widening, saturation.",
      tracks: [
        { artist: "Ed Sheeran", title: "Shape of You", note: "Dancehall groove, marimba plucks, vocal chops, and modern sidechain ducking" },
        { artist: "Daft Punk", title: "Get Lucky", note: "Analog tracking meets modern digital mixing, tape to DAW workflow" },
        { artist: "Billie Eilish", title: "Bad Guy", note: "Ultra close-mic proximity effect, sub-bass saturation, ASMR vocal aesthetic" },
        { artist: "Kendrick Lamar", title: "HUMBLE.", note: "Distorted 808 sub, pitch automation, aggressive stereo spread" }
      ]
    },

    technical: {
      summary: "Aux Busses, Submixing, Delay Calculations, The Haas Effect & Automation Systems.",
      topics: [
        "Mixer Architecture: Inserts (series) vs Aux Sends (parallel) vs Submix Group Busses",
        "Pre-fader vs Post-fader routing (Headphone monitor feeds vs Effects sends)",
        "Delay Calculation: Milliseconds per beat = 60,000 / BPM",
        "The Haas Effect: Psychoacoustic precedence effect (<35ms delay creates perceived width without discrete echo)",
        "Automation Modes: Read, Write, Touch, Latch (Volume, Pan, Sends, Filters)"
      ],
      formulas: ["Delay Time (Quarter Note ms) = 60,000 / BPM", "Eighth Note ms = 30,000 / BPM"]
    },

    practical: {
      title: "The Ed Sheeran 'Shape of You' Creative Remix Project",
      description: "Take the vocal and melodic stems of Ed Sheeran's 'Shape of You' and produce an authentic 2010s creative remix in Logic Pro X. Re-harmonize the marimba motif using modern synth presets, slice and pitch-shift vocal chops, build custom sidechain compression ducking curves, and design spatial width using tempo-synced delays and Haas effect widening.",
      deliverable: "Full 2010s creative remix master WAV with automated transitions, processed vocal chops, and active bus routing."
    },

    courseworkExam: {
      milestone: "Composition Coursework Mixing Phase",
      detail: "Ensure all creative sampling and synthesis techniques are cleanly balanced and automated."
    },

    skillsMap: [
      { id: "b7-s1", category: "Critical Listening", title: "2010s Spatial & Dynamic Design Analysis", description: "Identify extreme sidechain pumping, pitch-automated vocal chops, and Haas effect stereo widening in modern pop." },
      { id: "b7-s2", category: "Hardware & Routing", title: "Mixer Console Routing Architecture", description: "Configure serial Inserts, parallel Aux Sends, and Submix Group Busses for drums, vocals, and instruments." },
      { id: "b7-s3", category: "Hardware & Routing", title: "Pre-Fader vs Post-Fader Send Deployment", description: "Assign pre-fader routing for performer headphone cue mixes and post-fader routing for time-based effects." },
      { id: "b7-s4", category: "Technical DSP", title: "Musical Delay Time Calculations", description: "Calculate exact tempo-synced delay times in milliseconds: Quarter note = 60,000 / BPM; 16th note = 15,000 / BPM." },
      { id: "b7-s5", category: "Technical DSP", title: "Haas Effect Stereo Widening", description: "Apply psychoacoustic delays (<35ms) to hard-panned duplicates while auditing for mono phase cancellation." },
      { id: "b7-s6", category: "DAW Production", title: "Automation Systems Engineering", description: "Execute precise dynamic rides across volume, pan, send levels, and filter cutoff using Touch and Latch modes." },
      { id: "b7-s7", category: "DAW Production", title: "Stereo Phase Correlation Auditing", description: "Monitor phase correlation meters (+1 to -1) ensuring mono compatibility without frequency hollows." }
    ],

    factsHW: [
      { id: 1, fact: "An Insert effect processes 100% of the audio signal in series (e.g. EQ, Compressor, Noise Gate)." },
      { id: 2, fact: "An Auxiliary (Aux) Send splits a portion of the signal to a shared effects bus in parallel, leaving the dry signal untouched." },
      { id: 3, fact: "A Pre-fader send taps the signal before the channel fader, meaning changes to the fader do not affect the send level (standard for headphone monitor mixes)." },
      { id: 4, fact: "A Post-fader send taps the signal after the channel fader, so lowering the fader also lowers the amount sent to the effect." },
      { id: 5, fact: "The Haas Effect states that when two identical sounds arrive at the ears with a delay between 1ms and 35ms, the brain perceives them as a single sound with spatial width." },
      { id: 6, fact: "Touch automation updates parameter values while you hold or adjust the control, instantly returning to previous values when released." },
      { id: 7, fact: "Latch automation remains at the new value even after you release the control until playback stops." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Remixing 'Shape of You' on Logic Pro X",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/",
            "tag": "Remix Masterclass"
      },
      {
            "title": "Remake 'Shape of You' by Ed Sheeran",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video Project"
      },
      {
            "title": "Using Aux and Bus Channels in Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Remake 'Too Good' by Drake on Logic Pro X - Drums Part 1",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Project"
      },
      {
            "title": "Music Tech Toolbox Essentials",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/",
            "tag": "Toolbox Guide"
      }
],
      shopResources: [
      {
            "title": "\u2018La La La\u2019 by Naughty Boy Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/la-la-la-by-naughty-boy-logic-pro-x-multitrack-tutorial/",
            "tag": "Multitrack Remake"
      },
      {
            "title": "\u2018Rather Be\u2019 by Clean Bandit Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/recreate-rather-clean-bandit-using-logic-pro/",
            "tag": "Multitrack Remake"
      },
      {
            "title": "\u2018King\u2019 by Years & Years Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/recreate-king-years-years-logic-pro/",
            "tag": "Multitrack Remake"
      }
],
      aLevelGuides: [
      {
            "title": "Component 4: Production Techniques & Exam Overview",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/",
            "tag": "Spec Guide"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-7_p1",
            "title": "Topic 7 Quiz: FX & Processors (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "c4_spop",
            "title": "Component 4 Practical Sidechain & Mixdown Exam",
            "type": "exam_c4",
            "actionText": "Launch C4 Exam"
      },
      {
            "id": "fingerprints",
            "title": "Sonic Fingerprints: 2010s Pristine Digital & Sidechain Pumping",
            "type": "fingerprints",
            "actionText": "Explore Fingerprints"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-7_p1",
      mtgQuizTitle: "Topic 7: FX & Processors (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Log Subgroups & Aux Bus Routing",
      tutorialTitle: "Aux Busses, Submixing & The Haas Effect Explained"
    }
  },

  {
    id: "block-8",
    blockNumber: 8,
    title: "Vocal Production, Tech Icons & Composition Hand-In",
    subtitle: "Milestone Icons • Pitch Correction & Year 1 Capstone",
    phase: "Year 1",
    phaseLabel: "Foundation & Audio Fundamentals",
    weeksLabel: "Weeks 22–24",
    hoursTotal: 12,
    icon: "🏆",
    badgeColor: "#eab308", // Gold
    isBossBlock: true,
    bossType: "MAJOR DEADLINE: Hand-in Composition Coursework",

    listening: {
      era: "Milestone Production Icons",
      genres: "Classic Production Masterpieces & Unconventional Vocal Production",
      context: "Steely Dan, Pink Floyd, Queen, Imogen Heap, Cher. Extreme double tracking, vocoders, talkboxes, pitch correction.",
      tracks: [
        { artist: "Steely Dan", title: "Peg", note: "Roger Nichols Wendel sampling computer, pristine multitrack audio clarity" },
        { artist: "Queen", title: "Bohemian Rhapsody", note: "Dozens of tape bounces, vocal tape wear, extreme stereo panning" },
        { artist: "Imogen Heap", title: "Hide and Seek", note: "DigiTech Vocalist Workstation harmonizer, vocoder timbre" },
        { artist: "Cher / T-Pain", title: "Believe / Buy U a Drank", note: "Hard pitch-correction speed set to 0, formant shifting" }
      ]
    },

    technical: {
      summary: "Vocal Production Chains, Pitch Correction (Auto-Tune vs Melodyne), Formant Preservation & Phase.",
      topics: [
        "Vocal Pitch Correction: Retune speed, Formant preservation, Scale locking, Note severance",
        "Phase alignment between multiple vocal and instrument takes",
        "Vocoders (Carrier synth modulated by Modulator voice) vs Talkboxes",
        "Creative production tricks: Reverse reverb swells, tape stops, stutter edits",
        "Year 1 course review and preparation for Year 2 official exam coursework"
      ],
      formulas: ["Phase Correlation: +1 = In Phase, 0 = True Stereo, -1 = 180° Out of Phase"]
    },

    practical: {
      title: "Vocal Production, Tech Icons & Year 1 Capstone Hand-In",
      description: "Complete the Year 1 Component 2 composition project. Perform manual pitch correction and formant shifting on vocal stems, construct tension risers, and conduct candidate peer reviews before submission.",
      deliverable: "Final 3-minute Year 1 Component 2 Composition master audio + complete track commentary dossier."
    },

    courseworkExam: {
      milestone: "HAND IN: Composition Coursework",
      detail: "Final submission of Component 2 practice composition audio, tracksheet dossier, and commentary write-up."
    },

    skillsMap: [
      { id: "b8-s1", category: "Critical Listening", title: "Milestone Production Deconstruction", description: "Analyze vocal multitrack stacking in Queen, Wendel sampling in Steely Dan, and formant manipulation in Imogen Heap." },
      { id: "b8-s2", category: "DAW Production", title: "Natural Vocal Pitch Correction", description: "Use graphic pitch correction (Melodyne) to adjust pitch center, pitch drift, and note severance while preserving vibrato." },
      { id: "b8-s3", category: "DAW Production", title: "Hard-Tune & Formant Shifting FX", description: "Program real-time pitch correction (retune speed = 0, scale lock) and shift formants to alter vocal timbre and gender." },
      { id: "b8-s4", category: "Technical DSP", title: "Vocoder & Carrier-Modulator Routing", description: "Configure vocoder sidechains: assign synthesizer carrier chords modulated by spoken/sung vocal filter analysis." },
      { id: "b8-s5", category: "DAW Production", title: "Creative Transition FX Production", description: "Build reverse reverb swells, tape stop pitch drops, and gated stutter edits for dynamic section transitions." },
      { id: "b8-s6", category: "Coursework NEA", title: "Component 2 Written Commentary Formulation", description: "Draft examiner commentary explaining synthesis patch parameters, audio sample sources, and structural intent." },
      { id: "b8-s7", category: "Coursework NEA", title: "Component 2 Master Package Submission", description: "Deliver 24-bit stereo WAV master, tracksheet dossier, and stimulus proof satisfying Component 2 specifications." }
    ],

    factsHW: [
      { id: 1, fact: "Auto-Tune retune speed determines how quickly the algorithm pulls pitch toward the nearest note; setting speed to 0 produces the robotic hard-tune effect." },
      { id: 2, fact: "Formants are resonant frequency bands created by the vocal tract; preserving formants maintains the natural timbre of the singer when pitch shifting." },
      { id: 3, fact: "A Vocoder analyses the frequency spectrum of a modulator signal (voice) through a filter bank and applies it to a carrier signal (synthesizer)." },
      { id: 4, fact: "A Talkbox routes audio from an amplifier through a plastic tube into the musician's mouth, shaping the instrument sound using the vocal cavity." },
      { id: 5, fact: "A Phase Correlation meter reading of -1 indicates total phase cancellation, meaning the track will be completely silent when summed to mono." },
      { id: 6, fact: "Melodyne uses frequency-selective spectral analysis to allow independent manipulation of pitch, drift, vibrato, timing, and formants on individual notes." },
      { id: 7, fact: "Varispeed alters the tape speed (or digital sample clock), changing both pitch and tempo simultaneously." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Music Technology Component 2 Composition Guidance and Tick List",
            "url": "https://www.musictechguru.com/music-technology-component-2-composition-guide/",
            "tag": "NEA Checklist"
      },
      {
            "title": "Remixing 'Shape of You' on Logic Pro X",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/",
            "tag": "Remix Tutorial"
      }
],
      shopResources: [
      {
            "title": "Edexcel A-Level Music Technology Component 2 Complete Guide \u2013 Brief 2 (Logic Pro X)",
            "url": "https://www.musictechguru.com/product/edexcel-a-level-music-technology-component-2-complete-guide-brief-2-logic-pro-x/",
            "tag": "NEA Master Guide"
      },
      {
            "title": "Stranger Things Theme Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/stranger-things-theme-logic-arrangement/",
            "tag": "Sound Design Pack"
      },
      {
            "title": "\u2018Heartbeats\u2019 by The Knife Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/the-guide-to-recreating-heartbeats-by-the-knife/",
            "tag": "Multitrack Remake"
      }
],
      aLevelGuides: [
      {
            "title": "Component 2: Sequencing, Sampling & Composition Guide",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/",
            "tag": "Spec Guide"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-10_p1",
            "title": "Topic 10 Quiz: Technology Icons & Milestones",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "dictionary",
            "title": "Production Dictionary: Master Terminology Challenge",
            "type": "dictionary",
            "actionText": "Open Dictionary"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Export C2 Composition Commentary Dossier",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-timeline-1",
      mtgQuizTitle: "Timeline Quiz: Historical Equipment & Techniques",
      hasTracksheet: true,
      tracksheetActionText: "Export Composition Dossier & Commentary",
      tutorialTitle: "Creative Vocal FX: Vocoders, Pitch-Shifting & Formant Magic"
    }
  },

  {
    id: "block-9",
    blockNumber: 9,
    title: "Rock Production, Multitrack Drums & Official C1 Launch",
    subtitle: "Classic & Modern Rock • Official Coursework 1",
    phase: "Year 2",
    phaseLabel: "A-Level NEA & Advanced Mastery",
    weeksLabel: "Weeks 25–27 (Y2 W1–3)",
    hoursTotal: 12,
    icon: "🥁",
    badgeColor: "#f97316", // Bright Orange
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "Classic & Modern Rock",
      genres: "Hard Rock, Heavy Metal, Punk, Alternative & Post-Rock",
      context: "Multi-mic drum tracking, Headley Grange stairwell acoustics, room mic compression, guitar cab miking arrays, bleed control.",
      tracks: [
        { artist: "Led Zeppelin", title: "When the Levee Breaks", note: "Andy Johns stairwell acoustics, dual Beyer M160 ribbon mics, Binson Echorec" },
        { artist: "AC/DC", title: "Back in Black", note: "Mutt Lange dry punch, dual hard-panned guitars, pristine transient separation" },
        { artist: "Foo Fighters", title: "Everlong", note: "Modern multitrack drum punch, double-tracked guitars, tight snare bottom" },
        { artist: "Queens of the Stone Age", title: "No One Knows", note: "Dead room tracking, cymbals recorded separately to avoid bleed" }
      ]
    },

    technical: {
      summary: "Multitrack Acoustic Drums, Stereo Arrays (A/B, X/Y, ORTF), Phase Coherence & Guitar Cabs.",
      topics: [
        "Acoustic Drum Kit Mic Placements: Kick In/Out, Snare Top/Bottom (phase inversion), Tom close-mics",
        "Overhead Stereo Arrays: Spaced Pair (A/B), Coincident Pair (X/Y), Near-Coincident (ORTF), Blumlein",
        "Phase Cancellation & The 3:1 Distance Rule",
        "Electric Guitar Cab Miking: SM57 on dust cap vs cone edge; pairing dynamic with ribbon mic (Royer R-121)",
        "Click tracks, tempo maps, and pre-production session organization"
      ],
      formulas: ["3:1 Distance Rule: D_bleed ≥ 3 × D_source", "Snare Phase Inversion: Polarity θ = 180°"]
    },

    practical: {
      title: "Live Band Recording Project (C1 NEA Warmup & Dry Run)",
      description: "Execute a full live band recording simulation as a comprehensive warmup before commencing official Component 1 NEA tracking. Mic an entire acoustic drum kit (Kick In/Out, Snare Top/Bottom with 180° polarity flip, toms, spaced A/B or ORTF overheads), DI and mic bass amps, dual-mic guitar cabinets (SM57 on cone edge + Royer R-121 ribbon), and track live guide vocals. Calibrate phase alignment, perform vocal comping, and test-export candidate tracksheet documentation.",
      deliverable: "Complete band multitrack session with sample-accurate phase alignment, rough balance mix, and verified pre-production candidate tracksheet."
    },

    courseworkExam: {
      milestone: "Official Component 1 Recording Launch",
      detail: "Candidate selects target song from Pearson Edexcel official brief and completes pre-production guide track."
    },

    skillsMap: [
      { id: "b9-s1", category: "Critical Listening", title: "Multitrack Drum Phase & Bleed Auditing", description: "Detect phase cancellation (hollow low-end, comb-filtered snare) and excessive cymbal bleed in drum multitracks." },
      { id: "b9-s2", category: "Studio Capture", title: "Acoustic Drum Multi-Miking Setup", description: "Deploy 8–10 microphones: Kick In/Out, Snare Top/Bottom, close Tom dynamics, Overheads, and Room boundary mics." },
      { id: "b9-s3", category: "Technical DSP", title: "Polarity Inversion & Phase Alignment", description: "Invert polarity (180° phase flip) on Snare Bottom and Kick Out mics, and zoom to sample level to align overhead transients." },
      { id: "b9-s4", category: "Studio Capture", title: "Stereo Array Implementation", description: "Rig Spaced Pair (A/B), Coincident (X/Y), and Near-Coincident (ORTF 110° @ 17cm) overhead arrays with balanced imaging." },
      { id: "b9-s5", category: "Studio Capture", title: "Guitar Cabinet Dual-Miking", description: "Pair dynamic (SM57 on cone edge) and ribbon (Royer R-121) mics with phase coherence for fat guitar capture." },
      { id: "b9-s6", category: "DAW Production", title: "Tempo Mapping & Guide Track Setup", description: "Build sample-accurate click tracks, tempo maps with rubato shifts, and latency-free headphone cue mixes." },
      { id: "b9-s7", category: "Coursework NEA", title: "Official C1 Session Documentation", description: "Initiate official Component 1 Tracksheet Creator session logging mic serials, polar patterns, preamps, and floorplans." }
    ],

    factsHW: [
      { id: 1, fact: "The Snare Bottom microphone must have its polarity inverted (180° phase flip) because the bottom head moves outward when the top head is struck inward." },
      { id: 2, fact: "The 3:1 Rule states that the distance between adjacent microphones should be at least three times the distance from each microphone to its sound source to avoid comb filtering." },
      { id: 3, fact: "X/Y Coincident stereo miking uses two directional capsules angled at 90° placed as close as possible, providing excellent mono compatibility with zero timing delay." },
      { id: 4, fact: "ORTF stereo uses two cardioid microphones angled at 110° spaced 17 cm apart, mimicking human ear spacing and head shadowing." },
      { id: 5, fact: "A Kick In mic (e.g. Shure Beta 91A) captures beater attack and click; a Kick Out mic (e.g. AKG D112 / Yamaha SubKick) captures sub-bass resonance." },
      { id: 6, fact: "Placing a guitar cab mic at the center (dust cap) captures the brightest, most aggressive high frequencies; angling toward the cone edge yields warmer tone." },
      { id: 7, fact: "Spill/bleed between drum microphones can be managed using directional polar patterns, physical baffles, acoustic gates, or transient envelope shapers." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Component 1: How to Mix Your Drums & Bass",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/",
            "tag": "Mixing Guide"
      },
      {
            "title": "Setting Up a Vocal Microphone (Parts 1 & 2)",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Component 1 Recording & Mixing Guidance",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/",
            "tag": "Spec Guide"
      }
],
      shopResources: [
      {
            "title": "Mixing for A-Level Music Technology \u2013 A Preparation Project",
            "url": "https://www.musictechguru.com/product/mixing-for-a-level-music-technology-a-preparation-project/",
            "tag": "Warmup Project"
      },
      {
            "title": "How to Mix a Live Recorded Song Using Logic Pro X (C1 Coursework Guide)",
            "url": "https://www.musictechguru.com/product/how-to-mix-for-component-1/",
            "tag": "C1 Masterclass"
      },
      {
            "title": "The Guide to Mixing Rock",
            "url": "https://www.musictechguru.com/product/the-guide-to-mixing-rock/",
            "tag": "Production Pack"
      },
      {
            "title": "The Guide to Mixing \u2018Moaning Lisa Smile\u2019 by Wolf Alice & \u2018Whinging Tom\u2019",
            "url": "https://www.musictechguru.com/product/guide-to-mixing-moaning-lisa-smile-whinging-tom/",
            "tag": "Multitrack Guide"
      }
],
      aLevelGuides: [
      {
            "title": "Official Component 1 NEA Recording Assessment Brief",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-1-recording-mixing/",
            "tag": "Spec Brief"
      }
],
      inAppActivities: [
      {
            "id": "c3_heavyrock",
            "title": "Official Component 3 Mock Exam: Heavy Rock Listening Paper",
            "type": "exam_c3",
            "actionText": "Launch C3 Exam"
      },
      {
            "id": "quiz-topic-2_p2",
            "title": "Topic 2 Quiz: Microphones & Acoustics (Part 2)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Official C1 Session Setup & Mic Floorplan",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-2_p2",
      mtgQuizTitle: "Topic 2: Microphones (Part 2)",
      hasTracksheet: true,
      tracksheetActionText: "Create Official C1 Coursework Project",
      tutorialTitle: "Drum Recording Masterclass: Phase Alignment & Bleed Management"
    }
  },

  {
    id: "block-10",
    blockNumber: 10,
    title: "House, Grooves, MIDI Sampling & Official C2 Launch",
    subtitle: "Electronic Dance Music • Official Coursework 2",
    phase: "Year 2",
    phaseLabel: "A-Level NEA & Advanced Mastery",
    weeksLabel: "Weeks 28–30 (Y2 W4–6)",
    hoursTotal: 12,
    icon: "🎚️",
    badgeColor: "#14b8a6", // Teal
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "Electronic Dance Music",
      genres: "Chicago House, Detroit Techno, Acid House, UK Garage & Deep House",
      context: "Roland TR-808/909, Roland TB-303 basslines, Korg M1 piano, UK Garage swung hi-hats, vinyl sampling.",
      tracks: [
        { artist: "Frankie Knuckles", title: "Your Love", note: "TR-909 kick/snare, Roland TB-303 resonant saw bassline" },
        { artist: "Marshall Jefferson", title: "Move Your Body", note: "Korg M1 acoustic piano preset, syncopated chord stabs" },
        { artist: "Todd Edwards / MJ Cole", title: "Sincere", note: "UK Garage vocal micro-chopping, swung 2-step hi-hats, sub glide" },
        { artist: "Robin S", title: "Show Me Love", note: "Korg M1 organ bass patch, punchy compressed kick drum" }
      ]
    },

    technical: {
      summary: "Advanced Sampler Sound Design, Groove Extraction, Quantisation Strength & Bass Separation.",
      topics: [
        "Advanced Sampler Architecture: Velocity crossfading, multi-outputs, key zones, sample start modulation",
        "The mathematics of swing: Delaying alternate 16th notes (54% to 66% swing ratio)",
        "Groove templates and extraction from classic audio breakbeats",
        "Bass guitar processing: Splitting bass into low band (<200Hz mono sine) and high band (>200Hz saturation)",
        "Component 2 brief stimulus selection and structural roadmap"
      ],
      formulas: ["Swing Ratio = (Beat 1 Length / Total Subdivided Time) × 100%"]
    },

    practical: {
      title: "House Grooves, MIDI Sampling & Official C2 Composition Launch",
      description: "Analyze the Pearson Edexcel Component 2 composition briefs. Select target brief, curate audio stimulus material, set up chromatic sampler key zones, and program an authentic EDM groove with groove templates and custom swing.",
      deliverable: "Official C2 Project DAW session initialized with tagged stimulus samples, tempo map, and 32-bar core musical theme."
    },

    courseworkExam: {
      milestone: "Official Component 2 Composition Launch",
      detail: "Deconstruct Pearson Edexcel composition stimulus options and lock candidate thematic concept."
    },

    skillsMap: [
      { id: "b10-s1", category: "Critical Listening", title: "Classic House & Garage Groove Dissection", description: "Analyze TR-909 syncopation, TB-303 acid filter resonance, 2-step garage swing, and Korg M1 piano layering." },
      { id: "b10-s2", category: "Coursework NEA", title: "Component 2 Stimulus Deconstruction", description: "Evaluate official Edexcel composition briefs against marking criteria (synthesis, sampling, manipulation, structure)." },
      { id: "b10-s3", category: "DAW Production", title: "Groove Extraction & Quantise Mapping", description: "Extract groove templates from live audio performances and apply iterative quantise strength to MIDI patterns." },
      { id: "b10-s4", category: "DAW Production", title: "Multi-Velocity Sampler Programming", description: "Build multi-layered sampler instruments with velocity crossfades, sample-start modulation, and multi-output routing." },
      { id: "b10-s5", category: "DAW Production", title: "Dual-Band Bass Processing", description: "Split bass into clean mono sub (<150Hz) and distorted stereo mid/high band (>150Hz) to maximize punch and translation." },
      { id: "b10-s6", category: "Studio Capture", title: "C1 Bass Guitar Tracking & Tightening", description: "Record candidate live bass guitar simultaneously via active DI box and miked valve amp cabinet." },
      { id: "b10-s7", category: "Coursework NEA", title: "C2 Stimulus Integration & Transformation", description: "Transform official stimulus audio using pitch shifting, time compression, and granular filters into custom instruments." }
    ],

    factsHW: [
      { id: 1, fact: "Velocity crossfading smoothly blends between soft and hard audio samples as key strike velocity increases, preventing abrupt tonal stepping." },
      { id: 2, fact: "A 16th-note swing value of 60% means the first 16th note occupies 60% of the eighth-note duration, and the second occupies 40%." },
      { id: 3, fact: "Groove extraction analyses audio transient peaks and generates a custom MIDI quantise template matching the exact performance timing." },
      { id: 4, fact: "The Roland TB-303 synthesiser uses a 3-pole 18 dB/octave diode ladder filter and signature accent circuit that alters volume, filter envelope, and decay." },
      { id: 5, fact: "Low frequencies below 100 Hz should almost always be centered in mono to maintain equal speaker load and avoid vinyl cutting or phase issues." },
      { id: 6, fact: "Portamento (Glide) introduces a continuous slide in pitch between consecutive legato notes." },
      { id: 7, fact: "Sample start modulation routes velocity or an LFO to offset the initial sample playback point, giving each strike unique attack character." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Sequencing 101 on Logic Pro X",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/",
            "tag": "Free Tutorial"
      },
      {
            "title": "Music Technology Component 2 Composition Guidance and Tick List",
            "url": "https://www.musictechguru.com/music-technology-component-2-composition-guide/",
            "tag": "NEA Checklist"
      }
],
      shopResources: [
      {
            "title": "Edexcel A-Level Music Technology Component 2 Complete Guide \u2013 Brief 2 (Logic Pro X)",
            "url": "https://www.musictechguru.com/product/edexcel-a-level-music-technology-component-2-complete-guide-brief-2-logic-pro-x/",
            "tag": "Brief Guide"
      },
      {
            "title": "\u2018Gotta Get Thru This\u2019 Logic Pro X Remake & 2-Step Stems",
            "url": "https://www.musictechguru.com/product/gotta-get-thru-this-logic-pro-x-remake/",
            "tag": "Multitrack Remake"
      },
      {
            "title": "Introduction to Drum Sampling Pack",
            "url": "https://www.musictechguru.com/product/introduction-to-drum-sampling/",
            "tag": "Sample Pack"
      }
],
      aLevelGuides: [
      {
            "title": "Official Component 2 NEA Composition Assessment Brief",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/",
            "tag": "Spec Brief"
      }
],
      inAppActivities: [
      {
            "id": "c4_edm",
            "title": "Official Component 4 Mock Exam: EDM Practical Production Paper",
            "type": "exam_c4",
            "actionText": "Launch C4 Exam"
      },
      {
            "id": "quiz-topic-6_p1",
            "title": "Topic 6 Quiz: Sequencing & EQ (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Log C2 Sample Stimulus & Source Details",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-6_p1",
      mtgQuizTitle: "Topic 6: Sequencing & EQ (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Log C2 Sample Stimulus & Source Details",
      tutorialTitle: "Cracking the Edexcel Component 2 Composition Brief: Strategy & Stimulus"
    }
  },

  {
    id: "block-11",
    blockNumber: 11,
    title: "Synth-Pop, Electro & Advanced Sound Design",
    subtitle: "Electroclash & Synthwave • C1 Guitars & C2 Themes",
    phase: "Year 2",
    phaseLabel: "A-Level NEA & Advanced Mastery",
    weeksLabel: "Weeks 31–33 (Y2 W7–9)",
    hoursTotal: 12,
    icon: "⚡",
    badgeColor: "#8b5cf6", // Violet
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "Synth-Pop & Contemporary Electro",
      genres: "Classic Synth-Pop, Electroclash, French Touch & Modern Synthwave",
      context: "Prophet-5, Minimoog, Juno-106 chorus, wavetable synthesis, talkboxes, vocoders, sidechain compression pumping.",
      tracks: [
        { artist: "Depeche Mode", title: "Enjoy the Silence", note: "Prophet-5 pads, layered clean guitar riffs, tight drum sequencing" },
        { artist: "Daft Punk", title: "Harder, Better, Faster, Stronger", note: "Talkbox, pitch correction, compression pumping, sampled funk riff" },
        { artist: "The Weeknd", title: "Blinding Lights", note: "Modern 80s synth revival, LinnDrum samples, Juno-106 analog arpeggios" },
        { artist: "Kavinsky", title: "Nightcall", note: "Gated drums, vocoder leads, detuned analog saw synth pads" }
      ]
    },

    technical: {
      summary: "Wavetable Synthesis, Frequency Modulation (FM), Ring Mod & Unison Detune.",
      topics: [
        "Wavetable Synthesis: Wavetable scanning, position modulation, wavetable interpolation",
        "FM Carrier-Modulator frequency ratios and harmonic sidebands",
        "Ring Modulation: Sum and difference frequencies, inharmonic metallic timbres",
        "Unison Detune: Multi-voice stacking, supersaws, stereo spread parameters",
        "Stereo acoustic guitar miking: X/Y coincident pair vs Spaced Pair at 12th fret and bridge"
      ],
      formulas: ["Sideband Frequencies: f_carrier ± (n × f_modulator)"]
    },

    practical: {
      title: "Synth-Pop, Electro & Advanced Sound Design (C1 Guitars & C2 Themes)",
      description: "Design advanced synthesizer patches using FM operator ratios, wavetable wavetables, and ring modulation for Component 2. In parallel, complete tracking and phase checks for Component 1 electric and acoustic guitars.",
      deliverable: "Component 1 multi-mic guitar stems + fully documented Component 2 custom synth patches."
    },

    courseworkExam: {
      milestone: "Mid-Coursework Diagnostic Review",
      detail: "Audit C1 tracking quality and check C2 synthesis requirements against official specification rubrics."
    },

    skillsMap: [
      { id: "b11-s1", category: "Critical Listening", title: "Advanced Electronic Timbre Analysis", description: "Identify wavetable position sweeps, FM operator sidebands, analog chorus width, and talkbox articulation." },
      { id: "b11-s2", category: "DAW Production", title: "Wavetable Sound Design", description: "Scan through single-cycle tables and modulate wavetable position using envelope followers and LFOs." },
      { id: "b11-s3", category: "Technical DSP", title: "FM Synthesis Ratio Programming", description: "Set carrier-to-modulator integer ratios (1:1, 1:2) for harmonic leads or non-integer ratios for bell and gong effects." },
      { id: "b11-s4", category: "Technical DSP", title: "Ring Modulation & Metallic FX", description: "Multiply carrier and modulator signals to generate sum and difference sidebands with carrier cancellation." },
      { id: "b11-s5", category: "DAW Production", title: "Supersaw Unison Detune Engineering", description: "Stack 7+ detuned sawtooth voices and widen stereo spread without phase thinness in mono summation." },
      { id: "b11-s6", category: "Studio Capture", title: "Stereo Acoustic Guitar Tracking", description: "Deploy matched Small Diaphragm Condensers in X/Y configuration at the 12th fret to record C1 acoustic rhythm." },
      { id: "b11-s7", category: "Coursework NEA", title: "Coursework Mid-Term Specification Audit", description: "Cross-reference candidate C1/C2 project files against Edexcel Top-Band criteria for contrast and complexity." }
    ],

    factsHW: [
      { id: 1, fact: "Wavetable synthesis sequences through single-cycle waveforms arranged in a table, creating dynamic harmonic movement through position modulation." },
      { id: 2, fact: "In FM synthesis, if the carrier-to-modulator frequency ratio is a whole integer (e.g. 1:1, 1:2), harmonic sidebands are generated; non-integer ratios yield metallic, inharmonic timbres." },
      { id: 3, fact: "Ring modulation multiplies two audio signals together, producing exclusively sum and difference frequencies while completely canceling the original carrier and modulator." },
      { id: 4, fact: "A Supersaw stacks multiple detuned sawtooth waves spread across the stereo spectrum, creating thick, shimmering leads and pads." },
      { id: 5, fact: "Stereo acoustic guitar tracking with an X/Y pair at the 12th fret eliminates phase cancellation and maintains balanced string-to-body tone." },
      { id: 6, fact: "Oscillator Sync resets the slave oscillator's waveform cycle every time the master oscillator completes a cycle, generating rich tearing overtones when sweeping pitch." },
      { id: 7, fact: "Polyphonic portamento enables smooth pitch slides between notes while sustaining multiple chord voices." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "The Retro Synth in Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Remake 'Too Good' by Drake on Logic Pro X - Instruments Part 2",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Tutorial"
      }
],
      shopResources: [
      {
            "title": "\u2018Singularity\u2019 by New Order Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/the-guide-to-recreating-singularity-by-new-order/",
            "tag": "Multitrack Remake"
      },
      {
            "title": "\u2018Monument\u2019 by R\u00f6yksopp Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/the-guide-to-recreating-monument-by-royksopp/",
            "tag": "Multitrack Remake"
      },
      {
            "title": "\u2018Madness\u2019 by Muse Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/the-guide-to-recreating-madness-by-muse/",
            "tag": "Multitrack Remake"
      }
],
      aLevelGuides: [
      {
            "title": "Sound Design for C2: Risers, Sweeps & Textures",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-2-sequencing-sampling-synthesis-composition/",
            "tag": "Technique Guide"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-3_p2",
            "title": "Topic 3 Quiz: Synthesis (Part 2)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Update C1 Guitar & Mic Placements",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      },
      {
            "id": "fingerprints",
            "title": "Sonic Fingerprints: Electro & Synth-Pop Waveforms",
            "type": "fingerprints",
            "actionText": "Explore Fingerprints"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-3_p2",
      mtgQuizTitle: "Topic 3: Synthesis (Part 2)",
      hasTracksheet: true,
      tracksheetActionText: "Update C1 Guitar & Mic Placements",
      tutorialTitle: "Sound Design for C2: Creating Professional Risers, Sweeps & Textures"
    }
  },

  {
    id: "block-12",
    blockNumber: 12,
    title: "Urban, EDM, Transducers & Mid-Year Mock Exams",
    subtitle: "EDM & Hip-Hop • Full Component 3 & 4 Papers",
    phase: "Year 2",
    phaseLabel: "A-Level NEA & Advanced Mastery",
    weeksLabel: "Weeks 34–36 (Y2 W10–12)",
    hoursTotal: 12,
    icon: "🔥",
    badgeColor: "#dc2626", // Deep Red
    isBossBlock: true,
    bossType: "MAJOR EXAM BOSS: Mid-Year Component 3 & 4 Mocks",

    listening: {
      era: "Modern Urban, EDM & Hip-Hop",
      genres: "Hip-Hop, Trap, Modern Urban Pop & Dubstep",
      context: "Sample-accurate MPC grooves, multi-band OTT compression, tape stop effects, heavily saturated 808 subs, transient shaping.",
      tracks: [
        { artist: "Dr. Dre", title: "Still D.R.E.", note: "MPC3000 groove, live Rhodes tracking, clean acoustic separation" },
        { artist: "Skrillex", title: "Scary Monsters and Nice Sprites", note: "FM wavetable bass growls, pitch vocal chops, OTT multiband compression" },
        { artist: "Travis Scott", title: "SICKO MODE", note: "Dynamic beat switches, tape stop effects, heavily saturated 808 sub bass" },
        { artist: "Childish Gambino", title: "Redbone", note: "Tape emulation, pitch-shifted lead vocals, vintage spring reverb" }
      ]
    },

    technical: {
      summary: "Transducer Physics, Capacitance, Polar Patterns & Component 3/4 Exam Strategies.",
      topics: [
        "Transducer Physics: Dynamic (Faraday induction), Ribbon (corrugated foil), Condenser (C = εA/d)",
        "Microphone Specifications: Sensitivity (mV/Pa), Self-noise (dB-A), Max SPL (dB for 0.5% THD)",
        "Component 3 Exam: Extended 12-mark comparative essay structuring",
        "Component 4 Exam: Rapid audio restoration, correcting phase defects, MIDI editing under pressure",
        "Transition sound design: Downlifters, white noise sweeps, reverse reverbs, impact hits"
      ],
      formulas: ["Capacitance C = ε × (A / d)", "Sensitivity = Output Voltage / Sound Pressure"]
    },

    practical: {
      title: "Urban, EDM, Transducers & Mid-Year Full Mock Examinations",
      description: "Sit full exam-condition papers for Component 3 (Listening & Analysing) and Component 4 (Producing & Analysing). Analyze written essay criteria and complete timed practical audio editing tasks.",
      deliverable: "Completed 12-mark comparison essay + bounced 24-bit Component 4 practical exam mixdown."
    },

    courseworkExam: {
      milestone: "MID-YEAR MOCK EXAMS (Components 3 & 4)",
      detail: "Complete full Pearson Edexcel Component 3 (1h30m) and Component 4 (2h15m) papers in exam hall conditions."
    },

    skillsMap: [
      { id: "b12-s1", category: "Technical DSP", title: "Transducer Physics Formulation", description: "Explain electromagnetic induction in dynamic/ribbon mics and electrostatic capacitance (C = εA/d) in condensers." },
      { id: "b12-s2", category: "Hardware & Routing", title: "Interpreting Microphone Spec Sheets", description: "Evaluate sensitivity (mV/Pa), self-noise (equivalent SPL in dB-A), and maximum SPL (0.5% THD) ratings." },
      { id: "b12-s3", category: "Exam Technique", title: "Component 3 12-Mark Essay Execution", description: "Structure comparative essays across Equipment, Capture, Processing, and Soundstage with technical justifications." },
      { id: "b12-s4", category: "Exam Technique", title: "Component 4 Audio Repair Under Pressure", description: "Diagnose polarity cancellation, filter 50Hz hum, and reconstruct missing drum transients within strict time limits." },
      { id: "b12-s5", category: "DAW Production", title: "Multitrack Take Comping", description: "Assemble seamless composite tracks from multiple vocal/guitar takes with matched zero-crossing crossfades." },
      { id: "b12-s6", category: "DAW Production", title: "Custom Transition Sound Design", description: "Synthesize pitched downlifters, noise risers, sidechain-pumped reverb impacts, and vinyl stop drops." },
      { id: "b12-s7", category: "DAW Production", title: "Transient Shaping Optimization", description: "Boost transient attack on sluggish snares and attenuate room bleed ring without changing compressor thresholds." }
    ],

    factsHW: [
      { id: 1, fact: "A condenser microphone diaphragm forms one plate of a capacitor; sound waves change the distance (d) between plates, altering capacitance and generating an electrical signal." },
      { id: 2, fact: "Sensitivity expresses the electrical output of a microphone for a given acoustic sound pressure level (typically measured in mV/Pa at 1 kHz)." },
      { id: 3, fact: "Self-noise (equivalent noise level) represents the electrical noise generated by the microphone itself; lower values (<14 dB-A) are essential for quiet acoustic sources." },
      { id: 4, fact: "Maximum SPL indicates the sound pressure level at which the microphone output reaches 0.5% Total Harmonic Distortion (THD)." },
      { id: 5, fact: "In the 12-mark Component 3 essay, candidates must compare two recordings across Equipment, Capture, Processing, and Soundstage." },
      { id: 6, fact: "Multiband compression divides the audio spectrum into independent frequency bands (e.g. Low, Mid, High), applying distinct threshold and ratio settings to each." },
      { id: 7, fact: "A Transient Shaper allows independent boosting or cutting of the initial attack transient and sustained decay tail without relying on a threshold." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Master Edexcel Component 3: Listening and Analysing Guide",
            "url": "https://www.musictechguru.com/edexcel-component-3-music-technology-revision/",
            "tag": "Exam Guide"
      },
      {
            "title": "Edexcel Component 4: Producing and Analysing Guide",
            "url": "https://www.musictechguru.com/edexcel-component-4-production-exam-revision/",
            "tag": "Exam Guide"
      }
],
      shopResources: [
      {
            "title": "2023 Music Technology Component 4 Past Paper Walkthrough",
            "url": "https://www.musictechguru.com/product/2023-music-technology-component-4-past-paper-walkthough/",
            "tag": "Exam Video"
      },
      {
            "title": "2022 Edexcel Music Technology Component 4 Exam Guidance Video",
            "url": "https://www.musictechguru.com/product/2022-edexcel-music-tech-component-4-exam/",
            "tag": "Exam Video"
      },
      {
            "title": "Guidance Video \u2013 How to Pass the 2020 Music Technology Exam Component 4",
            "url": "https://www.musictechguru.com/product/guidance-video-how-to-pass-the-2020-music-technology-exam-component-4/",
            "tag": "Exam Video"
      }
],
      aLevelGuides: [
      {
            "title": "Mastering the 12-Mark Comparison Essay in Component 3",
            "url": "https://www.musictechguru.com/edexcel-component-3-music-technology-revision/",
            "tag": "Essay Technique"
      }
],
      inAppActivities: [
      {
            "id": "c3_funk",
            "title": "Official Component 3 Mock Exam: Funk Listening Paper",
            "type": "exam_c3",
            "actionText": "Launch C3 Exam"
      },
      {
            "id": "c3_soul",
            "title": "Official Component 3 Mock Exam: Soul Listening Paper",
            "type": "exam_c3",
            "actionText": "Launch C3 Exam"
      },
      {
            "id": "quiz-topic-2_p1",
            "title": "Topic 2 Quiz: Microphones & Acoustics (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-2_p1",
      mtgQuizTitle: "Topic 2: Microphones (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Update C1 Editing & Comping Log",
      tutorialTitle: "Mastering the 12-Mark Comparison Essay in Component 3"
    }
  },

  {
    id: "block-13",
    blockNumber: 13,
    title: "The Vocal Chain, Synth Masterpiece & C2 Structure Lock",
    subtitle: "Electronic Pioneers • C1 Lead Vocals & C2 Arrangement",
    phase: "Year 2",
    phaseLabel: "A-Level NEA & Advanced Mastery",
    weeksLabel: "Weeks 37–39 (Y2 W13–15)",
    hoursTotal: 12,
    icon: "🎤",
    badgeColor: "#a21caf", // Fuchsia
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "Electronic Music Pioneers",
      genres: "Berlin School, Krautrock, French Electronic & Synth Masterworks",
      context: "Kraftwerk, Tangerine Dream, Jean-Michel Jarre, Vangelis, Giorgio Moroder. Analog sequencers, vocoders, CS-80 polyphonics.",
      tracks: [
        { artist: "Kraftwerk", title: "Autobahn / The Model", note: "Vocoders, Minimoog leads, custom electronic drum trigger pads" },
        { artist: "Jean-Michel Jarre", title: "Oxygène", note: "Eminent 310 Unique string synth, VCS3 synth, Small Stone phaser" },
        { artist: "Donna Summer", title: "I Feel Love", note: "Giorgio Moroder sequenced modular Moog bassline, kick drum driving delay" },
        { artist: "Vangelis", title: "Blade Runner Main Titles", note: "Yamaha CS-80 expressive polyphonic aftertouch, Lexicon 224 digital reverb" }
      ]
    },

    technical: {
      summary: "The Master Vocal Chain, De-Essers, Multiband Saturation & Multi-Engine Synthesis.",
      topics: [
        "Vocal Recording Chain: Microphone selection (LDC vs Tube vs SM7B), Pop filter (10–15cm), Preamp gain, Opto tracking compression",
        "Vocal Comping, Pitch Alignment, Note Slicing & Formant Correction",
        "De-Esser Architecture: Frequency-selective sidechain compression centered at 5 kHz – 8 kHz",
        "Synthesizer Masterpiece: Integrating Subtractive, FM, Wavetable, and Granular engines into one arrangement",
        "C2 Structure Lock: Ensuring minimum 3-minute requirement, dynamic arc, and contrast"
      ],
      formulas: ["De-Esser Notch Center = 6 kHz to 7.5 kHz (Vocal Sibilance)"]
    },

    practical: {
      title: "The Pro Vocal Chain, Synth Masterpiece & C2 Structure Lock",
      description: "Track final lead and backing vocal takes for Component 1 using a high-end vocal chain (pop shield, reflection filter, tube preamp emulation, optical compression, de-essing, surgical EQ). Finalize Component 2 arrangement architecture.",
      deliverable: "Pristine comped lead vocal stem with pitch correction + fully structured 3-minute Component 2 composition."
    },

    courseworkExam: {
      milestone: "C1 Tracking Sign-Off & C2 Structure Lock",
      detail: "Complete all live instrument/vocal tracking for C1 and freeze structural arrangement of C2."
    },

    skillsMap: [
      { id: "b13-s1", category: "Critical Listening", title: "Electronic Pioneer Instrumentation Analysis", description: "Recognize early sequencers (Moog modular), analog string synthesizers (Eminent 310), and vintage digital reverbs." },
      { id: "b13-s2", category: "Studio Capture", title: "Professional Lead Vocal Tracking", description: "Select valve/LDC microphones, position pop shield (12cm), and dial in optical tracking compression (1–3dB reduction)." },
      { id: "b13-s3", category: "DAW Production", title: "Vocal De-Esser Calibration", description: "Calibrate frequency-selective sidechain compression centered at 5.5 kHz – 7.5 kHz to eliminate sibilance without lisping." },
      { id: "b13-s4", category: "DAW Production", title: "Multi-Engine Synthesizer Orchestration", description: "Arrange a multi-layered piece integrating Subtractive (bass), FM (bells), Wavetable (pads), and Granular (atmospheres)." },
      { id: "b13-s5", category: "Coursework NEA", title: "Component 2 3-Minute Timing Verification", description: "Ensure composition duration meets the mandatory 3:00 to 3:30 Pearson Edexcel specification requirement." },
      { id: "b13-s6", category: "DAW Production", title: "CPU Track Freezing & Stem Bouncing", description: "Freeze virtual instruments and print software synthesis layers to 24-bit audio stems for risk-free mixdown." },
      { id: "b13-s7", category: "Coursework NEA", title: "Component 1 Tracking Milestone Sign-Off", description: "Verify that all 4+ required live audio tracks (Drums, Bass, Guitars, Vocals) have been fully captured for C1." }
    ],

    factsHW: [
      { id: 1, fact: "A Pop Shield slows down and disperses sudden bursts of turbulent air caused by plosive consonants ('P', 'B'), preventing diaphragm overload." },
      { id: 2, fact: "A De-Esser compresses only a specific narrow frequency band (typically 5 kHz – 8 kHz) when sibilant 'S' and 'T' sounds exceed the threshold." },
      { id: 3, fact: "A Tube (Valve) microphone preamp adds even-order harmonic distortion, introducing subtle warmth and perceived fullness." },
      { id: 4, fact: "Comping is the process of assembling the best phrases from multiple recorded takes into a single, flawless master performance track." },
      { id: 5, fact: "Tape saturation adds gentle soft-clipping and compression to peaks while rolling off ultra-high frequencies naturally." },
      { id: 6, fact: "The Shure SM7B dynamic microphone has a flat, wide frequency response, internal shock isolation, and electromagnetic shielding against hum." },
      { id: 7, fact: "Granular synthesis breaks audio samples into tiny grains (1–100ms) that are replayed, layered, and modulated to create evolving ambient clouds." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Setting Up a Vocal Microphone (Parts 1 & 2)",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      },
      {
            "title": "Using Insert Plugins Within Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Tutorial"
      }
],
      shopResources: [
      {
            "title": "\u2018La La La\u2019 by Naughty Boy Logic Pro X Multitrack & Tutorial",
            "url": "https://www.musictechguru.com/product/la-la-la-by-naughty-boy-logic-pro-x-multitrack-tutorial/",
            "tag": "Vocal Multitrack"
      },
      {
            "title": "Edexcel A-Level Music Technology Component 2 Complete Guide \u2013 Brief 2",
            "url": "https://www.musictechguru.com/product/edexcel-a-level-music-technology-component-2-complete-guide-brief-2-logic-pro-x/",
            "tag": "Brief Guide"
      },
      {
            "title": "How to Mix a Live Recorded Song Using Logic Pro X",
            "url": "https://www.musictechguru.com/product/how-to-mix-for-component-1/",
            "tag": "Mixing Masterclass"
      }
],
      aLevelGuides: [
      {
            "title": "Component 2 Composition Guide & Tick List",
            "url": "https://www.musictechguru.com/music-technology-component-2-composition-guide/",
            "tag": "NEA Checklist"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-3_p1",
            "title": "Topic 3 Quiz: Synthesis (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Log C1 Lead Vocal Chain & Mic Details",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      },
      {
            "id": "dictionary",
            "title": "Production Dictionary: Vocal Processing & Modulation Terms",
            "type": "dictionary",
            "actionText": "Open Dictionary"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-3_p1",
      mtgQuizTitle: "Topic 3: Synthesis (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Log C1 Lead Vocal Chain & Mic Details",
      tutorialTitle: "Vocal Chain Architecture: Preamp, Compression, De-Esser & Space"
    }
  },

  {
    id: "block-14",
    blockNumber: 14,
    title: "Mixing Architecture, Mastering & Final Logbook Dossiers",
    subtitle: "Commercial References • Final Polish & Tracksheets",
    phase: "Year 2",
    phaseLabel: "A-Level NEA & Advanced Mastery",
    weeksLabel: "Weeks 40–42 (Y2 W16–18)",
    hoursTotal: 12,
    icon: "🎛️",
    badgeColor: "#0284c7", // Sky blue
    isBossBlock: false,
    bossType: null,

    listening: {
      era: "Modern Reference Masters",
      genres: "Audiophile Reference Recordings & Student Curated Critical Analysis",
      context: "Steely Dan, Donald Fagen, Daft Punk, modern streaming masters. Analyzing low-end balance, LUFS, headroom, and mono compatibility.",
      tracks: [
        { artist: "Steely Dan", title: "Cousin Dupree", note: "Grammy-winning engineering, pristine dynamic punch, zero harshness" },
        { artist: "Donald Fagen", title: "I.G.Y.", note: "Early 3M digital multitrack recording, exceptional clarity and spatial depth" },
        { artist: "Daft Punk", title: "Touch", note: "Orchestral, electronic, vocal, and choir multitrack balance" },
        { artist: "Student Selected", title: "Commercial Reference Mix", note: "Detailed frequency balance, stereo imaging, and dynamic evaluation" }
      ]
    },

    technical: {
      summary: "Mixdown Strategy, Headroom, Mastering, LUFS, True Peak Limiting & Dither.",
      topics: [
        "Headroom & Inter-Sample Peaks (ISP): True Peak brickwall limiting (-1.0 dBFS ceiling)",
        "Loudness Units (LUFS): Integrated LUFS, Short-Term, Momentary, and Dynamic Range (LRA)",
        "Linear Phase EQ vs Minimum Phase EQ (Pre-ringing vs phase shifting)",
        "Dithering: TPDF (Triangular Probability Density Function) vs Noise-Shaped dither",
        "Compiling official examination logbooks, tracksheet diagrams, and technical commentary"
      ],
      formulas: ["LUFS Integrated: Target -14 to -12 LUFS for streaming", "True Peak Margin: -1.0 dBFS"]
    },

    practical: {
      title: "Mixing Architecture, Mastering & Final Logbook Dossier Sign-Off",
      description: "Perform final mixdown and mastering for both Component 1 and Component 2. Ensure compliance with true peak limits (-1.0 dBFS), integrated loudness standards, dynamic range, and print complete candidate declaration dossiers.",
      deliverable: "Approved 24-bit master audio files for C1 & C2 + complete PDF Candidate Tracksheets exported from Tracksheet Creator."
    },

    courseworkExam: {
      milestone: "Coursework Pre-Submission Quality Audit",
      detail: "Run full examiner quality check: zero digital clipping, correct sample rate, and verified paperwork."
    },

    skillsMap: [
      { id: "b14-s1", category: "Critical Listening", title: "Commercial Reference Track Matching", description: "Calibrate mix spectrum against Grammy-grade references (Steely Dan, Daft Punk) for bass balance and treble smoothness." },
      { id: "b14-s2", category: "DAW Production", title: "Parallel Master Drum Bus Compression", description: "Set up New York parallel compression bus to blend uncompressed transient punch with dense sustain body." },
      { id: "b14-s3", category: "Technical DSP", title: "Linear Phase vs Minimum Phase Mastering EQ", description: "Deploy Linear Phase EQ on complex stereo masters to adjust tonal balance without introducing frequency smearing." },
      { id: "b14-s4", category: "Technical DSP", title: "True Peak Limiting & Inter-Sample Peak Prevention", description: "Set True Peak limiting with a strict -1.0 dBFS ceiling to prevent clipping distortion during DAC reconversion." },
      { id: "b14-s5", category: "Technical DSP", title: "Loudness Metering (LUFS & LRA) Calibration", description: "Measure integrated LUFS (-14 to -12 LUFS) and Loudness Range (LRA) to optimize dynamics for examination criteria." },
      { id: "b14-s6", category: "Technical DSP", title: "Bit-Depth Reduction & Dithering Application", description: "Apply TPDF (Triangular Probability Density Function) dither as the final DSP insert when converting 32-bit float to 24-bit." },
      { id: "b14-s7", category: "Coursework NEA", title: "Full Tracksheet Creator Dossier Generation", description: "Export candidate studio logs, routing diagrams, signal chains, and teacher authentication declarations." }
    ],

    factsHW: [
      { id: 1, fact: "LUFS (Loudness Units relative to Full Scale) measures perceived audio loudness incorporating human ear sensitivity curves (K-weighting)." },
      { id: 2, fact: "True Peak limiters oversample audio to detect and prevent inter-sample peaks (ISPs) that exceed 0 dBFS when converted back to analog." },
      { id: 3, fact: "Linear Phase EQ maintains constant phase relationships across all frequencies, preventing phase smearing at the cost of subtle pre-ringing and latency." },
      { id: 4, fact: "A -1.0 dBFS True Peak ceiling is recommended when mastering to prevent distortion during lossy MP3/AAC encoding on streaming platforms." },
      { id: 5, fact: "Dithering must be applied only once, as the very final step when reducing bit depth (e.g. 32-bit floating point to 24-bit or 16-bit)." },
      { id: 6, fact: "Dynamic Range (LRA) measures the variation in loudness throughout an entire track in Loudness Units (LU)." },
      { id: 7, fact: "Checking a mix in mono immediately reveals comb filtering, phase cancellation, and unbalanced center elements." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Mastering in Logic Pro X (LUFS, Limiting & Dither)",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Tutorial"
      },
      {
            "title": "Using Aux and Bus Channels in Logic X",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/",
            "tag": "Free Video"
      }
],
      shopResources: [
      {
            "title": "Mixing for A-Level Music Technology \u2013 A Preparation Project",
            "url": "https://www.musictechguru.com/product/mixing-for-a-level-music-technology-a-preparation-project/",
            "tag": "Mixing Guide"
      },
      {
            "title": "The Guide to Mixing Rock",
            "url": "https://www.musictechguru.com/product/the-guide-to-mixing-rock/",
            "tag": "Production Pack"
      },
      {
            "title": "BandLab Mixing Tutorial/Assessment \u2013 'Talking 'bout a Revolution'",
            "url": "https://www.musictechguru.com/product/bandlab-mixing-tutorial-assessment-talking-bout-a-revolution/",
            "tag": "Assessment Guide"
      }
],
      aLevelGuides: [
      {
            "title": "Component 1 & 2 Coursework Submission Requirements",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/",
            "tag": "Spec Requirements"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-8_p1",
            "title": "Topic 8 Quiz: Mastering (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Generate Complete Official Candidate Dossier",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      },
      {
            "id": "dictionary",
            "title": "Production Dictionary: Mastering & Metering Terms",
            "type": "dictionary",
            "actionText": "Open Dictionary"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-8_p1",
      mtgQuizTitle: "Topic 8: Mastering (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Generate Complete Official Candidate Dossier",
      tutorialTitle: "Audio Mastering Fundamentals: LUFS, True Peak Limiting & Dither"
    }
  },

  {
    id: "block-15",
    blockNumber: 15,
    title: "Coursework Hand-In, Audio Restoration & Component 4 Drills",
    subtitle: "Official Submission • Restoration & Exam Sprints",
    phase: "Year 2",
    phaseLabel: "A-Level NEA & Advanced Mastery",
    weeksLabel: "Weeks 43–45 (Y2 W19–21)",
    hoursTotal: 12,
    icon: "📦",
    badgeColor: "#4f46e5", // Indigo
    isBossBlock: true,
    bossType: "OFFICIAL HAND-IN: Final Coursework C1 & C2 Upload",

    listening: {
      era: "Unseen Audio Case Studies",
      genres: "Historic Exam Clips & Problematic Stems",
      context: "Identifying 50Hz/60Hz mains hum, digital clipping, clicks/pops, phase cancellation, and improper panning in audio stems.",
      tracks: [
        { artist: "Exam Case Study 1", title: "Mains Hum & Ground Loop Clip", note: "Identifying 50Hz fundamental and harmonic buzz" },
        { artist: "Exam Case Study 2", title: "Severe Phase Inversion Dual Drum Mics", note: "Spotting hollow acoustic cancellation" },
        { artist: "Exam Case Study 3", title: "Clipped Vocal Transient Stem", note: "Distinguishing analog saturation from digital harshness" },
        { artist: "Exam Case Study 4", title: "Sibilance & Plosive Problem Stem", note: "Isolating 6kHz harshness and 40Hz wind pop" }
      ]
    },

    technical: {
      summary: "Audio Restoration DSP, De-Click, De-Hum, Spectral Repair & Timed MIDI Drills.",
      topics: [
        "Audio Restoration DSP: De-click (transient anomaly replacement), De-hum (50Hz notch + harmonics), Spectral repair",
        "Phase polarity inversion fixes for corrupted stems in Component 4",
        "Timed Synthesis Recreation: Matching oscillator waveforms, filter cutoff, and envelopes in under 8 minutes",
        "The 12-Mark Essay Structure: Equipment, Capture, Processing, Soundstage, Evaluation",
        "File integrity: Checking WAV headers, 24-bit/44.1kHz delivery, naming conventions"
      ],
      formulas: ["Mains Hum Frequency = 50 Hz (UK) or 60 Hz (US) + Harmonics (100Hz, 150Hz, 200Hz...)"]
    },

    practical: {
      title: "Official Coursework Hand-In, Audio Restoration & Component 4 Drills",
      description: "Officially submit Component 1 and 2 coursework files. Transition immediately into intensive Component 4 practical exam drills: spectral editing, click/hum removal, phase alignment, and transient shaping.",
      deliverable: "Official coursework submission confirmation + completed timed audio restoration exam tasks."
    },

    courseworkExam: {
      milestone: "FINAL COURSEWORK HAND-IN (Components 1 & 2)",
      detail: "Official candidate submission and sign-off for Pearson Edexcel Recording and Composition NEA."
    },

    skillsMap: [
      { id: "b15-s1", category: "Critical Listening", title: "Forensic Defect Identification", description: "Identify 50Hz mains hum harmonics, digital sample-rate mismatch clicks, and polarity inversion by ear." },
      { id: "b15-s2", category: "Technical DSP", title: "Mains Hum & Ground Loop Notch Filtering", description: "Eliminate UK 50Hz hum and its integer harmonics (100Hz, 150Hz, 200Hz) using steep parametric notch filters." },
      { id: "b15-s3", category: "DAW Production", title: "Spectral De-Clicking & Plosive Repair", description: "Use spectral editing tools and interpolation algorithms to excise isolated vocal plosives and mouth clicks." },
      { id: "b15-s4", category: "DAW Production", title: "Timed Synthesizer Patch Recreation", description: "Listen to isolated 4-bar synth leads/basses and accurately duplicate oscillator waveform, cutoff, and ADSR in <8 minutes." },
      { id: "b15-s5", category: "Coursework NEA", title: "File Delivery Format Verification", description: "Verify that final master audio files are uncompressed 24-bit/44.1kHz stereo WAVs with strict exam naming conventions." },
      { id: "b15-s6", category: "Coursework NEA", title: "Candidate Authentication Sign-Off", description: "Complete all Pearson Edexcel official candidate declaration forms and submit to secure examination server." },
      { id: "b15-s7", category: "Exam Technique", title: "Component 4 Practical DAW Speed Run", description: "Execute a full past Component 4 practical section (editing, sequencing, mix balance) in under 75 minutes." }
    ],

    factsHW: [
      { id: 1, fact: "Mains hum in the UK occurs at 50 Hz (due to 50 Hz AC electrical grid) and produces harmonics at 100 Hz, 150 Hz, 200 Hz, and so on." },
      { id: 2, fact: "A Ground Loop occurs when two interconnected audio devices share multiple grounding paths at slightly different voltage potentials, inducing 50Hz hum." },
      { id: 3, fact: "Spectral editing transforms audio into a 3D spectrogram (time, frequency, amplitude), enabling pinpoint visual removal of isolated coughs or clicks." },
      { id: 4, fact: "Digital clipping occurs when a signal exceeds 0 dBFS, squaring off the waveform and producing harsh odd-harmonic distortion." },
      { id: 5, fact: "De-click algorithms detect brief discontinuity spikes in the waveform and reconstruct the missing audio using interpolation." },
      { id: 6, fact: "Component 1 and 2 coursework files must be delivered as uncompressed 24-bit / 44.1 kHz stereo WAV files." },
      { id: 7, fact: "Phase alignment on Component 4 practical exams often requires engaging a single 180° polarity inversion button on one channel." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Edexcel Component 4: Producing and Analysing Guide",
            "url": "https://www.musictechguru.com/edexcel-component-4-production-exam-revision/",
            "tag": "Exam Guide"
      },
      {
            "title": "Music Tech Toolbox Reference",
            "url": "https://www.musictechguru.com/homepage/free-music-production-tutorials/mt-toolbox-blk/",
            "tag": "Toolbox Guide"
      }
],
      shopResources: [
      {
            "title": "2023 Music Technology Component 4 Past Paper Walkthrough",
            "url": "https://www.musictechguru.com/product/2023-music-technology-component-4-past-paper-walkthough/",
            "tag": "Walkthrough Video"
      },
      {
            "title": "2022 Edexcel Music Technology Component 4 Exam Guidance Video",
            "url": "https://www.musictechguru.com/product/2022-edexcel-music-tech-component-4-exam/",
            "tag": "Walkthrough Video"
      },
      {
            "title": "Guidance Video \u2013 How to Pass the 2019 Music Technology Exam Component 4",
            "url": "https://www.musictechguru.com/product/how-to-pass-the-2019-music-technology-exam-component-4/",
            "tag": "Walkthrough Video"
      }
],
      aLevelGuides: [
      {
            "title": "Component 4 Audio Restoration & Repair Secrets",
            "url": "https://www.musictechguru.com/edexcel-component-4-production-exam-revision/",
            "tag": "Technique Guide"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-9_p1",
            "title": "Topic 9 Quiz: Acoustics & Signal Flow (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "c4_spop",
            "title": "Component 4 Practical Speed Drill",
            "type": "exam_c4",
            "actionText": "Launch C4 Drill"
      },
      {
            "id": "tracksheet",
            "title": "Tracksheet Creator: Final Verified Submission Archive",
            "type": "tracksheet",
            "actionText": "Open Tracksheet Creator"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-9_p1",
      mtgQuizTitle: "Topic 9: Acoustics & Signal Flow (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Export Final Approved PDF Submissions",
      tutorialTitle: "Component 4 Audio Restoration & Repair: Secrets to Maximum Marks"
    }
  },

  {
    id: "block-16",
    blockNumber: 16,
    title: "Final Examination Mastery & Past Paper Bootcamp",
    subtitle: "The Final Boss • Components 3 & 4 Exam Readiness",
    phase: "Year 2",
    phaseLabel: "A-Level NEA & Advanced Mastery",
    weeksLabel: "Weeks 46–48 (Y2 W22–24)",
    hoursTotal: 12,
    icon: "👑",
    badgeColor: "#ffd700", // Bright Gold
    isBossBlock: true,
    bossType: "THE FINAL BOSS: Pearson Edexcel Final Exams",

    listening: {
      era: "Comprehensive Historic Eras (1950s–Present)",
      genres: "All Specification Styles & Audio Fingerprints",
      context: "Rapid identification of production eras, recording technologies, dynamic profiles, spatial design, and acoustic environments.",
      tracks: [
        { artist: "Historic Decade Drill", title: "1950s vs 1960s vs 1970s", note: "Mono tape vs 4-track ping-pong vs 24-track multitrack" },
        { artist: "Digital Decade Drill", title: "1980s vs 1990s vs 2000s", note: "FM synths/gated reverb vs time-stretch/DAWs vs loudness wars" },
        { artist: "Modern Decade Drill", title: "2010s to Present", note: "In-the-box sidechain, ASMR proximity, supersaws, extreme bass" },
        { artist: "Roulette Drill", title: "Unseen Audio Challenge Tracks", note: "Examiner test clips for immediate identification" }
      ]
    },

    technical: {
      summary: "Formula Memorization, Speed Calculations, Troubleshooting & Mark Scheme Traps.",
      topics: [
        "All Core Formulas: Delay times, Wavelength, Frequency, Bitrate, File size, Q-factor, Nyquist",
        "Component 3 Exam Strategy: Managing 1 hour 30 mins, managing audio track replays, 12-mark essay execution",
        "Component 4 Exam Strategy: 2 hours 15 mins time management, folder navigation, saving frequently",
        "Troubleshooting exam traps: Frequency boost/cut identification, compressor ratio calculations, phase checks",
        "Mental preparation, equipment checklist, and exam confidence"
      ],
      formulas: [
        "Delay ms = 60,000 / BPM",
        "Wavelength λ = 343 / f",
        "File Size (Bytes) = Sample Rate × (Bit Depth / 8) × Channels × Seconds",
        "Bitrate (bps) = Sample Rate × Bit Depth × Channels",
        "Q = f0 / Bandwidth"
      ]
    },

    practical: {
      title: "Final Examination Mastery & Past Paper Bootcamp (The Final Boss)",
      description: "Undertake timed past papers under strict exam conditions for Component 3 and Component 4. Review mark schemes, examiner reports, acoustic formulas, and complete the comprehensive Production Dictionary Master Challenge.",
      deliverable: "100% completed exam portfolio + validated 10-topic master quiz certificate."
    },

    courseworkExam: {
      milestone: "FINAL EXAMINATIONS: Pearson Edexcel 9MT0",
      detail: "Sit official Component 3 and Component 4 examinations with absolute confidence and master technique."
    },

    skillsMap: [
      { id: "b16-s1", category: "Technical DSP", title: "Speed Formula Calculations", description: "Calculate delay times, wavelength (λ = 343 / f), frequency period (T = 1/f), file sizes, and bitrate without hesitation." },
      { id: "b16-s2", category: "Critical Listening", title: "Cross-Decade Era Identification", description: "Identify production decades (1950s–2020s) and specific studio gear (Fairlight, 1176, DX7, 808) in unseen audio extracts." },
      { id: "b16-s3", category: "Critical Listening", title: "Parametric EQ Boost/Cut Ear Training", description: "Identify exact center frequencies (60Hz, 250Hz, 1kHz, 4kHz, 10kHz) and dB cut/boost values on audio clips." },
      { id: "b16-s4", category: "Exam Technique", title: "Component 3 Audio Track Replay Management", description: "Optimize track replay allowances on the 90-minute listening paper to maximize note taking and score high marks." },
      { id: "b16-s5", category: "Exam Technique", title: "Component 3 12-Mark Comparative Essay Mastery", description: "Write a high-scoring 12-mark comparative essay in under 25 minutes using Edexcel technical vocabulary." },
      { id: "b16-s6", category: "Exam Technique", title: "Component 4 Timed Practical Examination", description: "Complete all practical tasks (MIDI editing, corrective EQ, restoration, mix balance) in 135 minutes under hall conditions." },
      { id: "b16-s7", category: "Coursework NEA", title: "Master Examination Readiness & Confidence", description: "Audit student progress across all 16 blocks and confirm mastery of the complete Pearson Edexcel 9MT0 specification." }
    ],

    factsHW: [
      { id: 1, fact: "Delay time formula: Quarter note delay (ms) = 60,000 / BPM; Eighth note = 30,000 / BPM; Sixteenth note = 15,000 / BPM." },
      { id: 2, fact: "Wavelength formula: λ = v / f, where v is the speed of sound (approximately 343 m/s in air at 20°C)." },
      { id: 3, fact: "Audio File Size formula: File Size (Bytes) = Sample Rate (Hz) × (Bit Depth / 8) × Channels × Duration (seconds)." },
      { id: 4, fact: "Bitrate formula: Bitrate (bps) = Sample Rate (Hz) × Bit Depth × Channels (e.g. 44,100 × 16 × 2 = 1,411,200 bps = 1,411 kbps for CD)." },
      { id: 5, fact: "Q-Factor formula: Q = Center Frequency (f0) / Bandwidth (Δf); higher Q narrows the filter focus." },
      { id: 6, fact: "In Component 3, always use precise technical terminology: write 'Cardioid Large Diaphragm Condenser' rather than simply 'Mic'." },
      { id: 7, fact: "In Component 4, always check stereo master bus ceiling and verify that the bounced WAV file reproduces all requested edits cleanly." }
    ],

        resources: {
      freeTutorials: [
      {
            "title": "Past Papers & Edexcel Resources Archive",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/a-level-music-tech-course-overview/past-papers-edexcel-resources/",
            "tag": "Official Archive"
      },
      {
            "title": "Master Edexcel Component 3: Listening and Analysing Guide",
            "url": "https://www.musictechguru.com/edexcel-component-3-music-technology-revision/",
            "tag": "Revision Guide"
      },
      {
            "title": "Edexcel Component 4: Producing and Analysing Guide",
            "url": "https://www.musictechguru.com/edexcel-component-4-production-exam-revision/",
            "tag": "Revision Guide"
      }
],
      shopResources: [
      {
            "title": "Music Technology 1930\u20131961: A Complete Teaching Pack",
            "url": "https://www.musictechguru.com/product/music-technology-1930-1961/",
            "tag": "History Pack"
      },
      {
            "title": "2023 Music Technology Component 4 Past Paper Walkthrough",
            "url": "https://www.musictechguru.com/product/2023-music-technology-component-4-past-paper-walkthough/",
            "tag": "Exam Video"
      },
      {
            "title": "2022 Edexcel Music Technology Component 4 Exam Guidance Video",
            "url": "https://www.musictechguru.com/product/2022-edexcel-music-tech-component-4-exam/",
            "tag": "Exam Video"
      },
      {
            "title": "Guidance Video \u2013 How to Pass the 2020 Music Technology Exam Component 4",
            "url": "https://www.musictechguru.com/product/guidance-video-how-to-pass-the-2020-music-technology-exam-component-4/",
            "tag": "Exam Video"
      }
],
      aLevelGuides: [
      {
            "title": "Last-Minute Exam Hacks & Formula Review for 9MT0",
            "url": "https://www.musictechguru.com/homepage/a-level-music-technology/",
            "tag": "Formula Sheet"
      }
],
      inAppActivities: [
      {
            "id": "quiz-topic-10_p1",
            "title": "Topic 10 Quiz: Equipment & Studio Systems (Part 1)",
            "type": "quiz",
            "actionText": "Launch Quiz"
      },
      {
            "id": "c3_reggae",
            "title": "Official Component 3 Mock Exam: Reggae Listening Paper",
            "type": "exam_c3",
            "actionText": "Launch C3 Exam"
      },
      {
            "id": "dictionary",
            "title": "Production Dictionary: Master Terminology Challenge",
            "type": "dictionary",
            "actionText": "Open Dictionary"
      },
      {
            "id": "fingerprints",
            "title": "Sonic Fingerprints: Complete Era & Genre Audio Exam",
            "type": "fingerprints",
            "actionText": "Explore Fingerprints"
      }
]
    },

    appLinks: {
      mtgQuizId: "quiz-topic-10_p1",
      mtgQuizTitle: "Topic 10: Equipment & Studio Systems (Part 1)",
      hasTracksheet: true,
      tracksheetActionText: "Final Review of Coursework Records",
      tutorialTitle: "Last-Minute Exam Hacks & Formula Review for 9MT0"
    }
  }
];

export const SOW_RANKS = [
  { threshold: 0, title: "Studio Apprentice", badge: "🎧", description: "Starting your journey into audio technology." },
  { threshold: 2, title: "Acoustics Novice", badge: "🎙️", description: "Mastering transducers, microphones, and room sound." },
  { threshold: 4, title: "Rhythm Architect", badge: "🥁", description: "Commanding drum machines, grooves, and signal chains." },
  { threshold: 6, title: "Tape & Console Adept", badge: "🎚️", description: "Balancing analogue heritage with sampler manipulation." },
  { threshold: 8, title: "Synthesis Engineer", badge: "🎹", description: "Sculpting subtractive, FM, and wavetable timbres." },
  { threshold: 10, title: "Dynamics Virtuoso", badge: "⚡", description: "Harnessing FET, Opto, VCA compressors and sidechains." },
  { threshold: 12, title: "Modern Producer", badge: "💿", description: "Arranging complex multitrack sessions and transitions." },
  { threshold: 14, title: "Mastering Specialist", badge: "🔊", description: "Controlling LUFS, true peak dynamics, and stereo imaging." },
  { threshold: 16, title: "MTG Music Tech Legend", badge: "👑", description: "Total mastery of the A-Level Music Technology syllabus!" }
];

export function calculateSowProgress(completedBlockIds = [], completedSkillIds = []) {
  const total = TIMETABLE_BLOCKS.length;
  const count = completedBlockIds.length;
  const percent = Math.round((count / total) * 100);

  let currentRank = SOW_RANKS[0];
  for (let i = SOW_RANKS.length - 1; i >= 0; i--) {
    if (count >= SOW_RANKS[i].threshold) {
      currentRank = SOW_RANKS[i];
      break;
    }
  }

  const totalTeachingHours = TIMETABLE_BLOCKS.reduce((acc, b) => acc + b.hoursTotal, 0);
  const completedHours = completedBlockIds.length * 12; // 16 hours per block

  // Total skills across all blocks
  const totalSkills = TIMETABLE_BLOCKS.reduce((acc, b) => acc + (b.skillsMap ? b.skillsMap.length : 0), 0);
  const skillsDoneCount = completedSkillIds.length;
  const skillsPercent = totalSkills > 0 ? Math.round((skillsDoneCount / totalSkills) * 100) : 0;

  return {
    completedCount: count,
    totalBlocks: total,
    percent,
    rank: currentRank,
    completedHours,
    totalTeachingHours,
    totalSkills,
    skillsDoneCount,
    skillsPercent
  };
}
