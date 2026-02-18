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

# --- Generators Batch 2 ---

def gen_1176(path):
    svg = SVG()
    # Faceplate
    svg.add_rect(100, 200, 600, 200, fill="#111", stroke="#333", stroke_width=4, rx=5)
    
    # Meter
    svg.add_rect(140, 240, 100, 80, fill="#eee", stroke="black")
    svg.add_circle(190, 310, 40, stroke="red", stroke_width=2, opacity=0.5) # Needle pivot area
    
    # Knobs
    knobs = [("Input", 300), ("Output", 400), ("Attack", 500), ("Release", 600)]
    for label, x in knobs:
        svg.add_circle(x, 280, 25, fill="#333", stroke="#ddd", stroke_width=2)
        svg.add_line(x, 280, x+15, 265, stroke="white", stroke_width=3) # Indicator
        svg.add_text(x, 340, label, fill="white", text_anchor="middle", font_size=14)
        
    # Buttons (Ratio)
    svg.add_text(190, 380, "Ratio Buttons", fill="white", text_anchor="middle", font_size=12)
    for i in range(4):
        svg.add_rect(160 + i*20, 350, 15, 20, fill="#ddd")
        
    svg.add_text(400, 50, "FET Compressor (1176 Style)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_text(400, 150, "Fixed Threshold - Input drives compression amount", font_size=16, text_anchor="middle", fill="#666")
    svg.save(path)

def gen_pultec(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    
    # Graph frame
    svg.add_line(ox, oy, ox+w, oy, stroke="#333")
    svg.add_line(ox, oy, ox, oy-h, stroke="#333")
    
    # Pultec "Low End Trick" Curve
    # Boost and Cut at same frequency
    points = []
    for i in range(101):
        x = i/100
        # Boost (Broad)
        boost = 8 * math.exp(-((x-0.2)*4)**2)
        # Cut (Narrow, slightly offset)
        cut = 6 * math.exp(-((x-0.22)*8)**2)
        
        y_val = boost - cut
        
        px = ox + x * w
        py = (oy - 200) - (y_val * 20)
        points.append(f"{px},{py}")
        
    svg.add_path("M " + " L ".join(points), stroke="#d97706", stroke_width=4, fill="none")
    svg.add_text(ox + w*0.2, oy-300, "Resonant Shelf Dip", fill="#d97706", font_weight="bold")
    
    svg.add_text(400, 50, "Pultec 'Low End Trick'", font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_text(400, 80, "Boosting and Cutting at the same frequency creates a resonant dip", font_size=16, text_anchor="middle", fill="#666")
    svg.save(path)

def gen_buffer_latency(path):
    svg = SVG()
    
    # High Buffer
    svg.add_rect(100, 200, 200, 100, fill="#bbdefb", stroke="#2196f3", stroke_width=2)
    svg.add_text(200, 250, "Buffer: 1024 Samples", text_anchor="middle", font_weight="bold")
    svg.add_text(200, 280, "Stability: High", text_anchor="middle", fill="green")
    svg.add_text(200, 350, "Latency: ~23ms", text_anchor="middle", fill="red", font_size=20)
    
    # Low Buffer
    svg.add_rect(500, 200, 200, 30, fill="#ffe0b2", stroke="#ff9800", stroke_width=2)
    svg.add_text(600, 220, "Buffer: 64 Samples", text_anchor="middle", font_weight="bold", font_size=14)
    svg.add_text(600, 280, "Stability: Low (CPU Load)", text_anchor="middle", fill="red")
    svg.add_text(600, 350, "Latency: ~3ms", text_anchor="middle", fill="green", font_size=20)
    
    svg.add_text(400, 50, "Buffer Size vs Latency", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_parallel_compression(path):
    svg = SVG()
    
    # Input
    svg.add_rect(350, 100, 100, 50, fill="#ddd", stroke="#333")
    svg.add_text(400, 130, "Input", text_anchor="middle")
    
    # Split
    svg.add_line(400, 150, 250, 200, stroke="black", stroke_width=2) # Dry path
    svg.add_line(400, 150, 550, 200, stroke="black", stroke_width=2) # Wet path
    
    # Dry Fader
    svg.add_rect(200, 200, 100, 150, fill="#eee", stroke="#333")
    svg.add_text(250, 280, "Dry (Unprocessed)", text_anchor="middle")
    
    # Compressor
    svg.add_rect(500, 200, 100, 100, fill="#ffcccc", stroke="red", stroke_width=2)
    svg.add_text(550, 250, "Heavy Comp", text_anchor="middle", fill="red")
    
    # Wet Fader
    svg.add_rect(500, 320, 100, 30, fill="#eee", stroke="#333")
    svg.add_text(550, 340, "Wet Level", text_anchor="middle")
    svg.add_line(550, 300, 550, 320, stroke="black")
    
    # Summing
    svg.add_line(250, 350, 400, 450, stroke="black", stroke_width=2)
    svg.add_line(550, 350, 400, 450, stroke="black", stroke_width=2)
    
    svg.add_rect(350, 450, 100, 50, fill="#ddd", stroke="#333")
    svg.add_text(400, 480, "Master Bus", text_anchor="middle")
    
    svg.add_text(400, 50, "Parallel Compression Routing", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_midi_controllers(path):
    svg = SVG()
    
    # Keyboard
    svg.add_rect(50, 150, 300, 100, stroke="black", fill="white")
    for i in range(15):
        svg.add_rect(50 + i*20, 150, 20, 100, stroke="black", fill="white") # Keys
    svg.add_text(200, 280, "Keyboard (Notes/Chords)", text_anchor="middle")

    # Drum Pads
    svg.add_rect(450, 150, 160, 160, stroke="black", fill="#333")
    for r in range(4):
        for c in range(4):
            svg.add_rect(460 + c*35, 160 + r*35, 30, 30, fill="#666")
    svg.add_text(530, 340, "Drum Pads (Beats)", text_anchor="middle")
    
    # Fader Bank
    svg.add_rect(250, 400, 300, 150, stroke="black", fill="#ddd")
    for i in range(8):
        svg.add_line(270 + i*35, 420, 270 + i*35, 530, stroke="black", stroke_width=2)
        svg.add_rect(265 + i*35, 480, 10, 20, fill="#333") # knobs
    svg.add_text(400, 580, "Fader Bank (Mixing)", text_anchor="middle")

    svg.add_text(400, 50, "MIDI Controller Types", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def main():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    gen_1176(os.path.join(base_path, '1176_compressor_visual.svg'))
    gen_pultec(os.path.join(base_path, 'pultec_eq_visual.svg'))
    gen_buffer_latency(os.path.join(base_path, 'buffer_latency_visual.svg'))
    gen_parallel_compression(os.path.join(base_path, 'parallel_compression_visual.svg'))
    gen_midi_controllers(os.path.join(base_path, 'midi_controllers_visual.svg'))
    
    print("Batch 2 SVGs generated.")

if __name__ == "__main__":
    main()
