import os
import math

def check_dir():
    output_dir = "public/images/svg"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    return output_dir

def create_snare_mic_position(output_dir):
    # Concept: Side view of snare drum with SM57 at correct angle
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <defs>
        <linearGradient id="drumShell" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#b45309" />
            <stop offset="50%" style="stop-color:#d97706" />
            <stop offset="100%" style="stop-color:#b45309" />
        </linearGradient>
    </defs>
    
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Snare Mic Placement</text>
    
    <!-- Snare Drum Side View -->
    <rect x="100" y="150" width="200" height="80" fill="url(#drumShell)" stroke="#ccc" stroke-width="2"/>
    <rect x="95" y="145" width="210" height="10" fill="#ddd"/> <!-- Top Rim -->
    <rect x="95" y="225" width="210" height="10" fill="#ddd"/> <!-- Bottom Rim -->
    
    <!-- Mic (SM57 style) -->
    <g transform="translate(80, 110) rotate(45)">
        <rect x="0" y="0" width="20" height="80" fill="#333" rx="2"/>
        <rect x="2" y="-5" width="16" height="10" fill="#111"/> <!-- Grill -->
        <rect x="0" y="80" width="15" height="40" fill="#111"/> <!-- Clip/Cable area -->
    </g>
    
    <!-- Sound Waves -->
    <path d="M 150 140 Q 160 120 180 130" stroke="#60a5fa" stroke-width="2" fill="none"/>
    <path d="M 140 130 Q 150 110 170 120" stroke="#60a5fa" stroke-width="2" fill="none"/>

    <text x="200" y="280" text-anchor="middle" fill="#aaa" font-size="14">Angle captures both attack & body</text>
</svg>"""
    with open(os.path.join(output_dir, 'snare_mic_position.svg'), 'w') as f:
        f.write(svg_content)
    print("Created snare_mic_position.svg")

def create_kick_cutaway(output_dir):
    # Concept: Cutaway of kick drum showing mic inside
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <defs>
        <radialGradient id="kickHead" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#eee;stop-opacity:0.1" />
            <stop offset="100%" style="stop-color:#eee;stop-opacity:0.3" />
        </radialGradient>
    </defs>
    
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Kick Drum Inside Mic</text>
    
    <!-- Kick Drum Shell Cutaway -->
    <path d="M 50 100 L 350 100 L 350 250 L 50 250 Z" fill="none" stroke="#888" stroke-width="2" stroke-dasharray="5,5"/>
    <rect x="345" y="100" width="10" height="150" fill="#bbb"/> <!-- Front Hoop -->
    <rect x="45" y="100" width="10" height="150" fill="#bbb"/> <!-- Batter Hoop -->
    <line x1="55" y1="100" x2="55" y2="250" stroke="#fff" stroke-width="2" opacity="0.5"/> <!-- Batter Head -->

    <!-- Beater -->
    <circle cx="40" cy="175" r="15" fill="#fff"/>
    <line x1="10" y1="175" x2="40" y2="175" stroke="#ccc" stroke-width="5"/>

    <!-- Mic Stand Boom -->
    <line x1="380" y1="150" x2="200" y2="175" stroke="#555" stroke-width="6"/>
    
    <!-- Mic Inside -->
    <rect x="160" y="165" width="40" height="20" rx="5" fill="#ef4444"/> <!-- Dynamic Mic -->
    <text x="180" y="160" text-anchor="middle" fill="#ef4444" font-size="12">Attack Zone</text>
    
    <text x="200" y="280" text-anchor="middle" fill="#aaa" font-size="14">Mic inside captures the 'Click' (Transient)</text>
</svg>"""
    with open(os.path.join(output_dir, 'kick_in_out_mic.svg'), 'w') as f:
        f.write(svg_content)
    print("Created kick_in_out_mic.svg")

