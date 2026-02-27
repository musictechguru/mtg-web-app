import json

def update_t9_b2():
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
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Acoustics" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{q_text}"<br/><strong>- {author}</strong></blockquote>'
        }

    qs.append(q(
        "Q5: Question 5", 
        "What acoustic phenomenon occurs when two identical sound waves are played 180 degrees out of phase?",
        [
            {"text": "The volume doubles", "is_true": False},
            {"text": "The sounds completely cancel each other out resulting in absolute silence", "is_true": True},
            {"text": "The pitch drops by one octave", "is_true": False},
            {"text": "A physical reverberation echo occurs", "is_true": False}
        ], 
        "When the peak of one wave aligns exactly with the trough of another identical wave, they add up to zero air pressure change. This is called complete phase cancellation.", 
        "Perfect phase cancellation is the fundamental mathematical secret behind how modern active noise-canceling headphones work.", 
        "Audio Engineer", 
        "t9_q5_phase_cancellation_hq"
    ))

    qs.append(q(
        "Q6: Question 6", 
        "According to the 'Inverse Square Law', if you double your distance from a direct sound source, what happens to the sound pressure level?",
        [
            {"text": "It increases by exactly 3dB", "is_true": False},
            {"text": "It drops by 6dB (losing 75% of acoustic energy)", "is_true": True},
            {"text": "It cuts entirely in half", "is_true": False},
            {"text": "It remains identical", "is_true": False}
        ], 
        "The Inverse Square Law states that sound energy spreads out over a larger spherical area. Doubling distance means energy is spread over four times the area, a 6dB drop.", 
        "Moving a microphone from 1 foot to 2 feet away from a singer loses 6dB of volume. Understanding the inverse square law is crucial.", 
        "Studio Engineer", 
        "t9_q6_inverse_square_hq"
    ))
    
    qs.append(q(
        "Q7: Question 7", 
        "What does the acoustic scientific measurement 'RT60' calculate?",
        [
            {"text": "Total low frequency under 60Hz", "is_true": False},
            {"text": "The exact time in seconds it takes for a sound's reverberation to decay by 60 decibels", "is_true": True},
            {"text": "The ratio between analog tape and digital conversion", "is_true": False},
            {"text": "The total room volume", "is_true": False}
        ], 
        "RT60 represents the time required for reflections of a direct sound to decay by 60 dB. Optimal control rooms usually aim for a short, tight RT60 around 0.3 seconds.", 
        "If a control room's RT60 is too long, the reverb of the room will completely smear the transients of the mix you are working on.", 
        "Acoustician", 
        "t9_q7_rt60_decay_hq"
    ))

    qs.append(q(
        "Q8: Question 8", 
        "What is a 'Standing Wave' (or Room Mode) in an acoustic recording space?",
        [
            {"text": "A pure sine wave played continuously", "is_true": False},
            {"text": "A stationary acoustic wave pattern created when low frequencies bounce between parallel walls, causing massive volume peaks and nulls", "is_true": True},
            {"text": "The sound of a crowd standing and cheering", "is_true": False},
            {"text": "A wave that travels vertically from floor to ceiling only", "is_true": False}
        ], 
        "When the wavelength of a specific low frequency perfectly matches the dimensions between two parallel walls, it bounces back onto itself and creates stationary 'hot' and 'cold' spots of bass volume.", 
        "Standing waves will lie to you. They will make you think your mix has too much bass when standing in a corner, but no bass when sitting in the center.", 
        "Acoustic Designer", 
        "t9_q8_standing_wave_hq"
    ))

    with open('t9_q5_to_8.json', 'w') as f:
        json.dump(qs, f)

if __name__ == '__main__':
    update_t9_b2()
