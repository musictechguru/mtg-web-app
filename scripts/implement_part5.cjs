/**
 * implement_part5.cjs
 * Upgrades Comparisons 7, 8, 9 to full 16-question suites (15 criteria MCQs + Cloze summary)
 * Adds Comparisons 10, 11, 12, 13, 14, 15 to Stage 4 in course_data.json
 * Generates custom comparison SVGs for Comparisons 10-15
 */

const fs = require('fs');
const path = require('path');

// 1. Create comparison SVGs for the new comparisons
const svgDir = path.resolve('public/images/comparisons');
if (!fs.existsSync(svgDir)) {
  fs.mkdirSync(svgDir, { recursive: true });
}

function createComparisonSvg(title, yearA, artistA, genreA, techA, yearB, artistB, genreB, techB, colorA, colorB, filename) {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <linearGradient id="cardAGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(30, 41, 59, 0.95)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.95)" />
    </linearGradient>
    <linearGradient id="cardBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(30, 41, 59, 0.95)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.95)" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="900" height="360" fill="url(#bgGrad)" rx="14" />
  <rect x="1" y="1" width="898" height="358" fill="none" stroke="#334155" stroke-width="1.5" rx="13" />

  <!-- Header -->
  <text x="450" y="38" text-anchor="middle" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="18" font-weight="700" letter-spacing="1.5">${title.toUpperCase()}</text>
  <text x="450" y="58" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12">Edexcel Component 3 Question 5 Comparative Analysis</text>

  <!-- Version A Card -->
  <g transform="translate(30, 75)">
    <rect width="400" height="255" fill="url(#cardAGrad)" rx="10" stroke="${colorA}" stroke-width="2" />
    <rect x="15" y="15" width="80" height="24" rx="4" fill="${colorA}" />
    <text x="55" y="31" text-anchor="middle" fill="#0f172a" font-family="system-ui, sans-serif" font-size="11" font-weight="800">VERSION A</text>
    <text x="385" y="32" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">${yearA}</text>

    <text x="20" y="68" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="18" font-weight="700">${artistA}</text>
    <text x="20" y="88" fill="${colorA}" font-family="system-ui, sans-serif" font-size="12" font-weight="600">${genreA.toUpperCase()}</text>

    <line x1="20" y1="102" x2="380" y2="102" stroke="#334155" stroke-width="1" />

    <!-- Tech specs -->
    <text x="20" y="125" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Key Production Signatures:</text>
    ${techA.map((t, i) => `<text x="32" y="${148 + i * 22}" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">• ${t}</text>`).join('\n    ')}
  </g>

  <!-- VS Badge -->
  <circle cx="450" cy="202" r="22" fill="#0f172a" stroke="#64748b" stroke-width="2" />
  <text x="450" y="208" text-anchor="middle" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="14" font-weight="900">VS</text>

  <!-- Version B Card -->
  <g transform="translate(470, 75)">
    <rect width="400" height="255" fill="url(#cardBGrad)" rx="10" stroke="${colorB}" stroke-width="2" />
    <rect x="15" y="15" width="80" height="24" rx="4" fill="${colorB}" />
    <text x="55" y="31" text-anchor="middle" fill="#0f172a" font-family="system-ui, sans-serif" font-size="11" font-weight="800">VERSION B</text>
    <text x="385" y="32" text-anchor="end" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">${yearB}</text>

    <text x="20" y="68" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="18" font-weight="700">${artistB}</text>
    <text x="20" y="88" fill="${colorB}" font-family="system-ui, sans-serif" font-size="12" font-weight="600">${genreB.toUpperCase()}</text>

    <line x1="20" y1="102" x2="380" y2="102" stroke="#334155" stroke-width="1" />

    <!-- Tech specs -->
    <text x="20" y="125" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Key Production Signatures:</text>
    ${techB.map((t, i) => `<text x="32" y="${148 + i * 22}" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">• ${t}</text>`).join('\n    ')}
  </g>
</svg>`;

  fs.writeFileSync(path.join(svgDir, filename), content);
  console.log(`Generated SVG: ${filename}`);
}

createComparisonSvg(
  'Comfortably Numb: Pink Floyd vs Scissor Sisters',
  '1979', 'Pink Floyd', 'Progressive / Symphonic Rock',
  ['24-track analogue tape (Studer A800)', 'Live 55-piece orchestra ambient capture', 'Binson Echorec & EHX Big Muff guitar solos', 'Wide dynamic range & natural human tempo (65 BPM)'],
  '2004', 'Scissor Sisters', 'Electro-Pop / Nu-Disco',
  ['Full DAW in-the-box sequencing & MIDI', '132 BPM four-on-the-floor dance groove', 'Quantised synth arpeggiator & laser risers', 'Bus compression & modern dancefloor limiting'],
  '#38bdf8', '#f43f5e',
  'comfortably_numb_comparison.svg'
);

createComparisonSvg(
  'Jump: Van Halen vs Paul Anka',
  '1984', 'Van Halen', 'Arena Rock / Synth-Rock',
  ['Oberheim OB-Xa polyphonic synthesizer lead', 'Isolated multitrack tracking at 5150 Studio', 'Loud close-miked rock drums (kick/snare focus)', 'Eddie Van Halen two-hand tapping guitar solo'],
  '2005', 'Paul Anka', 'Big Band Swing / Vocal Jazz',
  ['100% acoustic big band ensemble in room', 'Natural microphone spill & acoustic room depth', 'Walking double bass & brushed jazz snare', 'No synthesizers or digital pitch correction'],
  '#f59e0b', '#10b981',
  'jump_comparison.svg'
);

createComparisonSvg(
  'Africa: Toto vs Bacall & Malo',
  '1982', 'Toto', 'Yacht Rock / Studio Pop',
  ['Jeff Porcaro iconic live half-time shuffle', 'Yamaha CS-80 & GS-1 FM synthesizers', 'Acoustic piano, percussion & vocal layers', 'Dynamic mixing with analogue tape saturation'],
  '2016', 'Bacall & Malo ft. Prince Osito', 'Tropical House / EDM',
  ['4-on-the-floor EDM kick with sidechain ducking', 'Sampled vocal chops with pitch/formant shifting', 'EDM builds, white noise risers & sudden drops', 'Brickwall digital limiting (-7 LUFS target)'],
  '#a855f7', '#06b6d4',
  'africa_comparison.svg'
);

createComparisonSvg(
  'A Day in the Life: The Beatles vs Jeff Beck',
  '1967', 'The Beatles', 'Psychedelic Rock / Studio Art',
  ['4-track tape recording at Abbey Road Studio 2', 'Extreme hard L/R panning for mono compatibility', 'Artificial Double Tracking (ADT) on vocals', '24-bar orchestral crescendo with manual faders'],
  '2009', 'Jeff Beck', 'Instrumental Rock / Modern Studio',
  ['96kHz/24-bit digital multitrack (48+ channels)', 'Phantom center imaging & Haas effect widening', 'Convolution reverb recreating Studio 2 acoustic', 'Mid-side processing (+3 dB side width enhancement)'],
  '#3b82f6', '#ec4899',
  'a_day_in_the_life_comparison.svg'
);

createComparisonSvg(
  'Superstition: Stevie Wonder vs Stevie Ray Vaughan',
  '1972', 'Stevie Wonder', 'Classic Funk / Progressive Soul',
  ['Multi-tracked Hohner Clavinet D6 (8 layers)', 'TONTO modular synthesizer bassline', 'Syncopated live funk drum groove played by Stevie', 'Tape saturation with open, warm midrange'],
  '1986', 'Stevie Ray Vaughan', 'Texas Blues / Blues Rock',
  ['Overdriven Fender Stratocaster through tube amps', 'Electric bass guitar playing doubled blues riff', 'Live power trio capture with room mics', 'Aggressive guitar transient attack & tube clipping'],
  '#eab308', '#6366f1',
  'superstition_comparison.svg'
);

createComparisonSvg(
  'Running Up That Hill: Kate Bush vs Placebo',
  '1985', 'Kate Bush', 'Art Pop / Electronic Pop',
  ['Fairlight CMI Series II digital sampling', 'LinnDrum drum machine driving hypnotic pulse', 'SSL 4000E console summing & punchy gated snare', 'Uptempo 108 BPM forward-driving dance momentum'],
  '2003', 'Placebo', 'Alternative Rock / Dark Wave',
  ['Downtuned electric guitars & dark textured fuzz', 'Slow melancholic 66 BPM tempo transformation', 'Heavy room compression on live acoustic drums', 'Intimate, close-miked vocal with minimal delay'],
  '#ec4899', '#14b8a6',
  'running_up_that_hill_comparison.svg'
);

console.log('Comparison SVGs created successfully.');
