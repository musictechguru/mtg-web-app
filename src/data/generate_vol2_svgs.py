
import os
import math

OUTPUT_DIR = "public/images/vol2"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_svg(filename, content, width=800, height=600):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">'
    svg += f'<rect width="100%" height="100%" fill="#1a1a1a"/>' # Dark background
    svg += content
    svg += '</svg>'
    
    with open(os.path.join(OUTPUT_DIR, filename), 'w') as f:
        f.write(svg)
    print(f"Created {filename}")

def polar_pattern_svg(pattern_type):
    # Center 400, 300
    cx, cy = 400, 300
    radius = 200
    
    path_d = ""
    
    # Generic Polar Grid
    grid = f'<circle cx="{cx}" cy="{cy}" r="{radius}" fill="none" stroke="#333" stroke-width="2"/>'
    grid += f'<circle cx="{cx}" cy="{cy}" r="{radius*0.75}" fill="none" stroke="#333" stroke-width="1"/>'
    grid += f'<circle cx="{cx}" cy="{cy}" r="{radius*0.5}" fill="none" stroke="#333" stroke-width="1"/>'
    grid += f'<line x1="{cx-radius}" y1="{cy}" x2="{cx+radius}" y2="{cy}" stroke="#333" stroke-width="1"/>'
    grid += f'<line x1="{cx}" y1="{cy-radius}" x2="{cx}" y2="{cy+radius}" stroke="#333" stroke-width="1"/>'
    
    points = []
    
    for angle in range(0, 361):
        rad = math.radians(angle)
        # Polar equation: r = A + B*cos(theta)
        # Cardioid: 0.5 + 0.5*cos(theta)
        # Omni: 1
        # Figure 8: cos(theta)
        
        r_val = 0
        if pattern_type == "cardioid":
            r_val = 0.5 + 0.5 * math.cos(rad)
        elif pattern_type == "omni":
            r_val = 1.0
        elif pattern_type == "figure_8":
            r_val = abs(math.cos(rad))
        elif pattern_type == "supercardioid":
            r_val = 0.37 + 0.63 * math.cos(rad)
            r_val = abs(r_val) # back lobe
        elif pattern_type == "hypercardioid":
            r_val = 0.25 + 0.75 * math.cos(rad)
            r_val = abs(r_val)
            
        dist = r_val * radius
        # SVG coords: y is down, so we subtract for up (0 deg is usually up)
        # But math 0 is right. Let's rotate -90 deg to make 0 up
        
        # Standard Polar Plot usually 0 is UP.
        # x = cx + r * sin(angle)
        # y = cy - r * cos(angle)
        
        px = cx + dist * math.sin(rad)
        py = cy - dist * math.cos(rad)
        
        if angle == 0:
            path_d += f"M {px},{py} "
        else:
            path_d += f"L {px},{py} "
            
    path_d += "Z"
    
    shape = f'<path d="{path_d}" fill="rgba(66, 133, 244, 0.4)" stroke="#4285f4" stroke-width="4"/>'
    
    title = f'<text x="50%" y="50" text-anchor="middle" fill="white" font-family="Arial" font-size="24">{pattern_type.title().replace("_", " ")} Pattern</text>'
    
    return grid + shape + title

def signal_flow_svg():
    # Mic -> Preamp -> Interface -> DAW
    
    return '''
    <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#fff" />
    </marker>
    </defs>
    
    <!-- Mic -->
    <rect x="50" y="250" width="100" height="100" rx="10" fill="#db4437" />
    <text x="100" y="305" text-anchor="middle" fill="white" font-family="Arial">Mic</text>
    
    <!-- Cable -->
    <line x1="150" y1="300" x2="250" y2="300" stroke="white" stroke-width="4" marker-end="url(#arrow)"/>
    
    <!-- Preamp -->
    <rect x="250" y="250" width="150" height="100" rx="10" fill="#f4b400" />
    <text x="325" y="305" text-anchor="middle" fill="black" font-family="Arial">Preamp</text>
    
    <!-- Cable -->
    <line x1="400" y1="300" x2="500" y2="300" stroke="white" stroke-width="4" marker-end="url(#arrow)"/>

    <!-- Interface -->
    <rect x="500" y="250" width="150" height="100" rx="10" fill="#0f9d58" />
    <text x="575" y="305" text-anchor="middle" fill="white" font-family="Arial">Interface (A/D)</text>
    
    <text x="400" y="100" text-anchor="middle" fill="white" font-size="32">Basic Signal Flow</text>
    '''

def main():
    # 1. Polar Patterns
    patterns = ["cardioid", "omni", "figure_8", "supercardioid", "hypercardioid"]
    for p in patterns:
        create_svg(f"explanation_understanding_polar_patterns_{p}.svg", polar_pattern_svg(p))
    
    # Generic for "Understanding Polar Patterns" loop if needed, or mapping logic
    create_svg("explanation_understanding_polar_patterns.svg", polar_pattern_svg("cardioid")) # Default
    
    # 2. Tech topics
    create_svg("explanation_gain_&_signal_path.svg", signal_flow_svg())
    
    # 3. Placeholders for others
    topics = [
        "microphone_types", "general_micing_techniques", "instrument_micing", 
        "stereo_techniques", "technology"
    ]
    
    for t in topics:
        content = f'<text x="50%" y="50%" text-anchor="middle" fill="gray" font-size="30">Diagram for {t.replace("_", " ")}</text>'
        create_svg(f"explanation_{t}.svg", content)

if __name__ == "__main__":
    main()
