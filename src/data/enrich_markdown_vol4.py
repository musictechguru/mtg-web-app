import re
import os

# Configuration
MD_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions/Volume 4/Volume4_Basic_Level_All_Subjects_120Q.md"

# Existing Images (Audio Theory & General)
IMG_ALIASING = "/images/diagram_aliasing_v2.png"
IMG_NYQUIST = "/images/diagram_nyquist_v2.png"
IMG_CD = "/images/diagram_cd_specs_v2.png"
IMG_BIT_DEPTH = "/images/svg/bit_depth_range.svg" # Found in search
IMG_DITHER = "/images/svg/dither_noise.svg"       # Found in search
IMG_QUANT_GRID = "/images/svg/midi_quantization.svg"
IMG_LOOPS = "/images/svg/midi_piano_roll.svg"     # Placeholder for now? Or just use Piano Roll for seq

# New Volume 4 Images (Sampling & Sequencing)
IMG_ZEROX = "/images/svg/sample_zero_crossing_zoom.svg"
IMG_FADES = "/images/svg/sample_fade_types.svg"
IMG_NORM = "/images/svg/sample_normalization_levels.svg"
IMG_DC = "/images/svg/sample_dc_offset_correction.svg"
IMG_QUANT_ERR = "/images/svg/digital_quantization_error_steps.svg"
IMG_LOOP_XFADE = "/images/svg/sample_looping_crossfade.svg"
IMG_MULTISAMP = "/images/svg/sampler_multisample_map.svg"
IMG_ROUNDROBIN = "/images/svg/sampler_round_robin_cycle.svg"
IMG_TIMESTRETCH = "/images/svg/timestretch_algorithm_concept.svg"
IMG_MP3_WAV = "/images/svg/file_format_compression_quality.svg"


# Content Database (Subject Index 1-8, Question Index 1-10)
ENRICHMENT_DATA = {
    # SUBJECT 1: SAMPLE EDITING BASICS
    "1": {
        "2": { "expl": "A Zero-Crossing Point is where the waveform line crosses the center (0dB) axis. Editing here ensures the speaker cone is at rest, preventing clicks.", "img": IMG_ZEROX, "quote": "Always cut at zero. - Unknown" },
        "3": { "expl": "If you cut a sample when the waveform is high or low (not at zero), the speaker snaps back to position instantly, creating an audible 'click'.", "img": IMG_ZEROX, "quote": "Clicks are the enemy. - Unknown" },
        "4": { "expl": "A Fade In gradually raises the volume from silence (0) to the full audio level, smoothing out the start of a clip.", "img": IMG_FADES, "quote": "Ease it in. - Unknown" },
        "6": { "expl": "Percussive sounds need very short fades (milliseconds) to preserve the sharp 'attack' transient while still stopping clicks.", "img": IMG_FADES, "quote": "Don't kill the transient. - Unknown" },
        "9": { "expl": "Crossfade Looping blends the end of the loop with the start, creating a smooth transition that hides the loop point.", "img": IMG_LOOP_XFADE, "quote": "The perfect loop is invisible. - Unknown" }
    },
    # SUBJECT 2: SAMPLE PROCESSING
    "2": {
        "1": { "expl": "Normalization scans the audio file for the highest peak and turns the entire file up until that peak hits the target (e.g. 0dB).", "img": IMG_NORM, "quote": "Maximize the grid. - Unknown" },
        "3": { "expl": "DC Offset happens when the waveform is 'off-center', hovering above or below the zero line. This effectively reduces headroom.", "img": IMG_DC, "quote": "Center the wave. - Unknown" },
        "4": { "expl": "Looping a sample with DC Offset causes a click every time it loops, because the level jumps from the offset pos back to start.", "img": IMG_DC, "quote": "Offset = Clicks. - Unknown" },
        "10": { "expl": "Normalization is a math calculation on Amplitude. It does NOT change the frequency (pitch) or time (speed) of the audio.", "img": IMG_NORM, "quote": "Louder, not higher. - Unknown" }
    },
    # SUBJECT 3: BIT DEPTH & DYNAMIC RANGE
    "3": {
        "3": { "expl": "Dynamic Range is the ratio between the loudest undistorted signal and the quietest noise floor. Higher bit depth = more range.", "img": IMG_BIT_DEPTH, "quote": "Range is depth. - Unknown" },
        "4": { "expl": "16-bit audio provides a theoretical dynamic range of 96dB. (6dB per bit x 16).", "img": IMG_CD, "quote": "96dB is the CD limit. - Unknown" },
        "5": { "expl": "24-bit audio is the studio standard, offering 144dB of range, which is more than the human ear or real-world electronics can handle.", "img": IMG_BIT_DEPTH, "quote": "24 bits captures silence. - Unknown" },
        "6": { "expl": "Rule of Thumb: Each 1 bit adds 6dB of Dynamic Range.", "img": IMG_BIT_DEPTH, "quote": "1 bit = 6dB. - The Golden Rule" }
    },
    # SUBJECT 4: SAMPLE RATE & NYQUIST
    "4": {
        "4": { "expl": "The Nyquist Theorem determines the speed limit of digital audio. You must sample twice as fast as the highest frequency you want to hear.", "img": IMG_NYQUIST, "quote": "2x is the law. - Unknown" },
        "6": { "expl": "For 44.1kHz sample rate, the Nyquist limit is 22.05kHz. This covers the human hearing range (20Hz-20kHz).", "img": IMG_CD, "quote": "CD covers the human range. - Unknown" },
        "8": { "expl": "Aliasing (Foldover Distortion) happens when you try to record a frequency higher than the Nyquist limit. It reappears as a lower, harsh frequency.", "img": IMG_ALIASING, "quote": "Aliasing is a digital ghost. - Unknown" }
    },
    # SUBJECT 5: QUANTIZATION, DITHERING & FORMATS
    "5": {
        "2": { "expl": "Quantization Error (Rounding Error) creates a grainy noise called 'Quantization Noise' because the digital grid isn't perfectly precise.", "img": IMG_QUANT_ERR, "quote": "Digital is just an approximation. - Unknown" },
        "3": { "expl": "Dithering adds low-level randomized noise to mask the ugly quantization distortion patterns when lowering bit-depth.", "img": IMG_DITHER, "quote": "Add noise to improve the signal. - Counterintuitive Fact" },
        "6": { "expl": "MP3 uses 'Perceptual Coding' to delete audio information that the human ear is less likely to notice, saving massive file space.", "img": IMG_MP3_WAV, "quote": "MP3 tricks the brain. - Unknown" }
    },
    # SUBJECT 6: PLAYBACK & LOOPING
    "6": {
        "8": { "expl": "A Ping-Pong loop plays Forward -> Reverse -> Forward. It's great for sustaining smooth textures without obvious loop points.", "img": IMG_LOOP_XFADE, "quote": "Back and forth forever. - Unknown" }
    },
    # SUBJECT 7: MULTI-SAMPLING
    "7": {
        "2": { "expl": "Velocity Layers allow a sampler to trigger different recordings (Soft, Med, Loud) depending on how hard you press the key.", "img": IMG_MULTISAMP, "quote": "Dynamics are real. - Unknown" },
        "5": { "expl": "Round Robin cycles through different variations of the same note (Hit A, Hit B, Hit C) to avoid the robotic 'machine gun effect'.", "img": IMG_ROUNDROBIN, "quote": "Robots repeat, Musicians vary. - Unknown" },
        "7": { "expl": "Key Zones map samples to specific ranges of the keyboard (e.g. C1-C2 plays the 'Low Piano' sample set).", "img": IMG_MULTISAMP, "quote": "Map the instrument across the keys. - Unknown" }
    },
    # SUBJECT 8: TIME & PITCH
    "8": {
        "1": { "expl": "Time-Stretching allows you to change the tempo of a loop (make it longer/shorter) without turning it into a chipmunk (changing pitch).", "img": IMG_TIMESTRETCH, "quote": "Tempo independent of Pitch. - The Modern Miracle" },
        "5": { "expl": "Slicing beats (like Rex files) cuts audio into hits. Playing them slower just leaves gaps between hits, rather than stretching the audio itself.", "img": IMG_TIMESTRETCH, "quote": "Slice the transient. - Unknown" }
    }
}

