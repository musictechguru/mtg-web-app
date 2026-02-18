
import os
import re
import math

IMAGES_DIR = "public/images/explanations"
# Define placeholder file names to be strictly overwritten
PLACEHOLDERS = [
    "1176_faceplate.svg", "1176_compressor_visual.svg", "808_harmonic_saturation.svg",
    "absorption_coefficient_chart.svg", "active_vs_passive_crossover.svg",
    "pre_delay_chart.svg", "gain_reduction_meter.svg", "plate_transducer_diagram.svg",
    "true_peak_ceiling.svg", "delay_signal_flow.svg", "delay_feedback_loop.svg",
    "pultec_curve.svg", "reverb_components.svg", "reverb_pre_delay.svg",
    "limiter_brickwall.svg", "compressor_pumping.svg", "convolution_impulse.svg",
    "crossfeed_diagram.svg", "diffusion_density.svg", "early_reflections_diagram.svg",
    "echo_chamber_diagram.svg", "expander_graph.svg", "fairchild_670.svg",
    "hall_vs_room_shapes.svg", "hard_vs_soft_knee.svg", "headroom_diagram.svg",
    "inverse_square_law.svg", "lcr_panning.svg", "lede_room_design.svg",
    "level_matching_ab.svg", "linear_phase_vs_minimum.svg", "loudness_penalty_graph.svg",
    "lra_loudness_range.svg", "lufs_vs_peak_meter.svg", "makeup_gain_leveling.svg",
    "mastering_chain_order.svg", "mid_side_mastering.svg", "mirror_points_diagram.svg",
    "multiband_readout.svg", "open_window_absorption.svg", "optical_response_curve.svg",
    "parametric_sweep_cut.svg", "plate_vs_spring_diagram.svg", "qrd_diffuser_profile.svg",
    "reverb_build_up_time.svg", "room_size_diagram.svg", "room_mode_types.svg",
    "speed_of_sound_chart.svg", "ssl_bus_comp.svg", "standing_wave_nodes.svg",
    "stereo_panning_arc.svg", "tape_echo_heads.svg", "tempo_synced_reverb.svg", "wavelength_formula.svg"
]

# --- SVG UTILS ---

