"""
Builds public/the-electric-guitar-interactive-quiz.html
12 Edexcel Component 3 Exam Specification Questions on The Electric Guitar.
Theme: Deep Charcoal/Navy with Amber Gold & Sonic Cyan accents (#f59e0b / #06b6d4).
Balanced Option Lengths (Zero Length Bias): Diff <= 15 chars across all questions.
"""
import json, re

SRC = 'public/mixers-daw-interactive-quiz.html'
OUT = 'public/the-electric-guitar-interactive-quiz.html'

with open(SRC, 'r', encoding='utf-8') as f:
    quiz_content = f.read()

# Replace titles, headings, and metadata
quiz_content = quiz_content.replace('Mixers & Digital Audio Workstations (DAW)', 'The Electric Guitar: Anatomy, Physics & Evolution')
quiz_content = quiz_content.replace('mixers-daw', 'the-electric-guitar')
quiz_content = quiz_content.replace(
    'Alesis ADAT, console channel strips, pre/post aux sends, Nyquist theorem, 24-bit dynamic range, dither, VST plugins, Auto-Tune & LUFS',
    'Faraday induction, single-coils, RWRP humbuckers, RLC resonant peak, pot resistance, harmonic nodes, comb filtering, and amp modelling'
)

# Replace theme accents if needed (amber gold / cyan)
quiz_content = quiz_content.replace('mixers_daw', 'the_electric_guitar')

