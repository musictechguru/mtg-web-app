
import re
import os
import json

# Input Files
SEARCH_DIR = "../../public/Quiz_questions/Volume 2"
FILES_TO_PROCESS = [
    os.path.join(SEARCH_DIR, "Microphone_Basic_Quiz_120_Questions.md"),
    os.path.join(SEARCH_DIR, "Microphone_Intermediate_Quiz_120_Questions.md")
]

# Common Images (Volume 1 Legacy)
IMG_DBFS = "/images/svg/dbfs_meter.svg"
IMG_HEADROOM = "/images/svg/headroom_diagram.svg"
IMG_CLIPPING = "/images/diagram_clipping_v2.png"
IMG_CHAIN = "/images/svg/signal_chain_basic.svg"
IMG_SNR = "/images/svg/snr_concept.svg"
IMG_PROXIMITY = "/images/svg/proximity_graph.svg"
IMG_3TO1 = "/images/svg/3_to_1_rule_diagram.svg"
IMG_PHASEWARN = "/images/svg/phase_cancellation.svg"
IMG_ROOM = "/images/svg/direct_vs_room.svg"
IMG_FLIP = "/images/svg/polarity_invert.svg"

# NEW Volume 2 Images
IMG_MIC_DYN = "/images/svg/mic_dynamic_construction.svg"
IMG_MIC_COND = "/images/svg/mic_condenser_construction.svg"
IMG_MIC_RIB = "/images/svg/mic_ribbon_construction.svg"
IMG_OMNI = "/images/svg/polar_pattern_omni.svg"
IMG_CARDIOID = "/images/svg/polar_pattern_cardioid.svg"
IMG_FIG8 = "/images/svg/polar_pattern_figure8.svg"
IMG_SHOTGUN = "/images/svg/polar_pattern_supercardioid.svg"
IMG_SENSITIVITY = "/images/svg/mic_sensitivity_graph.svg"
IMG_POP = "/images/svg/mic_pop_filter_setup.svg"
IMG_OFFAXIS = "/images/svg/mic_off_axis_coloration.svg"
IMG_SHOCK = "/images/svg/mic_shock_mount_diagram.svg"
IMG_XLR = "/images/svg/cable_xlr_pinout.svg"
IMG_MICS = "/images/diagram_mics_v2.png" 

# Instrument Micing Images
IMG_KICK = "/images/drum_kick_micing_1770032490952.png"
IMG_SNARE = "/images/svg/mic_placement_snare.svg"
IMG_GTR_AC = "/images/svg/mic_placement_acoustic_guitar.svg"
IMG_PIANO_GR = "/images/svg/mic_placement_piano.svg"
IMG_PIANO_UP = "/images/piano_upright_micing_1770033134712.png"
IMG_SAX = "/images/sax_micing_1770033437547.png"
IMG_VIOLIN = "/images/violin_micing_1770033259660.png"

# Stereo
IMG_XY = "/images/svg/stereo_xy_diagram.svg"
IMG_ORTF = "/images/svg/stereo_ortf_diagram.svg"
IMG_BLUMLEIN = "/images/svg/stereo_blumlein_diagram.svg"
IMG_DECCA = "/images/stereo_decca_tree.png"
IMG_MS = "/images/svg/stereo_mid_side_diagram.svg"
IMG_SPACED = "/images/svg/stereo_spaced_pair_diagram.svg"

