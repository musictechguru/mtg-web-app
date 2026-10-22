const fs = require('fs');
const path = require('path');

const courseDataPath = path.join(__dirname, '../src/data/course_data.json');
const campaignRoutePath = path.join(__dirname, '../src/data/campaign_route.json');

const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));
const campaignRoute = JSON.parse(fs.readFileSync(campaignRoutePath, 'utf8'));

// =========================================================================
// 1. STAGE 6 HISTORICAL QUIZZES (4 NEW QUIZZES: 10 QUESTIONS EACH)
// =========================================================================

const newHistoricalQuizzes = [
  {
    id: "quiz-history-0",
    title: "Historical Context: 1950s Rock 'n' Roll, Mono & Early Tape Pioneers",
    type: "lp_quiz",
    isPremium: false,
    description: "Explore the sonic evolution of 1950s audio engineering: sound-on-sound overdubbing, Sun Studio tape slapback, vacuum tube microphones, live-room spill, and direct lacquer cutting.",
    questions: [
      {
        title: "Q1: Tape Slapback Delay",
        content: "How did Sam Phillips generate the iconic slapback echo effect on early Sun Records recordings?",
        type: "multi_choice",
        answers: [
          { text: "Sending signal through a mechanical oil-can chamber", is_true: "no" },
          { text: "Feeding playback tape head output back to record head", is_true: "yes" },
          { text: "Placing a dynamic mic inside an empty metal milk tank", is_true: "no" },
          { text: "Modulating an optical light bulb across a photodiode", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Sam Phillips achieved slapback delay by tapping the signal off the playback head of an Ampex tape recorder and feeding it back into the record head, creating a single discrete repeat around 100-130ms determined by tape speed and head distance.",
        expert_quote: {
          text: "We didn't have outboard digital delays. The slapback came right off the Ampex tape heads.",
          author: "Sam Phillips (Sun Records Founder)"
        },
        explanation_image: {
          src: "/images/delay_slapback.svg",
          alt: "Tape Slapback Echo Diagram"
        }
      },
      {
        title: "Q2: Sound-on-Sound Overdubbing",
        content: "What technique did Les Paul pioneer to create complex multi-part guitar harmonies before multitrack tape existed?",
        type: "multi_choice",
        answers: [
          { text: "Recording each part to synchronized digital optical discs", is_true: "no" },
          { text: "Connecting twelve acoustic phonograph horns to one needle", is_true: "no" },
          { text: "Overdubbing live tracks onto existing lacquer disc grooves", is_true: "yes" },
          { text: "Running two electric guitars through one split guitar jack", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Before multitrack tape machines were manufactured, Les Paul cut audio onto acetate lacquer discs, then played along live while cutting the combined performance onto a second disc lathe, repeating the destructive process layer by layer.",
        expert_quote: {
          text: "If you made a mistake on the eleventh layer, you had to throw the disc away and start back at one.",
          author: "Les Paul"
        },
        explanation_image: {
          src: "/images/1950's tape machine.png",
          alt: "1950s Tape Machine and Disc Lathe Setup"
        }
      },
      {
        title: "Q3: Tube Condenser Microphones",
        content: "Why was the Neumann/Telefunken U47 tube microphone so prized in 1950s vocal tracking?",
        type: "multi_choice",
        answers: [
          { text: "VF14 tube and M7 capsule adding rich presence and warmth", is_true: "yes" },
          { text: "Integrated battery power pack eliminating studio AC cables", is_true: "no" },
          { text: "Digital noise gate threshold rejecting background leakage", is_true: "no" },
          { text: "Ultra-linear measurement capsule providing flat frequency", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "The Neumann U47 combined an M7 dual-diaphragm capsule with a Telefunken VF14M steel pentode tube, delivering smooth high-frequency presence around 4-5 kHz and subtle harmonic saturation that made mono vocals cut through dense rhythm sections.",
        expert_quote: {
          text: "The U47 was the first condenser mic switchable between omni and cardioid, transforming vocal capture.",
          author: "Audio Engineering Society"
        },
        explanation_image: {
          src: "/images/Neumann U47.png",
          alt: "Neumann U47 Tube Condenser Microphone"
        }
      },
      {
        title: "Q4: Acoustic Bleed Management",
        content: "In 1950s mono recording sessions, how did recording engineers balance instrument levels without fader automation?",
        type: "multi_choice",
        answers: [
          { text: "Compressing each musician with individual limiter channels", is_true: "no" },
          { text: "Positioning players at varied distances from the live mic", is_true: "yes" },
          { text: "Filtering unwanted frequencies with sharp graphic equalizers", is_true: "no" },
          { text: "Isolating all rhythm instruments inside heavy wooden booths", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "With sessions cut live to mono with few microphones, mixing was entirely acoustic: quieter vocalists stood inches from the mic while loud drum kits and brass were positioned across the room or behind baffles.",
        expert_quote: {
          text: "You didn't push a fader to balance the trumpet; you told the trumpet player to take two steps backwards.",
          author: "Bill Putnam (Universal Audio Founder)"
        },
        explanation_image: {
          src: "/images/live_room_drum_recording.jpg",
          alt: "Live Room Acoustic Setup"
        }
      },
      {
        title: "Q5: Ribbon Microphone Attenuation",
        content: "Why were figure-8 ribbon microphones like the RCA 44-BX essential for tracking live 1950s ensembles?",
        type: "multi_choice",
        answers: [
          { text: "Deep side-null rejection allowed blocking nearby bleeders", is_true: "yes" },
          { text: "High sensitivity allowed capturing quiet sources across town", is_true: "no" },
          { text: "Omnidirectional polar pattern captured room reverberation", is_true: "no" },
          { text: "Built-in low cut filters eliminated explosive plosives", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "The bidirectional (figure-8) polar pattern possesses near-infinite rejection (-30 to -40 dB) at its 90° and 270° sides. Engineers pointed the dead nulls directly at spill sources like drum kits or brass.",
        expert_quote: {
          text: "A ribbon mic's side null was the 1950s engineer's only noise gate.",
          author: "Norman Smith (EMI Recording Engineer)"
        },
        explanation_image: {
          src: "/images/RCA_44-BX_Bi-Directional_Velocity_Microphone.jpg",
          alt: "RCA 44-BX Bi-Directional Ribbon Microphone"
        }
      },
      {
        title: "Q6: Reel-to-Reel Tape Speed",
        content: "What was the technical advantage of tracking at 15 or 30 ips (inches per second) on 1950s Ampex recorders?",
        type: "multi_choice",
        answers: [
          { text: "Quadrupling maximum record time available on a 10-inch reel", is_true: "no" },
          { text: "Superior high-frequency bandwidth and higher signal-to-noise", is_true: "yes" },
          { text: "Automatic digital pitch correction synced to power frequency", is_true: "no" },
          { text: "Narrower dynamic range allowing higher broadcast compression", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Faster tape speeds spread audio wavelengths across more magnetic particles per second, dramatically extending high-frequency response beyond 15 kHz and improving the signal-to-noise ratio by lowering tape hiss.",
        expert_quote: {
          text: "Running at 15 ips made tape fidelity rival the best lacquer masters of the day.",
          author: "Jack Mullin (Audio Pioneer)"
        },
        explanation_image: {
          src: "/images/Ampex tape machine.png",
          alt: "Ampex Reel-to-Reel Tape Recorder"
        }
      },
      {
        title: "Q7: Direct-to-Disc Mastering Limits",
        content: "What physical limitation dictated the maximum low-frequency energy on 1950s vinyl master records?",
        type: "multi_choice",
        answers: [
          { text: "Excessive low frequencies caused cutter heads to lift off discs", is_true: "no" },
          { text: "High bass level caused deep grooves that could breach walls", is_true: "yes" },
          { text: "Turntable pickup cartridges overheated on loud bass signals", is_true: "no" },
          { text: "Vacuum tube cutting amps clipped into severe odd harmonics", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Deep low frequencies require wide lateral cutter excursions. Excessive out-of-phase low bass risked cutting completely through the groove wall into adjacent tracks or causing consumer phonograph styluses to skip out of the groove.",
        expert_quote: {
          text: "Mastering engineers had to monitor groove excursion through a microscope during cutting.",
          author: "Gramophone Company Technical Manual"
        },
        explanation_image: {
          src: "/images/turntable_dj.png",
          alt: "Vinyl Turntable and Grooves"
        }
      },
      {
        title: "Q8: Echo Chamber Construction",
        content: "How did studios like Universal Audio create natural artificial reverb in the mid-1950s?",
        type: "multi_choice",
        answers: [
          { text: "Broadcasting audio into dedicated basement tiled rooms", is_true: "yes" },
          { text: "Routing signal through digital charge-coupled delay chips", is_true: "no" },
          { text: "Simulating wall acoustics with early DSP algorithmic filters", is_true: "no" },
          { text: "Spinning metal pie tins inside sealed acoustic foam boxes", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Bill Putnam built dedicated acoustic reverb chambers: subterranean concrete rooms with non-parallel tiled walls, housing a high-fidelity loudspeaker at one end and a condenser microphone at the other.",
        expert_quote: {
          text: "Our echo chamber at Universal was concrete with hard plaster. You sent signal down and brought it back sweet.",
          author: "Bill Putnam"
        },
        explanation_image: {
          src: "/images/Acoustic Reverb Room.jpg",
          alt: "Acoustic Echo Chamber Construction"
        }
      },
      {
        title: "Q9: Razor Blade Tape Editing",
        content: "Why did 1950s audio engineers cut tape at a 45-degree angle rather than a 90-degree perpendicular angle?",
        type: "multi_choice",
        answers: [
          { text: "To make the adhesive splicing tape stick stronger on reels", is_true: "no" },
          { text: "To create an acoustic crossfade preventing audible clicks", is_true: "yes" },
          { text: "To prevent tape heads from wearing down on one magnetic side", is_true: "no" },
          { text: "To maintain identical tape tension across the capstan motor", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "A 45-degree diagonal splice creates a gradual transition (a mechanical crossfade of several milliseconds as the splice passes the playback gap), eliminating the loud transient 'pop' or 'click' produced by a 90-degree cut.",
        expert_quote: {
          text: "A clean 45-degree edit with an aluminum block is indistinguishable from continuous tape.",
          author: "EMI Studio Manual (1958)"
        },
        explanation_image: {
          src: "/images/tape_editing_photo.png",
          alt: "Tape Splicing Block and 45-Degree Razor Cut"
        }
      },
      {
        title: "Q10: High-Frequency Pre-Emphasis",
        content: "What was the purpose of the RIAA curve introduced in 1954 for mastering vinyl records?",
        type: "multi_choice",
        answers: [
          { text: "Doubling bass levels while cutting highs to prevent groove jump", is_true: "no" },
          { text: "Standardizing digital bit depth across all commercial releases", is_true: "no" },
          { text: "Attenuating bass and boosting highs during cut, inverted in play", is_true: "yes" },
          { text: "Compressing high transients with optical opto-resistor cells", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "The RIAA equalization curve cuts low frequencies (preventing wide groove swings) and boosts high frequencies during cutting; on playback, the preamp applies an inverse curve, restoring bass while suppressing vinyl surface hiss.",
        expert_quote: {
          text: "The RIAA curve allowed longer playing times and quieter vinyl surfaces worldwide.",
          author: "Recording Industry Association of America"
        },
        explanation_image: {
          src: "/images/eq_cut_and_boost_diagram.svg",
          alt: "RIAA Pre-Emphasis and De-Emphasis Curve"
        }
      }
    ]
  },
  {
    id: "quiz-history-6",
    title: "Historical Context: 1960s & 70s Motown, Soul & Jamaican Dub Pioneers",
    type: "lp_quiz",
    isPremium: false,
    description: "Master the defining technologies of classic R&B and Dub: Hitsville USA custom DI boxes, King Tubby filter sweeps, Space Echo feedback loops, and spring reverb crash techniques.",
    questions: [
      {
        title: "Q1: Motown Direct Injection (DI)",
        content: "How did Motown's engineering team capture James Jamerson's legendary electric bass guitar tone?",
        type: "multi_choice",
        answers: [
          { text: "Positioning dual ribbon mics 6 feet in front of an Ampeg B15", is_true: "no" },
          { text: "Routing bass through a custom 5-channel transformer DI box", is_true: "yes" },
          { text: "Recording an unamplified hollow-body bass with room mics", is_true: "no" },
          { text: "Clamping a piezoelectric crystal transducer onto the bridge", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Motown chief engineer Mike McLean built a custom direct box feeding directly into the control room tube console. Jamerson plugged straight into the DI box, giving total acoustic isolation without bleed in the small 'Snakepit' studio.",
        expert_quote: {
          text: "Jamerson never had an amp in the Snakepit. He plugged into our custom DI box upstairs.",
          author: "Bob Ohlsson (Motown Mastering Engineer)"
        },
        explanation_image: {
          src: "/images/mic_vs_line_level.svg",
          alt: "Direct Injection (DI) Transformer Circuit"
        }
      },
      {
        title: "Q2: King Tubby's High-Pass Filter",
        content: "What piece of broadcast equipment did King Tubby famously repurpose as an expressive live dub mixing tool?",
        type: "multi_choice",
        answers: [
          { text: "Altec 9069A stepped high-pass filter with large rotary knob", is_true: "yes" },
          { text: "RCA optical compressor modified with variable attack times", is_true: "no" },
          { text: "Fairchild 670 stereo limiter strapped across the drum buss", is_true: "no" },
          { text: "Graphic equalizer taken from a Kingston cinema sound system", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "King Tubby wired an Altec high-pass filter (the 'Big Knob') into his modified 4-track MCI console, sweeping the cutoff frequency in real time during live dub mixes to hollow out snare hits and guitar skanks before slamming the bass back in.",
        expert_quote: {
          text: "Tubby turned the mixing desk into a musical instrument with that big high-pass knob.",
          author: "Bunny Lee (Dub Producer)"
        },
        explanation_image: {
          src: "/images/svg/high_pass_filter_sweep_riser.svg",
          alt: "High-Pass Filter Sweep Frequency Response"
        }
      },
      {
        title: "Q3: Roland Space Echo RE-201",
        content: "How did Jamaican dub producers generate endless psychedelic repeat trails on snares and vocals?",
        type: "multi_choice",
        answers: [
          { text: "Looping digital audio memory across four synced RAM buffers", is_true: "no" },
          { text: "Routing auxiliary sends into tape delay with high feedback", is_true: "yes" },
          { text: "Stacking three BBD analog delay stompboxes in series chains", is_true: "no" },
          { text: "Spinning tape reels backwards while recording live onto disc", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Using the Roland RE-201 Space Echo, engineers routed an aux send into the unit and pushed the repeat rate and intensity (feedback) past unity gain, driving the tape loop into warm, self-oscillating magnetic saturation.",
        expert_quote: {
          text: "The Space Echo was alive; you could push the feedback until the tape began howling.",
          author: "Lee 'Scratch' Perry"
        },
        explanation_image: {
          src: "/images/delay_self_oscillation_diagram.svg",
          alt: "Tape Delay Feedback Loop and Self-Oscillation"
        }
      },
      {
        title: "Q4: Spring Reverb Crash & Splash",
        content: "What physical method created the explosive 'thunderclap' reverb splash heard on classic dub reggae tracks?",
        type: "multi_choice",
        answers: [
          { text: "Slapping the side of the mixer or kicking the spring tank", is_true: "yes" },
          { text: "Firing a blank starter pistol inside a concrete stairwell", is_true: "no" },
          { text: "Overdriving a plate reverb pickup transducer into clipping", is_true: "no" },
          { text: "Reversing a gated snare reverb sample on an early sampler", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Spring reverbs use mechanical springs suspended between transducers. Physically striking the tank causes the metal springs to violently collide with each other, generating a massive metallic crash picked up by the output coil.",
        expert_quote: {
          text: "A bump of the desk set the springs rattling like thunder over the snare.",
          author: "King Tubby"
        },
        explanation_image: {
          src: "/images/reverb_spring_transducer_diagram.svg",
          alt: "Spring Reverb Mechanical Tank and Coils"
        }
      },
      {
        title: "Q5: Hitsville Attic Echo Chamber",
        content: "What gave Motown hits their lush, signature vocal ambiance despite the dead acoustic space of Studio A?",
        type: "multi_choice",
        answers: [
          { text: "Lacquered drywall echo chamber constructed in studio attic", is_true: "yes" },
          { text: "Early digital reverberators imported from German broadcast labs", is_true: "no" },
          { text: "Long steel conduit pipes buried underneath West Grand Blvd", is_true: "no" },
          { text: "Multiple magnetic tape loops played back in variable speeds", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Berry Gordy and his engineers turned the attic of 2648 West Grand Blvd into a dedicated reverberation chamber with drywall covered in high-gloss lacquer, piping dry vocals up to a speaker and recording the diffuse reflections.",
        expert_quote: {
          text: "Our sound was born in that attic. That was the shimmer behind Diana Ross and Marvin Gaye.",
          author: "Berry Gordy (Motown Founder)"
        },
        explanation_image: {
          src: "/images/reverb_chamber_room_diagram.svg",
          alt: "Attic Reverb Chamber Acoustic Flow"
        }
      },
      {
        title: "Q6: Dub Fader & Mute Performance",
        content: "What is the primary role of the recording engineer during the creation of a Jamaican dub mix?",
        type: "multi_choice",
        answers: [
          { text: "Balancing peak faders to maintain strictly flat master meters", is_true: "no" },
          { text: "Acting as live improvisor, dropping stems in and out via faders", is_true: "yes" },
          { text: "Calibrating bias voltage on tape heads between vocal takes", is_true: "no" },
          { text: "Transcribing musical notes for the brass section to overdub", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "In dub, mixing is a live performance: the engineer uses console mutes, faders, and aux sends to deconstruct the multi-track recording, carving space for the rhythm section and dropping instruments in and out on the fly.",
        expert_quote: {
          text: "Dub is the art of deconstruction; taking away instruments to reveal the heartbeat underneath.",
          author: "King Jammy"
        },
        explanation_image: {
          src: "/images/Vintage Console EQ.png",
          alt: "Mixing Console Fader Strips and Aux Sends"
        }
      },
      {
        title: "Q7: Motown Eight-Track Tracking",
        content: "How did Motown's transition to a 3M 1-inch 8-track recorder in 1965 change their production workflow?",
        type: "multi_choice",
        answers: [
          { text: "Allowed tracking backing tracks first, with vocals overdubbed", is_true: "yes" },
          { text: "Permitted full stereo mixing with 24 individual drum mics", is_true: "no" },
          { text: "Eliminated analog tape hiss completely using Dolby C systems", is_true: "no" },
          { text: "Forced all rhythm and vocal tracks onto one mono recording", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Acquiring an 8-track recorder allowed the Funk Brothers to lay down rhythm tracks with punch and power, allowing lead vocals, strings, and horns to be overdubbed later without degrading the backing track through repeated bounces.",
        expert_quote: {
          text: "The 8-track gave us the freedom to perfect vocal arrangements without losing the band's groove.",
          author: "Brian Holland (Holland-Dozier-Holland)"
        },
        explanation_image: {
          src: "/images/Studer tape machine.png",
          alt: "Multitrack Reel-to-Reel Tape Recorder"
        }
      },
      {
        title: "Q8: Sound System Dubplates",
        content: "Why were 10-inch acetate 'dubplates' critical in Jamaican sound clash competitions?",
        type: "multi_choice",
        answers: [
          { text: "They could be cut instantly for sound clashes before vinyl press", is_true: "yes" },
          { text: "They possessed infinitely harder surfaces that never wore down", is_true: "no" },
          { text: "They allowed storing up to 45 minutes of audio on each side", is_true: "no" },
          { text: "They decoded digital audio bitstreams via laser turntables", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Dubplates were one-off acetate discs cut on a studio lathe immediately after a mix. Sound systems used exclusive dubplate versions to crush rivals at dancehall clashes before songs were commercially released.",
        expert_quote: {
          text: "You cut the dubplate in the afternoon, and by midnight you won the sound clash with it.",
          author: "David Rodigan (Reggae Broadcaster)"
        },
        explanation_image: {
          src: "/images/turntable_dj.png",
          alt: "Acetate Dubplate Lathe and Turntable"
        }
      },
      {
        title: "Q9: Drum & Bass 'Riddim' Stems",
        content: "Why did dub mixes isolate the drum and bass stems while heavily muting mid-range guitars and keyboards?",
        type: "multi_choice",
        answers: [
          { text: "To maximize physical low-end energy on large sound systems", is_true: "yes" },
          { text: "Because early Jamaican consoles lacked mid-frequency EQ bands", is_true: "no" },
          { text: "To prevent phase cancellation between keyboards and cymbals", is_true: "no" },
          { text: "To comply with Kingston government audio broadcast standards", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Sound system speaker stacks were built for physical visceral impact in outdoor dances. Stripping out the clutter of rhythm guitars and keys allowed the bass fundamental (40-90 Hz) and kick drum punch to dominate without distortion.",
        expert_quote: {
          text: "In reggae, the bass is the lead instrument and the drums are the foundation.",
          author: "Aston 'Family Man' Barrett"
        },
        explanation_image: {
          src: "/images/frequency_spectrum_bass.svg",
          alt: "Sub-Bass and Low Frequency Energy Spectrum"
        }
      },
      {
        title: "Q10: Black Ark Studio Tape Saturation",
        content: "What technique gave Lee 'Scratch' Perry's Black Ark productions their unique, murky sonic character?",
        type: "multi_choice",
        answers: [
          { text: "Overdriving tape heads and bouncing across worn 4-track tape", is_true: "yes" },
          { text: "Using purely solid-state digital processors in an anechoic room", is_true: "no" },
          { text: "Tracking through clean broadcast consoles into digital encoders", is_true: "no" },
          { text: "Filtering all recorded audio through optical bandpass arrays", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Lee Perry utilized an inexpensive Soundcraft console and 4-track Teac recorder, pushing input stages into warm clipping and bouncing tracks repeatedly on degraded tape reels, creating an organic soup of compression and harmonic saturation.",
        expert_quote: {
          text: "The Black Ark wasn't about pristine gear. It was about four tracks, smoke, and spiritual tape compression.",
          author: "Lee 'Scratch' Perry"
        },
        explanation_image: {
          src: "/images/Studer tape machine.png",
          alt: "4-Track Tape Head and Reel Saturation"
        }
      }
    ]
  },
  {
    id: "quiz-history-7",
    title: "Historical Context: 2010s–Present Modern ITB, Vocal Production & Streaming",
    type: "lp_quiz",
    isPremium: false,
    description: "Explore the 2010s production revolution: In-The-Box (ITB) mixing, vocal comping & formant pitch shifting, LUFS loudness normalization, sidechain ducking, and immersive Dolby Atmos audio.",
    questions: [
      {
        title: "Q1: Loudness Normalization & LUFS",
        content: "How did streaming platforms (Spotify, Apple Music) end the 1990s-2000s 'Loudness Wars'?",
        type: "multi_choice",
        answers: [
          { text: "Banning any tracks mastered with brickwall digital limiters", is_true: "no" },
          { text: "Normalizing audio playback to standardized -14 LUFS targets", is_true: "yes" },
          { text: "Limiting all streaming audio releases to 12-bit PCM resolution", is_true: "no" },
          { text: "Adding 6 dB of dynamic range expansion to hyper-limited masters", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "By implementing loudness normalization (typically around -14 LUFS integrated), streaming algorithms automatically turn down hyper-compressed, loud tracks, eliminating the competitive advantage of brickwall squashing.",
        expert_quote: {
          text: "When streaming turns everything down to -14 LUFS, hyper-limited masters just sound thin and punchless.",
          author: "Bob Katz (Mastering Engineer)"
        },
        explanation_image: {
          src: "/images/svg/lufs_vs_peak_metering.svg",
          alt: "LUFS Integrated Loudness vs Peak Metering"
        }
      },
      {
        title: "Q2: Formant-Preserving Pitch Correction",
        content: "What distinguishes modern graphical pitch editors (Celemony Melodyne) from early Auto-Tune pitch shifting?",
        type: "multi_choice",
        answers: [
          { text: "Ability to shift pitch while independently preserving formants", is_true: "yes" },
          { text: "Complete elimination of digital processing latency on inputs", is_true: "no" },
          { text: "Requirement of analog vacuum tubes inside the audio interface", is_true: "no" },
          { text: "Automatic replacement of vocal performances with synthesized tones", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Traditional pitch shifting shifts the entire spectral envelope, creating the unnatural 'chipmunk' effect. Formant-preserving pitch correction moves the fundamental note while holding vocal tract resonances static, preserving natural timbre.",
        expert_quote: {
          text: "Melodyne lets you fix a note by 50 cents without changing the singer's throat geometry.",
          author: "Peter Neubäcker (Celemony Founder)"
        },
        explanation_image: {
          src: "/images/Logic Pitch Shifter.png",
          alt: "Formant and Pitch Editing in Modern DAW"
        }
      },
      {
        title: "Q3: 808 Sub-Bass Sidechain Ducking",
        content: "Why do 2010s trap and pop producers sidechain compress sub-bass lines to the acoustic/electronic kick drum?",
        type: "multi_choice",
        answers: [
          { text: "To prevent low-end phase clashing and allow kick transients room", is_true: "yes" },
          { text: "To synthesize high-order harmonic distortion across the snare", is_true: "no" },
          { text: "To convert stereo low-frequency signals into surround formats", is_true: "no" },
          { text: "To automatically calculate master tempo from drum transients", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "The kick drum and 808 sub-bass both share critical energy in the 30-80 Hz sub-bass region. Ducking the sub-bass by 3-6 dB for 50-100ms when the kick hits prevents headroom overloading and keeps the kick punchy.",
        expert_quote: {
          text: "Sidechain ducking ensures your kick drum punches your chest before the sub-bass shakes the floor.",
          author: "MixedByAli (Mix Engineer)"
        },
        explanation_image: {
          src: "/images/svg/sidechain_compression_ducking.svg",
          alt: "Kick Drum Sidechain Ducking Sub-Bass Curve"
        }
      },
      {
        title: "Q4: Vocal Chopping & Stutter Sampling",
        content: "What production technique defines the drop lead in 2010s EDM and electropop hits (e.g., DJ Snake, The Chainsmokers)?",
        type: "multi_choice",
        answers: [
          { text: "Analog flanging of a 12-string acoustic guitar chord strum", is_true: "no" },
          { text: "Slicing, repitching, and sequencing vocal syllables as melodic leads", is_true: "yes" },
          { text: "Directly sampling 1970s vinyl drum breaks without equalization", is_true: "no" },
          { text: "Synthesizing white noise sweeps using analog modular patches", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Producers take isolated vocal stem fragments, slice them at transient zero-crossings, map them across a sampler or piano roll, and pitch/tune them into an infectious melodic hook with glide, formant shift, and sidechain compression.",
        expert_quote: {
          text: "Vocal chops became the lead guitar solo of 2010s pop music.",
          author: "Sound on Sound Production Analysis"
        },
        explanation_image: {
          src: "/images/svg/vocal_chopping_sampling_technique.svg",
          alt: "Vocal Syllable Slicing and Piano Roll Mapping"
        }
      },
      {
        title: "Q5: In-The-Box (ITB) vs Analog Summing",
        content: "What technical advancement allowed complete In-The-Box (ITB) mixes to match high-end hardware consoles in the 2010s?",
        type: "multi_choice",
        answers: [
          { text: "64-bit floating point audio engines and component-level modeling", is_true: "yes" },
          { text: "Physical replacement of computer CPUs with vacuum tube arrays", is_true: "no" },
          { text: "Mandatory routing through external summing boxes via ADAT lightpipe", is_true: "no" },
          { text: "Conversion of all recorded digital audio tracks to 8-bit mono", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Modern 64-bit floating point processing provides over 1500 dB of internal dynamic range (virtually eliminating digital clipping/quantisation artifacts), while component-level SPICE modeling accurately emulates analog transformers and tubes.",
        expert_quote: {
          text: "I haven't touched an analog console in a decade. ITB gives you instant recall and surgical accuracy.",
          author: "Serban Ghenea (19-time Grammy Winner)"
        },
        explanation_image: {
          src: "/images/Logic Mixer.png",
          alt: "64-Bit Floating Point Digital DAW Mixer"
        }
      },
      {
        title: "Q6: Dynamic EQ vs Multiband Compression",
        content: "Why do modern mixing engineers favor Dynamic EQ over traditional Multiband Compression for taming harsh vocals?",
        type: "multi_choice",
        answers: [
          { text: "Dynamic EQ avoids crossover phase shift when frequencies are below threshold", is_true: "yes" },
          { text: "Dynamic EQ adds warm second-order tube harmonics across entire mixes", is_true: "no" },
          { text: "Multiband compressors cannot adjust release times on high frequencies", is_true: "no" },
          { text: "Dynamic EQ eliminates the need for microphone preamplifiers in tracking", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Multiband compressors use crossover filters that split the whole spectrum, causing subtle phase smearing even when no compression occurs. Dynamic EQ operates like a parametric bell filter that only engages when energy exceeds threshold.",
        expert_quote: {
          text: "Dynamic EQ is invisible until harshness strikes at 3.5 kHz, preserving vocal transparency.",
          author: "Fab Dupont (Puremix)"
        },
        explanation_image: {
          src: "/images/dynamic_eq_threshold_diagram.svg",
          alt: "Dynamic EQ Threshold-Triggered Bell Curve"
        }
      },
      {
        title: "Q7: True Peak Limiting (-1 dBTP)",
        content: "Why is master ceiling set to -1.0 dBTP (True Peak) rather than 0.0 dBFS when preparing music for streaming?",
        type: "multi_choice",
        answers: [
          { text: "To leave room for lossy codec transcoding preventing inter-sample peaks", is_true: "yes" },
          { text: "To guarantee playback loudness meets FM commercial radio regulations", is_true: "no" },
          { text: "To reduce master file sizes when uploading to cloud distribution servers", is_true: "no" },
          { text: "To ensure compatibility with legacy 8-track magnetic tape players", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "When audio is converted to lossy streaming formats (Ogg Vorbis, AAC, MP3), reconstruction filters can create inter-sample peaks up to 1 dB higher than digital sample peaks, causing audible digital clipping distortion.",
        expert_quote: {
          text: "If you ceiling at 0.0 dBFS, MP3 encoding will clip and distort on listener headphones.",
          author: "Ian Shepherd (Mastering Engineer)"
        },
        explanation_image: {
          src: "/images/Logic Limiter.png",
          alt: "True Peak Brickwall Limiter Panel"
        }
      },
      {
        title: "Q8: Cloud Stem & Sample Libraries (Splice)",
        content: "How did platform-based royalty-free sample subscriptions alter mainstream pop beatmaking in the late 2010s?",
        type: "multi_choice",
        answers: [
          { text: "Producers assembled pre-cleared melodic loops and drag-and-drop stems", is_true: "yes" },
          { text: "Eliminated all requirement for hardware MIDI controller keyboards in DAWs", is_true: "no" },
          { text: "Forced all bedroom producers to track real 80-piece symphony orchestras", is_true: "no" },
          { text: "Replaced audio synthesis software with generative mechanical piano rolls", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Cloud-based sample platforms like Splice allowed bedroom producers to audition and drag key- and tempo-synced royalty-free loops directly into their DAWs, accelerating production speed and popularizing shared melodic motifs worldwide.",
        expert_quote: {
          text: "A huge percentage of Billboard Hot 100 hits now begin with a guitar or keys loop from Splice.",
          author: "Billboard Music Tech Report"
        },
        explanation_image: {
          src: "/images/MIDI Piano Roll Logic.png",
          alt: "DAW Audio Timeline with Sample Stems"
        }
      },
      {
        title: "Q9: Object-Based Spatial Audio (Dolby Atmos)",
        content: "What fundamentally distinguishes object-based Dolby Atmos mixing from traditional channel-based 5.1 surround sound?",
        type: "multi_choice",
        answers: [
          { text: "Sounds are positioned as 3D coordinate objects decoded by playback system", is_true: "yes" },
          { text: "Audio tracks must be physically recorded with 64 microphones simultaneously", is_true: "no" },
          { text: "Only low-frequency subwoofers are permitted to reproduce musical audio", is_true: "no" },
          { text: "Spatial audio mixes can only be heard inside certified IMAX movie cinemas", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Unlike channel-based surround (where audio is hard-panned into fixed speaker channels like Left or Rear Right), Atmos treats stems as audio objects with 3D spatial metadata (X, Y, Z coordinates), rendered dynamically for any speaker or binaural headphone setup.",
        expert_quote: {
          text: "With Atmos, you're not mixing to speakers anymore; you're placing sounds in three-dimensional space.",
          author: "Dolby Laboratories Spatial Audio Guide"
        },
        explanation_image: {
          src: "/images/mid_side_eq_diagram.svg",
          alt: "3D Spatial Positioning and Binaural Rendering"
        }
      },
      {
        title: "Q10: Bedroom Pop Vocal Comping",
        content: "What characterizes the vocal tracking methodology of modern artists like Billie Eilish and Finneas?",
        type: "multi_choice",
        answers: [
          { text: "Recording ultra-close cardioid takes, assembling composites, minimal reverb", is_true: "yes" },
          { text: "Standing 10 feet back in an untreated hall with omnidirectional ribbons", is_true: "no" },
          { text: "Tracking one single live vocal take directly to 2-inch tape without edits", is_true: "no" },
          { text: "Processing all vocal takes exclusively through guitar amplifier speaker cones", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Modern bedroom pop vocal production relies on hyper-intimate close micing (2-3 inches with pop filter), comping dozens of takes down to syllable-level perfection, surgically de-essing, and rejecting cavernous reverb in favor of dry, upfront presence.",
        expert_quote: {
          text: "Billie whispers right up against the mic. When you keep it dry and quiet, it feels like she's in your head.",
          author: "Finneas O'Connell"
        },
        explanation_image: {
          src: "/images/svg/daw_vocal_comping_lanes.svg",
          alt: "DAW Multi-Lane Vocal Comping Workflow"
        }
      }
    ]
  },
  {
    id: "quiz-history-8",
    title: "Historical Context: Evolution of Synthesis, Samplers & Drum Machines (1964–2000)",
    type: "lp_quiz",
    isPremium: false,
    description: "Trace the hardware evolution from voltage-controlled analog modular synths (Moog, Prophet-5) to digital FM (DX7), 12-bit samplers (Fairlight, SP-1200, S1000), and the software VST revolution.",
    questions: [
      {
        title: "Q1: Moog Voltage-Controlled Synthesis (1964)",
        content: "What standardized control voltage standard did Robert Moog establish for analog synthesizers?",
        type: "multi_choice",
        answers: [
          { text: "1 Volt per Octave logarithmic frequency scaling", is_true: "yes" },
          { text: "12 Volts per Semitone linear frequency modulation", is_true: "no" },
          { text: "5 Volts binary TTL digital pulse logic switching", is_true: "no" },
          { text: "0 to 100 milliamp current loop control protocol", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Robert Moog standardized the 1 Volt per Octave (1V/Oct) pitch control standard: every 1-volt increase in control voltage doubles the oscillator frequency, enabling equal-tempered keyboard playing across multiple octaves.",
        expert_quote: {
          text: "Standardizing 1 Volt per octave allowed keyboards to control electronic sound musically.",
          author: "Robert Moog"
        },
        explanation_image: {
          src: "/images/Modular Synth.jpg",
          alt: "Moog Modular Voltage-Controlled Synthesizer"
        }
      },
      {
        title: "Q2: Minimoog Model D (1970)",
        content: "Why was the 1970 Minimoog Model D so revolutionary for touring gigging musicians?",
        type: "multi_choice",
        answers: [
          { text: "Integrated keyboard and hardwired signal path inside one portable case", is_true: "yes" },
          { text: "Ability to store 128 digital presets onto 3.5-inch floppy disks", is_true: "no" },
          { text: "16-voice polyphony allowing two-handed acoustic piano playing", is_true: "no" },
          { text: "Built-in 24-bit digital reverb and multi-effects processing chips", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Before the Minimoog, synthesizers were massive modular cabinets requiring complex patch cables. The Minimoog hardwired 3 VCOs, a 24dB/octave ladder filter, and envelopes into a single portable, road-ready wooden chassis.",
        expert_quote: {
          text: "The Minimoog gave keyboard players the power to rival the lead guitarist's volume and expression.",
          author: "Rick Wakeman (Yes)"
        },
        explanation_image: {
          src: "/images/minimoog_model_d.png",
          alt: "Minimoog Model D Portable Analog Synthesizer"
        }
      },
      {
        title: "Q3: Prophet-5 Microprocessor Memory (1978)",
        content: "What engineering breakthrough did Dave Smith introduce with the Sequential Circuits Prophet-5?",
        type: "multi_choice",
        answers: [
          { text: "Microprocessor memory capable of saving and recalling full synth patches", is_true: "yes" },
          { text: "Direct optical disc recording replacing magnetic cassette storage", is_true: "no" },
          { text: "Liquid crystal touchscreen display for drawing custom waveform shapes", is_true: "no" },
          { text: "Wireless radio control link between synthesizer and stage PA system", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "The Prophet-5 was the world's first fully programmable polyphonic synthesizer. Its onboard Z80 microprocessor digitized knob and switch positions, allowing players to save 40 instant-recall patches at the push of a button.",
        expert_quote: {
          text: "Before the Prophet-5, you had to manually twist 30 knobs on stage between songs.",
          author: "Dave Smith (Sequential Circuits Founder)"
        },
        explanation_image: {
          src: "/images/analog_polyphony_synth.png",
          alt: "Prophet-5 Polyphonic Synthesizer Front Panel"
        }
      },
      {
        title: "Q4: Yamaha DX7 Frequency Modulation (1983)",
        content: "What sound synthesis method powered the ubiquitous glassy, metallic tones of the 1983 Yamaha DX7?",
        type: "multi_choice",
        answers: [
          { text: "Subtractive filtering of analog square and sawtooth waveforms", is_true: "no" },
          { text: "6-operator digital Frequency Modulation (FM) synthesis algorithms", is_true: "yes" },
          { text: "16-bit acoustic sample playback from internal read-only memory", is_true: "no" },
          { text: "Physical acoustic modeling of mechanical metal vibrating tines", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Invented by John Chowning at Stanford and licensed by Yamaha, FM synthesis modulates the frequency of digital sine-wave oscillators (operators) in 32 algorithmic configurations, generating complex sidebands that defined 1980s pop.",
        expert_quote: {
          text: "The DX7's electric piano and brass presets were on literally every record in the mid-eighties.",
          author: "Sound on Sound Retrospective"
        },
        explanation_image: {
          src: "/images/yamaha_dx7.png",
          alt: "Yamaha DX7 FM Synthesizer"
        }
      },
      {
        title: "Q5: Fairlight CMI Digital Sampling (1979)",
        content: "What pioneering feature allowed musicians to sample real-world audio on the Fairlight CMI?",
        type: "multi_choice",
        answers: [
          { text: "Digitizing audio into RAM and drawing harmonic waveforms with a light pen", is_true: "yes" },
          { text: "Recording 24-track audio directly to high-speed hard disk drives", is_true: "no" },
          { text: "Connecting external electric guitars via guitar-to-MIDI pickups", is_true: "no" },
          { text: "Decoding acoustic audio into staff notation on an internal matrix printer", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "The Fairlight CMI (Computer Musical Instrument) allowed musicians to record short audio clips into 8-bit digital RAM, edit loop points, and use a green-phosphor CRT screen and light pen to draw harmonic spectra.",
        expert_quote: {
          text: "The Fairlight let you sample anything from a dropped bottle to a violin, and play it on keys.",
          author: "Peter Gabriel"
        },
        explanation_image: {
          src: "/images/fairlight_cmi_lightpen.jpg",
          alt: "Fairlight CMI Screen and Light Pen"
        }
      },
      {
        title: "Q6: Linn LM-1 & LinnDrum (1980/1982)",
        content: "How did Roger Linn's LM-1 change drum machines from synthetic metronomes into hit-making instruments?",
        type: "multi_choice",
        answers: [
          { text: "Using real recorded acoustic drum samples stored on digital EPROM chips", is_true: "yes" },
          { text: "Synthesizing drum sounds with analog transistor white noise circuits", is_true: "no" },
          { text: "Employing physical motorized rubber hammers striking real drum skins", is_true: "no" },
          { text: "Utilizing optical light beam triggers broken by drummer drumsticks", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Earlier machines (like the Roland CR-78) used primitive analog bleeps. The LM-1 used 8-bit digital samples of real acoustic drums recorded by studio drummer Art Wood, stored on exchangeable EPROM chips with swing quantisation.",
        expert_quote: {
          text: "When Prince heard the LM-1 snare and rimshot, it defined the Minneapolis sound overnight.",
          author: "Roger Linn"
        },
        explanation_image: {
          src: "/images/linndrum_machine.jpg",
          alt: "LinnDrum Digital Sample Drum Machine"
        }
      },
      {
        title: "Q7: E-mu SP-1200 & 12-Bit Crunch (1987)",
        content: "Why did golden-era hip-hop producers cherish the sonic quality of the E-mu SP-1200 sampler?",
        type: "multi_choice",
        answers: [
          { text: "12-bit 26.04 kHz resolution and SSM2044 analog filters added gritty punch", is_true: "yes" },
          { text: "Immense 64-megabyte sample memory allowed storing entire vinyl album sides", is_true: "no" },
          { text: "Built-in optical vinyl turntable for scratching records without turntables", is_true: "no" },
          { text: "Automatic vocal stem isolation algorithms powered by neural networks", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "The SP-1200's 12-bit sampling rate (26.04 kHz) and analog tracking filters created a distinctive gritty punch and ring when samples were pitched down. Hip-hop producers sped up 33 RPM records to 45 RPM to save sample time, then pitched down in the machine.",
        expert_quote: {
          text: "The SP-1200's 12-bit punch made vinyl drums bang harder than the original records.",
          author: "Marley Marl (Hip-Hop Producer)"
        },
        explanation_image: {
          src: "/images/sp1200_sampler.jpg",
          alt: "E-mu SP-1200 Sampling Drum Machine"
        }
      },
      {
        title: "Q8: Akai S1000 Studio Standard (1988)",
        content: "What made the Akai S1000 the ubiquitous rackmount sampler of 1990s recording studios?",
        type: "multi_choice",
        answers: [
          { text: "16-bit 44.1 kHz CD-quality sampling, 16-voice polyphony, time-stretching", is_true: "yes" },
          { text: "Direct connection to acoustic grand pianos via mechanical string sensors", is_true: "no" },
          { text: "Complete replacement of all hardware mixing consoles in studio control rooms", is_true: "no" },
          { text: "Internal vacuum tube preamp circuit for warm broadcast voiceover capture", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "The Akai S1000 delivered pristine 16-bit 44.1 kHz stereo sampling, up to 32MB of RAM, robust SCSI hard drive storage, and innovative digital time-stretching, making it the bedrock of 90s dance, jungle, pop, and film scoring.",
        expert_quote: {
          text: "Every commercial studio in London had a rack of Akai S1000s running everything from strings to vocal hooks.",
          author: "Sound on Sound"
        },
        explanation_image: {
          src: "/images/studio-gear-akai-s1000.jpg",
          alt: "Akai S1000 16-Bit Stereo Digital Sampler"
        }
      },
      {
        title: "Q9: Roland TB-303 Acid Bassline (1981)",
        content: "How did a failed commercial bass accompanier accidentally invent the sound of Acid House music?",
        type: "multi_choice",
        answers: [
          { text: "Producers drove the 18dB/octave resonant diode-ladder filter into screeching resonance", is_true: "yes" },
          { text: "Faulty solder joints produced random noise bursts that resembled acoustic cymbals", is_true: "no" },
          { text: "Connecting the headphone jack to an acoustic guitar pickup created fuzz distortion", is_true: "no" },
          { text: "Musicians rewrote the internal microcode to convert the synthesizer into a drum kit", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "Designed as a rehearsal aid for solo guitarists, Chicago producers (DJ Pierre / Phuture) bought the cheap surplus TB-303 and tweaked the Cutoff, Resonance, and Accent knobs in real time while notes slid and accented, creating the squelch of acid house.",
        expert_quote: {
          text: "When we turned the resonance knob up on the 303, that bubbling sound blew our minds.",
          author: "DJ Pierre (Phuture)"
        },
        explanation_image: {
          src: "/images/svg/filter_resonance_diagram.svg",
          alt: "Resonant Low-Pass Filter Peak and Squelch"
        }
      },
      {
        title: "Q10: The VST Software Revolution (1996–2000)",
        content: "What major shift occurred in music technology with Steinberg's release of VST (Virtual Studio Technology)?",
        type: "multi_choice",
        answers: [
          { text: "Instruments and FX became software plugins processed directly on computer CPUs", is_true: "yes" },
          { text: "Hardware synthesizers were mandated to include Ethernet network jacks", is_true: "no" },
          { text: "Analog magnetic tape machines were modified to record MIDI digital control tracks", is_true: "no" },
          { text: "All musical audio production was restricted to hardware DSP expansion cards", is_true: "no" }
        ],
        explanation: "",
        expert_explanation: "In 1996 Steinberg introduced VST, and in 1999 VST 2.0 (VSTi) supported virtual instruments. Suddenly, synthesizers and studio processors could run entirely in code on host computers, democratizing music production worldwide.",
        expert_quote: {
          text: "VST turned the personal computer from a simple MIDI sequencer into a complete recording studio.",
          author: "Karl Steinberg"
        },
        explanation_image: {
          src: "/images/massive_synth.png",
          alt: "Software Virtual Instrument (VST) Interface"
        }
      }
    ]
  }
];

// =========================================================================
// 2. STAGE 5 CASE STUDIES (3 NEW CASE STUDIES: 20 QUESTIONS EACH)
// =========================================================================

const newCaseStudies = [
  {
    id: "case_superstition",
    type: "lp_quiz",
    title: "'Superstition' - Stevie Wonder (1972) Music Technology Analysis",
    youtube_id: "0CFuCYNx-1g",
    video_title_1: "Stevie Wonder - Superstition (Official Audio)",
    youtube_id_2: "V5d_l_l_h3s",
    video_title_2: "Stevie Wonder on the TONTO & Clavinet - Studio Documentary",
    description: "In-depth technical analysis of Stevie Wonder's 1972 funk masterpiece: TONTO modular synthesizer basslines, Hohner Clavinet D6 multi-tracking, dry 1970s drum micing, and 16-track analog tape production.",
    questions: [
      {
        title: "Statement 1: The TONTO Synthesizer Bassline",
        content: "The iconic walking bassline on 'Superstition' was recorded using an electric Fender Jazz bass guitar played direct through a tube DI box.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> The bassline was performed by Stevie Wonder on TONTO (The Original New Timbral Orchestra), a massive polyphonic modular synthesizer developed by Malcolm Cecil and Robert Margouleff, combining Moog and ARP modular modules.</p>",
        expert_quote: {
          text: "Stevie played that bassline by hand on the TONTO keyboard, setting a new standard for synth bass.",
          author: "Malcolm Cecil (TONTO Co-creator)"
        },
        explanation_image: {
          src: "/images/Modular Synth.jpg",
          alt: "TONTO Modular Synthesizer System"
        }
      },
      {
        title: "Statement 2: Hohner Clavinet D6 Multi-Tracking",
        content: "The rhythmic funk backbone consists of eight distinct Clavinet D6 layers, each played live by Stevie Wonder with subtle variations in pickup switching and EQ.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Stevie recorded up to eight separate Clavinet passes, panning them across the stereo field to create a dense, interlocking polyrhythmic web that sounds like a synchronized keyboard ensemble.</p>",
        expert_quote: {
          text: "He would layer Clavinet over Clavinet without any click track, locking in with his own internal groove.",
          author: "Robert Margouleff (Producer/Engineer)"
        },
        explanation_image: {
          src: "/images/Vintage Console EQ.png",
          alt: "Clavinet Multi-Tracking Console Setup"
        }
      },
      {
        title: "Statement 3: Wah-Wah Pedal Processing",
        content: "To give the Clavinet its distinctive biting vocal attack, certain rhythm layers were routed through a foot-operated wah-wah pedal and overdriven guitar amplifier.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Stevie used a Vox wah pedal and a small Fender tube guitar amplifier on select Clavinet tracks, sweeping the bandpass filter frequency to add percussive bite and upper-midrange snarl.</p>",
        expert_quote: {
          text: "The Clavinet has guitar strings struck by rubber hammers. Treating it like an electric funk guitar was revolutionary.",
          author: "Sound on Sound Classic Tracks"
        },
        explanation_image: {
          src: "/images/svg/clapton_woman_tone_filter.svg",
          alt: "Wah-Wah Bandpass Filter Frequency Curve"
        }
      },
      {
        title: "Statement 4: Drum Performance by Stevie Wonder",
        content: "The drum kit performance on 'Superstition' was recorded by Motown house drummer Uriel Jones in Detroit.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Stevie Wonder played the drum kit himself in Studio B of Electric Lady Studios in New York. The signature intro beat originated during a jam session with guitarist Jeff Beck.</p>",
        expert_quote: {
          text: "Stevie sat at the kit and started playing that syncopated four-on-the-floor groove with the hi-hat open sizzle.",
          author: "Jeff Beck"
        },
        explanation_image: {
          src: "/images/drum_kit_3d_stage.png",
          alt: "Drum Kit Setup at Electric Lady Studios"
        }
      },
      {
        title: "Statement 5: Dry 1970s Drum Micing",
        content: "The drum sound features close micing with heavy damping on the snare and toms, capturing a tight, dry acoustic punch typical of 1970s productions.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> 1970s drum tracking emphasized isolation and punch: drum heads were muffled with tape and tea towels, and close dynamic microphones (like Shure SM57 and AKG D12) captured direct sound with minimal room bleed.</p>",
        expert_quote: {
          text: "In the 70s we taped wallets to snare heads to kill ring. You wanted the punch dry so the groove was laser sharp.",
          author: "Electric Lady Engineering Notes"
        },
        explanation_image: {
          src: "/images/close_micing_snare_studio.jpg",
          alt: "Close Miced Snare Drum with Damping"
        }
      },
      {
        title: "Statement 6: Clavinet Live Room Micing",
        content: "All eight Clavinet D6 rhythm tracks were captured exclusively by placing microphones in front of high-volume guitar amplifiers in the live room.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Several Clavinet passes were recorded via direct injection (DI) straight into the console preamps, allowing maximum transient punch, zero acoustic bleed, and precise stereo placement.</p>",
        expert_quote: {
          text: "Recording Clavinet tracks direct into the desk gave that crisp, immediate attack without room bleed.",
          author: "Robert Margouleff"
        },
        explanation_image: {
          src: "/images/mic_vs_line_level.svg",
          alt: "Direct Injection vs Amplifier Micing"
        }
      },
      {
        title: "Statement 7: Absence of MIDI Sequencing",
        content: "All synthesizer basslines and keyboard counter-melodies were locked to an early Roland MIDI sequencer clock.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> MIDI was not invented until 1983. Every note, inflection, and rhythm on 'Superstition' was performed manually in real time without sequencers, quantisation, or automation.</p>",
        expert_quote: {
          text: "Every arpeggio and bass note was played live on the keys. There was no quantise button in 1972.",
          author: "Malcolm Cecil"
        },
        explanation_image: {
          src: "/images/minimoog_model_d.png",
          alt: "Manual Analog Synthesizer Keybed"
        }
      },
      {
        title: "Statement 8: Brass Synthesis",
        content: "The punchy trumpet and saxophone riffs on 'Superstition' were generated using polyphonic analog brass synthesizer presets.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> The brass lines were performed live by real musicians (Steve Madaio on trumpet and Trevor Lawrence on tenor sax) tracked with Neumann U87 condenser microphones in the studio.</p>",
        expert_quote: {
          text: "Nothing beats real horn players breathing together in a live room for funk stabs.",
          author: "Trevor Lawrence (Saxophonist)"
        },
        explanation_image: {
          src: "/images/Neumann U87 Microphone.png",
          alt: "Neumann U87 Large Diaphragm Condenser"
        }
      },
      {
        title: "Statement 9: Vocal Microphone & Saturation",
        content: "Stevie's lead vocal was tracked with a dynamic or tube microphone with gentle analog tape compression, giving it warmth without harsh sibilance.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Vocal tracking captured Stevie's dynamic performance through tube preamps and tape saturation, providing gentle natural compression that rounded off aggressive transients when he shouted.</p>",
        expert_quote: {
          text: "Stevie had tremendous dynamic vocal control; the tape just soaked up his peaks like a sponge.",
          author: "Electric Lady Studios"
        },
        explanation_image: {
          src: "/images/Vintage Opto Compressor (Teletronix LA-2A).png",
          alt: "Teletronix LA-2A Tube Opto Compressor"
        }
      },
      {
        title: "Statement 10: Natural Cave Reverb",
        content: "The ambient sheen on the brass and vocals was captured by piping the audio into a subterranean natural limestone cave.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Electric Lady Studios generated its signature artificial space using an EMT 140 steel plate reverb unit, giving high diffusion without the muddy reflections of natural caverns.</p>",
        expert_quote: {
          text: "The EMT 140 plate gave you space without mud, which was vital when eight Clavinet tracks were chattering.",
          author: "Audio Engineering Journal"
        },
        explanation_image: {
          src: "/images/plate reverb.jpg",
          alt: "EMT 140 Steel Plate Reverb Unit"
        }
      },
      {
        title: "Statement 11: Stereo Imaging & Panning",
        content: "The mix engineer panned the rhythm Clavinets hard left and hard right, leaving the centre of the stereo image open for kick, snare, bass synth, and lead vocal.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Panning the multiple Clavinet layers wide across the stereo field prevented frequency masking with the lead vocal and bass synth, which were anchored dead centre for maximum mono punch on AM radio.</p>",
        expert_quote: {
          text: "Wide panning of the rhythm keyboards left a highway down the middle for Stevie's vocal and the bass.",
          author: "Mix Magazine Analysis"
        },
        explanation_image: {
          src: "/images/mid_side_eq_diagram.svg",
          alt: "Stereo Panning Layout: Mid vs Side Elements"
        }
      },
      {
        title: "Statement 12: Analog Hardware Compression",
        content: "The mix bus utilized fast solid-state VCA compressors like the SSL G-Master Buss compressor, which was standard in 1972.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> The SSL G-Series console was not released until the late 1970s and 1980s. In 1972, dynamic control relied on UREI 1176 FET limiters, Teletronix LA-2A opto compressors, and natural tape compression.</p>",
        expert_quote: {
          text: "We used 1176s on the snare and vocals. That lightning-fast FET attack shaped the funk era.",
          author: "Robert Margouleff"
        },
        explanation_image: {
          src: "/images/Studio FET Compressor (UREI 1176 Blackface).png",
          alt: "UREI 1176 FET Limiting Amplifier"
        }
      },
      {
        title: "Statement 13: Absence of Autotune & Pitch Correction",
        content: "The entire vocal track features natural, uncorrected pitch, showcasing Stevie Wonder's microtonal vocal control and emotional expressiveness.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Digital pitch correction software did not exist in 1972. The vocal is 100% human performance, captured across whole-take or punch-in recordings on magnetic tape.</p>",
        expert_quote: {
          text: "Stevie didn't need pitch correction; he sang with absolute pitch awareness and passion.",
          author: "Malcolm Cecil"
        },
        explanation_image: {
          src: "/images/svg/daw_vocal_comping_lanes.svg",
          alt: "Vocal Tape Punch-In Workflow"
        }
      },
      {
        title: "Statement 14: Frequency Masking Management",
        content: "Engineers boosted the Clavinet at 60 Hz to compete directly with the fundamental frequency of the bass drum.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> The Clavinet's fundamental low end was high-pass filtered or rolled off around 100-200 Hz to prevent frequency masking with the kick drum and TONTO synth bass, focusing its energy in the 1-3 kHz midrange bite.</p>",
        expert_quote: {
          text: "If you left the Clavinet's bottom end in, the whole low end would turn to mud with the synth bass.",
          author: "Electric Lady Mix Log"
        },
        explanation_image: {
          src: "/images/svg/high_pass_filter.svg",
          alt: "High-Pass Filter Rolling Off Low End on Keyboards"
        }
      },
      {
        title: "Statement 15: Hi-Hat Microtiming and Human Swing",
        content: "The sixteenth-note hi-hat pattern demonstrates subtle microtiming and human velocity fluctuations that provide the song's signature funk swing.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Stevie's live hi-hat playing features subtle accents on the upbeat and slight temporal delays (laid-back pocket) that create human groove that rigid machine quantisation cannot reproduce.</p>",
        expert_quote: {
          text: "Stevie's feel on the hi-hat had a swing that leaned into the backbeat with incredible soul.",
          author: "Modern Drummer Magazine"
        },
        explanation_image: {
          src: "/images/svg/comparison_human_microdynamics_vs_machine_velocity.svg",
          alt: "Human Micro-Dynamics vs Machine Quantisation"
        }
      },
      {
        title: "Statement 16: Ultrasonic Equalization",
        content: "Pultec passive tube equalizers were employed to boost ultrasonic frequencies above 25 kHz to counteract cassette playback rolloff.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Pultecs were used primarily for low-end punch at 60 Hz and presence at 3-5 kHz; human hearing only extends to 20 kHz, and vinyl cutting heads cannot reproduce 25 kHz.</p>",
        expert_quote: {
          text: "The famous Pultec trick is at 60 Hz, boosting and cutting simultaneously for deep, tight low end.",
          author: "Robert Margouleff"
        },
        explanation_image: {
          src: "/images/Vintage Console EQ.png",
          alt: "Pultec Style Tube Equalizer Controls"
        }
      },
      {
        title: "Statement 17: Vinyl Lacquer Mastering Considerations",
        content: "During vinyl mastering, out-of-phase low-frequency stereo information had to be summed to mono using an elliptical equalizer to prevent the lathe cutter head from jumping.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Out-of-phase bass energy creates vertical movement in vinyl grooves. Mastering engineers summed frequencies below ~100 Hz to mono to ensure the stylus would not jump out of the groove on consumer record players.</p>",
        expert_quote: {
          text: "For vinyl cutting, keep your bass centered. Anything wide below 100 Hz will kick the needle out.",
          author: "Mastering Handbook"
        },
        explanation_image: {
          src: "/images/svg/acoustics_standing_wave_room_mode.svg",
          alt: "Mono Low-End Summing for Vinyl Cut"
        }
      },
      {
        title: "Statement 18: Moog Ladder Filter Character",
        content: "The TONTO bass sound owes its fat, warm timbre to the patented Moog 4-pole 24 dB/octave transistor ladder low-pass filter.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Bob Moog's 24 dB/octave ladder filter introduced subtle harmonic distortion when driven, rolling off harsh upper harmonics while preserving tremendous low-end warmth and punch.</p>",
        expert_quote: {
          text: "The Moog ladder filter gave TONTO that unmistakable rich, singing low end.",
          author: "Malcolm Cecil"
        },
        explanation_image: {
          src: "/images/svg/filter_slopes_diagram.svg",
          alt: "24 dB per Octave Low-Pass Filter Slope"
        }
      },
      {
        title: "Statement 19: Digital Delay Units",
        content: "Slapback echoes on the clavinet and vocals were generated using Eventide digital delay units running 24-bit DSP algorithms.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> In 1972, digital delays did not exist in commercial studios. Delay effects were produced using physical reel-to-reel tape machines running at 15 or 7.5 ips, utilizing the physical distance between tape heads.",
        expert_quote: {
          text: "All our delays were real tape delays. You varied tape speed to dial in the delay time.",
          author: "Electric Lady Engineering Staff"
        },
        explanation_image: {
          src: "/images/Tape delay picture.png",
          alt: "Reel-to-Reel Tape Delay Unit"
        }
      },
      {
        title: "Statement 20: Sonic Legacy in Funk & Pop",
        content: "'Superstition' marked a historic watershed moment by demonstrating that electronic synthesizers could produce an organic, deeply soulful funk groove.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Prior to 'Superstition' and 'Talking Book', synthesizers were viewed primarily as academic or novelty instruments. Wonder proved they could deliver unmatched groove, feeling, and commercial power.</p>",
        expert_quote: {
          text: "Stevie took the synthesizer out of the university lab and put it right in the heart of funk.",
          author: "Quincy Jones"
        },
        explanation_image: {
          src: "/images/minimoog_model_d.png",
          alt: "Stevie Wonder Synthesizer Legacy"
        }
      }
    ]
  },
  {
    id: "case_dub_reggae",
    type: "lp_quiz",
    title: "'King Tubby Meets Rockers Uptown' - Augustus Pablo & King Tubby (1974) Music Technology Analysis",
    youtube_id: "0W0b38QpZ5Q",
    video_title_1: "Augustus Pablo & King Tubby - King Tubby Meets Rockers Uptown (Official Audio)",
    youtube_id_2: "Z42P_z3H_L4",
    video_title_2: "King Tubby: The Father of Dub & Studio Electronics - Documentary",
    description: "Technical study of King Tubby's revolutionary 1974 dub masterpiece: custom 4-track MCI console modifications, high-pass filter sweeps, Roland Space Echo feedback loops, and spring reverb crash techniques.",
    questions: [
      {
        title: "Statement 1: Mixing Desk as Musical Instrument",
        content: "In dub production, the mixing console is treated as an expressive musical instrument performed live in real time.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> King Tubby revolutionized music production by using console faders, mute switches, aux sends, and EQ knobs as real-time performance tools, improvising live mixes directly onto the two-track master tape.</p>",
        expert_quote: {
          text: "Tubby didn't just balance sound; he played the mixing console like a jazz solo.",
          author: "Bunny Lee (Dub Producer)"
        },
        explanation_image: {
          src: "/images/Vintage Console EQ.png",
          alt: "Custom Mixing Console Fader Strips"
        }
      },
      {
        title: "Statement 2: The 'Big Knob' High-Pass Filter",
        content: "King Tubby modified his custom 4-track MCI console with an Altec broadcast high-pass filter known as the 'Big Knob' to sweep frequency cutoffs live.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Tubby installed an Altec 9069A stepped passive high-pass filter on his master bus, allowing him to suddenly strip away all low and low-mid frequencies before snapping the heavy bassline back in.",
        expert_quote: {
          text: "When Tubby turned that big knob, the bass vanished and your ears felt empty—then boom, the bass dropped back in!",
          author: "Scientist (Dub Engineer)"
        },
        explanation_image: {
          src: "/images/svg/high_pass_filter_sweep_riser.svg",
          alt: "High-Pass Filter Frequency Cutoff Sweep"
        }
      },
      {
        title: "Statement 3: German Accordion Lead",
        content: "Augustus Pablo's haunting lead melodies were performed on an expensive custom German concert accordion miked with stereo ribbons.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Pablo played an inexpensive plastic hand-held melodica (a breath-powered reed instrument), creating an iconic mystical voice that Tubby soaked in tape echo.</p>",
        expert_quote: {
          text: "Pablo took a toy plastic melodica and turned it into the sound of deep roots reggae.",
          author: "David Rodigan"
        },
        explanation_image: {
          src: "/images/Ribbon Microphone.png",
          alt: "Ribbon Microphone Capturing Wind Instruments"
        }
      },
      {
        title: "Statement 4: Digital Lexicon Reverb Processing",
        content: "The cavernous reverberation on the snare drum was produced by a Lexicon 480L digital reverberation processor.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> The Lexicon 480L was not released until 1986. King Tubby utilized custom-built mechanical spring reverbs taken from Hammond organs and Fisher tube units, which gave the tracks their metallic, twangy acoustic character.</p>",
        expert_quote: {
          text: "Everything was mechanical. Spring tanks, tape loops, and hand-built electronics.",
          author: "King Jammy"
        },
        explanation_image: {
          src: "/images/reverb_spring_transducer_diagram.svg",
          alt: "Mechanical Spring Reverb Transducer System"
        }
      },
      {
        title: "Statement 5: Spring Reverb Mechanical Crash",
        content: "The explosive metallic 'thunder' splash heard on snare dropouts was produced by physically kicking or tapping the spring reverb tank.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Tubby and his protégés physically jarred the console or the spring tank on specific snare hits, causing the suspended metal coils to collide violently and emit a loud, metallic thunderclap.",
        expert_quote: {
          text: "A quick slap on the side of the mixer gave you that crack of thunder.",
          author: "King Tubby"
        },
        explanation_image: {
          src: "/images/svg/reverb_plate_spring_diagram.svg",
          alt: "Spring Reverb Impact and Resonance"
        }
      },
      {
        title: "Statement 6: Tape Delay Feedback & Self-Oscillation",
        content: "Tubby generated escalating, self-feeding echo trails by routing tape delay outputs back into their own mixer channels with high feedback.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> By feeding the tape delay's return back into an auxiliary send past unity gain, Tubby drove the circuit into self-oscillation, creating soaring runaway feedback that saturated the tape heads.</p>",
        expert_quote: {
          text: "You had to ride the aux knob with your fingers; let it roar, then pull it back before it blew the monitors.",
          author: "Scientist"
        },
        explanation_image: {
          src: "/images/delay_self_oscillation_diagram.svg",
          alt: "Tape Delay Runaway Feedback Circuit"
        }
      },
      {
        title: "Statement 7: Continuous Dense Arrangement",
        content: "King Tubby's dub style required all musical instruments—horns, guitars, organs, and vocals—to play continuously without ever being muted.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Dub is fundamentally subtractive: Tubby violently dropped faders and flicked mutes, stripping away guitars, horns, and vocals to let the raw drum and bass groove breathe in empty space.</p>",
        expert_quote: {
          text: "Dub is the art of subtraction. You create drama by carving vast holes in the mix.",
          author: "Lee 'Scratch' Perry"
        },
        explanation_image: {
          src: "/images/svg/arrangement_sparse_acoustic_vs_dense_synth.svg",
          alt: "Subtractive Arrangement: Deconstructing Stems"
        }
      },
      {
        title: "Statement 8: Bass Ambient Reverb Micing",
        content: "Aston 'Family Man' Barrett's bass was recorded by placing a ribbon microphone 20 feet away at the far end of an open tiled hallway.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Barrett's bass was tracked through a custom transformer DI box directly into the mixing desk, capturing a clean, punchy fundamental without room reflections or acoustic phase cancellation.</p>",
        expert_quote: {
          text: "Tubby used transformer direct injection so the bass was razor sharp and deep.",
          author: "Bunny Lee"
        },
        explanation_image: {
          src: "/images/mic_vs_line_level.svg",
          alt: "Direct Injection Transformer Matching Circuit"
        }
      },
      {
        title: "Statement 9: Dotted-Eighth Tape Echo Timing",
        content: "The tape delay repeat rate was synchronized precisely to the song tempo using SMPTE timecode.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> SMPTE synchronization was not used in 1974 Jamaican studios. Tubby adjusted tape speed and repeat rate purely by ear using mechanical varispeed knobs on his reel-to-reel tape decks.</p>",
        expert_quote: {
          text: "There was no clock. Tubby turned the tape pitch wheel until the echo bounced in time with the rimshot.",
          author: "David Rodigan"
        },
        explanation_image: {
          src: "/images/svg/dotted_eighth_note_delay.svg",
          alt: "Dotted-Eighth Rhythmic Delay Repeats"
        }
      },
      {
        title: "Statement 10: Dampened Disco Snare",
        content: "Carlton Barrett covered his snare with thick tea towels and tuned it to a loose, low pitch to mimic American disco drum dampening.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Barrett tuned his snare drum very tight and high, delivering razor-sharp cross-stick rimshots with intense transient bite that cut right through the bass and triggered echo units.</p>",
        expert_quote: {
          text: "Carly's snare crack was high and snappy; when it hit the tape delay, it ricocheted like a gunshot.",
          author: "Sly Dunbar"
        },
        explanation_image: {
          src: "/images/drum_snare_micing_1770032674117.png",
          alt: "Tuned Snare Drum and Rimshot Strike Point"
        }
      },
      {
        title: "Statement 11: Tape Generation Loss and Saturation",
        content: "Repeated tape bouncing and dub mixing across multi-generation tape reels introduced pleasant tape compression and high-frequency softening.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Because tape reels were reused and bounced across machines in Jamaica's tropical climate, analog tape compression rounded off harsh transients and added warm third-harmonic saturation to the tracks.</p>",
        expert_quote: {
          text: "The tape sat in the heat, bounced three times—it gave the mix that warm, dusty Jamaican grain.",
          author: "Sound on Sound"
        },
        explanation_image: {
          src: "/images/Studer tape machine.png",
          alt: "Analog Magnetic Tape Generation Saturation"
        }
      },
      {
        title: "Statement 12: Fragmented Vocal Phrases",
        content: "Vocal snippets from Jacob Miller's original performance are strategically dropped into the dub mix for one or two syllables, bathed in echo trails.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Tubby would throw open the vocal fader for a single phrase—like 'Baby I love you so...'—and immediately slam it shut while sending the tail into the Space Echo, leaving the words floating in space.</p>",
        expert_quote: {
          text: "Tubby used the voice like a ghostly echo, teasing the listener with memories of the original song.",
          author: "The Wire Magazine"
        },
        explanation_image: {
          src: "/images/delay_feedback_repeats_diagram.svg",
          alt: "Vocal Throw Delay Echo Decay Pattern"
        }
      },
      {
        title: "Statement 13: Low-Power Walkman Mastering",
        content: "King Tubby mixed and EQ'd his dub tracks primarily for low-power personal cassette walkmans, rolling off all frequencies below 80 Hz.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Tubby was the proprietor of Tubby's Hometown Hi-Fi; his dubs were engineered to deliver devastating sub-bass power on massive multi-thousand-watt outdoor sound systems.</p>",
        expert_quote: {
          text: "Tubby tuned his mixes for the dancehall, where physical sub-bass rattled the ground.",
          author: "Bunny Lee"
        },
        explanation_image: {
          src: "/images/svg/bass_woofer.svg",
          alt: "Horn-Loaded Sound System Subwoofer Enclosure"
        }
      },
      {
        title: "Statement 14: Automated DAW Mute Automation",
        content: "The rapid muting and fader cuts were programmed using motorized fader automation on an SSL 4000 console.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> There was no automation. Tubby and his assistant mixed live with eight fingers on faders and buttons, performing every cut and send manually in a single uninterrupted take.</p>",
        expert_quote: {
          text: "If you made a bad fader move two minutes in, you rewound the tape and performed the whole mix again.",
          author: "Scientist"
        },
        explanation_image: {
          src: "/images/Vintage Console EQ.png",
          alt: "Manual Console Fader Moves"
        }
      },
      {
        title: "Statement 15: Guitar Skank High-Pass Filtering",
        content: "The offbeat rhythm guitar 'skank' was filtered to remove low and mid frequencies, leaving only a percussive high-mid 'chick' sound.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Filtering the guitar skank prevented it from competing with the bassline, turning the rhythm guitar into a pure percussive timekeeping element that sat neatly above 1 kHz.</p>",
        expert_quote: {
          text: "The guitar in reggae isn't for chords; it's a metronome that works with the hi-hat.",
          author: "Aston 'Family Man' Barrett"
        },
        explanation_image: {
          src: "/images/svg/high_pass_filter.svg",
          alt: "High-Pass Filter Frequency Curve on Guitar"
        }
      },
      {
        title: "Statement 16: One-Off Acetate Dubplate Cutting",
        content: "Exclusive mixes like 'King Tubby Meets Rockers Uptown' were cut directly onto soft acetate discs to be played exclusively at dancehalls before commercial release.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Tubby operated a disc-cutting lathe in his studio. Sound system operators paid top dollar for one-off dubplates to defeat competitor sound systems at weekend sound clashes.</p>",
        expert_quote: {
          text: "An exclusive Tubby dubplate could crown a sound system champion of Kingston.",
          author: "David Rodigan"
        },
        explanation_image: {
          src: "/images/turntable_dj.png",
          alt: "Acetate Dubplate Disc Cutting Lathe"
        }
      },
      {
        title: "Statement 17: Tube Harmonic Distortion",
        content: "Overdriving mixer preamps and spring reverb return channels was avoided to comply with broadcast distortion standards.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Tubby deliberately overrode classical hi-fi rules, driving console preamps into musical harmonic distortion to give snare attacks and bass notes aggression and grit.</p>",
        expert_quote: {
          text: "Tubby understood distortion as color. He pushed valves and tape right to the breaking point.",
          author: "Lee 'Scratch' Perry"
        },
        explanation_image: {
          src: "/images/Studio FET Compressor (UREI 1176 Blackface).png",
          alt: "Console Preamp Overdrive Saturation"
        }
      },
      {
        title: "Statement 18: Pure Mono Limitation",
        content: "Because the 4-track tape stems were tracked in mono, King Tubby was legally prohibited from introducing stereo spatial panning onto master tapes.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Tubby generated wide stereo landscapes by routing mono dry tracks into delay units and spring reverbs panned across the stereo field, creating profound 3D depth.",
        expert_quote: {
          text: "Dub proved you can build a massive stereo universe from simple mono stems.",
          author: "Sound on Sound"
        },
        explanation_image: {
          src: "/images/mid_side_eq_diagram.svg",
          alt: "Mono Stem with Stereo Delay and Reverb Returns"
        }
      },
      {
        title: "Statement 19: The Foundation of Remix Culture",
        content: "King Tubby's deconstruction of 'Baby I Love You So' into 'King Tubby Meets Rockers Uptown' is recognized as one of the very first modern 'remixes' in music history.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> By stripping away vocals, emphasizing rhythm, and restructuring the arrangement with studio FX, Tubby birthed the entire concept of the 12-inch remix, dub version, and extended club mix.</p>",
        expert_quote: {
          text: "Tubby invented the remix. Every DJ and electronic producer today is walking through the door he opened.",
          author: "Brian Eno"
        },
        explanation_image: {
          src: "/images/Akai_MPC.png",
          alt: "Evolution of Remix Tools and Samplers"
        }
      },
      {
        title: "Statement 20: Influence on Modern Bass Music",
        content: "The sub-bass emphasis, high-pass filter sweeps, and delay throws of 1970s dub directly laid the structural foundation for UK Jungle, Drum & Bass, and Dubstep.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> From Bristol sound to London jungle and South London dubstep, electronic producers adopted Tubby's sonic blueprint: heavy sub-bass weight, stripped-back rhythm, and tape delay dynamics.</p>",
        expert_quote: {
          text: "Dubstep is King Tubby updated for modern sound systems with digital sub-bass.",
          author: "Kodiak / UK Bass Producer"
        },
        explanation_image: {
          src: "/images/frequency_spectrum_bass.svg",
          alt: "Sub-Bass Lineage in Modern Dance Music"
        }
      }
    ]
  },
  {
    id: "case_bad_guy",
    type: "lp_quiz",
    title: "'Bad Guy' - Billie Eilish (2019) Music Technology Analysis",
    youtube_id: "DyDfgMOUjCI",
    video_title_1: "Billie Eilish - Bad Guy (Official Music Video)",
    youtube_id_2: "K1yG21Lp_dE",
    video_title_2: "Finneas Breaks Down How He Produced 'Bad Guy' - Studio Breakdown",
    description: "In-depth modern production analysis of Billie Eilish and Finneas's global 2019 hit: In-The-Box Logic Pro X production, intimate ASMR vocal micing, sub-bass 808 design, pedestrian crosswalk foley, and streaming loudness.",
    questions: [
      {
        title: "Statement 1: Complete In-The-Box (ITB) Bedroom Production",
        content: "'Bad Guy' was tracked, produced, and arranged entirely In-The-Box (ITB) in Logic Pro X inside Finneas O'Connell's small childhood bedroom.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> The track was produced entirely inside Apple Logic Pro X on an iMac in an acoustically modest bedroom studio, proving that Grammy-winning records no longer require million-dollar commercial studio facilities.</p>",
        expert_quote: {
          text: "We made the entire album in a bedroom with a modest interface and stock Logic plugins.",
          author: "Finneas O'Connell"
        },
        explanation_image: {
          src: "/images/Logic Mixer.png",
          alt: "Logic Pro X Digital Audio Workstation Interface"
        }
      },
      {
        title: "Statement 2: Distant Hall Micing",
        content: "Billie's lead vocal was captured from 20 feet away using an omnidirectional ribbon microphone to maximize room echo and distance.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Her vocal was captured just 2-3 inches from the condenser capsule with a pop shield, utilizing close proximity for an intimate, ASMR-style whisper right in the listener's ear.</p>",
        expert_quote: {
          text: "She was right up on the mic. Close micing creates that intense, dry intimacy.",
          author: "Finneas"
        },
        explanation_image: {
          src: "/images/studio_mic_pop_screen.jpg",
          alt: "Ultra-Close Vocal Condenser Setup with Pop Shield"
        }
      },
      {
        title: "Statement 3: Elimination of Cavernous Reverb",
        content: "To maintain an intimate, upfront sonic space, the lead vocal is processed with virtually zero diffuse reverb or hall ambiance.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Modern pop production often eschews 1980s-style plate or hall reverb. Keeping Billie's vocal bone-dry pushes her voice forward in the mix, right into the listener's ear canal on headphones.</p>",
        expert_quote: {
          text: "Reverb pushes sounds backwards in space. We wanted Billie to sound like she was whispering right beside you.",
          author: "Finneas"
        },
        explanation_image: {
          src: "/images/svg/arrangement_sparse_acoustic_vs_dense_synth.svg",
          alt: "Dry Intimate Vocal vs Diffuse Reverb Depth"
        }
      },
      {
        title: "Statement 4: Single Unedited Vocal Take",
        content: "The entire vocal track was captured in a single unbroken live take without any comping, punch-ins, or multi-track doubles.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Finneas recorded dozens of takes, comping syllables surgically and stacking 20-30 whisper layers tightly aligned with VocALign to create a thick, unified vocal presence.</p>",
        expert_quote: {
          text: "It sounds like one voice, but there are dozens of vocal takes meticulously comped together.",
          author: "Rob Kinelski"
        },
        explanation_image: {
          src: "/images/svg/daw_vocal_comping_lanes.svg",
          alt: "DAW Multi-Take Vocal Comping Lanes"
        }
      },
      {
        title: "Statement 5: Pedestrian Crosswalk Foley Percussion",
        content: "The signature rhythmic clicking sound during the chorus hook was captured using a smartphone recording of an Australian pedestrian crosswalk signal.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> While visiting Sydney, Billie recorded the rhythmic beeping of a pedestrian crossing light on her phone. Finneas imported the audio, quantised it to 135 BPM, and layered it into the hi-hat/percussion groove.</p>",
        expert_quote: {
          text: "We were in Australia, and the crosswalk made this crazy fast beep. Billie recorded it, and that became the chorus beat.",
          author: "Finneas (Rolling Stone Interview)"
        },
        explanation_image: {
          src: "/images/MIDI Piano Roll Logic.png",
          alt: "Foley Audio Sample Sliced in Logic Timeline"
        }
      },
      {
        title: "Statement 6: Upright Acoustic Double Bass",
        content: "The bassline on 'Bad Guy' was performed exclusively on an unamplified acoustic orchestral upright double bass.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> The bassline is built around an electronic 808-style synthesized sub-bass layered with harmonic saturation plugins (Decapitator) and an electric bass sample.",
        expert_quote: {
          text: "That bassline is driven by a saturated 808 sub designed to rattle cars and phone speakers alike.",
          author: "Rob Kinelski"
        },
        explanation_image: {
          src: "/images/svg/frequency_spectrum_bass.svg",
          alt: "Sub-Bass Fundamental (40Hz) and Saturation Harmonics (400Hz)"
        }
      },
      {
        title: "Statement 7: Sidechain Ducking on Sub-Bass",
        content: "The kick drum triggers aggressive sidechain compression on the 808 bass to carve immediate space for the kick's initial transient.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Sidechain ducking pulls the 808 bass down by 4-6 dB for the first 50 milliseconds of each kick hit, avoiding low-frequency phase cancellation and keeping the kick punchy and clean.",
        expert_quote: {
          text: "Without sidechain ducking, that massive 808 would swallow the kick drum whole.",
          author: "Sound on Sound"
        },
        explanation_image: {
          src: "/images/svg/sidechain_compression_ducking.svg",
          alt: "Kick Drum Sidechain Ducking Envelope"
        }
      },
      {
        title: "Statement 8: Sparse Mid-Range Frequency Pocket",
        content: "The arrangement features heavy rhythm electric guitars and dense pad synths filling the 500 Hz to 2 kHz region.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> The arrangement is famously minimalist: the mid-range (500 Hz - 2 kHz) is kept completely empty of guitars or heavy synth pads, leaving that acoustic space entirely open for Billie's whispered vocal clarity.",
        expert_quote: {
          text: "The secret to 'Bad Guy' is what isn't there. No guitars, no pads, no clutter.",
          author: "Rob Kinelski"
        },
        explanation_image: {
          src: "/images/eq_frequency_spectrum_balance_diagram.svg",
          alt: "Minimalist Frequency Carving: Open Vocal Midrange"
        }
      },
      {
        title: "Statement 9: Pitch-Shifted Vocal Chants",
        content: "The pitched-down vocal hook ('I'm that bad type...') was created using formant-shifting plugins to lower vocal timbre without altering tempo.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Finneas pitched Billie's vocal down an octave using pitch/formant shifting software (like Logic's Pitch Shifter or Soundtoys Little AlterBoy), creating the menacing, bass-heavy alter-ego persona.</p>",
        expert_quote: {
          text: "Pitching her voice down gave it that eerie, cartoon villain energy.",
          author: "Finneas"
        },
        explanation_image: {
          src: "/images/Logic Pitch Shifter.png",
          alt: "Logic Pro X Pitch Shifter and Formant Controls"
        }
      },
      {
        title: "Statement 10: Surgical De-Essing",
        content: "Because of the extreme close-micing and whispered delivery, multiple stages of surgical dynamic de-essing were required to tame harsh sibilance.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Whisper vocals compressed aggressively exhibit extreme high-frequency sibilance ('s' and 't' sounds between 5-8 kHz). Kinelski used dynamic EQs and split-band de-essers to clamp down on sibilance transparently.",
        expert_quote: {
          text: "When you compress a whisper, sibilance can take your head off. De-essing was critical on every vocal channel.",
          author: "Rob Kinelski"
        },
        explanation_image: {
          src: "/images/dynamic_eq_threshold_diagram.svg",
          alt: "Surgical De-Esser Dynamic High-Frequency Clamping"
        }
      },
      {
        title: "Statement 11: Constant Strict Tempo",
        content: "The song maintains an unvarying metronomic tempo of 135 BPM from the first bar through to the final fadeout.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> At 2:32, the song suddenly cuts in half to a 60 BPM dark trap outro with sliding 808 bass and whispered ad-libs, defying standard pop structural norms.</p>",
        expert_quote: {
          text: "Dropping the tempo down to 60 BPM for the outro made it feel like entering a whole different world.",
          author: "Finneas"
        },
        explanation_image: {
          src: "/images/MIDI Piano Roll Logic.png",
          alt: "DAW Tempo Automation Shift Curve"
        }
      },
      {
        title: "Statement 12: Analog Summing Console Mixdown",
        content: "Rob Kinelski mixed the track through an SSL 9000J analog console using hardware outboard compressors.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Rob Kinelski mixed 'Bad Guy' completely In-The-Box inside Pro Tools, using universal recall and software plugins without running audio through an analog summing console.</p>",
        expert_quote: {
          text: "I mix 100% in the box. 'Bad Guy' proved that ITB mixes can win Record of the Year and Album of the Year.",
          author: "Rob Kinelski"
        },
        explanation_image: {
          src: "/images/Logic Mixer.png",
          alt: "In-The-Box Digital Mix Environment"
        }
      },
      {
        title: "Statement 13: Sub-Bass Mono Compatibility",
        content: "The sub-bass below 80 Hz was kept strictly in mono to preserve headroom and prevent phase cancellation on club subwoofers.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Low-frequency stereo energy causes phase cancellation and consumes excessive mix headroom. Mixing the sub frequencies (20-80 Hz) in mono ensures consistent bass delivery across phones, headphones, and club systems.</p>",
        expert_quote: {
          text: "Keep your subs mono. Wide sub frequencies only create phase cancellation when played in clubs.",
          author: "Mastering Engineer John Greenham"
        },
        explanation_image: {
          src: "/images/Phase Invert Logic .png",
          alt: "Mono Bass Summing and Phase Check"
        }
      },
      {
        title: "Statement 14: White Noise Percussion Synthesis",
        content: "All percussion transients were synthesized exclusively using white noise generator modules on an analog ARP modular system.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Finneas recorded real human finger snaps and claps layered with acoustic snare samples, creating an organic physical crack rather than purely synthesized noise.",
        expert_quote: {
          text: "We recorded real finger snaps right into the microphone to give the snare beat that human click.",
          author: "Finneas"
        },
        explanation_image: {
          src: "/images/drum_snare_micing_1770032674117.png",
          alt: "Acoustic Percussion Layering Transient Alignment"
        }
      },
      {
        title: "Statement 15: Transient Shaper Processing",
        content: "Transient designers were used on drum elements to increase sustain and produce long reverberant ringouts.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Transient shapers were used to shorten decay and kill sustain tails, making every percussion element tight, staccato, and dry so that each beat stopped abruptly.</p>",
        expert_quote: {
          text: "Everything had to stop on a dime. We clamped the sustain down so there were no tails hanging around.",
          author: "Rob Kinelski"
        },
        explanation_image: {
          src: "/images/compressor_panel.png",
          alt: "Transient Shaper Attack Boost and Decay Attenuation"
        }
      },
      {
        title: "Statement 16: Mastering Loudness for Streaming (-14 LUFS)",
        content: "Mastering engineer John Greenham mastered 'Bad Guy' to preserve dynamic punch, optimizing for streaming platform loudness normalization targets.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Knowing Spotify and Apple Music normalize to ~ -14 LUFS, Greenham avoided brickwall squash, maintaining the dynamic punch between the quiet whisper verses and the explosive sub-bass drops.</p>",
        expert_quote: {
          text: "Because of streaming normalization, you can let the verses breathe. The drops hit so much harder when they're not squashed flat.",
          author: "John Greenham (Grammy-Winning Mastering Engineer)"
        },
        explanation_image: {
          src: "/images/svg/lufs_vs_peak_metering.svg",
          alt: "Streaming LUFS Normalization vs Peak Dynamics"
        }
      },
      {
        title: "Statement 17: Micro-Volume Breath Automation",
        content: "All vocal breath sounds were completely deleted from the audio tracks using automatic silence-strip gates.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> Breaths were not deleted; they were carefully automated and preserved. Intimate breaths and whispers are essential musical elements of Billie's vocal performance that convey emotional proximity.</p>",
        expert_quote: {
          text: "Never mute Billie's breaths. The breaths are part of the melody. We just rode the gain so they didn't overpower the words.",
          author: "Rob Kinelski"
        },
        explanation_image: {
          src: "/images/svg/daw_vocal_comping_lanes.svg",
          alt: "Vocal Automation Curves Preserving Breaths"
        }
      },
      {
        title: "Statement 18: Soundtoys Decapitator Saturation",
        content: "Analog emulation saturation plugins (like Soundtoys Decapitator) were driven hard on the bass and vocal doubles to generate subtle tape and tube warmth.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Harmonic saturation adds even- and odd-order harmonics that simulate analog tape and tube distortion, giving In-The-Box digital audio rich acoustic thickness and excitement.</p>",
        expert_quote: {
          text: "Decapitator on the 'T' (triode tube) setting gave the bassline that crunchy, menacing edge.",
          author: "Finneas"
        },
        explanation_image: {
          src: "/images/Studio FET Compressor (UREI 1176 Blackface).png",
          alt: "Tube and Tape Harmonic Saturation Plugins"
        }
      },
      {
        title: "Statement 19: Dead-Center Panning of All Layers",
        content: "Every single one of the 20+ vocal tracks, whispers, and harmonies is panned directly to the exact centre in mono.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "no" },
          { text: "False", is_true: "yes" }
        ],
        explanation: "<p><strong>False.</strong> While the main vocal is dead-center, whisper layers and doubles are panned hard 100% Left and Right to wrap around the listener's head in 3D binaural width.",
        expert_quote: {
          text: "Hard panning the whispers left and right wraps the vocals around your ears like a 3D cocoon.",
          author: "Rob Kinelski"
        },
        explanation_image: {
          src: "/images/mid_side_eq_diagram.svg",
          alt: "Stereo Imaging: Mono Center with Hard Panned Whispers"
        }
      },
      {
        title: "Statement 20: Paradigm Shift in Modern Pop Production",
        content: "'Bad Guy' won Record of the Year and Album of the Year at the 2020 Grammys, fundamentally validating DIY bedroom production as commercially elite.",
        type: "multi_choice",
        answers: [
          { text: "True", is_true: "yes" },
          { text: "False", is_true: "no" }
        ],
        explanation: "<p><strong>True.</strong> Sweeping all four major Grammy categories, 'Bad Guy' proved that songcraft, sonic vision, and smart digital production matter vastly more than multimillion-dollar studio budgets.",
        expert_quote: {
          text: "To all the kids making music in their bedroom today: you're going to get one of these.",
          author: "Finneas (2020 Grammy Acceptance Speech)"
        },
        explanation_image: {
          src: "/images/Logic Mixer.png",
          alt: "Grammy-Winning Bedroom Production Legacy"
        }
      }
    ]
  }
];

// =========================================================================
// 3. EXECUTE INJECTION INTO COURSE_DATA.JSON
// =========================================================================

console.log("=== INJECTING INTO COURSE_DATA.JSON ===");

// 1. Stage 6: Add 4 new historical quizzes if not already present
const stage6 = courseData.sections[6];
console.log("Current Stage 6 item count:", stage6.items.length);

newHistoricalQuizzes.forEach(newQ => {
  const existingIndex = stage6.items.findIndex(it => it.id === newQ.id);
  if (existingIndex >= 0) {
    console.log(`Replacing existing ${newQ.id} at index ${existingIndex}`);
    stage6.items[existingIndex] = newQ;
  } else {
    console.log(`Adding new historical quiz ${newQ.id}`);
    stage6.items.push(newQ);
  }
});

// Sort Stage 6 items logically: quiz-history-0 first, then timeline, then quiz-history-1..8
const orderMap = {
  "quiz-history-0": 0,
  "quiz-timeline-1": 1,
  "quiz-history-1": 2,
  "quiz-history-2": 3,
  "quiz-history-3": 4,
  "quiz-history-4": 5,
  "quiz-history-5": 6,
  "quiz-history-6": 7,
  "quiz-history-7": 8,
  "quiz-history-8": 9
};

stage6.items.sort((a, b) => {
  const ordA = orderMap[a.id] !== undefined ? orderMap[a.id] : 99;
  const ordB = orderMap[b.id] !== undefined ? orderMap[b.id] : 99;
  return ordA - ordB;
});

console.log("Updated Stage 6 item count:", stage6.items.length);
stage6.items.forEach((it, idx) => console.log(`  ${idx}: ${it.id} (${it.title})`));

// 2. Stage 5: Add 3 new case studies if not already present
const stage5 = courseData.sections[5];
console.log("\nCurrent Stage 5 item count:", stage5.items.length);

newCaseStudies.forEach(newCS => {
  const existingIndex = stage5.items.findIndex(it => it.id === newCS.id);
  if (existingIndex >= 0) {
    console.log(`Replacing existing ${newCS.id} at index ${existingIndex}`);
    stage5.items[existingIndex] = newCS;
  } else {
    console.log(`Adding new case study ${newCS.id}`);
    stage5.items.push(newCS);
  }
});

console.log("Updated Stage 5 item count:", stage5.items.length);
stage5.items.forEach((it, idx) => console.log(`  ${idx}: ${it.id} (${it.title})`));

fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2), 'utf8');
console.log("Successfully wrote updated course_data.json!");

// =========================================================================
// 4. DE-DUPLICATE CAMPAIGN MAP (CAMPAIGN_ROUTE.JSON)
// =========================================================================

console.log("\n=== DE-DUPLICATING CAMPAIGN_ROUTE.JSON ===");

// Check duplicates:
// Round 1 (index 0): node_7 currently quiz-timeline-1 -> Change to quiz-history-0 ("Historical Context: 1950s Rock 'n' Roll, Mono & Early Tape Pioneers")
// Round 10 (index 9): node_50 currently quiz-timeline-1 -> Change to quiz-history-6 ("Historical Context: 1960s & 70s Motown, Soul & Jamaican Dub Pioneers")
// Round 11 (index 10): node_55 currently quiz-history-1 -> Change to quiz-history-7 ("Historical Context: 2010s–Present Modern ITB, Vocal Production & Streaming")
// Round 13 (index 12): node_61 currently quiz-history-2 -> Change to quiz-timeline-1 ("Timeline Quiz: Historical Equipment & Techniques")
// Round 14 (index 13): node_67 currently quiz-history-3 -> Change to quiz-history-8 ("Historical Context: Evolution of Synthesis, Samplers & Drum Machines (1964–2000)")

const nodeUpdates = {
  node_7: {
    title: "Historical Context: 1950s Rock 'n' Roll, Mono & Early Tape Pioneers",
    quizId: "quiz-history-0"
  },
  node_50: {
    title: "Historical Context: 1960s & 70s Motown, Soul & Jamaican Dub Pioneers",
    quizId: "quiz-history-6"
  },
  node_55: {
    title: "Historical Context: 2010s–Present Modern ITB, Vocal Production & Streaming",
    quizId: "quiz-history-7"
  },
  node_61: {
    title: "Timeline Quiz: Historical Equipment & Techniques",
    quizId: "quiz-timeline-1"
  },
  node_67: {
    title: "Historical Context: Evolution of Synthesis, Samplers & Drum Machines (1964–2000)",
    quizId: "quiz-history-8"
  }
};

let updatedCount = 0;
campaignRoute.rounds.forEach(r => {
  r.nodes.forEach(n => {
    if (nodeUpdates[n.id]) {
      console.log(`Updating node ${n.id} in ${r.title}:`);
      console.log(`  Old: ${n.title} (quizId: ${n.quizId})`);
      n.title = nodeUpdates[n.id].title;
      n.quizId = nodeUpdates[n.id].quizId;
      console.log(`  New: ${n.title} (quizId: ${n.quizId})`);
      updatedCount++;
    }
  });
});

console.log(`Total campaign nodes updated: ${updatedCount}`);

// Verify all quizIds in campaignRoute now
const quizIdCounts = {};
campaignRoute.rounds.forEach(r => {
  r.nodes.forEach(n => {
    if (n.quizId && n.quizId !== 'none') {
      quizIdCounts[n.quizId] = (quizIdCounts[n.quizId] || 0) + 1;
    }
  });
});

console.log("\nCampaign Map quizId distribution (checking for duplicates):");
let duplicateQuizIds = 0;
Object.entries(quizIdCounts).forEach(([qid, count]) => {
  if (count > 1) {
    console.log(`  WARNING: Duplicate quizId: ${qid} (used ${count} times)`);
    duplicateQuizIds++;
  }
});

if (duplicateQuizIds === 0) {
  console.log("  PERFECT! Zero duplicate quizIds in campaign_route.json!");
} else {
  console.log(`  Found ${duplicateQuizIds} duplicates.`);
}

fs.writeFileSync(campaignRoutePath, JSON.stringify(campaignRoute, null, 2), 'utf8');
console.log("Successfully wrote updated campaign_route.json!");
