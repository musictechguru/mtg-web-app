import os, xml.etree.ElementTree as ET

OUT_DIR = "public/images/slides/the_synthesizer"
os.makedirs(OUT_DIR, exist_ok=True)

# Common SVG styles
BG = "#0b1120"
CARD = "#131e36"
BORDER = "rgba(255, 255, 255, 0.12)"
PURPLE = "#c084fc"
CYAN = "#38bdf8"
EMERALD = "#34d399"
AMBER = "#fbbf24"
WHITE = "#ffffff"
MUTED = "#94a3b8"

svgs = {}

# 1. Subtractive Synthesis Signal Flow
svgs["subtractive_synthesis_signal_flow.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">SUBTRACTIVE SYNTHESIS SIGNAL FLOW</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Classic Analog Architecture: VCO &#8594; VCF &#8594; VCA with Modulation Control</text>

  <!-- Audio Path Blocks -->
  <!-- VCO -->
  <rect x="60" y="140" width="180" height="110" rx="10" fill="{CARD}" stroke="{PURPLE}" stroke-width="2"/>
  <text x="150" y="175" fill="{PURPLE}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">VCO</text>
  <text x="150" y="195" fill="{WHITE}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Voltage Controlled Osc</text>
  <text x="150" y="225" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Saw, Square, Triangle, Sine</text>

  <!-- Arrow 1 -->
  <line x1="240" y1="195" x2="310" y2="195" stroke="{WHITE}" stroke-width="3" stroke-linecap="round"/>
  <polygon points="310,190 320,195 310,200" fill="{WHITE}"/>
  <text x="280" y="185" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Raw Audio</text>

  <!-- VCF -->
  <rect x="320" y="140" width="180" height="110" rx="10" fill="{CARD}" stroke="{CYAN}" stroke-width="2"/>
  <text x="410" y="175" fill="{CYAN}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">VCF</text>
  <text x="410" y="195" fill="{WHITE}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Voltage Controlled Filter</text>
  <text x="410" y="225" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Cutoff &amp; Resonance (Q)</text>

  <!-- Arrow 2 -->
  <line x1="500" y1="195" x2="570" y2="195" stroke="{WHITE}" stroke-width="3" stroke-linecap="round"/>
  <polygon points="570,190 580,195 570,200" fill="{WHITE}"/>
  <text x="540" y="185" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Filtered</text>

  <!-- VCA -->
  <rect x="580" y="140" width="160" height="110" rx="10" fill="{CARD}" stroke="{EMERALD}" stroke-width="2"/>
  <text x="660" y="175" fill="{EMERALD}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">VCA</text>
  <text x="660" y="195" fill="{WHITE}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Voltage Controlled Amp</text>
  <text x="660" y="225" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Dynamic Output Level</text>

  <!-- Output Arrow -->
  <line x1="740" y1="195" x2="780" y2="195" stroke="{EMERALD}" stroke-width="3"/>
  <polygon points="775,190 785,195 775,200" fill="{EMERALD}"/>

  <!-- Modulation Blocks -->
  <!-- LFO -->
  <rect x="180" y="300" width="180" height="90" rx="10" fill="{CARD}" stroke="{AMBER}" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="270" y="330" fill="{AMBER}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">LFO (Sub-Audible &lt;20Hz)</text>
  <text x="270" y="355" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Vibrato (VCO) &amp; Wobble (VCF)</text>
  <line x1="220" y1="300" x2="150" y2="250" stroke="{AMBER}" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="310" y1="300" x2="380" y2="250" stroke="{AMBER}" stroke-width="1.5" stroke-dasharray="3,3"/>

  <!-- ADSR Envelopes -->
  <rect x="460" y="300" width="220" height="90" rx="10" fill="{CARD}" stroke="{PURPLE}" stroke-width="1.5"/>
  <text x="570" y="330" fill="{PURPLE}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">ADSR ENVELOPE GENS</text>
  <text x="570" y="355" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Filter Env (VCF) &amp; Amp Env (VCA)</text>
  <line x1="510" y1="300" x2="440" y2="250" stroke="{PURPLE}" stroke-width="1.5"/>
  <line x1="630" y1="300" x2="660" y2="250" stroke="{PURPLE}" stroke-width="1.5"/>
</svg>'''

# 2. Oscillator Waveforms and Harmonics
svgs["oscillator_waveforms_harmonics.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">RAW OSCILLATOR WAVEFORMS &amp; HARMONIC SPECTRA</text>

  <!-- 4 Waveforms Grid -->
  <!-- Sawtooth -->
  <g transform="translate(40, 85)">
    <rect width="340" height="150" fill="{CARD}" rx="8" stroke="{BORDER}" stroke-width="1"/>
    <text x="20" y="30" fill="{PURPLE}" font-family="sans-serif" font-size="14" font-weight="800">1. SAWTOOTH WAVE</text>
    <text x="20" y="50" fill="{MUTED}" font-family="sans-serif" font-size="11">Contains ALL integer harmonics (1/n amplitude)</text>
    <text x="20" y="68" fill="{WHITE}" font-family="sans-serif" font-size="11">Sound: Bright, buzzy, rich (Strings, Brass, Leads)</text>
    <!-- Wave plot -->
    <path d="M 20 120 L 70 85 L 70 120 L 120 85 L 120 120 L 170 85" fill="none" stroke="{PURPLE}" stroke-width="2.5"/>
    <!-- Harmonics bars -->
    <line x1="210" y1="130" x2="210" y2="90" stroke="{PURPLE}" stroke-width="4"/>
    <line x1="225" y1="130" x2="225" y2="105" stroke="{PURPLE}" stroke-width="4"/>
    <line x1="240" y1="130" x2="240" y2="112" stroke="{PURPLE}" stroke-width="4"/>
    <line x1="255" y1="130" x2="255" y2="118" stroke="{PURPLE}" stroke-width="4"/>
    <line x1="270" y1="130" x2="270" y2="122" stroke="{PURPLE}" stroke-width="4"/>
    <text x="240" y="142" fill="{MUTED}" font-family="sans-serif" font-size="9" text-anchor="middle">All Harmonics (1,2,3,4,5...)</text>
  </g>

  <!-- Square / Pulse -->
  <g transform="translate(420, 85)">
    <rect width="340" height="150" fill="{CARD}" rx="8" stroke="{BORDER}" stroke-width="1"/>
    <text x="20" y="30" fill="{CYAN}" font-family="sans-serif" font-size="14" font-weight="800">2. SQUARE / PULSE WAVE</text>
    <text x="20" y="50" fill="{MUTED}" font-family="sans-serif" font-size="11">Contains ODD harmonics only (50% duty cycle)</text>
    <text x="20" y="68" fill="{WHITE}" font-family="sans-serif" font-size="11">Sound: Hollow, woody, nasal (Clarinet, Bass)</text>
    <!-- Wave plot -->
    <path d="M 20 120 L 20 85 L 55 85 L 55 120 L 90 120 L 90 85 L 125 85 L 125 120 L 160 120" fill="none" stroke="{CYAN}" stroke-width="2.5"/>
    <!-- Harmonics bars -->
    <line x1="210" y1="130" x2="210" y2="90" stroke="{CYAN}" stroke-width="4"/>
    <line x1="230" y1="130" x2="230" y2="108" stroke="{CYAN}" stroke-width="4"/>
    <line x1="250" y1="130" x2="250" y2="116" stroke="{CYAN}" stroke-width="4"/>
    <line x1="270" y1="130" x2="270" y2="122" stroke="{CYAN}" stroke-width="4"/>
    <text x="240" y="142" fill="{MUTED}" font-family="sans-serif" font-size="9" text-anchor="middle">Odd Only (1, 3, 5, 7...)</text>
  </g>

  <!-- Triangle -->
  <g transform="translate(40, 255)">
    <rect width="340" height="150" fill="{CARD}" rx="8" stroke="{BORDER}" stroke-width="1"/>
    <text x="20" y="30" fill="{EMERALD}" font-family="sans-serif" font-size="14" font-weight="800">3. TRIANGLE WAVE</text>
    <text x="20" y="50" fill="{MUTED}" font-family="sans-serif" font-size="11">Odd harmonics falling at 1/n&#178; (rapid roll-off)</text>
    <text x="20" y="68" fill="{WHITE}" font-family="sans-serif" font-size="11">Sound: Mellow, soft flute, subtle sub-tone</text>
    <!-- Wave plot -->
    <path d="M 20 102 L 45 85 L 95 120 L 145 85 L 170 102" fill="none" stroke="{EMERALD}" stroke-width="2.5"/>
    <!-- Harmonics bars -->
    <line x1="210" y1="130" x2="210" y2="90" stroke="{EMERALD}" stroke-width="4"/>
    <line x1="230" y1="130" x2="230" y2="124" stroke="{EMERALD}" stroke-width="4"/>
    <line x1="250" y1="130" x2="250" y2="128" stroke="{EMERALD}" stroke-width="4"/>
    <text x="240" y="142" fill="{MUTED}" font-family="sans-serif" font-size="9" text-anchor="middle">Weak Odd Harmonics</text>
  </g>

  <!-- Sine Wave -->
  <g transform="translate(420, 255)">
    <rect width="340" height="150" fill="{CARD}" rx="8" stroke="{BORDER}" stroke-width="1"/>
    <text x="20" y="30" fill="{AMBER}" font-family="sans-serif" font-size="14" font-weight="800">4. SINE WAVE</text>
    <text x="20" y="50" fill="{MUTED}" font-family="sans-serif" font-size="11">Pure fundamental frequency with ZERO overtones</text>
    <text x="20" y="68" fill="{WHITE}" font-family="sans-serif" font-size="11">Sound: Pure test tone, sub-bass, 808 kick</text>
    <!-- Wave plot -->
    <path d="M 20 102 Q 45 75 70 102 T 120 102 T 170 102" fill="none" stroke="{AMBER}" stroke-width="2.5"/>
    <!-- Harmonics bars -->
    <line x1="210" y1="130" x2="210" y2="90" stroke="{AMBER}" stroke-width="4"/>
    <text x="240" y="142" fill="{MUTED}" font-family="sans-serif" font-size="9" text-anchor="middle">Fundamental Only</text>
  </g>
</svg>'''

# 3. VCF Filter Types and Cutoff / Resonance
svgs["vcf_filter_types_and_cutoff_resonance.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">VOLTAGE CONTROLLED FILTER (VCF) RESPONSE</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Low-Pass Filter Curve, Cutoff Frequency (fc), Resonance Peak (Q) &amp; Filter Slopes</text>

  <!-- Main Frequency Response Plot -->
  <g transform="translate(60, 110)">
    <rect width="680" height="280" fill="{CARD}" rx="10" stroke="{BORDER}" stroke-width="1"/>
    
    <!-- Axes -->
    <line x1="60" y1="230" x2="630" y2="230" stroke="{MUTED}" stroke-width="1.5"/>
    <line x1="60" y1="30" x2="60" y2="230" stroke="{MUTED}" stroke-width="1.5"/>
    
    <text x="345" y="260" fill="{MUTED}" font-family="sans-serif" font-size="12" text-anchor="middle">Frequency (Hz) &#8594; Logarithmic Scale (20Hz to 20kHz)</text>
    <text x="25" y="130" fill="{MUTED}" font-family="sans-serif" font-size="12" transform="rotate(-90 25 130)" text-anchor="middle">Gain (dB)</text>

    <!-- Flat passband -->
    <path d="M 60 70 L 260 70 C 310 70 330 35 350 40 C 370 45 390 120 430 180 L 480 230" fill="none" stroke="{CYAN}" stroke-width="3.5"/>
    
    <!-- Resonance Peak marker -->
    <circle cx="350" cy="40" r="6" fill="{PURPLE}"/>
    <text x="350" y="25" fill="{PURPLE}" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">Resonance Peak (Q Boost)</text>
    
    <!-- Cutoff vertical line -->
    <line x1="350" y1="40" x2="350" y2="230" stroke="{WHITE}" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="350" y="245" fill="{WHITE}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Cutoff Frequency (fc)</text>

    <!-- Passband vs Stopband Shading -->
    <rect x="60" y="70" width="270" height="160" fill="rgba(56, 189, 248, 0.08)"/>
    <text x="180" y="140" fill="{CYAN}" font-family="sans-serif" font-size="14" font-weight="800">PASSBAND</text>
    <text x="180" y="160" fill="{MUTED}" font-family="sans-serif" font-size="11">Frequencies Unaffected</text>

    <!-- Filter Slopes -->
    <text x="520" y="110" fill="{AMBER}" font-family="sans-serif" font-size="13" font-weight="700">Filter Slopes (Rolloff):</text>
    <text x="520" y="135" fill="{WHITE}" font-family="sans-serif" font-size="12">&#8226; 24 dB/oct (4-Pole Ladder - Moog)</text>
    <text x="520" y="155" fill="{WHITE}" font-family="sans-serif" font-size="12">&#8226; 12 dB/oct (2-Pole - Oberheim)</text>
    <text x="520" y="180" fill="{EMERALD}" font-family="sans-serif" font-size="11">Self-Oscillation occurs at maximum Q</text>
  </g>
</svg>'''

# 4. ADSR Envelope Stages Diagram
svgs["adsr_envelope_stages_diagram.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">THE 4-STAGE ADSR ENVELOPE GENERATOR</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Shaping Signal Voltage (VCA Amplitude or VCF Filter Cutoff) Over Time</text>

  <g transform="translate(60, 110)">
    <rect width="680" height="280" fill="{CARD}" rx="10" stroke="{BORDER}" stroke-width="1"/>
    
    <!-- Axes -->
    <line x1="60" y1="210" x2="630" y2="210" stroke="{MUTED}" stroke-width="1.5"/>
    <line x1="60" y1="30" x2="60" y2="210" stroke="{MUTED}" stroke-width="1.5"/>
    <text x="630" y="235" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="end">Time &#8594;</text>
    <text x="35" y="120" fill="{MUTED}" font-family="sans-serif" font-size="11" transform="rotate(-90 35 120)" text-anchor="middle">Voltage / Level</text>

    <!-- ADSR Curve -->
    <!-- Attack: (60, 210) to (180, 50) -->
    <line x1="60" y1="210" x2="180" y2="50" stroke="{PURPLE}" stroke-width="3.5"/>
    <!-- Decay: (180, 50) to (290, 130) -->
    <line x1="180" y1="50" x2="290" y2="130" stroke="{CYAN}" stroke-width="3.5"/>
    <!-- Sustain: (290, 130) to (470, 130) -->
    <line x1="290" y1="130" x2="470" y2="130" stroke="{EMERALD}" stroke-width="3.5"/>
    <!-- Release: (470, 130) to (600, 210) -->
    <line x1="470" y1="130" x2="600" y2="210" stroke="{AMBER}" stroke-width="3.5"/>

    <!-- Key Down & Key Up markers -->
    <line x1="60" y1="20" x2="60" y2="210" stroke="{WHITE}" stroke-width="1" stroke-dasharray="3,3"/>
    <rect x="70" y="25" width="80" height="20" rx="4" fill="rgba(255,255,255,0.1)"/>
    <text x="110" y="39" fill="{WHITE}" font-family="sans-serif" font-size="10" font-weight="700" text-anchor="middle">KEY DOWN</text>

    <line x1="470" y1="20" x2="470" y2="210" stroke="{WHITE}" stroke-width="1" stroke-dasharray="3,3"/>
    <rect x="480" y="25" width="70" height="20" rx="4" fill="rgba(255,255,255,0.1)"/>
    <text x="515" y="39" fill="{WHITE}" font-family="sans-serif" font-size="10" font-weight="700" text-anchor="middle">KEY UP</text>

    <!-- Stage Labels -->
    <text x="120" y="120" fill="{PURPLE}" font-family="sans-serif" font-size="13" font-weight="800">ATTACK</text>
    <text x="120" y="138" fill="{MUTED}" font-family="sans-serif" font-size="10">Time to Peak</text>

    <text x="235" y="90" fill="{CYAN}" font-family="sans-serif" font-size="13" font-weight="800">DECAY</text>
    <text x="235" y="108" fill="{MUTED}" font-family="sans-serif" font-size="10">Time to Sustain</text>

    <text x="380" y="115" fill="{EMERALD}" font-family="sans-serif" font-size="13" font-weight="800">SUSTAIN</text>
    <text x="380" y="133" fill="{MUTED}" font-family="sans-serif" font-size="10">HELD LEVEL (Volts)</text>

    <text x="535" y="160" fill="{AMBER}" font-family="sans-serif" font-size="13" font-weight="800">RELEASE</text>
    <text x="535" y="178" fill="{MUTED}" font-family="sans-serif" font-size="10">Time to Zero</text>
  </g>
</svg>'''

# 5. LFO Modulation Routing Diagram
svgs["lfo_modulation_routing_diagram.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">LOW FREQUENCY OSCILLATOR (LFO) MODULATION</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Cyclic Sub-Audible Control (&lt;20 Hz) Applied to 3 Main Synthesis Destinations</text>

  <!-- LFO Source Block -->
  <g transform="translate(60, 160)">
    <rect width="200" height="150" fill="{CARD}" rx="12" stroke="{AMBER}" stroke-width="2"/>
    <text x="100" y="35" fill="{AMBER}" font-family="sans-serif" font-size="16" font-weight="800" text-anchor="middle">LFO SOURCE</text>
    <text x="100" y="55" fill="{WHITE}" font-family="sans-serif" font-size="12" text-anchor="middle">Rate: 0.1 Hz to 20 Hz</text>
    <!-- Wave icon -->
    <path d="M 40 100 Q 70 70 100 100 T 160 100" fill="none" stroke="{AMBER}" stroke-width="3"/>
    <text x="100" y="130" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Sine, Triangle, Sq, S&amp;H</text>
  </g>

  <!-- 3 Destinations -->
  <!-- 1. VCO -> Pitch Vibrato -->
  <g transform="translate(360, 110)">
    <rect width="360" height="80" fill="{CARD}" rx="8" stroke="{PURPLE}" stroke-width="1.5"/>
    <text x="20" y="32" fill="{PURPLE}" font-family="sans-serif" font-size="14" font-weight="800">1. VCO FREQUENCY &#8594; VIBRATO</text>
    <text x="20" y="54" fill="{MUTED}" font-family="sans-serif" font-size="12">Modulating pitch up and down creates musical pitch vibrato</text>
  </g>
  <line x1="260" y1="195" x2="360" y2="150" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- 2. VCF -> Filter Wobble / Auto-Wah -->
  <g transform="translate(360, 205)">
    <rect width="360" height="80" fill="{CARD}" rx="8" stroke="{CYAN}" stroke-width="1.5"/>
    <text x="20" y="32" fill="{CYAN}" font-family="sans-serif" font-size="14" font-weight="800">2. VCF CUTOFF &#8594; AUTO-WAH / WOBBLE</text>
    <text x="20" y="54" fill="{MUTED}" font-family="sans-serif" font-size="12">Sweeping the filter cutoff creates rhythmic timbral movement</text>
  </g>
  <line x1="260" y1="235" x2="360" y2="245" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4,4"/>

  <!-- 3. VCA -> Amplitude Tremolo -->
  <g transform="translate(360, 300)">
    <rect width="360" height="80" fill="{CARD}" rx="8" stroke="{EMERALD}" stroke-width="1.5"/>
    <text x="20" y="32" fill="{EMERALD}" font-family="sans-serif" font-size="14" font-weight="800">3. VCA GAIN &#8594; TREMOLO</text>
    <text x="20" y="54" fill="{MUTED}" font-family="sans-serif" font-size="12">Modulating volume up and down produces rhythmic pulsing</text>
  </g>
  <line x1="260" y1="275" x2="360" y2="340" stroke="{AMBER}" stroke-width="2" stroke-dasharray="4,4"/>
</svg>'''

# 6. CV and Gate Signal Timing
svgs["cv_and_gate_signal_timing.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">CONTROL VOLTAGE (CV) &amp; GATE PROTOCOL</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">How Analog Synthesizers Transmitted Pitch &amp; Note Duration Before MIDI (1V/Octave)</text>

  <!-- Pitch CV Graph -->
  <g transform="translate(60, 110)">
    <rect width="680" height="130" fill="{CARD}" rx="8" stroke="{BORDER}" stroke-width="1"/>
    <text x="20" y="28" fill="{PURPLE}" font-family="sans-serif" font-size="13" font-weight="800">PITCH CV (1 Volt Per Octave Standard)</text>
    <!-- Stepped DC voltage -->
    <path d="M 60 90 L 160 90 L 160 70 L 280 70 L 280 50 L 400 50 L 400 90 L 520 90 L 520 110 L 620 110" fill="none" stroke="{PURPLE}" stroke-width="3"/>
    <text x="110" y="115" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">C3 (1.0V)</text>
    <text x="220" y="95" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">C4 (2.0V)</text>
    <text x="340" y="75" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">C5 (3.0V)</text>
    <text x="460" y="115" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">C3 (1.0V)</text>
    <text x="570" y="130" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">C2 (0.0V)</text>
  </g>

  <!-- Gate Signal Graph -->
  <g transform="translate(60, 260)">
    <rect width="680" height="130" fill="{CARD}" rx="8" stroke="{BORDER}" stroke-width="1"/>
    <text x="20" y="28" fill="{CYAN}" font-family="sans-serif" font-size="13" font-weight="800">GATE SIGNAL (5V Pulse for Note Duration / Triggers ADSR Envelopes)</text>
    <!-- Binary Gate Pulses -->
    <path d="M 60 100 L 80 100 L 80 40 L 150 40 L 150 100 L 180 100 L 180 40 L 270 40 L 270 100 L 300 100 L 300 40 L 390 40 L 390 100 L 620 100" fill="none" stroke="{CYAN}" stroke-width="3"/>
    <text x="115" y="75" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">+5V ON</text>
    <text x="225" y="75" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">+5V ON</text>
    <text x="345" y="75" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">+5V ON</text>
    <text x="500" y="90" fill="{MUTED}" font-family="sans-serif" font-size="11">0V OFF (Release Trigger)</text>
  </g>
</svg>'''

# 7. Minimoog Architecture Schematic
svgs["minimoog_architecture_schematic.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">MINIMOOG MODEL D (1970) ARCHITECTURE</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">The First Normalized Portable Analog Synthesizer</text>

  <!-- 3 VCOs -->
  <g transform="translate(50, 110)">
    <rect width="160" height="270" fill="{CARD}" rx="8" stroke="{PURPLE}" stroke-width="1.5"/>
    <text x="80" y="30" fill="{PURPLE}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">OSCILLATOR BANK</text>
    <rect x="15" y="50" width="130" height="55" rx="4" fill="rgba(255,255,255,0.04)"/>
    <text x="80" y="82" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">OSC 1 (Tune &amp; Wave)</text>
    <rect x="15" y="120" width="130" height="55" rx="4" fill="rgba(255,255,255,0.04)"/>
    <text x="80" y="152" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">OSC 2 (Detune Beat)</text>
    <rect x="15" y="190" width="130" height="55" rx="4" fill="rgba(255,255,255,0.04)"/>
    <text x="80" y="215" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">OSC 3 (Audio or LFO)</text>
    <text x="80" y="232" fill="{AMBER}" font-family="sans-serif" font-size="9" text-anchor="middle">Mod Source</text>
  </g>

  <!-- Mixer -->
  <g transform="translate(235, 110)">
    <rect width="130" height="270" fill="{CARD}" rx="8" stroke="{BORDER}" stroke-width="1"/>
    <text x="65" y="30" fill="{WHITE}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">MIXER</text>
    <text x="65" y="70" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Vol 1</text>
    <text x="65" y="110" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Vol 2</text>
    <text x="65" y="150" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Vol 3</text>
    <text x="65" y="190" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Noise Gen</text>
    <rect x="10" y="220" width="110" height="35" rx="4" fill="rgba(245,158,11,0.15)"/>
    <text x="65" y="242" fill="{AMBER}" font-family="sans-serif" font-size="10" font-weight="700" text-anchor="middle">Feedback Loop</text>
  </g>

  <!-- 24dB Ladder Filter -->
  <g transform="translate(390, 110)">
    <rect width="190" height="270" fill="{CARD}" rx="8" stroke="{CYAN}" stroke-width="2"/>
    <text x="95" y="30" fill="{CYAN}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">24dB LADDER FILTER</text>
    <text x="95" y="60" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">Transistor Ladder Circuit</text>
    <!-- Controls -->
    <rect x="20" y="80" width="150" height="40" rx="4" fill="rgba(56,189,248,0.1)"/>
    <text x="95" y="105" fill="{CYAN}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">Cutoff Frequency</text>
    <rect x="20" y="130" width="150" height="40" rx="4" fill="rgba(56,189,248,0.1)"/>
    <text x="95" y="155" fill="{CYAN}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">Emphasis (Resonance)</text>
    <rect x="20" y="180" width="150" height="70" rx="4" fill="rgba(255,255,255,0.03)"/>
    <text x="95" y="205" fill="{PURPLE}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">Filter Envelope (ADS)</text>
    <text x="95" y="225" fill="{MUTED}" font-family="sans-serif" font-size="9" text-anchor="middle">Attack, Decay, Sustain</text>
  </g>

  <!-- VCA & Output -->
  <g transform="translate(605, 110)">
    <rect width="145" height="270" fill="{CARD}" rx="8" stroke="{EMERALD}" stroke-width="1.5"/>
    <text x="72" y="30" fill="{EMERALD}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">VCA &amp; OUTPUT</text>
    <rect x="15" y="60" width="115" height="70" rx="4" fill="rgba(52,211,153,0.1)"/>
    <text x="72" y="90" fill="{EMERALD}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">Loudness Env</text>
    <text x="72" y="110" fill="{MUTED}" font-family="sans-serif" font-size="9" text-anchor="middle">Attack, Decay, Sustain</text>
    <rect x="15" y="160" width="115" height="50" rx="4" fill="rgba(255,255,255,0.04)"/>
    <text x="72" y="190" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">Pitch &amp; Mod Wheels</text>
  </g>
</svg>'''

# 8. Monophonic vs Polyphonic Architecture
svgs["monophonic_vs_polyphonic_architecture.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">MONOPHONIC VS POLYPHONIC ARCHITECTURE</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">The Jump from Single-Note Leads (Minimoog) to 5-Voice Chords (Prophet-5, 1978)</text>

  <!-- Monophonic (Left) -->
  <g transform="translate(50, 110)">
    <rect width="320" height="280" fill="{CARD}" rx="10" stroke="{PURPLE}" stroke-width="1.5"/>
    <text x="160" y="35" fill="{PURPLE}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">MONOPHONIC (1 VOICE)</text>
    <text x="160" y="60" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Single Note Priority (Low, High, or Last)</text>
    
    <rect x="30" y="90" width="260" height="60" rx="6" fill="rgba(192,132,252,0.1)"/>
    <text x="160" y="125" fill="{WHITE}" font-family="sans-serif" font-size="13" font-weight="700" text-anchor="middle">1 Voice: VCOs &#8594; VCF &#8594; VCA</text>
    
    <text x="160" y="190" fill="{MUTED}" font-family="sans-serif" font-size="12" text-anchor="middle">&#8226; Cannot play harmonic chords</text>
    <text x="160" y="215" fill="{MUTED}" font-family="sans-serif" font-size="12" text-anchor="middle">&#8226; Ideal for basslines and lead solos</text>
    <text x="160" y="240" fill="{WHITE}" font-family="sans-serif" font-size="12" text-anchor="middle">Examples: Minimoog, Roland SH-101</text>
  </g>

  <!-- Polyphonic (Right) -->
  <g transform="translate(430, 110)">
    <rect width="320" height="280" fill="{CARD}" rx="10" stroke="{EMERALD}" stroke-width="1.5"/>
    <text x="160" y="35" fill="{EMERALD}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">POLYPHONIC (PROPHET-5)</text>
    <text x="160" y="60" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Microprocessor-Controlled Voice Allocation</text>

    <!-- 5 Voice Cards Stack -->
    <rect x="30" y="80" width="260" height="25" rx="4" fill="rgba(52,211,153,0.15)"/>
    <text x="160" y="97" fill="{WHITE}" font-family="sans-serif" font-size="10" text-anchor="middle">Voice 1 Card (2 VCOs, VCF, VCA, 2 Envs)</text>
    <rect x="30" y="110" width="260" height="25" rx="4" fill="rgba(52,211,153,0.15)"/>
    <text x="160" y="127" fill="{WHITE}" font-family="sans-serif" font-size="10" text-anchor="middle">Voice 2 Card (2 VCOs, VCF, VCA, 2 Envs)</text>
    <rect x="30" y="140" width="260" height="25" rx="4" fill="rgba(52,211,153,0.15)"/>
    <text x="160" y="157" fill="{WHITE}" font-family="sans-serif" font-size="10" text-anchor="middle">Voice 3 Card (2 VCOs, VCF, VCA, 2 Envs)</text>
    
    <rect x="30" y="180" width="260" height="40" rx="6" fill="rgba(251,191,36,0.15)"/>
    <text x="160" y="205" fill="{AMBER}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">Zilog Z80 Microprocessor: Patch Memory</text>
    
    <text x="160" y="245" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Instant digital recall of all analog knob parameters</text>
  </g>
</svg>'''

# 9. FM Synthesis Carrier and Modulator Diagram
svgs["fm_synthesis_carrier_modulator_diagram.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">FREQUENCY MODULATION (FM) SYNTHESIS &amp; OPERATORS</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">John Chowning Stanford Algorithm &#8594; Yamaha DX7 (1983)</text>

  <!-- Operator Definition -->
  <g transform="translate(60, 110)">
    <rect width="680" height="130" fill="{CARD}" rx="10" stroke="{BORDER}" stroke-width="1"/>
    <text x="340" y="30" fill="{CYAN}" font-family="sans-serif" font-size="14" font-weight="800" text-anchor="middle">WHAT IS AN FM OPERATOR?</text>
    <text x="340" y="55" fill="{WHITE}" font-family="sans-serif" font-size="12" text-anchor="middle">An Operator = A Pure Sine Wave Oscillator + Dedicated Envelope Generator</text>

    <!-- Modulator Box -->
    <rect x="100" y="70" width="180" height="45" rx="6" fill="rgba(192,132,252,0.15)" stroke="{PURPLE}" stroke-width="1.5"/>
    <text x="190" y="97" fill="{PURPLE}" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">MODULATOR (Op 2)</text>

    <line x1="280" y1="92" x2="390" y2="92" stroke="{WHITE}" stroke-width="2.5"/>
    <polygon points="390,88 400,92 390,96" fill="{WHITE}"/>
    <text x="340" y="82" fill="{AMBER}" font-family="sans-serif" font-size="10" text-anchor="middle">Audio-Rate FM</text>

    <!-- Carrier Box -->
    <rect x="400" y="70" width="180" height="45" rx="6" fill="rgba(52,211,153,0.15)" stroke="{EMERALD}" stroke-width="1.5"/>
    <text x="490" y="97" fill="{EMERALD}" font-family="sans-serif" font-size="12" font-weight="800" text-anchor="middle">CARRIER (Op 1)</text>

    <line x1="580" y1="92" x2="640" y2="92" stroke="{EMERALD}" stroke-width="2.5"/>
    <polygon points="635,88 645,92 635,96" fill="{EMERALD}"/>
    <text x="610" y="82" fill="{EMERALD}" font-family="sans-serif" font-size="10" text-anchor="middle">Output</text>
  </g>

  <!-- Algorithms Comparison (Bottom) -->
  <g transform="translate(60, 260)">
    <rect width="680" height="130" fill="{CARD}" rx="10" stroke="{BORDER}" stroke-width="1"/>
    <text x="340" y="28" fill="{WHITE}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">DX7 OPERATOR ROUTING ALGORITHMS (32 TOTAL)</text>
    
    <!-- Algorithm A: Harmonic Stacks -->
    <rect x="40" y="45" width="280" height="65" rx="6" fill="rgba(255,255,255,0.03)"/>
    <text x="180" y="70" fill="{PURPLE}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Vertical Stack (Mod &#8594; Carrier)</text>
    <text x="180" y="92" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Rich complex harmonic overtones (Bells, Brass)</text>

    <!-- Algorithm B: Additive Carriers -->
    <rect x="360" y="45" width="280" height="65" rx="6" fill="rgba(255,255,255,0.03)"/>
    <text x="500" y="70" fill="{EMERALD}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Parallel Carriers (Pure Sine Sums)</text>
    <text x="500" y="92" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Warm organs, electric pianos (E.Piano 1 preset)</text>
  </g>
</svg>'''

# 10. MIDI Protocol Signal Flow Diagram
svgs["midi_protocol_signal_flow_diagram.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">THE MIDI 1.0 PROTOCOL &amp; 5-PIN DIN STANDARD (1983)</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Serial Digital Performance Data: 31.25 kbaud, 16 Channels, Transmitting Notes not Audio</text>

  <!-- Connection Diagram -->
  <g transform="translate(60, 110)">
    <!-- Controller Keyboard -->
    <rect x="30" y="20" width="180" height="110" rx="8" fill="{CARD}" stroke="{PURPLE}" stroke-width="1.5"/>
    <text x="120" y="50" fill="{PURPLE}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">MASTER KEYBOARD</text>
    <text x="120" y="75" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">Generates Performance Data</text>
    <rect x="75" y="90" width="90" height="25" rx="4" fill="rgba(192,132,252,0.2)"/>
    <text x="120" y="107" fill="{PURPLE}" font-family="sans-serif" font-size="10" font-weight="700" text-anchor="middle">MIDI OUT</text>

    <!-- Cable 1 -->
    <line x1="210" y1="102" x2="310" y2="102" stroke="{WHITE}" stroke-width="3"/>
    <polygon points="310,97 320,102 310,107" fill="{WHITE}"/>
    <text x="265" y="90" fill="{AMBER}" font-family="sans-serif" font-size="10" text-anchor="middle">5-Pin DIN</text>

    <!-- Synth 1 -->
    <rect x="320" y="20" width="180" height="110" rx="8" fill="{CARD}" stroke="{CYAN}" stroke-width="1.5"/>
    <text x="410" y="50" fill="{CYAN}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">SYNTHESIZER 1</text>
    <rect x="330" y="90" width="70" height="25" rx="4" fill="rgba(56,189,248,0.2)"/>
    <text x="365" y="107" fill="{CYAN}" font-family="sans-serif" font-size="10" font-weight="700" text-anchor="middle">MIDI IN</text>
    <rect x="420" y="90" width="70" height="25" rx="4" fill="rgba(255,255,255,0.1)"/>
    <text x="455" y="107" fill="{WHITE}" font-family="sans-serif" font-size="10" font-weight="700" text-anchor="middle">THRU</text>

    <!-- Cable 2 -->
    <line x1="490" y1="102" x2="550" y2="102" stroke="{WHITE}" stroke-width="3"/>
    <polygon points="550,97 560,102 550,107" fill="{WHITE}"/>

    <!-- Drum Machine / Module -->
    <rect x="560" y="20" width="110" height="110" rx="8" fill="{CARD}" stroke="{EMERALD}" stroke-width="1.5"/>
    <text x="615" y="50" fill="{EMERALD}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">MODULE 2</text>
    <rect x="575" y="90" width="80" height="25" rx="4" fill="rgba(52,211,153,0.2)"/>
    <text x="615" y="107" fill="{EMERALD}" font-family="sans-serif" font-size="10" font-weight="700" text-anchor="middle">MIDI IN</text>
  </g>

  <!-- Data Structure -->
  <g transform="translate(60, 260)">
    <rect width="680" height="130" fill="{CARD}" rx="10" stroke="{BORDER}" stroke-width="1"/>
    <text x="340" y="30" fill="{WHITE}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">3-BYTE MIDI MESSAGE STRUCTURE (NOTE ON EXAMPLE)</text>
    
    <rect x="40" y="55" width="190" height="50" rx="6" fill="rgba(192,132,252,0.15)"/>
    <text x="135" y="78" fill="{PURPLE}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">BYTE 1: STATUS BYTE</text>
    <text x="135" y="95" fill="{WHITE}" font-family="sans-serif" font-size="10" text-anchor="middle">Note On + Channel (1–16)</text>

    <rect x="245" y="55" width="190" height="50" rx="6" fill="rgba(56,189,248,0.15)"/>
    <text x="340" y="78" fill="{CYAN}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">BYTE 2: DATA 1 (PITCH)</text>
    <text x="340" y="95" fill="{WHITE}" font-family="sans-serif" font-size="10" text-anchor="middle">Note Number (0–127, 60=Mid C)</text>

    <rect x="450" y="55" width="190" height="50" rx="6" fill="rgba(52,211,153,0.15)"/>
    <text x="545" y="78" fill="{EMERALD}" font-family="sans-serif" font-size="11" font-weight="800" text-anchor="middle">BYTE 3: DATA 2 (VELOCITY)</text>
    <text x="545" y="95" fill="{WHITE}" font-family="sans-serif" font-size="10" text-anchor="middle">Key Strike Speed (0–127)</text>
  </g>
</svg>'''

# 11. Wavetable Synthesis Interpolation
svgs["wavetable_synthesis_interpolation.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">WAVETABLE SYNTHESIS &amp; FRAME INTERPOLATION</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Scanning Through Single-Cycle Digital Waves: PPG Wave (1981) to Modern Serum / Massive</text>

  <g transform="translate(60, 110)">
    <rect width="680" height="280" fill="{CARD}" rx="10" stroke="{BORDER}" stroke-width="1"/>
    
    <!-- 4 Wave Frames -->
    <g transform="translate(40, 40)">
      <rect width="120" height="150" fill="rgba(255,255,255,0.03)" rx="6" stroke="{PURPLE}" stroke-width="1.5"/>
      <text x="60" y="30" fill="{PURPLE}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Frame 1: Sine</text>
      <path d="M 20 100 Q 40 70 60 100 T 100 100" fill="none" stroke="{PURPLE}" stroke-width="2.5"/>
    </g>

    <g transform="translate(200, 40)">
      <rect width="120" height="150" fill="rgba(255,255,255,0.03)" rx="6" stroke="{CYAN}" stroke-width="1.5"/>
      <text x="60" y="30" fill="{CYAN}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Frame 32: Morph</text>
      <path d="M 20 100 Q 30 70 60 90 T 100 110" fill="none" stroke="{CYAN}" stroke-width="2.5"/>
    </g>

    <g transform="translate(360, 40)">
      <rect width="120" height="150" fill="rgba(255,255,255,0.03)" rx="6" stroke="{EMERALD}" stroke-width="1.5"/>
      <text x="60" y="30" fill="{EMERALD}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Frame 64: Saw</text>
      <path d="M 20 120 L 60 80 L 60 120 L 100 80" fill="none" stroke="{EMERALD}" stroke-width="2.5"/>
    </g>

    <g transform="translate(520, 40)">
      <rect width="120" height="150" fill="rgba(255,255,255,0.03)" rx="6" stroke="{AMBER}" stroke-width="1.5"/>
      <text x="60" y="30" fill="{AMBER}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Frame 128: Pulse</text>
      <path d="M 20 120 L 20 80 L 60 80 L 60 120 L 100 120" fill="none" stroke="{AMBER}" stroke-width="2.5"/>
    </g>

    <!-- Scan Pointer Arrow -->
    <line x1="40" y1="225" x2="640" y2="225" stroke="{WHITE}" stroke-width="3"/>
    <polygon points="635,220 645,225 635,230" fill="{WHITE}"/>
    <text x="340" y="250" fill="{WHITE}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Wavetable Position Modulation (LFO / Envelope Scanning with Smooth Interpolation)</text>
  </g>
</svg>'''

# 12. TB-303 Acid Synthesis Schematic
svgs["tb303_acid_synthesis_schematic.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">ROLAND TB-303 BASSLINE &amp; ACID HOUSE PHENOMENON</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">The Accidental Icon of Dance Music: Diode Ladder Filter, Portamento Slide &amp; Accent</text>

  <g transform="translate(60, 110)">
    <!-- 18dB Filter -->
    <rect x="30" y="20" width="180" height="150" fill="{CARD}" rx="8" stroke="{PURPLE}" stroke-width="1.5"/>
    <text x="120" y="50" fill="{PURPLE}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">DIODE LADDER FILTER</text>
    <text x="120" y="80" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">18 dB/Octave (3-Pole)</text>
    <text x="120" y="105" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Squelchy, aggressive resonance</text>
    <text x="120" y="130" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Distorts musically on peak</text>

    <!-- Slide Circuit -->
    <rect x="250" y="20" width="180" height="150" fill="{CARD}" rx="8" stroke="{CYAN}" stroke-width="1.5"/>
    <text x="340" y="50" fill="{CYAN}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">SLIDE (PORTAMENTO)</text>
    <text x="340" y="80" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">Capacitor Charge Glide</text>
    <text x="340" y="105" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Overlapped 16th notes glide</text>
    <text x="340" y="130" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Envelope does not retrigger</text>

    <!-- Accent Circuit -->
    <rect x="470" y="20" width="180" height="150" fill="{CARD}" rx="8" stroke="{AMBER}" stroke-width="1.5"/>
    <text x="560" y="50" fill="{AMBER}" font-family="sans-serif" font-size="13" font-weight="800" text-anchor="middle">ACCENT CIRCUIT</text>
    <text x="560" y="80" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">Boosts Volume &amp; Filter</text>
    <text x="560" y="105" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Shortens decay for bite</text>
    <text x="560" y="130" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Creates punchy snap attack</text>

    <!-- Summary Box -->
    <rect x="30" y="200" width="620" height="60" rx="8" fill="rgba(255,255,255,0.03)" stroke="{BORDER}" stroke-width="1"/>
    <text x="340" y="225" fill="{WHITE}" font-family="sans-serif" font-size="12" font-weight="700" text-anchor="middle">Landmark Track: Phuture &#8211; 'Acid Tracks' (1987) &amp; DJ Pierre</text>
    <text x="340" y="245" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Twisting the cutoff and resonance knobs live over an automated pattern defined the sound of Acid House</text>
  </g>
</svg>'''

# 13. Synthesis Exam Revision Matrix
svgs["synthesis_exam_revision_matrix.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">EDEXCEL COMPONENT 3 SYNTHESIS REVISION MATRIX</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Key Synthesizer Milestones, Eras, Technical Mechanics &amp; Landmark Exemplars</text>

  <!-- 4 Columns Table -->
  <g transform="translate(40, 105)">
    <!-- Header -->
    <rect width="720" height="35" fill="rgba(192,132,252,0.2)" rx="4"/>
    <text x="80" y="23" fill="{PURPLE}" font-family="sans-serif" font-size="11" font-weight="800">ERA &amp; MODEL</text>
    <text x="240" y="23" fill="{CYAN}" font-family="sans-serif" font-size="11" font-weight="800">SYNTHESIS TYPE</text>
    <text x="420" y="23" fill="{EMERALD}" font-family="sans-serif" font-size="11" font-weight="800">CORE TECHNICAL MECHANISM</text>
    <text x="630" y="23" fill="{AMBER}" font-family="sans-serif" font-size="11" font-weight="800">EXEMPLAR TRACK</text>

    <!-- Row 1: Moog Modular -->
    <rect y="45" width="720" height="45" fill="{CARD}" rx="4"/>
    <text x="80" y="72" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700">1960s Moog Modular</text>
    <text x="240" y="72" fill="{MUTED}" font-family="sans-serif" font-size="11">Subtractive Analog</text>
    <text x="420" y="72" fill="{MUTED}" font-family="sans-serif" font-size="11">Patch cables, 1V/Oct CV &amp; Gate</text>
    <text x="630" y="72" fill="{WHITE}" font-family="sans-serif" font-size="11">Wendy Carlos (1968)</text>

    <!-- Row 2: Minimoog -->
    <rect y="95" width="720" height="45" fill="{CARD}" rx="4"/>
    <text x="80" y="122" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700">1970 Minimoog D</text>
    <text x="240" y="122" fill="{MUTED}" font-family="sans-serif" font-size="11">Subtractive Monophonic</text>
    <text x="420" y="122" fill="{MUTED}" font-family="sans-serif" font-size="11">Normalized 3 VCOs, 24dB Ladder Filter</text>
    <text x="630" y="122" fill="{WHITE}" font-family="sans-serif" font-size="11">Stevie Wonder / Numan</text>

    <!-- Row 3: Prophet-5 -->
    <rect y="145" width="720" height="45" fill="{CARD}" rx="4"/>
    <text x="80" y="172" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700">1978 Prophet-5</text>
    <text x="240" y="172" fill="{MUTED}" font-family="sans-serif" font-size="11">Subtractive Polyphonic</text>
    <text x="420" y="172" fill="{MUTED}" font-family="sans-serif" font-size="11">5 Voices, Z80 Patch Preset Memory</text>
    <text x="630" y="172" fill="{WHITE}" font-family="sans-serif" font-size="11">Kraftwerk / Japan</text>

    <!-- Row 4: Yamaha DX7 -->
    <rect y="195" width="720" height="45" fill="{CARD}" rx="4"/>
    <text x="80" y="222" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700">1983 Yamaha DX7</text>
    <text x="240" y="222" fill="{MUTED}" font-family="sans-serif" font-size="11">Digital FM Synthesis</text>
    <text x="420" y="222" fill="{MUTED}" font-family="sans-serif" font-size="11">6 Sine Operators, 32 Algorithms, MIDI</text>
    <text x="630" y="222" fill="{WHITE}" font-family="sans-serif" font-size="11">A-ha / Whitney Houston</text>

    <!-- Row 5: Roland TB-303 -->
    <rect y="245" width="720" height="45" fill="{CARD}" rx="4"/>
    <text x="80" y="272" fill="{WHITE}" font-family="sans-serif" font-size="11" font-weight="700">1982 Roland TB-303</text>
    <text x="240" y="272" fill="{MUTED}" font-family="sans-serif" font-size="11">Acid Bassline Sequencer</text>
    <text x="420" y="272" fill="{MUTED}" font-family="sans-serif" font-size="11">18dB Diode Filter, Slide &amp; Accent</text>
    <text x="630" y="272" fill="{WHITE}" font-family="sans-serif" font-size="11">Phuture - Acid Tracks</text>
  </g>
</svg>'''

# 14. Envelope Comparison VCA vs VCF
svgs["envelope_vca_vs_vcf_comparison.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">AMPLIFIER ENVELOPE (VCA) VS FILTER ENVELOPE (VCF)</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Comparing Dynamic Loudness vs Timbral Brightness Over Time</text>

  <!-- Left: VCA Envelope -->
  <g transform="translate(50, 110)">
    <rect width="330" height="280" fill="{CARD}" rx="10" stroke="{EMERALD}" stroke-width="1.5"/>
    <text x="165" y="35" fill="{EMERALD}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">VCA ENVELOPE (VOLUME)</text>
    <text x="165" y="60" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Controls Loudness Contour Over Time</text>
    <!-- Curve -->
    <path d="M 30 180 L 80 90 L 150 140 L 230 140 L 300 200" fill="none" stroke="{EMERALD}" stroke-width="3"/>
    <text x="165" y="235" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">Determines note start, sustain, and fade-out</text>
    <text x="165" y="255" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">If VCA Release is short, sound cuts off instantly</text>
  </g>

  <!-- Right: VCF Envelope -->
  <g transform="translate(420, 110)">
    <rect width="330" height="280" fill="{CARD}" rx="10" stroke="{CYAN}" stroke-width="1.5"/>
    <text x="165" y="35" fill="{CYAN}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">VCF ENVELOPE (TIMBRE)</text>
    <text x="165" y="60" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Controls Filter Cutoff Movement Over Time</text>
    <!-- Curve -->
    <path d="M 30 180 L 60 70 L 140 160 L 230 160 L 290 190" fill="none" stroke="{CYAN}" stroke-width="3"/>
    <text x="165" y="235" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">Creates pluck "wow" or brass filter sweeps</text>
    <text x="165" y="255" fill="{MUTED}" font-family="sans-serif" font-size="10" text-anchor="middle">Fast decay creates sharp percussive synth snap</text>
  </g>
</svg>'''

# 15. Additive vs Subtractive Synthesis
svgs["additive_vs_subtractive_synthesis.svg"] = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="{BG}" rx="16"/>
  <rect x="20" y="20" width="760" height="410" fill="none" stroke="{BORDER}" stroke-width="1" rx="12"/>
  
  <text x="400" y="55" fill="{WHITE}" font-family="sans-serif" font-size="20" font-weight="800" text-anchor="middle">ADDITIVE VS SUBTRACTIVE SYNTHESIS PRINCIPLES</text>
  <text x="400" y="80" fill="{MUTED}" font-family="sans-serif" font-size="13" text-anchor="middle">Fourier Building-Block Summing vs Sculpting Rich Harmonic Spectra</text>

  <!-- Left: Additive -->
  <g transform="translate(50, 110)">
    <rect width="330" height="280" fill="{CARD}" rx="10" stroke="{PURPLE}" stroke-width="1.5"/>
    <text x="165" y="35" fill="{PURPLE}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">ADDITIVE SYNTHESIS</text>
    <text x="165" y="60" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">"Building Up from Pure Silence"</text>
    <!-- Sine waves summing -->
    <path d="M 30 100 Q 55 80 80 100 T 130 100" fill="none" stroke="{PURPLE}" stroke-width="2"/>
    <text x="145" y="105" fill="{WHITE}" font-family="sans-serif" font-size="10">+ Sine 1 (Fundamental)</text>
    <path d="M 30 135 Q 42 120 55 135 T 80 135 T 105 135" fill="none" stroke="{PURPLE}" stroke-width="2"/>
    <text x="145" y="140" fill="{WHITE}" font-family="sans-serif" font-size="10">+ Sine 2 (2nd Harmonic)</text>
    <path d="M 30 170 Q 38 160 45 170 T 60 170 T 75 170 T 90 170" fill="none" stroke="{PURPLE}" stroke-width="2"/>
    <text x="145" y="175" fill="{WHITE}" font-family="sans-serif" font-size="10">+ Sine 3 (3rd Harmonic)</text>
    <text x="165" y="240" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Example: Drawbar Hammond Organ &amp; Synclavier</text>
  </g>

  <!-- Right: Subtractive -->
  <g transform="translate(420, 110)">
    <rect width="330" height="280" fill="{CARD}" rx="10" stroke="{CYAN}" stroke-width="1.5"/>
    <text x="165" y="35" fill="{CYAN}" font-family="sans-serif" font-size="15" font-weight="800" text-anchor="middle">SUBTRACTIVE SYNTHESIS</text>
    <text x="165" y="60" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">"Carving Away Harmonics from Noise/Buzz"</text>
    <rect x="40" y="90" width="80" height="50" rx="4" fill="rgba(56,189,248,0.15)"/>
    <text x="80" y="120" fill="{WHITE}" font-family="sans-serif" font-size="11" text-anchor="middle">Sawtooth</text>
    <text x="140" y="120" fill="{WHITE}" font-family="sans-serif" font-size="18">&#8594;</text>
    <rect x="165" y="90" width="120" height="50" rx="4" fill="rgba(192,132,252,0.15)"/>
    <text x="225" y="120" fill="{PURPLE}" font-family="sans-serif" font-size="11" font-weight="700" text-anchor="middle">Low-Pass Filter</text>
    <text x="165" y="195" fill="{WHITE}" font-family="sans-serif" font-size="12" text-anchor="middle">Removes high frequencies to sculpt warm timbre</text>
    <text x="165" y="240" fill="{MUTED}" font-family="sans-serif" font-size="11" text-anchor="middle">Example: Minimoog, Prophet-5, Roland Juno</text>
  </g>
</svg>'''

# Write and validate all SVGs
for fname, content in svgs.items():
    fpath = os.path.join(OUT_DIR, fname)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    # Validate XML
    try:
        ET.fromstring(content)
        print(f"VALID XML: {fname}")
    except Exception as e:
        print(f"XML ERROR in {fname}: {e}")

print(f"Successfully generated and validated {len(svgs)} SVG schematics!")
