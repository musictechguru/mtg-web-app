import os

def generate_svgs():
    # 1. EQ Wide vs Narrow
    eq_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1e1e1e; font-family: sans-serif;">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00ffcc;stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:#00ffcc;stop-opacity:0" />
    </linearGradient>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ff5555;stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:#ff5555;stop-opacity:0" />
    </linearGradient>
  </defs>
  
  <!-- Grid -->
  <path d="M50 350 L750 350" stroke="#555" stroke-width="2"/>
  <path d="M50 50 L50 350" stroke="#555" stroke-width="2"/>
  
  <!-- Wide Q (Musical) -->
  <path d="M100 350 Q400 50 700 350" fill="url(#grad1)" stroke="#00ffcc" stroke-width="4"/>
  <text x="400" y="200" fill="#00ffcc" font-size="20" text-anchor="middle">WIDE Q (Low Q)</text>
  <text x="400" y="225" fill="#00ffcc" font-size="16" text-anchor="middle">"Musical" / Gentle Tone Shaping</text>

  <!-- Narrow Q (Surgical) -->
  <path d="M350 350 Q400 0 450 350" fill="url(#grad2)" stroke="#ff5555" stroke-width="4" stroke-dasharray="5,5"/>
  <text x="400" y="80" fill="#ff5555" font-size="20" text-anchor="middle">NARROW Q (High Q)</text>
  <text x="400" y="105" fill="#ff5555" font-size="16" text-anchor="middle">"Surgical" / Problem Solving</text>

  <text x="400" y="380" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">Q FACTOR COMPARISON</text>
</svg>"""

    # 2. Limiter Overcompression
    limiter_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1a1a1a; font-family: sans-serif;">
  <!-- Ceiling Line -->
  <line x1="50" y1="100" x2="750" y2="100" stroke="#ff0000" stroke-width="2" stroke-dasharray="5,5"/>
  <text x="60" y="90" fill="#ff0000" font-size="14">CEILING (0dB)</text>
  
  <!-- Audio Waveform -->
  <path d="M50 200 
           L100 150 L120 250 L150 50 L180 280 L200 120 
           L250 30 L280 320 L300 100 L350 10 L380 350 
           L400 200 L450 100 L480 300 L500 150 L550 50 
           L600 250 L650 120 L700 200" 
           fill="none" stroke="#555" stroke-width="2" opacity="0.5"/>
           
  <!-- Limited Waveform (Brickwalled) -->
  <path d="M50 200 
           L100 150 L120 250 L150 100 L180 280 L200 120 
           L250 100 L280 320 L300 100 L350 100 L380 350 
           L400 200 L450 100 L480 300 L500 150 L550 100 
           L600 250 L650 120 L700 200" 
           fill="none" stroke="#00ccff" stroke-width="3"/>
           
  <!-- Distortion Indicators -->
  <rect x="145" y="98" width="10" height="4" fill="#ff0000"/>
  <rect x="245" y="98" width="10" height="4" fill="#ff0000"/>
  <rect x="340" y="98" width="20" height="4" fill="#ff0000"/>
  <rect x="545" y="98" width="10" height="4" fill="#ff0000"/>
  
  <text x="400" y="50" fill="#ff5555" font-size="20" text-anchor="middle" font-weight="bold">DISTORTION / ARTIFACTS</text>
  <text x="400" y="380" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">BRICKWALL LIMITING</text>
  <text x="400" y="350" fill="#aaa" font-size="16" text-anchor="middle">Peaks are chopped off flat, losing punch and adding distortion</text>
</svg>"""

    # 3. Figure-8 Nulls
    polar_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" style="background-color: #222; font-family: sans-serif;">
  <!-- Polar Grid -->
  <circle cx="300" cy="300" r="100" fill="none" stroke="#444"/>
  <circle cx="300" cy="300" r="200" fill="none" stroke="#444"/>
  <line x1="300" y1="50" x2="300" y2="550" stroke="#444"/>
  <line x1="50" y1="300" x2="550" y2="300" stroke="#444"/>
  
  <!-- Figure 8 Pattern -->
  <path d="M300 300 
           C 300 300, 450 200, 300 100 
           C 150 200, 300 300, 300 300
           C 300 300, 450 400, 300 500
           C 150 400, 300 300, 300 300" 
           fill="#00cc00" opacity="0.4" stroke="#00ff00" stroke-width="3"/>
           
  <!-- Null Points -->
  <circle cx="50" cy="300" r="20" fill="#ff0000" opacity="0.2"/>
  <text x="50" y="305" fill="#ff0000" font-size="24" text-anchor="middle" font-weight="bold">X</text>
  <text x="50" y="270" fill="#ff5555" font-size="16" text-anchor="middle">NULL (90°)</text>

  <circle cx="550" cy="300" r="20" fill="#ff0000" opacity="0.2"/>
  <text x="550" y="305" fill="#ff0000" font-size="24" text-anchor="middle" font-weight="bold">X</text>
  <text x="550" y="270" fill="#ff5555" font-size="16" text-anchor="middle">NULL (270°)</text>
  
  <!-- Labels -->
  <text x="300" y="40" fill="#fff" font-size="18" text-anchor="middle">FRONT (0°)</text>
  <text x="300" y="580" fill="#fff" font-size="18" text-anchor="middle">BACK (180°)</text>
  <text x="300" y="300" fill="#fff" font-size="12" text-anchor="middle" dy="5">MIC</text>
  
  <text x="300" y="530" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">FIGURE-8 POLAR PATTERN</text>