def create_overhead_xy(output_dir):
    # Concept: Top down view of XY pair
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">X/Y Overhead Configuration</text>
    
    <!-- Drums Top Down -->
    <circle cx="100" cy="150" r="40" fill="none" stroke="#666" stroke-width="2"/> <!-- Snare -->
    <circle cx="300" cy="150" r="45" fill="none" stroke="#666" stroke-width="2"/> <!-- Floor Tom -->
    <circle cx="200" cy="100" r="30" fill="none" stroke="#666" stroke-width="2"/> <!-- Rack Tom -->
    <circle cx="100" cy="220" r="10" fill="#d97706" opacity="0.6"/> <!-- Hat -->
    
    <!-- XY Mics -->
    <g transform="translate(200, 200)">
        <!-- Mic 1 -->
        <line x1="0" y1="0" x2="-30" y2="-30" stroke="#3b82f6" stroke-width="4"/>
        <circle cx="-30" cy="-30" r="5" fill="#3b82f6"/>
        <!-- Mic 2 -->
        <line x1="0" y1="0" x2="30" y2="-30" stroke="#3b82f6" stroke-width="4"/>
        <circle cx="30" cy="-30" r="5" fill="#3b82f6"/>
        
        <!-- Center point -->
        <circle cx="0" cy="0" r="3" fill="#fff"/>
        
        <!-- Capture Area -->
        <path d="M -30 -30 L -60 -80 M 30 -30 L 60 -80" stroke="#3b82f6" stroke-width="1" stroke-dasharray="4"/>
    </g>

    <text x="200" y="250" text-anchor="middle" fill="#3b82f6" font-size="14">Capsules coincident (touching) at 90°</text>
    <text x="200" y="270" text-anchor="middle" fill="#888" font-size="12">Phase Coherent Stereo</text>
</svg>"""
    with open(os.path.join(output_dir, 'overhead_xy_config.svg'), 'w') as f:
        f.write(svg_content)
    print("Created overhead_xy_config.svg")

def create_snare_phase_flip(output_dir):
    # Concept: Waveforms cancelling
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Phase Cancellation</text>
    
    <!-- Top Mic Signal -->
    <path d="M 50 100 Q 100 50 150 100 T 250 100 T 350 100" fill="none" stroke="#22c55e" stroke-width="3"/>
    <text x="370" y="105" fill="#22c55e" font-size="14">Top Mic</text>
    
    <!-- Bottom Mic Signal (Opposite) -->
    <path d="M 50 100 Q 100 150 150 100 T 250 100 T 350 100" fill="none" stroke="#ef4444" stroke-width="3"/>
    <text x="370" y="125" fill="#ef4444" font-size="14">Bottom Mic</text>
    
    <!-- Result (Flat line) -->
    <line x1="50" y1="200" x2="350" y2="200" stroke="#888" stroke-width="2" stroke-dasharray="5"/>
    <text x="200" y="220" text-anchor="middle" fill="#ccc" font-size="14">Result: Silence / Thin Sound</text>
    
    <!-- Flip Button -->
    <rect x="150" y="240" width="100" height="40" rx="5" fill="#333" stroke="#fff"/>
    <text x="200" y="265" text-anchor="middle" fill="#fff" font-weight="bold">Ø INVERT</text>
</svg>"""
    with open(os.path.join(output_dir, 'phase_flip_summation.svg'), 'w') as f:
        f.write(svg_content)
    print("Created phase_flip_summation.svg")

def create_hihat_bleed(output_dir):
    # Concept: Snare mic pointing away from hi-hat
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Hi-Hat Isolation</text>
    
    <!-- Hi Hat -->
    <circle cx="100" cy="150" r="30" fill="#f59e0b" opacity="0.8"/>
    <text x="100" y="155" text-anchor="middle" fill="#000" font-weight="bold">HH</text>
    
    <!-- Snare -->
    <circle cx="220" cy="150" r="50" fill="#ccc" opacity="0.3"/>
    <text x="220" y="155" text-anchor="middle" fill="#fff">Snare</text>
    
    <!-- Mic -->
    <g transform="translate(190, 130) rotate(-20)">
        <rect x="0" y="0" width="40" height="15" rx="2" fill="#3b82f6"/>
        <!-- Null Point indicator -->
        <path d="M 0 7 L -20 7" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
        <text x="-40" y="10" fill="#ef4444" font-size="10">Null Point</text>
    </g>
    
    <text x="200" y="250" text-anchor="middle" fill="#aaa" font-size="14">Point the back (null) of the mic at the Hat</text>
