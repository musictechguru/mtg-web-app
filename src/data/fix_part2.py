
import json

updates = {
    # TOPIC 3
    "v1_p2_t3_b_1": [
        { "text": "To connect microphones and instruments to a computer", "is_true": "yes" },
        { "text": "To make the computer run significantly faster", "is_true": "no" },
        { "text": "To act as a software synthesizer for MIDI", "is_true": "no" },
        { "text": "To play video games with surround sound", "is_true": "no" }
    ],
    "v1_p2_t3_b_3": [
        { "text": "Because microphone signals are very weak and need boosting", "is_true": "yes" },
        { "text": "Because they add necessary analog distortion to the signal", "is_true": "no" },
        { "text": "Because they filter out all background noise automatically", "is_true": "no" },
        { "text": "They don't strictly need them; it's an optional coloration", "is_true": "no" }
    ],
    "v1_p2_t3_b_4": [
        { "text": "Input Gain (or Trim)", "is_true": "yes" },
        { "text": "The Volume Fader", "is_true": "no" },
        { "text": "The Reverb Send Level", "is_true": "no" },
        { "text": "The Pan Control", "is_true": "no" }
    ],
    "v1_p2_t3_b_7": [
        { "text": "The output volume balance of that channel in the mix", "is_true": "yes" },
        { "text": "The input sensitivity of the microphone preamp", "is_true": "no" },
        { "text": "The sample rate of the recording software", "is_true": "no" },
        { "text": "The stereo panning position of the audio", "is_true": "no" }
    ],
    "v1_p2_t3_b_10": [
        { "text": "Closed-Back (to prevent sound leaking into the mic)", "is_true": "yes" },
        { "text": "Open-Back (because they have better soundstage)", "is_true": "no" },
        { "text": "Earbuds (because they are lightweight and cheap)", "is_true": "no" },
        { "text": "Laptop speakers (because they are convenient)", "is_true": "no" }
    ],
    "v1_p2_t3_i_1": [
        { "text": "It cancels out noise and interference using phase cancellation", "is_true": "yes" },
        { "text": "It makes the signal significantly louder and clearer", "is_true": "no" },
        { "text": "It uses expensive gold connectors for better conductivity", "is_true": "no" },
        { "text": "It fits in more types of jacks than unbalanced cables", "is_true": "no" }
    ],
    "v1_p2_t3_i_2": [
        { "text": "To remove unwanted low-frequency rumble and noise", "is_true": "yes" },
        { "text": "To remove harsh high-frequency hiss from the signal", "is_true": "no" },
        { "text": "To boost the sub-bass frequencies for more power", "is_true": "no" },
        { "text": "To add harmonic distortion/saturation to the track", "is_true": "no" }
    ],
    "v1_p2_t3_i_3": [
        { "text": "Series (The whole signal goes through the effect)", "is_true": "yes" },
        { "text": "Parallel (The signal is split into two paths)", "is_true": "no" },
        { "text": "Reverse (The effect is applied backwards)", "is_true": "no" },
        { "text": "Stereo (The signal is converted to dual mono)", "is_true": "no" }
    ],
    "v1_p2_t3_i_7": [
        { "text": "When the source is too loud and distorting the preamp even at minimum gain", "is_true": "yes" },
        { "text": "When the signal is too quiet and needs an extra volume boost", "is_true": "no" },
        { "text": "When recording vocals to add a soft 'padded' texture", "is_true": "no" },
        { "text": "When you want to filter out low frequency rumble", "is_true": "no" }
    ],
    "v1_p2_t3_i_9": [
        { "text": "Converts High-Impedance Instrument signals (Guitar) to Low-Impedance Mic signals", "is_true": "yes" },
        { "text": "Adds distortion and amplifier simulation to clean guitar signals", "is_true": "no" },
        { "text": "Powers condenser microphones that don't have their own battery", "is_true": "no" },
        { "text": "Records MIDI data from the guitar pickup output", "is_true": "no" }
    ],
    "v1_p2_t3_i_10": [
        { "text": "The 2nd mic should be 3 times further from the 1st mic than the 1st mic is from the source", "is_true": "yes" },
        { "text": "You need to use 3 microphones for every 1 instrument you record", "is_true": "no" },
        { "text": "The microphones should be placed exactly 3 inches apart at all times", "is_true": "no" },
        { "text": "One microphone should be set 3 times louder than the other one", "is_true": "no" }
    ],
    "v1_p2_t3_a_1": [
        { "text": "The signal leaves at the exact same volume it entered (No boost, no cut)", "is_true": "yes" },
        { "text": "The volume is set to the absolute maximum level possible", "is_true": "no" },
        { "text": "The volume is turned completely off (Silence)", "is_true": "no" },
        { "text": "The signal is normalized to 0dBFS peak automatically", "is_true": "no" }
    ],
    "v1_p2_t3_a_2": [
        { "text": "By duplicating a track (or using a Send), compressing the copy heavily, and mixing it with the dry signal", "is_true": "yes" },
        { "text": "By putting a compressor directly on the master bus to glue the mix together", "is_true": "no" },
        { "text": "By using a compressor with a very slow attack time to preserve transients", "is_true": "no" },
        { "text": "By compressing only the Left channel while leaving the Right channel dry", "is_true": "no" }
    ],
    "v1_p2_t3_a_3": [
        { "text": "Using an external audio signal to trigger the compression on a different track", "is_true": "yes" },
        { "text": "Chaining two compressors together in series for more control", "is_true": "no" },
        { "text": "Using the side speakers of a surround setup for monitoring", "is_true": "no" },
        { "text": "Compressing only the reverb tails while leaving the dry signal", "is_true": "no" }
    ],
    "v1_p2_t3_a_4": [
        { "text": "Maximize the Signal-to-Noise Ratio without clipping", "is_true": "yes" },
        { "text": "Make every track as loud as possible at all times", "is_true": "no" },
        { "text": "Keep all the faders in a straight line for aesthetics", "is_true": "no" },
        { "text": "Use every plugin available in the DAW on every channel", "is_true": "no" }
    ],
    "v1_p2_t3_a_5": [
        { "text": "Audio passes through a Subgroup (allowing processing), whereas a VCA only remotely controls the channel faders", "is_true": "yes" },
        { "text": "VCAs add analog saturation and distortion, whereas subgroups are clean digital summing buses", "is_true": "no" },
        { "text": "Subgroups render the audio to mono, whereas VCAs preserve stereo width information", "is_true": "no" },
        { "text": "There is no functional difference; they are two terms for the exact same thing", "is_true": "no" }
    ],
    "v1_p2_t3_a_6": [
        { "text": "The signal splits: it continues to the bottom jack AND goes out your patch cable (Mult)", "is_true": "yes" },
        { "text": "The connection to the bottom jack is immediately broken (Full Normal behavior)", "is_true": "no" },
        { "text": "The signal stops completely and only goes to the patch cable", "is_true": "no" },
        { "text": "It creates a feedback loop that can damage connected equipment", "is_true": "no" }
    ],
    "v1_p2_t3_a_7": [
        { "text": "Left Channel minus Right Channel (difference)", "is_true": "yes" },
        { "text": "Left Channel plus Right Channel (sum)", "is_true": "no" },
        { "text": "Right Channel inverted and summed with Center", "is_true": "no" },
        { "text": "Center Channel only with low cut filter", "is_true": "no" }
    ],
    "v1_p2_t3_a_8": [
        { "text": "To monitor a signal's level and content regardless of fader position", "is_true": "yes" },
        { "text": "To solo the track in the main mix usually post-fader", "is_true": "no" },
        { "text": "To add effects to the signal before it reaches the fader", "is_true": "no" },
        { "text": "To mute the calibrated monitors and switch to headphones", "is_true": "no" }
    ],
    "v1_p2_t3_a_9": [
        { "text": "Because the bottom head moves in the opposite direction to the top head", "is_true": "yes" },
        { "text": "To make the snare drum significantly louder in the mix", "is_true": "no" },
        { "text": "To remove the snare rattle sound from the recording", "is_true": "no" },
        { "text": "It is required for digital recording to prevent clipping", "is_true": "no" }
    ],
    "v1_p2_t3_a_10": [
        { "text": "It is a separate mix tailored for the performers (Headphones/Monitors)", "is_true": "yes" },
        { "text": "It is always mono and cannot support stereo effects placement", "is_true": "no" },
        { "text": "It includes the talkback mic signal mixed in permanently", "is_true": "no" },
        { "text": "It has no EQ or dynamic processing capabilities available", "is_true": "no" }
    ],
    "v1_p2_t3_m_1": [
        { "text": "Low Output Impedance feeding High Input Impedance (Voltage Transfer)", "is_true": "yes" },
        { "text": "Matched Output and Input Impedance (Power Transfer)", "is_true": "no" },
        { "text": "High Output Impedance feeding Low Input Impedance", "is_true": "no" },
        { "text": "Infinite Impedance at both source and destination", "is_true": "no" }
    ],
    "v1_p2_t3_m_2": [
        { "text": "How well a balanced input cancels out noise present on both legs", "is_true": "yes" },
        { "text": "The difference between Mic Level and Line Level voltages", "is_true": "no" },
        { "text": "The amount of phantom power voltage rejection available", "is_true": "no" },
        { "text": "The speed at which the amplifier can slew effectively", "is_true": "no" }
    ],
    "v1_p2_t3_m_3": [
        { "text": "To compensate for the acoustic summing boost when playing from two speakers", "is_true": "yes" },
        { "text": "To make the center channel cleaner and less muddy", "is_true": "no" },
        { "text": "Because of mono compatibility issues with FM radio", "is_true": "no" },
        { "text": "It is a manufacturing defect common in older desks", "is_true": "no" }
    ],
    "v1_p2_t3_m_4": [
        { "text": "How fast the output voltage can change (Transient Response)", "is_true": "yes" },
        { "text": "The maximum volume the amplifier can produce before clipping", "is_true": "no" },
        { "text": "The bit depth resolution of the digital stage", "is_true": "no" },
        { "text": "The signal to noise ratio of the input stage", "is_true": "no" }
    ],
    "v1_p2_t3_m_5": [
        { "text": "Signal bleeding from one channel into adjacent tracks", "is_true": "yes" },
        { "text": "The engineer talking over the music via Talkback", "is_true": "no" },
        { "text": "A type of distortion caused by bad gain staging", "is_true": "no" },
        { "text": "The delay time between input and output monitoring", "is_true": "no" }
    ],
    "v1_p2_t3_m_6": [
        { "text": "It allows the sending of Control Voltage (CV) to modular synthesizers", "is_true": "yes" },
        { "text": "It automatically removes DC Offset from the recording", "is_true": "no" },
        { "text": "It is safer for speakers as it prevents pops", "is_true": "no" },
        { "text": "It runs on batteries instead of mains power", "is_true": "no" }
    ],
    "v1_p2_t3_m_7": [
        { "text": "A difference in voltage potential between two ground points causing current flow", "is_true": "yes" },
        { "text": "Bad electricity coming from the power company transformer", "is_true": "no" },
        { "text": "Using too many cables in the signal chain simultaneously", "is_true": "no" },
        { "text": "Digital distortion folding back into the audible spectrum", "is_true": "no" }
    ],
    "v1_p2_t3_m_8": [
        { "text": "Routing an output back into its own input", "is_true": "yes" },
        { "text": "Using too much compression on a single channel", "is_true": "no" },
        { "text": "Playing the speakers too loud in the room", "is_true": "no" },
        { "text": "Connecting MIDI inputs to MIDI outputs", "is_true": "no" }
    ],
    "v1_p2_t3_m_9": [
        { "text": "Usually 180° out of phase (Total cancellation in mono)", "is_true": "yes" },
        { "text": "Perfect Mono (Center)", "is_true": "no" },
        { "text": "Perfect Stereo Wide (Hard Left/Right)", "is_true": "no" },
        { "text": "The signal is completely silent", "is_true": "no" }
    ],
    "v1_p2_t3_m_10": [
        { "text": "It accounts for the human ear's frequency sensitivity (K-Weighting)", "is_true": "yes" },
        { "text": "It measures peak level faster than standard meters", "is_true": "no" },
        { "text": "It looks nicer and is easier to read", "is_true": "no" },
        { "text": "It is purely digital and has no analog equivalent", "is_true": "no" }
    ],

    # TOPIC 4
    "v1_p2_t4_b_3": [
        { "text": "Audio Track records Sound waves; MIDI Track records Note data (performance instructions)", "is_true": "yes" },
        { "text": "Audio Track records Note data; MIDI Track records Sound waves", "is_true": "no" },
        { "text": "Audio Track records Video files; MIDI Track records Audio files", "is_true": "no" },
        { "text": "Audio Track records Everything; MIDI Track records Nothing", "is_true": "no" }
    ],
    "v1_p2_t4_b_4": [
        { "text": "To keep musicians playing in time with a consistent tempo", "is_true": "yes" },
        { "text": "To tune the instruments before recording", "is_true": "no" },
        { "text": "To add a drum beat backing track to the song", "is_true": "no" },
        { "text": "To measure the loudness of the performance", "is_true": "no" }
    ],
    "v1_p2_t4_b_7": [
        { "text": "Repeats the region continuously", "is_true": "yes" },
        { "text": "Deletes the region from the timeline", "is_true": "no" },
        { "text": "Reverses the audio region playback", "is_true": "no" },
        { "text": "Mutes the track indefinitely", "is_true": "no" }
    ],
    "v1_p2_t4_b_8": [
        { "text": "Only the guitar track is heard; all others are silenced", "is_true": "yes" },
        { "text": "The guitar track is silenced; all others are heard", "is_true": "no" },
        { "text": "The guitar plays a pre-recorded solo automatically", "is_true": "no" },
        { "text": "The track is deleted from the project", "is_true": "no" }
    ],
    "v1_p2_t4_b_9": [
        { "text": "Indicates the current playback position on the timeline", "is_true": "yes" },
        { "text": "Controls the master volume of the project", "is_true": "no" },
        { "text": "Selects the active editing tool (pointer/pencil)", "is_true": "no" },
        { "text": "Shows the CPU usage percentage", "is_true": "no" }
    ],
    "v1_p2_t4_b_10": [
        { "text": "To prevent data loss if the computer crashes or power fails", "is_true": "yes" },
        { "text": "To make the file louder and more compressed", "is_true": "no" },
        { "text": "To finalize the song for distribution", "is_true": "no" },
        { "text": "It is not important; modern DAWs never crash", "is_true": "no" }
    ],
    "v1_p2_t4_i_1": [
        { "text": "Plays back existing automation data but does not record new moves", "is_true": "yes" },
        { "text": "Records new movements instantly whenever a fader is touched", "is_true": "no" },
        { "text": "Deletes all automation data from the track", "is_true": "no" },
        { "text": "Reads the lyrics aloud using text-to-speech", "is_true": "no" }
    ],
    "v1_p2_t4_i_2": [
        { "text": "Starts writing when you touch the fader and KEEPS writing at the last value after you let go", "is_true": "yes" },
        { "text": "Snaps back to the previous value as soon as you let go of the fader", "is_true": "no" },
        { "text": "Does nothing; it acts exactly like Read mode", "is_true": "no" },
        { "text": "Only writes automation while the transport is stopped", "is_true": "no" }
    ],
    "v1_p2_t4_i_3": [
        { "text": "Editing regions does not alter the original audio file on the hard drive", "is_true": "yes" },
        { "text": "You cannot make mistakes because the DAW prevents them", "is_true": "no" },
        { "text": "The audio quality never degrades regardless of processing", "is_true": "no" },
        { "text": "It uses analog tape simulation to preserve warmth", "is_true": "no" }
    ],
    "v1_p2_t4_i_4": [
        { "text": "Overdubbing a specific section of a track while the rest plays back", "is_true": "yes" },
        { "text": "Hitting the keyboard hard to trigger louder samples", "is_true": "no" },
        { "text": "Recording loops only without linear timeline recording", "is_true": "no" },
        { "text": "Recording the drums first before any other instrument", "is_true": "no" }
    ],
    "v1_p2_t4_i_5": [
        { "text": "Navigate quickly between song sections (Verse, Chorus, Bridge)", "is_true": "yes" },
        { "text": "Mark bad takes for deletion automatically", "is_true": "no" },
        { "text": "Change the volume at specific points in time", "is_true": "no" },
        { "text": "Color the tracks for visual organization", "is_true": "no" }
    ],
    "v1_p2_t4_i_6": [
        { "text": "It contains no audio regions itself; it only processes audio routed to it", "is_true": "yes" },
        { "text": "It is mono only and often used for bass tracks", "is_true": "no" },
        { "text": "It cannot have plugins inserted on it", "is_true": "no" },
        { "text": "It is for MIDI data only and cannot pass audio", "is_true": "no" }
    ],
    "v1_p2_t4_i_7": [
        { "text": "Combining the best parts of multiple takes into one perfect performance", "is_true": "yes" },
        { "text": "Comparing it to the original reference track", "is_true": "no" },
        { "text": "Compressing it heavily to make it consistent", "is_true": "no" },
        { "text": "Adding reverb to make it sit in the mix", "is_true": "no" }
    ],
    "v1_p2_t4_i_8": [
        { "text": "It aligns perfectly to the nearest rhythmic division (Bar/Beat)", "is_true": "yes" },
        { "text": "It moves freely without any restrictions", "is_true": "no" },
        { "text": "It is deleted from the timeline immediately", "is_true": "no" },
        { "text": "It changes pitch to match the project key", "is_true": "no" }
    ],
    "v1_p2_t4_i_9": [
        { "text": "Joins multiple separate clips into a single new continuous audio file", "is_true": "yes" },
        { "text": "groups them visually but keeps them as separate files on disk", "is_true": "no" },
        { "text": "Deletes them from the project permanently", "is_true": "no" },
        { "text": "Converts audio regions into MIDI data", "is_true": "no" }
    ],
    "v1_p2_t4_i_10": [
        { "text": "If you edit the original source region, all Ghost Loops update automatically", "is_true": "yes" },
        { "text": "It uses significantly more CPU power than standard copies", "is_true": "no" },
        { "text": "There is no functional difference; it is purely visual", "is_true": "no" },
        { "text": "It sounds better because it uses less RAM", "is_true": "no" }
    ],
    "v1_p2_t4_a_2": [
        { "text": "Clip Gain happens BEFORE the plugins (inserts); Automation happens AFTER the plugins (typically)", "is_true": "yes" },
        { "text": "Automation is noticeably louder than Clip Gain", "is_true": "no" },
        { "text": "Clip Gain is destructive and cannot be undone", "is_true": "no" },
        { "text": "Automation cannot be edited once recorded", "is_true": "no" }
    ],
    "v1_p2_t4_a_3": [
        { "text": "Controls the relative volume of a group of tracks without summing their audio", "is_true": "yes" },
        { "text": "Sums audio like a bus and allows for plugin processing", "is_true": "no" },
        { "text": "Adds distortion and saturation to the group", "is_true": "no" },
        { "text": "Controls stereo panning only, not volume", "is_true": "no" }
    ],
    "v1_p2_t4_a_4": [
        { "text": "Temporarily renders the track to audio to free up CPU processing power", "is_true": "yes" },
        { "text": "Locks the track so it cannot be moved on the timeline", "is_true": "no" },
        { "text": "Mutes the track indefinitely until un-frozen", "is_true": "no" },
        { "text": "Makes the sound colder by removing high frequencies", "is_true": "no" }
    ],
    "v1_p2_t4_a_5": [
        { "text": "Providing context playback before a punch-in recording point", "is_true": "yes" },
        { "text": "Before starting a new project to clear the buffers", "is_true": "no" },
        { "text": "Exporting the final mix for mastering", "is_true": "no" },
        { "text": "Tuning a guitar before a take starts", "is_true": "no" }
    ],
    "v1_p2_t4_a_6": [
        { "text": "Triggers sustained MIDI notes even if playback starts in the middle of the note", "is_true": "yes" },
        { "text": "Automatically quantizes notes to the nearest beat", "is_true": "no" },
        { "text": "Deletes duplicate notes that overlap", "is_true": "no" },
        { "text": "Records MIDI inputs with lower latency", "is_true": "no" }
    ],
    "v1_p2_t4_a_7": [
        { "text": "When using external hardware inserts (analog outboard gear)", "is_true": "yes" },
        { "text": "When the song is very long and complex", "is_true": "no" },
        { "text": "When using VST instruments that are CPU heavy", "is_true": "no" },
        { "text": "When the sample rate is set to 44.1kHz", "is_true": "no" }
    ],
    "v1_p2_t4_a_8": [
        { "text": "Summing Stacks combine audio through a bus; Folder Stacks just organize tracks visually", "is_true": "yes" },
        { "text": "Folder stacks are for MIDI only; Summing stacks are for Audio only", "is_true": "no" },
        { "text": "Summing stacks use more hard drive space than Folder stacks", "is_true": "no" },
        { "text": "There is no functional difference; it is purely a naming preference", "is_true": "no" }
    ],
    "v1_p2_t4_a_9": [
        { "text": "It delays non-processed tracks to align with tracks that have high-latency plugins", "is_true": "yes" },
        { "text": "It removes all latency from the recording chain instantly", "is_true": "no" },
        { "text": "It speeds up the CPU by ignoring plugin delay", "is_true": "no" },
        { "text": "It adds echo effects to synchronize the rhythm", "is_true": "no" }
    ],
    "v1_p2_t4_a_10": [
        { "text": "They have virtually unlimited dynamic range and cannot clip internally", "is_true": "yes" },
        { "text": "They utilize significantly less hard drive space", "is_true": "no" },
        { "text": "They are directly compatible with standard CD players", "is_true": "no" },
        { "text": "They remove background noise totally from recordings", "is_true": "no" }
    ],
    "v1_p2_t4_m_1": [
        { "text": "The signal increases by +3dB as it moves to the side to maintain apparent volume", "is_true": "yes" },
        { "text": "The level stays exactly the same regardless of pan position", "is_true": "no" },
        { "text": "The signal drops by -3dB at the side to prevent clipping", "is_true": "no" },
        { "text": "It adds harmonic distortion to compensate for stereo widening", "is_true": "no" }
    ],
    "v1_p2_t4_m_2": [
        { "text": "To minimize rounding errors (quantization noise) during millions of calculations per second", "is_true": "yes" },
        { "text": "To double the perceived volume of the mixdown", "is_true": "no" },
        { "text": "To use more RAM for sample libraries", "is_true": "no" },
        { "text": "To support 64 speakers in a surround setup", "is_true": "no" }
    ],
    "v1_p2_t4_m_3": [
        { "text": "The reconstructed analog waveform exceeding digital 0dBFS between two valid sample points", "is_true": "yes" },
        { "text": "Recording too loud on the input stage causing clicks", "is_true": "no" },
        { "text": "Using a sample rate that is too low for the source material", "is_true": "no" },
        { "text": "Playing two samples simultaneously that sum to zero", "is_true": "no" }
    ],
    "v1_p2_t4_m_4": [
        { "text": "To react to a transient peak before it actually happens to prevent clipping", "is_true": "yes" },
        { "text": "To predict the next song in the playlist", "is_true": "no" },
        { "text": "To save CPU usage by calculating in advance", "is_true": "no" },
        { "text": "To analyze the musical key of the song", "is_true": "no" }
    ],
    "v1_p2_t4_m_5": [
        { "text": "When reducing bit-depth (e.g., 24-bit to 16-bit)", "is_true": "yes" },
        { "text": "When increasing sample rate (Upsampling)", "is_true": "no" },
        { "text": "When converting mp3 to wav format", "is_true": "no" },
        { "text": "Every time you save the project file", "is_true": "no" }
    ],
    "v1_p2_t4_m_6": [
        { "text": "A/D conversion + Input Buffer + Processing + Output Buffer + D/A conversion", "is_true": "yes" },
        { "text": "Just the buffer size setting in the preferences", "is_true": "no" },
        { "text": "The time it takes to save the project to disk", "is_true": "no" },
        { "text": "The physical length of the microphone cable", "is_true": "no" }
    ],
    "v1_p2_t4_m_7": [
        { "text": "The external signal used to trigger the compression detector circuit", "is_true": "yes" },
        { "text": "The button to unlock the plugin license key", "is_true": "no" },
        { "text": "The main input signal being compressed", "is_true": "no" },
        { "text": "The MIDI keyboard input for automation", "is_true": "no" }
    ],
    "v1_p2_t4_m_8": [
        { "text": "SIP mutes all other channels on the Main Mix outputs, potentially ruining a live show", "is_true": "yes" },
        { "text": "SIP is significantly lower audio quality than PFL", "is_true": "no" },
        { "text": "SIP cannot be undone once activated", "is_true": "no" },
        { "text": "There is no practical difference between them", "is_true": "no" }
    ],
    "v1_p2_t4_m_9": [
        { "text": "To reduce aliasing artifacts caused by generating high-frequency harmonics", "is_true": "yes" },
        { "text": "To make the file size larger for high-fidelity export", "is_true": "no" },
        { "text": "To increase the volume beyond digital limits", "is_true": "no" },
        { "text": "To correct pitch errors in the performance", "is_true": "no" }
    ],
    "v1_p2_t4_m_10": [
        { "text": "Creating a feedback loop (sending a delay return back into itself)", "is_true": "yes" },
        { "text": "Using too many EQs on a single channel", "is_true": "no" },
        { "text": "Running at 96kHz sample rate", "is_true": "no" },
        { "text": "Using a laptop instead of a desktop computer", "is_true": "no" }
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
            if part['id'] == 'p2':
                for topic in part['topics']:
                    for level, questions in topic['levels'].items():
                        for q in questions:
                            if q['id'] in updates:
                                q['answers'] = updates[q['id']]
                                count += 1

print(f"Updated {count} questions for Part 2")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
