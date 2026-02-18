
import re
import os
import json

# ==========================================
# CONFIGURATION & CONSTANTS
# ==========================================

ROOT_DIR = "../../public/Quiz_questions"
QUOTES_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/found_quotes.json"
EXPLANATIONS_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/found_explanations.json"

# --- IMAGES LIBRARY ---
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
IMG_DI_BOX = "/images/svg/equipment_di_box_function.svg"
IMG_MIC_DYN = "/images/svg/mic_dynamic_construction.svg"
IMG_MIC_COND = "/images/svg/mic_condenser_construction.svg"
IMG_MIC_RIB = "/images/svg/mic_ribbon_construction.svg"
IMG_OMNI = "/images/svg/polar_pattern_omni.svg"
IMG_CARDIOID = "/images/svg/polar_pattern_cardioid.svg"
IMG_FIG8 = "/images/svg/polar_pattern_figure8.svg"
IMG_SHOTGUN = "/images/svg/polar_pattern_supercardioid.svg"
IMG_SENSITIVITY = "/images/svg/mic_sensitivity_graph.svg"
IMG_POP = "/images/svg/mic_pop_filter_setup.svg"
IMG_OFFAXIS = "/images/svg/mic_off_axis_coloration.svg"
IMG_SHOCK = "/images/svg/mic_shock_mount_diagram.svg"
IMG_XLR = "/images/svg/cable_xlr_pinout.svg"
IMG_XY = "/images/svg/stereo_xy_diagram.svg"
IMG_ORTF = "/images/svg/stereo_ortf_diagram.svg"
IMG_BLUMLEIN = "/images/svg/stereo_blumlein_diagram.svg"
IMG_DECCA = "/images/stereo_decca_tree.png"
IMG_MS = "/images/svg/stereo_mid_side_diagram.svg"
IMG_SPACED = "/images/svg/stereo_spaced_pair_diagram.svg"

IMG_SNARE = "/images/explanations/mic_placement_snare.png"
IMG_GTR_AC = "/images/explanations/mic_placement_acoustic.png"
IMG_PIANO_GR = "/images/explanations/mic_placement_piano.png"
IMG_PIANO_UP = "/images/piano_upright_micing_1770033134712.png"
IMG_SAX = "/images/sax_micing_1770033437547.png"
IMG_VIOLIN = "/images/violin_micing_1770033259660.png"
IMG_KICK = "/images/explanations/mic_placement_kick.png"
IMG_POP = "/images/explanations/mic_placement_vocal.png"

# NEW images for vol 3-10 concepts (Using generics where specific missing)
IMG_FILTER = "/images/svg/eq_high_pass.svg" # Placeholder for filter types
IMG_FM = "/images/svg/synth_signal_flow.svg"
IMG_SAMPLE = "/images/svg/waveform_time_domain.svg"
IMG_PAN = "/images/svg/stereo_field.svg"
IMG_CONSOLE = "/images/svg/signal_chain_basic.svg"


# --- KEYWORD MATCHES (Global) ---
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
    "xlr": { "img": IMG_XLR, "expl": "XLR is a balanced 3-pin connector standard for microphones and professional audio gear." },
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
    "cardioid": { "img": IMG_CARDIOID, "expl": "Cardioid pattern rejects sound from the rear, making it ideal for live use." },
    "omnidirectional": { "img": IMG_OMNI, "expl": "Omnis pick up sound equally from all directions and have no proximity effect." },
    "figure-8": { "img": IMG_FIG8, "expl": "Figure-8 picks up front and back, rejecting sides. Great for ribbons." },
    "condenser": { "img": IMG_MIC_COND, "expl": "Condensers capture high-frequency detail and transients accurately." },
    "dynamic mic": { "img": IMG_MIC_DYN, "expl": "Dynamic mics are rugged and handle high SPL." },
    "ribbon": { "img": IMG_MIC_RIB, "expl": "Ribbon mics are smooth and warm but fragile." },
    "filter": { "img": IMG_HPF, "expl": "Filters remove specific frequencies from the spectrum." },
    "eq": { "img": IMG_BELL, "expl": "Equalization adjusts the balance of frequency components." },
    "reverb": { "img": IMG_RT60, "expl": "Reverb creates the illusion of space and depth." },
    "lfo": { "img": IMG_LFO, "expl": "Low Frequency Oscillators modulate parameters to create movement." },
    "midi": { "img": IMG_MIDI_ROLL, "expl": "MIDI is a protocol for communicating musical information." },
}

