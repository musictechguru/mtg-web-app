import json
import os

def fix_vol8_complete():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol = next((v for v in data['volumes'] if v['id'] == 'vol8'), None)
    if not vol:
        print("Volume 8 not found")
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

    # --- TOPIC 1: MASTERING FUNDAMENTALS (v8_t1) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t1'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Mastering is the final step of post-production. Its goal is to balance stereo mixes, set appropriate loudness, and ensure consistency across an album so it translates well to any playback system.",
                    "Mastering is about translation, not just volume.",
                    "Mastering Engineer Code",
                    "/images/explanations/mastering_signal_flow.svg",
                    "Overview of mastering process"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "A treated room with full-range monitoring is essential for mastering because you need to hear the 'truth'. If your room has a bass buildup, you will cut bass in the master, making it sound thin everywhere else.",
                    "You can't fix what you can't hear.",
                    "Bob Katz",
                    "/images/explanations/monitoring_environment.svg",
                    "Room acoustics for mastering"
                )

    # --- TOPIC 2: HEADROOM & MIX PREPARATION (v8_t2) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t2'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Headroom is the space between your highest peak level and 0dBFS (clipping). Leaving 3-6dB of headroom allows the mastering engineer to apply EQ and compression without immediately hitting the digital ceiling.",
                    "Don't clip the mix. That's the limiter's job.",
                    "Submission Guidelines",
                    "/images/explanations/headroom_diagram.svg",
                    "Headroom visualization on a meter"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Peak level (for headroom) matches the absolute highest value the signal reaches. RMS (average) level indicates perceived loudness. You can have a low RMS (quiet mix) but high peaks (snare hits), so peak metering is crucial for headroom safety.",
                    "Peaks control the ceiling; RMS controls the density.",
                    "Audio Metering 101",
                    "/images/explanations/peak_vs_rms.svg",
                    "Comparison of Peak and RMS waveforms"
                )

    # --- TOPIC 3: REFERENCE TRACKS (v8_t3) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t3'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Reference tracks are professionally mastered songs in the same genre used for comparison. They help you reset your ears and judge if your master is too bright, too bass-heavy, or too quiet.",
                    "Your ears adapt. Reference tracks tell the truth.",
                    "Mixing Wisdom",
                    "/images/explanations/reference_track_ab.svg",
                    "A/B comparison workflow"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "When A/B referencing, level matching is critical. If the reference is louder, your brain will trick you into thinking it sounds 'better' (Fletcher-Munson curve). Turn the reference down to match your mix's current level for honest tonal comparison.",
                    "Louder isn't better. Better is better.",
                    "Dan Worrall",
                    "/images/explanations/level_matching_ab.svg",
                    "Level matching schematic"
                )

    # --- TOPIC 4: LUFS & LOUDNESS MEASUREMENT (v8_t4) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t4'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "LUFS (Loudness Units Full Scale) measures perceived loudness over time, unlike Peak which only measures momentary spikes. It is the standard for broadcast and streaming normalization.",
                    "Trust the LUFS, not just the peaks.",
                    "EBU R128 Standard",
                    "/images/explanations/lufs_vs_peak_meter.svg",
                    "LUFS meter vs Peak meter"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Integrated LUFS is the average loudness of the entire song from start to finish. Short-term LUFS measures a 3-second sliding window. Use Short-term to check specific loud sections (like the final chorus).",
                    "Integrated for the platform; Short-term for the impact.",
                    "Mastering Metric",
                    "/images/explanations/integrated_vs_short_term_lufs.svg",
                    "Time window difference in LUFS"
                )

    # --- TOPIC 5: STREAMING LOUDNESS TARGETS (v8_t5) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t5'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Most streaming services (Spotify, Apple Music) normalize audio to around -14 LUFS. If you master a track to -8 LUFS, they will simply turn it down by 6dB, preserving the dynamic range but removing the volume advantage.",
                    "Don't chase the loudness war. The platform wins anyway.",
                    "Loudness Penalty Rule",
                    "/images/explanations/loudness_penalty_graph.svg",
                    "Graph showing normalization reduction"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "LRA (Loudness Range) measures the variation in dynamics. A low LRA (<3 LU) means the track is consistently loud (e.g., EDM/Metal). A high LRA (>10 LU) implies wide dynamics (Classical/Jazz). Spotify recommends not crushing dynamics too much.",
                    "Dynamic range is the life of the music.",
                    "Ian Shepherd",
                    "/images/explanations/lra_loudness_range.svg",
                    "LRA visualization"
                )

    # --- TOPIC 6: TRUE PEAK (dBTP) (v8_t6) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t6'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "True Peak (dBTP) anticipates 'inter-sample peaks' that occur when digital audio is converted to analog (D/A) or transcoded to MP3. A standard sample peak meter might miss these clippings.",
                    "Samples are just dots. The wave goes between them.",
                    "Digital Audio Fact",
                    "/images/explanations/inter_sample_peaks.svg",
                    "Waveform overshooting sample points"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Streaming services require a True Peak ceiling of -1.0 dBTP to prevent distortion during lossy transcoding (AAC/Ogg). Mastering to -0.1 dBTP is risky for streaming delivery.",
                    "-1.0 is the new 0.",
                    "Streaming Delivery Spec",
                    "/images/explanations/true_peak_ceiling.svg",
                    "Limiter ceiling setting"
                )

    # --- TOPIC 7: MASTERING CHAIN & SIGNAL FLOW (v8_t7) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t7'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "A typical mastering chain might be: Subtractive EQ -> Compressor -> Additive/Color EQ -> Limiter. The Limiter is always last to ensure no peaks exceed the ceiling.",
                    "The Limiter is the brick wall at the end of the road.",
                    "Signal Flow Logic",
                    "/images/explanations/mastering_chain_order.svg",
                    "Block diagram of mastering chain"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Mid/Side (M/S) processing allows you to EQ the center (vocal/kick/snare) separately from the sides (synths/guitars). Widening the stereo image often involves boosting the highs on the Side channel.",
                    "Don't widen the bass. Keep the low end mono.",
                    "Phase Coherence Rule",
                    "/images/explanations/mid_side_mastering.svg",
                    "M/S processing diagram"
                )

    # --- TOPIC 8: MASTERING EQ (v8_t8) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t8'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Mastering EQ puts the overall tonal balance in check. Gentle slopes (0.5 dB to 2 dB moves) with wide Q are preferred over drastic surgical cuts, which should have been done in the mix.",
                    "If you need +6dB of EQ in mastering, send it back to mixing.",
                    "Mastering Reality",
                    "/images/explanations/mastering_eq_curves.svg",
                    "Broad EQ curves for mastering"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Linear Phase EQ is often used in mastering because minimal usage preserves the phase relationship of transients (like kick drums) better than standard Minimum Phase EQs, though it adds latency (pre-ringing).",
                    "Preserve the punch. Watch the phase.",
                    "FabFilter Pro-Q Manual",
                    "/images/explanations/linear_phase_vs_minimum.svg",
                    "Impulse response of Linear Phase"
                )

    # --- TOPIC 9: MASTERING COMPRESSION (v8_t9) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t9'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Mastering compression is about 'glue' and density, not aggressive leveling. Low ratios (1.5:1 or 2:1) and slow attacks are common to let transients pass while thickening the body.",
                    "Glue the mix, don't crush it.",
                    "The Glue Compressor Philosophy",
                    "/images/explanations/mastering_compression_settings.svg",
                    "Low ratio/slow attack dial settings"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Multi-band compression allows you to compress the low end (kick/bass) tight without pumping the vocals or cymbals. It provides independent dynamic control over different frequency ranges.",
                    "With great power comes great responsibility (don't ruin the balance).",
                    "Multi-band Advice",
                    "/images/explanations/multiband_readout.svg",
                    "Multi-band compressor display"
                )

    # --- TOPIC 10: LIMITING & LOUDNESS (v8_t10) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t10'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "A Limiter is a compressor with a ratio of infinity:1 and a very fast attack. It prevents signal from exceeding a specific ceiling (e.g., -1.0 dBTP) while raising the overall loudness of the track.",
                    "The ceiling is the Law. The threshold is the volume.",
                    "Limiter Physics",
                    "/images/explanations/limiter_brickwall.svg",
                    "Brickwall limiting graph"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Gain Reduction on a limiter should usually be transparent (1-3dB). Pushing a limiter too hard (6dB+ reduction) causes pumping, distortion, and a loss of punch/transients as the waveform gets flattened.",
                    "Loudness comes at the cost of transients.",
                    "The Trade-off",
                    "/images/explanations/gain_reduction_meter.svg",
                    "GR metering on a limiter"
                )

    # --- TOPIC 11: AUDIO EDITING BASICS (v8_t11) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t11'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Before processing, audio editing involves removing silence, cleaning up clicks/pops with spectral repair, and ensuring the start and end of the file are clean.",
                    "A clean file is a professional file.",
                    "QC Standard",
                    "/images/explanations/waveform_editing.svg",
                    "Cleaning noise in a waveform"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "DC Offset is a displacement of the waveform from the zero-crossing line. It reduces headroom and can cause clicks at edit points. A high-pass filter (even at 10Hz) usually corrects this.",
                    "Center the wave to maximize the headroom.",
                    "Technical Mastery",
                    "/images/explanations/dc_offset_waveform.svg",
                    "Waveform with vs without DC offset"
                )

    # --- TOPIC 12: CROSSFADING & TRANSITIONS (v8_t12) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v8_t12'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "A crossfade blends two audio clips by fading one out while fading the other in. This ensures smooth transitions without clicks or abrupt silence between edited regions.",
                    "The best edit is the one you don't hear.",
                    "Editing Philosophy",
                    "/images/explanations/crossfade_curve.svg",
                    "X-shape crossfade curve"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "An 'Equal Power' crossfade boosts the gain slightly (3dB) at the center point. This maintains constant perceived volume during the transition, whereas a linear crossfade often creates a momentary dip in volume.",
                    "Linear for correlated signals; Equal Power for non-correlated.",
                    "Crossfade Geometry",
                    "/images/explanations/equal_power_vs_linear.svg",
                    "Equal Power vs Linear curve comparison"
                )

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Volume 8 (Topics 1-12).")

if __name__ == "__main__":
    fix_vol8_complete()
