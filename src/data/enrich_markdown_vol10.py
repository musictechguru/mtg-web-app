import re
import os

# Configuration
MD_FILE = "/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/public/Quiz_questions/Volume 10/Volume10_Equipment_Basic_Level_120Q.md"

# Existing Images (Equipment)
IMG_XLR_PINOUT = "/images/svg/cable_xlr_pinout.svg"
IMG_TRS_LABEL = "/images/TRS label.png"
IMG_AUDIO_INT = "/images/svg/audio_interface.svg"
IMG_MIDI_ROLL = "/images/svg/midi_piano_roll.svg"

# New Volume 10 Images (Connections, Flow, History)
IMG_CABLES = "/images/svg/equipment_cable_types_connector_guide.svg"
IMG_DIGITAL_CONN = "/images/svg/equipment_digital_connectors_usb_thunderbolt.svg"
IMG_SEND_RETURN = "/images/svg/equipment_signal_flow_send_return_parallel.svg"
IMG_INSERT = "/images/svg/equipment_signal_flow_insert_serial.svg"
IMG_GAIN_STAGE = "/images/svg/equipment_mic_preamp_gain_stage.svg"
IMG_TAPE_HEAD = "/images/svg/history_analog_tape_multitrack.svg"
IMG_MIDI_LOOP = "/images/svg/history_midi_connection_loop.svg"
IMG_PATCHBAY = "/images/svg/equipment_patch_bay_flow.svg"
IMG_VINYL = "/images/svg/history_vinyl_groove_stylus.svg"
IMG_DI_BOX = "/images/svg/equipment_di_box_function.svg"


# Content Database (Subject Index 1-7, Question Index 1-10)
ENRICHMENT_DATA = {
    # SUBJECT 1: AUDIO INTERFACES
    "1": {
        "1": { "expl": "An Audio Interface is the bridge between the analog world (mics/guitars) and the digital computer (DAW).", "img": IMG_AUDIO_INT, "quote": "The heart of the digital studio. - Unknown" },
        "5": { "expl": "A Microphone Preamp boosts tiny mic signals (millivolts) up to Line Level (volts) so the converter can read it.", "img": IMG_GAIN_STAGE, "quote": "Clean gain is gold. - Unknown" }
    },
    # SUBJECT 2: MIDI CONTROLLERS
    "2": {
        "4": { "expl": "Weighted keys simulate the hammers of a real piano, providing resistance for expressive playing.", "img": IMG_MIDI_ROLL, "quote": "Feel the weight. - Pianist" },
        "7": { "expl": "The Akai MPC revolutionized Hip-Hop with its 16-pad grid, allowing producers to chop samples rhythmically.", "img": IMG_MIDI_ROLL, "quote": "The groove box. - Hip Hop History" }
    },
    # SUBJECT 3: SIGNAL FLOW
    "3": {
        "1": { "expl": "Signal flow is the path audio takes. In a DAW, it usually goes Clip -> Insert Effects -> Fader -> Master Bus.", "img": IMG_INSERT, "quote": "Follow the stream. - Unknown" },
        "4": { "expl": "Insert effects (Series) process 100% of the signal. Used for EQ, Compression, and Gate.", "img": IMG_INSERT, "quote": "In-line processing. - Unknown" },
        "5": { "expl": "Send/Return effects (Parallel) blend the original signal with an effected copy. Perfect for Reverb and Delay.", "img": IMG_SEND_RETURN, "quote": "Blend it in. - Unknown" }
    },
    # SUBJECT 4: CABLES & CONNECTORS
    "4": {
        "1": { "expl": "XLR is the professional standard for microphones. It has 3 pins: Ground (1), Positive (2), Negative (3).", "img": IMG_XLR_PINOUT, "quote": "Balanced and locked. - Unknown" },
        "4": { "expl": "TRS (Tip-Ring-Sleeve) can carry stereo signals (headphones) OR balanced mono signals (studio monitors).", "img": IMG_TRS_LABEL, "quote": "Two rings, three conductors. - Unknown" },
        "6": { "expl": "TS (Tip-Sleeve) is Unbalanced. It's standard for electric guitars but picks up noise over long runs.", "img": IMG_CABLES, "quote": "Keep guitar cables short. - Rule" },
        "10": { "expl": "DI Boxes convert high-impedance (Hi-Z) guitar signals to low-impedance (Lo-Z) mic signals for recording.", "img": IMG_DI_BOX, "quote": "Direct Injection. - Unknown" }
    },
    # SUBJECT 5: USB & DIGITAL
    "5": {
        "3": { "expl": "USB-C and Thunderbolt connect interfaces to computers. Thunderbolt typically offers lower latency (faster round-trip).", "img": IMG_DIGITAL_CONN, "quote": "Speed is stability. - Unknown" }
    },
    # SUBJECT 6: ANALOG HISTORY
    "6": {
        "2": { "expl": "The Phonograph (Edison) recorded sound physically by etching grooves into a cylinder or disc.", "img": IMG_VINYL, "quote": "Sound you can touch. - Unknown" },
        "6": { "expl": "Multitrack Tape allowed artists to record instruments separately at different times (Overdubbing).", "img": IMG_TAPE_HEAD, "quote": "The birth of modern production. - Unknown" }
    },
    # SUBJECT 7: DIGITAL HISTORY
    "7": {
        "4": { "expl": "MIDI (1983) allowed synthesizers from different brands to talk to each other. It transmits notes, not sound.", "img": IMG_MIDI_LOOP, "quote": "The universal language. - Ikutaro Kakehashi" }
    }
}

def enrich_markdown():
    with open(MD_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by SUBJECTS
    subjects = re.split(r'(# SUBJECT \d+:.*)', content)
    
    new_content = ""
    current_subject_num = 0
    
    for section in subjects:
        header_match = re.match(r'# SUBJECT (\d+):', section)
        if header_match:
            current_subject_num = header_match.group(1)
            new_content += section
            continue
            
        if not current_subject_num:
            new_content += section
            continue
            
        questions = re.split(r'(### Question \d+)', section)
        
        for q_chunk in questions:
            if q_chunk.strip().startswith('### Question'):
                new_content += q_chunk
                q_num_match = re.search(r'### Question (\d+)', q_chunk)
                if q_num_match:
                    current_q_num = q_num_match.group(1)
                continue
                
            lines = q_chunk.split('\n')
            clean_lines = []
            for line in lines:
                if not any(line.strip().startswith(prefix) for prefix in ['**Expert Explanation:**', '**Image:**', '**Expert Quote:**']):
                    clean_lines.append(line)
            
            q_chunk = '\n'.join(clean_lines)
            
            if "**Answer:" in q_chunk:
                enrich_data = ENRICHMENT_DATA.get(str(current_subject_num), {}).get(str(current_q_num))
                
                if enrich_data:
                    injection = "\n"
                    if "expl" in enrich_data:
                        injection += f"\n**Expert Explanation:** {enrich_data['expl']}"
                    if "img" in enrich_data and enrich_data['img']:
                        injection += f"\n**Image:** ![\"Diagram\"]({enrich_data['img']})"
                    if "quote" in enrich_data and enrich_data['quote']:
                        injection += f"\n**Expert Quote:** \"{enrich_data['quote']}\""
                    
                    q_chunk = re.sub(r'(\*\*Answer: [A-D](.*?)\*\*)', r'\1' + injection, q_chunk)
                    
            new_content += q_chunk

    with open(MD_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Enrichment complete.")

if __name__ == "__main__":
    enrich_markdown()
