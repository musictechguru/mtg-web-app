"""
Builds public/direct-to-tape-interactive-quiz.html
12 Edexcel Component 3 & 4 Exam Specification Questions on Direct to Tape Recording (1950-1963).
Theme: Deep Warm Walnut/Navy with Amber & Gold accents (#f59e0b / #fbbf24).
"""
import json, re

SRC = 'public/folk-interactive-quiz.html'
OUT = 'public/direct-to-tape-interactive-quiz.html'

folk_quiz = open(SRC, encoding='utf-8').read()

# Replace palette: Deep Navy/Walnut with Warm Amber/Gold
folk_quiz = folk_quiz.replace('Acoustic Folk', 'Direct to Tape Recording (1950–1963)')
folk_quiz = folk_quiz.replace('Acoustic &amp; Folk', 'Direct to Tape (1950–1963)')
folk_quiz = folk_quiz.replace('Acoustic & Folk', 'Direct to Tape (1950–1963)')
folk_quiz = folk_quiz.replace('Acoustic Guitar Miking, revival history, 12th fret capture, stereo arrays, optical compression, and folk rock', 'Mono & 2-track tape mechanics, room spill balancing, valve saturation, Sun slapback delay, and 1950s rock & blues')

# Palette colors: replace emerald (#10b981 / #34d399) with amber/gold (#f59e0b / #fbbf24)
for a, b in [
    ('#10b981', '#f59e0b'), ('#34d399', '#fbbf24'), ('#059669', '#d97706'),
    ('16, 185, 129', '245, 158, 11'), ('52, 211, 153', '251, 191, 36'),
    ('#080d0a', '#080e1a'), ('#0f1712', '#0f172a'), ('#142019', '#1e293b')
]:
    folk_quiz = folk_quiz.replace(a, b)

