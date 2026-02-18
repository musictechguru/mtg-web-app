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

# --- Generators Batch 5 (Acoustics & Signals) ---

def gen_near_field(path):
    svg = SVG()
    # Desk
    svg.add_rect(100, 300, 600, 20, fill="#ccc")
    
    # Monitors (Close)
    svg.add_rect(250, 200, 60, 100, fill="#333")
    svg.add_rect(490, 200, 60, 100, fill="#333")
    
    # Listener Head
    svg.add_circle(400, 400, 30, fill="#ddd", stroke="#333")
    
    # Sound Paths (Direct >> Room)
    svg.add_line(280, 250, 400, 400, stroke="blue", stroke_width=2); svg.add_text(300, 350, "Direct", fill="blue")
    svg.add_line(520, 250, 400, 400, stroke="blue", stroke_width=2)
    
    # Room Reflections (Weak/Far)
    svg.add_rect(50, 50, 700, 500, fill="none", stroke="#999", stroke_dasharray="5,5")
    svg.add_line(280, 250, 50, 200, stroke="#aaa"); svg.add_line(50, 200, 400, 400, stroke="#aaa")
    
    svg.add_text(400, 50, "Near Field Monitoring", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_reflection_types(path):
    svg = SVG()
    
    # Surfaces
    svg.add_rect(100, 250, 200, 20, fill="#555"); svg.add_text(200, 280, "Flat Wall", text_anchor="middle")
    
    svg.add_path("M 500 250 L 510 240 L 520 250 L 530 240 L 540 250 L 550 240 L 560 250", stroke="#555", stroke_width=2) # Rough
    for i in range(15): # Diffuser blocks
        svg.add_rect(500 + i*13, 250 + random.randint(0,20), 10, 20, fill="#555")
    svg.add_text(600, 280, "Diffuser", text_anchor="middle")

    # Specular Reflection (Beam)
    svg.add_line(150, 150, 200, 250, stroke="blue", stroke_width=2)
    svg.add_line(200, 250, 250, 150, stroke="blue", stroke_width=2)
    svg.add_text(200, 120, "Specular (Mirror)", fill="blue", text_anchor="middle")
    
    # Diffuse Reflection (Scatter)
    svg.add_line(550, 150, 600, 250, stroke="red", stroke_width=2)
    for i in range(5):
        angle = -45 + i*22.5
        x = 600 + math.sin(math.radians(angle))*50
        y = 250 - math.cos(math.radians(angle))*50
        svg.add_line(600, 250, x, y, stroke="red")
    svg.add_text(600, 120, "Diffuse (Scattered)", fill="red", text_anchor="middle")
    
    svg.add_text(400, 50, "Reflection Types", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_comb_filtering(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333")
    
    points = []
    for i in range(600):
        # Comb filter: y = |cos(x)|
        val = abs(math.cos(i * 0.05)) * 300
        points.append(f"{ox+i},{oy-val}")
    svg.add_path("M " + " L ".join(points), stroke="purple", stroke_width=2, fill="none")
    
    svg.add_text(150, oy-320, "Cancel (Null)", fill="purple")
    svg.add_line(180, oy-310, 192, oy-20, stroke="purple", stroke_dasharray="2,2")
    
    svg.add_text(400, 50, "Comb Filtering Response", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_membrane_absorber(path):
    svg = SVG()
    # Wall
    svg.add_rect(600, 100, 50, 400, fill="#333"); svg.add_text(625, 520, "Wall", text_anchor="middle")
    
    # Membrane Panel
    svg.add_rect(300, 100, 20, 400, fill="#d32f2f"); svg.add_text(310, 520, "Membrane", text_anchor="middle")
    
    # Air Gap
    svg.add_text(460, 300, "Sealed Air Gap (Spring)", text_anchor="middle", fill="#666")
    
    # Sound hitting
    svg.add_path("M 100 300 Q 200 320 280 300", stroke="blue", stroke_width=4, fill="none")
    svg.add_text(150, 280, "Low Freq", fill="blue")
    
    svg.add_text(400, 50, "Membrane (Panel) Absorber", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_air_gap(path):
    svg = SVG()
    # Panel on wall
    svg.add_rect(200, 200, 20, 200, fill="orange"); svg.add_text(210, 420, "Absorber", text_anchor="middle")
    svg.add_rect(220, 200, 50, 200, fill="#ccc"); svg.add_text(245, 180, "No Gap", text_anchor="middle")
    
    # Panel with gap
    svg.add_rect(500, 200, 20, 200, fill="orange"); svg.add_text(510, 420, "Absorber", text_anchor="middle")
    svg.add_rect(570, 200, 50, 200, fill="#ccc"); svg.add_text(595, 180, "Wall", text_anchor="middle")
    
    svg.add_line(520, 300, 570, 300, stroke="black", stroke_width=2)
    svg.add_text(545, 290, "GAP", font_size=12, text_anchor="middle")
    
    svg.add_text(650, 300, "Increased Low End\nAbsorption", fill="green")
    
    svg.add_text(400, 50, "Air Gap Mounting Effect", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_sbir(path):
    svg = SVG()
    # Speaker
    svg.add_rect(300, 300, 50, 80, fill="#333")
    # Wall behind
    svg.add_rect(100, 100, 20, 400, fill="#999"); svg.add_text(110, 520, "Rear Wall", text_anchor="middle")
    
    # Direct
    svg.add_line(350, 340, 700, 340, stroke="green", stroke_width=3); svg.add_text(600, 330, "Direct", fill="green")
    
    # Reflection
    svg.add_line(300, 340, 120, 340, stroke="red", stroke_width=3)
    svg.add_line(120, 340, 700, 360, stroke="red", stroke_width=3, stroke_dasharray="5,5")
    svg.add_text(500, 380, "Reflected (Phase Cancel)", fill="red")
    
    svg.add_text(400, 50, "Speaker Boundary Interference (SBIR)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_standing_waves(path):
    svg = SVG()
    ox, oy, w, h = 100, 300, 600, 200
    # Room boundaries
    svg.add_line(ox, 100, ox, 500, stroke="black", stroke_width=4); svg.add_text(ox, 520, "Wall", text_anchor="middle")
    svg.add_line(ox+w, 100, ox+w, 500, stroke="black", stroke_width=4); svg.add_text(ox+w, 520, "Wall", text_anchor="middle")
    
    # Node
    points = []
    points2 = []
    for i in range(601):
        val = math.sin(i * (math.pi/600) * 2) * 100 # 2nd harmonic
        points.append(f"{ox+i},{oy-val}")
        points2.append(f"{ox+i},{oy+val}") # Reflection
        
    svg.add_path("M " + " L ".join(points), stroke="blue", stroke_width=2, fill="none")
    svg.add_path("M " + " L ".join(points2), stroke="red", stroke_width=2, fill="none", stroke_dasharray="5,5")
    
    svg.add_circle(ox+300, oy, 10, fill="black"); svg.add_text(ox+300, oy+20, "Node (Silence)", text_anchor="middle")
    svg.add_circle(ox+150, oy-100, 10, fill="green"); svg.add_text(ox+150, oy-120, "Anti-Node (Peak)", text_anchor="middle")
    
    svg.add_text(400, 50, "Standing Waves (Room Modes)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_aftertouch(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333"); svg.add_text(ox+w/2, oy+40, "Time (Held Note)", text_anchor="middle")
    svg.add_line(ox, oy, ox, oy-h, stroke="#333"); svg.add_text(60, oy-h/2, "Pressure", transform=f"rotate(-90, 60, {oy-h/2})")
    
    # Note On
    svg.add_line(ox+50, oy, ox+50, oy-200, stroke="green", stroke_width=2); svg.add_text(ox+50, oy-210, "Note On", fill="green")
    
    # Pressure Curve
    pts = [f"{ox+50},{oy-200}"]
    for i in range(400):
        # Wiggle pressure
        val = 200 + math.sin(i*0.1)*50 + (i*0.2)
        pts.append(f"{ox+50+i},{oy-val}")
    svg.add_path("M " + " L ".join(pts), stroke="purple", stroke_width=3, fill="none")
    
    svg.add_text(400, 50, "MIDI Aftertouch Data", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_series_flow(path):
    svg = SVG()
    
    # Guitar Pedals
    pedals = ["Tuner", "OD", "Dist", "Delay"]
    for i, p in enumerate(pedals):
        x = 100 + i*160
        svg.add_rect(x, 250, 100, 150, fill=f"hsl({i*60}, 50%, 80%)", stroke="black", rx=5)
        svg.add_text(x+50, 325, p, text_anchor="middle")
        # Knobs
        svg.add_circle(x+25, 280, 10, fill="black")
        svg.add_circle(x+75, 280, 10, fill="black")
        
        # Cable
        if i < 3:
            svg.add_line(x+100, 325, x+160, 325, stroke="black", stroke_width=4)
            
    svg.add_line(50, 325, 100, 325, stroke="black", stroke_width=4) # In
    svg.add_line(660, 325, 750, 325, stroke="black", stroke_width=4) # Out
    
    svg.add_text(400, 50, "Series Signal Flow", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_bal_unbal_wave(path):
    svg = SVG()
    
    # Unbalanced (Noisy)
    svg.add_line(100, 200, 700, 200, stroke="#ccc")
    pts1 = []
    for i in range(600):
        val = math.sin(i*0.05)*50 + random.uniform(-10, 10) # Noise
        pts1.append(f"{100+i},{200-val}")
    svg.add_path("M " + " L ".join(pts1), stroke="red", stroke_width=2, fill="none")
    svg.add_text(100, 120, "Unbalanced (Noise Added)", fill="red")
    
    # Balanced (Clean)
    svg.add_line(100, 450, 700, 450, stroke="#ccc")
    pts2 = []
    for i in range(600):
        val = math.sin(i*0.05)*50 # Clean
        pts2.append(f"{100+i},{450-val}")
    svg.add_path("M " + " L ".join(pts2), stroke="blue", stroke_width=2, fill="none")
    svg.add_text(100, 370, "Balanced (Noise Rejected)", fill="blue")
    
    svg.add_text(400, 50, "Signal Quality Comparison", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def main():
    base = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    gen_near_field(os.path.join(base, 'near_field_setup.svg'))
    gen_reflection_types(os.path.join(base, 'reflection_types.svg'))
    gen_comb_filtering(os.path.join(base, 'comb_filtering_graph.svg'))
    gen_membrane_absorber(os.path.join(base, 'membrane_absorber.svg'))
    gen_air_gap(os.path.join(base, 'air_gap_mounting.svg'))
    gen_sbir(os.path.join(base, 'sbir_boundary_effect.svg'))
    gen_standing_waves(os.path.join(base, 'standing_waves_visual.svg'))
    gen_aftertouch(os.path.join(base, 'aftertouch_curve.svg'))
    gen_series_flow(os.path.join(base, 'series_signal_flow.svg'))
    gen_bal_unbal_wave(os.path.join(base, 'balanced_vs_unbalanced.svg'))

    print("Batch 5: 10 new specific SVGs generated.")

if __name__ == "__main__":
    main()
