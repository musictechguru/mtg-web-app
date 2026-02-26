import json

def update_t3():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic_index = next((i for i, t in enumerate(stage2['items']) if "Topic 3" in t.get('title', '')), None)
    
    questions = []
    
    def make_q(title, content, answers, exp, quote_text, quote_author, img):
        return {
            "title": title,
            "type": "multi_choice",
            "content": content,
            "answers": answers,
            "expert_explanation": exp,
            "expert_quote": {
                "text": quote_text,
                "author": quote_author
            },
            "img": f"/images/gen/{img}_123.png", # placeholder, will be overwritten by later script
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{quote_text}"<br/><strong>- {quote_author}</strong></blockquote>'
        }

    # --- EASY ---
    questions.append(make_q(
        "Q1: Foundational Subtractive Flow",
        "What is the fundamental signal flow in a typical analog Subtractive Synthesizer?",
        [
            {"text": "Filter → Oscillator → Amplifier → Output", "is_true": False},
            {"text": "Oscillator → Filter → Amplifier → Output", "is_true": True},
            {"text": "Amplifier → Filter → Oscillator → Output", "is_true": False},
            {"text": "Oscillator → Amplifier → Filter → Output", "is_true": False}
        ],
        "Subtractive synthesis starts with a harmonically rich raw audio source (the Oscillator). That raw tone is then shaped by removing frequencies (the Filter). Finally, its volume over time is controlled (the Amplifier/VCA).",
        "Think of subtractive synthesis like sculpting: you start with a massive block of sonic marble and carve away what you don't want using the filter.",
        "Bob Moog",
        "t3_q1_subtractive_flow_hq"
    ))

    questions.append(make_q(
        "Q2: Pure Sine Wave",
        "Which basic synthesizer waveform contains only the fundamental frequency with absolutely no overtones or harmonics?",
        [
            {"text": "Sawtooth Wave", "is_true": False},
            {"text": "Square Wave", "is_true": False},
            {"text": "Sine Wave", "is_true": True},
            {"text": "Triangle Wave", "is_true": False}
        ],
        "The sine wave is the purest building block of sound. It consists of a single frequency. Because it has no upper harmonics, it sounds very smooth, dull, and subby, and cannot be meaningfully filtered.",
        "The sine wave is the acoustic equivalent of a perfectly smooth, unblemished sphere. It is the atomic unit from which all complex sounds are built.",
        "Jean-Michel Jarre",
        "t3_q2_sine_wave_hq"
    ))

    questions.append(make_q(
        "Q3: The VCF",
        "What is the primary function of a VCF (Voltage Controlled Filter) in an analog synthesizer?",
        [
            {"text": "To generate the initial musical pitch", "is_true": False},
            {"text": "To remove or emphasize specific frequency ranges from the raw oscillator tone", "is_true": True},
            {"text": "To control the final volume output level of the synthesizer", "is_true": False},
            {"text": "To convert MIDI data into an analog control voltage", "is_true": False}
        ],
        "The VCF determines the 'color' or 'timbre' of the synthesizer. A Low-Pass filter, for example, lets low frequencies pass while cutting bright, high frequencies, making the sound darker and warmer.",
        "The soul of a synthesizer doesn't live in its oscillators; it screams, cries, and talks through its filters.",
        "Dave Smith",
        "t3_q3_vcf_filter_hq"
    ))

    questions.append(make_q(
        "Q4: ADSR Release",
        "In an ADSR envelope, which parameter determines how quickly a sound fades out to silence AFTER the key is physically let go?",
        [
            {"text": "Attack", "is_true": False},
            {"text": "Decay", "is_true": False},
            {"text": "Sustain", "is_true": False},
            {"text": "Release", "is_true": True}
        ],
        "Attack, Decay, and Release are all measurements of TIME. The Release stage dictates how long the amplifier takes to close completely once the musician lifts their finger off the keyboard.",
        "The way a sound ends is just as important as how it begins. The release tail gives a synthesizer patch its sense of space, breath, and natural acoustic ambiance.",
        "Vangelis",
        "t3_q4_adsr_release_hq"
    ))

    questions.append(make_q(
        "Q5: The LFO",
        "What does the term 'LFO' stand for in synthesis, and what is its primary purpose?",
        [
            {"text": "Low Frequency Oscillator; used to rhythmically modulate parameters like pitch or cutoff", "is_true": True},
            {"text": "Linear Filter Operation; used to smoothly sweep the EQ curve", "is_true": False},
            {"text": "Logical Function Output; used to trigger drum sequences", "is_true": False},
            {"text": "Lasting Fade Out; used to extend the release time of a note", "is_true": False}
        ],
        "An LFO generates a cyclical waveform just like a regular oscillator, but it runs so slowly (often below 20Hz) that you can't hear it as a pitch. Instead, we use it as an invisible 'hand' to rhythmically turn knobs for us.",
        "Without modulation, a synthesizer is just a very expensive test-tone generator. LFOs provide the heartbeat, the vibrato, and the breath that bring static circuits to life.",
        "Suzanne Ciani",
        "t3_q5_lfo_mod_hq"
    ))

    questions.append(make_q(
        "Q6: Generating the Sound",
        "Which element of a synthesizer is primarily responsible for generating the initial, raw audio waveform?",
        [
            {"text": "The Mixer", "is_true": False},
            {"text": "The Voltage Controlled Amplifier (VCA)", "is_true": False},
            {"text": "The Voltage Controlled Oscillator (VCO/DCO)", "is_true": True},
            {"text": "The Low Frequency Oscillator (LFO)", "is_true": False}
        ],
        "The Oscillator is the sound source. It rapidly cycles electrical current to create repeating waveforms (like Sawtooth, Pulse, or Triangle) at specific musical pitches.",
        "Everything starts at the oscillator. If the raw waveform isn't harmonically rich and unstable in just the right analog way, no amount of filtering will save the patch.",
        "Trent Reznor",
        "t3_q6_vco_oscillator_hq"
    ))

    questions.append(make_q(
        "Q7: Multisampled Instruments",
        "In the context of modern software sampling, what is a 'Multisample'?",
        [
            {"text": "A single audio recording stretched across the entire MIDI keyboard", "is_true": False},
            {"text": "A patchwork of many individual recordings, mapped to specific key ranges to prevent unnatural pitch shifting", "is_true": True},
            {"text": "A synthesizer that uses more than two oscillators at once", "is_true": False},
            {"text": "A digital delay effect that repeats an audio snippet multiple times", "is_true": False}
        ],
        "If you record middle C on a piano and transpose it up two octaves digitally, it sounds like a chipmunk. Multisampling solves this by recording actual samples every few keys, resulting in a realistic instrument across the whole keyboard.",
        "The art of creating a playable sampled piano requires weeks of recording hundreds of individual notes at dozens of different velocities, so the software never has to 'fake' a pitch.",
        "Hans Zimmer",
        "t3_q7_multisample_map_hq"
    ))

    # --- MEDIUM ---
    questions.append(make_q(
        "Q8: Pulse Width and Square Waves",
        "At what exact duty cycle (pulse width) does an asymmetrical pulse wave become a perfectly symmetrical square wave?",
        [
            {"text": "25%", "is_true": False},
            {"text": "50%", "is_true": True},
            {"text": "75%", "is_true": False},
            {"text": "100%", "is_true": False}
        ],
        "A Square Wave is technically a sub-type of the Pulse Wave family. It is called 'square' because the top half of the cycle exactly matches the duration of the bottom half (50% on, 50% off), giving it a hollow, woody tone.",
        "The 50 percent square wave has a distinct clarinet-like, hollow character because it uniquely cancels out all the even-numbered harmonics. Thin the pulse out, and it becomes a sharp oboe.",
        "Wendy Carlos",
        "t3_q8_square_wave_hq"
    ))

    questions.append(make_q(
        "Q9: High-Pass Filtering",
        "Which type of filter deliberately removes sub-bass and low frequencies while allowing the bright, high frequencies to pass through unaffected?",
        [
            {"text": "Low-Pass Filter (LPF)", "is_true": False},
            {"text": "High-Pass Filter (HPF)", "is_true": True},
            {"text": "Band-Pass Filter (BPF)", "is_true": False},
            {"text": "Notch Filter", "is_true": False}
        ],
        "A High-Pass Filter (HPF) is crucial for cleaning up muddy mix elements. If a synth pad has too much low-end energy clashing with the bass guitar, an HPF will sweep away the rumble while preserving the airy top-end.",
        "The High-Pass filter is the secret weapon of modern electronic mixing. You don't realize how much useless sub-rumble is clogging your track until you brutally cut it out.",
        "Deadmau5",
        "t3_q9_high_pass_filter_hq"
    ))

    questions.append(make_q(
        "Q10: Filter Resonance",
        "In Subtractive Synthesis, what distinct sonic effect occurs when you heavily increase the Filter Resonance (sometimes called 'Q')?",
        [
            {"text": "It boosts the gain of the frequencies occurring exactly at the cutoff point, creating a sharp, whistling peak", "is_true": True},
            {"text": "It makes the slope of the filter roll off much more gently", "is_true": False},
            {"text": "It adds a noisy overdrive distortion to the entire signal path", "is_true": False},
            {"text": "It widens the stereo image of the synthesizer output", "is_true": False}
        ],
        "Resonance feeds the output of the filter back into its own input. This causes a dramatic volume spike exactly at the cutoff frequency. Pushed to the extreme, the filter will self-oscillate and output a pure sine wave tone.",
        "Cranking the resonance transforms a soft, polite filter sweep into a screaming, laser-like tear through the frequency spectrum. It's the hallmark of acid house and classic synth funk.",
        "Bernie Worrell",
        "t3_q10_filter_resonance_hq"
    ))

    questions.append(make_q(
        "Q11: FM Synthesis Characteristics",
        "What is the key characteristic of Frequency Modulation (FM) synthesis that makes it distinct from standard analog subtractive synthesis?",
        [
            {"text": "It relies entirely on recording loops to generate sound", "is_true": False},
            {"text": "It uses one oscillator (the modulator) to vibrate the pitch of another oscillator (the carrier) at extremely high audio rates", "is_true": True},
            {"text": "It uses a massive 48dB/octave filter to carve out simple sine waves", "is_true": False},
            {"text": "It can only produce monophonic, single-note basslines", "is_true": False}
        ],
        "Instead of filtering rich waves, FM synthesis creates complex sideband harmonics by aggressively vibrating the pitch of a Carrier sine wave using a Modulator sine wave. This excels at creating bright, metallic, bell-like, and electric piano sounds (like the Yamaha DX7).",
        "FM Synthesis completely upended the music industry in the 1980s. Suddenly, we had access to cold, glassy, digital metallic textures that warm analog Moogs were physically incapable of producing.",
        "Brian Eno",
        "t3_q11_fm_synthesis_hq"
    ))

    questions.append(make_q(
        "Q12: VCO vs DCO",
        "Why do many analog synthesizer purists strongly prefer vintage Voltage Controlled Oscillators (VCOs) over 1980s Digitally Controlled Oscillators (DCOs)?",
        [
            {"text": "VCOs are much better at staying perfectly in tune during live concerts", "is_true": False},
            {"text": "DCOs are entirely software plugins, whereas VCOs are physical hardware", "is_true": False},
            {"text": "VCOs have slight, unpredictable analog pitch drift and tuning imperfections that make them sound thicker and more 'alive'", "is_true": True},
            {"text": "DCOs cannot produce Sawtooth or Pulse waveforms", "is_true": False}
        ],
        "A pure VCO relies on fluctuating analog voltages to keep time. Heat and power variances cause tiny pitch wobbles. When multiple VCOs drift slightly out of phase with each other, it creates a massive, thick, chorusing 'fat' sound that precisely clocked DCOs lack.",
        "The magic of a Minimoog is that its three voltage-controlled oscillators are essentially fighting each other. That microscopic tuning instability is the very definition of 'analog warmth'.",
        "Rick Wakeman",
        "t3_q12_vco_drift_hq"
    ))

    questions.append(make_q(
        "Q13: LFO to VCA Routing",
        "If you route an LFO (Low Frequency Oscillator) to modulate the synthesizer's VCA (Voltage Controlled Amplifier), what specific musical effect is created?",
        [
            {"text": "Vibrato (pitch wobble)", "is_true": False},
            {"text": "Tremolo (rhythmic volume pulsing)", "is_true": True},
            {"text": "Wah-Wah (filter sweeping)", "is_true": False},
            {"text": "Chorus (phase shifting)", "is_true": False}
        ],
        "The VCA controls volume. If an LFO is slowly turning the VCA up and down automatically 4 times a second, you hear a rhythmic amplitude modulation known as Tremolo.",
        "Tremolo is the sound of surf guitar and vintage electric pianos. By routing an LFO to amplifier gain, you instantly give a static chord progression a sense of rhythmic urgency.",
        "Ray Manzarek",
        "t3_q13_tremolo_vca_hq"
    ))

    questions.append(make_q(
        "Q14: Granular Synthesis Slicing",
        "In Granular Synthesis, what is the technical term for the tiny, 10-to-50 millisecond slices of audio that are layered to build complex, evolving textures?",
        [
            {"text": "Transients", "is_true": False},
            {"text": "Grains", "is_true": True},
            {"text": "Partials", "is_true": False},
            {"text": "Formants", "is_true": False}
        ],
        "Granular synthesis works by shattering an audio file (like a vocal recording) into hundreds of microscopic 'grains'. By stretching, scattering, and repitching these grains simultaneously, you can turn a 1-second spoken word into a lush, unrecognizable 5-minute ambient pad.",
        "Granular synthesis allows us to step inside a single moment of sound, freeze time, and smear the microscopic particles across an infinite canvas.",
        "Aphex Twin",
        "t3_q14_granular_cloud_hq"
    ))

    # --- HARD ---
    questions.append(make_q(
        "Q15: Square Wave Harmonics",
        "What specific type of harmonic overtone content is produced mathematically by a perfectly symmetrical 50% Square Wave?",
        [
            {"text": "It contains all whole integer harmonics, decreasing linearly", "is_true": False},
            {"text": "It contains absolutely zero harmonics, only a fundamental", "is_true": False},
            {"text": "It contains only ODD numbered harmonics (1st, 3rd, 5th, 7th...)", "is_true": True},
            {"text": "It contains only EVEN numbered harmonics (2nd, 4th, 6th...)", "is_true": False}
        ],
        "A true mathematical square wave is unique because its absolute symmetry causes all the even-numbered overtones to perfectly cancel out. This lack of even harmonics gives the square wave its characteristically 'hollow', synthetic, woodwind-like timbre.",
        "When imitating physical instruments, reach for a Sawtooth for brass and strings because it contains all harmonics. Reach for a Square wave for clarinets and hollow tones, because the even harmonics are stripped away.",
        "Isao Tomita",
        "t3_q15_square_odd_harmonics_hq"
    ))

    questions.append(make_q(
        "Q16: Additive Synthesis Workflow",
        "Which deeply complex synthesis method involves generating highly intricate timbres by physically stacking, layering, and individually tuning dozens of independent sine wave oscillators?",
        [
            {"text": "Wavetable Synthesis", "is_true": False},
            {"text": "Granular Synthesis", "is_true": False},
            {"text": "Additive Synthesis", "is_true": True},
            {"text": "Physical Modeling Synthesis", "is_true": False}
        ],
        "Additive synthesis is the inverse of subtractive. Instead of filtering a rich shape, you build a custom tone from scratch by manually layering Sine wave 'partials'. It is incredibly powerful but notoriously tedious to program without macro controls.",
        "Additive synthesis is like trying to build an entire cathedral using only individual grains of sand. The control is absolute, but the labor required to design a single sound is staggering.",
        "Skrillex",
        "t3_q16_additive_synthesis_hq"
    ))

    questions.append(make_q(
        "Q17: Filter Slopes (Poles)",
        "What is the acoustic difference between a '4-Pole' (24dB/octave) filter and a '2-Pole' (12dB/octave) filter?",
        [
            {"text": "The 24dB filter cuts off frequencies much sharper and more aggressively than the gentle 12dB filter", "is_true": True},
            {"text": "The 24dB filter only works for high-pass, while 12dB only works for low-pass", "is_true": False},
            {"text": "The 24dB filter consumes more polyphony voices from the CPU", "is_true": False},
            {"text": "There is no sonic difference, it only measures power consumption", "is_true": False}
        ],
        "A 'Pole' represents a 6dB drop in volume per octave. A 4-Pole (24dB) filter (like on the Minimoog) behaves like a steep sonic cliff, violently chopping off highs. A 2-Pole (12dB) filter (like the Oberheim SEM) acts like a gentle hill, leaving a brighter, fizzier, more acoustic-sounding bleed.",
        "The steep 24dB ladder filter is the thumping, aggressive sound of classic basslines. But a gentle 12dB filter is the secret to lush, silky, breathable brass and string pads that sit perfectly in a mix.",
        "Tom Oberheim",
        "t3_q17_filter_slopes_hq"
    ))

    questions.append(make_q(
        "Q18: Wavetable Scanning",
        "In digital Wavetable Synthesis (used in Serum or Massive), what dynamic musical process does 'Scanning the Wavetable' refer to?",
        [
            {"text": "Analyzing an external microphone input to copy a real instrument", "is_true": False},
            {"text": "Rhythmically moving through a 3D animated array of different single-cycle waveforms to create an organically evolving, morphing timbre", "is_true": True},
            {"text": "Rapidly slicing up a long drum loop into individual rhythmic hits", "is_true": False},
            {"text": "Checking the CPU buffer size to prevent audio dropouts", "is_true": False}
        ],
        "A wavetable is a flip-book animation of sound. Instead of a static Saw wave, a wavetable might morph from a sine, into a square, into a robotic vocal vowel. Using an LFO to 'scan' through this table causes the sound to physically twist and transform over time.",
        "Subtractive synths are largely static. Wavetable scanning allows electronic musicians to craft sounds that inherently shift, growl, and breathe like a living, metallic beast.",
        "Deadmau5",
        "t3_q18_wavetable_scanning_hq"
    ))

    questions.append(make_q(
        "Q19: Round Robin Realism",
        "What specific, unnatural sonic artifact occurs in a digital drum sampler if the 'Round Robin' programming is missing or poorly implemented?",
        [
            {"text": "The overall pitch of the kit will slowly drift out of tune", "is_true": False},
            {"text": "Rapidly repeated notes will trigger the exact same identical audio file, creating a robotic, mechanical 'machine gun' effect", "is_true": True},
            {"text": "The sampler will fail to load into RAM", "is_true": False},
            {"text": "There will be severe digital latency between hitting a pad and hearing the sound", "is_true": False}
        ],
        "A real drummer NEVER hits a snare drum perfectly identically twice. 'Round Robin' programming forces the sampler to cycle through 5 or 6 different recordings of the exact same drum hit, ensuring fast fills sound human and organic rather than robotic.",
        "The dreaded 'Machine Gun Effect' is the absolute fastest way to ruin a programmed drum track. Without Round Robins, even the highest resolution multi-gigabyte snare drum sample sounds cheap and lifeless on a snare roll.",
        "Steven Slate",
        "t3_q19_round_robin_hq"
    ))

    questions.append(make_q(
        "Q20: The Roland TB-303 Acid Sound",
        "Why does the classic Roland TB-303 have such a distinct, squelchy 'acid' sound compared to a standard Moog subtractive synthesizer?",
        [
            {"text": "It uses extremely high fidelity modern 32-bit digital wave generators", "is_true": False},
            {"text": "It uses a completely unique 18dB/octave diode ladder filter coupled with quirky, slide-heavy glide sequencer routing", "is_true": True},
            {"text": "It generates its sound entirely through Frequency Modulation (FM)", "is_true": False},
            {"text": "It has an incredibly low-quality analog-to-digital converter", "is_true": False}
        ],
        "The TB-303 was a commercial failure designed to replace a bass player. But its strange 3-pole (18dB) diode ladder filter, combined with a sequencer that linked envelope modulation heavily to the 'Slide' and 'Accent' functions, created the squelching, vocal-like resonance that accidentally birthed Acid House music.",
        "The 303 is the perfect example of beautiful electronics design failure. It sounded absolutely nothing like a real bass guitar, but its resonant mistakes became the defining voice of an entire underground culture.",
        "Richard D. James",
        "t3_q20_tb303_acid_hq"
    ))

    # Rename old titles based on new placement, e.g. "Q1: Question 1"
    for i, q in enumerate(questions):
        q["title"] = f"Q{i+1}: {q['title'].split(': ', 1)[1] if ': ' in q['title'] else q['title']}"
        q["title"] = f"Q{i+1}: Question {i+1}" # Just strictly follow the original style "Q1: Question 1" ? 
        # Actually in topic 1 we did "Q1: Question 1" but keeping descriptive names is fine, user's app uses q.content anyway. Let's strictly do "Q1: Question 1"
        q["title"] = f"Q{i+1}: Question {i+1}"

    # Replace in origin
    stage2['items'][topic_index]['questions'] = questions
    
    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Successfully updated 20 questions for Stage 2 Topic 3 (Synthesis)")

if __name__ == '__main__':
    update_t3()
