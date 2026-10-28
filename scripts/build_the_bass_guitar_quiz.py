"""
Builds public/the-bass-guitar-interactive-quiz.html
12 Edexcel Component 3 Exam Specification Questions on The Bass Guitar.
Theme: Deep Charcoal/Navy with Amber Gold & Sonic Cyan accents (#f59e0b / #06b6d4).
Balanced Option Lengths (Zero Length Bias): Diff <= 15 chars across all questions.
"""
import json, re

SRC = 'public/the-electric-guitar-interactive-quiz.html'
OUT = 'public/the-bass-guitar-interactive-quiz.html'

with open(SRC, 'r', encoding='utf-8') as f:
    quiz_content = f.read()

# Replace titles, headings, and metadata
quiz_content = quiz_content.replace('The Electric Guitar • Edexcel Component 3 Specification Quiz | Music Tech Guru', 'The Bass Guitar • Edexcel Component 3 Specification Quiz | Music Tech Guru')
quiz_content = quiz_content.replace('The Electric Guitar: Anatomy, Physics & Evolution', 'The Bass Guitar: History, Transducers & Low-End Engineering')
quiz_content = quiz_content.replace('the-electric-guitar', 'the-bass-guitar')
quiz_content = quiz_content.replace('the_electric_guitar', 'the_bass_guitar')
quiz_content = quiz_content.replace(
    'Faraday induction, single-coils, RWRP humbuckers, RLC resonant peak, pot resistance, harmonic nodes, comb filtering, and amp modelling',
    '34" scale tension, P-Bass RWRP split-coils, Jazz Bass mid scoop, flatwounds, active 9V Baxandall EQ, slap dynamics, SVT tube cabs, DI phase alignment'
)
quiz_content = quiz_content.replace('The Electric Guitar: Anatomy, Physics & History', 'The Bass Guitar: History, Transducers & Low-End Engineering')
quiz_content = quiz_content.replace('The Electric Guitar', 'The Bass Guitar')