questions = [
  {
    "category": "Electromagnetic Induction",
    "ao": "AO3: Faraday's Law in Guitar Pickups",
    "text": "According to Faraday's Law of Induction, how does a standard passive guitar pickup generate an electrical audio signal?",
    "correct": "Vibrating steel strings disrupt the permanent magnetic field, inducing an alternating audio voltage across the copper coil",
    "wrong": [
      "Vibrating steel strings press down on piezoelectric crystals located beneath the bridge saddles to generate direct current",
      "Vibrating steel strings alter an internal electrostatic capacitance field created by high-voltage phantom power batteries",
      "Vibrating steel strings transmit acoustic soundwaves through the solid wood body directly into a dynamic microphone element"
    ],
    "explanation": "Faraday's Law of Induction states that a changing magnetic flux induces an electromotive force (EMF). When a ferromagnetic guitar string (steel or nickel) vibrates within the magnetic field of permanent Alnico or ceramic pole pieces, it modulates the magnetic field, inducing a minute AC voltage across the thousands of copper wire windings.",
    "tip": "Faraday's Law: Ferromagnetic steel string vibrates in magnetic field, modulating flux and inducing alternating electrical current in coil."
  },
  {
    "category": "Single-Coil Pickup Physics",
    "ao": "AO3: Construction & Frequency Response",
    "text": "What physical construction characteristic gives traditional Fender single-coil pickups their distinctive bright, snappy tone?",
    "correct": "Narrow magnetic sampling apertures combined with lower inductance create a prominent resonant treble peak between 4 kHz and 5 kHz",
    "wrong": [
      "Twin opposed magnetic coils wired together in parallel cancel out harsh high-frequency harmonics above 2 kHz across all audio octaves",
      "Thick steel baseplates placed directly underneath the bobbins absorb stray treble frequencies while boosting sub-bass response curves",
      "Heavy ceramic magnet bars positioned inside the pickup body reduce string excursion to eliminate mechanical harmonic overtones completely"
    ],
    "explanation": "Single-coil pickups focus their magnetic field into a narrow sampling window along the string. Coupled with moderate coil winding (~7,000–8,500 turns of 42 AWG wire giving 2.5–3.5 H inductance), the pickup's RLC circuit exhibits a sharp resonant frequency peak in the 4–5 kHz presence region, delivering exceptional attack chime and articulate definition.",
    "tip": "Single-Coil Tone: Narrow magnetic window + lower inductance = high resonant peak (4–5 kHz) giving bright chime, but susceptible to 50/60 Hz hum."
  },
  {
    "category": "Humbucker Hum Cancellation",
    "ao": "AO3: Seth Lover RWRP Physics",
    "text": "How does Seth Lover's PAF humbucking pickup eliminate mains hum while preserving string audio fidelity?",
    "correct": "Dual coils wound in reverse electrical polarity with opposing magnetic poles cancel ambient EMI noise but sum string signals",
    "wrong": [
      "Dual coils pass high-voltage direct current through ground wires to repel electrostatic radio frequencies from nearby stage gear",
      "Dual coils utilize an active internal 9-volt transistor filter that notches out 50 Hz and 60 Hz hum frequencies across the board",
      "Dual coils shield the wooden body cavity with solid lead sheets to block magnetic field interference from valve power transformers"
    ],
    "explanation": "Humbuckers feature two coils wired Reverse Wind, Reverse Polarity (RWRP). External electromagnetic interference (mains hum) affects both coils equally in phase; because the coils are wired in reverse polarity, the noise signals cancel out (180° out of phase). However, because the magnets beneath each coil are also flipped, the string signal undergoes a double inversion (-1 * -1 = +1) and sums coherently (+6 dB).",
    "tip": "RWRP: Reverse Wind + Reverse Polarity. External EMI hum cancels (180° phase inversion); vibrating string audio sums in-phase (+6 dB)."
  },
  {
    "category": "Potentiometer Loading",
    "ao": "AO3: 250 kΩ vs 500 kΩ Potentiometers",
    "text": "Why do guitar manufacturers traditionally pair 250 kΩ volume potentiometers with single-coils and 500 kΩ with humbuckers?",
    "correct": "A 250 kΩ pot bleeds more treble to ground, smoothing single-coil bite, while a 500 kΩ pot preserves high-frequency humbucker clarity",
    "wrong": [
      "A 250 kΩ pot doubles electrical output current for low-impedance cables, while a 500 kΩ pot prevents battery drain in passive guitars",
      "A 250 kΩ pot compresses acoustic dynamic range during loud playing, while a 500 kΩ pot acts as an active transistor boost circuit",
      "A 250 kΩ pot inverts audio polarity to cancel feedback squeal, while a 500 kΩ pot blocks direct current from reaching external pedals"
    ],
    "explanation": "The volume pot presents a parallel resistance load across the pickup's RLC circuit. A 250 kΩ pot exerts heavier electrical damping on the resonant peak, bleeding off piercing ultra-highs to produce a sweet, balanced single-coil tone. Humbuckers already have darker natural response due to higher inductance and phase cancellation; a 500 kΩ pot imposes less resistive loading, preserving vital top-end clarity.",
    "tip": "Pot Values: 250k smooths harsh highs on bright single-coils; 500k loads the circuit less, preserving presence on darker humbuckers."
  },
  {
    "category": "Pickup Placement & Harmonics",
    "ao": "AO3: Bridge vs Neck Harmonic Sampling",
    "text": "Why does a bridge pickup produce a sharp, trebly tone while a neck pickup produces a warm, bass-heavy tone on the same guitar?",
    "correct": "Near the bridge string excursion is restricted with dense upper harmonics; near the neck wide excursion emphasizes the fundamental",
    "wrong": [
      "Near the bridge strings carry positive electrical voltages; near the neck strings carry negative electrical voltages into the mix",
      "Near the bridge the wood block absorbs low frequencies; near the neck the hollow cavity amplifies acoustic bass resonances loudly",
      "Near the bridge magnetic pull speeds up string vibration speed; near the neck gravitational forces slow down wave oscillation rates"
    ],
    "explanation": "String vibration physics dictates that at the bridge anchor point, string displacement is physically restricted, suppressing low-frequency fundamental wave motion while highlighting short-wavelength upper harmonics. Near the neck (closer to the string's center antinode), the string vibrates with wide physical amplitude, strongly generating the fundamental and low-order harmonics.",
    "tip": "Pickup Placement: Bridge = restricted excursion, dense treble harmonics; Neck = wide excursion near antinode, rich fundamental and bass warmth."
  },
  {
    "category": "Stratocaster 5-Way Switching",
    "ao": "AO3: Parallel Comb Filtering ('Quack')",
    "text": "What acoustic and electrical phenomenon causes the iconic hollow 'quack' tone in Stratocaster positions 2 and 4?",
    "correct": "Combining two spaced single-coils in parallel creates phase cancellation notches across the midrange, producing a comb-filtered scoop",
    "wrong": [
      "Combining two single-coils reverses audio polarity by 180 degrees, completely wiping out fundamental frequencies through cancellation",
      "Combining two single-coils switches internal magnetic poles into series, creating high-gain distortion like an overdriven valve head",
      "Combining two single-coils engages an internal passive inductor choke coil that automatically compresses low-end dynamic transients"
    ],
    "explanation": "In positions 2 (bridge + middle) and 4 (middle + neck), two pickups are wired in parallel. Because the pickups sample the vibrating string at different physical locations along its length, high and midrange harmonic waveforms arrive with small time/phase differences. This causes comb-filtering phase cancellation in the 1–2 kHz midrange, creating the scooped, hollow 'quack' made famous by Mark Knopfler and Jimi Hendrix.",
    "tip": "Strat 'Quack' (Pos 2 & 4): Spaced pickups wired in parallel create phase interference notches (comb filtering) that scoop mid frequencies."
  },
  {
    "category": "Solidbody Architecture",
    "ao": "AO4: The Elimination of Feedback",
    "text": "What major performance problem did the development of solidbody guitars (Fender Broadcaster, Gibson Les Paul) solve in the 1950s?",
    "correct": "It eliminated hollowbody soundboard vibration and internal air cavity resonance that caused uncontrollable feedback at loud volumes",
    "wrong": [
      "It allowed guitarists to play acoustic rhythm styles without needing external microphone stands or amplification hardware on stage",
      "It completely eliminated all mechanical string breakage caused by friction across traditional bone nuts and wooden bridge tailpieces",
      "It prevented magnetic interference generated by early cathode ray tube television broadcast cameras during live television studio gigs"
    ],
    "explanation": "Early hollowbody archtop guitars suffered severe acoustic feedback when played through high-volume amplifiers: sound pressure from loudspeakers caused the guitar's flexible top wood and internal air chamber to resonate violently in an uncontrollable feedback loop. Solid wood bodies (ash, alder, mahogany) decoupled the instrument from acoustic air pressure, allowing clean sustain and extreme amplified volume.",
    "tip": "Solidbody Evolution: Eliminates air cavity resonance and top vibration, ending acoustic feedback loops at high stage volume."
  },
  {
    "category": "Electric Bass Revolution",
    "ao": "AO4: Fender Precision Bass (1951/1957)",
    "text": "Why was Leo Fender's Precision Bass (1951) considered revolutionary for touring rhythm sections and commercial recordings?",
    "correct": "Its fretted solidbody design ensured accurate intonation and portable amplified bass that could compete cleanly with loud drum kits",
    "wrong": [
      "Its hollow acoustic chamber produced upright double-bass natural resonance without needing any audio preamplification or DI boxes",
      "Its six strings were tuned an entire octave above standard guitars, allowing bassists to play rapid jazz guitar chord solos onstage",
      "Its piezo pickup eliminated the need for bass strings, using synthetic rubber bands to create sub-bass synthesizer tones in clubs"
    ],
    "explanation": "Before the 1951 P-Bass, upright double basses were bulky, quiet, and easily drowned out by brass and drums. Leo Fender combined a solid body (no feedback), 34-inch scale with guitar-style frets (providing precise pitch intonation, hence 'Precision'), and a single electromagnetic pickup, enabling portable, loud, and articulate bass tracking.",
    "tip": "Precision Bass (1951): Fretted neck gave accurate pitch; solid body stopped feedback; allowed bassists to match drum volume on stage."
  },
  {
    "category": "High-Performance Hardware",
    "ao": "AO4: Floyd Rose Double-Locking Tremolo",
    "text": "How does a Floyd Rose locking tremolo system maintain pitch stability during radical pitch dives and aggressive whammy use?",
    "correct": "Strings are clamped rigidly at both the nut and bridge saddles, preventing friction slippage and slack over tuning pegs during dives",
    "wrong": [
      "An electronic motorized microprocessor inside the body detects pitch drift and re-tunes machine pegs instantaneously between notes",
      "Hydraulic fluid cylinders installed behind the bridge absorb mechanical string tension shock to keep string wire core from stretching",
      "Internal carbon-fiber reinforcement rods running through the neck flex symmetrically to counteract vibrato arm upward pulling forces"
    ],
    "explanation": "Traditional vibrato systems go out of tune because slackened strings slip through nut slots and unwind unevenly around tuner posts during dives. Floyd Rose introduced a double-locking mechanism: hardened steel pads clamp strings firmly at the locking nut and bridge saddles, isolating the active vibrating string length and preventing friction slippage entirely.",
    "tip": "Floyd Rose Tremolo: Clamps strings at locking nut and bridge saddles. Eliminates friction slippage, allowing extreme dive-bombs without detuning."
  },
  {
    "category": "Active Electronics",
    "ao": "AO3: Low-Impedance Active Pickups (EMG)",
    "text": "What is the primary technical design advantage of active guitar pickups (e.g. EMG 81) powered by an internal 9V battery?",
    "correct": "Low-turn coils offer ultra-wide flat bandwidth and low noise, boosted cleanly by an internal preamp with low output impedance",
    "wrong": [
      "The 9V battery generates high-voltage DC phantom power that magnetizes steel strings to double physical acoustic sustain length",
      "The onboard preamp adds heavy analog valve tube distortion directly inside the guitar body before reaching the instrument amplifier",
      "The circuit eliminates the need for volume and tone potentiometers, automatically compressing dynamic audio signals to 0 dBFS peak"
    ],
    "explanation": "Active pickups wind far fewer copper coil turns, which drastically lowers inductance, eliminates 50/60 Hz hum susceptibility, and extends frequency response far into the treble and sub-bass. Because the raw signal is weak, an onboard discrete transistor preamp (powered by a 9V battery) boosts signal level and buffers it into a low-impedance output (~10 kΩ), preventing high-frequency signal loss over long guitar cables.",
    "tip": "Active Pickups: Low coil turns = wide frequency bandwidth & low noise; internal 9V preamp boosts level and provides low output impedance."
  },
  {
    "category": "Tone Control Circuitry",
    "ao": "AO3: Passive RC Low-Pass Filter Physics",
    "text": "Electrically, how does a standard passive guitar tone control knob attenuate high frequencies when rolled down?",
    "correct": "It forms a variable RC low-pass filter with a capacitor, shunting high frequencies to ground with a 6 dB per octave rolloff slope",
    "wrong": [
      "It inserts a variable inductor choke in series with the pickup output to compress incoming dynamic transients across all frequencies",
      "It reduces direct current voltage from the internal volume potentiometer to starve pickup magnets of magnetic flux saturation levels",
      "It flips the phase polarity of upper harmonic overtones by 180 degrees, causing them to self-cancel before reaching the output jack"
    ],
    "explanation": "A passive tone circuit consists of a variable resistor (tone pot, typically 250k or 500k) wired in series with a capacitor (typically 0.022 µF or 0.047 µF) connected to ground. As the pot resistance decreases, high-frequency audio currents encounter lower reactance through the capacitor than the amplifier, shunting treble to ground as a passive 1st-order (-6 dB/octave) low-pass filter.",
    "tip": "Tone Knob: Variable resistor + capacitor forms an RC low-pass filter (-6 dB/oct); rolling down bleeds higher frequencies to ground."
  },
  {
    "category": "Digital Amp Modelling & IRs",
    "ao": "AO3/AO4: DSP Emulation & Convolution",
    "text": "In digital guitar processors (e.g. Line 6 Helix, Quad Cortex), what role does an Impulse Response (IR) play in sound shaping?",
    "correct": "It uses mathematical convolution to replicate the complex acoustic frequency response of a specific speaker cab and studio microphone",
    "wrong": [
      "It generates polyphonic MIDI note triggers from monophonic guitar audio transients to control external synthesizer rack modules live",
      "It applies look-ahead multi-band dynamic limiting to eliminate all clipping distortion generated by simulated high-gain valve circuits",
      "It automatically corrects slightly out-of-tune guitar chords in real time by shifting pitch fundamentals to 440 Hz concert pitch scale"
    ],
    "explanation": "While digital algorithms model the non-linear distortion, sag, and clipping behavior of tube preamps and power amps, an Impulse Response (IR) captures the linear time-invariant acoustic transfer function of a physical speaker cabinet, driver cone, cabinet wood resonance, and studio recording microphone placement. Convolution reproduces this exact physical sonic footprint digitally.",
    "tip": "Impulse Response (IR): Convolution filter capturing the linear frequency and phase response of a real speaker cabinet, cone, and mic placement."
  }
]

