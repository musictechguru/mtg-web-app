"""
Generates 18 elegant, dark-mode vector technical schematics and diagrams for The Bass Guitar.
Topic: Edexcel Component 3 - The Bass Guitar (Physics, Anatomy, History, Electronics, DI & Amplification).
Design standard: True visual diagrams, circuits, waveforms, graphs, and schematics.
Zero text overflow, 100% valid XML with numeric entities.
"""
import os
import xml.etree.ElementTree as ET

OUT_DIR = "public/images/slides/the_bass_guitar"
os.makedirs(OUT_DIR, exist_ok=True)

svgs = {}

# 1. BASS ANATOMY & SCALE LENGTH
svgs["bass_anatomy_and_scale_length.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#080e1a"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="760" height="400" rx="12" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 INSTRUMENT ANATOMY &amp; SCALE LENGTH</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Mersenne's Law: Scale Length vs String Tension</text>

  <!-- Formula Badge -->
  <g transform="translate(520, 20)">
    <rect width="205" height="48" rx="8" fill="#1e293b" stroke="rgba(56,189,248,0.3)"/>
    <text x="102" y="22" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">MERSENNE'S LAW</text>
    <text x="102" y="39" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">f = (1 / 2L) &#8730;(T / &#956;)</text>
  </g>

  <!-- 34" Long Scale (Fender P/J Standard) -->
  <g transform="translate(35, 95)">
    <rect width="690" height="125" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="20" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="14" font-weight="800">34-INCH LONG SCALE (Fender Standard)</text>
    <text x="540" y="28" fill="#34d399" font-family="system-ui, sans-serif" font-size="12" font-weight="700">Tension: ~42 lbs / string</text>

    <!-- Headstock & Nut -->
    <rect x="20" y="48" width="14" height="46" rx="2" fill="#94a3b8"/>
    <text x="27" y="108" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Nut</text>

    <!-- Fretboard / Neck -->
    <rect x="34" y="56" width="560" height="30" fill="#1e293b" stroke="#334155"/>
    <line x1="80" y1="56" x2="80" y2="86" stroke="#475569" stroke-width="1"/>
    <line x1="130" y1="56" x2="130" y2="86" stroke="#475569" stroke-width="1"/>
    <line x1="185" y1="56" x2="185" y2="86" stroke="#475569" stroke-width="1"/>
    <line x1="250" y1="56" x2="250" y2="86" stroke="#475569" stroke-width="1"/>
    <line x1="330" y1="56" x2="330" y2="86" stroke="#475569" stroke-width="1"/>
    <line x1="420" y1="56" x2="420" y2="86" stroke="#475569" stroke-width="1"/>

    <!-- 12th Fret Octave Node -->
    <line x1="314" y1="52" x2="314" y2="90" stroke="#f59e0b" stroke-width="2"/>
    <text x="314" y="108" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">12th Fret (L / 2)</text>

    <!-- Bridge -->
    <rect x="594" y="48" width="18" height="46" rx="3" fill="#cbd5e1"/>
    <text x="603" y="108" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Bridge</text>

    <!-- Vibrating String (Vibrant Standing Wave) -->
    <path d="M 27 71 Q 314 42 603 71" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    <path d="M 27 71 Q 314 100 603 71" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>

    <!-- Acoustic Result Tag -->
    <text x="670" y="75" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="end">Tight punch &#8226; Piano-like sustain &#8226; Articulate attack</text>
  </g>

  <!-- 30" Short Scale (Hofner / Gibson EB-3) -->
  <g transform="translate(35, 235)">
    <rect width="690" height="125" rx="8" fill="#131e36" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="20" y="28" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="14" font-weight="800">30-INCH SHORT SCALE (H&#246;fner / Gibson EB-3)</text>
    <text x="540" y="28" fill="#f87171" font-family="system-ui, sans-serif" font-size="12" font-weight="700">Tension: ~31 lbs / string</text>

    <!-- Nut -->
    <rect x="20" y="48" width="14" height="46" rx="2" fill="#94a3b8"/>
    <text x="27" y="108" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Nut</text>

    <!-- Neck -->
    <rect x="34" y="56" width="470" height="30" fill="#1e293b" stroke="#334155"/>
    <line x1="80" y1="56" x2="80" y2="86" stroke="#475569" stroke-width="1"/>
    <line x1="130" y1="56" x2="130" y2="86" stroke="#475569" stroke-width="1"/>
    <line x1="185" y1="56" x2="185" y2="86" stroke="#475569" stroke-width="1"/>
    <line x1="250" y1="56" x2="250" y2="86" stroke="#475569" stroke-width="1"/>

    <!-- 12th Fret -->
    <line x1="269" y1="52" x2="269" y2="90" stroke="#f59e0b" stroke-width="2"/>
    <text x="269" y="108" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">12th Fret</text>

    <!-- Bridge -->
    <rect x="504" y="48" width="18" height="46" rx="3" fill="#cbd5e1"/>
    <text x="513" y="108" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Bridge</text>

    <!-- Vibrating String (Wider Floppier Wave) -->
    <path d="M 27 71 Q 269 35 513 71" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
    <path d="M 27 71 Q 269 107 513 71" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>

    <!-- Acoustic Result Tag -->
    <text x="670" y="75" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="end">Warm, tubby thud &#8226; Rapid fundamental decay</text>
  </g>

  <!-- Summary Footer -->
  <text x="380" y="385" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Longer scale length requires higher string tension for identical pitch &#8594; higher harmonic clarity and attack speed.</text>
</svg>'''

# 2. BASS LOW FREQUENCY PHYSICS
svgs["bass_low_frequency_physics.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 ACOUSTIC PHYSICS &amp; WAVELENGTHS</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Acoustic Wavelength (&#955; = v / f) at Speed of Sound (343 m/s)</text>

  <!-- Graph Canvas -->
  <g transform="translate(35, 90)">
    <rect width="690" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>

    <!-- Distance Grid Markers -->
    <line x1="80" y1="30" x2="80" y2="230" stroke="#1e293b" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="230" y1="30" x2="230" y2="230" stroke="#1e293b" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="420" y1="30" x2="420" y2="230" stroke="#1e293b" stroke-width="1" stroke-dasharray="3 3"/>
    <line x1="620" y1="30" x2="620" y2="230" stroke="#1e293b" stroke-width="1" stroke-dasharray="3 3"/>

    <!-- Wavelength 1: 5-String Low B (30.9 Hz) -->
    <g transform="translate(30, 25)">
      <rect width="630" height="48" rx="6" fill="#1e293b"/>
      <circle cx="20" cy="24" r="10" fill="#e11d48"/>
      <text x="20" y="28" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">B0</text>
      <text x="40" y="22" fill="#f87171" font-family="system-ui, sans-serif" font-size="12" font-weight="800">30.9 Hz (5-String Low-B)</text>
      <text x="40" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Wavelength: 11.10 Metres (Exceeds standard studio room dimensions!)</text>
      <path d="M 360 24 Q 420 5 480 24 T 600 24" fill="none" stroke="#e11d48" stroke-width="2.5"/>
    </g>

    <!-- Wavelength 2: Standard 4-String Low E (41.2 Hz) -->
    <g transform="translate(30, 85)">
      <rect width="630" height="48" rx="6" fill="#1e293b"/>
      <circle cx="20" cy="24" r="10" fill="#f59e0b"/>
      <text x="20" y="28" fill="#080e1a" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">E1</text>
      <text x="40" y="22" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="12" font-weight="800">41.2 Hz (Standard Bass Low-E)</text>
      <text x="40" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Wavelength: 8.32 Metres (Forms heavy room standing waves &amp; nodes)</text>
      <path d="M 360 24 Q 400 6 440 24 T 520 24 T 600 24" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
    </g>

    <!-- Wavelength 3: Bass Punch / Upper Lows (100 Hz) -->
    <g transform="translate(30, 145)">
      <rect width="630" height="48" rx="6" fill="#1e293b"/>
      <circle cx="20" cy="24" r="10" fill="#38bdf8"/>
      <text x="20" y="28" fill="#080e1a" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">G2</text>
      <text x="40" y="22" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800">100 Hz (Chest Punch &amp; Kick Alignment)</text>
      <text x="40" y="38" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Wavelength: 3.43 Metres (Primary speaker cabinet port resonance)</text>
      <path d="M 360 24 Q 380 8 400 24 T 440 24 T 480 24 T 520 24 T 560 24 T 600 24" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    </g>

    <!-- Studio Boundary Note -->
    <rect x="30" y="205" width="630" height="38" rx="4" fill="#142038" stroke="rgba(56,189,248,0.3)"/>
    <text x="345" y="228" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Massive acoustic wavelengths require bass traps in control rooms and enormous speaker cone excursion.</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Air temperature: 20&#176;C &#8226; Speed of sound: c = 343 m/s &#8226; Edexcel Component 3 Physics</text>
</svg>'''

# 3. ACOUSTIC DOUBLE BASS VS SOLIDBODY ELECTRIC COMPARISON
svgs["acoustic_double_bass_vs_electric_comparison.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO4 HISTORICAL PROBLEM &amp; SOLUTION</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Upright Double Bass vs Solidbody Fender Precision (1951)</text>

  <!-- Left: Acoustic Upright Bass -->
  <g transform="translate(35, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#f87171" stroke-width="1.5"/>
    <text x="20" y="30" fill="#f87171" font-family="system-ui, sans-serif" font-size="14" font-weight="800">Acoustic Upright Double Bass</text>

    <!-- Upright Graphic Representation -->
    <path d="M 60 70 C 40 100 40 120 70 140 C 30 170 30 200 65 220 L 85 220 C 120 200 120 170 80 140 C 110 120 110 100 90 70 Z" fill="#2d1b14" stroke="#a16207" stroke-width="2"/>
    <!-- F-Holes -->
    <path d="M 65 130 Q 60 140 68 150" stroke="#f59e0b" stroke-width="2" fill="none"/>
    <path d="M 85 130 Q 90 140 82 150" stroke="#f59e0b" stroke-width="2" fill="none"/>

    <!-- Acoustic Feedback Loop -->
    <path d="M 120 140 C 150 110 160 80 130 65" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 2"/>
    <text x="135" y="105" fill="#f87171" font-family="system-ui, sans-serif" font-size="10" font-weight="700">Acoustic Feedback!</text>

    <!-- Bullets -->
    <text x="155" y="140" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; Hollow resonant body cavity</text>
    <text x="155" y="165" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; Stage mic feedback howl</text>
    <text x="155" y="190" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; Fretless intonation drift</text>
    <text x="155" y="215" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; Hard to transport (&gt;6 ft tall)</text>

    <rect x="20" y="232" width="295" height="24" rx="4" fill="#2c1618"/>
    <text x="167" y="248" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Cannot compete with loud drum kits</text>
  </g>

  <!-- Right: 1951 Fender Precision Bass -->
  <g transform="translate(390, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#34d399" stroke-width="1.5"/>
    <text x="20" y="30" fill="#34d399" font-family="system-ui, sans-serif" font-size="14" font-weight="800">1951 Fender Precision Bass</text>

    <!-- Solidbody Graphic Representation -->
    <path d="M 60 80 C 45 95 45 115 70 135 C 40 160 50 200 80 215 L 95 215 C 125 200 130 160 100 135 C 120 115 120 95 105 80 Z" fill="#78350f" stroke="#fbbf24" stroke-width="2"/>
    <!-- Frets & Pickup -->
    <rect x="75" y="55" width="10" height="25" fill="#cbd5e1"/>
    <rect x="70" y="130" width="20" height="12" fill="#0f172a" stroke="#38bdf8"/>

    <!-- Direct Electromagnetic Wave -->
    <path d="M 105 136 L 145 136" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="110" y="125" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="9" font-weight="800">EM Pickup</text>

    <!-- Bullets -->
    <text x="155" y="140" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; Solid dense ash slab body</text>
    <text x="155" y="165" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; Zero acoustic body feedback</text>
    <text x="155" y="190" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; 20 nickel frets (exact pitch)</text>
    <text x="155" y="215" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; High-output magnetic coil</text>

    <rect x="20" y="232" width="295" height="24" rx="4" fill="#063826"/>
    <text x="167" y="248" fill="#6ee7b7" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Clean, amplified punch at any stage volume</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Leo Fender's innovation birthed the modern rock, soul, and pop rhythm section.</text>
</svg>'''

# 4. P-BASS SPLIT-COIL RWRP HUM CANCELLATION
svgs["p_bass_split_coil_rwrp_physics.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 TRANSDUCER PHYSICS &amp; NOISE CANCELLATION</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">1957 Split-Coil Pickup: Reverse-Wind Reverse-Polarity (RWRP)</text>

  <!-- Left Side: Ambient EMI (Hum) Cancellation -->
  <g transform="translate(35, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#f87171" stroke-width="1.5"/>
    <text x="20" y="28" fill="#f87171" font-family="system-ui, sans-serif" font-size="13" font-weight="800">50/60 Hz MAINS HUM CANCELLATION</text>

    <!-- Coil 1 (E-A) Hum -->
    <g transform="translate(20, 50)">
      <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#334155"/>
      <path d="M 20 20 Q 40 5 60 20 T 100 20 T 140 20" fill="none" stroke="#ef4444" stroke-width="2"/>
      <text x="195" y="24" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Coil 1 (+Hum)</text>
    </g>

    <text x="110" y="115" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">+</text>

    <!-- Coil 2 (D-G) Hum (Inverted by Reverse Winding) -->
    <g transform="translate(20, 130)">
      <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#334155"/>
      <path d="M 20 20 Q 40 35 60 20 T 100 20 T 140 20" fill="none" stroke="#ef4444" stroke-width="2"/>
      <text x="195" y="24" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Coil 2 (&#8722;Hum)</text>
    </g>

    <text x="110" y="195" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">=</text>

    <!-- Result: 0V Flat Line -->
    <g transform="translate(20, 210)">
      <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#34d399"/>
      <line x1="20" y1="20" x2="160" y2="20" stroke="#34d399" stroke-width="3"/>
      <text x="195" y="24" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="800">ZERO HUM (0V)</text>
    </g>
  </g>

  <!-- Right Side: String Audio Signal Summation -->
  <g transform="translate(390, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#34d399" stroke-width="1.5"/>
    <text x="20" y="28" fill="#34d399" font-family="system-ui, sans-serif" font-size="13" font-weight="800">STRING AUDIO SIGNAL ADDITION</text>

    <!-- Coil 1 Audio -->
    <g transform="translate(20, 50)">
      <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#334155"/>
      <path d="M 20 20 Q 40 8 60 20 T 100 20 T 140 20" fill="none" stroke="#38bdf8" stroke-width="2"/>
      <text x="195" y="24" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Coil 1 (+Audio)</text>
    </g>

    <text x="110" y="115" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">+</text>

    <!-- Coil 2 Audio (Re-inverted in-phase by Reverse Magnet!) -->
    <g transform="translate(20, 130)">
      <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#334155"/>
      <path d="M 20 20 Q 40 8 60 20 T 100 20 T 140 20" fill="none" stroke="#38bdf8" stroke-width="2"/>
      <text x="195" y="24" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Coil 2 (+Audio)</text>
    </g>

    <text x="110" y="195" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">=</text>

    <!-- Doubled Audio Wave -->
    <g transform="translate(20, 210)">
      <rect width="180" height="40" rx="4" fill="#1e293b" stroke="#fbbf24"/>
      <path d="M 20 20 Q 40 2 60 20 T 100 20 T 140 20" fill="none" stroke="#fbbf24" stroke-width="3"/>
      <text x="195" y="24" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800">DOUBLED (+6 dB)</text>
    </g>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Reverse winding inverts hum 180&#176;; opposite magnetic polarity restores musical string signal in-phase.</text>
</svg>'''

# 5. FENDER JAZZ BASS DUAL PICKUP PARALLEL WIRING & MID-SCOOP
svgs["jazz_bass_dual_single_coil_wiring.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 CIRCUIT WIRING &amp; FREQUENCY INTERACTION</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Fender Jazz Bass (1960): Dual Pickups &amp; Signature Mid-Scoop</text>

  <!-- Left: Schematic Circuit -->
  <g transform="translate(35, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="20" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">PARALLEL DUAL-VOLUME CIRCUIT</text>

    <!-- Neck Pickup Block -->
    <rect x="25" y="48" width="120" height="34" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="85" y="69" fill="#93c5fd" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Neck Pickup (Warm)</text>

    <!-- Bridge Pickup Block -->
    <rect x="25" y="100" width="120" height="34" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="85" y="121" fill="#fbcfe8" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Bridge Pickup (Bite)</text>

    <!-- Parallel Connection Lines -->
    <path d="M 145 65 L 185 65 L 185 92 L 205 92" fill="none" stroke="#38bdf8" stroke-width="2"/>
    <path d="M 145 117 L 185 117 L 185 92" fill="none" stroke="#38bdf8" stroke-width="2"/>

    <!-- Pots -->
    <rect x="205" y="75" width="105" height="34" rx="4" fill="#1e293b" stroke="#f59e0b"/>
    <text x="257" y="96" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">250k&#937; Dual Vol</text>

    <!-- Master Tone -->
    <rect x="115" y="160" width="140" height="34" rx="4" fill="#1e293b" stroke="#a855f7"/>
    <text x="185" y="181" fill="#c084fc" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Tone (250k + .047&#956;F)</text>

    <!-- Output Jack -->
    <rect x="115" y="215" width="140" height="32" rx="4" fill="#047857"/>
    <text x="185" y="235" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">1/4" High-Z Out</text>
  </g>

  <!-- Right: Frequency Curve (The Mid-Scoop) -->
  <g transform="translate(390, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="20" y="28" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="13" font-weight="800">FREQUENCY RESPONSE: BOTH VOLS AT 10</text>

    <!-- Graph Axis -->
    <line x1="40" y1="210" x2="300" y2="210" stroke="#475569" stroke-width="1.5"/>
    <line x1="40" y1="50" x2="40" y2="210" stroke="#475569" stroke-width="1.5"/>
    <text x="40" y="228" fill="#64748b" font-family="system-ui, sans-serif" font-size="9">40 Hz</text>
    <text x="155" y="228" fill="#64748b" font-family="system-ui, sans-serif" font-size="9">700 Hz</text>
    <text x="280" y="228" fill="#64748b" font-family="system-ui, sans-serif" font-size="9">5 kHz</text>

    <!-- Individual Pickup Curve (Ghosted) -->
    <path d="M 40 100 Q 155 90 300 170" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="295" y="165" fill="#64748b" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">Solo Pickup</text>

    <!-- Both Pickups On (The Classic Scoop!) -->
    <path d="M 40 85 Q 90 80 120 100 Q 160 160 200 100 Q 240 80 300 160" fill="none" stroke="#f59e0b" stroke-width="3"/>

    <!-- Mid Scoop Callout -->
    <circle cx="160" cy="160" r="5" fill="#e11d48"/>
    <path d="M 160 160 L 190 190" stroke="#ef4444" stroke-width="1.5"/>
    <text x="195" y="195" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800">-3 dB Mid Scoop (~700 Hz)</text>
    <text x="195" y="210" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9">Phase cancellation between pickups</text>

    <rect x="25" y="235" width="285" height="20" rx="3" fill="#1e293b"/>
    <text x="167" y="249" fill="#fde047" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" text-anchor="middle">Iconic Slap &amp; Funk Tone: Fat lows + Crisp attack sparkle</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Pickup spacing causes comb filtering; parallel wiring lowers circuit impedance.</text>
</svg>'''

# 6. BASS PICKUP PLACEMENT & TIMBRE
svgs["bass_pickup_placement_timbre.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 TRANSDUCER PLACEMENT &amp; HARMONIC NODES</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">How Pickup Position Dictates Harmonic Overtone Sampling</text>

  <!-- String Vibration Nodes Visual -->
  <g transform="translate(35, 90)">
    <rect width="690" height="260" rx="8" fill="#131e36" stroke="#334155" stroke-width="1"/>

    <!-- Nut to Bridge String Span -->
    <line x1="50" y1="50" x2="640" y2="50" stroke="#64748b" stroke-width="1"/>
    <text x="50" y="35" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">12th Fret (Octave)</text>
    <text x="640" y="35" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="end">Bridge</text>

    <!-- Fundamental Wave -->
    <path d="M 50 80 Q 345 30 640 80" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="50" y="105" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Fundamental Mode (Large Excursion)</text>

    <!-- 2nd Harmonic Wave -->
    <path d="M 50 135 Q 197 110 345 135 Q 492 160 640 135" fill="none" stroke="#f59e0b" stroke-width="2"/>
    <text x="50" y="158" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">2nd Harmonic (Punch &amp; Growl)</text>

    <!-- Three Transducer Positions -->
    <!-- Position 1: Neck (Gibson Mudbucker / EB-0) -->
    <g transform="translate(140, 180)">
      <rect width="130" height="65" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="65" y="20" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">NECK POSITION</text>
      <text x="65" y="38" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5" text-anchor="middle">High fundamental</text>
      <text x="65" y="52" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Deep, warm, tubby</text>
    </g>

    <!-- Position 2: Middle (P-Bass Sweet Spot) -->
    <g transform="translate(330, 180)">
      <rect width="130" height="65" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
      <text x="65" y="20" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">P-BASS "SWEET SPOT"</text>
      <text x="65" y="38" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5" text-anchor="middle">Equal fun/harmonics</text>
      <text x="65" y="52" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Maximum mix cut</text>
    </g>

    <!-- Position 3: Bridge (Jazz Bass / StingRay) -->
    <g transform="translate(520, 180)">
      <rect width="130" height="65" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="65" y="20" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">BRIDGE POSITION</text>
      <text x="65" y="38" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5" text-anchor="middle">Dense upper harmonics</text>
      <text x="65" y="52" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Nasal, biting, Jaco tone</text>
    </g>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Near bridge, string excursion is physically restricted, reducing low fundamental amplitude.</text>
</svg>'''

# 7. FLATWOUND VS ROUNDWOUND FREQUENCY RESPONSE
svgs["flatwound_vs_roundwound_frequency_response.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 STRING CONSTRUCTION &amp; TIMBRE</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Flatwound vs Roundwound: Cross-Section &amp; Frequency Curves</text>

  <!-- Top: Cross-Section Anatomy -->
  <g transform="translate(35, 85)">
    <!-- Roundwound -->
    <g transform="translate(0, 0)">
      <rect width="335" height="90" rx="8" fill="#131e36" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="20" y="24" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="12" font-weight="800">ROUNDWOUND STRING (Steel Ribs)</text>
      <!-- Core -->
      <circle cx="60" cy="55" r="14" fill="#94a3b8"/>
      <!-- Round Windings -->
      <circle cx="36" cy="55" r="7" fill="#cbd5e1" stroke="#475569"/>
      <circle cx="84" cy="55" r="7" fill="#cbd5e1" stroke="#475569"/>
      <circle cx="60" cy="31" r="7" fill="#cbd5e1" stroke="#475569"/>
      <circle cx="60" cy="79" r="7" fill="#cbd5e1" stroke="#475569"/>
      <text x="110" y="48" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; Round outer wire with gaps</text>
      <text x="110" y="66" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; Bright harmonics &amp; sustain</text>
    </g>

    <!-- Flatwound -->
    <g transform="translate(355, 0)">
      <rect width="335" height="90" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="20" y="24" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800">FLATWOUND STRING (Ribbon Wrap)</text>
      <!-- Core -->
      <circle cx="60" cy="55" r="14" fill="#94a3b8"/>
      <!-- Ribbon Wrap -->
      <rect x="36" y="32" width="48" height="46" rx="6" fill="none" stroke="#cbd5e1" stroke-width="6"/>
      <text x="110" y="48" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; Flat polished ribbon wire</text>
      <text x="110" y="66" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; Muted highs, zero squeak</text>
    </g>
  </g>

  <!-- Bottom: Frequency Response Comparison Graph -->
  <g transform="translate(35, 190)">
    <rect width="690" height="160" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>

    <!-- Graph Axis -->
    <line x1="50" y1="130" x2="640" y2="130" stroke="#475569" stroke-width="1.5"/>
    <line x1="50" y1="20" x2="50" y2="130" stroke="#475569" stroke-width="1.5"/>
    <text x="50" y="145" fill="#64748b" font-family="system-ui, sans-serif" font-size="9">40 Hz</text>
    <text x="200" y="145" fill="#64748b" font-family="system-ui, sans-serif" font-size="9">200 Hz</text>
    <text x="380" y="145" fill="#64748b" font-family="system-ui, sans-serif" font-size="9">1 kHz</text>
    <text x="540" y="145" fill="#64748b" font-family="system-ui, sans-serif" font-size="9">4 kHz</text>
    <text x="630" y="145" fill="#64748b" font-family="system-ui, sans-serif" font-size="9">10 kHz</text>

    <!-- Flatwound Curve (Heavy low end, steep cutoff) -->
    <path d="M 50 35 Q 160 30 260 55 T 420 115 T 640 128" fill="none" stroke="#38bdf8" stroke-width="3"/>
    <text x="260" y="45" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Flatwounds (Motown, Soul, Reggae)</text>

    <!-- Roundwound Curve (Extended high-end presence peak) -->
    <path d="M 50 50 Q 200 45 350 48 T 520 35 T 640 100" fill="none" stroke="#f59e0b" stroke-width="3"/>
    <text x="520" y="25" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Roundwounds (Rock, Slap, Metal)</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Flatwounds provide massive low-end fundamental thump; roundwounds provide aggressive upper-mid snap.</text>
</svg>'''

# 8. PASSIVE VS ACTIVE BASS ELECTRONICS
svgs["active_vs_passive_bass_preamp.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 INSTRUMENT ELECTRONICS &amp; PREAMPS</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Passive (High-Z) vs Active 9V (Low-Z) Architecture</text>

  <!-- Left: Passive Circuit -->
  <g transform="translate(35, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="20" y="28" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="13" font-weight="800">PASSIVE BASS (e.g. 1957 P-Bass)</text>

    <!-- Signal Blocks -->
    <rect x="25" y="48" width="120" height="34" rx="4" fill="#1e293b" stroke="#475569"/>
    <text x="85" y="69" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">Passive Pickup</text>

    <path d="M 145 65 L 180 65" stroke="#94a3b8" stroke-width="2"/>

    <rect x="180" y="48" width="130" height="34" rx="4" fill="#1e293b" stroke="#475569"/>
    <text x="245" y="69" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">250k&#937; Vol + Tone RC</text>

    <!-- Output -->
    <rect x="80" y="105" width="175" height="30" rx="4" fill="#1e293b" stroke="#ef4444"/>
    <text x="167" y="124" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">High-Z Output (10k&#937;&#8211;20k&#937;)</text>

    <!-- Cable Loss Visual -->
    <path d="M 167 135 L 167 165" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
    <rect x="25" y="165" width="285" height="50" rx="4" fill="#2c1618"/>
    <text x="167" y="185" fill="#f87171" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">Cable Capacitance Treble Loss!</text>
    <text x="167" y="202" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Long stage cables roll off high frequencies above 3 kHz</text>

    <text x="25" y="245" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">&#8226; Tone control can only CUT frequencies</text>
  </g>

  <!-- Right: Active 9V Circuit -->
  <g transform="translate(390, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="20" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">ACTIVE BASS (1976 Music Man StingRay)</text>

    <!-- Signal Blocks -->
    <rect x="25" y="48" width="105" height="34" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="77" y="69" fill="#93c5fd" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Humbucker</text>

    <path d="M 130 65 L 155 65" stroke="#38bdf8" stroke-width="2"/>

    <!-- Op-Amp Preamp -->
    <rect x="155" y="45" width="155" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="232" y="63" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">9V Active Op-Amp</text>
    <text x="232" y="78" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Baxandall Boost &amp; Cut EQ</text>

    <!-- Output -->
    <rect x="80" y="105" width="175" height="30" rx="4" fill="#1e293b" stroke="#34d399"/>
    <text x="167" y="124" fill="#6ee7b7" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Low-Z Output (&lt;1k&#937;)</text>

    <!-- Long Cable Drive -->
    <path d="M 167 135 L 167 165" stroke="#34d399" stroke-width="2"/>
    <rect x="25" y="165" width="285" height="50" rx="4" fill="#063826"/>
    <text x="167" y="185" fill="#34d399" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">Zero Cable Treble Loss!</text>
    <text x="167" y="202" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Low output impedance drives 50m cables with full top-end</text>

    <text x="25" y="245" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10">&#8226; Active EQ can BOOST frequencies (+12 dB)</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Active preamps decouple pickup inductance from cable capacitance.</text>
</svg>'''

# 9. 1976 MUSIC MAN STINGRAY PREAMP SCHEMATIC
svgs["music_man_stingray_preamp_schematic.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 ACTIVE CIRCUIT TOPOLOGY (1976)</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Music Man StingRay 2-Band Active Preamp Circuit Schematic</text>

  <!-- Schematic Box -->
  <g transform="translate(35, 90)">
    <rect width="690" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>

    <!-- 9V Battery Rail -->
    <line x1="60" y1="35" x2="630" y2="35" stroke="#ef4444" stroke-width="2"/>
    <text x="60" y="25" fill="#f87171" font-family="system-ui, sans-serif" font-size="11" font-weight="800">+9V DC Battery Rail</text>

    <!-- Ground Rail -->
    <line x1="60" y1="225" x2="630" y2="225" stroke="#64748b" stroke-width="2"/>
    <text x="60" y="245" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" font-weight="800">Ground (0V)</text>

    <!-- Pickup Stage -->
    <rect x="50" y="90" width="100" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="100" y="118" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">MM Alnico</text>
    <text x="100" y="136" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Humbucker</text>

    <!-- Input Lead -->
    <path d="M 150 125 L 210 125" stroke="#38bdf8" stroke-width="2"/>

    <!-- Op-Amp Triangle (LM4250) -->
    <g transform="translate(210, 80)">
      <polygon points="0,0 0,90 80,45" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
      <text x="25" y="42" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="14" font-weight="700">&#8722;</text>
      <text x="25" y="62" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="14" font-weight="700">+</text>
      <text x="35" y="50" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="9" font-weight="800">OP-AMP</text>
    </g>

    <!-- Active Baxandall Feedback Loop -->
    <g transform="translate(320, 60)">
      <rect width="180" height="130" rx="6" fill="#131e36" stroke="#10b981" stroke-width="1.5"/>
      <text x="90" y="24" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">BAXANDALL TONE STACK</text>

      <!-- Bass Control -->
      <rect x="20" y="40" width="140" height="32" rx="4" fill="#1e293b"/>
      <text x="90" y="60" fill="#fde047" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Bass Pot: &#177;12 dB @ 50 Hz</text>

      <!-- Treble Control -->
      <rect x="20" y="80" width="140" height="32" rx="4" fill="#1e293b"/>
      <text x="90" y="100" fill="#fde047" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Treble Pot: &#177;12 dB @ 4 kHz</text>
    </g>

    <!-- Op-amp Out to Jack -->
    <path d="M 290 125 L 320 125" stroke="#38bdf8" stroke-width="2"/>
    <path d="M 500 125 L 560 125" stroke="#38bdf8" stroke-width="2"/>

    <!-- Low-Z Out Jack -->
    <rect x="560" y="105" width="90" height="40" rx="6" fill="#047857"/>
    <text x="605" y="130" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Low-Z Out</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">The active feedback loop allows independent boost and cut of low and high shelves with zero hum.</text>
</svg>'''

# 10. SLAP & POP DYNAMIC BIOMECHANICS
svgs["slap_and_pop_technique_mechanics.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 PERFORMANCE TECHNIQUE &amp; DYNAMICS</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Larry Graham (1969): Slap &amp; Pop Biomechanics</text>

  <!-- Left: The Slap (Thumb) -->
  <g transform="translate(35, 90)">
    <rect width="335" height="150" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="20" y="26" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">THE SLAP ("THUMP" &#8226; KICK DRUM)</text>

    <!-- Fretboard & String -->
    <rect x="25" y="55" width="285" height="16" fill="#1e293b" stroke="#334155"/>
    <line x1="25" y1="46" x2="310" y2="46" stroke="#cbd5e1" stroke-width="3"/>

    <!-- Thumb Strike Vector -->
    <path d="M 120 18 L 120 44" stroke="#ef4444" stroke-width="3"/>
    <polygon points="120,48 115,38 125,38" fill="#ef4444"/>
    <text x="135" y="32" fill="#f87171" font-family="system-ui, sans-serif" font-size="10" font-weight="800">Thumb Strike</text>

    <text x="25" y="98" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; Bony thumb joint hammers string into metal fret</text>
    <text x="25" y="118" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; Produces massive low-frequency transient spike</text>
    <text x="25" y="136" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10" font-weight="700">Simulates acoustic kick drum in rhythm section</text>
  </g>

  <!-- Right: The Pop (Index Finger) -->
  <g transform="translate(390, 90)">
    <rect width="335" height="150" rx="8" fill="#131e36" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="20" y="26" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="13" font-weight="800">THE POP ("PLUCK" &#8226; SNARE DRUM)</text>

    <!-- Fretboard & String -->
    <rect x="25" y="55" width="285" height="16" fill="#1e293b" stroke="#334155"/>
    <line x1="25" y1="46" x2="310" y2="46" stroke="#cbd5e1" stroke-width="2"/>

    <!-- Finger Pull Vector -->
    <path d="M 210 46 L 210 20" stroke="#f59e0b" stroke-width="3"/>
    <polygon points="210,16 205,26 215,26" fill="#f59e0b"/>
    <text x="145" y="32" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="10" font-weight="800">Finger Snap</text>

    <text x="25" y="98" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; Index finger pulls string away from board and releases</text>
    <text x="25" y="118" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; String snaps back against fretboard metal</text>
    <text x="25" y="136" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Simulates sharp snare drum crack &amp; high snap</text>
  </g>

  <!-- Bottom: Waveform Dynamic Envelope -->
  <g transform="translate(35, 255)">
    <rect width="690" height="95" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>
    <text x="20" y="24" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800">OSCILLOSCOPE DYNAMIC ENVELOPE: EXTREME CREST FACTOR</text>

    <!-- Waveform with massive transient spikes -->
    <path d="M 50 55 L 120 55 L 125 15 L 130 90 L 135 40 L 140 70 L 145 55 L 260 55 L 265 18 L 270 85 L 275 45 L 280 55 L 420 55 L 425 12 L 430 92 L 435 40 L 440 55 L 640 55" fill="none" stroke="#ef4444" stroke-width="2.5"/>

    <text x="135" y="35" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="10" font-weight="700">+18 dB Transient Spike</text>
    <text x="450" y="48" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">Fast transient spikes required studio optical / FET limiters (LA-2A / 1176) to protect tape heads.</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Invented by Larry Graham in Sly &amp; The Family Stone when the band lacked a drummer.</text>
</svg>'''

# 11. FOAM BRIDGE MUTING & DAMPING
svgs["palm_muting_foam_mute_damping.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 MECHANICAL DAMPING &amp; MIX ROOM</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Bridge Foam Muting: Waveform Decay &amp; Kick Drum Clearance</text>

  <!-- Left: Hardware Assembly Diagram -->
  <g transform="translate(35, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="20" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">MOTOWN FOAM MUTE ASSEMBLY</text>

    <!-- Baseplate & Saddles -->
    <rect x="30" y="60" width="180" height="80" rx="4" fill="#334155" stroke="#64748b"/>
    <rect x="60" y="80" width="30" height="40" rx="2" fill="#94a3b8"/>
    <rect x="100" y="80" width="30" height="40" rx="2" fill="#94a3b8"/>
    <rect x="140" y="80" width="30" height="40" rx="2" fill="#94a3b8"/>

    <!-- Dense Neoprene Foam Mute -->
    <rect x="45" y="55" width="150" height="22" rx="4" fill="#020617" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="120" y="70" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">Dense Neoprene Foam Mute</text>

    <!-- Strings Passing Over Foam -->
    <line x1="20" y1="66" x2="220" y2="66" stroke="#cbd5e1" stroke-width="3"/>
    <line x1="20" y1="88" x2="220" y2="88" stroke="#cbd5e1" stroke-width="2.5"/>

    <!-- Bullets -->
    <text x="25" y="175" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; Standard on original 1950s P-Bass chrome covers</text>
    <text x="25" y="200" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; Damps string vibration mechanically at bridge</text>
    <text x="25" y="225" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">&#8226; James Jamerson's secret to the Motown "thud"</text>
    <text x="25" y="250" fill="#34d399" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Decay reduced from &gt;3.0s down to &lt;0.4s</text>
  </g>

  <!-- Right: Mono Mix Clearance Waveform -->
  <g transform="translate(390, 90)">
    <rect width="335" height="265" rx="8" fill="#131e36" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="20" y="28" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="13" font-weight="800">ENVELOPE DECAY &amp; MONO MIX SPACE</text>

    <!-- Unmuted String Decay -->
    <g transform="translate(20, 45)">
      <text x="0" y="15" fill="#f87171" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Unmuted Bass: Long Ringing Sustain</text>
      <path d="M 0 50 Q 80 15 160 30 T 290 45" fill="none" stroke="#ef4444" stroke-width="2"/>
      <text x="290" y="65" fill="#ef4444" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">Collides with kick drum!</text>
    </g>

    <!-- Foam Muted String Decay (Motown) -->
    <g transform="translate(20, 125)">
      <text x="0" y="15" fill="#34d399" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Foam Muted Bass: Rapid Percussive Decay</text>
      <path d="M 0 50 Q 30 15 60 48 L 290 50" fill="none" stroke="#34d399" stroke-width="2.5"/>
      <text x="290" y="65" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">Tight thud leaves space</text>
    </g>

    <!-- Kick Drum Space -->
    <rect x="20" y="210" width="295" height="40" rx="4" fill="#142038" stroke="rgba(56,189,248,0.3)"/>
    <text x="167" y="228" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">CLEARS LOW-END MONO HEADROOM</text>
    <text x="167" y="242" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Allows kick drum and bass to co-exist without masking</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Essential technique for 1960s Motown, Stax, and modern indie/lo-fi production.</text>
</svg>'''

# 12. AMPEG SVT TUBE HEAD & 8X10 CABINET SCHEMATIC
svgs["ampeg_svt_tube_amplifier_schematic.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 STAGE AMPLIFICATION &amp; CAB PHYSICS (1969)</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Ampeg SVT: 300W Push-Pull Valve Head &amp; 8x10 Sealed Enclosure</text>

  <!-- Left: SVT 300W All-Tube Output Stage Schematic -->
  <g transform="translate(35, 90)">
    <rect width="380" height="265" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="20" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">300W RMS VALVE OUTPUT STAGE</text>

    <!-- Preamp & Driver Block -->
    <rect x="20" y="48" width="105" height="45" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="72" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">12AX7 Preamp</text>
    <text x="72" y="84" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Tone &amp; Mid Selector</text>

    <!-- Phase Splitter -->
    <path d="M 125 70 L 155 70" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="165" cy="70" r="10" fill="#1e293b" stroke="#f59e0b"/>
    <text x="165" y="74" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="8" font-weight="800" text-anchor="middle">12AU7</text>

    <!-- Push-Pull Split Arrows -->
    <path d="M 175 65 L 205 45" stroke="#f59e0b" stroke-width="1.5"/>
    <path d="M 175 75 L 205 95" stroke="#f59e0b" stroke-width="1.5"/>

    <!-- 6x 6550 Beam Tetrodes Block -->
    <rect x="205" y="35" width="85" height="30" rx="3" fill="#1e293b" stroke="#ef4444"/>
    <text x="247" y="54" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">3x 6550 (Push)</text>

    <rect x="205" y="80" width="85" height="30" rx="3" fill="#1e293b" stroke="#ef4444"/>
    <text x="247" y="99" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">3x 6550 (Pull)</text>

    <!-- Output Transformer (Iron) -->
    <path d="M 290 50 L 310 50 L 310 65" stroke="#ef4444" stroke-width="1.5"/>
    <path d="M 290 95 L 310 95 L 310 75" stroke="#ef4444" stroke-width="1.5"/>

    <rect x="305" y="55" width="55" height="35" rx="3" fill="#0f172a" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="332" y="73" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="8" font-weight="800" text-anchor="middle">OUTPUT</text>
    <text x="332" y="83" fill="#ffffff" font-family="system-ui, sans-serif" font-size="7.5" font-weight="700" text-anchor="middle">TRANSFORMER</text>

    <!-- Specifications Table -->
    <g transform="translate(20, 130)">
      <rect width="340" height="115" rx="4" fill="#0f172a"/>
      <text x="15" y="24" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; <tspan fill="#38bdf8" font-weight="700">300 Watts RMS:</tspan> Clean arena headroom</text>
      <text x="15" y="46" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; <tspan fill="#38bdf8" font-weight="700">14 Valves Total:</tspan> Massive low-end iron saturation</text>
      <text x="15" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; <tspan fill="#38bdf8" font-weight="700">Weight:</tspan> ~43 kg (95 lbs) for head chassis alone</text>
      <text x="15" y="90" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">&#8226; <tspan fill="#38bdf8" font-weight="700">Heritage:</tspan> Debuted on Rolling Stones 1969 US Tour</text>
    </g>
  </g>

  <!-- Right: The 8x10 "Fridge" Cabinet Enclosure -->
  <g transform="translate(435, 90)">
    <rect width="290" height="265" rx="8" fill="#131e36" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="20" y="28" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="13" font-weight="800">8&#215;10 "FRIDGE" CABINET</text>

    <!-- 8 Drivers in 4 Sealed Chambers -->
    <g transform="translate(20, 45)">
      <!-- Chamber 1 -->
      <rect x="0" y="0" width="115" height="42" rx="3" fill="#1e293b" stroke="#334155"/>
      <circle cx="28" cy="21" r="14" fill="#0f172a" stroke="#cbd5e1"/>
      <circle cx="85" cy="21" r="14" fill="#0f172a" stroke="#cbd5e1"/>

      <!-- Chamber 2 -->
      <rect x="0" y="47" width="115" height="42" rx="3" fill="#1e293b" stroke="#334155"/>
      <circle cx="28" cy="68" r="14" fill="#0f172a" stroke="#cbd5e1"/>
      <circle cx="85" cy="68" r="14" fill="#0f172a" stroke="#cbd5e1"/>

      <!-- Chamber 3 -->
      <rect x="0" y="94" width="115" height="42" rx="3" fill="#1e293b" stroke="#334155"/>
      <circle cx="28" cy="115" r="14" fill="#0f172a" stroke="#cbd5e1"/>
      <circle cx="85" cy="115" r="14" fill="#0f172a" stroke="#cbd5e1"/>

      <!-- Chamber 4 -->
      <rect x="0" y="141" width="115" height="42" rx="3" fill="#1e293b" stroke="#334155"/>
      <circle cx="28" cy="162" r="14" fill="#0f172a" stroke="#cbd5e1"/>
      <circle cx="85" cy="162" r="14" fill="#0f172a" stroke="#cbd5e1"/>
    </g>

    <!-- Right Side Explanations -->
    <g transform="translate(145, 50)">
      <text x="0" y="16" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="800">Sealed Infinite Baffle</text>
      <text x="0" y="32" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">&#8226; 4 separate chambers</text>
      <text x="0" y="48" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">&#8226; No bass ports</text>

      <text x="0" y="78" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800">Transient Speed</text>
      <text x="0" y="94" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Eight 10" cones have</text>
      <text x="0" y="108" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">lower individual mass</text>
      <text x="0" y="122" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">than a single 18"</text>

      <text x="0" y="152" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800">Total Cone Area</text>
      <text x="0" y="168" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Exceeds three 15" cones</text>
      <text x="0" y="182" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">&#8226; 4&#937; total impedance</text>
    </g>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Sealed multi-driver enclosures prevent loose speaker cone wobble and deliver focused, fast low end.</text>
</svg>'''

# 13. DIRECT INJECTION (DI) TRANSFORMER SCHEMATIC
svgs["direct_injection_di_transformer_schematic.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 STUDIO RECORDING &amp; SIGNAL FLOW</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Passive Direct Injection (DI) Transformer Schematic (Motown Wolfbox)</text>

  <!-- Schematic Chassis -->
  <g transform="translate(35, 90)">
    <rect width="690" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>

    <!-- Left: Unbalanced 1/4" Instrument Input -->
    <g transform="translate(30, 60)">
      <rect width="130" height="130" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="65" y="24" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">1/4" TS INPUT</text>
      <text x="65" y="44" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5" text-anchor="middle">Unbalanced Instrument</text>

      <path d="M 25 75 L 105 75" stroke="#fbbf24" stroke-width="2.5"/>
      <text x="65" y="95" fill="#fde047" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Tip (Signal +)</text>

      <path d="M 25 110 L 105 110" stroke="#64748b" stroke-width="2"/>
      <text x="65" y="125" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Sleeve (Ground)</text>
    </g>

    <!-- Center: Triad Audio Transformer (Galvanic Isolation) -->
    <g transform="translate(230, 45)">
      <rect width="230" height="160" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="2"/>
      <text x="115" y="24" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">TRIAD A-11J TRANSFORMER</text>

      <!-- Primary Coil (High-Z) -->
      <path d="M 40 50 C 60 50 60 70 40 70 C 60 70 60 90 40 90 C 60 90 60 110 40 110" fill="none" stroke="#f59e0b" stroke-width="3"/>
      <text x="40" y="130" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" text-anchor="middle">High-Z</text>

      <!-- Iron Core -->
      <line x1="110" y1="50" x2="110" y2="120" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="118" y1="50" x2="118" y2="120" stroke="#cbd5e1" stroke-width="2"/>
      <text x="114" y="140" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Magnetic Coupling</text>

      <!-- Secondary Coil (Low-Z Balanced) -->
      <path d="M 190 50 C 170 50 170 70 190 70 C 170 70 170 90 190 90 C 170 90 170 110 190 110" fill="none" stroke="#34d399" stroke-width="3"/>
      <text x="190" y="130" fill="#34d399" font-family="system-ui, sans-serif" font-size="9.5" font-weight="700" text-anchor="middle">Low-Z</text>
    </g>

    <!-- Right: Balanced XLR Output -->
    <g transform="translate(530, 60)">
      <rect width="130" height="130" rx="6" fill="#1e293b" stroke="#34d399" stroke-width="1.5"/>
      <text x="65" y="24" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">BALANCED XLR OUT</text>

      <text x="20" y="55" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">Pin 2: Hot (+)</text>
      <text x="20" y="80" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">Pin 3: Cold (&#8722;)</text>

      <!-- Ground Lift Switch -->
      <rect x="15" y="95" width="100" height="24" rx="3" fill="#7f1d1d"/>
      <text x="65" y="111" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="9" font-weight="700" text-anchor="middle">Ground Lift Switch</text>
    </g>

    <!-- Signal Connection Paths -->
    <path d="M 160 100 L 230 100" stroke="#f59e0b" stroke-width="2"/>
    <path d="M 460 85 L 530 85" stroke="#34d399" stroke-width="2"/>
    <path d="M 460 115 L 530 115" stroke="#34d399" stroke-width="2"/>

    <!-- Bottom Benefit Badges -->
    <g transform="translate(30, 220)">
      <rect width="630" height="28" rx="4" fill="#142038"/>
      <text x="315" y="18" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">Galvanic isolation breaks ground loops &#8226; Matches high-Z pickups to low-Z console mic preamps</text>
    </g>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Ed Wolfrum's Motown Wolfbox allowed Jamerson to record direct into the Hitsville console.</text>
</svg>'''

# 14. BASS MIC + DI PHASE ALIGNMENT
svgs["bass_mic_plus_di_phase_alignment.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 MULTI-TRACK RECORDING &amp; PHASE PHYSICS</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">DI + Mic Tracking: Acoustic Latency &amp; Comb Filtering</text>

  <!-- Left: Studio Setup Flow -->
  <g transform="translate(35, 90)">
    <rect width="270" height="265" rx="8" fill="#131e36" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="20" y="26" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12.5" font-weight="800">STUDIO TRACKING SETUP</text>

    <!-- Bass Split -->
    <rect x="20" y="45" width="230" height="32" rx="4" fill="#1e293b" stroke="#334155"/>
    <text x="135" y="65" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Bass Guitar 1/4" Output</text>

    <!-- Path 1: Direct DI Box -->
    <path d="M 135 77 L 135 105" stroke="#34d399" stroke-width="2"/>
    <rect x="20" y="105" width="230" height="40" rx="4" fill="#064e3b" stroke="#34d399"/>
    <text x="135" y="123" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">TRACK 1: DI BOX (Direct)</text>
    <text x="135" y="137" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Arrival Time: t = 0 ms (Instantaneous)</text>

    <!-- Path 2: Speaker Amp + Mic -->
    <path d="M 135 145 L 135 175" stroke="#f59e0b" stroke-width="2"/>
    <rect x="20" y="175" width="230" height="50" rx="4" fill="#451a03" stroke="#f59e0b"/>
    <text x="135" y="193" fill="#fde68a" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">TRACK 2: AMP + MIC (Acoustic)</text>
    <text x="135" y="208" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Mic 3 ft away &#8594; ~2.7 ms sound travel delay</text>

    <text x="135" y="248" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Phase clash if combined raw!</text>
  </g>

  <!-- Right: DAW Timeline View (Out of Phase vs Aligned) -->
  <g transform="translate(325, 90)">
    <rect width="400" height="265" rx="8" fill="#131e36" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="20" y="26" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="12.5" font-weight="800">DAW TIMELINE: WAVEFORM PHASE CORRECTION</text>

    <!-- Raw Unaligned (Comb Filtering) -->
    <g transform="translate(20, 42)">
      <rect width="360" height="85" rx="6" fill="#0f172a" stroke="#ef4444"/>
      <text x="15" y="18" fill="#f87171" font-family="system-ui, sans-serif" font-size="10" font-weight="800">RAW: 2.7 ms DELAY &#8594; DESTRUCTIVE COMB FILTERING</text>

      <!-- DI Wave -->
      <path d="M 20 40 Q 40 25 60 40 T 100 40 T 140 40 T 180 40 T 220 40 T 260 40 T 300 40" fill="none" stroke="#34d399" stroke-width="2"/>
      <text x="310" y="44" fill="#34d399" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700">DI</text>

      <!-- Delayed Mic Wave (Out of phase in lows) -->
      <path d="M 45 65 Q 65 80 85 65 T 125 65 T 165 65 T 205 65 T 245 65 T 285 65 T 325 65" fill="none" stroke="#f59e0b" stroke-width="2"/>
      <text x="335" y="69" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700">Mic</text>
    </g>

    <!-- Aligned (Nudged earlier) -->
    <g transform="translate(20, 140)">
      <rect width="360" height="85" rx="6" fill="#0f172a" stroke="#34d399"/>
      <text x="15" y="18" fill="#34d399" font-family="system-ui, sans-serif" font-size="10" font-weight="800">CORRECTED: TIME-ALIGNED &#8594; PUNCHY COHERENT LOWS</text>

      <!-- Aligned Waves -->
      <path d="M 20 40 Q 40 25 60 40 T 100 40 T 140 40 T 180 40 T 220 40 T 260 40 T 300 40" fill="none" stroke="#34d399" stroke-width="2"/>
      <path d="M 20 62 Q 40 47 60 62 T 100 62 T 140 62 T 180 62 T 220 62 T 260 62 T 300 62" fill="none" stroke="#f59e0b" stroke-width="2"/>

      <line x1="40" y1="20" x2="40" y2="75" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2 2"/>
      <text x="310" y="55" fill="#fde047" font-family="system-ui, sans-serif" font-size="9" font-weight="800">+6 dB Punch</text>
    </g>

    <text x="200" y="248" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5" text-anchor="middle">DAW engineer nudges mic track back by 2.7 ms to eliminate phase hollows.</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Speed of sound in air is ~1 ms per foot; electrical cable conduction is near light-speed.</text>
</svg>'''

# 15. FRETLESS BASS "MWAH" PHYSICS
svgs["fretless_bass_mwah_physics.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 ACOUSTIC HARMONICS &amp; WOOD COUPLING</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Jaco Pastorius Fretless Bass: Anatomy of the Vocal "Mwah"</text>

  <!-- Cross-Section Graphic -->
  <g transform="translate(35, 90)">
    <rect width="690" height="260" rx="8" fill="#131e36" stroke="#334155" stroke-width="1"/>

    <!-- Hardwood Fingerboard (Epoxy Coated) -->
    <rect x="50" y="140" width="590" height="30" rx="4" fill="#3b1d11" stroke="#78350f"/>
    <text x="60" y="160" fill="#fde68a" font-family="system-ui, sans-serif" font-size="10" font-weight="700">Marine Epoxy-Coated Hardwood Fingerboard (No Metal Frets)</text>

    <!-- Finger Pressure Point -->
    <path d="M 240 70 L 240 120" stroke="#f59e0b" stroke-width="3"/>
    <polygon points="240,125 235,115 245,115" fill="#f59e0b"/>
    <text x="240" y="55" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Flesh Finger Touchpoint</text>

    <!-- Vibrating String rolling against fingerboard -->
    <path d="M 50 125 L 240 138 Q 440 100 640 138" fill="none" stroke="#cbd5e1" stroke-width="3"/>
    <path d="M 240 138 Q 440 160 640 138" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3 3"/>

    <!-- The "Mwah" Contact Rolling Arc -->
    <ellipse cx="270" cy="138" rx="28" ry="6" fill="#ef4444" opacity="0.3"/>
    <text x="270" y="115" fill="#f87171" font-family="system-ui, sans-serif" font-size="9.5" font-weight="800" text-anchor="middle">Rolling Contact Boundary</text>

    <!-- Tonal Outcome Columns -->
    <g transform="translate(50, 185)">
      <rect width="280" height="55" rx="4" fill="#1e293b"/>
      <text x="15" y="22" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">&#8226; Extreme Highs Damped Rapidly</text>
      <text x="15" y="42" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">Flesh and wood cushion mechanical fret clack</text>
    </g>

    <g transform="translate(360, 185)">
      <rect width="280" height="55" rx="4" fill="#1e293b"/>
      <text x="15" y="22" fill="#34d399" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">&#8226; Midrange Harmonic Swell (800 Hz&#8211;2 kHz)</text>
      <text x="15" y="42" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9.5">Creates singing, formant vocal timbre</text>
    </g>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Jaco favored the bridge single-coil on his 1962 Jazz Bass to emphasize these vocal midrange overtones.</text>
</svg>'''

# 16. EXTENDED SCALE 5-STRING TENSION CHART
svgs["extended_scale_5_string_tension_chart.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 EXTENDED RANGE &amp; STRING TENSION</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Low-B String (30.9 Hz &#8226; .130" Gauge): Scale Length vs Tension</text>

  <!-- Bar Chart Canvas -->
  <g transform="translate(35, 90)">
    <rect width="690" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>

    <!-- Y Axis (Tension in lbs) -->
    <line x1="80" y1="30" x2="80" y2="210" stroke="#475569" stroke-width="1.5"/>
    <line x1="80" y1="210" x2="650" y2="210" stroke="#475569" stroke-width="1.5"/>
    <text x="70" y="210" fill="#64748b" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">0 lbs</text>
    <text x="70" y="165" fill="#64748b" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">20 lbs</text>
    <text x="70" y="120" fill="#64748b" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">30 lbs</text>
    <text x="70" y="75" fill="#64748b" font-family="system-ui, sans-serif" font-size="9" text-anchor="end">40 lbs</text>

    <!-- Bar 1: 30" Short Scale -->
    <g transform="translate(110, 0)">
      <rect x="0" y="160" width="80" height="50" rx="4" fill="#ef4444"/>
      <text x="40" y="150" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">22.4 lbs</text>
      <text x="40" y="228" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">30" Short</text>
      <text x="40" y="242" fill="#f87171" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Floppy / Muddy</text>
    </g>

    <!-- Bar 2: 34" Standard Scale -->
    <g transform="translate(250, 0)">
      <rect x="0" y="126" width="80" height="84" rx="4" fill="#f59e0b"/>
      <text x="40" y="116" fill="#fde68a" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">28.8 lbs</text>
      <text x="40" y="228" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">34" Standard</text>
      <text x="40" y="242" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Borderline</text>
    </g>

    <!-- Bar 3: 35" Extended Scale -->
    <g transform="translate(390, 0)">
      <rect x="0" y="105" width="80" height="105" rx="4" fill="#38bdf8"/>
      <text x="40" y="95" fill="#bae6fd" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">33.5 lbs</text>
      <text x="40" y="228" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">35" Extended</text>
      <text x="40" y="242" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Tight &amp; Defined</text>
    </g>

    <!-- Bar 4: 37" Multi-Scale (Dingwall Fanned Fret) -->
    <g transform="translate(530, 0)">
      <rect x="0" y="80" width="80" height="130" rx="4" fill="#10b981"/>
      <text x="40" y="70" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">37.4 lbs</text>
      <text x="40" y="228" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">37" Fanned Fret</text>
      <text x="40" y="242" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Piano-Like Purity</text>
    </g>

    <!-- Tension threshold line -->
    <line x1="80" y1="110" x2="650" y2="110" stroke="#34d399" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="645" y="105" fill="#34d399" font-family="system-ui, sans-serif" font-size="9" font-weight="700" text-anchor="end">Optimal Tension Threshold (&gt;32 lbs)</text>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Extending Low-B scale to 35"&#8211;37" prevents intonation drift and mechanical fret buzz at 30.9 Hz.</text>
</svg>'''

# 17. BASS DSP PROFILING & CAB IR
svgs["bass_dsp_profiling_and_cab_ir.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="38" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">AO3 MODERN DIGITAL SIGNAL PROCESSING (DSP)</text>
  <text x="35" y="66" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="900">Modern Bass Rig: DSP Amp Profiling &amp; Convolution IR Cabs</text>

  <!-- Flowchart Container -->
  <g transform="translate(35, 90)">
    <rect width="690" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1"/>

    <!-- Stage 1: Clean Bass Instrument -->
    <g transform="translate(25, 45)">
      <rect width="110" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="55" y="24" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">STAGE 1</text>
      <text x="55" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">Bass DI Signal</text>
      <text x="55" y="65" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">24-bit / 96 kHz</text>
    </g>

    <path d="M 135 87 L 165 87" stroke="#38bdf8" stroke-width="2"/>

    <!-- Stage 2: Non-Linear Tube DSP Profiler -->
    <g transform="translate(165, 45)">
      <rect width="145" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="72" y="24" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">STAGE 2: PROFILER</text>
      <text x="72" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Kemper / Quad Cortex</text>
      <text x="72" y="60" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">Models non-linear 6550</text>
      <text x="72" y="74" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">valve distortion &amp; sag</text>
    </g>

    <path d="M 310 87 L 340 87" stroke="#38bdf8" stroke-width="2"/>

    <!-- Stage 3: Convolution Engine (Speaker Cab IR) -->
    <g transform="translate(340, 45)">
      <rect width="180" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
      <text x="90" y="24" fill="#34d399" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">STAGE 3: CONVOLUTION</text>
      <text x="90" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="700" text-anchor="middle">Speaker Cabinet IR</text>
      <text x="90" y="60" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="8.5" text-anchor="middle">Multiplied with 8&#215;10 impulse:</text>
      <text x="90" y="74" fill="#34d399" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700" text-anchor="middle">y[n] = x[n] * h[n]</text>
    </g>

    <path d="M 520 87 L 550 87" stroke="#38bdf8" stroke-width="2"/>

    <!-- Stage 4: DAW Mix Track -->
    <g transform="translate(550, 45)">
      <rect width="115" height="85" rx="6" fill="#047857"/>
      <text x="57" y="24" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">STAGE 4</text>
      <text x="57" y="44" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">DAW Track</text>
      <text x="57" y="65" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">Silent recording</text>
    </g>

    <!-- Bottom Features Table -->
    <g transform="translate(25, 155)">
      <rect width="640" height="85" rx="4" fill="#142038" stroke="rgba(56,189,248,0.2)"/>
      <text x="20" y="26" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">&#8226; Zero Room Bleed:</text>
      <text x="140" y="26" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">Bass tracks silently directly to converters without spill onto drum overheads.</text>

      <text x="20" y="48" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">&#8226; Total Recall:</text>
      <text x="140" y="48" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">Exact virtual microphone positions (on-axis / off-axis) saved with the DAW session file.</text>

      <text x="20" y="70" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">&#8226; Hybrid Re-Amping:</text>
      <text x="140" y="70" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5">Engineers blend clean analog DI with parallel virtual tube saturation.</text>
    </g>
  </g>

  <text x="380" y="382" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Modern low-end production combines pristine DI sub-bass with DSP amp bite.</text>
</svg>'''

# 18. COMPONENT 3 BASS REVISION MATRIX SUMMARY
svgs["bass_revision_matrix_summary.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 400" width="100%" height="100%">
  <rect width="760" height="400" rx="12" fill="#080e1a" stroke="#1e293b" stroke-width="1.5"/>
  <text x="35" y="35" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5">EDEXCEL COMPONENT 3 EXAM REVISION MATRIX</text>
  <text x="35" y="60" fill="#ffffff" font-family="system-ui, sans-serif" font-size="17" font-weight="900">The Bass Guitar: Core Terminology &amp; Syllabus Milestones</text>

  <!-- 3x3 Table Layout -->
  <g transform="translate(35, 75)">
    <!-- Column Headers -->
    <rect x="0" y="0" width="220" height="26" fill="#1e293b" stroke="#334155"/>
    <text x="110" y="17" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">1. HISTORICAL MILESTONES</text>

    <rect x="230" y="0" width="220" height="26" fill="#1e293b" stroke="#334155"/>
    <text x="340" y="17" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">2. TRANSDUCER &amp; PHYSICS</text>

    <rect x="460" y="0" width="230" height="26" fill="#1e293b" stroke="#334155"/>
    <text x="575" y="17" fill="#34d399" font-family="system-ui, sans-serif" font-size="10.5" font-weight="800" text-anchor="middle">3. STUDIO &amp; AMPLIFICATION</text>

    <!-- Row 1: Vintage Era (1950s) -->
    <g transform="translate(0, 32)">
      <rect x="0" y="0" width="220" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="12" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">1951 Fender Precision</text>
      <text x="12" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; 34" solid ash slab body</text>
      <text x="12" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Frets solved intonation</text>
      <text x="12" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Zero acoustic feedback</text>

      <rect x="230" y="0" width="220" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="242" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">RWRP Split-Coil (1957)</text>
      <text x="242" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Reverse wound coil</text>
      <text x="242" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Reverse magnetic polarity</text>
      <text x="242" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Cancels 50/60 Hz hum</text>

      <rect x="460" y="0" width="230" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="472" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Motown DI &amp; Jamerson</text>
      <text x="472" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Wolfbox Triad transformer</text>
      <text x="472" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Flatwounds &amp; foam mute</text>
      <text x="472" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Tight thud clears kick</text>
    </g>

    <!-- Row 2: Classic / Arena Era (1960s-1970s) -->
    <g transform="translate(0, 118)">
      <rect x="0" y="0" width="220" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="12" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Jazz Bass &amp; StingRay</text>
      <text x="12" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; 1960: Dual pickups &amp; slim nut</text>
      <text x="12" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; 1976: Active 9V StingRay</text>
      <text x="12" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Rick 4001 stereo bi-amping</text>

      <rect x="230" y="0" width="220" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="242" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Active Baxandall EQ</text>
      <text x="242" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Low-Z buffered output</text>
      <text x="242" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Zero cable treble loss</text>
      <text x="242" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Boost and cut shelves</text>

      <rect x="460" y="0" width="230" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="472" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Ampeg SVT &amp; 8x10</text>
      <text x="472" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; 300W all-valve power (6550)</text>
      <text x="472" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Sealed infinite baffle cab</text>
      <text x="472" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Eight 10" cones for speed</text>
    </g>

    <!-- Row 3: Modern Era (1980s-Present) -->
    <g transform="translate(0, 204)">
      <rect x="0" y="0" width="220" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="12" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Extended Range &amp; Fretless</text>
      <text x="12" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; 5-string 30.9 Hz Low-B</text>
      <text x="12" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Jaco Pastorius fretless mwah</text>
      <text x="12" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Multi-scale fanned frets</text>

      <rect x="230" y="0" width="220" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="242" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">Mersenne Tension (35")</text>
      <text x="242" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Longer scale = higher tension</text>
      <text x="242" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Prevents floppy Low-B</text>
      <text x="242" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Roundwounds for slap snap</text>

      <rect x="460" y="0" width="230" height="80" rx="4" fill="#131e36" stroke="#334155"/>
      <text x="472" y="18" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700">DAW Phase Alignment &amp; DSP</text>
      <text x="472" y="34" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Nudge mic track to match DI</text>
      <text x="472" y="50" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Prevents low comb filtering</text>
      <text x="472" y="66" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9.5">&#8226; Convolution cab IR profiling</text>
    </g>
  </g>

  <text x="380" y="388" fill="#64748b" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Edexcel Music Technology Component 3: Music Technology in Context Syllabus Mastery</text>
</svg>'''

# Save all SVGs and validate with ElementTree
print(f"Writing and validating {len(svgs)} SVGs in {OUT_DIR}...")
errors = 0
for name, content in svgs.items():
    path = os.path.join(OUT_DIR, name)
    # Validate XML
    try:
        ET.fromstring(content)
    except ET.ParseError as e:
        print(f"ERROR in {name}: {e}")
        errors += 1
        continue
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  [OK] {name} ({len(content)} bytes)")

if errors == 0:
    print(f"ALL {len(svgs)} SVGs VALIDATED AND WRITTEN SUCCESSFULLY!")
else:
    raise ValueError(f"{errors} SVGs failed XML validation!")