questions = [
  {
    "category": "Historical Innovation (1951)",
    "ao": "AO4: Fender Precision Bass & Intonation",
    "text": "Why did Leo Fender add nickel-silver frets and a solid ash body to the 1951 Precision Bass?",
    "correct": "Frets guaranteed exact intonation while the solidbody eliminated acoustic feedback at high stage volume",
    "wrong": [
      "Frets increased total sustain while the solidbody reduced high-frequency hum from stage lighting circuits",
      "Frets lowered mechanical string tension while the solidbody converted low notes into pure acoustic tones",
      "Frets allowed polyphonic chord strumming while the solidbody stopped neck warping caused by heat changes"
    ],
    "explanation": "Before 1951, upright double basses were fretless, prone to acoustic feedback through early PA microphones, and cumbersome to transport. Fender fretted the 34-inch neck so players could play with pitch precision and built a solid body that resisted feedback even at high volume.",
    "tip": "Precision Bass 1951: Frets delivered pitch precision; solid body eradicated acoustic feedback loops."
  },
  {
    "category": "Scale Length & String Tension",
    "ao": "AO3: Mersenne's Laws & 34-inch Scale",
    "text": "According to Mersenne's Law, how does Fender's 34-inch long scale affect low-frequency performance compared to a 30-inch short scale?",
    "correct": "Longer scale length requires higher string tension for equal pitch, delivering tighter low-end and clear overtones",
    "wrong": [
      "Longer scale length reduces string mass per unit length, creating thicker bass fundamentals with shortened decays",
      "Longer scale length lowers string tension significantly, producing a tubbier sound with minimal mechanical attack",
      "Longer scale length narrows magnetic pickup flux lines, generating massive low-frequency sub-bass output volume"
    ],
    "explanation": "Mersenne's Law states f = (1 / 2L) * sqrt(T / mu). Increasing scale length L at a fixed pitch f requires higher string tension T. This higher tension on a 34-inch bass keeps strings taut, preventing floppiness, boosting transient attack, and enhancing harmonic overtone clarity.",
    "tip": "Scale Length: Longer vibrating length (34\" vs 30\") requires higher tension, producing articulate punch and defined overtones."
  },
  {
    "category": "RWRP Split-Coil Pickup (1957)",
    "ao": "AO3: Reverse-Wound Reverse-Polarity Physics",
    "text": "How does the 1957 split-coil Precision Bass pickup cancel 50/60 Hz mains hum while keeping the bass tone punchy?",
    "correct": "Two bobbin halves have opposite magnetic poles and opposite coil windings, cancelling hum but adding string signals",
    "wrong": [
      "Two bobbin halves pass grounding wires through chassis shielding to bleed out high-frequency electromagnetic noise",
      "Two bobbin halves contain active transistors that notch out 50 Hz hum while boosting sub-bass fundamental octaves",
      "Two bobbin halves share identical north polarity and parallel coils to short-circuit external electrostatic interference"
    ],
    "explanation": "The 1957 P-Bass split pickup uses two reverse-wound, reverse-polarity (RWRP) bobbins. External electromagnetic interference (EMI) induces equal-amplitude voltages with opposite polarity in the coils, cancelling hum. The vibrating ferromagnetic strings have opposite magnetic polarities, so string signals are in-phase and sum cleanly.",
    "tip": "Split-Coil RWRP: Opposite magnetic polarity + opposite coil winding = phase cancellation of hum, in-phase addition of string signal."
  },
  {
    "category": "Fender Jazz Bass Dual Pickups (1960)",
    "ao": "AO3: Parallel Wiring & Mid Scoop",
    "text": "What acoustic and electrical phenomenon occurs when both pickups on a Fender Jazz Bass are set to full volume?",
    "correct": "Parallel wiring and physical spacing cause phase cancellation in upper mids, producing a scooped signature slap punch",
    "wrong": [
      "Parallel wiring doubles coil resistance, attenuating low-end fundamentals and producing a nasal, honky mid boost",
      "Series wiring doubles output signal impedance, causing severe high-frequency rolloff across all studio audio cables",
      "Series wiring sums harmonic nodes identically, creating an ultra-flat studio response without any tonal coloration"
    ],
    "explanation": "When both single-coil pickups on a Jazz Bass are at full volume, the physical distance between them causes slight phase cancellation in the 500 Hz to 1 kHz region. Combined with the parallel circuit impedance drop, this creates the classic scooped-mid tone favored by slap and funk players.",
    "tip": "Jazz Bass (both on 10): Parallel wiring + physical pickup spacing creates a signature scooped midrange punch."
  },
  {
    "category": "String Construction & Physics",
    "ao": "AO3: Flatwound vs Roundwound Dynamics",
    "text": "Why do flatwound bass strings produce a darker, warmer fundamental tone than ribbed roundwound strings?",
    "correct": "Ribbon windings damp high-frequency vibration and pack higher mass, attenuating bright harmonics and finger noise",
    "wrong": [
      "Ribbon windings increase acoustic air resistance around strings, slowing down fundamental wave travel velocities",
      "Ribbon windings lower string tension, allowing greater physical travel that prevents high-frequency transduction",
      "Ribbon windings short-circuit pickup magnetic field lines, filtering out audio frequencies above 800 Hz completely"
    ],
    "explanation": "Flatwounds are wrapped with a flat, ribbon-like outer wire, creating a smooth surface with high internal damping. This damps upper vibrational modes rapidly, yielding a deep, thumpy fundamental tone with virtually zero finger-slide squeak. Roundwounds have round outer wire with gaps, allowing bright harmonic overtones to ring freely.",
    "tip": "Flatwound vs Roundwound: Flat ribbon outer wrap = high damping, muted treble, massive fundamental thud (Motown/Reggae)."
  },
  {
    "category": "Active 9V Electronics (1976)",
    "ao": "AO3: Music Man StingRay & Baxandall EQ",
    "text": "What engineering advantage did the 1976 Music Man StingRay's onboard 9V active preamp offer over passive bass controls?",
    "correct": "It converted high-impedance to low-impedance output and featured a Baxandall circuit capable of active boost and cut",
    "wrong": [
      "It increased pickup inductance to 50 henries and introduced an analog optical compressor inside the battery compartment",
      "It rectified alternating audio signals into direct current and removed the need for external speaker power amplification",
      "It completely eliminated the need for bridge grounding wires and prevented RF interference using balanced XLR circuitry"
    ],
    "explanation": "Traditional passive basses only cut frequencies using high-impedance RC networks that suffer high-frequency loss over long cables. Leo Fender's active preamp in the StingRay used an onboard 9V battery to buffer the pickup into a low-impedance output and drive an active Baxandall EQ that could boost or cut bass and treble.",
    "tip": "Active Preamp (StingRay): 9V buffer gives low-Z output (no treble loss over cables) and active boost/cut Baxandall EQ."
  },
  {
    "category": "Playing Technique Biomechanics",
    "ao": "AO3: Larry Graham Slap & Pop Mechanics",
    "text": "How do the biomechanics of Larry Graham's 'slap and pop' technique affect the audio dynamic envelope of an electric bass?",
    "correct": "Striking the string against frets creates a sharp transient spike, while popping unleashes bright percussive snap",
    "wrong": [
      "Striking the string against the body compresses audio dynamics, while popping introduces sustained sub-bass drone",
      "Striking the string with flesh mutes low-frequency overtones, while popping eliminates all high-frequency transients",
      "Striking the string near bridge saddles limits string excursion, while popping generates soft sinusoidal fundamental"
    ],
    "explanation": "Larry Graham invented the technique to simulate drums: striking the string with the bony thumb joint forces it against metal frets, generating a massive initial transient spike like a kick drum. Snapping higher strings with the index finger produces an explosive pop like a snare drum, yielding extreme dynamic range.",
    "tip": "Slap & Pop: Thumb percussion against fretboard (kick) + index pop/snap (snare) = massive dynamic spikes and bright attack."
  },
  {
    "category": "Studio Damping Techniques",
    "ao": "AO3: Motown Foam Mutes & Jamerson",
    "text": "Why did James Jamerson and Motown engineers fit dense foam rubber under the strings at the bridge of the Precision Bass?",
    "correct": "Foam damped string sustain to create a tight, punchy decay that left room for the kick drum in dense mono mixes",
    "wrong": [
      "Foam elevated string action to stop fret buzz and raised total electrical audio output by 12 dB into the console",
      "Foam shielded the bridge assembly from magnetic hum emitted by studio lighting transformers and tape motor relays",
      "Foam softened the mechanical strike of plectrums to prevent magnetic distortion across high-gain tube preamplifier"
    ],
    "explanation": "In 1960s mono Motown recordings, prolonged bass sustain would muddy the mix and clash with the kick drum. Dense neoprene foam under the bridge cover rapidly damped string sustain, providing a defined, percussive thud that anchored the rhythm section cleanly in mono.",
    "tip": "Bridge Foam Mute: Shortens decay and damps sustain, mimicking upright bass decay and clearing low-end space for kick drums."
  },
  {
    "category": "Stage Amplification & Cabinets",
    "ao": "AO3/AO4: Ampeg SVT & 8x10 Enclosure",
    "text": "Why did the 1969 Ampeg SVT feature an 8x10-inch sealed cabinet rather than one or two large 15-inch or 18-inch speakers?",
    "correct": "Eight 10-inch drivers provided large total cone area with lower individual cone mass, yielding fast transient punch",
    "wrong": [
      "Eight 10-inch drivers resonated at 20 Hz fundamental frequency, generating sub-bass power without any amplifier strain",
      "Eight 10-inch drivers eliminated phase cancellation, allowing all drivers to share a single unbaffled ported enclosure",
      "Eight 10-inch drivers lowered cabinet electrical resistance to 0.5 ohms, maximizing power transfer from 300W tube heads"
    ],
    "explanation": "Eight 10-inch speakers provide a huge radiating cone area (equivalent to three 15-inch speakers) but each smaller 10-inch cone has low moving mass, enabling fast transient tracking. Ampeg sealed the cabinet in four separate chambers (infinite baffle), preventing floppy cone travel and delivering punchy, articulate bass.",
    "tip": "Ampeg SVT 8x10: Large collective surface area + low individual cone mass in sealed baffle = rapid transient punch without flub."
  },
  {
    "category": "Direct Injection (DI) Physics",
    "ao": "AO3: Passive DI Transformer Function",
    "text": "What is the primary technical function of the audio transformer inside a professional passive direct box (e.g. Wolfbox)?",
    "correct": "It matches high-impedance unbalanced signals to low-impedance balanced mic inputs while providing galvanic ground lift",
    "wrong": [
      "It amplifies low instrument voltages to line level and removes electrical distortion produced by passive bass pickups",
      "It filters out sub-bass frequencies below 40 Hz and converts high-voltage speaker signals into digital PCM bitstreams",
      "It delays instrument signals by 5 milliseconds to synchronize acoustic amplifier sound with console multitrack tracks"
    ],
    "explanation": "A passive DI box uses a high-grade step-down transformer (like Triad or Jensen). It converts the high-impedance (high-Z) unbalanced instrument signal into a low-impedance (low-Z) balanced mic-level signal to prevent treble loss across long studio snakes, and provides galvanic isolation (ground lift) to eliminate ground loop hum.",
    "tip": "Passive DI Box: Impedance matching (high-Z to low-Z), signal balancing, and galvanic isolation (ground lift) to kill hum."
  },
  {
    "category": "Multi-Track Studio Engineering",
    "ao": "AO3: DI & Miked Amp Phase Alignment",
    "text": "When simultaneously recording an electric bass with a DI box and a miked speaker cabinet, why must tracks be phase-aligned?",
    "correct": "Acoustic latency from speaker to mic delays the mic track behind the instant DI signal, causing comb filtering in lows",
    "wrong": [
      "DI transformers invert signal polarity automatically, causing complete cancellation of fundamental frequencies on solo",
      "Speaker magnetic coils introduce 90-degree phase shift, creating harmonic distortion across stereo monitoring consoles",
      "Preamp gain differences cause clipping distortion, generating high-frequency digital jitter during multitrack mixing"
    ],
    "explanation": "Electrical signals through a DI box travel at near light speed, reaching the DAW converter instantly. Sound from the amp speaker takes ~1 ms per foot to reach the microphone (e.g. 3 ms at 3 feet). Combining these tracks causes phase interference and comb filtering, thinning the low bass. Shifting the mic track earlier aligns waveforms.",
    "tip": "Bass DI + Mic Tracking: Acoustic air latency delays the mic track relative to the DI; waveform alignment prevents comb filtering."
  },
  {
    "category": "Extended Range Engineering",
    "ao": "AO3/AO4: 5-String Bass & Low-B Physics",
    "text": "Why do modern 5-string basses often adopt an extended 35-inch scale length or multi-scale (fanned-fret) fingerboards?",
    "correct": "Increasing scale length provides sufficient string tension to vibrate at 30.9 Hz without excessive floppiness or fret buzz",
    "wrong": [
      "Increasing scale length lowers string tension, allowing players to bend low notes across two whole octaves with ease",
      "Increasing scale length reduces neck relief curvature, completely eliminating the need for internal steel truss rod bars",
      "Increasing scale length boosts pickup output voltage, converting passive single-coil pickups into active humbuckers"
    ],
    "explanation": "The fundamental of a low B string is 30.9 Hz. On a standard 34-inch bass, the heavy .130 gauge string lacks sufficient tension, feeling loose and producing inharmonic, muddy overtones. Extending the scale to 35 inches (or up to 37 inches on fanned-fret basses) increases tension, ensuring a tight, punchy, articulate Low-B.",
    "tip": "5-String Bass (Low-B): 35\" extended or fanned-fret scale maintains high physical tension, preventing floppy strings and mud at 30.9 Hz."
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

# Clean up any leftover titles in head/header
new_content = new_content.replace('The Electric Guitar • Edexcel Component 3 Specification Quiz | Music Tech Guru', 'The Bass Guitar • Edexcel Component 3 Specification Quiz | Music Tech Guru')
new_content = new_content.replace('The Electric Guitar: Anatomy, Physics & History', 'The Bass Guitar: History, Transducers & Low-End Engineering')
new_content = new_content.replace('The Electric Guitar', 'The Bass Guitar')

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Generated {OUT} ({len(new_content)} bytes, {len(questions)} balanced questions)")
