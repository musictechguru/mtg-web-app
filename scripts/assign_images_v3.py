import json

COURSE_DATA_PATH = 'src/data/course_data.json'

image_map = {
    # 1960s
    "Q1: Tape Limitation": "/images/Ampex tape machine.png",
    "Q2: Early Sampling Tech": "/images/mellotron_keyboard.png",
    "Q3: Studio Effects": "/images/adt_tape_delay.png",
    "Q4: Distortion Circuits": "/images/Monster Fuzz pedal.png",
    "Q5: Mechanical Reverb": "/images/plate reverb.jpg",
    "Q6: Modulation Effects": "/images/leslie_speaker_cabinet.png",
    "Q7: Early Synthesis": "/images/korg_monopoly.jpg",
    "Q8: Tape Editing": "/images/tape_editing_photo.png",
    "Q9: Drum Recording": "/images/drum_recording_60s.png",
    "Q10: Console Tech": "/images/Vintage Console EQ.png",

    # 1970s
    "Q1: Subtractive Synths": "/images/minimoog_model_d.png",
    "Q2: Analog Polyphony": "/images/analog_polyphony_synth.png",
    "Q3: Analog Delay": "/images/watkins_copicat_delay.jpg",
    "Q4: Vocal Processing": "/images/sennheiser_vocoder.jpg",
    "Q5: Console Automation": "/images/vca_console_automation.png",
    "Q6: Early Drum Machines": "/images/roland_cr78.jpg",
    "Q7: Club Mastering": "/images/turntable_dj.png",
    "Q8: Dynamic Filtering": "/images/mutron_iii.jpg",
    "Q9: EQ Innovation": "/images/explanation_parametric_eq.png",
    "Q10: Console Evolution": "/images/Vintage Console EQ.png",

    # 1980s
    "Q1: Analog Sub-Bass": "/images/roland_tr808_sub.jpg",
    "Q2: Connectivity": "/images/MIDI Piano Roll Logic.png",
    "Q3: Digital Synths": "/images/yamaha_dx7.png",
    "Q4: Sampling Limitations": "/images/sp1200_sampler.jpg",
    "Q5: Gated Reverb": "/images/gated_snare_reverb_diagram.png",
    "Q6: Hybrid Drum Machines": "/images/linndrum_machine.jpg",
    "Q7: Early Workstations": "/images/fairlight_cmi_lightpen.jpg",
    "Q8: Acid Bass": "/images/roland_tb303.png",
    "Q9: Turntablism": "/images/direct_drive_turntable_diagram.png",
    "Q10: Sequencing Groove": "/images/Akai_MPC.png",

    # 1990s
    "Q1: Time-Stretching": "/images/time_stretching_hardware.png",
    "Q2: Breakbeat Culture": "/images/jungle_breakbeat_slicing_diagram.png",
    "Q3: Tracker Software": "/images/vintage_tracker_software.png",
    "Q4: The Reese Bass": "/images/reese_bass_diagram.png",
    "Q5: Mixdown Formats": "/images/dat_tape_recorder.png",
    "Q6: French House Compression": "/images/sidechain_compression_diagram.png",
    "Q7: Early Pitch Correction": "/images/pitch_correction_cher_effect.png",
    "Q8: Hard Disk Editing": "/images/hard_disk_editing_90s.png",
    "Q9: Multitimbral Synthesis": "/images/multitimbral_synth_diagram.png",
    "Q10: Offline Storage": "/images/zip_drive.png",

    # 2000s
    "Q1: In-The-Box": "/images/Logic Mixer.png",
    "Q2: Plugin Standards": "/images/vst_plugin_architecture_diagram.png",
    "Q3: Loudness War": "/images/Dictiionary_Quiz_image_Pool/dynamic_range_hq.png",
    "Q4: Software Wavetables": "/images/massive_synth.png",
    "Q5: Pumping Synths": "/images/sidechain_compression_diagram.png",
    "Q6: Non-Linear DAWs": "/images/ableton_session_view.png",
    "Q7: Audio Compression Algorithms": "/images/diagram_file_formats_v2.png",
    "Q8: Hard-Tuned Vocals": "/images/pitch_correction_cher_effect.png",
    "Q9: Digital DJing": "/images/dvs_digital_vinyl_system.png",
    "Q10: Early Plugin Constraints": "/images/plugin_latency_diagram.png"
}

def assign_images():
    with open(COURSE_DATA_PATH, 'r') as f:
        data = json.load(f)

    section_title = "Historical Music Tech Context"
    
    for section in data.get('sections', []):
        if section.get('title') == section_title:
            for quiz in section.get('items', []):
                for q in quiz.get('questions', []):
                    title = q.get('title', '')
                    final_path = image_map.get(title, "/images/channel_strip.png")
                    
                    q['explanation_image'] = {
                        "src": final_path,
                        "alt": f"{title} Diagram"
                    }
                    if 'expert_image' in q:
                        del q['expert_image']
            break
            
    with open(COURSE_DATA_PATH, 'w') as f:
        json.dump(data, f, indent=4)
        
    print(f"Successfully processed images and updated {COURSE_DATA_PATH}")

if __name__ == "__main__":
    assign_images()
