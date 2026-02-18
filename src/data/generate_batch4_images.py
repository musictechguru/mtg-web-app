import os

def generate_svgs():
    # 1. Additive Synthesis (Summation)
    additive_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="background-color: #1a1a1a; font-family: sans-serif;">
  <!-- Component Waves -->
  <text x="50" y="30" fill="#aaa" font-size="14">Fundamental (Sine)</text>
  <path d="M50 80 Q150 20 250 80 T450 80 T650 80" fill="none" stroke="#00ccff" stroke-width="2" opacity="0.6"/>
  
  <text x="50" y="130" fill="#aaa" font-size="14">+ Harmonic 1 (Higher Freq)</text>
  <path d="M50 160 Q100 130 150 160 T250 160 T350 160" fill="none" stroke="#00ccff" stroke-width="2" opacity="0.6"/>

  <text x="50" y="210" fill="#aaa" font-size="14">+ Harmonic 2 (Even Higher)</text>
  <path d="M50 240 Q75 220 100 240 T150 240" fill="none" stroke="#00ccff" stroke-width="2" opacity="0.6"/>

  <!-- Summation Arrow -->
  <text x="400" y="300" fill="#fff" text-anchor="middle" font-size="24" font-weight="bold">+</text>
  <path d="M400 320 L400 360" stroke="#fff" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- Resulting Complex Wave -->
  <rect x="50" y="380" width="700" height="100" fill="#222" rx="10"/>
  <text x="400" y="420" fill="#00ffcc" text-anchor="middle" font-weight="bold" font-size="18">COMPLEX TONE (e.g. Square/Saw)</text>
  <!-- Approximate square wave shape built from sines -->
  <path d="M100 450 L150 400 L250 400 L300 450 L350 500 L450 500 L500 450" fill="none" stroke="#00ffcc" stroke-width="4"/>

  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#fff" />
    </marker>
  </defs>
</svg>"""

    # 2. Fast Attack Transient Loss
    attack_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1e1e1e; font-family: sans-serif;">
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
    <text x="150" y="250" fill="#aaa" text-anchor="middle" font-size="14">Sound becomes "small" & back in the mix</text>
  </g>
</svg>"""

    # 3. Infinite Ratio (Brickwall)
    limit_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style="background-color: #222; font-family: sans-serif;">
  <!-- Axes -->
  <line x1="50" y1="450" x2="450" y2="450" stroke="#888" stroke-width="2"/> <!-- In -->
  <line x1="50" y1="450" x2="50" y2="50" stroke="#888" stroke-width="2"/> <!-- Out -->
  <text x="250" y="480" fill="#888" text-anchor="middle">INPUT LEVEL (dB)</text>
  <text x="20" y="250" fill="#888" text-anchor="middle" transform="rotate(-90 20,250)">OUTPUT LEVEL (dB)</text>

  <!-- Threshold Line -->
  <line x1="50" y1="150" x2="450" y2="150" stroke="#555" stroke-dasharray="4,4"/>
  <text x="460" y="155" fill="#aaa" font-size="12">Threshold / Ceiling</text>

  <!-- Ratio Curve -->
  <!-- Linear up to threshold -->
  <line x1="50" y1="450" x2="350" y2="150" stroke="#fff" stroke-width="2" opacity="0.5"/> 
  <!-- Brickwall after -->
  <line x1="350" y1="150" x2="450" y2="150" stroke="#ff5555" stroke-width="4"/>
  
  <text x="300" y="130" fill="#ff5555" text-anchor="middle" font-weight="bold" font-size="18">∞:1 RATIO</text>
  <text x="300" y="100" fill="#ff5555" text-anchor="middle" font-size="14">(Brickwall Limiting)</text>
  <text x="300" y="80" fill="#aaa" text-anchor="middle" font-size="12">Signal cannot exceed ceiling</text>