</svg>"""
    with open(os.path.join(output_dir, 'hihat_snare_isolation.svg'), 'w') as f:
        f.write(svg_content)
    print("Created hihat_snare_isolation.svg")

def create_tom_clip(output_dir):
    # Concept: Close up of tom rim clip
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Tom Mic Clip-On</text>
    
    <!-- Tom Rim -->
    <path d="M 50 150 Q 200 180 350 150" stroke="#bbb" stroke-width="8" fill="none"/>
    <path d="M 50 160 Q 200 190 350 160" stroke="#888" stroke-width="4" fill="none"/> <!-- Shell edge -->
    
    <!-- Mic -->
    <g transform="translate(200, 130)">
        <circle cx="0" cy="0" r="15" fill="#333" stroke="#555"/> <!-- Mic Body -->
        <rect x="-10" y="10" width="20" height="30" fill="#222"/> <!-- Stem -->
        <path d="M -15 30 L 15 30 L 10 50 L -10 50 Z" fill="#111"/> <!-- Clip Base -->
    </g>
    
    <circle cx="200" cy="130" r="2" fill="#22c55e"/>
    <text x="240" y="135" fill="#22c55e" font-size="12">1-2 inches above</text>
</svg>"""
    with open(os.path.join(output_dir, 'tom_clip_angle.svg'), 'w') as f:
        f.write(svg_content)
    print("Created tom_clip_angle.svg")

def create_acoustic_12th_fret(output_dir):
    # Concept: Guitar neck and sweet spot
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Acoustic Guitar 'Sweet Spot'</text>
    
    <!-- Guitar Body & Neck -->
    <path d="M 250 100 Q 300 100 320 150 Q 300 200 250 200" fill="#5c3a21" stroke="#3e2716" stroke-width="2"/>
    <circle cx="280" cy="150" r="25" fill="#222"/> <!-- Soundhole -->
    <rect x="50" y="140" width="200" height="20" fill="#754c29"/> <!-- Neck -->
    
    <!-- 12th Fret Marker -->
    <rect x="230" y="140" width="5" height="20" fill="#aaa"/>
    <text x="232" y="130" text-anchor="middle" fill="#ccc" font-size="10">12th Fret</text>
    
    <!-- Mic -->
    <g transform="translate(210, 200) rotate(-45)">
        <rect x="0" y="0" width="10" height="40" fill="#ccc"/>
        <circle cx="5" cy="0" r="8" fill="#aaa" stroke="#fff"/>
    </g>
    
    <text x="200" y="270" text-anchor="middle" fill="#aaa" font-size="14">Aim at neck/body join (12th fret) for balance</text>
    <text x="320" y="150" text-anchor="middle" fill="#ef4444" font-size="12" opacity="0.7">Too Boomy</text>
</svg>"""
    with open(os.path.join(output_dir, 'acoustic_guitar_12th_fret.svg'), 'w') as f:
        f.write(svg_content)
    print("Created acoustic_guitar_12th_fret.svg")

def create_amp_cone_zones(output_dir):
    # Concept: Speaker cone with zones
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <defs>
        <radialGradient id="speakerCone" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#333" />
            <stop offset="90%" style="stop-color:#111" />
            <stop offset="100%" style="stop-color:#333" />
        </radialGradient>
    </defs>
    
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Amp Speaker Zones</text>
    
    <!-- Speaker -->
    <circle cx="200" cy="160" r="100" fill="url(#speakerCone)" stroke="#555" stroke-width="5"/>
    <circle cx="200" cy="160" r="20" fill="#222" stroke="#444"/> <!-- Dust Cap -->
    
    <!-- Zones -->
    <circle cx="200" cy="160" r="25" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5"/>
    <text x="200" y="165" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="12">Bright</text>
    
    <circle cx="200" cy="160" r="70" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5"/>
    <text x="200" y="110" text-anchor="middle" fill="#3b82f6" font-weight="bold" font-size="12">Warm / Dark</text>
    
    <!-- Mic Arrows -->
    <path d="M 230 160 L 280 160" stroke="#fff" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="320" y="165" fill="#aaa" font-size="12">Smoother Tone</text>
</svg>"""
    with open(os.path.join(output_dir, 'amp_cone_axis.svg'), 'w') as f:
        f.write(svg_content)
    print("Created amp_cone_axis.svg")

