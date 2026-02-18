import os

def generate_svgs():
    # 1. Quantization: Bit Depth Comparison
    bit_depth_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1a1a1a; font-family: sans-serif;">
  <!-- 16-bit (Left) -->
  <g transform="translate(50, 50)">
    <text x="150" y="0" fill="#fff" text-anchor="middle" font-size="18">16-BIT (65,536 Steps)</text>
    <rect x="0" y="20" width="300" height="250" fill="#222" stroke="#444"/>
    <!-- Staircase effect (Zoomed in visualization) -->
    <path d="M0 250 L30 250 L30 220 L60 220 L60 190 L90 190 L90 160 L120 160 L120 130 L150 130 L150 100 L180 100 L180 70 L210 70 L210 40 L240 40 L240 10 L270 10" fill="none" stroke="#00ccff" stroke-width="2"/>
    <text x="150" y="290" fill="#aaa" text-anchor="middle" font-size="14">Visible Steps (Zoomed)</text>
    <text x="150" y="310" fill="#555" text-anchor="middle" font-size="12">Quantization Error = Noise</text>
  </g>

  <!-- 24-bit (Right) -->
  <g transform="translate(450, 50)">
    <text x="150" y="0" fill="#fff" text-anchor="middle" font-size="18">24-BIT (16.7 Million Steps)</text>
    <rect x="0" y="20" width="300" height="250" fill="#222" stroke="#444"/>
    <!-- Smooth line (Microscopic steps) -->
    <line x1="0" y1="250" x2="270" y2="10" stroke="#00ffcc" stroke-width="2"/>
    <text x="150" y="290" fill="#aaa" text-anchor="middle" font-size="14">Steps are Microscopic</text>
    <text x="150" y="310" fill="#00ffcc" text-anchor="middle" font-size="12">Extremely Accurate</text>
  </g>
