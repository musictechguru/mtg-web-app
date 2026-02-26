import json

def update_t4():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic_index = next((i for i, t in enumerate(stage2['items']) if "Topic 4" in t.get('title', '')), None)
    
    questions = []
    
    def make_q(title, content, answers, exp, quote_text, quote_author, img):
        return {
            "title": title,
            "type": "multi_choice",
            "content": content,
            "answers": answers,
            "expert_explanation": exp,
            "expert_quote": {
                "text": quote_text,
                "author": quote_author
            },
            "img": f"/images/gen/{img}_123.png", 
            "explanation": f'<img src="/images/gen/{img}_123.png" alt="Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;"/><p><strong>Expert Explanation:</strong> {exp}</p><blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{quote_text}"<br/><strong>- {quote_author}</strong></blockquote>'
        }

    # --- EASY ---
    questions.append(make_q(
        "Q1: Question 1",
        "What is the standard sample rate and bit depth legally required for commercial 'Red Book' audio CDs?",
        [
            {"text": "48 kHz / 24-bit", "is_true": False},
            {"text": "44.1 kHz / 16-bit", "is_true": True},
            {"text": "96 kHz / 32-bit", "is_true": False},
            {"text": "44.1 kHz / 8-bit", "is_true": False}
        ],
        "The 1980 'Red Book' CD standard established 44.1 kHz to capture frequencies up to 22kHz, and 16-bit depth to provide an excellent 96dB dynamic range limit.",
        "Choosing 44.1kHz and 16-bit wasn't an arbitrary guess; it was the exact mathematical threshold where digital audio became indistinguishable from reality to the human ear while still fitting onto a 74-minute disc.",
        "Kees Schouhamer Immink",
        "t4_q1_cd_quality_hq"
    ))

    questions.append(make_q(
        "Q2: Question 2",
        "In digital audio recording, what exactly does the 'Sample Rate' measure?",
        [
            {"text": "The total volume range of the audio file", "is_true": False},
            {"text": "How many times per second the analog audio waveform is measured and photographed", "is_true": True},
            {"text": "The speed at which the audio is played back", "is_true": False},
            {"text": "The number of tracks running in the DAW session", "is_true": False}
        ],
        "Sample Rate is the digital equivalent of frames-per-second in a film. A sample rate of 48kHz means the analog voltage was sliced up and recorded exactly 48,000 times every single second.",
        "Think of sample rate like taking a rapid series of photographs of a moving object. The faster the camera clicks, the smoother and more accurate the captured motion becomes when played back.",
        "Bob Katz",
        "t4_q2_sample_rate_hq"
    ))

    questions.append(make_q(
        "Q3: Question 3",
        "What is the fundamental difference between MIDI data and a digital audio file (like a WAV)?",
        [
            {"text": "MIDI has better sound quality than WAV files", "is_true": False},
            {"text": "MIDI contains no actual sound; it is only musical performance instructions (like digital sheet music)", "is_true": True},
            {"text": "WAV files are obsolete entirely, MIDI is the modern replacement", "is_true": False},
            {"text": "They are exactly the same thing", "is_true": False}
        ],
        "MIDI stands for Musical Instrument Digital Interface. It records 'Note On', 'Note Off', and 'Velocity'. It makes absolutely no sound by itself until it is fed into a synthesizer or sampler plugin.",
        "MIDI is not music. MIDI is the ghost of a performance. It's the paper roll in the player piano telling the hammers when to strike.",
        "Dave Smith",
        "t4_q3_midi_vs_audio_hq"
    ))

    questions.append(make_q(
        "Q4: Question 4",
        "What does 'Destructive Editing' mean in the context of editing a digital audio file?",
        [
            {"text": "Editing that permanently overwrites and permanently alters the original 1s and 0s on the hard drive", "is_true": True},
            {"text": "Editing that uses too much CPU power and crashes the computer", "is_true": False},
            {"text": "Editing using a distortion plugin", "is_true": False},
            {"text": "Editing that can be easily undone in the DAW by dragging the clip edge", "is_true": False}
        ],
        "Destructive editing (like 'Normalize' in ancient audio editors) physically recalculates and saves over the source WAV file. Non-destructive editing (like turning up a fader in a modern DAW) leaves the original file completely untouched.",
        "The golden rule of digital preservation: never, ever destructively alter the master file. Always create a copy, because digital clipping is forever.",
        "Sylvia Massy",
        "t4_q4_destructive_editing_hq"
    ))

    questions.append(make_q(
        "Q5: Question 5",
        "Which specific MIDI message type is used to track exactly how hard or fast a key was pressed on a MIDI controller?",
        [
            {"text": "Pitch Bend", "is_true": False},
            {"text": "Note Off", "is_true": False},
            {"text": "Velocity", "is_true": True},
            {"text": "Aftertouch", "is_true": False}
        ],
        "MIDI Velocity measures the speed at which a key travels downward. Samplers use this number (0-127) to trigger louder, brighter samples when a key is hit aggressively.",
        "Velocity is the breath and muscle of a digital performance. Without it, a piano solo sounds like it was typed on a computer keyboard instead of played by a human with a soul.",
        "Herbie Hancock",
        "t4_q5_midi_velocity_hq"
    ))

    questions.append(make_q(
        "Q6: Question 6",
        "What is the standard numerical range for MIDI data, including Velocity and Control Change (CC) messages?",
        [
            {"text": "0 to 100", "is_true": False},
            {"text": "0 to 255", "is_true": False},
            {"text": "1 to 10", "is_true": False},
            {"text": "0 to 127", "is_true": True}
        ],
        "Because the original 1983 MIDI specification reserved 7 bits of data for values, the maximum number it can represent mathematically is 127 (which is 2 to the 7th power, minus 1 for the zero).",
        "The limitation of 127 steps of velocity seems tiny today, but the fact that a serial protocol designed in 1983 can still effortlessly transmit the subtle nuance of a jazz pianist today is astonishing.",
        "Ikutaro Kakehashi",
        "t4_q6_midi_range_127_hq"
    ))

    questions.append(make_q(
        "Q7: Question 7",
        "What happens physically to a digital audio recording if the input signal level exceeds 0 dBFS (Decibels Full Scale)?",
        [
            {"text": "The computer automatically turns it down", "is_true": False},
            {"text": "The tops of the audio waveform are mathematically chopped off flat, resulting in harsh, irreparable digital clipping", "is_true": True},
            {"text": "The audio becomes warmer and fatter", "is_true": False},
            {"text": "The recording stops instantly", "is_true": False}
        ],
        "0 dBFS is the absolute digital ceiling. Unlike analog tape, which saturates gracefully above 0 VU, if purely digital numbers go above 0 dBFS, the computer cannot represent them. It flattens the wave, turning music into squares.",
        "Digital clipping is the sound of a computer failing to count high enough. It is brittle, mathematical, and entirely unmusical.",
        "George Massenburg",
        "t4_q7_digital_clipping_hq"
    ))

    # --- MEDIUM ---
    questions.append(make_q(
        "Q8: Question 8",
        "According to the Nyquist-Shannon sampling theorem, what must the minimum Sample Rate be in order to accurately capture and reproduce a 20kHz audio frequency?",
        [
            {"text": "20 kHz", "is_true": False},
            {"text": "40 kHz", "is_true": True},
            {"text": "10 kHz", "is_true": False},
            {"text": "80 kHz", "is_true": False}
        ],
        "The Nyquist Theorem states that to accurately capture an analog wave, you must sample it at least twice per cycle (one for the peak, one for the trough). Therefore, a 20kHz tone requires at minimum a 40kHz sample rate.",
        "The Nyquist theorem is the absolute bedrock of digital audio. It proves mathematically that we don't need infinite resolution to capture a sound perfectly; we just need to be exactly twice as fast as the highest frequency.",
        "Harry Nyquist",
        "t4_q8_nyquist_theorem_hq"
    ))

    questions.append(make_q(
        "Q9: Question 9",
        "What does exactly mathematical 'Normalization' do to a digital audio file?",
        [
            {"text": "It analyzes the highest volume peak and automatically scales the entire audio file louder until that peak hits exactly 0dBFS", "is_true": True},
            {"text": "It changes the pitch of the sample to middle C", "is_true": False},
            {"text": "It compresses the quiet parts to be as loud as the loud parts", "is_true": False},
            {"text": "It removes background hiss and room noise", "is_true": False}
        ],
        "Normalization is simply turning up a master volume knob for the audio file. It does NOT compress the audio (the dynamic range remains identical). It just makes the loudest moment as loud as legally digital possible.",
        "Normalization is a helpful tool for maximizing file gain, but remember: when you normalize the music, you also normalize the background noise floor exactly the same amount.",
        "Craig Anderton",
        "t4_q9_normalization_hq"
    ))

    questions.append(make_q(
        "Q10: Question 10",
        "If you record a quiet vocal at 24-bit resolution instead of 16-bit, what is the primary acoustic benefit?",
        [
            {"text": "The vocal will mysteriously sound more perfectly in tune", "is_true": False},
            {"text": "The vocal will have a massively lower noise floor, allowing you to turn it up later without introducing digital hiss", "is_true": True},
            {"text": "The vocal will sound significantly brighter and crisper", "is_true": False},
            {"text": "The recording will take up half the hard drive space", "is_true": False}
        ],
        "Bit depth determines the noise floor and dynamic range. 24-bit audio has 144dB of dynamic range (compared to 16-bit's 96dB), meaning quiet whispers recorded low will not be buried in digital quantization noise.",
        "Recording in 24-bit is like having an infinitely deep black background behind your painting. It doesn't make the colors brighter, but it lets you see the faintest stars without the grain of the canvas getting in the way.",
        "Bruce Swedien",
        "t4_q10_24bit_noise_floor_hq"
    ))

    questions.append(make_q(
        "Q11: Question 11",
        "What is the total number of distinct volume levels (quantization steps) available to represent a waveform continuously in a 16-bit digital audio file?",
        [
            {"text": "16", "is_true": False},
            {"text": "256", "is_true": False},
            {"text": "65,536", "is_true": True},
            {"text": "16,777,216", "is_true": False}
        ],
        "2 to the 16th power is 65,536. This means that at every single sample snapshot (44,100 times a second), the computer has 65,536 possible volume heights to snap the analog voltage to.",
        "When CD audio debuted, audio purists balked at splitting a smooth analog wave into 65,000 tiny stair-steps. But practically, at 44,000 times a second, those microscopic stairs are utterly invisible to the human eardrum.",
        "Phil Ramone",
        "t4_q11_16bit_steps_hq"
    ))

    questions.append(make_q(
        "Q12: Question 12",
        "When creating a seamless, infinite loop from a sustained orchestral string sample, what basic editing technique is absolutely essential to avoid rhythmic 'clicks' at the loop point?",
        [
            {"text": "Adding heavy distortion", "is_true": False},
            {"text": "Ensuring the loop start and end points both occur exactly at a 'Zero Crossing' on the waveform", "is_true": True},
            {"text": "Pitch shifting the end of the loop by an octave", "is_true": False},
            {"text": "Hard-panning the audio left and right", "is_true": False}
        ],
        "A click happens when the waveform abruptly jumps from a positive voltage to a negative voltage at the boundary. Trimming the loop so it begins and ends exactly where the wave crosses the center 0-voltage line guarantees a smooth transition.",
        "The art of looping a static sample is a dark magic entirely reliant on zero crossings. A single sample jump out of place turns a beautiful string section into a skipping CD.",
        "Peter Siedlaczek",
        "t4_q12_zero_crossing_hq"
    ))

    questions.append(make_q(
        "Q13: Question 13",
        "In advanced drum sampler programming, what is the specific purpose of a 'Round Robin' playback system?",
        [
            {"text": "To cycle through multiple, slightly different recordings of the exact same drum hit to prevent the unnatural 'machine-gun' effect on fast rolls", "is_true": True},
            {"text": "To automatically pan the snare drum in a circle around the listener's head", "is_true": False},
            {"text": "To compress the drum bus in parallel", "is_true": False},
            {"text": "To convert MIDI data into an analog control voltage loop", "is_true": False}
        ],
        "A real drummer physically cannot hit a snare exactly the same twice. A Round Robin script forces the sampler to play 'Snare Hit 1', then 'Snare Hit 2', then 'Snare Hit 3' in sequence when the same MIDI note is triggered repeatedly.",
        "Without Round Robin sampling, modern cinematic orchestral programming would sound like a 1980s video game. The imperfections of cycling through identical hits are what create the illusion of humanity.",
        "Hans Zimmer",
        "t4_q13_round_robin_hq"
    ))

    questions.append(make_q(
        "Q14: Question 14",
        "What exact MIDI Note Number is globally conventionally recognized as 'Middle C' (C4) in most standard MIDI hardware and DAWs?",
        [
            {"text": "Note 48", "is_true": False},
            {"text": "Note 12", "is_true": False},
            {"text": "Note 0", "is_true": False},
            {"text": "Note 60", "is_true": True}
        ],
        "In the MIDI standard, the note values range from 0 to 127. Middle C (C4) is centrally placed exactly at note number 60, right in the middle of the piano keyboard mapping.",
        "Note 60 is the anchor of the digital orchestration world. Every grand piano library, every synthesizer patch, and every drum map revolves around where Middle C sits.",
        "Ray Kurzweil",
        "t4_q14_midi_note_60_hq"
    ))

    # --- HARD ---
    questions.append(make_q(
        "Q15: Question 15",
        "If an old-school hardware sampler plays back a recording of a Middle C (C4) but the musician presses an E4 on their MIDI keyboard, what physical process occurs to the audio file?",
        [
            {"text": "The sample is played back faster, which inevitably makes the note 4 semitones higher AND significantly shorter in duration", "is_true": True},
            {"text": "The computer uses an FFT algorithm to stretch it without changing pitch", "is_true": False},
            {"text": "The sample remains exactly the same pitch but gets much brighter", "is_true": False},
            {"text": "The sample simply will not play back at all", "is_true": False}
        ],
        "Classic 'tape-style' sampling works like a record player. To raise the pitch of a sound by 4 semitones, the computer simply plays the digital file faster, meaning the 'chipmunk' snare drum also finishes playing faster.",
        "The charm of vintage 12-bit samplers like the Akai MPC60 or SP-1200 relies entirely on what happens to the grit and tempo of a drum break when you pitch it down and play it slowly.",
        "J Dilla",
        "t4_q15_sampler_pitch_shift_hq"
    ))

    questions.append(make_q(
        "Q16: Question 16",
        "What is the primary technical purpose of applying 'Dither' when bouncing a massive 24-bit studio mix down to a 16-bit Master file?",
        [
            {"text": "To add a layer of analog 'tape warmth' to sterile digital recordings", "is_true": False},
            {"text": "To add low-level randomized noise that mathematically masks and smooths out the harsh truncation errors caused by throwing away the bottom 8 bits of volume data", "is_true": True},
            {"text": "To compress the stereo mix so it sounds louder on streaming platforms", "is_true": False},
            {"text": "To convert the sample rate from 48kHz down to 44.1kHz cleanly", "is_true": False}
        ],
        "Truncating 24-bit to 16-bit simply chops off the lowest, quietest audio data, turning smooth reverb tails into staircase-like digital distortion. Dither adds incredibly faint mathematical 'hiss' that randomizes these errors, trading harsh distortion for a smooth, pleasant noise floor.",
        "Dither is the ultimate digital trick. By intentionally injecting a calculated layer of noise at the very bottom of the file, we trick the listener's brain into perceiving a perfectly smooth fade to silence instead of jagged digital artifacts.",
        "Bob Ludwig",
        "t4_q16_dithering_noise_hq"
    ))

    questions.append(make_q(
        "Q17: Question 17",
        "Why do top mastering engineers overwhelmingly prefer specialized 'Noise-Shaped' dither algorithms (like POW-r) over standard flat TPDF white noise dither?",
        [
            {"text": "Noise-shaping requires less CPU processing power to calculate", "is_true": False},
            {"text": "Noise-shaping algorithms push the required dither noise into extreme high frequencies (above 15kHz) where human hearing is least sensitive, preserving silence in the mid-range", "is_true": True},
            {"text": "Noise-shaping automatically EQs the master track to sound brighter", "is_true": False},
            {"text": "Noise-shaping prevents illegal digital clipping above 0dBFS", "is_true": False}
        ],
        "As humans, we are highly sensitive to middle frequencies (1kHz to 5kHz). Noise-shaped dither acts as an invisible EQ for the background hiss, aggressively curving the noise into the airy 18kHz range so we can't easily hear it, effectively increasing the perceived dynamic range.",
        "Using a high-quality noise-shaped dither allows you to deliver a 16-bit CD that the human ear perceives as having the depth and silence of an 18-bit or 19-bit recording. It's acoustic psycho-magic.",
        "Mastering Engineer",
        "t4_q17_noise_shaping_hq"
    ))

    questions.append(make_q(
        "Q18: Question 18",
        "What is the standard, accepted mathematical relationship between Bit Depth and total Dynamic Range in digital audio?",
        [
            {"text": "Every 1 bit of depth mathematically provides precisely 1 dB of dynamic range", "is_true": False},
            {"text": "Every 1 bit of depth mathematically provides approximately 6 dB of dynamic range", "is_true": True},
            {"text": "Every 1 bit of depth doubles the total gigabyte file size", "is_true": False},
            {"text": "Bit depth only affects the high frequencies, not the dynamic volume range", "is_true": False}
        ],
        "A general rule of thumb: Multiply the bits by 6. A 16-bit file has roughly 96dB of dynamic range (16x6). A 24-bit file has roughly 144dB of dynamic range (24x6).",
        "The human ear has roughly 130dB of dynamic range from the threshold of hearing to the threshold of physical pain. A 24-bit, 144dB digital system is actually superior to reality.",
        "Rupert Neve",
        "t4_q18_bit_depth_math_hq"
    ))

    questions.append(make_q(
        "Q19: Question 19",
        "In complex, modern time-stretching algorithms (such as zplane Élastique), what specific mathematical processing is fundamentally used to stretch a drum loop's duration WITHOUT lowering its pitch?",
        [
            {"text": "Playing the file faster and adding a Chorus effect", "is_true": False},
            {"text": "Using Fast Fourier Transform (FFT) mapping to chop the audio into microscopic spectral slices, separating the sharp transient hits from the sustained pitched content, and moving them apart", "is_true": True},
            {"text": "Slowing the physical hard drive rotation down via USB", "is_true": False},
            {"text": "Applying a 24dB Low-Pass Filter while expanding the sample rate", "is_true": False}
        ],
        "Unlike vintage samplers that pitch down when slowed, modern stretching isolates rhythmic transients (so drums stay sharp) and creates synthesized 'smears' between them in the frequency domain, maintaining the original pitch perfectly.",
        "It took decades of supercomputer-level mathematics to allow a DJ in Ableton to seamlessly sync a 90 BPM vocal smoothly over a 125 BPM house track without making the singer sound like a monster.",
        "Software Developer",
        "t4_q19_time_stretch_hq"
    ))

    questions.append(make_q(
        "Q20: Question 20",
        "In the extremely rigid original 1983 MIDI 1.0 hardware specification, how is the serial digital data transmitted electronically over the 5-pin DIN cable to completely prevent ground loops and hum between different synthesizers?",
        [
            {"text": "It uses an isolated Opto-Isolator (a tiny LED transmitter and photo-receiver) on the receiving MIDI IN port to sever any direct electrical wire connection", "is_true": True},
            {"text": "It uses expensive gold-plated USB cables", "is_true": False},
            {"text": "It uses Bluetooth wireless transmission automatically", "is_true": False},
            {"text": "It doesn't. 1980s MIDI setups always hummed loudly.", "is_true": False}
        ],
        "One of the most genius decisions of the MIDI council was the mandatory inclusion of an opto-isolator. The MIDI cable actually flashes an invisible light to transmit the 1s and 0s into the receiving synth. Because there is no raw electrical wire bridging the two machines, ground-loop hum is impossible.",
        "The opto-isolator is MIDI's unsung hero. By transmitting musical data as flashes of light across a microscopic physical gap, it saved an entire decade of studio engineers from agonizing electrical ground hum.",
        "Dave Smith",
        "t4_q20_opto_isolator_hq"
    ))

    # Replace in origin
    stage2['items'][topic_index]['questions'] = questions
    
    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Successfully updated 20 questions for Stage 2 Topic 4 (Sampling)")

if __name__ == '__main__':
    update_t4()
