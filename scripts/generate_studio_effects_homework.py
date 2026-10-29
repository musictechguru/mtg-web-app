#!/usr/bin/env python3
"""
generate_studio_effects_homework.py
Generates 5 Pearson Edexcel Component 3 Homework & Exam Packs:
1. public/downloads/homework/homework-delay.html
2. public/downloads/homework/homework-reverb.html
3. public/downloads/homework/homework-chorus.html
4. public/downloads/homework/homework-phaser.html
5. public/downloads/homework/homework-flanger.html
"""

import os

HOMEWORK_DATA = [
    {
        "id": "delay",
        "title": "Delay &amp; Echo Effects in Context",
        "subtitle": "Tape Loops, BBD Chips, Dotted-Eighth Rhythms &amp; Aux Routing",
        "accent": "#0284c7",
        "accent_light": "rgba(2, 132, 199, 0.1)",
        "badge": "Edexcel Component 3 &bull; Time-Based Signal Processing",
        "filename": "public/downloads/homework/homework-delay.html",
        "listening": [
            {"track": "U2 &ndash; 'Where The Streets Have No Name' (1987)", "gear": "Korg SDD-3000 / EHX Deluxe Memory Man", "notes": "Dotted 8th note delay (3/16 note, ~360ms at 125 BPM) mixed 50/50 with dry signal creating cascading rhythmic gallop."},
            {"track": "Elvis Presley &ndash; 'Heartbreak Hotel' (1956)", "gear": "Ampex 350 tape machine at Sun Studios", "notes": "Classic slapback delay (75-130ms, single repeat with no feedback) between record and playback heads."},
            {"track": "The Police &ndash; 'Walking on the Moon' (1979)", "gear": "Electro-Harmonix Memory Man &amp; Maestro Echoplex", "notes": "Spacious analog BBD delay on Andy Summers' guitar chords with warm high-frequency damping on successive repeats."},
            {"track": "Pink Floyd &ndash; 'Us and Them' (1973)", "gear": "Binson Echorec (magnetic spinning drum)", "notes": "Multi-tap panning delay creating vast, floating psych-rock vocal echoes across the stereo field."}
        ],
        "fingerprints": [
            ("Delay Time", "Duration between dry signal and repeat (1ms to 2000ms+). Formula for dotted-eighth: (60,000 / BPM) x 0.75 ms."),
            ("Feedback (Regen)", "Percentage of delayed output returned to the input. 0% = single repeat; 100%+ = runaway analog self-oscillation."),
            ("High Damping", "Low-pass filter inside feedback loop attenuating treble on each repeat to simulate natural acoustic air absorption."),
            ("Tape Echo Flaws", "Mechanical wow and flutter motor speed variations that impart musical chorusing and harmonic tape saturation."),
            ("Signal Routing", "Auxiliary Send / Return bus setup (100% wet) allowing multiple channels to share one delay while preserving dry punch.")
        ],
        "sectionA": [
            {
                "num": "1",
                "q": "Explain how slapback delay was physically generated at Sun Studio in the 1950s without digital processors.",
                "marks": "3",
                "guidance": "Award 1 mark for mentioning reel-to-reel tape machine / magnetic tape. 1 mark for explaining the physical gap/distance between the record head and playback head. 1 mark for identifying tape transport speed (15 ips) creating a 75–130ms delay with no feedback."
            },
            {
                "num": "2",
                "q": "Calculate the delay time in milliseconds required for a dotted-eighth note repeat in a track with a tempo of 120 BPM. Show your working.",
                "marks": "3",
                "guidance": "Award 1 mark for finding quarter note (60,000 / 120 = 500ms). 1 mark for finding eighth note (250ms) or applying 0.75 multiplier (500 x 0.75). 1 mark for correct final answer: 375 ms."
            },
            {
                "num": "3",
                "q": "Describe the operational mechanism of an analog Bucket Brigade Device (BBD) delay chip and state one sonic limitation compared to digital delay.",
                "marks": "3",
                "guidance": "Award 1 mark for passing analog electrical charge packets sequentially across microscopic capacitor stages. 1 mark for clock oscillator controlling delay speed. 1 mark for limitation: clock noise / high-frequency roll-off / lower dynamic range / reduced headroom."
            },
            {
                "num": "4",
                "q": "State two engineering advantages of routing a vocal delay as a parallel Auxiliary Send / Return rather than an inline Channel Insert.",
                "marks": "2",
                "guidance": "Award 1 mark each (max 2): (1) Preserves 100% of the dry vocal signal's clarity and transient punch; (2) Multiple tracks can be sent to a single shared delay processor, saving DSP/hardware; (3) Dedicated return channel allows independent EQ/automation of echoes."
            },
            {
                "num": "5",
                "q": "Explain what occurs sonically and electrically when a delay unit's feedback parameter is increased past 100%.",
                "marks": "2",
                "guidance": "Award 1 mark for runaway self-oscillation (infinite repeats building in energy). 1 mark for circuit overload / non-linear analog harmonic distortion / saturated oscillation tone."
            }
        ],
        "sectionB": {
            "title": "Extended 12-Mark Technical Evaluation Question",
            "prompt": "Evaluate the evolution of delay technology from 1950s tape loops to modern digital and plugin processors. In your answer, refer to: • Mechanical, analog BBD, and digital architectures • Key parameters (delay time, feedback, high damping) • Signal routing (Inserts vs. Parallel Aux Sends) • Specific landmark musical examples.",
            "indicative": "• 1950s Tape Delay: Dual-deck slapback (Sun Records, Elvis) & dedicated tape loop units (Echoplex, Roland Space Echo). Mechanical motor speed governs time; wow/flutter creates organic pitch warmth; magnetic saturation provides soft clipping.<br>• 1970s Analog BBD: Solid-state capacitor bucket lines (Memory Man, Boss DM-2). Eliminates moving tape; darker repeats due to anti-aliasing low-pass filters.<br>• 1980s+ Digital Delay: RAM storage, PCM conversion, sample-accurate tempo sync (Korg SDD-3000, TC 2290). Dotted-eighth rhythmic doubling (The Edge / U2). Multi-tap, ping-pong, and dynamic ducking delay.<br>• Signal Routing: Parallel Aux Send/Return preserves dry transient impact and enables shared space vs. channel insert."
        }
    },
    {
        "id": "reverb",
        "title": "Reverb Effects &amp; Spatial Processing",
        "subtitle": "Chambers, EMT Plates, Springs, Gated Drums &amp; Convolution IR",
        "accent": "#0284c7",
        "accent_light": "rgba(2, 132, 199, 0.1)",
        "badge": "Edexcel Component 3 &bull; Acoustic &amp; Spatial Processing",
        "filename": "public/downloads/homework/homework-reverb.html",
        "listening": [
            {"track": "Phil Collins &ndash; 'In The Air Tonight' (1981)", "gear": "Townhouse Stone Room &bull; SSL 4000 Listen Mic &bull; Noise Gate", "notes": "Explosive gated snare reverb: massive stone room reflection tail aggressively truncated into dead silence by a fast-release gate."},
            {"track": "The Beach Boys &ndash; 'Good Vibrations' (1966)", "gear": "Western Recorders Acoustic Echo Chamber", "notes": "Natural subterranean tiled chamber reverb delivering deep, three-dimensional acoustic bloom on vocal harmonies."},
            {"track": "Simon &amp; Garfunkel &ndash; 'Bridge Over Troubled Water' (1970)", "gear": "Columbia 30th Street Studio &amp; EMT 140 Plate", "notes": "Lush 1x2m steel plate reverberation providing smooth, dense, shimmering decay across piano and vocal crescendos."},
            {"track": "Dick Dale &ndash; 'Misirlou' (1962)", "gear": "Fender Outboard Tube Spring Reverb Unit", "notes": "Surf guitar drip: mechanical coiled steel springs driven into fluttering, twangy mechanical dispersion."}
        ],
        "fingerprints": [
            ("RT60 Decay Time", "Time in seconds required for sound reflections to decay by 60 dB below the direct sound level."),
            ("Pre-Delay Gap", "Time offset (10–60ms) between direct sound and early reflections; preserves vocal intimacy before the wash."),
            ("EMT 140 Plate", "Suspended 1x2m cold-rolled steel sheet excited by transducer; dense, smooth, high-diffusion decay."),
            ("Spring Tank", "Coiled steel wires excited by electromagnetic transducers; twangy, dispersed, fluttery character."),
            ("Gated Reverb Chain", "Snare Drum &rarr; Massive Non-Linear Room/Plate &rarr; Aggressive VCA Compressor &rarr; Fast-Release Noise Gate.")
        ],
        "sectionA": [
            {
                "num": "1",
                "q": "State the precise acoustic definition of RT60.",
                "marks": "2",
                "guidance": "Award 1 mark for the time in seconds for reverberant sound reflections to decay. 1 mark for specifying a reduction of 60 dB below the direct/initial sound level."
            },
            {
                "num": "2",
                "q": "Explain how Pre-Delay helps a lead vocal sit clearly in a modern mix without being masked by its reverb wash.",
                "marks": "3",
                "guidance": "Award 1 mark for explaining that pre-delay introduces a time gap (15–50ms) before reflections begin. 1 mark for stating that initial consonants/transients pass through completely dry and articulate. 1 mark for noting that the reverb blooms only after the transient, preventing masking."
            },
            {
                "num": "3",
                "q": "Describe the mechanical construction and operation of an EMT 140 plate reverb.",
                "marks": "3",
                "guidance": "Award 1 mark for a 1x2 meter cold-rolled steel sheet suspended under tension inside a heavy frame. 1 mark for an electromagnetic driver/transducer vibrating the plate with audio. 1 mark for contact pickups capturing the bending waves / mechanical damper pad controlling decay time."
            },
            {
                "num": "4",
                "q": "Detail the complete signal chain and gate settings used to create the 1980s gated snare drum sound.",
                "marks": "3",
                "guidance": "Award 1 mark for feeding the snare to a large room or plate reverb. 1 mark for heavy compression (e.g. SSL listen mic compressor). 1 mark for noise gate set with threshold open on the snare hit, hold time ~150-250ms, and instantaneous fast release (10-20ms) cutting off the tail abruptly."
            },
            {
                "num": "5",
                "q": "Explain how Convolution Reverb captures and recreates the acoustic properties of a physical concert hall.",
                "marks": "2",
                "guidance": "Award 1 mark for recording an Impulse Response (IR) of the room using a starter pistol or sine sweep. 1 mark for mathematically multiplying (convolving) the input audio signal with the IR using digital signal processing."
            }
        ],
        "sectionB": {
            "title": "Extended 12-Mark Technical Evaluation Question",
            "prompt": "Evaluate the development and musical application of artificial reverberation technologies: • Acoustic chambers and EMT plate reverbs • Spring reverb tanks in guitar amplifiers • Digital algorithmic (Lexicon) and convolution processors • The role of pre-delay, damping, and gated reverb in production.",
            "indicative": "• Physical Chambers: Tiled basement rooms with speaker/mic (Putnam, Capitol, Abbey Road). Natural, smooth 3D decay but fixed acoustic characteristics.<br>• EMT 140 Plate (1957): Suspended 1x2m steel sheet; eliminates room construction; dense high-frequency diffusion ideal for vocals; adjustable mechanical damper.<br>• Spring Reverb: Coiled steel springs (Fender Twin). Frequency-dependent dispersion creates iconic surf 'twang' and mechanical flutter.<br>• Digital Algorithmic (Lexicon 224/480L): Microprocessor feedback delay networks; user controls RT60, room size, pre-delay, and damping.<br>• 1980s Gated Reverb: Townhouse/SSL Phil Collins technique; non-linear acoustic impact without muddying fast tempos.<br>• Convolution: Mathematical impulse response reproduction of real acoustic spaces."
        }
    },
    {
        "id": "chorus",
        "title": "Chorus Effect &amp; Spatial Modulation",
        "subtitle": "BBD Delay Lines, LFO Pitch Detuning &amp; Stereo Width",
        "accent": "#0284c7",
        "accent_light": "rgba(2, 132, 199, 0.1)",
        "badge": "Edexcel Component 3 &bull; Modulation Signal Processing",
        "filename": "public/downloads/homework/homework-chorus.html",
        "listening": [
            {"track": "Nirvana &ndash; 'Come As You Are' (1991)", "gear": "Electro-Harmonix Small Clone Analog Chorus", "notes": "Kurt Cobain's iconic clean intro tone: watery, submerged pitch modulation and dynamic acoustic depth."},
            {"track": "The Police &ndash; 'Every Breath You Take' (1983)", "gear": "Roland JC-120 Jazz Chorus &bull; Dual 60W Stereo", "notes": "Andy Summers' palm-muted ninth chords: crystal-clean solid state tone with true spatial acoustic chorus in the room air."},
            {"track": "The Cure &ndash; 'A Forest' (1980)", "gear": "Boss CE-1 Chorus Ensemble", "notes": "Gothic post-punk guitar texture: warm BBD pitch modulation creating expansive stereophonic landscape."},
            {"track": "Roland Juno-106 Synth &ndash; Factory Strings", "gear": "Internal MN3009 BBD Stereo Chorus", "notes": "Transforming a single digitally controlled oscillator (DCO) per voice into massive, cinematic polyphonic pads."}
        ],
        "fingerprints": [
            ("15–35ms Delay Window", "The optimal Haas doubling zone. Below 15ms causes comb flanging; above 35ms creates distinct slapback echo."),
            ("LFO Pitch Detune", "Low Frequency Oscillator modulates delay clock speed, continuously Doppler-shifting pitch sharp and flat."),
            ("Summing & Beating", "Combining unmodulated dry signal with modulated wet signal produces acoustic phase beating and richness."),
            ("Rate & Depth", "Rate controls LFO speed in Hertz; Depth controls amplitude of pitch detuning in cents."),
            ("Roland Dimension D", "Dual cross-mixed inverted delay lines creating dimensional stereo width with virtually zero audible pitch warble.")
        ],
        "sectionA": [
            {
                "num": "1",
                "q": "State the typical delay time range used in a chorus effect and explain why this range is chosen.",
                "marks": "3",
                "guidance": "Award 1 mark for stating 15ms to 35ms. 1 mark for explaining that delays under 15ms produce comb filtering / flanging. 1 mark for explaining that delays over 35ms produce distinct slapback echoes; 15-35ms creates natural doubling."
            },
            {
                "num": "2",
                "q": "Explain how an LFO modulating a delay line creates pitch variation in a chorus circuit.",
                "marks": "3",
                "guidance": "Award 1 mark for LFO modulating clock frequency/speed. 1 mark for Doppler effect: shortening delay time compresses audio wave cycles, raising pitch sharp. 1 mark for lengthening delay time stretching wave cycles, dropping pitch flat."
            },
            {
                "num": "3",
                "q": "Describe how the Roland JC-120 amplifier produces true spatial chorus without summing signals electronically.",
                "marks": "3",
                "guidance": "Award 1 mark for two independent 60W power amplifiers and two 12-inch speakers. 1 mark for routing the dry untouched signal to one speaker and the pitch-vibrato signal to the other speaker. 1 mark for acoustic mixing occurring in the physical room air."
            },
            {
                "num": "4",
                "q": "Why did Roland include built-in analog chorus circuits in polyphonic synthesizers like the Juno-6 and Juno-106?",
                "marks": "2",
                "guidance": "Award 1 mark for cost reduction: each voice had only a single DCO oscillator. 1 mark for built-in BBD chorus thickening and stereo-widening the sound to emulate dual-oscillator polyphonic synths."
            },
            {
                "num": "5",
                "q": "Explain the mono compatibility risk associated with aggressive stereo chorus effects.",
                "marks": "2",
                "guidance": "Award 1 mark for recognizing that stereo chorus frequently phase-inverts the wet signal on one channel. 1 mark for explaining that summing to mono causes destructive phase cancellation, thinning or erasing the chorused sound."
            }
        ],
        "sectionB": {
            "title": "Extended 12-Mark Technical Evaluation Question",
            "prompt": "Analyze the technical operation, parameters, and artistic application of the chorus effect in modern music production. In your answer, refer to: • BBD analog delay lines and LFO modulation • Key parameters (Rate, Depth, Wet/Dry mix) • Differences between chorus, flanger, and vibrato • Musical application across guitar, synthesisers, and vocals.",
            "indicative": "• Physics & Circuitry: 15–35ms BBD delay window; LFO Doppler pitch detuning (Rate in Hz, Depth in cents). Combining dry + pitch-shifted wet = acoustic chorus beating.<br>• Comparison: Vibrato is 100% wet pitch modulation (no dry signal). Flanging uses 1-15ms with high feedback comb filtering. Chorus uses 15-35ms with zero/low feedback for smooth doubling.<br>• Dimension D & Stereo Processing: Dual delay lines with inverted LFO phase eliminate perceptible pitch wobbling while maximizing stereo width.<br>• Musical Applications: Kurt Cobain / Nirvana grunge guitars (EHX Small Clone); Andy Summers / The Police crystalline 80s pop tone (JC-120); Roland Juno synth pads; vocal thickening."
        }
    },
    {
        "id": "phaser",
        "title": "Phaser Effect &amp; Phase Shifting",
        "subtitle": "All-Pass Filters, Phase Cancellation &amp; Non-Harmonic Notches",
        "accent": "#0284c7",
        "accent_light": "rgba(2, 132, 199, 0.1)",
        "badge": "Edexcel Component 3 &bull; Modulation Signal Processing",
        "filename": "public/downloads/homework/homework-phaser.html",
        "listening": [
            {"track": "Van Halen &ndash; 'Ain't Talkin' 'Bout Love' (1978)", "gear": "MXR Phase 90 (Script Logo) &bull; Marshall Super Lead", "notes": "Eddie Van Halen's signature chewy, warm, swirling 'Brown Sound' arpeggios created by 4-stage phase shifting before amp overdrive."},
            {"track": "Pink Floyd &ndash; 'Shine On You Crazy Diamond' (1975)", "gear": "MXR Phase 90 &bull; Fender Stratocaster &bull; Hiwatt DR103", "notes": "David Gilmour's iconic 4-note clean guitar theme: lush, rotating liquid phase modulation."},
            {"track": "The Isley Brothers &ndash; 'That Lady (Pts. 1 &amp; 2)' (1973)", "gear": "Maestro PS-1A Phase Shifter &bull; Fuzz Guitar", "notes": "Ernie Isley's screaming fuzz lead: intense, sweeping phase notches slicing through high-harmonic distortion."},
            {"track": "Queen &ndash; 'Sheer Heart Attack' (1977)", "gear": "Eventide Instant Phaser", "notes": "Early studio rack phaser applied to drum overheads and master tracks for dramatic sweeping psychedelic swirl."}
        ],
        "fingerprints": [
            ("All-Pass Filters", "Active RC filter stages that pass all frequencies at equal gain while shifting the phase angle of specific bands."),
            ("Non-Harmonic Notches", "Phase cancellation creates logarithmic, unevenly spaced notches, giving a warm, smooth, vocal-like chew."),
            ("Stage-to-Notch Ratio", "Every pair of all-pass stages produces 1 notch. 4-stage = 2 notches; 8-stage = 4 notches; 12-stage = 6 notches."),
            ("Feedback / Resonance", "Recirculating phased output deepens notches and sharpens peaks, adding an intense whistling resonance."),
            ("Pre vs. Post Distortion", "Placed before distortion produces warm, dynamic, amp-compressed chew; placed after distortion creates harsh, slicing sweep.")
        ],
        "sectionA": [
            {
                "num": "1",
                "q": "Explain how an analog phaser creates phase cancellation notches without utilizing an audio time delay line.",
                "marks": "3",
                "guidance": "Award 1 mark for active all-pass filter stages (operational amplifiers with RC networks). 1 mark for shifting the phase angle of specific frequencies up to 180°. 1 mark for summing the phase-shifted signal with the direct dry signal, creating destructive phase cancellation at out-of-phase frequencies."
            },
            {
                "num": "2",
                "q": "State the key spectral difference between the cancellation notches of a Phaser and the comb filter notches of a Flanger.",
                "marks": "2",
                "guidance": "Award 1 mark for phaser notches being spaced non-harmonically (logarithmically/non-linearly). 1 mark for flanger notches being spaced in a linear harmonic series."
            },
            {
                "num": "3",
                "q": "How many cancellation notches are generated by an 8-stage phaser like the MXR Phase 100?",
                "marks": "2",
                "guidance": "Award 1 mark for stating 4 notches. 1 mark for explaining that each pair of all-pass filter stages generates exactly one cancellation notch."
            },
            {
                "num": "4",
                "q": "Why were matched JFET transistors critical in the analog circuitry of pedals like the MXR Phase 90?",
                "marks": "3",
                "guidance": "Award 1 mark for JFETs acting as voltage-controlled variable resistors in each all-pass stage. 1 mark for LFO voltage modulating resistance to sweep notch frequencies. 1 mark for explaining that unmatched JFETs cause filter stages to sweep unevenly, ruining the smooth phase swirl."
            },
            {
                "num": "5",
                "q": "Describe the sonic difference between placing a phaser BEFORE an overdriven amplifier versus placing it AFTER the amplifier in an effects loop.",
                "marks": "3",
                "guidance": "Award 1 mark for recognizing signal chain placement. 1 mark for before overdrive: warm, subtle, dynamic, chewy tone as the amplifier's tube compression smooths the sweep. 1 mark for after overdrive: bright, dramatic, aggressive sweep filtering the clipped harmonics."
            }
        ],
        "sectionB": {
            "title": "Extended 12-Mark Technical Evaluation Question",
            "prompt": "Evaluate the design, engineering principles, and production applications of the phaser effect. In your answer, refer to: • All-pass filter architecture and phase cancellation • The role of the LFO and feedback controls • Comparison with flanging and wah-wah filtering • Signal routing and landmark guitar recordings (Eddie Van Halen / David Gilmour).",
            "indicative": "• Circuit Engineering: All-pass operational amplifiers shift phase without time delay; each 2 stages yield 1 notch (4-stage Phase 90 = 2 notches; 8-stage Phase 100 = 4 notches). JFETs modulate resistance via LFO.<br>• Spectral Characteristics: Non-harmonic notch spacing produces warm, organic vocal qualities unlike linear comb filtering.<br>• Feedback / Resonance: Recirculating phased signal narrows resonant peaks, adding intensity.<br>• Comparative Analysis: Wah-Wah sweeps a single resonant band-pass boost; Phaser sweeps multiple cancellation troughs across full spectrum; Flanger uses true time delay.<br>• Landmark Tones: Eddie Van Halen's 'Brown Sound' (Phase 90 before Plexi); David Gilmour's Pink Floyd clean arpeggios ('Shine On You Crazy Diamond')."
        }
    },
    {
        "id": "flanger",
        "title": "Flanger Effect &amp; Comb Filtering",
        "subtitle": "Micro-Delays, Harmonically Spaced Comb Notches &amp; Jet Sweeps",
        "accent": "#0284c7",
        "accent_light": "rgba(2, 132, 199, 0.1)",
        "badge": "Edexcel Component 3 &bull; Modulation Signal Processing",
        "filename": "public/downloads/homework/homework-flanger.html",
        "listening": [
            {"track": "Heart &ndash; 'Barracuda' (1977)", "gear": "Analog BBD Flanger &bull; Electric Rhythm Guitar", "notes": "Nancy Wilson's galloping open-E chug: aggressive sweeping comb filter notches creating massive metallic energy."},
            {"track": "The Small Faces &ndash; 'Itchycoo Park' (1967)", "gear": "Synchronized Reel-to-Reel Tape Decks at Olympic Studios", "notes": "First commercial pop record with tape flanging: George Chkiantz pressing his thumb on the tape reel flange to flange drum fills."},
            {"track": "Van Halen &ndash; 'Unchained' (1981)", "gear": "MXR M-117 Flanger &bull; EVH Signature Riff", "notes": "Drop-D tuning processed with deep, resonant jet-plane flanging on opening power chord strums."},
            {"track": "Lenny Kravitz &ndash; 'Are You Gonna Go My Way' (1993)", "gear": "Vintage Tape Flanging / Analog Flanger", "notes": "Retro 70s drum break and master bus flanging swooshing dramatically across the bridge."}
        ],
        "fingerprints": [
            ("1–15ms Micro-Delay", "The ultra-short time window where delayed signal interferes acoustically with direct sound, creating comb filtering."),
            ("Harmonic Comb Series", "Linear series of peaks and troughs occurring at exact odd multiples: f = 1/(2*tau), 3/(2*tau), 5/(2*tau)..."),
            ("Tape Flanging Origin", "Engineers physically pressed their thumb on the flange (outer rim) of a tape supply reel to induce micro-lag."),
            ("Positive vs. Negative Feedback", "Positive feedback reinforces odd harmonics (woody whoosh); negative feedback inverts wet phase, creating hollow metallic tubular bite."),
            ("Haas Precedence Limit", "Delays below 30ms are perceived as timbral alteration; delays above 35ms break into discrete slapback echoes.")
        ],
        "sectionA": [
            {
                "num": "1",
                "q": "State the typical delay time range used by an audio flanger and explain what acoustic phenomenon occurs when it is blended with direct sound.",
                "marks": "3",
                "guidance": "Award 1 mark for 1ms to 15ms. 1 mark for destructive and constructive phase interference. 1 mark for stating that it generates a harmonically related comb filter series across the spectrum."
            },
            {
                "num": "2",
                "q": "Describe the historical recording studio origin that gave 'flanging' its name.",
                "marks": "3",
                "guidance": "Award 1 mark for running two tape machines playing identical audio in synchronization. 1 mark for the engineer physically pressing a finger/thumb onto the metal flange (outer rim) of one tape reel. 1 mark for friction slowing that tape down by milliseconds, creating sweeping phase cancellation."
            },
            {
                "num": "3",
                "q": "State the mathematical formula for the cancellation notch frequencies in a flanger comb filter where delay time is tau (seconds).",
                "marks": "2",
                "guidance": "Award 2 marks for f = (2n + 1) / (2 * tau) or specifying f = 1/(2*tau), 3/(2*tau), 5/(2*tau)... (Award 1 mark for mentioning odd half-wavelength multiples)."
            },
            {
                "num": "4",
                "q": "Explain how high Feedback (Regeneration) produces the iconic 'jet-plane whoosh' associated with flanging.",
                "marks": "3",
                "guidance": "Award 1 mark for recirculating the delayed signal back into the flanger input. 1 mark for resonance building up at the peaks between the comb notches. 1 mark for the LFO sweeping these resonant whistling overtones up and down the spectrum."
            },
            {
                "num": "5",
                "q": "What is 'Through-Zero Flanging' (TZF) and why could it originally only be achieved using tape decks?",
                "marks": "2",
                "guidance": "Award 1 mark for explaining that the delayed signal passes through the zero-point and momentarily leads ahead of the reference signal, resulting in total phase cancellation silence. 1 mark for noting electronic pedals cannot achieve negative time delay."
            }
        ],
        "sectionB": {
            "title": "Extended 12-Mark Technical Evaluation Question",
            "prompt": "Evaluate the acoustic theory, technological development, and musical application of flanging in sound recording. In your answer, refer to: • Tape flanging origins vs. modern analog BBD circuits • Mathematical principles of comb filtering and notch spacing • Positive vs. negative feedback characteristics • Landmark listening examples (The Small Faces / Heart / Van Halen).",
            "indicative": "• Physical Origins: 1960s Abbey Road & Olympic Studios (Ken Townsend / George Chkiantz). Physical finger pressure on tape reel flange slows tape; releasing allows catch up.<br>• Mathematical Comb Filtering: 1–15ms delay creates linear harmonic notches at odd multiples f = (2n+1)/(2*tau). Swept across spectrum by LFO.<br>• Feedback & Polarity: Positive feedback accentuates even harmonics (deep warm jet sweep); Negative feedback inverts wet phase, creating hollow, metallic, tubular bite.<br>• Through-Zero Flanging: Unique tape phenomenon where tapes cross over, causing momentary absolute cancellation silence.<br>• Landmark Recordings: The Small Faces 'Itchycoo Park' (first psychedelic tape flange); Heart 'Barracuda' (galloping rhythm guitar comb filter); Van Halen 'Unchained' (MXR Flanger)."
        }
    }
]

