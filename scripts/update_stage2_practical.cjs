// Script to update Stage 2 Topic Mastery Quizzes with rich practical interactive questions
const fs = require('fs');
const path = require('path');

const courseDataPath = path.join(__dirname, '../src/data/course_data.json');
const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

const stage2 = courseData.sections[1]; // Stage 2: Topic Mastery Quizzes

// 1. Topic 1 Part 1: Signal Levels Drag & Drop
// Replace Q4 in quiz-topic-1_p1
const t1p1 = stage2.items[0];
t1p1.questions[3] = {
  title: "Practical Task: Studio Signal Voltage Hierarchy",
  content: "Drag and drop the audio signal levels into the correct order from lowest voltage (quietest) to highest voltage (loudest).",
  type: "drag_drop",
  items: [
    "Speaker Level (+30 dBu / Tens of Volts)",
    "Professional Line Level (+4 dBu / 1.23V)",
    "Microphone Level (-60 dBu / Millivolts)",
    "Instrument / Hi-Z Level (-20 dBu)",
    "Consumer Line Level (-10 dBV / 0.316V)"
  ],
  correct_order: [
    "Microphone Level (-60 dBu / Millivolts)",
    "Instrument / Hi-Z Level (-20 dBu)",
    "Consumer Line Level (-10 dBV / 0.316V)",
    "Professional Line Level (+4 dBu / 1.23V)",
    "Speaker Level (+30 dBu / Tens of Volts)"
  ],
  explanation: "<p><strong>Signal Voltage Hierarchy:</strong> Microphone level is tiny (millivolts, around -60 dBu) requiring a dedicated preamp. Hi-Z instrument level (-20 dBu) from guitar pickups sits higher. Consumer line level (-10 dBV = 0.316V RMS) is used in RCA home audio, while Professional line level (+4 dBu = 1.23V RMS) is standard in studio mixing consoles and audio interfaces. Speaker level delivers high current/voltage to drive monitor voice coils.</p>",
  expert_quote: {
    text: "Plugging a line level output into a mic preamp will overload it instantly. Gain staging starts with understanding your signal voltage boundaries.",
    author: "Bob Katz, Mastering Engineer"
  },
  img: "/images/svg/balanced_cable.svg"
};

// 2. Topic 1 Part 2: Recording Signal Path Drag & Drop
// Replace Q1 in quiz-topic-1_p2
const t1p2 = stage2.items[1];
t1p2.questions[0] = {
  title: "Practical Task: Acoustic to Digital Signal Flow",
  content: "Trace the audio signal from acoustic sound source into the DAW. Drag the studio components into the exact physical sequence.",
  type: "drag_drop",
  items: [
    "Audio Interface Analog-to-Digital Converter (ADC)",
    "DAW Audio Track (Digital PCM File)",
    "Microphone Capsule Transducer (Acoustic to Voltage)",
    "Acoustic Sound Source (Vocal / Instrument)",
    "Balanced XLR Cable",
    "Microphone Preamplifier (+48V Gain Stage)"
  ],
  correct_order: [
    "Acoustic Sound Source (Vocal / Instrument)",
    "Microphone Capsule Transducer (Acoustic to Voltage)",
    "Balanced XLR Cable",
    "Microphone Preamplifier (+48V Gain Stage)",
    "Audio Interface Analog-to-Digital Converter (ADC)",
    "DAW Audio Track (Digital PCM File)"
  ],
  explanation: "<p><strong>Recording Signal Flow:</strong> Sound waves vibrate the mic diaphragm (transducing acoustic energy into millivolt electrical current). The balanced XLR cable rejects electromagnetic interference en route to the preamp, which boosts it to +4 dBu line level. The ADC quantizes continuous voltage into binary 24-bit PCM samples recorded directly to the DAW audio buffer.</p>",
  expert_quote: {
    text: "Every piece of wire and every gain stage affects your transient detail. Maintain pristine signal flow from source to converter.",
    author: "Al Schmitt, 23-Time Grammy Winning Engineer"
  },
  img: "/images/svg/signal_chain_basic.svg"
};

