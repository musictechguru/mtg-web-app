import os

def generate_svgs():
    # 1. Porous Absorber (Rockwool/Foam)
    absorber_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1a1a1a; font-family: sans-serif;">
  <!-- Wall -->
  <rect x="700" y="50" width="50" height="300" fill="#444" stroke="#666"/>
  <text x="725" y="380" fill="#888" text-anchor="middle" transform="rotate(-90 725,380)">WALL</text>

  <!-- Absorber Material (Porous) -->
  <rect x="500" y="50" width="200" height="300" fill="url(#fiberPattern)" stroke="#00ccff" stroke-width="2"/>
  <text x="600" y="40" fill="#00ccff" text-anchor="middle" font-weight="bold">POROUS ABSORBER (e.g. Rockwool)</text>

  <defs>
    <pattern id="fiberPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1.5" fill="#555" opacity="0.5"/>
      <path d="M0 10 L20 10 M10 0 L10 20" stroke="#333" stroke-width="0.5" opacity="0.3"/>
    </pattern>
  </defs>

  <!-- Sound Waves Entering -->
  <path d="M50 150 Q150 100 250 150 T450 150" fill="none" stroke="#fff" stroke-width="4"/>
  <path d="M50 250 Q150 300 250 250 T450 250" fill="none" stroke="#fff" stroke-width="4"/>
  <text x="250" y="200" fill="#fff" text-anchor="middle" font-size="20">SOUND ENERGY</text>

  <!-- Energy Dissipation (Heat) inside Absorber -->
  <path d="M500 150 L550 155 L600 145 L650 152" fill="none" stroke="#ff5555" stroke-width="2" stroke-dasharray="2,2"/>
  <path d="M500 250 L550 245 L600 255 L650 248" fill="none" stroke="#ff5555" stroke-width="2" stroke-dasharray="2,2"/>
  
  <text x="600" y="200" fill="#ff5555" text-anchor="middle" font-size="16">Friction -> Heat</text>
  <text x="600" y="220" fill="#ff5555" text-anchor="middle" font-size="12">(Energy Absorbed)</text>

</svg>"""

    # 2. Slow Attack Transient
    slow_attack_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="background-color: #1e1e1e; font-family: sans-serif;">
  <!-- Grid -->
  <path d="M50 150 L750 150" stroke="#333"/>
  <path d="M50 300 L750 300" stroke="#333"/>
  <path d="M50 450 L750 450" stroke="#333"/>

  <!-- 1. Original (Uncompressed) -->
  <text x="50" y="30" fill="#aaa" font-size="16">1. Original Signal (Drum Hit)</text>
  <path d="M100 150 L120 20 L140 150 L200 150" fill="none" stroke="#fff" stroke-width="2"/>
  <text x="120" y="15" fill="#fff" text-anchor="middle">Transient</text>

  <!-- 2. Fast Attack (Squashed) -->
  <text x="50" y="180" fill="#aaa" font-size="16">2. Fast Attack (Squashed)</text>
  <path d="M100 300 L110 230 L130 250 L200 300" fill="none" stroke="#ff5555" stroke-width="2"/>
  <text x="120" y="220" fill="#ff5555" text-anchor="middle">Lost Punch</text>

  <!-- 3. Slow Attack (Punchy) -->
  <text x="50" y="330" fill="#aaa" font-size="16">3. Slow Attack (Punch Preserved)</text>
  <path d="M100 450 L120 320 L140 400 L200 450" fill="none" stroke="#00ffcc" stroke-width="3"/>
  <text x="120" y="310" fill="#00ffcc" text-anchor="middle" font-weight="bold">TRANSIENT PASSES THROUGH!</text>

  <!-- Compressor engaging LATER -->
  <rect x="140" y="380" width="60" height="70" fill="#00ffcc" opacity="0.2"/>
  <text x="170" y="470" fill="#00ffcc" font-size="12" text-anchor="middle">Compression happens here</text>

</svg>"""

    # 3. Tape Editing Razor
    tape_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #2b2b2b; font-family: sans-serif;">
  <!-- Tape Block -->
  <rect x="100" y="250" width="600" height="80" fill="#888" stroke="#555" stroke-width="2"/>
  <path d="M100 290 L700 290" stroke="#666" stroke-width="4"/> <!-- Groove -->

  <!-- Magnetic Tape -->
  <rect x="50" y="280" width="700" height="20" fill="#5c3a21" stroke="none"/> <!-- Brown tape -->

  <!-- The Cut (Diagonal splice) -->
  <path d="M380 270 L420 310" stroke="#fff" stroke-width="1" stroke-dasharray="2,2"/>
  
  <!-- Razor Blade -->
  <path d="M370 150 L430 150 L420 250 L380 250 Z" fill="#ccc" stroke="#fff" stroke-width="2" opacity="0.9"/>
  <circle cx="400" cy="200" r="10" fill="#2b2b2b"/>
  <text x="400" y="120" fill="#fff" text-anchor="middle" font-size="20">RAZOR BLADE</text>
  
  <!-- Splice Tape -->
  <rect x="375" y="275" width="50" height="30" fill="#00ccff" opacity="0.4" transform="rotate(45 400 290)"/>
  <text x="550" y="200" fill="#00ccff" font-size="16">Splicing Tape (Blue/White)</text>
  <line x1="500" y1="210" x2="420" y2="280" stroke="#00ccff" stroke-width="2"/>

  <text x="400" y="380" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">PHYSICAL TAPE EDITING</text>
