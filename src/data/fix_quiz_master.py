import json
import os
import random

def fix_quiz_master():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    changes = 0

    # Distractor Replacements (Topic -> [Weak -> Strong])
    # logical mapping for generic terms
    generic_replacements = {
        "Nothing": ["Phase cancellation", "Signal loss", "Latency", "Feedback"],
        "No such thing": ["A myth", "Only in analog", "Digital artifact", "Hardware limitation"],
        "Random": ["Stochastic", "Algorithmic", "Linear", "Exponential"],
        "Make it sound bad": ["Introduce distortion", "Cause phase issues", "Reduce clarity", "Limit dynamic range"],
        "Very bad": ["Undesirable", "Destructive", "Incompatible", "Noisy"],
        "Water flow": ["Electron flow", "Voltage drop", "Current", "Resistance"],
        "Pure silence": ["Digital black", "Noise floor", "Dither", "Bias signal"],
        "100 amps": ["500mA", "2 Amps", "110 Volts", "Line level"],
        "1000 amps": ["High voltage", "AC Current", "Wattage", "Impedance"],
        "Only color": ["Frequency spectrum", "Phase", "Amplitude", "Bit depth"],
        "Only temperature": ["Sample rate", "Bit rate", "Jitter", "Clock drift"],
        "No information": ["Metadata", "SysEx", "Control change", "Program change"]
    }

    def get_replacement(text):
        for weak, strong_options in generic_replacements.items():
            if weak.lower() in text.lower():
                return random.choice(strong_options)
        return None

    # Specific Target Fixes based on Audit
    targets = {
        "What is signal flow?": {
            "Water flow": "Hydraulic pressure", # Still wrong but tech-sounding? No, let's use "Electrical resistance"
            "Only electrical current": "Voltage differentiation",
            "No such thing": "A mythical concept"
        },
        "A waveform shows:": {
            "Only color": "Frequency content only",
            "No information": "Metadata only",
            "Only temperature": "File size"
        },
        "What is clipping?": {
            "Good sound quality": "Analog warmth",
            "Perfect recording": "Optimal gain staging",
            "Very quiet sound": "Low dynamic range"
        },
        "Phantom power provides what current": {
            "100 amps": "1 Amp",
            "1000 amps": "240 Volts",
            "No current": "AC Voltage"
        }
    }

    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        # 1. Check Specific Targets
                        for target_q, map_fix in targets.items():
                            if target_q in q['content']:
                                for a in q['answers']:
                                    if a['text'] in map_fix:
                                        print(f"Fixing Specific Distractor in '{q['content'][:30]}...': '{a['text']}' -> '{map_fix[a['text']]}'")
                                        a['text'] = map_fix[a['text']]
                                        changes += 1

                        # 2. Check Generic Weak Distractors
                        for a in q['answers']:
                            # Skip correct answers
                            if str(a.get('is_true')).lower() == 'yes' or a.get('is_true') is True:
                                continue
                            
                            replacement = get_replacement(a['text'])
                            if replacement and a['text'] != replacement: # Avoid self-replace
                                # Ensure replacement isn't already an answer
                                current_answers = [ans['text'] for ans in q['answers']]
                                if replacement not in current_answers:
                                    print(f"Fixing Generic Distractor in '{q['content'][:30]}...': '{a['text']}' -> '{replacement}'")
                                    a['text'] = replacement
                                    changes += 1

    if changes > 0:
        with open(path, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Applied {changes} improvements to distractors.")
    else:
        print("No changes needed.")

if __name__ == "__main__":
    fix_quiz_master()