// 3. Topic 2 Part 1: Microphone Polar Pattern Null Angle
// Replace Q4 in quiz-topic-2_p1
const t2p1 = stage2.items[2];
t2p1.questions[3] = {
  title: "Practical Task: Cardioid Polar Rejection Angle",
  content: "Drag the polar pattern angles to match their directional sensitivity for a standard Cardioid microphone.",
  type: "drag_drop",
  items: [
    "180° Directly Behind (Dead Null Point: -25 dB+ Rejection)",
    "90° Off-Axis Side Angle (-6 dB Attenuation)",
    "0° On-Axis Front (Maximum Sensitivity: 0 dB)",
    "270° Off-Axis Side Angle (-6 dB Attenuation)"
  ],
  correct_order: [
    "0° On-Axis Front (Maximum Sensitivity: 0 dB)",
    "90° Off-Axis Side Angle (-6 dB Attenuation)",
    "180° Directly Behind (Dead Null Point: -25 dB+ Rejection)",
    "270° Off-Axis Side Angle (-6 dB Attenuation)"
  ],
  explanation: "<p><strong>Cardioid Polar Pattern:</strong> Cardioid mics have a heart-shaped polar pattern with maximum sensitivity at 0° on-axis, -6 dB attenuation at 90° and 270° sides, and a deep null point directly behind at 180° (exceeding -25 dB attenuation). In live recording, aiming the 180° rear null directly at stage monitor wedges minimizes acoustic feedback.</p>",
  expert_quote: {
    text: "Knowing where your microphone DOESN'T listen is just as crucial as knowing where it does. The rear null is your best weapon against bleed.",
    author: "Bruce Swedien, Recording Engineer"
  },
  img: "/images/svg/polar_pattern_cardioid.svg"
};

// 4. Topic 2 Part 2: The 3:1 Distance Rule Drag & Drop
// Replace Q2 in quiz-topic-2_p2
const t2p2 = stage2.items[3];
t2p2.questions[1] = {
  title: "Practical Task: 3:1 Distance Rule Configuration",
  content: "To prevent audible comb filtering and phase cancellation when multi-micing two acoustic sources, order the microphone distances according to the 3:1 rule.",
  type: "drag_drop",
  items: [
    "Source 1: Mic 1 Distance = 10 cm from sound source",
    "Phase Check: Sum to mono to verify low-end fullness",
    "Source 2: Mic 2 Placement = Minimum 30 cm away from Mic 1",
    "Result: Phase cancellation attenuated by at least 12 dB"
  ],
  correct_order: [
    "Source 1: Mic 1 Distance = 10 cm from sound source",
    "Source 2: Mic 2 Placement = Minimum 30 cm away from Mic 1",
    "Result: Phase cancellation attenuated by at least 12 dB",
    "Phase Check: Sum to mono to verify low-end fullness"
  ],
  explanation: "<p><strong>The 3:1 Rule:</strong> When using two microphones on different sound sources, the distance between the two microphones must be at least THREE times the distance from each microphone to its intended sound source. This ensures acoustic bleed into the secondary microphone is attenuated by at least 12 dB, preventing audible comb filtering when both channels are summed.</p>",
  expert_quote: {
    text: "Phase cancellation is an invisible thief of tone. Adhering to the 3:1 rule keeps your multitrack drum and acoustic guitar recordings punchy and clear.",
    author: "Geoff Emerick, Abbey Road Engineer (The Beatles)"
  },
  img: "/images/svg/mic_placement_acoustic_guitar.svg"
};

