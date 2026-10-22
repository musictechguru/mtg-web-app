const fs = require('fs');
const path = require('path');

const explDir = path.join(__dirname, '../public/images/explanations');
const svgs = {};

// 1. equal_power_vs_linear.svg -> copy/use crossfade curve
svgs['equal_power_vs_linear.svg'] = fs.readFileSync(path.join(explDir, 'crossfade_curve.svg'), 'utf8');

// 2. optical_response_curve.svg -> use authentic optical curve
svgs['optical_response_curve.svg'] = fs.readFileSync(path.join(explDir, 'la2a_optical_photocell_response.svg'), 'utf8');

// 3. stereo_panning_arc.svg
svgs['stereo_panning_arc.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Stereo Soundstage &amp; Panning Arc</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Phantom Center, Left/Right Interaural Level &amp; Time Differences</text>

  <g transform="translate(400, 360)">
    <!-- Stereo Arc -->
    <path d="M -260 0 A 260 260 0 0 1 260 0" fill="none" stroke="#334155" stroke-width="4"/>
    <path d="M -180 0 A 180 180 0 0 1 180 0" fill="none" stroke="#1e293b" stroke-width="2" stroke-dasharray="4 4"/>

    <!-- Left Speaker -->
    <g transform="translate(-270, 0)">
      <rect x="-25" y="-35" width="50" height="70" fill="#1e293b" rx="6" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="0" cy="10" r="16" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="0" cy="-15" r="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <text x="0" y="55" fill="#38bdf8" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">LEFT (L100)</text>
    </g>

    <!-- Right Speaker -->
    <g transform="translate(270, 0)">
      <rect x="-25" y="-35" width="50" height="70" fill="#1e293b" rx="6" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="0" cy="10" r="16" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="0" cy="-15" r="8" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <text x="0" y="55" fill="#38bdf8" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">RIGHT (R100)</text>
    </g>

    <!-- Phantom Center (Center top of arc) -->
    <circle cx="0" cy="-260" r="14" fill="#10b981"/>
    <text x="0" y="-285" fill="#10b981" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">PHANTOM CENTER (C)</text>
    <text x="0" y="-235" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Lead Vocals / Kick / Bass / Snare</text>

    <!-- Mid Left / Mid Right -->
    <circle cx="-184" cy="-184" r="10" fill="#fbbf24"/>
    <text x="-195" y="-205" fill="#fbbf24" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">MID-LEFT (L50)</text>
    <text x="-195" y="-160" fill="#94a3b8" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Rhythm Guitar</text>

    <circle cx="184" cy="-184" r="10" fill="#fbbf24"/>
    <text x="195" y="-205" fill="#fbbf24" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">MID-RIGHT (R50)</text>
    <text x="195" y="-160" fill="#94a3b8" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Keys / Piano</text>

    <!-- Listener Position -->
    <circle cx="0" cy="40" r="22" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <text x="0" y="45" fill="#ffffff" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">LISTENER</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="420" width="700" height="50" fill="#1e293b" rx="6"/>
  <text x="400" y="442" fill="#f8fafc" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Pan laws (-3dB, -4.5dB, or -6dB center attenuation) ensure perceived loudness remains constant when panning across the stereo arc.</text>
  <text x="400" y="458" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Low bass frequencies (< 100 Hz) should stay in mono center to avoid club phase cancellation and maximize vinyl cutting headroom.</text>
</svg>`;

// 4. delay_vs_reverb.svg
svgs['delay_vs_reverb.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Delay vs Reverb: Time &amp; Echo Density</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Discrete rhythmic echoes vs dense diffuse room decay reflections</text>

  <!-- Left: Delay (Discrete Echoes) -->
  <g transform="translate(50, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#38bdf8" stroke-width="2"/>
    <text x="167" y="30" fill="#38bdf8" font-size="15" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Delay (Echoes)</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <!-- Baseline -->
    <line x1="35" y1="150" x2="300" y2="150" stroke="#334155"/>
    <!-- Direct sound -->
    <line x1="50" y1="150" x2="50" y2="60" stroke="#f43f5e" stroke-width="4"/>
    <text x="50" y="50" fill="#f43f5e" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Direct</text>

    <!-- Discrete repeats -->
    <line x1="110" y1="150" x2="110" y2="80" stroke="#38bdf8" stroke-width="3"/>
    <text x="110" y="72" fill="#38bdf8" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Echo 1</text>
    <line x1="170" y1="150" x2="170" y2="105" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="170" y="98" fill="#38bdf8" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Echo 2</text>
    <line x1="230" y1="150" x2="230" y2="125" stroke="#38bdf8" stroke-width="2"/>
    <text x="230" y="118" fill="#38bdf8" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Echo 3</text>

    <text x="167" y="200" fill="#38bdf8" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Discrete, Distinct Repeats</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">• Clear individual repetitions spaced apart in time</text>
    <text x="167" y="234" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">• Controlled by Delay Time (ms) &amp; Feedback (%)</text>
  </g>

  <!-- Right: Reverb (Diffuse Reflections) -->
  <g transform="translate(415, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#34d399" stroke-width="2"/>
    <text x="167" y="30" fill="#34d399" font-size="15" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Reverb (Acoustic Space)</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <!-- Baseline -->
    <line x1="35" y1="150" x2="300" y2="150" stroke="#334155"/>
    <!-- Direct sound -->
    <line x1="50" y1="150" x2="50" y2="60" stroke="#f43f5e" stroke-width="4"/>
    <text x="50" y="50" fill="#f43f5e" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Direct</text>

    <!-- Dense tail -->
    <path d="M 80 85 C 130 95, 190 125, 290 150" fill="none" stroke="#34d399" stroke-width="3"/>
    <path d="M 80 85 C 130 95, 190 125, 290 150 L 80 150 Z" fill="#34d399" fill-opacity="0.15"/>
    <!-- Spikes inside tail -->
    <line x1="75" y1="150" x2="75" y2="85" stroke="#34d399" stroke-width="2"/>
    <line x1="90" y1="150" x2="90" y2="95" stroke="#34d399" stroke-width="1.5"/>
    <line x1="105" y1="150" x2="105" y2="90" stroke="#34d399" stroke-width="1.5"/>
    <line x1="120" y1="150" x2="120" y2="105" stroke="#34d399" stroke-width="1.5"/>

    <text x="167" y="200" fill="#34d399" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Thousands of Diffuse Reflections</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">• Echoes blend together into a smooth acoustic wash</text>
    <text x="167" y="234" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">• Simulates physical boundary reflections of a room</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Technically, reverb is simply thousands of micro-delays with high echo density and randomized phase dispersion.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Delay provides rhythmic depth without cluttering a mix; reverb provides physical front-to-back room dimension.</text>
</svg>`;

// 5. tape_echo_visual.svg & 6. tape_echo_heads.svg
const tapeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Analog Tape Echo: Multi-Head Spacing &amp; Motor Speed</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Roland RE-201 Space Echo / Echoplex Tape Loop Mechanics</text>

  <g transform="translate(60, 110)">
    <!-- Tape Loop Path -->
    <rect width="680" height="250" fill="#1e293b" rx="8" stroke="#334155"/>

    <!-- Tape Ribbon -->
    <path d="M 60 125 L 620 125" stroke="#78350f" stroke-width="12" stroke-linecap="round"/>
    <text x="630" y="130" fill="#d97706" font-size="11" font-weight="bold" font-family="system-ui, sans-serif">TAPE LOOP →</text>

    <!-- Erase Head -->
    <g transform="translate(90, 80)">
      <rect width="50" height="90" fill="#334155" rx="4" stroke="#64748b" stroke-width="2"/>
      <text x="25" y="45" fill="#ffffff" font-size="9" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">ERASE</text>
      <text x="25" y="60" fill="#94a3b8" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">HEAD</text>
    </g>

    <!-- Record Head -->
    <g transform="translate(190, 80)">
      <rect width="50" height="90" fill="#0284c7" rx="4" stroke="#38bdf8" stroke-width="2"/>
      <text x="25" y="45" fill="#ffffff" font-size="9" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">RECORD</text>
      <text x="25" y="60" fill="#bae6fd" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">HEAD</text>
      <text x="25" y="115" fill="#38bdf8" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">t = 0 ms</text>
    </g>

    <!-- Playback Head 1 (Short Delay) -->
    <g transform="translate(310, 80)">
      <rect width="50" height="90" fill="#059669" rx="4" stroke="#34d399" stroke-width="2"/>
      <text x="25" y="42" fill="#ffffff" font-size="9" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">PLAY 1</text>
      <text x="25" y="58" fill="#a7f3d0" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">(Short)</text>
      <text x="25" y="115" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">~120 ms</text>
    </g>

    <!-- Playback Head 2 (Medium Delay) -->
    <g transform="translate(430, 80)">
      <rect width="50" height="90" fill="#059669" rx="4" stroke="#34d399" stroke-width="2"/>
      <text x="25" y="42" fill="#ffffff" font-size="9" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">PLAY 2</text>
      <text x="25" y="58" fill="#a7f3d0" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">(Mid)</text>
      <text x="25" y="115" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">~240 ms</text>
    </g>

    <!-- Playback Head 3 (Long Delay) -->
    <g transform="translate(550, 80)">
      <rect width="50" height="90" fill="#059669" rx="4" stroke="#34d399" stroke-width="2"/>
      <text x="25" y="42" fill="#ffffff" font-size="9" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">PLAY 3</text>
      <text x="25" y="58" fill="#a7f3d0" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">(Long)</text>
      <text x="25" y="115" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">~360 ms</text>
    </g>

    <!-- Capstan & Pinch Roller -->
    <circle cx="630" cy="90" r="14" fill="#64748b"/>
    <text x="630" y="70" fill="#94a3b8" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Capstan Motor</text>
    <text x="630" y="155" fill="#cbd5e1" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Varying speed = pitch flutter</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Delay Time is determined by: (Distance from Record Head to Playback Head) ÷ (Tape Transport Speed).</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Tape saturation naturally rolls off high frequencies and compresses each subsequent feedback repeat.</text>
</svg>`;
svgs['tape_echo_visual.svg'] = tapeSvg;
svgs['tape_echo_heads.svg'] = tapeSvg;

// 7. pultec_curve.svg
svgs['pultec_curve.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">The "Pultec Low-End Trick" Equaliser Curve</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Simultaneous Boost &amp; Attenuation at the same frequency creating low-end punch &amp; mud cleanup</text>

  <g transform="translate(60, 110)">
    <rect width="680" height="250" fill="#1e293b" rx="8" stroke="#334155"/>
    <rect x="20" y="20" width="640" height="210" fill="#0f172a" rx="6" stroke="#475569"/>

    <line x1="30" y1="125" x2="650" y2="125" stroke="#334155" stroke-dasharray="2 2"/>
    <text x="40" y="120" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif">0 dB (Flat)</text>

    <!-- Boost Shelf curve (Yellow) -->
    <path d="M 40 55 C 140 55, 200 125, 320 125 L 640 125" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3 3"/>
    <text x="120" y="45" fill="#fbbf24" font-size="10" font-family="system-ui, sans-serif">Low Boost (+8 dB)</text>

    <!-- Cut Shelf curve (Red) -->
    <path d="M 40 185 C 160 185, 260 125, 380 125 L 640 125" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
    <text x="120" y="205" fill="#ef4444" font-size="10" font-family="system-ui, sans-serif">Low Attenuate (-6 dB)</text>

    <!-- Resulting Pultec Composite Curve (Cyan Glowing) -->
    <path d="M 40 85 C 110 85, 160 85, 200 115 C 240 150, 310 150, 380 125 L 640 125" fill="none" stroke="#38bdf8" stroke-width="4"/>
    <circle cx="100" cy="85" r="5" fill="#38bdf8"/>
    <text x="100" y="70" fill="#38bdf8" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">+4 dB Sub Boost (60 Hz)</text>

    <circle cx="270" cy="150" r="5" fill="#a78bfa"/>
    <text x="270" y="175" fill="#a78bfa" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">-2.5 dB Mud Notch (250-400 Hz)</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Because the Pultec EQP-1A boost and attenuation circuits have slightly different frequency slopes and gains,</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">boosting and attenuating simultaneously boosts sub-bass while scooping out the muddy 300Hz boxiness.</text>
</svg>`;

// 8. parametric_sweep_cut.svg
svgs['parametric_sweep_cut.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Parametric EQ "Boost and Sweep" Technique</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Using a narrow high-Q boost to hunt down unpleasant resonances, then cutting them surgically</text>

  <!-- Left: Step 1 Hunt -->
  <g transform="translate(50, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#334155"/>
    <text x="167" y="30" fill="#f59e0b" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Step 1: Boost (Q=10, +10dB) &amp; Sweep</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <line x1="35" y1="120" x2="300" y2="120" stroke="#334155"/>
    <!-- Narrow boost spike moving -->
    <path d="M 35 120 L 140 120 L 167 45 L 194 120 L 300 120" fill="none" stroke="#f59e0b" stroke-width="3"/>
    <line x1="120" y1="35" x2="214" y2="35" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="167" y="25" fill="#f59e0b" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Sweep Left/Right ↔</text>

    <text x="167" y="200" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Listen for ringing, nasal, or piercing frequencies</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Harsh resonant frequency jumps out painfully</text>
    <text x="167" y="238" fill="#f59e0b" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Found resonance at 2.8 kHz</text>
  </g>

  <!-- Right: Step 2 Cut -->
  <g transform="translate(415, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#34d399" stroke-width="2"/>
    <text x="167" y="30" fill="#34d399" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Step 2: Flip from Boost to Cut (-4dB)</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <line x1="35" y1="120" x2="300" y2="120" stroke="#334155"/>
    <!-- Surgical Notch Cut -->
    <path d="M 35 120 L 145 120 L 167 165 L 189 120 L 300 120" fill="none" stroke="#34d399" stroke-width="3"/>
    <circle cx="167" cy="165" r="4" fill="#34d399"/>
    <text x="167" y="180" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Surgical Notch (-4 dB)</text>

    <text x="167" y="200" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Flips to a notch cut to eliminate the resonance</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Cleans up vocal harshness / cymbal screech</text>
    <text x="167" y="238" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Clean, fatigue-free audio result</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Warning: Do not sweep at maximum volume for extended periods — sweeping narrow +15dB boosts causes rapid ear fatigue.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Always toggle EQ bypass after cutting to verify the sound actually improved rather than sounding hollow.</text>
</svg>`;

// 9. gain_knob.svg
svgs['gain_knob.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Gain vs Volume (Preamplifier Gain vs Output Fader)</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Gain controls input sensitivity into a circuit; Volume controls the listening output level</text>

  <!-- Left: Gain Stage -->
  <g transform="translate(50, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#38bdf8" stroke-width="2"/>
    <text x="167" y="30" fill="#38bdf8" font-size="15" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">1. Input Gain (Sensitivity)</text>

    <!-- Rotary Knob -->
    <circle cx="167" cy="115" r="50" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
    <line x1="167" y1="115" x2="195" y2="85" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
    <text x="167" y="122" fill="#ffffff" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">+45 dB</text>
    <text x="167" y="180" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Mic Preamp Input Stage</text>

    <text x="167" y="210" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Boosts weak mic-level (-50 dBu) to line-level (+4 dBu)</text>
    <text x="167" y="228" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Determines Signal-to-Noise Ratio (SNR)</text>
    <text x="167" y="246" fill="#f87171" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Too high = Preamp distortion / clipping!</text>
  </g>

  <!-- Right: Volume Fader -->
  <g transform="translate(415, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#34d399" stroke-width="2"/>
    <text x="167" y="30" fill="#34d399" font-size="15" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">2. Channel Fader (Volume)</text>

    <!-- Linear Fader -->
    <rect x="157" y="55" width="20" height="120" fill="#0f172a" rx="4" stroke="#475569"/>
    <line x1="167" y1="65" x2="167" y2="165" stroke="#64748b" stroke-width="2"/>
    <rect x="145" y="95" width="44" height="24" fill="#34d399" rx="3"/>
    <text x="167" y="111" fill="#0f172a" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">0 dB</text>

    <text x="167" y="210" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Attenuates or boosts the already amplified signal</text>
    <text x="167" y="228" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Balances level in the mix between instruments</text>
    <text x="167" y="246" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Does NOT affect input preamp saturation</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Gain Staging Principle: Set preamp gain to achieve healthy peaks between -18 dBFS and -12 dBFS;</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">use channel faders exclusively to balance listening loudness across the stereo mix.</text>
</svg>`;

// 10. phonograph_diagram.svg
svgs['phonograph_diagram.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Thomas Edison Phonograph (1877): Acoustic Era Recording</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Pure mechanical recording: Sound waves vibrate a diaphragm and stylus cutting grooves into tin foil / wax</text>

  <g transform="translate(60, 110)">
    <rect width="680" height="250" fill="#1e293b" rx="8" stroke="#334155"/>

    <!-- Acoustic Horn (Funnel) -->
    <path d="M 60 70 L 220 115 L 220 145 L 60 190 Z" fill="#b45309" stroke="#f59e0b" stroke-width="2"/>
    <text x="130" y="135" fill="#ffffff" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">ACOUSTIC HORN</text>
    <text x="130" y="150" fill="#fde68a" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Focuses acoustic pressure</text>

    <!-- Diaphragm & Cutting Stylus -->
    <g transform="translate(220, 105)">
      <line x1="0" y1="0" x2="0" y2="50" stroke="#f8fafc" stroke-width="4"/>
      <text x="0" y="-10" fill="#ffffff" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Diaphragm</text>
      <!-- Stylus needle -->
      <polygon points="0,50 8,85 -8,85" fill="#e2e8f0"/>
      <text x="25" y="75" fill="#38bdf8" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Stylus Needle</text>
    </g>

    <!-- Rotating Wax / Tin Foil Cylinder -->
    <g transform="translate(260, 170)">
      <rect x="0" y="0" width="280" height="60" fill="#451a03" rx="8" stroke="#d97706" stroke-width="2"/>
      <!-- Grooves -->
      <line x1="40" y1="0" x2="40" y2="60" stroke="#78350f" stroke-width="2"/>
      <line x1="80" y1="0" x2="80" y2="60" stroke="#78350f" stroke-width="2"/>
      <line x1="120" y1="0" x2="120" y2="60" stroke="#78350f" stroke-width="2"/>
      <line x1="160" y1="0" x2="160" y2="60" stroke="#78350f" stroke-width="2"/>
      <line x1="200" y1="0" x2="200" y2="60" stroke="#78350f" stroke-width="2"/>
      <line x1="240" y1="0" x2="240" y2="60" stroke="#78350f" stroke-width="2"/>

      <text x="140" y="35" fill="#fef3c7" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">TIN FOIL / WAX CYLINDER</text>
    </g>

    <!-- Hand Crank -->
    <g transform="translate(560, 180)">
      <circle cx="20" cy="20" r="16" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <rect x="15" y="-15" width="10" height="35" fill="#64748b"/>
      <text x="20" y="55" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Hand Crank</text>
    </g>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Acoustic Era (1877–1925): No electricity, no microphones, no amplifiers. Musicians had to crowd around the horn.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Electrical recording arrived in 1925 with Western Electric condenser mics and vacuum tube amplification.</text>
</svg>`;

// 11. 808_harmonic_saturation.svg
svgs['808_harmonic_saturation.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">808 Sub-Bass Harmonic Saturation</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Generating upper harmonics so 40 Hz sub-bass translates on small phone and laptop speakers</text>

  <!-- Left: Pure Sine Sub (Inaudible on phone) -->
  <g transform="translate(50, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#ef4444" stroke-width="2"/>
    <text x="167" y="30" fill="#ef4444" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Pure 808 Sine Wave (40 Hz Only)</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <line x1="35" y1="150" x2="300" y2="150" stroke="#334155"/>
    <!-- 40Hz fundamental only -->
    <rect x="60" y="70" width="20" height="80" fill="#ef4444"/>
    <text x="70" y="60" fill="#ef4444" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">40 Hz (f0)</text>

    <!-- Empty higher spectrum -->
    <text x="190" y="110" fill="#64748b" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">No higher harmonics!</text>

    <text x="167" y="200" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Shakes club subwoofers with massive energy</text>
    <text x="167" y="218" fill="#f87171" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">• Completely silent on phone/laptop speakers!</text>
    <text x="167" y="238" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Small speakers cut off below 150-200 Hz</text>
  </g>

  <!-- Right: Saturated Sub (Audible everywhere) -->
  <g transform="translate(415, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#34d399" stroke-width="2"/>
    <text x="167" y="30" fill="#34d399" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Saturated 808 (Harmonic Richness)</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <line x1="35" y1="150" x2="300" y2="150" stroke="#334155"/>
    <!-- f0 fundamental -->
    <rect x="50" y="70" width="18" height="80" fill="#38bdf8"/>
    <text x="59" y="60" fill="#38bdf8" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">40Hz</text>

    <!-- 2nd harmonic 80Hz -->
    <rect x="90" y="85" width="18" height="65" fill="#34d399"/>
    <text x="99" y="75" fill="#34d399" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">80Hz</text>

    <!-- 3rd harmonic 120Hz -->
    <rect x="130" y="95" width="18" height="55" fill="#34d399"/>
    <text x="139" y="85" fill="#34d399" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">120Hz</text>

    <!-- 4th harmonic 160Hz -->
    <rect x="170" y="105" width="18" height="45" fill="#fbbf24"/>
    <text x="179" y="95" fill="#fbbf24" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">160Hz</text>

    <!-- 5th harmonic 200Hz -->
    <rect x="210" y="115" width="18" height="35" fill="#fbbf24"/>
    <text x="219" y="105" fill="#fbbf24" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">200Hz</text>

    <text x="167" y="200" fill="#34d399" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Audible on Phone, Car &amp; Headphones</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">• Saturation/distortion introduces 2nd &amp; 3rd harmonics</text>
    <text x="167" y="234" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">• Brain psychoacoustically reconstructs fundamental ("Missing Fundamental")</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Psychoacoustic Phenomenon: The human brain hears harmonics at 80Hz, 120Hz, and 160Hz and deduces the 40Hz root,</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">allowing the sub-bass line to be clearly perceived even on earbuds that cannot reproduce 40Hz physically.</text>
</svg>`;

// 12. reverb_components.svg
svgs['reverb_components.svg'] = fs.readFileSync(path.join(explDir, 'reverb_build_up_time.svg'), 'utf8');

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(explDir, filename), content);
  console.log(`Created authentic: ${filename} (${content.length} bytes)`);
}
