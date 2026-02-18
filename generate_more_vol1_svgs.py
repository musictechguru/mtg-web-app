
import os

def create_pitch_perception_svg():
    # Visualizing Pitch: Musical Note A4 = 440Hz
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Pitch Perception</text>
    
    <!-- Musical Staff -->
    <g transform="translate(200, 150)" stroke="#888" stroke-width="2">
        <line x1="0" y1="0" x2="400" y2="0"/>
        <line x1="0" y1="20" x2="400" y2="20"/>
        <line x1="0" y1="40" x2="400" y2="40"/>
        <line x1="0" y1="60" x2="400" y2="60"/>
        <line x1="0" y1="80" x2="400" y2="80"/>
    </g>

    <!-- Treble Clef (Simplified) -->
    <path d="M 230 220 Q 210 200 230 130 Q 250 80 230 60 L 230 250" fill="none" stroke="#facc15" stroke-width="4"/>

    <!-- Note A4 -->
    <ellipse cx="350" cy="200" rx="12" ry="10" fill="#3b82f6"/>
    <line x1="360" y1="200" x2="360" y2="140" stroke="#3b82f6" stroke-width="3"/>
    
    <!-- Annotation -->
    <text x="350" y="240" text-anchor="middle" fill="#3b82f6" font-size="18">"A4" (Musical Note)</text>
    <text x="350" y="265" text-anchor="middle" fill="#888" font-size="14">= 440 Hz (Physical Frequency)</text>

    <!-- Ear / Brain Icon -->
    <path d="M 600 150 Q 650 150 650 200 Q 650 250 600 250" fill="none" stroke="#ec4899" stroke-width="4"/>
    <text x="630" y="280" text-anchor="middle" fill="#ec4899" font-size="14">Perception</text>
</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/pitch_perception.svg', 'w') as f:
        f.write(svg_content)
    print("Created pitch_perception.svg")

def create_decibel_scale_svg():
    # Thermometer style dB scale
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Decibel Scale (dB SPL)</text>

    <!-- Scale Line -->
    <line x1="200" y1="350" x2="600" y2="350" stroke="#666" stroke-width="2"/>
    
    <!-- 0 dB -->
    <circle cx="200" cy="350" r="10" fill="#3b82f6"/>
    <text x="200" y="380" text-anchor="middle" fill="#aaa" font-size="14">0 dB (Threshold)</text>
    <text x="200" y="320" text-anchor="middle" fill="#fff" font-size="12">Pin Drop</text>

    <!-- 60 dB -->
    <circle cx="333" cy="350" r="15" fill="#22c55e"/>
    <text x="333" y="380" text-anchor="middle" fill="#aaa" font-size="14">60 dB</text>
    <text x="333" y="310" text-anchor="middle" fill="#fff" font-size="12">Conversation</text>

    <!-- 100 dB -->
    <circle cx="466" cy="350" r="25" fill="#facc15"/>
    <text x="466" y="380" text-anchor="middle" fill="#aaa" font-size="14">100 dB</text>
    <text x="466" y="290" text-anchor="middle" fill="#fff" font-size="12">Drum Kit</text>

    <!-- 140 dB -->
    <circle cx="600" cy="350" r="40" fill="#ef4444"/>
    <text x="600" y="380" text-anchor="middle" fill="#aaa" font-size="14">140 dB (Pain)</text>
    <text x="600" y="260" text-anchor="middle" fill="#fff" font-size="12">Jet Engine</text>

    <text x="400" y="150" text-anchor="middle" fill="#888" font-size="16">Logarithmic Growth: +10dB = 10x Power</text>
</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/decibel_scale.svg', 'w') as f:
        f.write(svg_content)
    print("Created decibel_scale.svg")

def create_bass_woofer_svg():
    # Speaker cone moving air
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Bass Frequencies</text>

    <!-- Speaker Box -->
    <rect x="300" y="100" width="200" height="200" fill="#333" stroke="#555" stroke-width="4"/>
    
    <!-- Woofer Cone -->
    <circle cx="400" cy="200" r="80" fill="#111" stroke="#333" stroke-width="2"/>
    <circle cx="400" cy="200" r="20" fill="#000"/>

    <!-- Vibration Lines (Air movement) -->
    <path d="M 280 180 Q 260 200 280 220" fill="none" stroke="#3b82f6" stroke-width="3" opacity="0.6">
        <animate attributeName="d" values="M 280 180 Q 260 200 280 220; M 270 170 Q 240 200 270 230; M 280 180 Q 260 200 280 220" dur="0.5s" repeatCount="indefinite"/>
    </path>
    <path d="M 520 180 Q 540 200 520 220" fill="none" stroke="#3b82f6" stroke-width="3" opacity="0.6">
        <animate attributeName="d" values="M 520 180 Q 540 200 520 220; M 530 170 Q 560 200 530 230; M 520 180 Q 540 200 520 220" dur="0.5s" repeatCount="indefinite"/>
    </path>

    <text x="400" y="350" text-anchor="middle" fill="#3b82f6" font-size="18">Physically Moving Large Amounts of Air</text>
    <text x="400" y="380" text-anchor="middle" fill="#888" font-size="14">Low Frequency = Long Wavelength = Felt in body</text>
</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/bass_woofer.svg', 'w') as f:
        f.write(svg_content)
    print("Created bass_woofer.svg")

def create_treble_eq_svg():
    # EQ curve boosting highs
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Treble / High Frequency</text>

    <!-- Graph Grid -->
    <line x1="100" y1="300" x2="700" y2="300" stroke="#666" stroke-width="2"/>
    <line x1="100" y1="300" x2="100" y2="100" stroke="#666" stroke-width="2"/>

    <!-- Flat Line (Low/Mid) -->
    <path d="M 100 250 L 400 250" fill="none" stroke="#444" stroke-width="2" stroke-dasharray="5,5"/>
    
    <!-- Boosted Highs -->
    <path d="M 100 250 Q 400 250 500 200 T 700 150" fill="none" stroke="#ec4899" stroke-width="5"/>

    <!-- Labels -->
    <text x="100" y="320" text-anchor="middle" fill="#aaa">20Hz</text>
    <text x="700" y="320" text-anchor="middle" fill="#aaa">20kHz</text>
    
    <!-- Highlight Zone -->
    <rect x="500" y="100" width="200" height="200" fill="#ec4899" opacity="0.1"/>
    <text x="600" y="130" text-anchor="middle" fill="#ec4899" font-size="18" font-weight="bold">Air &amp; Detail</text>
    <text x="600" y="280" text-anchor="middle" fill="#ec4899" font-size="14">Treble Range</text>

</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/treble_eq.svg', 'w') as f:
        f.write(svg_content)
    print("Created treble_eq.svg")

if __name__ == "__main__":
    os.makedirs('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg', exist_ok=True)
    create_pitch_perception_svg()
    create_decibel_scale_svg()
    create_bass_woofer_svg()
    create_treble_eq_svg()