def generate_hw_html(hw):
    listen_rows = "".join([f"""
    <div style="background: #f1f5f9; border-left: 4px solid {hw['accent']}; padding: 14px 18px; border-radius: 8px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 6px;">
        <strong style="color: #0f172a; font-size: 15px;">{item['track']}</strong>
        <span style="color: {hw['accent']}; font-size: 12px; font-weight: 700; background: {hw['accent_light']}; padding: 2px 8px; border-radius: 4px;">{item['gear']}</span>
      </div>
      <p style="margin: 6px 0 0; font-size: 13.5px; color: #475569;">{item['notes']}</p>
    </div>
    """ for item in hw['listening']])

    fp_rows = "".join([f"""
    <tr>
      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0f172a; width: 28%;">{term}</td>
      <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #475569;">{desc}</td>
    </tr>
    """ for term, desc in hw['fingerprints']])

    secA_rows = "".join([f"""
    <div style="margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px dashed #cbd5e1;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
        <strong style="color: #0f172a; font-size: 15px;">Question {q['num']}</strong>
        <span style="background: #e2e8f0; color: #0f172a; font-size: 12px; font-weight: 800; padding: 2px 8px; border-radius: 4px;">[{q['marks']} MARKS]</span>
      </div>
      <p style="margin: 0 0 12px; font-size: 14px; color: #1e293b; font-weight: 500;">{q['q']}</p>
      
      <!-- Mark Scheme Box -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 3px solid #10b981; border-radius: 6px; padding: 10px 14px; font-size: 12.5px; color: #334155;">
        <strong style="color: #059669; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Examiner Mark Scheme &bull; Guidance:</strong>
        {q['guidance']}
      </div>
    </div>
    """ for q in hw['sectionA']])

    secB = hw['sectionB']

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component 3 Homework Pack • {hw['title']} | Music Tech Guru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {{
      --accent: {hw['accent']};
      --bg: #f8fafc;
      --card: #ffffff;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }}

    * {{ box-sizing: border-box; }}

    body {{
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
      margin: 0;
      padding: 24px;
      -webkit-font-smoothing: antialiased;
    }}

    .container {{
      max-width: 900px;
      margin: 0 auto;
      background: var(--card);
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      padding: 40px;
    }}

    .header-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 20px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }}

    .header-title h1 {{
      font-size: 26px;
      font-weight: 800;
      margin: 0 0 6px 0;
      color: #0f172a;
    }}

    .header-title p {{
      margin: 0;
      color: var(--text-muted);
      font-size: 14px;
    }}

    .tag-badge {{
      display: inline-block;
      background: {hw['accent_light']};
      color: var(--accent);
      border: 1px solid var(--accent);
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 4px 12px;
      border-radius: 6px;
      margin-bottom: 8px;
    }}

    .print-btn {{
      background: #0f172a;
      color: #ffffff;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }}

    .print-btn:hover {{
      background: #1e293b;
    }}

    .section-title {{
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
      margin: 32px 0 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .section-title span {{
      color: var(--accent);
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 13.5px;
      margin-bottom: 24px;
    }}

    th {{
      background: #f1f5f9;
      text-align: left;
      padding: 10px 14px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #cbd5e1;
    }}

    .student-fields {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
      background: #f8fafc;
      padding: 14px 18px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      margin-bottom: 24px;
      font-size: 13px;
    }}

    .student-fields strong {{
      color: #475569;
    }}

    @media print {{
      body {{ background: #fff; padding: 0; }}
      .container {{ border: none; box-shadow: none; padding: 10px; max-width: 100%; }}
      .print-btn {{ display: none; }}
      .section-title {{ page-break-after: avoid; }}
    }}
  </style>
</head>
<body>

  <div class="container">
    <div class="header-bar">
      <div class="header-title">
        <div class="tag-badge">{hw['badge']}</div>
        <h1>{hw['title']}</h1>
        <p>{hw['subtitle']}</p>
      </div>
      <div>
        <button class="print-btn" onclick="window.print()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print / Save PDF
        </button>
      </div>
    </div>

    <div class="student-fields">
      <div><strong>Student Name:</strong> ______________________</div>
      <div><strong>Date:</strong> ______________________</div>
      <div><strong>Teacher / Grade:</strong> _______ / 25 Marks</div>
    </div>

    <!-- 1. LANDMARK LISTENING CASE STUDIES -->
    <div class="section-title"><span>01</span> Landmark Audio Case Studies</div>
    <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 16px;">
      Listen critically to the benchmark recordings below on headphones. Identify the specific effects hardware, signal routing, and sonic artifacts that define each production.
    </p>
    {listen_rows}

    <!-- 2. TECHNICAL SPECIFICATION CHECKLIST -->
    <div class="section-title"><span>02</span> Technical Parameter &amp; Circuit Architecture</div>
    <table>
      <thead>
        <tr>
          <th>Specification Parameter</th>
          <th>Engineering Description &bull; Exam Definition</th>
        </tr>
      </thead>
      <tbody>
        {fp_rows}
      </tbody>
    </table>

    <!-- 3. SECTION A: EXAM PRACTICE QUESTIONS -->
    <div class="section-title"><span>03</span> Section A: Specification Exam Questions (13 Marks)</div>
    <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 16px;">
      Answer all questions in the spaces provided. Complete mark schemes and examiner guidance are included for self-assessment and peer marking.
    </p>
    {secA_rows}

    <!-- 4. SECTION B: 12-MARK ESSAY -->
    <div class="section-title"><span>04</span> Section B: Extended Evaluation Essay (12 Marks)</div>
    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 8px; font-size: 16px; color: #0f172a;">{secB['title']}</h3>
      <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 14px;">{secB['prompt']}</p>
      
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 3px solid var(--accent); padding: 12px 16px; border-radius: 6px; font-size: 13px; color: #334155; line-height: 1.6;">
        <strong style="color: var(--accent); text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Indicative Content &bull; Examiner Commentary:</strong>
        {secB['indicative']}
      </div>
    </div>

    <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 18px; font-size: 12px; color: var(--text-muted);">
      Pearson Edexcel A-Level Music Technology &bull; Component 3 (Music Technology in Context) Revision Resource &bull; Music Tech Guru
    </div>
  </div>

</body>
</html>
"""

def main():
    print("Generating 5 Pearson Edexcel Component 3 Homework & Exam Packs...")
    os.makedirs("public/downloads/homework", exist_ok=True)
    os.makedirs("dist/downloads/homework", exist_ok=True)
    
    for hw in HOMEWORK_DATA:
        html = generate_hw_html(hw)
        with open(hw["filename"], "w", encoding="utf-8") as f:
            f.write(html)
        dist_path = os.path.join("dist/downloads/homework", os.path.basename(hw["filename"]))
        with open(dist_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Generated {hw['filename']} ({len(html)} bytes)")

if __name__ == "__main__":
    main()
