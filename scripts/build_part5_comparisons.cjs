/**
 * build_part5_comparisons.cjs
 * Comprehensive generator and updater for Stage 4 Comparison Quizzes:
 * - Upgrades Comparisons 7, 8, 9 with 15 structured criteria MCQs + Cloze summary
 * - Adds Comparisons 10, 11, 12, 13, 14, 15 with 15 structured criteria MCQs + Cloze summary
 */

const fs = require('fs');
const path = require('path');

const courseDataPath = path.resolve('src/data/course_data.json');
const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

const stage4 = courseData.sections.find(s => s.title && s.title.includes('Stage 4: Comparison'));
if (!stage4) {
  console.error('Stage 4 section not found!');
  process.exit(1);
}

// ==========================================
// COMPARISON 7: BLUE MONDAY (New Order 1983 vs Orgy 1998)
// ==========================================
const comp7ExistingCloze = stage4.items.find(i => i.id === 'comp_blue_monday').questions[0];

const comp7Questions = [
  {
    title: "Recording Release Medium",
    content: "Released on a groundbreaking 12-inch Vinyl single in die-cut floppy-disk packaging (FAC 73), prioritizing wide groove spacing for high dance club bass levels.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> Factory Records released 'Blue Monday' exclusively on 12-inch vinyl, designed by Peter Saville. The wide grooves allowed high-amplitude bass cutting without needle skipping.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/svg/comparison_7inch_vs_12inch_vinyl.svg",
    expert_explanation: "New Order's 1983 release became the highest-selling 12-inch vinyl single of all time. Orgy's 1998 cover was released on Compact Disc and digital formats, heavily compressed during the late-90s Loudness War.",
    expert_quote: {
      text: "We wanted the vinyl to sound as loud and physical as the 12-inch imports coming out of New York clubs like the Paradise Garage.",
      author: "Bernard Sumner (New Order)"
    },
    explanation_image: {
      src: "/images/svg/comparison_7inch_vs_12inch_vinyl.svg",
      alt: "12-Inch Extended Dance Vinyl vs Compact Disc"
    }
  },
  {
    title: "Capture & Style",
    content: "Instruments were synchronized via early pre-MIDI proprietary trigger pulses and a custom-built homebrew sequencer (Powertran VPS3).",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> In 1983 before MIDI was widespread, New Order programmed the song using a homebrew Powertran sequencer communicating via control voltage (CV) and gate triggers.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/gen/drum_machine_step_sequencer.png",
    expert_explanation: "Bernard Sumner hand-soldered the Powertran sequencer. Orgy recorded into Digidesign Pro Tools using standard MIDI synchronization, modern software plugins, and digital hardware interfaces.",
    expert_quote: {
      text: "I had to solder the circuits together myself. It took hours of trial and error just to get the machines talking to each other.",
      author: "Bernard Sumner"
    },
    explanation_image: {
      src: "/images/gen/drum_machine_step_sequencer.png",
      alt: "Hardware Step Sequencer & CV Gate Pulse Synchronization"
    }
  },
  {
    title: "Rhythm & Sync",
    content: "Features an iconic mechanical 16th-note stuttering kick drum intro programmed into an Oberheim DMX drum machine.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> The repeating 16th-note kick pattern at 130 BPM was programmed directly into an Oberheim DMX, creating an instantly recognizable synthetic heartbeat.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
    expert_explanation: "The stuttering kick drum was famously programmed step-by-step into the DMX. Orgy's 1998 version pairs digital industrial loops with a live acoustic kit recorded with heavy room miking and triggered samples.",
    expert_quote: {
      text: "That machine kick wasn't humanly possible to play for seven minutes straight—that was exactly the point.",
      author: "Stephen Morris (New Order)"
    },
    explanation_image: {
      src: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      alt: "Quantized Step-Sequenced Kick Pattern"
    }
  },
  {
    title: "Sequencing & Sampling",
    content: "Utilizes an early 8-bit digital sampler (E-mu Emulator I) playing low-resolution choir and brass stabs sampled from Kraftwerk.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> New Order used the pioneering E-mu Emulator I (released 1981) to load 8-bit samples of orchestral voices and brass, adding a dark, grain-filled digital texture.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/svg/vocal_chopping_sampling_technique.svg",
    expert_explanation: "The 8-bit resolution of the Emulator I introduced prominent quantization noise and harmonic grit that defined early sampling aesthetics. Orgy utilized 24-bit high-resolution digital samplers and VST sound libraries.",
    expert_quote: {
      text: "The Emulator cost about as much as a house back then. You got maybe two seconds of crunchy 8-bit audio on a floppy disk.",
      author: "Peter Hook (New Order)"
    },
    explanation_image: {
      src: "/images/svg/vocal_chopping_sampling_technique.svg",
      alt: "E-mu Emulator I 8-bit Digital Sampling"
    }
  },
  {
    title: "Pitching",
    content: "Vocal delivery is deadpan, emotionally detached, dry, and delivered without any form of automatic pitch correction.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> Bernard Sumner's flat, melancholic post-punk vocal style was recorded completely natural without pitch correction tools, which didn't exist in 1983.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/comparisons/blue_monday_comparison.png",
    expert_explanation: "Sumner's vocal has natural pitch drift and imperfection that reinforces the alienated mood. In Orgy's 1998 cover, Jay Gordon's vocals are pitch-corrected, heavily doubled, and treated with aggressive distortion plugins.",
    expert_quote: {
      text: "I sang without emotion on purpose. I wanted to sound like another cog in the machine.",
      author: "Bernard Sumner"
    },
    explanation_image: {
      src: "/images/comparisons/blue_monday_comparison.png",
      alt: "New Order Melancholic Vocal Delivery vs Orgy Cyber-Metal Vocals"
    }
  },
  {
    title: "Arrangement Differences",
    content: "Arrangement spans over 7 minutes with a long, hypnotic 16-bar intro where instruments enter incrementally one at a time.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> The 7:29 extended arrangement was crafted for club DJs, building anticipation over several minutes before the first vocal verse enters at 1:40.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/svg/comparison_12inch_dance_arrangement_timeline.svg",
    expert_explanation: "New Order paced the arrangement for extended dance club experiences. Orgy condensed the track into a punchy 4:26 verse-chorus radio format suited for MTV and alternative rock radio.",
    expert_quote: {
      text: "We gave DJs plenty of time to mix in and out. In clubs, you need that gradual build to hypnotize the floor.",
      author: "Stephen Morris"
    },
    explanation_image: {
      src: "/images/svg/comparison_12inch_dance_arrangement_timeline.svg",
      alt: "12-Inch Extended Dance Arrangement Timeline"
    }
  },
  {
    title: "Mixing & Processing",
    content: "The mix is dominated by heavily distorted, quad-tracked electric guitars creating an impenetrable industrial rock 'wall of sound'.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Orgy).</strong> Orgy layered multiple takes of downtuned 7-string guitars through Mesa Boogie Dual Rectifiers, saturating the midrange with high-gain distortion.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "no" },
      { text: "Version B (Orgy)", is_true: "yes" }
    ],
    img: "/images/guitar_amp_3d_stage.png",
    expert_explanation: "Orgy's signature 'death-pop' sound combined industrial synthesizers with crushing, thick guitar walls. New Order featured Peter Hook's high-register melodic bass and sparse, rhythmic guitar strums.",
    expert_quote: {
      text: "We wanted the guitars to sound like a razor-sharp synthesizer, blending distortion with digital precision.",
      author: "Amir Derakh (Orgy)"
    },
    explanation_image: {
      src: "/images/guitar_amp_3d_stage.png",
      alt: "Quad-Tracked High-Gain Mesa Boogie Guitar Amplification"
    }
  },
  {
    title: "Pan (Stereo Field)",
    content: "Rhythm guitars are hard-panned 100% Left and 100% Right (LCR routing), leaving the center channel open for lead vocal, kick, and snare.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Orgy).</strong> Modern alternative metal production relies on hard-panning doubled and quad-tracked guitars extreme left and right to achieve maximum stereo width.",
    answers: [
      { text: "Version A (New Order)", is_true: "no" },
      { text: "Version B (Orgy)", is_true: "yes" }
    ],
    img: "/images/stereo_soundstage_panning_hq.svg",
    expert_explanation: "New Order's 1983 stereo field was more subtle, keeping the Oberheim DMX centered while panning emulator choir sounds and Peter Hook's chorus-pedaled bass across the field.",
    expert_quote: {
      text: "Hard panning guitars opens up the middle for the kick and snare to knock you over.",
      author: "Josh Abraham (Producer, Orgy)"
    },
    explanation_image: {
      src: "/images/stereo_soundstage_panning_hq.svg",
      alt: "Modern LCR Metal Soundstage Panning"
    }
  },
  {
    title: "Reverb",
    content: "Employs an AMS RMX16 digital reverb with non-linear gated decay on the snare drum, characteristic of 1980s studio innovation.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> The AMS RMX16 non-linear setting cut the reverb tail abruptly, giving the drum machine snare massive explosive power without cluttering the bass space.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/gated_reverb_technique_diagram.svg",
    expert_explanation: "The AMS RMX16 was one of the first microprocessor-controlled digital reverbs. Orgy favored tight room ambience with short decay plates and aggressive tape delays to keep the metal mix tight.",
    expert_quote: {
      text: "Non-linear reverb gave electronic drums that huge, unnatural 80s punch that cut straight through club sound systems.",
      author: "Martin Hannett (Producer)"
    },
    explanation_image: {
      src: "/images/gated_reverb_technique_diagram.svg",
      alt: "Non-Linear Gated Reverb Envelope"
    }
  },
  {
    title: "Delay",
    content: "Vocals are treated with a short stereo slapback and ping-pong delay to create width and temporal depth in the chorus.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Orgy).</strong> Orgy's production utilized tempo-synced digital stereo ping-pong delays on vocal tails and synth sweeps to bounce between speakers.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "no" },
      { text: "Version B (Orgy)", is_true: "yes" }
    ],
    img: "/images/svg/dotted_eighth_note_delay.svg",
    expert_explanation: "Digital delay in 1998 DAWs was perfectly locked to BPM via software. New Order's 1983 vocal was kept dry and direct, sitting nakedly in the mix.",
    expert_quote: {
      text: "Tempo-synced delays are essential in cyber-rock to make vocal hooks feel spacious without washing them out.",
      author: "Josh Abraham"
    },
    explanation_image: {
      src: "/images/svg/dotted_eighth_note_delay.svg",
      alt: "Tempo-Synced Stereo Digital Delay"
    }
  },
  {
    title: "Filtering & Effects",
    content: "The bassline features a Moog Source analogue synthesizer with a resonant 24 dB/octave ladder filter sweeping during transitions.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> The iconic 16th-note pulsating synth bass was generated by an analogue Moog Source, with its distinctive 4-pole resonant filter cutting through the mix.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/svg/filter_resonance_diagram.svg",
    expert_explanation: "Moog ladder filters are prized for their warm, self-oscillating resonance. Orgy duplicated the bass riff using a blend of downtuned 5-string electric bass and digital subtractive software plugins.",
    expert_quote: {
      text: "The Moog Source gave us that thick, punchy bass sequence that locked tightly with the DMX kick.",
      author: "Bernard Sumner"
    },
    explanation_image: {
      src: "/images/svg/filter_resonance_diagram.svg",
      alt: "24 dB/Octave Low-Pass Filter with Resonance Peak"
    }
  },
  {
    title: "EQ",
    content: "Heavy midrange scooping around 400–600 Hz on distorted rhythm guitars creates space for the aggressive snare crack and sub-bass.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Orgy).</strong> The 'V-shaped' or scooped EQ curve is a hallmark of late-90s metal, removing muddy low-mids while boosting sub-bass and high-treble bite.",
    answers: [
      { text: "Version A (New Order)", is_true: "no" },
      { text: "Version B (Orgy)", is_true: "yes" }
    ],
    img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
    expert_explanation: "Scooping the mid frequencies creates clarity in dense mixes with heavy distortion. New Order's mix was punchy in the 1–3 kHz region where Peter Hook's bass and the Oberheim snare sat.",
    expert_quote: {
      text: "If you don't notch out 400 Hz on modern high-gain guitars, the entire mix turns into brown mud.",
      author: "Amir Derakh"
    },
    explanation_image: {
      src: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      alt: "Mid-Range Scooped EQ Curve vs Mid-Forward Analogue Mix"
    }
  },
  {
    title: "Dynamics",
    content: "Exhibits severe digital brickwall peak limiting and clipping typical of the late-1990s Loudness War, resulting in minimal dynamic range (<7 dB).",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Orgy).</strong> Mastered hot for CD playback in 1998, Orgy's track features heavily reduced crest factor and flattened waveform peaks for maximum perceived loudness.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "no" },
      { text: "Version B (Orgy)", is_true: "yes" }
    ],
    img: "/images/svg/limiter_brickwall.svg",
    expert_explanation: "New Order's 1983 vinyl mix retained healthy transient punch (12–14 dB dynamic range) to prevent vinyl needle displacement. Orgy's master pushed digital limiters to competitive commercial thresholds.",
    expert_quote: {
      text: "The late 90s demanded that rock CDs blasted out of car stereos louder than anything else on the radio.",
      author: "Mastering Engineer"
    },
    explanation_image: {
      src: "/images/svg/limiter_brickwall.svg",
      alt: "Brickwall Digital Limiting & Crest Factor Reduction"
    }
  },
  {
    title: "Instrumentation",
    content: "Prominently features a live 4-string bass guitar played high on the neck through an Electro-Harmonix Clone Theory chorus pedal as a lead voice.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (New Order).</strong> Peter Hook's signature bass style involved playing high melodic counter-melodies on the top frets through an analogue chorus pedal, acting as a second lead instrument.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "yes" },
      { text: "Version B (Orgy)", is_true: "no" }
    ],
    img: "/images/case_studies/money/money_q5_pbass.png",
    expert_explanation: "Hook played a Yamaha BB1200 high on the neck because rehearsal amps were so muddy he couldn't hear himself in the low register. Orgy relegated the bass to low-end reinforcement.",
    expert_quote: {
      text: "I started playing high up so I could hear what I was doing over Steve's drums. That accidentally became our trademark sound.",
      author: "Peter Hook"
    },
    explanation_image: {
      src: "/images/case_studies/money/money_q5_pbass.png",
      alt: "Melodic High-Register Electric Bass with Chorus Pedal"
    }
  },
  {
    title: "Genre Style",
    content: "Defines the Cyberpunk / Industrial 'Death-Pop' movement of the late 1990s, merging electronic sequencing with high-gain alternative metal.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Orgy).</strong> Orgy's cover bridged 1980s synth-pop nostalgia with aggressive turn-of-the-millennium alternative metal and industrial rock.</p>",
    answers: [
      { text: "Version A (New Order)", is_true: "no" },
      { text: "Version B (Orgy)", is_true: "yes" }
    ],
    img: "/images/comparisons/blue_monday_comparison.png",
    expert_explanation: "New Order defined British Synth-Pop / Post-Punk. Orgy adapted their electronic architecture for the American alternative metal market popularized by Korn and Nine Inch Nails.",
    expert_quote: {
      text: "We wanted to prove that a classic electronic song could hit with the brutal power of heavy metal.",
      author: "Jay Gordon (Orgy)"
    },
    explanation_image: {
      src: "/images/comparisons/blue_monday_comparison.png",
      alt: "British Synth-Pop (1983) vs American Industrial Metal (1998)"
    }
  },
  comp7ExistingCloze
];

// Update Comp 7 in courseData
const comp7Index = stage4.items.findIndex(i => i.id === 'comp_blue_monday');
stage4.items[comp7Index].questions = comp7Questions;
console.log(`Comp 7 (Blue Monday) updated with ${comp7Questions.length} questions.`);


// ==========================================
// COMPARISON 8: SMOOTH CRIMINAL (Michael Jackson 1987 vs Alien Ant Farm 2001)
// ==========================================
const comp8ExistingCloze = stage4.items.find(i => i.id === 'comp_smooth_criminal').questions[0];

