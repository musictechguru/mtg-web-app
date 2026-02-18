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

    def add_text(self, x, y, text, font_size=20, fill="black", text_anchor="start", font_weight="normal", transform="", font_family="Arial, sans-serif"):
        t_attr = f'transform="{transform}"' if transform else ""
        self.elements.append(f'<text x="{x}" y="{y}" font-family="{font_family}" font-size="{font_size}" fill="{fill}" text-anchor="{text_anchor}" font-weight="{font_weight}" {t_attr}>{text}</text>')

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

# --- Generators Batch 3 ---

def gen_tape_reel(path):
    svg = SVG()
    cx, cy, r = 400, 300, 200
    svg.add_circle(cx, cy, r, fill="#ccc", stroke="#666", stroke_width=5) # Reel
    svg.add_circle(cx, cy, r*0.8, fill="#5d4037") # Tape
    svg.add_circle(cx, cy, r*0.3, fill="#ccc", stroke="#666", stroke_width=2) # Hub
    # Spokes
    for i in range(3):
        angle = i * 120
        rad = math.radians(angle)
        x2 = cx + math.cos(rad) * r
        y2 = cy + math.sin(rad) * r
        svg.add_line(cx, cy, x2, y2, stroke="#999", stroke_width=15)
        
    svg.add_text(400, 50, "Open Reel Tape", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_sequencer(path):
    svg = SVG()
    ox, oy = 100, 100
    w, h = 600, 400
    
    # Grid
    for i in range(16):
        x = ox + i*(w/16)
        svg.add_line(x, oy, x, oy+h, stroke="#ddd")
    for i in range(8):
        y = oy + i*(h/8)
        svg.add_line(ox, y, ox+w, y, stroke="#ddd")
        
    # Notes
    notes = [(0,4), (2,4), (4,5), (6,3), (8,4), (10,4), (12,5), (14,3)]
    for step, pitch in notes:
        x = ox + step*(w/16)
        y = oy + (7-pitch)*(h/8) # Invert pitch for visual
        svg.add_rect(x+2, y+2, (w/16)-4, (h/8)-4, fill="blue", rx=2)
        
    svg.add_text(400, 50, "Step Sequencer / Piano Roll", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_loudness_war(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333") 
    
    # 1. Dynamic Waveform (Top)
    center_y = oy - 300
    svg.add_text(100, center_y, "1980s (Dynamic)", font_size=14, text_anchor="end")
    points = []
    for i in range(600):
        val = math.sin(i*0.1) * random.uniform(0.1, 0.8) * 50
        points.append(f"{ox+i},{center_y-val}")
    svg.add_path("M " + " L ".join(points), stroke="green", stroke_width=1)
    
    # 2. Smashed Waveform (Bottom)
    center_y2 = oy - 100
    svg.add_text(100, center_y2, "2000s (Loud)", font_size=14, text_anchor="end")
    points2 = []
    for i in range(600):
        val = math.sin(i*0.1) * 70 # High amplitude
        if val > 50: val = 50 # Clip
        if val < -50: val = -50
        points2.append(f"{ox+i},{center_y2-val}")
    svg.add_rect(ox, center_y2-50, 600, 100, fill="#fee", opacity=0.5) # "Brick"
    svg.add_path("M " + " L ".join(points2), stroke="red", stroke_width=1)
    
    svg.add_text(400, 50, "Loudness War: Dynamic Range Loss", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_automation_lanes(path):
    svg = SVG()
    ox, oy = 100, 150
    w = 600
    
    # Track 1
    svg.add_rect(ox, oy, w, 60, fill="#eee", stroke="#333")
    svg.add_text(ox-10, oy+35, "Audio", text_anchor="end")
    
    # Lane 1 (Vol)
    svg.add_rect(ox, oy+60, w, 40, fill="#f0f8ff", stroke="#ccc")
    svg.add_text(ox-10, oy+85, "Volume", text_anchor="end", font_size=12)
    svg.add_path(f"M {ox} {oy+90} L {ox+200} {oy+90} L {ox+300} {oy+70} L {ox+600} {oy+70}", stroke="blue", stroke_width=2)
    
    # Lane 2 (Pan)
    svg.add_rect(ox, oy+100, w, 40, fill="#f0f8ff", stroke="#ccc")
    svg.add_text(ox-10, oy+125, "Pan", text_anchor="end", font_size=12)
    svg.add_path(f"M {ox} {oy+120} L {ox+100} {oy+110} L {ox+400} {oy+130} L {ox+600} {oy+120}", stroke="green", stroke_width=2)
    
    svg.add_text(400, 50, "DAW Automation Lanes", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_cloud_stems(path):
    svg = SVG()
    
    # Cloud
    svg.add_circle(400, 200, 80, fill="#e0f7fa", stroke="#00bcd4", stroke_width=2)
    svg.add_circle(340, 220, 60, fill="#e0f7fa", stroke="#00bcd4", stroke_width=2)
    svg.add_circle(460, 220, 60, fill="#e0f7fa", stroke="#00bcd4", stroke_width=2)
    svg.add_text(400, 220, "Cloud", fill="#006064", text_anchor="middle")
    
    # Stems
    y_base = 400
    colors = ["red", "orange", "green", "blue"]
    labels = ["Drums", "Bass", "Keys", "Vocals"]
    
    for i in range(4):
        x = 200 + i*130
        svg.add_rect(x, y_base, 80, 50, fill=colors[i], rx=5)
        svg.add_text(x+40, y_base+30, labels[i], fill="white", text_anchor="middle", font_weight="bold")
        
        # Arrow up
        svg.add_line(x+40, y_base, 400, 280, stroke=colors[i], stroke_width=2, stroke_dasharray="5,5")
        
    svg.add_text(400, 50, "Cloud Collaboration (Stems)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_sidechain(path):
    svg = SVG()
    # Bass (Target)
    svg.add_rect(100, 200, 200, 100, fill="#eee", stroke="#333")
    svg.add_text(200, 250, "Bass Track", text_anchor="middle")
    
    # Compressor on Bass
    svg.add_rect(350, 200, 100, 100, fill="#ddd", stroke="black")
    svg.add_text(400, 250, "Comp", text_anchor="middle")
    
    # Kick (Key)
    svg.add_rect(100, 400, 200, 60, fill="#ffebee", stroke="red")
    svg.add_text(200, 435, "Kick Drum (Key)", text_anchor="middle", fill="red")
    
    # Sidechain Signal
    svg.add_path("M 300 430 L 400 430 L 400 300", stroke="red", stroke_width=3, stroke_dasharray="5,5")
    svg.add_text(410, 360, "Sidechain Input", fill="red", transform="rotate(-90, 410, 360)")
    
    svg.add_line(300, 250, 350, 250, stroke="black", stroke_width=2) # Audio In
    svg.add_line(450, 250, 550, 250, stroke="black", stroke_width=2) # Audio Out
    
    svg.add_text(400, 50, "Sidechain Compression Flow", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_multitrack_head(path):
    svg = SVG()
    
    svg.add_rect(200, 200, 400, 200, fill="#555", rx=10) # Head block
    
    tracks = 8
    gap = 40
    start_x = 260
    
    for i in range(tracks):
        x = start_x + i*gap
        svg.add_rect(x, 250, 10, 100, fill="#bcaaa4", stroke="orange") # Pole piece
        svg.add_text(x+5, 380, str(i+1), fill="white", text_anchor="middle", font_size=12)
        
    svg.add_text(400, 100, "Multitrack Tape Head (8 Track)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_808_dist(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333")
    
    # Clean Sine (Gray)
    points = []
    for i in range(600):
        val = math.sin(i*0.05) * 100
        points.append(f"{ox+i},{oy-200-val}")
    svg.add_path("M " + " L ".join(points), stroke="#ddd", stroke_width=4)
    
    # Saturated (Red - Squared off)
    points2 = []
    for i in range(600):
        val = math.sin(i*0.05) * 140 # Louder
        if val > 100: val = 100 + (val-100)*0.2 # Soft clip
        if val < -100: val = -100 + (val+100)*0.2
        points2.append(f"{ox+i},{oy-200-val}")
    svg.add_path("M " + " L ".join(points2), stroke="red", stroke_width=2)
    
    svg.add_text(200, oy-350, "Clean 808", fill="#999")
    svg.add_text(200, oy-330, "Saturated 808 (Harmonics)", fill="red")
    
    svg.add_text(400, 50, "Harmonic Saturation", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def main():
    base = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    gen_tape_reel(os.path.join(base, 'tape_machine_reel.svg'))
    gen_sequencer(os.path.join(base, 'midi_sequencer_timeline.svg'))
    gen_loudness_war(os.path.join(base, 'loudness_war_waveform.svg'))
    gen_automation_lanes(os.path.join(base, 'daw_automation_lanes.svg'))
    gen_cloud_stems(os.path.join(base, 'cloud_stems_workflow.svg'))
    gen_sidechain(os.path.join(base, 'sidechain_ducking_graph.svg'))
    gen_multitrack_head(os.path.join(base, 'multitrack_tape_head.svg'))
    gen_808_dist(os.path.join(base, '808_harmonic_saturation.svg'))
    
    print("Batch 3: 8 new specific SVGs generated.")

if __name__ == "__main__":
    main()
