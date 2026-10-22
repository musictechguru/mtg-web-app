const fs = require('fs');
const path = require('path');

const courseDataPath = path.join(__dirname, '../src/data/course_data.json');
const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

const stage3 = courseData.sections.find(s => s.title.includes('Stage 3'));
if (!stage3) {
  console.error('Stage 3 not found in course_data.json');
  process.exit(1);
}

// -------------------------------------------------------------
// 1. Expand PQ1: Studio Equipment & Acoustics (quiz-topic-11) to 10 Qs
// -------------------------------------------------------------
const pq1 = stage3.items.find(i => i.id === 'quiz-topic-11');
if (pq1 && pq1.questions.length === 5) {
  const newPQ1Questions = [
    {
      title: "Q6: Bass Trapping & Room Modes",
      content: "Why are bass traps most effectively placed in the corners of a recording studio or control room?",
      type: "multi_choice",
      question: "Why do acoustic engineers locate bass traps in room corners rather than flat mid-wall positions?",
      answers: [
        { text: "Corners are where boundaries intersect, resulting in maximum acoustic pressure accumulation.", is_true: "yes" },
        { text: "Corners have the highest air particle velocity, making porous absorbers most efficient.", is_true: "no" },
        { text: "High frequencies naturally reflect only into corner boundaries, leaving mids untouched.", is_true: "no" },
        { text: "It is strictly an ergonomic convention to preserve usable flat wall space for diffusers.", is_true: "no" }
      ],
      explanation: "<p><strong>Bass Trapping & Boundary Intersections:</strong> Low-frequency room modes (standing waves) exhibit their highest acoustic pressure antinodes where two or three room boundaries meet—specifically the wall-to-wall and trihedral corners (where two walls meet the floor or ceiling). Pressure-based bass absorbers (such as sealed membrane or diaphragmatic traps) operate with peak efficiency at these maximum pressure points, taming low-frequency modal ringing and boominess.</p>",
      expert_quote: {
        text: "Low frequencies congregate with intense pressure at boundary corners. Tame the corners, and you tame the low-end definition of the entire room.",
        author: "Philip Newell, Studio Acoustic Consultant"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    },
    {
      title: "Q7: Early Reflections & Reflection-Free Zone",
      content: "In professional control room acoustic design, what is the primary purpose of creating a 'Reflection-Free Zone' (RFZ)?",
      type: "multi_choice",
      question: "What is the primary acoustic purpose of establishing a Reflection-Free Zone (RFZ) at the mix position?",
      answers: [
        { text: "To prevent specular reflections arriving within 15–20 ms from interfering with direct monitor sound.", is_true: "yes" },
        { text: "To create an entirely anechoic listening environment with zero acoustic reverberation whatsoever.", is_true: "no" },
        { text: "To artificially exaggerate the stereo width and phantom center image of near-field speakers.", is_true: "no" },
        { text: "To isolate external environmental background noise from entering through control room walls.", is_true: "no" }
      ],
      explanation: "<p><strong>Reflection-Free Zone (RFZ):</strong> When early reflections bounce off nearby console desks, side walls, or ceilings and arrive at the mixing engineer's ears within 15 to 20 milliseconds of the direct monitor signal, the brain cannot separate them. The time delay causes severe acoustic comb filtering (cancellations and phase notches), skewing EQ decisions. An RFZ uses angled boundary geometry and absorption to keep the initial listening window pure.</p>",
      expert_quote: {
        text: "The first 20 milliseconds belong exclusively to your monitor speakers. Any reflections invading that initial window deceive your ears.",
        author: "Don Davis, Acoustic Design Pioneer"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    },
    {
      title: "Q8: Reverberation Time (RT60)",
      content: "What does the acoustic metric RT60 define when evaluating a tracking room or control room?",
      type: "multi_choice",
      question: "How is the acoustic measurement RT60 officially defined in audio engineering?",
      answers: [
        { text: "The time in seconds required for sound pressure level to decay by 60 dB after source cessation.", is_true: "yes" },
        { text: "The maximum sound pressure level of room reflections generated at an acoustic frequency of 60 Hz.", is_true: "no" },
        { text: "The physical delay in milliseconds between direct audio arrival and the first room reflection.", is_true: "no" },
        { text: "The specific resonant frequency where room axial standing waves decay to 60% of original energy.", is_true: "no" }
      ],
      explanation: "<p><strong>RT60 (Reverberation Time 60 dB):</strong> Formulated by Wallace Clement Sabine, $RT_{60}$ measures the time (in seconds) required for acoustic energy in an enclosed space to decrease by 60 decibels (one-millionth of its original sound pressure) after the source stops abruptly. A professional control room typically targets a tight, neutral $RT_{60}$ of 0.2 to 0.4 seconds, whereas a live drum tracking room might target 0.8 to 1.2 seconds.</p>",
      expert_quote: {
        text: "RT60 provides the signature decay envelope of a space. Too high, and details blur; too low, and performances feel lifeless.",
        author: "Alton Everest, Master Handbook of Acoustics"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    },
    {
      title: "Q9: Acoustic Absorption vs Diffusion",
      content: "How does an acoustic diffuser (such as a Quadratic Residue Diffuser - QRD) differ functionally from an acoustic absorber?",
      type: "multi_choice",
      question: "What is the key functional difference between acoustic diffusers and acoustic absorbers in a studio?",
      answers: [
        { text: "Diffusers scatter reflected energy evenly in time and angle without removing acoustic energy.", is_true: "yes" },
        { text: "Diffusers convert sound energy into thermal heat to shorten the room reverberation time.", is_true: "no" },
        { text: "Diffusers are positioned exclusively in corners to trap excessive sub-bass frequency buildup.", is_true: "no" },
        { text: "Diffusers provide heavy physical mass to block sound transmission through studio partitions.", is_true: "no" },
      ],
      explanation: "<p><strong>Diffusion vs Absorption:</strong> Absorbers convert acoustic kinetic energy into thermal friction, removing energy from the room and reducing $RT_{60}$. By contrast, diffusers (e.g. Schroeder Quadratic Residue Diffusers) use phase-grating wells of mathematically varied depths to break up specular reflections and scatter sound uniformly across multiple angles and arrival times. This preserves acoustic liveliness and energy while completely eliminating harsh flutter echoes.</p>",
      expert_quote: {
        text: "Absorption removes energy from a space; diffusion redistributes it. Balance both to achieve a room that feels spacious yet surgically accurate.",
        author: "Manfred Schroeder, Acoustic Physicist"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    },
    {
      title: "Q10: Flutter Echo Diagnosis",
      content: "An engineer claps their hands in an untreated room and hears a rapid, high-pitched metallic 'buzzing' or 'ringing' tail. What acoustic defect is this?",
      type: "multi_choice",
      question: "What acoustic phenomenon causes a high-frequency metallic buzzing tail when clapping hands in an empty rectangular room?",
      answers: [
        { text: "Flutter echo, caused by rapid repetitive reflections between parallel reflective boundaries.", is_true: "yes" },
        { text: "A ground loop hum, caused by differential voltage between equipment earth references.", is_true: "no" },
        { text: "Comb filtering nulls, caused by direct-to-reverberant phase cancellation at the ears.", is_true: "no" },
        { text: "Axial room mode resonance, caused by fundamental wavelength standing waves in room corners.", is_true: "no" }
      ],
      explanation: "<p><strong>Flutter Echo:</strong> Flutter echo is an acoustic artifact created when high-frequency sound waves become trapped between two parallel, hard, non-absorptive boundaries (e.g. opposing drywall partitions). The rapid, discrete sequence of identical reflections arrives at the listener with uniform micro-intervals, creating a perceived periodic pitch resembling a metallic buzz or ring. It is eliminated by splaying walls (at least 6° out of parallel) or applying alternating patches of absorption and diffusion.</p>",
      expert_quote: {
        text: "Parallel hard surfaces act like an acoustic ping-pong table for high frequencies. Break the parallelism, and the flutter echo vanishes.",
        author: "Studio Acoustics Engineering Handbook"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    }
  ];
  pq1.questions.push(...newPQ1Questions);
  console.log(`✓ Expanded PQ1 to ${pq1.questions.length} questions`);
}

// -------------------------------------------------------------
// 2. Expand PQ4: FX Ear Training (quiz-topic-23) to 10 Qs
// -------------------------------------------------------------
const pq4 = stage3.items.find(i => i.id === 'quiz-topic-23');
if (pq4 && pq4.questions.length === 6) {
  const newPQ4Questions = [
    {
      title: "Identify EQ Filtering & Clean-up",
      content: "Listen to the two full mix versions. What corrective EQ process has been applied to Version B?",
      type: "audio_comparison",
      audio_a: "/Audio/FX_Ear_Training/EQ Mastery/Muddy Mix.mp3",
      audio_b: "/Audio/FX_Ear_Training/EQ Mastery/Clean Mix.mp3",
      options: [
        "Subtractive Low-Mid Cut (250–400 Hz)",
        "High-Frequency Exciter Boost",
        "Stereo Widener",
        "Multiband Gate"
      ],
      correct_index: 0,
      explanation: "<p><strong>Subtractive Low-Mid Cut:</strong> In Version A, the lower midrange around 250 Hz to 400 Hz is overcrowded with acoustic guitar resonance, bass bloom, and snare body, creating an indistinct 'muddy' buildup. Version B applies complementary parametric cuts in this region, opening up space and dramatically improving instrument clarity and separation.</p>",
      expert_quote: {
        text: "Clearing 250 Hz to 400 Hz is like wiping grime off a windshield. You suddenly hear the true depth and definition of every instrument.",
        author: "Al Schmitt, 20-Time Grammy Winning Engineer"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "Identify High-Frequency EQ Shaping",
      content: "Listen to the acoustic guitar tracks. What processing distinguishes Version B from Version A?",
      type: "audio_comparison",
      audio_a: "/Audio/FX_Ear_Training/EQ Mastery/Dull Acoustic.mp3",
      audio_b: "/Audio/FX_Ear_Training/EQ Mastery/Bright Acoustic.mp3",
      options: [
        "High-Shelf Treble Boost (10–12 kHz)",
        "Low-Pass Filter at 5 kHz",
        "Heavy Gated Reverb",
        "Bitcrusher"
      ],
      correct_index: 0,
      explanation: "<p><strong>High-Shelf Treble Boost:</strong> Version B features an airy, shimmering high-frequency lift above 10 kHz that enhances pick-stroke definition, string zing, and acoustic sparkle without introducing harsh mid-range bite. A high-shelf filter uniformly boosts all frequencies above its corner frequency.</p>",
      expert_quote: {
        text: "A gentle high shelf above 10 kHz breathes air and intimacy into acoustic guitars without pushing harshness into the vocal range.",
        author: "Mix Magazine Masterclass"
      },
      img: "/images/svg/frequency_spectrum_treble.svg"
    },
    {
      title: "Identify Low-End Kick Processing",
      content: "Compare the two kick drum examples. What processing has been applied to Version B?",
      type: "audio_comparison",
      audio_a: "/Audio/FX_Ear_Training/EQ Mastery/Thin Kick.mp3",
      audio_b: "/Audio/FX_Ear_Training/EQ Mastery/Boost Kick.mp3",
      options: [
        "Low-End Fundamental Boost (50–60 Hz)",
        "High-Pass Filter at 100 Hz",
        "Ring Modulation",
        "Mid-Range Peak at 1 kHz"
      ],
      correct_index: 0,
      explanation: "<p><strong>Low-End Fundamental Boost:</strong> Version B introduces powerful sub-bass weight and chest thump centered around 50 Hz to 60 Hz, the resonant fundamental pitch of the kick drum. In contrast, Version A sounds thin and boxy, lacking physical low-end extension.</p>",
      expert_quote: {
        text: "The kick fundamental lives right around 55 Hz. Give it room, lock it to the key, and it anchors the entire track.",
        author: "Dave Pensado, Pensado's Place"
      },
      img: "/images/svg/bass_woofer.svg"
    },
    {
      title: "Identify Sibilance Treatment (De-Essing)",
      content: "Listen to the vocal performance. What processing has been applied to Version B to treat harsh consonant sounds?",
      type: "audio_comparison",
      audio_a: "/Audio/FX_Ear_Training/EQ Mastery/Vocal Sibilance.mp3",
      audio_b: "/Audio/FX_Ear_Training/EQ Mastery/Vocal No Sibilance.mp3",
      options: [
        "Frequency-Conscious De-Esser (6–8 kHz)",
        "High-Pass Filter at 500 Hz",
        "Pitch Correction / Autotune",
        "Tremolo Modulation"
      ],
      correct_index: 0,
      explanation: "<p><strong>De-Esser (Frequency-Conscious Compression):</strong> In Version A, sharp vocal consonants ('S', 'T', and 'Ch') produce piercing, harsh bursts of high-frequency energy between 6 kHz and 8 kHz. Version B uses a de-esser—a compressor triggered only by high-frequency sidechain detection—to dynamically clamp down on sibilance while leaving the overall vocal tone natural.</p>",
      expert_quote: {
        text: "De-essing is frequency-specific dynamic control. It clamps the harsh 'esses' for a split second, allowing you to brighten the overall vocal without tearing listener eardrums.",
        author: "Manny Marroquin, Mix Engineer"
      },
      img: "/images/svg/de_esser_frequency_chart.svg"
    }
  ];
  pq4.questions.push(...newPQ4Questions);
  console.log(`✓ Expanded PQ4 to ${pq4.questions.length} questions`);
}

// -------------------------------------------------------------
// 3. Expand PQ19: Practical MIDI Applications (quiz-topic-38) to 10 Qs
// -------------------------------------------------------------
const pq19 = stage3.items.find(i => i.id === 'quiz-topic-38');
if (pq19 && pq19.questions.length === 7) {
  const newPQ19Questions = [
    {
      title: "Q8: MIDI Quantization & Swing Templates",
      content: "A producer quantizes an aggressive drum sequence to a strict 1/16-note grid, making it sound robotic. What parameter should they adjust to delay alternate 1/16th notes and inject a syncopated groove?",
      type: "multi_choice",
      question: "Which quantize parameter offsets even-numbered subdivisions to create a bouncy, humanized shuffle or groove?",
      answers: [
        { text: "Swing / Shuffle Percentage (shifting even 16th notes closer to a triplet feel).", is_true: "yes" },
        { text: "Velocity Randomization (varying velocity values across a +/- 20 value range).", is_true: "no" },
        { text: "Polyphonic Pitch Bend (gliding chord roots up or down by semitones).", is_true: "no" },
        { text: "Modulation Depth (increasing CC1 LFO modulation intensity on hi-hats).", is_true: "no" }
      ],
      explanation: "<p><strong>Swing & Shuffle Quantize:</strong> Straight quantization locks every note to an exact mathematical grid subdivision. Swing (or shuffle) works by systematically delaying alternate (even-numbered) subdivisions—such as the second, fourth, sixth, and eighth sixteenth notes in a bar. At 50%, timing is perfectly straight; at 66.7%, it matches a pure triplet feel. Adjusting swing percentage adds natural groove and head-nod bounce without manual note dragging.</p>",
      expert_quote: {
        text: "Roger Linn's swing templates on the MPC-60 defined hip-hop and house music. It's the rhythmic tension between straight and triplet that makes music dance.",
        author: "Roger Linn, Drum Machine & MIDI Pioneer"
      },
      img: "/images/svg/quantize_grid.svg"
    },
    {
      title: "Q9: MIDI Thru Daisy-Chaining & Latency",
      content: "When daisy-chaining multiple hardware synthesizers using 5-pin DIN MIDI Thru ports, what technical problem can accumulate down the signal chain?",
      type: "multi_choice",
      question: "What technical flaw occurs when daisy-chaining several synthesizers via 5-pin DIN MIDI Thru?",
      answers: [
        { text: "Latency and jitter caused by optoisolator switching rise/fall times in successive hardware receivers.", is_true: "yes" },
        { text: "Complete conversion of the MIDI serial protocol into an asynchronous analog voltage.", is_true: "no" },
        { text: "Destruction of all Note-Off messages, causing permanent audio feedback loops.", is_true: "no" },
        { text: "Automatic down-sampling of 14-bit pitch bend data into 7-bit controller bytes.", is_true: "no" }
      ],
      explanation: "<p><strong>MIDI Thru Optoisolator Latency:</strong> The 5-pin DIN MIDI hardware specification mandates an optical isolator (optoisolator) on every MIDI IN port to eliminate electrical ground loops between equipment. However, optoisolators have finite switching rise and fall times, slightly distorting the square-wave digital serial pulses. Daisy-chaining through three or more units via MIDI THRU causes cumulative pulse-width distortion and millisecond timing jitter. A dedicated active MIDI Thru box (star network topology) sends clean, simultaneous signals to all units.</p>",
      expert_quote: {
        text: "Never daisy-chain more than three devices through DIN MIDI Thru. Use an active star-split distribution box to keep your timing sample-accurate.",
        author: "Sound On Sound Studio Hardware Guide"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "Q10: Monophonic vs Polyphonic Voice Allocation",
      content: "In synthesizer sound design, what is the key difference between Polyphonic voice allocation and Monophonic Legato mode when playing overlapping notes?",
      type: "multi_choice",
      question: "How does Monophonic Legato mode differ from Polyphonic mode when executing overlapping melodic notes?",
      answers: [
        { text: "Polyphonic triggers new voices for every note; Monophonic Legato glides pitch without re-firing envelope attacks.", is_true: "yes" },
        { text: "Monophonic mode allows unlimited simultaneous voices; Polyphonic mode only plays one bass note at a time.", is_true: "no" },
        { text: "Monophonic Legato disables the low-pass filter resonance circuit during keyboard performance.", is_true: "no" },
        { text: "Polyphonic mode automatically transposes all chords into perfect fifths across octave registers.", is_true: "no" }
      ],
      explanation: "<p><strong>Voice Allocation & Legato Portamento:</strong> In polyphonic mode, each key pressed allocates a distinct synthesizer voice architecture (oscillator, filter, and amplifier envelopes), allowing chords. In monophonic legato mode, only one voice exists; when a second key is pressed while holding the first, the pitch glides smoothly (portamento) to the new note without re-triggering the attack stages of the filter or amplifier envelopes. This simulates the expressive, unbroken phrasing of wind instruments and vocalists.</p>",
      expert_quote: {
        text: "Legato gliding is the secret to expressive synth solos and iconic basslines. Without re-triggering envelopes, notes melt into one another with vocal fluidity.",
        author: "Bob Moog, Synthesizer Pioneer"
      },
      img: "/images/svg/synthesis_fm_operators.svg"
    }
  ];
  pq19.questions.push(...newPQ19Questions);
  console.log(`✓ Expanded PQ19 to ${pq19.questions.length} questions`);
}

// -------------------------------------------------------------
// 4. Author PQ25: Dynamic Processing & Envelope Matching (quiz-topic-44)
// -------------------------------------------------------------
const pq25 = {
  id: "quiz-topic-44",
  title: "Practical Quiz 25: Dynamic Processing & Envelope Matching",
  description: "Master compressor threshold math, attack transient clamping, release pumping, ratio transfer curves, and optical vs FET vs VCA characteristics.",
  type: "lp_quiz",
  campaignNodeId: null,
  questions: [
    {
      title: "Compressor Ratio Math (4:1)",
      content: "A snare drum signal peaks at +8 dB over the compressor threshold of -20 dBFS. With the ratio set to 4:1, by how many decibels will the output exceed the threshold?",
      type: "multi_choice",
      question: "If a signal exceeds a compressor threshold by 8 dB with a 4:1 ratio, what is the output level above the threshold?",
      answers: [
        { text: "+2 dB (Formula: 8 dB ÷ 4 = 2 dB output above threshold; 6 dB Gain Reduction)", is_true: "yes" },
        { text: "+4 dB (Formula: 8 dB - 4 dB = 4 dB)", is_true: "no" },
        { text: "+1 dB (Formula: 8 dB ÷ 8 = 1 dB)", is_true: "no" },
        { text: "+8 dB (Uncompressed output)", is_true: "no" }
      ],
      explanation: "<p><strong>Compressor Ratio Calculation:</strong><br/>$$\\text{Output Above Threshold} = \\frac{\\text{Input Level Above Threshold}}{\\text{Ratio}}$$<br/>$$\\frac{8\\text{ dB}}{4} = \\mathbf{+2\\text{ dB}}$$<br/>$$\\text{Gain Reduction} = \\text{Input Above Threshold} - \\text{Output Above Threshold} = 8 - 2 = \\mathbf{6\\text{ dB}}$$.<br/>The output will exceed the threshold by exactly 2 dB (resulting in an absolute output peak of $-18\\text{ dBFS}$).</p>",
      expert_quote: {
        text: "The ratio defines the slope of gain reduction above the threshold. Master this math, and you can predict your headroom before touching a fader.",
        author: "Edexcel A-Level Component 4 Specification Focus"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Fast Attack vs Slow Attack on Drum Transients",
      content: "An engineer wants to increase the 'punch' and 'crack' of an acoustic snare drum without losing overall volume. How should the compressor attack time be adjusted?",
      type: "multi_choice",
      question: "To maximize snare drum attack and punch, how should the compressor attack time be configured?",
      answers: [
        { text: "Slow attack (e.g. 20–30 ms) to let the initial transient crack pass uncompressed before clamping sustain.", is_true: "yes" },
        { text: "Ultra-fast attack (e.g. 0.1 ms) to instantly flatten the initial stick impact transient.", is_true: "no" },
        { text: "Set attack to zero and increase ratio to infinity:1 to hard-limit the initial hit.", is_true: "no" },
        { text: "Attack time has no effect on transient perception; only release time determines punch.", is_true: "no" }
      ],
      explanation: "<p><strong>Transient Shaping via Attack Time:</strong> The initial strike of a snare drum lasts roughly 5 to 15 milliseconds. If attack is set ultra-fast (e.g. 0.1 ms), the compressor immediately attenuates that initial transient, dulling the impact. By setting a slower attack (20–30 ms), the initial transient passes completely unattenuated. When the compressor kicks in during the note body, subsequent makeup gain pushes the transient forward relative to the body, producing maximum punch.</p>",
      expert_quote: {
        text: "Slow attack equals punch; fast attack equals control. If you want drums that hit you in the chest, let the transient breathe.",
        author: "Chris Lord-Alge, Mix Engineer"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Compressor Release & Tempo-Synced Breathing",
      content: "When compressing a drum room mix, the engineer observes unnatural 'pumping' and 'breathing' between snare hits. What parameter is misadjusted?",
      type: "multi_choice",
      question: "What causes noticeable breathing/pumping artifacts on ambient drum microphones?",
      answers: [
        { text: "Release time set too fast or misaligned with song tempo, causing room noise to swell up abruptly.", is_true: "yes" },
        { text: "Threshold set too high, preventing gain reduction from engaging.", is_true: "no" },
        { text: "Ratio set too low (e.g. 1.5:1), failing to control dynamic peaks.", is_true: "no" },
        { text: "Knee parameter configured with a soft curved transition rather than a hard elbow.", is_true: "no" }
      ],
      explanation: "<p><strong>Compressor Release & Pumping:</strong> When the release time is set excessively fast, the compressor restores gain immediately after a loud snare peak. This causes the ambient room reflections and cymbal bleed to surge upward in volume ('breathe' or 'pump') unnaturally before the next hit. Tuning the release to the tempo of the music (e.g. matching an eighth or quarter note) ensures the gain reduction returns smoothly to zero just before the next beat.</p>",
      expert_quote: {
        text: "The release knob is the musical groove control of any compressor. Set it to dance in time with the drummer.",
        author: "Michael Brauer, Multi-Grammy Mix Engineer"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Hard Knee vs Soft Knee",
      content: "What is the difference between a Hard Knee and a Soft Knee compression response curve?",
      type: "multi_choice",
      question: "How does a Soft Knee modify compressor behavior around the threshold?",
      answers: [
        { text: "Soft knee introduces gain reduction gradually over a transition zone below and above the threshold.", is_true: "yes" },
        { text: "Hard knee delays the start of compression by 50 milliseconds after the threshold is crossed.", is_true: "no" },
        { text: "Soft knee fixes the ratio at 2:1 regardless of user knob adjustments.", is_true: "no" },
        { text: "Hard knee is exclusively found on analog optical units with photocell light sources.", is_true: "no" }
      ],
      explanation: "<p><strong>Hard Knee vs Soft Knee:</strong> A hard knee applies the full specified ratio immediately the moment the input signal crosses the threshold, creating an abrupt change in gain response (ideal for limiting and controlling sharp transients). A soft knee introduces gain reduction progressively over a curved transition band (e.g. 6 to 10 dB wide around the threshold), making compression sound transparent and musical on vocals and acoustic instruments.</p>",
      expert_quote: {
        text: "Soft knee is essential for vocal transparency. The listener never hears the threshold tripwire being crossed.",
        author: "Mixing Secrets for the Small Studio"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "FET (1176) Compressor Characteristics",
      content: "The UREI / Universal Audio 1176 is an iconic Field-Effect Transistor (FET) compressor. What is its signature electronic characteristic?",
      type: "multi_choice",
      question: "What defining technical specification distinguishes classic FET compressors like the 1176?",
      answers: [
        { text: "Ultra-fast attack times measured in microseconds (20 to 800 microseconds) and program-dependent harmonic bite.", is_true: "yes" },
        { text: "Sluggish, multi-stage photo-resistor release times lasting several seconds.", is_true: "no" },
        { text: "Transparent linear VCA control with zero harmonic coloration or distortion.", is_true: "no" },
        { text: "Frequency-selective multiband splitting using 4th-order Linkwitz-Riley crossovers.", is_true: "no" }
      ],
      explanation: "<p><strong>FET (1176) Architecture:</strong> The 1176 uses a Field-Effect Transistor as a voltage-controlled variable resistor. Unlike optical compressors, FET circuits operate at blazing speeds: attack times range from 20 to 800 <em>microseconds</em> (millionths of a second). Furthermore, pushing the circuit generates pleasing odd-order harmonic distortion, giving lead vocals, aggressive bass, and snare drums an upfront, saturated edge.</p>",
      expert_quote: {
        text: "The 1176 doesn't just manage dynamics; it imparts energy, presence, and aggressive harmonic authority.",
        author: "Universal Audio Historical Archive"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Optical (LA-2A) Compressor Characteristics",
      content: "The Teletronix LA-2A relies on an electro-luminescent optical panel (T4 cell). How does this affect its release timing curve?",
      type: "multi_choice",
      question: "Why is the optical release curve of an LA-2A described as 'two-stage' and 'program-dependent'?",
      answers: [
        { text: "The initial 50% release occurs rapidly (60 ms), while the remaining tail decays slowly over several seconds.", is_true: "yes" },
        { text: "The release is fixed strictly at 100 milliseconds regardless of how hard the compressor is hit.", is_true: "no" },
        { text: "The photocell instantly cuts gain to infinity and holds it until manually reset.", is_true: "no" },
        { text: "It uses an analog tube clock to sync release times to external MIDI clock pulses.", is_true: "no" }
      ],
      explanation: "<p><strong>Optical (T4 Cell) Physics:</strong> The LA-2A uses an electro-luminescent light source paired with photo-resistors. When hit with audio, the light panel glows, decreasing photo-resistor resistance and attenuating gain. When audio ceases, the photocell releases approximately half its gain reduction quickly (within ~60 ms), while the remaining attenuation decays smoothly over 1 to 5 seconds depending on prior signal saturation. This program-dependent release prevents pumping on vocals.</p>",
      expert_quote: {
        text: "The LA-2A has a natural musical intelligence. You don't set numbers; the photocell breathes with the singer.",
        author: "Sound On Sound Processing Classics"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "VCA (SSL G-Master Bus) Compressor Characteristics",
      content: "Why are Voltage Controlled Amplifier (VCA) compressors (such as the SSL G-Master Bus compressor) standard choices for the mix master bus?",
      type: "multi_choice",
      question: "What technical qualities make VCA compressors the preferred choice for mix bus 'glue'?",
      answers: [
        { text: "High precision, low distortion, linear control, and predictable mathematical envelope behavior.", is_true: "yes" },
        { text: "Slow optical lag that completely blurs transient details into smooth ambient washes.", is_true: "no" },
        { text: "Inability to compress stereo signals simultaneously, preserving mono channel isolation.", is_true: "no" },
        { text: "Permanent 24 dB saturation that mimics damaged vacuum tube circuitry.", is_true: "no" }
      ],
      explanation: "<p><strong>VCA Precision & Mix Bus Glue:</strong> VCA designs (using circuits from THAT Corp or dbx) respond instantaneously to control voltages with high linearity, low total harmonic distortion (THD), and wide dynamic range. On a mix bus, a VCA compressor set to gentle ratios (1.5:1 or 2:1), 30 ms attack, and auto-release tightens bass and binds individual tracks together into a cohesive 'record' without smearing transient punch.</p>",
      expert_quote: {
        text: "The SSL G-Bus compressor is the sound of modern radio. It takes 40 separate tracks and glues them into one unified, cohesive record.",
        author: "Alan Moulder, Mix Engineer"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Sidechain Ducking Configuration",
      content: "A dance music producer wants the synth pad to duck in volume by 4 dB every time the kick drum strikes. How should the signal routing be patched?",
      type: "multi_choice",
      question: "To duck a synth pad with a kick drum, where is the kick signal routed on the pad compressor?",
      answers: [
        { text: "Insert compressor on the Synth Pad; route a pre-fader auxiliary send from the Kick to the Sidechain Key input.", is_true: "yes" },
        { text: "Insert compressor on the Kick track; route the Synth Pad audio directly into the main Kick input.", is_true: "no" },
        { text: "Route both Kick and Synth Pad to an auxiliary bus and invert the polarity of the Synth Pad.", is_true: "no" },
        { text: "Place a high-pass filter on the Master bus and automate the cutoff frequency with MIDI CC1.", is_true: "no" }
      ],
      explanation: "<p><strong>Sidechain Ducking Signal Flow:</strong> The compressor is inserted on the target track to be compressed (the Synth Pad). The sidechain detector path (key input) of that compressor is fed by an auxiliary send from the Kick drum. The compressor measures the kick's amplitude and applies gain reduction to the pad, leaving the kick itself completely uncompressed.</p>",
      expert_quote: {
        text: "Sidechain compression resolves low-end competition between kick and bass while creating the rhythmic breathing pulse of modern dance music.",
        author: "Production Masterclass Guide"
      },
      img: "/images/svg/dynamic_eq_threshold_action.svg"
    },
    {
      title: "Peak vs RMS Detection Modes",
      content: "When should an audio engineer choose RMS detection over Peak detection on a vocal compressor?",
      type: "multi_choice",
      question: "What is the primary operational difference between RMS and Peak compressor detection modes?",
      answers: [
        { text: "RMS averages signal energy over time to mimic human loudness perception, whereas Peak responds to instantaneous transients.", is_true: "yes" },
        { text: "Peak detection averages energy over 500 milliseconds, whereas RMS clamps within 1 microsecond.", is_true: "no" },
        { text: "RMS detection is used exclusively for digital brickwall peak limiting before streaming delivery.", is_true: "no" },
        { text: "Peak detection operates only on stereo tracks, whereas RMS operates only on mono microphone signals.", is_true: "no" }
      ],
      explanation: "<p><strong>Peak vs RMS Detection:</strong> Peak detection evaluates the instantaneous voltage of the waveform, reacting to microsecond peaks (essential for brickwall limiting and drum control). Root Mean Square (RMS) detection calculates the continuous average power of the signal over a sliding window (~30 to 100 ms). Because the human ear perceives loudness based on average acoustic energy rather than momentary peaks, RMS compression produces smooth, natural leveling on vocals and acoustic instruments.</p>",
      expert_quote: {
        text: "Use Peak when you need to protect digital converters; use RMS when you want transparent, musical leveling.",
        author: "Bob Katz, Mastering Audio"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Serial Compression Strategy",
      content: "Why do top mix engineers often prefer using two subtle compressors in series rather than a single compressor working heavily on a lead vocal?",
      type: "multi_choice",
      question: "What is the main advantage of Serial Compression (two compressors in series) on a lead vocal track?",
      answers: [
        { text: "Distributes gain reduction across two stages (e.g. fast FET catches peaks, optical provides smooth leveling) avoiding artifacts.", is_true: "yes" },
        { text: "Completely eliminates the need for dynamic automation fader riding in the DAW.", is_true: "no" },
        { text: "Guarantees zero phase cancellation by inverting the polarity on the second compressor.", is_true: "no" },
        { text: "Doubles the sample rate and bit depth of the vocal track through hardware oversampling.", is_true: "no" }
      ],
      explanation: "<p><strong>Serial Compression Benefits:</strong> When a single compressor attempts 10 to 12 dB of gain reduction, severe pumping, transient loss, and distortion often occur. In serial compression, Compressor 1 (e.g. an 1176 with fast attack) catches only the sharpest vocal peaks (2–3 dB reduction). Compressor 2 (e.g. an LA-2A with smooth optical release) provides gentle, continuous leveling (2–3 dB reduction). The combined result delivers 6–8 dB of total control with superior transparency and warmth.</p>",
      expert_quote: {
        text: "Two compressors doing 2 dB of work sound ten times more musical than one compressor straining for 4 dB.",
        author: "Serial Compression Studio Standard"
      },
      img: "/images/svg/serial_compression_sandwhich.svg"
    },
    {
      title: "Makeup Gain & Signal-to-Noise Ratio",
      content: "When compressing a noisy electric guitar track with 8 dB of gain reduction and applying +8 dB of Makeup Gain, what happens to the background noise floor?",
      type: "multi_choice",
      question: "What happens to the background amplifier hiss when heavy compression is applied with matching makeup gain?",
      answers: [
        { text: "The background amplifier hiss is boosted by 8 dB during quiet passages between guitar notes.", is_true: "yes" },
        { text: "The background amplifier hiss is completely filtered out by the compression threshold.", is_true: "no" },
        { text: "The background noise floor remains unchanged at its original decibel level.", is_true: "no" },
        { text: "The noise is converted into odd-order harmonics centered around 1 kHz.", is_true: "no" }
      ],
      explanation: "<p><strong>Makeup Gain & Noise Floor:</strong> Compression reduces the level of loud peaks. Applying Makeup Gain lifts the entire audio signal—including the quiet passages where the compressor is not active. If a compressor applies 8 dB of reduction to notes and the engineer adds +8 dB of makeup gain, the background noise floor during pauses is elevated by exactly 8 dB, making guitar amp hum or room hiss far more audible. A downward expander or noise gate is often used before the compressor to counteract this.</p>",
      expert_quote: {
        text: "Compression does not remove noise; it exposes it. Every decibel of makeup gain brings quiet room bleed closer to the listener.",
        author: "Audio Engineering Principles"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Brickwall Limiting & Inter-Sample Peaks",
      content: "Why do modern mastering guidelines recommend setting a digital true-peak limiter ceiling to -1.0 dBTP rather than 0.0 dBFS?",
      type: "multi_choice",
      question: "Why should true-peak limiters be set to a ceiling of -1.0 dBTP for commercial streaming delivery?",
      answers: [
        { text: "To prevent inter-sample clipping during digital-to-analog reconstruction and lossy streaming codec encoding (AAC/MP3).", is_true: "yes" },
        { text: "Because Edexcel regulations penalize exam submissions louder than -10 dBTP.", is_true: "no" },
        { text: "To guarantee that mono listeners receive exactly half the amplitude of stereo listeners.", is_true: "no" },
        { text: "Because digital audio interfaces cannot physically reproduce audio above -0.5 dBFS.", is_true: "no" }
      ],
      explanation: "<p><strong>True-Peak Limiting & Inter-Sample Peaks:</strong> While a sample-peak meter evaluates individual discrete digital samples, the reconstructed continuous analog waveform between samples can peak higher than 0 dBFS (inter-sample peaks). Furthermore, lossy compression codecs (such as MP3, AAC, and Ogg Vorbis used by Spotify and Apple Music) induce peak shifts during decoding. Setting the true-peak limiter ceiling to -1.0 dBTP (or -0.5 dBTP) prevents harsh digital clipping distortion upon playback.</p>",
      expert_quote: {
        text: "Leaving 1 dB of true-peak headroom ensures your master survives lossy streaming transcoders without spitting digital distortion.",
        author: "Bob Katz, Mastering Audio (AES Guidelines)"
      },
      img: "/images/gen/compressor_graph.png"
    }
  ]
};

// -------------------------------------------------------------
// 5. Author PQ26: Frequency Spectrum & Instrument EQ Pocketing (quiz-topic-45)
// -------------------------------------------------------------
const pq26 = {
  id: "quiz-topic-45",
  title: "Practical Quiz 26: Frequency Spectrum & Instrument EQ Pocketing",
  description: "Identify critical frequency bands across instruments, calculate filter Q bandwidth, resolve kick/bass masking, and apply complementary subtractive EQ.",
  type: "lp_quiz",
  campaignNodeId: null,
  questions: [
    {
      title: "Sub-Bass vs Bass Fundamental Range",
      content: "In acoustic instrument classification, what frequency range contains the sub-bass fundamentals (felt more than heard in commercial playback systems)?",
      type: "multi_choice",
      question: "Which frequency range corresponds to the Sub-Bass register in audio production?",
      answers: [
        { text: "20 Hz to 60 Hz (contains sub-bass rumble, 808 fundamental drops, and lowest pipe organ notes).", is_true: "yes" },
        { text: "100 Hz to 250 Hz (contains electric bass fundamentals and acoustic guitar resonance).", is_true: "no" },
        { text: "500 Hz to 1 kHz (contains midrange woodiness and horn fundamentals).", is_true: "no" },
        { text: "2 kHz to 4 kHz (contains human speech intelligibility and presence).", is_true: "no" }
      ],
      explanation: "<p><strong>Sub-Bass (20–60 Hz):</strong> The human hearing spectrum begins at 20 Hz. The sub-bass register (20–60 Hz) provides physical vibration, weight, and low-end extension. Frequencies in this region consume massive electrical amplifier power and excursion. High-pass filtering non-bass elements (vocals, guitars, cymbals) around 60–80 Hz cleans up headroom across the entire mix.</p>",
      expert_quote: {
        text: "Sub-bass is visceral energy. Control it tightly, because untamed 30 Hz energy will rob your master bus of punch and headroom.",
        author: "Sound On Sound Mixing Guide"
      },
      img: "/images/svg/frequency_spectrum_treble.svg"
    },
    {
      title: "Resolving Kick Drum and Bass Guitar Clashing",
      content: "Both the kick drum and bass guitar compete for dominance around 80 Hz and 100 Hz. What complementary EQ strategy creates room for both instruments?",
      type: "multi_choice",
      question: "How should complementary subtractive EQ be applied to resolve frequency masking between kick drum and bass guitar?",
      answers: [
        { text: "Boost kick fundamental at 60 Hz while cutting 60 Hz on bass; boost bass at 100 Hz while cutting 100 Hz on kick.", is_true: "yes" },
        { text: "Boost 80 Hz by +6 dB on both kick and bass simultaneously to maximize energy.", is_true: "no" },
        { text: "Apply high-pass filters at 200 Hz to both instruments to eliminate low-end clash.", is_true: "no" },
        { text: "Pan the kick drum hard left and the bass guitar hard right across the stereo field.", is_true: "no" }
      ],
      explanation: "<p><strong>Complementary EQ Pocketing:</strong> When two instruments share the same low-frequency zone, boosting both produces acoustic masking and phase mud. The complementary technique ('pocketing') decides which instrument owns which frequency: if the kick drum dominates the sub thump (55–65 Hz), cut the bass guitar with a narrow bell at 60 Hz. In return, give the bass guitar the punch zone (90–120 Hz) and cut 100 Hz slightly on the kick drum.</p>",
      expert_quote: {
        text: "Two instruments cannot occupy the same frequency address at the same volume. Carve a pocket in one so the other can live.",
        author: "Bobby Owsinski, The Mixing Engineer's Handbook"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "Low-Mid 'Mud' and 'Boxiness' (250–500 Hz)",
      content: "A mix sounds congested, muddy, and lacking in depth. Across multiple tracks (acoustic guitar, snare body, vocal buildup), what frequency region is typically the culprit?",
      type: "multi_choice",
      question: "Which frequency zone is universally associated with 'mud', 'muffle', and congested acoustic buildup?",
      answers: [
        { text: "250 Hz to 500 Hz (the lower midrange where acoustic body resonances and harmonics congregate).", is_true: "yes" },
        { text: "20 Hz to 40 Hz (sub-audible rumble and DC offset).", is_true: "no" },
        { text: "2 kHz to 4 kHz (harsh transient bite and vocal intelligibility).", is_true: "no" },
        { text: "12 kHz to 16 kHz (air and cymbals sizzle).", is_true: "no" }
      ],
      explanation: "<p><strong>The 'Mud' Zone (250–500 Hz):</strong> Almost every acoustic instrument (guitars, piano, vocals, snare, tom bodies, synth pads) produces body resonance and lower harmonics between 200 Hz and 500 Hz. When 30 tracks are summed together, energy in this zone accumulates rapidly, suffocating the mix in an indistinct 'cardboard box' muffle. Gentle subtractive notch filtering in this band clarifies the entire arrangement.</p>",
      expert_quote: {
        text: "If a mix lacks clarity, don't rush to boost treble. Sweep a bell cut through 250 Hz to 400 Hz first—the clouds will part.",
        author: "Al Schmitt, Legendary Recording Engineer"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "Vocal Nasality and 'Honk' (800 Hz–1.5 kHz)",
      content: "A lead vocal sounds like the singer is singing through a pinched nose or a plastic megaphone. What frequency band should be attenuated to fix this?",
      type: "multi_choice",
      question: "Which frequency range should be notched out to remove nasal, telephone-like 'honk' from a vocal track?",
      answers: [
        { text: "800 Hz to 1.5 kHz (the nasal resonance and megaphone horn frequency band).", is_true: "yes" },
        { text: "80 Hz to 120 Hz (chest resonance and plosives).", is_true: "no" },
        { text: "5 kHz to 8 kHz (sibilance and fricatives).", is_true: "no" },
        { text: "15 kHz to 20 kHz (breath air and sheen).", is_true: "no" }
      ],
      explanation: "<p><strong>Nasal / Honky Frequencies (800 Hz–1.5 kHz):</strong> The acoustic resonant cavity of the human nasal passage peaks between 800 Hz and 1.5 kHz. An excess in this range makes vocals sound pinched, honky, and cheap. Using a narrow parametric cut of 2 to 4 dB between 900 Hz and 1.2 kHz softens harsh mid-range poke and pushes the vocal back into a flattering, intimate pocket.</p>",
      expert_quote: {
        text: "1 kHz is the honk frequency. It cuts through on cheap phone speakers, but too much will make your lead vocal sound like a cartoon.",
        author: "Mix Magazine Vocal Masterclass"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "Presence and Speech Intelligibility (2–5 kHz)",
      content: "According to the Fletcher-Munson equal-loudness curves, the human ear is most sensitive to acoustic energy in which frequency band?",
      type: "multi_choice",
      question: "Which frequency range represents peak human hearing sensitivity and consonant clarity?",
      answers: [
        { text: "2 kHz to 5 kHz (the presence band, human ear canal resonance, and speech intelligibility).", is_true: "yes" },
        { text: "20 Hz to 60 Hz (sub-bass physical energy).", is_true: "no" },
        { text: "300 Hz to 600 Hz (warmth and instrument body).", is_true: "no" },
        { text: "16 kHz to 20 kHz (the limits of human hearing acuity).", is_true: "no" }
      ],
      explanation: "<p><strong>The Presence Band (2–5 kHz):</strong> Evolutionarily tuned to infant cries and human speech consonants (such as 'k', 't', 'p'), the acoustic resonance of the human ear canal amplifies sounds between 2.5 kHz and 4.5 kHz. Boosting this region brings instruments forward in the soundstage; however, excessive energy here causes listener ear fatigue and piercing harshness.</p>",
      expert_quote: {
        text: "The 3 kHz region is the steering wheel of acoustic depth. A 1 dB boost brings a singer right into your face; a 1 dB cut pushes them into the background.",
        author: "Fletcher & Munson Acoustical Research"
      },
      img: "/images/svg/frequency_spectrum_treble.svg"
    },
    {
      title: "Vocal Sibilance Zone (5–8 kHz)",
      content: "Harsh, whistling 'S', 'T', and 'Z' sounds in a vocal recording are called sibilance. In what frequency range does vocal sibilance predominantly occur?",
      type: "multi_choice",
      question: "Where is vocal sibilance typically concentrated in the frequency spectrum?",
      answers: [
        { text: "5 kHz to 8 kHz (female sibilance often peaks around 7–8 kHz; male sibilance around 5–6 kHz).", is_true: "yes" },
        { text: "200 Hz to 400 Hz (vocal chest fundamental resonance).", is_true: "no" },
        { text: "1 kHz to 2 kHz (nasal resonance).", is_true: "no" },
        { text: "12 kHz to 18 kHz (ultra-high air and shimmer).", is_true: "no" }
      ],
      explanation: "<p><strong>Sibilance (5–8 kHz):</strong> Sibilance occurs when air turbulence rushes across the tongue and teeth during unvoiced fricative consonants ('S', 'Sh', 'Ch', 'Z'). This acoustic energy concentrates between 5 kHz and 8.5 kHz. Rather than using static EQ cuts that permanently dull the entire vocal, mix engineers use dynamic EQs or dedicated de-essers that compress this band only when sibilant peaks exceed the threshold.</p>",
      expert_quote: {
        text: "Sibilance is transient high-frequency distortion from the human mouth. Control it dynamically, or your vocal will sting like a needle on bright headphones.",
        author: "De-Esser Engineering Focus"
      },
      img: "/images/svg/de_esser_frequency_chart.svg"
    },
    {
      title: "Air Band & Brilliance (10–20 kHz)",
      content: "What acoustic sensation is produced by boosting the 'Air' band with a high-shelf filter between 12 kHz and 16 kHz?",
      type: "multi_choice",
      question: "What mix quality is imparted by boosting frequencies above 12 kHz?",
      answers: [
        { text: "Sense of three-dimensional space, breath intimacy, cymbal shimmer, and modern expensive sheen.", is_true: "yes" },
        { text: "Aggressive mid-range punch and transient attack on snare drums.", is_true: "no" },
        { text: "Low-end warmth and analog tape saturation weight.", is_true: "no" },
        { text: "Complete mono compatibility without phase cancellation.", is_true: "no" }
      ],
      explanation: "<p><strong>The Air Band (10–20 kHz):</strong> Made famous by Peter Baxandall and the Maag EQ4 ('Air Band'), frequencies above 10 kHz contain few musical fundamentals, consisting almost entirely of microscopic harmonic overtones, vocal breath intake, room sheen, and cymbal decay. A gentle shelf boost here opens up acoustic space and expensive polish without irritating the ear's sensitive 3 kHz presence zone.</p>",
      expert_quote: {
        text: "The Air Band at 20 kHz is psychoacoustic magic. You don't hear a direct pitch; you feel the room expand around the singer.",
        author: "Cliff Maag, Developer of the Air Band"
      },
      img: "/images/svg/frequency_spectrum_treble.svg"
    },
    {
      title: "Filter Q Factor Bandwidth Calculation",
      content: "A parametric equalizer is centered at a frequency ($f_0$) of 1000 Hz, with a bandwidth ($\\Delta f$) between the -3 dB points of 200 Hz. What is the Q factor?",
      type: "multi_choice",
      question: "Calculate the Q factor of a bell filter with a center frequency of 1000 Hz and a bandwidth of 200 Hz.",
      answers: [
        { text: "Q = 5.0 (Formula: Q = f₀ ÷ Δf = 1000 ÷ 200 = 5.0; narrow surgical filter).", is_true: "yes" },
        { text: "Q = 0.2 (Formula: 200 ÷ 1000 = 0.2; broad filter).", is_true: "no" },
        { text: "Q = 2.0 (Formula: 1000 - 200 = 800 ÷ 400).", is_true: "no" },
        { text: "Q = 10.0 (Formula: 1000 × 2 ÷ 200).", is_true: "no" }
      ],
      explanation: "<p><strong>Q Factor Calculation:</strong><br/>$$Q = \\frac{f_0}{\\Delta f}$$<br/>$$Q = \\frac{1000\\text{ Hz}}{200\\text{ Hz}} = \\mathbf{5.0}$$<br/>The Quality Factor ($Q$) is inversely proportional to bandwidth. A high $Q$ value ($Q > 3$) denotes a narrow, surgical notch filter (used for surgical problem-frequency cutting). A low $Q$ value ($Q < 1$) denotes a broad, musical bell curve (used for gentle tonal shaping).</p>",
      expert_quote: {
        text: "Broad Q for musical boosts, narrow Q for surgical cuts. This classic golden rule saves mixes from ringing phase distortion.",
        author: "Edexcel A-Level Component 3/4 Technical Syllabus"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "High-Pass Filter Slope Selection",
      content: "What is the key difference in acoustic behavior between a 12 dB/octave High-Pass Filter and a 24 dB/octave High-Pass Filter?",
      type: "multi_choice",
      question: "How does a 24 dB/octave filter slope differ practically from a 12 dB/octave slope?",
      answers: [
        { text: "24 dB/oct provides a steeper cutoff attenuation but introduces greater phase shift near the corner frequency.", is_true: "yes" },
        { text: "12 dB/oct introduces four times more phase distortion than a 24 dB/oct filter.", is_true: "no" },
        { text: "24 dB/oct completely eliminates all frequencies below the cutoff with zero phase rotation.", is_true: "no" },
        { text: "12 dB/oct filters are only capable of boosting frequencies, never attenuating them.", is_true: "no" }
      ],
      explanation: "<p><strong>Filter Slopes & Phase Shift:</strong> Filter slope orders (6 dB/oct per pole) determine how sharply frequencies are attenuated below the corner frequency ($f_c$). A 1st-order filter attenuates at 6 dB/oct, 2nd-order at 12 dB/oct, and 4th-order at 24 dB/oct. While steeper 24 dB/oct slopes aggressively protect sub-bass headroom, analog and minimum-phase digital IIR filters introduce 90° of phase rotation per pole near $f_c$, which can cause phase smearing or transient ringing on low-end instruments.</p>",
      expert_quote: {
        text: "Every filter pole carries a phase tax. Don't use a 4th-order brickwall when a gentle 12 dB/oct slope gets the job done cleanly.",
        author: "Digital Signal Processing for Audio Engineers"
      },
      img: "/images/svg/high_pass_filter_sweep_riser.svg"
    },
    {
      title: "Acoustic Guitar Low-End Boom (80–120 Hz)",
      content: "An acoustic guitar recorded with a cardioid condenser mic close to the soundhole sounds excessively boomy and tubby. What acoustic cause and EQ remedy apply?",
      type: "multi_choice",
      question: "Why does close-micing an acoustic guitar soundhole cause boomy bass, and how is it corrected?",
      answers: [
        { text: "Proximity effect and soundhole cavity resonance; apply a high-pass filter at 80 Hz and dip 100–120 Hz.", is_true: "yes" },
        { text: "High-frequency phase cancellation; boost 10 kHz with an active bell curve.", is_true: "no" },
        { text: "Acoustic comb filtering; flip the phantom power switch on the interface.", is_true: "no" },
        { text: "Preamp clipping distortion; lower the digital word clock frequency.", is_true: "no" }
      ],
      explanation: "<p><strong>Soundhole Boom & Proximity Effect:</strong> The body of an acoustic guitar acts as a Helmholtz resonator, projecting heavy resonant air out of the soundhole between 85 Hz and 110 Hz. Furthermore, placing directional (cardioid) microphones close to the source induces severe proximity effect bass boost. To remedy this, engage an 80 Hz high-pass filter to strip sub-rumble and use a parametric bell to notch out 3 to 4 dB around 100–120 Hz.</p>",
      expert_quote: {
        text: "Never point a microphone directly into the soundhole unless you want a muddy boom machine. Aim at the 12th fret, and filter the low rumble.",
        author: "Acoustic Recording Techniques Guide"
      },
      img: "/images/svg/mic_placement_acoustic_guitar.svg"
    },
    {
      title: "Snare Ring & Resonant Frequency Notching",
      content: "A live snare drum has an irritating metallic 'ping' ringing after every hit. What technique should an engineer use to isolate and remove this specific ring?",
      type: "multi_choice",
      question: "What is the standard procedure for isolating and notching out an annoying snare drum ring?",
      answers: [
        { text: "Boost a narrow bell (high Q), sweep through 300–800 Hz until the ring is exaggerated, then pull down into a notch cut.", is_true: "yes" },
        { text: "Apply an aggressive low-pass filter at 1 kHz to eliminate all upper frequencies.", is_true: "no" },
        { text: "Compress the entire snare drum with a 20:1 ratio and zero attack time.", is_true: "no" },
        { text: "Invert the phase of the overhead microphones relative to the bass guitar.", is_true: "no" }
      ],
      explanation: "<p><strong>Boost-and-Sweep Notching Technique:</strong> Snare drum metal shells and heads produce distinct resonant ring frequencies typically between 350 Hz and 700 Hz. The standard engineering technique is: (1) set a parametric band to high Q (narrow bandwidth), (2) boost by +10 dB, (3) slowly sweep the frequency knob until the offending metallic ping jumps out violently, (4) flip the boost into a precise -6 dB to -10 dB cut. This eliminates the ring without hollowing out the drum's body.</p>",
      expert_quote: {
        text: "The boost-and-sweep method is your acoustic radar. Find the enemy frequency, then surgically eliminate it.",
        author: "Studio Recording and Mixing Methods"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "Linear Phase EQ vs Minimum Phase EQ",
      content: "When should a mastering engineer choose a Linear Phase EQ over a standard Minimum Phase (analog-modeled) EQ?",
      type: "multi_choice",
      question: "What is the primary advantage of Linear Phase EQ when processing multi-mic drum stems or mastering buses?",
      answers: [
        { text: "Maintains identical phase delay across all frequencies, preventing phase smearing between summed signals.", is_true: "yes" },
        { text: "Requires zero computer CPU processing power and generates zero latency.", is_true: "no" },
        { text: "Completely eliminates the acoustic phenomenon known as pre-ringing.", is_true: "no" },
        { text: "Automatically synthesizes lost harmonics above the Nyquist cutoff frequency.", is_true: "no" }
      ],
      explanation: "<p><strong>Linear Phase vs Minimum Phase:</strong> Standard analog and digital IIR equalizers alter phase relationships around their cutoff and boost frequencies. When applied to multi-microphone setups (such as a multi-tracked drum kit) or parallel processing chains, this phase shift causes comb filtering between phase-aligned mics. A Linear Phase EQ shifts all frequencies equally in time, ensuring zero phase coloration—though at the cost of processing latency and potential 'pre-ringing' on sharp transients.</p>",
      expert_quote: {
        text: "Linear Phase EQ is crucial for parallel processing. It guarantees your dry and wet signals sum without comb filter cancellation.",
        author: "FabFilter Pro-Q Architectural Guide"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    }
  ]
};

// -------------------------------------------------------------
// 6. Author PQ27: Phase Alignment, Polarities & Comb Filtering (quiz-topic-46)
// -------------------------------------------------------------
const pq27 = {
  id: "quiz-topic-46",
  title: "Practical Quiz 27: Phase Alignment, Polarities & Comb Filtering",
  description: "Master the 3:1 microphone distance rule, top/bottom snare polarity reversal, comb filter null frequencies, Haas effect, and correlation meter reading.",
  type: "lp_quiz",
  campaignNodeId: null,
  questions: [
    {
      title: "The 3:1 Microphone Distance Rule",
      content: "Two microphones are placed to record two different vocalists in the same live room. If Vocalist 1 is 1 foot away from Microphone 1, how far away must Microphone 2 be placed to minimize phase bleed?",
      type: "multi_choice",
      question: "Applying the 3:1 Rule, if Mic 1 is 1 foot from Singer 1, what is the minimum distance between Mic 1 and Mic 2?",
      answers: [
        { text: "At least 3 feet apart (Formula: 1 ft distance to source × 3 = 3 ft minimum separation).", is_true: "yes" },
        { text: "At least 1.5 feet apart (Formula: 1 ft × 1.5).", is_true: "no" },
        { text: "Exactly 6 feet apart regardless of source distance.", is_true: "no" },
        { text: "Distance does not matter as long as directional cardioid mics are used.", is_true: "no" }
      ],
      explanation: "<p><strong>The 3:1 Distance Rule:</strong> When using multiple microphones simultaneously, the acoustic bleed from Source A entering Microphone B can interfere with Microphone A, causing phase cancellation and hollow comb filtering. The 3:1 rule states that the distance between the two microphones must be at least three times the distance from each microphone to its intended sound source. This ensures the leaking signal is attenuated by at least 9 to 12 dB relative to the primary signal, rendering phase interference inaudible.</p>",
      expert_quote: {
        text: "The 3:1 rule is the golden law of multi-mic acoustic hygiene. Respect it, and your live acoustic tracks will remain punchy and clear.",
        author: "Lou Burroughs, Multi-Mic Acoustic Pioneer"
      },
      img: "/images/gen/diagram_3_to_1_rule.svg"
    },
    {
      title: "Snare Top and Bottom Phase Polarity Flip",
      content: "An engineer records a snare drum using two microphones: one aimed down at the top batter head, and one aimed up at the bottom resonant head. Why must the bottom mic polarity be inverted 180°?",
      type: "multi_choice",
      question: "Why must the polarity of the snare bottom microphone be inverted by 180° when mixed with the snare top mic?",
      answers: [
        { text: "When the stick strikes down, the top head moves away from the top mic while the bottom head moves toward the bottom mic.", is_true: "yes" },
        { text: "Because bottom snare microphones do not require +48V phantom power.", is_true: "no" },
        { text: "To eliminate the high-frequency buzzing rattle of the snare wires completely.", is_true: "no" },
        { text: "Because the bottom microphone cable is wired out of polarity by manufacturing standards.", is_true: "no" }
      ],
      explanation: "<p><strong>Opposing Diaphragm Motion:</strong> When the drummer strikes the batter head downwards, the top head moves downward (away from the top mic diaphragm, generating a rarefaction / negative electrical impulse). Simultaneously, the air inside the drum pushes the bottom head downward (toward the bottom mic diaphragm, generating a compression / positive impulse). Because the diaphragms move in opposite relative directions, the two signals are 180° out of phase. Summing them cancels low-end body; flipping the bottom mic polarity restores massive low-end punch.</p>",
      expert_quote: {
        text: "If your snare drum sounds thin and tinny when you bring up the bottom snare mic, hit the polarity switch. The low end will instantly roar back.",
        author: "Studio Drum Micing Essentials"
      },
      img: "/images/gen/diagram_3_to_1_rule.svg"
    },
    {
      title: "Comb Filtering Null Frequency Formula",
      content: "A direct sound and a single delayed reflection sum together. If the reflection is delayed by exactly 1 millisecond (0.001 s), at what fundamental frequency will the first complete phase cancellation null occur?",
      type: "multi_choice",
      question: "Calculate the first comb filter cancellation null frequency caused by a 1.0 ms time delay.",
      answers: [
        { text: "500 Hz (Formula: f_null = 1 ÷ (2 × delay) = 1 ÷ 0.002 s = 500 Hz).", is_true: "yes" },
        { text: "1,000 Hz (Formula: f = 1 ÷ 0.001 s = 1000 Hz).", is_true: "no" },
        { text: "250 Hz (Formula: 1 ÷ 0.004 s = 250 Hz).", is_true: "no" },
        { text: "100 Hz (Formula: 1 ÷ 0.010 s = 100 Hz).", is_true: "no" }
      ],
      explanation: "<p><strong>Comb Filter Null Frequency Math:</strong><br/>Destructive interference occurs when the delayed path is exactly half a wavelength ($180^\\circ$) out of phase with the direct path:<br/>$$f_{\\text{null}} = \\frac{1}{2 \\times \\Delta t}$$<br/>For a delay of $\\Delta t = 1.0\\text{ ms} = 0.001\\text{ s}$:<br/>$$f_{\\text{null}} = \\frac{1}{2 \\times 0.001} = \\mathbf{500\\text{ Hz}}$$<br/>Subsequent nulls occur at odd harmonics: $1500\\text{ Hz}$, $2500\\text{ Hz}$, $3500\\text{ Hz}$, creating the classic jagged 'comb' frequency response.</p>",
      expert_quote: {
        text: "A mere 1 ms acoustic reflection from a hard console desk will hollow out 500 Hz, 1.5 kHz, and 2.5 kHz. Comb filtering destroys natural timbre.",
        author: "Acoustic Engineering Calculations"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    },
    {
      title: "Bass Guitar DI and Mic Phase Alignment",
      content: "When recording a bass guitar with both a Direct Injection (DI) box and a microphone placed on the speaker cabinet, why does the mic track arrive later than the DI track?",
      type: "multi_choice",
      question: "Why is a microphone signal delayed relative to a direct DI signal on the same bass performance?",
      answers: [
        { text: "Electricity travels through the DI cable near light speed, whereas acoustic sound travels through air at 343 m/s.", is_true: "yes" },
        { text: "The DI box incorporates an active 100-millisecond analog delay buffer circuit.", is_true: "no" },
        { text: "Microphones use analog transformers that slow down electronic audio signals.", is_true: "no" },
        { text: "DAW audio interfaces automatically delay microphone inputs to prevent clipping.", is_true: "no" }
      ],
      explanation: "<p><strong>Acoustic Propagation Delay:</strong> The DI signal travels through copper cables at a significant fraction of the speed of light (almost instantaneous). By contrast, the acoustic sound from the amplifier speaker cone travels through the air at approximately 343 meters per second (~1 millisecond per foot). If the mic is placed 1 foot from the grille, the mic track lags behind the DI track by ~1 ms. Zooming in and nudging the mic waveform backward to align transient peaks restores full, uncancelled sub-bass thump.</p>",
      expert_quote: {
        text: "Always zoom into sample level when blending bass DI and amp. When the wave crests line up perfectly, the low end doubles in power.",
        author: "Bass Production Masterclass"
      },
      img: "/images/gen/diagram_signal_flow.png"
    },
    {
      title: "The Haas Effect (Precedence Effect)",
      content: "If an identical audio signal is fed to both left and right speakers, but the right speaker is delayed by 10 milliseconds, how will the listener perceive the sound?",
      type: "multi_choice",
      question: "According to the Haas (Precedence) Effect, what occurs when one stereo speaker is delayed by 10 ms?",
      answers: [
        { text: "The sound is perceived as coming entirely from the non-delayed left speaker, with added spatial width.", is_true: "yes" },
        { text: "The listener hears two distinct, separate rhythmic echoes in the left and right ears.", is_true: "no" },
        { text: "The audio cancels completely into absolute silence in the center of the room.", is_true: "no" },
        { text: "The pitch of the right speaker is perceived as one octave lower.", is_true: "no" }
      ],
      explanation: "<p><strong>The Haas (Precedence) Effect:</strong> Discovered by Helmut Haas in 1949, this psychoacoustic law states that when two identical sounds arrive at the ears with a time delay of less than ~35 ms, the human brain fuses them into a single auditory event. The perceived location is determined almost entirely by the sound that arrives first (the non-delayed left speaker), while the delayed sound imparts spatial warmth and width rather than a separate discrete echo.</p>",
      expert_quote: {
        text: "The precedence effect shows that timing dominates pan pots. The ear always points toward whichever speaker speaks first.",
        author: "Helmut Haas, Psychoacoustic Research (1949)"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "Haas Widening and Mono Cancellation",
      content: "A producer creates fake stereo width on a lead vocal by duplicating the track, panning Left and Right, and delaying the Right track by 15 ms. What happens when the mix is played on a mono phone speaker?",
      type: "multi_choice",
      question: "What catastrophe occurs when a Haas-delayed stereo vocal is collapsed to mono?",
      answers: [
        { text: "Severe comb filtering hollows out the vocal, making it sound thin, distant, or completely muted.", is_true: "yes" },
        { text: "The vocal volume doubles by +6 dB with zero frequency alteration.", is_true: "no" },
        { text: "The vocal pitch shifts upward by an exact musical fifth.", is_true: "no" },
        { text: "The DAW automatically mutes the left speaker to maintain mono headroom.", is_true: "no" }
      ],
      explanation: "<p><strong>Mono Collapse of Haas Widening:</strong> When two identical tracks separated by a short time delay (e.g. 15 ms) are panned hard left and hard right, they sound wide in stereo headphones. However, when summed to mono (as on smart speakers, smartphones, club sound systems, and AM radio), the delayed channel sums directly with the dry channel. This creates severe, static comb filtering across the voice spectrum, causing the lead vocal to hollow out, sound hollow, and drop dramatically in volume.</p>",
      expert_quote: {
        text: "Haas widening is a seductive trap. It sounds huge in your headphones, but play it on a phone in mono and your lead vocal literally vanishes.",
        author: "Mix Inspection & Mastering Protocol"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "Phase Correlation Meter Reading (+1 to -1)",
      content: "A phase correlation meter displays a value ranging from +1.0 to -1.0. What does a reading hovering around -0.8 indicate?",
      type: "multi_choice",
      question: "What does a phase correlation reading of -0.8 signify about a stereo mix?",
      answers: [
        { text: "Major out-of-phase relationship; the stereo channels will suffer massive phase cancellation when summed to mono.", is_true: "yes" },
        { text: "Perfect mono compatibility with 100% identical signals in left and right channels.", is_true: "no" },
        { text: "Completely wide and natural stereo image with zero risk of mono degradation.", is_true: "no" },
        { text: "The input audio is clipping the analog-to-digital converter by 0.8 decibels.", is_true: "no" }
      ],
      explanation: "<p><strong>Phase Correlation Metering:</strong><br/>• <strong>+1.0:</strong> Pure mono (identical Left and Right channels; 100% mono compatible).<br/>• <strong>0.0 to +0.5:</strong> Healthy, natural stereo field with independent musical information.<br/>• <strong>Below 0.0 to -1.0:</strong> Out-of-phase audio. Phase cancellation occurs when summed to mono.<br/>A reading of -0.8 indicates severe phase inversion, meaning instruments will cancel out almost entirely on mono playback systems.</p>",
      expert_quote: {
        text: "Keep your eyes on the correlation meter. If the needle spends time on the left side of zero, your mix is bleeding in mono.",
        author: "Metering & Quality Control Standards"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "XY Coincident vs Spaced Pair (A/B) Phase Coherence",
      content: "Why does an XY coincident stereo microphone setup (two directional capsules aligned at 90° at the exact same point) have superior mono compatibility compared to a Spaced Pair (A/B)?",
      type: "multi_choice",
      question: "Why does the XY stereo micing technique avoid phase cancellation when collapsed to mono?",
      answers: [
        { text: "Sound arrives at both capsules at virtually the exact same time, eliminating time-delay phase differences.", is_true: "yes" },
        { text: "XY micing uses omnidirectional capsules that are immune to phase cancellation.", is_true: "no" },
        { text: "XY microphones automatically invert polarity on the right channel in hardware.", is_true: "no" },
        { text: "The two capsules are spaced exactly 3 feet apart in accordance with the 3:1 rule.", is_true: "no" }
      ],
      explanation: "<p><strong>Coincident (XY) vs Spaced (AB) Phase:</strong> In an XY coincident pair, the microphone capsules are mounted as close together as physically possible without touching (coincident in space). Stereo imaging is achieved purely through intensity (volume) differences caused by the off-axis polar patterns, with virtually zero time-of-arrival difference ($\Delta t \approx 0$). In a Spaced Pair (A/B), the capsules are separated by 1 to 3 feet, causing time-delay differences that produce comb filtering when summed to mono.</p>",
      expert_quote: {
        text: "XY captures stereo through volume differences, not timing. Collapse XY to mono, and it remains 100% pristine.",
        author: "Stereo Microphone Techniques (AES Anthology)"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "Boundary Microphone (PZM) Phase Advantage",
      content: "Why are Boundary Microphones (Pressure Zone Microphones - PZM) mounted directly onto flat reflective surfaces (like stage floors or grand piano lids)?",
      type: "multi_choice",
      question: "What acoustic phase advantage is gained by mounting a boundary microphone directly against a flat reflective plane?",
      answers: [
        { text: "Eliminates destructive phase cancellation from floor reflections by placing the diaphragm inside the pressure zone.", is_true: "yes" },
        { text: "Eliminates the need for preamplifiers by doubling the output voltage to line level.", is_true: "no" },
        { text: "Converts the microphone from an analog transducer into a high-speed optical digital interface.", is_true: "no" },
        { text: "Prevents high frequencies above 5 kHz from reaching the capsule diaphragm.", is_true: "no" }
      ],
      explanation: "<p><strong>Boundary / PZM Mechanics:</strong> When a conventional microphone is placed a few inches above a reflective floor or boundary, sound reflects off the surface into the mic, arriving milliseconds after the direct sound and causing audible comb filtering. A boundary microphone places a tiny capsule micrometers away from the reflective plate (inside the acoustic 'pressure zone'). Direct sound and reflected sound arrive at the exact same time, summing in phase (+6 dB gain) with zero comb filtering.</p>",
      expert_quote: {
        text: "In the boundary pressure zone, there is no delayed reflection—only direct, coherent acoustic energy.",
        author: "Crown PZM Engineering White Paper"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    },
    {
      title: "Goniometer (Lissajous Display) Interpretation",
      content: "When monitoring a master track on a Goniometer / Vectorscope, what does a completely horizontal line (spanning left to right along the horizontal axis) signify?",
      type: "multi_choice",
      question: "On a mastering goniometer display, what does a pure horizontal line indicate?",
      answers: [
        { text: "100% out-of-phase stereo signal (Left and Right channels are identical but opposite in polarity; correlation = -1.0).", is_true: "yes" },
        { text: "100% in-phase mono signal located dead center (correlation = +1.0).", is_true: "no" },
        { text: "A signal that is only playing out of the left speaker with zero right audio.", is_true: "no" },
        { text: "Normal balanced stereo with ideal commercial dispersion.", is_true: "no" }
      ],
      explanation: "<p><strong>Goniometer / Vectorscope Geometry:</strong><br/>• <strong>Vertical Line (90°):</strong> Pure mono in-phase signal (Left = Right; correlation +1.0).<br/>• <strong>Diagonal Line (45° or 135°):</strong> Sound panned exclusively to hard left or hard right.<br/>• <strong>Round / Oval Cloud:</strong> Healthy, balanced stereo mix with natural width.<br/>• <strong>Horizontal Line (0°/180°):</strong> Pure anti-phase (Left = -Right; correlation -1.0). When collapsed to mono, this signal will cancel out into complete digital silence.</p>",
      expert_quote: {
        text: "Vertical means mono safety; horizontal means absolute cancellation disaster. Read your vectorscope before printing the master.",
        author: "Mastering Engineering Protocols"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "Overhead Drum Micing: Glyn Johns Method",
      content: "In the legendary Glyn Johns 3-mic drum technique, what measurement ensures the two overhead microphones stay in phase with the snare drum?",
      type: "multi_choice",
      question: "How is phase alignment between the two overhead microphones achieved in the Glyn Johns drum technique?",
      answers: [
        { text: "Both the top overhead mic and the side floor-tom mic are measured with a tape measure to be equidistant from the snare center.", is_true: "yes" },
        { text: "The microphones are placed exactly 10 feet in the air and routed through hardware limiters.", is_true: "no" },
        { text: "A digital delay of 50 milliseconds is added to the side microphone track.", is_true: "no" },
        { text: "One microphone is placed inside the bass drum and the other is placed outside the room.", is_true: "no" }
      ],
      explanation: "<p><strong>Glyn Johns Phase Coherence:</strong> Glyn Johns (Led Zeppelin, The Who, The Rolling Stones) placed one overhead microphone directly above the snare (around 40–45 inches high) and a second microphone just above the floor tom pointing across the snare. To prevent phase cancellation, a piece of string or tape measure is stretched from the center of the snare drum to the capsule of each mic, ensuring both microphones are at the exact same distance (e.g. 42 inches). The snare arrives at both capsules simultaneously, locking the center image.</p>",
      expert_quote: {
        text: "The tape measure is the most important tool in drum micing. When both overheads are equidistant from the snare, the kit sounds massive.",
        author: "Glyn Johns, Sound Producer & Engineer"
      },
      img: "/images/gen/diagram_3_to_1_rule.svg"
    },
    {
      title: "Phase Rotation vs Polarity Inversion",
      content: "Why is flipping the polarity switch (often labeled 'Phase Ø') on a mixing console technically different from adjusting true acoustic phase?",
      type: "multi_choice",
      question: "What is the technical distinction between Polarity Inversion and Phase Shift?",
      answers: [
        { text: "Polarity inversion flips the electrical voltage (180° across all frequencies); Phase shift is a time delay that varies with frequency.", is_true: "yes" },
        { text: "Polarity inversion only affects frequencies below 100 Hz; Phase shift affects only treble frequencies.", is_true: "no" },
        { text: "Polarity inversion requires analog vacuum tubes; Phase shift is only possible inside modern computer software.", is_true: "no" },
        { text: "They are mathematically and electronically identical terms with zero difference.", is_true: "no" }
      ],
      explanation: "<p><strong>Polarity vs Phase:</strong> Polarity refers to the electrical orientation of a signal—flipping the polarity switch inverts the positive and negative electrical voltages instantaneously (multiplying the entire signal by -1 across all frequencies regardless of time). Phase, however, is a time-dependent angle measured in degrees ($360^\\circ = 1\\text{ period}$). A fixed time delay of 1 ms represents a $180^\\circ$ phase shift at 500 Hz, but a $360^\\circ$ phase shift at 1000 Hz, and a $720^\\circ$ phase shift at 2000 Hz.</p>",
      expert_quote: {
        text: "Calling the polarity switch a 'phase switch' is a classic audio misnomer. Polarity is positive vs negative; phase is about timing.",
        author: "AES Educational Foundation White Paper"
      },
      img: "/images/gen/diagram_signal_flow.png"
    }
  ]
};

// -------------------------------------------------------------
// 7. Author PQ28: DAW Automation Modes & MIDI Control Change (quiz-topic-47)
// -------------------------------------------------------------
const pq28 = {
  id: "quiz-topic-47",
  title: "Practical Quiz 28: DAW Automation Modes & MIDI Control Change Data",
  description: "Master DAW real-time automation modes (Read, Touch, Latch, Write), essential MIDI CC assignments (CC1, CC7, CC10, CC11, CC64), and 14-bit resolution.",
  type: "lp_quiz",
  campaignNodeId: null,
  questions: [
    {
      title: "DAW Automation: Touch Mode Behavior",
      content: "An engineer writes vocal volume automation in real time using a hardware fader controller set to 'Touch' mode. What happens when they release the fader?",
      type: "multi_choice",
      question: "In DAW automation, what occurs when you release a fader in Touch mode?",
      answers: [
        { text: "The parameter ramps back to its previously existing automation value over the set ramp time.", is_true: "yes" },
        { text: "The parameter continues overwriting the track at the last held position until playback stops.", is_true: "no" },
        { text: "The entire automation lane for that track is permanently deleted from the project.", is_true: "no" },
        { text: "The fader jumps immediately to unity gain (0.0 dBFS) and mutes the channel.", is_true: "no" }
      ],
      explanation: "<p><strong>Touch Mode Mechanics:</strong> In Touch mode, automation is written only while the user is actively touching or holding the physical or on-screen fader. The moment the fader is released, writing ceases and the parameter automatically ramps back to follow any previously recorded automation data on that track. This makes Touch the safest mode for punching in quick vocal rides and volume adjustments without overwriting downstream automation.</p>",
      expert_quote: {
        text: "Touch mode is the working engineer's best friend. Touch it to ride, let go to return. It never destroys what you already built.",
        author: "DAW Mixing Workflow Guide"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "DAW Automation: Latch Mode Behavior",
      content: "How does 'Latch' automation mode differ from 'Touch' mode when recording parameter changes in real time?",
      type: "multi_choice",
      question: "What is the key functional behavior of Latch mode upon releasing the fader?",
      answers: [
        { text: "The parameter remains at the last touched value, continuing to overwrite existing data until playback stops.", is_true: "yes" },
        { text: "The parameter immediately snaps back to zero decibels the instant contact is lost.", is_true: "no" },
        { text: "Latch mode prevents any automation data from being recorded during playback.", is_true: "no" },
        { text: "Latch mode only records panning data and ignores volume and plugin parameters.", is_true: "no" }
      ],
      explanation: "<p><strong>Latch Mode Mechanics:</strong> Like Touch, Latch mode does not begin writing until the fader is touched. However, when the fader is released, Latch does <em>not</em> return to previous automation; it stays ('latches') at the exact value where you released it, continuing to overwrite all existing data at that static level until playback is stopped. Latch is ideal for changing levels for an entire verse or chorus section in a single pass.</p>",
      expert_quote: {
        text: "Latch is perfect for setting a new section level on the fly, but watch out: if you forget to stop, it will pave over the rest of the song.",
        author: "Logic Pro & Pro Tools Production Handbook"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "DAW Automation: Write Mode Hazards",
      content: "Why is 'Write' mode considered dangerous in professional DAW automation, and why do DAWs automatically switch out of Write mode when playback stops?",
      type: "multi_choice",
      question: "Why must engineers exercise extreme caution when engaging Write automation mode?",
      answers: [
        { text: "Write mode begins overwriting existing automation immediately when playback starts, regardless of whether a fader is touched.", is_true: "yes" },
        { text: "Write mode permanently deletes all recorded audio files from the computer hard drive.", is_true: "no" },
        { text: "Write mode forces the audio engine to render the track at 8-bit resolution.", is_true: "no" },
        { text: "Write mode disables audio playback through the main monitor outputs.", is_true: "no" }
      ],
      explanation: "<p><strong>Write Mode Dangers:</strong> Unlike Touch and Latch (which wait until a fader is actively moved), Write mode begins overwriting existing automation the microsecond playback begins, erasing whatever was there before even if the fader remains untouched. To prevent accidental data loss, most DAWs (like Pro Tools and Logic Pro) feature 'Write-to-Touch' safety switches that automatically revert the track to Touch or Read mode the instant playback halts.</p>",
      expert_quote: {
        text: "Write mode is a bulldozer. Use it only when starting a fresh mix pass from zero, and disarm it immediately after.",
        author: "Professional Mixing Protocols"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "DAW Automation: Read Mode",
      content: "What is the function of the standard 'Read' mode on a DAW channel strip?",
      type: "multi_choice",
      question: "What does engaging Read mode on an automated DAW track ensure?",
      answers: [
        { text: "The channel strip plays back existing automation moves precisely while ignoring new accidental fader changes.", is_true: "yes" },
        { text: "The track reads audio directly from external analog tape machines instead of the hard drive.", is_true: "no" },
        { text: "The computer scans the track for MIDI lyric text and displays it on screen.", is_true: "no" },
        { text: "Read mode converts automation curves into discrete MIDI Note-On velocity triggers.", is_true: "no" }
      ],
      explanation: "<p><strong>Read Mode:</strong> Read mode is the safe, standard playback state. The DAW reads and executes all recorded volume, pan, send, and plugin automation curves with sample accuracy. Even if the user moves a fader during playback, the DAW snaps the parameter back to its written curve the moment the mouse is released, safeguarding the mix from unintended modifications.</p>",
      expert_quote: {
        text: "Once your mix moves are locked, switch all tracks to Read. It locks your creative decisions down cold.",
        author: "DAW Engineering Fundamentals"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "MIDI CC1: Modulation Wheel Standard",
      content: "What is the universal MIDI Continuous Controller number assigned to the Modulation Wheel on all MIDI controllers?",
      type: "multi_choice",
      question: "Which MIDI CC number is universally standardized for the Modulation Wheel?",
      answers: [
        { text: "MIDI CC 1 (controls LFO depth, vibrato intensity, or orchestral dynamics).", is_true: "yes" },
        { text: "MIDI CC 7 (Main Volume).", is_true: "no" },
        { text: "MIDI CC 10 (Pan position).", is_true: "no" },
        { text: "MIDI CC 64 (Damper/Sustain pedal).", is_true: "no" }
      ],
      explanation: "<p><strong>MIDI CC1 (Modulation):</strong> Under the official MIDI Manufacturers Association (MMA) specification, MIDI Continuous Controller 1 (CC1) is assigned to the Modulation Wheel. In hardware synths, it typically controls LFO depth (modulating pitch for vibrato or filter cutoff for wah sweeps). In modern cinematic sample libraries (e.g. Spitfire Audio, Orchestral Tools), CC1 is universally assigned to crossfade between dynamic sample layers (pianissimo to fortissimo).</p>",
      expert_quote: {
        text: "CC1 is the breath of a virtual orchestra. Ride the mod wheel as you play, and the samples transform from static recordings into living instruments.",
        author: "Cinematic MIDI Orchestration Guide"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "MIDI CC7 (Volume) vs CC11 (Expression)",
      content: "When working with orchestral and synthesizer mockups, why do film composers use CC11 (Expression) rather than CC7 (Main Volume) to shape dynamic swells?",
      type: "multi_choice",
      question: "Why is MIDI CC11 (Expression) preferred over CC7 (Volume) for musical phrasing and swells?",
      answers: [
        { text: "CC7 sets the overall channel mix balance; CC11 scales volume proportionally within that limit, preserving mix levels.", is_true: "yes" },
        { text: "CC11 operates with 32-bit floating point precision, whereas CC7 is restricted to 4-bit resolution.", is_true: "no" },
        { text: "CC7 cannot be automated in modern digital audio workstations.", is_true: "no" },
        { text: "CC11 only controls reverb send levels and does not affect instrument loudness.", is_true: "no" }
      ],
      explanation: "<p><strong>CC7 (Volume) vs CC11 (Expression):</strong> In MIDI orchestrations, CC7 (Main Volume) acts as the master channel fader, establishing the static balance of that instrument in the overall mix (e.g. setting Violin 1 to -4 dB). CC11 (Expression) acts as a percentage multiplier of CC7. By automating CC11 for musical crescendos and decrescendos, the composer can adjust the master CC7 fader later without destroying the delicate volume swells drawn into the track.</p>",
      expert_quote: {
        text: "Think of CC7 as your mixing desk fader and CC11 as the musician's bow arm. Never use your mixing fader to perform a crescendo.",
        author: "Hollywood Orchestration Standards"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "MIDI CC10: Stereo Pan Standard",
      content: "What MIDI Continuous Controller governs the stereo panning position of a MIDI instrument, and what value represents center pan?",
      type: "multi_choice",
      question: "Which MIDI CC number controls stereo Pan, and what value places the sound dead center?",
      answers: [
        { text: "MIDI CC 10; Value 64 represents dead center (0 = Hard Left, 127 = Hard Right).", is_true: "yes" },
        { text: "MIDI CC 7; Value 100 represents center.", is_true: "no" },
        { text: "MIDI CC 64; Value 127 represents center.", is_true: "no" },
        { text: "MIDI CC 2; Value 0 represents center.", is_true: "no" }
      ],
      explanation: "<p><strong>MIDI CC10 (Pan):</strong> Standard 7-bit MIDI controllers range from 0 to 127 (128 discrete values). In MIDI CC10 (Pan), a value of 0 pans hard left, 127 pans hard right, and the midpoint value 64 positions the sound dead center. Automating CC10 creates synchronized stereo movement directly within the MIDI sequence without requiring DAW audio track automation.</p>",
      expert_quote: {
        text: "CC10 is the spatial coordinate of the MIDI specification. 64 is home center.",
        author: "MIDI Protocol Technical Reference"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "MIDI CC64: Sustain / Damper Pedal",
      content: "How does a standard MIDI Sustain (Damper) Pedal send information to a DAW via MIDI CC64?",
      type: "multi_choice",
      question: "How are switch states encoded in MIDI CC64 for a sustain pedal?",
      answers: [
        { text: "Values 0–63 represent Pedal Off; Values 64–127 represent Pedal On (continuous pedals send intermediate values for half-pedaling).", is_true: "yes" },
        { text: "It sends analog audio directly down the MIDI cable to sustain the note.", is_true: "no" },
        { text: "It permanently multiplies the tempo of the DAW by a factor of two.", is_true: "no" },
        { text: "It inverts the phase of all held MIDI notes by 180 degrees.", is_true: "no" }
      ],
      explanation: "<p><strong>MIDI CC64 (Sustain Pedal):</strong> CC64 functions primarily as a binary switch. Any incoming value from 0 to 63 is interpreted by the synthesizer as 'Pedal Released (Off)'. Any value from 64 to 127 is interpreted as 'Pedal Pressed (On)', sustaining Note-On messages past physical key release. Modern continuous optical piano pedals transmit the full 0–127 range to simulate subtle acoustic piano 'half-pedaling' damper resonance.</p>",
      expert_quote: {
        text: "CC64 emulates the mechanical lifting of the felt dampers on an acoustic grand piano.",
        author: "Electronic Keyboard & MIDI Guide"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "14-bit Pitch Bend Resolution Math",
      content: "Standard MIDI CC messages use 7-bit resolution (128 steps). Why does the Pitch Bend wheel use 14-bit resolution, and how many discrete values does it provide?",
      type: "multi_choice",
      question: "How many discrete steps does 14-bit MIDI Pitch Bend provide, and why is this necessary?",
      answers: [
        { text: "16,384 values (2¹⁴); prevents audible 'zipper noise' and stepping during continuous pitch glides.", is_true: "yes" },
        { text: "1,024 values (2¹⁰); required to match analog voltage octaves.", is_true: "no" },
        { text: "256 values (2⁸); designed to fit within a single 8-bit byte.", is_true: "no" },
        { text: "65,536 values (2¹⁶); required to match 16-bit audio file standards.", is_true: "no" }
      ],
      explanation: "<p><strong>14-bit Pitch Bend Math:</strong><br/>$$2^{14} = 16,384\\text{ discrete values}$$<br/>With center position at 8,192 (0 pitch offset), pitch bend provides 8,191 steps of upward bend and 8,192 steps of downward bend. If pitch bend were restricted to 7-bit resolution (128 values), bending a note across two semitones would produce audible, stepped 'zipper noise' (only 32 discrete steps per semitone). 14-bit resolution pairs two 7-bit data bytes (LSB and MSB) to achieve imperceptibly smooth analog-style glides.</p>",
      expert_quote: {
        text: "The ear is ruthlessly sensitive to microtonal pitch stepping. 14-bit resolution turns digital stair-steps into an imperceptible smooth curve.",
        author: "Dave Smith, Father of MIDI (Sequential Circuits)"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "Linear vs Logarithmic Automation Curves",
      content: "When automating an audio fader fade-out at the end of a track, why does an exponential or logarithmic curve sound more natural to the human ear than a straight linear line?",
      type: "multi_choice",
      question: "Why do logarithmic/exponential automation fade curves sound smoother than straight linear fades?",
      answers: [
        { text: "Human hearing perceives acoustic loudness logarithmically (decibels) rather than linearly.", is_true: "yes" },
        { text: "Linear fades cause digital clipping distortion as the fader approaches zero.", is_true: "no" },
        { text: "Logarithmic curves automatically remove all background noise before the fade begins.", is_true: "no" },
        { text: "DAWs are incapable of calculating linear curves in 32-bit floating point audio engines.", is_true: "no" }
      ],
      explanation: "<p><strong>Logarithmic Loudness Perception:</strong> Human hearing responds to sound pressure logarithmically (Weber-Fechner Law), which is why we measure volume in decibels. A straight linear fade-out cuts voltage at a constant rate, which our ears perceive as doing very little at the start, followed by an abrupt, sudden drop-off right at the end. An exponential/logarithmic curve matches human loudness perception, producing an audibly smooth, gradual decay down into silence.</p>",
      expert_quote: {
        text: "Our ears hear in powers of ten, not straight lines. Use curved fades if you want your music to melt into silence naturally.",
        author: "Acoustics & Psychoacoustics Fundamentals"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "Automation Delay Compensation (ADC)",
      content: "What technical feature in modern DAWs ensures that parameter automation curves stay in sample-accurate sync with tracks routed through high-latency lookahead plugins?",
      type: "multi_choice",
      question: "What system aligns automation curves with tracks delayed by heavy lookahead DSP plugins?",
      answers: [
        { text: "Plugin Delay Compensation (PDC) / Automatic Delay Compensation (ADC) applied to automation lanes.", is_true: "yes" },
        { text: "Real-time MIDI Time Code (MTC) generation through external word clock cables.", is_true: "no" },
        { text: "Reducing the audio interface buffer size to 32 samples.", is_true: "no" },
        { text: "Converting all audio regions into uncompressed 32-bit floating point broadcast WAV files.", is_true: "no" }
      ],
      explanation: "<p><strong>Automation Delay Compensation:</strong> When tracks use heavy lookahead processors (such as linear-phase EQs or multiband limiters), the DAW delays other tracks so everything arrives at the speakers simultaneously. Automatic Delay Compensation (ADC) must also delay the recorded automation curves by the exact same sample offset. Without automation delay compensation, an automated mute or volume duck will trigger milliseconds before or after the audio transient, ruining rhythmic timing.</p>",
      expert_quote: {
        text: "Sample-accurate automation requires the DAW to calculate plugin latency for your mouse movements just like it does for audio tracks.",
        author: "DAW Engine Architecture Principles"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "Polyphonic Aftertouch vs Channel Pressure",
      content: "What is the difference between Channel Pressure (monophonic aftertouch) and Polyphonic Aftertouch on expressive MIDI keyboard controllers?",
      type: "multi_choice",
      question: "How does Polyphonic Aftertouch differ from standard Channel Pressure?",
      answers: [
        { text: "Polyphonic Aftertouch transmits independent pressure data for each individual key; Channel Pressure sends one global value for all held keys.", is_true: "yes" },
        { text: "Channel Pressure only works on monophonic bass synthesizers; Polyphonic works only on samplers.", is_true: "no" },
        { text: "Polyphonic Aftertouch operates only through 5-pin DIN cables, whereas Channel Pressure requires USB 3.0.", is_true: "no" },
        { text: "Channel Pressure alters the sample rate; Polyphonic Aftertouch alters only the bit depth.", is_true: "no" }
      ],
      explanation: "<p><strong>Aftertouch Architectures:</strong> Aftertouch measures how hard a musician continues to press down on a key <em>after</em> the initial note strike has been made. Standard Channel Pressure transmits a single global value representing the highest pressure detected across the keyboard, affecting all held notes uniformly. Polyphonic Aftertouch (found on instruments like the CS-80 or Osmose) features dedicated pressure sensors under every key, allowing a player to swell vibrato or open the filter on a single melody note within an ongoing chord.</p>",
      expert_quote: {
        text: "Polyphonic aftertouch gives each finger its own expressive voice. It turns a static keyboard into an acoustic orchestra of individual touch.",
        author: "Vangelis, Electronic Composer (Yamaha CS-80 Master)"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    }
  ]
};

stage3.items.push(pq25, pq26, pq27, pq28);
console.log(`✓ Added PQ25, PQ26, PQ27, PQ28. Total Stage 3 items now: ${stage3.items.length}`);

// Write updated course_data.json
fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2), 'utf8');
console.log('✓ Successfully wrote updated course_data.json');
