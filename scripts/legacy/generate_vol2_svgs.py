import os

def check_dir():
    output_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    return output_dir

def create_gain_vs_volume_flow(output_dir):
    # Flowchart showing Preamp (Gain) -> Signal Proc -> Fader (Volume)
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <!-- Arrow -->
    <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#666" />
        </marker>
    </defs>

    <!-- Source -->
    <path d="M 50 150 Q 80 150 100 150" stroke="#666" stroke-width="4" marker-end="url(#arrow)"/>
    
    <!-- Preamp / Gain Box -->
    <rect x="100" y="100" width="150" height="100" rx="10" ry="10" fill="#db2777" stroke="#be185d" stroke-width="3"/>
    <text x="175" y="140" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="20">GAIN</text>
    <text x="175" y="170" text-anchor="middle" fill="#fce7f3" font-size="14">(Input Level)</text>
    
    <!-- Connect -->
    <path d="M 250 150 L 350 150" stroke="#666" stroke-width="4" marker-end="url(#arrow)"/>

    <!-- Processing / Insert -->
    <rect x="350" y="120" width="100" height="60" rx="5" ry="5" fill="#333" stroke="#555" stroke-width="2"/>
    <text x="400" y="155" text-anchor="middle" fill="#aaa" font-size="14">Processing</text>

    <!-- Connect -->
    <path d="M 450 150 L 550 150" stroke="#666" stroke-width="4" marker-end="url(#arrow)"/>

    <!-- Fader / Volume Box -->
    <rect x="550" y="100" width="150" height="100" rx="10" ry="10" fill="#2563eb" stroke="#1d4ed8" stroke-width="3"/>
    <text x="625" y="140" text-anchor="middle" fill="#ffffff" font-weight="bold" font-size="20">VOLUME</text>
    <text x="625" y="170" text-anchor="middle" fill="#dbeafe" font-size="14">(Output Level)</text>

    <!-- Output -->
    <path d="M 700 150 L 750 150" stroke="#666" stroke-width="4" marker-end="url(#arrow)"/>

    <!-- Labels -->
    <text x="175" y="230" text-anchor="middle" fill="#db2777" font-size="14">Sets Tone & Sensitivity</text>
    <text x="625" y="230" text-anchor="middle" fill="#2563eb" font-size="14">Sets Loudness</text>

