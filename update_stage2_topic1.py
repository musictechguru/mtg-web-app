import json

def read_json():
    with open('src/data/course_data.json', 'r') as f:
        return json.load(f)

def write_json(data):
    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)

new_questions = [
    # EASY (1-7)
    {
        "content": "Human hearing range is approximately:",
        "answers": [
            {"text": "20 Hz to 20 kHz", "is_true": "yes"},
            {"text": "10 Hz to 100 kHz", "is_true": "no"},
            {"text": "50 Hz to 5 kHz", "is_true": "no"},
            {"text": "0 dB to 100 dB", "is_true": "no"}
        ],
        "expert_explanation": "20Hz-20kHz is the standard human hearing range. We feel 20Hz as a rumble, and we sense 20kHz as 'air' or brilliance. We lose high-frequency hearing as we age.",
        "expert_quote": {"text": "The 20Hz-20kHz range is our window to the sonic world. Anything outside is felt, not heard.", "author": "Acoustics 101"},
        "img": "/images/Dictiionary_Quiz_image_Pool/diagram_hearing_range_v2.png"
    },
    {
        "content": "XLR cables have how many pins?",
        "answers": [
            {"text": "1 pin", "is_true": "no"},
            {"text": "3 pins", "is_true": "yes"},
            {"text": "100 pins", "is_true": "no"},
            {"text": "2 pins", "is_true": "no"}
        ],
        "expert_explanation": "A standard XLR cable has 3 pins: Pin 1 for Ground (shield), Pin 2 for Hot (+), and Pin 3 for Cold (-). The Hot and Cold pins carry the balanced audio signal, rejecting noise.",
        "expert_quote": {"text": "XLR: The industry standard since the 1950s.", "author": "Audio History"},
        "img": "/images/Dictiionary_Quiz_image_Pool/XLR Cable.png"
    },
    {
        "content": "Phantom power voltage typically requires:",
        "answers": [
            {"text": "9 Volts", "is_true": "no"},
            {"text": "+48 Volts", "is_true": "yes"},
            {"text": "120 Volts", "is_true": "no"},
            {"text": "5 Volts", "is_true": "no"}
        ],
        "expert_explanation": "Condenser microphones require +48V Phantom Power across Pins 2 and 3 of an XLR cable to charge their capsule and power their internal active circuitry.",
        "expert_quote": {"text": "Without phantom power, a condenser microphone is just an expensive paperweight.", "author": "Studio Basics"},
        "img": "/images/svg/phantom_power.svg"
    },
    {
        "content": "Close micing provides:",
        "answers": [
            {"text": "Lots of room sound", "is_true": "no"},
            {"text": "Maximum isolation", "is_true": "yes"},
            {"text": "No direct sound", "is_true": "no"},
            {"text": "Only reverb", "is_true": "no"}
        ],
        "expert_explanation": "Placing a microphone less than a few inches from the source maximizes the direct sound while minimizing bleed from other instruments and the acoustic room reverberation, providing high isolation.",
        "expert_quote": {"text": "Close micing is your first line of defense against room acoustics and bleed.", "author": "Recording Mantra"},
        "img": "/images/Dictiionary_Quiz_image_Pool/mic_placement_snare.png"
    },
    {
        "content": "Stereo recording requires a minimum of:",
        "answers": [
            {"text": "1 microphone", "is_true": "no"},
            {"text": "10 microphones", "is_true": "no"},
            {"text": "2 microphones", "is_true": "yes"},
            {"text": "100 microphones", "is_true": "no"}
        ],
        "expert_explanation": "Stereo recording needs at least two microphones (or a stereo mic with two capsules) routed to Left and Right channels to capture the spatial characteristics and differences in arrival time/intensity.",
        "expert_quote": {"text": "Stereo is the illusion of space created by just two points of reference.", "author": "Acoustic Concepts"},
        "img": "/images/MT Pictures/Mastering_and_production_room_at_Audio_Mix_House,_Studio_D_(13431465744).jpg"
    },
    {
        "content": "Pre-production planning primarily involves:",
        "answers": [
            {"text": "Mixing and Mastering", "is_true": "no"},
            {"text": "No preparation", "is_true": "no"},
            {"text": "Song arrangement and rehearsals", "is_true": "yes"},
            {"text": "Buying new gear", "is_true": "no"}
        ],
        "expert_explanation": "Pre-production is the phase where tempos, keys, arrangements, and instrument choices are finalized before expensive studio time begins. A saved hour here prevents days of pain later.",
        "expert_quote": {"text": "Records are made in pre-production. The studio is just where you document the performance.", "author": "Producer's Guide"},
        "img": "/images/Dictiionary_Quiz_image_Pool/explanation_midi_piano_roll.png"
    },
    {
        "content": "Standard modern bit depth for high quality recording is:",
        "answers": [
            {"text": "8-bit", "is_true": "no"},
            {"text": "24-bit", "is_true": "yes"},
            {"text": "4-bit", "is_true": "no"},
            {"text": "16-bit", "is_true": "no"}
        ],
        "expert_explanation": "24-bit representation offers up to 144dB of dynamic range, which is vastly superior to 16-bit's 96dB. It lowers the noise floor immensely, making extremely loud and quiet passages cleanly recordable.",
        "expert_quote": {"text": "Record at 24-bit. Always. The headroom is worth the hard drive space.", "author": "Industry Standard"},
        "img": "/images/svg/bit_depth_range.svg"
    },
    
    # MEDIUM (8-14)
    {
        "content": "Preamps typically add approximately how much gain?",
        "answers": [
            {"text": "0dB", "is_true": "no"},
            {"text": "1-5dB", "is_true": "no"},
            {"text": "30-60dB", "is_true": "yes"},
            {"text": "200dB", "is_true": "no"}
        ],
        "expert_explanation": "Microphone signals are extremely weak (mic level). A preamp increases this weak signal by 30-60dB to reach standard operating line level for processing and recording.",
        "expert_quote": {"text": "The preamp is the magnifying glass of your audio chain.", "author": "Gain Staging 101"},
        "img": "/images/svg/preamp_gain.svg"
    },
    {
        "content": "Recording exactly at 0dBFS means:",
        "answers": [
            {"text": "Perfect level", "is_true": "no"},
            {"text": "Maximum possible digital level before clipping", "is_true": "yes"},
            {"text": "Silence", "is_true": "no"},
            {"text": "Lots of headroom", "is_true": "no"}
        ],
        "expert_explanation": "In digital audio systems, 0dBFS (Decibels relative to Full Scale) represents the absolute maximum level. Anything exceeding it will be brutally truncated, creating digital clipping.",
        "expert_quote": {"text": "0dBFS is a brick wall. Don't hit the wall.", "author": "Digital Rules"},
        "img": "/images/Dictiionary_Quiz_image_Pool/diagram_signal_flow.png"
    },
    {
        "content": "Recording at -18dBFS average provides:",
        "answers": [
            {"text": "No headroom", "is_true": "no"},
            {"text": "Too much noise", "is_true": "no"},
            {"text": "Good headroom and optimal plugin response", "is_true": "yes"},
            {"text": "Guaranteed clipping", "is_true": "no"}
        ],
        "expert_explanation": "Analog-modeled digital plugins expect nominal input levels around -18dBFS (the digital equivalent of 0 VU). This guarantees plenty of headroom for transient peaks without pushing into harsh digital distortion.",
        "expert_quote": {"text": "Yellow is the new Red in digital gain staging.", "author": "Modern Mixing"},
        "img": "/images/Dictiionary_Quiz_image_Pool/Mic Placement.png"
    },
    {
        "content": "The fundamental frequency of a note is 440Hz. The second harmonic is:",
        "answers": [
            {"text": "220Hz", "is_true": "no"},
            {"text": "440Hz", "is_true": "no"},
            {"text": "880Hz", "is_true": "yes"},
            {"text": "1320Hz", "is_true": "no"}
        ],
        "expert_explanation": "Harmonic frequencies are integer multiples of the fundamental. 440Hz is the 1st harmonic (Fundamental). The 2nd harmonic is 2 * 440Hz = 880Hz, which is an octave higher.",
        "expert_quote": {"text": "Harmonics define the timbre and character of an instrument.", "author": "Acoustics 101"},
        "img": "/images/svg/eq_bell_q_factor.svg"
    },
    {
        "content": "Polarity reverse (phase flip) rotates signal by:",
        "answers": [
            {"text": "90°", "is_true": "no"},
            {"text": "180°", "is_true": "yes"},
            {"text": "360°", "is_true": "no"},
            {"text": "0°", "is_true": "no"}
        ],
        "expert_explanation": "A polarity invert perfectly flips the positive and negative sides of a waveform. When summed with the original non-inverted waveform, complete phase cancellation occurs.",
        "expert_quote": {"text": "The Phase button is your greatest ally when combining multiple mics on one source.", "author": "Studio Practice"},
        "img": "/images/Dictiionary_Quiz_image_Pool/Logic's Phase 2.png"
    },
    {
        "content": "Angle between studio monitors and the listening position should form an equilateral triangle of:",
        "answers": [
            {"text": "90°", "is_true": "no"},
            {"text": "45°", "is_true": "no"},
            {"text": "60°", "is_true": "yes"},
            {"text": "180°", "is_true": "no"}
        ],
        "expert_explanation": "For an accurate stereo image, the left monitor, right monitor, and the listener's head should form a perfect equilateral triangle, with 60-degree angles between all points.",
        "expert_quote": {"text": "The geometry of your room directly dictates the clarity of your mixing.", "author": "Acoustics 101"},
        "img": "/images/Dictiionary_Quiz_image_Pool/diagram_mid_side_v2.png"
    },
    {
        "content": "According to Nyquist theorem, a 48kHz sample rate accurately captures continuous frequencies up to:",
        "answers": [
            {"text": "48kHz", "is_true": "no"},
            {"text": "24kHz", "is_true": "yes"},
            {"text": "96kHz", "is_true": "no"},
            {"text": "12kHz", "is_true": "no"}
        ],
        "expert_explanation": "The Nyquist-Shannon sampling theorem states that to digitally capture an analog frequency flawlessly, the sampling rate must be strictly greater than twice the highest frequency. Thus 48kHz / 2 = 24kHz max frequency.",
        "expert_quote": {"text": "Nyquist taught us that to capture reality, you must sample at twice its highest high.", "author": "Digital Foundations"},
        "img": "/images/svg/sample_rate_dots.svg"
    },
    
    # HARD (15-20)
    {
        "content": "Doubling acoustic amplifier power (watts) increases SPL by:",
        "answers": [
            {"text": "6dB", "is_true": "no"},
            {"text": "3dB", "is_true": "yes"},
            {"text": "10dB", "is_true": "no"},
            {"text": "1dB", "is_true": "no"}
        ],
        "expert_explanation": "Doubling power mathematically equates to a 3dB gain. However, to sound 'twice as loud' to the human ear, you typically need approx +10dB of gain, requiring a tenfold increase in power!",
        "expert_quote": {"text": "Power does not exponentially scale with perceived loudness.", "author": "Acoustic Realities"},
        "img": "/images/MT Pictures/Acoustic Reverb Room.jpg"
    },
    {
        "content": "A microphone outputs -55dBu. With 45dB of preamp gain, the final output is:",
        "answers": [
            {"text": "-100dBu", "is_true": "no"},
            {"text": "-10dBu", "is_true": "yes"},
            {"text": "+45dBu", "is_true": "no"},
            {"text": "-55dBu", "is_true": "no"}
        ],
        "expert_explanation": "Adding 45dB of gain directly to a -55dBu mic level signal raises the level to (-55 + 45) = -10dBu, pushing it heavily towards consumer line level (-10dBV / roughly -7.78dBu).",
        "expert_quote": {"text": "Audio math is simple addition, but the consequences of getting it wrong are massive.", "author": "Signal Flow"},
        "img": "/images/svg/preamp_gain.svg"
    },
    {
        "content": "The Haas effect (precedence effect) creates stereo widening without echo perception when delay is:",
        "answers": [
            {"text": ">100ms", "is_true": "no"},
            {"text": "1-35ms", "is_true": "yes"},
            {"text": "500ms", "is_true": "no"},
            {"text": "Under 1ms", "is_true": "no"}
        ],
        "expert_explanation": "When two identical sounds reach the ear within 1-35 milliseconds apart, the brain fuses them into a single auditory event, perceiving it as spatially wider and originating from the sound that arrived first (precedence).",
        "expert_quote": {"text": "The Haas effect proves our ears merge delayed sounds to map out physical space.", "author": "Psychoacoustics"},
        "img": "/images/Dictiionary_Quiz_image_Pool/haas_effect_visual.svg"
    },
    {
        "content": "At a 96kHz sample rate, a 256 sample buffer creates an intrinsic latency of approximately:",
        "answers": [
            {"text": "2.67ms", "is_true": "yes"},
            {"text": "5.3ms", "is_true": "no"},
            {"text": "10ms", "is_true": "no"},
            {"text": "1.2ms", "is_true": "no"}
        ],
        "expert_explanation": "Latency = Buffer Size / Sample Rate. 256 / 96,000 = 0.00266 seconds, or 2.67ms total one-way playback latency caused purely by audio buffering.",
        "expert_quote": {"text": "Lowering buffer limits latency, but the CPU pays the ultimate processing price.", "author": "Computer Audio"},
        "img": "/images/svg/sample_rate_dots.svg"
    },
    {
        "content": "An ADAT optical lightpipe connection operating at 44.1kHz typically carries:",
        "answers": [
            {"text": "2 channels", "is_true": "no"},
            {"text": "8 channels", "is_true": "yes"},
            {"text": "16 channels", "is_true": "no"},
            {"text": "24 channels", "is_true": "no"}
        ],
        "expert_explanation": "ADAT Lightpipe protocol natively transfers up to 8 channels of uncompressed digital audio simultaneously at 44.1kHz or 48kHz via a single TOSLINK optical fiber cable.",
        "expert_quote": {"text": "ADAT lightpipe allowed small project studios to finally rival professional channel counts.", "author": "Digital Revolution"},
        "img": "/images/Dictiionary_Quiz_image_Pool/Mastering_and_production_room_at_Audio_Mix_House,_Studio_D_(13431465744).jpg"
    },
    {
        "content": "In a balanced connection, interference is cancelled effectively due to:",
        "answers": [
            {"text": "Common Mode Rejection", "is_true": "yes"},
            {"text": "High Impedance", "is_true": "no"},
            {"text": "Electromagnetic Shielding alone", "is_true": "no"},
            {"text": "Capacitive Resistance", "is_true": "no"}
        ],
        "expert_explanation": "A differential amplifier flips the inverted Hot or Cold signal back at the receiving end. This constructively aligns audio while destructively phase-canceling any noise picked up identically on both wires (Common Mode Rejection).",
        "expert_quote": {"text": "Balanced cables don't physically block noise better; they mathematically cancel it out.", "author": "Engineering Facts"},
        "img": "/images/Dictiionary_Quiz_image_Pool/diagram_signal_flow.png"
    }
]

data = read_json()
stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
topic1 = next((t for t in stage2['items'] if "Topic 1" in t.get('title', '')), None)

# Update questions: ensuring formatting of explanation strings to HTML as done in original
for i, q in enumerate(new_questions):
    new_q = q.copy()
    new_q['title'] = f"Q{i+1}: Question {i+1}"
    new_q['type'] = "multi_choice"
    
    # build explanation html
    img_tag = f'<img src="{q["img"]}" alt="Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;" />'
    exp_text = f'<p><strong>Expert Explanation:</strong> {q["expert_explanation"]}</p>'
    quote_text = f'<blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{q["expert_quote"]["text"]}"<br/><strong>- {q["expert_quote"]["author"]}</strong></blockquote>'
    
    new_q['explanation'] = img_tag + exp_text + quote_text
    
    new_questions[i] = new_q

topic1['questions'] = new_questions
write_json(data)
print("Successfully updated course_data.json with fixed and reordered questions!")
