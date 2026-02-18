import re
import os

# Configuration
MD_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions/Volume 9/Volume9_Acoustics_Basic_Level_120Q.md"

# Existing Images (Reused from previous Vols)
IMG_RT60 = "/images/svg/reverb_rt60_graph.svg"
IMG_EARLY_REFL = "/images/svg/reverb_early_vs_late_reflections.svg"

# New Volume 9 Images (Acoustics, Treatment, Physics)
IMG_WAVELENGTH = "/images/svg/acoustics_wavelength_frequency_comparison.svg"
IMG_INV_SQUARE = "/images/svg/acoustics_inverse_square_law.svg"
IMG_REFLECTION = "/images/svg/acoustics_reflection_specular_vs_diffuse.svg"
IMG_STANDING_WAVE = "/images/svg/acoustics_standing_wave_room_mode.svg"
IMG_ABSORPTION_COEFF = "/images/svg/acoustics_absorption_coefficient_chart.svg"
IMG_BASS_TRAP = "/images/svg/acoustics_bass_trap_corner_placement.svg"
IMG_DIFFUSER_TYPES = "/images/svg/acoustics_diffuser_types_qrd_skyline.svg"
IMG_RT60_COMPARE = "/images/svg/acoustics_rt60_decay_room_comparison.svg"
IMG_MONITORING = "/images/svg/monitoring_speaker_triangle_placement.svg"
IMG_ISOLATION = "/images/svg/acoustics_sound_isolation_mass_air_mass.svg"


# Content Database (Subject Index 1-7, Question Index 1-10)
ENRICHMENT_DATA = {
    # SUBJECT 1: SOUND WAVE FUNDAMENTALS
    "1": {
        "6": { "expl": "Low frequencies (Bass) have massive wavelengths (meters long), which is why they are so hard to stop or absorb.", "img": IMG_WAVELENGTH, "quote": "Bass is big. - Physics" },
        "9": { "expl": "A 20Hz wave is ~17 meters long! That's why you need thick bass traps, not thin foam.", "img": IMG_WAVELENGTH, "quote": "Respect the wavelength. - Unknown" }
    },
    # SUBJECT 2: SPEED OF SOUND & DISTANCE
    "2": {
        "5": { "expl": "The Inverse Square Law: Double the distance = -6dB drop in sound pressure level.", "img": IMG_INV_SQUARE, "quote": "Distance is the best volume knob. - Unknown" },
        "7": { "expl": "Sound takes ~3ms to travel 1 meter (approx 1 foot per ms). This delay causes phase issues in recording.", "img": IMG_INV_SQUARE, "quote": "Time is distance. - Unknown" }
    },
    # SUBJECT 3: REFLECTION
    "3": {
        "4": { "expl": "Specular Reflection is like a mirror (laser beam). Diffuse Reflection scatters sound like a light bulb (soft glow).", "img": IMG_REFLECTION, "quote": "Scatter, don't just bounce. - Unknown" },
        "7": { "expl": "Flutter Echo happens between parallel walls. Angling walls or adding diffusers breaks up this repetitive bouncing.", "img": IMG_STANDING_WAVE, "quote": "Break the parallel. - Acoustics 101" }
    },
    # SUBJECT 4: ABSORPTION
    "4": {
        "4": { "expl": "Absorption Coefficient 1.0 means 100% absorption (open window). 0.0 means perfect reflection (concrete wall).", "img": IMG_ABSORPTION_COEFF, "quote": "Soak it up. - Unknown" },
        "6": { "expl": "Bass builds up in corners where pressure is highest and velocity is zero. That's why Bass Traps go in corners.", "img": IMG_BASS_TRAP, "quote": "Trap the corners. - Unknown" }
    },
    # SUBJECT 5: DIFFUSION
    "5": {
        "2": { "expl": "Diffusion scatters sound energy in time and space, keeping the room 'live' without harsh echoes.", "img": IMG_REFLECTION, "quote": "Keep the life. - Unknown" },
        "4": { "expl": "QRD (Quadratic Residue Diffusers) use mathematical well depths to scatter specific frequencies evenly.", "img": IMG_DIFFUSER_TYPES, "quote": "Math makes good sound. - Schroeder" },
        "9": { "expl": "Skyline diffusers (2D) scatter sound in all directions (hemisphere), distinct from QRDs which often scatter horizontally (1D).", "img": IMG_DIFFUSER_TYPES, "quote": "Cityscape on the ceiling. - Unknown" }
    },
    # SUBJECT 6: STANDING WAVES
    "6": {
        "1": { "expl": "Standing Waves (Modes) occur when a wave's length fits perfectly between two walls, causing huge bass peaks and nulls.", "img": IMG_STANDING_WAVE, "quote": "The room is an instrument. - Unknown" },
        "5": { "expl": "Room Modes are predictable based on dimensions. A 5m room has a mode at roughly 34Hz.", "img": IMG_STANDING_WAVE, "quote": "Calculate the problems. - Unknown" }
    },
    # SUBJECT 7: RT60
    "7": {
        "3": { "expl": "Mixing rooms need a short, controlled RT60 (~0.3s). Concert halls need long RT60 (~2.0s) for grandeur.", "img": IMG_RT60_COMPARE, "quote": "Control vs Character. - Unknown" },
        "6": { "expl": "A good room has a fairly flat RT60 across frequencies. Bad rooms have booming bass decay and dead highs.", "img": IMG_RT60_COMPARE, "quote": "Balance the decay. - Unknown" }
    }
}

def enrich_markdown():
    with open(MD_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by SUBJECTS
    subjects = re.split(r'(# SUBJECT \d+:.*)', content)
    
    new_content = ""
    current_subject_num = 0
    
    for section in subjects:
        header_match = re.match(r'# SUBJECT (\d+):', section)
        if header_match:
            current_subject_num = header_match.group(1)
            new_content += section
            continue
            
        if not current_subject_num:
            new_content += section
            continue
            
        questions = re.split(r'(### Question \d+)', section)
        
        for q_chunk in questions:
            if q_chunk.strip().startswith('### Question'):
                new_content += q_chunk
                q_num_match = re.search(r'### Question (\d+)', q_chunk)
                if q_num_match:
                    current_q_num = q_num_match.group(1)
                continue
                
            lines = q_chunk.split('\n')
            clean_lines = []
            for line in lines:
                if not any(line.strip().startswith(prefix) for prefix in ['**Expert Explanation:**', '**Image:**', '**Expert Quote:**']):
                    clean_lines.append(line)
            
            q_chunk = '\n'.join(clean_lines)
            
            if "**Answer:" in q_chunk:
                enrich_data = ENRICHMENT_DATA.get(str(current_subject_num), {}).get(str(current_q_num))
                
                if enrich_data:
                    injection = "\n"
                    if "expl" in enrich_data:
                        injection += f"\n**Expert Explanation:** {enrich_data['expl']}"
                    if "img" in enrich_data and enrich_data['img']:
                        injection += f"\n**Image:** ![\"Diagram\"]({enrich_data['img']})"
                    if "quote" in enrich_data and enrich_data['quote']:
                        injection += f"\n**Expert Quote:** \"{enrich_data['quote']}\""
                    
                    q_chunk = re.sub(r'(\*\*Answer: [A-D](.*?)\*\*)', r'\1' + injection, q_chunk)
                    
            new_content += q_chunk

    with open(MD_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Enrichment complete.")

if __name__ == "__main__":
    enrich_markdown()