// 5. Topic 3 Part 1: Subtractive Synthesis Signal Flow & Waveform ID
// Replace Q1 & Q2 in quiz-topic-3_p1
const t3p1 = stage2.items[4];
t3p1.questions[0] = {
  title: "Practical Task: Subtractive Synthesis Architecture",
  content: "Drag and drop the functional synthesizer modules into the correct subtractive audio signal path from raw sound generation to dynamic output.",
  type: "drag_drop",
  items: [
    "Voltage Controlled Amplifier (VCA - Amplitude Shaping)",
    "Voltage Controlled Filter (VCF - Timbre & Cutoff Sculpting)",
    "Voltage Controlled Oscillator (VCO - Raw Waveform Generation)",
    "ADSR Envelope Generator (Modulates Filter Cutoff & Volume)"
  ],
  correct_order: [
    "Voltage Controlled Oscillator (VCO - Raw Waveform Generation)",
    "Voltage Controlled Filter (VCF - Timbre & Cutoff Sculpting)",
    "Voltage Controlled Amplifier (VCA - Amplitude Shaping)",
    "ADSR Envelope Generator (Modulates Filter Cutoff & Volume)"
  ],
  explanation: "<p><strong>Subtractive Synthesis Architecture:</strong> 1) The VCO generates harmonically rich raw waves (sawtooth, square, pulse). 2) The VCF subtracts or filters out unwanted harmonics via cutoff frequency and resonance. 3) The VCA controls output amplitude over time. 4) ADSR envelope generators send control voltages to modulate both the VCF and VCA.</p>",
  expert_quote: {
    text: "Subtractive synthesis is like sculpting marble. The oscillator provides the solid block of stone, and the filter carves away everything that isn't the sculpture.",
    author: "Bob Moog, Synthesizer Pioneer"
  },
  img: "/images/svg/high_pass_filter_sweep_riser.svg"
};

t3p1.questions[1] = {
  title: "Practical Listening: Waveform Harmonic Identification",
  content: "Listen to the synthesizer tone below. Identify the fundamental waveform characterised by having NO harmonic overtones.",
  type: "waveform_id",
  audio_src: "/Audio/Waveforms/sine wave.mp3",
  options: [
    "Sine Wave",
    "Sawtooth Wave",
    "Square Wave",
    "Triangle Wave"
  ],
  correct_option: "Sine Wave",
  explanation: "<p><strong>Sine Wave:</strong> The sine wave contains only the fundamental frequency with zero harmonic overtones. It produces a pure, warm, and smooth tone, universally utilized for sub-bass synthesizers and test tone calibration.</p>",
  expert_quote: {
    text: "A pure sine wave is the atom of all musical sound. Combine enough of them at differing amplitudes and phases, and you can reconstruct any acoustic instrument.",
    author: "Jean-Baptiste Fourier"
  },
  img: "/images/svg/human_hearing_range.svg"
};

// 6. Topic 3 Part 2: Sawtooth Waveform Identification
// Replace Q2 in quiz-topic-3_p2
const t3p2 = stage2.items[5];
t3p2.questions[1] = {
  title: "Practical Listening: Sawtooth Wave Timbre",
  content: "Listen to the raw oscillator tone below. Identify which waveform contains all odd and even harmonics, making it ideal for aggressive brass and synth leads.",
  type: "waveform_id",
  audio_src: "/Audio/Waveforms/Sawtooth Wave.mp3",
  options: [
    "Sawtooth Wave",
    "Square Wave",
    "Sine Wave",
    "Triangle Wave"
  ],
  correct_option: "Sawtooth Wave",
  explanation: "<p><strong>Sawtooth Wave:</strong> The sawtooth wave contains ALL integer harmonics (both odd and even) falling off at 1/n amplitude. This creates a bright, buzzy, and aggressive timbre that gives subtractive filters maximum frequency material to sculpt.</p>",
  expert_quote: {
    text: "For fat lead sounds, synth brass, and classic analog bass, the sawtooth wave remains the undisputed king of subtractive synthesis.",
    author: "Dave Smith, Designer of the Prophet-5 & Co-Creator of MIDI"
  },
  img: "/images/svg/frequency_spectrum_treble.svg"
};