</svg>"""

    # 2. Multi-Sampling Layers
    layers_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" style="background-color: #222; font-family: sans-serif;">
  <text x="300" y="40" fill="#fff" text-anchor="middle" font-size="20" font-weight="bold">MULTI-SAMPLING DIMENSIONS</text>

  <!-- Base: Keys -->
  <rect x="100" y="400" width="400" height="40" fill="#fff" stroke="#000"/>
  <line x1="100" y1="400" x2="500" y2="400" stroke="#000" stroke-width="2"/>
  <!-- Black keys pattern roughly -->
  <g transform="translate(100, 400)">
     <rect x="10" y="0" width="10" height="25" fill="#000"/>
     <rect x="30" y="0" width="10" height="25" fill="#000"/>
     <text x="200" y="30" fill="#000" text-anchor="middle" font-weight="bold">88 KEYS (Pitch)</text>
  </g>

  <!-- Vertical Stack: Velocity Layers -->
  <g transform="translate(150, 200)">
    <rect x="0" y="0" width="80" height="150" fill="#444" stroke="#888" opacity="0.8"/>
    <rect x="0" y="120" width="80" height="30" fill="#00ccff" opacity="0.3"/><text x="40" y="140" fill="#fff" font-size="10" text-anchor="middle">Vel 1-20</text>
    <rect x="0" y="90" width="80" height="30" fill="#00ccff" opacity="0.5"/><text x="40" y="110" fill="#fff" font-size="10" text-anchor="middle">Vel 21-60</text>
    <rect x="0" y="60" width="80" height="30" fill="#00ccff" opacity="0.7"/><text x="40" y="80" fill="#fff" font-size="10" text-anchor="middle">Vel 61-100</text>
    <rect x="0" y="30" width="80" height="30" fill="#00ccff" opacity="0.9"/><text x="40" y="50" fill="#fff" font-size="10" text-anchor="middle">Vel 101-127</text>
    <text x="-20" y="80" fill="#00ccff" transform="rotate(-90 -20,80)">Velocity Layers</text>
  </g>

  <!-- Z-Axis: Round Robins -->
  <g transform="translate(250, 220)">
     <rect x="0" y="0" width="60" height="60" fill="#ff5555" stroke="#fff" stroke-width="2"/>
     <text x="30" y="35" fill="#fff" text-anchor="middle" font-size="24">RR1</text>
  </g>
  <g transform="translate(270, 200)">
     <rect x="0" y="0" width="60" height="60" fill="#ff5555" stroke="#fff" stroke-width="2"/>
     <text x="30" y="35" fill="#fff" text-anchor="middle" font-size="24">RR2</text>
  </g>
  <g transform="translate(290, 180)">
     <rect x="0" y="0" width="60" height="60" fill="#ff5555" stroke="#fff" stroke-width="2"/>
     <text x="30" y="35" fill="#fff" text-anchor="middle" font-size="24">RR3</text>
  </g>
  <text x="370" y="220" fill="#ff5555">Round Robins</text>
  <text x="370" y="240" fill="#aaa" font-size="12">(Variations per note)</text>
</svg>"""

    # 3. Mastering EQ HPF
    hpf_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1e1e1e; font-family: sans-serif;">
  <!-- Grid -->
  <line x1="50" y1="350" x2="750" y2="350" stroke="#444" stroke-width="2"/>
  <line x1="50" y1="350" x2="50" y2="50" stroke="#444" stroke-width="2"/>
  
  <!-- Freq Labels -->
  <text x="50" y="370" fill="#888" text-anchor="middle">10Hz</text>
  <text x="150" y="370" fill="#888" text-anchor="middle">30Hz</text>
  <text x="300" y="370" fill="#888" text-anchor="middle">100Hz</text>
  <text x="600" y="370" fill="#888" text-anchor="middle">1kHz</text>

  <!-- Spectrum Fill -->
  <path d="M50 350 L750 350 L750 200 L50 200 Z" fill="#222"/>

  <!-- HPF Curve -->
  <path d="M50 350 Q120 350 150 200 L750 200" fill="none" stroke="#00ffcc" stroke-width="4"/>
  
  <line x1="150" y1="350" x2="150" y2="200" stroke="#00ffcc" stroke-dasharray="4,4"/>
  <text x="150" y="180" fill="#00ffcc" text-anchor="middle" font-weight="bold">HPF @ 30Hz</text>
  
  <text x="400" y="100" fill="#fff" font-size="24" text-anchor="middle">MASTERING LOW CUT</text>
  <text x="400" y="130" fill="#aaa" text-anchor="middle">Removes invisible DC offset & Sub-rumble</text>
  <text x="400" y="150" fill="#aaa" text-anchor="middle">Preserves headroom without losing bass perception</text>