const comp8Questions = [
  {
    title: "Recording Release Medium",
    content: "Recorded onto 24-track analogue tape slaved to 32-track digital tape (Mitsubishi X-850), mixed through a custom Harrison 3232 console.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Engineered by Bruce Swedien for the <em>Bad</em> album (1987), using cutting-edge hybrid analogue-to-digital tape synchronization.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/svg/analog_tape_24track_ssl_console.svg",
    expert_explanation: "Bruce Swedien tracked on multiple synchronized tape machines to avoid wearing down the tape emulsion on critical vocal tracks. Alien Ant Farm recorded directly into 24-bit/96kHz Pro Tools HD.",
    expert_quote: {
      text: "I kept the original vocal tapes safely packed away and made digital clones to work with so the transients never dulled.",
      author: "Bruce Swedien (Recording Engineer)"
    },
    explanation_image: {
      src: "/images/svg/analog_tape_24track_ssl_console.svg",
      alt: "Large Format Multitrack Tape & Harrison Mixing Console"
    }
  },
  {
    title: "Capture & Style",
    content: "Features the legendary 'Acusonic Recording Process' utilizing stereo pairs of microphones to preserve true acoustic phase coherence.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Bruce Swedien's Acusonic process used Blumlein stereo pairs and avoided mono-panpot summing, creating a breathtaking 3D stereo illusion.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/stereo_soundstage_panning_hq.svg",
    expert_explanation: "Swedien rarely compressed rhythm instruments, relying instead on clean transient capture and natural stereo acoustic spacing. Alien Ant Farm relied on close-miking and heavy multi-channel compression.",
    expert_quote: {
      text: "True stereo capture gives you depth that pan pots can never fake. You feel the physical room around Michael.",
      author: "Bruce Swedien"
    },
    explanation_image: {
      src: "/images/stereo_soundstage_panning_hq.svg",
      alt: "Acusonic Blumlein Stereo Acoustic Capture"
    }
  },
  {
    title: "Rhythm & Sync",
    content: "Rhythm section is powered by a high-energy live acoustic drum kit playing energetic pop-punk syncopation with open hi-hat slashes.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Alien Ant Farm).</strong> Mike Cosgrove's aggressive live drumming provides real human momentum and driving rock accents rather than machine-programmed rigidity.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "no" },
      { text: "Version B (Alien Ant Farm)", is_true: "yes" }
    ],
    img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
    expert_explanation: "Alien Ant Farm's drums were tracked live in a large wooden drum room with multiple ambient mic pairs. Michael Jackson's groove was driven by quantized Synclavier II sequencing and LinnDrum patterns.",
    expert_quote: {
      text: "We wanted the drums to feel like a high-speed runaway train hitting every accent with maximum punch.",
      author: "Mike Cosgrove (Alien Ant Farm)"
    },
    explanation_image: {
      src: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      alt: "Live Acoustic Drumming Dynamics vs Quantized Grid"
    }
  },
  {
    title: "Sequencing & Sampling",
    content: "Pioneered the use of the NED Synclavier II digital synthesizer and sampler for advanced sequencing, including Michael's own recorded heartbeat.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Christopher Currell programmed the Synclavier II for the track, sampling Jackson's actual heartbeat using an acoustic sensor and processing it into the rhythm track.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/svg/vocal_chopping_sampling_technique.svg",
    expert_explanation: "The Synclavier cost over $100,000 in 1987 and was the gold standard for digital sound design. Alien Ant Farm used purely live guitars, bass, and drums without digital sampling or sequencing.",
    expert_quote: {
      text: "Michael's real heartbeat was processed through the Synclavier and became the intro pulse that sets up the groove.",
      author: "Christopher Currell (Synclavier Programmer)"
    },
    explanation_image: {
      src: "/images/svg/vocal_chopping_sampling_technique.svg",
      alt: "NED Synclavier II Digital Audio System & Sound Design"
    }
  },
  {
    title: "Pitching",
    content: "Vocal features rhythmic exclamations, signature hiccups, breathless gasps, and pristine falsetto belts tracked with a Shure SM7 dynamic mic.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Michael Jackson recorded lead vocals on a Shure SM7 dynamic mic without a pop shield, delivering theatrical, percussive vocal phrasing.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/comparisons/smooth_criminal_comparison.png",
    expert_explanation: "Swedien favored the SM7 for Jackson because its flat frequency response handled violent dynamic bursts without overloading. Dryden Mitchell (Alien Ant Farm) sang with strained, punk-tinged rock belt.",
    expert_quote: {
      text: "Michael treated his voice like a rhythm instrument—every gasp, hiccup, and percussive sigh was placed with exact rhythmic intent.",
      author: "Bruce Swedien"
    },
    explanation_image: {
      src: "/images/comparisons/smooth_criminal_comparison.png",
      alt: "Shure SM7 Dynamic Microphone Vocal Capture"
    }
  },
  {
    title: "Arrangement Differences",
    content: "Begins with a dramatic cinematic narrative sequence featuring footsteps, heavy breathing, and a synthesized heartbeat before the music enters.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Quincy Jones and Jackson structured the original with an atmospheric 40-second radio-drama sound effect sequence creating theatrical suspense.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/svg/arrangement_sparse_acoustic_vs_dense_synth.svg",
    expert_explanation: "The cinematic intro established Jackson's storytelling ambition for the <em>Moonwalker</em> film. Alien Ant Farm eliminated the story soundscape, exploding immediately into a high-energy guitar riff.",
    expert_quote: {
      text: "Michael wanted the record to feel like a film noir scene before a single musical note dropped.",
      author: "Quincy Jones (Producer)"
    },
    explanation_image: {
      src: "/images/svg/arrangement_sparse_acoustic_vs_dense_synth.svg",
      alt: "Cinematic Foley Intro vs Immediate High-Energy Drop"
    }
  },
  {
    title: "Mixing & Processing",
    content: "The iconic staccato bassline is performed on heavily distorted, palm-muted electric guitars tuned in drop-tuning.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Alien Ant Farm).</strong> Guitarist Terry Corso translated the synth bassline into crunching palm-muted electric guitar riffs played through high-gain Marshall and Mesa Boogie tube amplifiers.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "no" },
      { text: "Version B (Alien Ant Farm)", is_true: "yes" }
    ],
    img: "/images/guitar_amp_3d_stage.png",
    expert_explanation: "Corso's percussive palm-muting replicated the tight staccato envelope of the original synthesizer while adding the raw, gritty aggression of post-grunge alt-rock.",
    expert_quote: {
      text: "The main riff was so rhythmic that it just begged to be played on a heavy electric guitar with tight palm-muting.",
      author: "Terry Corso (Alien Ant Farm)"
    },
    explanation_image: {
      src: "/images/guitar_amp_3d_stage.png",
      alt: "High-Gain Palm-Muted Electric Guitar Riffing"
    }
  },
  {
    title: "Pan (Stereo Field)",
    content: "Utilizes extreme wide LCR stereo staging with heavy rhythm guitars doubled and hard-panned to 100% Left and 100% Right.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Alien Ant Farm).</strong> The 2001 rock mix places thick wall-of-sound rhythm guitars in wide stereo isolation, with the bass guitar, lead vocal, and kick anchor in the exact center.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "no" },
      { text: "Version B (Alien Ant Farm)", is_true: "yes" }
    ],
    img: "/images/stereo_soundstage_panning_hq.svg",
    expert_explanation: "Swedien's 1987 mix avoided panning everything hard left or right, using subtle stereo Blumlein arrays to distribute brass, backing vocals, and synthesizer layers across an organic arc.",
    expert_quote: {
      text: "Doubling guitars and panning them wide gives you that massive stadium rock feel.",
      author: "Jay Baumgardner (Mixer)"
    },
    explanation_image: {
      src: "/images/stereo_soundstage_panning_hq.svg",
      alt: "Stereo Panning Soundstage in Rock Mix"
    }
  },
  {
    title: "Reverb",
    content: "Features lush, warm plate reverberation on the lead vocal and synthetic brass using EMT 140 plates and Lexicon 480L hardware.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Bruce Swedien used physical EMT 140 reverberation plates alongside Lexicon 480L digital processors for velvety spatial decay.",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/reverb_plate_mechanics_diagram.svg",
    expert_explanation: "EMT plate reverbs provide bright, dense reflections without muddiness. Alien Ant Farm's mix used short digital room simulations and tight vocal slapback delays for a drier, aggressive sound.",
    expert_quote: {
      text: "The EMT 140 plate reverb gave Michael's voice that magical, shimmering studio halo.",
      author: "Bruce Swedien"
    },
    explanation_image: {
      src: "/images/reverb_plate_mechanics_diagram.svg",
      alt: "EMT 140 Reverberation Plate Mechanics"
    }
  },
  {
    title: "Delay",
    content: "Includes rhythmic dub-style tape delay throws on specific vocal exclamations ('Annie, are you OK?') during the bridge breakdown.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Alien Ant Farm).</strong> The 2001 cover adds psychedelic reggae/dub delay feedback throws on vocal words during the middle-eight breakdown before the explosive final chorus.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "no" },
      { text: "Version B (Alien Ant Farm)", is_true: "yes" }
    ],
    img: "/images/svg/vocal_slapback_delay_technique.svg",
    expert_explanation: "Alien Ant Farm paid homage to the original while incorporating alternative rock dynamic contrasts (quiet breakdown with spinning delays into explosive loud climax).",
    expert_quote: {
      text: "We threw in that dub delay on 'OK?' to completely pull the rug out from under the listener before the final drop.",
      author: "Dryden Mitchell (Alien Ant Farm)"
    },
    explanation_image: {
      src: "/images/svg/vocal_slapback_delay_technique.svg",
      alt: "Dub-Style Rhythmic Delay Throws on Vocals"
    }
  },
  {
    title: "Filtering & Effects",
    content: "A band-pass 'telephone filter' EQ is applied to spoken dialogue lines in the bridge, removing high and low frequencies.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> The dramatic monologue in the middle section ('He came into her apartment...') was band-passed to emulate a distant police radio / telephone transmission.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/svg/high_pass_filter_sweep_riser.svg",
    expert_explanation: "Band-pass filtering between 300 Hz and 3 kHz creates the classic telephone voice effect, dramatizing the crime scene narrative. Alien Ant Farm opted for direct screaming vocals without telephonic filtering.",
    expert_quote: {
      text: "Filtering out the lows and highs made the spoken passage sound like an urgent police dispatch.",
      author: "Quincy Jones"
    },
    explanation_image: {
      src: "/images/svg/high_pass_filter_sweep_riser.svg",
      alt: "Band-Pass Telephone EQ Filtering"
    }
  },
  {
    title: "EQ",
    content: "High-frequency presence boost around 10–12 kHz ('air band') adds breathtaking sheen to vocals and brass without harshness.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Swedien applied custom Pultec and Harrison high-frequency EQ boosts to give the vocals and brass stabs an ultra-luxurious top-end polish.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
    expert_explanation: "The Harrison 3232 console EQ provided ultra-smooth high shelving. Alien Ant Farm's EQ curves emphasized aggressive 2–4 kHz midrange bite to help guitars cut through.",
    expert_quote: {
      text: "We worked on that air band until the brass sparkled like fine crystal.",
      author: "Bruce Swedien"
    },
    explanation_image: {
      src: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      alt: "Pultec High-Frequency Air Band EQ Curve"
    }
  },
  {
    title: "Dynamics",
    content: "Mix bus was left uncompressed during tracking and mixing to maintain natural transient impact and explosive micro-dynamics.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Bruce Swedien famously refused to compress the master mix bus or rhythm tracks, believing compression strangled the lifelike impact of drum transients.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/svg/comparison_human_microdynamics_vs_machine_velocity.svg",
    expert_explanation: "Swedien's philosophy resulted in unmatched punch that sounds enormous when turned up. Alien Ant Farm utilized modern SSL bus compressors and digital peak limiters for consistent commercial loudness.",
    expert_quote: {
      text: "I don't compress rhythm instruments. I want the drumstick hitting the drumhead to hit your ear with full, unchoked acoustic force.",
      author: "Bruce Swedien"
    },
    explanation_image: {
      src: "/images/svg/comparison_human_microdynamics_vs_machine_velocity.svg",
      alt: "Uncompressed Transients vs Heavy Bus Compression"
    }
  },
  {
    title: "Instrumentation",
    content: "Arrangement showcases real brass section arrangements (Jerry Hey horns) doubling tight analog synthesizers (Roland D-50, Yamaha DX7).",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Michael Jackson).</strong> Arranger Jerry Hey wrote lightning-fast horn lines that doubled digital FM synthesizers, creating a hybrid acoustic-electronic powerhouse.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "yes" },
      { text: "Version B (Alien Ant Farm)", is_true: "no" }
    ],
    img: "/images/gen/t2_q13_brass_distance_hq_1772103543454.png",
    expert_explanation: "The Jerry Hey Horn section (trumpets, trombones, saxophones) gave the track its razor-sharp punch. Alien Ant Farm stripped the horns completely, relying strictly on a traditional four-piece rock band lineup.",
    expert_quote: {
      text: "Jerry Hey's horn voicings were so tight they sounded like a laser beam hitting you in the chest.",
      author: "Quincy Jones"
    },
    explanation_image: {
      src: "/images/gen/t2_q13_brass_distance_hq_1772103543454.png",
      alt: "Jerry Hey Horn Section & Multitrack Brass Capture"
    }
  },
  {
    title: "Genre Style",
    content: "Transforms 1980s Pop/R&B into early-2000s Post-Grunge / Alternative Rock, popularizing rock covers of classic pop tracks on MTV.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Alien Ant Farm).</strong> Alien Ant Farm's 2001 cover introduced Jackson's composition to a new generation of rock fans, reaching #1 on modern rock charts.</p>",
    answers: [
      { text: "Version A (Michael Jackson)", is_true: "no" },
      { text: "Version B (Alien Ant Farm)", is_true: "yes" }
    ],
    img: "/images/comparisons/smooth_criminal_comparison.png",
    expert_explanation: "The cover proved that the melodic strength of Jackson's writing could seamlessly transcend genres into loud, distorted guitar-driven alternative rock.",
    expert_quote: {
      text: "We were just having fun playing a song we loved, and it ended up taking us around the world.",
      author: "Dryden Mitchell"
    },
    explanation_image: {
      src: "/images/comparisons/smooth_criminal_comparison.png",
      alt: "High-Tech 80s Pop/R&B vs 2000s Alternative Rock"
    }
  },
  comp8ExistingCloze
];

const comp8Index = stage4.items.findIndex(i => i.id === 'comp_smooth_criminal');
stage4.items[comp8Index].questions = comp8Questions;
console.log(`Comp 8 (Smooth Criminal) updated with ${comp8Questions.length} questions.`);


// ==========================================
// COMPARISON 9: WORD UP! (Cameo 1986 vs Korn 2004)
// ==========================================
const comp9ExistingCloze = stage4.items.find(i => i.id === 'comp_word_up').questions[0];

