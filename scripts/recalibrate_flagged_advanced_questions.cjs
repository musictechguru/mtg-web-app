const fs = require('fs');
const path = require('path');

const COURSE_PATH = path.join(__dirname, '../src/data/course_data.json');
const COMP4_PATH = path.join(__dirname, '../src/data/component4_template_exam.json');
const DICT_PATH = path.join(__dirname, '../src/data/dictionary_quizzes.json');

console.log('--- RECALIBRATING TO STRICT EDEXCEL A-LEVEL (9MT0) CEILING ---');

// 1. RECALIBRATE COURSE_DATA.JSON
const course = JSON.parse(fs.readFileSync(COURSE_PATH, 'utf8'));

// Target 1: quiz-topic-6_p2 Q7 (Parametric EQ Q/Bandwidth)
const q6_p2 = course.sections[1].items.find(i => i.id === 'quiz-topic-6_p2');
if (q6_p2 && q6_p2.questions[6]) {
  console.log('Recalibrating quiz-topic-6_p2 Q7...');
  q6_p2.questions[6] = {
    title: "Q17: Parametric EQ: Q and Bandwidth Control",
    type: "multi_choice",
    content: "When using a parametric equalizer to remove an unwanted resonant ringing frequency from an acoustic snare drum, how should the Q (bandwidth) control be set?",
    answers: [
      {
        text: "A narrow bandwidth (high Q value) to isolate and cut only the resonant frequency without affecting surrounding tones",
        is_true: "yes"
      },
      {
        text: "A wide bandwidth (low Q value) to boost the overall presence of the drum",
        is_true: "no"
      },
      {
        text: "Set to maximum low-pass filtering to eliminate all upper treble",
        is_true: "no"
      },
      {
        text: "Set to zero gain reduction to maintain full dynamic level",
        is_true: "no"
      }
    ],
    expert_explanation: "In parametric equalisation, the Q factor controls the filter's bandwidth. A high Q value creates a narrow bell curve, ideal for surgical subtractive EQ—isolating and notching out harsh or ringing resonance peaks without removing desirable musical body.",
    expert_quote: {
      text: "Cut narrow to remove problems; boost broad to add musical character.",
      author: "Bob Clearmountain, Mixing Engineer"
    },
    img: "/images/eq_q_factor_bandwidth_diagram.svg",
    explanation: "<img src=\"/images/eq_q_factor_bandwidth_diagram.svg\" alt=\"Parametric EQ Q Factor and Bandwidth Diagram\" style=\"width:100%; border-radius:8px; margin-bottom:10px;\" /><p><strong>Expert Explanation:</strong> In parametric equalisation, the Q factor controls the filter's bandwidth. A high Q value creates a narrow bell curve, ideal for surgical subtractive EQ—isolating and notching out harsh or ringing resonance peaks without removing desirable musical body.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"Cut narrow to remove problems; boost broad to add musical character.\"<br/><strong>- Bob Clearmountain, Mixing Engineer</strong></blockquote>"
  };
}

// Target 2: quiz-topic-21 Q10 (Mastering Processing Chain)
const q21 = course.sections[2].items.find(i => i.id === 'quiz-topic-21');
if (q21 && q21.questions[9]) {
  console.log('Recalibrating quiz-topic-21 Q10...');
  q21.questions[9] = {
    title: "Mastering Processing Chain",
    content: "Arrange the standard mastering processors in the conventional order for stereo finalization.",
    type: "drag_drop",
    items: [
      "Unmastered 24-bit Stereo Mixdown",
      "Corrective Subtractive EQ (High-Pass / Resonance Removal)",
      "Stereo Glue Bus Compressor (Gentle 1.5:1 - 2:1)",
      "Broad Tonal Parametric EQ (Air & Warmth)",
      "Stereo Width Processor / Multiband Imaging",
      "Master Brickwall Peak Limiter (Preventing 0 dBFS Clipping)",
      "Dither (to 16-bit for CD / Streaming)"
    ],
    correct_order: [
      "Unmastered 24-bit Stereo Mixdown",
      "Corrective Subtractive EQ (High-Pass / Resonance Removal)",
      "Stereo Glue Bus Compressor (Gentle 1.5:1 - 2:1)",
      "Broad Tonal Parametric EQ (Air & Warmth)",
      "Stereo Width Processor / Multiband Imaging",
      "Master Brickwall Peak Limiter (Preventing 0 dBFS Clipping)",
      "Dither (to 16-bit for CD / Streaming)"
    ],
    explanation: "<p><strong>Mastering Signal Architecture:</strong> Clean up inaudible subsonic rumble (<25 Hz) and harsh resonances first so subsequent processors do not react to unwanted sub frequencies. Apply subtle bus compression for coherence. Add musical colour and sheen with broad tonal parametric EQ, optimize stereo width, catch transient peaks with a master brickwall peak limiter, and apply dither on the final output stage when downsampling bit depth.</p>",
    expert_quote: {
      text: "Dither must always be the very last process in your digital mastering chain. Any processing after dither truncates the quantization noise shaping.",
      author: "Bob Katz, Mastering Engineer & Author of 'Mastering Audio'"
    }
  };
}