// 7. Topic 4 Part 1: Sampler Chopping & Truncation Workflow
// Replace Q4 in quiz-topic-4_p1
const t4p1 = stage2.items[6];
t4p1.questions[3] = {
  title: "Practical Task: Sample Editing & Truncation Workflow",
  content: "Place the stages of preparing a raw acoustic drum break sample in a software sampler into the correct production order.",
  type: "drag_drop",
  items: [
    "Zero-Crossing Editing (Prevent audio clicks at slice boundaries)",
    "Import Raw 24-bit Audio Recording into Sampler",
    "Trim & Truncate Dead Air before Initial Transient Peak",
    "Assign Slices to MIDI Note Keyzones (Root Note Mapping)",
    "Apply Amplitude ADSR Envelope (Tailor release and decay time)"
  ],
  correct_order: [
    "Import Raw 24-bit Audio Recording into Sampler",
    "Trim & Truncate Dead Air before Initial Transient Peak",
    "Zero-Crossing Editing (Prevent audio clicks at slice boundaries)",
    "Assign Slices to MIDI Note Keyzones (Root Note Mapping)",
    "Apply Amplitude ADSR Envelope (Tailor release and decay time)"
  ],
  explanation: "<p><strong>Sampler Editing Workflow:</strong> 1) Import audio. 2) Truncate pre-transient silence so playback triggers instantaneously without latency lag. 3) Snap slice markers to zero-crossing points (0V) to avoid DC offset clicks. 4) Map slices to MIDI keyzones. 5) Shape envelopes to control sample sustain and tail release.</p>",
  expert_quote: {
    text: "A sampler is only as tight as your front truncation. Even a 5ms delay before the kick transient will destroy the groove of your rhythm section.",
    author: "Roger Linn, Inventor of the LM-1 & Akai MPC"
  },
  img: "/images/svg/vocal_chopping_sampling_technique.svg"
};

// 8. Topic 5 Part 1: Compressor Ear Training & Sidechain VCA Architecture
// Replace Q2 & Q3 in quiz-topic-5_p1
const t5p1 = stage2.items[8];
t5p1.questions[1] = {
  title: "Practical Listening: Compression A/B Comparison",
  content: "Listen to Audio A (Dry) and Audio B (Wet). Identify the dynamic processing applied to the electric guitar performance in Audio B.",
  type: "audio_comparison",
  audio_a: "/Audio/FX_Ear_Training/Guitar/Dry Compression Guitar.mp3",
  audio_b: "/Audio/FX_Ear_Training/Guitar/Compression Guitar.mp3",
  options: [
    "Heavy Peak Compression (Clamped Transients & Increased Sustain)",
    "Gated Reverb Tail",
    "Tape Echo & Delay",
    "Bitcrusher & Sample Rate Reduction"
  ],
  correct_index: 0,
  explanation: "<p><strong>Heavy Compression:</strong> Audio B clamps down on initial pick transients while bringing forward quiet sustaining details. This narrows dynamic range and significantly increases perceived density and sustain.</p>",
  expert_quote: {
    text: "Compression isn't just volume control; it's an envelope shaper. It glues the performance together and locks the instrument into the pocket.",
    author: "Chris Lord-Alge, Mix Engineer (Green Day, Muse)"
  },
  img: "/images/svg/serial_compression_sandwhich.svg"
};

t5p1.questions[2] = {
  title: "Practical Task: Compressor Internal Signal Routing",
  content: "Drag the internal modules of a feedback/feed-forward audio compressor into the correct processing order.",
  type: "drag_drop",
  items: [
    "Make-Up Gain Amplifier (Restores overall RMS level)",
    "Input Audio Buffer",
    "Voltage Controlled Amplifier (VCA - Attenuates signal)",
    "Detector / Sidechain Circuit (Measures RMS/Peak level against Threshold)"
  ],
  correct_order: [
    "Input Audio Buffer",
    "Detector / Sidechain Circuit (Measures RMS/Peak level against Threshold)",
    "Voltage Controlled Amplifier (VCA - Attenuates signal)",
    "Make-Up Gain Amplifier (Restores overall RMS level)"
  ],
  explanation: "<p><strong>Compressor Internal Routing:</strong> The audio enters the buffer and splits into the detector/sidechain path (which monitors signal level against the user-defined threshold and ratio). The detector generates a control voltage fed into the VCA to attenuate peak transients. Make-up gain then restores the reduced level to maximize loudness.</p>",
  expert_quote: {
    text: "Understanding the detector circuit is the key to mastering sidechain compression, vocal ducking, and de-essing.",
    author: "Rupert Neve, Audio Electronics Designer"
  },
  img: "/images/svg/dynamic_eq_threshold_action.svg"
};

