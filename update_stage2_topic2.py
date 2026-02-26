import json

def update_topic2():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)

    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic2 = next((t for t in stage2['items'] if "Topic 2" in t.get('title', '')), None)

    new_questions = [
        # EASY (1-7)
        {
            "content": "Which microphone type is typically best for live vocal performances to minimize feedback and handling noise?",
            "answers": [
                {"text": "Large diaphragm condenser", "is_true": "no"},
                {"text": "Ribbon microphone", "is_true": "no"},
                {"text": "Dynamic microphone", "is_true": "yes"},
                {"text": "Boundary microphone", "is_true": "no"}
            ],
            "expert_explanation": "Dynamic mics (like the iconic SM58) are rugged, handle high SPL, and are less sensitive to distant sounds, making them perfect for noisy live stages and preventing feedback.",
            "expert_quote": {"text": "Condensers for the studio's detail, dynamics for the stage's survival.", "author": "Live Sound 101"},
            "img": "/images/svg/mic_pop_filter_setup.svg"
        },
        {
            "content": "Why should you generally avoid placing a microphone pointing directly at the sound hole of an acoustic guitar?",
            "answers": [
                {"text": "It captures excessive boominess and low-frequency resonance.", "is_true": "yes"},
                {"text": "It causes phase cancellation with the strings.", "is_true": "no"},
                {"text": "The sound hole produces no actual sound.", "is_true": "no"},
                {"text": "It will overload the microphone preamp.", "is_true": "no"}
            ],
            "expert_explanation": "The sound hole acts as a Helmholtz resonator, pumping out massive amounts of low-end frequencies. Micing it directly results in a muddy, unusable tone. The 12th fret is a much better starting point.",
            "expert_quote": {"text": "Don't look into the eye of the storm. Mic where the neck meets the body.", "author": "Acoustic Recording"},
            "img": "/images/svg/mic_placement_acoustic_guitar.svg"
        },
        {
            "content": "What is a primary characteristic of an omnidirectional polar pattern?",
            "answers": [
                {"text": "It only picks up sound from the front.", "is_true": "no"},
                {"text": "It picks up sound equally from all directions.", "is_true": "yes"},
                {"text": "It rejects sound from the sides completely.", "is_true": "no"},
                {"text": "It only picks up sub-bass frequencies.", "is_true": "no"}
            ],
            "expert_explanation": "Omnidirectional mics capsule design reacts purely to pressure changes, not direction. They capture a very natural sound with no proximity effect, but are poor at isolating instruments in a noisy room.",
            "expert_quote": {"text": "Omni hears the room as much as the instrument.", "author": "Studio Secrets"},
            "img": "/images/svg/polar_pattern_omni.svg"
        },
        {
            "content": "What is a classic electrical danger when using older, vintage ribbon microphones?",
            "answers": [
                {"text": "Playing them too loudly will melt the internal wiring.", "is_true": "no"},
                {"text": "Applying +48V phantom power can stretch or instantly destroy the delicate ribbon.", "is_true": "yes"},
                {"text": "They draw too much power from modern audio interfaces.", "is_true": "no"},
                {"text": "They operate on AC voltage and can shock the user.", "is_true": "no"}
            ],
            "expert_explanation": "Vintage passive ribbon mics can be destroyed if phantom power is applied incorrectly (e.g., via a patch bay short or bad cable), as it sends a voltage jolt directly across the micron-thin aluminum ribbon.",
            "expert_quote": {"text": "Double-check your phantom power before patching a vintage ribbon.", "author": "Studio Protocol"},
            "img": "/images/svg/phantom_power.svg"
        },
        {
            "content": "What is the technical difference between Gain and Volume?",
            "answers": [
                {"text": "There is no difference.", "is_true": "no"},
                {"text": "Volume is for microphones; Gain is for speakers.", "is_true": "no"},
                {"text": "Gain only affects digital systems; Volume is analog.", "is_true": "no"},
                {"text": "Gain is the input level driving the preamp; Volume is the output level to speakers.", "is_true": "yes"}
            ],
            "expert_explanation": "Gain determines how hard you drive the circuitry at the input stage, which fundamentally affects tone and saturation. Volume is a passive attenuation applied later, adjusting how loud the final output is without changing character.",
            "expert_quote": {"text": "Gain is for character; Volume is for listening.", "author": "Signal Flow 101"},
            "img": "/images/svg/equipment_mic_preamp_gain_stage.svg"
        },
        {
            "content": "If Mic A is placed 4 inches from a snare drum, what is the minimum distance Mic B should be placed from Mic A to minimize phase cancellation?",
            "answers": [
                {"text": "4 inches", "is_true": "no"},
                {"text": "8 inches", "is_true": "no"},
                {"text": "12 inches", "is_true": "yes"},
                {"text": "24 inches", "is_true": "no"}
            ],
            "expert_explanation": "The 3:1 rule states that a second open microphone should be at least three times the distance from the first microphone as the first microphone is from the sound source. This keeps comb-filtering to an inaudible level.",
            "expert_quote": {"text": "The 3:1 rule is your mathematical safety net against phase artifacts.", "author": "Audio Engineering"},
            "img": "/images/Dictiionary_Quiz_image_Pool/Logic's Phase 2.png"
        },
        {
            "content": "Which microphone type is generally chosen to capture fast transients and high-frequency detail, such as cymbals or acoustic guitar picking?",
            "answers": [
                {"text": "Large diaphragm dynamic", "is_true": "no"},
                {"text": "Ribbon microphone", "is_true": "no"},
                {"text": "Small Diaphragm Condenser (SDC)", "is_true": "yes"},
                {"text": "Carbon microphone", "is_true": "no"}
            ],
            "expert_explanation": "SDCs have incredibly lightweight diaphragms that react instantly to fast transients, making them perfect for capturing the precise 'snap' and 'shimmer' of fast, high-frequency instruments.",
            "expert_quote": {"text": "A small diaphragm condenser acts like an acoustic microscope.", "author": "Recording Tech"},
            "img": "/images/explanations/high_spl_mic_diagram.svg"
        },

        # MEDIUM (8-14)
        {
            "content": "What is the primary acoustic reason a drum tech might cut a hole (port) in the front resonant head of a kick drum?",
            "answers": [
                {"text": "To increase the sub-bass rumble of the drum.", "is_true": "no"},
                {"text": "To reduce resonance and make the drum sound punchier with a faster decay.", "is_true": "yes"},
                {"text": "To make the drum physically lighter.", "is_true": "no"},
                {"text": "To prevent the microphone from being damaged by air pressure.", "is_true": "no"}
            ],
            "expert_explanation": "A sealed kick drum sustains much longer (like a timpani). A ported head lets air escape, quickening the decay for a modern punchy sound and allowing an inside mic to capture the beater click directly.",
            "expert_quote": {"text": "A ported kick drum gets out of the way of the bass guitar much faster.", "author": "Drum Production"},
            "img": "/images/explanations/mic_placement_kick.png"
        },
        {
            "content": "For a close-miced, punchy rock tom-tom sound with good isolation, where is the mic typically positioned?",
            "answers": [
                {"text": "Inside the drum shell.", "is_true": "no"},
                {"text": "5 feet away pointing straight at the drum kit.", "is_true": "no"},
                {"text": "Underneath the bottom resonant head.", "is_true": "no"},
                {"text": "1-2 inches above the batter head, pointing down towards the center.", "is_true": "yes"}
            ],
            "expert_explanation": "Placing the mic just over the rim pointing down captures the immediate stick attack and the fundamental pitch. Positioning the mic effectively uses off-axis rejection to minimize cymbal bleed.",
            "expert_quote": {"text": "Get close for the punch, but watch out for the drummer's sticks.", "author": "Studio Setup"},
            "img": "/images/svg/snare_mic_position.svg"
        },
        {
            "content": "When recording in an untreated, reverberant bedroom, which polar pattern provides the best isolation from room echoes?",
            "answers": [
                {"text": "Omnidirectional", "is_true": "no"},
                {"text": "Figure-8", "is_true": "no"},
                {"text": "Cardioid", "is_true": "yes"},
                {"text": "Hemispherical", "is_true": "no"}
            ],
            "expert_explanation": "A Cardioid pattern is most sensitive at the front and heavily rejects sound arriving from the rear (180 degrees). This acts as an acoustic shield against room reflections coming from behind the mic.",
            "expert_quote": {"text": "Turn the back of a cardioid mic towards your biggest acoustic problem.", "author": "Bedroom Producer"},
            "img": "/images/vol2/explanation_understanding_polar_patterns_figure_8.svg"
        },
        {
            "content": "Why is placing microphones entirely 'far away' from the source (distance micing) typically problematic in an untreated home studio?",
            "answers": [
                {"text": "Microphones can't pick up low frequencies at a distance.", "is_true": "no"},
                {"text": "It captures far too much of the room's poor acoustic reflections and flutter echo.", "is_true": "yes"},
                {"text": "It causes dangerous electrical ground loops.", "is_true": "no"},
                {"text": "The air absorbs all the high frequencies after 2 feet.", "is_true": "no"}
            ],
            "expert_explanation": "As you move the mic farther from the source, the ratio of direct sound to reflected room sound shifts. In a bad room, distance micing captures all the harsh flutter echoes and muddy standing waves.",
            "expert_quote": {"text": "Distance micing only sounds as good as the room you're standing in.", "author": "Acoustics 101"},
            "img": "/images/explanations/reference_track_ab.svg"
        },
        {
            "content": "When close micing a very loud brass instrument like a trumpet or trombone, what feature on a condenser microphone or preamp will you likely need to engage?",
            "answers": [
                {"text": "The High-Pass Filter switch", "is_true": "no"},
                {"text": "The Polaris Reverse switch", "is_true": "no"},
                {"text": "The Pad (-10dB or -20dB) switch.", "is_true": "yes"},
                {"text": "The Ground Lift switch", "is_true": "no"}
            ],
            "expert_explanation": "Brass instruments generate massive Sound Pressure Levels (SPL). This acoustic energy can instantly overdrive the microphone's internal capsule electronics or overload preamp input. A pad switch safely attenuates the signal.",
            "expert_quote": {"text": "Don't let the brass section fry your input stage. Use the pad.", "author": "Recording Practices"},
            "img": "/images/svg/pad_switch.svg"
        },
        {
            "content": "Why is it often recommended to mic woodwind and brass instruments from a distance of 1 to 2 feet rather than right up against the bell?",
            "answers": [
                {"text": "The sound of acoustic instruments needs physical space in the air to fully develop and integrate.", "is_true": "yes"},
                {"text": "To prevent moisture from damaging the microphone diaphragm.", "is_true": "no"},
                {"text": "Because they produce no high frequencies at close range.", "is_true": "no"},
                {"text": "The bell actually produces the quietest part of the sound.", "is_true": "no"}
            ],
            "expert_explanation": "For instruments like saxophones or clarinets, the complex sound radiates from the entire body and the keyholes, not just the bell. Backing the mic up captures the complete, cohesive tone of the instrument.",
            "expert_quote": {"text": "Give acoustic instruments room to breathe; their sound is larger than their bell.", "author": "Orchestral Recording"},
            "img": "/images/svg/kick_in_out_mic.svg"
        },
        {
            "content": "What is a major difference in the typical acoustic radiation pattern between a Grand Piano and an Upright Piano?",
            "answers": [
                {"text": "An upright piano only produces mid-range frequencies.", "is_true": "no"},
                {"text": "A grand piano radiates sideways, while an upright radiates purely forwards.", "is_true": "no"},
                {"text": "An upright piano radiates sound heavily from its wooden back soundboard.", "is_true": "yes"},
                {"text": "There is absolutely no acoustic difference.", "is_true": "no"}
            ],
            "expert_explanation": "While grand pianos project a massive, complex soundstage upwards and downwards, upright pianos project heavily out their back. Micing the back of an upright (pulled away from a wall) often yields a rich, full tone.",
            "expert_quote": {"text": "For an upright piano, the magic often happens behind it, not in front.", "author": "Piano Recording"},
            "img": "/images/gen/piano_upright_micing_1770033134712.png"
        },

        # HARD (15-20)
        {
            "content": "What is a major, unique sonic advantage of using an Omnidirectional microphone for close-up vocals in a beautifully treated studio?",
            "answers": [
                {"text": "It requires zero preamp gain.", "is_true": "no"},
                {"text": "It automatically auto-tunes the vocal.", "is_true": "no"},
                {"text": "It has absolutely no proximity effect, allowing the singer to get extremely close without bass buildup.", "is_true": "yes"},
                {"text": "It naturally compresses high frequencies.", "is_true": "no"}
            ],
            "expert_explanation": "Directional mics (cardioid, figure-8) naturally exhibit proximity effect because they measure a pressure gradient. Omni mics rely entirely on absolute pressure, so their frequency response remains perfectly flat regardless of distance.",
            "expert_quote": {"text": "An omni mic lets the vocalist eat the grill without turning into a muddy bass monster.", "author": "Vocal Production"},
            "img": "/images/svg/polar_pattern_omni.svg"
        },
        {
            "content": "How does intense analog preamp clipping differ fundamentally from digital DAW clipping?",
            "answers": [
                {"text": "Analog clipping adds harmonic saturation and soft compression; digital clipping truncates waveforms harshly.", "is_true": "yes"},
                {"text": "They are sonically identical.", "is_true": "no"},
                {"text": "Digital clipping adds tape-like warmth; analog clipping generates harsh static.", "is_true": "no"},
                {"text": "Analog clipping only affects low frequencies; digital clipping only affects highs.", "is_true": "no"}
            ],
            "expert_explanation": "Driving an analog preamp hard can result in musically pleasing harmonic distortion (saturation) as the physical components round off the peaks. Digital clipping hits 0dBFS like a math error, creating nasty, enharmonic clicking.",
            "expert_quote": {"text": "Analog distortion is a creative tool; digital distortion is an error.", "author": "Audio Philosophy"},
            "img": "/images/svg/equipment_mic_preamp_gain_stage.svg"
        },
        {
            "content": "The Mid/Side (M/S) stereo recording technique utilizes which specific combination of polar patterns?",
            "answers": [
                {"text": "Two Figure-8 microphones crossed at 90 degrees.", "is_true": "no"},
                {"text": "One Cardioid (or Omni) pointing forward, and one Figure-8 pointing sideways.", "is_true": "yes"},
                {"text": "Two Cardioid microphones spaced 17cm apart.", "is_true": "no"},
                {"text": "One Cardioid and one Omnidirectional microphone placed together.", "is_true": "no"}
            ],
            "expert_explanation": "The Mid mic captures the direct, phase-perfect center image. The Figure-8 Side mic is placed precisely sideways to capture the left/right room difference. They are then decoded mathematically on a mixer or DAW.",
            "expert_quote": {"text": "M/S gives you absolute control over the stereo width after the recording is already finished.", "author": "Stereo Techniques"},
            "img": "/images/svg/stereo_ortf_diagram.svg"
        },
        {
            "content": "Which dual-mic stereo technique is most commonly used to capture a wide, majestic image of a Grand Piano for a classical music recording?",
            "answers": [
                {"text": "X/Y Coincident Pair positioned inside the piano.", "is_true": "no"},
                {"text": "M/S pair placed underneath the soundboard.", "is_true": "no"},
                {"text": "ORTF or a Spaced Pair (A/B) positioned outside the open lid.", "is_true": "yes"},
                {"text": "Two boundary mics taped to the player's chest.", "is_true": "no"}
            ],
            "expert_explanation": "Classical recordings favor capturing the majestic instrument interacting with the hall. An ORTF (110 degrees, 17cm apart) or Spaced A/B pair placed a few feet outside the lid captures a breathtaking, natural stereo width.",
            "expert_quote": {"text": "Classical piano requires capturing the performance hall just as much as the instrument itself.", "author": "Classical Engineer"},
            "img": "/images/svg/frequency_spectrum_treble.svg"
        },
        {
            "content": "When recording an acoustic guitar in stereo using a spaced pair, what is a highly effective, standard placement to avoid boominess while capturing a wide image?",
            "answers": [
                {"text": "One microphone pointed at the 12th fret, and the second pointed at the bridge or lower bout.", "is_true": "yes"},
                {"text": "Both microphones pointed directly into the sound hole from 2 inches away.", "is_true": "no"},
                {"text": "One microphone at the headstock, the other behind the guitarist's head.", "is_true": "no"},
                {"text": "Both microphones placed on the floor pointing upwards.", "is_true": "no"}
            ],
            "expert_explanation": "The 12th fret mic captures the bright attack and string detail. The bridge/lower bout mic captures the warm wood resonance. Panning these hard left and right creates a massive, balanced acoustic guitar tone.",
            "expert_quote": {"text": "The 12th fret gives you the bright strings; the bridge gives you the warm wood.", "author": "Acoustic Sessions"},
            "img": "/images/svg/mic_placement_acoustic_guitar.svg"
        },
        {
            "content": "The Blumlein Coincident Pair stereo technique provides incredibly realistic imaging, but requires which highly specific setup?",
            "answers": [
                {"text": "Two Omnidirectional microphones spaced exactly 3 feet apart.", "is_true": "no"},
                {"text": "Two Figure-8 microphones crossed exactly at a 90-degree angle, mounted as close together as physically possible.", "is_true": "yes"},
                {"text": "A Cardioid mid mic and a Figure-8 side mic.", "is_true": "no"},
                {"text": "Two Cardioid microphones angled at 110 degrees.", "is_true": "no"}
            ],
            "expert_explanation": "Invented by Alan Blumlein, this coincident pair technique captures excellent stereo separation and pristine room ambiance (due to the active rear lobes of the figure-8s). It works wonderfully in great acoustic spaces like concert halls.",
            "expert_quote": {"text": "Blumlein is the closest audio engineering gets to capturing complete holographic sound.", "author": "Advanced Stereo Imaging"},
            "img": "/images/svg/snare_mic_position.svg"
        }
    ]

    for i, q in enumerate(new_questions):
        new_q = q.copy()
        new_q['title'] = f"Q{i+1}: Question {i+1}"
        new_q['type'] = "multi_choice"
        
        img_tag = f'<img src="{q["img"]}" alt="Diagram" style="width:100%; border-radius:8px; margin-bottom:10px;" />'
        exp_text = f'<p><strong>Expert Explanation:</strong> {q["expert_explanation"]}</p>'
        quote_text = f'<blockquote style="border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 10px; font-style: italic;">"{q["expert_quote"]["text"]}"<br/><strong>- {q["expert_quote"]["author"]}</strong></blockquote>'
        
        new_q['explanation'] = img_tag + exp_text + quote_text
        new_questions[i] = new_q

    topic2['questions'] = new_questions

    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)
    print("Successfully updated course_data.json with fixed and reordered questions for Topic 2!")

update_topic2()
