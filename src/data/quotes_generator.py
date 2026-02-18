
import json
import os

QUOTES_DB = {
    # ================= VOLUME 1: FUNDAMENTALS =================
    "Volume 1": {
        "1": {"subject": "AUDIO FUNDAMENTALS", "quotes": [
            {"text": "Sound is physical; audio is electrical. Know the difference.", "author": "Engineering 101"},
            {"text": "We don’t capture sound; we capture a representation of it.", "author": "Philosophy of Audio"},
            {"text": "The transducer is the bridge between the acoustic and electric worlds.", "author": "Tech Fact"},
            {"text": "Trust your ears, but check your meters. Ears can be fooled; meters don’t lie... mostly.", "author": "Studio Wisdom"},
            {"text": "Audio is the art of preserving an emotional moment in time.", "author": "Producer"},
            {"text": "If it sounds good, it is good. But 'why' it sounds good is physics.", "author": "Joe Meek Rule"},
        ]},
        "2": {"subject": "DECIBELS & DYNAMIC RANGE", "quotes": [
             {"text": "The decibel is relative. Always ask: 'Relative to what?'", "author": "Metering Pro"},
             {"text": "6dB is a doubling of amplitude. 10dB is a doubling of perceived loudness.", "author": "Psychoacoustics"},
             {"text": "Silence is the canvas. Noise is the texture.", "author": "Ambient Composer"},
             {"text": "Dynamic range is the distance between the noise floor and the distortion point.", "author": "Technical Definition"},
             {"text": "Don't fight the logarithmic nature of hearing. Work with it.", "author": "Audio Science"},
        ]},
        "3": {"subject": "DIGITAL AUDIO BASICS", "quotes": [
             {"text": "Sample rate captures time. Bit depth captures amplitude.", "author": "Digital Mantra"},
             {"text": "Nyquist governs the speed limit of digital audio.", "author": "Theorem Fact"},
             {"text": "Jitter is the enemy of clarity. Keep your clock stable.", "author": "Clocking Advice"},
             {"text": "There are no steps in the analog waveform until we slice it.", "author": "ADC Concept"},
             {"text": "Aliasing is audio ghosting. Filter it out before it haunts your mix.", "author": "DSP Engineer"},
        ]},
        "4": {"subject": "RECORDING CHAIN", "quotes": [
             {"text": "The chain is: Source -> Room -> Mic -> Preamp -> Converter.", "author": "Signal Flow"},
             {"text": "Garbage in, garbage out. A bad source can't be fixed by a good preamp.", "author": "Golden Rule"},
             {"text": "Short cables, clean power, good clock. The holy trinity of clean recording.", "author": "Setup Tip"},
             {"text": "Every connector is a potential failure point.", "author": "Live Sound Law"},
             {"text": "Understand the path or you'll be lost in the noise.", "author": "Troubleshooting 101"},
        ]},
        "5": {"subject": "GAIN STAGING", "quotes": [
             {"text": "Yellow is the new Red in digital gain staging.", "author": "Modern Mixing"},
             {"text": "Clip once, distort forever.", "author": "Digital Warning"},
             {"text": "Structure your gain so faders can sit at unity.", "author": "Console Workflow"},
             {"text": "Microphone level needs a 60dB boost. Line level needs respect.", "author": "Preamp basics"},
             {"text": "Headroom is freedom.", "author": "Dynamic Range Enthusiast"},
        ]},
        "6": {"subject": "MICROPHONE TECHNIQUES", "quotes": [
             {"text": "The best EQ is moving the microphone.", "author": "Al Schmitt"},
             {"text": "Inches make miles of difference in tone.", "author": "Placement Tip"},
             {"text": "Listening to the room is step one of microphone placement.", "author": "Acoustic Awareness"},
             {"text": "Get it right at the source. Fix it in the mix is a lie.", "author": "Production Truth"},
             {"text": "A great performance on an SM57 beats a bad performance on a U47.", "author": "Gear vs Talent"},
        ]},
        "7": {"subject": "STEREO RECORDING & PHASE", "quotes": [
             {"text": "Phase cancellation is the silent killer of low end.", "author": "Mix Doctor"},
             {"text": "Check mono compatibility constantly.", "author": "Broadcasting Standard"},
             {"text": "Coincident pairs give you image. Spaced pairs give you width.", "author": "Stereo Theory"},
             {"text": "The 3:1 rule isn't magic, it's math.", "author": "Physics Fact"},
             {"text": "Width comes from difference. If L and R are identical, you have mono.", "author": "Spatial Logic"},
        ]},
        "8": {"subject": "RECORDING WORKFLOW", "quotes": [
             {"text": "Red light fever is real. Make the artist comfortable first.", "author": "Producer Tip"},
             {"text": "Label your tracks. Future you will thank present you.", "author": "Organization 101"},
             {"text": "Always be recording. The warm-up is often the best take.", "author": "Session Trick"},
             {"text": "The vibe is more important than the technical perfection.", "author": "Music First"},
             {"text": "Backup your session. Then backup the backup.", "author": "Digital Paranoia"},
        ]},
        # ... Filling gaps for Vol 1
    },
    
    # ================= VOLUME 2: MICROPHONES =================
    "Volume 2": {
        "1": {"subject": "GAIN & SIGNAL PATH", "quotes": [
             {"text": "A preamp needs to be driven, but not over a cliff.", "author": "Analog Drive"},
             {"text": "Impedance matching is the handshake between mic and preamp.", "author": "Tech Info"},
             {"text": "Noise floor rises with gain. It's a trade-off.", "author": "Physics of Electronics"},
             {"text": "The mic preamp is the first color you paint with.", "author": "Tonal Shaping"},
             {"text": "Clean gain is expensive. Dirty gain is cheap.", "author": "Gear Reality"},
        ]},
        "2": {"subject": "MICROPHONE TYPES", "quotes": [
             {"text": "Ribbons are dark, dynamic, and dangerous to treat poorly.", "author": "Ribbon Lover"},
             {"text": "Condensers are fast. They catch the transient before it leaves the instrument.", "author": "Transient Response"},
             {"text": "Dynamics are slow but heavy. They add weight to the sound.", "author": "Drum Sound"},
             {"text": "Electrets have improved, but true condensers still rule the studio.", "author": "Tech Evolution"},
             {"text": "The diaphragm is the eardrum of the recording system.", "author": "Anatomy Analogy"},
        ]},
        "3": {"subject": "POLAR PATTERNS", "quotes": [
             {"text": "Omni is honest. It hears everything, warts and all.", "author": "Acoustic Truth"},
             {"text": "Super-cardioid: Great rejection, but watch the back lobe.", "author": "Live Sound Warning"},
             {"text": "Figure-8 is the only pattern with perfect side rejection.", "author": "Null Point"},
             {"text": "Proximity effect only happens with directional mics.", "author": "Physics Fact"},
             {"text": "Pattern selection is spectral selection.", "author": "Tone Shaping"},
        ]},
        # Topics 4-12 handled by generics or minimal specific
        "5": {"subject": "DRUMS", "quotes": [
             {"text": "The snare is the heartbeat. The kick is the gut punch.", "author": "Rock Mixing"},
             {"text": "Overheads are for cymbals? No, overheads are for the whole kit.", "author": "Glyn Johns Philosophy"},
             {"text": "Phase align your drum mics or lose your punch.", "author": "Technical Necessity"},
             {"text": "Tuning the drums is 80% of the drum sound.", "author": "Session Drummer"},
             {"text": "Room mics turn a drum kit into a drum scound.", "author": "Ambience Tip"},
        ]},
        "7": {"subject": "VOCALS", "quotes": [
             {"text": "The vocal is the king. Everything else is the court.", "author": "Pop Mixing"},
             {"text": "Pop filters are cheaper than fixing plosives.", "author": "Editing Reality"},
             {"text": "Distance controls intimacy.", "author": "Vocal Production"},
             {"text": "A great singer needs no reverb. A bad one needs a lot.", "author": "Old Studio Joke"},
             {"text": "Comfort is key. The mic doesn't matter if the singer is stiff.", "author": "Producer Wisdom"},
        ]}
    },
    
    # ================= VOLUME 3: SYNTHESIS =================
    "Volume 3": {
         "1": {"subject": "SYNTHESIS COMPONENTS", "quotes": [
             {"text": "Voltage Control is the language of analog synths.", "author": "Bob Moog"},
             {"text": "Patches are temporary; signal flow is forever.", "author": "Modular Thought"},
             {"text": "The VCA is the gatekeeper of amplitude.", "author": "Synth Anatomy"},
             {"text": "Don’t memorize patches. Understand the architecture.", "author": "Learning Advice"},
        ]},
        "4": {"subject": "FILTERS", "quotes": [
             {"text": "The ladder filter defined the sound of the 70s.", "author": "Synth History"},
             {"text": "Resonance basically feeds the output back into the input.", "author": "Tech Explainer"},
             {"text": "A self-oscillating filter is an oscillator in disguise.", "author": "Sound Design Trick"},
             {"text": "High pass filters clean the mud. Low pass filters hide the fizz.", "author": "Mixing Synth"},
        ]},
        "5": {"subject": "ENVELOPES", "quotes": [
             {"text": "Plucks need zero attack. Pads need seconds of attack.", "author": "ADSR Rule"},
             {"text": "Sustain is a level, not a time.", "author": "Common Misconception"},
             {"text": "Release is the memory of the note.", "author": "Poetic Synth"},
             {"text": "Inverted envelopes create suction effects.", "author": "Creative Trick"},
        ]},
        "9": {"subject": "WAVETABLE & GRANULAR", "quotes": [
             {"text": "Wavetables let you travel through timbre.", "author": "Digital Synthesis"},
             {"text": "Granular synthesis creates clouds from raindrops.", "author": "Texture Artist"},
             {"text": "Scanning a wavetable adds motion to static waves.", "author": "PPI Mode"},
             {"text": "Grains are tiny samples of time.", "author": "Granular Concept"},
        ]}
    },

    # ================= VOLUME 4: SAMPLING =================
    "Volume 4": {
        "1": {"subject": "SAMPLE EDITING", "quotes": [
             {"text": "Zero-crossing edits prevent the clicks.", "author": "Editing 101"},
             {"text": "Truncate the silence, or your rhythm will drag.", "author": "Drum Programming"},
             {"text": "Normalize with caution. Noise floor rises too.", "author": "Gain Tip"},
             {"text": "A sample is a photograph of sound.", "author": "Metaphor"},
        ]},
        "3": {"subject": "BIT DEPTH", "quotes": [
             {"text": "Bitcrushing is just intentional quantization error.", "author": "Lo-Fi Tech"},
             {"text": "16-bit is enough for delivery. 24-bit is for creation.", "author": "Standard Practice"},
             {"text": "More bits equals more dynamic range, not 'better' frequency response.", "author": "Tech Clarity"},
        ]},
        "6": {"subject": "LOOPING", "quotes": [
             {"text": "Crossfading loops hides the seam.", "author": "Sampler Technique"},
             {"text": "The perfect loop is hypnotic, not repetitive.", "author": "House Music Philosophy"},
             {"text": "Sustain loops turn a short sample into a long instrument.", "author": "Keymapping Tip"},
        ]},
        "8": {"subject": "TIME STRETCHING", "quotes": [
             {"text": "Time-stretching used to sound like robots. Now it sounds like magic.", "author": "Tech Progress"},
             {"text": "Elastic Audio changed the groove forever.", "author": "DAW History"},
             {"text": "Pitch shifting without formant correction sounds like a chipmunk.", "author": "Vocal Effect"},
        ]},
        "9": {"subject": "MIDI", "quotes": [
             {"text": "MIDI is just data. It has no sound of its own.", "author": "Fundamental Truth"},
             {"text": "Quantization kills the human feel. Use percentages.", "author": "Groove Doctor"},
             {"text": "Velocity is the difference between a machine and a drummer.", "author": "Programming Tip"},
             {"text": "127 is not the only velocity.", "author": "Dynamic Advice"},
        ]}
    },

    # ================= VOLUME 5: DYNAMICS =================
    "Volume 5": {
        "1": {"subject": "COMPRESSION", "quotes": [
             {"text": "Compression is the glue that holds a mix together.", "author": "Mixing Mantra"},
             {"text": "Don't compress to fix a bad performance.", "author": "Studio Rule"},
             {"text": "If you can hear the compressor working, you might be using too much.", "author": "Transparency Tip"},
             {"text": "Parallel compression is the best of both worlds: punch and body.", "author": "NY Compression"},
             {"text": "Compression brings up the room tone. Be careful.", "author": "Noise Warning"},
        ]},
        "5": {"subject": "KNEE & MAKEUP", "quotes": [
             {"text": "Soft knee is musical. Hard knee is aggressive.", "author": "Style Choice"},
             {"text": "Makeup gain should equal gain reduction. Keep levels consistent.", "author": "A/B Testing"},
             {"text": "Auto-makeup gain is often a liar. Do it manually.", "author": "Pro Tip"},
        ]},
        "6": {"subject": "COMPRESSOR TYPES", "quotes": [
             {"text": "Opto represents the slow, musical hug of compression.", "author": "LA-2A Fan"},
             {"text": "FET is the lightning fast grab.", "author": "1176 Fan"},
             {"text": "VCA is clean, snappy, and reliable.", "author": "SSL Fan"},
             {"text": "Tube/Vari-Mu is creamy and thick.", "author": "Fairchild Fan"},
        ]},
        "11": {"subject": "GATES", "quotes": [
             {"text": "A gate should open fast and close smoothly.", "author": "Gate Settings"},
             {"text": "Don't gate the life out of the drums. Let them breathe.", "author": "Natural Sound"},
             {"text": "Lookahead gating prevents cutting off the transient.", "author": "Digital Trick"},
        ]}
    },

    # ================= VOLUME 6: EQ =================
    "Volume 6": {
        "1": {"subject": "EQ FUNDAMENTALS", "quotes": [
             {"text": "You can't boost what isn't there.", "author": "Physics of Sound"},
             {"text": "Cut narrow, boost wide.", "author": "EQ Golden Rule"},
             {"text": "EQ is about balance, not just tone.", "author": "Mixing Concept"},
             {"text": "The mute button is the most powerful EQ.", "author": "Arrangement Tip"},
        ]},
        "4": {"subject": "PARAMETRIC EQ", "quotes": [
             {"text": "Q implies Quality, but it stands for Quotient of bandwidth.", "author": "Tech Etymology"},
             {"text": "Surgical EQ requires a high Q.", "author": "Cleaning Tip"},
             {"text": "Parametric gives you control. Graphic gives you speed.", "author": "Tool Selection"},
        ]},
        "7": {"subject": "SUBTRACTIVE EQ", "quotes": [
             {"text": "Mud lives in the 200-400Hz range.", "author": "Frequency Fact"},
             {"text": "High pass everything... except the kick and bass.", "author": "Modern Mixing"},
             {"text": "Removing the mask reveals the face.", "author": "Unmasking Analogy"},
             {"text": "Subtractive EQ creates headroom.", "author": "Gain Benefit"},
        ]},
        "10": {"subject": "STEREO & PANNING", "quotes": [
             {"text": "LCR panning forces you to make bold decisions.", "author": "Chris Lord-Alge Style"},
             {"text": "Balance is key. Don't tip the boat.", "author": "Mixing Analogy"},
             {"text": "Panning is the X-axis. EQ is the Y-axis. Volume is the Z-axis.", "author": "3D Mixing"},
        ]}
    },

    # ================= VOLUME 7: FX =================
    "Volume 7": {
        "1": {"subject": "REVERB", "quotes": [
             {"text": "Reverb pushes things back. Dryness brings them forward.", "author": "Depth Perception"},
             {"text": "Contrast creates dimension. Use dry sounds to make wet sounds wetter.", "author": "Mix Strategy"},
             {"text": "Don't wash out the groove with too much tail.", "author": "Rhythm Warning"},
             {"text": "EQ your reverb returns. They don't need sub-bass.", "author": "Clean Mix Tip"},
        ]},
        "2": {"subject": "PRE-DELAY", "quotes": [
             {"text": "Pre-delay separates the singer from the wall.", "author": "Visual Analogy"},
             {"text": "Longer pre-delay makes the room feel bigger.", "author": "Psychoacoustics"},
             {"text": "Time the pre-delay to the tempo for a rhythmic breathing effect.", "author": "Groove Tip"},
        ]},
        "10": {"subject": "DELAY", "quotes": [
             {"text": "Delay is often better than reverb. It adds space without the clutter.", "author": "Mix Alternative"},
             {"text": "Slapback is the sound of the 50s.", "author": "Genre History"},
             {"text": "Ping-pong delay widens the stereo image instantly.", "author": "Width Trick"},
             {"text": "Feedback is dangerous. Taming it creates art.", "author": "Dub Technique"},
        ]}
    },

    # ================= VOLUME 8: MASTERING =================
    "Volume 8": {
        "1": {"subject": "MASTERING BASICS", "quotes": [
             {"text": "Mastering is the final quality control.", "author": "QC Mindset"},
             {"text": "Do no harm.", "author": "Mastering Hippocratic Oath"},
             {"text": "Translation is the goal. It must sound good in a car and on a phone.", "author": "Playback Reality"},
             {"text": "Your room is your most important tool in mastering.", "author": "Acoustic Truth"},
        ]},
        "4": {"subject": "LOUDNESS", "quotes": [
             {"text": "-14 LUFS is a target, not a law.", "author": "Streaming Advice"},
             {"text": "Loudness War is over. Dynamic Range won.", "author": "Modern Perspective"},
             {"text": "Perceived loudness comes from density, not just peaks.", "author": "Density Concept"},
        ]},
        "7": {"subject": "SIGNAL FLOW", "quotes": [
             {"text": "EQ before compression corrects the balance. EQ after shapes the tone.", "author": "Chain Order"},
             {"text": "Limiter is always last.", "author": "Safety First"},
             {"text": "Mid-Side processing is the secret weapon of mastering.", "author": "MS Technique"},
        ]}
    },

    # ================= VOLUME 9: ACOUSTICS =================
    "Volume 9": {
        "1": {"subject": "SOUND WAVES", "quotes": [
             {"text": "Sound is slow. Light is fast. That's why we see lightning before thunder.", "author": "Physics Refresher"},
             {"text": "Low frequencies are omnidirectional. High frequencies beam.", "author": "Dispersion Fact"},
             {"text": "Wavelength determines interaction.", "author": "Acoustic Law"},
        ]},
        "3": {"subject": "REFLECTION & ABSORPTION", "quotes": [
             {"text": "Parallel walls are the enemy. They breed flutter echo.", "author": "Room Design"},
             {"text": "Bass builds up in corners. Treat them first.", "author": "Bass Trap Rule"},
             {"text": "Diffusion makes a small room sound big.", "author": "Diffuser Benefit"},
             {"text": "Foam is not soundproofing. Mass is soundproofing.", "author": "Construction Misconception"},
             {"text": "Glass is an acoustic mirror. It reflects everything harshly.", "author": "Material Science"},
        ]},
        "10": {"subject": "MONITORING", "quotes": [
             {"text": "The equilateral triangle is the starting point for monitoring.", "author": "Setup Standard"},
             {"text": "Decouple your monitors. Don't vibrate the desk.", "author": "Isolation Tip"},
             {"text": "Your ears adapt to the room. Take breaks.", "author": "Ear Fatigue"},
        ]}
    },

    # ================= VOLUME 10: EQUIPMENT =================
    "Volume 10": {
        "1": {"subject": "INTERFACES", "quotes": [
             {"text": "Latency is the delay between playing and hearing. Keep it low.", "author": "Performance Killer"},
             {"text": "Converters matter, but the performance matters more.", "author": "Priority Check"},
             {"text": "Direct Monitoring is zero-latency cheating.", "author": "Workflow Tip"},
        ]},
        "2": {"subject": "CONTROLLERS", "quotes": [
             {"text": "A weighted keybed inspires a different performance than a synth action.", "author": "Player Feel"},
             {"text": "Map your knobs. Mouse clicking kills the vibe.", "author": "Tactile Advice"},
             {"text": "Pads are for rhythm. Keys are for melody.", "author": "Instrument Choice"},
        ]},
        "4": {"subject": "CABLES", "quotes": [
             {"text": "Balanced cables run long. Unbalanced cables run short.", "author": "Cable Rule"},
             {"text": "Gold connectors don't sound better, they just don't corrode.", "author": "Myth busting"},
             {"text": "Coiling cables correctly saves their life. Learn the over-under.", "author": "Roadie Wisdom"},
        ]}
    }
}

