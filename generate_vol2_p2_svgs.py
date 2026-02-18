import os
import math

def check_dir():
    output_dir = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    return output_dir

def create_polar_3d_sphere(output_dir):
    # Concept: A wireframe sphere to represent 3D pickup
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <defs>
        <radialGradient id="gradSphere" cx="30%" cy="30%" r="50%">
            <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:0.2" />
        </radialGradient>
    </defs>
    
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold">3D Pickup Pattern</text>
    
    <!-- Wireframe Sphere -->
    <circle cx="200" cy="200" r="100" fill="url(#gradSphere)" stroke="#3b82f6" stroke-width="1"/>
    <ellipse cx="200" cy="200" rx="100" ry="30" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.5"/>
    <ellipse cx="200" cy="200" rx="30" ry="100" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.5"/>
    <ellipse cx="200" cy="200" rx="80" ry="80" fill="none" stroke="#60a5fa" stroke-width="1" stroke-dasharray="4"/>
    
    <!-- Mic stick in middle -->
    <rect x="195" y="180" width="10" height="40" fill="#333"/>
    
    <text x="200" y="350" text-anchor="middle" fill="#aaa" font-size="14">Mics hear in 3 Dimensions</text>
</svg>"""
    with open(os.path.join(output_dir, 'polar_3d_sphere.svg'), 'w') as f:
        f.write(svg_content)
    print("Created polar_3d_sphere.svg")

def create_omni_circle_sources(output_dir):
    # Omni: Mic center, sources all around
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <!-- Pickup Zone -->
    <circle cx="200" cy="200" r="120" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="5,5"/>
    <text x="200" y="205" text-anchor="middle" fill="#fff" font-weight="bold">MIC (Omni)</text>
    
    <!-- Sources -->
    <circle cx="200" cy="80" r="10" fill="#eab308"/> <text x="200" y="60" text-anchor="middle" fill="#eab308">Source</text>
    <circle cx="320" cy="200" r="10" fill="#eab308"/> <text x="350" y="205" text-anchor="middle" fill="#eab308">Source</text>
    <circle cx="200" cy="320" r="10" fill="#eab308"/> <text x="200" y="350" text-anchor="middle" fill="#eab308">Source</text>
    <circle cx="80" cy="200" r="10" fill="#eab308"/> <text x="50" y="205" text-anchor="middle" fill="#eab308">Source</text>
    
    <!-- Arrows inward -->
    <path d="M 200 100 L 200 130" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
    <path d="M 300 200 L 270 200" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
    <path d="M 200 300 L 200 270" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
    <path d="M 100 200 L 130 200" stroke="#666" stroke-width="2" marker-end="url(#arrow)"/>
    
    <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#666" />
        </marker>
    </defs>
</svg>"""
    with open(os.path.join(output_dir, 'omni_circle_sources.svg'), 'w') as f:
        f.write(svg_content)
    print("Created omni_circle_sources.svg")

def create_cardioid_heart_overlay(output_dir):
    # Heart shape overlay
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="50" text-anchor="middle" fill="#ec4899" font-size="24" font-weight="bold">"Cardioid" means Heart-Shaped</text>
    
    <!-- Heart Path -->
    <path d="M 200 250 A 50 50 0 1 1 300 150 Q 300 300 200 350 Q 100 300 100 150 A 50 50 0 1 1 200 250" 
          fill="none" stroke="#ec4899" stroke-width="4" transform="rotate(180 200 200) translate(0 -50)"/>
          
    <!-- Standard Plot Reference (Faint) -->
    <path d="M 200 200 L 200 50 Q 350 50 350 200 Q 320 320 200 320 Q 80 320 50 200 Q 50 50 200 50" 
          fill="#333" opacity="0.5"/>
          
    <circle cx="200" cy="200" r="5" fill="#fff"/>
    <text x="200" y="220" text-anchor="middle" fill="#aaa">Mic Position</text>
