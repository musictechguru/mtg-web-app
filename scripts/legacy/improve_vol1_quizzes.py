
import json

def update_vol1_questions():
    file_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    
    with open(file_path, 'r') as f:
        data = json.load(f)
    
    # Locate V1 T1 Basic questions
    # Struct: volumes[0] -> parts[0] -> topics[0] -> levels['basic']
    # We'll search by ID to be safe
    
    target_topic = None
    for vol in data['volumes']:
        if vol['id'] == 'vol1':
            for part in vol['parts']:
                for topic in part['topics']:
                    if topic['id'] == 'v1_t1':
                        target_topic = topic
                        break
    
    if not target_topic:
        print("Error: Could not find Volume 1 Topic 1")
        return

    questions = target_topic['levels']['basic']
    
    # Update Q1: Audio vs Sound
    q1 = next((q for q in questions if q['id'] == 'v1_t1_b_1'), None)
    if q1:
        q1['answers'] = [
            {"text": "Electrical signals representing sound", "is_true": "yes"},
            {"text": "Physical vibrations in the air (Sound)", "is_true": "no"},
            {"text": "The volume of a signal", "is_true": "no"},
            {"text": "The frequency of a wave", "is_true": "no"}
        ]
        q1['expert_explanation'] = "Audio vs Sound: 'Sound' is acoustic (air pressure waves), like a voice in a room. 'Audio' is the electrical representation of that sound (voltage) flowing through cables."
        q1['explanation_image'] = {
            "src": "/images/svg/audio_vs_sound.svg",
            "alt": "Audio vs Sound Diagram"
        }

    # Update Q2: Frequency
    q2 = next((q for q in questions if q['id'] == 'v1_t1_b_2'), None)
    if q2:
        q2['answers'] = [
            {"text": "Hertz (Hz)", "is_true": "yes"},
            {"text": "Decibels (dB)", "is_true": "no"},
            {"text": "Phase (Degrees)", "is_true": "no"},
            {"text": "Bit Depth (Bits)", "is_true": "no"}
        ]
        q2['expert_explanation'] = "Hertz (Hz) measures cycles per second. 1 Hz = 1 vibration per second. Low pitch = slow vibration (low Hz). High pitch = fast vibration (high Hz)."
        q2['explanation_image'] = {
            "src": "/images/svg/freq_comparison.svg",
            "alt": "Frequency Comparison"
        }

    # Update Q3: Pitch
    # CHANGE: Use new pitch_perception.svg
    q3 = next((q for q in questions if q['id'] == 'v1_t1_b_3'), None)
    if q3:
        q3['answers'] = [
            {"text": "Frequency", "is_true": "yes"},
            {"text": "Amplitude", "is_true": "no"},
            {"text": "Phase", "is_true": "no"},
            {"text": "Timbre", "is_true": "no"}
        ]
        q3['expert_explanation'] = "Frequency is the physical speed of vibration. Pitch is how our brains perceive that frequency as a musical note (like A, B, C#)."
        q3['explanation_image'] = {
            "src": "/images/svg/pitch_perception.svg",
            "alt": "Pitch Perception Diagram"
        }

    # Update Q4: Amplitude
    q4 = next((q for q in questions if q['id'] == 'v1_t1_b_4'), None)
    if q4:
        q4['answers'] = [
            {"text": "Loudness/Volume", "is_true": "yes"},
            {"text": "Pitch", "is_true": "no"},
            {"text": "Timbre", "is_true": "no"},
            {"text": "Stereo Width", "is_true": "no"}
        ]
        q4['expert_explanation'] = "Amplitude is the strength or energy of the waveform. Higher amplitude pushes air harder, which we perceive as louder volume."
        q4['explanation_image'] = {
            "src": "/images/svg/amplitude_loudness.svg",
            "alt": "Amplitude Diagram"
        }
        
    # Update Q5: Hearing Range
    q5 = next((q for q in questions if q['id'] == 'v1_t1_b_5'), None)
    if q5:
        q5['answers'] = [
            {"text": "20 Hz to 20 kHz", "is_true": "yes"},
            {"text": "10 Hz to 100 kHz", "is_true": "no"},
            {"text": "50 Hz to 5 kHz", "is_true": "no"},
            {"text": "0 dB to 100 dB", "is_true": "no"}
        ]
        q5['expert_explanation'] = "20Hz-20kHz is the standard human hearing range. We feel 20Hz as a rumble, and we sense 20kHz as 'air' or brilliance. We lose high-frequency hearing as we age."
        q5['explanation_image'] = {
            "src": "/images/svg/hearing_spectrum.svg",
            "alt": "Hearing Range Spectrum"
        }
    
    # Update Q6: Waveform
    q6 = next((q for q in questions if q['id'] == 'v1_t1_b_6'), None)
    if q6:
         q6['answers'] = [
            {"text": "Visual representation of sound over time", "is_true": "yes"},
            {"text": "Frequency spectrum snapshot", "is_true": "no"},
            {"text": "Stereo field visualizer", "is_true": "no"},
            {"text": "Dynamic range meter", "is_true": "no"}
        ]
         # Keep existing animated image if it's good, or update
         # 'waveform_phaser_anim.svg' was in previous file, let's keep it as it illustrates 'waveform'
         q6['expert_explanation'] = "A waveform (Time Domain) shows how air pressure changes over time. It's what you see in your DAW edit window."

    # Update Q7: Sound Pressure Level unit
    # CHANGE: Use new decibel_scale.svg
    q7 = next((q for q in questions if q['id'] == 'v1_t1_b_7'), None)
    if q7:
        q7['answers'] = [
            {"text": "Decibels (dB)", "is_true": "yes"},
            {"text": "Hertz (Hz)", "is_true": "no"},
            {"text": "Watts (W)", "is_true": "no"},
            {"text": "Volts (V)", "is_true": "no"}
        ]
        q7['expert_explanation'] = "We measure sound pressure in Decibels (dB). It's a logarithmic scale because our ears are logarithmic—we need much more energy to perceive a sound as 'twice as loud'."
        q7['explanation_image'] = {
            "src": "/images/svg/decibel_scale.svg", 
            "alt": "Decibel Logarithmic Scale"
        }
    
    # Update Q8: Transient
    q8 = next((q for q in questions if q['id'] == 'v1_t1_b_8'), None)
    if q8:
        q8['answers'] = [
            {"text": "Short, sharp initial burst of energy", "is_true": "yes"},
            {"text": "Long, sustained musical note", "is_true": "no"},
            {"text": "Low frequency rumble", "is_true": "no"},
            {"text": "Background noise", "is_true": "no"}
        ]
        q8['expert_explanation'] = "A transient is the initial high-energy 'crack' of a sound (like a snare hit or pick on a guitar string). Compressing transients creates 'punch'."
        q8['explanation_image'] = {
             "src": "/images/svg/transient_waveform.svg",
             "alt": "Transient Waveform"
        }

    # Update Q9: Bass Frequencies
    # CHANGE: Use new bass_woofer.svg
    q9 = next((q for q in questions if q['id'] == 'v1_t1_b_9'), None)
    if q9:
         q9['answers'] = [
            {"text": "Low frequencies (20-250 Hz)", "is_true": "yes"},
            {"text": "High frequencies (4 kHz+)", "is_true": "no"},
            {"text": "Mid frequencies (500 Hz - 2 kHz)", "is_true": "no"},
            {"text": "Supersonic frequencies (> 20 kHz)", "is_true": "no"}
        ]
         q9['expert_explanation'] = "Bass frequencies (approx 20-250Hz) provide the foundation and power. They are omnidirectional and physically felt by the body."
         q9['explanation_image'] = {
             "src": "/images/svg/bass_woofer.svg",
             "alt": "Bass Woofer Diagram"
         }

    # Update Q10: Treble Frequencies
    # CHANGE: Use new treble_eq.svg
    q10 = next((q for q in questions if q['id'] == 'v1_t1_b_10'), None)
    if q10:
        q10['answers'] = [
            {"text": "High frequencies (4 kHz+)", "is_true": "yes"},
            {"text": "Low frequencies (20-250 Hz)", "is_true": "no"},
            {"text": "Sub-bass frequencies (< 60 Hz)", "is_true": "no"},
            {"text": "Mid-range frequencies (1 kHz)", "is_true": "no"}
        ]
        q10['expert_explanation'] = "Treble frequencies (5kHz+) give sound its detail, air, and definition. Too much treble sounds harsh; too little sounds muffled or 'dark'."
        q10['explanation_image'] = {
             "src": "/images/svg/treble_eq.svg",
             "alt": "Treble EQ Diagram"
         }
    
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Successfully updated Volume 1 Topic 1 quizzes.")

if __name__ == "__main__":
    update_vol1_questions()
