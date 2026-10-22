/**
 * reorganize_worksheets_balanced.cjs
 * Restructures worksheet-ao3-ao4-q5 and worksheet-ao3-ao4-q6 into Two-Tier AO3 + AO4 questions:
 * - Part A: Technical Identification (AO3) - Exactly balanced option lengths (~90-115 chars)
 * - Part B: Contextual & Sonic Evaluation (AO4) - Exactly balanced option lengths (~110-135 chars)
 * - Eliminates length giveaway completely
 * - Shuffles correct answers across options A, B, C, D
 */

const fs = require('fs');
const path = require('path');

const courseDataPath = path.resolve('src/data/course_data.json');
const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

const allItems = courseData.sections.flatMap(s => s.items || []);

// ==========================================
// Q5: COMPARATIVE ANALYSIS (15 MARKS TOTAL)
// 3 Tracks x 5 Questions. Each Question: AO3 (1 mark) + AO4 (2 marks) = 3 marks
// ==========================================
const q5 = allItems.find(i => i.id === 'worksheet-ao3-ao4-q5');

// Track 1: Comfortably Numb (Pink Floyd vs Scissor Sisters)
const q5Track1Questions = [
  {
    id: "q1_drums",
    label: "Acoustic Capture vs Electronic Sequencing (Drum Production)",
    helperText: "Analyze the drum production in both versions by identifying the technical tracking method (AO3) and evaluating its musical/genre impact (AO4).",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Pink Floyd: Multi-miked acoustic Ludwig kit to 24-track tape; Scissor Sisters: 16-step grid-quantised MIDI samples in DAW",
          score: 1,
          summary: "Pink Floyd tracked multi-miked acoustic drums to 24-track tape, whereas Scissor Sisters sequenced grid-quantised MIDI samples in a DAW."
        },
        {
          text: "Pink Floyd: Programmed LinnDrum hardware triggers; Scissor Sisters: Live single-mic acoustic kit recorded in deadened booth",
          score: 0,
          summary: "Incorrectly identified LinnDrum on Pink Floyd and acoustic kit on Scissor Sisters."
        },
        {
          text: "Pink Floyd: Synthesized Simmons electronic drums; Scissor Sisters: Live acoustic drum kit tracked through vintage tape flanger",
          score: 0,
          summary: "Incorrectly claimed Simmons drums on Pink Floyd and live flanged kit on Scissor Sisters."
        },
        {
          text: "Both recordings utilized acoustic drum kits tracked live with identical close-miking techniques and ambient room microphone pairs",
          score: 0,
          summary: "Incorrectly claimed identical acoustic miking across both recordings."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Analogue tape saturation removed high frequencies; digital samples allowed loose, unpredictable human tempo swings",
          score: 0,
          summary: "Inaccurate evaluation of tape saturation and tempo swings."
        },
        {
          text: "Natural room bleed preserves dynamic rock drama; compressed electronic samples maintain constant dancefloor energy",
          score: 2,
          summary: "Natural room spill preserves progressive rock dynamic drama, while compressed samples maintain constant club dancefloor drive."
        },
        {
          text: "Quantized samples eliminated dance club momentum; acoustic drum dynamics allowed radio volume broadcast leveling",
          score: 0,
          summary: "Flawed claim regarding dance momentum and radio leveling."
        },
        {
          text: "Both production choices were made solely due to budget constraints with zero consideration for genre aesthetic or mood",
          score: 0,
          summary: "Inaccurate dismissive assertion of artistic production intent."
        }
      ]
    }
  },
  {
    id: "q2_vocals",
    label: "Vocal Phrasing, Delivery & Processing",
    helperText: "Examine the lead vocal capture and processing in both versions across technical capture (AO3) and expressive aesthetic (AO4).",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Pink Floyd: Vocals tracked through heavy Auto-Tune; Scissor Sisters: Natural ribbon mic performance without processing",
          score: 0,
          summary: "Incorrectly inverted pitch correction eras between 1979 and 2004."
        },
        {
          text: "Both artists recorded using identical binaural dummy head microphones placed 10 feet back in an untreated gymnasium room",
          score: 0,
          summary: "Fictitious microphone placement and technique claim."
        },
        {
          text: "Pink Floyd: Natural vocal delivery with EMT 140 plate; Scissor Sisters: Processed falsetto doubled and tuned in DAW",
          score: 1,
          summary: "Pink Floyd used natural vocal capture sweetened by EMT 140 plate reverb, while Scissor Sisters doubled and pitch-corrected falsetto in a DAW."
        },
        {
          text: "Pink Floyd: Telephonic band-pass filter throughout; Scissor Sisters: Low-pass filter eliminating all frequencies above 2kHz",
          score: 0,
          summary: "Inaccurate filter claims on lead vocal channels."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Gilmour/Waters convey clinical detachment and pain; Shears' disco falsetto creates euphoric club escapism and irony",
          score: 2,
          summary: "Waters and Gilmour contrast weary detachment with emotive warmth, whereas Shears transforms the lyric into hedonistic disco irony."
        },
        {
          text: "Gilmour's vocal was mixed quietly to hide pitch errors; Shears sang falsetto because studio microphones lacked low-end response",
          score: 0,
          summary: "Misinterprets artistic performance register as technical flaw."
        },
        {
          text: "Natural vocals are exclusive to progressive rock; processed falsetto vocals were mandated by 2004 streaming algorithm rules",
          score: 0,
          summary: "Anachronistic and inaccurate streaming assertion."
        },
        {
          text: "Both vocal styles produce an identical somber atmosphere with no perceptible variation in emotional tone or lyrical impact",
          score: 0,
          summary: "Fails to recognize profound emotional contrast between rock tragedy and disco euphoria."
        }
      ]
    }
  },
  {
    id: "q3_leads",
    label: "Lead Instrumentation: Guitar Solos vs Synthesizer Hooks",
    helperText: "Contrast the primary melodic focal points: David Gilmour's electric guitar versus Scissor Sisters' electronic synth riffs.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Pink Floyd: Stratocaster into Big Muff fuzz & Binson echo; Scissor Sisters: Quantised arpeggiators and laser synth sweeps",
          score: 1,
          summary: "David Gilmour utilized a Fender Stratocaster through Big Muff fuzz and Binson Echorec, whereas Scissor Sisters featured MIDI synth arpeggiators."
        },
        {
          text: "Pink Floyd: Clean nylon-string guitar with spring reverb; Scissor Sisters: Distorted heavy metal guitar through Marshall stacks",
          score: 0,
          summary: "Inaccurate instrument identification on both recordings."
        },
        {
          text: "Pink Floyd: Synthesizer lead played on Oberheim OB-Xa; Scissor Sisters: 55-piece live brass section performing unison stabs",
          score: 0,
          summary: "Reversed electronic and acoustic arrangements."
        },
        {
          text: "Both recordings feature acoustic grand piano as the sole lead melodic instrument throughout the entire song structure",
          score: 0,
          summary: "Incorrectly claimed piano as sole lead instrument."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Guitar solos were lengthened to fill vinyl space; synth arpeggiators were used solely because band members could not play guitar",
          score: 0,
          summary: "Baseless speculation dismissing artistic intent."
        },
        {
          text: "Gilmour's solos provide dramatic narrative catharsis; Scissor Sisters' relentless arpeggiator maintains hypnotic dance groove",
          score: 2,
          summary: "Gilmour's extended solos provide emotional narrative catharsis, while Scissor Sisters' arpeggio provides relentless dance momentum."
        },
        {
          text: "The synthesizer arpeggiator created a somber mood; the distorted guitar solo was intended to make listeners dance energetically",
          score: 0,
          summary: "Inverted aesthetic functions of the two lead arrangements."
        },
        {
          text: "Both lead arrangements share identical textural density with no difference in harmonic sustain, modulation, or melodic pacing",
          score: 0,
          summary: "Fails to compare sustain, modulation, or pacing."
        }
      ]
    }
  },
  {
    id: "q4_stereo",
    label: "Stereo Imaging & Spatial Environment",
    helperText: "Analyze the soundstage width, reverberant acoustics, and panning architecture across both recordings.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Pink Floyd: 1960s hard L/R panning with no center; Scissor Sisters: Complete mono audio file mixed for single phone speaker",
          score: 0,
          summary: "Inaccurate historical panning claims on both mixes."
        },
        {
          text: "Pink Floyd: Natural room acoustic & split guitar cabinets; Scissor Sisters: Wide DAW stereo field with panning synth textures",
          score: 1,
          summary: "Pink Floyd used natural acoustic space and split guitar amps, while Scissor Sisters created stereo width via panning synth sequences."
        },
        {
          text: "Pink Floyd: Binaural dummy head surround audio; Scissor Sisters: Quadraphonic vinyl cutting lathe with rear matrix encoding",
          score: 0,
          summary: "Spurious surround format assertions."
        },
        {
          text: "Both recordings collapse all instrumentation to dead center with zero stereo width or reverberant spatial depth",
          score: 0,
          summary: "Incorrectly claimed mono mixes."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Analogue acoustic space gives symphonic grandeur; synthetic DAW stereo width creates immersive, modern dance club power",
          score: 2,
          summary: "Analogue hall acoustic provides symphonic depth, while DAW stereo width optimizes track for high-impact club systems."
        },
        {
          text: "Acoustic space was an accidental mistake of bleed; synthetic stereo width makes dance tracks sound hollow and thin in clubs",
          score: 0,
          summary: "Incorrect assessment of room bleed and club width."
        },
        {
          text: "Narrow stereo fields are preferred for disco; wide orchestral soundstages were forbidden under 1970s British vinyl regulations",
          score: 0,
          summary: "Fictitious regulatory claims."
        },
        {
          text: "Both spatial treatments function identically without affecting perceived depth, instrument separation, or listener immersion",
          score: 0,
          summary: "Fails to evaluate spatial depth or immersion."
        }
      ]
    }
  },
  {
    id: "q5_dynamics",
    label: "Dynamic Range & Mix Bus Processing",
    helperText: "Evaluate the dynamic philosophy: organic headroom and manual fades versus modern digital limiting and loudness.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Pink Floyd: Digital brickwall limiter targeting -6 LUFS; Scissor Sisters: Completely uncompressed analogue tape with 20dB DR",
          score: 0,
          summary: "Completely inverted dynamic mastering tools and eras."
        },
        {
          text: "Pink Floyd: Wide dynamic range with manual fader fade; Scissor Sisters: Heavy bus compression & brickwall digital limiting",
          score: 1,
          summary: "Pink Floyd preserved wide dynamic range with gradual manual console fade-out, while Scissor Sisters used heavy bus compression and digital limiting."
        },
        {
          text: "Pink Floyd: Downward expander gating all verses; Scissor Sisters: Constant tape wow and flutter with tape saturation dropouts",
          score: 0,
          summary: "Inaccurate claims regarding gating and tape defects."
        },
        {
          text: "Both tracks were mastered with identical peak-to-average loudness ratios and flat dynamic envelopes across all sections",
          score: 0,
          summary: "Incorrect assertion of identical loudness envelopes."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "High dynamic range makes rock songs sound weak; continuous digital limiting ruins emotional enjoyment for all listeners",
          score: 0,
          summary: "Biased and overgeneralized opinion."
        },
        {
          text: "Floyd's dynamic breathing mirrors psychological narrative; Scissor Sisters' high density ensures maximum dancefloor impact",
          score: 2,
          summary: "Floyd's dynamics mirror emotional psychological peaks, while Scissor Sisters' high density suits continuous club playback."
        },
        {
          text: "Manual fades were used to cut off bad guitar notes; digital limiters were used to prevent audio files from being copied",
          score: 0,
          summary: "Absurd claims regarding editing errors and copyright."
        },
        {
          text: "Both mastering approaches have zero audible influence on perceived volume, transient punch, or listener fatigue over time",
          score: 0,
          summary: "Fails to evaluate transient punch or ear fatigue."
        }
      ]
    }
  }
];