</svg>"""
    with open(os.path.join(output_dir, 'cardioid_heart_overlay.svg'), 'w') as f:
        f.write(svg_content)
    print("Created cardioid_heart_overlay.svg")

def create_monitor_wedge_null(output_dir):
    # Stage setup: Mic null pointing at wedge
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20">Feedback Rejection</text>

    <!-- Mic Stand -->
    <line x1="200" y1="250" x2="200" y2="150" stroke="#888" stroke-width="4"/>
    <!-- Mic Body (angled) -->
    <line x1="200" y1="150" x2="200" y2="100" stroke="#ccc" stroke-width="8"/>
    <circle cx="200" cy="90" r="15" fill="#aaa"/>

    <!-- Null Point Arrow -->
    <line x1="200" y1="150" x2="200" y2="280" stroke="#ef4444" stroke-width="2" stroke-dasharray="4"/>
    <text x="230" y="200" fill="#ef4444" font-size="12">Null Point (Rear)</text>

    <!-- Monitor Wedge -->
    <path d="M 150 300 L 250 300 L 250 350 L 150 380 Z" fill="#333" stroke="#666" stroke-width="2"/>
    <text x="200" y="340" text-anchor="middle" fill="#aaa" font-size="12">Stage Monitor</text>
    
    <!-- Sound Waves Rejection -->
    <path d="M 200 300 L 180 260" stroke="#ef4444" stroke-width="2" opacity="0.5"/>
    <path d="M 200 300 L 220 260" stroke="#ef4444" stroke-width="2" opacity="0.5"/>
    <circle cx="200" cy="240" r="10" stroke="#ef4444" stroke-width="2" fill="none"/>
    <line x1="192" y1="232" x2="208" y2="248" stroke="#ef4444" stroke-width="2"/>
    
</svg>"""
    with open(os.path.join(output_dir, 'monitor_wedge_null.svg'), 'w') as f:
        f.write(svg_content)
    print("Created monitor_wedge_null.svg")

def create_omni_leakage_arrows(output_dir):
    # Omni mic with arrows from all sides
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <text x="200" y="40" text-anchor="middle" fill="#fff" font-size="20">Omni Leakage</text>
    
    <!-- Mic -->
    <circle cx="200" cy="200" r="15" fill="#ddd"/>
    
    <!-- Unwanted Sounds -->
    <text x="50" y="50" fill="#666">Air Con</text>
    <path d="M 60 60 L 170 170" stroke="#666" stroke-width="2" stroke-dasharray="4"/>
    
    <text x="350" y="50" text-anchor="end" fill="#666">Drums Next Door</text>
    <path d="M 340 60 L 230 170" stroke="#666" stroke-width="2" stroke-dasharray="4"/>
    
    <text x="50" y="350" fill="#666">Computer Fan</text>
    <path d="M 60 340 L 170 230" stroke="#666" stroke-width="2" stroke-dasharray="4"/>
    
    <text x="200" y="250" text-anchor="middle" fill="#facc15" font-weight="bold">"Hears Everything"</text>