</svg>"""

    # 4. Mastering Mid/Side EQ
    ms_mastering_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="background-color: #1a1a1a; font-family: sans-serif;">
  <line x1="400" y1="50" x2="400" y2="450" stroke="#444" stroke-dasharray="5,5"/>

  <!-- MID Channel (Left Side of Image) -->
  <g transform="translate(0,0)">
    <text x="200" y="50" fill="#00ccff" text-anchor="middle" font-size="20" font-weight="bold">MID CHANNEL</text>
    <text x="200" y="70" fill="#aaa" text-anchor="middle">(Center Information)</text>
    
    <!-- EQ Curve -->
    <path d="M50 250 L350 250" stroke="#555" stroke-width="2"/>
    <path d="M50 250 Q100 250 150 200 L350 200" fill="none" stroke="#00ccff" stroke-width="3"/>
    
    <text x="200" y="150" fill="#00ccff" text-anchor="middle" font-weight="bold">LOW CUT / FOCUS</text>
    <text x="200" y="300" fill="#fff" text-anchor="middle" font-size="14">Tighten Bass (Mono)</text>
  </g>

  <!-- SIDE Channel (Right Side of Image) -->
  <g transform="translate(400,0)">
    <text x="200" y="50" fill="#ff5555" text-anchor="middle" font-size="20" font-weight="bold">SIDE CHANNEL</text>
    <text x="200" y="70" fill="#aaa" text-anchor="middle">(Stereo Information)</text>

    <!-- EQ Curve -->
    <path d="M50 250 L350 250" stroke="#555" stroke-width="2"/>
    <path d="M50 250 L250 250 Q300 200 350 180" fill="none" stroke="#ff5555" stroke-width="3"/>

    <text x="200" y="150" fill="#ff5555" text-anchor="middle" font-weight="bold">HIGH SHELF BOOST</text>
    <text x="200" y="300" fill="#fff" text-anchor="middle" font-size="14">Add "Air" & Width</text>
  </g>
</svg>"""

    # 5. Sub Oscillator
    sub_osc_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="background-color: #111; font-family: sans-serif;">
  <!-- Main Osc -->
  <text x="50" y="50" fill="#00ffcc" font-size="18" font-weight="bold">MAIN OSC (Sawtooth)</text>
  <path d="M50 150 L150 50 L150 150 L250 50 L250 150 L350 50 L350 150 L450 50 L450 150 L550 50 L550 150 L650 50 L650 150" fill="none" stroke="#00ffcc" stroke-width="2"/>

  <!-- Sub Osc -->
  <text x="50" y="250" fill="#ffaa00" font-size="18" font-weight="bold">SUB OSC (Sine)</text>
  <text x="50" y="275" fill="#aaa" font-size="14">One Octave Lower (1/2 Frequency)</text>
  
  <!-- Sine with 2x wavelength relative to Saw -->
  <path d="M50 350 Q100 250 150 350 T250 350 T350 350 T450 350 T550 350 T650 350" fill="none" stroke="#ffaa00" stroke-width="4"/>
  
  <!-- Visual Link -->
  <line x1="50" y1="160" x2="50" y2="240" stroke="#333" stroke-dasharray="5,5"/>
  <line x1="250" y1="160" x2="250" y2="240" stroke="#333" stroke-dasharray="5,5"/>
  <line x1="450" y1="160" x2="450" y2="240" stroke="#333" stroke-dasharray="5,5"/>
  
  <text x="400" y="450" fill="#fff" font-size="24" text-anchor="middle">SUB-OSCILLATOR ADDS WEIGHT</text>
</svg>"""

    # 6. Fast Attack REPAIR
    attack_svg_fixed = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1e1e1e; font-family: sans-serif;">
  <!-- Left: Original -->
  <g transform="translate(50, 50)">
    <text x="150" y="0" fill="#fff" text-anchor="middle" font-size="18">ORIGINAL</text>
    <path d="M0 200 L50 200 L60 50 L70 200 L100 220 L300 200" fill="none" stroke="#00ffcc" stroke-width="2"/>
    <text x="60" y="40" fill="#00ffcc" text-anchor="middle">Sharp Transient</text>
  </g>

  <!-- Right: Fast Attack -->
  <g transform="translate(450, 50)">
    <text x="150" y="0" fill="#fff" text-anchor="middle" font-size="18">FAST ATTACK</text>
    <!-- The "Ghost" of the original transient -->
    <path d="M0 200 L50 200 L60 50 L70 200 L100 220 L300 200" fill="none" stroke="#555" stroke-width="1" stroke-dasharray="2,2"/>
    
    <!-- The Compressed signal -->
    <path d="M0 200 L50 200 L60 150 L70 200 L100 210 L300 200" fill="none" stroke="#ff5555" stroke-width="3"/>
    <text x="60" y="140" fill="#ff5555" text-anchor="middle" font-weight="bold">TRANSIENT CRUSHED</text>
    <!-- FIX: Escaped Ampersand -->
    <text x="150" y="250" fill="#aaa" text-anchor="middle" font-size="14">Sound becomes "small" &amp; back in the mix</text>
  </g>
</svg>"""

    files = {
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/bit_depth_quantization_comparison.svg": bit_depth_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/multi_sampling_layers_diagram.svg": layers_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/mastering_hpf_curve.svg": hpf_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/mid_side_eq_mastering.svg": ms_mastering_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/sub_oscillator_visual.svg": sub_osc_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/fast_attack_transient_loss.svg": attack_svg_fixed
    }

    for path, content in files.items():
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated {path}")

if __name__ == "__main__":
    generate_svgs()