# Basic Level Manual Data (High Priority for Basic)
BASIC_DATA = {
    "1": {
        "1": { "expl": "Gain is the input sensitivity tuning. It determines how much we amplify the tiny signal coming from the microphone before it hits the rest of the circuit.", "img": IMG_CHAIN, "quote": "Gain is the first and most important decision. - Unknown" },
        "2": { "expl": "The signal must flow from the source (Mic) to the Preamp (Gain) to the Converter (Interface) and finally to the Storage (Computer).", "img": IMG_CHAIN, "quote": "Follow the signal flow to find the problem. - Unknown" },
        "3": { "expl": "Microphones output 'Mic Level', which is very quiet. Preamps boost this to 'Line Level' so the rest of the gear can work with it.", "img": "/images/diagram_di_box_flow_v2.png", "quote": "The preamp activates the potential of the mic. - Unknown" },
        "4": { "expl": "Clipping is permanent distortion caused by exceeding the maximum voltage or digital ceiling. In digital, once it's gone, it's gone.", "img": IMG_CLIPPING, "quote": "You can't fix digital clip. - Al Schmitt" },
        "7": { "expl": "Standard recording levels peak around -18dBFS (average) to -12dBFS (peak). Hitting 0dB adds no value, only risk.", "img": IMG_HEADROOM, "quote": "Yellow is the new Red. - Unknown" },
        "9": { "expl": "Low gain results in a low signal-to-noise ratio. When you turn it up later, you turn up the hiss (noise floor).", "img": IMG_SNR, "quote": "Signal good, Noise bad. - Unknown" },
        "10": { "expl": "Headroom is the safety zone you leave between your loudest peaks and the clipping point (0dB).", "img": IMG_HEADROOM, "quote": "Headroom is insurance. - Unknown" }
    },
    "2": {
        "1": { "expl": "The three main families are Dynamic (Moving Coil), Condenser (Capacitor), and Ribbon (Electromagnetic).", "img": IMG_MIC_DYN, "quote": "Know your tools. - Unknown" },
        "2": { "expl": "Dynamic mics are passive and rugged. They handle high SPL and drops better than delicate ribbons or condensers.", "img": IMG_MIC_DYN, "quote": "You can hammer a nail with an SM57. - Industry Joke" },
        "3": { "expl": "Condenser mics have active circuitry that requires power. This comes from 'Phantom Power' (+48V) or a battery.", "img": IMG_MIC_COND, "quote": "Phantom power wakes up the capacitor. - Unknown" },
        "4": { "expl": "Standard Phantom Power is +48 Volts DC, sent down the XLR cable.", "img": IMG_MIC_COND, "quote": "48V is the lifeblood of the condenser. - Unknown" },
        "5": { "expl": "Old ribbon mics can be destroyed by 48V phantom power because it can stretch or burn the delicate aluminum ribbon.", "img": IMG_MIC_RIB, "quote": "Ribbons are fragile flowers. - Unknown" },
        "6": { "expl": "Condenser mics have the lowest mass diaphragm, allowing them to move fastest and capture the most high-frequency detail.", "img": IMG_SENSITIVITY, "quote": "Condensers hear the air. - Unknown" },
        "9": { "expl": "Large Diaphragm Condensers (LDCs) are the standard for vocals due to their rich low-end and flattering 'big' sound.", "img": IMG_MIC_COND, "quote": "The LDC is the star's spotlight. - Unknown" },
        "10": { "expl": "Ribbon mics roll off high frequencies naturally (unlike bright condensers), making them perfect for taming harsh electric guitars.", "img": IMG_MIC_RIB, "quote": "Ribbons heal digital harshness. - Unknown" }
    },
    "3": {
        "1": { "expl": "A polar pattern is a graph showing how sensitive the microphone is to sounds arriving from different angles (Front, Side, Rear).", "img": IMG_CARDIOID, "quote": "Pattern determines perspective. - Unknown" },
        "2": { "expl": "Omnidirectional mics hear everything equally, like a lit candle in the middle of a room.", "img": IMG_OMNI, "quote": "Omni is the sound of reality. - Unknown" },
        "3": { "expl": "Cardioid means 'Heart-Shaped'. It focuses on the front and rejects the rear.", "img": IMG_CARDIOID, "quote": "Cardioid is the workhorse of the stage. - Unknown" },
        "4": { "expl": "The null point of a Cardioid mic is directly behind it (180 degrees). Point the rear at the monitor speakers to avoid feedback.", "img": IMG_CARDIOID, "quote": "Aim the null at the noise. - Live Sound Rule" },
        "5": { "expl": "Omni mics do not reject sound, so they cannot isolate a source if other noises are present.", "img": IMG_OMNI, "quote": "Omni hears the room, not just the source. - Unknown" },
        "6": { "expl": "Figure-8 mics are bi-directional. They hear front and back equally but are completely deaf to the sides (90 and 270 degrees).", "img": IMG_FIG8, "quote": "Figure-8 is the secret weapon for isolation. - Unknown" },
        "8": { "expl": "Shotgun mics use interference tubes to create an extremely narrow 'lobar' pattern, picking up sound only from a specific point.", "img": IMG_SHOTGUN, "quote": "Shotguns are audio snipers. - Unknown" },
        "9": { "expl": "As you move off-axis (to the side), a directional mic loses high frequencies first, making the sound duller.", "img": IMG_OFFAXIS, "quote": "Off-axis is off-color. - Unknown" },
        "10": { "expl": "Cardioid is the standard for noisy environments because it focuses on the source and ignores the surrounding chaos.", "img": IMG_CARDIOID, "quote": "Focus creates clarity. - Unknown" }
    },
    "4": {
        "1": { "expl": "Close micing is generally defined as 1 to 12 inches. Anything closer is 'very close'; anything further starts becoming 'distance' or 'room' micing.", "img": IMG_ROOM, "quote": "Get close for the truth. - Unknown" },
        "3": { "expl": "The 3:1 Rule is used to prevent phase cancellation between two mics. If Mic A is 1 foot from the source, Mic B must be 3 feet away from Mic A.", "img": IMG_3TO1, "quote": "3 to 1 keeps the phantom away. - Unknown" },
        "5": { "expl": "Proximity Effect artificially boosts bass frequencies as a directional mic gets closer to the source (within inches).", "img": IMG_PROXIMITY, "quote": "Proximity is a free bass boost. - Unknown" },
        "7": { "expl": "To check phase, flip the polarity (Ø) or sum to mono. If the bass disappears or the sound gets thin, you have a phase issue.", "img": IMG_PHASEWARN, "quote": "Thin means Out-of-Phase. - Unknown" },
        "8": { "expl": "The Phase Invert switch (Polarity) flips the voltage. It's the quickest fix for phase cancellation.", "img": IMG_FLIP, "quote": "Flip it and judge. - Unknown" }
    },
    "5": {
        "1": { "expl": "The SM57 is the industry standard for snare drums due to its durability and mid-range crack.", "img": IMG_SNARE, "quote": "If you don't have an SM57, get one. - Unknown" },
        "2": { "expl": "Positioning 1-2 inches above the rim, angled at the center, captures the stick attack and the body of the drum.", "img": IMG_SNARE, "quote": "Angle determines the tone. - Unknown" },
        "3": { "expl": "Dynamic mics like the AKG D112 or Shure Beta 52 are built to handle the extreme SPL and low frequencies of a kick drum.", "img": IMG_KICK, "quote": "The kick needs to move air. - Unknown" },
        "5": { "expl": "Small Diaphragm Condensers (SDCs) are preferred for overheads because of their fast transient response, capturing the shimmering highs of cymbals.", "img": IMG_MICS, "quote": "SDCs catch the sparkle. - Unknown" },
        "9": { "expl": "Micing under the snare captures the bright rattle of the snare wires, blending it with the top mic for a full sound.", "img": IMG_SNARE, "quote": "Bottom brings the sizzle. - Unknown" },
        "10": { "expl": "Since the top and bottom mics point at each other, the diaphragm moves in opposite directions when the drum is hit. Flipping phase aligns them.", "img": IMG_PHASEWARN, "quote": "Always flip the bottom snare. - Rule of Thumb" }
    },
    "6": {
        "1": { "expl": "Micing near the 12th fret captures a balanced blend of string attack and body resonance, avoiding the boominess of the soundhole.", "img": IMG_GTR_AC, "quote": "The 12th fret is the sweet spot. - Unknown" },
        "2": { "expl": "Condenser microphones (small or large diaphragm) are preferred for acoustic guitar to capture the subtle high-frequency details.", "img": IMG_GTR_AC, "quote": "Detail lives in the condenser. - Unknown" },
        "3": { "expl": "The soundhole projects a lot of low-frequency air, often leading to a muddy or 'boomy' recording if miced directly.", "img": IMG_GTR_AC, "quote": "Avoid the hole. - Unknown" },
        "4": { "expl": "The Shure SM57 is a classic choice for electric guitar amps, often placed right on the grill cloth.", "img": "/images/sm57.png", "quote": "SM57 on a cab is the sound of rock. - Unknown" },
        "5": { "expl": "The center of the speaker cone produces the most high frequencies. Placing the mic here yields the brightest, most aggressive tone.", "img": IMG_OFFAXIS, "quote": "Center for bite, edge for warmth. - Unknown" },
        "10": { "expl": "Violins project sound from the f-holes. Placing a mic 1-2 feet above looks down at the instrument for a natural balance.", "img": IMG_VIOLIN, "quote": "Let the violin breathe. - Unknown" }
    },
    "7": {
        "4": { "expl": "A pop filter breaks up the fast-moving air (plosives) from 'P' and 'B' sounds before they hit the sensitive diaphragm.", "img": IMG_POP, "quote": "Stops the pops. - Unknown" },
        "9": { "expl": "Cardioid is the standard for vocals because it rejects the room reflections behind the singer, keeping the vocal dry and upfront.", "img": IMG_CARDIOID, "quote": "Dry vocals are easier to mix. - Unknown" }
    },
    "8": {
        "1": { "expl": "Micing slightly off-axis from the saxophone bell captures the full tone without the harsh key noise or excessive wind blast.", "img": IMG_SAX, "quote": "Sax needs room to bloom. - Unknown" },
        "3": { "expl": "Ribbon mics are famous for 'warming up' brass instruments by rolling off the harsh high frequencies naturally.", "img": IMG_MIC_RIB, "quote": "Ribbons love brass. - Unknown" }
    },
    "9": {
        "1": { "expl": "Fully opening the lid allows the sound to project outwards, creating a brighter and more open sound suitable for classical.", "img": IMG_PIANO_GR, "quote": "Open lid, open sound. - Unknown" },
        "2": { "expl": "Placing mics 8-12 inches above the strings captures a balanced stereo image of the hammers and the harp resonance.", "img": IMG_PIANO_GR, "quote": "Standard classical position. - Unknown" },
        "5": { "expl": "Pop/Rock piano often needs to cut through a dense mix. Micing closer with the lid on a short stick reduces room bleed and increases attack.", "img": IMG_PIANO_GR, "quote": "Closer is punchier. - Unknown" },
        "7": { "expl": "Upright pianos are enclosed. To get a clean recording, you typically remove the front or back panels to expose the soundboard/strings.", "img": IMG_PIANO_UP, "quote": "Open up the box. - Unknown" }
    },
    "10": {
        "1": { "expl": "X/Y (Coincident Pair) places two cardioid mics with capsules touching at an angle (usually 90 degrees).", "img": IMG_XY, "quote": "X/Y is tight and phase-coherent. - Unknown" },
        "2": { "expl": "Because the capsules are at the same point in space, sound arrives at both at the same time, eliminating phase cancellation (mono compatible).", "img": IMG_XY, "quote": "Phase coherence is king. - Unknown" },
        "3": { "expl": "Mid-Side (M/S) uses a Cardioid mic facing forward (Mid) and a Figure-8 mic facing sideways (Side).", "img": IMG_MS, "quote": "M/S gives you width control later. - Unknown" },
        "5": { "expl": "Spaced Pair (A/B) uses two microphones spaced apart (typically 3-10 feet) to capture a wide, immersive stereo image based on time-of-arrival differences.", "img": IMG_SPACED, "quote": "width comes from time differences. - Unknown" },
        "6": { "expl": "Spaced Pair typically yields the widest stereo image but suffers from the most potential phase cancellation if summed to mono.", "img": IMG_SPACED, "quote": "Wide but dangerous. - Unknown" },
        "7": { "expl": "ORTF (French Radio standard) uses two cardioid mics spaced 17cm apart and angled at 110 degrees, mimicking human ears.", "img": IMG_ORTF, "quote": "ORTF sounds like being there. - Unknown" },
        "8": { "expl": "Blumlein Pair uses two Figure-8 microphones crossed at 90 degrees. It captures a very realistic stereo image with room ambience.", "img": IMG_BLUMLEIN, "quote": "Blumlein is 360-degree realism. - Unknown" },
        "9": { "expl": "The Decca Tree uses three omnidirectional mics in a triangle formation. It is the Hollywood standard for orchestral recording.", "img": IMG_DECCA, "quote": "Decca Tree is the sound of cinema. - Unknown" }
    },
    "11": {
        "1": { "expl": "Dynamic mics use a coil of wire moving within a magnetic field to generate voltage (Electromagnetic Induction).", "img": IMG_MIC_DYN, "quote": "Magnets and wire make the fire. - Unknown" },
        "3": { "expl": "Condenser mics use a capacitor design. Sound waves change the distance between the movable diaphragm and the fixed backplate, changing capacitance.", "img": IMG_MIC_COND, "quote": "Review schematic. - Unknown" },
        "9": { "expl": "Ribbon microphones are naturally bi-directional (Figure-8) because the ribbon is open to sound from both the front and back.", "img": IMG_MIC_RIB, "quote": "Physics dictates the pattern. - Unknown" }
    },
    "12": {
        "1": { "expl": "Pop filters are essential for vocals to stop plosive air bursts.", "img": IMG_POP, "quote": "Don't pop the mic. - Unknown" },
        "3": { "expl": "Shock mounts use elastic bands to mechanically isolate the microphone from stand vibrations and floor rumble.", "img": IMG_SHOCK, "quote": "Float the mic. - Unknown" },
        "7": { "expl": "XLR cables have 3 pins: Pin 1 (Ground), Pin 2 (Hot/+), Pin 3 (Cold/-).", "img": IMG_XLR, "quote": "1 Ground, 2 Hot, 3 Cold. - Standard" }
    }
}

