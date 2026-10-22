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
// 1. Recalibrate PQ1: Studio Equipment & Acoustics (quiz-topic-11)
// -------------------------------------------------------------
const pq1 = stage3.items.find(i => i.id === 'quiz-topic-11');
if (pq1 && pq1.questions.length === 10) {
  pq1.questions[5] = {
    title: "Q6: Bass Traps in Studio Corners",
    content: "Why are bass traps most commonly placed in the corners of a recording studio or control room?",
    type: "multi_choice",
    question: "Why are bass traps positioned in room corners rather than in the center of walls?",
    answers: [
      { text: "Low-frequency sound waves build up with maximum pressure in room corners.", is_true: "yes" },
      { text: "Corners only reflect high-frequency sound, leaving bass in the room center.", is_true: "no" },
      { text: "Bass traps only work if they are placed at ear level on flat side walls.", is_true: "no" },
      { text: "It is solely an aesthetic choice to keep flat wall space open for diffusers.", is_true: "no" }
    ],
    explanation: "<p><strong>Bass Trapping:</strong> Low-frequency sound waves (bass) build up with maximum acoustic pressure where two or three room boundaries intersect (corners). Placing dense porous or membrane bass traps in corners absorbs this low-frequency buildup, stopping the room from sounding boomy and muddy.</p>",
    expert_quote: {
      text: "Bass naturally gathers in the corners of a room. Treat the corners first to clear up low-end muddiness.",
      author: "Edexcel Music Technology Acoustics Guide"
    },
    img: "/images/gen/acoustic_reflection_diagram.png"
  };

  pq1.questions[6] = {
    title: "Q7: Early Reflections & Comb Filtering",
    content: "Why do studio designers install acoustic absorption panels on the side walls and ceiling directly between the monitor speakers and the mixing seat?",
    type: "multi_choice",
    question: "What is the purpose of treating 'early reflection points' on side walls and ceilings?",
    answers: [
      { text: "To stop reflections bouncing off nearby walls and causing phase cancellation (comb filtering) at the listening position.", is_true: "yes" },
      { text: "To make the control room completely anechoic so zero sound can be heard.", is_true: "no" },
      { text: "To prevent monitor speakers from overheating during loud mixing sessions.", is_true: "no" },
      { text: "To convert stereo monitor audio signals into surround sound.", is_true: "no" }
    ],
    explanation: "<p><strong>Early Reflections:</strong> Sound from the monitor speakers travels directly to your ears, but it also bounces off the nearby side walls, floor, and ceiling. When these reflected sounds arrive a few milliseconds later, they mix with the direct sound and cause phase cancellation (comb filtering). Absorbing these first reflections ensures you hear the pure, accurate sound coming directly from the speakers.</p>",
    expert_quote: {
      text: "Treating your first reflection points stops the room from tricking your ears with false phase cancellations.",
      author: "Studio Setup Essentials"
    },
    img: "/images/gen/acoustic_reflection_diagram.png"
  };

  pq1.questions[7] = {
    title: "Q8: Reverberation Time (RT60)",
    content: "What does the acoustic measurement RT60 describe in a recording space?",
    type: "multi_choice",
    question: "What is the definition of Reverberation Time (RT60)?",
    answers: [
      { text: "The time taken for sound in a room to decay by 60 dB after the sound source has stopped.", is_true: "yes" },
      { text: "The loudest sound pressure level produced by an acoustic instrument in decibels.", is_true: "no" },
      { text: "The delay time in milliseconds between an original note and its first echo.", is_true: "no" },
      { text: "The frequency response of an acoustic vocal booth at 60 Hz.", is_true: "no" }
    ],
    explanation: "<p><strong>RT60 Definition:</strong> $RT_{60}$ is the standard measurement of reverberation in a room. It measures how long (in seconds) it takes for a sound to drop in level by 60 decibels (dB) after the sound source abruptly stops. Control rooms aim for a short $RT_{60}$ (around 0.2 to 0.4 seconds) for clear, accurate monitoring, while concert halls have longer $RT_{60}$ times (1.5 to 2.5 seconds) for natural acoustic warmth.</p>",
    expert_quote: {
      text: "RT60 is simply how long a room rings out after you stop making sound.",
      author: "Acoustics for Music Technology"
    },
    img: "/images/gen/acoustic_reflection_diagram.png"
  };

  pq1.questions[8] = {
    title: "Q9: Acoustic Absorption vs Diffusion",
    content: "What is the difference between an acoustic absorber and an acoustic diffuser in a studio room?",
    type: "multi_choice",
    question: "How does an acoustic diffuser differ from an acoustic absorber?",
    answers: [
      { text: "Absorbers soak up sound energy to reduce echo; diffusers scatter reflections evenly to keep the room lively without flutter echoes.", is_true: "yes" },
      { text: "Absorbers boost high frequencies; diffusers cut low-end bass frequencies.", is_true: "no" },
      { text: "Diffusers are only used to block external noise from entering through the windows.", is_true: "no" },
      { text: "There is no difference; they are two different names for the same foam panel.", is_true: "no" }
    ],
    explanation: "<p><strong>Absorbers vs Diffusers:</strong> Acoustic absorbers (like rockwool panels or acoustic foam) trap sound energy and stop it from bouncing back, reducing the overall reverberation time. Acoustic diffusers have uneven wooden or plastic surfaces that scatter sound reflections in different directions. This breaks up harsh slap echoes while keeping the room sounding natural, open, and lively.</p>",
    expert_quote: {
      text: "Absorbers make a room drier; diffusers make a room sound bigger without making it dead.",
      author: "Control Room Design Fundamentals"
    },
    img: "/images/gen/acoustic_reflection_diagram.png"
  };

  pq1.questions[9] = {
    title: "Q10: Flutter Echo in Rectangular Rooms",
    content: "When you clap your hands in an empty room with bare, parallel walls, you often hear a rapid, metallic 'ringing' or 'buzzing' sound. What is this called and how is it fixed?",
    type: "multi_choice",
    question: "What causes a metallic ringing sound when clapping in an untreated room, and how is it treated?",
    answers: [
      { text: "Flutter echo; caused by sound rapidly bouncing between parallel bare walls, fixed by adding absorption or diffusion.", is_true: "yes" },
      { text: "Microphone feedback; caused by nearfield monitor speakers being turned up too loud.", is_true: "no" },
      { text: "Ground loop hum; caused by faulty XLR cables connected to the audio interface.", is_true: "no" },
      { text: "Proximity effect; caused by standing too close to the microphone stand.", is_true: "no" }
    ],
    explanation: "<p><strong>Flutter Echo:</strong> Flutter echo occurs when high-frequency sound bounces back and forth rapidly between two hard, parallel walls. The rapid succession of reflections creates a distinct metallic flutter or buzz. It is fixed easily by putting acoustic panels or diffusers on at least one of the opposing walls, or by building walls slightly angled out of parallel.</p>",
    expert_quote: {
      text: "Clap your hands in the room. If you hear a high metallic zing, you have flutter echo between your parallel walls.",
      author: "Studio Acoustics & Setup Guide"
    },
    img: "/images/gen/acoustic_reflection_diagram.png"
  };
  console.log('✓ Recalibrated PQ1 to Edexcel standard');
}

