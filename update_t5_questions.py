import json

def update_t5():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic_index = next((i for i, t in enumerate(stage2['items']) if "Topic 5" in t.get('title', '')), None)
    
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
            "img": f"/images/gen/{img}_123.png", 
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{quote_text}"<br/><strong>- {quote_author}</strong></blockquote>'
        }

    # --- EASY ---
    questions.append(make_q(
        "Q1: Question 1",
        "What is the primary psychological and technical function of an audio compressor in a mix?",
        [
            {"text": "To add heavy distortion and EQ to the high frequencies", "is_true": False},
            {"text": "To reduce the dynamic range by making loud parts quieter, allowing the overall track to be turned up", "is_true": True},
            {"text": "To convert stereo signals into mono", "is_true": False},
            {"text": "To completely silence background noise between vocal phrases", "is_true": False}
        ],
        "A compressor shrinks the volume distance between the quietest whisper and the loudest scream. By squashing the massive peaks down, you create headroom to turn the entire vocal fader up so every word is audible.",
        "Compression is fundamentally automated volume control. Before the Fairchild, human engineers physically rode the fader up and down with their fingers to keep the singer audible. A compressor just does it with math and electricity instead of hands.",
        "Al Schmitt",
        "t5_q1_compressor_function_hq"
    ))

    questions.append(make_q(
        "Q2: Question 2",
        "Which parameter on a standard compressor determines the exact decibel level at which compression begins to occur?",
        [
            {"text": "Ratio", "is_true": False},
            {"text": "Attack", "is_true": False},
            {"text": "Makeup Gain", "is_true": False},
            {"text": "Threshold", "is_true": True}
        ],
        "The Threshold is the trigger line. If an audio signal is quieter than the threshold, the compressor ignores it entirely. The millisecond the audio crosses above that line, the compressor turns it down.",
        "Setting the threshold is throwing the net. Too high, and the big fish swim right under it. Too low, and you crush all the fragile plankton. You must set it exactly where the energy needs taming.",
        "Chris Lord-Alge",
        "t5_q2_compressor_threshold_hq"
    ))

    questions.append(make_q(
        "Q3: Question 3",
        "Once a signal crosses the threshold, what does a compressor's 'Ratio' control?",
        [
            {"text": "How much the volume is mathematically reduced", "is_true": True},
            {"text": "How fast the compressor turns on", "is_true": False},
            {"text": "How much bass is added to the signal", "is_true": False},
            {"text": "The width of the stereo field", "is_true": False}
        ],
        "Ratio dictates the severity of the squash. At 2:1, for every 2dB the vocal crosses the threshold, the compressor only lets 1dB out. At 10:1, it crushes 10dB of input down to just 1dB of output increase.",
        "Ratio is the strength of the muscular grip. 2:1 is a polite hand on the shoulder. 10:1 is a wrestler holding you firmly to the mat. Knowing how hard to squeeze is the art of dynamics.",
        "Andy Wallace",
        "t5_q3_compressor_ratio_hq"
    ))

    questions.append(make_q(
        "Q4: Question 4",
        "What parameter determines exactly how quickly a compressor reacts and clamps down on the audio once the signal crosses the threshold?",
        [
            {"text": "Release Time", "is_true": False},
            {"text": "Makeup Gain", "is_true": False},
            {"text": "Attack Time", "is_true": True},
            {"text": "Knee", "is_true": False}
        ],
        "A fast attack (0.1ms) chokes the initial transient 'crack' of a snare drum instantly. A slow attack (30ms) lets the transient 'crack' sneak out smoothly before the compressor clamps down on the ringing 'tail'.",
        "Attack time is the most powerful EQ you have. A slow attack shapes a lifeless drum into an explosive, punchy weapon because you are letting the physical stick hit hit the ear before destroying it.",
        "Michael Brauer",
        "t5_q4_attack_time_hq"
    ))

    questions.append(make_q(
        "Q5: Question 5",
        "What parameter refers to the millisecond time it takes for a compressor to stop compressing and return the volume to normal after the signal falls below the threshold?",
        [
            {"text": "Lookahead", "is_true": False},
            {"text": "Attack", "is_true": False},
            {"text": "Release Time", "is_true": True},
            {"text": "Sidechain", "is_true": False}
        ],
        "If Release is too fast, the audio pumps unpleasantly up and down. If Release is too slow, the compressor never recovers in time for the next musical note, keeping the entire track permanently squashed and lifeless.",
        "The Release is where the groove lives. If you time the release of your mix bus compressor to the exact BPM of the song, the entire track will literally breathe and dance in time with the drummer.",
        "Tony Maserati",
        "t5_q5_release_time_hq"
    ))

    questions.append(make_q(
        "Q6: Question 6",
        "Because a compressor lowers the volume of the loudest peaks, what is the purpose of 'Makeup Gain'?",
        [
            {"text": "To add vintage harmonic tube distortion", "is_true": False},
            {"text": "To raise the overall volume of the entire track back up, restoring the average loudness without the wild peaks", "is_true": True},
            {"text": "To automatically turn down the quiet parts", "is_true": False},
            {"text": "To expand the stereo width", "is_true": False}
        ],
        "Compression only ever turns things DOWN. Once you've shaved 4dB off the loud peaks of a guitar track, you use Makeup Gain to turn the entire track UP by 4dB. The result: the quiet parts are now 4dB louder.",
        "The illusion of 'fatness' from a compressor isn't the compression itself; it's the makeup gain pulling the invisible, quiet tail of the room reverb and harmonic breath up into the listener's ear.",
        "Pensado",
        "t5_q6_makeup_gain_hq"
    ))

    questions.append(make_q(
        "Q7: Question 7",
        "What dynamic processor is designed to completely silence or drastically attenuate an audio signal when it falls below a specific threshold?",
        [
            {"text": "A Noise Gate", "is_true": True},
            {"text": "A Limiter", "is_true": False},
            {"text": "A De-Esser", "is_true": False},
            {"text": "An Opto-Compressor", "is_true": False}
        ],
        "A Gate is the opposite of a compressor. It stays shut (silent) until a loud snare drum hits (breaking the threshold), opens for a millisecond to let the snare through, and then snaps shut to silence the drummer's hi-hat bleed.",
        "The noise gate was born of necessity to silence the terrifying hiss of analog tape machines during quiet passages, but musicians quickly hijacked it to chop audio blocks into rhythmic, staccato machine guns.",
        "Bob Clearmountain",
        "t5_q7_noise_gate_hq"
    ))

    # --- MEDIUM ---
    questions.append(make_q(
        "Q8: Question 8",
        "A compressor is set with a Threshold of -20dB and a Ratio of 4:1. If an incoming audio peak hits -8dB, what will the final output level be?",
        [
            {"text": "-8 dB", "is_true": False},
            {"text": "-19.5 dB", "is_true": False},
            {"text": "-17 dB", "is_true": True},
            {"text": "0 dB", "is_true": False}
        ],
        "The math: The input (-8) is exactly 12dB louder than the threshold (-20). At a 4:1 ratio, the compressor takes those 12 over-limit decibels and squeezes them down to just 3dB. So, the output is the threshold (-20) plus the allowed 3dB, equaling -17dB.",
        "Audio engineering is the application of visceral emotion disguised entirely as rudimentary mathematics.",
        "George Massenburg",
        "t5_q8_compression_math_hq"
    ))

    questions.append(make_q(
        "Q9: Question 9",
        "What is the acoustic difference between a 'Hard Knee' and a 'Soft Knee' setting on a compressor?",
        [
            {"text": "Soft Knee gradually curves into the full compression ratio as the volume nears the threshold; Hard Knee violently applies the full ratio the millisecond the threshold is crossed", "is_true": True},
            {"text": "Hard Knee is for digital plugins, Soft Knee is for analog gear", "is_true": False},
            {"text": "Hard knee compresses bass frequencies, soft knee compresses treble", "is_true": False},
            {"text": "Soft Knee reduces latency in modern recording DAWs", "is_true": False}
        ],
        "A Soft Knee makes compression invisible. Even if you set a brutal 10:1 ratio, a soft knee starts gently squeezing at 1.5:1, then 3:1 as the vocal gets louder, only hitting 10:1 at the absolute peak. It sounds like a human riding a fader.",
        "For an aggressive rock snare drum, use a hard knee to smash it like glass. For a delicate acoustic jazz vocal, use a widely swept soft knee so the singer never realizes they are in a cage.",
        "Alan Parsons",
        "t5_q9_hard_vs_soft_knee_hq"
    ))

    questions.append(make_q(
        "Q10: Question 10",
        "What is the technical definition of a 'Limiter'?",
        [
            {"text": "A specialized EQ that limits high frequencies to prevent harshness", "is_true": False},
            {"text": "A compressor intentionally configured with an extremely high ratio (10:1 to Infinity:1), designed to act as an impenetrable brick wall ceiling", "is_true": True},
            {"text": "A tool that limits the sample rate of a specific track", "is_true": False},
            {"text": "A noise gate used in reverse", "is_true": False}
        ],
        "A regular compressor softly reshapes a waveform. A limiter violently decapitates a waveform. It is used primarily on the master bus to ensure audio never technically exceeds exactly 0.0dBFS, preventing digital distortion.",
        "A limiter is the brutal safety net at the edge of the digital cliff. You don't want to bounce on it continually; you just want it there to catch the absolute worst mistakes before the record goes to the pressing plant.",
        "Bob Ludwig",
        "t5_q10_limiter_brickwall_hq"
    ))

    questions.append(make_q(
        "Q11: Question 11",
        "Which iconic type of analog compressor utilizes a small glowing light bulb targeting a photo-resistor to determine its gain reduction, resulting in a famously smooth, musical, non-linear release?",
        [
            {"text": "Opto-Compressor (e.g., LA-2A)", "is_true": True},
            {"text": "FET Compressor", "is_true": False},
            {"text": "VCA Compressor", "is_true": False},
            {"text": "Variable-Mu", "is_true": False}
        ],
        "Optical compressors (like the Teletronix LA-2A) have a 'memory' effect. The light panel glows bright when audio hits it, but the panel is slow to dim back to black. This fading glow creates the smoothest, most natural 2-stage release curve in recording history.",
        "The LA-2A is idiot-proof magic. It has two knobs, but the optical cell inside is doing calculus with light. Put it on a vocal, and it just sounds like a warm hug.",
        "Sylvia Massy",
        "t5_q11_opto_compressor_hq"
    ))

    questions.append(make_q(
        "Q12: Question 12",
        "The legendary Universal Audio 1176 is an incredibly fast, aggressive compressor often used to aggressively smash drum rooms and aggressive vocals. What specific type of electronic circuit does it use?",
        [
            {"text": "FET (Field Effect Transistor)", "is_true": True},
            {"text": "VCA (Voltage Controlled Amplifier)", "is_true": False},
            {"text": "Optical Cell", "is_true": False},
            {"text": "Digital Lookahead", "is_true": False}
        ],
        "FET compressors react in mere microseconds (millionths of a second), grabbing transient audio spikes far faster than tubes or optical lights ever could. This makes them vicious, punchy, and prone to adding beautiful harmonic distortion.",
        "The 1176 with all four ratio buttons pushed in simultaneously ('All Buttons In' mode) breaks the bias of the transistor network. It stops being a compressor and turns into a breathing, exploding distortion monster that defined the sound of rock drums.",
        "Chris Lord-Alge",
        "t5_q12_fet_1176_compressor_hq"
    ))

    questions.append(make_q(
        "Q13: Question 13",
        "What is the definition of 'Parallel Compression' (often referred to as 'New York Compression')?",
        [
            {"text": "Compressing the Left and Right channels of a stereo mix individually", "is_true": False},
            {"text": "Duplicating a track, crushing the copy horribly with compression, and subtly blending it under the uncompressed, natural-sounding original track", "is_true": True},
            {"text": "Running audio through two different compressors in serial order", "is_true": False},
            {"text": "Compressing multiple microphones at exactly the same time", "is_true": False}
        ],
        "Parallel compression perfectly preserves the massive transient snap and humanity of the original drum performance, while the underlying crushed duplicate track adds an enormous, fat 'tail' of density and perceived loudness.",
        "New York compression is the secret to 90% of massive hip-hop and rock records. You get the brutal punch of an uncompressed transient kick paired with the roaring, breathing sustain of a smashed room.",
        "Tony Visconti",
        "t5_q13_parallel_compression_hq"
    ))

    questions.append(make_q(
        "Q14: Question 14",
        "What specific acoustic outcome happens when you route the kick drum audio signal to the 'Key Input' or 'Detector' of a compressor placed on a bass guitar synthesizer track?",
        [
            {"text": "The bass guitar sounds more distorted", "is_true": False},
            {"text": "The kick drum triggers the compressor, forcing the bass volume to wildly 'duck' out of the way every single time the kick drum hits", "is_true": True},
            {"text": "The kick drum becomes quieter", "is_true": False},
            {"text": "Both tracks become locked perfectly in tune", "is_true": False}
        ],
        "This is called 'Sidechaining'. The bass compressor stops listening to the bass guitar, and only listens to the kick. By ducking the bass volume for a split second, the kick drum instantly cuts through the muddy low-end frequencies unopposed.",
        "Sidechain compression isn't just a mixing utility to fix muddy bass; in modern electronic dance music, the rhythmic, breathing suction effect of sidechaining the entire song against the kick is the heart of the groove itself.",
        "Deadmau5",
        "t5_q14_sidechain_ducking_hq"
    ))

    # --- HARD ---
    questions.append(make_q(
        "Q15: Question 15",
        "Which classic, expensive style of compressor, fundamentally like the legendary Fairchild 670, physically relies on changing the bias voltage of internal vacuum tubes to achieve massive, slow, program-dependent 'glue' on a mix bus?",
        [
            {"text": "Variable-Mu (Tube) Compressor", "is_true": True},
            {"text": "Digital Multiband Compressor", "is_true": False},
            {"text": "Optical LA-2A", "is_true": False},
            {"text": "VCA (Voltage Controlled Amplifier)", "is_true": False}
        ],
        "Variable-Mu basically means 'variable gain'. As the audio voltage gets louder, the tube's internal resistance naturally increases, smoothly and organically clamping down the volume. There is no true fixed ratio; the louder the music hits, the harder the compressor pushes back.",
        "A real Fairchild 670 weighs 65 pounds and costs $50,000 because it doesn't just compress audio; it irons the mix down with rolling tubes of glass and steel, wrapping the frequency spectrum in a velvet cloak of harmonic glue.",
        "Jack Joseph Puig",
        "t5_q15_variable_mu_fairchild_hq"
    ))

    questions.append(make_q(
        "Q16: Question 16",
        "VCA (Voltage Controlled Amplifier) compressors, like the SSL G-Master Bus Compressor, are most prized by mastering engineers for which specific characteristic?",
        [
            {"text": "Adding severe low-fidelity grit and unmusical distortion to hi-hats", "is_true": False},
            {"text": "Having incredibly slow and natural attack times akin to an optical light", "is_true": False},
            {"text": "Extremely precise, mathematical attack/release times that aggressively 'smack' the transients, providing tightly controlled rhythmic glue without muddying the frequency spectrum", "is_true": True},
            {"text": "Removing noise from vocal recordings perfectly", "is_true": False}
        ],
        "Unlike an Opto or a Tube compressor which behaves erratically, a VCA compressor is precision mathematics in a box. When you tell a VCA to grab a snare transient in exactly 1 millisecond, it does it surgically, making it the industry standard for tying a stereo mix together.",
        "The SSL Bus Compressor is quite literally the sound of professional radio since 1985. We call it the 'glue' because hitting a VCA with a fast attack on a drum bus physically tightens the air between the musicians.",
        "Chris Lord-Alge",
        "t5_q16_vca_ssl_glue_compressor_hq"
    ))

    questions.append(make_q(
        "Q17: Question 17",
        "While standard compression turns loud signals down, what precisely does 'Upward Expansion' accomplish dynamically?",
        [
            {"text": "It turns the quiet signals down even further until they are silent", "is_true": False},
            {"text": "It leaves quiet signals completely alone, but severely increases the volume of any signals that rise ABOVE the threshold, making the isolated transients far louder and punchier", "is_true": True},
            {"text": "It raises the general volume of music lacking peaks", "is_true": False},
            {"text": "It expands the physical width of a mono track into left and right", "is_true": False}
        ],
        "An upward expander actively undoes over-compression. It listens for the tiny transient spikes of a snare drum crossing a threshold, and violently turns the volume UP for a millisecond, injecting artificial punch back into a dead, flat mix.",
        "When you receive a drum track that a producer has already compressed within an inch of its life into a soulless brick, upward expansion is the only CPR tool that can shock the heart back into the snare drum.",
        "Bob Katz",
        "t5_q17_upward_expansion_hq"
    ))

    questions.append(make_q(
        "Q18: Question 18",
        "When applying compression with extremely fast attack AND fast release times to a low-frequency bass guitar, what horrific audio artifact can accidentally be introduced?",
        [
            {"text": "The track will permanently shift out of tune", "is_true": False},
            {"text": "The stereo panning will violently flip left to right", "is_true": False},
            {"text": "The track will lose all high frequencies above 5kHz", "is_true": False},
            {"text": "The compressor will clamp down and release inside a single individual bass wave cycle, visibly fracturing the sine wave and causing harsh, unmusical low-frequency distortion or 'clipping'", "is_true": True}
        ],
        "A low E string on a bass vibrates incredibly slowly (approx 41 times a second). If the compressor release is set to 5ms, the compressor literally turns on and off during the peak and trough of one single 41Hz sound wave, tearing the physical waveform in half.",
        "The physics of a low E note dictate its wave length. You cannot tell an 1176 FET compressor to release in 2 milliseconds on a 40Hz wave without accidentally inventing a brutal fuzz pedal.",
        "Andrew Scheps",
        "t5_q18_low_frequency_distortion_hq"
    ))

    questions.append(make_q(
        "Q19: Question 19",
        "What precisely does an invisible 'Lookahead' parameter execute under the hood of a modern digital brickwall peak limiter plugin?",
        [
            {"text": "It scans the internet to compare commercial loudness levels", "is_true": False},
            {"text": "It automatically analyzes the EQ spectrum of upcoming song chorus structures", "is_true": False},
            {"text": "It physically duplicates and delays the master audio by a few milliseconds, allowing the detector circuit to 'see' impossible transient spikes in the future and clamp them down before they're ever played to the speakers", "is_true": True},
            {"text": "It turns the volume up exactly 5 seconds before a loud drop occurs", "is_true": False}
        ],
        "Analog compressors can never be infinitely fast because electricity takes time to move through wire. A digital lookahead limiter cheats time by delaying the playback engine, clamping the snare drum transient entirely in a hidden buffer 2ms before you actually hear it.",
        "Lookahead limiting is effectively a time machine. The plugin is reading the script seconds before the actor delivers the line, allowing for surgically perfect volume control totally impossible in the physical analog realm.",
        "Software Developer",
        "t5_q19_lookahead_limiter_hq"
    ))

    questions.append(make_q(
        "Q20: Question 20",
        "In professional mastering, why is 'True Peak' limiting absolutely essential when preparing a modern digital file for major streaming platforms like Spotify or Apple Music?",
        [
            {"text": "Because 'True Peak' limiters make music objectively warmer", "is_true": False},
            {"text": "Because Spotify requires 24-bit True Peak WAVs for upload", "is_true": False},
            {"text": "Standard limiters only measure physical digital step values, which can hide invisible analog wave curves between the steps that will 'clip' and distort when the listener's DAC converts the file back into analog voltage", "is_true": True},
            {"text": "Because True Peak limiting removes MP3 aliasing automatically", "is_true": False}
        ],
        "Imagine plotting two points at exactly 0dBFS. In the digital matrix, it seems safe. However, the analog sound wave that connects those two dots must curve upwards between them, resulting in an 'intersample peak' of +1.5dBFS in the real world, causing brutal distortion on cheap iPhone DACs.",
        "The digital sample points on a screen are not the music; the continuous line drawn between the points is the music. True peak limiters are beautifully complex math engines that calculate the invisible analog arc jumping between dots.",
        "Bob Katz",
        "t5_q20_true_peak_limiting_hq"
    ))

    # Replace in origin
    stage2['items'][topic_index]['questions'] = questions
    
    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Successfully updated 20 questions for Stage 2 Topic 5 (Dynamics)")

if __name__ == '__main__':
    update_t5()
