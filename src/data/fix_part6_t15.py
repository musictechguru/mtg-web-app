
import json

updates = {
    "v1_p6_t15_b_1": [
        { "text": "Decibels Full Scale (Digital Metering)", "is_true": "yes" },
        { "text": "Decibels Frequency Standard (Analog Metering)", "is_true": "no" },
        { "text": "Decibels For Sound (General Volume)", "is_true": "no" },
        { "text": "Digital Bass Frequency Scale (Low End)", "is_true": "no" }
    ],
    "v1_p6_t15_b_2": [
        { "text": "The signal has clipped (hit 0dBFS or above)", "is_true": "yes" },
        { "text": "The signal is too quiet and needs boosting", "is_true": "no" },
        { "text": "The recording has finished successfully", "is_true": "no" },
        { "text": "The microphone phantom power is turned off", "is_true": "no" }
    ],
    "v1_p6_t15_b_3": [
        { "text": "Slow (averaging approx 300ms)", "is_true": "yes" },
        { "text": "Instant (0ms response time)", "is_true": "no" },
        { "text": "Super fast (1ms peak response)", "is_true": "no" },
        { "text": "Variable (depending on frequency)", "is_true": "no" }
    ],
    "v1_p6_t15_b_4": [
        { "text": "Measuring perceived loudness for broadcast and streaming standards (e.g. Netflix, Spotify)", "is_true": "yes" },
        { "text": "Measuring the absolute peak voltage of a transient signal to prevent digital clipping", "is_true": "no" },
        { "text": "Tuning musical instruments to a specific reference pitch during a recording session", "is_true": "no" },
        { "text": "Measuring the length of audio cables to ensure they don't introduce latency", "is_true": "no" }
    ],
    "v1_p6_t15_b_5": [
        { "text": "Peak Meter (Sample Peak)", "is_true": "yes" },
        { "text": "RMS Meter (Average Level)", "is_true": "no" },
        { "text": "VU Meter (Volume Unit)", "is_true": "no" },
        { "text": "Thermometer (Temperature)", "is_true": "no" }
    ],
    "v1_p6_t15_b_6": [
        { "text": "Root Mean Square (Mathematical Average)", "is_true": "yes" },
        { "text": "Real Music Sound (Perceived Volume)", "is_true": "no" },
        { "text": "Random Mono Signal (Noise Floor)", "is_true": "no" },
        { "text": "Right Mid Side (Stereo Width)", "is_true": "no" }
    ],
    "v1_p6_t15_b_7": [
        { "text": "A healthy, strong signal level (approaching but not hitting the danger zone)", "is_true": "yes" },
        { "text": "A warning that the signal has already clipped and is distorting significantly", "is_true": "no" },
        { "text": "The signal is too quiet and will be lost in the noise floor of the system", "is_true": "no" },
        { "text": "The signal has been converted to mono due to phase cancellation issues", "is_true": "no" }
    ],
    "v1_p6_t15_b_8": [
        { "text": "Dynamic (There is an 18dB gap/crest factor, meaning lots of punch)", "is_true": "yes" },
        { "text": "Squashed (The peak and RMS are almost identical, meaning low punch)", "is_true": "no" },
        { "text": "Silent (The levels are too low to be heard clearly on speakers)", "is_true": "no" },
        { "text": "Broken (The meter is malfunctioning because the gap is too wide)", "is_true": "no" }
    ],
    "v1_p6_t15_b_9": [
        { "text": "Amplitude (volume) across the Frequency spectrum (Bass to Treble)", "is_true": "yes" },
        { "text": "Volume changes over time (Dynamics) for a single frequency band", "is_true": "no" },
        { "text": "Stereo width and phase correlation between left and right channels", "is_true": "no" },
        { "text": "Phase alignment between two different microphones on the same source", "is_true": "no" }
    ],
    "v1_p6_t15_b_10": [
        { "text": "Phase relationship between Left and Right channels (+1 is Mono, -1 is Out of Phase)", "is_true": "yes" },
        { "text": "The overall volume difference between the input and output stages of a plugin", "is_true": "no" },
        { "text": "The pitch accuracy of a vocal performance relative to the song's key", "is_true": "no" },
        { "text": "The temperature of the internal components of an analog amplifier", "is_true": "no" }
    ],
    "v1_p6_t15_i_1": [
        { "text": "-14 LUFS", "is_true": "yes" },
        { "text": "0 LUFS", "is_true": "no" },
        { "text": "-23 LUFS", "is_true": "no" },
        { "text": "-100 LUFS", "is_true": "no" }
    ],
    "v1_p6_t15_i_2": [
        { "text": "Super fast attack (10ms) but slow decay, designed to let broadcasters see peaks before they distorted transmitters", "is_true": "yes" },
        { "text": "Slow attack (300ms) matched to human hearing, designed to show average loudness rather than peaks", "is_true": "no" },
        { "text": "It is exactly identical to a VU meter but uses a digital display instead of a needle", "is_true": "no" },
        { "text": "It measures only low-frequency content to prevent subwoofer overload in cinema systems", "is_true": "no" }
    ],
    "v1_p6_t15_i_3": [
        { "text": "A standard calibrating 0dB on the meter to different monitor SPL levels (-20dBFS, -14dBFS) to encourage dynamic range", "is_true": "yes" },
        { "text": "A keyboard shortcut system used by mastering engineers to switch between reference tracks quickly", "is_true": "no" },
        { "text": "A type of synthesizer tuning system that ensures all oscillators remain in perfect phase", "is_true": "no" },
        { "text": "A fast mixing trick involving parallel compression on the kick and snare drums only", "is_true": "no" }
    ],
    "v1_p6_t15_i_4": [
        { "text": "The sample meter only checks the dots; the True Peak meter calculates the curve between dots (Intersample Peaks)", "is_true": "yes" },
        { "text": "The True peak meter is calibrated to a higher reference voltage than the standard sample meter", "is_true": "no" },
        { "text": "The sample meter takes an average over time, whereas the True Peak meter is instantaneous", "is_true": "no" },
        { "text": "The True Peak meter adds a safety buffer of +2dB to ensuring no clipping occurs", "is_true": "no" }
    ],
    "v1_p6_t15_i_5": [
        { "text": "The variation in loudness over the track (Macrodynamics) in LU", "is_true": "yes" },
        { "text": "The absolute peak level reached during the loudest section", "is_true": "no" },
        { "text": "The level of the noise floor relative to the signal", "is_true": "no" },
        { "text": "The stereo width of the signal at any given moment", "is_true": "no" }
    ],
    "v1_p6_t15_i_6": [
        { "text": "Stereo Width and Phase. A vertical line is Mono; a flat horizontal line is Out of Phase", "is_true": "yes" },
        { "text": "Frequency Spectrum. Left is Bass, Right is Treble, Height is Volume", "is_true": "no" },
        { "text": "Harmonic Distortion. Spikes indicate the presence of odd or even harmonics", "is_true": "no" },
        { "text": "Reverb Time. The tail length indicates the RT60 of the room", "is_true": "no" }
    ],
    "v1_p6_t15_i_7": [
        { "text": "Heavy limiting/clipping with almost zero dynamic range - looks like a solid block", "is_true": "yes" },
        { "text": "A high-quality recording with excellent dynamic contrast and transient detail", "is_true": "no" },
        { "text": "A very quiet recording that needs to be normalized to be audible", "is_true": "no" },
        { "text": "A track with excessive bass frequencies causing the waveform to look thick", "is_true": "no" }
    ],
    "v1_p6_t15_i_8": [
        { "text": "Because the mechanical needle is too heavy to move instantly; it misses the initial transient spike", "is_true": "yes" },
        { "text": "Because the meter is broken and needs to be recalibrated by a technician", "is_true": "no" },
        { "text": "Because snare drums simply do not have enough energy to move a VU meter needle", "is_true": "no" },
        { "text": "Because the circuitry filters out high frequencies where the snare attack lives", "is_true": "no" }
    ],
    "v1_p6_t15_i_9": [
        { "text": "The indicator stays at the highest reached value for a few seconds so you can see what the transient was after it vanished", "is_true": "yes" },
        { "text": "To strictly freeze the audio output when a peak is detected to prevent speaker damage", "is_true": "no" },
        { "text": "To overload the computer CPU momentarily to verify system stability under heavy load", "is_true": "no" },
        { "text": "To create a visually pleasing light show that syncs with the music's tempo", "is_true": "no" }
    ],
    "v1_p6_t15_i_10": [
        { "text": "A filter curve that mimics human hearing by ignoring sub-bass and ultra-highs, focusing on the midrange", "is_true": "yes" },
        { "text": "A measurement of Total Harmonic Distortion (THD) present in the signal path", "is_true": "no" },
        { "text": "A measurement focusing exclusively on low-frequency energy below 100Hz", "is_true": "no" },
        { "text": "A measurement of the absolute peak voltage regardless of frequency content", "is_true": "no" }
    ],
    "v1_p6_t15_a_1": [
        { "text": "The European Broadcasting Union standard for loudness normalization (Target -23 LUFS) for TV", "is_true": "yes" },
        { "text": "A synthesizer protocol for connecting modular eurorack equipment developed in Europe", "is_true": "no" },
        { "text": "A type of balanced audio cable connector commonly used in broadcast facilities", "is_true": "no" },
        { "text": "An internet streaming protocol used for transmitting high-resolution audio", "is_true": "no" }
    ],
    "v1_p6_t15_a_2": [
        { "text": "K-Weighting models the head's acoustic effect (shelf boost above 2kHz) to better estimate perceived loudness for broadcast", "is_true": "yes" },
        { "text": "K-Weighting is designed for underwater acoustics where sound propagation is significantly faster", "is_true": "no" },
        { "text": "K-Weighting cuts the midrange frequencies to focus entirely on bass and treble energy", "is_true": "no" },
        { "text": "K-Weighting is a perfectly linear response with no frequency bias, unlike A-weighting", "is_true": "no" }
    ],
    "v1_p6_t15_a_3": [
        { "text": "Channel 4 (L R C LFE Ls Rs) in SMPTE order, though it varies", "is_true": "yes" },
        { "text": "Channel 1 (LFE R C L Ls Rs) in standard film order", "is_true": "no" },
        { "text": "Channel 2 (L LFE C R Ls Rs) in DTS order", "is_true": "no" },
        { "text": "Channel 6 (L R C Ls Rs LFE) in AAC order", "is_true": "no" }
    ],
    "v1_p6_t15_a_4": [
        { "text": "The speed at which the meter rises (Attack) and falls (Decay/Release)", "is_true": "yes" },
        { "text": "The physical weight of the meter movement mechanism in analog gear", "is_true": "no" },
        { "text": "Whether the meter uses LED bullets or a moving needle display", "is_true": "no" },
        { "text": "The accuracy of the color representation on the meter scale", "is_true": "no" }
    ],
    "v1_p6_t15_a_5": [
        { "text": "To spot specific loud sections (like a chorus explosion) that might be too jarring compared to the verse", "is_true": "yes" },
        { "text": "To check the noise floor level during the silent sections of the song", "is_true": "no" },
        { "text": "To check the loudness at the very end of the song for fade-out smoothness", "is_true": "no" },
        { "text": "To check the panning balance between the left and right channels", "is_true": "no" }
    ],
    "v1_p6_t15_a_6": [
        { "text": "Usually up to +3dB, sometimes more in extreme cases, causing distortion in the D/A chip", "is_true": "yes" },
        { "text": "Never, digital audio cannot physically exceed 0dBFS under any circumstances", "is_true": "no" },
        { "text": "A maximum of 0.1dB, which is negligible and inaudible to the human ear", "is_true": "no" },
        { "text": "Infinitely, as floating point audio has no upper limit on signal level", "is_true": "no" }
    ],
    "v1_p6_t15_a_7": [
        { "text": "Increases frequency resolution (better bass detail) but decreases time resolution (slower/blurrier visual response)", "is_true": "yes" },
        { "text": "Increases the speed of the analyzer display making it respond instantly to transients", "is_true": "no" },
        { "text": "Makes the signal appear louder on the display by summing more samples together", "is_true": "no" },
        { "text": "Decreases the CPU usage significantly by processing the audio in larger chunks", "is_true": "no" }
    ],
    "v1_p6_t15_a_8": [
        { "text": "A history of frequency over time (resembling a heat map), allowing you to see the duration of notes or noise tails", "is_true": "yes" },
        { "text": "The precise peak levels of every frequency at the exact current moment only", "is_true": "no" },
        { "text": "The stereo width correlation between the left and right channels", "is_true": "no" },
        { "text": "The reverb settings used on the track including decay time and pre-delay", "is_true": "no" }
    ],
    "v1_p6_t15_a_9": [
        { "text": "It tilts the visual display to approximate Pink Noise (flat line) instead of White Noise (rising line), matching human hearing better", "is_true": "yes" },
        { "text": "It physically tilts the speakers to align the tweeter axis with the listener's ears", "is_true": "no" },
        { "text": "It applies a shelving EQ boost to the signal to make it sound brighter for analysis", "is_true": "no" },
        { "text": "It removes bass frequencies from the display to focus entirely on the midrange", "is_true": "no" }
    ],
    "v1_p6_t15_a_10": [
        { "text": "The meter pauses measurement during silence to prevent silent gaps from dragging down the average loudness score", "is_true": "yes" },
        { "text": "It automatically mutes the dialog track when the music volume gets too loud", "is_true": "no" },
        { "text": "It boosts the dialog track automatically to ensure it meets the target loudness", "is_true": "no" },
        { "text": "It adds a reverb effect to the dialog to make it blend better with background fx", "is_true": "no" }
    ],
    "v1_p6_t15_m_1": [
        { "text": "It adds a +3dB offset so that a sine wave reads the same level on both RMS and Peak meters (-20dB RMS = -20dB Peak)", "is_true": "yes" },
        { "text": "It removes bass frequencies below 20Hz to prevent meter inaccuracies from rumble", "is_true": "no" },
        { "text": "It defines the standard pinout configuration for XLR connectors (Pin 2 Hot)", "is_true": "no" },
        { "text": "It sets the standard sample rate for broadcast audio at 48kHz", "is_true": "no" }
    ],
    "v1_p6_t15_m_2": [
        { "text": "Measuring loudness for Cinema film trailers (focusing on mid-range annoyance frequencies) to prevent ear fatigue", "is_true": "yes" },
        { "text": "Measuring the volume of liquid in a hydraulic system to prevent overflow", "is_true": "no" },
        { "text": "Measuring strictly low-frequency bass content for subwoofer calibration", "is_true": "no" },
        { "text": "Measuring the loudness of music streaming services to ensure consistent playback", "is_true": "no" }
    ],
    "v1_p6_t15_m_3": [
        { "text": "0VU (+4dBu) should output 83dB SPL (C-weighted slow) at the listening position", "is_true": "yes" },
        { "text": "0VU should output 100dB SPL to ensure maximum dynamic impact", "is_true": "no" },
        { "text": "0VU should output 60dB SPL to prevent hearing damage during long mix sessions", "is_true": "no" },
        { "text": "It doesn't matter; monitor calibration is a personal preference and has no standard", "is_true": "no" }
    ],
    "v1_p6_t15_m_4": [
        { "text": "A stereo signal with 90-degree phase shift between L and R", "is_true": "yes" },
        { "text": "A perfectly Mono signal (Playing identical content on L and R)", "is_true": "no" },
        { "text": "Total Silence (No signal present on either channel)", "is_true": "no" },
        { "text": "A signal panned hard Left with nothing on the Right channel", "is_true": "no" }
    ],
    "v1_p6_t15_m_5": [
        { "text": "To increase the time-domain resolution, allowing the limiter to catch intersample peaks that would slip between sample points at 44.1kHz", "is_true": "yes" },
        { "text": "To add analog warmth and saturation to the signal by emulating tube circuitry", "is_true": "no" },
        { "text": "To purposefully use more CPU power to prevent other plugins from running", "is_true": "no" },
        { "text": "To reduce the lookahead latency of the limiter for live performance use", "is_true": "no" }
    ],
    "v1_p6_t15_m_6": [
        { "text": "It allows viewing Peak and Average simultaneously on an arc, showing the 'Crest Factor' visually", "is_true": "yes" },
        { "text": "It is blue, whereas most other standard meters are green, yellow, and red", "is_true": "no" },
        { "text": "It measures voltage only, ignoring the current aspect of the signal", "is_true": "no" },
        { "text": "It is inverted, with 0dB at the bottom and -inf at the top", "is_true": "no" }
    ],
    "v1_p6_t15_m_7": [
        { "text": "It reduces spectral leakage (smearing) by tapering the edges of the analysis block, improving frequency precision at the cost of amplitude accuracy", "is_true": "yes" },
        { "text": "It literally closes the spectral window, stopping the analysis from updating", "is_true": "no" },
        { "text": "It changes the color scheme of the analyzer window to match the DAW theme", "is_true": "no" },
        { "text": "It filters out bass frequencies to allow for higher resolution in the treble range", "is_true": "no" }
    ],
    "v1_p6_t15_m_8": [
        { "text": "To see specific narrow resonant room modes (standing waves) that 1/3 octave smoothing would smudge and hide", "is_true": "yes" },
        { "text": "Because it is faster for the computer to calculate than 1/3 octave smoothing", "is_true": "no" },
        { "text": "1/3 octave is actually better for room modes, but 1/12 looks more impressive", "is_true": "no" },
        { "text": "To make the graph look more professional to clients who don't understand acoustics", "is_true": "no" }
    ],
    "v1_p6_t15_m_9": [
        { "text": "10ms vs 5ms. The DIN scale is slightly slower/more forgiving of ultra-fast transients", "is_true": "yes" },
        { "text": "1 second vs 3 seconds. The DIN scale is extremely slow and used for loudness averaging", "is_true": "no" },
        { "text": "It is instant. The DIN scale has absolutely zero attack time latency", "is_true": "no" },
        { "text": "It is backwards. The DIN scale measures silence instead of volume", "is_true": "no" }
    ],
    "v1_p6_t15_m_10": [
        { "text": "The reliability of the measurement. Low coherence means the mic is measuring reflections/noise, not the direct speaker signal", "is_true": "yes" },
        { "text": "The overall volume level of the system being measured in decibels", "is_true": "no" },
        { "text": "The phase relationship between the subwoofer and the main speakers", "is_true": "no" },
        { "text": "The pitch accuracy of the test tones being used for measurement", "is_true": "no" }
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
            if part['id'] == 'p6':
                for topic in part['topics']:
                    for level, questions in topic['levels'].items():
                        for q in questions:
                            if q['id'] in updates:
                                q['answers'] = updates[q['id']]
                                count += 1

print(f"Updated {count} questions for Topic 15")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
