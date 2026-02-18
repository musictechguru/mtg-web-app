
import os

def create_hearing_range_svg():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <!-- Title -->
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Frequency Spectrum</text>
    
    <!-- Axis Line -->
    <line x1="50" y1="300" x2="750" y2="300" stroke="#888" stroke-width="2"/>
    
    <!-- Range Blocks -->
    <!-- Infrasound -->
    <rect x="50" y="100" width="100" height="200" fill="#333" opacity="0.5"/>
    <text x="100" y="200" text-anchor="middle" fill="#666" font-size="18" transform="rotate(-90 100,200)">Infrasound</text>
    <text x="100" y="330" text-anchor="middle" fill="#888" font-size="14">&lt; 20Hz</text>

    <!-- Human Hearing -->
    <rect x="150" y="100" width="500" height="200" fill="url(#gradient)"/>
    <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.8" />
        </linearGradient>
    </defs>
    
    <text x="400" y="150" text-anchor="middle" fill="#ffffff" font-size="28" font-weight="bold">Human Hearing Range</text>
    <text x="400" y="190" text-anchor="middle" fill="#e0e0e0" font-size="20">20 Hz - 20 kHz</text>
    
    <!-- Sub-labels within hearing -->
    <text x="200" y="280" text-anchor="middle" fill="#ddd" font-size="14">Bass</text>
    <text x="400" y="280" text-anchor="middle" fill="#ddd" font-size="14">Mids</text>
    <text x="600" y="280" text-anchor="middle" fill="#ddd" font-size="14">Treble</text>

    <!-- Ultrasound -->
    <rect x="650" y="100" width="100" height="200" fill="#333" opacity="0.5"/>
    <text x="700" y="200" text-anchor="middle" fill="#666" font-size="18" transform="rotate(-90 700,200)">Ultrasound</text>
    <text x="700" y="330" text-anchor="middle" fill="#888" font-size="14">&gt; 20kHz</text>

    <!-- Ticks -->
    <line x1="150" y1="300" x2="150" y2="310" stroke="#fff" stroke-width="2"/>
    <line x1="650" y1="300" x2="650" y2="310" stroke="#fff" stroke-width="2"/>

</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/human_hearing_range.svg', 'w') as f:
        f.write(svg_content)
    print("Created human_hearing_range.svg")

def create_phaser_animation_svg():
    # Creates a sine wave that moves horizontally to simulate phase/motion
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e;">
    <defs>
        <clipPath id="screen">
            <rect x="50" y="50" width="700" height="300"/>
        </clipPath>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
    </defs>

    <!-- Grid -->
    <g stroke="#333" stroke-width="1">
        <line x1="50" y1="200" x2="750" y2="200"/>
        <line x1="400" y1="50" x2="400" y2="350"/>
    </g>

    <!-- Text -->
    <text x="400" y="40" text-anchor="middle" fill="#aaa" font-family="sans-serif" font-size="16">Waveform (Time Domain)</text>

    <!-- Animated Wave -->
    <g clip-path="url(#screen)">
        <path d="M -800 200 Q -700 50 -600 200 T -400 200 T -200 200 T 0 200 T 200 200 T 400 200 T 600 200 T 800 200 T 1000 200 T 1200 200 T 1400 200" 
              fill="none" stroke="url(#waveGradient)" stroke-width="8" stroke-linecap="round">
            <animateTransform 
                attributeName="transform" 
                type="translate" 
                from="0 0" 
                to="-400 0" 
                dur="2s" 
                repeatCount="indefinite" />
        </path>
        
        <!-- Second ghost wave to show 'phasing' effect visually (fainter, slightly different speed/phase) -->
        <path d="M -800 200 Q -700 50 -600 200 T -400 200 T -200 200 T 0 200 T 200 200 T 400 200 T 600 200 T 800 200 T 1000 200 T 1200 200 T 1400 200" 
              fill="none" stroke="#ec4899" stroke-width="4" stroke-opacity="0.5" stroke-linecap="round">
             <animateTransform 
                attributeName="transform" 
                type="translate" 
                from="-50 0" 
                to="-450 0" 
                dur="2.1s" 
                repeatCount="indefinite" />
        </path>
    </g>
    
    <text x="50" y="380" fill="#666" font-family="sans-serif" font-size="12">Amplitude vs Time</text>
</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/waveform_phaser_anim.svg', 'w') as f:
        f.write(svg_content)
    print("Created waveform_phaser_anim.svg")

def create_transient_svg():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <!-- Title -->
    <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-size="24" font-weight="bold">Transient Waveform</text>

    <!-- Axis -->
    <line x1="50" y1="200" x2="750" y2="200" stroke="#666" stroke-width="1"/>
    
    <!-- Waveform drawing: Sharp attack, fast decay -->
    <path d="M 50 200 
             L 100 200 
             L 105 50  <!-- Peak (Transient) -->
             L 110 320 
             L 115 100 
             L 120 280 
             L 130 150 
             L 140 240 
             L 160 180 
             L 200 210 
             L 300 200 
             L 750 200" 
          fill="none" stroke="#facc15" stroke-width="3" stroke-linejoin="round"/>
          
    <!-- Annotation Circle -->
    <circle cx="107" cy="50" r="20" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="5,5"/>
    <line x1="127" y1="50" x2="200" y2="50" stroke="#ef4444" stroke-width="1"/>
    <text x="210" y="55" fill="#ef4444" font-size="20" font-weight="bold">Transient Integration</text>
    <text x="210" y="75" fill="#ef4444" font-size="14">(Initial high energy peak)</text>

    <!-- Labels -->
    <text x="105" y="350" text-anchor="middle" fill="#aaa">Attack</text>
    <text x="250" y="350" text-anchor="middle" fill="#aaa">Decay / Sustain</text>

</svg>"""
    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg/transient_waveform.svg', 'w') as f:
        f.write(svg_content)
    print("Created transient_waveform.svg")

if __name__ == "__main__":
    os.makedirs('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg', exist_ok=True)
    create_hearing_range_svg()
    create_phaser_animation_svg()
    create_transient_svg()