</svg>"""
    with open(os.path.join(output_dir, 'omni_leakage_arrows.svg'), 'w') as f:
        f.write(svg_content)
    print("Created omni_leakage_arrows.svg")

def create_ribbon_element_side_view(output_dir):
    # Side view of a ribbon showing front/back pickup
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <text x="150" y="40" text-anchor="middle" fill="#fff" font-size="20">Ribbon / Figure-8 Physics</text>

    <!-- The Ribbon Element -->
    <rect x="145" y="100" width="10" height="200" fill="#ec4899"/>
    
    <!-- Pickup Zones -->
    <path d="M 140 200 C 50 150 50 250 140 200" fill="#ec4899" opacity="0.3"/>
    <path d="M 160 200 C 250 150 250 250 160 200" fill="#ec4899" opacity="0.3"/>
    
    <text x="50" y="200" text-anchor="middle" fill="#fff">Front</text>
    <text x="250" y="200" text-anchor="middle" fill="#fff">Back</text>
    
    <!-- Nulls -->
    <line x1="150" y1="50" x2="150" y2="350" stroke="#666" stroke-width="2" stroke-dasharray="4"/>
    <text x="150" y="370" text-anchor="middle" fill="#aaa">Null (Side)</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'ribbon_element_side_view.svg'), 'w') as f:
        f.write(svg_content)
    print("Created ribbon_element_side_view.svg")

def create_shotgun_telescope_analogy(output_dir):
    # Shotgun mic as a telescope
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <!-- Mic Body -->
    <rect x="50" y="80" width="200" height="40" rx="5" fill="#333" stroke="#666" stroke-width="2"/>
    <!-- Interference Slots -->
    <line x1="70" y1="80" x2="70" y2="120" stroke="#111" stroke-width="2"/>
    <line x1="90" y1="80" x2="90" y2="120" stroke="#111" stroke-width="2"/>
    <line x1="110" y1="80" x2="110" y2="120" stroke="#111" stroke-width="2"/>
    <line x1="130" y1="80" x2="130" y2="120" stroke="#111" stroke-width="2"/>

    <!-- Beam -->
    <path d="M 250 100 L 450 60 L 450 140 Z" fill="#eab308" opacity="0.2"/>
    <line x1="250" y1="100" x2="450" y2="100" stroke="#eab308" stroke-width="2" stroke-dasharray="4"/>
    
    <text x="150" y="110" text-anchor="middle" fill="#fff" font-weight="bold">Shotgun Mic</text>
    <text x="350" y="105" text-anchor="middle" fill="#eab308" font-size="14">Focused "Reach"</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'shotgun_telescope_analogy.svg'), 'w') as f:
        f.write(svg_content)
    print("Created shotgun_telescope_analogy.svg")

def create_shield_rejection_concept(output_dir):
    # Shield iconography for noise rejection
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="150" y="40" text-anchor="middle" fill="#fff" font-size="20">Unwanted Noise</text>
    
    <!-- Noise Waves -->
    <path d="M 50 100 Q 100 150 50 200" fill="none" stroke="#ef4444" stroke-width="4"/>
    <path d="M 40 90 Q 90 150 40 210" fill="none" stroke="#ef4444" stroke-width="4"/>
    
    <!-- Shield -->
    <path d="M 150 80 Q 250 80 250 150 Q 250 250 150 280 Q 50 250 50 150 Q 50 80 150 80" 
          fill="#3b82f6" opacity="0.8" stroke="#fff" stroke-width="2"/>
    <text x="150" y="180" text-anchor="middle" fill="#fff" font-weight="bold">REJECTION</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'shield_rejection_concept.svg'), 'w') as f:
        f.write(svg_content)
    print("Created shield_rejection_concept.svg")

def create_cardioid_off_axis_color(output_dir):
    # Highlighting the dull zone
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="150" y="40" text-anchor="middle" fill="#fff" font-size="20">Off-Axis Coloration</text>
    
    <circle cx="150" cy="150" r="100" stroke="#444" stroke-width="1" fill="none"/>
    
    <!-- Mic -->
    <rect x="145" y="140" width="10" height="20" fill="#fff"/>
    
    <!-- On Axis -->
    <path d="M 150 150 L 150 50" stroke="#22c55e" stroke-width="4"/>
    <text x="150" y="70" text-anchor="middle" fill="#22c55e" font-size="12">Bright (0dB)</text>
    
    <!-- Off Axis -->
    <path d="M 150 150 L 250 150" stroke="#eab308" stroke-width="4"/>
    <text x="230" y="140" text-anchor="middle" fill="#eab308" font-size="12">Dull (-6dB)</text>
    
    <text x="150" y="280" text-anchor="middle" fill="#aaa" font-size="12">90 Degrees = Half Volume / Less Treble</text>
</svg>"""
    with open(os.path.join(output_dir, 'cardioid_off_axis_color.svg'), 'w') as f:
        f.write(svg_content)
    print("Created cardioid_off_axis_color.svg")

