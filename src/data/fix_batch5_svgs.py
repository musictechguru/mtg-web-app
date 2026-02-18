import os

def fix_svgs():
    # 3. Mastering EQ HPF (Fixed '&' to '&amp;')
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
  <!-- FIX: Escaped Ampersand -->
  <text x="400" y="130" fill="#aaa" text-anchor="middle">Removes invisible DC offset &amp; Sub-rumble</text>
  <text x="400" y="150" fill="#aaa" text-anchor="middle">Preserves headroom without losing bass perception</text>
</svg>"""

    # 4. Mastering Mid/Side EQ (Fixed '&' to '&amp;')
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
    <!-- FIX: Escaped Ampersand -->
    <text x="200" y="300" fill="#fff" text-anchor="middle" font-size="14">Add "Air" &amp; Width</text>
  </g>
</svg>"""

    files = {
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/mastering_hpf_curve.svg": hpf_svg,
        "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations/mid_side_eq_mastering.svg": ms_mastering_svg
    }

    for path, content in files.items():
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {path}")

if __name__ == "__main__":
    fix_svgs()