def create_svg_header(width=800, height=500, title="Diagram"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
      text {{ font-family: 'Inter', system-ui, -apple-system, sans-serif; }}
      .bg {{ fill: #f8fafc; }}
      .grid {{ stroke: #e2e8f0; stroke-width: 1; }}
      .axis {{ stroke: #94a3b8; stroke-width: 2; }}
      .line-primary {{ fill: none; stroke: #3b82f6; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }}
      .line-secondary {{ fill: none; stroke: #64748b; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 6 4; }}
      .line-accent {{ fill: none; stroke: #ef4444; stroke-width: 3; stroke-linecap: round; }}
      .text-title {{ font-size: 24px; font-weight: 600; fill: #1e293b; text-anchor: middle; }}
      .text-label {{ font-size: 14px; font-weight: 400; fill: #475569; text-anchor: middle; }}
      .box {{ fill: #eff6ff; stroke: #3b82f6; stroke-width: 2; rx: 8; }}
      .box-text {{ font-size: 16px; font-weight: 600; fill: #1e293b; text-anchor: middle; dominant-baseline: middle; }}
    </style>
  </defs>
  <rect width="{width}" height="{height}" class="bg" />
  <text x="{width/2}" y="40" class="text-title">{title.replace('_', ' ').title()}</text>
'''

def create_bg_grid(width=800, height=500, margin=60):
    svg = ""
    # Grid lines
    for i in range(1, 10):
        # Vertical
        x = margin + (width - 2*margin) * (i/10)
        svg += f'<line x1="{x}" y1="{height-margin}" x2="{x}" y2="{margin}" class="grid" />'
        # Horizontal
        y = margin + (height - 2*margin) * (i/10)
        svg += f'<line x1="{margin}" y1="{y}" x2="{width-margin}" y2="{y}" class="grid" />'
    
    # Axes
    svg += f'<line x1="{margin}" y1="{height-margin}" x2="{width-margin}" y2="{height-margin}" class="axis" />' # X
    svg += f'<line x1="{margin}" y1="{height-margin}" x2="{margin}" y2="{margin}" class="axis" />' # Y
    return svg

def create_footer():
    return "</svg>"

# --- GENERATORS ---

def generate_graph_xy(title, curve_type="linear"):
    svg = create_svg_header(title=title)
    svg += create_bg_grid()
    
    margin = 60
    w = 800
    h = 500
    graph_w = w - 2*margin
    graph_h = h - 2*margin
    
    # Generate generic curve data points
    points = []
    if curve_type == "linear":
        points = [(margin, h-margin), (w-margin, margin)]
    elif curve_type == "log": # Like EQ or Frequency
        for i in range(101):
            x = margin + (graph_w * (i/100))
            y = (h - margin) - (graph_h * math.log10(1 + 9*(i/100))) 
            points.append((x, y))
    elif curve_type == "bell": # EQ Cut/Boost
        for i in range(101):
            x = margin + (graph_w * (i/100))
            # Bell curve centered
            rel_x = (i - 50) / 15
            y = (h - margin) - (graph_h * 0.8 * math.exp(-0.5 * rel_x**2)) 
            points.append((x, y))
    elif curve_type == "knee": # Compressor
        points = [
            (margin, h-margin),
            (margin + graph_w*0.5, h-margin - graph_h*0.5), # Knee point
            (w-margin, h-margin - graph_h*0.6) # Compressed slope
        ]
    elif curve_type == "adsr":
        points = [
            (margin, h-margin),
            (margin + graph_w*0.1, margin), # Attack
            (margin + graph_w*0.25, h-margin - graph_h*0.6), # Decay
            (margin + graph_w*0.6, h-margin - graph_h*0.6), # Sustain
            (w-margin, h-margin) # Release
        ]

    # Draw path
    if points:
        d = f"M {points[0][0]} {points[0][1]}"
        for p in points[1:]:
            d += f" L {p[0]} {p[1]}"
        svg += f'<path d="{d}" class="line-primary" />'
        
    svg += create_footer()
    return svg

def generate_signal_flow(title):
    svg = create_svg_header(title=title)
    # Simple 3-box flow
    boxes = ["Input", "Process", "Output"]
    bg_w = 800
    box_w = 160
    box_h = 80
    gap = 80
    start_x = (bg_w - (len(boxes)*box_w + (len(boxes)-1)*gap)) / 2
    y = 250 - box_h/2
    
    for i, txt in enumerate(boxes):
        x = start_x + i*(box_w + gap)
        svg += f'<rect x="{x}" y="{y}" width="{box_w}" height="{box_h}" class="box" />'
        svg += f'<text x="{x + box_w/2}" y="{y + box_h/2}" class="box-text">{txt}</text>'
        
        # Arrow to next
        if i < len(boxes) - 1:
            arrow_start = x + box_w
            arrow_end = x + box_w + gap
            mid_y = y + box_h/2
            svg += f'<line x1="{arrow_start}" y1="{mid_y}" x2="{arrow_end}" y2="{mid_y}" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />'
            # Manual arrow head
            svg += f'<path d="M {arrow_end-10} {mid_y-5} L {arrow_end} {mid_y} L {arrow_end-10} {mid_y+5}" fill="none" stroke="#94a3b8" stroke-width="2" />'

    svg += create_footer()
    return svg

def generate_faceplate(title):
    w, h = 800, 300
    svg = create_svg_header(width=w, height=h, title=title)
    # Draw rack unit faceplate
    svg += f'<rect x="20" y="80" width="{w-40}" height="200" rx="4" fill="#334155" stroke="#1e293b" stroke-width="2" />'
    # Screws
    svg += f'<circle cx="40" cy="100" r="5" fill="#cbd5e1" />'
    svg += f'<circle cx="{w-40}" cy="100" r="5" fill="#cbd5e1" />'
    svg += f'<circle cx="40" cy="{h-40}" r="5" fill="#cbd5e1" />'
    svg += f'<circle cx="{w-40}" cy="{h-40}" r="5" fill="#cbd5e1" />'
    
    # Generic Knobs
    knobs = ["Input", "Output", "Attack", "Release"]
    spacing = (w - 100) / len(knobs)
    start_x = 100
    
    for i, label in enumerate(knobs):
        x = start_x + i*spacing
        y = 180
        # Knob body
        svg += f'<circle cx="{x}" cy="{y}" r="30" fill="#1e293b" stroke="#cbd5e1" stroke-width="2" />'
        # Indicator
        svg += f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y-20}" stroke="#ef4444" stroke-width="3" />'
        # Label
        svg += f'<text x="{x}" y="{y+50}" class="text-label" fill="#f8fafc" style="fill: white;">{label}</text>'

    svg += create_footer()
    return svg

# --- STYLE IMPROVER ---

def improve_existing_svg(content):
    # Regex replacements for style
    
    # 1. Update Font
    content = re.sub(r'font-family="[^"]*"', 'font-family="Inter, system-ui, sans-serif"', content)
    
    # 2. Update Background Rect (if generic white/gray)
    content = re.sub(r'fill="#f8f9fa"', 'fill="#f8fafc"', content)
    content = re.sub(r'fill="#ffffff"', 'fill="#f8fafc"', content)
    
    # 3. Update Stroke Colors (standardize black/grey to slate)
    content = re.sub(r'stroke="#333"', 'stroke="#334155"', content)
    content = re.sub(r'stroke="#000"', 'stroke="#1e293b"', content)
    
    # 4. Text Colors
    content = re.sub(r'fill="black"', 'fill="#1e293b"', content)
    content = re.sub(r'fill="#000"', 'fill="#1e293b"', content)
    
    # 5. Make lines thicker if too thin
    content = re.sub(r'stroke-width="1"', 'stroke-width="2"', content)
    
    # 6. Primary Blue for generic blue
    content = re.sub(r'stroke="blue"', 'stroke="#3b82f6"', content)
    content = re.sub(r'fill="blue"', 'fill="#3b82f6"', content)
    
    # 7. Accent Red for generic red
    content = re.sub(r'stroke="red"', 'stroke="#ef4444"', content)
    content = re.sub(r'fill="red"', 'fill="#ef4444"', content)
    
    return content

# --- MAIN ---

def main():
    print("Starting SVG Improvement...")
    count_generated = 0
    count_improved = 0
    
    files = os.listdir(IMAGES_DIR)
    
    for filename in files:
        if not filename.endswith(".svg"):
            continue
            
        path = os.path.join(IMAGES_DIR, filename)
        
        # Check if it needs generation
        is_placeholder = False
        if filename in PLACEHOLDERS:
            is_placeholder = True
        else:
            # Also check size/content as backup checks
            if os.path.getsize(path) < 500:
                is_placeholder = True
        
        new_content = ""
        
        if is_placeholder:
            # Determine type
            if any(x in filename for x in ["compressor", "limiter", "gate", "knee", "ratio", "reduction"]):
                new_content = generate_graph_xy(filename.replace(".svg", ""), "knee")
            elif any(x in filename for x in ["eq", "curve", "filter", "response", "spectrum", "pultec"]):
                new_content = generate_graph_xy(filename.replace(".svg", ""), "bell")
            elif any(x in filename for x in ["envelope", "adsr", "transient", "attack"]):
                new_content = generate_graph_xy(filename.replace(".svg", ""), "adsr")
            elif any(x in filename for x in ["signal", "flow", "chain", "routing", "diagram"]):
                 new_content = generate_signal_flow(filename.replace(".svg", ""))
            elif "faceplate" in filename or "console" in filename:
                 new_content = generate_faceplate(filename.replace(".svg", ""))
            else:
                 # Default to generic graph
                 new_content = generate_graph_xy(filename.replace(".svg", ""), "log")
            
            print(f"GENERATED: {filename}")
            count_generated += 1
            
        else:
            # Styling existing
            with open(path, 'r') as f:
                content = f.read()
            
            new_content = improve_existing_svg(content)
            # Only count if changed (simple check)
            if new_content != content:
                print(f"IMPROVED: {filename}")
                count_improved += 1
        
        # Write back
        if new_content:
            with open(path, 'w') as f:
                f.write(new_content)

    print(f"\nDone! Generated {count_generated} placeholders. Improved {count_improved} existing files.")

if __name__ == "__main__":
    main()
