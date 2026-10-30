#!/usr/bin/env python3
"""
update_wordpress_dictionary.py
Enriches WordPress Page ID 13389:
https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/

Redesigns the Music Technology Dictionary into an examiner-grade, visually stunning,
interactive reference glossary with:
- Dark studio glassmorphism theme (#080e1a)
- 45+ high-definition technical SVG diagrams and genuine studio gear photos
- Interactive Lightbox image viewer for every diagram
- Instant live search with active term count & zero-state handling
- Interactive category filter pills
- Alphabet quick-jump navigation strip (A-Z)
- Copy definition button on every term
- Complete 365+ syllabus definitions across all 12 core Edexcel modules
- Links to interactive practice quizzes in the MTG App
"""

import urllib.request
import urllib.parse
import json
import base64
import os
import re

WP_PAGE_ID = 13389
WP_API_URL = f"https://www.musictechguru.com/wp-json/wp/v2/pages/{WP_PAGE_ID}"
B64_AUTH = base64.b64encode(b"musictechguru:hiaF gxey NNlR AzAo CJ5z hX4u").decode()

headers = {
    "Authorization": f"Basic {B64_AUTH}",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
}

CDN_BASE = "https://app.musictechguru.com/images"

def get_img_url(filename):
    if filename.endswith(".svg"):
        return f"{CDN_BASE}/svg/{filename}"
    return f"{CDN_BASE}/{urllib.parse.quote(filename)}"

# Parse existing terms from public/Music_Tech_Dictionary_COMPLETE.md
def parse_markdown_terms():
    path = "public/Music_Tech_Dictionary_COMPLETE.md"
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    current_sec = "General"
    current_sub = "General Terms"
    terms = []

    for line in lines:
        line_s = line.strip()
        if line_s.startswith("## "):
            h = line_s[3:].strip()
            if h not in ["2024 Complete Edition", "Table of Contents", "Music Styles"]:
                current_sec = h
                current_sub = h
        elif line_s.startswith("### "):
            current_sub = line_s[4:].strip()
        elif line_s.startswith("| **"):
            parts = [p.strip() for p in line_s.split("|")[1:-1]]
            if len(parts) >= 2:
                term = parts[0].replace("**", "").strip()
                defn = parts[1].replace("**", "").strip()
                # Clean up html entities or awkward formatting
                defn = defn.replace("&#8217;", "'").replace("&#8216;", "'").replace("&#038;", "&")
                terms.append({
                    "section": current_sec,
                    "sub": current_sub,
                    "term": term,
                    "definition": defn
                })
    return terms