// -------------------------------------------------------------
// 2. Recalibrate PQ19: Practical MIDI Applications (quiz-topic-38)
// -------------------------------------------------------------
const pq19 = stage3.items.find(i => i.id === 'quiz-topic-38');
if (pq19 && pq19.questions.length === 10) {
  pq19.questions[7] = {
    title: "Q8: MIDI Quantization & Swing",
    content: "A student quantizes a drum beat to a strict 1/16th note grid, but it sounds too stiff and robotic. What quantize setting should they apply to give the beat a more human, syncopated bounce?",
    type: "multi_choice",
    question: "Which setting shifts alternate 16th notes to give a quantized drum groove a syncopated, human feel?",
    answers: [
      { text: "Swing (or Shuffle), which delays alternate subdivisions towards a triplet feel.", is_true: "yes" },
      { text: "High-Pass Filter cutoff modulation.", is_true: "no" },
      { text: "Pitch Bend range expansion.", is_true: "no" },
      { text: "MIDI Channel reassignment from Channel 1 to Channel 10.", is_true: "no" }
    ],
    explanation: "<p><strong>Swing / Shuffle:</strong> Strict quantization snaps every note to an exact mechanical grid. Applying Swing (or Shuffle) delays every second subdivision (the off-beats) by a chosen percentage, moving the rhythm closer to a triplet groove. This gives programmed drum beats and basslines a natural, head-nodding groove.</p>",
    expert_quote: {
      text: "A little swing takes a drum loop from a boring machine to a real drummer's groove.",
      author: "MIDI Sequencing in the DAW"
    },
    img: "/images/svg/quantize_grid.svg"
  };

  pq19.questions[8] = {
    title: "Q9: MIDI Ports (In, Out, and Thru)",
    content: "What is the specific function of a 5-pin DIN 'MIDI THRU' port on a hardware synthesizer?",
    type: "multi_choice",
    question: "What is the function of the MIDI THRU port on a synthesizer or sound module?",
    answers: [
      { text: "It outputs an exact duplicate of the MIDI data arriving at the MIDI IN port, allowing units to be daisy-chained.", is_true: "yes" },
      { text: "It converts digital MIDI data into balanced analog audio signals.", is_true: "no" },
      { text: "It only transmits notes played on the synthesizer's own keyboard.", is_true: "no" },
      { text: "It sends +48V phantom power to external dynamic microphones.", is_true: "no" }
    ],
    explanation: "<p><strong>MIDI Ports:</strong><br/>• <strong>MIDI IN:</strong> Receives MIDI data from an external controller or sequencer.<br/>• <strong>MIDI OUT:</strong> Transmits MIDI data generated by this device (e.g. keys played).<br/>• <strong>MIDI THRU:</strong> Passes an exact copy of the data arriving at the MIDI IN port directly to the next piece of gear, enabling daisy-chaining.</p>",
    expert_quote: {
      text: "MIDI Thru is an echo of MIDI In. It lets you link multiple synths to a single sequencer output.",
      author: "Edexcel Specification: Digital Audio & MIDI"
    },
    img: "/images/svg/midi_cc_message_3byte_structure.svg"
  };

  pq19.questions[9] = {
    title: "Q10: Polyphonic vs Monophonic Synthesizers",
    content: "What is the difference between a Polyphonic synthesizer and a Monophonic synthesizer?",
    type: "multi_choice",
    question: "How does a Polyphonic synthesizer differ from a Monophonic synthesizer?",
    answers: [
      { text: "Polyphonic synths can play multiple notes at the same time (chords); Monophonic synths can only play one note at a time.", is_true: "yes" },
      { text: "Monophonic synths can play 16 notes at once; Polyphonic synths are limited to one note.", is_true: "no" },
      { text: "Polyphonic synths only produce drum sounds; Monophonic synths produce melody sounds.", is_true: "no" },
      { text: "Monophonic synths do not require MIDI cables to connect to a computer.", is_true: "no" }
    ],
    explanation: "<p><strong>Polyphonic vs Monophonic:</strong> A monophonic synthesizer can only generate one single pitch at any given moment, making it ideal for punchy basslines and lead solos (e.g. Minimoog, Roland TB-303). A polyphonic synthesizer has multiple voices, allowing it to play chords, pads, and complex harmonies simultaneously (e.g. Roland Juno, Prophet-5).</p>",
    expert_quote: {
      text: "Monophonic means one note at a time—perfect for bass. Polyphonic means chords and harmony.",
      author: "Synthesizer Programming Guide"
    },
    img: "/images/svg/synthesis_fm_operators.svg"
  };
  console.log('✓ Recalibrated PQ19 to Edexcel standard');
}

