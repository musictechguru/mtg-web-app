
import os

def create_audio_vs_sound_svg():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#fff" />
        </marker>
    </defs>
    
    <!-- Title -->
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Sound vs Audio</text>

    <!-- Source (Voice) -->
    <g transform="translate(100, 150)">
        <circle cx="50" cy="50" r="40" fill="#3b82f6" opacity="0.8"/>
        <text x="50" y="55" text-anchor="middle" fill="#fff" font-size="14">Voice</text>
        <text x="50" y="110" text-anchor="middle" fill="#aaa" font-size="12">Source</text>
    </g>

    <!-- Connection -->
    <path d="M 200 200 Q 250 150 300 200" fill="none" stroke="#fff" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="250" y="140" text-anchor="middle" fill="#e0e0e0" font-size="14">Sound Waves</text>
    <text x="250" y="160" text-anchor="middle" fill="#888" font-size="12">(Air Pressure)</text>

    <!-- Microphone -->
    <g transform="translate(350, 150)">
        <rect x="20" y="10" width="60" height="80" rx="10" fill="#ec4899" opacity="0.8"/>
        <text x="50" y="55" text-anchor="middle" fill="#fff" font-size="14">Mic</text>
        <text x="50" y="110" text-anchor="middle" fill="#aaa" font-size="12">Transducer</text>
    </g>

    <!-- Connection -->
    <path d="M 450 200 Q 500 250 550 200" fill="none" stroke="#fff" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="500" y="270" text-anchor="middle" fill="#e0e0e0" font-size="14">Audio Signal</text>
    <text x="500" y="290" text-anchor="middle" fill="#888" font-size="12">(Voltage)</text>

    <!-- Destination (Preamplifier) -->
    <g transform="translate(600, 150)">
        <rect x="10" y="20" width="80" height="60" fill="#facc15" opacity="0.8"/>
        <text x="50" y="55" text-anchor="middle" fill="#000" font-size="14">Preamp</text>
        <text x="50" y="110" text-anchor="middle" fill="#aaa" font-size="12">Amplifier</text>
    </g>

</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/audio_vs_sound.svg', 'w') as f:
        f.write(svg_content)
    print("Created audio_vs_sound.svg")

def create_freq_comparison_svg():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Frequency Comparison</text>
    
    <!-- Low Frequency -->
    <g transform="translate(50, 100)">
        <text x="350" y="-20" text-anchor="middle" fill="#3b82f6" font-size="18">Low Frequency (e.g. 50Hz)</text>
        <path d="M 0 50 Q 175 -50 350 50 T 700 50" fill="none" stroke="#3b82f6" stroke-width="4"/>
        <text x="720" y="55" fill="#666" font-size="14">Fewer cycles per second</text>
    </g>

    <!-- High Frequency -->
    <g transform="translate(50, 250)">
        <text x="350" y="-20" text-anchor="middle" fill="#ec4899" font-size="18">High Frequency (e.g. 500Hz)</text>
        <!-- More cycles -->
        <path d="M 0 50 Q 35 -50 70 50 T 140 50 T 210 50 T 280 50 T 350 50 T 420 50 T 490 50 T 560 50 T 630 50 T 700 50" fill="none" stroke="#ec4899" stroke-width="4"/>
        <text x="720" y="55" fill="#666" font-size="14">More cycles per second</text>
    </g>
</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/freq_comparison.svg', 'w') as f:
        f.write(svg_content)
    print("Created freq_comparison.svg")

