import json

def update_t10_b1():
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
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Equipment" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{q_text}"<br/><strong>- {author}</strong></blockquote>'
        }

    qs.append(q(
        "Q1: Question 1", 
        "What specific type of studio microphone explicitly requires 48V Phantom Power to safely and correctly operate?",
        [
            {"text": "A standard Dynamic microphone", "is_true": False},
            {"text": "A standard Condenser microphone", "is_true": True},
            {"text": "A standard Ribbon microphone", "is_true": False},
            {"text": "A standard Carbon microphone", "is_true": False}
        ], 
        "Condenser microphones use a delicate, electrically charged backplate and diaphragm to capture sound. They require an external 48V DC power source (Phantom Power) sent through the XLR cable to operate the internal preamp and charge the capsule.", 
        "Without 48V phantom power, a condenser mic is just an expensive, silent paperweight.", 
        "Studio Engineer", 
        "t10_q1_condenser_phantom_hq"
    ))

    qs.append(q(
        "Q2: Question 2", 
        "What is the fundamental mechanical difference between how a Dynamic mic and a Ribbon mic capture sound, given they both use electromagnetism?",
        [
            {"text": "Dynamic mics use a vacuum tube; Ribbon mics use a laser", "is_true": False},
            {"text": "Dynamic mics use a moving coil attached to a diaphragm; Ribbon mics use a single corrugated strip of thin metal suspended between magnets", "is_true": True},
            {"text": "Dynamic mics require 48V power; Ribbon mics use batteries", "is_true": False},
            {"text": "They are exactly the same mechanically", "is_true": False}
        ], 
        "A dynamic mic attaches a heavy coil of wire to a plastic diaphragm. A ribbon mic is much more fragile and uses a microscopically thin piece of corrugated aluminum foil that acts as both the diaphragm and the voice coil.", 
        "Ribbon mics are treasured for their incredibly smooth, warm, and natural high-end roll-off. They hear like human ears do.", 
        "Microphone Designer", 
        "t10_q2_dynamic_vs_ribbon_hq"
    ))
    
    qs.append(q(
        "Q3: Question 3", 
        "Which polar pattern captures sound strongly from the front and back, but completely explicitly rejects totally sound from the exact specific 90-degree perfectly precise sides?",
        [
            {"text": "Cardioid", "is_true": False},
            {"text": "Omnidirectional", "is_true": False},
            {"text": "Figure-8 (Bidirectional)", "is_true": True},
            {"text": "Supercardioid", "is_true": False}
        ], 
        "Figure-8 (Bidirectional) is the natural polar pattern of all ribbon microphones. It hears equally well from the front and rear, but has massive, deep 'nulls' (zones of zero pickup) precisely at its 90-degree and 270-degree sides.", 
        "The deep side nulls of a Figure-8 mic are a secret weapon in the studio. You can use them to completely block a loud drum kit while recording an acoustic guitar in the exact same room.", 
        "Recording Engineer", 
        "t10_q3_figure8_pattern_hq"
    ))

    qs.append(q(
        "Q4: Question 4", 
        "If a singer moves extremely close (within 1-2 inches) to a directional microphone, what specific EQ acoustic phenomenon occurs?",
        [
            {"text": "The Proximity Effect (a massive boost in low bass frequencies)", "is_true": True},
            {"text": "The Doppler Effect (a massive shift in pitch)", "is_true": False},
            {"text": "Comb Filtering (a hollow, thin sound)", "is_true": False},
            {"text": "Haas Effect (a widening of the stereo image)", "is_true": False}
        ], 
        "The Proximity Effect is an artificial boost in low-frequency response that occurs naturally when sound sources are placed very close to directional microphones (like Cardioid or Figure-8).", 
        "Radio broadcasters specifically use the proximity effect on purpose. They eat the mic to get that massive, deep, authoritative 'Voice of God' bass tone.", 
        "Broadcast Engineer", 
        "t10_q4_proximity_effect_hq"
    ))

    with open('t10_q1_to_4.json', 'w') as f:
        json.dump(qs, f)

if __name__ == '__main__':
    update_t10_b1()