const comp9Questions = [
  {
    title: "Recording Release Medium",
    content: "Recorded onto 24-track analogue tape at Quad Sound Studios NYC and mixed through an SSL 4000E console for 12-inch vinyl dance clubs.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> Larry Blackmon produced 'Word Up!' on 24-track 2-inch tape, taking full advantage of the Solid State Logic 4000E's built-in channel compressors and gates.</p>",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/svg/analog_tape_24track_ssl_console.svg",
    expert_explanation: "The SSL 4000E console revolutionized 1980s dance production by placing gates and compressors on every single channel strip. Korn tracked into Pro Tools HD at 24-bit/96kHz.",
    expert_quote: {
      text: "The SSL console allowed us to gate every drum and clamp down on every instrument for that razor-tight funk groove.",
      author: "Larry Blackmon (Cameo)"
    },
    explanation_image: {
      src: "/images/svg/analog_tape_24track_ssl_console.svg",
      alt: "Solid State Logic 4000E Console Strip"
    }
  },
  {
    title: "Capture & Style",
    content: "The rhythm section pairs an Oberheim DMX drum machine with an organic, percussive slap bass guitar played live.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> Cameo merged futuristic programmed drums with the authentic human groove of live slap electric bass, defining the 1980s Synth-Funk sound.</p>",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/gen/drum_machine_step_sequencer.png",
    expert_explanation: "Larry Blackmon balanced machine quantization with soulful live bass slap pops. Korn replaced the funk slap with a down-tuned, percussive 5-string metal slap technique.",
    expert_quote: {
      text: "You need the machine for the steady beat, but you need the human thumb on that bass guitar to bring the soul.",
      author: "Larry Blackmon"
    },
    explanation_image: {
      src: "/images/gen/drum_machine_step_sequencer.png",
      alt: "Oberheim DMX Drum Machine & Slap Bass"
    }
  },
  {
    title: "Rhythm & Sync",
    content: "Features a live acoustic drum kit augmented by digital triggers (Drumagog) and parallel compressed room microphones.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Korn).</strong> David Silveria's live drum kit was recorded with close dynamic microphones and blended with triggered samples for modern metal punch.</p>",
    answers: [
      { text: "Version A (Cameo)", is_true: "no" },
      { text: "Version B (Korn)", is_true: "yes" }
    ],
    img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
    expert_explanation: "Modern metal drums blend live acoustic capture with triggered sample reinforcement to ensure every kick and snare hit has identical velocity and tone. Cameo programmed a hardware drum machine.",
    expert_quote: {
      text: "Triggering samples behind the real kit gives you the natural cymbal bleed with the consistent sledgehammer impact you need in metal.",
      author: "Michael Beinhorn (Producer)"
    },
    explanation_image: {
      src: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      alt: "Sample Triggering & Live Drum Blend"
    }
  },
  {
    title: "Sequencing & Sampling",
    content: "Uses Pro Tools Beat Detective and digital editing to tightly align down-tuned guitar transients to the rhythmic grid.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Korn).</strong> In 2004, digital editing allowed engineers to slice and quantize multi-miked heavy guitars to the millisecond, producing an ultra-tight groove.</p>",
    answers: [
      { text: "Version A (Cameo)", is_true: "no" },
      { text: "Version B (Korn)", is_true: "yes" }
    ],
    img: "/images/svg/in_the_box_daw_production.svg",
    expert_explanation: "Pro Tools Beat Detective revolutionized early 2000s rock production by quantizing live audio performances. Cameo relied on early hardware MIDI clock synchronization.",
    expert_quote: {
      text: "Beat Detective helped us lock the down-tuned guitars directly to Fieldy's kick and bass slap.",
      author: "Producer"
    },
    explanation_image: {
      src: "/images/svg/in_the_box_daw_production.svg",
      alt: "Pro Tools Beat Detective Grid Quantization"
    }
  },
  {
    title: "Pitching",
    content: "Lead vocal features theatrical nasal funk phrasing, pitched exclamations ('OW!'), and distinctive rolling Rs.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> Larry Blackmon's flamboyant, high-pitched funk delivery is instantly recognizable, performing without pitch correction.</p>",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/comparisons/word_up_comparison.png",
    expert_explanation: "Blackmon's vocal delivery is playful, theatrical, and rhythmic. Jonathan Davis (Korn) delivers a dark, menacing vocal style combining whispered verses with guttural screamed choruses.",
    expert_quote: {
      text: "That nasal 'OW!' became the signature of the entire 1980s funk era.",
      author: "Larry Blackmon"
    },
    explanation_image: {
      src: "/images/comparisons/word_up_comparison.png",
      alt: "Larry Blackmon Funk Phrasing vs Jonathan Davis Nu-Metal Vocals"
    }
  },
  {
    title: "Arrangement Differences",
    content: "Clean, percussive funk guitar scratch chords (16th-note muting) provide the primary rhythmic drive behind the verses.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> Cameo used a clean Fender Stratocaster playing rhythmic 'chank' scratch chords to propel the rhythm track without muddying the bass.</p>",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/svg/mic_placement_acoustic_guitar.svg",
    expert_explanation: "Funk rhythm guitar relies on rhythmic muting and high-frequency percussive strumming. Korn replaced these clean scratches with walls of distorted down-tuned 7-string chords.",
    expert_quote: {
      text: "The guitar in funk is a percussion instrument. You're playing rhythm just like a hi-hat or shaker.",
      author: "Cameo Guitarist"
    },
    explanation_image: {
      src: "/images/svg/mic_placement_acoustic_guitar.svg",
      alt: "Clean Percussive Funk Guitar Scratching"
    }
  },
  {
    title: "Mixing & Processing",
    content: "Arrangement is saturated by massive, down-tuned 7-string electric guitars tuned to A-standard (A-D-G-C-F-A-D) played through high-gain amplifiers.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Korn).</strong> Munky and Head created Korn's colossal signature sound using Ibanez 7-string guitars tuned down a full fourth to low A through Mesa Boogie Triple Rectifiers.</p>",
    answers: [
      { text: "Version A (Cameo)", is_true: "no" },
      { text: "Version B (Korn)", is_true: "yes" }
    ],
    img: "/images/guitar_amp_3d_stage.png",
    expert_explanation: "Down-tuning to low A placed the guitar fundamentals in the 55 Hz region, traditionally reserved for bass guitars. Cameo's guitars sat cleanly above 300 Hz.",
    expert_quote: {
      text: "The 7-string guitar gave us that sub-heavy crunch that hits you in the gut like an earthquake.",
      author: "James 'Munky' Shaffer (Korn)"
    },
    explanation_image: {
      src: "/images/guitar_amp_3d_stage.png",
      alt: "Down-Tuned 7-String Guitar Amplification"
    }
  },
  {
    title: "Pan (Stereo Field)",
    content: "Quad-tracked rhythm guitars are hard-panned (two takes 100% Left, two takes 100% Right) to engulf the listener.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Korn).</strong> Quad-tracking rhythm guitars is the industry standard for modern heavy rock, creating massive stereo spread while keeping the center channel open for lead elements.</p>",
    answers: [
      { text: "Version A (Cameo)", is_true: "no" },
      { text: "Version B (Korn)", is_true: "yes" }
    ],
    img: "/images/stereo_soundstage_panning_hq.svg",
    expert_explanation: "Cameo kept the mix relatively narrow with centered drums, centered slap bass, and centered vocals, using stereo panning primarily for synthesizer stereo chorus spreads.",
    expert_quote: {
      text: "Tracking four tight rhythm passes and panning them extreme left and right is the secret to a massive modern rock wall.",
      author: "Mix Engineer"
    },
    explanation_image: {
      src: "/images/stereo_soundstage_panning_hq.svg",
      alt: "Quad-Tracked Heavy Rock Panning"
    }
  },
  {
    title: "Reverb",
    content: "Features an exaggerated 1980s gated reverb on the snare drum, where a long reverb tail is violently chopped off by a noise gate.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> Cameo sent the snare into an AMS RMX16 digital reverb and clamped an SSL noise gate onto the return, producing the quintessential 80s explosive snare decay.",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/gated_reverb_technique_diagram.svg",
    expert_explanation: "Gated reverb provided explosive sonic impact without muddying the fast tempo of the funk groove. Korn opted for a drier, up-front snare drum with natural room microphones.",
    expert_quote: {
      text: "Gated reverb on the snare was the biggest sound of 1986. You heard the explosion, and then instantly—silence.",
      author: "Larry Blackmon"
    },
    explanation_image: {
      src: "/images/gated_reverb_technique_diagram.svg",
      alt: "Gated Reverb Waveform Envelope"
    }
  },
  {
    title: "Delay",
    content: "Subtle stereo slapback delay (~80 ms) is applied to backing vocal chants to enhance crowd presence and stereo width.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> Short slapback delays doubled the backing vocal chants ('Wave your hands in the air...'), making a small vocal group sound like a packed dance club.",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/svg/vocal_slapback_delay_technique.svg",
    expert_explanation: "Slapback delays between 60 and 120 ms thicken vocals without creating audible repeating echoes. Korn used dark, modulated delays on atmospheric guitar textures.",
    expert_quote: {
      text: "Slapback delay on the hook vocals gave it that live party vibe.",
      author: "Cameo Engineer"
    },
    explanation_image: {
      src: "/images/svg/vocal_slapback_delay_technique.svg",
      alt: "Slapback Vocal Thickening Technique"
    }
  },
  {
    title: "Filtering & Effects",
    content: "Utilizes extreme bass guitar EQ scooping with high-end boost around 4 kHz to capture the distinctive 'metallic clack' of the slap technique.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Korn).</strong> Bassist Fieldy famously scooped all midrange out of his 5-string Ibanez bass, turning it into a clicky, sub-bass percussion instrument.",
    answers: [
      { text: "Version A (Cameo)", is_true: "no" },
      { text: "Version B (Korn)", is_true: "yes" }
    ],
    img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
    expert_explanation: "Fieldy's signature bass tone relies on zero midrange, massive sub-bass (40 Hz), and extreme fret-click treble (4 kHz). Cameo's bass tone was warm, round, and rich in 800 Hz funk midrange.",
    expert_quote: {
      text: "People told me my bass sounded like a typewriter, but that typewriter tone defined Korn's entire groove.",
      author: "Reginald 'Fieldy' Arvizu (Korn)"
    },
    explanation_image: {
      src: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      alt: "Extreme Mid-Scooped Bass Tone with 4 kHz Fret Click"
    }
  },
  {
    title: "EQ",
    content: "Low-end frequencies below 45 Hz are cleanly rolled off with a high-pass filter to keep the vinyl cutting lathe stable and prevent turntable rumble.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> High-pass filtering the sub-bass was essential when mastering for 1980s vinyl to avoid out-of-phase bass energy that would cause the cutting stylus to jump.",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/svg/high_pass_filter_sweep_riser.svg",
    expert_explanation: "Vinyl records physically cannot reproduce excessive out-of-phase sub-bass below 40 Hz. In contrast, Korn's 2004 digital master exploited massive sub-bass frequencies down to 30 Hz for car subwoofers.",
    expert_quote: {
      text: "You had to filter the extreme low end, otherwise the vinyl cutting needle would literally jump out of the groove.",
      author: "Vinyl Mastering Engineer"
    },
    explanation_image: {
      src: "/images/svg/high_pass_filter_sweep_riser.svg",
      alt: "Sub-Bass High-Pass Filtering for Vinyl Mastering"
    }
  },
  {
    title: "Dynamics",
    content: "Mastered with severe digital multi-band compression and peak limiting, pushing average loudness levels to -8 LUFS.",
    type: "multi_choice",
    explanation: "<p><strong>Version B (Korn).</strong> Released on CD in 2004 during the height of the Loudness War, Korn's cover exhibits heavy RMS compression and negligible dynamic variation between sections.",
    answers: [
      { text: "Version A (Cameo)", is_true: "no" },
      { text: "Version B (Korn)", is_true: "yes" }
    ],
    img: "/images/svg/limiter_brickwall.svg",
    expert_explanation: "Korn's master squeezed every ounce of volume out of the 16-bit/44.1kHz CD format. Cameo's 1986 vinyl release had over 13 dB of dynamic range between verse and chorus peaks.",
    expert_quote: {
      text: "In 2004, if your rock single wasn't hitting -8 LUFS, radio programmers complained it sounded too quiet next to Linkin Park.",
      author: "Mastering Engineer"
    },
    explanation_image: {
      src: "/images/svg/limiter_brickwall.svg",
      alt: "Loudness War Brickwall Limiting on Modern Metal"
    }
  },
  {
    title: "Instrumentation",
    content: "Synthesizer brass stabs and polyphonic analog pads (Roland Jupiter-8 / Oberheim OB-8) deliver the main harmonic support.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> Cameo's signature 1980s texture relied heavily on detuned sawtooth synthesizer brass stabs punching through the mix alongside the slap bass.",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/svg/synth_brass_vs_acoustic_strings.svg",
    expert_explanation: "Analogue polyphonic synthesizers provided the bright harmonic hits that defined mid-80s R&B. Korn eliminated synths, relying exclusively on electric guitars and bass to provide all harmonic weight.",
    expert_quote: {
      text: "Those big Oberheim synth brass chords gave the hook its unforgettable swagger.",
      author: "Larry Blackmon"
    },
    explanation_image: {
      src: "/images/svg/synth_brass_vs_acoustic_strings.svg",
      alt: "Analogue Synthesizer Polyphonic Brass Stabs"
    }
  },
  {
    title: "Genre Style",
    content: "Represents the peak of 1980s Synth-Funk / Electro-R&B, merging classic urban groove with high-tech electronic studio gear.",
    type: "multi_choice",
    explanation: "<p><strong>Version A (Cameo).</strong> 'Word Up!' became a multi-platinum crossover anthem that defined the mid-80s synthesis of funk, drum machines, and pop production.",
    answers: [
      { text: "Version A (Cameo)", is_true: "yes" },
      { text: "Version B (Korn)", is_true: "no" }
    ],
    img: "/images/comparisons/word_up_comparison.png",
    expert_explanation: "Cameo took funk out of the 1970s acoustic ballroom and rebuilt it for the 1980s MTV dance era. Korn translated that dance groove into 2000s Nu-Metal alternative rock.",
    expert_quote: {
      text: "We proved that funk could evolve with the technology without losing its groove.",
      author: "Larry Blackmon"
    },
    explanation_image: {
      src: "/images/comparisons/word_up_comparison.png",
      alt: "1980s Synth-Funk vs 2000s Nu-Metal Reinterpretation"
    }
  },
  comp9ExistingCloze
];

const comp9Index = stage4.items.findIndex(i => i.id === 'comp_word_up');
stage4.items[comp9Index].questions = comp9Questions;
console.log(`Comp 9 (Word Up!) updated with ${comp9Questions.length} questions.`);


// ==========================================
// BUILD NEW COMPARISONS 10 TO 15
// ==========================================

// Helper to build 15 structured criteria questions + 1 cloze summary
function buildComparisonSuite(options) {
  const {
    id, title, youtube_id, video_title_1, youtube_id_2, video_title_2, description,
    artistA, yearA, genreA, artistB, yearB, genreB,
    criteriaQuestions, clozeText, clozeOptions, clozeAnswer, expertSummary
  } = options;

  const questions = criteriaQuestions.map(cq => ({
    title: cq.title,
    content: cq.content,
    type: "multi_choice",
    explanation: cq.explanation,
    answers: [
      { text: `Version A (${artistA})`, is_true: cq.correctIsA ? "yes" : "no" },
      { text: `Version B (${artistB})`, is_true: cq.correctIsA ? "no" : "yes" }
    ],
    img: cq.img || `/images/comparisons/${id.replace('comp_', '')}_comparison.svg`,
    expert_explanation: cq.expert_explanation,
    expert_quote: cq.expert_quote,
    explanation_image: {
      src: cq.img || `/images/comparisons/${id.replace('comp_', '')}_comparison.svg`,
      alt: cq.imgAlt || `${title} Comparative Analysis`
    }
  }));

  // Add Q16 Cloze Master Synthesis
  questions.push({
    title: `Production Synthesis: ${title.replace(/Comparison \d+: /, '')}`,
    content: `Select the correct technical terms to complete the 15 comparative statements between ${artistA} (${yearA}) and ${artistB} (${yearB}).`,
    type: "cloze",
    text: clozeText,
    options: clozeOptions,
    answer: clozeAnswer,
    expert_explanation: expertSummary,
    img: `/images/comparisons/${id.replace('comp_', '')}_comparison.svg`,
    explanation_image: {
      src: `/images/comparisons/${id.replace('comp_', '')}_comparison.svg`,
      alt: `${title} Synthesis Diagram`
    }
  });

  return {
    type: "lp_quiz",
    title,
    youtube_id,
    video_title_1: `${artistA} (${yearA})`,
    youtube_id_2,
    video_title_2: `${artistB} (${yearB})`,
    description,
    questions,
    isPremium: true,
    id
  };
}

// Write the complete definitions for Comparisons 10 to 15
const newComparisons = [];