// Target 3: quiz-topic-42 Q11 (Digital Audio Headroom & 0 dBFS Ceiling)
const q42 = course.sections[2].items.find(i => i.id === 'quiz-topic-42');
if (q42 && q42.questions[10]) {
  console.log('Recalibrating quiz-topic-42 Q11...');
  q42.questions[10] = {
    title: "Digital Audio Headroom & 0 dBFS Peak Ceiling",
    content: "Why must audio signals never exceed 0 dBFS (decibels Full Scale) in a fixed-point digital audio workstation mix?",
    type: "multi_choice",
    question: "Why must audio signals never exceed 0 dBFS (decibels Full Scale) in a fixed-point digital audio workstation mix?",
    answers: [
      {
        text: "Exceeding 0 dBFS causes immediate digital clipping distortion because the maximum binary numerical value has been exceeded",
        is_true: "yes"
      },
      {
        text: "Exceeding 0 dBFS automatically shifts the playback pitch down by one octave",
        is_true: "no"
      },
      {
        text: "The audio signal is automatically converted from stereo into out-of-phase mono",
        is_true: "no"
      },
      {
        text: "High frequencies are filtered out by the anti-aliasing circuit",
        is_true: "no"
      }
    ],
    explanation: "<p><strong>Digital Headroom & 0 dBFS:</strong> In digital audio (measured in dBFS / decibels Full Scale), 0 dBFS represents the absolute maximum level a digital system can represent before running out of binary bits. Any signal attempting to exceed 0 dBFS is abruptly squared off (clipped), creating harsh, non-harmonic digital clipping distortion. Maintaining -3 to -6 dB of headroom during mixing prevents this distortion.</p>",
    expert_quote: {
      text: "In the digital domain, 0 dBFS is an absolute ceiling: push past it and you get harsh digital clipping.",
      author: "Sound On Sound Mixing Essentials"
    },
    img: "/images/mastering_headroom_crest_factor_diagram.svg"
  };
}

// Target 4: quiz-topic-43 Q9 (Low Recording Levels & SNR)
const q43 = course.sections[2].items.find(i => i.id === 'quiz-topic-43');
if (q43 && q43.questions[8]) {
  console.log('Recalibrating quiz-topic-43 Q9...');
  q43.questions[8] = {
    title: "Low Recording Levels & Signal-to-Noise Ratio (SNR)",
    content: "If an audio signal is recorded with an excessively low input level into an audio interface (e.g. peaking at -36 dBFS), what technical issue will occur when the track is gained up in the DAW mix?",
    type: "multi_choice",
    question: "If an audio signal is recorded with an excessively low input level into an audio interface (e.g. peaking at -36 dBFS), what technical issue will occur when the track is gained up in the DAW mix?",
    answers: [
      {
        text: "The system noise floor (preamp hiss and ambient noise) will be amplified along with the signal, degrading the signal-to-noise ratio",
        is_true: "yes"
      },
      {
        text: "The digital clock will drift out of synchronization causing jitter",
        is_true: "no"
      },
      {
        text: "The frequency response will permanently lose all midrange frequencies",
        is_true: "no"
      },
      {
        text: "The audio interface input will undergo analog tape saturation",
        is_true: "no"
      }
    ],
    explanation: "<p><strong>Signal-to-Noise Ratio (SNR):</strong> Proper gain staging requires recording signals at healthy levels (typically peaking between -18 dBFS and -12 dBFS). If a track is recorded too quietly, boosting its level in the mix also amplifies the microphone preamp noise floor and background hiss, resulting in a poor Signal-to-Noise Ratio.</p>",
    expert_quote: {
      text: "Record hot enough to stay comfortably above the noise floor, but low enough to guarantee safe headroom away from 0 dBFS clipping.",
      author: "Mike Senior, Sound On Sound"
    },
    img: "/images/mic_vs_line_level.svg"
  };
}