</svg>"""
    with open(os.path.join(output_dir, 'gain_vs_volume_flow.svg'), 'w') as f:
        f.write(svg_content)
    print("Created gain_vs_volume_flow.svg")

def create_headroom_safety_gap(output_dir):
    # Vertical meter showing Clip, Peak, and Average levels
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <!-- Title -->
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">Headroom Concept</text>

    <!-- Meter Background -->
    <rect x="150" y="80" width="100" height="450" rx="5" ry="5" fill="#111" stroke="#444" stroke-width="2"/>
    
    <!-- Clip Zone (Red) -->
    <rect x="152" y="82" width="96" height="50" fill="#ef4444" opacity="0.3"/>
    <line x1="150" y1="132" x2="250" y2="132" stroke="#ef4444" stroke-width="2"/>
    <text x="260" y="136" fill="#ef4444" font-size="14" font-weight="bold">0dBFS (Clip)</text>

    <!-- Peak Level (Yellow) -->
    <rect x="160" y="200" width="80" height="320" fill="#eab308" opacity="0.8"/>
    <line x1="150" y1="200" x2="250" y2="200" stroke="#eab308" stroke-width="2" stroke-dasharray="4"/>
    <text x="260" y="205" fill="#eab308" font-size="14">-6dBFS (Peak)</text>

    <!-- Headroom Brace -->
    <path d="M 130 132 L 110 132 L 110 200 L 130 200" fill="none" stroke="#fff" stroke-width="2"/>
    <text x="90" y="170" text-anchor="end" fill="#fff" font-size="18" font-weight="bold">HEADROOM</text>
    <text x="90" y="190" text-anchor="end" fill="#aaa" font-size="12">Safety Margin</text>

    <!-- Average Body (Green) -->
    <rect x="160" y="300" width="80" height="220" fill="#22c55e" opacity="0.9"/>
    <line x1="150" y1="300" x2="250" y2="300" stroke="#22c55e" stroke-width="2" stroke-dasharray="4"/>
    <text x="260" y="305" fill="#22c55e" font-size="14">-18dBFS (Avg)</text>

    <!-- Noise Floor -->
    <rect x="160" y="500" width="80" height="28" fill="#555" opacity="0.5"/>
    <text x="200" y="520" text-anchor="middle" fill="#888" font-size="10">Noise Floor</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'headroom_safety_gap.svg'), 'w') as f:
        f.write(svg_content)
    print("Created headroom_safety_gap.svg")

def create_mic_types_overview(output_dir):
    # Icons for Dynamic, Condenser, Ribbon
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <!-- Dynamic Panel -->
    <g transform="translate(50, 50)">
        <rect x="0" y="0" width="200" height="200" rx="10" fill="#333"/>
        <text x="100" y="30" text-anchor="middle" fill="#fff" font-weight="bold" font-size="18">Dynamic</text>
        <!-- Icon: Ball mic -->
        <circle cx="100" cy="90" r="40" fill="#555" stroke="#888" stroke-width="2"/>
        <rect x="85" y="125" width="30" height="60" fill="#444"/>
        <text x="100" y="180" text-anchor="middle" fill="#aaa" font-size="12">Rugged, No Power</text>
    </g>

    <!-- Condenser Panel -->
    <g transform="translate(300, 50)">
        <rect x="0" y="0" width="200" height="200" rx="10" fill="#333"/>
        <text x="100" y="30" text-anchor="middle" fill="#fff" font-weight="bold" font-size="18">Condenser</text>
        <!-- Icon: Side address -->
        <rect x="80" y="60" width="40" height="80" rx="5" fill="#eab308" opacity="0.2" stroke="#eab308" stroke-width="2"/>
        <line x1="100" y1="140" x2="100" y2="180" stroke="#666" stroke-width="4"/>
        <!-- Lightning symbol for phantom -->
        <path d="M 140 60 L 130 90 L 140 90 L 130 120" fill="#eab308"/>
        <text x="100" y="180" text-anchor="middle" fill="#aaa" font-size="12">Detailed, +48V</text>
    </g>

    <!-- Ribbon Panel -->
    <g transform="translate(550, 50)">
        <rect x="0" y="0" width="200" height="200" rx="10" fill="#333"/>
        <text x="100" y="30" text-anchor="middle" fill="#fff" font-weight="bold" font-size="18">Ribbon</text>
        <!-- Icon: Rectangular with ribbon -->
        <rect x="70" y="60" width="60" height="90" fill="#none" stroke="#ec4899" stroke-width="2"/>
        <line x1="100" y1="65" x2="100" y2="145" stroke="#ec4899" stroke-width="3" stroke-dasharray="5,2"/>
        <text x="100" y="180" text-anchor="middle" fill="#aaa" font-size="12">Smooth, Delicate</text>
    </g>
    
</svg>"""
    with open(os.path.join(output_dir, 'mic_types_overview.svg'), 'w') as f:
        f.write(svg_content)
    print("Created mic_types_overview.svg")

def create_phantom_power_switch(output_dir):
    # Closeup of a +48V button
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <!-- Interface Panel Background -->
    <rect x="50" y="50" width="300" height="200" fill="#333" stroke="#555" stroke-width="4" rx="10"/>
    
    <!-- Button Base -->
    <circle cx="200" cy="150" r="50" fill="#111" stroke="#222" stroke-width="2"/>
    
    <!-- The Button (Active) -->
    <circle cx="200" cy="150" r="40" fill="#ef4444" opacity="0.9"/>
    
    <!-- Text -->
    <text x="200" y="158" text-anchor="middle" fill="#fff" font-weight="bold" font-size="24">+48V</text>
    
    <!-- Glow Effect -->
    <circle cx="200" cy="150" r="60" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.5"/>
    <line x1="200" y1="90" x2="200" y2="70" stroke="#ef4444" stroke-width="2"/>
    <text x="200" y="60" text-anchor="middle" fill="#ef4444" font-size="14">PHANTOM POWER</text>
    
    <text x="200" y="230" text-anchor="middle" fill="#aaa" font-size="14">Required for Condensers</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'phantom_power_switch.svg'), 'w') as f:
        f.write(svg_content)
    print("Created phantom_power_switch.svg")

