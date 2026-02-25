import json

filepath = 'src/data/course_data.json'
with open(filepath, 'r') as f:
    data = json.load(f)

exp_data = {
    # Q1: Recording
    "rec_50": {
         "text": "Every track had to be played perfectly at the exact same time.",
         "html": "<p><strong>Expert Explanation:</strong> Early 1950s recording was strictly direct-to-disc or mono tape. The entire band stood around a single microphone and performed live. If someone made a mistake, everyone started over. The 'mix' changed by moving musicians closer or further from the mic.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The studio floor was our mixing desk.\"<br/><strong>- 50s Audio Engineer</strong></blockquote>"
    },
    "rec_60": {
         "text": "Four tracks meant The Beatles could finally invent modern pop production.",
         "html": "<p><strong>Expert Explanation:</strong> The introduction of 4-track tape machines (like the Ampex or Studer J37 used at Abbey Road) in the 1960s changed everything. Engineers could record rhythm, vocals, and solos at different times, and 'bounce' multiple tracks down to one to open up more space. This allowed for the complex arrangements of Sgt. Pepper's.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We treated the tape machine like a synthesizer; it was an active participant.\"<br/><strong>- 60s Producer</strong></blockquote>"
    },
    "rec_70": {
         "text": "16-track gave rock bands the canvas to create pristine, layered epics.",
         "html": "<p><strong>Expert Explanation:</strong> The 1970s ushered in 16-track (and later 24-track) 2-inch tape. This allowed individual micing of every drum and separate tracks for multiple guitar overdubs and backing vocals. The result was the incredibly clean, polished, and dense sound of albums like Fleetwood Mac's Rumours or Pink Floyd's Dark Side of the Moon.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"Suddenly, we had absolute control over every single element of the mix.\"<br/><strong>- 70s Studio Owner</strong></blockquote>"
    },
    "rec_80": {
         "text": "24-track was the gold standard, delivering warmth and massive track counts.",
         "html": "<p><strong>Expert Explanation:</strong> By the 1980s, 24-track 2-inch tape recording running on massive Solid State Logic (SSL) consoles became the industry standard. It provided a huge amount of headroom and natural, warm analog compression. Engineers often synchronized two 24-track machines together via SMPTE timecode to get 48 tracks for massive pop productions like Michael Jackson's Thriller.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"Tape saturation on 24-track is a sound we still try to emulate digitally today.\"<br/><strong>- 80s Audio Guru</strong></blockquote>"
    },
    "rec_90": {
         "text": "Digital tape removed the hiss but kept the linear recording flow.",
         "html": "<p><strong>Expert Explanation:</strong> The 1990s saw the rise of digital tape formats like ADAT (Alesis Digital Audio Tape) and large reel-to-reel digital machines like the Sony DASH. They offered zero tape hiss and pristine audio quality but remained linear—you still had to rewind and fast forward, making editing a chore compared to today's DAWs.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"ADAT brought the multi-track studio out of the control room and into the bedroom.\"<br/><strong>- 90s Project Studio Owner</strong></blockquote>"
    },
    "rec_00": {
         "text": "The DAW fundamentally changed music from a performance capture to a purely constructional medium.",
         "html": "<p><strong>Expert Explanation:</strong> By the 2000s, computers became powerful enough to handle massive track counts of high-resolution audio natively. The Digital Audio Workstation (DAW) allowed for non-linear, non-destructive editing. You could visually cut, paste, tune, and align audio effortlessly, leading to a new era of hyper-perfect, grid-aligned pop and electronic music.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We don't record songs anymore; we assemble them.\"<br/><strong>- Modern Producer</strong></blockquote>"
    },
    
    # Q2: Sequencing
    "seq_60": {
         "text": "Early analog sequencers were just complex rhythm clocks for modular synths.",
         "html": "<p><strong>Expert Explanation:</strong> Early 1960s sequencers, like those on Moog modular systems, were analog step sequencers. They outputted changes in Control Voltage (CV) at a set tempo. They could only play very short, repeating electronic patterns (like 8 or 16 steps) and were heavily used by electronic pioneers rather than rock bands.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It was like programming a computer using patch cables.\"<br/><strong>- Electronic Music Pioneer</strong></blockquote>"
    },
    "seq_70": {
         "text": "CV/Gate sequencers birthed the driving electronic pulse of Euro-disco and Kraftwerk.",
         "html": "<p><strong>Expert Explanation:</strong> In the 1970s, CV/Gate sequencing became more refined and widely used. Synthesizers like the Roland MC-8 Microcomposer allowed for much longer and more complex sequences to be programmed note-by-note. This technology built the foundation for Giorgio Moroder's driving basslines and the entire synth-pop genre.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We taught the machines to play the funk we couldn't play ourselves.\"<br/><strong>- 70s Synth Artist</strong></blockquote>"
    },
    "seq_80": {
         "text": "MIDI connected the studio, allowing one machine to control an army of synths.",
         "html": "<p><strong>Expert  Explanation:</strong> The introduction of MIDI in 1983 changed the world. Hardware MIDI sequencers (like the Roland MC-500 or Akai MPC) allowed producers to record, edit, and play back musical performances containing digital data (like pitch and velocity) rather than audio. One sequencer could trigger multiple synthesizers and drum machines simultaneously.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"MIDI turned the entire control room into a single, massive instrument.\"<br/><strong>- 80s Programmer</strong></blockquote>"
    },
    "seq_90": {
         "text": "Early software sequencers moved the MIDI brain into the computer.",
         "html": "<p><strong>Expert Explanation:</strong> In the 1990s, programs like early Cubase, Logic, and Cakewalk ran on Atari STs and early Macs. They largely handled MIDI data (not audio). Because the Atari ST had built-in MIDI ports and very tight timing, it became the brain of electronic music and techno studios everywhere.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The Atari ST's MIDI timing was tighter than a real drummer.\"<br/><strong>- 90s Techno Producer</strong></blockquote>"
    },
    "seq_00": {
         "text": "Modern DAWs combined MIDI sequencing and audio recording into one seamless environment.",
         "html": "<p><strong>Expert Explanation:</strong> By the 2000s, the distinction between a 'sequencer' and a 'recorder' vanished. DAWs like Ableton Live, Logic Pro, and Cubase handled both MIDI and high-resolution audio. Entire albums could be sequenced, recorded, edited, and mixed entirely 'in the box' using software instruments and effects.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The laptop became the most powerful instrument ever invented.\"<br/><strong>- 21st Century Musician</strong></blockquote>"
    },
    
    # Q4: Sampling
    "samp_60": {
         "text": "The Mellotron was the first sampler, but it used actual strips of magnetic tape.",
         "html": "<p><strong>Expert Explanation:</strong> The Mellotron wasn't digital at all. It was an electro-mechanical keyboard. Beneath every key was a dedicated strip of magnetic tape containing a recording of an instrument (like a flute or strings) that lasted about 8 seconds. Pressing the key pushed a tape head against the tape to play the sound, famously heard on 'Strawberry Fields Forever'.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It was an orchestra that constantly threatened to break down on stage.\"<br/><strong>- 60s Prog Keyboardist</strong></blockquote>"
    },
    "samp_70": {
         "text": "The Fairlight CMI was a sci-fi dream machine that cost as much as a house.",
         "html": "<p><strong>Expert Explanation:</strong> The Fairlight Computer Musical Instrument (CMI), introduced in 1979, was the first polyphonic digital sampling synthesizer. It allowed users to sample audio into digital memory and play it across a keyboard. Its iconic green screen and light pen interface defined the hyper-modern sound of 80s pop artists like Peter Gabriel and Kate Bush.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We were breaking glass and hitting pipes, then playing melodies with the sound.\"<br/><strong>- Fairlight Programmer</strong></blockquote>"
    },
    "samp_80": {
         "text": "8-bit and 12-bit samplers defined the crunchy, punchy sound of Golden Age Hip Hop.",
         "html": "<p><strong>Expert Explanation:</strong> In the 1980s, samplers became more affordable but still had limited memory. Units like the E-mu SP-1200 or Akai MPC60 used 12-bit digital audio. This low bit-depth, combined with anti-aliasing filters, gave drum samples an incredibly warm, crunchy, and punchy character that became the backbone of hip hop production.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"That 12-bit grit makes the kick drum hit you in the chest.\"<br/><strong>- Hip Hop Producer</strong></blockquote>"
    },
    "samp_90": {
         "text": "16-bit rackmount samplers brought pristine realism and massive sample libraries to studios.",
         "html": "<p><strong>Expert Explanation:</strong> The 1990s saw the dominance of rackmount units like the Akai S1000/S3000 series and E-mu Emulator. Offering CD-quality 16-bit sampling and expansions via floppy or Zip drives, they were used heavily in dance music to slice up breakbeats (like the Amen Break) and construct hyper-realistic orchestral mockups.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We spent more time waiting for the Zip drive to load than we did making music.\"<br/><strong>- 90s Drum & Bass Producer</strong></blockquote>"
    },
    "samp_00": {
         "text": "Software samplers removed hardware limits, offering terabytes of deeply multi-sampled instruments.",
         "html": "<p><strong>Expert Explanation:</strong> In the 2000s, software samplers like Native Instruments Kontakt took over. Utilizing the host computer's RAM and immense hard drive space, software samplers can load thousands of individual velocity-mapped samples for a single instrument, creating virtual orchestras indistinguishable from the real thing.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"Why hire a string section when you can load a 50-gigabyte library?\"<br/><strong>- Modern Film Composer</strong></blockquote>"
    },

    # Q5: Synthesis
    "synth_60": {
         "text": "Modular analog synths were laboratory equipment forced to make music.",
         "html": "<p><strong>Expert Explanation:</strong> The earliest synthesizers, designed by Don Buchla and Bob Moog, were massive 'modular' walls of circuits. Oscillators, filters, and amplifiers were completely separate. The musician had to literally connect (patch) them together using cables to create any sound. They were monophonic and incredibly difficult to keep in tune.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It looked like a telephone switchboard and sounded like the future.\"<br/><strong>- Electronic Pioneer</strong></blockquote>"
    },
    "synth_70": {
         "text": "The Minimoog liberated the synthesizer from the studio and put it on stage.",
         "html": "<p><strong>Expert Explanation:</strong> In 1970, the Minimoog set the paradigm. It took the best modules from the massive Moog systems and hard-wired them together in a portable, wooden case with a keyboard. Though still monophonic, its fat three-oscillator sound and dedicated pitch/mod wheels made it a legendary lead and bass instrument for rock and funk musicians.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The Minimoog did for the synthesizer what the Stratocaster did for the guitar.\"<br/><strong>- Synth Historian</strong></blockquote>"
    },
    "synth_80": {
         "text": "Digital FM synthesis introduced a completely alien, crystalline sound vocabulary.",
         "html": "<p><strong>Expert Explanation:</strong> The 1980s were ruled by the Yamaha DX7. It abandoned warm analog circuits for digital Frequency Modulation (FM). It was incredibly complex to program but excelled at cold, metallic, bell-like tones and aggressive digital bass lines. Being fully 16-voice polyphonic, it became the defining sound of 80s pop music.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"Nobody knew how to program it, so everyone just used the factory presets.\"<br/><strong>- 80s Keyboard Player</strong></blockquote>"
    },
    "synth_90": {
         "text": "Virtual Analog brought back knobs and warmth, but using computer code.",
         "html": "<p><strong>Expert Explanation:</strong> As dance music exploded in the 90s, producers missed the fat warmth and real-time control of 70s analog gear, which had become incredibly expensive. Synths like the Nord Lead or Roland JP-8000 used digital signal processing (DSP) to mimic analog circuitry, creating 'Virtual Analog'—offering the analog sound with digital reliability and presets.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We finally got back to turning knobs instead of pushing buttons on a menu.\"<br/><strong>- 90s Trance Producer</strong></blockquote>"
    },
    "synth_00": {
         "text": "Advanced Soft Synths broke all the physical rules of hardware.",
         "html": "<p><strong>Expert Explanation:</strong> By the 2000s, software synthesizers (like NI Massive or Serum) running as VST plugins began dominating. Because they weren't bound by physical hardware, they introduced hyper-complex wavetable synthesis, infinite modulation routing, and graphical interfaces that showed exactly how the sound was warping in real-time, heavily influencing modern EDM and Dubstep.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We stopped sculpting electricity and started sculpting math.\"<br/><strong>- Modern Sound Designer</strong></blockquote>"
    },
    
    # Q6: Reverb
    "rev_50": {
         "text": "To get reverb in the 50s, you literally had to build a room and put a speaker in it.",
         "html": "<p><strong>Expert Explanation:</strong> Before electronic reverb, studios like Capitol Records built dedicated physical 'Echo Chambers'—highly reflective basement rooms. Audio was played through a speaker into the room, and microphones placed inside the room captured the natural reverberations to mix back into the track.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The basement of the studio sounded better than the tracking room.\"<br/><strong>- 50s Audio Engineer</strong></blockquote>"
    },
    "rev_60": {
         "text": "Plate reverbs provided lush, dense tails by vibrating huge sheets of metal.",
         "html": "<p><strong>Expert Explanation:</strong> The EMT 140 was the classic 1960s plate reverb. It was a massive, heavy wooden box containing a large, suspended sheet of metal. A transducer vibrated the metal based on the audio signal, and pickups captured the metallic vibrations. It created a remarkably smooth, dense, un-room-like reverb that is still legendary for vocals today.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"A great plate reverb wraps around a vocal like a warm blanket.\"<br/><strong>- Classic Rock Mixer</strong></blockquote>"
    },
    "rev_70": {
         "text": "Early digital reverb algorithms struggled to sound real, but created new artificial spaces.",
         "html": "<p><strong>Expert Explanation:</strong> The late 70s gave us units like the Lexicon 224. It was one of the first digital reverbs using complex mathematical algorithms to simulate hundreds of delays mimicking a room's reflections. While it didn't sound exactly like a real room, its grainy, spacious, and highly tweakable artificial tails became an iconic sound of its own.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It didn't sound like a real hall, it sounded like a dream of a hall.\"<br/><strong>- 80s Pop Producer</strong></blockquote>"
    },
    "rev_80": {
         "text": "Gated digital reverb became the undisputed sound of the 1980s drum kit.",
         "html": "<p><strong>Expert Explanation:</strong> In the 80s, digital rack units like the Lexicon 480L or AMS RMX16 became incredibly clean and powerful. A defining technique was 'Gated Reverb', most famously used on Phil Collins' drums. Huge artificial digital reverb was applied to a snare drum, but a noise gate was used to instantly cut the reverb tail off, creating a massive, explosive, unnatural punch.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The snare drum sounded as big as a house, but disappeared in an instant.\"<br/><strong>- 80s Mix Engineer</strong></blockquote>"
    },
    "rev_90": {
         "text": "Advanced DSP reverbs offered highly complex, hyper-realistic algorithmic spaces.",
         "html": "<p><strong>Expert Explanation:</strong> By the late 90s, high-end algorithmic reverbs (like the Bricasti M7) utilized massive computational power. They could generate thousands of individual, calculated reflections to perfectly mimic the complex acoustic behavior of prestigious concert halls and intimate wooden rooms with stunning realism.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"You could blindfold a musician and they'd swear they were in a cathedral.\"<br/><strong>- Modern Mastering Engineer</strong></blockquote>"
    },
    "rev_00": {
         "text": "Convolution reverb takes spatial 'fingerprints' of real acoustic spaces.",
         "html": "<p><strong>Expert Explanation:</strong> In the 2000s, convolution reverb plugins (like Altiverb) became possible. Rather than using algorithms, convolution uses a recorded 'Impulse Response' (IR)—usually a starter pistol or sweep recorded in a real world space (like the Taj Mahal or Sydney Opera House). The software mathematically applies that exact acoustic fingerprint to your audio signal.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We stopped trying to mathematically guess what a room sounded like, and just stole its soul instead.\"<br/><strong>- Virtual Accoustics Expert</strong></blockquote>"
    },

    # Q8: Guitars
    "gui_50": {
         "text": "The solid-body electric guitar fought feedback and changed performance forever.",
         "html": "<p><strong>Expert Explanation:</strong> Before the 1950s, electric guitars were hollow 'archtops' that fed back uncontrollably at high volumes. The invention of the solid-body electric (like the Fender Broadcaster/Telecaster and later the Gibson Les Paul) allowed guitarists to play loudly and aggressively without howling feedback, providing the biting tone needed for early rock and roll.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It was just a plank of wood with pickups, but it cut through the mix like a knife.\"<br/><strong>- Early Rock Guitarist</strong></blockquote>"
    },
    "gui_60": {
         "text": "The electric 12-string created the chiming, jangly sound of 60s folk-rock.",
         "html": "<p><strong>Expert Explanation:</strong> The 1960s were heavily defined by the bright, chorused chime of electric 12-string guitars, most notably the Rickenbacker 360/12 used by George Harrison in The Beatles and Jim McGuinn of The Byrds. The paired octave and unison strings provided a rich, harmonic jangle that became a signature of the era's pop music.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It sounded like a bell choir ringing inside a guitar amplifier.\"<br/><strong>- 60s Pop Producer</strong></blockquote>"
    },
    "gui_70": {
         "text": "Humbuckers provided the thick, noise-free muscle required for hard rock.",
         "html": "<p><strong>Expert Explanation:</strong> As amps got louder and high-gain distortion became popular in the 1970s, the single-coil pickups of early Fenders produced too much 60-cycle hum and noise. 'Humbucking' pickups, which use two coiled magnets wired out of phase to cancel out electrical noise, provided a much fatter, darker, and noise-free signal perfect for pushing Marshall stacks.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"The humbucker gave the guitar the midrange punch required to stand up to a heavy drum kit.\"<br/><strong>- Hard Rock Engineer</strong></blockquote>"
    },
    "gui_80": {
         "text": "The Superstrat was built for speed, acrobatics, and dive-bombing.",
         "html": "<p><strong>Expert Explanation:</strong> The 1980s shred era birthed the 'Superstrat'. Guitarists like Eddie Van Halen and brands like Ibanez or Jackson heavily modified Stratocaster designs. They added high-output humbucker pickups, flatter fretboards for faster playing, and complex locking tremolo systems (like the Floyd Rose) that allowed for massive pitch dives without the guitar going out of tune.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"It wasn't a guitar; it was a highly tuned racing machine for the fretboard.\"<br/><strong>- 80s Shred Guitarist</strong></blockquote>"
    },
    "gui_90": {
         "text": "7-string and extended-range guitars dragged heavy music into the subterranean depths.",
         "html": "<p><strong>Expert Explanation:</strong> In the late 90s, Nu-Metal and modern metal bands began utilizing 7-string guitars (like the Ibanez Universe) or heavily down-tuned 6-strings. The addition of a low B (or even lower) string allowed for crushing, heavy, rhythmic riffs that fundamentally changed the sonic frequency range occupied by the modern metal guitar.</p><blockquote style=\"border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;\">\"We tuned so low that the bass player practically had to buy subsonic speakers to be heard.\"<br/><strong>- 90s Nu-Metal Guitarist</strong></blockquote>"
    }
}

for section in data['sections']:
    if section['title'].startswith('Stage 6'):
        for item in section['items']:
            if item.get('id') == 'quiz-timeline-1':
                for q in item.get('questions', []):
                    if q.get('type') == 'timeline':
                        for q_item in q.get('items', []):
                            i_id = q_item.get('id')
                            if i_id in exp_data:
                                img_src = q_item.get('img', '')
                                
                                # Make sure the explanation includes the image
                                if img_src:
                                   img_tag = f'<img src="{img_src}" alt="{q_item["text"]}" style="max-width:200px; display:block; margin: 0 auto 15px auto; border-radius:8px;" />'
                                   q_item['explanation'] = img_tag + exp_data[i_id]['html']
                                else:
                                   q_item['explanation'] = exp_data[i_id]['html']
                                   
                                q_item['expert_quote'] = { "text": exp_data[i_id]['text'] }
        break

with open(filepath, 'w') as f:
    json.dump(data, f, indent=4)

print("Explanations added to all remaining questions.")
