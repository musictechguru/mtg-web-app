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

    def add_line(self, x1, y1, x2, y2, stroke="black", stroke_width=1, stroke_dasharray=""):
        attr = f'stroke-dasharray="{stroke_dasharray}"' if stroke_dasharray else ""
        self.elements.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{stroke_width}" {attr} />')

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

def gen_compression_knee(path):
    svg = SVG()
    # Axes
    origin_x, origin_y = 100, 500
    w, h = 600, 400
    svg.add_line(origin_x, origin_y, origin_x + w, origin_y, stroke="#333", stroke_width=2)
    svg.add_line(origin_x, origin_y, origin_x, origin_y - h, stroke="#333", stroke_width=2)
    svg.add_text(origin_x + w/2, origin_y + 40, "Input Level (dB)", text_anchor="middle")
    svg.add_text(origin_x - 40, origin_y - h/2, "Output Level (dB)", text_anchor="middle", transform=f"rotate(-90, {origin_x-40}, {origin_y-h/2})")
    
    # Hard Knee
    svg.add_path(f"M {origin_x} {origin_y} L {origin_x+200} {origin_y-200} L {origin_x+500} {origin_y-250}", stroke="#ff4444", stroke_width=4, fill="none")
    svg.add_text(origin_x+300, origin_y-260, "Hard Knee", fill="#ff4444", font_weight="bold")
    
    # Soft Knee
    svg.add_path(f"M {origin_x} {origin_y+10} L {origin_x+180} {origin_y-170} Q {origin_x+200} {origin_y-190} {origin_x+220} {origin_y-205} L {origin_x+500} {origin_y-240}", stroke="#4444ff", stroke_width=4, fill="none", stroke_dasharray="5,5")
    svg.add_text(origin_x+300, origin_y-220, "Soft Knee", fill="#4444ff", font_weight="bold")
    
    svg.add_text(400, 50, "Hard vs Soft Knee", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_lufs_meter(path):
    svg = SVG(400, 600)
    
    # Meter Background
    svg.add_rect(150, 50, 100, 500, fill="#222", stroke="#666", stroke_width=2)
    
    # Scale
    for i in range(0, 61, 6): # -0 to -60
        y = 50 + (i/60 * 500)
        svg.add_line(140, y, 150, y, stroke="#333")
        svg.add_text(130, y+5, f"-{i}", font_size=12, text_anchor="end")
    
    # Target Zone (-14)
    target_y = 50 + (14/60 * 500)
    svg.add_rect(151, target_y-10, 98, 20, fill="#44ff44", opacity=0.2)
    svg.add_line(151, target_y, 249, target_y, stroke="#44ff44", stroke_width=2)
    svg.add_text(260, target_y+5, "-14 LUFS (Target)", fill="#228822", font_size=12)
    
    # Level Bar
    current_level_y = 50 + (12/60 * 500)
    svg.add_rect(160, current_level_y, 80, 550-current_level_y, fill="url(#grad1)", stroke="none") # Simplified fill
    svg.add_rect(160, current_level_y, 80, 550-current_level_y, fill="#ffcc00") # Solid fill for now
    
    svg.add_text(200, 30, "LUFS Metering", font_size=20, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_skyline_diffuser(path):
    svg = SVG()
    cols = 12
    rows = 12
    cell_size = 40
    start_x = (800 - (cols*cell_size))/2
    start_y = 100
    
    for r in range(rows):
        for c in range(cols):
            height = random.randint(0, 5) # block height identifier
            # Simulated 3D block
            x = start_x + c*cell_size
            y = start_y + r*cell_size
            
            # Simple color mapping for depth
            colors = ["#eee", "#ddd", "#ccc", "#bbb", "#aaa", "#999"]
            svg.add_rect(x, y, cell_size-2, cell_size-2, fill=colors[height])
            
            # Text for depth
            svg.add_text(x + cell_size/2, y + cell_size/2 + 5, str(height), font_size=12, text_anchor="middle", fill="#333")

    svg.add_text(400, 50, "Skyline Diffuser Pattern", font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_text(400, 80, "Varied block heights scatter sound in all directions", font_size=16, text_anchor="middle", fill="#666")
    svg.save(path)

def gen_patchbay(path):
    svg = SVG(800, 400)
    
    def draw_pair(x, y, label, connection_type):
        # Top Jack
        svg.add_circle(x, y, 20, stroke="#333", stroke_width=2, fill="#ddd")
        svg.add_text(x, y-30, "OUT", text_anchor="middle", font_size=12)
        
        # Bottom Jack
        svg.add_circle(x, y+100, 20, stroke="#333", stroke_width=2, fill="#ddd")
        svg.add_text(x, y+130, "IN", text_anchor="middle", font_size=12)
        
        # Connection Path
        if connection_type == "Normalled":
            # Connected internal
            svg.add_path(f"M {x} {y+20} L {x} {y+80}", stroke="green", stroke_width=4)
            svg.add_text(x, y+50, "Broken on Insert", font_size=10, fill="green", text_anchor="middle")
        elif connection_type == "Half-Normalled":
             svg.add_path(f"M {x} {y+20} L {x} {y+80}", stroke="orange", stroke_width=4, stroke_dasharray="4,2")
             svg.add_text(x, y+50, "Split Signal", font_size=10, fill="orange", text_anchor="middle")

        svg.add_text(x, y+160, label, text_anchor="middle", font_weight="bold")

    draw_pair(200, 150, "Fully Normalled", "Normalled")
    draw_pair(600, 150, "Half Normalled", "Half-Normalled")
    
    svg.add_text(400, 50, "Patchbay Normalling", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_standing_waves(path):
    svg = SVG()
    
    wall_x1, wall_x2 = 100, 700
    y_center = 300
    
    # Walls
    svg.add_line(wall_x1, 100, wall_x1, 500, stroke="#333", stroke_width=10)
    svg.add_line(wall_x2, 100, wall_x2, 500, stroke="#333", stroke_width=10)
    svg.add_text(wall_x1, 530, "Wall", text_anchor="middle")
    svg.add_text(wall_x2, 530, "Wall", text_anchor="middle")
    
    # Fundamental (1st Mode)
    points = []
    for x in range(wall_x1, wall_x2+1):
        norm = (x - wall_x1) / (wall_x2 - wall_x1)
        # Sine wave half cycle
        y = y_center - 100 * math.sin(norm * math.pi)
        points.append(f"{x},{y}")
    svg.add_path("M " + " L ".join(points), stroke="red", stroke_width=3, fill="none")

    # 2nd Mode
    points2 = []
    for x in range(wall_x1, wall_x2+1):
        norm = (x - wall_x1) / (wall_x2 - wall_x1)
        y = y_center - 80 * math.sin(norm * 2 * math.pi)
        points2.append(f"{x},{y}")
    svg.add_path("M " + " L ".join(points2), stroke="blue", stroke_width=3, fill="none", stroke_dasharray="5,5")
    
    svg.add_text(400, 50, "Room Modes / Standing Waves", font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_text(400, 80, "Red: 1st Harmonic (Fundamental) | Blue: 2nd Harmonic", fill="#666", text_anchor="middle")
    svg.save(path)

def main():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    gen_compression_knee(os.path.join(base_path, 'compression_knee_visual.svg'))
    gen_lufs_meter(os.path.join(base_path, 'lufs_metering_visual.svg'))
    gen_skyline_diffuser(os.path.join(base_path, 'skyline_diffuser_visual.svg'))
    gen_patchbay(os.path.join(base_path, 'patchbay_normalling_visual.svg'))
    gen_standing_waves(os.path.join(base_path, 'standing_waves_visual.svg'))
    
    print("New high-quality SVGs generated.")

if __name__ == "__main__":
    main()
