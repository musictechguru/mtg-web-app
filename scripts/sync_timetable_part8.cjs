const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'TimetableBuilder', 'timetableData.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Mapping of enhanced in-app activities per block
const BLOCK_ACTIVITIES = {
  "block-1": [
    { id: "quiz-topic-1_p1", title: "Topic 1 Quiz: Fundamentals & Recording (Part 1)", type: "quiz", actionText: "Launch Topic 1" },
    { id: "interactive-practical-1", title: "Practical Quiz 1: Polar Patterns & Microphone Placement", type: "quiz", actionText: "Launch Practical 1" },
    { id: "interactive-practical-23", title: "Practical Quiz 23: Studio Maths & Audio Calculations", type: "quiz", actionText: "Launch Studio Maths" },
    { id: "case-study-4", title: "Case Study 4: Elvis Presley - Heartbreak Hotel & Slapback Echo", type: "quiz", actionText: "Launch Case Study" },
    { id: "history-0", title: "Historical Tech: The 1950s - Rock 'n' Roll & Valve Era", type: "quiz", actionText: "Launch 1950s Tech" },
    { id: "tracksheet", title: "Tracksheet Creator: 1950s Studio Locker Setup", type: "tracksheet", actionText: "Open Tracksheet Creator" },
    { id: "fingerprints", title: "Sonic Fingerprints: 1950s Era Production Hallmarks", type: "fingerprints", actionText: "Explore Fingerprints" }
  ],
  "block-2": [
    { id: "quiz-topic-1_p2", title: "Topic 1 Quiz: Fundamentals & Recording (Part 2)", type: "quiz", actionText: "Launch Topic 1 Part 2" },
    { id: "quiz-topic-7_p1", title: "Topic 7 Quiz: FX, Processors & Modulation (Part 1)", type: "quiz", actionText: "Launch Topic 7" },
    { id: "interactive-practical-2", title: "Practical Quiz 2: Studio Signal Flow Challenge", type: "quiz", actionText: "Launch Signal Flow" },
    { id: "interactive-practical-21", title: "Practical Quiz 21: Stereo Panning & Soundstage Evolution", type: "quiz", actionText: "Launch Panning Quiz" },
    { id: "comp_1", title: "Comparison Quiz 1: The Beatles (Strawberry Fields vs Penny Lane)", type: "quiz", actionText: "Launch Comparison 1" },
    { id: "case-study-1", title: "Case Study 1: The Beatles - A Day in the Life & 4-Track Bouncing", type: "quiz", actionText: "Launch Case Study" },
    { id: "history-1", title: "Historical Tech: The 1960s - Multitrack Revolution & Abbey Road", type: "quiz", actionText: "Launch 1960s Tech" },
    { id: "fingerprints", title: "Sonic Fingerprints: 1960s British Invasion & Motown", type: "fingerprints", actionText: "Explore Fingerprints" }
  ],
  "block-3": [
    { id: "quiz-topic-4_p1", title: "Topic 4 Quiz: Sampling & Audio Manipulation (Part 1)", type: "quiz", actionText: "Launch Topic 4" },
    { id: "interactive-practical-4", title: "Practical Quiz 4: Sampler Parameters & Key Mapping", type: "quiz", actionText: "Launch Practical 4" },
    { id: "interactive-practical-20", title: "Practical Quiz 20: Sample Editing, Truncation & Chopping", type: "quiz", actionText: "Launch Sample Chopping" },
    { id: "comp_3", title: "Comparison Quiz 3: Pink Floyd (Dark Side vs Wish You Were Here)", type: "quiz", actionText: "Launch Comparison 3" },
    { id: "case-study-2", title: "Case Study 2: Pink Floyd - Money & 16-Track Tape Loops", type: "quiz", actionText: "Launch Case Study" },
    { id: "history-2", title: "Historical Tech: The 1970s - 24-Track Large Format & Analogue Warmth", type: "quiz", actionText: "Launch 1970s Tech" },
    { id: "tracksheet", title: "Tracksheet Creator: 1970s 24-Track Tape Session", type: "tracksheet", actionText: "Open Tracksheet Creator" },
    { id: "fingerprints", title: "Sonic Fingerprints: 1970s Classic Rock & Disco", type: "fingerprints", actionText: "Explore Fingerprints" }
  ],
  "block-4": [
    { id: "quiz-topic-3_p1", title: "Topic 3 Quiz: Synthesis & Sound Design (Part 1)", type: "quiz", actionText: "Launch Topic 3" },
    { id: "interactive-practical-3", title: "Practical Quiz 3: Subtractive Synthesis Flow", type: "quiz", actionText: "Launch Synthesis Flow" },
    { id: "interactive-practical-17", title: "Practical Quiz 17: Filter Frequency & Resonance Sweeps", type: "quiz", actionText: "Launch Filter Lab" },
    { id: "comp_4", title: "Comparison Quiz 4: 1980s Synth-Pop (Sweet Dreams vs Shout)", type: "quiz", actionText: "Launch Comparison 4" },
    { id: "case-study-3", title: "Case Study 3: Michael Jackson / Quincy Jones - Thriller", type: "quiz", actionText: "Launch Case Study" },
    { id: "history-3", title: "Historical Tech: The 1980s - Digital Revolution, FM & MIDI", type: "quiz", actionText: "Launch 1980s Tech" },
    { id: "c3_synthpop", title: "Component 3 Mock Exam: Synth-Pop (75 Marks)", type: "exam_c3", actionText: "Launch C3 Mock Exam" },
    { id: "fingerprints", title: "Sonic Fingerprints: 1980s New Wave & Synth-Pop", type: "fingerprints", actionText: "Explore Fingerprints" }
  ],
  "block-5": [
    { id: "quiz-topic-4_p2", title: "Topic 4 Quiz: Sampling & Audio Manipulation (Part 2)", type: "quiz", actionText: "Launch Topic 4 Part 2" },
    { id: "interactive-practical-9", title: "Practical Quiz 9: Time-Stretching & Pitch Shifting", type: "quiz", actionText: "Launch Practical 9" },
    { id: "interactive-practical-10", title: "Practical Quiz 10: Digital Audio Resolution (Bit Depth & Sample Rate)", type: "quiz", actionText: "Launch Practical 10" },
    { id: "comp_5", title: "Comparison Quiz 5: 1990s Electronica (Teardrop vs Breathe)", type: "quiz", actionText: "Launch Comparison 5" },
    { id: "history-4", title: "Historical Tech: The 1990s - DAW Transition & Breakbeat Culture", type: "quiz", actionText: "Launch 1990s Tech" },
    { id: "c4_template", title: "Component 4 Mock Exam: Rock Production (105 Marks)", type: "exam_c4", actionText: "Launch C4 Mock Exam" },
    { id: "fingerprints", title: "Sonic Fingerprints: 1990s Grunge, Trip-Hop & Big Beat", type: "fingerprints", actionText: "Explore Fingerprints" }
  ],
  "block-6": [
    { id: "quiz-topic-5_p1", title: "Topic 5 Quiz: Dynamic Processing (Part 1)", type: "quiz", actionText: "Launch Topic 5" },
    { id: "quiz-topic-6_p1", title: "Topic 6 Quiz: EQ & Frequency Spectrum (Part 1)", type: "quiz", actionText: "Launch Topic 6" },
    { id: "interactive-practical-5", title: "Practical Quiz 5: Dynamic Processor Matching & Curves", type: "quiz", actionText: "Launch Practical 5" },
    { id: "interactive-practical-6", title: "Practical Quiz 6: EQ Filter Identification & Parametric Bands", type: "quiz", actionText: "Launch Practical 6" },
    { id: "comp_6", title: "Comparison Quiz 6: 2000s Post-Rock & Alt (Kid A vs Clocks)", type: "quiz", actionText: "Launch Comparison 6" },
    { id: "history-5", title: "Historical Tech: The 2000s - In-the-Box Mixing & Loudness Wars", type: "quiz", actionText: "Launch 2000s Tech" },
    { id: "tracksheet", title: "Tracksheet Creator: 2000s Hybrid Digital/Analogue Console", type: "tracksheet", actionText: "Open Tracksheet Creator" }
  ],
  "block-7": [
    { id: "quiz-topic-7_p1", title: "Topic 7 Quiz: FX, Processors & Modulation (Part 1)", type: "quiz", actionText: "Launch Topic 7" },
    { id: "interactive-practical-7", title: "Practical Quiz 7: Delay Time Calculations & BPM Sync", type: "quiz", actionText: "Launch Practical 7" },
    { id: "interactive-practical-8", title: "Practical Quiz 8: Reverb Parameters, Pre-Delay & Space", type: "quiz", actionText: "Launch Practical 8" },
    { id: "case-study-9", title: "Case Study 9: Billie Eilish & Finneas - Bad Guy (ASMR Vocal & 808)", type: "quiz", actionText: "Launch Case Study" },
    { id: "history-8", title: "Historical Tech: The 2010s & Beyond - ITB Production & Immersive Audio", type: "quiz", actionText: "Launch 2010s Tech" },
    { id: "c4_spop", title: "Component 4 Mock Exam: Synth-Pop & Modern Production (105 Marks)", type: "exam_c4", actionText: "Launch C4 Mock Exam" },
    { id: "fingerprints", title: "Sonic Fingerprints: 2010s Trap, Modern Pop & Future Bass", type: "fingerprints", actionText: "Explore Fingerprints" }
  ],
  "block-8": [
    { id: "quiz-topic-2_p1", title: "Topic 2 Quiz: Microphones & Transducers (Part 1)", type: "quiz", actionText: "Launch Topic 2" },
    { id: "quiz-topic-10_p1", title: "Topic 10 Quiz: Studio Equipment & Workflow (Part 1)", type: "quiz", actionText: "Launch Topic 10" },
    { id: "interactive-practical-11", title: "Practical Quiz 11: Vocal Production Chain & Processing", type: "quiz", actionText: "Launch Vocal Chain" },
    { id: "interactive-practical-24", title: "Practical Quiz 24: Audio Fault Diagnosis & De-Noising", type: "quiz", actionText: "Launch Fault Diagnosis" },
    { id: "comp_7", title: "Comparison Quiz 7: Power Ballads (I Will Always Love You vs Rolling in the Deep)", type: "quiz", actionText: "Launch Comparison 7" },
    { id: "node_c4_4", title: "C4 Module 2: Vocal Comping, De-Essing, Plosives & Pitch Correction", type: "quiz", actionText: "Launch C4 Vocal Module" },
    { id: "dictionary", title: "Dictionary Quizzes: Master Terms & Definitions", type: "dictionary", actionText: "Open Dictionary Quizzes" },
    { id: "tracksheet", title: "Tracksheet Creator: Vocal Tracking & Outboard Rig", type: "tracksheet", actionText: "Open Tracksheet Creator" }
  ],
  "block-9": [
    { id: "quiz-topic-2_p2", title: "Topic 2 Quiz: Microphones & Transducers (Part 2)", type: "quiz", actionText: "Launch Topic 2 Part 2" },
    { id: "interactive-practical-12", title: "Practical Quiz 12: Drum Kit Microphone Setup & Bleed Control", type: "quiz", actionText: "Launch Drum Mic Setup" },
    { id: "interactive-practical-22", title: "Practical Quiz 22: Studio Signal Flow Labelling", type: "quiz", actionText: "Launch Signal Flow Lab" },
    { id: "comp_2", title: "Comparison Quiz 2: Hard Rock Foundations (Whole Lotta Love vs Paranoid)", type: "quiz", actionText: "Launch Comparison 2" },
    { id: "case-study-6", title: "Case Study 6: Led Zeppelin - When the Levee Breaks & Drum Ambience", type: "quiz", actionText: "Launch Case Study" },
    { id: "c3_heavyrock", title: "Component 3 Mock Exam: Heavy Rock (75 Marks)", type: "exam_c3", actionText: "Launch C3 Heavy Rock" },
    { id: "tracksheet", title: "Tracksheet Creator: Drum Multitrack & Phase Alignment Log", type: "tracksheet", actionText: "Open Tracksheet Creator" }
  ],
  "block-10": [
    { id: "quiz-topic-5_p2", title: "Topic 5 Quiz: Dynamic Processing (Part 2)", type: "quiz", actionText: "Launch Topic 5 Part 2" },
    { id: "quiz-topic-6_p2", title: "Topic 6 Quiz: EQ & Frequency Spectrum (Part 2)", type: "quiz", actionText: "Launch Topic 6 Part 2" },
    { id: "interactive-practical-14", title: "Practical Quiz 14: Sidechain Compression Routing & Pumping", type: "quiz", actionText: "Launch Sidechain Lab" },
    { id: "interactive-practical-18", title: "Practical Quiz 18: Transient Designer Dynamics & Envelope Shaping", type: "quiz", actionText: "Launch Transient Lab" },
    { id: "comp_8", title: "Comparison Quiz 8: Dance Pioneers (Around the World vs Strobe)", type: "quiz", actionText: "Launch Comparison 8" },
    { id: "c4_sidechain_quiz", title: "C4 Module 5: Sidechain Compression & Ghost Kick Knowledge Check", type: "quiz", actionText: "Launch C4 Sidechain Quiz" },
    { id: "c4_edm", title: "Component 4 Mock Exam: EDM Practical (105 Marks)", type: "exam_c4", actionText: "Launch C4 EDM Mock" },
    { id: "tracksheet", title: "Tracksheet Creator: Electronic Production & Bus Routing", type: "tracksheet", actionText: "Open Tracksheet Creator" }
  ],
  "block-11": [
    { id: "quiz-topic-3_p2", title: "Topic 3 Quiz: Synthesis & Sound Design (Part 2)", type: "quiz", actionText: "Launch Topic 3 Part 2" },
    { id: "interactive-practical-13", title: "Practical Quiz 13: Synthesizer Waveform & Harmonic Audio Analysis", type: "quiz", actionText: "Launch Waveform Analysis" },
    { id: "interactive-practical-15", title: "Practical Quiz 15: Modulation Routing Matrix (LFO & Envelope)", type: "quiz", actionText: "Launch Modulation Lab" },
    { id: "comp_13", title: "Comparison Quiz 13: Synthesizer Stadium Anthems (Jump vs Take On Me)", type: "quiz", actionText: "Launch Comparison 13" },
    { id: "history-7", title: "Historical Tech: The Evolution of Synthesizers (Subtractive to Wavetable)", type: "quiz", actionText: "Launch Synth Evolution" },
    { id: "node_c4_7", title: "C4 Module 3: Designing Lead, Bass & Pad Patches to Reference", type: "quiz", actionText: "Launch C4 Synth Module" },
    { id: "tracksheet", title: "Tracksheet Creator: Polyphonic Synth & MIDI Routing", type: "tracksheet", actionText: "Open Tracksheet Creator" },
    { id: "fingerprints", title: "Sonic Fingerprints: Electroclash & Synthwave Hallmarks", type: "fingerprints", actionText: "Explore Fingerprints" }
  ],
  "block-12": [
    { id: "quiz-topic-2_p1", title: "Topic 2 Quiz: Microphones & Transducers (Part 1)", type: "quiz", actionText: "Launch Topic 2" },
    { id: "quiz-topic-8_p1", title: "Topic 8 Quiz: Mastering, Metering & Digital Audio (Part 1)", type: "quiz", actionText: "Launch Topic 8" },
    { id: "comp_14", title: "Comparison Quiz 14: 1970s Funk Innovations (Superstition vs September)", type: "quiz", actionText: "Launch Comparison 14" },
    { id: "case-study-7", title: "Case Study 7: Stevie Wonder - Superstition (Clavinet & TONTO Synthesizer)", type: "quiz", actionText: "Launch Case Study" },
    { id: "history-6", title: "Historical Tech: The Golden Age of Soul & Dub (Motown & King Tubby)", type: "quiz", actionText: "Launch Soul & Dub Tech" },
    { id: "c3_funk", title: "Component 3 Mock Exam: Funk (75 Marks)", type: "exam_c3", actionText: "Launch C3 Funk" },
    { id: "c3_soul", title: "Component 3 Mock Exam: Soul (75 Marks)", type: "exam_c3", actionText: "Launch C3 Soul" }
  ],
  "block-13": [
    { id: "quiz-topic-1_p2", title: "Topic 1 Quiz: Fundamentals & Recording (Part 2)", type: "quiz", actionText: "Launch Topic 1 Part 2" },
    { id: "quiz-topic-7_p2", title: "Topic 7 Quiz: FX, Processors & Modulation (Part 2)", type: "quiz", actionText: "Launch Topic 7 Part 2" },
    { id: "interactive-practical-16", title: "Practical Quiz 16: Stereo Width & Panning Physics", type: "quiz", actionText: "Launch Stereo Width Lab" },
    { id: "interactive-practical-19", title: "Practical Quiz 19: Vocal Formant & Pitch Correction Alignment", type: "quiz", actionText: "Launch Vocal Formant Lab" },
    { id: "comp_15", title: "Comparison Quiz 15: Art Pop & Fairlight CMI (Running Up That Hill vs Sledgehammer)", type: "quiz", actionText: "Launch Comparison 15" },
    { id: "case-study-5", title: "Case Study 5: Queen - Bohemian Rhapsody (24-Track Vocal Reduction)", type: "quiz", actionText: "Launch Case Study" },
    { id: "node_c4_19", title: "C4 Module 7: Tempo-Synced Throws, Gated Reverb & Aux Sends", type: "quiz", actionText: "Launch C4 FX Module" },
    { id: "tracksheet", title: "Tracksheet Creator: Final Vocal Chain & Reverb Stems", type: "tracksheet", actionText: "Open Tracksheet Creator" }
  ],
  "block-14": [
    { id: "quiz-topic-8_p2", title: "Topic 8 Quiz: Mastering, Metering & Digital Audio (Part 2)", type: "quiz", actionText: "Launch Topic 8 Part 2" },
    { id: "quiz-topic-10_p2", title: "Topic 10 Quiz: Studio Equipment & Workflow (Part 2)", type: "quiz", actionText: "Launch Topic 10 Part 2" },
    { id: "interactive-practical-23", title: "Practical Quiz 23: Studio Maths & Audio Calculations", type: "quiz", actionText: "Launch Studio Maths" },
    { id: "interactive-practical-24", title: "Practical Quiz 24: Audio Fault Diagnosis & De-Noising", type: "quiz", actionText: "Launch Fault Diagnosis" },
    { id: "worksheet-ao3-ao4-q6", title: "AO3 vs AO4 Essay Workshop: Question 6 Master Blueprint (20 Marks)", type: "quiz", actionText: "Launch Q6 Essay Workshop" },
    { id: "node_c4_22", title: "C4 Module 8: Mix Bus Glue, True Peak Limiting & -14 LUFS", type: "quiz", actionText: "Launch C4 Mastering Module" },
    { id: "tracksheet", title: "Tracksheet Creator: Final Mastering Chain & Bus Routing", type: "tracksheet", actionText: "Open Tracksheet Creator" },
    { id: "dictionary", title: "Dictionary Quizzes: Complete Mastering & Equipment Glossaries", type: "dictionary", actionText: "Open Dictionary Quizzes" }
  ],
  "block-15": [
    { id: "quiz-topic-9_p2", title: "Topic 9 Quiz: Acoustics & Monitoring (Part 2)", type: "quiz", actionText: "Launch Topic 9 Part 2" },
    { id: "worksheet-ao3-ao4-q5", title: "AO3 vs AO4 Essay Workshop: Question 5 Comparative Analysis (15 Marks)", type: "quiz", actionText: "Launch Q5 Essay Workshop" },
    { id: "case-study-8", title: "Case Study 8: King Tubby & Lee 'Scratch' Perry - Dub Reggae Sound System", type: "quiz", actionText: "Launch Case Study" },
    { id: "node_c4_25", title: "C4 Module 9: Room Mode Diagnosis & Convolution Impulse Responses", type: "quiz", actionText: "Launch C4 Acoustics Module" },
    { id: "node_c4_28", title: "C4 Module 10: Signal Chain Troubleshooting & Impedance/DI Matching", type: "quiz", actionText: "Launch C4 Equipment Module" },
    { id: "c4_spop", title: "Component 4 Mock Exam: Synth-Pop Practice Sprint (105 Marks)", type: "exam_c4", actionText: "Launch C4 Practice Sprint" },
    { id: "tracksheet", title: "Tracksheet Creator: Final Coursework Export & Submission Check", type: "tracksheet", actionText: "Open Tracksheet Creator" }
  ],
  "block-16": [
    { id: "interactive-practical-20", title: "Practical Quiz 20: Sample Chopping & Slicing Mastery", type: "quiz", actionText: "Launch Chopping Lab" },
    { id: "interactive-practical-21", title: "Practical Quiz 21: Stereo Panning & Soundstage Masterclass", type: "quiz", actionText: "Launch Panning Masterclass" },
    { id: "interactive-practical-22", title: "Practical Quiz 22: Studio Signal Flow Labelling Masterclass", type: "quiz", actionText: "Launch Signal Flow Masterclass" },
    { id: "comp_10", title: "Comparison Quiz 10: 1960s Production Milestones (A Day in the Life vs Good Vibrations)", type: "quiz", actionText: "Launch Comparison 10" },
    { id: "comp_12", title: "Comparison Quiz 12: 1980s Studio Polish (Africa vs Everybody Wants to Rule the World)", type: "quiz", actionText: "Launch Comparison 12" },
    { id: "c3_reggae", title: "Component 3 Mock Exam: Reggae (75 Marks)", type: "exam_c3", actionText: "Launch C3 Reggae" },
    { id: "c3_funk", title: "Component 3 Mock Exam: Funk (75 Marks)", type: "exam_c3", actionText: "Launch C3 Funk" },
    { id: "c3_synthpop", title: "Component 3 Mock Exam: Synth-Pop (75 Marks)", type: "exam_c3", actionText: "Launch C3 Synth-Pop" },
    { id: "c3_heavyrock", title: "Component 3 Mock Exam: Heavy Rock (75 Marks)", type: "exam_c3", actionText: "Launch C3 Heavy Rock" },
    { id: "c3_soul", title: "Component 3 Mock Exam: Soul (75 Marks)", type: "exam_c3", actionText: "Launch C3 Soul" },
    { id: "c4_edm", title: "Component 4 Mock Exam: EDM Practical (105 Marks)", type: "exam_c4", actionText: "Launch C4 EDM" },
    { id: "c4_spop", title: "Component 4 Mock Exam: Synth-Pop (105 Marks)", type: "exam_c4", actionText: "Launch C4 Synth-Pop" },
    { id: "c4_template", title: "Component 4 Mock Exam: Rock Production (105 Marks)", type: "exam_c4", actionText: "Launch C4 Rock" },
    { id: "dictionary", title: "Dictionary Quizzes: Russian Roulette & Complete Terms Bootcamp", type: "dictionary", actionText: "Launch Dictionary Bootcamp" },
    { id: "fingerprints", title: "Sonic Fingerprints: Complete 9-Era Fingerprints Sprint", type: "fingerprints", actionText: "Launch Fingerprints Sprint" }
  ]
};

// Now replace inAppActivities in each block
Object.entries(BLOCK_ACTIVITIES).forEach(([blockId, acts]) => {
  // Regex to match blockId and its inAppActivities: [ ... ]
  const blockStartRegex = new RegExp(`id:\\s*"${blockId}"[\\s\\S]*?inAppActivities:\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const match = blockStartRegex.exec(fileContent);
  if (match) {
    const formattedActs = '[\n' + acts.map(a => `      {\n        "id": "${a.id}",\n        "title": "${a.title}",\n        "type": "${a.type}",\n        "actionText": "${a.actionText}"\n      }`).join(',\n') + '\n    ]';
    const oldBlockSection = match[0];
    const newBlockSection = oldBlockSection.replace(/inAppActivities:\s*\[[\s\S]*?\]/, `inAppActivities: ${formattedActs}`);
    fileContent = fileContent.replace(oldBlockSection, newBlockSection);
    console.log(`[UPDATED] ${blockId} with ${acts.length} in-app activities`);
  } else {
    console.warn(`[WARN] Block ${blockId} not found with inAppActivities regex!`);
  }
});

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('Successfully synced timetableData.js with comprehensive cross-links!');
