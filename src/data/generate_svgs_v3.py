import os
import math

class SVG:
    def __init__(self, width=800, height=600):
        self.width = width
        self.height = height
        self.elements = []
        self.defs = []

    def add_rect(self, x, y, w, h, fill="none", stroke="none", stroke_width=0, rx=0, opacity=1):
        self.elements.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" />')

    def add_circle(self, cx, cy, r, fill="none", stroke="none", stroke_width=0, opacity=1):
        self.elements.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" />')

    def add_line(self, x1, y1, x2, y2, stroke="black", stroke_width=1, opacity=1, stroke_dasharray=""):
        dash = f'stroke-dasharray="{stroke_dasharray}"' if stroke_dasharray else ""
        self.elements.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" {dash} />')

    def add_path(self, d, fill="none", stroke="none", stroke_width=0, opacity=1):
        self.elements.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{stroke_width}" opacity="{opacity}" />')

    def add_text(self, x, y, text, font_size=20, fill="black", text_anchor="start", font_weight="normal", transform=""):
        t_attr = f'transform="{transform}"' if transform else ""
        self.elements.append(f'<text x="{x}" y="{y}" font-family="Arial, sans-serif" font-size="{font_size}" fill="{fill}" text-anchor="{text_anchor}" font-weight="{font_weight}" {t_attr}>{text}</text>')

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

def draw_graph_frame(svg, title, x_label, y_label):
    pad = 60
    w = svg.width - 2*pad
    h = svg.height - 2*pad
    ox, oy = pad, svg.height - pad
    
    svg.add_text(svg.width/2, pad/2 + 10, title, font_size=24, text_anchor="middle", font_weight="bold")
    svg.add_line(ox, oy, ox+w, oy, stroke="#333", stroke_width=2) 
    svg.add_line(ox, oy, ox, oy-h, stroke="#333", stroke_width=2) 
    svg.add_text(ox+w/2, oy+40, x_label, font_size=16, text_anchor="middle")
    # Correct rotation around the text point
    svg.add_text(ox-40, oy-h/2, y_label, font_size=16, text_anchor="middle", transform=f"rotate(-90, {ox-40}, {oy-h/2})")
    return ox, oy, w, h

def gen_rt60(path):
    s = SVG()
    ox, oy, w, h = draw_graph_frame(s, "RT60 Decay", "Time (s)", "Level (dB)")
    points = []
    for i in range(101):
        x = i / 100 
        y = math.exp(-3 * x) 
        px = ox + x * w
        py = oy - y * h
        points.append((px, py))
    path_d = f"M {points[0][0]} {points[0][1]}"
    for p in points[1:]: path_d += f" L {p[0]} {p[1]}"
    s.add_path(path_d, stroke="#3b82f6", stroke_width=4)
    s.add_line(ox, oy - h*0.01, ox+w, oy-h*0.01, stroke="#ef4444", stroke_width=2, stroke_dasharray="5,5") 
    s.add_text(ox+w+10, oy-h*0.01, "-60dB", font_size=14, fill="#ef4444")
    s.save(path)

def gen_compression(path):
    s = SVG()
    ox, oy, w, h = draw_graph_frame(s, "Compression Ratio", "Input (dB)", "Output (dB)")
    threshold_x = ox + w * 0.5
    threshold_y = oy - h * 0.5
    s.add_line(ox, oy, ox+w, oy-h, stroke="#ddd", stroke_width=2, stroke_dasharray="5,5")
    s.add_line(ox, oy, threshold_x, threshold_y, stroke="#3b82f6", stroke_width=4)
    end_x = ox + w
    end_y = threshold_y - (h * 0.5 * 0.25)
    s.add_line(threshold_x, threshold_y, end_x, end_y, stroke="#ef4444", stroke_width=4)
    s.add_text(threshold_x, threshold_y + 20, "Threshold", text_anchor="middle", font_size=14)
    s.save(path)