// 9. Topic 6 Part 1: Vocal Presence Frequency Parameter Matching & Mix Mud Listening
// Replace Q6 in quiz-topic-6_p1
const t6p1 = stage2.items[10];
t6p1.questions[5] = {
  title: "Practical Task: Vocal Presence Frequency Slider",
  content: "Adjust the rotary frequency slider to dial in the standard vocal presence and articulation boost frequency in Hz.",
  type: "parameter_matching",
  label: "Vocal Presence Frequency",
  min: 500,
  max: 12000,
  step: 100,
  correct_value: 5000,
  tolerance: 1000,
  unit: "Hz",
  audio_before: "/Audio/FX_Ear_Training/EQ Mastery/Vocal Dull.wav",
  audio_after: "/Audio/FX_Ear_Training/EQ Mastery/Vocal with Presence.wav",
  explanation: "<p><strong>5000 Hz (5 kHz Presence Peak):</strong> A moderate bell boost centered between 4 kHz and 6 kHz enhances vocal consonant clarity, presence, and intimacy, cutting through dense rock and pop arrangements without sounding harsh or brittle.</p>",
  expert_quote: {
    text: "5 kHz is where the human ear is most sensitive to speech intelligibility. A gentle boost here brings the singer right into the room with you.",
    author: "Bruce Swedien, Recording Engineer"
  },
  img: "/images/svg/eq_bell_curve_q_comparison.svg"
};

// Replace Q8 in quiz-topic-6_p1 with Audio Comparison Mix Mud
t6p1.questions[7] = {
  title: "Practical Listening: Mix Mud & Clarity A/B Comparison",
  content: "Listen to Audio A and Audio B. Audio B has been professionally cleaned with EQ. Which problematic frequency band was attenuated to remove the 'mud'?",
  type: "audio_comparison",
  audio_a: "/Audio/FX_Ear_Training/EQ Mastery/Muddy Mix.mp3",
  audio_b: "/Audio/FX_Ear_Training/EQ Mastery/Clean Mix.mp3",
  options: [
    "Cut in the 250 Hz – 400 Hz Low-Mid 'Mud' Range",
    "Boost at 60 Hz Sub-Bass",
    "Cut at 10 kHz High Frequencies",
    "Boost at 1 kHz Middle Frequencies"
  ],
  correct_index: 0,
  explanation: "<p><strong>250 Hz – 400 Hz Low-Mid Mud:</strong> The 250 Hz to 400 Hz octave is where bass guitar, snare body, acoustic guitars, and lower vocal fundamentals accumulate, creating boxy, muffled 'mud'. Surgical attenuation in this band opens up headroom and mix separation.</p>",
  expert_quote: {
    text: "Before you boost treble to add clarity, always clean out 300 Hz. Great mixing is subtractive first.",
    author: "Bob Clearmountain, Mix Engineer"
  },
  img: "/images/svg/west_coast_vs_east_coast_eq_profile.svg"
};

// 10. Topic 7 Part 1: FX Ear Training (Delay & Reverb A/B Listening)
// Replace Q1 & Q3 in quiz-topic-7_p1
const t7p1 = stage2.items[12];
t7p1.questions[0] = {
  title: "Practical Listening: Delay FX Identification",
  content: "Listen to Audio A (Dry) and Audio B (Wet). Identify the time-based modulation/delay effect applied to the guitar in Audio B.",
  type: "audio_comparison",
  audio_a: "/Audio/FX_Ear_Training/Guitar/Dry Delay Guitar.mp3",
  audio_b: "/Audio/FX_Ear_Training/Guitar/Delay Guitar.mp3",
  options: [
    "Echo / Delay (Repeated discrete reflections with feedback)",
    "Flanging (Short delay with comb filtering)",
    "Phasing (All-pass filter notch sweep)",
    "Convolution Reverb (Dense diffuse room reflections)"
  ],
  correct_index: 0,
  explanation: "<p><strong>Echo / Delay:</strong> Delay stores audio in a temporary buffer and reproduces discrete, audible repetitions delayed in time by milliseconds (ms) or tempo divisions (e.g., 1/4 note). The feedback parameter governs repetition decay.</p>",
  expert_quote: {
    text: "Delay gives an instrument space and rhythm without washing it out like reverb does. It's the secret to deep, punchy mixes.",
    author: "Tony Maserati, Mix Engineer (Beyoncé, Jay-Z)"
  },
  img: "/images/svg/delay_feedback_loop.svg"
};

