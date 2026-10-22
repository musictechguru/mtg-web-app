const fs = require('fs');
const path = require('path');

const courseDataPath = path.join(__dirname, '../src/data/course_data.json');
const courseData = JSON.parse(fs.readFileSync(courseDataPath, 'utf8'));

// =========================================================================
// COMPONENT 4 MINI-MODULES (ALL 10 TOPICS)
// =========================================================================

const c4Modules = [
  // -----------------------------------------------------------------------
  // Topic 1: Fundamentals & Recording
  // -----------------------------------------------------------------------
  {
    id: "c4_fundamentals",
    topic: "Fundamentals & Recording",
    lesson: {
      id: "c4_fundamentals_lesson",
      type: "lesson",
      title: "Module: Gain Staging, Phase Alignment & Audio Edits - Explanation",
      content: `<h1>Component 4 Practical Guide: Gain Staging & Phase Alignment</h1>
<p>In the Edexcel Component 4 exam, raw multi-track recordings often arrive with unbalanced gain levels, misaligned stereo mics, or DC offset clicks.</p>
<h2>1. Digital Gain Staging (The -18 dBFS Rule)</h2>
<p>Unlike analogue consoles which can be driven into pleasant saturation around 0 VU (+4 dBu), digital DAWs clip harshly at 0 dBFS. Track audio should sit around <strong>-18 dBFS RMS (average)</strong> with transient peaks never exceeding <strong>-6 dBFS</strong>. This preserves 18 dB of digital headroom for EQ boosts, compression makeup gain, and mix bus processing.</p>
<h2>2. Acoustic Phase Alignment</h2>
<p>When tracking an instrument with multiple microphones (e.g. Snare Top and Snare Bottom, or DI Bass and Miked Bass Cab), acoustic sound waves arrive at each capsule at slightly different times. This causes <strong>destructive interference (comb filtering)</strong>, canceling out low-frequency fundamentals. Engaging the 180° Polarity Invert (Phase Flip) switch or physically nudging the audio region by a few milliseconds aligns the waveforms and restores body.</p>
<h2>3. Zero-Crossing Points & Micro-Crossfades</h2>
<p>Cutting an audio waveform when its amplitude is non-zero causes a sudden voltage jump, producing an audible 'click' or 'pop'. Always enable <em>Snap to Zero-Crossing</em> and apply a <strong>5–10 ms equal-power crossfade</strong> across edits to ensure completely seamless transitions.</p>
<h3>Edexcel Practical Criteria (AO3 / AO4)</h3>
<p>Examiners penalize audio clicks at edit boundaries and thin, hollow drum tones caused by uncorrected phase cancellation. Always check drum phase in mono before balancing faders.</p>`
    },
    task: {
      id: "c4_fundamentals_task",
      type: "lesson",
      title: "Practical Task: Gain Staging & Phase Alignment",
      content: `<h2>Your DAW Mission</h2>
<p>Import the provided multi-track drum stems and execute essential pre-mix preparation.</p>
<p><strong>Task:</strong> Set clean gain staging, correct snare microphone phase cancellation, and perform transparent audio edits on the rhythm tracks.</p>
<ul>
  <li><strong>Step 1:</strong> Import the 8-track drum session. Use clip gain to adjust all tracks so average body hovers around -18 dBFS RMS with peak headroom at -6 dBFS.</li>
  <li><strong>Step 2:</strong> Solo the Snare Top and Snare Bottom tracks. Sum the master output to mono.</li>
  <li><strong>Step 3:</strong> Insert a Gain plugin on the Snare Bottom track and toggle the Phase Invert switch (Ø). Select the polarity setting that yields fuller low-mid punch (around 200 Hz).</li>
  <li><strong>Step 4:</strong> Zoom in to sample level on the Tom tracks. Slice out unplayed spill sections, ensuring cut points snap strictly to zero-voltage crossings.</li>
  <li><strong>Step 5:</strong> Apply a 5 ms equal-power crossfade to all edit boundaries to eliminate clicks.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> All tracks hover cleanly around -18 dBFS with no digital overs. Snare phase is aligned with robust low-end punch. Zero clicks or audible edits.</li>
  <li><strong>Level 2 (2 marks):</strong> Gain staging is mostly controlled. Polarity has been flipped but minor phase comb filtering remains. Edits are largely free of pops.</li>
  <li><strong>Level 1 (1 mark):</strong> Signal is clipped or buried in digital noise. Snare sounds thin and out of phase. Audible clicks on edit boundaries.</li>
</ul>`
    },
    quiz: {
      id: "c4_fundamentals_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: Fundamentals & Recording",
      description: "Test your mastery of digital gain staging, polarity phase cancellation, comb filtering, and sample-accurate zero-crossing editing.",
      questions: [
        {
          title: "Q1: Digital Gain Staging Target",
          content: "Why is -18 dBFS RMS considered the ideal nominal tracking and gain staging level in 24-bit digital DAWs?",
          type: "multi_choice",
          answers: [
            { text: "It allows headroom preventing inter-sample peak distortion.", is_true: "yes" },
            { text: "It forces the audio into natural vacuum tube saturation.", is_true: "no" },
            { text: "It matches the legal broadcast standard for FM radio stations.", is_true: "no" },
            { text: "It automatically corrects out-of-phase stereo microphone pairs.", is_true: "no" }
          ],
          expert_explanation: "In 24-bit digital audio, -18 dBFS corresponds roughly to 0 VU in analogue systems, leaving 18 dB of headroom so transients do not clip converters or downstream plugins.",
          explanation_image: {
            src: "/images/explanations/level_matching_ab.svg",
            alt: "Gain Staging Nominal Target vs Digital Full Scale"
          }
        },
        {
          title: "Q2: Snare Polarity Inversion",
          content: "Why does engaging the phase invert (180° polarity) switch on a snare bottom microphone restore low-frequency punch?",
          type: "multi_choice",
          answers: [
            { text: "Bottom mic diaphragm moves outward while top mic moves inward.", is_true: "yes" },
            { text: "Top mic generates odd harmonics that cancel bottom mic even ones.", is_true: "no" },
            { text: "It converts high-impedance mic signals into low-impedance lines.", is_true: "no" },
            { text: "It eliminates mechanical snare rattle using high-pass filters.", is_true: "no" }
          ],
          expert_explanation: "When a snare is struck, the top head moves downward (away from the top mic) while the bottom head moves downward (toward the bottom mic). Flipping polarity aligns the audio waveforms so they sum constructively.",
          explanation_image: {
            src: "/images/Phase Invert Logic .png",
            alt: "Phase Invert Polarity Switch"
          }
        },
        {
          title: "Q3: Comb Filtering Diagnosis",
          content: "What acoustic phenomenon occurs when two identical audio signals are summed with a 2 millisecond delay?",
          type: "multi_choice",
          answers: [
            { text: "Alternating constructive and destructive frequency cancellation.", is_true: "yes" },
            { text: "Severe low-frequency rumble that destroys amplifier speakers.", is_true: "no" },
            { text: "Complete elimination of all high frequencies above 5000 hertz.", is_true: "no" },
            { text: "Exponential expansion of dynamic range across the full spectrum.", is_true: "no" }
          ],
          expert_explanation: "A small time delay causes specific frequencies to be in-phase (boosted by +6 dB) and out-of-phase (completely canceled), creating a series of deep notches resembling a hair comb.",
          explanation_image: {
            src: "/images/explanations/waveform_compression_rarefaction.svg",
            alt: "Comb Filtering Phase Interference Waves"
          }
        },
        {
          title: "Q4: Zero-Crossing Point Slicing",
          content: "Why must audio slice edits be made precisely at zero-crossing points in a digital audio workstation?",
          type: "multi_choice",
          answers: [
            { text: "To prevent sudden DC voltage jumps that create audible clicks.", is_true: "yes" },
            { text: "To automatically quantise the audio slice to project tempo.", is_true: "no" },
            { text: "To ensure that sample rate conversion latency remains minimal.", is_true: "no" },
            { text: "To prevent high-order harmonic distortion inside mic preamps.", is_true: "no" }
          ],
          expert_explanation: "Cutting audio when the waveform is at non-zero voltage creates an instantaneous jump from value to zero on playback, which speakers reproduce as a high-frequency transient click.",
          explanation_image: {
            src: "/images/explanations/waveform_compression_rarefaction.svg",
            alt: "Zero-Crossing Waveform Intersection"
          }
        },
        {
          title: "Q5: Equal-Power vs Linear Crossfades",
          content: "Why are equal-power crossfades preferred over linear crossfades when joining two uncorrelated audio files?",
          type: "multi_choice",
          answers: [
            { text: "They maintain constant acoustic power without a 3 dB volume dip.", is_true: "yes" },
            { text: "They boost the high-frequency presence of both spliced regions.", is_true: "no" },
            { text: "They eliminate the requirement for sample rate synchronization.", is_true: "no" },
            { text: "They compress the dynamic range of transients across transitions.", is_true: "no" }
          ],
          expert_explanation: "Linear crossfades drop by 6 dB at the midpoint, causing a noticeable -3 dB perceived volume dip on uncorrelated musical signals. Equal-power crossfades curve to maintain constant energy.",
          explanation_image: {
            src: "/images/explanations/level_matching_ab.svg",
            alt: "Equal-Power vs Linear Crossfade Curves"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 2: Microphones & Vocal Production
  // -----------------------------------------------------------------------
  {
    id: "c4_microphones",
    topic: "Microphones & Vocal Production",
    lesson: {
      id: "c4_microphones_lesson",
      type: "lesson",
      title: "Module: Vocal Comping, De-Essing & Pitch Tuning - Explanation",
      content: `<h1>Component 4 Practical Guide: Vocal Production</h1>
<p>Modern vocal production requires assembling multiple takes into a seamless master performance, repairing acoustic flaws, and polishing pitch/sibilance.</p>
<h2>1. Vocal Comping & Crossfade Hygiene</h2>
<p>Comping involves auditioning take lanes and selecting the strongest phrases. Crossfades must be placed during natural breath pauses or consonant gaps—never in the middle of a sustained vowel, where subtle pitch or vibrato discrepancies will produce audible chorus wobbles.</p>
<h2>2. High-Pass Filtering & Plosive Taming</h2>
<p>Cardioid microphones exhibit the <strong>proximity effect</strong>, which boosts bass as the vocalist moves closer. Plosives ('p', 'b') create explosive air blasts below 80 Hz. Inserting an 18 dB/octave high-pass filter at <strong>80–100 Hz</strong> cleans up mud without compromising vocal warmth.</p>
<h2>3. Split-Band De-Essing Mechanics</h2>
<p>Wideband compressors push the entire vocal down when harsh sibilance hits. A <strong>split-band de-esser</strong> isolates only the sibilant frequency range (typically 5–8 kHz) and compresses only those offending frequencies when they exceed the threshold, leaving the vocal body unaffected.</p>
<h2>4. Transparent Pitch Correction</h2>
<p>Graphical pitch editors (Melodyne / Flex Pitch) allow independent control over <em>pitch center</em>, <em>pitch drift</em>, and <em>formants</em>. Tuning notes by hand while leaving natural vibrato untouched yields professional, commercial transparency without mechanical artifacts.</p>`
    },
    task: {
      id: "c4_microphones_task",
      type: "lesson",
      title: "Practical Task: Vocal Comping, De-Essing & Tuning",
      content: `<h2>Your DAW Mission</h2>
<p>Take raw vocal takes and produce a pristine, radio-ready lead vocal stem.</p>
<p><strong>Task:</strong> Comp 4 vocal take lanes, repair low-end plosives, tame harsh sibilance, and tune pitch discrepancies transparently.</p>
<ul>
  <li><strong>Step 1:</strong> Audition Vocal Takes 1 through 4. Select the best performance for Verse 1, Pre-Chorus, and Chorus.</li>
  <li><strong>Step 2:</strong> Flatten the comp into a single audio track. Inspect all splice points and add 10 ms crossfades during breath pauses.</li>
  <li><strong>Step 3:</strong> Insert a Channel EQ. Apply a 24 dB/octave high-pass filter set to 90 Hz to remove mic stand vibrations and plosive thuds.</li>
  <li><strong>Step 4:</strong> Insert a De-Esser. Set detection frequency between 6.2 kHz and 7.5 kHz. Adjust threshold to achieve 3–5 dB of gain reduction on 's' and 't' consonants.</li>
  <li><strong>Step 5:</strong> Enable Flex Pitch / Melodyne. Correct the out-of-tune notes in the chorus to within ±5 cents, preserving natural pitch drift.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Seamless vocal comp with inaudible edits. Plosives and sibilance fully controlled. Pitch correction sounds natural with zero robotic artifacts.</li>
  <li><strong>Level 2 (2 marks):</strong> Functional vocal comp with minor timing blips. De-esser works but occasionally overdamped (lisping). Pitch is mostly centered.</li>
  <li><strong>Level 1 (1 mark):</strong> Obvious edit clicks. Heavy sibilance or severe low-end rumble. Robotic or unnatural pitch correction artifacts.</li>
</ul>`
    },
    quiz: {
      id: "c4_microphones_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: Microphones & Vocal Production",
      description: "Test your knowledge of vocal comping techniques, plosive filtering, split-band de-essing, and formant-preserving pitch editing.",
      questions: [
        {
          title: "Q1: Vocal Comping Splice Placement",
          content: "Where should edit splices ideally be placed when assembling a multi-take vocal comp in a DAW?",
          type: "multi_choice",
          answers: [
            { text: "During natural silence, breath pauses, or unvoiced consonants.", is_true: "yes" },
            { text: "Directly in the center of the loudest sustained vowel notes.", is_true: "no" },
            { text: "Strictly on bar lines regardless of whether lyrics are singing.", is_true: "no" },
            { text: "At points where the vocalist hits maximum chest voice volume.", is_true: "no" }
          ],
          expert_explanation: "Placing crossfades during breath pauses or consonant gaps masks edits completely, whereas splicing sustained vowels reveals pitch and vibrato phase mismatches.",
          explanation_image: {
            src: "/images/svg/daw_vocal_comping_lanes.svg",
            alt: "DAW Multi-Take Vocal Comping Lanes"
          }
        },
        {
          title: "Q2: Vocal Plosive High-Pass Filter",
          content: "What filter type and frequency setting is most effective for removing vocal microphone plosive pops ('p' and 'b' sounds)?",
          type: "multi_choice",
          answers: [
            { text: "High-pass filter set between 80 Hz and 100 Hz with steep slope.", is_true: "yes" },
            { text: "Low-pass filter set to 5 kHz to attenuate harsh sibilance.", is_true: "no" },
            { text: "Narrow bandpass filter centered at 1 kHz to focus the midrange.", is_true: "no" },
            { text: "High-shelf filter boosting 12 kHz to add brightness and sheen.", is_true: "no" }
          ],
          expert_explanation: "Plosive energy created by wind blasts against the microphone capsule lives below 80 Hz. A steep high-pass filter removes this sub-bass thump without harming the vocal fundamental.",
          explanation_image: {
            src: "/images/dynamic_eq_threshold_diagram.svg",
            alt: "High-Pass Filter Frequency Response Curve"
          }
        },
        {
          title: "Q3: Split-Band vs Broadband De-Essing",
          content: "Why is a split-band de-esser preferred over a broadband compressor for controlling vocal sibilance?",
          type: "multi_choice",
          answers: [
            { text: "It compresses only sibilant highs without ducking vocal warmth.", is_true: "yes" },
            { text: "It increases overall loudness by boosting upper air frequencies.", is_true: "no" },
            { text: "It eliminates the need for pop shields during vocal recording.", is_true: "no" },
            { text: "It converts stereo vocal recordings into compatible mono stems.", is_true: "no" }
          ],
          expert_explanation: "Broadband de-essing attenuates the entire vocal whenever 's' sounds occur, causing distracting volume pumping. Split-band de-essing only ducks the narrow 5-8 kHz region.",
          explanation_image: {
            src: "/images/dynamic_eq_threshold_diagram.svg",
            alt: "Split-Band De-Essing Dynamic Attenuation"
          }
        },
        {
          title: "Q4: Formant Preservation in Pitch Tuning",
          content: "What is the consequence of failing to preserve vocal formants when pitch-shifting a vocal up by 4 semitones?",
          type: "multi_choice",
          answers: [
            { text: "The vocal takes on an unnatural, pinched 'chipmunk' timbre.", is_true: "yes" },
            { text: "The audio file develops severe digital clipping at 0 dBFS.", is_true: "no" },
            { text: "The background microphone bleed becomes completely out of phase.", is_true: "no" },
            { text: "The vocal tempo slows down proportionally to the pitch change.", is_true: "no" }
          ],
          expert_explanation: "Formants reflect the physical resonant dimensions of the human vocal tract. Shifting pitch without locking formants shrinks the perceived vocal tract, causing the chipmunk effect.",
          explanation_image: {
            src: "/images/Logic Pitch Shifter.png",
            alt: "Formant and Pitch Editing Interface"
          }
        },
        {
          title: "Q5: Pitch Drift vs Pitch Center",
          content: "In graphical pitch editing, what does the 'pitch drift' control govern?",
          type: "multi_choice",
          answers: [
            { text: "Slow pitch fluctuations and human vibrato within a sung note.", is_true: "yes" },
            { text: "Overall playback speed and time stretching of the audio file.", is_true: "no" },
            { text: "Dynamic threshold where noise gating begins to mute silence.", is_true: "no" },
            { text: "Stereo balance position between the left and right speakers.", is_true: "no" }
          ],
          expert_explanation: "Pitch center shifts the note to the chromatic grid; pitch drift controls how much the singer slides or wobbles within the note. Flattening drift completely creates an artificial autotuned sound.",
          explanation_image: {
            src: "/images/Logic Pitch Shifter.png",
            alt: "Pitch Drift vs Pitch Center Editing Curve"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 3: Synthesis Sound Design
  // -----------------------------------------------------------------------
  {
    id: "c4_synthesis",
    topic: "Synthesis Sound Design",
    lesson: {
      id: "c4_synthesis_lesson",
      type: "lesson",
      title: "Module: Subtractive Sound Design & Patch Matching - Explanation",
      content: `<h1>Component 4 Practical Guide: Synthesiser Programming</h1>
<p>Component 4 frequently tasks students with recreating a specific synthesiser sound (Bass, Lead, or Pad) to match a reference audio track.</p>
<h2>1. Oscillator Selection & Waveform Timbre</h2>
<ul>
  <li><strong>Sawtooth:</strong> Contains all harmonics (even and odd). Bright, buzzy; ideal for aggressive leads, brass, and rich pads.</li>
  <li><strong>Square / Pulse:</strong> Contains odd harmonics only. Hollow, woody, nasal; perfect for reedy leads and 80s basslines.</li>
  <li><strong>Triangle:</strong> Weak odd harmonics. Mellow, flute-like; great for smooth sub-leads.</li>
  <li><strong>Sine:</strong> Pure fundamental with no harmonics. Ideal for 808 subs and organ tones.</li>
</ul>
<h2>2. Filter Shaping (VCF) & Envelope Modulation</h2>
<p>The low-pass filter determines brightness. The <strong>Cutoff frequency</strong> sets where rolloff begins, while <strong>Resonance (Q)</strong> boosts frequencies right at the cutoff point. Routing Envelope 2 (Filter Envelope) to Cutoff creates dynamic movement: a fast Attack with short Decay (200–400 ms) creates a tight synth pluck.</p>
<h2>3. Keyboard Tracking (Key Follow)</h2>
<p>With Key Tracking at 100%, the filter opens wider as higher notes are played, maintaining consistent brightness across all octaves. At 0%, high notes will sound dull and muffled because the cutoff remains fixed.</p>
<h2>4. Detuning & Stereo Spread</h2>
<p>Running two oscillators slightly detuned (e.g. ±5 to 10 cents) creates subtle phase beating that thickens the sound. Engaging <em>Unison</em> stacks multiple voices with stereo panning for massive modern EDM supersaws.</p>`
    },
    task: {
      id: "c4_synthesis_task",
      type: "lesson",
      title: "Practical Task: Recreating a Reference Synth Patch",
      content: `<h2>Your DAW Mission</h2>
<p>Program a software synthesiser from an initialized patch to match a classic 1980s analog funk bassline reference.</p>
<p><strong>Task:</strong> Design a punchy, resonant subtractive synth bass using dual oscillators, filter envelope modulation, and key tracking.</p>
<ul>
  <li><strong>Step 1:</strong> Open an initialized subtractive synthesiser (e.g. Retro Synth, ES2, or Serum).</li>
  <li><strong>Step 2:</strong> Set Oscillator 1 to a Sawtooth wave at 8' pitch. Set Oscillator 2 to a Square wave at 16' pitch (one octave lower). Detune Osc 2 by +6 cents.</li>
  <li><strong>Step 3:</strong> Set the Low-Pass Filter to a 24 dB/octave slope. Set initial Cutoff to 350 Hz and Resonance to 40%.</li>
  <li><strong>Step 4:</strong> Route the Filter Envelope to Cutoff with +60% modulation intensity. Set Attack to 2 ms, Decay to 320 ms, Sustain to 15%, and Release to 80 ms.</li>
  <li><strong>Step 5:</strong> Set the Amp Envelope: Attack 0 ms, Decay 500 ms, Sustain 80%, Release 100 ms. Enable Monophonic mode with 20 ms Legato glide.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Exact timbral match to reference. Snappy filter pluck transient with rich low octave body. Monophonic glide behaves authentically.</li>
  <li><strong>Level 2 (2 marks):</strong> Waveforms match and filter sweeps, but envelope decay is slightly too long/short or resonance rings excessively.</li>
  <li><strong>Level 1 (1 mark):</strong> Incorrect waveform choice. Polyphonic overlap muddies bass. Filter envelope lacks transient punch.</li>
</ul>`
    },
    quiz: {
      id: "c4_synthesis_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: Synthesis Sound Design",
      description: "Test your understanding of subtractive synthesiser architectures, filter envelope modulation, keyboard tracking, and oscillator detuning.",
      questions: [
        {
          title: "Q1: Sub-Oscillator Function",
          content: "What is the primary sonic function of adding a sub-oscillator pitched one octave below the main oscillator?",
          type: "multi_choice",
          answers: [
            { text: "Reinforces fundamental low frequencies and solidifies bass punch.", is_true: "yes" },
            { text: "Introduces high-frequency stereo shimmer across the stereo field.", is_true: "no" },
            { text: "Eliminates the requirement for low-pass filter frequency shaping.", is_true: "no" },
            { text: "Converts monophonic patches into polyphonic chord synthesizers.", is_true: "no" }
          ],
          expert_explanation: "A sub-oscillator (usually sine or square) running at -12 semitones provides a rock-solid fundamental underneath bright, modulated upper oscillators.",
          explanation_image: {
            src: "/images/minimoog_model_d.png",
            alt: "Sub-Oscillator Routing in Analog Synthesizer"
          }
        },
        {
          title: "Q2: Filter Envelope Decay Shaping",
          content: "How does reducing the Decay time on a Filter Envelope from 1.5 seconds to 250 milliseconds alter a synth patch?",
          type: "multi_choice",
          answers: [
            { text: "Changes a slow sweeping pad sound into a punchy pluck transient.", is_true: "yes" },
            { text: "Increases the overall sustain volume of sustained keyboard chords.", is_true: "no" },
            { text: "Lowers the root pitch of the oscillator by approximately one octave.", is_true: "no" },
            { text: "Shifts the stereo imaging balance from center to wide hard panning.", is_true: "no" }
          ],
          expert_explanation: "Short decay times snap the filter cutoff back down quickly after the initial attack spike, producing the characteristic 'pluck' or 'blip' transient.",
          explanation_image: {
            src: "/images/svg/filter_envelope_modulation.svg",
            alt: "Filter Envelope Attack and Decay Modulation"
          }
        },
        {
          title: "Q3: Keyboard Filter Tracking",
          content: "What happens to high notes on a synthesiser when Keyboard Tracking (Key Follow) is set to 0%?",
          type: "multi_choice",
          answers: [
            { text: "Higher notes sound progressively muffled because cutoff is fixed.", is_true: "yes" },
            { text: "High notes distort violently because of excessive resonant boost.", is_true: "no" },
            { text: "All notes play at identical volume regardless of velocity force.", is_true: "no" },
            { text: "The pitch of the synthesiser becomes microtonally detuned.", is_true: "no" }
          ],
          expert_explanation: "With 0% key tracking, the filter cutoff frequency stays at the same absolute hertz value; high notes with fundamentals above that cutoff will have their harmonics stripped, sounding dark.",
          explanation_image: {
            src: "/images/subtractive_synth_flow_hq.png",
            alt: "Keyboard Tracking Cutoff Scaling"
          }
        },
        {
          title: "Q4: Pulse Width Modulation (PWM)",
          content: "What auditory effect is produced by modulating the pulse width of a square wave with a slow LFO?",
          type: "multi_choice",
          answers: [
            { text: "A rich, swirling chorusing timbre reminiscent of ensemble strings.", is_true: "yes" },
            { text: "Rapid rhythmic tremolo volume changes resembling a guitar tremolo.", is_true: "no" },
            { text: "Pitch modulation vibrato that drifts across adjacent semitones.", is_true: "no" },
            { text: "Severe bit-crushing distortion that adds digital white noise.", is_true: "no" }
          ],
          expert_explanation: "Continuously changing the duty cycle of a pulse wave alters the phase relationships of its odd harmonics, producing a lush, phasing chorus effect without external delay lines.",
          explanation_image: {
            src: "/images/minimoog_model_d.png",
            alt: "Pulse Width Modulation Waveform Symmetry"
          }
        },
        {
          title: "Q5: Supersaw Oscillator Detuning",
          content: "Why does detuning several stacked sawtooth oscillators by ±8 cents create stereo width and perceived warmth?",
          type: "multi_choice",
          answers: [
            { text: "Phase cancellation and acoustic beating generate motion and thickness.", is_true: "yes" },
            { text: "It compresses the dynamic range of transients across the frequency spectrum.", is_true: "no" },
            { text: "It shifts the resonant peak frequency down into the sub-bass register.", is_true: "no" },
            { text: "It automatically tunes notes to perfect historical just intonation.", is_true: "no" }
          ],
          expert_explanation: "Slight frequency differences cause waves to drift in and out of phase, creating acoustic beating. Panning the detuned voices left and right creates expansive stereo thickness.",
          explanation_image: {
            src: "/images/subtractive_synth_flow_hq.png",
            alt: "Unison Voice Detuning and Stereo Spread"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 4: Sampling & MIDI Sequencing
  // -----------------------------------------------------------------------
  {
    id: "c4_sampling",
    topic: "Sampling & MIDI Sequencing",
    lesson: {
      id: "c4_sampling_lesson",
      type: "lesson",
      title: "Module: Multi-Sampling, Loop Crossfades & Quantisation - Explanation",
      content: `<h1>Component 4 Practical Guide: Samplers & MIDI</h1>
<p>Modern samplers play back digital audio recordings mapped across a MIDI keyboard. Exam tasks require configuring key zones, looping sustained instruments, and editing MIDI groove.</p>
<h2>1. Key Zones & Root Key Pitch Shifting</h2>
<p>When an audio sample is pitched up or down on a keyboard, the sampler speeds up or slows down playback. Transposing more than 3–4 semitones causes noticeable speed changes and unnatural formant distortion (munchkinization). <strong>Multi-sampling</strong> solves this by recording samples every minor third (e.g. C, D#, F#, A) across each octave.</p>
<h2>2. Velocity Crossfade Layers</h2>
<p>Acoustic instruments do not just get louder when struck harder—their harmonic brightness increases. Professional sampler patches use multiple velocity layers (e.g. Soft 0–45, Medium 46–95, Hard 96–127) with subtle crossfading between layers so timbral transitions feel organic.</p>
<h2>3. Seamless Sustained Looping</h2>
<p>Strings and organ samples cannot sustain indefinitely from short recordings. Setting <strong>Sustain Loop Points</strong> tells the sampler to loop a portion of audio while the key is held down. Applying a <strong>100–300 ms crossfade loop</strong> smooths over the loop restart point, preventing clicks and rhythmic bumps.</p>
<h2>4. MIDI Groove Quantisation & Swing</h2>
<p>Rigid 100% 16th-note quantisation sounds robotic. Applying <strong>Swing (54%–62%)</strong> delays every second 16th note, imparting human groove (funk shuffle, hip-hop swing, UK garage bounce).</p>`
    },
    task: {
      id: "c4_sampling_task",
      type: "lesson",
      title: "Practical Task: Multi-Sampler Mapping & MIDI Groove",
      content: `<h2>Your DAW Mission</h2>
<p>Construct a custom software sampler instrument from raw acoustic cello recordings and sequence a dynamic rhythm phrase.</p>
<p><strong>Task:</strong> Map multi-samples across appropriate key zones, configure a click-free sustain loop, and quantise MIDI drum data with authentic swing.</p>
<ul>
  <li><strong>Step 1:</strong> Open an empty sampler (Sampler / EXS24 / Kontakt). Import 4 cello WAV files recorded at C2, G2, C3, and G3.</li>
  <li><strong>Step 2:</strong> Set each sample's Root Key accurately. Define key zones so each sample covers a span of no more than 6 semitones.</li>
  <li><strong>Step 3:</strong> Configure forward looping on the sustained tail. Set a 150 ms equal-power crossfade loop to eliminate loop clicks.</li>
  <li><strong>Step 4:</strong> Map velocity so velocities 1–80 trigger the mellow bowed take and 81–127 trigger the accented marcato take.</li>
  <li><strong>Step 5:</strong> In the Piano Roll, import the raw MIDI drum groove. Apply 16th-note swing quantisation at 58% intensity.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Flawless root key mapping with smooth velocity crossfades. Sustain loop is entirely inaudible. MIDI swing feels natural and tight.</li>
  <li><strong>Level 2 (2 marks):</strong> Correct root keys, but minor click at loop boundary or sudden jump in timbre between velocity layers.</li>
  <li><strong>Level 1 (1 mark):</strong> Incorrect root keys resulting in detuned playback. Severe loop bump. Rigid or misaligned MIDI quantisation.</li>
</ul>`
    },
    quiz: {
      id: "c4_sampling_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: Sampling & MIDI",
      description: "Test your understanding of root key mapping, multi-sampling velocity layers, loop crossfades, and MIDI swing quantisation.",
      questions: [
        {
          title: "Q1: Root Key Transposition Distortion",
          content: "What sonic artifact occurs when a single acoustic vocal sample is pitched up by more than an octave on a sampler keybed?",
          type: "multi_choice",
          answers: [
            { text: "Playback speeds up and formants shift into unnatural chipmunk timbre.", is_true: "yes" },
            { text: "The sample undergoes severe inter-sample true peak digital clipping.", is_true: "no" },
            { text: "The sampler automatically applies steep comb filter phase notches.", is_true: "no" },
            { text: "The audio file permanently loses all mid-frequency stereo information.", is_true: "no" }
          ],
          expert_explanation: "Standard pitch shifting changes playback speed: octave up doubles speed and shifts all formants, making natural instruments sound miniature and cartoonish.",
          explanation_image: {
            src: "/images/svg/sampler_multisample_map.svg",
            alt: "Root Key Mapping and Key Zone Layout"
          }
        },
        {
          title: "Q2: Velocity Layer Switching",
          content: "Why do professional sample libraries map multiple audio recordings across different MIDI velocity ranges for each note?",
          type: "multi_choice",
          answers: [
            { text: "Acoustic instruments change harmonic timbre when played with greater force.", is_true: "yes" },
            { text: "To prevent phase cancellation when playing polyphonic three-note chords.", is_true: "no" },
            { text: "To allow the computer hard drive to load audio files more efficiently.", is_true: "no" },
            { text: "To convert mono acoustic recordings into artificial binaural surround sound.", is_true: "no" }
          ],
          expert_explanation: "Striking a drum or piano harder produces more high-frequency harmonic overtones. Multi-velocity sampling reproduces real physical acoustic dynamics.",
          explanation_image: {
            src: "/images/Akai_MPC.png",
            alt: "Sampler Velocity Layer Architecture"
          }
        },
        {
          title: "Q3: Sustain Loop Crossfades",
          content: "What is the purpose of applying a crossfade at the boundary of a sustain loop in a software sampler?",
          type: "multi_choice",
          answers: [
            { text: "Blends end and start points smoothly to prevent clicks and volume bumps.", is_true: "yes" },
            { text: "Modulates filter resonance to introduce psychoacoustic stereo depth.", is_true: "no" },
            { text: "Automatically tunes the sample to international 440 Hz pitch standards.", is_true: "no" },
            { text: "Compresses dynamic range to maintain uniform loudness across octaves.", is_true: "no" }
          ],
          expert_explanation: "Without a crossfade, any slight mismatch in phase or amplitude between loop start and loop end generates a noticeable transient click each time the loop restarts.",
          explanation_image: {
            src: "/images/svg/sampler_multisample_map.svg",
            alt: "Sampler Loop Crossfade Point Curve"
          }
        },
        {
          title: "Q4: 16th-Note MIDI Swing",
          content: "How does applying a 16th-note swing quantisation of 58% alter MIDI note timing in a piano roll?",
          type: "multi_choice",
          answers: [
            { text: "Delays even-numbered 16th notes to produce a laid-back shuffle groove.", is_true: "yes" },
            { text: "Speeds up odd-numbered 16th notes by exactly one dotted-eighth value.", is_true: "no" },
            { text: "Deletes all ghost note velocity values below 30 on the MIDI velocity lane.", is_true: "no" },
            { text: "Locks all MIDI notes strictly to mechanical 100% mathematical grids.", is_true: "no" }
          ],
          expert_explanation: "Straight 16th notes divide a quarter note into equal 25% steps. 58% swing delays the 2nd and 4th sixteenths, creating the classic human shuffle pocket.",
          explanation_image: {
            src: "/images/MIDI Piano Roll Logic.png",
            alt: "MIDI Piano Roll 16th-Note Swing Quantise Grid"
          }
        },
        {
          title: "Q5: One-Shot vs Gate Trigger Modes",
          content: "In sample playback, how does 'Gate' (or 'Note-On/Off') mode differ from 'One-Shot' trigger mode?",
          type: "multi_choice",
          answers: [
            { text: "Gate stops audio on key release; One-Shot plays the entire file through.", is_true: "yes" },
            { text: "Gate plays samples backwards; One-Shot plays samples forwards.", is_true: "no" },
            { text: "Gate disables velocity sensitivity; One-Shot enables velocity tracking.", is_true: "no" },
            { text: "Gate routes audio to aux sends; One-Shot routes audio directly to master.", is_true: "no" }
          ],
          expert_explanation: "One-Shot triggers the full sample (standard for drums); Gate ties sample duration to the MIDI note length and envelope release (standard for keyboards, strings, vocals).",
          explanation_image: {
            src: "/images/Akai_MPC.png",
            alt: "One-Shot vs Gate Sampler Trigger Mode"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 5: Dynamic Processing (Sidechain & Compression) - EXPANDED TO 5 Qs
  // -----------------------------------------------------------------------
  {
    id: "c4_dynamics",
    topic: "Dynamic Processing",
    lesson: {
      id: "c4_sidechain_lesson",
      type: "lesson",
      title: "Module: Sidechain Compression - Explanation",
      content: `<h1>Understanding Sidechain Compression</h1>
<p>In standard compression, the compressor monitors the volume of the audio track it is placed on. In <strong>Sidechain Compression</strong>, the compressor reacts to the volume of a <em>different</em> track (the key input).</p>
<h2>Key Parameters</h2>
<ul>
  <li><strong>Threshold:</strong> The level the key input must reach to trigger gain reduction.</li>
  <li><strong>Ratio:</strong> How intensely the audio is reduced once triggered (e.g. 4:1 for subtle ducking, 10:1+ for heavy EDM pumping).</li>
  <li><strong>Attack:</strong> How quickly the compressor reacts to the key input (fast 1–5 ms to clamp immediately on kick hits).</li>
  <li><strong>Release:</strong> How quickly the audio returns to normal volume after the key input stops. Setting this in time with the song tempo creates musical pumping.</li>
</ul>
<h2>Advanced Techniques: Ghost Kicks & Sidechain Filters</h2>
<p>When the kick drum drops out in a breakdown, using an inaudible <strong>Ghost Kick</strong> (a muted track routed only to the sidechain key input) keeps the synth pumping. Inserting a <strong>Sidechain High-Pass Filter</strong> at 120 Hz on mix compressors prevents heavy bass from accidentally triggering the compressor on the entire mix.</p>
<h3>Edexcel Context (AO4)</h3>
<p>Edexcel frequently tests sidechain gating and compression. In EDM, it is heavily used to 'duck' a bass or synth track whenever the kick drum hits, preventing low-frequency masking and creating energetic rhythm.</p>`
    },
    task: {
      id: "c4_sidechain_task",
      type: "lesson",
      title: "Practical Task: Sidechain Compression",
      content: `<h2>Your DAW Mission</h2>
<p>Download the provided stems below and complete the following task inside your DAW.</p>
<p><strong>Task:</strong> Apply sidechain compression to the Synth Chords track, using the Kick Drum as the key input. The chords must duck rhythmically with the kick.</p>
<ul>
  <li><strong>Step 1:</strong> Import the Kick and Synth Chords stems into your DAW.</li>
  <li><strong>Step 2:</strong> Place a compressor on the Synth Chords track.</li>
  <li><strong>Step 3:</strong> Route the Kick Drum track to the sidechain (key) input of the compressor.</li>
  <li><strong>Step 4:</strong> Adjust the threshold, ratio, and release time until you achieve a clear, rhythmic pumping effect without unnatural clicks.</li>
  <li><strong>Step 5:</strong> Create an inaudible Ghost Kick track to maintain sidechain ducking during the breakdown.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Synth chords duck cleanly exactly when the kick hits. Release time is musical and matches the tempo. No audio glitches or click artifacts.</li>
  <li><strong>Level 2 (2 marks):</strong> Rhythm is altered, but release is slightly too fast (causing audible distortion/clicking) or too slow (choking the chords).</li>
  <li><strong>Level 1 (1 mark):</strong> Compressor is either not reacting to the sidechain key input, or the effect is inaudible.</li>
</ul>`
    },
    quiz: {
      id: "c4_sidechain_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: Dynamic Processing",
      description: "Test your mastery of sidechain routing, release time calculations, ghost kick triggers, and internal detector filtering.",
      questions: [
        {
          title: "Q1: Release Time Analysis",
          content: "When configuring a sidechain compressor to create a 'pumping' effect on a synth bass, what is the most likely result of setting the release time too fast?",
          type: "multi_choice",
          answers: [
            { text: "The bass will sound distorted and produce unnatural clicking artifacts.", is_true: "yes" },
            { text: "The compressor will stop reacting to the key input entirely.", is_true: "no" },
            { text: "The kick drum will become noticeably louder in the master mix.", is_true: "no" },
            { text: "The bass will remain permanently quiet and never return to volume.", is_true: "no" }
          ],
          expert_explanation: "AO4: If the release time is too fast, the compressor stops reducing gain before the low-frequency waveform of the bass has completed a cycle, causing waveform distortion and audible clicking.",
          explanation_image: {
            src: "/images/svg/sidechain_compression_ducking.svg",
            alt: "Fast Release Time Waveform Distortion"
          }
        },
        {
          title: "Q2: Key Input Routing",
          content: "In a DAW, where must the sidechain 'key input' be routed from to make a synth pad duck whenever the kick drum hits?",
          type: "multi_choice",
          answers: [
            { text: "The Kick Drum audio track or an auxiliary bus carrying the kick.", is_true: "yes" },
            { text: "The master stereo output bus after final mastering limiting.", is_true: "no" },
            { text: "The synth pad's own internal audio channel strip output.", is_true: "no" },
            { text: "An auxiliary headphone send carrying the lead vocal signal.", is_true: "no" }
          ],
          expert_explanation: "The compressor on the pad must listen to the kick drum's signal via its sidechain (key) input. When the kick transient strikes, the detector triggers gain reduction on the pad.",
          explanation_image: {
            src: "/images/svg/sidechain_flow.svg",
            alt: "Sidechain Key Input Signal Flow Routing"
          }
        },
        {
          title: "Q3: Threshold and Ratio Interaction",
          content: "How do Threshold and Ratio interact to determine the depth of sidechain ducking on a bass track?",
          type: "multi_choice",
          answers: [
            { text: "Threshold sets when ducking begins; ratio sets how deeply it ducks.", is_true: "yes" },
            { text: "Threshold controls stereo width; ratio sets high-frequency EQ boost.", is_true: "no" },
            { text: "Threshold sets delay time; ratio controls feedback repeats in ms.", is_true: "no" },
            { text: "Threshold governs phase inversion; ratio determines plugin latency.", is_true: "no" }
          ],
          expert_explanation: "Threshold sets the decibel level the kick must exceed to trigger compression. Ratio sets how aggressively the bass is attenuated once threshold is crossed.",
          explanation_image: {
            src: "/images/compressor_panel.png",
            alt: "Compressor Threshold and Ratio Controls"
          }
        },
        {
          title: "Q4: Ghost Kick Sidechain Triggering",
          content: "Why do producers employ a 'Ghost Kick' track to trigger sidechain ducking during ambient musical breakdowns?",
          type: "multi_choice",
          answers: [
            { text: "To maintain rhythmic pumping even when the audible kick is muted.", is_true: "yes" },
            { text: "To synthesize ultrasonic sub-bass frequencies on phone speakers.", is_true: "no" },
            { text: "To eliminate the requirement for audio interface buffer compensation.", is_true: "no" },
            { text: "To convert stereo background vocals into phase-coherent mono files.", is_true: "no" }
          ],
          expert_explanation: "A ghost kick is a muted audio track sent pre-fader to the sidechain input, allowing the chords/bass to pump in time even when no drums are heard.",
          explanation_image: {
            src: "/images/svg/sidechain_flow.svg",
            alt: "Ghost Kick Sidechain Routing Diagram"
          }
        },
        {
          title: "Q5: Sidechain Detector High-Pass Filter",
          content: "Why do mix bus compressors feature a 100 Hz high-pass filter in their internal sidechain detector circuit?",
          type: "multi_choice",
          answers: [
            { text: "Prevents low-end energy from dominating and over-compressing the mix.", is_true: "yes" },
            { text: "Removes all audible bass frequencies from the master stereo recording.", is_true: "no" },
            { text: "Boosts high-frequency cymbal sheen to create tape saturation warmth.", is_true: "no" },
            { text: "Inverts polarity to prevent phase cancellation between stereo speakers.", is_true: "no" }
          ],
          expert_explanation: "Low frequencies carry immense physical energy. A detector filter hides sub-bass from the compressor's trigger circuit, allowing the kick to punch without choking the whole track.",
          explanation_image: {
            src: "/images/compressor_panel.png",
            alt: "Internal Detector High-Pass Filter Curve"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 6: EQ & Stereo Spatial Shaping
  // -----------------------------------------------------------------------
  {
    id: "c4_eq_stereo",
    topic: "EQ & Stereo Spatial Shaping",
    lesson: {
      id: "c4_eq_stereo_lesson",
      type: "lesson",
      title: "Module: Subtractive EQ, Unmasking & Mid/Side Shaping - Explanation",
      content: `<h1>Component 4 Practical Guide: EQ & Stereo Imaging</h1>
<p>Equalisation in Component 4 is evaluated primarily on its ability to create clarity, resolve frequency masking, and maintain mono compatibility.</p>
<h2>1. Subtractive Carving vs Additive Boosting</h2>
<p>Boosting frequencies consumes headroom and can introduce phase smearing. <strong>Subtractive EQ</strong> carves away unwanted resonances (e.g. boxy 300–500 Hz on snares, nasal 800 Hz on vocals), allowing other instruments to shine naturally without increasing master levels.</p>
<h2>2. Unmasking the Kick Drum and Bass Clash</h2>
<p>The kick drum and bass guitar compete in the 60–120 Hz region. Use <strong>Complementary EQ</strong>:
<ul>
  <li>If the kick is given the sub-weight (boosting at 60 Hz), cut the bass at 60 Hz.</li>
  <li>Give the bass the punch fundamental (boosting at 100–120 Hz), and carve a notch in the kick at 100–120 Hz.</li>
</ul>
<h2>3. High-Pass Filtering Non-Bass Elements</h2>
<p>Electric guitars, keyboards, hi-hats, and vocals often contain subsonic rumble below 100 Hz that is inaudible on small monitors but wastes digital headroom. Applying high-pass filters at 80–120 Hz cleans up low-end mud across the mix.</p>
<h2>4. Mid/Side (M/S) Equalisation</h2>
<p>Mid/Side processing separates mono audio (Mid = Left + Right) from stereo difference (Side = Left - Right). High-passing the Side channel below 100 Hz ensures all sub-bass is mono, while a gentle high-shelf boost on the Side channel adds spacious stereo air.</p>`
    },
    task: {
      id: "c4_eq_stereo_task",
      type: "lesson",
      title: "Practical Task: Unmasking Kick & Bass + Mid/Side Stereo",
      content: `<h2>Your DAW Mission</h2>
<p>Clean up a muddy rhythm section and carve an expansive, phase-coherent stereo soundstage.</p>
<p><strong>Task:</strong> Apply complementary subtractive EQ to kick and bass, high-pass non-bass instruments, and shape master Mid/Side balance.</p>
<ul>
  <li><strong>Step 1:</strong> Insert a parametric EQ on the Kick Drum. Boost 60 Hz (+3 dB, Q=1.5) for weight, cut 300 Hz (-4 dB, Q=2.0) for boxiness, and boost 3.5 kHz (+2.5 dB) for beater click.</li>
  <li><strong>Step 2:</strong> Insert an EQ on the Bass Guitar. Carve a notch at 60 Hz (-4 dB, Q=2.5) to clear space for the kick. Boost at 110 Hz (+3 dB) for bass punch.</li>
  <li><strong>Step 3:</strong> High-pass all rhythm guitars, keyboards, and backing vocals at 110 Hz (18 dB/octave).</li>
  <li><strong>Step 4:</strong> Insert a Mid/Side EQ on the stereo master output.</li>
  <li><strong>Step 5:</strong> On the Side channel, apply a high-pass filter at 100 Hz to ensure the sub-bass is 100% mono. Apply a gentle high-shelf boost at 10 kHz (+1.5 dB) to widen room ambiance.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Kick and bass are cleanly separated with zero frequency masking. Mix is punchy, open, and fully mono-compatible.</li>
  <li><strong>Level 2 (2 marks):</strong> Frequencies are separated, but EQ cuts are slightly too narrow/deep (sounding hollow) or high-pass is too aggressive on guitars.</li>
  <li><strong>Level 1 (1 mark):</strong> Severe low-end clash. Low-mid mud dominates. Stereo Side channel contains out-of-phase sub-bass rumble.</li>
</ul>`
    },
    quiz: {
      id: "c4_eq_stereo_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: EQ & Stereo Spatial Shaping",
      description: "Test your understanding of complementary subtractive EQ, Q factor bandwidth, high-pass headroom recovery, and Mid/Side stereo processing.",
      questions: [
        {
          title: "Q1: Complementary EQ Carving",
          content: "What is the technical objective of 'complementary EQ' between a kick drum and a bass guitar?",
          type: "multi_choice",
          answers: [
            { text: "Cutting frequencies on one instrument where the other is boosted.", is_true: "yes" },
            { text: "Boosting identical frequencies on both tracks to maximize volume.", is_true: "no" },
            { text: "Inverting the stereo balance so that both tracks pan hard right.", is_true: "no" },
            { text: "Applying dynamic distortion to mask acoustic room reflections.", is_true: "no" }
          ],
          expert_explanation: "Carving complementary frequency pockets (e.g. boosting kick at 60 Hz while notching bass at 60 Hz) prevents low-end masking and lets both instruments punch clearly.",
          explanation_image: {
            src: "/images/Vintage Console EQ.png",
            alt: "Complementary EQ Frequency Carving Curves"
          }
        },
        {
          title: "Q2: Q Factor and Filter Bandwidth",
          content: "How does increasing the 'Q' value from 0.7 to 5.0 change the behavior of a parametric bell filter?",
          type: "multi_choice",
          answers: [
            { text: "Narrows the bandwidth for surgical notch removal of resonances.", is_true: "yes" },
            { text: "Widens the affected frequency range for gentle broad tone shaping.", is_true: "no" },
            { text: "Converts the bell filter into a steep 24 dB/octave high-pass filter.", is_true: "no" },
            { text: "Increases the overall output level of the track by five decibels.", is_true: "no" }
          ],
          expert_explanation: "Q is inversely proportional to bandwidth ($Q = f_0 / \Delta f$). A high Q creates a narrow, needle-like bell ideal for notching out ringing ring tones.",
          explanation_image: {
            src: "/images/eq_bell_q_factor.svg",
            alt: "Q Factor and Filter Bandwidth Diagram"
          }
        },
        {
          title: "Q3: High-Pass Headroom Recovery",
          content: "Why does high-pass filtering electric guitars at 100 Hz increase master mix headroom even if guitars have little bass?",
          type: "multi_choice",
          answers: [
            { text: "Removes subsonic DC energy that consumes digital converter power.", is_true: "yes" },
            { text: "Boosts high-frequency presence through analogue tube emulation.", is_true: "no" },
            { text: "Aligns guitar amp speaker phase with acoustic snare drum mics.", is_true: "no" },
            { text: "Converts high-impedance guitar signals into balanced line level.", is_true: "no" }
          ],
          expert_explanation: "Subsonic rumble and amplifier hum below 100 Hz consume amplifier power and compressor headroom without providing musical information.",
          explanation_image: {
            src: "/images/Vintage Console EQ.png",
            alt: "High-Pass Filter Headroom Recovery"
          }
        },
        {
          title: "Q4: Mid/Side Low-Frequency Mono Summing",
          content: "Why is the Side channel high-pass filtered below 100 Hz in modern commercial mixes?",
          type: "multi_choice",
          answers: [
            { text: "Prevents low-end phase cancellation on club subwoofers and vinyl.", is_true: "yes" },
            { text: "Increases the perceived stereo width of low-frequency kick drums.", is_true: "no" },
            { text: "Forces vocal reverbs to pan hard left and right across monitors.", is_true: "no" },
            { text: "Reduces overall file size when bouncing out 24-bit audio stems.", is_true: "no" }
          ],
          expert_explanation: "Human hearing cannot localize frequencies below ~100 Hz. Stereo sub-bass creates out-of-phase energy that cancels in mono and causes vinyl cutters to skip.",
          explanation_image: {
            src: "/images/mid_side_eq_diagram.svg",
            alt: "Mid/Side Stereo Processing and Mono Low-End Summing"
          }
        },
        {
          title: "Q5: Linear Phase vs Minimum Phase EQ",
          content: "Why is a Linear Phase EQ preferred over a Minimum Phase EQ when adjusting multi-miked drum kits?",
          type: "multi_choice",
          answers: [
            { text: "It prevents phase shift that causes comb filtering between mics.", is_true: "yes" },
            { text: "It operates with zero digital latency on live tracking inputs.", is_true: "no" },
            { text: "It introduces warm second-order vacuum tube harmonic excitement.", is_true: "no" },
            { text: "It automatically tunes drum head resonance to project song key.", is_true: "no" }
          ],
          expert_explanation: "Standard minimum phase equalizers shift phase around the cutoff frequency. On multi-miked drums sharing bleed, this alters phase alignment; linear phase EQ avoids phase shifts.",
          explanation_image: {
            src: "/images/Vintage Console EQ.png",
            alt: "Linear Phase vs Minimum Phase Response"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 7: FX & Processors
  // -----------------------------------------------------------------------
  {
    id: "c4_fx_processors",
    topic: "FX & Processors",
    lesson: {
      id: "c4_fx_processors_lesson",
      type: "lesson",
      title: "Module: Tempo Delays, Gated Reverbs & Aux Sends - Explanation",
      content: `<h1>Component 4 Practical Guide: Time-Based Effects & Routing</h1>
<p>Time-based effects (reverbs, delays, choruses) create depth, space, and movement in a mix. Routing hygiene is strictly assessed in Component 4.</p>
<h2>1. Insert vs Auxiliary Send Routing</h2>
<ul>
  <li><strong>Inserts:</strong> Process 100% of the audio on a channel strip (ideal for EQ, compression, gating, distortion).</li>
  <li><strong>Auxiliary Sends (Busses):</strong> Split a portion of signal to a shared FX channel with the effect set to <strong>100% Wet</strong>. Allows multiple tracks to share the same acoustic room and preserves dry transients.</li>
</ul>
<h2>2. Calculating Delay Time from Song BPM</h2>
<p>Tempo-synced delays reinforce musical groove. The millisecond delay time is calculated using:</p>
<p style="text-align:center; font-weight:bold; font-size:1.1rem; color:#38bdf8;">Delay Time (ms) = 60,000 / BPM</p>
<ul>
  <li>At 120 BPM: Quarter Note = 60,000 / 120 = <strong>500 ms</strong>.</li>
  <li>Eighth Note = 500 / 2 = <strong>250 ms</strong>.</li>
  <li>Dotted-Eighth Note = 250 &times; 1.5 = <strong>375 ms</strong>.</li>
</ul>
<h2>3. Automated Delay Throws</h2>
<p>Leaving delay sends open on an entire vocal muddies the mix. <strong>Automated throws</strong> automate the Aux Send fader up only on the final word of a vocal phrase, sending an echo tail into empty space between vocal lines.</p>
<h2>4. 1980s Gated Snare Reverb</h2>
<p>Pioneered by Phil Collins and Hugh Padgham on <em>In The Air Tonight</em>: a large, dense plate or non-linear digital reverb on the snare is fed into a <strong>Noise Gate</strong>. When the snare hits, the gate opens; after a set hold time (150–250 ms), the gate slams shut, creating a massive explosion that stops dead.</p>`
    },
    task: {
      id: "c4_fx_processors_task",
      type: "lesson",
      title: "Practical Task: Tempo Delay Throws & 80s Gated Reverb",
      content: `<h2>Your DAW Mission</h2>
<p>Set up professional auxiliary effects routing, program tempo-synced vocal throws, and build an 80s gated snare reverb.</p>
<p><strong>Task:</strong> Configure an Aux Send delay synced to dotted-eighth notes, automate a vocal throw, and gate a snare plate reverb.</p>
<ul>
  <li><strong>Step 1:</strong> Create an Auxiliary Track named "Vocal Throw Delay". Insert a Stereo Delay plugin set to 100% Wet, 0% Dry.</li>
  <li><strong>Step 2:</strong> Set delay time to dotted-eighth notes (3/16). Set feedback to 35% and insert a high-pass filter at 300 Hz and low-pass at 4 kHz (Abbey Road delay trick).</li>
  <li><strong>Step 3:</strong> On the Lead Vocal track, automate the Aux Send fader: keep it at -&infin; dB, then spike to 0 dB only on the final word of the chorus.</li>
  <li><strong>Step 4:</strong> Create an Aux Track named "Gated Snare Reverb". Insert a large plate or non-linear reverb (decay 3.5 seconds).</li>
  <li><strong>Step 5:</strong> Insert a Noise Gate directly after the reverb. Set threshold to trigger on snare hits, with Hold = 180 ms and Release = 30 ms so the reverb tail cuts off abruptly.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Flawless auxiliary routing with 100% wet plugins. Delay throw hits exactly on the designated word. Snare reverb gate slams shut cleanly without clicks.</li>
  <li><strong>Level 2 (2 marks):</strong> Effects route properly, but wet/dry balance is mixed on the aux or delay filter is unfiltered, muddying vocals.</li>
  <li><strong>Level 1 (1 mark):</strong> Reverb/delay inserted directly onto audio channels. Delay is out of time with song BPM. Noise gate fails to clamp.</li>
</ul>`
    },
    quiz: {
      id: "c4_fx_processors_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: FX & Processors",
      description: "Test your understanding of auxiliary send routing, BPM delay calculations, automated delay throws, and gated reverb dynamics.",
      questions: [
        {
          title: "Q1: Auxiliary Send Wet/Dry Ratio",
          content: "Why must a reverb or delay plugin placed on an Auxiliary Return bus always be configured with a 100% Wet mix?",
          type: "multi_choice",
          answers: [
            { text: "Because dry signal already travels directly from the audio channel.", is_true: "yes" },
            { text: "To prevent high-frequency tape hiss from bleeding into the master.", is_true: "no" },
            { text: "To convert stereo audio tracks into phase-aligned mono streams.", is_true: "no" },
            { text: "To reduce CPU processing loads on the digital audio workstation.", is_true: "no" }
          ],
          expert_explanation: "The channel fader already supplies the dry vocal. If the aux return also passes dry signal, it increases volume and causes comb filtering between the two paths.",
          explanation_image: {
            src: "/images/gated_snare_reverb_diagram.png",
            alt: "Auxiliary Send and Return Bus Routing"
          }
        },
        {
          title: "Q2: Delay Time BPM Calculation",
          content: "What is the exact quarter-note delay time in milliseconds for a song at 120 BPM?",
          type: "multi_choice",
          answers: [
            { text: "500 milliseconds (calculated as 60,000 divided by 120 BPM).", is_true: "yes" },
            { text: "250 milliseconds (calculated as 30,000 divided by 120 BPM).", is_true: "no" },
            { text: "750 milliseconds (calculated as 90,000 divided by 120 BPM).", is_true: "no" },
            { text: "1200 milliseconds (calculated as 10 times the song tempo value).", is_true: "no" }
          ],
          expert_explanation: "There are 60,000 milliseconds in one minute. 60,000 / 120 = 500 ms per beat (quarter note).",
          explanation_image: {
            src: "/images/svg/dotted_eighth_note_delay.svg",
            alt: "BPM to Milliseconds Calculation Chart"
          }
        },
        {
          title: "Q3: 1980s Gated Snare Mechanics",
          content: "How does a noise gate create the signature 1980s gated snare reverb effect?",
          type: "multi_choice",
          answers: [
            { text: "Clamps down after a set hold time, abruptly muting the reverb tail.", is_true: "yes" },
            { text: "Modulates pitch vibrato across the reverb tail to produce chorusing.", is_true: "no" },
            { text: "Filters low-frequency rumble below 80 Hz from the kick drum bleed.", is_true: "no" },
            { text: "Expands the dynamic range of initial cross-stick snare transients.", is_true: "no" }
          ],
          expert_explanation: "A noise gate inserted after a massive reverb tail opens on the transient, holds open for 150-250 ms, and then violently cuts off, creating the punchy 80s gated snare.",
          explanation_image: {
            src: "/images/gated_snare_reverb_diagram.png",
            alt: "Gated Reverb Noise Gate Envelope Action"
          }
        },
        {
          title: "Q4: Reverb Pre-Delay and Vocal Clarity",
          content: "Why does introducing a 30 to 50 millisecond pre-delay on a vocal reverb improve mix intelligibility?",
          type: "multi_choice",
          answers: [
            { text: "Separates dry consonants from reverb wash, preserving upfront presence.", is_true: "yes" },
            { text: "Synchronizes the reverb reflection decay time to the master tempo.", is_true: "no" },
            { text: "Eliminates all high-frequency sibilance from the microphone signal.", is_true: "no" },
            { text: "Inverts polarity to prevent phase cancellation between stereo speakers.", is_true: "no" }
          ],
          expert_explanation: "Pre-delay delays the onset of reverberation. This lets the initial vocal consonants hit dry and clean before the lush reverb bloom arrives.",
          explanation_image: {
            src: "/images/reverb_pre_delay.svg",
            alt: "Reverb Pre-Delay Time Separation Graph"
          }
        },
        {
          title: "Q5: Chorus Effect Time Modulation",
          content: "What time delay range is typically modulated by an LFO to produce an acoustic chorus effect?",
          type: "multi_choice",
          answers: [
            { text: "15 to 35 milliseconds with subtle periodic pitch modulation.", is_true: "yes" },
            { text: "0.1 to 3 milliseconds with deep feedback creating comb filtering.", is_true: "no" },
            { text: "100 to 150 milliseconds producing discrete single slapback repeats.", is_true: "no" },
            { text: "500 to 1000 milliseconds producing sweeping canyon echo reflections.", is_true: "no" }
          ],
          expert_explanation: "Flangers use 0.1-5 ms; choruses use 15-35 ms (where delays double the sound without distinct echoes); slapback uses 70-140 ms; echoes use >150 ms.",
          explanation_image: {
            src: "/images/gated_snare_reverb_diagram.png",
            alt: "Time-Based Modulation Delay Range Comparison"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 8: Mastering & Loudness
  // -----------------------------------------------------------------------
  {
    id: "c4_mastering",
    topic: "Mastering & Loudness",
    lesson: {
      id: "c4_mastering_lesson",
      type: "lesson",
      title: "Module: Mix Bus Glue, True Peak & Streaming Loudness - Explanation",
      content: `<h1>Component 4 Practical Guide: Mastering & Final Bounce</h1>
<p>The final task of Component 4 requires preparing a cohesive, broadcast-compliant stereo master mix with proper dynamic control and headroom.</p>
<h2>1. Mix Bus 'Glue' Compression</h2>
<p>Placing an analog-style VCA compressor (e.g. SSL G-Master Buss) on the master bus unifies disparate tracks into a cohesive record. Key settings:
<ul>
  <li><strong>Ratio:</strong> Gentle 2:1 or 4:1.</li>
  <li><strong>Attack:</strong> Slow (30 ms) to let drum transients pass through uncompressed.</li>
  <li><strong>Release:</strong> Auto or 100 ms to breathe rhythmically with the tempo.</li>
  <li><strong>Gain Reduction:</strong> 1.5 to 3 dB maximum. Over-compressing flattens punch.</li>
</ul>
<h2>2. True Peak Brickwall Limiting (-1.0 dBTP)</h2>
<p>Conventional sample-peak limiters measure discrete digital sample points. However, when audio is decoded by DACs or compressed into lossy streaming formats (MP3, AAC, Ogg Vorbis), reconstruction filters create <strong>inter-sample peaks (ISPs)</strong> that can exceed 0 dBFS. Setting a <strong>True Peak limiter ceiling to -1.0 dBTP</strong> guarantees zero clipping across streaming platforms.</p>
<h2>3. Loudness Normalization & Integrated LUFS</h2>
<p>Streaming services (Spotify, Apple Music, YouTube) measure <strong>Integrated LUFS (Loudness Units relative to Full Scale)</strong> across the full song and normalize playback to roughly <strong>-14 LUFS</strong>. Mastering louder than -14 LUFS (e.g. -8 LUFS) does not make the song louder on Spotify—it simply triggers the platform's automatic volume attenuation, reducing dynamic punch without adding volume.</p>
<h2>4. TPDF Dithering for 16-Bit Exports</h2>
<p>When bouncing a 24-bit DAW session down to 16-bit / 44.1 kHz CD audio, truncating the least significant bits introduces correlated quantisation distortion. Enabling <strong>TPDF (Triangular Probability Density Function) Dither</strong> adds low-level un-correlated noise that linearizes the converter, preserving subtle reverb tails.</p>`
    },
    task: {
      id: "c4_mastering_task",
      type: "lesson",
      title: "Practical Task: Master Bus Compression, Limiting & Export",
      content: `<h2>Your DAW Mission</h2>
<p>Apply master bus processing to a completed multi-track mix and export an official Edexcel-compliant stereo master.</p>
<p><strong>Task:</strong> Configure mix bus glue compression, tonal mastering EQ, True Peak brickwall limiting to -14 LUFS, and 16-bit dither.</p>
<ul>
  <li><strong>Step 1:</strong> Insert an SSL-style VCA compressor on the Master Output. Set Ratio 2:1, Attack 30 ms, Release Auto. Pull threshold for 2 dB of gain reduction.</li>
  <li><strong>Step 2:</strong> Insert a Linear Phase EQ. Apply a gentle Baxandall high-shelf boost (+1 dB at 12 kHz) for air, and a high-pass filter at 25 Hz to eliminate subsonic rumble.</li>
  <li><strong>Step 3:</strong> Insert a True Peak Brickwall Limiter as the final plugin. Set Output Ceiling to -1.0 dBTP.</li>
  <li><strong>Step 4:</strong> Insert a Loudness Meter. Play the loudest section of the track and adjust the limiter's gain to achieve -14 LUFS Integrated with short-term peaks staying below -11 LUFS.</li>
  <li><strong>Step 5:</strong> In the Export/Bounce dialog, configure output to WAV format, 44.1 kHz, 16-bit, and enable Triangular (TPDF) Dither.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Mix is punchy and cohesive. Master loudness hits -14 LUFS ±1 dB with zero inter-sample clipping (-1.0 dBTP ceiling). Dither cleanly applied.</li>
  <li><strong>Level 2 (2 marks):</strong> Limiter prevents clipping, but track is over-compressed (-9 LUFS, flattened transients) or limiter ceiling was left at 0.0 dBFS.</li>
  <li><strong>Level 1 (1 mark):</strong> Severe digital overs / clipping distortion. File exported at wrong sample rate (e.g. 48 kHz / 96 kHz) or without dither.</li>
</ul>`
    },
    quiz: {
      id: "c4_mastering_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: Mastering & Loudness",
      description: "Test your mastery of mix bus glue compression, True Peak limiting, streaming LUFS normalization, and digital dithering.",
      questions: [
        {
          title: "Q1: Mix Bus Glue Compression Settings",
          content: "Why is a slow attack time (e.g. 30 milliseconds) recommended for master mix bus glue compression?",
          type: "multi_choice",
          answers: [
            { text: "Lets kick and snare transients punch through before compression kicks in.", is_true: "yes" },
            { text: "Eliminates all low-frequency sub-bass information below 50 hertz.", is_true: "no" },
            { text: "Prevents the compressor from reacting to any vocals in the mix.", is_true: "no" },
            { text: "Forces the stereo master bus to output exclusively in dual mono.", is_true: "no" }
          ],
          expert_explanation: "Fast attack clamps down immediately on kick and snare hits, dulling their impact. A 30 ms attack allows the punch to pass through before clamping down on the body.",
          explanation_image: {
            src: "/images/SSL Bus compressor.png",
            alt: "SSL G-Master Bus Compressor Panel"
          }
        },
        {
          title: "Q2: True Peak Limiter Ceiling (-1.0 dBTP)",
          content: "Why do streaming guidelines recommend setting the master limiter ceiling to -1.0 dBTP rather than 0.0 dBFS?",
          type: "multi_choice",
          answers: [
            { text: "Leaves headroom preventing inter-sample clipping during MP3 encoding.", is_true: "yes" },
            { text: "Guarantees that audio file size remains under email attachment limits.", is_true: "no" },
            { text: "Automatically boosts low-frequency presence on mobile phone speakers.", is_true: "no" },
            { text: "Ensures compliance with legacy 1980s compact cassette tape machines.", is_true: "no" }
          ],
          expert_explanation: "Converting PCM audio to lossy formats (MP3/AAC) reconstructs analogue waveforms between sample points, which can surge by +0.5 to +1.0 dB and cause digital distortion.",
          explanation_image: {
            src: "/images/Logic Limiter.png",
            alt: "True Peak Limiter Ceiling and Gain Reduction"
          }
        },
        {
          title: "Q3: Integrated LUFS Metering",
          content: "What does an 'Integrated LUFS' loudness measurement represent?",
          type: "multi_choice",
          answers: [
            { text: "The average perceived human loudness measured across the entire song.", is_true: "yes" },
            { text: "The highest instantaneous digital peak sample recorded in a track.", is_true: "no" },
            { text: "The dynamic range ratio between the loudest vocal and quietest bass.", is_true: "no" },
            { text: "The phase correlation angle between left and right stereo speakers.", is_true: "no" }
          ],
          expert_explanation: "Integrated LUFS calculates average loudness over the full track duration using the K-weighting curve (which matches human ear sensitivity).",
          explanation_image: {
            src: "/images/svg/lufs_vs_peak_metering.svg",
            alt: "Integrated vs Short-Term LUFS Metering"
          }
        },
        {
          title: "Q4: TPDF Dithering Mechanics",
          content: "What is the purpose of applying TPDF dither when bouncing a 24-bit project to a 16-bit audio file?",
          type: "multi_choice",
          answers: [
            { text: "Substitutes correlated truncation distortion with benign low-level noise.", is_true: "yes" },
            { text: "Compresses dynamic range to increase perceived commercial loudness.", is_true: "no" },
            { text: "Expands stereo width by shifting phase across high air frequencies.", is_true: "no" },
            { text: "Prevents phase cancellation when multi-channel stems are summed.", is_true: "no" }
          ],
          expert_explanation: "Truncating 24-bit audio to 16-bit chops off low-level bits, causing harmonic distortion. Dither adds microscopic noise (at -90 dB) that linearizes quantisation errors.",
          explanation_image: {
            src: "/images/Logic Limiter.png",
            alt: "TPDF Dither Noise Floor and Bit Reduction"
          }
        },
        {
          title: "Q5: Streaming Loudness Penalty",
          content: "What happens on Spotify when a song mastered to -8 LUFS Integrated is played with Volume Normalization enabled?",
          type: "multi_choice",
          answers: [
            { text: "Spotify's algorithm turns the song down by approximately 6 dB.", is_true: "yes" },
            { text: "Spotify refuses to upload the track due to broadcast regulations.", is_true: "no" },
            { text: "The track plays 6 dB louder than competitors, dominating playlists.", is_true: "no" },
            { text: "Spotify applies dynamic expansion to restore transient peak punch.", is_true: "no" }
          ],
          expert_explanation: "Spotify normalizes audio to -14 LUFS. An aggressively squashed -8 LUFS master is turned down by 6 dB, leaving it thin and punchless compared to dynamic masters.",
          explanation_image: {
            src: "/images/svg/lufs_vs_peak_metering.svg",
            alt: "Streaming Normalization Loudness Penalty"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 9: Acoustics & Studio Environment
  // -----------------------------------------------------------------------
  {
    id: "c4_acoustics",
    topic: "Acoustics & Studio Environment",
    lesson: {
      id: "c4_acoustics_lesson",
      type: "lesson",
      title: "Module: Room Modes, Convolution Reverb & Isolation - Explanation",
      content: `<h1>Component 4 Practical Guide: Acoustics & Room Modes</h1>
<p>Understanding studio acoustics is critical both for Section B exam questions and for producing reliable mix decisions in a DAW.</p>
<h2>1. Standing Waves & Axial Room Modes</h2>
<p>When sound waves bounce between parallel walls, frequencies whose wavelength matches the room's dimensions create <strong>standing waves</strong>. These produce static pressure peaks (where the bass booms) and nulls (where the bass cancels out completely). The primary axial room mode is calculated with:</p>
<p style="text-align:center; font-weight:bold; font-size:1.1rem; color:#38bdf8;">f = c / (2L) &nbsp;&nbsp;(where c = speed of sound 343 m/s, L = room dimension in metres)</p>
<p>In a 5-metre room, f = 343 / (2 &times; 5) = <strong>34.3 Hz</strong>, with harmonics at 68.6 Hz, 102.9 Hz, and 137.2 Hz.</p>
<h2>2. Acoustic Treatment: Bass Traps vs Absorption</h2>
<ul>
  <li><strong>Porous Absorption (Fibre Panels):</strong> Absorbs high and mid frequencies (above 500 Hz). Ineffective against low bass.</li>
  <li><strong>Bass Traps:</strong> Installed in tri-hedral room corners (where three surfaces meet), where room mode pressure is at its maximum.</li>
  <li><strong>Diffusers (QRD / Skyline):</strong> Scatter reflected sound waves randomly across time and direction, preserving liveliness without flutter echo.</li>
</ul>
<h2>3. Convolution Reverb Impulse Responses (IRs)</h2>
<p>Unlike algorithmic reverbs that synthesize echoes using math delay loops, <strong>convolution reverb</strong> mathematically applies the acoustic footprint of a real physical space. A blank starter pistol, balloon pop, or sine sweep is recorded in a cathedral, hall, or cave. The resulting <strong>Impulse Response (IR) WAV file</strong> is convolved with DAW audio using Fourier transform mathematics.</p>`
    },
    task: {
      id: "c4_acoustics_task",
      type: "lesson",
      title: "Practical Task: Room Mode Diagnosis & Convolution Reverb",
      content: `<h2>Your DAW Mission</h2>
<p>Diagnose acoustic resonance issues in a control room recording and configure an authentic convolution reverb environment.</p>
<p><strong>Task:</strong> Calculate axial room modes, notch resonant acoustic room nodes, and sculpt a realistic impulse response in a convolution plugin.</p>
<ul>
  <li><strong>Step 1:</strong> Calculate the primary axial room mode for a tracking room measuring 4.0 metres in width (f = 343 / 8 = 42.9 Hz; 2nd harmonic = 85.8 Hz).</li>
  <li><strong>Step 2:</strong> In the DAW channel strip, insert a surgical parametric EQ on the room microphone track. Set a high-Q notch (Q=8.0) at 86 Hz (-6 dB) to tame room mode resonance.</li>
  <li><strong>Step 3:</strong> Insert a Convolution Reverb plugin (Space Designer / IR-1) on an auxiliary return.</li>
  <li><strong>Step 4:</strong> Load an impulse response of an acoustic recording chamber. Adjust the envelope decay time to 1.6 seconds.</li>
  <li><strong>Step 5:</strong> Apply high-frequency damping above 5 kHz to simulate natural air absorption over distance.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Room mode correctly identified and notched transparently. Convolution impulse response creates realistic, three-dimensional acoustic space.</li>
  <li><strong>Level 2 (2 marks):</strong> Notch EQ applied but Q is too wide (gutting musical bass notes) or convolution decay time clashes with song tempo.</li>
  <li><strong>Level 1 (1 mark):</strong> Incorrect room mode calculation. Room resonance rings loudly. Reverb wet/dry balance washes out mix.</li>
</ul>`
    },
    quiz: {
      id: "c4_acoustics_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: Acoustics & Studio Environment",
      description: "Test your understanding of standing wave room modes, corner bass traps, specular vs diffuse reflections, and convolution impulse responses.",
      questions: [
        {
          title: "Q1: Axial Room Mode Calculation",
          content: "What is the primary fundamental axial standing wave frequency between two parallel walls spaced 5.0 metres apart (speed of sound = 343 m/s)?",
          type: "multi_choice",
          answers: [
            { text: "34.3 Hz (calculated using the formula f = c divided by 2L).", is_true: "yes" },
            { text: "68.6 Hz (calculated by multiplying the room length by two).", is_true: "no" },
            { text: "120.0 Hz (standard international acoustic room resonance).", is_true: "no" },
            { text: "17.1 Hz (calculated using the quarter wavelength formula).", is_true: "no" }
          ],
          expert_explanation: "Axial room mode formula: $f = c / (2L) = 343 / (2 \times 5.0) = 34.3\text{ Hz}$. Harmonics occur at integer multiples ($68.6\text{ Hz}$, $102.9\text{ Hz}$).",
          explanation_image: {
            src: "/images/svg/acoustics_standing_wave_room_mode.svg",
            alt: "Axial Standing Wave Room Mode Graph"
          }
        },
        {
          title: "Q2: Corner Bass Trap Placement",
          content: "Why are bass traps most acoustically efficient when installed in the tri-hedral corners of a studio room?",
          type: "multi_choice",
          answers: [
            { text: "Low-frequency sound wave pressure builds up to its maximum in corners.", is_true: "yes" },
            { text: "High-frequency cymbals reflect exclusively off corner wall angles.", is_true: "no" },
            { text: "Corners have the lowest acoustic impedance of any room boundary.", is_true: "no" },
            { text: "It prevents electric guitar amplifiers from generating 50 Hz hum.", is_true: "no" }
          ],
          expert_explanation: "All three room dimensions (length, width, height) terminate in corners, making room corners zones of maximum acoustic bass pressure.",
          explanation_image: {
            src: "/images/Acoustic Reverb Room.jpg",
            alt: "Bass Trap Placement in Room Corners"
          }
        },
        {
          title: "Q3: Convolution Reverb Impulse Responses",
          content: "How is an Impulse Response (IR) captured to model a real physical concert hall inside a convolution reverb plugin?",
          type: "multi_choice",
          answers: [
            { text: "Recording the acoustic decay of a starter pistol or sine sweep in the hall.", is_true: "yes" },
            { text: "Synthesizing white noise bursts with variable digital feedback loops.", is_true: "no" },
            { text: "Measuring the electrical resistance of the building's wiring circuits.", is_true: "no" },
            { text: "Taking panoramic photographs of the hall's architectural ceiling geometry.", is_true: "no" }
          ],
          expert_explanation: "An impulse (balloon pop, starter pistol, or swept sine wave) excites all frequencies simultaneously. Microphones record how the room reflects those frequencies back over time.",
          explanation_image: {
            src: "/images/svg/reverb_convolution_impulse.svg",
            alt: "Convolution Reverb Impulse Response Waveform"
          }
        },
        {
          title: "Q4: Early Reflections vs Late Reverb Tail",
          content: "In acoustic perception, what spatial information do early reflections (arriving within the first 30 milliseconds) convey to a listener?",
          type: "multi_choice",
          answers: [
            { text: "The physical size of the room and the listener's distance from walls.", is_true: "yes" },
            { text: "The musical key signature and tonal pitch center of the performance.", is_true: "no" },
            { text: "The dynamic compression ratio applied across the master stereo bus.", is_true: "no" },
            { text: "The bit depth and sample rate resolution of the recording interface.", is_true: "no" }
          ],
          expert_explanation: "The human brain uses early discrete reflections to calculate the physical geometry and dimensions of a room. Late diffuse reflections provide the sensation of warmth and decay.",
          explanation_image: {
            src: "/images/Acoustic Reverb Room.jpg",
            alt: "Early Reflections vs Late Diffuse Tail"
          }
        },
        {
          title: "Q5: Console Desk Comb Filtering",
          content: "What acoustic problem is caused when sound from studio monitors bounces off a flat mixing console surface before reaching the engineer's ears?",
          type: "multi_choice",
          answers: [
            { text: "Comb filtering that causes unnatural peaks and dips in the lower midrange.", is_true: "yes" },
            { text: "High-voltage electrostatic discharge that damages speaker tweeters.", is_true: "no" },
            { text: "Complete loss of low-frequency sub-bass information below 40 hertz.", is_true: "no" },
            { text: "Automatic gain compression that attenuates loud transient peaks.", is_true: "no" }
          ],
          expert_explanation: "The direct monitor sound and the desk-reflected sound arrive at the ears a fraction of a millisecond apart, causing severe comb filtering in the critical 500 Hz to 2 kHz range.",
          explanation_image: {
            src: "/images/svg/acoustics_standing_wave_room_mode.svg",
            alt: "Mixing Desk Reflection Comb Filtering"
          }
        }
      ]
    }
  },

  // -----------------------------------------------------------------------
  // Topic 10: Equipment, Interfacing & Troubleshooting
  // -----------------------------------------------------------------------
  {
    id: "c4_equipment",
    topic: "Equipment & Signal Chains",
    lesson: {
      id: "c4_equipment_lesson",
      type: "lesson",
      title: "Module: Hardware Chains, DI Matching & Latency - Explanation",
      content: `<h1>Component 4 Practical Guide: Signal Chains & Hardware</h1>
<p>Diagnosing signal routing errors, impedance mismatches, and digital latency is a core competency tested in Component 4 practical examinations.</p>
<h2>1. Balanced (XLR / TRS) vs Unbalanced (TS) Cables</h2>
<p>Unbalanced guitar cables carry a signal wire and a ground shield. Over long runs (>5 metres), the cable acts as an antenna picking up electromagnetic interference (mains hum, radio signals). <strong>Balanced cables</strong> carry three conductors: Ground, Hot (+), and Cold (-). The cold signal is inverted 180°. At the destination preamp, a differential amplifier flips the cold wire back and sums them: interference picked up equally on both wires cancels out completely via <strong>Common-Mode Rejection</strong>.</p>
<h2>2. Signal Levels & Impedance (Hi-Z vs Line Level)</h2>
<ul>
  <li><strong>Mic Level (-60 to -40 dBV):</strong> Very low voltage; requires a microphone preamplifier (+40 to +60 dB gain).</li>
  <li><strong>Line Level (+4 dBu / -10 dBV):</strong> Standard professional studio level. Outboard compressors and EQs operate here.</li>
  <li><strong>Instrument Level (Hi-Z):</strong> High-impedance passive guitar pickups. Plugging a passive guitar directly into a low-impedance line input 'loads' the pickup, resulting in dull high end and muffled tone. A <strong>DI (Direct Injection) box</strong> matches impedance and balances the line.</li>
</ul>
<h2>3. Ground Loops & 50 Hz Mains Hum</h2>
<p>When two audio devices share different ground paths to earth, a small alternating current flows through the audio cable shields, creating an audible <strong>50 Hz (UK) or 60 Hz (US) mains hum</strong>. Engaging the <strong>Ground Lift switch</strong> on a DI box breaks the ground connection between chassis, eliminating the hum safely.</p>
<h2>4. DAW Buffer Size vs Monitoring Latency</h2>
<ul>
  <li><strong>Tracking (Recording):</strong> Set buffer low (64–128 samples) to minimize latency (<5 ms) so performers hear themselves in real time.</li>
  <li><strong>Mixing:</strong> Set buffer high (512–1024 samples) to give the CPU time to process complex plugins, reverbs, and lookahead limiters.</li>
</ul>`
    },
    task: {
      id: "c4_equipment_task",
      type: "lesson",
      title: "Practical Task: Signal Flow Troubleshooting & Latency Setup",
      content: `<h2>Your DAW Mission</h2>
<p>Troubleshoot a faulty hardware signal chain, eliminate mains ground hum, and configure optimal DAW buffer latency.</p>
<p><strong>Task:</strong> Resolve an impedance mismatch on DI guitar, eliminate 50 Hz mains hum, and configure latency compensation.</p>
<ul>
  <li><strong>Step 1:</strong> Inspect the Guitar DI audio track. Notice the dull high end caused by an impedance mismatch. Engage the Hi-Z / Instrument switch on Input 1 to match the 1 M&Omega; pickup impedance.</li>
  <li><strong>Step 2:</strong> Solo the Bass Amp microphone track. Identify the continuous 50 Hz buzz. Insert an EQ with a steep notch (Q=12.0) at 50 Hz (-18 dB) and its 2nd harmonic at 100 Hz.</li>
  <li><strong>Step 3:</strong> In DAW Audio Preferences, configure Buffer Size for vocal tracking: select 64 samples (monitoring roundtrip latency &le; 4.5 ms).</li>
  <li><strong>Step 4:</strong> Check DAW Plugin Delay Compensation (PDC): ensure it is set to "All" (compensating both audio tracks and aux return channels).</li>
  <li><strong>Step 5:</strong> Export all tracks as broadcast WAV stems with matched start points (Bar 1, Beat 1) for seamless external DAW transfer.</li>
</ul>
<h3>Marking Criteria (Levels-Based)</h3>
<ul>
  <li><strong>Level 3 (3 marks):</strong> Complete resolution of impedance tone-suck and 50 Hz hum. Latency buffer correctly configured. Stems perfectly aligned.</li>
  <li><strong>Level 2 (2 marks):</strong> Ground hum is attenuated but minor buzz remains, or buffer size was set to 512 samples (introducing noticeable tracking delay).</li>
  <li><strong>Level 1 (1 mark):</strong> Unresolved 50 Hz hum dominates audio. Guitar is muffled due to improper impedance. Exported stems have mismatched start times.</li>
</ul>`
    },
    quiz: {
      id: "c4_equipment_quiz",
      type: "lp_quiz",
      title: "C4 Knowledge Check: Equipment & Signal Chains",
      description: "Test your understanding of balanced lines, common-mode rejection, Hi-Z impedance matching, ground loops, and DAW buffer latency.",
      questions: [
        {
          title: "Q1: Balanced Line Common-Mode Rejection",
          content: "How does a balanced audio cable (XLR / TRS) eliminate electromagnetic noise interference over long distances?",
          type: "multi_choice",
          answers: [
            { text: "Cold wire polarity is inverted at preamp, canceling induced noise.", is_true: "yes" },
            { text: "Thick plastic shielding completely blocks all magnetic radiation.", is_true: "no" },
            { text: "Built-in passive capacitors roll off high frequencies above 10 kHz.", is_true: "no" },
            { text: "Ground wire carries high-voltage direct current to repel radio waves.", is_true: "no" }
          ],
          expert_explanation: "Balanced cables carry Hot (+) and Cold (-) wires. Noise is picked up equally on both in-phase. The input transformer or differential amplifier inverts Cold and sums them: signal doubles, noise cancels.",
          explanation_image: {
            src: "/images/mic_vs_line_level.svg",
            alt: "Balanced Audio Line Common-Mode Rejection"
          }
        },
        {
          title: "Q2: High-Z Instrument Impedance Mismatch",
          content: "What auditory problem occurs when a passive electric guitar is plugged directly into a standard low-impedance line input?",
          type: "multi_choice",
          answers: [
            { text: "High-frequency treble response is severely attenuated and muffled.", is_true: "yes" },
            { text: "The input preamp immediately clips into catastrophic square waves.", is_true: "no" },
            { text: "The guitar plays one octave lower than the intended acoustic pitch.", is_true: "no" },
            { text: "Audio interface AD converters introduce digital jitter clock errors.", is_true: "no" }
          ],
          expert_explanation: "Passive pickups have high output impedance (~10 k$\Omega$). Connecting to a low-impedance line input (~10 k$\Omega$) causes impedance bridging failure, acting as a low-pass filter ('tone suck'). A 1 M$\Omega$ Hi-Z input prevents this.",
          explanation_image: {
            src: "/images/Classic VCA Compressor ( DBX 160).png",
            alt: "Hi-Z Instrument Input vs Line Level Impedance"
          }
        },
        {
          title: "Q3: Ground Lift Switch Function",
          content: "How does engaging the Ground Lift switch on a direct injection (DI) box eliminate 50 Hz mains hum buzz?",
          type: "multi_choice",
          answers: [
            { text: "Breaks the physical ground loop connection between audio chassis.", is_true: "yes" },
            { text: "Applies a steep 50 Hz notch filter inside the DI box circuitry.", is_true: "no" },
            { text: "Converts 240 volt mains current into 48 volt phantom microphone power.", is_true: "no" },
            { text: "Inverts the acoustic phase of the electric guitar pickup coils.", is_true: "no" }
          ],
          expert_explanation: "A ground loop occurs when two pieces of gear have separate paths to ground. The Ground Lift switch disconnects Pin 1 (ground shield) on the balanced output, breaking the loop safely.",
          explanation_image: {
            src: "/images/mic_vs_line_level.svg",
            alt: "Ground Loop Interruption via Ground Lift Switch"
          }
        },
        {
          title: "Q4: Buffer Size vs Monitoring Latency",
          content: "Why is a low buffer size (e.g. 64 samples) selected during live tracking, while a high buffer size (1024 samples) is used for mixing?",
          type: "multi_choice",
          answers: [
            { text: "Low buffer minimizes latency for performers; high buffer frees CPU for FX.", is_true: "yes" },
            { text: "Low buffer improves audio bit depth; high buffer increases sample rate.", is_true: "no" },
            { text: "Low buffer prevents feedback loops; high buffer expands stereo width.", is_true: "no" },
            { text: "Low buffer routes audio to headphones; high buffer routes to monitors.", is_true: "no" }
          ],
          expert_explanation: "Buffer size sets how many samples the CPU processes before sending to audio outputs. 64 samples gives <4 ms latency (imperceptible to performers). 1024 samples prevents CPU overload when running heavy mixing plugins.",
          explanation_image: {
            src: "/images/Studio VCA Compressor (Focusrite Red 3).png",
            alt: "DAW Buffer Size and Latency Settings"
          }
        },
        {
          title: "Q5: Plugin Delay Compensation (PDC)",
          content: "What does Plugin Delay Compensation (PDC) do in a modern digital audio workstation mixer?",
          type: "multi_choice",
          answers: [
            { text: "Delays faster tracks to keep all tracks in phase with high-latency plugins.", is_true: "yes" },
            { text: "Speeds up computer processor clocks to eliminate calculation latency.", is_true: "no" },
            { text: "Compensates for the acoustic travel time of sound between speakers.", is_true: "no" },
            { text: "Automatically tunes all audio stems to matched pitch concert pitch.", is_true: "no" }
          ],
          expert_explanation: "Certain plugins (lookahead limiters, linear phase EQs, convolution reverbs) require buffer time to process audio. PDC delays all other tracks by the exact same amount so the entire mix stays phase-aligned.",
          explanation_image: {
            src: "/images/mic_vs_line_level.svg",
            alt: "Plugin Delay Compensation Track Timing Alignment"
          }
        }
      ]
    }
  }
];

// =========================================================================
// INJECT INTO COURSE_DATA.JSON SECTION 9
// =========================================================================

console.log("=== INJECTING COMPONENT 4 LEARNING MODULES INTO SECTION 9 ===");

const sec9 = courseData.sections[9];
sec9.title = "Stage 9: Component 4 Practical & Producing Modules";
console.log(`Section 9 (${sec9.title}) currently has ${sec9.items?.length || 0} items.`);

// Balance answer positions for all quizzes
c4Modules.forEach(mod => {
  mod.quiz.questions.forEach((q, idx) => {
    const targetPos = idx % 4; // 0, 1, 2, 3, 0
    const correctIdx = q.answers.findIndex(a => a.is_true === "yes");
    if (correctIdx !== targetPos && correctIdx !== -1) {
      const correctAns = q.answers.splice(correctIdx, 1)[0];
      q.answers.splice(targetPos, 0, correctAns);
    }
  });
});

// Construct flat array of 30 items
const allC4Items = [];
c4Modules.forEach(mod => {
  allC4Items.push(mod.lesson);
  allC4Items.push(mod.task);
  allC4Items.push(mod.quiz);
});

console.log(`Generated ${allC4Items.length} total Component 4 items across 10 modules.`);

// Replace section 9 items
sec9.items = allC4Items;

fs.writeFileSync(courseDataPath, JSON.stringify(courseData, null, 2), 'utf8');
console.log("Successfully updated course_data.json with all 30 Component 4 items!");
