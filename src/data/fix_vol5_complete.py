import json
import os

def fix_vol5_complete():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol5 = next((v for v in data['volumes'] if v['id'] == 'vol5'), None)
    if not vol5:
        print("Volume 5 not found")
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
        # Clear legacy img field if present
        if 'img' in q: del q['img']

    # --- TOPIC 1: COMPRESSION FUNDAMENTALS (v5_t1) ---
    t1 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t1'), None)
    if t1:
        # Basic
        if 'basic' in t1['levels']:
            for q in t1['levels']['basic']:
                update_q(q,
                    "Compression reduces the dynamic range of a signal by lowering the volume of the loudest parts (peaks) while allowing quieter parts to be heard more clearly. It makes performances more consistent.",
                    "Compression is the art of making things smaller to make them sound bigger.",
                    "Bob Power",
                    "/images/explanations/compression_dynamic_range.svg",
                    "Diagram showing dynamic range reduction"
                )
        # Intermediate
        if 'intermediate' in t1['levels']:
            for q in t1['levels']['intermediate']:
                update_q(q,
                    "In a mix, compression helps 'glue' elements together by reducing the dynamic disparities between them. However, over-compression destroys transients and life, making the mix sound flat and fatiguing.",
                    "The listener shouldn't hear the compressor working; they should just hear a better performance.",
                    "Al Schmitt",
                    "/images/explanations/compression_glue.svg",
                    "Diagram illustrating mix glue"
                )

    # --- TOPIC 2: THRESHOLD & RATIO (v5_t2) ---
    t2 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t2'), None)
    if t2:
        # Basic
        if 'basic' in t2['levels']:
            for q in t2['levels']['basic']:
                update_q(q,
                    "The Threshold is coverage line: compression only happens when the signal exceeds this level. The Ratio determines how 'hard' the compressor squashes that signal once it crosses the line (e.g., 4:1 is harder than 2:1).",
                    "Set the threshold so the compressor breathes with the music, not against it.",
                    "Tony Maserati",
                    "/images/explanations/threshold_ratio_graph.svg",
                    "Graph showing threshold and ratio slope"
                )
        # Intermediate
        if 'intermediate' in t2['levels']:
            for q in t2['levels']['intermediate']:
                update_q(q,
                    "High ratios (10:1+) behave like a limiter, creating a hard ceiling. Lower ratios (1.5:1 - 3:1) are transparent for leveling. The interaction between threshold and ratio defines the 'grip' on the sound.",
                    "Ratio defines the attitude, threshold defines the timing of the intervention.",
                    "Michael Brauer",
                    "/images/explanations/compression_ratio_curves.svg",
                    "Curves showing different compression ratios"
                )

    # --- TOPIC 3: ATTACK & RELEASE (Merged) (v5_t3) ---
    t3 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t3'), None)
    if t3:
        # Basic (Was T13/14)
        if 'basic' in t3['levels']:
            for q in t3['levels']['basic']:
                update_q(q,
                    "Attack time controls how quickly the compressor reacts to the start of a sound (transient). Release time controls how quickly it lets go and returns to normal volume after the sound drops below threshold.",
                    "Attack is the punch, Release is the groove.",
                    "Greg Wells",
                    "/images/explanations/attack_release_envelope.png",
                    "Diagram of Attack and Release phases"
                )
        # Intermediate
        if 'intermediate' in t3['levels']:
            for q in t3['levels']['intermediate']:
                update_q(q,
                    "A fast attack clamps down on transients immediately, smoothing the sound but losing 'punch'. A slower attack lets the initial 'crack' of a drum through before compressing, adding impact. Release must be timed to the track's tempo to avoid 'pumping'.",
                    "The groove of the compressor comes entirely from the release knob.",
                    "Chris Lord-Alge",
                    "/images/explanations/compressor_pumping.svg",
                    "Visualizing compression pumping effects"
                )

    # --- TOPIC 4: KNEE & MAKEUP (Merged) (v5_t4) ---
    t4 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t4'), None)
    if t4:
        # Basic
        if 'basic' in t4['levels']:
            for q in t4['levels']['basic']:
                update_q(q,
                    "Makeup Gain is used to boost the overall signal after compression to match the input level. This allows you to hear the effect of the compression without being fooled by volume changes.",
                    "Always A/B match your levels. Louder always sounds better to the human ear, even if it's worse.",
                    "Bob Katz",
                    "/images/explanations/makeup_gain_leveling.svg",
                    "Level matching diagram"
                )
        # Intermediate
        if 'intermediate' in t4['levels']:
            for q in t4['levels']['intermediate']:
                update_q(q,
                    "A 'Soft Knee' gradually increases the ratio as the signal approaches the threshold, resulting in transparent, gentle compression. A 'Hard Knee' applies the full ratio immediately, which is punchier and more obvious.",
                    "Soft knee for the bus, hard knee for the attitude.",
                    "Dave Pensado",
                    "/images/explanations/hard_vs_soft_knee.svg",
                    "Graph comparing Hard and Soft Knee"
                )

    # --- TOPIC 5: VCA COMPRESSORS (Merged) (v5_t5) ---
    t5 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t5'), None)
    if t5:
        # Basic
        if 'basic' in t5['levels']:
            for q in t5['levels']['basic']:
                update_q(q,
                    "VCA (Voltage Controlled Amplifier) compressors like the dbx 160 or SSL Bus Comp are known for being fast, clean, and aggressive. They are excellent for drums and 'gluing' a mix together.",
                    "VCA is the sound of modern punch.",
                    "Jack Joseph Puig",
                    "/images/explanations/vca_compressor_icon.svg",
                    "Iconic VCA compressor faceplate"
                )
        # Intermediate
        if 'intermediate' in t5['levels']:
            for q in t5['levels']['intermediate']:
                update_q(q,
                    "VCA compressors offer precise control over attack and release and maintain separate Left/Right detection (or linked). They introduce less harmonic distortion than tubes but provide a distinct 'snap' or 'smack' to transients.",
                    "The SSL Bus Compressor is basically the sound of rock and roll radio.",
                    "Chris Lord-Alge",
                    "/images/explanations/ssl_bus_comp.svg",
                    "SSL Bus Compressor diagram"
                )

    # --- TOPIC 6: FET COMPRESSORS (Merged) (v5_t6) ---
    t6 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t6'), None)
    if t6:
        # Basic
        if 'basic' in t6['levels']:
            for q in t6['levels']['basic']:
                update_q(q,
                    "FET (Field Effect Transistor) compressors, like the 1176, are extremely fast and add colorful harmonic distortion. They are famous for making vocals and drums sound 'in your face'.",
                    "The 1176 is not just a compressor, it's a tone box.",
                    "Andrew Scheps",
                    "/images/explanations/1176_faceplate.svg",
                    "Diagram of 1176 controls"
                )
        # Intermediate
        if 'intermediate' in t6['levels']:
            for q in t6['levels']['intermediate']:
                update_q(q,
                    "FET compressors react in microseconds. The famous 'All Buttons In' mode on an 1176 changes the bias of the circuit, creating aggressive distortion and a unique pumping release curve, perfect for room mics.",
                    "If you want accurate, use a plugin. If you want Rock & Roll, push an 1176 until it screams.",
                    "Sylvia Massy",
                    "/images/explanations/fet_harmonic_distortion.svg",
                    "Visualizing FET saturation"
                )

    # --- TOPIC 7: OPTICAL COMPRESSORS (Merged) (v5_t7) ---
    t7 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t7'), None)
    if t7:
        # Basic
        if 'basic' in t7['levels']:
            for q in t7['levels']['basic']:
                update_q(q,
                    "Optical compressors (like the LA-2A) use a light source and photo-resistor to detect levels. This creates a slow, smooth, nonlinear response that sounds very natural and musical on vocals and bass.",
                    "The LA-2A has two knobs and it's impossible to make it sound bad.",
                    "Mix Engineer Proverb",
                    "/images/explanations/la2a_faceplate.svg",
                    "LA-2A Optical Compressor diagram"
                )
        # Intermediate
        if 'intermediate' in t7['levels']:
            for q in t7['levels']['intermediate']:
                update_q(q,
                    "The 'memory' effect of the T4 optical cell means the release slows down if the signal has been compressed for a while. This 'program dependent' behavior makes Optos incredibly smooth for leveling erratic performances.",
                    "Optical compression is like a gentle hand riding the fader for you.",
                    "Manny Marroquin",
                    "/images/explanations/optical_response_curve.svg",
                    "Optical non-linear release curve"
                )

    # --- TOPIC 8: TUBE & DIGITAL (Merged) (v5_t8) ---
    t8 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t8'), None)
    if t8:
        # Basic
        if 'basic' in t8['levels']:
            for q in t8['levels']['basic']:
                update_q(q,
                    "Variable-Mu (Tube) compressors like the Fairchild 670 use vacuum tubes for gain reduction. They are slow, rich, and add 'thick' glue to a mix. Digital compressors can be perfectly transparent or model these vintage units.",
                    "Tubes add the third dimension to the sound.",
                    "George Massenburg",
                    "/images/explanations/fairchild_670.svg",
                    "Fairchild 670 diagram"
                )
        # Intermediate
        if 'intermediate' in t8['levels']:
            for q in t8['levels']['intermediate']:
                update_q(q,
                    "Modern digital compressors offer features impossible in analog, like 'Lookahead' (anticipating peaks) and perfect, zero-distortion limiting. However, analog tube units are prized for the 'Varimu' curve which changes ratio dynamically with gain reduction.",
                    "Digital gives you the truth; Analog gives you the romance.",
                    "Fab Dupont",
                    "/images/explanations/varimu_curve.svg",
                    "Variable-Mu ratio curve"
                )

    # --- TOPIC 9: LIMITING (Merged) (v5_t9) ---
    t9 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t9'), None)
    if t9:
        # Basic
        if 'basic' in t9['levels']:
            for q in t9['levels']['basic']:
                update_q(q,
                    "A Limiter is essentially a compressor with a very high ratio (∞:1 or 10:1+). It sets a 'brick wall' ceiling that the signal cannot exceed, preventing clipping and maximizing loudness.",
                    "A limiter is the safety net at the end of the wire.",
                    "Bob Ludwig",
                    "/images/explanations/brickwall_limiter.svg",
                    "Brickwall limiting diagram"
                )
        # Intermediate
        if 'intermediate' in t9['levels']:
            for q in t9['levels']['intermediate']:
                update_q(q,
                    "In mastering, 'True Peak' limiting detects inter-sample peaks that might clip when converted from digital to analog (DAC). Standard limiters only check the digital sample values, which can miss these hidden overloads.",
                    "Loudness is easy. Loudness with impact is the hard part.",
                    "Ian Shepherd",
                    "/images/explanations/true_peak_limiting.svg",
                    "Inter-sample peak illustration"
                )

    # --- TOPIC 10: GATES & EXPANDERS (Merged) (v5_t10) ---
    t10 = next((t for t in vol5['parts'][0]['topics'] if t['id'] == 'v5_t10'), None)
    if t10:
        # Basic
        if 'basic' in t10['levels']:
            for q in t10['levels']['basic']:
                update_q(q,
                    "A Noise Gate silences the audio when it drops below a set threshold. This is used to remove background hiss in quiet sections or 'bleed' from other instruments on drum tracks.",
                    "Gates are the cleanup crew of the mix.",
                    "Mixing Wisdom",
                    "/images/explanations/noise_gate_graph.svg",
                    "Noise Gate operation graph"
                )
        # Intermediate
        if 'intermediate' in t10['levels']:
            for q in t10['levels']['intermediate']:
                update_q(q,
                    "An Expander is a gentler gate. Instead of cutting sound to silence, it reduces the volume of quiet sounds (e.g., 1:2 ratio). This increases dynamic range and cleans up noise more naturally than a hard gate.",
                    "Expansion is the opposite of compression; it pushes the floor down instead of the ceiling.",
                    "Bob Katz",
                    "/images/explanations/expander_graph.svg",
                    "Expander transfer curve"
                )

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Volume 5 (Topics 1-10).")

if __name__ == "__main__":
    fix_vol5_complete()