</svg>"""

    # 4. Sidechain Routing
    sidechain_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="background-color: #1e1e1e; font-family: sans-serif;">
  <!-- Compressor Box -->
  <rect x="300" y="150" width="200" height="200" rx="10" fill="#333" stroke="#aaa" stroke-width="2"/>
  <text x="400" y="250" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">COMPRESSOR</text>

  <!-- Input Signal (Pad/Bass) -->
  <path d="M50 250 L300 250" stroke="#00ffcc" stroke-width="4" marker-end="url(#arrow)"/>
  <text x="150" y="240" fill="#00ffcc" text-anchor="middle" font-size="18">AUDIO INPUT (Pad/Bass)</text>

  <!-- Output Signal -->
  <path d="M500 250 L750 250" stroke="#00ffcc" stroke-width="4" marker-end="url(#arrow)"/>
  <text x="650" y="240" fill="#00ffcc" text-anchor="middle" font-size="18">COMPRESSED OUTPUT</text>

  <!-- Key Input (Kick) -->
  <path d="M400 50 L400 150" stroke="#ff5555" stroke-width="4" stroke-dasharray="5,5" marker-end="url(#arrowRed)"/>
  <text x="400" y="40" fill="#ff5555" text-anchor="middle" font-size="18" font-weight="bold">KEY INPUT (Sidechain)</text>
  <text x="400" y="80" fill="#ff5555" text-anchor="middle" font-size="14">(e.g. Kick Drum)</text>

  <!-- Internal Control Path -->
  <path d="M400 150 L400 200" stroke="#ff5555" stroke-width="2"/>
  <circle cx="400" cy="200" r="5" fill="#ff5555"/>
  <text x="400" y="220" fill="#aaa" font-size="12" text-anchor="middle">Triggers Gain Reduction</text>

  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#00ffcc" />
    </marker>
    <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#ff5555" />
    </marker>
  </defs>
</svg>"""

    # 5. Haas Effect
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
  <text x="400" y="80" fill="#aaa" font-size="16" text-anchor="middle">HAAS EFFECT (Delay < 30ms)</text>

</svg>"""

    files = {
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/porous_absorber_diagram.svg": absorber_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/slow_attack_transient.svg": slow_attack_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/tape_editing_razor.svg": tape_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/sidechain_routing_visual.svg": sidechain_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/haas_effect_visual.svg": haas_svg
    }

    for path, content in files.items():
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated {path}")

if __name__ == "__main__":
    generate_svgs()
