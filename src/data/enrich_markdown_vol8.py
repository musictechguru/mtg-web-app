import re
import os
import json
import random

# File Paths
FILES = [
    "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions/Volume 8/Volume8_Mastering_Basic_Level_120Q.md",
    "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions/Volume 8/Volume8_Mastering_Intermediate_Level_120Q.md"
]
QUOTES_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/found_quotes.json"

# Images
IMG_MASTERING_ROOM = "/images/Mastering_and_production_room_at_Audio_Mix_House,_Studio_D_(13431465744).jpg"
IMG_SIGNAL_CHAIN = "/images/svg/mastering_signal_chain_flow.svg"
IMG_HEADROOM = "/images/svg/mastering_limit_ceiling_margin.svg" # Using ceiling as headroom variant
IMG_CLIPPING = "/images/svg/clipping_meter.svg"
IMG_FLETCHER = "/images/svg/fletcher_munson_curve_loudness.svg"
IMG_LUFS_METER = "/images/svg/lufs_vs_peak_metering.svg"
IMG_LOUDNESS = "/images/svg/amplitude_loudness.svg"
IMG_ISP = "/images/svg/intersample_peak_clip.svg"
IMG_CEILING = "/images/svg/mastering_limit_ceiling_margin.svg"
IMG_MULTIBAND = "/images/svg/multiband_compression_mix_glue.svg"
IMG_SERIAL_COMP = "/images/svg/serial_compression_sandwhich.svg"
IMG_DITHER_CONCEPT = "/images/svg/dither_concept.svg"
IMG_LRA = "/images/svg/dynamic_range_lra_visual.svg"
IMG_STEREO_ENHANCE = "/images/svg/stereo_enhancement_midside_balance.svg"

# Subject Defaults
SUBJECT_DEFAULTS = {
    "1": { # MASTERING FUNDAMENTALS
        "imgs": [IMG_MASTERING_ROOM, IMG_SIGNAL_CHAIN, IMG_LOUDNESS],
        "expls": [
            "Mastering is the bridge between the mix studio and the consumer. It ensures translation across all playback systems.",
            "Visualizing the frequency balance of your track compared to commercial releases helps maintain objectivity.",
            "The mastering environment must be acoustically neutral so you hear the truth of the audio, not the room reflections.",
            "Preparation is key. Ensure your mix is finished and you aren't fixing mix issues during the mastering stage.",
            "Mastering adds the final sheen and competitive loudness, but it cannot turn a bad song into a hit."
        ]
    },
    "2": { # HEADROOM & MIX PREP
        "imgs": [IMG_HEADROOM, IMG_CLIPPING],
        "expls": [
            "Leaving 3-6dB of headroom creates space for the mastering equalizer and compressor to work without clipping immediately.",
            "A mix peaking at 0dBFS gives the mastering engineer no room to adjust EQ or dynamics without reducing gain first.",
            "True headroom is about dynamic breathing room, not just the peak meter reading.",
            "Avoid putting hard limiters on the master bus before sending to mastering, as they permanently damage the transients.",
            "Exporting in 24-bit or 32-bit float preserves the dynamic range and noise floor integrity for further processing."
        ]
    },
    "3": { # REFERENCE TRACKS
        "imgs": [IMG_FLETCHER, IMG_LOUDNESS],
        "expls": [
            "Reference tracks act as a palate cleanser for your ears, resetting your perception of 'normal' balance.",
            "Always level-match your reference track to your mix. Louder always sounds better, which leads to bad EQ decisions.",
            "Choose references that are commercially successful and sonically similar to the genre you are working in.",
            "A/B testing reveals if your low end is too heavy or your vocals are buried compared to professional standards.",
            "Don't chase the reference perfectly; use it as a guidepost for tonal balance and impact."
        ]
    },
    "4": { # LUFS & LOUDNESS
        "imgs": [IMG_LUFS_METER, IMG_LOUDNESS, IMG_LRA],
        "expls": [
            "LUFS (Loudness Units Full Scale) measures loudness over time, mimicking human hearing perception.",
            "Integrated LUFS gives the average loudness of the entire song, while Short-Term LUFS shows the loudness of a specific section.",
            "LRA (Loudness Range) tells you the dynamic variance. A low LRA means the track is consistently loud; high LRA means dramatic dynamics.",
            "Peak meters tell you if you are clipping; LUFS meters tell you how loud the listener perceives the music.",
            "The 'Loudness Wars' resulted in crushed, distorted records. LUFS metering helps restore dynamic sanity."
        ]
    },
    "5": { # STREAMING TARGETS
        "imgs": [IMG_LUFS_METER, IMG_CEILING],
        "expls": [
            "Streaming services like Spotify normalize audio to roughly -14 LUFS. Mastering significantly louder just leads to being turned down.",
            "It is better to master a dynamic, punchy track at -10 LUFS than a crushed, flat one at -6 LUFS.",
            "Normalization is volumen automation. It does not compress your track; it simply turns the playback knob down.",
            "Different platforms have different targets (Apple -16, Spotify -14), so a balanced master between -10 and -14 usually translates well.",
            "The 'Penalty' is the amount a platform turns your track down. Heavy limiting often results in a massive penalty and less impact."
        ]
    },
    "6": { # TRUE PEAK
        "imgs": [IMG_ISP, IMG_CEILING, IMG_CLIPPING],
        "expls": [
            "True Peak meters detect inter-sample peaks that occur during the Digital-to-Analog conversion process.",
            "A file hitting 0dBFS digitally might actually peak at +1dB or more when converted to analog voltage, causing distortion.",
            "Streaming standards often require a True Peak ceiling of -1.0 dBTP to prevent clipping during lossy transcoding (MP3/AAC).",
            "Oversampling in limiters helps predict and prevent these invisible inter-sample peaks.",
            "Respecting True Peak ensures your audio sounds clean on cheap earbuds and high-end DACs alike."
        ]
    },
    "7": { # MASTERING CHAIN
        "imgs": [IMG_SIGNAL_CHAIN, IMG_SERIAL_COMP, IMG_MULTIBAND, IMG_DITHER_CONCEPT],
        "expls": [
            "Corrective EQ typically comes first to remove resonances before compression makes them worse.",
            "Compression provides the 'glue' and density, pulling the disparate elements of the mix into a cohesive whole.",
            "Multiband compression allows you to tighten the low end without crushing the high-frequency transients.",
            "Limiting is the final safety net, ensuring the level hits the commercial target without exceeding the ceiling.",
            "Dithering is applied only once, at the very end, when reducing bit depth to 16-bit for the final master file."
        ]
    }
}

