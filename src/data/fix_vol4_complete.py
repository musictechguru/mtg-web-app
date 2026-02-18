import json
import os

def fix_vol4_complete():
    path = '/Users/thorhouse/Edexcel_MT_Revision/mtg-web-app/src/data/dictionary_quizzes.json'
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    vol4 = next((v for v in data['volumes'] if v['id'] == 'vol4'), None)
    if not vol4: return

    def get_topic(tid):
        for part in vol4['parts']:
            for topic in part['topics']:
                if topic['id'] == tid: return topic
        return None

    # --- Topic 1: SAMPLE EDITING (v4_t1) ---
    t1 = get_topic('v4_t1')
    if t1:
        print("Fixing Topic 1: Editing")
        qs = t1['levels']['basic']
        updates = [
            # Q1: Trimming
            ("Trimming: Removing silence or unwanted noise from the start/end of a sample. Essential for tight timing.", 
             {"text": "A sloppy start ruins the groove.", "author": "Editing 101"}, "/images/svg/waveform_time_domain.svg", "Trim"),
            # Q2: Zero Crossing
            ("Zero Crossing: The point where the waveform line touches the center (0dB). Edits here are silent.", 
             {"text": "Always cut at the zero line.", "author": "Audio Engineering"}, "/images/svg/waveform_time_domain.svg", "Zero Cross"),
            # Q3: Clicks
            ("Clicks/Pops: Occur when you cut a waveform where it has energy (not at zero). The speaker cone snaps back, causing a click.", 
             {"text": "Snap, crackle, pop is bad audio.", "author": "Mixing"}, "/images/svg/waveform_time_domain.svg", "Bad Edit"),
            # Q4: Fade In
            ("Fade In: Gradually raising volume from silence. Removes clicks at the start of a sample if a zero-crossing isn't perfect.", 
             {"text": "Smooth the entry.", "author": "Editing"}, "/images/svg/waveform_time_domain.svg", "Fade In"),
            # Q5: Fade Out
            ("Fade Out: Gradually lowering volume to silence. essential for natural-sounding endings to samples.", 
             {"text": "Don't let the audio fall off a cliff.", "author": "Editing"}, "/images/svg/waveform_time_domain.svg", "Fade Out"),
            # Q6: Percussion Fade
            ("Micro-fades: A very short (1-5ms) fade out prevents clicks on drum samples without softening the transient punch.", 
             {"text": "Invisible edits are the best edits.", "author": "Drum Editing"}, "/images/svg/waveform_time_domain.svg", "Micro Fade"),
            # Q7: Reverse
            ("Reverse: Playing audio backwards. Used for FX, swells (reverse cymbals), or psychedelic vocals.", 
             {"text": "Backwards audio creates suction tones.", "author": "Sound Design"}, "/images/svg/waveform_time_domain.svg", "Reverse"),
            # Q8: Rev Cymbal
            ("Reverse Cymbal: The classic EDM transition. The swelling noise builds tension leading into a drop.", 
             {"text": "The whoosh before the bang.", "author": "EDM Production"}, "/images/svg/waveform_time_domain.svg", "Swell"),
            # Q9: Crossfade Loop
            ("Crossfade Loop: Blending the end of a loop into its start to hide the seam. Essential for sustained pads/drones.", 
             {"text": "Make the circle unbroken.", "author": "Looping"}, "/images/svg/waveform_time_domain.svg", "X-Fade"),
            # Q10: Safety
            ("Destructive vs Non-Destructive: Always keep a backup. Once you destructively silence a section, it's gone forever.", 
             {"text": "Save early, save often.", "author": "Digital Hygiene"}, "/images/svg/waveform_time_domain.svg", "Backup")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    # --- Topic 2: PROCESSING (v4_t2) ---
    t2 = get_topic('v4_t2')
    if t2:
        print("Fixing Topic 2: Processing")
        qs = t2['levels']['basic']
        updates = [
            # Q1: Normalize
            ("Normalization: Analyzing a file for its loudest peak and raising the WHOLE file so that peaks hits 0dB (or set target).", 
             {"text": "Maximize volume without changing dynamics.", "author": "Mastering"}, "/images/svg/dbfs_meter.svg", "Normalize"),
            # Q2: Target
            ("Peak Level: Usually 0dBFS or -0.1dBFS. If you go higher, you clip.", 
             {"text": "Use the whole bit depth.", "author": "Recording"}, "/images/svg/dbfs_meter.svg", "Peak"),
            # Q3: DC Offset
            ("DC Offset: When a recording is 'off-center', hovering above or below the 0-line. Caused by bad electrical grounding.", 
             {"text": "DC offset eats your headroom.", "author": "Electronics"}, "/images/svg/waveform_time_domain.svg", "DC Offset"),
            # Q4: Issues
            ("DC Issues: It causes clicks when editing and reduces available headroom (volume) before clipping.", 
             {"text": "Center your waveform.", "author": "Tech Tip"}, "/images/svg/waveform_time_domain.svg", "Offset Click"),
            # Q5: Destructive
            ("Destructive Editing: Changes the actual file data on the hard drive. Normalization is often destructive in older editors.", 
             {"text": "Commitment is scary but necessary.", "author": "Old School"}, "/images/svg/waveform_time_domain.svg", "Destructive"),
            # Q6: Non-Destructive
            ("Non-Destructive: The DAW remembers your instructions (volume change) but leaves the source file alone. Industry standard.", 
             {"text": "Undo is your best friend.", "author": "DAW Workflow"}, "/images/svg/waveform_time_domain.svg", "Non-Destructive"),
            # Q7: Standard
            ("DAW Workflow: Modern DAWs (Logic, Pro Tools) work non-destructively to allow endless experimentation.", 
             {"text": "Flexibility is key to creativity.", "author": "Production"}, "/images/svg/midi_piano_roll.svg", "DAW"),
            # Q8: Norm Use
            ("When to Normalize: Good for individual samples. Bad for mixing (it ruins your fader balance).", 
             {"text": "Don't normalize track by track.", "author": "Mixing"}, "/images/svg/dbfs_meter.svg", "Gain Staging"),
            # Q9: DC Removal
            ("Fixing DC: Use a 'Remove DC Offset' function or a High Pass filter (cutting below 10Hz) to recenter the wave.", 
             {"text": "Filter out the DC.", "author": "Cleanup"}, "/images/svg/eq_high_pass.svg", "HPF Fix"),
            # Q10: Pitch Change
            ("Normalization Myth: Normalization affects VOLUME (Amplitude) only. It never changes pitch or EQ balance.", 
             {"text": "Louder, not different.", "author": "Audio Myths"}, "/images/svg/dbfs_meter.svg", "Volume Only")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    # --- Topic 3: BIT DEPTH (v4_t3) ---
    t3 = get_topic('v4_t3')
    if t3:
        print("Fixing Topic 3: Bit Depth")
        qs = t3['levels']['basic']
        updates = [
            ("Bit Depth: The resolution of AMPLITUDE (Volume). Think of it like steps on a ladder. More bits = more steps = smoother volume.", {"text": "Bits are volume steps.", "author": "Digital Basics"}, "/images/svg/quantization_steps.svg", "Steps"),
            ("CD Quality: 16-bit. This provides 65,536 vertical levels of volume resolution.", {"text": "16-bit is the consumer standard.", "author": "Red Book"}, "/images/svg/quantization_steps.svg", "16-Bit"),
            ("Dynamic Range: The gap between the quietest noise and the loudest peak. 16-bit = 96dB.", {"text": "Dynamic range is the canvas size.", "author": "Mastering"}, "/images/svg/dynamic_range_concept.svg", "Range"),
            ("Approx Range: 96dB for 16-bit. This covers the difference between a pin drop and a jackhammer.", {"text": "96dB is enough for delivery.", "author": "Audio Facts"}, "/images/svg/dynamic_range_concept.svg", "96dB"),
            ("Pro Standard: 24-bit. Used for recording/mixing to lower the noise floor and allow quiet recording without hiss.", {"text": "24-bit is for creation.", "author": "Studio Standard"}, "/images/svg/quantization_steps.svg", "24-Bit"),
            ("6dB Rule: 1 Bit = 6dB of dynamic range. So 24-bit = 144dB.", {"text": "Math: Bits x 6 = dB.", "author": "Rule of Thumb"}, "/images/svg/dynamic_range_concept.svg", "6dB Rule"),
            ("Resolution: Higher bit depth doesn't make it 'brighter' (that's Sample Rate). It makes the quiet parts cleaner (less hiss/grain).", {"text": "Bit depth is about the quiet moments.", "author": "Audio Science"}, "/images/svg/quantization_steps.svg", "Low Level"),
            ("Pro Standard Value: 24-bit (or 32-bit float). Standard for all tracking.", {"text": "Always record at 24-bit.", "author": "Engineer Rule"}, "/images/svg/quantization_steps.svg", "24-bit"),
            ("8-bit Noise: 8-bit only has 256 steps. The rounding errors cause audible grit/hiss/distortion (Quantization Noise).", {"text": "8-bit is for chiptunes, not quartets.", "author": "Game Audio"}, "/images/svg/quantization_steps.svg", "8-Bit Grit"),
            ("Noise Floor: Higher bit depth pushes the noise floor down. 24-bit noise is effectively non-existent (-144dB).", {"text": "Bury the noise.", "author": "Signal Flow"}, "/images/svg/dynamic_range_concept.svg", "Noise Floor")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    # --- Topic 4: SAMPLE RATE (v4_t4) ---
    t4 = get_topic('v4_t4')
    if t4:
        print("Fixing Topic 4: Sample Rate")
        qs = t4['levels']['basic']
        updates = [
            ("Sample Rate: The number of 'snapshots' of audio taken per second. Controls FREQUENCY (Treble) accuracy.", {"text": "Sample rate is the frame rate of audio.", "author": "Analogy"}, "/images/svg/sample_rate_dots.svg", "Samples"),
            ("CD Rate: 44.1kHz. Chosen because it's slightly more than double human hearing (20kHz).", {"text": "44.1 is the magic number.", "author": "Sony/Philips"}, "/images/svg/sample_rate_dots.svg", "44100"),
            ("Video Standard: 48kHz. Used for TV, Movies, and DVD. Math works better with video frame rates.", {"text": "48k is for picture.", "author": "Broadcast"}, "/images/svg/sample_rate_dots.svg", "48000"),
            ("Nyquist Theorem: To capture a frequency X, you must sample at 2X. To capture 20kHz, you need >40kHz.", {"text": "You need two points to make a wave.", "author": "Nyquist"}, "/images/diagram_nyquist_v2.png", "Nyquist Limit"),
            ("Nyquist Freq: The highest pitch you can record. At 48kHz sample rate, Nyquist is 24kHz.", {"text": "The ceiling is half the rate.", "author": "Math"}, "/images/diagram_nyquist_v2.png", "Half Rate"),
            ("CD Limit: 44.1kHz / 2 = 22.05kHz. This covers the full human hearing range (20Hz-20kHz).", {"text": "Perfect for human ears.", "author": "Psychoacoustics"}, "/images/diagram_nyquist_v2.png", "22kHz"),
            ("Sufficiency: We can't hear above 20kHz, so capturing higher frequencies is (arguably) unnecessary for delivery.", {"text": "If a tree falls above 20kHz, nobody hears it.", "author": "Audio Joke"}, "/images/svg/sample_rate_dots.svg", "Hearing Limit"),
            ("Aliasing: If you record a sound ABOVE the Nyquist limit, it 'folds back' as a weird low-frequency robot noise.", {"text": "Aliasing is the enemy of digital audio.", "author": "Converter Design"}, "/images/diagram_aliasing_v2.png", "Foldover"),
            ("High Rates: 96kHz. Captures ultrasonic sound. Better for time-stretching and processing (plugins work better).", {"text": "Oversampling helps plugins sound cleaner.", "author": "DSP"}, "/images/svg/sample_rate_dots.svg", "High Res"),
            ("File Size: 88.2kHz = Double the data of 44.1kHz. Higher rates burn hard drive space fast.", {"text": "Storage is cheap, bandwidth is not.", "author": "IT"}, "/images/svg/sample_rate_dots.svg", "Size")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    # --- Topic 5: QUANTIZATION/FORMATS (v4_t5) ---
    t5 = get_topic('v4_t5')
    if t5:
        print("Fixing Topic 5: Quantization")
        qs = t5['levels']['basic']
        updates = [
            ("Quantization: The process of rounding a fluid analog voltage to the nearest digital 'step' value.", {"text": "Fitting curves into boxes.", "author": "Digitization"}, "/images/svg/quantization_steps.svg", "Rounding"),
            ("Quantization Error: The difference between the real voltage and the rounded digital value. We hear this as noise.", {"text": "Error = Noise.", "author": "Math"}, "/images/svg/quantization_steps.svg", "Error"),
            ("Dithering: Adding random noise to randomized the quantization error. It turns nasty distortion into pleasant hiss.", {"text": "Dither trades distortion for hiss.", "author": "Mastering"}, "/images/svg/dither_concept.svg", "Dither Noise"),
            ("When to Dither: ONLY when reducing bit depth (e.g., 24-bit -> 16-bit) at the very end of mastering.", {"text": "Dither once, dither last.", "author": "Golden Rule"}, "/images/svg/dither_concept.svg", "Final Step"),
            ("WAV/AIFF: Uncompressed. The full, raw data. Large files, perfect quality.", {"text": "WAV is the master tape.", "author": "Format"}, "/images/svg/midi_piano_roll.svg", "WAV"),
            ("MP3/AAC: Lossy. Discards 'invisible' data to shrink file size by 10x. Sound quality degrades.", {"text": "MP3 is for convenience, not quality.", "author": "Formats"}, "/images/svg/midi_piano_roll.svg", "MP3"),
            ("FLAC/ALAC: Lossless. Like ZIP for audio. Compresses size (50%) but unzips to identical original quality.", {"text": "FLAC: Small size, zero compromise.", "author": "Archivists"}, "/images/svg/midi_piano_roll.svg", "FLAC"),
            ("0dBFS: 'Full Scale'. The absolute ceiling of digital audio. You cannot go above 0.", {"text": "0 is the roof.", "author": "Metering"}, "/images/svg/dbfs_meter.svg", "Ceiling"),
            ("Clipping: Going past 0dBFS squares the waveform, creating harsh, unpleasant digital distortion.", {"text": "Digital clipping is rarely musical.", "author": "Mixing"}, "/images/svg/dbfs_meter.svg", "Clip"),
            ("Fixing Clipping: Impossible. Once the waveform is flattened, the data is lost. You must re-record.", {"text": "You can't un-toast toast.", "author": "Life Lesson"}, "/images/svg/quantization_steps.svg", "Flat Top")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    # --- Topic 6: LOOPING (v4_t6) ---
    t6 = get_topic('v4_t6')
    if t6:
        print("Fixing Topic 6: Looping")
        qs = t6['levels']['basic']
        updates = [
            ("Root Note: The key the sample was recorded at. If recorded at C3, pressing C3 plays it at normal speed.", {"text": "Know your root.", "author": "Sampler Map"}, "/images/svg/waveform_time_domain.svg", "Root"),
            ("Middle C: Note 60 is standard C4 (Yamaha) or C3 (Roland). It's the center of the keyboard.", {"text": "C3 or C4? The eternal debate.", "author": "MIDI Standard"}, "/images/svg/midi_piano_roll.svg", "Note 60"),
            ("Pitch Up: To play higher, the sampler speeds up playback (like a tape). The sample gets shorter.", {"text": "Higher = Faster = Shorter.", "author": "Physics"}, "/images/svg/waveform_time_domain.svg", "Fast Play"),
            ("Pitch Down: To play lower, the sampler slows down playback. The sample gets longer and duller.", {"text": "Lower = Slower = Longer.", "author": "Physics"}, "/images/svg/waveform_time_domain.svg", "Slow Play"),
            ("Looping: Repeating a section of audio (Sustain Loop) allows a short sample to play indefinitely like a synth.", {"text": "Loops defeat time.", "author": "Sampling"}, "/images/svg/waveform_time_domain.svg", "Sustain Loop"),
            ("Loop Stages: Attack (One shot) -> Loop (Repeats while holding key) -> Release (Plays after key lift).", {"text": "A-L-R structure.", "author": "Sampler ADSR"}, "/images/svg/compression_attack_release.svg", "Loop Points"),
            ("Loop Points: Must be at Zero Crossings to avoid 'click-click-click' on every cycle.", {"text": " seamless loop is an art form.", "author": "Sound Design"}, "/images/svg/waveform_time_domain.svg", "Loop Click"),
            ("Ping-Pong: Loop plays Forward -> Backward -> Forward. Good for smooth pads as it avoids abrupt jumps.", {"text": "Ping-pong hides the seam.", "author": "Loop Trick"}, "/images/svg/waveform_time_domain.svg", "Ping Pong"),
            ("Efficiency: A 2-second flute sample can sustain for 5 minutes with a loop. Saves massive RAM.", {"text": "Sampling is resource management.", "author": "Old School"}, "/images/svg/waveform_time_domain.svg", "RAM Save"),
            ("Crossfade Loop: Fading the end into the start. The best way to make a smooth loop from a complex sound.", {"text": "Smear the join.", "author": "Technique"}, "/images/svg/waveform_time_domain.svg", "X-Fade")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    # --- Topic 7: MULTISAMPLE (v4_t7) ---
    t7 = get_topic('v4_t7')
    if t7:
        print("Fixing Topic 7: Multisample")
        qs = t7['levels']['basic']
        updates = [
            ("Multisampling: Recording many samples across the keyboard so no single sample has to be pitch-shifted too far.", {"text": "Avoid the munchkins.", "author": "Sampling Rule"}, "/images/svg/midi_velocity.svg", "Map"),
            ("Velocity Layers: Recording Soft, Medium, and Loud hits for *every* note. Triggered by how hard you play.", {"text": "Dynamics are not just volume, they are tone.", "author": "Piano Tech"}, "/images/svg/midi_velocity.svg", "Layers"),
            ("MIDI Velocity: 0-127. 127 is the hardest hit. 1 is practically silent.", {"text": "127 steps of expression.", "author": "MIDI"}, "/images/svg/midi_velocity.svg", "Vel Range"),
            ("Realism: A real piano sounds darker when played soft and bright when played loud. Velocity layers capture this.", {"text": "Volume is easy. Timbre is hard.", "author": "Sampling"}, "/images/svg/midi_velocity.svg", "Timbre"),
            ("Round Robin: Alternating samples for the same note. Prevents the 'machine gun' effect of hearing the identical recording twice.", {"text": "No two snares hits are identical.", "author": "Drummer"}, "/images/svg/waveform_time_domain.svg", "Round Robin"),
            ("Machine Gun Effect: The robotic stutter when a single sample is re-triggered rapidly. Round Robin fixes this.", {"text": "Robots don't groove.", "author": "Feel"}, "/images/svg/waveform_time_domain.svg", "Machine Gun"),
            ("Key Zone: The range of keys that trigger a specific sample (e.g., C3 sample covers B2 to D3).", {"text": "Mapping the keyboard.", "author": "Sampler"}, "/images/svg/midi_piano_roll.svg", "Zone"),
            ("Vel Crossfade: Blending two velocity layers (e.g., Soft and Med) so you don't hear a sudden jump in tone.", {"text": "Smooth transitions.", "author": "Programming"}, "/images/svg/midi_velocity.svg", "X-Fade"),
            ("Library Size: A deep piano library can be 50GB+ because of thousands of velocity layers and round robins.", {"text": "Storage is cheap, realism is expensive.", "author": "Modern Audio"}, "/images/svg/midi_velocity.svg", "Gigabytes"),
            ("Tradeoff: More layers = More Realism but More RAM/CPU usage.", {"text": "Balance power and performance.", "author": "System Spec"}, "/images/svg/eq_bell_q_factor.svg", "RAM")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    # --- Topic 8: TIME/PITCH (v4_t8) ---
    t8 = get_topic('v4_t8')
    if t8:
        print("Fixing Topic 8: Time/Pitch")
        qs = t8['levels']['basic']
        updates = [
            ("Time Stretch: Changing Tempo without changing Pitch. Making a vocal slower but keeping it in the same key.", 
             {"text": "Elastic Audio changed editing forever.", "author": "Ableton"}, "/images/svg/waveform_time_domain.svg", "Stretch"),
            ("Pitch Shift: Changing Pitch without changing Tempo. Making a vocal higher but not faster.", 
             {"text": "Auto-Tune logic.", "author": "Pop Music"}, "/images/svg/waveform_time_domain.svg", "Shift"),
            ("Traditional: Old methods (tape speed) linked Pitch and Time. Faster = Higher. Slower = Lower.", 
             {"text": "Physics links time and pitch.", "author": "Tape Op"}, "/images/svg/waveform_time_domain.svg", "Tape Speed"),
            ("Artifacts: Bad time-stretching sounds metallic, phasey, or bubbly (like underwater audio).", 
             {"text": "Artifacts are the glitches in the matrix.", "author": "Listening"}, "/images/svg/waveform_time_domain.svg", "Glitches"),
            ("Paulstretch: An extreme algorithm that smears audio into 800% slowed ambient textures.", 
             {"text": "Turn a Justin Bieber song into a Hans Zimmer score.", "author": "Internet Meme"}, "/images/svg/waveform_time_domain.svg", "Ambient"),
            ("Formant: The 'throat size' of a sound. Preserving formants stops pitch-shifted vocals sounding like chipmunks.", 
             {"text": "Keep the singer human.", "author": "Vocal FX"}, "/images/svg/waveform_time_domain.svg", "Formant"),
            ("DJing: Time stretching allows mixing a 120BPM track into a 128BPM set without changing the key.", 
             {"text": "Key lock is essential.", "author": "DJ Tech"}, "/images/svg/midi_piano_roll.svg", "Warping"),
            ("Limits: Stretching more than 10-15% usually causes noticeable quality loss.", 
             {"text": "Don't push it too far.", "author": "Golden Rule"}, "/images/svg/waveform_time_domain.svg", "Limits"),
            ("Algorithms: Complex math (Granular or FFT) chops audio to insert/remove silence for stretching.", 
             {"text": "Math vs Music.", "author": "DSP"}, "/images/svg/waveform_time_domain.svg", "Granular"),
            ("Chipmunk Effect: High pitch shift shrinkage of formants. Sounding small and squeaky.", 
             {"text": "Alvin and the Chipmunks: The first pitch shift stars.", "author": "History"}, "/images/svg/waveform_time_domain.svg", "Chipmunk")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})


    # --- Topic 9: MIDI FUNDAMENTALS (v4_t9) ---
    t9 = get_topic('v4_t9')
    if t9:
        print("Fixing Topic 9: MIDI Fund")
        qs = t9['levels']['basic']
        updates = [
            ("MIDI: Musical Instrument Digital Interface. A language for instruments to speak to computers.", {"text": "MIDI is the sheet music, not the CD.", "author": "Analogy"}, "/images/svg/midi_piano_roll.svg", "Acronym"),
            ("Data Not Audio: MIDI cables carry NUMBERS (Note 60, Velocity 100), not SOUND waves.", {"text": "You can't hear a MIDI cable.", "author": "Fact"}, "/images/svg/midi_piano_roll.svg", "Data Stream"),
            ("History: 1983. Dave Smith and Ikutaro Kakehashi changed the world by standardizing synth comms.", {"text": "Before 83, nothing talked to anything.", "author": "History"}, "/images/svg/midi_piano_roll.svg", "1983"),
            ("Channels: 16 Channels per cable. You can control 16 different instruments on one wire.", {"text": "16 lanes on the highway.", "author": "MIDI Spec"}, "/images/svg/midi_piano_roll.svg", "16 Ch"),
            ("Controller: A device (keyboard, drum pad) that makes no sound itself, but sends MIDI messages to software.", {"text": "The controller is the steering wheel.", "author": "Setup"}, "/images/svg/midi_piano_roll.svg", "Keyboard"),
            ("MIDI IN: Input. Where data enters the device.", {"text": "In puts.", "author": "Mnemonic"}, "/images/svg/midi_piano_roll.svg", "Port In"),
            ("MIDI OUT: Output. Where data generated by THIS device leaves.", {"text": "Out puts.", "author": "Mnemonic"}, "/images/svg/midi_piano_roll.svg", "Port Out"),
            ("MIDI THRU: Through. Passes a copy of what came into the IN port. Used to chain devices.", {"text": "Thru goes through.", "author": "Mnemonic"}, "/images/svg/midi_piano_roll.svg", "Port Thru"),
            ("File Size: Tiny. A 5 minute MIDI song is like 10KB. MP3 is 5MB. WAV is 50MB.", {"text": "MIDI is lightweight.", "author": "Data"}, "/images/svg/midi_piano_roll.svg", "Small File"),
            ("Editability: You can change the notes, timing, or instrument AFTER recording. impossible with audio.", {"text": "MIDI is liquid audio.", "author": "Production"}, "/images/svg/midi_velocity.svg", "Piano Roll")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    # --- Topic 10: MIDI MESSAGES (v4_t10) ---
    t10 = get_topic('v4_t10')
    if t10:
        print("Fixing Topic 10: MIDI Msgs")
        qs = t10['levels']['basic']
        updates = [
            ("Note Messages: Note On (Start playing) and Note Off (Stop playing).", {"text": "Binary music.", "author": "Code"}, "/images/svg/midi_piano_roll.svg", "On Off"),
            ("Note On: 'Key 60, Velocity 100, Channel 1'. Only 3 bytes of data.", {"text": "Efficient coding.", "author": "Tech"}, "/images/svg/midi_piano_roll.svg", "Data"),
            ("Middle C: Note 60. The references point.", {"text": "Start at 60.", "author": "Standard"}, "/images/svg/midi_piano_roll.svg", "C4"),
            ("Note Range: 0 (C-2) to 127 (G8). Covers far more than a grand piano (88 keys).", {"text": "128 notes total.", "author": "Spec"}, "/images/svg/midi_piano_roll.svg", "Range"),
            ("Velocity: How hard you hit the key. Maps to Volume usually, but can map to filter brightness.", {"text": "Velocity is expression.", "author": "Playing"}, "/images/svg/midi_velocity.svg", "Vel"),
            ("Vel Range: 0-127. 7-bit resolution.", {"text": "127 levels of loud.", "author": "Math"}, "/images/svg/midi_velocity.svg", "127"),
            ("Aftertouch: Pressure AFTER the note is held. Digging into the keys to add vibrato or swell.", {"text": "Aftertouch adds soul.", "author": "Vangelis"}, "/images/svg/compression_attack_release.svg", "Pressure"),
            ("Channel AT: The most common type. Pressing any key hard affects ALL held notes (e.g., opens filter).", {"text": "One pressure for all.", "author": "Spec"}, "/images/svg/midi_piano_roll.svg", "Mono AT"),
            ("Note Off Trick: A Note On with Velocity 0 is effectively a Note Off. Many devices use this.", {"text": "Running status optimization.", "author": "Deep Tech"}, "/images/svg/midi_piano_roll.svg", "Vel 0"),
            ("Poly AT: Rare. Each key has its own pressure sensor. Found on CS-80 and modern MPE controllers.", {"text": "Poly Aftertouch is the holy grail.", "author": "Synth Collectors"}, "/images/svg/midi_piano_roll.svg", "MPE")
        ]
        for i, (expl, quote, img_src, img_alt) in enumerate(updates):
            if i < len(qs): qs[i].update({'expert_explanation': expl, 'expert_quote': quote, 'explanation_image': {'src': img_src, 'alt': img_alt}})

    with open(path, 'w') as f:
        json.dump(data, f, indent=4)
    print("Fixes applied to Volume 4.")

if __name__ == "__main__":
    fix_vol4_complete()
