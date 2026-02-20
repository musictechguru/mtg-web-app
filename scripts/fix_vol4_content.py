import json

FIXES = [
    {
        "match": "crossfade loop for a pad sound",
        "img": "/images/svg/sample_looping_crossfade.svg",
        "exp": "Crossfade looping blends the tail end of the loop with the beginning to avoid unnatural clicking and create seamless sustain.",
        "quote": "A good seamless loop is the holy grail of virtual instrument design."
    },
    {
        "match": "preserve editing flexibility",
        "img": "/images/Dictiionary_Quiz_image_Pool/sample_cutting_hq.png",
        "exp": "Non-Destructive Editing creates play-pointers rather than overwriting the source file, guaranteeing you can always undo your edits tomorrow.",
        "quote": "Never permanently destroy the source material unless you are absolutely sure of your commitment."
    },
    {
        "match": "16-bit to 24-bit audio",
        "img": "/images/Dictiionary_Quiz_image_Pool/bit_depth_range.svg",
        "exp": "Each bit roughly adds 6dB of dynamic range. 24-bit provides roughly 144dB, which is 48dB more headroom and lower noise floor than 16-bit's 96dB.",
        "quote": "24-bit allows us to record with massive headroom without ever worrying about the digital noise floor."
    },
    {
        "match": "Nyquist frequency for a sample rate of 96kHz",
        "img": "/images/Dictiionary_Quiz_image_Pool/nyquist_diagram.png",
        "exp": "The Nyquist theorem establishes the maximum reproducible frequency at precisely half the sampling rate, making it 48kHz for a 96kHz recording.",
        "quote": "Sampling rates beyond 44.1kHz aren't about hearing dog-whistles; they're about pushing filter artifacts out of the audible spectrum."
    },
    {
        "match": "noise-shaped dithering versus TPDF",
        "img": "/images/Dictiionary_Quiz_image_Pool/dither_noise.svg",
        "exp": "Noise-shaped dither uniquely pushes quantization noise into the extreme high frequencies (15kHz+), out of the most sensitive range of human hearing.",
        "quote": "Dithering trades harmonic, ugly distortion for smooth, virtually inaudible tape-like hiss."
    },
    {
        "match": "How many semitones is the sample transposed",
        "img": "/images/Dictiionary_Quiz_image_Pool/sampler_panel.png",
        "exp": "Playing E4 stretches the C4 sample by 4 semitones upwards. The sampler calculates a playback speed multiplier to raise the pitch artificially.",
        "quote": "Traditional sampling forces speed and pitch to be locked together. Play it faster, and the chipmunks arrive."
    },
    {
        "match": "6 round-robin samples",
        "img": "/images/Dictiionary_Quiz_image_Pool/multi_sampling_layers_diagram.svg",
        "exp": "A sequential round-robin mechanism prevents the 'machine gun' effect by cycling identically velocity-matched hits 1 through 6 before repeating on the 7th.",
        "quote": "Round-robins bring the random, human imperfections of an actual drummer back into the sterile digital grid."
    },
    {
        "match": "ambient drone using Paulstretch",
        "img": "/images/Dictiionary_Quiz_image_Pool/explanation_sampling_waveform.png",
        "exp": "Stretching 3 seconds to 300 seconds represents a 100x stretch factor. Ambient algorithms like Paulstretch use enormous granular windows to blur the spectral data.",
        "quote": "Extreme time-stretching transforms the microscopic fractions of a sound into massive cinematic landscapes."
    },
    {
        "match": "equivalent uncompressed audio",
        "img": "/images/Dictiionary_Quiz_image_Pool/midi_vs_audio_size_hq.png",
        "exp": "MIDI is merely data instructions (Sheet Music), not audio waveforms. A 3-minute uncompressed stereo WAV is roughly 30MB, making MIDI exponentially smaller.",
        "quote": "MIDI didn't record sound; it recorded performances. It changed everything."
    },
    {
        "match": "chord of 4 notes",
        "img": "/images/Dictiionary_Quiz_image_Pool/explanation_midi_piano_roll.png",
        "exp": "MIDI operates fundamentally as a serial protocol. Hitting 4 notes simultaneously transmits 4 distinct, rapid 'Note On' messages one after the other.",
        "quote": "Because MIDI implies a single wire, big chords are technically arpeggios played at computing speeds."
    },
    {
        "match": "Middle C: Note 60",
        "img": "/images/Dictiionary_Quiz_image_Pool/midi_middle_c_note_60_hq.png",
        "exp": "In standard MIDI mapping, Middle C defaults to note number 60, right in the center of the 0-127 spectrum.",
        "quote": "C3 or C4? The great Yamaha vs Roland debate still confuses MIDI programmers today."
    },
    {
        "match": "velocity range?",
        "img": "/images/svg/midi_velocity.svg",
        "exp": "Like all standard MIDI data, velocity uses a 7-bit value array spanning exactly 128 discrete steps (0 through 127).",
        "quote": "A piano has continuous velocity; MIDI forces human touch into 127 distinct digital stair steps."
    },
    {
        "match": "Élastique provide better time-stretching",
        "img": "/images/Dictiionary_Quiz_image_Pool/explanation_sampling_waveform.png",
        "exp": "Modern time-stretch algorithms utilize powerful Fast Fourier Transform (FFT) processors to map and cleanly isolate transients before warping the sustained gaps.",
        "quote": "The algorithm's job is to lie to our ears convincingly, maintaining rhythm without sacrificing tone."
    },
    {
        "match": "MIDI introduced?",
        "img": "/images/Dictiionary_Quiz_image_Pool/explanation_midi_piano_roll.png",
        "exp": "Announced in 1983, MIDI was an unprecedented moment of industry collaboration, pioneered fiercely by Dave Smith (Sequential) and Ikutaro Kakehashi (Roland).",
        "quote": "They hooked a Prophet-600 to a Jupiter-6, played a note, and digital music was never the same."
    },
    {
        "match": "A4 (440Hz concert pitch)?",
        "img": "/images/Dictiionary_Quiz_image_Pool/midi_a4_note_69_hq.png",
        "exp": "With C4 occupying slot 60, counting up the semitones maps A4 precisely to MIDI note number 69.",
        "quote": "The math translates exactly: 69 equals 440 vibrations per second. It is the anchor of tuning."
    },
        {
        "match": "save the original file before making changes",
        "img": "/images/Dictiionary_Quiz_image_Pool/save_backup_hq.png",
        "exp": "Destructive editing actually rewrites the 1s and 0s on your hard drive. Always duplicate before you commit.",
        "quote": "There is no 'Undo' button in reality. Maintain your backups."
    },
    {
        "match": "Normalization changes the pitch",
        "img": "/images/svg/sample_normalization_levels.svg",
        "exp": "Normalization operates mathematically on amplitude alone, scaling the highest peak to 0dBFS without ever altering pitch algorithms.",
        "quote": "Normalization doesn't make it sound better; it just makes it mathematically louder."
    },
    {
        "match": "bit depth of CD quality audio?",
        "img": "/images/Dictiionary_Quiz_image_Pool/bit_depth_range.svg",
        "exp": "The legendary 'Red Book' CD standard explicitly defined 16-bit processing, creating 65,536 vertical volume states.",
        "quote": "14 bits sounded okay, but they forced 16 bits to ensure classical music had proper fading tails."
    },
    {
        "match": "Doubling the sample rate",
        "img": "/images/svg/sample_rate_dots.svg",
        "exp": "Sampling at 88.2kHz literally forces the computer to plot twice as many data snapshots per second, directly doubling the required disk storage.",
        "quote": "Hard drives used to be expensive; now we throw gigabytes at the wall for minimal fidelity gains."
    },
    {
        "match": "Digital clipping can be fixed",
        "img": "/images/svg/clipping_waveform.svg",
        "exp": "Once a waveform's peak exceeds 0dBFS, the digital ceiling cleanly chops its top off, permanently converting musical information into harsh, squared distortion.",
        "quote": "Analog clipping is a warm blanket. Digital clipping is a shattered windshield."
    }
]

