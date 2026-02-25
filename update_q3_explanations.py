import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Definitions for expert quotes and explanations
exp_data = {
    "dist_50": {
        "text": "The sound of early rock 'n' roll was born from console preamps pushed past their limits.",
        "html": "<p><strong>Expert Explanation:</strong> Early distortion wasn't a pedal; it was an accident. Engineers recording guitarists in the 1950s discovered that overloading mixing console preamps or slashing speaker cones created a harmonically rich, aggressive buzz. This 'overdriven' sound laid the groundwork for modern rock tones.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We just turned everything all the way up until it hurt.\"<br/><strong>- 1950s Studio Engineer</strong></blockquote>"
    },
    "dist_60": {
        "text": "Fuzz pedals were the first standalone devices designed to purposely destroy a guitar signal.",
        "html": "<p><strong>Expert Explanation:</strong> The 1960s saw the birth of the fuzz box (like the Maestro Fuzz-Tone). Using flawed germanium or silicon transistors, these pedals clipped the audio waveform so aggressively it became a square wave, creating a synthetic, horn-like sustain favored by acts like The Rolling Stones and Jimi Hendrix.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It sounded like a swarm of angry bees in a tin can.\"<br/><strong>- Vintage Fuzz Enthusiast</strong></blockquote>"
    },
    "dist_70": {
        "text": "High-gain tube amplifiers defined the roar of 1970s arena rock and early heavy metal.",
        "html": "<p><strong>Expert Explanation:</strong> As venues got larger, guitarists needed more volume. British and American amp manufacturers (like Marshall) started cascading multiple vacuum tube gain stages within the amplifier head itself. This produced a thick, powerful, and natural-sounding overdrive that responded dynamically to the player's touch.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The amp isn't just making it loud; it's an instrument itself.\"<br/><strong>- Heavy Metal Pioneer</strong></blockquote>"
    },
    "dist_80": {
        "text": "Solid-state overdrive pedals offered smooth, focused gain to push tube amps even harder.",
        "html": "<p><strong>Expert Explanation:</strong> In the 1980s, symmetrical and asymmetrical clipping circuits using operational amplifiers (op-amps) and diodes became standard. Pedals like the Boss SD-1 or Ibanez Tube Screamer provided a creamy, mid-boosted overdrive that guitarists used to tighten up their high-gain amps for fast, articulate solos.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It's the secret sauce that makes a good amp sound legendary.\"<br/><strong>- 80s Session Guitarist</strong></blockquote>"
    },
    "dist_90": {
        "text": "Digital amp modeling revolutionized recording by putting a whole studio of amps in a single red bean.",
        "html": "<p><strong>Expert Explanation:</strong> The late 1990s introduced digital signal processing (DSP) to guitar distortion. Devices like the Line 6 POD used complex algorithms to mathematically model the behavior of different tube amps, microphones, and speaker cabinets. This allowed musicians to get 'cranked amp' sounds directly into a DAW without waking the neighbors.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"Suddenly, infinite tones were available directly at the desktop.\"<br/><strong>- Modern Producer</strong></blockquote>"
    }
}

for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        for item in section['items']:
            if item.get('id') == 'quiz-timeline-1':
                for q in item.get('questions', []):
                    if q.get('type') == 'timeline':
                        for q_item in q.get('items', []):
                            i_id = q_item.get('id')
                            if i_id in exp_data:
                                img_src = q_item.get('img', '')
                                
                                # Make sure the explanation includes the image
                                if img_src:
                                   img_tag = f'<img src="{img_src}" alt="{q_item["text"]}" style="max-width:200px; display:block; margin: 0 auto 15px auto; border-radius:8px;" />'
                                   q_item['explanation'] = img_tag + exp_data[i_id]['html']
                                else:
                                   q_item['explanation'] = exp_data[i_id]['html']
                                   
                                q_item['expert_quote'] = { "text": exp_data[i_id]['text'] }
                                
        break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Explanations added to Q3.")
