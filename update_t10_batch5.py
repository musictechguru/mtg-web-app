import json

def update_t10_b5():
    qs = []
    
    def q(title, content, answers, exp, q_text, author, img):
        return {
            "title": title,
            "type": "multi_choice",
            "content": content,
            "answers": answers,
            "expert_explanation": exp,
            "expert_quote": {"text": q_text, "author": author},
            "img": f"/images/gen/{img}_123.png", 
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Equipment" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{q_text}"<br/><strong>- {author}</strong></blockquote>'
        }

    qs.append(q(
        "Q17: Question 17", 
        "What specific type of audio cable connector features 3 metal pins inside a circular metal barrel and is the universal professional standard for balanced microphones?",
        [
            {"text": "1/4 inch TS (Tip-Sleeve)", "is_true": False},
            {"text": "RCA Phono", "is_true": False},
            {"text": "XLR", "is_true": True},
            {"text": "MIDI 5-pin DIN", "is_true": False}
        ], 
        "The XLR connector is the industry standard for balanced audio. Its 3 pins carry a positive signal, a negative phase-inverted signal, and a ground shield. This balanced design mathematically cancels out electrical noise picked up over long cable runs.", 
        "If you run an unbalanced cable 100 feet across a stage, it will act like a giant antenna picking up radio interference. A balanced XLR run will be dead quiet.", 
        "Live Sound Technician", 
        "t10_q17_xlr_cable_hq"
    ))

    qs.append(q(
        "Q18: Question 18", 
        "What is the physical, mechanical purpose of an 'Isolator' or 'Pop Shield' placed between a vocalist and a condenser microphone?",
        [
            {"text": "To electronically compress the dynamic range of the singer", "is_true": False},
            {"text": "To mechanically diffuse fast blasts of air (plosives) from consonants like 'P' and 'B' before they violently strike the microphone diaphragm", "is_true": True},
            {"text": "To completely block out all high-frequency background noise in the room", "is_true": False},
            {"text": "To boost the high-end frequencies of the vocal", "is_true": False}
        ], 
        "Condenser microphones have incredibly sensitive, thin diaphragms. A sudden blast of air from singing 'Pop' will cause the diaphragm to violently bottom out, creating a massive, unfixable low-frequency 'thump' in the recording.", 
        "A pop recorded on a vocal track cannot be EQ'd out without destroying the bass of the vocal. You must use a pop shield at the source.", 
        "Vocal Producer", 
        "t10_q18_pop_shield_hq"
    ))
    
    qs.append(q(
        "Q19: Question 19", 
        "In a modern Digital Audio Workstation (DAW), what specific software tool allows you to program complex, evolving volume changes or panning moves that happen automatically during playback?",
        [
            {"text": "A purely physical analog VCA fader", "is_true": False},
            {"text": "Automation lanes", "is_true": True},
            {"text": "A standard digital reverb send", "is_true": False},
            {"text": "A physical patchbay cable", "is_true": False}
        ], 
        "Automation allows the producer to tell the DAW exactly when and how much to move a fader, pan knob, or even a plugin parameter over the timeline of a song, creating movement and excitement.", 
        "Automation is what turns a static, boring mix into an emotional journey. Ride the vocal fader up during the chorus to create impact.", 
        "Mix Engineer", 
        "t10_q19_daw_automation_hq"
    ))

    qs.append(q(
        "Q20: Question 20", 
        "In modern 2020s streaming-era mastering, professional engineers strictly target a specific integrated 'Loudness Unit' measurement to ensure their track is not turned down by Spotify or Apple Music. What is this measurement called?",
        [
            {"text": "Peak dBFS", "is_true": False},
            {"text": "LUFS (Loudness Units relative to Full Scale)", "is_true": True},
            {"text": "Analog VU Meters", "is_true": False},
            {"text": "RMS (Root Mean Square)", "is_true": False}
        ], 
        "Streaming platforms use LUFS to measure perceived loudness over time. If you master a song to -5 LUFS (insanely loud), Spotify's algorithm will simply automatically turn your track's absolute volume down to match their standard -14 LUFS target.", 
        "The loudness wars are officially over. If you crush your mix with a limiter just to make it loud, streaming platforms will just turn it down, and it will sound small and lifeless compared to a dynamic mix.", 
        "Mastering Engineer", 
        "t10_q20_lufs_mastering_hq"
    ))

    with open('t10_q17_to_20.json', 'w') as f:
        json.dump(qs, f)

if __name__ == '__main__':
    update_t10_b5()