def create_ruler_distance_12inch(output_dir):
    # Ruler showing 1-12 inches
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="250" y="40" text-anchor="middle" fill="#fff" font-size="20">Close Micing Range</text>
    
    <!-- Ruler -->
    <rect x="50" y="80" width="400" height="40" fill="#facc15" stroke="#000" stroke-width="2"/>
    
    <!-- Markings -->
    <line x1="50" y1="80" x2="50" y2="120" stroke="#000"/> <text x="55" y="110" font-size="12">0"</text>
    <line x1="450" y1="80" x2="450" y2="120" stroke="#000"/> <text x="420" y="110" font-size="12">12"</text>
    
    <!-- Zone -->
    <rect x="50" y="60" width="400" height="10" fill="#22c55e" opacity="0.5"/>
    <text x="250" y="70" text-anchor="middle" fill="#22c55e" font-size="10">Target Zone</text>
</svg>"""
    with open(os.path.join(output_dir, 'ruler_distance_12inch.svg'), 'w') as f:
        f.write(svg_content)
    print("Created ruler_distance_12inch.svg")

def create_source_isolation_visual(output_dir):
    # A vs B isolation
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <!-- Source A -->
    <circle cx="100" cy="150" r="30" fill="#ef4444"/>
    <text x="100" y="110" text-anchor="middle" fill="#ef4444">Amp (LOUD)</text>
    
    <!-- Source B -->
    <circle cx="400" cy="150" r="30" fill="#3b82f6"/>
    <text x="400" y="110" text-anchor="middle" fill="#3b82f6">Vocal (Quiet)</text>
    
    <!-- Mic on B -->
    <rect x="380" y="130" width="10" height="40" fill="#fff"/>
    <path d="M 370 150 L 350 150" stroke="#fff" stroke-width="2"/> 
    <text x="360" y="180" text-anchor="middle" fill="#fff" font-size="10">Mic</text>

    <!-- Isolation Barrier -->
    <line x1="250" y1="50" x2="250" y2="250" stroke="#aaa" stroke-width="4" stroke-dasharray="8"/>
    <text x="250" y="270" text-anchor="middle" fill="#aaa">Distance / Isolation</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'source_isolation_visual.svg'), 'w') as f:
        f.write(svg_content)
    print("Created source_isolation_visual.svg")

def create_rule_3_to_1_interactive(output_dir):
    # Interactive D vs 3D diagram
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="300" y="40" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">The 3:1 Rule</text>
    
    <!-- Source 1 -->
    <circle cx="100" cy="200" r="10" fill="#fff"/>
    <!-- Mic 1 -->
    <rect x="100" y="140" width="10" height="20" fill="#22c55e"/>
    <!-- Dist D -->
    <line x1="100" y1="200" x2="100" y2="160" stroke="#22c55e" stroke-width="2"/>
    <text x="80" y="180" fill="#22c55e">D (1ft)</text>
    
    <!-- Source 2 -->
    <circle cx="400" cy="200" r="10" fill="#fff"/>
    <!-- Mic 2 -->
    <rect x="400" y="140" width="10" height="20" fill="#22c55e"/>
    
    <!-- Dist 3D -->
    <line x1="110" y1="150" x2="390" y2="150" stroke="#ef4444" stroke-width="2" stroke-dasharray="4"/>
    <text x="250" y="140" text-anchor="middle" fill="#ef4444">3D (Min 3ft)</text>
    
    <!-- Phase text -->
    <text x="300" y="250" text-anchor="middle" fill="#aaa">Prevents Phase Cancellation</text>
</svg>"""
    with open(os.path.join(output_dir, 'rule_3_to_1_interactive.svg'), 'w') as f:
        f.write(svg_content)
    print("Created rule_3_to_1_interactive.svg")