# Specific Manual Overrides (if needed)
MANUAL_DATA = {}

def load_quotes():
    if os.path.exists(QUOTES_FILE):
        with open(QUOTES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def enrich_markdown():
    quotes_db = load_quotes().get("Volume 8", {})
    
    for md_file_path in FILES:
        if not os.path.exists(md_file_path):
            print(f"Skipping {md_file_path} (Not found)")
            continue
            
        print(f"Enriching {md_file_path}...")
        
        with open(md_file_path, 'r', encoding='utf-8') as f:
            content = f.read()

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
                
                # Clean existing enrichment
                lines = q_chunk.split('\n')
                clean_lines = []
                for line in lines:
                    if not any(line.strip().startswith(prefix) for prefix in ['**Expert Explanation:**', '**Image:**', '**Expert Quote:**']):
                        clean_lines.append(line)
                q_chunk = '\n'.join(clean_lines)
                
                if "**Answer:" in q_chunk:
                    # Priority 1: Manual Specific Data
                    enrich_data = MANUAL_DATA.get(str(current_subject_num), {}).get(str(current_q_num), {})
                    
                    # Priority 2: Subject Defaults
                    defaults = SUBJECT_DEFAULTS.get(str(current_subject_num), None)
                    
                    # Determine Content
                    # Explanation
                    expl = enrich_data.get('expl')
                    if not expl and defaults:
                        expl_idx = int(current_q_num) % len(defaults['expls'])
                        expl = defaults['expls'][expl_idx]
                    
                    # Image
                    img = enrich_data.get('img')
                    if not img and defaults:
                        img_idx = int(current_q_num) % len(defaults['imgs'])
                        img = defaults['imgs'][img_idx]
                        
                    # Quote
                    quote = enrich_data.get('quote')
                    if not quote and quotes_db:
                         subject_quotes = quotes_db.get(str(current_subject_num), {}).get("quotes", [])
                         if subject_quotes:
                             quote_idx = int(current_q_num) % len(subject_quotes)
                             q_obj = subject_quotes[quote_idx]
                             quote = f"{q_obj['text']} - {q_obj['author']}"
                    
                    # Injection
                    injection = "\n"
                    if expl:
                        injection += f"\n**Expert Explanation:** {expl}"
                    if img:
                        injection += f"\n**Image:** ![\"Diagram\"]({img})"
                    if quote:
                        injection += f"\n**Expert Quote:** \"{quote}\""
                    
                    q_chunk = re.sub(r'(\*\*Answer: [A-D](.*?)\*\*)', r'\1' + injection, q_chunk)
                        
                new_content += q_chunk

        with open(md_file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Finished {md_file_path}")

if __name__ == "__main__":
    enrich_markdown()