def create_amp_loudness_svg():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Amplitude vs Loudness</text>
    
    <!-- Axis -->
    <line x1="50" y1="200" x2="750" y2="200" stroke="#666" stroke-width="1"/>

    <!-- Quiet Wave -->
    <path d="M 50 200 Q 150 180 250 200 T 450 200" fill="none" stroke="#888" stroke-width="2" stroke-dasharray="5,5"/>
    <text x="250" y="170" text-anchor="middle" fill="#888" font-size="14">Low Amplitude (Quiet)</text>

    <!-- Loud Wave -->
    <path d="M 50 200 Q 150 50 250 200 T 450 200" fill="none" stroke="#facc15" stroke-width="4"/>
    <text x="250" y="40" text-anchor="middle" fill="#facc15" font-size="14">High Amplitude (Loud)</text>

    <!-- Amplitude Marker -->
    <line x1="250" y1="200" x2="250" y2="50" stroke="#fff" stroke-width="2"/>
    <text x="260" y="125" fill="#fff" font-size="14">Amplitude</text>
</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/amplitude_loudness.svg', 'w') as f:
        f.write(svg_content)
    print("Created amplitude_loudness.svg")

def create_hearing_spectrum_svg():
    # Similar to previous but maybe simplified for Basic
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Human Hearing Range</text>

    <!-- Gradient Defs -->
    <defs>
        <linearGradient id="spectrum" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
        </linearGradient>
    </defs>

    <!-- Main Bar -->
    <rect x="100" y="150" width="600" height="100" rx="10" fill="url(#spectrum)"/>

    <!-- Labels -->
    <text x="100" y="280" text-anchor="middle" fill="#fff" font-size="20">20 Hz</text>
    <text x="700" y="280" text-anchor="middle" fill="#fff" font-size="20">20 kHz</text>
    
    <!-- Sub Labels -->
    <text x="100" y="310" text-anchor="middle" fill="#888" font-size="14">Low Limit</text>
    <text x="700" y="310" text-anchor="middle" fill="#888" font-size="14">High Limit</text>

    <!-- Instrument Ranges -->
    <text x="200" y="190" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="14">Bass</text>
    <text x="400" y="190" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="14">Vocals / Guitars</text>
    <text x="600" y="190" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="14">Cymbals</text>

</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/hearing_spectrum.svg', 'w') as f:
        f.write(svg_content)
    print("Created hearing_spectrum.svg")

def create_waveform_types_svg():
     svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Common Waveforms & Harmonics</text>

    <!-- Sine -->
    <g transform="translate(50, 100)">
        <text x="100" y="-10" text-anchor="middle" fill="#3b82f6" font-size="18">Sine</text>
        <path d="M 0 50 Q 50 -50 100 50 T 200 50" fill="none" stroke="#3b82f6" stroke-width="3"/>
        <text x="100" y="100" text-anchor="middle" fill="#888" font-size="12">Pure Tone (Fundamental only)</text>
    </g>

    <!-- Square -->
    <g transform="translate(300, 100)">
        <text x="100" y="-10" text-anchor="middle" fill="#ec4899" font-size="18">Square</text>
        <path d="M 0 50 L 0 0 L 100 0 L 100 100 L 200 100 L 200 50" fill="none" stroke="#ec4899" stroke-width="3"/>
        <text x="100" y="100" text-anchor="middle" fill="#888" font-size="12">Odd Harmonics (Hollow)</text>
    </g>

    <!-- Sawtooth -->
    <g transform="translate(550, 100)">
        <text x="100" y="-10" text-anchor="middle" fill="#facc15" font-size="18">Sawtooth</text>
        <path d="M 0 100 L 0 0 L 200 100 L 200 0" fill="none" stroke="#facc15" stroke-width="3"/>
        <text x="100" y="100" text-anchor="middle" fill="#888" font-size="12">All Harmonics (Rich/Buzz)</text>
    </g>
    
</svg>"""
     with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/waveform_types.svg', 'w') as f:
        f.write(svg_content)
     print("Created waveform_types.svg")

if __name__ == "__main__":
    os.makedirs('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg', exist_ok=True)
    create_audio_vs_sound_svg()
    create_freq_comparison_svg()
    create_amp_loudness_svg()
    create_hearing_spectrum_svg()
    create_waveform_types_svg()