def create_drum_overhead_spacing(output_dir):
    # Top down view of drum kit with mics
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="30" text-anchor="middle" fill="#fff" font-size="20">Overhead Spacing</text>
    
    <!-- Drum Kit -->
    <circle cx="200" cy="200" r="40" fill="none" stroke="#ddd" stroke-width="2"/> <!-- Snare -->
    <circle cx="150" cy="150" r="30" fill="none" stroke="#ddd" stroke-width="2"/> <!-- Tom 1 -->
    <circle cx="250" cy="150" r="30" fill="none" stroke="#ddd" stroke-width="2"/> <!-- Tom 2 -->
    <circle cx="200" cy="280" r="50" fill="none" stroke="#ddd" stroke-width="2"/> <!-- Kick -->

    <!-- Mics -->
    <circle cx="100" cy="100" r="5" fill="#facc15"/> <!-- OH Left -->
    <circle cx="300" cy="100" r="5" fill="#facc15"/> <!-- OH Right -->
    
    <!-- Equidistant Lines -->
    <line x1="100" y1="100" x2="200" y2="200" stroke="#facc15" stroke-width="2" stroke-dasharray="4"/>
    <line x1="300" y1="100" x2="200" y2="200" stroke="#facc15" stroke-width="2" stroke-dasharray="4"/>
    
    <text x="200" y="350" text-anchor="middle" fill="#aaa">Same distance from Snare = In Phase</text>
</svg>"""
    with open(os.path.join(output_dir, 'drum_overhead_spacing.svg'), 'w') as f:
        f.write(svg_content)
    print("Created drum_overhead_spacing.svg")

def create_bass_boost_curve(output_dir):
    # Frequency response curve tilting up
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="30" text-anchor="middle" fill="#fff" font-size="20">Proximity Effect</text>
    
    <!-- Grid -->
    <line x1="50" y1="150" x2="350" y2="150" stroke="#666" stroke-width="2"/>
    <line x1="50" y1="50" x2="50" y2="150" stroke="#666" stroke-width="2"/>
    
    <!-- Normal Curve -->
    <path d="M 50 120 L 350 120" stroke="#444" stroke-width="2" stroke-dasharray="4"/>
    <text x="360" y="125" fill="#444" font-size="10">Distance</text>
    
    <!-- Boosted Curve -->
    <path d="M 50 50 Q 150 120 350 120" fill="none" stroke="#ec4899" stroke-width="4"/>
    <text x="60" y="60" fill="#ec4899" font-weight="bold">+12dB BASS</text>
    
    <text x="200" y="180" text-anchor="middle" fill="#aaa">Low Frequencies Boosted when Close</text>
</svg>"""
    with open(os.path.join(output_dir, 'bass_boost_curve.svg'), 'w') as f:
        f.write(svg_content)
    print("Created bass_boost_curve.svg")

def create_room_reflections_blend(output_dir):
    # Direct vs Reflected sound paths
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="30" text-anchor="middle" fill="#fff" font-size="20">Natural Room Reverb</text>
    
    <!-- Room Outline -->
    <rect x="50" y="50" width="300" height="200" fill="none" stroke="#444" stroke-width="2"/>
    
    <!-- Source -->
    <circle cx="100" cy="150" r="10" fill="#eab308"/>
    
    <!-- Mic (Distant) -->
    <rect x="300" y="140" width="10" height="20" fill="#fff"/>
    
    <!-- Direct Path -->
    <line x1="110" y1="150" x2="300" y2="150" stroke="#fff" stroke-width="3"/>
    <text x="200" y="140" text-anchor="middle" fill="#fff" font-size="10">Direct</text>
    
    <!-- Reflections -->
    <path d="M 110 150 L 200 50 L 300 150" fill="none" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    <path d="M 110 150 L 200 250 L 300 150" fill="none" stroke="#666" stroke-width="1" stroke-dasharray="4"/>
    
    <text x="200" y="280" text-anchor="middle" fill="#aaa">Distance = More Reflections blend</text>