// Target 5: quiz-history-7 Q7 (Master Peak Limiting & Headroom)
const q_hist7 = course.sections[6].items.find(i => i.id === 'quiz-history-7');
if (q_hist7 && q_hist7.questions[6]) {
  console.log('Recalibrating quiz-history-7 Q7...');
  q_hist7.questions[6] = {
    title: "Q7: Master Peak Limiting & Headroom",
    content: "Why do audio engineers leave a small safety margin of headroom (e.g. -1 dBFS) on a master brickwall limiter rather than setting the ceiling to absolute 0 dBFS?",
    type: "multi_choice",
    answers: [
      {
        text: "To prevent digital clipping distortion and ensure headroom during lossy file encoding",
        is_true: "yes"
      },
      {
        text: "To guarantee playback loudness meets FM commercial radio regulations",
        is_true: "no"
      },
      {
        text: "To reduce master file sizes when uploading to cloud distribution servers",
        is_true: "no"
      },
      {
        text: "To ensure compatibility with legacy 8-track magnetic tape players",
        is_true: "no"
      }
    ],
    explanation: "<p><strong>Limiter Headroom Buffer:</strong> Setting a brickwall limiter ceiling slightly below 0 dBFS (such as -0.5 dBFS to -1 dBFS) provides a critical safety buffer of headroom. This prevents digital clipping distortion and ensures that subsequent file encoding (e.g. converting to MP3 or AAC) does not cause unexpected peaks to distort.</p>",
    expert_explanation: "Setting a brickwall limiter ceiling slightly below 0 dBFS (such as -0.5 dBFS to -1 dBFS) provides a critical safety buffer of headroom. This prevents digital clipping distortion and ensures that subsequent file encoding (e.g. converting to MP3 or AAC) does not cause unexpected peaks to distort.",
    expert_quote: {
      text: "Leaving a little headroom under 0 dBFS ensures your music translates cleanly to every digital platform without distortion.",
      author: "Ian Shepherd, Mastering Engineer"
    },
    explanation_image: {
      src: "/images/Logic Limiter.png",
      alt: "Master Brickwall Limiter Panel"
    }
  };
}

// Target 6: c4_eq_stereo_quiz Q5 (Subtractive vs Additive EQ)
const c4_eq = course.sections[9].items.find(i => i.id === 'c4_eq_stereo_quiz');
if (c4_eq && c4_eq.questions[4]) {
  console.log('Recalibrating c4_eq_stereo_quiz Q5...');
  c4_eq.questions[4] = {
    title: "Q5: Subtractive vs Additive EQ on an Acoustic Drum Kit",
    content: "When mixing an acoustic drum kit, why is subtractive equalisation (cutting problem frequencies) generally preferred over excessive additive EQ (boosting frequencies)?",
    type: "multi_choice",
    answers: [
      {
        text: "Cutting removes harsh boxy resonances or bleed without exhausting digital headroom or adding phase clutter",
        is_true: "yes"
      },
      {
        text: "Cutting increases the total dynamic range and doubles the recorded sample rate",
        is_true: "no"
      },
      {
        text: "Boosting is forbidden by digital audio workstation mix consoles",
        is_true: "no"
      },
      {
        text: "Subtractive EQ automatically converts multi-channel audio to true stereo",
        is_true: "no"
      }
    ],
    expert_explanation: "Subtractive equalisation carves away unwanted frequencies (such as boxy midrange at 400-500 Hz or cymbal bleed) to create space in the mix. Excessive boosting consumes valuable mix headroom and can emphasize room resonance or harshness.",
    explanation_image: {
      src: "/images/Vintage Console EQ.png",
      alt: "Subtractive Equalisation Frequency Response"
    }
  };
}

// Target 7: c4_mastering_quiz Q2 (Master Peak Limiter Ceiling)
const c4_mast = course.sections[9].items.find(i => i.id === 'c4_mastering_quiz');
if (c4_mast && c4_mast.questions[1]) {
  console.log('Recalibrating c4_mastering_quiz Q2...');
  c4_mast.questions[1] = {
    title: "Q2: Master Peak Limiter Ceiling",
    content: "Why do audio mastering guidelines recommend setting the brickwall limiter ceiling slightly below 0.0 dBFS (e.g. at -0.5 to -1.0 dBFS)?",
    type: "multi_choice",
    answers: [
      {
        text: "It leaves a safety margin of headroom to prevent digital clipping distortion during playback and file conversion",
        is_true: "yes"
      },
      {
        text: "It guarantees that audio file size remains under email attachment limits",
        is_true: "no"
      },
      {
        text: "It automatically boosts low-frequency presence on mobile phone speakers",
        is_true: "no"
      },
      {
        text: "It ensures compliance with legacy 1980s compact cassette tape machines",
        is_true: "no"
      }
    ],
    expert_explanation: "Setting the limiter ceiling just below maximum (0 dBFS) provides safe headroom. If audio hits exactly 0 dBFS, digital playback or file conversion can overshoot into audible digital clipping distortion.",
    explanation_image: {
      src: "/images/Logic Limiter.png",
      alt: "Peak Limiter Ceiling and Gain Reduction"
    }
  };
}

