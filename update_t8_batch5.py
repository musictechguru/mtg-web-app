import json

def update_t8_batch5():
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
        "Q13: Question 13",
        "What is the mathematical definition of 'Crest Factor' in a mastered audio track?",
        [
            {"text": "The ratio of low frequencies to high frequencies", "is_true": False},
            {"text": "The mathematical difference between the absolute highest Peak level and the average RMS (Loudness) level", "is_true": True},
            {"text": "The total physical length of the audio file", "is_true": False},
            {"text": "The amount of stereo widening applied", "is_true": False}
        ],
        "Crest Factor represents the dynamic range of a track. A high Crest Factor means punchy, dynamic drums but a quieter overall mix. A low Crest Factor means the track is incredibly loud, but heavily compressed and lacking punch.",
        "If you aggressively destroy your Crest Factor simply to win the loudness war, you physically murder the beautiful transient punch of the snare drum. Loudness costs dynamics.",
        "Bob Katz",
        "t8_q13_crest_factor_hq"
    ))

    questions.append(make_q(
        "Q14: Question 14",
        "When mastering, why is introducing controlled 'Soft Clipping' often preferred over pushing a digital Limiter too hard?",
        [
            {"text": "Because soft clipping mathematically stops exactly at -14 LUFS", "is_true": False},
            {"text": "Soft clipping chops off sharp transients smoothly by adding pleasant harmonic distortion, drastically reducing the massive heavy workload on the final digital Limiter", "is_true": True},
            {"text": "Because soft clipping entirely removes the bass frequencies", "is_true": False},
            {"text": "Because clipping makes the track mono", "is_true": False}
        ],
        "If a digital limiter works too hard on a massive kick drum, it violently pumps the entire volume down. Clipping the kick drum slightly instead shaves off the peak using distortion, keeping the track loud without pumping the limiter.",
        "A little bit of intentional clipping on the snare drum transient is the absolute huge secret to modern massive loudness. It simply sounds better than aggressive, pumping digital limiting.",
        "Jaycen Joshua",
        "t8_q14_soft_clipping_hq"
    ))

    questions.append(make_q(
        "Q15: Question 15",
        "What does the crucial process of 'Oversampling' do inside a digital mastering Limiter?",
        [
            {"text": "It mathematically doubles the final exact tempo", "is_true": False},
            {"text": "It temporarily operates at a massively higher internal sample rate to accurately catch invisible inter-sample peaks and heavily reduce digital aliasing distortion", "is_true": True},
            {"text": "It strictly converts stereo to mono", "is_true": False},
            {"text": "It blindly creates random extra samples", "is_true": False}
        ],
        "At a normal 44.1kHz sample rate, extremely fast audio peaks might physically slip entirely 'between' the digital samples. Oversampling (e.g., 4x or 8x) creates a much denser grid internally to properly catch and limit those invisible peaks.",
        "If you don't oversample your final heavy mastering limiter, aggressive high-frequency digital aliasing folds dangerously back down into the audible spectrum, creating truly harsh, brittle, ugly treble.",
        "Fab Dupont",
        "t8_q15_oversampling_limiter_hq"
    ))

    questions.append(make_q(
        "Q16: Question 16",
        "What is specifically fundamentally wrong with purely trusting the visual 'Waveform' graphic simply to judge standard mastering loudness?",
        [
            {"text": "Waveforms never display the bass frequencies", "is_true": False},
            {"text": "Waveforms only show electrical Peak amplitude, but human ears physically perceive loudness based on average sustained energy (RMS/LUFS) over time", "is_true": True},
            {"text": "Waveforms only function precisely in mono", "is_true": False},
            {"text": "Digital waveforms are highly compressed visually", "is_true": False}
        ],
        "A very loud, sharp, 1-millisecond hi-hat spike might physically hit 0dB and look massive on a waveform, but it contains almost no actual sustained energy. A sustained bass note at -6dB will look smaller but sound physically much louder.",
        "Your eyes will absolutely lie directly to you in the mastering studio. A spiky waveform looks loud but sounds incredibly weak. A dense, thick 'sausage' waveform looks bad but might sound massive. Trust your LUFS meters.",
        "Mastering Engineer",
        "t8_q16_waveform_vs_lufs_hq"
    ))

    with open('t8_q13_to_16.json', 'w') as f:
        json.dump(questions, f)

if __name__ == '__main__':
    update_t8_batch5()
