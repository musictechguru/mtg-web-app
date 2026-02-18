import json
import os

def fix_vol7_complete():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol = next((v for v in data['volumes'] if v['id'] == 'vol7'), None)
    if not vol:
        print("Volume 7 not found")
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

    # --- TOPIC 1: REVERB FUNDAMENTALS (v7_t1) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t1'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Reverb simulates the complex reflection patterns of sound in a physical space. It gives dry recordings a sense of depth, space, and 'glue' that makes them feel natural to the human ear.",
                    "Without reverb, music sounds like it's happening in a vacuum.",
                    "Acoustic Truth",
                    "/images/explanations/reverb_rt60_graph.svg",
                    "RT60 Reverb Decay Graph"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Reverb consists of Direct Sound, Early Reflections (giving cues about room size), and the Late Reflection Tail (giving cues about surface materials/RT60). Balancing these elements places a sound in a specific 'Z-plane' depth.",
                    "Depth is the third dimension of mixing.",
                    "Bob Katz",
                    "/images/explanations/reverb_components.svg",
                    "Diagram of Direct, Early, and Late reflections"
                )

    # --- TOPIC 2: EARLY REFLECTIONS & DIFFUSION (v7_t3) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t3'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Early reflections are the first few echoes that bounce off nearby walls. They tell your brain how big the room is. Diffusion controls how 'scattered' or dense the reverb tail is (low diffusion = grainy echoes; high diffusion = smooth wash).",
                    "Early reflections define the room; the tail defines the vibe.",
                    "Mixing Wisdom",
                    "/images/explanations/early_reflections_diagram.svg",
                    "Ray tracing of early reflections"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "High diffusion creates a smooth, lush reverb perfect for vocals and pads. Low diffusion preserves transient attacks and can sound more 'chunky' or vintage, often used on drums to keep them punchy.",
                    "Diffusion is the difference between a mirror and a frosted glass.",
                    "Lexicon Manual",
                    "/images/explanations/diffusion_density.svg",
                    "High vs Low Diffusion comparison"
                )

    # --- TOPIC 3: DELAY FUNDAMENTALS (v7_t5) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t5'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Delay creates distinct echoes by repeating the signal after a set time. The three main controls are Delay Time (when), Feedback (how many repeats), and Mix (volume).",
                    "Delay is the mother of all time-based effects.",
                    "Sound Design 101",
                    "/images/explanations/delay_signal_flow.svg",
                    "Basic Delay Line diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Delay is often cleaner than reverb for adding space to a busy mix because it doesn't clutter the mix with a wash of reflections. 'Slapback' (50-120ms) adds thickening without long tails.",
                    "Reverb pushes things back; Delay keeps them upfront but wide.",
                    "Tony Maserati",
                    "/images/explanations/delay_vs_reverb.svg",
                    "Delay repeats vs Reverb wash"
                )

    # --- TOPIC 4: PRE-DELAY (v7_t13) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t13'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Pre-delay is the gap of silence between the dry sound and the start of the reverb. Increasing pre-delay keeps the dry signal 'in your face' while still having a large tail behind it.",
                    "Pre-delay is the 'clarity knob' on your reverb.",
                    "Dave Pensado",
                    "/images/explanations/reverb_pre_delay.svg",
                    "Pre-delay gap visualization"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Longer pre-delays (40-100ms) make a vocal sound like it's close to you in a massive room. Shorter pre-delays (<10ms) blend the sound into the wall, pushing it back in the mix.",
                    "Separation comes from microseconds.",
                    "Mix Technique",
                    "/images/explanations/pre_delay_chart.svg",
                    "Pre-delay ms settings for different vocals"
                )

    # --- TOPIC 5: DECAY TIME (RT60) (v7_t14) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t14'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "RT60, or Decay Time, is the time it takes for the reverb to drop by 60 decibels. Long decay (2s+) sounds majestic/ambient. Short decay (0.5s) sounds tight/roomy.",
                    "Don't let the tail step on the next phrase.",
                    "Arrangement Rule",
                    "/images/explanations/rt60_decay_curve.svg",
                    "RT60 Decay curve"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Tempo-syncing reverb decay ensures the tail dies out before the next downbeat, keeping the groove tight. A standard formula implies 60000/BPM gives a Quarter Note duration in ms.",
                    "Reverb should breathe with the tempo.",
                    "Manny Marroquin",
                    "/images/explanations/tempo_synced_reverb.svg",
                    "Reverb tail ending on beat"
                )

    # --- TOPIC 6: DAMPING & SIZE (v7_t15) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t15'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Damping (High-Frequency Damping) effectively puts 'curtains' in your virtual room. It causes high frequencies to decay faster than low frequencies, simulating natural air absorption and soft surfaces.",
                    "Real rooms are dark. Undamped reverb sounds like a tiled bathroom.",
                    "Acoustic Reality",
                    "/images/explanations/hf_damping_curve.svg",
                    "HF Damping response curve"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Size controls the virtual dimensions of the room, affecting reflection density and timing. You can have a 'Large Size' with a 'Short Decay' (big room, dead walls) or 'Small Size, Long Decay' (tiled shower), though the latter sounds metallic.",
                    "Match the size to the source material.",
                    "Algorithmic Reverb Tip",
                    "/images/explanations/room_size_diagram.svg",
                    "Room Size vs Decay Time matrix"
                )

    # --- TOPIC 7: REVERB MIX & ROUTING (v7_t16) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t16'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Reverb is usually used on an 'Aux Send' rather than an 'Insert'. This allows multiple instruments to share the same 'room', saving CPU and creating a cohesive cohesive space for the mix.",
                    "One room to bind them all.",
                    "Mixing Philosophy",
                    "/images/explanations/aux_send_routing.svg",
                    "Aux Send vs Insert routing"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "When using an Aux track, the reverb Mix knob must be 100% Wet. If you use it as an Insert on a channel, use the Mix knob to blend. Aux sends preserve the original dry signal's punch.",
                    "Never put a 50% wet reverb on an Aux track. Just don't.",
                    "Studio Etiquette 101",
                    "/images/explanations/mix_knob_wet_dry.svg",
                    "Wet/Dry mix knob illustration"
                )

    # --- TOPIC 8: ROOM & HALL REVERB (v7_t17) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t17'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Hall reverbs are large, spacious, and lush, perfect for strings and ballads. Room reverbs are smaller, boxier, and add 'invisible' realistic space to drums and dialogue without washing them out.",
                    "Halls for beauty, Rooms for reality.",
                    "Reverb Selection Guide",
                    "/images/explanations/hall_vs_room_shapes.svg",
                    "Shape of Hall vs Room"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "A 'Room' algorithm typically has high initial reflection density. A 'Hall' often has a slower build-up. Using a Hall on a fast drum track usually muddies the transient; a Room or Plate keeps it tight.",
                    "The wrong reverb destroys the groove.",
                    "Al Schmitt",
                    "/images/explanations/reverb_build_up_time.svg",
                    "Attack characteristics of Hall vs Plate"
                )

    # --- TOPIC 9: PLATE & SPRING (v7_t18) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t18'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Plate Reverb uses a vibrating metal sheet to create sound. It is dense, bright, and has no 'early reflections', making it amazing for vocals. Spring Reverb vibrates a metal coil, creating a 'boingy' lo-fi sound famous in guitar amps.",
                    "Plates are the sound of 70s vocals. Springs are the sound of surf guitar.",
                    "Vintage Gear Guide",
                    "/images/explanations/plate_vs_spring_diagram.svg",
                    "Mechanism of Plate vs Spring"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Because Plates generate reflections instantly (no pre-delay/early reflections gap), they blend immediately with the source. This adds sustain/shimmer to a vocal without pushing it back in the mix like a Hall does.",
                    "Want a vocal to shine? Put it on a plate.",
                    "Chris Lord-Alge",
                    "/images/explanations/plate_transducer_diagram.svg",
                    "Transducer on a Plate Reverb"
                )

    # --- TOPIC 10: CHAMBER & CONVOLUTION (v7_t19) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t19'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Chamber Reverb comes from a physical reflective room (Echo Chamber) with a speaker and mic inside. Convolution Reverb uses 'Impulse Responses' (IRs) to capture the exact sonic fingerprint of real spaces.",
                    "Chambers are the original artificial reverb.",
                    "Abbey Road History",
                    "/images/explanations/echo_chamber_diagram.svg",
                    "Diagram of a physical Echo Chamber"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Convolution is 'sampling' for reverb. It sounds incredibly realistic for acoustic spaces but lacks the modulation and 'life' of algorithmic reverbs. It is static—the tail is always the same recording.",
                    "Convolution puts you there. Algorithms take you somewhere better.",
                    "Hans Hans Zimmer (Paraphrased)",
                    "/images/explanations/convolution_impulse.svg",
                    "Impulse Response waveform"
                )

    # --- TOPIC 11: FEEDBACK & DELAY TYPES (v7_t20) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t20'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Feedback controls how many times the delay repeats. Low feedback = 1 or 2 repeats. High feedback = infinite loops. 'Ping Pong' delay bounces repeats between the Left and Right speakers.",
                    "Feedback is the memory of the delay.",
                    "Delay Terminology",
                    "/images/explanations/ping_pong_delay.svg",
                    "L/R Ping Pong feedback path"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "High feedback levels can create self-oscillation, where the delay turns into a tone generator. Tape Echoplexes were famous for this chaotic, sci-fi runaway effect when pushed.",
                    "Controlled chaos is the secret ingredient of dub.",
                    "Dub Producer",
                    "/images/explanations/delay_feedback_loop.svg",
                    "Feedback loop schematic"
                )

    # --- TOPIC 12: TAPE DELAY & MODULATION (v7_t21) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v7_t21'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Tape Delay uses magnetic tape loops (e.g., Space Echo). Loops degrade over time, losing high end and adding saturation. Chorus uses very short delays (10-20ms) with modulation to create a shimmering, 'doubled' sound.",
                    "Tape matches the warmth of the music.",
                    "Analog Enthusiast",
                    "/images/explanations/tape_echo_heads.svg",
                    "Tape Echo multiple play heads"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Modulation effects (Chorus, Flanger, Phaser) are all based on delay frequencies being swept by an LFO. Flanging is <10ms delay, Chorus is 10-25ms. The LFO pitch-shifts the delayed copies, creating the 'swirling' effect.",
                    "Modulation is just delay in motion.",
                    "Audio Science",
                    "/images/explanations/chorus_vs_flanger_time.svg",
                    "Timeline of Flange vs Chorus ms"
                )

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Volume 7 (Topics 1-12).")

if __name__ == "__main__":
    fix_vol7_complete()
