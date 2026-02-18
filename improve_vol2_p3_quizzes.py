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

    # --- TOPIC 5 UPDATES (Drums) ---
    t5 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t5'), None)
    if t5:
        basic_qs = t5['levels']['basic']
        
        # Q1: Snare Standard (SM57)
        q = find_question('v2_t5_b_1', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/snare_mic_position.svg", "alt": "Snare Mic Angle"}
            q['expert_explanation'] = "The SM57 on snare is a classic not just for its sound, but because its tight pattern rejects the hi-hat next to it."

        # Q2: Snare Position (Rim/Center)
        q = find_question('v2_t5_b_2', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/snare_rim_vs_center.svg", "alt": "Snare Tone Zones"}
            q['expert_explanation'] = "Think of the snare head in zones: Center = Thud/Body. Edge = Ring/Overtone. 1-2 inches in is the balanced sweet spot."

        # Q3: Kick Inside
        q = find_question('v2_t5_b_3', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/kick_in_out_mic.svg", "alt": "Kick Cutaway"}
            q['expert_explanation'] = "Inside the kick, close to the beater, is where the sharp 'click' lives. The further back you pull, the boomier it gets."

        # Q4: Kick Hole
        q = find_question('v2_t5_b_4', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/kick_in_out_mic.svg", "alt": "Kick Port"} # Reusing cutaway effectively
            q['expert_explanation'] = "A ported front head (with a hole) dries out the sound and makes mic placement easier, but a solid head has more vintage resonance."

        # Q5: Overhead (SDC)
        q = find_question('v2_t5_b_5', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/overhead_xy_config.svg", "alt": "Overhead XY"}
            q['expert_explanation'] = "Small Diaphragm Condensers (SDCs) are fast enough to capture the shimmering transients of cymbals without smearing them."

        # Q6: Overhead Height
        q = find_question('v2_t5_b_6', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/overhead_xy_config.svg", "alt": "Overhead View"}
            q['expert_explanation'] = "Height matters: Too low and the cymbals dominate the kit. Too high and you hear too much room. 3-4 feet is the balance."

        # Q7: Hi-Hat Bleed
        q = find_question('v2_t5_b_7', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/hihat_snare_isolation.svg", "alt": "Hi-Hat Null"}
            q['expert_explanation'] = "The 'Null Point' is the blind spot of a cardioid mic. Always aim the back of the snare mic at the hi-hat to reject bleed."

        # Q8: Tom Distance
        q = find_question('v2_t5_b_8', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/tom_clip_angle.svg", "alt": "Tom Clip"}
            q['expert_explanation'] = "Clip-on mics ensure consistent distance (1-2 inches), so even if the drummer moves the kit, the sound stays the same."

        # Q9: Snare Bottom
        q = find_question('v2_t5_b_9', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/snare_mic_position.svg", "alt": "Snare Wires"} # Reusing side view
            q['expert_explanation'] = "The top head gives you the 'Thud'. The bottom head gives you the 'Fizz' (wires). You need to blend them."

        # Q10: Snare Phase
        q = find_question('v2_t5_b_10', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/phase_flip_summation.svg", "alt": "Phase Cancellation"}
            q['expert_explanation'] = "Because the top and bottom heads move in opposite directions when hit, you MUST flip the phase (polarity) on the bottom mic or you'll lose all the bass."

    # --- TOPIC 6 UPDATES (Strings) ---
    t6 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t6'), None)
    if t6:
        basic_qs = t6['levels']['basic']

        # Q1: Acoustic Position
        q = find_question('v2_t6_b_1', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/acoustic_guitar_12th_fret.svg", "alt": "12th Fret Spot"}
            q['expert_explanation'] = "The 12th fret is the 'Goldilocks' zone: It captures the body's warmth and the strings' brightness without the mud of the soundhole."

        # Q2: Acoustic Type
        q = find_question('v2_t6_b_2', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/mic_condenser.svg", "alt": "Condenser Icon"} # Using existing or generic
            q['expert_explanation'] = "Acoustic instruments have complex high-frequency details (harmonics). Condenser mics are sensitive enough to capture that 'air'."

        # Q3: Soundhole Myth
        q = find_question('v2_t6_b_3', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/acoustic_soundhole_boom.svg", "alt": "Boomy Soundhole"}
            q['expert_explanation'] = "Putting a mic in the soundhole creates a 'boomy', resonant mess. It's like listening inside a seashell—all standing waves."

        # Q4: Amp Standard (SM57)
        q = find_question('v2_t6_b_4', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/amp_mic_axis_angle.svg", "alt": "Amp Mic"}
            q['expert_explanation'] = "Dynamic mics like the SM57 can handle the extreme volume (SPL) of a guitar amp without distorting."

        # Q5: Amp Cone Zone (Bright)
        q = find_question('v2_t6_b_5', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/amp_cone_axis.svg", "alt": "Cone Zones"}
            q['expert_explanation'] = "The center of the speaker (dust cap) is where the high frequencies beam out. Move to the edge for a warmer, darker tone."

        # Q6: Amp Off-Axis
        q = find_question('v2_t6_b_6', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/amp_mic_axis_angle.svg", "alt": "Off Axis"}
            q['expert_explanation'] = "Angling the mic 45 degrees is a natural EQ. It rolls off the harsh 'fizz' of distortion without needing a plugin."

        # Q7: Acoustic Distance
        q = find_question('v2_t6_b_7', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/acoustic_guitar_12th_fret.svg", "alt": "Distance View"}
            q['expert_explanation'] = "Close micing (6-12 inches) gives you intimacy and presence, but getting too close boosts the bass unnaturally (Proximity Effect)."

        # Q8: Ribbon on Amp
        q = find_question('v2_t6_b_8', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/ribbon_mic_figure8.svg", "alt": "Ribbon Mic"}
            q['expert_explanation'] = "Ribbon mics roll off high frequencies naturally, which makes them perfect for smoothing out 'digital' sounding amps or harsh cymbals."

        # Q9: Upright Bass Distance
        q = find_question('v2_t6_b_9', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/upright_bass_micing.svg", "alt": "Upright Bass"}
            q['expert_explanation'] = "Low frequency waves are physically long (20 feet+). Backing the mic up allows the wave to develop fully before hitting the diaphragm."

        # Q10: Stereo Quartet
        q = find_question('v2_t6_b_10', basic_qs)
        if q:
            q['explanation_image'] = {"src": "/images/svg/stereo_separation_quartet.svg", "alt": "Quartet Stereo"}
            q['expert_explanation'] = "For large ensembles, close micing sounds unnatural. A stereo pair captures the 'blend' and the interaction of instruments in the room."

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print("Updated Volume 2 Part 3 quizzes successfully.")

if __name__ == "__main__":
    update_quizzes()
