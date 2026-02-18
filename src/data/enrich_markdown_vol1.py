import re
import os
import json
import random

# File Paths
FILES = [
    "../../public/Quiz_questions/Volume 1/Volume1_Fundamentals_Basic_Level_120Q.md",
    "../../public/Quiz_questions/Volume 1/Volume1_Fundamentals_Intermediate_Level_120Q.md"
]
QUOTES_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/found_quotes.json"
EXPLANATIONS_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/found_explanations.json"

# Common Images
IMG_FREQ = "/images/diagram_frequency_v2.png"
IMG_PITCH = "/images/svg/pitch_vs_frequency.svg"
IMG_AMPLI = "/images/svg/amplitude_loudness.svg"
IMG_WAVE = "/images/svg/waveform_time_domain.svg"
IMG_BASS = "/images/svg/frequency_spectrum_bass.svg"
IMG_TREBLE = "/images/svg/frequency_spectrum_treble.svg"
IMG_FLETCHER = "/images/diagram_fletcher_munson_v2.png"
IMG_CLIPPING = "/images/diagram_clipping_v2.png"
IMG_BITDEPTH = "/images/svg/quantization_steps.svg"
IMG_SAMPLE_RATE = "/images/svg/sample_rate_dots.svg"
IMG_DBFS = "/images/svg/dbfs_meter.svg"
IMG_HEADROOM = "/images/svg/headroom_diagram.svg"
IMG_DYNRANGE = "/images/svg/dynamic_range_concept.svg"
IMG_DITHER = "/images/svg/dither_concept.svg"
IMG_TRANSDUCER = "/images/svg/transducer_diagram.svg"
IMG_CHAIN = "/images/svg/signal_chain_basic.svg"
IMG_SNR = "/images/svg/snr_concept.svg"
IMG_PROXIMITY = "/images/svg/proximity_graph.svg"
IMG_3TO1 = "/images/svg/3_to_1_rule_diagram.svg"
IMG_PHASEWARN = "/images/svg/phase_cancellation.svg"
IMG_ROOM = "/images/svg/direct_vs_room.svg"
IMG_STEREO = "/images/svg/stereo_field.svg"
IMG_FLIP = "/images/svg/polarity_invert.svg"
IMG_HPF = "/images/svg/eq_high_pass.svg"
IMG_BELL = "/images/svg/eq_bell_q_factor.svg"
IMG_SHELF = "/images/svg/eq_shelving.svg"
IMG_MASK = "/images/svg/eq_masking.svg"
IMG_COMP_GRAPH = "/images/svg/compression_graph.svg"
IMG_COMP_ENV = "/images/svg/compression_attack_release.svg"
IMG_LIMITER = "/images/svg/limiter_brickwall.svg"
IMG_RT60 = "/images/svg/reverb_rt60_graph.svg"
IMG_PREDELAY = "/images/svg/reverb_pre_delay.svg"
IMG_SLAP = "/images/svg/delay_slapback.svg"
IMG_CHORUS = "/images/svg/modulation_chorus.svg"
IMG_FLANGER = "/images/svg/modulation_flanger.svg"
IMG_PHASER = "/images/svg/modulation_phaser.svg"
IMG_TREM_VIB = "/images/svg/tremolo_vs_vibrato.svg"
IMG_LFO = "/images/svg/lfo_shapes.svg"
IMG_MIDI_ROLL = "/images/svg/midi_piano_roll.svg"
IMG_VELOCITY = "/images/svg/midi_velocity.svg"
IMG_QUANTIZE = "/images/svg/midi_quantization.svg"
IMG_ADSR = "/images/svg/synth_adsr.svg"
IMG_SYNTH_FLOW = "/images/svg/synth_signal_flow.svg"
IMG_MICS = "/images/diagram_mics_v2.png"
IMG_PHASE = "/images/diagram_phase_v2.png"
IMG_ALIASING = "/images/diagram_aliasing_v2.png"
IMG_NYQUIST = "/images/diagram_nyquist_v2.png"
IMG_JITTER = "/images/diagram_jitter_clock_v2.png"
IMG_LATENCY = "/images/diagram_latency_buffer_v2.png"
IMG_NOISE_SHAPE = "/images/diagram_noise_shaping_v2.png"
IMG_FILE_MATH = "/images/diagram_file_size_math_v2.png"
IMG_SPDIF = "/images/diagram_spdif_connectors_v2.png"
IMG_MID_SIDE = "/images/diagram_mid_side_v2.png"
IMG_CD = "/images/diagram_cd_specs_v2.png"
IMG_DB = "/images/diagram_file_size_math_v2.png"
IMG_SIGNAL_FLOW = "/images/diagram_di_box_flow_v2.png"
IMG_HEADROOM_V2 = "/images/diagram_clipping_v2.png"
IMG_DI_BOX = "/images/svg/equipment_di_box_function.svg"