// Track 2: Word Up! (Cameo vs Korn)
const q5Track2Questions = [
  {
    id: "q1_drums",
    label: "Rhythm Foundation: Drum Machine vs Triggered Metal Kit",
    helperText: "Analyze the drum production in both versions across technical tracking (AO3) and genre function (AO4).",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Cameo: Oberheim DMX drum machine with gated reverb; Korn: Multi-miked live acoustic kit augmented with digital triggers",
          score: 1,
          summary: "Cameo programmed an Oberheim DMX drum machine with gated snare reverb, while Korn tracked live drums blended with sample triggers."
        },
        {
          text: "Cameo: Live jazz brush kit in room; Korn: 8-bit Roland TR-808 drum machine with zero acoustic drums or compression",
          score: 0,
          summary: "Incorrectly attributed jazz brushes to Cameo and TR-808 to Korn."
        },
        {
          text: "Cameo: Synthesized acoustic cymbals from DX7; Korn: Pre-recorded cassette drum loops running through analogue phaser",
          score: 0,
          summary: "Inaccurate synthesizer and cassette loop claims."
        },
        {
          text: "Both recordings used identical acoustic drum kits recorded with three microphones in an untreated suburban garage room",
          score: 0,
          summary: "Fictitious garage recording assertion."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Cameo's rigid machine beat drives electro-funk bounce; Korn's heavy triggered kit delivers aggressive nu-metal weight",
          score: 2,
          summary: "Cameo's machine pulse drives synthetic funk bounce, whereas Korn's triggered acoustic drums deliver visceral metal aggression."
        },
        {
          text: "Drum machines were used because Cameo had no drummer; live kits were used by Korn because metal bands cannot afford computers",
          score: 0,
          summary: "Dismissive and inaccurate assumptions."
        },
        {
          text: "Triggered samples make rock drums sound thin and quiet; gated reverb makes funk rhythm slow and unsuited for dancing",
          score: 0,
          summary: "Inverted sonic character of triggered samples and gated reverb."
        },
        {
          text: "Both drum approaches create an identical relaxed groove with no perceptible contrast in punch, transient attack, or mood",
          score: 0,
          summary: "Fails to compare transient attack or mood."
        }
      ]
    }
  },
  {
    id: "q2_vocals",
    label: "Vocal Phrasing, Pitching & Performance Demeanor",
    helperText: "Contrast Larry Blackmon's flamboyant funk vocal with Jonathan Davis's menacing nu-metal delivery.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Cameo: Autotuned robot vocoder throughout; Korn: Pristine operatic tenor captured with vintage tube ribbon microphone",
          score: 0,
          summary: "Inaccurate vocal processing and vocal type descriptions."
        },
        {
          text: "Cameo: Nasal falsetto funk shouts with slap delay; Korn: Dynamic whispered verses transitioning into guttural screams",
          score: 1,
          summary: "Larry Blackmon delivered high-pitched nasal funk exclamations, while Jonathan Davis contrasted whispered verses with guttural screams."
        },
        {
          text: "Cameo: Spoken word rap with telephone filter; Korn: Harmonized children's choir tracked across 32 digital tracks",
          score: 0,
          summary: "Inaccurate vocal styles on both songs."
        },
        {
          text: "Both vocalists perform in an identical relaxed baritone register with dry channel strips and zero delay or compression",
          score: 0,
          summary: "Incorrect claim of identical dry baritone registers."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Nasal phrasing conveys humorous party swagger; extreme dynamic vocal shifts convey psychological torment and metal menace",
          score: 2,
          summary: "Blackmon's theatrical delivery creates playful party swagger, whereas Davis's vocal dynamics convey visceral psychological aggression."
        },
        {
          text: "Funk vocals were screamed to overcome loud synths; metal vocals were whispered to avoid blowing up high-gain amplifiers",
          score: 0,
          summary: "Absurd technical rationalizations for performance style."
        },
        {
          text: "Slapback delay removes clarity from funk vocals; screaming in metal was an accident caused by high microphone pre-amp gain",
          score: 0,
          summary: "Dismisses vocal techniques as accidents."
        },
        {
          text: "Both vocal approaches evoke an identical lighthearted pop emotion with zero stylistic or genre divergence in vocal attitude",
          score: 0,
          summary: "Fails to identify stylistic or emotional divergence."
        }
      ]
    }
  },
  {
    id: "q3_bass",
    label: "Bass Mechanics: Clean Slap vs Down-Tuned 5-String Click",
    helperText: "Analyze the technical bass setup (AO3) and how it anchors the groove in each genre (AO4).",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Cameo: Clean slap bass with midrange punch; Korn: 5-string bass tuned to A with scooped mids and emphasized 4kHz fret click",
          score: 1,
          summary: "Cameo featured clean slap bass with warm midrange, while Fieldy used a down-tuned 5-string bass with extreme mid-scoop and 4kHz fret click."
        },
        {
          text: "Cameo: Sub-bass 808 synth sine waves; Korn: Acoustic upright double bass captured with single dynamic mic at f-hole",
          score: 0,
          summary: "Incorrectly attributed 808 sub to Cameo and upright bass to Korn."
        },
        {
          text: "Cameo: Fretless bass through heavy fuzz pedal; Korn: Synthesized bassline programmed in MIDI sequencer using saw waves",
          score: 0,
          summary: "Inaccurate bass instruments and processing."
        },
        {
          text: "Both tracks used an identical 4-string Precision bass played with a pick through a vintage Ampeg SVT tube amplifier",
          score: 0,
          summary: "Incorrectly asserted identical P-bass setup."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Slap bass was used to fill empty guitar space; fret click was added because the bassist did not know how to mute strings",
          score: 0,
          summary: "Misinterprets iconic slap and click techniques as technical errors."
        },
        {
          text: "Cameo's slap thumb brings human warmth to machines; Fieldy's clicky sub-bass locks with kick for crushing industrial groove",
          score: 2,
          summary: "Cameo's slap bass adds human groove to synthetic beats, while Fieldy's percussive sub-bass fuses with the kick for nu-metal punch."
        },
        {
          text: "Mid-scooped bass muddies modern rock mixes; warm midrange slap bass makes electronic dance tracks unplayable in clubs",
          score: 0,
          summary: "Inaccurate claims about mix clarity and club playback."
        },
        {
          text: "Both bass tones share identical frequency balances with no difference in transient attack, low-end weight, or percussive click",
          score: 0,
          summary: "Fails to compare frequency balance and transient attack."
        }
      ]
    }
  },
  {
    id: "q4_guitars",
    label: "Guitar Textures: Rhythmic Funk Scratch vs Down-Tuned Metal Wall",
    helperText: "Evaluate the role of guitars in each production: rhythmic percussive scratches versus heavy down-tuned distortion.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Cameo: Heavy fuzz guitar with feedback solos; Korn: Clean acoustic guitars fingerpicked in open tuning with capos",
          score: 0,
          summary: "Inverted guitar setups between funk and nu-metal."
        },
        {
          text: "Cameo: Clean Stratocaster percussive scratch chords; Korn: Quad-tracked 7-string down-tuned guitars through high-gain amps",
          score: 1,
          summary: "Cameo used clean Strat percussive muted scratches, while Korn quad-tracked 7-string guitars through high-gain Mesa Boogie amplifiers."
        },
        {
          text: "Cameo: Synthesizer guitar emulation on DX7; Korn: Single electric guitar tracked direct with zero distortion or amp simulator",
          score: 0,
          summary: "Incorrect synth and DI claims."
        },
        {
          text: "Both productions completely omitted guitars from the arrangement, relying exclusively on synthesizers for harmonic chords",
          score: 0,
          summary: "Incorrectly claimed guitars were absent."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Clean funk scratches act as percussive syncopation; quad-tracked high-gain guitars create a massive, aggressive wall of sound",
          score: 2,
          summary: "Cameo's clean scratches act as high-frequency rhythmic percussion, whereas Korn's quad-tracked wall provides crushing heavy metal weight."
        },
        {
          text: "Percussive scratches were played quietly to avoid clipping tape; distorted guitars were quad-tracked to hide bad intonation",
          score: 0,
          summary: "Unsubstantiated negative speculation."
        },
        {
          text: "7-string guitars were created to play jazz chords; clean funk scratching was invented because electric guitars lacked amplifiers",
          score: 0,
          summary: "Historically false statements."
        },
        {
          text: "Both guitar arrangements occupy identical frequency ranges and contribute identical harmonic textures to their respective mixes",
          score: 0,
          summary: "Fails to evaluate frequency ranges or textures."
        }
      ]
    }
  },
  {
    id: "q5_dynamics",
    label: "Dynamic Range & Loudness War Impact",
    helperText: "Analyze the mastering architecture: 1980s vinyl headroom versus 2000s CD brickwall limiting.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "Cameo: Digital limiter pushing -6 LUFS on cassette; Korn: Uncompressed 24-track tape master with 18dB dynamic headroom",
          score: 0,
          summary: "Inverted mastering dynamics between 1986 and 2004."
        },
        {
          text: "Cameo: Vinyl master with high-pass filtered lows (>12dB DR); Korn: Smashed digital CD master with heavy peak limiting (-8 LUFS)",
          score: 1,
          summary: "Cameo's vinyl master preserved 12dB dynamic range with controlled low-end, whereas Korn's CD master was brickwall limited to -8 LUFS."
        },
        {
          text: "Cameo: Binaural dynamics with zero channel compression; Korn: Expander-gate removing all sound between guitar strum hits",
          score: 0,
          summary: "Inaccurate dynamic processing assertions."
        },
        {
          text: "Both recordings exhibit identical dynamic range profiles, crest factors, and integrated loudness measurements throughout",
          score: 0,
          summary: "Incorrect claim of identical dynamic profiles."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Vinyl headroom preserved punchy drum transient spikes; Loudness War limiting maximized competitive volume on rock radio and CD",
          score: 2,
          summary: "Vinyl headroom preserved punchy transient spikes, while Loudness War limiting delivered competitive volume for 2000s rock radio and CDs."
        },
        {
          text: "High dynamic range makes funk music sound outdated; brickwall limiting enhances instrument separation and clarity in metal",
          score: 0,
          summary: "Incorrect claim that limiting improves instrument separation."
        },
        {
          text: "Vinyl cutting required low-pass filtering at 500Hz; modern CDs require all audio waveforms to be completely clipped at all times",
          score: 0,
          summary: "Absurd technical claims regarding vinyl and CD mastering."
        },
        {
          text: "Both dynamic approaches deliver identical transient response and produce zero difference in listener fatigue or perceived punch",
          score: 0,
          summary: "Fails to compare transient response and listener fatigue."
        }
      ]
    }
  }
];

