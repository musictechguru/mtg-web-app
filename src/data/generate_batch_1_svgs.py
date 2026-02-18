import os
import math
import random

# --- SVG Class (Reused) ---
class SVG:
    def __init__(self, width=800, height=600):
        self.width = width
        self.height = height
        self.elements = []
        self.defs = []

    def add_rect(self, x, y, w, h, fill="none", stroke="none", stroke_width=0, rx=0, opacity=1.0):
        self.elements.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" />')

    def add_circle(self, cx, cy, r, fill="none", stroke="none", stroke_width=0, opacity=1.0):
        self.elements.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" />')

    def add_line(self, x1, y1, x2, y2, stroke="black", stroke_width=1, opacity=1.0, stroke_dasharray=""):
        attr = f'stroke-dasharray="{stroke_dasharray}"' if stroke_dasharray else ""
        self.elements.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" {attr} />')

    def add_path(self, d, fill="none", stroke="none", stroke_width=0, opacity=1.0, stroke_dasharray=""):
        attr = f'stroke-dasharray="{stroke_dasharray}"' if stroke_dasharray else ""
        self.elements.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" {attr} />')

    def add_text(self, x, y, text, font_size=20, fill="black", text_anchor="start", font_weight="normal", transform="", font_family="Arial, sans-serif"):
        t_attr = f'transform="{transform}"' if transform else ""
        self.elements.append(f'<text x="{x}" y="{y}" font-family="{font_family}" font-size="{font_size}" fill="{fill}" text-anchor="{text_anchor}" font-weight="{font_weight}" {t_attr}>{text}</text>')

    def save(self, path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        content = [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.width} {self.height}">',
            f'<rect x="0" y="0" width="{self.width}" height="{self.height}" fill="#f8f9fa" />', # Background
            "".join(self.defs),
            "".join(self.elements),
            '</svg>'
        ]
        with open(path, 'w') as f:
            f.write("".join(content))
        print(f"Generated: {path}")

# --- Generators ---

