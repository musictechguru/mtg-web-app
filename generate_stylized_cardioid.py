import os
import math

def create_stylized_cardioid(output_dir):
    # Concept: A artistic, neon-style Cardioid pattern with a microphone icon in the center.
    # visually distinct from a standard scientific plot.
    
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style="background-color:#111; font-family:sans-serif;">
    <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style="stop-color:#ec4899; stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#ec4899; stop-opacity:0" />
        </radialGradient>
        <linearGradient id="micGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#9ca3af" />
            <stop offset="50%" style="stop-color:#e5e7eb" />
            <stop offset="100%" style="stop-color:#9ca3af" />
        </linearGradient>
    </defs>
    
    <!-- Title -->
    <text x="250" y="50" text-anchor="middle" fill="#ec4899" font-size="24" font-weight="bold" letter-spacing="2">CARDIOID</text>
    <text x="250" y="75" text-anchor="middle" fill="#aaa" font-size="14">Unidirectional • Heart Shape</text>

    <g transform="translate(250, 280)">
        <!-- Grid Circles (Subtle) -->
        <circle cx="0" cy="0" r="50" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="4"/>
        <circle cx="0" cy="0" r="100" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="4"/>
        <circle cx="0" cy="0" r="150" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="4"/>
        
        <!-- Axis Lines -->
        <line x1="-180" y1="0" x2="180" y2="0" stroke="#333" stroke-width="1"/>
        <line x1="0" y1="-180" x2="0" y2="180" stroke="#333" stroke-width="1"/>
        
        <!-- Cardioid Shape Calculation: r = a(1 - cos(theta)) roughly, simplified as heart/bean shape -->
        <!-- Using a path for the cardioid shape -->
        <!-- M 0 0 is center. -->
        <!-- Front is UP (negative Y in SVG usually, but let's say UP is 0 degrees) -->
        <!-- Actually, standard polar plots have 0 degrees UP. Cardioid is max at 0, null at 180. -->
        
        <!-- Glow Effect behind -->
        <path d="M 0 0 C -180 -150 -180 -20 0 100 C 180 -20 180 -150 0 0 Z" transform="translate(0, -50) scale(1.2)" fill="url(#glow)" opacity="0.4"/>

        <!-- Main Cardioid Curve (Heart-like) -->
        <!-- Starting from center (Mic), going up and around -->
        <path d="M 0 0 
                 C -80 -80, -160 -100, -130 -10 
                 S 0 130, 0 130 
                 S 130 80, 130 -10 
                 C 160 -100, 80 -80, 0 0 Z" 
              transform="translate(0, -60) rotate(180)" 
              fill="none" stroke="#ec4899" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              
        <!-- Rejection Zone Indicator -->
        <path d="M -20 120 L 0 140 L 20 120" stroke="#ef4444" stroke-width="2" fill="none" transform="translate(0, -60)"/>
        <text x="0" y="90" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">NULL POINT (Rear)</text>

        <!-- Acceptance Zone Indicator -->
        <text x="0" y="-190" text-anchor="middle" fill="#10b981" font-size="12" font-weight="bold">PICKUP ZONE (Front)</text>

        <!-- Microphone Icon in Center -->
        <g transform="translate(-15, -90)">
            <rect x="5" y="0" width="20" height="40" rx="3" fill="url(#micGrad)" stroke="#333" stroke-width="1"/>
            <rect x="3" y="-5" width="24" height="12" rx="2" fill="#333"/> <!-- Grill -->
            <line x1="15" y1="40" x2="15" y2="60" stroke="#666" stroke-width="4"/>
        </g>
    </g>
    
    <!-- Legend/Key -->
    <g transform="translate(40, 440)">
        <circle cx="10" cy="10" r="5" fill="#ec4899"/>
        <text x="25" y="14" fill="#ccc" font-size="12">Sensitivity</text>
        
        <circle cx="150" cy="10" r="5" fill="#ef4444"/>
        <text x="165" y="14" fill="#ccc" font-size="12">Rejection</text>
    </g>
</svg>"""
    
    file_path = os.path.join(output_dir, 'stylized_cardioid.svg')
    with open(file_path, 'w') as f:
        f.write(svg_content)
    print(f"Created {file_path}")

if __name__ == "__main__":
    output_directory = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/svg'
    create_stylized_cardioid(output_directory)
