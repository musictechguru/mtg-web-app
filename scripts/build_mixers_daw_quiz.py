"""
Builds public/mixers-daw-interactive-quiz.html
12 Edexcel Component 3 Exam Specification Questions on Mixers & Digital Audio Workstations (DAW) (1980s-Present).
Theme: Deep Charcoal/Navy with Cyan & Electric Blue accents (#06b6d4 / #3b82f6).
Balanced Option Lengths (Zero Length Bias): Diff <= 15 chars across all questions.
"""
import json, re

SRC = 'public/large-scale-analogue-interactive-quiz.html'
OUT = 'public/mixers-daw-interactive-quiz.html'

with open(SRC, 'r', encoding='utf-8') as f:
    quiz_content = f.read()

# Replace titles, headings, and metadata
quiz_content = quiz_content.replace('Large-Scale Analogue Multitrack (1968–1995)', 'Mixers & Digital Audio Workstations (DAW)')
quiz_content = quiz_content.replace('large-scale-analogue', 'mixers-daw')
quiz_content = quiz_content.replace(
    '24-track tape, AC bias calibration, SMPTE sync, SSL in-line desks, VCA automation, 1176 FET, Dolby NR, and close-mic drums',
    'Alesis ADAT, console channel strips, pre/post aux sends, Nyquist theorem, 24-bit dynamic range, dither, VST plugins, Auto-Tune & LUFS'
)

