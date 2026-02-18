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

    # --- TOPIC 1 UPDATES (Gain & Signal Path) ---
    t1 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t1'), None)
    if t1:
        basic_qs = t1['levels']['basic']
        
        # Q1: Gain Meaning
        q = find_question('v2_t1_b_1', basic_qs)
        if q:
            q['answers'] = [
                {"text": "The speed at which the audio travels through the cable", "is_true": "no"},
                {"text": "The amplification of the input signal level", "is_true": "yes"},
                {"text": "The frequency response of the microphone", "is_true": "no"},
                {"text": "The final volume fader on the mixer", "is_true": "no"}
            ]
            q['expert_explanation'] = "Gain controls the input level (sensitivity) at the preamp stage, determining how strong the signal is before it gets processed. Volume controls the output level."
            q['explanation_image'] = {"src": "/images/svg/gain_vs_volume_flow.svg", "alt": "Gain vs Volume Flow"}

        # Q2: Signal Path
        q = find_question('v2_t1_b_2', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Computer -> Preamp -> Interface -> Microphone", "is_true": "no"},
                {"text": "Microphone -> Interface (Preamp/ADC) -> Computer", "is_true": "yes"},
                {"text": "Microphone -> Computer -> Preamp -> Speakers", "is_true": "no"},
                {"text": "Preamp -> Microphone -> Headphone Amp -> Computer", "is_true": "no"}
            ]
            q['expert_explanation'] = "The signal flows from the source (Mic) to the Preamp (to boost level), then to the A/D Converter (Interface), and finally into the Computer (DAW)."
            q['explanation_image'] = {"src": "/images/svg/recording_signal_flow.svg", "alt": "Signal Path Diagram"}

        # Q3: Preamp Function
        q = find_question('v2_t1_b_3', basic_qs)
        if q:
            q['answers'] = [
                {"text": "To record the audio directly to the hard drive", "is_true": "no"},
                {"text": "To amplify the weak microphone signal to line level", "is_true": "yes"},
                {"text": "To add reverb and delay effects", "is_true": "no"},
                {"text": "To convert digital signals back to analog", "is_true": "no"}
            ]
            q['expert_explanation'] = "Microphones output a very weak electrical signal ('mic level'). A preamp boosts this to a usable voltage ('line level') so the rest of the gear can process it."
            q['explanation_image'] = {"src": "/images/svg/microphone_preamp.svg", "alt": "Preamp Function"}

        # Q4: Clipping
        q = find_question('v2_t1_b_4', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Deleting sections of the audio file", "is_true": "no"},
                {"text": "Distortion caused when the signal level exceeds the maximum limit (0dB)", "is_true": "yes"},
                {"text": "Compressing the dynamic range of the audio", "is_true": "no"},
                {"text": "Cutting the low frequencies with an EQ", "is_true": "no"}
            ]
            q['expert_explanation'] = "Clipping occurs when the waveform is 'clipped' off at the top because it tried to go louder than the system allows (0dBFS in digital). This creates harsh distortion."
            q['explanation_image'] = {"src": "/images/svg/clipping_waveform.svg", "alt": "Clipping Waveform"}

        # Q5: Gain vs Volume
        q = find_question('v2_t1_b_5', basic_qs)
        if q:
            q['answers'] = [
                {"text": "True", "is_true": "no"},
                {"text": "False", "is_true": "yes"}
            ]
            q['expert_explanation'] = "Gain affects the input tone and saturation (pre-processing). Volume affects how loud the final signal is heard (post-processing) without changing its character."
            q['explanation_image'] = {"src": "/images/svg/gain_vs_volume_flow.svg", "alt": "Gain vs Volume"}

        # Q6: Indicator Light
        q = find_question('v2_t1_b_6', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Green (Safe)", "is_true": "no"},
                {"text": "Red (Clip/Overload)", "is_true": "yes"},
                {"text": "Yellow (Warning)", "is_true": "no"},
                {"text": "Blue (Power On)", "is_true": "no"}
            ]
            q['expert_explanation'] = "A red light on a meter almost always indicates clipping or overload. In digital recording, you want to avoid seeing red entirely."
            q['explanation_image'] = {"src": "/images/svg/headroom_safety_gap.svg", "alt": "Meter Levels"}

        # Q7: Target Level
        q = find_question('v2_t1_b_7', basic_qs)
        if q:
            q['answers'] = [
                {"text": "As close to 0dB as possible without touching it", "is_true": "no"},
                {"text": "Peaks around -12dB to -6dB, with average around -18dB", "is_true": "yes"},
                {"text": "As low as possible to keep file sizes small", "is_true": "no"},
                {"text": "Exactly -1dB at all times", "is_true": "no"}
            ]
            q['expert_explanation'] = "Aiming for an average of -18dBFS leaving peaks around -6dB ensures you have 'headroom'—a safety gap before clipping occurs."
            q['explanation_image'] = {"src": "/images/svg/headroom_safety_gap.svg", "alt": "Target Levels"}

        # Q8: Audio Interface
        q = find_question('v2_t1_b_8', basic_qs)
        if q:
            q['answers'] = [
                {"text": "A software plugin for EQ", "is_true": "no"},
                {"text": "Hardware that converts analog audio to digital (and back) for the computer", "is_true": "yes"},
                {"text": "A type of high-quality microphone cable", "is_true": "no"},
                {"text": "The screen where you edit audio waveforms", "is_true": "no"}
            ]
            q['expert_explanation'] = "An audio interface is the bridge between the analog world (mics/instruments) and the digital world (computer). It handles A/D and D/A conversion."
            q['explanation_image'] = {"src": "/images/svg/ad_converter_process.svg", "alt": "ADC Process"}

        # Q9: Low Gain / Noise
        q = find_question('v2_t1_b_9', basic_qs)
        if q:
            q['answers'] = [
                {"text": "The audio will be distorted and clipped", "is_true": "no"},
                {"text": "You'll have a poor signal-to-noise ratio (more hiss when boosted)", "is_true": "yes"},
                {"text": "The frequency response will be reversed", "is_true": "no"},
                {"text": "The computer won't recognize the file format", "is_true": "no"}
            ]
            q['expert_explanation'] = "If you record too quietly, your signal is close to the constant electronic background noise (noise floor). Boosting it later boosts the noise too."
            q['explanation_image'] = {"src": "/images/svg/snr_concept.svg", "alt": "SNR Concept"}

        # Q10: Headroom
        q = find_question('v2_t1_b_10', basic_qs)
        if q:
            q['answers'] = [
                {"text": "The physical space in the studio vocal booth", "is_true": "no"},
                {"text": "The safety margin between your peak signal level and the clipping point (0dBFS)", "is_true": "yes"},
                {"text": "The range of frequencies a microphone can capture", "is_true": "no"},
                {"text": "The amount of gain a preamp can apply", "is_true": "no"}
            ]
            q['expert_explanation'] = "Headroom is your safety buffer. If you have 6dB of headroom, your loudest peak is at -6dB, meaning you could get 6dB louder before ruining the take."
            q['explanation_image'] = {"src": "/images/svg/headroom_safety_gap.svg", "alt": "Headroom Diagram"}

    # --- TOPIC 2 UPDATES (Microphone Types) ---
    t2 = next((t for t in vol2['parts'][0]['topics'] if t['id'] == 'v2_t2'), None)
    if t2:
        basic_qs = t2['levels']['basic']

        # Q1: Main Mic Types
        q = find_question('v2_t2_b_1', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Cardioid, Omni, Figure-8", "is_true": "no"},
                {"text": "Dynamic, Condenser, Ribbon", "is_true": "yes"},
                {"text": "Analogue, Digital, USB", "is_true": "no"},
                {"text": "Handheld, Shotgun, Lavalier", "is_true": "no"}
            ]
            q['expert_explanation'] = "The three primary microphone technologies are Dynamic (moving coil), Condenser (capacitor), and Ribbon. Each has unique sonic characteristics."
            q['explanation_image'] = {"src": "/images/svg/mic_types_overview.svg", "alt": "Mic Types"}

        # Q2: Ruggedness
        q = find_question('v2_t2_b_2', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Condenser Microphone", "is_true": "no"},
                {"text": "Ribbon Microphone", "is_true": "no"},
                {"text": "Dynamic Microphone", "is_true": "yes"},
                {"text": "Tube Microphone", "is_true": "no"}
            ]
            q['expert_explanation'] = "Dynamic microphones are mechanically simple and robust. They can survive drops, high humidity, and loud volumes better than delicate condensers or ribbons."
            q['explanation_image'] = {"src": "/images/svg/mic_types_overview.svg", "alt": "Dynamic Mic Icon"}

        # Q3: Phantom Power Req
        q = find_question('v2_t2_b_3', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Dynamic Microphones", "is_true": "no"},
                {"text": "Condenser Microphones", "is_true": "yes"},
                {"text": "Passive Ribbon Microphones", "is_true": "no"},
                {"text": "All Microphones", "is_true": "no"}
            ]
            q['expert_explanation'] = "Condenser microphones need electricity to charge their internal capacitor plate and power their internal preamp. This is usually provided by +48V Phantom Power."
            q['explanation_image'] = {"src": "/images/svg/phantom_power_switch.svg", "alt": "Phantom Power"}

        # Q4: Voltage
        q = find_question('v2_t2_b_4', basic_qs)
        if q:
            q['answers'] = [
                {"text": "12 Volts", "is_true": "no"},
                {"text": "48 Volts (+48V)", "is_true": "yes"},
                {"text": "120 Volts (Mains Power)", "is_true": "no"},
                {"text": "9 Volts (Battery)", "is_true": "no"}
            ]
            q['expert_explanation'] = "The worldwide standard for phantom power is +48V DC, sent down the microphone cable itself."
            q['explanation_image'] = {"src": "/images/svg/phantom_power_switch.svg", "alt": "48V Symbol"}

        # Q5: Ribbon Danger
        q = find_question('v2_t2_b_5', basic_qs)
        if q:
            q['answers'] = [
                {"text": "True", "is_true": "yes"},
                {"text": "False", "is_true": "no"}
            ]
            q['expert_explanation'] = "While modern ribbons are safer, vintage ribbon mics can be instantly destroyed if phantom power flows through them incorrectly (e.g. via patch bay shorts)."
            q['explanation_image'] = {"src": "/images/svg/phantom_power_switch.svg", "alt": "Phantom Warning"}

        # Q6: Sensitivity
        q = find_question('v2_t2_b_6', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Dynamic (Moving Coil)", "is_true": "no"},
                {"text": "Condenser (Capacitor)", "is_true": "yes"},
                {"text": "They are all equal", "is_true": "no"},
                {"text": "Passive Ribbon", "is_true": "no"}
            ]
            q['expert_explanation'] = "Condensers have extremely light diaphragms, allowing them to capture very quiet sounds, fast transients, and high frequencies with great detail."
            q['explanation_image'] = {"src": "/images/svg/mic_sensitivity_comparison.svg", "alt": "Sensitivity Chart"}

        # Q7: SPL
        q = find_question('v2_t2_b_7', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Sound Pressure Level (Loudness)", "is_true": "yes"},
                {"text": "Signal Phase Loop", "is_true": "no"},
                {"text": "Studio Power Limiter", "is_true": "no"},
                {"text": "Stereo Panning Law", "is_true": "no"}
            ]
            q['expert_explanation'] = "SPL stands for Sound Pressure Level. It's a measure of acoustic volume in decibels. High SPL sources include kick drums and guitar amps."
            q['explanation_image'] = {"src": "/images/svg/spl_meter_scale.svg", "alt": "SPL Scale"}

        # Q8: High SPL Mic
        q = find_question('v2_t2_b_8', basic_qs)
        if q:
            q['answers'] = [
                {"text": "Sensitive Condenser Mic", "is_true": "no"},
                {"text": "Delicate Ribbon Mic", "is_true": "no"},
                {"text": "Dynamic Mic", "is_true": "yes"},
                {"text": "Contact Microphone", "is_true": "no"}
            ]
            q['expert_explanation'] = "Dynamic mics are preferred for high SPL sources like kick drums because they are hard to distort and won't be damaged by the powerful air pressure."
            q['explanation_image'] = {"src": "/images/svg/mic_types_overview.svg", "alt": "Dynamic Mic"}

        # Q9: Large Diaphragm
        q = find_question('v2_t2_b_9', basic_qs)
        if q:
            q['answers'] = [
                {"text": "It is water resistant", "is_true": "no"},
                {"text": "It produces low self-noise and a pleasing, warm character mainly for vocals", "is_true": "yes"},
                {"text": "It is smaller and easier to hide", "is_true": "no"},
                {"text": "It requires no cable", "is_true": "no"}
            ]
            q['expert_explanation'] = "Large Diaphragm Condensers (LDCs) usually have lower self-noise than small diaphragms and tend to hav a 'larger than life' sound that flatters vocals."
            q['explanation_image'] = {"src": "/images/svg/large_vs_small_diaphragm.svg", "alt": "Large vs Small"}

        # Q10: Small Diaphragm
        q = find_question('v2_t2_b_10', basic_qs)
        if q:
            q['answers'] = [
                {"text": "They look cooler on stage", "is_true": "no"},
                {"text": "Better transient response and accurate high-frequency capture", "is_true": "yes"},
                {"text": "They produce more bass than large diaphragms", "is_true": "no"},
                {"text": "They don't need a micropone stand", "is_true": "no"}
            ]
            q['expert_explanation'] = "The smaller, lighter diaphragm can move faster, making SDCs perfect for capturing the sharp attacks (transients) of acoustic guitars, cymbals, and piano."
            q['explanation_image'] = {"src": "/images/svg/large_vs_small_diaphragm.svg", "alt": "Small Diaphragm"}

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    
    print("Updated Volume 2 quizzes successfully.")

if __name__ == "__main__":
    update_quizzes()
