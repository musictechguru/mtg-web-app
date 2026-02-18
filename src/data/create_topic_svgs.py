
import os

OUTPUT_DIR = "public/images/vol2"
os.makedirs(OUTPUT_DIR, exist_ok=True)

COLORS = {
    "bg": "#1e1e1e",
    "accent": "#4CAF50",
    "text": "#e0e0e0",
    "line": "#90a4ae",
    "highlight": "#FF5252"
}

def create_svg(filename, content):
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
    <rect width="800" height="400" fill="{COLORS['bg']}" rx="10" />
    <style>
        .title {{ font-family: sans-serif; font-size: 24px; fill: {COLORS['text']}; font-weight: bold; text-anchor: middle; }}
        .label {{ font-family: sans-serif; font-size: 16px; fill: {COLORS['line']}; text-anchor: middle; }}
        .path {{ fill: none; stroke: {COLORS['accent']}; stroke-width: 3; stroke-linecap: round; }}
        .axis {{ stroke: {COLORS['line']}; stroke-width: 2; }}
    </style>
    {content}
</svg>"""
    with open(os.path.join(OUTPUT_DIR, filename), "w") as f:
        f.write(svg)
    print(f"Created {filename}")

# 1. Gain Staging (VU Meter style)
create_svg("explanation_gain_staging.svg", f"""
    <text x="400" y="40" class="title">Gain Staging & Headroom</text>
    <!-- Meter -->
    <rect x="200" y="100" width="400" height="40" fill="#333" stroke="{COLORS['line']}" rx="5" />
    <rect x="202" y="102" width="280" height="36" fill="#4CAF50" opacity="0.8" />
    <rect x="482" y="102" width="80" height="36" fill="#FFC107" opacity="0.8" />
    <rect x="562" y="102" width="36" height="36" fill="#FF5252" opacity="0.8" />
    
    <!-- Labels -->
    <line x1="200" y1="150" x2="600" y2="150" class="axis" />
    <text x="200" y="170" class="label">-60dB</text>
    <text x="480" y="170" class="label">-18dB (Nominal)</text>
    <text x="560" y="170" class="label">0dB (Clip)</text>
    <text x="400" y="250" class="label" fill="white">Signal-to-Noise Ratio vs Headroom</text>
""")

# 2. Dynamic Mic (Moving Coil)
create_svg("explanation_mic_dynamic.svg", f"""
    <text x="400" y="40" class="title">Dynamic Microphone (Moving Coil)</text>
    <circle cx="400" cy="200" r="80" fill="none" stroke="{COLORS['line']}" stroke-width="4" />
    <!-- Diaphragm -->
    <path d="M 380 140 Q 400 130 420 140" stroke="{COLORS['accent']}" stroke-width="4" fill="none" />
    <!-- Coil -->
    <rect x="390" y="140" width="20" height="60" fill="none" stroke="{COLORS['highlight']}" stroke-width="2" />
    <text x="340" y="140" class="label">Diaphragm</text>
    <text x="460" y="170" class="label">Voice Coil</text>
    <text x="400" y="300" class="label">Magnetic Field (Magnet)</text>
    <text x="400" y="350" class="label">Robust / High SPL / No Phantom Power</text>
""")

# 3. Condenser Mic (Capacitor)
create_svg("explanation_mic_condenser.svg", f"""
    <text x="400" y="40" class="title">Condenser Microphone (Capacitor)</text>
    <!-- Backplate -->
    <rect x="350" y="100" width="10" height="150" fill="{COLORS['line']}" />
    <!-- Diaphragm -->
    <rect x="340" y="100" width="2" height="150" fill="{COLORS['accent']}" />
    <!-- Battery/Phantom -->
    <rect x="420" y="150" width="60" height="40" fill="none" stroke="{COLORS['highlight']}" />
    <text x="450" y="175" class="label" font-size="12">+48V</text>
    
    <line x1="340" y1="170" x2="420" y2="170" stroke="white" stroke-dasharray="4" />
    
    <text x="280" y="150" class="label">Diaphragm</text>
    <text x="400" y="280" class="label">Electrostatic Charge</text>
    <text x="400" y="340" class="label">High Sensitivity / Fast Transient Response</text>