questions = [
  {
    "category": "Modular Digital Multitrack",
    "ao": "AO3: Alesis ADAT Architecture",
    "text": "How did the 1991 Alesis ADAT revolutionize independent music production and project recording studios?",
    "correct": "It recorded 8 uncompressed digital audio tracks onto cheap consumer S-VHS tape cassettes with sample-accurate sync",
    "wrong": [
      "It completely eliminated the requirement for external microphone preamplifiers by utilizing built-in tube circuitry",
      "It converted multitrack analog voltages directly into lossy compressed MP3 audio files stored on internal floppy disks",
      "It physically spliced magnetic tape automatically whenever the engineer pressed the punch-in footswitch on the desk"
    ],
    "explanation": "Released in 1991 for under $4,000, the Alesis ADAT recorded 8 channels of uncompressed 16-bit 48 kHz digital audio onto affordable consumer S-VHS tapes. Up to 16 ADATs could be chained via proprietary 9-pin sync cables to create a sample-accurate 128-track digital studio without generation loss.",
    "tip": "Alesis ADAT (1991): 8 tracks uncompressed 16-bit 48 kHz PCM on S-VHS tape; democratized digital recording for project studios."
  },
  {
    "category": "Console Channel Strip",
    "ao": "AO3: Input Gain & High-Pass Filtering",
    "text": "What is the primary function of the high-pass filter (HPF) located at the top of a console channel strip?",
    "correct": "It attenuates sub-audible low rumble, stage vibrations, and mic handling thumps below 80 Hz without hurting tone",
    "wrong": [
      "It completely eliminates magnetic tape hiss and high-frequency valve thermal noise above 12 kHz across the mix",
      "It dynamically compresses loud vocal transients by triggering a rapid optical gain-reduction photo-resistor cell",
      "It inverts the electrical audio polarity by 180 degrees to resolve acoustic phase cancellation between dual mics"
    ],
    "explanation": "The console high-pass filter (typically set between 75 Hz and 100 Hz with an 18 dB/octave slope) removes unwanted sub-audible low frequency energy—such as mechanical air conditioner rumble, mic stand footsteps, and vocal plosive pops—freeing up electrical headroom and mix clarity.",
    "tip": "HPF / Low-Cut: Cuts rumble and handling thumps below 80 Hz, cleaning low-end headroom and vocal clarity."
  },
  {
    "category": "Parametric Equalisation",
    "ao": "AO3: Q Factor & Surgical Frequency Shaping",
    "text": "In fully parametric console equalisation, what acoustic parameter is adjusted by the 'Q' (Quality Factor) control?",
    "correct": "The bandwidth width of frequencies affected around the center frequency, where high Q creates narrow notches",
    "wrong": [
      "The speed in milliseconds at which the equalizer circuit detects and compresses incoming transient audio peaks",
      "The input impedance matching switch between low-Z dynamic microphones and high-Z direct-injection instrument boxes",
      "The total electrical gain boost or cut applied uniformly across all harmonic octaves of the audible frequency range"
    ],
    "explanation": "Q represents the Quality Factor: Q = Center Frequency / Bandwidth (Δf). A low Q (0.5 to 1.0) provides a broad, musical frequency curve ideal for tonal sweetening. A high Q (5.0 to 10.0 or higher) produces a narrow, surgical notch filter perfect for eliminating room resonances, snare ring, or feedback without disturbing adjacent musical notes.",
    "tip": "Parametric EQ: Gain, Frequency, and Q (Bandwidth). High Q = narrow surgical notch; Low Q = broad musical boost/cut."
  },
  {
    "category": "Console Signal Routing",
    "ao": "AO3: Pre-Fader vs Post-Fader Aux Sends",
    "text": "Why must auxiliary sends feeding musician headphone monitor cue mixes be switched to 'Pre-Fader' mode?",
    "correct": "Fader volume balance changes made by the mixing engineer in the control room will not alter the performers' cue mix",
    "wrong": [
      "Audio signals route directly through internal console stereo compressors before reaching the musician headphone amp",
      "Headphone signals bypass the console channel equalisation circuit to prevent severe high-frequency acoustic feedback",
      "Pre-fader signals convert immediately into digital optical lightpipe pulses to ensure ultra-low headphone cue latency"
    ],
    "explanation": "Pre-fader aux sends tap the audio signal before it reaches the channel fader. When the mixing engineer moves channel faders in the control room to audition solo instruments or adjust mix balance, the performers' headphone monitor levels remain completely unchanged and stable.",
    "tip": "Aux Sends: Pre-fader for Musician Headphone Monitors (fader moves don't affect cue); Post-fader for Reverbs/Delays (wet/dry balance tracks fader)."
  },
  {
    "category": "Console Signal Routing",
    "ao": "AO3: Channel Inserts vs Parallel Aux Sends",
    "text": "What is the technical operational difference between routing an audio signal via a Channel Insert versus an Aux Send?",
    "correct": "An insert breaks the channel signal path to process 100% of audio in series, whereas an aux sends a parallel duplicate",
    "wrong": [
      "An insert connects solely to external analog tape delays, while an aux send exclusively feeds internal plate reverbs",
      "An insert digitizes microphone voltages to AES/EBU format, while an aux send processes balanced analog signals only",
      "An insert operates exclusively after the master stereo fader, while an aux send operates before the channel preamps"
    ],
    "explanation": "A Channel Insert uses a TRS 'send/return' loop that completely breaks the channel signal path to process 100% of the audio in series (standard for compressors, gates, and graphic EQs). An Aux Send splits a portion of the signal into an auxiliary bus in parallel, leaving the dry direct channel signal completely untouched.",
    "tip": "Insert = Serial (100% wet, breaks path: Compressor/Gate/EQ). Aux Send = Parallel (splits signal to bus: Reverb/Delay/Cue)."
  },
  {
    "category": "Digital Console Architecture",
    "ao": "AO3: Word Clock Synchronization & BNC Cabling",
    "text": "Why must all digital audio devices in an interconnected digital studio be synchronized to a single Master Word Clock?",
    "correct": "To lock sample reading timing identically across all digital gear, preventing catastrophic clicks, pops, and jitter",
    "wrong": [
      "To supply +48V phantom power over 75-ohm coaxial cables to active direct boxes and remote condenser studio microphones",
      "To compress all incoming multi-channel digital audio tracks using lossy psychoacoustic algorithms before hard disk write",
      "To automatically align physical motorized faders on slave consoles to match the mechanical speed of analog 24-track tape"
    ],
    "explanation": "Every digital audio converter operates at an exact clock frequency (e.g. 44,100 or 48,000 samples per second). If two digital units (e.g. digital desk, interface, ADAT) are not phase-locked via a master Word Clock over 75-ohm BNC cables, their sample clocks will drift apart, creating dropped samples heard as harsh digital clicks, pops, or clock jitter.",
    "tip": "Word Clock: Master digital clock over 75-ohm BNC prevents sample drift, jitter, and digital clicks/pops across digital gear."
  },
  {
    "category": "PCM Audio Fundamentals",
    "ao": "AO3: The Nyquist-Shannon Sampling Theorem",
    "text": "According to the Nyquist-Shannon theorem, what is the minimum sampling rate required to accurately capture audio up to 20 kHz?",
    "correct": "The sampling rate must be at least 40 kHz (double the highest frequency) to prevent destructive aliasing distortion",
    "wrong": [
      "The sampling rate must equal 20 kHz precisely so that exactly one digital sample is recorded per acoustic waveform cycle",
      "The sampling rate must be at least 96 kHz to ensure that steep analog phase-linear low-pass filtering is unnecessary",
      "The sampling rate must equal the electrical line frequency of 50 Hz multiplied by the total number of audio bit words"
    ],
    "explanation": "The Nyquist-Shannon sampling theorem states that to reconstruct an analog signal accurately without aliasing, the sampling frequency (fs) must be at least twice the highest frequency component present in the signal (fs >= 2 * fmax). For 20 kHz human hearing, the rate must exceed 40 kHz; 44.1 kHz provides a transition band for anti-aliasing filters.",
    "tip": "Nyquist Theorem: Sampling rate >= 2 * highest frequency. For 20 kHz audio, fs >= 40 kHz (CD standard is 44.1 kHz)."
  },
  {
    "category": "Digital Bit Depth",
    "ao": "AO3: 16-Bit vs 24-Bit Dynamic Range",
    "text": "What is the theoretical dynamic range advantage of recording audio at 24-bit resolution compared to 16-bit resolution?",
    "correct": "24-bit provides 144 dB of dynamic range compared to 96 dB for 16-bit, lowering the noise floor and quantization errors",
    "wrong": [
      "24-bit extends upper frequency frequency response from 22.05 kHz up to 96 kHz without requiring high-speed converters",
      "24-bit eliminates all requirement for computer audio interface buffer size management during complex multitrack sessions",
      "24-bit doubles the physical data transfer speed across Thunderbolt cables by compressing multi-channel audio packets"
    ],
    "explanation": "Each bit in linear PCM yields approximately 6.02 dB of dynamic range (Dynamic Range ≈ 6 * N dB). 16-bit offers 96 dB, whereas 24-bit provides 144 dB. This extra 48 dB pushes quantization noise far below analog preamp noise, allowing engineers to track with generous -18 dBFS headroom without fear of digital clipping or noise.",
    "tip": "Bit Depth: 6 dB dynamic range per bit. 16-bit = 96 dB; 24-bit = 144 dB. 24-bit provides headroom and lowers quantization noise."
  },
  {
    "category": "Digital Signal Processing",
    "ao": "AO3: Dither & Truncation Distortion",
    "text": "Why must triangular probability density function (TPDF) dither noise be applied when reducing a mix from 24-bit to 16-bit?",
    "correct": "It eliminates correlated harmonic quantization distortion by converting truncation mathematical errors into benign hiss",
    "wrong": [
      "It boosts the peak stereo master bus volume by +6 dBFS to ensure competitive commercial loudness on streaming services",
      "It automatically corrects subtle vocal pitch inaccuracies by comparing the fundamental voice frequency to a MIDI track",
      "It filters out ultrasonic clock jitter frequencies above 20 kHz before sending digital audio to the stereo D/A monitor DAC"
    ],
    "explanation": "Simply truncating 24-bit words down to 16-bit creates correlated mathematical rounding errors that sound like gritty harmonic distortion during quiet passages and reverb tails. Applying dither—a tiny amount of uncorrelated random white noise (around -90 dBFS)—decorrelates quantization error, replacing distortion with quiet, unnoticeable analog-style hiss.",
    "tip": "Dither: Low-level random noise added during bit-depth reduction (e.g. 24 to 16-bit) to prevent harmonic quantization distortion."
  },
  {
    "category": "DAW Architecture & Latency",
    "ao": "AO3: Hardware Buffer Size & Latency Trade-Off",
    "text": "Why do audio engineers switch DAW hardware buffer sizes between the recording phase and the mixing phase of a project?",
    "correct": "Small buffers minimize monitoring latency during tracking, while large buffers allocate CPU cycles for complex plugins",
    "wrong": [
      "Small buffers permanently lock audio files to grid lines, while large buffers enable continuous slip region crossfades",
      "Small buffers force the DAW audio engine into 16-bit resolution, while large buffers switch internal summing to 64-bit",
      "Small buffers eliminate the need for analog-to-digital conversion, while large buffers activate motorized console faders"
    ],
    "explanation": "During tracking, performers need immediate monitoring without perceptible delay; a small buffer (64–128 samples) yields 1.5–3 ms latency but burdens the CPU. During mixing, latency is irrelevant because tracks are already recorded; a large buffer (512–1024 samples) gives the CPU time to process dozens of heavy virtual instruments and DSP plugins without dropouts.",
    "tip": "DAW Buffers: Low buffer (64-128 samples) = low latency for live tracking; High buffer (512-1024 samples) = CPU power for heavy mix DSP."
  },
  {
    "category": "Vocal Pitch Processing",
    "ao": "AO3: Auto-Tune Phase Vocoders & Retune Speed",
    "text": "How did producers Mark Taylor and Brian Rawling create the iconic vocal effect on Cher's 1998 worldwide hit 'Believe'?",
    "correct": "They set Antares Auto-Tune's retune speed to zero, forcing instantaneous pitch jumps with zero natural portamento glide",
    "wrong": [
      "They ran Cher's dry microphone signal through a high-gain guitar distortion pedal into an overdriven Marshall amplifier",
      "They played Cher's acoustic vocal tape track backward at double tape speed through an analog studio EMT 140 plate reverb",
      "They sampled individual phonemes into an Akai S1000 hardware sampler and triggered syllables via polyphonic MIDI keyboards"
    ],
    "explanation": "In 1998, producers Mark Taylor and Brian Rawling manipulated Antares Auto-Tune by setting the 'Retune Speed' parameter to 0 (fastest setting). Instead of gently guiding slightly off-pitch notes into tune with human portamento, the algorithm snapped notes instantaneously to the nearest chromatic scale step, creating the iconic robotic stepped vocal texture.",
    "tip": "Cher Effect (1998): Antares Auto-Tune retune speed set to 0. Notes snap instantly with zero human glide, creating a stepped robotic tone."
  },
  {
    "category": "Mastering & Delivery Standards",
    "ao": "AO3: LUFS Loudness & True Peak Metering",
    "text": "Why have modern streaming platforms (Spotify, Apple Music) adopted LUFS loudness normalization instead of peak normalization?",
    "correct": "LUFS measures human perceived loudness over time with K-weighting EQ, ending the hyper-compressed CD 'Loudness Wars'",
    "wrong": [
      "LUFS automatically detects and cuts all audio frequencies below 40 Hz and above 16 kHz to conserve server internet bandwidth",
      "LUFS forces music creators to upload only uncompressed mono 16-bit WAV files to ensure consistent playback across mobile devices",
      "LUFS boosts the quietest acoustic passages by +24 dB using upward multi-band compression to defeat ambient background road noise"
    ],
    "explanation": "Sample peak meters only measure instantaneous maximum voltage, which led mastering engineers to hyper-compress tracks to achieve louder perceived volume. LUFS (Loudness Units relative to Full Scale / ITU-R BS.1770) models human ear sensitivity across frequency (K-weighting) and time. Streaming platforms normalize tracks to a consistent level (e.g. -14 LUFS), rewarding dynamic range and rendering hyper-compression futile.",
    "tip": "LUFS & True Peak: Measures perceived loudness with K-weighting; streaming services normalize to ~ -14 LUFS, penalizing hyper-compression."
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

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Generated {OUT} ({len(new_content)} bytes, {len(questions)} balanced questions)")
