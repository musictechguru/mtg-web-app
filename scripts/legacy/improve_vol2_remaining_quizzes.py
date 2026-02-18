import json

def update_quizzes():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)

    def find_question(q_id, questions_list):
        return next((q for q in questions_list if q['id'] == q_id), None)

    vol2 = next((v for v in data['volumes'] if v['id'] == 'vol2'), None)
    if not vol2:
        print("Volume 2 not found!")
        return

    # --- TOPIC 7 (VOCALS) ---
    t7 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t7'), None)
    if t7:
        qs = t7['levels']['basic']
        
        # Q1: Mic Type (Studio)
        q = find_question('v2_t7_b_1', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_condenser.svg", "alt": "Condenser Construction"}
            q['expert_explanation'] = "Studio vocals need to capture every detail, breath, and nuance. Large Diaphragm Condensers (LDCs) are the standard for this."
            
        # Q2: Distance
        q = find_question('v2_t7_b_2', qs)
        if q:
            q['explanation_image'] = {"src": "/images/explanations/mic_placement_vocal.png", "alt": "Vocal Distance"}
            q['expert_explanation'] = "6-12 inches is the sweet spot. Closer introduces proximity effect (bass boost); further introduces too much room reverb."

        # Q3: Accessory (Pop Shield)
        q = find_question('v2_t7_b_3', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/pop_filter_visual.svg", "alt": "Pop Shield"}
            q['expert_explanation'] = "A Pop Shield is non-negotiable. It stops fast-moving air (plosives like 'P' and 'B') from slamming into the diaphragm and causing distortion."

        # Q4: Pop Filter Purpose
        q = find_question('v2_t7_b_4', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/pop_filter_visual.svg", "alt": "Plosive Protection"}
            q['expert_explanation'] = "Without a pop filter, 'plosive' sounds create low-frequency blasts that can ruin a take and are almost impossible to fix in the mix."

        # Q5: Studio vs Live
        q = find_question('v2_t7_b_5', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_dynamic.svg", "alt": "Dynamic vs Condenser"}
            q['expert_explanation'] = "False. Studio vocals usually use sensitive Condensers. Live vocals use rugged Dynamics (like SM58s) to handle handling noise and prevent feedback."

        # Q8: Live Mic (SM58)
        q = find_question('v2_t7_b_8', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_dynamic.svg", "alt": "Shure SM58"}
            q['expert_explanation'] = "The Shure SM58 is the industry standard for live vocals. It's indestructible, handles loud volumes, and has a built-in shock mount."

        # Q10: Choir Distance
        q = find_question('v2_t7_b_10', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/stereo_ortf_diagram.svg", "alt": "Choir Micing"}
            q['expert_explanation'] = "For choirs, you want to capture the simplified 'blend' of voices, not individuals. Place mics several feet back and higher up."

    # --- TOPIC 8 (WINDS) ---
    t8 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t8'), None)
    if t8:
        qs = t8['levels']['basic']
        
        # Q1: Sax Mic (Ribbon)
        q = find_question('v2_t8_b_1', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/ribbon_mic_figure8.svg", "alt": "Ribbon Warmth"}
            q['expert_explanation'] = "Ribbon mics are loved for brass and woodwinds because they smooth out the harsh high frequencies, giving a warm, vintage tone."

        # Q3: Harshness (Off Axis)
        q = find_question('v2_t8_b_3', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_off_axis_coloration.svg", "alt": "Off-Axis Angle"}
            q['expert_explanation'] = "Pointing the mic directly at the bell captures the brightness. Angling it 45 degrees 'off-axis' naturally rolls off the treble for a smoother sound."

    # --- TOPIC 9 (PIANO) ---
    t9 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t9'), None)
    if t9:
        qs = t9['levels']['basic']
        
        # Q1: Lid Position
        q = find_question('v2_t9_b_1', qs)
        if q:
            q['explanation_image'] = {"src": "/images/explanations/mic_placement_piano.png", "alt": "Piano Lid"}
            q['expert_explanation'] = "For classical, fully open the lid (full stick). This allows the sound to project out into the room/hall, which is part of the instrument's sound."

        # Q2: Grand Position
        q = find_question('v2_t9_b_2', qs)
        if q:
            q['explanation_image'] = {"src": "/images/explanations/explanation_stereo_xy.png", "alt": "Piano XY"}
            q['expert_explanation'] = "For a natural, phase-coherent stereo image, place an XY pair of condensers outside the curve of the piano, looking in."

        # Q6: Stereo Technique
        q = find_question('v2_t9_b_6', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/stereo_spaced_pair_diagram.svg", "alt": "Spaced Pair"}
            q['expert_explanation'] = "Spaced Pair (AB) gives the widest image. One mic over bass strings, one over treble. Great for 'cinematic' width, but watch for phase!"

    # --- TOPIC 10 (STEREO) ---
    t10 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t10'), None)
    if t10:
        qs = t10['levels']['basic']
        
        # Q1: X/Y Technique
        q = find_question('v2_t10_b_1', qs)
        if q:
            q['explanation_image'] = {"src": "/images/explanations/explanation_stereo_xy.png", "alt": "XY Config"}
            q['expert_explanation'] = "XY uses two Cardioid mics at 90 degrees with capsules touching. It relies on intensity (volume) differences, not timing, so it has perfect mono compatibility."

        # Q4: M/S Meaning
        q = find_question('v2_t10_b_4', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/stereo_mid_side_diagram.svg", "alt": "Mid Side"}
            q['expert_explanation'] = "M/S stands for Mid/Side. The Mid mic faces forward (Cardioid). The Side mic faces sideways (Figure-8). Matrixing them lets you adjust width later."

        # Q6: Widest Technique
        q = find_question('v2_t10_b_6', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/stereo_spaced_pair_diagram.svg", "alt": "Spaced Pair Width"}
            q['expert_explanation'] = "Spaced Pair (AB) creates the widest stereo image because it captures time-of-arrival differences. It sounds huge but can be 'phasey' in mono."

        # Q7: ORTF
        q = find_question('v2_t10_b_7', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/stereo_ortf_diagram.svg", "alt": "ORTF Angle"}
            q['expert_explanation'] = "ORTF mimics human ears: 110 degrees apart and spaced 17cm. It combines the focus of XY with the width of Spaced Pair."

    # --- TOPIC 11 (MIC TECH) ---
    t11 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t11'), None)
    if t11:
        qs = t11['levels']['basic']
        
        # Q1: Dynamic Transducer
        q = find_question('v2_t11_b_1', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_dynamic_construction.svg", "alt": "Moving Coil"}
            q['expert_explanation'] = "Dynamic mics use a diaphragm attached to a coil of wire floating in a magnet. Sound moves the coil, generating voltage (Induction)."

        # Q5: Large Diaphragm
        q = find_question('v2_t11_b_5', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_sensitivity_comparison.svg", "alt": "LDC Sensitivity"}
            q['expert_explanation'] = "Large diaphragms move more easily with low Sound Pressure Levels, making them lower noise (higher sensitivity) and often 'richer' sounding."

    # --- TOPIC 12 (ACCESSORIES) ---
    t12 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t12'), None)
    if t12:
        qs = t12['levels']['basic']
        
        # Q2: Pop Filter Distance
        q = find_question('v2_t12_b_2', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/pop_filter_visual.svg", "alt": "Filter Spacing"}
            q['expert_explanation'] = "Place the filter 2-6 inches from the mic. If it's touching the mic, the vibration travels through. It needs an air gap to work."

        # Q3: Shock Mount
        q = find_question('v2_t12_b_3', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_shock_mount_diagram.svg", "alt": "Elastic Isolation"}
            q['expert_explanation'] = "Shock mounts use elastic bands to float the microphone. This stops low-end rumble (like footsteps or trucks outside) from traveling up the stand."

        # Q9: Boom Stand
        q = find_question('v2_t12_b_9', qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_stand_boom.svg", "alt": "Boom Arm"}
            q['expert_explanation'] = "A boom arm allows you to extend the mic over instruments (like drums or a seated guitarist) without the stand base getting in the way."

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print("Updated Volume 2 Remaining Topics (7-12) successfully.")

if __name__ == "__main__":
    update_quizzes()
