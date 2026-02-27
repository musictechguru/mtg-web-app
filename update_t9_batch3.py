import json

def update_t9_b3():
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
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Acoustics" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{q_text}"<br/><strong>- {author}</strong></blockquote>'
        }

    qs.append(q(
        "Q9: Question 9", 
        "Why is cheap, thin acoustic foam (like egg crate foam) generally considered a mistake for serious studio mixing?",
        [
            {"text": "It fundamentally absorbs far too much deep bass, ruining the low end", "is_true": False},
            {"text": "It only absorbs the highest treble frequencies, strictly leaving the muddy midrange and bass entirely untreated", "is_true": True},
            {"text": "It is physically highly reflective causing sharp echoes", "is_true": False},
            {"text": "It completely naturally blocks outside street noise effectively", "is_true": False}
        ], 
        "Thin acoustic foam lacks the physical mass and depth required to trap longer low-frequency waves. It only soaks up high frequencies, turning a room that used to sound bright into a room that sounds dull, muddy, and boomy.", 
        "To absorb a 100Hz standing wave, you need a trap practically 3 feet deep. One inch of foam does absolutely nothing below 1kHz.", 
        "Acoustics Expert", 
        "t9_q9_acoustic_foam_hq"
    ))

    qs.append(q(
        "Q10: Question 10", 
        "Where mathematically and physically is the absolute best, most effective place to firmly mount Bass Traps in a standard rectangular studio?",
        [
            {"text": "Firmly mounted directly flat on the exact middle of the side walls", "is_true": False},
            {"text": "Securely placed in the strict physical 90-degree corners of the room", "is_true": True},
            {"text": "Hung neatly squarely directly strictly from the direct middle of the flat ceiling", "is_true": False},
            {"text": "Completely randomly safely scattered squarely along the clean flat floor", "is_true": False}
        ], 
        "Low-frequency energy (bass) naturally builds up exponentially and has maximum pressure directly in the corners (and where walls meet ceilings or floors). Placing thick absorbers in corners effectively stops this massive low-end room mode buildup.", 
        "A room with untreated corners acts like a giant physical megaphone for low frequencies.", 
        "Acoustic Designer", 
        "t9_q10_bass_traps_hq"
    ))
    
    qs.append(q(
        "Q11: Question 11", 
        "What is the fundamental difference in function between acoustic 'Absorption' and 'Diffusion'?",
        [
            {"text": "Absorption smoothly kills bass, diffusion simply kills treble", "is_true": False},
            {"text": "Absorption actively removes sound energy strictly by turning it into heat, while Diffusion completely scatters sound energy cleanly in all directions without absolutely absorbing it", "is_true": True},
            {"text": "Absorption purely isolates sound from escaping, diffusion reflects it", "is_true": False},
            {"text": "Both strictly accurately mean the exactly identical purely physical thing", "is_true": False}
        ], 
        "Absorbers (like fiberglass panels) are porous and physically trap air molecules, converting sound friction into heat. Diffusers (like wooden blocks at different depths) hit sound waves and scatter them evenly, keeping a room sounding 'live' but removing harsh slapback echoes.", 
        "A room full of only absorbers sounds dead and unnatural. A great studio utilizes absorption at the front and diffusion at the back.", 
        "Studio Engineer", 
        "t9_q11_diffusion_hq"
    ))

    qs.append(q(
        "Q12: Question 12", 
        "In Control Room design, what specific physical zone is essentially created cleanly by treating the 'First Reflection Points' correctly?",
        [
            {"text": "A completely dead fully anechoic acoustic physical chamber", "is_true": False},
            {"text": "A 'Reflection-Free Zone' (RFZ) at the exact mixing listening position", "is_true": True},
            {"text": "A massive purely bass heavy specifically physical resonance zone", "is_true": False},
            {"text": "A highly explicit naturally loudly purely reverberant vocal booth", "is_true": False}
        ], 
        "Treating the mirror points (the spots on side walls where you could see the speaker in a mirror from the sitting position) ensures that the direct sound from the monitors reaches your ears smoothly before any wall reflections interfere cleanly.", 
        "To get an accurate stereo image, your brain needs to cleanly hear the monitors exclusively completely before the room explicitly talks back.", 
        "Control Room Architect", 
        "t9_q12_reflection_point_hq"
    ))

    with open('t9_q9_to_12.json', 'w') as f:
        json.dump(qs, f)

if __name__ == '__main__':
    update_t9_b3()
