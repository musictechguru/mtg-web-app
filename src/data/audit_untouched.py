import json
import os
from collections import Counter

def audit_untouched():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    # List of files we've recently touched (based on my previous steps)
    fixed_list = [
        "tape_machine_reel", "midi_sequencer_timeline", "loudness_war_waveform", 
        "daw_automation_lanes", "cloud_stems_workflow", "sidechain_ducking_graph", 
        "multitrack_tape_head", "808_harmonic_saturation", "cable_capacitance_filter", 
        "drum_room_mic_setup", "double_tracking_panning", "vacuum_tube_bias_curve", 
        "balanced_cable_cmrr", "high_z_low_z_diagram", "transformer_isolation_diagram", 
        "ground_loop_diagram", "patchbay_normalisation", "parallel_compression_routing", 
        "filter_sweep_automation", "filter_types_chart", "frequency_masking_diagram", 
        "frequency_spectrum_chart", "graphic_eq_faceplate", "mastering_signal_flow", 
        "monitoring_environment", "waveform_compression_rarefaction", "peak_vs_rms", 
        "reference_track_ab", "audio_interface_diagram", "hf_damping_curve", 
        "open_vs_closed_headphones", "mix_knob_wet_dry", "active_vs_passive_crossover", 
        "la2a_faceplate", "1176_faceplate", "vca_compressor_icon", "varimu_curve", 
        "aux_send_routing", "parallel_routing", "adat_optical_pipe", 
        "ping_pong_delay", "brickwall_limiter", "inter_sample_peaks", 
        "true_peak_limiting", "delay_vs_reverb", "surgical_vs_musical_q", 
        "mid_side_diagram", "crossfade_curve", "vocal_comping_lanes", 
        "phase_correlation_meter", "diffusion_scattering", "thd_graph", 
        "fet_harmonic_distortion", "noise_gate_graph", "sample_chopping_pads", 
        "midi_controller_layout", "mic_shock_mount", "stereo_xy", "ssl_bus_comp", 
        "mic_placement_piano", "midi_piano_roll", "channel_strip_eq"
    ]
    
    # Also exclude the ones I remapped to PNGs in swap_assets
    fixed_list.extend(["mic_shock_mount", "stereo_xy", "SSL Bus compressor", "mic_placement_piano", "MIDI Piano Roll Logic", "channel_strip", "Noise gate graph"])

    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol_image_usage = {} 

    for vol in data['volumes']:
        vol_title = vol['title']
        if vol_title not in vol_image_usage:
            vol_image_usage[vol_title] = Counter()

        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        img = q.get('explanation_image') or q.get('img')
                        if not img: continue
                        if isinstance(img, dict): img = img.get('src')
                        
                        vol_image_usage[vol_title][img] += 1

    print("--- Untouched Repeated Images (Threshold > 2) ---")
    candidates = []
    
    for vol, counter in vol_image_usage.items():
        print(f"\n{vol}:")
        for img, count in counter.most_common():
            if count > 2:
                # Check if this image matches any of our fixed keywords
                is_fixed = False
                for f in fixed_list:
                    if f in img:
                        is_fixed = True
                        break
                
                if not is_fixed:
                    print(f"  {count}x: {img}")
                    candidates.append(img)

    print(f"\nTotal Untouched Candidates: {len(set(candidates))}")

if __name__ == "__main__":
    audit_untouched()