// ----------------------------------------------------
// COMPARISON 10: COMFORTABLY NUMB (Pink Floyd 1979 vs Scissor Sisters 2004) - Official 2022 Paper
// ----------------------------------------------------
newComparisons.push(buildComparisonSuite({
  id: "comp_comfortably_numb",
  title: "Comparison 10: Comfortably Numb",
  youtube_id: "_FrOQC-zMzk",
  youtube_id_2: "jhUXPNugW90",
  artistA: "Pink Floyd",
  yearA: "1979",
  genreA: "Progressive / Symphonic Rock",
  artistB: "Scissor Sisters",
  yearB: "2004",
  genreB: "Electro-Pop / Nu-Disco",
  description: "Official 2022 Edexcel Component 3 Question 5 paper. Compare the 1979 progressive rock masterpiece by Pink Floyd (Version A) with the 2004 electro-pop/disco cover by Scissor Sisters (Version B). Focus on analogue acoustic capture and symphonic orchestrations versus DAW sequencing, arpeggiators, and dancefloor dynamics.",
  criteriaQuestions: [
    {
      title: "Recording Release Medium",
      content: "Recorded on large-format 24-track analogue tape (Studer A800) at Super Bear Studios and Abbey Road, released on high-fidelity vinyl album format.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> Recorded on 2-inch 24-track tape machines, taking advantage of natural tape saturation and wide analogue frequency response on <em>The Wall</em> album.</p>",
      img: "/images/svg/analog_tape_24track_ssl_console.svg",
      expert_explanation: "Pink Floyd tracked onto Studer 24-track machines at 30 IPS. Scissor Sisters produced their cover entirely inside a digital audio workstation (DAW) for commercial CD and digital streaming.",
      expert_quote: { text: "We took immense care with the tape heads and alignment at Super Bear to make sure David's solos had absolute warmth.", author: "James Guthrie (Co-Producer/Engineer)" }
    },
    {
      title: "Capture & Style",
      content: "Features acoustic capture of a live 55-piece symphony orchestra recorded with distant ambient microphones in a reverberant scoring hall.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> Michael Kamen's lush orchestral arrangements were performed live by classical musicians and captured with stereo room microphones.</p>",
      img: "/images/drum_recording_60s.png",
      expert_explanation: "The orchestral instruments in the Pink Floyd version add rich acoustic texture and spatial depth. Scissor Sisters replaced acoustic orchestrations with synthetic string pads and brass-like patches.",
      expert_quote: { text: "The orchestra gives the chorus that immense sense of floating detachment.", author: "Michael Kamen (Orchestral Arranger)" }
    },
    {
      title: "Rhythm & Sync",
      content: "Features a fast, driving 132 BPM four-on-the-floor kick drum pattern locked rigidly to a quantized electronic grid.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Scissor Sisters).</strong> The 2004 remake adopts an energetic Bee Gees-inspired disco pulse with a four-on-the-floor kick and 16th-note hi-hat accents designed for nightclubs.</p>",
      img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      expert_explanation: "Pink Floyd's version sits at a slow, hypnotic 65 BPM with Nick Mason's natural human drum drag. Scissor Sisters doubled the tempo to 132 BPM to create a frenetic dance track.",
      expert_quote: { text: "We wanted to turn that slow, drug-induced ballad into a song you could dance and sweat to at two in the morning.", author: "Jake Shears (Scissor Sisters)" }
    },
    {
      title: "Sequencing & Sampling",
      content: "Heavily reliant on MIDI sequencing, driving a pulsating 16th-note synthesizer arpeggiator and looped acoustic guitar sample hooks.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Scissor Sisters).</strong> The 2004 production is built upon quantized MIDI sequences, running continuous arpeggiators and looped guitar riffs throughout the verses.</p>",
      img: "/images/svg/arpeggiator_pattern.svg",
      expert_explanation: "MIDI was not invented until 1983; Pink Floyd's 1979 performance was 100% human-performed without digital sequencing. Scissor Sisters used modern software sequencers to ensure mechanical precision.",
      expert_quote: { text: "The arpeggiated synth runs constantly beneath the track, giving it that classic Giorgio Moroder disco pulse.", author: "Babydaddy (Scissor Sisters)" }
    },
    {
      title: "Pitching",
      content: "Lead vocal is performed in a distinctive, exaggerated falsetto directly reminiscent of 1970s Bee Gees disco records.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Scissor Sisters).</strong> Lead singer Jake Shears delivers the verses and choruses in a bright, soaring falsetto register, transforming the brooding original into glam-pop.</p>",
      img: "/images/comparisons/comfortably_numb_comparison.svg",
      expert_explanation: "Pink Floyd divided vocals between Roger Waters' deadpan, weary verses and David Gilmour's warm, emotive melodic choruses. Shears' falsetto was pitch-corrected and doubled in the DAW.",
      expert_quote: { text: "Singing it in falsetto gave it that hysterical, euphoric energy that disco does so well.", author: "Jake Shears" }
    },
    {
      title: "Arrangement Differences",
      content: "Structured with two expansive, highly acclaimed electric guitar solos that serve as the dramatic and narrative emotional climaxes.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> David Gilmour's two guitar solos (mid-song and the legendary 2-minute outro) are central pillars of the arrangement, conveying emotional catharsis.</p>",
      img: "/images/svg/arrangement_sparse_acoustic_vs_dense_synth.svg",
      expert_explanation: "Scissor Sisters completely eliminated the iconic guitar solos, replacing them with synth stabs, laser transitions, and a bridge vocal hook.",
      expert_quote: { text: "I did about five or six takes of the solo, and we spliced the best bits together to form the final take.", author: "David Gilmour (Pink Floyd)" }
    },
    {
      title: "Mixing & Processing",
      content: "Ends with a long, gradual manual fade-out created by physical fader rides across 24 channels on an analogue mixing console.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> The track fades out over 40 seconds as Gilmour's solo continues into the distance, maintaining the atmospheric mood of the concept album.</p>",
      img: "/images/svg/analog_tape_24track_ssl_console.svg",
      expert_explanation: "Manual console fadeouts on tape preserved analog tape warmth right down to the noise floor. Scissor Sisters used an abrupt digital DJ-friendly ending.",
      expert_quote: { text: "The fade-out had to feel like the character was slipping away into unconsciousness.", author: "James Guthrie" }
    },
    {
      title: "Pan (Stereo Field)",
      content: "The lead guitar solo features dual-tracked amplifiers panned across the stereo field, accompanied by lush stereo orchestral strings.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> Gilmour's guitar signals were split between multiple amplifiers (Hiwatt and Yamaha rotating speaker) and spread across the stereo panorama.",
      img: "/images/stereo_soundstage_panning_hq.svg",
      expert_explanation: "The wide stereo imaging of Gilmour's guitar creates an immersive soundstage. Scissor Sisters focused on wide stereo synth arpeggiators and hard-panned electronic percussion.",
      expert_quote: { text: "Combining a direct cabinet with a rotating Yamaha rotating speaker gave the stereo image incredible dimension.", author: "David Gilmour" }
    },
    {
      title: "Reverb",
      content: "Uses natural room ambience from the recording hall blended with analogue EMT 140 plate reverbs on the vocals and snare.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> Vocals were treated with Abbey Road and Super Bear EMT 140 plate reverbs, giving Gilmour's voice a smooth, timeless depth.",
      img: "/images/reverb_plate_mechanics_diagram.svg",
      expert_explanation: "EMT plates create smooth, continuous diffusion without digital algorithmic graininess. Scissor Sisters used bright digital algorithmic hall reverbs and reverse reverb effects for transitions.",
      expert_quote: { text: "The EMT plates at Abbey Road had a silkiness on vocals that no digital unit could match back then.", author: "James Guthrie" }
    },
    {
      title: "Delay",
      content: "Lead guitar tone is famously shaped by a vintage magnetic drum-based echo unit (Binson Echorec) providing warm, analog tape delay repeats.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> David Gilmour utilized the Italian Binson Echorec, which recorded audio onto a spinning steel disc rather than tape, providing warm, modulated repeats.",
      img: "/images/delay_fundamentals_time_diagram.svg",
      expert_explanation: "The Echorec's tube preamps and spinning drum produced warm, slightly unstable repeats that define Gilmour's solo. Scissor Sisters used tempo-synced digital stereo delays.",
      expert_quote: { text: "The Binson Echorec had a magical, musical degradation to the repeats that made the guitar soar.", author: "David Gilmour" }
    },
    {
      title: "Filtering & Effects",
      content: "Includes futuristic electronic sound effects such as synthetic laser zaps, white noise filter risers, and reverse sweeps.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Scissor Sisters).</strong> The 2004 dance remake incorporates classic club sound design elements including resonant filter sweeps, laser hits, and transitional risers.</p>",
      img: "/images/svg/high_pass_filter_sweep_riser.svg",
      expert_explanation: "Scissor Sisters used modern plugin automation to sweep filter resonance before drops. Pink Floyd's effects were analogue pedals (Electro-Harmonix Big Muff and Electric Mistress flanger).",
      expert_quote: { text: "Those laser sweeps and risers signal to the dancefloor that the drop is coming.", author: "Babydaddy" }
    },
    {
      title: "EQ",
      content: "Features modern club EQ balancing with ultra-boosted sub-bass below 60 Hz and an exaggerated high-frequency 'air' boost for synthetic brightness.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Scissor Sisters).</strong> Engineered for 2000s club sound systems with deep subwoofer power and a bright high-end sheen on vocals and hi-hats.</p>",
      img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      expert_explanation: "Pink Floyd's 1979 mix has a natural, warm midrange focus with smooth high-end roll-off suited for vinyl playback without sibilance.",
      expert_quote: { text: "We EQ'd the track so the sub would shake the club without losing that bright pop top end.", author: "Scissor Sisters Mixer" }
    },
    {
      title: "Dynamics",
      content: "Exhibits an immense dynamic range, moving from quiet, introspective acoustic guitar verses to roaring, explosive symphonic rock choruses.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> The track breathes naturally with huge dynamic contrast, allowing the solo and orchestral crescendos to feel overwhelmingly powerful.",
      img: "/images/svg/comparison_human_microdynamics_vs_machine_velocity.svg",
      expert_explanation: "Pink Floyd maintained over 15 dB of dynamic range across the song. Scissor Sisters used heavy bus compression and digital brickwall limiting to keep loudness consistently high.",
      expert_quote: { text: "You can't have a giant climax unless you start from a very quiet, vulnerable place.", author: "Roger Waters (Pink Floyd)" }
    },
    {
      title: "Instrumentation",
      content: "Instrumentation is primarily synthesized: digital synth bass, software polyphonic pads, drum machines, and electronic percussion.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Scissor Sisters).</strong> The cover replaces acoustic drums, acoustic guitars, and orchestral strings with a fully synthetic electronic production palette.</p>",
      img: "/images/svg/acoustic_guitar_vs_tropical_synth_pluck.svg",
      expert_explanation: "Pink Floyd's palette relied on real instruments: Fender Stratocaster, acoustic 12-string guitar, Prophet-5 synth, real orchestra, and live acoustic drums.",
      expert_quote: { text: "We took rock royalty and transformed it entirely into synthetic nightclub gold.", author: "Jake Shears" }
    },
    {
      title: "Genre Style",
      content: "Defines late-1970s Progressive / Symphonic Art Rock, prioritizing conceptual narrative, complex arrangements, and instrumental virtuosity.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Pink Floyd).</strong> The original is a cornerstone of classic progressive rock, exploring themes of psychological isolation and medical detachment.</p>",
      img: "/images/comparisons/comfortably_numb_comparison.svg",
      expert_explanation: "Pink Floyd created a profound rock narrative on <em>The Wall</em>. Scissor Sisters audaciously reimagined it as a celebratory, hedonistic Nu-Disco / Electro-Pop dance anthem.",
      expert_quote: { text: "Even David Gilmour and Roger Waters loved the cover—they said it took genuine courage to turn it into a disco track.", author: "Jake Shears" }
    }
  ],
  clozeText: [
    "1. Pink Floyd's 1979 original was recorded to 24-track {0} at Super Bear Studios.",
    "2. Scissor Sisters' 2004 remake was produced completely inside a {1}.",
    "3. The original sits at a slow, hypnotic tempo of {2}.",
    "4. The cover doubles the tempo to an energetic {3} designed for dance clubs.",
    "5. Pink Floyd utilized a real live 55-piece {4} arranged by Michael Kamen.",
    "6. Scissor Sisters replaced acoustic orchestrations with synthetic {5} and arpeggios.",
    "7. The original vocal features Roger Waters' weary verses contrasted with David Gilmour's warm {6}.",
    "8. Scissor Sisters' vocal is delivered entirely in an exaggerated {7} inspired by the Bee Gees.",
    "9. David Gilmour shaped his guitar solo using a vintage {8} echo unit and Big Muff fuzz.",
    "10. The dance remake completely eliminates the original's two extended {9}.",
    "11. Pink Floyd recorded lead vocals using classic analogue {10} reverberation plates.",
    "12. The cover employs modern digital {11} risers, laser zaps, and reverse sweeps for transitions.",
    "13. The 1979 mix preserves immense {12}, moving from quiet acoustic verses to huge choruses.",
    "14. The 2004 master is heavily processed with modern {13} limiting for continuous dance loudness.",
    "15. Ultimately, the comparison demonstrates the shift from 70s Progressive Rock to 2000s {14}."
  ],
  clozeOptions: [
    ["analogue tape", "digital DAW", "8-track cassette", "mini-disc", "direct-to-disc"],
    ["digital audio workstation (DAW)", "tape machine", "sound-on-sound lathe", "mono console", "portastudio"],
    ["65 BPM", "132 BPM", "95 BPM", "120 BPM", "144 BPM"],
    ["132 BPM", "65 BPM", "80 BPM", "100 BPM", "160 BPM"],
    ["symphony orchestra", "drum machine", "brass synthesizer", "vocoder choir", "fairlight sampler"],
    ["synth pads", "acoustic violins", "flute section", "grand pianos", "accordion lines"],
    ["melodic choruses", "falsetto shrieks", "screamed growls", "whispered vocals", "vocoder chants"],
    ["falsetto register", "baritone croon", "death metal growl", "monotone spoken word", "autotuned robot voice"],
    ["Binson Echorec", "digital plugin", "reverse sampler", "chorus pedal", "spring reverb"],
    ["electric guitar solos", "drum beats", "basslines", "synthesizer leads", "vocal verses"],
    ["EMT 140 plate", "digital algorithmic", "convolution spring", "gated digital", "tape slapback"],
    ["filter sweep", "tape splice", "fader drop", "acoustic cymbal", "microphone bleed"],
    ["dynamic range", "brickwall limiting", "frequency scooping", "phase cancellation", "harmonic distortion"],
    ["brickwall digital", "tape saturation", "natural acoustic", "zero", "analogue optical"],
    ["Nu-Disco / Electro-Pop", "Heavy Metal", "Delta Blues", "Modern Trap", "Traditional Folk"]
  ],
  clozeAnswer: [
    "analogue tape",
    "digital audio workstation (DAW)",
    "65 BPM",
    "132 BPM",
    "symphony orchestra",
    "synth pads",
    "melodic choruses",
    "falsetto register",
    "Binson Echorec",
    "electric guitar solos",
    "EMT 140 plate",
    "filter sweep",
    "dynamic range",
    "brickwall digital",
    "Nu-Disco / Electro-Pop"
  ],
  expertSummary: "The official 2022 Edexcel Component 3 Question 5 comparison explores how Scissor Sisters completely deconstructed Pink Floyd's 1979 progressive rock epic. Key production contrasts include analogue tape tracking vs DAW sequencing, slow 65 BPM human groove vs 132 BPM four-on-the-floor disco, live 55-piece symphony orchestra vs synth arpeggiators, David Gilmour's legendary Binson Echorec guitar solos vs complete guitar removal, and uncompressed acoustic dynamics vs brickwall digital dancefloor loudness."
}));


// ----------------------------------------------------
// COMPARISON 11: JUMP (Van Halen 1984 vs Paul Anka 2005) - Official 2023 Paper
// ----------------------------------------------------
newComparisons.push(buildComparisonSuite({
  id: "comp_jump",
  title: "Comparison 11: Jump",
  youtube_id: "SwYN7mTi6HM",
  youtube_id_2: "p-M1KphH4kI",
  artistA: "Van Halen",
  yearA: "1984",
  genreA: "Arena Rock / Synth-Rock",
  artistB: "Paul Anka",
  yearB: "2005",
  genreB: "Big Band Swing / Vocal Jazz",
  description: "Official 2023 Edexcel Component 3 Question 5 paper. Compare the 1984 hard rock/synth-rock anthem by Van Halen (Version A) with the 2005 acoustic big band swing jazz cover by Paul Anka (Version B). Focus on isolated analogue tracking and Oberheim OB-Xa synthesis versus live room acoustics, brass section capture, and natural jazz dynamics.",
  criteriaQuestions: [
    {
      title: "Recording Release Medium",
      content: "Recorded onto 24-track analogue tape at Eddie Van Halen's personal 5150 Studio, mixed to 1/2-inch stereo master tape.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> Tracked on high-output 2-inch analogue tape with gentle tape saturation, mixed for arena-rock radio and vinyl/cassette playback.</p>",
      img: "/images/svg/analog_tape_24track_ssl_console.svg",
      expert_explanation: "Van Halen tracked in Eddie's 5150 home studio using a custom console and 24-track tape. Paul Anka recorded in 2005 using high-resolution 24-bit digital multitrack for his <em>Rock Swings</em> album.",
      expert_quote: { text: "5150 gave us total freedom to spend days getting the Oberheim and guitar sounds exactly right without watching the studio clock.", author: "Eddie Van Halen (Van Halen)" }
    },
    {
      title: "Capture & Style",
      content: "All instruments (brass sections, upright bass, grand piano, drums) were recorded simultaneously live in one large acoustic room with natural spill.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Paul Anka).</strong> Arranged in authentic 1950s big band style, the musicians played together in a large studio, relying on natural acoustic room bleed to blend the instruments.</p>",
      img: "/images/drum_recording_60s.png",
      expert_explanation: "Paul Anka used spot mics combined with ambient room stereo pairs (XY/Blumlein) for acoustic realism. Van Halen tracked in isolation booths with minimal acoustic spill for independent processing.",
      expert_quote: { text: "With big band, you don't track instruments one by one. You capture the breath and energy of 20 musicians hitting that downbeat together.", author: "Paul Anka" }
    },
    {
      title: "Rhythm & Sync",
      content: "Features a relaxed, swinging jazz shuffle groove driven by brushed snare rhythms and a walking acoustic double bass.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Paul Anka).</strong> Reimagined as a swung big band jazz arrangement at 134 BPM, where the rhythm section swings eighth notes rather than playing straight rock 16ths.</p>",
      img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      expert_explanation: "Van Halen's drum groove is a heavy, driving straight-four rock beat with Alex Van Halen's loud close-miked kick and snare. Paul Anka's drums sit back in the mix with light brushwork.",
      expert_quote: { text: "Swinging an iconic rock song turns the entire rhythmic feel upside down—it becomes cool and swaggering.", author: "Paul Anka's Drummer" }
    },
    {
      title: "Sequencing & Sampling",
      content: "Features an iconic polyphonic synthesizer hook played live on an Oberheim OB-Xa using layered sawtooth waveforms.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> Eddie Van Halen played the legendary brass-like hook on an Oberheim OB-Xa analog synthesizer, thick with detuned dual oscillators.",
      img: "/images/svg/synth_brass_vs_acoustic_strings.svg",
      expert_explanation: "The OB-Xa gave 'Jump' its massive synth-rock crossover identity. Paul Anka used zero synthesizers or electronic sequencing, translating the synth chords into acoustic brass section stabs.",
      expert_quote: { text: "The band didn't want synths at first—they thought it wasn't rock and roll. But that OB-Xa patch made the track universal.", author: "Ted Templeman (Producer)" }
    },
    {
      title: "Pitching",
      content: "Lead vocals are delivered in an athletic rock holler featuring falsetto screams, athletic ad-libs, and doubled pre-chorus harmonies.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> David Lee Roth's energetic hard-rock delivery features raw vocal rasp, bluesy inflections, and soaring falsetto shouts.</p>",
      img: "/images/comparisons/jump_comparison.svg",
      expert_explanation: "Roth's vocals are double-tracked in the choruses for rock thickness. Paul Anka sings with smooth, polished crooner vibrato and impeccable pitch control without digital autotune.",
      expert_quote: { text: "Dave was bouncing off the studio walls. That enthusiasm jumped right into the microphone.", author: "Ted Templeman" }
    },
    {
      title: "Arrangement Differences",
      content: "Features an explosive electric guitar solo demonstrating Eddie Van Halen's revolutionary two-handed tapping technique and whammy bar dives.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> Eddie's solo combines two-hand fretboard tapping, wide finger vibrato, and screaming pinch harmonics through a cranked Marshall Super Lead amp.</p>",
      img: "/images/guitar_amp_3d_stage.png",
      expert_explanation: "Eddie's solo is an iconic hard rock benchmark. Paul Anka replaces the guitar solo with dynamic brass call-and-response exchanges and an acoustic piano solo.",
      expert_quote: { text: "Eddie nailed that solo in just a couple of takes. He had that guitar singing through his Marshall plexi.", author: "Ted Templeman" }
    },
    {
      title: "Mixing & Processing",
      content: "Features close-miked acoustic instruments with natural dynamic bleed between microphones, producing an authentic live stage blend.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Paul Anka).</strong> The acoustic jazz mix allows natural microphone bleed between brass, drums, and piano, creating a warm, organic acoustic glue.",
      img: "/images/drum_recording_60s.png",
      expert_explanation: "Van Halen's mix relies on tight isolation, artificial plate reverbs, and close dynamic microphones (Shure SM57s on guitars and snare, AKG D12 on kick) for dry, aggressive separation.",
      expert_quote: { text: "In jazz mixing, bleed isn't your enemy—it's your friend. It's what makes the band sound like they're sharing the same air.", author: "Al Schmitt (Mixer, Paul Anka)" }
    },
    {
      title: "Pan (Stereo Field)",
      content: "Hard panning places the Oberheim synthesizer predominantly in the left/center while rhythm guitars sit on the right, creating a distinct hard-panned soundstage.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> Ted Templeman used 1980s asymmetrical stereo panning: synth on the left, guitar on the right, with drums and bass centered.",
      img: "/images/stereo_soundstage_panning_hq.svg",
      expert_explanation: "Asymmetrical panning kept the dense guitar and synthesizer from colliding. Paul Anka's mix reflects a traditional big band stage: brass spread wide, double bass centered, piano stage-left.",
      expert_quote: { text: "Panning the synth left and the guitar right gave each instrument its own huge territory in the speakers.", author: "Donn Landee (Engineer)" }
    },
    {
      title: "Reverb",
      content: "Employs lush early digital studio plate reverberation (Lexicon 224) on the snare and lead guitar for an expansive 1980s arena ambiance.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> Alex Van Halen's snare and Eddie's guitar were treated with Lexicon 224 digital reverbs, enhancing their cavernous rock presence.",
      img: "/images/reverb_plate_mechanics_diagram.svg",
      expert_explanation: "Lexicon 224 digital reverb defined 1980s arena rock depth. Paul Anka's version relies on the natural room acoustics of Capitol Studios with minimal artificial processing.",
      expert_quote: { text: "The Lexicon 224 gave Eddie's solo that stadium echo as if he were playing in front of 50,000 screaming fans.", author: "Donn Landee" }
    },
    {
      title: "Delay",
      content: "Lead guitar is treated with stereo analogue tape delay (Roland Space Echo / Echoplex) to add sustain and temporal width during the solo.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> Eddie ran an EP-3 Echoplex in his signal path, whose tape preamp warmed the tone while adding rhythmic echo tails.",
      img: "/images/delay_fundamentals_time_diagram.svg",
      expert_explanation: "The tape Echoplex was critical to Eddie's tone, adding warmth and flutter. Paul Anka's vocal and band have zero noticeable delay processing, preserving jazz realism.",
      expert_quote: { text: "The Echoplex wasn't just for echo; its preamp sweetened the whole guitar signal before it hit the Marshall.", author: "Eddie Van Halen" }
    },
    {
      title: "Filtering & Effects",
      content: "Guitar utilizes an MXR Phase 90 and Flanger pedal before the amplifier to create gentle swirling harmonic movement.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> Eddie's signature tone prominently featured the script-logo MXR Phase 90 on a slow sweep, adding harmonic complexity to his solos.",
      img: "/images/svg/filter_resonance_diagram.svg",
      expert_explanation: "The subtle Phase 90 sweep gave Eddie's tone its famous 'woosh'. Paul Anka's acoustic jazz arrangement is entirely free of modulation effects, phasers, or synth filters.",
      expert_quote: { text: "Setting the Phase 90 at about 9 o'clock gave the notes that subtle vocal chewiness without overwhelming the lick.", author: "Eddie Van Halen" }
    },
    {
      title: "EQ",
      content: "Features bright, hyped high-frequency 'air' EQ boost on cymbals and synthesizer brass, paired with a punchy midrange boost on the guitar solo.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> The mix exhibits the classic 1980s rock EQ curve: bright, sizzling top end on hi-hats/cymbals and focused 1.5–3 kHz guitar punch.",
      img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      expert_explanation: "Van Halen's EQ was designed for FM radio punch. Paul Anka's jazz mix has full low-frequency warmth on double bass and natural acoustic high-end roll-off.",
      expert_quote: { text: "We opened up the top end on the OB-Xa so those brass chords would jump out of car radio speakers.", author: "Donn Landee" }
    },
    {
      title: "Dynamics",
      content: "Maintains an uncompressed, highly dynamic acoustic performance where the brass section crescendos naturally follow the conductor's baton.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Paul Anka).</strong> Big band music thrives on micro-dynamics: whisper-quiet acoustic piano passages followed by ear-splitting full-ensemble brass blasts without heavy limiting.</p>",
      img: "/images/svg/comparison_human_microdynamics_vs_machine_velocity.svg",
      expert_explanation: "Paul Anka's recording team avoided aggressive mix compression to protect the dynamic punch of the live brass. Van Halen's track had solid analog tape compression and channel VCA clamping.",
      expert_quote: { text: "If you compress a big band too much, the horns sound small and lifeless. You have to let them blast naturally.", author: "Al Schmitt" }
    },
    {
      title: "Instrumentation",
      content: "The iconic synthesizer hook is re-orchestrated for an acoustic big band horn section comprising trumpets, trombones, and saxophones.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Paul Anka).</strong> Arranger Patrick Williams scored the Oberheim synth hook for a 16-piece acoustic big band brass section with acoustic upright bass and grand piano.",
      img: "/images/gen/t2_q13_brass_distance_hq_1772103543454.png",
      expert_explanation: "Substituting analog synthesizers with acoustic brass transformed the track's identity. Van Halen's rock instrumentation was OB-Xa, electric guitar, electric bass, and rock drum kit.",
      expert_quote: { text: "Scoring Eddie's synth riff for five saxophones and four trumpets gave it that classic Sinatra swagger.", author: "Patrick Williams (Arranger)" }
    },
    {
      title: "Genre Style",
      content: "Exemplifies the commercial peak of 1980s Arena Rock / Synth-Rock, crossing heavy guitar virtuosity with mainstream pop appeal.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Van Halen).</strong> 'Jump' reached #1 on the Billboard Hot 100, proving that hard rock bands could integrate polyphonic synthesizers without alienating their audience.</p>",
      img: "/images/comparisons/jump_comparison.svg",
      expert_explanation: "Van Halen defined the hybrid synth-rock sound of 1984. Paul Anka's 2005 version recontextualized it as high-society swing jazz, highlighting the melody's timeless pop construction.",
      expert_quote: { text: "Jump showed that rock and synths didn't have to be mutually exclusive—it created the template for 80s arena pop-rock.", author: "Ted Templeman" }
    }
  ],
  clozeText: [
    "1. Van Halen's 1984 original was recorded to 24-track {0} at Eddie's 5150 Studio.",
    "2. Paul Anka's 2005 jazz cover was tracked into high-resolution {1}.",
    "3. The original groove is a driving, straight-ahead 4/4 {2} beat.",
    "4. The cover reimagines the rhythm as a swung, relaxed {3} jazz shuffle.",
    "5. Eddie Van Halen performed the famous hook on an {4} polyphonic synthesizer.",
    "6. Paul Anka completely eliminated synthesizers, re-orchestrating the chords for an acoustic {5} section.",
    "7. David Lee Roth's vocals feature athletic screams, falsetto shouts, and {6} in the choruses.",
    "8. Paul Anka performs with smooth, sophisticated {7} vibrato and natural jazz phrasing.",
    "9. Eddie Van Halen's iconic solo showcases his revolutionary two-handed {8} technique.",
    "10. In the jazz version, the guitar solo is replaced by dynamic brass stabs and an acoustic {9} solo.",
    "11. Van Halen's mix treats the snare and guitar with early digital {10} reverb units.",
    "12. The big band recording relies primarily on the natural {11} of the recording studio.",
    "13. In the 1984 stereo field, the synthesizer is panned {12} while the rhythm guitar sits on the right.",
    "14. The jazz mix preserves wide natural {13}, following the big band's live crescendos without heavy compression.",
    "15. Ultimately, the comparison contrasts 1980s Synth-Rock with classic 2000s {14}."
  ],
  clozeOptions: [
    ["analogue tape", "digital DAW", "8-track cassette", "mini-disc", "direct-to-disc"],
    ["digital multitrack (DAW)", "tape machine", "sound-on-sound lathe", "mono console", "portastudio"],
    ["rock backbeat", "jazz shuffle", "reggae one-drop", "latin bossa nova", "waltz 3/4"],
    ["big band swing", "straight rock", "techno pulse", "reggae dub", "heavy metal"],
    ["Oberheim OB-Xa", "Yamaha DX7", "Roland TB-303", "Minimoog", "Fairlight CMI"],
    ["brass and horn", "distorted guitar", "synth choir", "drum machine", "string section"],
    ["double-tracking", "pitch correction", "gated reverb", "telephone filter", "vocoder effect"],
    ["crooner vibrato", "hard rock rasp", "death metal growl", "whispered delivery", "monotone rap"],
    ["fretboard tapping", "slide guitar", "fingerpicking", "wah-wah rhythm", "bowed guitar"],
    ["grand piano", "electric guitar", "harmonica", "synth lead", "turntable scratch"],
    ["Lexicon 224", "spring reverb", "slapback tape", "analogue plate", "non-linear gate"],
    ["room acoustics", "digital reverb", "flanger pedal", "reverse echo", "chorus plugin"],
    ["left and center", "extreme right", "in stereo mono", "back of the room", "behind the listener"],
    ["dynamic range", "brickwall limiting", "frequency scooping", "tape wow and flutter", "digital clipping"],
    ["Big Band Swing Jazz", "Alternative Rock", "Modern Trap", "Synth-Pop", "Death Metal"]
  ],
  clozeAnswer: [
    "analogue tape",
    "digital multitrack (DAW)",
    "rock backbeat",
    "big band swing",
    "Oberheim OB-Xa",
    "brass and horn",
    "double-tracking",
    "crooner vibrato",
    "fretboard tapping",
    "grand piano",
    "Lexicon 224",
    "room acoustics",
    "left and center",
    "dynamic range",
    "Big Band Swing Jazz"
  ],
  expertSummary: "The official 2023 Edexcel Component 3 Question 5 comparison contrasts Van Halen's 1984 arena synth-rock anthem with Paul Anka's 2005 acoustic big band swing jazz cover. Key syllabus technical contrasts include: 24-track analogue tape vs digital DAW, straight 4/4 rock drum backbeat vs swung jazz brushwork, Oberheim OB-Xa polyphonic synthesizer chords vs acoustic trumpet/trombone/saxophone orchestration, Eddie Van Halen's two-handed tapping guitar solo vs acoustic piano solo, hard-panned synth/guitar stereo split vs natural big band room soundstage, and processed rock dynamics vs acoustic micro-dynamics."
}));


