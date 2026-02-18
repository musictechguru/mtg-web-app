import json

def fix_vol1_mismatches():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol1 = next((v for v in data['volumes'] if v['id'] == 'vol1'), None)
    if not vol1: return

    # Helper to find topic
    def get_topic(tid):
        for part in vol1['parts']:
            for topic in part['topics']:
                if topic['id'] == tid:
                    return topic
        return None

    # --- Topic 9: Audio Interfaces (v1_t9) ---
    t9 = get_topic('v1_t9')
    if t9:
        print("Fixing Topic 9: Audio Interfaces")
        qs = t9['levels']['basic']
        
        # Q1: Interface connects...
        if len(qs) > 0:
            qs[0]['expert_explanation'] = "Audio Interface: The bridge between analog and digital. It contains Preamps (to boost mics) and Converters (A/D and D/A) to translate electricity into computer code."
            qs[0]['expert_quote'] = {"text": "The interface is the heart of the modern studio.", "author": "Sound on Sound"}
            qs[0]['explanation_image'] = {"src": "/images/svg/signal_chain_basic.svg", "alt": "Interface Position"}

        # Q2: Main functions... (A/D D/A)
        if len(qs) > 1:
            qs[1]['expert_explanation'] = "Conversion: It converts your voice (Analog) to files (Digital) so you can edit it, then back to Analog so you can hear it through speakers."
            qs[1]['expert_quote'] = {"text": "Conversion quality defines the clarity of your capture.", "author": "Digital Basics"}
            qs[1]['explanation_image'] = {"src": "/images/svg/ad_converter_process.svg", "alt": "A/D Process"}

        # Q3: Preamp count...
        if len(qs) > 2:
            qs[2]['expert_explanation'] = "Input Count: The number of preamps determines how many mics you can record at once. A drum kit might need 8; a vocalist only needs 1."
            qs[2]['expert_quote'] = {"text": "Buy the channel count you need for your biggest session.", "author": "Buying Advice"}
            qs[2]['explanation_image'] = {"src": "/images/svg/microphone_preamp.svg", "alt": "Preamp Inputs"}

        # Q4: Bit depth... (24-bit)
        if len(qs) > 3:
            qs[3]['expert_explanation'] = "24-bit Standard: Modern interfaces record at 24-bit. This provides a huge dynamic range (144dB), meaning you don't have to record super hot to avoid noise."
            qs[3]['expert_quote'] = {"text": "Record at 24-bit. Always.", "author": "Industry Standard"}
            qs[3]['explanation_image'] = {"src": "/images/svg/quantization_steps.svg", "alt": "Bit Depth"}

        # Q5: Connections... (USB/Thunderbolt)
        if len(qs) > 4:
            qs[4]['expert_explanation'] = "Data Transfer: USB is standard. Thunderbolt is faster (lower latency). The connection speed dictates how quickly audio can travel in and out."
            qs[4]['expert_quote'] = {"text": "Latency is simply the time it takes data to travel the wire.", "author": "Tech Fact"}
            qs[4]['explanation_image'] = {"src": "/images/diagram_latency_buffer_v2.png", "alt": "Latency"}

        # Q6: Phantom power...
        if len(qs) > 5:
            qs[5]['expert_explanation'] = "Phantom Power (+48V): A button on the interface that sends power down the mic cable. Essential for Condenser mics. useless (and safe) for Dynamic mics."
            qs[5]['expert_quote'] = {"text": "Check your phantom power status before plugging in ribbon mics.", "author": "Safety Tip"}
            qs[5]['explanation_image'] = {"src": "/images/svg/microphone_preamp.svg", "alt": "48V Switch"}

        # Q7: Scarlett 2i2... (2 inputs)
        if len(qs) > 6:
            qs[6]['expert_explanation'] = "2i2 Meaning: 2 Inputs, 2 Outputs. Perfect for a singer-songwriter (Guitar + Vocal). Not enough for a full drum kit."
            qs[6]['expert_quote'] = {"text": "Start small, expand only when you need more inputs.", "author": "Studio Economy"}
            qs[6]['explanation_image'] = {"src": "/images/svg/signal_chain_basic.svg", "alt": "2 Input Concept"}

        # Q8: Higher sample rates...
        if len(qs) > 7:
            qs[7]['expert_explanation'] = "High Sample Rates: 96kHz captures frequencies up to 48kHz. This is beyond human hearing, but can reduce aliasing and improve plugin processing quality."
            qs[7]['expert_quote'] = {"text": "Higher rates = bigger files. Choose wisely.", "author": "Engineering Trade-off"}
            qs[7]['explanation_image'] = {"src": "/images/svg/sample_rate_dots.svg", "alt": "Sample Rate"}

        # Q9: Direct monitoring...
        if len(qs) > 8:
            qs[8]['expert_explanation'] = "Direct Monitor: A switch that sends the mic signal directly to headphones, bypassing the computer. Result? Zero latency listening while recording."
            qs[8]['expert_quote'] = {"text": "Latency kills the vibe. Direct monitoring saves it.", "author": "Performance Science"}
            qs[8]['explanation_image'] = {"src": "/images/diagram_latency_buffer_v2.png", "alt": "Direct Monitoring Path"}

        # Q10: USB 2.0...
        if len(qs) > 9:
            qs[9]['expert_explanation'] = "Bandwidth: USB 2.0 is fast enough for 24+ channels of audio. You don't always need Thunderbolt for simple channel counts."
            qs[9]['expert_quote'] = {"text": "It's not about the cable speed, it's about the driver stability.", "author": "RME Audio"}
            qs[9]['explanation_image'] = {"src": "/images/diagram_file_size_math_v2.png", "alt": "Data Bandwidth"}


    # --- Topic 10: Studio Monitors (v1_t10) ---
    t10 = get_topic('v1_t10')
    if t10:
        print("Fixing Topic 10: Studio Monitors")
        qs = t10['levels']['basic']
        
        # Q1: Monitors designed for...
        if len(qs) > 0:
            qs[0]['expert_explanation'] = "Flat Response: Hi-Fi speakers hype the bass and treble to sound 'nice'. Studio Monitors try to be 'flat' and honest, revealing flaws so you can fix them."
            qs[0]['expert_quote'] = {"text": "If it sounds good on monitors, it sounds good everywhere. If it sounds good on Hi-Fi, it might sound bad elsewhere.", "author": "Mixing Truth"}
            qs[0]['explanation_image'] = {"src": "/images/svg/frequency_spectrum_treble.svg", "alt": "Flat Response"}

        # Q2: Active monitors...
        if len(qs) > 1:
            qs[1]['expert_explanation'] = "Active vs Passive: Active monitors have amplifiers built inside the cabinet, matched perfectly to the speakers. Passive require a separate amp."
            qs[1]['expert_quote'] = {"text": "Active monitors simplified the home studio revolution.", "author": "Tech History"}
            qs[1]['explanation_image'] = {"src": "/images/svg/signal_chain_basic.svg", "alt": "Active Speaker"}

        # Q3: Nearfield placement...
        if len(qs) > 2:
            qs[2]['expert_explanation'] = "Nearfield: Sitting close (3-5ft) means you hear more of the direct sound from the speaker and less of the reflections from the room."
            qs[2]['expert_quote'] = {"text": "Take the room out of the equation by sitting closer.", "author": "Acoustics 101"}
            qs[2]['explanation_image'] = {"src": "/images/svg/stereo_field.svg", "alt": "Nearfield Position"}

        # Q4: Shape...
        if len(qs) > 3:
            qs[3]['expert_explanation'] = "Equilateral Triangle: You and the two speakers should form a perfect triangle with 60-degree angles. This ensures a stable stereo image."
            qs[3]['expert_quote'] = {"text": "Geometry dictates your stereo image.", "author": "Setup Guide"}
            qs[3]['explanation_image'] = {"src": "/images/svg/stereo_field.svg", "alt": "Triangle Setup"}

        # Q5: XLR cables... (Balanced)
        if len(qs) > 4:
            qs[4]['expert_explanation'] = "Balanced Audio: Uses phase cancellation to remove noise. Essential for long cable runs to monitors to avoid buzzing."
            qs[4]['expert_quote'] = {"text": "Balanced lines are the immune system of audio.", "author": "Wiring Pro"}
            qs[4]['explanation_image'] = {"src": "/images/svg/equipment_cable_types_connector_guide.svg", "alt": "XLR Cable"}

        # Q6: XLR pins... (3)
        if len(qs) > 5:
            qs[5]['expert_explanation'] = "Pinout: Pin 1 Ground, Pin 2 Hot (+), Pin 3 Cold (-). The Hot and Cold carry the audio; the Ground creates the shield."
            qs[5]['expert_quote'] = {"text": "XLR: The industry standard since the 1950s.", "author": "Audio History"}
            qs[5]['explanation_image'] = {"src": "/images/svg/equipment_cable_types_connector_guide.svg", "alt": "XLR Pins"}

        # Q7: TRS...
        if len(qs) > 6:
            qs[6]['expert_explanation'] = "TRS: Tip-Ring-Sleeve. It can carry stereo (headphones) OR balanced mono (monitors). Don't confuse it with an Instrument cable (TS)."
            qs[6]['expert_quote'] = {"text": "Look at the rings. One ring = Unbalanced (TS). Two rings = Balanced/Stereo (TRS).", "author": "Identification Tip"}
            qs[6]['explanation_image'] = {"src": "/images/svg/equipment_cable_types_connector_guide.svg", "alt": "TRS vs TS"}

        # Q8: TS cables...
        if len(qs) > 7:
            qs[7]['expert_explanation'] = "Unbalanced (TS): Used for guitars and synths. High impedance. Susceptible to noise if run long distances (>15ft)."
            qs[7]['expert_quote'] = {"text": "Keep unbalanced runs short.", "author": "Signal Integrity"}
            qs[7]['explanation_image'] = {"src": "/images/diagram_di_box_flow_v2.png", "alt": "Unbalanced Line"}

        # Q9: Closed-back headphones...
        if len(qs) > 8:
            qs[8]['expert_explanation'] = "Closed-Back: Sealed earcups. Keep sound IN (so it doesn't bleed into the mic) and outside noise OUT. Perfect for tracking."
            qs[8]['expert_quote'] = {"text": "For the singer: Closed-back. For the mixer: Open-back.", "author": "Headphone Selection"}
            qs[8]['explanation_image'] = {"src": "/images/svg/mic_placement_piano.svg", "alt": "Tracking Setup"}

        # Q10: Yamaha HS5...
        if len(qs) > 9:
            qs[9]['expert_explanation'] = "Industry Standards: The Yamaha HS series (white cone) is famous for being brutally honest. If you can make it sound good on them, it translates anywhere."
            qs[9]['expert_quote'] = {"text": "Honesty over flattery.", "author": "Monitor Choice"}
            qs[9]['explanation_image'] = {"src": "/images/svg/frequency_spectrum_treble.svg", "alt": "Studio Monitor"}


    # --- Topic 11: Mixer Controls (v1_t11) ---
    t11 = get_topic('v1_t11')
    if t11:
        print("Fixing Topic 11: Mixer Controls")
        qs = t11['levels']['basic']
        
        # Q1: Channel strip...
        if len(qs) > 0:
            qs[0]['expert_explanation'] = "Channel Strip: The vertical 'slice' of a mixer. It typically flows top-to-bottom: Gain -> EQ -> Aux -> Pan -> Fader."
            qs[0]['expert_quote'] = {"text": "Learn one strip, learn the whole console.", "author": "Console Wisdom"}
            qs[0]['explanation_image'] = {"src": "/images/svg/signal_chain_basic.svg", "alt": "Channel Strip Flow"}

        # Q2: Input gain/trim...
        if len(qs) > 1:
            qs[1]['expert_explanation'] = "Gain (Trim): The very first control. It amplifies the weak mic signal to a workable line level. Get this wrong, and the rest of the mix suffers."
            qs[1]['expert_quote'] = {"text": "Gain is not Volume. Gain is sensitivity.", "author": "Gain Staging"}
            qs[1]['explanation_image'] = {"src": "/images/svg/preamp_gain.svg", "alt": "Gain Knob"}

        # Q3: Setting input gain...
        if len(qs) > 2:
            qs[2]['expert_explanation'] = "Target Level: Aim for peaks around -12dBFS to -6dBFS. This leaves 'headroom' (safety space) so you don't clip if the singer gets loud."
            qs[2]['expert_quote'] = {"text": "Yellow is the new Red. Stay safe.", "author": "Digital Metering"}
            qs[2]['explanation_image'] = {"src": "/images/svg/headroom_diagram.svg", "alt": "Meter Target"}

        # Q4: Pad switch...
        if len(qs) > 3:
            qs[3]['expert_explanation'] = "Pad: A safety switch that lowers the intense signal of loud sources (like a snare drum) before it hits the preamp, preventing distortion."
            qs[3]['expert_quote'] = {"text": "Use the Pad if the gain knob is at zero and it's still clipping.", "author": "Recording Tip"}
            qs[3]['explanation_image'] = {"src": "/images/svg/microphone_preamp.svg", "alt": "Pad Switch"}

        # Q5: HPF...
        if len(qs) > 4:
            qs[4]['expert_explanation'] = "HPF (High Pass Filter): A switch that cuts low rumble (below 80Hz). Essential for vocals, guitars, and anything that isn't a kick or bass."
            qs[4]['expert_quote'] = {"text": "Filter out the mud before it hits the EQ.", "author": "Mix Prep"}
            qs[4]['explanation_image'] = {"src": "/images/svg/frequency_spectrum_bass.svg", "alt": "HPF Curve"}

        # Q6: Common HPF setting...
        if len(qs) > 5:
            qs[5]['expert_explanation'] = "80-100Hz: This is the standard rumble zone (AC hum, footsteps). Cutting here cleans up the mix headroom significantly."
            qs[5]['expert_quote'] = {"text": "Low end space is expensive. Don't waste it on non-bass instruments.", "author": "Spectrum Management"}
            qs[5]['explanation_image'] = {"src": "/images/svg/frequency_spectrum_bass.svg", "alt": "80Hz Cut"}

        # Q7: Fader controls...
        if len(qs) > 6:
            qs[6]['expert_explanation'] = "Fader: The final volume control for the mix. It's logarithmic, offering fine-tuned control around the 'Unity' (0dB) mark."
            qs[6]['expert_quote'] = {"text": "Mixing is balancing relative levels. The fader is your primary tool.", "author": "Mixing 101"}
            qs[6]['explanation_image'] = {"src": "/images/svg/snr_concept.svg", "alt": "Fader Levels"}

        # Q8: Unity gain...
        if len(qs) > 7:
            qs[7]['expert_explanation'] = "Unity (0): The point on the fader where the signal puts out exactly what it takes in. No boost, no cut. The 'neutral' position."
            qs[7]['expert_quote'] = {"text": "Start your mix with faders at unity and use gain to balance.", "author": "Pro Workflow"}
            qs[7]['explanation_image'] = {"src": "/images/svg/snr_concept.svg", "alt": "Unity Mark"}

        # Q9: Pan control...
        if len(qs) > 8:
            qs[8]['expert_explanation'] = "Pan (Panorama): Moves signal Left or Right. Using Pan creates a 'soundstage', allowing listeners to visualize where musicians are standing."
            qs[8]['expert_quote'] = {"text": "LCR (Left-Center-Right) is the secret to wide, clear mixes.", "author": "Panning Strategy"}
            qs[8]['explanation_image'] = {"src": "/images/svg/stereo_field.svg", "alt": "Pan Pot"}

        # Q10: Solo...
        if len(qs) > 9:
            qs[9]['expert_explanation'] = "Solo (SIP): Solos the track IN PLACE (with panning/FX). Great for critical listening. Beware: PFL Solo monitors the raw input signal instead."
            qs[9]['expert_quote'] = {"text": "Solo is for technical checking. Mixing happens in context.", "author": "Warning"}
            qs[9]['explanation_image'] = {"src": "/images/svg/signal_chain_basic.svg", "alt": "Solo Button"}


    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Topics 9, 10, 11.")

if __name__ == "__main__":
    fix_vol1_mismatches()
