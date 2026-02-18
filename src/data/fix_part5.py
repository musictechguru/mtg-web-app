
import json

updates = {
    # TOPIC 11
    "v1_p5_t11_b_1": [
        { "text": "Input Gain (Trim / Preamp)", "is_true": "yes" },
        { "text": "The Channel Fader Volume", "is_true": "no" },
        { "text": "The High Frequency EQ", "is_true": "no" },
        { "text": "The Pan Potentiometer", "is_true": "no" }
    ],
    "v1_p5_t11_b_2": [
        { "text": "Because Mic Level (-60dB) is too quiet to work with and needs boosting to Line Level (+4dB)", "is_true": "yes" },
        { "text": "To change the tone of the microphone to make it sound better", "is_true": "no" },
        { "text": "To convert the mono signal into a stereo signal for recording", "is_true": "no" },
        { "text": "To remove background noise from the recording environment", "is_true": "no" }
    ],
    "v1_p5_t11_b_3": [
        { "text": "You risk permanently destroying the ribbon element", "is_true": "yes" },
        { "text": "It improves the sound quality significantly", "is_true": "no" },
        { "text": "Nothing happens; it is perfectly safe", "is_true": "no" },
        { "text": "It charges the microphone's internal battery", "is_true": "no" }
    ],
    "v1_p5_t11_b_4": [
        { "text": "When the source is too loud and distorting the preamp even at minimum gain", "is_true": "yes" },
        { "text": "When the signal is too quiet and needs a boost", "is_true": "no" },
        { "text": "To add more bass frequencies to the signal", "is_true": "no" },
        { "text": "To mute the channel completely during downtime", "is_true": "no" }
    ],
    "v1_p5_t11_b_5": [
        { "text": "Removes low frequencies (rumble) below a set point like 80Hz", "is_true": "yes" },
        { "text": "Removes high frequencies (hiss) from the signal", "is_true": "no" },
        { "text": "Boosts the bass frequencies for a warmer sound", "is_true": "no" },
        { "text": "Makes the vocals sound higher pitched and unnatural", "is_true": "no" }
    ],
    "v1_p5_t11_b_6": [
        { "text": "Phase Invert (flips polarity 180 degrees)", "is_true": "yes" },
        { "text": "Phantom Power (48V) activation", "is_true": "no" },
        { "text": "Power button for the channel strip", "is_true": "no" },
        { "text": "Mute button to silence the channel", "is_true": "no" }
    ],
    "v1_p5_t11_b_8": [
        { "text": "The input signal is clipping (distorting) at the preamp stage", "is_true": "yes" },
        { "text": "The channel is currently muted or disabled", "is_true": "no" },
        { "text": "Phantom power is currently active on the channel", "is_true": "no" },
        { "text": "Recording is active on this specific track", "is_true": "no" }
    ],
    "v1_p5_t11_b_9": [
        { "text": "Gain sets the sensitivity entering the channel; Fader sets the output level leaving the channel", "is_true": "yes" },
        { "text": "They are exactly the same thing and work identically", "is_true": "no" },
        { "text": "Gain controls bass frequencies, Volume controls treble", "is_true": "no" },
        { "text": "Fader is for recording level, Gain is for monitoring", "is_true": "no" }
    ],
    "v1_p5_t11_b_10": [
        { "text": "To send the signal out to an external processor (like a compressor) and return it to the same point", "is_true": "yes" },
        { "text": "To add a reverb effect to the signal path", "is_true": "no" },
        { "text": "To plug in a phone or MP3 player for playback", "is_true": "no" },
        { "text": "To monitor the signal with headphones directly", "is_true": "no" }
    ],
    "v1_p5_t11_i_2": [
        { "text": "To maximize Signal-to-Noise Ratio (pushing the music far above the hiss floor)", "is_true": "yes" },
        { "text": "To make the final recording as loud as possible", "is_true": "no" },
        { "text": "To add analog warmth and saturation to the tone", "is_true": "no" },
        { "text": "To use less electricity and save power", "is_true": "no" }
    ],
    "v1_p5_t11_i_3": [
        { "text": "To counteract Proximity Effect bass boost and remove plosive energy", "is_true": "yes" },
        { "text": "To make the voice sound thinner and more distant", "is_true": "no" },
        { "text": "To remove sibilance and harsh high frequencies", "is_true": "no" },
        { "text": "To add 'air' and presence to the vocal recording", "is_true": "no" }
    ],
    "v1_p5_t11_i_4": [
        { "text": "Harmonic Saturation (Warmth) when pushed hard", "is_true": "yes" },
        { "text": "Unpleasant digital distortion and clipping", "is_true": "no" },
        { "text": "A slight delay or echo to the signal", "is_true": "no" },
        { "text": "Phase cancellation at low frequencies", "is_true": "no" }
    ],
    "v1_p5_t11_i_5": [
        { "text": "When there is a low-frequency hum (50/60Hz) caused by a ground loop", "is_true": "yes" },
        { "text": "Always; it is good practice to leave it on", "is_true": "no" },
        { "text": "When using phantom power with a condenser mic", "is_true": "no" },
        { "text": "To increase the gain of the signal significantly", "is_true": "no" }
    ],
    "v1_p5_t11_i_6": [
        { "text": "It darkens the tone and tightens the transient response (damps the capsule)", "is_true": "yes" },
        { "text": "It makes the tone significantly brighter and harsher", "is_true": "no" },
        { "text": "It adds a noticeable reverb effect to the sound", "is_true": "no" },
        { "text": "It increases the output level of the microphone", "is_true": "no" }
    ],
    "v1_p5_t11_i_7": [
        { "text": "Because noise or distortion added here is amplified by every subsequent stage (Compressor, EQ, Fader)", "is_true": "yes" },
        { "text": "It isn't critical; modern gear has infinite headroom", "is_true": "no" },
        { "text": "Because faders do not have any gain capability", "is_true": "no" },
        { "text": "To save battery life on portable recorders", "is_true": "no" }
    ],
    "v1_p5_t11_i_8": [
        { "text": "Polarity (Swapping Positive and Negative wires), impacting all frequencies equally", "is_true": "yes" },
        { "text": "Phase (Delay over time), affecting frequencies differently", "is_true": "no" },
        { "text": "Neither; it just mutes the channel temporarily", "is_true": "no" },
        { "text": "Both Phase and Polarity simultaneously", "is_true": "no" }
    ],
    "v1_p5_t11_i_9": [
        { "text": "Mic Gain boosts weak signals (+60dB); Line Trim fine-tunes strong signals (+/- 10dB)", "is_true": "yes" },
        { "text": "They are the same thing just named differently", "is_true": "no" },
        { "text": "Trim cuts the signal, while Gain boosts it", "is_true": "no" },
        { "text": "Trim is a digital control, Gain is analog", "is_true": "no" }
    ],
    "v1_p5_t11_i_10": [
        { "text": "Applies gentle analog compression just before the A/D converter to prevent digital clipping", "is_true": "yes" },
        { "text": "Limits the file size of the recording to save space", "is_true": "no" },
        { "text": "Limits the bass frequencies to prevent rumble", "is_true": "no" },
        { "text": "Automatically turns the volume down if it gets loud", "is_true": "no" }
    ],
    "v1_p5_t11_a_1": [
        { "text": "It is extremely quiet, near the theoretical limit of physics", "is_true": "yes" },
        { "text": "It is very noisy and poor quality", "is_true": "no" },
        { "text": "It is powerful enough to drive headphones loudly", "is_true": "no" },
        { "text": "It produces high levels of harmonic distortion", "is_true": "no" }
    ],
    "v1_p5_t11_a_2": [
        { "text": "It removes it completely, as DC is essentially 0Hz", "is_true": "yes" },
        { "text": "It increases the DC offset significantly", "is_true": "no" },
        { "text": "It hides the DC offset but doesn't remove it", "is_true": "no" },
        { "text": "It does nothing to DC offset values", "is_true": "no" }
    ],
    "v1_p5_t11_a_3": [
        { "text": "How fast the circuit can respond to a sudden burst of voltage (Transient Accuracy)", "is_true": "yes" },
        { "text": "How much total gain the preamp can provide", "is_true": "no" },
        { "text": "The bass frequency response of the unit", "is_true": "no" },
        { "text": "The power consumption in Watts", "is_true": "no" }
    ],
    "v1_p5_t11_a_4": [
        { "text": "Signal leaking from one channel into the adjacent channel", "is_true": "yes" },
        { "text": "The engineer talking back to the artist", "is_true": "no" },
        { "text": "A type of digital distortion in the high end", "is_true": "no" },
        { "text": "Enhancing the stereo width of the signal", "is_true": "no" }
    ],
    "v1_p5_t11_a_5": [
        { "text": "Phase Shift at and around the cutoff frequency", "is_true": "yes" },
        { "text": "Added noise to the signal path", "is_true": "no" },
        { "text": "Reduced overall volume level", "is_true": "no" },
        { "text": "Harmonic distortion introduction", "is_true": "no" }
    ],
    "v1_p5_t11_a_6": [
        { "text": "Total Harmonic Distortion plus Noise - a torture test for signal purity", "is_true": "yes" },
        { "text": "Total High Definition audio quality", "is_true": "no" },
        { "text": "The model Name of the preamp unit", "is_true": "no" },
        { "text": "Thermal Heat Dissipation rating", "is_true": "no" }
    ],
    "v1_p5_t11_a_7": [
        { "text": "They amplify the full wave cycle with one component, eliminating 'Crossover Distortion' for purer sound", "is_true": "yes" },
        { "text": "They are highly energy efficient and green", "is_true": "no" },
        { "text": "They run much cooler than other designs", "is_true": "no" },
        { "text": "They are smaller and lighter to transport", "is_true": "no" }
    ],
    "v1_p5_t11_a_8": [
        { "text": "Usually not; Automation is typically reserved for the Fader. Trim is a set-and-forget calibration.", "is_true": "yes" },
        { "text": "Yes always; it is the main volume control", "is_true": "no" },
        { "text": "Only on specific days of the week", "is_true": "no" },
        { "text": "It acts as a compressor threshold control", "is_true": "no" }
    ],
    "v1_p5_t11_a_9": [
        { "text": "It allows surgical tuning - e.g. rolling off exactly up to the lowest note of the guitar without thinning it", "is_true": "yes" },
        { "text": "It is cheaper to manufacture than a fixed switch", "is_true": "no" },
        { "text": "It looks cooler on the front panel", "is_true": "no" },
        { "text": "It adds extra gain to the signal", "is_true": "no" }
    ],
    "v1_p5_t11_a_10": [
        { "text": "The signal works but becomes unbalanced (Ring is grounded), losing noise rejection", "is_true": "yes" },
        { "text": "No sound passes through the connection at all", "is_true": "no" },
        { "text": "The equipment explodes immediately", "is_true": "no" },
        { "text": "The phase is automatically reversed", "is_true": "no" }
    ],
    "v1_p5_t11_m_1": [
        { "text": "By a factor of 1000 (10^3 voltage ratio)", "is_true": "yes" },
        { "text": "By half (50%)", "is_true": "no" },
        { "text": "Completely (Infinity)", "is_true": "no" },
        { "text": "60 times exactly", "is_true": "no" }
    ],
    "v1_p5_t11_m_2": [
        { "text": "The lag between the magnetizing force and the magnetic flux, causing pleasant harmonic distortion", "is_true": "yes" },
        { "text": "A total failure of the transformer core", "is_true": "no" },
        { "text": "Digital jitter caused by the magnets", "is_true": "no" },
        { "text": "A complete frequency cutout at 1kHz", "is_true": "no" }
    ],
    "v1_p5_t11_m_3": [
        { "text": "It uses individual transistors, resistors, and capacitors rather than Integrated Circuits (Op-Amps)", "is_true": "yes" },
        { "text": "It is extremely quiet", "is_true": "no" },
        { "text": "It operates in the digital domain", "is_true": "no" },
        { "text": "It is physically very small", "is_true": "no" }
    ],
    "v1_p5_t11_m_4": [
        { "text": "Active uses power to maintain or boost level; Passive only cuts and has insertion loss", "is_true": "yes" },
        { "text": "Passive is always better quality than Active", "is_true": "no" },
        { "text": "Active is digital; Passive is analog", "is_true": "no" },
        { "text": "They are exactly the same in operation", "is_true": "no" }
    ],
    "v1_p5_t11_m_5": [
        { "text": "To maximize Power Transfer across miles of cable (at the cost of 6dB voltage loss)", "is_true": "yes" },
        { "text": "To make the audio sound subjectively better", "is_true": "no" },
        { "text": "To save money on copper cabling", "is_true": "no" },
        { "text": "To stop reflections in short cables", "is_true": "no" }
    ],
    "v1_p5_t11_m_6": [
        { "text": "It is the modern AES standard where Pin 2 carries the Positive (+) phase signal", "is_true": "yes" },
        { "text": "Pin 2 carries the ground connection", "is_true": "no" },
        { "text": "Pin 2 carries 48V Phantom Power", "is_true": "no" },
        { "text": "It is a dangerous wiring fault", "is_true": "no" }
    ],
    "v1_p5_t11_m_7": [
        { "text": "It must cut everything above 22.05kHz completely without affecting 20kHz, requiring a 'Brick Wall' slope", "is_true": "yes" },
        { "text": "To remove excessive bass frequencies", "is_true": "no" },
        { "text": "To allow aliasing for artistic effect", "is_true": "no" },
        { "text": "It is actually a very gentle slope", "is_true": "no" }
    ],
    "v1_p5_t11_m_9": [
        { "text": "It offers extremely high input impedance, ideal for DI instrument inputs", "is_true": "yes" },
        { "text": "It is basically a low impedance input", "is_true": "no" },
        { "text": "It is a digital input type", "is_true": "no" },
        { "text": "It uses vacuum tubes for warmth", "is_true": "no" }
    ],
    "v1_p5_t11_m_10": [
        { "text": "As you increase Gain, the Frequency Bandwidth decreases (highs roll off)", "is_true": "yes" },
        { "text": "Gain increases bandwidth simultaneously", "is_true": "no" },
        { "text": "Bandwidth increases the gain available", "is_true": "no" },
        { "text": "Neither changes; they are independent", "is_true": "no" }
    ],

    # TOPIC 12
    "v1_p5_t12_b_1": [
        { "text": "To control the volume of the signal sent to the Mix Bus (Main Output)", "is_true": "yes" },
        { "text": "To add gain to the microphone input", "is_true": "no" },
        { "text": "To change the pitch of the audio", "is_true": "no" },
        { "text": "To apply EQ to the signal", "is_true": "no" }
    ],
    "v1_p5_t12_b_6": [
        { "text": "Dead Center (C)", "is_true": "yes" },
        { "text": "Hard Left (L)", "is_true": "no" },
        { "text": "Hard Right (R)", "is_true": "no" },
        { "text": "Moving around constantly", "is_true": "no" }
    ],
    "v1_p5_t12_b_7": [
        { "text": "Panning things ONLY Left, Center, or Right (Hard panning) with nothing in between", "is_true": "yes" },
        { "text": "Low Center Resolution mixing technique", "is_true": "no" },
        { "text": "Liquid Crystal Recording format", "is_true": "no" },
        { "text": "Lazy Cat Resting position", "is_true": "no" }
    ],
    "v1_p5_t12_b_8": [
        { "text": "Gradually turning everything up throughout a mix session until you run out of headroom", "is_true": "yes" },
        { "text": "Faders moving by themselves due to ghosts", "is_true": "no" },
        { "text": "A creepy sound coming from the speakers", "is_true": "no" },
        { "text": "Faders getting sticky and hard to move", "is_true": "no" }
    ],
    "v1_p5_t12_b_9": [
        { "text": "To control the volume of multiple channels (e.g. all 10 drum mics) with a single fader", "is_true": "yes" },
        { "text": "It is just an extra spare fader", "is_true": "no" },
        { "text": "To increase the mic pre gain globally", "is_true": "no" },
        { "text": "To control the headphone volume only", "is_true": "no" }
    ],
    "v1_p5_t12_i_1": [
        { "text": "It sounds 3dB louder (because it was coming out of 2 speakers, now it's all in 1)", "is_true": "yes" },
        { "text": "It sounds noticeably quieter", "is_true": "no" },
        { "text": "It disappears completely from the mix", "is_true": "no" },
        { "text": "The pitch drops significantly", "is_true": "no" }
    ],
    "v1_p5_t12_i_2": [
        { "text": "PFL lets you hear the signal at full level regardless of fader position; AFL lets you hear it at the mixed volume", "is_true": "yes" },
        { "text": "PFL adds reverb to the soloed signal", "is_true": "no" },
        { "text": "AFL is used strictly for recording", "is_true": "no" },
        { "text": "They are exactly the same function", "is_true": "no" }
    ],
    "v1_p5_t12_i_3": [
        { "text": "A VCA controls the voltage of the individual channel faders remotely; no audio actually passes through the VCA fader itself", "is_true": "yes" },
        { "text": "A VCA produces a better sound quality", "is_true": "no" },
        { "text": "A VCA adds compression to the group", "is_true": "no" },
        { "text": "Audio passes directly through the VCA fader", "is_true": "no" }
    ],
    "v1_p5_t12_i_4": [
        { "text": "Because it constructively mutes all other channels on the Main PA, killing the show for the audience", "is_true": "yes" },
        { "text": "It breaks the mixing desk internal circuitry", "is_true": "no" },
        { "text": "It creates immediate feedback loops", "is_true": "no" },
        { "text": "It is illegal to use in public venues", "is_true": "no" }
    ],
    "v1_p5_t12_i_5": [
        { "text": "Because human hearing perceives volume logarithmically; a linear fader would sound like an on/off switch", "is_true": "yes" },
        { "text": "It is cheaper to manufacture them that way", "is_true": "no" },
        { "text": "To fit more numbers on the scale", "is_true": "no" },
        { "text": "It looks nicer aesthetically", "is_true": "no" }
    ],
    "v1_p5_t12_i_7": [
        { "text": "Reduces monitor volume by a set amount (e.g. -20dB) to allow for conversation without losing the volume setting", "is_true": "yes" },
        { "text": "Dims the lights in the studio", "is_true": "no" },
        { "text": "Turns off the computer screen", "is_true": "no" },
        { "text": "Mutes the output completely", "is_true": "no" }
    ],
    "v1_p5_t12_i_8": [
        { "text": "The mathematical (or electrical) addition of all channel voltages into a single stereo signal", "is_true": "yes" },
        { "text": "Calculating the total bill for the client", "is_true": "no" },
        { "text": "Adding auxiliary sends to the mix", "is_true": "no" },
        { "text": "Checking for phase cancellation issues", "is_true": "no" }
    ],
    "v1_p5_t12_i_9": [
        { "text": "Digitally Controlled Amplifier (The digital equivalent of a VCA)", "is_true": "yes" },
        { "text": "Digital Cable Audio standard", "is_true": "no" },
        { "text": "Direct Current Amperage measurement", "is_true": "no" },
        { "text": "Dual Channel Audio processing", "is_true": "no" }
    ],
    "v1_p5_t12_i_10": [
        { "text": "To ensure your gain staging is correct and you aren't masking a clipping mix by turning it down at the end", "is_true": "yes" },
        { "text": "Because it looks good to have it at the top", "is_true": "no" },
        { "text": "To make the final mix louder", "is_true": "no" },
        { "text": "It doesn't matter where it is set", "is_true": "no" }
    ],
    "v1_p5_t12_a_1": [
        { "text": "A small belt and motor drive the physical cap to match the automation data written in the DAW", "is_true": "yes" },
        { "text": "Magnets under the surface move them", "is_true": "no" },
        { "text": "Wind power from internal fans", "is_true": "no" },
        { "text": "They don't move physically; it's an illusion", "is_true": "no" }
    ],
    "v1_p5_t12_a_2": [
        { "text": "By adding phase-inverted content to the Side channel (Mid-Side processing)", "is_true": "yes" },
        { "text": "Panning the channels harder to the left and right", "is_true": "no" },
        { "text": "Turning the volume up significantly", "is_true": "no" },
        { "text": "Using mono instead of stereo", "is_true": "no" }
    ],
    "v1_p5_t12_a_3": [
        { "text": "To prevent the Reverb from being muted when you Solo a distinct vocal track", "is_true": "yes" },
        { "text": "To protect the channel from computer viruses", "is_true": "no" },
        { "text": "To lock the volume fader in place", "is_true": "no" },
        { "text": "To make the effect louder in the mix", "is_true": "no" }
    ],
    "v1_p5_t12_a_4": [
        { "text": "The psychoacoustic illusion of a sound source directly in front of you, created by equal volume from L and R speakers", "is_true": "yes" },
        { "text": "A ghost in the studio", "is_true": "no" },
        { "text": "A dedicated center speaker playing audio", "is_true": "no" },
        { "text": "A mono recording played on stereo speakers", "is_true": "no" }
    ],
    "v1_p5_t12_a_6": [
        { "text": "You hear the channel loudly in headphones/monitors, but it is silent in the main mix", "is_true": "yes" },
        { "text": "You hear silence everywhere", "is_true": "no" },
        { "text": "You hear loud distortion", "is_true": "no" },
        { "text": "You hear it in the main mix normally", "is_true": "no" }
    ],
    "v1_p5_t12_a_7": [
        { "text": "The area at the bottom of the fader where you write the instrument name (tape or digital display)", "is_true": "yes" },
        { "text": "Where you draw art during breaks", "is_true": "no" },
        { "text": "A place for writing session notes", "is_true": "no" },
        { "text": "The meter bridge at the top", "is_true": "no" }
    ],
    "v1_p5_t12_a_8": [
        { "text": "A high-speed Ethernet protocol for DAW controllers (e.g. Avid S6) offering deeper control than MIDI", "is_true": "yes" },
        { "text": "A type of specially shielded cable", "is_true": "no" },
        { "text": "A popular plugin format for Windows", "is_true": "no" },
        { "text": "A famous rock band from the 80s", "is_true": "no" }
    ],
    "v1_p5_t12_a_9": [
        { "text": "To mute a specific set of channels (e.g. all FX returns or all drums) with a single button press", "is_true": "yes" },
        { "text": "To mute everyone in the studio", "is_true": "no" },
        { "text": "To group faders for movement", "is_true": "no" },
        { "text": "To hide channels from view", "is_true": "no" }
    ],
    "v1_p5_t12_a_10": [
        { "text": "Write overwrites ALL data continuously (dangerous). Touch only writes while you are touching the fader", "is_true": "yes" },
        { "text": "Write is for lyrics; Touch is for editing", "is_true": "no" },
        { "text": "Touch is for touchscreens only", "is_true": "no" },
        { "text": "They are the same mode", "is_true": "no" }
    ],
    "v1_p5_t12_m_1": [
        { "text": "The dynamic range is >1500dB. Values above 0dB are preserved, not truncated, so you can just turn the Master down to recover the audio", "is_true": "yes" },
        { "text": "It is magic and defies physics", "is_true": "no" },
        { "text": "It has an automatic limiter on every channel", "is_true": "no" },
        { "text": "It clips at +10dB instead of 0dB", "is_true": "no" }
    ],
    "v1_p5_t12_m_2": [
        { "text": "It uses HRTF (Head Related Transfer Functions) to simulate 3D position (front/back/up/down) for headphones", "is_true": "yes" },
        { "text": "It is designed for two ears only", "is_true": "no" },
        { "text": "It is just standard Left/Right panning", "is_true": "no" },
        { "text": "It adds a noticeable echo to the sound", "is_true": "no" }
    ],
    "v1_p5_t12_m_3": [
        { "text": "Audio Subgroups add a tiny processing delay (latency) which can comb-filter against the parallel dry signal; VCAs add zero latency", "is_true": "yes" },
        { "text": "Groups are analog and VCAs are digital", "is_true": "no" },
        { "text": "VCAs are much slower to respond", "is_true": "no" },
        { "text": "They don't; it is a myth", "is_true": "no" }
    ],
    "v1_p5_t12_m_4": [
        { "text": "The analog reconstruction filter can overshoot the digital samples (Inter-Sample Peaks) exceeding 0dB", "is_true": "yes" },
        { "text": "The meter is likely broken or uncalibrated", "is_true": "no" },
        { "text": "Consumers use different speakers", "is_true": "no" },
        { "text": "Compression adds distortion automatically", "is_true": "no" }
    ],
    "v1_p5_t12_m_5": [
        { "text": "Mutes can cause clicks/pops if cut mid-wave, and they cut reverb tails unnaturally. Faders allow smooth fade outs", "is_true": "yes" },
        { "text": "Mutes do not save with the project file", "is_true": "no" },
        { "text": "Faders use less CPU power", "is_true": "no" },
        { "text": "It isn't bad practice; do whatever you want", "is_true": "no" }
    ],
    "v1_p5_t12_m_6": [
        { "text": "Compromise between Sin/Cos (constant power) and Linear rules, favoured by some SSL analog consoles", "is_true": "yes" },
        { "text": "It is for film mixing only", "is_true": "no" },
        { "text": "It is strictly digital", "is_true": "no" },
        { "text": "It makes the center channel louder", "is_true": "no" }
    ],
    "v1_p5_t12_m_7": [
        { "text": "It adds a relative offset to existing automation moves (scaling them up/down) without overwriting the original intricate moves", "is_true": "yes" },
        { "text": "It cuts the head and tail of the clip", "is_true": "no" },
        { "text": "It deletes all automation on the track", "is_true": "no" },
        { "text": "It normalizes the volume to 0dB", "is_true": "no" }
    ],
    "v1_p5_t12_m_9": [
        { "text": "Only at the very final output stage when converting back to a fixed bit depth (e.g. 24 or 16 bit) for export", "is_true": "yes" },
        { "text": "On every channel fader individually", "is_true": "no" },
        { "text": "Never; dither is obsolete", "is_true": "no" },
        { "text": "Before any compression is applied", "is_true": "no" }
    ],
    "v1_p5_t12_m_10": [
        { "text": "Poor Left/Right tracking matching, causing the stereo image to drift to one side", "is_true": "yes" },
        { "text": "Digital noise introduction", "is_true": "no" },
        { "text": "Extreme latency issues", "is_true": "no" },
        { "text": "Phase inversion of one channel", "is_true": "no" }
    ],

    # TOPIC 13
    "v1_p5_t13_b_2": [
        { "text": "The signal is tapped BEFORE the fader, so moving the main volume fader has NO effect on the send level", "is_true": "yes" },
        { "text": "The signal is tapped after the EQ section", "is_true": "no" },
        { "text": "The signal is completely muted", "is_true": "no" },
        { "text": "It means the signal comes before the preamp", "is_true": "no" }
    ],
    "v1_p5_t13_b_3": [
        { "text": "The signal is tapped AFTER the fader, so turning down the fader ALSO turns down the send", "is_true": "yes" },
        { "text": "The signal is delayed by 10ms", "is_true": "no" },
        { "text": "It goes to the post office", "is_true": "no" },
        { "text": "It is significantly louder", "is_true": "no" }
    ],
    "v1_p5_t13_b_6": [
        { "text": "Hosting a shared plugin (like a Reverb) that multiple tracks send signal to", "is_true": "yes" },
        { "text": "Recording MIDI data from keyboards", "is_true": "no" },
        { "text": "Mastering the final stereo mix", "is_true": "no" },
        { "text": "Nothing; it is a placeholder", "is_true": "no" }
    ],
    "v1_p5_t13_i_3": [
        { "text": "A 'Mix of Mixes' - it allows you to route Groups and Main L/R to a new output (e.g. for Foyer speakers or Livestream feed)", "is_true": "yes" },
        { "text": "A movie starring Keanu Reeves", "is_true": "no" },
        { "text": "A type of reverb algorithm", "is_true": "no" },
        { "text": "A standard channel input", "is_true": "no" }
    ],
    "v1_p5_t13_i_5": [
        { "text": "Yes, treating the Reverb itself as an audio source to shape its tone (e.g. cutting muddy lows from the reverb tail)", "is_true": "yes" },
        { "text": "No, it is locked and cannot be changed", "is_true": "no" },
        { "text": "Only with specific digital desks", "is_true": "no" },
        { "text": "Only volume can be changed", "is_true": "no" }
    ],
    "v1_p5_t13_i_6": [
        { "text": "The reverb enters the center of the stereo space. Panning the send places the reverb excitation left or right", "is_true": "yes" },
        { "text": "It stays mono regardless of the reverb", "is_true": "no" },
        { "text": "It breaks the stereo image completely", "is_true": "no" },
        { "text": "It sounds dry with no effect", "is_true": "no" }
    ],
    "v1_p5_t13_i_7": [
        { "text": "Send the Kick Drum via a Pre-Fader bus to the 'Key Input' of the Bass compressor. No sound is heard from the bus, it is just a trigger", "is_true": "yes" },
        { "text": "Send it to the main input of the channel", "is_true": "no" },
        { "text": "Use an insert point instead", "is_true": "no" },
        { "text": "Use a group fader to link them", "is_true": "no" }
    ],
    "v1_p5_t13_i_8": [
        { "text": "A Bus is the 'wire/pathway' that carries the signal. An Aux is the 'control' that puts signal onto that bus", "is_true": "yes" },
        { "text": "They are unrelated concepts", "is_true": "no" },
        { "text": "Bus is for cars, Aux is for audio", "is_true": "no" },
        { "text": "Aux is for power distribution", "is_true": "no" }
    ],
    "v1_p5_t13_i_9": [
        { "text": "Because reverb IS delay. A few milliseconds of pre-delay on a reverb return sounds natural. On an insert (Dry), it causes phasing", "is_true": "yes" },
        { "text": "It is actually more critical", "is_true": "no" },
        { "text": "It causes immediate feedback loops", "is_true": "no" },
        { "text": "It adds treble to the signal", "is_true": "no" }
    ],
    "v1_p5_t13_a_1": [
        { "text": "It swaps the function of the main faders and the Aux Send rotaries, allowing you to mix monitors visually using the big faders", "is_true": "yes" },
        { "text": "It turns the fader physically upside down", "is_true": "no" },
        { "text": "It inverts the polarity of the channel", "is_true": "no" },
        { "text": "It deletes the mix completely", "is_true": "no" }
    ],
    "v1_p5_t13_a_2": [
        { "text": "Duplicating a signal to multiple destinations (e.g. sending a vocal to 3 different compressors)", "is_true": "yes" },
        { "text": "Adding treble to the signal", "is_true": "no" },
        { "text": "Using multiple microphones on one source", "is_true": "no" },
        { "text": "Muting the channel", "is_true": "no" }
    ],
    "v1_p5_t13_a_3": [
        { "text": "So that if you pan the guitar left, the delay also appears on the left (maintaining spatial positioning)", "is_true": "yes" },
        { "text": "It is louder and clearer", "is_true": "no" },
        { "text": "It creates a ping pong effect", "is_true": "no" },
        { "text": "It cancels the panning out", "is_true": "no" }
    ],
    "v1_p5_t13_a_4": [
        { "text": "Sending a mix to a remote guest that typically contains the whole show MINUS their own voice (to prevent echo overlap)", "is_true": "yes" },
        { "text": "Subtracting noise from the signal", "is_true": "no" },
        { "text": "Mixing with negative numbers", "is_true": "no" },
        { "text": "Removing the host from the show", "is_true": "no" }
    ],
    "v1_p5_t13_a_6": [
        { "text": "Parallel processed signals (like parallel compression) will play out of time, causing severe phasing", "is_true": "yes" },
        { "text": "It uses less power and CPU", "is_true": "no" },
        { "text": "Reverb sounds better without it", "is_true": "no" },
        { "text": "Nothing happens; it is optional", "is_true": "no" }
    ],
    "v1_p5_t13_a_8": [
        { "text": "A discreet output for that single channel alone, usually post-preamp, used for multitrack recording", "is_true": "yes" },
        { "text": "The main mix output of the console", "is_true": "no" },
        { "text": "The headphone output jack", "is_true": "no" },
        { "text": "A direct box connection", "is_true": "no" }
    ],
    "v1_p5_t13_a_10": [
        { "text": "Automating the Aux Send un-mute for just one specific word (making it echo) then muting it again", "is_true": "yes" },
        { "text": "Throwing the unit across the room", "is_true": "no" },
        { "text": "A very long delay setting", "is_true": "no" },
        { "text": "A broken delay unit", "is_true": "no" }
    ],
    "v1_p5_t13_m_1": [
        { "text": "Digital units add latency (A/D D/A conversion time). Combining this delayed signal with the analog dry signal causes severe comb filtering", "is_true": "yes" },
        { "text": "Digital units are too clean for this", "is_true": "no" },
        { "text": "Analog is faster than light speed", "is_true": "no" },
        { "text": "It causes digital distortion", "is_true": "no" }
    ],
    "v1_p5_t13_m_2": [
        { "text": "Printed stereo files of subgroups (e.g. Drums Stem, Vocal Stem, Music Stem) that sum perfectly to equal the final mix", "is_true": "yes" },
        { "text": "The raw multitrack files from the session", "is_true": "no" },
        { "text": "Mono files of each instrument", "is_true": "no" },
        { "text": "MP3 versions of the song", "is_true": "no" }
    ],
    "v1_p5_t13_m_5": [
        { "text": "Post-Fader logic dictates the send is tapped AFTER the mute block. Pre-Fader is tapped BEFORE the mute block", "is_true": "yes" },
        { "text": "It is a bug in the software", "is_true": "no" },
        { "text": "Pre-Fader has no mute capability", "is_true": "no" },
        { "text": "It works by magic", "is_true": "no" }
    ],
    "v1_p5_t13_m_6": [
        { "text": "To prevent the heavy kick drum energy from triggering the compressor, allowing the mix to breathe while still compressing mids", "is_true": "yes" },
        { "text": "To remove bass from the song entirely", "is_true": "no" },
        { "text": "To make the compressor work faster", "is_true": "no" },
        { "text": "To distort the signal intentionally", "is_true": "no" }
    ],
    "v1_p5_t13_m_9": [
        { "text": "Sending different instrument groups (A, B, C, D) to separate compressors before summing, for cumulative glue", "is_true": "yes" },
        { "text": "Mixing the song backwards", "is_true": "no" },
        { "text": "Panning everything to the rear speakers", "is_true": "no" },
        { "text": "Using surround sound techniques", "is_true": "no" }
    ],
    "v1_p5_t13_m_10": [
        { "text": "To totally prevent ground loops when connecting to distant FX racks or stage monitors running on different power circuits", "is_true": "yes" },
        { "text": "To add extra gain to the signal", "is_true": "no" },
        { "text": "To cut bass frequencies out", "is_true": "no" },
        { "text": "To act as a status symbol", "is_true": "no" }
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

print(f"Updated {count} questions for Part 5")

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)
