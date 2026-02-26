import json

def update_t6():
    with open('src/data/course_data.json', 'r') as f:
        data = json.load(f)
        
    stage2 = next((s for s in data['sections'] if "Stage 2" in s.get('title', '')), None)
    topic_index = next((i for i, t in enumerate(stage2['items']) if "Topic 6" in t.get('title', '')), None)
    
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
        "What does 'EQ' stand for in standard audio production terminology?",
        [
            {"text": "Energy Quantization", "is_true": False},
            {"text": "Equalization", "is_true": True},
            {"text": "Electronic Quality", "is_true": False},
            {"text": "Echo Quotient", "is_true": False}
        ],
        "Equalization is the process of adjusting the balance between physical frequency components within an electronic signal. It is fundamentally a volume control that only applies to specific high, mid, or low pitched areas.",
        "EQ is exactly like carving a sculpture out of a block of marble. You are simply removing the muddy, ugly pieces of rock so that the beautiful shape underneath can finally be seen clearly.",
        "George Massenburg",
        "t6_q1_eq_definition_hq"
    ))

    questions.append(make_q(
        "Q2: Question 2",
        "What are the three primary configurable parameters of a standard Parametric EQ band?",
        [
            {"text": "Threshold, Ratio, Makeup Gain", "is_true": False},
            {"text": "Pre-delay, Decay Time, Diffusion", "is_true": False},
            {"text": "Frequency (Hz), Gain (dB), and Bandwidth/Quality (Q)", "is_true": True},
            {"text": "Volume, Pan, Mute", "is_true": False}
        ],
        "A parametric EQ allows surgical control. First, you choose the target Frequency (e.g., 200Hz). Then, you choose the Gain (e.g., cut it by -3dB). Finally, you choose how wide or narrow that cut is using the Q.",
        "A parametric EQ gives you a surgical scalpel instead of a massive sledgehammer. You can dive in, find the exact ringing overtone hurting the singer's voice, and remove only that one annoying mathematical frequency.",
        "Bob Clearmountain",
        "t6_q2_parametric_parameters_hq"
    ))

    questions.append(make_q(
        "Q3: Question 3",
        "Which specific filter shape is designed to completely remove low-frequency rumble, such as microphone stand vibrations, while leaving the rest of the vocal intact?",
        [
            {"text": "High-Pass Filter (HPF)", "is_true": True},
            {"text": "Low-Pass Filter (LPF)", "is_true": False},
            {"text": "Notch Filter", "is_true": False},
            {"text": "Bell Filter", "is_true": False}
        ],
        "A High-Pass Filter literally allows the high frequencies to 'pass' through, while chopping off the low frequencies. A steep HPF at 80Hz on a vocal mic removes traffic rumble and floor thumps without touching the singer's actual voice.",
        "The High-Pass filter is the mop that cleans the dirty floor of your entire mix. If you do not high-pass the useless 30Hz rumble out of your twenty vocal and guitar tracks, your final master will sound like a muddy, distorted swamp.",
        "Dave Pensado",
        "t6_q3_high_pass_filter_hq"
    ))

    questions.append(make_q(
        "Q4: Question 4",
        "What precisely does the 'Q' knob physically control on an EQ interface?",
        [
            {"text": "The width or bandwidth of the targeted frequency boost or cut", "is_true": True},
            {"text": "The overall loudness of the entire track", "is_true": False},
            {"text": "The amount of harmonic distortion added", "is_true": False},
            {"text": "The panning position of the track", "is_true": False}
        ],
        "Q stands for 'Quality Factor'. A highly narrow Q (e.g., 10) results in a sharp spike or needle used for surgical removal. A very wide Q (e.g., 0.5) results in a gentle sloping hill used for broad musical changes.",
        "Never boost with a narrow Q unless you are trying to deliberately annoy the listener. Broad, wide Q boosts sound like expensive analog hardware; narrow Q cuts sound like a professional fixing mistakes.",
        "Andrew Scheps",
        "t6_q4_q_bandwidth_hq"
    ))

    questions.append(make_q(
        "Q5: Question 5",
        "What is the fundamental working difference between Subtractive EQ and Additive EQ?",
        [
            {"text": "Subtractive EQ only works on mono tracks; Additive works on stereo", "is_true": False},
            {"text": "Subtractive EQ physically removes unwanted resonance and mud (cutting); Additive EQ boosts desirable frequencies for enhancement", "is_true": True},
            {"text": "Subtractive lowers volume; Additive adds reverb", "is_true": False},
            {"text": "There is no difference, they are identical", "is_true": False}
        ],
        "Subtractive EQ is problem-solving (e.g., cutting -4dB at 250Hz to cure a 'boxy' sounding acoustic guitar). Additive EQ is sweetening (e.g., boosting +2dB at 10kHz to add expensive 'air' and brightness to a pop vocal).",
        "Amateur engineers spend hours boosting 10kHz to make the vocal bright. Professional engineers spend five minutes cutting 300Hz mud from the guitars so the vocal naturally shines through on its absolute own.",
        "Andy Wallace",
        "t6_q5_subtractive_additive_hq"
    ))

    questions.append(make_q(
        "Q6: Question 6",
        "What is the simplest definition of basic audio 'Panning'?",
        [
            {"text": "Removing noise from the stereo field", "is_true": False},
            {"text": "Placing and adjusting a mono sound source anywhere horizontally across the stereo spectrum between the left and right speakers", "is_true": True},
            {"text": "Compressing the loud peaks of a signal", "is_true": False},
            {"text": "Adding artificial stereo widening delay to a mono track", "is_true": False}
        ],
        "Panning dictates the physical illusion of space. A lead vocal is typically panned dead Center so it plays equally out of both speakers. A rhythm guitar might be panned 100% physically to the Right speaker to wrap around the listener.",
        "Panning is the most powerful arrangement tool you have. If your mix is painfully cluttered, do not reach for the EQ or the compressor first. Just physically pan the clashing instruments entirely away from each other.",
        "Chris Lord-Alge",
        "t6_q6_panning_definition_hq"
    ))

    questions.append(make_q(
        "Q7: Question 7",
        "In a stereo setup, what does the term 'Phantom Center' refer to?",
        [
            {"text": "A special ghost microphone placed in the middle of a room", "is_true": False},
            {"text": "The psychoacoustic illusion of a sound source existing straight ahead in the air when identical signals play equally from both the left and right physical speakers", "is_true": True},
            {"text": "The very lowest bass frequencies that are hard to hear", "is_true": False},
            {"text": "A specialized central sub-woofer channel", "is_true": False}
        ],
        "You do not actually have a third speaker sitting directly in front of your face. When you pan a vocal perfectly 'Center', the left and right speakers play the vocal at exactly the same volume and time, fooling your brain into hearing a ghost in the middle.",
        "The golden rule of modern music: The kick drum, the snare drum, the bass guitar, and the lead vocal all live identically in the Phantom Center. They are the immovable spine of the rock.",
        "Tony Maserati",
        "t6_q7_phantom_center_hq"
    ))

    # --- MEDIUM ---
    questions.append(make_q(
        "Q8: Question 8",
        "Which of the following best describes the shape and function of an EQ 'Shelf' filter?",
        [
            {"text": "A filter that only cuts a single narrow frequency like a needle", "is_true": False},
            {"text": "A filter that equally boosts or cuts all frequencies above (high shelf) or below (low shelf) a chosen cutoff point, flattening out infinitely to the edge of hearing", "is_true": True},
            {"text": "A filter that dynamically reacts to volume", "is_true": False},
            {"text": "A steep brick wall that completely eliminates frequencies", "is_true": False}
        ],
        "A High Shelf might start boosting gently at 5kHz and flatten out into a straight line by 10kHz, boosting everything from 10kHz up to 20kHz equally. This is like the basic 'Treble' knob on a vintage home stereo system.",
        "If a vocal feels dark and buried, don't use a bell EQ to poke it. Grab an analog-style high shelf, set it at 8kHz, and just elegantly lift the entire roof off the house. It sounds vastly more expensive and natural.",
        "Sylvia Massy",
        "t6_q8_shelf_filter_hq"
    ))

    questions.append(make_q(
        "Q9: Question 9",
        "Why is applying Subtractive EQ (cutting) almost universally recommended BEFORE applying Additive EQ (boosting) or Compression?",
        [
            {"text": "Because boosting first physically damages the speakers", "is_true": False},
            {"text": "Removing problem resonances and 'mud' clears up sonic space, allowing the compressor to react smoothly rather than violently overreacting to the ugly, useless bass rumble", "is_true": True},
            {"text": "Because it uses less CPU processing power", "is_true": False},
            {"text": "It is totally random and doesn't actually matter", "is_true": False}
        ],
        "If a vocal has a horrible, booming 200Hz resonance when recorded near a wall, and you compress it first, the compressor will trigger on that boom and squash the entire vocal. If you EQ the 200Hz out first, the compressor behaves beautifully.",
        "Always clean the windows of your house before you decide what color the sky is. Cut the agonizing trash out of the recorded audio before you attempt to sweeten or squash it.",
        "Bob Katz",
        "t6_q9_subtractive_first_hq"
    ))

    questions.append(make_q(
        "Q10: Question 10",
        "What is the acoustic phenomenon known as 'Frequency Masking' in a dense mix?",
        [
            {"text": "When a physical microphone is covered by a pop filter", "is_true": False},
            {"text": "When you accidentally mute a track in the DAW", "is_true": False},
            {"text": "When two different instruments occupy the exact same frequency space, causing the louder or more complex sound to completely obscure and hide the quieter one from human perception", "is_true": True},
            {"text": "When extreme high frequencies cancel out extreme low frequencies", "is_true": False}
        ],
        "If your distorted electric guitars are heavily boosted around 2kHz, and your lead vocal's intelligibility also lives at 2kHz, the massive block of guitars will completely visually mask the vocal. This is why you must 'carve' space using EQ.",
        "Mixing is an exercise in ruthless compromise. If the acoustic guitar and the piano are physically fighting in the exact same 500Hz mud puddle, one of them must be carved violently out of the way, or both will drown.",
        "Michael Brauer",
        "t6_q10_frequency_masking_hq"
    ))

    questions.append(make_q(
        "Q11: Question 11",
        "You are mixing a rock track and the bass guitar is totally burying the punch of the kick drum around 80Hz. What is the most effective EQ solution?",
        [
            {"text": "Boost the kick drum massively at 80Hz by +15dB", "is_true": False},
            {"text": "Cut a few decibels at 80Hz on the bass guitar using a narrow bell, carving a surgical 'pocket' for the kick drum to effortlessly sit in unopposed", "is_true": True},
            {"text": "Pan the bass hard left and the kick hard right", "is_true": False},
            {"text": "Add a massive reverb decay to both tracks", "is_true": False}
        ],
        "Instead of turning the kick up (which eats up headroom and makes the whole song wildly bass-heavy), carve a tiny hole in the bass guitar. The listener won't notice the bass is missing 80Hz, but the kick will suddenly punch like a sledgehammer.",
        "The secret to a massive bottom end isn't boosting the bass. It's organizing the traffic. Make sure the dominant instrument at 60Hz is not the same instrument battling for control at 100Hz.",
        "Serban Ghenea",
        "t6_q11_eq_pocket_carving_hq"
    ))

    questions.append(make_q(
        "Q12: Question 12",
        "What is a 'Graphic EQ' specifically characterized by?",
        [
            {"text": "A blank screen where you draw a curve freely with a computer mouse", "is_true": False},
            {"text": "A row of fixed frequency bands controlled entirely by physical vertical sliders, offering no control over 'Q' width, commonly prized for tuning live PA speaker systems to a room", "is_true": True},
            {"text": "An EQ that only affects the visual graphics on a video track", "is_true": False},
            {"text": "A digital-only plugin that automatically eq's the track using AI", "is_true": False}
        ],
        "Unlike a parametric EQ where you sweep around to find a frequency, a 31-band graphic EQ has 31 fixed sliders (e.g., 20Hz, 25Hz, 31.5Hz). They give live sound engineers instant, tactile visual feedback and rapid access to pull down screeching microphone feedback at specific spots.",
        "A graphic EQ in a live venue is your absolute lifeline. When the lead singer points the microphone directly at the wedge monitor and 2kHz starts screaming like a banshee, you don't have time to sweep a parametric bell. You grab the 2kHz slider and yank it to the floor.",
        "Live Sound Engineer",
        "t6_q12_graphic_eq_hq"
    ))

    questions.append(make_q(
        "Q13: Question 13",
        "You recorded a snare drum that has a horrible, agonizingly shrill ringing overtone playing exactly at 440Hz. Which EQ 'Q' setting is correct to surgically remove it?",
        [
            {"text": "A highly narrow, extremely sharp 'Q' value (like 10.0 or higher), so only the ringing note is deleted without harming the rest of the snare tone", "is_true": True},
            {"text": "A very wide, musical 'Q' value (like 0.5) to smooth out the whole drum", "is_true": False},
            {"text": "A high-pass filter set to 500Hz", "is_true": False},
            {"text": "Q does not apply to removing resonances", "is_true": False}
        ],
        "This is the 'Search and Destroy' technique. You take a narrow bell with a high Q, boost it by +15dB, and sweep it across the frequencies until the agonizing ringing sound screams at you. Then, you simply drag that exact narrow point straight down to -10dB to delete it forever.",
        "Surgical EQ is practically dentistry. You use an agonizingly thin drill bit to perfectly extract the cavity without accidentally sawing the patient's entire jawbone off.",
        "Andrew Scheps",
        "t6_q13_surgical_narrow_q_hq"
    ))

    questions.append(make_q(
        "Q14: Question 14",
        "What acoustic phenomenon occurs organically 'under the hood' when you aggressively boost an analog (or 'Minimum-Phase' digital) EQ curve?",
        [
            {"text": "The track goes completely out of tune", "is_true": False},
            {"text": "The stereo panning flips backwards", "is_true": False},
            {"text": "Frequency-dependent 'Phase Shift', causing microscopic timing delays and smearing of transients around the boosted frequency band", "is_true": True},
            {"text": "The sampling rate automatically degrades to 8-bit", "is_true": False}
        ],
        "All traditional EQs work by creating microscopic timing delays (phase shifts) that interact with the dry signal to boost or cut volumes. When abused heavily, this subtle time-smearing can make drum transients sound soft, disconnected, or 'phasey'.",
        "Minimum-phase EQ is exactly how a real analog Neve console sounds. The slight phase smearing it creates is often perceived as 'warmth' or 'analog color'. But if you pile 15 different savage EQ plugin boosts onto a vocal, that 'color' suddenly turns into an agonizing, washy mess.",
        "Fab Dupont",
        "t6_q14_phase_shift_eq_hq"
    ))

    # --- HARD ---
    questions.append(make_q(
        "Q15: Question 15",
        "What is uniquely powerful about a 'Dynamic EQ' compared to a traditional static Parametric EQ?",
        [
            {"text": "It applies the EQ cut permanently everywhere", "is_true": False},
            {"text": "It uses AI to automatically mix the song for you", "is_true": False},
            {"text": "It only engages and applies its EQ boost/cut when the targeted frequency gets too loud and crosses a specific set threshold, acting like a multiband compressor within a regular EQ shape", "is_true": True},
            {"text": "It changes the pitch of the note dynamically", "is_true": False}
        ],
        "If a singer is only harsh at 4kHz when she screams the chorus, a static EQ will make her quiet verses sound totally muffled and dull. A Dynamic EQ sits perfectly quietly at 0dB during the verse, and only actively dips 4kHz downward during the harsh screaming chorus.",
        "The Dynamic EQ is the ultimate peacemaker. It allows you to forcefully tame an aggressive, shrieking acoustic guitar strum without completely killing the bright, beautiful 5kHz air during the quiet, delicate finger-picking sections.",
        "Mix Engineer",
        "t6_q15_dynamic_eq_hq"
    ))

    questions.append(make_q(
        "Q16: Question 16",
        "The famous 'Pultec EQ Trick' used on kick drums and bass guitars involves executing what seemingly contradictory action?",
        [
            {"text": "Playing the kick drum entirely backwards", "is_true": False},
            {"text": "Simultaneously boosting and cutting the exact same low frequency (e.g., boosting 60Hz and cutting 60Hz at the same time), creating an incredibly unique, massive scooped resonant resonant low-end curve", "is_true": True},
            {"text": "Panning the low end hard right and left", "is_true": False},
            {"text": "Bypassing the EQ circuit entirely to rely on tube saturation alone", "is_true": False}
        ],
        "Because the analog 'Boost' and 'Cut' curves on an original 1950s Pultec EQP-1A are not mathematically identical, twisting both knobs at 60Hz simultaneously creates a massive boost exactly at 60Hz, followed instantly by a severe carved dip at 200Hz, tightening the mud immediately.",
        "The Pultec low end trick is a cheat code for a massive kick drum. You turn both the boost and cut knobs to 10. The physics of the induction coils accidentally carves out the agonizing mud while leaving an enormous, earth-shattering thump below it.",
        "Jack Joseph Puig",
        "t6_q16_pultec_eq_trick_hq"
    ))

    questions.append(make_q(
        "Q17: Question 17",
        "What defines 'LCR Panning' in advanced commercial mixing philosophy?",
        [
            {"text": "Panning everything to the Left, Center, or Rear surround speakers purely", "is_true": False},
            {"text": "Loud, compressed, and reverberated track processing", "is_true": False},
            {"text": "A rigid, strict panning strategy where every single track is panned either 100% hard Left, 100% hard Right, or perfectly dead Center, with absolutely nothing existing precisely in the 'in-between' spaces", "is_true": True},
            {"text": "Panning elements randomly via automation", "is_true": False}
        ],
        "LCR (Left-Center-Right) forces the engineer into severe, bold mixing decisions. By leaving the 15% and 40% pan areas completely totally empty of clutter, the phantom center containing the critical lead vocal and drums sounds shockingly massive, wide, and clear.",
        "I was terrified of LCR panning until I realized that every single massive, iconic rock album mixed by Chris Lord-Alge relies exclusively on LCR. When you commit to hard panning, the width of the mix suddenly explodes past the edges of the physical speakers.",
        "Modern Mix Philosophy",
        "t6_q17_lcr_panning_hq"
    ))

    questions.append(make_q(
        "Q18: Question 18",
        "What is the mathematical purpose of the 'Pan Law' setting found in the master settings of a modern Digital Audio Workstation (DAW)?",
        [
            {"text": "It legally prevents you from plagiarizing panning sweeps", "is_true": False},
            {"text": "It is an automated mathematical volume rule (typically -3dB) that identically drops the volume of a track as it is panned to the physical phantom center, preventing the track from suddenly sounding perceptually 'louder' when both speakers play it simultaneously", "is_true": True},
            {"text": "It compresses the master bus based on stereo width width", "is_true": False},
            {"text": "It forces all plugins to be perfectly mono compatible", "is_true": False}
        ],
        "If a guitar is panned 100% Left, only one speaker works. If moved to Center, TWO speakers are now playing the exact same mono guitar, naturally doubling acoustic power. A -3dB Pan Law automatically turns the fader down exactly 3 decibels in the center to compensate flawlessly for this acoustic build-up.",
        "Pan Law compensation is why you can automate a terrifying jet engine sound soaring perfectly from the hard left speaker, smoothly entirely across the center of your face into the right speaker, without it horribly blasting your ears out as it crosses the middle.",
        "Technical Analysis",
        "t6_q18_pan_law_compensation_hq"
    ))

    questions.append(make_q(
        "Q19: Question 19",
        "If you aggressively and heavily widen the stereo width of a sub-bass synthesizer using specialized 'Haas Effect' widening plugins, what critical disaster will likely occur when a club DJ plays the track over a mono club PA system?",
        [
            {"text": "The bass will become totally distorted and clip the speakers entirely", "is_true": False},
            {"text": "Absolute phase cancellation, causing the sub-bass to either completely physically disappear from the song or sound incredibly thin, weak, and hollow when the left and right channels are summed together", "is_true": True},
            {"text": "The track will play entirely backwards in mono", "is_true": False},
            {"text": "The song's tempo will physically halve in speed", "is_true": False}
        ],
        "Stereo wideners often work by flipping the phase or delaying one side of the signal against the other. In stereo, your brain loves the width. In Mono, those inverse waves crash into each other and physically destroy the audio. Always keep your lowest sub bass strictly mono.",
        "The biggest tragedy in electronic dance music is watching a kid test their massive, wide, phasey 808 bass drop on a multimillion-dollar mono club sound system, only for the entire low end to vanish into thin air like an embarrassing ghost.",
        "Mastering Engineer",
        "t6_q19_mono_compatibility_bass_hq"
    ))

    questions.append(make_q(
        "Q20: Question 20",
        "In musical EQ terminology, what does an 'Octave' exactly represent mathematically on the frequency spectrum?",
        [
            {"text": "Adding exactly 100 Hertz to any given frequency pitch", "is_true": False},
            {"text": "A tenfold logarithmic multiplication (e.g. 100Hz to 1,000Hz)", "is_true": False},
            {"text": "An exact doubling or halving of the physical frequency in Hertz (e.g., moving precisely from A4 at 440Hz directly to A5 at 880Hz)", "is_true": True},
            {"text": "A completely random interval change", "is_true": False}
        ],
        "Because pitch is logarithmic, the distance between 50Hz and 100Hz is exactly one octave. But higher up, the distance between 10kHz and 20kHz is ALSO exactly one single octave. EQ curves look logarithmic on screen to match this biological human hearing reality.",
        "When you realize that almost the entire critical energy of a thumping kick drum and earth-shaking bass guitar live entirely squashed into the tiny mathematical gap between 40Hz and 80Hz—a single octave—you begin to understand why mixing the low end is a surgical nightmare.",
        "Acoustic physics",
        "t6_q20_octave_frequency_math_hq"
    ))

    # Replace in origin
    stage2['items'][topic_index]['questions'] = questions
    
    with open('src/data/course_data.json', 'w') as f:
        json.dump(data, f, indent=4)
        
    print("Successfully updated 20 questions for Stage 2 Topic 6 (EQ and Panning)")

if __name__ == '__main__':
    update_t6()