</svg>"""

    # 4. Normalization (Volume Only) - Corrected plan
    norm_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1a1a1a; font-family: sans-serif;">
  <!-- Before -->
  <g transform="translate(50,50)">
    <text x="150" y="0" fill="#fff" text-anchor="middle" font-size="18">BEFORE (Quiet)</text>
    <rect x="0" y="20" width="300" height="200" fill="#222" stroke="#444"/>
    <!-- Small waveform -->
    <path d="M0 120 Q50 100 100 120 T200 120 T300 120" fill="none" stroke="#aaa" stroke-width="2"/>
    <text x="150" y="180" fill="#aaa" text-anchor="middle">-12 dB Peak</text>
  </g>

  <!-- Arrow -->
  <path d="M370 150 L430 150" stroke="#fff" stroke-width="4" marker-end="url(#arrow)"/>
  <text x="400" y="130" fill="#00ccff" text-anchor="middle" font-weight="bold">NORMALIZE</text>

  <!-- After -->
  <g transform="translate(450,50)">
    <text x="150" y="0" fill="#fff" text-anchor="middle" font-size="18">AFTER (Louder)</text>
    <rect x="0" y="20" width="300" height="200" fill="#222" stroke="#444"/>
    <!-- Big waveform (same shape, larger amplitude) -->
    <path d="M0 120 Q50 50 100 120 T200 120 T300 120" fill="none" stroke="#00ccff" stroke-width="4"/>
    <line x1="0" y1="40" x2="300" y2="40" stroke="#ff5555" stroke-dasharray="4,4"/>
    <text x="150" y="35" fill="#ff5555" text-anchor="middle">0 dB Ceiling</text>
    <text x="150" y="250" fill="#fff" text-anchor="middle" font-size="14">Shape is IDENTICAL. Only Volume changed.</text>
  </g>

  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#fff" />
    </marker>
  </defs>
</svg>"""

    # 5. Mirror Panning (Stereo Balance)
    stereo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" style="background-color: #111; font-family: sans-serif;">
  <!-- Arc -->
  <path d="M50 250 Q300 50 550 250" fill="none" stroke="#444" stroke-width="2"/>
  <circle cx="300" cy="250" r="10" fill="#555"/> <!-- Center -->

  <!-- Left Element -->
  <circle cx="150" cy="150" r="20" fill="#ffaa00"/>
  <text x="120" y="140" fill="#ffaa00" text-anchor="end">Hi-Hat</text>
  <text x="130" y="160" fill="#aaa" text-anchor="end">(Left)</text>

  <!-- Right Element -->
  <circle cx="450" cy="150" r="20" fill="#00ccff"/>
  <text x="480" y="140" fill="#00ccff" text-anchor="start">Shaker</text>
  <text x="470" y="160" fill="#aaa" text-anchor="start">(Right)</text>
  
  <!-- Balance Scale icon in middle -->
  <path d="M280 200 L320 200 M300 200 L300 230" stroke="#fff" stroke-width="2"/>
  <text x="300" y="190" fill="#fff" text-anchor="middle" font-weight="bold">BALANCE</text>
  <text x="300" y="280" fill="#888" text-anchor="middle">Symmetrical panning creates space</text>
