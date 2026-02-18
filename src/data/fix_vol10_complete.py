import json
import os

def fix_vol10_complete():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol = next((v for v in data['volumes'] if v['id'] == 'vol10'), None)
    if not vol:
        print("Volume 10 not found")
        return

    # Helper to update a question
    def update_q(q, explanation, quote_text, quote_author, img_src, img_alt):
        q['expert_explanation'] = explanation
        q['expert_quote'] = {
            "text": quote_text,
            "author": quote_author
        }
        q['explanation_image'] = {
            "src": img_src,
            "alt": img_alt
        }
        if 'img' in q: del q['img']

    # --- TOPIC 1: AUDIO INTERFACES & PREAMPS (v10_t1) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t1'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "An audio interface acts as the bridge between analog gear (microphones/guitars) and the computer. It performs A/D conversion for recording and D/A conversion for playback to monitors.",
                    "The interface is the heart of the modern studio.",
                    "Studio Basics",
                    "/images/explanations/audio_interface_diagram.svg",
                    "Diagram of interface connections"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Total Harmonic Distortion + Noise (THD+N) measures the accuracy of a preamp. A lower percentage (e.g., 0.001%) means cleaner, more transparent amplification, while higher values indicate coloration (which can be desirable in 'vintage' gear).",
                    "Clean is accurate; colored is artistic.",
                    "Preamp Philosophy",
                    "/images/explanations/thd_graph.svg",
                    "THD vs Frequency graph"
                )

    # --- TOPIC 2: MIDI CONTROLLERS & PAD CONTROLLERS (v10_t2) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t2'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "MIDI controllers do not generate sound themselves; they send data (Note On, Velocity, Pitch) to software instruments in the DAW. Mod wheels and faders provide expressive control over parameters.",
                    "The controller is the brush; the software is the paint.",
                    "Electronic Music Metaphor",
                    "/images/explanations/midi_controller_layout.svg",
                    "Controller keys and pads diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Aftertouch (Channel Pressure) allows you to modulate a sound (e.g., add vibrato or open a filter) by pressing down harder on the keys *after* the initial strike. Polyphonic Aftertouch allows this per-key.",
                    "Expression doesn't stop when the note starts.",
                    "Synthesist Motto",
                    "/images/explanations/aftertouch_curve.svg",
                    "Pressure vs Time graph"
                )

    # --- TOPIC 3: SIGNAL FLOW & ROUTING (v10_t3) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t3'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Signal flow describes the path audio takes. A standard insert chain processes signal in series (one after another), meaning the output of the EQ feeds the input of the Compressor.",
                    "Follow the wire, find the sound.",
                    "Trobleshooting Rule #1",
                    "/images/explanations/series_signal_flow.svg",
                    "Series processing diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Parallel processing (using Aux Sends/Returns) allows you to blend the dry signal with a processed version. This is essential for time-based effects like Reverb, so you don't 'wash out' the original sound.",
                    "Parallel lines meet at the master bus.",
                    "Mixing Geometry",
                    "/images/explanations/parallel_routing.svg",
                    "Aux Send and Return flow"
                )

    # --- TOPIC 4: CABLES & CONNECTORS (v10_t4) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t4'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Balanced cables (XLR, TRS) use three conductors (Hot, Cold, Ground) to cancel out noise interference using phase cancellation. Unbalanced cables (TS, RCA) are susceptible to hum over long runs.",
                    "Balanced lines run deep; unbalanced lines run short.",
                    "Cable Law",
                    "/images/explanations/balanced_vs_unbalanced.svg",
                    "XLR vs TS cable wiring"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Cable capacitance creates a low-pass filter effect over long distances, rolling off high frequencies. This is why high-impedance instrument cables (guitar) should be kept short (<20ft).",
                    "Capacitance kills the sparkle.",
                    "Guitar Tech Tip",
                    "/images/explanations/cable_capacitance_filter.svg",
                    "High frequency rolloff graph"
                )

    # --- TOPIC 5: USB & DIGITAL CONNECTIONS (v10_t5) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t5'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "USB is the most common consumer interface connection, but Thunderbolt offers significantly higher bandwidth and lower latency (round-trip delay), making it preferred for professional studios with high track counts.",
                    "Bandwidth involves speed; Latency involves time.",
                    "Digital Audio Definitions",
                    "/images/diagram_spdif_connectors_v2.png",
                    "Digital connector types"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "ADAT Lightpipe is an optical standard that carries 8 channels of digital audio at 44.1/48kHz. Using S/MUX (Sample Multiplexing), you can record at 96kHz, but the channel count drops to 4.",
                    "Higher quality costs you channels.",
                    "ADAT Limitations",
                    "/images/explanations/adat_optical_pipe.svg",
                    "ADAT channel multiplexing"
                )

    # --- TOPIC 6: ANALOG ERA HISTORY (v10_t6) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t6'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Before digital recording, magnetic tape was the standard. Artists had to perform perfectly because editing involved physically cutting the tape with a razor blade. It added 'saturation' (warm harmonic distortion).",
                    "Tape doesn't have Undo.",
                    "Analog History",
                    "/images/explanations/tape_machine_reel.svg",
                    "Tape machine diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "The introduction of Multitrack Recording (Les Paul) allowed instruments to be recorded separately (overdubbing). This shifted production from capturing a live performance to 'building' a song in the studio.",
                    "Multitrack turned the studio into an instrument.",
                    "Production Evolution",
                    "/images/explanations/multitrack_tape_head.svg",
                    "4-track tape head layout"
                )

    # --- TOPIC 7: DIGITAL ERA HISTORY (v10_t7) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t7'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "The 1980s brought MIDI and digital sampling, allowing producers to sequence music on computers. This democratized production, as bedroom studios could now rival expensive analog facilities.",
                    "Digital made the impossible affordable.",
                    "The Digital Revolution",
                    "/images/explanations/midi_sequencer_timeline.svg",
                    "Early MIDI sequencer interface"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "The 'Loudness War' began in the digital era (CDs) as limiters became more precise. Producers pushed levels to -0.1dBFS to stand out, often sacrificing dynamic range for pure volume.",
                    "Louder isn't better; it's just louder.",
                    "Bob Katz",
                    "/images/explanations/loudness_war_waveform.svg",
                    "Waveform comparison 1980 vs 2000"
                )

    # --- TOPIC 8: MODERN PRODUCTION & TECHNOLOGY (v10_t8) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t8'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Modern production relies heavily on the DAW (Digital Audio Workstation). Automation allows producers to draw in changes for volume, pan, and effects parameters over time, creating movement.",
                    "Automation is the ghost in the machine.",
                    "DAW Workflow",
                    "/images/explanations/daw_automation_lanes.svg",
                    "Automation curves in a DAW"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Cloud collaboration and stem sharing have decentralized production. Platforms like Splice provide royalty-free samples, changing how beats are constructed from scratch vs assembled from loops.",
                    "The cloud is the new studio rack.",
                    "Modern Collab",
                    "/images/explanations/cloud_stems_workflow.svg",
                    "File sharing workflow diagram"
                )

    # --- TOPIC 9: ROCK PRODUCTION TECHNIQUES (v10_t9) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t9'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Rock production focuses on capturing energy. Drums often use 'Room Mics' heavily compressed to create a massive, explosive sound (e.g., Led Zeppelin sounds).",
                    "The room mic is the size of the drums.",
                    "Rock Mixing Tip",
                    "/images/explanations/drum_room_mic_setup.svg",
                    "Drum mic placement diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Double-tracking guitars (recording the same part twice and panning hard left/right) creates a wide, thick wall of sound. It relies on slight timing variations between takes for width.",
                    "One guitar is a point; two guitars are a wall.",
                    "Wall of Sound Technique",
                    "/images/explanations/double_tracking_panning.svg",
                    "L-R guitar panning"
                )

    # --- TOPIC 10: EDM/DANCE PRODUCTION (v10_t10) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t10'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Sidechain compression is a staple of EDM. The kick drum triggers the compressor on the bass/synths, ducking their volume to let the kick punch through and creating a rhythmic 'pumping' effect.",
                    "If it doesn't pump, it doesn't jump.",
                    "EDM Motto",
                    "/images/explanations/sidechain_ducking_graph.svg",
                    "Sidechain volume envelope"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Risery and drops rely on 'filters sweeps'. Opening a Low Pass Filter (increasing cutoff frequency) builds tension by revealing brighter frequencies as the track approaches the drop.",
                    "The cutoff knob is the tension knob.",
                    "Build-up Mechanics",
                    "/images/explanations/filter_sweep_automation.svg",
                    "Filter cutoff automation curve"
                )

    # --- TOPIC 11: HIP-HOP PRODUCTION (v10_t11) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t11'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Sampling is central to Hip-Hop. Producers take a slice of an old record (the break), loop it, or 'chop' it into new patterns on a pad controller like an MPC.",
                    "Digging in the crates preserves the roots.",
                    "Sampling Culture",
                    "/images/explanations/sample_chopping_pads.svg",
                    "Waveform chopped across pads"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "The '808' sub-bass is often tuned to the key of the song. Saturation/Distortion is applied to the 808 to generate upper harmonics so the bass is audible on small phone speakers.",
                    "Distortion helps the bass speak.",
                    "Mixing 808s",
                    "/images/explanations/808_harmonic_saturation.svg",
                    "Sine wave vs Saturated wave spectrum"
                )

    # --- TOPIC 12: POP PRODUCTION (v10_t12) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v10_t12'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Pop vocals are heavily processed for consistency. 'Vocal Comping' involves recording many takes and splicing the best phrases (or even syllables) together into one perfect 'master take'.",
                    "The perfect performance is often constructed, not performed.",
                    "Pop Editing Reality",
                    "/images/explanations/vocal_comping_lanes.svg",
                    "Comping workflow in DAW"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Parallel Compression (New York Compression) is standard on Pop vocals. It blends a heavily compressed, breathless signal with the dynamic dry signal to get an 'in-your-face' intimacy without destroying intelligibility.",
                    "Crush it in parallel to bring it forward.",
                    "Vocal Mixing Secret",
                    "/images/explanations/parallel_compression_routing.svg",
                    "Parallel compressor signal path"
                )

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Volume 10 (Topics 1-12).")

if __name__ == "__main__":
    fix_vol10_complete()
