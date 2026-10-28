"""
Builds public/early-multitrack-interactive-quiz.html
12 Edexcel Component 3 Exam Specification Questions on Early Multitrack Recording (1964-1969).
Theme: Deep Warm Walnut/Navy with Amber & Gold accents (#f59e0b / #fbbf24).
Balanced Option Lengths (Zero Length Bias): Diff <= 15 chars across all questions.
"""
import json, re

SRC = 'public/direct-to-tape-interactive-quiz.html'
OUT = 'public/early-multitrack-interactive-quiz.html'

direct_quiz = open(SRC, encoding='utf-8').read()

# Replace titles and meta
direct_quiz = direct_quiz.replace('Direct to Tape Recording (1950–1963)', 'Early Multitrack Recording (1964–1969)')
direct_quiz = direct_quiz.replace('Direct to Tape (1950–1963)', 'Early Multitrack (1964–1969)')
direct_quiz = direct_quiz.replace(
    'Mono & 2-track tape mechanics, room spill balancing, valve saturation, Sun slapback delay, and 1950s rock & blues',
    '4-track tape mechanics, reduction bouncing, Sel-Sync, ADT, plate reverb, LA-2A, Fairchild, and psychedelic rock & soul'
)

questions = [
  {
    "category": "4-Track Tape Mechanics",
    "ao": "AO3: Magnetic Tape Width & Signal Quality",
    "text": "Why did Abbey Road's Studer J37 4-track tape recorder use 1-inch wide magnetic tape rather than 1/4-inch tape?",
    "correct": "Wider tape tracks preserve wide dynamic range, high fidelity, and favorable signal-to-noise ratio across 4 discrete channels",
    "wrong": [
      "Wider tape ribbon allows the transport motors to operate at quadruple speeds up to 120 ips to eliminate all high-frequency wow",
      "Wider tape substrate completely eliminates the requirement for AC bias current application when magnetizing ferric oxide layers",
      "Wider tape allows up to 64 discrete high-impedance channels to be etched simultaneously using specialized stereo record gaps"
    ],
    "explanation": "Spreading only 4 tracks across a full 1-inch tape width yielded approximately 0.2-inch track width per channel. This substantial surface area captured strong magnetic flux, maximizing signal-to-noise ratio and headroom while minimizing tape hiss at 15 ips.",
    "tip": "Tape Track Width: Wider track width yields higher dynamic range and lower background tape hiss."
  },
  {
    "category": "Reduction Mixing & Bouncing",
    "ao": "AO3: Audio Trade-Offs in Track Bouncing",
    "text": "What physical audio trade-off occurred every time Abbey Road engineers 'bounced down' 4 tracks from Machine 1 onto Machine 2?",
    "correct": "Generational loss added approximately +3 dB of background tape hiss and subtle wow, flutter, and top-end clarity loss",
    "wrong": [
      "The master tape speed dropped automatically by 50 percent, transposing all musical performances downwards by one full octave",
      "The audio signal was permanently converted from analog electromagnetic flux into 8-bit digital linear pulse-code modulation",
      "Dynamic range expanded drastically by +18 dB while odd-order harmonic distortion was eliminated completely by the circuits"
    ],
    "explanation": "Track bouncing (reduction mixing) forced the signal through an additional stage of playback electronics, console mixing, record amplifiers, and a new magnetic tape coat. Each generation accumulated tape hiss (+3 dB noise floor increase) and slight mechanical wow/flutter.",
    "tip": "Generational Loss: Each tape-to-tape bounce degrades signal-to-noise ratio and subtly softens transients."
  },
  {
    "category": "Overdubbing Synchronization",
    "ao": "AO3: Sel-Sync Head Monitoring",
    "text": "How did the Sel-Sync (Selective Synchronous) system prevent timing lag when musicians overdubbed new parts onto a 4-track tape?",
    "correct": "It switched the Record head of prerecorded tracks into temporary playback mode, eliminating the physical gap to the Play head",
    "wrong": [
      "It accelerated the capstan drive motor during overdubs to compensate for the acoustic travel time of sound across the studio",
      "It routed audio through an electronic digital delay line calibrated to hold incoming microphone signals for exactly 200 ms",
      "It used synchronized wireless radio transmitters to broadcast click tracks directly to magnetic in-ear monitoring earpieces"
    ],
    "explanation": "If musicians monitored previously recorded tracks via the Playback head while recording new tracks at the Record head, the 1.5-inch distance between heads caused ~100 ms of playback delay. Sel-Sync allowed existing tracks to be played back through the Record head itself, ensuring sample-accurate synchronisation.",
    "tip": "Sel-Sync: Temporarily converts record head into playback head so overdubs align perfectly in time."
  },
  {
    "category": "Studio Innovation & Effects",
    "ao": "AO3: Automatic Double Tracking (ADT)",
    "text": "How did Abbey Road technical engineer Ken Townsend create Automatic Double Tracking (ADT) for John Lennon in 1966?",
    "correct": "He routed the sync record head output to a secondary tape recorder driven by a variable frequency oscillator to delay audio",
    "wrong": [
      "He inserted a dual-channel analog bucket-brigade delay pedal configured with high feedback and continuous chorus modulation",
      "He duplicated the single microphone audio line inside the console and panned the two identical fader channels hard left/right",
      "He routed audio into an acoustic concrete echo chamber and gated the returning reverberant signal with a high-pass filter"
    ],
    "explanation": "Townsend tapped the audio from the Studer J37's sync record head and fed it into a secondary BTR2 tape recorder. By adjusting the secondary machine's speed with a Variable Speed Oscillator (VSO), he introduced a controllable 10–40 ms delay with natural wow/flutter that simulated a real second vocal take.",
    "tip": "ADT: Uses a second tape machine with variable speed control to create artificial vocal doubling."
  },
  {
    "category": "Rotary Speaker Acoustic Physics",
    "ao": "AO3: The Leslie 122 Rotating Cabinet",
    "text": "Which physical acoustic phenomenon gives the Leslie 122 rotating speaker its distinctive sweeping chorale and tremolo sound?",
    "correct": "The Doppler effect continuously modulates pitch as rotating horns approach and recede, causing phase and amplitude shifts",
    "wrong": [
      "An internal digital DSP chip continuously calculates micro-pitch shifting and routes odd harmonics through a brickwall filter",
      "Dual mechanical spring tanks inside the base chassis oscillate rapidly back and forth when driven by low-frequency signals",
      "An optical photocell circuit continuously sweeps a sharp high-pass filter cutoff frequency in direct response to organ volume"
    ],
    "explanation": "As the Leslie's upper horn rotates toward the listener/mic, sound waves compress (pitch rises); as it rotates away, sound waves stretch (pitch drops). Combined with amplitude fluctuations (tremolo) and reflections bouncing off cabinet walls, this produces rich Doppler chorusing.",
    "tip": "Leslie Speaker: Doppler pitch modulation + tremolo amplitude changes from mechanical rotation."
  },
  {
    "category": "Pre-Digital Sampling",
    "ao": "AO3: The Mellotron M400 Mechanism",
    "text": "What physical mechanism does the Mellotron M400 use to generate realistic orchestral instrument sounds from its keyboard?",
    "correct": "Each key pulls an individual 3/8-inch magnetic tape strip across an analog playback head, limited to 8 seconds of audio",
    "wrong": [
      "Each key strikes a tuned steel tuning fork whose electromagnetic vibrations are captured by dual high-output magnetic pickups",
      "Each key triggers an 8-bit digital audio sample stored in solid-state ROM memory chips running through an analog ladder filter",
      "Each key releases compressed air across tuned brass organ pipes housed inside an acoustic soundproof isolation box cabinet"
    ],
    "explanation": "The Mellotron is an electro-mechanical tape replay keyboard. Beneath every key is an authentic 3/8-inch magnetic tape recorded with 8 seconds of a real instrument (violins, flutes, choir). When a key is released, a mechanical spring snaps the tape back to the start.",
    "tip": "Mellotron: Magnetic tape replay sampler; 8-second sustained note limit per key."
  },
  {
    "category": "Mixing Console Architecture",
    "ao": "AO3: EMI REDD Consoles & Preamps",
    "text": "What type of preamplification modules powered Abbey Road's famous EMI REDD.37 and REDD.51 valve mixing consoles?",
    "correct": "Siemens V72 and V72s vacuum tube telecommunication amplifiers delivering ultra-low distortion and warm transformer gain",
    "wrong": [
      "Solid-state silicon operational amplifier integrated circuits designed to deliver completely sterile, uncoloured audio gain",
      "Passive transformer step-up stages operating with zero vacuum tubes or active transistors to avoid any harmonic coloration",
      "Germanium transistor preamplifiers driven into continuous hard square-wave clipping to generate aggressive heavy metal tones"
    ],
    "explanation": "The REDD desks utilized German Siemens V72 / V72s tube amplifier modules. These high-grade European broadcast amplifiers provided +34 dB of ultra-clean, linear gain with musical second-order harmonic richness and low noise.",
    "tip": "REDD Consoles: Powered by Siemens V72 valve amplifier modules; defined the 1960s Abbey Road sound."
  },
  {
    "category": "Dynamics & Limiting",
    "ao": "AO3: Variable-Mu vs Optical Compression",
    "text": "How does the Fairchild 670 limiter achieve its famous ultra-fast transient control compared to the Teletronix LA-2A?",
    "correct": "The Fairchild uses variable-mu vacuum tubes for microsecond attack, whereas the LA-2A uses a slower optical light panel and cell",
    "wrong": [
      "The Fairchild uses digital DSP lookahead buffers, whereas the LA-2A uses high-speed silicon field-effect transistors (FETs)",
      "The Fairchild uses passive light-dependent resistors, whereas the LA-2A relies exclusively on motorized fader automation units",
      "The Fairchild operates strictly as a downward expander, whereas the LA-2A is an upward multiband dynamic peak transient clipper"
    ],
    "explanation": "The Fairchild 670 uses variable-mu tubes (gain reduction occurs directly inside remote-cutoff vacuum tubes), allowing near-instantaneous attack times down to 50 microseconds. The LA-2A uses a T4 optical cell (electroluminescent panel + photocell), producing a slower, smoother, multi-stage release.",
    "tip": "Fairchild = Ultra-fast variable-mu valve limiting; LA-2A = Smooth electro-optical leveling."
  },
  {
    "category": "Spatial Acoustics",
    "ao": "AO3: The EMT 140 Steel Plate Reverb",
    "text": "Why did studios widely adopt the EMT 140 plate reverb in the 1960s as an alternative to acoustic echo chambers?",
    "correct": "It provided dense, bright reverberation in a self-contained unit with an adjustable mechanical damping pad to control decay",
    "wrong": [
      "It completely eliminated the requirement for electrical power by operating entirely via acoustic soundwave reflection tubes",
      "It allowed engineers to digitally synthesize convolution impulse responses of world-famous concert halls and stone cathedrals",
      "It was light enough to be clipped directly onto electric guitars to generate authentic slapback delay during live concerts"
    ],
    "explanation": "The EMT 140 used a 1x2 meter cold-rolled steel plate suspended in a heavy frame. A transducer vibrated the plate, and contact pickups captured dense reflections. A motorized mechanical damping pad allowed decay times to be varied from 0.5 to 5.0 seconds from the control room.",
    "tip": "EMT 140 Plate Reverb: High reflection density, bright sheen, and remote motorized mechanical decay damping."
  },
  {
    "category": "Modulation Effects",
    "ao": "AO3: Tape Flanging Origin",
    "text": "How was the 'flanging' modulation effect physically produced on recordings like The Small Faces' 'Itchycoo Park' (1967)?",
    "correct": "By playing two tape machines in sync and pressing a thumb onto the metal reel flange of one machine to alter its phase timing",
    "wrong": [
      "By routing audio through an analog all-pass phase shift filter pedal driven by a low-frequency triangular modulation LFO",
      "By placing an omnidirectional microphone directly inside a rotating metal garbage can positioned on the live tracking floor",
      "By rapidly modulating console channel pan pots back and forth between left and right outputs to produce extreme stereo motion"
    ],
    "explanation": "Flanging was created manually: two tape recorders played the same audio simultaneously into the mix. An engineer touched the rim (flange) of one tape reel, slightly slowing it down. As the two signals drifted fractions of a millisecond apart, comb filtering produced the iconic sweeping whoosh sound.",
    "tip": "Tape Flanging: Manually slowing a tape reel flange to create time delay and sweeping comb filter phase cancellation."
  },
  {
    "category": "Guitar Effects & Pedals",
    "ao": "AO3: Fuzz & Wah-Wah Circuitry",
    "text": "What type of audio filtering occurs inside a Vox V846 wah-wah pedal when the guitarist rocks the foot treadle forward?",
    "correct": "The treadle sweeps a high-Q resonant band-pass filter peak upwards from low-mids (400 Hz) to bright treble (2.5 kHz)",
    "wrong": [
      "The treadle engages a steep 24 dB/octave low-pass brickwall filter that eliminates all harmonic frequencies above 1 kHz",
      "The treadle crossfades between an acoustic upright piano transducer and a heavily overdriven 100W valve amplifier stack",
      "The treadle alters tape capstan motor speed on an internal miniature reel-to-reel tape transport housed inside the pedal"
    ],
    "explanation": "A wah-wah pedal contains a potentiometer driven by a foot rack-and-pinion gear. It sweeps a resonant band-pass filter peak (built around an inductor) between ~400 Hz and ~2.5 kHz. Sweeping across vocal formant frequencies mimics human vocal vowel sounds ('wah').",
    "tip": "Wah-Wah Pedal: Sweeps a high-Q resonant band-pass filter across midrange vocal formant frequencies."
  },
  {
    "category": "Mastering & Stereo Mixes",
    "ao": "AO3: The RIAA Equalization Curve",
    "text": "Why must low frequencies be heavily attenuated by -20 dB when mastering audio onto a vinyl microgroove disc?",
    "correct": "Large bass waveform excursions would cut excessively wide grooves, shortening playing time and throwing the stylus off track",
    "wrong": [
      "Low frequencies cause vacuum tube amplifiers inside stereo home receivers to immediately oscillate and burn out fuses",
      "Bass frequencies cannot physically be recorded onto magnetic tape and must be synthesized artificially during turntable playback",
      "High frequencies generate static electrical discharges that permanently melt the polyvinyl chloride lacquer groove walls"
    ],
    "explanation": "Low-frequency sound waves have large amplitudes. If cut without equalization, the cutting stylus would carve wide, swinging lateral grooves, quickly consuming disc space and causing domestic playback needles to jump out of the groove. The RIAA curve cuts bass by -20 dB during cutting and restores it on playback.",
    "tip": "RIAA Curve: Bass cut -20 dB to save groove space and prevent needle jumping; treble boosted +20 dB to mask tape and surface hiss."
  }
]

# Find where const questions = [ ... ]; is in direct_quiz
match = re.search(r'const questions\s*=\s*\[[\s\S]*?\];\s*(?:function|let currentQ)', direct_quiz)
if not match:
    raise Exception("Could not find questions array in template")

suffix = 'function' if 'function' in match.group(0) else 'let currentQ'
replacement = 'const questions = ' + json.dumps(questions, indent=2) + ';\n\n    ' + suffix

new_content = direct_quiz[:match.start()] + replacement + direct_quiz[match.end():]

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Generated {OUT} ({len(new_content)} bytes, {len(questions)} balanced questions)")