// Target 8: c4_equipment_quiz Q5 (DAW Plugin Latency Compensation)
const c4_equip = course.sections[9].items.find(i => i.id === 'c4_equipment_quiz');
if (c4_equip && c4_equip.questions[4]) {
  console.log('Recalibrating c4_equipment_quiz Q5...');
  c4_equip.questions[4] = {
    title: "Q5: DAW Plugin Latency Compensation",
    content: "What does automatic plugin delay compensation (PDC) do in a modern digital audio workstation mixer?",
    type: "multi_choice",
    answers: [
      {
        text: "It time-aligns all tracks by delaying faster channels to match the latency introduced by heavy plugins (e.g. convolution reverb)",
        is_true: "yes"
      },
      {
        text: "It increases computer processor speed to eliminate CPU processing time",
        is_true: "no"
      },
      {
        text: "It compensates for the physical distance between studio monitor speakers",
        is_true: "no"
      },
      {
        text: "It automatically corrects pitch drifting on vocal tracks",
        is_true: "no"
      }
    ],
    expert_explanation: "Plugins that perform heavy processing (such as convolution reverbs or lookahead limiters) introduce a few milliseconds of latency. Automatic plugin delay compensation delays all other tracks by the exact same amount so the entire project remains perfectly time-aligned and phase coherent.",
    explanation_image: {
      src: "/images/mic_vs_line_level.svg",
      alt: "Plugin Delay Compensation Track Timing Alignment"
    }
  };
}

// Simplify quiz-topic-4_p2 Q3 (time stretching explanation)
const q4_p2 = course.sections[1].items.find(i => i.id === 'quiz-topic-4_p2');
if (q4_p2 && q4_p2.questions[2]) {
  console.log('Simplifying quiz-topic-4_p2 Q3 explanation...');
  const qObj = q4_p2.questions[2];
  qObj.expert_explanation = "Time-stretching algorithms alter duration without changing pitch by slicing audio into tiny grains or analyzing frequency bands. To slow a sample down, these grains must be repeated, stretched, and crossfaded. When overlapping grains contain identical frequencies slightly misaligned in time, destructive phase interference occurs, producing audible comb filtering, hollow smearing, or a swishy texture.";
  qObj.explanation = `<img src="${qObj.img}" alt="${qObj.title}" style="width:100%; border-radius:8px; margin-bottom:10px;" /><p><strong>Expert Explanation:</strong> ${qObj.expert_explanation}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"Time stretching decouples tempo from pitch, but extreme stretching pushes phase alignment to its limits, smearing transient crispness."<br/><strong>- Audio Production Fundamentals</strong></blockquote>`;
}

// Write updated course_data.json
fs.writeFileSync(COURSE_PATH, JSON.stringify(course, null, 2), 'utf8');
console.log('Successfully updated course_data.json');


// 2. RECALIBRATE COMPONENT4_TEMPLATE_EXAM.JSON
const comp4 = JSON.parse(fs.readFileSync(COMP4_PATH, 'utf8'));
const qMaster = comp4.sections[1].questions.find(q => q.id === 'q6');
if (qMaster && qMaster.parts[1]) {
  console.log('Recalibrating Component 4 template exam Question 6 Part b...');
  qMaster.parts[1] = {
    id: "b",
    type: "multiple_choice",
    marks: 1,
    question: "To prevent digital clipping distortion on the master bus, what maximum ceiling setting is commonly applied to a peak limiter?",
    options: [
      "-1 dBFS",
      "+3 dBFS",
      "+6 dBFS",
      "-18 dBFS"
    ],
    answer: "-1 dBFS",
    rationale: "Setting the limiter ceiling to -1 dBFS provides an essential safety margin of headroom, preventing digital clipping distortion on peak transients."
  };
  fs.writeFileSync(COMP4_PATH, JSON.stringify(comp4, null, 2), 'utf8');
  console.log('Successfully updated component4_template_exam.json');
}


