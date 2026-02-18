import os
import math
import random

# --- SVG Class ---
class SVG:
    def __init__(self, width=800, height=600):
        self.width = width
        self.height = height
        self.elements = []

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
            f'<rect x="0" y="0" width="{self.width}" height="{self.height}" fill="#f8f9fa" />',
            "".join(self.elements),
            '</svg>'
        ]
        with open(path, 'w') as f:
            f.write("".join(content))
        print(f"Generated: {path}")

# --- Generators ---

def gen_hf_damping(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333", stroke_width=2) # Time
    svg.add_line(ox, oy, ox, oy-h, stroke="#333", stroke_width=2) # Level
    
    # Low Freq Decay (Long)
    svg.add_path(f"M {ox} {oy-350} Q {ox+300} {oy-300} {ox+600} {oy-50}", stroke="blue", stroke_width=4, fill="none")
    svg.add_text(ox+400, oy-100, "Low Frequencies (Long Decay)", fill="blue")

    # High Freq Decay (Short - Damped)
    svg.add_path(f"M {ox} {oy-350} Q {ox+150} {oy-300} {ox+250} {oy}", stroke="red", stroke_width=4, fill="none")
    svg.add_text(ox+150, oy-20, "High Frequencies (Short Decay)", fill="red")
    
    svg.add_text(400, 50, "HF Damping in Reverb", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_headphones(path):
    svg = SVG()
    
    # Open Back
    cx1 = 200
    svg.add_circle(cx1, 300, 80, stroke="#333", stroke_width=4, fill="#ddd")
    # Grille lines
    for i in range(-60, 70, 20):
        svg.add_line(cx1+i, 240, cx1+i, 360, stroke="#666", stroke_width=2)
    svg.add_text(cx1, 420, "Open Back", text_anchor="middle", font_weight="bold")
    svg.add_text(cx1, 450, "Natural, Leaks Sound", text_anchor="middle", fill="#666", font_size=14)

    # Closed Back
    cx2 = 600
    svg.add_circle(cx2, 300, 80, stroke="#333", stroke_width=4, fill="#333") # Solid shell
    svg.add_circle(cx2, 300, 40, stroke="#555", stroke_width=2, fill="#444") # Detail
    svg.add_text(cx2, 420, "Closed Back", text_anchor="middle", font_weight="bold")
    svg.add_text(cx2, 450, "Isolated, Trap Bass", text_anchor="middle", fill="#666", font_size=14)
    
    svg.add_text(400, 50, "Headphone Types", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_mix_knob(path):
    svg = SVG()
    cx, cy = 400, 300
    svg.add_circle(cx, cy, 100, stroke="#333", stroke_width=4, fill="#eee")
    svg.add_line(cx, cy, cx+70, cy-70, stroke="#333", stroke_width=8) # Indicator at 50%
    
    svg.add_text(250, 310, "DRY (0%)", text_anchor="end", font_weight="bold")
    svg.add_text(550, 310, "WET (100%)", text_anchor="start", font_weight="bold")
    
    svg.add_text(400, 50, "Wet/Dry Mix Knob", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_crossover(path):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333") # Freq
    
    # Low Pass
    svg.add_path(f"M {ox} {oy-300} L {ox+200} {oy-300} L {ox+300} {oy-150} L {ox+400} {oy}", stroke="red", stroke_width=4, fill="none")
    svg.add_text(ox+100, oy-310, "Low Drivers (Woofer)", fill="red")
    
    # High Pass
    svg.add_path(f"M {ox+600} {oy-300} L {ox+400} {oy-300} L {ox+300} {oy-150} L {ox+200} {oy}", stroke="blue", stroke_width=4, fill="none")
    svg.add_text(ox+500, oy-310, "High Drivers (Tweeter)", fill="blue")
    
    # Crossover Point
    svg.add_line(ox+300, oy, ox+300, oy-400, stroke="#666", stroke_dasharray="5,5")
    svg.add_text(ox+300, oy-410, "Crossover Frequency", text_anchor="middle")
    
    svg.add_text(400, 50, "Active vs Passive Crossover", font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_compressor_types(path, type_name):
    svg = SVG()
    
    svg.add_rect(200, 150, 400, 300, fill="#ddd", stroke="#333", rx=10)
    svg.add_text(400, 50, f"{type_name} Compressor", font_size=24, text_anchor="middle", font_weight="bold")
    
    if "LA-2A" in type_name:
        # 2 big knobs
        svg.add_circle(300, 300, 40, fill="#333")
        svg.add_text(300, 360, "Gain", text_anchor="middle")
        svg.add_circle(500, 300, 40, fill="#333")
        svg.add_text(500, 360, "Peak Reduction", text_anchor="middle")
        svg.add_text(400, 100, "Optical (Tube) - Smooth, Slow Attack", text_anchor="middle", fill="#666")
    elif "VCA" in type_name:
        # Many knobs
        for i in range(5):
            x = 250 + i*75
            svg.add_circle(x, 300, 25, fill="#333")
        svg.add_text(400, 100, "Voltage Controlled Amp - Fast, Clean, Snappy", text_anchor="middle", fill="#666")
    elif "Vari-Mu" in type_name:
        svg.add_rect(250, 250, 300, 100, fill="#333") # Tube visualization
        svg.add_text(400, 300, "TUBE GAIN REDUCTION", fill="white", text_anchor="middle")
        svg.add_text(400, 100, "Variable Mu (Tube) - Glue, Harmonic Color", text_anchor="middle", fill="#666")
        
    svg.save(path)

def gen_routing(path, mode):
    svg = SVG()
    
    # Channel Strip
    svg.add_rect(100, 100, 100, 400, fill="#eee", stroke="#333")
    svg.add_text(150, 130, "Channel 1", text_anchor="middle")
    
    if mode == "aux":
        # Aux Send
        svg.add_circle(150, 200, 20, fill="blue")
        svg.add_text(150, 240, "Aux Send", text_anchor="middle", fill="blue")
        
        # Bus
        svg.add_rect(400, 100, 100, 400, fill="#ddd", stroke="blue")
        svg.add_text(450, 130, "Reverb Bus", text_anchor="middle", fill="blue")
        
        # Connection
        svg.add_path("M 170 200 L 400 200", stroke="blue", stroke_width=2, stroke_dasharray="5,5")
        svg.add_text(300, 190, "Original signal stays + Copy sent", font_size=14, text_anchor="middle", fill="blue")
        
        svg.add_text(400, 50, "Aux Send Routing", font_size=24, text_anchor="middle", font_weight="bold")

    elif mode == "insert":
        # Insert Point
        svg.add_rect(120, 250, 60, 40, fill="red", stroke="black")
        svg.add_text(150, 275, "Insert", text_anchor="middle", fill="white")
        svg.add_text(400, 50, "Insert Routing", font_size=24, text_anchor="middle", font_weight="bold")
    
    svg.save(path)

def gen_digital_proto(path, label):
    svg = SVG()
    svg.add_rect(200, 200, 400, 100, fill="#333", rx=10)
    
    if "ADAT" in label:
         svg.add_rect(250, 230, 40, 40, fill="black", stroke="#555") # Optical port
         svg.add_text(400, 260, "ADAT (Optical) - 8 Ch", fill="white", text_anchor="middle")
    
    svg.add_text(400, 50, label, font_size=24, text_anchor="middle", font_weight="bold")
    svg.save(path)

def gen_delays(path, mode):
    svg = SVG()
    
    if "Ping Pong" in mode:
        svg.add_line(100, 300, 700, 300, stroke="#ccc")
        # Bounces
        svg.add_circle(200, 300, 20, fill="blue"); svg.add_text(200, 340, "L", text_anchor="middle")
        svg.add_circle(300, 300, 15, fill="red"); svg.add_text(300, 340, "R", text_anchor="middle")
        svg.add_circle(400, 300, 10, fill="blue"); svg.add_text(400, 340, "L", text_anchor="middle")
        svg.add_circle(500, 300, 5, fill="red"); svg.add_text(500, 340, "R", text_anchor="middle")
        svg.add_text(400, 100, "Ping Pong Delay (Stereo Bounce)", font_size=24, text_anchor="middle", font_weight="bold")

    svg.save(path)

def gen_limiter(path, mode):
    svg = SVG()
    ox, oy, w, h = 100, 500, 600, 400
    svg.add_line(ox, oy, ox+w, oy, stroke="#333")
    svg.add_line(ox, oy, ox, oy-h, stroke="#333")
    
    limit_y = oy - 350
    svg.add_line(ox, limit_y, ox+w, limit_y, stroke="red", stroke_width=4)
    svg.add_text(ox+w+20, limit_y, "Ceiling", fill="red")
    
    if mode == "brickwall":
        svg.add_path(f"M {ox} {oy} L {ox+200} {limit_y} L {ox+600} {limit_y}", stroke="blue", stroke_width=2)
        svg.add_text(400, 50, "Brickwall Limiter", font_size=24, text_anchor="middle", font_weight="bold")
    elif mode == "isp":
        # Inter-sample peaks
        svg.add_path(f"M {ox} {oy} L {ox+100} {limit_y} L {ox+200} {limit_y+50} L {ox+300} {limit_y-50}", stroke="blue", stroke_width=2) # Digital samples
        svg.add_circle(ox+300, limit_y-50, 5, fill="red")
        svg.add_text(ox+320, limit_y-70, "Analogue Peak > Digital Ceiling", fill="red", font_size=14)
        svg.add_text(400, 50, "Inter-Sample Peaks (True Peak)", font_size=24, text_anchor="middle", font_weight="bold")
        
    svg.save(path)

def main():
    base = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/images/explanations'
    
    # Map of generators
    gen_hf_damping(os.path.join(base, 'hf_damping_curve.svg'))
    gen_headphones(os.path.join(base, 'open_vs_closed_headphones.svg'))
    gen_mix_knob(os.path.join(base, 'mix_knob_wet_dry.svg'))
    gen_crossover(os.path.join(base, 'active_vs_passive_crossover.svg'))
    
    gen_compressor_types(os.path.join(base, 'la2a_faceplate.svg'), "LA-2A")
    gen_compressor_types(os.path.join(base, '1176_faceplate.svg'), "1176 FET") # Re-gen
    gen_compressor_types(os.path.join(base, 'vca_compressor_icon.svg'), "VCA")
    gen_compressor_types(os.path.join(base, 'varimu_curve.svg'), "Vari-Mu")
    
    gen_routing(os.path.join(base, 'aux_send_routing.svg'), "aux")
    gen_routing(os.path.join(base, 'parallel_routing.svg'), "aux")
    
    gen_digital_proto(os.path.join(base, 'adat_optical_pipe.svg'), "ADAT Optical")
    
    gen_delays(os.path.join(base, 'ping_pong_delay.svg'), "Ping Pong")
    
    gen_limiter(os.path.join(base, 'brickwall_limiter.svg'), "brickwall")
    gen_limiter(os.path.join(base, 'inter_sample_peaks.svg'), "isp")
    gen_limiter(os.path.join(base, 'true_peak_limiting.svg'), "isp")

    # Misc specific ones
    # (Reusing existing generators for multiple filenames to ensure coverage)
    gen_hf_damping(os.path.join(base, 'delay_vs_reverb.svg')) 
    gen_crossover(os.path.join(base, 'surgical_vs_musical_q.svg')) 

    # --- FINAL BATCH STRAGGLERS ---
    
    # 1. Mid Side
    s = SVG()
    s.add_circle(200, 300, 50, stroke="blue", stroke_width=2); s.add_text(200, 380, "Mid (Cardioid)", text_anchor="middle")
    s.add_circle(600, 300, 50, stroke="red", stroke_width=2); s.add_circle(600, 300, 20, stroke="red"); s.add_text(600, 380, "Side (Fig-8)", text_anchor="middle")
    s.add_text(400, 50, "Mid-Side Microphone Setup", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(os.path.join(base, 'mid_side_diagram.svg'))
    s.save(os.path.join(base, 'mid_side_encoding.svg'))

    # 2. Crossfade
    s = SVG(); ox, oy, w, h = 100, 500, 600, 400
    s.add_line(ox, oy, ox+w, oy, stroke="#333")
    s.add_path(f"M {ox} {oy-300} L {ox+600} {oy}", stroke="blue", stroke_width=4); s.add_text(ox+100, oy-320, "Fade Out (A)", fill="blue")
    s.add_path(f"M {ox} {oy} L {ox+600} {oy-300}", stroke="red", stroke_width=4); s.add_text(ox+500, oy-320, "Fade In (B)", fill="red")
    s.add_text(400, 50, "Linear Crossfade", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(os.path.join(base, 'crossfade_curve.svg'))

    # 3. Comping Lanes
    s = SVG()
    for i in range(4):
        y = 100 + i*80
        s.add_rect(100, y, 600, 60, fill="#eee", stroke="#333")
        s.add_text(60, y+40, f"Take {i+1}", font_size=14)
        if i == 1: s.add_rect(300, y, 200, 60, fill="#bbdefb", stroke="blue", stroke_width=2) # Selected
    s.add_rect(100, 450, 600, 60, fill="#ddd", stroke="black", stroke_width=2)
    s.add_rect(300, 450, 200, 60, fill="#bbdefb")
    s.add_text(60, 490, "Comp", font_weight="bold")
    s.add_text(400, 50, "Vocal Comping", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(os.path.join(base, 'vocal_comping_lanes.svg'))

    # 4. Phase Correlation Meter (Specific)
    s = SVG()
    s.add_rect(200, 400, 400, 50, fill="#eee", stroke="#333")
    s.add_line(400, 400, 400, 450, stroke="#333") # 0
    s.add_rect(580, 405, 10, 40, fill="green"); s.add_text(620, 435, "+1", fill="green")
    s.add_rect(210, 405, 10, 40, fill="red"); s.add_text(180, 435, "-1", fill="red")
    s.add_circle(500, 425, 10, fill="black") # Indicator
    s.add_text(400, 350, "Correlation Meter", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(os.path.join(base, 'phase_correlation_meter.svg'))

    # 5. Room Modes / Diffusor
    # Reusing skyline logic roughly for diffusion
    s = SVG()
    for i in range(20):
        h = random.randint(10, 100)
        s.add_rect(100 + i*30, 300-h, 25, h, fill="#aaa")
    s.add_line(100, 350, 200, 450, stroke="blue", stroke_width=2) # In
    s.add_line(300, 450, 400, 350, stroke="red", stroke_width=2, stroke_dasharray="5,5") # Out scatter
    s.add_line(320, 460, 420, 360, stroke="red", stroke_width=2, stroke_dasharray="5,5")
    s.add_text(400, 50, "Diffusion Scattering", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(os.path.join(base, 'diffusion_scattering.svg'))

    # 6. THD Graph
    s = SVG(); ox, oy, w, h = 100, 500, 600, 400
    s.add_line(ox, oy, ox+w, oy, stroke="#333")
    s.add_line(ox+100, oy, ox+100, oy-300, stroke="blue", stroke_width=8); s.add_text(ox+80, oy-310, "Fund", fill="blue")
    s.add_line(ox+200, oy, ox+200, oy-100, stroke="red", stroke_width=4); s.add_text(ox+180, oy-110, "2nd", fill="red")
    s.add_line(ox+300, oy, ox+300, oy-50, stroke="red", stroke_width=4); s.add_text(ox+280, oy-60, "3rd", fill="red")
    s.add_text(400, 50, "Total Harmonic Distortion (THD)", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(os.path.join(base, 'thd_graph.svg'))
    s.save(os.path.join(base, 'fet_harmonic_distortion.svg')) # Similar enough visual

    # 7. Gates & Chopping
    s = SVG(); ox, oy, w, h = 100, 500, 600, 400
    s.add_line(ox, oy, ox+w, oy, stroke="#333")
    s.add_line(ox, oy, ox+200, oy, stroke="green", stroke_width=4) # Closed
    s.add_line(ox+200, oy-300, ox+400, oy-300, stroke="green", stroke_width=4) # Open
    s.add_line(ox+400, oy, ox+600, oy, stroke="green", stroke_width=4) # Closed
    s.add_line(ox, oy-150, ox+600, oy-150, stroke="red", stroke_dasharray="5,5"); s.add_text(ox+610, oy-150, "Threshold", fill="red")
    s.add_text(400, 50, "Noise Gate Action", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(os.path.join(base, 'noise_gate_graph.svg'))

    # 8. Misc
    s = SVG()
    s.add_rect(100, 100, 600, 400, fill="#eee")
    for r in range(4):
        for c in range(4):
            s.add_rect(200+c*100, 150+r*80, 80, 60, fill="#666", stroke="black")
    s.add_text(400, 50, "MPC Style Pads", font_size=24, text_anchor="middle", font_weight="bold")
    s.save(os.path.join(base, 'sample_chopping_pads.svg'))
    s.save(os.path.join(base, 'midi_controller_layout.svg')) # Basic layout works

    print("Batch 5: Final Stragglers complete.")

if __name__ == "__main__":
    main()
