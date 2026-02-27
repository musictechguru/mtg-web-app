import json

def update_t8_batch2():
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
        "Q3: Question 3",
        "Why is it essential to frequently A/B compare your final mix directly against commercial 'Reference Tracks' during the mastering stage?",
        [
            {"text": "Simply to perfectly copy the exact tempo", "is_true": False},
            {"text": "Because human ears fatigue quickly; Reference Tracks reset your listening accuracy, highlighting dangerous tonal blind spots in your mix.", "is_true": True},
            {"text": "Strictly to safely extract the vocal stems", "is_true": False},
            {"text": "To exactly match the lead singer's microphone", "is_true": False}
        ],
        "Your ears quickly adjust to heavily flawed EQ curves. After four hours, a deeply muddy bass might sound 'normal'. Flawlessly matching your track against a perfectly mastered professional commercial Reference Track instantly exposes your blind spots entirely.",
        "Reference tracks are your acoustic compass in a highly dangerous deeply dark forest. Without brutally strictly checking them, you will confidently march off a cliff.",
        "Mick Guzauski",
        "t8_q3_reference_tracks_hq"
    ))

    questions.append(make_q(
        "Q4: Question 4",
        "What does the modern acoustic broadcasting standard measurement unit 'LUFS' mathematically stand for?",
        [
            {"text": "Linear Unit Frequency Scale", "is_true": False},
            {"text": "Loudness Units relative to Full Scale", "is_true": True},
            {"text": "Low frequency Unit Floor System", "is_true": False},
            {"text": "Limit Upper Frequency Spectrum", "is_true": False}
        ],
        "LUFS measures perceived Loudness Units relative to Full Scale. It acts as an average measurement of how loud a track actually feels over time to human ears, rather than just measuring fast absolute peak electrical signals.",
        "Stop staring wildly at the confusing Peak meter. That only tells you electricity levels. The LUFS meter actually tells you exactly what your human ear is truly hearing.",
        "Mastering Engineer",
        "t8_q4_lufs_unit_hq"
    ))

    questions.append(make_q(
        "Q5: Question 5",
        "What is the general accepted streaming platform master limit target for average LUFS?",
        [
            {"text": "-6 LUFS", "is_true": False},
            {"text": "-14 LUFS", "is_true": True},
            {"text": "0 LUFS", "is_true": False},
            {"text": "-24 LUFS", "is_true": False}
        ],
        "Spotify, Apple Music, and Amazon normalize audio to roughly -14 LUFS. If your master is pushed aggressively to -8 LUFS, the automated system simply digitally turns your track down by 6dB entirely to match everything else.",
        "You can crush your master to -4 LUFS if you really cruelly want to, but the major streaming robots will just violently turn your song down until it sits exactly next to everyone else at -14 LUFS anyway.",
        "Ian Shepherd",
        "t8_q5_streaming_target_hq"
    ))

    questions.append(make_q(
        "Q6: Question 6",
        "What specific metric does 'True Peak' metering measure that traditional standard Digital Peak meters completely miss?",
        [
            {"text": "The sub-bass 20Hz rumble output specifically", "is_true": False},
            {"text": "The invisible 'inter-sample peaks' that mathematically occur entirely precisely when the digital audio waveform is physically reconstructed back into an actual analog continuous voltage signal.", "is_true": True},
            {"text": "The highest fundamental note of the vocal", "is_true": False},
            {"text": "The exact physical length of the track", "is_true": False}
        ],
        "Standard digital peak meters only read the exact discrete audio samples. True Peak intelligently oversamples the audio to mathematically predict if the continuous analog waveform curving perfectly between those samples will physically clip the Digital-to-Analog converter.",
        "A regular digital meter might happily show your mix hitting safely exactly at -0.1dB. But when the consumer's cheap car stereo converts that digital file back to analog music, massive hidden continuous peaks between the digital stairs will fiercely clip the physical speaker.",
        "Thomas Lund",
        "t8_q6_true_peak_hq"
    ))

    with open('t8_q3_to_6.json', 'w') as f:
        json.dump(questions, f)

if __name__ == '__main__':
    update_t8_batch2()
