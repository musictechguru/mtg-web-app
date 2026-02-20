import json
import os

# Define the file path
COURSE_DATA_PATH = 'src/data/course_data.json'

def create_quiz_data():
    return [
        {
            "id": f"quiz-history-1",
            "title": "Historical Context: 1960s Classic Rock & Psychedelia",
            "type": "lp_quiz",
            "isPremium": False,
            "description": "Mastery quiz covering the technology, techniques, and limitations of 1960s Classic Rock & Psychedelia.",
            "questions": [
                {
                    "title": "Q1: Tape Limitation",
                    "content": "In the 1960s, what technique was used to overcome the track limitations of early 4-track tape recording?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Digital multitracking", "is_true": "no"},
                        {"text": "Bouncing down / Ping-ponging", "is_true": "yes"},
                        {"text": "Syncing two machines with SMPTE", "is_true": "no"},
                        {"text": "MIDI Sequencing", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Bouncing down, or 'ping-ponging', involves mixing multiple tracks from one tape machine and recording them onto a single track of another machine to free up space, though this increased tape noise (hiss) with each bounce.",
                    "expert_quote": {"text": "We were recording on 4-track, but it sounded like an 80-piece orchestra. You just had to bounce, bounce, bounce.", "author": "George Martin"}
                },
                {
                    "title": "Q2: Early Sampling Tech",
                    "content": "Before digital samplers existed, how did early 1960s electro-mechanical keyboards (like the Mellotron) play back recorded instruments like flutes or strings?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "By triggering physical strips of magnetic tape for each key", "is_true": "yes"},
                        {"text": "By generating complex FM synthesis waves", "is_true": "no"},
                        {"text": "By playing miniature vinyl records inside the chassis", "is_true": "no"},
                        {"text": "By using low-bitrate digital memory chips", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "These primitive precursors to samplers used physical strips of magnetic tape. Pressing a key dragged a tape strip over a playback head. Because the strip was linear, the note could only sustain for about 8 seconds.",
                    "expert_quote": {"text": "The wonky tuning and tape flutter of those early tape-replay keyboards gave them a ghostly, magical character.", "author": "Vintage Synth Explorer"}
                },
                {
                    "title": "Q3: Studio Effects",
                    "content": "What technique, invented at Abbey Road in the 1960s, used a tape delay with an LFO to simulate a singer recording the same part twice?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Automatic Delay Time", "is_true": "no"},
                        {"text": "Analog Distortion Tracking", "is_true": "no"},
                        {"text": "Artificial Double Tracking (ADT)", "is_true": "yes"},
                        {"text": "Audio Definition Tape", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Artificial Double Tracking (ADT) used a tape delay with an LFO modulating the tape speed to create a chorusing effect, simulating a double-tracked vocal without the singer having to record it twice.",
                    "expert_quote": {"text": "John Lennon hated tracking vocals twice. Ken Townsend invented ADT so he wouldn't have to.", "author": "Geoff Emerick"}
                },
                {
                    "title": "Q4: Distortion Circuits",
                    "content": "Early 1960s guitar fuzz pedals achieved their characteristic clipping and distortion using what temperamental electronic component?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Vacuum Tubes", "is_true": "no"},
                        {"text": "Silicon Diodes", "is_true": "no"},
                        {"text": "Germanium Transistors", "is_true": "yes"},
                        {"text": "Digital DSP Chips", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Germanium transistors were highly sensitive to temperature changes, meaning a fuzz pedal might sound completely different depending on the ambient heat in the venue.",
                    "expert_quote": {"text": "With germanium, you never knew what you were going to get on any given night.", "author": "Classic Guitar Tone"}
                },
                {
                    "title": "Q5: Mechanical Reverb",
                    "content": "Before digital reverb, studios constructed large electro-mechanical devices to simulate reverberation. A famous method involved vibrating a large, suspended sheet of metal. What was this called?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Spring Reverb", "is_true": "no"},
                        {"text": "Plate Reverb", "is_true": "yes"},
                        {"text": "Chamber Reverb", "is_true": "no"},
                        {"text": "Convolution Reverb", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Plate reverbs vibrate a large sheet of metal using a transducer. They are famous for their bright, dense decay, which sits perfectly on vocals and snare drums.",
                    "expert_quote": {"text": "The plate reverb was the invisible member of every great 60s mixing team.", "author": "Sound on Sound"}
                },
                {
                    "title": "Q6: Modulation Effects",
                    "content": "Which electro-mechanical device featured a rotating physical horn and drum baffle to create a swirling Doppler effect?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Rotary Speaker Cabinet (e.g., Leslie)", "is_true": "yes"},
                        {"text": "Analog Bucket Brigade Delay", "is_true": "no"},
                        {"text": "Spring Reverb Tank", "is_true": "no"},
                        {"text": "Talkbox Tube", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The rotary speaker creates natural tremolo and chorus via the physical Doppler effect as the mechanical rotors spin. Designed originally for organs, bands began feeding guitars and even vocals through them.",
                    "expert_quote": {"text": "We put John Lennon's vocal through the rotary speaker on 'Tomorrow Never Knows' to make him sound like the Dalai Lama singing from a mountain top.", "author": "Geoff Emerick"}
                },
                {
                    "title": "Q7: Early Synthesis",
                    "content": "What was the primary limitation of early modular analog synthesizers in the 1960s concerning how they played notes?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "They were purely digital", "is_true": "no"},
                        {"text": "They were strictly monophonic (could only play one note at a time)", "is_true": "yes"},
                        {"text": "They could not generate sine waves", "is_true": "no"},
                        {"text": "They lacked a filter section", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Polysynths did not become widely available until the late 70s. In the 60s, playing complex chords on a modular synth required painfully multi-tracking one monophonic note at a time to tape.",
                    "expert_quote": {"text": "The early modular synth was an instrument of endless possibility, but infinite patience.", "author": "Wendy Carlos"}
                },
                {
                    "title": "Q8: Tape Editing",
                    "content": "How did engineers physically edit and splice audio recordings together during the analog tape era?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Using a razor blade and adhesive splicing tape", "is_true": "yes"},
                        {"text": "Typing crossfade commands into a computer interface", "is_true": "no"},
                        {"text": "Punching in via MIDI timecode", "is_true": "no"},
                        {"text": "Using two turntables and a scratch mixer", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Engineers would mark the raw analog tape with a chinagraph pencil at the playback head, make a diagonal physical cut with a razor blade on a metal editing block, and tape it together.",
                    "expert_quote": {"text": "We edited with a razor blade. If you made a mistake, that take was gone forever.", "author": "Abbey Road Engineer"}
                },
                {
                    "title": "Q9: Drum Recording",
                    "content": "In the early 1960s, what was the standard professional practice for recording a drum kit to avoid damaging delicate gear?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Close-miking every single drum shell", "is_true": "no"},
                        {"text": "Triggering drum replacements", "is_true": "no"},
                        {"text": "Using a few room microphones placed several feet away", "is_true": "yes"},
                        {"text": "Using contact microphones glued directly to the cymbals", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Studios enforced strict rules against placing microphones too close to loud sound sources to prevent damaging sensitive ribbon diaphragms. This resulted in the signature 'roomy' drum sound of early 60s records.",
                    "expert_quote": {"text": "When we moved the microphone closer than 18 inches to the bass drum, the managers wrote us up for dangerous practices.", "author": "Geoff Emerick"}
                },
                {
                    "title": "Q10: Console Tech",
                    "content": "What was a defining technological characteristic of professional mixing consoles in the 1950s and 1960s?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "They featured motorized fader automation", "is_true": "no"},
                        {"text": "They relied on vacuum tubes (valves) for amplification", "is_true": "yes"},
                        {"text": "They operated using digital signal processing", "is_true": "no"},
                        {"text": "They featured onboard parametric graphical EQs", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Early recording consoles utilized valves (vacuum tubes) for their mic preamps and summing amps. This imparted a natural harmonic distortion, or 'warmth', when pushed hard.",
                    "expert_quote": {"text": "Those valve desks didn't digitally clip; they just gave you this glorious, musical crunch.", "author": "Classic Studio Engineering"}
                }
            ]
        },
        {
            "id": f"quiz-history-2",
            "title": "Historical Context: 1970s Synth Pioneers & Disco",
            "type": "lp_quiz",
            "isPremium": False,
            "description": "Mastery quiz covering the rise of accessible synthesis, analog delay, and the technological boom of disco production.",
            "questions": [
                {
                    "title": "Q1: Subtractive Synths",
                    "content": "What was the most significant innovation of the first commercially successful portable analog synthesizers in the early 1970s?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "They were the first fully polyphonic instruments", "is_true": "no"},
                        {"text": "They were self-contained, pre-patched, and portable", "is_true": "yes"},
                        {"text": "They used digital wavetable synthesis", "is_true": "no"},
                        {"text": "They featured built-in drum sequencers", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Early portable synthesizers (like the Minimoog) brought synthesis out of the laboratory. They didn't require messy patch cables because their oscillators and filters were internally connected ('normalized').",
                    "expert_quote": {"text": "It was the first synthesizer a musician could take on a club gig and actually just play without an engineering degree.", "author": "Keyboard Magazine"}
                },
                {
                    "title": "Q2: Analog Polyphony",
                    "content": "In the late 1970s, legendary synthesizers (like the Prophet-5) were released. What made them revolutionary for keyboard players?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "They were fully software-based", "is_true": "no"},
                        {"text": "They offered reliable polyphony AND allowed users to save parameter presets", "is_true": "yes"},
                        {"text": "They invented the mod wheel", "is_true": "no"},
                        {"text": "They were powered by vacuum tubes", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Before these advancements, if you found a great sound on an analog synth, you had to write down the physical knob positions on paper. Being able to store presets to memory, combined with polyphony, changed live performance forever.",
                    "expert_quote": {"text": "It changed the touring keyboardist's life. No more scrambling to manually tune oscillators between songs.", "author": "Dave Smith"}
                },
                {
                    "title": "Q3: Analog Delay",
                    "content": "Which 1970s effect technology utilized a continuous, physical loop of magnetic recording medium passing over playback heads to create rhythmic echoes?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Tape Delay / Space Echo", "is_true": "yes"},
                        {"text": "Digital Reverb", "is_true": "no"},
                        {"text": "Pitch Harmonizer", "is_true": "no"},
                        {"text": "Bucket Brigade Delay (BBD)", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Tape delays were ubiquitous in genres like dub and reggae. The natural degradation of the moving tape loop created warm, evolving, and slightly pitch-modulated delays due to 'wow and flutter'.",
                    "expert_quote": {"text": "The tape echo isn't just a delay; the grit and wow of the physical tape is an instrument in itself.", "author": "Dub Pioneer Lee 'Scratch' Perry"}
                },
                {
                    "title": "Q4: Vocal Processing",
                    "content": "Which analog device, embraced by ground-breaking electronic groups in the 1970s, used the spectral characteristics of the human voice to modulate a carrier signal (like a synth wave)?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Talkbox", "is_true": "no"},
                        {"text": "Vocoder", "is_true": "yes"},
                        {"text": "Pitch Correction", "is_true": "no"},
                        {"text": "Ring Modulator", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Vocoders analyze the frequency bands of speech (modulator) and impose them onto a synthesized waveform (carrier), creating the robotic, synthesized vocals heavily featured in early electronic music and later disco.",
                    "expert_quote": {"text": "The vocoder gave electronic music a voice that was both deeply human and entirely machine.", "author": "Synth History"}
                },
                {
                    "title": "Q5: Console Automation",
                    "content": "As studio track counts expanded to 24 tracks in the 1970s, making large mixes difficult for a single person, what technology was introduced?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "VCA Automation (fader recording)", "is_true": "yes"},
                        {"text": "DSP Lookahead Limiters", "is_true": "no"},
                        {"text": "Touch-screen routing matrixes", "is_true": "no"},
                        {"text": "MIDI Control Surfaces", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Voltage Controlled Amplifier (VCA) automation recorded fader movements, allowing complex mixes to be built up in passes over time rather than requiring four engineers with eight hands on the desk simultaneously.",
                    "expert_quote": {"text": "Before automation, mixing was a chaotic live performance. If you missed a fader ride at the end, you had to start the whole song over.", "author": "Bob Clearmountain"}
                },
                {
                    "title": "Q6: Early Drum Machines",
                    "content": "What was a major limitation of early 1970s analog drum machines (rhythm boxes) compared to modern sequencers?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "They used uncompressed digital WAV files", "is_true": "no"},
                        {"text": "They only played rigid, pre-programmed lounge rhythm patterns (Waltz, Bossa Nova)", "is_true": "yes"},
                        {"text": "They required entirely MIDI control to run", "is_true": "no"},
                        {"text": "They output sound exclusively in stereo", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Before the invention of user-programmable step sequencing, drum machines were meant to sit atop home organs playing waltz backing tracks. Creative artists manipulated these preset rhythms using external effects.",
                    "expert_quote": {"text": "The rhythm box was rigid, but if you ran the Bossa Nova preset through a delay and flanger, it became magic.", "author": "70s Synth Production"}
                },
                {
                    "title": "Q7: Club Mastering",
                    "content": "What physical vinyl format was pioneered in the 1970s specifically to cater to club DJs by allowing wider grooves, deeper bass, and louder mastering?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "The 7-inch 45rpm single", "is_true": "no"},
                        {"text": "The cassette tape", "is_true": "no"},
                        {"text": "The 12-inch single", "is_true": "yes"},
                        {"text": "The Flexi disc", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The 12-inch single allowed the physical record grooves to be spaced further apart. This meant mastering engineers could cut much louder levels and deeper sub-bass without the needle jumping out of the groove.",
                    "expert_quote": {"text": "The 12-inch single was the weapon of the disco DJ. It had the dynamic range and low-end that a 7-inch simply couldn't physically handle.", "author": "Tom Moulton"}
                },
                {
                    "title": "Q8: Dynamic Filtering",
                    "content": "What effect pedal, prominent in 70s funk and disco basslines, responds dynamically to how hard the instrument is played by shifting a filter's cutoff frequency?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Chorus Pedal", "is_true": "no"},
                        {"text": "Phaser Pedal", "is_true": "no"},
                        {"text": "Envelope Filter / Auto-Wah", "is_true": "yes"},
                        {"text": "Fuzz Face", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Envelope filters use an 'envelope follower' circuit to track the input volume and translate it into a control voltage (CV) that opens and closes a filter. Pluck hard = bright 'quack', play soft = muffled tone.",
                    "expert_quote": {"text": "The envelope filter made the bass guitar speak. It was organic and purely reactional to the player's touch.", "author": "Bootsy Collins"}
                },
                {
                    "title": "Q9: EQ Innovation",
                    "content": "In 1972, what type of EQ was invented that finally allowed engineers to continuously and precisely control Frequency, Gain, and 'Q' (Bandwidth) simultaneously?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Graphic EQ", "is_true": "no"},
                        {"text": "Shelving EQ", "is_true": "no"},
                        {"text": "Parametric EQ", "is_true": "yes"},
                        {"text": "Dynamic EQ", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Invented by George Massenburg, the Parametric EQ revolutionized mixing. Unlike fixed-band graphic EQs, it allowed surgical precision to sweep for resonant frequencies and choose exactly how wide the cut or boost should be.",
                    "expert_quote": {"text": "The parametric EQ was a surgeon's scalpel in a world that previously only had hammers.", "author": "George Massenburg"}
                },
                {
                    "title": "Q10: Console Evolution",
                    "content": "The introduction of modern large-format consoles in the late 70s defined the punchy sound of modern pop/rock mixing. What new feature was built directly into EVERY channel strip?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "A dynamics block (Compressor & Gate)", "is_true": "yes"},
                        {"text": "A digital plate reverb", "is_true": "no"},
                        {"text": "An analog tape delay", "is_true": "no"},
                        {"text": "A vocal pitch corrector", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Before these high-end desks, compressors were expensive outboard gear placed in external racks. Having a dedicated compressor and a noise gate on every single channel allowed for the explosive, tightly controlled drum sounds that defined 80s pop and rock.",
                    "expert_quote": {"text": "Having a gate and compressor on every drum mic cleaned up the noise floor and added punch instantly.", "author": "Mix Engineering History"}
                }
            ]
        },
        {
            "id": f"quiz-history-3",
            "title": "Historical Context: 1980s Hip Hop, Electro & Synth-Pop",
            "type": "lp_quiz",
            "isPremium": False,
            "description": "Mastery quiz covering the boom of analog rhythm machines, digital synthesis, sampling, and the birth of MIDI.",
            "questions": [
                {
                    "title": "Q1: Analog Sub-Bass",
                    "content": "Why does the kick drum of legendary early 80s analog drum machines sustain for so long, making it perfect for driving Hip Hop and Electro sub-bass?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "It is a high-resolution digital sample of an orchestral bass drum", "is_true": "no"},
                        {"text": "It uses a self-oscillating resonant filter to generate an extended sine-like wave", "is_true": "yes"},
                        {"text": "It runs the signal through a massive spring reverb tank", "is_true": "no"},
                        {"text": "It uses physical modeling DSP algorithms", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The famed 808 kick is pure electricity. It passes a trigger pulse into a bridged-T filter tuned to vibrate just on the edge of oscillation. Adjusting the decay knob dictates how long that electrical ringing lasts.",
                    "expert_quote": {"text": "That analog kick isn't just a drum; it functions as the actual bassline of hip hop.", "author": "Rick Rubin"}
                },
                {
                    "title": "Q2: Connectivity",
                    "content": "What seminal event occurred in 1983 regarding music technology and hardware connectivity?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "The release of the first digital audio workstation (DAW)", "is_true": "no"},
                        {"text": "The invention of the compact disc", "is_true": "no"},
                        {"text": "The introduction of MIDI (Musical Instrument Digital Interface)", "is_true": "yes"},
                        {"text": "The patenting of real-time pitch correction", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Before MIDI 1.0, synthesizers from different companies couldn't talk to each other because they used proprietary analog control voltage standards. MIDI established a universal digital language for note data, velocity, and clock sync.",
                    "expert_quote": {"text": "MIDI was a miracle of corporate cooperation. Competitors sat down and agreed on a universal handshake.", "author": "Dave Smith (MIDI Co-Creator)"}
                },
                {
                    "title": "Q3: Digital Synths",
                    "content": "Which incredibly popular 1980s synthesizer technology was notoriously difficult to program due to its menu-diving interface, replacing analog oscillators with complex mathematical modulation?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Frequency Modulation (FM) Synthesis", "is_true": "yes"},
                        {"text": "Subtractive Analog Synthesis", "is_true": "no"},
                        {"text": "Granular Synthesis", "is_true": "no"},
                        {"text": "Wavetable Synthesis", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Early commercial FM synths (like the Yamaha DX7) lacked physical knobs, relying on a tiny LCD screen for complex algorithms. Consequently, 90% of users just used the crystalline factory presets (like the famous 'E. PIANO 1').",
                    "expert_quote": {"text": "FM synthesis ushered in the age of digital precision, but temporarily killed the knob-twiddling joy of analog.", "author": "Vintage Synth Explorer"}
                },
                {
                    "title": "Q4: Sampling Limitations",
                    "content": "What was the defining characteristic of early digital samplers beloved by 90s boom-bap hip-hop producers (like Pete Rock or RZA)?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "They featured 24-bit pristine uncompressed audio", "is_true": "no"},
                        {"text": "They had practically infinite sampling time", "is_true": "no"},
                        {"text": "A gritty 12-bit sample rate and highly restricted memory (seconds of sample time)", "is_true": "yes"},
                        {"text": "They generated sounds using purely analog oscillators", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "To save precious memory, producers sampled vinyl records at 45rpm, then pitched them down inside the sampler. This introduced heavy aliasing artifacts and a dark, crunchy 12-bit tone synonymous with golden-era East Coast hip-hop.",
                    "expert_quote": {"text": "The machine's memory limitations forced you to be creative. That 12-bit crunch is the dirt that hip-hop grows in.", "author": "Pete Rock"}
                },
                {
                    "title": "Q5: Gated Reverb",
                    "content": "The famous 1980s snare drum sound (e.g., Phil Collins' 'In the Air Tonight') was created using heavily compressed room mics fed into...",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "A lush plate reverb", "is_true": "no"},
                        {"text": "A noise gate, abruptly cutting off the reverb tail", "is_true": "yes"},
                        {"text": "A bucket brigade chorus pedal", "is_true": "no"},
                        {"text": "A slow attack amplitude envelope", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Gated Reverb adds a massive explosion of simulated room size, but cuts it off unnaturally fast with a noise gate before it can decay. This keeps the mix punchy and uncluttered despite the huge snare sound.",
                    "expert_quote": {"text": "It was an accident. The console talkback mic compressor clamped down and chopped off the drum room noise, and suddenly the 80s drum sound was born.", "author": "Hugh Padgham"}
                },
                {
                    "title": "Q6: Hybrid Drum Machines",
                    "content": "Unlike the purely analog rhythm machines of the early 80s, what technology did late-80s drum machines introduce for complex sounds like cymbals and hi-hats?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Physical modeling synthesis", "is_true": "no"},
                        {"text": "Low-bitrate digital audio samples", "is_true": "yes"},
                        {"text": "FM Synthesis algorithms", "is_true": "no"},
                        {"text": "White noise filtered through tape loops", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Machines like the TR-909 were hybrid: the kick, snare, and toms were analog circuits, but the cymbals and hi-hats were gritty 6-bit digital samples. This gave it an aggressive, metallic punch that defined House and Techno.",
                    "expert_quote": {"text": "The hybrid approach provided the deep analog sub for the kick, and the harsh digital 'tssk' for the hats.", "author": "Techno Production History"}
                },
                {
                    "title": "Q7: Early Workstations",
                    "content": "Early ultra-expensive digital sampling workstations (like the Fairlight CMI) allowed users to interact with waveforms using what futuristic 1980s interface?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "A wireless Bluetooth mouse", "is_true": "no"},
                        {"text": "A light pen drawn directly onto a CRT monitor", "is_true": "yes"},
                        {"text": "A multi-touch capacitive screen", "is_true": "no"},
                        {"text": "Voice commands", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The light pen was wildly futuristic for 1979. Users could draw waveforms physically on the screen. The machine was famously used for the orchestra stabs ('ORCH5') in early hip hop and pop.",
                    "expert_quote": {"text": "It was a spaceship. It brought orchestral hits and breathing vocal samples to pop music overnight.", "author": "Kate Bush Collaborators"}
                },
                {
                    "title": "Q8: Acid Bass",
                    "content": "Early 1980s bass synthesizers were designed to replace real bass players. They failed at this, but inadvertently created what electronic genre when their filters were heavily manipulated?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Synth-pop", "is_true": "no"},
                        {"text": "Acid House", "is_true": "yes"},
                        {"text": "Trip Hop", "is_true": "no"},
                        {"text": "Disco", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Units like the TB-303 sounded nothing like a real bass guitar. However, when DJs in Chicago pushed its resonant analog filter to the extreme while running its sequencer, the resulting 'squelching' liquid sound became the foundation of Acid House.",
                    "expert_quote": {"text": "We abused the machine. We turned the knobs until it screamed. That's how Acid was born.", "author": "DJ Pierre"}
                },
                {
                    "title": "Q9: Turntablism",
                    "content": "What mechanical feature of professional DJ turntables made them the industry standard for Hip Hop scratching and beatmatching?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "A belt drive to smooth out tempo changes", "is_true": "no"},
                        {"text": "A digital laser-guided stylus", "is_true": "no"},
                        {"text": "A massive high-torque Direct Drive motor", "is_true": "yes"},
                        {"text": "Built-in analog delays and reverbs", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Belt-driven turntables took too long to get up to speed after a DJ dragged or held the record. A direct drive magnetic motor hit full speed almost instantly, allowing precise scratching and cueing.",
                    "expert_quote": {"text": "The direct drive turntable wasn't just a record player; it became the first acoustic instrument of hip hop.", "author": "Grandmaster Flash"}
                },
                {
                    "title": "Q10: Sequencing Groove",
                    "content": "1980s sampling drum machines revolutionized beat-making with velocity-sensitive pads. What sequence timing feature gave their beats a human, 'grooving' feel?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Absolute mechanical quantization", "is_true": "no"},
                        {"text": "A customizable 'Swing' or 'Shuffle' function that shifted off-beats", "is_true": "yes"},
                        {"text": "Randomized algorithmic latency", "is_true": "no"},
                        {"text": "Analog tape flutter modulation", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The sequencer's swing (or shuffle) percentages mathematically pulled the 16th notes slightly off a rigid, robotic grid. This imperfection gave electronic beats a profound 'pocket' or groove, heavily utilized by producers like J Dilla.",
                    "expert_quote": {"text": "The magic of these samplers isn't just the sound; it's the timing. They swing like a real drummer.", "author": "Roger Linn"}
                }
            ]
        },
        {
            "id": f"quiz-history-4",
            "title": "Historical Context: 1990s UK Rave, Jungle & Boom Bap",
            "type": "lp_quiz",
            "isPremium": False,
            "description": "Mastery quiz covering time-stretching, tracker software, project studios, and early digital processing.",
            "questions": [
                {
                    "title": "Q1: Time-Stretching",
                    "content": "In early 90s Jungle and Rave, how did producers overcome the issue of pitch increasing like a 'chipmunk' when drastically speeding up a drum loop?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "By using analog pitch-shifting pedals", "is_true": "no"},
                        {"text": "By using offline digital time-stretching algorithms in rackmount samplers", "is_true": "yes"},
                        {"text": "By re-recording the drum loops live at a faster tempo", "is_true": "no"},
                        {"text": "By routing the breaks through a vocoder", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Early 90s samplers introduced offline time-stretching. It took several minutes to mathematically process even a short breakbeat, and introduced metallic, grainy artifacts. Producers embraced this 'glitchy' sound as a core aesthetic of Jungle music.",
                    "expert_quote": {"text": "We abused the time-stretching algorithms. We stretched vocals so far they broke apart into metallic percussion.", "author": "Goldie"}
                },
                {
                    "title": "Q2: Breakbeat Culture",
                    "content": "The 'Amen Break', the foundation of Jungle and Drum & Bass music, was originally a 6-second drum solo sampled from what 1969 track?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "James Brown - Funky Drummer", "is_true": "no"},
                        {"text": "The Winstons - Amen, Brother", "is_true": "yes"},
                        {"text": "Led Zeppelin - When the Levee Breaks", "is_true": "no"},
                        {"text": "Chic - Good Times", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The Winstons' drummer G.C. Coleman played the famous syncopated groove. In the 90s, producers loaded it into samplers, sliced it into individual kick, snare, and hi-hat hits, and rearranged it at breakneck 160+ BPM speeds.",
                    "expert_quote": {"text": "The Amen break is the foundation of an entire subculture. It is the sonic graffiti of the 90s.", "author": "Nate Harrison"}
                },
                {
                    "title": "Q3: Tracker Software",
                    "content": "How did early 'Tracker' sequencing software (popular on 90s home computers) program music?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "By drawing visual notes on a left-to-right piano roll", "is_true": "no"},
                        {"text": "By recording live MIDI keyboard performances as audio", "is_true": "no"},
                        {"text": "By inputting hexadecimal numbers on a vertically scrolling grid", "is_true": "yes"},
                        {"text": "By scanning printed sheet music via a webcam", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Trackers lacked graphical piano rolls. They used columns of numbers scrolling from top to bottom. This encouraged rapid, intricate, break-neck drum programming (like Aphex Twin or early DnB) because editing meant efficiently typing numbers, not dragging visual blocks.",
                    "expert_quote": {"text": "Tracker software turned music making into mathematics. You compiled a song like a programmer writes code.", "author": "Computer Music History"}
                },
                {
                    "title": "Q4: PWM Synths",
                    "content": "Which synthesis technique, utilizing rapidly changing pulse widths and heavy chorusing, was responsible for the aggressive, detuned 'Hoover' sound that dominated 90s rave music?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Frequency Modulation (FM)", "is_true": "no"},
                        {"text": "Pulse Width Modulation (PWM)", "is_true": "yes"},
                        {"text": "Granular Synthesis", "is_true": "no"},
                        {"text": "Additive Synthesis", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Synthesizers like the Roland Alpha Juno used a PWM trick combined with heavy built-in chorusing to create a massive, sucking, vacuum-cleaner-like lead sound. Tracks by Human Resource and The Prodigy heavily popularized it.",
                    "expert_quote": {"text": "The Hoover patch sounded like a synthesized swarm of angry bees. It commanded the rave.", "author": "Joey Beltram"}
                },
                {
                    "title": "Q5: Mixdown Formats",
                    "content": "What was the dominant high-quality digital format for studio engineers handing off final stereo mixes to mastering in the 1990s?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "DAT (Digital Audio Tape)", "is_true": "yes"},
                        {"text": "MP3 Flash drives", "is_true": "no"},
                        {"text": "Quarter-inch analog reel-to-reel tape", "is_true": "no"},
                        {"text": "Vinyl acetates", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "DAT provided pristine 16-bit 48kHz digital audio on a tiny, rotating-head cassette format. It eliminated analog tape hiss for final mixdowns but was highly susceptible to fatal digital 'dropouts' if the tape was dusty.",
                    "expert_quote": {"text": "DAT tape was a blessing and a curse. No hiss, but if the tape chewed even a millimeter, a digital dropout ruined the master.", "author": "Mastering Engineer"}
                },
                {
                    "title": "Q6: French House Compression",
                    "content": "French House music in the late 90s popularized an extreme, rhythmic 'pumping' effect on their entire instrumental mix. What mixing technique was used for this?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Parallel drum compression", "is_true": "no"},
                        {"text": "Heavy Sidechain Compression keyed to the Kick Drum", "is_true": "yes"},
                        {"text": "Mid-Side (M/S) limiting", "is_true": "no"},
                        {"text": "Multiband Expansion", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "By routing the Kick drum to the 'sidechain' trigger input of a budget hardware compressor parked on the synths and samples, the music ducks heavily every time the kick hits, defining the pumping French Touch sound.",
                    "expert_quote": {"text": "We ran everything but the kick drum through a cheap compressor. The kick hits, the music ducks out of the way, and it breathes back in.", "author": "Thomas Bangalter"}
                },
                {
                    "title": "Q7: Early Pitch Correction",
                    "content": "In 1998, pop music prominently featured an extreme robotic vocal effect for the first time. Which type of software plugin was pushed to its limits to achieve this?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Granular Time-stretchers", "is_true": "no"},
                        {"text": "Real-time Pitch Correction software", "is_true": "yes"},
                        {"text": "Analog Vocoders", "is_true": "no"},
                        {"text": "Ring Modulators", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Software like Auto-Tune was originally designed to transparently fix slightly out-of-tune notes. By setting the 'Retune Speed' parameter to zero (instantaneous), engineers forced it to jump unnaturally from pitch to pitch (the 'Cher effect').",
                    "expert_quote": {"text": "We abused a tool meant for subtle correction to create a brand new instrument. The fast retune speed was a happy accident.", "author": "Mark Taylor"}
                },
                {
                    "title": "Q8: The Project Studio",
                    "content": "1990s hardware mixing consoles brought commercial routing options (like 8 busses for subgrouping) to a low price point. What impact did this have on the music industry?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "It forced all musicians to record in giant commercial studios", "is_true": "no"},
                        {"text": "It fueled the 'bedroom' and project studio revolution, allowing indie and electronic producers to mix professional records at home", "is_true": "yes"},
                        {"text": "It made digital synthesis obsolete", "is_true": "no"},
                        {"text": "It reduced the dynamic range of all music globally", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Affordable but high-quality mixing desks (like the Mackie 8-Bus) meant electronic producers like The Prodigy could bypass expensive commercial studios, laying the foundation for the modern home studio producer.",
                    "expert_quote": {"text": "Affordable 8-bus consoles democratized the mixdown. You didn't need to rent an SSL to get a great sounding dance record anymore.", "author": "Sound on Sound"}
                },
                {
                    "title": "Q9: Digital Romplers",
                    "content": "Defining the sound of 90s House music (specifically its famous bright organ/piano bass lines), what type of synthesizer used 'Read-Only Memory' to simply play back short PCM recordings of real instruments?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "A modular analog synthesizer", "is_true": "no"},
                        {"text": "A 'Rompler' (Sample Playback workstation)", "is_true": "yes"},
                        {"text": "An additive digital synthesizer", "is_true": "no"},
                        {"text": "A granular granular engine", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Rather than calculating continuous waveforms via complex electronics, Romplers ('Read-Only Memory' players like the Korg M1) triggered tiny digital samples of real instruments. The resulting sounds were heavily compressed and cut sharply through dense club mixes.",
                    "expert_quote": {"text": "The classic 90s house piano is notoriously inauthentic. It's too bright and short. But that's exactly why it works perfectly on a dancefloor.", "author": "Dance Music History"}
                },
                {
                    "title": "Q10: Offline Storage",
                    "content": "In the 90s, hardware sampler memory (RAM) was tiny. How were massive sample libraries predominately saved and stored off-line?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Cloud storage networks", "is_true": "no"},
                        {"text": "Floppy Disks and SCSI Zip Drives", "is_true": "yes"},
                        {"text": "USB Thumb Drives", "is_true": "no"},
                        {"text": "Vinyl acetates", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "A standard floppy disk held 1.44MB (only a few seconds of low-res audio). To back up larger projects, producers relied heavily on SCSI-connected external magnetic Zip drives (100MB capacity).",
                    "expert_quote": {"text": "The mechanical 'click of death' from a broken Zip drive was the most terrifying sound a 90s producer could hear.", "author": "Studio Folklore"}
                }
            ]
        },
        {
            "id": f"quiz-history-5",
            "title": "Historical Context: 2000s Early In-The-Box EDM & Dubstep",
            "type": "lp_quiz",
            "isPremium": False,
            "description": "Mastery quiz covering the shift to fully software DAWs, soft-synths, the loudness war, and digital DJing.",
            "questions": [
                {
                    "title": "Q1: In-The-Box",
                    "content": "What does the audio engineering phrase mixing 'In-The-Box' (ITB), which became dominant in the 2000s, refer to?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Mixing entirely on an analog physical console", "is_true": "no"},
                        {"text": "Mixing entirely within the computer's DAW software using plugins", "is_true": "yes"},
                        {"text": "Mixing through external outboard hardware gear exclusively", "is_true": "no"},
                        {"text": "Using a literal wooden box to re-amp guitar cabinets", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "As computer CPUs became powerful enough to handle dozens of audio tracks and plugins without crashing, producers realized they no longer needed expensive analog consoles. Audio stayed fully digital from recording to final export.",
                    "expert_quote": {"text": "When computers finally matched outboard gear, 'in-the-box' revolutionized accessibility, giving bedroom producers the routing power of Abbey Road.", "author": "Sound on Sound"}
                },
                {
                    "title": "Q2: Plugin Standards",
                    "content": "Introduced by Steinberg, what ubiquitous software format allowed third-party developers to create digital synthesizers and effects that could run directly inside a DAW?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Virtual Studio Technology (VST)", "is_true": "yes"},
                        {"text": "Variable Sync Track (VST)", "is_true": "no"},
                        {"text": "Vocal Synthesizer Tuning (VST)", "is_true": "no"},
                        {"text": "Visual Sound Transmitter (VST)", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The VST format fundamentally shifted the industry away from hardware. Anyone could code a compressor or synthesizer plugin, and producers could load dozens of instances of them within a single software project.",
                    "expert_quote": {"text": "VST democratized effects and instruments. You didn't buy bulky rack units anymore; you simply bought a license file.", "author": "Music Tech History"}
                },
                {
                    "title": "Q3: Loudness War",
                    "content": "Which controversial mastering trend dominated the 2000s, fueled by the heavy use of software brickwall limiters?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "The 'Dynamic Range Renaissance'", "is_true": "no"},
                        {"text": "The 'Loudness War'", "is_true": "yes"},
                        {"text": "The 'Mono Revival'", "is_true": "no"},
                        {"text": "The 'Analog Pitch Drift'", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The 'Loudness War' was an arms race where mastering engineers continually squashed dynamic range to make their albums sound comparatively louder on CD changers and radio, often at the cost of transient punch and clarity.",
                    "expert_quote": {"text": "We traded dynamic impact and punch for sheer volume. Everything sounded loud, but nothing sounded big anymore.", "author": "Bob Ludwig"}
                },
                {
                    "title": "Q4: Software Wavetables",
                    "content": "Which software synthesis technique, allowing easy modulation of complex digital waveforms, defined the aggressive 'wobble bass' sound of 2000s Dubstep?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Analog Subtractive Synthesis", "is_true": "no"},
                        {"text": "Wavetable Synthesis", "is_true": "yes"},
                        {"text": "Physical Modeling", "is_true": "no"},
                        {"text": "Acoustic Sampling", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Soft-synths (like NI Massive) featured visual modulation systems. Producers could easily drag an LFO directly to modulate the position of a digital wavetable or filter cutoff, creating the aggressive 'wobble' synths synonymous with Brostep.",
                    "expert_quote": {"text": "Digital wavetables were the cornerstone of aggressive bass music. They tore club soundsystems in half.", "author": "Electronic Music Production History"}
                },
                {
                    "title": "Q5: Pumping Synths",
                    "content": "How did 2000s EDM producers achieve the heavy, rhythmic 'breathing' or 'pumping' effect on sustained synthesizer chords?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Manually drawing volume automation on every quarter note", "is_true": "no"},
                        {"text": "Heavy Sidechain Compression keyed to the Kick Drum", "is_true": "yes"},
                        {"text": "Sending the synths through a rotary speaker cabinet", "is_true": "no"},
                        {"text": "Using a noise gate with a very slow attack time", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "By routing the Kick drum to the sidechain input of a compressor parked on the synths, the synths' volume ducks heavily every time the kick hits. This creates massive space for the low-end and drives a trance-like off-beat rhythm.",
                    "expert_quote": {"text": "Sidechaining the kick to everything isn't just mixing; it's the rhythm mechanism of modern dance music.", "author": "Electronic Musician"}
                },
                {
                    "title": "Q6: Non-Linear DAWs",
                    "content": "What unique 'Non-Linear' workflow feature did software like Ableton Live introduce, revolutionizing live electronic performances?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Traditional left-to-right timeline tracking", "is_true": "no"},
                        {"text": "Automatic sheet music to MIDI conversion", "is_true": "no"},
                        {"text": "A Session View for triggering independent, synced audio loops and clips", "is_true": "yes"},
                        {"text": "Analog tape emulation algorithms", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Rather than committing to a fixed left-to-right timeline arrangement, it allowed DJs and producers to trigger discrete audio loops globally synced to a master tempo, turning the DAW itself into a playable live instrument.",
                    "expert_quote": {"text": "This decoupled music from the timeline. You could jam with clips instead of staring at a playback head.", "author": "Computer Music"}
                },
                {
                    "title": "Q7: Audio Compression Algorithms",
                    "content": "What perceptual audio coding format drastically reduced file sizes—facilitating the early 2000s file-sharing/piracy boom—by removing frequencies deemed mathematically inaudible?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Uncompressed WAV", "is_true": "no"},
                        {"text": "Lossless FLAC", "is_true": "no"},
                        {"text": "Lossy MP3", "is_true": "yes"},
                        {"text": "High-Res AIFF", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The MP3 algorithm uses 'psychoacoustics' to discard audio data overshadowed by louder sounds (Frequency Masking). A 40MB CD track could be shrunk to a 4MB MP3, triggering the Napster piracy era.",
                    "expert_quote": {"text": "The MP3 algorithm figured out what the human ear actually paid attention to, and simply discarded the rest.", "author": "Audio Engineering Society"}
                },
                {
                    "title": "Q8: Hard-Tuned Vocals",
                    "content": "How did vocalists in the mid-2000s force pitch-correction software to 'glitch' rather than smoothly and transparently correct pitch?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Setting a long Retune Speed to gently guide the pitch", "is_true": "no"},
                        {"text": "Setting the Retune Speed to zero milliseconds", "is_true": "yes"},
                        {"text": "Singing perfectly in tune to bypass the plugin algorithms entirely", "is_true": "no"},
                        {"text": "Adding heavy distortion before the plugin", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Hip-hop and R&B artists adopted the 'Zero Retune Speed' technique. The software aggressively snaps the vocal rigidly to the nearest scale note without any human legato transition, creating a synth-like vocal texture.",
                    "expert_quote": {"text": "The zero retune speed turned the human vocal cord into a keyboard synthesizer.", "author": "Music Tech Review"}
                },
                {
                    "title": "Q9: Digital DJing",
                    "content": "In the 2000s, Digital Vinyl Systems (DVS) allowed DJs to manipulate digital files (MP3s) using analog turntables. How did this technology work?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "By playing a physical vinyl record pressed with a high-pitched control tone", "is_true": "yes"},
                        {"text": "By using lasers to scan the MP3s directly from a CD", "is_true": "no"},
                        {"text": "By replacing the turntable motor with a computer hard drive", "is_true": "no"},
                        {"text": "By running MIDI cables directly from the turntable needle", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "The DJ plays a special 'Timecode Vinyl'. The turntable stylus picks up a constant, whining high-frequency tone. A computer interface analyzes the speed and direction of that analog tone and applies it in real-time to the digital MP3.",
                    "expert_quote": {"text": "Digital Vinyl gave DJs the tactile, hands-on control of analog wax, integrated with the infinite library of an MP3 hard drive.", "author": "DJ Mag"}
                },
                {
                    "title": "Q10: Early Plugin Constraints",
                    "content": "What was the biggest disadvantage of running early 2000s soft-synths and VST plugins compared to using their 1980s hardware counterparts?",
                    "type": "multi_choice",
                    "answers": [
                        {"text": "Computer CPU overloads caused audio glitches and high latency (delay)", "is_true": "yes"},
                        {"text": "Software plugins were much more expensive to purchase than hardware", "is_true": "no"},
                        {"text": "Plugins could only generate monophonic square waves", "is_true": "no"},
                        {"text": "Software broke down due to heat and required physical tuning", "is_true": "no"}
                    ],
                    "explanation": "",
                    "expert_explanation": "Before multi-core processors, running multiple synthesis engines and reverbs would quickly exhaust the CPU, causing buffer underruns, popping, and noticeable delay (latency) between pressing a MIDI key and hearing the sound.",
                    "expert_quote": {"text": "In the early box era, the tradeoff for convenience was constant, terrifying computer crashes mid-session.", "author": "Producer History"}
                }
            ]
        }
    ]

def append_to_course_data():
    with open(COURSE_DATA_PATH, 'r') as f:
        data = json.load(f)

    # Check if section already exists
    section_title = "Historical Music Tech Context"
    existing_section = None
    for section in data.get('sections', []):
        if section.get('title') == section_title:
            existing_section = section
            break
            
    if existing_section:
        # Update existing section
        print(f"Section '{section_title}' already exists. Overwriting items.")
        existing_section['items'] = create_quiz_data()
    else:
        # Create new section
        print(f"Creating new section '{section_title}'.")
        data.setdefault('sections', []).append({
            "title": section_title,
            "items": create_quiz_data()
        })
        
    # Write updated data back to file
    with open(COURSE_DATA_PATH, 'w') as f:
        json.dump(data, f, indent=4)
        
    print(f"Successfully appended historical quizzes to {COURSE_DATA_PATH}")

if __name__ == "__main__":
    append_to_course_data()
