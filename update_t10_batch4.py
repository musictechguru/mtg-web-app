import json

def update_t10_b4():
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
        "Q13: Question 13", 
        "In 1983, a revolutionary digital protocol was standardized, allowing synthesizers and drum machines from completely different brands to sync and communicate. What was it called?",
        [
            {"text": "OSC", "is_true": False},
            {"text": "MIDI", "is_true": True},
            {"text": "ADAT", "is_true": False},
            {"text": "DANTE", "is_true": False}
        ], 
        "MIDI was a massive breakthrough. Before MIDI, a Roland synth could not easily talk to a Korg drum machine. MIDI established a universal 5-pin digital language for pitch, velocity, and clock synchronization.", 
        "MIDI completely democratized modern music. One person with a sequencer could control an entire orchestra of hardware synthesizers.", 
        "Electronic Pioneer", 
        "t10_q13_midi_history_hq"
    ))

    qs.append(q(
        "Q14: Question 14", 
        "What type of synthesizer builds its sound by starting with a raw, bright waveform and mathematically removing frequencies using a filter?",
        [
            {"text": "FM Synth", "is_true": False},
            {"text": "Additive Synth", "is_true": False},
            {"text": "Subtractive Synth", "is_true": True},
            {"text": "Granular Synth", "is_true": False}
        ], 
        "Subtractive synthesis (like the Moog) generates a bright, loud oscillator wave and then uses a Low Pass Filter to carve away the harsh highs, shaping the sound like a sculptor.", 
        "The sound of the 70s and 80s was defined by the aggressive grit of a subtractive synth oscillator hitting an analog filter.", 
        "Synth Designer", 
        "t10_q14_subtractive_synth_hq"
    ))
    
    qs.append(q(
        "Q15: Question 15", 
        "Before digital samplers, the 'Mellotron' keyboard was famously used by The Beatles. How did the Mellotron actually physically work inside?",
        [
            {"text": "It used 8-bit memory chips", "is_true": False},
            {"text": "It triggered a physical reel of analog magnetic tape for every single key pressed", "is_true": True},
            {"text": "It utilized vibrating springs", "is_true": False},
            {"text": "It sent voltage to tuning forks", "is_true": False}
        ], 
        "The Mellotron was an incredible mechanical beast. When you pressed a key, an actual 8-second strip of physical analog tape containing a recording of that exact note was pulled across a tape head.", 
        "The Mellotron essentially invented sampling, but it did it completely analog.", 
        "Audio Historian", 
        "t10_q15_mellotron_tape_hq"
    ))

    qs.append(q(
        "Q16: Question 16", 
        "What was the legendary primary cultural impact of the 'Akai MPC60' digital sampler/sequencer released in 1988?",
        [
            {"text": "It was used as a tape delay", "is_true": False},
            {"text": "It became the foundational instrument for hip-hop production, allowing producers to sample breaks and sequence them with an iconic 'swing' groove", "is_true": True},
            {"text": "It introduced MIDI", "is_true": False},
            {"text": "It generated pure sine waves", "is_true": False}
        ], 
        "The MPC60, designed by Roger Linn, revolutionized music production. Its 16 velocity-sensitive rubber pads and unique sequencer swing quantization became the backbone of hip-hop beatmaking.", 
        "The MPC wasn't just a machine; it was an instrument. You played it like a drum kit.", 
        "Hip-Hop Producer", 
        "t10_q16_mpc_sampler_hq"
    ))

    with open('t10_q13_to_16.json', 'w') as f:
        json.dump(qs, f)

if __name__ == '__main__':
    update_t10_b4()