questions = [
  {
    "category": "Tape Mechanics",
    "ao": "AO3: Magnetic Recording Physics",
    "text": "How does reel-to-reel magnetic tape record and store an electrical audio signal?",
    "correct": "The record head's electromagnet aligns microscopic iron-oxide particles along the tape ribbon into magnetic domains matching the input audio AC waveform",
    "wrong": [
      "The record head mechanically cuts a continuous microscopic spiral groove into a plastic lacquer coating layered across the flexible tape ribbon backing",
      "An optical recording laser burns microscopic reflective binary pits into a specialized aluminum foil layer embedded beneath the tape film substrate",
      "The fluctuating audio voltage charges miniature capacitive memory cells arranged in a continuous grid across an electro-conductive plastic tape ribbon"
    ],
    "explanation": "Reel-to-reel tape consists of a plastic film base coated with magnetic iron-oxide or ferric particles. As the tape passes the record head's magnetic gap, the audio signal's fluctuating electromagnetic field magnetizes these particles into corresponding polar patterns."
  },
  {
    "category": "Acoustic Spill",
    "ao": "AO3: Room Balancing Without Headphones",
    "text": "During a 1950s direct-to-mono live tracking session without headphone monitoring, how did engineers balance the level of individual instruments?",
    "correct": "By physically moving instruments and vocalists closer to or farther from shared microphones and utilizing polar pattern null angles in the live room",
    "wrong": [
      "By adjusting individual channel faders and automating digital compression parameters inside the mixing console following the completed recording take",
      "By equipping every musician with isolated in-ear stereo monitoring systems receiving customized balance submixes from the control room console",
      "By inserting aggressive brickwall peak limiters and multi-band dynamic expanders onto every separate microphone preamp channel before tape saturation"
    ],
    "explanation": "In early direct-to-tape sessions with 1 or 2 tracks and no headphone monitoring, acoustic balance was established in the live room itself. Performers stepped toward or back from shared mics, and loud drums were placed in microphone dead spots (nulls)."
  },
  {
    "category": "Studio Effects",
    "ao": "AO3: Tape Slapback Delay",
    "text": "How did producer Sam Phillips generate the iconic 'slapback echo' on Elvis Presley's 1954 Sun Studio recordings?",
    "correct": "By routing audio to a dedicated secondary tape recorder and blending the delayed output from its physical playback head back into the direct mix",
    "wrong": [
      "By inserting an analog bucket-brigade delay effects stompbox pedal with modulated feedback repeats directly between the vocal microphone and desk",
      "By feeding the console auxiliary send into a digital stereo reverb processor configured with a 100 ms pre-delay and reverse-gated decay envelope",
      "By routing the recorded track through a synchronized dual-tap digital ping-pong delay plugin locked to an eighth-note tempo subdivision grid"
    ],
    "explanation": "Slapback delay was produced by the physical distance between the record head and playback head on a dedicated second tape recorder (such as an Ampex 350). At 15 inches per second, this physical head gap created a single crisp repetition delayed by approximately 80 to 120 ms."
  },
  {
    "category": "Transducers",
    "ao": "AO3: The Humbucking Pickup",
    "text": "Why does a humbucking guitar pickup (developed by Seth Lover at Gibson in 1957) eliminate 50/60 Hz mains interference while preserving the guitar signal?",
    "correct": "Its two coils have opposing magnetic polarities and reverse windings, causing common-mode mains hum to cancel out while audio signals combine in phase",
    "wrong": [
      "It houses an internal active preamplifier circuit powered by a 9V battery with an active notch filter calibrated strictly to eliminate 50/60 Hz hum",
      "It utilizes internal acoustic chambering carved inside the guitar body to reflect external electromagnetic radio interference away from steel strings",
      "It fully converts the vibrating string's magnetic output into digital optical pulses using internal photo-sensors before sending audio to the amplifier"
    ],
    "explanation": "In a humbucker (Reverse-Wound, Reverse-Polarity / RWRP), external electromagnetic hum hits both coils identically and is subtracted out via common-mode rejection. Because both the magnet orientation and coil wiring are inverted for the strings, the string signals reinforce each other (+6 dB)."
  },
  {
    "category": "Landmark Instruments",
    "ao": "AO4: The Precision Bass",
    "text": "What revolutionary technological advantage did Leo Fender's Precision Bass introduce when released in 1951?",
    "correct": "A fretted solid-body electric instrument that eliminated intonation errors and amplified clean, powerful low-end over loud rock drum kits",
    "wrong": [
      "A hollow-body acoustic upright cello design equipped with dual piezoelectric contact pickups designed to prevent high-frequency feedback screams",
      "A six-string baritone guitar tuned in perfect fourths with built-in analog stereo chorus circuitry and balanced low-impedance XLR outputs",
      "An analog synthesizer pedalboard generating low-frequency square-wave sub-bass tones triggered through mechanical foot switches on the stage floor"
    ],
    "explanation": "Before 1951, bassists played acoustic upright double basses that struggled to compete with amplified electric guitars and loud drum kits. Fender's Precision Bass featured frets (ensuring 'precise' pitch) and an electromagnetic pickup delivering tight, amplified bass punch."
  },
  {
    "category": "Multitrack Evolution",
    "ao": "AO3: Multi-Channel vs Multi-Track",
    "text": "What was the key technical limitation of early 1950s 2-track 'half-track' tape recorders compared to modern multitrack systems?",
    "correct": "Both tracks had to be recorded simultaneously in a single live take; performers could not overdub onto Track 2 while listening to Track 1 in perfect sync",
    "wrong": [
      "The recording tape could only capture audio frequencies above 5 kHz, requiring a mechanical wax phonograph cylinder to store low-frequency bass energy",
      "Any electrical signal recorded onto Track 1 automatically triggered an accidental magnetic crosstalk that completely erased audio stored on adjacent Track 2",
      "The tape transport ran exclusively on internal rechargeable batteries that overheated and limited tracking takes to a maximum duration of 30 seconds"
    ],
    "explanation": "Early 2-track machines were multi-channel simultaneous recorders, not multitrack overdubbing systems. Monitoring during playback occurred at the playback head, which was physically positioned after the record head, creating a delay that made synchronous overdubbing impossible."
  },
  {
    "category": "Multitrack Evolution",
    "ao": "AO3: Sel-Sync Overdubbing",
    "text": "How did Les Paul's invention of 'Sel-Sync' (Selective Synchronization) solve the latency problem of multitrack overdubbing on tape machines?",
    "correct": "It allowed the record head on previously tracked channels to act temporarily as a playback monitor head, enabling performers to overdub in perfect alignment",
    "wrong": [
      "It automatically accelerated the capstan drive motor during overdubbing passes to compensate mechanically for physical acoustic delays inside the headphones",
      "It inserted digital lookahead memory buffer delays into the mixing console summing buses, delaying the live microphone signal until tape heads were aligned",
      "It delayed the performer's headphone cue mix by a constant 500 ms delay interval, forcing the vocalist to anticipate the rhythm ahead of the tracking pass"
    ],
    "explanation": "By using the record head itself to monitor previously tracked channels in the performer's headphones, Sel-Sync eliminated the record-to-playback physical gap latency, enabling true multitrack overdubbing."
  },
  {
    "category": "Microphones",
    "ao": "AO3: Ribbon Microphones",
    "text": "What acoustic characteristics and polar pattern make classic ribbon microphones (such as the RCA 44BX) particularly suited to 1950s brass and vocal tracking?",
    "correct": "A natural figure-8 bidirectional pattern with deep 90° side nulls and a smooth high-frequency roll-off that tames harsh brass and vocal sibilance",
    "wrong": [
      "A narrow hypercardioid pickup pattern with an aggressive high-frequency boost above 10 kHz that accentuates bright transients and vocal presence",
      "An omnidirectional boundary response design with extreme low-frequency proximity effect engineered strictly for boundary placement on flat floors",
      "A heavy moving-coil dynamic assembly requiring +48V phantom power to achieve high sensitivity and eliminate ambient background room reflections"
    ],
    "explanation": "Ribbon mics use an ultra-light corrugated aluminum ribbon suspended in a magnetic field. They possess a natural figure-8 pattern with extreme -40 dB rejection at the sides (90°/270°) and gentle high-end roll-off that smooths out aggressive brass transients."
  },
  {
    "category": "Valve Electronics",
    "ao": "AO3: Thermionic Overdrive",
    "text": "Why is vacuum tube (valve) distortion on 1950s guitar amplifiers and consoles described as 'warm' compared to solid-state transistor clipping?",
    "correct": "Tubes clip audio waveforms with rounded soft knees that generate musical even-order harmonics, whereas transistors produce sharp square-wave odd harmonics",
    "wrong": [
      "Vacuum tubes generate substantial thermionic heat that physically elevates the operating temperature of incoming audio AC voltages passing through the plate",
      "Solid-state transistor circuits completely eliminate all fundamental frequencies below 300 Hz as soon as input signals exceed linear operating headroom",
      "Valve amplifiers employ negative feedback networks that completely prevent any harmonic distortion components from entering the final recorded signal chain"
    ],
    "explanation": "When pushed beyond their linear headroom, vacuum tubes compress peaks gradually (soft clipping), adding warm second-order harmonic overtones that human ears perceive as musical fullness."
  },
  {
    "category": "Consumer Formats",
    "ao": "AO3: The 45 RPM Single",
    "text": "Why did the 7-inch 45 RPM vinyl single, introduced in 1949, establish the standard 3-minute length for commercial pop and rock 'n' roll songs?",
    "correct": "Wider groove spacing required to handle loud bass and high dynamic levels limited physical playing time to approximately 3 to 3.5 minutes per side",
    "wrong": [
      "Federal radio broadcasting mandates throughout the 1950s imposed severe monetary fines on commercial radio stations playing songs longer than 3 minutes",
      "Microgroove vinyl disc compounds deteriorated and warped due to stylus friction heat whenever playback needle contact exceeded 210 continuous seconds",
      "Standard 1/4-inch studio reel-to-reel master tape pancakes could only physically spool 150 feet of acetate backing before running off the supply reel"
    ],
    "explanation": "Cutting louder bass and wider dynamic range on vinyl requires deeper, wider grooves with greater pitch spacing. On a 7-inch disc spinning at 45 RPM, this acoustic headroom limitation constrained recording engineers to ~3 to 3.5 minutes."
  },
  {
    "category": "Landmark Production",
    "ao": "AO4: Bill Haley & Pythian Temple",
    "text": "Where was Bill Haley and His Comets' groundbreaking 1955 anthem 'Rock Around the Clock' recorded, and how was its acoustic reverberation achieved?",
    "correct": "In Decca's Pythian Temple ballroom studio in New York, using the vast natural acoustic reflections of the ballroom space tracked live to tape",
    "wrong": [
      "In an anechoic soundstage at Bell Telephone Laboratories, using custom artificial digital spring reverberation networks applied in post-production",
      "In a residential bedroom in Nashville, Tennessee, using sound-on-sound multi-track cassette ping-pong bouncing with natural room reflections",
      "In the basement echo vaults of Abbey Road Studios in London, using newly developed synthetic algorithmic EMT plate reverb hardware processors"
    ],
    "explanation": "Produced by Milt Gabler in April 1954, 'Rock Around the Clock' was cut live at Decca's Pythian Temple (a converted ballroom with high plaster ceilings and stone acoustics) direct to mono tape, capturing the explosive room slap and live energy."
  },
  {
    "category": "Outboard Processing",
    "ao": "AO3: Pultec Equalisation",
    "text": "What unique equalization capability makes the 1950s Pultec EQP-1A tube program equalizer famous among recording engineers?",
    "correct": "The ability to simultaneously boost and attenuate the same low frequency, creating a deep resonant low-end boost with a clarifying scoop in the muddy low-mids",
    "wrong": [
      "An integrated brickwall digital high-pass filter that eliminates all subsonic frequencies below 20 Hz with an ultra-steep 96 dB/octave attenuation curve",
      "A frequency-tracking dynamic expansion circuit that automatically detects and follows the moving fundamental pitch of an electric bass guitar in real time",
      "A motorized parametric notch-filtering system containing 32 motorized faders that sweep through resonant frequencies to suppress feedback frequencies"
    ],
    "explanation": "Due to slightly different curves and circuit impedances for the boost and attenuation controls on the Pultec EQP-1A, boosting and attenuating the same frequency creates a resonant low-end punch while simultaneously carving out muddiness around 200–400 Hz."
  }
]

# Replace the questions array in the script cleanly
q_json = json.dumps(questions, indent=2)
start_marker = 'const questions = ['
end_marker = '];\n\n    function shuffle(arr) {'

start_idx = folk_quiz.find(start_marker)
end_idx = folk_quiz.find(end_marker)

if start_idx != -1 and end_idx != -1:
    folk_quiz = folk_quiz[:start_idx] + f'const questions = {q_json};\n\n    function shuffle(arr) {{' + folk_quiz[end_idx + len(end_marker):]
else:
    raise ValueError(f"Markers not found: start={start_idx}, end={end_idx}")

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(folk_quiz)

print(f'Generated {OUT} ({len(folk_quiz)} bytes, {len(questions)} questions)')
