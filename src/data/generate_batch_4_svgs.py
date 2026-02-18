import os
import math
import random

# --- SVG Class ---
class SVG:
    def __init__(self, width=800, height=600):
        self.width = width
        self.height = height
        self.elements = []
        self.defs = []

    def add_rect(self, x, y, w, h, fill="none", stroke="none", stroke_width=0, rx=0, opacity=1.0, stroke_dasharray=""):
        attr = f'stroke-dasharray="{stroke_dasharray}"' if stroke_dasharray else ""
        self.elements.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" {attr} />')

    def add_circle(self, cx, cy, r, fill="none", stroke="none", stroke_width=0, opacity=1.0):
        self.elements.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" />')

    def add_line(self, x1, y1, x2, y2, stroke="black", stroke_width=1, opacity=1.0, stroke_dasharray=""):
        attr = f'stroke-dasharray="{stroke_dasharray}"' if stroke_dasharray else ""
        self.elements.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" {attr} />')

    def add_path(self, d, fill="none", stroke="none", stroke_width=0, opacity=1.0, stroke_dasharray=""):
        attr = f'stroke-dasharray="{stroke_dasharray}"' if stroke_dasharray else ""
        self.elements.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" {attr} />')

    def add_text(self, x, y, text, font_size=20, fill="black", text_anchor="start", font_weight="normal", transform="", font_family="Arial, sans-serif", font_style="normal"):
        t_attr = f'transform="{transform}"' if transform else ""
        self.elements.append(f'<text x="{x}" y="{y}" font-family="{font_family}" font-size="{font_size}" fill="{fill}" text-anchor="{text_anchor}" font-weight="{font_weight}" font-style="{font_style}" {t_attr}>{text}</text>')

    def save(self, path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        content = [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.width} {self.height}">',
            f'<rect x="0" y="0" width="{self.width}" height="{self.height}" fill="#f8f9fa" />',
            "".join(self.defs),
            "".join(self.elements),
            '</svg>'
        ]
        with open(path, 'w') as f:
            f.write("".join(content))
        print(f"Generated: {path}")

# --- Generators Batch 4 (Cables & Analog) ---