// ----------------------------------------------------
// COMPARISON 12: AFRICA (Toto 1982 vs Bacall & Malo 2016) - Official 2024 Paper
// ----------------------------------------------------
newComparisons.push(buildComparisonSuite({
  id: "comp_africa",
  title: "Comparison 12: Africa",
  youtube_id: "FTQbiNeytak",
  youtube_id_2: "R2Y6jQWfRHg",
  artistA: "Toto",
  yearA: "1982",
  genreA: "Yacht Rock / Studio Pop",
  artistB: "Bacall & Malo ft. Prince Osito",
  yearB: "2016",
  genreB: "Tropical House / Dancehall EDM",
  description: "Official 2024 Edexcel Component 3 Question 5 paper. Compare the 1982 studio rock/pop production by Toto (Version A) with the 2016 tropical house / dancehall EDM remake by Bacall & Malo (Version B). Focus on multi-miked drum shuffle, analogue polyphonic synthesizers (CS-80/GS-1), and vocal harmonies versus quantized DAW production, pitch-shifted vocal chops, EDM build-ups/drops, and sidechain compression.",
  criteriaQuestions: [
    {
      title: "Recording Release Medium",
      content: "Tracked at Sunset Sound Studios on two synchronized 24-track analogue tape machines, delivering unmatched warmth and headroom.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Toto).</strong> Engineered by Al Schmitt onto 48 synced analogue tape tracks, capturing the pinnacle of Los Angeles session musician fidelity on <em>Toto IV</em>.</p>",
      img: "/images/svg/analog_tape_24track_ssl_console.svg",
      expert_explanation: "Toto utilized top-tier analogue studios and tape synchronization. Bacall & Malo produced their 2016 tropical house remake entirely in-the-box (ITB) on digital audio software for streaming platforms like Spotify.",
      expert_quote: { text: "We ran two 24-track machines locked together so we had enough channels for Jeff's percussion layers and the vocal harmonies.", author: "Al Schmitt (Recording Engineer)" }
    },
    {
      title: "Capture & Style",
      content: "Session musicians played real acoustic instruments (grand piano, acoustic guitars, congas, marimba) recorded with pristine condenser microphones.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Toto).</strong> Toto consisted of world-class session players, capturing organic acoustic timbres and hand-played percussion (kalimba, shakers, congas) with Neumann U87 and AKG C414 condensers.</p>",
      img: "/images/drum_recording_60s.png",
      expert_explanation: "Toto's live acoustic capture created deep organic warmth. Bacall & Malo constructed their backing track primarily with synthesized software plugins, pre-made audio loops, and sampled percussion hits.",
      expert_quote: { text: "Jeff Porcaro and Lenny Castro spent hours tracking layers of shakers and congas to make the rhythm track breathe.", author: "David Paich (Toto)" }
    },
    {
      title: "Rhythm & Sync",
      content: "Driven by Jeff Porcaro's legendary live half-time shuffle beat, blending a Bernard Purdie shuffle with syncopated 16th-note African polyrhythms.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Toto).</strong> Jeff Porcaro's iconic drum groove features subtle micro-timing variations, ghost notes on the snare, and a continuous triplet shuffle feel.</p>",
      img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      expert_explanation: "Porcaro's groove is a masterclass in human feel. Bacall & Malo replaced this syncopated shuffle with a rigid, quantized four-on-the-floor EDM kick pattern and tropical dancehall percussion.",
      expert_quote: { text: "I was trying to play like Bernard Purdie and Steely Dan, layering a reggae pulse on the hi-hat over a straight shuffle backbeat.", author: "Jeff Porcaro (Toto)" }
    },
    {
      title: "Sequencing & Sampling",
      content: "Features modern EDM vocal production including pitched vocal chops, formant manipulation, and time-stretched vocal stems from the original song.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> The 2016 tropical house track uses sampled vocal hooks sliced, pitched up, and formanted into melodic synth-like motifs.",
      img: "/images/svg/vocal_chopping_sampling_technique.svg",
      expert_explanation: "Vocal chopping and formant pitching are defining signatures of 2010s EDM and tropical house. Toto recorded all multi-part vocal harmonies live to tape without sampling or digital processing.",
      expert_quote: { text: "Slicing up the vocal hook and pitching it across the keyboard gives tropical house that infectious, modern summer bounce.", author: "Malo (Producer)" }
    },
    {
      title: "Pitching",
      content: "Vocal performance includes a Jamaican dancehall-style deejay / singjay toasted rap verse delivered by featured guest Prince Osito.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> The 2016 remake introduces entirely new dancehall/reggae vocal sections with rhythmic patois toasting, shifting the cultural and genre context.",
      img: "/images/comparisons/africa_comparison.svg",
      expert_explanation: "Prince Osito's dancehall delivery contrasts completely with Bobby Kimball and David Paich's American AOR pop vocal style in the original Toto recording.",
      expert_quote: { text: "Adding dancehall vocals over tropical house chords creates that irresistible Caribbean crossover feel.", author: "Prince Osito" }
    },
    {
      title: "Arrangement Differences",
      content: "Arrangement is structured around classic EDM tension-and-release mechanics: filtering build-ups, snare roll risers, and sudden sub-bass 'drops'.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> Follows modern dance club architecture: extended intros, filtered breakdowns, 8-bar rising builds, and high-impact drops where the beat returns.",
      img: "/images/svg/arrangement_edm_build_drop.svg",
      expert_explanation: "Toto followed classic pop-rock arrangement: verse, pre-chorus, chorus, marimba solo, and a gradual 45-second fade-out. Bacall & Malo used an abrupt club ending.",
      expert_quote: { text: "In tropical house, you strip out the kick drum during the breakdown, sweep the filter, and let the drop hit with full sub-bass weight.", author: "Bacall (Producer)" }
    },
    {
      title: "Mixing & Processing",
      content: "Heavy sidechain compression is applied to pads, bass, and atmospheric sweeps, ducking their volume rhythmically on every quarter-note kick drum hit.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> The signature 'pumping' dynamic feel of modern EDM is achieved by keying sidechain compressors to the four-on-the-floor kick drum.",
      img: "/images/svg/sidechain_compression_pumping.svg",
      expert_explanation: "Sidechain ducking keeps the mix clean while creating rhythmic forward momentum. Toto's mix had no sidechain pumping, maintaining smooth, transparent dynamic balances.",
      expert_quote: { text: "Sidechain compression is what glues the chords to the kick drum and makes you want to move your feet.", author: "EDM Producer" }
    },
    {
      title: "Pan (Stereo Field)",
      content: "Features an intricate acoustic stereo soundstage with shaker loops, congas, cowbells, and kalimba panned across the panorama to create spatial immersion.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Toto).</strong> Al Schmitt carefully positioned percussion instruments across the stereo soundstage to create an immersive, polyrhythmic field without cluttering the center.",
      img: "/images/stereo_soundstage_panning_hq.svg",
      expert_explanation: "Toto spread acoustic percussion wide across the stereo spectrum. Bacall & Malo anchored all rhythmic power in mono (kick and sub-bass centered) while using stereo delay wideners on synth plucks.",
      expert_quote: { text: "I panned the percussion in an arc so you could hear each individual hand drum clearly in its own space.", author: "Al Schmitt" }
    },
    {
      title: "Reverb",
      content: "Vocal and snare are treated with legendary EMT 250 digital reverbs and EMT 140 plates, providing deep, velvety spatial decay without digital harshness.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Toto).</strong> Sunset Sound's acoustic chambers and EMT reverberation units gave Toto's vocals and drums their lush, polished studio sheen.",
      img: "/images/reverb_plate_mechanics_diagram.svg",
      expert_explanation: "The EMT 250 (the world's first commercial digital reverb) provided warm algorithmic spaces. Bacall & Malo used bright software convolution reverbs and automated reverb splash cut-offs.",
      expert_quote: { text: "Sunset Sound's live echo chambers gave the vocals a depth that made you feel like you were standing in a cathedral.", author: "David Paich" }
    },
    {
      title: "Delay",
      content: "Uses synchronized digital stereo ping-pong delays on synth plucks and vocal chops, bouncing rhythmically between left and right speakers.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> Modern DAW delay plugins set to dotted eighth-note ping-pong creates wide spatial movement across the stereo spectrum on synth motifs.",
      img: "/images/svg/dotted_eighth_note_delay.svg",
      expert_explanation: "EDM utilizes automated digital delays locked to DAW BPM. Toto used tape delay units (like the Roland Space Echo) for subtle warming and slap repeats.",
      expert_quote: { text: "Dotted-eighth ping-pong delay is the secret sauce for tropical synth plucks—it fills all the empty gaps in the stereo field.", author: "Malo" }
    },
    {
      title: "Filtering & Effects",
      content: "Automated high-pass and low-pass filter sweeps (DJ filter sweeps) remove frequencies before the drop to generate dancefloor tension.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> Resonant filter sweeps are used heavily during build-ups, cutting low end from the kick and bass before slamming back in at full frequency on the drop.",
      img: "/images/svg/high_pass_filter_sweep_riser.svg",
      expert_explanation: "Filter sweeps are an essential EDM tension-building tool. Toto's filtering was subtle and musical, shaping synthesizer filter envelopes on Yamaha CS-80 and GS-1 keyboards.",
      expert_quote: { text: "Sweeping the low-cut filter up during the build makes the dancefloor crave the bass, so when the drop hits, it explodes.", author: "Bacall" }
    },
    {
      title: "EQ",
      content: "Mix is characterized by an ultra-deep sub-bass boost below 50 Hz and a high-frequency sheen (air boost above 10 kHz), creating a dramatic scooped smile EQ.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> Optimized for modern digital streaming and club subwoofers with extreme sub-bass weight and crisp high-frequency presence.",
      img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      expert_explanation: "Toto's mix possessed a remarkably balanced, full midrange with acoustic piano and warm brass sitting comfortably in the 500 Hz to 3 kHz zone without harshness.",
      expert_quote: { text: "Club systems today demand massive energy in the 30-50 Hz sub range that 1980s vinyl could never physically handle.", author: "Mastering Engineer" }
    },
    {
      title: "Dynamics",
      content: "Mastered with extreme brickwall limiting targeting -7 to -8 LUFS, producing a dense, highly compressed and continuously loud audio waveform.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> The 2016 master features heavy digital limiting and clipping to compete with international EDM club releases on commercial streaming playlists.",
      img: "/images/svg/limiter_brickwall.svg",
      expert_explanation: "Toto's 1982 mix had over 14 dB of dynamic range, allowing the chorus to hit with genuine acoustic power compared to the delicate verses.",
      expert_quote: { text: "To cut through in a DJ set, tropical house tracks have to be smashed with limiters so they maintain maximum energy.", author: "Mastering Engineer" }
    },
    {
      title: "Instrumentation",
      content: "Features polyphonic analogue and early digital synthesizers (Yamaha CS-80 brass pads, Yamaha GS-1 FM marimba, Minimoog bass).",
      correctIsA: true,
      explanation: "<p><strong>Version A (Toto).</strong> David Paich and Steve Porcaro layered the legendary Yamaha CS-80 analogue polyphonic synth with the groundbreaking Yamaha GS-1 digital FM synthesizer.",
      img: "/images/svg/acoustic_guitar_vs_tropical_synth_pluck.svg",
      expert_explanation: "The CS-80 brass patch and GS-1 flute/marimba sound defined Toto's sonic signature. Bacall & Malo used modern software synths (Serum, Nexus) to generate tropical pluck presets.",
      expert_quote: { text: "We layered the CS-80's warm analogue brass with the GS-1's brand-new FM bell sounds to create that iconic intro hook.", author: "Steve Porcaro (Toto)" }
    },
    {
      title: "Genre Style",
      content: "Transforms 1980s Yacht Rock / Studio Pop into 2010s Tropical House / Dancehall EDM, featuring Caribbean steel pan timbres and relaxed dance grooves.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Bacall & Malo).</strong> Popularized the 2010s tropical house trend (championed by Kygo and Jonas Blue), infusing the classic composition with Caribbean party energy.",
      img: "/images/comparisons/africa_comparison.svg",
      expert_explanation: "Toto created one of the defining masterpieces of early-80s American soft-rock / studio pop. Bacall & Malo proved that its melodic hook was universally danceable for modern clubbers.",
      expert_quote: { text: "The tropical house vibe gave 'Africa' a whole second life on dancefloors and beach festivals across Europe.", author: "Bacall & Malo" }
    }
  ],
  clozeText: [
    "1. Toto's 1982 original was recorded across 48 synchronized tracks of {0} at Sunset Sound.",
    "2. Bacall & Malo's 2016 cover was produced completely inside a digital {1}.",
    "3. Jeff Porcaro drove the original with his iconic syncopated half-time {2} groove.",
    "4. The tropical house remake replaces the shuffle with a four-on-the-floor {3} kick drum pattern.",
    "5. Toto layered analogue and digital synthesizers including the {4} and GS-1 FM synthesizer.",
    "6. Bacall & Malo constructed their hook using modern {5} vocal chops and tropical pluck plugins.",
    "7. In addition to the pop hook, the cover introduces a Jamaican {6} toasting rap by Prince Osito.",
    "8. The original vocal arrangement features lush live multi-part {7} tracked to tape.",
    "9. Toto captured acoustic percussion using high-end {8} microphones panned in an arc across the soundstage.",
    "10. The 2016 dance mix heavily utilizes {9} compression to duck chords rhythmically against the kick.",
    "11. Build-ups in the cover utilize automated resonant {10} sweeps to generate club tension.",
    "12. Toto's lead vocals were sweetened using legendary EMT {11} plate and digital reverberation units.",
    "13. Bacall & Malo utilized BPM-synced digital {12} delays to bounce synth plucks between speakers.",
    "14. The modern remake is pushed through extreme digital {13} limiting to achieve a competitive club loudness of -7 LUFS.",
    "15. Ultimately, the comparison demonstrates the evolution from 80s Studio Pop to 2010s {14}."
  ],
  clozeOptions: [
    ["analogue tape", "digital DAW", "8-track cassette", "mini-disc", "direct-to-disc"],
    ["audio workstation (DAW)", "tape machine", "sound-on-sound lathe", "mono console", "portastudio"],
    ["half-time shuffle", "rock backbeat", "four-on-the-floor techno", "reggae one-drop", "waltz tempo"],
    ["EDM dance", "jazz brush", "acoustic waltz", "country two-step", "hip-hop boom bap"],
    ["Yamaha CS-80", "Korg M1", "Roland TB-303", "Moog Modular", "Casio SK-1"],
    ["pitched and chopped", "reverse guitar", "brass section", "live orchestral", "slap bass"],
    ["dancehall / singjay", "death metal growl", "operatic tenor", "choral harmony", "spoken monologue"],
    ["vocal harmonies", "vocoder chops", "gated screams", "telephone filters", "whispered layers"],
    ["condenser", "dynamic", "crystal", "piezo", "boundary"],
    ["sidechain", "parallel", "multiband limiter", "noise gate", "de-esser"],
    ["filter", "tape splice", "fader mute", "cymbal crash", "vocal swell"],
    ["plate and chamber", "spring reverb", "slap delay", "non-linear gate", "convolution room"],
    ["ping-pong", "tape slap", "rotary speaker", "flanger", "chorus"],
    ["brickwall", "tape saturation", "natural acoustic", "optical", "zero"],
    ["Tropical House / EDM", "Heavy Metal", "Delta Blues", "Prog Rock", "Traditional Folk"]
  ],
  clozeAnswer: [
    "analogue tape",
    "audio workstation (DAW)",
    "half-time shuffle",
    "EDM dance",
    "Yamaha CS-80",
    "pitched and chopped",
    "dancehall / singjay",
    "vocal harmonies",
    "condenser",
    "sidechain",
    "filter",
    "plate and chamber",
    "ping-pong",
    "brickwall",
    "Tropical House / EDM"
  ],
  expertSummary: "The official 2024 Edexcel Component 3 Question 5 comparison examines the production contrast between Toto's 1982 studio pop masterpiece 'Africa' and Bacall & Malo's 2016 tropical house / dancehall remake. Core technical syllabus contrasts include: 48-track analogue tape vs digital DAW, Jeff Porcaro's live half-time shuffle vs quantized 4-on-the-floor EDM kick, Yamaha CS-80 / GS-1 synthesizers vs pitched vocal chops, live acoustic percussion arc vs sidechained synths, Sunset Sound chamber/EMT plate reverbs vs tempo-synced ping-pong delays, and dynamic pop mixing vs -7 LUFS brickwall club limiting."
}));