# Length validation check (Diff <= 15 chars across all 4 options per question)
print("=== VALIDATING ZERO LENGTH BIAS (<= 15 chars difference) ===")
violations = 0
for idx, q in enumerate(questions, 1):
    options = [q["correct"]] + q["wrong"]
    lengths = [len(opt) for opt in options]
    min_len = min(lengths)
    max_len = max(lengths)
    diff = max_len - min_len
    status = "OK" if diff <= 15 else "FAIL"
    print(f"Q{idx:02d} ({q['category']}): min={min_len}, max={max_len}, diff={diff} chars [{status}]")
    if diff > 15:
        violations += 1
        print(f"   Correct ({len(q['correct'])}): {q['correct']}")
        for w in q['wrong']:
            print(f"   Wrong   ({len(w)}): {w}")

if violations > 0:
    raise ValueError(f"Found {violations} questions with option length diff > 15!")
else:
    print("ALL 12 QUESTIONS PASS ZERO LENGTH BIAS (diff <= 15 chars)!\n")

# Find where const questions = [ ... ]; is in quiz_content
match = re.search(r'const questions\s*=\s*\[[\s\S]*?\];\s*(?:function|let currentQ)', quiz_content)
if not match:
    raise Exception("Could not find questions array in template")

suffix = 'function' if 'function' in match.group(0) else 'let currentQ'
replacement = 'const questions = ' + json.dumps(questions, indent=2) + ';\n\n    ' + suffix

new_content = quiz_content[:match.start()] + replacement + quiz_content[match.end():]

# Clean up any leftover DAWs / Multitrack titles in head/header
new_content = new_content.replace('The Blues • Edexcel Component 3 Specification Quiz | Music Tech Guru', 'The Electric Guitar • Edexcel Component 3 Specification Quiz | Music Tech Guru')
new_content = new_content.replace('Mixers & Digital Audio Workstations • Edexcel Component 4 Specification Quiz | Music Tech Guru', 'The Electric Guitar • Edexcel Component 3 Specification Quiz | Music Tech Guru')
new_content = new_content.replace('Component 4: Production & Analysing', 'Component 3: Music Technology in Context')
new_content = new_content.replace('Mixers & DAWs (1980s–Present)', 'The Electric Guitar: Anatomy, Physics & History')
new_content = new_content.replace('Mixers &amp; DAWs', 'The Electric Guitar')

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Generated {OUT} ({len(new_content)} bytes, {len(questions)} balanced questions)")