// Track 3: Smooth Criminal (Michael Jackson vs Alien Ant Farm)
const q5Track3Questions = [
  {
    id: "q1_groove",
    label: "Groove Architecture: Synclavier Sequencing vs Live Rock Drumming",
    helperText: "Examine how the rhythm was tracked (AO3) and how it drives the song's energy (AO4).",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "MJ: Synclavier II digital sequencing and programmed LinnDrum; AAF: High-energy live acoustic kit tracked in reverberant room",
          score: 1,
          summary: "Michael Jackson utilized Synclavier II digital sequencing and LinnDrum, while Alien Ant Farm tracked a high-energy live acoustic kit in a live room."
        },
        {
          text: "MJ: Live jazz swing trio recorded to mono tape; AAF: Synthesized 808 electronic samples programmed in digital step sequencer",
          score: 0,
          summary: "Inverted tracking methods between pop and rock versions."
        },
        {
          text: "MJ: Single room mic capturing acoustic tambourine; AAF: Electronic drum pads running through heavy digital flanger plugins",
          score: 0,
          summary: "Inaccurate instrument and processing descriptions."
        },
        {
          text: "Both recordings used drum machine presets directly from a Roland TR-909 without any acoustic recording or live drum takes",
          score: 0,
          summary: "Incorrect assertion of identical TR-909 drum machines."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Synclavier sequencing gave clinical pop precision; live rock drumming transformed the groove into reckless punk-rock drive",
          score: 2,
          summary: "Synclavier precision gave Jackson's pop groove robotic punch, whereas Alien Ant Farm's live drumming injected raw punk-rock momentum."
        },
        {
          text: "Sequencing was used because Michael Jackson could not keep time; live drums were used because rock bands cannot program MIDI",
          score: 0,
          summary: "Dismissive and unprofessional assumptions."
        },
        {
          text: "Live drums eliminate all rhythmic energy in rock; digital sequencers make pop records sound unlistenable on dancefloor PAs",
          score: 0,
          summary: "Inverted musical evaluations."
        },
        {
          text: "Both drum arrangements convey identical emotional intensity with zero difference in human feel, microtiming, or dynamic punch",
          score: 0,
          summary: "Fails to compare human feel, microtiming, or punch."
        }
      ]
    }
  },
  {
    id: "q2_vocals",
    label: "Vocal Delivery, Microphone Selection & Signature Phrasing",
    helperText: "Analyze the vocal capture chain (AO3) and how vocal style defines the song's identity (AO4).",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "MJ: Shure SM7 dynamic mic, percussive gasps & falsetto belts; AAF: Aggressive punk belting with nasal register and dub delay throws",
          score: 1,
          summary: "Michael Jackson sang into a Shure SM7 with rhythmic gasps and falsetto, while Dryden Mitchell belted with aggressive punk timbre and dub delays."
        },
        {
          text: "MJ: Autotuned vocoder delivery with pitch correction; AAF: Smooth acoustic crooning captured with ribbon mic in vocal isolation booth",
          score: 0,
          summary: "Incorrectly attributed vocoder to Jackson and crooning to AAF."
        },
        {
          text: "MJ: Whispered monologue through heavy chorus pedal; AAF: Death metal guttural growls tracked through vintage Leslie rotary speaker",
          score: 0,
          summary: "Inaccurate vocal styles and signal chains."
        },
        {
          text: "Both vocalists recorded using identical hand-held dynamic stage microphones with no preamplification, EQ, or compression applied",
          score: 0,
          summary: "Fictitious claim of untreated stage microphones."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Jackson's percussive sighs act as rhythm instruments; Mitchell's strained belt transforms the narrative into angsty alt-rock",
          score: 2,
          summary: "Jackson treated vocal hiccups as rhythmic percussion, while Mitchell's strained rock belt recontextualized the narrative into post-grunge angst."
        },
        {
          text: "Dynamic mics made Michael Jackson's vocals muffled; punk shouting was added because the band could not afford vocal lessons",
          score: 0,
          summary: "Derogatory and technically inaccurate assertion."
        },
        {
          text: "Percussive gasps were mistakes that could not be edited out on tape; rock belting was required to overpower distorted amplifiers",
          score: 0,
          summary: "Misinterprets deliberate artistic choices as technical flaws."
        },
        {
          text: "Both vocal performances generate identical vocal textures with zero distinction in rhythmic phrasing, timber, or mood",
          score: 0,
          summary: "Fails to evaluate phrasing, timbre, or mood."
        }
      ]
    }
  },
  {
    id: "q3_riff",
    label: "Main Riff Translation: Synths & Horns vs Distorted Rock Guitars",
    helperText: "Contrast how the iconic staccato riff was constructed in each production.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "MJ: Clean nylon acoustic guitar with nylon picks; AAF: 16-piece brass section performing staccato horn hits through tape echo",
          score: 0,
          summary: "Reversed acoustic guitar and brass section claims."
        },
        {
          text: "MJ: Synclavier synth bass doubled by Jerry Hey horn stabs; AAF: Palm-muted distorted electric guitars through high-gain tube amps",
          score: 1,
          summary: "Jackson's riff used Synclavier synth bass doubled by tight Jerry Hey horns, whereas Alien Ant Farm translated it to palm-muted distorted guitars."
        },
        {
          text: "MJ: Pipe organ in cathedral setting with 5s reverb; AAF: Fretless bass played with bow through digital pitch-shifter pedal",
          score: 0,
          summary: "Inaccurate instrument and processing descriptions."
        },
        {
          text: "Both arrangements utilized acoustic grand pianos playing octaves in unison with zero electronic or amplified accompaniment",
          score: 0,
          summary: "Incorrect assertion of acoustic grand piano unison."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Horns and synths delivered pristine high-tech funk punch; palm-muted high-gain guitars delivered visceral rock energy and crunch",
          score: 2,
          summary: "Tight horns and synths created clinical high-tech pop punch, while palm-muted guitars delivered visceral alt-rock energy."
        },
        {
          text: "Horn stabs made the pop song sound like a funeral march; palm-muted guitars were played softly to save amplifier tube life",
          score: 0,
          summary: "Absurd interpretations of horn and guitar intent."
        },
        {
          text: "Palm-muting removes all bass energy from electric guitars; horn doubling was done because synthesizers were illegal in 1987",
          score: 0,
          summary: "Historically and technically false claims."
        },
        {
          text: "Both arrangements create identical harmonic drive and spectral energy across the crucial 1kHz to 4kHz frequency spectrum",
          score: 0,
          summary: "Fails to compare harmonic drive and spectral energy."
        }
      ]
    }
  },
  {
    id: "q4_stereo",
    label: "Spatial Architecture: Acusonic Stereo Field vs Modern LCR Rock Wall",
    helperText: "Examine Bruce Swedien's Acusonic stereo pairs versus modern LCR quad-tracked rock panning.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "MJ: Bruce Swedien Acusonic Blumlein stereo pairs; AAF: Quad-tracked distorted guitars hard-panned 100% Left and 100% Right",
          score: 1,
          summary: "Swedien utilized Blumlein stereo microphone pairs for natural width, while Alien Ant Farm hard-panned quad-tracked guitars 100% L and R."
        },
        {
          text: "MJ: Mono sum mixed for AM transistor radio; AAF: Binaural spatial audio with rotating 360-degree algorithmic panning automation",
          score: 0,
          summary: "Inaccurate mono and 360-degree panning claims."
        },
        {
          text: "MJ: Quadraphonic matrix encoding for vinyl; AAF: Center-panned mono guitars with drums placed exclusively on the left channel",
          score: 0,
          summary: "Spurious quadraphonic and asymmetric panning assertions."
        },
        {
          text: "Both recordings placed all instruments at dead center with zero stereo width or artificial reverb in the stereo panorama",
          score: 0,
          summary: "Incorrect assertion of pure mono mixes."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Acusonic pairs provide natural 3D acoustic dimension; hard-panned rock guitars leave center clear for punchy vocal and drums",
          score: 2,
          summary: "Swedien's stereo pairs create lifelike acoustic dimension, whereas hard-panned guitars leave the center open for vocal and drum punch."
        },
        {
          text: "Stereo miking produces phase cancellation on all sound systems; hard-panning guitars confuses listeners wearing headphones",
          score: 0,
          summary: "Misrepresents well-engineered stereo techniques as flawed."
        },
        {
          text: "Hard panning was invented to save electricity; Blumlein stereo pairs were designed to hide studio background conversation",
          score: 0,
          summary: "Fictitious rationalizations."
        },
        {
          text: "Both spatial methods produce an identical sense of acoustic width, depth of field, and separation between musical elements",
          score: 0,
          summary: "Fails to compare acoustic width, depth, or separation."
        }
      ]
    }
  },
  {
    id: "q5_dynamics",
    label: "Dynamic Philosophy: Pure Uncompressed Transients vs Bus Compression",
    helperText: "Analyze Bruce Swedien's anti-compression philosophy versus modern commercial rock bus limiting.",
    ao3: {
      label: "Part A: Technical Identification (AO3 — 1 Mark)",
      points: 1,
      options: [
        {
          text: "MJ: Aggressive multi-band brickwall limiter (-6 LUFS); AAF: Zero compression or limiting on any individual track or master bus",
          score: 0,
          summary: "Inverted dynamic processing between pop and rock productions."
        },
        {
          text: "MJ: Uncompressed rhythm tracks and mix bus for transient punch; AAF: Heavy SSL bus compression and digital peak limiting for loudness",
          score: 1,
          summary: "Swedien avoided compressing rhythm tracks or the mix bus to preserve transient punch, while Alien Ant Farm utilized SSL bus compression and digital limiting."
        },
        {
          text: "MJ: Continuous noise gating on all master outputs; AAF: Downward expander reducing room reverb tails by 40dB between sections",
          score: 0,
          summary: "Inaccurate noise gate and expander assertions."
        },
        {
          text: "Both productions used identical optical compressors with slow attack and 20:1 ratios on every channel across the entire console",
          score: 0,
          summary: "Fictitious identical optical compressor claim."
        }
      ]
    },
    ao4: {
      label: "Part B: Contextual & Sonic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Uncompressed transients deliver explosive lifelike punch; modern bus compression glues heavy rock tracks for massive radio volume",
          score: 2,
          summary: "Uncompressed transients preserve explosive lifelike impact, while bus compression glues heavy guitars and drums for modern rock radio power."
        },
        {
          text: "Uncompressed audio sounds amateurish and weak; bus compression destroys all musicality and makes rock tracks unlistenable",
          score: 0,
          summary: "Extreme biased statements dismissing valid techniques."
        },
        {
          text: "Compressors were not invented until 1995; uncompressed audio was required by 1980s radio broadcast license legislation",
          score: 0,
          summary: "Historically false claims."
        },
        {
          text: "Both dynamic approaches generate identical crest factors, preserving identical microdynamic details and perceived volume levels",
          score: 0,
          summary: "Fails to compare crest factor, microdynamics, or volume."
        }
      ]
    }
  }
];