</svg>"""

    # 6. High SPL Mic (Vocals)
    mic_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" style="background-color: #222; font-family: sans-serif;">
  <!-- Singer -->
  <text x="100" y="200" fill="#fff" font-size="40">🎤😲</text>
  <text x="100" y="240" fill="#fff" text-anchor="middle">OPERA SINGER</text>

  <!-- Sound Waves -->
  <path d="M150 180 Q200 180 250 150" fill="none" stroke="#fff" stroke-width="4"/>
  <path d="M150 200 Q220 200 250 200" fill="none" stroke="#fff" stroke-width="4"/>
  <path d="M150 220 Q200 220 250 250" fill="none" stroke="#fff" stroke-width="4"/>
  <text x="200" y="160" fill="#ff5555" font-weight="bold">HIGH SPL!</text>

  <!-- Dynamic Mic -->
  <rect x="300" y="150" width="100" height="100" rx="10" fill="#333" stroke="#00ffcc" stroke-width="4"/>
  <text x="350" y="200" fill="#00ffcc" text-anchor="middle" font-weight="bold">DYNAMIC</text>
  <text x="350" y="220" fill="#00ffcc" text-anchor="middle">(Rugged)</text>
  <text x="420" y="180" fill="#00ffcc" font-size="30">✓</text>
  <text x="350" y="280" fill="#aaa" text-anchor="middle" font-size="12">Handles loudness without distortion</text>

</svg>"""

    # 7. ORTF Pair
    ortf_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" style="background-color: #1e1e1e; font-family: sans-serif;">
  <!-- Mic L -->
  <g transform="translate(250, 200) rotate(-55)">
    <rect x="-10" y="-40" width="20" height="80" rx="5" fill="#aaa"/>
    <circle cx="0" cy="-40" r="15" fill="#444" stroke="#fff"/>
    <text x="0" y="60" fill="#fff" text-anchor="middle" transform="rotate(55)">Left</text>
  </g>

  <!-- Mic R -->
  <g transform="translate(350, 200) rotate(55)">
    <rect x="-10" y="-40" width="20" height="80" rx="5" fill="#aaa"/>
    <circle cx="0" cy="-40" r="15" fill="#444" stroke="#fff"/>
    <text x="0" y="60" fill="#fff" text-anchor="middle" transform="rotate(-55)">Right</text>
  </g>

  <!-- Dimensions -->
  <line x1="250" y1="200" x2="350" y2="200" stroke="#00ffcc" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="300" y="190" fill="#00ffcc" text-anchor="middle" font-weight="bold">17 cm Spacing</text>

  <!-- Angle -->
  <path d="M250 100 L300 150 L350 100" fill="none" stroke="#ff5555" stroke-width="2" opacity="0.5"/>
  <text x="300" y="140" fill="#ff5555" text-anchor="middle" font-weight="bold">110° Angle</text>
  
  <text x="300" y="350" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">ORTF PAIR</text>
  <text x="300" y="380" fill="#aaa" text-anchor="middle">Cardioid Mics</text>
</svg>"""

    # 8. Haas Effect (FIXED SYNTAX)
    haas_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #111; font-family: sans-serif;">
  <!-- Head -->
  <circle cx="400" cy="250" r="50" fill="#333" stroke="#555"/>
  <path d="M380 240 Q400 270 420 240" fill="none" stroke="#000" stroke-width="2"/> <!-- Smile -->
  
  <!-- Ears -->
  <ellipse cx="345" cy="250" rx="10" ry="20" fill="#444"/>
  <ellipse cx="455" cy="250" rx="10" ry="20" fill="#444"/>

  <!-- Speaker Left (Direct) -->
  <rect x="100" y="100" width="80" height="120" fill="#222" stroke="#00ffcc" stroke-width="2"/>
  <circle cx="140" cy="140" r="20" fill="#00ffcc" opacity="0.3"/>
  <text x="140" y="250" fill="#00ffcc" text-anchor="middle">LEFT (Direct)</text>
  <path d="M140 160 L330 240" stroke="#00ffcc" stroke-width="2" stroke-dasharray="0"/>

  <!-- Speaker Right (Delayed) -->
  <rect x="620" y="100" width="80" height="120" fill="#222" stroke="#ff5555" stroke-width="2"/>
  <circle cx="660" cy="140" r="20" fill="#ff5555" opacity="0.3"/>
  <text x="660" y="250" fill="#ff5555" text-anchor="middle">RIGHT (Delayed 15ms)</text>
  <path d="M660 160 L470 240" stroke="#ff5555" stroke-width="2" stroke-dasharray="5,5"/>

  <!-- Width Perception Arc -->
  <path d="M200 250 Q400 -50 600 250" fill="none" stroke="#fff" stroke-width="4" opacity="0.5"/>
  <text x="400" y="50" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">PERCEIVED WIDTH</text>
  <!-- Fixed text below with escaped entity -->
  <text x="400" y="80" fill="#aaa" font-size="16" text-anchor="middle">HAAS EFFECT (Delay &lt; 30ms)</text>

</svg>"""

    files = {
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/additive_synthesis_summation.svg": additive_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/fast_attack_transient_loss.svg": attack_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/infinite_ratio_brickwall.svg": limit_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/normalization_volume_only.svg": norm_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/mirror_panning_balance.svg": stereo_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/high_spl_mic_diagram.svg": mic_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/ortf_pair_diagram.svg": ortf_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/haas_effect_visual.svg": haas_svg
    }

    for path, content in files.items():
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated {path}")

if __name__ == "__main__":
    generate_svgs()