</svg>"""

    # 4. Compression Attack Delay (50ms)
    attack_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color: #1e1e1e; font-family: sans-serif;">
  <!-- Axes -->
  <line x1="50" y1="350" x2="750" y2="350" stroke="#888" stroke-width="2"/> <!-- Time -->
  <line x1="50" y1="50" x2="50" y2="350" stroke="#888" stroke-width="2"/> <!-- Gain Red -->
  
  <text x="700" y="380" fill="#888">TIME (ms)</text>
  <text x="20" y="200" fill="#888" transform="rotate(-90 20,200)">GAIN REDUCTION</text>
  
  <!-- Threshold Line (Visual Guide) -->
  <line x1="50" y1="150" x2="750" y2="150" stroke="#ffcc00" stroke-dasharray="4,4" opacity="0.5"/>
  <text x="60" y="140" fill="#ffcc00" font-size="12">Threshold Crossed</text>

  <!-- Input Signal Transient -->
  <path d="M50 350 L100 50 L150 350" fill="none" stroke="#555" stroke-width="2" opacity="0.5"/>
  <text x="100" y="40" fill="#555" text-anchor="middle">Input Transient</text>

  <!-- Fast Attack Curve -->
  <path d="M50 350 L55 200 L750 200" fill="none" stroke="#ff5555" stroke-width="3" opacity="0.6"/>
  <text x="200" y="220" fill="#ff5555">Fast Attack (Instant clamp)</text>

  <!-- Slow Attack Curve (50ms) -->
  <path d="M50 350 L150 150 L200 250 L750 250" fill="none" stroke="#00ffcc" stroke-width="4"/>
  
  <!-- Annotations -->
  <line x1="50" y1="360" x2="150" y2="360" stroke="#00ffcc" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="100" y="385" fill="#00ffcc" text-anchor="middle" font-weight="bold">Wait 50ms</text>
  <text x="400" y="270" fill="#00ffcc">Slow Attack (Lets transient through)</text>

  <text x="400" y="30" fill="#fff" font-size="24" text-anchor="middle" font-weight="bold">COMPRESSOR ATTACK TIME</text>
</svg>"""

    files = {
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/eq_wide_vs_narrow.svg": eq_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/limiter_overcompression.svg": limiter_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/figure_8_null_zones.svg": polar_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/compression_attack_delay.svg": attack_svg
    }

    for path, content in files.items():
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated {path}")

if __name__ == "__main__":
    generate_svgs()