# Keyword Matching Database
# Order matters: Specific Terms FIRST, Generic Terms LAST.
KEYWORD_MATCHES = {
    # High Priority Specifics
    "aliasing": { "img": IMG_ALIASING, "expl": "Aliasing is an effect that causes different signals to become indistinguishable (or aliases of one another) when sampled." },
    "nyquist": { "img": IMG_NYQUIST, "expl": "The Nyquist frequency is half of the sampling rate. Frequencies above this limit cause aliasing." },
    "dither": { "img": IMG_DITHER, "expl": "Dither is low-level noise added to prevent quantization errors when reducing bit depth." },
    "jitter": { "img": IMG_JITTER, "expl": "Jitter is the timing deviation of the sample clock, which can introduce noise and distortion." },
    "quantiz": { "img": IMG_BITDEPTH, "expl": "Quantization is the process of mapping continuous infinite values to a smaller set of discrete finite values (rounding)." },
    "bit depth": { "img": IMG_BITDEPTH, "expl": "Bit depth determines the dynamic range and noise floor of the digital signal." },
    "16-bit": { "img": IMG_BITDEPTH, "expl": "16-bit audio offers 96dB of dynamic range, the standard for CD quality." },
    "24-bit": { "img": IMG_BITDEPTH, "expl": "24-bit audio offers 144dB of dynamic range, providing a massive noise floor safety margin for recording." },
    "dynamic range": { "img": IMG_DYNRANGE, "expl": "Dynamic range is the ratio between the largest and smallest values that a changeable quantity can assume." },
    "sample rate": { "img": IMG_SAMPLE_RATE, "expl": "Sample rate (e.g. 44.1kHz) determines the frequency bandwidth of the recording." },
    "proximity": { "img": IMG_PROXIMITY, "expl": "The proximity effect boosts bass frequencies when the source is close to a directional mic." },
    "3:1": { "img": IMG_3TO1, "expl": "The 3:1 Rule helps minimize phase cancellation by keeping adequate distance between microphones." },
    "mid-side": { "img": IMG_MID_SIDE, "expl": "Mid-Side (M/S) recording is a stereo technique that offers excellent mono compatibility and adjustable width." },
    "xlr": { "img": "/images/svg/equipment_cable_types_connector_guide.svg", "expl": "XLR is a balanced 3-pin connector standard for microphones and professional audio gear." },
    "di box": { "img": IMG_DI_BOX, "expl": "A DI Box converts high-impedance instrument signals to low-impedance mic signals." },
    "phantom": { "img": IMG_CHAIN, "expl": "Phantom power (+48V) is required to operate condenser microphones and active DI boxes." },
    "balanced": { "img": IMG_DI_BOX, "expl": "Balanced connections cancel out noise interference using phase inversion on the cold wire." },
    "dbfs": { "img": IMG_DBFS, "expl": "dBFS (Decibels Full Scale) measures digital levels relative to the clipping point (0dBFS)." },
    "headroom": { "img": IMG_HEADROOM, "expl": "Headroom is the safety margin between the peak signal and the clipping point." },
    "noise floor": { "img": IMG_SNR, "expl": "The noise floor is the level of constant background noise in a system." },
    "snr": { "img": IMG_SNR, "expl": "Signal-to-Noise Ratio (SNR) compares valid signal level to background noise level." },
    "interference": { "img": IMG_PHASEWARN, "expl": "Phase interference occurs when waves interact, either boosting (constructive) or cutting (destructive) the sound." },
    "threshold": { "img": IMG_COMP_GRAPH, "expl": "Threshold is the level setting at which distinct dynamic processing (compression, gating) begins." },
    "ratio": { "img": IMG_COMP_GRAPH, "expl": "ratio determines the intensity of the gain reduction once the signal passes the threshold." },
    "attack": { "img": IMG_COMP_ENV, "expl": "Attack is the time it takes for the processor to react to the input signal." },
    "release": { "img": IMG_COMP_ENV, "expl": "Release is the time it takes for the processor to return to a neutral state." },
    "knee": { "img": "/images/svg/compressor_knee_hard_soft.svg", "expl": "The knee controls the transition smoothness into compression." },
    "limit": { "img": IMG_LIMITER, "expl": "Limiting is extreme compression (10:1+) used to prevent peaks from exceeding a ceiling." },
    "velocity": { "img": IMG_VELOCITY, "expl": "MIDI Velocity represents the force with which a note is played." },
    "adsr": { "img": IMG_ADSR, "expl": "The ADSR envelope shapes a sound's amplitude over time (Attack, Decay, Sustain, Release)." },
    "oscillator": { "img": IMG_SYNTH_FLOW, "expl": "An oscillator generates the raw repetitive waveform in a synthesizer." },
    "sidechain": { "img": "/images/svg/sidechain_compression_ducking.svg", "expl": "Sidechaining uses an external signal (like a kick drum) to trigger compression on another track (like bass)." },

    # Mid Priority
    "microphone": { "img": IMG_TRANSDUCER, "expl": "A microphone is a transducer converting acoustic energy into electrical energy." },
    "preamp": { "img": IMG_CHAIN, "expl": "A preamp boosts weak mic signals to line level for recording." },
    "impedance": { "img": IMG_SIGNAL_FLOW, "expl": "Impedance affects how signals transfer between devices. Mismatches can cause tone loss." },
    "transducer": { "img": IMG_TRANSDUCER, "expl": "Transducers convert energy from one form to another (e.g. Sound -> Voltage)." },
    "stereo": { "img": IMG_STEREO, "expl": "Stereo recording uses spatial cues to create width and depth." },
    "reverb": { "img": IMG_RT60, "expl": "Reverb simulates the complex reflections of a physical space." },
    "delay": { "img": IMG_SLAP, "expl": "Delay repeats the signal after a set time interval." },
    "chorus": { "img": IMG_CHORUS, "expl": "Chorus adds richness by layering slightly detuned and delayed copies of the signal." },
    "flange": { "img": IMG_FLANGER, "expl": "Flanging creates a sweeping comb-filter effect using very short modulated delays." },
    "phase": { "img": IMG_PHASER, "expl": "Phasers create a swooshing effect by modulating all-pass filters." }, # Order matters: "phase" is here, "phaser" is stronger.
    
    # Generic Terms (Fallback)
    "frequency": { "img": IMG_FREQ, "expl": "Frequency (Hz) corresponds to the musical pitch of a sound." },
    "hertz": { "img": IMG_FREQ, "expl": "Hertz (Hz) is the unit of frequency measurement." },
    "pitch": { "img": IMG_PITCH, "expl": "Pitch is the psychoacoustic quality of how high or low a sound is perceived." },
    "amplitude": { "img": IMG_AMPLI, "expl": "Amplitude is the strength of the waveform, perceived as loudness." },
    "loudness": { "img": IMG_AMPLI, "expl": "Loudness is the subjective intensity of sound." },
    "decibel": { "img": IMG_DBFS, "expl": "Decibels (dB) are used to measure sound level ratios logarithmically." },
    "waveform": { "img": IMG_WAVE, "expl": "A waveform is the visual representation of sound pressure over time." },
    "timbre": { "img": IMG_WAVE, "expl": "Timbre is the character of a sound that distinguishes it from others." },
    "sound": { "img": IMG_WAVE, "expl": "Sound is a mechanical wave that propagates through a medium." },
    "audio": { "img": IMG_WAVE, "expl": "Audio is the electrical capture and reproduction of sound." },
}