# --- VOLUME SPECIFIC DATA ---

# Vol 2 Manual Data
VOL2_DATA = {
    "1": { "1": { "expl": "Gain is the input sensitivity tuning...", "img": IMG_CHAIN }, "default": { "expl": "Gain staging is critical.", "img": IMG_CHAIN } },
    "2": { "default": { "expl": "Microphone type defines the source character.", "img": IMG_MICS } },
    "3": { "default": { "expl": "Polar patterns control isolation.", "img": IMG_CARDIOID } },
    "4": { "default": { "expl": "Mic placement is the most powerful EQ.", "img": IMG_ROOM } },
    "5": { "default": { "expl": "Drums require careful multi-mic phase alignment.", "img": IMG_SNARE } },
    "6": { "default": { "expl": "Strings need breathing room to sound natural.", "img": IMG_GTR_AC } },
    "7": { "default": { "expl": "Vocals are the focal point; control plosives and sibilance.", "img": IMG_POP } },
    "8": { "default": { "expl": "Wind instruments are high SPL sources.", "img": IMG_SAX } },
    "9": { "default": { "expl": "Pianos cover the full frequency spectrum.", "img": IMG_PIANO_GR } },
    "10": { "default": { "expl": "Stereo techniques enhance width.", "img": IMG_XY } },
    "11": { "default": { "expl": "Transducers convert energy forms.", "img": IMG_TRANSDUCER } },
    "12": { "default": { "expl": "Accessories ensure clean recording.", "img": IMG_SHOCK } }
}
# (I am using a simplified structure for Vol 2 here to save space, assuming Keywords will catch most specific Vol 2 items if existing manual data misses)