// -------------------------------------------------------------
// 3. Recalibrate PQ25: Dynamic Processing & Envelope Matching (quiz-topic-44)
// -------------------------------------------------------------
const pq25 = stage3.items.find(i => i.id === 'quiz-topic-44');
if (pq25) {
  pq25.questions = [
    {
      title: "Threshold Control",
      content: "What is the function of the 'Threshold' control on a compressor?",
      type: "multi_choice",
      question: "What does the Threshold control determine on an audio compressor?",
      answers: [
        { text: "The volume level that incoming audio must exceed before gain reduction begins.", is_true: "yes" },
        { text: "How fast the compressor turns off once the audio drops in level.", is_true: "no" },
        { text: "The total amount of treble boost applied to the compressed signal.", is_true: "no" },
        { text: "The stereo width of the audio track across the speakers.", is_true: "no" }
      ],
      explanation: "<p><strong>Threshold:</strong> The Threshold is the volume tripwire. Any audio quieter than the threshold passes through unaffected. As soon as the signal rises above the threshold, the compressor starts turning down the volume according to the chosen ratio.</p>",
      expert_quote: {
        text: "The threshold tells the compressor when to start working. Lower it to catch more of the signal.",
        author: "Edexcel Component 4 Mixing Guide"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Ratio Calculation (4:1)",
      content: "A vocalist sings loudly, exceeding the compressor threshold by 8 dB. If the ratio is set to 4:1, by how much will the output level exceed the threshold?",
      type: "multi_choice",
      question: "If a signal goes 8 dB over the threshold with a 4:1 ratio, how many dB does it exceed the threshold at the output?",
      answers: [
        { text: "2 dB (Formula: 8 dB ÷ 4 = 2 dB output above threshold; 6 dB of gain reduction)", is_true: "yes" },
        { text: "4 dB (Formula: 8 dB - 4 dB)", is_true: "no" },
        { text: "8 dB (Uncompressed level)", is_true: "no" },
        { text: "0 dB (Completely muted)", is_true: "no" }
      ],
      explanation: "<p><strong>Compressor Ratio Calculation:</strong><br/>$$\\text{Output Above Threshold} = \\frac{\\text{Input Level Above Threshold}}{\\text{Ratio}}$$<br/>$$\\frac{8\\text{ dB}}{4} = \\mathbf{2\\text{ dB}}$$<br/>The output exceeds the threshold by 2 dB, meaning the compressor applied <strong>6 dB of gain reduction</strong> ($8 - 2 = 6\\text{ dB}$).</p>",
      expert_quote: {
        text: "Ratio is a divider. For every 4 dB that enters above the threshold, only 1 dB is allowed to leave.",
        author: "Audio Dynamics Explained"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Attack Time on Snare Drum Punch",
      content: "An engineer wants to keep the initial 'crack' and punch of a snare drum while controlling the volume of the rest of the hit. How should the compressor attack time be set?",
      type: "multi_choice",
      question: "How should the compressor attack time be set to preserve the initial crack of a snare drum?",
      answers: [
        { text: "A slower attack time (e.g. 20–30 ms) so the initial stick transient passes uncompressed before reduction begins.", is_true: "yes" },
        { text: "The fastest possible attack time (0.1 ms) to squash the initial stick hit immediately.", is_true: "no" },
        { text: "Attack time has no effect on drum punch; only EQ affects drum transients.", is_true: "no" },
        { text: "Set attack to zero and increase ratio to infinity:1.", is_true: "no" }
      ],
      explanation: "<p><strong>Attack Time & Transients:</strong> The initial hit of a drum stick (the transient) lasts about 5 to 15 milliseconds. If the attack time is set very fast, the compressor clamps down instantly, squashing the crack and making the drum sound flat and dull. Setting a slower attack allows the initial transient to pass through uncompressed before clamping the body, giving punch and impact.</p>",
      expert_quote: {
        text: "Slow attack lets the transient through for punch. Fast attack squashes the transient for control.",
        author: "Mix Engineer's Handbook"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Release Time and 'Pumping'",
      content: "When compressing a drum kit, setting the release time too fast often causes an unwanted artifact known as 'pumping' or 'breathing'. What is happening?",
      type: "multi_choice",
      question: "What causes 'pumping' or 'breathing' when compressing drum tracks?",
      answers: [
        { text: "The release is so fast that background room noise and cymbals surge up loudly between drum hits.", is_true: "yes" },
        { text: "The compressor threshold is set too high to catch any drum hits.", is_true: "no" },
        { text: "The microphone cable has a loose connection causing electrical crackle.", is_true: "no" },
        { text: "The ratio is set too low to reduce dynamic range.", is_true: "no" }
      ],
      explanation: "<p><strong>Compressor Pumping:</strong> When the release time is set too fast, the compressor releases its gain reduction immediately after a loud snare or kick hit. This causes the ambient room noise, hi-hat bleed, and cymbal tails to rush up in volume ('breathe' or 'pump') unnaturally before being clamped down again on the next hit. Adjusting the release time to match the tempo of the song prevents this.</p>",
      expert_quote: {
        text: "Pumping happens when the compressor releases too quickly, causing background noise to surge between beats.",
        author: "Component 3 & 4 Mixing Concepts"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Knee Control (Hard Knee vs Soft Knee)",
      content: "What is the difference between a 'Hard Knee' and a 'Soft Knee' on a compressor?",
      type: "multi_choice",
      question: "How does a Soft Knee modify compressor behavior around the threshold?",
      answers: [
        { text: "Soft knee introduces compression gradually as signal approaches the threshold, sounding smoother and more transparent.", is_true: "yes" },
        { text: "Hard knee delays the start of compression by 500 milliseconds.", is_true: "no" },
        { text: "Soft knee automatically mutes the audio track when the singer stops singing.", is_true: "no" },
        { text: "Hard knee can only be used on acoustic guitars, never on drums.", is_true: "no" }
      ],
      explanation: "<p><strong>Hard vs Soft Knee:</strong> A hard knee clamps down with full ratio the exact instant the signal crosses the threshold (ideal for drums and peak control). A soft knee rounds the transition, gradually applying compression as the audio approaches the threshold. This produces a much smoother, more transparent sound that is ideal for vocals and acoustic instruments.</p>",
      expert_quote: {
        text: "Use soft knee for transparent vocals; use hard knee when you need strict, aggressive control on transients.",
        author: "Studio Dynamics Handbook"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Makeup Gain",
      content: "After compressing a lead vocal and reducing its peaks by 6 dB, the vocal sounds quieter in the overall mix. What control should the engineer use to restore the level?",
      type: "multi_choice",
      question: "What control is used to restore volume lost through compression gain reduction?",
      answers: [
        { text: "Makeup Gain (Output Gain)", is_true: "yes" },
        { text: "Threshold", is_true: "no" },
        { text: "Ratio", is_true: "no" },
        { text: "Pan pot", is_true: "no" }
      ],
      explanation: "<p><strong>Makeup Gain:</strong> Because a compressor turns down the loud parts of a signal, the overall volume drops. The Makeup Gain control allows the engineer to boost the entire compressed signal back up to match the rest of the mix. This results in a more consistent, controlled performance with higher perceived loudness.</p>",
      expert_quote: {
        text: "Compressors reduce volume. Makeup gain brings the track back up so quiet words are clearly audible.",
        author: "Edexcel Component 4 Guide"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Sidechain Ducking (Kick & Bass)",
      content: "In modern pop and electronic music, how is sidechain compression used to make room for the kick drum in the low end?",
      type: "multi_choice",
      question: "How does sidechain compression allow the kick drum and bass to work together cleanly?",
      answers: [
        { text: "A compressor on the bass track is triggered by the kick drum, lowering bass volume whenever the kick hits.", is_true: "yes" },
        { text: "The kick drum volume is permanently muted whenever the bass plays.", is_true: "no" },
        { text: "Both kick and bass are panned to opposite sides of the stereo field.", is_true: "no" },
        { text: "The bass guitar is pitched one octave higher whenever the kick is struck.", is_true: "no" }
      ],
      explanation: "<p><strong>Sidechain Ducking:</strong> When kick and bass play at the same time, their low frequencies clash. By placing a compressor on the bass guitar and routing the kick drum into its sidechain input, the compressor automatically 'ducks' (lowers) the bass volume for a split second every time the kick hits. This gives the kick drum total clarity while preserving low-end weight.</p>",
      expert_quote: {
        text: "Sidechain ducking stops your kick and bass from fighting for the same low-end space.",
        author: "Modern Production Masterclass"
      },
      img: "/images/svg/dynamic_eq_threshold_action.svg"
    },
    {
      title: "Limiter vs Compressor",
      content: "What is the primary difference between an audio compressor and an audio limiter?",
      type: "multi_choice",
      question: "How does a limiter differ from a standard compressor?",
      answers: [
        { text: "A limiter uses a very high ratio (10:1 to infinity:1) and fast attack to strictly prevent audio from exceeding a ceiling.", is_true: "yes" },
        { text: "A limiter only boosts quiet sounds and never turns down loud sounds.", is_true: "no" },
        { text: "A compressor operates in mono; a limiter operates only on surround sound tracks.", is_true: "no" },
        { text: "Limiters are only used during recording, never during mastering.", is_true: "no" }
      ],
      explanation: "<p><strong>Limiter vs Compressor:</strong> A limiter is simply a compressor with a very high ratio (typically 10:1, 20:1, or infinity:1) and an ultra-fast attack time. While compressors gently smooth out dynamics, a limiter acts like a brick wall, strictly preventing any audio peaks from crossing its ceiling to avoid digital distortion (clipping).</p>",
      expert_quote: {
        text: "A compressor sculpts dynamics; a limiter stops peaks from hitting the ceiling.",
        author: "Mastering Audio Essentials"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "De-Esser Purpose",
      content: "What is the main function of a De-Esser plugin on a lead vocal track?",
      type: "multi_choice",
      question: "What does a De-Esser do on a vocal track?",
      answers: [
        { text: "It is a frequency-conscious compressor that attenuates harsh high-frequency 'S' and 'T' sibilance sounds.", is_true: "yes" },
        { text: "It pitch-corrects out-of-tune vocal notes automatically in real time.", is_true: "no" },
        { text: "It removes low-frequency room rumble below 50 Hz.", is_true: "no" },
        { text: "It creates double-tracking vocal harmonies an octave below the lead.", is_true: "no" }
      ],
      explanation: "<p><strong>De-Esser:</strong> A de-esser is a compressor that only listens and responds to a specific high-frequency band (usually between 5 kHz and 8 kHz). When the singer makes a harsh, piercing 'S', 'Sh', or 'T' sound, the de-esser momentarily reduces the volume of that high band without dulling the rest of the vocal performance.</p>",
      expert_quote: {
        text: "A de-esser tames harsh sibilance so you can brighten your vocal without hurting the listener's ears.",
        author: "Vocal Mixing Guide"
      },
      img: "/images/svg/de_esser_frequency_chart.svg"
    },
    {
      title: "Reading the Gain Reduction Meter",
      content: "When setting up a compressor on a vocal in your DAW, what does the Gain Reduction (GR) meter show you?",
      type: "multi_choice",
      question: "What does the Gain Reduction (GR) meter indicate on a compressor?",
      answers: [
        { text: "How many decibels (dB) of volume the compressor is actively cutting from the signal.", is_true: "yes" },
        { text: "The input level entering the channel from the microphone preamp.", is_true: "no" },
        { text: "The amount of background hiss being added by analog tube emulation.", is_true: "no" },
        { text: "The battery percentage remaining on wireless studio headphones.", is_true: "no" }
      ],
      explanation: "<p><strong>Gain Reduction Meter:</strong> The gain reduction meter moves backwards from 0 dB down to show exactly how hard the compressor is working. For example, if the needle dips to -4 dB on a loud word, it means the compressor has turned down that peak by 4 dB.</p>",
      expert_quote: {
        text: "Watch the gain reduction meter. For a natural vocal, 2 to 4 dB of reduction on peaks is usually a great starting point.",
        author: "DAW Mixing Fundamentals"
      },
      img: "/images/gen/compressor_graph.png"
    },
    {
      title: "Noise Gate Function",
      content: "What is the function of a Noise Gate inserted on an acoustic snare drum or distorted electric guitar track?",
      type: "multi_choice",
      question: "What is the primary function of a Noise Gate in music production?",
      answers: [
        { text: "To mute or silence audio when the signal drops below the threshold, cutting out unwanted background spill and hiss.", is_true: "yes" },
        { text: "To limit dynamic peaks above the ceiling to prevent digital distortion.", is_true: "no" },
        { text: "To convert mono guitar tracks into true binaural stereo audio.", is_true: "no" },
        { text: "To automatically tune electric guitar strings between song takes.", is_true: "no" }
      ],
      explanation: "<p><strong>Noise Gate:</strong> A noise gate is the opposite of a compressor. When audio drops <em>below</em> the threshold (such as pauses between snare hits or gaps between guitar riffs), the gate closes, muting background noise, amp hum, or spill from other drums. When a loud hit occurs, the gate opens instantly to let the hit pass through.</p>",
      expert_quote: {
        text: "A noise gate silences the silence. It cleans up spill between hits so your mix stays punchy.",
        author: "Edexcel Component 4 Practical Guide"
      },
      img: "/images/svg/dynamic_eq_threshold_action.svg"
    },
    {
      title: "Optical vs FET vs VCA Compressor Styles",
      content: "Why are optical compressors (like the LA-2A style) often chosen for lead vocals while FET compressors (like the 1176 style) are chosen for aggressive drums?",
      type: "multi_choice",
      question: "Why do engineers choose optical compressors for vocals and FET compressors for drums?",
      answers: [
        { text: "Optical compressors have a smooth, gentle response that suits vocals; FET compressors react ultra-fast with aggressive punch on drums.", is_true: "yes" },
        { text: "Optical compressors can only process digital audio; FET compressors only work with analog tape.", is_true: "no" },
        { text: "Optical compressors cannot compress low frequencies; FET compressors cannot compress treble.", is_true: "no" },
        { text: "FET compressors are only used for mastering full album projects.", is_true: "no" }
      ],
      explanation: "<p><strong>Compressor Flavors:</strong> Different analog compressor designs impart distinct characteristics:<br/>• <strong>Optical (e.g. LA-2A):</strong> Uses a light cell with a gradual, two-stage release. Incredibly smooth and musical, making it a classic choice for vocals.<br/>• <strong>FET (e.g. 1176):</strong> Blazing-fast attack and punchy harmonic edge, perfect for aggressive drums and rock vocals.<br/>• <strong>VCA (e.g. SSL G-Bus):</strong> Clean, precise, and punchy, the gold standard for mix bus glue.</p>",
      expert_quote: {
        text: "Optical is warm and forgiving for vocals. FET is fast and bitey for drums. VCA is clean glue for the mix bus.",
        author: "Studio Hardware Classics"
      },
      img: "/images/gen/compressor_graph.png"
    }
  ];
  console.log('✓ Recalibrated PQ25 to Edexcel standard');
}

// -------------------------------------------------------------
// 4. Recalibrate PQ26: Frequency Spectrum & Instrument EQ Pocketing (quiz-topic-45)
// -------------------------------------------------------------
const pq26 = stage3.items.find(i => i.id === 'quiz-topic-45');
if (pq26) {
  pq26.questions = [
    {
      title: "High-Pass Filtering (Low-Cut)",
      content: "Why is it common practice to engage a High-Pass Filter (around 80–100 Hz) on lead vocals and acoustic guitars?",
      type: "multi_choice",
      question: "What is the primary benefit of applying a High-Pass Filter to non-bass tracks in a mix?",
      answers: [
        { text: "It removes unwanted sub-bass rumble, mic stand thumps, and cleans up headroom for the kick and bass.", is_true: "yes" },
        { text: "It adds artificial warmth and low-end punch to the vocal performance.", is_true: "no" },
        { text: "It eliminates high-frequency sibilance and harsh consonant sounds.", is_true: "no" },
        { text: "It automatically tunes out-of-tune notes back to the song's key.", is_true: "no" }
      ],
      explanation: "<p><strong>High-Pass Filter (Low-Cut):</strong> Instruments like vocals, electric guitars, and hi-hats produce no musical notes below 80 Hz, but their microphones still pick up air conditioning rumble, mic stand vibrations, and low-end bleed. Applying a high-pass filter cuts out this useless sub-bass rumble, preventing muddy buildup and leaving clean headroom for the kick drum and bass guitar.</p>",
      expert_quote: {
        text: "If an instrument doesn't play bass notes, roll off the low end. It gives your kick and bass room to breathe.",
        author: "Edexcel Component 4 Mixing Protocol"
      },
      img: "/images/svg/high_pass_filter_sweep_riser.svg"
    },
    {
      title: "Kick Drum and Bass Guitar Clashing",
      content: "The kick drum and bass guitar are fighting for the same low-end space, making the bottom end of the mix sound muddy and boomy. What EQ technique creates separation between them?",
      type: "multi_choice",
      question: "How do you use EQ to prevent the kick drum and bass guitar from masking each other?",
      answers: [
        { text: "Complementary EQ: boost the kick at its thump frequency (e.g. 60 Hz) and cut that same frequency on the bass, while giving the bass its punch higher up (e.g. 100 Hz).", is_true: "yes" },
        { text: "Boost 80 Hz by +6 dB on both kick and bass to maximize loudness.", is_true: "no" },
        { text: "Apply a low-pass filter at 100 Hz on both instruments to remove all upper harmonics.", is_true: "no" },
        { text: "Pan the kick drum hard left and the bass guitar hard right.", is_true: "no" }
      ],
      explanation: "<p><strong>Kick & Bass Complementary EQ:</strong> If both instruments are boosted at the same low frequency, they mask each other into a muddy boom. By deciding which instrument owns which frequency band (e.g., Kick drum owns 60 Hz; Bass guitar owns 100 Hz), you cut 60 Hz on the bass and cut 100 Hz on the kick. Both instruments are now clearly audible simultaneously.</p>",
      expert_quote: {
        text: "Two instruments cannot occupy the same frequency at the same time. Carve a small notch in one to make room for the other.",
        author: "Mixing Secrets for the Small Studio"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "Low-Mid 'Mud' (250–400 Hz)",
      content: "A mix sounds congested, boxy, and lacks clarity. Across multiple instruments (acoustic guitars, snare body, vocal buildup), what frequency zone is commonly cut to clear out this 'mud'?",
      type: "multi_choice",
      question: "Which frequency range is universally known for creating 'mud' and boxy buildup when overcrowded?",
      answers: [
        { text: "250 Hz to 400 Hz (the lower midrange where acoustic body resonances accumulate).", is_true: "yes" },
        { text: "20 Hz to 40 Hz (sub-audible rumble).", is_true: "no" },
        { text: "3 kHz to 5 kHz (presence and harshness).", is_true: "no" },
        { text: "12 kHz to 16 kHz (air and cymbal shimmer).", is_true: "no" }
      ],
      explanation: "<p><strong>The Mud Zone (250–400 Hz):</strong> Almost every acoustic instrument (guitars, vocals, piano, snare) has body resonance in the 250–400 Hz area. When 30 tracks are mixed together, this region builds up quickly, making the mix sound like it's playing through a cardboard box. Cutting 2 to 3 dB in this region across rhythm tracks restores clean separation.</p>",
      expert_quote: {
        text: "If your mix sounds cloudy, gently cut around 300 Hz on your guitars and keyboards. It's like opening a window.",
        author: "Mix Engineering Masterclass"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "Parametric EQ Controls",
      content: "What are the three essential controls found on every parametric equalizer band?",
      type: "multi_choice",
      question: "What are the three controls of a parametric EQ band?",
      answers: [
        { text: "Frequency, Gain (boost/cut), and Q (Bandwidth).", is_true: "yes" },
        { text: "Threshold, Ratio, and Attack.", is_true: "no" },
        { text: "Pre-Delay, Decay Time, and Diffusion.", is_true: "no" },
        { text: "Pan, Volume, and Mute.", is_true: "no" }
      ],
      explanation: "<p><strong>Parametric EQ Controls:</strong><br/>• <strong>Frequency:</strong> Chooses the center frequency you want to adjust (in Hz or kHz).<br/>• <strong>Gain:</strong> Sets how much you boost or cut that frequency (in dB).<br/>• <strong>Q (Bandwidth):</strong> Sets how wide or narrow the bell curve is around that frequency.</p>",
      expert_quote: {
        text: "Frequency picks the spot, Gain decides how much, and Q decides how wide. That is parametric EQ.",
        author: "Edexcel Component 4 Specification"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "Understanding Q (Bandwidth)",
      content: "What happens when an engineer increases the 'Q' setting on a parametric EQ band?",
      type: "multi_choice",
      question: "What effect does increasing the Q control have on an EQ filter?",
      answers: [
        { text: "The bandwidth becomes narrower, affecting a more precise range of frequencies.", is_true: "yes" },
        { text: "The bandwidth becomes wider, affecting a much broader range of frequencies.", is_true: "no" },
        { text: "The overall volume of the channel doubles by +6 dB automatically.", is_true: "no" },
        { text: "The filter turns into a high-pass filter.", is_true: "no" }
      ],
      explanation: "<p><strong>Q Control:</strong> High Q = Narrow bandwidth (ideal for surgical notching of annoying rings or hums without affecting surrounding musical notes). Low Q = Wide bandwidth (ideal for broad, gentle, musical tonal shaping).</p>",
      expert_quote: {
        text: "High Q is like a laser beam for surgical cuts; low Q is like a floodlight for musical tone shaping.",
        author: "EQ Mastery for A-Level"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "High-Shelf vs Low-Shelf Filters",
      content: "What does a High-Shelf EQ filter do when boosted by +4 dB at 10 kHz?",
      type: "multi_choice",
      question: "How does a High-Shelf filter operate?",
      answers: [
        { text: "It boosts 10 kHz and all frequencies above it by an equal +4 dB.", is_true: "yes" },
        { text: "It only boosts the exact frequency of 10 kHz and leaves 12 kHz untouched.", is_true: "no" },
        { text: "It cuts all frequencies below 10 kHz completely into silence.", is_true: "no" },
        { text: "It delays frequencies above 10 kHz by 10 milliseconds.", is_true: "no" }
      ],
      explanation: "<p><strong>Shelving Filters:</strong> A shelving filter lifts or cuts all frequencies beyond its corner frequency like a flat shelf. A high-shelf set at 10 kHz boosts everything above 10 kHz equally, adding air, sparkle, and brightness across cymbals, vocals, and acoustic guitars.</p>",
      expert_quote: {
        text: "A high shelf lifts the whole top end evenly. It gives you open air without peaky harshness.",
        author: "Mixing & Production Guide"
      },
      img: "/images/svg/frequency_spectrum_treble.svg"
    },
    {
      title: "Vocal Presence Band (3–5 kHz)",
      content: "A lead vocal is getting buried behind loud electric guitars in a rock mix. What frequency range should be boosted slightly to bring the vocal forward in the mix?",
      type: "multi_choice",
      question: "Which frequency range adds presence, clarity, and articulation to help a lead vocal cut through a dense mix?",
      answers: [
        { text: "3 kHz to 5 kHz (the Presence band where consonant articulation lives).", is_true: "yes" },
        { text: "60 Hz to 100 Hz (sub-bass weight).", is_true: "no" },
        { text: "250 Hz to 400 Hz (lower midrange mud).", is_true: "no" },
        { text: "18 kHz to 20 kHz (inaudible air).", is_true: "no" }
      ],
      explanation: "<p><strong>The Presence Band (3–5 kHz):</strong> The human ear is naturally most sensitive around 3 to 4 kHz. This frequency band contains the consonant sounds of human speech ('t', 'k', 'p'). A gentle boost between 3 kHz and 5 kHz pushes a lead vocal forward in front of the instruments without having to push the channel fader too high.</p>",
      expert_quote: {
        text: "3 kHz is the presence sweet spot. Boost it gently to make the vocal step to the front of the stage.",
        author: "Vocal Production Guide"
      },
      img: "/images/svg/frequency_spectrum_treble.svg"
    },
    {
      title: "Vocal Sibilance Band (6–8 kHz)",
      content: "Where in the frequency spectrum do piercing vocal 'S' and 'T' sibilance sounds typically occur?",
      type: "multi_choice",
      question: "Which frequency range contains harsh vocal sibilance?",
      answers: [
        { text: "6 kHz to 8 kHz", is_true: "yes" },
        { text: "200 Hz to 300 Hz", is_true: "no" },
        { text: "1 kHz to 2 kHz", is_true: "no" },
        { text: "20 Hz to 60 Hz", is_true: "no" }
      ],
      explanation: "<p><strong>Sibilance Frequencies:</strong> Air whistling over the tongue and teeth during 'S' and 'Z' sounds creates harsh energy between 6 kHz and 8 kHz. Excessive boosts here make vocals sound painfully sharp, which is why de-essers are calibrated to target this specific zone.</p>",
      expert_quote: {
        text: "Sibilance lives between 6 and 8 kHz. Be careful boosting top end here, or your singer will sound like a snake.",
        author: "Acoustics & Vocals"
      },
      img: "/images/svg/de_esser_frequency_chart.svg"
    },
    {
      title: "Acoustic Guitar Soundhole Boom",
      content: "An acoustic guitar recorded with a cardioid microphone aimed directly into the soundhole sounds boomy and muddy around 100–150 Hz. Why does this happen, and how should it be fixed?",
      type: "multi_choice",
      question: "Why does pointing a microphone into an acoustic guitar soundhole sound boomy, and how is it corrected?",
      answers: [
        { text: "Proximity effect and internal body resonance build up at the soundhole; aim the mic at the 12th fret instead and cut 100–150 Hz.", is_true: "yes" },
        { text: "Phase cancellation from the floor; turn on phantom power to eliminate it.", is_true: "no" },
        { text: "The strings are out of tune; boost 5 kHz to mask the boom.", is_true: "no" },
        { text: "The audio interface is clipping; lower the sample rate from 48 kHz to 44.1 kHz.", is_true: "no" }
      ],
      explanation: "<p><strong>Soundhole Boom:</strong> The body of an acoustic guitar acts like a hollow resonant cavity, pumping out heavy low-end air between 100 Hz and 150 Hz directly through the soundhole. Pointing a directional mic directly at the soundhole causes boomy mud. The correct technique is aiming the mic at the 12th fret (where the neck joins the body) for a balanced, clear acoustic tone.</p>",
      expert_quote: {
        text: "Never point an acoustic mic straight into the soundhole. Aim at the 12th fret for clarity and balanced tone.",
        author: "A-Level Recording Techniques"
      },
      img: "/images/svg/mic_placement_acoustic_guitar.svg"
    },
    {
      title: "Snare Drum Resonant Ring Removal",
      content: "An acoustic snare drum has an irritating metallic 'ping' ringing after every hit. What EQ technique is used to find and remove this ring?",
      type: "multi_choice",
      question: "What is the standard 'boost and sweep' technique for eliminating an annoying snare drum ring?",
      answers: [
        { text: "Create a narrow bell filter with high Q, boost it by +10 dB, sweep across the midrange until the ring screams out, then pull it down into a cut.", is_true: "yes" },
        { text: "Apply a low-pass filter at 500 Hz to cut all high frequencies completely.", is_true: "no" },
        { text: "Boost 60 Hz by +12 dB to drown out the ringing frequency.", is_true: "no" },
        { text: "Mute the snare drum and replace it with a synthesised sine wave.", is_true: "no" }
      ],
      explanation: "<p><strong>Boost and Sweep Technique:</strong> To hunt down an annoying resonance: (1) set a parametric band to a narrow Q (high Q), (2) boost by +10 dB, (3) sweep the frequency knob through 300–800 Hz until the offending metallic ping jumps out violently, (4) pull the gain down to -6 dB to notch it out cleanly without ruining the rest of the snare body.</p>",
      expert_quote: {
        text: "Boost narrow, sweep to find the ugly frequency, then pull it down into a notch. Works every time.",
        author: "Component 4 Practical Exam Tips"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    },
    {
      title: "High-Pass (Low-Cut) Filter vs Low-Pass (High-Cut) Filter",
      content: "What is the difference between a High-Pass Filter and a Low-Pass Filter?",
      type: "multi_choice",
      question: "How do High-Pass and Low-Pass filters differ?",
      answers: [
        { text: "High-Pass allows high frequencies through and cuts lows; Low-Pass allows low frequencies through and cuts highs.", is_true: "yes" },
        { text: "High-Pass boosts treble; Low-Pass boosts bass.", is_true: "no" },
        { text: "High-Pass is only used on vocals; Low-Pass is only used on bass guitars.", is_true: "no" },
        { text: "They are two different brand names for the same shelving EQ.", is_true: "no" }
      ],
      explanation: "<p><strong>Filters:</strong><br/>• <strong>High-Pass Filter (HPF / Low-Cut):</strong> Lets the *highs pass* through while cutting out low frequencies.<br/>• <strong>Low-Pass Filter (LPF / High-Cut):</strong> Lets the *lows pass* through while cutting out high frequencies.</p>",
      expert_quote: {
        text: "Remember: the name tells you what gets through. High-pass lets highs through; low-pass lets lows through.",
        author: "Edexcel Music Tech Terminology"
      },
      img: "/images/svg/high_pass_filter_sweep_riser.svg"
    },
    {
      title: "Subtractive EQ vs Additive EQ",
      content: "Why do sound engineers generally recommend using Subtractive EQ (cutting unwanted frequencies) rather than Additive EQ (boosting frequencies) when balancing a mix?",
      type: "multi_choice",
      question: "Why is cutting with EQ (subtractive) generally preferred over boosting (additive)?",
      answers: [
        { text: "Cutting clears space and preserves digital headroom without adding phase distortion or clipping the master fader.", is_true: "yes" },
        { text: "Cutting frequencies automatically doubles the sample rate of the DAW project.", is_true: "no" },
        { text: "Modern DAWs disable the volume fader whenever an EQ boost is applied.", is_true: "no" },
        { text: "Boosting frequencies is illegal under Edexcel exam guidelines.", is_true: "no" }
      ],
      explanation: "<p><strong>Subtractive EQ:</strong> When you constantly boost frequencies with an EQ, you eat up digital headroom and push the channel closer to clipping distortion. By cutting problem frequencies instead (e.g. cutting 300 Hz mud instead of boosting 3 kHz presence), you clean up the track, create space for other instruments, and keep your mix sounding natural and clear.</p>",
      expert_quote: {
        text: "Think of EQ like sculpting stone: you carve away what doesn't belong rather than sticking more clay on top.",
        author: "Sound Recording & Reproduction Guide"
      },
      img: "/images/svg/eq_bell_curve_q_comparison.svg"
    }
  ];
  console.log('✓ Recalibrated PQ26 to Edexcel standard');
}

// -------------------------------------------------------------
// 5. Recalibrate PQ27: Phase Alignment, Polarities & Comb Filtering (quiz-topic-46)
// -------------------------------------------------------------
const pq27 = stage3.items.find(i => i.id === 'quiz-topic-46');
if (pq27) {
  pq27.questions = [
    {
      title: "The 3:1 Microphone Rule",
      content: "What is the 3:1 Distance Rule used for when placing multiple microphones on stage or in a tracking room?",
      type: "multi_choice",
      question: "What is the rule of thumb known as the 3:1 Rule in microphone placement?",
      answers: [
        { text: "The distance between two microphones should be at least three times the distance from each microphone to its sound source.", is_true: "yes" },
        { text: "Every microphone must have three backup cables in case of failure.", is_true: "no" },
        { text: "Microphone preamps should be set to three times the input impedance of the microphone.", is_true: "no" },
        { text: "Three directional microphones must always be pointed at a single instrument.", is_true: "no" }
      ],
      explanation: "<p><strong>The 3:1 Rule:</strong> When multiple microphones are open in the same room, acoustic bleed from Source A leaks into Microphone B with a slight time delay. When the two mics are mixed together, this time delay causes hollow phase cancellation (comb filtering). The 3:1 rule ensures the distance between the two mics is at least three times greater than the distance to the source, ensuring the leak is quiet enough that phase cancellation is inaudible.</p>",
      expert_quote: {
        text: "The 3:1 rule keeps phase bleed low enough that you don't hear nasty hollow comb filtering.",
        author: "Lou Burroughs, Multi-Mic Acoustic Rule"
      },
      img: "/images/gen/diagram_3_to_1_rule.svg"
    },
    {
      title: "Snare Top and Bottom Polarity Reversal",
      content: "An engineer places one microphone pointing down at the top of a snare drum, and a second microphone pointing up at the bottom snares. When both channels are brought up, the drum sounds thin and tinny. What should the engineer do?",
      type: "multi_choice",
      question: "What immediate adjustment should you make if blending a bottom snare mic makes the drum sound thin and hollow?",
      answers: [
        { text: "Invert the polarity (flip the 'Phase' Ø switch) on the bottom snare microphone channel.", is_true: "yes" },
        { text: "Turn off phantom power (+48V) on the audio interface.", is_true: "no" },
        { text: "Pan both snare microphones hard left and hard right across the stereo field.", is_true: "no" },
        { text: "Put a heavy distortion plugin on the snare top track.", is_true: "no" }
      ],
      explanation: "<p><strong>Snare Drum Polarity:</strong> When the stick strikes the top head, the head moves downward (away from the top mic). That same air pushes the bottom head downward (toward the bottom mic). Because the two diaphragms move in opposite relative directions, the signals are 180° out of phase. Summing them cancels out low frequencies. Flipping the polarity switch on the bottom mic puts them back in phase, restoring full low-end body.</p>",
      expert_quote: {
        text: "If adding the bottom snare mic makes the drum sound thin, hit the polarity switch. The low end will instantly jump right back.",
        author: "Edexcel Component 4 Practical Studio Exam"
      },
      img: "/images/gen/diagram_3_to_1_rule.svg"
    },
    {
      title: "What is Comb Filtering?",
      content: "What acoustic phenomenon occurs when a sound is combined with a slightly delayed version of itself (between 1 and 20 milliseconds later)?",
      type: "multi_choice",
      question: "What is the acoustic effect called when identical audio signals combine with a short time delay, creating a series of peaks and cancellations?",
      answers: [
        { text: "Comb filtering, which creates a hollow, nasal, or phasey sound.", is_true: "yes" },
        { text: "Analog saturation, which adds warm tube harmonics.", is_true: "no" },
        { text: "Dithering, which removes digital quantization errors.", is_true: "no" },
        { text: "Ground loop hum, which creates a 50 Hz buzz.", is_true: "no" }
      ],
      explanation: "<p><strong>Comb Filtering:</strong> When an original signal mixes with a copy that has been delayed by a few milliseconds (from a wall reflection or a second microphone), certain frequencies sum together (doubling in volume) while others arrive 180° out of phase (canceling completely). Plotted on a graph, this looks like the teeth of a comb, making audio sound hollow, thin, and filtered.</p>",
      expert_quote: {
        text: "Comb filtering is phase cancellation in action. It hollows out your tone and makes instruments sound like they're inside a drainpipe.",
        author: "Acoustics for Audio Engineers"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    },
    {
      title: "Bass Guitar DI and Amp Phase Alignment",
      content: "When recording an electric bass using both a Direct Injection (DI) box and a microphone on the bass amplifier, why is the microphone signal delayed slightly compared to the DI signal?",
      type: "multi_choice",
      question: "Why is a microphone track on an amplifier delayed relative to a direct DI track recorded at the same time?",
      answers: [
        { text: "Sound traveling through the air from the speaker cone takes time to reach the mic (roughly 1 ms per foot), whereas the DI signal travels through cable near the speed of light.", is_true: "yes" },
        { text: "DI boxes have internal digital delay chips that speed up audio signals.", is_true: "no" },
        { text: "Microphone preamps are slower than line inputs on audio interfaces.", is_true: "no" },
        { text: "Bass strings vibrate slower through air than through pickup magnets.", is_true: "no" }
      ],
      explanation: "<p><strong>Air Travel Delay:</strong> Electrical signals in cables travel near the speed of light (almost instant). But sound in air travels much slower (around 343 meters per second, or about 1 millisecond for every foot). If a mic is placed 1 foot in front of the speaker cabinet, the mic track lags about 1 millisecond behind the DI track. Zooming into the DAW and nudging the waveforms into alignment aligns their phase, maximizing low-end punch.</p>",
      expert_quote: {
        text: "Sound in air is slow compared to electricity in wire. Line up the peaks of your bass DI and mic in your DAW for huge bass tone.",
        author: "Studio Recording Guide"
      },
      img: "/images/gen/diagram_signal_flow.png"
    },
    {
      title: "Phase Correlation Meter Reading",
      content: "When checking a stereo master in your DAW on a Phase Correlation Meter, what does a reading below 0 (in the red zone towards -1) indicate?",
      type: "multi_choice",
      question: "What does a negative reading (below 0) on a phase correlation meter warn the engineer about?",
      answers: [
        { text: "There is out-of-phase audio between left and right channels that will cancel out when played back in mono.", is_true: "yes" },
        { text: "The song tempo is playing slower than the DAW project tempo.", is_true: "no" },
        { text: "The audio signal is clipping the digital master fader.", is_true: "no" },
        { text: "The mix is perfectly mono-compatible with zero phase issues.", is_true: "no" }
      ],
      explanation: "<p><strong>Correlation Meter:</strong><br/>• <strong>+1:</strong> Pure mono (identical signal on left and right; 100% mono compatible).<br/>• <strong>0 to +1:</strong> Normal, healthy stereo imaging.<br/>• <strong>Below 0 (Negative towards -1):</strong> Left and right channels have out-of-phase components. When summed to mono (e.g. on a phone or club PA), those sounds will cancel each other out and disappear.</p>",
      expert_quote: {
        text: "Keep your correlation meter on the positive side of zero. If it goes negative, your mix will vanish on mono speakers.",
        author: "Edexcel Component 4 Mastering Guide"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "Mono Compatibility Testing",
      content: "Why is it essential to check a commercial stereo mix in mono before finishing your DAW project?",
      type: "multi_choice",
      question: "Why should you always test a stereo mix in mono?",
      answers: [
        { text: "Many consumer devices (smartphones, bluetooth speakers, club sound systems, supermarket radios) sum stereo to mono, and phase cancellation can make vocals or instruments disappear.", is_true: "yes" },
        { text: "Because mono audio files load faster onto streaming services.", is_true: "no" },
        { text: "Streaming services refuse to accept stereo mixes that haven't been converted to mono.", is_true: "no" },
        { text: "Mono listening makes high frequencies sound louder than low frequencies.", is_true: "no" }
      ],
      explanation: "<p><strong>Mono Compatibility:</strong> While listeners with headphones enjoy wide stereo imaging, millions of real-world listeners use single-speaker devices (phones, smart speakers like Echo/Nest, supermarket PA systems, and club dancefloors). If stereo widening effects or phase issues exist in the mix, collapsing to mono causes destructive phase cancellation, often making the lead vocal or snare drum completely vanish.</p>",
      expert_quote: {
        text: "Always hit the mono button. If the lead vocal drops in volume or sounds hollow, you have phase issues to fix.",
        author: "Mixing Secrets Guide"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "Coincident Pair (XY) Stereo Micing",
      content: "Why is the Coincident Pair (XY) stereo microphone technique praised for its excellent mono compatibility?",
      type: "multi_choice",
      question: "Why does XY stereo microphone placement avoid phase cancellation when collapsed to mono?",
      answers: [
        { text: "Because the two capsules are placed as close together as physically possible at the same point in space, sound arrives at both capsules at virtually the same instant.", is_true: "yes" },
        { text: "Because XY micing uses omnidirectional microphones that do not pick up room reflections.", is_true: "no" },
        { text: "Because XY microphones automatically filter out all low frequencies below 100 Hz.", is_true: "no" },
        { text: "Because the two microphones are placed 10 feet apart.", is_true: "no" }
      ],
      explanation: "<p><strong>XY Coincident Technique:</strong> In an XY setup, two directional (cardioid) microphones are placed with their capsules directly above each other at a 90° angle. Because the capsules share the exact same location in space, sound waves hit both capsules at the same time. The stereo image comes purely from volume differences, meaning there is zero time delay and zero phase cancellation when summed to mono.</p>",
      expert_quote: {
        text: "XY is intensity stereo, not timing stereo. It is the safest stereo technique for guaranteed mono compatibility.",
        author: "Microphone Techniques Anthology"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "Spaced Pair (A/B) Stereo Micing",
      content: "How does a Spaced Pair (A/B) stereo microphone setup create a sense of stereo width?",
      type: "multi_choice",
      question: "What physical mechanism creates the stereo sensation in a Spaced Pair (A/B) microphone setup?",
      answers: [
        { text: "Time-of-arrival differences as sound reaches the two spaced microphones at slightly different times.", is_true: "yes" },
        { text: "Artificial pitch shifting generated by the microphone preamps.", is_true: "no" },
        { text: "Reversing the polarity of the right microphone by 180 degrees.", is_true: "no" },
        { text: "Using one condenser mic and one ribbon mic at opposite ends of the room.", is_true: "no" }
      ],
      explanation: "<p><strong>Spaced Pair (A/B):</strong> In a spaced pair setup, two microphones are placed several feet apart (e.g. over a drum kit or acoustic choir). Sound from the left side of the ensemble hits the left mic a few milliseconds before reaching the right mic. These time-of-arrival differences create a wide, spacious stereo image—though care must be taken with the 3:1 rule to avoid phase issues in mono.</p>",
      expert_quote: {
        text: "Spaced pair gives you huge, natural width because your ears hear the timing differences across the room.",
        author: "Drum Recording Masterclass"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    },
    {
      title: "Overhead Drum Micing Phase Alignment",
      content: "When setting up two drum overhead microphones, why do engineers use a tape measure or microphone cable to measure the distance from the center of the snare drum to each overhead capsule?",
      type: "multi_choice",
      question: "Why should both drum overhead microphones be measured to be the exact same distance from the snare drum?",
      answers: [
        { text: "To ensure the sound of the snare drum hits both overhead capsules at the exact same instant, locking the snare in the center of the stereo image without phase cancellation.", is_true: "yes" },
        { text: "To make sure the overhead microphones do not fall over during the recording session.", is_true: "no" },
        { text: "To eliminate the need for +48V phantom power on condenser microphones.", is_true: "no" },
        { text: "Because overhead microphones cannot record audio if they are placed at unequal heights.", is_true: "no" }
      ],
      explanation: "<p><strong>Equidistant Overhead Micing:</strong> The snare drum is the loud rhythmic heartbeat of the drum kit. If Overhead Mic 1 is 40 inches from the snare and Overhead Mic 2 is 45 inches away, the snare will arrive at Mic 1 slightly before Mic 2. This causes phase cancellation (comb filtering) that makes the snare sound hollow and pulls its image off-center. Measuring equal distance locks the snare dead center with punch.</p>",
      expert_quote: {
        text: "Measure from the snare center to each overhead capsule. When the distances match, your snare drum will sound huge and centered.",
        author: "Studio Drum Micing Guide"
      },
      img: "/images/gen/diagram_3_to_1_rule.svg"
    },
    {
      title: "The Polarity Switch (Ø)",
      content: "What does the Polarity switch (often marked with the Greek symbol Ø on a mixer or audio interface) do to an audio signal?",
      type: "multi_choice",
      question: "What does the Polarity / Phase switch (Ø) do on a channel strip?",
      answers: [
        { text: "It inverts the positive and negative electrical voltage of the signal by 180 degrees.", is_true: "yes" },
        { text: "It adds a 50-millisecond delay to the incoming audio.", is_true: "no" },
        { text: "It cuts low frequencies below 100 Hz.", is_true: "no" },
        { text: "It converts an unbalanced TS signal into a balanced XLR signal.", is_true: "no" }
      ],
      explanation: "<p><strong>Polarity Switch:</strong> The polarity switch (often labeled Phase Ø) flips the electrical signal upside down. Positive voltages become negative, and negative voltages become positive (a 180° flip). It is used on multi-mic setups (like snare top/bottom or kick inside/outside) when two microphones are moving in opposite directions, putting them back in phase.</p>",
      expert_quote: {
        text: "The polarity switch flips positive and negative. If two mics are canceling each other, one click will bring the low end right back.",
        author: "Edexcel Component 3 & 4 Guide"
      },
      img: "/images/gen/diagram_signal_flow.png"
    },
    {
      title: "Boundary (PZM) Microphones",
      content: "Why are Boundary Microphones (PZM) often placed directly on a flat surface like a stage floor, conference table, or inside a kick drum?",
      type: "multi_choice",
      question: "What is the main acoustic benefit of a boundary (PZM) microphone placed on a flat surface?",
      answers: [
        { text: "The capsule is mounted millimeters from the boundary, so direct sound and reflected sound arrive at the same time, eliminating floor comb filtering.", is_true: "yes" },
        { text: "It does not require microphone cables to transmit audio.", is_true: "no" },
        { text: "It automatically tunes vocals as they are being sung.", is_true: "no" },
        { text: "It prevents bass frequencies from being picked up.", is_true: "no" }
      ],
      explanation: "<p><strong>Boundary / PZM Mics:</strong> When a standard mic is placed near a floor, the sound reflecting off the floor arrives a fraction of a millisecond after the direct sound, creating comb filtering. A boundary microphone mounts a small capsule directly on a flat metal plate. Because the capsule is right at the boundary surface, direct and reflected sound arrive at virtually the same instant, reinforcing the signal (+6 dB) with zero comb filtering.</p>",
      expert_quote: {
        text: "At the boundary surface, there is no delayed reflection—just clean, reinforced sound with no comb filtering.",
        author: "Microphone Technology Handbook"
      },
      img: "/images/gen/acoustic_reflection_diagram.png"
    },
    {
      title: "The Haas Effect (Delay-Based Width)",
      content: "If you duplicate a mono guitar track, pan one channel hard left and the other hard right, and delay the right channel by 10 milliseconds, what does the listener hear?",
      type: "multi_choice",
      question: "What does a short delay (10–20 ms) between left and right channels create according to the Haas Effect?",
      answers: [
        { text: "A wide, spacious stereo image that sounds like a single performance, though with risk of phase cancellation in mono.", is_true: "yes" },
        { text: "Two completely separate, distinct rhythmic echo repeats.", is_true: "no" },
        { text: "Complete silence because the two tracks cancel out in stereo.", is_true: "no" },
        { text: "The pitch of the guitar is doubled by one octave.", is_true: "no" }
      ],
      explanation: "<p><strong>The Haas Effect:</strong> When two identical sounds arrive at our ears within about 1 to 35 milliseconds of each other, our brain fuses them into a single sound event rather than two separate echoes. Panning the dry and delayed signals creates an impression of wide stereo space. However, engineers must check this in mono, because summing them can cause comb filtering.</p>",
      expert_quote: {
        text: "The Haas effect gives you easy stereo width, but always check in mono to make sure your guitar doesn't hollow out.",
        author: "Stereo Field & Imaging Secrets"
      },
      img: "/images/gen/diagram_stereo_width.svg"
    }
  ];
  console.log('✓ Recalibrated PQ27 to Edexcel standard');
}

// -------------------------------------------------------------
// 6. Recalibrate PQ28: DAW Automation Modes & MIDI Control Change Data (quiz-topic-47)
// -------------------------------------------------------------
const pq28 = stage3.items.find(i => i.id === 'quiz-topic-47');
if (pq28) {
  pq28.questions = [
    {
      title: "Touch Automation Mode",
      content: "When writing volume automation in your DAW using 'Touch' mode, what happens to the fader value when you release your mouse or hardware controller?",
      type: "multi_choice",
      question: "What does a parameter do when you release the fader in Touch automation mode?",
      answers: [
        { text: "It returns back to follow any previously existing automation on the track.", is_true: "yes" },
        { text: "It stays at the last level you touched and keeps overwriting automation until playback stops.", is_true: "no" },
        { text: "It instantly deletes the entire audio track from the project.", is_true: "no" },
        { text: "It mutes the channel strip permanently.", is_true: "no" }
      ],
      explanation: "<p><strong>Touch Mode:</strong> In Touch mode, automation is only recorded while you are actively holding the fader. As soon as you let go, the parameter returns smoothly to follow whatever automation was already written on the track. This makes Touch mode safe and ideal for riding individual vocal words or lines.</p>",
      expert_quote: {
        text: "Touch mode is the safest way to ride vocals: touch it to write, let go to return.",
        author: "Edexcel Component 4 DAW Automation Guide"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "Latch Automation Mode",
      content: "How does 'Latch' automation mode differ from 'Touch' mode in a digital audio workstation?",
      type: "multi_choice",
      question: "What happens when you release the fader in Latch automation mode?",
      answers: [
        { text: "It stays at the last level you released it at and continues overwriting data until playback stops.", is_true: "yes" },
        { text: "It immediately snaps back to zero decibels.", is_true: "no" },
        { text: "It converts all audio on the track into MIDI notes.", is_true: "no" },
        { text: "It disables automation playback across all other tracks in the song.", is_true: "no" }
      ],
      explanation: "<p><strong>Latch Mode:</strong> Like Touch mode, Latch doesn't start writing until you touch the fader. But when you release it, it does <em>not</em> return to previous automation; it stays ('latches') at the last held value and keeps writing at that level until you press stop. It is great for setting a new volume level for an entire chorus.</p>",
      expert_quote: {
        text: "Latch stays where you leave it. Remember to hit stop so you don't overwrite the next section of your song.",
        author: "Logic Pro & Pro Tools Mixing Guide"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "Write Automation Mode Warning",
      content: "Why do audio engineers avoid leaving a track in 'Write' automation mode during a mix session?",
      type: "multi_choice",
      question: "Why is Write automation mode dangerous to leave active in a DAW?",
      answers: [
        { text: "It begins overwriting and erasing existing automation the moment you press play, even if you never touch the fader.", is_true: "yes" },
        { text: "It deletes the recorded audio files permanently from your computer's hard drive.", is_true: "no" },
        { text: "It forces the DAW to export the project in mono.", is_true: "no" },
        { text: "It disconnects all MIDI keyboard controllers from the computer.", is_true: "no" }
      ],
      explanation: "<p><strong>Write Mode Warning:</strong> Write mode is aggressive. The moment you press play, it starts overwriting whatever automation was on the track, erasing your previous work even if your hands aren't touching the controller. Most DAWs automatically switch out of Write mode into Touch or Read mode the moment you press stop to protect your work.</p>",
      expert_quote: {
        text: "Write mode is like a steamroller. Use it only for your very first pass, then switch straight to Touch or Read.",
        author: "DAW Mixing Essentials"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "Read Automation Mode",
      content: "What is the function of the standard 'Read' automation mode on a DAW track?",
      type: "multi_choice",
      question: "What does Read automation mode do?",
      answers: [
        { text: "It plays back all previously written automation moves without recording any accidental changes.", is_true: "yes" },
        { text: "It scans lyrics from an audio file and prints them onto a sheet music score.", is_true: "no" },
        { text: "It converts audio into high-resolution MIDI data.", is_true: "no" },
        { text: "It only plays audio when the spacebar is held down.", is_true: "no" }
      ],
      explanation: "<p><strong>Read Mode:</strong> Read mode is the safe, standard playback mode. The faders and knobs follow all the curves and moves you previously drew or recorded, and any accidental mouse bumps during playback will not overwrite your mix.</p>",
      expert_quote: {
        text: "When you finish automating a track, leave it in Read mode so your mix is protected.",
        author: "Edexcel Component 4 Workflow Guide"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "MIDI CC1 (Modulation Wheel)",
      content: "What standard synthesizer parameter is universally controlled by MIDI Continuous Controller 1 (CC1)?",
      type: "multi_choice",
      question: "Which controller on a MIDI keyboard transmits MIDI CC1 by default?",
      answers: [
        { text: "The Modulation Wheel (often used for vibrato, filter sweeps, or orchestral dynamics).", is_true: "yes" },
        { text: "The Sustain Pedal.", is_true: "no" },
        { text: "The Master Volume Fader.", is_true: "no" },
        { text: "The Pitch Bend Wheel.", is_true: "no" }
      ],
      explanation: "<p><strong>MIDI CC1:</strong> CC1 is universally assigned to the physical Modulation Wheel. On synthesizers, it usually introduces vibrato or opens a filter. In modern virtual orchestral instruments (like strings or brass), CC1 is used to control dynamic expression and swell volume from soft to loud.</p>",
      expert_quote: {
        text: "CC1 is your modulation wheel. Move it to add vibrato to a synth lead or bring a string section to life.",
        author: "MIDI Standards & Sequencing"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "MIDI CC7 (Volume) and CC10 (Pan)",
      content: "Which MIDI Continuous Controller numbers are standardized for Channel Volume and Stereo Pan position?",
      type: "multi_choice",
      question: "What are the standard MIDI CC numbers for Volume and Pan?",
      answers: [
        { text: "CC7 = Channel Volume; CC10 = Stereo Pan.", is_true: "yes" },
        { text: "CC1 = Channel Volume; CC64 = Stereo Pan.", is_true: "no" },
        { text: "CC10 = Channel Volume; CC7 = Stereo Pan.", is_true: "no" },
        { text: "CC127 = Channel Volume; CC0 = Stereo Pan.", is_true: "no" }
      ],
      explanation: "<p><strong>MIDI Standards:</strong><br/>• <strong>MIDI CC7:</strong> Governs main channel volume.<br/>• <strong>MIDI CC10:</strong> Governs stereo pan position (value 0 = Hard Left, 64 = Center, 127 = Hard Right).</p>",
      expert_quote: {
        text: "Remember: CC7 is Volume, and CC10 is Pan. Standard MIDI protocol on every sequencer.",
        author: "Edexcel Music Technology Specification"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "MIDI CC64 (Sustain Pedal)",
      content: "What MIDI controller number is transmitted when a keyboard player presses down on a standard Sustain (Damper) Pedal?",
      type: "multi_choice",
      question: "Which MIDI CC number is assigned to the Sustain / Damper Pedal?",
      answers: [
        { text: "MIDI CC 64", is_true: "yes" },
        { text: "MIDI CC 1", is_true: "no" },
        { text: "MIDI CC 7", is_true: "no" },
        { text: "MIDI CC 128", is_true: "no" }
      ],
      explanation: "<p><strong>MIDI CC64 (Sustain Pedal):</strong> When you step on a keyboard sustain pedal, it sends MIDI CC64 with a value of 127 (Pedal Down / On). When you release the pedal, it sends a value of 0 (Pedal Up / Off). This sustains held notes just like the damper pedal on an acoustic piano.</p>",
      expert_quote: {
        text: "CC64 is the sustain pedal. Values 64–127 hold the notes; values 0–63 let them damp.",
        author: "MIDI Protocol Basics"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "MIDI Data Value Range (0–127)",
      content: "Why do standard MIDI parameters (like Note Velocity, Volume CC7, and Pan CC10) have a numerical range from 0 to 127?",
      type: "multi_choice",
      question: "Why do standard MIDI control change values range from 0 to 127?",
      answers: [
        { text: "Standard MIDI data bytes use 7-bit resolution, which provides 128 discrete values (2⁷ = 128).", is_true: "yes" },
        { text: "Because human hearing cannot detect more than 100 volume levels.", is_true: "no" },
        { text: "Because standard piano keyboards only have 127 physical keys.", is_true: "no" },
        { text: "To prevent computers from running out of RAM during recording.", is_true: "no" }
      ],
      explanation: "<p><strong>7-Bit MIDI Resolution:</strong> The original MIDI specification uses 7-bit data bytes ($2^7 = 128$). Therefore, values range from 0 (minimum) to 127 (maximum). This applies to note velocities, control changes (CC1, CC7, CC10), and program changes.</p>",
      expert_quote: {
        text: "In standard MIDI, everything runs from 0 to 127 because it's built on 7-bit data bytes.",
        author: "Digital Music Technology Specification"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "Pitch Bend Wheel Behavior",
      content: "How does the Pitch Bend wheel differ mechanically and functionally from the Modulation wheel on a MIDI keyboard?",
      type: "multi_choice",
      question: "How does the Pitch Bend wheel differ from the Modulation wheel?",
      answers: [
        { text: "The Pitch Bend wheel is spring-loaded to automatically snap back to center (zero bend) when released.", is_true: "yes" },
        { text: "The Pitch Bend wheel stays in whatever position you leave it and never springs back.", is_true: "no" },
        { text: "The Pitch Bend wheel can only bend notes down, never up.", is_true: "no" },
        { text: "The Pitch Bend wheel only controls filter cutoff frequency.", is_true: "no" }
      ],
      explanation: "<p><strong>Pitch Bend vs Mod Wheel:</strong> The Pitch Bend wheel has a center spring mechanism. When you let go, it snaps back to the center position (zero pitch change), ensuring your synthesizer returns to pitch. It also uses higher resolution than standard CC to ensure pitch glides are smooth without stepping.</p>",
      expert_quote: {
        text: "Pitch bend snaps back to center when you let go. Modulation wheel stays where you leave it.",
        author: "Edexcel Component 3 & 4 MIDI Guide"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "Volume Fade Automation Curves",
      content: "When drawing a volume fade-out at the end of a song in your DAW, why is a curved (logarithmic/exponential) fade line preferred over a straight linear line?",
      type: "multi_choice",
      question: "Why do curved volume fades sound smoother to human ears than straight linear fades?",
      answers: [
        { text: "Human hearing perceives volume logarithmically (in decibels), so a curved fade produces a smooth, natural decline into silence.", is_true: "yes" },
        { text: "Straight linear fades cause digital clipping distortion as they reach zero volume.", is_true: "no" },
        { text: "DAWs are incapable of rendering straight diagonal lines in automation.", is_true: "no" },
        { text: "Curved fades automatically delete background noise from the vocal track.", is_true: "no" }
      ],
      explanation: "<p><strong>Logarithmic Volume Fades:</strong> Human ears do not hear volume in a straight linear line; we hear logarithmically in decibels. A straight linear fade sounds like it does almost nothing at the start, followed by an abrupt drop-off right at the end. An exponential or logarithmic curve matches human hearing, sounding like a smooth, even fade from start to finish.</p>",
      expert_quote: {
        text: "Our ears hear logarithmically. Curve your fade-outs so the volume melts away smoothly.",
        author: "DAW Mixing & Editing Tips"
      },
      img: "/images/svg/transport_bar.svg"
    },
    {
      title: "MIDI Velocity Control",
      content: "When recording a MIDI piano or synth track, what does 'Note Velocity' measure?",
      type: "multi_choice",
      question: "What does MIDI note velocity measure and control?",
      answers: [
        { text: "How hard and fast the key was pressed, typically controlling note volume and filter brightness.", is_true: "yes" },
        { text: "How long the note was held down in seconds.", is_true: "no" },
        { text: "The speed of the song's tempo in beats per minute.", is_true: "no" },
        { text: "The pitch of the note in semitones.", is_true: "no" }
      ],
      explanation: "<p><strong>MIDI Velocity:</strong> Velocity measures the speed and force with which a keyboard key or drum pad is struck (from 1 to 127). In addition to making notes louder when hit harder, synthesizers and samplers frequently use velocity to open the filter cutoff or trigger brighter acoustic sample layers, mimicking real acoustic instruments.</p>",
      expert_quote: {
        text: "Velocity is touch sensitivity. Hitting a key harder produces a louder, brighter sound.",
        author: "MIDI Essentials for A-Level"
      },
      img: "/images/svg/midi_cc_message_3byte_structure.svg"
    },
    {
      title: "Plugin Automation in DAWs",
      content: "In modern DAWs like Logic Pro, Pro Tools, and Cubase, which parameters can be automated over time using automation lanes?",
      type: "multi_choice",
      question: "Which elements of a mix can be automated using DAW track automation lanes?",
      answers: [
        { text: "Virtually any parameter, including track volume, panning, send levels, and plugin knobs (like filter cutoff or reverb wet/dry).", is_true: "yes" },
        { text: "Only track volume faders; plugin parameters cannot be automated.", is_true: "no" },
        { text: "Only MIDI tracks; audio tracks cannot use automation.", is_true: "no" },
        { text: "Only panning; volume changes must be adjusted manually with hardware faders.", is_true: "no" }
      ],
      explanation: "<p><strong>DAW Plugin Automation:</strong> Modern DAWs allow complete dynamic automation of almost every parameter. You can automate track volume rides, stereo panning, auxiliary reverb send levels, and internal plugin parameters (such as sweeping an EQ filter cutoff during an EDM build or automating the delay feedback on the final word of a chorus).</p>",
      expert_quote: {
        text: "Automation brings static mixes to life. Automate volume, pans, and plugin sweeps to guide the listener's ear.",
        author: "Edexcel Component 4 Mix Techniques"
      },
      img: "/images/svg/transport_bar.svg"
    }
  ];
  console.log('✓ Recalibrated PQ28 to Edexcel standard');
}

// Write updated course_data.json
fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2), 'utf8');
console.log('✓ Successfully wrote recalibrated course_data.json');
