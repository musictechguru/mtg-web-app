const fs = require('fs');
const path = require('path');

const explDir = path.join(__dirname, '../public/images/explanations');
if (!fs.existsSync(explDir)) {
  fs.mkdirSync(explDir, { recursive: true });
}

const svgs = {};

// 1. compressor_fast_attack_waveform.svg
svgs['compressor_fast_attack_waveform.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Fast Attack Time (0.1 ms - 1 ms): Transient Suppression</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Compressor engages almost immediately, clamping down on initial acoustic strike peaks</text>

  <!-- Left: Original Drum Waveform -->
  <g transform="translate(50, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#334155"/>
    <text x="167" y="30" fill="#38bdf8" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Original Drum Hit (Uncompressed)</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <line x1="35" y1="115" x2="300" y2="115" stroke="#334155" stroke-dasharray="2 2"/>
    <line x1="35" y1="80" x2="300" y2="80" stroke="#f59e0b" stroke-dasharray="4 4"/>
    <text x="290" y="75" fill="#f59e0b" font-size="10" font-family="system-ui, sans-serif" text-anchor="end">Threshold</text>

    <path d="M 35 115 L 70 115 L 85 45 L 95 180 L 105 75 L 120 150 L 140 100 L 180 125 L 240 115 L 300 115" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    <circle cx="85" cy="45" r="5" fill="#38bdf8"/>
    <text x="85" y="35" fill="#38bdf8" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Sharp Peak (+8dB)</text>

    <text x="167" y="200" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Intact explosive transient crack</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• High peak-to-average (crest) factor</text>
    <text x="167" y="238" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Dynamic range is wide and punchy</text>
  </g>

  <!-- Right: Fast Attack Waveform -->
  <g transform="translate(415, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#ef4444" stroke-width="2"/>
    <text x="167" y="30" fill="#ef4444" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Fast Attack (0.5 ms) Clamped</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <line x1="35" y1="115" x2="300" y2="115" stroke="#334155" stroke-dasharray="2 2"/>
    <line x1="35" y1="80" x2="300" y2="80" stroke="#f59e0b" stroke-dasharray="4 4"/>
    <text x="290" y="75" fill="#f59e0b" font-size="10" font-family="system-ui, sans-serif" text-anchor="end">Threshold</text>

    <path d="M 70 115 L 85 45 L 95 180" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="2 2"/>

    <path d="M 35 115 L 70 115 L 85 82 L 95 145 L 105 95 L 120 135 L 140 108 L 180 120 L 240 115 L 300 115" fill="none" stroke="#ef4444" stroke-width="3"/>
    <circle cx="85" cy="82" r="5" fill="#ef4444"/>
    <text x="85" y="65" fill="#ef4444" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Crushed Transient</text>

    <text x="167" y="200" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Initial strike peak attenuated instantly</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Tames aggressive peaks &amp; controls headroom</text>
    <text x="167" y="238" fill="#fca5a5" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Trade-off: Drum sounds smaller and pushed back</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Use fast attack (&lt; 1 ms) when peak safety or brickwall control is needed (limiting, de-essing, aggressive room mic squash).</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Avoid ultra-fast attack on main snare/kick if you want upfront acoustic "snap" and punch.</text>
</svg>`;

// 2. compressor_slow_attack_punch.svg
svgs['compressor_slow_attack_punch.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Slow Attack Time (10 ms - 40 ms): Preserving Transient Punch</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Initial transient passes through completely uncompressed; compression only clamps the ringing tail</text>

  <g transform="translate(60, 110)">
    <rect width="680" height="250" fill="#1e293b" rx="8" stroke="#334155"/>
    <rect x="20" y="20" width="640" height="210" fill="#0f172a" rx="6" stroke="#475569"/>

    <line x1="30" y1="125" x2="650" y2="125" stroke="#334155" stroke-dasharray="2 2"/>
    <line x1="30" y1="75" x2="650" y2="75" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 4"/>
    <text x="640" y="70" fill="#f59e0b" font-size="10" font-family="system-ui, sans-serif" text-anchor="end">Threshold</text>

    <!-- Zone 1: Attack Window (0 to 30ms) -->
    <rect x="100" y="30" width="110" height="190" fill="#34d399" fill-opacity="0.12" rx="4"/>
    <line x1="100" y1="30" x2="100" y2="220" stroke="#34d399" stroke-width="2" stroke-dasharray="3 3"/>
    <line x1="210" y1="30" x2="210" y2="220" stroke="#34d399" stroke-width="2" stroke-dasharray="3 3"/>
    <text x="155" y="48" fill="#34d399" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">30 ms Attack Window</text>
    <text x="155" y="63" fill="#a7f3d0" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">No gain reduction yet!</text>

    <!-- Zone 2: Compression Clamped Sustain -->
    <rect x="210" y="30" width="220" height="190" fill="#38bdf8" fill-opacity="0.08" rx="4"/>
    <text x="320" y="48" fill="#38bdf8" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Gain Reduction Engaged</text>
    <text x="320" y="63" fill="#93c5fd" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Sustain body attenuated (-6 dB)</text>

    <!-- Waveform: Full transient spike inside 30ms window, clamped after -->
    <path d="M 40 125 L 100 125 L 120 38 L 135 210 L 150 55 L 170 185 L 190 85 L 210 125 L 240 100 L 280 140 L 340 115 L 420 125 L 600 125" fill="none" stroke="#34d399" stroke-width="3"/>

    <circle cx="120" cy="38" r="6" fill="#34d399"/>
    <text x="120" y="28" fill="#34d399" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Full Initial "Crack" Preserved</text>

    <text x="320" y="160" fill="#f87171" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Controlled Ring / Boom</text>
    <line x1="320" y1="130" x2="320" y2="148" stroke="#f87171" stroke-width="1.5"/>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Formula for Punch: Slow Attack (20-40ms) + Makeup Gain turns drums into explosive, punchy hits.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">The transient cuts through cleanly before the compressor can react, accentuating the initial impact.</text>
</svg>`;

// 3. compressor_attack_envelope_definition.svg
svgs['compressor_attack_envelope_definition.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Compressor Envelope Anatomy: Attack vs Release</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Gain reduction curve response to signal exceeding and falling below threshold</text>

  <!-- Top Pane: Audio Input Signal -->
  <g transform="translate(60, 105)">
    <rect width="680" height="120" fill="#1e293b" rx="6" stroke="#334155"/>
    <text x="20" y="22" fill="#38bdf8" font-size="11" font-weight="bold" font-family="system-ui, sans-serif">1. Audio Input Signal &amp; Threshold</text>
    <line x1="40" y1="65" x2="640" y2="65" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="640" y="60" fill="#f59e0b" font-size="10" font-family="system-ui, sans-serif" text-anchor="end">Threshold (-18 dB)</text>

    <path d="M 40 100 L 140 100 L 160 35 L 380 35 L 400 100 L 640 100" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    <path d="M 160 35 L 380 35 L 400 100 L 140 100 Z" fill="#38bdf8" fill-opacity="0.1"/>
    <text x="270" y="55" fill="#ffffff" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Sound Exceeds Threshold</text>
  </g>

  <!-- Bottom Pane: Gain Reduction Envelope Curve -->
  <g transform="translate(60, 240)">
    <rect width="680" height="135" fill="#1e293b" rx="6" stroke="#334155"/>
    <text x="20" y="22" fill="#f43f5e" font-size="11" font-weight="bold" font-family="system-ui, sans-serif">2. Gain Reduction (dB GR) Response</text>
    <line x1="40" y1="40" x2="640" y2="40" stroke="#475569" stroke-width="1.5"/>
    <text x="35" y="44" fill="#94a3b8" font-size="9" font-family="system-ui, sans-serif" text-anchor="end">0 dB</text>
    <text x="35" y="110" fill="#f43f5e" font-size="9" font-family="system-ui, sans-serif" text-anchor="end">-10 dB</text>

    <path d="M 40 40 L 140 40 C 170 40, 190 105, 230 105 L 380 105 C 430 105, 480 40, 560 40 L 640 40" fill="none" stroke="#f43f5e" stroke-width="3"/>
    <path d="M 140 40 C 170 40, 190 105, 230 105 L 380 105 C 430 105, 480 40, 560 40 L 140 40 Z" fill="#f43f5e" fill-opacity="0.12"/>

    <!-- Attack Phase Marker -->
    <line x1="140" y1="25" x2="140" y2="120" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="2 2"/>
    <line x1="230" y1="25" x2="230" y2="120" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="2 2"/>
    <rect x="145" y="65" width="80" height="20" fill="#0f172a" rx="4" stroke="#fbbf24"/>
    <text x="185" y="79" fill="#fbbf24" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">ATTACK TIME</text>

    <!-- Release Phase Marker -->
    <line x1="380" y1="25" x2="380" y2="120" stroke="#34d399" stroke-width="1.5" stroke-dasharray="2 2"/>
    <line x1="560" y1="25" x2="560" y2="120" stroke="#34d399" stroke-width="1.5" stroke-dasharray="2 2"/>
    <rect x="420" y="65" width="100" height="20" fill="#0f172a" rx="4" stroke="#34d399"/>
    <text x="470" y="79" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">RELEASE TIME</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Attack = Reaction speed to begin gain reduction; Release = Recovery speed to return to 0 dB unity gain.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Attack and Release define the dynamic envelope and rhythmic "movement" of modern music mixing.</text>
</svg>`;

// 4. compressor_release_pumping_artifacts.svg
svgs['compressor_release_pumping_artifacts.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Fast Release Artifacts: "Pumping" &amp; "Breathing"</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">When release is set too fast, the compressor rushes back to unity between words/beats, swelling background noise</text>

  <g transform="translate(60, 110)">
    <rect width="680" height="250" fill="#1e293b" rx="8" stroke="#334155"/>
    <rect x="20" y="20" width="640" height="210" fill="#0f172a" rx="6" stroke="#475569"/>

    <line x1="30" y1="125" x2="650" y2="125" stroke="#334155" stroke-dasharray="2 2"/>

    <!-- Syllable 1 -->
    <path d="M 40 125 L 80 125 L 100 55 L 140 185 L 170 85 L 200 125" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="140" y="45" fill="#38bdf8" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Vocal Syllable 1</text>

    <!-- Fast Release Rush Up (Pumping Swell!) -->
    <path d="M 200 125 Q 230 85 270 85 Q 310 85 340 125" fill="none" stroke="#f43f5e" stroke-width="3"/>
    <path d="M 200 125 Q 230 85 270 85 Q 310 85 340 125 Z" fill="#f43f5e" fill-opacity="0.2"/>
    <text x="270" y="70" fill="#f43f5e" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">SWELL / PUMPING</text>
    <text x="270" y="105" fill="#fca5a5" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Breaths &amp; room noise rush up!</text>

    <!-- Syllable 2 -->
    <path d="M 340 125 L 370 125 L 390 60 L 430 175 L 460 90 L 490 125" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="430" y="50" fill="#38bdf8" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Vocal Syllable 2</text>

    <!-- Fast Release Rush Up 2 -->
    <path d="M 490 125 Q 520 85 560 85 Q 600 85 630 125" fill="none" stroke="#f43f5e" stroke-width="3"/>
    <path d="M 490 125 Q 520 85 560 85 Q 600 85 630 125 Z" fill="#f43f5e" fill-opacity="0.2"/>
    <text x="560" y="70" fill="#f43f5e" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">BREATH NOISE</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Release Time &lt; 50ms on vocals causes unnatural breathing and hiss modulation between pauses.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Solution: Lengthen release to 150-300ms or engage Program-Dependent "Auto" release for natural leveling.</text>
</svg>`;

// 5. compressor_bpm_to_ms_math.svg
svgs['compressor_bpm_to_ms_math.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Tempo-Synced Compressor Timing Formula</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Calculating musical note durations in milliseconds for attack and release settings</text>

  <g transform="translate(60, 110)">
    <rect width="680" height="85" fill="#1e293b" rx="8" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="340" y="35" fill="#38bdf8" font-size="16" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Quarter Note (1 Beat) Duration (ms) = 60,000 / BPM</text>
    <text x="340" y="60" fill="#cbd5e1" font-size="12" font-family="system-ui, sans-serif" text-anchor="middle">Example at 120 BPM:  60,000 ÷ 120 = 500 ms per quarter note</text>
  </g>

  <g transform="translate(60, 215)">
    <rect x="0" y="0" width="155" height="145" fill="#1e293b" rx="6" stroke="#334155"/>
    <text x="77" y="28" fill="#fbbf24" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">1/4 Note (Beat)</text>
    <text x="77" y="60" fill="#ffffff" font-size="18" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">500 ms</text>
    <text x="77" y="85" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Slow bus release</text>
    <text x="77" y="105" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Recovers once</text>
    <text x="77" y="120" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">every bar beat</text>

    <rect x="175" y="0" width="155" height="145" fill="#1e293b" rx="6" stroke="#334155"/>
    <text x="252" y="28" fill="#34d399" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">1/8 Note</text>
    <text x="252" y="60" fill="#ffffff" font-size="18" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">250 ms</text>
    <text x="252" y="85" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Classic mix release</text>
    <text x="252" y="105" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Pumps smoothly</text>
    <text x="252" y="120" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">with drum hits</text>

    <rect x="350" y="0" width="155" height="145" fill="#1e293b" rx="6" stroke="#334155"/>
    <text x="427" y="28" fill="#38bdf8" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">1/16 Note</text>
    <text x="427" y="60" fill="#ffffff" font-size="18" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">125 ms</text>
    <text x="427" y="85" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Snare drum release</text>
    <text x="427" y="105" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Lets go before</text>
    <text x="427" y="120" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">next 16th hit</text>

    <rect x="525" y="0" width="155" height="145" fill="#1e293b" rx="6" stroke="#334155"/>
    <text x="602" y="28" fill="#a78bfa" font-size="13" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">1/32 Note / Attack</text>
    <text x="602" y="60" fill="#ffffff" font-size="18" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">62.5 ms</text>
    <text x="602" y="85" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Attack window</text>
    <text x="602" y="105" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Surgical clamp</text>
    <text x="602" y="120" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">on fast transients</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">At 90 BPM: 60,000 ÷ 90 = 667 ms per beat. A 300 ms release represents roughly an eighth note.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Setting compressor release to return to 0 dB right before the next snare strike creates cohesive "groove glue".</text>
</svg>`;

// 6. compressor_low_frequency_distortion.svg
svgs['compressor_low_frequency_distortion.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Low Frequency Distortion with Ultra-Fast Release (&lt; 20 ms)</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">When compressor release is faster than the sound's wavelength period, it tracks and distorts the wave itself</text>

  <g transform="translate(50, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#334155"/>
    <text x="167" y="30" fill="#38bdf8" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">50 Hz Bass Wave (Period = 20 ms)</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <path d="M 35 115 Q 100 35 167 115 T 300 115" fill="none" stroke="#38bdf8" stroke-width="3"/>
    <line x1="35" y1="115" x2="300" y2="115" stroke="#334155" stroke-dasharray="2 2"/>

    <text x="167" y="198" fill="#38bdf8" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Full Cycle Period = 20 ms</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">A single cycle takes 20 ms to complete</text>
    <text x="167" y="234" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Pure fundamental sine tone (clean bass)</text>
  </g>

  <g transform="translate(415, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#ef4444" stroke-width="2"/>
    <text x="167" y="30" fill="#ef4444" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Fast Release (5 ms): Waveform Clipped</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <path d="M 35 115 L 75 75 L 125 75 L 167 115 L 205 155 L 255 155 L 300 115" fill="none" stroke="#ef4444" stroke-width="3"/>
    <line x1="35" y1="115" x2="300" y2="115" stroke="#334155" stroke-dasharray="2 2"/>

    <text x="167" y="198" fill="#ef4444" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Intra-Cycle Gain Modulation (THD!)</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="10" font-family="system-ui, sans-serif" text-anchor="middle">Compressor releases BEFORE wave finishes cycle</text>
    <text x="167" y="234" fill="#fca5a5" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Results in buzz, fuzz &amp; bass distortion</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Rule of Thumb: For bass guitar and 808 subs, set release to at least 50-100 ms.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Ultra-fast release times (&lt; 20 ms) modulate the fundamental waveform cycles, causing harmonic distortion.</text>
</svg>`;

// 7. compressor_transparent_auto_release.svg
svgs['compressor_transparent_auto_release.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Program-Dependent Auto-Release Behavior</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Dual-time constant curve: Fast recovery for brief spikes, slow recovery for sustained notes</text>

  <g transform="translate(60, 110)">
    <rect width="680" height="250" fill="#1e293b" rx="8" stroke="#334155"/>
    <rect x="20" y="20" width="640" height="210" fill="#0f172a" rx="6" stroke="#475569"/>

    <line x1="30" y1="50" x2="650" y2="50" stroke="#475569" stroke-width="1.5"/>
    <text x="35" y="45" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif">0 dB (Unity)</text>
    <text x="35" y="170" fill="#f43f5e" font-size="10" font-family="system-ui, sans-serif">-12 dB (GR)</text>

    <!-- Phase 1: Transient Peak -> Fast Recovery -->
    <path d="M 50 50 L 100 50 L 110 160 Q 140 160 170 50" fill="none" stroke="#38bdf8" stroke-width="3"/>
    <circle cx="110" cy="160" r="4" fill="#38bdf8"/>
    <text x="140" y="195" fill="#38bdf8" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Short Transient Peak</text>
    <text x="140" y="210" fill="#93c5fd" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Fast Release (40ms)</text>

    <!-- Phase 2: Sustained Loud Passage -> Slow Smooth Recovery -->
    <path d="M 230 50 L 260 50 L 270 160 L 420 160 C 470 160, 540 80, 620 50" fill="none" stroke="#34d399" stroke-width="3"/>
    <circle cx="270" cy="160" r="4" fill="#34d399"/>
    <text x="345" y="135" fill="#ffffff" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Sustained Musical Note</text>
    <text x="520" y="195" fill="#34d399" font-size="11" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Extended Slow Release (up to 2000ms)</text>
    <text x="520" y="210" fill="#a7f3d0" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Zero audible pumping or breathing</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Auto-Release is standard on the SSL G-Master Bus Compressor, Neve 33609, and Fairchild 670.</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">It adapts to the audio content in real time, delivering the most natural, transparent mix glue possible.</text>
</svg>`;

// 8. la2a_optical_photocell_response.svg
svgs['la2a_optical_photocell_response.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#0f172a" rx="12"/>
  <rect x="20" y="20" width="760" height="460" fill="none" stroke="#1e293b" stroke-width="2" rx="10"/>

  <text x="400" y="55" fill="#f8fafc" font-size="20" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Teletronix LA-2A: T4 Optical Cell Dynamics</text>
  <text x="400" y="80" fill="#94a3b8" font-size="13" font-family="system-ui, sans-serif" text-anchor="middle">Why vintage optical compressors have no Attack or Release knobs</text>

  <!-- Left: T4 Cell Hardware Diagram -->
  <g transform="translate(50, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#334155"/>
    <text x="167" y="30" fill="#fbbf24" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">T4 Electro-Optical Attenuator</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <!-- EL Panel -->
    <rect x="45" y="70" width="60" height="90" fill="#0284c7" rx="4"/>
    <text x="75" y="115" fill="#ffffff" font-size="9" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">EL PANEL</text>
    <text x="75" y="128" fill="#bae6fd" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">(Glows)</text>

    <!-- Photons -->
    <line x1="115" y1="100" x2="195" y2="100" stroke="#facc15" stroke-width="2" stroke-dasharray="3 3"/>
    <line x1="115" y1="115" x2="195" y2="115" stroke="#facc15" stroke-width="2" stroke-dasharray="3 3"/>
    <line x1="115" y1="130" x2="195" y2="130" stroke="#facc15" stroke-width="2" stroke-dasharray="3 3"/>
    <text x="155" y="90" fill="#facc15" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Light</text>

    <!-- Photocell (LDR) -->
    <rect x="205" y="70" width="75" height="90" fill="#065f46" rx="4"/>
    <text x="242" y="110" fill="#ffffff" font-size="9" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">PHOTOCELL</text>
    <text x="242" y="123" fill="#a7f3d0" font-size="8" font-family="system-ui, sans-serif" text-anchor="middle">(CdS Resistor)</text>
    <text x="242" y="136" fill="#a7f3d0" font-size="7" font-family="system-ui, sans-serif" text-anchor="middle">Variable Res.</text>

    <text x="167" y="200" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Attack: ~10 ms fixed by light response</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• Natural physical lag of Cadmium Sulfide</text>
  </g>

  <!-- Right: Multi-Stage Release Curve -->
  <g transform="translate(415, 110)">
    <rect width="335" height="260" fill="#1e293b" rx="8" stroke="#34d399" stroke-width="2"/>
    <text x="167" y="30" fill="#34d399" font-size="14" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">2-Stage Program-Dependent Release</text>

    <rect x="25" y="50" width="285" height="130" fill="#0f172a" rx="6" stroke="#475569"/>
    <!-- Curve -->
    <path d="M 35 150 L 55 50 C 70 50, 110 100, 140 100 C 180 100, 230 140, 295 150" fill="none" stroke="#34d399" stroke-width="3"/>
    <line x1="140" y1="50" x2="140" y2="160" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="2 2"/>
    <text x="140" y="42" fill="#f59e0b" font-size="9" font-family="system-ui, sans-serif" text-anchor="middle">Stage 1 (60 ms)</text>

    <text x="95" y="80" fill="#38bdf8" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">50% Fast Release</text>
    <text x="215" y="125" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif">Slow 1-5s Decay Tail</text>

    <text x="167" y="200" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• 1st Stage: Releases first 50% in ~60 ms</text>
    <text x="167" y="218" fill="#cbd5e1" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">• 2nd Stage: Takes up to 5 seconds to fully recover</text>
    <text x="167" y="238" fill="#34d399" font-size="10" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Legendary vocal leveling with zero harsh artifacts</text>
  </g>

  <!-- Summary Box -->
  <rect x="50" y="390" width="700" height="60" fill="#1e293b" rx="6"/>
  <text x="400" y="415" fill="#f8fafc" font-size="12" font-weight="bold" font-family="system-ui, sans-serif" text-anchor="middle">Only 2 primary knobs on LA-2A: Peak Reduction (controls threshold) and Gain (makeup gain).</text>
  <text x="400" y="435" fill="#94a3b8" font-size="11" font-family="system-ui, sans-serif" text-anchor="middle">Attack and release are entirely dictated by the optical physics of the T4 electro-luminescent cell.</text>
</svg>`;

// Write all generated files
for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(explDir, filename), content);
  console.log(`Created ${filename} (${content.length} bytes)`);
}

// Replace attack_release_envelope.png with valid svg-compatible content
fs.writeFileSync(path.join(explDir, 'attack_release_envelope.png'), svgs['compressor_attack_envelope_definition.svg']);
console.log('Replaced attack_release_envelope.png with real envelope diagram content');
