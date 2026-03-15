import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

seq_images = [
    "/images/gen/midi_note_duration.png",
    "/images/gen/midi_track_lanes.png",
    "/images/gen/drum_machine_step_sequencer.png",
    "/images/gen/synthesizer_arpeggiator.png",
    "/images/gen/midi_automation_curves.png",
    "/images/gen/midi_keyboard_controller.png",
    "/images/gen/piano_roll_velocity_editor.png",
    "/images/gen/midi_quantize_grid.png",
    "/images/ableton_session_view.png",
    "/images/Logic's Phase 2.png"
]

sig_images = [
    "/images/gen/patchbay_routing.png",
    "/images/gen/audio_interface_inputs.png",
    "/images/gen/analog_vu_meters.png",
    "/images/gen/digital_clipping_waveform.png",
    "/images/gen/microphone_preamp_gain.png",
    "/images/gen/ad_da_converter.png",
    "/images/gen/analog_mixing_console_channel.png",
    "/images/gen/studio_outboard_gear.png",
    "/images/gen/xlr_vs_ts_cable.png",
    "/images/recording_chain_flow.svg"
]

midi_bin_images = [
    "/images/gen/ad_da_converter.png",
    "/images/midi_quantization.svg",
    "/images/gen/midi_track_lanes.png",
    "/images/gen/midi_note_duration.png"
]

seq_idx = 0
sig_idx = 0
bin_idx = 0

replaced = 0

for sec in data.get('sections', []):
    if "Stage 3" in sec.get('title', ''):
        for item in sec.get('items', []):
            for q in item.get('questions', []):
                img = q.get('img', '')
                
                if img == '/images/piano_roll.svg':
                    q['img'] = seq_images[seq_idx % len(seq_images)]
                    seq_idx += 1
                    replaced += 1
                elif img == '/images/signal_chain_basic.svg':
                    q['img'] = sig_images[sig_idx % len(sig_images)]
                    sig_idx += 1
                    replaced += 1
                elif img == '/images/binary_midi_table.png':
                    q['img'] = midi_bin_images[bin_idx % len(midi_bin_images)]
                    bin_idx += 1
                    replaced += 1

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Force-distributed specific images over {replaced} stubborn duplicates.")