def generate_full_db():
    print("Generating full quote database...")
    
    # Load Existing
    existing_path = "found_quotes.json"
    full_db = {}
    
    try:
        with open(existing_path, 'r', encoding='utf-8') as f:
            full_db = json.load(f)
    except:
        print("No existing DB found, starting fresh.")

    # Merge New Qs
    for vol, subjects in QUOTES_DB.items():
        if vol not in full_db:
            full_db[vol] = {}
        
        for topic, data in subjects.items():
            if topic not in full_db[vol]:
                full_db[vol][topic] = {"subject": data["subject"], "quotes": []}
            
            # Add new quotes avoiding duplicates
            existing_texts = [q["text"] for q in full_db[vol][topic]["quotes"]]
            
            for new_q in data["quotes"]:
                if new_q["text"] not in existing_texts:
                    full_db[vol][topic]["quotes"].append(new_q)
                    
    # Generate Generics for Missing Topics (1-12)
    for i in range(1, 11): # Vol 1-10
        vol_key = f"Volume {i}"
        if vol_key not in full_db:
            full_db[vol_key] = {}
            
        for t in range(1, 13): # Topic 1-12
            t_key = str(t)
            if t_key not in full_db[vol_key]:
                # Create generic entry
                full_db[vol_key][t_key] = {
                    "subject": f"TOPIC {t}",
                    "quotes": []
                }
            
            # Ensure at least 5 quotes
            current_count = len(full_db[vol_key][t_key]["quotes"])
            if current_count < 5:
                needed = 5 - current_count
                # Add generics
                full_db[vol_key][t_key]["quotes"].append({
                    "text": f"Mastering this concept is key to professional results in {vol_key}.",
                    "author": "Education Team"
                })
                full_db[vol_key][t_key]["quotes"].append({
                    "text": "Pay attention to the details here; they make the difference.",
                    "author": "Study Guide"
                })
                full_db[vol_key][t_key]["quotes"].append({
                    "text": "Every great producer understands these fundamentals.",
                    "author": "Industry Standard"
                })
                full_db[vol_key][t_key]["quotes"].append({
                    "text": "This topic connects directly to better mixing and recording.",
                    "author": "Course Notes"
                })
                full_db[vol_key][t_key]["quotes"].append({
                    "text": "Don't just memorize terms. Understand the physics.",
                    "author": "Deep Learning"
                })


    with open(existing_path, 'w', encoding='utf-8') as f:
        json.dump(full_db, f, indent=4)
    
    print("Updated found_quotes.json with massive new library.")

if __name__ == "__main__":
    generate_full_db()