KEYWORD_MATCHES = {
    # High Priority Specifics
    "cardioid": { "img": IMG_CARDIOID, "expl": "Cardioid is the most common polar pattern, rejecting sound from the rear to isolate the source." },
    "omnidirectional": { "img": IMG_OMNI, "expl": "Omnidirectional microphones pick up sound equally from all directions, offering a natural sound with no proximity effect." },
    "figure-8": { "img": IMG_FIG8, "expl": "Figure-8 (Bidirectional) picks up sound from front and back while rejecting the sides completely." },
    "shotgun": { "img": IMG_SHOTGUN, "expl": "Shotgun microphones have a narrow directional pattern for picking up sources from a distance." },
    "dynamic": { "img": IMG_MIC_DYN, "expl": "Dynamic microphones are durable, require no power, and handle high sound pressure levels well." },
    "condenser": { "img": IMG_MIC_COND, "expl": "Condenser microphones need power (phantom or battery) and capture high-frequency detail and transients accurately." },
    "ribbon": { "img": IMG_MIC_RIB, "expl": "Ribbon microphones use a thin metal ribbon and offer a warm, smooth, natural tone, often with a Figure-8 pattern." },
    "phantom": { "img": IMG_MIC_COND, "expl": "Phantom power (+48V) is a DC voltage sent down the mic cable to power active electronics in condensers." },
    "proximity": { "img": IMG_PROXIMITY, "expl": "Proximity effect causes an increase in bass response when a directional microphone is placed very close to the source." },
    "phase": { "img": IMG_PHASEWARN, "expl": "Phase issues occur when multiple mics pick up the same sound at different times, causing cancellation (thin sound)." },
    "gain": { "img": IMG_CHAIN, "expl": "Gain controls the input level of the microphone preamp to optimize the signal-to-noise ratio." },
    "headroom": { "img": IMG_HEADROOM, "expl": "Headroom is the available safety range in decibels before your signal clips or distorts." },
    "snr": { "img": IMG_SNR, "expl": "Signal-to-Noise Ratio is the difference between your desired audio signal and the background noise floor." },
    "stereo": { "img": IMG_XY, "expl": "Stereo recording techniques use two microphones to create a sense of width and space." },
    "xy": { "img": IMG_XY, "expl": "X/Y is a coincidental stereo technique using two cardioids at 90 degrees for a phase-coherent image." },
    "spaced pair": { "img": IMG_SPACED, "expl": "Spaced Pair uses mics separated by distance to create a wide stereo image based on time differences." },
    "mid-side": { "img": IMG_MS, "expl": "Mid-Side recording uses a cardioid (mid) and figure-8 (side) for a width-adjustable, mono-compatible stereo image." },
    "transient": { "img": IMG_SNARE, "expl": "Transients are the initial high-energy burst of a sound (like a drum hit), best captured by condenser mics." },
    "spl": { "img": IMG_MIC_DYN, "expl": "SPL (Sound Pressure Level) measures the physical intensity of sound in the air." },
    "noise floor": { "img": IMG_SNR, "expl": "The noise floor is the level of background hiss and hum inherent in the recording chain." },
    "off-axis": { "img": IMG_OFFAXIS, "expl": "Off-axis coloration occurs when sound enters the microphone from the side or rear, often sounding duller." },
    "pop filter": { "img": IMG_POP, "expl": "A pop filter blocks fast-moving air blasts (plosives) from hitting the microphone diaphragm." },
    "shock mount": { "img": IMG_SHOCK, "expl": "A shock mount mechanically isolates the microphone to prevent rumble and vibration noise." },
    "xlr": { "img": IMG_XLR, "expl": "XLR is the standard professional 3-pin connector carrying balanced audio signals." },
    "cli": { "img": IMG_CLIPPING, "expl": "Clipping is a form of severe distortion that occurs when a signal exceeds the maximum capabilities of the system." },
}

