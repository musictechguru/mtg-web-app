import json
import os

def fix_vol9_complete():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol = next((v for v in data['volumes'] if v['id'] == 'vol9'), None)
    if not vol:
        print("Volume 9 not found")
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

    # --- TOPIC 1: SOUND WAVE FUNDAMENTALS (v9_t1) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t1'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Sound is a mechanical wave that propagates as a longitudinal wave of pressure variations (compression and rarefaction) through a medium like air or water. Without a medium, there is no sound.",
                    "In space, no one can hear you scream (because there's no air).",
                    "Physics Fact",
                    "/images/explanations/waveform_compression_rarefaction.svg",
                    "Longitudinal wave diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Wavelength (λ) is physically measured as the distance between two consecutive peaks of a wave. Low frequencies have long wavelengths (20Hz ≈ 17 meters), while high frequencies have short ones (20kHz ≈ 1.7 cm).",
                    "Bass is big. Treble is tiny.",
                    "Acoustic Reality",
                    "/images/explanations/wavelength_formula.svg",
                    "Wavelength formula and visualization"
                )

    # --- TOPIC 2: SPEED OF SOUND & DISTANCE (v9_t2) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t2'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "The speed of sound in air at 20°C is approximately 343 meters per second (1130 feet per second). Temperature affects this speed; sound travels faster in warm air and slower in cold air.",
                    "Sound is a lazy traveler; it changes pace with the weather.",
                    "Acoustician",
                    "/images/explanations/speed_of_sound_chart.svg",
                    "Speed of sound vs temperature"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "The Inverse Square Law states that for every doubling of distance from a point source, the sound pressure level decreases by 6dB. Moving from 1m to 2m loses 6dB; moving from 2m to 4m loses another 6dB.",
                    "Distance is the best volume knob.",
                    "Live Sound Wisdom",
                    "/images/explanations/inverse_square_law.svg",
                    "6dB drop per distance doubling"
                )

    # --- TOPIC 3: REFLECTION & ACOUSTIC BEHAVIOR (v9_t3) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t3'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Reflection occurs when sound bounces off a surface. Hard, flat surfaces (concrete, glass) create strong specular reflections. Irregular surfaces scatter sound (diffusion).",
                    "A room without reflections is a graveyard for tone.",
                    "Acoustic Designer",
                    "/images/explanations/reflection_types.svg",
                    "Specular vs Diffuse reflection"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Comb filtering occurs when a direct signal combines with a slightly delayed reflection (within 1-15ms), causing phase cancellation at specific intervals. This creates a hollow, metallic 'flanging' sound.",
                    "Comb filtering is the sound of a bad room.",
                    "Studio Builder",
                    "/images/explanations/comb_filtering_graph.svg",
                    "Comb filter frequency response"
                )

    # --- TOPIC 4: ABSORPTION FUNDAMENTALS (v9_t4) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t4'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Absorption prevents sound from reflecting by converting the acoustic energy into heat (via friction inside porous materials like rockwool). It is the primary tool for controlling reverb time.",
                    "Soak up the energy, stop the echo.",
                    "Acoustic Principle",
                    "/images/explanations/absorption_coefficient_chart.svg",
                    "Absorption coefficient vs frequency"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "The Absorption Coefficient (α) ranges from 0 (perfect reflection) to 1 (perfect absorption). An open window has a coefficient of 1.0 because no sound returns.",
                    "An open window is the perfect absorber.",
                    "Acoustics Joke/Fact",
                    "/images/explanations/open_window_absorption.svg",
                    "Concept of 1.0 absorption coefficient"
                )

    # --- TOPIC 5: DIFFUSION (v9_t5) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t5'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Diffusion spreads reflected sound energy evenly in multiple directions, maintaining the 'liveliness' of the room without causing direct echoes or standing waves.",
                    "Don't kill the room, just tame it.",
                    "RPG Diffusor Systems Motto",
                    "/images/explanations/diffusion_scattering.svg",
                    "Scattering pattern of a diffuser"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Skyline and QRD diffusers use mathematical sequences (typically prime numbers) to determine well depths, ensuring equal energy scattering across a specific frequency range.",
                    "Math makes the room sound bigger.",
                    "Acoustic Engineering",
                    "/images/explanations/qrd_diffuser_profile.svg",
                    "Cross-section of QRD wells"
                )

    # --- TOPIC 6: STANDING WAVES & ROOM MODES (v9_t6) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t6'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Standing waves (Room Modes) occur when sound waves bounce between parallel walls and their wavelength matches the room dimensions, causing massive volume buildups (peaks) and cancellations (nulls) at specific frequencies.",
                    "The room is an instrument that plays along with you.",
                    "Ethan Winer",
                    "/images/explanations/standing_wave_nodes.svg",
                    "Nodes and Antinodes diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Axial modes (between two parallel surfaces) are the strongest and most problematic room modes. Tangential (4 surfaces) and Oblique (6 surfaces) are weaker but still contribute to uneven bass response.",
                    "Fix the axial modes first.",
                    "Room Treatment Rule",
                    "/images/explanations/room_mode_types.svg",
                    "Axial vs Tangential vs Oblique"
                )

    # --- TOPIC 7: RT60 & ROOM ACOUSTICS (v9_t7) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t7'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "RT60 represents the time it takes for sound pressure to decrease by 60dB after the source stops. A control room typically aims for an RT60 of 0.2-0.4 seconds (tight/dry).",
                    "Control the decay, control the mix.",
                    "Studio Design Target",
                    "/images/explanations/rt60_decay_curve.svg",
                    "RT60 measurement graph"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "A 'Live End, Dead End' (LEDE) control room design places absorption at the front (Dead End) to stop early reflections, and diffusion at the back (Live End) to maintain energy.",
                    "Kill the reflections, keep the life.",
                    "LEDE Design Philosophy",
                    "/images/explanations/lede_room_design.svg",
                    "LEDE room layout"
                )

    # --- TOPIC 8: BASS TRAPS (v9_t8) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t8'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Bass traps are thick absorbers placed in corners where low-frequency energy creates maximum pressure. They are essential because standard thin foam panels do almost nothing below 300Hz.",
                    "Foam is for treble; mass is for bass.",
                    "Treatment Fact",
                    "/images/explanations/bass_trap_corner.svg",
                    "Corner bass trap placement"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Porous bass traps work by velocity absorption (friction). Resonant bass traps (membrane/Helmholtz) work by pressure absorption and are tuned to specific problem frequencies.",
                    "Broadband for general control, tuned traps for the surgeon.",
                    "Acoustic Tactics",
                    "/images/explanations/membrane_absorber.svg",
                    "Membrane trap cross-section"
                )

    # --- TOPIC 9: ACOUSTIC PANELS & TREATMENT (v9_t9) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t9'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "The primary goal of acoustic panels at the 'First Reflection Points' (mirror points) is to create a Reflection-Free Zone (RFZ) at the listening position, improving stereo imaging.",
                    "First reflections are the enemy of clarity.",
                    "Studio Setup 101",
                    "/images/explanations/mirror_points_diagram.svg",
                    "Identifying reflection points with a mirror"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Mounting panels with an air gap (offset from the wall) increases their low-frequency efficiency because it places the resistive material closer to the point of maximum particle velocity (1/4 wavelength).",
                    "The gap is free performance.",
                    "Installation Tip",
                    "/images/explanations/air_gap_mounting.svg",
                    "Panel mounting with air gap"
                )

    # --- TOPIC 10: STUDIO MONITORS (v9_t10) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t10'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Near-field monitors are designed to be listened to from a close distance (1-1.5m) to minimize the sound of the room acoustics. Far-field monitors are mounted in walls and interact more with the room.",
                    "Near-fields take the room out of the equation.",
                    "Monitoring Strategy",
                    "/images/explanations/near_field_setup.svg",
                    "Listener distance diagram"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Active monitors have built-in amplifiers and active crossovers before the amps. Passive monitors require an external power amplifier. Active systems generally offer better integration and protection.",
                    "Active means the amp knows the driver.",
                    "Speaker Design",
                    "/images/explanations/active_vs_passive_crossover.svg",
                    "Signal flow of active/passive"
                )

    # --- TOPIC 11: MONITOR PLACEMENT (v9_t11) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t11'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "The listener and the two speakers should form an equilateral triangle (60 degrees at each corner). This ensures the stereo image is accurate and the phantom center is solid.",
                    "The Equilateral Triangle is sacred.",
                    "Monitoring Golden Rule",
                    "/images/explanations/equilateral_triangle_setup.svg",
                    "60-degree speaker setup"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "Placing monitors right against a wall or in a corner causes 'Boundary Interference' (SBIR), artificially boosting the bass by up to 6dB or 12dB and muddying the response.",
                    "Corners are for bass traps, not speakers.",
                    "Placement Law",
                    "/images/explanations/sbir_boundary_effect.svg",
                    "Speaker boundary interference"
                )

    # --- TOPIC 12: HEADPHONES & MONITORING TECHNIQUES (v9_t12) ---
    t = next((t for t in vol['parts'][0]['topics'] if t['id'] == 'v9_t12'), None)
    if t:
        if 'basic' in t['levels']:
            for q in t['levels']['basic']:
                update_q(q,
                    "Open-back headphones offer a more natural, spacious sound for mixing but leak sound. Closed-back headphones provide isolation, making them ideal for recording (tracking) to prevent bleed into the mic.",
                    "Closed for tracking, open for mixing.",
                    "Headphone Selection",
                    "/images/explanations/open_vs_closed_headphones.svg",
                    "Diagram of headphone back types"
                )
        if 'intermediate' in t['levels']:
            for q in t['levels']['intermediate']:
                update_q(q,
                    "The disadvantage of mixing entirely on headphones is the lack of 'cross-feed' (right ear hearing left speaker). This results in a 'super-stereo' image where panning decisions might sound too narrow when played back on speakers.",
                    "Headphones lie about the center.",
                    "Mixing Warning",
                    "/images/explanations/crossfeed_diagram.svg",
                    "Speaker crossfeed vs Headphone isolation"
                )

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Volume 9 (Topics 1-12).")

if __name__ == "__main__":
    fix_vol9_complete()
