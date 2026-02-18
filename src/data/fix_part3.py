
import json

updates = {
    # TOPIC 5
    "v1_p3_t5_b_4": [
        { "text": "A device that converts energy from one form to another", "is_true": "yes" },
        { "text": "A software plugin that adds reverb to the signal", "is_true": "no" },
        { "text": "A type of guitar amplifier used for distortion", "is_true": "no" },
        { "text": "A digital file format for high resolution audio", "is_true": "no" }
    ],
    "v1_p3_t5_b_5": [
        { "text": "To boost the tiny mic signal to a usable line level", "is_true": "yes" },
        { "text": "To automatically tune the vocals to the correct pitch", "is_true": "no" },
        { "text": "To filter out background noise from the room recording", "is_true": "no" },
        { "text": "To convert the analog signal into MIDI note data", "is_true": "no" }
    ],
    "v1_p3_t5_b_6": [
        { "text": "To connect mics/instruments to the computer usually via USB/Thunderbolt", "is_true": "yes" },
        { "text": "To make the internet connection significantly faster for streaming", "is_true": "no" },
        { "text": "To serve as a dedicated hardware synthesizer for production", "is_true": "no" },
        { "text": "To provide power to the passive speakers in the studio", "is_true": "no" }
    ],
    "v1_p3_t5_b_7": [
        { "text": "Because they are designed to let you strictly 'monitor' the accuracy of the sound", "is_true": "yes" },
        { "text": "Because they historically had small CRT screens built into them", "is_true": "no" },
        { "text": "Because they are designed to be played at very low volumes", "is_true": "no" },
        { "text": "Because they monitor the room temperature and humidity levels", "is_true": "no" }
    ],
    "v1_p3_t5_b_8": [
        { "text": "Input List / Track Sheet", "is_true": "yes" },
        { "text": "Lyrics Sheet with Chords", "is_true": "no" },
        { "text": "Studio Rental Invoice", "is_true": "no" },
        { "text": "Technical Rider Agreement", "is_true": "no" }
    ],
    "v1_p3_t5_b_10": [
        { "text": "Gain is input sensitivity (pre-processing), Volume is output level (post-processing)", "is_true": "yes" },
        { "text": "Volume is for recording levels, Gain is strictly for listening levels", "is_true": "no" },
        { "text": "Gain makes the signal stereo, Volume keeps it mono", "is_true": "no" },
        { "text": "They are exactly the same thing and used interchangeably", "is_true": "no" }
    ],
    "v1_p3_t5_i_1": [
        { "text": "Line level is roughly 1000x stronger (60dB difference)", "is_true": "yes" },
        { "text": "Mic level is significantly louder than Line level", "is_true": "no" },
        { "text": "They are approximately the same voltage level", "is_true": "no" },
        { "text": "Line level is only about 3dB louder than Mic level", "is_true": "no" }
    ],
    "v1_p3_t5_i_3": [
        { "text": "Poor Signal-to-Noise Ratio (Hiss)", "is_true": "yes" },
        { "text": "Digital Clipping Distortion", "is_true": "no" },
        { "text": "Increased Dynamic Range", "is_true": "no" },
        { "text": "Higher Audio Fidelity", "is_true": "no" }
    ],
    "v1_p3_t5_i_4": [
        { "text": "Between the Preamp and the Computer", "is_true": "yes" },
        { "text": "Before the Microphone Input", "is_true": "no" },
        { "text": "After the Monitor Speakers", "is_true": "no" },
        { "text": "Inside the XLR Cable itself", "is_true": "no" }
    ],
    "v1_p3_t5_i_5": [
        { "text": "Listening to the input signal directly from the hardware, bypassing computer latency", "is_true": "yes" },
        { "text": "Monitoring via the DAW plugins with full effects processing active", "is_true": "no" },
        { "text": "Using a highly directional shotgun microphone for monitoring", "is_true": "no" },
        { "text": "Watching the musicians directly through the control room glass", "is_true": "no" }
    ],
    "v1_p3_t5_i_7": [
        { "text": "Increase the Buffer Size (e.g. to 512 or 1024 samples)", "is_true": "yes" },
        { "text": "Decrease the Buffer Size to the lowest possible setting", "is_true": "no" },
        { "text": "Change the sample rate to a lower resolution", "is_true": "no" },
        { "text": "Buy a new microphone with lower self-noise", "is_true": "no" }
    ],
    "v1_p3_t5_i_9": [
        { "text": "Attenuates (reduces) the input level by a fixed amount (e.g., -20dB)", "is_true": "yes" },
        { "text": "Adds soft padding to the sound for a warmer tone", "is_true": "no" },
        { "text": "Boosts the treble frequencies for more clarity", "is_true": "no" },
        { "text": "Mutes the output completely to prevent feedback", "is_true": "no" }
    ],
    "v1_p3_t5_i_10": [
        { "text": "The dynamic range available between the nominal level (-18dBFS) and clipping (0dBFS)", "is_true": "yes" },
        { "text": "The physical space above the singer's head and the microphone", "is_true": "no" },
        { "text": "The volume of the headphones relative to the speakers", "is_true": "no" },
        { "text": "The maximum reverb time available on the processor", "is_true": "no" }
    ],
    "v1_p3_t5_a_1": [
        { "text": "Dynamic Range (144dB for 24-bit)", "is_true": "yes" },
        { "text": "Frequency Response Bandwidth", "is_true": "no" },
        { "text": "Stereo Width and Imaging", "is_true": "no" },
        { "text": "Input Latency Speed", "is_true": "no" }
    ],
    "v1_p3_t5_a_3": [
        { "text": "Common Mode Rejection via Phase Cancellation", "is_true": "yes" },
        { "text": "Using thicker copper shielding on the cable", "is_true": "no" },
        { "text": "Boosting signal voltage to overpower noise", "is_true": "no" },
        { "text": "Digital error correction algorithms", "is_true": "no" }
    ],
    "v1_p3_t5_a_5": [
        { "text": "Low-level noise added when reducing bit-depth (e.g. 24-bit to 16-bit)", "is_true": "yes" },
        { "text": "Heavy compression applied during the mastering stage", "is_true": "no" },
        { "text": "A type of long reverb tail used for special effects", "is_true": "no" },
        { "text": "Noise removal software used to clean up recordings", "is_true": "no" }
    ],
    "v1_p3_t5_a_8": [
        { "text": "Input Buffer + Output Buffer + A/D Conversion + D/A Conversion", "is_true": "yes" },
        { "text": "Just the software processing time of the plugins", "is_true": "no" },
        { "text": "The physical length of the copper cables used", "is_true": "no" },
        { "text": "The refresh rate of the computer monitor screen", "is_true": "no" }
    ],
    "v1_p3_t5_a_9": [
        { "text": "Analog-modeled plugins behave non-linearly (saturate) if driven too hard", "is_true": "yes" },
        { "text": "Digital summing buses will clip immediately if 0dB is exceeded", "is_true": "no" },
        { "text": "It uses significantly less CPU power to keep levels low", "is_true": "no" },
        { "text": "It makes the final offline bounce / export faster", "is_true": "no" }
    ],
    "v1_p3_t5_m_1": [
        { "text": "Loss of stereo imaging and high-frequency 'smearing'", "is_true": "yes" },
        { "text": "Pitch shifting or 'wow and flutter' effects", "is_true": "no" },
        { "text": "Heavy distortion resembling a fuzz pedal", "is_true": "no" },
        { "text": "Complete signal dropouts and silence", "is_true": "no" }
    ],
    "v1_p3_t5_m_2": [
        { "text": "It ensures maximum voltage transfer with minimal current loss", "is_true": "yes" },
        { "text": "It maximizes power transfer (Watts) for driving speakers", "is_true": "no" },
        { "text": "It matches the resistance exactly to prevent reflections", "is_true": "no" },
        { "text": "It prevents standing waves in the cable transmission", "is_true": "no" }
    ],
    "v1_p3_t5_m_3": [
        { "text": "Signal reflections cause standing waves, leading to jitter or sync lock failure", "is_true": "yes" },
        { "text": "The signal becomes too quiet to be detected by the slave device", "is_true": "no" },
        { "text": "The cable overheats and melts due to excess energy", "is_true": "no" },
        { "text": "Nothing; modern devices do not require termination", "is_true": "no" }
    ],
    "v1_p3_t5_m_4": [
        { "text": "To remove frequencies above the Nyquist limit that would otherwise fold back as aliasing", "is_true": "yes" },
        { "text": "To make the sound warmer by rolling off high frequencies", "is_true": "no" },
        { "text": "To prevent DC offset from damaging the converter", "is_true": "no" },
        { "text": "To prevent the input stage from clipping analogously", "is_true": "no" }
    ],
    "v1_p3_t5_m_5": [
        { "text": "High channel count (up to 64) over a single cable up to 2km long", "is_true": "yes" },
        { "text": "Significantly better sound quality than other formats", "is_true": "no" },
        { "text": "It is much cheaper to implement in home studios", "is_true": "no" },
        { "text": "It is a wireless protocol requiring no cables", "is_true": "no" }
    ],
    "v1_p3_t5_m_6": [
        { "text": "It breaks the conductive loop between two chassis grounds, stopping circulating currents", "is_true": "yes" },
        { "text": "It filters out the specific 60Hz frequency using an EQ circuit", "is_true": "no" },
        { "text": "It increases the resistance of the cable to block the noise", "is_true": "no" },
        { "text": "It converts the electrical signal to an optical one", "is_true": "no" }
    ],
    "v1_p3_t5_m_8": [
        { "text": "Yes, because reconstruction filters can recreate peaks higher than the sample values (ISPs)", "is_true": "yes" },
        { "text": "No, digital meters are absolute and -0.1dBFS is safe", "is_true": "no" },
        { "text": "Only if the cable connecting the interface is faulty", "is_true": "no" },
        { "text": "Only if the sample rate is set to 44.1kHz", "is_true": "no" }
    ],
    "v1_p3_t5_m_10": [
        { "text": "It shifts quantization noise to ultra-high frequencies where it can be easily filtered", "is_true": "yes" },
        { "text": "It uses fewer bits to save hard drive space", "is_true": "no" },
        { "text": "It requires no anti-aliasing filtering whatsoever", "is_true": "no" },
        { "text": "It is a purely analog process with no digital stages", "is_true": "no" }
    ],

    # TOPIC 6
    "v1_p3_t6_b_2": [
        { "text": "To stop plosives (P and B sounds) from hitting the diaphragm", "is_true": "yes" },
        { "text": "To filter out background noise from the room", "is_true": "no" },
        { "text": "To make the singer look more professional", "is_true": "no" },
        { "text": "To automatically adjust the recording volume", "is_true": "no" }
    ],
    "v1_p3_t6_b_3": [
        { "text": "Large Diaphragm Condenser", "is_true": "yes" },
        { "text": "Dynamic Moving Coil Mic", "is_true": "no" },
        { "text": "Shotgun Interference Tube", "is_true": "no" },
        { "text": "Pressure Zone Microphone (PZM)", "is_true": "no" }
    ],
    "v1_p3_t6_b_5": [
        { "text": "To minimize room sound and background leakage", "is_true": "yes" },
        { "text": "To capture the natural room ambience fully", "is_true": "no" },
        { "text": "To reduce the amount of bass frequencies", "is_true": "no" },
        { "text": "To avoid mic feedback in the headphones", "is_true": "no" }
    ],
    "v1_p3_t6_b_7": [
        { "text": "To mechanically isolate the mic from floor rumbly and vibrations", "is_true": "yes" },
        { "text": "To electrically ground the mic to the stand", "is_true": "no" },
        { "text": "To provide phantom power to the microphone", "is_true": "no" },
        { "text": "To make the microphone look more impressive", "is_true": "no" }
    ],
    "v1_p3_t6_b_8": [
        { "text": "Angle the mic slightly off-axis or raise it above the mouth", "is_true": "yes" },
        { "text": "Move the mic significantly closer to the mouth", "is_true": "no" },
        { "text": "Turn up the treble on the preamp EQ", "is_true": "no" },
        { "text": "Switch to a Dynamic microphone immediately", "is_true": "no" }
    ],
    "v1_p3_t6_b_10": [
        { "text": "Never apply 48V Phantom Power (it can destroy the ribbon)", "is_true": "yes" },
        { "text": "Always apply 48V Phantom Power for best performance", "is_true": "no" },
        { "text": "Always hold it upside down while recording", "is_true": "no" },
        { "text": "Only use it on loud sources like kick drums", "is_true": "no" }
    ],
    "v1_p3_t6_i_3": [
        { "text": "At the sides (90 and 270 degrees)", "is_true": "yes" },
        { "text": "At the rear (180 degrees)", "is_true": "no" },
        { "text": "At the front (0 degrees)", "is_true": "no" },
        { "text": "It has no null points; it picks up everywhere", "is_true": "no" }
    ],
    "v1_p3_t6_i_4": [
        { "text": "To capture the natural ambience and frequency balance without proximity effect", "is_true": "yes" },
        { "text": "To isolate the source from the rest of the band", "is_true": "no" },
        { "text": "To focus strictly on the singer and reject room noise", "is_true": "no" },
        { "text": "To ensure maximum rejection of background noise", "is_true": "no" }
    ],
    "v1_p3_t6_i_5": [
        { "text": "When the sound pressure (SPL) is overloading the mic's internal circuit", "is_true": "yes" },
        { "text": "When the preamp input is clipping (red light)", "is_true": "no" },
        { "text": "When the singer is singing too quietly", "is_true": "no" },
        { "text": "Always; it improves the sound quality", "is_true": "no" }
    ],
    "v1_p3_t6_i_6": [
        { "text": "To reduce rumble, handling noise, and excessive proximity bass", "is_true": "yes" },
        { "text": "To remove high frequency sheen and sibilance", "is_true": "no" },
        { "text": "To make the recorded signal significantly louder", "is_true": "no" },
        { "text": "To cut the vocals out of a mixed track", "is_true": "no" }
    ],
    "v1_p3_t6_i_7": [
        { "text": "Phase cancellation if summed to mono", "is_true": "yes" },
        { "text": "Too much stereo width in the recording", "is_true": "no" },
        { "text": "Not enough bass response in the recording", "is_true": "no" },
        { "text": "Digital distortion on the inputs", "is_true": "no" }
    ],
    "v1_p3_t6_i_8": [
        { "text": "Distance between mics should be 3x the distance from mic to source", "is_true": "yes" },
        { "text": "Distance between mics should be equal to source distance", "is_true": "no" },
        { "text": "Microphones should be touching each other", "is_true": "no" },
        { "text": "Keep them exactly 1 foot apart at all times", "is_true": "no" }
    ],
    "v1_p3_t6_i_9": [
        { "text": "To ensure identical frequency response and sensitivity for a stable stereo image", "is_true": "yes" },
        { "text": "Because it is cheaper to buy them in a bundle", "is_true": "no" },
        { "text": "So they look similar on stage for aesthetics", "is_true": "no" },
        { "text": "So you have a spare one if the first one breaks", "is_true": "no" }
    ],
    "v1_p3_t6_a_1": [
        { "text": "Because the capsules are coincident (same point in space), eliminating phase differences", "is_true": "yes" },
        { "text": "Because it uses omnidirectional microphones exclusively", "is_true": "no" },
        { "text": "Because it is recorded to a single mono track", "is_true": "no" },
        { "text": "It isn't mono compatible; that is a myth", "is_true": "no" }
    ],
    "v1_p3_t6_a_2": [
        { "text": "Matrix: Mid + Side = Left, Mid - Side = Right", "is_true": "yes" },
        { "text": "Pan Mid Left, Side Right", "is_true": "no" },
        { "text": "Invert the Mid channel phase", "is_true": "no" },
        { "text": "Use a stereo delay plugin", "is_true": "no" }
    ],
    "v1_p3_t6_a_3": [
        { "text": "Two cardioids spaced 17cm apart, angled 110 degrees", "is_true": "yes" },
        { "text": "Two omnis spaced 50cm apart, parallel", "is_true": "no" },
        { "text": "Two figure-8s crossed at 90 degrees", "is_true": "no" },
        { "text": "One cardioid facing forward, one figure-8 sideways", "is_true": "no" }
    ],
    "v1_p3_t6_a_4": [
        { "text": "Small Diaphragm Condenser (SDC)", "is_true": "yes" },
        { "text": "Large Diaphragm Dynamic (Moving Coil)", "is_true": "no" },
        { "text": "Passive Ribbon Microphone", "is_true": "no" },
        { "text": "Carbon Microphone", "is_true": "no" }
    ],
    "v1_p3_t6_a_5": [
        { "text": "Sound entering from the side sounds muddy or unnatural", "is_true": "yes" },
        { "text": "It becomes too bright and sibilant", "is_true": "no" },
        { "text": "It induces immediate feedback loops", "is_true": "no" },
        { "text": "It inverts polarity of the signal", "is_true": "no" }
    ],
    "v1_p3_t6_a_6": [
        { "text": "It has a small 'lobe' of sensitivity directly at the rear", "is_true": "yes" },
        { "text": "It is completely dead (null) at the back", "is_true": "no" },
        { "text": "It behaves like an omni at low frequencies", "is_true": "no" },
        { "text": "It cannot handle high sound pressure levels", "is_true": "no" }
    ],
    "v1_p3_t6_a_7": [
        { "text": "By placing the capsule flush with a surface, eliminating the reflection delay", "is_true": "yes" },
        { "text": "By using advanced internal digital processing", "is_true": "no" },
        { "text": "It doesn't; it is just a different shape", "is_true": "no" },
        { "text": "By using two capsules out of phase", "is_true": "no" }
    ],
    "v1_p3_t6_a_10": [
        { "text": "It has a permanently charged backplate and doesn't need high voltage for the capsule", "is_true": "yes" },
        { "text": "It provides significantly higher audio quality", "is_true": "no" },
        { "text": "It is a dynamic mic, not a condenser", "is_true": "no" },
        { "text": "It requires AC power from a wall outlet", "is_true": "no" }
    ],
    "v1_p3_t6_m_1": [
        { "text": "Two Figure-8 mics crossed at 90 degrees", "is_true": "yes" },
        { "text": "Two Omnis spaced 1 meter apart", "is_true": "no" },
        { "text": "One Cardioid and One Figure-8", "is_true": "no" },
        { "text": "Two Shotguns placed parallel", "is_true": "no" }
    ],
    "v1_p3_t6_m_2": [
        { "text": "Three Omnidirectional mics in a Triangle (Left, Right, Center)", "is_true": "yes" },
        { "text": "Two Cardioid mics spaced apart", "is_true": "no" },
        { "text": "Four Figure-8 mics in a square", "is_true": "no" },
        { "text": "One Stereo microphone", "is_true": "no" }
    ],
    "v1_p3_t6_m_3": [
        { "text": "By combining signals from dual diaphragms and varying polarity/voltage", "is_true": "yes" },
        { "text": "By mechanically moving the capsule housing", "is_true": "no" },
        { "text": "By using digital DSP processing inside the mic", "is_true": "no" },
        { "text": "By using different EQ curvs", "is_true": "no" }
    ],
    "v1_p3_t6_m_5": [
        { "text": "To create an acoustic shadow between two spaced omnis, simulating a human head", "is_true": "yes" },
        { "text": "To reflect sound into the rear of the mics", "is_true": "no" },
        { "text": "To hold the cables neatly in place", "is_true": "no" },
        { "text": "To block wind noise outdoors", "is_true": "no" }
    ],
    "v1_p3_t6_m_6": [
        { "text": "Larger surface area captures more electrons (signal), resulting in better SNR", "is_true": "yes" },
        { "text": "They use vacuum tubes which are quieter", "is_true": "no" },
        { "text": "They use newer technology than small diaphragms", "is_true": "no" },
        { "text": "They have built-in noise gates", "is_true": "no" }
    ],
    "v1_p3_t6_m_8": [
        { "text": "No, there will be some comb filtering due to the 30cm spacing", "is_true": "yes" },
        { "text": "Yes, it is perfectly mono compatible", "is_true": "no" },
        { "text": "Only if using ribbon microphones", "is_true": "no" },
        { "text": "Only in a vacuum environment", "is_true": "no" }
    ],
    "v1_p3_t6_m_9": [
        { "text": "To prevent damping the ribbon movement, which destroys high frequency response", "is_true": "yes" },
        { "text": "To protect it from phantom power damage", "is_true": "no" },
        { "text": "To add necessary distortion to the signal", "is_true": "no" },
        { "text": "To make the polar pattern cardioid", "is_true": "no" }
    ],
    "v1_p3_t6_m_10": [
        { "text": "Because crosstalk from speakers destroys the HRTF (Head Related Transfer Function) spatial cues", "is_true": "yes" },
        { "text": "Because they are too quiet to be heard on speakers", "is_true": "no" },
        { "text": "Because they are mono and sound bad on stereo speakers", "is_true": "no" },
        { "text": "Because they contain dangerous subsonic frequencies", "is_true": "no" }
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
            if part['id'] == 'p3':
                for topic in part['topics']:
                    for level, questions in topic['levels'].items():
                        for q in questions:
                            if q['id'] in updates:
                                q['answers'] = updates[q['id']]
                                count += 1

print(f"Updated {count} questions for Part 3")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