def create_ribbon_mic(output_dir):
    # Concept: Ribbon mic icon
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Ribbon Microphone</text>
    
    <!-- Mic Body -->
    <rect x="170" y="80" width="60" height="150" rx="10" fill="#333" stroke="#666" stroke-width="2"/>
    
    <!-- Grille -->
    <rect x="180" y="90" width="40" height="100" fill="#222"/>
    <line x1="200" y1="90" x2="200" y2="190" stroke="#d4af37" stroke-width="2"/> <!-- The Ribbon Element -->
    
    <text x="260" y="140" fill="#d4af37" font-size="14">Delicate Ribbon Element</text>
    <path d="M 250 140 L 210 140" stroke="#d4af37" stroke-width="1"/>
    
    <text x="200" y="270" text-anchor="middle" fill="#aaa" font-size="14">Figure-8 Pattern, Smooth Highs</text>
</svg>"""
    with open(os.path.join(output_dir, 'ribbon_mic_figure8.svg'), 'w') as f:
        f.write(svg_content)
    print("Created ribbon_mic_figure8.svg")

def create_stereo_quartet(output_dir):
    # Concept: Quartet layout and stereo pair
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Ensemble Stereo Recording</text>
    
    <!-- Musicians -->
    <circle cx="100" cy="100" r="15" fill="#555"/> <text x="100" y="130" text-anchor="middle" fill="#777" font-size="10">Violin</text>
    <circle cx="300" cy="100" r="15" fill="#555"/> <text x="300" y="130" text-anchor="middle" fill="#777" font-size="10">Violin</text>
    <circle cx="150" cy="150" r="15" fill="#555"/> <text x="150" y="180" text-anchor="middle" fill="#777" font-size="10">Viola</text>
    <circle cx="250" cy="150" r="15" fill="#555"/> <text x="250" y="180" text-anchor="middle" fill="#777" font-size="10">Cello</text>
    
    <!-- Stereo Pair Stand -->
    <line x1="200" y1="200" x2="200" y2="250" stroke="#ccc" stroke-width="2"/>
    <line x1="180" y1="200" x2="220" y2="200" stroke="#ccc" stroke-width="2"/> <!-- Bar -->
    
    <!-- Mics -->
    <circle cx="180" cy="200" r="5" fill="#3b82f6"/>
    <circle cx="220" cy="200" r="5" fill="#3b82f6"/>
    
    <!-- Pickup Angles -->
    <path d="M 180 200 L 100 100" stroke="#3b82f6" stroke-width="1" stroke-dasharray="2" opacity="0.5"/>
    <path d="M 220 200 L 300 100" stroke="#3b82f6" stroke-width="1" stroke-dasharray="2" opacity="0.5"/>
    
    <text x="200" y="280" text-anchor="middle" fill="#aaa" font-size="14">Main Stereo Pair captures the blend</text>
</svg>"""
    with open(os.path.join(output_dir, 'stereo_separation_quartet.svg'), 'w') as f:
        f.write(svg_content)
    print("Created stereo_separation_quartet.svg")

def create_snare_rim_center(output_dir):
     # Concept: Top down loose zones
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="30" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Snare Tone Zones</text>
    <circle cx="200" cy="150" r="100" fill="#ddd" stroke="#999" stroke-width="5"/>
    
    <circle cx="200" cy="150" r="30" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4"/>
    <text x="200" y="155" text-anchor="middle" fill="#ef4444" font-weight="bold">BODY / THUD</text>
    
    <path d="M 200 60 L 200 40" stroke="#3b82f6" stroke-width="2"/>
    <text x="200" y="100" text-anchor="middle" fill="#3b82f6" font-weight="bold">RING / OVERTONE</text>
    
    <text x="200" y="280" text-anchor="middle" fill="#aaa" font-size="14">Center = Drier/Fatter. Edge = More Ring.</text>