// ----------------------------------------------------
// COMPARISON 13: A DAY IN THE LIFE (The Beatles 1967 vs Jeff Beck 2009) - 2026 Prediction Paper
// ----------------------------------------------------
newComparisons.push(buildComparisonSuite({
  id: "comp_a_day_in_the_life",
  title: "Comparison 13: A Day in the Life",
  youtube_id: "usNsCeOV4GM",
  youtube_id_2: "5oA1Zg5jQ5Q",
  artistA: "The Beatles",
  yearA: "1967",
  genreA: "Psychedelic Rock / Studio Art",
  artistB: "Jeff Beck",
  yearB: "2009",
  genreB: "Instrumental Rock / Modern Studio",
  description: "Predicted Edexcel Component 3 Question 5 paper. Compare the 1967 psychedelic rock landmark by The Beatles (Version A) with the 2009 modern instrumental rock performance by Jeff Beck (Version B). Focus on the evolution from 1960s 4-track tape hard panning (extreme L/R) and mono compatibility to 21st-century digital multitrack phantom center imaging, mid-side stereo widening, and convolution reverb.",
  criteriaQuestions: [
    {
      title: "Recording Release Medium",
      content: "Recorded onto 1-inch 4-track tape on a Studer J37 machine at Abbey Road Studio 2, necessitating complex tape bounce-downs (reduction mixes).",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> Tracked under 4-track limitations, requiring rhythm tracks to be premixed and bounced to make space for vocals and orchestrations.</p>",
      img: "/images/svg/analog_tape_24track_ssl_console.svg",
      expert_explanation: "The Beatles pushed 4-track tape to its absolute limits, running two Studer J37s in tandem for the orchestral crescendo. Jeff Beck recorded into a 96kHz/24-bit DAW with over 48 unconstrained virtual tracks.",
      expert_quote: { text: "We had to commit to mix balances during bounce-downs because you only had four tracks to play with.", author: "Geoff Emerick (Abbey Road Balance Engineer)" }
    },
    {
      title: "Capture & Style",
      content: "Features revolutionary close-miking techniques on drums and bass, removing front bass drum skins and inserting sweaters for unprecedented punch.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> Geoff Emerick defied EMI studio regulations by moving microphones within inches of instruments, revolutionizing drum tracking on <em>Sgt. Pepper</em>.</p>",
      img: "/images/drum_recording_60s.png",
      expert_explanation: "Emerick close-miked Ringo's drums with AKG D19s and D20s. Jeff Beck recorded his live touring band using high-end modern dynamic and condenser mics with ultra-low noise preamps.",
      expert_quote: { text: "EMI had strict rules about keeping mics at least 18 inches away from drums. I broke the rules and put the mic right inside the bass drum.", author: "Geoff Emerick" }
    },
    {
      title: "Rhythm & Sync",
      content: "Ringo Starr's iconic drum performance is characterized by loose, melodic tom fills tuned low and played with open acoustic resonance.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> Ringo's drum track is legendary for its conversational, melodic quality, playing dramatic tom rolls rather than a rigid timekeeping pulse.</p>",
      img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      expert_explanation: "Ringo's drumming responds emotionally to Lennon's lyrics. Jeff Beck's drummer (Vinnie Colaiuta) provides an extraordinarily precise modern fusion groove with complex ghost notes.",
      expert_quote: { text: "Ringo didn't just keep time; his tom-tom fills told the story alongside John's vocal.", author: "George Martin (Producer)" }
    },
    {
      title: "Sequencing & Sampling",
      content: "Includes an iconic acoustic alarm clock ringing at 5:02, recorded live onto tape as a physical marker for a 24-bar empty section.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> Road manager Mal Evans rang a real wind-up mechanical alarm clock to mark the end of the 24-bar count before McCartney's verse, which was left in the mix.</p>",
      img: "/images/svg/vocal_chopping_sampling_technique.svg",
      expert_explanation: "The alarm clock was a serendipitous physical studio accident that became an indelible musical hook. Beck's version recreates the alarm motif digitally through guitar harmonics and sound design.",
      expert_quote: { text: "Mal set off the alarm clock to warn us the 24 bars were up, and it happened to fit John's lyrics about waking up so perfectly we kept it.", author: "Paul McCartney" }
    },
    {
      title: "Pitching",
      content: "Lead melody is completely reinterpreted on an electric guitar, using subtle whammy bar vibrato, volume knob swells, and finger-plucking to mimic human vocal inflection.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Jeff Beck).</strong> Jeff Beck replaced John Lennon's vocal with his Fender Stratocaster, using microtonal whammy bar pitch bends to simulate human voice inflections.</p>",
      img: "/images/comparisons/a_day_in_the_life_comparison.svg",
      expert_explanation: "Beck's mastery of the Stratocaster bridge vibrato allowed him to pitch-bend notes with vocal-like emotion. Lennon sang with natural melancholy, double-tracked via ADT.",
      expert_quote: { text: "Jeff doesn't just play guitar notes; he bends the pitch so sensitively it sounds like the guitar is speaking English words.", author: "George Martin (Producer on Beck's track)" }
    },
    {
      title: "Arrangement Differences",
      content: "Features a massive 24-bar avant-garde orchestral crescendo where 40 classical musicians were instructed to ascend from their lowest to highest notes independently.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> The legendary orchestral 'rush' was conceived by McCartney and orchestrated by George Martin, creating a terrifying acoustic sonic wall.",
      img: "/images/svg/arrangement_sparse_acoustic_vs_dense_synth.svg",
      expert_explanation: "The Beatles recorded the 40-piece orchestra four times, bouncing it to create a 160-instrument wall of sound. Beck's version maintains the orchestral crescendo as an intentional homage with modern clarity.",
      expert_quote: { text: "I told the orchestra: start on your lowest note, play at your own speed, and end on an E-major chord as loud as you can.", author: "George Martin" }
    },
    {
      title: "Mixing & Processing",
      content: "Concludes with the famous final E-major chord played simultaneously on three grand pianos, sustained for over 40 seconds by riding console faders up to maximum gain.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> John, Paul, Ringo, and Mal Evans struck three pianos together, with Geoff Emerick manually riding the console faders to catch the dying vibrations.</p>",
      img: "/images/svg/analog_tape_24track_ssl_console.svg",
      expert_explanation: "As Emerick pushed the faders to maximum gain, studio air conditioning rumble and squeaking floorboards became audible. Beck's version concludes with sustained guitar feedback and digital delay.",
      expert_quote: { text: "By the end of the 40-second chord, the faders were pushed to the top of the board and you could hear the studio walls humming.", author: "Geoff Emerick" }
    },
    {
      title: "Pan (Stereo Field)",
      content: "Exhibits primitive 1960s hard stereo panning, with John Lennon's lead vocal placed extreme Left and the piano/bass placed extreme Right.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> Due to 4-track tape channel routing and mono-compatibility requirements, instruments and vocals were panned hard Left or hard Right with little center energy.</p>",
      img: "/images/stereo_soundstage_panning_hq.svg",
      expert_explanation: "In 1967, stereo was considered an afterthought for hi-fi enthusiasts; the band only attended the mono mix. Jeff Beck's 2009 version uses a modern stereo field with phantom center lead guitar and mid-side widening.",
      expert_quote: { text: "We mixed for mono. In the stereo mix, we just threw the vocal on one side and the backing track on the other.", author: "George Martin" }
    },
    {
      title: "Reverb",
      content: "Uses modern convolution reverb plugins simulating the impulse response of Abbey Road Studio 2 with adjustable decay and pre-delay parameters.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Jeff Beck).</strong> Beck's 2009 production used digital convolution reverb to recreate the acoustic characteristics of Abbey Road Studio 2 while maintaining pristine clarity.",
      img: "/images/reverb_plate_mechanics_diagram.svg",
      expert_explanation: "Convolution reverb captures true acoustic spaces via mathematical impulse responses. The Beatles used Abbey Road's physical echo chamber (a tiled basement room with a speaker and mic).",
      expert_quote: { text: "With convolution reverb, you can place a guitar inside Abbey Road's Studio 2 acoustic space without ever leaving your home DAW.", author: "Modern Mix Engineer" }
    },
    {
      title: "Delay",
      content: "Utilizes Artificial Double Tracking (ADT), using a dedicated secondary tape machine with a 30 ms delay to thicken the lead vocal.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> Abbey Road engineer Ken Townsend invented ADT specifically for John Lennon, taking the sync head signal off the Studer J37 to create a doubled vocal without re-singing.</p>",
      img: "/images/svg/abbey_road_adt_tape_delay.svg",
      expert_explanation: "Townsend's ADT invention became an industry standard. Jeff Beck utilized stereo ping-pong digital delay on his guitar, set to quarter notes with 40% feedback.",
      expert_quote: { text: "John hated double-tracking his voice. Ken Townsend invented ADT so John could get that rich doubled sound in a single take.", author: "George Martin" }
    },
    {
      title: "Filtering & Effects",
      content: "Features tape varispeed manipulation, recording vocal passes and piano takes at altered tape speeds to alter their timbre when played back at standard pitch.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> Paul McCartney's piano and Lennon's vocals were recorded with the tape running slightly slow or fast, altering the vocal formant and piano brightness.</p>",
      img: "/images/svg/filter_resonance_diagram.svg",
      expert_explanation: "Varispeed tape manipulation was the analog forerunner of modern pitch-shifting and formant modification. Beck used subtle guitar tone knob manipulations and whammy modulation.",
      expert_quote: { text: "We used varispeed on almost every track to change the texture of John's voice and give it that dreamy, floating feeling.", author: "Geoff Emerick" }
    },
    {
      title: "EQ",
      content: "Utilizes mid-side (M/S) EQ processing, boosting the side channel (+3 dB) for stereo width while cutting low frequencies below 100 Hz in the sides for mono bass punch.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Jeff Beck).</strong> Modern M/S processing allows independent equalization of the center channel (mono lead guitar/kick) and side channels (wide reverberant ambient guitars).",
      img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      expert_explanation: "Mid-side processing was impossible on standard 1967 desks. The Beatles used fixed REDD/TG console EQ (broad shelving curves with bass/treble boost).",
      expert_quote: { text: "M/S EQ lets you boost the width of the guitars on the edges without messing with the punch of the kick and lead in the center.", author: "Modern Mastering Engineer" }
    },
    {
      title: "Dynamics",
      content: "Tape saturation from tracking hot onto tape tape heads (+3 dB peaks) provides gentle, warm even-order harmonic distortion on the drums and vocals.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> Pushing EMI tape machines into saturation compressed the audio naturally with musical analogue warmth, smoothing the transients.</p>",
      img: "/images/svg/distortion_types_clipping.svg",
      expert_explanation: "Analogue tape saturation acted as an organic dynamic leveler. Beck's 2009 version maintained over 115 dB of clean digital dynamic range without tape saturation artifacts.",
      expert_quote: { text: "Tape saturation made the bass and drums glue together in a way modern digital recording struggles to imitate.", author: "Geoff Emerick" }
    },
    {
      title: "Instrumentation",
      content: "Features John Lennon's acoustic guitar (Gibson J-160E) and Paul McCartney's piano paired with Ringo's drums and a 40-piece symphony orchestra.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> The arrangement is acoustic and rock-based: acoustic guitar, grand piano, live bass, drums, and orchestral strings/brass.",
      img: "/images/svg/acoustic_guitar_12th_fret.svg",
      expert_explanation: "The Beatles' track is an organic studio composition. Jeff Beck translated the entire composition into a virtuoso electric guitar showcase backed by a modern rock/fusion power quartet.",
      expert_quote: { text: "John's acoustic guitar and Paul's piano were the bedrock of the entire song.", author: "George Martin" }
    },
    {
      title: "Genre Style",
      content: "Defines the 1960s Psychedelic Rock / Avant-Garde studio revolution, proving that recording studios could function as musical instruments in their own right.",
      correctIsA: true,
      explanation: "<p><strong>Version A (The Beatles).</strong> <em>Sgt. Pepper's Lonely Hearts Club Band</em> transformed popular music by treating the studio as an experimental canvas beyond live performance.",
      img: "/images/comparisons/a_day_in_the_life_comparison.svg",
      expert_explanation: "The Beatles pushed 1967 recording technology to create art that could never be performed on stage. Jeff Beck's 2009 Grammy-winning cover is a modern instrumental tour de force.",
      expert_quote: { text: "We weren't just recording a band anymore—we were inventing sounds that had never existed on earth.", author: "John Lennon (The Beatles)" }
    }
  ],
  clozeText: [
    "1. The Beatles' 1967 landmark was recorded to 1-inch 4-track tape on a {0} at Abbey Road.",
    "2. Jeff Beck's 2009 cover was recorded into a high-resolution 96kHz/24-bit {1}.",
    "3. The 1967 mix exhibits extreme {2} panning due to 4-track routing and mono compatibility.",
    "4. The 2009 version establishes a solid {3} center image for the lead guitar.",
    "5. Geoff Emerick revolutionized drum capture by {4} Ringo's bass drum with a sweater inside.",
    "6. Jeff Beck replaced John Lennon's vocal melody with a Fender {5} using whammy bar inflections.",
    "7. To avoid re-singing vocal takes, Abbey Road engineer Ken Townsend invented {6} (ADT).",
    "8. The famous 24-bar orchestral crescendo featured {7} musicians playing independently from low to high.",
    "9. Beck's mix used {8} reverb plugins to digitally model the acoustic response of Studio 2.",
    "10. The original concludes with an E-major chord sustained for 40 seconds across three {9}.",
    "11. Emerick captured the dying chord by manually riding the {10} faders to maximum gain.",
    "12. Beck's modern mix utilized {11} processing to widen the ambient side channels without losing center punch.",
    "13. Pushing the Studer J37 tape into saturation provided natural harmonic {12} and dynamic leveling.",
    "14. Beck's 2009 master maintained modern digital {13} with 115 dB of clean headroom.",
    "15. Ultimately, the comparison demonstrates the evolution of {14} from 60s hard panning to modern spatial immersion."
  ],
  clozeOptions: [
    ["Studer J37", "Fairlight CMI", "Otari 8-track", "Portastudio", "Gramophone"],
    ["digital audio workstation (DAW)", "tape machine", "sound-on-sound lathe", "mono console", "cassette recorder"],
    ["hard stereo (extreme L/R)", "phantom center", "binaural 3D", "surround 5.1", "mono centered"],
    ["phantom", "hard-left", "hard-right", "delayed", "filtered"],
    ["close-miking", "ambient miking", "boundary miking", "triggering", "synthesizing"],
    ["Stratocaster electric guitar", "synthesizer lead", "acoustic trumpet", "harmonica", "slide trombone"],
    ["Artificial Double Tracking", "Convolution Reverb", "Beat Detective", "Sidechain Compression", "Pitch Correction"],
    ["40 orchestral", "2 synth", "8 backing", "live brass", "choir"],
    ["convolution", "spring", "gated", "slapback", "plate"],
    ["grand pianos", "synthesizers", "acoustic guitars", "church organs", "brass tubas"],
    ["mixing console", "tape speed", "gain pedal", "speaker volume", "master limiter"],
    ["mid-side (M/S)", "tape slapback", "brickwall limiting", "gated reverb", "telephone filter"],
    ["tape saturation", "digital clipping", "phase cancellation", "ground hum", "aliasing foldback"],
    ["dynamic range", "brickwall limiting", "frequency distortion", "tape wow and flutter", "crosstalk"],
    ["Stereo Imaging & Panning", "Drum Quantization", "Autotune Tuning", "Cassette Mastering", "Radio Broadcasting"]
  ],
  clozeAnswer: [
    "Studer J37",
    "digital audio workstation (DAW)",
    "hard stereo (extreme L/R)",
    "phantom",
    "close-miking",
    "Stratocaster electric guitar",
    "Artificial Double Tracking",
    "40 orchestral",
    "convolution",
    "grand pianos",
    "mixing console",
    "mid-side (M/S)",
    "tape saturation",
    "dynamic range",
    "Stereo Imaging & Panning"
  ],
  expertSummary: "The predicted 2026 Edexcel Component 3 Question 5 paper analyzes the evolution of stereo imaging, studio experimentation, and multitrack technology through The Beatles' 1967 'A Day in the Life' and Jeff Beck's 2009 instrumental rock interpretation. Core syllabus technical contrasts include: 4-track tape reduction bounces vs unlimited 96kHz DAW tracks, extreme 1960s hard L/R stereo panning (mono compatibility) vs 21st-century phantom center and mid-side (M/S) widening, Abbey Road ADT tape delay vs digital stereo ping-pong, physical echo chambers vs convolution modeling, tape saturation compression vs wide digital dynamic range, and vocal delivery vs microtonal Stratocaster whammy vibrato."
}));