t7p1.questions[2] = {
  title: "Practical Listening: Reverb Decay Identification",
  content: "Listen to Audio A (Dry) and Audio B (Wet). What acoustic process has been added to create an illusion of physical space?",
  type: "audio_comparison",
  audio_a: "/Audio/FX_Ear_Training/Guitar/Dry Reverb Guitar.mp3",
  audio_b: "/Audio/FX_Ear_Training/Guitar/Reverb Guitar.mp3",
  options: [
    "Reverberation (Dense diffuse wash of acoustic reflections)",
    "Chorus (Pitch detuning and modulation)",
    "Tremolo (Amplitude modulation)",
    "Wah-Wah (Bandpass resonant sweep)"
  ],
  correct_index: 0,
  explanation: "<p><strong>Reverberation:</strong> Reverb simulates the acoustic reflections of a physical room, consisting of early reflections followed by a dense, decaying reverberant wash characterized by RT60 (reverberation time).</p>",
  expert_quote: {
    text: "Reverb is the acoustic architecture of your song. It tells the listener where the band is standing in physical space.",
    author: "Eddie Kramer, Engineer (Jimi Hendrix, Led Zeppelin)"
  },
  img: "/images/svg/reverb_diffusion_density.svg"
};

// 11. Topic 8 Part 1: Mastering Chain Signal Flow Drag & Drop
// Replace Q1 in quiz-topic-8_p1
const t8p1 = stage2.items[14];
t8p1.questions[0] = {
  title: "Practical Task: Professional Mastering Signal Chain",
  content: "Drag and drop the mastering processors into the industry-standard signal chain order from unmastered stereo mix to final delivery file.",
  type: "drag_drop",
  items: [
    "Dithering Processor (Applied during bit-depth reduction to 16-bit)",
    "True Peak Brickwall Limiter (Sets ceiling at -1.0 dBTP to prevent inter-sample clipping)",
    "Linear Phase Corrective EQ (High-pass sub-rumble cut at 25 Hz and notch resonances)",
    "Broad Tonal EQ (Gentle musical boosts for air and warmth)",
    "Multiband Compressor / Glue Compression (Dynamic consistency across frequency bands)"
  ],
  correct_order: [
    "Linear Phase Corrective EQ (High-pass sub-rumble cut at 25 Hz and notch resonances)",
    "Multiband Compressor / Glue Compression (Dynamic consistency across frequency bands)",
    "Broad Tonal EQ (Gentle musical boosts for air and warmth)",
    "True Peak Brickwall Limiter (Sets ceiling at -1.0 dBTP to prevent inter-sample clipping)",
    "Dithering Processor (Applied during bit-depth reduction to 16-bit)"
  ],
  explanation: "<p><strong>Mastering Chain Order:</strong> 1) Corrective EQ cleans sub-bass rumble and harsh notches before dynamics. 2) Multiband/Glue compression controls dynamic range. 3) Broad tonal EQ sweetens high and low ends. 4) True Peak Limiting catches transient peaks and establishes target LUFS loudness (-1.0 dBTP ceiling). 5) Dither is always the FINAL plugin in the chain when truncating bit depth (e.g. 24-bit to 16-bit) to eliminate quantisation distortion.</p>",
  expert_quote: {
    text: "In mastering, dither is always last. If you put any processor after dither, you defeat its mathematical purpose.",
    author: "Bob Katz, Mastering Engineer"
  },
  img: "/images/svg/dither_noise.svg"
};