</svg>"""
    with open(os.path.join(output_dir, 'room_reflections_blend.svg'), 'w') as f:
        f.write(svg_content)
    print("Created room_reflections_blend.svg")

def create_phase_summation_wave(output_dir):
    # Two waves summing or cancelling
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="30" text-anchor="middle" fill="#fff" font-size="20">Phase Summation</text>
    
    <!-- Wave A -->
    <path d="M 50 100 Q 100 50 150 100 T 250 100 T 350 100" fill="none" stroke="#3b82f6" stroke-width="4" opacity="0.5"/>
    
    <!-- Wave B (Aligned) -->
    <path d="M 50 100 Q 100 50 150 100 T 250 100 T 350 100" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="2"/>
    
    <!-- Result -->
    <text x="200" y="150" text-anchor="middle" fill="#fff">Aligned = Louder & Fuller</text>
    
    <!-- Cancellation Hint -->
    <path d="M 350 180 L 370 180" stroke="#666" stroke-width="2"/>
    <text x="320" y="185" fill="#666" font-size="10">Opposite = Silence</text>
</svg>"""
    with open(os.path.join(output_dir, 'phase_summation_wave.svg'), 'w') as f:
        f.write(svg_content)
    print("Created phase_summation_wave.svg")

def create_polarity_switch_icon(output_dir):
    # Button with Φ symbol
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="background-color:#1e1e1e; font-family:sans-serif;">
    
    <!-- Button Body -->
    <circle cx="100" cy="100" r="80" fill="#333" stroke="#555" stroke-width="4"/>
    
    <!-- Symbol Phi -->
    <circle cx="100" cy="100" r="40" fill="none" stroke="#fff" stroke-width="8"/>
    <line x1="100" y1="40" x2="100" y2="160" stroke="#fff" stroke-width="8"/>
    
    <text x="100" y="190" text-anchor="middle" fill="#aaa" font-size="14">Polarity / Phase Invert</text>
</svg>"""
    with open(os.path.join(output_dir, 'polarity_switch_icon.svg'), 'w') as f:
        f.write(svg_content)
    print("Created polarity_switch_icon.svg")

def create_stage_vocal_rejection(output_dir):
    # Stage setup diagram
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" style="background-color:#1e1e1e; font-family:sans-serif;">
    <text x="200" y="30" text-anchor="middle" fill="#fff" font-size="20">Stage Isolation</text>

    <!-- Drum Kit (Rear) -->
    <circle cx="300" cy="100" r="30" fill="#444"/>
    <text x="300" y="105" text-anchor="middle" fill="#aaa">Drums</text>

    <!-- Singer -->
    <circle cx="100" cy="200" r="20" fill="#eab308"/>
    <text x="100" y="170" text-anchor="middle" fill="#eab308">Singer</text>

    <!-- Mic pointing away from drums -->
    <line x1="120" y1="190" x2="150" y2="150" stroke="#fff" stroke-width="3"/>
    <polygon points="120,190 110,210 130,210" fill="#fff"/>

    <!-- Rejection Zone (Rear of Mic) -->
    <path d="M 150 150 L 300 100" stroke="#ef4444" stroke-width="2" stroke-dasharray="4"/>
    <text x="220" y="130" text-anchor="middle" fill="#ef4444" font-size="12">REJECTED</text>
    
</svg>"""
    with open(os.path.join(output_dir, 'stage_vocal_rejection.svg'), 'w') as f:
        f.write(svg_content)
    print("Created stage_vocal_rejection.svg")


def main():
    output_dir = check_dir()
    create_polar_3d_sphere(output_dir)
    create_omni_circle_sources(output_dir)
    create_cardioid_heart_overlay(output_dir)
    create_monitor_wedge_null(output_dir)
    create_omni_leakage_arrows(output_dir)
    create_ribbon_element_side_view(output_dir)
    create_shotgun_telescope_analogy(output_dir)
    create_shield_rejection_concept(output_dir)
    create_cardioid_off_axis_color(output_dir)
    create_ruler_distance_12inch(output_dir)
    create_source_isolation_visual(output_dir)
    create_rule_3_to_1_interactive(output_dir)
    create_drum_overhead_spacing(output_dir)
    create_bass_boost_curve(output_dir)
    create_room_reflections_blend(output_dir)
    create_phase_summation_wave(output_dir)
    create_polarity_switch_icon(output_dir)
    create_stage_vocal_rejection(output_dir)
    print(f"All SVGs generated in {output_dir}")

if __name__ == "__main__":
    main()