# Fallbacks
SUBJECT_DEFAULTS = {
    "1": { "imgs": [IMG_FREQ], "expls": ["Understanding the physics of sound is essential for audio engineering."] },
    "2": { "imgs": [IMG_DBFS], "expls": ["Decibels provide a manageable scale for the huge range of sound pressure we can hear."] },
    "3": { "imgs": [IMG_SAMPLE_RATE], "expls": ["Digital audio represents sound as a sequence of numerical values."] },
    "4": { "imgs": [IMG_CHAIN], "expls": ["Signal flow is the path an audio signal takes from source to output."] },
    "5": { "imgs": [IMG_SNR], "expls": ["Proper gain staging ensures the best signal quality throughout the chain."] },
    "6": { "imgs": [IMG_MICS], "expls": ["Microphone selection and placement are the most critical steps in recording."] },
    "7": { "imgs": [IMG_STEREO], "expls": ["Stereo techniques create a sense of width and space in a recording."] },
    "8": { "imgs": [IMG_SHELF], "expls": ["EQ helps to balance the frequency spectrum of a mix."] },
    "9": { "imgs": [IMG_COMP_GRAPH], "expls": ["Dynamic processing controls the volume fluctuations of a performance."] },
    "10": { "imgs": [IMG_RT60], "expls": ["Time-based effects create the illusion of space and depth."] },
    "11": { "imgs": [IMG_LFO], "expls": ["Modulation effects add movement and interest to a static sound."] },
    "12": { "imgs": [IMG_MIDI_ROLL], "expls": ["MIDI allows computers and instruments to communicate musically."] }
}