// 12. Topic 9 Part 1: Acoustic Room Treatment Placement Drag & Drop
// Replace Q9 in quiz-topic-9_p1
const t9p1 = stage2.items[16];
t9p1.questions[8] = {
  title: "Practical Task: Studio Acoustic Treatment Plan",
  content: "Drag and drop the acoustic treatment panels into their optimal room positions to control modes, reflections, and flutter echo.",
  type: "drag_drop",
  items: [
    "Rear Wall Behind Mix Position -> Diffusion Panels (Scatters reflections without making room sound dead)",
    "Side Mirror Points & Ceiling Cloud -> Porous Absorption Panels (Eliminates first early reflections)",
    "Room Corners (Floor-to-Ceiling) -> Straddled Bass Traps (Tames low-frequency modal buildup)"
  ],
  correct_order: [
    "Room Corners (Floor-to-Ceiling) -> Straddled Bass Traps (Tames low-frequency modal buildup)",
    "Side Mirror Points & Ceiling Cloud -> Porous Absorption Panels (Eliminates first early reflections)",
    "Rear Wall Behind Mix Position -> Diffusion Panels (Scatters reflections without making room sound dead)"
  ],
  explanation: "<p><strong>Acoustic Treatment Placement:</strong> Low frequencies accumulate in trihedral corners where 3 room surfaces meet, requiring thick velocity/pressure bass traps. Early reflections bounce off side walls and ceiling directly to the engineer's ears, requiring porous absorption panels. The rear wall receives late reflections, which are diffused via QRD diffusors to retain acoustic life without flutter echo.</p>",
  expert_quote: {
    text: "You can't EQ a bad room. If your corners aren't bass trapped, you will always misjudge the low end of your mix.",
    author: "Philip Newell, Acoustic Consultant & Studio Designer"
  },
  img: "/images/svg/arrangement_sparse_acoustic_vs_dense_synth.svg"
};

// 13. Topic 10 Part 1: Studio Patchbay & Outboard Routing Drag & Drop
// Replace Q2 in quiz-topic-10_p1
const t10p1 = stage2.items[18];
t10p1.questions[1] = {
  title: "Practical Task: Studio Patchbay Insert Routing",
  content: "Trace an audio signal routed from a mixing console channel strip through an outboard hardware compressor via an analog patchbay.",
  type: "drag_drop",
  items: [
    "Console Channel Strip Preamp Stage",
    "Console Insert Send Jack (Top Patchbay Row)",
    "Patch Cable to Outboard Compressor Audio Input",
    "Hardware Compressor Processing (Threshold / Ratio Gain Reduction)",
    "Compressor Audio Output to Console Insert Return Jack (Bottom Patchbay Row)",
    "Console Channel Fader & Pan Pot to Mix Bus"
  ],
  correct_order: [
    "Console Channel Strip Preamp Stage",
    "Console Insert Send Jack (Top Patchbay Row)",
    "Patch Cable to Outboard Compressor Audio Input",
    "Hardware Compressor Processing (Threshold / Ratio Gain Reduction)",
    "Compressor Audio Output to Console Insert Return Jack (Bottom Patchbay Row)",
    "Console Channel Fader & Pan Pot to Mix Bus"
  ],
  explanation: "<p><strong>Patchbay Insert Routing:</strong> On standard studio patchbays, top jacks are outputs (Insert Send) and bottom jacks are inputs (Insert Return). The preamp signal leaves the console via the Insert Send, enters the outboard compressor, processes the dynamic envelope, returns into the console Insert Return immediately before the channel EQ and fader.</p>",
  expert_quote: {
    text: "Patchbays are the nervous system of the recording studio. Standardizing on top-output / bottom-input prevents catastrophic feedback loops.",
    author: "Dave Pensado, Grammy-Winning Mix Engineer (Pensado\'s Place)"
  },
  img: "/images/svg/insert_flow.svg"
};

// Save updated course data
fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2), 'utf8');
console.log('Successfully converted Stage 2 Multiple-Choice questions into rich practical tasks!');