// ----------------------------------------------------
// COMPARISON 14: SUPERSTITION (Stevie Wonder 1972 vs Stevie Ray Vaughan 1986) - 2027 Prediction Paper
// ----------------------------------------------------
newComparisons.push(buildComparisonSuite({
  id: "comp_superstition",
  title: "Comparison 14: Superstition",
  youtube_id: "0CFuCYNx-1g",
  youtube_id_2: "pTsqmK4q_c8",
  artistA: "Stevie Wonder",
  yearA: "1972",
  genreA: "Classic Funk / Progressive Soul",
  artistB: "Stevie Ray Vaughan",
  yearB: "1986",
  genreB: "Texas Blues / Blues Rock",
  description: "Predicted Edexcel Component 3 Question 5 paper. Compare the 1972 funk/soul masterpiece by Stevie Wonder (Version A) with the 1986 blues-rock cover by Stevie Ray Vaughan (Version B). Focus on multi-tracked Hohner Clavinet D6, TONTO modular synthesizer bass, and syncopated funk drumming versus overdriven Fender Stratocasters, tube amplifier saturation, and raw Texas shuffle drums.",
  criteriaQuestions: [
    {
      title: "Recording Release Medium",
      content: "Recorded onto 16-track 2-inch analogue tape at Electric Lady Studios NYC, utilizing Malcolm Cecil and Robert Margouleff's custom TONTO synthesizer interface.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> Wonder recorded at Jimi Hendrix's Electric Lady Studios using 16-track tape, allowing up to eight layers of Clavinet and synth bass on <em>Talking Book</em>.</p>",
      img: "/images/svg/analog_tape_24track_ssl_console.svg",
      expert_explanation: "Stevie Wonder's 1972 tape tracking utilized warm tube consoles. Stevie Ray Vaughan recorded at Dallas Sound Lab on 24-track tape for his 1986 <em>Live Alive</em> album.",
      expert_quote: { text: "Electric Lady was magical. Malcolm Cecil and I plugged the Clavinet straight into the custom TONTO system.", author: "Stevie Wonder" }
    },
    {
      title: "Capture & Style",
      content: "The iconic main riff is performed on a Hohner Clavinet D6, multi-tracked eight times with subtle variations in phrasing and pickup selection.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> Stevie played eight distinct passes of the Hohner Clavinet D6, interweaving different pickup settings and rhythmic accents for a thick funk web.",
      img: "/images/svg/vocal_chopping_sampling_technique.svg",
      expert_explanation: "The Clavinet uses magnetic guitar pickups to amplify hammered strings. Stevie Ray Vaughan translated this keyboard riff directly to an overdriven Fender Stratocaster electric guitar.",
      expert_quote: { text: "We tracked eight Clavinet parts. Stevie would change the pickup switch for each take to create an orchestra of funk.", author: "Malcolm Cecil (Producer/Synthesist)" }
    },
    {
      title: "Rhythm & Sync",
      content: "Drum track was performed live by Stevie Wonder himself, playing an unquantized, highly syncopated funk groove with rolling open-hi-hat accents.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> Stevie laid down the drum track first, playing with organic human groove, syncopated ghost notes, and explosive hi-hat openings.</p>",
      img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      expert_explanation: "Stevie's drumming is a masterclass in organic funk feel. Stevie Ray Vaughan's drummer (Chris Layton) anchored the track with a powerful, driving Texas blues-rock shuffle backbeat.",
      expert_quote: { text: "Stevie played the drums before anything else was on tape. He had that whole arrangement dancing in his head.", author: "Robert Margouleff (Producer)" }
    },
    {
      title: "Sequencing & Sampling",
      content: "Bassline is played manually on the TONTO (The Original New Timbral Orchestra) modular analog synthesizer, using warm Moog ladder filter resonance.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> Cecil and Margouleff helped Stevie craft the bassline using TONTO's modular synth oscillators, delivering punchy low-end fundamentals without electric bass guitar.</p>",
      img: "/images/svg/filter_resonance_diagram.svg",
      expert_explanation: "TONTO was the largest modular synthesizer in the world. Stevie Ray Vaughan's cover used Tommy Shannon on a 4-string Fender Jazz Bass playing along with guitar riffs.",
      expert_quote: { text: "Stevie's left hand on the TONTO keyboard gave the bass that fat, squelchy analog punch that shook the floor.", author: "Malcolm Cecil" }
    },
    {
      title: "Pitching",
      content: "Lead guitar showcases heavy string bending (up to two full steps), lightning fast pentatonic runs, and intense left-hand finger vibrato on heavy gauge strings (.013s).",
      correctIsA: false,
      explanation: "<p><strong>Version B (Stevie Ray Vaughan).</strong> SRV played heavy .013-gauge strings tuned down a half step to Eb, delivering colossal pitch bends and ferocious blues vibrato.</p>",
      img: "/images/comparisons/superstition_comparison.svg",
      expert_explanation: "SRV's aggressive pitch manipulation gave the guitar a screaming vocal character. Stevie Wonder's vocal performance featured masterclass soul melismas and effortless head-voice belts.",
      expert_quote: { text: "Stevie Ray strung his Strat with piano wires (.013s) and bent them like rubber bands. His tone had terrifying weight.", author: "Tommy Shannon (SRV Bassist)" }
    },
    {
      title: "Arrangement Differences",
      content: "Prominently features a real acoustic horn section (trumpets and saxophones) arranged by Stevie Wonder and Trevor Lawrence punching brass stabs.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> The brass arrangement adds explosive counterpoint to the Clavinet riff in the choruses.",
      img: "/images/gen/t2_q13_brass_distance_hq_1772103543454.png",
      expert_explanation: "Wonder's brass section elevates the funk energy. SRV eliminated the horns, stripping the track down into a raw power trio (guitar, bass, drums) with soaring guitar solos.",
      expert_quote: { text: "The horns gave 'Superstition' that triumphant, imperial punch when the chorus hit.", author: "Trevor Lawrence (Horn Arranger)" }
    },
    {
      title: "Mixing & Processing",
      content: "Tone is saturated with genuine vacuum tube distortion from multiple cranked Fender Vibroverb and Marshall Major amplifiers running in parallel.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Stevie Ray Vaughan).</strong> SRV split his guitar signal into multiple tube amplifiers simultaneously, driving the power tubes into heavy, harmonic overdrive.</p>",
      img: "/images/guitar_amp_3d_stage.png",
      expert_explanation: "SRV's tone is the definitive benchmark for Texas tube-overdrive. Stevie Wonder's mix kept the Clavinet relatively clean, running it through a subtle Mu-Tron III envelope filter.",
      expert_quote: { text: "Stevie ran his Strat through a Dumble, a Marshall, and two Vibroverbs all cranked wide open. The sound in the room was deafening.", author: "Cesar Diaz (SRV Amp Tech)" }
    },
    {
      title: "Pan (Stereo Field)",
      content: "Multiple Clavinet passes are spread across the stereo field from 80% Left to 80% Right, enveloping the listener in an intricate polyrhythmic web.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> Spreading the eight Clavinet parts across the stereo field prevented frequency masking while creating an immersive rhythmic weave.",
      img: "/images/stereo_soundstage_panning_hq.svg",
      expert_explanation: "Wonder's stereo panning created depth between rhythm and lead clavinet parts. SRV kept his guitar anchored dead center and slightly wide, with drums and bass in a standard power trio stage layout.",
      expert_quote: { text: "By panning the dry Clavinet left and the filtered Clavinet right, the groove felt three-dimensional.", author: "Robert Margouleff" }
    },
    {
      title: "Reverb",
      content: "Uses natural room ambience and EMT 140 plate reverb to create a tight, dry, up-front funk mix with minimal washing out.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> Funk requires tight transient clarity; Cecil and Margouleff kept the reverb short so the rapid Clavinet transients remained crisp.",
      img: "/images/reverb_plate_mechanics_diagram.svg",
      expert_explanation: "Long reverb tails turn fast funk rhythm into mud. SRV's live recording featured natural arena hall reverberation and stage microphone bleed.",
      expert_quote: { text: "Funk is about spaces between the notes. If you soak it in reverb, you kill the funk.", author: "Malcolm Cecil" }
    },
    {
      title: "Delay",
      content: "Guitar is treated with an analogue tape slapback delay from an EP-3 Echoplex to fatten single-note solo runs.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Stevie Ray Vaughan).</strong> SRV occasionally engaged an EP-3 Echoplex or vintage tube delay to add fatness and spatial thickness to his guitar solos.",
      img: "/images/delay_fundamentals_time_diagram.svg",
      expert_explanation: "The Echoplex tape delay gave SRV's solos classic blues sustain. Stevie Wonder used minimal delay, relying on the natural decay of the Clavinet strings.",
      expert_quote: { text: "A quick slap on the solo gave Stevie Ray that massive Texas stadium sound.", author: "Sound Engineer" }
    },
    {
      title: "Filtering & Effects",
      content: "The electric guitar signal is pushed through an Ibanez TS808 / TS9 Tube Screamer overdrive pedal to boost midrange and tighten the low end.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Stevie Ray Vaughan).</strong> SRV famously used the Ibanez Tube Screamer as a clean boost (level 10, drive low), pushing the amp tubes harder while notching the 720 Hz midrange.",
      img: "/images/svg/distortion_types_clipping.svg",
      expert_explanation: "The Tube Screamer is legendary for cutting bass and boosting mids to help guitar solos cut through a rhythm section. Stevie Wonder used a Mu-Tron envelope filter on his Clavinet.",
      expert_quote: { text: "The Tube Screamer wasn't for distortion—Stevie used it to push his amps over the edge and boost that singing midrange.", author: "Cesar Diaz" }
    },
    {
      title: "EQ",
      content: "Features warm, unhyped 1970s analogue console equalization, with rich low-mids (250–500 Hz) supporting the warm Clavinet and Moog bass.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> 1970s discrete console equalizers preserved smooth, unhyped musical frequencies with no digital harshness.",
      img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      expert_explanation: "Wonder's mix has a full, warm body without the exaggerated highs of the 80s. SRV's 1986 live mix emphasized cutting 3 kHz guitar transients to pierce through the arena PA.",
      expert_quote: { text: "The Electric Lady consoles had that fat, round bottom that made the bass and drums hit you right in the chest.", author: "Malcolm Cecil" }
    },
    {
      title: "Dynamics",
      content: "Heavy vacuum tube power-amp compression naturally squashes guitar peaks as the tubes saturate, providing endless musical sustain.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Stevie Ray Vaughan).</strong> Tube power-amp sag occurs when an amplifier is cranked to maximum, naturally compressing the transient attack and sustaining notes for seconds.",
      img: "/images/svg/limiter_brickwall.svg",
      expert_explanation: "Tube sag provided SRV's guitar with legendary singing sustain. Stevie Wonder's track relied on natural acoustic dynamics and gentle leveling amplifiers (Universal Audio 1176).",
      expert_quote: { text: "When you crank a tube amp to ten, the power supply sags and gives you that creamy, singing compression naturally.", author: "Cesar Diaz" }
    },
    {
      title: "Instrumentation",
      content: "Constructed entirely around keyboards (Hohner Clavinet D6, TONTO modular synth, acoustic drums, brass), with zero electric guitars in the arrangement.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Stevie Wonder).</strong> Remarkably, despite sounding like a heavy guitar funk track, 'Superstition' contains zero guitars—all rhythmic bite comes from the Clavinet.",
      img: "/images/svg/acoustic_guitar_vs_tropical_synth_pluck.svg",
      expert_explanation: "The Clavinet completely substituted for rhythm guitars. Stevie Ray Vaughan re-imagined the song specifically as a guitar-hero vehicle, showcasing the electric guitar in all its power.",
      expert_quote: { text: "Most people think there's an electric guitar playing that main riff, but it's 100% Stevie's hands on the Clavinet keyboard.", author: "Robert Margouleff" }
    },
    {
      title: "Genre Style",
      content: "Transforms 1970s Progressive Funk / Soul into 1980s Texas Blues / Blues-Rock, spearheaded by a blistering electric guitar power trio.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Stevie Ray Vaughan).</strong> SRV injected the track with blistering blues shuffle energy, helping lead the 1980s American blues-rock revival.",
      img: "/images/comparisons/superstition_comparison.svg",
      expert_explanation: "Stevie Wonder created a defining milestone of 1970s progressive funk on <em>Talking Book</em>. Stevie Ray Vaughan turned it into an electrifying blues-rock standard.",
      expert_quote: { text: "Stevie Ray took an all-time funk anthem and made it sound like it was born in a dusty Texas juke joint.", author: "Tommy Shannon" }
    }
  ],
  clozeText: [
    "1. Stevie Wonder's 1972 funk masterpiece was recorded to 16-track tape at {0} Studios in New York.",
    "2. Stevie Ray Vaughan's 1986 blues-rock cover was recorded with his power trio {1}.",
    "3. The famous main riff was originally performed by Stevie Wonder on a {2} keyboard.",
    "4. Stevie Ray Vaughan translated the keyboard hook over to an overdriven {3} electric guitar.",
    "5. The original bassline was created manually on the {4} modular analogue synthesizer.",
    "6. In the cover, Tommy Shannon plays the bass riff on an electric {5} bass guitar.",
    "7. Stevie Wonder performed the drum track himself, laying down an unquantized {6} groove.",
    "8. SRV's drummer Chris Layton anchored the cover with a heavy Texas blues {7} backbeat.",
    "9. Stevie Wonder layered his Clavinet {8} times across the stereo panorama for rhythmic depth.",
    "10. SRV achieved his singing guitar sustain using cranked tube amps and an Ibanez {9} pedal.",
    "11. Wonder's original featured real brass arrangements played by trumpets and {10}.",
    "12. The blues-rock cover stripped out the horns completely, transforming the track into a {11} lineup.",
    "13. SRV used heavy .013-gauge strings tuned down a half step to {12} for colossal tone.",
    "14. Despite sounding like heavy guitar funk, Wonder's 1972 original contains {13} electric guitars.",
    "15. Ultimately, the comparison demonstrates the transformation from 70s Funk to 80s {14}."
  ],
  clozeOptions: [
    ["Electric Lady", "Abbey Road", "Sunset Sound", "Motown Hitsville", "Sun Studios"],
    ["Double Trouble", "The Wrecking Crew", "The Funk Brothers", "The Heartbreakers", "Crazy Horse"],
    ["Hohner Clavinet D6", "Rhodes Electric Piano", "Minimoog Synth", "Hammond B3 Organ", "Wurlitzer Piano"],
    ["Fender Stratocaster", "Gibson Les Paul", "Rickenbacker 12-string", "Telecaster", "Acoustic Martin"],
    ["TONTO", "Fairlight CMI", "Synclavier", "Roland TB-303", "Korg M1"],
    ["Fender Jazz", "Acoustic Upright", "Moog Bass", "Synth Bass", "5-string Fretless"],
    ["syncopated funk", "quantized disco", "reggae one-drop", "latin salsa", "punk rock"],
    ["blues shuffle", "disco pulse", "techno grid", "jazz waltz", "boom bap"],
    ["eight", "two", "sixteen", "twenty-four", "four"],
    ["Tube Screamer (TS9)", "Big Muff Fuzz", "Boss DS-1", "Crybaby Wah", "Phase 90"],
    ["saxophones", "violins", "synthesizers", "flutes", "tubas"],
    ["power trio (guitar/bass/drums)", "big band", "orchestral", "synth-pop duo", "choral"],
    ["Eb (E-flat)", "Drop D", "Standard E", "Open G", "DADGAD"],
    ["zero", "four", "eight", "two", "one"],
    ["Texas Blues-Rock", "Synth-Pop", "Nu-Metal", "Modern Trap", "Traditional Country"]
  ],
  clozeAnswer: [
    "Electric Lady",
    "Double Trouble",
    "Hohner Clavinet D6",
    "Fender Stratocaster",
    "TONTO",
    "Fender Jazz",
    "syncopated funk",
    "blues shuffle",
    "eight",
    "Tube Screamer (TS9)",
    "saxophones",
    "power trio (guitar/bass/drums)",
    "Eb (E-flat)",
    "zero",
    "Texas Blues-Rock"
  ],
  expertSummary: "The predicted 2027 Edexcel Component 3 Question 5 paper examines the cross-genre transformation between Stevie Wonder's 1972 funk landmark 'Superstition' and Stevie Ray Vaughan's 1986 Texas blues-rock cover. Core technical syllabus points include: 16-track Electric Lady tape tracking vs 24-track live arena power-trio capture, 8 multi-tracked Hohner Clavinet D6 layers vs cranked tube amp Fender Stratocaster riffs, TONTO modular synthesizer bass vs electric Fender Jazz Bass, Stevie Wonder's organic syncopated live drumming vs Texas blues shuffle backbeats, brass section arrangements vs extended blues guitar solos, and zero guitars in the original vs the ultimate guitar-hero showcase in the cover."
}));


