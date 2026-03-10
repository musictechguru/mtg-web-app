import json

quotes_data = {
    "1": {"quote": "We perceive frequency as pitch. When you turn an EQ knob, you're literally reshaping the harmonic footprint of the sound.", "author": "Sylvia Massy (Producer/Engineer)"},
    "2": {"quote": "MIDI isn't audio; it's sheet music for robots. It tells the machines exactly what to play, when, and how hard.", "author": "Dave Smith (MIDI Pioneer)"},
    "3": {"quote": "The DAW revolutionized the studio. What used to take a room full of outboard gear and tape machines now lives entirely on your laptop.", "author": "BT (Electronic Music Producer)"},
    "4": {"quote": "Panning is how we create the stereo stage. It gives instruments their own physical space so they don't fight each other in the center.", "author": "Chris Lord-Alge (Mix Engineer)"},
    "5": {"quote": "Reverb is the acoustic signature of a physical space. Without it, music feels unnaturally dry and strictly two-dimensional.", "author": "Abbey Road Studios Engineers"},
    "6": {"quote": "In the 60s, magnetic tape was the canvas. You couldn't just 'undo' a bad take; every splice was a physical commitment.", "author": "George Martin (Producer)"},
    "7": {"quote": "Condensers need Phantom Power to charge their delicate internal backplates, giving them that pristine, airy high-frequency response.", "author": "Neumann Microphones"},
    "8": {"quote": "Balanced cables use phase cancellation to magically erase electronic interference over long cable runs. They are the true nervous system of any pro studio.", "author": "Rupert Neve (Audio Designer)"},
    "9": {"quote": "A DI box takes the high-impedance squeak of an instrument and transforms it into the low-impedance roar a microphone preamp expects.", "author": "Radial Engineering"},
    "10": {"quote": "In subtractive synthesis, the oscillator provides the raw, buzzy waveform, and the filter carves away the frequencies you don't want.", "author": "Bob Moog (Synthesizer Pioneer)"},
    "11": {"quote": "A compressor is an automatic volume knob. It turns down the loudest peaks so the quietest details can finally be heard.", "author": "Andrew Scheps (Mix Engineer)"},
    "12": {"quote": "A noise gate is a bouncer for your audio. It only opens the door when the signal is loud enough, keeping the unwanted hum and bleed out.", "author": "SSL (Solid State Logic)"},
    "13": {"quote": "The ratio determines how aggressively the compressor clamps down. A 4:1 ratio means for every 4dB that crosses the threshold, only 1dB gets out.", "author": "Focusrite Engineering"},
    "14": {"quote": "The Feedback or Regeneration control feeds the delayed signal back into itself. Turn it up for echoing canyons, turn it down for a single slapback.", "author": "Roland / BOSS"},
    "15": {"quote": "An LFO operates below the threshold of human hearing, not as a sound, but as an invisible hand slowly twisting the parameters of your synth.", "author": "Korg Engineering"},
    "16": {"quote": "The Red Book standard of 44.1kHz and 16-bit was mathematically chosen to slightly exceed the limits of human hearing and dynamic range limits.", "author": "Sony / Philips"},
    "17": {"quote": "Velocity in MIDI spans from 0 to 127. It captures the nuance of human emotion—how hard or softly a player struck the key.", "author": "Sequential Circuits"},
    "18": {"quote": "Get closer to a directional mic, and the bass response explodes. Broadcasters love it for that deep voice, but it can turn an acoustic guitar to mud.", "author": "Shure Microphones"},
    "19": {"quote": "If two identical audio waves meet exactly 180 degrees out of phase, they destroy each other perfectly, resulting in absolute silence.", "author": "Acoustic Treatment Principles"},
    "20": {"quote": "Masking happens when a loud sound hides a quieter sound occupying the same frequency space. Carving out EQ pockets is how we fix it.", "author": "Pensado's Place"},
    "21": {"quote": "To clear up mud in a kick drum, I often dip around 250Hz. It removes the 'cardboard' boxiness and lets the sub and the click cut through.", "author": "Manny Marroquin (Mix Engineer)"},
    "22": {"quote": "Sidechaining the bass to the kick drum creates that signature pumping effect, forcing the bass to duck out of the way every time the kick hits.", "author": "Daft Punk (Production Technique)"},
    "23": {"quote": "Parallel compression, or 'New York compression', lets you crush a duplicated drum track for explosive sustain while keeping the original transients completely intact.", "author": "Michael Brauer (Mix Engineer)"},
    "24": {"quote": "Mid-Side processing allows you to EQ the phantom center channel independently from the wide stereo information. It's a mastering engineer's secret weapon.", "author": "iZotope Mastering"},
    "25": {"quote": "The Nyquist-Shannon theorem states that to digitally capture a frequency perfectly, your sample rate must be at least twice as fast as that frequency.", "author": "Harry Nyquist"},
    "26": {"quote": "If frequencies exceed half the sample rate, they reflect backward as harsh, unpleasant digital artifacts. That is the dreaded aliasing.", "author": "Lexicon Digital Audio"},
    "27": {"quote": "Dither is randomized noise added when reducing bit-depth. Counter-intuitively, adding this noise preserves tiny details and masks quantization distortion.", "author": "Bob Katz (Mastering Engineer)"},
    "28": {"quote": "Jitter is timing instability in a digital clock. It smears the audio, degrading the stereo image and making the high end sound brittle and harsh.", "author": "Antelope Audio"},
    "29": {"quote": "Convolution reverb uses an 'impulse response'—a digital footprint of a real acoustic space. It allows you to mathematically place your track inside the Taj Mahal.", "author": "Audio Ease (Altiverb)"},
    "30": {"quote": "The Fletcher-Munson curves prove human hearing isn't flat. We are much more sensitive to midrange frequencies than we are to extreme highs and lows, especially at low volumes.", "author": "Psychoacoustics Engineering"}
}

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

for section in data.get('sections', []):
    for quiz in section.get('items', []):
        if quiz.get('title') == 'Initial Diagnostic Assessment':
            for i, q in enumerate(quiz.get('questions', [])):
                q_num = str(i + 1)
                if q_num in quotes_data:
                    q['quote'] = quotes_data[q_num]['quote']
                    q['quote_author'] = quotes_data[q_num]['author']
            print("Injected quotes into Initial Diagnostic Assessment successfully.")
            break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