def main():
    dict_file = "src/data/dictionary_quizzes.json"
    with open(dict_file, 'r') as f:
        data = json.load(f)

    # Topic 4 is index 3
    vol4 = data["volumes"][3]
    updates = 0

    for part in vol4.get("parts", []):
        for topic in part.get("topics", []):
            for level in ["basic", "intermediate"]:
                for q in topic.get("levels", {}).get(level, []):
                    content = q.get("content", "")
                    
                    for fix in FIXES:
                        if fix["match"].lower() in content.lower() or fix["match"].lower() in q.get("explanation", "").lower() or fix["match"].lower() in q.get("expert_explanation", "").lower():
                            if isinstance(q.get("explanation_image"), dict):
                                q["explanation_image"]["src"] = fix["img"]
                                q["explanation_image"]["alt"] = "Image"
                            else:
                                q["explanation_image"] = fix["img"]
                            
                            q["img"] = fix["img"]
                            q["expert_explanation"] = fix["exp"]
                            q["expert_quote"] = {
                                "text": fix["quote"],
                                "author": "Studio Pro"
                            }
                            updates += 1
                            break

    with open(dict_file, 'w') as f:
        json.dump(data, f, indent=4)
        
    print(f"Updated {updates} questions in dictionary_quizzes.json")

if __name__ == "__main__":
    main()