def gen_cable_capacitance(path):
    svg = SVG()
    # Coaxial Cable Cross-section
    cx, cy = 200, 300
    svg.add_circle(cx, cy, 100, fill="#333", stroke="none") # Jacket
    svg.add_circle(cx, cy, 80, fill="#daa520", stroke="none") # Shield
    svg.add_circle(cx, cy, 75, fill="white", stroke="none") # Dielectric
    svg.add_circle(cx, cy, 20, fill="#b87333", stroke="none") # Conductor
    
    # Capacitor Symbol
    svg.add_line(400, 250, 400, 350, stroke="black", stroke_width=4)
    svg.add_line(440, 250, 440, 350, stroke="black", stroke_width=4)
    svg.add_line(350, 300, 400, 300, stroke="black", stroke_width=2)
    svg.add_line(440, 300, 490, 300, stroke="black", stroke_width=2)
    
    # Low Pass Filter Graph (Result)
    ox, oy = 550, 400
    svg.add_line(ox, oy, ox+200, oy, stroke="#333")
    svg.add_path(f"M {ox} {oy-100} Q {ox+100} {oy-100} {ox+200} {oy}", stroke="red", stroke_width=4, fill="none")
    svg.add_text(ox+50, oy-120, "HF Roll-off", fill="red")
    
    svg.add_text(400, 50, "Cable Capacitance = Tone Loss", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_drum_room_mics(path):
    svg = SVG()
    
    # Drum Kit (Top Down)
    cx, cy = 400, 300
    svg.add_circle(cx, cy, 40, fill="#ccc", stroke="#333") # Snare
    svg.add_circle(cx-60, cy-40, 30, fill="#ccc", stroke="#333") # Tom
    svg.add_circle(cx+60, cy-40, 30, fill="#ccc", stroke="#333") # Tom
    svg.add_rect(cx-30, cy+50, 60, 40, fill="#ccc", stroke="#333") # Kick
    
    # Room Mics
    svg.add_circle(200, 150, 15, fill="red"); svg.add_text(200, 130, "Room L", fill="red", text_anchor="middle")
    svg.add_circle(600, 150, 15, fill="red"); svg.add_text(600, 130, "Room R", fill="red", text_anchor="middle")
    
    # Distance lines
    svg.add_line(cx, cy, 200, 150, stroke="red", stroke_dasharray="5,5")
    svg.add_line(cx, cy, 600, 150, stroke="red", stroke_dasharray="5,5")
    svg.add_text(300, 200, "~3-4m", fill="red")
    
    svg.add_text(400, 50, "Drum Room Mic Placement (Stereo)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_double_tracking(path):
    svg = SVG()
    # Left
    svg.add_rect(100, 200, 200, 60, fill="blue", stroke="black")
    svg.add_text(200, 235, "Guitar Take 1", text_anchor="middle", fill="white")
    svg.add_line(200, 260, 200, 350, stroke="black")
    svg.add_text(200, 370, "Pan LEFT", font_weight="bold", text_anchor="middle")
    
    # Right
    svg.add_rect(500, 200, 200, 60, fill="green", stroke="black")
    svg.add_text(600, 235, "Guitar Take 2", text_anchor="middle", fill="white")
    svg.add_line(600, 260, 600, 350, stroke="black")
    svg.add_text(600, 370, "Pan RIGHT", font_weight="bold", text_anchor="middle")
    
    svg.add_text(400, 150, "Distinct Performances", text_anchor="middle", font_style="italic")
    svg.add_text(400, 50, "Double Tracking Panning", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_tube_bias(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333")
    svg.add_line(ox, oy, ox, oy-h, stroke="#333")
    
    # Transfer curve (S-shape)
    points = []
    for i in range(400):
        val = 150 * math.tanh((i-200)*0.01) + 200
        points.append(f"{ox+i},{oy-val}")
    svg.add_path("M " + " L ".join(points), stroke="#333", stroke_width=2, fill="none")
    
    # Bias Point (Center of Linear Region)
    svg.add_circle(ox+200, oy-200, 5, fill="green")
    svg.add_text(ox+220, oy-200, "Optimal Bias (Class A)", fill="green")
    
    # Cold Bias (Crossover Distortion risk)
    svg.add_circle(ox+100, oy-50, 5, fill="blue")
    svg.add_text(ox+120, oy-50, "Cold (Cutoff)", fill="blue")
    
    # Hot Bias (Saturation risk)
    svg.add_circle(ox+300, oy-350, 5, fill="red")
    svg.add_text(ox+320, oy-350, "Hot (Saturation)", fill="red")
    
    svg.add_text(400, 50, "Tube Bias Points", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_balanced_cable(path):
    svg = SVG()
    
    # 3 Conductors
    y = 300
    # Hot
    svg.add_line(100, y-50, 700, y-50, stroke="red", stroke_width=4); svg.add_text(50, y-45, "Hot (+)")
    # Cold
    svg.add_line(100, y, 700, y, stroke="blue", stroke_width=4); svg.add_text(50, y+5, "Cold (-)")
    # Ground
    svg.add_line(100, y+50, 700, y+50, stroke="#333", stroke_width=8, stroke_dasharray="10,5"); svg.add_text(50, y+55, "Gnd")
    
    # Noise entering
    for i in range(10):
        x = 200 + i*40
        svg.add_line(x, 100, x, y-50, stroke="orange", stroke_dasharray="2,2") # Hits hot
        svg.add_line(x, 100, x, y, stroke="orange", stroke_dasharray="2,2") # Hits cold
    svg.add_text(400, 100, "Noise (Common Mode)", fill="orange", text_anchor="middle")
    
    # Cancellation at end
    svg.add_text(750, y, "Noise Cancels\nat Diff Amp", font_weight="bold", text_anchor="middle")
    
    svg.add_text(400, 50, "Balanced Circuit (CMRR)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_impedance(path):
    svg = SVG()
    # Water pipe analogy
    # High Z = Narrow Pipe
    svg.add_rect(100, 200, 200, 20, fill="#ccc", stroke="black"); svg.add_text(200, 180, "High Z (Guitar)", text_anchor="middle")
    # Low Z = Wide Pipe
    svg.add_rect(500, 180, 200, 60, fill="#ccc", stroke="black"); svg.add_text(600, 160, "Low Z (Mic)", text_anchor="middle")
    
    # DI Box in middle
    svg.add_rect(350, 150, 100, 150, fill="#333", stroke="#999")
    svg.add_text(400, 225, "DI BOX", fill="white", text_anchor="middle")
    
    # Arrows
    svg.add_line(300, 210, 350, 210, stroke="black", stroke_width=2)
    svg.add_line(450, 210, 500, 210, stroke="black", stroke_width=2)
    
    svg.add_text(400, 50, "Impedance Matching", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_transformer(path):
    svg = SVG()
    
    # Core
    svg.add_rect(380, 200, 40, 200, fill="#333")
    
    # Primary Coil
    for i in range(10):
        y = 210 + i*18
        svg.add_path(f"M 300 {y} Q 340 {y-10} 380 {y}", stroke="red", stroke_width=3, fill="none")
    svg.add_text(250, 300, "Primary (In)", fill="red", text_anchor="middle")
    
    # Secondary Coil
    for i in range(10):
        y = 210 + i*18
        svg.add_path(f"M 420 {y} Q 460 {y-10} 500 {y}", stroke="blue", stroke_width=3, fill="none")
    svg.add_text(550, 300, "Secondary (Out)", fill="blue", text_anchor="middle")
    
    svg.add_text(400, 500, "Magnetic Induction (Isolation)", text_anchor="middle", font_style="italic")
    svg.add_text(400, 50, "Transformer", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)
    
def gen_ground_loop(path):
    svg = SVG()
    
    # Gear 1
    svg.add_rect(100, 200, 200, 100, fill="#ddd", stroke="black"); svg.add_text(200, 250, "Amp", text_anchor="middle")
    # Gear 2
    svg.add_rect(500, 200, 200, 100, fill="#ddd", stroke="black"); svg.add_text(600, 250, "Effects", text_anchor="middle")
    
    # Audio Cable
    svg.add_line(300, 230, 500, 230, stroke="black", stroke_width=4); svg.add_text(400, 220, "Shield", font_size=12, text_anchor="middle")
    
    # Power Mains
    svg.add_line(200, 300, 200, 400, stroke="black", stroke_width=4)
    svg.add_line(600, 300, 600, 400, stroke="black", stroke_width=4)
    svg.add_line(200, 400, 600, 400, stroke="black", stroke_width=4); svg.add_text(400, 420, "Earth Ground", text_anchor="middle")
    
    # Loop Arrow
    svg.add_path("M 400 350 A 50 50 0 1 1 401 350", stroke="red", stroke_width=2, fill="none", stroke_dasharray="5,5")
    svg.add_text(400, 350, "LOOP!", fill="red", text_anchor="middle", font_weight="bold")
    
    svg.add_text(400, 50, "Ground Loop Hum (50/60Hz)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_patchbay(path):
    svg = SVG()
    # Front
    svg.add_rect(100, 200, 600, 100, fill="#333", stroke="#999")
    for i in range(8):
        x = 150 + i*70
        svg.add_circle(x, 230, 20, fill="#111", stroke="#555") # Top Row (Out)
        svg.add_circle(x, 270, 20, fill="#111", stroke="#555") # Bottom Row (In)
        
    # Normalled path
    svg.add_path("M 750 230 Q 800 250 750 270", stroke="green", stroke_width=4, fill="none")
    svg.add_text(820, 250, "Normalled", fill="green")
    
    svg.add_text(400, 50, "Patchbay Normalisation", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def main():
    base = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    gen_cable_capacitance(os.path.join(base, 'cable_capacitance_filter.svg'))
    gen_drum_room_mics(os.path.join(base, 'drum_room_mic_setup.svg'))
    gen_double_tracking(os.path.join(base, 'double_tracking_panning.svg'))
    gen_tube_bias(os.path.join(base, 'vacuum_tube_bias_curve.svg')) # Guessing filename or creating new standard
    # Checking actual used filenames from audit needed for precision
    gen_balanced_cable(os.path.join(base, 'balanced_cable_cmrr.svg')) # Creating correct named file
    gen_impedance(os.path.join(base, 'high_z_low_z_diagram.svg'))
    gen_transformer(os.path.join(base, 'transformer_isolation_diagram.svg'))
    gen_ground_loop(os.path.join(base, 'ground_loop_diagram.svg'))
    gen_patchbay(os.path.join(base, 'patchbay_normalisation.svg'))
    
    # Also fix Parallel Comp Routing explicitly mentioned in audit
    # gen_sidechain(os.path.join(base, 'parallel_compression_routing.svg')) # Missing
    
    # Specific Parallel Compression Generator
    s_pc = SVG()
    s_pc.add_rect(100, 200, 200, 100, fill="#eee", stroke="#333"); s_pc.add_text(200, 250, "Dry Signal", text_anchor="middle")
    s_pc.add_rect(100, 350, 200, 100, fill="#ffebee", stroke="red"); s_pc.add_text(200, 400, "Smashed (Comp)", text_anchor="middle", fill="red")
    
    # Summing
    s_pc.add_circle(500, 325, 50, fill="#ddd", stroke="#333")
    s_pc.add_text(500, 330, "+", font_size=40, text_anchor="middle")
    
    s_pc.add_line(300, 250, 460, 310, stroke="#333", stroke_width=2)
    s_pc.add_line(300, 400, 460, 340, stroke="red", stroke_width=2)
    s_pc.add_line(550, 325, 650, 325, stroke="#333", stroke_width=4); s_pc.add_text(660, 330, "Mixed Output")
    
    s_pc.add_text(400, 50, "Parallel Compression Routing", font_size=24, text_anchor="middle", font_weight="bold")
    s_pc.save(os.path.join(base, 'parallel_compression_routing.svg'))
    # Actually let's make a specific one for parallel
    
    print("Batch 4: 10 new specific SVGs generated.")

if __name__ == "__main__":
    main()