SUBJECT_DEFAULTS = {
    # Defaults per Topic Number
    "1": { "imgs": [IMG_CHAIN], "expls": ["Gain staging is balancing levels for the best sound quality."] },
    "2": { "imgs": [IMG_MICS], "expls": ["Choosing the right tool (Dynamic vs Condenser) defines the sound."] },
    "3": { "imgs": [IMG_CARDIOID], "expls": ["Polar patterns allow you to control what sound is picked up and what is rejected."] },
    "4": { "imgs": [IMG_ROOM], "expls": ["Mic placement (distance and angle) is the most powerful EQ you have."] },
    "5": { "imgs": [IMG_SNARE], "expls": ["Drums often require multiple mics to capture both attack and resonance."] },
    "6": { "imgs": [IMG_GTR_AC], "expls": ["String instruments have complex radiation patterns; finding the sweet spot is key."] },
    "7": { "imgs": [IMG_POP], "expls": ["Capturing a great vocal requires controlling dynamics and plosives at the source."] },
    "8": { "imgs": [IMG_SAX], "expls": ["Wind instruments can produce high SPL and air blasts that need careful mic placement."] },
    "9": { "imgs": [IMG_PIANO_GR], "expls": ["Pianos are massive sound sources; stereo techniques help capture their full range."] },
    "10": { "imgs": [IMG_XY], "expls": ["Stereo micing adds dimension and realism to your recordings."] },
    "11": { "imgs": [IMG_MIC_COND], "expls": ["Understanding the physics of the transducer helps you predict how it will sound."] },
    "12": { "imgs": [IMG_SHOCK], "expls": ["Accessories like stands and cables are the unsung heroes of a clean signal path."] }
}