def gen_tape_echo(path):
    svg = SVG()
    # Tape Loop
    svg.add_rect(100, 200, 600, 200, stroke="#333", stroke_width=4, rx=100)
    
    # Heads
    heads = [("Rec", 200), ("Play 1", 300), ("Play 2", 400), ("Play 3", 500)]
    for label, x in heads:
        svg.add_rect(x-20, 180, 40, 40, fill="#666", stroke="black")
        svg.add_text(x, 170, label, text_anchor="middle", font_size=14)
        
    svg.add_text(400, 50, "Tape Echo Mechanism", font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_text(400, 80, "Multiple playback heads create rhythmic delays", font_size=16, fill="#666", text_anchor="middle")
    svg.save(path)

def gen_phase_correlation(path):
    svg = SVG(400, 600)
    cx, cy, r = 200, 300, 150
    
    svg.add_circle(cx, cy, r, stroke="#333", stroke_width=2)
    svg.add_line(cx, cy-r, cx, cy+r, stroke="#ccc") # Vertical (+1)
    svg.add_line(cx-r, cy, cx+r, cy, stroke="#ccc") # Horizontal (0)
    
    # Needle (In phase)
    svg.add_line(cx, cy, cx, cy-120, stroke="#44ff44", stroke_width=4)
    
    # Labels
    svg.add_text(cx, cy-160, "+1 (In Phase)", text_anchor="middle", fill="#44ff44")
    svg.add_text(cx+160, cy, "0 (Stereo)", text_anchor="start")
    svg.add_text(cx, cy+170, "-1 (Out of Phase)", text_anchor="middle", fill="#ff4444")
    
    svg.add_text(200, 50, "Phase Correlation", font_size=20, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_dither(path):
    svg = SVG()
    
    # Top: Quantization Error
    svg.add_text(400, 50, "Dither vs Truncation", font_size=24, text_anchor="middle", font_weight="bold")
    
    def draw_steps(ox, oy, label):
        svg.add_text(ox+100, oy-20, label, text_anchor="middle", font_weight="bold")
        points = []
        for i in range(200):
            x = i
            y = int(math.sin(i/30)*40 / 10) * 10 # Stepwise
            points.append(f"{ox+x},{oy+y}")
        
        svg.add_path("M " + " L ".join(points), stroke="red", stroke_width=2, fill="none")
        svg.add_line(ox, oy, ox+200, oy, stroke="#ccc")

    draw_steps(100, 200, "Truncation (Distortion)")
    
    # Bottom: Dithered
    ox, oy = 500, 200
    svg.add_text(ox+100, oy-20, "Dithered (Noise)", text_anchor="middle", font_weight="bold")
    points = []
    for i in range(200):
        x = i
        noise = (random.random() - 0.5) * 10
        y = (math.sin(i/30)*40) + noise
        points.append(f"{ox+x},{oy+y}")
    svg.add_path("M " + " L ".join(points), stroke="green", stroke_width=1, fill="none")
    
    svg.save(path)

def gen_di_box(path):
    svg = SVG()
    
    # Box
    svg.add_rect(200, 200, 400, 200, fill="#ddd", stroke="#333", stroke_width=4)
    svg.add_text(400, 300, "DI BOX", font_size=40, font_weight="bold", text_anchor="middle", fill="#666")
    
    # Input
    svg.add_line(50, 250, 200, 250, stroke="black", stroke_width=4)
    svg.add_text(100, 240, "Unbalanced (Inst)", text_anchor="middle")
    
    # Thru
    svg.add_line(50, 350, 200, 350, stroke="black", stroke_width=4)
    svg.add_text(100, 340, "Thru (Amp)", text_anchor="middle")
    
    # Output
    svg.add_line(600, 300, 750, 300, stroke="black", stroke_width=4)
    svg.add_text(700, 290, "Balanced (Mic Level)", text_anchor="middle")
    
    svg.add_text(400, 50, "DI Box Signal Flow", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_speed_sound(path):
    svg = SVG()
    
    materials = [("Air (20°C)", "343 m/s"), ("Water", "1482 m/s"), ("Steel", "5960 m/s")]
    y = 150
    for name, speed in materials:
        svg.add_text(100, y, name, font_weight="bold")
        val = int(speed.split()[0])
        bar_w = (val / 6000) * 500
        svg.add_rect(250, y-20, bar_w, 30, fill="#3b82f6")
        svg.add_text(250 + bar_w + 10, y, speed)
        y += 100
        
    svg.add_text(400, 50, "Speed of Sound in Media", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_inverse_square(path):
    svg = SVG()
    
    source_x, source_y = 100, 300
    svg.add_circle(source_x, source_y, 10, fill="orange")
    svg.add_text(source_x, source_y-20, "Source", text_anchor="middle")
    
    distances = [1, 2, 4]
    for i, d in enumerate(distances):
        x = source_x + d * 150
        h = 200 / (d) # Area visualization scale
        w = 10
        svg.add_line(x, source_y-h, x, source_y+h, stroke="#3b82f6", stroke_width=4)
        
        loss = 20 * math.log10(1/d)
        svg.add_text(x, source_y + h + 30, f"{d}m", text_anchor="middle")
        svg.add_text(x, source_y + h + 50, f"{loss:.1f} dB", text_anchor="middle", font_weight="bold")
        
    svg.add_text(400, 50, "Inverse Square Law", font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_text(400, 80, "-6dB for every doubling of distance", font_size=16, text_anchor="middle", fill="#666")
    svg.save(path)

def main():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    gen_tape_echo(os.path.join(base_path, 'tape_echo_visual.svg'))
    gen_phase_correlation(os.path.join(base_path, 'phase_correlation_visual.svg'))
    gen_dither(os.path.join(base_path, 'dither_visual.svg'))
    gen_di_box(os.path.join(base_path, 'di_box_visual.svg'))
    gen_speed_sound(os.path.join(base_path, 'speed_of_sound_visual.svg'))
    gen_inverse_square(os.path.join(base_path, 'inverse_square_visual.svg'))
    
    print("Batch 1 SVGs generated.")

if __name__ == "__main__":
    main()
