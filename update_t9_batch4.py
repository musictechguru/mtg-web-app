import json

def update_t9_b4():
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
        "Q13: Question 13", 
        "What is the highly repetitive 'ringing' echo caused strictly by high frequencies bouncing rapidly back and forth between two flat parallel bare walls?",
        [
            {"text": "Room Rumble", "is_true": False},
            {"text": "Flutter Echo", "is_true": True},
            {"text": "Low frequency mud", "is_true": False},
            {"text": "Sub-Harmonic distortion", "is_true": False}
        ], 
        "Flutter echo is a fast, ringing series of reflections between two parallel surfaces. It sounds like a zinging or sweeping sound when you clap your hands in an empty rectangular room.", 
        "A simple bookshelf or a few acoustic panels placed non-symmetrically can easily destroy flutter echo.", 
        "Acoustics Expert", 
        "t9_q13_flutter_echo_hq"
    ))

    qs.append(q(
        "Q14: Question 14", 
        "What specific destructive acoustic phenomenon severely hollows out a sound when a direct signal combines with a slightly delayed version of itself?",
        [
            {"text": "Sub-Harmonic generation", "is_true": False},
            {"text": "Comb Filtering", "is_true": True},
            {"text": "Amplitude modulation", "is_true": False},
            {"text": "Frequency multiplication", "is_true": False}
        ], 
        "Comb filtering gets its name because the frequency response graph looks like the teeth of a comb, with severe, equally spaced notches of phase cancellation across the spectrum.", 
        "Never place a microphone right next to a reflective wall, or the comb filtering will make the recording sound permanently hollow.", 
        "Studio Engineer", 
        "t9_q14_comb_filtering_hq"
    ))
    
    qs.append(q(
        "Q15: Question 15", 
        "What is the fundamental difference between Soundproofing (Isolation) and Acoustic Treatment?",
        [
            {"text": "They are exactly the same physical thing", "is_true": False},
            {"text": "Isolation stops sound from leaving the room; Treatment makes the sound inside the room better", "is_true": True},
            {"text": "Isolation improves frequency response; Treatment stops noise leaks", "is_true": False},
            {"text": "Isolation uses foam; Treatment uses heavy concrete", "is_true": False}
        ], 
        "Acoustic treatment (panels, bass traps) improves the listening environment by controlling reflections. Soundproofing requires structural changes (mass, physical decoupling) to prevent sound transmission through walls.", 
        "You cannot soundproof a room by gluing foam to the walls. You must build a mass-air-mass insulated barrier.", 
        "Studio Architect", 
        "t9_q15_soundproofing_vs_treatment_hq"
    ))

    qs.append(q(
        "Q16: Question 16", 
        "What specific studio construction technique strictly uses an air gap between two heavy, physically decoupled walls to stop bass from escaping?",
        [
            {"text": "A standard simple thin glass window", "is_true": False},
            {"text": "A rigid physical steel box frame directly bolted strictly to the floor", "is_true": False},
            {"text": "Mass-Air-Mass resonance construction ('A Room within a Room')", "is_true": True},
            {"text": "Simply placing acoustic foam securely in corners", "is_true": False}
        ], 
        "To stop low frequencies from traveling through a building, studios are built as a 'room within a room'. The inner room is floated on neoprene pucks and separated from the outer shell by an insulated air gap.", 
        "Decoupling is essential. If the drywall touches the foundation, bass will travel straight through the concrete.", 
        "Construction Engineer", 
        "t9_q16_mass_air_mass_hq"
    ))

    with open('t9_q13_to_16.json', 'w') as f:
        json.dump(qs, f)

if __name__ == '__main__':
    update_t9_b4()
