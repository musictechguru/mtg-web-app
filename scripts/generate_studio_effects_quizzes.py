#!/usr/bin/env python3
"""
generate_studio_effects_quizzes.py
Generates 5 dedicated, classroom-ready Pearson Edexcel Component 3 interactive quizzes:
1. public/delay-interactive-quiz.html
2. public/reverb-interactive-quiz.html
3. public/chorus-interactive-quiz.html
4. public/phaser-interactive-quiz.html
5. public/flanger-interactive-quiz.html
"""

import os
import json

QUIZZES = [
    {
        "id": "delay",
        "title": "Delay &amp; Echo Effects",
        "badge": "Edexcel Component 3 &bull; Time-Based Processing",
        "accent": "#00C1F0",
        "accent_glow": "rgba(0, 193, 240, 0.35)",
        "icon": "🔁",
        "filename": "public/delay-interactive-quiz.html",
        "questions": [
            {
                "q": "What primary technology was used at Sun Records in the 1950s to create the signature slapback echo on Elvis Presley's vocal tracks?",
                "options": [
                    "An analog BBD solid-state delay pedal",
                    "A reel-to-reel tape machine utilizing the physical gap between record and playback heads",
                    "An EMT 140 suspended steel plate with pickup coils",
                    "A digital DSP processor synced to project MIDI clock"
                ],
                "correct": 1,
                "expl": "Sam Phillips pioneered slapback delay at Sun Studio using two reel-to-reel tape decks. The physical distance between the record and playback head at 15 ips produced a single discrete repeat between 75ms and 130ms with zero feedback."
            },
            {
                "q": "In a project with a tempo of 120 BPM, what is the exact delay time in milliseconds required to generate a dotted-eighth note repeat?",
                "options": [
                    "250 ms",
                    "375 ms",
                    "500 ms",
                    "750 ms"
                ],
                "correct": 1,
                "expl": "At 120 BPM, a quarter note is (60,000 / 120) = 500ms. An eighth note is 250ms. A dotted-eighth note is equal to three sixteenth notes (1.5 x eighth note), so: 250ms x 1.5 = 375ms (or 500ms x 0.75 = 375ms)."
            },
            {
                "q": "What occurs when the Feedback (Regeneration) control on an analog delay unit is turned past 100%?",
                "options": [
                    "The delayed repeats drop in pitch by one octave",
                    "The delay time automatically halves",
                    "The signal enters runaway self-oscillation, creating an escalating saturated wall of sound",
                    "The digital converter mutes the channel to prevent digital clipping"
                ],
                "correct": 2,
                "expl": "Feedback controls the amount of output returned to the input. Setting feedback to 100% or above feeds back more energy than is lost, forcing the analog circuit into runaway self-oscillation and non-linear harmonic saturation."
            },
            {
                "q": "How does an analog Bucket Brigade Device (BBD) delay line store and delay an audio signal without magnetic tape?",
                "options": [
                    "By digitizing the audio into 16-bit binary samples in flash memory",
                    "By passing analog electrical charge packets across a chain of microscopic capacitors clocked by an oscillator",
                    "By reflecting sound waves inside an oil-filled cylindrical metal canister",
                    "By phase-shifting frequencies through active all-pass RC filters"
                ],
                "correct": 1,
                "expl": "BBD chips (like the Panasonic MN3005/MN3007) function like a human firefighting bucket line: analog voltage charges are passed from one capacitor to the next at each clock pulse, introducing delay without moving mechanical parts."
            },
            {
                "q": "What is the primary acoustic purpose of applying High-Frequency Damping inside a delay feedback loop?",
                "options": [
                    "To eliminate bass frequencies and stop the kick drum from echoing",
                    "To progressively filter out treble on each repeat, mimicking natural air dissipation and keeping the dry vocal intelligible",
                    "To invert the phase of every second repeat for pseudo-stereo widening",
                    "To shorten the delay time dynamically as the vocalist gets louder"
                ],
                "correct": 1,
                "expl": "In physical acoustic spaces, high frequencies are absorbed by air and room surfaces much faster than low frequencies. High damping filters successive repeats, preventing bright high-frequency clutter from competing with the lead vocal."
            },
            {
                "q": "Which mechanical factors cause the characteristic warmth and subtle pitch modulation in vintage tape echo units (e.g., Roland Space Echo RE-201)?",
                "options": [
                    "Clock jitter in the analog-to-digital converter",
                    "Motor speed fluctuations, pinch roller friction, and tape stretching known as wow and flutter",
                    "Resonant notches caused by all-pass phase cancellation",
                    "Quantization distortion from 8-bit resolution"
                ],
                "correct": 1,
                "expl": "Because magnetic tape is physically pulled past heads by mechanical motors and rubber rollers, microscopic speed variations occur continuously. These slow (wow) and fast (flutter) speed fluctuations modulate delay time, producing musical pitch chorus warmth."
            },
            {
                "q": "Why is it standard studio practice to route delay as a parallel Auxiliary Send / Return rather than an inline Channel Insert?",
                "options": [
                    "Because delay units cannot accept line-level audio signals",
                    "To allow multiple channels to share a single delay unit, keeping dry signals uncolored while controlling the wet return level",
                    "Because channel inserts automatically force the delay to 100% wet mix",
                    "To eliminate the need for feedback parameter adjustment"
                ],
                "correct": 1,
                "expl": "Auxiliary send routing preserves 100% of the original track's transient punch and clarity on its channel strip, while sending variable amounts to a shared delay bus (set to 100% wet), which saves DSP and creates cohesive mix depth."
            },
            {
                "q": "What is the defining operational feature of a stereo Ping-Pong delay?",
                "options": [
                    "Repeats are pitch-shifted up by a major third on every bounce",
                    "Repeats alternate consecutively between the hard left and hard right stereo channels",
                    "The delay time dynamically tracks the tempo of the drummer's hi-hat",
                    "Repeats are filtered alternately with high-pass and low-pass curves"
                ],
                "correct": 1,
                "expl": "In a ping-pong delay, delayed repeats are fed back cross-wise into opposite channels, bouncing back and forth across the stereo spectrum (Left &rarr; Right &rarr; Left &rarr; Right), creating wide spatial movement."
            },
            {
                "q": "How does a Multi-Tap delay differ from a conventional single delay line?",
                "options": [
                    "It uses multiple physical tape loops running at different motor speeds simultaneously",
                    "A single delay line has multiple pickup 'taps' that output repeats at distinct rhythmic subdivisions and pan positions",
                    "It requires the user to tap the tempo footswitch multiple times per measure",
                    "It converts delay repeats into synthesizer MIDI notes"
                ],
                "correct": 1,
                "expl": "Multi-tap delays allow multiple output points along a single delay buffer. Each 'tap' can have its own independent volume, time offset, filter cutoff, and stereo pan position, enabling complex rhythmic polyrhythms from a single dry note."
            },
            {
                "q": "In modern vocal and pop production, how does a Ducking Delay operate?",
                "options": [
                    "It applies a high-frequency band-pass filter to make vocals sound like a telephone",
                    "A sidechained compressor attenuates the delay level while the lead vocal is singing, allowing repeats to swell up during pauses",
                    "It randomly modulates delay time to create tape flanging",
                    "It gates all audio below a -40 dBFS noise threshold"
                ],
                "correct": 1,
                "expl": "Ducking delay uses a sidechain compressor keyed to the lead vocal. While the artist sings, the delay volume is ducked by 6–12 dB to prevent muddying lyrical intelligibility. The moment the vocal pauses, the delay blooms to fill the empty space."
            }
        ]
    },
    {
        "id": "reverb",
        "title": "Reverb Effects &amp; Acoustic Space",
        "badge": "Edexcel Component 3 &bull; Spatial &amp; Acoustic Processing",
        "accent": "#38bdf8",
        "accent_glow": "rgba(56, 189, 248, 0.35)",
        "icon": "🏛️",
        "filename": "public/reverb-interactive-quiz.html",
        "questions": [
            {
                "q": "In architectural acoustics and audio engineering, how is RT60 precisely defined?",
                "options": [
                    "The time in milliseconds for the first 60 early reflections to reach the listener",
                    "The time in seconds required for sound reflections to decay by 60 dB below the direct sound level",
                    "The maximum room volume in cubic meters before acoustic resonance occurs",
                    "The frequency threshold where low-end room modes begin to resonate"
                ],
                "correct": 1,
                "expl": "RT60 (Reverberation Time 60 dB), established by Wallace Clement Sabine, is the standard scientific measurement of reverb decay time: the duration required for the sound pressure level of an acoustic space to drop by 60 decibels after the sound source stops."
            },
            {
                "q": "What is the primary acoustic and mix benefit of increasing the Pre-Delay parameter on a vocal reverb?",
                "options": [
                    "It extends the overall RT60 tail by several seconds",
                    "It inserts a time gap before reflections begin, preserving upfront vocal articulation and intelligibility before the reverb wash",
                    "It filters out sub-bass frequencies below 100 Hz to prevent low-end mud",
                    "It pans the reverb reflections to opposite sides of the stereo field"
                ],
                "correct": 1,
                "expl": "Pre-delay creates a time buffer (typically 15ms to 60ms) between the direct dry vocal transient and the onset of early reflections. This psychoacoustically simulates a large room, keeping the lead vocal clear, intimate, and upfront."
            },
            {
                "q": "How does an EMT 140 Plate Reverb mechanically generate artificial reverberation?",
                "options": [
                    "By driving sound through coiled steel springs suspended in an oil bath",
                    "By exciting a large 1x2 meter cold-rolled steel plate with an electromagnetic transducer, captured by contact pickups",
                    "By bouncing sound between two parallel quartz glass plates inside a vacuum tube",
                    "By playing audio through a horn speaker into a tiled underground bunker"
                ],
                "correct": 1,
                "expl": "Invented by Elektro-Mess-Technik in 1957, the EMT 140 suspended a 600lb, 1x2m steel sheet inside a heavy frame. An electromagnetic driver vibrated the plate, and contact pickups captured the dense dispersion of transverse bending waves."
            },
            {
                "q": "Why does Spring Reverb possess a distinctively 'twangy' and bright fluttering sound characteristic of surf rock and guitar combos?",
                "options": [
                    "Because springs completely eliminate high frequencies above 2 kHz",
                    "Because high frequencies travel along coiled steel springs slower than low frequencies, causing dispersion and mechanical flutter",
                    "Because the spring tank is powered by high-voltage vacuum tube rectifiers",
                    "Because the signal is multiplied by an LFO pitch oscillator"
                ],
                "correct": 1,
                "expl": "In a spring tank, audio vibrations travel along tightly coiled steel wires. Higher frequencies exhibit frequency-dependent dispersion, arriving with a micro-time lag and fluttering mechanical resonance known as the spring 'boing' or 'twang'."
            },
            {
                "q": "What is the exact signal processing routing required to create the iconic 1980s Gated Reverb drum sound (e.g., Phil Collins' 'In The Air Tonight')?",
                "options": [
                    "Snare Drum &rarr; Low-pass filter &rarr; Tape delay &rarr; Stereo chorus",
                    "Snare Drum &rarr; Huge ambient room/plate reverb &rarr; Heavy compression &rarr; Noise gate with fast release",
                    "Snare Drum &rarr; 4-stage phaser &rarr; Spring reverb tank &rarr; Limiter",
                    "Snare Drum &rarr; BBD delay &rarr; Flanger &rarr; Direct-to-mono bus"
                ],
                "correct": 1,
                "expl": "Originating in the stone live room at London's Townhouse Studios via an SSL 4000 console's listen mic compressor, the snare was fed into a massive room or non-linear plate, heavily compressed, and then truncated abruptly by an aggressive noise gate."
            },
            {
                "q": "How does a Convolution Reverb recreate the acoustic signature of a specific physical space (e.g., Sydney Opera House)?",
                "options": [
                    "By generating randomized mathematical delay algorithms using digital feedback networks",
                    "By convolving the incoming audio with an Impulse Response (IR)—a high-resolution recording of the room's reaction to a transient impulse",
                    "By filtering the track through 12 cascaded all-pass phase stages",
                    "By modeling the physical thermal temperature of the air using analog circuits"
                ],
                "correct": 1,
                "expl": "Convolution reverb uses digital signal processing (Fast Fourier Transform multiplication) to merge input audio with an Impulse Response (IR). The IR is recorded in the real room by firing a starter pistol, sine sweep, or acoustic transient."
            },
            {
                "q": "What is the famous 'Abbey Road Reverb EQ' technique and why is it applied to reverb send buses?",
                "options": [
                    "Boosting 3 kHz and 10 kHz by +6 dB to make vocals sound airy and modern",
                    "High-passing at approx 600 Hz and low-passing at approx 10 kHz to prevent low-end mud and harsh sibilance in the reverb tail",
                    "Applying a steep notch filter at 1 kHz to cancel out guitar resonance",
                    "Summing all reverb frequencies below 200 Hz to mono while keeping highs stereo"
                ],
                "correct": 1,
                "expl": "Abbey Road engineers filtered sends to EMT 140 plates with a high-pass filter around 500-600 Hz (eliminating low-end boom and mud) and a low-pass filter around 10 kHz (preventing harsh vocal sibilance 'ess' sounds from splashing in the plate)."
            },
            {
                "q": "What acoustic information is conveyed to human hearing by Early Reflections, and how do they differ from the Late Reverb Tail?",
                "options": [
                    "Early reflections convey room dimensions and boundary proximity; the late tail provides a diffuse, dense exponential decay",
                    "Early reflections contain no high frequencies, while the late tail contains only treble",
                    "Early reflections occur only after 500ms of silence",
                    "Early reflections are created by contact pickups, while the tail is generated by speakers"
                ],
                "correct": 0,
                "expl": "Early reflections are the first discrete acoustic bounces from the nearest floor, walls, and ceiling (0–30ms), allowing the brain to calculate room dimensions. The late tail is an unrecognizable cloud of millions of overlapping reflections."
            },
            {
                "q": "On a digital algorithmic reverb, what sonic change occurs when you increase the Diffusion parameter?",
                "options": [
                    "The pre-delay gap increases in length",
                    "The density of early reflections increases, smoothing out distinct echoes into a silky, continuous wash",
                    "The reverb tail is converted from stereo into mono",
                    "High frequencies are attenuated faster than low frequencies"
                ],
                "correct": 1,
                "expl": "Low diffusion keeps individual reflection taps sparse, discrete, and grainier (ideal for percussive instruments where clarity is desired). High diffusion packs reflections tightly together, turning echoes into an ethereal, seamless cloud."
            },
            {
                "q": "What is an Acoustic Echo Chamber in recording studio history?",
                "options": [
                    "A wooden box filled with sand placed over a guitar cabinet",
                    "A specially constructed subterranean room with hard, highly reflective surfaces (tiles/plaster), equipped with a speaker and microphones",
                    "An acoustic guitar body miked from the inside using a lavalier microphone",
                    "A digital synthesizer patch that emulates stadium acoustics"
                ],
                "correct": 1,
                "expl": "Pioneered by Bill Putnam at Universal Recording and perfected at Capitol and Abbey Road, acoustic chambers were dedicated tiled basement rooms. A studio feed was played into the chamber via a monitor speaker and recaptured by stereo condenser mics."
            }
        ]
    },
    {
        "id": "chorus",
        "title": "Chorus Modulation &amp; Stereo Width",
        "badge": "Edexcel Component 3 &bull; Modulation Processing",
        "accent": "#818cf8",
        "accent_glow": "rgba(129, 140, 248, 0.35)",
        "icon": "🌊",
        "filename": "public/chorus-interactive-quiz.html",
        "questions": [
            {
                "q": "What is the typical time delay range employed in an analog BBD chorus circuit?",
                "options": [
                    "0.1 ms to 0.8 ms",
                    "1 ms to 10 ms",
                    "15 ms to 35 ms",
                    "100 ms to 350 ms"
                ],
                "correct": 2,
                "expl": "The chorus effect operates in the 15ms to 35ms delay zone. Below 15ms, the ear perceives comb filtering (flanging); above 35ms, the ear separates the repeats as distinct slapback echoes. 15–35ms creates natural Haas doubling."
            },
            {
                "q": "What physical phenomenon does an electronic chorus effect simulate?",
                "options": [
                    "The resonant acoustic standing waves inside an organ pipe",
                    "Multiple vocalists or instrumentalists performing the same part in unison with natural micro-timing and pitch fluctuations",
                    "The Doppler effect of an ambulance siren passing by a stationary listener at high speed",
                    "The electromagnetic induction of a vibrating steel guitar string"
                ],
                "correct": 1,
                "expl": "When a choir or string ensemble plays in unison, no two performers ever play with 100% identical pitch or timing. These micro-discrepancies create natural acoustic phase beating and richness that chorus pedals replicate electronically."
            },
            {
                "q": "How does modulating a delay line with a Low-Frequency Oscillator (LFO) produce pitch detuning in a chorus effect?",
                "options": [
                    "By passing the signal through a digital harmonizer chip set to +12 cents",
                    "By continuously speeding up and slowing down delay clock time, generating Doppler pitch shifts (sharp as delay shortens, flat as delay lengthens)",
                    "By boosting high midrange frequencies with a parametric bell curve",
                    "By altering the input voltage to the amplifier's power transformer"
                ],
                "correct": 1,
                "expl": "Modulating the delay clock with an LFO causes the delay time to vary continuously. By the Doppler effect, shrinking delay time compresses waveforms (pitch shifts sharp); expanding delay time stretches waveforms (pitch shifts flat)."
            },
            {
                "q": "What made the 1979 Roland Dimension D (SDD-320) studio rack unit legendary compared to standard chorus pedals?",
                "options": [
                    "It generated aggressive jet-plane feedback sweeps using extreme regeneration",
                    "It used dual cross-mixed delay lines with opposite LFO phases, creating dimensional stereo width with virtually zero audible pitch wobbling",
                    "It was the first digital reverb processor with 24-bit resolution",
                    "It was strictly a mono distortion unit for rock vocals"
                ],
                "correct": 1,
                "expl": "The Dimension D used a dual-delay BBD architecture where phase-inverted modulated signals canceled out obvious pitch vibrato, leaving behind pure psychoacoustic stereo width, air, and dimension without noticeable chorus warble."
            },
            {
                "q": "How does the classic Roland JC-120 (Jazz Chorus) amplifier generate true spatial chorus in physical room air?",
                "options": [
                    "By rotating two mechanical speaker horns inside a wooden cabinet",
                    "By feeding the dry signal to one speaker driver and the pitch-vibrato signal to the second speaker driver, allowing acoustic mixing in the air",
                    "By applying a digital convolution impulse response to both 12-inch drivers",
                    "By using all-pass filter stages wired in series with the preamp tubes"
                ],
                "correct": 1,
                "expl": "The JC-120 has dual 60W power amps and two 12-inch speakers. In chorus mode, one speaker plays the dry unmodulated guitar, while the other speaker plays the pitch-modulated wet signal. The chorus interaction occurs organically in the room air."
            },
            {
                "q": "On a chorus processor, what exact parameter does the Depth control govern?",
                "options": [
                    "The overall RT60 reverberation decay time",
                    "The width or intensity of the pitch deviation (how far sharp and flat the signal detunes in cents)",
                    "The number of repeats in the feedback regeneration loop",
                    "The low-pass filter cutoff frequency of the dry channel"
                ],
                "correct": 1,
                "expl": "Depth (or Width) dictates the modulation amplitude of the LFO. High depth produces deep, dramatic pitch wobbling (seasick detuning); low depth produces subtle, elegant acoustic thickening."
            },
            {
                "q": "Why does a chorus effect sound lush and shimmering rather than harsh and metallic like a flanger?",
                "options": [
                    "Because chorus operates with a longer delay time (15–35ms) and avoids high feedback loops that produce resonant comb filter peaks",
                    "Because chorus eliminates all low frequencies below 500 Hz",
                    "Because chorus only operates on monophonic audio signals",
                    "Because chorus pedals use optical photocells instead of capacitor chips"
                ],
                "correct": 0,
                "expl": "Flangers use ultra-short delays (1–15ms) with high feedback, causing deep, harmonically related comb filtering (metallic resonance). Chorus uses longer delays (15–35ms) where individual comb notches blur together into smooth pitch movement."
            },
            {
                "q": "Which iconic guitar track prominently features Kurt Cobain's Electro-Harmonix Small Clone analog chorus pedal?",
                "options": [
                    "The Beatles &ndash; 'Strawberry Fields Forever'",
                    "Nirvana &ndash; 'Come As You Are'",
                    "Led Zeppelin &ndash; 'Whole Lotta Love'",
                    "Pink Floyd &ndash; 'Money'"
                ],
                "correct": 1,
                "expl": "Kurt Cobain plugged his Fender Jaguar into an Electro-Harmonix Small Clone analog chorus pedal for the famous clean, watery intro riff of 'Come As You Are' on Nevermind (1991), engineered by Butch Vig."
            },
            {
                "q": "Why did vintage polyphonic synthesizers like the Roland Juno-6 and Juno-106 include built-in analog chorus circuits?",
                "options": [
                    "To prevent the synthesizer from overloading mixing console inputs",
                    "To thicken the sound of their single DCO (Digitally Controlled Oscillator) per voice, turning thin waves into massive, lush stereo ensembles",
                    "To tune the synthesizer automatically to concert pitch A440",
                    "To replace the need for an external amplifier cabinet"
                ],
                "correct": 1,
                "expl": "To keep manufacturing costs low, the Juno series provided only one oscillator per voice. To prevent the synth from sounding thin, Roland built in a lush MN3009 BBD stereo chorus (Modes I and II) that transformed single saws into massive brass and string pads."
            },
            {
                "q": "What potential mix hazard occurs if an aggressive stereo chorus with inverted phase on the sides is played back on a mono speaker (e.g. mobile phone)?",
                "options": [
                    "The overall track tempo will fluctuate noticeably",
                    "Destructive phase interference causes the chorused tracks to cancel out or become thin and distant",
                    "The audio file will clip and distort digitally at 0 dBFS",
                    "The delay time will double automatically"
                ],
                "correct": 1,
                "expl": "If stereo widening is created by inverting the phase of the wet chorus on the right channel ($L + R$), summing the stereo channels to mono causes the opposing wet waveforms to cancel each other out ($+1 + -1 = 0$), losing presence."
            }
        ]
    },
    {
        "id": "phaser",
        "title": "Phaser Effect &amp; All-Pass Filters",
        "badge": "Edexcel Component 3 &bull; Modulation Processing",
        "accent": "#a855f7",
        "accent_glow": "rgba(168, 85, 247, 0.35)",
        "icon": "🌀",
        "filename": "public/phaser-interactive-quiz.html",
        "questions": [
            {
                "q": "How does an analog Phaser pedal create frequency cancellation notches without using an audio delay line?",
                "options": [
                    "By passing the signal through a physical spring tank",
                    "By cascading active all-pass filter stages that introduce frequency-dependent phase shifts",
                    "By playing two tape decks at slightly different motor speeds",
                    "By converting the audio into frequency sub-bands with an FFT processor"
                ],
                "correct": 1,
                "expl": "Phasers do not use time delay lines. Instead, they use operational amplifiers configured as all-pass filters. All frequencies pass through at equal volume, but specific frequencies have their phase angle shifted. Mixing this with dry audio creates cancellation notches."
            },
            {
                "q": "What is the critical acoustic difference between the notches created by a Phaser and those created by a Flanger?",
                "options": [
                    "Phaser notches are spaced non-harmonically (logarithmically), while flanger comb notches are spaced in a linear harmonic series",
                    "Phaser notches only occur in the bass register below 200 Hz",
                    "Flanger notches are always static and cannot be swept by an LFO",
                    "Phasers produce infinite notches across all frequencies simultaneously"
                ],
                "correct": 0,
                "expl": "Because flanging uses a true time delay, its comb filter notches fall at exact mathematical integer multiples ($f, 3f, 5f...$). Phasers use electronic RC networks whose phase shift varies non-linearly with frequency, producing non-harmonically spaced, warmer notches."
            },
            {
                "q": "How many sweeping cancellation notches are generated by a classic 4-stage phaser circuit like the MXR Phase 90?",
                "options": [
                    "1 notch",
                    "2 notches",
                    "4 notches",
                    "8 notches"
                ],
                "correct": 1,
                "expl": "In an analog all-pass phaser, each pair of all-pass filter stages introduces up to 180° of phase shift, creating one cancellation notch when blended with the dry signal. Therefore, a 4-stage phaser generates 2 notches; an 8-stage generates 4 notches."
            },
            {
                "q": "What sonic effect does increasing the Feedback (or Resonance) control produce on a phaser pedal?",
                "options": [
                    "It delays the audio by an additional 50 milliseconds",
                    "It deepens the cancellation notches and sharpens the resonant peaks between them, creating a more intense, vocal, chewy sweep",
                    "It converts the phaser effect into a digital pitch vibrato",
                    "It completely silences the dry audio path"
                ],
                "correct": 1,
                "expl": "Routing a portion of the phase-shifted output back into the first all-pass stage introduces resonance at the boundary frequencies. This narrows and sharpens the peaks between the notches, giving the phaser an aggressive, cutting, liquid chewiness."
            },
            {
                "q": "Which guitar legend famously placed an MXR Phase 90 pedal before an overdriven Marshall Super Lead amplifier on tracks like 'Ain't Talkin' 'Bout Love'?",
                "options": [
                    "Jimmy Page",
                    "Eddie Van Halen",
                    "David Gilmour",
                    "The Edge"
                ],
                "correct": 1,
                "expl": "Eddie Van Halen used a script-logo MXR Phase 90 pedal set to a slow sweep rate on his debut 1978 album. Placing the phaser before his dimed Marshall Plexi created the signature harmonically saturated, swirling 'Brown Sound' texture."
            },
            {
                "q": "What is the primary function of the Low-Frequency Oscillator (LFO) within an analog phaser circuit?",
                "options": [
                    "To generate audible sub-bass tones under the guitar signal",
                    "To sweep the control voltage feeding variable resistors (JFETs), continuously moving the notch center frequencies up and down the spectrum",
                    "To sync the phaser's internal clock to SMPTE timecode",
                    "To convert the input signal from high impedance to low impedance"
                ],
                "correct": 1,
                "expl": "The LFO outputs an inaudible sub-audio cyclic voltage (typically 0.1 Hz to 10 Hz) that modulates the internal resistance of JFET transistors or photocells in each filter stage, causing the cancellation notches to sweep smoothly across frequencies."
            },
            {
                "q": "How does a Phaser fundamentally differ from a standard Wah-Wah pedal?",
                "options": [
                    "A Wah-Wah sweeps a single resonant band-pass filter peak, whereas a phaser sweeps multiple phase cancellation notches across the spectrum",
                    "A Wah-Wah is a digital time-delay effect, while a phaser is purely acoustic",
                    "A Wah-Wah requires dual tape heads, while a phaser uses an endless magnetic loop",
                    "A phaser can only be adjusted with an expression pedal"
                ],
                "correct": 0,
                "expl": "A Wah-Wah pedal uses an inductor-capacitor circuit to sweep a single resonant peak (boosting a specific frequency band like a vocal formant). A phaser leaves the entire frequency spectrum intact while carving out multiple sweeping cancellation troughs."
            },
            {
                "q": "Which landmark 1975 Pink Floyd track prominently features an MXR Phase 90 on David Gilmour's clean four-note guitar arpeggio?",
                "options": [
                    "'Comfortably Numb'",
                    "'Shine On You Crazy Diamond'",
                    "'Another Brick In The Wall (Part 2)'",
                    "'Time'"
                ],
                "correct": 1,
                "expl": "David Gilmour's haunting four-note Syd Barrett theme on 'Shine On You Crazy Diamond' (Wish You Were Here, 1975) was played on a Fender Stratocaster routed through an MXR Phase 90 and a Hiwatt DR103 amplifier."
            },
            {
                "q": "Why were matched JFETs (Junction Field Effect Transistors) traditionally critical in the manufacturing of classic analog phasers?",
                "options": [
                    "They amplify the signal by +20 dB without generating heat",
                    "They behave as variable resistors whose resistance changes with gate voltage, requiring identical matching so all filter stages sweep in unison",
                    "They prevent the phaser from drawing too much battery current",
                    "They convert unbalanced guitar signals into balanced XLR microphone levels"
                ],
                "correct": 1,
                "expl": "Each all-pass stage relies on a resistance-capacitance (RC) network to determine phase shift frequency. If the JFET variable resistors are not closely matched in their voltage-to-resistance response, the notches will track erratically and destroy the smooth swirl."
            },
            {
                "q": "What sonic difference occurs when a phaser pedal is placed BEFORE distortion versus AFTER distortion in a guitar signal path?",
                "options": [
                    "Before distortion yields a warm, subtle, dynamic vocal chew; after distortion yields a bright, dramatic, slicing sweep that dominates the tone",
                    "Before distortion causes tape flanging; after distortion causes slapback echo",
                    "Placing it after distortion causes runaway self-oscillation that mutes the amplifier",
                    "There is zero measurable or audible difference between before and after distortion"
                ],
                "correct": 0,
                "expl": "Placing a phaser before distortion modulates the clean guitar dynamics before clipping, resulting in rich, warm harmonic bloom as the amp compresses the sweep. Placing it after distortion filters the already heavily clipped harmonics with dramatic, sharp intensity."
            }
        ]
    },
    {
        "id": "flanger",
        "title": "Flanger Effect &amp; Comb Filtering",
        "badge": "Edexcel Component 3 &bull; Modulation Processing",
        "accent": "#ec4899",
        "accent_glow": "rgba(236, 72, 153, 0.35)",
        "icon": "✈️",
        "filename": "public/flanger-interactive-quiz.html",
        "questions": [
            {
                "q": "What is the typical time delay range characteristic of an audio Flanger effect?",
                "options": [
                    "0.01 ms to 0.1 ms",
                    "1 ms to 15 ms",
                    "20 ms to 50 ms",
                    "100 ms to 500 ms"
                ],
                "correct": 1,
                "expl": "Flanging requires an ultra-short micro delay between 1ms and 15ms. In this time window, the direct sound and delayed sound combine acoustically, creating a series of deep phase cancellations without being perceived as separate echoes."
            },
            {
                "q": "What is the name of the distinct frequency response pattern produced across the audio spectrum by a flanger?",
                "options": [
                    "High-pass shelf filter",
                    "Comb filter",
                    "All-pass phase ladder",
                    "Parametric notch bell"
                ],
                "correct": 1,
                "expl": "Summing an audio signal with an identical copy delayed by milliseconds creates destructive cancellation at frequencies where the signals are 180° out of phase. The alternating peaks and troughs visually resemble the teeth of a hair comb, hence 'comb filter'."
            },
            {
                "q": "Why is the effect called 'Flanging' in recording studio history?",
                "options": [
                    "It was named after sound engineer John Flange at Olympic Studios",
                    "Engineers physically pressed their thumb against the metal flange (outer rim) of a tape supply reel to temporarily delay it by milliseconds",
                    "It references the metal flange bracket on an electric guitar bridge",
                    "It refers to the flanged shape of an exponential acoustic speaker horn"
                ],
                "correct": 1,
                "expl": "In 1960s studios, two identical tape recordings were played in synchronization on separate tape machines. By pressing a finger or thumb on the rim (flange) of one tape reel, the engineer slowed it down by fractions of a second, producing the sweeping phase cancellation."
            },
            {
                "q": "Which 1967 British psychedelic rock song by The Small Faces was the first commercial pop record to prominently showcase tape flanging on the drums and master track?",
                "options": [
                    "'A Day in the Life'",
                    "'Itchycoo Park'",
                    "'See Emily Play'",
                    "'Purple Haze'"
                ],
                "correct": 1,
                "expl": "Engineered by George Chkiantz at Olympic Studios in London, The Small Faces' 'Itchycoo Park' (1967) featured sweeping tape flanging across the drum fills and bridge, popularizing the dramatic jet-plane swoosh worldwide."
            },
            {
                "q": "At what frequencies do the cancellation notches occur in a standard flanger comb filter when the delay time is tau (tau in seconds)?",
                "options": [
                    "At random non-harmonic frequencies determined by capacitor tolerance",
                    "At odd half-wavelength multiples: f = 1/(2*tau), 3/(2*tau), 5/(2*tau)...",
                    "Strictly at the fundamental pitch of the bass instrument",
                    "Exclusively above the Nyquist sampling frequency"
                ],
                "correct": 1,
                "expl": "Destructive phase cancellation occurs whenever the delayed waveform arrives exactly half a wavelength out of phase with the original sound. This mathematical relationship produces a linear harmonic sequence of notches at odd multiples: $f = \\frac{1}{2\\tau}, \\frac{3}{2\\tau}, \\frac{5}{2\\tau}...$"
            },
            {
                "q": "What sonic result is produced when high Feedback (Regeneration) is dialed in on a flanger pedal?",
                "options": [
                    "The audio converts into distinct ping-pong slapback echoes",
                    "The resonant peaks between the comb notches are reinforced, creating an aggressive, whistling metallic 'jet-plane whoosh'",
                    "The low-end frequencies are boosted by +12 dB",
                    "The flanger automatically sums the stereo channels to mono"
                ],
                "correct": 1,
                "expl": "Feeding the delayed signal back into the flanger input amplifies the resonant peaks between the cancellation notches. As the LFO sweeps the delay time, these whistling peaks travel up and down the spectrum, mimicking an aircraft jet engine."
            },
            {
                "q": "How does Negative Feedback (inverting the phase of the feedback signal) alter the tone of a flanger compared to positive feedback?",
                "options": [
                    "It produces a hollow, eerie, metallic 'tubular' bite by canceling odd harmonics and shifting notch frequencies",
                    "It completely silences the flanger effect through total phase cancellation",
                    "It converts the flanger into an analog spring reverb",
                    "It eliminates all pitch modulation"
                ],
                "correct": 0,
                "expl": "Positive feedback emphasizes even harmonics, producing a warmer, woody resonance. Negative feedback phase-inverts the return, shifting the comb filter peaks to odd harmonic troughs, resulting in an eerie, aggressive, metallic hollow bite."
            },
            {
                "q": "Which classic 1977 hard rock track by Heart prominently features galloping flanger modulation on Nancy Wilson's rhythm guitar?",
                "options": [
                    "'Magic Man'",
                    "'Barracuda'",
                    "'Crazy on You'",
                    "'Straight On'"
                ],
                "correct": 1,
                "expl": "The heavy galloping E-string chug of Heart's 'Barracuda' (Little Queen, 1977) was processed with an analog flanger, giving the heavy guitar riff its iconic sweeping metallic growl and rhythmic motion."
            },
            {
                "q": "What happens psychoacoustically if the delay time on a flanger is extended significantly beyond 35 milliseconds?",
                "options": [
                    "The comb filtering effect disappears and the ear perceives a distinct, separate slapback echo",
                    "The signal enters digital aliasing distortion",
                    "The frequency notches become completely inaudible",
                    "The audio drops in volume by -6 dB due to acoustic boundary loading"
                ],
                "correct": 0,
                "expl": "Due to the Haas effect (precedence effect), delays under 30–35ms are integrated by the human brain as a single sound with altered timbral character (comb filtering). Beyond 35ms, the ear separates the two signals as distinct discrete echoes."
            },
            {
                "q": "What is 'Through-Zero Flanging' (TZF), and why was it originally only possible using physical tape decks rather than electronic delay pedals?",
                "options": [
                    "A technique where the flanger delay time hits exactly 0 milliseconds and the delayed signal momentarily leads ahead of the dry track, creating total phase cancellation silence",
                    "A digital brickwall limiter that prevents delay levels from exceeding 0 dBFS",
                    "A technique that mutes all frequencies below 0 Hz",
                    "An analog circuit that grounds the chassis to eliminate mains ground hum"
                ],
                "correct": 0,
                "expl": "In electronic delay circuits, delay time can approach zero but cannot be negative (the wet signal cannot precede the dry signal). On two tape machines, by slowing the reference tape, the delayed tape can actually pull ahead of it, crossing 'through zero' for complete cancellation silence."
            }
        ]
    }
]

