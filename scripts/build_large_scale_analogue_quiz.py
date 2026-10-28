"""
Builds public/large-scale-analogue-interactive-quiz.html
12 Edexcel Component 3 Exam Specification Questions on Large-Scale Analogue Multitrack (1968-1995).
Theme: Deep Warm Walnut/Navy with Amber & Gold accents (#f59e0b / #fbbf24).
Balanced Option Lengths (Zero Length Bias): Diff <= 15 chars across all questions.
"""
import json, re

SRC = 'public/early-multitrack-interactive-quiz.html'
OUT = 'public/large-scale-analogue-interactive-quiz.html'

with open(SRC, 'r', encoding='utf-8') as f:
    quiz_content = f.read()

# Replace titles and meta
quiz_content = quiz_content.replace('Early Multitrack Recording (1964–1969)', 'Large-Scale Analogue Multitrack (1968–1995)')
quiz_content = quiz_content.replace('Early Multitrack (1964–1969)', 'Large-Scale Analogue Multitrack (1968–1995)')
quiz_content = quiz_content.replace('early-multitrack', 'large-scale-analogue')
quiz_content = quiz_content.replace(
    '4-track tape mechanics, reduction bouncing, Sel-Sync, ADT, plate reverb, LA-2A, Fairchild, and psychedelic rock & soul',
    '24-track tape, AC bias calibration, SMPTE sync, SSL in-line desks, VCA automation, 1176 FET, Dolby NR, and close-mic drums'
)

