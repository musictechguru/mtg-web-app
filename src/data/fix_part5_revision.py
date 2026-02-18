
import json

updates = {
    # TOPIC 12
    "v1_p5_t12_i_4": [
        { "text": "Because it constructively mutes all other channels on the Main PA, killing the show for the audience", "is_true": "yes" },
        { "text": "Because it causes an overload in the mixing desk internal circuitry which requires a reboot", "is_true": "no" },
        { "text": "Because it creates immediate feedback loops that can destroy the speaker system instantly", "is_true": "no" },
        { "text": "Because it is illegal to use in public venues under standard noise regulation laws", "is_true": "no" }
    ],
    "v1_p5_t12_i_5": [
        { "text": "Because human hearing perceives volume logarithmically; a linear fader would sound like an on/off switch", "is_true": "yes" },
        { "text": "Because it is significantly cheaper to manufacture logarithmic potentiometers in bulk", "is_true": "no" },
        { "text": "Because it allows more numbers to fit on the scale for better visual accuracy", "is_true": "no" },
        { "text": "Because it looks aesthetically more pleasing to have the fader throw distributed this way", "is_true": "no" }
    ],
    "v1_p5_t12_i_6": [
        { "text": "The Aux Send feeding the reverb is set to 'Pre-Fader'", "is_true": "yes" },
        { "text": "The fader is broken and not attenuating signal correctly", "is_true": "no" },
        { "text": "There is a ghostly phenomenon occurring in the console", "is_true": "no" },
        { "text": "The latency of the system is causing a delayed cutout", "is_true": "no" }
    ],
    "v1_p5_t12_i_7": [
        { "text": "Reduces monitor volume by a set amount (e.g. -20dB) to allow for conversation without losing the volume setting", "is_true": "yes" },
        { "text": "Dims the lights in the studio to create a better listening mood", "is_true": "no" },
        { "text": "Turns off the computer screen to reduce fan noise interference", "is_true": "no" },
        { "text": "Mutes the output completely to ensure total silence in the room", "is_true": "no" }
    ],
    "v1_p5_t12_i_8": [
        { "text": "The mathematical (or electrical) addition of all channel voltages into a single stereo signal", "is_true": "yes" },
        { "text": "Calculating the total billable hours for the client session", "is_true": "no" },
        { "text": "Adding auxiliary sends to the mix for effect processing", "is_true": "no" },
        { "text": "Checking for phase cancellation issues across all tracks", "is_true": "no" }
    ],
    "v1_p5_t12_i_9": [
        { "text": "Digitally Controlled Amplifier (The digital equivalent of a VCA)", "is_true": "yes" },
        { "text": "Digital Cable Audio standard for high impedance connections", "is_true": "no" },
        { "text": "Direct Current Amperage measurement for power consumption", "is_true": "no" },
        { "text": "Dual Channel Audio processing for stereo linking channels", "is_true": "no" }
    ],
    "v1_p5_t12_i_10": [
        { "text": "To ensure your gain staging is correct and you aren't masking a clipping mix by turning it down at the end", "is_true": "yes" },
        { "text": "Because it looks visually balanced to have all faders aligned at the top", "is_true": "no" },
        { "text": "To make the final mix as loud as possible before mastering", "is_true": "no" },
        { "text": "It doesn't matter where it is set as long as it doesn't clip", "is_true": "no" }
    ],
    "v1_p5_t12_a_1": [
        { "text": "A small belt and motor drive the physical cap to match the automation data written in the DAW", "is_true": "yes" },
        { "text": "Strong magnets under the surface move the faders without physical contact", "is_true": "no" },
        { "text": "Wind power from internal fans directs the fader positions automatically", "is_true": "no" },
        { "text": "They don't move physically; it is an optical illusion created by LEDs", "is_true": "no" }
    ],
    "v1_p5_t12_a_3": [
        { "text": "To prevent the Reverb from being muted when you Solo a distinct vocal track", "is_true": "yes" },
        { "text": "To protect the channel from potential computer viruses or malware", "is_true": "no" },
        { "text": "To lock the volume fader in place so it cannot be moved", "is_true": "no" },
        { "text": "To make the effect significantly louder in the context of the mix", "is_true": "no" }
    ],
    "v1_p5_t12_a_4": [
        { "text": "The psychoacoustic illusion of a sound source directly in front of you, created by equal volume from L and R speakers", "is_true": "yes" },
        { "text": "A ghostly frequency that appears in the center of the room", "is_true": "no" },
        { "text": "A dedicated center speaker channel that plays the mono content", "is_true": "no" },
        { "text": "A mono recording being played back over a stereo system", "is_true": "no" }
    ],
    "v1_p5_t12_a_6": [
        { "text": "You hear the channel loudly in headphones/monitors, but it is silent in the main mix", "is_true": "yes" },
        { "text": "You hear absolute silence everywhere because the fader is down", "is_true": "no" },
        { "text": "You hear loud digital distortion due to the level mismatch", "is_true": "no" },
        { "text": "You hear it in the main mix normally as if the fader was up", "is_true": "no" }
    ],
    "v1_p5_t12_a_7": [
        { "text": "The area at the bottom of the fader where you write the instrument name (tape or digital display)", "is_true": "yes" },
        { "text": "Where you draw artistic doodles during long recording breaks", "is_true": "no" },
        { "text": "A place for writing down important session notes and lyrics", "is_true": "no" },
        { "text": "The meter bridge at the top showing the signal levels", "is_true": "no" }
    ],
    "v1_p5_t12_a_8": [
        { "text": "A high-speed Ethernet protocol for DAW controllers (e.g. Avid S6) offering deeper control than MIDI", "is_true": "yes" },
        { "text": "A type of specially shielded cable used for intercontinental data", "is_true": "no" },
        { "text": "A popular VST plugin format used primarily on Windows systems", "is_true": "no" },
        { "text": "A famous electronic rock band from the late 1980s era", "is_true": "no" }
    ],
    "v1_p5_t12_a_9": [
        { "text": "To mute a specific set of channels (e.g. all FX returns or all drums) with a single button press", "is_true": "yes" },
        { "text": "To mute everyone in the studio instantly for announcements", "is_true": "no" },
        { "text": "To group faders together for simultaneous volume movement", "is_true": "no" },
        { "text": "To hide channels from the view to declutter the workspace", "is_true": "no" }
    ],
    "v1_p5_t12_a_10": [
        { "text": "Write overwrites ALL data continuously (dangerous). Touch only writes while you are touching the fader", "is_true": "yes" },
        { "text": "Write is for adding lyrics; Touch is for editing audio waveforms", "is_true": "no" },
        { "text": "Touch is designed specifically for iPad touchscreen controllers", "is_true": "no" },
        { "text": "They are the same mode but named differently in different DAWs", "is_true": "no" }
    ],
    "v1_p5_t12_m_1": [
        { "text": "The dynamic range is >1500dB. Values above 0dB are preserved, not truncated, so you can just turn the Master down to recover the audio", "is_true": "yes" },
        { "text": "It is built with magic algorithms that defy standard physics", "is_true": "no" },
        { "text": "It has an aggressive automatic limiter on every channel input", "is_true": "no" },
        { "text": "It actually clips at +10dB instead of the standard 0dB limit", "is_true": "no" }
    ],
    "v1_p5_t12_m_2": [
        { "text": "It uses HRTF (Head Related Transfer Functions) to simulate 3D position (front/back/up/down) for headphones", "is_true": "yes" },
        { "text": "It is designed strictly for playback on two-channel stereo speakers", "is_true": "no" },
        { "text": "It is just standard Left/Right panning with no height information", "is_true": "no" },
        { "text": "It adds a noticeable slapback echo to create a sense of space", "is_true": "no" }
    ],
    "v1_p5_t12_m_3": [
        { "text": "Audio Subgroups add a tiny processing delay (latency) which can comb-filter against the parallel dry signal; VCAs add zero latency", "is_true": "yes" },
        { "text": "Groups are always analog summing while VCAs are digital calculations", "is_true": "no" },
        { "text": "VCAs are much slower to respond to fader movements than groups", "is_true": "no" },
        { "text": "They don't cause any phase issues; that is a common audio myth", "is_true": "no" }
    ],
    "v1_p5_t12_m_4": [
        { "text": "The analog reconstruction filter can overshoot the digital samples (Inter-Sample Peaks) exceeding 0dB", "is_true": "yes" },
        { "text": "The meter is likely broken or uncalibrated in the software", "is_true": "no" },
        { "text": "Consumers use different speakers which might distort naturally", "is_true": "no" },
        { "text": "Compression adds distortion automatically even at low levels", "is_true": "no" }
    ],
    "v1_p5_t12_m_5": [
        { "text": "Mutes can cause clicks/pops if cut mid-wave, and they cut reverb tails unnaturally. Faders allow smooth fade outs", "is_true": "yes" },
        { "text": "Mute automation data does not save reliably with the project file", "is_true": "no" },
        { "text": "Automating faders uses significantly less CPU power than mutes", "is_true": "no" },
        { "text": "It isn't bad practice; you can do whatever works for you", "is_true": "no" }
    ],
    "v1_p5_t12_m_6": [
        { "text": "Compromise between Sin/Cos (constant power) and Linear rules, favoured by some SSL analog consoles", "is_true": "yes" },
        { "text": "It is strictly for film mixing standards requiring headroom", "is_true": "no" },
        { "text": "It is a digital-only standard not found on analog desks", "is_true": "no" },
        { "text": "It makes the center channel significantly louder than the sides", "is_true": "no" }
    ],
    "v1_p5_t12_m_7": [
        { "text": "It adds a relative offset to existing automation moves (scaling them up/down) without overwriting the original intricate moves", "is_true": "yes" },
        { "text": "It automatically cuts the head and tail silence of the clip", "is_true": "no" },
        { "text": "It effectively deletes all previous automation data on the track", "is_true": "no" },
        { "text": "It normalizes the volume of the track to exactly 0dB", "is_true": "no" }
    ],
    "v1_p5_t12_m_8": [
        { "text": "The voltage rail limits of the summing amplifier (Noise vs Distortion floor)", "is_true": "yes" },
        { "text": "The physical number of faders available on the console surface", "is_true": "no" },
        { "text": "The gauge of the copper cables used for the internal wiring", "is_true": "no" },
        { "text": "The ambient temperature of the room affecting the circuits", "is_true": "no" }
    ],
    "v1_p5_t12_m_9": [
        { "text": "Only at the very final output stage when converting back to a fixed bit depth (e.g. 24 or 16 bit) for export", "is_true": "yes" },
        { "text": "On every single channel fader individually during the mix", "is_true": "no" },
        { "text": "Never; dither is an obsolete technology not used anymore", "is_true": "no" },
        { "text": "Before any compression or dynamic processing is applied", "is_true": "no" }
    ],
    "v1_p5_t12_m_10": [
        { "text": "Poor Left/Right tracking matching, causing the stereo image to drift to one side", "is_true": "yes" },
        { "text": "Introduction of digital noise into the analog signal path", "is_true": "no" },
        { "text": "Extreme latency issues causing delay in the signal monitoring", "is_true": "no" },
        { "text": "Phase inversion of one channel causing cancellation effects", "is_true": "no" }
    ],

    # TOPIC 13
    "v1_p5_t13_b_1": [
        { "text": "Creating a separate mix for headphone monitors or effects (e.g. Reverb)", "is_true": "yes" },
        { "text": "Changing the main volume of the channel in the final mix", "is_true": "no" },
        { "text": "Turning the channel off completely when not in use", "is_true": "no" },
        { "text": "Eq-ing the sound to make it brighter or darker", "is_true": "no" }
    ],
    "v1_p5_t13_b_2": [
        { "text": "The signal is tapped BEFORE the fader, so moving the main volume fader has NO effect on the send level", "is_true": "yes" },
        { "text": "The signal is tapped immediately after the EQ section", "is_true": "no" },
        { "text": "The signal is completely muted regardless of fader position", "is_true": "no" },
        { "text": "It means the signal is tapped before the preamp stage", "is_true": "no" }
    ],
    "v1_p5_t13_b_3": [
        { "text": "The signal is tapped AFTER the fader, so turning down the fader ALSO turns down the send", "is_true": "yes" },
        { "text": "The signal is slightly delayed by a few milliseconds", "is_true": "no" },
        { "text": "It means the signal is sent to the post office", "is_true": "no" },
        { "text": "It means the signal is significantly louder than before", "is_true": "no" }
    ],
    "v1_p5_t13_b_6": [
        { "text": "Hosting a shared plugin (like a Reverb) that multiple tracks send signal to", "is_true": "yes" },
        { "text": "Recording incoming MIDI data from external keyboards", "is_true": "no" },
        { "text": "Mastering the final stereo mix for distribution", "is_true": "no" },
        { "text": "Nothing; it is just a placeholder track for spacing", "is_true": "no" }
    ],
    "v1_p5_t13_b_7": [
        { "text": "A Feedback Loop (screeching howl) is created instantly", "is_true": "yes" },
        { "text": "It sounds like a pleasant tape delay effect", "is_true": "no" },
        { "text": "It cancels out the signal completely causing silence", "is_true": "no" },
        { "text": "Nothing happens; the system prevents this routing", "is_true": "no" }
    ],
    "v1_p5_t13_b_9": [
        { "text": "An exact copy of the channel signal level (0dB gain)", "is_true": "yes" },
        { "text": "Double the level of the original channel signal", "is_true": "no" },
        { "text": "Half the level of the original channel signal", "is_true": "no" },
        { "text": "None; unity means zero output in this context", "is_true": "no" }
    ],
    "v1_p5_t13_b_10": [
        { "text": "Yes, e.g. Send 1 to Reverb, Send 2 to Delay, Send 3 to Headphones", "is_true": "yes" },
        { "text": "No, only one Aux Send is allowed per channel strip", "is_true": "no" },
        { "text": "Only if the channel is stereo can you use multiple sends", "is_true": "no" },
        { "text": "Only on drum tracks is this feature enabled", "is_true": "no" }
    ],
    "v1_p5_t13_i_2": [
        { "text": "Post-EQ (So if you brighten the vocal, the reverb brightens too)", "is_true": "yes" },
        { "text": "Pre-EQ (The send taps before the equalizer circuit)", "is_true": "no" },
        { "text": "Post-Fader only; they cannot be configured relative to EQ", "is_true": "no" },
        { "text": "They bypass the EQ section entirely by design", "is_true": "no" }
    ],
    "v1_p5_t13_i_3": [
        { "text": "A 'Mix of Mixes' - it allows you to route Groups and Main L/R to a new output (e.g. for Foyer speakers)", "is_true": "yes" },
        { "text": "A famous sci-fi movie starring Keanu Reeves", "is_true": "no" },
        { "text": "A special type of reverb algorithm for spaces", "is_true": "no" },
        { "text": "A standard channel input for microphones", "is_true": "no" }
    ],
    "v1_p5_t13_i_4": [
        { "text": "A specific monitor mix sent to a musician (using Pre-Fader Auxes)", "is_true": "yes" },
        { "text": "A stick used to play billiards or pool games", "is_true": "no" },
        { "text": "A specific reverb setting for vocal cues", "is_true": "no" },
        { "text": "The final master mix sent to the label", "is_true": "no" }
    ],
    "v1_p5_t13_i_5": [
        { "text": "Yes, treating the Reverb itself as an audio source to shape its tone (e.g. cutting muddy lows)", "is_true": "yes" },
        { "text": "No, it is locked and standard parameters cannot be changed", "is_true": "no" },
        { "text": "Only with specific high-end digital mixing desks", "is_true": "no" },
        { "text": "Only the volume fader can be adjusted on returns", "is_true": "no" }
    ],
    "v1_p5_t13_i_6": [
        { "text": "The reverb enters the center of the stereo space. Panning the send places the reverb excitation left or right", "is_true": "yes" },
        { "text": "It stays mono regardless of the stereo reverb settings", "is_true": "no" },
        { "text": "It breaks the stereo image of the mix completely", "is_true": "no" },
        { "text": "It sounds completely dry with no effect applied", "is_true": "no" }
    ],
    "v1_p5_t13_i_7": [
        { "text": "Send the Kick Drum via a Pre-Fader bus to the 'Key Input' of the Bass compressor. No sound is heard from the bus", "is_true": "yes" },
        { "text": "Send it to the main input of the channel strip", "is_true": "no" },
        { "text": "Use an insert point on the channel instead", "is_true": "no" },
        { "text": "Use a group fader to link the two channels", "is_true": "no" }
    ],
    "v1_p5_t13_i_8": [
        { "text": "A Bus is the 'wire/pathway' that carries the signal. An Aux is the 'control' that puts signal onto that bus", "is_true": "yes" },
        { "text": "They are completely unrelated concepts in audio", "is_true": "no" },
        { "text": "Bus refers to vehicles; Aux refers to auxiliary power", "is_true": "no" },
        { "text": "Aux is strictly for power distribution networks", "is_true": "no" }
    ],
    "v1_p5_t13_i_9": [
        { "text": "Because reverb IS delay. A few milliseconds of pre-delay on a reverb return sounds natural. On an insert, it causes phasing", "is_true": "yes" },
        { "text": "It is actually more critical to have zero latency there", "is_true": "no" },
        { "text": "It causes immediate and uncontrollable feedback loops", "is_true": "no" },
        { "text": "It adds harsh treble frequencies to the signal", "is_true": "no" }
    ],
    "v1_p5_t13_i_10": [
        { "text": "To solo the Reverb signal itself (100% Wet) to check for noise or tone, without hearing the dry source", "is_true": "yes" },
        { "text": "To mute the reverb channel quickly during the mix", "is_true": "no" },
        { "text": "To bypass the effect unit entirely for comparison", "is_true": "no" },
        { "text": "To delete the channel from the session permanently", "is_true": "no" }
    ],
    "v1_p5_t13_a_1": [
        { "text": "It swaps the function of the main faders and the Aux Send rotaries, allowing you to mix monitors visually using the big faders", "is_true": "yes" },
        { "text": "It turns the physical fader upside down for left handed users", "is_true": "no" },
        { "text": "It inverts the polarity of the selected channel strip", "is_true": "no" },
        { "text": "It deletes the current mix settings completely", "is_true": "no" }
    ],
    "v1_p5_t13_a_2": [
        { "text": "Duplicating a signal to multiple destinations (e.g. sending a vocal to 3 different compressors)", "is_true": "yes" },
        { "text": "Adding high frequency treble to the signal", "is_true": "no" },
        { "text": "Using multiple microphones on a single source", "is_true": "no" },
        { "text": "Muting the channel during the recording pass", "is_true": "no" }
    ],
    "v1_p5_t13_a_3": [
        { "text": "So that if you pan the guitar left, the delay also appears on the left (maintaining spatial positioning)", "is_true": "yes" },
        { "text": "It makes the delay repeated signal significantly louder", "is_true": "no" },
        { "text": "It creates a ping pong effect across the stereo field", "is_true": "no" },
        { "text": "It cancels the panning out, making the delay mono", "is_true": "no" }
    ],
    "v1_p5_t13_a_4": [
        { "text": "Sending a mix to a remote guest that typically contains the whole show MINUS their own voice", "is_true": "yes" },
        { "text": "Subtracting background noise from the signal path", "is_true": "no" },
        { "text": "Mixing with negative numbers for experimental effect", "is_true": "no" },
        { "text": "Removing the host from the show momentarily", "is_true": "no" }
    ],
    "v1_p5_t13_a_5": [
        { "text": "To apply 'Bus Compression' or EQ to the entire kit as a single unit (Glue)", "is_true": "yes" },
        { "text": "To save the number of physical faders used on the desk", "is_true": "no" },
        { "text": "To make the drum mix mono instead of stereo", "is_true": "no" },
        { "text": "To reduce the overall volume of the drums significantly", "is_true": "no" }
    ],
    "v1_p5_t13_a_6": [
        { "text": "Parallel processed signals (like parallel compression) will play out of time, causing severe phasing", "is_true": "yes" },
        { "text": "It uses less power and CPU resources on the computer", "is_true": "no" },
        { "text": "Reverb tails sound better without compensation", "is_true": "no" },
        { "text": "Nothing happens; it is an optional feature", "is_true": "no" }
    ],
    "v1_p5_t13_a_7": [
        { "text": "Creating a 'Manually Printed' mix file within the session (Real-time bounce) via routing", "is_true": "yes" },
        { "text": "Printing the sheet music score for the musicians", "is_true": "no" },
        { "text": "Deleting the mix from the hard drive securely", "is_true": "no" },
        { "text": "Testing the speakers for frequency response accuracy", "is_true": "no" }
    ],
    "v1_p5_t13_a_8": [
        { "text": "A discreet output for that single channel alone, usually post-preamp, used for multitrack recording", "is_true": "yes" },
        { "text": "The main mix output of the mixing console", "is_true": "no" },
        { "text": "The headphone output jack on the front panel", "is_true": "no" },
        { "text": "A standard connection for a direct injection box", "is_true": "no" }
    ],
    "v1_p5_t13_a_9": [
        { "text": "To record the raw dry signal while monitoring through effects on the Insert point", "is_true": "yes" },
        { "text": "To add distortion to the signal before recording", "is_true": "no" },
        { "text": "To compress the signal before it hits the tape", "is_true": "no" },
        { "text": "It is impossible to do; sends are always post-insert", "is_true": "no" }
    ],
    "v1_p5_t13_a_10": [
        { "text": "Automating the Aux Send un-mute for just one specific word (making it echo) then muting it again", "is_true": "yes" },
        { "text": "Physically throwing the delay unit across the room", "is_true": "no" },
        { "text": "A very long delay setting used for special effects", "is_true": "no" },
        { "text": "A broken delay unit that makes random noises", "is_true": "no" }
    ],
    "v1_p5_t13_m_1": [
        { "text": "Digital units add latency (A/D D/A conversion). Combining this delayed signal with the analog dry signal causes phasing", "is_true": "yes" },
        { "text": "Digital units are too clean for this application", "is_true": "no" },
        { "text": "Analog is faster than light speed so it wins", "is_true": "no" },
        { "text": "It causes digital distortion to the signal path", "is_true": "no" }
    ],
    "v1_p5_t13_m_2": [
        { "text": "Printed stereo files of subgroups (e.g. Drums Stem, Vocal Stem) that sum perfectly to equal the final mix", "is_true": "yes" },
        { "text": "The raw multitrack files from the recording session", "is_true": "no" },
        { "text": "Mono files of each individual instrument track", "is_true": "no" },
        { "text": "MP3 versions of the song for email distribution", "is_true": "no" }
    ],
    "v1_p5_t13_m_3": [
        { "text": "Dub Reggae pioneers (e.g. King Tubby) to create regenerating, filtering echoes", "is_true": "yes" },
        { "text": "Classical composers from the 19th century", "is_true": "no" },
        { "text": "News anchors for dramatic effect", "is_true": "no" },
        { "text": "Country singers to enhance their vocal twang", "is_true": "no" }
    ],
    "v1_p5_t13_m_4": [
        { "text": "Yes, AFL is stereo and follows the pan pot. PFL is typically mono and centered", "is_true": "yes" },
        { "text": "No, both signals are strictly mono at all times", "is_true": "no" },
        { "text": "No, both signals are strictly stereo at all times", "is_true": "no" },
        { "text": "It depends on the weather and humidity", "is_true": "no" }
    ],
    "v1_p5_t13_m_5": [
        { "text": "Post-Fader logic dictates the send is tapped AFTER the mute block. Pre-Fader is tapped BEFORE the mute block", "is_true": "yes" },
        { "text": "It is a bug in the software or console design", "is_true": "no" },
        { "text": "Pre-Fader sends do not have any mute capability", "is_true": "no" },
        { "text": "It works by magic and cannot be explained", "is_true": "no" }
    ],
    "v1_p5_t13_m_6": [
        { "text": "To prevent the heavy kick drum energy from triggering the compressor, allowing the mix to breathe while still compressing", "is_true": "yes" },
        { "text": "To remove bass from the song entirely for a lighter sound", "is_true": "no" },
        { "text": "To make the compressor work significantly faster", "is_true": "no" },
        { "text": "To distort the signal intentionally for effect", "is_true": "no" }
    ],
    "v1_p5_t13_m_7": [
        { "text": "The Dante Controller software Matrix", "is_true": "yes" },
        { "text": "A physical network switch box", "is_true": "no" },
        { "text": "The internet cloud connection", "is_true": "no" },
        { "text": "Standard XLR audio cables", "is_true": "no" }
    ],
    "v1_p5_t13_m_8": [
        { "text": "Damping factor is reduced, causing 'flabby' or uncontrolled bass response", "is_true": "yes" },
        { "text": "The sound is cut off completely", "is_true": "no" },
        { "text": "High frequencies are cut off", "is_true": "no" },
        { "text": "Distortion occurs immediately", "is_true": "no" }
    ],
    "v1_p5_t13_m_9": [
        { "text": "Sending different instrument groups (A, B, C, D) to separate compressors before summing, for cumulative glue", "is_true": "yes" },
        { "text": "Mixing the song backwards from end to start", "is_true": "no" },
        { "text": "Panning everything to the rear speakers in surround", "is_true": "no" },
        { "text": "Using surround sound panning exclusively", "is_true": "no" }
    ],
    "v1_p5_t13_m_10": [
        { "text": "To totally prevent ground loops when connecting to distant FX racks or stage monitors", "is_true": "yes" },
        { "text": "To add extra gain to the weak signal", "is_true": "no" },
        { "text": "To cut bass frequencies out below 100Hz", "is_true": "no" },
        { "text": "To act as a status symbol of quality", "is_true": "no" }
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
            if part['id'] == 'p5':
                for topic in part['topics']:
                    for level, questions in topic['levels'].items():
                        for q in questions:
                            if q['id'] in updates:
                                q['answers'] = updates[q['id']]
                                count += 1

print(f"Updated {count} questions for Part 5 (Revision)")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