def enrich_markdown():
    for md_file_path in FILES_TO_PROCESS:
        if not os.path.exists(md_file_path):
            print(f"Skipping {md_file_path} - Not Found")
            continue
            
        print(f"Processing {md_file_path}...")
        
        with open(md_file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Split by TOPICS
        topics = re.split(r'(## TOPIC \d+:.*)', content)
        
        new_content = ""
        current_topic_num = 0
        
        for section in topics:
            header_match = re.match(r'## TOPIC (\d+):', section)
            if header_match:
                current_topic_num = header_match.group(1)
                new_content += section
                continue
                
            if not current_topic_num:
                new_content += section
                continue
                
            # Process Content
            questions = re.split(r'(### Question \d+)', section)
            
            for q_chunk in questions:
                if q_chunk.strip().startswith('### Question'):
                    new_content += q_chunk
                    q_num_match = re.search(r'### Question (\d+)', q_chunk)
                    if q_num_match:
                        current_q_num = q_num_match.group(1)
                    continue
                    
                # Clean existing enrichment
                lines = q_chunk.split('\n')
                clean_lines = []
                for line in lines:
                    if not any(line.strip().startswith(prefix) for prefix in ['**Expert Explanation:**', '**Image:**', '**Expert Quote:**']):
                        clean_lines.append(line)
                
                q_chunk = '\n'.join(clean_lines)
                
                if "**Answer:" in q_chunk:
                    # Determine Content
                    is_basic = "Basic" in md_file_path
                    
                    expl = None
                    img = None
                    quote = None
                    
                    # 1. Manual Match (Priority for Basic Level)
                    # We only have manual data mapped for Basic logic right now
                    if is_basic:
                        manual = BASIC_DATA.get(str(current_topic_num), {}).get(str(current_q_num))
                        if manual:
                            expl = manual.get("expl")
                            img = manual.get("img")
                            quote = manual.get("quote")
                    
                    # 2. Keyword Match (if missing)
                    if not expl:
                        text_lower = q_chunk.lower()
                        for key, data in KEYWORD_MATCHES.items():
                            if key in text_lower:
                                expl = data["expl"]
                                img = data["img"]
                                quote = "Terms like " + key + " are fundamental. - Dictionary"
                                break
                    
                    # 3. Defaults (if still missing)
                    if not expl:
                        defaults = SUBJECT_DEFAULTS.get(str(current_topic_num))
                        if defaults:
                            # Cycle through defaults based on Q num
                            idx = int(current_q_num) % len(defaults["expls"])
                            expl = defaults["expls"][idx]
                            img = defaults["imgs"][0]
                            quote = "Mastering this concept takes practice. - Education Team"
                            
                    # Construct Injection
                    if expl:
                        injection = "\n"
                        injection += f"\n**Expert Explanation:** {expl}"
                        if img:
                            injection += f"\n**Image:** ![\"Diagram\"]({img})"
                        if quote:
                            injection += f"\n**Expert Quote:** \"{quote}\""
                        
                        q_chunk = re.sub(r'(\*\*Answer: [A-D](.*?)\*\*)', r'\1' + injection, q_chunk)
                        
                new_content += q_chunk
        
        with open(md_file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {md_file_path}")

if __name__ == "__main__":
    enrich_markdown()