def enrich_markdown():
    with open(MD_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by SUBJECTS
    # Matches: # SUBJECT 1: ...
    subjects = re.split(r'(# SUBJECT \d+:.*)', content)
    
    new_content = ""
    current_subject_num = 0
    
    for section in subjects:
        # Check if this is a header
        header_match = re.match(r'# SUBJECT (\d+):', section)
        if header_match:
            current_subject_num = header_match.group(1)
            new_content += section
            continue
            
        if not current_subject_num:
            new_content += section
            continue
            
        # Process Content of the Subject
        # Split into questions
        questions = re.split(r'(### Question \d+)', section)
        
        for q_chunk in questions:
            if q_chunk.strip().startswith('### Question'):
                # It's a header, just add it
                new_content += q_chunk
                # Extract question number for lookup
                q_num_match = re.search(r'### Question (\d+)', q_chunk)
                if q_num_match:
                    current_q_num = q_num_match.group(1)
                continue
                
            # It's the body of the question
            # Remove existing enrichment lines
            lines = q_chunk.split('\n')
            clean_lines = []
            for line in lines:
                if not any(line.strip().startswith(prefix) for prefix in ['**Expert Explanation:**', '**Image:**', '**Expert Quote:**']):
                    clean_lines.append(line)
            
            q_chunk = '\n'.join(clean_lines)
            
            # Find insertion point (After **Answer: X**)
            if "**Answer:" in q_chunk:
                # Look up content using SUBJECT number
                enrich_data = ENRICHMENT_DATA.get(str(current_subject_num), {}).get(str(current_q_num))
                
                if enrich_data:
                    # Construct injection string
                    injection = "\n"
                    if "expl" in enrich_data:
                        injection += f"\n**Expert Explanation:** {enrich_data['expl']}"
                    if "img" in enrich_data and enrich_data['img']:
                        injection += f"\n**Image:** ![\"Diagram\"]({enrich_data['img']})"
                    if "quote" in enrich_data and enrich_data['quote']:
                        injection += f"\n**Expert Quote:** \"{enrich_data['quote']}\""
                    
                    # Replace Answer line with Answer + Injection
                    # Regex substitution within this chunk
                    q_chunk = re.sub(r'(\*\*Answer: [A-D](.*?)\*\*)', r'\1' + injection, q_chunk)
                    
            new_content += q_chunk

    with open(MD_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Enrichment complete.")

if __name__ == "__main__":
    enrich_markdown()