</svg>"""
    with open(os.path.join(output_dir, 'snare_rim_vs_center.svg'), 'w') as f:
        f.write(svg_content)
    print("Created snare_rim_vs_center.svg")

def create_amp_off_axis(output_dir):
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Off-Axis Micing</text>
    
    <rect x="150" y="100" width="100" height="150" fill="#333" stroke="#666"/> <!-- Amp Front -->
    <circle cx="200" cy="175" r="40" fill="#222" stroke="#444"/> <!-- Speaker -->
    
    <!-- Mic Angled -->
    <g transform="translate(200, 250) rotate(-45)">
        <rect x="0" y="0" width="10" height="40" fill="#ccc"/>
        <line x1="5" y1="0" x2="5" y2="-50" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4"/> <!-- Axis line -->
    </g>
    
    <text x="200" y="280" text-anchor="middle" fill="#aaa" font-size="14">Angling mic reduces harsh treble ('Fizz')</text>
</svg>"""
    with open(os.path.join(output_dir, 'amp_mic_axis_angle.svg'), 'w') as f:
        f.write(svg_content)
    print("Created amp_mic_axis_angle.svg")

def create_upright_bass(output_dir):
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="150" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">Double Bass Distance</text>
    
    <!-- Bass Shape -->
    <path d="M 100 100 Q 150 50 200 100 Q 220 200 200 300 Q 150 350 100 300 Q 80 200 100 100" fill="#4a2c18" stroke="#000"/>
    <path d="M 120 150 L 120 200" stroke="#000" stroke-width="3"/> <!-- F Hole representation -->
    <path d="M 180 150 L 180 200" stroke="#000" stroke-width="3"/>
    
    <!-- Mic -->
    <circle cx="150" cy="200" r="100" fill="none" stroke="#fff" stroke-dasharray="4"/>
    <g transform="translate(150, 320)">
        <rect x="-10" y="0" width="20" height="40" fill="#ccc"/>
        <circle cx="0" cy="0" r="15" fill="#333"/>
    </g>
    
    <text x="150" y="380" text-anchor="middle" fill="#aaa" font-size="14">Give it space (1-2ft) for low wave to develop</text>
</svg>"""
    with open(os.path.join(output_dir, 'upright_bass_micing.svg'), 'w') as f:
        f.write(svg_content)
    print("Created upright_bass_micing.svg")
    
def create_soundhole_myth(output_dir):
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">The Soundhole Trap</text>
    
    <circle cx="200" cy="150" r="60" fill="#111" stroke="#5c3a21" stroke-width="5"/>
    
    <!-- Boomy Waves -->
    <circle cx="200" cy="150" r="50" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.8"/>
    <circle cx="200" cy="150" r="40" stroke="#ef4444" stroke-width="3" fill="none" opacity="0.6"/>
    <circle cx="200" cy="150" r="30" stroke="#ef4444" stroke-width="4" fill="none" opacity="0.4"/>
    
    <text x="200" y="155" text-anchor="middle" fill="#fff" font-weight="bold">BOOMY</text>
    <text x="200" y="175" text-anchor="middle" fill="#ccc" font-size="12">Resonance Buildup</text>
    
    <line x1="140" y1="90" x2="260" y2="210" stroke="#ef4444" stroke-width="5"/>
    <line x1="260" y1="90" x2="140" y2="210" stroke="#ef4444" stroke-width="5"/>
    
    <text x="200" y="270" text-anchor="middle" fill="#aaa" font-size="14">Avoid pointing directly here!</text>
</svg>"""
    with open(os.path.join(output_dir, 'acoustic_soundhole_boom.svg'), 'w') as f:
        f.write(svg_content)
    print("Created acoustic_soundhole_boom.svg")

def main():
    output_dir = check_dir()
    create_snare_mic_position(output_dir)
    create_kick_cutaway(output_dir)
    create_overhead_xy(output_dir)
    create_snare_phase_flip(output_dir)
    create_hihat_bleed(output_dir)
    create_tom_clip(output_dir)
    create_acoustic_12th_fret(output_dir)
    create_amp_cone_zones(output_dir)
    create_ribbon_mic(output_dir)
    create_stereo_quartet(output_dir)
    create_snare_rim_center(output_dir)
    create_amp_off_axis(output_dir)
    create_upright_bass(output_dir)
    create_soundhole_myth(output_dir)
    print(f"All SVGs generated in {output_dir}")

if __name__ == "__main__":
    main()
