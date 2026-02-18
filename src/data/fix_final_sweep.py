
import json

updates = {
    # PART 6 - TOPIC 14
    "v1_p6_t14_a_4": [
        { "text": "It lowers the noise floor significantly (-144dB theoretical), allowing for lower recording levels with less risk of noise hiss", "is_true": "yes" },
        { "text": "It makes the music sound louder and punchier instantly due to digital magic", "is_true": "no" },
        { "text": "It doubles the frequency response range allowing for dog-whistle sounds", "is_true": "no" },
        { "text": "It uses more hard drive space but offers no real sonic improvement", "is_true": "no" }
    ],
    "v1_p6_t14_m_2": [
        { "text": "It pushes quantization noise energy out of the audible band (typically into high frequencies) where ears are less sensitive", "is_true": "yes" },
        { "text": "It removes all noise from the recording making it perfectly silence", "is_true": "no" },
        { "text": "It compresses the dynamic range to make quiet sounds much louder", "is_true": "no" },
        { "text": "It shapes the noise into a musical waveform that harmonizes with the song", "is_true": "no" }
    ],
    "v1_p6_t14_m_3": [
        { "text": "Because downstream stages amplify both the signal AND the noise of the first stage; noise added early cannot be removed later", "is_true": "yes" },
        { "text": "Because the first stage is always the most expensive component in the chain", "is_true": "no" },
        { "text": "It isn't critical; modern noise reduction plugins can fix anything", "is_true": "no" },
        { "text": "Because the first stage usually has the lowest gain capability", "is_true": "no" }
    ],
    "v1_p6_t14_m_5": [
        { "text": "By ensuring signal levels stay well below 0dBFS, avoiding the non-linear saturation region where aliasing harmonics are generated", "is_true": "yes" },
        { "text": "It cannot; aliasing is a random digital error independent of level", "is_true": "no" },
        { "text": "By increasing the sample rate automatically when levels get too hot", "is_true": "no" },
        { "text": "By filtering out all high frequencies above 10kHz to be safe", "is_true": "no" }
    ],
    "v1_p6_t14_m_8": [
        { "text": "It eats up headroom invisibly. A 50% DC offset means the positive cycle clips at -6dBFS instead of 0dBFS (causing asymmetric clipping)", "is_true": "yes" },
        { "text": "It adds a low frequency hum that masks the bass guitar frequencies", "is_true": "no" },
        { "text": "It does not affect gain staging at all, only the final mixdown file size", "is_true": "no" },
        { "text": "It causes the speakers to heat up and eventually catch fire", "is_true": "no" }
    ],

    # PART 6 - TOPIC 15
    "v1_p6_t15_a_9": [
        { "text": "Usually 3dB/oct or 4.5dB/oct (Pink Noise scaling), so that 'flat' response looks flat on the screen (compensating for log frequency)", "is_true": "yes" },
        { "text": "It is always set to 0dB/oct which is the only accurate scientific standard", "is_true": "no" },
        { "text": "It depends on the volume of the music being played at the time", "is_true": "no" },
        { "text": "It is set to 12dB/oct to match the slope of a standard Low Pass Filter", "is_true": "no" }
    ],
    "v1_p6_t15_m_5": [
        { "text": "To detect 'Inter-Sample Peaks' (True Peak) that occur between samples, which would otherwise cause clipping on D/A conversion", "is_true": "yes" },
        { "text": "To make the plugin use more CPU power which justifies the high price tag", "is_true": "no" },
        { "text": "To improve the bass response of the limiter for electronic music", "is_true": "no" },
        { "text": "To reduce the latency of the plugin to zero for live tracking", "is_true": "no" }
    ],
    "v1_p6_t15_m_7": [
        { "text": "It tapers the edges of the time block to zero to prevent 'spectral leakage' (smearing) in the frequency display", "is_true": "yes" },
        { "text": "It opens a new window on the computer screen for the analyzer view", "is_true": "no" },
        { "text": "It cleans the signal of all noise before analysis begins", "is_true": "no" },
        { "text": "It determines how fast the analyzer reacts to the music signal", "is_true": "no" }
    ],
    "v1_p6_t15_m_10": [
        { "text": "The correlation between the reference and measurement signals (Data Confidence). Low coherence means the measurement is invalid (e.g. noise/reverb)", "is_true": "yes" },
        { "text": "The volume level difference between the speakers and the microphone", "is_true": "no" },
        { "text": "The phase alignment of the subwoofer to the main PA system", "is_true": "no" },
        { "text": "The amount of distortion present in the amplifier circuit", "is_true": "no" }
    ],

    # PART 6 - TOPIC 16
    "v1_p6_t16_i_6": [
        { "text": "An Expander turns down quiet signals gently (e.g. 1:2 ratio), whereas a Gate cuts them off abruptly (Infinity:1)", "is_true": "yes" },
        { "text": "They are exactly the same thing just different brand names", "is_true": "no" },
        { "text": "A Gate makes quiet sounds louder, an Expander makes loud sounds quieter", "is_true": "no" },
        { "text": "An Expander is digital while a Gate is an analog device", "is_true": "no" }
    ],
    "v1_p6_t16_a_4": [
        { "text": "Quantization noise becomes extremely loud and correlated to the signal, creating a 'gritty' or fuzz-like distortion texture", "is_true": "yes" },
        { "text": "The file size increases significantly due to bit crushing algorithms", "is_true": "no" },
        { "text": "The audio plays back at half the normal speed and pitch", "is_true": "no" },
        { "text": "Nothing happens; the resolution is virtually indistinguishable", "is_true": "no" }
    ],
    "v1_p6_t16_m_1": [
        { "text": "Because the analog front-end (thermal noise, circuit noise) has a noise floor higher than the theoretical floor of 24-bit (-144dB)", "is_true": "yes" },
        { "text": "Because manufacturers lie about specifications to sell more units", "is_true": "no" },
        { "text": "Because computers cannot process true 24-bit audio in real time", "is_true": "no" },
        { "text": "Because the last 3 bits are used for parity checking only", "is_true": "no" }
    ],
    "v1_p6_t16_m_4": [
        { "text": "It creates modulation sidebands around frequencies, blurring transients and raising the noise floor which narrows the stereo image", "is_true": "yes" },
        { "text": "It creates a rhythmic ticking sound like a metronome", "is_true": "no" },
        { "text": "It cuts out the audio completely every few seconds", "is_true": "no" },
        { "text": "It boosts the bass frequencies significantly causing mud", "is_true": "no" }
    ],

    # PART 5 - TOPIC 12
    "v1_p5_t12_m_1": [
        { "text": "The dynamic range is >1500dB. Values above 0dB are preserved, not truncated, so you can just turn the Master down to recover the audio", "is_true": "yes" },
        { "text": "Floating point math essentially eliminates all forms of digital clipping forever", "is_true": "no" },
        { "text": "The software automatically applies a limiter to every single channel", "is_true": "no" },
        { "text": "It uses a special proprietary format that ignores standard audio rules", "is_true": "no" }
    ],
    "v1_p5_t12_m_3": [
        { "text": "Audio Subgroups add a tiny processing delay (latency) which can comb-filter against the parallel dry signal; VCAs add zero latency", "is_true": "yes" },
        { "text": "Subgroups are much lower quality than VCA faders in digital desks", "is_true": "no" },
        { "text": "VCAs introduce a significant delay which corrects the phase alignment", "is_true": "no" },
        { "text": "Phasing allows the mix to sit better in the stereo field", "is_true": "no" }
    ],
    "v1_p5_t12_m_7": [
        { "text": "It adds a relative offset to existing automation moves (scaling them up/down) without overwriting the original intricate moves", "is_true": "yes" },
        { "text": "It cuts the automation data completely to start fresh for that section", "is_true": "no" },
        { "text": "It smooths out all the jagged edges of the automation envelope", "is_true": "no" },
        { "text": "It locks the automation so it cannot be changed by accident", "is_true": "no" }
    ],
    
    # PART 5 - TOPIC 13
    "v1_p5_t13_i_9": [
        { "text": "Because reverb IS delay. A few milliseconds of pre-delay on a reverb return sounds natural. On an insert (Dry), it causes phasing", "is_true": "yes" },
        { "text": "It is actually critical to have zero latency on every single channel", "is_true": "no" },
        { "text": "Latency on returns makes the reverb sound significantly wider", "is_true": "no" },
        { "text": "Inserts are parallel processes so latency does not affect them", "is_true": "no" }
    ],
    "v1_p5_t13_m_6": [
        { "text": "To prevent the heavy kick drum energy from triggering the compressor, allowing the mix to breathe while still compressing mids", "is_true": "yes" },
        { "text": "To remove the low frequency content from the final master output", "is_true": "no" },
        { "text": "To make the compressor attack much faster than normal", "is_true": "no" },
        { "text": "To avoid distorting the sub frequencies of the song", "is_true": "no" }
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
            # Check mainly Part 5 and Part 6, but loop all to find IDs
            for topic in part['topics']:
                for level, questions in topic['levels'].items():
                    for q in questions:
                        if q['id'] in updates:
                            q['answers'] = updates[q['id']]
                            count += 1

print(f"Updated {count} questions for Final Sweep")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
