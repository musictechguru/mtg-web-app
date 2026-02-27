import json

def update_t7_batch1():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic_index = next((i for i, t in enumerate(stage2['items']) if "Topic 7" in t.get('title', '')), None)
    
    questions = []
    
    def make_q(title, content, answers, exp, quote_text, quote_author, img):
        return {
            "title": title,
            "type": "multi_choice",
            "content": content,
            "answers": answers,
            "expert_explanation": exp,
            "expert_quote": {
                "text": quote_text,
                "author": quote_author
            },
            "img": f"/images/gen/{img}_123.png", 
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{quote_text}"<br/><strong>- {quote_author}</strong></blockquote>'
        }

    # --- EASY ---
    questions.append(make_q(
        "Q1: Question 1",
        "What does the term 'RT60' fundamentally measure in acoustic reverberation?",
        [
            {"text": "The Real Time required to record exactly 60 seconds of audio Delay", "is_true": False},
            {"text": "Reverberation Time 60: The exact amount of time it takes for a sound to decay and drop in volume by precisely 60 decibels", "is_true": True},
            {"text": "The amount of Room Taming applied at 60Hz to control muddy low frequencies", "is_true": False},
            {"text": "A specific 1960s analog reverb preset", "is_true": False}
        ],
        "RT60 is the scientific standard for 'decay time'. If a massive cathedral has an RT60 of 4.5 seconds, it takes 4.5 seconds for a loud snare crack to fade into complete, inaudible silence.",
        "Reverb is the acoustic glue that holds the universe together. RT60 is simply the ruler we use to measure how big that acoustic universe actually is.",
        "Bob Katz",
        "t7_q1_rt60_decay_hq"
    ))

    questions.append(make_q(
        "Q2: Question 2",
        "What differentiates 'Early Reflections' from the 'Reverb Tail' in a physical acoustic space?",
        [
            {"text": "Early Reflections are bass frequencies; the Tail is treble", "is_true": False},
            {"text": "Early Reflections are the first few distinct, rapid echoes bouncing immediately off the closest physical walls; the Tail is the dense, complex, overlapping chaotic wash of late echoes", "is_true": True},
            {"text": "Early Reflections are created by tape delay; the Tail is created by springs", "is_true": False},
            {"text": "There is no physical difference", "is_true": False}
        ],
        "Your brain uses Early Reflections (the first 10-50 milliseconds) to instantly calculate the physical size and shape of the room. The Reverb Tail provides the lush, smooth, atmospheric sustain after that initial snapshot.",
        "If you want a vocal to sound intimately close but still inside a real room, turn the massive Reverb Tail completely down and leave only the Early Reflections. It creates invisible three-dimensional boundaries.",
        "Dave Pensado",
        "t7_q2_early_reflections_hq"
    ))

    questions.append(make_q(
        "Q3: Question 3",
        "Which time-based effect simply takes the original audio signal and organically repeats it later in time at a specific interval?",
        [
            {"text": "Compression", "is_true": False},
            {"text": "Delay", "is_true": True},
            {"text": "Equalization", "is_true": False},
            {"text": "Distortion", "is_true": False}
        ],
        "Delay (or Echo) is the simplest time effect. You shout 'Hello' across a canyon, and 500 milliseconds later, the canyon physically shouts 'Hello' back at you.",
        "Reverb washes a vocal to the back of the mix. Delay keeps a vocal aggressively at the very front of the mix while still adding massive, exciting, rhythmic depth.",
        "Chris Lord-Alge",
        "t7_q3_delay_definition_hq"
    ))

    questions.append(make_q(
        "Q4: Question 4",
        "What is the specific purpose of the 'Pre-Delay' parameter on a typical studio reverb unit?",
        [
            {"text": "To add a secondary distortion to the reverb tail", "is_true": False},
            {"text": "To artificially insert a gap of absolute pure silence between the original dry sound and the exact moment the massive wet reverb tail begins", "is_true": True},
            {"text": "To reverse the audio before reverberating", "is_true": False},
            {"text": "To cut the 60Hz rumble from the reverb", "is_true": False}
        ],
        "A 30-millisecond Pre-Delay allows the sharp, dry transient of a snare drum to punch through the mix cleanly and violently, *before* the massive explosion of the reverb tail physically triggers behind it to wash it out.",
        "Without Pre-Delay, you are instantly suffocating your lead vocal in a swamp of dense fog. With a long 50ms Pre-Delay, the singer steps crisply out into the clear sunshine, while the fog stays far behind them.",
        "Tony Maserati",
        "t7_q4_predelay_gap_hq"
    ))

    questions.append(make_q(
        "Q5: Question 5",
        "What is the iconic defining characteristic of a 'Slapback Delay'?",
        [
            {"text": "An incredibly long, 4-second delay with massive regenerating feedback repeats", "is_true": False},
            {"text": "A single, very fast, distinct echo (usually 70-120 milliseconds) with absolutely zero feedback repeats, instantly recognizable on standard 1950s Rockabilly vocals", "is_true": True},
            {"text": "A delay that specifically pans wildly from left to right", "is_true": False},
            {"text": "A heavily distorted reverb tail", "is_true": False}
        ],
        "Slapback delay was originally created by physically manipulating the record and playback heads on analog magnetic tape machines. It creates a highly rhythmic, bouncy, extremely aggressive rock-and-roll vocal presence.",
        "Slapback echo is the sound of pure rebellion. It is John Lennon's vocal in 1956. You bounce the audio off a brick wall just once, and it hits the listener directly in the teeth.",
        "Sam Phillips",
        "t7_q5_slapback_delay_hq"
    ))

    questions.append(make_q(
        "Q6: Question 6",
        "If you want to simulate a massive, luxurious physical space like an orchestral Concert Hall, what 'Decay Time' (RT60) would you typically select?",
        [
            {"text": "A very tight, fast 0.3 seconds", "is_true": False},
            {"text": "A lush, incredibly long 2.0 to 3.5 seconds", "is_true": True},
            {"text": "Exactly 0.0 milliseconds", "is_true": False},
            {"text": "It physically does not matter", "is_true": False}
        ],
        "A large physical architectural space naturally creates long, dense, complex reverberation times. Hall reverbs are incredibly beautiful for sustaining instruments like string sections, pianos, and slow dramatic vocal ballads.",
        "When you apply a gorgeous 3-second Hall reverb to a lush string section, you stop listening to the individual ugly bows scraping against the physical wood, and you start listening to the majestic architecture of the room itself.",
        "George Massenburg",
        "t7_q6_hall_reverb_rt60_hq"
    ))

    questions.append(make_q(
        "Q7: Question 7",
        "What does the 'Feedback' (or Regeneration) parameter physically control on a Delay effect?",
        [
            {"text": "It compresses the volume of the echo", "is_true": False},
            {"text": "It determines exactly how much of the delayed echo is routed recursively back into its own input, physically controlling the total number of repeating echoes", "is_true": True},
            {"text": "It controls the high frequency EQ of the echo", "is_true": False},
            {"text": "It controls the panning of the echo", "is_true": False}
        ],
        "If Feedback is set to 0%, you hear exactly one single echo and nothing else. If it is set to 50%, you hear a fading trail of 5 or 6 echoes. If set to 100%, it will repeat intensely forever in a self-oscillating infinite sonic loop.",
        "Pushing an analog tape delay's feedback knob past 100% causes it to violently self-oscillate and scream like a dying spaceship. It is the most beautiful, dangerous, chaotic analog sound in the world.",
        "Sylvia Massy",
        "t7_q7_delay_feedback_hq"
    ))

    questions.append(make_q(
        "Q8: Question 8",
        "When setting up a typical modern vocal Reverb on an 'Auxiliary Return' channel, where should the 'Mix' or 'Wet/Dry' dial inside the reverb plugin be permanently set?",
        [
            {"text": "0% Wet (Fully Dry)", "is_true": False},
            {"text": "50% Wet, 50% Dry", "is_true": False},
            {"text": "100% Wet (Fully Wet)", "is_true": True},
            {"text": "It must randomly fluctuate", "is_true": False}
        ],
        "If the Reverb plugin is on an Aux Bus, the pure Dry vocal is already coming safely down its own main channel fader. The Aux channel must therefore output 100% pure Wet Reverb effect to be safely blended in underneath.",
        "Never put a reverb directly on a lead vocal insert track unless it's a terrifying special effect. Send it to an Aux bus locked at 100% Wet, so you can fiercely EQ, compress, and heavily distort the reverb completely independently from the pure dry vocal.",
        "Andrew Scheps",
        "t7_q8_aux_return_wet_hq"
    ))

    questions.append(make_q(
        "Q9: Question 9",
        "What is the massive physical mechanical component inside an iconic 'EMT 140' Plate Reverb?",
        [
            {"text": "A tiny digital microchip circuit", "is_true": False},
            {"text": "A massive, extremely heavy 600-pound suspended sheet of tensioned steel metal vibrating mechanically under enormous physical stress", "is_true": True},
            {"text": "A hollow wooden box with a microphone inside", "is_true": False},
            {"text": "A long slinky spring mechanism", "is_true": False}
        ],
        "A transducer physically excites the massive steel plate, sending complex physical vibrations shimmering across the metal. Contact pickups then record those chaotic metal vibrations as an incredibly dense, impossibly bright, lush audio 'reverb'.",
        "The massive steel Plate Reverb does not sound like a real acoustic room. It sounds radically better than a real room. It is dense, intensely incredibly bright, and sits under a lead vocal perfectly without causing any muddy low-end buildup.",
        "Mix Engineer",
        "t7_q9_emt140_plate_reverb_hq"
    ))

    questions.append(make_q(
        "Q10: Question 10",
        "What does the 'Damping' parameter control on a sophisticated Reverb unit?",
        [
            {"text": "How loudly the reverb echoes back", "is_true": False},
            {"text": "How rapidly the extreme High Frequencies die out organically in the reverb tail, successfully simulating the natural acoustic absorption of soft curtains or human bodies in a real room", "is_true": True},
            {"text": "The amount of distortion in the echo", "is_true": False},
            {"text": "The physical depth of the room", "is_true": False}
        ],
        "In a real architectural space, high-frequency treble naturally loses energy and dies much faster than low-frequency bass. Heavy 'Damping' makes the reverb tail sound incredibly warm, dark, and natural by aggressively killing the bright, hissing 'S' vocal frequencies.",
        "If your vocal reverb sounds horribly harsh, cheap, and hissy, don't turn the huge reverb volume entirely down. Turn the High-Frequency Damping heavily up to forcefully kill the horrible sibilance in the tail.",
        "Clearmountain",
        "t7_q10_reverb_damping_hq"
    ))

    # We only save these temporarily or append. 
    # Let's save them to a file to be picked up by the next script.
    with open('t7_q1_to_10.json', 'w') as f:
        json.dump(questions, f)

if __name__ == '__main__':
    update_t7_batch1()
