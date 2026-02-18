import json
import os

def fix_answer_lengths():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    changes = 0

    # Map of Question Content Fragment -> New Wrong Answers (to replace short ones)
    fixes = {
        "Why are balanced XLR cables better": [
            " They use a higher voltage transmission system that bypasses the need for standard preamplification",
            " The braided shield acts as a comprehensive ground loop isolator preventing all digital interference",
            " They have significantly lower impedance which naturally boosts the signal volume over long runs"
        ],
        "multi-sampling a guitar with samples every 4 semitones": [
            " It allows the sampler to automatically tune the guitar strings to perfect pitch without artifacts",
            " It creates a wider stereo image by panning alternating samples hard left and hard right",
            " It increases the dynamic range of the instrument by using 32-bit floating point processing"
        ],
        "normalize a sample to -0.3dBFS instead of 0dBFS": [
            " To ensure the sample is compatible with lower bit-depth playback systems like 16-bit CD players",
            " To increase the overall RMS loudness of the file without affecting the peak levels",
            " To align the phase of the sample with other tracks in the project automatically"
        ],
        "Why is a linear phase EQ often preferred for mastering?": [
            " It adds desirable analog saturation and harmonic distortion that warms up the final mix",
            " It uses less CPU power than minimum phase EQs, allowing for more instances",
            " It automatically detects and removes resonant frequencies without manual adjustment"
        ],
        "What is the purpose of makeup gain": [
            " To increase the ratio of compression applied to the signal dynamically",
            " To lower the threshold automatically based on the input signal level",
            " To add harmonic saturation to the compressed signal for more character"
        ],
        "how does a porous absorber (like rockwool) work": [
             " It reflects sound waves back into the room to increase diffusion",
             " It vibrates sympathetically with the bass frequencies to cancel them out",
             " It uses active noise cancellation technology to eliminate room modes"
        ],
        "What is the main advantage of using a dedicated word clock": [
            " It increases the sample rate of the audio interface to 192kHz",
            " It adds analog warmth to the digital signal path",
            " It reduces the latency of the audio interface to zero"
        ],
        "Why use a ribbon microphone for brass": [ 
            " They have a built-in high-pass filter that removes rumble",
            " They are indestructible and can handle extreme SPL levels",
            " They add a bright, airy presence to the recording"
        ],
        "Mid-Side (M/S) recording decoding formula": [
             " Mid = Left - Right; Side = Left + Right",
             " Mid = Left * Right; Side = Left / Right",
             " Mid = Left + Left; Side = Right + Right"
        ],
        "What is the function of the threshold in a compressor": [
             " It sets the ratio of gain reduction applied",
             " It controls the speed at which compression starts",
             " It boosts the output level of the signal"
        ],
        "Nyquist Theorem states that": [
             " Sample rate must be equal to the highest frequency",
             " Bit depth determines the frequency response",
             " Frequencies above the limit are boosted"
        ],
        "What is the proximity effect": [
             " High frequencies are boosted when close",
             " The microphone becomes omnidirectional",
             " It reduces the sensitivity to background noise"
        ]
    }

    for vol in data['volumes']:
        for part in vol['parts']:
            for topic in part['topics']:
                for level, qs in topic.get('levels', {}).items():
                    for q in qs:
                        for key, new_answers in fixes.items():
                            if key in q['content']:
                                # Found a target!
                                # Keep the correct answer, replace the rest
                                correct_ans = next((a for a in q['answers'] if str(a.get('is_true')).lower() == 'yes' or a.get('is_true') is True), None)
                                if not correct_ans: continue

                                # Create new answer list
                                updated_answers = [correct_ans]
                                
                                # Add the new wrong answers
                                for weird_ans in new_answers:
                                    updated_answers.append({
                                        "text": weird_ans.strip(),
                                        "is_true": "no"
                                    })
                                
                                # Shuffle them so correct isn't always first
                                import random
                                random.shuffle(updated_answers)
                                
                                q['answers'] = updated_answers
                                print(f"Fixed answer lengths for: {q['content'][:50]}...")
                                changes += 1

    if changes > 0:
        with open(path, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Applied fixes to {changes} questions with length bias.")
    else:
        print("No matches found for length fixes.")

if __name__ == "__main__":
    fix_answer_lengths()
