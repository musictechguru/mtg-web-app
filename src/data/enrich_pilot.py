
import json
import os

# Path to the JSON file
json_path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

# Load the data
with open(json_path, 'r') as f:
    data = json.load(f)

# Define the enrichment data for Volume 1, Part 1, Topic 1 (Basic)
enrichments = {
    "v1_p1_t1_b_1": { # Define Frequency
        "expert_explanation": "Frequency is strictly defined as the number of cycles a sound wave completes in one second. Measured in Hertz (Hz), this physical property correlates directly to our perception of musical pitch. Low frequencies (20Hz-200Hz) provide the weight and power of a track, while high frequencies (5kHz-20kHz) add air, detail, and sparkle. Mastering frequency management via EQ is the single most important skill for clarity in a mix.",
        "explanation_image": {
            "src": "/images/diagram_frequency_v2.png",
            "alt": "Frequency Diagram showing cycles per second"
        },
        "expert_quote": {
            "text": "The mix is a frequency puzzle. You have to carve out space for every element to live.",
            "author": "Chris Lord-Alge"
        }
    },
    "v1_p1_t1_b_hotspot_1": { # Input Gain
        "expert_explanation": "Gain Staging is the first and most critical step in recording. The Input Gain knob on a channel strip (or preamp) amplifies the weak microphone signal to a healthy 'Line Level'. If this is too low, you'll have a noisy recording (low Signal-to-Noise ratio). If it's too high, you'll introduce clipping distortion before you've even started mixing. It is distinct from the fader, which only controls monitoring volume.",
        "explanation_image": {
            "src": "/images/channel_strip.png",
            "alt": "Channel Strip showing Gain at the top"
        },
        "expert_quote": {
            "text": "Gain staging is not a glamourous subject, but it is the difference between a pro sounding record and an amateur one.",
            "author": "Dave Pensado"
        }
    },
    "v1_p1_t1_b_3": { # Hearing Range
        "expert_explanation": "The nominal range of human hearing is 20Hz to 20kHz. However, this is an idealized biological limit. In reality, we are most sensitive to the midrange (1kHz-4kHz)—the range of the human voice—due to the Fletcher-Munson equal loudness contours. Sub-bass (below 40Hz) is often felt more than heard, and frequencies above 16kHz ('air') degrade significantly with age.",
        "explanation_image": {
            "src": "/images/diagram_fletcher_munson_v2.png",
            "alt": "Fletcher-Munson Equal Loudness Contours"
        },
        "expert_quote": {
            "text": "We don’t hear linearly. We hear mid-range loudest. That’s why the vocal is king.",
            "author": "Tony Maserati"
        }
    },
    "v1_p1_t1_b_4": { # Digital Clipping
        "expert_explanation": "In the digital domain, 0dBFS (Decibels Full Scale) is the absolute ceiling. When a signal exceeds this, the waveform tops are flattened abruptly. This creates 'square wave' style harmonic distortion that sounds harsh, brittle, and unmusical—unlike analog tape saturation, which can sound warm and pleasing. 'Red lining' in digital is a destructive error that ruins the fidelity of your audio.",
        "explanation_image": {
            "src": "/images/diagram_clipping_v2.png",
            "alt": "Digital Clipping waveform vs Clean waveform"
        },
        "expert_quote": {
            "text": "In digital, there is no 'good' red. Zero is the limit. Stay away from it.",
            "author": "Bob Katz"
        }
    },
    "v1_p1_t1_b_5": { # Mic Power
        "expert_explanation": "Condenser microphones function like a capacitor with two plates: a backplate and a lightweight diaphragm. To create an electrical charge between them, they require external power. This +48V 'Phantom Power' is sent from the preamp up the XLR cable. Note that Dynamic and Ribbon mics operate on electromagnetic induction and do not require this power—in fact, sending 48V to a vintage ribbon mic can destroy it.",
        "explanation_image": {
            "src": "/images/diagram_mics_v2.png",
            "alt": "Microphone Construction: Dynamic vs Condenser"
        },
        "expert_quote": {
            "text": "The microphone is the painter's brush. You choose the brush based on the texture you want.",
            "author": "Al Schmitt"
        }
    }
}

# Traverse the JSON to find and update the questions
count = 0
for vol in data.get('volumes', []):
    for part in vol.get('parts', []):
        for topic in part.get('topics', []):
            # Check basic levels
            if 'basic' in topic.get('levels', {}):
                for q in topic['levels']['basic']:
                    if q['id'] in enrichments:
                        # Apply enrichment
                        enr = enrichments[q['id']]
                        q['expert_explanation'] = enr['expert_explanation']
                        q['explanation_image'] = enr['explanation_image']
                        q['expert_quote'] = enr['expert_quote']
                        count += 1
                        print(f"Updated {q['id']}")

# Save the updated JSON
try:
    with open(json_path, 'w') as f:
        json.dump(data, f, indent=4)
    print(f"Successfully updated {count} questions in {json_path}")
except Exception as e:
    print(f"Error saving JSON: {e}")