def load_json(filepath):
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {}
    return {}

def enrich_markdown():
    quotes_db = load_json(QUOTES_FILE).get("Volume 1", {})
    explanations_db = load_json(EXPLANATIONS_FILE).get("Volume 1", {})
    
    for md_file_path in FILES:
        if not os.path.exists(md_file_path):
            print(f"Skipping {md_file_path}")
            continue
            
        is_basic = "Basic" in md_file_path
        print(f"Enriching {md_file_path} with Manual + Keyword Logic...")
        
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
                
                # Clean existing
                lines = q_chunk.split('\n')
                clean_lines = []
                for line in lines:
                    if not any(line.strip().startswith(prefix) for prefix in ['**Expert Explanation:**', '**Image:**', '**Expert Quote:**']):
                        clean_lines.append(line)
                q_chunk = '\n'.join(clean_lines)
                
                if "**Answer:" in q_chunk:
                    # 1. Extract Valid Answer Text
                    answer_char_match = re.search(r'\*\*Answer: ([A-D])', q_chunk)
                    answer_text = ""
                    if answer_char_match:
                         char = answer_char_match.group(1)
                         option_match = re.search(r'- ' + char + r'\) (.*)', q_chunk)
                         if option_match:
                             raw_text = option_match.group(1).strip()
                             raw_text = re.sub(r'\(.*?\)', '', raw_text).strip()
                             answer_text = raw_text

                    # 2. Check EXPLANATIONS DB (Priority 0 - Highest)
                    manual_match = None
                    subject_key = f"Subject {current_subject_num}"
                    level_key = "Basic" if is_basic else "Intermediate"
                    
                    if subject_key in explanations_db:
                        if level_key in explanations_db[subject_key]:
                            manual_match = explanations_db[subject_key][level_key].get(str(current_q_num))

                    # 3. Check KEYWORD DATA (Priority 1)
                    found_key = None
                    if not manual_match:
                        text_to_search = q_chunk.lower()
                        for key, data in KEYWORD_MATCHES.items():
                            if key in text_to_search:
                                found_key = data
                                break 
                    
                    # 4. Fallback Logic (Priority 2)
                    defaults = SUBJECT_DEFAULTS.get(str(current_subject_num), None)
                    
                    # Final Selection
                    expl = None
                    img = None
                    
                    if manual_match:
                        expl = manual_match['expl']
                        img = manual_match['img']
                    elif found_key:
                        expl = found_key['expl']
                        img = found_key['img']
                    elif defaults:
                        img_idx = int(current_q_num) % len(defaults['imgs'])
                        expl_idx = int(current_q_num) % len(defaults['expls'])
                        img = defaults['imgs'][img_idx] 
                        expl = defaults['expls'][expl_idx]

                    # 5. PREPEND ANSWER TEXT to Explanation (Always do this)
                    # 5. PREPEND ANSWER TEXT to Explanation (Always do this)
                    if expl and answer_text:
                        # Strip any existing bolding from the explanation text itself
                        expl = expl.replace('**', '')
                        if "Correct Answer:" not in expl:
                            expl = f"Correct Answer: {answer_text}. {expl}"

                    # Quote Logic
                    quote = None
                    if quotes_db:
                         subject_quotes = quotes_db.get(str(current_subject_num), {}).get("quotes", [])
                         if subject_quotes:
                             quote_idx = int(current_q_num) % len(subject_quotes)
                             q_obj = subject_quotes[quote_idx]
                             quote = f"{q_obj['text']} - {q_obj['author']}"
                    
                    # Build Injection
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