def generate_quiz_html(q_data):
    questions_json = json.dumps(q_data["questions"])
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{q_data['title']} • Edexcel Component 3 Specification Quiz | Music Tech Guru</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {{
      --bg-dark: #080e1a;
      --bg-card: #0f172a;
      --bg-surface: #1e293b;
      --accent: {q_data['accent']};
      --accent-glow: {q_data['accent_glow']};
      --accent-green: #34d399;
      --accent-red: #ef4444;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-accent: {q_data['accent_glow']};
      --font: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}

    body {{
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
    }}

    .quiz-container {{
      width: 100%;
      max-width: 880px;
      background: radial-gradient(circle at 50% 0%, {q_data['accent_glow']} 0%, rgba(14, 17, 36, 0) 70%), var(--bg-card);
      border: 1px solid var(--border-accent);
      border-radius: 20px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px {q_data['accent_glow']};
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }}

    .quiz-header {{
      padding: 24px 32px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(10px);
    }}

    .topic-badge {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid var(--border-accent);
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: var(--accent);
      text-transform: uppercase;
    }}

    .progress-pill {{
      font-family: monospace;
      font-size: 13px;
      color: var(--text-muted);
      background: var(--bg-surface);
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-subtle);
    }}

    .progress-bar {{
      height: 4px;
      background: rgba(255, 255, 255, 0.05);
      width: 100%;
    }}

    .progress-fill {{
      height: 100%;
      background: linear-gradient(90deg, var(--accent), #a855f7);
      width: 10%;
      transition: width 0.3s ease;
    }}

    .quiz-body {{
      padding: 36px 32px;
      min-height: 420px;
      display: flex;
      flex-direction: column;
    }}

    .question-stem {{
      font-size: 19px;
      font-weight: 700;
      line-height: 1.45;
      margin-bottom: 24px;
      color: #ffffff;
    }}

    .options-grid {{
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }}

    .option-btn {{
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 14px 18px;
      color: var(--text-main);
      font-size: 14.5px;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 14px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }}

    .option-btn:hover:not(:disabled) {{
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateX(4px);
    }}

    .option-btn.correct {{
      background: rgba(52, 211, 153, 0.15) !important;
      border-color: var(--accent-green) !important;
      color: #ffffff !important;
    }}

    .option-btn.incorrect {{
      background: rgba(239, 68, 68, 0.15) !important;
      border-color: var(--accent-red) !important;
      color: #ffffff !important;
    }}

    .opt-letter {{
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
      flex-shrink: 0;
    }}

    .explanation-box {{
      display: none;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-subtle);
      border-left: 4px solid var(--accent);
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 24px;
      animation: fadeIn 0.3s ease;
    }}

    .explanation-box h4 {{
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--accent);
      margin-bottom: 6px;
      font-weight: 800;
    }}

    .explanation-box p {{
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.55;
    }}

    .quiz-footer {{
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 18px;
      border-top: 1px solid var(--border-subtle);
    }}

    .score-indicator {{
      font-size: 13px;
      font-weight: 700;
      color: var(--text-muted);
    }}

    .next-btn {{
      background: var(--accent);
      color: #030712;
      border: none;
      border-radius: 10px;
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }}

    .next-btn:hover:not(:disabled) {{
      filter: brightness(1.15);
      transform: translateY(-2px);
    }}

    .next-btn:disabled {{
      opacity: 0.35;
      cursor: not-allowed;
    }}

    /* Completion Screen */
    .summary-screen {{
      display: none;
      text-align: center;
      padding: 40px 20px;
    }}

    .summary-title {{
      font-size: 32px;
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 12px;
    }}

    .score-circle {{
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%);
      border: 3px solid var(--accent);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 24px auto;
    }}

    .score-val {{
      font-size: 42px;
      font-weight: 900;
      color: #ffffff;
      line-height: 1;
    }}

    .score-max {{
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 700;
    }}

    .grade-badge {{
      display: inline-block;
      padding: 6px 18px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 800;
      margin-bottom: 24px;
    }}

    @keyframes fadeIn {{
      from {{ opacity: 0; transform: translateY(6px); }}
      to {{ opacity: 1; transform: translateY(0); }}
    }}
  </style>
