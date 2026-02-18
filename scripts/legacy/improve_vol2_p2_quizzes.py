import json

def update_quizzes():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    # Helper to find question by ID
    def find_question(q_id, questions_list):
        return next((q for q in questions_list if q['id'] == q_id), None)

    # Locate Volume 2
    vol2 = next((v for v in data['volumes'] if v['id'] == 'vol2'), None)
    if not vol2:
        print("Volume 2 not found!")
        return

    # --- TOPIC 3 UPDATES (Polar Patterns) ---
    t3 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t3'), None)
    if t3:
        basic_qs = t3['levels']['basic']
        
        # Q1: Concept
        q = find_question('v2_t3_b_1', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/polar_3d_sphere.svg", "alt": "3D Polar Pattern"}
            q['expert_explanation'] = "Think of a polar pattern as a 3D bubble around the mic. Some bubbles are round (Omni), some are heart-shaped (Cardioid)."

        # Q2: Omni
        q = find_question('v2_t3_b_2', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/omni_circle_sources.svg", "alt": "Omni Surround"}
            q['expert_explanation'] = "Omni mics hear sound from all directions equally, like a human ear floating in space."

        # Q3: Cardioid Name
        q = find_question('v2_t3_b_3', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/cardioid_heart_overlay.svg", "alt": "Heart Shape"}
            q['expert_explanation'] = "'Cardioid' comes from the Greek word for 'heart'. The pickup pattern literally looks like an upside-down heart."

        # Q4: Rejection
        q = find_question('v2_t3_b_4', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/monitor_wedge_null.svg", "alt": "Monitor Null"}
            q['expert_explanation'] = "Cardioid mics are deaf at the rear. This is why stage monitors are placed directly behind the mic—to prevent feedback."

        # Q5: Isolation (False)
        q = find_question('v2_t3_b_5', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/omni_leakage_arrows.svg", "alt": "Omni Leakage"}
            q['expert_explanation'] = "Omni mics are terrible for isolation because they pick up room noise, computer fans, and other instruments from every angle."

        # Q6: Figure-8
        q = find_question('v2_t3_b_6', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/ribbon_element_side_view.svg", "alt": "Ribbon Element"}
            q['expert_explanation'] = "A figure-8 pattern (often found in ribbon mics) picks up sound from the front and back, but is completely deaf to the sides."

        # Q7: Live Vocal
        q = find_question('v2_t3_b_7', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/stage_vocal_rejection.svg", "alt": "Stage Rejection"}
            q['expert_explanation'] = "Cardioid is the standard for live vocals because it focuses on the singer and rejects the loud drums and amps behind them."

        # Q8: Shotgun
        q = find_question('v2_t3_b_8', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/shotgun_telescope_analogy.svg", "alt": "Telescope Mic"}
            q['expert_explanation'] = "Shotgun mics are like telescopes for sound. They have a very narrow, focused beam to capture distant sources."

        # Q9: Off-Axis
        q = find_question('v2_t3_b_9', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/cardioid_off_axis_color.svg", "alt": "Off Axis Color"}
            q['expert_explanation'] = "At 90 degrees (the side), a cardioid mic is half as sensitive (-6dB) and often sounds duller/muddy compared to the front."

        # Q10: Noisy Room
        q = find_question('v2_t3_b_10', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/shield_rejection_concept.svg", "alt": "Shield Rejection"}
            q['expert_explanation'] = "In a noisy room, you want a directional mic (Cardioid/Hypercardioid) to act as a shield, blocking out the background noise."

    # --- TOPIC 4 UPDATES (Micing Techniques) ---
    t4 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t4'), None)
    if t4:
        basic_qs = t4['levels']['basic']

        # Q1: Close Micing Range
        q = find_question('v2_t4_b_1', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/ruler_distance_12inch.svg", "alt": "Ruler Distance"}
            q['expert_explanation'] = "Close micing typically means placing the mic within 1 to 12 inches of the source to minimize room sound."

        # Q2: Advantage
        q = find_question('v2_t4_b_2', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/source_isolation_visual.svg", "alt": "Isolation Visual"}
            q['expert_explanation'] = "The main advantage of close micing is isolation. It captures the source clearly while ignoring other instruments in the room."

        # Q3: 3:1 Rule
        q = find_question('v2_t4_b_3', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/rule_3_to_1_interactive.svg", "alt": "3 to 1 Rule"}
            q['expert_explanation'] = "The 3:1 Rule states that for every unit of distance a mic is from its source, it should be at least 3 units away from any other mic."

        # Q4: Snare Distance
        q = find_question('v2_t4_b_4', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/drum_overhead_spacing.svg", "alt": "Drum Spacing"}
            q['expert_explanation'] = "If Mic A is 4 inches from the snare, Mic B must be at least 12 inches (3 x 4) away to prevent phase cancellation."

        # Q5: Proximity Effect
        q = find_question('v2_t4_b_5', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/bass_boost_curve.svg", "alt": "Bass Boost"}
            q['expert_explanation'] = "Proximity effect is a physical phenomenon where bass frequencies are boosted as a directional mic gets closer to the source."

        # Q6: Distance Micing
        q = find_question('v2_t4_b_6', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/room_reflections_blend.svg", "alt": "Room Blend"}
            q['expert_explanation'] = "Distance micing (placing mics further back) allows the direct sound to blend with the natural reflections of the room."

        # Q7: Phase Check
        q = find_question('v2_t4_b_7', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/phase_summation_wave.svg", "alt": "Phase Summation"}
            q['expert_explanation'] = "To check phase, listen to mics individually (solo), then together. If the combined sound loses bass or sounds thin, you have a phase issue."

        # Q8: Fix Phase
        q = find_question('v2_t4_b_8', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/polarity_switch_icon.svg", "alt": "Polarity Switch"}
            q['expert_explanation'] = "The quickest fix for phase problems is to flip the 'Polarity' or 'Phase Invert' switch on your preamp or console."

        # Q9: Distance Advantage
        q = find_question('v2_t4_b_9', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/room_reflections_blend.svg", "alt": "Natural Room"}
            q['expert_explanation'] = "Distance micing sounds more natural and realistic because it captures the instrument interacting with the acoustic space."

        # Q10: Live Choice
        q = find_question('v2_t4_b_10', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/stage_vocal_rejection.svg", "alt": "Live Stage"}
            q['expert_explanation'] = "Close micing is essential for live rock concerts to prevent feedback and ensure each instrument can be mixed clearly."

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print("Updated Volume 2 Part 2 quizzes successfully.")

if __name__ == "__main__":
    update_quizzes()
