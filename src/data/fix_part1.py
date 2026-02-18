
import json

updates = {
    # TOPIC 1
    "v1_p1_t1_b_3": [
        { "text": "20Hz - 20,000Hz (20kHz)", "is_true": "yes" },
        { "text": "10Hz - 100Hz (Sub-bass range only)", "is_true": "no" },
        { "text": "500Hz - 5kHz (Midrange speech frequencies)", "is_true": "no" },
        { "text": "0Hz - 44.1kHz (Standard Sample Rate)", "is_true": "no" }
    ],
    "v1_p1_t1_b_4": [
        { "text": "Digital Clipping (Distortion)", "is_true": "yes" },
        { "text": "Warm analog tape saturation", "is_true": "no" },
        { "text": "Dynamic Range Compression", "is_true": "no" },
        { "text": "Bit-crushing lo-fi effect", "is_true": "no" }
    ],
    "v1_p1_t1_b_6": [
        { "text": "Equal level is sent to both Left and Right speakers", "is_true": "yes" },
        { "text": "The sound is physically routed to a third center speaker", "is_true": "no" },
        { "text": "The sound is summed to mono and phase inverted", "is_true": "no" },
        { "text": "It enters the mid/side matrix for stereo widening", "is_true": "no" }
    ],
    "v1_p1_t1_b_8": [
        { "text": "Multiple complex reflections in a space", "is_true": "yes" },
        { "text": "Direct sound traveling in a straight line", "is_true": "no" },
        { "text": "Phase cancellation between two mics", "is_true": "no" },
        { "text": "Frequency modulation of the carrier wave", "is_true": "no" }
    ],
    "v1_p1_t1_b_9": [
        { "text": "It means the music is much louder than the background hiss", "is_true": "yes" },
        { "text": "It means the background noise is louder than the music", "is_true": "no" },
        { "text": "It means the signal is heavily distorted and clipping", "is_true": "no" },
        { "text": "It reduces the file size for faster streaming", "is_true": "no" }
    ],
    "v1_p1_t1_b_10": [
        { "text": "They cancel each other out completely (Silence)", "is_true": "yes" },
        { "text": "They sum together to become twice as loud (+6dB)", "is_true": "no" },
        { "text": "They create a sweeping flanging or phasing effect", "is_true": "no" },
        { "text": "They distort and clip the output bus immediately", "is_true": "no" }
    ],
    "v1_p1_t1_i_3": [
        { "text": "Quantization Noise (Error)", "is_true": "yes" },
        { "text": "Aliasing (Foldover frequencies)", "is_true": "no" },
        { "text": "Clock Jitter (Timing errors)", "is_true": "no" },
        { "text": "Phase Cancellation (Hollowness)", "is_true": "no" }
    ],
    "v1_p1_t1_i_5": [
        { "text": "To convert High-Z (Instrument) to Low-Z (Mic) signal", "is_true": "yes" },
        { "text": "To add analog compression and saturation to the bass", "is_true": "no" },
        { "text": "To make the signal significantly louder before the amp", "is_true": "no" },
        { "text": "To filter out 60Hz mains hum from the power supply", "is_true": "no" }
    ],
    "v1_p1_t1_i_6": [
        { "text": "For every 4dB over the threshold, output increases by only 1dB", "is_true": "yes" },
        { "text": "The output volume increases by 4dB for every 1dB of input", "is_true": "no" },
        { "text": "The signal is made exactly 4 times quieter than the input", "is_true": "no" },
        { "text": "The compressor has a fixed attack time of 4 milliseconds", "is_true": "no" }
    ],
    "v1_p1_t1_i_7": [
        { "text": "RMS (Root Mean Square)", "is_true": "yes" },
        { "text": "Peak Meter (Instantaneous)", "is_true": "no" },
        { "text": "Phase Correlation Meter", "is_true": "no" },
        { "text": "Sample Counter Display", "is_true": "no" }
    ],
    "v1_p1_t1_i_9": [
        { "text": "Phase cancellation of noise (Common Mode Rejection)", "is_true": "yes" },
        { "text": "By using extra thick copper shielding around the wire", "is_true": "no" },
        { "text": "By converting the analog signal to digital zeros and ones", "is_true": "no" },
        { "text": "By using expensive gold-plated connectors at both ends", "is_true": "no" }
    ],
    "v1_p1_t1_i_10": [
        { "text": "A narrow, surgical bandwidth", "is_true": "yes" },
        { "text": "A wide, gentle musical shelf", "is_true": "no" },
        { "text": "A steep low pass filter slope", "is_true": "no" },
        { "text": "A significant increase in gain", "is_true": "no" }
    ],
    "v1_p1_t1_a_6": [
        { "text": "Aliasing (Foldover frequencies)", "is_true": "yes" },
        { "text": "Harmonic Distortion (Saturation)", "is_true": "no" },
        { "text": "Phase Shift (Timing delay)", "is_true": "no" },
        { "text": "Clock Jitter (Sample drift)", "is_true": "no" }
    ],
    "v1_p1_t1_a_7": [
        { "text": "At the very end of the chain", "is_true": "yes" },
        { "text": "At the very start of the chain", "is_true": "no" },
        { "text": "On every T-connector in the chain", "is_true": "no" },
        { "text": "It is never needed for modern gear", "is_true": "no" }
    ],
    "v1_p1_t1_a_9": [
        { "text": "An Impulse Response (IR)", "is_true": "yes" },
        { "text": "An Algorithmic Preset", "is_true": "no" },
        { "text": "A Sine Wave Test Tone", "is_true": "no" },
        { "text": "A MIDI Sequence Data file", "is_true": "no" }
    ],
    "v1_p1_t1_a_10": [
        { "text": "To blend 'body' and 'sustain' without losing the initial transient attack", "is_true": "yes" },
        { "text": "To completely reduce the dynamic range for a 'wall of sound' effect", "is_true": "no" },
        { "text": "To gate out microphone bleed from the kick and snare tracks", "is_true": "no" },
        { "text": "To correct timing errors in the performance automatically", "is_true": "no" }
    ],
    "v1_p1_t1_m_1": [
        { "text": "Nasal, 'test-tone', telephone-like", "is_true": "yes" },
        { "text": "Muddy, warm, and booming", "is_true": "no" },
        { "text": "Airy, sparkly, and bright", "is_true": "no" },
        { "text": "Sub-bass vibration felt physically", "is_true": "no" }
    ],
    "v1_p1_t1_m_2": [
        { "text": "Delaying the audio playback to allow the detector to 'see' ahead", "is_true": "yes" },
        { "text": "Using predictive AI algorithms to guess the waveform shape", "is_true": "no" },
        { "text": "Using faster fiber-optic cables to increase transmission speed", "is_true": "no" },
        { "text": "Oversampling the signal to 384kHz for better accuracy", "is_true": "no" }
    ],
     "v1_p1_t1_m_4": [
        { "text": "1-bit PDM at very high sample rates", "is_true": "yes" },
        { "text": "24-bit PCM at standard sample rates", "is_true": "no" },
        { "text": "Lossy MP3 compression algorithms", "is_true": "no" },
        { "text": "Analog tape magnetic saturation", "is_true": "no" }
    ],
    "v1_p1_t1_m_9": [
        { "text": "~9-10ms", "is_true": "yes" },
        { "text": "~1-2ms", "is_true": "no" },
        { "text": "~20-25ms", "is_true": "no" },
        { "text": "~50ms+", "is_true": "no" }
    ],
    "v1_p1_t1_m_10": [
        { "text": "Level increase when summing to mono/center", "is_true": "yes" },
        { "text": "Stereo width reduction in the high frequencies", "is_true": "no" },
        { "text": "Jitter artifacts caused by clocking errors", "is_true": "no" },
        { "text": "Phase cancellation in the low end", "is_true": "no" }
    ],

    # TOPIC 2
    "v1_p1_t2_b_1": [
        { "text": "The frequency bandwidth (pitch resolution)", "is_true": "yes" },
        { "text": "The dynamic range (volume resolution)", "is_true": "no" },
        { "text": "The stereo width of the recording", "is_true": "no" },
        { "text": "The file name of the recording", "is_true": "no" }
    ],
    "v1_p1_t2_b_2": [
        { "text": "The dynamic range and signal-to-noise ratio", "is_true": "yes" },
        { "text": "The maximum frequency response possible", "is_true": "no" },
        { "text": "The playback speed of the audio", "is_true": "no" },
        { "text": "The stereo panning positioning", "is_true": "no" }
    ],
    "v1_p1_t2_b_4": [
        { "text": "The delay between inputting a sound and hearing it back", "is_true": "yes" },
        { "text": "The file size on the hard drive", "is_true": "no" },
        { "text": "The overall loudness of the mixdown", "is_true": "no" },
        { "text": "The rotational speed of the hard drive", "is_true": "no" }
    ],
    "v1_p1_t2_b_8": [
        { "text": "WAV (or AIFF)", "is_true": "yes" },
        { "text": "MP3 (MPEG-1 Audio Layer III)", "is_true": "no" },
        { "text": "AAC (Advanced Audio Coding)", "is_true": "no" },
        { "text": "JPEG (Joint Photographic Experts Group)", "is_true": "no" }
    ],
    "v1_p1_t2_b_10": [
        { "text": "20,000Hz (20kHz)", "is_true": "yes" },
        { "text": "44,100Hz (44.1kHz)", "is_true": "no" },
        { "text": "100Hz (Bass)", "is_true": "no" },
        { "text": "1,000Hz (Midrange)", "is_true": "no" }
    ],
    "v1_p1_t2_i_3": [
        { "text": "It places a massive load on the CPU, causing clicks and dropouts", "is_true": "yes" },
        { "text": "It sounds digital and robotic compared to higher buffers", "is_true": "no" },
        { "text": "It increases the latency to unacceptable levels", "is_true": "no" },
        { "text": "It significantly lowers the playback volume", "is_true": "no" }
    ],
    "v1_p1_t2_i_5": [
        { "text": "When reducing Bit Depth (e.g., 24-bit to 16-bit)", "is_true": "yes" },
        { "text": "When changing Sample Rate (e.g., 48kHz to 44.1kHz)", "is_true": "no" },
        { "text": "Every time you save the project file", "is_true": "no" },
        { "text": "Before recording any audio into the DAW", "is_true": "no" }
    ],
    "v1_p1_t2_i_6": [
        { "text": "False low frequencies created when a signal exceeds the Nyquist limit", "is_true": "yes" },
        { "text": "A type of digital reverb used for spatial depth", "is_true": "no" },
        { "text": "A pleasant saturation effect added by tube preamps", "is_true": "no" },
        { "text": "Analog tape hiss inherent in the recording medium", "is_true": "no" }
    ],
    "v1_p1_t2_i_7": [
        { "text": "Timing inconsistencies in the sample clock", "is_true": "yes" },
        { "text": "Amplitude errors in the voltage reading", "is_true": "no" },
        { "text": "Frequency distortion in the high end", "is_true": "no" },
        { "text": "Network lag when streaming audio", "is_true": "no" }
    ],
    "v1_p1_t2_i_10": [
        { "text": "RCA (Coaxial) or Optical (Toslink)", "is_true": "yes" },
        { "text": "XLR (Balanced Microphone Cable)", "is_true": "no" },
        { "text": "USB-C (Universal Serial Bus)", "is_true": "no" },
        { "text": "MIDI 5-pin (Musical Instrument Digital Interface)", "is_true": "no" }
    ],
    "v1_p1_t2_a_1": [
        { "text": "Because the transition band between 20kHz and the Nyquist limit is much wider", "is_true": "yes" },
        { "text": "Because high sample rates use fewer bits to represent the waveform", "is_true": "no" },
        { "text": "Because analog gear works better at higher frequencies naturally", "is_true": "no" },
        { "text": "They don't; filters must always be extremely steep regardless of rate", "is_true": "no" }
    ],
    "v1_p1_t2_a_2": [
        { "text": "Moves the dither noise energy to less audible high frequencies", "is_true": "yes" },
        { "text": "Increases the overall volume of the noise floor", "is_true": "no" },
        { "text": "Removes the noise completely from the signal path", "is_true": "no" },
        { "text": "Adds harmonic distortion to the bass frequencies", "is_true": "no" }
    ],
    "v1_p1_t2_a_5": [
        { "text": "0.5 LSB (Least Significant Bit)", "is_true": "yes" },
        { "text": "1.0 Bit (Full Bit Error)", "is_true": "no" },
        { "text": "6.0 dB (Dynamic Range of 1 bit)", "is_true": "no" },
        { "text": "Infinite (Total Signal Loss)", "is_true": "no" }
    ],
    "v1_p1_t2_a_7": [
        { "text": "Because of Inter-Sample Peaks during D/A reconstruction", "is_true": "yes" },
        { "text": "It can't; -0.1dBFS is definitively safe from clipping", "is_true": "no" },
        { "text": "Because the speakers are damaged or broken", "is_true": "no" },
        { "text": "Because of the added Dither noise floor", "is_true": "no" }
    ],
    "v1_p1_t2_a_9": [
        { "text": "It plays faster and higher in pitch", "is_true": "yes" },
        { "text": "It plays slower and lower in pitch", "is_true": "no" },
        { "text": "Nothing changes; the DAW compensates", "is_true": "no" },
        { "text": "It plays backwards (Reverse)", "is_true": "no" }
    ],
    "v1_p1_t2_a_10": [
        { "text": "Signal reflection causing Jitter", "is_true": "yes" },
        { "text": "A potential fire hazard", "is_true": "no" },
        { "text": "Significantly lower output volume", "is_true": "no" },
        { "text": "Nothing; termination is optional", "is_true": "no" }
    ],
    "v1_p1_t2_m_2": [
        { "text": "The MSB (Most Significant Bit)", "is_true": "yes" },
        { "text": "The LSB (Least Significant Bit)", "is_true": "no" },
        { "text": "The Sign Bit (Polarity)", "is_true": "no" },
        { "text": "All bits are equally easy", "is_true": "no" }
    ],
    "v1_p1_t2_m_3": [
        { "text": "Simplify the analog anti-aliasing filter requirements", "is_true": "yes" },
        { "text": "Increase the file size for better quality", "is_true": "no" },
        { "text": "Reduce the round-trip latency to zero", "is_true": "no" },
        { "text": "Make the converter look cooler on the spec sheet", "is_true": "no" }
    ],
    "v1_p1_t2_m_4": [
        { "text": "Approx 100-200 picoseconds", "is_true": "yes" },
        { "text": "Approx 1 millisecond", "is_true": "no" },
        { "text": "Approx 1 microsecond", "is_true": "no" },
        { "text": "Approx 1 nanosecond", "is_true": "no" }
    ],
    "v1_p1_t2_m_5": [
        { "text": "Aliasing and Phase distortion", "is_true": "yes" },
        { "text": "Loss of stereo width information", "is_true": "no" },
        { "text": "Significant drop in overall volume", "is_true": "no" },
        { "text": "Increase in Dither noise floor", "is_true": "no" }
    ],
    "v1_p1_t2_m_7": [
        { "text": "Because the exponent scales the dynamic range to >1500dB", "is_true": "yes" },
        { "text": "Because it has a built-in safety limiter", "is_true": "no" },
        { "text": "Because it utilizes analog tape saturation emulation", "is_true": "no" },
        { "text": "Because it ignores standard digital audio rules", "is_true": "no" }
    ],
    "v1_p1_t2_m_8": [
        { "text": "Reduced headroom and clicks at edit points", "is_true": "yes" },
        { "text": "Loss of high frequency transients", "is_true": "no" },
        { "text": "Increased stereo width artificially", "is_true": "no" },
        { "text": "Slower playback speed of the file", "is_true": "no" }
    ],
    "v1_p1_t2_m_9": [
        { "text": "Correlated error (Harmonic Distortion)", "is_true": "yes" },
        { "text": "Random noise (White noise)", "is_true": "no" },
        { "text": "Less error than rounding methods", "is_true": "no" },
        { "text": "Improved bass response", "is_true": "no" }
    ]
}

import json
filepath = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'

with open(filepath, 'r') as f:
    data = json.load(f)

# Update Logic
count = 0
for vol in data['volumes']:
    if vol['id'] == 'vol1':
        for part in vol['parts']:
            if part['id'] == 'p1':
                for topic in part['topics']:
                    for level, questions in topic['levels'].items():
                        for q in questions:
                            if q['id'] in updates:
                                q['answers'] = updates[q['id']]
                                count += 1

print(f"Updated {count} questions for Part 1")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
