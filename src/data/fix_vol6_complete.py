import json
import os

def fix_vol6_complete():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol = next((v for v in data['volumes'] if v['id'] == 'vol6'), None)
    if not vol:
        print("Volume 6 not found")
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

    # --- TOPIC 1: EQ FUNDAMENTALS (v6_t1) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t1'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Equalization (EQ) is the process of adjusting the balance between frequency components. The human hearing range is 20Hz to 20kHz. 'Mud' typically lives in the 200-500Hz range, while 'presence' is often found around 3-6kHz.",
                    "EQ is about balance. You can't boost something that isn't there.",
                    "George Massenburg",
                    "/images/explanations/frequency_spectrum_chart.svg",
                    "Frequency spectrum chart 20Hz-20kHz"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Frequency masking prevents us from hearing quieter sounds when louder sounds exist in the same frequency range. Carving out space (e.g., cutting 300Hz on guitars to let the snare sit) is a critical mixing skill.",
                    "Don't EQ the instrument; EQ the mix.",
                    "Mixing Proverb",
                    "/images/explanations/frequency_masking_diagram.svg",
                    "Diagram showing frequency masking"
                )

    # --- TOPIC 2: Q & GAIN (v6_t2) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t2'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Q (Quality Factor) controls the bandwidth of the boost or cut. A high Q (e.g., 10) is narrow/surgical, used for removing problems. A low Q (e.g., 0.7) is wide/musical, used for tone shaping.",
                    "Use narrow cuts to remove problems, and wide boosts to enhance tone.",
                    "Classic EQ Rule",
                    "/images/explanations/eq_q_factor_comparison.svg",
                    "Comparison of Narrow vs Wide Q"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Boosting with EQ introduces phase shift, especially with high Q settings (narrow bands) and large gain changes. This can smear the transients. Linear Phase EQ avoids this but introduces pre-ringing.",
                    "Every dB of EQ you add is a dB of headroom you lose.",
                    "Bob Katz",
                    "/images/explanations/eq_phase_shift.svg",
                    "Phase shift illustration"
                )

    # --- TOPIC 3: FILTER TYPES (v6_t3) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t3'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "A High-Pass Filter (HPF) allows highs to pass and cuts lows (removing rumble). A Low-Pass Filter (LPF) cuts highs. A Shelf boosts/cuts all frequencies above or below a point equally.",
                    "High-pass everything except the kick and bass.",
                    "Common Mixing Advice",
                    "/images/explanations/filter_types_chart.svg",
                    "Chart of HPF, LPF, and Shelf filters"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Filter slope is measured in dB/octave. A gentle 6dB/oct slope sounds natural and musical. A steep 24dB/oct slope is surgical but can sound resonant or artificial around the cutoff frequency.",
                    "The slope determines the aggression of the cut.",
                    "Sound Theory",
                    "/images/explanations/filter_slopes.svg",
                    "Comparison of 6dB vs 24dB slopes"
                )

    # --- TOPIC 4: PARAMETRIC EQ (v6_t4) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t4'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "A Parametric EQ offers full control over three parameters: Frequency (where), Gain (how much), and Q (how wide). This makes it the most flexible tool for mixing.",
                    "Parametric EQ gives you the scalpel.",
                    "Mixing Engineer",
                    "/images/explanations/parametric_eq_knobs.svg",
                    "Parametric EQ controls diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Surgical EQ involves finding a resonant frequency by boosting a narrow band and sweeping, then cutting that frequency. This technique (Search & Destroy) cleans up recordings without altering the overall tone.",
                    "Find the ring, kill the ring.",
                    "Audio Editing Mantra",
                    "/images/explanations/parametric_sweep_cut.svg",
                    "Sweeping a notch filter"
                )

    # --- TOPIC 5: GRAPHIC & SHELVING (Merged/Renamed context) (v6_t5) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t5'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Graphic EQs have fixed frequency bands (e.g., 31 bands) controlled by sliders. They are commonly used in live sound for tuning PA systems to the room.",
                    "Graphic EQ is for the room, Parametric is for the instrument.",
                    "Live Sound Wisdom",
                    "/images/explanations/graphic_eq_faceplate.svg",
                    "Graphic EQ sliders diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "A Channel Strip EQ (like on a Neve console) is often semi-parametric, meaning some bands have fixed Q widths. This forces the engineer to make broader, more musical decisions rather than surgical ones.",
                    "Limitations inspire creativity. Fixed bands make you move faster.",
                    "Andrew Scheps",
                    "/images/explanations/channel_strip_eq.svg",
                    "Console channel strip EQ"
                )

    # --- TOPIC 6: DYNAMIC EQ (v6_t6) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t6'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Dynamic EQ changes the gain of a frequency band based on the input level. It acts like an EQ that turns itself on only when needed (e.g., cutting harshness only when a singer belts loud notes).",
                    "Dynamic EQ is the problem solver that disappears when the problem is gone.",
                    "Plugin Manual",
                    "/images/explanations/dynamic_eq_action.svg",
                    "Dynamic EQ threshold action"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Unlike Multiband Compression which splits the entire signal into crossovers, Dynamic EQ is more surgical. It uses filter shapes (bells/shelves) and only affects the specific targeted frequencies, leaving phase more intact.",
                    "Think of Dynamic EQ as a compressor for a specific frequency.",
                    "Fab Filter Pro-Q Tips",
                    "/images/explanations/dynamic_eq_vs_multiband.svg",
                    "Dynamic EQ vs Multiband Compression"
                )

    # --- TOPIC 7: SUBTRACTIVE EQ (v6_t7) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t7'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Subtractive EQ is the practice of cutting unwanted frequencies (mud, resonance, hiss) rather than boosting good ones. This preserves headroom and often sounds more natural.",
                    "It's better to cut the mud than to boost the clarity.",
                    "Mixing Rule #1",
                    "/images/explanations/subtractive_eq_curve.svg",
                    "Subtractive EQ curve showing cuts"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Masking is best resolved with subtractive EQ. If the kick and bass clash at 80Hz, cutting 80Hz from the bass (or sidechaining) makes the kick punch through without simply turning the kick up.",
                    "Carving space is how you make a mix sound huge.",
                    "Chris Lord-Alge",
                    "/images/explanations/eq_masking_carving.svg",
                    "Carving EQ for separation"
                )

    # --- TOPIC 8: ADDITIVE EQ (v6_t8) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t8'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Additive EQ involves boosting frequencies to enhance character. 'Air' describes frequencies above 10kHz that add sheen. 'Presence' is typically 3-6kHz. 'Thump' is 60-100Hz.",
                    "Boost wide for tone, cut narrow for problems.",
                    "EQ Golden Rule",
                    "/images/explanations/additive_eq_keywords.svg",
                    "Chart: Air, Body, Thump, Presence ranges"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "The 'Pultec trick' involves boosting and cutting the same low frequency simultaneously. Because the curves are slightly different, this creates a unique resonant shelf that tightens the low end while creating a massive bottom.",
                    "Sometimes the wrong move creates the right sound.",
                    "Jack Joseph Puig",
                    "/images/explanations/pultec_curve.svg",
                    "Pultec low-end curve"
                )

    # --- TOPIC 9: SURGICAL VS MUSICAL (v6_t9) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t9'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Surgical EQ uses narrow Q to fix issues (resonance, hum). Musical EQ uses wide Q to shape the overall tone. Confusing the two leads to unnatural sounding mixes.",
                    "Be a surgeon with the cuts and a painter with the boosts.",
                    "Mixing Metaphor",
                    "/images/explanations/surgical_vs_musical_q.svg",
                    "Diagram comparing Q widths"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Analog-modeled EQs are often 'Musical' because they have pre-set, wide Q curves and introduce harmonic saturation. Digital parametric EQs are 'Surgical' because they offer precise, colorless mathematical control.",
                    "Color comes from the circuit; precision comes from the code.",
                    "Hybrid Mixing Philosophy",
                    "/images/explanations/analog_vs_digital_eq_curves.svg",
                    "Analog vs Digital EQ curves"
                )

    # --- TOPIC 10: STEREO FUNDAMENTALS (v6_t10) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t10'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Panning places a sound in the stereo field (Left to Right). The 'Phantom Center' is the illusion of a sound coming from between the speakers when it plays equally in both.",
                    "Contrast creates width. If everything is wide, nothing is wide.",
                    "Dave Pensado",
                    "/images/explanations/stereo_panning_arc.svg",
                    "Stereo field arc diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "LCR Panning (Left-Center-Right) is a mixing philosophy where elements are panned hard left, hard right, or dead center, with nothing in between. This creates a very wide, uncluttered mix.",
                    "Don't be afraid of the hard pan.",
                    "Chris Lord-Alge",
                    "/images/explanations/lcr_panning.svg",
                    "LCR Panning diagram"
                )

    # --- TOPIC 11: MID/SIDE (v6_t11) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t11'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Mid/Side (M/S) processing splits a stereo signal into the 'Mid' (center information) and 'Side' (stereo width information). This allows you to EQ the center vocals differently from the wide guitars.",
                    "M/S is the secret weapon of mastering.",
                    "Mastering Engineer",
                    "/images/explanations/mid_side_diagram.svg",
                    "Mid/Side signal flow"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "In M/S, 'Side' is derived by (Left - Right). 'Mid' is (Left + Right). Be careful boosting the sides too much, as it can cause phase cancellation when the mix is collapsed to mono.",
                    "Always check your mix in mono.",
                    "Golden Rule of M/S",
                    "/images/explanations/mid_side_encoding.svg",
                    "Math of M/S encoding"
                )

    # --- TOPIC 12: WIDTH & MONO (v6_t12) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v6_t12'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "The Haas Effect (or Precedence Effect) says that if a sound reaches one ear slightly before the other (<30ms), the brain perceives it as coming from the earlier side. This is used to create super-wide stereo imagery.",
                    "Width comes from time, not just volume.",
                    "Psychoacoustics 101",
                    "/images/explanations/haas_effect.svg",
                    "Haas effect delay diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Correlation describes the phase relationship between Left and Right channels. +1 is mono, 0 is perfect stereo, -1 is 180 degrees out of phase (cancels in mono). Keep correlation positive to ensure mono compatibility.",
                    "A wide mix that disappears on a phone speaker is a failed mix.",
                    "Broadcast Standard",
                    "/images/explanations/phase_correlation_meter.svg",
                    "Phase correlation meter readout"
                )

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Volume 6 (Topics 1-12).")

if __name__ == "__main__":
    fix_vol6_complete()