// Assign updated questions to Q5 tracks
q5.tracks[0].questions = q5Track1Questions;
q5.tracks[1].questions = q5Track2Questions;
q5.tracks[2].questions = q5Track3Questions;
console.log('Restructured all 3 tracks in worksheet-ao3-ao4-q5 into Two-Tier AO3/AO4 questions.');


// ==========================================
// Q6: EXTENDED EVALUATION (20 MARKS TOTAL)
// 3 Tracks x 5 Questions. Each Question: AO3 (2 marks) + AO4 (2 marks) = 4 marks
// ==========================================
const q6 = allItems.find(i => i.id === 'worksheet-ao3-ao4-q6');

// Track 1: Vocal Production Evolution
const q6Track1Questions = [
  {
    id: "q1_mics",
    label: "Microphone Technology: Vintage Ribbons to Large-Diaphragm Condensers",
    helperText: "Evaluate the evolution from 1950s ribbon capture to contemporary multi-pattern condenser technology.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "1950s: RCA 44BX figure-8 ribbon mics with natural high-frequency roll-off; Modern: Neumann U87 condensers with extended 20Hz-20kHz response",
          score: 2,
          summary: "Early capture utilized figure-8 ribbon mics (RCA 44BX) with smooth high roll-off, evolving to large-diaphragm condensers (Neumann U87) with wide bandwidth."
        },
        {
          text: "1950s: Modern USB dynamic microphones with digital DSP; Modern: Carbon-button telephone capsules running into 8-track cassette recorder",
          score: 0,
          summary: "Anachronistic and inaccurate microphone assertions."
        },
        {
          text: "1950s: Omnidirectional electret boundary mics on floor; Modern: Piezo crystal contact transducers attached directly to vocalist throat",
          score: 0,
          summary: "Inaccurate microphone transducer types."
        },
        {
          text: "Both eras utilized identical dynamic microphones with fixed cardioid pickup patterns and identical frequency response specifications",
          score: 0,
          summary: "Incorrect assertion of unchanging dynamic microphones."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Ribbons provided warm, forgiving intimacy for crooners; modern condensers deliver pristine, ultra-detailed high-end presence for pop",
          score: 2,
          summary: "Ribbons provided warm, flattering intimacy for crooners, whereas modern condensers provide ultra-bright, detailed presence for pop vocal dominance."
        },
        {
          text: "Ribbon mics were used because vintage singers had bad voices; modern condensers are used to make quiet singers sound like operatic tenors",
          score: 0,
          summary: "Derogatory and ungrounded claims."
        },
        {
          text: "Condensers introduce severe distortion that ruins pop vocals; ribbon mics are strictly prohibited in modern digital recording studios",
          score: 0,
          summary: "Factually incorrect claims regarding studio practice."
        },
        {
          text: "Microphone frequency response has zero audible effect on vocal timbre, sibilance, mix placement, or perceived closeness to the listener",
          score: 0,
          summary: "Fails to evaluate timbre, sibilance, or mix placement."
        }
      ]
    }
  },
  {
    id: "q2_dynamics",
    label: "Dynamic Control: Physical Performance Distance vs Multi-Stage Compression",
    helperText: "Analyze how dynamic control evolved from physical vocal technique to serial optical and VCA compression.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Historical: Digital lookahead limiters on analogue tape; Modern: Removing all compression to allow 30dB unconstrained volume swings",
          score: 0,
          summary: "Inverted historical dynamic control workflows."
        },
        {
          text: "Historical: Singer stepping back on loud notes to prevent overloading tape; Modern: Serial compression (1176 fast peak catch into LA-2A smooth leveling)",
          score: 2,
          summary: "Historical vocalists physically modulated distance to control dynamics, while modern chains use serial compression (1176 peak limiter into LA-2A optical leveling)."
        },
        {
          text: "Historical: Downward expanders on all vocal takes; Modern: Manual volume pedal manipulated with foot by vocal producer during takes",
          score: 0,
          summary: "Inaccurate expander and volume pedal assertions."
        },
        {
          text: "Both eras relied exclusively on hardware noise gates set to -40dB threshold with zero dynamic leveling or compression applied",
          score: 0,
          summary: "Incorrect assertion of noise gates as dynamic leveling."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Physical technique preserved natural acoustic room dynamics; serial compression pins modern vocals intimately on top of dense mixes",
          score: 2,
          summary: "Physical performance preserved natural organic dynamics, while modern serial compression ensures every whispered syllable cuts through dense productions."
        },
        {
          text: "Compressors were invented to make bad vocalists louder; physical microphone technique was an accident with zero artistic relevance",
          score: 0,
          summary: "Dismisses vocal production techniques as accidents."
        },
        {
          text: "Serial compression makes vocals inaudible in headphones; physical performance distance makes vintage vocal tracks unplayable on radio",
          score: 0,
          summary: "Inaccurate claims regarding audibility and radio playback."
        },
        {
          text: "Dynamic processing choices have zero influence on lyrical intelligibility, emotional intimacy, or competitive mix loudness",
          score: 0,
          summary: "Fails to evaluate intelligibility or mix loudness."
        }
      ]
    }
  },
  {
    id: "q3_pitch",
    label: "Pitch & Timing Correction: Flawless Performance vs Melodyne & Auto-Tune",
    helperText: "Evaluate the shift from single-take vocal authenticity to graphic pitch editing and creative tuning effects.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Pre-Digital: Real-time Auto-Tune hardware in 1960s; Modern: Bouncing vocal takes onto wax cylinders to eliminate pitch correction",
          score: 0,
          summary: "Anachronistic and absurd pitch correction claims."
        },
        {
          text: "Pre-Digital: Complete uncut vocal takes or manual tape comping; Modern: Celemony Melodyne note-level pitch, formant & timing manipulation",
          score: 2,
          summary: "Pre-digital tracking relied on full takes and razor-blade tape comping, evolving to Melodyne and Auto-Tune for surgical pitch and formant control."
        },
        {
          text: "Pre-Digital: Pitch shifting via Hammond organ drawbars; Modern: Fixed analogue pitch-shifter pedals operating only in quarter-tones",
          score: 0,
          summary: "Inaccurate pitch manipulation tools."
        },
        {
          text: "Both eras utilized identical automated software plugins that corrected vocal pitch within 2 milliseconds of audio capture",
          score: 0,
          summary: "Incorrect assertion of software plugins across all eras."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Early vocals celebrated unique human pitch nuances; modern tuning establishes hyper-perfect commercial polish or robotic genre timbres",
          score: 2,
          summary: "Early records valued raw emotional pitch imperfections, whereas modern tuning provides hyper-polished precision and iconic robotic pop aesthetics."
        },
        {
          text: "Auto-Tune was invented to destroy musicianship; uncorrected vintage vocals are universally out of tune and unpleasant to listen to",
          score: 0,
          summary: "Extreme biased assertions dismissing both eras."
        },
        {
          text: "Pitch correction reduces track file size in DAWs; uncorrected vocal tracks overload modern computer processors during playback",
          score: 0,
          summary: "Absurd claims linking pitch correction to file size."
        },
        {
          text: "Pitch correction technology has zero perceptible impact on artistic perception, vocal vulnerability, or genre expectations",
          score: 0,
          summary: "Fails to evaluate artistic vulnerability or genre expectations."
        }
      ]
    }
  },
  {
    id: "q4_layering",
    label: "Layering & Doubling: Physical Double Tracking vs Digital Vocal Stacking",
    helperText: "Analyze the transition from physical double tracking and Abbey Road ADT to massive DAW multi-track vocal stacks.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Analogue Era: Single vocal with zero doubling allowed; Digital Era: Physical tape loops running across 10 linked reel-to-reel decks",
          score: 0,
          summary: "Inaccurate doubling rules and workflows."
        },
        {
          text: "Analogue Era: Re-singing full takes or Ken Townsend ADT tape delay; Digital Era: 30+ track vocal stacks aligned with VocALign and pitch-shifted",
          score: 2,
          summary: "Analogue studios used manual double-tracking or tape ADT, evolving to massive DAW multi-tracking aligned with VocALign and micro-pitch plugins."
        },
        {
          text: "Analogue Era: Vocoder harmony generators in 1950s; Digital Era: Monophonic tracking with all harmonies sung by synthesized brass",
          score: 0,
          summary: "Inaccurate vocoder and harmony assertions."
        },
        {
          text: "Both eras strictly limited vocal arrangements to a single monophonic lead vocal track with zero doubling or harmony layers",
          score: 0,
          summary: "Incorrect assertion of monophonic vocal limits."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Analogue doubling created natural chorusing from human drift; modern stacking creates a crystalline, stadium-sized pop vocal wall",
          score: 2,
          summary: "Analogue doubling relied on organic micro-timing variations for chorusing, while modern stacking constructs colossal, phase-aligned pop vocal walls."
        },
        {
          text: "Vocal doubling was used to hide terrible singing; multi-track stacking was invented because modern microphones lack output gain",
          score: 0,
          summary: "Derogatory claims dismissing vocal production techniques."
        },
        {
          text: "Modern vocal stacks make tracks sound small and quiet; analogue ADT is forbidden under modern commercial radio broadcast rules",
          score: 0,
          summary: "False claims about track size and broadcast rules."
        },
        {
          text: "The number of vocal layers has zero audible impact on perceived stereo width, spectral thickness, or production scale",
          score: 0,
          summary: "Fails to evaluate stereo width, thickness, or scale."
        }
      ]
    }
  },
  {
    id: "q5_paradigm",
    label: "The Aesthetic Paradigm Shift: Organic Performance vs Constructed Product",
    helperText: "Synthesize the overarching transition from recording an authentic performance to constructing an idealized sonic artifact.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Early Era: Real-time room capture printed permanently to master; Modern Era: Non-destructive DAW editing, comping, tuning, and total recall",
          score: 2,
          summary: "Early vocal production captured an irreversible real-time performance to tape, while modern DAWs enable non-destructive comping, tuning, and total recall."
        },
        {
          text: "Early Era: Virtual synthesizers playing vocal samples; Modern Era: Direct-to-acetate disc cutting without electricity or consoles",
          score: 0,
          summary: "Inverted and fictitious technology timeline."
        },
        {
          text: "Early Era: 64-track digital multitracks in 1940s; Modern Era: Single-track mono magnetic tape with manual mechanical splicing",
          score: 0,
          summary: "Inaccurate multitrack channel allocations."
        },
        {
          text: "Both eras followed identical studio philosophies prioritizing live performance capture with zero post-recording interventions",
          score: 0,
          summary: "Incorrect claim of identical studio philosophies."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Historical focus was capturing emotional human truth; modern focus is engineering an immaculate, hyper-real commercial experience",
          score: 2,
          summary: "Early production prioritized documenting organic emotional truth, whereas contemporary production constructs an immaculate, hyper-real sonic ideal."
        },
        {
          text: "Modern music technology has completely ruined the art of singing; vintage recordings are technically superior in every measurable metric",
          score: 0,
          summary: "Overly sentimental and subjective anti-technology bias."
        },
        {
          text: "Early production was lazy due to primitive equipment; modern producers use technology because modern vocalists lack all musical talent",
          score: 0,
          summary: "Hostile and unprofessional commentary."
        },
        {
          text: "The transition from analogue to digital has caused zero perceptible evolution in consumer expectations, vocal aesthetics, or mix balance",
          score: 0,
          summary: "Fails to synthesize evolution in consumer expectations."
        }
      ]
    }
  }
];

