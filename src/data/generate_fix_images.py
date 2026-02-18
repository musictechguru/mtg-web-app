import os

def generate_mid_side_eq_cut():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="background-color: #1e1e1e; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <!-- Background Grid -->
  <defs>
    <pattern id="grid" width="80" height="50" patternUnits="userSpaceOnUse">
      <path d="M 80 0 L 0 0 0 50" fill="none" stroke="#333" stroke-width="1"/>
    </pattern>
    <linearGradient id="midGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00ffcc" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#00ffcc" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#grid)" />

  <!-- Labels -->
  <text x="40" y="30" fill="#888" font-size="14">20Hz</text>
  <text x="200" y="30" fill="#888" font-size="14">100Hz</text>
  <text x="400" y="30" fill="#888" font-size="14">1kHz</text>
  <text x="600" y="30" fill="#888" font-size="14">10kHz</text>
  <text x="750" y="30" fill="#888" font-size="14">20kHz</text>

  <!-- Mid Channel (Cut) -->
  <!-- Curve showing a dip around 250-500Hz -->
  <path d="M 0 250 
           Q 100 250 200 250
           C 250 250 300 350 400 350
           C 500 350 550 250 600 250
           Q 700 250 800 250" 
        fill="none" stroke="#00ffcc" stroke-width="4" stroke-dasharray="0" />
  
  <rect x="300" y="360" width="200" height="30" rx="5" fill="#003333" stroke="#00ffcc" />
  <text x="400" y="380" fill="#00ffcc" font-size="16" text-anchor="middle" font-weight="bold">MID CHANNEL (CUT MUD)</text>

  <!-- Side Channel (Flat) -->
  <path d="M 0 200 L 800 200" 
        fill="none" stroke="#ff5555" stroke-width="4" stroke-dasharray="10,5" opacity="0.7"/>
  
  <text x="700" y="180" fill="#ff5555" font-size="16" text-anchor="middle" font-weight="bold">SIDE CHANNEL (FLAT)</text>

  <!-- Title -->
  <text x="400" y="470" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">M/S EQ: CLEANING UP THE CENTER</text>
</svg>"""
    
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/mid_side_eq_cut.svg'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated {path}")


def generate_phonograph():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="background-color: #1a1a1a; font-family: 'Courier New', monospace;">
  <!-- Vintage aesthetic background -->
  <rect width="800" height="500" fill="#1a1a1a"/>
  
  <!-- Base -->
  <rect x="150" y="350" width="500" height="50" rx="5" fill="#8B4513" stroke="#5d2e0c" stroke-width="2"/>
  <rect x="160" y="360" width="480" height="30" rx="2" fill="#A0522D" opacity="0.5"/>

  <!-- Cylinder Mechanism -->
  <!-- Mandrel -->
  <rect x="250" y="250" width="300" height="80" rx="2" fill="#C0C0C0" stroke="#888" stroke-width="2"/>
  <!-- Wax Cylinder (Grooved) -->
  <rect x="270" y="245" width="260" height="90" rx="3" fill="#D2B48C" stroke="#8B4513" stroke-width="1"/>
  <line x1="270" y1="260" x2="530" y2="260" stroke="#8B4513" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="270" y1="275" x2="530" y2="275" stroke="#8B4513" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="270" y1="290" x2="530" y2="290" stroke="#8B4513" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="270" y1="305" x2="530" y2="305" stroke="#8B4513" stroke-width="1" stroke-opacity="0.5"/>
  <line x1="270" y1="320" x2="530" y2="320" stroke="#8B4513" stroke-width="1" stroke-opacity="0.5"/>

  <!-- Stylus Arm -->
  <path d="M 400 245 L 400 200 L 200 200" fill="none" stroke="#FFD700" stroke-width="8"/>
  <circle cx="200" cy="200" r="10" fill="#DAA520"/>
  
  <!-- Needle -->
  <path d="M 400 245 L 400 255" stroke="#fff" stroke-width="2"/>

  <!-- Horn -->
  <path d="M 200 200 L 100 100 C 50 150 50 250 100 300 L 200 200" fill="#333" stroke="#FFD700" stroke-width="3"/>
  <ellipse cx="80" cy="200" rx="30" ry="100" fill="#111" stroke="#FFD700" stroke-width="2"/>

  <!-- Crank Handle -->
  <path d="M 550 290 L 600 290 L 600 330 L 620 330" fill="none" stroke="#888" stroke-width="5"/>
  <rect x="620" y="320" width="20" height="20" rx="2" fill="#555"/>

  <!-- Labels -->
  <text x="400" y="440" fill="#FFD700" font-size="28" text-anchor="middle" font-weight="bold">EDISON PHONOGRAPH (1877)</text>
  <text x="400" y="470" fill="#aaa" font-size="16" text-anchor="middle">"Mary had a little lamb..."</text>
  
  <text x="350" y="230" fill="#fff" font-size="14">Stylus</text>
  <line x1="350" y1="235" x2="395" y2="245" stroke="#fff" stroke-width="1"/>

  <text x="540" y="260" fill="#fff" font-size="14">Wax Cylinder</text>
  <line x1="535" y1="260" x2="500" y2="270" stroke="#fff" stroke-width="1"/>

</svg>"""

    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/phonograph_diagram.svg'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated {path}")

if __name__ == "__main__":
    generate_mid_side_eq_cut()
    generate_phonograph()
