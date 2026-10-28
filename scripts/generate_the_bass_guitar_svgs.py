"""
Generates 18 dark-mode vector SVGs for The Bass Guitar Interactive Curriculum Deck.
Topic: Edexcel Component 3 - The Bass Guitar (Physics, Anatomy, History, Electronics, DI & Amplification).
Strict Rule: Valid XML, numeric entities or UTF-8 only (no unescaped &bull;, &times;, &deg;).
"""
import os
import xml.etree.ElementTree as ET

OUT_DIR = "public/images/slides/the_bass_guitar"
os.makedirs(OUT_DIR, exist_ok=True)

svgs = {}

# 1. BASS ANATOMY & SCALE LENGTH
svgs["bass_anatomy_and_scale_length.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(56,189,248,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 INSTRUMENT ANATOMY</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Bass Scale Length &amp; Tension Physics (34" vs 30")</text>

  <!-- Scale Comparison Diagrams -->
  <!-- 34" Long Scale -->
  <g transform="translate(50, 120)">
    <rect x="0" y="0" width="700" height="130" fill="#1e293b" rx="8" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="15" font-weight="800">Standard Long Scale (34 inches / 864 mm) — Fender Precision &amp; Jazz Bass</text>
    
    <!-- Nut and Bridge -->
    <rect x="30" y="50" width="12" height="50" fill="#cbd5e1" rx="2"/>
    <text x="36" y="115" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Nut</text>
    
    <rect x="630" y="50" width="20" height="50" fill="#64748b" rx="3"/>
    <text x="640" y="115" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Bridge Saddle</text>
    
    <!-- String line -->
    <line x1="42" y1="75" x2="630" y2="75" stroke="#f59e0b" stroke-width="4"/>
    
    <!-- Scale dimension line -->
    <line x1="42" y1="40" x2="630" y2="40" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 4"/>
    <text x="336" y="35" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">34.0 Inches (864 mm) — High String Tension &amp; Piano-like Clarity</text>
  </g>

  <!-- 30" Short Scale -->
  <g transform="translate(50, 275)">
    <rect x="0" y="0" width="700" height="130" fill="#1e293b" rx="8" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="30" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="15" font-weight="800">Short Scale (30 inches / 762 mm) — H&#246;fner 500/1 Violin Bass &amp; Gibson EB-3</text>
    
    <!-- Nut and Bridge -->
    <rect x="30" y="50" width="12" height="50" fill="#cbd5e1" rx="2"/>
    <text x="36" y="115" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Nut</text>
    
    <rect x="550" y="50" width="20" height="50" fill="#64748b" rx="3"/>
    <text x="560" y="115" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Bridge Saddle</text>
    
    <!-- String line -->
    <line x1="42" y1="75" x2="550" y2="75" stroke="#e11d48" stroke-width="4"/>
    
    <!-- Scale dimension line -->
    <line x1="42" y1="40" x2="550" y2="40" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 4"/>
    <text x="296" y="35" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="12" font-weight="700" text-anchor="middle">30.0 Inches (762 mm) — Lower Tension, Warmer Thud, Reduced Upper Harmonics</text>
  </g>

  <!-- Footer note -->
  <text x="400" y="445" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Mersenne&#39;s Law: Frequency f = (1 / 2L) &#215; &#8730;(T / &#956;). Longer scale length L requires higher tension T for identical pitch.</text>
</svg>'''

# 2. BASS LOW FREQUENCY PHYSICS
svgs["bass_low_frequency_physics.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(245,158,11,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 ACOUSTIC &amp; ELECTRICAL PHYSICS</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Low-Frequency Physics: Wavelengths &amp; String Mass</text>

  <!-- 4 String Standard vs 5 String Note Grid -->
  <g transform="translate(45, 115)">
    <!-- Low B (30.9 Hz) -->
    <rect x="0" y="0" width="165" height="170" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>
    <text x="82" y="32" fill="#e11d48" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">Low B0 (5-String)</text>
    <text x="82" y="75" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="900" text-anchor="middle">30.9 Hz</text>
    <text x="82" y="105" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">&#955; = 11.1 Metres</text>
    <text x="82" y="130" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Sub-Bass Energy</text>
    <text x="82" y="150" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">High amp power required</text>

    <!-- Low E (41.2 Hz) -->
    <rect x="180" y="0" width="165" height="170" fill="#1e293b" rx="10" stroke="rgba(245,158,11,0.4)"/>
    <text x="262" y="32" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">Low E1 (4-String)</text>
    <text x="262" y="75" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="900" text-anchor="middle">41.2 Hz</text>
    <text x="262" y="105" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">&#955; = 8.32 Metres</text>
    <text x="262" y="130" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Standard Bass Root</text>
    <text x="262" y="150" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Heavy string core (.105")</text>

    <!-- A1 (55.0 Hz) -->
    <rect x="360" y="0" width="165" height="170" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>
    <text x="442" y="32" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">A1 String</text>
    <text x="442" y="75" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="900" text-anchor="middle">55.0 Hz</text>
    <text x="442" y="105" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">&#955; = 6.24 Metres</text>
    <text x="442" y="130" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Punch / Warmth</text>
    <text x="442" y="150" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Medium core (.085")</text>

    <!-- D2 (73.4 Hz) -->
    <rect x="540" y="0" width="165" height="170" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>
    <text x="622" y="32" fill="#22c55e" font-family="system-ui, sans-serif" font-size="14" font-weight="800" text-anchor="middle">D2 &amp; G2 Strings</text>
    <text x="622" y="75" fill="#ffffff" font-family="system-ui, sans-serif" font-size="28" font-weight="900" text-anchor="middle">73.4 / 98 Hz</text>
    <text x="622" y="105" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">&#955; = 4.67 / 3.5 Metres</text>
    <text x="622" y="130" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Melodic Definition</text>
    <text x="622" y="150" fill="#64748b" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Harmonic clarity &amp; slap pop</text>
  </g>

  <!-- Technical Explanation Box -->
  <g transform="translate(45, 305)">
    <rect x="0" y="0" width="705" height="125" fill="#142038" rx="8" stroke="rgba(56,189,248,0.2)"/>
    <text x="25" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">ELECTRICAL &amp; ACOUSTIC IMPLICATIONS FOR SOUND RECORDING:</text>
    <text x="25" y="55" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12" line-height="1.5">1. <tspan fill="#ffffff" font-weight="700">Massive Excursion:</tspan> Thicker steel strings require wider pickup magnetic windows and deeper pole piece clearance.</text>
    <text x="25" y="78" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">2. <tspan fill="#ffffff" font-weight="700">Power Hungry:</tspan> Human hearing is far less sensitive to sub-bass (Fletcher-Munson equal-loudness curves), requiring 300W+ amps.</text>
    <text x="25" y="101" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">3. <tspan fill="#ffffff" font-weight="700">Standing Waves in Studios:</tspan> An 8-metre wavelength creates severe room standing wave nulls and bass buildup in control rooms.</text>
  </g>
</svg>'''

# 3. ACOUSTIC DOUBLE BASS VS SOLIDBODY ELECTRIC BASS
svgs["acoustic_double_bass_vs_electric_comparison.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(239,68,68,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#ef4444" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO4 HISTORICAL PROBLEM &amp; SOLUTION</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Upright Double Bass vs Leo Fender Solidbody Bass (1951)</text>

  <!-- Left: Acoustic Upright Dilemma -->
  <g transform="translate(45, 115)">
    <rect x="0" y="0" width="340" height="315" fill="#1e293b" rx="10" stroke="rgba(239,68,68,0.3)"/>
    <text x="20" y="32" fill="#ef4444" font-family="system-ui, sans-serif" font-size="15" font-weight="800">Acoustic Double Bass (Pre-1951)</text>
    
    <path d="M 40,65 L 70,65 L 60,110 L 40,110 Z" fill="none" stroke="#ef4444" stroke-width="2"/>
    <text x="20" y="75" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="700">The Problem in Big Bands:</text>
    
    <text x="20" y="105" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#f87171" font-weight="700">Low Volume Output:</tspan> Drowned out by brass and drums</text>
    <text x="20" y="135" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#f87171" font-weight="700">Acoustic Feedback:</tspan> Large hollow air cavity resonated</text>
    <text x="20" y="165" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#f87171" font-weight="700">Microphone Bleed:</tspan> Drum spill overwhelmed quiet bass</text>
    <text x="20" y="195" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#f87171" font-weight="700">Fretless Pitch Drift:</tspan> Fatigue caused intonation slip</text>
    <text x="20" y="225" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#f87171" font-weight="700">Massive Size:</tspan> Impossible to fit into passenger cars</text>

    <rect x="20" y="255" width="300" height="40" fill="rgba(239,68,68,0.15)" rx="6" stroke="rgba(239,68,68,0.3)"/>
    <text x="170" y="280" fill="#fca5a5" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" text-anchor="middle">Required acoustic slap/gut strings to be heard</text>
  </g>

  <!-- Right: Leo Fender Solution -->
  <g transform="translate(415, 115)">
    <rect x="0" y="0" width="340" height="315" fill="#1e293b" rx="10" stroke="rgba(34,197,94,0.3)"/>
    <text x="20" y="32" fill="#22c55e" font-family="system-ui, sans-serif" font-size="15" font-weight="800">1951 Fender Precision Bass</text>
    
    <text x="20" y="75" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="700">The Modern Technological Solution:</text>
    
    <text x="20" y="105" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#86efac" font-weight="700">Solid Ash Body:</tspan> Decoupled from air pressure, zero feedback</text>
    <text x="20" y="135" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#86efac" font-weight="700">Fretted Fingerboard:</tspan> Exact intonation ("Precision" name)</text>
    <text x="20" y="165" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#86efac" font-weight="700">Electromagnetic Pickup:</tspan> High-output signal into amplifiers</text>
    <text x="20" y="195" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#86efac" font-weight="700">Horizontal Play:</tspan> Guitar-style strap freed bassist posture</text>
    <text x="20" y="225" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#86efac" font-weight="700">Portability:</tspan> Easily transported in standard guitar cases</text>

    <rect x="20" y="255" width="300" height="40" fill="rgba(34,197,94,0.15)" rx="6" stroke="rgba(34,197,94,0.3)"/>
    <text x="170" y="280" fill="#86efac" font-family="system-ui, sans-serif" font-size="11.5" font-weight="700" text-anchor="middle">Allowed touring bands to play loud rock rhythm tracks</text>
  </g>
</svg>'''

# 4. P-BASS SPLIT-COIL RWRP PHYSICS
svgs["p_bass_split_coil_rwrp_physics.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(56,189,248,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 TRANSDUCER &amp; HUM CANCELLATION</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">The 1957 Fender Split-Coil Pickup (RWRP Operation)</text>

  <!-- Left: Physical Bobbin Architecture -->
  <g transform="translate(45, 120)">
    <rect x="0" y="0" width="340" height="310" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="14" font-weight="800">Physical Coil Stagger &amp; Magnetic Poles</text>

    <!-- Coil 1: E & A strings -->
    <rect x="40" y="60" width="110" height="70" fill="#0b1329" rx="8" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="70" cy="95" r="10" fill="#38bdf8"/>
    <circle cx="120" cy="95" r="10" fill="#38bdf8"/>
    <text x="95" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">NORTH</text>
    <text x="95" y="150" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Coil 1 (E &amp; A Strings)</text>

    <!-- Coil 2: D & G strings (staggered) -->
    <rect x="180" y="110" width="110" height="70" fill="#0b1329" rx="8" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="210" cy="145" r="10" fill="#f59e0b"/>
    <circle cx="260" cy="145" r="10" fill="#f59e0b"/>
    <text x="235" y="130" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="800" text-anchor="middle">SOUTH</text>
    <text x="235" y="200" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Coil 2 (D &amp; G Strings)</text>

    <!-- Wiring line between them -->
    <path d="M 150,95 L 165,95 L 165,145 L 180,145" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="3 3"/>
    <text x="170" y="240" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12" text-anchor="middle">Wired in Series: Reverse Wind, Reverse Polarity</text>
    <text x="170" y="270" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Each coil senses 2 strings without phase interference</text>
  </g>

  <!-- Right: Hum Cancellation Waveform Math -->
  <g transform="translate(415, 120)">
    <rect x="0" y="0" width="340" height="310" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="30" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="14" font-weight="800">The RWRP Phase Cancellation Math</text>

    <!-- External Noise Cancellation -->
    <rect x="20" y="55" width="300" height="95" fill="#0f172a" rx="8" stroke="rgba(239,68,68,0.3)"/>
    <text x="35" y="80" fill="#ef4444" font-family="system-ui, sans-serif" font-size="12" font-weight="800">1. Ambient 50/60 Hz EMI Mains Hum:</text>
    <text x="35" y="105" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">Affects both coils equally in same direction.</text>
    <text x="35" y="130" fill="#f87171" font-family="system-ui, sans-serif" font-size="13" font-weight="900">Coil 1 (+Hum) + Coil 2 (&#8722;Hum) = 0 Hum</text>

    <!-- String Signal Isolation -->
    <rect x="20" y="165" width="300" height="120" fill="#0f172a" rx="8" stroke="rgba(34,197,94,0.3)"/>
    <text x="35" y="190" fill="#22c55e" font-family="system-ui, sans-serif" font-size="12" font-weight="800">2. String Audio Vibrations:</text>
    <text x="35" y="215" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">Each pair of strings only vibrates over ONE coil.</text>
    <text x="35" y="238" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">Zero acoustic cancellation between string pairs!</text>
    <text x="35" y="265" fill="#86efac" font-family="system-ui, sans-serif" font-size="13" font-weight="900">Full Single-Coil Clarity + 100% Hum Silence</text>
  </g>
</svg>'''

# 5. JAZZ BASS DUAL SINGLE COIL WIRING
svgs["jazz_bass_dual_single_coil_wiring.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(245,158,11,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 CIRCUIT WIRING &amp; FREQUENCY SHAPING</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">1960 Fender Jazz Bass: Dual Vol / Tone &amp; Mid Scoop</text>

  <!-- Circuit Diagram View -->
  <g transform="translate(45, 115)">
    <rect x="0" y="0" width="705" height="190" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>
    
    <!-- Neck Pickup -->
    <rect x="40" y="30" width="130" height="45" fill="#0b1329" rx="6" stroke="#38bdf8" stroke-width="2"/>
    <text x="105" y="57" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Neck Pickup (Warm)</text>

    <!-- Bridge Pickup -->
    <rect x="40" y="115" width="130" height="45" fill="#0b1329" rx="6" stroke="#f59e0b" stroke-width="2"/>
    <text x="105" y="142" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Bridge Pickup (Bite)</text>

    <!-- Vol Pot 1 -->
    <circle cx="280" cy="52" r="24" fill="#334155" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="57" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Vol 1</text>
    <text x="280" y="90" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">250 k&#937;</text>

    <!-- Vol Pot 2 -->
    <circle cx="280" cy="137" r="24" fill="#334155" stroke="#cbd5e1" stroke-width="2"/>
    <text x="280" y="142" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Vol 2</text>
    <text x="280" y="175" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">250 k&#937;</text>

    <!-- Master Tone -->
    <circle cx="430" cy="95" r="24" fill="#334155" stroke="#22c55e" stroke-width="2"/>
    <text x="430" y="100" fill="#ffffff" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Tone</text>
    <text x="430" y="135" fill="#22c55e" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">.047 &#956;F Cap</text>

    <!-- Output Jack -->
    <rect x="570" y="75" width="90" height="40" fill="#0f172a" rx="6" stroke="#38bdf8"/>
    <text x="615" y="100" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Output Jack</text>

    <!-- Wire Connections -->
    <line x1="170" y1="52" x2="256" y2="52" stroke="#38bdf8" stroke-width="2"/>
    <line x1="170" y1="137" x2="256" y2="137" stroke="#f59e0b" stroke-width="2"/>
    <line x1="304" y1="52" x2="406" y2="95" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="304" y1="137" x2="406" y2="95" stroke="#cbd5e1" stroke-width="2"/>
    <line x1="454" y1="95" x2="570" y2="95" stroke="#38bdf8" stroke-width="2"/>
  </g>

  <!-- Both Pickups on Full = Mid Scoop Explanatory Card -->
  <g transform="translate(45, 320)">
    <rect x="0" y="0" width="705" height="110" fill="#142038" rx="8" stroke="rgba(245,158,11,0.3)"/>
    <text x="25" y="30" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="14" font-weight="800">THE JAZZ BASS "SLAP SCOOP" PHENOMENON (BOTH PICKUPS ON 10):</text>
    <text x="25" y="55" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• When both pickups are maxed, their reverse wind/polarity cancels 50/60 Hz hum like a giant humbucker.</text>
    <text x="25" y="75" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• Due to string sampling separation, comb-filtering notches develop around 500 Hz – 1 kHz, creating a natural mid scoop.</text>
    <text x="25" y="95" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="700">• This scooped midrange + bright presence peak defined the percussive slap &amp; pop sound of funk pioneers (Larry Graham, Marcus Miller).</text>
  </g>
</svg>'''

# 6. BASS PICKUP PLACEMENT & TIMBRE
svgs["bass_pickup_placement_timbre.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(56,189,248,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 HARMONICS &amp; MAGNETIC SAMPLING</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Bass Pickup Placement: Bridge vs Middle vs Neck Timbre</text>

  <!-- Graphic String Anatomy -->
  <g transform="translate(50, 115)">
    <rect x="0" y="0" width="700" height="150" fill="#1e293b" rx="8"/>
    
    <!-- String wave (fundamental) -->
    <path d="M 40,75 Q 350,15 660,75" fill="none" stroke="rgba(56,189,248,0.4)" stroke-width="3" stroke-dasharray="4 4"/>
    <path d="M 40,75 Q 350,135 660,75" fill="none" stroke="rgba(56,189,248,0.4)" stroke-width="3" stroke-dasharray="4 4"/>
    <line x1="40" y1="75" x2="660" y2="75" stroke="#f59e0b" stroke-width="4"/>

    <!-- Neck pickup (e.g. EB-0 / Mudbucker) -->
    <rect x="200" y="50" width="45" height="50" fill="#3b82f6" rx="4" stroke="#ffffff"/>
    <text x="222" y="118" fill="#3b82f6" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Neck / 12th Fret</text>
    <text x="222" y="135" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Max Fundamental</text>

    <!-- Middle pickup (P-Bass sweet spot) -->
    <rect x="360" y="50" width="55" height="50" fill="#22c55e" rx="4" stroke="#ffffff"/>
    <text x="387" y="118" fill="#22c55e" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">P-Bass Sweet Spot</text>
    <text x="387" y="135" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Balanced Punch</text>

    <!-- Bridge pickup (J-Bass bridge / StingRay) -->
    <rect x="520" y="50" width="45" height="50" fill="#f59e0b" rx="4" stroke="#ffffff"/>
    <text x="542" y="118" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Bridge Position</text>
    <text x="542" y="135" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Dense Harmonics / Growl</text>
  </g>

  <!-- 3 Timbre Cards -->
  <g transform="translate(50, 280)">
    <rect x="0" y="0" width="220" height="145" fill="#142038" rx="8" stroke="#3b82f6"/>
    <text x="15" y="25" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">Neck Pickup ("Mudbucker")</text>
    <text x="15" y="50" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Senses near string center antinode</text>
    <text x="15" y="70" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Massive fundamental wave excursion</text>
    <text x="15" y="90" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Very dark, boomy, sub-bass heavy</text>
    <text x="15" y="110" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Heard on: Cream / Jack Bruce (Gibson EB-3)</text>

    <rect x="240" y="0" width="220" height="145" fill="#142038" rx="8" stroke="#22c55e"/>
    <text x="255" y="25" fill="#86efac" font-family="system-ui, sans-serif" font-size="13" font-weight="800">Middle Position (P-Bass)</text>
    <text x="255" y="50" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Positioned at ~1/3 scale length</text>
    <text x="255" y="70" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Perfect harmonic balance</text>
    <text x="255" y="90" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Warm punchy mids; cuts through mix</text>
    <text x="255" y="110" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Heard on: Motown / James Jamerson</text>

    <rect x="480" y="0" width="220" height="145" fill="#142038" rx="8" stroke="#f59e0b"/>
    <text x="495" y="25" fill="#fde047" font-family="system-ui, sans-serif" font-size="13" font-weight="800">Bridge Position (J-Bass / Jaco)</text>
    <text x="495" y="50" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Senses near rigid bridge anchor</text>
    <text x="495" y="70" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Fundamental excursion restricted</text>
    <text x="495" y="90" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Rich in 4th–8th harmonic growl</text>
    <text x="495" y="110" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Heard on: Jaco Pastorius fretless solos</text>
  </g>
</svg>'''

# 7. FLATWOUND VS ROUNDWOUND STRINGS FREQUENCY RESPONSE
svgs["flatwound_vs_roundwound_frequency_response.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(245,158,11,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 STRING METALLURGY &amp; TIMBRE</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Flatwound vs Roundwound Bass Strings Frequency Response</text>

  <!-- Frequency Response Graph -->
  <g transform="translate(60, 120)">
    <!-- Axes -->
    <line x1="40" y1="180" x2="650" y2="180" stroke="#64748b" stroke-width="1.5"/>
    <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" stroke-width="1.5"/>
    
    <text x="35" y="200" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">40 Hz</text>
    <text x="180" y="200" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">200 Hz</text>
    <text x="340" y="200" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">1 kHz</text>
    <text x="490" y="200" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">4 kHz</text>
    <text x="630" y="200" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">10 kHz</text>

    <!-- Curve 1: Flatwound (Strong fundamental, rapid high rolloff) -->
    <path d="M 40,60 Q 180,65 300,100 T 500,165 L 640,178" fill="none" stroke="#38bdf8" stroke-width="3.5"/>
    <text x="210" y="50" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800">Flatwound (Deep fundamental thud; no finger squeak)</text>

    <!-- Curve 2: Roundwound (Bright, extended presence peak, slap buzz) -->
    <path d="M 40,80 Q 200,80 340,75 T 500,60 L 640,140" fill="none" stroke="#f59e0b" stroke-width="3.5"/>
    <text x="440" y="45" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="12" font-weight="800">Roundwound (Bright harmonics &amp; sustain)</text>
  </g>

  <!-- Comparison Cards below -->
  <g transform="translate(60, 335)">
    <rect x="0" y="0" width="320" height="95" fill="#1e293b" rx="8" stroke="rgba(56,189,248,0.3)"/>
    <text x="15" y="25" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">Flatwound Construction (1950s–1960s)</text>
    <text x="15" y="48" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Ribbon wire wrapped flat over core; smooth feel</text>
    <text x="15" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Dark, woody, rapid decay, zero fret wear</text>
    <text x="15" y="88" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Standard on Motown, Stax, early Beatles, and classic reggae</text>

    <rect x="350" y="0" width="320" height="95" fill="#1e293b" rx="8" stroke="rgba(245,158,11,0.3)"/>
    <text x="365" y="25" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800">Roundwound (1966 Rotosound / Entwistle)</text>
    <text x="365" y="48" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Round wire coil leaves ridges along surface</text>
    <text x="365" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• Bright zing, biting attack, extended sustain, fret wear</text>
    <text x="365" y="88" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10.5">Essential for progressive rock, slap bass, metal, and modern pop</text>
  </g>
</svg>'''

# 8. ACTIVE VS PASSIVE BASS PREAMP
svgs["active_vs_passive_bass_preamp.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(168,85,247,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#a855f7" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 ELECTRONICS &amp; PREAMPLIFICATION</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Passive Bass Electronics vs Active 9V Onboard Preamp</text>

  <!-- Left: Passive Circuit -->
  <g transform="translate(45, 120)">
    <rect x="0" y="0" width="340" height="305" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="32" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="15" font-weight="800">Passive Circuit (Fender P / J-Bass)</text>
    
    <text x="20" y="65" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">No Power Source:</tspan> 100% passive components</text>
    <text x="20" y="95" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Cut Only (Attenuate):</tspan> Tone pot only rolls OFF treble</text>
    <text x="20" y="125" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Cannot Boost:</tspan> Zero active gain or boost capability</text>
    <text x="20" y="155" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">High Output Impedance:</tspan> Cable capacitance can roll off highs</text>
    <text x="20" y="185" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Sonic Character:</tspan> Organic, dynamic, woody vintage warmth</text>

    <rect x="20" y="220" width="300" height="65" fill="#0f172a" rx="6" stroke="rgba(56,189,248,0.2)"/>
    <text x="35" y="245" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="800">PASSIVE ADVANTAGE:</text>
    <text x="35" y="268" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">Never dies on stage from flat batteries; dynamic response.</text>
  </g>

  <!-- Right: Active Circuit -->
  <g transform="translate(415, 120)">
    <rect x="0" y="0" width="340" height="305" fill="#1e293b" rx="10" stroke="rgba(168,85,247,0.3)"/>
    <text x="20" y="32" fill="#a855f7" font-family="system-ui, sans-serif" font-size="15" font-weight="800">Active Circuit (Music Man StingRay / Warwick)</text>
    
    <text x="20" y="65" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">9V / 18V Battery:</tspan> Powers onboard FET / op-amp preamp</text>
    <text x="20" y="95" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Boost AND Cut EQ:</tspan> 2-band or 3-band Baxandall tone controls</text>
    <text x="20" y="125" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Active Gain Boost:</tspan> Up to +14 dB boost at 40 Hz and 10 kHz</text>
    <text x="20" y="155" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Low Output Impedance (Low-Z):</tspan> Drives 100m cables cleanly</text>
    <text x="20" y="185" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Sonic Character:</tspan> Hi-fi, punchy, articulate, massive sub-bass</text>

    <rect x="20" y="220" width="300" height="65" fill="#0f172a" rx="6" stroke="rgba(168,85,247,0.2)"/>
    <text x="35" y="245" fill="#c084fc" font-family="system-ui, sans-serif" font-size="11" font-weight="800">ACTIVE ADVANTAGE:</text>
    <text x="35" y="268" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">Total tone shaping direct into studio recording consoles.</text>
  </g>
</svg>'''

# 9. MUSIC MAN STINGRAY PREAMP SCHEMATIC
svgs["music_man_stingray_preamp_schematic.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(245,158,11,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 ICONIC INNOVATION (1976)</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Music Man StingRay: Giant Humbucker &amp; 9V Active EQ</text>

  <!-- Signal Path Architecture -->
  <g transform="translate(45, 120)">
    <rect x="0" y="0" width="705" height="175" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>

    <!-- Large Humbucker with 8 large pole pieces -->
    <rect x="30" y="35" width="130" height="105" fill="#0b1329" rx="8" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="65" cy="65" r="10" fill="#f59e0b"/>
    <circle cx="125" cy="65" r="10" fill="#f59e0b"/>
    <circle cx="65" cy="110" r="10" fill="#f59e0b"/>
    <circle cx="125" cy="110" r="10" fill="#f59e0b"/>
    <text x="95" y="25" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Large 3/8" Alnico Pole Humbucker</text>

    <!-- Arrow -->
    <path d="M 170,87 L 210,87" fill="none" stroke="#64748b" stroke-width="3" marker-end="url(#arrow)"/>

    <!-- 9V Battery -->
    <rect x="220" y="45" width="90" height="85" fill="#1e293b" rx="6" stroke="#ef4444" stroke-width="2"/>
    <text x="265" y="75" fill="#ef4444" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">9V Battery</text>
    <text x="265" y="100" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Power Supply</text>

    <!-- Active Op-Amp Preamp -->
    <polygon points="360,40 360,135 440,87" fill="#142038" stroke="#38bdf8" stroke-width="2"/>
    <text x="390" y="92" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">LM4250</text>
    <text x="400" y="160" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Active Preamp</text>

    <!-- EQ Knobs -->
    <g transform="translate(480, 45)">
      <circle cx="30" cy="42" r="20" fill="#334155" stroke="#f59e0b" stroke-width="2"/>
      <text x="30" y="46" fill="#ffffff" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">Bass</text>
      <text x="30" y="78" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">&#177;14 dB</text>

      <circle cx="85" cy="42" r="20" fill="#334155" stroke="#f59e0b" stroke-width="2"/>
      <text x="85" y="46" fill="#ffffff" font-family="system-ui, sans-serif" font-size="9" font-weight="800" text-anchor="middle">Treble</text>
      <text x="85" y="78" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" text-anchor="middle">&#177;14 dB</text>
    </g>

    <!-- Low-Z Out -->
    <rect x="600" y="65" width="80" height="45" fill="#0f172a" rx="6" stroke="#22c55e" stroke-width="2"/>
    <text x="640" y="92" fill="#22c55e" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Low-Z Out</text>
  </g>

  <!-- 3 Impact Highlights -->
  <g transform="translate(45, 315)">
    <rect x="0" y="0" width="705" height="115" fill="#142038" rx="8" stroke="rgba(245,158,11,0.2)"/>
    <text x="20" y="28" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800">WHY THE STINGRAY REVOLUTIONIZED MODERN BASS TONE:</text>
    <text x="20" y="52" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">1. <tspan fill="#ffffff" font-weight="700">Parallel Humbucker Wiring:</tspan> The large coils were wired in parallel, delivering crisp high-end rather than muddy series tone.</text>
    <text x="20" y="74" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">2. <tspan fill="#ffffff" font-weight="700">Baxandall Active EQ:</tspan> Bassists could boost 40 Hz sub-bass without clouding midrange clarity, ideal for disco, funk &amp; punk.</text>
    <text x="20" y="96" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">3. <tspan fill="#ffffff" font-weight="700">Adopted by Legends:</tspan> Flea (Red Hot Chili Peppers), Bernard Edwards (Chic), Louis Johnson (Brothers Johnson), and Tony Levin.</text>
  </g>
</svg>'''

# 10. SLAP AND POP TECHNIQUE MECHANICS
svgs["slap_and_pop_technique_mechanics.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(56,189,248,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 PERFORMANCE TECHNIQUE &amp; TIMBRE</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Slap &amp; Pop Mechanics: Larry Graham &amp; Percussive Funk</text>

  <!-- Left: Slap Technique -->
  <g transform="translate(45, 115)">
    <rect x="0" y="0" width="340" height="315" fill="#1e293b" rx="10" stroke="rgba(56,189,248,0.3)"/>
    <text x="20" y="32" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="15" font-weight="800">1. The "Slap" (Thumb Strike)</text>
    
    <text x="20" y="65" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Origin:</tspan> Larry Graham (Sly &amp; The Family Stone, 1968)</text>
    <text x="20" y="95" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Acoustic Genesis:</tspan> Substituted for missing drummer</text>
    <text x="20" y="125" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Mechanism:</tspan> Bony knuckle of thumb strikes Low E/A string</text>
    <text x="20" y="155" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Physics:</tspan> String drives forcefully against steel metal fret</text>
    <text x="20" y="185" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Sonic Profile:</tspan> Heavy low-end thump + sharp metallic click</text>
    <text x="20" y="215" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Emulates:</tspan> Acoustic bass drum / kick drum pulse</text>

    <rect x="20" y="250" width="300" height="45" fill="rgba(56,189,248,0.15)" rx="6"/>
    <text x="170" y="278" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">"Thumpin&#39;" = Bass Kick Drum Pulse</text>
  </g>

  <!-- Right: Pop Technique -->
  <g transform="translate(415, 115)">
    <rect x="0" y="0" width="340" height="315" fill="#1e293b" rx="10" stroke="rgba(245,158,11,0.3)"/>
    <text x="20" y="32" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="15" font-weight="800">2. The "Pop" (Finger Snap)</text>
    
    <text x="20" y="65" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Mechanism:</tspan> Index or middle finger hooks under D/G string</text>
    <text x="20" y="95" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Release:</tspan> String is pulled outward and released abruptly</text>
    <text x="20" y="125" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Physics:</tspan> High kinetic rebound snaps against fretboard metal</text>
    <text x="20" y="155" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Sonic Profile:</tspan> Piercing transient spike (2 kHz – 5 kHz crack)</text>
    <text x="20" y="185" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Emulates:</tspan> Snare drum crack or acoustic hand-clap</text>
    <text x="20" y="215" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Studio DI Note:</tspan> Requires optical fast peak limiting / compression</text>

    <rect x="20" y="250" width="300" height="45" fill="rgba(245,158,11,0.15)" rx="6"/>
    <text x="170" y="278" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">"Pluckin&#39;" = Snare Drum Snap Accent</text>
  </g>
</svg>'''

# 11. PALM MUTING & FOAM MUTE DAMPING
svgs["palm_muting_foam_mute_damping.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(34,197,94,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#22c55e" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 MECHANICAL DAMPING &amp; TRANSIENTS</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Palm Muting &amp; Foam Bridge Damping (The Motown Thud)</text>

  <!-- Envelope Comparison: Unmuted vs Muted -->
  <g transform="translate(45, 120)">
    <!-- Unmuted Bass Envelope -->
    <rect x="0" y="0" width="340" height="180" fill="#1e293b" rx="8" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="14" font-weight="800">1. Unmuted Bass String Envelope</text>
    
    <!-- Waveform with long decay -->
    <path d="M 30,100 L 45,40 L 60,140 L 75,55 L 100,120 L 160,85 L 240,95 L 320,100" fill="none" stroke="#38bdf8" stroke-width="2.5"/>
    <text x="20" y="160" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11">Long sustain (3–8 seconds), singing upper harmonics</text>

    <!-- Foam Muted Motown Envelope -->
    <rect x="365" y="0" width="340" height="180" fill="#1e293b" rx="8" stroke="rgba(34,197,94,0.3)"/>
    <text x="385" y="30" fill="#22c55e" font-family="system-ui, sans-serif" font-size="14" font-weight="800">2. Foam-Damped Motown Envelope</text>
    
    <!-- Waveform with steep decay -->
    <path d="M 395,100 L 410,40 L 425,140 L 440,75 L 470,98 L 520,100 L 685,100" fill="none" stroke="#22c55e" stroke-width="2.5"/>
    <text x="385" y="160" fill="#86efac" font-family="system-ui, sans-serif" font-size="11">Rapid decay (&lt;0.5s), dense sub-fundamental "thud"</text>
  </g>

  <!-- Technical Explanation Box -->
  <g transform="translate(45, 320)">
    <rect x="0" y="0" width="705" height="110" fill="#142038" rx="8" stroke="rgba(34,197,94,0.2)"/>
    <text x="25" y="28" fill="#22c55e" font-family="system-ui, sans-serif" font-size="13" font-weight="800">WHY FOAM MUTING DEFINED 1960s HIT RECORDINGS:</text>
    <text x="25" y="52" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#ffffff" font-weight="700">Leo Fender Factory Design:</tspan> Early P-Basses had neoprene rubber foam strips glued underneath the chrome bridge cover.</text>
    <text x="25" y="74" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#ffffff" font-weight="700">James Jamerson &amp; Motown:</tspan> Jamerson wedged heavy foam under flatwound strings, emulating upright double-bass decay.</text>
    <text x="25" y="96" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#ffffff" font-weight="700">Mix Advantage:</tspan> Rapid decay cleared bass space instantly for kick drum transients, eliminating muddy low-end buildup.</text>
  </g>
</svg>'''

# 12. AMPEG SVT TUBE AMPLIFIER SCHEMATIC
svgs["ampeg_svt_tube_amplifier_schematic.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(56,189,248,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 STAGE AMPLIFICATION &amp; VALVES (1969)</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">The Ampeg SVT (Super Valve Technology): 300W &amp; 8x10</text>

  <!-- SVT Head and Cabinet Anatomy -->
  <g transform="translate(45, 115)">
    <!-- 300W Tube Head -->
    <rect x="0" y="0" width="340" height="200" fill="#1e293b" rx="10" stroke="#38bdf8" stroke-width="2"/>
    <text x="20" y="30" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="15" font-weight="800">Ampeg SVT Head (1969)</text>
    
    <text x="20" y="60" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">300 Watts RMS:</tspan> Pure all-valve power (unprecedented in 1969)</text>
    <text x="20" y="85" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">14 Valves Total:</tspan> 6&#215; 6550 power tubes, massive iron transformers</text>
    <text x="20" y="110" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Total Weight:</tspan> ~43 kg (95 lbs) for head alone!</text>
    <text x="20" y="135" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Tone Controls:</tspan> Active midrange selector (220Hz, 800Hz, 3kHz)</text>
    <text x="20" y="160" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Headroom:</tspan> Clean undistorted sub-bass at arena concert volume</text>

    <!-- 8x10 Cabinet -->
    <rect x="365" y="0" width="340" height="200" fill="#1e293b" rx="10" stroke="#f59e0b" stroke-width="2"/>
    <text x="385" y="30" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="15" font-weight="800">The 8&#215;10 "Fridge" Cabinet</text>
    
    <text x="385" y="60" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">8&#215; 10-Inch Drivers:</tspan> Combined surface area exceeds a 15" cone</text>
    <text x="385" y="85" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Fast Transient Speed:</tspan> 10" cones react far faster than a single 18"</text>
    <text x="385" y="110" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Infinite Baffle (Sealed):</tspan> 4 separate sealed chambers (no ports)</text>
    <text x="385" y="135" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Tight Lows:</tspan> Prevents loose speaker cone wobble on Low-E</text>
    <text x="385" y="160" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">• <tspan fill="#ffffff" font-weight="700">Coupling Effect:</tspan> Floor placement boosts low frequencies +6 dB</text>
  </g>

  <!-- Arena Rock Context -->
  <g transform="translate(45, 335)">
    <rect x="0" y="0" width="705" height="95" fill="#142038" rx="8" stroke="rgba(56,189,248,0.2)"/>
    <text x="25" y="26" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12.5" font-weight="800">ROLLING STONES 1969 TOUR TEST &amp; HERITAGE:</text>
    <text x="25" y="50" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">Debuted on The Rolling Stones 1969 US Tour (Bill Wyman &amp; Keith Richards). The SVT solved the inability of bassists to compete with Marshall guitar stacks in stadiums, becoming the undisputed industry standard for rock, metal, and punk.</text>
  </g>
</svg>'''

# 13. DIRECT INJECTION DI TRANSFORMER SCHEMATIC
svgs["direct_injection_di_transformer_schematic.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(34,197,94,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#22c55e" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 RECORDING STUDIO ENGINEERING</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Direct Injection (DI Box): Transformer Isolation &amp; Balancing</text>

  <!-- DI Signal Path -->
  <g transform="translate(45, 120)">
    <rect x="0" y="0" width="705" height="200" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>

    <!-- 1. Instrument Input -->
    <rect x="20" y="60" width="120" height="70" fill="#0b1329" rx="6" stroke="#38bdf8"/>
    <text x="80" y="90" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Bass Guitar</text>
    <text x="80" y="112" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">High-Z (~500k&#937;)</text>

    <!-- Thru Output to Amp -->
    <path d="M 80,60 L 80,30 L 220,30" fill="none" stroke="#f59e0b" stroke-width="2"/>
    <rect x="220" y="15" width="110" height="32" fill="#0f172a" rx="4" stroke="#f59e0b"/>
    <text x="275" y="36" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">Thru (To Stage Amp)</text>

    <!-- DI Transformer Box -->
    <rect x="180" y="60" width="310" height="120" fill="#0f172a" rx="8" stroke="#22c55e" stroke-width="2"/>
    <text x="335" y="85" fill="#22c55e" font-family="system-ui, sans-serif" font-size="13" font-weight="800" text-anchor="middle">Passive Transformer Isolation (e.g. Jensen / Triad)</text>

    <!-- Primary & Secondary Coils -->
    <path d="M 220,110 Q 230,135 240,110 Q 250,135 260,110" fill="none" stroke="#38bdf8" stroke-width="3"/>
    <line x1="280" y1="100" x2="280" y2="150" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="2 2"/>
    <line x1="285" y1="100" x2="285" y2="150" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="2 2"/>
    <path d="M 305,110 Q 315,135 325,110 Q 335,135 345,110" fill="none" stroke="#22c55e" stroke-width="3"/>

    <!-- Ground Lift Switch -->
    <rect x="385" y="115" width="85" height="35" fill="#334155" rx="4" stroke="#cbd5e1"/>
    <text x="427" y="137" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10.5" font-weight="700" text-anchor="middle">Ground Lift</text>

    <!-- XLR Output to Mic Preamp -->
    <rect x="530" y="60" width="155" height="70" fill="#0b1329" rx="6" stroke="#22c55e"/>
    <text x="607" y="90" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">XLR Balanced Out</text>
    <text x="607" y="112" fill="#22c55e" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">Low-Z (~150&#937;) Mic Level</text>
  </g>

  <!-- 3 Essential DI Functions -->
  <g transform="translate(45, 340)">
    <rect x="0" y="0" width="705" height="95" fill="#142038" rx="8" stroke="rgba(34,197,94,0.2)"/>
    <text x="20" y="26" fill="#86efac" font-family="system-ui, sans-serif" font-size="12.5" font-weight="800">THE THREE ESSENTIAL ROLES OF A BASS DI IN EXAM QUESTIONS:</text>
    <text x="20" y="48" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">1. <tspan fill="#ffffff" font-weight="700">Impedance Matching:</tspan> Converts instrument high-Z output to mixer low-Z input, preventing treble loss.</text>
    <text x="20" y="68" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">2. <tspan fill="#ffffff" font-weight="700">Balancing:</tspan> Converts unbalanced 2-conductor signal into balanced 3-pin XLR (common-mode rejection of stage EMI).</text>
    <text x="20" y="88" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">3. <tspan fill="#ffffff" font-weight="700">Galvanic Isolation &amp; Ground Lift:</tspan> Breaks ground loops, eliminating 50/60 Hz hum between amp and recording desk.</text>
  </g>
</svg>'''

# 14. BASS MIC PLUS DI PHASE ALIGNMENT
svgs["bass_mic_plus_di_phase_alignment.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(245,158,11,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 MULTI-TRACK TRACKING &amp; PHASE</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Bass Tracking: Combining DI + Mic (Phase Alignment)</text>

  <!-- Left: Acoustic Delay Physics -->
  <g transform="translate(45, 115)">
    <rect x="0" y="0" width="340" height="190" fill="#1e293b" rx="8" stroke="rgba(255,255,255,0.08)"/>
    <text x="20" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13.5" font-weight="800">1. Physical Time Delay</text>
    
    <text x="20" y="58" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#38bdf8" font-weight="700">DI Signal:</tspan> Travels through cable at near light speed (~0 ms delay)</text>
    <text x="20" y="85" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#f59e0b" font-weight="700">Mic on Speaker:</tspan> Sound travels through air at ~343 m/s (~1 ft / ms)</text>
    <text x="20" y="112" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• A microphone placed 30 cm from grille is delayed by ~1.0 ms!</text>
    <text x="20" y="140" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#ef4444" font-weight="700">The Problem:</tspan> Summing DI + delayed Mic causes comb filtering</text>
    <text x="20" y="165" fill="#f87171" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Destructive phase cancellation wipes out Low-E fundamentals!</text>
  </g>

  <!-- Right: DAW Phase Fix -->
  <g transform="translate(415, 115)">
    <rect x="0" y="0" width="340" height="190" fill="#1e293b" rx="8" stroke="rgba(34,197,94,0.3)"/>
    <text x="20" y="28" fill="#22c55e" font-family="system-ui, sans-serif" font-size="13.5" font-weight="800">2. Modern DAW Production Solution</text>
    
    <text x="20" y="58" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#86efac" font-weight="700">Waveform Nudge:</tspan> Zoom in and align mic transient peak with DI</text>
    <text x="20" y="85" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#86efac" font-weight="700">Sample Delay Plugin:</tspan> Delay DI track by 0.5–1.5 ms to match mic</text>
    <text x="20" y="112" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#86efac" font-weight="700">Polarity Check:</tspan> Flip &#248; 180&#176; phase switch; select loudest bass</text>
    <text x="20" y="140" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">• <tspan fill="#86efac" font-weight="700">Frequency Split:</tspan> Use DI for sub-bass (&lt;150Hz), Mic for grit (&gt;150Hz)</text>
    <text x="20" y="165" fill="#86efac" font-family="system-ui, sans-serif" font-size="11" font-weight="700">Result: Rock-solid fundamental + rich tube cabinet character</text>
  </g>

  <!-- Visual Waveform Alignment -->
  <g transform="translate(45, 320)">
    <rect x="0" y="0" width="705" height="110" fill="#142038" rx="8" stroke="rgba(245,158,11,0.2)"/>
    <text x="20" y="28" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800">PHASE ALIGNED SUMMATION (IN-PHASE vs OUT-OF-PHASE):</text>
    <text x="20" y="55" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="12">DI Track: ────────^v^v^v──────── (Instantaneous electrical capture)</text>
    <text x="20" y="78" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="12">Mic Track: ──────────^v^v^v────── (Delayed by acoustic air transit time)</text>
    <text x="20" y="100" fill="#22c55e" font-family="system-ui, sans-serif" font-size="12" font-weight="700">Aligned Sum: ───────[+6 dB BASS PUNCH]─────── (Zero low-frequency cancellation)</text>
  </g>
</svg>'''

# 15. FRETLESS BASS MWAH PHYSICS
svgs["fretless_bass_mwah_physics.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(56,189,248,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 ACOUSTIC HARMONICS &amp; SUSTAIN</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">The Fretless Bass: Jaco Pastorius &amp; The "Mwah" Timbre</text>

  <!-- Fretless String Vibration Anatomy -->
  <g transform="translate(45, 120)">
    <rect x="0" y="0" width="705" height="180" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>

    <!-- Wood / Epoxy Fingerboard -->
    <rect x="30" y="120" width="645" height="30" fill="#451a03" rx="2" stroke="#78350f"/>
    <text x="40" y="140" fill="#fbbf24" font-family="system-ui, sans-serif" font-size="11" font-weight="800">Hard Epoxy Coated Rosewood / Ebony Fingerboard (Zero Frets)</text>

    <!-- Finger Press -->
    <ellipse cx="250" cy="115" rx="20" ry="12" fill="#fca5a5" stroke="#e11d48"/>
    <text x="250" y="90" fill="#e11d48" font-family="system-ui, sans-serif" font-size="11" font-weight="800" text-anchor="middle">Fleshy Finger Pad</text>

    <!-- Vibrating String grazing fingerboard -->
    <path d="M 40,118 Q 240,118 250,118 Q 450,105 660,110" fill="none" stroke="#38bdf8" stroke-width="3"/>
    <circle cx="660" cy="110" r="5" fill="#94a3b8"/>
    <text x="660" y="95" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">Bridge</text>

    <!-- The "Mwah" Grazing Zone -->
    <rect x="270" y="108" width="120" height="15" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" stroke-dasharray="2 2"/>
    <text x="330" y="145" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">"Mwah" Grazing Boundary</text>
  </g>

  <!-- 3 Scientific Points -->
  <g transform="translate(45, 315)">
    <rect x="0" y="0" width="705" height="115" fill="#142038" rx="8" stroke="rgba(56,189,248,0.2)"/>
    <text x="20" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">THE PHYSICS OF FRETLESS BASS RESONANCE:</text>
    <text x="20" y="52" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">1. <tspan fill="#ffffff" font-weight="700">Continuous Grazing Boundary:</tspan> Unlike hard metal frets, the string subtly grazes the coated fingerboard as it vibrates.</text>
    <text x="20" y="74" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">2. <tspan fill="#ffffff" font-weight="700">Dynamic Harmonic Filter:</tspan> The initial transient attack is damped by the finger flesh, producing a vocal blooming swell ("mwah").</text>
    <text x="20" y="96" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">3. <tspan fill="#ffffff" font-weight="700">Microtonal Vibrato:</tspan> Allows true expressive vocal-style vibrato and microtonal glissandos (Jaco Pastorius, Weather Report).</text>
  </g>
</svg>'''

# 16. EXTENDED SCALE 5-STRING TENSION CHART
svgs["extended_scale_5_string_tension_chart.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(245,158,11,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 MODERN INSTRUMENT ARCHITECTURE</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">5-String Basses &amp; Extended Scale Lengths (35" vs 34")</text>

  <!-- Comparison Table -->
  <g transform="translate(45, 115)">
    <!-- Header -->
    <rect x="0" y="0" width="705" height="40" fill="#334155" rx="6"/>
    <text x="20" y="25" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="800">Scale Length</text>
    <text x="170" y="25" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="800">Low-B Tension</text>
    <text x="320" y="25" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="800">Tonal Characteristics</text>
    <text x="540" y="25" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="800">Typical Models</text>

    <!-- Row 1: 34" Standard -->
    <rect x="0" y="45" width="705" height="60" fill="#1e293b" rx="6"/>
    <text x="20" y="80" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="700">34.0 Inches</text>
    <text x="170" y="73" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">~30–32 lbs</text>
    <text x="170" y="92" fill="#ef4444" font-family="system-ui, sans-serif" font-size="10.5">Can feel floppy / muddy</text>
    <text x="320" y="73" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">Warm vintage sound, but low-B string</text>
    <text x="320" y="92" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">often lacks fundamental pitch definition.</text>
    <text x="540" y="80" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11.5">Fender Jazz 5, Music Man</text>

    <!-- Row 2: 35" Extended -->
    <rect x="0" y="112" width="705" height="60" fill="#1e293b" rx="6" stroke="#22c55e" stroke-width="1.5"/>
    <text x="20" y="147" fill="#22c55e" font-family="system-ui, sans-serif" font-size="13" font-weight="700">35.0 Inches</text>
    <text x="170" y="140" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">~35–37 lbs</text>
    <text x="170" y="159" fill="#22c55e" font-family="system-ui, sans-serif" font-size="10.5">+15% Higher Tension</text>
    <text x="320" y="140" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">Tight, punchy, articulate Low-B (30.9 Hz).</text>
    <text x="320" y="159" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">Clean transient attack without fret clatter.</text>
    <text x="540" y="147" fill="#86efac" font-family="system-ui, sans-serif" font-size="11.5">Spector 5, Lakland, Modulus</text>

    <!-- Row 3: Multi-Scale Fanned Fret (34"-37") -->
    <rect x="0" y="179" width="705" height="60" fill="#1e293b" rx="6" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="20" y="214" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="700">34"–37" Multi-Scale</text>
    <text x="170" y="207" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">Optimized Tension</text>
    <text x="170" y="226" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="10.5">Equal across all 5 strings</text>
    <text x="320" y="207" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">37" for Low-B ensures thunderous clarity;</text>
    <text x="320" y="226" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">34" for high G preserves sweet bendability.</text>
    <text x="540" y="214" fill="#fde047" font-family="system-ui, sans-serif" font-size="11.5">Dingwall Combustion, Ibanez</text>
  </g>

  <!-- Summary Banner -->
  <g transform="translate(45, 375)">
    <rect x="0" y="0" width="705" height="60" fill="#142038" rx="6" stroke="rgba(245,158,11,0.2)"/>
    <text x="352" y="35" fill="#fde047" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Mersenne Tension Rule: To keep thick strings from rattling at 30.9 Hz, scale length MUST increase.</text>
  </g>
</svg>'''

# 17. BASS DSP PROFILING AND CAB IR
svgs["bass_dsp_profiling_and_cab_ir.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(56,189,248,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">AO3 MODERN DIGITAL PRODUCTION</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">Modern Digital Bass Workflow: DSP Amp Modelling &amp; Cab IRs</text>

  <!-- Workflow Diagram -->
  <g transform="translate(45, 115)">
    <rect x="0" y="0" width="705" height="180" fill="#1e293b" rx="10" stroke="rgba(255,255,255,0.08)"/>

    <!-- Bass Direct Input -->
    <rect x="20" y="45" width="110" height="90" fill="#0b1329" rx="8" stroke="#38bdf8"/>
    <text x="75" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Bass Guitar</text>
    <text x="75" y="105" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Dry DI Out</text>

    <!-- Audio Interface / DAW -->
    <rect x="160" y="45" width="120" height="90" fill="#0b1329" rx="8" stroke="#22c55e"/>
    <text x="220" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">24-Bit / 96kHz</text>
    <text x="220" y="105" fill="#22c55e" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">Clean Preamp DI</text>

    <!-- DSP Amp Plugin (Neural DSP / Helix) -->
    <rect x="310" y="45" width="170" height="90" fill="#142038" rx="8" stroke="#f59e0b" stroke-width="2"/>
    <text x="395" y="75" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">DSP Tube Emulation</text>
    <text x="395" y="98" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">SVT 6550 Valve Sag &amp; Drive</text>
    <text x="395" y="118" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">(Darkglass / Ampeg SVT)</text>

    <!-- Convolution IR Cabinet -->
    <rect x="510" y="45" width="175" height="90" fill="#0b1329" rx="8" stroke="#a855f7" stroke-width="2"/>
    <text x="597" y="75" fill="#a855f7" font-family="system-ui, sans-serif" font-size="12" font-weight="800" text-anchor="middle">Cabinet Impulse Response</text>
    <text x="597" y="98" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10.5" text-anchor="middle">8&#215;10 Sealed Cab + Mic IR</text>
    <text x="597" y="118" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle">(AKG D112 / Neumann U47)</text>

    <!-- Flow Arrows -->
    <line x1="130" y1="90" x2="160" y2="90" stroke="#64748b" stroke-width="2"/>
    <line x1="280" y1="90" x2="310" y2="90" stroke="#64748b" stroke-width="2"/>
    <line x1="480" y1="90" x2="510" y2="90" stroke="#64748b" stroke-width="2"/>
  </g>

  <!-- 3 Modern Production Advantages -->
  <g transform="translate(45, 315)">
    <rect x="0" y="0" width="705" height="115" fill="#142038" rx="8" stroke="rgba(56,189,248,0.2)"/>
    <text x="20" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">ADVANTAGES OF MODERN DSP BASS TRACKING IN THE BOX:</text>
    <text x="20" y="52" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">1. <tspan fill="#ffffff" font-weight="700">Zero Acoustic Bleed:</tspan> Bass can be tracked in bedroom or control room without microphone feedback or room standing waves.</text>
    <text x="20" y="74" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">2. <tspan fill="#ffffff" font-weight="700">Re-Amping Flexibility:</tspan> The clean 24-bit dry DI audio is preserved; engineers can swap simulated amps and speaker IRs during mixdown.</text>
    <text x="20" y="96" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11.5">3. <tspan fill="#ffffff" font-weight="700">Multi-Band Processing:</tspan> Sub-bass (&lt;100 Hz) kept perfectly clean and mono, while midrange (200Hz–2kHz) receives tube saturation.</text>
  </g>
</svg>'''

# 18. BASS REVISION MATRIX SUMMARY
svgs["bass_revision_matrix_summary.svg"] = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <rect width="800" height="480" fill="#080e1a" rx="14"/>
  <rect x="20" y="20" width="760" height="440" fill="#0f172a" stroke="rgba(34,197,94,0.3)" stroke-width="1.5" rx="12"/>
  
  <text x="40" y="55" fill="#22c55e" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">COMPONENT 3 REVISION SUMMARY</text>
  <text x="40" y="85" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="900">The Bass Guitar: Exam Syllabus Cheat Sheet &amp; Keywords</text>

  <!-- 4 Summary Columns -->
  <g transform="translate(45, 115)">
    <!-- Col 1: History -->
    <rect x="0" y="0" width="165" height="315" fill="#1e293b" rx="8" stroke="rgba(255,255,255,0.08)"/>
    <text x="15" y="28" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="13" font-weight="800">1. Timeline</text>
    <text x="15" y="55" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">1951:</tspan> Fender Precision (34" fretted solidbody)</text>
    <text x="15" y="90" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">1956:</tspan> H&#246;fner 500/1 (30" hollow violin)</text>
    <text x="15" y="125" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">1957:</tspan> Split-Coil P-Bass (RWRP hum-free)</text>
    <text x="15" y="160" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">1960:</tspan> Fender Jazz Bass (dual pickups, narrow neck)</text>
    <text x="15" y="195" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">1969:</tspan> Ampeg SVT (300W tube, 8x10 cab)</text>
    <text x="15" y="230" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">1976:</tspan> Music Man StingRay (9V active EQ)</text>

    <!-- Col 2: Electronics -->
    <rect x="180" y="0" width="165" height="315" fill="#1e293b" rx="8" stroke="rgba(255,255,255,0.08)"/>
    <text x="195" y="28" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="13" font-weight="800">2. Electronics</text>
    <text x="195" y="55" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Split-Coil:</tspan> 2 offset RWRP coils cancel hum</text>
    <text x="195" y="95" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Jazz Pair:</tspan> Both full creates 1 kHz mid scoop</text>
    <text x="195" y="135" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Active 9V:</tspan> Boost &amp; cut Baxandall EQ, low-Z</text>
    <text x="195" y="175" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Pots:</tspan> 250k&#937; passive with .047&#956;F capacitor</text>
    <text x="195" y="215" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Strings:</tspan> Flatwound (thud) vs Roundwound (zing)</text>

    <!-- Col 3: Techniques -->
    <rect x="360" y="0" width="165" height="315" fill="#1e293b" rx="8" stroke="rgba(255,255,255,0.08)"/>
    <text x="375" y="28" fill="#22c55e" font-family="system-ui, sans-serif" font-size="13" font-weight="800">3. Techniques</text>
    <text x="375" y="55" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Fingerstyle:</tspan> Warm, round fundamental tone</text>
    <text x="375" y="95" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Plectrum:</tspan> Sharp transient click, rock drive</text>
    <text x="375" y="135" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Slap &amp; Pop:</tspan> Thumb thump (kick) + finger snap (snare)</text>
    <text x="375" y="185" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Muting:</tspan> Palm/foam dampens sustain (Motown)</text>
    <text x="375" y="225" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Fretless:</tspan> Epoxy coating, blooming "mwah" vibrato</text>

    <!-- Col 4: Studio DI -->
    <rect x="540" y="0" width="165" height="315" fill="#1e293b" rx="8" stroke="rgba(255,255,255,0.08)"/>
    <text x="555" y="28" fill="#a855f7" font-family="system-ui, sans-serif" font-size="13" font-weight="800">4. Studio &amp; Mix</text>
    <text x="555" y="55" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">DI Box:</tspan> High-Z to low-Z, transformer isolation</text>
    <text x="555" y="95" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">DI + Mic Split:</tspan> Requires DAW phase alignment</text>
    <text x="555" y="135" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Compression:</tspan> Optical (LA-2A) or 1176 smooths dynamics</text>
    <text x="555" y="185" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Mono Bass:</tspan> Always center-panned below 150 Hz</text>
    <text x="555" y="225" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="11">• <tspan fill="#ffffff" font-weight="700">Cab IRs:</tspan> Convolution models 8x10 speaker cone</text>
  </g>
</svg>'''

print(f"Writing {len(svgs)} SVGs to {OUT_DIR}...")
for fname, content in svgs.items():
    path = os.path.join(OUT_DIR, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())
    # Validate XML
    try:
        ET.fromstring(content.strip())
    except Exception as e:
        print(f"XML Validation Error in {fname}: {e}")
        raise e

print(f"ALL {len(svgs)} SVGs GENERATED AND VALIDATED AS 100% VALID XML!")
