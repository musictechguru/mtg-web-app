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

# --- Generators Batch 3 (Placeholders) ---

def gen_mastering_chain(path):
    svg = SVG()
    # Signal chain boxes
    y = 300
    w = 100
    h = 60
    gap = 40
    
    stages = ["Mix", "EQ", "Comp", "Limit", "Dither", "Master"]
    start_x = (800 - (len(stages)*(w+gap) - gap)) / 2
    
    for i, stage in enumerate(stages):
        x = start_x + i*(w+gap)
        
        # Arrow
        if i > 0:
            svg.add_line(x - gap, y + h/2, x, y + h/2, stroke="#333", stroke_width=2)
            svg.add_path(f"M {x-10} {y+h/2-5} L {x} {y+h/2} L {x-10} {y+h/2+5}", fill="#333")
            
        color = "#e0e7ff"
        stroke = "#3730a3"
        if stage == "Limit": color = "#fee2e2"; stroke = "#991b1b"
        if stage == "Master": color = "#dcfce7"; stroke = "#166534"
        
        svg.add_rect(x, y, w, h, fill=color, stroke=stroke, stroke_width=2, rx=5)
        svg.add_text(x + w/2, y + h/2 + 5, stage, text_anchor="middle", font_weight="bold", fill=stroke)
        
    svg.add_text(400, 100, "Typical Mastering Signal Flow", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_monitoring(path):
    svg = SVG()
    
    # Room outline
    svg.add_rect(200, 150, 400, 300, stroke="#333", stroke_width=4, fill="none")
    
    # Listener
    cx, cy = 400, 300 # Sweet spot (38%)
    svg.add_circle(cx, cy, 15, fill="#333")
    svg.add_text(cx, cy+40, "Listener", text_anchor="middle")
    
    # Speakers (Equilateral triangle)
    # triangle height = side * sqrt(3)/2
    # side = 200 (visual)
    spk_y = 200
    spk_left_x = 300
    spk_right_x = 500
    
    svg.add_rect(spk_left_x-20, spk_y-20, 40, 40, fill="#333")
    svg.add_rect(spk_right_x-20, spk_y-20, 40, 40, fill="#333")
    
    # Triangle lines
    svg.add_line(spk_left_x, spk_y, spk_right_x, spk_y, stroke="#aaa", stroke_dasharray="5,5")
    svg.add_line(spk_left_x, spk_y, cx, cy, stroke="#aaa", stroke_dasharray="5,5")
    svg.add_line(spk_right_x, spk_y, cx, cy, stroke="#aaa", stroke_dasharray="5,5")
    svg.add_text(400, 250, "60°", text_anchor="middle", fill="#666")
    
    svg.add_text(400, 50, "Monitoring Sweet Spot", font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_text(400, 80, "Equilateral Triangle Setup", font_size=16, text_anchor="middle", fill="#666")
    svg.save(path)

def gen_rarefaction(path):
    svg = SVG()
    
    y = 300
    svg.add_text(50, y, "Speaker", text_anchor="middle")
    svg.add_rect(20, y-50, 60, 100, fill="#ddd", stroke="black")
    
    # Particles
    # Compression: dense lines
    # Rarefaction: sparse lines
    
    start_x = 120
    freq = 0.1
    for i in range(600):
        val = math.sin(i * freq)
        # val is -1 to 1. 
        # Dense when val is high?
        # Let's just draw lines based on density function
        
        # Simpler:
        gap_base = 10
        gap_mod = 8 * math.sin(i * 0.1) # varies from -8 to +8. Total gap 2 to 18.
        
        # No, iterating x position directly
        
    x = 120
    while x < 750:
        # Density varies sine wave
        density = (math.sin(x * 0.05) + 1.5) # 0.5 to 2.5
        gap = 5 * density
        
        svg.add_line(x, y-50, x, y+50, stroke="#666")
        
        # Labeling regions
        if abs(math.sin(x*0.05) - 1) < 0.1: # Peak density? actually small gap = high density
             pass
        
        x += gap

    # Just manual text labels for clarity
    svg.add_text(250, 200, "Rarefaction (Low Pressure)", text_anchor="middle", fill="#666")
    svg.add_line(250, 220, 250, 240, stroke="#666") # pointing
    
    svg.add_text(400, 400, "Compression (High Pressure)", text_anchor="middle", fill="#333")
    svg.add_line(400, 380, 400, 360, stroke="#333")
    
    svg.add_text(400, 50, "Longitudinal Sound Wave", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_peak_rms(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    draw_graph_frame(svg, ox, oy, w, h)
    
    # Waveform (Transient)
    points = []
    for i in range(600):
        x = i
        # Spiky wave
        y = math.sin(i*0.2) * math.exp(-((i%100)/20)) * 150
        points.append(f"{ox+x},{oy-200-y}")
        
    svg.add_path("M " + " L ".join(points), stroke="#bbb", stroke_width=1)
    
    # Peak Level line
    svg.add_line(ox, oy-350, ox+w, oy-350, stroke="red", stroke_width=2, stroke_dasharray="5,5")
    svg.add_text(ox+w+10, oy-350, "Peak", fill="red")
    
    # RMS Level line (average energy, lower)
    svg.add_line(ox, oy-250, ox+w, oy-250, stroke="blue", stroke_width=2)
    svg.add_text(ox+w+10, oy-250, "RMS/Avg", fill="blue")
    
    svg.add_text(400, 50, "Peak vs RMS Level", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def draw_graph_frame(svg, ox, oy, w, h):
    svg.add_line(ox, oy, ox+w, oy, stroke="#333")
    svg.add_line(ox, oy, ox, oy-h, stroke="#333")

def main():
    base_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    gen_mastering_chain(os.path.join(base_path, 'mastering_signal_flow.svg'))
    gen_monitoring(os.path.join(base_path, 'monitoring_environment.svg'))
    gen_rarefaction(os.path.join(base_path, 'waveform_compression_rarefaction.svg'))
    gen_peak_rms(os.path.join(base_path, 'peak_vs_rms.svg'))
    gen_peak_rms(os.path.join(base_path, 'reference_track_ab.svg')) # reusing graph for A/B context (less ideal but better than empty)
    
    # Quick fix for audio interface
    ai_path = os.path.join(base_path, 'audio_interface_diagram.svg')
    s = SVG()
    s.add_rect(200, 200, 400, 150, fill="#333", rx=10) # Unit
    s.add_circle(250, 275, 20, fill="#111", stroke="#555", stroke_width=2) # Input 1
    s.add_circle(320, 275, 20, fill="#111", stroke="#555", stroke_width=2) # Input 2
    s.add_circle(500, 275, 30, fill="#222", stroke="#666", stroke_width=2) # Vol
    s.add_text(400, 50, "Audio Interface Front Panel", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(ai_path)
    
    print("Batch 3 Placeholders Overwritten.")

if __name__ == "__main__":
    main()
