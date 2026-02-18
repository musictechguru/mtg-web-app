import json
import os

def fix_vol2_complete():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol2 = next((v for v in data['volumes'] if v['id'] == 'vol2'), None)
    if not vol2: return

    def get_topic(tid):
        for part in vol2['parts']:
            for topic in part['topics']:
                if topic['id'] == tid: return topic
        return None

    # --- Topic 1: GAIN & SIGNAL PATH (v2_t1) ---
    t1 = get_topic('v2_t1')
    if t1:
        print("Fixing Topic 1: Gain & Signal Path")
        qs = t1['levels']['basic']
        
        updates = [
            # Q1: Gain meaning
            ("Gain vs Volume: Gain is input sensitivity (preamp). Volume is output level (fader). Turning up gain changes the tone (adding saturation/noise).", 
             {"text": "Gain is the first decision you make. Make it count.", "author": "Recording 101"}, 
             "/images/svg/preamp_gain.svg", "Gain Knob"),
            
            # Q2: Signal Path Order
            ("The Chain: Source -> Mic -> Preamp -> A/D Converter -> DAW. Memorize this flow. If audio isn't recording, check the chain in this order.", 
             {"text": "The signal path is a river. Follow the water.", "author": "Troubleshooting Rule"}, 
             "/images/svg/recording_signal_flow.svg", "Signal Path"),
             
            # Q3: Preamp function
            ("Preamp Job: To take a tiny electrical signal (mic level) and boost it to a strong signal (line level) without adding too much noise.", 
             {"text": "The preamp is the muscle of the operation.", "author": "Hardware Guide"}, 
             "/images/svg/microphone_preamp.svg", "Preamp Role"),
             
            # Q4: Clipping meaning
            ("Clipping: When the wave hits the digital ceiling (0dBFS). The tops of the wave are sliced off, creating harsh, square-wave distortion.", 
             {"text": "Once you clip, you can't un-clip. The data is gone.", "author": "Digital Truth"}, 
             "/images/svg/clipping_waveform.svg", "Clipping Wave"),
             
            # Q5: Gain/Volume same?
            ("Difference: Gain happens BEFORE the processing/recording. Volume happens AFTER. High gain drives compressors harder; high volume just makes them louder.", 
             {"text": "Drive the input, trim the output.", "author": "Console Workflow"}, 
             "/images/svg/snr_concept.svg", "Gain Stage"),
             
            # Q6: red light
            ("Peak Indicators: Red means 'Over'. In digital, even one sample over 0dB is an error. Yellow/Green is the safe zone.", 
             {"text": "If you see red, back it off.", "author": "Metering Rule"}, 
             "/images/svg/red_light_clipping.svg", "Red Light"),
             
            # Q7: Target level
            ("The Sweet Spot: -18dBFS (Average) to -6dBFS (Peak). This leaves headroom for accidents and keeps the analog gear in its linear range.", 
             {"text": "Record at -18dBFS equals 0VU on analog gear.", "author": "Calibration Standard"}, 
             "/images/svg/headroom_diagram.svg", "Target Levels"),
             
            # Q8: Interface definition
            ("Interface: Your studio hub. It performs the A/D conversion and usually houses your preamps and monitor controls.", 
             {"text": "The interface is the translator between air and code.", "author": "Tech Definition"}, 
             "/images/svg/ad_converter_process.svg", "Interface"),
             
            # Q9: Low gain result
            ("Noise Floor: If you record too quiet, the signal is close to the background hiss. When you normalize it later, you boost the hiss too.", 
             {"text": "Signal Up, Noise Down. That is the game.", "author": "S/N Ratio"}, 
             "/images/svg/snr_concept.svg", "Noise Floor"),
             
            # Q10: Headroom definition
            ("Headroom: The safety gap between your highest peak and the point of failure (clipping). Like driving 10mph under the speed limit.", 
             {"text": "Headroom is freedom from anxiety.", "author": "Live Sound"}, 
             "/images/svg/headroom_diagram.svg", "Headroom Concept")
        ]
        
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs):
                qs[i]['expert_explanation'] = expl
                qs[i]['expert_quote'] = quote
                qs[i]['explanation_image'] = {"src": img_src, "alt": img_alt}

    # --- Topic 2: MICROPHONE TYPES (v2_t2) ---
    t2 = get_topic('v2_t2')
    if t2:
        print("Fixing Topic 2: Microphones")
        qs = t2['levels']['basic']
        
        updates = [
            # Q1: 3 Main types
            ("The Big Three: Dynamic (Moving Coil), Condenser (Capacitor), Ribbon (Aluminium strip). Each transforms sound to electricity differently.", 
             {"text": "Know your tools. Pick the right mic for the job.", "author": "Engineer Handbook"}, 
             "/images/diagram_mics_v2.png", "Mic Types"),
             
            # Q2: Rugged/Live
            ("Dynamic Mics: Built like tanks. No batteries needed. They can handle a screaming vocalist or a snare drum hit without breaking.", 
             {"text": "If you drop a Shure SM58, you worry about the floor, not the mic.", "author": "Roadie Joke"}, 
             "/images/svg/mic_dynamic_construction.svg", "Dynamic Mic"),
             
            # Q3: Phantom Power req
            ("Condenser Needs: They use an electrically charged plate (capacitor) to detect sound. This charge comes from the +48V phantom power.", 
             {"text": "No 48V, no sound on a condenser.", "author": "Fact"}, 
             "/images/svg/mic_condenser_construction.svg", "Condenser Circuit"),
             
            # Q4: Voltage
            ("Phantom Power: Standardized at +48 Volts DC. It travels up pins 2 and 3 of the XLR cable.", 
             {"text": "Check your switches. 48V can surprise you.", "author": "Safety"}, 
             "/images/svg/signal_chain_basic.svg", "48V Power"),
             
            # Q5: Ribbon damage
            ("Ribbon Danger: Old ribbon mics (and some new ones) can be destroyed by 48V if the cable is miswired (patch bay short). Turn it off to be safe!", 
             {"text": "Save a ribbon, check the phantom.", "author": "Vintage Gear"}, 
             "/images/svg/mic_ribbon_construction.svg", "Ribbon Caution"),
             
            # Q6: Sensitivity
            ("Sensitivity: Condensers are very sensitive (light diaphragm). They hear the room tone, the clock ticking, and mouth noises. Dynamics are less sensitive.", 
             {"text": "Condensers hear what you hear. Dynamics hear what they touch.", "author": "Mic Comparison"}, 
             "/images/svg/mic_condenser_construction.svg", "Sensitivity"),
             
            # Q7: SPL
            ("SPL (Sound Pressure Level): Measured in decibels. A kick drum inside is ~140dB SPL. A whisper is 30dB SPL.", 
             {"text": "Respect physics. High SPL needs high handling.", "author": "Acoustics"}, 
             "/images/diagram_clipping_v2.png", "SPL Meter"),
             
            # Q8: Kick drum mic
            ("Kick Mics: Usually large-diaphragm Dynamics (like AKG D112). They can take the massive air pressure and capture the 'thump'.", 
             {"text": "The kick drum is the heartbeat. Capture it cleanly.", "author": "Mixing"}, 
             "/images/svg/mic_dynamic.svg", "Kick Mic"),
             
            # Q9: LDC advantage
            ("Large Diaphragm Condenser (LDC): The studio vocal standard. Big, warm, detailed sound with low self-noise. Flattering on voices.", 
             {"text": "The LDC is the 'Money Mic'.", "author": "Cliche"}, 
             "/images/svg/mic_condenser_construction.svg", "LDC"),
             
            # Q10: Smooth guitar
            ("Ribbon on Amps: Guitar amps can be harsh/fizzy. Ribbons naturally roll off high frequencies, making the amp sound smooth and 'creamy'.", 
             {"text": "A ribbon on a guitar cab is instant classic rock tone.", "author": "Tone Tip"}, 
             "/images/svg/mic_ribbon_construction.svg", "Ribbon Tone")
        ]
        
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs):
                qs[i]['expert_explanation'] = expl
                qs[i]['expert_quote'] = quote
                qs[i]['explanation_image'] = {"src": img_src, "alt": img_alt}

    # --- Topic 3: POLAR PATTERNS (v2_t3) ---
    t3 = get_topic('v2_t3')
    if t3:
        print("Fixing Topic 3: Polar Patterns")
        qs = t3['levels']['basic']
        
        updates = [
            # Q1: Definition
            ("Polar Pattern: The 3D shape of where a microphone 'hears'. Like a flashlight beam—some are wide (Omni), some are focused (Cardioid).", 
             {"text": "Choose the pattern to choose the room sound.", "author": "Recording Art"}, 
             "/images/svg/polar_pattern_cardioid.svg", "Polar Concept"),
             
            # Q2: Omni
            ("Omnidirectional: Hears equally in a sphere (360 degrees). Great for natural sounding choirs or room mics. No proximity effect!", 
             {"text": "Omni connects the source to the space.", "author": "Purist"}, 
             "/images/svg/polar_pattern_omni.svg", "Omni Pattern"),
             
            # Q3: Cardioid name
            ("Cardioid: Greek for 'Heart'. It looks like an inverted heart graph. It hears the front and rejects the back.", 
             {"text": "Cardioid is the workhorse of the stage.", "author": "Live Sound"}, 
             "/images/svg/polar_pattern_cardioid.svg", "Heart Shape"),
             
            # Q4: Rejection
            ("Rear Rejection: Cardioid mics interpret sound from 180 degrees (behind) as 'off'. This is where you point the monitor speaker to avoid feedback.", 
             {"text": "The null point is your best friend.", "author": "Feedback Control"}, 
             "/images/svg/polar_pattern_cardioid.svg", "Null Point"),
             
            # Q5: Omni isolation?
            ("Omni Isolation: Terrible. It hears everything, including the drummer next door. Use it when you WANT leakage or room tone.", 
             {"text": "Don't use Omni if you want separation.", "author": "Rule of Thumb"}, 
             "/images/svg/polar_pattern_omni.svg", "Omni Leakage"),
             
            # Q6: Figure 8
            ("Bidirectional (Fig-8): Hears front and back, but is completely deaf at the sides (90 and 270 degrees). Used in Blumlein and Mid-Side.", 
             {"text": "Figure-8 has the deepest side rejection of any pattern.", "author": "Tech Fact"}, 
             "/images/svg/polar_pattern_figure8.svg", "Figure 8"),
             
            # Q7: Live vocal
            ("Live Choice: Cardioid. Why? Because you can aim it at the singer and away from the loud drums and monitors.", 
             {"text": "Pattern control is feedback control.", "author": "Monitor Engineer"}, 
             "/images/svg/polar_pattern_cardioid.svg", "Live Cardioid"),
             
            # Q8: Shotgun
            ("Shotgun (Lobar): Extremely directional. Like a telescope for sound. Used on film sets to capture dialogue from a distance.", 
             {"text": "Reach out and touch the sound.", "author": "Boom Op"}, 
             "/images/svg/polar_pattern_supercardioid.svg", "Shotgun Narrow"),
             
            # Q9: Off Axis
            ("Off-Axis Coloration: Sound entering from the side (90 deg) is quieter (-6dB) and often duller. Mics sound best 'on-axis' (straight on).", 
             {"text": "Coloration isn't always bad, but it is always there.", "author": "Physics"}, 
             "/images/svg/polar_pattern_cardioid.svg", "Off Axis"),
             
            # Q10: Noisy place
            ("Noisy Room? Use Cardioid or Hypercardioid. Build a wall of rejection against the noise.", 
             {"text": "Narrow the focus to clean the track.", "author": "Cleanup Tip"}, 
             "/images/svg/polar_pattern_supercardioid.svg", "High Rejection")
        ]
        
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs):
                qs[i]['expert_explanation'] = expl
                qs[i]['expert_quote'] = quote
                qs[i]['explanation_image'] = {"src": img_src, "alt": img_alt}

    # --- Topic 5: DRUMS (v2_t5) ---
    t5 = get_topic('v2_t5')
    if t5:
        print("Fixing Topic 5: Drums")
        qs = t5['levels']['basic']
        
        updates = [
            # Q1: Snare mic
            ("Snare Standard: Shure SM57. It has a 'presence peak' around 5kHz that makes the snare crack cut through guitars.", 
             {"text": "The 57 on snare is the sound of rock and roll.", "author": "Producer Legend"}, 
             "/images/explanations/mic_placement_snare.png", "SM57 Snare"),
             
            # Q2: Snare Pos
            ("Placement: Over the rim, 1-2 inches up, pointing at the center. Rim shots get attack; center hits get body.", 
             {"text": "Mind the stick hits! Don't put the mic where the drummer plays.", "author": "Safety"}, 
             "/images/explanations/mic_placement_snare.png", "Snare Angle"),
             
            # Q3: Kick In
            ("Kick In: Captures the 'Click' or attack. Usually a dynamic mic placed inside the hole, close to the beater.", 
             {"text": "Inside for attack, outside for boom.", "author": "Kick Strategy"}, 
             "/images/svg/mic_dynamic.svg", "Kick Inside"),
             
            # Q4: Kick head
            ("Front Head: You don't HAVE to cut a hole. A solid head sounds boomier (jazz). A hole creates a punchier, drier sound (rock/pop).", 
             {"text": "The hole is a port. It changes the resonance.", "author": "Drum Tuning"}, 
             "/images/explanations/mic_placement_snare.png", "Kick Port"),
             
            # Q5: Overheads
            ("Overheads: They capture the cymbals AND the whole kit image. Condensers (SDC) are preferred for their fast transient response.", 
             {"text": "The overheads are the main picture; close mics are just spot-lights.", "author": "Mixing Philosophy"}, 
             "/images/svg/mic_condenser_construction.svg", "Overhead SDC"),
             
            # Q6: OH Height
            ("Height: Too low = unbalanced cymbals. Too high = too much room. 3-4 feet is a good starting point.", 
             {"text": "Check phase with the snare mic.", "author": "Phase Tip"}, 
             "/images/explanations/mic_placement_snare.png", "OH Height"),
             
            # Q7: Hi-hat
            ("Hi-Hat: Point AWAY from the snare. Use a hypercardioid if possible to reject the loud snare drum next to it.", 
             {"text": "Bleed is the enemy of the hi-hat mic.", "author": "Isolation"}, 
             "/images/explanations/mic_placement_snare.png", "Hat Isolation"),
             
            # Q8: Toms
            ("Toms: Dynamic mics (like Sennheiser e604) clipped to rims. Aim at center for attack. Watch out for cymbal bleed!", 
             {"text": "Gate the toms to kill the rumble.", "author": "Mixing Tip"}, 
             "/images/explanations/mic_placement_snare.png", "Tom Clip"),
             
            # Q9: Snare Bottom
            ("Snare Bottom: Captures the 'fizz' of the snare wires. Essential for funk/ghost notes. Usually bright, so don't EQ it too harshly.", 
             {"text": "Top provides the body. Bottom provides the zing.", "author": "Snare Blend"}, 
             "/images/explanations/mic_placement_snare.png", "Snare Bottom"),
             
            # Q10: Top/Bottom Phase
            ("Phase Flip: ESSENTIAL. The top skin moves down; the bottom skin moves down. From the mic's perspective, they constitute opposite motions. Flip the polarity on the bottom mic.", 
             {"text": "If you don't flip the bottom snare, you lose all the bass.", "author": "Physics Fact"}, 
             "/images/explanations/mic_placement_snare.png", "Phase Flip")
        ]
        
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs):
                qs[i]['expert_explanation'] = expl
                qs[i]['expert_quote'] = quote
                qs[i]['explanation_image'] = {"src": img_src, "alt": img_alt}

    # --- Topic 6: STRINGS (v2_t6) ---
    t6 = get_topic('v2_t6')
    if t6:
        print("Fixing Topic 6: Strings")
        qs = t6['levels']['basic']
        
        updates = [
            # Q1: Acoustic pos
            ("12th Fret: The sweet spot. Audio from the soundhole is too bass-heavy (boomy). The neck is too thin. The 12th fret blends them perfectly.", 
             {"text": "Avoid the soundhole. It's a bass trap.", "author": "Acoustic Rule"}, 
             "/images/explanations/mic_placement_acoustic.png", "12th Fret"),
             
            # Q2: Acoustic mic type
            ("Condenser Choice: Acoustics have fast transients (strumming) and high-end sparkle. Condensers capture this best.", 
             {"text": "Sparkle lives in the transient response.", "author": "Tone"}, 
             "/images/svg/mic_condenser_construction.svg", "Condenser for Acoustic"),
             
            # Q3: Soundhole
            ("Soundhole Myth: It looks logical, but putting a mic there sounds like recording inside a bucket. Huge, muddy resonance. Avoid.", 
             {"text": "Don't look into the eye of the storm.", "author": "Placement Metaphor"}, 
             "/images/explanations/mic_placement_acoustic.png", "Soundhole Boomy"),
             
            # Q4: Amp mic
            ("Amp Standard: Shure SM57. It rolls off the extreme low end and emphasizes the mid-range 'bite' of the guitar.", 
             {"text": "The sound of rock is an SM57 touching the grill cloth.", "author": "History"}, 
             "/images/svg/mic_dynamic.svg", "Amp Mic"),
             
            # Q5: Brightest amp pos
            ("Center Cone (Cap): The speaker is brightest at the very center. As you move to the edge of the cone, the sound gets darker/warmer.", 
             {"text": "Center for bite, Edge for warmth.", "author": "Amp EQ"}, 
             "/images/explanations/mic_placement_acoustic.png", "Speaker Cap"),
             
            # Q6: Off-axis amp
            ("Off-Axis: Angling the mic 45 degrees rolls off the sharp 'fizz' of high gain amps. Great for smoothing out distorted metal guitars.", 
             {"text": "Angle plays with phase and tone.", "author": "Technique"}, 
             "/images/explanations/mic_placement_acoustic.png", "Off Axis Amp"),
             
            # Q7: Acoustic distance
            ("Distance: 6-12 inches. Close enough for intimacy and bass (proximity), far enough to let the wood resonate.", 
             {"text": "Give the instrument air to breathe.", "author": "Natural Sound"}, 
             "/images/explanations/mic_placement_acoustic.png", "Mic Distance"),
             
            # Q8: Ribbon on amp
            ("Ribbon Smoothness: Digital recording can be harsh. Ribbons are naturally dark and smooth, taming the 'digital fizz' of modern amps.", 
             {"text": "Ribbons make amps sound like they do in the room.", "author": "Realism"}, 
             "/images/svg/mic_ribbon_construction.svg", "Ribbon Amp"),
             
            # Q9: Upright bass
            ("Upright Bass: Aim at the bridge or f-hole from 1-2 feet. We want the pluck (fingers) and the growl (body).", 
             {"text": "Bass waves are long. Give them space to form.", "author": "Physics"}, 
             "/images/explanations/mic_placement_acoustic.png", "Upright Bass"),
             
            # Q10: Violin
            ("Violin: Mic from above, 2-3 feet away, pointing down at the f-holes. Close micing a violin sounds like a scratchy saw.", 
             {"text": "Distance turns scratching into singing.", "author": "Classical Tip"}, 
             "/images/explanations/mic_placement_acoustic.png", "Violin Overhead")
        ]
        
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs):
                qs[i]['expert_explanation'] = expl
                qs[i]['expert_quote'] = quote
                qs[i]['explanation_image'] = {"src": img_src, "alt": img_alt}

    # --- Topic 10: ADVANCED STEREO (v2_t10) ---
    t10 = get_topic('v2_t10')
    if t10:
        print("Fixing Topic 10: Stereo")
        qs = t10['levels']['basic']
        
        updates = [
            # Q1: XY definition
            ("X/Y Technique: Coincident Pair. Two Cardioid mics, capsules touching, angled at 90 degrees. Captures a clear center image.", 
             {"text": "X/Y is the 'safe' stereo. It always works.", "author": "Stereo Basics"}, 
             "/images/svg/stereo_xy_diagram.svg", "XY Setup"),
             
            # Q2: XY advantage
            ("Phase Coherent: Because the capsules are in the same spot, sound arrives at the same time. No time delay = No phase cancellation in Mono.", 
             {"text": "Mono-compatible means radio-ready.", "author": "Broadcast"}, 
             "/images/diagram_nyquist_v2.png", "Phase Coherence"),
             
            # Q3: MS false
            ("M/S Mics: Uses one Cardioid (Mid) and one Figure-8 (Side). NOT two cardioids. That's X/Y or ORTF.", 
             {"text": "Know your polar patterns for M/S.", "author": "Advanced Tech"}, 
             "/images/diagram_mid_side_v2.png", "MS Mics"),
             
            # Q4: MS stand for
            ("Mid-Side: 'Mid' records the direct center (Mono). 'Side' records the stereo width. You can automate the width during the mix!", 
             {"text": "M/S gives you control AFTER recording.", "author": "Production Magic"}, 
             "/images/diagram_mid_side_v2.png", "Mid Side"),
             
            # Q5: Spaced Pair
            ("Spaced Pair (A/B): Mics placed apart (e.g., 3-10 feet). Relies on 'Time of Arrival' differences. Creates a huge, wide soundstage.", 
             {"text": "Width comes from time differences.", "author": "Psychoacoustics"}, 
             "/images/svg/stereo_field.svg", "Spaced Pair"),
             
            # Q6: Widest?
            ("Width King: Spaced Pair (A/B) sounds the widest. However, it can have a 'hole in the middle' if mics are too far apart.", 
             {"text": "Wide is good. Hollow is bad.", "author": "Mixing Warning"}, 
             "/images/svg/stereo_field.svg", "Wide Image"),
             
            # Q7: ORTF
            ("ORTF: French standard. Two Cardiods, 17cm apart (ear distance), 110 degrees. Combines X/Y focus with Spaced Pair width.", 
             {"text": "ORTF sounds like being there.", "author": "Naturalism"}, 
             "/images/svg/polar_pattern_cardioid.svg", "ORTF Angle"),
             
            # Q8: Blumlein
            ("Blumlein Pair: Two Figure-8 mics crossed at 90 degrees. Captures full 360-degree room ambience. Requires a great sounding room.", 
             {"text": "Alan Blumlein invented stereo in the 1930s.", "author": "History"}, 
             "/images/svg/polar_pattern_figure8.svg", "Blumlein Crossed"),
             
            # Q9: Decca Tree
            ("Decca Tree: 3 Omni mics in a 'T' shape. Used high above conductors to record orchestras. Provides a massive, cohesive cinematic wall of sound.", 
             {"text": "The Decca Tree is the sound of Hollywood.", "author": "Film Score"}, 
             "/images/svg/polar_pattern_omni.svg", "Decca Tree"),
             
            # Q10: Binaural
            ("Binaural: Recording with a dummy head. It captures the shadowing effect of the human head and ears. only works on headphones.", 
             {"text": "3D audio before VR existed.", "author": "Immersive Audio"}, 
             "/images/svg/stereo_field.svg", "Binaural Head")
        ]
        
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs):
                qs[i]['expert_explanation'] = expl
                qs[i]['expert_quote'] = quote
                qs[i]['explanation_image'] = {"src": img_src, "alt": img_alt}

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Topics 1, 2, 3, 5, 6, 10.")

if __name__ == "__main__":
    fix_vol2_complete()