""")

# 4. Ribbon Mic
create_svg("explanation_mic_ribbon.svg", f"""
    <text x="400" y="40" class="title">Ribbon Microphone</text>
    <!-- Magnets -->
    <rect x="300" y="100" width="50" height="200" fill="#444" />
    <rect x="450" y="100" width="50" height="200" fill="#444" />
    <!-- Ribbon -->
    <rect x="395" y="110" width="10" height="180" fill="{COLORS['highlight']}" />
    <text x="600" y="200" class="label">Corrugated Aluminum Ribbon</text>
    <line x1="410" y1="200" x2="550" y2="200" stroke="white" />
    
    <text x="400" y="350" class="label">Warm / Figure-8 / Fragile</text>
""")

# 5. Proximity Effect
create_svg("explanation_proximity_effect.svg", f"""
    <text x="400" y="40" class="title">Proximity Effect</text>
    <!-- Graph -->
    <line x1="100" y1="350" x2="700" y2="350" class="axis" /> <!-- X -->
    <line x1="100" y1="50" x2="100" y2="350" class="axis" /> <!-- Y -->
    
    <!-- Lines -->
    <path d="M 100 200 Q 300 200 700 200" stroke="{COLORS['line']}" stroke-width="2" fill="none" /> <!-- Normal -->
    <path d="M 100 100 Q 300 200 700 200" stroke="{COLORS['highlight']}" stroke-width="4" fill="none" /> <!-- Proximity -->
    
    <text x="150" y="90" class="label" fill="{COLORS['highlight']}">Close Distance (Bass Boost)</text>
    <text x="600" y="190" class="label">Normal Response</text>
    <text x="400" y="380" class="label">Frequency (Hz)</text>
    <text x="60" y="200" class="label" transform="rotate(-90, 60, 200)">Amplitude</text>
""")

# 6. 3:1 Rule
create_svg("explanation_3_to_1_rule.svg", f"""
    <text x="400" y="40" class="title">3:1 Rule (Phase Coherence)</text>
    <!-- Source -->
    <circle cx="200" cy="200" r="20" fill="white" />
    <text x="200" y="240" class="label">Source</text>
    
    <!-- Mic 1 -->
    <rect x="300" y="180" width="20" height="40" fill="{COLORS['accent']}" />
    <text x="310" y="160" class="label">Mic 1</text>
    
    <!-- Mic 2 -->
    <rect x="600" y="180" width="20" height="40" fill="{COLORS['accent']}" />
    <text x="610" y="160" class="label">Mic 2</text>
    
    <!-- Distances -->
    <line x1="220" y1="200" x2="300" y2="200" stroke="white" stroke-dasharray="5" />
    <text x="260" y="190" class="label">D</text>
    
    <line x1="320" y1="200" x2="600" y2="200" stroke="white" stroke-dasharray="5" />
    <text x="460" y="190" class="label">3 x D (Minimum)</text>
    
    <text x="400" y="320" class="label">Prevents Phase Cancellation</text>
""")

# 7. Stereo XY
create_svg("explanation_stereo_xy.svg", f"""
    <text x="400" y="40" class="title">XY Stereo (Coincident Pair)</text>
    <!-- Mics -->
    <path d="M 380 200 L 420 240" stroke="{COLORS['accent']}" stroke-width="8" stroke-linecap="round" />
    <path d="M 420 200 L 380 240" stroke="{COLORS['highlight']}" stroke-width="8" stroke-linecap="round" />
    
    <circle cx="400" cy="220" r="50" fill="none" stroke="white" stroke-dasharray="4" />
    
    <text x="400" y="300" class="label">90° Angle / Capsules Together</text>
    <text x="400" y="340" class="label">Good Mono Compatibility / Stable Image</text>
""")

# 8. Stereo Spaced Pair
create_svg("explanation_stereo_spaced.svg", f"""
    <text x="400" y="40" class="title">Spaced Pair (AB)</text>
    <!-- Mic L -->
    <rect x="250" y="180" width="20" height="40" fill="{COLORS['accent']}" />
    <text x="260" y="160" class="label">Mic L</text>
    
    <!-- Mic R -->
    <rect x="550" y="180" width="20" height="40" fill="{COLORS['accent']}" />
    <text x="560" y="160" class="label">Mic R</text>
    
    <!-- Spacing -->
    <line x1="270" y1="200" x2="550" y2="200" stroke="white" stroke-dasharray="5" />
    <text x="400" y="190" class="label">3 - 10 Feet</text>
    
    <text x="400" y="300" class="label">Wide Stereo Image / Potential Phase Issues</text>
""")