questions = [
  {
    "category": "24-Track Tape Mechanics",
    "ao": "AO3: Magnetic Tape Width & Track Layout",
    "text": "Why did professional recording studios adopt 2-inch wide magnetic tape when upgrading from 8-track to 24-track machines?",
    "correct": "Maintaining adequate track width across 24 tracks preserved high dynamic range, low noise floor, and good separation",
    "wrong": [
      "Operating at 2-inch width doubled the tape rewind speed up to 120 ips to eliminate mechanical tension on pinch rollers",
      "Using 2-inch tape eliminated the requirement for AC bias current application when magnetizing synthetic ferric particles",
      "Passing 2-inch tape across the heads permitted instantaneous digital conversion directly into 24-channel computer memory"
    ],
    "explanation": "To squeeze 24 discrete audio channels onto a single spool of tape without unacceptable signal-to-noise degradation and excessive track-to-track crosstalk, tape width had to expand from 1 inch (standard for 8-track) to 2 inches (standard for 16 and 24-track).",
    "tip": "Tape Width: 2-inch tape allowed 24 tracks to maintain sufficient track width, dynamic range, and channel isolation."
  },
  {
    "category": "Tape Calibration Physics",
    "ao": "AO3: High-Frequency AC Bias",
    "text": "What physical problem in magnetic tape recording is solved by mixing an inaudible ultrasonic AC bias current with audio?",
    "correct": "It overcomes magnetic particle hysteresis around zero flux, linearizing recording and preventing nasty distortion",
    "wrong": [
      "It completely eliminates physical tape hiss across the entire audible frequency spectrum without requiring Dolby units",
      "It doubles the effective high-frequency bandwidth of the tape transport so that ultrasonic harmonics reach 100 kHz",
      "It stabilizes the mechanical rotational speed of the capstan motor, entirely preventing flutter and audible pitch wow"
    ],
    "explanation": "Magnetic tape particles exhibit hysteresis: at low magnetic field strengths near zero, they resist magnetization. Mixing an ultrasonic AC bias current (100–150 kHz) shifts the audio into the linear magnetization region of the tape oxide, eliminating crossover distortion.",
    "tip": "AC Bias: Ultrasonic high-frequency tone (~100-150 kHz) overcomes magnetic hysteresis to ensure linear, low-distortion capture."
  },
  {
    "category": "Machine Synchronization",
    "ao": "AO3: SMPTE Timecode Synchronization",
    "text": "How did studios in the late 1970s link two separate 24-track tape recorders to achieve 46 usable audio recording tracks?",
    "correct": "A dedicated SMPTE timecode track on each machine was read by an external synchronizer to control capstan motor speed",
    "wrong": [
      "Both machines were connected to an analog split snake that transmitted identical electrical AC line phase pulses",
      "Engineers physically spliced the plastic leader tape of both machines together so reels spun at identical revolutions",
      "An internal digital optical sensor read reflective laser timing barcodes pre-printed along the top edge of the tape"
    ],
    "explanation": "SMPTE timecode (LTC) was recorded onto Track 24 of both tape machines. An electronic synchronizer (such as an Adams-Smith or Audio Kinetics) read the timecode and adjusted the capstan motor speed of the slave machine via servo control to lock both transports sample-accurately.",
    "tip": "SMPTE Sync: SMPTE timecode on Track 24 of two 24-track machines allowed 46 usable audio tracks (2 tracks reserved for timecode)."
  },
  {
    "category": "Mixing Console Architecture",
    "ao": "AO3: In-Line Architecture vs Split Desks",
    "text": "What major ergonomic advantage did the SSL 4000 Series 'in-line' console design offer over older 'split' consoles?",
    "correct": "Both channel input and tape monitor return signal paths were housed within the exact same vertical channel strip",
    "wrong": [
      "All analog signal routing was replaced by motorized digital ribbon cables that completely bypassed physical patching",
      "Every channel strip contained its own motorized two-track tape transport embedded directly behind the fader faceplate",
      "Microphone preamplifiers were located entirely inside the live room floor boxes rather than inside the mixing desk"
    ],
    "explanation": "Older 'split' consoles had separate input sections and monitor sections, making 24-track desks over 12 feet long. In-line consoles placed both the Channel path (mic input going to tape) and the Monitor path (tape return feeding the mix) in one vertical strip, saving space and simplifying tracking and mixdown.",
    "tip": "In-Line Consoles: Channel and Monitor paths in one strip; small fader monitors tape while large fader sets tracking/mix levels."
  },
  {
    "category": "Computer Automation",
    "ao": "AO3: SSL VCA Automation & Total Recall",
    "text": "How did Solid State Logic's computer automation system store and execute automated fader level changes during mixing?",
    "correct": "Fader levels were translated into DC control voltages, recorded to floppy disk, and reproduced by internal VCA units",
    "wrong": [
      "Miniature motorized servomotors physically moved every fader knob up and down in direct mechanical sync with tape",
      "Audio signals were written directly into solid-state RAM chips that recalculated track volume during mixdown passes",
      "Optical cameras suspended above the console photographed fader positions every second and restored them automatically"
    ],
    "explanation": "Early SSL automation used VCAs (Voltage Controlled Amplifiers). The console computer read DC control voltages from faders, stored dynamic movements onto 8-inch floppy disks referenced to SMPTE timecode, and adjusted VCA gains on playback without moving physical faders.",
    "tip": "SSL Automation: VCA-based automation stored dynamic gain control voltages on floppy disk synced to SMPTE."
  },
  {
    "category": "Solid-State Dynamics",
    "ao": "AO3: UREI 1176 FET Limiting",
    "text": "Why is the UREI 1176 compressor particularly prized on drum room mics, rock vocals, and electric bass guitar tracks?",
    "correct": "Its solid-state FET circuit delivers ultra-fast microsecond attack times and musical, punchy harmonic saturation",
    "wrong": [
      "Its electro-optical light cell provides very sluggish, transparent leveling that completely eliminates all aggression",
      "Its digital lookahead limiter prevents any transient peaks from ever exceeding a strict digital zero ceiling level",
      "Its variable-mu vacuum tubes soften transients smoothly without producing any odd-order harmonic distortion products"
    ],
    "explanation": "The 1176 uses a Field Effect Transistor (FET) as a variable resistor. It achieves blistering attack times between 20 and 800 microseconds. Pushed hard (or in 'all-buttons-in' mode), its transformer-coupled solid-state circuit adds aggressive, rich harmonic distortion.",
    "tip": "1176 Limiter: FET-based solid-state limiting; ultra-fast attack (20-800 microseconds) and distinctive punchy saturation."
  },
  {
    "category": "Outboard Compression",
    "ao": "AO3: dbx 160 VCA Compression",
    "text": "What distinct compression characteristic made the original dbx 160 compressor a staple for kick drums and bass guitars?",
    "correct": "Its aggressive hard-knee VCA circuit and true RMS level detection clamp down firmly on heavy low-frequency transients",
    "wrong": [
      "Its gentle soft-knee optical circuit gradually attenuates high frequencies while leaving low frequencies unaffected",
      "Its multi-band variable crossover divides the incoming signal into four discrete frequency ranges before compression",
      "Its vacuum tube push-pull circuit introduces warm second-order distortion while preserving uncompressed dynamic peaks"
    ],
    "explanation": "The dbx 160 utilized David Blackmer's custom VCA and RMS level detector. Its fixed hard-knee curve clamps immediately once signal crosses threshold, delivering instantaneous, punchy snap that became the signature sound of 1970s punchy bass guitar and kick drum hits.",
    "tip": "dbx 160: Hard-knee VCA compression with RMS detection; staple for tight kick drum and punchy bass guitar tracks."
  },
  {
    "category": "Noise Reduction Physics",
    "ao": "AO3: Dolby A-Type & Companding",
    "text": "How does Dolby A-type noise reduction eliminate magnetic tape hiss without muffling high-frequency audio transients?",
    "correct": "It boosts low-level signals in four frequency bands during recording and applies identical downward expansion on playback",
    "wrong": [
      "It passes the recorded audio through a steep dynamic low-pass brickwall filter that permanently cuts all top-end noise",
      "It injects an anti-phase hiss waveform onto the magnetic tape that acoustically cancels background noise during tracking",
      "It converts analog audio into frequency-modulated pulses that are immune to magnetic oxide particle hiss on the tape"
    ],
    "explanation": "Dolby A-type is a 4-band compander. During recording, low-level high and mid frequencies are boosted (compressed upward). During playback, an exact inverse downward expansion occurs, dropping the boosted signal back to normal and pushing tape hiss down by 10 to 15 dB.",
    "tip": "Dolby Noise Reduction: Companding process; compresses low-level audio before tape, expands downward on playback to drop hiss."
  },
  {
    "category": "Multi-Mic Drum Tracking",
    "ao": "AO3: Snare Dual-Miking & Phase",
    "text": "Why must the polarity (phase invert) button on the mixing console be engaged on the bottom microphone of a snare drum?",
    "correct": "The bottom diaphragm moves inwards when the top diaphragm moves outwards, causing destructive acoustic phase cancellation",
    "wrong": [
      "The bottom microphone uses phantom power which automatically reverses the positive and negative XLR signal pins",
      "The bottom drum skin vibrates at double the fundamental frequency of the top head, creating extreme phase dissonance",
      "The bottom microphone is always a figure-8 ribbon mic whose rear lobe inherently picks up excessive kick drum spill"
    ],
    "explanation": "When the drum stick strikes the top head downward, the top mic diaphragm compresses inward while the bottom head moves outward toward the bottom mic. The two capsules capture opposite physical polarities; failing to invert phase on one channel causes thin, hollow snare tone.",
    "tip": "Snare Dual-Miking: Inverting the bottom mic polarity prevents destructive low-end phase cancellation."
  },
  {
    "category": "Dynamics & Bleed Control",
    "ao": "AO3: Hardware Noise Gates",
    "text": "How did engineers use Drawmer DS201 noise gates to achieve punchy, isolated tom-tom tracks on 24-track tape mixes?",
    "correct": "The gate muted the tom channels when silent, opening only when a loud strike exceeded the threshold to stop spill",
    "wrong": [
      "The gate applied extreme multiband compression to boost cymbal bleed while attenuating the resonant pitch of the toms",
      "The gate converted the acoustic drum hits into MIDI velocity triggers that played synthesized electronic drum samples",
      "The gate altered capstan tape speed so tom tracks played back slightly ahead of the overheads to eliminate phase lag"
    ],
    "explanation": "Toms are played only intermittently, but their open mics continuously pick up loud cymbal and snare bleed. A noise gate keeps the channel muted until a tom hit crosses the threshold, then opens instantly and clamps shut during pauses using adjustable Attack, Hold, and Release.",
    "tip": "Noise Gating: Silences open microphone channels between drum hits to eliminate cymbal wash and acoustic bleed."
  },
  {
    "category": "Analog Synthesis Milestones",
    "ao": "AO3: Minimoog Subtractive Architecture",
    "text": "Which iconic component of the 1970 Minimoog Model D gave it its famously fat, warm, and resonant bass tone?",
    "correct": "The patented 24 dB/octave 4-pole transistor ladder low-pass filter that naturally saturates when overdriven by 3 VCOs",
    "wrong": [
      "A dual 6-operator digital frequency modulation algorithm that produced glass-like, harmonic bell tones with no aliasing",
      "An internal 8-track magnetic tape replay transport that pulled pre-recorded upright acoustic bass loops over playback heads",
      "A passive high-pass resistor network that removed all frequencies below 150 Hz to avoid overloading studio monitors"
    ],
    "explanation": "Bob Moog's transistor ladder filter (24 dB/octave or 4-pole) is celebrated for its musical resonance. When 3 oscillators are mixed into the ladder filter, the transistors enter gentle harmonic overdrive, producing the thick, warm bass sound foundational to funk, disco, and rock.",
    "tip": "Minimoog: 3 VCOs + patented 24 dB/oct transistor ladder low-pass filter; defined analog synth bass."
  },
  {
    "category": "Consumer Audio Formats",
    "ao": "AO3: The 1982 Compact Disc Standard",
    "text": "What technical specification defined the Red Book Compact Disc (CD) released by Sony and Philips in 1982?",
    "correct": "16-bit word length at 44.1 kHz linear PCM sampling rate, delivering 96 dB dynamic range and zero tape hiss",
    "wrong": [
      "24-bit floating point audio at 96 kHz high-resolution sampling rate with lossy perceptual MP3 compression algorithms",
      "Analog frequency-modulated micro-groove spiral laser tracks read optically by a moving mechanical contact stylus needle",
      "12-bit linear pulse-code modulation at 32 kHz sampling rate designed strictly for mono broadcast speech reproduction"
    ],
    "explanation": "The 1982 Red Book CD standard specified 16-bit linear PCM at 44.1 kHz (allowing frequencies up to 22.05 kHz based on the Nyquist-Shannon theorem). It delivered 96 dB of dynamic range, pristine stereo imaging, and complete freedom from surface crackle and tape hiss.",
    "tip": "Red Book CD (1982): 16-bit / 44.1 kHz PCM; 96 dB dynamic range; eliminated vinyl surface noise and magnetic tape hiss."
  }
]

# Find where const questions = [ ... ]; is in quiz_content
match = re.search(r'const questions\s*=\s*\[[\s\S]*?\];\s*(?:function|let currentQ)', quiz_content)
if not match:
    raise Exception("Could not find questions array in template")

suffix = 'function' if 'function' in match.group(0) else 'let currentQ'
replacement = 'const questions = ' + json.dumps(questions, indent=2) + ';\n\n    ' + suffix

new_content = quiz_content[:match.start()] + replacement + quiz_content[match.end():]

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Generated {OUT} ({len(new_content)} bytes, {len(questions)} balanced questions)")