</head>
<body>

  <div class="quiz-container">
    <div class="quiz-header">
      <div class="topic-badge">
        <span>{q_data['icon']}</span>
        <span>{q_data['badge']}</span>
      </div>
      <div class="progress-pill" id="progressPill">Q 1 / 10</div>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" id="progressFill"></div>
    </div>

    <div class="quiz-body" id="quizBody">
      <div class="question-stem" id="questionStem">Loading Question...</div>

      <div class="options-grid" id="optionsGrid"></div>

      <div class="explanation-box" id="explanationBox">
        <h4>Examiner Specification Insight</h4>
        <p id="explanationText"></p>
      </div>

      <div class="quiz-footer">
        <div class="score-indicator" id="scoreIndicator">Score: 0 / 0</div>
        <button class="next-btn" id="nextBtn" onclick="nextQuestion()" disabled>
          <span>Next Question</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>

    <!-- SUMMARY SCREEN -->
    <div class="summary-screen" id="summaryScreen">
      <div class="topic-badge" style="margin-bottom: 16px;">Assessment Complete</div>
      <h2 class="summary-title">{q_data['title']} Completed!</h2>
      <p style="color: var(--text-muted); font-size: 15px;">Official Pearson Edexcel Component 3 Specification Review</p>

      <div class="score-circle">
        <div class="score-val" id="finalScoreVal">10</div>
        <div class="score-max">/ 10 MARKS</div>
      </div>

      <div class="grade-badge" id="gradeBadge">Grade A*</div>

      <p id="feedbackMessage" style="color: var(--text-muted); font-size: 14px; max-width: 500px; margin: 0 auto 30px; line-height: 1.6;"></p>

      <button class="next-btn" onclick="restartQuiz()" style="margin: 0 auto;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
        <span>Retake Specification Quiz</span>
      </button>
    </div>
  </div>

  <script>
    const questions = {questions_json};
    let currentIdx = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {{
      answered = false;
      const q = questions[currentIdx];

      // Update counters
      document.getElementById('progressPill').textContent = `Q ${{currentIdx + 1}} / ${{questions.length}}`;
      document.getElementById('progressFill').style.width = `${{((currentIdx + 1) / questions.length) * 100}}%`;
      document.getElementById('scoreIndicator').textContent = `Score: ${{score}} / ${{currentIdx}}`;

      // Update Question
      document.getElementById('questionStem').textContent = q.q;

      // Update Options
      const grid = document.getElementById('optionsGrid');
      grid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];

      q.options.forEach((opt, idx) => {{
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="opt-letter">${{letters[idx]}}</span><span>${{opt}}</span>`;
        btn.onclick = () => selectOption(idx);
        grid.appendChild(btn);
      }});

      // Reset explanation & button
      document.getElementById('explanationBox').style.display = 'none';
      document.getElementById('nextBtn').disabled = true;
      document.getElementById('nextBtn').innerHTML = (currentIdx === questions.length - 1) 
        ? '<span>Finish Assessment</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' 
        : '<span>Next Question</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }}

    function selectOption(selectedIdx) {{
      if (answered) return;
      answered = true;

      const q = questions[currentIdx];
      const buttons = document.querySelectorAll('.option-btn');

      buttons.forEach(btn => btn.disabled = true);

      if (selectedIdx === q.correct) {{
        buttons[selectedIdx].classList.add('correct');
        score++;
      }} else {{
        buttons[selectedIdx].classList.add('incorrect');
        buttons[q.correct].classList.add('correct');
      }}

      // Show explanation
      document.getElementById('explanationText').textContent = q.expl;
      document.getElementById('explanationBox').style.display = 'block';

      // Update score & enable next
      document.getElementById('scoreIndicator').textContent = `Score: ${{score}} / ${{currentIdx + 1}}`;
      document.getElementById('nextBtn').disabled = false;
    }}

    function nextQuestion() {{
      if (currentIdx < questions.length - 1) {{
        currentIdx++;
        renderQuestion();
      }} else {{
        showSummary();
      }}
    }}

    function showSummary() {{
      document.getElementById('quizBody').style.display = 'none';
      document.getElementById('summaryScreen').style.display = 'block';
      document.getElementById('finalScoreVal').textContent = score;

      const pct = (score / questions.length) * 100;
      const badge = document.getElementById('gradeBadge');
      const msg = document.getElementById('feedbackMessage');

      if (pct >= 80) {{
        badge.style.background = 'rgba(52, 211, 153, 0.2)';
        badge.style.border = '1px solid #34d399';
        badge.style.color = '#34d399';
        badge.textContent = 'Grade A* / Distinction (Master Level)';
        msg.textContent = 'Outstanding specification knowledge! You have mastered the technical signal flow, parameters, and historical contexts of this effect.';
      }} else if (pct >= 60) {{
        badge.style.background = 'rgba(56, 189, 248, 0.2)';
        badge.style.border = '1px solid #38bdf8';
        badge.style.color = '#38bdf8';
        badge.textContent = 'Grade B (Solid Understanding)';
        msg.textContent = 'Good work! Review the technical formulas, routing distinctions, and parameter calculations to convert this into top-mark mastery.';
      }} else {{
        badge.style.background = 'rgba(239, 68, 68, 0.2)';
        badge.style.border = '1px solid #ef4444';
        badge.style.color = '#ef4444';
        badge.textContent = 'Needs Review';
        msg.textContent = 'Spend some time revisiting the interactive slide deck and technical homework guide to solidify your understanding of these core principles.';
      }}
    }}

    function restartQuiz() {{
      currentIdx = 0;
      score = 0;
      document.getElementById('summaryScreen').style.display = 'none';
      document.getElementById('quizBody').style.display = 'flex';
      renderQuestion();
    }}

    // Init
    renderQuestion();
  </script>
</body>
</html>
"""

def main():
    print("Generating 5 interactive studio effects quizzes...")
    for q in QUIZZES:
        html = generate_quiz_html(q)
        with open(q["filename"], "w", encoding="utf-8") as f:
            f.write(html)
        # also copy to dist
        dist_fn = os.path.join("dist", os.path.basename(q["filename"]))
        with open(dist_fn, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Generated {q['filename']} ({len(html)} bytes)")

if __name__ == "__main__":
    main()