// 3. RECALIBRATE DICTIONARY_QUIZZES.JSON
const dict = JSON.parse(fs.readFileSync(DICT_PATH, 'utf8'));

// A. vol6 Q (BANDWIDTH) & GAIN intermediate explanations
const vol6 = dict.volumes.find(v => v.id === 'vol6');
if (vol6) {
  const qTopic = vol6.parts[0].topics.find(t => t.title.includes('Q (BANDWIDTH)'));
  if (qTopic && qTopic.levels && qTopic.levels.intermediate) {
    console.log('Updating vol6 Q BANDWIDTH intermediate explanations...');
    const customExplanations = [
      "A Q of 1.0 represents a moderate bandwidth roughly one to two octaves wide. At 1 kHz, this spans approximately 700 Hz to 1.4 kHz.",
      "EQ boosts affect both frequency balance and phase relationships around the center frequency. Excessive boosting can alter transient crispness and stereo imaging.",
      "Surgical notch filtering uses a high Q value (narrow bandwidth) to cut narrow resonance rings or hums without hollowing out the instrument's core tone.",
      "A wide Q (low value like 0.5) creates smooth, musical tonal shaping across octaves, whereas a narrow boost (high Q) sounds like an unnatural resonance peak.",
      "As Q value increases, the filter's bandwidth becomes narrower; as Q decreases, the filter's bandwidth becomes wider.",
      "Equaliser boosts directly add gain to the audio signal. A +10 dB boost increases signal amplitude significantly and will easily clip if headroom is insufficient.",
      "Narrow, aggressive EQ boosts create steeper filter slopes, which result in greater phase shift around the center frequency.",
      "With a Q of 2.0 (narrow bandwidth), cutting at 400 Hz drops off quickly, leaving an octave up (800 Hz) largely unaffected.",
      "Musical, broad tonal shaping typically employs a moderate Q between 0.7 and 1.5, blending smoothly across related harmonics.",
      "Boosting adjacent frequencies (1 kHz, 2 kHz, and 4 kHz) with wide bandwidths compounds into a broad, general presence lift across the entire midrange."
    ];
    qTopic.levels.intermediate.forEach((q, idx) => {
      q.expert_explanation = customExplanations[idx] || "Parametric EQ allows precise control over frequency, gain, and Q factor (bandwidth).";
    });
  }
}

// B. vol8 MASTERING EQ intermediate explanations & Q2
const vol8 = dict.volumes.find(v => v.id === 'vol8');
if (vol8) {
  const mTopic = vol8.parts[0].topics.find(t => t.title.includes('MASTERING EQ'));
  if (mTopic && mTopic.levels && mTopic.levels.intermediate) {
    console.log('Updating vol8 MASTERING EQ intermediate questions and explanations...');
    // Update Q2 to A-Level concept
    mTopic.levels.intermediate[1] = {
      title: "Question 2",
      content: "When applying tonal equalisation in mastering, why are broad, gentle curves (low Q) preferred over steep narrow boosts?",
      type: "multi_choice",
      answers: [
        {
          text: "Broad curves sound transparent and natural across the complete mix without creating artificial resonances",
          is_true: "yes"
        },
        {
          text: "Steep narrow boosts are technically forbidden in stereo DAWs",
          is_true: "no"
        },
        {
          text: "Broad curves reduce master file sizes",
          is_true: "no"
        },
        {
          text: "Mastering equalisers cannot support high Q values",
          is_true: "no"
        }
      ],
      explanation: "",
      expert_explanation: "In mastering, equalisation affects all instruments simultaneously. Broad, gentle curves (Q of 0.5 to 1.0) provide musical balance without altering individual instrument timbres unnaturally.",
      explanation_image: "/images/Vintage Console EQ.png",
      expert_quote: {
        text: "In mastering, subtle broad strokes are musical; narrow boosts sound like an effect.",
        author: "Bob Ludwig, Mastering Engineer"
      },
      id: "v8_t20_i_2",
      img: "/images/Vintage Console EQ.png"
    };

    const masteringEqExplanations = [
      "A Q of 1.0 at 300 Hz spans roughly an octave (150 Hz to 600 Hz), gently attenuating lower midrange mud.",
      "Broad, gentle EQ curves sound natural across a full mix, avoiding unnatural resonance bumps.",
      "Gentle subtractive cutting (-1 to -2 dB) with moderate Q targets harshness around 2.5 kHz without dulling vocal clarity.",
      "A low Q value (0.8) creates a broad curve that cleans up boxiness and mud from ~180 Hz to 500 Hz.",
      "High-frequency sheen or 'air' is traditionally achieved using a gentle high-shelf boost starting between 10 kHz and 12 kHz.",
      "Mastering EQ requires subtlety (typically 0.5 dB to 2 dB). A +4 dB boost is too drastic and can cause harshness or ear fatigue.",
      "A 12 dB/octave high-pass filter set at 25 Hz will attenuate frequencies by 12 dB at one octave below (12.5 Hz), removing subsonic rumble.",
      "High Q values (4 to 8) in mastering are reserved for surgical notch cuts to eliminate specific annoying ringing room resonances.",
      "If cutting at 3 kHz makes the mix sound noticeably dull, the bandwidth (Q) was likely set too wide, cutting desirable vocal presence.",
      "After surgical cleanup, tonal EQ focuses on broad musical enhancement—sweetening the overall frequency balance of the track."
    ];
    mTopic.levels.intermediate.forEach((q, idx) => {
      q.expert_explanation = masteringEqExplanations[idx] || "Mastering EQ involves subtle, musical adjustments to balance the overall frequency spectrum.";
    });
  }
}

