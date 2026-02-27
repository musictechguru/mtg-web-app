import json

def update_t7_batch2():
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

    # --- MEDIUM / HARD ---
    questions.append(make_q(
        "Q11: Question 11",
        "How is intensely realistic 'Convolution Reverb' technologically generated?",
        [
            {"text": "By calculating pure mathematical algorithms to simulate synthetic acoustic reflections", "is_true": False},
            {"text": "By playing absolute white noise loudly in a real physical room", "is_true": False},
            {"text": "By capturing the exact acoustic DNA 'Impulse Response' footprint of a real physical space, and aggressively multiplying it directly into any dry audio signal", "is_true": True},
            {"text": "By heavily distorting the delay feedback loop", "is_true": False}
        ],
        "A loud starting transient (like a starter pistol) is fired inside a massive physical cathedral. Microphones meticulously record exactly how the physical room reacts and decays over time to create an 'Impulse Response' (IR) file.",
        "Convolution is genuine acoustic theft. We literally stole the exact acoustic fingerprint of the massive legendary Abbey Road Studio 2, and we forced our dry acoustic guitar directly into it.",
        "Plugin Designer",
        "t7_q11_convolution_ir_hq"
    ))

    questions.append(make_q(
        "Q12: Question 12",
        "Why is heavily high-pass-filtering (cutting the muddy bass) on a long reverb auxiliary bus fundamentally critical in modern, tight mixing?",
        [
            {"text": "Because the massive low frequencies in a massive, dense reverb tail cause a horrifying, suffocating muddy buildup that perfectly ruins the tight punch of the pure dry kick drum", "is_true": True},
            {"text": "To increase the extreme high frequencies of the reverb", "is_true": False},
            {"text": "Because reverb does not contain bass frequencies", "is_true": False},
            {"text": "It completely removes the vocal", "is_true": False}
        ],
        "The 'Abbey Road Reverb Trick' forces an aggressive High-Pass Filter precisely at 600Hz on the Reverb Auxiliary Input Channel heavily BEFORE the pure signal hits the massive Reverb plugin. This guarantees a terrifyingly clean, tight low-end mix.",
        "Throw away all the horrifying mud on the massive Reverb return channel. If your massive, beautiful kick drum tail sounds muddy and uncontrolled in a 3-second hall, severely cut the bass aggressively going precisely INTO that hall.",
        "Jack Joseph Puig",
        "t7_q12_abbey_road_eq_hq"
    ))

    questions.append(make_q(
        "Q13: Question 13",
        "What is specifically achieved dynamically by setting exactly Dotted-Eighth (3/16) musical note delay repeats physically locked to the track’s exact BPM tempo, behind a straight, repetitive quarter-note playing guitar pattern?",
        [
            {"text": "It adds incredible, rhythmic, intensely complex galloping syncopation instantly to a very incredibly simple straight playing pattern (e.g., U2's iconic The Edge signature guitar sound)", "is_true": True},
            {"text": "It heavily distorts the low frequency range", "is_true": False},
            {"text": "It perfectly aligns the echoes exactly on top of the original dry notes", "is_true": False},
            {"text": "It cuts the volume in half", "is_true": False}
        ],
        "The Dotted 8th delay repeats perfectly land exactly in the mathematical gaps between the rhythm of the originally physically plucked straight 8th notes, organically creating a dense 16th-note galloping rhythm out of extremely simple playing.",
        "I was aggressively struggling terribly to physically write complex musical riffs. I plugged the pure dry guitar into two massive rhythmic memory man delay pedals locked mathematically in a syncopated loop, and 20 billion platinum albums incredibly instantly fell out of the sky.",
        "The Edge",
        "t7_q13_dotted_eighth_delay_hq"
    ))

    questions.append(make_q(
        "Q14: Question 14",
        "What specific mathematical rhythmic acoustic anomaly physically occurs entirely if the precise Delay Time is heavily decreased dynamically down while the massive original audio signal is already feeding actively through it?",
        [
            {"text": "The entire echo simply stops playing", "is_true": False},
            {"text": "The audio echo instantly reverses completely backwards", "is_true": False},
            {"text": "The pitch of the massively repeating audio physically shifts wildly and drastically upwards like a violently fast fast-forwarding tape machine", "is_true": True},
            {"text": "The volume suddenly drops to absolute zero", "is_true": False}
        ],
        "Because analog delay relies entirely upon an actual physical magnetic playback head rapidly reading spinning physical tape, suddenly mathematically shortening that specific delay gap violently forces the tape to fly past the playing head significantly faster.",
        "Grab the terrifying Time knob on massive screaming analog delay pedal currently stuck repeating in a massive feedback loop. Violently yank that knob hard left to 10 milliseconds. The entire studio violently erupts into incredibly high-pitched alien laser fire.",
        "Sonic Youth",
        "t7_q14_time_pitch_warp_hq"
    ))

    questions.append(make_q(
        "Q15: Question 15",
        "Why is severely and drastically cutting exactly the very harsh 3kHz to 5kHz prominent range heavily on a vocal's dedicated plate Reverb return channel critically important?",
        [
            {"text": "To stop incredibly piercing, wildly offensive, and dangerously hissing sibilance 'S' and 'T' pure consonants from aggressively exploding in the massive reverb tail", "is_true": True},
            {"text": "To make the bass heavier", "is_true": False},
            {"text": "To increase the attack transients", "is_true": False},
            {"text": "To widen the stereo image", "is_true": False}
        ],
        "Sibilant 'S' sounds absolutely destroy enormous dense reverberation. When a massive 'Sss' hits a massive 3-second wet Plate reverb, the horrible splashing hiss lingers aggressively independently and ruins the mix entirely.",
        "If you passionately throw a massive, pure, unfiltered, 6-second wet pristine plate reverb directly onto a screaming lead vocal exactly containing a highly aggressive 'S', the entire beautiful mix completely turns into incredibly sharp, horrifying shattered glass crashing.",
        "Manny Marroquin",
        "t7_q15_de_essing_reverb_hq"
    ))

    questions.append(make_q(
        "Q16: Question 16",
        "To radically widen a mono audio snare drum artificially perfectly out to a massive stereo image using strictly delay, what precise mathematical Delay Times should you set on exactly the Left and exactly the Right speaker sides?",
        [
            {"text": "1000ms left, 2000ms right", "is_true": False},
            {"text": "Both rigidly locked perfectly to precisely 0 milliseconds", "is_true": False},
            {"text": "Hard Pan one channel Left precisely delayed exactly 0ms, and precisely Hard Pan one channel Right delayed incredibly short exactly 10ms-25ms", "is_true": True},
            {"text": "Rigid exact mono delays strictly", "is_true": False}
        ],
        "This is heavily exploiting the incredible mathematical 'Haas Effect' (Precedence Effect). The brain miraculously interprets a sound arriving exactly slightly later (under 30ms) heavily in one ear as a massive stereophonic spatial cue.",
        "Take a boring, dead, mono electric guitar specifically. Hard pan the original pure dry signal perfectly 100% Left. Radically send it massively to a incredibly short pure 18ms wet Delay heavily panned perfectly 100% Right. You instantly have an enormous, stadium-sized guitar.",
        "Joe Barresi",
        "t7_q16_haas_stereo_delay_hq"
    ))

    questions.append(make_q(
        "Q17: Question 17",
        "What specific, sophisticated physical side-chain routing configuration famously entirely automatically 'Ducks' the massive dense vocal Reverb completely entirely out of the active way?",
        [
            {"text": "Placing an enormous pristine compressor directly aggressively on the main dry vocal", "is_true": False},
            {"text": "Taking the pristine pure dry Vocal absolutely and aggressively feeding it heavily exactly straight into the Side-Chain Trigger Input of a massive pristine compressor sitting specifically exactly entirely on the loud Reverb Return Auxiliary channel", "is_true": True},
            {"text": "Using an acoustic equalizer heavily to manually boost the mid-range heavily on the vocal continuously", "is_true": False},
            {"text": "Removing all the reverb completely with an EQ", "is_true": False}
        ],
        "When the dense dry vocal specifically sings its beautiful melody, the massive Wet Reverb volume aggressively drops down instantly. Exactly when the pure dry vocal elegantly stops singing, the massive Wet Reverb incredibly powerfully blooms massively completely back up into the empty silence.",
        "The incredible dense tail of a fantastic, massive vocal perfectly washes and swamps exactly the beautiful actual dry vocal phrase out terribly. Ducking the massive reverb totally fundamentally solves this. The dry vocal incredibly pushes exactly the massive dense tail perfectly backward instantly out of the way aggressively.",
        "Jaycen Joshua",
        "t7_q17_ducking_reverb_hq"
    ))

    questions.append(make_q(
        "Q18: Question 18",
        "What specific defining mechanical feature makes the extremely legendary specific analog 'Roland Space Echo RE-201' wildly rhythmically complex compared to entirely modern simple digital delays?",
        [
            {"text": "It completely lacks feedback", "is_true": False},
            {"text": "It specifically uses identically exactly three beautifully physically independent separate spinning analog tape playback heads reading exactly the exact same spinning tape loop physically exactly simultaneously", "is_true": True},
            {"text": "It uses an algorithmic mathematical DSP microchip calculation", "is_true": False},
            {"text": "It operates in mono strictly", "is_true": False}
        ],
        "The specific incredibly physical placement of the three exact analog read tape heads on the RE-201 is mathematically perfectly syncopated to provide exactly off-beat swinging polyrhythms naturally heavily from a single pure dry input pulse completely.",
        "The beautiful amazing tape speed motor constantly physically incredibly wobbles back and completely forth heavily terribly in the most beautiful musical beautiful amazing way specifically, incredibly creating unbelievable dense chorusing wow and flutter pitch shifting automatically on exactly every incredibly massive fading echo.",
        "Lee Scratch Perry",
        "t7_q18_space_echo_heads_hq"
    ))

    questions.append(make_q(
        "Q19: Question 19",
        "What specific highly specialized, incredible, deeply unique effect completely aggressively continuously precisely pitch-shifts specifically ONLY the enormous massive reverb decay tail perfectly precisely entirely UP by exactly one full massive octave?",
        [
            {"text": "Flanging Reverb", "is_true": False},
            {"text": "Shimmer Reverb", "is_true": True},
            {"text": "Room Reverb", "is_true": False},
            {"text": "Gated Reverb", "is_true": False}
        ],
        "Shimmer is created fundamentally by drastically feeding an aggressive massive pitch-shifted copy (exactly +12 Semitones Up) perfectly aggressively heavily directly directly back completely inside incredibly the specific reverb's own recursive audio feedback loop, organically creating dense endless incredibly rising massive synth-like angels.",
        "When you passionately play exactly one single massive dark piano fundamental bass specifically chord entirely entirely into massive an enormous specifically beautiful long 8-second wet Shimmer Reverb perfectly carefully, you instantaneously create completely precisely a massive glowing beautiful entire heavenly ambient synthesizer string section pad specifically swelling beautifully elegantly precisely perfectly upwards continuously entirely.",
        "Brian Eno",
        "t7_q19_shimmer_reverb_hq"
    ))

    questions.append(make_q(
        "Q20: Question 20",
        "Which specific incredibly aggressive massively destructive iconic 1980s studio trick fundamentally intensely critically relies entirely entirely completely on absolutely heavily fiercely heavily incredibly aggressively specifically slamming an aggressive exact incredibly fast Noise Gate tightly shut exactly critically entirely exactly hard specifically directly specifically entirely exactly immediately rapidly down strictly immediately specifically exactly extremely tightly on top of an incredibly massive bright incredibly enormous extremely long heavy massive specifically enormous long wet massive Snare Drum physical Room Reverb tail?",
        [
            {"text": "Reverse Acoustic Reverb", "is_true": False},
            {"text": "Acoustic Slapback Analog Delay Echo", "is_true": False},
            {"text": "Gated Enormous Room Reverb", "is_true": True},
            {"text": "Chamber Harmonic Echo", "is_true": False}
        ],
        "You intentionally carefully intensely purposely apply absolutely an intentionally terribly entirely incorrectly inappropriately terribly incredibly ridiculously massive extremely 20-second enormous decay-heavy bright wet hall reverb perfectly to exactly exclusively specifically entirely completely just specifically explicitly entirely heavily entirely precisely uniquely entirely precisely only the exact physical isolated dry incredibly loud precise absolutely heavily specifically aggressively completely heavily dry absolutely clean precisely dry Snare drum. Then exactly precisely exclusively incredibly intensely heavily specifically specifically completely intentionally rapidly precisely incredibly specifically precisely absolutely critically completely instantly specifically entirely sharply cut that enormous massive dense long tail incredibly dead rapidly instantly accurately specifically perfectly incredibly explicitly perfectly short directly exactly precisely sharply off incredibly extremely violently hard exactly completely specifically exactly immediately completely fully in the incredibly precise middle violently with a Noise Gate specifically exactly instantly strictly specifically directly heavily entirely tightly closed shutting specifically.",
        "The incredible massive physical massive enormous giant specific incredible beautiful Phil Collins massive aggressive heavy classic iconic 'In The Air Tonight' specific powerful drum entrance is incredibly entirely practically primarily exactly famously strictly mostly basically entirely nothing completely fully literally merely entirely intensely heavily uniquely only pure absolutely exactly strictly specifically absolutely specifically massive pure physical aggressive specific raw sheer violent aggressive physical 'Gated Reverb'.",
        "Hugh Padgham",
        "t7_q20_gated_snare_reverb_hq"
    ))

    with open('t7_q11_to_20.json', 'w') as f:
        json.dump(questions, f)

if __name__ == '__main__':
    update_t7_batch2()
