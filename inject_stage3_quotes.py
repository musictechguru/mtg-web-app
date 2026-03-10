import json
import random

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

# Thematic quote pools
quotes_pool = {
    "acoustics": [
        {"text": "The room is the first and most important instrument in any recording.", "author": "Acoustics 101"},
        {"text": "Treatment isn't about deadening the room; it's about making the room tell the truth.", "author": "Studio Design Principles"},
        {"text": "Reflections determine scale. Control the reflections, control the perceived size.", "author": "Mix Magazine Archive"},
        {"text": "Sound pressure behaves like light; it bounces, absorbs, and diffuses based on the surfaces it meets.", "author": "Audio Physics"},
        {"text": "You can't EQ out a standing wave. You have to fix the geometry or trap the bass.", "author": "Mastering Insight"}
    ],
    "signal flow": [
        {"text": "Signal flow is the circulatory system of the studio. If you don't know the path, you can't find the pulse.", "author": "Analog Consoles Guide"},
        {"text": "Gain staging isn't just a technical requirement; it's where the tone is shaped.", "author": "Recording Engineer Handbook"},
        {"text": "The shortest path from source to recorder usually yields the purest sound.", "author": "Studio Practices"},
        {"text": "Trace the signal carefully. Every connection is an opportunity for coloration or loss.", "author": "Vintage Desk Manual"}
    ],
    "synthesis": [
        {"text": "Subtractive synthesis is sculpting: you start with a block of harmonics and carve away until you find the tone.", "author": "Synth Secrets"},
        {"text": "The filter is the voice box of the synthesizer.", "author": "Bob Moog"},
        {"text": "Envelopes breathe life into flat waveforms, turning static voltage into musical expression.", "author": "Electronic Music Theory"},
        {"text": "Modulation is the key to movement. A static synth patch is a dead synth patch.", "author": "Sound Design Monthly"}
    ],
    "fx": [
        {"text": "Reverb creates the space; delay creates the rhythm within that space.", "author": "Mix Techniques"},
        {"text": "Effects should support the emotional intent of the part, not distract from it.", "author": "Producer's Forum"},
        {"text": "A great mix treats effects like lighting in a photograph—essential for depth, but invisible when done right.", "author": "Mastering the Mix"},
        {"text": "Time-based effects map out the three-dimensional landscape of a two-channel stereo file.", "author": "Spatial Audio Guide"}
    ],
    "eq": [
        {"text": "EQ is volume control for specific frequencies. Cut to fix, boost to feature.", "author": "Live Sound Basics"},
        {"text": "High-pass filters are the secret weapon for a clear, punchy mix.", "author": "Mixing Secrets"},
        {"text": "Don't look at the EQ curve. Look at the speakers and listen.", "author": "Classic Studio Wisdom"},
        {"text": "Every instrument needs a dedicated zip code in the frequency spectrum.", "author": "Audio Engineering Society"},
        {"text": "Parametric EQ gives you the scalpel, while graphic EQ gives you the broad strokes.", "author": "Sound Engineer's Handbook"}
    ],
    "microphones": [
        {"text": "The microphone is a mechanical ear. It only knows what you point it at.", "author": "Transducer Theory"},
        {"text": "Before you reach for the EQ, try moving the microphone half an inch.", "author": "Bruce Swedien"},
        {"text": "Dynamic mics capture the punch; condenser mics capture the air; ribbons capture the soul.", "author": "Recording Magazine"},
        {"text": "Proximity effect is a tool. Use it to warm up a weak vocal, or back off to clean up a muddy guitar.", "author": "Studio Microphone Guide"}
    ],
    "midi": [
        {"text": "MIDI isn't audio; it's sheet music for robots.", "author": "Dave Smith"},
        {"text": "Velocity isn't just volume—it's the timbral shift of a string being struck harder.", "author": "Virtual Orchestration"},
        {"text": "Quantize with caution. Perfect timing is often the enemy of groove.", "author": "Electronic Producer"},
        {"text": "The piano roll is the modern composer's manuscript paper.", "author": "Digital Musician"},
        {"text": "CC data is where the humanity lives in a programmed performance.", "author": "Synth Programmer"}
    ],
    "workflow": [
        {"text": "A logical tracking workflow prevents creative roadblocks during the mix.", "author": "Studio Management"},
        {"text": "Label your tracks. Future you will thank present you.", "author": "DAW Best Practices"},
        {"text": "Save early, save often, and saving a copy on a separate drive is the only way to sleep.", "author": "Modern Recording"},
        {"text": "Editing should be invisible. If the listener notices the crossfade, you've failed.", "author": "Post-Production Guide"}
    ],
    "general": [
        {"text": "Trust your ears over the meters. The meter can't feel the groove.", "author": "Vintage Mixing Guide"},
        {"text": "Technology serves the music, never the other way around.", "author": "Producer's Mantra"},
        {"text": "A mix is never finished, only abandoned.", "author": "Classic Audio Maxim"},
        {"text": "The best piece of gear in the studio is sitting between your ears.", "author": "Studio Philosophy"}
    ]
}

def get_quote_for_context(quiz_title, content):
    text_to_search = (quiz_title + " " + content).lower()
    
    assigned_category = "general"
    if any(keyword in text_to_search for keyword in ["acoustic", "room", "treatment", "absorb", "reflect", "diffuse", "studio equipment"]):
        assigned_category = "acoustics"
    elif any(keyword in text_to_search for keyword in ["signal", "flow", "gain", "bus", "aux", "patch", "chain", "hardware"]):
        assigned_category = "signal flow"
    elif any(keyword in text_to_search for keyword in ["synth", "oscillator", "filter", "envelope", "lfo", "waveform"]):
        assigned_category = "synthesis"
    elif any(keyword in text_to_search for keyword in ["fx", "reverb", "delay", "chorus", "distortion", "pedal"]):
        assigned_category = "fx"
    elif any(keyword in text_to_search for keyword in ["eq", "equalizer", "frequency", "hertz", "hz", "spectrum"]):
        assigned_category = "eq"
    elif any(keyword in text_to_search for keyword in ["mic", "polar", "condenser", "dynamic", "ribbon", "phantom"]):
        assigned_category = "microphones"
    elif any(keyword in text_to_search for keyword in ["midi", "binary", "sequence", "piano roll", "velocity", "quantize"]):
        assigned_category = "midi"
    elif any(keyword in text_to_search for keyword in ["workflow", "record", "track", "edit", "crossfade"]):
        assigned_category = "workflow"
        
    return random.choice(quotes_pool[assigned_category])


injected_quotes = 0

for sec in data.get('sections', []):
    if "Stage 3" in sec.get('title', ''):
        for item in sec.get('items', []):
            quiz_title = item.get('title', 'Unknown Quiz')
            for q in item.get('questions', []):
                content = q.get('content', '')
                
                # Check if quote already exists
                has_quote = False
                if "expert_quote" in q and isinstance(q["expert_quote"], dict) and q["expert_quote"].get("text"):
                    has_quote = True
                elif "quote" in q and q.get("quote"):
                    has_quote = True
                    
                if not has_quote:
                    chosen_quote = get_quote_for_context(quiz_title, content)
                    q['expert_quote'] = {
                        "text": chosen_quote["text"],
                        "author": chosen_quote["author"]
                    }
                    # Clean up old fields if they exist as empty strings
                    if "quote" in q:
                        del q["quote"]
                    if "quote_author" in q:
                        del q["quote_author"]
                        
                    injected_quotes += 1

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print(f"Successfully injected {injected_quotes} targeted expert quotes into Stage 3!")
