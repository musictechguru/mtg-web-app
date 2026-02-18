
import json

updates = {
    # TOPIC 8
    "v1_p4_t8_b_1": [
        { "text": "To get sound in and out of the computer (A/D and D/A conversion)", "is_true": "yes" },
        { "text": "To make the computer processing significantly faster", "is_true": "no" },
        { "text": "To serve as a hardware synthesizer for MIDI playback", "is_true": "no" },
        { "text": "To provide electrical power to the studio lights", "is_true": "no" }
    ],
    "v1_p4_t8_b_2": [
        { "text": "The XLR Input (Mic Preamp)", "is_true": "yes" },
        { "text": "The Headphone Jack Output", "is_true": "no" },
        { "text": "The USB Connection Port", "is_true": "no" },
        { "text": "The Main Monitor Output", "is_true": "no" }
    ],
    "v1_p4_t8_b_3": [
        { "text": "How many snapshots of audio are taken per second", "is_true": "yes" },
        { "text": "The maximum volume level of the audio file", "is_true": "no" },
        { "text": "The fundamental bass frequency of the recording", "is_true": "no" },
        { "text": "The transfer speed of the USB or Thunderbolt cable", "is_true": "no" }
    ],
    "v1_p4_t8_b_4": [
        { "text": "The Main Outputs (L/R) on the back", "is_true": "yes" },
        { "text": "The Headphone Jack on the front", "is_true": "no" },
        { "text": "The Microphone Input XLR socket", "is_true": "no" },
        { "text": "The USB connection to the computer", "is_true": "no" }
    ],
    "v1_p4_t8_b_5": [
        { "text": "The delay between playing a note and hearing it back through the software", "is_true": "yes" },
        { "text": "The overall audio quality and fidelity of the recording", "is_true": "no" },
        { "text": "The length of the microphone cable used", "is_true": "no" },
        { "text": "A type of reverb effect added to vocals", "is_true": "no" }
    ],
    "v1_p4_t8_b_6": [
        { "text": "Sends power to condenser microphones", "is_true": "yes" },
        { "text": "Makes the sound significantly louder", "is_true": "no" },
        { "text": "Turns on the audio interface unit", "is_true": "no" },
        { "text": "Resets all settings to factory default", "is_true": "no" }
    ],
    "v1_p4_t8_b_7": [
        { "text": "Turn down the Gain knob immediately", "is_true": "yes" },
        { "text": "Sing or play louder to compensate", "is_true": "no" },
        { "text": "Turn down the speaker volume", "is_true": "no" },
        { "text": "Ignore it; red means recording", "is_true": "no" }
    ],
    "v1_p4_t8_b_8": [
        { "text": "USB (Type A, B, or C)", "is_true": "yes" },
        { "text": "HDMI (High Def Multimedia)", "is_true": "no" },
        { "text": "Ethernet (Network Cable)", "is_true": "no" },
        { "text": "VGA (Video Graphics Array)", "is_true": "no" }
    ],
    "v1_p4_t8_b_10": [
        { "text": "A socket that accepts both XLR and 1/4 inch jacks", "is_true": "yes" },
        { "text": "A jack used for connecting two pairs of headphones", "is_true": "no" },
        { "text": "A power connector typical for laptops", "is_true": "no" },
        { "text": "A specialized connector for jazz instruments", "is_true": "no" }
    ],
    "v1_p4_t8_i_2": [
        { "text": "Latency decreases, but CPU load increases (risk of crackles)", "is_true": "yes" },
        { "text": "Latency increases, making it harder to play in time", "is_true": "no" },
        { "text": "Sound quality gets measurably better and clearer", "is_true": "no" },
        { "text": "Nothing changes; buffer size is irrelevant", "is_true": "no" }
    ],
    "v1_p4_t8_i_3": [
        { "text": "Listening to the input signal directly from the hardware, bypassing the computer (Zero Latency)", "is_true": "yes" },
        { "text": "Listening through the DAW plugins to hear effects in real-time", "is_true": "no" },
        { "text": "Monitoring at a very high volume level for accuracy", "is_true": "no" },
        { "text": "Watching the waveform on the computer screen instead of listening", "is_true": "no" }
    ],
    "v1_p4_t8_i_4": [
        { "text": "To change the impedance to Hi-Z (High Impedance) to match the pickup", "is_true": "yes" },
        { "text": "To convert the mono guitar signal into a stereo signal", "is_true": "no" },
        { "text": "To add analog distortion to the dry guitar signal", "is_true": "no" },
        { "text": "To cut the bass frequencies to fit the mix better", "is_true": "no" }
    ],
    "v1_p4_t8_i_5": [
        { "text": "To add 8 extra channels of Input/Output via an external preamp unit", "is_true": "yes" },
        { "text": "To connect a second computer monitor for more screen space", "is_true": "no" },
        { "text": "To connect the interface to the internet for updates", "is_true": "no" },
        { "text": "To connect a wireless mouse and keyboard setup", "is_true": "no" }
    ],
    "v1_p4_t8_i_6": [
        { "text": "They allow the DAW to communicate directly with the hardware with low latency", "is_true": "yes" },
        { "text": "They improve the graphical performance of the DAW interface", "is_true": "no" },
        { "text": "They compress the audio to save hard drive space", "is_true": "no" },
        { "text": "They are required only for wireless audio connections", "is_true": "no" }
    ],
    "v1_p4_t8_i_8": [
        { "text": "Input Latency + Procesing + Output Latency", "is_true": "yes" },
        { "text": "Just the Output Latency of the D/A converter", "is_true": "no" },
        { "text": "The time it takes for the computer to boot up", "is_true": "no" },
        { "text": "The length of the reverb tail in the monitor mix", "is_true": "no" }
    ],
    "v1_p4_t8_i_9": [
        { "text": "Sending CV (Control Voltage) to control analog modular synthesizers", "is_true": "yes" },
        { "text": "Powering passive speakers directly from the interface", "is_true": "no" },
        { "text": "Outputting digital S/PDIF signals to other gear", "is_true": "no" },
        { "text": "Saving presets to an external memory card", "is_true": "no" }
    ],
    "v1_p4_t8_i_10": [
        { "text": "For physical volume control, dim, mono summing, and speaker switching involving analog circuitry", "is_true": "yes" },
        { "text": "To improve the digital clocking stability of the converter", "is_true": "no" },
        { "text": "To allow recording of more simultaneous microphone inputs", "is_true": "no" },
        { "text": "To save USB ports on the computer by daisy-chaining", "is_true": "no" }
    ],
    "v1_p4_t8_a_1": [
        { "text": "Timing errors in the sample clock, leading to distortion and stereo image loss", "is_true": "yes" },
        { "text": "Variation in latency depending on CPU load", "is_true": "no" },
        { "text": "Lag experienced over a local network connection", "is_true": "no" },
        { "text": "Physical vibration of the hard drive platters", "is_true": "no" }
    ],
    "v1_p4_t8_a_2": [
        { "text": "When chaining multiple digital devices to ensure they all synchronize to a single Master Clock", "is_true": "yes" },
        { "text": "When you need to record high quality lead vocals", "is_true": "no" },
        { "text": "When you need to power the unit from an external source", "is_true": "no" },
        { "text": "When connecting MIDI keyboards to the computer", "is_true": "no" }
    ],
    "v1_p4_t8_a_3": [
        { "text": "Direct PCIe access allows for lower latency and massive bandwidth compared to USB packet handling", "is_true": "yes" },
        { "text": "It is significantly cheaper to manufacture than USB", "is_true": "no" },
        { "text": "The cables can be run over very long distances", "is_true": "no" },
        { "text": "It adds 'analog warmth' to the digital signal", "is_true": "no" }
    ],
    "v1_p4_t8_a_4": [
        { "text": "It works with generic OS drivers (plug and play) and connects to iOS devices without special drivers", "is_true": "yes" },
        { "text": "It is considered 'high class' luxury equipment", "is_true": "no" },
        { "text": "It is designed specifically for classroom use", "is_true": "no" },
        { "text": "It requires specific proprietary drivers to function", "is_true": "no" }
    ],
    "v1_p4_t8_a_5": [
        { "text": "Linearity at low levels (accuracy of quiet signals without noise modulation)", "is_true": "yes" },
        { "text": "How loud the input signal can be before clipping", "is_true": "no" },
        { "text": "How much 'bass boost' it adds to the signal", "is_true": "no" },
        { "text": "If it has cool looking LED lights on the front", "is_true": "no" }
    ],
    "v1_p4_t8_a_6": [
        { "text": "Frequencies above the Nyquist limit 'fold back' as non-harmonic distortion in the audible range", "is_true": "yes" },
        { "text": "The sound becomes muffled and lacks high frequencies", "is_true": "no" },
        { "text": "The latency of the system increases dramatically", "is_true": "no" },
        { "text": "Nothing happens; digital audio doesn't need filters", "is_true": "no" }
    ],
    "v1_p4_t8_a_7": [
        { "text": "Recording the computer's system audio (e.g. from a browser) internally into the DAW", "is_true": "yes" },
        { "text": "Creating feedback loops for experimental sound design", "is_true": "no" },
        { "text": "Testing cables to see if they differ in capacitance", "is_true": "no" },
        { "text": "Playing audio tracks in reverse for effect", "is_true": "no" }
    ],
    "v1_p4_t8_a_8": [
        { "text": "Coax uses RCA cables (electrical); Optical uses Toslink (light). Both carry the same data", "is_true": "yes" },
        { "text": "Optical sounds noticeably better due to light speed", "is_true": "no" },
        { "text": "Coax is faster and has lower latency than Optical", "is_true": "no" },
        { "text": "Optical is an analog format; Coax is digital", "is_true": "no" }
    ],
    "v1_p4_t8_a_9": [
        { "text": "To run plugins (EQ, Comp) on the interface with near-zero latency, offloading the computer CPU", "is_true": "yes" },
        { "text": "To make the LEDs flash in time with the music", "is_true": "no" },
        { "text": "To store MP3 files directly on the device", "is_true": "no" },
        { "text": "To allow the interface to connect to WiFi networks", "is_true": "no" }
    ],
    "v1_p4_t8_a_10": [
        { "text": "To push quantization noise into ultrasonic frequencies (Noise Shaping) and simplify analog filter design", "is_true": "yes" },
        { "text": "To increase the file size for higher fidelity storage", "is_true": "no" },
        { "text": "To make the recording sound consistently louder", "is_true": "no" },
        { "text": "They don't; oversampling is a marketing myth", "is_true": "no" }
    ],

    # TOPIC 9
    "v1_p4_t9_b_1": [
        { "text": "A speaker with the amplifier built inside the cabinet", "is_true": "yes" },
        { "text": "A speaker that physically moves around the room", "is_true": "no" },
        { "text": "A speaker that requires an external power amp", "is_true": "no" },
        { "text": "A speaker with built-in LED lighting effects", "is_true": "no" }
    ],
    "v1_p4_t9_b_2": [
        { "text": "The distance between the two speakers should equal the distance from each speaker to your head", "is_true": "yes" },
        { "text": "The room itself should be shaped like a triangle", "is_true": "no" },
        { "text": "The speakers should be placed 1 foot apart", "is_true": "no" },
        { "text": "You should sit as far away as possible from the speakers", "is_true": "no" }
    ],
    "v1_p4_t9_b_3": [
        { "text": "To reproduce sound accurately without coloring (boosting bass/treble) so you can fix mistakes", "is_true": "yes" },
        { "text": "To sound nicer and more exciting than Hi-Fi speakers", "is_true": "no" },
        { "text": "To be the loudest possible speakers on the market", "is_true": "no" },
        { "text": "To remove all bass frequencies for clarity", "is_true": "no" }
    ],
    "v1_p4_t9_b_5": [
        { "text": "To decouple them from the desk, preventing vibrations from causing rumble", "is_true": "yes" },
        { "text": "To change the vertical angle of the speakers only", "is_true": "no" },
        { "text": "To catch dust and keep the desk clean", "is_true": "no" },
        { "text": "To make the studio look more professional", "is_true": "no" }
    ],
    "v1_p4_t9_b_7": [
        { "text": "To hear the backing track without the mic picking it up (Bleed)", "is_true": "yes" },
        { "text": "To look professional for the music video shoot", "is_true": "no" },
        { "text": "To protect their ears from the loud singing volume", "is_true": "no" },
        { "text": "It isn't necessary; speakers work fine for vocals", "is_true": "no" }
    ],
    "v1_p4_t9_b_8": [
        { "text": "After prolonged loud listening, ears become less sensitive to frequencies and accuracy drops", "is_true": "yes" },
        { "text": "A sensation of sleepiness in the ear canal", "is_true": "no" },
        { "text": "Physical pain in the outer ear lobe", "is_true": "no" },
        { "text": "Permanent hearing loss from one session", "is_true": "no" }
    ],
    "v1_p4_t9_b_9": [
        { "text": "Turning speakers on first with volume up (Pop risk)", "is_true": "yes" },
        { "text": "Turning the computer on before the interface", "is_true": "no" },
        { "text": "Turning the audio interface on first", "is_true": "no" },
        { "text": "Turning on the room lights before the gear", "is_true": "no" }
    ],
    "v1_p4_t9_i_1": [
        { "text": "Listening close (3-5ft) to minimize the sound of the room acoustics", "is_true": "yes" },
        { "text": "Listening from as far away as possible in the room", "is_true": "no" },
        { "text": "Listening to field recordings of nature sounds", "is_true": "no" },
        { "text": "Headphones monitoring only", "is_true": "no" }
    ],
    "v1_p4_t9_i_2": [
        { "text": "The point where the bass is split sent to the Subwoofer, and highs to the mains (e.g. 80Hz)", "is_true": "yes" },
        { "text": "When two audio cables cross over each other physically", "is_true": "no" },
        { "text": "A type of digital distortion in the high end", "is_true": "no" },
        { "text": "The width of the stereo field in the room", "is_true": "no" }
    ],
    "v1_p4_t9_i_3": [
        { "text": "They allow air to escape, preventing bass build-up and creating a more natural, wide stereo field", "is_true": "yes" },
        { "text": "They allow you to hear the doorbell if it rings", "is_true": "no" },
        { "text": "They are louder and block out all external noise", "is_true": "no" },
        { "text": "They prevent headphone bleed into the microphone", "is_true": "no" }
    ],
    "v1_p4_t9_i_4": [
        { "text": "To compare your mix tone/volume against a professionally mastered commercial release", "is_true": "yes" },
        { "text": "To copy the melody and lyrics of another song", "is_true": "no" },
        { "text": "To check if your song infringes copyright laws", "is_true": "no" },
        { "text": "To fill time while the computer is processing", "is_true": "no" }
    ],
    "v1_p4_t9_i_5": [
        { "text": "To identify Phase Cancellation issues where instruments disappear", "is_true": "yes" },
        { "text": "Because most people listen in mono on their phones", "is_true": "no" },
        { "text": "To save CPU power by processing one channel", "is_true": "no" },
        { "text": "To give the mix a vintage 1960s sound", "is_true": "no" }
    ],
    "v1_p4_t9_i_6": [
        { "text": "If usually one wall is closer, reflections arrive earlier on one side, skewing the stereo image", "is_true": "yes" },
        { "text": "It looks better aesthetically for client photos", "is_true": "no" },
        { "text": "It improves the Feng Shui of the studio", "is_true": "no" },
        { "text": "It makes the overall volume of the room louder", "is_true": "no" }
    ],
    "v1_p4_t9_i_8": [
        { "text": "Absorption soaks up sound (removes reverb); Diffusion scatters sound (keeps reverb but smoothes it)", "is_true": "yes" },
        { "text": "They are the exact same thing; just brand names", "is_true": "no" },
        { "text": "Diffusion makes the room louder; Absorption makes it quieter", "is_true": "no" },
        { "text": "Absorption creates echo; Diffusion removes echo", "is_true": "no" }
    ],
    "v1_p4_t9_i_9": [
        { "text": "They produce more bass for their size, but the bass is less accurate (smearing/ringing)", "is_true": "yes" },
        { "text": "They are significantly quieter than sealed monitors", "is_true": "no" },
        { "text": "They produce less bass but it is tighter", "is_true": "no" },
        { "text": "They tend to overheat more easily", "is_true": "no" }
    ],
    "v1_p4_t9_i_10": [
        { "text": "To see if the mix translates to cheap consumer systems (laptops, car radios) with limited bandwidth", "is_true": "yes" },
        { "text": "Because they sound amazing and high-fidelity", "is_true": "no" },
        { "text": "For checking 5.1 surround sound compatibility", "is_true": "no" },
        { "text": "To hear the ultra-low sub bass frequencies", "is_true": "no" }
    ],
    "v1_p4_t9_a_1": [
        { "text": "Human hearing becomes much less sensitive to Bass and Treble", "is_true": "yes" },
        { "text": "The frequency response becomes perfectly flat", "is_true": "no" },
        { "text": "The midrange frequencies disappear completely", "is_true": "no" },
        { "text": "Everything stays proportional regardless of volume", "is_true": "no" }
    ],
    "v1_p4_t9_a_2": [
        { "text": "Frequencies where the room dimensions match the wavelength, causing huge volume peaks and nulls", "is_true": "yes" },
        { "text": "The different lighting settings available in the studio", "is_true": "no" },
        { "text": "The reverb time settings on the console", "is_true": "no" },
        { "text": "Wireless transmission modes for headphones", "is_true": "no" }
    ],
    "v1_p4_t9_a_3": [
        { "text": "At the 'Mirror Points' (side walls/ceiling) where sound bounces directly to your ear", "is_true": "yes" },
        { "text": "Behind the speakers on the front wall", "is_true": "no" },
        { "text": "On the floor under the desk", "is_true": "no" },
        { "text": "In the corners of the room", "is_true": "no" }
    ],
    "v1_p4_t9_a_4": [
        { "text": "Dedicated Mid-range driver improves vocal clarity and reduces intermodulation distortion", "is_true": "yes" },
        { "text": "It is simply louder than a 2-way system", "is_true": "no" },
        { "text": "It produces significantly more sub-bass", "is_true": "no" },
        { "text": "It looks bigger and more impressive to clients", "is_true": "no" }
    ],
    "v1_p4_t9_a_6": [
        { "text": "Sound bouncing off the desk surface combines with direct sound, causing phase cancellation (Comb Filtering)", "is_true": "yes" },
        { "text": "The desk vibrates sympathetically with the bass", "is_true": "no" },
        { "text": "The desk physically blocks the sound from reaching you", "is_true": "no" },
        { "text": "It isn't a problem; desks are acoustically transparent", "is_true": "no" }
    ],
    "v1_p4_t9_a_7": [
        { "text": "There are two separate amplifiers inside: one specifically for the woofer, one for the tweeter", "is_true": "yes" },
        { "text": "It has two separate inputs for two sources", "is_true": "no" },
        { "text": "It is a stereo speaker in one box", "is_true": "no" },
        { "text": "It works on both AC Mains and Battery power", "is_true": "no" }
    ],
    "v1_p4_t9_a_8": [
        { "text": "Bass frequencies are boosted significantly (up to +6dB per surface)", "is_true": "yes" },
        { "text": "Bass frequencies are reduced significantly", "is_true": "no" },
        { "text": "Treble frequencies are boosted significantly", "is_true": "no" },
        { "text": "Stereo width is artificially increased", "is_true": "no" }
    ],
    "v1_p4_t9_a_9": [
        { "text": "Perfect phase alignment (Point Source) regardless of head position", "is_true": "yes" },
        { "text": "It is much cheaper to manufacture", "is_true": "no" },
        { "text": "It produces louder and deeper bass", "is_true": "no" },
        { "text": "It allows for better cooling of the drivers", "is_true": "no" }
    ],
    "v1_p4_t9_a_10": [
        { "text": "It has equal energy per octave, matching human hearing perception better than White Noise", "is_true": "yes" },
        { "text": "It is more pleasant to listen to than White Noise", "is_true": "no" },
        { "text": "It is mono, whereas White Noise is stereo", "is_true": "no" },
        { "text": "It contains only bass frequencies", "is_true": "no" }
    ],

    # TOPIC 10
    "v1_p4_t10_b_6": [
        { "text": "Bending breaks the internal copper wiring, causing crackles and failure", "is_true": "yes" },
        { "text": "It looks nicer and tidier in the studio", "is_true": "no" },
        { "text": "It slightly changes the sound for the better", "is_true": "no" },
        { "text": "Knots are fine; cables are very durable", "is_true": "no" }
    ],
    "v1_p4_t10_b_7": [
        { "text": "NO! The high power can melt the thin instrument shielding and destroy the amp", "is_true": "yes" },
        { "text": "Yes, they look the same so they work the same", "is_true": "no" },
        { "text": "Yes, but only if the cable is very short", "is_true": "no" },
        { "text": "Only for bass guitar amps, not lead guitar", "is_true": "no" }
    ],
    "v1_p4_t10_b_8": [
        { "text": "Digital Performance Data (Notes on/off), NOT audio", "is_true": "yes" },
        { "text": "Analog Audio signals similar to a microphone", "is_true": "no" },
        { "text": "Electrical Power to drive the speakers", "is_true": "no" },
        { "text": "Video signals for synchronization", "is_true": "no" }
    ],
    "v1_p4_t10_i_1": [
        { "text": "They use Phase Cancellation to reject noise picked up along the cable length", "is_true": "yes" },
        { "text": "They are generally thicker and more durable", "is_true": "no" },
        { "text": "They are louder than unbalanced cables", "is_true": "no" },
        { "text": "They use gold plated connectors for better speed", "is_true": "no" }
    ],
    "v1_p4_t10_i_3": [
        { "text": "An Unbalanced Stereo signal (Left on Tip, Right on Ring) - like headphones", "is_true": "yes" },
        { "text": "High voltage power for lighting", "is_true": "no" },
        { "text": "MIDI Data for synthesizers", "is_true": "no" },
        { "text": "Video signals (Composite)", "is_true": "no" }
    ],
    "v1_p4_t10_i_4": [
        { "text": "To convert High-Impedance Unbalanced Instrument signals to Low-Impedance Balanced Mic signals", "is_true": "yes" },
        { "text": "To add distortion and gain to the guitar signal", "is_true": "no" },
        { "text": "To serve as a guitar tuner on stage", "is_true": "no" },
        { "text": "To split the signal to multiple amplifiers", "is_true": "no" }
    ],
    "v1_p4_t10_i_6": [
        { "text": "Splitting a send/return jack (TRS) into separate Send (TS) and Return (TS) plugs for outboard gear", "is_true": "yes" },
        { "text": "Splitting a headphone output to two pairs of headphones", "is_true": "no" },
        { "text": "Making a mono signal stereo", "is_true": "no" },
        { "text": "Powering the effects unit from the console", "is_true": "no" }
    ],
    "v1_p4_t10_i_7": [
        { "text": "They are immune to electrical hum and ground loops", "is_true": "yes" },
        { "text": "They are physically unbreakable", "is_true": "no" },
        { "text": "They can be run for 10 miles without loss", "is_true": "no" },
        { "text": "They carry power to the receiving device", "is_true": "no" }
    ],
    "v1_p4_t10_i_8": [
        { "text": "Disconnects Pin 1 (Ground) to break a ground loop and stop hum", "is_true": "yes" },
        { "text": "Lifts the box physically off the floor", "is_true": "no" },
        { "text": "Boosts the signal by +20dB", "is_true": "no" },
        { "text": "Turns the unit off completely", "is_true": "no" }
    ],
    "v1_p4_t10_i_10": [
        { "text": "A thick cable containing many individual audio lines, used to run signals from stage to desk", "is_true": "yes" },
        { "text": "A type of analog modular synthesizer", "is_true": "no" },
        { "text": "A heavy duty power cable for amplifiers", "is_true": "no" },
        { "text": "A slang term for a difficult client", "is_true": "no" }
    ],
    "v1_p4_t10_a_1": [
        { "text": "Common Mode Rejection Ratio - how well the input rejects noise present on both pins", "is_true": "yes" },
        { "text": "Common Microphone Record Rate - speed of capture", "is_true": "no" },
        { "text": "Cable Management Rating - how tidy it is", "is_true": "no" },
        { "text": "Current Max Resolution - highest bit depth", "is_true": "no" }
    ],
    "v1_p4_t10_a_2": [
        { "text": "Improperly connecting the XLR Pin 1 (Shield) to the audio circuit ground instead of the chassis, causing noise", "is_true": "yes" },
        { "text": "When Pin 1 is bent inside the connector", "is_true": "no" },
        { "text": "When Pin 1 becomes disconnected (Lifted)", "is_true": "no" },
        { "text": "When Phantom Power fails on Pin 1", "is_true": "no" }
    ],
    "v1_p4_t10_a_3": [
        { "text": "The signal continues to flow to the Bottom jack (normal) AND out the patch cable (split)", "is_true": "yes" },
        { "text": "The connection to the bottom jack is immediately broken", "is_true": "no" },
        { "text": "It mutes all audio signals in the bay", "is_true": "no" },
        { "text": "Nothing happens until you patch the bottom jack", "is_true": "no" }
    ],
    "v1_p4_t10_a_4": [
        { "text": "Mic cables overlap 50-70 Ohms; AES3 requires 110 Ohms impedance to prevent signal reflections", "is_true": "yes" },
        { "text": "Mic cables are too thick to fit the sockets", "is_true": "no" },
        { "text": "Mic cables are unbalanced and AES3 is balanced", "is_true": "no" },
        { "text": "AES3 cables require 4 internal pins, not 3", "is_true": "no" }
    ],
    "v1_p4_t10_a_5": [
        { "text": "Connecting all equipment grounds to a single central point to prevent loops", "is_true": "yes" },
        { "text": "Arranging equipment physically in a star shape", "is_true": "no" },
        { "text": "Using star-shaped washers on rack screws", "is_true": "no" },
        { "text": "A method of wireless power transmission", "is_true": "no" }
    ],
    "v1_p4_t10_a_6": [
        { "text": "The optical cable has a fixed bandwidth limit; doubling sample rate requires combining two channels for one stream", "is_true": "yes" },
        { "text": "It doesn't drop; that is a common misconception", "is_true": "no" },
        { "text": "Because high frequencies take up physically more space", "is_true": "no" },
        { "text": "To save power consumption on the interface", "is_true": "no" }
    ],
    "v1_p4_t10_a_7": [
        { "text": "Carrying 8 channels of balanced analog or digital audio in a single computer-style plug", "is_true": "yes" },
        { "text": "Connecting a video monitor to the computer", "is_true": "no" },
        { "text": "Connecting to the internet via Ethernet", "is_true": "no" },
        { "text": "Providing power to external hard drives", "is_true": "no" }
    ],
    "v1_p4_t10_a_8": [
        { "text": "Line level is too loud and low impedance. Re-Amp boxes attenuate and raise impedance to mimic a guitar pickup", "is_true": "yes" },
        { "text": "It works fine, you just need a simple adapter", "is_true": "no" },
        { "text": "To add reverb to the dry signal", "is_true": "no" },
        { "text": "To balance the signal for the amp input", "is_true": "no" }
    ],
    "v1_p4_t10_a_10": [
        { "text": "It contains an internal preamplifier/buffer circuit requiring voltage", "is_true": "yes" },
        { "text": "It doesn't; only passive DIs work on instruments", "is_true": "no" },
        { "text": "To power the guitar's pickups", "is_true": "no" },
        { "text": "To light up the status LED on the front", "is_true": "no" }
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
            if part['id'] == 'p4':
                for topic in part['topics']:
                    for level, questions in topic['levels'].items():
                        for q in questions:
                            if q['id'] in updates:
                                q['answers'] = updates[q['id']]
                                count += 1

print(f"Updated {count} questions for Part 4")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