# Additional examiner-critical syllabus terms to ensure 100% syllabus completeness
EXTRA_TERMS = [
    # 2.1 Acoustics & Room Treatment
    {"section": "2.1 Acoustics & Room Treatment", "sub": "Acoustics", "term": "RT60 (Reverberation Time 60dB)", "definition": "The standard metric for acoustic decay: the time in seconds it takes for sound pressure level in an enclosed space to decrease by 60dB after the sound source has stopped."},
    {"section": "2.1 Acoustics & Room Treatment", "sub": "Acoustics", "term": "Standing Waves (Room Modes)", "definition": "Stationary sound waves formed when acoustic reflections between parallel walls reinforce or cancel specific frequencies, creating severe peaks and nulls in bass response."},
    {"section": "2.1 Acoustics & Room Treatment", "sub": "Acoustics", "term": "Bass Trap", "definition": "Acoustic absorbers placed in room corners where low-frequency pressure builds up. Utilizes dense porous material or resonant diaphragms to tame muddy standing waves."},
    {"section": "2.1 Acoustics & Room Treatment", "sub": "Acoustics", "term": "Acoustic Diffuser", "definition": "Surface with mathematical wells (QRD/Skyline) that scatters reflected sound evenly in all directions without removing acoustic energy, preserving room liveness while eliminating flutter echoes."},
    {"section": "2.1 Acoustics & Room Treatment", "sub": "Acoustics", "term": "Flutter Echo", "definition": "Rapid, high-frequency ringing echo caused by sound bouncing repeatedly between parallel, hard, untreated reflective surfaces."},
    {"section": "2.1 Acoustics & Room Treatment", "sub": "Acoustics", "term": "Direct Sound vs Reflected Sound", "definition": "Direct sound travels straight from source to listener/mic first. Reflected sound bounces off surfaces, arriving later with altered timbre and spatial reverberation."},

    # 2.3 Leads, Signals & Levels
    {"section": "2.3 Leads, Signals & Levels", "sub": "Cables & Connections", "term": "Balanced Cable", "definition": "A cable containing three conductors: Hot (+), Cold (- inverted phase), and Ground shield. At the receiving differential amplifier, the cold signal is flipped and added to hot, doubling signal strength and completely cancelling induced electromagnetic hum (common-mode rejection)."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Cables & Connections", "term": "Unbalanced Cable", "definition": "A cable with two conductors: signal core and ground shield. Prone to picking up electromagnetic noise over runs longer than 5 metres (e.g. 1/4\" TS guitar leads, RCA phono)."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Cables & Connections", "term": "XLR (Cannon)", "definition": "3-pin locking balanced audio connector standard for microphone signals and professional line-level connections. Pin 1: Ground/Shield, Pin 2: Hot (+), Pin 3: Cold (-)."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Cables & Connections", "term": "TRS Jack", "definition": "Tip-Ring-Sleeve 1/4\" connector used for balanced mono signals (Tip=Hot, Ring=Cold, Sleeve=Ground) or unbalanced stereo headphones (Tip=Left, Ring=Right, Sleeve=Ground)."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Cables & Connections", "term": "TS Jack", "definition": "Tip-Sleeve 1/4\" connector used for unbalanced mono instrument connections such as electric guitars, basses, and pedal patch leads."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Cables & Connections", "term": "Speakon", "definition": "Heavy-duty locking connector designed by Neutrik for high-current connections between power amplifiers and passive loudspeakers. Prevents accidental disconnection and short circuits."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Signal Levels", "term": "Mic Level", "definition": "Very low voltage signal generated by microphones (typically -60 to -40 dBu), requiring a pre-amplifier to boost it up to line level before processing."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Signal Levels", "term": "Line Level", "definition": "Standard operating signal level in audio recording equipment. Professional line level is +4 dBu (1.228V RMS); consumer line level is -10 dBV (0.316V RMS)."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Signal Levels", "term": "Instrument Level (High-Z)", "definition": "High-impedance signal produced by passive electric guitar/bass pickups, requiring a high-input impedance (Hi-Z) or DI box to avoid high-frequency loss and tone loading."},
    {"section": "2.3 Leads, Signals & Levels", "sub": "Signal Levels", "term": "Speaker Level", "definition": "High voltage and high current signal output by a power amplifier to drive loudspeaker voice coils. Must never be connected to mic or line inputs."},

    # 1.14 Mastering & Digital Metering
    {"section": "1.14 Mastering & Digital Metering", "sub": "Mastering", "term": "Peak Level vs RMS Level", "definition": "Peak level measures the instantaneous highest voltage spike in an audio waveform. RMS (Root Mean Square) measures the continuous average power/loudness perceived by the human ear."},
    {"section": "1.14 Mastering & Digital Metering", "sub": "Mastering", "term": "LUFS (LKFS)", "definition": "Loudness Units relative to Full Scale. The international broadcast and streaming standard measuring integrated perceived loudness over time. (e.g. Spotify targets -14 LUFS, Apple Music -16 LUFS, YouTube -14 LUFS)."},
    {"section": "1.14 Mastering & Digital Metering", "sub": "Mastering", "term": "True Peak (dBTP)", "definition": "Metering that interpolates between digital samples to measure potential analog peaks generated during D/A reconstruction. Essential in mastering (typically set to -1.0 dBTP ceiling) to prevent inter-sample clipping on MP3/AAC encoding."},
    {"section": "1.14 Mastering & Digital Metering", "sub": "Mastering", "term": "Headroom", "definition": "The safety margin in decibels between the highest audio peak signal and the maximum level a system can handle without digital clipping or analog distortion (0 dBFS in digital)."},
    {"section": "1.14 Mastering & Digital Metering", "sub": "Mastering", "term": "Dithering", "definition": "Low-level un-correlated random noise deliberately added when converting digital audio from a higher bit depth (e.g. 24-bit or 32-bit float) to a lower bit depth (e.g. 16-bit CD audio) to eliminate quantization distortion and truncation artifacts."},
    {"section": "1.14 Mastering & Digital Metering", "sub": "Mastering", "term": "Brickwall Limiter", "definition": "A peak limiter with an infinite compression ratio (∞:1) and ultra-fast attack time used as the final stage of mastering to prevent any signal peak from exceeding a defined ceiling."},
    {"section": "1.14 Mastering & Digital Metering", "sub": "Mastering", "term": "Inter-Sample Clipping", "definition": "Distortion that occurs when the analog reconstruction filter between two consecutive high-level digital samples peaks above 0 dBFS, causing audible distortion on consumer playback converters."},
    {"section": "1.14 Mastering & Digital Metering", "sub": "Mastering", "term": "Dynamic Range (LRA)", "definition": "The ratio in decibels between the quietest background noise floor and the loudest undistorted peak of an audio recording. Loudness Range (LRA) measures variation across a track."}
]

# Curated Visual Showcase Galleries with diagrams and photos
GALLERIES = {
    "General Music Tech Terms": [
        ("human_hearing_range.svg", "Human Hearing Spectrum", "20Hz – 20kHz frequency spectrum and octave distribution audible to human hearing."),
        ("audio_transducer_principles.svg", "Transducer Principle", "Conversion of mechanical air pressure fluctuations into electrical voltage across diaphragms."),
        ("decibel_scale.svg", "Decibel & Dynamic Range Scale", "Logarithmic dB scale from 0 dB SPL (threshold of hearing) to 130 dB SPL (threshold of pain).")
    ],
    "1.1 Recording and Production Techniques": [
        ("equipment_signal_flow_insert_serial.svg", "Serial Insert Signal Flow", "100% of channel signal routes sequentially through hardware/plugin processors (e.g. EQ, compressor)."),
        ("equipment_signal_flow_send_return_parallel.svg", "Parallel Aux Send / Return", "A tapped copy of multiple channels feeds a shared auxiliary bus processor (e.g. reverb, delay)."),
        ("Mastering_and_production_room_at_Audio_Mix_House,_Studio_D_(13431465744).jpg", "Professional Studio Control Room", "Acoustically isolated control room with mixing console, nearfield monitors, and outboard rack hardware."),
        ("Logic Mixer.png", "Digital Audio Workstation (DAW) Mixer", "Software mixing environment featuring channel strips, inserts, sends, faders, and stereo bus routing.")
    ],
    "1.2 Microphones": [
        ("polar_pattern_cardioid.svg", "Cardioid Polar Pattern", "Directional pickup with maximum sensitivity at 0° on-axis and complete null rejection at 180° rear."),
        ("polar_pattern_figure8.svg", "Figure-8 (Bidirectional)", "Equal sensitivity to front (0°) and rear (180°), with 100% rejection at the 90° and 270° sides."),
        ("polar_pattern_omni.svg", "Omnidirectional Polar Pattern", "Spherical 360° sensitivity capturing room acoustics evenly with zero proximity effect."),
        ("polar_pattern_supercardioid.svg", "Supercardioid Pattern", "Narrower front pickup than cardioid with tighter side rejection and a small rear sensitivity lobe."),
        ("mic_dynamic_construction.svg", "Dynamic Moving-Coil Construction", "Diaphragm attached to copper coil suspended in magnetic field; robust with high SPL handling."),
        ("mic_condenser_construction.svg", "Condenser Electrostatic Construction", "Lightweight gold-sputtered diaphragm and fixed backplate forming a capacitor requiring +48V phantom power."),
        ("mic_ribbon_construction.svg", "Ribbon Velocity Construction", "Corrugated aluminum ribbon suspended between magnetic poles offering smooth high-frequency response."),
        ("Neumann U87 Microphone.png", "Neumann U87 Multi-Pattern Condenser", "Industry-standard large diaphragm studio condenser featuring switchable omni, cardioid, and figure-8 patterns."),
        ("RCA_44-BX_Bi-Directional_Velocity_Microphone.jpg", "RCA 44-BX Classic Ribbon Microphone", "Historic figure-8 velocity ribbon microphone famous for smooth vintage warmth and creamy vocal tone.")
    ],
    "1.2 Microphones -> Micing Techniques": [
        ("stereo_blumlein_diagram.svg", "Blumlein Coincident Stereo Pair", "Two bidirectional figure-8 microphones angled at 90° with coincident capsules for realistic stereo imaging."),
        ("rule_3_to_1_microphone_placement.svg", "The 3:1 Microphone Placement Rule", "Distance between microphones must be at least 3 times the distance from source to mic to avoid phase comb filtering."),
        ("mic_placement_acoustic_guitar.svg", "Acoustic Guitar Micing Setup", "Cardioid mic pointed at the 12th fret (15-30cm away) balancing finger attack and body resonance without boomy soundhole buildup."),
        ("mic_placement_snare.svg", "Snare Drum Micing (Top & Bottom)", "Top mic captures crack and stick transient; bottom mic captures snare wires (with phase inversion switch engaged).")
    ],
    "1.3 Synthesis": [
        ("synth_signal_flow.svg", "Subtractive Synthesis Architecture", "Classic signal flow: Oscillators (VCO) generate harmonics → Filter (VCF) shapes timbre → Amplifier (VCA) shapes volume."),
        ("synth_waveforms_comparison.svg", "Synthesis Harmonic Waveforms", "Sine (fundamental only), Triangle (odd harmonics falling off fast), Sawtooth (all harmonics), Square/Pulse (odd harmonics)."),
        ("adsr_envelope_phases.svg", "ADSR Envelope Generators", "Attack time, Decay time, Sustain level, and Release time modulating amplitude or filter cutoff."),
        ("filter_resonance_diagram.svg", "Filter Resonance & Cutoff", "Resonant peak (Q) boosting frequencies immediately surrounding the cutoff point to create synthetic bite."),
        ("filter_types_diagram.svg", "Filter Response Topologies", "Low-Pass (LPF), High-Pass (HPF), Band-Pass (BPF), and Notch filtering curves."),
        ("modulation_lfo_depth_rate.svg", "LFO Modulation (Rate & Depth)", "Low Frequency Oscillator modulating pitch (vibrato), volume (tremolo), or filter cutoff (wah-wah)."),
        ("Modular Synth.jpg", "Vintage Modular Synthesizer", "Analogue hardware modular synth utilizing physical patch cables to route control voltages (CV/Gate) between modules.")
    ],
    "1.4 Sampling": [
        ("sample_rate_stairs.svg", "Sample Rate & Nyquist Staircase", "Frequency sampling: audio must be sampled at least twice its highest frequency component to prevent aliasing."),
        ("digital_quantization_error_steps.svg", "Bit Depth & Quantization Steps", "Amplitude resolution: higher bit depth increases dynamic range (16-bit = 96dB, 24-bit = 144dB) and lowers noise floor."),
        ("sample_dc_offset_correction.svg", "DC Offset Waveform Correction", "Centering vertical waveform displacement back to the 0V baseline to prevent clicks during audio edits and restore headroom."),
        ("sample_normalization_levels.svg", "Sample Peak Normalization", "Digital gain scaling that boosts the highest audio peak to 0 dBFS (or defined ceiling) across the file."),
        ("sample_fade_types.svg", "Audio Crossfade Geometries", "Linear, logarithmic, and equal-power crossfades preventing pops and maintaining constant perceived volume."),
        ("Akai_MPC.png", "Akai MPC Sampling Workstation", "Iconic 16-pad hardware sampler/sequencer that defined hip-hop beatmaking and rhythmic audio groove.")
    ],
    "1.5 Sequencing": [
        ("MIDI Piano Roll Logic.png", "Logic Pro MIDI Piano Roll", "Grid editor displaying musical note pitches on the vertical axis and rhythmic bars/beats on the horizontal axis."),
        ("quantize_grid.svg", "MIDI Quantization Grid", "Snapping recorded note attack times and note endings to exact musical grid intervals (e.g. 1/8, 1/16, triplet)."),
        ("midi_velocity_dynamic_ranges.svg", "MIDI Note Velocity (0–127)", "7-bit numerical value representing key strike velocity to trigger dynamic sample layers and filter brightness."),
        ("midi_cc_message_3byte_structure.svg", "MIDI 3-Byte Protocol Structure", "Status byte followed by two data bytes conveying note number, velocity, pitch bend, and continuous control."),
        ("history_midi_connection_loop.svg", "Standard MIDI 5-Pin DIN Loop", "Serial communication daisy chain connecting MIDI In, MIDI Out, and MIDI Thru ports.")
    ],
    "1.9 Dynamic Processing": [
        ("compression_graph.svg", "Compressor Transfer Curve", "Input vs Output transfer curve displaying Threshold point, Ratio slope, and Gain Reduction."),
        ("compressor_knee_hard_soft.svg", "Hard Knee vs Soft Knee Compression", "Soft knee gradually introduces compression ratio around threshold for smooth, transparent mastering control."),
        ("compression_attack_release.svg", "Attack & Release Dynamic Envelope", "Attack controls how fast compression engages after threshold is exceeded; release controls speed of recovery."),
        ("sidechain_compression_ducking.svg", "Sidechain Compression & Ducking", "Directing an external signal (e.g. kick drum) to duck the gain of another track (e.g. bassline)."),
        ("gate_envelope_graph.svg", "Noise Gate Envelope", "Threshold, Attack, Hold, and Release parameters silencing unwanted bleed, spill, or hiss below threshold.")
    ],
    "1.9 Dynamic Processing -> Compressor Topologies": [
        ("Vintage Opto Compressor (Teletronix LA-2A).png", "Teletronix LA-2A Optical Compressor", "Uses an electroluminescent light panel and photo-resistor for smooth, warm, two-stage program-dependent release."),
        ("Studio FET Compressor (UREI 1176 Blackface).png", "UREI 1176 FET Compressor", "Ultra-fast field-effect transistor circuit capable of 20-microsecond attack times; famous for aggressive drum punch."),
        ("Vintage VCA Compressor (SSL G Series).png", "SSL G-Master Bus VCA Compressor", "Voltage-Controlled Amplifier providing tight, punchy glue and transparent gain reduction across stereo mixes."),
        ("DBX 160 Compressor.png", "DBX 160 VCA Compressor", "Legendary hard-knee VCA compressor renowned for snappy, punchy kick and snare drum dynamics.")
    ],
    "1.11 EQ": [
        ("eq_bell_curve_q_comparison.svg", "Parametric Bell Curve & Q Factor", "Quality factor Q = Center Frequency / Bandwidth. High Q = narrow surgical notch; Low Q = wide musical tone shaping."),
        ("eq_filter_slopes_db_octave.svg", "Filter Slopes (dB / Octave)", "Steepness of attenuation roll-off: 6dB (1-pole), 12dB (2-pole), 18dB (3-pole), 24dB (4-pole)."),
        ("high_pass_filter.svg", "High-Pass Filter (Low Cut)", "Attenuates sub-bass rumble, stage vibration, and mic handling noise while passing higher frequencies unhindered."),
        ("eq_frequency_spectrum_ranges.svg", "Audio Frequency Spectrum Bands", "Sub (20-60Hz), Bass (60-250Hz), Low-Mid (250-500Hz), Mid (500-2kHz), High-Mid (2-6kHz), Highs/Air (6-20kHz)."),
        ("Channel EQ.png", "Logic Pro 8-Band Channel EQ", "Full visual parametric equalizer with real-time FFT spectrum analyzer, shelving filters, and bell curves.")
    ],
    "1.12 Effects": [
        ("reverb_early_vs_late_reflections.svg", "Acoustic Reverb Architecture", "Direct sound arrives first, followed by discrete early reflections (giving room size cues), and diffuse late reverb tail."),
        ("reverb_pre_delay.svg", "Reverb Pre-Delay Timing", "Time delay between dry source and the onset of reflections. Retains vocal clarity and front-of-mix presence."),
        ("reverb_plate_spring_diagram.svg", "Plate & Spring Electromechanical Reverb", "Mechanical reverbs vibrating suspended steel sheets (plate) or coiled springs (guitar amps)."),
        ("delay_feedback_loop.svg", "Delay Signal Feedback Loop", "Percentage of delayed signal routed back into the input to create repeating rhythmic echoes."),
        ("Tape delay picture.png", "Vintage Tape Delay Echo Unit", "Analogue magnetic tape loop with record, playback, and erase heads creating warm, saturated repeats with wow and flutter."),
        ("modulation_flanger.svg", "Flanger & Comb Filtering", "Short delay (0.5–10ms) modulated by LFO mixed with dry signal creates deep sweeping peaks and notches like a jet plane.")
    ],
    "1.6 Audio Editing": [
        ("comping_lanes.svg", "Vocal Comping & Take Lanes", "Compositing multiple takes into a master performance using lane selection, crossfades, and edit points."),
        ("tape_splicing_ruler_7_4_loop.svg", "Analogue Tape Splicing & Editing", "Historic physical razor blade editing on 1/4\" or 2\" magnetic tape using splicing blocks and adhesive leader tape.")
    ],
    "1.7 Pitch and Rhythm Correction": [
        ("autotune_retune_speed_vocoder.svg", "Autotune Retune Speed & Pitch Correction", "Fast retune speeds (0ms) produce iconic robotic quantizing; slower retune speeds (20-50ms) retain natural vocal vibrato."),
        ("daw_vocal_comping_lanes.svg", "DAW Flex Pitch & Audio Quantising", "Manipulating vocal pitch notes and rhythmic transients without altering tempo or introducing phase artifacts.")
    ],
    "1.10 Stereo": [
        ("pan_law.svg", "Stereo Pan Law Attenuation", "Center-panned audio signals are automatically attenuated by 3dB to 4.5dB to prevent an artificial volume spike in stereo."),
        ("pan_pot.svg", "Pan Potentiometer (Differential Resistance)", "Dual ganged potentiometer that decreases volume on one channel while increasing volume on the opposite channel.")
    ],
    "1.14 Mastering & Digital Metering": [
        ("intersample_peak_clip.svg", "Inter-Sample Peak Clipping (True Peak)", "Analog reconstruction filters can cause peaks between consecutive digital samples to exceed 0 dBFS, creating DAC distortion."),
        ("clipping_meter.svg", "Digital Full Scale (0 dBFS) & Headroom", "Peak metering illustrating the absolute ceiling of digital audio where exceeding 0 dBFS causes harsh square-wave clipping."),
        ("fairchild_660_tube_limiter.svg", "Fairchild 660 Tube Mastering Limiter", "Legendary variable-mu vintage tube mastering limiter with 6 selectable time constants and smooth transformer saturation.")
    ],
    "2.1 Acoustics & Room Treatment": [
        ("acoustics_bass_trap_corner_placement.svg", "Corner Bass Trap Absorption", "Low frequency modal pressure builds up in trihedral room corners; bass traps dampen low-end resonance."),
        ("acoustics_rt60_decay_room_comparison.svg", "RT60 Decay Time Measurement", "Graph comparing decay time across anechoic chambers (0.0s), control rooms (0.3s), concert halls (1.8s), and cathedrals (5s+)."),
        ("pan_law.svg", "Stereo Pan Law Attenuation", "Center-panned audio signals are automatically attenuated by 3dB to 4.5dB to prevent an artificial volume spike in stereo.")
    ],
    "2.3 Leads, Signals & Levels": [
        ("cable_xlr_pinout.svg", "Balanced XLR 3-Pin Pinout", "Pin 1: Ground/Shield, Pin 2: Hot (+ polarity), Pin 3: Cold (- inverted polarity) for common-mode noise cancellation."),
        ("balanced_cable.svg", "Balanced Differential Noise Cancellation", "External electromagnetic interference picked up equally on hot and cold conductors is cancelled at the differential input."),
        ("equipment_di_box_function.svg", "Direct Injection (DI Box) Circuit", "Transforms unbalanced, high-impedance instrument outputs into balanced, low-impedance mic signals with galvanic ground lift.")
    ]
}

def build_visual_gallery_html(section_key):
    items = []
    for k, v in GALLERIES.items():
        if k == section_key or k.startswith(section_key + " ->") or k.startswith(section_key + ":"):
            items.extend(v)
    if not items:
        return ""
    
    cards_html = []
    for fn, title, desc in items:
        img_url = get_img_url(fn)
        cards_html.append(f"""
        <div class="mtg-visual-card" onclick="mtgOpenLightbox('{img_url}', '{title}', '{desc}')" title="Click to view full resolution">
            <div class="mtg-card-img-wrap">
                <img src="{img_url}" alt="{title}" loading="lazy">
                <span class="mtg-zoom-pill">🔍 Enlarge</span>
            </div>
            <div class="mtg-card-body">
                <h4 class="mtg-card-title">{title}</h4>
                <p class="mtg-card-desc">{desc}</p>
            </div>
        </div>
        """)
    
    return f"""
    <div class="mtg-gallery-section">
        <div class="mtg-gallery-header">
            <span class="mtg-gallery-badge">📐 Visual Reference Showcase</span>
            <h3 class="mtg-gallery-title">Key Diagrams &amp; Hardware Guides</h3>
            <p class="mtg-gallery-sub">Examiner-verified signal flow, schematics, and equipment photos for this module.</p>
        </div>
        <div class="mtg-gallery-grid">
            {''.join(cards_html)}
        </div>
    </div>
    """

def get_term_target(term, section, sub):
    t_lower = term.lower()
    s_lower = section.lower()
    sub_lower = sub.lower()
    
    # 1. Specific gear & instruments with dedicated WordPress study pages
    if 'mellotron' in t_lower:
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-mellotron/', '📖 Mellotron Guide', 'web')
    if 'clavinet' in t_lower:
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-clavinet/', '📖 Clavinet Guide', 'web')
    if any(k in t_lower for k in ['rhodes', 'wurlitzer', 'electric piano']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/electric-piano/', '📖 E-Piano Guide', 'web')
    if any(k in t_lower for k in ['reverb', 'rt60', 'pre-delay', 'decay time', 'early reflection', 'plate reverb', 'spring reverb', 'convolution', 'chamber reverb', 'hall reverb', 'gated reverb']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/reverb/', '📖 Reverb Guide', 'web')
    if any(k in t_lower for k in ['delay', 'slapback', 'echo', 'multi-tap', 'ping-pong', 'feedback delay', 'tape delay', 'bucket brigade']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/delay/', '📖 Delay Guide', 'web')
    if 'chorus' in t_lower:
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/chorus/', '📖 Chorus Guide', 'web')
    if any(k in t_lower for k in ['flanger', 'flanging', 'comb filter']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/flanger/', '📖 Flanger Guide', 'web')
    if any(k in t_lower for k in ['phaser', 'phasing', 'all-pass filter', 'phase shifter']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/phaser/', '📖 Phaser Guide', 'web')
    if any(k in t_lower for k in ['electric guitar', 'single coil', 'humbucker', 'pickup', 'whammy']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-electric-guitar/', '📖 Guitar Guide', 'web')
    if any(k in t_lower for k in ['amplifier', 'valve', 'tube amp', 'cabinet', 'combo amp', 'overdrive', 'distortion pedal']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/amplifiers/', '📖 Amp Guide', 'web')
    if any(k in t_lower for k in ['vinyl', 'cassette', 'compact disc', 'mp3', 'lossless', 'aac', 'wav', 'music format']):
        return ('https://www.musictechguru.com/music-formats/', '📖 Formats Guide', 'web')
    if any(k in t_lower for k in ['direct to tape', 'reel-to-reel', 'tape head', 'magnetic tape', 'bias frequency']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/direct-to-tape-recording-1950-1963/', '📖 Tape Guide', 'web')
    if any(k in t_lower for k in ['mixer', 'mixing desk', 'console', 'channel strip', 'fader', 'pan pot', 'aux send', 'insert point', 'bus', 'bussing', 'patch bay']):
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/audio-mixers/', '📖 Mixer Guide', 'web')

    # 2. Synthesis module -> Web guide
    if 'synth' in s_lower or 'synth' in sub_lower:
        return ('https://www.musictechguru.com/homepage/a-level-music-technology/component-3-music-technology-in-context/the-synthesizer/', '📖 Synth Guide', 'web')

    # 3. Topic Mastery Quizzes in the MTG Revision App
    if 'microphon' in s_lower or 'microphon' in sub_lower or 'micing' in sub_lower or 'polar pattern' in sub_lower:
        return ('https://app.musictechguru.com/?quiz=quiz-topic-2_p1', '⚡ Mic Quiz', 'app')
    if 'dynamic' in s_lower or 'compress' in sub_lower or 'dynamic' in sub_lower or any(k in t_lower for k in ['compress', 'threshold', 'ratio', 'knee', 'limiter', 'gate', 'expander', 'ducking', 'sidechain']):
        return ('https://app.musictechguru.com/?quiz=quiz-topic-5_p1', '⚡ Dynamics Quiz', 'app')
    if 'eq' in s_lower or 'filter' in s_lower or 'eq' in sub_lower or any(k in t_lower for k in ['parametric', 'graphic eq', 'high-pass', 'low-pass', 'shelving', 'bandwidth', 'q factor', 'notch']):
        return ('https://app.musictechguru.com/?quiz=quiz-topic-6_p1', '⚡ EQ Quiz', 'app')
    if 'sample' in s_lower or 'editing' in s_lower or any(k in t_lower for k in ['sample rate', 'bit depth', 'nyquist', 'aliasing', 'quantiz', 'dither', 'dc offset', 'truncate', 'crossfade']):
        return ('https://app.musictechguru.com/?quiz=quiz-topic-4_p1', '⚡ Sampling Quiz', 'app')
    if 'sequenc' in s_lower or 'midi' in s_lower or any(k in t_lower for k in ['midi', 'piano roll', 'velocity', 'note on', 'controller', 'cc', 'channel']):
        return ('https://app.musictechguru.com/?quiz=quiz-topic-38', '⚡ MIDI Quiz', 'app')
    if 'mastering' in s_lower or any(k in t_lower for k in ['lufs', 'true peak', 'headroom', 'brickwall', 'inter-sample']):
        return ('https://app.musictechguru.com/?quiz=quiz-topic-8_p1', '⚡ Mastering Quiz', 'app')
    if 'acoust' in s_lower or any(k in t_lower for k in ['room mode', 'standing wave', 'bass trap', 'absorption', 'diffus']):
        return ('https://app.musictechguru.com/?quiz=quiz-topic-9_p1', '⚡ Acoustics Quiz', 'app')
    if 'lead' in s_lower or 'signal' in s_lower or 'level' in s_lower or any(k in t_lower for k in ['xlr', 'trs', 'jack', 'speakon', 'balanced', 'unbalanced', 'di box', 'line level', 'mic level']):
        return ('https://app.musictechguru.com/?quiz=quiz-topic-10_p1', '⚡ Hardware Quiz', 'app')
    if 'stereo' in s_lower or any(k in t_lower for k in ['pan law', 'stereo width', 'binaural', 'mono compat']):
        return ('https://app.musictechguru.com/?quiz=quiz-topic-40', '⚡ Stereo Quiz', 'app')

    # Default fallback to Stage 2 Fundamentals Quiz in MTG App
    return ('https://app.musictechguru.com/?quiz=quiz-topic-1_p1', '⚡ App Drill', 'app')

def generate_full_html():
    parsed_terms = parse_markdown_terms()
    all_terms = parsed_terms + EXTRA_TERMS
    
    # Map section titles to broad user-friendly categories for filtering
    def get_category_group(sec):
        sec_l = sec.lower()
        if "general" in sec_l:
            return "General Audio"
        if "mic" in sec_l:
            return "Microphones"
        if "synth" in sec_l:
            return "Synthesis"
        if "sample" in sec_l:
            return "Sampling"
        if "dynamic" in sec_l or "compress" in sec_l:
            return "Dynamics"
        if "eq" in sec_l or "filter" in sec_l:
            return "EQ & Filters"
        if "effect" in sec_l or "reverb" in sec_l or "delay" in sec_l or "flange" in sec_l:
            return "Effects"
        if "sequenc" in sec_l or "midi" in sec_l or "daw" in sec_l:
            return "Sequencing & MIDI"
        if "lead" in sec_l or "cable" in sec_l or "hardware" in sec_l or "level" in sec_l or "recording and prod" in sec_l:
            return "Hardware & Signals"
        if "stereo" in sec_l or "acoust" in sec_l:
            return "Stereo & Acoustics"
        if "mastering" in sec_l:
            return "Mastering"
        return "General Audio"

    for t in all_terms:
        t["group"] = get_category_group(t["section"])

    # Group terms by section for ordered structured presentation
    sections_order = [
        "General Music Tech Terms",
        "1.1 Recording and Production Techniques",
        "2.3 Leads, Signals & Levels",
        "1.2 Microphones",
        "1.3 Synthesis",
        "1.4 Sampling",
        "1.5 Sequencing",
        "1.6 Audio Editing",
        "1.7 Pitch and Rhythm Correction",
        "1.9 Dynamic Processing",
        "1.11 EQ",
        "1.12 Effects",
        "1.10 Stereo",
        "2.1 Acoustics & Room Treatment",
        "1.14 Mastering & Digital Metering"
    ]

    terms_by_section = {}
    for t in all_terms:
        sec = t["section"]
        if sec not in terms_by_section:
            terms_by_section[sec] = []
        terms_by_section[sec].append(t)

    # Section display names, emojis & summaries
    section_meta = {
        "General Music Tech Terms": ("General Audio & Acoustic Fundamentals", "🔊", "Core definitions of amplitude, frequency, decibels, transducers, and signal characteristics."),
        "1.1 Recording and Production Techniques": ("Recording, Studio Hardware & Signal Flow", "🎛️", "DAW transport, automation modes, patch bays, and studio hardware signal flow."),
        "2.3 Leads, Signals & Levels": ("Cables, Connectors & Signal Levels", "🔌", "Balanced vs unbalanced wiring, XLR, TRS, DI box impedance, and mic/line/speaker voltages."),
        "1.2 Microphones": ("Microphones, Transducers & Micing Techniques", "🎙️", "Cardioid, figure-8, and omni polar patterns, dynamic, condenser, ribbon mechanics, and stereo micing."),
        "1.3 Synthesis": ("Synthesis Architecture & Sound Design", "🎹", "Subtractive signal path (VCO → VCF → VCA), harmonic waveforms, filter cutoff, resonance, LFO, and ADSR envelopes."),
        "1.4 Sampling": ("Sampling & Digital Audio Processing", "🎛️", "Sample rate, bit depth, Nyquist theorem, DC offset, normalization, truncating, and crossfade loops."),
        "1.5 Sequencing": ("Sequencing, MIDI Protocol & DAW Workflow", "🎼", "MIDI piano roll, velocity dynamics, 3-byte protocol, quantization grids, and groove editing."),
        "1.6 Audio Editing": ("Audio Editing & Sample Splicing", "✂️", "Zero-crossing cuts, scrubbing, top-and-tail editing, destructive vs non-destructive trimming."),
        "1.7 Pitch and Rhythm Correction": ("Pitch Correction & Rhythm Editing", "🎯", "Autotune retune speeds, formant correction, Melodyne vocal flex, and audio quantising."),
        "1.9 Dynamic Processing": ("Dynamic Processing & Compressor Topologies", "🔉", "Threshold, ratio, knee, attack/release, sidechain ducking, noise gates, and Opto/FET/VCA hardware."),
        "1.11 EQ": ("Equalisation (EQ) & Filter Topologies", "🎚️", "Parametric EQ, Q bandwidth factor, shelving filters, high/low-pass slopes, and frequency spectrum bands."),
        "1.12 Effects": ("Time-Based & Modulation Effects", "✨", "Reverb decay (RT60), pre-delay, early reflections, feedback delay, slapback, tape delay, chorus, and flanging."),
        "1.10 Stereo": ("Stereo Imaging & Panning Law", "🎧", "Stereo width, binaural imaging, pan pot attenuation laws, and mono phase compatibility."),
        "2.1 Acoustics & Room Treatment": ("Studio Acoustics & Sound Treatment", "🏛️", "RT60 decay times, room modes, bass traps, diffusion, absorption coefficients, and flutter echoes."),
        "1.14 Mastering & Digital Metering": ("Mastering, Headroom & Digital Metering", "📈", "Peak vs RMS loudness, LUFS streaming targets, True Peak (dBTP), inter-sample clipping, and dithering.")
    }

    # Build sections HTML
    rendered_sections = []
    
    for sec_key in sections_order:
        sec_terms = terms_by_section.get(sec_key, [])
        if not sec_terms:
            continue
        
        meta = section_meta.get(sec_key, (sec_key, "📖", "Examiner verified syllabus terms and definitions."))
        sec_title = meta[0]
        sec_emoji = meta[1]
        sec_desc = meta[2]
        
        # Build gallery for section
        gallery_html = build_visual_gallery_html(sec_key)
        
        # Build table rows for terms
        rows_html = []
        for t in sec_terms:
            term_name = t["term"]
            definition = t["definition"]
            sub_topic = t["sub"]
            group = t["group"]
            
            # Highlight key technical words inside definition for study clarity
            display_defn = definition
            # Safe highlight of standard keywords
            for kw in ["threshold", "ratio", "knee", "attack", "release", "cutoff", "resonance", "decibels", "balanced", "unbalanced", "phantom power", "nyquist", "aliasing", "phase cancellation", "lufs"]:
                display_defn = re.sub(rf'\b({kw})\b', r'<strong class="mtg-kw">\1</strong>', display_defn, flags=re.IGNORECASE)

            clean_term_attr = term_name.replace('"', '&quot;').replace("'", "&#39;")
            clean_defn_attr = definition.replace('"', '&quot;').replace("'", "&#39;")

            link_url, link_label, link_type = get_term_target(term_name, sec_key, sub_topic)
            link_title = f"Study {term_name} on Music Tech Guru" if link_type == "web" else f"Practice {term_name} quiz in the MTG App"

            rows_html.append(f"""
            <tr class="mtg-term-row" data-term="{clean_term_attr.lower()}" data-group="{group}" data-section="{sec_key.lower()}">
                <td class="mtg-col-term">
                    <div class="mtg-term-head">
                        <a href="{link_url}" target="_blank" rel="noopener" class="mtg-term-name-link" title="{link_title}">{term_name} <span class="mtg-link-icon">↗</span></a>
                        <span class="mtg-subtopic-tag">{sub_topic}</span>
                    </div>
                </td>
                <td class="mtg-col-defn">
                    <p class="mtg-defn-text">{display_defn}</p>
                </td>
                <td class="mtg-col-act">
                    <div class="mtg-term-actions">
                        <a href="{link_url}" target="_blank" rel="noopener" class="mtg-action-link mtg-action-{link_type}" title="{link_title}">{link_label}</a>
                        <span role="button" tabindex="0" class="mtg-copy-btn" onclick="mtgCopyTerm(this, '{clean_term_attr}', '{clean_defn_attr}')" title="Copy term and definition">📋 <span class="btn-txt">Copy</span></span>
                    </div>
                </td>
            </tr>
            """)

        rendered_sections.append(f"""
        <section class="mtg-dict-module" id="module-{sec_key.lower().replace(' ', '-').replace('.', '-')}" data-section-name="{sec_key.lower()}">
            <div class="mtg-module-header">
                <div class="mtg-module-title-wrap">
                    <span class="mtg-module-icon">{sec_emoji}</span>
                    <div>
                        <h2 class="mtg-module-heading">{sec_title}</h2>
                        <p class="mtg-module-sub">{sec_desc}</p>
                    </div>
                </div>
                <span class="mtg-term-count-badge">{len(sec_terms)} Terms</span>
            </div>

            {gallery_html}

            <div class="mtg-table-container">
                <table class="mtg-dict-table">
                    <thead>
                        <tr>
                            <th style="width: 27%;">Term</th>
                            <th style="width: 58%;">Examiner Definition &amp; Technical Explanation</th>
                            <th style="width: 15%; text-align: center;">Study &amp; Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        {''.join(rows_html)}
                    </tbody>
                </table>
            </div>
        </section>
        """)

    total_count = len(all_terms)
    rendered_sections_html = ''.join(rendered_sections)
    alpha_buttons = ''.join([f'<span role="button" tabindex="0" class="mtg-alpha-btn" onclick="mtgJumpLetter(\x27{letter}\x27)">{letter}</span>' for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"])

    category_buttons_data = [
        ("all", f"✨ All ({total_count})"),
        ("Microphones", "🎙️ Microphones"),
        ("Synthesis", "🎹 Synthesis"),
        ("Sampling", "🎛️ Sampling"),
        ("Dynamics", "🔉 Dynamics"),
        ("EQ & Filters", "🎚️ EQ & Filters"),
        ("Effects", "✨ Effects"),
        ("Sequencing & MIDI", "🎼 Sequencing & MIDI"),
        ("Hardware & Signals", "🔌 Hardware & Leads"),
        ("Stereo & Acoustics", "🎧 Stereo & Acoustics"),
        ("Mastering", "📈 Mastering")
    ]
    filter_buttons_html = ''.join([
        f'<span role="button" tabindex="0" class="mtg-filter-btn{" active" if slug == "all" else ""}" data-group="{slug}" onclick="mtgSetFilter(\x27{slug}\x27, this)">{label}</span>'
        for slug, label in category_buttons_data
    ])

    # Generate Schema.org DefinedTermSet JSON-LD graph for SEO
    defined_terms_json = []
    for t in all_terms:
        t_url, _, _ = get_term_target(t["term"], t["section"], t["sub"])
        defined_terms_json.append({
            "@type": "DefinedTerm",
            "name": t["term"],
            "description": t["definition"],
            "url": t_url,
            "inDefinedTermSet": "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/#glossary"
        })

    schema_graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/#webpage",
                "url": "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/",
                "name": "The Official Music Technology Dictionary | Music Tech Guru",
                "description": "Complete Pearson Edexcel A-Level Music Technology glossary and visual guide with 364+ examiner-verified definitions, technical signal-flow diagrams, and hardware guides.",
                "inLanguage": "en-GB",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://www.musictechguru.com/#website",
                    "name": "Music Tech Guru",
                    "url": "https://www.musictechguru.com/"
                },
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.musictechguru.com/"},
                        {"@type": "ListItem", "position": 2, "name": "A-Level Music Technology", "item": "https://www.musictechguru.com/homepage/a-level-music-technology/"},
                        {"@type": "ListItem", "position": 3, "name": "Component 4 Production & Analysing", "item": "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/"},
                        {"@type": "ListItem", "position": 4, "name": "Music Technology Dictionary", "item": "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/"}
                    ]
                }
            },
            {
                "@type": "DefinedTermSet",
                "@id": "https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/#glossary",
                "name": "Pearson Edexcel Music Technology Specification Glossary",
                "description": "Examiner-verified definitions and signal-flow terminology for A-Level & GCSE Music Technology.",
                "hasDefinedTerm": defined_terms_json
            }
        ]
    }
    schema_json_ld = json.dumps(schema_graph, ensure_ascii=False)

    full_page_html = f"""
<!-- MTG Music Technology Dictionary - Complete Interactive Edition -->
<!-- Schema.org DefinedTermSet Structured Data for Google Rich Results -->
<script type="application/ld+json">
{schema_json_ld}
</script>

<div id="mtg-dict-app-root">
    <!-- Open Graph & Twitter Social Metadata -->
    <meta property="og:title" content="The Official Music Technology Dictionary | Music Tech Guru" />
    <meta property="og:description" content="364+ examiner-verified definitions, visual signal-flow diagrams, and studio hardware guides for Pearson Edexcel A-Level Music Technology Component 3 &amp; 4." />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/" />
    <meta property="og:image" content="https://app.musictechguru.com/images/svg/synth_signal_flow.svg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="The Official Music Technology Dictionary | Music Tech Guru" />
    <meta name="twitter:description" content="364+ examiner-verified definitions, visual signal-flow diagrams, and studio hardware guides for Pearson Edexcel A-Level Music Technology Component 3 &amp; 4." />
    <meta name="twitter:image" content="https://app.musictechguru.com/images/svg/synth_signal_flow.svg" />
    <link rel="canonical" href="https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/music-technology-dictionary/" />

    <style>
        #mtg-dict-app-root {{
            background: #080e1a;
            color: #f1f5f9;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            max-width: 1120px;
            margin: 0 auto;
            padding: 10px 16px 80px 16px;
            line-height: 1.6;
            box-sizing: border-box;
        }}
        #mtg-dict-app-root * {{
            box-sizing: border-box;
        }}

        /* HERO CARD */
        .mtg-dict-hero {{
            background: linear-gradient(135deg, #0b1329 0%, #151e38 50%, #0d172e 100%);
            border: 1px solid rgba(56, 189, 248, 0.35);
            border-radius: 20px;
            padding: 44px 32px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
            margin-bottom: 28px;
            position: relative;
            overflow: hidden;
        }}
        .mtg-dict-hero::before {{
            content: '';
            position: absolute;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 500px;
            height: 200px;
            background: radial-gradient(circle, rgba(0, 193, 240, 0.25) 0%, transparent 70%);
            pointer-events: none;
        }}
        .mtg-hero-pill {{
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(0, 193, 240, 0.15);
            color: #38bdf8;
            border: 1px solid rgba(0, 193, 240, 0.4);
            padding: 5px 14px;
            border-radius: 30px;
            font-size: 11.5px;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            margin-bottom: 16px;
        }}
        .mtg-hero-title {{
            color: #ffffff;
            font-size: 34px;
            font-weight: 900;
            margin: 0 0 14px 0;
            line-height: 1.25;
            letter-spacing: -0.5px;
        }}
        .mtg-hero-sub {{
            color: #94a3b8;
            font-size: 16px;
            max-width: 760px;
            margin: 0 auto 24px auto;
            line-height: 1.6;
        }}

        /* HERO STATS BAR */
        .mtg-stats-bar {{
            display: flex;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 28px;
        }}
        .mtg-stat-chip {{
            background: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 8px 16px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 700;
            color: #e2e8f0;
        }}
        .mtg-stat-chip strong {{
            color: #38bdf8;
        }}

        /* HERO CTA BUTTONS */
        .mtg-hero-actions {{
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }}
        .mtg-btn-primary {{
            background: linear-gradient(135deg, #00C1F0 0%, #0284c7 100%);
            color: #ffffff !important;
            font-weight: 800;
            font-size: 14.5px;
            padding: 12px 24px;
            border-radius: 30px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 6px 20px rgba(0, 193, 240, 0.35);
            transition: transform 0.15s, box-shadow 0.15s;
        }}
        .mtg-btn-primary:hover {{
            transform: translateY(-2px);
            box-shadow: 0 8px 26px rgba(0, 193, 240, 0.5);
        }}
        .mtg-btn-secondary {{
            background: rgba(255, 255, 255, 0.06);
            color: #cbd5e1 !important;
            font-weight: 700;
            font-size: 14px;
            padding: 12px 22px;
            border-radius: 30px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            transition: background 0.15s, color 0.15s;
        }}
        .mtg-btn-secondary:hover {{
            background: rgba(255, 255, 255, 0.12);
            color: #ffffff !important;
        }}

        /* WP AUTOP & THEME OVERRIDES */
        #mtg-dict-app-root br {{
            display: none !important;
        }}
        #mtg-dict-app-root p:empty {{
            display: none !important;
        }}
        #mtg-dict-app-root > p {{
            margin: 0 !important;
            padding: 0 !important;
        }}

        /* SEARCH & FILTER COMMAND BAR */
        #mtg-dict-app-root .mtg-command-bar {{
            background: #0d1527 !important;
            border: 1px solid rgba(56, 189, 248, 0.25) !important;
            border-radius: 18px !important;
            padding: 20px 24px !important;
            margin-bottom: 30px !important;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5) !important;
            position: sticky !important;
            top: 20px !important;
            z-index: 90 !important;
            backdrop-filter: blur(14px) !important;
        }}
        #mtg-dict-app-root .mtg-search-box-wrap {{
            display: flex !important;
            align-items: center !important;
            background: #070e1c !important;
            border: 2px solid rgba(56, 189, 248, 0.4) !important;
            border-radius: 9999px !important;
            padding: 2px 20px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            margin-bottom: 16px !important;
            transition: border-color 0.2s, box-shadow 0.2s !important;
        }}
        #mtg-dict-app-root .mtg-search-box-wrap:focus-within {{
            border-color: #38bdf8 !important;
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25) !important;
        }}
        #mtg-dict-app-root .mtg-search-icon {{
            font-size: 18px !important;
            margin-right: 12px !important;
            color: #38bdf8 !important;
            flex-shrink: 0 !important;
            line-height: 1 !important;
            user-select: none !important;
            pointer-events: none !important;
        }}
        #mtg-dict-app-root .mtg-search-input {{
            flex: 1 1 auto !important;
            background: transparent !important;
            border: none !important;
            outline: none !important;
            color: #ffffff !important;
            font-size: 15px !important;
            padding: 13px 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            width: 100% !important;
            min-width: 0 !important;
        }}
        #mtg-dict-app-root .mtg-search-clear {{
            background: rgba(255, 255, 255, 0.18) !important;
            border: none !important;
            color: #ffffff !important;
            border-radius: 50% !important;
            width: 22px !important;
            height: 22px !important;
            font-size: 11px !important;
            cursor: pointer !important;
            display: none;
            align-items: center !important;
            justify-content: center !important;
            margin-left: 10px !important;
            flex-shrink: 0 !important;
            user-select: none !important;
            transition: background 0.15s !important;
        }}
        #mtg-dict-app-root .mtg-search-clear:hover {{
            background: #f43f5e !important;
        }}

        /* CATEGORY FILTER PILLS */
        #mtg-dict-app-root .mtg-filter-strip {{
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
            align-items: center !important;
            margin-bottom: 16px !important;
            width: 100% !important;
        }}
        #mtg-dict-app-root .mtg-filter-btn {{
            all: unset !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 6px !important;
            background: #151e32 !important;
            color: #94a3b8 !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            padding: 8px 16px !important;
            border-radius: 9999px !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            text-transform: none !important;
            letter-spacing: normal !important;
            margin: 0 !important;
            box-shadow: none !important;
            line-height: 1.3 !important;
            white-space: nowrap !important;
            box-sizing: border-box !important;
            user-select: none !important;
            transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }}
        #mtg-dict-app-root .mtg-filter-btn:hover {{
            color: #ffffff !important;
            background: #22304a !important;
            border-color: rgba(56, 189, 248, 0.45) !important;
            transform: translateY(-1px) !important;
        }}
        #mtg-dict-app-root .mtg-filter-btn.active {{
            background: linear-gradient(135deg, #0284c7 0%, #00b4d8 100%) !important;
            color: #ffffff !important;
            border-color: #38bdf8 !important;
            font-weight: 700 !important;
            box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4) !important;
        }}

        /* ALPHABET JUMP STRIP */
        #mtg-dict-app-root .mtg-alpha-strip {{
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 5px !important;
            align-items: center !important;
            padding-top: 14px !important;
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
            width: 100% !important;
        }}
        #mtg-dict-app-root .mtg-alpha-label {{
            font-size: 11px !important;
            color: #64748b !important;
            font-weight: 800 !important;
            letter-spacing: 0.6px !important;
            margin-right: 6px !important;
            user-select: none !important;
        }}
        #mtg-dict-app-root .mtg-alpha-btn {{
            all: unset !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: rgba(255, 255, 255, 0.04) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            color: #cbd5e1 !important;
            font-size: 11.5px !important;
            font-weight: 700 !important;
            width: 26px !important;
            height: 26px !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            box-sizing: border-box !important;
            text-align: center !important;
            margin: 0 !important;
            padding: 0 !important;
            user-select: none !important;
            transition: all 0.15s ease !important;
        }}
        #mtg-dict-app-root .mtg-alpha-btn:hover {{
            background: #0284c7 !important;
            color: #ffffff !important;
            border-color: #38bdf8 !important;
        }}

        #mtg-dict-app-root .mtg-copy-btn {{
            all: unset !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
            background: rgba(255, 255, 255, 0.06) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            color: #94a3b8 !important;
            font-size: 11.5px !important;
            font-weight: 700 !important;
            padding: 6px 12px !important;
            border-radius: 8px !important;
            cursor: pointer !important;
            box-sizing: border-box !important;
            white-space: nowrap !important;
            user-select: none !important;
            transition: all 0.15s ease !important;
        }}
        #mtg-dict-app-root .mtg-copy-btn:hover {{
            background: #38bdf8 !important;
            color: #080e1a !important;
            border-color: #38bdf8 !important;
        }}

        /* RESULT COUNTER */
        .mtg-counter-bar {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12.5px;
            color: #94a3b8;
            margin-top: 10px;
            padding-top: 8px;
        }}
        .mtg-counter-count {{
            font-weight: 800;
            color: #38bdf8;
        }}

        /* MODULE SECTION */
        .mtg-dict-module {{
            background: #0d1527;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 18px;
            padding: 28px 24px;
            margin-bottom: 35px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        }}
        .mtg-module-header {{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 24px;
        }}
        .mtg-module-title-wrap {{
            display: flex;
            align-items: flex-start;
            gap: 14px;
        }}
        .mtg-module-icon {{
            font-size: 32px;
            line-height: 1;
            padding: 10px;
            background: rgba(56, 189, 248, 0.12);
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 12px;
        }}
        .mtg-module-heading {{
            color: #ffffff;
            font-size: 22px;
            font-weight: 800;
            margin: 0 0 6px 0;
            line-height: 1.25;
        }}
        .mtg-module-sub {{
            color: #94a3b8;
            font-size: 13.5px;
            margin: 0;
            line-height: 1.5;
        }}
        .mtg-term-count-badge {{
            background: rgba(255, 255, 255, 0.06);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.3);
            padding: 4px 12px;
            border-radius: 14px;
            font-size: 12px;
            font-weight: 800;
            white-space: nowrap;
        }}

        /* VISUAL REFERENCE GALLERY */
        .mtg-gallery-section {{
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(56, 189, 248, 0.2);
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 26px;
        }}
        .mtg-gallery-header {{
            margin-bottom: 16px;
        }}
        .mtg-gallery-badge {{
            display: inline-block;
            color: #38bdf8;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 4px;
        }}
        .mtg-gallery-title {{
            color: #ffffff;
            font-size: 16.5px;
            font-weight: 800;
            margin: 0 0 4px 0;
        }}
        .mtg-gallery-sub {{
            color: #94a3b8;
            font-size: 12.5px;
            margin: 0;
        }}
        .mtg-gallery-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 14px;
        }}
        .mtg-visual-card {{
            background: #111a30;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
            display: flex;
            flex-direction: column;
        }}
        .mtg-visual-card:hover {{
            transform: translateY(-3px);
            border-color: #38bdf8;
            box-shadow: 0 10px 25px rgba(0, 193, 240, 0.25);
        }}
        .mtg-card-img-wrap {{
            position: relative;
            background: #090e1c;
            padding: 12px;
            height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }}
        .mtg-card-img-wrap img {{
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: transform 0.2s;
        }}
        .mtg-visual-card:hover .mtg-card-img-wrap img {{
            transform: scale(1.05);
        }}
        .mtg-zoom-pill {{
            position: absolute;
            bottom: 8px;
            right: 8px;
            background: rgba(8, 14, 26, 0.85);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.4);
            font-size: 10px;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 6px;
            backdrop-filter: blur(4px);
        }}
        .mtg-card-body {{
            padding: 12px 14px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }}
        .mtg-card-title {{
            color: #ffffff;
            font-size: 13.5px;
            font-weight: 700;
            margin: 0 0 6px 0;
            line-height: 1.3;
        }}
        .mtg-card-desc {{
            color: #94a3b8;
            font-size: 11.5px;
            margin: 0;
            line-height: 1.45;
            flex-grow: 1;
        }}

        /* TABLE STYLING */
        .mtg-table-container {{
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.25);
        }}
        .mtg-dict-table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 14.5px;
        }}
        .mtg-dict-table thead tr {{
            background: #090e1c;
            color: #94a3b8;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            border-bottom: 2px solid rgba(56, 189, 248, 0.3);
        }}
        .mtg-dict-table th {{
            padding: 12px 18px;
            text-align: left;
        }}
        .mtg-term-row {{
            background: #111a30;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            transition: background 0.12s;
        }}
        .mtg-term-row:nth-child(even) {{
            background: #0e1629;
        }}
        .mtg-term-row:hover {{
            background: #17233f;
        }}
        .mtg-col-term {{
            padding: 14px 18px;
            vertical-align: top;
        }}
        .mtg-term-head {{
            display: flex;
            flex-direction: column;
            gap: 4px;
        }}
        #mtg-dict-app-root .mtg-term-name-link {{
            color: #38bdf8 !important;
            font-size: 15px !important;
            font-weight: 800 !important;
            line-height: 1.3 !important;
            text-decoration: none !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 5px !important;
            transition: color 0.15s, transform 0.15s !important;
        }}
        #mtg-dict-app-root .mtg-term-name-link:hover {{
            color: #7dd3fc !important;
            text-decoration: underline !important;
        }}
        #mtg-dict-app-root .mtg-link-icon {{
            font-size: 11px !important;
            opacity: 0.65 !important;
            transition: opacity 0.15s, transform 0.15s !important;
        }}
        #mtg-dict-app-root .mtg-term-name-link:hover .mtg-link-icon {{
            opacity: 1 !important;
            transform: translate(2px, -2px) !important;
        }}
        #mtg-dict-app-root .mtg-term-actions {{
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
            align-items: stretch !important;
            justify-content: center !important;
        }}
        #mtg-dict-app-root .mtg-action-link {{
            all: unset !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 4px !important;
            padding: 5px 8px !important;
            border-radius: 6px !important;
            font-size: 11px !important;
            font-weight: 700 !important;
            text-decoration: none !important;
            cursor: pointer !important;
            box-sizing: border-box !important;
            white-space: nowrap !important;
            user-select: none !important;
            transition: all 0.15s ease !important;
        }}
        #mtg-dict-app-root .mtg-action-app {{
            background: rgba(56, 189, 248, 0.12) !important;
            color: #38bdf8 !important;
            border: 1px solid rgba(56, 189, 248, 0.35) !important;
        }}
        #mtg-dict-app-root .mtg-action-app:hover {{
            background: #0284c7 !important;
            color: #ffffff !important;
            border-color: #38bdf8 !important;
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.4) !important;
        }}
        #mtg-dict-app-root .mtg-action-web {{
            background: rgba(192, 132, 252, 0.12) !important;
            color: #c084fc !important;
            border: 1px solid rgba(192, 132, 252, 0.35) !important;
        }}
        #mtg-dict-app-root .mtg-action-web:hover {{
            background: #9333ea !important;
            color: #ffffff !important;
            border-color: #c084fc !important;
            box-shadow: 0 0 10px rgba(192, 132, 252, 0.4) !important;
        }}
        .mtg-subtopic-tag {{
            display: inline-block;
            background: rgba(255, 255, 255, 0.06);
            color: #94a3b8;
            font-size: 10.5px;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 4px;
            max-width: fit-content;
        }}
        .mtg-col-defn {{
            padding: 14px 18px;
            color: #cbd5e1;
            line-height: 1.65;
            vertical-align: middle;
        }}
        .mtg-defn-text {{
            margin: 0;
            font-size: 14px;
        }}
        .mtg-kw {{
            color: #ffffff;
            font-weight: 700;
            background: rgba(56, 189, 248, 0.1);
            padding: 1px 4px;
            border-radius: 3px;
        }}
        .mtg-col-act {{
            padding: 14px 14px;
            text-align: center;
            vertical-align: middle;
        }}
        .mtg-copy-btn {{
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #94a3b8;
            font-size: 11.5px;
            font-weight: 700;
            padding: 6px 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.15s;
            white-space: nowrap;
        }}
        .mtg-copy-btn:hover {{
            background: #38bdf8;
            color: #080e1a;
            border-color: #38bdf8;
        }}

        /* ZERO STATE */
        #mtg-dict-app-root #mtg-zero-state {{
            display: none !important;
            background: #0f172a !important;
            border: 1px dashed rgba(56, 189, 248, 0.3) !important;
            border-radius: 16px !important;
            padding: 48px 24px !important;
            text-align: center !important;
            margin: 30px 0 !important;
        }}
        #mtg-dict-app-root #mtg-zero-state h4 {{
            color: #ffffff !important;
            font-size: 20px !important;
            margin: 0 0 8px 0 !important;
        }}
        #mtg-dict-app-root #mtg-zero-state p {{
            color: #94a3b8 !important;
            font-size: 14px !important;
            max-width: 480px !important;
            margin: 0 auto 16px auto !important;
        }}

        /* BOTTOM CTA */
        .mtg-dict-bottom-cta {{
            background: linear-gradient(135deg, #0e1832 0%, #172445 100%);
            border: 1px solid rgba(56, 189, 248, 0.35);
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            box-shadow: 0 15px 40px rgba(0,0,0,0.5);
            margin-top: 50px;
        }}
        .mtg-bottom-pill {{
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.3);
            font-size: 11.5px;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            padding: 4px 12px;
            border-radius: 20px;
            display: inline-block;
            margin-bottom: 12px;
        }}
        .mtg-bottom-title {{
            color: #ffffff;
            font-size: 26px;
            font-weight: 800;
            margin: 0 0 10px 0;
        }}
        .mtg-bottom-desc {{
            color: #94a3b8;
            font-size: 15px;
            max-width: 650px;
            margin: 0 auto 24px auto;
            line-height: 1.6;
        }}

        /* LIGHTBOX MODAL */
        #mtg-lightbox-overlay {{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(4, 8, 18, 0.92);
            backdrop-filter: blur(8px);
            z-index: 999999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }}
        .mtg-lightbox-content {{
            background: #0f172a;
            border: 1px solid rgba(56, 189, 248, 0.4);
            border-radius: 18px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 60px rgba(0,0,0,0.8);
            position: relative;
            display: flex;
            flex-direction: column;
        }}
        .mtg-lightbox-close {{
            position: absolute;
            top: 14px;
            right: 14px;
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s;
            z-index: 10;
        }}
        .mtg-lightbox-close:hover {{
            background: #f43f5e;
        }}
        .mtg-lightbox-img-box {{
            background: #070c18;
            padding: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 280px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }}
        .mtg-lightbox-img-box img {{
            max-width: 100%;
            max-height: 60vh;
            object-fit: contain;
            border-radius: 8px;
        }}
        .mtg-lightbox-details {{
            padding: 20px 26px;
        }}
        .mtg-lightbox-title {{
            color: #ffffff;
            font-size: 20px;
            font-weight: 800;
            margin: 0 0 6px 0;
        }}
        .mtg-lightbox-caption {{
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.55;
            margin: 0;
        }}

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 768px) {{
            .mtg-hero-title {{ font-size: 26px; }}
            .mtg-dict-table th:nth-child(3),
            .mtg-dict-table td:nth-child(3) {{ display: none; }}
            .mtg-col-term {{ width: 35% !important; }}
            .mtg-col-defn {{ width: 65% !important; }}
            .mtg-command-bar {{ padding: 16px 14px; }}
            .mtg-gallery-grid {{ grid-template-columns: 1fr; }}
            .mtg-module-header {{ flex-direction: column; }}
        }}
    </style>

    <!-- 1. HERO HEADER -->
    <header class="mtg-dict-hero">
        <span class="mtg-hero-pill">🎓 Pearson Edexcel 9MT0 Complete Syllabus Glossary</span>
        <h1 class="mtg-hero-title">The Official Music Technology Dictionary</h1>
        <p class="mtg-hero-sub">
            The definitive examiner-aligned revision glossary covering Recording, Synthesis, Sampling, Dynamics, EQ, and Effects with high-yield signal flow diagrams and studio hardware illustrations.
        </p>

        <div class="mtg-stats-bar">
            <div class="mtg-stat-chip">📚 <strong>{total_count}+</strong> Verified Terms</div>
            <div class="mtg-stat-chip">📐 <strong>45+</strong> Technical Diagrams</div>
            <div class="mtg-stat-chip">🎛️ <strong>100%</strong> Syllabus Aligned</div>
            <div class="mtg-stat-chip">⚡ <strong>Live</strong> Interactive Search</div>
        </div>

        <div class="mtg-hero-actions">
            <a href="https://app.musictechguru.com/" class="mtg-btn-primary">
                <span>Quiz These Terms in App &rarr;</span>
            </a>
            <a href="https://www.musictechguru.com/wp-content/uploads/2019/09/Music-Tech-Dictionary-2019-V-4-with-some-answers..pdf" target="_blank" class="mtg-btn-secondary">
                <span>📥 Download Original PDF</span>
            </a>
        </div>
    </header>

    <!-- 2. INTERACTIVE SEARCH & CATEGORY FILTER COMMAND BAR -->
    <div class="mtg-command-bar">
        <div class="mtg-search-box-wrap" style="display: flex !important; align-items: center !important; background: #070e1c !important; border: 2px solid rgba(56, 189, 248, 0.4) !important; border-radius: 9999px !important; padding: 2px 20px !important; width: 100% !important; box-sizing: border-box !important; margin-bottom: 16px !important;"><span class="mtg-search-icon" style="font-size: 18px !important; margin-right: 12px !important; color: #38bdf8 !important; flex-shrink: 0 !important; line-height: 1 !important; user-select: none !important;">🔍</span><input type="text" id="mtg-search-input" class="mtg-search-input" placeholder="Search 364+ terms (e.g. Cardioid, Nyquist, VCA, Sidechain, ADSR, Blumlein)..." autocomplete="off" spellcheck="false" style="flex: 1 1 auto !important; background: transparent !important; border: none !important; outline: none !important; color: #ffffff !important; font-size: 15px !important; padding: 13px 0 !important; margin: 0 !important; box-shadow: none !important; width: 100% !important; min-width: 0 !important;"><span role="button" tabindex="0" id="mtg-search-clear" class="mtg-search-clear" onclick="mtgClearSearch()" title="Clear search" style="cursor: pointer; display: none; align-items: center; justify-content: center; background: rgba(255,255,255,0.18); color: #fff; width: 22px; height: 22px; border-radius: 50%; font-size: 11px; margin-left: 10px; flex-shrink: 0; user-select: none;">✕</span></div>

        <div class="mtg-filter-strip">{filter_buttons_html}</div>

        <div class="mtg-alpha-strip"><span class="mtg-alpha-label">JUMP:</span>{alpha_buttons}</div>

        <div class="mtg-counter-bar">
            <span>Showing <span id="mtg-visible-count" class="mtg-counter-count">{total_count}</span> of {total_count} terms</span>
            <span id="mtg-filter-status" style="color: #64748b;">Filtering: All categories</span>
        </div>
    </div>

    <!-- ZERO STATE MESSAGE -->
    <div id="mtg-zero-state" style="display: none !important; background: #0f172a !important; border: 1px dashed rgba(56, 189, 248, 0.3) !important; border-radius: 16px !important; padding: 48px 24px !important; text-align: center !important; margin: 30px 0 !important;">
        <h4 style="color: #ffffff !important; font-size: 20px !important; margin: 0 0 8px 0 !important;">No matching terms found</h4>
        <p style="color: #94a3b8 !important; font-size: 14px !important; max-width: 480px !important; margin: 0 auto 16px auto !important;">We couldn't find any terms matching your current search. Try searching for broader terms like "Reverb", "Filter", "dB", or reset the filter.</p>
        <span role="button" tabindex="0" class="mtg-btn-primary" onclick="mtgClearSearch()" style="padding: 10px 22px !important; font-size: 13.5px !important; cursor: pointer !important; display: inline-flex !important;">Reset Search &amp; Filters</span>
    </div>

    <!-- 3. GLOSSARY SECTIONS & VISUAL SHOWCASES -->
    <div id="mtg-dict-sections-container">
        {rendered_sections_html}
    </div>

    <!-- 4. BOTTOM REVISION APP CALLOUT -->
    <div class="mtg-dict-bottom-cta">
        <span class="mtg-bottom-pill">Interactive Exam Practice</span>
        <h3 class="mtg-bottom-title">Master These Definitions in the MTG App</h3>
        <p class="mtg-bottom-desc">
            Over 3,000+ interactive multiple-choice questions, signal-path diagnostics, and component tests mapped directly to the Pearson Edexcel specification.
        </p>
        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="https://app.musictechguru.com/" class="mtg-btn-primary">
                <span>Launch Interactive Revision App &rarr;</span>
            </a>
            <a href="https://www.musictechguru.com/homepage/a-level-music-technology/component-4-production-analysing/" class="mtg-btn-secondary">
                <span>Component 4 Production Hub &rarr;</span>
            </a>
        </div>
    </div>

    <!-- 5. LIGHTBOX MODAL -->
    <div id="mtg-lightbox-overlay" onclick="mtgCloseLightbox(event)">
        <div class="mtg-lightbox-content" onclick="event.stopPropagation()">
            <span role="button" tabindex="0" class="mtg-lightbox-close" onclick="mtgCloseLightbox(event)" title="Close (Esc)">✕</span>
            <div class="mtg-lightbox-img-box">
                <img id="mtg-lightbox-img" src="" alt="Enlarged technical diagram">
            </div>
            <div class="mtg-lightbox-details">
                <h3 id="mtg-lightbox-title" class="mtg-lightbox-title">Diagram Title</h3>
                <p id="mtg-lightbox-desc" class="mtg-lightbox-caption">Description text</p>
            </div>
        </div>
    </div>

    <!-- 6. CLIENT JAVASCRIPT CONTROLLER -->
    <script>
    (function() {{
        let currentGroup = 'all';
        let searchQuery = '';

        const searchInput = document.getElementById('mtg-search-input');
        const clearBtn = document.getElementById('mtg-search-clear');
        const countDisplay = document.getElementById('mtg-visible-count');
        const filterStatus = document.getElementById('mtg-filter-status');
        const zeroState = document.getElementById('mtg-zero-state');
        const rows = document.querySelectorAll('.mtg-term-row');
        const modules = document.querySelectorAll('.mtg-dict-module');

        function updateFilter() {{
            let visibleCount = 0;
            const q = searchQuery.toLowerCase().trim();

            modules.forEach(function(mod) {{
                let moduleHasVisible = false;
                const modRows = mod.querySelectorAll('.mtg-term-row');

                modRows.forEach(function(row) {{
                    const term = row.getAttribute('data-term') || '';
                    const group = row.getAttribute('data-group') || '';
                    const text = row.textContent.toLowerCase();

                    const matchesGroup = (currentGroup === 'all' || group === currentGroup);
                    const matchesQuery = (q === '' || term.includes(q) || text.includes(q));

                    if (matchesGroup && matchesQuery) {{
                        row.style.display = '';
                        moduleHasVisible = true;
                        visibleCount++;
                    }} else {{
                        row.style.display = 'none';
                    }}
                }});

                // Also check if gallery matches or hide section if empty
                if (moduleHasVisible) {{
                    mod.style.display = '';
                }} else {{
                    mod.style.display = 'none';
                }}
            }});

            countDisplay.textContent = visibleCount;
            if (q.length > 0) {{
                clearBtn.style.setProperty('display', 'inline-flex', 'important');
            }} else {{
                clearBtn.style.setProperty('display', 'none', 'important');
            }}

            if (visibleCount === 0) {{
                zeroState.style.setProperty('display', 'block', 'important');
            }} else {{
                zeroState.style.setProperty('display', 'none', 'important');
            }}

            if (currentGroup === 'all') {{
                filterStatus.textContent = q ? 'Search: "' + q + '"' : 'Filtering: All categories';
            }} else {{
                filterStatus.textContent = 'Category: ' + currentGroup + (q ? ' + "' + q + '"' : '');
            }}
        }}

        searchInput.addEventListener('input', function(e) {{
            searchQuery = e.target.value;
            updateFilter();
        }});

        window.mtgClearSearch = function() {{
            searchInput.value = '';
            searchQuery = '';
            currentGroup = 'all';
            document.querySelectorAll('.mtg-filter-btn').forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('.mtg-filter-btn[data-group="all"]');
            if (allBtn) allBtn.classList.add('active');
            updateFilter();
            searchInput.focus();
        }};

        window.mtgSetFilter = function(group, btn) {{
            currentGroup = group;
            document.querySelectorAll('.mtg-filter-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            updateFilter();
        }};

        window.mtgJumpLetter = function(letter) {{
            const targetChar = letter.toLowerCase();
            let foundTarget = null;
            for (let i = 0; i < rows.length; i++) {{
                const term = rows[i].getAttribute('data-term') || '';
                if (term.startsWith(targetChar)) {{
                    foundTarget = rows[i];
                    break;
                }}
            }}
            if (foundTarget) {{
                // Make sure rows are visible
                if (currentGroup !== 'all' || searchQuery !== '') {{
                    window.mtgClearSearch();
                }}
                foundTarget.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
                foundTarget.style.background = '#0284c7';
                setTimeout(() => {{
                    foundTarget.style.background = '';
                }}, 1500);
            }}
        }};

        window.mtgCopyTerm = function(btn, term, defn) {{
            const fullText = term + ': ' + defn;
            navigator.clipboard.writeText(fullText).then(function() {{
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '✓ <span class="btn-txt">Copied!</span>';
                btn.style.background = '#10b981';
                btn.style.borderColor = '#10b981';
                btn.style.color = '#ffffff';
                setTimeout(function() {{
                    btn.innerHTML = originalHtml;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }}, 1500);
            }});
        }};

        // LIGHTBOX CONTROLS
        const lightbox = document.getElementById('mtg-lightbox-overlay');
        const lbImg = document.getElementById('mtg-lightbox-img');
        const lbTitle = document.getElementById('mtg-lightbox-title');
        const lbDesc = document.getElementById('mtg-lightbox-desc');

        window.mtgOpenLightbox = function(src, title, desc) {{
            lbImg.src = src;
            lbTitle.textContent = title;
            lbDesc.textContent = desc;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }};

        window.mtgCloseLightbox = function(e) {{
            if (e) e.stopPropagation();
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }};

        document.addEventListener('keydown', function(e) {{
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {{
                mtgCloseLightbox();
            }}
        }});
    }})();
    </script>
</div>
"""
    return full_page_html

def main():
    print(f"Generating enriched dictionary content for WordPress Page ID {WP_PAGE_ID}...")
    inner_html = generate_full_html()
    
    # Save local copy of pure HTML
    local_output_path = "scripts/dictionary_final_payload.html"
    with open(local_output_path, "w", encoding="utf-8") as f:
        f.write(inner_html)
    print(f"Saved local preview payload to {local_output_path} ({len(inner_html)} bytes)")

    # Send pure HTML directly to WordPress REST API
    print(f"Deploying direct HTML payload to {WP_API_URL}...")
    req = urllib.request.Request(
        WP_API_URL,
        headers=headers,
        data=json.dumps({"content": inner_html}).encode("utf-8"),
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"\nSUCCESS: WordPress Page ID {WP_PAGE_ID} successfully updated!")
            print(f"Page Title: {data.get('title', {}).get('rendered')}")
            print(f"Page Link: {data.get('link')}")
    except Exception as e:
        print(f"ERROR updating WordPress: {e}")
        if hasattr(e, "read"):
            print("Response:", e.read().decode("utf-8"))

if __name__ == "__main__":
    main()