def create_mic_sensitivity_comparison(output_dir):
    # Bar chart showing Condenser vs Dynamic output level
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <text x="300" y="40" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">Microphone Sensitivity</text>

    <!-- Axes -->
    <line x1="100" y1="350" x2="500" y2="350" stroke="#888" stroke-width="2"/>
    <line x1="100" y1="350" x2="100" y2="100" stroke="#888" stroke-width="2"/>
    <text x="60" y="200" transform="rotate(-90 60,200)" text-anchor="middle" fill="#aaa">Output Level (Voltage)</text>

    <!-- Dynamic Bar -->
    <rect x="150" y="250" width="100" height="100" fill="#3b82f6"/>
    <text x="200" y="375" text-anchor="middle" fill="#fff" font-weight="bold">Dynamic</text>
    <text x="200" y="240" text-anchor="middle" fill="#3b82f6" font-size="14">Low (-55dB)</text>
    
    <!-- Condenser Bar -->
    <rect x="350" y="120" width="100" height="230" fill="#eab308"/>
    <text x="400" y="375" text-anchor="middle" fill="#fff" font-weight="bold">Condenser</text>
    <text x="400" y="110" text-anchor="middle" fill="#eab308" font-size="14">High (-35dB)</text>

    <!-- Explanation -->
    <text x="300" y="80" text-anchor="middle" fill="#ccc" font-size="14">Low Mass Diaphragm = Higher Voltage Output</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'mic_sensitivity_comparison.svg'), 'w') as f:
        f.write(svg_content)
    print("Created mic_sensitivity_comparison.svg")

def create_spl_meter_scale(output_dir):
    # Thermometer style SPL scale
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 600" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <text x="150" y="40" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">Sound Pressure (SPL)</text>

    <!-- Scale Line -->
    <line x1="100" y1="100" x2="100" y2="500" stroke="#666" stroke-width="4"/>

    <!-- High End -->
    <circle cx="100" cy="100" r="10" fill="#ef4444"/>
    <text x="120" y="105" fill="#ef4444" font-weight="bold">140dB (Jet Engine)</text>
    
    <circle cx="100" cy="200" r="8" fill="#f97316"/>
    <text x="120" y="205" fill="#f97316">110dB (Rock Concert)</text>
    
    <circle cx="100" cy="300" r="6" fill="#eab308"/>
    <text x="120" y="305" fill="#eab308">85dB (Mix Level)</text>
    
    <circle cx="100" cy="400" r="6" fill="#22c55e"/>
    <text x="120" y="405" fill="#22c55e">60dB (Conversation)</text>
    
    <circle cx="100" cy="500" r="4" fill="#3b82f6"/>
    <text x="120" y="505" fill="#3b82f6">20dB (Whisper)</text>

    <text x="150" y="550" text-anchor="middle" fill="#aaa" font-style="italic">Measured in Decibels (dB)</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'spl_meter_scale.svg'), 'w') as f:
        f.write(svg_content)
    print("Created spl_meter_scale.svg")

def create_large_vs_small_diaphragm(output_dir):
    # Comparison of two circular diaphragms
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <!-- Large Diaphragm -->
    <g transform="translate(150, 150)">
        <circle cx="0" cy="0" r="60" fill="url(#gradGold)" stroke="#eab308" stroke-width="4"/>
        <text x="0" y="90" text-anchor="middle" fill="#eab308" font-weight="bold" font-size="18">Large Diaphragm</text>
        <text x="0" y="115" text-anchor="middle" fill="#ddd" font-size="14">Warm, Low Noise</text>
    </g>

    <!-- Small Diaphragm -->
    <g transform="translate(450, 150)">
        <circle cx="0" cy="0" r="20" fill="url(#gradSilver)" stroke="#cbd5e1" stroke-width="2"/>
        <text x="0" y="90" text-anchor="middle" fill="#cbd5e1" font-weight="bold" font-size="18">Small Diaphragm</text>
        <text x="0" y="115" text-anchor="middle" fill="#ddd" font-size="14">Fast Transient Response</text>
    </g>

    <defs>
        <radialGradient id="gradGold" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#fce7f3;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#eab308;stop-opacity:1" />
        </radialGradient>
        <radialGradient id="gradSilver" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#64748b;stop-opacity:1" />
        </radialGradient>
    </defs>
    
</svg>"""
    with open(os.path.join(output_dir, 'large_vs_small_diaphragm.svg'), 'w') as f:
        f.write(svg_content)
    print("Created large_vs_small_diaphragm.svg")

def main():
    output_dir = check_dir()
    create_gain_vs_volume_flow(output_dir)
    create_headroom_safety_gap(output_dir)
    create_mic_types_overview(output_dir)
    create_phantom_power_switch(output_dir)
    create_mic_sensitivity_comparison(output_dir)
    create_spl_meter_scale(output_dir)
    create_large_vs_small_diaphragm(output_dir)
    print(f"All SVGs generated in {output_dir}")

if __name__ == "__main__":
    main()
