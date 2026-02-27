import json

def update_t8_batch6():
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

    questions.append(make_q(
        "Q17: Question 17",
        "What specific destructive acoustic phenomenon rapidly occurs if you push incredibly uncompressed, dynamic, heavy sub-bass straight into a final digital brickwall limiter?",
        [
            {"text": "The bass mathematically vanishes completely", "is_true": False},
            {"text": "The massive low-frequency wave forces the limiter to aggressively pull the entire track's volume down on every kick drum hit, creating a horribly obvious 'pumping' or 'ducking' effect on the delicate vocals and cymbals", "is_true": True},
            {"text": "The vocal becomes incredibly piercing", "is_true": False},
            {"text": "The stereo width forcefully collapses entirely", "is_true": False}
        ],
        "Low frequencies carry significantly more physical energy than high frequencies. A mastering limiter reacts strictly to total energy. If massive uncontrolled sub-bass hits the limiter, the limiter violently crushes the entire song's volume downward to survive.",
        "If your beautiful lead vocal suddenly aggressively wildly ducks in volume every single time the heavy kick drum hits the final limiter, your bass is entirely physically out of control.",
        "Dave Pensado",
        "t8_q17_limiter_pumping_hq"
    ))

    questions.append(make_q(
        "Q18: Question 18",
        "Why is it specifically highly recommended to check a final master aggressively in 'Mono' before entirely signing off on it?",
        [
            {"text": "To artificially make the bass heavier", "is_true": False},
            {"text": "To strictly guarantee absolutely that wide stereo phase-cancellation isn't entirely literally mathematically deleting the lead vocal or the central punch of the snare drum when played on a mono club speaker", "is_true": True},
            {"text": "Because all modern streaming services convert tracks to mono", "is_true": False},
            {"text": "To increase the extreme high treble frequencies", "is_true": False}
        ],
        "Many producers use extreme stereo-widening plugins. If they push the left and right speakers totally out of phase, perfectly summing the track to Mono will mathematically cancel those frequencies out entirely. The track will vanish.",
        "You think your massive wide stereo synths sound incredible in your headphones. But if you hit the Mono button and they entirely physically mathematically disappear, then half of the club isn't going to hear your song at all.",
        "Tony Maserati",
        "t8_q18_mono_compatibility_hq"
    ))

    questions.append(make_q(
        "Q19: Question 19",
        "What is the specific acoustic purpose of applying a perfectly gentle 'Baxandall' shelving EQ exactly during the final digital mastering process?",
        [
            {"text": "To aggressively surgically remove exact 5kHz resonances entirely", "is_true": False},
            {"text": "To perfectly gracefully smoothly lift the extreme 'Air' frequencies (10kHz+) and 'Sub' frequencies with incredibly wide, natural, musical, gentle sweeping curves rather than incredibly sharp surgical narrow cuts", "is_true": True},
            {"text": "To strictly compress the mid-range vocals heavily", "is_true": False},
            {"text": "To violently add physical analog tape distortion", "is_true": False}
        ],
        "A Baxandall curve is famous for being incredibly wide, smooth, and phase-coherent. Instead of poking a sharp hole in the audio, a Baxandall high-shelf gently and musically tilts the entire top end of the frequency spectrum upwards beautifully.",
        "The Dangerous BAX EQ is magic. You apply a tiny 1dB ultra-wide shelf at exactly 12kHz, and the entire heavy dense mix suddenly effortlessly breathes purely with gorgeous sparkling expensive studio air.",
        "Mix Engineer",
        "t8_q19_baxandall_eq_hq"
    ))

    questions.append(make_q(
        "Q20: Question 20",
        "What specific mathematical conversion precisely intentionally physically happens when you properly select '16-bit / 44.1kHz' explicitly strictly during the absolute final rendering bounce of your Master?",
        [
            {"text": "The track is completely encoded violently into a low-quality MP3 format", "is_true": False},
            {"text": "The track is mathematically safely rigidly converted to the identical exact lossless digital 'Red Book' standard specification physically required originally for precise professional CD replication", "is_true": True},
            {"text": "The entire track is mathematically converted to pure analog voltage entirely", "is_true": False},
            {"text": "The exact tempo of the song literally physically speeds up instantly", "is_true": False}
        ],
        "The 'Red Book' standard for audio CDs was established in exactly 1980 by Sony and Philips. It specifies exactly 16-bit depth (dynamic range) and 44.1kHz sample rate (frequency capture mathematically up to exactly 22.05kHz).",
        "Even in the entirely modern streaming age of massive 24-bit/96kHz high-resolution audio files, understanding the incredibly strict 16-bit/44.1k Red Book physical mathematical standard remains absolutely essentially strictly musically foundational.",
        "Bob Ludwig",
        "t8_q20_red_book_cd_hq"
    ))

    with open('t8_q17_to_20.json', 'w') as f:
        json.dump(questions, f)

if __name__ == '__main__':
    update_t8_batch6()