# Defaults per Volume/Topic
VOLUME_DEFAULTS = {
    "Volume 2": {
        "1": { "expl": "Gain staging is critical.", "img": IMG_CHAIN },
        "2": { "expl": "Microphone type defines the source character.", "img": IMG_MICS },
        "3": { "expl": "Polar patterns control isolation.", "img": IMG_CARDIOID },
        "4": { "expl": "Mic placement is the most powerful EQ.", "img": IMG_ROOM },
        "5": { "expl": "Drums require careful multi-mic phase alignment.", "img": IMG_SNARE },
        "6": { "expl": "Strings need breathing room to sound natural.", "img": IMG_GTR_AC },
        "7": { "expl": "Vocals are the focal point; control plosives and sibilance.", "img": IMG_POP },
        "8": { "expl": "Wind instruments are high SPL sources.", "img": IMG_SAX },
        "9": { "expl": "Pianos cover the full frequency spectrum.", "img": IMG_PIANO_GR },
        "10": { "expl": "Stereo techniques enhance width.", "img": IMG_XY },
        "11": { "expl": "Transducers convert energy forms.", "img": IMG_TRANSDUCER },
        "12": { "expl": "Accessories ensure clean recording.", "img": IMG_SHOCK }
    },
    "Volume 3": { # Synthesis
        "1": { "img": IMG_SYNTH_FLOW, "expl": "Synthesis starts with an oscillator and subtractive processing." },
        "2": { "img": IMG_SYNTH_FLOW, "expl": "Waveforms like Sine, Saw, Square determine the basic timbre." },
        "3": { "img": IMG_SYNTH_FLOW, "expl": "Special oscillators add texture and complexity." },
        "4": { "img": IMG_HPF, "expl": "Filters sculpt the harmonic content of the sound." },
        "5": { "img": IMG_ADSR, "expl": "Envelopes control how the sound evolves over time." },
        "6": { "img": IMG_LFO, "expl": "Modulation adds life and movement to static sounds." },
        "7": { "img": IMG_SYNTH_FLOW, "expl": "Subtractive synthesis is sculpting sound by removing frequencies." },
        "8": { "img": IMG_SYNTH_FLOW, "expl": "FM synthesis uses frequency modulation for complex metallic tones." },
        "9": { "img": IMG_SYNTH_FLOW, "expl": "Wavetables allow evolving timbres." },
        "10": { "img": IMG_SYNTH_FLOW, "expl": "Physical modeling simulates real instrument acoustics." },
        "11": { "img": IMG_SYNTH_FLOW, "expl": "Advanced synthesis creates unique textures." },
        "12": { "img": IMG_SYNTH_FLOW, "expl": "Performance controls make synths expressive." }
    },
    "Volume 4": { # Sampling
        "1": { "img": IMG_WAVE, "expl": "Editing samples requires precision at zero-crossings." },
        "2": { "img": IMG_WAVE, "expl": "Processing samples changes their character." },
        "3": { "img": IMG_BITDEPTH, "expl": "Bit depth determines dynamic range." },
        "4": { "img": IMG_SAMPLE_RATE, "expl": "Sample rate affects frequency response." },
        "5": { "img": IMG_BITDEPTH, "expl": "Quantization maps analog to digital steps." },
        "6": { "img": IMG_WAVE, "expl": "Looping allows continuous playback of short samples." },
        "7": { "img": IMG_WAVE, "expl": "Multi-sampling captures an instrument across its range." },
        "8": { "img": IMG_WAVE, "expl": "Time-stretching alters tempo without pitch change." },
        "9": { "img": IMG_MIDI_ROLL, "expl": "MIDI triggers the samples." },
        "10": { "img": IMG_MIDI_ROLL, "expl": "MIDI data carries note and control info." },
        "11": { "img": IMG_MIDI_ROLL, "expl": "CC messages control parameters dynamically." },
        "12": { "img": IMG_MIDI_ROLL, "expl": "General MIDI ensures compatibility." }
    },
    "Volume 5": { # Dynamic Processing
        "1": { "img": IMG_COMP_GRAPH, "expl": "Compression reduces dynamic range." },
        "2": { "img": IMG_COMP_GRAPH, "expl": "Threshold sets when compression starts." },
        "3": { "img": IMG_COMP_ENV, "expl": "Attack determines how fast compression acts." },
        "4": { "img": IMG_COMP_ENV, "expl": "Release determines how fast compression stops." },
        "5": { "img": IMG_COMP_GRAPH, "expl": "Knee smoothing makes compression transparent." },
        "6": { "img": IMG_COMP_GRAPH, "expl": "VCA compressors are fast and clean." },
        "7": { "img": IMG_COMP_GRAPH, "expl": "FET compressors are fast and colorful." },
        "8": { "img": IMG_COMP_GRAPH, "expl": "Optical compressors are slow and musical." },
        "9": { "img": IMG_COMP_GRAPH, "expl": "Tube compressors add warmth." },
        "10": { "img": IMG_LIMITER, "expl": "Limiters prevent signal peaks." },
        "11": { "img": IMG_COMP_GRAPH, "expl": "Gates silence below a threshold." },
        "12": { "img": IMG_COMP_GRAPH, "expl": "Advanced dynamics control specific elements." }
    },
    "Volume 6": { # EQ
        "1": { "img": IMG_FREQ, "expl": "EQ adjusts frequency balance." },
        "2": { "img": IMG_BELL, "expl": "Q factor controls bandwidth." },
        "3": { "img": IMG_HPF, "expl": "Filter types determine the shape of the cut/boost." },
        "4": { "img": IMG_BELL, "expl": "Parametric EQ offers full control." },
        "5": { "img": IMG_SHELF, "expl": "Graphic EQ offers fixed bands." },
        "6": { "img": IMG_BELL, "expl": "Dynamic EQ reacts to signal level." },
        "7": { "img": IMG_SHELF, "expl": "Subtractive EQ cleans up the mix." },
        "8": { "img": IMG_SHELF, "expl": "Additive EQ enhances features." },
        "9": { "img": IMG_BELL, "expl": "Surgical EQ fixes problems." },
        "10": { "img": IMG_STEREO, "expl": "Panning places sound in the stereo field." },
        "11": { "img": IMG_MID_SIDE, "expl": "M/S processing separates center and side." },
        "12": { "img": IMG_STEREO, "expl": "Width techniques expand the image." }
    },
    "Volume 7": { # FX
        "1": { "img": IMG_RT60, "expl": "Reverb adds space." },
        "2": { "img": IMG_PREDELAY, "expl": "Pre-delay separates source from reverb." },
        "3": { "img": IMG_RT60, "expl": "Decay time defines the room size." },
        "4": { "img": IMG_RT60, "expl": "Early reflections define character." },
        "5": { "img": IMG_RT60, "expl": "Damping controls high frequency decay." },
        "6": { "img": IMG_RT60, "expl": "Routing effects improves control." },
        "7": { "img": IMG_RT60, "expl": "Hall and Room are standard reverb types." },
        "8": { "img": IMG_RT60, "expl": "Plate/Spring are mechanical reverbs." },
        "9": { "img": IMG_RT60, "expl": "Convolution samples real spaces." },
        "10": { "img": IMG_SLAP, "expl": "Delay creates echoes." },
        "11": { "img": IMG_SLAP, "expl": "Feedback creates repeats." },
        "12": { "img": IMG_CHORUS, "expl": "Modulation FX widen the sound." }
    },
    "Volume 8": { # Mastering
        "1": { "img": IMG_CHAIN, "expl": "Mastering is the final polish." },
        "2": { "img": IMG_HEADROOM, "expl": "Headroom is essential for mastering." },
        "3": { "img": IMG_FREQ, "expl": "References guide the mastering process." },
        "4": { "img": IMG_DBFS, "expl": "Loudness is measured in LUFS." },
        "5": { "img": IMG_DBFS, "expl": "Streaming services have targets." },
        "6": { "img": IMG_CLIPPING, "expl": "True Peak prevents inter-sample clipping." },
        "7": { "img": IMG_CHAIN, "expl": "Signal flow acts as a funnel." },
        "8": { "img": IMG_SHELF, "expl": "Mastering EQ is subtle." },
        "9": { "img": IMG_COMP_GRAPH, "expl": "Mastering compression is glue." },
        "10": { "img": IMG_LIMITER, "expl": "Limiting ensures the final level." },
        "11": { "img": IMG_WAVE, "expl": "Editing cleans up the file." },
        "12": { "img": IMG_WAVE, "expl": "Fades ensure smooth transitions." }
    },
    "Volume 9": { # Acoustics
        "1": { "img": IMG_WAVE, "expl": "Sound waves interpret the room." },
        "2": { "img": IMG_WAVE, "expl": "Distance affects arrival time." },
        "3": { "img": IMG_RT60, "expl": "Reflections color the sound." },
        "4": { "img": IMG_RT60, "expl": "Absorption controls reverb." },
        "5": { "img": IMG_RT60, "expl": "Diffusion scatters sound." },
        "6": { "img": IMG_BASS, "expl": "Modes cause bass buildup." },
        "7": { "img": IMG_RT60, "expl": "RT60 measures decay." },
        "8": { "img": IMG_BASS, "expl": "Bass traps control low end." },
        "9": { "img": IMG_RT60, "expl": "Treatment balances the room." },
        "10": { "img": IMG_FREQ, "expl": "Monitors should be flat." },
        "11": { "img": IMG_STEREO, "expl": "Placement defines the sweet spot." },
        "12": { "img": IMG_STEREO, "expl": "Headphones remove the room." }
    },
    "Volume 10": { # Equipment
        "1": { "img": IMG_CHAIN, "expl": "Interfaces connect the studio." },
        "2": { "img": IMG_MIDI_ROLL, "expl": "Controllers trigger sound." },
        "3": { "img": IMG_CHAIN, "expl": "Routing manages signal flow." },
        "4": { "img": IMG_XLR, "expl": "Cables carry the signal." },
        "5": { "img": IMG_SPDIF, "expl": "Digital connections carry data." },
        "6": { "img": IMG_MICS, "expl": "Analog history defined the sound." },
        "7": { "img": IMG_CD, "expl": "Digital history changed the workflow." },
        "8": { "img": IMG_CHAIN, "expl": "Modern production is hybrid." },
        "9": { "img": IMG_GTR_AC, "expl": "Rock relies on capturing energy." },
        "10": { "img": IMG_SYNTH_FLOW, "expl": "EDM relies on synthesis." },
        "11": { "img": IMG_KICK, "expl": "Hip-hop relies on sampling and drums." },
        "12": { "img": IMG_POP, "expl": "Pop relies on vocals." }
    }
}