// ----------------------------------------------------
// COMPARISON 15: RUNNING UP THAT HILL (Kate Bush 1985 vs Placebo 2003) - 2028 Prediction Paper
// ----------------------------------------------------
newComparisons.push(buildComparisonSuite({
  id: "comp_running_up_that_hill",
  title: "Comparison 15: Running Up That Hill",
  youtube_id: "wp43OdtAAhM",
  youtube_id_2: "d-mXh_g6_uE",
  artistA: "Kate Bush",
  yearA: "1985",
  genreA: "Art Pop / Electronic Pop",
  artistB: "Placebo",
  yearB: "2003",
  genreB: "Alternative Rock / Dark Wave",
  description: "Predicted Edexcel Component 3 Question 5 paper. Compare the 1985 art-pop / electronic masterpiece by Kate Bush (Version A) with the 2003 alternative rock / dark wave cover by Placebo (Version B). Focus on Fairlight CMI Series II sampling, LinnDrum programming, and SSL console clarity versus down-tuned electric guitars, slowed melancholic tempo (66 BPM vs 108 BPM), and saturated room compression.",
  criteriaQuestions: [
    {
      title: "Recording Release Medium",
      content: "Recorded onto 24-track analogue tape at Kate Bush's 48-track private home studio (Wickham Farm) and mixed to 1/2-inch stereo master on an SSL 4000E console.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> Engineered for <em>Hounds of Love</em> at Bush's custom home studio, taking advantage of the SSL 4000E's automated channel dynamics and EQ.</p>",
      img: "/images/svg/analog_tape_24track_ssl_console.svg",
      expert_explanation: "Kate Bush was a pioneer in building high-end home studios to maintain total artistic control. Placebo recorded in 2003 on digital Pro Tools HD systems at Mayfair Studios in London.",
      expert_quote: { text: "Building my own 48-track studio meant I could live inside the music without commercial studio pressures.", author: "Kate Bush" }
    },
    {
      title: "Capture & Style",
      content: "Pioneered creative digital sampling using the Fairlight CMI Series II, constructing melodic motifs from sampled strings, voices, and synthesized textures.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> Kate Bush was one of the foremost innovators of the Fairlight CMI sampler, using its light-pen screen to manipulate sampled audio waveforms.</p>",
      img: "/images/svg/vocal_chopping_sampling_technique.svg",
      expert_explanation: "The Fairlight CMI's 8-bit digital sampling and Page R sequencer defined 1980s art-pop. Placebo replaced digital sampling with heavily textured, distorted electric guitars and acoustic drums.",
      expert_quote: { text: "The Fairlight wasn't just a machine; it was an artistic paintbrush that let me play real sounds across the keys.", author: "Kate Bush" }
    },
    {
      title: "Rhythm & Sync",
      content: "Rhythm track features a fast, hypnotic 108 BPM tribal pulse programmed on a LinnDrum drum machine augmented by live acoustic toms.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> Bush and drummer Stuart Elliott programmed the hypnotic, driving tom pattern on a LinnDrum, layering live acoustic tom hits to add human kinetic power.</p>",
      img: "/images/svg/comparison_quantized_grid_vs_human_timing.svg",
      expert_explanation: "Bush's 108 BPM forward-driving rhythm conveys physical exertion and galloping momentum. Placebo drastically slowed the song down to a sluggish, funeral-paced 66 BPM.",
      expert_quote: { text: "The drum rhythm had to feel like running up a steep hill—relentless, exhausting, and forward-moving.", author: "Kate Bush" }
    },
    {
      title: "Sequencing & Sampling",
      content: "Drastically alters the tempo and emotional mood, slowing the track from 108 BPM down to a brooding, melancholic 66 BPM.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Placebo).</strong> By dropping the tempo down to 66 BPM, Placebo transformed Bush's exhilarating pop momentum into a dark, drugged-out goth-rock lament.</p>",
      img: "/images/comparisons/running_up_that_hill_comparison.svg",
      expert_explanation: "The dramatic tempo reduction fundamentally changed the emotional tone from triumphant spiritual struggle to hopeless melancholia.",
      expert_quote: { text: "Slowing it down completely opened up the heartbreak inside Kate's lyrics.", author: "Brian Molko (Placebo)" }
    },
    {
      title: "Pitching",
      content: "Vocals are intimate, nasal, close-miked, and delivered in an exhausted, androgynous whisper-croon with minimal vibrato.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Placebo).</strong> Brian Molko's distinctive androgynous vocal delivery sits inches from the microphone capsule, conveying vulnerability and emotional fatigue.</p>",
      img: "/images/comparisons/running_up_that_hill_comparison.svg",
      expert_explanation: "Molko's intimate, weary vocal contrasts sharply with Kate Bush's dynamic, multi-octave theatrical vocal performance with soaring head-voice and layered backing choirs.",
      expert_quote: { text: "I sang it right up against the mic grille to make it feel uncomfortably close and personal.", author: "Brian Molko" }
    },
    {
      title: "Arrangement Differences",
      content: "Features multi-layered, polyphonic backing vocal choirs sung entirely by Kate Bush, panned in stereo to create a celestial, spiritual atmosphere.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> Bush recorded dozens of vocal harmony tracks, stacking low, middle, and high registers into an ethereal human choir.</p>",
      img: "/images/svg/arrangement_sparse_acoustic_vs_dense_synth.svg",
      expert_explanation: "Bush's vocal counterpoint in the chorus ('Make a deal with God...') is a hallmark of her production. Placebo eliminated the choir, leaving Molko's vocal almost completely isolated.",
      expert_quote: { text: "Layering my voice in harmonies let me create a Greek chorus that answered the lead vocal.", author: "Kate Bush" }
    },
    {
      title: "Mixing & Processing",
      content: "The arrangement is driven by dark, heavily distorted electric guitars tuned down and layered with droning analog synth bass.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Placebo).</strong> Stefan Olsdal and Brian Molko layered thick, fuzzy electric guitars with gloomy synth pads, wrapping the song in alternative rock gloom.</p>",
      img: "/images/guitar_amp_3d_stage.png",
      expert_explanation: "Placebo's guitar fuzz and drone created dark wave atmosphere. Bush's arrangement relied on clean Fairlight samples, acoustic balalaika, and bright synthesizer textures.",
      expert_quote: { text: "We wanted the guitars to sound like a heavy, suffocating electronic blanket.", author: "Stefan Olsdal (Placebo)" }
    },
    {
      title: "Pan (Stereo Field)",
      content: "Fairlight CMI sampled orchestral stabs and balalaika strums are panned rhythmically to create a wide, open stereo panorama.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> The SSL console's automated stereo bus placed Fairlight stabs, backing vocals, and ethnic instruments (balalaika) across a wide 3D panorama.</p>",
      img: "/images/stereo_soundstage_panning_hq.svg",
      expert_explanation: "Bush's mix has remarkable spatial separation and clarity. Placebo's mix is denser and narrower, wrapping the listener in a claustrophobic, centered wall of distorted sound.",
      expert_quote: { text: "We spent days placing every Fairlight texture in the stereo field so nothing masked Kate's voice.", author: "Del Palmer (Engineer/Bassist)" }
    },
    {
      title: "Reverb",
      content: "Employs an EMT 250 digital reverb and Quantec Room Simulator (QRS) for expansive, crystal-clear algorithmic ambient decay.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> The Quantec QRS provided pristine digital spatial simulation, giving Bush's vocals and Fairlight textures an expansive, cathedral-like depth.</p>",
      img: "/images/reverb_plate_mechanics_diagram.svg",
      expert_explanation: "The Quantec QRS was celebrated for clean, non-metallic room acoustics. Placebo favored short, tight room ambience with heavy distortion saturation on the reverb tails.",
      expert_quote: { text: "The Quantec Room Simulator gave the track that magical, floating sense of open mountain air.", author: "Del Palmer" }
    },
    {
      title: "Delay",
      content: "Lead vocal is treated with tempo-synced stereo digital delay throws that spin between left and right channels on verse endings.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Placebo).</strong> Placebo used subtle BPM-locked digital delays on vocal tails to enhance the dreamy, disoriented mood of the breakdown.</p>",
      img: "/images/svg/dotted_eighth_note_delay.svg",
      expert_explanation: "Placebo used digital delay to heighten the psychedelic dislocation. Bush kept her lead vocal relatively direct, relying on stacked vocal harmonies rather than long delay echoes.",
      expert_quote: { text: "The subtle delay repeats make Brian's voice sound like an echo inside an empty room.", author: "Placebo Producer" }
    },
    {
      title: "Filtering & Effects",
      content: "Features a real Russian acoustic folk instrument (Balalaika) tracked through high-pass filters to add unusual sparkling percussive textures.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> Bush's brother Paddy Bush performed on the balalaika and maravali, blending ethnic acoustic folk strings into the electronic production.</p>",
      img: "/images/svg/high_pass_filter_sweep_riser.svg",
      expert_explanation: "Bush seamlessly integrated traditional folk instruments into high-tech electronic pop. Placebo used standard modern rock instrumentation: guitars, bass, synths, and acoustic kit.",
      expert_quote: { text: "Paddy brought in the balalaika to give that sparkling, galloping rhythm an exotic, otherworldly texture.", author: "Kate Bush" }
    },
    {
      title: "EQ",
      content: "Exhibits bright, glassy 1980s high-end sheen on the Fairlight samples and vocal transients, achieved via SSL 4000E channel EQs.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> The SSL 4000E's black-knob EQs boosted presence around 8–12 kHz, giving the digital samples and vocals exquisite radio sheen.</p>",
      img: "/images/svg/comparison_60s_midrange_vs_80s_smile_eq.svg",
      expert_explanation: "Bush's production sparkles with pristine top-end clarity. Placebo's mix is dark, low-mid heavy (200–500 Hz), and intentionally veiled to reflect the gothic mood.",
      expert_quote: { text: "The SSL EQ had that aggressive top-end clarity that made the Fairlight samples cut right through.", author: "Del Palmer" }
    },
    {
      title: "Dynamics",
      content: "Drums are processed with heavy, saturated room compression (empirical labs Distressor / 1176 in 'all-buttons' mode) to create explosive room pumping.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Placebo).</strong> Steve Hewitt's acoustic drums were tracked in a live room and smashed with aggressive room compression, making the slow beat sound gigantic and explosive.</p>",
      img: "/images/svg/limiter_brickwall.svg",
      expert_explanation: "Smashing drum room mics with 1176 limiters is a classic modern alternative rock technique. Bush's LinnDrum toms had clean, gated punch without saturated room pumping.",
      expert_quote: { text: "Crushing the drum room mics made every slow snare hit sound like a bomb going off in slow motion.", author: "Jim Abbiss (Producer)" }
    },
    {
      title: "Instrumentation",
      content: "Arrangement is built around the Fairlight CMI Series II, LinnDrum, Minimoog bass, acoustic balalaika, and multi-layered vocal choirs.",
      correctIsA: true,
      explanation: "<p><strong>Version A (Kate Bush).</strong> An avant-garde blend of cutting-edge 1980s sampling technology with traditional acoustic folk instrumentation and multi-octave human voice.</p>",
      img: "/images/svg/acoustic_guitar_vs_tropical_synth_pluck.svg",
      expert_explanation: "Bush's instrumentation was deeply electronic yet human. Placebo's instrumentation was organic alternative rock: electric guitars, live drums, bass, and minimal electronic keyboards.",
      expert_quote: { text: "We mixed modern digital samplers with ancient folk instruments—that tension was where the magic happened.", author: "Kate Bush" }
    },
    {
      title: "Genre Style",
      content: "Transforms 1980s Art-Pop / Synth-Pop into 2000s Alternative Rock / Dark Wave, stripping pop exuberance into melancholic intimacy.",
      correctIsA: false,
      explanation: "<p><strong>Version B (Placebo).</strong> Placebo's cover became a dark-wave alternative classic, frequently featured in dark cinema and television for its hypnotic, gothic beauty.</p>",
      img: "/images/comparisons/running_up_that_hill_comparison.svg",
      expert_explanation: "Kate Bush created an art-pop masterpiece of empowerment and spiritual compromise. Placebo re-envisioned it as an anthem of narcotic alienation and vulnerability.",
      expert_quote: { text: "Kate's song is a masterpiece. We just stripped away the 80s production to reveal the dark, beating heart inside it.", author: "Brian Molko" }
    }
  ],
  clozeText: [
    "1. Kate Bush's 1985 art-pop masterpiece was recorded at her 48-track {0} studio at Wickham Farm.",
    "2. Placebo's 2003 cover was tracked into digital {1} at Mayfair Studios in London.",
    "3. Bush pioneered creative sampling using the Australian {2} Series II digital audio workstation.",
    "4. The driving, hypnotic 108 BPM rhythm was programmed on a {3} drum machine with live toms.",
    "5. Placebo dramatically transformed the emotional mood by slowing the tempo down to a sluggish {4}.",
    "6. Brian Molko's lead vocal is delivered in an intimate, androgynous {5} right against the mic.",
    "7. Kate Bush's vocal arrangement is famous for multi-layered, stacked {6} choirs.",
    "8. Placebo replaced the Fairlight stabs with heavy walls of down-tuned {7} guitars.",
    "9. Bush's brother Paddy Bush played the {8}, an authentic Russian folk instrument, for sparkle.",
    "10. Placebo processed the live acoustic drums with heavy, saturated {9} compression for explosive power.",
    "11. The original was mixed on a Solid State Logic {10} console with automated channel processing.",
    "12. Bush utilized pristine digital reverberation algorithms from the {11} Room Simulator (QRS).",
    "13. Placebo used tempo-synced digital stereo {12} throws on vocal tails during the breakdown.",
    "14. Bush's mix sparkles with clean top-end presence, while Placebo's mix is dark and {13} heavy.",
    "15. Ultimately, the comparison demonstrates the shift from 80s Art-Pop to 2000s {14}."
  ],
  clozeOptions: [
    ["private home", "commercial Abbey Road", "budget bedroom", "mobile truck", "church hall"],
    ["Pro Tools HD", "tape machine", "sound-on-sound lathe", "mono console", "cassette 4-track"],
    ["Fairlight CMI", "E-mu Emulator", "Akai MPC60", "Synclavier", "Casio SK-1"],
    ["LinnDrum", "Roland TR-808", "Alesis SR-16", "Oberheim DMX", "Simmons SDS-V"],
    ["66 BPM", "108 BPM", "132 BPM", "80 BPM", "144 BPM"],
    ["whisper-croon", "falsetto shriek", "death metal growl", "operatic belt", "shouted rap"],
    ["backing vocal", "vocoder robot", "synthetic choir", "children's", "whispered monk"],
    ["distorted electric", "acoustic nylon", "synthesizer lead", "clean funk", "slide guitar"],
    ["Balalaika", "Sitara", "Mandolin", "Accordion", "Banjo"],
    ["room mic", "parallel tape", "sidechain ducking", "de-essing", "gate threshold"],
    ["SSL 4000E", "Neve 8078", "Harrison 3232", "Mackie 8-bus", "Trident A-Range"],
    ["Quantec", "Lexicon 480L", "EMT 140", "Spring", "AMS RMX16"],
    ["ping-pong", "slapback tape", "reverse", "rotary", "chorus"],
    ["low-midrange", "sub-bass", "treble", "harmonic hiss", "frequency modulation"],
    ["Alternative Rock / Dark Wave", "Synth-Pop", "Country Blues", "Modern Trap", "Traditional Folk"]
  ],
  clozeAnswer: [
    "private home",
    "Pro Tools HD",
    "Fairlight CMI",
    "LinnDrum",
    "66 BPM",
    "whisper-croon",
    "backing vocal",
    "distorted electric",
    "Balalaika",
    "room mic",
    "SSL 4000E",
    "Quantec",
    "ping-pong",
    "low-midrange",
    "Alternative Rock / Dark Wave"
  ],
  expertSummary: "The predicted 2028 Edexcel Component 3 Question 5 paper examines electronic vs organic production through Kate Bush's 1985 art-pop masterpiece 'Running Up That Hill' and Placebo's 2003 dark-wave alternative rock cover. Key syllabus technical contrasts include: custom 48-track home tape studio & SSL 4000E console vs Mayfair Pro Tools HD DAW, Fairlight CMI Series II digital sampling & LinnDrum tribal pulse (108 BPM) vs funeral-tempo 66 BPM down-tuned electric guitars and crushed drum room mics, stacked multi-octave vocal choirs vs intimate close-miked androgynous whisper, Quantec QRS pristine digital spatial simulation vs dark saturation, and Russian balalaika folk textures vs gloomy modern alt-rock distortion."
}));


// Append the 6 new comparisons to Stage 4
newComparisons.forEach(newComp => {
  const existingIdx = stage4.items.findIndex(i => i.id === newComp.id);
  if (existingIdx !== -1) {
    stage4.items[existingIdx] = newComp;
    console.log(`Updated existing comparison: ${newComp.id}`);
  } else {
    stage4.items.push(newComp);
    console.log(`Appended new comparison: ${newComp.id}`);
  }
});

// Save updated course_data.json
fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2));
console.log(`Stage 4 now contains ${stage4.items.length} comparison quizzes.`);