// C. vol3 ADDITIVE SYNTHESIS intermediate Q1
const vol3 = dict.volumes.find(v => v.id === 'vol3');
if (vol3) {
  const addTopic = vol3.parts[0].topics.find(t => t.title.includes('ADDITIVE'));
  if (addTopic && addTopic.levels && addTopic.levels.intermediate && addTopic.levels.intermediate[0]) {
    console.log('Updating vol3 ADDITIVE SYNTHESIS Q1...');
    addTopic.levels.intermediate[0].content = "Why is additive synthesis theoretically capable of recreating any periodic timbre?";
    addTopic.levels.intermediate[0].answers = [
      {
        text: "Any complex periodic sound can be constructed by combining individual sine waves at specific harmonic frequencies and amplitudes",
        is_true: "yes"
      },
      {
        text: "It uses magnetic tape loops that store pre-recorded acoustic instruments",
        is_true: "no"
      },
      {
        text: "It automatically applies dynamic sidechain compression",
        is_true: "no"
      },
      {
        text: "It operates exclusively at a 192 kHz sample rate",
        is_true: "no"
      }
    ];
    addTopic.levels.intermediate[0].expert_explanation = "Additive synthesis builds complex timbres from the ground up by summing pure sine wave harmonics, each with its own frequency and amplitude envelope.";
  }
}

// D. vol4 TIME-STRETCHING basic Q9
const vol4 = dict.volumes.find(v => v.id === 'vol4');
if (vol4) {
  const tsTopic = vol4.parts[0].topics.find(t => t.title.includes('TIME-STRETCHING'));
  if (tsTopic && tsTopic.levels && tsTopic.levels.basic && tsTopic.levels.basic[8]) {
    console.log('Updating vol4 TIME-STRETCHING Q9...');
    tsTopic.levels.basic[8].expert_explanation = "Modern time-stretching algorithms use advanced granular and spectral processing to preserve transient punch and pitch stability during tempo changes.";
  }
}

// E. vol5 LIMITING TECHNIQUES intermediate Q1
const vol5 = dict.volumes.find(v => v.id === 'vol5');
if (vol5) {
  const limTopic = vol5.parts[0].topics.find(t => t.title.includes('LIMITING'));
  if (limTopic && limTopic.levels && limTopic.levels.intermediate && limTopic.levels.intermediate[0]) {
    console.log('Clarifying vol5 LIMITING TECHNIQUES intermediate Q1 options...');
    limTopic.levels.intermediate[0].answers = [
      {
        text: "Sample peak measures discrete digital sample values, while true peak detects inter-sample waveform overshoots",
        is_true: "yes"
      },
      {
        text: "They are completely identical measurements in every way",
        is_true: "no"
      },
      {
        text: "Sample peak is measured in analog volts, true peak in binary bits",
        is_true: "no"
      },
      {
        text: "True peak only measures low-frequency sub-bass content",
        is_true: "no"
      }
    ];
  }
}

// Write updated dictionary_quizzes.json
fs.writeFileSync(DICT_PATH, JSON.stringify(dict, null, 2), 'utf8');
console.log('Successfully updated dictionary_quizzes.json');
console.log('--- RECALIBRATION COMPLETE ---');
