import os
import math
import random

# --- SVG Class ---
class SVG:
    def __init__(self, width=800, height=600):
        self.width = width
        self.height = height
        self.elements = []

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
            "".join(self.elements),
            '</svg>'
        ]
        with open(path, 'w') as f:
            f.write("".join(content))
        print(f"Generated: {path}")

# --- Generators ---

def gen_filter_sweep(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333")
    svg.add_line(ox, oy, ox, oy-h, stroke="#333")
    
    # 3 Low Pass curves at different frequencies
    frequencies = [0.2, 0.5, 0.8] # Normalized x positions
    colors = ["#99f", "#55f", "#00f"]
    
    for i, freq in enumerate(frequencies):
        points = []
        for j in range(101):
            x = j/100
            # Low pass rolloff approximation
            if x < freq: y = 1.0
            else: y = math.exp(-(x-freq)*10)
            
            px = ox + x * w
            py = oy - 200 - (y*(h/2-50) if x < freq else y*(h/2-50)) # Simply flat then drop
            # Better curve:
            cutoff_x = freq
            val = 1.0 / math.sqrt(1 + (x/cutoff_x)**8) # Butterworth-ish scaling
            
            py = (oy - 350) + (1-val)*350
            points.append(f"{px},{py}")
            
        svg.add_path("M " + " L ".join(points), stroke=colors[i], stroke_width=3, fill="none")
        
    # Automation Arrow
    svg.add_line(ox+w*0.2, oy-50, ox+w*0.8, oy-50, stroke="black", stroke_width=4)
    svg.add_path(f"M {ox+w*0.8} {oy-50} L {ox+w*0.78} {oy-60} L {ox+w*0.78} {oy-40}", fill="black")
    svg.add_text(ox+w*0.5, oy-20, "Time / Automation", text_anchor="middle", font_weight="bold")
    
    svg.add_text(400, 50, "Filter Sweep Automation", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_filter_types(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333"); svg.add_text(ox+w/2, oy+40, "Frequency", text_anchor="middle")
    svg.add_line(ox, oy, ox, oy-h, stroke="#333")
    
    # Low Pass (Red)
    points_lp = []
    for i in range(101):
        x = i/100; val = 1.0 / math.sqrt(1 + (x/0.3)**8)
        points_lp.append(f"{ox+x*w},{oy-100 - val*200}")
    svg.add_path("M " + " L ".join(points_lp), stroke="red", stroke_width=3, fill="none")
    svg.add_text(ox+100, oy-320, "LPF", fill="red")
    
    # High Pass (Blue)
    points_hp = []
    for i in range(101):
        x = i/100; val = 1.0 / math.sqrt(1 + (0.7 / (x + 0.0001))**8)
        points_hp.append(f"{ox+x*w},{oy-100 - val*200}")
    svg.add_path("M " + " L ".join(points_hp), stroke="blue", stroke_width=3, fill="none")
    svg.add_text(ox+500, oy-320, "HPF", fill="blue")
    
    # Band Pass (Green)
    points_bp = []
    for i in range(101):
        x = i/100; val = math.exp(-((x-0.5)*10)**2)
        points_bp.append(f"{ox+x*w},{oy-100 - val*200}")
    svg.add_path("M " + " L ".join(points_bp), stroke="green", stroke_width=3, fill="none")
    svg.add_text(ox+300, oy-320, "BPF", fill="green")
    
    svg.add_text(400, 50, "Filter Types Compared", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_masking(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333")
    
    # Masker (Loud Tone)
    svg.add_rect(ox+100, oy-300, 20, 300, fill="red")
    svg.add_text(ox+110, oy-310, "Masker (Loud)", text_anchor="middle", fill="red")
    
    # Masked (Quiet Tone)
    svg.add_rect(ox+150, oy-100, 20, 100, fill="#aaa", stroke="#666", stroke_dasharray="4,4")
    svg.add_text(ox+190, oy-110, "Masked (Quiet)", fill="#666")
    
    # Masking Curve (Threshold)
    points = []
    for i in range(400):
        x = i + 100
        # Decay curve
        dx = x - 110
        if dx < 0: y = 300
        else: y = 300 * math.exp(-dx * 0.01)
        points.append(f"{ox+x},{oy-y}")
    svg.add_path("M " + " L ".join(points), stroke="black", stroke_width=2, stroke_dasharray="5,5")
    
    svg.add_text(400, 50, "Frequency Masking", font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_text(400, 80, "Loud sounds hide quieter nearby sounds", font_size=16, text_anchor="middle", fill="#666")
    svg.save(path)

def gen_spectrum(path):
    svg = SVG()
    ox, oy, w, h = 100, 400, 600, 200
    svg.add_line(ox, oy, ox+w, oy, stroke="#333") # Axis
    
    regions = [("Sub", 0, 0.15, "#333"), ("Bass", 0.15, 0.35, "#555"), ("Mids", 0.35, 0.7, "#777"), ("Highs", 0.7, 1.0, "#999")]
    
    for label, start, end, color in regions:
        x_start = ox + start*w
        width = (end-start)*w
        svg.add_rect(x_start, oy-150, width, 150, fill=color, opacity=0.3)
        svg.add_text(x_start + width/2, oy-160, label, text_anchor="middle", font_weight="bold")
        
    # Scale markers
    markers = [("20Hz", 0), ("100Hz", 0.25), ("1kHz", 0.5), ("10kHz", 0.75), ("20kHz", 1.0)]
    for label, pos in markers:
        x = ox + pos*w
        svg.add_line(x, oy, x, oy+10, stroke="black")
        svg.add_text(x, oy+30, label, text_anchor="middle", font_size=14)
        
    svg.add_text(400, 50, "Frequency Spectrum", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_graphic_eq(path):
    svg = SVG()
    # Faceplate
    svg.add_rect(100, 150, 600, 300, fill="#333", stroke="#999", stroke_width=4, rx=10)
    
    sliders = 10
    start_x = 150
    gap = 50
    
    # Random positions for "smiley face" curve
    positions = [0.8, 0.6, 0.4, 0.3, 0.2, 0.2, 0.3, 0.4, 0.6, 0.8] # 0 to 1 (1 is top)
    
    for i in range(sliders):
        x = start_x + i*gap
        # Slot
        svg.add_rect(x-5, 180, 10, 240, fill="#111")
        # Line
        svg.add_line(x, 180, x, 420, stroke="#555")
        # Fader Cap
        # Pos 0 = bottom (y=420), 1 = top (y=180)
        y_pos = 420 - positions[i] * 240
        svg.add_rect(x-10, y_pos-10, 20, 20, fill="#ddd", stroke="black")
        
        # Freq Label
        freqs = ["31", "63", "125", "250", "500", "1k", "2k", "4k", "8k", "16k"]
        svg.add_text(x, 440, freqs[i], fill="white", text_anchor="middle", font_size=12)

    svg.add_text(400, 100, "Graphic EQ (31 Band Style)", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def main():
    base = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    gen_filter_sweep(os.path.join(base, 'filter_sweep_automation.svg'))
    gen_filter_types(os.path.join(base, 'filter_types_chart.svg'))
    gen_masking(os.path.join(base, 'frequency_masking_diagram.svg'))
    gen_spectrum(os.path.join(base, 'frequency_spectrum_chart.svg'))
    gen_graphic_eq(os.path.join(base, 'graphic_eq_faceplate.svg'))
    
    print("Duplicate fix: 5 distinct images generated.")

if __name__ == "__main__":
    main()