def gen_eq_bell(path):
    s = SVG()
    ox, oy, w, h = draw_graph_frame(s, "Parametric EQ (Bell)", "Frequency (Hz)", "Gain (dB)")
    center_x = ox + w/2
    peak_y = oy - h * 0.8
    base_y = oy - h/2 
    s.add_line(ox, base_y, ox+w, base_y, stroke="#ccc", stroke_width=1)
    points = []
    for i in range(101):
        x_norm = i/100
        px = ox + x_norm * w
        dx = (x_norm - 0.5) * 6
        y_val = math.exp(-dx*dx)
        py = base_y - (y_val * (base_y - peak_y))
        points.append((px, py))
    path_d = f"M {points[0][0]} {points[0][1]}"
    for p in points[1:]: path_d += f" L {p[0]} {p[1]}"
    s.add_path(path_d, stroke="#10b981", stroke_width=4, fill="none")
    s.save(path)

def gen_cable_xlr(path):
    s = SVG()
    cx, cy, r = 400, 300, 150
    s.add_circle(cx, cy, r, stroke="#333", stroke_width=4, fill="#ddd")
    s.add_circle(cx - 60, cy - 40, 20, fill="black")
    s.add_text(cx - 60, cy - 70, "1 (Gnd)", text_anchor="middle")
    s.add_circle(cx + 60, cy - 40, 20, fill="black")
    s.add_text(cx + 60, cy - 70, "2 (Hot)", text_anchor="middle")
    s.add_circle(cx, cy + 80, 20, fill="black")
    s.add_text(cx, cy + 110, "3 (Cold)", text_anchor="middle")
    s.add_text(cx, 550, "XLR Pinout (Male)", text_anchor="middle", font_size=24, font_weight="bold")
    s.save(path)

def gen_waveform_sine(path):
    s = SVG()
    ox, oy, w, h = draw_graph_frame(s, "Sine Wave", "Time", "Amplitude")
    mid_y = oy - h/2
    s.add_line(ox, mid_y, ox+w, mid_y, stroke="#ccc", stroke_width=1)
    points = []
    for i in range(201):
        x_norm = i/200
        px = ox + x_norm * w
        py = mid_y - math.sin(x_norm * 4 * math.pi) * (h/2 * 0.8)
        points.append((px, py))
    path_d = f"M {points[0][0]} {points[0][1]}"
    for p in points[1:]: path_d += f" L {p[0]} {p[1]}"
    s.add_path(path_d, stroke="#8b5cf6", stroke_width=4, fill="none")
    s.save(path)

def gen_placeholder(path, name):
    s = SVG()
    s.add_rect(50, 50, 700, 500, stroke="#ccc", stroke_width=4, rx=20)
    s.add_text(400, 300, name, text_anchor="middle", font_size=20, fill="#666")
    s.save(path)

def main():
    base = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public'
    if not os.path.exists('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/missing_images_list.txt'):
        print("Missing list not found.")
        return

    with open('/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/missing_images_list.txt', 'r') as f:
        missing = [l.strip() for l in f if l.strip()]

    print(f"Generating {len(missing)} images...")
    for rel_path in missing:
        full_path = os.path.join(base, rel_path.lstrip('/'))
        fname = os.path.basename(full_path)
        
        if 'rt60' in fname or 'decay' in fname:
            gen_rt60(full_path)
        elif 'compression' in fname or 'ratio' in fname or 'threshold' in fname:
            gen_compression(full_path)
        elif 'eq' in fname or 'filter' in fname or 'bell' in fname:
            gen_eq_bell(full_path)
        elif 'xlr' in fname or 'pinout' in fname:
            gen_cable_xlr(full_path)
        elif 'waveform' in fname or 'sine' in fname:
            gen_waveform_sine(full_path)
        else:
            gen_placeholder(full_path, fname)
            
    print("Done.")

if __name__ == "__main__":
    main()