// Track 2: Drum Production Evolution
const q6Track2Questions = [
  {
    id: "q1_capture",
    label: "Acoustic Capture: Room Bleed vs Multi-Miked Discrete Isolation",
    helperText: "Analyze the evolution from single-mic room capture to 16+ discrete microphone drum tracking setups.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "1960s: Minimal 3-mic setup (kick, overhead, snare) with room bleed; Modern: 16+ discrete close mics, sub-kick, top/bottom snare & stereo rooms",
          score: 2,
          summary: "1960s drum tracking utilized minimal miking with acoustic bleed, evolving to 16+ discrete close and ambient microphones for surgical control."
        },
        {
          text: "1960s: 32 digital USB microphones placed inside drum shells; Modern: Single telephone carbon microphone hung from ceiling in center of room",
          score: 0,
          summary: "Anachronistic and incorrect microphone setups."
        },
        {
          text: "1960s: Piezo contact pickups glued to cymbals; Modern: Drum recording done exclusively with acoustic laser distance sensors",
          score: 0,
          summary: "Fictitious transducer assertions."
        },
        {
          text: "Both eras utilized identical 8-channel microphone configurations with identical placement, gain staging, and acoustic baffling",
          score: 0,
          summary: "Incorrect claim of identical 8-channel configurations."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Minimal miking captured the physical room as an instrument; discrete miking provides total separation for modern surgical processing",
          score: 2,
          summary: "Minimal miking captured organic room bleed as a cohesive instrument, while discrete isolation allows surgical EQ, gating, and individual processing."
        },
        {
          text: "Acoustic bleed was an error that engineers tried to hide; discrete close-miking was invented to make drummers play more quietly",
          score: 0,
          summary: "Misinterprets acoustic bleed and close-miking intent."
        },
        {
          text: "Discrete miking ruins all drum punch; minimal miking makes kick drums sound identical to synthesizers on club sound systems",
          score: 0,
          summary: "Factually incorrect claims regarding punch and kick tone."
        },
        {
          text: "Microphone count and placement have zero audible effect on phase coherence, transient detail, kit balance, or spatial realism",
          score: 0,
          summary: "Fails to evaluate phase coherence or spatial realism."
        }
      ]
    }
  },
  {
    id: "q2_processing",
    label: "Ambience & Spatial Shaping: Natural Room Decay vs Gated Reverb & DSP",
    helperText: "Evaluate the shift from acoustic hall decay to 1980s gated reverb and modern convolution spatial design.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "1970s: Natural acoustics (Headley Grange stairwell); 1980s: AMS RMX16 / SSL gated reverb; Modern: Algorithmic & convolution impulse responses",
          score: 2,
          summary: "Spatial design evolved from physical room acoustics (Headley Grange) to 1980s non-linear gated reverb (AMS RMX16) and modern digital convolution DSP."
        },
        {
          text: "1970s: Digital plugin reverb on Atari ST; 1980s: Wax cylinder echo chambers; Modern: Removing all reverberant decay for complete anechoic audio",
          score: 0,
          summary: "Chronologically garbled reverb technology claims."
        },
        {
          text: "1970s: Guitar chorus pedals on kick drums; 1980s: Tape flangers on hi-hats; Modern: Vinyl scratch emulation on all drum tracks",
          score: 0,
          summary: "Inaccurate processing effects."
        },
        {
          text: "Both eras utilized identical EMT 140 analogue plate reverbs set to 2.5 second decay times on all drum channels",
          score: 0,
          summary: "Incorrect assertion of unchanging EMT plates."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Natural acoustics created organic majesty; gated reverb provided artificial explosive punch without cluttering dense 80s synth mixes",
          score: 2,
          summary: "Natural acoustics conveyed organic rock power, whereas gated reverb provided explosive snare punch without muddying 1980s electronic synth mixes."
        },
        {
          text: "Gated reverb was invented to cover bad drum heads; natural room acoustics were used because studios could not afford soundproofing",
          score: 0,
          summary: "Dismisses iconic studio acoustics and gating techniques."
        },
        {
          text: "Convolution reverb makes modern drums sound metallic and cheap; 1970s room acoustics make drum kits inaudible on stereo speakers",
          score: 0,
          summary: "Inaccurate and biased claims."
        },
        {
          text: "Reverberation choices have zero impact on rhythmic clarity, perceived acoustic scale, or genre identity across music history",
          score: 0,
          summary: "Fails to evaluate rhythmic clarity or genre identity."
        }
      ]
    }
  },
  {
    id: "q3_timing",
    label: "Timing & Quantisation: Organic Human Drag vs Grid-Locked Beat Detective",
    helperText: "Analyze the transition from human groove and tempo fluctuations to DAW slice quantisation.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Traditional: Continuous tempo variations & organic microtiming; Modern: Pro Tools Beat Detective slicing, quantising & crossfading to grid",
          score: 2,
          summary: "Traditional drumming relied on organic push-pull tempo variations, while modern productions utilize Beat Detective to snap audio transients to grid."
        },
        {
          text: "Traditional: Computer MIDI quantisation in 1960s; Modern: Banning all metronomes to force drummers to play with irregular tempo shifts",
          score: 0,
          summary: "Inverted timeline and false claims about modern click tracks."
        },
        {
          text: "Traditional: Electronic trigger pads on all drums; Modern: Drum tracks performed exclusively by drawing pencil notes in piano roll",
          score: 0,
          summary: "Inaccurate descriptions of traditional and modern workflows."
        },
        {
          text: "Both eras adhered to strict mathematical 16th-note click grids with zero microtiming variation or human tempo movement",
          score: 0,
          summary: "Incorrect assertion of rigid grids across all eras."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Human microtiming provides breathing emotional groove; grid quantization delivers surgical consistency demanded by modern dance & metal",
          score: 2,
          summary: "Human timing variations provide organic emotional breath, whereas strict grid alignment provides the relentless consistency required in modern genres."
        },
        {
          text: "Human timing drifts were mistakes caused by bad drummers; quantisation was invented because modern music is too fast for humans",
          score: 0,
          summary: "Disparages human musicianship and modern capabilities."
        },
        {
          text: "Quantised drums make songs sound completely devoid of rhythm; human timing variations prevent songs from ever being played on radio",
          score: 0,
          summary: "Extreme and factually baseless assertions."
        },
        {
          text: "Timing alignment choices have zero effect on rhythmic pocket, listener physical reaction, or genre-specific production expectations",
          score: 0,
          summary: "Fails to evaluate rhythmic pocket or genre expectations."
        }
      ]
    }
  },
  {
    id: "q4_augmentation",
    label: "Transient Augmentation: Pure Acoustic Impact vs Triggered Sample Replacement",
    helperText: "Evaluate the shift from pure acoustic transient capture to sample layering and replacement plugins.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Analogue Era: Dynamic mic transients shaped by tape saturation; Modern Era: Slate Trigger / Drumagog replacing or augmenting hits with samples",
          score: 2,
          summary: "Analogue drums relied on microphone placement and tape saturation, evolving to modern plugins (Slate Trigger/Drumagog) that augment hits with pre-processed samples."
        },
        {
          text: "Analogue Era: MIDI sample replacement on vinyl cutting lathes; Modern Era: Complete ban on all digital samplers and audio plugins",
          score: 0,
          summary: "Technologically impossible and false claims."
        },
        {
          text: "Analogue Era: Electronic laser triggers on vintage kits; Modern Era: Tracking drums exclusively through telephone carbon microphones",
          score: 0,
          summary: "Fictitious gear assertions."
        },
        {
          text: "Both eras relied 100% on untreated acoustic drum hits with zero dynamic processing, sample augmentation, or EQ shaping",
          score: 0,
          summary: "Incorrect assertion of zero processing."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Pure acoustic capture celebrates unrepeatable live timbre; sample augmentation guarantees identical, crushing transient impact on every hit",
          score: 2,
          summary: "Acoustic tracking captures unique organic timbre, while sample augmentation guarantees identical, hyper-consistent transient impact across every beat."
        },
        {
          text: "Sample replacement was invented because acoustic drums sound bad; tape saturation was an error that engineers tried to filter out",
          score: 0,
          summary: "Dismisses acoustic tone and tape saturation."
        },
        {
          text: "Sample augmentation makes drum kits inaudible in cars; acoustic capture makes modern rock tracks impossible to master for streaming",
          score: 0,
          summary: "False claims regarding playback systems."
        },
        {
          text: "Layering samples beneath acoustic drums has zero influence on low-end sub-bass punch, snare crack, or mix consistency",
          score: 0,
          summary: "Fails to evaluate low-end punch or mix consistency."
        }
      ]
    }
  },
  {
    id: "q5_evolution",
    label: "The Production Paradigm: Capturing a Performance vs Engineering a Product",
    helperText: "Synthesize the overarching transition in drum engineering methodology across the past 50 years.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Past: Documenting acoustic air vibrations in a room to tape; Present: Assembling a hybrid sonic architecture via DAW slicing, layering & limiting",
          score: 2,
          summary: "Drum production shifted from capturing physical acoustic vibrations to tape toward assembling hybrid sonic architectures through slicing, layering, and DSP limiting."
        },
        {
          text: "Past: Drawing drum hits on digital computer screens; Present: Cutting direct-to-disc 78rpm shellac records without mixing consoles",
          score: 0,
          summary: "Inverted chronological workflow claims."
        },
        {
          text: "Past: Synthesizing all drums on modular Moogs; Present: Banning all software instruments and computer editing tools",
          score: 0,
          summary: "Inaccurate synthesis and modern studio claims."
        },
        {
          text: "Both eras maintained an identical balance of 50% acoustic tracking and 50% digital sample replacement across all productions",
          score: 0,
          summary: "Incorrect claim of constant 50/50 balance."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Drum tracking evolved from capturing what a drummer played to constructing an idealized superhuman impact tailored for commercial playback",
          score: 2,
          summary: "Engineering shifted from documenting what a drummer performed in a room to constructing a hyper-real, superhuman sonic ideal optimized for commercial playback."
        },
        {
          text: "Modern drum production is entirely fake and worthless; vintage drum recordings are completely unlistenable on contemporary headphones",
          score: 0,
          summary: "Dogmatic and unscholarly anti-technology opinion."
        },
        {
          text: "Engineering drums was invented to replace bass players; modern drum sounds were designed to cause deliberate ear fatigue in listeners",
          score: 0,
          summary: "Absurd and untrue assertions."
        },
        {
          text: "The technological evolution of drum recording has produced zero change in modern mix balance, perceived power, or genre aesthetics",
          score: 0,
          summary: "Fails to synthesize impact on mix balance or genre aesthetics."
        }
      ]
    }
  }
];