def load_json(filepath):
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {}
    return {}

def enrich_file(md_file_path, vol_num):
    print(f"Processing {md_file_path}...")
    
    with open(md_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by TOPICS
    topics = re.split(r'(?:#+\s*)(?:SUBJECT|TOPIC)\s*(\d+):', content, flags=re.IGNORECASE)
    
    # re.split keeps delimiters if capturing group used. 
    # Logic: [preamble, topic_num, body, topic_num, body...]
    
    new_content = topics[0] # Preamble
    
    # Iterate pairs
    for i in range(1, len(topics), 2):
        topic_num = topics[i]
        body = topics[i+1]
        
        # Add Header back (we lost the exact header string, regenerate or try to keep? 
        # The split consumed the header. I should reconstruct it.)
        # Actually, using split with capturing group makes it hard to reconstruct EXACT header format (### SUBJECT vs ## TOPIC).
        # Let's simple check the file content or use a smarter split.
        # But for now, I will assume a standard format or just reconstruct reasonable header.
        # Wait, if I change the header format, I might break parsing in generate_quiz_json if it relies on exact string?
        # generate_quiz_json uses: re.split(r'#+\s*(?:SUBJECT|TOPIC)\s*\d+:\s*(.+)', content)
        
        # Better: Don't split the header out completely, or just peek at what it was.
        # Or... Use the `enrich_markdown_vol2.py` logic which was `re.split(r'(## TOPIC \d+:.*)', content)`
        # But Vol 1 uses SUBJECT.
        
        # Let's re-read the file with a specific regex based on volume?
        # Vol 1 = SUBJECT. Vol 2-10 = TOPIC (mostly).
        # Let's try to match the header style from the body start? No.
        
        # Let's used a more generic split that captures the whole header line.
        pass
    
    # RE-DOING SPLIT LOGIC to be safe
    # Split by headers line-by-line is safer?
    # Or just use `re.split(r'(^(?:#+\s*)(?:SUBJECT|TOPIC)\s*\d+:.*)', content, flags=re.MULTILINE)`
    
    segments = re.split(r'(^(?:#+\s*)(?:SUBJECT|TOPIC)\s*\d+:.*)', content, flags=re.MULTILINE)
    
    new_content = ""
    current_topic_num = 0
    
    for section in segments:
        header_match = re.search(r'(?:SUBJECT|TOPIC)\s*(\d+):', section, flags=re.IGNORECASE)
        if header_match:
            current_topic_num = header_match.group(1)
            new_content += section
            continue
            
        if not current_topic_num:
             new_content += section
             continue
             
        # Process Questions
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
                expl = None
                img = None
                quote = None
                
                # 1. Manual Data (Vol 1 & 2)
                if vol_num == "1":
                    # Load from JSON
                    explanations_db = load_json(EXPLANATIONS_FILE).get("Volume 1", {})
                    # Need subject key "Subject X"
                    subj_key = f"Subject {current_topic_num}"
                    # Need level
                    is_basic = "Basic" in md_file_path
                    lvl_key = "Basic" if is_basic else "Intermediate"
                    
                    data = explanations_db.get(subj_key, {}).get(lvl_key, {}).get(str(current_q_num))
                    if data:
                        expl = data.get("expl")
                        img = data.get("img")
                
                elif vol_num == "2" and "Basic" in md_file_path:
                    # Use local VOL2_DATA
                    data = VOL2_DATA.get(str(current_topic_num), {}).get(str(current_q_num))
                    if data:
                        expl = data.get("expl")
                        img = data.get("img")

                # 2. Keyword Match
                if not expl:
                    text_lower = q_chunk.lower()
                    for key, data in KEYWORD_MATCHES.items():
                        if key in text_lower:
                            expl = data["expl"]
                            img = data["img"]
                            quote = "Terms like " + key + " are fundamental. - Dictionary"
                            break
                            
                # 3. Defaults
                if not expl:
                    vol_def = VOLUME_DEFAULTS.get(f"Volume {vol_num}")
                    if vol_def:
                        def_data = vol_def.get(str(current_topic_num))
                        if def_data:
                            expl = def_data["expl"]
                            img = def_data["img"]
                            quote = "Mastering this concept takes practice. - Education Team"
                
                # 4. Fetch Quote (if not already set)
                if not quote:
                    try:
                        quotes_db = load_json(QUOTES_FILE)
                        vol_key = f"Volume {vol_num}"
                        if vol_key in quotes_db:
                            # Try specific topic match first
                            topic_quotes = quotes_db[vol_key].get(str(current_topic_num), {}).get("quotes", [])
                            
                            if not topic_quotes:
                                # Fallback to generic "Topic X" if defined (from my generator)
                                topic_quotes = quotes_db[vol_key].get(str(current_topic_num), {}).get("quotes", [])
                            
                            if topic_quotes:
                                # Deterministic random based on Q number
                                try:
                                    idx = int(current_q_num) % len(topic_quotes)
                                    quote_obj = topic_quotes[idx]
                                    quote = f"{quote_obj['text']} - {quote_obj['author']}"
                                except:
                                    pass # int conversion failed
                    except Exception as e:
                        print(f"Error fetching quote: {e}")

                # Construct Injection
                if expl:
                    injection = "\n"
                    injection += f"\n**Expert Explanation:** {expl}"
                    if img:
                        injection += f"\n**Image:** ![\"Diagram\"]({img})"
                    if quote:
                        injection += f"\n**Expert Quote:** \"{quote}\""
                    
                    q_chunk = re.sub(r'(\*\*Answer: [A-D](.*?)\*\*)', r'\1' + injection, q_chunk)
                    
            new_content += q_chunk
            
    with open(md_file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {md_file_path}")

def main():
    volumes = sorted([d for d in os.listdir(ROOT_DIR) if d.startswith("Volume") and os.path.isdir(os.path.join(ROOT_DIR, d)) 
    # key=lambda x: int(re.search(r'\d+', x).group())
    ])
    
    # Sort logically
    volumes.sort(key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 999)

    for vol_dir in volumes:
        vol_num = re.search(r'\d+', vol_dir).group()
        print(f"--- Processing Volume {vol_num} ---")
        
        vol_path = os.path.join(ROOT_DIR, vol_dir)
        files = [f for f in os.listdir(vol_path) if f.endswith('.md')]
        
        for f in files:
            enrich_file(os.path.join(vol_path, f), vol_num)
            
if __name__ == "__main__":
    main()