// Track 3: The DAW Revolution
const q6Track3Questions = [
  {
    id: "q1_tracks",
    label: "Multitrack Constraints: 4-Track & 24-Track Tape vs Unlimited DAW Channels",
    helperText: "Analyze the impact of track limitations on workflow, submixing, and production decisions.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Analogue Era: 4-track and 24-track tape forcing permanent reduction bounces; Digital Era: 128+ virtual tracks with non-destructive routing",
          score: 2,
          summary: "Analogue tape forced permanent commitment through 4-track reduction bounces, whereas DAWs offer hundreds of non-destructive virtual audio channels."
        },
        {
          text: "Analogue Era: Unlimited virtual audio channels on cassette; Digital Era: Strict 4-track limits enforced by digital audio workstation software",
          score: 0,
          summary: "Inverted multitrack channel allocations."
        },
        {
          text: "Analogue Era: Recording directly to stereo vinyl lathes; Digital Era: Restricting all songs to a single monophonic channel in Pro Tools",
          score: 0,
          summary: "Inaccurate track counts on both formats."
        },
        {
          text: "Both eras operated with an identical limit of 24 tracks with identical commitment requirements and signal routing paths",
          score: 0,
          summary: "Incorrect assertion of identical 24-track limits."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Tape limits forced bold artistic commitment and organic balance; unlimited DAW tracks encourage endless layering and deferred decisions",
          score: 2,
          summary: "Analogue limits forced bold decision-making and performance commitment, while unlimited DAW channels allow complex layering but can defer critical choices."
        },
        {
          text: "Tape limits made vintage producers produce bad mixes; unlimited tracks make modern engineers incapable of making musical decisions",
          score: 0,
          summary: "Dismissive and overgeneralized accusations."
        },
        {
          text: "Unlimited tracks ruin computer soundcards; 4-track tape reduction bounces improved audio quality by adding tape hiss and wow",
          score: 0,
          summary: "Technically false assertions regarding audio quality."
        },
        {
          text: "Track count limitations have zero influence on arrangement density, mixing strategy, or production workflow across recording history",
          score: 0,
          summary: "Fails to evaluate arrangement density or mixing strategy."
        }
      ]
    }
  },
  {
    id: "q2_recall",
    label: "Mixing Environment & Total Recall: Analogue Consoles vs Instant In-The-Box Recall",
    helperText: "Evaluate the workflow shift from manual console documentation to instantaneous digital recall.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Hardware Console: Manual grease pencil fader marking and polaroid photos; DAW System: Instant project recall of all plugin parameters and automation",
          score: 2,
          summary: "Analogue desks required manual recall sheets and physical fader rides, whereas DAWs provide instant total recall of all plugins, automation, and routing."
        },
        {
          text: "Hardware Console: Instant cloud saving of physical knob positions; DAW System: Requiring manual hand-drawing of all digital plugin settings on paper",
          score: 0,
          summary: "Inverted recall workflows."
        },
        {
          text: "Hardware Console: Fixed motorized faders that locked permanently; DAW System: Forbidding any automated volume changes on audio channels",
          score: 0,
          summary: "Inaccurate hardware and DAW automation claims."
        },
        {
          text: "Both mixing environments utilized identical automated recall systems that restored all console settings within 5 milliseconds",
          score: 0,
          summary: "Incorrect claim of identical automated recall."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Manual recall demanded finality and instinct on the mixing desk; digital recall allows infinite micro-tweaking and client revisions",
          score: 2,
          summary: "Analogue mixing demanded trust in live studio instinct, while digital recall enables surgical micro-tweaking, remote client revisions, and infinite iteration."
        },
        {
          text: "Analogue mixing was fast because engineers did not care about sound; digital recall was invented to make recording sessions take 10 times longer",
          score: 0,
          summary: "Unsubstantiated negative commentary."
        },
        {
          text: "Total recall makes music sound digital and cold; manual fader markings caused massive audio distortion on analogue console outputs",
          score: 0,
          summary: "Absurd claims linking recall to distortion."
        },
        {
          text: "Recall workflows have zero influence on producer psychology, turnaround time, client collaboration, or commercial mix polish",
          score: 0,
          summary: "Fails to evaluate producer psychology or client collaboration."
        }
      ]
    }
  },
  {
    id: "q3_editing",
    label: "Signal Routing & Editing: Physical Tape Splicing vs Non-Destructive Digital Audio",
    helperText: "Contrast physical razor-blade tape editing with sample-accurate DAW audio manipulation.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Tape Era: Razor blades and splicing tape cutting physical magnetic tape at 45 degrees; DAW Era: Non-destructive slip/grid editing, crossfades & infinite undo",
          score: 2,
          summary: "Tape editing required destructive razor-blade splicing at 45-degree angles, while DAWs provide sample-accurate, non-destructive editing with infinite undo."
        },
        {
          text: "Tape Era: Real-time digital drag-and-drop on computer screens; DAW Era: Slicing computer hard drive disks with physical metal scissors",
          score: 0,
          summary: "Absurd and impossible technical descriptions."
        },
        {
          text: "Tape Era: Melting tape with soldering irons to join verses; DAW Era: Forbidding any audio cutting, splicing, or crossfading inside software",
          score: 0,
          summary: "Fictitious and incorrect editing methods."
        },
        {
          text: "Both eras relied on identical editing tools that allowed audio regions to be moved freely across tracks with zero physical manipulation",
          score: 0,
          summary: "Incorrect assertion of identical non-destructive tools."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Physical splicing made edits high-risk and rare; non-destructive DAW editing transformed audio into malleable plastic for flawless comping",
          score: 2,
          summary: "Physical tape editing carried immense risk of destroying master takes, whereas non-destructive DAW editing treats audio as infinitely malleable clay."
        },
        {
          text: "Tape splicing was done to destroy bad takes permanently; DAW editing was created because digital audio files cannot play without crossfades",
          score: 0,
          summary: "Misrepresents the function of splicing and crossfades."
        },
        {
          text: "Non-destructive editing removes all dynamics from music; physical tape slicing improves frequency response by sharpening the tape cut",
          score: 0,
          summary: "Technically false assertions regarding dynamics and frequency."
        },
        {
          text: "Editing workflows have zero effect on composite vocal takes, drum timing alignment, arrangement restructuring, or artistic risk-taking",
          score: 0,
          summary: "Fails to evaluate comping, timing alignment, or artistic risk."
        }
      ]
    }
  },
  {
    id: "q4_loudness",
    label: "The Loudness War: Dynamic Range & Crest Factor vs Brickwall Peak Limiting",
    helperText: "Analyze the competitive volume race of the CD era and the subsequent streaming normalization response.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Analogue Vinyl: Preservation of dynamic peaks (>14dB crest factor); 1990s-2000s CD: Digital brickwall limiters (Waves L2) driving mixes to -6 LUFS",
          score: 2,
          summary: "Analogue vinyl required healthy crest factors (>14dB) to prevent needle skipping, whereas late-90s digital mastering pushed limiters (Waves L2) to -6 LUFS."
        },
        {
          text: "Analogue Vinyl: Severe digital clipping at -2 LUFS; 1990s-2000s CD: Mandatory uncompressed dynamic range of at least 35dB on all releases",
          score: 0,
          summary: "Inverted dynamic standards between vinyl and CD."
        },
        {
          text: "Analogue Vinyl: Noise gates on every frequency band; 1990s-2000s CD: Complete prohibition of dynamic limiters or compressors in mastering",
          score: 0,
          summary: "Inaccurate regulatory and processing assertions."
        },
        {
          text: "Both mastering mediums enforced identical peak-to-average volume ratios with zero difference in RMS level or crest factor",
          score: 0,
          summary: "Incorrect claim of identical volume ratios."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Competitive volume race crushed transient punch and caused listener fatigue; streaming normalization (-14 LUFS) restored dynamic headroom",
          score: 2,
          summary: "The Loudness War sacrificed transient punch and caused ear fatigue, but modern streaming normalization (-14 LUFS) has restored the value of dynamic range."
        },
        {
          text: "The Loudness War made music sound ten times better to consumers; dynamic headroom makes modern recordings inaudible on smartphone speakers",
          score: 0,
          summary: "Unsubstantiated pro-clipping opinion."
        },
        {
          text: "Brickwall limiting was invented to prevent piracy; streaming loudness normalization was created by vinyl record companies to destroy CDs",
          score: 0,
          summary: "Absurd conspiracy claims."
        },
        {
          text: "Mastering loudness has zero impact on perceived punch, snare impact, listener ear fatigue, or competitive commercial radio standing",
          score: 0,
          summary: "Fails to evaluate snare impact, fatigue, or radio standing."
        }
      ]
    }
  },
  {
    id: "q5_synthesis",
    label: "Modern Hybrid Workflow: In-The-Box Precision with Analogue Saturation",
    helperText: "Synthesize how contemporary producers combine DAW surgical control with analog character.",
    ao3: {
      label: "Part A: Technical Technique & Equipment (AO3 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Contemporary Workflow: In-the-box (ITB) DAW editing & surgical digital EQ paired with analogue summing, outboard gear or component modeling plugins",
          score: 2,
          summary: "Modern hybrid production marries digital DAW surgical precision and automation with analogue summing and component-modeled saturation plugins."
        },
        {
          text: "Contemporary Workflow: Completely abandoning computers to record strictly onto wax phonograph cylinders without electricity",
          score: 0,
          summary: "Absurd claim regarding phonograph cylinders."
        },
        {
          text: "Contemporary Workflow: Banning all analogue gear and forcing all audio signals to be processed exclusively through 8-bit guitar pedals",
          score: 0,
          summary: "Inaccurate pedal assertions."
        },
        {
          text: "Contemporary Workflow: Using 100% vintage tape machines with zero digital equipment or computers at any stage of production",
          score: 0,
          summary: "Incorrect assertion of zero digital gear in modern workflows."
        }
      ]
    },
    ao4: {
      label: "Part B: Technological Impact & Aesthetic Evaluation (AO4 — 2 Marks)",
      points: 2,
      options: [
        {
          text: "Producers enjoy total recall, surgical correction and infinite tracks while injecting musical harmonic saturation and analogue warmth",
          score: 2,
          summary: "Contemporary producers harness the best of both worlds: infinite tracks and surgical digital precision combined with analogue harmonic warmth."
        },
        {
          text: "Hybrid mixing is done because producers cannot decide between formats; analogue summing is used to hide digital distortion in mixes",
          score: 0,
          summary: "Dismissive and technically incorrect commentary."
        },
        {
          text: "Analogue warmth makes music sound slow and muddy; in-the-box digital mixing makes audio impossible to play on club sound systems",
          score: 0,
          summary: "False claims regarding playback."
        },
        {
          text: "The combination of digital precision and analogue warmth has produced zero audible refinement in contemporary audio engineering standards",
          score: 0,
          summary: "Fails to synthesize the refinement of contemporary standards."
        }
      ]
    }
  }
];

// Assign updated questions to Q6 tracks
q6.tracks[0].questions = q6Track1Questions;
q6.tracks[1].questions = q6Track2Questions;
q6.tracks[2].questions = q6Track3Questions;
console.log('Restructured all 3 tracks in worksheet-ao3-ao4-q6 into Two-Tier AO3/AO4 questions.');

fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2));
console.log('course_data.json updated with balanced two-tier questions successfully.');
